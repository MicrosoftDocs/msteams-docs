---
title: Use Teams Toolkit to provision cloud resources for Visual Studio
author: MuyangAmigo
description: In this module, learn how to do provision cloud resources using Teams Toolkit, resource creation and customize resource provision in Visual Studio
ms.author: shenwe
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Provision cloud resources using Teams Toolkit for Visual Studio

TeamsFx can be integrated with Azure and Microsoft 365 cloud, this allows you to place your application in Azure with a single command. TeamsFx integrates with Azure Resource Manager that enables you to provision Azure resources. For the code approach your application needs these resources.

## Prerequisites

* To provision the cloud resources you must have the following accounts as prerequisites:
  * Microsoft 365 account with a valid subscription.
  * Azure account with a valid subscription. For more information, see [how to prepare accounts for building Teams app](/microsoftteams/platform/toolkit/accounts?branch=pr-en-us-6427)
* [Install Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension)for Visual Studio.

## Steps to provision cloud resources

### Sign in to your M365 account

1. Open Visual Studio.
2. Open the Teams App project.
3. Select **Project > Teams Toolkit > Prepare Teams App dependencies**.

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/Provision-cloud-resources-in-TTK-VS/teams-toolkit-vs-prepare-app-dependencies.png" alt-text="Teams app dependencies":::

4. Sign in to your M365 account using your credentials. If you do not have an account then create a free account by [clicking here](https://developer.microsoft.com/en-us/microsoft-365/dev-program).
5. Select **Continue**.

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/Provision-cloud-resources-in-TTK-VS/teams-toolkit-vs-signin-M365.png" alt-text="Confirm by selecting continue":::

> [!NOTE]
> If you are already logged in, your username will be displayed, you have an option to switch account.

### Sign in to your Azure account

1. Open Visual Studio.
2. Open the Teams App project.
3. Select **Project > Teams Toolkit > Provision in the cloud**.

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/Provision-cloud-resources-in-TTK-VS/teams-toolkit-vs-provision-in-cloud.png" alt-text="Provision in the cloud":::

4. Select **Sign in...** to sign in to your Azure account.

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/Provision-cloud-resources-in-TTK-VS/teams-toolkit-vs-provision-start.png" alt-text="Sign in to your Azure account":::

> [!NOTE]
> If you are already logged in, your username would be would be displayed, you have an option to switch account.

5. Sign in to Azure account using your credentials.
6. Select Continue to add provision cloud resources.

### Adding Provision cloud resources

1. Select Project > Teams Toolkit > Provision in the cloud.
2. The Provision tab will list all subscriptions in your Azure account.
3. Select or create **resource group**.
4. Select Provision.

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/Provision-cloud-resources-in-TTK-VS/teams-toolkit-vs-provision-select-subscription.png" alt-text="Select resource group":::

5. A dialog box warns you that costs may incur when running resources in Azure. Select **Provision**.

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/Provision-cloud-resources-in-TTK-VS/teams-toolkit-vs-provision-warning.png" alt-text="Provision warning":::

6. The provision process of creating the resources in the Azure cloud may take some time. Meanwhile you can monitor the progress by checking Teams Toolkit output window.
7. A window will prompt you after provisioning is complete. You can select **View Provisioned Resources** to check all the resources that were provisioned.

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/Provision-cloud-resources-in-TTK-VS/teams-toolkit-vs-provision-provision-success.png" alt-text="Provision success":::

### Resource creation

When you trigger provision command in Teams Toolkit or TeamsFx CLI, you will create the following resources:

* Microsoft Azure Active Directory (Azure AD) application under your Microsoft 365 tenant.
* Teams app registration under your Microsoft 365 tenant's Teams platform.
* Azure resources under your selected Azure subscription.

When you create a new project, you will need to create some Azure resources. The ARM template defines all the Azure resources and helps you to create required Azure resources during provision.

### Resource creation for Teams Tab application

| Resource | Purpose | Description |
| --- | --- | --- |
| App Service plan | Host the web app of tab | Not applicable |
| App Service | Host your Blazor tab app and simple auth server that helps you gain access to other services | Adds user assigned identity to access other Azure resources. |
| Managed Identity | Authenticate Azure service-to-service requests | Shared across different capabilities and resources |

### Resource creation for Teams Message Extension application

| Resource | Purpose | Description |
| --- | --- | --- |
| Azure Bot | Registers your app as a bot with the bot framework | Connects bot to Teams |
| App Service plan | Host the web bot app | Not applicable |
| App Service | Host your bot app | Adds user assigned identity to access other Azure resources. |
| Managed Identity | Authenticate Azure service-to-service requests | Shared across different capabilities and resources |

### Resource creation for Teams Command bot application

| Resource | Purpose | Description |
| --- | --- | --- |
| Azure Bot | Registers your app as a bot with the bot framework | Connects bot to Teams |
| App Service plan | Host the web bot app | Not applicable |
| App Service | Host your bot app | Adds user assigned identity to access other Azure resources. |
| Managed Identity | Authenticate Azure service-to-service requests | Shared across different capabilities and resources |

### Resource creation for Teams Notification bot with HTTP Trigger(Web API Server) application

| Resource | Purpose | Description |
| --- | --- | --- |
| Azure Bot | Registers your app as a bot with the bot framework | Connects bot to Teams |
| App Service plan | Host the web bot app | Not applicable |
| App Service | Host your bot app | Adds user assigned identity to access other Azure resources. |
| Managed Identity | Authenticate Azure service-to-service requests | Shared across different capabilities and resources |

### Resource creation for Teams Notification bot with HTTP Trigger(Azure Function) application

| Resource | Purpose | Description |
| --- | --- | --- |
| Azure Bot | Registers your app as a bot with the bot framework | Connects bot to Teams |
| Managed Identity | Authenticate Azure service-to-service requests | Shared across different capabilities and resources |
| Storage account | Required to create function app | Not applicable |
| App Service plan | Host the Function bot App | Not applicable |
| Function app | Host your bot app | Adds user assigned identity to access other Azure resources.<br>Adds Cross-origin resource sharing (CORS) rule to allow requests from your tab app<br>Adds authentication setting that only allows requests from your Teams app.<br>Adds app settings required by TeamsFx SDK |

### Resource creation for Teams Notification bot with Timer Trigger(Azure Function) application

| Resource | Purpose | Description |
| --- | --- | --- |
| Azure Bot | Registers your app as a bot with the bot framework | Connects bot to Teams |
| Managed Identity | Authenticate Azure service-to-service requests | Shared across different capabilities and resources |
| Storage account | Required to create function app | Not applicable |
| App Service plan | Host the Function bot App | Not applicable |
| Function App | Host your bot app | Adds user assigned identity to access other Azure resources.<br>Adds Cross-origin resource sharing (CORS) rule to allow requests from your tab app<br>Adds authentication setting that only allows requests from your Teams app.<br>Adds app settings required by TeamsFx SDK |

### Resource creation for Teams Notification bot with HTTP Trigger + Timer Trigger(Azure Function) application

| Resource | Purpose | Description |
| --- | --- | --- |
| Azure Bot | Registers your app as a bot with the bot framework | Connects bot to Teams |
| Managed Identity | Authenticate Azure service-to-service requests | Shared across different capabilities and resources |
| Storage account | Required to create function app | Not applicable |
| App Service plan | Host the Function bot App | Not applicable |
| Function App | Host your bot app | Adds user assigned identity to access other Azure resources.<br>Adds Cross-origin resource sharing (CORS) rule to allow requests from your tab app<br>Adds authentication setting that only allows requests from your Teams app.<br>Adds app settings required by TeamsFx SDK |

### Check your created resources

[Manage your resources]
You can login to [Azure Portal](https://portal.azure.com/) and manage all resources created by Teams Toolkit.

* Select Resource groups and choose the Resource group you just chose or created
* Click Overview - Resources, all resource will list below.

### Customize resource provision

Teams Toolkit enables you to use an infrastructure as a code approach to define the Azure resources that you'd want to provision, and the way you want to configure. The tool[Teams Toolkit?] uses ARM template to define Azure resources. The ARM template is a set of bicep files that defines the infrastructure and configuration for your project. You can customize Azure resources by modifying the ARM template. For more information, see [bicep document](/azure/azure-resource-manager/bicep).

Provision with ARM involves changing the following sets of files, parameters and templates:

* ARM parameter files (`azure.parameters.{your_env_name}.json`) located in `.fx/configs` folder, for passing parameters to templates.
* ARM template files located in `templates/azure` folder, this folder contains following files:

| File | Function | Allow customization |
| --- | --- | --- |
| main.bicep | Provide entry point for Azure resource provision | Yes |
| provision.bicep | Create and configure Azure resources | Yes |
| config.bicep | Add TeamsFx required configurations to Azure resources | Yes |
| provision/xxx.bicep | Create and configure each Azure resource consumed by `provision.bicep` | Yes |
| teamsfx/xxx.bicep | Add TeamsFx required configurations to each Azure resource consumed by `config.bicep`| No |

> [!NOTE]
> Once you add resources or capabilities to your project, `teamsfx/xxx.bicep` will be regenerated, then you can't customize them. To modify the bicep files, you can use Git to track your changes to `teamsfx/xxx.bicep` files. This does not make you lose any changes while adding resources or capabilities to your project.

The ARM template files use placeholders for parameters. The purpose of these placeholders is to ensure that new resources can be created in the new environment. The actual values are resolved from `.fx/states/state.{env}.json`.

### Azure AD application related parameters

| Parameter name | Default value place holder | Meaning of the place holder | How to customize |
| --- | --- | --- | --- |
| Microsoft 365 ClientId | {{state.fx-resource-aad-app-for-teams.clientId}} | Your app's Azure AD app client id created during provision | [Customize the value](#use-an-existing-azure-ad-app-for-your-teams-app) |
| Microsoft 365 ClientSecret | {{state.fx-resource-aad-app-for-teams.clientSecret}} | Your app's Azure AD app client secret created during provision | [Customize the value](#use-an-existing-azure-ad-app-for-your-teams-app)  |
| Microsoft 365 TenantId | {{state.fx-resource-aad-app-for-teams.tenantId}} | Tenant Id of your app's Azure AD app | [Customize the value](#use-an-existing-azure-ad-app-for-your-teams-app)  |
| Microsoft 365 OAuthAuthorityHost | {{state.fx-resource-aad-app-for-teams.oauthHost}} | OAuth authority host of your app's Azure AD app | [Customize the value](#use-an-existing-azure-ad-app-for-your-teams-app) |
| botAadAppClientId | {{state.fx-resource-bot.botId}} | Bot's Azure AD app client Id created during provision | [Customize the value](#use-an-existing-azure-ad-app-for-your-bot) |
| botAadAppClientSecret | {{state.fx-resource-bot.botPassword}} | Bot's Azure AD app client secret created during provision | [Customize the value](#use-an-existing-azure-ad-app-for-your-bot) |

### Referencing environment variables in parameter files

When the value is secret, then you do not need to hardcode them in parameter file. The parameter files support referencing the values from environment variables. You can use this syntax `{{$env.YOUR_ENV_VARIABLE_NAME}}` in parameter values for the tool to resolve from current environment variable.

The following example reads the value of `mySelfHostedDbConnectionString` parameter from environment variable `DB_CONNECTION_STRING`:

```json
...
    "mySelfHostedDbConnectionString": "{{$env.DB_CONNECTION_STRING}}"
...
```

### Customize ARM template files

If the predefined templates doesn't meet your application requirement, you can customize the ARM templates under `templates/azure` folder. For example, you can customize the ARM template to create some additional Azure resources for your app. You need to have basic knowledge of bicep language, which is used to author ARM template. You can get started with bicep at [bicep documentation](/azure/azure-resource-manager/bicep/).

To ensure the TeamsFx tool functions properly, customize ARM template, which satisfies the following requirement:

* Ensure that the folder structure and file name remain unchanged. The tool may append new content to the existing files when you add more resources or capabilities to your project.
* Ensure that the name of auto-generated parameters as well as its property names remain unhanged. The auto-generated parameters may be used when you add more resources or capabilities to your project.
* Ensure that the output of auto-generated ARM template are unchanged as well. You can add additional outputs to ARM template. The output is `.fx/states/state.{env}.json` and can be used in other features such as deploy, validate manifest file.

If you use other tools for further development, you can ignore the above requirements.

### Customization scenarios

You can customize the following scenarios:

#### Use an existing Azure AD app for your bot

You can add the following configuration snippet to `.fx/configs/config.{env}.json` file to use an Azure AD app created by you for your Teams app. To create an Azure AD app, follow the link <https://aka.ms/teamsfx-existing-aad-doc>.

```json
"auth": {
    "clientId": "<your Azure AD app client id>",
    "clientSecret": "{{$env.ENV_NAME_THAT_STORES_YOUR_SECRET}}",
    "objectId": "<your Azure AD app object id>",
    "accessAsUserScopeId": "<id of the access_as_user scope>"
}
```

After adding the snippet, add your secret value to the related environment variable so that the tool can resolve the actual secret value during provision.

> [!NOTE]
> Ensure not to share the same Azure AD app in multiple environments. If you don't have permission to update the Azure AD app, you will get a warning with instructions to manually update the Azure AD app. Follow these instructions to update your Azure AD app after provision.

#### Use an existing Azure AD app for your Teams app

You can add the following configuration snippet to `.fx/configs/config.{env}.json` file to use the Azure AD app created for your bot:

```json
"bot": {
    "appId": "<your Azure AD app client id>",
    "appPassword": "{{$env.ENV_NAME_THAT_STORES_YOUR_SECRET}}"
}
```

After adding the preceding snippet, add your secret value to the related environment variable for the tool to resolve the actual secret value during provision.

#### Skip adding user for SQL database

If you get an insufficient permission error when the tool tries to add user to SQL database, you can then add the following configuration snippet to `.fx/configs/config.{env}.json` file to skip adding SQL database user:

```json
"skipAddingSqlUser": true
```
