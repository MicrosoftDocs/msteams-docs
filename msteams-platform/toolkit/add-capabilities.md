---
title: Add capabilities
author: Rajeshwari-v
description:  Describes how to add capabilities.
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: overview
---

# Add Capabilities

You can start to create a Teams app with Visual Studio Code by adding capabilities, such as tabs, bots, and messaging extensions. The following table describes the different capabilities:

|**Capability**|**Description**|
|--------|-------------|
| Tabs |  Tabs are Teams-aware simple HTML tags that point to domains declared in the app manifest. You can add tabs as part of a channel inside a team, group chat, or personal app for an individual user.|
| Bots |  Bots help to interact with your web service through text, interactive cards, and task modules.|
| Messaging extensions | Messaging extensions help to interact with your web service through buttons and forms in the Microsoft Teams client.|

## Prerequisite

To add capabilities using Visual Studio Code, you must install Teams Toolkit V2.

## Limitations to add capabilities

Currently there are limitations with TeamsFx when adding more capabilities. The limitations are as follows:

* Each project capability more than once
* Any capability if you start with a Tab application with SPFx
* More bot capabilities if your project contains messaging extension
* More messaging extension if your project contains a bot.

> [!NOTE]
> If you want to include both bot and messaging extension capabilities, then select them at the same time. You can add them either when you create a new project or a tab application.

## App capabilities support matrix

The following table provides the list of current capabilities and other capabilities they support:

|Current capabilities|Other capabilities|
|--------------------|--------------------|
|Tabs with SPFx|None|
|Tabs with Azure|Bots and messaging extensions|
|Bots|Tabs|
|Messaging extensions|Tabs|
|Tabs and bots|None|
|Tabs and messaging extensions|None|
|Tabs, bots, and messaging extensions|None|

## Procedure to add capabilities

You can add capabilities in the following ways:

### Add capabilities from Teams Toolkit in Visual Studio Code

1. Select Teams Toolkit from left panel.

    ![Activate Teams Toolkit](~/assets/images/tools-and-sdks/teams-toolkit.png)
  
1. Select `Add capabilities` from left side panel.

    ![Add capabilities](~/assets/images/tools-and-sdks/add-capabilities.png)
 
1. From the pop-up, select the capabilities to include into your project.

    ![Select capabilities](~/assets/images/tools-and-sdks/select-capabilities.png)
 
1. Select **OK** to continue.

    Instead, you can open the command palette and enter **Teams: Add Capabilities**. Follow the same process as it’s triggered from Tree View.

    ![Alternate add capabilities](~/assets/images/tools-and-sdks/alternate-capabilities.png)
  
 
### Add capabilities from TeamsFx CLI in Command Window

1. Change directory to your project directory.
1. Execute following command to add different capabilities:

|Capability and Scenario| Command|
|-----------------------|----------|
|To add a tab|`teamsfx capability add tab`|
|To add a bot with new bot registration|`teamsfx capability add bot --way-to-register-bot create-new`|
|To add a bot with existing bot registration|`teamsfx capability add bot --way-to-register-bot reuse-existing --bot-id your-bot-id --bot-password your-bot-password`|
|To add a messaging extension with new bot registration|`teamsfx capability add messaging-extension --way-to-register-bot create-new`|
|To add a messaging extension with existing bot registration|`teamsfx capability add messaging-extension --way-to-register-bot reuse-existing --bot-id your-bot-id --bot-password your-bot-password`|

## Add more capabilities

After adding capabilities, the following changes reflect in your project:

|Capability Added|What changed|Why these changes are made|
|-------------------|---------------|-------------------------|
|Bot and messaging extension|A bot template code is added into a subfolder with path `yourProjectFolder/bot` </br></br> `launch.json` and `task.json` updated under `.vscode` folder. </br> </br> `manifest.source.json` file under `appPackage` folder.</br></br> `env.default.json` and `settings.json` under `.fx` folder.|To include a hello world bot application template into your project. </br><br/>To include necessary scripts for Visual Studio Code is executed when you want to debug your application locally.</br><br/> To learn more on local debug section. (Link to local debug document)</br><br/> To include bot related information in the manifest file that represents your application in the Teams Platform, the change includes: </br> - The ID of your bot. </br> - The scopes of your bot. </br> -The commands that hello world bot application can respond to. </br><br/>To learn more about what these fields mean in the [Teams Manifest Schema](~/resources/schema/manifest-schema.md).</br></br> To include configurations for TeamsFx, to track the capabilities present in your project, you can easily move your project to cloud. |
|Tab| A frontend tab template code is added into a subfolder with path `yourProjectFolder/tabs`. </br></br>`launch.json` and `task.json` updated under `.vscode` folder. </br></br> `manifest.source.json` file under `appPackage` folder.</br></br> `env.default.json` and `settings.json` under `.fx` folder.|To include a hello world tab application template into your project.</br></br> To include necessary scripts for Visual Studio Code to debug your application locally.</br></br> To learn more on local debug section. (Link to local debug document)</br></br> To include tab-related information in the manifest file that represents your application in the Teams Platform, the changes include:</br></br>- The configurable and static tabs.</br></br>- The scopes of the tabs.</br></br>To learn more about what these fields mean in the [Teams Manifest Schema](~/resources/schema/manifest-schema.md).</br></br> To include configurations for TeamsFx to track what capabilities are present in your project, you can easily move your project to cloud.|

## Advanced use case

(Placeholder)

## See also

* Run your application locally with more capabilities. (Links to local debug)
* [Provision necessary cloud resources to host your application with more capabilities](deploy-to-the-cloud.md#deployment).
* [Deploy your project to cloud with more capabilities](deploy-to-the-cloud.md)
* [Bots with webhooks and connectors](../bots/bot-features.md#bots-with-webhooks-and-connectors).
* [Contributor guide page](/help/contribute/?branch=master).
