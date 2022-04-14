import React from 'react';

import { Navigation } from './navigation/Navigation';

export const Layout: React.FC = (props) => {
  return (
    <>
      <Navigation />
      {props.children}
    </>
  );
};
