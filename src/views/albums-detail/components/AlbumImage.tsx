import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback } from 'react';

import { Loader } from '../../../components/loader/Loader';
import { useDeleteImage } from '../../../queries/useAlbums';
import { useFlickrInfoPhoto } from '../../../queries/useFlickr';
import styles from './AlbumImage.module.scss';

export const AlbumImage = ({ flickrId, albumId }: any) => {
  const { data: photo, status } = useFlickrInfoPhoto(flickrId);
  const imageSrc = `https://live.staticflickr.com/${photo?.server}/${photo?.id}_${photo?.secret}.jpg`;
  const { mutate: deletePhotoFromAlbum } = useDeleteImage();

  const handleDeletePhotoFromAlbum = useCallback(() => {
    deletePhotoFromAlbum({
      albumId: albumId,
      photoId: photo.id,
    });
  }, [albumId, deletePhotoFromAlbum, photo]);

  return (
    <>
      <div className={styles.AlbumImage}>
        {status === 'loading' && <Loader />}
        {status === 'success' && (
          <>
            <img src={imageSrc} id={photo?.id} alt='' />
            <button className={styles.RemoveImageButton} onClick={handleDeletePhotoFromAlbum}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </>
        )}
      </div>
    </>
  );
};
