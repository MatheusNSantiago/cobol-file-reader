import { JobPolicy } from './JobPolicy.model';
import { JobVersion, Message } from './JobVersion.model';
import { License } from './License.model';
import { Tier } from './Tier.model';

export type VersionAnalysis = {
  version: string;
  messages: Message[];
};

export interface JobResponseRepo {
  id: number;
  /**
   * Full path of the repository
   * @example "r2devops/hub"
   */
  path: string;
  namespace: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  /**
   * The platform containing the job
   * @example "gitlab"
   */
  platform: string;
  idOnPlatform: string;
  tier: Tier;
}

export interface JobResponse {
  id: number;
  description: string;
  icon: string;
  labels: string[];
  name: string;
  repoUrl: string;
  path: string;
  rateDown: number;
  rateUp: number;
  deprecated: boolean;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  versions: JobVersion[];
  license: License | string;
  policy: JobPolicy;
  repo: JobResponseRepo;
}

export interface JobCreationResponse {
  job: JobResponse;
  analysis: VersionAnalysis[];
  errors?: { body: string };
}
export interface JobImportResponse {
  count: number;
  jobImportId: string;
  errors?: { body: string };
}

export interface JobAnalysisResult {
  job: JobResponse;
  analysis: VersionAnalysis[];
  errors?: string[];
}

export interface ImportReportAnalysis {
  count: number;
  status: 'pending' | 'done';
  result: JobAnalysisResult[];
  errors: string[];
}
