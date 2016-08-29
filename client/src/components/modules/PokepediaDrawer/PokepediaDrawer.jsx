// deps
import React, { PropTypes } from 'react';

// components
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

// style
import './PokepediaDrawer.scss';

const PokepediaDrawer = (props) => {
  const { open, onClickOut } = props;

  return (
    <Drawer
      open={open}
      onRequestChange={onClickOut}
      docked={false}
    >
      <div className="PokepediaDrawer-Info">
        <div className="PokepediaDrawer-About">
          {/* <PokepediaLogo /> */}
          <img className="img-fluid" src={'/assets/pokepedia-logo-ball.png'} alt="Pokepedia" />
          <h2>pokepedia.fyi</h2>
          <h4>Your only Pokémon GO stop!</h4>
        </div>
        <div className="PokepediaDrawer-Info-Content">
          <p>
            Discover all Pokémons stats, weaknesses, evolution chances, trainer
            level rewards and more!
          </p>

          {/* COMING SOON */}
          <div className="Pokepedia-Sepa"></div>
          <p className="PokepediaDrawer-Soon">Coming soon:</p>
          <ul>
            <li>Evolution calculator</li>
            <li>Battle simulator</li>
          </ul>
          <p>... and more! ;)</p>
          <div className="Pokepedia-Sepa"></div>

          {/* SOCIAL */}
          <div className="PokepediaDrawer-Social">
            <p>Stay tuned!</p>

            <RaisedButton
              label="PokepediaFYI"
              href="https://www.facebook.com/PokepediaFYI/"
              icon={<FontIcon className="fa fa-facebook" />}
              backgroundColor="#3b5998"
              labelColor="#fff"
            />
            <span className="PokepediaDrawer-SocialOr">or</span>
            <RaisedButton
              label="@PokepediaFYI"
              href="https://twitter.com/PokepediaFYI"
              icon={<FontIcon className="fa fa-twitter" />}
              backgroundColor="#1da1f2"
              labelColor="#fff"
            />
          </div>
          <div className="Pokepedia-Sepa"></div>
          <div className="PokepediaDrawer-Coded">
            <i className="fa fa-code" />
            for the
            <i className="fa fa-heart" />
            of games
          </div>
        </div>

        <div className="PokepediaDrawer-Footer">
          All trademarks, product names and logos appearing on the site are
          the property of their respective owners.
        </div>
      </div>
    </Drawer>
  );
};

PokepediaDrawer.propTypes = {
  open: PropTypes.bool,
  onClickOut: PropTypes.func
};

PokepediaDrawer.defaultProps = {
  open: false,
  onClickOut: () => {}
};

export default PokepediaDrawer;
