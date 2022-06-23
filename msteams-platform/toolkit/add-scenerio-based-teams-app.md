---
title: Add Scenerio based Teams app
author: MuyangAmigo
description:  In this module, learn how to add Capabilities of Teams Toolkit, advantages, limitations and capabilities
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Add scenerio based Teams apps features

Add scenerio based Teams apps features in Teams Toolkit helps you to add additional capability to your existing Teams app.The following table lists the Teams app capabilities:

|**Features**|**Description**|
|--------|-------------|
| Notification bot | Notification bot proactively sends messages in Teams channel or group chat or personal chat. You can trigger the notification bot with a HTTP request such as cards or texts.|
| Command bot | Microsoft Teams allows you to automate repetitive tasks using a command bot. It responds to simple commands sent in chats with adaptive cards.|
| SSO enabled tab | **Need to add details**.|

## Advantages

The following list provides advantages to add more capabilities in TeamsFx:

* Provides convenience.
* Adds more function to your app by automatically adding source codes using Teams Toolkit.

## Limitations

The following list provides limitations to add more capabilities in TeamsFx:

* You can add tabs up to 16 instances.
* You can add a bot and message extension for one instance each.

## Scenerios to add Notification bot features

## Scenerios to add Command bot features

## Scenerios to add SSO enabled tab features

## Add scenerio based Teams app

**You can add basic Teams app by the following methods:**

* To add basic Teams app by using Teams Toolkit in Visual Studio Code.
* To add basic Teams app by using command palette.

  > [!Note]
  > You need to provision for each environment, after you have successfully added the capabilities in your Teams app.

* **To add scenerio based Teams app by using Teams Toolkit in Visual Studio Code:**

   1. Open **Visual Studio Code**.
   1. Select **Teams Toolkit** from left panel.
   1. Select **Add features** under **DEVELOPMENT**.

       :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/select-feature123.png" alt-text="updated one" border="true":::

* **To add basic Teams app by using command palette:**

   1. Open **command palette**.
   1. Enter **Teams:Add features**.
   1. Press **Enter**.

       :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/Teams-add-features.png" alt-text="team feature" border="true":::

   1. From the pop-up, select the capability to add in your project.

       :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/notification-add-capabilities.png" alt-text="notification" border="true":::

## Add basic Teams app using TeamsFx CLI

* Change directory to your **project directory**.
* The following table lists the capabilities and required commands:

  |Capability and Scenario| Command|
  |-----------------------|----------|
  |To add notification bot |`teamsfx add notification`|
  |To add command bot |`teamsfx add command-and-response`|
  |To add sso-enabled tab |`teamsfx add sso-tab`|

## Available capabilities to add for different Teams project

You can choose to add different capabilities based on project you have created in Teams app.
The following table lists the available capabilities to add in your project:

|Existing capabilities|Other supported capabilities|
|--------------------|--------------------|
|Notification bot |SSO-enabled tab, tab|
|Command bot |SSO-enabled tab, tab|
|SSO-enabled tab |SSO-enabled tab, notification bot, command bot, bot, message extension|

## Add notification bot, command bot and SSO enabled tab

After adding notification bot, command bot and SSO enabled tab, the changes in your project are as follows:
**Details to be added**

## Step-by-step guide

* Step-by-step guide to add command bot, notification bot, SSO enabled tab as add features in Microsoft Teams to be added.

## See also

* [Provision cloud resources](provision.md)
* [Create new Teams project](create-new-project.md)
