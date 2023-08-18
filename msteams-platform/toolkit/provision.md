---
title: Use Teams Toolkit to provision cloud resources
author: MuyangAmigo
description: Learn how to do provision cloud resources using Teams Toolkit in Visual Studio Code, resource creation and customize resource provision.
ms.author: shenwe
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
zone_pivot_groups: teams-toolkit-platform
---

# Provision cloud resources

TeamsFx integrates with Azure and the Microsoft 365 cloud, which allows to place your app in Azure with a single command. TeamsFx integrates with Azure Resource Manager (ARM), which enables to provision Azure resources that your application needs for code approach.

::: zone pivot="visual-studio-code-v5"

## Provision using Teams Toolkit in Microsoft Visual Studio Code

You can trigger the provision command in Teams Toolkit or TeamsFx CLI to create or update resources for your application. The steps of the provision command are defined in the `teamsapp.yml` file, under `provision` property. You can view the file to understand what resources are created.

> [!NOTE]
> Azure services incur costs in your subscription. For more information on cost estimation, see [pricing calculator](https://azure.microsoft.com/pricing/calculator/).

## Provision actions

The following list shows the actions designed for provision.

### teamsApp/create

#### What it is

If the environment variable that stores Teams app ID is empty or the app ID isn't found from Teams Developer Portal, then this action creates a new Teams app.

#### What resource it operates

Teams app in Teams Developer Portal.

#### How to use it

```yml
  - uses: teamsApp/create
    with:
      # #required. Name of Teams app
      name: <your-preferred-app-name>
    # Write the information of created resources into environment file for the specified environment variable(s).
    writeToEnvironmentFile:
      # The id for Teams app
      teamsAppId: <your-preferred-env-var-name>
```

### teamsApp/update

#### What it is

Apply the app manifest (previously called Teams app manifest) to an existing Teams app in Teams Developer Portal. It uses the app ID in manifest.json file to determine which Teams app to update.

#### What resource it operates

Teams app in Teams Developer Portal.

#### How to use it

```yml
- uses: teamsApp/update
    with:
      # Required. Relative path to the yaml file. This is the path for built zip file.
      appPackagePath: <path-to-teams-app-package-file>
```

### teamsApp/validateManifest

#### What it is

This action renders app manifest template with environment variables and validates app manifest file using its schema.

#### What resource it operates

N/A

#### How to use it

```yml
  - uses: teamsApp/validate
    with:
      # Required. Relative path to the yaml file. Path to app manifest file
      manifestPath: <path-to-manifest-file>
```

### teamsApp/validateAppPackage

#### What it is

This action validates Teams app package using validation rules.

#### What resource it operates

N/A

#### How to use it

```yml
  - uses: teamsApp/validateAppPackage
    with:
      # Required. Relative path to the yaml file. This is the path for built zip file.
      appPackagePath: <path-to-teams-app-package-file>
```

### teamsApp/zipAppPackage

#### What it is

This action renders app manifest template with environment variables and compresses the app manifest file with two icons into a zip file.

#### What resource it operates

N/A

#### How to use it

```yml
- uses: teamsApp/zipAppPackage
    with:
      # Required. Relative path to the yaml file. This is the path for app manifest file. Environment variables in manifest will be replaced before apply to AAD app.
      manifestPath: <path-to-manifest-file>
      # Required. Relative path to the yaml file. This is the path for built zip file.
      outputZipPath: <path-to-generated-zip-file>
      # Required. Relative path to the yaml file. This is the path for built manifest json file.
      outputJsonPath: <path-to-generated-json-file>
```

### teamsApp/publishAppPackage

#### What it is

This action publishes built Teams app zip file to tenant app catalog.

#### What resource it operates

Teams app in Microsoft 365 tenant app catalog.

#### How to use it

```yml
- uses: teamsApp/publishAppPackage
    with:
      # Required. Relative path to this file. This is the path for built zip file.
      appPackagePath: <path-to-teams-app-package>
    # Write the information of created resources into environment file for the specified environment variable(s).
    writeToEnvironmentFile:
      # The Teams app id in tenant app catalog.
      publishedAppId: <your-preferred-env-var-name>
```

### aadApp/create

#### What it is

This action creates a new Azure Active Directory (Azure AD) application to authenticate users if the environment variable that stores clientId is empty.

#### What resource it operates

Azure AD in your Microsoft 365 tenant.

#### How to use it

```yml
- uses: aadApp/create
    with:
      # Required. The AAD app's display name. When you run aadApp/update, the Azure Active Directory AD app name will be updated based on the definition in manifest. If you don't want to change the name, make sure the name in AAD manifest is the same with the name defined here.
      name: <your-application-name>
      # Required. If the value is false, the action will not generate client secret for you
      generateClientSecret: true
      # Required. Specifies what Microsoft accounts are supported for the current application. Supported values are: `AzureADMyOrg`, `AzureADMultipleOrgs`, `AzureADandPersonalMicrosoftAccount`, `PersonalMicrosoftAccount`.
      signInAudience: "AzureADMyOrg"
    # Write the information of created resources into environment file for the specified environment variable(s).
    writeToEnvironmentFile:
      # Required. The client (application) ID of Azure Active Directory AD application. The action will refer the environment variable defined here to determine whether to create a new AAD app.
      clientId: <your-preferred-env-var-name>
      # Required when `generateClientSecret` is `true`. The action will refer the environment variable defined here to determine whether to create a new client secret. It's recommended to add `SECRET_` prefix to the environment variable name so it will be stored to the .env.{envName}.user environment file.
      clientSecret: <your-preferred-env-var-name>
      # Required. The object ID of AAD application
      objectId: <your-preferred-env-var-name>
      # Optional. The tenant ID of AAD tenant
      tenantId: <your-preferred-env-var-name>
      # Optional. The AAD authority
      authority: <your-preferred-env-var-name>
      # Optional. The host name of AAD authority
      authorityHost: <your-preferred-env-var-name>
```
  
### aadApp/update

#### What it is

This action updates your Azure AD application based on give Azure AD app manifest. It refers to the ID property in Azure AD app manifest to determine which Azure AD app to update.

#### What resource it operates

Azure AD in your Microsoft 365 tenant.

#### How to use it

```yaml
- uses: aadApp/update
    with:
      # Required. Relative path to the yaml file. Path to the AAD app manifest. Environment variables in manifest will be replaced before apply to AAD app.
      manifestPath: <path-to-manifest-file>
      # Required. Relative path to the yaml folder. This action will output the final AAD app manifest used to update AAD app to this path.
      outputFilePath : <path-to-output-file>
```

### botAadApp/create

#### What it is

This action creates a new or reuses an existing Azure AD application for bot.

#### What resource it operates

Azure AD in your Microsoft 365 tenant.

#### How to use it

```yml
- uses: botAadApp/create
    with:
      # Required. The AAD app's display name
      name: <your-app-name>
    writeToEnvironmentFile:
      # The The AAD app's client id created for bot.
      botId: <your-preferred-env-var-name>
      # The The AAD app's client secret created for bot. 
      botPassword: <your-preferred-env-var-name>
```
  
### arm/deploy

#### What it is

This action deploys given ARM templates in parallel.

#### What resource it operates

Azure subscription.

#### How to use it

```yml
- uses: arm/deploy
    with:
      # Required. You can use built-in environment variable `AZURE_SUBSCRIPTION_ID` here. TeamsFx will ask you select one subscription if its value is empty. You're free to reference other environment variable here, but TeamsFx will not ask you to select subscription if it's empty in this case.
      subscriptionId: ${{AZURE_SUBSCRIPTION_ID}}
      # Required. You can use built-in environment variable `AZURE_RESOURCE_GROUP_NAME` here. TeamsFx will ask you to select or create one resource group if its value is empty. You're free to reference other environment variable here, but TeamsFx will not ask you to select or create resource group if it's empty in this case.
      resourceGroupName: ${{AZURE_RESOURCE_GROUP_NAME}}
      # Required. The ARM templates to be deployed.
      templates:
        # Required. Relative path to the yaml file.
      - path: <path-to-arm-template>
        # Optional. Relative path to the yaml file. TeamsFx will replace the environment variable reference with real value before deploy ARM template.
        parameters: <path-to-arm-template-parameter>
        # Required. Name of the ARM template deployment.
        deploymentName: <arm-deployment-name>
      # Optional. Teams Toolkit will download this bicep CLI version from github for you, will use bicep CLI in PATH if you remove this config.
      bicepCliVersion: v0.9.1
```

### azureStorage/enableStaticWebsite

#### What it is

This action enables static website setting in Azure Storage.

#### What resource it operates

Azure Storage.

#### How to use it

```yml
- uses: azureStorage/enableStaticWebsite
    with:
      # Required. The resource id of Azure Storage
      storageResourceId: ${{<env-name-of-azure-storage-resource-id>}}
      # Required. The path to index page.
      indexPage: <path-to-index-page>
      # Required. The path to error page.
      errorPage: <path-to-error-page>
```

### script

#### What it is

This action executes a user-defined script.

#### What resource it operates

N/A

#### How to use it

```yml
- uses: script
    with:
     # Required. Command to run or path to the script. Succeeds if exit code is 0. '::set-teamsfx-env key=value' is a special command to generate output variables into .env file, in this case, "mykey=abc" will be added the output in the corresponding .env file.
     run: $my_key="abc"; echo "::set-teamsfx-env mykey=${my_key}"
     # Optional. Available values are: bash, sh, powershell(Powershell Desktop), pwsh(powershell core), cmd. If omitted, it defaults to bash on Linux/MacOS, defaults to pwsh on windows.
     shell: <shell-name>
     # Optional. Current working directory. Defaults to the directory of this file.
     workingDirectory: <working-directory>
     # Optional. Timeout in ms.
     timeout: <timeout-in-ms>
     # Optional. Redirect stdout and stderr to a file.
     redirectTo: <path-to-output-file>
```

### Customize resource provision

The provision steps are defined in `teamsapp.yml` file, under `provision` property. You can add, remove, or update actions to the `provision` property to define the expected actions you want to do during provision.

#### Reference environment variables in parameter files

Teams Toolkit supports referencing the values from environment variables in `teamsapp.yml`, app manifest, Azure AD app manifest, and Azure parameter files. You can use syntax `${{ENV_VARIABLE_NAME}}` to reference environment variables.

The following example sets the value of environment variable `MY_AZURE_SUBSCRIPTION_ID` to `subscriptionId`:

```yml
subscriptionId: ${{MY_AZURE_SUBSCRIPTION_ID}}
```

#### Customize ARM template files

If the predefined templates don't meet your app requirements, you can create your own ARM template or update existing ARM template and provide the path to `arm/deploy` action as in the following template:

```yml
- uses: arm/deploy
    with:
      subscriptionId: ${{AZURE_SUBSCRIPTION_ID}}
      resourceGroupName: ${{AZURE_RESOURCE_GROUP_NAME}}
      templates:
      - path: <path-to-your-arm-template>
        parameters: <path-to-your-parameter-file>
        deploymentName: <arm-deployment-name>
      bicepCliVersion: <bicep-cli-version>
```
  
The `arm/deploy` action support ARM templates written in bicep and json format. If you use json format, you can omit the `bicepCliVersion` parameter. You need to have basic knowledge of Azure Resource Manager. You can get started with Azure Resource Manager at [Azure Resource Manager documentation](/azure/azure-resource-manager/).

### Customize Teams apps

You can customize your bot or the Teams app by adding environment variables to use an Azure AD app created by you. Perform the following ways to customize the Teams app:

* [Use an existing Azure AD app for your Teams app](#use-an-existing-azure-ad-app-for-your-teams-app)
* [Use an existing Azure AD app for your bot](#use-an-existing-azure-ad-app-for-your-bot)

#### Use an existing Azure AD app for your Teams app

You can follow the steps to add environment variables to the .env files to use an Azure AD app created for your Teams app. If you don't have an Azure AD app yet or you already have one but don't know where to find the correct value, see [how to use existing Azure AD app in TeamsFx project](use-existing-aad-app.md).

1. Open `teamsapp.yml` and find the `aadApp/create` action.

1. Find the environment variable names that store information for Azure AD app in the `writeToEnvironmentFile` property. The default `writeToenvironmentFile` definition if you create projects using Teams Toolkit is as follows:

     ```yml
      writeToEnvironmentFile:
       clientId: AAD_APP_CLIENT_ID
       clientSecret: SECRET_AAD_APP_CLIENT_SECRET
       objectId: AAD_APP_OBJECT_ID
       tenantId: AAD_APP_TENANT_ID
       authority: AAD_APP_OAUTH_AUTHORITY
       authorityHost: AAD_APP_OAUTH_AUTHORITY_HOST
     ```

1. Add values for each environment variable from step 2.

    1. Add the following environment variables and their values to `env\.env.{env}` file.

       ```env
        AAD_APP_CLIENT_ID=<value of Azure AD application's client id (application id)> # example: 00000000-0000-0000-0000-000000000000
        AAD_APP_OBJECT_ID=<value of Azure AD application's object id> # example: 00000000-0000-0000-0000-000000000000
        AAD_APP_TENANT_ID=<value of Azure AD's Directory (tenant) id>> # example: 00000000-0000-0000-0000-000000000000
        AAD_APP_OAUTH_AUTHORITY=<value of Azure AD's authority> # example: https://login.microsoftonline.com/<Directory (tenant) ID>
        AAD_APP_OAUTH_AUTHORITY_HOST=<host of Azure AD's authority> # example: https://login.microsoftonline.com
        AAD_APP_ACCESS_AS_USER_PERMISSION_ID=<id of access_as_user permission> # example: 00000000-0000-0000-0000-000000000000
       ```  

    1. If your application requires an Azure AD app client secret, add the following environment variable and its value to `env\.env.{env}.user` file.

       ```env
       SECRET_AAD_APP_CLIENT_SECRET=<value of Azure AD application's client secret>
       ```

>[!NOTE]
>
> * Remember to update the environment variable names in the examples if you use different names in `writeToEnvironmentFile`.
> * If you don't use `aadApp/create` action to create Azure AD application, you can add necessary environment variables with your preferred name without following above steps.
> * Ensure not to share the same Azure AD app in multiple environments.

#### Use an existing Azure AD app for your bot

You can follow the steps to add environment variables to the .env files to use an Azure AD app created for your Teams app. If you don't have an Azure AD app for your bot yet or you already have one but don't know where to find the correct values, see [Use existing Azure AD app in TeamsFx project](use-existing-aad-app.md).

1. Open `teamsapp.yml` and find the `botAadApp/create` action.

1. Find the environment variable names that store information for Azure AD app in the `writeToEnvironmentFile` property. The default `writeToEnvironmentFile` definition if you create projects using Teams Toolkit is as follows:

    ```yml
     writeToEnvironmentFile:
       botId: BOT_ID
       botPassword: SECRET_BOT_PASSWORD
    ```

1. Add values for each environment variable from step 2.

    1. Add the following environment variable and its value to `env\.env.{env}` file.

       ```env
       BOT_ID=<value of Azure AD application's client id (application id)> # example: 00000000-0000-0000-0000-000000000000    
       ```

    1. Add the following environment variable and its value to `env\.env.{env}.user` file.

       ```env
       SECRET_BOT_PASSWORD=<value of Azure AD application's client secret>
       ```

> [!NOTE]
>
> * Remember to update the environment variable names in the examples if you use different names in `writeToEnvironmentFile`.
> * If you don't use `botAadApp/create` action to create Azure AD application, you can add necessary environment variables with your preferred name without following above steps.
> * Ensure not to share the same Azure AD app in multiple environments.

## See also

* [Deploy Teams app to the cloud](deploy.md)

::: zone-end

::: zone pivot="visual-studio-code-v4"

> [!IMPORTANT]
>
> We've introduced the [Teams Toolkit v5](/microsoftteams/platform/toolkit/teams-toolkit-fundamentals?pivots=visual-studio-code-v5) extension within Visual Studio Code. This version comes to you with many new app development features. We recommend that you use Teams Toolkit v5 for building your Teams app.
>
> Teams Toolkit v4 extension will soon be deprecated.

TeamsFx integrates with Azure and the Microsoft 365 cloud, which allows to place your app in Azure with a single command. TeamsFx integrates with Azure Resource Manager (ARM), which enables to provision Azure resources that your application needs for code approach.

> [!NOTE]
> Teams toolkit doesn't provide support to deploy resources to other cloud platforms except Azure, however, the user can deploy manually.

## Provision using Teams Toolkit in Microsoft Visual Studio Code version 4

Provision Azure resources with a single command in Teams Toolkit for Visual Studio Code or TeamsFx CLI. For more information, see [how to provision Azure-based app](/microsoftteams/platform/sbs-gs-javascript?tabs=vscode%2Cvsc%2Cviscode%2Cvcode&tutorial-step=8).

## Create Resources

When you trigger the provision command in Teams Toolkit or TeamsFx CLI, you can get the following resources:

* Microsoft Azure Active Directory (Azure AD) app under your Microsoft 365 tenant.
* Teams app registration under your Microsoft 365 tenant's Teams platform.
* Azure resources under your selected Azure subscription.

When you create a new project, you also need to create Azure resources. The ARM template defines all the Azure resources and helps to create required Azure resources during provision. When you [add a new capability resource](/microsoftteams/platform/toolkit/add-resource) to an existing project, the updated ARM template reflects the latest change.

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
* Ensure that the output of the auto-generated ARM template remains unchanged. You can add more outputs to the ARM template. The output is `.fx\states\state.{env}.json` and can be used in other features, such as deploy and validate app manifest file.

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
2. Add function to the project. For more information, see [add a new capability resource](/microsoftteams/platform/toolkit/add-resource).
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

## See also

* [Teams Toolkit Overview](~/toolkit/teams-toolkit-fundamentals.md)
* [Deploy Teams app to the cloud](deploy.md)
* [Manage multiple environments](~/toolkit/TeamsFx-multi-env.md)
* [Collaborate with other developers on Teams project](~/toolkit/TeamsFx-collaboration.md)
* [Edit app manifest using Visual Studio](~/toolkit/TeamsFx-preview-and-customize-app-manifest.md)

::: zone-end
