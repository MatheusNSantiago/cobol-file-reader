import {
  VSCodePanelView,
  VSCodeProgressRing,
} from '@vscode/webview-ui-toolkit/react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {
  github,
  railscasts,
} from 'react-syntax-highlighter/dist/esm/styles/hljs';

type GitlabViewProps = {
  id: string;
  jobYaml: string | undefined;
  loading: boolean;
};

export const GitlabView: React.FC<GitlabViewProps> = ({
  id,
  jobYaml,
  loading,
}: GitlabViewProps) => {
  return (
    <VSCodePanelView id={id}>
      {loading && <VSCodeProgressRing />}
      {!loading && jobYaml && (
        <SyntaxHighlighter
          language="yaml"
          showLineNumbers={false}
          useInlineStyles={true}
          style={false ? github : railscasts}
          PreTag={'div'}
          customStyle={{ width: '100%' }}
        >
          {jobYaml}
        </SyntaxHighlighter>
      )}
      {!loading && !jobYaml && <p>No job found</p>}
    </VSCodePanelView>
  );
};
