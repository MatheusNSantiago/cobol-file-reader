import { FC } from 'react';
import { JobResponse } from '../models/jobs/JobCreationResponse.model';
import { VSCodeTag } from '@vscode/webview-ui-toolkit/react';
import { ThumbsUpIcon } from './icons/ThumbsUpIcon';
import { returnLatestVersion } from '../utils/job';

type Props = {
  job: JobResponse;
  onJobClick: (job: JobResponse) => void;
};

export const JobsExplorerRow: FC<Props> = ({ job, onJobClick }) => {
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
    <div
      id="job-row"
      style={{
        cursor: 'pointer',
        border: 'solid #3B3A3F .1rem',
        padding: '.5rem',
        borderRadius: '.5rem',
        minWidth: '430px',
        position: 'relative',
      }}
      onClick={() => onJobClick(job)}
    >
      <div style={{ flex: '2.25 1 0' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '.5rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              alignContent: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              height: '100%',
            }}
          >
            {job.icon ?? String.fromCodePoint(0x1f3f7)}
          </div>
          <h3
            aria-label={job.path}
            title={job.path}
            style={{
              margin: '0',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              maxWidth: '15rem',
            }}
          >
            {job.path}
          </h3>{' '}
          <i>{returnLatestVersion(job.versions).tag}</i>
        </div>
        <div>
          <p>{job.description}</p>
        </div>
        <div style={{ display: 'flex', gap: '.5rem' }}>
          {jobNamespaceLabel() && (
            <VSCodeTag
              style={{
                fontSize: 'var(--type-ramp-minus2-font-size)',
                lineHeight: 'var(--type-ramp-minus2-line-height)',
              }}
            >
              {jobNamespaceLabel()}
            </VSCodeTag>
          )}
          {job.repo.tier === 'official' && (
            <VSCodeTag
              style={{
                fontSize: 'var(--type-ramp-minus2-font-size)',
                lineHeight: 'var(--type-ramp-minus2-line-height)',
              }}
            >
              official
            </VSCodeTag>
          )}
          {job.labels.map((label, index) => (
            <VSCodeTag
              style={{
                fontSize: 'var(--type-ramp-minus2-font-size)',
                lineHeight: 'var(--type-ramp-minus2-line-height)',
              }}
              key={`${label}-${index}`}
            >
              {label}
            </VSCodeTag>
          ))}
        </div>
      </div>
      <p
        style={{
          minWidth: 'max-content',
          position: 'absolute',
          top: '-4px',
          right: '10px',
        }}
      >
        <span>
          Updated: &nbsp;
          {new Date(job.updatedAt).toLocaleDateString()}
        </span>
      </p>

      <span
        style={{
          position: 'absolute',
          bottom: '-6px',
          right: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '.5rem',
        }}
      >
        <p>{job.rateUp}</p>
        <ThumbsUpIcon />
      </span>
    </div>
  );
};
