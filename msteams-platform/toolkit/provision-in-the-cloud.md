---
title: Provision in the cloud
author: v-vasudhab
description:  Describes how to provision in the cloud.
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: Provision in the cloud
---

# Provision in the cloud 

TeamsFx provides integration with Azure and Microsoft 365 cloud. You can place your application in a secure cloud environment. In this step, necessary cloud resources are created in Azure and Microsoft 365 for your application.
 
## Prerequisites

For provisioning cloud resources in Azure and Microsoft 365, you must have the following accounts:

* Microsoft 365 
* Azure with valid subscription
 
For more information, see read account and permission page (link to the page).
 
## Provision resources

Teams Toolkit provision cloud resources are based on [Teams application capabilities](add-capabilities.md) and [Azure services](add-cloud-resources.md) that are included in your application.
 
### Microsoft 365 Cloud Resources

The following list provides required Microsoft 365 resources created in Microsoft 365 tenant for any kind of Teams application:

* Register an application in Teams, referred as Teams App ID.
* Register an application in Azure Active Directory, commonly referred as AAD App ID.
 
The following table describes the necessity of mentioned resources:

|Resources|Why my application needs it|
|----------|--------------------------------|
|Teams application | Application **registered in Teams platform** with information in manifest and is identified by a unique GUID.|
|Azure Active Directory application| Application **registered in Azure Active Directory** to represent your Teams application used to manage digital identity and permissions for your application. You can access features with single sign-on and ask for user consent when your application requires additional permissions to access user’s data in Microsoft 365. |
 
### Azure cloud resources by project type

Teams application can include different capabilities. Teams Toolkit provides appropriate default Azure services that host your application workloads. If your project includes multiple capabilities, all necessary Azure services must be provisioned. The following table describes information on different Teams capabilities and Azure services:

|Teams application capabilities| Azure services| Purposes|
|------------------------------|---------------|----------|
|Tab <br> To be hosted on Azure | - Azure Storage Account </br> - Azure Web App </br> - Azure App Service |- Host frontend static content of your tab application. </br> - Host server workload to handle authentication logic. </br> - Define set of compute resources for the web app to run, which are analogous to the [server farm](https://en.wikipedia.org/wiki/Server_farm) in conventional web hosting. |
| Tab </br> To be hosted on SharePoint |Provisioned Teams application registered with Teams Platform but **no Azure services are provisioned.**|
|Bot and Messaging Extension | - Azure Web App </br> - Azure App Service </br> - Azure Bot Service | - Host server logic for your bot application. </br> - Define set of compute resources for the web app to run, which are analogous to the [server farm](https://en.wikipedia.org/wiki/Server_farm) in conventional web hosting. </br> - Handles communication between your bot application and Teams client.|

> [!NOTE]  
> Azure services incur costs in your subscription, you can refer to [pricing calculator](https://azure.microsoft.com/pricing/calculator/) to understand an estimate.
 
You can optionally include the following additional Azure services that serve your application development needs:

* Azure Functions 
* Azure API Management 
* Azure SQL Database 
 
For more information on how to add cloud resources, see [Add cloud resources](add-cloud-resources.md). 
 
### Configuration changes

To create Azure service instance, Teams Toolkit makes the following configuration changes of the services.

|Resources |Configurations|Reason |
|-----------|-------------|----------|
|Azure Active Directory Application |Includes a delegated Microsoft Graph Permission `User.Read`|With this permission specified in the AAD app, the hello world application created by Teams Toolkit can retrieve user profile from Microsoft Graph.|
|Azure Storage Account|	Enables static content| Allows static content, such as HTML, CSS, JavaScript, and image files serving from a container.| 
|Bot Channel Registration|AAD app ID and client secret |The AAD app ID and client secret are configured to handle authentication between your bot and Teams.|
 
## Find provisioned resources

Teams Toolkit can provision the following Microsoft 365 and Azure resources:

* For Microsoft 365 resources, provision is created under your tenant. You can learn [how to find your Microsoft 365 tenant ID](/azure/active-directory/fundamentals/active-directory-how-to-find-tenant). 
* For Azure resources, provision created under a new resource group in your subscriptions. 

|Resources|Where to find them|
|---------|-------------------|
|Teams App ID|You can find the Teams App ID in your project’s manifest file after you package your application. Read about App Package (Link to publish section) </br> You can also find your Teams App ID in [Teams Developer Portal](https://dev.teams.microsoft.com/apps). 
|Azure Active Directory Application|Go to [Azure portal](https://portal.azure.com/) </br> Navigate to Azure Active Directory section. </br> Navigate to App registrations under manage section. </br> You can find your Azure Active Directory application with display name same as your project name. |
|Azure services |Go to [Azure portal](https://portal.azure.com/) </br> Navigate to Resource groups section.</br> Find a resource group with name of ${yourProjectName}-rg </br> You can find all Azure services provisioned in this resource group.|

## Perform provision

Provisioning is the same if your project contains multiple capabilities.

### Provision from Teams Toolkit in Visual Studio Code

1. Activate Teams Toolkit from left side.

    ![Activate Teams Toolkit ](~/assets/images/tools-and-sdks/teams-toolkit.png)

1. In the Teams Toolkit side bar panel, select `Provision in the cloud` option. 

    ![Provision in the cloud ](~/assets/images/tools-and-sdks/provision-in-cloud.png)

1. Select `Provision` to create cloud resources, or you can refer to pricing calculator for cost estimation.

    ![Select provision](~/assets/images/tools-and-sdks/select-provision.png)

    Instead, you can open command palette and enter **Teams: Provision in the cloud** .

    ![Alternate provision](~/assets/images/tools-and-sdks/alternate-provision.png)

### Provision from TeamsFx CLI in Command Window

1. Change directory to your project directory.
1. Execute command `teamsfx provision`.

    ![Execute command](~/assets/images/tools-and-sdks/execute-command.png)

## Advanced use cases

There are few common advanced use cases during cloud resources provision.
 
### Switch the subscription and re-do provision

1. Sign in to [Azure portal](https://portal.azure.com/) and delete the resource group that was created by Teams Toolkit.
1. Switch subscription in current account or log out and select a new subscription.
1. In your project directory, navigate to `.fx/env.default.json` file, change `provisionSucceeded` flag to false.
1. Go through provision flow again.
 
### Use an existing Azure Active Directory application

In certain cases where you don’t have permission to create an Azure Active Directory application, you can use an existing one with following steps:

1. Go to [Azure portal](https://portal.azure.com/).
1. Find Azure Active Directory section.
1. In overview, obtain Object ID and Application (client) ID for your AAD application.

     ![Obtain ID](~/assets/images/tools-and-sdks/obtain-id.png)

1. In Certificates & secrets, obtain Client secret by creating a new one.

    ![Client secret](~/assets/images/tools-and-sdks/client-secret.png)

1. In Manifest, find “ID” under “oauth2Permissions” and obtain the value of it.
1. In your project directory, navigate to `.fx/env.default.json ` and update the following value in the `fx-resource-aad-app-for-teams` section.

    ![Update value](~/assets/images/tools-and-sdks/update-value.png)

1. In your project directory, navigate to `.fx/default.userdata` and update the client secret to `x-resource-aad-app-for-teams.clientSecret=’your-secret’`
1. Go through provision flow.
 
### Change default resource group and resource suffix name

To use an existing resource group, change default resource group name, or change the resource suffix name after provision.

**To change default resource group and resource suffix name**

1. Sign in to [Azure portal](https://portal.azure.com/) and delete the resource group that was created by Teams Toolkit.
1. In your project directory, navigate to `.fx/env.default.json` file, change `resourceGroupName`, `resourceNameSuffix`, `resource_base_name`.
1. In the same file, change `provisionSucceeded` flag to false.
1. Go through provision flow again.

## See also

* [Add additional cloud resources](~/toolkit/add-cloud-resources.md)
* [Add additional Teams app capabilities](~/toolkit/add-capabilities.md)
* [Provision resources with CI/CD pipelines](~/toolkit/build-pipelines.md)
* [Deploy your project to cloud](~/toolkit/deploy-to-the-cloud.md)
