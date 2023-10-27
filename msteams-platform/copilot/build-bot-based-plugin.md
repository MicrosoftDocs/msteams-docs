---
title: Create bot based Message extension
author: v-ypalikila
description: Learn how to build a bot message extension using Teams developer portal and Teams Toolkit.
ms.localizationpriority: medium
ms.topic: overview
ms.author: anclear
ms.date: 09/07/2023
---

# Extend Bot-based message extension as a plugin

Microsoft 365 Copilot is powered by an advanced processing and orchestration engine that seamlessly integrates Microsoft 365 apps, Microsoft Graph, and large language models (LLMs) to turn your words into the most powerful productivity tool. While Copilot is already able to use the apps and data within the Microsoft 365 ecosystem, many users still depend on various external tools and services for work management and collaboration. You can address this gap by extending Copilot to enable users to work with their third-party tools and services, unlocking the full potential of Microsoft 365 Copilot.
You can extend Microsoft 365 Copilot by building a plugin or by connecting to an external data source.

## What is a plugin?

A plugin allows Copilot to interact directly with third-party data, apps, and services, enhancing its capabilities and broadening its range of capabilities. Plugins allow Copilot to:

* Retrieve real-time information, for example, latest news coverage on a product launch.
* Retrieve knowledge-based information, for example, my team’s design files in Figma.
* Perform actions on behalf of the user, for example, create a Jira ticket.

All Message Extensions will be supported as plugins pending validation to ensure the plugin meets quality, security, privacy, and usefulness expectations.

Bot based message extensions can be extended to work as a plugin in Copilot. You can create a bot-based message extension to work in Copilot using Teams Toolkit for Visual Studio Code, Visual Studio and CLI.

# [Visual Studio Code](#tab/visual-studio-code)

1. Open **Visual Studio Code**.
1. From the left pane, Select **Teams Toolkit**.
1. Select **Create a New App**.
1. Select **Message Extension**.
1. Select **Custom Search Results**.
1. Select **Start with a Bot**.
1. Select a programming language.
1. Select Default folder.
1. Enter the name of your app and select Enter. Teams toolkit scaffolds your app and creates a message extension.

To run your message extension in Teams:

1. From the left pane, Select **Teams Toolkit**.
1. Under **ACCOUNTS**:
   1. Select **Sign in to Microsoft 365** and enter your Microsoft 365 credentials.
   1. Select **Sign in to Azure** and enter your Azure credentials.
1. From the left pane, select **Run and Debug (Ctrl+Shift+D)**.
1. Select **Debug in Teams (Edge)** or **Debug in Teams (Chrome)**. Teams Toolkit launches your app in Teams using a web browser.
1. Select **Add**. The app is installed to Teams.
1. Go to a chat and select **Actions and apps**.
1. From the message extension fly-out menu, @mention your message extension from the search box area.
1. Select your message extension and enter your search query.

To trigger the Message Extension through Copilot, you can:

1. Select **Apps**.
1. Search for Copilot.
1. Open the Copilot app and send a prompt to trigger your plugin.

> [!NOTE]
> This prompt may not always make Copilot include a response from your message extension. If it happens, try some other prompts or leave a feedback to us by thumbing down the Copilot response and leave a message tagged with [MessageExtension].

# [Visual Studio](#tab/visual-studio)

1. Open Visual Studio.
1. Go to **File** > **New** > **Project...** or **New Project**.

1. Search for **Teams** and select **Microsoft Teams App**.

1. Select **Custom Search Results**.
1. Select **Create**. The project is scaffolded.

1. In the debug dropdown, select **Dev Tunnels** > **Create a Tunnel**.
   1. Select the Account to use to create the tunnel. Azure, Microsoft Account (MSA), and GitHub are the account types that are supported.
   1. Name: Enter a Name for the tunnel.
   1. Tunnel Type: Select Persistent or Temporary.
   1. Access: Select Public.
   1. Select **OK**. Visual Studio displays a confirmation message that a tunnel is created.

    The tunnel you've created is listed under **Dev Tunnels(MyPublicDevTunnel)**.

1. Go to **Solution Explorer**.
1. Select your project and right-click.
1. From the menu, select **Teams Toolkit** > **Prepare Teams App Dependencies**.
   1. If prompted, sign in with a Microsoft 365 account.
1. In the debug dropdown, select **Microsoft Teams (browser)**. Visual Studio launces Teams web client.
1. Select **Add**.
1. You can search NuGet package from compose message area, or from the command box.

To trigger the Message Extension through Copilot, you can:

1. In the debug dropdown, select **Copilot (browser)**. Visual Studio launces Teams web client.
1. Go to **Teams web client** > **Apps**.
1. Search for Copilot and open the Copilot app.
1. In the Copilot app, send a prompt to trigger your plugin.
1. Send a message to Copilot to find an NuGet package information. For example: Find the NuGet package info on Microsoft.CSharp.

> [!NOTE]
> This prompt may not always make Copilot include a response from your message extension. If it happens, try some other prompts or leave a feedback to us by thumbing down the Copilot response and leave a message tagged with [MessageExtension].

# [Toolkit CLI](#tab/toolkit-cli)

1. Go to **Command Prompt**.

1. Enter the following command:

   ```
   npm install -g @microsoft/teamsfx-cli@2.0.3-beta.2023101103.0
   ```

1. Type `teamsfx new` in the terminal

1. Select **Message Extension**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-CLI-new-project-me.png" alt-text="Screenshot shows Teams capabilities as options in the CLI interface.":::

1. Select **Custom Search Results**.
1. Select **Start with a Bot**.

   :::image type="content" source="../assets/images/Copilot/bot-based-CLI-new-project.png" alt-text="Screenshot shows the message extension, custom search results and start with a bot options selected in the CLI window.":::

1. Enter the location for your project and select **Enter**.

1. Enter the name of your application and select **Enter**.

   Teams Toolkit will scaffold and create a project in the specified location.

1. Go to the folder path where your project is created and enter the following command to provision your app in Azure:

   ```teamsfx provision --env dev```

   Teams Toolkit CLI opens a browser window and requests you to sign in to your Microsoft Account.

1. Sign in to your Microsoft account. Teams Toolkit CLI will execute validation and provisions your app on Azure.

   :::image type="content" source="../assets/images/Copilot/api-based-CLI-provision-me.png" alt-text="Screenshot shows the sign in request and the provision stages in the command prompt window.":::

1. From the list, select a subscription.

   :::image type="content" source="../assets/images/Copilot/bot-based-CLI-resource-group.png" alt-text="Screenshot shows the login to Azure and select a subscription option in the CLI window.":::

1. From the list, select a resource group.
1. For Cost may incur according to the usage. Do you want to provision resources in dev environment using accounts listed above?, Enter Y.

   :::image type="content" source="../assets/images/Copilot/bot-based-CLI-provisoin-preview.png" alt-text="Screenshot shows the Do you want to provision resources in dev environment using accounts listed above? option in CLI window.":::

   Teams Toolkit will validate your app and provision your app on Azure.

1. In the command prompt window, enter the following command to preview your app in Teams:

   ```teamsfx preview --env dev```

   A new browser window with Teams web client opens. You can add your app to Teams.

1. Select **Add**. The message extension is added to Teams.
1. Go to a chat and select **Actions and apps**.
1. From the message extension fly-out menu, @mention your message extension from the search box area.
1. Select your message extension and enter your search query.

<!--
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

A bot based ME is created. -->

---

## See also

[Frequently Asked Questions](copilot-plugin-faq.md)
