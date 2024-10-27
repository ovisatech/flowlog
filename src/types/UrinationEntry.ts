import { FlowPressure } from "./FlowPressure";

export type UrinationEntry = {
  id?: string;
  timestamp: string;
  durationSeconds: number;
  pressure: FlowPressure;
  notes?: string;
  volumeMl?: number;
  estimatedVolumeMl?: number;
};
