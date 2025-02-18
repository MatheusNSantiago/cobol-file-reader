import uEmojiParser from 'universal-emoji-parser';
import { ClassOverrides } from '../utils/ClassOverrides';
import {
  removeAdmonitionsSpeChar,
  removeBrTag,
  removeTargetBlank,
} from '../utils/markdown';
import { Admonitions } from './Admonitions';

type Props = ClassOverrides & {
  children: React.ReactNode & React.ReactNode[];
};

const MarkdownParagraph: React.FC<Props> = ({ children }) => {
  if (!children) return <></>;
  let childrenEmojiParsed = children.map((child) => {
    if (typeof child !== 'string') return child;
    return uEmojiParser.parse(`${child}`, {
      parseToHtml: false,
      parseToUnicode: true,
    });
  });
  const newChildren = childrenEmojiParsed.map((child, key) => {
    if (`${child}`.includes('{:target="_blank"}')) {
      return `${child}`.replace('{:target="_blank"}', '');
    }
    if (`${child}`.startsWith('^^') || `${child}`.endsWith('^^')) {
      child = (
        <div className="underline text-sm" key={key}>
          {`${child}`.replace(/(\^\^)/g, '')}
        </div>
      );
    }
    return child;
  });
  if (
    `${childrenEmojiParsed}`.includes('!!!') ||
    `${childrenEmojiParsed}`.includes('???')
  ) {
    let titleResult: RegExpMatchArray | null = null;
    let title = '';
    let admonition = '';
    let cleanChildren = removeTargetBlank(childrenEmojiParsed);
    if (`${childrenEmojiParsed}`.includes('!!!')) {
      const admonitionType = childrenEmojiParsed[0]
        ?.toString()
        .match(/^!!! [a-zA-Z]+/);
      admonition = `${admonitionType}`.replace('!!! ', '');
    }
    if (`${childrenEmojiParsed}`.includes('???')) {
      const admonitionType = childrenEmojiParsed[0]
        ?.toString()
        .match(/^(?:\?\?\?) [a-zA-Z]+/);
      admonition = `${admonitionType}`.replace('??? ', '');
    }

    if (`${childrenEmojiParsed}`.match(/^!!! [a-zA-Z]+ ("+...+")/)) {
      titleResult = `${childrenEmojiParsed}`.match(/^!!! [a-zA-Z]+ ("+...+")/);
      if (titleResult) {
        title = titleResult[1];
      }
    }

    if (`${childrenEmojiParsed}`.match(/^(?:\?\?\?) [a-zA-Z]+ ("+...+")/)) {
      titleResult = `${childrenEmojiParsed}`.match(
        /^(?:\?\?\?) [a-zA-Z]+ ("+...+")/,
      );
      if (titleResult) {
        title = titleResult[1];
      }
    }
    cleanChildren = removeBrTag(cleanChildren);

    const newChildren = removeAdmonitionsSpeChar(
      cleanChildren,
      admonition,
      title,
    );
    return (
      <Admonitions
        type={admonition}
        title={title ? title.replace(/"/g, '') : undefined}
        content={`${childrenEmojiParsed}`}
      >
        {newChildren}
      </Admonitions>
    );
  }
  const cleanChildren = newChildren.filter((value: any) => {
    if (value.type && value.type === 'img') {
      return null;
    }
    return value;
  });
  return <p>{cleanChildren}</p>;
};

export { MarkdownParagraph };
