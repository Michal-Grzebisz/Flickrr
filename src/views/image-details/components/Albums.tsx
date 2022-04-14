import React, { useCallback, useState } from 'react';

import { useAddImage, useAddImageToFavourite, useAlbums, useFavouritePhotos } from '../../../queries/useAlbums';
import styles from './Albums.module.scss';

interface Props {
  flickrPhotoId: string;
}

export const Albums = ({ flickrPhotoId }: Props) => {
  const { data: albums } = useAlbums();
  const [albumId, setAlbumId] = useState('');
  const { mutate: addPhotoToAlbum } = useAddImage();
  const { mutate: AddImageToFavourite } = useAddImageToFavourite();
  const { data: favouritePhotos } = useFavouritePhotos();

  console.log(favouritePhotos);

  const handleFavouritePhoto = useCallback(() => {
    AddImageToFavourite({
      flickrId: flickrPhotoId,
    });
  }, [flickrPhotoId, AddImageToFavourite]);

  const handleAddPhtoToAlbum = useCallback(() => {
    addPhotoToAlbum({
      flickrId: flickrPhotoId,
      albumId,
    });
  }, [flickrPhotoId, albumId, addPhotoToAlbum]);

  const handleAlbumSelect = useCallback((e: React.ChangeEvent<HTMLSelectElement>): void => {
    e.preventDefault();
    setAlbumId(e.target.value);
  }, []);

  return (
    <>
      <div className={styles.AlbumsOptions}>
        Pick Album:
        <div className={styles.Select}>
          <select onBlur={() => null} onChange={handleAlbumSelect}>
            {albums?.map((item) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.AlbumsButtons}>
          <button onClick={handleAddPhtoToAlbum}>Add Photo To Album</button>
          <button onClick={handleFavouritePhoto}>Add Photo To Favourite</button>
        </div>
        {/* {flickrPhotoId ? (
          <div>{flickrPhotoId === {favouritePhotos.flickrId} ? <div>Nie</div> : <div>Tak</div>}</div>
        ) : (
          <div>Nic</div>
        )} */}
      </div>
    </>
  );
};
