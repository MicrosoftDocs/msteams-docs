---
title: Teams AI library quick start guide
author: surbhigupta
description:  In this module, learn how to quickly try the Teams AI library.
ms.topic: conceptual
ms.localizationpriority: high
zone_pivot_groups: ai-library-quick-start
ms.author: v-ypalikila
ms.date: 04/07/2022
---

# Teams AI library quick start guide

> [!NOTE]
>
> Teams AI library is available only in [public developer preview](~/resources/dev-preview/developer-preview-intro.md).

Get started with Teams AI library using the **ChefBot** sample. It's designed to quickly run a Teams AI library based sample on your computer's localhost.



## Prerequisites

To get started, ensure that you have the following tools:

| Install | For using... |
| --- | --- |
| &nbsp; | &nbsp; |
| [Visual Studio Code](https://code.visualstudio.com/download) or  [Visual Studio](https://visualstudio.microsoft.com/downloads/) | JavaScript, TypeScript, or CSharp build environments. Use the latest version. |
| [Teams Toolkit](#install-teams-toolkit) | Microsoft Visual Studio Code extension that creates a project scaffolding for your app. Use the latest version.|
| [Node.js](https://nodejs.org/en/download/) | Back-end JavaScript runtime environment. For more information, see [Node.js version compatibility table for project type](~/toolkit/build-environments.md#nodejs-version-compatibility-table-for-project-type).|
| [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams to collaborate with everyone you work with through apps for chat, meetings, and call-all in one place.|
| [OpenAI](https://openai.com/api/) or  [Azure OpenAI](https://oai.azure.com/portal)| First create your OpenAI API key to use OpenAI's GPT. If you want to host your app or access resources in Azure, you must have create an Azure OpenAI service.|
| [Microsoft&nbsp;Edge](https://www.microsoft.com/edge) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser with developer tools. |
| [Microsoft 365 developer account](/microsoftteams/platform/concepts/build-and-test/prepare-your-o365-tenant) | Access to Teams account with the appropriate permissions to install an app and [Enable custom Teams apps and turn on custom app uploading](../../../concepts/build-and-test/prepare-your-o365-tenant.md#enable-custom-teams-apps-and-turn-on-custom-app-uploading). |

<br/>
If you have run the samples before or encounter a runtime error, follow these steps to start fresh:

* Check all the `.env` and `env/.env.*.*` files in the sample and delete any automatically populated values to ensure that Teams Toolkit generates new resources for you.
* If you don’t want Teams Toolkit to generate the appId and password, update the `MicrosoftAppId` and `MicrosoftAppPassword` in the `.env` file with your own values.
* Remove values or leave the values blank for  **SECRET_BOT_PASSWORD** and **TEAMS_APP_UPDATE_TIME** in the `.env` file to avoid conflicts.

Teams Toolkit automatically provisions`MicrosoftAppId` and `MicrosoftAppPassword` resources. If you want to use your own resources, you need to manually add them to the `.env` file. Teams Toolkit does not auto-generate the following:

* An Azure OpenAI or OpenAI key
* A database or similar storage options

::: zone pivot="qs-javascript"

## Build and run the sample app

1. Go to the [sample](https://github.com/microsoft/teams-ai/tree/main/js/samples).

1. Run the following command to clone the repository.

   ```
   git clone https://github.com/microsoft/teams-ai.git
   ```

1. Go to the **JS** folder.

1. Select a sample from the cloned repo that you want to test and go to the sample folder.

1. Select the following AI service you want to use:

   # [Azure OpenAI](#tab/azure-open-ai)

   1. In the sample folder, update the following in the `.env.local.user` configuration file:

       ```text
        SECRET_AZURE_OPENAI_KEY=<your Azure OpenAI key>
        SECRET_AZURE_OPENAI_ENDPOINT=<your Azure OpenAI endpoint>
       ```

      > [!NOTE]
      > If you’re cloning a [sample](https://github.com/microsoft/teams-ai/tree/main/js/samples) through Teams Toolkit, you’ll find the `.env.local.user` file in the setup that is created automatically. If the file isn't available, create the .env.local.user file and update the OpenAI key to get started.

   1. Update the following code in the `teamsapp.local.yml` file:

       ```yml
        AZURE_OPENAI_KEY: ${{SECRET_AZURE_OPENAI_KEY}}
        AZURE_OPENAI_ENDPOINT: ${{SECRET_AZURE_OPENAI_ENDPOINT}}
       ```

   1. Go to the `index.ts` file and comment the following lines under **// OpenAI Support**:

      ```typescript
      apiKey: process.env.OPENAI_KEY!,
      defaultModel: 'text-ada-001',
      ```

   1. Update Update the value for `azureDefaultDeployment` with the model you've deployed.

      ```typescript
      azureDefaultDeployment: 'gpt-35-turbo',
      ```

   # [Open AI](#tab/open-ai)

   1. In the sample folder, update the following in the `.env.local.user` configuration file:

       ```text
        SECRET_OPENAI_API_KEY=<your OpenAI key>
       ```

      > [!NOTE]
      > If you’re cloning a [sample](https://github.com/microsoft/teams-ai/tree/main/js/samples) through Teams Toolkit, you’ll find the `.env.local.user` file in the setup that is created automatically. If the file isn't available, create the .env.local.user file and update the OpenAI key to get started.

   1. Update the following code in the `teamsapp.local.yml` file:

       ```yml
        OPENAI_API_KEY: ${{SECRET_OPENAI_API_KEY}}
       ```

   1. Go to the `index.ts` file and comment the following lines under **// Azure OpenAI Support**:

      ```typescript
      azureApiKey: process.env.AZURE_OPENAI_KEY!,
      azureDefaultDeployment: 'text-ada-001',
      azureEndpoint: process.env.AZURE_OPENAI_ENDPOINT!,
      azureApiVersion: '2023-03-15-preview',
      ```

   1. Update the value for `defaultModel` with the model you've deployed.

      ```typescript
      defaultModel: 'gpt-35-turbo',
      ```

      ---

1. Go to **Visual Studio Code**.

1. Select **Open a folder**, browse to the folder where sample is available and then select **Select folder**.

1. From the left pane, select **Teams Toolkit**.

1. Under **ACCOUNTS**, sign in to the following:
   * **Microsoft 365 account**
   * **Azure account**

1. To debug your app, enter **F5**.

   A browser tab opens a Teams web client requesting to add the bot to your tenant.

   1. If you get an error, which says **Could not find a declaration file for module 'jsonwebtoken'**, run the following in the **TERMINAL**:

      ```
      yarn add @types/jsonwebtoken
      ```

1. Select **Add**.

   :::image type="content" source="../../../assets/images/bots/Conversation-AI-sample-app-add.png" alt-text="Screenshot shows the option to add the app in Teams web client.":::

   A chat window opens.

1. In the message compose area, @mention your bot to invoke the bot.

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
   cd teams-ai/dotnet/samples
   ```

1. Go to the folder where you've cloned the repository and select **04.ai.a.teamsChefBot**.
1. Select **TeamsChefBot.sln**. The solution opens in Visual Studio.
1. In Visual Studio, update the following code in the `appsettings.Development.json` file:

   ```json
   "Azure": {
    "OpenAIApiKey": "<your-azure-openai-api-key>",
    "OpenAIEndpoint": "<your-azure-openai-endpoint>",
    "ContentSafetyApiKey": "<your-azure-content-safety-api-key>",
    "ContentSafetyEndpoint": "<your-azure-content-safety-endpoint>"
   }
   ```

1. In the debug dropdown menu, select **Dev Tunnels** > **Create A Tunnel**.
1. Select the Account to use to create the tunnel. Azure, Microsoft Account (MSA), and GitHub are the account types that are supported. Update the following:
   1. Name: Enter a name for the tunnel.
   1. Tunnel Type: Select Persistent or Temporary.
   1. Access: Select Public.
   1. Select **OK**. Visual Studio displays a confirmation message that a tunnel is created.

    The tunnel you've created is listed under **Dev Tunnels > (name of the tunnel)**.

1. Go to **Solution Explorer** and select your project.
1. Right-click the menu and select **Teams Toolkit** > **Prepare Teams App Dependencies**.

   If prompted, sign in with a Microsoft 365 account.

1. Select **F5** or select **Debug** > **Start**.
1. Select **Add**. The message extension is added to Teams.

You can also deploy the samples to Azure using Teams Toolkit. To deploy, follow these steps:

1. In Visual Studio, go to **Solution Explorer** and select your project.
1. Right-click the menu and select **Teams Toolkit** > **Provision in the Cloud**. Toolkit provisions your sample to Azure.
1. Right-click the menu and select **Teams Toolkit** > **Deploy to the Cloud**.

::: zone-end

You can also use the following tools to run and setup a sample:

1. Teams Toolkit CLI: You can use the Teams Toolkit CLI to create and manage Microsoft Teams apps from the command line. To get started, you’ll need to install the Teams Toolkit CLI by running npm install -g @microsoft/teamsfx-cli. For more information, see [Teams Toolkit CLI set up instructions](https://github.com/microsoft/teams-ai/blob/main/getting-started/OTHER/TEAMS-TOOLKIT-CLI.md)

1. Bot Framework Emulator: The Bot Framework Emulator is a desktop application that allows you to test and debug your bot locally. To use the emulator, you’ll need to download and install it from [Bot Framework Emulator](https://github.com/microsoft/BotFramework-Emulator). Once installed, you can connect to your bot by entering the bot’s endpoint URL and Microsoft App ID and password. You can then send messages to your bot and see its responses in real-time. For more information, see [Bot Framework Emulator set up instructions](https://github.com/microsoft/teams-ai/blob/main/getting-started/OTHER/BOTFRAMEWORK-EMULATOR.md)

1. Manual resource setup: If you prefer to set up your resources manually, you can do so by following the instructions provided by the respective services. For more information, see [Manual set up instructions](https://github.com/microsoft/teams-ai/blob/main/getting-started/OTHER/MANUAL-RESOURCE-SETUP.md)


## Next step

> [!div class="nextstepaction"]
> [Build your first bot using Teams AI library](../../../sbs-botbuilder-conversation-AI.yml)
