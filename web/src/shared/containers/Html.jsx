import React, { Component, PropTypes } from 'react';

export default class Html extends Component {
  static propTypes = {
    head: PropTypes.object,
    body: PropTypes.string,
    initialState: PropTypes.object
  };

  static defaultProps = {
    body: 'default body',
    initialState: {}
  };

  renderInitialState() {
    if (!this.props.initialState) {
      return null;
    }

    const html = `window.__INITIAL_STATE__ = ${JSON.stringify(this.props.initialState)}`;
    return (<script dangerouslySetInnerHTML={{ __html: html }} />);
  }

  render() {
    const { head, body } = this.props;

    return (
      <html>
        <head>
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: body }} />
          {this.renderInitialState()}

          {head.script.toComponent()}
          <script type="application/javascript" src="build/vendor.bundle.js"></script>
          <script type="application/javascript" src="build/app.bundle.js"></script>
        </body>
      </html>
    );
  }
}
