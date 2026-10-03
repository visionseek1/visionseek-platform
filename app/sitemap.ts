import type {MetadataRoute} from 'next';
const routes=['','/about','/about/what-we-do','/pharmaceuticals','/insights','/reports','/work-with-us','/start','/privacy','/terms'];
export default function sitemap():MetadataRoute.Sitemap {
 return [...routes.flatMap(route=>['','/ar','/ko'].map(prefix=>({url:`https://visionseek.org${prefix}${route}`,changeFrequency:'monthly' as const,priority:route?0.7:1,alternates:{languages:{en:`https://visionseek.org${route}`,ar:`https://visionseek.org/ar${route}`,ko:`https://visionseek.org/ko${route}`}}}))),...['','/ar'].map(prefix=>({url:`https://visionseek.org${prefix}/reports/physical-ai`,changeFrequency:'yearly' as const,priority:0.3}))];
}
