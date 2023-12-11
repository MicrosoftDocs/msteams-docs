---
title: Teams AI library quick start guide
author: surbhigupta
description:  In this module, learn how to quickly try the Teams AI library.
ms.topic: conceptual
ms.localizationpriority: high
zone_pivot_groups: ai-library-quick-start
ms.author: v-ypalikila
ms.date: 12/06/2022
---

# Teams AI library quick start guide

> [!NOTE]
>
> Teams AI library is available only in [public developer preview](~/resources/dev-preview/developer-preview-intro.md).

## Prerequisites

To get started, ensure that you have the following tools:

| Install | For using... |
| --- | --- |
| &nbsp; | &nbsp; |
| [Visual Studio Code](https://code.visualstudio.com/download) or  [Visual Studio](https://visualstudio.microsoft.com/downloads/) | JavaScript, TypeScript, or CSharp build environments. Use the latest version. |
| [Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) | Microsoft Visual Studio Code extension that creates a project scaffolding for your app. Use the latest version.|
|[Git](https://git-scm.com/downloads)|Git is a version control system that helps you manage different versions of code within a repository. |
| [Node.js](https://nodejs.org/en/download/) | Back-end JavaScript runtime environment. For more information, see [Node.js version compatibility table for project type](~/toolkit/build-environments.md#nodejs-version-compatibility-table-for-project-type).|
| [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams to collaborate with everyone you work with through apps for chat, meetings, and call-all in one place.|
| [OpenAI](https://openai.com/api/) or  [Azure OpenAI](https://oai.azure.com/portal)| First create your OpenAI API key to use OpenAI's GPT. If you want to host your app or access resources in Azure, you must create an Azure OpenAI service.|
| [Microsoft&nbsp;Edge](https://www.microsoft.com/edge) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser with developer tools. |
| [Microsoft 365 developer account](/microsoftteams/platform/concepts/build-and-test/prepare-your-o365-tenant) | Access to Teams account with the appropriate permissions to install an app and [Enable custom Teams apps and turn on custom app uploading](../../../concepts/build-and-test/prepare-your-o365-tenant.md#enable-custom-teams-apps-and-turn-on-custom-app-uploading). |

<br/>
If you have run the samples before or encounter a runtime error, follow these steps to start fresh:

* Check all the `.env` and `env/.env.*.*` files in the sample and delete any automatically populated values to ensure that Teams Toolkit generates new resources for you.
* If you don’t want Teams Toolkit to generate the appId and password, update the `MicrosoftAppId` and `MicrosoftAppPassword` in the `.env` file with your own values.
* Remove values or leave the values blank for  **SECRET_BOT_PASSWORD** and **TEAMS_APP_UPDATE_TIME** in the `.env` file to avoid conflicts.

Teams Toolkit automatically provisions`MicrosoftAppId` and `MicrosoftAppPassword` resources. If you want to use your own resources, you need to manually add them to the `.env` file. Teams Toolkit doesn't auto-generate the following:

* An Azure OpenAI or OpenAI key
* A database or similar storage options

::: zone pivot="qs-javascript"

## Build and run the sample app

Get started with Teams AI library using the **ChefBot** sample. It's designed to quickly run a Teams AI library based sample on your computer's localhost.

1. Go to the [sample](https://github.com/microsoft/teams-ai/tree/main/js/samples).

1. Run the following command to clone the repository.

   ```cmd
   git clone https://github.com/microsoft/teams-ai.git
   ```

1. Go to **Visual Studio Code**.

1. Select **File** > **Open Folder**.

1. Go to the location where you've cloned teams-ai repo and select the **teams-ai** folder.

1. Select **Select Folder**.

1. Select **View** > **Terminal**. A terminal window opens.

1. In the terminal window, run the following command to go to the **JS** folder:

   ```
   cd .\js\
   ```

1. Run the following command to install dependencies:

   ```terminal
   yarn install
   ```

1. Run the following command to build dependencies:

   ```terminal
   yarn build
   ```

1. After the dependencies are installed. Select **File** > **Open Folder**.

1. Go to **teams-ai > js > samples> 04.ai.a.teamsChefBot** and select **Select Folder**. All the files for the chef bot sample are listed under the **EXPLORER** section in Visual Studio Code.

1. Under **EXPLORER**, duplicate the `sample.env` file  and update the duplicate file to `.env`.

1. In the sample folder, update the following code in the `.env` configuration file:

   ```text
   OPENAI_KEY=<your OpenAI key>

   ```

1. From the left pane, select **Teams Toolkit**.

1. Under **ACCOUNTS**, sign in to the following:

   * **Microsoft 365 account**
   * **Azure account**

1. To debug your app, select the **F5** key.

   A browser tab opens a Teams web client requesting to add the bot to your tenant.

1. Select **Add**.

   :::image type="content" source="../../../assets/images/bots/Conversation-AI-sample-app-add.png" alt-text="Screenshot shows the option to add the app in Teams web client.":::

   A chat window opens.

1. In the message compose area, send a message to invoke the bot.

   :::image type="content" source="../../../assets/images/bots/conversation-AI-quick-start-final.png" alt-text="Screenshot shows an example of conversation with Teams chef bot in Teams.":::

The bot uses the GPT turbo 3.5 model to chat with Teams users and respond in a polite and respectful manner, staying within the scope of the conversation.

> [!NOTE]
> If you're building a bot for the first time, it's recommended to use Teams Toolkit extension for Visual Studio code to build a bot, see [Build your first bot app using JavaScript](../../../sbs-gs-bot.yml).

::: zone-end

::: zone pivot="qs-csharp"

## Build and run the sample app

1. Go to the [sample](https://github.com/microsoft/teams-ai/tree/main/js/samples).

1. Clone the repository to test the sample app.

   ```
   git clone https://github.com/microsoft/teams-ai.git
   ```

1. Go to the **dotnet** folder.

   ```
   cd teams-ai/dotnet
   ```

1. Go to the folder where you've cloned the repository and select **04.ai.a.teamsChefBot**.
1. Select **TeamsChefBot.sln**. The solution opens in Visual Studio.

1. Select the following AI service you want to use:

   # [Azure OpenAI](#tab/azure-open-ai2)

   1. In Visual Studio, update your Azure OpenAI related settings in the `appsettings.Development.json` file.

      ```json
      "Azure": {
      "OpenAIApiKey": "<your-azure-openai-api-key>",
      "OpenAIEndpoint": "<your-azure-openai-endpoint>",
      "ContentSafetyApiKey": "<your-azure-content-safety-api-key>",
      "ContentSafetyEndpoint": "<your-azure-content-safety-endpoint>"
      }
      ```

   # [Open AI](#tab/open-ai2)

   1. In Visual Studio, update your OpenAI related settings in the `appsettings.Development.json` file.

      ```json
      "OpenAI": {
      "ApiKey": "<your-openai-api-key>"
      },
      ```

   ---

1. In the debug dropdown menu, select **Dev Tunnels** > **Create a Tunnel..**.

   :::image type="content" source="../../../assets/images/bots/dotnet-ai-library-dev-tunnel.png" alt-text="Screenshot shows an example of the Dev Tunnel and Create a Tunnel options in Visual Studio.":::

1. Select the Account to use to create the tunnel. Azure, Microsoft Account (MSA), and GitHub are the account types that are supported. Update the following:
   1. **Name**: Enter a name for the tunnel.
   1. **Tunnel Type**: Select **Persistent** or **Temporary**.
   1. **Access**: Select **Public**.
   1. Select **OK**. Visual Studio displays a confirmation message that a tunnel is created.

    The tunnel you've created is listed under **Dev Tunnels > (name of the tunnel)**.

1. Go to **Solution Explorer** and select your project.
1. Right-click the menu and select **Teams Toolkit** > **Prepare Teams App Dependencies**.

   :::image type="content" source="../../../assets/images/bots/dotnet-ai-library-prepare-teams-app.png" alt-text="Screenshot shows an example of the prepare teams app dependencies option under Teams Toolkit section in Visual Studio.":::

   If prompted, sign in to your Microsoft 365 account. You'll receive a message that Teams app is successfully prepared.

1. Select **OK**.

1. Select **F5** or select **Debug** > **Start**.
1. Select **Add**. The app is added to Teams and a chat window opens.

   :::image type="content" source="../../../assets/images/bots/dotnet-ai-library-add-app.png" alt-text="Screenshot shows the add option to add the app to Micrososft Teams.":::

1. In the message compose area, send a message to invoke the bot.

   :::image type="content" source="../../../assets/images/bots/dotnet-ai-library-invoke-chef-bot.png" alt-text="Screenshot shows an example of a chat window and a message from the chef bot as a reply to users message.":::

You can also deploy the samples to Azure using Teams Toolkit. To deploy, follow these steps:

1. In Visual Studio, go to **Solution Explorer** and select your project.
1. Right-click the menu and select **Teams Toolkit** > **Provision in the Cloud**. Toolkit provisions your sample to Azure.
1. Right-click the menu and select **Teams Toolkit** > **Deploy to the Cloud**.

::: zone-end

## Additional tools

You can also use the following tools to run and set up a sample:

1. **Teams Toolkit CLI**: You can use the Teams Toolkit CLI to create and manage Microsoft Teams apps from the command line. For more information, see [Teams Toolkit CLI set up instructions](https://github.com/microsoft/teams-ai/blob/main/getting-started/OTHER/TEAMS-TOOLKIT-CLI.md).

1. **Bot Framework Emulator**: The [Bot Framework Emulator](https://github.com/microsoft/BotFramework-Emulator) is a desktop application that allows you to test and debug your bot locally. Y you can connect to your bot by entering the bot’s endpoint URL and Microsoft App ID and password. You can then send messages to your bot and see its responses in real-time. For more information, see [Bot Framework Emulator set up instructions](https://github.com/microsoft/teams-ai/blob/main/getting-started/OTHER/BOTFRAMEWORK-EMULATOR.md).

1. **Manual setup**: If you prefer to set up your resources manually, you can do so by following the instructions provided by the respective services. For more information, see [Manual set up instructions](https://github.com/microsoft/teams-ai/blob/main/getting-started/OTHER/MANUAL-RESOURCE-SETUP.md).

## Next step

> [!div class="nextstepaction"]
> [Build your first bot using Teams AI library](../../../sbs-botbuilder-conversation-AI.yml)
