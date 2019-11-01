import React, { useEffect, useState } from 'react';
import styles from '../style/search.module.less';

export interface SearchProps {
  defaultSearch?: boolean;
}

export function Search({ defaultSearch = false }: SearchProps) {
  const [visible, setVisible] = useState(defaultSearch)

  function toggleSearchBar(ev: KeyboardEvent) {
    if (ev.metaKey && ev.keyCode === 70) {
      setVisible(t => !t);
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', toggleSearchBar);
    return () => window.removeEventListener('keydown', toggleSearchBar);
  }, []);

  return (
    <div className={styles.search}>
      <input className={styles.searchInput} />

      <span className={styles.iconPrev} />
      <span className={styles.iconNext} />
      <span className={styles.iconClose} />
    </div>
  );
}
