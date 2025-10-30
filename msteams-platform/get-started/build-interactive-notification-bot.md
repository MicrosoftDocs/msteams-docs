---
title: Build Interactive Notification Bot
description: Learn to build an interactive notification bot with the help of GitHub Codespaces, which sends messages in Teams channel, group chat, or personal chat.
ms.localizationpriority: medium
ms.date: 02/06/2025
ms.topic: reference
---

# Build an interactive notification bot app

For an interactive notification, a bot sends messages in a Teams channel, group chat, or personal chat. You can trigger an interactive notification bot with an HTTP request, such as cards or texts. For proactive notifications from tab apps, use [activity feed notifications](/graph/teams-send-activityfeednotifications).

:::image type="content" border="false" source="../assets/images/get-started/get-started-bot.png" alt-text="Screenshot shows you the conceptual notification bot in Teams client":::

 In this tutorial, you learn:

* How to create a new notification bot with Microsoft 365 Agents Toolkit (previously known as Teams Toolkit).
* About the directory structure of your app.
* How to send multiple notifications.

This step-by-step guide helps you to build notification bot with Agents Toolkit. You can see the following output:

:::image type="content" source="../assets\images\sbs-notification-bot\trigger-output.png" alt-text="Trigger Output"border="true":::

Here's a list of tools you need for building and deploying your apps.

   | &nbsp; | Install | For using |
   | --- | --- | --- |
   | &nbsp; | [Visual Studio Code](https://code.visualstudio.com/download) | JavaScript, or TypeScript, build environments. Use the latest version. |
   | &nbsp; | [Microsoft 365 Agents Toolkit](#install-microsoft-365-agents-toolkit) | Microsoft Visual Studio Code extension that creates a project scaffolding for your app. Use the latest version. |
   | &nbsp; | [Node.js](https://nodejs.org/en/download/) | Back-end JavaScript runtime environment. For more information, see [Node.js version compatibility table for project type](~/toolkit/build-environments.md#nodejs-version-compatibility-table-for-project-type).|
   | &nbsp; | [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams to collaborate with everyone you work with through apps for chat, meetings, and call all in one place.|
   | &nbsp; | [Microsoft&nbsp;Edge](https://www.microsoft.com/edge) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser with developer tools. |
   | &nbsp; | [Microsoft 365](https://developer.microsoft.com/en-us/microsoft-365/dev-program) | Access to Teams account with the appropriate permissions to install an app. |

   > [!NOTE]
   > The guide is tested on Agents Toolkit latest version and Nodejs version 18 and 20. The steps in this guide may work with other versions, but that isn't tested.

```[!INCLUDE [Set up prerequisites](includes/get-started/prepare-toolkit.md)]

 > [!div class="nextstepaction"]
 > [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Build+an+interactive+notification+bot+app+using+GitHub+Codespaces&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fget-started%2Fbuild-interactive-notification-bot%3Ftabs%3Dagentstoolkitcodespaces&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fget-started%2Fbuild-interactive-notification-bot.md&documentVersionIndependentId=e5653869-a83d-3558-0896-b88c45816a22&platformId=eee097dd-e3f6-d51e-48d6-fc448f59cf0d&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

