---
title: Use Teams Toolkit to provision cloud resources v4
author: MuyangAmigo
description: Learn how to do provision cloud resources using Teams Toolkit v4 in Visual Studio Code and Visual Studio, resource creation and customize resource provision.
ms.author: shenwe
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
zone_pivot_groups: teams-app-platform
---

# Provision cloud resources v4

> [!IMPORTANT]
>
> We've introduced the Teams Toolkit v5 extension within Visual Studio Code. This version comes to you with many new app development features. We recommend that you use Teams Toolkit v5 for building your Teams app.
>
> [Teams Toolkit v4](toolkit-v4/teams-toolkit-fundamentals-v4.md) extension will soon be deprecated.

TeamsFx integrates with Azure and the Microsoft 365 cloud, which allows to place your app in Azure with a single command. TeamsFx integrates with Azure Resource Manager (ARM), which enables to provision Azure resources that your application needs for code approach.

> [!NOTE]
> Teams toolkit doesn't provide support to deploy resources to other cloud platforms except Azure, however, the user can deploy manually.

::: zone pivot="visual-studio-code"

## Provision using Teams Toolkit in Microsoft Visual Studio Code

Provision Azure resources with a single command in Teams Toolkit for Visual Studio Code or TeamsFx CLI. For more information, see [how to provision Azure-based app](/microsoftteams/platform/sbs-gs-javascript?tabs=vscode%2Cvsc%2Cviscode%2Cvcode&tutorial-step=8).

## Create Resources

When you trigger the provision command in Teams Toolkit or TeamsFx CLI, you can get the following resources:

* Microsoft Azure Active Directory (Azure AD) app under your Microsoft 365 tenant.
* Teams app registration under your Microsoft 365 tenant's Teams platform.
* Azure resources under your selected Azure subscription.

When you create a new project, you also need to create Azure resources. The ARM template defines all the Azure resources and helps to create required Azure resources during provision. When you [add a new capability resource](./add-resource-v4.md) to an existing project, the updated ARM template reflects the latest change.

> [!NOTE]
> Azure services incur costs in your subscription. For more information on cost estimation, see [pricing calculator](https://azure.microsoft.com/pricing/calculator/).

The following list shows the resource creation for different types of app and Azure resources:
<br>

<details>
<summary><b>Resource creation for Teams Tab app</b></summary>

|Resource|Purpose|Description |
|----------|--------------------------------|-----|
| Azure storage | Hosts your tab app. | Enables static web app feature to host your tab app. |
| User assigned identity | Authenticates Azure service-to-service requests. | Shares across different capabilities and resources. |

</details>
<br>

<details>
<summary><b>Resource creation for Teams bot or message extension app</b></summary>

|Resource|Purpose| Description |
|----------|--------------------------------|-----|
| Azure bot service | Registers your app as a bot with the bot framework. | Connects bot to Teams. |
| App service plan for bot | Hosts the web app of bot. |Not applicable |
| Web app for bot | Hosts your bot app. | - Adds user assigned identity to access other Azure resources. <br />- Adds app settings required by [TeamsFx SDK](https://www.npmjs.com/package/@microsoft/teamsfx). |
| User assigned identity | Authenticates Azure service-to-service requests. | Shares across different capabilities and resources. |

</details>
<br>

<details>
<summary><b>Resource creation for Azure Functions in the project</b></summary>

|Resource|Purpose| Description|
|----------|--------------------------------|-----|
| App service plan for function app | Hosts the function app. |Not applicable |
| Function app | Hosts your Azure Functions APIs. | - Adds user assigned identity to access other Azure resources. <br />- Adds cross-origin resource sharing (CORS) rule to allow requests from your tab app. <br />- Adds an authentication setting that allows requests from your Teams app. <br />- Adds app settings required by [TeamsFx SDK](https://www.npmjs.com/package/@microsoft/teamsfx). |
| Azure storage for function app | Requires to create function app. |Not applicable|
| User assigned identity | Authenticates Azure service-to-service requests. | Shares across different capabilities and resources. |

</details>
<br>

<details>
<summary><b>Resource creation for Azure SQL in the project</b></summary>

|Resource|Purpose | Description |
|----------|--------------------------------|-----|
| Azure SQL server | Hosts the Azure SQL database instance. | Allows all Azure services to access the server. |
| Azure SQL database | Stores data for your app. | Grants user assigned identity, read or write permission to the database. |
| User assigned identity | Authenticates Azure service-to-service requests. | Shares across different capabilities and resources. |

</details>
<br>

<details>
<summary><b>Resource creation for Azure API Management in the project</b></summary>

|Resource|Purpose|
|----------|--------------------------------|
| Azure AD app for API management service | Allows Microsoft Power Platform access APIs managed by API management service. |
| API management service | Manages your APIs hosted in function app. |
| API management product | Group your APIs, define terms of use, and runtime policies. |
| API management OAuth server | Enables Microsoft Power Platform to access your APIs hosted in function app. |
| User assigned identity | Authenticates Azure service-to-service requests. |

</details>
<br>

<details>
<summary><b>Resource created when including Azure Key Vault in the project</b></summary>

|Resource|Purpose of this resource|
|----------|--------------------------------|
| Azure Key Vault Service | Manage secrets (for example, Azure AD app client secret) used by other Azure services. |
| User Assigned Identity | Authenticates Azure service-to-service requests. |

</details>
<br>

## Customize resource provision

Teams Toolkit enables you to use an infrastructure-as-code approach to define the Azure resources that you want to provision and how you want to configure. Teams toolkit uses the ARM template to define Azure resources. The ARM template is a set of `bicep` files that defines the infrastructure and configuration for your project. You can customize Azure resources by modifying the ARM template. For more information, see [bicep document](/azure/azure-resource-manager/bicep).

Provision with ARM involves changing the following sets of files, parameters, and templates:

* ARM parameter files (`azure.parameters.{your_env_name}.json`) located at `.fx\configs` folder, for passing parameters to templates.
* ARM template files located at `templates\azure`, this folder contains following files:

   | File | Function | Allow customization |
   | --- | --- | --- |
   | main.bicep | Provides an entry point for Azure resource provision. | Yes |
   | provision.bicep | Creates and configures Azure resources. | Yes |
   | config.bicep | Adds TeamsFx required configurations to Azure resources. | Yes |
   | provision\xxx.bicep | Creates and configures each Azure resource consumed by `provision.bicep`. | Yes |
   | teamsfx\xxx.bicep | Adds TeamsFx required configurations to each Azure resource consumed by `config.bicep`.| No |

> [!NOTE]
> When you add resources or capabilities to your project, `teamsfx\xxx.bicep` is regenerated, you can't customize the same. To modify the `bicep` files, you can use Git to track your changes to `teamsfx\xxx.bicep` files, which helps you not lose changes while adding resources or capabilities.

### Azure AD parameters

The ARM template files use placeholders for parameters. The purpose of the placeholders is to ensure that the creation of new resources for you in a new environment. The actual values are resolved from `.fx\states\state.{env}.json` file.

There are two types of parameters:

* [Azure AD application-related parameters](#azure-ad-application-related-parameters)
* [Azure resource-related parameters](#azure-resource-related-parameters)

##### Azure AD application-related parameters

| Parameter name | Default value placeholder | Meaning of the placeholder | How to customize |
| --- | --- | --- | --- |
| Microsoft 365 ClientId | `{{state.fx-resource-aad-app-for-teams.clientId}}` | Your app's Azure AD app client Id is created during provision. | [Use an existing Azure AD app for your bot](#use-an-existing-azure-ad-app-for-your-bot). |
| Microsoft 365 ClientSecret | `{{state.fx-resource-aad-app-for-teams.clientSecret}}` | Your app's Azure AD app client secret is created during provision. | [Use an existing Azure AD app for your Teams app](#use-an-existing-azure-ad-app-for-your-teams-app). |
| Microsoft 365 TenantId | `{{state.fx-resource-aad-app-for-teams.tenantId}}` | Tenant Id of your app's Azure AD app. | [Use an existing Azure AD app for your Teams app](#use-an-existing-azure-ad-app-for-your-teams-app).  |
| Microsoft 365 OAuthAuthorityHost | `{{state.fx-resource-aad-app-for-teams.oauthHost}}` | OAuth authority host of your app's Azure AD app. | [Use an existing Azure AD app for your Teams app](#use-an-existing-azure-ad-app-for-your-teams-app). |
| botAadAppClientId | `{{state.fx-resource-bot.botId}}` | Bot's Azure AD app client Id created during provision. | [Use an existing Azure AD app for your bot](#use-an-existing-azure-ad-app-for-your-bot). |
| botAadAppClientSecret | `{{state.fx-resource-bot.botPassword}}` | Bot's Azure AD app client secret is created during provision. | [Use an existing Azure AD app for your bot](#use-an-existing-azure-ad-app-for-your-bot). |

##### Azure resource-related parameters

| Parameter name | Default value placeholder | Meaning of the placeholder | How to customize |
| --- | --- | --- | --- |
| azureSqlAdmin | `{{state.fx-resource-azure-sql.admin}}` | Azure SQL Server admin account you provided during provision. | Delete the placeholder and fill the actual value. |
| azureSqlAdminPassword | `{{state.fx-resource-azure-sql.adminPassword}}` | Azure SQL Server admin password you provided during provision. | Delete the placeholder and fill the actual value. |

#### Reference environment variables in parameter files

When the value is secret, then you don't need to hardcode them in parameter file. The parameter files support referencing the values from environment variables. You can use the syntax `{{$env.YOUR_ENV_VARIABLE_NAME}}` in parameter values for the tool to resolve the current environment variable.

The following example reads the value of the `mySelfHostedDbConnectionString` parameter from the environment variable `DB_CONNECTION_STRING`:

```json
...
    "mySelfHostedDbConnectionString": "{{$env.DB_CONNECTION_STRING}}"
...
```

#### Customize ARM template files

If the predefined templates don't meet your app requirements, you can customize the ARM templates under `templates\azure` folder. For example, you can customize the ARM template to create some extra Azure resources for your app. You need to have basic knowledge of the bicep language, which is used to author an ARM template. You can get started with bicep at [bicep documentation](/azure/azure-resource-manager/bicep/).

> [!NOTE]
> The ARM template is shared by all environments. You can use [conditional deployment](/azure/azure-resource-manager/bicep/conditional-resource-deployment) if the provision behavior varies between the environments.

To ensure the TeamsFx tool functions properly, customize ARM template that satisfies the following requirements:

> [!NOTE]
> If you use other tool for further development, you can ignore these requirements.

* Ensure that the folder structure and file name remain unchanged. The tool may append new content to the existing files when you add more resources or capabilities to your project.
* Ensure that the names of the auto-generated parameters and its property names remain unchanged. The auto-generated parameters may be used when you add more resources or capabilities to your project.
* Ensure that the output of the auto-generated ARM template remains unchanged. You can add more outputs to the ARM template. The output is `.fx\states\state.{env}.json` and can be used in other features, such as deploy and validate manifest file.

### Customize Teams apps

You can customize your bot or the Teams app by adding configuration snippets to use an Azure AD app created by you. Perform the following ways to customize the Teams app:

* [Use an existing Azure AD app for your Teams app](#use-an-existing-azure-ad-app-for-your-teams-app)
* [Use an existing Azure AD app for your bot](#use-an-existing-azure-ad-app-for-your-bot-1)

#### Use an existing Azure AD app for your Teams app

You can add the following configuration snippet to `.fx\configs\config.{env}.json` file to use an Azure AD app created for your Teams app. If you don't have an Azure AD app yet or you already have one but don't know where to find the correct value, see [how to use existing Azure AD app in TeamsFx project](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/fx-core/using-existing-aad.md):

```json
"$schema": "https://aka.ms/teamsfx-env-config-schema",
"description": "...",
"manifest": {
  ...
},
// Add code below. Note you need to replace the placeholders with real values.
"auth": {
    "clientId": "<your Azure AD app client id>",
    "clientSecret": "{{$env.ENV_NAME_THAT_STORES_YOUR_SECRET}}",
    "objectId": "<your Azure AD app object id>",
    "accessAsUserScopeId": "<id of the access_as_user scope>"
}
```

After adding the snippet, add your client secret to the related environment variable for Teams Toolkit to resolve the actual client secret during provision.

> [!NOTE]
> Ensure not to share the same Azure AD app in multiple environments. If you don't have permission to update the Azure AD app, you get a warning with instructions about how to manually update the Azure AD app. Follow the instructions to update your Azure AD app after provision.

#### Use an existing Azure AD app for your bot

You can add following configuration snippet to `.fx\configs\config.{env}.json` file to use an Azure AD app created for your bot:

```json
"$schema": "https://aka.ms/teamsfx-env-config-schema",
"description": "...",
"manifest": {
  ...
},
// Add code below. Note you need to replace the placeholders with real values.
"bot": {
    "appId": "<your Azure AD app client id>",
    "appPassword": "{{$env.ENV_NAME_THAT_STORES_YOUR_SECRET}}"
}
```

After adding the snippet, add your client secret to related environment variable for Teams Toolkit to resolve the actual client secret during provision.

> [!NOTE]
>
> * Add the configuration snippet in the `.vscode/tasks.json` file. A Teams Toolkit generated project has a pre-defined set of Visual Studio Code debugging tasks in the `.vscode/tasks.json` file. These pre-defined tasks are generated by Teams Toolkit version 4.1.0 or later. You can use the `.vscode/tasks.json` file for customizing debugging tasks and the `.fx\configs\config.{env}.json` file for cloud environments.
>
> * To find the correct values for `appId` and `appPassword`, see [how to use existing Azure AD app in TeamsFx project](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/fx-core/using-existing-aad.md).

#### Skip adding user for SQL database

If you have an insufficient permission error when Teams Toolkit tries to add a user to the SQL database, you can add the following configuration snippet to `.fx\configs\config.{env}.json` file to skip adding the SQL database user:

```json
"skipAddingSqlUser": true
```

### Specify the name of function app instance

You can use `contosoteamsappapi` for function app instance instead of using the default name.

> [!NOTE]
> If you have already provisioned the environment, specifying the name can create a new function app instance for you, instead of renaming the instance created previously.

Follow the steps to specify the name of the function app instance:

1. Open `.fx\configs\azure.parameters.{env}.json` for your current environment.
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

To add other Azure resource or storage to the app, consider the following scenario:

Add Azure storage to your Azure function back-end to store blob data. There's no auto flow to update the `bicep` template with the Azure storage support. However, you can edit the `bicep` file and add the resource. Follow these steps:

1. Create a tab project.
2. Add function to the project. For more information, see [how to add resources](./add-resource-v4.md).
3. Declare the new storage account in ARM template. You can declare the resource at `templates\azure\provision\function.bicep` directly. You can declare the resources in other places.

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

4. Update the Azure Functions app settings with Azure storage connection string in `templates\azure\provision\function.bicep`. Add the following snippet to `functionApp` resource's `appSettings` array:

    ``````````````````bicep
    {
        name: 'MyAppStorageAccountConnectionString'
        value: 'DefaultEndpointsProtocol=https;AccountName=${applicationStorageAccount.name};AccountKey=${listKeys(applicationStorageAccount.id, '2021-06-01').keys[0].value}'
    }
    ```````````````````

5. You can update your function with Azure storage output bindings.

::: zone-end

::: zone pivot="visual-studio"

## Provision using Teams Toolkit in Visual Studio

The following steps help you to provision cloud resources using Visual Studio:

### Sign in to your Microsoft 365 account

1. Open **Visual Studio**.
1. Open the Microsoft Teams app project.
1. Select **Project** > **Teams Toolkit** > **Prepare Teams App Dependencies**.

   :::image type="content" source="images/teams-toolkit-vs-prepare-app-dependencies1_1-v4.png" alt-text="Prepare teams app dependencies":::

1. Select **Sign in...** to sign in to Microsoft 365 account.

   :::image type="content" source="images/teams-toolkit-vs-prepare1_1-v4.png" alt-text="Sign in to Microsoft 365":::

    > [!NOTE]
    > If you are already singed in, your username displays, or you have an option to **Add an account**.

1. Your default web browser opens to let you [sign in](https://developer.microsoft.com/en-us/microsoft-365/dev-program) to the account.

1. Select **Continue** after you've signed in to your account.

    :::image type="content" source="images/teams-toolkit-vs-signin-M365_1-v4.png" alt-text="Confirm by selecting continue":::

### Sign in to your Azure account

1. Open **Visual Studio**.
1. Open the Teams App project.
1. Select **Project** > **Teams Toolkit** > **Provision in the cloud**.

   :::image type="content" source="images/teams-toolkit-vs-provision-in-cloud2-v4.png" alt-text="Sign in to Azure account":::

1. Select **Sign in...** to sign in to your Azure account.

   :::image type="content" source="images/teams-toolkit-vs-provision-start_1-v4.png" alt-text="Sign in to your Azure account":::

   > [!NOTE]
   > If you're already signed in, your username is displayed, or you have an option to **Add an account**.

   After sign in to your Azure account using your credentials, the browser closes automatically.

### To provision cloud resources

After you open your project in Visual Studio:

1. Select **Project** > **Teams Toolkit** > **Provision in the cloud**.

   :::image type="content" source="images/teams-toolkit-vs-provision-in-cloud2-v4.png" alt-text="Provision in cloud":::

   **Provision** window appears.

1. Enter the following details to provision your resources:

   1. Select your **Subscription name** from the dropdown menu.
   1. Select your **Resource group** from the dropdown menu or you can create new **Resource group** by selecting **New...**.
   1. Select your **Region** from the dropdown menu.

   1. Select **Provision**.

   :::image type="content" source="images/teams-toolkit-vs-provision-select-subscription1_1-v4.png" alt-text="Select resource group":::

1. In the pop-up window that appears, Select **Provision**.

   :::image type="content" source="images/teams-toolkit-vs-provision-warning_1-v4.png" alt-text="Provision warning":::

   The provisioning process creates resources in the Azure cloud. You can monitor the progress by observing the Teams Toolkit output window.

1. In the pop-up window that appears, Select **View Provisioned Resources** to view all the resources that were provisioned.

   :::image type="content" source="images/teams-toolkit-vs-provision-provision-success_1-v4.png" alt-text="View provisioned resources":::

## Create resources

When you trigger provision command in Teams Toolkit or TeamsFx CLI, you can create the following resources:

* Microsoft Azure Active Directory (Azure AD) app under your Microsoft 365 tenant.
* Teams app registration under your Microsoft 365 tenant's Teams platform.
* Azure resources under your selected Azure subscription.

When you create a new project, you also need to create Azure resources. The ARM templates define all the Azure resources and help you to create the required Azure resources during provision.

The following list shows the resource creation for different types of app and Azure resources:
<br>

<details>
<summary><b>Resource creation for Teams Tab app</b></summary>

| Resource | Purpose | Description |
| --- | --- | --- |
| App service plan | Hosts your web app of tab. | Not applicable |
| App service | Hosts your Blazor tab app. | Not applicable |
| Manage identity | Authenticates Azure service-to-service requests. | Shares across different capabilities and resources. |

</details>
<br>

<details>
<summary><b>Resource creation for Teams message extension app</b></summary>

| Resource | Purpose | Description |
| --- | --- | --- |
| Azure bot | Registers your app as a bot with the bot framework. | Connects bot to Teams. |
| App Service plan | Hosts your web bot app. | Not applicable |
| App Service | Hosts your bot app. | Adds user assigned identity to access other Azure resources. |
| Manage identity | Authenticates Azure service-to-service requests. | Shares across different capabilities and resources. |

</details>
<br>

<details>
<summary><b>Resource creation for Teams command bot app</b></summary>

| Resource | Purpose | Description |
| --- | --- | --- |
| Azure bot | Registers your app as a bot with the bot framework. | Connects bot to Teams. |
| App service plan | Hosts your web bot app. | Not applicable |
| App service | Hosts your bot app. | Adds user assigned identity to access other Azure resources. |
| Manage identity | Authenticates Azure service-to-service requests. | Shares across different capabilities and resources. |

</details>
<br>

<details>
<summary><b>Resource creation for Teams notification bot with HTTP trigger (Web API server) app</b></summary>

| Resource | Purpose | Description |
| --- | --- | --- |
| Azure bot | Registers your app as a bot with the bot framework. | Connects bot to Teams. |
| App service plan | Hosts your web bot app. | Not applicable |
| App service | Hosts your bot app. | Adds user assigned identity to access other Azure resources. |
| Managed Identity | Authenticates Azure service-to-service requests. | Shares across different capabilities and resources. |

</details>
<br>

<details>
<summary><b>Resource creation for Teams notification bot with HTTP trigger (Azure Functions) app</b></summary>

| Resource | Purpose | Description |
| --- | --- | --- |
| Azure bot | Registers your app as a bot with the bot framework. | Connects bot to Teams |
| Manage identity | Authenticates Azure service-to-service requests. | Shares across different capabilities and resources. |
| Storage account | Helps to create function app. | Not applicable |
| App service plan | Hosts the function bot App. | Not applicable |
| Function app | Hosts your bot app. | - Adds user assigned identity to access other Azure resources.<br>- Adds Cross-origin resource sharing (CORS) rule to allow requests from your tab app.<br>- Adds an authentication setting that only allows requests from your Teams app.<br>- Adds app settings required by TeamsFx SDK. |

</details>
<br>

<details>
<summary><b>Resource creation for Teams notification bot with timer trigger (Azure Functions) app</b></summary>

| Resource | Purpose | Description |
| --- | --- | --- |
| Azure bot | Registers your app as a bot with the bot framework. | Connects bot to Teams. |
| Manage identity | Authenticates Azure service-to-service requests. | Shares across different capabilities and resources. |
| Storage account | Helps to create function app. | Not applicable |
| App service plan | Hosts the function bot app. | Not applicable |
| Function app | Hosts your bot app. | - Adds user assigned identity to access other Azure resources.<br>-Adds Cross-origin resource sharing (CORS) rule to allow requests from your tab app.<br>- Adds an authentication setting that only allows requests from your Teams app.<br>- Adds app settings required by TeamsFx SDK. |

</details>
<br>

<details>
<summary><b>Resource creation for Teams notification bot with HTTP trigger + timer trigger (Azure Functions) app</b></summary>

| Resource | Purpose | Description |
| --- | --- | --- |
| Azure bot | Registers your app as a bot with the bot framework. | Connects bot to Teams. |
| Manage identity | Authenticate Azure service-to-service requests. | Shares across different capabilities and resources. |
| Storage account | Helps to create function app. | Not applicable |
| App service plan | Hosts the function bot app. | Not applicable |
| Function App | Hosts your bot app. | -Adds user assigned identity to access other Azure resources.<br>-Adds Cross-origin resource sharing (CORS) rule to allow requests from your tab app.<br>-Adds an authentication setting that only allows requests from your Teams app.<br>-Adds app settings required by TeamsFx SDK. |

</details>
<br>

### Manage your resources

You can sign in to [Azure portal](https://portal.azure.com/) and manage all resources created by Teams Toolkit.

* You can select a resource group from the existing list or the new resource group that you've created.
* You can see the details of the resource group you've selected in the overview section of the table of contents.

## Customize resource provision

Teams Toolkit enables you to use an infrastructure-as-code approach to define the Azure resources that you want to provision. You can change the configuration in Teams Toolkit as per your requirement.

Teams Toolkit uses ARM template to define Azure resources. The ARM template is a set of `bicep` files that defines the infrastructure and configuration for your project. You can customize Azure resources by modifying the ARM template. For more information, see [bicep document](/azure/azure-resource-manager/bicep).

Provision with ARM involves changing the following sets of files, parameters, and templates:

* ARM parameter files (`azure.parameters.{your_env_name}.json`) located in `.fx\configs` folder, for passing parameters to templates.
* ARM template files located in `templates\azure` folder contains following files:

  | File | Function | Allow customization |
  | --- | --- | --- |
  | main.bicep | Provides an entry point for Azure resource provision. | Yes |
  | provision.bicep | Creates and configures Azure resources. | Yes |
  | config.bicep | Adds TeamsFx required configurations to Azure resources. | Yes |
  | provision\xxx.bicep | Creates and configures each Azure resource consumed by `provision.bicep`. | Yes |
  | teamsfx\xxx.bicep | Adds TeamsFx required configurations to each Azure resource consumed by `config.bicep`.| No |

> [!NOTE]
> When you add resources or capabilities to your project, `teamsfx\xxx.bicep` is regenerated, you can't customize the same. To modify the bicep files, you can use Git to track your changes to `teamsfx\xxx.bicep` files. This doesn't make you lose any changes while adding resources or capabilities to your project.

The ARM template files use placeholders for parameters. The purpose of the placeholders is to ensure that new resources can be created in a new environment. The actual values are resolved from `.fx\states\state.{env}.json` file.

### Azure AD app related parameters

| Parameter name | Default value placeholder | Meaning of the placeholder | How to customize |
| --- | --- | --- | --- |
| Microsoft 365 ClientId | {{state.fx-resource-aad-app-for-teams.clientId}} | Your app's Azure AD app client Id created during provision. | [Use an existing Azure AD app for your Teams app](#use-an-existing-azure-ad-app-for-your-teams-app). |
| Microsoft 365 ClientSecret | {{state.fx-resource-aad-app-for-teams.clientSecret}} | Your app's Azure AD app client secret is created during provision. | [Use an existing Azure AD app for your Teams app](#use-an-existing-azure-ad-app-for-your-teams-app).  |
| Microsoft 365 TenantId | {{state.fx-resource-aad-app-for-teams.tenantId}} | Tenant Id of your app's Azure AD app. | [Use an existing Azure AD app for your Teams app](#use-an-existing-azure-ad-app-for-your-teams-app).  |
| Microsoft 365 OAuthAuthorityHost | {{state.fx-resource-aad-app-for-teams.oauthHost}} | OAuth authority host of your app's Azure AD app. | [Use an existing Azure AD app for your Teams app](#use-an-existing-azure-ad-app-for-your-teams-app). |
| botAadAppClientId | {{state.fx-resource-bot.botId}} | Bot's Azure AD app client Id is created during provision. | [Use an existing Azure AD app for your bot](#use-an-existing-azure-ad-app-for-your-bot). |
| botAadAppClientSecret | {{state.fx-resource-bot.botPassword}} | Bot's Azure AD app client secret is created during provision. | [Use an existing Azure AD app for your bot](#use-an-existing-azure-ad-app-for-your-bot). |

### Reference environment variables in parameter files

When the value is secret, then you don't need to hardcode them in parameter file. The parameter files support referencing the values from the environment variables. You can use this syntax `{{$env.YOUR_ENV_VARIABLE_NAME}}` in the parameter values for Teams Toolkit to resolve from the current environment variable.

The following example reads the value of the `mySelfHostedDbConnectionString` parameter from the environment variable `DB_CONNECTION_STRING`:

```json
...
    "mySelfHostedDbConnectionString": "{{$env.DB_CONNECTION_STRING}}"
...
```

### Customize ARM template files

If the predefined templates don't meet your app requirements, you can customize the ARM templates under `templates\azure` folder. For example, you can customize the ARM template to create some extra Azure resources for your app. You need to have basic knowledge of bicep language, which is used to author ARM template.

To ensure the TeamsFx tool functions properly, customize ARM template that satisfies the following requirements:

* Ensure that the folder structure and file name remain unchanged. The tool may append new content to the existing files when you add more resources or capabilities to your project.
* Ensure that the name of auto-generated parameters and its property names remain unhanged. The auto-generated parameters may be used when you add more resources or capabilities to your project.
* Ensure that the output of auto-generated ARM template is unchanged. You can add more outputs to ARM template. The output is `.fx\states\state.{env}.json` and can be used in other features, such as deploy and validate manifest files.

### Customize Teams app

You can customize your bot or the Teams app by adding configuration snippets to use an Azure AD app created for your Teams app.
Perform in the following ways to customize the Teams app:

* [Use an existing Azure AD app for your Teams app](#use-an-existing-azure-ad-app-for-your-teams-app)
* [Use an existing Azure AD app for your bot](#use-an-existing-azure-ad-app-for-your-bot)

#### Use an existing Azure AD app for your Teams app

You can add the following configuration snippet to `.fx\configs\config.{env}.json` file to use an Azure AD app created for your Teams app. If you don't have an Azure AD app yet or you already have one but don't know where to find the correct value, see [how to use existing Azure AD app in TeamsFx project](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/fx-core/using-existing-aad.md):

```json
"$schema": "https://aka.ms/teamsfx-env-config-schema",
"description": "...",
"manifest": {
  ...
},
// Add code below. Note you need to replace the placeholders with real values.
"auth": {
    "clientId": "<your Azure AD app client id>",
    "clientSecret": "{{$env.ENV_NAME_THAT_STORES_YOUR_SECRET}}",
    "objectId": "<your Azure AD app object id>",
    "accessAsUserScopeId": "<id of the access_as_user scope>"
}
```

After adding the snippet, add your client secret to the related environment variable for Teams Toolkit to resolve the actual client secret during provision.

> [!NOTE]
> Ensure that not to share the same Azure AD app in multiple environments. If you don't have permission to update the Azure AD app, you get a warning with instructions to manually update the Azure AD app. Follow these instructions to update your Azure AD app after provision.

#### Use an existing Azure AD app for your bot

You can add the following configuration snippet to `.fx\configs\config.{env}.json` file to use the Azure AD app created for your bot:

```json
"bot": {
    "appId": "<your Azure AD app client id>",
    "appPassword": "{{$env.ENV_NAME_THAT_STORES_YOUR_SECRET}}"
}
```

After adding the snippet, add your client secret to the related environment variable for Teams Toolkit to resolve the actual client secret during provision.

#### Skip adding user for SQL database

If you get an insufficient permission error when Teams Toolkit tries to add user to SQL database, add the following configuration snippet to `.fx\configs\config.{env}.json` file to skip adding SQL database user:

```json
"skipAddingSqlUser": true
```

::: zone-end

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals-v4.md)
* [Deploy Teams app to the cloud](deploy-v4.md)
* [Manage multiple environments](TeamsFx-multi-env-v4.md)
* [Collaborate with other developers on Teams project](TeamsFx-collaboration-v4.md)
* [Edit Teams app manifest using Visual Studio](TeamsFx-preview-and-customize-app-manifest-v4.md)
