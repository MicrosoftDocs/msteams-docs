---
title: Use Teams Toolkit to provision cloud resources
author: MuyangAmigo
description: provision cloud resources
ms.author: shenwe
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Use Teams Toolkit to provision cloud resources

TeamsFx provides seamless integration with Azure and Microsoft 365 cloud that allows you to place your application in Azure with a single command. TeamsFx integrates with Azure Resource Manager that enables you to declaratively provision Azure resources your application needs using infrastructure as code approach.  

## Prerequisites

1. Account prerequisites

    To provision cloud resources in Azure and Microsoft 365, you must have the following accounts with proper permissions. Refer to [Prepare accounts to build Teams app](accounts.md) for more information.

    * Microsoft 365
    * Azure with valid subscription

2. [Install Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) version v3.0.0+.
1. You should already have a Teams app project opened in VS code.

## Provision using Teams Toolkit

Provision is performed with single command in Teams Toolkit for Visual Studio Code or TeamsFx CLI.

* [Provision Azure-based app](https://docs.microsoft.com/microsoftteams/platform/sbs-gs-javascript?tabs=vscode%2Cvsc%2Cviscode%2Cvcode&tutorial-step=8&branch=pr-en-us-4657)

## What resources will be created

When you trigger provision command in Teams Toolkit or TeamsFx CLI, the tool will create following resources for you:

* AAD application under your Microsoft 365 tenant
* Teams app registration under your Microsoft 365 tenant's Teams platform
* Azure resources under your selected Azure subscription

When you create a new project, an ARM template will be generated under your project folder which defines all the Azure resources need to be created. The ARM template will be used to create required Azure resources during provision. When you [adds new capability/resource](./add-resource.md) to an existing project, the ARM template will be updated to reflect the latest change.

> [!NOTE]
> Azure services incur costs in your subscription, you can refer to [pricing calculator](https://azure.microsoft.com/pricing/calculator/) to understand an estimate.

### Resources created for Teams Tab Application

|Resources|Purpose of this resource| Notes |
|----------|--------------------------------|-----|
| Azure Storage | Host your tab app | Enables static web app feature to host your tab app |
| App Service Plan for Simple Auth | Host the web app of Simple Auth | |
| Web App for Simple Auth | Host simple auth server that helps you gain access to other services in your single page application | Added user assigned identity to make it easy to access other Azure resources |
| User Assigned Identity | Authenticate Azure service to service requests | This is shared across different capabilities and resources |

### Resources created for Teams Bot or Messaging Extension Application

|Resources|Purpose of this resource| Notes |
|----------|--------------------------------|-----|
| Azure Bot Service | Registers your app as a bot with the Bot Framework | Connects the bot to Teams |
| App Service Plan for Bot | Host the web app of Bot | |
| Web App for Bot | Host your bot app | Adds user assigned identity to make it easy to access other Azure resources. <br /> Adds app settings required by [TeamsFx SDK](https://www.npmjs.com/package/@microsoft/teamsfx) |
| User Assigned Identity | Authenticate Azure service to service requests | This is shared across different capabilities and resources |

### Resources created when including Azure Functions in the project

|Resources|Purpose of this resource| Notes |
|----------|--------------------------------|-----|
| App Service Plan for Function App | Host the Function App | |
| Function App | Host your Azure Functions APIs | Adds user assigned identity to make it easy to access other Azure resources. <br /> Adds CORS rule to allow requests from your tab app. <br /> Adds authentication setting that only allows requests from your Teams app. <br /> Adds app settings required by [TeamsFx SDK](https://www.npmjs.com/package/@microsoft/teamsfx) |
| Azure Storage for Function App | Required when creating Function App | |
| User Assigned Identity | Authenticate Azure service to service requests | This is shared across different capabilities and resources |

### Resources created when including Azure SQL in the project

|Resources|Purpose of this resource| Notes |
|----------|--------------------------------|-----|
| Azure SQL Server | Host the Azure SQL Database instance | Allows all Azure services to access the server |
| Azure SQL Database | Store data for your app | Grants user assigned identity read/write permission to the database |
| User Assigned Identity | Authenticate Azure service to service requests | This is shared across different capabilities and resources |

### Resources created when including Azure API Management in the project

|Resources|Purpose of this resource|
|----------|--------------------------------|
| Azure Active Directory application for API Management service | Allows Microsoft Power Platform access APIs managed by API Management service |
| API Management Service | Manage your APIs hosted in Function App |
| API Management Product | Group your APIs, define terms of use and runtime policies |
| API Management OAuth Server | Let Microsoft Power Platform able to access your APIs hosted in Function App |
| User Assigned Identity | Authenticate Azure service to service requests |

## Customize resource provision behavior

Teams Toolkit enables you to use an infrastructure as code approach to define what Azure resources you want to provision, and how you want to configure them. The tooling uses ARM template to define Azure resources. The ARM template is a set of bicep files that defines the infrastructure and configuration for your project. You can customize Azure resources being created by modifying the ARM template. Visit [bicep document][/azure/azure-resource-manager/bicep/](/azure/azure-resource-manager/bicep/) to learn more about how to use bicep to author ARM template. Provision with ARM usually involves changing two sets of files, parameters and templates:

* ARM parameter files (`azure.parameters.{your_env_name}.json`) are located at `.fx/configs` folder, for passing parameters to templates.
* ARM template files located at `templates/azure`, this folder contains following files:

| File | What does it do | Allow customization |
| --- | --- | --- |
| main.bicep | Entry point for Azure resource provision | Yes |
| provision.bicep | Create and config Azure resources | Yes |
| config.bicep | Add TeamsFx required configurations to Azure resources | Yes |
| provision/xxx.bicep | Consumed by `provision.bicep` to create and config each Azure resources | Yes |
| teamsfx/xxx.bicep | Consumed by `config.bicep` to add TeamsFx required configurations to each Azure resources | No |

> [!NOTE]
> `teamsfx/xxx.bicep` will be regenerated when you add resources / capabilities to your project. That's why it's marked as not customizable. If you really have requirement to modify these bicep files, we suggest using Git to track your changes to `teamsfx/xxx.bicep` files so you won't lose your changes when adding resources / capabilities.

### Customize ARM parameters and templates

You have two ways to customize Azure resources being created: customizing the parameter files and customizing the bicep files.

#### Customize ARM template parameter files

The tooling provides a set of predefined parameters for you to customize the Azure resources. The parameter files are located at `.fx/configs/azure.parameters.{env}.json` and all the available parameters are defined in the `provisionParameters` property. It's preferred to customize the parameter files if the predefined parameters satisfies your requirement.

Here's a list of predefined parameters available:

| Parameter name | Default Value | What can be customized by the parameter | Value constraints |
| --- | --- | --- | --- |
| resourceBaseName | auto generated for each environment | Default name for all resources | 2-20 lowercase letters and numbers |
| simpleAuthServerFarmsName | ${resourceBaseName}simpleAuth | Name of Simple Auth App Service Plan | 1-40 alphanumerics and hyphens |
| simpleAuthWebAppName | ${resourceBaseName}simpleAuth | Name of Simple Auth Web App | 2-60 alphanumerics and hyphens <br /> Cannot start or end with hyphen |
| simpleAuthSku | F1 | SKU of Simple Auth App Service Plan |  |
| frontendHostingStorageName | ${resourceBaseName}tab | Name of Frontend Hosting Storage Account | 3-24 lowercase letters and numbers |
| frontendHostingStorageSku | Standard_LRS | SKU of Frontend Hosting Storage Account | Please refer this [page][/azure/templates/microsoft.storage/storageaccounts?tabs=bicep#sku](/azure/templates/microsoft.storage/storageaccounts?tabs=bicep) for available SKUs |
| functionServerfarmsName | ${resourceBaseName}api | Name of Function App's App Service Plan | 1-40 alphanumerics and hyphens |
| functionServerfarmsSku | Y1 | SKU of FUnction App's App Service Plan |
| functionAppName | ${resourceBaseName}api | Name of Function App | 2-60 alphanumerics and hyphens <br /> Cannot start or end with hyphen |
| functionStorageName | ${resourceBaseName}api | Name of Function App's Storage Account | 3-24 lowercase letters and numbers |
| functionStorageSku | Standard_LRS | SKU of Function App's Storage Account | Please refer this [page][/azure/templates/microsoft.storage/storageaccounts?tabs=bicep#sku](/azure/templates/microsoft.storage/storageaccounts?tabs=bicep)  for available SKUs |
| botServiceName | ${resourceBaseName} | Name of Azure Bot service | 2-64 alphanumerics, underscores, periods, and hyphens <br /> Start with alphanumeric |
| botServiceSku | F0 | SKU of Azure Bot service | Please refer this [page][/azure/templates/microsoft.botservice/2021-05-01-preview/botservices?tabs=bicep#sku](/azure/templates/microsoft.botservice/2021-05-01-preview/botservices?tabs=bicep) for available SKUs |
| botDisplayName | ${resourceBaseName} | Display name of your bot | 1-42 characters |
| botServerfarmsName | ${resourceBaseName}bot | Name of Bot's App Service Plan | 1-40 alphanumerics and hyphens |
| botWebAppName | ${resourceBaseName}bot | Name of Bot's Web App | 2-60 alphanumerics and hyphens <br /> Cannot start or end with hyphen |
| botWebAppSKU | F1 | SKU of Bot App Service Plan |  |
| userAssignedIdentityName | ${resourceBaseName} | Name of user assigned identity | 3-128 alphanumerics, hyphens, and underscores <br /> Start with letter or number |
| sqlServerName | ${resourceBaseName} | Name of Azure SQL Server | 1-63 lowercase letters, numbers, and hyphens <br /> Cannot start or end with hyphen |
| sqlDatabaseName | ${resourceBaseName} | Name of Azure SQL Database | 1-128 characters, can't use <>*%&:\/? or control characters <br /> Can't end with period or space |
| sqlDatabaseSku | Basic | SKU of Azure SQL Database |  |
| apimServiceName | ${resourceBaseName} | Name of APIM Service | 1-50 alphanumerics and hyphens <br /> Start with letter and end with alphanumeric |
| apimServiceSku | Consumption | SKU of APIM Service | Please refer this [page][/azure/templates/microsoft.apimanagement/service?tabs=bicep#apimanagementserviceskuproperties](/azure/templates/microsoft.apimanagement/service?tabs=bicep) for available SKUs |
| apimProductName | ${resourceBaseName} | Name of APIM Product | 1-80 alphanumerics and hyphens <br /> Start with letter and end with alphanumeric |
| apimOauthServerName | ${resourceBaseName} | Name of APIM OAuth Server | 1-80 alphanumerics and hyphens <br /> Start with letter and end with alphanumeric |

In the meanwhile, following parameters are available with values populated during provision. The purpose of these placeholders is to ensure we can create new resources for you when you created a new environment. The actual values are resolved from `.fx/states/state.{env}.json`.

##### AAD application related parameters

| Parameter name | Default value place holder | Meaning of the place holder | How to customize |
| --- | --- | --- | --- |
| m365ClientId | {{state.fx-resource-aad-app-for-teams.clientId}} | Your app's AAD app client id created during provision | Refer [this section](#use-an-existing-aad-app-for-your-teams-app) to customize the value |
| m365ClientSecret | {{state.fx-resource-aad-app-for-teams.clientSecret}} | Your app's AAD app client secret created during provision | Refer [this section](#use-an-existing-aad-app-for-your-teams-app) to customize the value |
| m365TenantId | {{state.fx-resource-aad-app-for-teams.tenantId}} | Tenant id of your app's AAD app | Refer [this section](#use-an-existing-aad-app-for-your-teams-app) to customize the value |
| m365OauthAuthorityHost | {{state.fx-resource-aad-app-for-teams.oauthHost}} | OAuth authority host of your app's AAD app | Refer [this section](#use-an-existing-aad-app-for-your-teams-app) to customize the value |
| botAadAppClientId | {{state.fx-resource-bot.botId}} | Bot's AAD app client id created during provision | Refer [this section](#use-an-existing-aad-app-for-your-bot) to customize the value |
| botAadAppClientSecret | {{state.fx-resource-bot.botPassword}} | Bot's AAD app client secret created during provision | Refer [this section](#use-an-existing-aad-app-for-your-bot) to customize the value |
| apimClientId | {{state.fx-resource-apim.apimClientAADClientId}} | APIM's AAD app client id created during provision | Delete the placeholder and fill the actual value |
| apimClientSecret | {{state.fx-resource-apim.apimClientAADClientSecret}} | APIM's AAD app client secret created during provision | Delete the placeholder and fill the actual value |

##### Azure resource related parameters

| Parameter name | Default value place holder | Meaning of the place holder | How to customize |
| --- | --- | --- | --- |
| azureSqlAdmin | {{state.fx-resource-azure-sql.admin}} | Azure SQL Server admin account you provided during provision | Delete the placeholder and fill the actual value |
| azureSqlAdminPassword | {{state.fx-resource-azure-sql.adminPassword}} | Azure SQL Server admin password you provided during provision | Delete the placeholder and fill the actual value |
| apimPublisherEmail | {{state.fx-resource-apim.publisherEmail}} | APIM's publisher email, default value is your Azure account | Delete the placeholder and fill the actual value |
| apimPublisherName | {{state.fx-resource-apim.publisherName}} | APIM's publisher name, default value is your Azure account | Delete the placeholder and fill the actual value |

#### Referencing environment variables in parameter files

Some times you may not want to hardcode the values in parameter files. For example, when the value is a secret. The parameter files support referencing the values from environment variables. You can use syntax `{{$env.YOUR_ENV_VARIABLE_NAME}}` in parameter values to tell the tooling that the value needs to be resolved from current environment variable.

Following example will read the value of `mySelfHostedDbConnectionString` parameter from environment variable `DB_CONNECTION_STRING`:

```json
...
    "mySelfHostedDbConnectionString": "{{$env.DB_CONNECTION_STRING}}"
...
```

#### Customize ARM template files

If the predefined templates does not meet your application requirement, you can customize the ARM templates under `templates/azure` folder. For example, you can customize the ARM template to create some additional Azure resources for your app. This is an advance scenario and requires you have basic knowledge of bicep language which is used to author ARM template. You can get started with bicep at [bicep documentation][/azure/azure-resource-manager/bicep/](/azure/azure-resource-manager/bicep/)
> [!NOTE]
> The ARM template is shared by all environments. You can use [conditional deployment][/azure/azure-resource-manager/bicep/conditional-resource-deployment](/azure/azure-resource-manager/bicep/conditional-resource-deployment) if the provision behavior various between environments.

To ensure the TeamsFx tooling functions properly, please ensure your customized ARM template satisfies following requirement. If you uses other tooling for further development, you can ignore these requirement.

1. Keep the folder structure and file name unchanged. The tool may append new content to existing files when you adds more resources / capabilities to your project.
2. Keep the name of auto generated parameters as well as its property names unchanged. The auto generated parameters may be used when you adds more resources / capabilities to your project.
3. Keep the output of auto generated ARM template unchanged. You can add additional outputs to ARM template. The output will be persisted to `.fx/states/state.{env}.json` and used in other features like deploy, validate manifest file, etc.

### Customization Scenarios and Examples

These are some common scenarios you can customize the provision behavior.

#### Use an existing AAD app for your Teams app

You can add following configuration snippet to `.fx/configs/config.{env}.json` file to use an AAD app created by yourself for your Teams app. You can follow <https://aka.ms/teamsfx-existing-aad-doc> to create an AAD app that can be used here.

```json
"auth": {
    "clientId": "<your AAD app client id>",
    "clientSecret": "{{$env.ENV_NAME_THAT_STORES_YOUR_SECRET}}",
    "objectId": "<your AAD app object id>",
    "accessAsUserScopeId": "<id of the access_as_user scope>"
}
```

After added above snippet, add your secret to related environment variable so the tooling can resolve the actual secret during provision.

> [!NOTE]
> You should not share one AAD app in multiple environments. If you do not have permission to update the AAD app, you will get a warning with instructions about how to manually update the AAD app. Please follow the instructions to update your AAD app after provision.

#### Use an existing AAD app for your bot

You can add following configuration snippet to `.fx/configs/config.{env}.json` file to use an AAD app created by yourself for your bot.

```json
"bot": {
    "appId": "<your AAD app client id>",
    "appPassword": "{{$env.ENV_NAME_THAT_STORES_YOUR_SECRET}}"
}
```

After added above snippet, add your secret to related environment variable so the tooling can resolve the actual secret during provision.

> [!NOTE]
> You should not share one AAD app in multiple environments.

#### Skip adding user for SQL database

Sometimes you may get insufficient permission error when the tool tries to add user to SQL database. You can add following configuration snippet to `.fx/configs/config.{env}.json` file to skip adding SQL database user.

```json
"skipAddingSqlUser": true
```

### Example: specifying the name of Function App instance

This this example, I will specify another name `contosoteamsappapi` for Function App instance instead of using the default name.

The steps are:

1. Open `.fx/configs/azure.parameters.{env}.json` for your current environment.
2. Add a new property `functionAppName` to the value of parameter `provisionParameters`.
3. Fill "contosoteamsappapi" as value of `functionAppName`
4. The final parameter file will looks like following

    ```json
    {
        "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentParameters.json#",
        "contentVersion": "1.0.0.0",
        "parameters": {
            "provisionParameters": {
            "value": {
                "functionAppName": "contosoteamsappapi"
                ...
                }
            }
        }
    }
    ```

> [!NOTE]
> If you already provisioned the environment, specifying the name will create a new Function App instance for you, instead of renaming the instance created previously.

### Example: Add other Azure resource (Azure Storage) to the application

Consider the scenario, you want to add Azure Storage to your Azure Function backend to store some blob data. There is no auto flow to update the bicep template with Azure Storage support. However, you can edit the bicep file and add the resource. The steps are as follows

1. Create a tab project
2. Add a function to the project. You can visit [Add Resources](./add-resource.md) to learn more about adding resources.
3. Declare the new Storage Account in ARM template. For simplify, we will declare the resource at `templates/azure/provision/function.bicep` directly. You're free to declare the resources in other places.

    `````````bicep
    var applicationStorageAccountName = 'myapp${uniqueString(resourceGroup().id)}'
    resource applicationStorageAccount 'Microsoft.Storage/storageAccounts@2021-06-01' = {
        name: applicationStorageAccountName
        location: resourceGroup().location
        kind: 'Storage'
        sku: {
            name: 'Standard_LRS'
        }
    }
    `````````

4. Update the Azure Function App Settings with Azure Storage connection string in `templates/azure/provision/function.bicep`, which is the same file in step 3. Add following snippet to `functionApp` resource's `appSettings` array.

    ``````````````````bicep
    {
        name: 'MyAppStorageAccountConnectionString'
        value: 'DefaultEndpointsProtocol=https;AccountName=${applicationStorageAccount.name};AccountKey=${listKeys(applicationStorageAccount.id, '2021-06-01').key[0].value}'
    }
    ```````````````````

5. Now your can update your function with Azure Storage output bindings.

## FAQ

<br>

<details>

<summary><b>How to troubleshooting?</b></summary>

If you met errors with Teams Toolkit in Visual Studio Code, you can click the `Get Help` button on the error notification to navigate to related help doc. If you're using TeamsFx CLI, there will be a hyper link at the end of error message that points to the help doc. You can also view [provision help doc](https://aka.ms/teamsfx-arm-help) directly.

<br>

</details>

<details>

<summary><b>How can I switch to another Azure subscription when provision?</b></summary>

1. Switch subscription in current account or log out and select a new subscription.
2. If you already provisioned current environment, you need to create a new environment and perform provision because ARM does not support moving resources.
3. If you did not provision current environment, you can trigger provision directly.

<br>

</details>

<details>

<summary><b>How can I change resource group when provision?</b></summary>

Before provision, the tool will ask you if you want to create a new resource group or use an existing one. You can provide a new resource group name or choose an existing one in this step.

<br>

</details>

<details>

<summary><b>How can I provision SharePoint-based app?</b></summary>

You can follow [Provision SharePoint-based app][/microsoftteams/platform/sbs-gs-spfx?tabs=vscode%2Cviscode&tutorial-step=4](/microsoftteams/platform/sbs-gs-spfx?tabs=vscode%2Cviscode&tutorial-step=4) to provision SharePoint-based app.

<br>

</details>




> [!NOTE]
> Please note that currently building Teams App with SharePoint Framework using Teams Toolkit doesn't have direct integration with Azure, contents in this doc does not apply to SPFx based apps.

## See Also

> [!div class="nextstepaction"]
> [Deploy Teams app to the cloud](deploy.md)

> [!div class="nextstepaction"]
> [Manage multiple environments](TeamsFx-multi-env.md)

> [!div class="nextstepaction"]
> [Collaborate with other developers on Teams project](TeamsFx-collaboration.md)
