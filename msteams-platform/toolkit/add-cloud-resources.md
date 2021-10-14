---
title: Add cloud resources
author: Rajeshwari-v
description:  Describes how to add cloud resources.
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: overview
---

# Add cloud resources

TeamsFx can provision resources that intended to host your application. You can also optionally include more cloud resources that fit your development needs. 

## Prerequisites

Before provisioning cloud resources in Azure and Microsoft 365, you must have the following accounts:
* A Microsoft 365 organizational account.
* An Azure Account with a valid subscription.
* A project created. 

> [!NOTE]
> * A tab project created with SPFx doesn’t support to add any additional Azure resources.
> * Read account and permission page (link to account page) to learn why these accounts are needed.
> * You can include each Azure resources only once for your project.

## Additional cloud resources can be added

TeamsFx provides seamless integrations with these Azure services that are common for many application scenarios, including:
* [Azure Functions](/azure/azure-functions/functions-overview): A serverless solution to meet your on-demand compute needs such as creating web APIs for your Teams Application’s backend. 
* [Azure SQL Database](/azure/azure-sql/database/sql-database-paas-overview): A fully managed platform as a service (PaaS) database engine to serve as your Teams Application’s data store.
* [Azure API Management](/azure/azure-sql/database/sql-database-paas-overview): An API gateway that can be used to administrate APIs created for Teams Application and publish them to consume on other applications such as Power Apps.

## Add cloud resources

### Add cloud resources from Teams Toolkit in Visual Studio Code

1. Activate Teams Toolkit from left side.

    ![Activate Teams Toolkit](~/assets/images/tools-and-sdks/teams-toolkit.png)
  
1. In the Teams Toolkit side bar panel, select `Add cloud resources` option.
    
	![Add cloud resources](~/assets/images/tools-and-sdks/add-cloud-resources.png)
 
1. From the pop-up, select the cloud resources you want to include into your project.

    ![Select cloud resources](~/assets/images/tools-and-sdks/select-cloud-resources.png)
 
1. Select **OK** to continue, there may be more questions needed based on the cloud resources you selected.

    instead, open the command palette and enter **Teams: Add cloud resources**. Follow the same process as it’s triggered from Tree View.

	![Alternate cloud resources](~/assets/images/tools-and-sdks/alternate-cloud-resources.png)
  
### Add cloud resources from TeamsFx CLI in Command Window

1. Change directory to your project directory.
1. Execute command to add different capabilities.     
The following table describes cloud resources and the corresponding commands to add them:

|Cloud Resources|	Command|
|---------------|----------|
|Add Azure Functions|	`teamsfx resource add azure-function --function-name your-func-name`|
|Add Azure SQL Database	|`teamsfx resource add --function-name your-func-name`|
|Add Azure API Management|	`teamsfx resource add azure-apim`|

## Add additional cloud resources

After adding cloud resources, based on the resource selected, following shows the changes made to your project and why it is made:

|Resources Added|	What changed|	Why these changes are made|
|---------------|---------------|-----------------------------|
|Azure Functions|	An Azure Functions template code are added into a subfolder with path `yourProjectFolder/api`</br></br>`launch.json` and `task.json` updated under `.vscode` folder.</br></br> `env.default.json` and `settings.json` under `.fx` folder.| To include a hello world http trigger template into your project.</br></br> To include necessary scripts for Visual Studio Code is executed when you wish to debug your application locally. </br></br> Learn more in local debug section. (Link to local debug document)</br></br> To include configurations for TeamsFx to track what resources are present in your project so you can easily provision them in cloud.|	
|Azure SQL|	`env.default.json` and `settings.json` under `.fx` folder.|	To include configurations for TeamsFx, track what resources are present in your project, you can easily provision them in cloud.|
|Azure API Management|	An Open API Specification file added into a subfolder with path `yourProjectFolder/openapi` </br></br> `env.default.json` and `settings.json` under `.fx` folder.|	This is the API specification file defines how your API can be called after you publish them.</br></br>To include configurations for TeamsFx to track what capabilities are present in your project so you can easily move your project to cloud.|

> [!NOTE]
> * When adding Azure SQL, we ask for Azure Function information. It’s because SQL needs to be accessed from server workload. If your project doesn't contain Azure Functions, we can create one for you.
> * When adding Azure APIM, we ask for the following information:
      * Azure function information. It’s because Azure API Management needs to work with Azure Functions. If your project doesn't contain Azure Functions, we cancreate one for you.
      * Your subscription information. It’s because we can look up to find an existing APIM instance to use in this project or you can choose to create a new instance.

## Provision resources

After adding cloud resources to your project, next step is provisioning them to your Azure account, here are the service details and configurations.
(Details Needed)

|Azure Services|	What happened during provision|	Reasons|
|--------------|----------------------------|-------------|
|Azure Functions|	Created the following resources: </br></br> Azure Function App </br></br> Storage Account </br></br> App Service Plan | To create required services and host, configure Azure Functions.|
|Azure SQL|Create Azure SQL Server</br></br> Create system assigned, managed identity </br></br> Setup Firewall Rule | This is to create Azure SQL Server instance, set up an identity to access the database and firewall rules for database protection.|
|Azure API Management|	Provision APIM Instance </br></br> Create and configure APIM Client AAD app.|This is to create a new APIM instance with consumption plan.</br></br> This is to represent a client application for the API published to APIM.|
		
Read more about provision cloud resource feature. (Link to provision section)

## Deployment

Once your resources have been provisioned in the cloud, you can deploy and upload project code to cloud. Following actions happen for each resource at deployment stage:

(Detail Needed)

|Cloud Resources|	What will happen|
|----------------|------------------|
|Azure Functions|Build backend API part (under folder `yourProject\api`). </br></br> Deploy the code.</br></br>Restart Function App. </br></br> Sync HttpTriggers.|	
|Azure API Management	|Import backend APIs (API in your backend part) to APIM instance as a new or existing version.|

## Advanced use case

You can skip adding a database user to your Azure SQL instance.
If you prefer or don’t have permission to create a user in the database, you can skip creating user during provision stage for Azure SQL:
Open `.fx\env.default.json` file and set value of `skipAddingUser` value to true under config section `fx-resource-azure-sql`.
 
## See also

* [Provision cloud resources](~/toolkit/provision-in-the-cloud.md)
* [Deploy your project](~/toolkit/deploy-to-the-cloud.md)
