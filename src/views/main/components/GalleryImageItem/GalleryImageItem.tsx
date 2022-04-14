import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './GalleryImageItem.module.scss';
interface ImageItemProxy {
  idx: number;
  server: string;
  id: string;
  secret: string;
  title: string;
  date: string;
  ownerName: string;
}

export const ImageItem = (proxy: ImageItemProxy) => {
  const { idx, server, id, secret, title, date, ownerName } = proxy;
  const imageSrc = `https://live.staticflickr.com/${server}/${id}_${secret}.jpg`;

  const [imgSrc, setImgSrc] = useState('');
  const rootRef = useRef(null);

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  };

  useEffect(() => {
    const imageObserver = new IntersectionObserver((elements) => {
      elements.forEach((element) => {
        if (element.isIntersecting) {
          setImgSrc(imageSrc);
        }
      });
    }, options);

    const rootRefCurrent = rootRef.current;

    if (rootRefCurrent) imageObserver.observe(rootRefCurrent);

    return () => {
      if (rootRefCurrent) imageObserver.unobserve(rootRefCurrent);
    };
  });

  const onLoad = useCallback(() => {
    return <p>Loaded</p>;
  }, []);

  return (
    <Link ref={rootRef} className={styles.WrapFocus} to={`/image/${id}/${secret}`} key={idx}>
      <div className={styles.GridImage}>
        <img
          onLoad={onLoad}
          alt={title}
          key={idx}
          src={imgSrc}
          // style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div className={styles.ThumbHover}>
          <span className={styles.ImageTitle}>{title}</span>
          <span className={styles.ImageOwnerName}>{ownerName}</span>
          <span className={styles.ImageDate}>{date}</span>
        </div>
      </div>
    </Link>
  );
};
