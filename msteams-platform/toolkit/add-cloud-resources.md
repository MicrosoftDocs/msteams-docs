---
title: Add cloud resources
author: v-vasudhab
description:  Describes how to add cloud resources.
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: Add cloud resources
---

# Add cloud resources

TeamsFx can provision for resources to host your application. You can also optionally add more cloud resources that fit your development needs.

## Prerequisites

Before provisioning cloud resources in Azure and Microsoft 365, you must have the following:

* Microsoft 365 organizational account
* Azure Account with valid subscription
* A ready project

> [!NOTE]
> * A tab project created with SPFx doesn’t support addition of any more Azure resources.
> * You can include each Azure resources only once for your project.

For more information, see read account and permission page (link to account page).

## More cloud resources can be added

TeamsFx provides seamless integrations with Azure services that are common for the following application scenarios:

* [Azure functions](/azure/azure-functions/functions-overview): A serverless solution to meet your on-demand requirements, such as creating web APIs for your Teams applications’ backend.
* [Azure SQL database](/azure/azure-sql/database/sql-database-paas-overview): A fully managed platform as a service (PaaS) database engine to serve as your Teams applications’ data store.
* [Azure API management](/azure/azure-sql/database/sql-database-paas-overview): An API gateway that can be used to administer APIs created for Teams applications’ and publish them to consume on other applications, such as Power Apps.

## Add cloud resources from Teams Toolkit in Visual Studio Code

1. Open **Visual Studio Code**.
1. Select **Teams Toolkit** from left panel.

    ![Activate Teams Toolkit](~/assets/images/tools-and-sdks/teams-toolkit.png)

1. In the Teams Toolkit side bar panel, select `Add cloud resources` option.

    ![Add cloud resources](~/assets/images/tools-and-sdks/add-cloud-resources.png)

1. From the pop-up, select the cloud resources to include into your project.
1. Choose any resource from the option.

     ![Select cloud resources](~/assets/images/tools-and-sdks/select-cloud-resources.png)

1. Select **OK** to continue.
Open the command palette and enter **Teams: Add cloud resources**. Follow the same process as it’s triggered from Tree View.

    ![Alternate cloud resources](~/assets/images/tools-and-sdks/alternate-cloud-resources.png)

## Add cloud resources from TeamsFx CLI in Command Window

1. Change directory to your project directory.
1. Execute command to add different capabilities.

The following table describes cloud resources and the corresponding commands to add them:

|Cloud Resources|Command|
|---------------|----------|
| Azure functions|`teamsfx resource add azure-function --function-name your-func-name`|
| Azure SQL database|`teamsfx resource add --function-name your-func-name`|
| Azure API management|`teamsfx resource add azure-apim`|

## Add more cloud resources

The following table provides the changes made to your project and the reasons:

|Resources Added|What changed|Why these changes are made|
|---------------|---------------|-----------------------------|
|Azure Functions|An Azure Functions template code are added into a subfolder with path `yourProjectFolder/api`</br></br>`launch.json` and `task.json` updated under `.vscode` folder.</br></br> `env.default.json` and `settings.json` under `.fx` folder.| Include a hello world http trigger template into your project.</br></br> To include necessary scripts for Visual Studio Code is executed when you want to debug your application locally. </br></br> To learn more in local debug section. (Link to local debug document)</br></br> To include configurations for TeamsFx, to track the capabilities present in your project, you can easily move your project to cloud.|	
|Azure SQL|	`env.default.json` and `settings.json` under `.fx` folder.|	To include configurations for TeamsFx, track resources in your project and provision them in cloud.|
|Azure API Management|An Open API Specification file added into a subfolder with path `yourProjectFolder/openapi` </br></br> `env.default.json` and `settings.json` under `.fx` folder.|This is the API specification file defines your API after publishing.</br></br> To include configurations for TeamsFx, to track the capabilities present in your project, you can easily move your project to cloud.|

> [!NOTE]
> * When adding Azure SQL, provide Azure function information. You need to access SQL from server workload. If your project doesn't contain Azure Functions, then it can be created for you.
> * When adding Azure APIM, provide the following information:
<br>
      * Azure function information, as Azure API Management needs to work with Azure functions. If your project doesn't contain Azure functions, then it can be created for you.</br>
<br>    * Your subscription information, to find an existing APIM instance to use in the project or you can choose to create a new instance.</br>

## Provision resources

After adding cloud resources to your project, the next step is to provision them to your Azure account. The following table provides the service details and configurations.

|Azure services|Provision resources|Reasons|
|--------------|----------------------------|-------------|
|Azure functions|The following resources are created: </br></br> - Azure function App </br></br> - Storage account </br></br> - App service plan | To create required services and host, configure Azure Functions.|
|Azure SQL|Create Azure SQL server.</br></br> Create system assigned, managed identity. </br></br> Setup firewall rule | Creates Azure SQL server instance, set up an identity to access the database and firewall rules for database protection.|
|Azure API management|Provision APIM instance </br></br> Create and configure APIM Client AAD app.| Creates a new APIM instance with consumption plan.</br></br> Represents client application for the API published to APIM.|

For more information, see [Provision in the cloud](provision-in-the-cloud.md).

## Deployment

Once your resources have been provisioned in the cloud, you can deploy and upload project code to cloud. The following actions take place for each resource at deployment stage:

|Cloud resources|Actions|
|----------------|------------------|
|Azure functions|Build backend API part (under folder `yourProject\api`). </br></br> Deploy the code.</br></br>Restart function App. </br></br> Sync HttpTriggers.|
|Azure API management|Import backend APIs to APIM instance as new or existing version.|

## Advanced use case

If you don't have permission to create a user in the database, you can skip adding a database user to your Azure SQL instance.

Open `.fx\env.default.json` file.
Set value of `skipAddingUser` to true.
Under config section `fx-resource-azure-sql`.

## See also

* [Provision cloud resources](~/toolkit/provision-in-the-cloud.md)
* [Deploy your project](~/toolkit/deploy-to-the-cloud.md)
