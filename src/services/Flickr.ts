import axios from 'axios';
import queryString from 'query-string';

const FLICKR_API_KEY = '21eff94587aae102b88bfeff2b950900';
const BASE_URL = 'https://api.flickr.com/services/rest/';

enum FlickrMethod {
  getRecent = 'flickr.photos.getRecent',
  search = 'flickr.photos.search',
  getInfo = 'flickr.photos.getInfo',
}

export interface FlickrPhotosResponse {
  page: number;
  pages: number;
  perpage: number;
  total: number;
  photo: FlickrRawPhotoDTO[];
}

export interface FlickrResponse {
  photos: FlickrPhotosResponse;
}

export interface FlickrRawPhotoDTO {
  id: string;
  owner: string;
  secret: string;
  server: string;
  farm: number;
  title: string;
  ispublic: number;
  isfriend: number;
  isfamily: number;
  dateupload: string;
  ownername: string;
}

export interface FlickrOptions {
  page?: number;
  per_page?: number;
  pageParam?: number;
  text?: string;
}

interface FlickrParams extends FlickrOptions {
  method: FlickrMethod;
  api_key: string;
  format: string;
  nojsoncallback: string;
  extras: string;
}

// TODO:
//  - find a way how you can search for the photos
//  - update FlickrRawPhotoDTO definition to respect the real response
//  - update getPhotos method definition to support pagination -> enable "Fetch more"
//  - construct link based on params (add a separate method for building a Flickr API link)
//      - use `querystring` library to easily manipulate the parameters
//  - look how you can add different filters, like date, type, text, etc.

class FlickrService {
  public getPhotos(options: FlickrOptions): Promise<FlickrPhotosResponse> {
    const { page, per_page, ...restParams } = options;

    if (restParams.text?.length === 0) {
      delete restParams.text;
    }

    const queryParams: FlickrParams = {
      api_key: FLICKR_API_KEY,
      method: Object.keys(restParams).length > 0 ? FlickrMethod.search : FlickrMethod.getRecent,
      format: 'json',
      nojsoncallback: '?',
      extras: ['date_upload', 'owner_name'].join(','),
      page,
      per_page,
      ...restParams,
    };

    const stringifiedQueryParams = queryString.stringify(queryParams);

    const apiUrl = `${BASE_URL}?${stringifiedQueryParams}`;
    // console.log(apiUrl)

    return axios.get<FlickrResponse>(apiUrl).then((response) => {
      // console.log('🦑', 'Flick service response', response.data.photos);
      return response.data.photos;
    });
  }

  public getPhoto(id: string) {
    const queryParams = {
      api_key: FLICKR_API_KEY,
      method: FlickrMethod.getInfo,
      format: 'json',
      nojsoncallback: '1',
      photo_id: id,
    };

    const stringifiedQueryParams = queryString.stringify(queryParams);
    const apiUrl = `${BASE_URL}?${stringifiedQueryParams}`;

    // console.log(apiUrl);

    return axios.get(apiUrl).then((response) => {
      // console.log("response",response)
      return response.data.photo;
    });
  }

  public getPhoto2(id: string) {
    const queryParams = {
      method: FlickrMethod.getInfo,
      api_key: FLICKR_API_KEY,
      photo_id: id,
      format: 'json',
      nojsoncallback: '1',
    };

    const stringifiedQueryParams = queryString.stringify(queryParams);
    const apiUrl = `${BASE_URL}?${stringifiedQueryParams}`;

    // console.log(apiUrl);

    return axios.get(apiUrl).then((response) => {
      // console.log("response",response)
      return response.data.photo;
    });
  }
}

const instance = new FlickrService();
export { instance as FlickrService };
