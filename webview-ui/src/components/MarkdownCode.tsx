import { PropsWithChildren } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight';
import { cn } from '../utils/cn';
import {
  github,
  railscasts,
} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { ClassOverrides } from '../utils/ClassOverrides';

type Props = ClassOverrides & {
  children: React.ReactNode & React.ReactNode[];
  inline: boolean;
  className: string | undefined;
};

export const MarkdownCode: React.FC<PropsWithChildren<Props>> = ({
  children,
  inline,
  className,
}) => {
  const match = /language-(\w+)/.exec(className || '');
  const content = String(children).replace(/\n$/, '');
  return !inline && match ? (
    <div
      className="relative w-full flex my-4 bg-code-dark p-1 rounded-lg"
      style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        padding: 1,
        borderRadius: 4,
      }}
    >
      <SyntaxHighlighter
        children={content}
        className="bg-gray-primary dark:bg-gray-secondary overflow-auto w-full flex code-part text-sm"
        style={false ? github : railscasts}
        language={match ? match[1] : 'yaml'}
        PreTag="div"
        useInlineStyles={true}
      />
      <div className="flex items-start pt-2 justify-start ">
        {/* <Tooltip
          afterShow={() => {
            navigator.clipboard.writeText(content);
          }}
          autoHide
          content={t('action:copied')}
          click={true}
          type="success"
          classOverrides={['cursor-pointer z-20 px-3  text-xl']}
          place="top"
        >
          <button
            className={
              ' hover:text-secondary-default transition duration-300 dark:text-gray-primary'
            }
          >
            <FontAwesomeIcon icon={faCopy} />
          </button>
        </Tooltip> */}
      </div>
    </div>
  ) : String(children).length > 100 ? (
    <SyntaxHighlighter
      children={`${children}`}
      className="bg-gray-primary h-max dark:bg-gray-secondary overflow-auto w-full flex code-part text-sm"
      style={true ? github : railscasts}
      language={match ? match[1] : 'yaml'}
      PreTag="div"
      useInlineStyles={true}
      wrapLongLines
    />
  ) : (
    <div
      style={{
        minWidth: 0,
        inlineSize: 'min-content',
        display: 'inline',
        padding: 4,
      }}
      className={cn(
        'w-min min-w-0 inline p-1 text-sm  text-gray-secondary bg-code-dark dark:text-gray-primary',
      )}
    >
      {children}
    </div>
  );
};
