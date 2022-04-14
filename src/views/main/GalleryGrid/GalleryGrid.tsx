import { faColumns, faTh, faThLarge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Loader } from '../../../components/loader/Loader';
import { useFlickrPhotos } from '../../../queries/useFlickr';
import { FlickrOptions } from '../../../services/Flickr';
import { ImageItem } from '../components/GalleryImageItem/GalleryImageItem';
import styles from './GalleryGrid.module.scss';

export const GalleryGrid: React.FC = () => {
  const [options, setOptions] = useState<FlickrOptions>({
    per_page: 25,
    text: '',
  });

  const [grid, setGrid] = useState<5 | 3>(3);
  const { status, data, error, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } = useFlickrPhotos(options);

  const loadMoreButtonRef = useRef<HTMLButtonElement | null>(null);
  const setRefLoad = useCallback((node) => (loadMoreButtonRef.current = node), []);

  useEffect(() => {
    if (!hasNextPage || !loadMoreButtonRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        return entries.forEach((entry) => entry.isIntersecting && !isFetchingNextPage && fetchNextPage());
      },
      {
        rootMargin: '0px',
        threshold: 0,
      },
    );

    observer.observe(loadMoreButtonRef.current);

    return () => {
      if (loadMoreButtonRef.current) {
        observer.unobserve(loadMoreButtonRef.current);
      }
    };
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  const updateSearchTerm = (e: any) => setOptions((o) => ({ ...o, text: e?.target?.value }));
  const debouncedOnChange = debounce(updateSearchTerm, 200);

  return (
    <section className={styles.GalleryContainer}>
      <div className={styles.GalleryButtons}>
        <input type='text' placeholder='Search' onChange={debouncedOnChange} />
        <div className={styles.GalleryButtonsContainer}>
          <button onClick={() => setGrid(3)}>
            <FontAwesomeIcon icon={faThLarge} />
          </button>
          <button onClick={() => setGrid(5)}>
            {' '}
            <FontAwesomeIcon icon={faTh} />
          </button>
        </div>
      </div>
      {status === 'loading' && <Loader />}
      {status === 'error' && <span>Error: {error}</span>}
      {status === 'success' && (
        <>
          <div className={grid === 5 ? styles.GalleryGrid5 : styles.GalleryGrid3}>
            {data?.pages
              ?.map((page) => page.photo)
              .flat()
              .map((p, idx) => {
                const date = dayjs(new Date(parseInt(p.dateupload) * 1000)).format('DD/MM/YYYY');

                return (
                  <ImageItem
                    idx={idx}
                    server={p.server}
                    id={p.id}
                    secret={p.secret}
                    title={p.title}
                    date={date}
                    ownerName={p.ownername}
                    key={idx}
                  />
                );
              })}
          </div>
          <div>
            <button ref={setRefLoad} onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
              {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load Newer' : 'Nothing more to load'}
            </button>
          </div>
          <div>{isFetching && !isFetchingNextPage ? 'Background Updating...' : null}</div>
        </>
      )}
    </section>
  );
};
