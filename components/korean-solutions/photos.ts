/** Illustrative field photos. Not a picture of the Korean product. One photo per item. */
export const PRODUCT_IMAGE: Record<string, string> = {
  'ai-mammography-reader': '/ks/mammo.jpg',
  'smart-heart-patch': '/ks/heart.jpg',
  'gait-training-robot': '/ks/gait.jpg',
  'dental-implants': '/ks/dental.jpg',
  'aesthetic-devices': '/ks/laser.jpg',
  'point-of-care-diagnostics': '/ks/analyzer.jpg',
  'elderly-care-call': '/ks/elder.jpg',
  'cardiac-arrest-early-warning': '/ks/monitor.jpg',
  'ai-security-cameras': '/ks/cctv.jpg',
  'container-smart-farms': '/ks/farm.jpg',
};

export const productImage = (slug: string) => PRODUCT_IMAGE[slug] || '/ks/health.jpg';
