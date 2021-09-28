---
title: Add cloud resources
author: Rajeshwari-v
description:  Describes how to add cloud resources.
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: overview
---

# Add cloud resources

TeamsFx can provision resources that intended to host your application. You can also optionally include additional cloud resources that fits your development needs. 
Prerequisite
Before you can provision cloud resources in Azure and M365, you will need:
•	A M365 organizational account.
•	An Azure Account with a valid subscription.
•	A project created 
Note:
1.	A tab project created with SPFx doesn’t support to add any additional Azure resources.
2.	Read account and permission page (link to account page) to learn why these accounts are needed.
3.	You can include each Azure resources only once for your project.

What additional cloud resources can be added
TeamsFx provides seamless integrations with these Azure services that are common for many application scenarios, including:
•	Azure Functions: A serverless solution to meet your on-demand compute needs such as creating web APIs for your Teams Application’s backend. 
•	Azure SQL Database: A fully managed platform as a service (PaaS) database engine to serve as your Teams Application’s data store.
•	Azure API Management:  A modern API gateway that can be used to administrate APIs you created for your Teams Application and publish them to be consumed on other applications such as Power Apps.

How to add cloud resources
From Teams Toolkit in Visual Studio Code
1.	Activate Teams Toolkit from left side.
  
2.	In the Teams Toolkit side bar panel, select `Add cloud resources` option.
 
3.	From the pop up, select the cloud resources you want to include into your project.
 
4.	Select OK to continue, there may be additional questions needed based on the cloud resources you selected.

Alternatively, you can open the command palette and type: “Teams: Add Capabilities”. Follow the same process as it’s triggered from Tree View.
 

From TeamsFx CLI in Command Window
1.	`cd` to your project directory.
2.	Execute following command to add different capabilities:

Cloud Resources	Command
Add Azure Functions	`teamsfx resource add azure-function --function-name your-func-name`
Add Azure SQL Database	`teamsfx resource add --function-name your-func-name`
Add Azure API Management	`teamsfx resource add azure-apim`

What will happen after you add additional cloud resources
After you successfully added cloud resources, and based on the resource you selected, these are the changes made to your project and why they are made.

Resources Added	What changed	Why these changes are made
Azure Functions	An Azure Functions template code are added into a subfolder with path `yourProjectFolder/api`	To include a hello world http trigger template into your project.
	`launch.json` and `task.json` updated under `.vscode` folder.	To include necessary scripts for Visual Studio Code  that will be executed when you wish to debug your application locally.

Learn more about this in local debug section. (Link to local debug document)
	`env.default.json` and `settings.json` under `.fx` folder.	To include configurations for TeamsFx to track what resources are present in your project so you can easily provision them in cloud.
Azure SQL	`env.default.json` and `settings.json` under `.fx` folder.	To include configurations for TeamsFx to track what resources are present in your project so you can easily provision them in cloud.
Azure API Management	An Open API Specification file added into a subfolder with path `yourProjectFolder/openapi`	This is the API specification file defines how your API can be called after you publish them.
	`env.default.json` and `settings.json` under `.fx` folder.	To include configurations for TeamsFx to track what capabilities are present in your project so you can easily move your project to cloud.

Note:
1.	When adding Azure SQL, we will ask for Azure Function information. It’s because SQL needs to be accessed from server workload. If your project doesn't contain Azure Functions, we will create one for you.
2.	When adding Azure APIM, we will ask for:
a.	Azure function information. It’s because Azure API Management needs to work with Azure Functions. If your project doesn't contain Azure Functions, we will create one for you.
b.	Your subscription information. It’s because we can look up to find an existing APIM instance to use in this project or you can choose to create a new instance.

What will happen when you provision the resources.
After you successfully added cloud resources to your project, next step is that you can provision them to your Azure account. These are the service details and configurations Teams Toolkit made behind the scenes.

(Details Needed)
Azure Services	What happened during provision	Reasons
Azure Functions	Created these resources: 
•	Azure Function App
•	Storage Account
•	App Service Plan	This is to create required services to host and configure Azure Functions
Azure SQL	Create Azure SQL Server
Create system assigned, managed identity 
Setup Firewall Rule	This is to create Azure SQL Server instance, setup an identity to access the database and firewall rules for database protection.
Azure API Management	Provision APIM Instance	This is to create a new APIM instance with consumption plan.
	Create and configure APIM Client AAD app.	This is to represent a client application for the API published to APIM.

Read more about provision cloud resource feature. (Link to provision section)

What will happen in deployment.
Once your resources has been provisioned in the cloud, now you can deploy and upload project code to cloud. These are what will happen for each resources at deployment stage.

(Detail Needed)
Cloud Resources	What will happen
Azure Functions	•	Build backend API part (under folder `yourProject\api`). 
•	Deploy the code.
•	Restart Function App. 
•	Sync HttpTriggers.
Azure API Management	Import backend APIs (API in your backend part) to APIM instance as a new or existing version.


Advanced use case
You can skip adding a database user to your Azure SQL instance
If you prefer or don’t have permission to create a user in the database, you have the option to skip creating user during provision stage for Azure SQL:
Open `.fx\env.default.json` file and set value of `skipAddingUser` value to true under config section `fx-resource-azure-sql`.
 

What’s next
•	Provision resources.
•	Deploy your project.
