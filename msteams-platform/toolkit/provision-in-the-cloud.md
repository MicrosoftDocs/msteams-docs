---
title: Provision in the cloud
author: Rajeshwari-v
description:  Describes provision in the cloud.
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: overview
---

# Provision in the cloud 

TeamsFx provides seamless integration with Azure and M365 cloud so that you can easily put your application in a secure cloud environment. Provision is the first step to deploy an application to cloud. In this step, necessary cloud resources will be created in Azure and M365 for your application, but there is no code (HTML, CSS, JavaScript, etc.) is copied to the resources. 
 
 Before you can provision cloud resources in Azure and M365, you will need: 

* A M365 organizational account. 
* An Azure Account with a valid subscription. 
 
> [!NOTE]
> Read account and permission page (link to account page) to learn why these accounts are needed. 
 
## What resources will be provisioned

Teams Toolkit will provision cloud resources based on the Teams application capabilities (links to add capability page) and Azure services (links to add resources page) you have included in your application. 
 
### M365 Cloud Resources 

For any kind of Teams application, these M365 resources will be created in your M365 tenant: 

* Register an application in Teams. (Commonly referred as Teams App ID). 
* Register an application in Azure Active Directory (Commonly referred as AAD App ID). 
 
The reason that these resources are necessary is because:

|Resources | Why my application needs it? |
|----------|--------------------------------|
|Teams application | This is an application **registered in Teams platform** with the information in manifest and identified by a unique GUID.| 
|Azure Active Directory application| This is an application **registered in Azure Active Directory** to represent your Teams Application. This application is used to manage digital identity and permissions for your application so you could achieve features like single sign on and ask for user consent when your application requires additional permission to access user’s data in M365. |
 
### Azure cloud resources by project type 

Teams application can include different capabilities, and Teams Toolkit provides a most appropriate default Azure service that hosts your application workloads. If you project includes multiple capabilities, all necessary Azure services will be provisioned. 
 
(Details Needed) 
|Teams application capabilities| Azure services| Purposes|
|------------------------------|---------------|----------| 
|Tab <br> To be hosted on Azure |	Azure Storage Account </br> Azure Web App </br> Azure App Service |	Host frontend static content of your tab application. </br> Host a server side workload to handle authentication logic. </br> Defines a set of compute resources for the web app to run, which are analogous to the [server farm](https://en.wikipedia.org/wiki/Server_farm) in conventional web hosting. |
| Tab </br> To be hosted on SharePoint |There will be a Teams application registered with Teams Platform but **no Azure services will be provisioned.**|   
|Bot (and/or Messaging Extension) | Azure Web App </br> Azure App Service </br> Azure Bot Service | Host server logic for your bot application. </br> Defines a set of compute resources for the web app to run, which are analogous to the [server farm](https://en.wikipedia.org/wiki/Server_farm) in conventional web hosting. </br> Handles communication between your bot application and Teams client. |
 		
> [!NOTE]  
> Azure services will incur costs in your subscription, you can refer to [pricing calculator](https://azure.microsoft.com/en-us/pricing/calculator/) to understand an estimate. 
 
You can optionally include additional Azure services that serves your application development needs, including: 
* Azure Functions 
* Azure API Management 
* Azure SQL Database 
 
Please read add cloud resources (link to add cloud resources) page for more information about details of these services. 
 
### What has happened behind the scene? 

In addition to creating Azure service instance, Teams Toolkit has also made configuration changes of these services. 
 
(Details Needed) 
Resources 	Configurations 	Reason 
Azure Active Directory Application 	Includes a delegated Microsoft Graph Permission `User.Read` 	With this permission specified in the AAD app, the hello world application created by Teams Toolkit can retrieve user profile from Microsoft Graph. 
Azure Storage Account 	Enables Static Content  	This allows static content like HTML, CSS, JavaScript and image files serving from a container. 
Bot Channel Registration 	AAD app id and client secret 	The AAD app id and client secret is configured to handle authentication between your bot and Teams. 
 
## Where are the resources provisioned and how do I find them 

Teams Toolkit can provision both M365 and Azure resources. 
* For M365 resources, it will be created under your tenant. You can learn how to find your M365 tenant ID. 
* For Azure resources, it will be created under a new resource group in your subscriptions. 
 
Resources 	Where to find them… 
Teams App ID 	•	You can find the Teams App ID in your project’s manifest file after you packaged your application. Read about App Package (Link to publish section) 
•	You can also find your Teams App ID in Teams Developer Portal. 

Azure Active Directory Application 	•	Go to Azure Portal 
•	Navigate to Azure Active Directory section. 
•	Navigate to App registrations blade under manage section. 
You will find your Azure Active Directory application with display name same as your project name. 
Azure services 	•	Go to Azure Portal 
•	Navigate to Resource groups section. 
•	Find a resource group with name of ${yourProjectName}-rg 
You will find all Azure services provisioned in this resource group. 
 
## How to perform provision 
There are two approaches to provision cloud resources using Teams Toolkit and it’s similar for each project type, you can follow the details in below documentation. 
* Read provision section for Tab project: Get started - Build your first Teams app with React - Teams | Microsoft Docs 
* Read provision section for Tab project with SPFx: Get started - Build your first Teams app with SPFx - Teams | Microsoft Docs 
* Read provision section for Bot (and/or Messaging Extension) project: Get started - Build your first conversational bot - Teams | Microsoft Docs 
* Read provision section for Messaging Extension project: Get started - Build your first messaging extension - Teams | Microsoft Docs 
 
Note that it’s the same if your project contains multiple capabilities. 
 
(Below might not be needed and just reference to “Getting Started”?) 

### From Teams Toolkit in Visual Studio Code 
1. Activate Teams Toolkit from left side. 
1. In the Teams Toolkit side bar panel, select `Provision in the cloud` option.   
1. Click `Provision` if you are ready to create cloud resources, or you can refer to pricing calculator for cost estimation.     
Alternatively, you can open command palette and type: “Teams: Provision in the cloud” 
  
### From TeamsFx CLI in Command Window 

1. `cd` to your project directory 
1. Execute command `teamsfx provision` 
   
## Advanced use cases 

There are few common advanced scenarios during cloud resources provision. 
 
### You can switch a subscription and re-do provision 
1. Login to Azure Portal and delete the resource group that was created by Teams Toolkit. 
1. Switch subscription in current account or log out and select a new subscription. 
1. In your project directory, navigate to `.fx/env.default.json` file, change `provisionSucceeded` flag to false. 
1. Go through provision flow again. 
 
### You can use an existing Azure Active Directory application 

In certain cases where you don’t have permission to create an Azure Active Directory application, you can use an existing one with following step: 
1. Navigate to Azure Portal. 
1. Find Azure Active Directory section. 
1. In overview blade, obtain Object ID and Application (client) ID for your AAD application. 
1. In Certificates & secrets blade, obtain Client secret by creating a new one. 
1. In Manifest blade, find “id” under “oauth2Permissions” and obtain the value of it. 
1. In your project directory, navigate to `.fx/env.default.json ` and update the following value in the `fx-resource-aad-app-for-teams` section. 
1. In your project directory, navigate to `.fx/default.userdata` and update the client secret to `x-resource-aad-app-for-teams.clientSecret=’your-secret’` 
1. Go through provision flow. 
 
### You can change default resource group and resource suffix name

If you wish to use an existing resource group, change default resource group name, or change the resource suffix name after a provision, you can do so by: 
1. Login to Azure Portal and delete the resource group that was created by Teams Toolkit. 
1. In your project directory, navigate to `.fx/env.default.json` file, change `resourceGroupName`, `resourceNameSuffix` and `resource_base_name`. 
1. In the same file, change `provisionSucceeded` flag to false. 
1. Go through provision flow again. 
 
## What’s next

* [Add additional cloud resources]()  
* [Add additional Teams app capabilities]() 
* [Provision resources with CI/CD pipelines]() 
* [Deploy your project to cloud]() 
