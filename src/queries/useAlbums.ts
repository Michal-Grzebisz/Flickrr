import { useMutation, useQuery } from 'react-query';

import { queryClient } from '../constans';
import {
  addAlbumPhotos,
  addAlbumPhotoToFavourite,
  AlbumPhotosDTO,
  createAlbum,
  CreateAlbumDTO,
  CreateAlbumImageDTO,
  DeleteAlbumImageDTO,
  deleteAlbumPhotos,
  FavouritePhotoDTO,
  getAlbumPhotos,
  getAlbums,
  getFavouritePhotos,
} from '../services/Albums';
export const useAlbums = () => useQuery('albums', () => getAlbums());
export const useAlbumPhotos = (data: AlbumPhotosDTO) =>
  useQuery(['photos-in-album', data.albumId], () => getAlbumPhotos({ albumId: data.albumId }));
export const useFavouritePhotos = () => useQuery('favourite-photos', () => getFavouritePhotos());

export const useAddAlbum = () =>
  useMutation(
    (data: CreateAlbumDTO) => {
      return createAlbum(data);
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries('albums');
      },
    },
  );

export const useAddImage = () =>
  useMutation((data: CreateAlbumImageDTO) => {
    return addAlbumPhotos(data);
  });

export const useDeleteImage = () =>
  useMutation(
    (data: DeleteAlbumImageDTO) => {
      return deleteAlbumPhotos(data);
    },
    {
      onSuccess: async () => {
        console.log('red');
        queryClient.invalidateQueries('photos-in-album');
      },
    },
  );

export const useAddImageToFavourite = () =>
  useMutation((data: FavouritePhotoDTO) => {
    return addAlbumPhotoToFavourite(data);
  });
