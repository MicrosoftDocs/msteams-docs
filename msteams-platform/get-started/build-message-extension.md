---
title: Build Message Extension in Codespaces
description: Learn how to build your first message extension for your Teams app with the help of GitHub codespaces that opens Toolkit extension and step-by-step guides.
ms.localizationpriority: medium
ms.date: 02/06/2025
ms.topic: reference
---

# Build a message extension app

A message extension allows the users to interact with your web service through buttons and forms in the Microsoft Teams client. They can search or initiate actions in an external system from the compose message area, the command box, or directly from a message. You can send back the results of that interaction to the Teams client in the form of a richly formatted card.

:::image type="content" border="false" source="../assets/images/get-started/get-started-me.png" alt-text="Screenshot shows you the conceptual message extension in Teams client.":::

Start Microsoft Teams app development with your first Teams app using JavaScript.

In this tutorial, you'll learn:

- How to set up a new project with Microsoft 365 Agents Toolkit (previously known as Teams Toolkit).
- How to build a message extension app.
- How to deploy your app.

You'll see the following output after you complete this guide:

:::image type="content" source="../assets/images/toolkit-v2/first-msgext/app-added-mex-local-debug.png" alt-text="Screenshot shows the final output of the message extension app in Teams." lightbox="../assets/images/toolkit-v2/first-msgext/app-added-mex-local-debug.png":::

## Prerequisites

Ensure you install the following tools for building and deploying your apps.

   | &nbsp; | Install | For using... |
   | --- | --- | --- |
   | **Required** | &nbsp; | &nbsp; |
   | &nbsp; | [Visual Studio Code](https://code.visualstudio.com/download) | JavaScript or TypeScript build environments. Use the latest version. |
   | &nbsp; | [Microsoft 365 Agents Toolkit](#install-microsoft-365-agents-toolkit) | Microsoft Visual Studio Code extension that creates a project scaffolding for your app. Use the latest version.|
   | &nbsp; | [Node.js](https://nodejs.org/en/download/) | Backend JavaScript runtime environment. For more information, see [Node.js version compatibility table](~/toolkit/build-environments.md#nodejs-version-compatibility-table-for-project-type).|
   | &nbsp; | [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Collaborate with people you work with through apps for chats, meetings, and calls in one place.|
   | &nbsp; | [Microsoft Edge](https://www.microsoft.com/edge) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser with developer tools essential for debugging and testing. |
   | &nbsp; | [Microsoft 365 developer account](/microsoftteams/platform/concepts/build-and-test/prepare-your-o365-tenant) | Access to Teams account with appropriate permissions to install a custom app. |
   | **Optional** | &nbsp; | &nbsp; |
   | &nbsp; | [Azure Tools for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack) and [Azure CLI](/cli/azure/install-azure-cli) | Azure tools to access stored data or to deploy a cloud-based backend for your Teams app in Azure. |
   | &nbsp; | [React Developer Tools for Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) or [React Developer Tools for Microsoft Edge](https://microsoftedge.microsoft.com/addons/detail/react-developer-tools/gpphkfbcpidddadnkolkpfckpihlkkil) | A browser DevTools extension for the open-source React JavaScript library. |

[!INCLUDE [Set up prerequisites](includes/get-started/prepare-toolkit.md)]

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Prepare+development+environment&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fsbs-gs-msgext%3Ftabs%3Dvscode%252Cvsc1%252Cvsc2%252Cmsgext%252Cvsc3%252Cvsc4%26tutorial-step%3D1&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fsbs-gs-msgext.yml&documentVersionIndependentId=d0c82a43-2f4a-ad2e-251e-922e2e357806&platformId=e2feec5c-06f2-6065-f4a5-2e2947f00b97&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Get a free Azure account

If you want to host your app or access resources in Azure, you must have an Azure subscription. [Create a free account](https://azure.microsoft.com/free/) before you begin.
