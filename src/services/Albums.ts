import { axiosApiInstance } from './axiosAPI';

export interface CreateAlbumDTO {
  name: string;
  description: string;
}

export interface AlbumDTO {
  id: string;
  name: string;
  isActive: boolean;
  descritpion: string;
  createdAt: string;
}

export interface CreateAlbumImageDTO {
  albumId: string;
  flickrId: string;
}

export interface DeleteAlbumImageDTO {
  albumId: string;
  photoId: string;
}

export interface AlbumPhotosDTO {
  albumId: string;
}

export interface PhotoDTO {
  flickrId: string;
  id: string;
  createdAt: string;
}

export interface FavouritePhotoDTO {
  flickrId: string;
}
export const createAlbum = (data: CreateAlbumDTO) => {
  return axiosApiInstance.post<AlbumDTO>('/album', data);
};

export const getAlbums = () => {
  return axiosApiInstance.get<AlbumDTO[]>('/album').then((resp) => resp.data);
};

export const addAlbumPhotos = (data: CreateAlbumImageDTO) => {
  return axiosApiInstance.post(`album/${data.albumId}/photos`, {
    flickrId: data.flickrId,
  });
};
export const getAlbumPhotos = (data: AlbumPhotosDTO): Promise<PhotoDTO[]> => {
  return axiosApiInstance.get<PhotoDTO[]>(`album/${data.albumId}/photos`).then((resp) => resp.data);
};
export const deleteAlbumPhotos = (data: DeleteAlbumImageDTO) => {
  return axiosApiInstance.delete(`album/${data.albumId}/photos/${data.photoId}`);
};

export const addAlbumPhotoToFavourite = (data: FavouritePhotoDTO) => {
  return axiosApiInstance.post('/favourite-image', {
    flickrId: data.flickrId,
  });
};

export const getFavouritePhotos = () => {
  return axiosApiInstance.get('/favourite-image').then((resp) => resp.data);
};
