import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import { MarkdownCode } from './MarkdownCode';
import { ClassOverrides } from '../utils/ClassOverrides';
import { MarkdownParagraph } from './MarkdownParagraph';
import { removeTargetBlank } from '../utils/markdown';

type MarkdownParserProps = {
  data: string;
};

export const MarkdownParser: React.FC<ClassOverrides & MarkdownParserProps> = ({
  data,
}) => {
  const sanitizeSchema = {
    attributes: {
      '*': ['className', 'class', 'placeholder'],
      a: ['className', 'class', 'href'],
    },
  };
  //TODO: useContext to retrieve the documentation URL of a template ? See the frontend
  const DOCUMENTATION_URL = 'https://docs.r2devops.io';
  return (
    <ReactMarkdown
      skipHtml={false}
      remarkPlugins={[[remarkGfm, { tablePipeAlign: true }]]}
      rehypePlugins={[[rehypeSanitize, sanitizeSchema]]}
      transformImageUri={(uri) => (uri.startsWith('![') ? uri : '')}
      components={{
        p: ({ node, children }) => {
          return <MarkdownParagraph children={children && children} />;
        },
        li: ({ node, children }) => {
          const newChildren = removeTargetBlank(children);
          return (
            <li className="list-disc ml-4 font-ubuntu text-gray-secondary dark:text-gray-primary mb-2 text-sm">
              {newChildren}
            </li>
          );
        },
        strong: ({ node, children }) => {
          const newChildren = removeTargetBlank(children);
          return <strong>{newChildren}</strong>;
        },
        a: ({ node, children }) => {
          return (
            <a
              href={
                `${node.properties?.href}`.startsWith('/')
                  ? `${DOCUMENTATION_URL ?? '' + node.properties?.href}`
                  : `${node.properties?.href}`
              }
              className="text-primary-default text-sm hover:text-secondary-default dark:text-primary-default dark:hover:text-secondary-default"
              rel="noreferrer nofollow"
              target="_blank"
            >
              {children}
            </a>
          );
        },
        h1: ({ children }) => {
          return (
            <div
              className="w-full"
              id={children[0]?.toString().toLowerCase().replaceAll(' ', '-')}
            >
              <h1>{children}</h1>
            </div>
          );
        },
        h2: ({ children }) => {
          return (
            <div
              id={children[0]?.toString().toLowerCase().replaceAll(' ', '-')}
            >
              <h2>{children}</h2>
            </div>
          );
        },
        h3: ({ children }) => {
          return (
            <div
              id={children[0]?.toString().toLowerCase().replaceAll(' ', '-')}
            >
              <h3>{children}</h3>
            </div>
          );
        },
        h4: ({ children }) => {
          return (
            <div
              id={children[0]?.toString().toLowerCase().replaceAll(' ', '-')}
            >
              <h3>{children}</h3>
            </div>
          );
        },
        table: ({ node, children }) => {
          return (
            <table
              style={{ marginBottom: '1rem' }}
              className="table-fixed w-full shadow"
            >
              {children}
            </table>
          );
        },
        th: ({ children }) => {
          return (
            <th
              align="left"
              className="table-cell border-2 h-14 text-gray-primary bg-gray-secondary dark:bg-secondary-default-high-opacity dark:border-secondary-default "
            >
              {children}
            </th>
          );
        },
        td: ({ node, children }) => {
          const cleanChildren = removeTargetBlank(children);
          if (!children) {
            return (
              <td className="text-gray-secondary text-sm dark:text-gray-primary border-2 dark:border-secondary-default  h-28 break-words text-center table-cell px-2"></td>
            );
          }
          const newChildren = cleanChildren.filter((value) => {
            if (`${value}`.includes('<img')) {
              return null;
            }
            return value;
          });
          return (
            <td className="text-gray-secondary dark:text-gray-primary  border-2 dark:border-secondary-default  h-28 table-cell text-center  ">
              <div className="w-full h-full overflow-auto px-2 flex items-center justify-center">
                <div className="w-full max-h-full text-sm">{newChildren}</div>
              </div>
            </td>
          );
        },
        code({ inline, className, children, ...props }) {
          return (
            <MarkdownCode
              children={children && children}
              inline={inline ? inline : false}
              className={className ? className : ''}
            />
          );
        },
      }}
    >
      {data}
    </ReactMarkdown>
  );
};
