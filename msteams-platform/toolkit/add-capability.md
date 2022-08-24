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

Adding capabilities with Teams Toolkit helps you to include additional features to your existing Teams app. The advantage of adding more capabilities is that you can add more function to your app by automatically adding source codes using Teams Toolkit. The following table lists the Teams app capabilities:

|**Capability**|**Description**|
|--------|-------------|
|**Basic Teams app**|              |
| Tabs |  Tabs are simple HTML tags that refer to domains declared in the app manifest. You can add tabs as a part of channel inside a team, group chat, or personal app for an individual user.|
| Bots |  Bots help to interact with your web service through text, interactive cards, and task modules.|
| Message extensions | Message extensions help to interact with your web service through buttons and forms in the Microsoft Teams client.|
|**Scenario-based Teams app**|             |
| Notification bot | Notification bot proactively sends messages in Teams channel or group chat or personal chat. You can trigger the notification bot with a HTTP request, such as cards or texts. |
| Command bot | Command bot allows you to automate repetitive tasks using a command bot. It responds to simple commands sent in chats with adaptive cards. |

> [!NOTE]
> You can add tabs up to 16 instances. As for your bot and message extension, you can add one for each instance at a time.

## Add capabilities

You can add capabilities by the following methods:

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

## Capabilities available for different Teams project

You can choose to add different capabilities based on project you've created in your Teams app.
The following table lists the capabilities available that can be added in your project:

|Existing app capabilities|Other supported capabilities|
|--------------------|--------------------|
|SPFx tab |None|
|SSO-enabled tab |SSO-enabled tab, notification bot, command bot, bot, message extension|
|Notification bot |SSO-enabled tab, tab|
|Command bot |SSO-enabled tab, tab|
|Tab |Tab, notification bot, command bot, bot, message extension|
|Bot |Message extension, SSO-enabled tab, tab|
|Message extension |Bot, SSO-enabled tab, tab |

## Changes after adding capabilities

The following table shows the changes that can be seen in the files of your app when adding the capabilities:

|**Add capability**|**Changes**|**Description**|
|------------------|-----------|---------------|
|Bot and message extension  |A bot template code is added into a subfolder with path `yourProjectFolder/bot`|Includes a **hello world** bot application template into your project.|
|         |Files `launch.json` and `task.json` under `.vscode` folder are updated.| Includes necessary scripts for Visual Studio Code, and is executed when you want to debug your application locally.|
|         |File`manifest.template.json` under `templates/appPackage` folder is updated.|Includes bot related information in the manifest file that represents your application in Teams Platform.|The changes are visible in ID of your bot, scopes of your bot, and The commands that hello world bot application can respond to.|
|         |Files under `templates/azure/teamsfx` are updated, and `templates/azure/provision/xxx`.bicep files are regenerated.|           |
|         |Files under `.fx/config` are regenerated| Ensures your project is set with right configurations for newly added capability.|
| Tab     |A frontend tab template code is added into a subfolder with path `yourProjectFolder/tab`.|Includes a **hello world** tab application template into your project.|
|         |Files `launch.json` and `task.json` under `.vscode` folder are updated|Includes necessary scripts for Visual Studio Code, and is executed when you want to debug your application locally.|
|         |`manifest.template.json` file under `templates/appPackage` folder is updated.| Includes tab-related information in the manifest file that represents your application in the Teams Platform.| The changes are visible in configurable and static tabs, and scopes of the tabs.|
|         |Files under `templates/azure/teamsfx` are updated, and `templates/azure/provision/xxx`.bicep file is regenerated.|            |
|         |File under `.fx/config` is regenerated, which ensures your project is set with right configurations for newly added capability.|           |

## Step-by-step guide

* Follow the [step-by-step](../sbs-gs-commandbot.yml) guide to build command bot in Microsoft Teams

* Follow the [step-by-step](../sbs-gs-notificationbot.yml) guide to build notification bot in Microsoft Teams.

## See also

* [Provision cloud resources](provision.md)
* [Create new Teams project](create-new-project.md)
