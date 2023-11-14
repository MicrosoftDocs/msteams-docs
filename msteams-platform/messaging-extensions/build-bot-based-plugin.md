---
title: Create bot based Message extension plugin
author: v-ypalikila
description: Learn how to build a bot-based message extension plugin for Microsoft 365 Chat using Teams Developer Portal and Teams Toolkit.
ms.localizationpriority: medium
ms.topic: overview
ms.author: anclear
ms.date: 09/07/2023
---

# Extend bot-based message extension as plugin for Microsoft 365 Chat

> [!NOTE]
>
> * Bot-based search message extension plugin is available in [**public developer preview**](../resources/dev-preview/developer-preview-intro.md).
> * Only bot-based search message extension can be extended as a plugin in Microsoft 365 Chat.

Microsoft 365 Chat, powered by an advanced processing and orchestration engine, integrates Microsoft 365 apps, Microsoft Graph, and large language models (LLMs) to transform your words into a potent productivity tool. Although Microsoft 365 Chat can utilize apps and data within the Microsoft 365 ecosystem, many users rely on various external tools and services for work management and collaboration. By extending your message extension as a plugin in Microsoft 365 Chat, you can enable users to interact with third-party tools and services, thereby empowering them to achieve more with Microsoft 365 Chat. You can achieve this extension by developing a plugin or connecting to an external data source.

:::image type="content" source="../assets/images/Copilot/ailib-copilot-diff.png" alt-text="Graphic shows the user interaction flow between the user, Microsoft Teams and Microsoft 365 Chat.":::

## What is a plugin?

A plugin allows Microsoft 365 Chat to interact directly with third-party data, apps, and services, enhance its capabilities, and broaden its range of capabilities. Plugins allow Microsoft 365 Chat to:

* Fetch real-time information, such as the latest news coverage on a product launch.
* Retrieve knowledge-based information, such as a team’s design files in Figma.
* Perform actions on behalf of the user, such as creating a Contoso ticket.

All bot-based search message extensions are eligible for plugin support, subject to validation to ensure the plugin meets quality, security, privacy, and usefulness expectations.

You can create a bot-based message extension using Teams Toolkit for Visual Studio Code, Visual Studio, or CLI and extend the message extension to function as a plugin in Microsoft 365 Chat.

## Prerequisites

Before you get started, ensure that you're familiar with the following standards and guidelines for building message extension plugins for Microsoft 365 Chat:

* Standards for compliance, performance, security, and user experience outlined in [Teams Store validation guidelines](../concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md#teams-apps-extensible-as-microsoft-365-chat-plugin).

* [Guidelines to create or upgrade a message extension plugin for Microsoft 365 Chat](../messaging-extensions/high-quality-message-extension.md).

## Create bot-based message extension

# [Visual Studio Code](#tab/visual-studio-code)

> [!NOTE]
> Teams Toolkit support for bot-based message extension is available only in Teams Toolkit pre-release version. Before you get started, ensure that you've installed a [Teams Toolkit pre-release version](../toolkit/install-Teams-Toolkit.md#install-a-pre-release-version).

To create a bot-based search message extension plugin using Visual Studio Code, follow these steps:

1. Open **Visual Studio Code**.
1. From the left pane, select **Teams Toolkit**.
1. Select **Create a New App**.
1. Select **Message Extension**.
1. Select **Custom Search Results**.
1. Select **Start with a Bot**.

   :::image type="content" source="../assets/images/Copilot/bot-based-VSC-start-with-bot.png" alt-text="Screenshot shows the Start with a Bot option to create a bot-based message extension in Visual Studio Code..":::

1. Select a programming language.
1. Select Default folder.
1. Enter the name of your app and select Enter. Teams toolkit scaffolds your app and creates a message extension.

To run your message extension in Teams:

1. From the left pane, select **Teams Toolkit**.
1. Under **ACCOUNTS**, perform the following steps:
   1. Select **Sign in to Microsoft 365** and enter your Microsoft 365 credentials.
   1. Select **Sign in to Azure** and enter your Azure credentials.

      :::image type="content" source="../assets/images/Copilot/api-based-me-ttk-accounts.png" alt-text="Screenshot shows the Sign in to Microsoft 365 and Azure option under ACCOUNTS in Teams Toolkit for Visual Studio Code.":::

1. From the left pane, select **Run and Debug (Ctrl+Shift+D)**.
1. Select **Debug in Teams (Edge)** or **Debug in Teams (Chrome)**. Teams Toolkit launches your app in Teams using a web browser.
1. Select **Add**. The app is installed on Teams.
1. Go to a chat and select **Actions and apps**.
1. From the message extension fly-out menu, enter the name of your message extension in the search box.
1. Select your message extension and enter your search query.
1. Select a product from the list. Teams unfurls the product as an Adaptive Card in the message compose area.
1. Select **Send**.

**Trigger message extension in Microsoft 365 Chat**

To trigger the message extension through Microsoft 365 Chat, follow these steps:

1. Select **Apps**.
1. Search for **M365 Chat** and open the M365 Chat app.
1. Select **Plugins**.
1. From the list of plugins, turn on the toggle for your message extension.

   :::image type="content" source="../assets/images/Copilot/bot-based-VSC-plugin-toggle.png" alt-text="Screenshot shows the Plugin option, list of plugins, and the toggle enabled for bot-based-ME-test-local plugin.":::

1. From the compose message space, send a message to Microsoft 365 Chat to find Contoso information. For example, find Contoso product in Contoso-local.

   :::image type="content" source="../assets/images/Copilot/bot-based-VSC-trigger-plugin.png" alt-text="Screenshot shows the plugin prompt and the response from Microsoft 365 Chat.":::

> [!NOTE]
> This prompt may not always make Microsoft 365 Chat include a response from your message extension. If it happens, try some other prompts or leave feedback to us by downvoting the Microsoft 365 Chat response and leave a message.

# [Visual Studio](#tab/visual-studio)

Before you get started, ensure that you install the following tools to build and deploy your message extension:

* Install the Visual Studio Enterprise 2022 Preview version 17.9.0 Preview 1.0, and install the **Microsoft Teams development tools** under **ASP.NET and web development** workload.
* Ensure that the Copilot feature flag is enabled. To enable the feature flag, follow these steps:
  1. Open Visual Studio.
  1. Go to **Tools** > **Options**.
  1. Enter **Teams Toolkit** in the Search Settings search box.
  1. Under **Preview Features**, select the **Teams Toolkit: Develop Copilot Plugin** checkbox.

To create a bot-based search message extension plugin using Visual Studio, follow these steps:

1. Open **Visual Studio**.
1. Go to **File** > **New** > **Project...** or **Create a new Project**.

1. Search for **Teams** and select **Microsoft Teams App**.

1. Select **Custom Search Results**.

   :::image type="content" source="../assets/images/Copilot/bot-based-VS-new-project.png" alt-text="Screenshot shows the custom search results option in Visual Studio.":::

1. Select **Create**. The project is scaffolded.

1. In the debug dropdown menu, select **Dev Tunnels** > **Create a Tunnel**.

   :::image type="content" source="../assets/images/Copilot/bot-based-VS-dev-tunnel.png" alt-text="Screenshot shows the create a tunnel option in Visual Studio."::: </br>

   1. Select the account to create the tunnel. **Azure**, **Microsoft Account (MSA)**, and **GitHub** are the account types that are supported.
   1. **Name**: Enter a name for the tunnel.
   1. **Tunnel Type**: Select **Persistent** or **Temporary**.
   1. **Access**: Select **Public**.
   1. Select **OK**. Visual Studio displays a confirmation message that a tunnel is created.

    The tunnel you've created is listed under **Dev Tunnels > (name of the tunnel)**.

1. Go to **Solution Explorer** and select your project.
1. Right-click the project menu and selec  **Teams Toolkit** > **Prepare Teams App Dependencies**.

   :::image type="content" source="../assets/images/Copilot/bot-based-VS-teams-app-dependencies.png" alt-text="Screenshot shows the Prepare Teams app dependencies option under Teams Toolkit in Visual Studio app project.":::

   If prompted, sign in with a Microsoft 365 account.

1. In the debug dropdown menu, select **Microsoft Teams (browser)**. Visual Studio launches Teams web client.
1. Select **Add**. The message extension is added to Teams.

   :::image type="content" source="../assets/images/Copilot/bot-based-VS-debug-teams-add-app.png" alt-text="Screenshot shows an example of the Add option to add Contoso Pluginlocal app to Teams.":::

1. Go to a chat and select **Actions and apps**.
1. From the message extension fly-out menu, enter the name of your message extension in the search box.
1. Select your message extension and enter your search query.

   :::image type="content" source="../assets/images/Copilot/bot-based-VS-debug-teams-invoke.png" alt-text="Screenshot shows an example of Contoso search query entered in in the Contoso pluginlocal message extension and the message extension displays seven products results.":::

1. Select a product from the list. Teams unfurls the product into an Adaptive Card in the message compose area.
1. Select **Send**. The Adaptive Card is sent to the chat.

   :::image type="content" source="../assets/images/Copilot/bot-based-VS-debug-teams-send-card.png" alt-text="Screenshot shows Contoso.Base product sent as an Adaptive Card in Teams chat.":::

**Trigger message extension in Microsoft 365 Chat**

To trigger the message extension through Microsoft 365 Chat, follow these steps:

1. In the debug dropdown, select **Copilot (browser)**. Visual Studio launches Teams web client.

   :::image type="content" source="../assets/images/Copilot/bot-based-VSC-debug-Copilot.png" alt-text="Screenshot shows the Copilot (Browser)  debug option in Visual Studio.":::

1. Go to **Teams web client** > **Apps**.
1. Search for **M365 Chat** and open the M365 Chat app.
1. Select **Plugins**.
1. From the list of plugins, turn on the toggle for your app.

   :::image type="content" source="../assets/images/Copilot/bot-based-VS-me-plugin-toggle.png" alt-text="Screenshot shows the Plugin option, list of plugins, and the toggle enabled for bot-based-ME-test-local plugin.":::

1. From the compose message area, send a message to Microsoft 365 Chat to find Contoso information. For example, find Contoso product in Contoso-local.

   :::image type="content" source="../assets/images/Copilot/bot-based-VS-trigger-plugin.png" alt-text="Screenshot shows the plugin prompt and the Adaptive Card response with content and preview card from Microsoft 365 Chat. The response contains a list of four products with Contoso product name. ":::

> [!NOTE]
> This prompt may not always make Microsoft 365 Chat include a response from your message extension. If it happens, try some other prompts or leave feedback to us by downvoting the Microsoft 365 Chat response and leave a message.

# [Toolkit CLI](#tab/toolkit-cli)

To create a bot-based search message extension plugin using Teams Toolkit CLI, follow these steps:

1. Go to **Command Prompt**.

1. Enter the following command:

   ```
   npm install -g @microsoft/teamsfx-cli@beta
   ```

1. Type `teamsfx new` in the terminal.

1. Select **Message Extension**. Use the arrow keys to switch between options.

   :::image type="content" source="../assets/images/Copilot/api-based-me-CLI-new-project-me.png" alt-text="Screenshot shows Teams capabilities as options in the CLI interface.":::

1. Select **Custom Search Results**.
1. Select **Start with a Bot**.

   :::image type="content" source="../assets/images/Copilot/bot-based-CLI-new-project.png" alt-text="Screenshot shows the message extension, custom search results and start with a bot option selected in the CLI window.":::

1. Enter the location for your project and select **Enter**.

1. Enter the name of your application and select **Enter**.

   Teams Toolkit scaffolds and creates a project in the specified location.

1. Go to the folder path where your project is created and enter the following command to provision your app in Azure:

   ```teamsfx provision --env dev```

   Teams Toolkit CLI opens a browser window and requests you to sign in to your Microsoft Account.

1. Sign in to your Microsoft account. Teams Toolkit CLI executes validation and provisions your app on Azure.

   :::image type="content" source="../assets/images/Copilot/api-based-CLI-provision-me.png" alt-text="Screenshot shows the sign in request and the provision stages in the command prompt window.":::

1. From the list, select a subscription.

   :::image type="content" source="../assets/images/Copilot/bot-based-CLI-resource-group.png" alt-text="Screenshot shows the login to Azure and select a subscription option in the CLI window.":::

1. From the list, select a resource group.
1. If you receive a message which reads **Cost may incur according to the usage. Do you want to provision resources in dev environment using accounts listed above?**, Enter **Y**.

   :::image type="content" source="../assets/images/Copilot/bot-based-CLI-provisoin-preview.png" alt-text="Screenshot shows the Do you want to provision resources in dev environment using accounts listed above? option in CLI window.":::

   Teams Toolkit validates your app manifest and provisions your app on Azure.

1. In the command prompt window, enter the following command to preview your app in Teams:

   ```teamsfx preview --env dev```

   A new browser window with Teams web client opens. You can add your app to Teams.

1. Select **Add**. The message extension is added to Teams.
1. Go to a chat and select **Actions and apps**.
1. From the message extension fly-out menu, enter the name of your message extension in the search box.
1. Select your message extension and enter your search query.

**Trigger message extension in Microsoft 365 Chat**

To trigger the message extension through Microsoft 365 Chat, follow these steps:

1. Select **Apps**.
1. Search for **M365 Chat**  and open the M365 Chat app.
1. Select **Plugins**.
1. From the list of plugins, turn on the toggle for your app.

   :::image type="content" source="../assets/images/Copilot/bot-based-VSC-plugin-toggle.png" alt-text="Screenshot shows the Plugin option, list of plugins, and the toggle enabled for bot-based-ME-test-local plugin.":::

1. From the compose message area, send a message to Microsoft 365 Chat to find Contoso information. For example, find Contoso product in Contoso-local.

   :::image type="content" source="../assets/images/Copilot/bot-based-VSC-trigger-plugin.png" alt-text="Screenshot shows the plugin prompt and the response from Microsoft 365 Chat.":::

> [!NOTE]
> This prompt may not always make Microsoft 365 Chat include a response from your message extension. If it happens, try some other prompts or leave feedback to us by downvoting the Microsoft 365 Chat response and leave a message tagged with [MessageExtension].

<!--# [Developer Portal for Teams](#tab/developer-portal-for-teams)

1. Go to **Teams Developer Portal**.
1. Go to **Apps**.
1. Select **Create a new app**.
1. Under **Configure**, select **App features**.
1. Select **Messaging extension**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-app-feature.png" alt-text="Screenshot shows the messaging extension option in Teams Developer Portal.":::

1. Under **Message extension type**, select **Bot**.

:::image type="content" source="../assets/images/Copilot/bot-based-tdp-select-bot.png" alt-text="Screenshot shows the Bot, Existing bot, and Enter Bot ID options for messaging extension app feature in Developer Portal for Teams.":::

1. If you have an existing bot, select **Existing bot** or if you have a bot ID, select **Enter Bot ID**.

   1. If don't have a Bot ID, you can select **Create a bot**, to create a new bot and enter the bot ID of the new bot that you've created.

1. Select **Save**.

1. Under **Command**, select **+ Add a command**.

   Add a command page appears.

1. In the **Add a command** page, select the **Search** as the type of command and update the following:
   * Command ID
   * Command title
   * Command description
   * Context in which the command works
   * Parameter name
   * Parameter title
   * Parameter description

1. Select **Save**. The command is added to the message extension.

1. Select **Save**.

A bot-based message extension is created.

:::image type="content" source="../assets/images/Copilot/bot-based-tdp-message-extension-created.png" alt-text="Screenshot shows the messaging extension created and listed in the App features page in Developer Portal for Teams."::: -->

---

## See also

* [Build message extensions using API](api-based-overview.md)
* [Define message extension action commands](how-to/action-commands/define-action-command.md)
