const html = `<!doctype html>
<html lang="ar" dir="ltr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title>غرفة التحكم · VisionSeek</title>
  <link rel="icon" href="/favicon.ico">
  <link href="/admin/config.yml" type="text/yaml" rel="cms-config-url">
  <style>
    /* Decap's layout is left-to-right only; dir="rtl" on the page overlaps the sidebar and hides the entry list.
       Keep the shell LTR and let each field and label pick its own direction from its first strong character. */
    input, textarea, [contenteditable], label, h1, h2, h3, li, p, span, a, button { unicode-bidi: plaintext; }
  </style>
  <script>window.CMS_MANUAL_INIT = true;</script>
</head>
<body>
  <script src="/admin/decap-cms.js"></script>
  <script>
    window.CMS.init();
  </script>
</body>
</html>
`;

export function GET() {
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "x-robots-tag": "noindex, nofollow",
    },
  });
}
