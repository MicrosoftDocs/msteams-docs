---
title: Debug your Teams App Test Tool
author: surbhigupta 
description: In this module, learn how to debug your Teams App Test Tool and key features of Teams App Test Tool.
ms.author: surbhigupta 
ms.localizationpriority: high
ms.topic: overview
ms.date: 11/03/2023
---

# Teams App Test Tool

> [!NOTE]
>
> Teams App Test Tool is available in the latest prerelease version of the Teams Toolkit. Ensure the [latest prerelease version](install-Teams-Toolkit.md#install-a-pre-release-version) of Teams Toolkit is installed.

The Teams App Test Tool (Test Tool) makes debugging your bot-based apps effortless. You can chat with your bot and see its messages and adaptive cards as they appear in Teams. You don’t need a Microsoft 365 developer account, tunneling, or Teams app and bot registration to use the Test Tool.
The Test Tool also assists you discover and test the commands in your app’s code. It displays a list of commands and their descriptions, so you can test your app without manually searching your code. You can see the commands in a web page or a web chat.

The image shows a bot displaying an Adaptive Card with a list of commands in the Test Tool.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/test-tool.png" alt-text="Screenshot shows the Teams App Test Tool Adaptive Card.":::

The Test Tool provides the following advantages:

* **Sandbox environment**: Sandbox environment emulates the behavior, look and user experience of Teams.

* **Tunneling**: Tunnel service is not required as it runs locally.

* **Reduce account dependencies**: Microsoft 365 Developer tenant and the app uploading permissions aren't required to debug the bot application.

* **Rapid inner-loop iterations**: Optimizes the process of making changes to the app design and bot logic without having to redeploy the bot application to the cloud.

* **Mock data and activities**: The Test Tool makes it easy to accomplish a test for complex scenarios such as **Send a welcome message when a new member joins the channel** by using mock data and built-in and custom activity triggers.

* **Reliable and trustable**: The Test Tool is reliable as the Bot application [Adaptive Card](../task-modules-and-cards/cards/cards-reference.md#adaptive-card) utilizes the same rendering technology as in Teams.

* **Integration with existing Teams bot applications**: The Test Tool can be integrated with existing Teams bot applications that are built with [Bot Framework SDK](https://dev.botframework.com/).

* **Support for different scopes**: The Test Tool supports testing in personal, team, and group chat scopes.

## Prerequisites

Ensure you install the following tools for building and deploying your bot apps in Test Tool.

| &nbsp; | Install | For using... |
| --- | --- | --- |
| &nbsp; | [Install Teams Toolkit](install-Teams-Toolkit.md) | A Microsoft Visual Studio Code extension that creates a project scaffolding for your app. Use the latest version. |
| &nbsp; | [Node.js](https://nodejs.org/en/download/) | Back-end JavaScript runtime environment. For more information, see [Node.js version compatibility table for project type](~/toolkit/build-environments.md#nodejs-version-compatibility-table-for-project-type). |
| &nbsp; | [Visual Studio Code](https://code.visualstudio.com/download) | JavaScript, TypeScript, or SharePoint Framework (SPFx) build environments. Use the latest version. |

## Understand how the Test Tool works

This section explains how the Test Tool works and how it connects with your bot app. The Test Tool is an npm package that has a CLI command called ~teamsapptester~. When you run ~teamsapptester start~, it opens a web app on your local machine that emulates the Teams Web client and Bot Framework service. This web app doesn't need any cloud resources as it uses mock data to simulate the contextual information of Teams.

To use a Teams bot app on the Test Tool, you need to provide:

* The bot message endpoint is the URL that links the Test Tool and your bot. You can update with the BOT_ENDPOINT environment variable or use the default value of `http://localhost:3978/api/messages`.
* (Optional) A configuration file to inform the Test Tool about your customized contextual information in Teams. The file is named **teamsapptesttool.yml** in the project's root folder. If Teams cannot find this file, it will use the default configuration. For more details, see [update Teams context](#customize-teams-context).

## Test Tool experience in Teams Toolkit

1. Open Visual Studio Code.

1. Select the Teams Toolkit :::image type="icon" source="../assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.PNG" border="false"::: icon in the Visual Studio Code **Activity Bar**.

1. Select **Create a New App**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.PNG" alt-text="Screenshot shows the location of the Create New Project link in the Teams Toolkit sidebar.":::

1. Select **Bot** to create a new bot project.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/create-new-app1.png" alt-text="Screenshot shows the wizard to Create New Project.":::

1. Select **Basic Bot** as the app feature that you want to build in your app. If you need a different functionality for your bot, select accordingly.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/select-bot.png" alt-text="Screenshot shows the app feature to add to your new app.":::

1. Select **JavaScript** as the programming language.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/select-language-tab.png" alt-text="Screenshot shows the option to select the programming language.":::

1. Select **Default folder** to store your project root folder in default location.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/select-default-location.png" alt-text="Screenshot shows the selection of default location.":::

    You can also change the default location by the following steps:

    1. Select **Browse**.

        :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/select-browse.png" alt-text="Screenshot shows the selection of browse location option.":::

    1. Select the location for project workspace.
    1. Select the **Select Folder**.

        :::image type="content" source="../assets/images/teams-toolkit-v2/select-folder.png" alt-text="Screenshot shows the folder to select.":::

1. Enter a suitable name for your app and then select **Enter**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/hello-bot.png" alt-text="Screenshot shows where to enter the app name.":::

    A dialog appears, where you would be required to choose yes or no to trust the authors of the files in this folder.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/vsc-trust-authors.png" alt-text="Screenshot shows the dialog to trust or not the authors of the files in this folder.":::

1. From the left pane, select **Run and Debug** (`Ctrl+Shift+D`) and select **Debug in Test Tool** in dropdown list.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/select-debug-in-test-tool.png" alt-text="Screenshot shows the option to select debug in test tool.":::

1. A webpage opens with an Adaptive Card. Type **help** command. A list of commands is displayed.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/test-tool.png" lightbox="../assets/images/teams-toolkit-v2/debug/test-tool.png" alt-text="Screenshot shows the Teams App Test Tool Adaptive Card.":::

## Predefined activities

The Test Tool provides predefined activities that can be used to test the functionalities of your bot app.

| Activity | Handler |
| --- | --- |
| Trigger Installation Update Activity | Install bot <br> Uninstall bot |
| Trigger Conversation Update Activity | Add user <br> Add bot <br> Add channel |
| | Remove user <br> Remove bot <br> Remove channel <br> Remove team |
| | Remove channel <br> Remove team |

> [!NOTE]
> All types of activities aren't available in all scopes. For example, you can't add or remove a channel in personal chat or group chat.

The following example explains the **Add user** handler.

1. Select **Mock an Activity** > **Add user** and a pop-up window appears to preview the activity handler.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/mock-activity.png" alt-text="Screenshot shows the list of option under mock an activity.":::

1. Select **Send activity**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/add-a-user-request.png" alt-text="Screenshot shows the option to send activity for predefined mock activity add user.":::

   Bot sends a response.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/add-a-user-response.png" alt-text="Screenshot shows the response of predefined mock activity add user.":::

## Customize activities

Activities can be customized to fit the requirements of your app. The required properties of the activity are automatically populated and you can modify the activity type and add more properties.

1. Select **Mock an Activity** > **Custom activity**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/mock-activity.png" alt-text="Screenshot shows the list of option under mock an activity.":::

1. Add `messageReaction` to customize the activity under the property `type` and following is an example:

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

   Bot sends a `onReactionsAdded` handler response invoked with the activity defined.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/custom-activity-response.png" alt-text="Screenshot shows the response of custom mock activity.":::

## Customize Teams context

The configuration file in the project's root folder allows you to customize Teams context information such as chats, teams, and users. The file provides mock data for testing Bot Framework APIs or Bot Builder SDK methods such as `TeamsInfo.getTeamMembers`. If your bot code uses these APIs, you can modify this file to alter the API response.

**Default configuration**

The Test Tool contains a built-in configuration file in the project's root folder.

```yaml
# yaml-language-server: $schema=https://aka.ms/teams-app-test-tool-config/0.1.0/config.schema.json
# Visit https://aka.ms/teams-app-test-tool-config-guide for more details on this file.

# This configuration file customizes the Teams context information like chats, teams and users.
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

**Update the configuration file**

To understand how to update the configuration file, let us take an example of an AzureDevOps notification bot that is installed into a team and fetches inactive bugs from AzureDevOps. It identifies the owners of the inactive bug, fetches their email address, and sends notifications to their personal chat on a daily basis.

To comprehensively test this bot in the Test Tool, it is crucial to update the configuration file to use the email addresses of the owners of the inactive bugs in Azure DevOps.

1. In the `teamsapptesttool.yml` file, go to the `users` section.

1. Update the `name`, `userPrincipleName`, and `email` of the required user.

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
> When you use Visual Studio Code to edit the configuration file, Intellisense will complete the property names for you and warn you if you enter invalid values.

It is vital to recognize that updating the configuration file has three major impacts:

* It influences the responses obtained from Bot Framework Connector APIs (example: `TeamsInfo.getPagedMembers()`).
* It shapes the details in the activity payload (example: `activity.recipient`).
* It impacts the user interface in the Test Tool (example: group chat names).

## Limitations

1. The Test Tool doesn't process the app manifest, which means features that are only enabled through the manifest won't be accessible.

1. The Test Tool doesn't support all other types of Bot application [Cards](../task-modules-and-cards/what-are-cards.md#cards).

1. The Test Tool doesn't support the following Adaptive Card features:

   * [People Picker](../task-modules-and-cards/cards/people-picker.md)
   * [Typeahead search](../task-modules-and-cards/cards/dynamic-search.md)
   * [User mention](../task-modules-and-cards/cards/cards-format.md#microsoft-azure-active-directory-azure-ad-object-id-and-upn-in-user-mention)
   * [Stage View](../task-modules-and-cards/cards/cards-format.md#stage-view-for-images-in-adaptive-cards)
   * [Full width](../task-modules-and-cards/cards/cards-format.md#full-width-adaptive-card)

1. The Test Tool doesn't support the following:

   * Mobile
   * Meetings

1. **Limited emulation**

   | Features | Debug in Test Tool | [Debug your Teams app locally](debug-local.md) |
   | --- | --- | --- |
   | Basic sending / receiving messages | Available | Available |
   | Bot Framework APIs (TeamsInfo.getPagedMembers()...) |Available (respond with mocked data) | Available |
   | Sending Teams events | Available (mocking activity) |Available |
   | Typing indicator | Not Available | Available |
   | Tab, Messaging Extension, Task Module, Single sign-on (SSO), and non-Adaptive Cards | Not Available | Available |

## FAQ

<details>
<summary>How can I test my bot application if some features aren't supported by the Test Tool?</summary>

You can always use the [Teams client](https://teams.microsoft.com/) to test the features that aren't supported in the Test Tool. If you're developing with Teams Toolkit, select the option **Debug (Edge)** or **Debug (Chrome)** to test your application in the Teams client.
<br>
&nbsp;
</details>
<details>
<summary>How would I notice if some features aren't supported in the Test Tool?</summary>

The Test Tool shows a warning message in conversation and log panel when it detects some features aren't supported.

:::image type="content" source="../assets/images/teams-toolkit-v2/debug/features-not-supported.png" alt-text="Screenshot shows the warning message that the feature isn't supported.":::
<br>
&nbsp;
</details>
<details>
<summary>Is it recommended to use only the Test Tool for testing bot applications?</summary>

No. We always recommend users to test their bot application in the Teams client before moving the application to production environment.
<br>
&nbsp;
</details>

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals.md)
* [Install Teams Toolkit](install-Teams-Toolkit.md)
* [Build bots for Teams](../bots/what-are-bots.md)
* [Designing Adaptive Cards for your Microsoft Teams app](../task-modules-and-cards/cards/design-effective-cards.md)
