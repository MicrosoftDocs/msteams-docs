---
title: Create Basic Tab App
description: Learn how to build your basic tab app in Microsoft Teams with the help of GitHub codespaces that opens Toolkit extension and step-by-step guides.
ms.localizationpriority: high
ms.date: 12/11/2024
ms.topic: reference
---

# Build your basic tab app

Tabs are Teams-aware webpages embedded in Microsoft Teams and a good way to begin developing for Teams. You can add them as part of a channel inside a team, group chat, or personal app for an individual user.

:::image type="content" border="false" source="../assets/images/get-started/get-started-tab.png" alt-text="Screenshot shows you the conceptual tab app in Teams client.":::

In this tutorial, you'll learn:

- How to set up a new project with Microsoft 365 Agents Toolkit (previously known as Teams Toolkit).
  - How to build a tab app.
  - The structure of the app:
    - The tab portion with JavaScript using React.
    - The rest of the features with Node.js.
  - How to deploy your app

This step-by-step guide helps you to build tab with Agents Toolkit. You'll see the following output after you've completed this guide:

:::image type="content" source="../assets/images/toolkit-v2/first-tab/tab-app-localdebug.png" alt-text="Screenshot shows the completed app" lightbox="../assets/images/toolkit-v2/first-tab/tab-app-localdebug-1.png":::

## Prerequisites

Ensure you install the following tools for building and deploying your apps.

   | &nbsp; | Install | For using... |
   | --- | --- | --- |
   | **Required** | &nbsp; | &nbsp; |
   | &nbsp; | [Visual Studio Code](https://code.visualstudio.com/download) | JavaScript, TypeScript, or SharePoint Framework (SPFx) build environments. Use the latest version. |
   | &nbsp; | [Microsoft 365 Agents Toolkit](#tabpanel_1_vscode) | Microsoft Visual Studio Code extension that creates a project scaffolding for your app. Use the latest version. |
   | &nbsp; | [Node.js](https://nodejs.org/en/download/) | Back-end JavaScript runtime environment. For more information, see [Node.js version compatibility table for project type](~/toolkit/build-environments.md#nodejs-version-compatibility-table-for-project-type).|
   | &nbsp; | [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams to collaborate with everyone you work with through apps for chat, meetings, and call all in one place.|
   | &nbsp; | [Microsoft&nbsp;Edge](https://www.microsoft.com/edge) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser with developer tools. |
   | **Optional** | &nbsp; | &nbsp; |
   | &nbsp; | [Azure Tools for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack) and [Azure CLI](/cli/azure/install-azure-cli) | Azure tools to access stored data or to deploy a cloud-based backend for your Teams app in Azure. |
   | &nbsp; | [React Developer Tools for Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) OR [React Developer Tools for Microsoft&nbsp;Edge](https://microsoftedge.microsoft.com/addons/detail/react-developer-tools/gpphkfbcpidddadnkolkpfckpihlkkil) | A browser DevTools extension for the open-source React JavaScript library. |
   | &nbsp; | [Microsoft Graph Explorer](https://developer.microsoft.com/graph/graph-explorer) | Microsoft Graph Explorer, a browser-based tool that lets you run a query from Microsoft Graph data. |
   | &nbsp; | [Developer Portal for Teams](https://dev.teams.microsoft.com/) | Web-based portal to configure, manage, and publish your Teams app including to your organization or the Microsoft Teams Store. |

   > [!TIP]
   > If you work with Microsoft Graph data, you should learn about and bookmark the Microsoft Graph Explorer. This browser-based tool allows you to query Microsoft Graph outside of an app.

[!INCLUDE [Set up prerequisites](../includes/get-started/prepare-toolkit.md)]

 > [!div class="nextstepaction"]
 > [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Prepare+development+environment&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fsbs-gs-javascript%3Ftabs%3Dvscode%252Cvsc%252Cviscode%26tutorial-step%3D1&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fsbs-gs-javascript.yml&documentVersionIndependentId=e473e1f3-69f5-bcfa-bcab-54b098b59c80&platformId=49d016cb-d1f9-dbb1-b10d-01f7dd6fcf5f&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Get a free Azure account

If you want to host your app or access resources in Azure, you must have an Azure subscription. [Create a free account](https://azure.microsoft.com/free/) before you begin.

Now you've got all the tools to set up your account. Next, let's set up your development environment and start building! Select the app you want to create first.

## Take a tour of the tab app source code

Agents Toolkit provides all components for building an app. After creating the project, you can view the project folders and files in the **Explorer** in the Visual Studio Code.

:::image type="content" source="~/assets/images/toolkit-v2/first-tab/folder-structure-tab-app.png" alt-text="Screen shot shows the structure tab.":::

Although you're free to choose any UI framework (or not to use any), this sample template code provides a scaffolding with React components.

Among other items in this directory structure, the Toolkit maintains:

| Folder name | Contents |
| --- | --- |
| `.vscode` | VSCode files for debugging. |
| `appPackage` | Templates for the Teams application manifest. |
| `env` | Name / value pairs are stored in environment files and used by m365agents.yml to customize the provisioning and deployment rules. |
| `infra` | Templates for provisioning Azure resources. |
| `src/`| The source code for the notification Teams application. |
| `src/app.js` | Application entry point and `express` handlers for website. |
| `src/views/hello.html`| A HTML template that is bind to the tab endpoint. |
| `src/static` | The static assets like CSS and JavaScript files that can be served by the web server. |
| `m365agents.yml` | Main project file describes your application configuration and defines the set of actions to run in each lifecycle stages. |
| `m365agents.local.yml` | This overrides `m365agents.yml` with actions that enable local execution and debugging. |

## Build and run your first tab app

After you set up your project workspace with Agents Toolkit, build your tab project.
You need to sign in to your Microsoft 365 account.

### Sign in to your Microsoft 365 account

Use your Microsoft 365 account to sign in to Teams. If you're using a Microsoft 365 developer program tenant, the admin account you set up while registering is your Microsoft 365 account.

# [Visual Studio Code](#tab/viscode)

1. Open Visual Studio Code.
1. Select the Microsoft 365 Agents Toolkit :::image type="icon" source="../assets/images/toolkit-v2/toolkit-sidebar-icon.png"::: icon in the sidebar.
1. Select **Sign in to M365** using your credentials.
Your default web browser opens to let you sign in to the account.
1. Close the browser when prompted and return to Visual Studio Code.
1. Return to Agents Toolkit within Visual Studio Code.

The **ACCOUNTS** section of the sidebar shows your Microsoft 365 account name. If custom app upload is enabled for your Microsoft 365 account, Agents Toolkit displays **Custom App Upload Enabled**.

:::image type="content" source="../assets/images/toolkit-v2/first-tab/m365-uploading-enabled.png" alt-text="Screenshot showing where to sign in to Microsoft 365 and Azure.":::

Now you're ready to build the app and run it in the local environment!

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Sign+in+to+your+Microsoft+365+account+using+Visual+Studio&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fsbs-gs-javascript%3Ftabs%3Dvscode%252Cvsc%252Cviscode%26tutorial-step%3D3&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fsbs-gs-javascript.yml&documentVersionIndependentId=e473e1f3-69f5-bcfa-bcab-54b098b59c80&platformId=49d016cb-d1f9-dbb1-b10d-01f7dd6fcf5f&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

# [Command line](#tab/cline)

1. Sign in to Microsoft 365 with Microsoft 365 Agents Toolkit CLI (previously known as TeamsFx CLI):

``` bash
atk account login m365
```

Your default web browser opens to let you sign in to the account. Sign in to your Azure account using your credentials. Close the browser when you're prompted.

2. Sign in to Azure with Agents Toolkit CLI:

``` bash
atk account login azure
```

Your default web browser opens to let you sign in to the account. Sign in to your Azure account using your credentials. Close the browser when you're prompted.

The account logins are shared between Visual Studio Code and Agents Toolkit CLI.

Now that the development environment is configured, you. can create, build, and deploy your first Teams app.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Sign+in+to+your+Microsoft+365+account+using+Command+line&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fsbs-gs-javascript%3Ftabs%3Dvscode%252Ccli%252Cviscode%26tutorial-step%3D3&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fsbs-gs-javascript.yml&documentVersionIndependentId=e473e1f3-69f5-bcfa-bcab-54b098b59c80&platformId=49d016cb-d1f9-dbb1-b10d-01f7dd6fcf5f&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)
