---
title: Add Capabilities to Your Teams apps
author: surbhigupta
description:  In this module, learn how to add Capabilities of Teams Toolkit
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Add capabilities to Microsoft Teams app

Adding capabilities with Teams Toolkit allows you to extend the functionality of your existing Microsoft Teams app. The advantage of adding more capabilities is that you can add more functions to your app by using Teams Toolkit to automatically add necessary code and project files. You can select different capabilities based on the app project you've created for your Teams app. The following table lists the Teams app capabilities:

|Capability|Description|Other supported capabilities|
|--------|-------------|-----------------|
|**Basic Teams app**|&nbsp;|&nbsp;|
| **Tab** |  Basic tabs are simple HTML tags that refer to domains declared in the app manifest. You can add tabs as a part of channel inside a team, group chat, or personal app for an individual user.|Basic tab, notification bot, command bot, basic bot, and basic message extension|
| **Bot** |  Bots help to interact with your web service through text, interactive cards, and task modules.|Basic message extension, SSO-enabled tab, and basic tab|
| **Message extension** | Message extensions help to interact with your web service through buttons and forms in the Microsoft Teams client.|Basic bot, SSO-enabled tab, and basic tab|
|**Scenario-based Teams app**|&nbsp;|&nbsp;|
| **Notification bot** | Notification bot proactively sends messages in Teams channel or group chat, or personal chat. You can trigger the notification bot with an HTTP request, such as cards or texts. |SSO-enabled tab and basic tab|
| **Command bot** | Command bot allows you to automate repetitive tasks using a command bot. It responds to simple commands sent in chats with the Adaptive Cards. |SSO-enabled tab and basic tab|
| **Workflow bot** | Workflow bot allows users to interact with an Adaptive Card enabled by the Adaptive Card action handler in the workflow bot app.|SSO-enabled tab and basic tab|
| **SPFx tab** | Microsoft 365 hosts the SPFx tab apps and supports developing and hosting your client-side SharePoint Framework (SPFx) solution.|None|
| **SSO-enabled tab** |You can build SSO-enabled tab app that allows the user access to your app with single sign-on (SSO).|SSO-enabled tab, notification bot, command bot, basic bot, and basic message extension|

> [!NOTE]
> You can add tabs up to 16 instances. You can add one bot and one message extension to each instance at a time.

## Add capabilities

You can add capabilities in the following ways:

* [Use Teams Toolkit pane](#use-teams-toolkit-pane)
* [Use the Command Palette](#use-the-command-palette)
* [Use TeamsFx CLI](#use-teamsfx-cli)

### Use Teams Toolkit pane

   1. Open your app project in **Visual Studio Code**.
   1. Select **Teams Toolkit** from the Visual Studio Code activity bar.
   1. Select **Add features** in the **DEVELOPMENT** section.

       :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/select-feature123_1.png" alt-text="Add capabilities from Teams Toolkit":::

   1. From the dropdown list that appears, select the capability you want to add to your app.

       :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/notification-add-capabilities_1.png" alt-text="notification":::

      Teams Toolkit adds the selected capability to your app and updates the app directory structure for the new capability. After successfully adding the capability to your Teams app, you need to provision for each environment.

### Use the Command Palette

   1. Open your app project in **Visual Studio Code**.

   1. Select **View** > **Command Palette...** or **Ctrl+Shift+P**.

      :::image type="content" source="../assets/images/teams-toolkit-v2/manual/add-capabilities-command-palette_1.png" alt-text="Add capabilities from command palette":::

   1. Select **Teams: Add features**.

      :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/teams-add-features_1.png" alt-text="To add capabilities by using command palette.":::

   1. From the dropdown list that appears, select the capability you want to add to your app.

       :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/notification-add-capabilities_1.png" alt-text="notification":::

      Teams Toolkit adds the selected capability to your app and updates the app directory structure for the new capability. After successfully adding the capability to your Teams app, you need to provision for each environment.

### Use TeamsFx CLI

You can use TeamsFx CLI as an alternative way for adding capabilities to your Teams app project.

This section lists the capabilities you can add to your Teams app using TeamsFx CLI commands. Before you add capabilities to your app, ensure that you’ve changed the directory to your project directory.

The following table lists the capabilities and the TeamsFx CLI commands for adding them:

  |Capability and Scenario| Command|
  |-----------------------|----------|
  |To add notification bot |`teamsfx add notification`|
  |To add command bot |`teamsfx add command-and-response`|
  |To add SSO-enabled tab |`teamsfx add sso-tab`|
  |To add tab |`teamsfx add tab`|
  |To add bot |`teamsfx add bot`|
  |To add message extension |`teamsfx add message extension`|

## Changes after adding capabilities

The following table shows the changes that you can see in the files of your app after adding capabilities:

|Add capability|Description| Changes|
|------------|------------------------|---------|
|Basic bot, basic message extension, and basic tab|Includes a basic bot or basic tab app template into your project.|Teams Toolkit adds a front-end bot or tab template code into a subfolder with path `yourProjectFolder\bot` or `yourProjectFolder\tab`, respectively.|
|Basic bot, message extension, and basic tab |Includes necessary scripts for Visual Studio Code and is executed when you want to debug your app locally. |Teams Toolkit updates the `launch.json` and `task.json` files under the `.vscode` folder. |
|Basic bot and basic message extension|Updates the manifest file for a basic bot or basic tab app. This information represents your app in the Teams Platform.|Teams Toolkit updates the file `manifest.template.json` under `templates\appPackage` folder. The manifest file includes tab-related information that represents your app in the Teams Platform. The changes are visible in the ID of your bot, the scopes of your bot, and the commands that your bot or tab app can respond to.|
|Basic tab|Includes information in the manifest file for a basic bot or basic tab. This information represents your app in the Teams Platform.|Teams Toolkit updates `manifest.template.json` under `templates\appPackage` folder. The manifest file includes tab-related information that represents your app in the Teams Platform. The changes are visible in the configurable and static tabs and scopes of the tabs.|
|Basic bot, basic message extension, and basic tab|Includes information in TeamsFx for a basic bot or tab app. It also includes provision files that are for integrating Azure Functions.|Files under `templates\azure\teamsfx` are updated and `templates\azure\provision\xxx.bicep` files are regenerated.|
|Basic bot, basic message extension, and basic tab|Ensures that you've set up your project with the right configuration for the newly added capability.|Teams Toolkit regenerates the files under `.fx\config`.|

## Step-by-step guides

* Follow the [step-by-step](../sbs-gs-commandbot.yml) guide to build command bot in Teams.

* Follow the [step-by-step](../sbs-gs-notificationbot.yml) guide to build notification bot in Teams.

* Follow the [step-by-step](../sbs-gs-workflow-bot.yml) guide to build workflow bot in Teams.

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals.md)
* [Build bots for Teams](../bots/what-are-bots.md)
* [Build tabs for Teams](../tabs/what-are-tabs.md)
* [Build message extensions for Teams](../messaging-extensions/what-are-messaging-extensions.md)
* [App manifest schema](../resources/schema/manifest-schema.md)
* [Authenticate users in Microsoft Teams](../concepts/authentication/authentication.md)
* [Provision cloud resources](provision.md)
* [Create new Teams project](create-new-project.md)
* [Combine bots with tabs](../resources/bot-v3/bots-with-tabs.md)
