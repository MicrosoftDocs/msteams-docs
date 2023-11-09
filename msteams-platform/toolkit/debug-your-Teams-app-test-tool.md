---
title: Debug your Teams app test tool
author: surbhigupta 
description: In this module, learn how to debug your Teams app test tool and key features of Teams app test tool.
ms.author: surbhigupta 
ms.localizationpriority: high
ms.topic: overview
ms.date: 11/03/2023
---

# Teams App Test Tool

Teams App Test Tool, also known as the Test Tool, is a component integrated into the Teams Toolkit. This tool assists users in debugging, testing, and refining the app design of a Teams bot application. It provides a web-based chat environment that replicates the behavior, appearance, and user experience of Microsoft Teams.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/test-tool.png" alt-text="Screenshot shows the Teams app test tool Adaptive Card.":::

## Features

The Teams App Test Tool assists users in testing and debugging their Teams bot applications and following are the key features:

1. **Sandbox Environment**: The tool provides a web-based chat environment that emulates the behavior, look, and user experience of Microsoft Teams. This tool allows users to test and debug their bot application in a controlled environment.

1. **Tunneling**: With the Test Tool, users don't need to set up a tunnel with [Ngrok](https://ngrok.com/download) or [Microsoft Dev Tunnel](/azure/developer/dev-tunnels/overview)to expose their local bot application to the internet.

1. **Reduce Local Debugging**: Ensure you meet the [prerequisites](tools-prerequisites.md#accounts-to-build-your-teams-app) to secure a Microsoft 365 Developer tenant and the app uploading permissions before you debug the Teams bot applications.

1. **Rapid Inner-Loop Iterations**: Optimize the process of making changes to the app design and bot logic without having to redeploy the bot application to the cloud.

1. **Mock Data and Activities**: The test tool makes it easy to accomplish a test for complex scenarios such as **Send a welcome message when a new member joins the channel** by using mock data and built-in and custom activity triggers.

1. **Reliable and Trustable**: The test tool is reliable as the Bot application UX [Adaptive Card](../task-modules-and-cards/cards/cards-reference.md#adaptive-card) utilizes the same rendering technology as in Microsoft Teams.

1. **Integration with Existing Teams Bot Applications**: The test tool can be integrated with existing Teams bot applications that are built with [Bot Framework SDK](https://dev.botframework.com/).

1. **Support for Different Scopes**: The tool supports testing in different scopes (personal, team, group chat), allowing developers to ensure their bot works correctly in all the scopes.

## Limitations: 

The following are the limitations to Test Tool: 

1. Limited Emulation: The tool attempts to emulate the behavior, appearance, and user experience of Microsoft Teams, but it doesn't capture every aspect of the Teams environment completely. There could be some variations in behavior between the tool and the actual Teams application.

1. The Test Tool doesn't support all other types of Bot application UX [Cards](https://learn.microsoft.com/microsoftteams/platform/task-modules-and-cards/what-are-cards) other than Adaptive Cards.

1. The Test Tool doesn't process the app manifest, which means features that are only enabled through the manifest won't be accessible.
 
1. The Test Tool doesn't support Single sign-on (SSO), mobile view, and meetings.

## Explore Teams App Test Tool

### Teams Toolkit samples and templates

The testing of the bot sample, which displays the features supported by the Teams App Test Tool, proceeds as follows:

1. Download the latest [bot sample](https://github.com/OfficeDev/TeamsAppTestTool/releases/tag/0.1.0-alpha.230921.7a4a1d9).
 
1. Extract the files from the zip folder.

1. Open the sample in Visual Studio Code with Teams Toolkit installed.

1. Select F5.

A browser window pops out with list of options.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/test-tool.png" alt-text="Screenshot shows the Teams app test tool Adaptive Card.":::

### Use Custom Activity

If your app handles events such as conversationUpdate, reactionsAdded, etc., by implementing handlers such as onMembersAdded, onChannelDelete, etc., you can use mocked activity for updates. This removes the need to add users in a chat or delete a channel in Teams.

**Predefined Mocked Activities**

The test tool has predefined activity types in the `Mock an Activity` menu dropdown list.

1. Select a predefined activity, for example, `Add a user` and a pop-up appears to preview the activity handler.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/mock-activity.png" alt-text="Screenshot shows the list of option under mock an activity.":::

1. Select `Send Activity`. 

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/add-a-user-request.png" alt-text="Scrrenshot shows the option to send activity for predefined mock activity add user.":::

   Bot sends a response.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/add-a-user-response.png" alt-text="Screenshot shows the response of predefined mock activity add user.":::

**Customized Mocked Activities**

1. Select **Custom activity**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/mock-activity.png" alt-text="Screenshot shows the list of option under mock an activity.":::

1. Add `reactionsAdded` as customized activity and select `Send Activity`.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/custom-activity-request.png" alt-text="Screenshot shows the option to send activity after customization on mock activity.":::

   Bot sends a `onReactionsAdded` handler response invoked with the activity defined.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/custom-activity-response.png" alt-text="Screenshot shows the response of custom mock activity.":::

### Use Config

The customization of mock data in the Teams App Test Tool is achieved through the `.teamsapptesttool.yml` configuration file. This file enables developers to effectively interact with external APIs.

**Use config file**

The bot is installed into Teams and fetches inactive bugs from Azure DevOps. It identifies the owner's email address and sends personal notification chats.

For the bot within the test tool, it's necessary to adapt the config file to utilize real email addresses that match Azure DevOps user email addresses. In the `.teamsapptesttool.yml` file, go to the users section and adjust the email properties as per user requests is shown in the snippet.

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

**Default config**

The test tool contains a built-in config file in project root folder.

```yaml
# yaml-language-server: $schema=https://aka.ms/teams-app-test-tool-config/0.1.0/config.schema.json
# Visit https://aka.ms/teams-app-test-tool-config-guide for details on this file

# The config file is for customization of Teams context information like chats, teams and users.
# It is mockup data for testing Bot Framework APIs (or botbuilder SDK methods like TeamsInfo.getTeamMembers()).
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

### Use Test Tool in Existing App(SBS)


## FAQ

<details>
<summary>What should I do when some features I use in my bot application aren't supported in the Test Tool?</summary>

You can always use the [Microsoft Teams client](https://teams.microsoft.com/) to test the features that aren't supported in the Test Tool. If you're developing with Teams Toolkit, select the option `Debug (Edge)` or `Debug (Chrome)` to test your application in the Microsoft Teams client.
<br>
&nbsp;
</details>
<details>
<summary>How would I notice if some features aren't supported in the Test Tool?</summary>

The Test Tool shows a warning message in conversation and log panel when it detects some features aren't supported.
![Cliff](https://github.com/OfficeDev/TeamsFx/assets/11220663/130118cf-c2e1-4b49-8f4a-919cb4c50e0a)
<br>
&nbsp;
</details>
<details>
<summary>Should I solely rely on the test tool to test my bot application?</summary>

No. We always recommend developers to test their bot application in the Microsoft Teams client before moving the application to production environment.
<br>
&nbsp;
</details>

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals.md)
* [Build your first app using Teams AI library](sbs-botbuilder-conversation-AI.yml)
