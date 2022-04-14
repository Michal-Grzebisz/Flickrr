import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { Layout } from '../../components/layout';
import { useAddAlbum, useAlbums } from '../../queries/useAlbums';
import { getAlbumPhotos } from '../../services/Albums';
import styles from './albums.module.scss';
type FormValues = {
  albumName: string;
  description: string;
};

export const AlbumsView: React.FC = () => {
  const [albumId, setAlbumId] = useState('');
  const { mutate: createAlbum } = useAddAlbum();
  const { data: albums } = useAlbums();

  const { register, watch, handleSubmit } = useForm<FormValues>();

  console.log(watch());

  const handleCreateAlbum = useCallback(
    (albumName, description) => {
      createAlbum({
        name: albumName,
        description: description,
      });
    },
    [createAlbum],
  );

  const handleAlbumId = useCallback(
    (event: any): void => {
      event.preventDefault();
      setAlbumId(event.target.value);
      console.log(albumId);
    },
    [albumId],
  );

  return (
    <Layout>
      <div className={styles.AlbumsContainer}>
        <div className={styles.AlbumsFormContainer}>
          <form
            onSubmit={handleSubmit((data) => {
              handleCreateAlbum(data.albumName, data.description);
            })}
            className={styles.AlbumsForm}
          >
            <span className={styles.FormHeader}>Create New Album</span>
            <input
              type='text'
              {...(register('albumName'), { required: true, maxLength: 80, minLength: 0 })}
              id='albumName'
              placeholder='Album Name'
            />
            <input
              type='text'
              {...(register('description'), { required: true, maxLength: 80, minLength: 0 })}
              id='albumName'
              placeholder='Descritpion'
            />
            <input type='submit' value='Create' />
          </form>
        </div>
        <div className={styles.AlbumsGrid}>
          {albums?.map((album) => {
            return (
              <Link className={styles.AlbumsItem} to={`album/${album.id}`} key={album.id}>
                <div className={styles.AlbumsName}>
                  <span>{album.name}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};
