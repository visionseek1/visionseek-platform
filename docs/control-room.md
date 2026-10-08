# غرفة التحكم — المرحلة 1

اللوحة على `/admin` بـ Decap CMS. أي حفظ يفتح فرعًا وطلب دمج. الدمج يدوي، ولا كتابة على `main`.

مفاتيح GitHub لا تُحفظ في المستودع. تُضبط في Vercel فقط:

- `DECAP_OAUTH_CLIENT_ID`
- `DECAP_OAUTH_CLIENT_SECRET`

عنوان الرجوع في تطبيق GitHub OAuth يجب أن يكون:

`https://visionseek.org/api/decap-oauth/callback`

قبل ضبط المفتاحين تظهر رسالة «تسجيل الدخول غير جاهز» ولا يُفتح الموقع للتحرير.
