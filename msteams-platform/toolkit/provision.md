---
title: Use Teams Toolkit to provision cloud resources
author: MuyangAmigo
description: In this module, learn how to do provision cloud resources using Teams Toolkit, resource creation and customize resource provision
ms.author: shenwe
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Provision resources in the cloud

TeamsFx integrates with Azure and Microsoft 365 cloud, which allows you to place your application in Azure with a single command. TeamsFx integrates with Azure Resource Manager that enables you to provision Azure resources, which your application needs for code approach.

## Prerequisites

* Account prerequisites
  To provision cloud resources, you must have the following accounts:

  * Microsoft 365 account with valid subscription.
  * Azure with valid subscription.
  For more information, see [how to prepare accounts for building Teams app](accounts.md).

* [Install Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) version v3.0.0+.

> [!TIP]
> Ensure you have Teams app project opened in VS code.

## Provision using Teams Toolkit

Provision is performed with single command in Teams Toolkit for Visual Studio Code or TeamsFx CLI as follows:

[Provision Azure-based app](/microsoftteams/platform/sbs-gs-javascript?tabs=vscode%2Cvsc%2Cviscode%2Cvcode&tutorial-step=8)

## Resource creation

When you trigger provision command in Teams Toolkit or TeamsFx CLI, you can get the following resources:

* Microsoft Azure Active Directory (Azure AD) application under your Microsoft 365 tenant.
* Teams app registration under your Microsoft 365 tenant's Teams platform.
* Azure resources under your selected Azure subscription.

When you create a new project, you can use all the Azure resources. The ARM template defines all the Azure resources and helps to create required Azure resources during provision. When you [add new capability resource](./add-resource.md) to an existing project, the updated ARM template reflects the latest change.

> [!NOTE]
> Azure services incur costs in your subscription, for more information on cost estimation, see [the pricing calculator](https://azure.microsoft.com/pricing/calculator/).

<details>
<summary><b>Resource creation for Teams Tab application</b></summary>

|Resource|Purpose|Description |
|----------|--------------------------------|-----|
| Azure storage | Host your tab app | Enables static web app feature to host your tab app |
| App service plan for simple auth | Host the web app of Simple Auth |Not applicable |
| Web app for simple auth | Host simple auth server to gain access to other services in your single page application | Adds user assigned identity to access other Azure resources |
| User assigned identity | Authenticate Azure service-to-service requests | Shared across different capabilities and resources |

</details>

<details>
<summary><b>Resource creation for Teams bot or message extension application</b></summary>

|Resource|Purpose| Description |
|----------|--------------------------------|-----|
| Azure bot service | Registers your app as a bot with the bot framework | Connects bot to Teams |
| App service plan for bot | Host the web app of bot |Not applicable |
| Web app for bot | Host your bot app | Adds user assigned identity to access other Azure resources. <br /> Adds app settings required by [TeamsFx SDK](https://www.npmjs.com/package/@microsoft/teamsfx) |
| User assigned identity | Authenticate Azure service-to-service requests | Shared across different capabilities and resources |

</details>

<details>
<summary><b>Resource creation for Azure Functions in the project</b></summary>

|Resource|Purpose| Description|
|----------|--------------------------------|-----|
| App service plan for function app | Host the function app |Not applicable |
| Function app | Host your Azure functions APIs | Adds user assigned identity to access other Azure resources. <br /> Adds Cross-origin resource sharing (CORS) rule to allow requests from your tab app <br /> Adds authentication setting that only allows requests from your Teams app. <br /> Adds app settings required by [TeamsFx SDK](https://www.npmjs.com/package/@microsoft/teamsfx) |
| Azure storage for function app | Required to create function app |Not applicable|
| User assigned identity | Authenticate Azure service-to-service requests | Shared across different capabilities and resources |

</details>

<details>
<summary><b>Resource creation for Azure SQL in the project</b></summary>

|Resource|Purpose | Description |
|----------|--------------------------------|-----|
| Azure SQL server | Host the Azure SQL database instance | Allows all Azure services to access the server |
| Azure SQL database | Store data for your app | Grants user assigned identity, read or write permission to the database |
| User assigned identity | Authenticate Azure service-to-service requests | Shared across different capabilities and resources |

</details>

<details>
<summary><b>Resource creation for Azure API Management in the project</b></summary>

|Resource|Purpose|
|----------|--------------------------------|
| Azure AD application for API management service | Allows Microsoft Power Platform access APIs managed by API management service |
| API management service | Manage your APIs hosted in function app |
| API management product | Group your APIs, define terms of use and runtime policies |
| API management OAuth server | Enables Microsoft Power Platform to access your APIs hosted in function app |
| User assigned identity | Authenticate Azure service-to-service requests |

</details>

<details>
<summary><b>Resources created when including Azure Key Vault in the project</b></summary>

|Resources|Purpose of this resource|
|----------|--------------------------------|
| Azure Key Vault Service | Manage secrets (e.g. Azure AD app client secret) used by other Azure Services |
| User Assigned Identity | Authenticate Azure service-to-service requests |

</details>

## Customize resource provision

Teams Toolkit enables you to use an infrastructure as code approach to define what Azure resources you want to provision, and how you want to configure. The tool uses ARM template to define Azure resources. The ARM template is a set of bicep files that defines the infrastructure and configuration for your project. You can customize Azure resources by modifying the ARM template. For more information, see [bicep document](/azure/azure-resource-manager/bicep).

Provision with ARM involves changing the following sets of files, parameters and templates:

* ARM parameter files (`azure.parameters.{your_env_name}.json`) located at `.fx/configs` folder, for passing parameters to templates.
* ARM template files located at `templates/azure`, this folder contains following files:

| File | Function | Allow customization |
| --- | --- | --- |
| main.bicep | Provide entry point for Azure resource provision | Yes |
| provision.bicep | Create and configure Azure resources | Yes |
| config.bicep | Add TeamsFx required configurations to Azure resources | Yes |
| provision/xxx.bicep | Create and configure each Azure resource consumed by `provision.bicep` | Yes |
| teamsfx/xxx.bicep | Add TeamsFx required configurations to each Azure resource consumed by `config.bicep`| No |

> [!NOTE]
> When you add resources or capabilities to your project, `teamsfx/xxx.bicep` will be regenerated, you can't customize the same. To modify the bicep files, you can use Git to track your changes to `teamsfx/xxx.bicep` files, which helps you to not lose changes while adding resources or capabilities.

The ARM template files use placeholders for parameters. The purpose of these placeholders is to ensure creation of new resources for you in new environment. The actual values are resolved from `.fx/states/state.{env}.json`.

##### Azure AD application-related parameters

| Parameter name | Default value place holder | Meaning of the place holder | How to customize |
| --- | --- | --- | --- |
| Microsoft 365 ClientId | {{state.fx-resource-aad-app-for-teams.clientId}} | Your app's Azure AD app client id created during provision | [Customize the value](#use-an-existing-azure-ad-app-for-your-teams-app) |
| Microsoft 365 ClientSecret | {{state.fx-resource-aad-app-for-teams.clientSecret}} | Your app's Azure AD app client secret created during provision | [Customize the value](#use-an-existing-azure-ad-app-for-your-teams-app)  |
| Microsoft 365 TenantId | {{state.fx-resource-aad-app-for-teams.tenantId}} | Tenant Id of your app's Azure AD app | [Customize the value](#use-an-existing-azure-ad-app-for-your-teams-app)  |
| Microsoft 365 OAuthAuthorityHost | {{state.fx-resource-aad-app-for-teams.oauthHost}} | OAuth authority host of your app's Azure AD app | [Customize the value](#use-an-existing-azure-ad-app-for-your-teams-app) |
| botAadAppClientId | {{state.fx-resource-bot.botId}} | Bot's Azure AD app client Id created during provision | [Customize the value](#use-an-existing-azure-ad-app-for-your-bot) |
| botAadAppClientSecret | {{state.fx-resource-bot.botPassword}} | Bot's Azure AD app client secret created during provision | [Customize the value](#use-an-existing-azure-ad-app-for-your-bot) |

##### Azure resource-related parameters

| Parameter name | Default value place holder | Meaning of the place holder | How to customize |
| --- | --- | --- | --- |
| azureSqlAdmin | {{state.fx-resource-azure-sql.admin}} | Azure SQL Server admin account you provided during provision | Delete the placeholder and fill the actual value |
| azureSqlAdminPassword | {{state.fx-resource-azure-sql.adminPassword}} | Azure SQL Server admin password you provided during provision | Delete the placeholder and fill the actual value |

#### Referencing environment variables in parameter files

If you don't want to hardcode the values in parameter files, for example, when the value is a secret. The parameter files support referencing the values from environment variables. You can use syntax `{{$env.YOUR_ENV_VARIABLE_NAME}}` in parameter values for the tool to resolve from current environment variable.

The following example reads the value of `mySelfHostedDbConnectionString` parameter from environment variable `DB_CONNECTION_STRING`:

```json
...
    "mySelfHostedDbConnectionString": "{{$env.DB_CONNECTION_STRING}}"
...
```

#### Customize ARM template files

If the predefined templates doesn't meet your application requirement, you can customize the ARM templates under `templates/azure` folder. For example, you can customize the ARM template to create some additional Azure resources for your app. You need to have basic knowledge of bicep language, which is used to author ARM template. You can get started with bicep at [bicep documentation](/azure/azure-resource-manager/bicep/).

> [!NOTE]
> The ARM template is shared by all environments. You can use [conditional deployment](/azure/azure-resource-manager/bicep/conditional-resource-deployment) if the provision behavior varies between environments.

To ensure the TeamsFx tool functions properly, ensure you customize ARM template, which satisfies the following requirement. If you use other tool for further development, you can ignore these requirements.

* Keep the folder structure and file name unchanged. The tool may append new content to existing files when you add more resources or capabilities to your project.
* Keep the name of auto-generated parameters as well as its property names unchanged. The auto-generated parameters may be used when you add more resources or capabilities to your project.
* Keep the output of auto-generated ARM template unchanged. You can add additional outputs to ARM template. The output is `.fx/states/state.{env}.json` and can be used in other features such as deploy, validate manifest file.

### Customization scenarios

You can customize the following scenarios:

<details>
<summary><b>Use an existing Azure AD app for your bot</b></summary>

You can add following configuration snippet to `.fx/configs/config.{env}.json` file to use an Azure AD app created by yourself for your Teams app. To create an Azure AD app, see <https://aka.ms/teamsfx-existing-aad-doc>.

```json
"auth": {
    "clientId": "<your Azure AD app client id>",
    "clientSecret": "{{$env.ENV_NAME_THAT_STORES_YOUR_SECRET}}",
    "objectId": "<your Azure AD app object id>",
    "accessAsUserScopeId": "<id of the access_as_user scope>"
}
```

After adding the snippet, add your secret to related environment variable so the tool can resolve the actual secret during provision.

> [!NOTE]
> Ensure not to share the same Azure AD app in multiple environments. If you don't have permission to update the Azure AD app, you can get a warning with instructions about how to manually update the Azure AD app. Follow the instructions to update your Azure AD app after provision.

</details>

<details>
<summary><b>Use an existing Azure AD app for your Teams app</b></summary>

You can add following configuration snippet to `.fx/configs/config.{env}.json` file to use an Azure AD app created by yourself for your bot:

```json
"bot": {
    "appId": "<your Azure AD app client id>",
    "appPassword": "{{$env.ENV_NAME_THAT_STORES_YOUR_SECRET}}"
}
```

After adding the preceding snippet, add your secret to related environment variable for the tool to resolve the actual secret during provision.

</details>

<details>
<summary><b>Skip adding user for SQL database</b></summary>

If you have insufficient permission error when the tool tries to add user to SQL database, you can add the following configuration snippet to `.fx/configs/config.{env}.json` file to skip adding SQL database user:

```json
"skipAddingSqlUser": true
```

</details>

### Specifying the name of Function App instance

You can use `contosoteamsappapi` for function app instance instead of using the default name.

> [!NOTE]
> If you have already provisioned the environment, specifying the name can create a new function app instance for you, instead of renaming the instance created previously.

The following steps are:

1. Open `.fx/configs/azure.parameters.{env}.json` for your current environment.
2. Add a new property, for example, `functionAppName` under the `provisionParameters` section.
3. Enter a value of `functionAppName`, for example `contosoteamsappapi`.
4. Final parameter file is shown in the following snippet:

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

### Scenerio

To add other Azure resource or storage to the application:

Consider the scenario, you want to add Azure storage to your Azure function backend to store blob data. There is no auto flow to update the bicep template with Azure storage support. However, you can edit the bicep file and add the resource. The steps are as follows:

1. Create a tab project.
2. Add function to the project. For more information, see [add resources](./add-resource.md).
3. Declare the new storage account in ARM template. You can declare the resource at `templates/azure/provision/function.bicep` directly. You're free to declare the resources in other places.

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

4. Update the Azure function app settings with Azure storage connection string in `templates/azure/provision/function.bicep`. Add the following snippet to `functionApp` resource's `appSettings` array:

    ``````````````````bicep
    {
        name: 'MyAppStorageAccountConnectionString'
        value: 'DefaultEndpointsProtocol=https;AccountName=${applicationStorageAccount.name};AccountKey=${listKeys(applicationStorageAccount.id, '2021-06-01').keys[0].value}'
    }
    ```````````````````

5. You can update your function with Azure storage output bindings.

## FAQ

<br>

<details>

<summary><b>How to troubleshoot?</b></summary>

If you get errors with Teams Toolkit in Visual Studio Code, you can select **Get Help** on the error notification to navigate to the related document. If you're using TeamsFx CLI, there will be a hyperlink at the end of error message that points to the help doc. You can also view [provision help doc](https://aka.ms/teamsfx-arm-help) directly.

<br>

</details>

<details>

<summary><b>How can I switch to another Azure subscription while provisioning?</b></summary>

1. Switch subscription in current account or log out and select a new subscription.
2. If you have already provisioned current environment, you need to create a new environment and perform provision because ARM doesn't support moving resources.
3. If you didn't provision current environment, you can trigger provision directly.

<br>

</details>

<details>

<summary><b>How can I change resource group while provisioning?</b></summary>

Before provision, the tool asks you if you want to create a new resource group or use an existing one. You can provide a new resource group name or choose an existing one in this step.

<br>

</details>

<details>

<summary><b>How can I provision sharepoint-based app?</b></summary>

You can follow [provision SharePoint-based app](/microsoftteams/platform/sbs-gs-spfx?tabs=vscode%2Cviscode&tutorial-step=4).

> [!NOTE]
> Currently, the building Teams app with sharepoint framework with Teams Toolkit doesn't have direct integration with Azure, the contents in the doc doesn't apply to SPFx based apps.

<br>

</details>

## See also

* [Deploy Teams app to the cloud](deploy.md)
* [Manage multiple environments](TeamsFx-multi-env.md)
* [Collaborate with other developers on Teams project](TeamsFx-collaboration.md)
