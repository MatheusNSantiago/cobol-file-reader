export enum WarningLevel {
  'CRITICAL' = 0,
  'WARNING' = 1,
}

export type Message = {
  name: string;
  level: WarningLevel;
  message?: string;
  filename?: string;
};

export interface JobVersion {
  id: number;
  tag: string;
  jobUrl: string;
  readmeUrl: string;
  changelogUrl: string;
  stages: string[];
  images: string[];
  usageCounter: number;
  createdAt: string;
  updatedAt: string;
}
