---
title: Add capabilities
author: Rajeshwari-v
description:  Describes how to add capabilities.
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: overview
---

# Add Capabilities

As you continue to develop your project, you need more app capabilities. You can start with a tab application and add a bot to your Teams application later.

For more information on Teams app capabilities, see [Understand app capabilities](~/concepts/capabilities-overview.md#app-capabilities).

## Prerequisite

Start Teams application with one app capability created by the Teams Toolkit V2. 

## Add capabilities to your project

Currently there are the following limitations with TeamsFx when adding more capabilities, you cannot add:
* Each project capability more than once.
* Capability if you start with a Tab application with SPFx.
* More Bot capability if your project contains Messaging Extension.
* Extra Messaging Extension if your project contains a Bot.

> [!NOTE]
> If you want to include both Bot and Messaging Extension capability, include them at the same time, either when you create a new project or add them together to a Tab application.

**Support Matrix:**

|Current Project Capabilities|	Another capabilities you can add|
|--------------------|--------------------|
|Tab With SPFx|	No more capabilities can be added.|
|Tab with Azure|Bot, Messaging Extension.|
|Bot|Tab|
|Messaging Extension|Tab|
|Tab and Bot|No more capabilities can be added.|
|Tab and Messaging Extension|No more capabilities can be added.|
|Tab, Bot, Messaging Extension|No more capabilities can be added.|

## Procedure to add capabilities

There are several approaches where you can add more capabilities to your project.

### Add capabilities from Teams Toolkit in Visual Studio Code

1. Activate Teams Toolkit from left side.

    ![Activate Teams Toolkit](~/assets/images/tools-and-sdks/teams-toolkit.png)
  
1. In the Teams Toolkit side bar panel, select `Add capabilities`.

    ![Add capabilities](~/assets/images/tools-and-sdks/add-capabilities.png)
 
1. From the pop-up, select the capabilities you want to include into your project.

    ![Select capabilities](~/assets/images/tools-and-sdks/select-capabilities.png)
 
1. Select **OK** to continue, there may be more questions needed based on the capabilities selected. For more information, see create project section. (links to create project)

    instead, you can open the command palette and enter **Teams: Add Capabilities**. Follow the same process as it’s triggered from Tree View.

    ![Alternate add capabilities](~/assets/images/tools-and-sdks/alternate-capabilities.png)
  
 
### Add capabilities from TeamsFx CLI in Command Window

1. Change directory to your project directory.
1. Execute following command to add different capabilities:

|Capability and Scenario| Command|
|-----------------------|----------|
|To Add a Tab|`teamsfx capability add tab`|
|To Add a Bot With New Bot Registration	|`teamsfx capability add bot --way-to-register-bot create-new`|
|To Add a Bot With Existing Bot Registration|`teamsfx capability add bot --way-to-register-bot reuse-existing --bot-id your-bot-id --bot-password your-bot-password`|
|To Add a Messaging Extension With New Bot Registration	|`teamsfx capability add messaging-extension --way-to-register-bot create-new`|
|To Add a Messaging Extension With Existing Bot Registration|	`teamsfx capability add messaging-extension --way-to-register-bot reuse-existing --bot-id your-bot-id --bot-password your-bot-password`|

## Add additional capabilities

After adding capabilities, the changes reflected to your project and reasons for change are also listed here:

|Capability Added	|What changed|	Why these changes are made|
|-------------------|---------------|-------------------------|
|Bot and Messaging Extension|	A bot template code is added into a subfolder with path `yourProjectFolder/bot` </br></br> `launch.json` and `task.json` updated under `.vscode` folder. </br> </br> `manifest.source.json` file under `appPackage` folder.</br></br> `env.default.json` and `settings.json` under `.fx` folder.|To include a hello world bot application template into your project. </br><br/>To include necessary scripts for Visual Studio Code is executed when you want to debug your application locally.</br><br/> Learn more in local debug section. (Link to local debug document)</br><br/> To include bot related information in the manifest file that represents your application in the Teams Platform, the change includes: </br> The ID of your bot. </br> The scopes of your bot. </br> The commands that hello world bot application can respond to. </br><br/>Learn more about what these fields mean in the [Teams Manifest Schema](~/resources/schema/manifest-schema.md).</br></br> To include configurations for TeamsFx, track what capabilities are present in your project, you can easily move your project to cloud. |
|Tab| A frontend tab template code is added into a subfolder with path `yourProjectFolder/tabs`. </br></br>`launch.json` and `task.json` updated under `.vscode` folder. </br></br> `manifest.source.json` file under `appPackage` folder.</br></br> `env.default.json` and `settings.json` under `.fx` folder.|To include a hello world tab application template into your project.</br></br> To include necessary scripts for Visual Studio Code is executed when you wish to debug your application locally.</br></br> Learn more in local debug section. (Link to local debug document)</br></br> To include tab-related information in the manifest file that represents your application in the Teams Platform, the change includes:</br></br>The configurable and static tabs.</br></br>The scopes of the tabs.</br></br> Learn more about what these fields mean in the [Teams Manifest Schema](~/resources/schema/manifest-schema.md).</br></br> To include configurations for TeamsFx to track what capabilities are present in your project, you can easily move your project to cloud.|
		
## Advanced use case

(Placeholder) Any advanced use case or workarounds here customer should be aware of?

## See also

* Run your application locally with additional capabilities. (Links to local debug)
* [Provision necessary cloud resources to host your application with additional capabilities](provision-in-the-cloud.md) 
* [Deploy your project to cloud with additional capabilities](deploy-to-the-cloud.md)
