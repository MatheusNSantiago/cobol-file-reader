import { workspace } from "vscode";
import { Configuration } from "../../models/configuration.model";

export type TemplatePanelConfiguration = Configuration & {
  // apiUrl: string;
  // gitlabUrl: string;
  // showPanelGitlabFile: boolean;
  // showNotification: boolean;
};

/**
 * A helper function that returns the configuration for the Template Panel with the variables sets from VSCode.
 *
 * @remarks The variables configurable are defined in the package.json file and are injected here
 *
 * @returns A TemplatePanelConfiguration
 */

export function getConfig(): TemplatePanelConfiguration {
  const configuration = workspace.getConfiguration();

  const copybookDirectory = configuration.get<string>("template_picker.copybookDirectory", "");
  return {
    copybookDirectory,
  };

  // const apiUrl: string = configuration.get<string>(
  //   "template_picker.api_url",
  //   "https://api.r2devops.io"
  // );
  // const gitlabUrl = configuration.get<string>("template_picker.gitlab_url", "https://gitlab.com");
  //
  // const showPanelGitlabFile = workspace
  //   .getConfiguration("template_picker")
  //   .get<boolean>("show_panel_gitlab_file_open", true);
  //
  // const showNotification = workspace.getConfiguration("template_picker").get<boolean>("show_notification", true);
  // return {
  //   apiUrl,
  //   gitlabUrl,
  //   showPanelGitlabFile,
  //   showNotification
  // };
}
