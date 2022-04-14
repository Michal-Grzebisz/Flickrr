import React from 'react';

import { Layout } from '../../components/layout';
import { GalleryGrid } from './GalleryGrid/GalleryGrid';

export const MainView: React.FC = () => {
  return (
    <Layout>
      <GalleryGrid />
    </Layout>
  );
};
