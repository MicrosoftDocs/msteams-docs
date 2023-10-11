---
title: Bot-based Message extension
author: v-ypalikila
description: Learn how to build a bot message extension using Teams developer portal and Teams Toolkit.
ms.localizationpriority: medium
ms.topic: overview
ms.author: anclear
ms.date: 09/07/2023
---

# Bot-based Message extension

Bot-based message extensions use a bot to handle user requests and responses. They require a bot registration and a bot framework SDK. They can be configured and deployed using the DEveloper portal for Teams or the Teams Toolkit.

# [Teams Toolkit](#tab/Teams-toolkit)

1. Open **Visual Studio Code**.
1. From the left pane, Select **Teams Toolkit**.
1. Select **Create a New App**.
1. Select **Message Extension**.
1. Select **Custom Search Results**.
1. Select a **programming language**.
1. Select **Default folder**.
1. Enter the name of your app and select **Enter**.

To trigger the Message Extension through Copilot, you can:

1. Select **Debug in Copilot (Edge)** or **Debug in Copilot (Chrome)** from the launch configuration dropdown. The app launches in a browser.
1. Select **Apps** and search for Copilot.
1. Open the Copilot app and send a prompt to trigger your plugin.
1. Send a message to Copilot to find an NPM package information. For example, find the npm package info on teamsfx-react.

> [!NOTE]
> This prompt may not always make Copilot include a response from your message extension. If it happens, try some other prompts or leave a feedback to us by thumbing down the Copilot response and leave a message tagged with [MessageExtension].


# [Developer portal for Teams](#tab/developer-portal-for-teams)

1. Go to **Teams developer portal**.
1. Go to **Apps**.
1. Select **Create a new app**.
1. Under **Configure**, select **App features**.
1. Select **Messaging extension**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-app-feature.png" alt-text="Screenshot shows the plugin of copilot option in Teams developer portal.":::

1. Under **Message extension type**, select **Bot**.

1. If you have an existing bot, select **Existing bot** or if you have a bot ID, select **Enter Bot ID**.

   1. If don't have a Bot ID, you can select **Create a bot**, to create a new bot and enter the bot ID of the new bot that you've created.

1. Select the required scopes.

1. Under **Command**, select **+ Add a command**.

   A command details page appears.

1. In the Command details page, select the **Search** or **Action** as the type of command and update the following:
   * Command ID
   * Command title
   * Command description
   * Context in which the command works
   * Parameter name
   * Parameter title
   * Parameter description
   * Parameter description type

1. Select **Save**.

A bot-based ME is created.

## Step-by-step guide

You can go through the [step-by-step](../sbs-gs-msgext.yml) guide to build a bot-based message extension.

---
