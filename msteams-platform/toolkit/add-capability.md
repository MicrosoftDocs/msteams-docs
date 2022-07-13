---
title: Add Capabilities to Your Teams apps
author: MuyangAmigo
description:  In this module, learn how to add Capabilities of Teams Toolkit, advantages, limitations and capabilities
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Create a multi-capability Teams app

Teams Toolkit helps you to add additional capability to your existing Teams app using `Add features` under `Development` from the left panel of the Visual Studio Code. The following table lists the Teams app capabilities:

| &nbsp; | **Capability** | **Description** |
| --- | --- | --- |
| **Scenario-based Teams app capability** | &nbsp; | &nbsp; |
| &nbsp; | Notification bot | Notification bots help to send notification to Microsoft Teams through various triggers.|
| &nbsp; | Command bot | Command bots respond to simple commands in Microsoft Teams chat.|
| &nbsp; | SSO-enabled tab | SSO-enabled tabs are Teams identity aware webpages embedded in Microsoft Teams.|
| **Basic Teams app capability** | &nbsp; | &nbsp; |
| &nbsp; | Tabs | Tabs are simple HTML tags that refer to domains declared in the app manifest. You can add tabs as a part of channel inside a team, group chat, or personal app for an individual user.|
| &nbsp; | Bots | Bots help to interact with your web service through text, interactive cards, and task modules.|
| &nbsp; | Message extensions | Message extensions help to interact with your web service through buttons and forms in the Microsoft Teams client.|
| **Cloud resources capability** | &nbsp; | &nbsp; |
| &nbsp; | Azure Functions | Azure Function is a serverless, event-driven compute solution that allows you to write less code.|
| &nbsp; | Azure API Management | Azure API Management is a hybrid, multi-cloud management platform for APIs across all environments.|
| &nbsp; | Azure SQL Database | Azure SQL Database is an always-up-to-date relational database service built for the cloud.|
| &nbsp; | Azure Key Vault | Azure Key Vault is a cloud service for securely storing and accessing secrets.|

## Advantages

The following list provides advantages to add more capabilities in TeamsFx:

* Provides convenience.
* Adds more function to your app by automatically adding source codes using Teams Toolkit.

## Limitations

The following list provides limitations to add more capabilities in TeamsFx:

* You can add tabs up to 16 instances.
* You can add a bot and message extension for one instance each.

## Add capabilities

**You can add capabilities for your Teams app by the following methods:**

* To add capabilities using Teams Toolkit in Visual Studio Code.
* To add capabilities using command palette.

  > [!Note]
  > You need to provision for each environment, after you have successfully added the capabilities in your Teams app.

* **To add capabilities for your Teams app using Teams Toolkit in Visual Studio Code:**

   1. Open **Visual Studio Code**.
   1. Select **Teams Toolkit** from left panel.
   1. Select **Add features** under **DEVELOPMENT**.

       :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/select-feature123.png" alt-text="updated one":::

   1. From the pop-up, select the capability to add in your project.

       :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/notification-add-capabilities.png" alt-text="notification1":::

* **To add capabilities by using command palette:**

   1. Open **command palette**.
   1. Enter **Teams:Add features**.
   1. Press **Enter**.

       :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/Teams-add-features.png" alt-text="team feature":::

   1. From the pop-up, select the capability to add in your project.

       :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/notification-add-capabilities.png" alt-text="notification":::

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

|Existing capabilities|Other supported capabilities|
|--------------------|--------------------|
|Notification bot |SSO-enabled tab, tab|
|Command bot |SSO-enabled tab, tab|
|SSO-enabled tab |SSO-enabled tab, notification bot, command bot, bot, message extension|
|SPFx tab |None|
|Tab |Tab, notification bot, command bot, bot, message extension|
|Bot |Message extension, SSO-enabled tab, tab|
|Message extension |Bot, SSO-enabled tab, tab |

## Project directory structure

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

## Step-by-step guide

* Follow the [step-by-step](../sbs-gs-spfx.yml) guide to build SPFx app in Microsoft Teams

* Follow the [step-by-step](../sbs-gs-commandbot.yml) guide to build command bot in Microsoft Teams

* Follow the [step-by-step](../sbs-gs-notificationbot.yml) guide to build notification bot in Microsoft Teams.

* Follow the [step-by-step](../sbs-gs-javascript.yml) guide to build tab app in Microsoft Teams.

* Follow the [step-by-step](../sbs-gs-bot.yml) guide to build bot app in Microsoft Teams.

* Follow the [step-by-step](../sbs-gs-msgext.yml) guide to build message extension app in Microsoft Teams.

## See also

* [Provision cloud resources](provision.md)
* [Create new Teams project](create-new-project.md)
