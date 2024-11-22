---
title: Assistants API quick start guide
author: surbhigupta
description: In this module, learn how to quickly try the Assistants API with Teams AI library in Math tutor assistant sample using OpenAI Code Interpreter tool.
ms.topic: conceptual
ms.localizationpriority: high
zone_pivot_groups: assistant-ai-library-quick-start
ms.author: v-bvishnu
ms.date: 05/20/2024
---

# Quick start guide for using Assistants API with Teams AI library

Get started using OpenAI or Azure OpenAI Assistants API with Teams AI library in Math tutor assistant sample. This guide uses the OpenAI Code Interpreter tool to help you create an assistant that specializes in mathematics. The bot uses the gpt-3.5-turbo model to chat with Microsoft Teams users and respond in a polite and respectful manner, staying within the scope of the conversation.

## Prerequisites

To get started, ensure that you have the following tools:

| Install | For using... |
| --- | --- |
| [Visual Studio Code](https://code.visualstudio.com/download) | JavaScript, TypeScript, or C Sharp build environments. Use the latest version. |
| [Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) | Microsoft Visual Studio Code extension that creates a project scaffolding for your app. Use the latest version.|
|[Git](https://git-scm.com/downloads)|Git is a version control system that helps you manage different versions of code within a repository. |
| [Node.js](https://nodejs.org/en) | Back-end JavaScript runtime environment. For more information, see [Node.js version compatibility table for project type](~/toolkit/build-environments.md#nodejs-version-compatibility-table-for-project-type).|
| [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | To collaborate with everyone, you work with through apps for chat, meetings, and call-all in one place.|
| [OpenAI](https://openai.com/api/) or [Azure OpenAI](https://oai.azure.com/portal)| First create your OpenAI API key to use OpenAI's GPT. If you want to host your app or access resources in Azure, you must create an Azure OpenAI service.|
| [Microsoft&nbsp;Edge](https://www.microsoft.com/edge) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser with developer tools. |
| [Microsoft 365 developer account](/microsoftteams/platform/concepts/build-and-test/prepare-your-o365-tenant) | Access to Teams account with the appropriate permissions to install an app and [enable custom Teams apps and turn on custom app uploading](../../../concepts/build-and-test/prepare-your-o365-tenant.md#enable-custom-teams-apps-and-turn-on-custom-app-uploading). |

<br/>
If you've already run the samples before or encountered a runtime error, follow these steps to start fresh:

* Check all the `.env` and `env/.env.*.*` files in the sample and delete any automatically populated values to ensure that Teams Toolkit generates new resources for you.
* If you don’t want Teams Toolkit to generate the app ID and password, update the `MicrosoftAppId` and `MicrosoftAppPassword` in the `.env` file with your own values.
* Remove values or leave the values blank for  **SECRET_BOT_PASSWORD** and **TEAMS_APP_UPDATE_TIME** in the `.env` file to avoid conflicts.

Teams Toolkit automatically provisions `MicrosoftAppId` and `MicrosoftAppPassword` resources. If you want to use your own resources, you need to manually add them to the `.env` file. Teams Toolkit doesn't auto-generate the following resources:

* An Azure OpenAI or OpenAI key
* A database or similar storage options

## Build and run the sample app

Get started with Teams AI library using the **Math tutor assistant** sample. It enables your computer’s localhost to quickly execute a Teams AI library-based sample.

1. Go to the [sample](https://github.com/microsoft/teams-ai/tree/main/js/samples).

1. Run the following command to clone the repository:

   ```cmd
   git clone https://github.com/microsoft/teams-ai.git
   ```

1. Go to **Visual Studio Code**.

1. Select **File** > **Open Folder**.

1. Go to the location where you cloned teams-ai repo and select the **teams-ai** folder.

1. Select **Select Folder**.

   :::image type="content" source="../../../assets/images/bots/ai-library-dot-net-select-folder.png" alt-text="Screenshot shows the teams-ai folder and the Select Folder option.":::

1. Select **View** > **Terminal**. A terminal window opens.

1. In the terminal window, run the following command to go to the **js** folder:

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

1. After the dependencies are installed, select **File** > **Open Folder**.

1. Go to **teams-ai > js > samples > 04.ai-apps > d.assistants-mathBot** and select **Select Folder**. All the files for the Math tutor assistant sample are listed under the **EXPLORER** section in Visual Studio Code.

1. Under **EXPLORER**, duplicate the `sample.env` file  and update the duplicate file to `.env`.

1. Update the following steps based on the AI services you select.

   # [OpenAI key](#tab/OpenAI-key)

   1. Go to `env` folder and update the following code in `./env/.env.local.user` file:

      ```text
      SECRET_OPENAI_KEY=<your OpenAI key>
      ASSISTANT_ID=<your Assistant ID>
      ```

   1. Go to the `infra` folder and ensure that the following lines in the `azure.bicep` file are commented out:

      ```bicep
          // {
          //  name: 'AZURE_OPENAI_KEY'
          //  value: azureOpenAIKey
          // }
          // {
          //  name: 'AZURE_OPENAI_ENDPOINT'
          //  value: azureOpenAIEndpoint
          // }
      ```

   # [Azure OpenAI](#tab/Azure-OpenAI)

   1. Go to `env` folder and update the following code in `./env/.env.local.user` file:

   ```text
      SECRET_AZURE_OPENAI_KEY=<your Azure OpenAI key>
      SECRET_AZURE_OPENAI_ENDPOINT=<your Azure OpenAI Endpoint>
   ```

   1. Go to `teamsapp.local.yml` file and modify the last step to use Azure OpenAI variables:

      ```yaml
      - uses: file/createOrUpdateEnvironmentFile
      with:
         target: ./.env
         envs:
         BOT_ID: ${{BOT_ID}}
         BOT_PASSWORD: ${{SECRET_BOT_PASSWORD}}
         #OPENAI_KEY: ${{SECRET_OPENAI_KEY}}
         AZURE_OPENAI_KEY: ${{SECRET_AZURE_OPENAI_KEY}}
         AZURE_OPENAI_ENDPOINT: ${{SECRET_AZURE_OPENAI_ENDPOINT}}
      ```

   1. Go to the `infra` folder and ensure that the following lines in the `azure.bicep` file are commented out:

      ```bicep
          // {
          //   name: 'OPENAI_KEY'
          //   value: openAIKey
          // }
      ```

   1. Go to `infra` > `azure.parameters.json` and replace the lines from [20 to 25](https://github.com/microsoft/teams-ai/blob/main/js/samples/04.ai-apps/d.assistants-mathBot/infra/azure.parameters.json#L20-L25) with the following code:

      ```json
            "azureOpenAIKey": {
            "value": "${{SECRET_AZURE_OPENAI_KEY}}"
            },
            "azureOpenAIEndpoint": {
            "value": "${{SECRET_AZURE_OPENAI_ENDPOINT}}"
            }
      ```

    ---

1. Copy the sample to a new directory that isn't a subdirectory of `teams-ai`.

1. From the left pane, select **Teams Toolkit**.

1. Under **ACCOUNTS**, sign in to the following:

   * **Microsoft 365 account**
   * **Azure account**

1. To debug your app, select the **F5** key.

   A browser tab opens a Teams web client requesting to add the bot to your tenant.

1. Select **Add**.

   :::image type="content" source="../../../assets/images/bots/math-bot-sample-app-add.png" alt-text="Screenshot shows the option to add the app in Teams web client.":::

   A chat window opens.

1. In the message compose area, send a message to invoke the bot.

   :::image type="content" source="../../../assets/images/bots/mathbot-output.png" alt-text="Screenshot shows an example of the mathbot output." lightbox="../../../assets/images/bots/mathbot-output.png":::

> [!NOTE]
> If you're building a bot for the first time, it's recommended to use Teams Toolkit extension for Visual Studio Code to build a bot, see [build your first bot app using JavaScript](../../../sbs-gs-bot.yml).

## Additional tools

You can also use the following tools to run and set up a sample:

1. **Teams Toolkit CLI**: You can use the Teams Toolkit CLI to create and manage Microsoft Teams apps from the command line. For more information, see [Teams Toolkit CLI set up instructions](https://github.com/microsoft/teams-ai/blob/main/getting-started/OTHER/TEAMS-TOOLKIT-CLI.md).

1. **Bot Framework Emulator**: The [Bot Framework Emulator](https://github.com/microsoft/BotFramework-Emulator) is a desktop application that allows you to test and debug your bot locally. You can connect to your bot by entering the bot’s endpoint URL and Microsoft app ID and password. You can then send messages to your bot and see its responses in real-time. For more information, see [Bot Framework Emulator set up instructions](https://github.com/microsoft/teams-ai/blob/main/getting-started/OTHER/BOTFRAMEWORK-EMULATOR.md).

1. **Manual setup**: If you prefer to set up your resources manually, you can do so by following the instructions provided by the respective services. For more information, see [manual set up instructions](https://github.com/microsoft/teams-ai/blob/main/getting-started/OTHER/MANUAL-RESOURCE-SETUP.md).

## Next step

> [!div class="nextstepaction"]
> [Assistants API](teams-conversation-ai-overview.md#how-do-teams-ai-library-features-benefit-me)
