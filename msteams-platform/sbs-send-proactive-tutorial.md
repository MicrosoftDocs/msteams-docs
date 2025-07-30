---
title: Create Bot to Send Proactive Messages
author: MuyangAmigo
description: In this module, learn how to send proactive messages, such as welcome messages, scheduled messages, and notifications from a bot.
ms.author: shenwe
ms.localizationpriority: medium
ms.topic: overview
ms.date: 07/30/2025
---

# Send Proactive Messages

A proactive message is a message sent by a bot in response to simple commands sent in the chat from a user. The message response can be in one of the following formats:

- Welcome messages
- Scheduled messages
- Notifications

This step-by-step guide helps you to send a proactive message from a bot. You'll see the following output:

:::image type="content" source="~/assets/images/proactive-scenario/proactive-msg-result.png" alt-text="Screenshot shows the proactive hello message in Teams chat.":::

## Prerequisites

Ensure that you install the following tools for building and deploying your apps.

| &nbsp; | Install | For using |
| --- | --- | --- |
| &nbsp; | [Microsoft Visual Studio Code](https://code.visualstudio.com/download) | JavaScript or TypeScript, build environments. Use the latest version. |
| &nbsp; | [Microsoft 365 Agents Toolkit](#install-microsoft-365-agents-toolkit) (previously known as Teams Toolkit) | Visual Studio Code extension that creates a project scaffolding for your app. Use the latest version.|
| &nbsp; | [Node.js](https://nodejs.org/en/download/) | Back-end JavaScript runtime environment. For more information, see [Node.js version compatibility table for project type](~/toolkit/build-environments.md#nodejs-version-compatibility-table-for-project-type).|
| &nbsp; | [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Teams to collaborate with everyone you work with through apps for chat, meetings, call and all in one place.|
| &nbsp; | [Microsoft Edge](https://www.microsoft.com/edge/) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser with developer tools. |
| &nbsp; | [Microsoft 365 developer account](/microsoftteams/platform/concepts/build-and-test/prepare-your-o365-tenant) | Access to Teams account with the appropriate permissions to install an app. |

[!INCLUDE [Set up prerequisites](includes/get-started/prepare-toolkit.md)]

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI%20ran%20into%20an%20issue%5D%20Prepare%20development%20environment&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fsbs-send-proactive%3Ftabs%3Dvscode%26tutorial-step%3D1&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fsbs-send-proactive.yml&documentVersionIndependentId=d7374135-ac5f-b2f3-0340-d1585d4cb3be&platformId=32dd2454-098d-ea3f-209e-dcb0bc62e520&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Build Proactive Message bot

To build proactive message bot using Visual Studio Code, follow these steps:

1. Open Visual Studio Code.

1. Select the Microsoft 365 Agents Toolkit :::image type="icon" source="../msteams-platform/assets/images/toolkit-v2/toolkit-sidebar-icon.png"::: icon in the Visual Studio Code Activity Bar.

1.

    1. In the left pane, select **View Samples**.

        :::image type="content" source="assets/images/proactive-scenario/view-samples.png" alt-text="Screenshot shows the View Samples option in Visual Studio Activity Bar.":::
