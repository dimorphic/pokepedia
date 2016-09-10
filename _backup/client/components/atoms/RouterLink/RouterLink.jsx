// deps
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

@connect((store) => {
  return {
    location: store.router.location
  };
})
class RouterLink extends Component {
  static propTypes = {
    location: PropTypes.object,

    element: PropTypes.string,

    className: PropTypes.string,
    activeClassName: PropTypes.string,

    link: PropTypes.bool,
    linkClassName: PropTypes.string,

    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
  }

  static defaultProps = {
    element: 'div',

    className: '',
    activeClassName: 'active',

    link: true,
    linkClassName: ''
  }

  static contextTypes = {
    router: PropTypes.object
  }

  getClassName() {
    const { className, activeClassName } = this.props;

    let linkClassName = className;

    if (this.isRouteActive()) {
      linkClassName = `${className} ${activeClassName}`;
    }

    return linkClassName;
  }

  isRouteActive() {
    const { router } = this.context;
    const { location } = this.props;

    return router.isActive({
      pathname: this.props.to,
      query: location.query
    });
  }

  render() {
    const { element, to, link, linkClassName } = this.props;

    const wrapperProps = {
      className: this.getClassName()
    };

    // do we need anchor link?
    const needLink = (link && !this.isRouteActive()) ? link : false;

    if (needLink) {
      // build link props
      // ...and remove active styles as we set it on the parent
      const linkProps = {
        className: linkClassName,
        to
      };

      // create link element
      const linkItem = (<Link {...linkProps}>{this.props.children}</Link>);

      // return custom link element
      return React.createElement(element, wrapperProps, linkItem);
    }

    // no anchor link needed, return plain element
    return React.createElement(element, wrapperProps, this.props.children);
  }
}

export default withRouter(RouterLink);
