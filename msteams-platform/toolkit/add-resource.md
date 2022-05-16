---
title: Add Resources to Your Teams apps
author: MuyangAmigo
description:  Describes Add Resources of Teams Toolkit
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Add cloud resources to your Teams app

TeamsFx helps to provision the cloud resources for your application hosting. You can add the cloud resources optionally, that fit your development needs.

## Limitation

You can't add the resources, if you created SPFx based tab project.

## Add cloud resources

You can add cloud resources in the following methods:

* Add cloud resources by using Teams Toolkit in Visual Studio Code
* Add cloud resources by using open the command palette

  > [!NOTE]
  > You need to provision for each environment, after you have successfully added a resource.
  
To add cloud resources by using Teams Toolkit in Visual Studio Code

   1. Open **Visual Studio Code**.
   1. Select **Teams Toolkit** from left panel.
   1. Select **Add features**.

        :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/cloud/select-feature-updated.png" alt-text="add feature" border="true":::

To add cloud resources by using open the command palette

   1. Open **command palette**.
   1. Enter **Teams:Add features**.

        :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/cloud/addcloud-updated1234.png" alt-text="cloud" border="true":::

   1. From the pop-up, select the cloud resources to add in your project.

        :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/cloud/updated-final-cloud.png" alt-text="final" border="true":::

## Add cloud resources using TeamsFx CLI

   1. Change directory to your **project directory**.
   1. The following table provide capabilities and the required commands:

       |Cloud Resource|Command|
       |---------------|----------|
       | Azure function|`teamsfx resource add azure-function --function-name your-func-name`|
       | Azure SQL database|`teamsfx resource add --function-name your-func-name`|
       | Azure API management|`teamsfx resource add azure-apim`|
       | Azure Key Vault|`teamsfx resource add azure-keyvault`|

## Types of cloud resources

The following scenarios for TeamsFx to integrates with Azure services :

- [Azure functions](/azure/azure-functions/functions-overview): A serverless solution to meet your on-demand requirements, such as creating web APIs for your Teams applications backend.
- [Azure SQL database](/azure/azure-sql/database/sql-database-paas-overview): A platform as a service (PaaS) database engine to serve as your Teams applications data store.
- [Azure API management](deploy.md): An API gateway can be used to administer APIs created for Teams applications and publish them to consume on other applications, such as Power apps.
- [Azure Key Vault](/azure/key-vault/general/overview): Safeguard cryptographic keys and other secrets used by cloud apps and services.

## Add Cloud resources

After adding the resource, the following changes are appears in your project:

- New parameters added to azure.parameter.{env}.json to provide required information for provision.
- New content is included to ARM template under `templates/azure`, except the files are in `templates/azure/teamsfx` folder for added the Azure resources.
- The files under `templates/azure/teamsfx` folder are regenerated to ensure TeamsFx required configuration are up to date for added Azure resources.
- `.fx/projectSettings.json` is updated to track the available resources in your project.

After adding resources, the following additional changes are appears in your project:

|Resources|Changes|Description|
|---------------|---------------|-----------------------------|
|Azure functions|An Azure functions template code is added into a subfolder with path `yourProjectFolder/api`</br></br>`launch.json` and `task.json` updated under `.visual studio code` folder.| Includes a hello world http trigger template into your project.</br></br> Includes necessary scripts for Visual Studio Code to be executed when you want to debug your application locally.|
|Azure API management|An open API specification file added into a subfolder with path `yourProjectFolder/openapi`|Defines your API after publishing, it's the API specification file.|

## See also

[Provision cloud resources](provision.md)
