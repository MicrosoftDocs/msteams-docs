---
title: Add Resources to Teams apps
author: MuyangAmigo
description: Learn how to add resources of Teams Toolkit, advantages, limitations, and capabilities.
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Add cloud resources to Teams app

Teams Toolkit helps you to provision the cloud resources for your app hosting. You can add the cloud resources optionally, if they fit your development needs. The advantage of adding more cloud resources in TeamsFx is that you can autogenerate all configuration files and connect to Teams app by using Teams Toolkit.

> [!NOTE]
> If you have created SharePoint Framework (SPFx) based tab project, you can't add Azure cloud resources.

## Add cloud resources

You can add cloud resources in the following ways:

### To add cloud resources by using Teams Toolkit in Microsoft Visual Studio Code

   1. Open **Visual Studio Code**.
   1. Select **Teams Toolkit** from the Visual Studio Code activity bar.
   1. Select **Add features** under **DEVELOPMENT**.

        :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/cloud/select-feature-updated_1.png" alt-text="Add feature from Teams Toolkit":::

### To add cloud resources by using Command Palette

   1. Select **View** > **Command Palette...** or **Ctrl+Shift+P**.

      :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/cloud/Teams-add-features_1.png" alt-text="Add feature from command palette":::

   1. Select **Teams: Add features**.

      :::image type="content" source="../assets/images/teams-toolkit-v2/manual/cloud/Teams-add-features1_1.png" alt-text="Type add feature and enter":::

   1. In the pop-up window that appears, select the **Cloud resources** to add in your project.

      :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/cloud/updated-final-cloud_1.png" alt-text="final":::

  > [!NOTE]
  > You need to provision for each environment after you have successfully added the resource in your Teams app.

### Add cloud resources using TeamsFx CLI

* Change directory to your **project directory**.
* The following table lists the capabilities and required commands:

  |Cloud Resource|Command|
  |---------------|----------|
  | **Azure Functions**|`teamsfx add azure-function`|
  | **Azure SQL Database**|`teamsfx add azure-sql`|
  | **Azure API Management**|`teamsfx add azure-apim`|
  | **Azure Key Vault**|`teamsfx add azure-keyvault`|

## Types of cloud resources

In the following scenarios, TeamsFx integrates with Azure services:

* [Azure Functions](/azure/azure-functions/functions-overview): A serverless solution to meet your on-demand requirements, such as creating web APIs for your Teams app back-end.
* [Azure SQL Database](/azure/azure-sql/database/sql-database-paas-overview): A platform as a service (PaaS) database engine to serve as your Teams app data store.
* [Azure API Management](deploy.md): An API gateway can be used to administer APIs created for Teams apps and publish them to consume by other apps, such as Power app.
* [Azure Key Vault](/azure/key-vault/general/overview): Safeguard cryptographic keys and other secrets used by cloud apps and services.

## Changes after adding Cloud resources

The following changes appear after adding resources in your project:

* New parameters added to `azure.parameter.{env}.json` to provide the required information for provision.
* New content is included to ARM template under `templates\azure`, except the files are in `templates\azure\teamsfx` folder for the Azure resources.
* The files under `templates\azure\teamsfx` folder are regenerated to ensure TeamsFx required configuration is up to date for added Azure resources.
* `.fx\configs\projectSettings.json` is updated to track the available resources in your project.

The following additional changes appear after adding resources in your project:

|Resources|Changes|Description|
|---------------|---------------|-----------------------------|
|**Azure Functions**|An Azure Functions template code is added into a subfolder with path `yourProjectFolder\api`</br></br>`launch.json` and `task.json` updated under `.vscode` folder.| Includes a hello world http trigger template into your project.</br></br> Includes necessary scripts for Visual Studio Code to be executed when you want to debug your app locally.|
|**Azure API Management**|An open API specification file added into a subfolder with path `yourProjectFolder\openapi`.|Defines your API after publishing, it's the API specification file.|

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals.md)
* [Provision cloud resources](provision.md)
* [Create a new Teams app](create-new-project.md)
* [Add capabilities to Teams apps](add-capability.md)
* [Deploy to the cloud](deploy.md)
