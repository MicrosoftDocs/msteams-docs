---
title: Add Capabilities to Your Teams apps
author: surbhigupta
description:  In this module, learn how to add Capabilities of Teams Toolkit
ms.author: v-amprasad
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Add capabilities to Microsoft Teams app

Adding capabilities with Teams Toolkit allows you to extend the functionality of your existing Microsoft Teams app. The advantage of adding more capabilities is that you can add more functions to your app by using Teams Toolkit to automatically add  necessary  codes. You can select different capabilities based on project you've created in your Teams app. The following table lists the Teams app capabilities:

|Capability|Description|Other supported capabilities|
|--------|-------------|-----------------|
|**Basic Teams app**|              |
| **Tab** |  Tabs are simple HTML tags that refer to domains declared in the app manifest. You can add tabs as a part of channel inside a team, group chat, or personal app for an individual user.|Tab, notification bot, command bot, bot, and message extension|
| **Bot** |  Bots help to interact with your web service through text, interactive cards, and task modules.|Message extension, SSO-enabled tab, and tab|
| **Message extension** | Message extensions help to interact with your web service through buttons and forms in the Microsoft Teams client.|Bot, SSO-enabled tab, and tab|
|**Scenario-based Teams app**|             |
| **Notification bot** | Notification bot proactively sends messages in Teams channel or group chat, or personal chat. You can trigger the notification bot with a HTTP request, such as cards or texts. |SSO-enabled tab and tab|
| **Command bot** | Command bot allows you to automate repetitive tasks using a command bot. It responds to simple commands sent in chats with the Adaptive Cards. |SSO-enabled tab and tab|
| **Workflow bot** | Workflow bot allows users to interact with an Adaptive Card enabled by the Adaptive Card action handler feature in the workflow bot app.|SSO-enabled tab and tab|
| **SPFx tab** | SPFx tab apps are hosted in Microsoft 365 and it supports developing and hosting your client-side SharePoint Framework (SPFx) solution.|None|
| **SSO-enabled tab** |You can build SSO-enabled tab app that allows the user with single sign-on (SSO) feature.|SSO-enabled tab, notification bot, command bot, bot, and message extension|

> [!NOTE]
> You can add tabs up to 16 instances. You can add one bot and one message extension to each instance at a time.

## Add capabilities

You can add capabilities in the following ways:

* [Use Teams Toolkit in Microsoft Visual Studio Code](#use-teams-toolkit-in-microsoft-visual-studio-code)
* [Use the Command Palette](#use-the-command-palette)
* [Use TeamsFx CLI](#use-teamsfx-cli)

### Use Teams Toolkit in Microsoft Visual Studio Code

   1. Open **Visual Studio Code**.
   1. Select **Teams Toolkit** from the Visual Studio Code activity bar.
   1. Select **Add features** under **DEVELOPMENT**.

       :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/select-feature123_1.png" alt-text="Add capabilities from Teams Toolkit":::

      > [!NOTE]
      > After successfully adding the capabilities to your Teams app, you need to provision for each environment.

### Use the Command Palette

   1. Select **View** > **Command Palette...** or **Ctrl+Shift+P**.

      :::image type="content" source="../assets/images/teams-toolkit-v2/manual/add-capabilities-command-palette_1.png" alt-text="Add capabilities from command palatte":::

   1. Select **Teams: Add features**.

      :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/teams-add-features_1.png" alt-text="To add capabilities by using command palette.":::

   1. In the pop-up window that appears, select the capability you need to add in your project.

       :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/notification-add-capabilities_1.png" alt-text="notification":::

### Use TeamsFx CLI

* Change the directory to your **project directory**.
* The following table lists the capabilities and required commands:

  |Capability and Scenario| Command|
  |-----------------------|----------|
  |To add notification bot |`teamsfx add notification`|
  |To add command bot |`teamsfx add command-and-response`|
  |To add SSO-enabled tab |`teamsfx add sso-tab`|
  |To add tab |`teamsfx add tab`|
  |To add bot |`teamsfx add bot`|
  |To add message extension |`teamsfx add message extension`|

## Changes after adding capabilities

The following table shows the changes that you can see in the files of your app when adding the capabilities:

|Add capability|Description| Changes|
|------------|------------------------|---------|
|Bot, message extension, and tab|Includes a **HelloWorld**&nbsp;bot or tab app template into your project.|A front-end bot or tab template code is added into a subfolder with path `yourProjectFolder\bot` or `yourProjectFolder\tab` respectively.|
| Bot, message extension, and tab |Includes necessary scripts for Visual Studio Code and is executed when you want to debug your app locally. |Files `launch.json` and `task.json` under `.vscode` folder are updated.|
| Bot and message extension|Includes bot or tab-related information in the manifest file that represents your app in the Teams Platform.|File `manifest.template.json` under `templates\appPackage` folder is updated, which includes tab-related information in the manifest file that represents your app in the Teams Platform. The changes are visible in the ID of your bot, the scopes of your bot, and the commands that **HelloWorld** bot or tab app can respond to.|
|Tab|Includes bot or tab-related information in the manifest file that represents your app in the Teams Platform.|File `manifest.template.json` under `templates\appPackage` folder is updated, which includes tab-related information in the manifest file that represents your app in the Teams Platform. The changes are visible in the configurable and static tabs and scopes of the tabs.|
|Bot, message extension, and tab|Includes bot or tab-related&nbsp;information in the teamsfx and provision files that are for integrating Azure Functions.|Files under `templates\azure\teamsfx` are updated and `templates\azure\provision\xxx.bicep` files are regenerated.|
|Bot, message extension, and tab|Ensure that your project is set up with the right configurations for the newly added capability.|Files under `.fx\config` are regenerated.|

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
