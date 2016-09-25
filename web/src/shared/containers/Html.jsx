import React, { Component, PropTypes } from 'react';

export default class Html extends Component {
  static propTypes = {
    head: PropTypes.object.isRequired,
    body: PropTypes.string.isRequired,
    assets: PropTypes.object,

    initialState: PropTypes.object
  };

  static defaultProps = {
    // body: 'default body',
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
    const { head, body, assets } = this.props;
    // const stylez = assets.style.map((href, idx) => {
    //   return <link key={idx} rel="stylesheet" href={href} />;
    // });
    // console.log('html assets @ ', assets);

    return (
      <html>
        <head>
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}

          {/* stylez */}
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: body }} />
          {this.renderInitialState()}

          {/*
          <script type="application/javascript" src="build/vendor.bundle.js"></script>
          <script type="application/javascript" src="build/app.bundle.js"></script>
          */}
          {head.script.toComponent()}
          <script type="application/javascript" src={assets.script.vendor} />
          <script type="application/javascript" src={assets.script.app[0]} />
        </body>
      </html>
    );
  }
}
