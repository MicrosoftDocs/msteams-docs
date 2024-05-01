---
title: Deploy to the cloud
author: MuyangAmigo
description: Learn how to deploy app to the cloud, Azure, or SharePoint using Teams Toolkit in Visual Studio Code.
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Deploy Microsoft Teams app to the cloud using Microsoft Visual Studio Code

Microsoft Teams Toolkit helps to deploy or upload the front-end and back-end code in your app to your provisioned cloud resources in Azure.

You can deploy to the following types of cloud resources:

* Azure App Services
* Azure Functions
* Azure Storage (as static website)
* SharePoint

> [!NOTE]
> Before you deploy app code to Azure cloud, you need to successfully complete the [provisioning of cloud resources](provision.md).

## Deploy Teams apps using Teams Toolkit

The Get started guide helps to deploy using Teams Toolkit. You can use the following to deploy your Teams app:

### Sign in to your Azure account

Use this account to access the Microsoft Azure portal and to provision new cloud resources to support your app. Before deploying your app to Azure App Service, Azure Functions, or Azure Storage, you must sign in to your Azure account.

1. Open Visual Studio Code.
1. Open the project folder in which you created app.
1. Select the Teams Toolkit icon in the sidebar.
1. Select **Sign in to Azure**.

    > [!TIP]
    > If you have the Azure Account extension installed and are using the same account, you can skip this step. Use the same account as you're using in other extensions.

    Your default web browser opens to let you sign in to the account.

1. Sign in to your Azure account using your credentials.
1. Close the browser when prompted and return to Visual Studio Code.

The ACCOUNTS section of the sidebar shows the two accounts separately. It also lists the number of usable Azure subscriptions available to you. Ensure you have at least one usable Azure subscription available. If not, sign out and use a different account.

Now you're ready to deploy your app to Azure!

Congratulations, you've created a Teams app! Now let's go ahead and learn how to deploy one of the apps to Azure using the Teams Toolkit.

## Deploy to Azure

1. Select **Deploy** from the **LIFECYCLE** section in the left pane.

   :::image type="content" source="../assets/images/teams-toolkit-v2/deploy_to_the_cloud_button.png" alt-text="Screenshot showing the selection of Deploy.":::

1. Select an environment. (If there's only one environment, this step is skipped.)
1. Select **Deploy**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/click_deploy.png" alt-text="Screenshot showing the selection of Deploy under Visual Studio Code.":::

1. Select the Teams Toolkit icon in the sidebar.

### Customize deploy lifecycle in Teams

To customize the deployment process, you can edit the deploy sections in 'teamsapp.yml'.

#### cli/runNpmCommand

This action executes npm commands under specified directory with parameters.

**Sample**

```yaml
  - uses: cli/runNpmCommand
    with:
      workingDirectory: ./src
      args: install
```

**Parameters**

| Parameter        | Description                                                                                                                             | Required | Default value |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------- |
| workingDirectory | Represents the folder where you want to run the command. If your input value is a relative path, it's relative to the workingDirectory. | No       | Project root  |
| args             | Command arguments                                                                                                                       | Yes      |               |

#### cli/runDotnetCommand

This action executes dotnet commands under specified directory with parameters.

**Sample**

```yaml
  - uses: cli/runDotnetCommand
    with:
      workingDirectory: ./src
      execPath: /YOU_DOTNET_INSTALL_PATH
      args: publish --configuration Release --runtime win-x86 --self-contained
```

**Parameters**

| Parameter        | Description                                                                                                                             | Required | Default value |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------- |
| workingDirectory | Represents the folder where you want to run the command. If your input value is a relative path, it's relative to the workingDirectory. | No       | Project root  |
| args             | npm Command arguments                                                                                                                   | Yes      |               |
| execPath         | Executor path                                                                                                                           | No       | System PATH   |

#### cli/runNpxCommand

**Sample**

```yaml
  - uses: cli/runNpxCommand
    with:
      workingDirectory: ./src
      args: gulp package-solution --ship --no-color
```

**Parameters**

| Parameter        | Description                                                                                                                             | Required | Default value |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------- |
| workingDirectory | Represents the folder where you want to run the command. If your input value is a relative path, it's relative to the workingDirectory. | No       | Project root  |
| args             | Command arguments                                                                                                                       | Yes      |               |

#### azureAppService/zipDeploy

**Sample**

```yaml
  - uses: azureAppService/zipDeploy
    with:
      workingDirectory: ./src
      artifactFolder: .
      ignoreFile: ./.webappignore
      resourceId: ${{BOT_AZURE_APP_SERVICE_RESOURCE_ID}}
      dryRun: false
      outputZipFile: ./.deployment/deployment.zip
```

**Parameters**

| Parameter        | Description                                                                                                                                                                                                                                                       | Required | Default value                |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ---------------------------- |
| workingDirectory | Represents the folder where you want to upload the artifact. If your input value is a relative path, it's relative to the project root.                                                                                                                           | No       | Project root                 |
| artifactFolder   | Represents the folder where you want to upload the artifact. If your input value is a relative path, it's relative to the workingDirectory.                                                                                                                       | Yes      |                              |
| ignoreFile       | Specifies the file path of ignoreFile used during upload. This file can be utilized to exclude certain files or folders from the artifactFolder. Its syntax is similar to the Git's ignore.                                                                       | No       | null                         |
| resourceId       | Indicates the resource ID of an Azure App Service. It's generated automatically after running the provision command. If you already have an Azure App Service, you can find its [resource ID](https://azurelessons.com/how-to-find-resource-id-in-azure-portal/)  | Yes      |                              |
| dryRun           | You can set the dryRun parameter to true if you only want to test the preparation of the upload and don't intend to deploy it. This helps you verify that the packaging zip file is correct.                                                                      | No       | false                        |
| outputZipFile    | Indicates the path of the zip file for the packaged artifact folder. It's relative to the workingDirectory. This file is reconstructed during deployment, reflecting all folders and files in your artifactFolder, and removing any nonexistent files or folders. | No       | ./.deployment/deployment.zip |

#### azureFunctions/zipDeploy

This action upload and deploy the project to Azure Functions using the [zip deploy feature](/azure/azure-functions/deployment-zip-push).

**Sample**

```yaml
  - uses: azureFunctions/zipDeploy
    with:
      workingDirectory: ./src
      artifactFolder: .
      ignoreFile: ./.webappignore
      resourceId: ${{BOT_AZURE_APP_SERVICE_RESOURCE_ID}}
      dryRun: false
      outputZipFile: ./.deployment/deployment.zip
```

**Parameters**

| Parameter        | Description                                                                                                                                                                                                                                                                       | Required | Default value                |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ---------------------------- |
| workingDirectory | Represents the folder where you want to upload the artifact. If your input value is a relative path, it's relative to the project root.                                                                                                                                           | No       | Project root                 |
| artifactFolder   | Represents the folder where you want to upload the artifact. If your input value is a relative path, it's relative to the workingDirectory.                                                                                                                                       | Yes      |                              |
| ignoreFile       | Specifies the file path of ignoreFile used during upload. This file can be utilized to exclude certain files or folders from the artifactFolder. Its syntax is similar to the Git's ignore.                                                                                       | No       | null                         |
| resourceId       | Indicates the resource ID of an Azure Functions. It's generated automatically after running the provision command. If you already have an Azure Functions, you can find its [resource ID](https://azurelessons.com/how-to-find-resource-id-in-azure-portal/) in the Azure portal. | Yes      |                              |
| dryRun           | You can set the dryRun parameter to true if you only want to test the preparation of the upload and don't intend to deploy it. This helps you verify that the packaging zip file is correct.                                                                                      | No       | false                        |
| outputZipFile    | Indicates the path of the zip file for the packaged artifact folder. It's relative to the workingDirectory. This file is reconstructed during deployment, reflecting all folders and files in your artifactFolder, and removing any nonexistent files or folders.                 | No       | ./.deployment/deployment.zip |

#### azureStorage/deploy

This action uploads and deploys the project to Azure Storage.

**Sample**

```yaml
  - uses: azureStorage/deploy
    with:
      workingDirectory: ./src
      artifactFolder: .
      ignoreFile: ./.webappignore
      resourceId: ${{BOT_AZURE_APP_SERVICE_RESOURCE_ID}} 
```

**Parameters**

| Parameter        | Description                                                                                                                                                                                                                                                                       | Required | Default value |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------- |
| workingDirectory | Represents the folder where you want to upload the artifact. If your input value is a relative path, it's relative to the project root.                                                                                                                                           | No       | Project root  |
| artifactFolder   | Represents the folder where you want to upload the artifact. If your input value is a relative path, it's relative to the workingDirectory.                                                                                                                                       | Yes      |               |
| ignoreFile       | Specifies the file path of ignoreFile used during upload. This file can be utilized to exclude certain files or folders from the artifactFolder. Its syntax is similar to the Git's ignore.                                                                                       | No       | null          |
| resourceId       | Indicates the resource ID of an Azure Functions. It's generated automatically after running the provision command. If you already have an Azure Functions, you can find its [resource ID](https://azurelessons.com/how-to-find-resource-id-in-azure-portal/) in the Azure portal. | Yes      |               |

#### azureStorage/deploy

This action uploads and deploys the project to Azure Storage.

**Sample**

```yaml
  - uses: azureStorage/deploy
    with:
      workingDirectory: ./src
      artifactFolder: .
      ignoreFile: ./.webappignore
      resourceId: ${{BOT_AZURE_APP_SERVICE_RESOURCE_ID}} 
```

**Parameters**

| Parameter        | Description                                                                                                                                                                                                                                                                       | Required | Default value |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------- |
| workingDirectory | Represents the folder where you want to upload the artifact. If your input value is a relative path, it's relative to the project root.                                                                                                                                           | No       | Project root  |
| artifactFolder   | Represents the folder where you want to upload the artifact. If your input value is a relative path, it's relative to the workingDirectory.                                                                                                                                       | Yes      |               |
| ignoreFile       | Specifies the file path of ignoreFile used during upload. This file can be utilized to exclude certain files or folders from the artifactFolder. Its syntax is similar to the Git's ignore.                                                                                       | No       | null          |
| resourceId       | Indicates the resource ID of an Azure Functions. It's generated automatically after running the provision command. If you already have an Azure Functions, you can find its [resource ID](https://azurelessons.com/how-to-find-resource-id-in-azure-portal/) in the Azure portal. | Yes      |               |

#### spfx/deploy

This action upload and deploys generated sppkg to SharePoint app catalog. You can create tenant app catalog manually or by setting createAppCatalogIfNotExist to true if you don't have one in current M365 tenant.

**Sample**

```yaml
- uses: spfx/deploy
    with:
      createAppCatalogIfNotExist: false
      packageSolutionPath: ./src/config/package-solution.json
```

**Parameters**

| Parameter                  | Description                                                                                              | Required | Default value |
| -------------------------- | -------------------------------------------------------------------------------------------------------- | -------- | ------------- |
| createAppCatalogIfNotExist | If the value is true, this action creates tenant app catalog first if not exist.                         | No       | False         |
| packageSolutionPath        | Path to package-solution.json in SPFx project. This action honors the configuration to get target sppkg. | Yes      |               |

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals.md)
* [Create and deploy an Azure cloud service](/azure/cloud-services/cloud-services-how-to-create-deploy-portal)
* [Add How-to guides to Teams app](add-How-to-guides-v5.md)
* [Add cloud resources to Teams app](add-resource.md)
* [Provision cloud resources](provision.md)
* [Edit app manifest](TeamsFx-preview-and-customize-app-manifest.md)
