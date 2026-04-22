---
title: Add Resources and API Connection
author: MuyangAmigo
description: Learn how to add cloud resources such as Azure Functions, Azure API Management and integrate API connections using Agents Toolkit in Visual Studio Code.
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 04/10/2026
---

# Add cloud resources and API connection

Microsoft 365 Agents Toolkit (previously known as Teams Toolkit) enables you to provision cloud resources for hosting your agent or app, tailored to your development needs. Adding cloud resources lets you automatically generate configuration files and easily connect to the Teams agent or app with Agents Toolkit. Agents Toolkit also enables you to use existing APIs from your organization or third parties to build Teams agents or apps.

> [!NOTE]
> Agents Toolkit doesn't support adding Azure cloud resources for SharePoint Framework (SPFx) based tabs.

## Add cloud resources

You can add cloud resources in the following ways:

- [Add cloud resources using Agents Toolkit](#to-add-cloud-resources-using-agents-toolkit)
- [Add cloud resources using command palette](#to-add-cloud-resources-using-command-palette)

### To add cloud resources using Agents Toolkit

   1. Open your Teams agent or app project workspace in **Visual Studio Code**.
   1. Select **Microsoft 365 Agents Toolkit** from the Visual Studio Code activity bar.
   1. Select **View How-to Guides** in the **DEVELOPMENT** section.

        :::image type="content" source="~/assets/images/toolkit-v2/manual/select-view-how-to-guides.png" alt-text="Screenshot shows the option to select a how-to guide from the Development section.":::

   1. From the dropdown list that appears, select the cloud service you want to integrate with your agent or app. You're redirected to the selected how-to guide.

        :::image type="content" source="../assets/images/toolkit-v2/manual/cloud-service-integration.png" alt-text="Screenshot shows the cloud service integration options from the how-to guides list.":::

      |**Cloud service integration** | **How-to Guide** |
      |----------|----------|
      |Integrate with Azure Functions | [How to Integrate Azure Functions with your Teams app](https://github.com/OfficeDev/TeamsFx/wiki/How-to-integrate-Azure-Functions-with-your-Teams-app) |
      |Integrate with Azure SQL Database | [How to Integrate Azure SQL Database with your Teams app](https://github.com/OfficeDev/TeamsFx/wiki/Integrate-Azure-SQL-Database-with-your-Teams-app) |
      |Integrate with Azure API Management | [How to Integrate Azure API Management with your Teams App and export the API to power app](https://github.com/OfficeDev/TeamsFx/wiki/Integrate-Azure-API-Management-with-your-Teams-App-and-export-the-api-to-power-app) |
      |Integrate with Azure Key Vault | [How to Integrate Azure Key Vault with your Teams app](https://github.com/OfficeDev/TeamsFx/wiki/Integrate-Azure-Key-Vault-with-your-Teams-app) |

### To add cloud resources using command palette

   1. Open your Teams agent or app project in Visual Studio Code.

   1. Select **View** > **Command Palette...** or **Ctrl+Shift+P**.

      :::image type="content" source="~/assets/images/toolkit-v2/manual/cloud/Teams-add-features_1.png" alt-text="Screenshot shows the command palette option under **View**.":::

   1. Enter **How-to Guides** and select **Microsoft 365 Agents: View How-to Guides** from the list.

        :::image type="content" source="../assets/images/toolkit-v2/manual/how-to-guides.png" alt-text="Screenshot shows the selection of how-to guides from the list.":::

   1. From the dropdown list that appears, select the cloud service you want to integrate with your agent or app. You're redirected to the how-to guide for the selected cloud service.

        :::image type="content" source="../assets/images/toolkit-v2/manual/cloud-service-integration.png" alt-text="Screenshot shows the capabilities in View How-to Guides list.":::

      |**Cloud service integration** | **How-to Guide** |
      |----------|----------|
      |Integrate with Azure Functions | [How to Integrate Azure Functions with your Teams app](https://github.com/OfficeDev/TeamsFx/wiki/How-to-integrate-Azure-Functions-with-your-Teams-app) |
      |Integrate with Azure SQL Database | [How to Integrate Azure SQL Database with your Teams app](https://github.com/OfficeDev/TeamsFx/wiki/Integrate-Azure-SQL-Database-with-your-Teams-app) |
      |Integrate with Azure API Management | [How to Integrate Azure API Management with your Teams App and export the API to power app](https://github.com/OfficeDev/TeamsFx/wiki/Integrate-Azure-API-Management-with-your-Teams-App-and-export-the-api-to-power-app) |
      |Integrate with Azure Key Vault | [How to Integrate Azure Key Vault with your Teams app](https://github.com/OfficeDev/TeamsFx/wiki/Integrate-Azure-Key-Vault-with-your-Teams-app) |

## Add API connection

To connect your agent or app to an existing API developed by your organization or a third party:

1. Open your Teams agent or app project in **Microsoft Visual Studio Code**.
1. Select **Microsoft 365 Agents Toolkit** from the Visual Studio Code activity bar.
1. Select **View How-to Guides** in the **DEVELOPMENT** section.

    :::image type="content" source="~/assets/images/toolkit-v2/manual/select-view-how-to-guides.png" alt-text="Screenshot shows the option to select View How-to Guides under Development.":::

1. From the dropdown list that appears, select **Connect to an API**. You're redirected to the how-to guide.

    :::image type="content" source="../assets/images/toolkit-v2/add-API/api-select-features_1.png" alt-text="Screenshot shows the option for the how-to guide for connecting to an API in the view how-to guides list.":::

      |**Development** | **How-to Guide** |
      |----------|----------|
      | Connect to an API | [How to integrate API Connection with your Teams app](https://github.com/OfficeDev/TeamsFx/wiki/Integrate-API-Connection-with-your-Teams-app) |

## See also

- [Microsoft 365 Agents Toolkit Overview](agents-toolkit-fundamentals.md)
- [Provision cloud resources](provision.md)
- [Deploy to the cloud](deploy.md)
- [Publish Teams agents and apps using Microsoft 365 Agents Toolkit](publish.md)
