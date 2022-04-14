import React, { Props, useEffect } from 'react';
import { useParams } from 'react-router';

import { Layout } from '../../components/layout';
import { useAlbumPhotos } from '../../queries/useAlbums';
import styles from './albums-detail.module.scss';
import { AlbumImage } from './components/AlbumImage';

export const AlbumsDetailsView = () => {
  const { id }: { id: string } = useParams();
  const { data: photos } = useAlbumPhotos({ albumId: id });
  console.log(photos);
  return (
    <Layout>
      <div className={styles.AlbumContainer}>
        <div className={styles.AlbumGrid}>
          {/* <ul>
          {photos?.map((photo: PhotoDTO) => {
            return <li key={photo.id}>{photo.id}</li>;
          })}
        </ul> */}
          {photos?.map((photo) => {
            return <AlbumImage key={photo.id} flickrId={photo.flickrId} albumId={id} />;
          })}
        </div>
      </div>
    </Layout>
  );
};
