import { useEffect, useState } from 'react';
import { throttle } from 'lodash';

const useScrollY = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isScrollTop, setIsScrollTop] = useState(true);

  useEffect(() => {
    setScrollY(window.scrollY);
    const scroll = throttle(() => {
      setScrollY(window.scrollY);
      setIsScrollTop(!(window.scrollY > 0));
    }, 200);

    const handleScroll = () => {
      scroll();
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return {
    scrollY,
    isScrollTop,
  };
};

export default useScrollY;
