# بيت القادة × ChatGPT — مسودات فقط

**حالة هذا الفرع:** كود قابل للبناء، وليس اتصال ChatGPT مُفعّلًا أو منشورًا. لا توجد أداة نشر في خادم MCP.

## الوظيفة

- `POST /mcp`: خادم MCP stateless باستخدام Streamable HTTP. أداتان فقط: `create_leaders_draft` و`get_leaders_draft`.
- `GET /.well-known/oauth-protected-resource`: اكتشاف Supabase OAuth 2.1؛ عنوان المورد الثابت `https://visionseek.org/mcp`.
- `/oauth/consent`: واجهة تسجيل دخول وموافقة المحرر. تُظهر اسم العميل والصلاحيات والوجهة، وتتحقق من عضوية `leaders_editors` قبل الإذن.
- `create_leaders_draft`: يحفظ في `leaders_posts` بحالة `draft` حصريًا، ويرفع صورة JPEG/PNG/WebP حتى 1 MB إن زوّدها العميل بصيغة base64. لا يولّد الصورة بنفسه، ولا يجلب صورًا من URL خارجي. الحقل `author_id` هو صاحب OAuth الفعلي، وتُطبّق RLS الخاصة بالمحررين والتخزين الخاص.
- `get_leaders_draft`: يقرأ المسودة المرئية لهذا المحرر حسب سياسة RLS، ويعيد رابط الاستوديو دون رابط تخزين خاص.

## تفعيل الربط بعد مراجعة الفرع

1. تأكد أن `visionseek.org` يشير إلى نسخة الموقع المناسبة وأن محرر بيت القادة قادر على تسجيل الدخول. افحص توفر خدمة OAuth 2.1 Server في مشروع Supabase المستخدم فعليًا للموقع؛ لا تستنتج المشروع من اسم الحساب.
2. من لوحة Supabase للمشروع المقصود: فعّل **Authentication → OAuth Server**، واضبط Authorization Path إلى `/oauth/consent` بعد مطابقة Site URL مع `https://visionseek.org`. هذا تغيير تشغيلي منفصل عن دمج الكود. راجع المستخدم/عميل OAuth والأذونات في اللوحة، وفعّل التسجيل الديناميكي فقط إذا كان مطلوبًا للعميل الذي ستستخدمه. تحقق من نوع مفاتيح JWT إذا طُلب نطاق `openid`.
3. سجّل OAuth client مناسبًا أو اسمح بتسجيله بالمسار المدعوم، ثم خزّن `client_id` المصرح له داخل متغير Vercel **`LEADERS_MCP_ALLOWED_CLIENT_IDS`** (قائمة مفصولة بفواصل). إذا لم يُضبط المتغير، يعيد `/mcp` خطأ إعداد ويرفض العمل. لا تضع access token أو client secret داخل الكود أو المحادثة. أسماء متغيرات الموقع الحالية: `NEXT_PUBLIC_SUPABASE_URL` و`NEXT_PUBLIC_SUPABASE_ANON_KEY`؛ الأول يُستخدم لاكتشاف سلطة OAuth، والثاني مع JWT المستخدم لإعمال RLS.
4. وصّل تطبيق MCP من حساب ChatGPT المصرح به إلى `https://visionseek.org/mcp` بتسجيل الدخول والموافقة. تحقق أن الأداتين فقط ظاهرتان، وأن طلبًا بلا جلسة يعيد 401، وأن مستخدمًا غير محرر/عميلًا غير مصرح له لا ينشئ مسودة.
5. جرّب نصًا تجريبيًا وصورة صغيرة *غير منشورة*، افحص `draft` والصورة في الاستوديو. تأكد أن القارئ العام لا يرى المسودة. لا تضغط «نشر الآن» في اختبار الربط.

## الصورة وحدود التشغيل

إنتاج صورة داخل ChatGPT وعرضها للمستخدم أمر منفصل عن نقل **بايتات الصورة** إلى أداة MCP. العقد الحالي يقبل `image_base64` و`image_mime` لصورة صغيرة؛ لا تَعِد برفع صورة ظهرت في المحادثة تلقائيًا قبل اختبار أن عميل ChatGPT يمررها فعليًا إلى الأداة. إذا لم يدعم عميل الربط نقل ملف الصورة بهذه الطريقة، يظل رفعها يدويًا من الاستوديو هو المسار العملي، أو يُضاف لاحقًا مسار أصل مصرح له ومحدد النطاق بعد اختبار مستقل.

لا تُفعّل مهام n8n/Trigger المجدولة أو النشر الآلي عند إعداد هذه الوصلة. قرار النشر يبقى بيد المحرر داخل الاستوديو.

## فحوص الفرع

`npm run test:mcp` يفحص التحدي عند غياب المصادقة، وثبات `draft`، ورفض ملف صورة مزور. `npx tsc --noEmit` و`npm run build` يفحصان البناء. اختبار OAuth الفعلي، الحفظ في Supabase، ورفع صورة حقيقية يحتاج بيئة معاينة موصولة بمشروع اختبار أو اختبارًا مصرحًا له؛ نجاح البناء وحده لا يثبت هذه الخطوات.

## مراجع تنفيذية

- OpenAI: https://developers.openai.com/plugins/build/mcp-server
- OpenAI authentication: https://developers.openai.com/plugins/build/auth
- Supabase OAuth MCP: https://supabase.com/docs/guides/auth/oauth-server/mcp-authentication
- Supabase OAuth setup: https://supabase.com/docs/guides/auth/oauth-server/getting-started
