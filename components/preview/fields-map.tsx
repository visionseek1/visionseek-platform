"use client";

import {useState} from "react";
import styles from "./direction.module.css";

export type MapField = {id: string; focus: boolean; title: string; line: string; badge: string};

export default function FieldsMap({label, fields}: {label: string; fields: MapField[]}) {
  const first = fields.find(field => field.focus) ?? fields[0];
  const [active, setActive] = useState(first.id);
  const current = fields.find(field => field.id === active) ?? first;

  return (
    <div className={styles.map}>
      <div className={styles.mapGrid} role="group" aria-label={label}>
        {fields.map(field => (
          <button
            type="button"
            key={field.id}
            className={field.focus ? styles.nodeNow : styles.nodeSoon}
            aria-pressed={field.id === active}
            onClick={() => setActive(field.id)}
          >
            <span className={styles.badge}>{field.badge}</span>
            <span className={styles.nodeName}>{field.title}</span>
          </button>
        ))}
      </div>
      <p className={styles.readout} aria-live="polite">
        <span>{current.title}</span>
        {current.line}
      </p>
    </div>
  );
}
