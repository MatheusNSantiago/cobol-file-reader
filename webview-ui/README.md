# `webview-ui` Directory

This directory contains all of the code that will be executed within the webview context. It can be thought of as the place where all the "frontend" code of a webview is contained.

In this sample, the webview UI is built using [React](https://reactjs.org/) and [Create React App](https://create-react-app.dev/).


## Repository Structure

```
.
├── public          # The public folder contains static assets
├── scripts         # Script files used to launch React app
├── src             # Script files used to launch React app
│   └── api         # Folder containing API calls
│   └── components  # Folder containing React components
|   └── config      # Folder containing configuration files
│   └── models      # Folder containing models
|   └── utilities   # Folder containing utility functions
├── App.tsx         # Main React component, contains the webview UI
├── index.tsx       # Entry point for React app
└── ...

```

## Getting Started

To understand how to interact from VSCode extension to the webview UI, you can read the [documentation]. Other useful links are listed at the end of this document.

## Development

To start developing the webview UI, you need to run the following command:

```bash
npm run start:webview
```

You can then open a browser and navigate to `http://localhost:3000` to see the webview UI.

### Panel and Webview

The Panel is define at the `src` folder of the root repository. It defines a `WebviewPanel` that is used to display the webview UI. The `WebviewPanel` is created in the `src/extension.ts` file.

### Messages

To exchange messages between the webview UI and the extension, you can use the `postMessage` API. You can find an example of how to use it in the `src/components/JobPage.tsx` file.

### API Calls

Api calls are defined in the `src/api` folder. You can find an example of how to use it in the `src/components/JobPage.tsx` file. The calls are made using React hooks and use tha package `react-query`.

### Icons

To use icons in your webview, you need to use the one create by the [@vscode/codicons](https://www.npmjs.com/package/@vscode/codicons) package. This package contains all the icons that are used in VS Code. You can find the list of icons [here](https://microsoft.github.io/vscode-codicons/dist/codicon.html).

To use one, you need to search for the `.svg` file in the `@vscode/codicons/src/icons/<icon>.svg` package. Then create a React component in `src/components/icons` with the following code:

```tsx
export const Icon = () => {
  return (
    <svg
      // Paste here the SVG of the icon 
      >
    </svg>
  );
};

```

## Useful Links

- [Extension API](https://code.visualstudio.com/api)
- [Create menus](https://code.visualstudio.com/api/references/contribution-points#contributes.menus)
- [Context for commands](https://code.visualstudio.com/api/references/when-clause-contexts)
- [Webviev development](https://code.visualstudio.com/api/extension-guides/webview)
- [Questions about building extensions](https://www.promyze.com/21-questions-building-vscode-extension/)
- [Extension samples](https://github.com/microsoft/vscode-extension-samples)
- [When clauses contexts](https://code.visualstudio.com/api/references/when-clause-contexts)
