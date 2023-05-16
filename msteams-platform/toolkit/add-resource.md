---
title: Add Resources to Teams apps
author: MuyangAmigo
description: Learn how to add resources of Teams Toolkit and about advantages, limitations, and capabilities.
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Add cloud resources to Teams app

Teams Toolkit allows you to provision the cloud resources for hosting your app. You can add the cloud resources according to your development needs. The advantage of adding more cloud resources in TeamsFx is that you can autogenerate all configuration files and connect to Teams app by using Teams Toolkit.

> [!NOTE]
> If you've created SharePoint Framework (SPFx) based tab project, you can't add Azure cloud resources.

## Add cloud resources

You can add cloud resources in the following ways:

### To add cloud resources by using Teams Toolkit in Microsoft Visual Studio Code

   1. Open your Teams app project in **Visual Studio Code**.
   1. Select **Teams Toolkit** from the Visual Studio Code activity bar.
   1. Select **View How-to Guides** in the **DEVELOPMENT** section.

        :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/select-feature123_1.png" alt-text="Screenshot shows Add capabilities from Teams Toolkit.":::

   1. From the dropdown list that appears, select the cloud service integration you want to add to your app. You'll be redirected to the respective How-to Guide.

        :::image type="content" source="../assets/images/teams-toolkit-v2/manual/cloud-service-integration.png" alt-text="Screenshot shows the capabilities in View How-to Guides.":::

      |**Cloud service integration** | **How-to Guide** |
      |----------|----------|
      |Integrate with Azure Functions | [How to Integrate Azure Functions with your Teams app](https://github.com/OfficeDev/TeamsFx/wiki/How-to-integrate-Azure-Functions-with-your-Teams-app) |
      |Integrate with Azure SQL Database | [How to Integrate Azure SQL Database with your Teams app](https://github.com/OfficeDev/TeamsFx/wiki/Integrate-Azure-SQL-Database-with-your-Teams-app) |
      |Integrate with Azure API Management | [How to Integrate Azure API Management with your Teams App and export the api to power app](https://github.com/OfficeDev/TeamsFx/wiki/Integrate-Azure-API-Management-with-your-Teams-App-and-export-the-api-to-power-app) |
      |Integrate with Azure Key Vault | [How to Integrate Azure Key Vault with your Teams app](https://github.com/OfficeDev/TeamsFx/wiki/Integrate-Azure-Key-Vault-with-your-Teams-app) |

### To add cloud resources by using Command Palette

   1. Open your Teams app project in Visual Studio Code.

   1. Select **View** > **Command Palette...** or **Ctrl+Shift+P**.

      :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/cloud/Teams-add-features_1.png" alt-text="Screenshot shows the Command Palette option under View.":::

   1. Select **View How-to Guides** in the **DEVELOPMENT** section.

        :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/select-feature123_1.png" alt-text="Screenshot shows the View How-to Guides option highlighted in Teams Toolkit activity bar.":::

   1. From the dropdown list that appears, select the capability you want to add to your app. You'll be redirected to the respective How-to Guide.

        :::image type="content" source="../assets/images/teams-toolkit-v2/manual/cloud-service-integration.png" alt-text="Screenshot shows the capabilities in View How-to Guides list.":::

      |**Cloud service integration** | **How-to Guide** |
      |----------|----------|
      |Integrate with Azure Functions | [How to Integrate Azure Functions with your Teams app](https://github.com/OfficeDev/TeamsFx/wiki/How-to-integrate-Azure-Functions-with-your-Teams-app) |
      |Integrate with Azure SQL Database | [How to Integrate Azure SQL Database with your Teams app](https://github.com/OfficeDev/TeamsFx/wiki/Integrate-Azure-SQL-Database-with-your-Teams-app) |
      |Integrate with Azure API Management | [How to Integrate Azure API Management with your Teams App and export the api to power app](https://github.com/OfficeDev/TeamsFx/wiki/Integrate-Azure-API-Management-with-your-Teams-App-and-export-the-api-to-power-app) |
      |Integrate with Azure Key Vault | [How to Integrate Azure Key Vault with your Teams app](https://github.com/OfficeDev/TeamsFx/wiki/Integrate-Azure-Key-Vault-with-your-Teams-app) |

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals.md)
* [Provision cloud resources](provision.md)
* [Create a new Teams app](create-new-project.md)
* [Add capabilities to Teams apps](add-capability.md)
* [Deploy to the cloud](deploy.md)
