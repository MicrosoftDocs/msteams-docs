---
title: Debug bot using Agents Playground
author: surbhigupta 
description: Learn about Microsoft 365 Agents Playground in Microsoft 365 Agents Toolkit and debug existing app, advantages, activity triggers, and customize Teams context.
ms.localizationpriority: high
ms.topic: overview
ms.date: 11/16/2023
---

# Microsoft 365 Agents Playground

> [!NOTE]
>
> Microsoft 365 Agents Playground (previously known as Teams App Test Tool) is available in the latest prerelease version of Microsoft 365 Agents Toolkit (previously known as Teams Toolkit). Ensure that you install the [latest prerelease version](install-Teams-Toolkit.md#install-a-prerelease-version) of Agents Toolkit.
>
> This is not supported for declarative agents.

Agents Playground makes debugging bot or agent-based apps effortless. You can chat with your bot and see its messages and Adaptive Cards as they appear in different channels. You don’t need a Microsoft 365 developer account, tunneling, or real client app and application registration to use Agents Playground.

The following image shows a sample app displaying an Adaptive Card with a list of commands in Agents Playground. It also provides a description of the commands so that you can test your app without manually searching your code:

   :::image type="content" source="../assets/images/toolkit-v2/debug/sample-app-output.png" alt-text="Screenshot shows Agents Playground Adaptive Card.":::

The following are the advantages of Agents Playground:

* **Sandbox environment**: The sandbox environment of Agents Playground emulates the behavior, look, and user experience of the real one.

* **Tunneling**: An external tunnel service isn't necessary as Agents Playground runs on a local server that your bot can communicate with.

* **Reduce account dependencies**: Microsoft 365 Developer tenant and the app uploading permissions aren't necessary to debug the application.

* **Rapid inner-loop iterations**: Optimizes the process of making changes to the app design and application logic without having to redeploy the application to the cloud.

* **Mock data and activities**: Agents Playground makes it easy to test complex scenarios such as, sending a welcome message when a new member joins the channel, using mock data and activity triggers.

* **Reliable**: Agents Playground is reliable as the application's Adaptive Card utilizes the same rendering technology as in Teams or WebChat.

* **Integration with existing applications**:  Agents Playground integrates effortlessly with existing applications built with Agent SDK or Teams SDK.

* **Support for different scopes**: Agents Playground supports testing in personal, team, and group chat scopes.

## Prerequisites

Ensure you install the following tools for building and deploying your applications in Agents Playground:

| &nbsp; | Install | For using... |
| --- | --- | --- |
| &nbsp; | [Agents Toolkit](install-Teams-Toolkit.md) | A Microsoft Visual Studio Code extension that creates a project scaffolding for your app. Use the latest prerelease version. |
| &nbsp; | [Node.js](https://nodejs.org/en/download/) | Back-end JavaScript runtime environment. For more information, see [Node.js version compatibility table for project type](~/toolkit/build-environments.md#nodejs-version-compatibility-table-for-project-type). |
| &nbsp; | [Visual Studio Code](https://code.visualstudio.com/download) | JavaScript, TypeScript, or SharePoint Framework (SPFx) build environments. Use the latest version. |

## Understand Agents Playground

Agents Playground is an npm package that has a CLI command called `teamsapptester`. When you run `teamsapptester start`, it opens a web app on your local machine that emulates the Teams or WebChat client and Bot Framework service. This web app doesn't need any cloud resources as it uses mock data to simulate the contextual information.

To use an application on Agents Playground, you need to provide:

* Message endpoint: A message endpoint is the URL that links Agents Playground and your application. You can update the endpoint with the `BOT_ENDPOINT` environment variable, start Agents Playground with option `--app-endpoint`, or just use the default value of `http://localhost:3978/api/messages`.
* Configuration file (Optional): A configuration file informs Agents Playground about your customized contextual information in Teams. The file is named **.m365agentsplayground.yml** in the project's root folder. If Teams can't find this file, it uses the default configuration. For more information, see [customize Teams context](#customize-teams-context).

## Agents Playground experience in Agents Toolkit

Agents Playground offers a faster debug experience for applications when compared to the real environment.

# [Visual Studio Code](#tab/vscode)

1. Open Visual Studio Code.

1. Select the Microsoft 365 Agents Toolkit :::image type="icon" source="../assets/images/toolkit-v2/toolkit-sidebar-icon.PNG" border="false"::: icon in the Visual Studio Code **Activity Bar**.

1. Select **Create a New Agent/App**.

    :::image type="content" source="../assets/images/toolkit-v2/create-project.png" alt-text="Screenshot shows the location of the Create New Project link in the Agents Toolkit sidebar.":::

1. Select **Agent for Teams**.

    :::image type="content" source="../assets/images/toolkit-v2/first-bot/create-new-agent-app.png" alt-text="Screenshot shows the agents toolkit app templates.":::

1. Select **General Teams Agent** to create an agent. If you need a different functionality for your agent, pick a different option.

    :::image type="content" source="../assets/images/toolkit-v2/debug/general-teams-agent.png" alt-text="Screenshot shows the app feature to add to your new app.":::

1. Select **Azure OpenAI** and enter service key. If you are using OpenAI, pick a different option.

    :::image type="content" source="../assets/images/toolkit-v2/first-bot/access-llm.png" alt-text="Screenshot shows the options to configure LLM service.":::

1. Select **JavaScript**.

    :::image type="content" source="../assets/images/toolkit-v2/first-bot/select-language.png" alt-text="Screenshot shows the option to select the programming language.":::

1. Select **Default folder**.

    :::image type="content" source="../assets/images/toolkit-v2/first-bot/select-default-location.png" alt-text="Screenshot shows the selection of default location.":::

    To change the default location, follow these steps:

    1. Select **Browse**.

        :::image type="content" source="../assets/images/toolkit-v2/first-bot/select-browse.png" alt-text="Screenshot shows the selection of browse location option.":::

    1. Select the location for the project workspace.
    1. Select **Select Folder**.

        :::image type="content" source="../assets/images/toolkit-v2/select-folder.png" alt-text="Screenshot shows the folder to select.":::

1. Enter a suitable name for your app and then select the **Enter** key.

    :::image type="content" source="../assets/images/toolkit-v2/first-bot/add-agent-name.png" alt-text="Screenshot shows where to enter the app name.":::

    A dialog appears, where you need to choose yes or no to trust the authors of the files in this folder.

    :::image type="content" source="../assets/images/toolkit-v2/first-bot/trust-author.png" alt-text="Screenshot shows the dialog to trust or not the authors of the files in this folder.":::

1. From the left pane, select **Run and Debug** (`Ctrl+Shift+D`) and select **Debug in Microsoft 365 Agents Playground (Preview)** in dropdown list.

   :::image type="content" source="../assets/images/toolkit-v2/debug/select-debug-in-test-tool.png" alt-text="Screenshot shows the option to select debug in Agents Playground.":::

1. Agents Playground opens the application in a webpage.

   :::image type="content" source="../assets/images/toolkit-v2/debug/test-tool.png" lightbox="../assets/images/toolkit-v2/debug/test-tool.png" alt-text="Screenshot shows the app open in agents playground.":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI%20ran%20into%20an%20issue%5D%20Test%20Tool%20experience%20in%20Agents%20Toolkit%20in%20Visual%20Studio%20Code&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftoolkit%2Fdebug-your-teams-app-test-tool%3Ftabs%3Dvscode%252Cclijs%23test-tool-experience-in-agents-toolkit&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftoolkit%2Fdebug-your-Teams-app-test-tool.md&documentVersionIndependentId=6fa9130b-1aa5-b068-4211-a5a4cc32effa&author=surbhigupta&platformId=dde152a9-2ee9-ef8b-602d-5ec98cffb908&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

# [Command line](#tab/cli)

1. You can use command line for JavaScript and TypeScript or C# to debug your app in Agents Playground. To get started select the following language:

   # [JavaScript/TypeScript](#tab/clijs)

   1. Run the following command to install Agents Playground CLI from `npm`:

      ```cmd
      npm i @microsoft/m365agentsplayground
      ```

        :::image type="content" source="../assets/images/toolkit-v2/debug/npm-teams-app-test-tool.png" alt-text="Screenshot shows install agents playground cli.":::

   1. Use the `atk` command from [Microsoft 365 Agents Toolkit CLI](Teams-Toolkit-CLI.md) (previously known as Teams Toolkit CLI) to create your first project. Start from the folder where you want to create the project folder.

      ```cmd
      atk new   
      ```

      You can use the CLI to create a new Teams app. The CLI leads you through a series of questions. Use the arrow keys to select an option. After you make a choice, select **Enter** to confirm. After you enter a suitable name for your app, your project is created.

       :::image type="content" source="../assets/images/toolkit-v2/debug/teamsapp-new.png" alt-text="Screenshot shows the process of creating a new app on Teams.":::

   1. Run the following command to deploy your app and install the required dependencies and npm packages:

      ```cmd
      atk deploy --env=playground
      ```

       :::image type="content" source="../assets/images/toolkit-v2/debug/teamsapp-deploy-env-testtool.png" alt-text="Screenshot shows the process of installing the required dependencies and npm packages.":::

   1. Run the following command to start your app:

      ```cmd
      npm run dev:teamsfx:testtool
      ```

   1. Run the following command in a separate terminal to launch Agents Playground:

      ```cmd
      npm run dev:teamsfx:launch-testtool
      ```

   # [C#](#tab/clicsharp)

   1. [Create a new app](toolkit-v4/create-new-project-vs.md).

   1. Download Agents Playground CLI from the [GitHub](https://github.com/OfficeDev/TeamsFx/releases?q=teams-app-test-tool&expanded=true) release.

   1. Unzip the downloaded package to a folder. You'll find an executable binary file `teamsapptester.exe`.

   1. Copy the `teamsapptester.exe` file to the folder where you've created your app.

   1. Open command prompt and go to the folder where you've created your app.

   1. Run the following command to launch profile:

      ```cmd
      dotnet run --launch-profile "Microsoft 365 Agents Playground (browser)"
      ```

   1. Run the following command in a separate terminal to define your bot message endpoint:

      1. For Command Prompt:

          ```cmd
             set BOT_ENDPOINT=http://127.0.0.1:5130/api/messages
          ```

      1. For PowerShell:

         ```powershell
            $env:BOT_ENDPOINT = "http://127.0.0.1:5130/api/messages"
         ```

   1. Run the following command to initiate Agents Playground:

      1. For Command Prompt:

         ```cmd
            teamsapptester.exe start
         ```

      1. For PowerShell:

         ```powershell
            teamsapptester.exe start
         ```

      If the Agents Playground for C# doesn't initiate because of a port conflict, alter the Agents Playground's port number in the `TEAMSAPPTESTER_PORT` environment variable where you run `teamsapptester.exe start`.
     ---
   1. Agents Playground opens the app in a webpage.

    :::image type="content" source="../assets/images/toolkit-v2/debug/test-tool.png" lightbox="../assets/images/toolkit-v2/debug/test-tool.png" alt-text="Screenshot shows the bot open in Agents Playground."

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI%20ran%20into%20an%20issue%5D%20Test%20Tool%20experience%20in%20Agents%20Toolkit%20in%20Command%20line&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftoolkit%2Fdebug-your-teams-app-test-tool%3Ftabs%3Dcli%252Cclijs%23test-tool-experience-in-agents-toolkit&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftoolkit%2Fdebug-your-Teams-app-test-tool.md&documentVersionIndependentId=6fa9130b-1aa5-b068-4211-a5a4cc32effa&author=surbhigupta&platformId=dde152a9-2ee9-ef8b-602d-5ec98cffb908&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

---

## Activity triggers

You can mock an activity in Agents Playground using activity triggers. There are two types of activity triggers:

1. [Predefined activity triggers](#predefined-activity-triggers)
1. [Custom activity triggers](#custom-activity-triggers)

> [!IMPORTANT]
>
> * When the Agents Playground is launched via Microsoft 365 Agents Toolkit, the default channel ID is `emulator`.
>
> * The `emulator` channel does not support some Teams-specific mock activities, such as:
>   * Installation update activities
>   * Channel or team conversation update activities
>   * Notification activities used by Agent 365 projects
>
> * As a result, these options may not appear in the **Mock an Activity** menu.
>
> * To test Teams-specific activities, set the channel ID to `msteams`. For more information, see [Multiple channel support](#multiple-channel-support).

> [!NOTE]
> Even if a specific activity is not available for the current channel, you can still use **Custom activity** to send a customized JSON payload to your agent.

### Predefined activity triggers

Agents Playground provides predefined activity triggers to test the functionalities of your app.

| Category | Activity | Handler |
| --- | --- | --- |
| Trigger Installation Update Activity | Install application <br><br><br> Uninstall application | `onInstallationUpdate` <br> `onInstallationUpdateAdded` <br><br> `onInstallationUpdate` <br> `onInstallationUpdateRemove`|
| Trigger Conversation Update Activity | Add user <br><br> Add application <br><br> Add channel | `onMembersAdded`<br><br> `onTeamsMembersAddedEvent` <br><br> `onTeamsChannelRenamedEvent` |
| | Remove user <br><br><br> Remove application <br><br><br> Remove channel <br><br> Remove team | `onMembersRemoved` <br> `onTeamsMembersRemovedEvent` <br><br> `onMembersRemoved` <br> `onTeamsMembersRemovedEvent` <br><br> `onTeamsChannelDeletedEvent` <br><br> `onTeamsTeamDeletedEvent` |
| | Rename channel <br><br> Rename team | `onTeamsChannelRenamedEvent` <br><br> `onTeamsTeamRenamedEvent` |

> [!NOTE]
> All types of activities aren't available in all scopes. For example, you can't add or remove a channel in a personal chat or a group chat.

Predefined activity triggers are available in the **Mock an Activity** menu in Agents Playground.

To mock an **Add user** activity, follow these steps:

1. In Agents Playground, go to **Mock an Activity** and select **Add user**.

   :::image type="content" source="../assets/images/toolkit-v2/debug/add-user.png" alt-text="Screenshot shows the add user option under mock an activity.":::

   A pop-up window appears to preview the activity handler.

1. Select **Send activity**.

   :::image type="content" source="../assets/images/toolkit-v2/debug/add-a-user-request.png" alt-text="Screenshot shows the option to send activity for predefined mock activity add user.":::

   App sends a response.

   :::image type="content" source="../assets/images/toolkit-v2/debug/add-a-user-response.png" alt-text="Screenshot shows the response of predefined mock activity add user.":::

### Custom activity triggers

You can use **Custom activity** to customize activity triggers such as, `reactionsAdded`, to fit the requirements of your bot app. Agents Playground automatically populates the required properties of the activity. You can also modify the activity type and add more properties.

1. Select **Mock an Activity** > **Custom activity**.

   :::image type="content" source="../assets/images/toolkit-v2/debug/mock-activity.png" alt-text="Screenshot shows the list of option under mock an activity.":::

1. Add `messageReaction` to customize the activity under the property `type` and invoke the custom activity.

    ```json
    {
      "type": "messageReaction",
      "reactionsAdded": [
        {
          "type": "like"
        }
      ],
      "replyToId": "d60fd1cb-3e8f-44ef-849c-404806ba1b47"
    }
    ```

1. Select **Send activity**.

   :::image type="content" source="../assets/images/toolkit-v2/debug/custom-activity-request.png" alt-text="Screenshot shows the option to send activity after customization on mock activity.":::

   Bot sends an `onReactionsAdded` handler in response.

   :::image type="content" source="../assets/images/toolkit-v2/debug/custom-activity-response.png" alt-text="Screenshot shows the response of custom mock activity.":::

## Configure Agents Playground for authentication

When debugging an application that requires authentication, you can configure the Microsoft Entra client ID and client secret, with an optional tenant ID. If you've created your bot using the Azure AI Bot Service, the credentials are available in the bot's App Service under **Settings** > **Configuration**.
If you're unsure of the values, you can remove them from the configuration file of the locally running application and then run the application in the Agents Playground. If the application doesn't require these settings to run, you don't need to configure them.

### Environment variable / Command line

Before starting Agents Playground, you can set the following environment variables: `AUTH_CLIENT_ID`, `AUTH_CLIENT_SECRET`, and `AUTH_TENANT_ID`. These values are used for the default authentication configuration.

When running Agents Playground from the command line, you can also use the options: `--client-id`, `--client-secret`, and `--tenant-id`.These options override the default environment variable settings.

### Client side interface

After Agents Playground has started, you can still configure authentication through the client interface as follows:

1. Select **Configure Authentication**.

   :::image type="content" source="../assets/images/toolkit-v2/debug/configure-authentication.png" alt-text="Screenshot shows the option to configure authentication on agents playground menu bar.":::

1. Fill in fields in the form and select **Save**.

   :::image type="content" source="../assets/images/toolkit-v2/debug/authentication-form.png" alt-text="Screenshot shows the form of authentication parameters and the save button.":::

The log panel shows the message if the configuration is successfully set.

:::image type="content" source="../assets/images/toolkit-v2/debug/authentication-enabled.png" alt-text="Screenshot shows the log panel message of successfully configure authentication settings.":::

### Authentication logic

Agents Playground acquires a JWT token using the provided authentication settings and includes it in the **Authorization** header when communicating with the application. The JWT token in the application's response header also is validated by Agents Playground. For more details about the authentication process, see [Authentication with the Bot Connector API](/azure/bot-service/rest-api/bot-framework-rest-connector-authentication).

## Multiple channel support

When you run the Agents Playground as a standalone tool, Microsoft Teams (`msteams`) is used as the default channel. When the playground is launched through Microsoft 365 Agents Toolkit, the default channel is `emulator`. You can change the channel by setting the `DEFAULT_CHANNEL_ID` environment variable or by using the `--channel-id` option when starting Agents Playground from the command line.

> [!NOTE]
>
> * To test Teams‑specific activities, set the channel ID to `msteams`.
>
> * You can do this by:
>   * Setting the environment variable:
>   `DEFAULT_CHANNEL_ID = msteams`
>   * Or using the CLI option:
>    `agentsplayground --channel-id msteams`

Currently, the accepted channel IDs are: `msteams`, `directline`, `webchat`, and `emulator`. When you set a channel ID, the properties of the messages sent to the application changes accordingly to simulate a real environment. For the `directline` and `webchat` channels, a corresponding client is displayed, and card rendering differs from that of the Teams channel.

:::image type="content" source="../assets/images/toolkit-v2/debug/webchat-ui.png" alt-text="Screenshot shows the card rendering result when using different channel.":::

## Customize Teams context

The configuration file in the project's root folder allows you to customize Teams context information such as chats, teams, and users. It provides mock data for testing Bot Framework APIs or methods from the Agents SDK or Teams SDK, such as `TeamsInfo.getTeamMembers`.

### Default configuration

Agents Playground contains a built-in configuration file in the project's root folder.

> [!NOTE]
> By default, the Agents Playground uses built-in mock data. You don’t need to create or modify any configuration files unless you want to customize the mock data used during local debugging.

```yaml
# yaml-language-server: $schema=https://aka.ms/teams-app-test-tool-config/0.1.1/config.schema.json
# Visit https://aka.ms/teams-app-test-tool-config-guide for more details on this file.

# This configuration file customizes the Teams context information like chats, teams, and users.
# It contains mock data for testing Bot Framework APIs or Bot Builder SDK methods such as TeamsInfo.getTeamMembers().
# You can customize this file to change API response if your bot code uses these APIs.
version: "0.1.1"
tenantId: 00000000-0000-0000-0000-0000000000001
bot:
  id: 00000000-0000-0000-0000-00000000000011
  name: Test Bot
  agenticAppId: 00000000-0000-0000-0000-000000000100
  agenticUserId: agentic-user-id
  tenantId: 00000000-0000-0000-0000-000000000001
  role: agenticUser
currentUser:
  id: user-id-0
  name: Alex Wilber
  userPrincipleName: alexw@example.com
  aadObjectId: 00000000-0000-0000-0000-0000000000020
  givenName: Alex
  surname: Wilber
  email: alexw@example.com
users:
  - id: user-id-1
    name: Megan Bowen
    userPrincipleName: meganb@example.com
    aadObjectId: 00000000-0000-0000-0000-0000000000021
    givenName: Megan
    surname: Bowen
    email: meganb@example.com
  - id: user-id-2
    name: Adele Vance
    userPrincipleName: adelev@example.com
    aadObjectId: 00000000-0000-0000-0000-0000000000022
    givenName: Adele
    surname: Vance
    email: adelev@example.com
  - id: user-id-3
    name: Isaiah Langer
    userPrincipleName: isaiah@example.com
    aadObjectId: 00000000-0000-0000-0000-0000000000023
    givenName: Isaiah
    surname: Langer
    email: isaiahl@example.com
  - id: user-id-4
    name: Patti Fernandez
    userPrincipleName: pattif@example.com
    aadObjectId: 00000000-0000-0000-0000-0000000000024
    givenName: Patti
    surname: Fernandez
    email: pattif@example.com
  - id: user-id-5
    name: Lynne Robbins
    userPrincipleName: lynner@example.com
    aadObjectId: 00000000-0000-0000-0000-0000000000025
    givenName: Lynne
    surname: Robbins
    email: lynner@example.com
personalChat:
  id: personal-chat-id
groupChat:
  id: group-chat-id
  name: Group Chat
team:
  id: team-id
  name: My Team
  aadGroupId: 00000000-0000-0000-0000-000000000031
  channels:
    - id: channel-announcements-id
      name: Announcements
```

> [!NOTE]
>
> * Developers can obtain `agenticAppId`, `agenticUserId`, and `tenantId` after publishing their agent to the Microsoft 365 admin center. For more information, see [publish agent to Microsoft 365 admin center](/microsoft-agent-365/developer/a365-dev-lifecycle).
> * These fields enable debugging in the Microsoft Agent 365 scenario. For more information, see [Agent 365 Identity](/microsoft-agent-365/developer/identity).
> * The fields `agenticAppId`, `agenticUserId`, `tenantId`, and `role` are supported in M365 Agents Playground version 0.2.23 and later. Ensure you are using the correct Playground version.

### Customize the configuration file

If your bot code uses Bot Framework APIs, you can modify the configuration file to customize the API responses. For example, consider an Azure DevOps notification bot installed in a team that fetches inactive bugs from Azure DevOps. It identifies the owners of the inactive bugs, retrieves their email addresses, and sends daily notifications to their personal chats.

To comprehensively test this bot in Agents Playground, ensure to update the configuration file with the correct email addresses of the inactive bug owners.

1. Create a file named `.m365agentsplayground.yml` in the project's root folder.

1. Copy the default mock data configuration and paste it into the `.m365agentsplayground.yml` file.

1. Go to the `users` section and update the `name`, `userPrincipleName`, and `email` of the required user.

    ```yaml
    users:
        - id: user-id-1
          name: Megan Bowen
          userPrincipleName: meganb@example.com
          aadObjectId: 00000000-0000-0000-0000-0000000000021
          givenName: Megan
          surname: Bowen
          email: some-real-user@real-domain.onmicrosoft.com
    ```

1. Save the file and select **F5** to debug in Agents Playground.

> [!NOTE]
>
> * The Agents Playground uses two different configuration files:
>   * `m365agents.playground.yml` is generated by Microsoft 365 Agents Toolkit and controls how the playground starts. This file doesn’t include mock user data.
>   * `.m365agentsplayground.yml` is an optional file that you can create to customize built-in mock data, such as users.
>
> * The Agents Playground requires exactly five users in the `users` section. Configurations with fewer or more than five users aren’t supported.
>
> * When you edit the configuration file in Visual Studio Code, Intellisense automatically updates the property names and warns you if you enter invalid values.

It's important to understand that updating the configuration file has three major impacts:

* It affects the responses returned by Bot Framework Connector APIs. For example, `TeamsInfo.getPagedMembers()`.
* It modifies the details in the activity payload. For example, `activity.recipient`.
* It influences the user interface in Agents Playground. For example, group chat names.

## Limitations

* Bot or agent features enabled through the Teams app manifest aren't available as Agents Playground doesn't process it.

* Agents Playground doesn't support all types of cards except Adaptive Cards.

* Agents Playground doesn't support the following Adaptive Card features:

  * [Typeahead search](../task-modules-and-cards/cards/dynamic-search.md)
  * [User mention](../task-modules-and-cards/cards/cards-format.md#microsoft-azure-active-directory-azure-ad-object-id-and-upn-in-user-mention)
  * [Stageview](../task-modules-and-cards/cards/cards-format.md#stageview-for-images-in-adaptive-cards)
  * [Full width](../task-modules-and-cards/cards/cards-format.md#full-width-adaptive-card)

* Agents Playground doesn't support the following experiences:

  * Mobile
  * Meeting

* Agents Playground can emulate the following experiences:

   | Features | Debug in Agents Playground | [Debug your app locally](debug-local.md) |
   | --- | --- | --- |
   | Basic sending / receiving messages | Available | Available |
   | Bot Framework APIs (TeamsInfo.getPagedMembers()...) |Available (respond with mocked data) | Available |
   | Sending Teams events | Available (mock activity) |Available |
   | Typing indicator | Not Available | Available |
   | Tab, Message extension, Dialogs (referred as task modules in TeamsJS v1.x), Single sign-on (SSO), and non-Adaptive Cards | Not Available | Available |

## Debug an existing app with Agents Playground

Ensure you have an existing app created using Agents Toolkit. To debug your app with Agents Playground, follow these steps:

1. Open the existing bot's project folder in Agents Toolkit.

1. Go to **EXPLORER** > **.vscode**.
1. Select **launch.json** and add the following code at the end of the file:

    ```yaml
    // .vscode/launch.json 
    
    { 
        ... 
        "compounds": [ 
            ... 
            { 
                "name": "Debug in Microsoft 365 Agents Playground", 
                "configurations": [ 
                    "Attach to Local Service" 
                ], 
                "preLaunchTask": "Start App in Microsoft 365 Agents Playground", 
                "presentation": { 
                    "group": "1-local", 
                    "order": 1 
                }, 
                "stopAll": true 
            }, 
        ] 
    } 
    ```

1. Go to **tasks.json** and add the following code at the end of the file:

    ```json
        { 
          "label": "Start Microsoft 365 Agents Playground", 
          "type": "shell", 
          "command": "npm run dev:teamsfx:launch-playground", 
          "isBackground": true, 
          "options": { 
            "env": { 
              "PATH": "${workspaceFolder}/devTools/teamsapptester/node_modules/.bin:${env:PATH}" 
            } 
          }, 
          "windows": { 
            "options": { 
              "env": { 
                "PATH": "${workspaceFolder}/devTools/teamsapptester/node_modules/.bin;${env:PATH}" 
              } 
            } 
          }, 
          "problemMatcher": { 
            "pattern": [ 
              { 
                "regexp": "^.*$", 
                "file": 0, 
                "location": 1, 
                "message": 2 
              } 
            ], 
            "background": { 
              "activeOnStart": true, 
              "beginsPattern": ".*", 
              "endsPattern": "Listening on" 
            } 
          }, 
          "presentation": { 
            "panel": "dedicated", 
            "reveal": "silent" 
          } 
        }, 
      ],
    }
    ```

1. Under **EXPLORER**, create a **.localConfigs.playground** file and add the following code:

    ```json
    // .localConfigs.playground
    # A gitignored place holder file for local runtime configurations when debug in Agents Playground
    BOT_ID=
    BOT_PASSWORD=
    TEAMSFX_NOTIFICATION_STORE_FILENAME=.notification.playgroundstore.json
    ```

1. Go to **EXPLORER** > **env**.
1. Create a **.env.playground** file and add the following code:

    ```json
    // .env.playground
    # This file includes environment variables that can be committed to git. It's gitignored by default because it represents your local development environment
    # Built-in environment variables
    TEAMSFX_ENV=playground
    # Environment variables used by Agents Playground
    TEAMSAPPTESTER_PORT=56150
    ```

1. If you have custom environment variables, set their values in **.env.playground** or **.env.playground.user**.

1. Add either an OpenAI key or Azure OpenAI key and endpoint in **.env.playground.user**.

    ```json
    # SECRET_OPENAI_API_KEY=***********
    SECRET_AZURE_OPENAI_API_KEY=***********
    SECRET_AZURE_OPENAI_ENDPOINT=<https://your-openai-service-name.openai.azure.com/>
    ```

1. Go to **package.json** and add the following code under the `scripts` property:

    ```json
    "scripts": {
        ... 
        "dev:teamsfx:playground": "env-cmd --silent -f .localConfigs.playgroundnd npm run dev", 
        "dev:teamsfx:launch-playground": "env-cmd --silent -f env/.env.playground teamsapptester start", 
        ... 
    },
    ```

1. From the left pane, select **Run and Debug** (`Ctrl+Shift+D`) and select **Debug in Microsoft 365 Agents Playground** in dropdown list.

   :::image type="content" source="../assets/images/toolkit-v2/debug/select-debug-in-test-tool.png" alt-text="Screenshot shows the option to select debug in Microsoft 365 Agents Playground.":::

Agents Playground successfully debugs your existing bot.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI%20ran%20into%20an%20issue%5D%20Debug%20an%20existing%20app%20with%20Test%20Tool&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftoolkit%2Fdebug-your-agents-playground%3Ftabs%3Dvscode%252Cclijs%23debug-an-existing-app-with-agents-playground&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftoolkit%2Fdebug-your-agents-playground.md&documentVersionIndependentId=6fa9130b-1aa5-b068-4211-a5a4cc32effa&author=surbhigupta&platformId=dde152a9-2ee9-ef8b-602d-5ec98cffb908&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

## Disabling data collection

If you decide that you don't want to allow Agents Playground to collect usage data, you can easily disable data collection by adding option `--disable-telemetry` when start Agents Playground via command line.

## FAQ

<details>
<summary>How can I test my app if Agents Playground doesn't support its features?</summary>

You can always use the Teams client to test the features that Agents Playground doesn't support. Select the option **Debug in Teams (Edge)** or **Debug in Teams (Chrome)** to test your application in the Teams client.
<br>
&nbsp;
</details>
<details>
<summary>How would I know if Agents Playground doesn't support features in my app?</summary>

Agents Playground shows a warning message in conversation and log panel when it detects unsupported features.

:::image type="content" source="../assets/images/toolkit-v2/debug/features-not-supported.png" alt-text="Screenshot shows the warning message of an unsupported feature.":::
<br>
&nbsp;
</details>
<details>
<summary>Does Microsoft recommend using only Agents Playground for testing applications?</summary>

No. We always recommend users to test their applications in the Teams client before moving the application to the production environment.
<br>
&nbsp;
</details>

## Code sample

|Sample name | Description | Node.js |
|----------------|-----------------|--------------|
| Agents Playground Sample App | A sample app to explore Agents Playground. | [View](https://github.com/OfficeDev/TeamsFx-Samples/tree/v3/test-tool-sample-app) |

## Step-by-step guide

Follow the [step-by-step guide](teams-app-test-tool-tutorial.md) to debug an AI chat bot using Agents Playground.

## See also

* [Microsoft 365 Agents Toolkit Overview](agents-toolkit-fundamentals.md)
* [Install Microsoft 365 Agents Toolkit](install-Teams-Toolkit.md)
* [Build bots for Teams](../bots/what-are-bots.md)
* [Teams SDK](../bots/how-to/teams-conversational-ai/teams-conversation-ai-overview.md)
* [Adaptive Card](../task-modules-and-cards/cards/cards-reference.md#adaptive-card)
* [Agents SDK](https://github.com/microsoft/Agents)
