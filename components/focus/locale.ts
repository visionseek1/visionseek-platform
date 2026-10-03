export type PublicLocale = 'ar' | 'en' | 'ko';
export const localePrefix = (locale: PublicLocale) => locale === 'en' ? '' : `/${locale}`;
export const pick = (locale: PublicLocale, ar: string, en: string, ko: string) => locale === 'ar' ? ar : locale === 'ko' ? ko : en;
export const korean: Record<string, string> = {
 'START WITH YOUR INSTITUTION’S NEED':'귀 기관의 필요에서 시작합니다',
 'What capability does your institution need?':'귀 기관에는 어떤 역량이 필요합니까?',
 'Tell us the outcome you want to achieve, or the technology and knowledge you own in Korea that could serve institutions in Egypt and the Gulf.':'달성하고자 하는 목표를 알려 주세요. 또는 이집트와 걸프 지역 기관에 적용할 수 있는 한국의 기술과 지식을 소개해 주세요.',
 'Build your solutions with us':'함께 솔루션 만들기',
 'Contact via WhatsApp':'WhatsApp으로 문의',
 'OUR FIRST SPECIALIZATION / PHARMACEUTICALS':'첫 번째 전문 분야 / 제약',
 'Explore pharmaceuticals':'제약 분야 살펴보기',
 'Illustrative laboratory technology':'실험실 기술을 보여 주는 예시 이미지',
 'Illustrative image; not a VisionSeek facility.':'예시 이미지이며 VisionSeek의 시설이 아닙니다.',
 'FOUNDER':'창립자',
 'What works there can open possibilities here.':'한국에서 입증된 역량이 현지의 새로운 가능성으로 이어집니다.',
 'The capability your institution needs may already be in use inside a Korean company or institution. VisionSeek works to transfer that capability, including its technology, knowledge and expertise, so it can be used in your setting.':'귀 기관에 필요한 역량이 이미 한국의 기업이나 기관에서 활용되고 있을 수 있습니다. VisionSeek은 기술, 지식, 전문성을 함께 이전하여 현지에서 활용할 수 있도록 하는 데 집중합니다.',
 'Understand VisionSeek’s role':'VisionSeek의 역할',
 'The outcome: a capability working in your institution.':'목표는 귀 기관 안에서 실제로 작동하는 역량입니다.',
 'Your institution can use, understand and operate the technology, and develop how it is applied. The form of collaboration can vary by capability. The purpose remains critical capability transfer.':'기술을 이해하고 운영하며 활용 방식을 발전시킬 수 있는 기관 역량을 지향합니다. 협력의 형태는 역량마다 달라질 수 있지만, 목적은 핵심 역량 이전입니다.',
 'Based in Incheon, South Korea, we focus on institutions in Egypt and the Gulf. Pharmaceuticals is our first specialization within the broader mission of critical capability transfer.':'대한민국 인천을 기반으로 이집트와 걸프 지역 기관에 집중합니다. 제약은 핵심 역량 이전이라는 폭넓은 사명을 처음 적용하는 전문 분야입니다.',
 'ABOUT VISIONSEEK':'VISIONSEEK 소개',
 'Connecting Korean capabilities with your institution’s needs.':'한국의 역량을 귀 기관의 필요와 연결합니다.',
 'WORK WITH US':'협력 문의',
 'A capability you need. Or one you can transfer.':'필요한 역량, 또는 이전할 수 있는 역량.',
 'We welcome conversations with institutions in Egypt and the Gulf, and owners of technology and knowledge in Korea, about critical capability transfer.':'핵심 역량 이전을 위해 이집트와 걸프 지역 기관, 그리고 한국의 기술·지식 보유 기업 및 기관과 대화합니다.',
 'For institutions in Egypt & the Gulf':'이집트·걸프 지역 기관',
 'What would you like your institution to be able to develop or operate? Start with the need and the outcome.':'귀 기관에서 무엇을 개발하거나 운영하고 싶으신가요? 필요한 역량과 목표를 알려 주세요.',
 'Discuss your institution’s need':'기관의 필요 상담하기',
 'For capability owners in Korea':'한국의 기술·역량 보유 기업',
 'If you own technology or transferable knowledge, tell us about its existing use and potential application in the region.':'이전할 수 있는 기술이나 지식을 보유하고 있다면 현재의 활용 사례와 해당 지역에서의 적용 가능성을 소개해 주세요.',
 'Introduce your capability':'보유 역량 소개하기',
 'PHARMACEUTICALS':'제약',
 'OUR FIRST SPECIALIZATION':'첫 번째 전문 분야',
 'Every transfer of knowledge opens possibilities for what your institution can do. We start with pharmaceutical capabilities already working in Korea, for institutions in Egypt and the Gulf seeking to build local capabilities.':'지식의 이전은 기관이 할 수 있는 일의 범위를 넓힙니다. 한국에서 이미 활용되는 제약 역량을 바탕으로, 현지 역량을 구축하려는 이집트와 걸프 지역 기관을 향합니다.',
 'Discuss a capability you need':'필요한 역량 상담하기',
 'Explore our role':'우리의 역할 살펴보기',
 'Illustrative laboratory work with advanced technology':'첨단 기술을 활용한 실험실 작업 예시',
 'Knowledge moves. Possibilities grow.':'지식의 이전, 가능성의 확장.',
 'Illustrative image; not a VisionSeek facility or project.':'예시 이미지이며 VisionSeek의 시설이나 프로젝트를 나타내지 않습니다.',
 'FROM SCIENTIFIC PROGRESS TO LOCAL CAPABILITY':'과학의 진보에서 현지의 역량으로',
 'Our ambition: turn the progress we see into capabilities we can use.':'과학의 진보가 현지에서 활용하는 역량이 되기를 바랍니다.',
 'Pharmaceuticals is our first focus. Our work connects capabilities developed in Korea with regional institutions’ ambitions in development, manufacturing and knowledge transfer, bringing progress closer to their teams and operations.':'제약은 우리의 첫 번째 집중 분야입니다. 한국에서 발전한 역량을 현지 기관의 개발, 제조, 지식 이전 목표와 연결하여 그 진보가 현지 팀과 업무에 가까워지도록 합니다.',
 'What could a new capability bring to your institution?':'새로운 역량은 귀 기관에 어떤 가능성을 열어 줄까요?',
 'These are forms of value we work towards. What can be transferred depends on the capability, its owners and the institution’s needs.':'우리가 지향하는 가치의 예시입니다. 실제 이전 가능한 범위는 해당 역량, 보유 기관, 수요 기관의 필요에 따라 달라집니다.',
 'Our role in pharmaceuticals: capability transfer.':'제약 분야에서 우리의 역할은 역량 이전입니다.',
 'We focus on transferring the technology, knowledge and expertise that enable an institution to develop local capability. Collaboration can take different forms depending on the capability and the institution.':'기관이 현지 역량을 구축하는 데 필요한 기술, 지식, 전문성의 이전에 집중합니다. 협력의 형태는 역량과 기관에 따라 달라질 수 있습니다.',
 'We do not trade or distribute medicines, or provide drug registration services.':'의약품 매매·유통 또는 의약품 등록 대행 서비스를 제공하지 않습니다.',
};
export function translate(locale: PublicLocale, ar: string, en: string) {
 if (locale === 'ar') return ar;
 if (locale === 'ko') {
  const value = korean[en];
  if (!value) throw new Error(`Missing Korean translation: ${en}`);
  return value;
 }
 return en;
}
