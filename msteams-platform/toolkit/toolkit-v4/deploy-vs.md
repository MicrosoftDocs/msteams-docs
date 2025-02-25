---
title: Deploy to the cloud using Visual Studio
author: MuyangAmigo
description: Learn how to deploy Teams app to cloud resources such as Azure or SharePoint using Teams Toolkit in Visual Studio, and to customize and edit deploy section.
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Deploy Microsoft Teams app to the cloud using Microsoft Visual Studio

Teams Toolkit helps to deploy or upload the front-end and back-end code in your app to your provisioned cloud resources in Azure.

You can deploy your Teams app to the following cloud resources:

* Azure App Services
* Azure Functions
* Azure Storage (as static website)
* SharePoint

> [!Note]
>
> Before you deploy your app code to Azure cloud, you need to complete the provisioning of cloud resources.

To deploy Teams app using Microsoft Teams Toolkit, follow these steps:

1. Open **Visual Studio**.
1. Select **Create a new project** or open an existing project from the list.
1. Select **Project** > **Teams Toolkit** > **Deploy to the Cloud**.

      :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/deploy-to-the-cloud-button.png" alt-text="Screenshot shows steps to deploy to the cloud.":::

1. In the pop-up window that appears, select **Deploy**.

      :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/deploy_warning.png" alt-text="Screenshot shows deploy warning window.":::

The app is deployed to Azure cloud.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Deploy+Microsoft+Teams+app+to+the+cloud+using+Microsoft+Visual+Studio&&author=%40MuyangAmigo&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftoolkit%2Ftoolkit-v4%2Fdeploy-vs&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftoolkit%2Ftoolkit-v4%2Fdeploy-vs.md&documentVersionIndependentId=7e88d36c-df94-5af6-0ea0-183f7d182046&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Customize deploy lifecycle in Teams using Visual Studio

To customize the deployment process, you can edit the following `deploy` sections in the `teamsapp.yml` file:

* [cli/runNpmCommand](#clirunnpmcommand)
* [cli/runDotnetCommand](#clirundotnetcommand)
* [cli/runNpxCommand](#clirunnpxcommand)
* [azureAppService/zipDeploy](#azureappservicezipdeploy)
* [azureFunctions/zipDeploy](#azurefunctionszipdeploy)
* [azureStorage/deploy](#azurestoragedeploy)

### cli/runNpmCommand

This action executes `npm` commands under specified directory with parameters.

#### Sample

```yaml
  - uses: cli/runNpmCommand
    with:
      workingDirectory: ./src
      args: install
```

#### Parameters

| Parameter | Description | Required | Default value |
|---|---|---|---|
| `workingDirectory` | Represents the folder where you want to run the command. If your input value is a relative path, it's relative to the `workingDirectory`. | No | Project root |
| `args` |  command arguments | Yes | NA |

### cli/runDotnetCommand

This action executes `dotnet` commands under specified directory with parameters.

#### Sample

```yaml
  - uses: cli/runDotnetCommand
    with:
      workingDirectory: ./src
      execPath: /YOU_DOTNET_INSTALL_PATH
      args: publish --configuration Release --runtime win-x86 --self-contained
```

#### Parameters

| Parameter | Description | Required | Default value |
|---|---|---|---|
| `workingDirectory` | Represents the folder where you want to run the command. If your input value is a relative path, it's relative to the `workingDirectory`. | No | Project root |
| `args` |  npm command arguments | Yes | NA |
| `execPath` | executor path | No | System PATH |

### cli/runNpxCommand

This action executes `npx` commands under specified directory with parameters. You can use it to run `gulp` commands for bundling and packaging sppkg.

#### Sample

```yaml
  - uses: cli/runNpxCommand
    with:
      workingDirectory: ./src
      args: gulp package-solution --ship --no-color
```

#### Parameters

| Parameter | Description | Required | Default value |
|---|---|---|---|
| `workingDirectory` | Represents the folder where you want to run the command. If your input value is a relative path, it's relative to the `workingDirectory`. | No | Project root |
| `args` |  command arguments | Yes | NA |

### azureAppService/zipDeploy

This action uploads and deploys the project to Azure App Service using [the zip deploy feature](/azure/azure-functions/deployment-zip-push).

#### Sample

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

#### Parameters

| Parameter | Description | Required | Default value |
|---|---|---|---|
| `workingDirectory` | Represents the folder where you want to upload the artifact. If your input value is a relative path, it's relative to the `workingDirectory`. | No | Project root |
| `artifactFolder` |  Represents the folder where you want to upload the artifact. If your input value is a relative path, it's relative to the `workingDirectory`. | Yes | NA |
| `ignoreFile` | Specifies the file path of the ignored file used during upload. You can utilize this file to exclude certain files or folders from the artifactFolder. Its syntax is similar to the Git's ignore. | No | null |
| `resourceId` |  Indicates the resource ID of an Azure App Service. It's generated automatically after running the provision command. If you already have an Azure App Service, you can find its resource ID in the Azure portal. For more information, see [how to find resource ID](https://azurelessons.com/how-to-find-resource-id-in-azure-portal/). | Yes | NA |
| `dryRun` | You can set the dryRun parameter to true if you only want to test the preparation of the upload and don't intend to deploy it. This helps you verify that the packaging zip file is correct. | No | false |
| `outputZipFile` |  Indicates the path of the zip file for the packaged artifact folder. It's relative to the workingDirectory. During deployment, it reconstructs this file reflects all folders and files in your `artifactFolder`, and removes any non-existent files or folder. | No | ./.deployment/deployment.zip |

### azureFunctions/zipDeploy

This action uploads and deploys the project to Azure Functions using. For more information, see [the zip deploy feature](https://aka.ms/zip-deploy-to-azure-functions).

#### Sample

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

#### Parameters

| Parameter | Description | Required | Default value |
|---|---|---|---|
| `workingDirectory` | Represents the folder where you want to upload the artifact. If your input value is a relative path, it's relative to the `workingDirectory`. | No | Project root |
| `artifactFolder` |  Represents the folder where you want to upload the artifact. If your input value is a relative path, it's relative to the `workingDirectory`. | Yes | NA |
| `ignoreFile` | Specifies the file path of the ignored file used during upload. You can utilize this file to exclude certain files or folders from the artifactFolder. Its syntax is similar to the Git's ignore. | No | null |
| `resourceId` | Indicates the resource ID of an Azure Functions. It's generated automatically after running the provision command. If you already have an Azure Functions, you can find its resource ID in the Azure portal. For more information, see [how to find resource ID](https://azurelessons.com/how-to-find-resource-id-in-azure-portal/). | Yes | NA |
| `dryRun` | You can set the dryRun parameter to true if you only want to test the preparation of the upload and don't intend to deploy it. This helps you verify that the packaging zip file is correct. | No | false |
| `outputZipFile` | Indicates the path of the zip file for the packaged artifact folder. It's relative to the workingDirectory. During deployment, it reconstructs this file, reflecting all folders and files in your `artifactFolder`, and removes any non-existent files or folder. | No | ./.deployment/deployment.zip |

### azureStorage/deploy

This action uploads and deploys the project to Azure Storage.

#### Sample

```yaml
  - uses: azureStorage/deploy
    with:
      workingDirectory: ./src
      artifactFolder: .
      ignoreFile: ./.webappignore
      resourceId: ${{BOT_AZURE_APP_SERVICE_RESOURCE_ID}} 
```

#### Parameters

| Parameter | Description | Required | Default value |
|---|---|---|---|
| `workingDirectory` | Represents the folder where you want to upload the artifact. If your input value is a relative path, it's relative to the workingDirectory. | No | Project root |
| `artifactFolder` |  Represents the folder where you want to upload the artifact. If your input value is a relative path, it's relative to the `workingDirectory`. | Yes | NA |
| `ignoreFile` | Specifies the file path of the ignored file used during upload. You can utilize this file to exclude certain files or folders from the `artifactFolder`. Its syntax is similar to the Git's ignore. | No | null |
| `resourceId` |  Indicates the resource ID of an Azure Storage. It's generated automatically after running the provision command. If you already have an Azure Storage, you can find its resource ID in the Azure portal (see [this link](https://azurelessons.com/how-to-find-resource-id-in-azure-portal/) for more information). | Yes | NA |

### See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals-vs.md)
* [Create and deploy an Azure cloud service](/azure/cloud-services/cloud-services-how-to-create-deploy-portal)
* [Create new Teams app in Visual Studio](~/toolkit/toolkit-v4/create-new-project-vs.md)
* [Provision cloud resources using Visual Studio](provision-vs.md)
* [Edit Teams app manifest using Visual Studio](TeamsFx-preview-and-customize-app-manifest-vs.md)
* [Debug your Teams app locally using Visual Studio][Deploy Microsoft Teams app to the cloud using Microsoft Visual Studio](deploy-vs.md)
