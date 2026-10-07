"use client";
import type {Locale} from '@/lib/institution/schema';

export function SourcingCover({locale}:{locale:Locale}) {
  const ar = locale === 'ar';
  const label = ar ? 'تحقق مسار توريد · عناية بالبشرة الكورية' : 'Sourcing-route verification · K-Beauty skincare';
  return <div className="vs-sourcing-cover" role="img" aria-label={ar ? `غلاف VS-P03: ${label}` : `VS-P03 cover: ${label}`}><span>VS-P03</span><strong>{label}</strong></div>;
}
