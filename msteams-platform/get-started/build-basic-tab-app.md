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

   [!INCLUDE [Set up prerequisites](includes/get-started/prepare-toolkit.md)]

   > [!div class="nextstepaction"]
   > [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Prepare+development+environment&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fsbs-gs-javascript%3Ftabs%3Dvscode%252Cvsc%252Cviscode%26tutorial-step%3D1&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fsbs-gs-javascript.yml&documentVersionIndependentId=e473e1f3-69f5-bcfa-bcab-54b098b59c80&platformId=49d016cb-d1f9-dbb1-b10d-01f7dd6fcf5f&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)
