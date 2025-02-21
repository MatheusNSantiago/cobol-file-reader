import { commands, ExtensionContext } from "vscode";
import { TemplatePickerPanel } from "./panels/TemplatePickerPanel";

export function activate(context: ExtensionContext) {
  // window.onDidChangeActiveTextEditor(async (editor) => {
  //   const { showPanelGitlabFile, showNotification } = getConfig();
  //
  //   if (editor && showPanelGitlabFile) {
  //     // Get the URI of the active file
  //     const fsPath = editor.document.uri.fsPath;
  //
  //     // Check if the file is a .gitlab-ci.yml file
  //     if (fsPath.endsWith(".gitlab-ci.yml")) {
  //       TemplatePickerPanel.render(context.extensionUri);
  //       const configuration = workspace.getConfiguration("template_picker");
  //
  //       // Directly display the notification here
  //       if (showNotification) {
  //         const selection = await window.showInformationMessage(
  //           "Would you like the template picker panel to be displayed by default?",
  //           "Yes",
  //           "No",
  //           "Never ask me again"
  //         );
  //         // Update the configuration based on the user's selection
  //         if (selection === "Yes" || selection === "No") {
  //           configuration.update(
  //             "show_panel_gitlab_file_open",
  //             selection === "Yes",
  //             vscode.ConfigurationTarget.Global
  //           );
  //         } else if (selection === "Never ask me again") {
  //           configuration.update("show_notification", false, vscode.ConfigurationTarget.Global);
  //         }
  //       }
  //     }
  //   }
  // });

  // Create the show hello world command
  const showTemplatePickerCommand = commands.registerCommand(
    "template-picker.showTemplatePicker",
    () => {
      TemplatePickerPanel.render(context.extensionUri);
    },
  );

  // Add command to the extension context
  context.subscriptions.push(showTemplatePickerCommand);
}
