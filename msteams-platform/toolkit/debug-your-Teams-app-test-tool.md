---
title: Debug bot using Teams App Test Tool
author: surbhigupta 
description: Learn how to emulate the Teams experience for your bot in Teams App Test Tool.
ms.author: surbhigupta 
ms.localizationpriority: high
ms.topic: overview
ms.date: 11/16/2023
---

# Teams App Test Tool

> [!NOTE]
>
> Teams App Test Tool is available in the latest prerelease version of the Teams Toolkit. Ensure that you install the [latest prerelease version](install-Teams-Toolkit.md#install-a-pre-release-version) of the Teams Toolkit.

Teams App Test Tool (Test Tool) makes debugging bot-based apps effortless. You can chat with your bot and see its messages and Adaptive Cards as they appear in Teams. You don’t need a Microsoft 365 developer account, tunneling, or Teams app and bot registration to use Test Tool.

The following image shows a sample app displaying an Adaptive Card with a list of commands in Test Tool. It also provides a description of the commands so that you can test your app without manually searching your code:

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/test-tool.png" alt-text="Screenshot shows the Teams App Test Tool Adaptive Card.":::

The following are the advantages of Test Tool:

* **Sandbox environment**: The sandbox environment of Test Tool emulates the behavior, look and, user experience of Teams.

* **Tunneling**: An external tunnel service isn't necessary as Test Tool runs on a local server that your bot can communicate with.

* **Reduce account dependencies**: Microsoft 365 Developer tenant and the app uploading permissions aren't necessary to debug the bot.

* **Rapid inner-loop iterations**: Optimizes the process of making changes to the app design and bot logic without having to redeploy the bot to the cloud.

* **Mock data and activities**: Test Tool makes it easy to test complex scenarios such as, sending a welcome message when a new member joins the channel, using mock data and activity triggers.

* **Reliable**: Test Tool is reliable as the bot's Adaptive Card utilizes the same rendering technology as in Teams.

* **Integration with existing Teams bot applications**: Test Tool integrates effortlessly with existing Teams bot applications built with [Bot Framework SDK](https://dev.botframework.com/).

* **Support for different scopes**: Test Tool supports testing in personal, team, and group chat scopes.

## Prerequisites

Ensure you install the following tools for building and deploying your bots in Test Tool:

| &nbsp; | Install | For using... |
| --- | --- | --- |
| &nbsp; | [Teams Toolkit](install-Teams-Toolkit.md) | A Microsoft Visual Studio Code extension that creates a project scaffolding for your app. Use the latest prerelease version. |
| &nbsp; | [Node.js](https://nodejs.org/en/download/) | Back-end JavaScript runtime environment. For more information, see [Node.js version compatibility table for project type](~/toolkit/build-environments.md#nodejs-version-compatibility-table-for-project-type). |
| &nbsp; | [Visual Studio Code](https://code.visualstudio.com/download) | JavaScript, TypeScript, or SharePoint Framework (SPFx) build environments. Use the latest version. |

## Understand Test Tool

Test Tool is an npm package that has a CLI command called `teamsapptester`. When you run `teamsapptester start`, it opens a web app on your local machine that emulates the Teams Web client and Bot Framework service. This web app doesn't need any cloud resources as it uses mock data to simulate the contextual information of Teams.

To use a Teams bot on Test Tool, you need to provide:

* Message endpoint: A bot message endpoint is the URL that links Test Tool and your bot. You can update the endpoint with the `BOT_ENDPOINT` environment variable or use the default value of `http://localhost:3978/api/messages`.
* Configuration file (Optional): A configuration file informs Test Tool about your customized contextual information in Teams. The file is named **teamsapptesttool.yml** in the project's root folder. If Teams can't find this file, it uses the default configuration. For more information, see [customize Teams context](#customize-teams-context).

## Test Tool experience in Teams Toolkit

Test Tool offers a faster debug experience for bot applications when compared to the Teams client.

1. Open Visual Studio Code.

1. Select the Teams Toolkit :::image type="icon" source="../assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.PNG" border="false"::: icon in the Visual Studio Code **Activity Bar**.

1. Select **Create a New App**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/create-project.png" alt-text="Screenshot shows the location of the Create New Project link in the Teams Toolkit sidebar.":::

1. Select **Bot**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/create-new-app1.png" alt-text="Screenshot shows the Teams Toolkit app templates.":::

1. Select **AI Chat Bot**. If you need a different functionality for your bot, pick a different option.

    :::image type="content" source="../assets/images/teams-toolkit-v2/debug/ai-chat-bot.png" alt-text="Screenshot shows the app feature to add to your new app.":::

1. Select **JavaScript**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/select-language-tab.png" alt-text="Screenshot shows the option to select the programming language.":::

1. Select **Default folder**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/select-default-location.png" alt-text="Screenshot shows the selection of default location.":::

    You can also change the default location by the following steps:

    1. Select **Browse**.

        :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/select-browse.png" alt-text="Screenshot shows the selection of browse location option.":::

    1. Select the location for the project workspace.
    1. Select **Select Folder**.

        :::image type="content" source="../assets/images/teams-toolkit-v2/select-folder.png" alt-text="Screenshot shows the folder to select.":::

1. Enter a suitable name for your app and then select the **Enter** key.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/hello-bot.png" alt-text="Screenshot shows where to enter the app name.":::

    A dialog appears, where you need to choose yes or no to trust the authors of the files in this folder.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/vsc-trust-authors.png" alt-text="Screenshot shows the dialog to trust or not the authors of the files in this folder.":::

1. From the left pane, select **Run and Debug** (`Ctrl+Shift+D`) and select **Debug in Test Tool** in dropdown list.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/select-debug-in-test-tool.png" alt-text="Screenshot shows the option to select debug in test tool.":::

1. Test Tool opens the bot in a webpage.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/test-tool.png" lightbox="../assets/images/teams-toolkit-v2/debug/test-tool.png" alt-text="Screenshot shows the Teams App Test Tool Adaptive Card.":::

## Activity triggers

You can mock an activity in Test Tool using activity triggers. There are two types of activity triggers:

1. [Predefined activity triggers](#predefined-activity-triggers)
1. [Custom activity triggers](#custom-activity-triggers)

### Predefined activity triggers

Test Tool provides predefined activity triggers to test the functionalities of your bot.

| Category | Activity | Handler |
| --- | --- | --- |
| Trigger Installation Update Activity | Install bot <br><br><br> Uninstall bot | `onInstallationUpdate` <br> `onInstallationUpdateAdded` <br><br> `onInstallationUpdate` <br> `onInstallationUpdateRemove`|
| Trigger Conversation Update Activity | Add user <br><br> Add bot <br><br> Add channel | `onMembersAdded`<br><br> `onTeamsMembersAddedEvent` <br><br> `onTeamsChannelRenamedEvent` |
| | Remove user <br><br><br> Remove bot <br><br><br> Remove channel <br><br> Remove team | `onMembersRemoved` <br> `onTeamsMembersRemovedEvent` <br><br> `onMembersRemoved` <br> `onTeamsMembersRemovedEvent` <br><br> `onTeamsChannelDeletedEvent` <br><br> `onTeamsTeamDeletedEvent` |
| | Rename channel <br><br> Rename team | `onTeamsChannelRenamedEvent` <br><br> `onTeamsTeamRenamedEvent` |

> [!NOTE]
> All types of activities aren't available in all scopes. For example, you can't add or remove a channel in a personal chat or a group chat.

Predefined activity triggers are available in the **Mock an Activity** menu in Test Tool.

To mock an **Add user** activity, follow these steps:

1. In Test Tool, go to **Mock an Activity** and select **Add user**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/add-user.png" alt-text="Screenshot shows the add user option under mock an activity.":::

   A pop-up window appears to preview the activity handler.

1. Select **Send activity**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/add-a-user-request.png" alt-text="Screenshot shows the option to send activity for predefined mock activity add user.":::

   Bot sends a response.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/add-a-user-response.png" alt-text="Screenshot shows the response of predefined mock activity add user.":::

### Custom activity triggers

You can use **Custom activity** to customize activity triggers such as, `reactionsAdded`, to fit the requirements of your bot app. Test Tool automatically populates the required properties of the activity. You can also modify the activity type and add more properties.

1. Select **Mock an Activity** > **Custom activity**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/mock-activity.png" alt-text="Screenshot shows the list of option under mock an activity.":::

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

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/custom-activity-request.png" alt-text="Screenshot shows the option to send activity after customization on mock activity.":::

   Bot sends an `onReactionsAdded` handler in response.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/custom-activity-response.png" alt-text="Screenshot shows the response of custom mock activity.":::

## Customize Teams context

The configuration file in the project's root folder allows you to customize Teams context information such as chats, teams, and users. The file provides mock data for testing Bot Framework APIs or Bot Builder SDK methods such as `TeamsInfo.getTeamMembers`.

### Default configuration

<details><summary>Test Tool contains a built-in configuration file in the project's root folder.</summary>

```yaml
# yaml-language-server: $schema=https://aka.ms/teams-app-test-tool-config/0.1.0/config.schema.json
# Visit https://aka.ms/teams-app-test-tool-config-guide for more details on this file.

# This configuration file customizes the Teams context information like chats, teams, and users.
# It contains mock data for testing Bot Framework APIs or Bot Builder SDK methods such as TeamsInfo.getTeamMembers().
# You can customize this file to change API response if your bot code uses these APIs.
version: "0.1.0"
tenantId: 00000000-0000-0000-0000-0000000000001
bot:
  id: 00000000-0000-0000-0000-00000000000011
  name: Test Bot
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

</details>

### Update the configuration file

If your bot code uses Bot Framework APIs, you can modify the configuration file to alter the API response. Let us consider an Azure DevOps notification bot installed in a team that fetches inactive bugs from Azure DevOps. It identifies the owners of the inactive bug, fetches their email addresses, and sends notifications to their personal chats on a daily basis.

To comprehensively test this bot in Test Tool, it's crucial to update the configuration file to use the correct email addresses of the owners of the inactive bugs.

1. Go to the `teamsapptesttool.yml` file in the project's root folder.

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

1. Save the file and select **F5** to debug in Test Tool.

> [!NOTE]
> When you edit the configuration file in Visual Studio Code, Intellisense automatically updates the property names and warns you if you enter invalid values.

It's vital to recognize that updating the configuration file has three major impacts:

* It influences the responses obtained from Bot Framework Connector APIs, for example, `TeamsInfo.getPagedMembers()`.
* It shapes the details in the activity payload, for example, `activity.recipient`.
* It impacts the user interface in Test Tool, for example, group chat names.

## Limitations

* Bot features enabled through the Teams app manifest aren't available as Test Tool doesn't process it.

* Test Tool doesn't support all types of cards except Adaptive Cards.

* Test Tool doesn't support the following Adaptive Card features:

  * [Typeahead search](../task-modules-and-cards/cards/dynamic-search.md)
  * [User mention](../task-modules-and-cards/cards/cards-format.md#microsoft-azure-active-directory-azure-ad-object-id-and-upn-in-user-mention)
  * [Stage View](../task-modules-and-cards/cards/cards-format.md#stage-view-for-images-in-adaptive-cards)
  * [Full width](../task-modules-and-cards/cards/cards-format.md#full-width-adaptive-card)

* Test Tool doesn't support the following experiences:

  * Mobile
  * Meeting

* Test Tool can emulate the following experiences:

   | Features | Debug in Test Tool | [Debug your Teams app locally](debug-local.md) |
   | --- | --- | --- |
   | Basic sending / receiving messages | Available | Available |
   | Bot Framework APIs (TeamsInfo.getPagedMembers()...) |Available (respond with mocked data) | Available |
   | Sending Teams events | Available (mock activity) |Available |
   | Typing indicator | Not Available | Available |
   | Tab, Messaging Extension, Task Module, Single sign-on (SSO), and non-Adaptive Cards | Not Available | Available |

## Debug an existing app with Test Tool

Ensure you have an existing bot created using Teams Toolkit. To debug your bot with Test Tool, follow these steps:

1. Open the existing bot's project folder in Teams Toolkit.

1. Go to **EXPLORER** > **.vscode**.
1. Select **launch.json** and add the following code at the end of the file:

    ```yaml
    // .vscode/launch.json 
    
    { 
        ... 
        "compounds": [ 
            ... 
            { 
                "name": "Debug in Test Tool", 
                "configurations": [ 
                    "Attach to Local Service" 
                ], 
                "preLaunchTask": "Start Teams App (Test Tool)", 
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
          "label": "Start Test Tool", 
          "type": "shell", 
          "command": "npm run dev:teamsfx:launch-testtool", 
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

1. Under **EXPLORER**, create a **.localConfigs.testtool** file and add the following code:

    ```json
    // .localConfigs.testTool
    # A gitignored place holder file for local runtime configurations when debug in test tool
    BOT_ID=
    BOT_PASSWORD=
    TEAMSFX_NOTIFICATION_STORE_FILENAME=.notification.testtoolstore.json
    ```

1. Go to **EXPLORER** > **env**.
1. Create a **.env.testtool** file and add the following code:

    ```json
    // .env.testtool
    # This file includes environment variables that can be committed to git. It's gitignored by default because it represents your local development environment
    # Built-in environment variables
    TEAMSFX_ENV=testtool
    # Environment variables used by test tool
    TEAMSAPPTESTER_PORT=56150
    ```

1. If you have custom environment variables, set their values in **.env.testtool** or **.env.testtool.user**.

1. Add either an OpenAI key or Azure OpenAI key and endpoint in **.env.testtool.user**.

    ```json
    # SECRET_OPENAI_API_KEY=***********
    SECRET_AZURE_OPENAI_API_KEY=***********
    SECRET_AZURE_OPENAI_ENDPOINT=<https://your-openai-service-name.openai.azure.com/>
    ```

1. Go to **package.json** and add the following code under the `scripts` property:

    ```json
    "scripts": {
        ... 
        "dev:teamsfx:testtool": "env-cmd --silent -f .localConfigs.testTool npm run dev", 
        "dev:teamsfx:launch-testtool": "env-cmd --silent -f env/.env.testtool teamsapptester start", 
        ... 
    },
    ```

1. From the left pane, select **Run and Debug** (`Ctrl+Shift+D`) and select **Debug in Test Tool** in dropdown list.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/select-debug-in-test-tool.png" alt-text="Screenshot shows the option to select debug in test tool.":::

Test Tool successfully debugs your existing bot.

## FAQ

<details>
<summary>How can I test my bot if Test Tool doesn't support its features?</summary>

You can always use the Teams client to test the features that Test Tool doesn't support. Select the option **Debug (Edge)** or **Debug (Chrome)** to test your application in the Teams client.
<br>
&nbsp;
</details>
<details>
<summary>How would I know if Test Tool doesn't support features in my bot?</summary>

Test Tool shows a warning message in conversation and log panel when it detects unsupported features.

:::image type="content" source="../assets/images/teams-toolkit-v2/debug/features-not-supported.png" alt-text="Screenshot shows the warning message of an unsupported feature.":::
<br>
&nbsp;
</details>
<details>
<summary>Does Microsoft recommend using only Test Tool for testing bot applications?</summary>

No. We always recommend users to test their bot application in the Teams client before moving the application to the production environment.
<br>
&nbsp;
</details>

## Code sample

|Sample name | Description | Node.js |
|----------------|-----------------|--------------|
| Test Tool Sample App | A sample bot app to explore Test Tool. | [View](https://github.com/OfficeDev/TeamsFx-Samples/tree/v3/test-tool-sample-app) |

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals.md)
* [Install Teams Toolkit](install-Teams-Toolkit.md)
* [Build bots for Teams](../bots/what-are-bots.md)
* [Adaptive Card](../task-modules-and-cards/cards/cards-reference.md#adaptive-card)
