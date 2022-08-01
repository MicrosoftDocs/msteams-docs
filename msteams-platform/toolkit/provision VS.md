---
title: Use Teams Toolkit to provision cloud resources using Teams Toolkit for Visual Studio
author: surbhigupta
description: In this module, learn how to provision cloud resources using Teams Toolkit. Also to create resources and customize resource provision in Visual Studio
ms.author: shenwe
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Provision cloud resources using Visual Studio

TeamsFx integrates with Azure and Microsoft 365 cloud that allows you to place your application in Azure with a single command. TeamsFx integrates with Azure Resource Manager that enables you to provision Azure resources. For the code approach, your application needs the cloud resources.

## Prerequisites

Here's a list of tools you need for provisioning your cloud resources:

* [Microsoft 365 developer account](https://developer.microsoft.com/en-us/microsoft-365/dev-program) or access to Microsoft Teams account with the appropriate permissions to install an app.
* [Azure account](https://portal.azure.com/) with a valid subscription.
* Teams Toolkit installation for Visual Studio.

## Steps to provision cloud resources

The following steps help you to provision cloud resources using Visual Studio:

### Sign in to your Microsoft 365 account

1. Open Visual Studio.
2. Open the Microsoft Teams app project.
3. Select **Project**.
4. Select **Teams Toolkit**.
5. Select **Prepare Teams App Dependencies**.

   :::image type="content" source="../assets/images/Tools-and-SDK-revamp/Provision-cloud-resources-in-TTK-VS/teams-toolkit-vs-prepare-app-dependencies.png" alt-text="Prepare teams app dependencies":::

7. Select **Sign in...** to sign in to your Azure account.

   :::image type="content" source="../assets/images/Tools-and-SDK-revamp/Provision-cloud-resources-in-TTK-VS/teams-toolkit-vs-prepare1.png" alt-text="Sign in to Microsoft 365":::

    > [!NOTE]
    > If you are already logged in, your username displays, or you can select the same to switch your account.

8. Your default web browser opens to let you [sign in](https://developer.microsoft.com/en-us/microsoft-365/dev-program) to the account.
9. Select **Continue** after you've signed in to your account.

    :::image type="content" source="../assets/images/Tools-and-SDK-revamp/Provision-cloud-resources-in-TTK-VS/teams-toolkit-vs-signin-M365.png" alt-text="Confirm by selecting continue":::

### Sign in to your Azure account

1. Open Visual Studio.
2. Open the Teams App project.
3. Select **Project**.
4. Select **Teams Toolkit**.
5. Select **Provision in the cloud**.

   :::image type="content" source="../assets/images/Tools-and-SDK-revamp/Provision-cloud-resources-in-TTK-VS/teams-toolkit-vs-provision-in-cloud.png" alt-text="Sign in to Azure account":::

6. Select **Sign in...** to sign in to your Azure account.

   :::image type="content" source="../assets/images/Tools-and-SDK-revamp/Provision-cloud-resources-in-TTK-VS/teams-toolkit-vs-provision-start.png" alt-text="Sign in to your Azure account":::

   > [!NOTE]
   > If you're already logged in, your username is displayed, or you have an option to switch account.

7. Sign in to Azure account using your credentials. The browser closes automatically.

### To provision cloud resources

1. After you open your project in Visual Studio, Select **Project**
2. Select **Teams Toolkit**
3. Select **Provision in the cloud**.

   :::image type="content" source="../assets/images/Tools-and-SDK-revamp/Provision-cloud-resources-in-TTK-VS/teams-toolkit-vs-provision-in-cloud1.png" alt-text="Provision in cloud":::

5. In the **Provision** dialogue you can see a list of all the subscriptions in your Azure account.
6. You can either select or create a new **Resource group**.
7. Select **Provision**.

   :::image type="content" source="../assets/images/Tools-and-SDK-revamp/Provision-cloud-resources-in-TTK-VS/teams-toolkit-vs-provision-select-subscription.png" alt-text="Select resource group":::

8. The dialog warns you that charges may be added as per Azure usage. Select **Provision**.

   :::image type="content" source="../assets/images/Tools-and-SDK-revamp/Provision-cloud-resources-in-TTK-VS/teams-toolkit-vs-provision-warning.png" alt-text="Provision warning":::

The provision process of creating the resources in the Azure cloud may take some time.

6. Check Teams Toolkit output window to monitor progress.
7. You're prompted after provisioning is complete. Select **View Provisioned Resources** to view all the resources that were provisioned.

   :::image type="content" source="../assets/images/Tools-and-SDK-revamp/Provision-cloud-resources-in-TTK-VS/teams-toolkit-vs-provision-provision-success.png" alt-text="View provisioned resources":::

### Create resources

When you trigger provision command in Teams Toolkit or TeamsFx CLI, you can create the following resources:

* Microsoft Azure Active Directory (Azure AD) application under your Microsoft 365 tenant.
* Teams app registration under your Microsoft 365 tenant's Teams platform.
* Azure resources under your selected Azure subscription.

When you create a new project, you also need to create Azure resources. The Azure Resource Manager (ARM) templates defines all the Azure resources and helps you to create required Azure resources during provision.

### Create resource for Teams tab application

| Resource | Purpose | Description |
| --- | --- | --- |
| App service plan | Hosts your web app of tab. | Not applicable |
| App service | Hosts your Blazor tab app and simple auth server that helps gain access to other services. | Adds user assigned identity to access other Azure resources. |
| Manage identity | Authenticate Azure service-to-service requests. | Shares across different capabilities and resources. |

### Create resources for Teams message extension application

| Resource | Purpose | Description |
| --- | --- | --- |
| Azure bot | Registers your app as a bot with the bot framework. | Connects bot to Teams. |
| App Service plan | Hosts your web bot app. | Not applicable |
| App Service | Hosts your bot app. | Adds user assigned identity to access other Azure resources. |
| Manage identity | Authenticate Azure service-to-service requests. | Shares across different capabilities and resources. |

### Create resources for Teams command bot application

| Resource | Purpose | Description |
| --- | --- | --- |
| Azure bot | Registers your app as a bot with the bot framework. | Connects bot to Teams. |
| App service plan | Hosts your web bot app. | Not applicable |
| App service | Hosts your bot app. | Adds user assigned identity to access other Azure resources. |
| Manage identity | Authenticate Azure service-to-service requests. | Shares across different capabilities and resources. |

### Create resources for Teams notification bot with HTTP trigger (Web API server) application

| Resource | Purpose | Description |
| --- | --- | --- |
| Azure bot | Registers your app as a bot with the bot framework. | Connects bot to Teams. |
| App service plan | Hosts your web bot app. | Not applicable |
| App service | Host your bot app. | Adds user assigned identity to access other Azure resources. |
| Managed Identity | Authenticate Azure service-to-service requests. | Shares across different capabilities and resources. |

### Create resource for Teams notification bot with HTTP trigger (Azure function) application

| Resource | Purpose | Description |
| --- | --- | --- |
| Azure bot | Registers your app as a bot with the bot framework. | Connects bot to Teams. |
| Manage identity | Authenticates Azure service-to-service requests. | Shared across different capabilities and resources. |
| Storage account | Helps to create function app. | Not applicable |
| App service plan | Hosts the function bot App. | Not applicable |
| Function app | Hosts your bot app. | -Adds user assigned identity to access other Azure resources.<br>-Adds Cross-origin resource sharing (CORS) rule to allow requests from your tab app.<br>-Adds authentication setting that only allows requests from your Teams app.<br>-Adds app settings required by TeamsFx SDK. |

### Create resource for Teams notification bot with timer trigger (Azure function) application

| Resource | Purpose | Description |
| --- | --- | --- |
| Azure bot | Registers your app as a bot with the bot framework. | Connects bot to Teams. |
| Manage identity | Authenticate Azure service-to-service requests. | Shares across different capabilities and resources. |
| Storage account | Helps to create function app. | Not applicable. |
| App service plan | Hosts the function bot app. | Not applicable |
| Function app | Hosts your bot app. | -Adds user assigned identity to access other Azure resources.<br>-Adds Cross-origin resource sharing (CORS) rule to allow requests from your tab app.<br>-Adds authentication setting that only allows requests from your Teams app.<br>-Adds app settings required by TeamsFx SDK. |

### Create resources for Teams notification bot with HTTP trigger + timer trigger (Azure function) application

| Resource | Purpose | Description |
| --- | --- | --- |
| Azure bot | Registers your app as a bot with the bot framework. | Connects bot to Teams. |
| Manage identity | Authenticate Azure service-to-service requests. | Shares across different capabilities and resources. |
| Storage account | Helps to create function app | Not applicable |
| App service plan | Hosts the function bot App | Not applicable |
| Function App | Hosts your bot app | -Adds user assigned identity to access other Azure resources.<br>-Adds Cross-origin resource sharing (CORS) rule to allow requests from your tab app.<br>-Adds authentication setting that only allows requests from your Teams app.<br>-Adds app settings required by TeamsFx SDK. |

### Manage your resources

You can sign in to [Azure portal](https://portal.azure.com/) and manage all resources created by Teams Toolkit.

* You can select resource group from the existing list or the new resource group that you've created.
* You can see the details of the resource group you've selected in the overview section of the table of content.

### Customize resource provision

Teams Toolkit enables you to use an infrastructure for the code approach to define the Azure resources that you want to provision. You can change the configuration in Teams Toolkit as per your requirement.

Teams Toolkit uses ARM template to define Azure resources. The ARM template is a set of bicep files that defines the infrastructure and configuration for your project. You can customize Azure resources by modifying the ARM template. For more information, see [bicep document](/azure/azure-resource-manager/bicep).

Provision with ARM involves changing the following sets of files, parameters and templates:

* ARM parameter files (`azure.parameters.{your_env_name}.json`) located in `.fx/configs` folder, for passing parameters to templates.
* ARM template files located in `templates/azure` folder contains following files:

| File | Function | Allow customization |
| --- | --- | --- |
| main.bicep | Provide entry point for Azure resource provision | Yes |
| provision.bicep | Create and configure Azure resources | Yes |
| config.bicep | Add TeamsFx required configurations to Azure resources | Yes |
| provision/xxx.bicep | Create and configure each Azure resource consumed by `provision.bicep` | Yes |
| teamsfx/xxx.bicep | Add TeamsFx required configurations to each Azure resource consumed by `config.bicep`| No |

> [!NOTE]
> After you add resources or capabilities to your project, `teamsfx/xxx.bicep` is regenerated. To modify the bicep files, you can use Git to track your changes to `teamsfx/xxx.bicep` files. This doesn't make you lose any changes while adding resources or capabilities to your project.

The ARM template files use placeholders for parameters. The purpose of the placeholders is to ensure that new resources can be created in the new environment. The actual values are resolved from `.fx/states/state.{env}.json` file.

### Azure AD application related parameters

| Parameter name | Default value place holder | Meaning of the place holder | How to customize |
| --- | --- | --- | --- |
| Microsoft 365 ClientId | {{state.fx-resource-aad-app-for-teams.clientId}} | Your app's Azure AD app client ID created during provision. | [Customize the value](#use-an-existing-azure-ad-app-for-your-teams-app) |
| Microsoft 365 ClientSecret | {{state.fx-resource-aad-app-for-teams.clientSecret}} | Your app's Azure AD app client secret created during provision. | [Customize the value](#use-an-existing-azure-ad-app-for-your-teams-app)  |
| Microsoft 365 TenantId | {{state.fx-resource-aad-app-for-teams.tenantId}} | Tenant ID of your app's Azure AD app. | [Customize the value](#use-an-existing-azure-ad-app-for-your-teams-app)  |
| Microsoft 365 OAuthAuthorityHost | {{state.fx-resource-aad-app-for-teams.oauthHost}} | OAuth authority host of your app's Azure AD app. | [Customize the value](#use-an-existing-azure-ad-app-for-your-teams-app) |
| botAadAppClientId | {{state.fx-resource-bot.botId}} | Bot's Azure AD app client ID created during provision. | [Customize the value](#use-an-existing-azure-ad-app-for-your-bot) |
| botAadAppClientSecret | {{state.fx-resource-bot.botPassword}} | Bot's Azure AD app client secret created during provision. | [Customize the value](#use-an-existing-azure-ad-app-for-your-bot) |

### Reference environment variables in parameter files

When the value is secret, then you don't need to hardcode them in parameter file. The parameter files support referencing the values from environment variables. You can use this syntax `{{$env.YOUR_ENV_VARIABLE_NAME}}` in the parameter values for Teams Toolkit to resolve from current environment variable.

The following example reads the value of `mySelfHostedDbConnectionString` parameter from environment variable `DB_CONNECTION_STRING`:

```json
...
    "mySelfHostedDbConnectionString": "{{$env.DB_CONNECTION_STRING}}"
...
```

### Customize ARM template files

If the predefined templates don't meet your application requirement, you can customize the ARM templates under `templates/azure` folder. For example, you can customize the ARM template to create some extra Azure resources for your app. You need to have basic knowledge of bicep language, which is used to author ARM template.

To ensure the TeamsFx tool functions properly, customize ARM template, that satisfies the following requirement:

* Ensure that the folder structure and file name remain unchanged. The tool may append new content to the existing files when you add more resources or capabilities to your project.
* Ensure that the name of auto-generated parameters and its property names remain unhanged. The auto-generated parameters may be used when you add more resources or capabilities to your project.
* Ensure that the output of auto-generated ARM template is unchanged as well. You can add more outputs to ARM template. The output is `.fx/states/state.{env}.json` and can be used in other features such as deploy and validate manifest file.

### Customize Teams app

You can customize your bot or the Teams app by adding configuration snippets to use an Azure AD app created by you. You can perform in the following ways:

#### Use an existing Azure AD app for your bot

You can add the following configuration snippet `.fx/configs/config.{env}.json` to use an Azure AD app created by you for your Teams app. To create an Azure AD app, follow the link <https://aka.ms/teamsfx-existing-aad-doc>.

```json
"auth": {
    "clientId": "<your Azure AD app client id>",
    "clientSecret": "{{$env.ENV_NAME_THAT_STORES_YOUR_SECRET}}",
    "objectId": "<your Azure AD app object id>",
    "accessAsUserScopeId": "<id of the access_as_user scope>"
}
```

After adding the snippet, add your client secret to the related environment variable so that Teams Toolkit can resolve the actual client secret during provision.

> [!NOTE]
> Ensure not to share the same Azure AD app in multiple environments. If you don't have permission to update the Azure AD app, you get a warning with instructions to manually update the Azure AD app. Follow these instructions to update your Azure AD app after provision.

#### Use an existing Azure AD app for your Teams app

You can add the following configuration snippet to `.fx/configs/config.{env}.json` to use the Azure AD app created for your bot:

```json
"bot": {
    "appId": "<your Azure AD app client id>",
    "appPassword": "{{$env.ENV_NAME_THAT_STORES_YOUR_SECRET}}"
}
```

After adding the snippet, add your client secret to the related environment variable for Teams Toolkit to resolve the actual client secret during provision.

#### Skip adding user for SQL database

If you get an insufficient permission error when Teams Toolkit tries to add user to SQL database, you can then add the following configuration snippet to `.fx/configs/config.{env}.json` to skip adding SQL database user:

```json
"skipAddingSqlUser": true
```

## See also
