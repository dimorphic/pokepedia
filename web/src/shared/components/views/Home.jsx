import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';

export default function Home(props) {
  return (
    <div>
      <div>hello from Home</div>
      <Link to="/test">
        <RaisedButton label="test link" />
      </Link>
    </div>
  );
}
