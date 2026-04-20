---
title: How-to Guides for Teams Agents and Apps
description: Learn about the How-to guides from Microsoft 365 Agents Toolkit in Visual Studio Code to configure tab, bot, message extension, Outlook add-in capabilities.
ms.localizationpriority: medium
ms.topic: overview
ms.date: 04/10/2026
---

# How-to guides for Microsoft Teams apps

Microsoft 365 Agents Toolkit (previously known as Teams Toolkit) project templates focus on getting started with an agent or app that implements a single [app capability](~/concepts/design/app-structure.md). However, agents and apps can have multiple capabilities. We've created a set of how-to guides with the steps needed to add different capabilities to a project created with Agents Toolkit.

## How-to guides in Agents Toolkit

| Capability | How-to Guide |
| --- | --- |
| Configure Tab Capability | [How to configure Tab capability within your Teams app](configure-tab-capability.md) |
| Configure Bot Capability | [How to configure Bot capability within your Teams app](configure-bot-capability.md) |
| Configure Message Extension Capability | [How to configure Message Extension capability within your Teams app](configure-message-extension-capability.md) |
| Configure Outlook add-in Capability | [How to configure Outlook add-in capability within your Teams app](../m365-apps/combine-office-add-in-and-teams-app.md) |

Apart from capabilities, Agents Toolkit also provides how-to guides for:

**Scenario**:

- Initiate sequential workflow in Teams
- Send notifications to Teams
- Respond to chat commands in Teams
- Embed a dashboard canvas in Teams

**Development**:

- Develop single sign-on experience in Teams
- Connect to an API
- Automate CI/CD pipelines
- Run and debug on mobile client
- Multi-tenant support

For more information, see [add API connection](add-resource.md#add-api-connection).

**Cloud service integration**:

- Integrate with Azure functions
- Integrate with Azure SQL database
- Integrate with Azure API management
- Integrate with Azure key vault

For more information, see [add cloud resources](add-resource.md#add-cloud-resources).

## Open the guides from Agents Toolkit

- [Use Agents Toolkit pane](#use-agents-toolkit-pane)
- [Use the Command Palette](#use-the-command-palette)

### Use Agents Toolkit pane

1. Open your agent or app project in **Microsoft Visual Studio Code**.
1. Select **Microsoft 365 Agents Toolkit** from the Visual Studio Code activity bar.
1. Select **View How-to Guides** in the **DEVELOPMENT** section.

   :::image type="content" source="~/assets/images/toolkit-v2/manual/select-view-how-to-guides.png" alt-text="Screenshot shows the option to select View How-to Guides under Development.":::

1. From the dropdown list that appears, select the capability you want to add to your app. You'll be redirected to the selected how-to guide.

   :::image type="content" source="~/assets/images/toolkit-v2/manual/notification-add-capabilities_1.png" alt-text="Screenshot shows the capabilities listed.":::

### Use the Command Palette

   1. Open your app project in **Visual Studio Code**.

   1. Select **View** > **Command Palette...** or **Ctrl+Shift+P**.

      :::image type="content" source="../assets/images/toolkit-v2/manual/add-capabilities-command-palette_1.png" alt-text="Screenshot shows the command palette option.":::

   1. Select **Microsoft 365 Agents: View How-to Guides**.

      :::image type="content" source="~/assets/images/toolkit-v2/manual/teams-add-features_1.png" alt-text="Screenshot shows option to add capabilities by using command palette.":::

   1. From the dropdown list that appears, select the capability you want to add to your app. You'll be redirected to the selective how-to guide.

       :::image type="content" source="~/assets/images/toolkit-v2/manual/notification-add-capabilities_1.png" alt-text="Screenshot shows the capabilities list.":::

## See also

- [Enable single sign-on for Teams app](develop-single-sign-on-experience-in-Teams.md)
- [Set up CI/CD pipelines](use-CICD-template.md)
- [Add cloud resources and API connection](add-resource.md)
