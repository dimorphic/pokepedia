import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AuthActions from 'actions/auth';
import * as UserActions from 'actions/user';

const mapStoreToProps = (store) => ({
  user: store.auth.user
});

// map actions
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
      {
      ...AuthActions,
      ...UserActions
      }
      , dispatch)
});

@connect(mapStoreToProps, mapDispatchToProps)
export default class LoginView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      password: null
    };

    this.onClick = this.onClick.bind(this);
    this.getUserInventories = this.getUserInventories.bind(this);
    this.getUserInventory = this.getUserInventory.bind(this);
    this.onUserChanged = this.onUserChanged.bind(this);
    this.onPasswordChanged = this.onPasswordChanged.bind(this);
  }

  onClick() {
    // username razvan.puscasu24@gmail.com
    // password tsfpwokhrmenktqj
    this.props.actions.login(this.state.user, this.state.password);
  }
  //57bcbcd8d3678329946ac688
  getUserInventories() {
    console.log('this.props', this.props.user._id);
    this.props.actions.getUserInventories(this.props.user._id);
  }

  getUserInventory() {
    console.log('this.props', this.props.user._id);
    this.props.actions.getUserInventory(this.props.user._id, this.props.user.inventories[0]);
  }

  onUserChanged(ev) {
    this.setState({
      user: ev.target.value
    });
  }

  onPasswordChanged(ev) {
    this.setState({
      password: ev.target.value
    });
  }

  render() {
    return (
      <div>
        <div>LOGIN PAGE</div>
        <input onChange={this.onUserChanged} />
        <input onChange={this.onPasswordChanged} type="password" />
        <button onClick={this.onClick}>Login</button>
        <button onClick={this.getUserInventories}>GET USER INVENTORIES</button>
        <button onClick={this.getUserInventory}>GET USER INVENTORY</button>
      </div>
    );
  }
}
