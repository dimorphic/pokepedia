// deps
import React from 'react';
import { createDevTools } from 'redux-devtools';

// components
import DockMonitor from 'redux-devtools-dock-monitor';
import Inspector from 'redux-devtools-inspector';

export default createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
    changeMonitorKey="ctrl-m"
  >
    <Inspector />
  </DockMonitor>
);
