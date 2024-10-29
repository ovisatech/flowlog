import { UrinationEntry } from "../types/UrinationEntry";
import { FlowPressure } from "../types/FlowPressure";
import debug from "./debug";

const calculateAverageFlowRates = (entries: UrinationEntry[]) => {
  const volumetricFlowRatesByPressure: { [key in FlowPressure]: number[] } = {
    low: [],
    medium: [],
    high: [],
  };

  // Filter entries with volume and calculate flow rates
  entries
    .filter((entry) => entry.volumeMl != null)
    .forEach((entry) => {
      const flowRate = entry.volumeMl! / entry.durationSeconds;
      volumetricFlowRatesByPressure[entry.pressure].push(flowRate);
    });

  // Calculate averages for each pressure category
  const avgVolumetricFlowRates: { [key in FlowPressure]: number } = {
    low: 0,
    medium: 0,
    high: 0,
  };

  Object.entries(volumetricFlowRatesByPressure).forEach(([pressure, rates]) => {
    if (rates.length > 0) {
      const sum = rates.reduce((acc, rate) => acc + rate, 0);
      avgVolumetricFlowRates[pressure as FlowPressure] = sum / rates.length;
    }
  });

  debug("Calculated flow rates:", {
    sampleCounts: Object.fromEntries(
      Object.entries(volumetricFlowRatesByPressure).map(([k, v]) => [
        k,
        v.length,
      ])
    ),
    averages: avgVolumetricFlowRates,
  });

  return avgVolumetricFlowRates;
};

const calculateEstimatedVolume = (
  durationSeconds: number,
  pressure: FlowPressure,
  flowRates: { [key in FlowPressure]: number }
): number => {
  const flowRate = flowRates[pressure];
  return Math.round(durationSeconds * flowRate);
};

export const enrichEntriesWithEstimatedVolume = (
  allEntries: UrinationEntry[]
): UrinationEntry[] => {
  const flowRates = calculateAverageFlowRates(allEntries);
  return allEntries.map((entry) =>
    entry.volumeMl
      ? entry
      : {
          ...entry,
          estimatedVolumeMl: calculateEstimatedVolume(
            entry.durationSeconds,
            entry.pressure,
            flowRates
          ),
        }
  );
};
