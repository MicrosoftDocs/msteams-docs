---
title: Add Capabilities to Your Teams apps
author: surbhigupta
description:  In this module, learn how to add Capabilities of Teams Toolkit
ms.author: v-amprasad
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Add capabilities to Microsoft Teams apps

Adding capabilities with Teams Toolkit helps you to include additional features to your existing Teams app. The advantage of adding more capabilities is that you can add more function to your app by automatically adding source codes using Teams Toolkit. You can also choose different capabilities based on project you've created in your Teams app. The following table lists the Teams app capabilities:

|Capability|Description|Other supported capabilities|
|--------|-------------|-----------------|
|**Basic Teams app**|              |
| Tab |  Tabs are simple HTML tags that refer to domains declared in the app manifest. You can add tabs as a part of channel inside a team, group chat, or personal app for an individual user.|Tab, notification bot, command bot, bot, message extension|
|SPFx tab| SPFx tab apps is hosted in Microsoft 365 and it supports developing and hosting your client-side SPFx solution|None|
|SSO-enabled tab|You can build SSO-enabled tab app that allows the user with single sign on feature|SSO-enabled tab, notification bot, command bot, bot, message extension|
| Bot |  Bots help to interact with your web service through text, interactive cards, and task modules.|Message extension, SSO-enabled tab, tab|
| Message extension | Message extensions help to interact with your web service through buttons and forms in the Microsoft Teams client.|Bot, SSO-enabled tab, tab|
|**Scenario-based Teams app**|             |
| Notification bot | Notification bot proactively sends messages in Teams channel or group chat or personal chat. You can trigger the notification bot with a HTTP request, such as cards or texts. |SSO-enabled tab, tab|
| Command bot | Command bot allows you to automate repetitive tasks using a command bot. It responds to simple commands sent in chats with adaptive cards. |SSO-enabled tab, tab|

> [!NOTE]
> You can add tabs up to 16 instances. As for your bot and message extension, you can add one for each instance at a time.

## Add capabilities

You can add capabilities by the following methods:

* [Using Teams Toolkit in Microsoft Visual Studio Code](#using-teams-toolkit-in-microsoft-visual-studio-code)
* [Using the Command Palette](#using-the-command-palette)
* [Using TeamsFx CLI](#using-teamsfx-cli)

### Using Teams Toolkit in Microsoft Visual Studio Code

   1. Open **Visual Studio Code**.
   1. Select **Teams Toolkit** from the activity bar.
   1. Select **Add features** under **DEVELOPMENT**.

       :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/select-feature123.png" alt-text="Add capabilities from Teams Toolkit":::

      > [!NOTE]
      > After successfully adding the capabilities in your Teams app, you need to provision for each environment.

### Using the Command Palette

   1. Select **View** > **Command Palette...** or **Ctrl+Shift+P**.

      :::image type="content" source="../assets/images/teams-toolkit-v2/manual/add-capabilities-command-palette.png" alt-text="Add capabilities from command palatte":::

   1. Enter **Teams: Add features**.
   1. Press enter.

      :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/teams-add-features.png" alt-text="To add capabilities by using command palette.":::

   1. From the pop-up, select the capability you need to add in your project.

       :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/notification-add-capabilities.png" alt-text="notification":::

### Using TeamsFx CLI

* Change directory to your **project directory**.
* The following table lists the capabilities and required commands:

  |Capability and Scenario| Command|
  |-----------------------|----------|
  |To add notification bot |`teamsfx add notification`|
  |To add command bot |`teamsfx add command-and-response`|
  |To add sso-enabled tab |`teamsfx add sso-tab`|
  |To add tab |`teamsfx add tab`|
  |To add bot |`teamsfx add bot`|
  |To add message extension |`teamsfx add message extension`|

## Changes after adding capabilities

The following table shows the changes that can be seen in the files of your app when adding the capabilities:

|Add capability|Description| Changes|
|------------|------------------------|---------|
|Bot, message extension and tab|Includes a **hello world**&nbsp;bot or tab application template into your project.|A frontend bot or tab template code is added into a subfolder with path `yourProjectFolder/bot` or `yourProjectFolder/tab` respectively.|
| Bot, message extension and tab |Includes necessary scripts for Visual Studio Code, and is executed when you want to debug your application locally. |Files `launch.json` and `task.json` under `.vscode` folder are updated.|
| Bot and message extension|Includes bot or tab-related information in the manifest file that represents your application in Teams Platform.|File`manifest.template.json` under `templates/appPackage` folder is updated, which includes tab-related information in the manifest file that represents your application in the Teams Platform. The changes are visible in ID of your bot, scopes of your bot, and the commands that hello world bot or tab application can respond to.|
|Tab|Includes bot or tab-related information in the manifest file that represents your application in Teams Platform.|File`manifest.template.json` under `templates/appPackage` folder is updated, which includes tab-related information in the manifest file that represents your application in the Teams Platform. The changes are visible in configurable and static tabs, and scopes of the tabs.|
|Bot, message extension and tab|Includes bot or tab-related&nbsp;information in the teamsfx and provision files that are for integrating Azure functions.|Files under `templates/azure/teamsfx` are updated, and `templates/azure/provision/xxx`.bicep files are regenerated.|
|Bot, message extension and tab|Ensures your project is set with right configurations for newly added capability.|Files under `.fx/config` are regenerated|

## Step-by-step guide

* Follow the [step-by-step](../sbs-gs-commandbot.yml) guide to build command bot in Microsoft Teams

* Follow the [step-by-step](../sbs-gs-notificationbot.yml) guide to build notification bot in Microsoft Teams.

## See also

* [Provision cloud resources](provision.md)
* [Create new Teams project](create-new-project.md)
