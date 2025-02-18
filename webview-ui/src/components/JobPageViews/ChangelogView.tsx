import {
  VSCodePanelView,
  VSCodeProgressRing,
} from '@vscode/webview-ui-toolkit/react';
import { MarkdownParser } from '../MarkdownParser';

type ChangelogViewProps = {
  id: string;
  jobChangelog: string | undefined;
  loading: boolean;
};

export const ChangelogView: React.FC<ChangelogViewProps> = ({
  id,
  jobChangelog,
  loading,
}: ChangelogViewProps) => {
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
      {!loading && jobChangelog && <MarkdownParser data={jobChangelog} />}
      {!loading && !jobChangelog && <p>No Changelog found</p>}
    </VSCodePanelView>
  );
};
