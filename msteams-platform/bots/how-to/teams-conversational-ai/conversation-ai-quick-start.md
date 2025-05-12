---
title: Teams AI Library - Lightbot Sample
author: surbhigupta
description: In this module, learn how to quickly try Teams AI library using the LightBot sample, which creates apps that control lights.
ms.topic: conceptual
ms.localizationpriority: high
zone_pivot_groups: ai-library-quick-start
ms.author: surbhigupta
ms.owner: angovil
ms.date: 12/11/2024
---

# Teams AI library quick start guide

This guide helps you get started with the Teams AI library using the LightBot sample. This sample demonstrates how to create apps that control lights, such as turning them on and off, while using the gpt-3.5-turbo model to interact politely with Microsoft Teams users within the conversation scope.

::: zone pivot="qs-javascript"

## Prerequisites

Ensure that you have the following tools installed and configured:

| Install | For using... |
| --- | --- |
| [Visual Studio Code](https://code.visualstudio.com/download) | JavaScript, TypeScript, and Python build environments. Use the latest version. |
| [Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) | Microsoft Visual Studio Code extension that creates project scaffolding for your app. Use the latest version.|
| [Git](https://git-scm.com/downloads) | Version control system to manage different versions of code within a repository. |
| [Node.js](https://nodejs.org/en) | Back-end JavaScript runtime environment. For more information, refer to the "Node.js version compatibility table for project type" in the Teams Toolkit documentation. |
| [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Platform to collaborate using apps for chat, meetings, and calls. |
| [OpenAI](https://openai.com/api/) or [Azure OpenAI](https://oai.azure.com/portal) | Create your OpenAI API key to use OpenAI's GPT. If you need to host your app or access resources in Azure, create an Azure OpenAI service. |
| [Microsoft&nbsp;Edge](https://www.microsoft.com/edge/) (recommended) or [Google Chrome](https://www.google.com/chrome/) | Browser with developer tools. |
| [Microsoft 365 developer account](/microsoftteams/platform/concepts/build-and-test/prepare-your-o365-tenant) | Access to Teams account with permissions to install an app and enable custom Teams apps and custom app uploading. |

<br/>
If you have run the samples before or encounter a runtime error, take these actions to ensure a fresh setup:

* Check all the `.env` and `env/.env.*.*` files in the sample and delete any automatically populated values. This action ensures that Teams Toolkit generates new resources.
* If you prefer not to let Teams Toolkit generate the app ID and password, update the `BOT_ID` and `BOT_PASSWORD` in the `.env` file with your custom values.
* Remove any values or leave blank the **SECRET_BOT_PASSWORD** and **TEAMS_APP_UPDATE_TIME** entries in the `.env` file to avoid conflicts.

Note that Teams Toolkit automatically provisions `BOT_ID` and `BOT_PASSWORD` resources. When you use your own resources, manually add them into the `.env` file. Teams Toolkit does not auto-generate the following resources:

* An Azure OpenAI or OpenAI key
* A database or similar storage options

## Build and run the sample app

This section guides you through building and running the LightBot sample app, which runs on your computer’s localhost using the Teams AI library.

1. Navigate to the [sample](https://github.com/microsoft/teams-ai/tree/main/js/samples).

2. Run the following command to clone the repository:

   ```cmd
   git clone https://github.com/microsoft/teams-ai.git
   ```

3. Open Visual Studio Code.

4. Choose File > Open Folder.

5. Navigate to the location where you cloned the teams-ai repository and select the teams-ai folder.

6. Click Select Folder.

   :::image type="content" source="../../../assets/images/bots/ai-library-dot-net-select-folder.png" alt-text="Screenshot shows the teams-ai folder and the Select Folder option." :::

7. Choose View > Terminal to open a terminal window.

8. In the terminal window, run this command to change to the js folder:

   ```terminal
   cd .\js\
   ```

9. Run the following command to install the dependencies:

   ```terminal
   yarn install
   ```

10. Run this command to build the project:

    ```terminal
    yarn build
    ```

11. After installing dependencies, choose File > Open Folder.

12. Navigate to teams-ai > js > samples > 03.ai-concepts > c.actionMapping-lightBot and select Select Folder. All files for the LightBot sample display under the EXPLORER section in Visual Studio Code.

13. Update the following settings based on your selected AI service:

    # [OpenAI key](#tab/OpenAI-key)

    1. Open the `env` folder and update the code in the `./env/.env.local.user` file:

       ```text
       SECRET_OPENAI_KEY=<your OpenAI key>
       ```

    2. Open the `infra` folder and comment out these lines in the `azure.bicep` file:

       ```bicep
       // {
       //   name: 'AZURE_OPENAI_KEY'
       //   value: azureOpenAIKey
       // }
       // {
       //   name: 'AZURE_OPENAI_ENDPOINT'
       //   value: azureOpenAIEndpoint
       // }
       ```

    # [Azure OpenAI](#tab/Azure-OpenAI)

    1. Open the `env` folder and update the code in the `./env/.env.local.user` file:

       ```text
       SECRET_AZURE_OPENAI_KEY=<your Azure OpenAI key>
       SECRET_AZURE_OPENAI_ENDPOINT=<your Azure OpenAI Endpoint>
       ```

    2. Open the `teamsapp.local.yml` file and modify the last step to use Azure OpenAI variables:

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

    3. Open the `infra` folder and comment out these lines in the `azure.bicep` file:

       ```bicep
       // {
       //   name: 'OPENAI_KEY'
       //   value: openAIKey
       // }
       ```

    4. Open `infra > azure.parameters.json` and replace the lines from [20 to 22](https://github.com/microsoft/teams-ai/blob/main/js/samples/03.ai-concepts/c.actionMapping-lightBot/infra/azure.parameters.json#L20-L22) with this code:

       ```json
       "azureOpenAIKey": {
         "value": "${{SECRET_AZURE_OPENAI_KEY}}"
       },
       "azureOpenAIEndpoint": {
         "value": "${{SECRET_AZURE_OPENAI_ENDPOINT}}"
       }
       ```

14. In Visual Studio Code, select Teams Toolkit from the left pane.

15. Under ACCOUNTS, sign in using the following accounts:

    * Microsoft 365 account
    * Azure account

16. Press F5 to debug your app.

    A browser tab opens the Teams web client to add the bot to your tenant.

17. Click Add.

    :::image type="content" source="../../../assets/images/bots/lightbot-add.png" alt-text="Screenshot of the app details dialog to add the LightBot app." :::

    When the app adds, a dialog displays to select the required scope.

18. Choose Open to launch the app in personal scope. Alternatively, search for and select the required scope or choose a channel, chat, or meeting; then, follow the dialog prompts and choose Go.

    :::image type="content" source="../../../assets/images/bots/bot-add-scope.png" alt-text="Screenshot of the scope selection dialog with the list of shared scopes." :::

19. In the chat window that appears, send a message to invoke the bot.

    :::image type="content" source="../../../assets/images/bots/lightbot-output.png" alt-text="Screenshot shows an example of the LightBot output." lightbox="../../../assets/images/bots/lightbot-output.png" :::

> [!NOTE]
> When building a bot for the first time, use the Teams Toolkit extension for Visual Studio Code. For additional assistance, refer to the "build your first bot app using JavaScript" guide in the documentation.

::: zone-end

::: zone pivot="qs-csharp"

## Prerequisites

Ensure that you install and configure the following tools:

| Install | For using... |
| --- | --- |
| [Visual Studio](https://visualstudio.microsoft.com/downloads/) | C# build environments. Use the latest version. |
| [Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) | Extension that creates project scaffolding for your app. Use the latest version. |
| [Git](https://git-scm.com/downloads) | Version control system to manage code changes. |
| [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Platform to collaborate through chats, meetings, and calls. |
| [OpenAI](https://openai.com/api/) or [Azure OpenAI](https://oai.azure.com/portal) | Create your OpenAI API key for GPT use. If you host your app in Azure, create an Azure OpenAI service. |
| [Microsoft&nbsp;Edge](https://www.microsoft.com/edge/) (recommended) or [Google Chrome](https://www.google.com/chrome/) | Browser with developer tools for debugging. |
| [Microsoft 365 developer account](/microsoftteams/platform/concepts/build-and-test/prepare-your-o365-tenant) | Permission to install apps and enable custom Teams apps and uploading in your Teams account. |

<br/>
If you have executed the samples previously or experience a runtime error, perform these steps to start fresh:

* Check all the `.env` and `env/.env.*.*` files in the sample and remove any automatically populated values to force Teams Toolkit to generate new resources.
* If you choose not to allow Teams Toolkit to generate the app ID and password, update the `MicrosoftAppId` and `MicrosoftAppPassword` in the `.env` file with your chosen values.
* Remove or leave blank the **SECRET_BOT_PASSWORD** and **TEAMS_APP_UPDATE_TIME** values in the `.env` file to avoid conflicts.

Teams Toolkit automatically provisions `MicrosoftAppId` and `MicrosoftAppPassword` resources. Use your own resources by manually adding them in the `.env` file. Note that the following resources are not automatically generated by Teams Toolkit:

* An Azure OpenAI or OpenAI key
* A database or similar storage options

## Build and run the sample app

1. Navigate to the [sample](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples).

2. Clone the repository using this command:

   ```cmd
   git clone https://github.com/microsoft/teams-ai.git
   ```

3. Change directory to the dotnet folder:

   ```cmd
   cd teams-ai/dotnet
   ```

4. In your file explorer, navigate to the folder where you cloned the repository and open the folder named 04.ai.c.actionMapping.lightBot.

5. Open the solution file LightBot.sln in Visual Studio.

6. In Visual Studio, update the OpenAI-related settings in the appsettings.Development.json file with your credentials:

   ```json
   "Azure": {
     "OpenAIApiKey": "<your-azure-openai-api-key>",
     "OpenAIEndpoint": "<your-azure-openai-endpoint>"
   }
   ```

7. Open Prompts/sequence/skprompt.txt and update its contents as follows:

    ```skprompt.txt
    The following is a conversation with an AI assistant. 
    The assistant can turn a light on or off.
    The assistant must return the following JSON structure:
    
    {"type":"plan","commands":[{"type":"DO","action":"<name>","entities":{"<name>":<value>}},{"type":"SAY","response":"<response>"}]}
    
    The following actions are supported:
    
    - LightsOn
    - LightsOff
    - Pause time=<duration in ms>
    - LightStatus
    
    The lights are currently {{getLightStatus}}.
    
    Always respond in the form of a JSON based plan. Stick with DO/SAY.
    ```

8. In the debug dropdown menu, choose Dev Tunnels and then Create a Tunnel.

   :::image type="content" source="../../../assets/images/bots/dotnet-ai-library-dev-tunnel.png" alt-text="Screenshot shows an example of the Dev Tunnel and Create a Tunnel option in Visual Studio." :::

9. Select the Account to use for creating the tunnel. Azure, Microsoft Account (MSA), and GitHub accounts are supported. Update the following tunnel options:
   - Name: Enter a name for the tunnel.
   - Tunnel Type: Choose either Persistent or Temporary.
   - Access: Choose Public.
   - Confirm by selecting OK. Visual Studio displays a confirmation message upon tunnel creation.

10. In Solution Explorer, select your project.

11. Right-click and choose Teams Toolkit > Prepare Teams App Dependencies.

    :::image type="content" source="../../../assets/images/bots/dotnet-ai-library-prepare-teams.png" alt-text="Screenshot shows the Prepared Teams app Dependencies option under Teams Toolkit in Visual Studio." :::

    If prompted, sign in to your Microsoft 365 account. A confirmation message appears indicating that Teams app dependencies prepare successfully.

12. Choose OK to confirm.

13. Press F5 or select Debug > Start to debug your project.

14. Click Add to add the bot to your tenant.

    :::image type="content" source="../../../assets/images/bots/lightbot-add.png" alt-text="Screenshot of the app details dialog to add the LightBot app." :::

    A dialog presents to select the required scope.

15. Choose Open to launch the app in personal scope. Alternatively, search for and select the required scope or choose a channel, chat, or meeting, then follow the prompts to select Go.

    :::image type="content" source="../../../assets/images/bots/bot-add-scope.png" alt-text="Screenshot of the scope selection dialog with the list of shared scopes." :::

16. In the chat window, send a message to invoke the bot.

    :::image type="content" source="../../../assets/images/bots/lightbot-output.png" alt-text="Screenshot shows an example of the LightBot output." :::

You can also deploy the sample to Azure using Teams Toolkit. To complete deployment:

1. In Visual Studio, open Solution Explorer and select your project.
2. Right-click and choose Teams Toolkit > Provision in the Cloud. Teams Toolkit provisions your sample in Azure.
3. Then, right-click and choose Teams Toolkit > Deploy to the Cloud.

::: zone-end

::: zone pivot="qs-python"

## Prerequisites

Ensure that the following tools are installed and configured:

| Install | For using... |
| --- | --- |
| [Visual Studio Code](https://code.visualstudio.com/download) | JavaScript, TypeScript, and Python build environments. Use the latest version. |
| [Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) | Extension that creates project scaffolding for your app. Use the latest version. |
| [Python](https://www.python.org/) | Interpreted and object-oriented programming language. Use versions between 3.8 and 4.0. |
| [Poetry](https://python-poetry.org/docs/#installing-with-pipx) | Dependency management and packaging tool for Python. |
| [Python VSCode Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python) | Provides rich support for Python development in VSCode. |
| [Git](https://git-scm.com/downloads) | Version control system to manage code versions. |
| [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Platform to collaborate through chats, meetings, and calls. |
| [OpenAI](https://openai.com/api/) or [Azure OpenAI](https://oai.azure.com/portal) | Create your OpenAI API key for GPT. For Azure hosting, create an Azure OpenAI service. |
| [Microsoft&nbsp;Edge](https://www.microsoft.com/edge/) (recommended) or [Google Chrome](https://www.google.com/chrome/) | Browser with developer tools for debugging purposes. |
| [Microsoft 365 developer account](/microsoftteams/platform/concepts/build-and-test/prepare-your-o365-tenant) | Permission to install apps in Teams and enable custom Teams app uploading. |

<br/>
If you have executed the samples before or experience a runtime error, perform these steps to ensure a fresh environment:

* Inspect all `.env` and `env/.env.*.*` files in the sample and remove any auto-populated values so that Teams Toolkit generates new resources.
* If you prefer not to let Teams Toolkit generate the app ID and password, update the `BOT_ID` and `BOT_PASSWORD` in the `.env` file with your custom values.
* Remove or leave blank the **SECRET_BOT_PASSWORD** and **TEAMS_APP_UPDATE_TIME** in the `.env` file to avoid conflicts.

Teams Toolkit automatically provisions `BOT_ID` and `BOT_PASSWORD` resources. If you use your own resources, manually add them into the `.env` file. Note that Teams Toolkit does not auto-generate the following resources:

* An Azure OpenAI or OpenAI key
* A database or similar storage options

## Build and run the sample app

1. Navigate to the [sample](https://github.com/microsoft/teams-ai/tree/main/python/samples).

2. Clone the repository using this command:

   ```cmd
   git clone https://github.com/microsoft/teams-ai.git
   ```

3. Change directory to the python folder:

   ```cmd
   cd teams-ai/python
   ```

4. In your file explorer, open the folder named 04.ai.c.actionMapping.lightBot. All files for the LightBot sample appear under the EXPLORER section in Visual Studio Code.

5. Within EXPLORER, duplicate the file named sample.env and rename the duplicate to .env.

   # [OpenAI key](#tab/OpenAI-key2)

   Open the `env` folder and update the following code in the `./env/.env.local.user` file:

   ```text
   SECRET_OPENAI_KEY=<your OpenAI key>
   ```

   # [Azure OpenAI](#tab/Azure-OpenAI2)

   Open the `env` folder and update the following code in the `./env/.env.local.user` file:

   ```text
   SECRET_AZURE_OPENAI_KEY=<your Azure OpenAI key>
   SECRET_AZURE_OPENAI_ENDPOINT=<your Azure OpenAI Endpoint>
   ```

   ---

6. Install the required dependencies. Open the Terminal from View > Terminal and run these commands:

   | Dependencies      | Command                           |
   | ----------------- | --------------------------------- |
   | python-dotenv     | pip install python-dotenv         |
   | load-dotenv       | pip install load-dotenv           |
   | teams-ai          | pip install teams-ai              |
   | botbuilder-core   | pip install botbuilder-core       |

7. Update config.json and bot.py with your model deployment name.

8. Open the Command Palette using View > Command Palette... or press Ctrl+Shift+P.

9. Initiate Python: Create Environment to set up a virtual environment.

10. Press F5 to debug your app.

    A browser tab launches the Teams web client to add the bot to your tenant.

11. Click Add.

    :::image type="content" source="../../../assets/images/bots/lightbot-add.png" alt-text="Screenshot of the app details dialog to add the LightBot app." :::

    When the app adds, a dialog displays to select the required scope.

12. Choose Open to launch the app in personal scope. Alternatively, search for and select the required scope or choose a channel, chat, or meeting; then, follow the prompts to select Go.

    :::image type="content" source="../../../assets/images/bots/bot-add-scope.png" alt-text="Screenshot of the scope selection dialog with the list of shared scopes." :::

13. In the chat window, send a message to invoke the bot.

    :::image type="content" source="../../../assets/images/bots/lightbot-output.png" alt-text="Screenshot shows an example of the LightBot output." :::

::: zone-end

## Additional tools

This section describes additional tools you can use to run and set up a sample:

1. **Teams Toolkit CLI**: Use the Teams Toolkit CLI to create and manage Teams apps from the command line. For more information, refer to the "Teams Toolkit CLI set up instructions" provided in the documentation.
2. **Bot Framework Emulator**: Use the [Bot Framework Emulator](https://github.com/microsoft/BotFramework-Emulator) to test and debug your bot locally. Connect to your bot by entering the bot’s endpoint URL along with the Microsoft app ID and password. This tool allows you to send messages to your bot and observe responses in real time. Consult the "Bot Framework Emulator set up instructions" for further details.
3. **Manual setup**: If you prefer setting up resources manually, follow the instructions provided by each respective service. Refer to the "manual set up instructions" in the documentation for guidance.

## Next step

Choose one of the following actions to continue your learning journey:

> [!div class="nextstepaction"]
> To learn how to create an AI-powered bot using Teams AI library, select:  
> [Build with Teams AI library](how-conversation-ai-get-started.md)
>
> [!div class="nextstepaction"]
> To build a custom engine agent using Teams Toolkit, select:  
> [Build a custom engine agent](../../../Teams-AI-library-tutorial.yml)