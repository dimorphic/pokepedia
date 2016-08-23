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

  console.log('tsfpwokhrmenktqj', username)
  console.log('tsfpwokhrmenktqj', password)
  login.login(username, password)
      .then(token => {
        client.setAuthInfo('google', token);
        return client.init();
      }).then(() => {
    return client.getInventory(0);
  }).then(inventory => {
    User.findOne({username: username}, (err, user) => {
      if (err) throw err;
      const inventories = inventory.inventory_delta.inventory_items.map((inventory) => {
        const _inventory = new Inventory(inventory.inventory_item_data.pokemon_data);
        return _inventory.toObject();
        //return inventory.inventory_item_data.pokemon_data;
      });
      if (!user) {
        user = new User({
          username: username,
          password: password,
        });
      }
      user.inventories = inventories;
      user.save(function (err, user) {
        if (err) console.log('error', err);
        console.log('User Updated!');
        return res.status(200).send({ status:'ok', user});
      });
    });

  }).catch((err)=> {
    console.log('err', err);
  });
}

export function inventory(req, res) {
  const {id} = req.params;
  User.findOne({_id: id}).exec((err, userInventory) => {
    if (err) {
      console.log('Error in first query');
      return res.status(500).send('Something went wrong getting the data');
    }
    return res.send({status:'ok', inventories: userInventory.inventories});
  });
}

export default {
  login,
  inventory,
};
