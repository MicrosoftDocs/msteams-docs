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

TeamsFx helps to provision cloud resources for your application hosting. You can also optionally add cloud resources that fit your development needs.

## Prerequisite

[Install Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) version v3.0.0+.

> [!TIP]
> Ensure you have Teams app project in Visual Studio Code.

## Add cloud resources using Teams Toolkit

> [!IMPORTANT]
> You need to provision each environment after you add a resource.

1. Open **Microsoft Visual Studio Code**.
1. Select **Teams Toolkit** from left pane.
1. In the Teams Toolkit side bar panel, select **Add cloud resources**:

    :::image type="content" source="../assets/images/teams-toolkit-v2/manual/add cloudresources.png" alt-text="Add resources":::

   You can also open the command palette and enter **Teams: Add cloud resources**:

    :::image type="content" source="../assets/images/teams-toolkit-v2/manual/addcloud.png" alt-text="add cloud resources":::

1. From the pop-up, select the cloud resources you want to add to your Teams app project:

     :::image type="content" source="../assets/images/teams-toolkit-v2/manual/addresources.png" alt-text="add":::

1. Select **OK**.

The selected resources are successfully added to your project.

## Add cloud resources using TeamsFx CLI in command window

1. Change directory to your **project directory**.
1. Execute the following command to add different resources in your project:

|Cloud Resource|Command|
|---------------|----------|
| Azure function|`teamsfx resource add azure-function --function-name your-func-name`|
| Azure SQL database|`teamsfx resource add --function-name your-func-name`|
| Azure API management|`teamsfx resource add azure-apim`|
| Azure Key Vault|`teamsfx resource add azure-keyvault`|

## Types of cloud resources

TeamsFx integrates with Azure services for the following scenarios:

- [Azure functions](/azure/azure-functions/functions-overview): A serverless solution to meet your on-demand requirements, such as creating web APIs for your Teams applications backend.
- [Azure SQL database](/azure/azure-sql/database/sql-database-paas-overview): A platform as a service (PaaS) database engine to serve as your Teams applications data store.
- [Azure API management](deploy.md): An API gateway that can be used to administer APIs created for Teams applications and publish them to consume on other applications, such as Power apps.
- [Azure Key Vault](/azure/key-vault/general/overview): Safeguard cryptographic keys and other secrets used by cloud apps and services.

## Add Cloud resources

After adding any resource, the changes in your project are as follows:

- New parameters may be added to azure.parameter.{env}.json to provide required information for provision.
- New content is appended to ARM template under `templates/azure` folder except the files under `templates/azure/teamsfx` folder to create the added Azure resources.
- The files under `templates/azure/teamsfx` folder are regenerated to ensure TeamsFx required configuration are up to date for added Azure resources.
- `.fx/projectSettings.json` is updated to track the resources present in your project.

After adding resources, the additional changes in your project are as follows:

|Resources|Changes|Description|
|---------------|---------------|-----------------------------|
|Azure functions|An Azure functions template code is added into a subfolder with path `yourProjectFolder/api`</br></br>`launch.json` and `task.json` updated under `.visual studio code` folder.| Includes a hello world http trigger template into your project.</br></br> Includes necessary scripts for Visual Studio Code to be executed when you want to debug your application locally.|
|Azure API management|An open API specification file added into a subfolder with path `yourProjectFolder/openapi`|Defines your API after publishing, it's the API specification file.|

## Limitation

You can't add resources if you've created SPFx based tab project.

## See also

[Provision cloud resources](provision.md)
