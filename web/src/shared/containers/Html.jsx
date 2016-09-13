import React from 'react';

export default function Html(props) {
  return (
    <div>
      <div>hello world</div>
      <div>{props.children}</div>
    </div>
  );
}
