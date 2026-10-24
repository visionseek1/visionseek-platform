import Image from 'next/image';
import styles from './forums.module.css';

export function ForumKeyVisual({
  src,
  alt,
  width = 1200,
  height = 420,
  priority = false,
  compact = false,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  compact?: boolean;
}) {
  return (
    <figure className={compact ? styles.visualCompact : styles.visual} dir="ltr">
      <Image
        className={compact ? styles.visualMarkCompact : styles.visualMark}
        src={src}
        alt={alt}
        width={width}
        height={height}
        unoptimized
        priority={priority}
      />
    </figure>
  );
}
