---
title: Add Capabilities to Your Teams apps
author: junjieli
description:  Describes Add Capabilities of Teams Toolkit
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Add Capabilities to Your Teams apps

You can start to create a Teams app with one of the Teams app capabilities. During app development, you can use Teams Toolkit to flexibly add more capabilities to your Teams app. This table describes the most popular Teams app capabilities.

|**Capability**|**Description**|
|--------|-------------|
| Tabs |  Tabs are Teams-aware simple HTML tags that point to domains declared in the app manifest. You can add tabs as part of a channel inside a team, group chat, or personal app for an individual user.|
| Bots |  Bots help to interact with your web service through text, interactive cards, and task modules.|
| Messaging extensions | Messaging extensions help to interact with your web service through buttons and forms in the Microsoft Teams client.|

## Prerequisite

- [Install Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) version v3.0.0+.
- You should already have a Teams app project.

## Add capabilities using Teams Toolkit

> [!IMPORTANT]
> You need to perform provision for each environment once again after you successfully add capabilities to your Teams app.

1. Select Teams Toolkit from left panel.

    ![Activate Teams Toolkit](./images/activate-teams-toolkit.png)
  
1. Select `Add capabilities` from left side panel.

    ![Add capabilities](./images/add-capabilities.png)

      You can also open the command palette and enter **Teams: Add Capabilities**. This is an equivalent to trigger from Tree View.

    ![Alternate add capabilities](./images/alternate-capabilities.png)

1. From the pop-up, select the capabilities to include into your project.

    ![Select capabilities](./images/select-capabilities.png)

1. Select **OK**, now you successfully added selected capabilities to your project. The Teams Toolkit generate source code for newly added capabilities.

## Add capabilities Using TeamsFx CLI in Command Window

1. Change directory to your project directory.
1. Execute following command to add different capabilities:

|Capability and Scenario| Command|
|-----------------------|----------|
|To add a tab|`teamsfx capability add tab`|
|To add a bot|`teamsfx capability add bot`|
|To add a messaging extension|`teamsfx capability add messaging-extension`|

Then the corresponding capabilities will be added to your project.

## Supported capabilities matrix

According to different capabilities your Teams app already have, you can choose to add different new capabilities to your Teams app. Check the table below for more information.

|Existing capabilities|Other capabilities can be added|
|--------------------|--------------------|
|Tabs with SPFx|None|
|Tabs with Azure|Bots and messaging extensions|
|Bots|Tabs|
|Messaging extensions|Tabs|
|Tabs and bots|None|
|Tabs and messaging extensions|None|
|Tabs, bots, and messaging extensions|None|

## What happens when add capabilities

After added bot and messaging extension, the following changes happens to your project:

- A bot template code is added into a subfolder with path `yourProjectFolder/bot`. This includes a hello world bot application template into your project.
- `launch.json` and `task.json` under `.vscode` folder are updated. This includes necessary scripts for Visual Studio Code is executed when you want to debug your application locally. To learn more on local debug section. (Link to local debug document)
- `manifest.remote.template.json` and `manifest.local.template.json` file under `templates/appPackage` folder are updated. This includes bot related information in the manifest file that represents your application in the Teams Platform, the change includes:
  - The ID of your bot.
  - The scopes of your bot.
  - The commands that hello world bot application can respond to.
- Files under `templates/azure` except `templates/azure/teamsfx/xxx.bicep` are updated. This includes additional Azure services to host your bot app.
- Files under `templates/azure/teamsfx` are regenerated. This ensures all TeamsFx required configurations are added to each Azure resources.

After added tab, the following changes happens to your project:

- A frontend tab template code is added into a subfolder with path `yourProjectFolder/bot`. This includes a hello world tab application template into your project.
- `launch.json` and `task.json` under `.vscode` folder are updated. This includes necessary scripts for Visual Studio Code is executed when you want to debug your application locally. To learn more on local debug section. (Link to local debug document)
- `manifest.remote.template.json` and `manifest.local.template.json` file under `templates/appPackage` folder are updated. This includes tab-related information in the manifest file that represents your application in the Teams Platform, the changes include:
  - The configurable and static tabs.
  - The scopes of the tabs.
- Files under `templates/azure` except `templates/azure/teamsfx/xxx.bicep` are updated. This includes additional Azure services to host your tab app.
- Files under `templates/azure/teamsfx` are regenerated. This ensures all TeamsFx required configurations are added to each Azure resources.

## Limitations to add capabilities

Currently there are limitations with TeamsFx when adding more capabilities. The limitations are as follows:

- Each project capability more than once
- Any capability if you start with a Tab application with SPFx
- More bot capabilities if your project contains messaging extension
- More messaging extension if your project contains a bot.

> Note: If you want to include both bot and messaging extension capabilities, then select them at the same time. You can add them either when you create a new project or a tab application.

## See Also

> [!div class="nextstepaction"]
> [Provision cloud resources](provision.md)
> [!div class="nextstepaction"]
> [Create new Teams project](create-new-project.md)
