//THIRD PARTY MODULES
import { useCallback, useEffect, useRef, useState } from 'react';

export default function useScrollableAnim(slideLength: number, autoTime = 5000) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalSlide = useRef<NodeJS.Timeout>();

  const animation = 500;

  const anim = useCallback((ms = animation, current: number) => {
    // console.log(ms);
    const sectionEl = containerRef.current;
    if (!sectionEl) return;
    sectionEl.style.transitionDuration = `${ms}ms`;
    sectionEl.style.transform = `translateX(${(-current - 1) * 100}%)`;
  }, []);

  const prev = () => {
    if (currentIndex <= -1) return;
    setCurrentIndex((prev) => {
      anim(animation, prev - 1);
      return prev - 1;
    });
  };

  const next = useCallback(() => {
    if (currentIndex >= slideLength) return;
    setCurrentIndex((prev) => {
      anim(animation, prev + 1);
      return prev + 1;
    });
  }, [anim, currentIndex, slideLength]);

  const play = useCallback(() => {
    intervalSlide.current = setInterval(next, autoTime + animation);
  }, [next, autoTime]);

  useEffect(() => {
    const sectionEl = containerRef.current;
    if (!sectionEl) return;

    if (slideLength < 2) return;

    const transitionend = () => {
      let current = currentIndex;
      if (currentIndex <= -1) current = slideLength - 1;
      if (currentIndex >= slideLength) current = 0;
      setCurrentIndex(current);
      anim(0, current);
    };

    sectionEl.addEventListener('transitionend', transitionend);

    anim(animation, currentIndex);

    return () => {
      sectionEl.removeEventListener('transitionend', transitionend);
      if (intervalSlide.current) clearInterval(intervalSlide.current);
    };
  }, [anim, currentIndex, slideLength]);

  useEffect(() => {
    if (containerRef.current) {
      const beforeItem = containerRef.current.childNodes[slideLength - 1].cloneNode(true);
      const afterItem = containerRef.current.childNodes[0].cloneNode(true);
      containerRef.current?.prepend(beforeItem);
      containerRef.current?.append(afterItem);
    }
  }, [slideLength]);

  useEffect(() => {
    play();
    return () => clearInterval(intervalSlide.current);
  }, [play]);

  return [containerRef, { next, prev }] as const;
}
