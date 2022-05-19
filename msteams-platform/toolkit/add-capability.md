---
title: Add Capabilities to Teams apps
author: MuyangAmigo
description:  Describes Add Capabilities of Teams Toolkit
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Add capabilities to Teams apps

Teams app capability helps you to create a new Teams app in app development. The following table lists the Teams app capabilities:

|**Capability**|**Description**|
|--------|-------------|
| Tabs |  Tabs are simple HTML tags that refer to domains declared in the app manifest. You can add tabs as a part of channel inside a team, group chat, or personal app for an individual user.|
| Bots |  Bots help to interact with your web service through text, interactive cards, and task modules.|
| Message extensions | Message extensions help to interact with your web service through buttons and forms in the Microsoft Teams client.|

## Advantages

The following list provides advantages to add more capabilities in TeamsFx:

* Provides convenience
* Adds more function to your app by automatically adding source codes using Teams Toolkit

## Limitations

The following list provides limitations to add more capabilities in TeamsFx:

* You can add tabs up to 16 instances
* You can add a bot and message extension for one instance each

## Add capabilities

**You can add capabilities by the following methods:**

* To add capabilities by using Teams Toolkit in Visual Studio Code
* To add capabilities by using command palette

  > [!Note]
  > You need to provision for each environment, after you have successfully added the capabilities in your Teams app.

* **To add capabilities by using Teams Toolkit in Visual Studio Code:**

   1. Open **Visual Studio Code**.
   1. Select **Teams Toolkit** from left panel.
   1. Select **Add features** under **DEVELOPMENT**.

       :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/select-feature1234.png" alt-text="updated one" border="true":::

* **To add capabilities by using command palette:**

   1. Open **command palette**.
   1. Enter **Teams:Add features**.
   1. Press **Enter**.

       :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/Teams-add-features.png" alt-text="team feature" border="true":::

   1. From the pop-up, select the capability to add in your project.

       :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/notification-add-capabilities.png" alt-text="notification" border="true":::

## Add capabilities using TeamsFx CLI

* Change directory to your **project directory**
* The following table lists the capabilities and required commands:

  |Capability and Scenario| Command|
  |-----------------------|----------|
  |To add notification bot |`teamsfx add notification `|
  |To add command bot |`teamsfx add command-and-response `|
  |To add sso-enabled tab |`teamsfx add sso-tab`|
  |To add tab |`teamsfx add tab`|
  |To add bot |`teamsfx add bot`|
  |To add message extension |`teamsfx add message extension`|

## Supported capabilities

You can choose to add different capabilities in your Teams app.
The following table lists the different Teams app capabilities:

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
