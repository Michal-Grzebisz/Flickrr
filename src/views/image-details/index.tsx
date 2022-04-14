import { useAuth0 } from '@auth0/auth0-react';
import dayjs from 'dayjs';
import React from 'react';
import { useParams } from 'react-router';

import { Layout } from '../../components/layout';
import { Loader } from '../../components/loader/Loader';
import { useFlickrInfoPhoto } from '../../queries/useFlickr';
import { Albums } from './components/Albums';
import styles from './ImageDetails.module.scss';

export const ImageDetailsView: React.FC = () => {
  const { id }: { id: string } = useParams();
  const { isAuthenticated } = useAuth0();
  const { data } = useFlickrInfoPhoto(id);

  return (
    <Layout>
      {data ? (
        <>
          <section className={styles.ImageDetails}>
            <div className={styles.UserInfo}>
              <div className={styles.UserImage}>
                <img
                  src={`http://farm${data.owner.iconfarm}.staticflickr.com/${data.owner.iconserver}/buddyicons/${data.owner.nsid}.jpg`}
                  alt='UserImage'
                />
              </div>
              <div className={styles.UserName}>{data.owner.username}</div>
            </div>
            <div className={styles.ImageDetailsPhoto}>
              <div className={styles.ImageDetailsPhotoWrapper}>
                <img
                  alt={data.title}
                  key={data.id}
                  src={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}.jpg`}
                />
                <div className={styles.ImageTittle}>{data.title._content}</div>
                <div className={styles.ImageDetailsPhotoInfo}>
                  <span>Views: {data.views}</span>
                  <span>Faves: {data.isfavorite}</span>
                  <span>Comments: {data.comments._content}</span>
                  <span>Date upload: {dayjs(new Date(parseInt(data.dates.posted) * 1000)).format('DD/MM/YYYY')}</span>
                </div>
              </div>
              {isAuthenticated && <Albums flickrPhotoId={id} />}
            </div>
          </section>
        </>
      ) : (
        <Loader />
      )}
    </Layout>
  );
};
