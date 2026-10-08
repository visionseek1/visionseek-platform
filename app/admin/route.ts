const html = `<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title>غرفة التحكم · VisionSeek</title>
  <link rel="icon" href="/favicon.ico">
  <script>window.CMS_MANUAL_INIT = true;</script>
</head>
<body>
  <script src="/admin/decap-cms.js"></script>
  <script>
    window.CMS.init({config: "/admin/config.yml"});
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
