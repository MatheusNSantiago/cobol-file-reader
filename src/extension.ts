import path from "path/posix";
import { commands, ExtensionContext, window } from "vscode";
import { Zowe } from "./lib/zowe";
import { TemplatePickerPanel } from "./panels/TemplatePickerPanel";

export function activate(context: ExtensionContext) {
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

  const fooCommand = commands.registerCommand(
    "template-picker.foobar",
    async () => {
      const pattern = await window.showInputBox({
        title: "Procurar dataset",
        placeHolder: "HLQ.*",
        value: "BRT.ACH.ACH601.TST.TC486.SS000109",
        // value: "BRT.ACH*",
        ignoreFocusOut: true,
      });
      await Zowe.initialize();

      const result = await Zowe.readDataset(pattern!);

      console.log(result);
    },
  );

  // Add command to the extension context
  context.subscriptions.push(fooCommand);
}
