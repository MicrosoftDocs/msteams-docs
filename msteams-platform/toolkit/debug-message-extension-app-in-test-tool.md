---
title: Debug message extension app in Test Tool
author: surbhigupta 
description: Learn how to emulate the Teams experience for your message extension app in Teams App Test Tool.
ms.author: surbhigupta 
ms.localizationpriority: high
ms.topic: overview
ms.date: 04/25/2024
---

# Debug message extension app in Test Tool

Teams App Test Tool now supports debugging bot-based Message Extension apps, including search command, action command and link unfurling.

For bot-based Message Extension app, it's built on the top of Bot Framework. When the Message Extension app is triggered, Test Tool will send invoke request to the app, then render and display the invoke response returned from the app.

> [!NOTE]
> The UX to trigger Message Extension app in Test Tool is different than Teams, as the goal of Test Tool is to test and debug the app logic and make the flow simple, instead of being a real chat app.

## Prerequisites

Ensure you install the following tools for building and deploying your bots in Test Tool:

| &nbsp; | Install | For using... |
| --- | --- | --- |
| &nbsp; | [Teams Toolkit](install-Teams-Toolkit.md) | A Microsoft Visual Studio Code extension that creates a project scaffolding for your app. Use the latest prerelease version. |
| &nbsp; | [Node.js](https://nodejs.org/en/download/) | Back-end JavaScript runtime environment. For more information, see [Node.js version compatibility table for project type](~/toolkit/build-environments.md#nodejs-version-compatibility-table-for-project-type). |
| &nbsp; | [Visual Studio Code](https://code.visualstudio.com/download) | JavaScript, TypeScript, or SharePoint Framework (SPFx) build environments. Use the latest version. |

## Build and run the sample app

1. Go to the [sample](https://github.com/OfficeDev/TeamsFx-Samples).

1. Clone the repository to test the sample app.

   ```
   git clone https://github.com/OfficeDev/TeamsFx-Samples.git
   ```

1. Go to **Visual Studio Code**.

1. Select **File** > **Open Folder**.

1. Go to the location where you cloned teamsFx-samples repo and select the **test-tool-sample-app** folder.

1. Select **Select Folder**.

1. From the left pane, select **Teams Toolkit**.

1. From the left pane, select **Run and Debug (Ctrl+Shift+D)** and select **Debug in Test Tool (Preview)** in dropdown list.

1. Test Tool opens the bot in a webpage.

1. Type `help` in the message compose area of Test Tool, it display all the message extension commands in the sample app.

1. Select **+** to display the list of Message Extension: 

   * Search Command

   * Action Command

   * Link Unfurling

## Search Command





