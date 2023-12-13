---
title: Use Teams Toolkit to provision cloud resources in Visual Studio
author: MuyangAmigo
description: Learn how to do provision cloud resources using Teams Toolkit v4 in Visual Studio Code and Visual Studio, resource creation and customize resource provision.
ms.author: shenwe
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
zone_pivot_groups: teams-toolkit-platform-vs
---

# Provision cloud resources in Visual Studio

TeamsFx integrates with Azure and the Microsoft 365 cloud, which allows to place your app in Azure with a single command. TeamsFx integrates with Azure Resource Manager (ARM), which enables to provision Azure resources that your application needs for code approach.

::: zone pivot="visual-studio-v17-7"

## Sign in to your Azure account

1. Open **Visual Studio**.
1. Open the **Microsoft Teams App project**.
1. Select **Project** > **Teams Toolkit** > **Provision in the Cloud**.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/teams-toolkit-vs-provision-in-cloud.png" alt-text="Screenshot shows sign in to Azure account.":::

1. Select **Sign in...**.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/teams-toolkit-vs-provision-start.png" alt-text="Screenshot shows the sign in to Azure account.":::

   > [!NOTE]
   > If you're already signed in, your username is displayed, or you've an option to **Add an account**.

   After you've signed in to your Azure account using your credentials, the browser closes automatically.

### Provision cloud resources

After you open your project in Visual Studio, to provision cloud resources follow these steps:

1. Select **Project** > **Teams Toolkit** > **Provision in the Cloud...**.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/teams-toolkit-vs-provision-in-cloud.png" alt-text="Screenshot shows how to provision in cloud.":::

   The **Provision** window appears.

1. Enter the following details to provision your resources:

   1. Select your **Subscription name** from the dropdown menu.
   1. Select your **Resource group** from the dropdown menu or you can create new **Resource group** by selecting **New...**.
   1. Select your **Region** from the dropdown menu.
   1. Select **Provision**.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/teams-toolkit-vs-provision-select-subscription.png" alt-text="Screenshot shows the selection of resource group." lightbox="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/teams-toolkit-vs-provision-select-subscription.png":::

1. In the pop-up window that appears, select **Provision**.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/teams-toolkit-vs-provision-warning.png" alt-text="Screenshot shows the provision warning.":::

   The provisioning process creates resources in the Azure cloud. You can monitor the progress by observing the Teams Toolkit output window.

1. In the pop-up window that appears, to view all the resources that are provisioned, select **View provisioned resources**.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/teams-toolkit-vs-provision-provision-success-info.png" alt-text="Screenshot shows the provisioned resources.":::

## Provision actions

The following actions are designed for provision:

* [teamsApp/create](#teamsappcreate)
* [teamsApp/update](#teamsappupdate)
* [teamsApp/validateManifest](#teamsappvalidatemanifest)
* [teamsApp/validateAppPackage](#teamsappvalidateapppackage)
* [teamsApp/zipAppPackage](#teamsappzipapppackage)
* [teamsApp/publishAppPackage](#teamsapppublishapppackage)
* [aadApp/create](#aadappcreate)
* [aadApp/update](#aadappupdate)
* [botAadApp/create](#botaadappcreate)
* [arm/deploy](#armdeploy)
* [azureStorage/enableStaticWebsite](#azurestorageenablestaticwebsite)
* [script](#script)

### teamsApp/create

If the environment variable that stores Teams app ID is empty or the app ID isn't found from Teams Developer Portal, then the `teamsApp/create` action creates a new Teams app. It operates on Teams app in Teams Developer Portal.

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

When you apply the Teams app manifest to an existing Teams app in Teams Developer Portal. `teamsApp/update` action uses the app ID in manifest.json file to determine which Teams app to update. It operates on Teams app in Teams Developer Portal.

```yml
- uses: teamsApp/update
    with:
      # Required. Relative path to the yaml file. This is the path for built zip file.
      appPackagePath: <path-to-teams-app-package-file>
```

### teamsApp/validateManifest

The `teamsApp/validateManifest` action renders Teams app manifest template with environment variables and validates Teams app manifest file using its schema.

```yml
- uses: teamsApp/validateManifest
    with:
      # Required. Relative path to the yaml file. Path to Teams app manifest file
    manifestPath: <path-to-manifest-file>
```

### teamsApp/validateAppPackage

The `teamsApp/validateAppPackage` action validates Teams app package using validation rules.

```yml
  - uses: teamsApp/validateAppPackage
      with:
      # Required. Relative path to the yaml file. This is the path for built zip file.
    appPackagePath: <path-to-teams-app-package-file>
```

### teamsApp/zipAppPackage

The `teamsApp/zipAppPackage` action renders Teams app manifest template with environment variables and compresses the manifest file with two icons into a zip file.

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

The `teamsApp/publishAppPackage` action publishes built Teams app zip file to tenant app catalog. It operates in Microsoft 365 tenant app catalog.

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

The `aadApp/create` action creates a new Microsoft Entra application to authenticate users if the environment variable that stores the `clientId` is empty. It operates in Microsoft Entra ID in Microsoft 365 tenant.

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

`aadApp/update` action updates your Microsoft Entra application based on Microsoft Entra app manifest. It refers to the ID property in Microsoft Entra app manifest to determine which Microsoft Entra app to update. aadApp/update operates on Microsoft Entra ID in your Microsoft 365 tenant.

```yaml
- uses: aadApp/update
    with:
      # Required. Relative path to the yaml file. Path to the AAD app manifest. Environment variables in manifest will be replaced before apply to AAD app.
      manifestPath: <path-to-manifest-file>
      # Required. Relative path to the yaml folder. This action will output the final AAD manifest used to update AAD app to this path.
      outputFilePath : <path-to-output-file>
```

### botAadApp/create

The `botAadApp/create` action creates a new or reuses an existing Microsoft Entra application for bot. It operates on Microsoft Entra ID in the Microsoft 365 tenant.

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

The `arm/deploy` action deploys given ARM templates in parallel. It operates on Azure subscription.

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

The `azureStorage/enableStaticWebsite` action enables static website setting in Azure Storage. It operates on Azure Storage.

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

The `script` action executes a user-defined script.

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

The provision steps are defined in the `teamsapp.yml` file, under the `provision` property. You can add, remove, or update actions to the `provision` property to define the expected actions you want to do during provision.

#### Reference environment variables in parameter files

Teams Toolkit supports referencing the values from environment variables in the `teamsapp.yml` file, Teams app manifest, Microsoft Entra app manifest, and Azure parameter files. You can use the syntax `${{ENV_VARIABLE_NAME}}` to reference environment variables.

The following example sets the value of environment variable `MY_AZURE_SUBSCRIPTION_ID` to `subscriptionId`:

```yml
subscriptionId: ${{MY_AZURE_SUBSCRIPTION_ID}}
```

#### Customize ARM template files

If the predefined templates don't meet your app requirements, you can create your own ARM template or update existing ARM template and provide the path to `arm/deploy` action as follows:

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
  
The `arm/deploy` action support ARM templates that are written in bicep and json format. If you use json format, you can omit the `bicepCliVersion` parameter. You need to have basic knowledge of Azure Resource Manager. For more information, see [Azure Resource Manager documentation](/azure/azure-resource-manager/).

### Manage your resources

You can sign in to [Azure portal](https://portal.azure.com/) and manage all resources created using Teams Toolkit.

* You can select a resource group from the existing list or the new resource group that you've created.
* You can see the details of the resource group you've selected in the overview section of the table of contents.

### Customize Teams apps

You can customize your bot or the Teams app by adding environment variables to use a Microsoft Entra app that you've created. You can customize the Teams app in the following ways:

* [Use an existing Microsoft Entra app for your Teams app](#use-an-existing-azure-ad-app-for-your-teams-app)
* [Use an existing Microsoft Entra app for your bot](#use-an-existing-azure-ad-app-for-your-bot)

<a name='use-an-existing-azure-ad-app-for-your-teams-app'></a>

#### Use an existing Microsoft Entra app for your Teams app

To use a Microsoft Entra app created for your Teams app and to add environment variables to the .env files, follow these steps.

1. Open the `teamsapp.yml` file and find the `aadApp/create` action.

1. Find the environment variable names that store information for Microsoft Entra app in the `writeToEnvironmentFile` property. If you create projects using Teams Toolkit the default  `writeToenvironmentFile` property definition is as follows:

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

    1. Add the following environment variables and their values to `env\.env.{env}` file. For example:

       ```env
        AAD_APP_CLIENT_ID=<value of Azure AD application's client id (application id)> # example: 00000000-0000-0000-0000-000000000000
        AAD_APP_OBJECT_ID=<value of Azure AD application's object id> # example: 00000000-0000-0000-0000-000000000000
        AAD_APP_TENANT_ID=<value of Azure AD's Directory (tenant) id>> # example: 00000000-0000-0000-0000-000000000000
        AAD_APP_OAUTH_AUTHORITY=<value of Azure AD's authority> # example: https://login.microsoftonline.com/<Directory (tenant) ID>
        AAD_APP_OAUTH_AUTHORITY_HOST=<host of Azure AD's authority> # example: https://login.microsoftonline.com
        AAD_APP_ACCESS_AS_USER_PERMISSION_ID=<id of access_as_user permission> # example: 00000000-0000-0000-0000-000000000000
       ```  

    1. If your application requires a Microsoft Entra app client secret, add the following environment variable and its value to `env\.env.{env}.user` file. For example:

       ```env
       SECRET_AAD_APP_CLIENT_SECRET=<value of Azure AD application's client secret>
       ```

If you don't have a Microsoft Entra app yet or you've one but don't know where to find the correct value, see [Use existing Microsoft Entra app in TeamsFx project](../use-existing-aad-app.md).

>[!NOTE]
>
> * Remember to update the environment variable names in the examples if you use different names in `writeToEnvironmentFile`.
> * If you don't use `aadApp/create` action to create Microsoft Entra application, you can add necessary environment variables with your preferred name without following above steps.
> * Ensure you do not share the same Microsoft Entra app in multiple environments.

<a name='use-an-existing-azure-ad-app-for-your-bot'></a>

#### Use an existing Microsoft Entra app for your bot

You can follow the steps to add environment variables to the .env files to use a Microsoft Entra app created for your Teams app.

1. Open the `teamsapp.yml` file and find the `botAadApp/create` action.

1. Find the environment variable names that store information for Microsoft Entra app in the `writeToEnvironmentFile` property. The default `writeToEnvironmentFile` definition if you create projects using Teams Toolkit is as follows:

    ```yml
     writeToEnvironmentFile:
       botId: BOT_ID
       botPassword: SECRET_BOT_PASSWORD
    ```

1. Add values for each environment variable from step 2.

    1. Add the environment variable and its value to `env\.env.{env}` file. For example:

       ```env
       BOT_ID=<value of Azure AD application's client id (application id)> # example: 00000000-0000-0000-0000-000000000000    
       ```

    1. Add the environment variable and its value to `env\.env.{env}.user` file. For example:

       ```env
       SECRET_BOT_PASSWORD=<value of Azure AD application's client secret>
       ```

If you don't have a Microsoft Entra app for your bot yet or you've one but don't know where to find the correct values, see [Use existing Microsoft Entra app in TeamsFx project](../use-existing-aad-app.md).

> [!NOTE]
>
> * Remember to update the environment variable names in the examples if you use different names in `writeToEnvironmentFile`.
> * If you don't use `botAadApp/create` action to create Microsoft Entra application, you can add necessary environment variables with your preferred name without following above steps.
> * Ensure that you do not share the same Microsoft Entra app in multiple environments.

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals-vs.md)
* [Deploy Teams app to the cloud](deploy-vs.md)
* [Manage multiple environments](TeamsFx-multi-env-v4.md)
* [Collaborate with other developers on Teams project](TeamsFx-collaboration-v4.md)
* [Edit Teams app manifest using Visual Studio](TeamsFx-preview-and-customize-app-manifest-vs.md)

::: zone-end

::: zone pivot="visual-studio-v17-6"

> [!NOTE]
> Teams toolkit doesn't provide support to deploy resources to other cloud platforms except Azure, however, the user can deploy manually.

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

* Microsoft Entra app under your Microsoft 365 tenant.
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

<a name='azure-ad-app-related-parameters'></a>

### Microsoft Entra app related parameters

| Parameter name | Default value placeholder | Meaning of the placeholder | How to customize |
| --- | --- | --- | --- |
| Microsoft 365 ClientId | {{state.fx-resource-aad-app-for-teams.clientId}} | Your app's Microsoft Entra app client Id created during provision. | [Use an existing Microsoft Entra app for your Teams app](#use-an-existing-azure-ad-app-for-your-teams-app-1). |
| Microsoft 365 ClientSecret | {{state.fx-resource-aad-app-for-teams.clientSecret}} | Your app's Microsoft Entra app client secret is created during provision. | [Use an existing Microsoft Entra app for your Teams app](#use-an-existing-azure-ad-app-for-your-teams-app-1).  |
| Microsoft 365 TenantId | {{state.fx-resource-aad-app-for-teams.tenantId}} | Tenant Id of your app's Microsoft Entra app. | [Use an existing Microsoft Entra app for your Teams app](#use-an-existing-azure-ad-app-for-your-teams-app-1).  |
| Microsoft 365 OAuthAuthorityHost | {{state.fx-resource-aad-app-for-teams.oauthHost}} | OAuth authority host of your app's Microsoft Entra app. | [Use an existing Microsoft Entra app for your Teams app](#use-an-existing-azure-ad-app-for-your-teams-app-1). |
| botAadAppClientId | {{state.fx-resource-bot.botId}} | Bot's Microsoft Entra app client Id is created during provision. | [Use an existing Microsoft Entra app for your bot](#use-an-existing-azure-ad-app-for-your-bot-1).|
| botAadAppClientSecret | {{state.fx-resource-bot.botPassword}} | Bot's Microsoft Entra app client secret is created during provision. | [Use an existing Microsoft Entra app for your bot](#use-an-existing-azure-ad-app-for-your-bot-1). |

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

You can customize your bot or the Teams app by adding configuration snippets to use a Microsoft Entra app created for your Teams app.
Perform in the following ways to customize the Teams app:

* [Use an existing Microsoft Entra app for your Teams app](#use-an-existing-azure-ad-app-for-your-teams-app-1)
* [Use an existing Microsoft Entra app for your bot](#use-an-existing-azure-ad-app-for-your-bot-1)

<a name='use-an-existing-azure-ad-app-for-your-teams-app-1'></a>

#### Use an existing Microsoft Entra app for your Teams app

You can add the following configuration snippet to `.fx\configs\config.{env}.json` file to use a Microsoft Entra app created for your Teams app. If you don't have a Microsoft Entra app yet or you already have one but don't know where to find the correct value, see [how to use existing Microsoft Entra app in TeamsFx project](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/fx-core/using-existing-aad.md):

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
> Ensure that not to share the same Microsoft Entra app in multiple environments. If you don't have permission to update the Microsoft Entra app, you get a warning with instructions to manually update the Microsoft Entra app. Follow these instructions to update your Microsoft Entra app after provision.

<a name='use-an-existing-azure-ad-app-for-your-bot-1'></a>

#### Use an existing Microsoft Entra app for your bot

You can add the following configuration snippet to `.fx\configs\config.{env}.json` file to use the Microsoft Entra app created for your bot:

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

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals-vs.md)
* [Deploy Teams app to the cloud](deploy-vs.md)
* [Manage multiple environments](TeamsFx-multi-env-v4.md)
* [Collaborate with other developers on Teams project](TeamsFx-collaboration-v4.md)
* [Edit Teams app manifest using Visual Studio](TeamsFx-preview-and-customize-app-manifest-vs.md)

::: zone-end
