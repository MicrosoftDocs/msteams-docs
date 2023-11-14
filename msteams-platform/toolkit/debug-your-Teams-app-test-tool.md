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
> Ensure the prerelease version of Teams Toolkit is installed. For more information, see [install a prerelease version](install-Teams-Toolkit.md#install-a-pre-release-version).

The Teams App Test Tool (Test Tool) is a component integrated into the Teams Toolkit. The tool assists users to debug, test, and refine the app design of a Teams bot application. It provides a web-based chat environment that replicates the behavior, appearance, and user experience of Microsoft Teams.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/test-tool.png" alt-text="Screenshot shows the Teams App Test Tool Adaptive Card.":::

## Explore Test Tool

### Advantages

The Test Tool offers the following benefits:

1. **Sandbox environment**: Sandbox environment emulates the behavior, look and user experience of Teams.

1. **Tunneling**: Tunnel service is not required as it runs locally.

1. **Reduce account dependencies**: Microsoft 365 Developer tenant and the app uploading permissions aren't required to debug the bot application.

1. **Rapid inner-loop iterations**: Optimizes the process of making changes to the app design and bot logic without having to redeploy the bot application to the cloud.

1. **Mock data and activities**: The Test Tool makes it easy to accomplish a test for complex scenarios such as **Send a welcome message when a new member joins the channel** by using mock data and built-in and custom activity triggers.

1. **Reliable and trustable**: The Test Tool is reliable as the Bot application [Adaptive Card](../task-modules-and-cards/cards/cards-reference.md#adaptive-card) utilizes the same rendering technology as in Teams.

1. **Integration with existing Teams bot applications**: The Test Tool can be integrated with existing Teams bot applications that are built with [Bot Framework SDK](https://dev.botframework.com/).

1. **Support for different scopes**: The Test Tool supports testing in personal, team, and group chat scopes.

### Limitations

The following are the limitations:

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

### Teams Toolkit samples and templates

Test the bot sample, which displays the features supported by the Test Tool, as follows:

1. Open [TeamsFx-Samples](https://github.com/OfficeDev/TeamsFx-Samples/tree/v3).

1. Select **Code**.

1. From the dropdown menu, select **Open with GitHub Desktop**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/test-tool-clone-repository.png" alt-text="Screenshot show the option to clone repository in local.":::

1. Select **Clone**.

1. Open the **test-tool-sample-app** folder in Visual Studio Code with Teams Toolkit.

1. From the left pane, select **Run and Debug** (`Ctrl+Shift+D`) and select **Debug in Test Tool** in dropdown list.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/select-debug-in-test-tool.png" alt-text="Screenshot shows the option to select debug in test tool.":::

1. Select **F5**.

1. Type **help** command.

A webpage opens with a list of commands.

  :::image type="content" source="../assets/images/teams-toolkit-v2/debug/test-tool.png" lightbox="../assets/images/teams-toolkit-v2/debug/test-tool.png" alt-text="Screenshot shows the Teams App Test Tool Adaptive Card.":::

### Use custom activity

**Predefined mocked activities**

The Test Tool has predefined activity types in the **Mock an Activity** dropdown list.

To test the predefined mock activities, follow these steps:

1. Select **Mock an Activity** > **Add a user** and a pop-up window appears to preview the activity handler.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/mock-activity.png" alt-text="Screenshot shows the list of option under mock an activity.":::

1. Select **Send activity**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/add-a-user-request.png" alt-text="Screenshot shows the option to send activity for predefined mock activity add user.":::

   Bot sends a response.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/add-a-user-response.png" alt-text="Screenshot shows the response of predefined mock activity add user.":::

**Customize mocked activities**

The Test Tool has customized option in the **Mock an Activity** dropdown list.

To test the customize mocked activities, follow these steps:

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

### Customize Teams context

The config file allows you to customize Teams context information such as chats, teams, and users. It provides mockup data for testing Bot Framework APIs or bot builder SDK methods like `TeamsInfo.getTeamMembers`. If your bot code uses these APIs, you can modify this file to alter the API response.

**Default config**

The Test Tool contains a built-in config file in project root folder.

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

**Update config file**

A bot is installed into Teams and fetches inactive bugs and identifies the owner's email address and sends personal notification chats.

For the bot within the Test Tool, it's necessary to adapt the config file to utilize real email addresses that match the user email addresses.

To update the config file, follow these steps:

1. In the `teamsapptesttool.yml` file, go to the `users` section.

1. Update the `name`, `userPrincipleName`, and `email` properties with the required user.

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
<summary>Is it recommended to use only the Test Tool for testing my bot application?</summary>

No. We always recommend users to test their bot application in the Teams client before moving the application to production environment.
<br>
&nbsp;
</details>

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals.md)
* [Install Teams Toolkit](install-Teams-Toolkit.md)
* [Build your first app using Teams AI library](../sbs-botbuilder-conversation-AI.yml)
* [Teams AI library](../bots/how-to/Teams%20conversational%20AI/teams-conversation-ai-overview.md)
* [TeamsFx command line interface](TeamsFx-CLI.md)
