import {
  VSCodeDivider,
  VSCodePanelView,
  VSCodeTag,
  VSCodeTextField,
} from '@vscode/webview-ui-toolkit/react';
import { JobResponse } from '../../models/jobs/JobCreationResponse.model';
import { JobVersion } from '../../models/jobs/JobVersion.model';
import { CopyIcon } from '../icons/CopyIcon';
import { FileIcon } from '../icons/FileIcon';
import { IssuesIcon } from '../icons/IssuesIcon';
import { BugIcon } from '../icons/BugIcon';
import { SearchIcon } from '../icons/SearchIcon';
import { VerifiedIcon } from '../icons/VerifiedIcon';

type AboutViewProps = {
  job: JobResponse;
  jobIncludeUrl: string;
  id: string;
  versionInView: JobVersion;
};

export const AboutView: React.FC<AboutViewProps> = ({
  job,
  jobIncludeUrl,
  id,
  versionInView,
}: AboutViewProps) => {
  const jobNamespaceLabel = () => {
    const pathSplitted = job?.repo.path.split('/');

    if (!pathSplitted?.length) {
      return '';
    } else if (pathSplitted?.length === 2) {
      return pathSplitted[0];
    } else if (pathSplitted?.length >= 3) {
      return pathSplitted[pathSplitted.length - 2];
    } else {
      return '';
    }
  };
  return (
    <VSCodePanelView
      id={id}
      style={{
        alignItems: 'left',
        alignContent: 'left',
        flexDirection: 'column',
      }}
    >
      <div>
        <h3>
          Include this in your <u>.gitlab-ci.yml</u>
        </h3>
        <VSCodeTextField value={jobIncludeUrl}>
          <span
            style={{ cursor: 'pointer' }}
            // TODO: Add a tooltip to the copy icon
            onClick={() => navigator.clipboard.writeText(jobIncludeUrl)}
            slot="end"
            className="codicon codicon-text-size"
          >
            <CopyIcon />
          </span>
        </VSCodeTextField>
        <br />
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '.5rem',
            marginBottom: '20px',
          }}
        >
          <VerifiedIcon />
          Verified by R2Devops
        </span>
        <VSCodeDivider role={'separator'} />
        <div style={{ display: 'flex' }}>
          <div
            style={{ display: 'flex', flexDirection: 'column', width: '50%' }}
          >
            <h4>Stages</h4>
            {versionInView.stages.map((stage, index) => (
              <p key={`${stage}-${index}`}>{stage}</p>
            ))}
            <h4>Image</h4>
            {versionInView.images.map((image, index) => (
              <p key={`${image}-${index}`}>{image}</p>
            ))}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'end',
              width: '50%',
            }}
          >
            <h4>Last update</h4>
            <p>{new Date(job.updatedAt).toLocaleDateString()}</p>
            <h4>License</h4>
            <p>{job.license}</p>
          </div>
        </div>
      </div>
      <div>
        <h4>Source</h4>
        <div style={{ display: 'flex', gap: '.5rem' }}>
          {jobNamespaceLabel() && <VSCodeTag>{jobNamespaceLabel()}</VSCodeTag>}
          {job.repo.tier === 'official' && <VSCodeTag>official</VSCodeTag>}
        </div>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <h4>Labels</h4>
        <div style={{ display: 'flex', gap: '.5rem' }}>
          {job.labels.map((label) => {
            return <VSCodeTag key={label}>{label}</VSCodeTag>;
          })}
        </div>
      </div>
      <VSCodeDivider role={'separator'} />
      <div>
        <h4>Links</h4>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '0.75rem',
          }}
        >
          {/* TODO: Add the last pipeline image and antivirus scans retrieved from GitLab GraphQL API */}
          <a href={'https://gitlab.com/r2devops/hub/-/jobs/4063578176'}>
            <span
              style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}
            >
              <SearchIcon width="16" height="16" />
              Image scan
            </span>
          </a>

          <a href="https://gitlab.com/r2devops/hub/-/pipelines/828426028">
            <span
              style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}
            >
              <BugIcon />
              Antivirus
            </span>
          </a>
          <a
            href={`https://gitlab.com/${job.repo.path}/-/issues/new?issue[title]=[${job.path}]%20-`}
          >
            <span
              style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}
            >
              <IssuesIcon />
              Open issues
            </span>
          </a>
          <a
            href={`https://gitlab.com/${job.repo.path}/${versionInView.tag}/${job.path}.r2.yml`}
          >
            <span
              style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}
            >
              <FileIcon />
              R2 file
            </span>
          </a>
        </div>
      </div>
    </VSCodePanelView>
  );
};
