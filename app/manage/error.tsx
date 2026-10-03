"use client";
export default function Error({ reset }: { reset: () => void }) {
  return (
    <main dir="rtl" lang="ar" style={{ padding: "3rem", minHeight: "100vh" }}>
      <h1>تعذر فتح الغرفة</h1>
      <p>
        أعد المحاولة. لو كنت تحفظ مخرجًا، راجع سجل المهمة قبل إعادة الإرسال.
      </p>
      <button onClick={reset}>إعادة المحاولة</button>
    </main>
  );
}
