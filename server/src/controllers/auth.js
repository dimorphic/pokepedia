import _ from 'lodash';
import User from '../models/user';
import Inventory from '../models/inventory';
import pogobuf from 'pogobuf';

/**
 * Login User
 */
export function login(req, res) {
  const {username, password, provider, location} = req.body;

  const login = new pogobuf.GoogleLogin();
  const client = new pogobuf.Client();

  login.login(username, password)
      .then(token => {
        client.setAuthInfo('google', token);
        return client.init();
      }).then(() => {
    return client.getInventory(0);
  }).then(inventory => {
    User.findOne({username: username}, (err, user) => {
      if (err) throw err;
      if (!user) {
        user = new User({
          username: username,
          password: password,
        });
      }
      inventory.inventory_delta.inventory_items
          .filter(inventory => inventory.inventory_item_data.pokemon_data && inventory.inventory_item_data.pokemon_data.pokemon_id)
          .map((inventory) => {
            const _inventory = new Inventory(Object.assign({}, {user: user._id}, inventory.inventory_item_data.pokemon_data));
            _inventory.save().then((inventory)=> {
              user.inventories.push(inventory);
            }).catch((err)=> {
              throw new Error(err)
            });
          });
      user.save(function (err, user) {
        if (err) console.log('error', err);
        console.log('USSER ID', user._id);
        console.log('User Updated!');
        return res.status(200).send({status: 'ok', user});
      });
    });

  }).catch((err)=> {
    console.log('err', err);
  });
}

export function inventories(req, res) {
  const {userId} = req.params;
  Inventory.find({user: userId})
      .exec(function (err, inventories) {
        if (err) return console.log('error', err)
        console.log('The inventories are an array: ', inventories);
        return res.status(200).send({status: 'ok', inventories});
      })
}

export function inventory(req, res) {
  const {userId, inventoryId} = req.params;
  Inventory.find({user: userId, _id: inventoryId})
      .exec(function (err, inventory) {
        if (err) return console.log('error', err)
        console.log('The inventory is: ', inventory);
        return res.status(200).send({status: 'ok', inventory});
      })
}

export default {
  login,
  inventories,
  inventory,
};
