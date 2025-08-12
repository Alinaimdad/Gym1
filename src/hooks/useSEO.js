import { useEffect } from 'react';
import seoConfig from '../config/seoConfig.js';  // Path ko apne project ke hisaab se adjust kar sakte ho

const useSEO = (page) => {
  useEffect(() => {
    const pageSEO = seoConfig.pages[page] || {};
    document.title = pageSEO.title || seoConfig.defaultTitle;
    document.querySelector('meta[name="description"]')?.setAttribute(
      'content',
      pageSEO.description || seoConfig.defaultDescription
    );
  }, [page]);
};

export default useSEO;
