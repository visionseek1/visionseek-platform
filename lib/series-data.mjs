import { agenticSeries } from "./series-agentic.mjs";
import { dronesSeries } from "./series-drones.mjs";
import { gridSeries } from "./series-grid.mjs";

export const seriesList = [agenticSeries, gridSeries, dronesSeries];

export const learnSlugs = seriesList.flatMap((series) => series.parts.map((part) => part.slug));

export function learnCoverExtras() {
  return seriesList.flatMap((series) =>
    series.parts.map((part) => ({
      slug: part.slug,
      publishedAt: part.publishedAt,
      fieldId: series.fieldId,
    })),
  );
}
