---
title: Add Scenarios based Teams app
author: MuyangAmigo
description:  In this module, learn how to add scenarios based Teams app
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Add scenarios based Teams apps

Add scenarios based Teams apps in Teams Toolkit helps you to add additional capability to your existing Teams app.The following table lists the Teams app capabilities:

|**Functions**|**Description**|
|--------|-------------|
| Notification bot | Notification bot proactively sends messages in Teams channel or group chat or personal chat. You can trigger the notification bot with an HTTP request such as cards or texts.|
| Command bot | Microsoft Teams allows you to automate repetitive tasks using a command bot. It responds to simple commands sent in chats with adaptive cards.|
| SSO enabled tab | **Need to add details**.|
| SPFx tab | **Need to add details**.|

## Advantages

The following list provides advantages to add more capabilities in TeamsFx:

* Provides convenience.
* Adds more function to your app by automatically adding source codes using Teams Toolkit.

## Limitations

The following list provides limitations to add more capabilities in TeamsFx:

* You can add tabs up to 16 instances.
* You can add a bot and message extension for one instance each.

**Scenarios to add Notification bot**.

**Scenarios to add Command bot**.

**Scenarios to add SSO enabled tab**.

**Scenarios to add SPFx tab**.

## Add scenarios based Teams app

**You can add scenarios based Teams app by the following methods:**

* To add basic Teams app by using Teams Toolkit in Visual Studio Code.
* To add basic Teams app by using command palette.

  > [!Note]
  > You need to provision for each environment, after you have successfully added the capabilities in your Teams app.

* **To add scenarios based Teams app by using Teams Toolkit in Visual Studio Code:**

   1. Open **Visual Studio Code**.
   1. Select **Teams Toolkit** from left panel.
   1. Select **Add features** under **DEVELOPMENT**.

       :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/select-feature123.png" alt-text="updated one" border="true":::

* **To add scenarios based Teams app by using command palette:**

   1. Open **command palette**.
   1. Enter **Teams:Add features**.
   1. Press **Enter**.

       :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/Teams-add-features.png" alt-text="team feature" border="true":::

   1. From the pop-up, select the capability to add in your project.

       :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/notification-add-capabilities.png" alt-text="notification" border="true":::

## Add scenarios based Teams app using TeamsFx CLI

* Change directory to your **project directory**.
* The following table lists the capabilities and required commands:

  |Capability and Scenario| Command|
  |-----------------------|----------|
  |To add notification bot |`teamsfx add notification`|
  |To add command bot |`teamsfx add command-and-response`|
  |To add sso-enabled tab |`teamsfx add sso-tab`|

## Available capabilities to add for different Teams project

You can choose to add different capabilities based on project you've created in Teams app.
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

* Follow the [step-by-step](../sbs-gs-commandbot.yml) guide to build command bot in Microsoft Teams

* Follow the [step-by-step](../sbs-gs-notificationbot.yml) guide to build notification bot in Microsoft Teams.

* Follow the [step-by-step](../sbs-gs-spfx.yml) guide to build your first app with SPFx.

## See also

* [Provision cloud resources](provision.md)
* [Create new Teams project](create-new-project.md)
