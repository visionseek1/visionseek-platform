'use client';
import {useState, type FormEvent} from 'react';
import {mailto, site} from '@/lib/site';
import styles from './competitions.module.css';

type Team = {id: string; project: string; competition: string};
type Labels = {name: string; email: string; role: string; link: string; note: string; submit: string; competition: string};

const withScheme = (link: string) => (/^[a-z][a-z\d+.-]*:/i.test(link) ? link : `https://${link}`);

/** «انضم»: opens a draft to the site email in the visitor's mail app. Nothing is sent or stored by the site. */
export default function JoinForm({teams, labels, subject}: {teams: Team[]; labels: Labels; subject: string}) {
  const [teamId, setTeamId] = useState(teams[0]?.id ?? '');
  const team = teams.find(t => t.id === teamId);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? '').trim();
    const body = [
      `${labels.name}: ${value('name')}`,
      `${labels.email}: ${value('email')}`,
      `${labels.role}: ${value('role')}`,
      `${labels.link}: ${withScheme(value('link'))}`,
      team ? `${labels.competition}: ${team.competition}` : '',
    ].filter(Boolean).join('\n');
    window.location.href = mailto(`VisionSeek — ${team ? team.project : subject}`, body);
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      {teams.length > 1 && (
        <label className={`${styles.field} ${styles.wide}`}>
          {labels.competition}
          <select name="team" value={teamId} onChange={event => setTeamId(event.target.value)}>
            {teams.map(t => <option key={t.id} value={t.id}>{t.project} — {t.competition}</option>)}
          </select>
        </label>
      )}
      <label className={styles.field}>
        {labels.name}
        <input name="name" required maxLength={100} pattern=".*\S.*" autoComplete="name"/>
      </label>
      <label className={styles.field}>
        {labels.email}
        <input name="email" type="email" required maxLength={254} autoComplete="email" inputMode="email" dir="ltr"/>
      </label>
      <label className={styles.field}>
        {labels.role}
        <input name="role" required maxLength={120} pattern=".*\S.*" autoComplete="organization-title"/>
      </label>
      <label className={styles.field}>
        {labels.link}
        <input name="link" required maxLength={300} pattern=".*\S.*" autoComplete="url" inputMode="url" dir="ltr" placeholder="https://"/>
      </label>
      <div className={styles.formFoot}>
        <button type="submit" className={styles.button}>{labels.submit}</button>
        <p className={styles.note}>
          {labels.note}{' '}
          <a className={styles.address} href={mailto()} dir="ltr">{site.email}</a>
        </p>
      </div>
    </form>
  );
}
