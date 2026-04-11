import { useRef, useState, useEffect, type ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  /** Distance from viewport to start rendering (default 200px) */
  rootMargin?: string;
  /** Minimum height placeholder while not yet visible */
  minHeight?: string;
}

/**
 * Defers rendering of children until the section is near the viewport.
 * Reduces initial DOM size and layout cost (TBT).
 */
const LazySection = ({ children, rootMargin = "400px", minHeight = "300px" }: LazySectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} style={visible ? undefined : { minHeight }}>
      {visible ? children : null}
    </div>
  );
};

export default LazySection;
