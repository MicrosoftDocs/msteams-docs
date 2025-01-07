---
title: How-to Guides for Teams Apps
author: surbhigupta
description: Learn about the How-to guides from Teams Toolkit in Visual Studio Code to configure tab, bot, message extension, Outlook add-in capabilities.
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: overview
ms.date: 12/19/2024
---

# How-to guides for Microsoft Teams apps

Microsoft Teams Toolkit project templates focus on getting started with an app that implements a single [app capability](~/concepts/design/app-structure.md). However, apps can have multiple capabilities. We've created a set of How-to guides with the steps needed to add different capabilities to a project created with Teams Toolkit.

## How-to guides for adding capabilities

|**Capability** | **How-to Guide** |
|----------|----------|
| Configure Tab Capability | [How to configure Tab capability within your Teams app](configure-tab-capability.md) |
| Configure Bot Capability | [How to configure Bot capability within your Teams app](configure-bot-capability.md) |
| Configure Message Extension Capability | [How to configure Message Extension capability within your Teams app](configure-message-extension-capability.md) |
| Configure Outlook add-in Capability | [How to configure Outlook add-in capability within your Teams app](../m365-apps/combine-office-add-in-and-teams-app.md) |

## Open the guides from Teams Toolkit

* [Use Teams Toolkit pane](#use-teams-toolkit-pane)
* [Use the Command Palette](#use-the-command-palette)

### Use Teams Toolkit pane

   1. Open your app project in **Microsoft Visual Studio Code**.
   1. Select **Teams Toolkit** from the Visual Studio Code activity bar.
   1. Select **View How-to Guides** in the **DEVELOPMENT** section.

       :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/select-view-how-to-guides.png" alt-text="Screenshot shows the option to select View How-to Guides under Development.":::

   1. From the dropdown list that appears, select the capability you want to add to your app. You'll be redirected to the respective How-to Guide.

       :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/notification-add-capabilities_1.png" alt-text="Screenshot shows the capabilities listed.":::

### Use the Command Palette

   1. Open your app project in **Visual Studio Code**.

   1. Select **View** > **Command Palette...** or **Ctrl+Shift+P**.

      :::image type="content" source="../assets/images/teams-toolkit-v2/manual/add-capabilities-command-palette_1.png" alt-text="Screenshot shows the Command Palette option.":::

   1. Select **Teams: View How-to Guides**.

      :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/teams-add-features_1.png" alt-text="Screenshot shows option to add capabilities by using command palette.":::

   1. From the dropdown list that appears, select the capability you want to add to your app. You'll be redirected to the respective How-to Guide.

       :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/notification-add-capabilities_1.png" alt-text="Screenshot shows the capabilities list.":::

## See also

* [Walkthrough building an app that responds to chat commands](../sbs-gs-commandbot.yml).
* [Walkthrough building an app that sends chat messages](../sbs-gs-notificationbot.yml).
* [Walkthrough building an app with a workflow in chat](../sbs-gs-workflow-bot.yml)
* [App manifest schema](../resources/schema/manifest-schema.md)
