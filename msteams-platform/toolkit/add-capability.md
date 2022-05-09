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

Using Teams app capability,you can create a new Teams app in app development.
You can see the following Teams app capabilities table list:

|**Capability**|**Description**|
|--------|-------------|
| Tabs |  Tabs are simple HTML tags that point to domains declared in the app manifest. You can add tabs as a part of channel inside a team, group chat, or personal app for an individual user|
| Bots |  Bots help to interact with your web service through text, interactive cards, and task modules|
| Message extensions | Message extensions help to interact with your web service through buttons and forms in the Microsoft Teams client|

## Limitations

The following limitations are while adding more capabilities in teamsFx:

* You can add tabs up to 16 instances
* You can add bot and message extension in one instance

## Add capabilities

> [!Note]
> You need to perform the provision for each environment, after capabilities are successfully added to your Teams app.

* You can add capabilities using Teams Toolkit in Visual Studio Code

    1. Open **Microsoft Visual Studio Code**
    1. Select **Teams Toolkit** from left panel
    1. Select **Add features**

    :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/select-feature1234.png" alt-text="updated one" border="true":::

*   You can also open the command palette and enter Teams: Add features:

    :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/Teams-add-features.png" alt-text="team feature" border="true":::


    1. From the pop-up, select the capabilities to include in your project:

    :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/notification-add-capabilities.png" alt-text="notification" border="true":::

The selected capabilities are successfully added to your project. The Teams Toolkit generate source code for newly added capabilities

## Add capabilities using TeamsFx CLI

1. Change directory to your **project directory**
1. Execute the following command to add different capabilities to your project:

   |Capability and Scenario| Command|
   |-----------------------|----------|
   |To add notification bot |`teamsfx add notification `|
   |To add command bot  |`teamsfx add command-and-response `|
   |To add sso-enabled tab |`teamsfx add`|
   |To add tab |`teamsfx add tab`|
   |To add bot  |`teamsfx add`|
   |To add message extension   |`teamsfx add message extension`|

## Supported capabilities

Apart from the capabilities your Teams app already have, you can choose to add different capabilities to your Teams app. 
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
