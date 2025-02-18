import {
  Disposable,
  Webview,
  WebviewPanel,
  window,
  Uri,
  ViewColumn,
  Range,
  workspace,
} from "vscode";
import { getUri } from "../utilities/getUri";
import { getNonce } from "../utilities/getNonce";
import {
  Message,
  AddRemoteUrlMessage,
  COMMAND,
  InjectConfigurationMessage,
} from "../models/message.model";
import { generateCiWithRemoteUrl } from "../utilities/gitlab";
import { getConfig } from "../utilities/getConfiguration";
import { getGroups, getTableData } from "../converter";

/**
 * This class manages the state and behavior of HelloWorld webview panels.
 *
 * It contains all the data and methods for:
 *
 * - Creating and rendering HelloWorld webview panels
 * - Properly cleaning up and disposing of webview resources when the panel is closed
 * - Setting the HTML (and by proxy CSS/JavaScript) content of the webview panel
 * - Setting message listeners so data can be passed between the webview and extension
 */
export class TemplatePickerPanel {
  public static currentPanel: TemplatePickerPanel | undefined;
  private readonly _panel: WebviewPanel;
  private _disposables: Disposable[] = [];

  /**
   * The TemplatePickerPanel class private constructor (called only from the render method).
   *
   * @param panel A reference to the webview panel
   * @param extensionUri The URI of the directory containing the extension
   */
  private constructor(panel: WebviewPanel, private readonly extensionUri: Uri) {
    this._panel = panel;

    // Set an event listener to listen for when the panel is disposed (i.e. when the user closes
    // the panel or when the panel is closed programmatically)
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    // Set the HTML content for the webview panel
    this._panel.webview.html = this._getWebviewContent(this._panel.webview, extensionUri);

    // Set an event listener to listen for messages passed from the webview context
    this._setWebviewMessageListener(this._panel.webview);
  }

  /**
   * Renders the current webview panel if it exists otherwise a new webview panel
   * will be created and displayed.
   *
   * @param extensionUri The URI of the directory containing the extension.
   */
  public static render(extensionUri: Uri) {
    if (TemplatePickerPanel.currentPanel) {
      // If the webview panel already exists reveal it
      TemplatePickerPanel.currentPanel._panel.reveal(ViewColumn.Beside);
    } else {
      // If a webview panel does not already exist create and show a new one
      const panel = window.createWebviewPanel(
        // Panel view type
        "showTemplatePicker",
        // Panel title
        "Template Picker",
        // The editor column the panel should be displayed in
        ViewColumn.Beside,
        // Extra panel configurations
        {
          // Enable JavaScript in the webview
          enableScripts: true,
          retainContextWhenHidden: true,
          // Restrict the webview to only load resources from the `out` and `webview-ui/build` directories
          localResourceRoots: [
            Uri.joinPath(extensionUri, "out"),
            Uri.joinPath(extensionUri, "webview-ui/build"),
          ],
        }
      );
      // const iconPath = getUri(panel.webview, extensionUri, ["webview-ui", "build", "logo128.png"]);
      // panel.iconPath = iconPath;

      TemplatePickerPanel.currentPanel = new TemplatePickerPanel(panel, extensionUri);

      // Transfer configuration variable trough Message
      const { copybookDirectory } = getConfig();
      const injectConfigMessage: InjectConfigurationMessage = {
        command: COMMAND.injectConfigurationMessage,
        data: { copybookDirectory },
      };

      panel.webview.postMessage(injectConfigMessage);
    }
  }

  /**
   * Cleans up and disposes of webview resources when the webview panel is closed.
   */
  public dispose() {
    TemplatePickerPanel.currentPanel = undefined;

    // Dispose of the current webview panel
    this._panel.dispose();

    // Dispose of all disposables (i.e. commands) for the current webview panel
    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }

  /**
   * Defines and returns the HTML that should be rendered within the webview panel.
   *
   * @remarks This is also the place where references to the React webview build files
   * are created and inserted into the webview HTML.
   *
   * @param webview A reference to the extension webview
   * @param extensionUri The URI of the directory containing the extension
   * @returns A template string literal containing the HTML that should be
   * rendered within the webview panel
   */
  private _getWebviewContent(webview: Webview, extensionUri: Uri) {
    // The CSS file from the React build output
    const stylesUri = getUri(webview, extensionUri, [
      "webview-ui",
      "build",
      "static",
      "css",
      "main.css",
    ]);
    // The JS file from the React build output
    const scriptUri = getUri(webview, extensionUri, [
      "webview-ui",
      "build",
      "static",
      "js",
      "main.js",
    ]);

    const nonce = getNonce();

    // Inject only the authorized configuration
    // TODO: URL should match a pattern to avoid inserting junk URL and make request to other URLs.
    const configuration = getConfig();

    // Tip: Install the es6-string-html VS Code extension to enable code highlighting below
    return /*html*/ `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
          <meta name="theme-color" content="#000000">
          <link rel="stylesheet" type="text/css" href="${stylesUri}">
          <title>Hello World</title>
        </head>
        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <div id="root"></div>
          <script nonce="${nonce}" src="${scriptUri}"></script>
        </body>
      </html>
    `;
  }

  /**
   * Sets up an event listener to listen for messages passed from the webview context and
   * executes code based on the message that is recieved.
   *
   * @param webview A reference to the extension webview
   * @param context A reference to the extension context
   */
  private _setWebviewMessageListener(webview: Webview) {
    webview.onDidReceiveMessage(
      async (message) => {
        try {
          switch (message.command) {
            case "getGroups":
              const groupNames = await getGroups(this.extensionUri.path, message.copybook);
              webview.postMessage({ command: "groupsReady", groups: groupNames });
              break;
            case "getTableData":
              const { group, file, copybook } = message;
              const tableData = await getTableData(this.extensionUri.path, group, file, copybook);
              webview.postMessage({
                command: "tableDataReady",
                tableData,
              });
              break;
          }
        } catch (error: any) {
          window.showErrorMessage(`Error: ${error.message}`); // Mostra o erro no VS Code
          webview.postMessage({
            command: "error",
            message: error.message,
          });
        }
      },
      undefined,
      this._disposables
    );

    // webview.onDidReceiveMessage(
    //   (message: Message) => {
    //     const command = message.command;
    //
    //     switch (command) {
    //       case "hello":
    //         // Code that should run in response to the hello message command
    //         window.showInformationMessage(message.data.text);
    //         return;
    //       // Add more switch case statements here as more webview message commands
    //       // are created within the webview context (i.e. inside media/main.js)
    //       case COMMAND.addRemoteUrlMessage:
    //         const messageRemote = message as AddRemoteUrlMessage;
    //         // Cast the message to the correct type
    //         const { remoteUrl, stages } = messageRemote.data;
    //         // Extract the url and the array of stages from the message
    //         if (!remoteUrl || !stages) {
    //           return window.showErrorMessage(
    //             `Undefined stages: ${stages} or remote url: ${remoteUrl}`
    //           );
    //         }
    //         this.addRemoteUrlToGitlabCiFile(remoteUrl, stages);
    //         return;
    //     }
    //   },
    //   undefined,
    //   this._disposables
    // );
  }

  // private addRemoteUrlToGitlabCiFile(remoteUrl: string, stages: string[]) {
  //   const editors = window.visibleTextEditors;
  //   const gitlabCiEditor = editors.find((editor) =>
  //     editor.document.fileName.endsWith(".gitlab-ci.yml")
  //   );
  //
  //   if (gitlabCiEditor && gitlabCiEditor.document) {
  //     const document = gitlabCiEditor.document;
  //
  //     // Get the text within the document
  //     const gitlabFileContent = document.getText();
  //
  //     // Generate the new document with the remote url added
  //     try {
  //       const documentWithRemoteUrlAdded = generateCiWithRemoteUrl(
  //         remoteUrl,
  //         stages,
  //         gitlabFileContent
  //       );
  //
  //       const wholeDocument = new Range(
  //         document.positionAt(0),
  //         document.positionAt(gitlabFileContent.length)
  //       );
  //
  //       gitlabCiEditor.edit((editBuilder) => {
  //         editBuilder.replace(wholeDocument, documentWithRemoteUrlAdded);
  //       });
  //       window.showInformationMessage("Remote url added to gitlab-ci.yml");
  //     } catch (error) {
  //       if (error instanceof Error) {
  //         return window.showErrorMessage(error.message);
  //       }
  //     }
  //   }
  // }
}
