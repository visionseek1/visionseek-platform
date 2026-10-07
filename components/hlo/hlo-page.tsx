import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Locale } from '@/components/capability/content';
import { CapabilityHeader } from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import { hloFields, hloSteps } from './content';
import styles from './hlo.module.css';

export default function HloPage({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const base = ar ? '/ar' : '';
  const facts = ar
    ? [
        ['الجغرافيا', 'مصر والخليج.'],
        ['مصدر القدرة', 'أي نظام شغال فعلًا في العالم، بمصدر أولي.'],
        ['كوريا', 'مكان الرصد والجسر. ليست سقف العرض، وليست المنتج.'],
        ['الشراكة', 'لا ندّعي شراكة مع أي جهة.'],
      ]
    : [
        ['Geography', 'Egypt and the Gulf.'],
        ['Source of capability', 'Any system actually running in the world, from a primary source.'],
        ['Korea', 'Where we watch, and the bridge. Not the ceiling of the offer, and not the product.'],
        ['Partnership', 'We claim no partnership with any entity.'],
      ];
  const bounds = ar
    ? [
        'لا نقف عند الورقة أو النموذج.',
        'لا نعيد صياغة HLO كمذكرة قرار، ولا كتشخيص ينتهي بورقة.',
        'لا كتالوج قطاعات.',
        'HLO ليس أحد برامج الموقع.',
        'هذا العرض لا يذكر سعرًا، ولا مدة، ولا حالة نجاح، ولا عميلًا، ولا شراكة.',
        'الذكاء الاصطناعي ليس اسم المنتج، وليس الخدمة التي تُباع.',
      ]
    : [
        'We do not stop at a paper or a model.',
        'We do not recast HLO as a decision memo, or as a diagnosis that ends in a paper.',
        'No sector catalog.',
        'HLO is not one of the site’s programs.',
        'This offer states no price, no duration, no success case, no client, and no partnership.',
        'AI is not the product name, and it is not the service being sold.',
      ];

  return (
    <div className={`vs-site locale-${locale}`} lang={locale} dir={ar ? 'rtl' : 'ltr'}>
      <CapabilityHeader locale={locale} path="/hlo" />
      <main id="main-content" className={styles.page}>
        <section className={styles.hero}>
          <nav className={styles.breadcrumb} aria-label={ar ? 'مسار الصفحة' : 'Breadcrumb'}>
            <Link href={base || '/'}>VisionSeek</Link>
            <span aria-hidden="true">/</span>
            <span>HLO</span>
          </nav>
          <p className={styles.eyebrow}>HIGHEST LEVEL ONE</p>
          <h1>{ar ? 'قسم البحث والتطوير لمؤسستك في هذا العصر.' : 'Your institution’s research and development in this era.'}</h1>
          <p className={styles.lead}>{ar ? 'ندرس واقعكم، ونرى ما أصبح ممكنًا الآن، وندخل نركّب القدرة التي ترفع فاعليتكم، ثم نطوّرها بعد أن تشتغل.' : 'We study your reality, see what is now possible, enter and install the capability that raises your effectiveness, then develop it after it is running.'}</p>
          <p className={styles.aside}>{ar ? 'المؤسسة لا تبني هذا القسم عندها. VisionSeek تؤدي وظيفته وهي مرتبطة بها.' : 'The institution does not build this department itself. VisionSeek performs its function while connected to it.'}</p>
          <div className={styles.heroActions}>
            <a className={styles.primary} href="#do">{ar ? 'ماذا نفعل' : 'What we do'}<ArrowRight size={20} aria-hidden="true" /></a>
            <a className={styles.textLink} href="#message">{ar ? 'جهّز رسالة' : 'Prepare a message'}<ArrowRight size={18} aria-hidden="true" /></a>
          </div>
        </section>

        <section className={styles.ai} aria-labelledby="hlo-ai">
          <strong id="hlo-ai">{ar ? 'الذكاء الاصطناعي يشرح العصر.' : 'AI explains the era.'}</strong>
          <p>{ar ? 'يرفع سقف المتاح، ويجعل التقرير وحده رخيصًا. ليس اسم المنتج، وليس الخدمة التي تُباع.' : 'It raises the ceiling of what is available, and makes a report on its own cheap. It is not the product name, and it is not the service being sold.'}</p>
        </section>

        <section className={styles.light} id="who" aria-labelledby="hlo-who">
          <p className={styles.eyebrow}>{ar ? 'لمن' : 'FOR WHOM'}</p>
          <h2 id="hlo-who">{ar ? 'لقيادي يملك القرار، ويفتح الباب.' : 'For the leader who holds the decision and opens the door.'}</h2>
          <p className={styles.lead}>{ar ? 'لمن يستطيع أن يعتمد القرار، وأن يدخل VisionSeek إلى أرض الواقع داخل المؤسسة.' : 'For whoever can adopt the decision and bring VisionSeek onto the ground inside the institution.'}</p>
          <ul className={styles.facts}>
            {facts.map(([title, body]) => (
              <li key={title}><strong>{title}</strong><p>{body}</p></li>
            ))}
          </ul>
        </section>

        <section id="do" aria-labelledby="hlo-do">
          <p className={styles.eyebrow}>{ar ? 'ماذا نفعل' : 'WHAT WE DO'}</p>
          <h2 id="hlo-do">{ar ? 'خمس خطوات، بهذا الترتيب.' : 'Five steps, in this order.'}</h2>
          <p className={styles.aside}>{ar ? 'الدراسة بوابة دخول، ليست المنتج. التقرير ورقة داخل المسار، ليست العرض، وليست نقطة توقف.' : 'The study is an entry gate, not the product. The report is a paper inside the path, not the offer, and not a place to stop.'}</p>
          <div className={styles.steps}>
            {hloSteps.map((step, index) => (
              <article key={step.en}>
                <span className={styles.index} aria-hidden="true">0{index + 1}</span>
                <div>
                  <h3>{ar ? step.titleAr : step.titleEn}</h3>
                  <p>{ar ? step.bodyAr : step.bodyEn}</p>
                  <p className={styles.note}><strong>{ar ? 'في هذه الخطوة' : 'In this step'}</strong>{ar ? step.noteAr : step.noteEn}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="not" aria-labelledby="hlo-not">
          <p className={styles.eyebrow}>{ar ? 'ماذا لا نفعل' : 'WHAT WE DO NOT DO'}</p>
          <h2 id="hlo-not">{ar ? 'ما لا يرفع فاعلية هذه المؤسسة يُترك.' : 'What does not raise this institution’s effectiveness is left.'}</h2>
          <ul className={styles.bounds}>
            {bounds.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <section className={`${styles.light} ${styles.remains}`} id="after" aria-labelledby="hlo-after">
          <p className={styles.eyebrow}>{ar ? 'بعد التشغيل' : 'AFTER IT IS RUNNING'}</p>
          <h2 id="hlo-after">{ar ? 'ما يبقى هو القدرة وهي تعمل.' : 'What remains is the capability while it is working.'}</h2>
          <p>{ar ? 'نبقى مرتبطين بالمؤسسة. نتابع التنفيذ، ونطوّر ما تم تنفيذه من الاستخدام الحقيقي، لا من ورقة سبقت التشغيل.' : 'We stay connected to the institution. We follow the implementation, and develop what was implemented from real use, not from a paper written before it ran.'}</p>
        </section>

        <section className={styles.invite} id="message" aria-labelledby="hlo-message">
          <p className={styles.eyebrow}>{ar ? 'الدعوة' : 'THE INVITATION'}</p>
          <h2 id="hlo-message">{ar ? 'جهّز رسالة بخمسة حقول.' : 'Prepare a message in five fields.'}</h2>
          <p className={styles.lead}>{ar ? 'تجهيز الرسالة ليس تسجيل طلب. لا تُحفظ هنا، ولا تُرسل إلا إذا أرسلتها أنت.' : 'Preparing the message does not record a request. It is not saved here, and it is not sent unless you send it.'}</p>
          <ol className={styles.fields}>
            {hloFields.map((field, index) => (
              <li key={field.en}><span>0{index + 1}</span>{ar ? field.ar : field.en}</li>
            ))}
          </ol>
          <Link className={styles.primary} href={`${base}/start?from=programs&program=hlo`}>{ar ? 'جهّز الرسالة' : 'Prepare the message'}<ArrowRight size={20} aria-hidden="true" /></Link>
          <p className={styles.quiet}>{ar ? 'رسالة مجهزة ليست طلبًا مسجّلًا.' : 'A prepared message is not a recorded request.'}</p>
        </section>
      </main>
      <CapabilityFooter locale={locale} />
    </div>
  );
}
