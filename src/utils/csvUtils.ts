import { UrinationEntry } from "../types/UrinationEntry";
import debug from "./debug";

export const exportToCSV = (entries: UrinationEntry[]) => {
  const headers = [
    "id",
    "timestamp",
    "durationSeconds",
    "pressure",
    "volumeMl",
    "notes",
    "estimatedVolumeMl",
  ];
  const csvContent = [
    headers.join(","),
    ...entries.map((entry) =>
      headers
        .map((header) =>
          header === "timestamp"
            ? new Date(entry[header]).toISOString()
            : entry[header as keyof UrinationEntry]
        )
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "ovisa_flowlog_data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  debug("Data exported to CSV");
};

export const importFromCSV = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const text = event.target?.result as string;
      const lines = text.split("\n");
      const headers = lines[0].split(",");
      const entries = lines.slice(1).map((line: string) => {
        const values = line.split(",");
        return headers.reduce((obj: Record<string, any>, header: string, index: number) => {
          if (header === "timestamp") {
            obj[header] = new Date(values[index]).getTime();
          } else if (header === "volume") {
            obj[header] = values[index] ? parseInt(values[index], 10) : null;
          } else if (header === "duration") {
            obj[header] = parseInt(values[index], 10);
          } else {
            obj[header] = values[index];
          }
          return obj;
        }, {});
      });
      debug("Data imported from CSV", entries);
      resolve(entries);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
};
