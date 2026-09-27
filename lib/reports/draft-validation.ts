import {draftContentSchema} from './drafts';

const labels:Record<string,[string,string]>={
 title_ar:['العنوان العربي','Arabic title'],title_en:['العنوان الإنجليزي','English title'],
 summary_ar:['الملخص العربي','Arabic summary'],summary_en:['الملخص الإنجليزي','English summary'],
 author:['الكاتب / فريق البحث','Author / research team'],kind:['نوع الإصدار','Publication type'],
 topics:['الموضوعات','Topics'],country:['النطاق الجغرافي','Geographic scope'],
 cover_url:['رابط الغلاف','Cover URL'],cover_alt:['وصف الغلاف','Cover description'],report_file_url:['رابط PDF','PDF URL'],
 heading_ar:['العنوان العربي','Arabic heading'],heading_en:['العنوان الإنجليزي','English heading'],
 body_ar:['النص العربي','Arabic text'],body_en:['النص الإنجليزي','English text'],
 methodology_ar:['المنهج العربي','Arabic methodology'],methodology_en:['المنهج الإنجليزي','English methodology'],
 limitations_ar:['الحدود بالعربية','Arabic limitations'],limitations_en:['الحدود بالإنجليزية','English limitations'],
 title:['عنوان المرجع','Reference title'],url:['رابط المرجع','Reference URL'],note:['ما يدعمه المرجع','Reference support'],
 sections:['أقسام التقرير','Report sections'],sources:['المراجع','References'],
};

/** Actionable field errors without returning any private field values. */
export function draftProblems(content:unknown,locale:'ar'|'en'):string[]{
 const parsed=draftContentSchema.safeParse(content);
 if(parsed.success)return [];
 const ar=locale==='ar',column=ar?0:1;
 return [...new Set(parsed.error.issues.map(issue=>{
  if(issue.message==='Add a title')return ar?'أضف عنوانًا بالعربية أو الإنجليزية.':'Add a title in Arabic or English.';
  const path=issue.path,field=String(path.at(-1)||''),name=labels[field]?.[column]||(ar?'المسودة':'Draft');
  const group=typeof path[1]==='number'?`${path[0]==='sections'?(ar?'القسم':'Section'):(ar?'المرجع':'Reference')} ${path[1]+1} / `:'';
  const reason=issue.code==='too_big'
   ?(ar?`الحد الأقصى ${issue.maximum} ${issue.type==='array'?'عناصر':'حرفًا'}.`:`Maximum ${issue.maximum} ${issue.type==='array'?'items':'characters'}.`)
   :field==='url'||field.endsWith('_url')
    ?(ar?'أدخل رابط HTTPS صالحًا بدون بيانات دخول.':'Enter a valid HTTPS URL without credentials.')
    :(ar?'راجع قيمة هذا الحقل.':'Check this field.');
  return `${group}${name}: ${reason}`;
 }))].slice(0,6);
}
