import React, { Component, PropTypes } from 'react';

// helpers
const { NODE_ENV } = process.env;

// get asset files by type
function getAssetsByType(assets, fileType) {
  return Object.keys(assets).map((entry) => {
    const asset = assets[entry];
    let files = asset[fileType];

    if (Array.isArray(asset[fileType])) {
      files = asset[fileType].map((href) => { return href; });
    }

    return files;
  });
}

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

  renderScripts(assets, baseHref = '') {
    const scripts = getAssetsByType(assets, 'js').reduce((prev, current) => {
      return current.concat(prev);
    }).map((href, idx) => {
      return <script key={idx} type="application/javascript" src={`${baseHref}${href}`} />;
    });

    return scripts;
  }

  renderStyles(assets, baseHref = '') {
    const styles = getAssetsByType(assets, 'css').reduce((prev, current) => {
      return current.concat(prev);
    }).map((href, idx) => {
      return <link key={idx} rel="stylesheet" href={`${baseHref}${href}`} />;
    });

    return styles;
  }

  render() {
    const { head, body, assets } = this.props;

    console.log('html assets @ ', assets);

    // map css assets
    const assetsUrl = '/build';
    const assetsCss = this.renderStyles(assets, assetsUrl);
    const assetsScripts = this.renderScripts(assets, assetsUrl);

    return (
      <html>
        <head>
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}

          {/* FONT */}
          <link href="//fonts.googleapis.com/css?family=Roboto:400,300,500&subset=latin,latin-ext" rel="stylesheet" type="text/css" />
          <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet" />

          {assetsCss}
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: body }} />
          {this.renderInitialState()}

          {assetsScripts}
          {head.script.toComponent()}
        </body>
      </html>
    );
  }
}
