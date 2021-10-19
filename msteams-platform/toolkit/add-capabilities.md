---
title: Add capabilities
author: Rajeshwari-v
description:  Describes how to add capabilities.
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: overview
---

# Add Capabilities

You can start to create a Teams app with Visual Studio Code by adding capabilities, such as tabs, bots and messaging extensions. The following table describes the different capabilities:

| **Capability**| **Description**|
|--------|-------------|
| Tabs |  Tabs are Teams-aware simple HTML tags that point to domains declared in the app manifest. You can add tabs as part of a channel inside a team, group chat, or personal app for an individual user.|
| Bots |  Bots help to interact with your web service through text, interactive cards, and task modules.|
| Messaging extensions | Messaging extensions help to interact with your web service through buttons and forms in the Microsoft Teams client.|

For more information on Teams app capabilities, see [Understand app capabilities](~/concepts/capabilities-overview.md#app-capabilities).

## Prerequisite

To add capabilities using Visual Studio Code, you must install Teams Toolkit V2.

## Limitations to add capabilities

Currently, there are limitations with TeamsFx while adding more capabilities, you cannot add:

* each project capability more than once
* any capability if you start with a Tab application with SPFx
* additional bot capabilities if your project contains messaging extension
* additional messaging extension if your project contains a bot.

> [!NOTE]
> If you want to include both bot and messaging extension capabilities, then select them at the same time. You can add them either when you create a new project or a tab application.

**Support Matrix:**

The following table provides the list of current capabilities and additional capabilities they support.

|Current capabilities|Additional capabilities|
|--------------------|--------------------|
|Tabs with SPFx|None|
|Tabs with Azure|Bots and messaging extensions|
|Bots|Tabs|
|Messaging extensions|Tabs|
|Tabs and bots|None|
|Tabs and messaging extensions|None|
|Tabs, bots and messaging extensions|None|

## Procedure to add capabilities

You can add capabilities in the following ways:

### Add capabilities from Teams Toolkit in Visual Studio Code

1. Select **Teams Toolkit** from side panel.

    ![Teams Toolkit](~/assets/images/tools-and-sdks/teams-toolkit.png)
  
1. Select **Create new Teams app** from the Teams Toolkit sidebar.

    ![Create a new teams app](~/assets/images/tools-and-sdks/Create-new-teams-app.png)
 
1. From the pop-up, select the **Create a new Teams app**.

    ![Create new Teams](~/assets/images/tools-and-sdks/create-new-app.png)
 
1. Choose any **App capability** from the given options.

    ![Select app capability](~/assets/images/tools-and-sdks/select-app-capability.png)

 
### Add capabilities from TeamsFx CLI in Command Window

1. Change directory to your project directory.
1. Execute following command to add different capabilities:

|Capability and Scenario| Command|
|-----------------------|----------|
|To add a tab|`teamsfx capability add tab`|
|To add a bot with new bot registration|`teamsfx capability add bot --way-to-register-bot create-new`|
|To add a bot with existing bot registration|`teamsfx capability add bot --way-to-register-bot reuse-existing --bot-id your-bot-id --bot-password your-bot-password`|
|To add a messaging extension with new bot registration	|`teamsfx capability add messaging-extension --way-to-register-bot create-new`|
|To add a messaging extension with existing bot registration|`teamsfx capability add messaging-extension --way-to-register-bot reuse-existing --bot-id your-bot-id --bot-password your-bot-password`|

## Add additional capabilities

After adding capabilities, the following are the changes reflected to your project:

|Capability Added|What changed|Why these changes are made|
|-------------------|---------------|-------------------------|
|Bot and Messaging Extension|A bot template code is added into a subfolder with path `yourProjectFolder/bot` </br></br> `launch.json` and `task.json` updated under `.vscode` folder. </br> </br> `manifest.source.json` file under `appPackage` folder.</br></br> `env.default.json` and `settings.json` under `.fx` folder.|To include a hello world bot application template into your project. </br><br/>To include necessary scripts for Visual Studio Code is executed when you want to debug your application locally.</br><br/> Learn more in local debug section. (Link to local debug document)</br><br/> To include bot related information in the manifest file that represents your application in the Teams Platform, the change includes: </br> The ID of your bot. </br> The scopes of your bot. </br> The commands that hello world bot application can respond to. </br><br/>Learn more about what these fields mean in the [Teams Manifest Schema](~/resources/schema/manifest-schema.md).</br></br> To include configurations for TeamsFx, track what capabilities are present in your project, you can easily move your project to cloud. |
|Tab| A frontend tab template code is added into a subfolder with path `yourProjectFolder/tabs`. </br></br>`launch.json` and `task.json` updated under `.vscode` folder. </br></br> `manifest.source.json` file under `appPackage` folder.</br></br> `env.default.json` and `settings.json` under `.fx` folder.|To include a hello world tab application template into your project.</br></br> To include necessary scripts for Visual Studio Code is executed when you wish to debug your application locally.</br></br> Learn more in local debug section. (Link to local debug document)</br></br> To include tab-related information in the manifest file that represents your application in the Teams Platform, the change includes:</br></br>The configurable and static tabs.</br></br>The scopes of the tabs.</br></br> Learn more about what these fields mean in the [Teams Manifest Schema](~/resources/schema/manifest-schema.md).</br></br> To include configurations for TeamsFx to track what capabilities are present in your project, you can easily move your project to cloud.|
		
## Advanced use case

(Placeholder) Any advanced use case or workarounds here customer should be aware of?

## See also

Run your application locally with additional capabilities
* [Provision necessary cloud resources to host your application with additional capabilities](provision-in-the-cloud.md) 
* [Deploy your project to cloud with additional capabilities](deploy-to-the-cloud.md)
