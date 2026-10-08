/* Small additions around Decap for /admin:
   1. A help button that opens the Arabic guide (/admin/guide).
   2. A live preview for «الشريط العلوي والتذييل»: drag a section and see the header order change as you go.
   Nothing here touches content or the GitHub backend. Loaded after decap-cms.js, before CMS.init(). */
(function () {
  function addHelp() {
    if (document.getElementById('vs-help')) return;
    var link = document.createElement('a');
    link.id = 'vs-help';
    link.href = '/admin/guide';
    link.target = '_blank';
    link.rel = 'noopener';
    link.dir = 'rtl';
    link.textContent = '؟ دليل الاستخدام';
    link.title = 'كيف تعدّل وتنشر وتخفي، في دقيقتين';
    document.body.appendChild(link);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addHelp);
  else addHelp();

  var CMS = window.CMS;
  var h = window.h;
  if (!CMS || !h) return;

  CMS.registerPreviewStyle('/admin/preview.css');

  function plain(value) {
    return value && typeof value.toJS === 'function' ? value.toJS() : value;
  }

  // Same rule as lib/institution/navigation.ts: «التقارير» sits just before the news section.
  function headerOrder(sections, reports) {
    var out = [];
    sections.forEach(function (section) {
      if (reports && section.path === '/news') out.push(Object.assign({reports: true}, reports));
      out.push(section);
    });
    return out;
  }

  function bar(items, lang) {
    return h('div', {className: 'bar', dir: lang === 'ar' ? 'rtl' : 'ltr'},
      h('span', {className: 'brand'}, 'VisionSeek'),
      h('ol', null, items.map(function (item, i) {
        return h('li', {key: lang + i, className: item.reports ? 'auto' : ''}, item[lang] || item.path || '—');
      })));
  }

  function NavigationPreview(props) {
    var data = plain(props.entry.getIn(['data'])) || {};
    var sections = (data.sections || []).filter(Boolean);
    var items = headerOrder(sections, data.reports);
    return h('main', {dir: 'rtl'},
      h('h1', null, 'هكذا يظهر الشريط العلوي'),
      h('p', {className: 'hint'}, 'اسحب أي قسم من المقبض في النموذج، والترتيب هنا يتغير معك. «التقارير» تُضاف تلقائيًا قبل «الأخبار». الأقسام المخفية من «إظهار وإخفاء» لا تظهر على الموقع.'),
      h('h2', null, 'العربية'),
      bar(items, 'ar'),
      h('h2', null, 'English'),
      bar(items, 'en'),
      h('h2', null, 'الروابط تحت كل قسم'),
      h('div', {className: 'grid'}, items.map(function (section, i) {
        return h('section', {key: 's' + i},
          h('h3', null, (section.ar || '—') + ' ', h('code', null, section.path || '')),
          h('ul', null, (section.children || []).filter(Boolean).map(function (child, j) {
            return h('li', {key: j}, child.ar || '—', ' ', h('code', null, child.href || ''));
          })));
      })));
  }

  CMS.registerPreviewTemplate('navigation', NavigationPreview);
})();
