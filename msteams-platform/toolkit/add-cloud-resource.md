---
title: Add cloud Resources to Teams apps
author: MuyangAmigo
description:  In this module, learn how to add cloud Resources of Teams Toolkit, advantages, limitations and capabilities
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Add resources to Teams app

TeamsFx helps to provision the cloud resources for your application hosting. You can add the cloud resources optionally, that fit your development needs.

|**Features**|**Description**|
|--------|-------------|
|[Azure functions](/azure/azure-functions/functions-overview) |A serverless solution to meet your on-demand requirements, such as creating web APIs for your Teams applications backend.|
|[Azure SQL database](/azure/azure-sql/database/sql-database-paas-overview) | A platform as a service (PaaS) database engine to serve as your Teams applications data store.|
|[Azure API management](deploy.md) | An API gateway can be used to administer APIs created for Teams applications and publish them to consume on other applications, such as Power apps.|
|[Azure Key Vault](/azure/key-vault/general/overview) | Safeguard cryptographic keys and other secrets used by cloud apps and services.|

## Advantages

The following list provides advantages to add more cloud resources in TeamsFx:

* Provides convenience.
* Autogenerates all configuration files and connect to Teams app by using Teams Toolkit.

## Limitation

If you have created SPFx based tab project, you can't add Azure cloud resources.

**Scenarios to add Azure function feature**.

**Scenarios to add SQL database feature**.

**Scenarios to add API Management feature**.

**Scenarios to add Azure key vault feature**.

## Add cloud resources

**You can add cloud resources by the following methods:**

* To add cloud resources by using Teams Toolkit in Visual Studio Code.
* To add cloud resources by using command palette.

  > [!NOTE]
  > You need to provision for each environment, after you have successfully added the resource in your Teams app.
  
* **To add cloud resources by using Teams Toolkit in Visual Studio Code:**

   1. Open **Visual Studio Code**.
   1. Select **Teams Toolkit** from left panel.
   1. Select **Add features** under **DEVELOPMENT**.

        :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/cloud/select-feature-updated.png" alt-text="add feature" border="true":::

* **To add cloud resources by using command palette:**

   1. Open **command palette**.
   1. Enter **Teams:Add features**.
   1. Press **Enter**.

        :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/cloud/Teams-add-features.png" alt-text="cloud" border="true":::

   1. From the pop-up, select the cloud resources to add in your project.

        :::image type="content" source="~/assets/images/teams-toolkit-v2/manual/cloud/updated-final-cloud.png" alt-text="final" border="true":::

## Add cloud resources using TeamsFx CLI

* Change directory to your **project directory**.
* The following table lists the capabilities and required commands:

  |Cloud Resource|Command|
  |---------------|----------|
  | Azure function|`teamsfx add azure-function`|
  | Azure SQL database|`teamsfx add azure-sql`|
  | Azure API management|`teamsfx add azure-apim`|
  | Azure Key Vault|`teamsfx add azure-keyvault`|

## Available capabilities to add for different Teams project

You can choose to add different capabilities based on project you've created in Teams app.

The existing capabilities support all other supported capabilities except SPFx tab.

## Add Cloud resources

The following changes appear after adding resources in your project:

* New parameters added to azure.parameter.{env}.json to provide required information for provision.
* New content is included to ARM template under `templates/azure`, except the files are in `templates/azure/teamsfx` folder for added the Azure resources.
* The files under `templates/azure/teamsfx` folder are regenerated to ensure TeamsFx required configuration are up to date for added Azure resources.
* `.fx/projectSettings.json` is updated to track the available resources in your project.

The following additional changes appear after adding resources in your project:

|Resources|Changes|Description|
|---------------|---------------|-----------------------------|
|Azure functions|An Azure functions template code is added into a subfolder with path `yourProjectFolder/api`</br></br>`launch.json` and `task.json` updated under `.visual studio code` folder.| Includes a hello world http trigger template into your project.</br></br> Includes necessary scripts for Visual Studio Code to be executed when you want to debug your application locally.|
|Azure API management|An open API specification file added into a subfolder with path `yourProjectFolder/openapi`|Defines your API after publishing, it's the API specification file.|

## FAQ

* Describe Scenarios to add Azure function, SQL database, Azure key vault, API management.
* Is Azure function creating only web APIs to Teams application backend.
* Is azure SQL database used only for storing Teams application data.
* How to publish API on other application using Azure API management.
* What is meant by cryptographic keys in Azure key vault and is there any other functionality other than storing secrets.

## See also

* [Provision cloud resources](provision.md)
* [Create a new Teams app](create-new-project.md)
* [Add capabilities to Teams apps](add-capability.md)
* [Deploy to the cloud](deploy.md)
