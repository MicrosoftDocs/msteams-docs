---
title: Add Capabilities to Your Teams apps
author: MuyangAmigo
description:  Describes Add Capabilities of Teams Toolkit
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Add capabilities to the app

You can create a new Teams app with one of the Teams app capabilities. During app development, you can use Teams Toolkit to add more capabilities to your Teams app. The following table lists the Teams app capabilities:

|**Capability**|**Description**|
|--------|-------------|
| Tabs |  Tabs are simple HTML tags that point to domains declared in the app manifest. You can add tabs as a part of channel inside a team, group chat, or personal app for an individual user.|
| Bots |  Bots help you to interact with your web service through text, interactive cards, and task modules.|
| Messaging extensions | Messaging extensions help to interact with your web service through buttons and forms in the Microsoft Teams client.|

## Prerequisite

[Install Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) version v3.0.0+.

> [!TIP]
> Ensure you have Teams app project opened in Visual Studio Code.

## Add capabilities

> [!IMPORTANT]
> You need to perform provision for each environment after you successfully add capabilities to your Teams app.

1. Open **Microsoft Visual Studio Code**.
1. Select **Teams Toolkit** from left panel.
1. Select **Add capabilities**:

    :::image type="content" source="../assets/images/teams-toolkit-v2/manual/add capabilities.png" alt-text="capabilities":::

   You can also open the command palette and enter **Teams: Add Capabilities**:

    :::image type="content" source="../assets/images/teams-toolkit-v2/manual/tree view capabilities.png" alt-text="Alternate capabilities":::

1. From the drop down list, select the capabilities to include in your project:

    :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/select capabilities.png" alt-text="select":::

1. Select **OK**.

The selected capabilities are succesfully added to your project. The Teams Toolkit generates source code for newly added capabilities.


<details>

<br>
<summary><b>Add capabilities using TeamsFx CLI in command window</b></summary>


1. Change directory to your **project directory**.
1. Execute the following command to add different capabilities to your project:

   |Capability and Scenario| Command|
   |-----------------------|----------|
   |To add tab|`teamsfx capability add tab`|
   |To add bot|`teamsfx capability add bot`|
   |To add messaging extension|`teamsfx capability add messaging-extension`|


<br>

</details>



<details>

<summary><b>Supported capabilities matrix</b></summary>


Apart from the capabilities your Teams app already have, you can choose to add different capabilities to your Teams app. The following table provides the different Teams app capabilities:

|Existing capabilities|Other supported capabilities|
|--------------------|--------------------|
|Tabs with SPFx|None|
|Tabs with Azure|Bot and messaging extension|
|Bot|Tabs|
|Messaging extension|Tabs and bot|
|Tabs and bot|Tabs and message extension|
|Tabs and messaging extension|Tabs and bot|
|Tabs, bot, and messaging extension|Tabs|
|Tabs |Bot and message extension|


<br>

</details>

<details>

<summary><b>Add capabilities</b></summary>

<br>

After adding bot and messaging extension, the changes in your project are as follows:

* A bot template code is added into a subfolder with path `yourProjectFolder/bot`. This includes a **hello world** bot application template into your project.
* `launch.json` and `task.json` files under `.vscode` folder are updated, which includes necessary scripts for Visual Studio Code, and is executed when you want to debug your application locally.
* `manifest.remote.template.json` and `manifest.local.template.json` files under `templates/appPackage` folder are updated, which includes bot related information in the manifest file that represents your application in the Teams Platform. The changes are as follows:
  * The ID of your bot.
  * The scopes of your bot.
  * The commands that hello world bot application can respond to.
* The files under `templates/azure/teamsfx` are  updated, and `templates/azure/provision/xxx`.bicep file is be regenerated.
* The files under `.fx/config` are regenerated, which ensures your project is set with right configuration for newly added capability.

After adding the tab, the changes in your project are as follows:

* A frontend tab template code is added into a subfolder with path `yourProjectFolder/tab`, which includes a **hello world** tab application template into your project.
* `launch.json` and `task.json` files under `.vscode` folder is updated, which includes necessary scripts for Visual Studio Code, and it is executed when you debug your application locally.
* `manifest.remote.template.json` and `manifest.local.template.json` files under `templates/appPackage` folder is updated, which includes tab-related information in the manifest file that represents your application in the Teams Platform, and the changes are as follows:
  * The configurable and static tabs.
  * The scopes of the tabs.
* The files under `templates/azure/teamsfx` are updated, and `templates/azure/provision/xxx`.bicep file will be regenerated.
* The files under `.fx/config` are regenerated, which ensures your project is configured set with right configurations for newly added capability.
<br>

</details> 

## Limitations

The limitations to TeamsFx while adding more capabilities are as follows:

* You can add tabs up to 16 instances.
* You can add bot and messaging extension for one instance each.

## See also

* [Provision cloud resources](provision.md)
* [Create new Teams project](create-new-project.md)
