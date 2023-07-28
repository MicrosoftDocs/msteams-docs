---
title: Use Teams Toolkit to provision cloud resources
author: MuyangAmigo
description: Learn how to do provision cloud resources using Teams Toolkit in Visual Studio Code and Visual Studio, resource creation and customize resource provision.
ms.author: shenwe
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
zone_pivot_groups: teams-app-platform
---

# Provision cloud resources

TeamsFx integrates with Azure and the Microsoft 365 cloud, which allows to place your app in Azure with a single command. TeamsFx integrates with Azure Resource Manager (ARM), which enables to provision Azure resources that your application needs for code approach.

::: zone pivot="visual-studio-code"

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

Apply the Teams app manifest to an existing Teams app in Teams Developer Portal. It uses the app ID in manifest.json file to determine which Teams app to update.

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

This action renders Teams app manifest template with environment variables and validates Teams app manifest file using its schema.

#### What resource it operates

N/A

#### How to use it

```yml
  - uses: teamsApp/validate
    with:
      # Required. Relative path to the yaml file. Path to Teams app manifest file
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

This action renders Teams app manifest template with environment variables and compresses the manifest file with two icons into a zip file.

#### What resource it operates

N/A

#### How to use it

```yml
- uses: teamsApp/zipAppPackage
    with:
      # Required. Relative path to the yaml file. This is the path for Teams app manifest file. Environment variables in manifest will be replaced before apply to AAD app.
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
      # Required. Relative path to the yaml folder. This action will output the final AAD manifest used to update AAD app to this path.
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

Teams Toolkit supports referencing the values from environment variables in `teamsapp.yml`, Teams app manifest, Azure AD app manifest, and Azure parameter files. You can use syntax `${{ENV_VARIABLE_NAME}}` to reference environment variables.

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

::: zone-end

::: zone pivot="visual-studio"

## Provision using Teams Toolkit in Visual Studio

The following steps help you to provision cloud resources using Visual Studio:

### Sign in to your Microsoft 365 account

1. Open **Visual Studio**.
1. Open the Microsoft Teams app project.
1. Select **Project** > **Teams Toolkit** > **Prepare Teams App Dependencies**.


   :::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-v5/teams-toolkit-vs-prepare-app-dependencies.png" alt-text="Prepare teams app dependencies":::

1. Select **Sign in...** to sign in to Microsoft 365 account. 

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-v5/teams-toolkit-vs-prepare.png" alt-text="Sign in to Microsoft":::
   
    > [!NOTE]
    > If you are already singed in, your username displays, or you have an option to **Add an account**.

1. Your default web browser opens to let you [sign in](https://developer.microsoft.com/en-us/microsoft-365/dev-program) to the account.

1. Select **Continue** after you've signed in to your account.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-v5/teams-toolkit-vs-signin-m365.png" alt-text="Confirm by selecting continue.":::

### Sign in to your Azure account

1. Open **Visual Studio**.
1. Open the Teams App project.
1. Select **Project** > **Teams Toolkit** > **Provision in the cloud**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-v5/teams-toolkit-vs-provision-in-cloud.png" alt-text="Sign in to Azure account.":::

1. Select **Sign in...** to sign in to your Azure account.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-v5/teams-toolkit-vs-provision-start.png" alt-text="Screenshot shows the sign in to Azure account.":::

   > [!NOTE]
   > If you're already signed in, your username is displayed, or you have an option to **Add an account**.

   After sign in to your Azure account using your credentials, the browser closes automatically.

### To provision cloud resources

After you open your project in Visual Studio:

1. Select **Project** > **Teams Toolkit** > **Provision in the cloud...**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-v5/teams-toolkit-vs-provision-in-cloud.png" alt-text="Screenshot shows how to provision in cloud.":::

   **Provision** window appears.

1. Enter the following details to provision your resources:

   1. Select your **Subscription name** from the dropdown menu.
   1. Select your **Resource group** from the dropdown menu or you can create new **Resource group** by selecting **New...**.
   1. Select your **Region** from the dropdown menu.
   1. Select **Provision**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-v5/teams-toolkit-vs-provision-select-subscription.png" alt-text="Screenshot shows the selection of resource group.":::

1. In the pop-up window that appears, Select **Provision**. 

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-v5/teams-toolkit-vs-provision-warning.png" alt-text="Screenshot shows the provision warning.":::

   The provisioning process creates resources in the Azure cloud. You can monitor the progress by observing the Teams Toolkit output window.

1. In the pop-up window that appears, Select **View provisioned resources** to view all the resources that were provisioned. 

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-v5/teams-toolkit-vs-provision-provision-success.png" alt-text="Screenshot shows the provisioned resources.":::

## Provision actions

The following list shows the actions designed for provision.

### teamsApp/create

#### What is teamsApp/create?

If the environment variable that stores Teams app ID is empty or the app ID isn't found from Teams Developer Portal, then this action creates a new Teams app.

#### What resource teamsApp/create operates on?

Teams app in Teams Developer Portal.

#### How to use teamsApp/create?

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
a
#### What is teamsApp/update?

Apply the Teams app manifest to an existing Teams app in Teams Developer Portal. It uses the app ID in manifest.json file to determine which Teams app to update.

#### What resource teamsApp/update operates on?

Teams app in Teams Developer Portal.

#### How to use teamsApp/update?

```yml
- uses: teamsApp/update
    with:
      # Required. Relative path to the yaml file. This is the path for built zip file.
      appPackagePath: <path-to-teams-app-package-file>
```

### teamsApp/validateManifest

#### What is teamsApp/validateManifest?

teamsApp/validateManifest action renders Teams app manifest template with environment variables and validates Teams app manifest file using its schema.

#### What resource teamsApp/validateManifest operates on?

N/A

#### How to use teamsApp/validateManifest?

```yml
  - uses: teamsApp/validate
    with:
      # Required. Relative path to the yaml file. Path to Teams app manifest file
      manifestPath: <path-to-manifest-file>
```

### teamsApp/validateAppPackage

#### What is teamsApp/validateAppPackage?

teamsApp/validateAppPackage action validates Teams app package using validation rules.

#### What resource teamsApp/validateAppPackage operates?

N/A

#### How to use teamsApp/validateAppPackage?

```yml
  - uses: teamsApp/validateAppPackage
    with:
      # Required. Relative path to the yaml file. This is the path for built zip file.
      appPackagePath: <path-to-teams-app-package-file>
```

### teamsApp/zipAppPackage

#### What is teamsApp/zipAppPackage?

This action renders Teams app manifest template with environment variables and compresses the manifest file with two icons into a zip file.

#### What resource teamsApp/zipAppPackage operates?

N/A

#### How to use teamsApp/zipAppPackage?

```yml
- uses: teamsApp/zipAppPackage
    with:
      # Required. Relative path to the yaml file. This is the path for Teams app manifest file. Environment variables in manifest will be replaced before apply to AAD app.
      manifestPath: <path-to-manifest-file>
      # Required. Relative path to the yaml file. This is the path for built zip file.
      outputZipPath: <path-to-generated-zip-file>
      # Required. Relative path to the yaml file. This is the path for built manifest json file.
      outputJsonPath: <path-to-generated-json-file>
```

### teamsApp/publishAppPackage

#### What is teamsApp/publishAppPackage?

teamsApp/publishAppPackage action publishes built Teams app zip file to tenant app catalog.

#### What resource teamsApp/publishAppPackage operates on?

teamsApp/publishAppPackage operates in Microsoft 365 tenant app catalog.

#### How to use teamsApp/publishAppPackage?

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

#### What is aadApp/create?

aadApp/create action creates a new Azure Active Directory (Azure AD) application to authenticate users if the environment variable that stores clientId is empty.

#### What resource aadApp/create operates on?

aadApp/create operates in Azure AD in Microsoft 365 tenant.

#### How to use aadApp/create?

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

#### What is aadApp/update?

aadApp/update action updates your Azure AD application based on give Azure AD app manifest. It refers to the ID property in Azure AD app manifest to determine which Azure AD app to update.

#### What resource vaadApp/update operates on?

aadApp/update operates on Azure AD in your Microsoft 365 tenant.

#### How to use aadApp/update?

```yaml
- uses: aadApp/update
    with:
      # Required. Relative path to the yaml file. Path to the AAD app manifest. Environment variables in manifest will be replaced before apply to AAD app.
      manifestPath: <path-to-manifest-file>
      # Required. Relative path to the yaml folder. This action will output the final AAD manifest used to update AAD app to this path.
      outputFilePath : <path-to-output-file>
```

### botAadApp/create

#### What is botAadApp/create?

This action creates a new or reuses an existing Azure AD application for bot.

#### What resource botAadApp/create operates on?

botAadApp/create operates on Azure AD in Microsoft 365 tenant.

#### How to use botAadApp/create?

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

#### What is arm/deploy?

arm/deploy action deploys given ARM templates in parallel.

#### What resource  arm/deploy operates on?

 arm/deploy operates on Azure subscription.

#### How to use arm/deploy?

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

#### What is azureStorage/enableStaticWebsite

azureStorage/enableStaticWebsite action enables static website setting in Azure Storage.

#### What resource azureStorage/enableStaticWebsite operates on?

azureStorage/enableStaticWebsite operates on Azure Storage.

#### How to use azureStorage/enableStaticWebsite?

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

#### What is script?

script action executes a user-defined script.

#### What resource script operates?

N/A

#### How to use script?

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

Teams Toolkit supports referencing the values from environment variables in `teamsapp.yml`, Teams app manifest, Azure AD app manifest, and Azure parameter files. You can use syntax `${{ENV_VARIABLE_NAME}}` to reference environment variables.

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

### Manage your resources

You can sign in to [Azure portal](https://portal.azure.com/) and manage all resources created by Teams Toolkit.

* You can select a resource group from the existing list or the new resource group that you've created.
* You can see the details of the resource group you've selected in the overview section of the table of contents.

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

::: zone-end

## See also

* [Deploy Teams app to the cloud](deploy.md)



