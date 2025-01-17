---
title: Add Resources and API Connection
author: MuyangAmigo
description: Learn how to add cloud resources such as Azure Functions, Azure API Management and integrate API connections using Teams Toolkit in Visual Studio Code.
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2024
---

# Add cloud resources and API connection

Microsoft Teams Toolkit enables you to provision cloud resources for hosting your app, tailored to your development needs. By adding more cloud resources in TeamsFx, you can autogenerate all configuration files and seamlessly connect to the Microsoft Teams app using Teams Toolkit. Additionally, Teams Toolkit allows you to access and use existing APIs, whether developed by your organization or a third party, for building Teams apps.

> [!NOTE]
> If you've created SharePoint Framework (SPFx) based tab project, you can't add Azure cloud resources.

## Add cloud resources

You can add cloud resources in the following ways:

### To add cloud resources using Teams Toolkit

   1. Open your Teams app project in **Visual Studio Code**.
   1. Select **Teams Toolkit** from the Visual Studio Code activity bar.
   1. Select **View How-to Guides** in the **DEVELOPMENT** section.

        :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/select-view-how-to-guides.png" alt-text="Screenshot shows the option to select View How-to Guides under Development.":::

   1. From the dropdown list that appears, select the cloud service integration you want to add to your app. You're redirected to the respective How-to Guide.

        :::image type="content" source="../assets/images/teams-toolkit-v2/manual/cloud-service-integration.png" alt-text="Screenshot shows the Cloud service integration options in View How-to Guides.":::

      |**Cloud service integration** | **How-to Guide** |
      |----------|----------|
      |Integrate with Azure Functions | [How to Integrate Azure Functions with your Teams app](https://github.com/OfficeDev/TeamsFx/wiki/How-to-integrate-Azure-Functions-with-your-Teams-app) |
      |Integrate with Azure SQL Database | [How to Integrate Azure SQL Database with your Teams app](https://github.com/OfficeDev/TeamsFx/wiki/Integrate-Azure-SQL-Database-with-your-Teams-app) |
      |Integrate with Azure API Management | [How to Integrate Azure API Management with your Teams App and export the API to power app](https://github.com/OfficeDev/TeamsFx/wiki/Integrate-Azure-API-Management-with-your-Teams-App-and-export-the-api-to-power-app) |
      |Integrate with Azure Key Vault | [How to Integrate Azure Key Vault with your Teams app](https://github.com/OfficeDev/TeamsFx/wiki/Integrate-Azure-Key-Vault-with-your-Teams-app) |

### To add cloud resources using Command Palette

   1. Open your Teams app project in Visual Studio Code.

   1. Select **View** > **Command Palette...** or **Ctrl+Shift+P**.

      :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/cloud/Teams-add-features_1.png" alt-text="Screenshot shows the Command Palette option under View.":::

   1. Enter **How-to Guides** and select **Teams:View How-to Guides** from the list.

        :::image type="content" source="../assets/images/teams-toolkit-v2/manual/how-to-guides.png" alt-text="Screenshot shows the selection of View how-to guides from the list.":::

   1. From the dropdown list that appears, select the capability you want to add to your app. You're redirected to the respective How-to Guide.

        :::image type="content" source="../assets/images/teams-toolkit-v2/manual/cloud-service-integration.png" alt-text="Screenshot shows the capabilities in View How-to Guides list.":::

      |**Cloud service integration** | **How-to Guide** |
      |----------|----------|
      |Integrate with Azure Functions | [How to Integrate Azure Functions with your Teams app](https://github.com/OfficeDev/TeamsFx/wiki/How-to-integrate-Azure-Functions-with-your-Teams-app) |
      |Integrate with Azure SQL Database | [How to Integrate Azure SQL Database with your Teams app](https://github.com/OfficeDev/TeamsFx/wiki/Integrate-Azure-SQL-Database-with-your-Teams-app) |
      |Integrate with Azure API Management | [How to Integrate Azure API Management with your Teams App and export the API to power app](https://github.com/OfficeDev/TeamsFx/wiki/Integrate-Azure-API-Management-with-your-Teams-App-and-export-the-api-to-power-app) |
      |Integrate with Azure Key Vault | [How to Integrate Azure Key Vault with your Teams app](https://github.com/OfficeDev/TeamsFx/wiki/Integrate-Azure-Key-Vault-with-your-Teams-app) |

## Add API connection

Add a connection to an existing API, developed by your organization or a third party, using the following steps:

1. Open your Teams app project in **Microsoft Visual Studio Code**.
1. Select **Teams Toolkit** from the Visual Studio Code activity bar.
1. Select **View How-to Guides** in the **DEVELOPMENT** section.

    :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/select-view-how-to-guides.png" alt-text="Screenshot shows the option to select View How-to Guides under Development.":::

1. From the dropdown list that appears, select **Connect to an API**. You're redirected to the respective How-to Guide.

    :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/api-select-features_1.png" alt-text="Screenshot shows the selection of Connect to an API option in the View How-to Guides list.":::

      |**Development** | **How-to Guide** |
      |----------|----------|
      | Connect to an API | [How to integrate API Connection with your Teams app](integrate-api-connection.md) |

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals.md)
* [Provision cloud resources](provision.md)
* [Create a new Teams app](create-new-project.md)
* [Deploy to the cloud](deploy.md)
* [Publish Teams apps using Teams Toolkit](publish.md)
