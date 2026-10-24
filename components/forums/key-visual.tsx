import Image from 'next/image';
import styles from './forums.module.css';

export function IncheonKeyVisual({alt}: {alt: string}) {
  return (
    <figure className={styles.visual} dir="ltr">
      <img
        className={styles.visualMark}
        src="/forums/incheon-dialogue.svg"
        alt={alt}
        width={1200}
        height={380}
      />
      <div className={styles.logoTile} aria-hidden="true">
        <Image
          src="/visionseek-symbol-color.png"
          alt=""
          width={36}
          height={36}
        />
      </div>
    </figure>
  );
}
