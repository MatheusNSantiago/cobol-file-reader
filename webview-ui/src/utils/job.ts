import { JobVersion } from '../models/jobs/JobVersion.model';

export const returnLatestVersion = (versions: JobVersion[]): JobVersion => {
  return versions.length > 1 && versions[1] ? versions[1] : versions[0];
};
