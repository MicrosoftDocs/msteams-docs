---
title: Create bot based Message extension plugin
author: v-ypalikila
description: Learn how to build a bot-based message extension plugin for Microsoft Copilot for Microsoft 365 using Teams Developer Portal and Teams Toolkit.
ms.localizationpriority: medium
ms.topic: overview
ms.author: anclear
ms.date: 11/14/2023
---

# Extend bot-based message extension as plugin for Copilot for Microsoft 365

> [!NOTE]
>
> * Copilot for Microsoft 365 is in private preview. Ensure that Copilot for Microsoft 365 is available for your organization. You have two ways to get a developer environment for Copilot:
>   * A sandbox Microsoft 365 tenant with Copilot (available in limited preview through [TAP membership](https://developer.microsoft.com/microsoft-365/tap)).
>   * An enterprise customer production environment with Microsoft Copilot for Microsoft 365 licenses.
> * Bot-based search message extension plugin is available in [**public developer preview**](../resources/dev-preview/developer-preview-intro.md).
> * Only bot-based search message extension can be extended as a plugin for Copilot for Microsoft 365.

Microsoft Copilot for Microsoft 365, powered by an advanced processing and orchestration engine, integrates Microsoft 365 apps, Microsoft Graph, and large language models (LLMs) to transform your words into a potent productivity tool. Although Copilot for Microsoft 365 can utilize apps and data within the Microsoft 365 ecosystem, many users rely on various external tools and services for work management and collaboration. By extending your message extension as a plugin in Copilot for Microsoft 365, you can enable users to interact with third-party tools and services, therefore empowering them to achieve more with Copilot for Microsoft 365. You can achieve this extension by developing a plugin or connecting to an external data source.

:::image type="content" source="../assets/images/Copilot/ailib-copilot-diff.png" alt-text="Graphic shows the user interaction flow between the user, Microsoft Teams and M365 Chat." lightbox="../assets/images/Copilot/ailib-copilot-diff.png":::

See the video to learn more about extending Copilot for Microsoft 365 using Teams message extensions:
</br>
</br>

> [!VIDEO https://www.youtube.com/embed/vvNFCagkdcE?si=1jS5gsLuJFPANzoi]

## What is a plugin?

A plugin allows Copilot for Microsoft 365 to interact directly with third-party data, apps, and services, enhance its capabilities, and broaden its range of capabilities. Plugins allow Copilot for Microsoft 365 to:

* Fetch real-time information, such as the latest news coverage on a product launch.
* Retrieve knowledge-based information, such as a team’s design files in Figma.
* Perform actions on behalf of the user, such as creating a Contoso ticket.

All bot-based search message extensions are eligible for plugin support, subject to validation to ensure the plugin meets quality, security, privacy, and usefulness expectations.

You can create a bot-based search message extension using Teams Toolkit for Visual Studio Code, Visual Studio, Teams Toolkit command line interface (CLI), or Developer Portal for Teams and extend the message extension to function as a plugin in Copilot for Microsoft 365.

## Prerequisites

Before you get started, ensure that you're familiar with the following standards and guidelines for building message extension plugins for Copilot for Microsoft 365:

* Standards for compliance, performance, security, and user experience outlined in [Teams Store validation guidelines](../concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md#teams-apps-extensible-as-plugin-for-microsoft-copilot-for-microsoft-365).

* [Guidelines to create or upgrade a message extension plugin for Copilot for Microsoft 365](../messaging-extensions/high-quality-message-extension.md).

## Create bot-based message extension

> [!IMPORTANT]
> Plugins for Microsoft Copilot for Microsoft 365 are in preview and only work in Microsoft 365 Chat in Microsoft Teams.

Let's create a bot-based search message extension that can search npm registries in Teams and Copilot and share results through the compose message area of the Microsoft Teams client.

# [Visual Studio Code](#tab/visual-studio-code)

Before you get started, ensure that you install the following tools to build and deploy your message extension:

* Install the latest [Teams Toolkit prerelease version](../toolkit/install-Teams-Toolkit.md#install-a-pre-release-version).
* Ensure that the **Develop Copilot Plugin** feature flag is enabled. To enable the feature flag, follow these steps:
  1. Open **Visual Studio Code**.
  1. Go to **Manage** > **Settings**.
  1. Enter **Teams Toolkit** in the **Search settings** search box.
  1. Under **Extensions**, select the **Fx-extension: Develop Copilot Plugin** checkbox.

To create a bot-based search message extension plugin using Visual Studio Code, follow these steps:

1. Open **Visual Studio Code**.
1. From the left pane, select **Teams Toolkit**.
1. Select **Create a New App**.
1. Select **Message Extension**.
1. Select **Custom Search Results**.
1. Select **Start with a Bot**.

   :::image type="content" source="../assets/images/Copilot/bot-based-VSC-start-with-bot.png" alt-text="Screenshot shows the Start with a Bot option to create a bot-based message extension in Visual Studio Code.":::

1. Select a programming language.
1. Select **Default folder**.
1. Enter the name of your app and select **Enter**. Teams Toolkit scaffolds your app and creates a message extension.

To run your message extension in Teams, follow these steps:

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

**Trigger message extension in M365 Chat**

To trigger the message extension as plugin in M365 Chat, follow these steps:

1. Select **Apps**.
1. Search for **M365 Chat** and open the **M365 Chat** app.
1. Select **Plugins**.
1. From the list of plugins, turn on the toggle for your message extension.

   :::image type="content" source="../assets/images/Copilot/bot-based-VSC-plugin-toggle.png" alt-text="Screenshot shows the Plugin option, list of plugins, and the toggle enabled for bot-based-ME-test-local plugin.":::

1. From the message compose area, send a message to M365 Chat to search for npm package information in Teams and Copilot. For example, find the npm package info on teamsfx-react in npm-searchlocal.

   :::image type="content" source="../assets/images/Copilot/bot-based-VSC-trigger-plugin.png" alt-text="Screenshot shows the plugin prompt and the response from M365 Chat.":::

> [!NOTE]
> This prompt might not always make M365 Chat include a response from your message extension. If it happens, try some other prompts or leave feedback to us by downvoting the M365 Chat response and leave a message.

# [Visual Studio](#tab/visual-studio)

Before you get started, ensure that you install the following tools to build and deploy your message extension:

* Install the Visual Studio Enterprise 2022 Preview version 17.9.0 Preview 1.0 or later and install the **Microsoft Teams development tools** under **ASP.NET and web development** workload.
* Ensure that the Copilot feature flag is enabled. To enable the feature flag, follow these steps:
  1. Open **Visual Studio**.
  1. Go to **Tools** > **Options**.
  1. Enter **Teams Toolkit** in the **Search Settings** search box.
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

    The tunnel you created is listed under **Dev Tunnels > (name of the tunnel)**.

1. Go to **Solution Explorer** and select your project.
1. Right-click the project menu and select **Teams Toolkit** > **Prepare Teams App Dependencies**.

   :::image type="content" source="../assets/images/Copilot/bot-based-VS-teams-app-dependencies.png" alt-text="Screenshot shows the Prepare Teams app dependencies option under Teams Toolkit in Visual Studio app project.":::

   If prompted, sign in with a Microsoft 365 account.

1. In the debug dropdown menu, select **Microsoft Teams (browser)**. Visual Studio launches Teams web client.
1. Select **Add**. The message extension is added to Teams.

   :::image type="content" source="../assets/images/Copilot/bot-based-VS-debug-teams-add-app.png" alt-text="Screenshot shows an example of the Add option to add Contoso Pluginlocal app to Teams.":::

1. Go to a chat and select **Actions and apps**.
1. From the message extension fly-out menu, enter the name of your message extension in the search box.
1. Select your message extension and enter your search query.

   :::image type="content" source="../assets/images/Copilot/bot-based-VS-debug-teams-invoke.png" alt-text="Screenshot shows an example of Contoso search query entered in the Contoso pluginlocal message extension and the message extension displays seven products results.":::

1. Select a product from the list. Teams unfurls the product into an Adaptive Card in the message compose area.
1. Select **Send**. The Adaptive Card is sent to the chat.

   :::image type="content" source="../assets/images/Copilot/bot-based-VS-debug-teams-send-card.png" alt-text="Screenshot shows Contoso. Base product sent as an Adaptive Card in Teams chat.":::

**Trigger message extension in M365 Chat**

To trigger the message extension as plugin in M365 Chat, follow these steps:

1. Go to **Visual Studio**.
1. In the debug dropdown, select **Copilot (browser)**. Visual Studio launches Teams web client.

   :::image type="content" source="../assets/images/Copilot/bot-based-VSC-debug-Copilot.png" alt-text="Screenshot shows the Copilot (Browser) debug option in Visual Studio.":::

1. Go to **Teams web client** > **Apps**.
1. Search for **M365 Chat** and open the **M365 Chat** app.
1. Select **Plugins**.
1. From the list of plugins, turn on the toggle for your app.

   :::image type="content" source="../assets/images/Copilot/bot-based-VS-me-plugin-toggle.png" alt-text="Screenshot shows the Plugin option, list of plugins, and the toggle enabled for bot-based-ME-test-local plugin.":::

1. From the message compose area, send a message to M365 Chat to search for npm package information in Teams and Copilot. For example, find the npm package info on teamsfx-react in npmsearchlocal.

   :::image type="content" source="../assets/images/Copilot/bot-based-VS-trigger-plugin.png" alt-text="Screenshot shows the plugin prompt and the Adaptive Card response with content and preview card from M365 Chat. The response contains a list of four products with Contoso product name. ":::

> [!NOTE]
> This prompt might not always make M365 Chat include a response from your message extension. If it happens, try some other prompts or leave feedback to us by downvoting the M365 Chat response and leave a message.

# [Toolkit CLI](#tab/toolkit-cli)

Before you get started, ensure that you set the environment variable **DEVELOP_COPILOT_PLUGIN** to **true**. To set the environment variables, follow these steps:

1. On your computer, select the **Windows** + **X** key.
1. Select **System**.
1. Under **About** > **Device specifications**, select **Advanced system settings**.
1. Under **System Properties**, select **Environment Variables..**.
1. Under **User variables**, select **New..**. A **New User Variable** dialog opens.
1. Update the following fields:
    1. **Variable name**: DEVELOP_COPILOT_PLUGIN
    1. **Variable value**: true
1. Select **OK**.

   :::image type="content" source="../assets/images/Copilot/bot-based-plugin-CLI-add-env-variable.png" alt-text="Screenshot shows the Variable name and Variable value fields in the New User Variable dialog.":::

To create a bot-based search message extension plugin using Teams Toolkit CLI, follow these steps:

1. Go to **Command Prompt**.

1. Enter the following command:

   ```
   npm install -g @microsoft/teamsfx-cli@beta
   ```

1. Enter `teamsfx new` in the terminal.

1. Select **Message Extension**. Use the arrow keys to switch between options.

   :::image type="content" source="../assets/images/Copilot/api-based-me-CLI-new-project-me.png" alt-text="Screenshot shows Teams capabilities as options in the CLI interface.":::

1. Select **Custom Search Results**.
1. Select **Start with a Bot**.

   :::image type="content" source="../assets/images/Copilot/bot-based-CLI-new-project.png" alt-text="Screenshot shows the message extension, custom search results and start with a bot option selected in the CLI window.":::

1. Enter the location for your project and select **Enter**.

1. Enter the name of your application and select **Enter**.

   Teams Toolkit scaffolds and creates a project in the specified location.

1. Go to the folder path where your project is created and enter the following command to provision your app in Azure:

   ```
    teamsfx provision --env dev
   ```

   Teams Toolkit CLI opens a browser window and requests you to sign in to your Microsoft Account.

1. Sign in to your Microsoft account. Teams Toolkit CLI executes validation and provisions your app on Azure.

1. From the list, select a subscription.

   :::image type="content" source="../assets/images/Copilot/bot-based-CLI-resource-group.png" alt-text="Screenshot shows the login to Azure and select a subscription option in the CLI window.":::

1. From the list, select a resource group.
1. If you receive a message, which reads **Cost may incur according to the usage. Do you want to provision resources in dev environment using accounts listed above?**, enter **Y**.

   :::image type="content" source="../assets/images/Copilot/bot-based-CLI-provisoin-preview.png" alt-text="Screenshot shows the Cost may incur according to the usage. Do you want to provision resources in dev environment using accounts listed option in the CLI window.":::

   Teams Toolkit validates your app manifest and provisions your app on Azure.

1. In the command prompt window, enter the following command to preview your app in Teams:

   ```
    teamsfx preview --env dev
   ```

   A new browser window with Teams web client opens. You can add your app to Teams.

1. Select **Add**. The message extension is added to Teams.
1. Go to a chat and select **Actions and apps**.
1. From the message extension fly-out menu, enter the name of your message extension in the search box.
1. Select your message extension and enter your search query.

**Trigger message extension in M365 Chat**

To trigger the message extension through M365 Chat, follow these steps:

1. Select **Apps**.
1. Search for **M365 Chat** and open the **M365 Chat** app.
1. Select **Plugins**.
1. From the list of plugins, turn on the toggle for your app.

   :::image type="content" source="../assets/images/Copilot/bot-based-VSC-plugin-toggle.png" alt-text="Screenshot shows the Plugin option, list of plugins, and the toggle enabled for bot-based-ME-test-local plugin.":::

1. From the message compose area, send a message to M365 Chat to search for npm package information in Teams and Copilot. For example, find the npm package info on teamsfx-react in npm-searchlocal.

   :::image type="content" source="../assets/images/Copilot/bot-based-VSC-trigger-plugin.png" alt-text="Screenshot shows the plugin prompt and the response from M365 Chat.":::

> [!NOTE]
> This prompt might not always make M365 Chat include a response from your message extension. If it happens, try some other prompts or leave feedback to us by downvoting the M365 Chat response and leave a message tagged with [MessageExtension].

# [Developer Portal for Teams](#tab/developer-portal-for-teams)

To create a bot-based search message extension plugin using Developer portal for Teams, follow these steps:

1. Go to **Teams Developer Portal**.
1. Go to **Apps**.
1. Select **+ New apps**.
1. Under **Configure**, select **App features**.
1. Select **Messaging extension**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-app-feature.png" alt-text="Screenshot shows the messaging extension option in Teams Developer Portal.":::

1. Under **Message extension type**, select **Bot**.

   1. If you get a disclaimer, which reads **API Message extension is already in use by users. Would you like to change message extension type to bot?**. Select **Yes, change**.

   :::image type="content" source="../assets/images/Copilot/bot-based-me-tdp-type.png" alt-text="Screenshot shows API Message extension is already in use disclaimer when a user switches from API to bot message extension type.":::

1. If you have an existing bot, select **Existing bot** or if you have a bot ID, select **Enter Bot ID**.

   1. If you don't have a Bot ID, you can select **Create a new bot**, to create a new bot and enter the bot ID of the new bot that you've created.

   :::image type="content" source="../assets/images/Copilot/bot-based-tdp-select-bot.png" alt-text="Screenshot shows the Bot, Existing bot, and Enter Bot ID options for messaging extension app feature in Developer Portal for Teams.":::

1. Select **Save**.

1. Under **Command**, select **+ Add a command**.

   Add a command page appears.

1. In the **Add a command** page, select the **Search** as the type of command and update the following fields:
   * Command ID
   * Command title
   * Command description
   * Context in which the command works
   * Parameter name
   * Parameter title
   * Parameter description

1. Select **Save**. The command is added to the message extension.

1. Select **Save**.

A bot-based search message extension is created.

:::image type="content" source="../assets/images/Copilot/bot-based-tdp-message-extension-created.png" alt-text="Screenshot shows the messaging extension created and listed in the App features page in Developer Portal for Teams.":::

To test your bot-based message extension created in the Developer Portal for Teams, you can use the following methods:

* **Preview in Teams**: In Developer Portal, open your message extension and select **Preview in Teams** in the upper-right corner. You are redirected to Teams, where you can add the app to Teams to preview the app.

* **Download app package**: On the message extension page, select **App package** from the left pane and then, in the upper-left corner of the window, select **Download app package**. The app package is downloaded to your local machine in a .zip file. You can upload the app package to teams and test the message extension.

---

## Message extension as plugin for Copilot for Teams meetings

Message extension plugins are supported in Copilot for Teams meetings. Extending bot-based message extension plugins to meetings allows developers to enhance the Copilot for Teams meetings. Copilot can utilize various app capabilities during meetings, such as task modules, app sharing, and more, to improve user engagement and productivity. For example, a plugin can be used in Copilot for Teams meetings to perform actions like creating polls, adding CRM entries, or even complex operations that require data fetching and rationalization from multiple sources.

Meetings Copilot is interactive and efficient, it can assist with summarizing discussions, suggesting action items, and providing prompt-less assistance in real-time. You can send static and dynamic or real-time prompts based on live transcription in an ongoing meeting. Users can ask natural language questions to meeting copilot and get responses from your plugin that are relevant to the meeting context. Plugins are available for users to enable in both M365 chat and meeting copilot.

**Benefits**

* **User Empowerment:** Extending Meeting Copilot empowers users with various actions to enhance their meeting experience:
* **UI Commands:** Users can easily access features like opening a task module or sharing an app to the stage.
* **Search Commands:** Efficient data retrieval from app databases is made possible, streamlining the search process.
* **Action Commands:** Users can facilitate tasks such as creating polls or adding entries into CRM applications.
* **Complex Commands:** These commands involve data fetching and rationalizing from multiple sources, enabling users to make informed decisions based on comprehensive data analysis.


**Scenarios**

1. **Reactive Commands:** Users can directly command Copilot to perform specific actions or provide information. This includes:
   * **Natural Language Prompts:** Users can instruct Copilot to carry out search or action commands. For example, requesting the latest sales report prompts Copilot to retrieve it from the app database.
   * **Prompt Suggestions:** Apps can offer static or enriched prompts for Copilot to execute, such as creating a new task, which Copilot would then facilitate by opening the relevant module.

2. **Proactive Assistance:** Copilot proactively listens to meeting signals and assists users by:
   * **Suggesting prompts from apps:** These suggestions are contextually relevant, like opening a project management app during a discussion on project planning.
   * **Providing assistance without explicit prompts:** Copilot can automatically suggest actions like creating a poll or recommending app content based on the meeting's discussion topics.

### Enable message extension as a plugin for Copilot for meetings

**Pre-requisites**

Ensure that you've created a bot-based message extension and extended it as a plugin for Copilot for Microsoft 365.

To enable message extension as a plugin for Copilot for Teams meetings, follow these steps:

1. Go to a **Teams meeting**.
1. Select **Join**.
1. In the meeting window, select **Copilot**.

1. Select **Start transcription**.

   :::image type="content" source="../assets/images/Copilot/meeting-copilot-start-transcription.png" alt-text="Screenshot shows the Copilot option and start transcription button in a Teams meeting.":::

1. Select the Spoken language and select **Confirm**. The Copilot for Teams pane appears.

   :::image type="content" source="../assets/images/Copilot/meeting-copilot-select-language.png" alt-text="Screenshot shows the dropdown to select a spoken language and a confirm button in Teams meeting.":::

1. In the Copilot for Teams pane, at the bottom-right corner, select the **Copilot Plugin Button**.

   :::image type="content" source="../assets/images/Copilot/meeting-copilot-trigger-plugin.png" alt-text="Screenshot shows the plugin icon in the copilot pane in a Teams meeting.":::

1. Search for your plugin and turn on the toggle for your plugin.

1. From the compose area, select **More prompts** to send a static prompt or you can type your own prompt and select **Send**.

   :::image type="content" source="../assets/images/Copilot/meeting-copilot-static-prompts.png" alt-text="Screenshot shows the list of static prompts available in the copilot pane in a Teams meeting.":::

Meeting Copilot helps your meetings to be better and more productive. You can meetings more interactive, which helps users by giving them a smoother and more interesting experience.

## Step-by-step guide

Follow the [step-by-step guide](../sbs-messagingextension-searchcommand-plugin.yml) to build a bot-based search message extension plugin for M365 Chat.

## See also

* [Build message extensions using API](api-based-overview.md)
* [Define message extension action commands](how-to/action-commands/define-action-command.md)
* [Extend Microsoft Copilot for Microsoft 365](/microsoft-365-copilot/extensibility/)
