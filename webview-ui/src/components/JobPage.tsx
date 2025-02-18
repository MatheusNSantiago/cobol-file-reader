import {
  VSCodeButton,
  VSCodeDropdown,
  VSCodeOption,
  VSCodePanelTab,
  VSCodePanels,
} from "@vscode/webview-ui-toolkit/react";
import { JobResponse } from "../models/jobs/JobCreationResponse.model";
import { useState } from "react";
import { JobVersion } from "../models/jobs/JobVersion.model";
import { useGetJobFile } from "../api/useGetJobFile";
import { vscode } from "../utils/vscode";
import { AddRemoteUrlMessage, COMMAND } from "../models/message.model";
import { AboutView } from "./JobPageViews/AboutView";
import { GitlabView } from "./JobPageViews/GitlabView";
import { DocumentationView } from "./JobPageViews/DocumentationView";
import { ChangelogView } from "./JobPageViews/ChangelogView";
import { ListUnorderedIcon } from "./icons/ListUnorderedIcon";
import { FileCodeIcon } from "./icons/FileCodeIcon";
import { InfoIcon } from "./icons/InfoIcon";
import { FileIcon } from "./icons/FileIcon";
import { returnLatestVersion } from "../utils/job";
import { ArrowLeftIcon } from "./icons/ArrowLeftIcon";
import { CloseIcon } from "./icons/CloseIcon";
import { AddIcon } from "./icons/AddIcon";
import { useConfiguration } from "../config/configuration";

type JobProps = {
  job: JobResponse;
  onBackClick: () => void;
};

export const JobPage: React.FC<JobProps> = ({ job, onBackClick }) => {
  // Return the list of the versions reordering them by the tag
  const versions = job.versions.sort((a, b) => {
    if (a.tag > b.tag) {
      return -1;
    }
    if (a.tag < b.tag) {
      return 1;
    }
    return 0;
  });

  const { copybookDirectory: API_URL } = useConfiguration();

  const [versionInView, setVersionInView] = useState<JobVersion>(returnLatestVersion(versions));
  const [jobIncludeUrl, setJobIncludeUrl] = useState<string>(
    API_URL + "/job/r/gitlab/" + job.repo.path + "/" + job.path + "@" + versionInView.tag + ".yaml"
  );

  const {
    data: jobDocumentation,
    loading: loadingJobDocumentation,
    error,
  } = useGetJobFile({
    path: job.repo.path + "/" + job.path,
    versionTag: versionInView.tag,
    file: "readme",
  });

  const { data: jobYaml, loading: loadingJobYaml } = useGetJobFile({
    path: job.repo.path + "/" + job.path,
    versionTag: versionInView.tag,
    file: "gitlab",
  });

  const { data: jobChangelog, loading: loadingJobChangelog } = useGetJobFile({
    path: job.repo.path + "/" + job.path,
    versionTag: versionInView.tag,
    file: "changelog",
  });

  // Handle the change of the version dropdown
  const handleVersionChange = (e: any) => {
    const version = versions.find((version) => version.tag === e.target.value);
    if (version) {
      setVersionInView(version);
      setJobIncludeUrl(
        API_URL + "/job/r/gitlab/" + job.repo.path + "/" + job.path + "@" + version.tag + ".yaml"
      );
    }
  };

  const [activeIdTab, setActiveIdTab] = useState<string>("tab-readme");

  // Post a message to the extension to add the job to the .gitlab-ci.yml file
  function handleAddJobClick() {
    const message: AddRemoteUrlMessage = {
      command: COMMAND.addRemoteUrlMessage,
      data: {
        remoteUrl: jobIncludeUrl,
        stages: versionInView.stages,
      },
    };
    vscode.postMessage(message);
  }

  return (
    <div
      style={{
        minWidth: "430px",
        width: "100%",
        overflow: "auto",
        marginTop: 0,
        marginBottom: "20px",
      }}>
      {error && <p style={{ color: "red" }}>{JSON.stringify(error.toJSON())}</p>}
      {/* Version Dropdown selection */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          width: "100%",
          marginTop: 0,
          marginBottom: "20px",
        }}>
        <span
          onClick={onBackClick}
          style={{
            cursor: "pointer",
            position: "absolute",
            top: "0px",
            left: 0,
          }}>
          <ArrowLeftIcon />
        </span>
        {/* TODO: Close the panel on click */}
        <span
          onClick={onBackClick}
          style={{
            cursor: "pointer",
            position: "absolute",
            top: "0px",
            right: 0,
          }}>
          <CloseIcon />
        </span>
        <div style={{ display: "flex", gap: ".5rem", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              alignContent: "center",
              justifyContent: "center",
              alignSelf: "center",
              height: "100%",
            }}>
            {job.icon ?? String.fromCodePoint(0x1f3f7)}
          </div>
          <h2
            aria-label={job.path}
            title={job.path}
            style={{
              marginTop: "0",
              marginBottom: "0",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              maxWidth: "15rem",
            }}>
            {job.path}
          </h2>
          <VSCodeDropdown>
            {versions.map((version, index) => {
              return (
                <VSCodeOption
                  onClick={(e) => {
                    handleVersionChange(e);
                  }}
                  selected={versionInView.tag === version.tag}
                  key={`${version.tag}-${version.id}`}>
                  {version.tag}
                </VSCodeOption>
              );
            })}
          </VSCodeDropdown>
        </div>
        <p style={{ marginBottom: "20px", marginTop: "20px" }}>{job.description}</p>
        <VSCodeButton onClick={handleAddJobClick}>
          Add this job
          <span slot="start">
            <AddIcon />
          </span>
        </VSCodeButton>
      </div>
      <VSCodePanels
        style={{ minWidth: "100%" }}
        activeid={activeIdTab}
        aria-label="With Active Tab">
        {/* Each panel is associated to a tab and change the view, once clicked on it */}
        <VSCodePanelTab
          id="tab-readme"
          onClick={() => {
            setActiveIdTab("tab-readme");
          }}>
          <span style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
            <FileIcon />
            README
          </span>
        </VSCodePanelTab>
        <VSCodePanelTab
          id="tab-about"
          onClick={() => {
            setActiveIdTab("tab-about");
          }}>
          <span style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
            <InfoIcon />
            About
          </span>
        </VSCodePanelTab>
        <VSCodePanelTab
          id="tab-gitlab"
          onClick={() => {
            setActiveIdTab("tab-gitlab");
          }}>
          <span style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
            <FileCodeIcon />
            Template
          </span>
        </VSCodePanelTab>
        <VSCodePanelTab
          id="tab-changelog"
          onClick={() => {
            setActiveIdTab("tab-changelog");
          }}>
          <span style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
            <ListUnorderedIcon />
            Changelog
          </span>
        </VSCodePanelTab>

        <DocumentationView
          id="view-readme"
          jobDocumentation={jobDocumentation}
          loading={loadingJobDocumentation}
        />
        <AboutView
          id="view-about"
          job={job}
          versionInView={versionInView}
          jobIncludeUrl={jobIncludeUrl}
        />

        <GitlabView id="view-gitlab" jobYaml={jobYaml} loading={loadingJobYaml} />

        <ChangelogView
          id="view-changelog"
          jobChangelog={jobChangelog}
          loading={loadingJobChangelog}
        />
      </VSCodePanels>
    </div>
  );
};
