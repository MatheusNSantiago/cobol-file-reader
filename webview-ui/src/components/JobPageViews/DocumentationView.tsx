import {
  VSCodePanelView,
  VSCodeProgressRing,
} from '@vscode/webview-ui-toolkit/react';
import { MarkdownParser } from '../MarkdownParser';

type DocumentationViewProps = {
  id: string;
  jobDocumentation: string | undefined;
  loading: boolean;
};

export const DocumentationView: React.FC<DocumentationViewProps> = ({
  id,
  jobDocumentation,
  loading,
}: DocumentationViewProps) => {
  return (
    <VSCodePanelView
      id={id}
      style={{
        alignItems: 'left',
        alignContent: 'left',
        flexDirection: 'column',
      }}
    >
      {loading && <VSCodeProgressRing />}
      {!loading && jobDocumentation && (
        <MarkdownParser data={jobDocumentation} />
      )}
      {!loading && !jobDocumentation && <p>No documentation found</p>}
    </VSCodePanelView>
  );
};
