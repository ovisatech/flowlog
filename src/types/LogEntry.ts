export type LogEntry = {
  volume: number;
  type: string;
  notes: string;
  timestamp: number;
  entryType: "urination" | "intake";
};
