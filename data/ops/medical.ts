/**
 * القطاع الطبي — معاينة قراءة فقط.
 * المصدر هنا ملف في المستودع، مش Notion. النقل لـ Notion محتاج موافقة المالك، ومتتعملش من الكود ده.
 * المسؤول والحالة «—» لما مش معروفين. ممنوع اختراعهم.
 */

export type MedicalOpportunity = {
  name: string;
  source: string;
  owner: string;
  nextStep: string;
  /** YYYY-MM-DD أو فاضي */
  date: string;
  venue: string;
  status: string;
};

export type MedicalRelationship = {
  organization: string;
  person: string;
  /** YYYY-MM-DD أو فاضي */
  lastContact: string;
  where: string;
};

export type MedicalResearch = {
  title: string;
  status: string;
  outputs: string;
};

export type MedicalSector = {
  title: "القطاع الطبي";
  opportunities: MedicalOpportunity[];
  relationships: MedicalRelationship[];
  research: MedicalResearch[];
};

export const medicalSector: MedicalSector = {
  title: "القطاع الطبي",
  opportunities: [
    {
      name: "Medical Korea 2026 in the UAE",
      source: "KHIDI",
      owner: "—",
      nextStep: "بلا سفر، نتواصل مع KHIDI كوريا لمقابلات أونلاين/كوريا",
      date: "2026-10-22",
      venue: "ADNEC",
      status: "—",
    },
  ],
  relationships: [],
  research: [],
};
