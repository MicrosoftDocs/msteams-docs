---
title: Add Capabilities to Your Teams apps
author: MuyangAmigo
description:  Describes Add Capabilities of Teams Toolkit
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Add capabilities to your Teams apps

Using Teams app capability, you can create a new Teams app in app development. </br>
The following table provides the list of Teams app capabilities:

|**Capability**|**Description**|
|--------|-------------|
| Tabs |  Tabs are simple HTML tags that point to domains declared in the app manifest. You can add tabs as a part of channel inside a team, group chat, or personal app for an individual user|
| Bots |  Bots help to interact with your web service through text, interactive cards, and task modules|
| Message extensions | Message extensions help to interact with your web service through buttons and forms in the Microsoft Teams client|

## Limitations

The following list provides the limitations of while adding more capabilities in TeamsFx:

* You can add tabs up to 16 instances
* You can add bot and message extension for one instance each

## Add capabilities

> [!Note]
> You need to provision for each environment, after you have successfully added the capabilities in your Teams app.

Adding Capabilities for creating an application. There are two way to add the capabilities:

   1. You can add capabilities using Teams Toolkit in Visual Studio Code
   1. You can add capabilities using open the command palette

*   You can add capabilities using Teams Toolkit in Visual Studio Code

    1. Open **Microsoft Visual Studio Code**
    1. Select **Teams Toolkit** from left panel
    1. Select **Add features**

       :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/select-feature1234.png" alt-text="updated one" border="true":::

*   You can add capabilities using open the command palette

    1. Open the **command palette**
    1. Enter **Teams:Add features**

       :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/Teams-add-features.png" alt-text="team feature" border="true":::


    1. From the pop-up, select the capabilities to include in your project:

       :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/notification-add-capabilities.png" alt-text="notification" border="true":::

The selected capabilities are successfully added to your project. 

## Add capabilities using TeamsFx CLI

1. Change directory to your **project directory**
1. The following table provides capabilities and the required commands:

   |Capability and Scenario| Command|
   |-----------------------|----------|
   |To add notification bot |`teamsfx add notification `|
   |To add command bot  |`teamsfx add command-and-response `|
   |To add sso-enabled tab |`teamsfx add`|
   |To add tab |`teamsfx add tab`|
   |To add bot  |`teamsfx add`|
   |To add message extension   |`teamsfx add message extension`|

## Supported capabilities

You can choose to add different capabilities in your Teams app.
The following table provides the different Teams app capabilities:

|Existing capabilities|Other supported capabilities|
|--------------------|--------------------|
|SPFx tab |None|
|SSO-enabled tab |SSO-enabled tab, notification bot, command bot, bot, message extension|
|Notification bot |SSO-enabled tab, tab|
|Command bot |SSO-enabled tab, tab|
|Tab |Tab, notification bot, command bot, bot, message extension|
|Bot |Message extension, SSO-enabled tab, tab|
|Message extension |Bot, SSO-enabled tab, tab |

## See also

* [Provision cloud resources](provision.md)
* [Create new Teams project](create-new-project.md)
