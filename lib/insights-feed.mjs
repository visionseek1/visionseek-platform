const PRODUCTION_LIVE_FEED =
  "https://raw.githubusercontent.com/visionseek1/visionseek-platform/main/public/insights.json";

const DEPLOYMENT_FEED = "/insights.json";

export function insightsFeedUrl(vercelEnv = process.env.VERCEL_ENV) {
  // Preview and development must not read raw main/public/insights.json.
  // That URL is Production's live feed, so a Preview deploy would show Production
  // signals, and a Vercel rollback of the site would not revert Insights.
  if (vercelEnv === "production") return PRODUCTION_LIVE_FEED;
  return DEPLOYMENT_FEED;
}
