import { PropsWithChildren } from 'react';
import { ClassOverrides } from '../utils/ClassOverrides';
import { ColorSetEnum, getRGBAColorSet } from '../constants/colorSet';
import { cn } from '../utils/cn';

type Props = {
  type: string;
  title?: string;
  margin?: string;
  hideHeader?: boolean;
  content: string;
};

const getColor = (type: string, opacity: string) => {
  switch (type) {
    case 'abstract':
    case 'tip':
    case 'info':
    case 'important':
    case 'hint':
      return getRGBAColorSet(ColorSetEnum.info, opacity);
    case 'lab':
      return getRGBAColorSet(ColorSetEnum.lab, opacity);
    case 'help':
    case 'faq':
    case 'success':
      return getRGBAColorSet(ColorSetEnum.success, opacity);
    case 'summary':
    case 'question':
      return getRGBAColorSet(ColorSetEnum.success, opacity);
    case 'note':
    case 'todo':
      return getRGBAColorSet(ColorSetEnum.note, opacity);
    case 'warning':
      return getRGBAColorSet(ColorSetEnum.warning, opacity);
    case 'error':
      return getRGBAColorSet(ColorSetEnum.error, opacity);
  }
};
export const Admonitions: React.FC<
  PropsWithChildren<Props & ClassOverrides>
> = ({
  type,
  title,
  children,
  margin = 'mb-4',
  classOverrides = [],
  hideHeader = false,
}) => {
  const icon = getAdmonitionIcon(type);
  return (
    <div
      style={{
        border: '1px solid ' + getColor(type, '0.8')?.backgroundColor,
        backgroundColor: getColor(type, '0.015')?.backgroundColor,
        borderRadius: 4,
        margin: margin,
        marginBottom: '1rem',
      }}
      className={cn('rounded-lg shadow', margin, ...classOverrides)}
    >
      <div
        className={'admonition-heading  rounded-tr-lg'}
        style={{
          backgroundColor: getColor(type, '0.1')?.backgroundColor,
          borderRadius: 2,
        }}
      >
        {!hideHeader && (
          <h4
            style={{
              padding: 2,
              margin: 0,
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
            }}
            className={cn(
              !title && 'capitalize',
              'p-2 font-ubuntu flex justify-start admonition-title text-gray-third dark:text-gray-primary font-bold items-center',
            )}
          >
            <div
              className={'admonition-icon'}
              style={{
                color: getColor(type, '1')?.backgroundColor,
                paddingTop: '5px',
                marginLeft: '2.5px',
                marginRight: '5px',
              }}
            >
              {icon}
            </div>{' '}
            {title ? title : type}
          </h4>
        )}
      </div>
      <div
        style={{ textAlign: 'left', padding: '8px' }}
        className="admonition-content font-ubuntu text-left p-2 text-dark-text text-sm dark:text-gray-primary"
      >
        {children}
      </div>
    </div>
  );
};

export const getAdmonitionIcon = (type: string) => {
  switch (type) {
    case 'info':
    case 'abstract':
      return svgMap.info;
    case 'todo':
    case 'note':
    case 'summary':
      return svgMap.note;
    case 'success':
      return svgMap.success;
    case 'question':
    case 'help':
    case 'faq':
      return svgMap.question;
    case 'hint':
    case 'important':
      return svgMap.important;
    case 'warning':
    case 'caution':
    case 'attention':
    case 'danger':
    case 'error':
      return svgMap.warning;
    case 'tip':
      return svgMap.caution;
  }
};

/**
 * Octicons Icons by GitHub released under MIT License
 * https://github.com/primer/octicons/
 */
const svgMap = {
  warning: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
    >
      <path
        fill="currentColor"
        d="M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"
      />
    </svg>
  ),
  important: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="16"
      viewBox="0 0 14 16"
    >
      <path
        fill="currentColor"
        d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"
      />
    </svg>
  ),
  caution: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="16"
      viewBox="0 0 12 16"
    >
      <path
        fill="currentColor"
        d="M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"
      />
    </svg>
  ),
  tip: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="16"
      viewBox="0 0 12 16"
    >
      <path
        fill="currentColor"
        d="M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"
      />
    </svg>
  ),
  info: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="18"
      height="18"
    >
      <path
        fill="currentColor"
        d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-144c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z"
      />
    </svg>
  ),
  note: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      width="18"
      height="18"
    >
      <path
        fill="currentColor"
        d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM325.8 139.7l14.4 14.4c15.6 15.6 15.6 40.9 0 56.6l-21.4 21.4-71-71 21.4-21.4c15.6-15.6 40.9-15.6 56.6 0zM119.9 289L225.1 183.8l71 71L190.9 359.9c-4.1 4.1-9.2 7-14.9 8.4l-60.1 15c-5.5 1.4-11.2-.2-15.2-4.2s-5.6-9.7-4.2-15.2l15-60.1c1.4-5.6 4.3-10.8 8.4-14.9z"
      />
    </svg>
  ),
  success: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="18"
      height="18"
    >
      <path
        fill="currentColor"
        d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
      />
    </svg>
  ),
  question: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="22"
      viewBox="0 0 14 16"
    >
      <path
        fill="currentColor"
        d="M6 10h2v2H6v-2zm4-3.5C10 8.64 8 9 8 9H6c0-.55.45-1 1-1h.5c.28 0 .5-.22.5-.5v-1c0-.28-.22-.5-.5-.5h-1c-.28 0-.5.22-.5.5V7H4c0-1.5 1.5-3 3-3s3 1 3 2.5zM7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7s7-3.14 7-7s-3.14-7-7-7z"
      />
    </svg>
  ),
};
