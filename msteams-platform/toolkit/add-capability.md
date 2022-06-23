---
title: Add Capabilities to Your Teams apps
author: MuyangAmigo
description:  In this module, learn how to add Capabilities of Teams Toolkit, advantages, limitations and capabilities
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Add capabilities to Teams apps

Add capability in Teams Toolkit helps you to add additional capability to your existing Teams app.The following table lists the Teams app capabilities:

|**Capability**|**Description**|
|--------|-------------|
| Tabs |  Tabs are simple HTML tags that refer to domains declared in the app manifest. You can add tabs as a part of channel inside a team, group chat, or personal app for an individual user.|
| Bots |  Bots help to interact with your web service through text, interactive cards, and task modules.|
| Message extensions | Message extensions help to interact with your web service through buttons and forms in the Microsoft Teams client.|

## Advantages

The following list provides advantages to add more capabilities in TeamsFx:

* Provides convenience.
* Adds more function to your app by automatically adding source codes using Teams Toolkit.

## Limitations

The following list provides limitations to add more capabilities in TeamsFx:

* You can add tabs up to 16 instances.
* You can add a bot and message extension for one instance each.

## Describe Tab features and Scenerios to add features

## Describe Bot features and Scenerios to add features

## Describe Message Extension features and Scenerios to add features

## Describe Notification Bot features and Scenerios to add features

## Describe Command Bot features and Scenerios to add features

## Describe SSO enabled tab features and Scenerios to add features

## Add capabilities

**You can add capabilities by the following methods:**

* To add capabilities by using Teams Toolkit in Visual Studio Code.
* To add capabilities by using command palette.

  > [!Note]
  > You need to provision for each environment, after you have successfully added the capabilities in your Teams app.

* **To add capabilities by using Teams Toolkit in Visual Studio Code:**

   1. Open **Visual Studio Code**.
   1. Select **Teams Toolkit** from left panel.
   1. Select **Add features** under **DEVELOPMENT**.

       :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/select-feature123.png" alt-text="updated one" border="true":::

* **To add capabilities by using command palette:**

   1. Open **command palette**.
   1. Enter **Teams:Add features**.
   1. Press **Enter**.

       :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/Teams-add-features.png" alt-text="team feature" border="true":::

   1. From the pop-up, select the capability to add in your project.

       :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/notification-add-capabilities.png" alt-text="notification" border="true":::

## Add capabilities using TeamsFx CLI

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

## Available capabilities to add for different Teams project

You can choose to add different capabilities based on project you have created in Teams app.
The following table lists the available capabilities to add in your project:

**We need to mention about other supported capabilities for SSO enabled personal tab and Search based message extension capability**.

|Existing capabilities|Other supported capabilities|
|--------------------|--------------------|
|SPFx tab |None|
|SSO-enabled tab |SSO-enabled tab, notification bot, command bot, bot, message extension|
|Notification bot |SSO-enabled tab, tab|
|Command bot |SSO-enabled tab, tab|
|Tab |Tab, notification bot, command bot, bot, message extension|
|Bot |Message extension, SSO-enabled tab, tab|
|Message extension |Bot, SSO-enabled tab, tab |

## Add bot, tab and message extension

After adding a bot and message extension, the changes in your project are as follows:

* A bot template code is added into a subfolder with path `yourProjectFolder/bot`. This includes a **hello world** bot application template into your project.
* `launch.json` and `task.json` under `.vscode` folder are updated, which includes necessary scripts for Visual Studio Code, and is executed when you want to debug your application locally.
* `manifest.template.json` file under `templates/appPackage` folder is updated, which includes the bot related information in the manifest file that represents your application in the Teams Platform. The changes are as follows:
  * The ID of your bot
  * The scopes of your bot
  * The commands that hello world bot application can respond to
* The files under `templates/azure/teamsfx` are be updated, and `templates/azure/provision/xxx`.bicep files are regenerated.
* The files under `.fx/config` are regenerated, which ensures your project is set with right configurations for newly added capability.

After adding tab, the changes in your project are as follows:

* A frontend tab template code is added into a subfolder with path `yourProjectFolder/tab`, which includes a **hello world** tab application template into your project.
* `launch.json` and `task.json` under `.vscode` folder are updated, which includes necessary scripts for Visual Studio Code, and is executed when you want to debug your application locally.
* `manifest.template.json` file under `templates/appPackage` folder is updated, which includes tab-related information in the manifest file that represents your application in the Teams Platform. The changes are:
  * The configurable and static tabs
  * The scopes of the tabs
* The files under `templates/azure/teamsfx` will be updated, and `templates/azure/provision/xxx`.bicep file will be regenerated.
* The file under `.fx/config` are regenerated, which ensures your project is set with right configurations for newly added capability.

**After adding Notification bot, Command bot, SSO enabled tab, the changes in your project to be explained**.

## Step-by-step guide

* Follow the [step-by-step](../sbs-gs-commandbot.yml) guide to build command bot in Microsoft Teams

* Follow the [step-by-step](../sbs-gs-notificationbot.yml) guide to build notification bot in Microsoft Teams.

## See also

* [Provision cloud resources](provision.md)
* [Create new Teams project](create-new-project.md)
