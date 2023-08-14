---
title: Deploy to the cloud using Visual Studio
author: MuyangAmigo
description: Learn how to deploy app to the cloud, Azure, or SharePoint using Teams Toolkit in Visual Studio.
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
zone_pivot_groups: teams-toolkit-platform-vs
---

# Deploy Teams app to the cloud using Visual Studio

Teams Toolkit helps to deploy or upload the front-end and back-end code in your app to your provisioned cloud resources in Azure.

::: zone pivot="visual-studio-v17-7"

You can deploy your Teams app to the following cloud resources:

* Azure App Services
* Azure Functions
* Azure Storage (as static website)
* SharePoint

> [!Note]
>
> Before you deploy your app code to Azure cloud, you need to complete the provisioning of cloud resources.

To deploy Teams app using Teams Toolkit, follow these steps:

1. Open **Visual Studio**.
1. Select **Create a new project** or open an existing project from the recent list.
1. Select **Project** > **Teams Toolkit** > **Deploy to the Cloud**.

      :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-v5/deploy-to-the-cloud-button.png" alt-text="Screenshot shows steps to deploy to the cloud.":::

1. In the pop-up window that appears, select **Deploy**.

      :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-v5/deploy_warning.png" alt-text="Screenshot shows deploy warning window.":::

The app is deployed to Azure cloud.

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

| parameter | description | required | default value |
|---|---|---|---|
| workingDirectory | Represents the folder where you want to run the command. If your input value is a relative path, it's relative to the workingDirectory. | No | Project root |
| args |  command arguments | Yes | NA |

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

| parameter | description | required | default value |
|---|---|---|---|
| workingDirectory | Represents the folder where you want to run the command. If your input value is a relative path, it's relative to the workingDirectory. | No | Project root |
| args |  npm command arguments | Yes | NA |
| execPath | executor path | No | System PATH |

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

| parameter | description | required | default value |
|---|---|---|---|
| workingDirectory | Represents the folder where you want to run the command. If your input value is a relative path, it's relative to the workingDirectory. | No | Project root |
| args |  command arguments | Yes | NA |

### azureAppService/zipDeploy

This action uploads and deploys the project to Azure App Service using [the zip deploy feature](https://aka.ms/zip-deploy-to-azure-functions).

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

| parameter | description | required | default value |
|---|---|---|---|
| workingDirectory | Represents the folder where you want to upload the artifact. If your input value is a relative path, it's relative to the workingDirectory. | No | Project root |
| artifactFolder |  Represents the folder where you want to upload the artifact. If your input value is a relative path, it's relative to the workingDirectory. | Yes | NA |
| ignoreFile | Specifies the file path of the ignore file used during upload. You can utilize this file to exclude certain files or folders from the artifactFolder. Its syntax is similar to the Git's ignore. | No | null |
| resourceId |  Indicates the resource ID of an Azure App Service. It's generated automatically after running the provision command. If you already have an Azure App Service, you can find its resource ID in the Azure portal. For more information, see [how to find resource ID](https://azurelessons.com/how-to-find-resource-id-in-azure-portal/). | Yes | NA |
| dryRun | You can set the dryRun parameter to true if you only want to test the preparation of the upload and don't intend to deploy it. This helps you verify that the packaging zip file is correct. | No | false |
| outputZipFile |  Indicates the path of the zip file for the packaged artifact folder. It's relative to the workingDirectory. During deployment, it reconstructs this file reflects all folders and files in your artifactFolder, and removes any non-existent files or folder. | No | ./.deployment/deployment.zip |

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

| parameter | description | required | default value |
|---|---|---|---|
| workingDirectory | Represents the folder where you want to upload the artifact. If your input value is a relative path, it's relative to the workingDirectory. | No | Project root |
| artifactFolder |  Represents the folder where you want to upload the artifact. If your input value is a relative path, it's relative to the workingDirectory. | Yes | NA |
| ignoreFile | Specifies the file path of the ignore file used during upload. You can utilize this file to exclude certain files or folders from the artifactFolder. Its syntax is similar to the Git's ignore. | No | null |
| resourceId | Indicates the resource ID of an Azure Functions. It's generated automatically after running the provision command. If you already have an Azure Functions, you can find its resource ID in the Azure portal. For more information, see [how to find resource ID](https://azurelessons.com/how-to-find-resource-id-in-azure-portal/). | Yes | NA |
| dryRun | You can set the dryRun parameter to true if you only want to test the preparation of the upload and don't intend to deploy it. This helps you verify that the packaging zip file is correct. | No | false |
| outputZipFile | Indicates the path of the zip file for the packaged artifact folder. It's relative to the workingDirectory. During deployment, it reconstructs this file, reflecting all folders and files in your artifactFolder, and removes any non-existent files or folder. | No | ./.deployment/deployment.zip |

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

| parameter | description | required | default value |
|---|---|---|---|
| workingDirectory | Represents the folder where you want to upload the artifact. If your input value is a relative path, it's relative to the workingDirectory. | No | Project root |
| artifactFolder |  Represents the folder where you want to upload the artifact. If your input value is a relative path, it's relative to the workingDirectory. | Yes | NA |
| ignoreFile | Specifies the file path of the ignore file used during upload. You can utilize this file to exclude certain files or folders from the artifactFolder. Its syntax is similar to the Git's ignore. | No | null |
| resourceId |  Indicates the resource ID of an Azure Storage. It's generated automatically after running the provision command. If you already have an Azure Storage, you can find its resource ID in the Azure portal (see [this link](https://azurelessons.com/how-to-find-resource-id-in-azure-portal/) for more information). | Yes | NA |

### See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals-vs.md)
* [Create and deploy an Azure cloud service](/azure/cloud-services/cloud-services-how-to-create-deploy-portal)
* [Create multi-capability Teams apps](add-capability-v4.md)
* [Add cloud resources to Microsoft Teams app](add-resource-v4.md)
* [Create new Teams app in Visual Studio](~/toolkit/toolkit-v4/create-new-project-vs.md)
* [Provision cloud resources using Visual Studio](provision-vs.md)
* [Edit Teams app manifest using Visual Studio](TeamsFx-preview-and-customize-app-manifest-vs.md)
* [Debug your Teams app locally using Visual Studio](debug-local-vs.md#debug-your-teams-app-locally-using-visual-studio)

::: zone-end

::: zone pivot="visual-studio-v17-6"

## Deploy Teams app to the cloud using Visual Studio

You can deploy the following to the cloud:

* The tab app, such as front-end apps are deployed to Azure Storage, configured for static web hosting.
* The notification bot app with Azure Functions triggers can be deployed to Azure Functions.
* The bot app or message extension is deployed to Azure App Services.

After deploying, you can preview the app in Teams client or the web browser before you start using it.

## Deploy Teams app using Teams Toolkit

1. Open **Visual Studio**.
1. Select **Create a new project** or open an existing project from the list.
1. Right-click on your project **MyTeamsApp4** > **Teams Toolkit** > **Deploy to the cloud...**.

   :::image type="content" source="images/vs-deploy-cloud_1-v4.png" alt-text="deploy to cloud":::

   > [!NOTE]
   > In this scenario the project name is MyTeamsApp4.

1. In the pop-up window that appears, select **Deploy**.

   :::image type="content" source="images/vs-deploy-confirmation-v4.png" alt-text="Deploy to cloud confirmation dialog":::

   After the deploy process completes, you can see a pop-up with the confirmation that it has been successfully deployed. You can also check the status in the output window.

   :::image type="content" source="images/VS-deploy-popup-v4.png" alt-text="deploy to cloud popup":::

### Preview your app

To preview your app, you need to create a **Zip App Package** and sideload into the Teams client.

1. Select **Project** > **Teams Toolkit** > **Zip App Package**.
1. Select **For Local** or **For Azure** to generate Teams app package.

   :::image type="content" source="images/vs-deploy-ZipApp-package1-v4.png" alt-text="deploy to cloud popup.":::

**To preview your app in Teams client**

1. Select **Project** > **Teams Toolkit** > **Preview in Teams**.

   :::image type="content" source="images/vs-deploy-preview-teams2-v4.png" alt-text="Preview Teams app in teams client":::

   Now your app is sideloaded into Teams.

   :::image type="content" source="images/sideload-teams_1-v4.PNG" alt-text="Sideload Teams app in teams client":::

The other way to preview your app:

1. Right-click on your project **MyTeamsApp4** under **Solution Explorer**.
1. Select **Teams Toolkit** > **Preview in Teams** to launch the Teams app in web browser.

   :::image type="content" source="images/vs-deploy-preview-teams2-v4.png" alt-text="Preview teams app in web browser":::

   > [!NOTE]
   > The same menu options are available in Project menu.

   Now your app is sideloaded into Teams.

   :::image type="content" source="images/sideload-teams_1-v4.PNG" alt-text="Sideload Teams app in teams client":::

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals-vs.md)
* [Create and deploy an Azure cloud service](/azure/cloud-services/cloud-services-how-to-create-deploy-portal)
* [Create multi-capability Teams apps](add-capability-v4.md)
* [Add cloud resources to Microsoft Teams app](add-resource-v4.md)
* [Create new Teams app in Visual Studio](~/toolkit/toolkit-v4/create-new-project-vs.md)
* [Provision cloud resources using Visual Studio](provision-vs.md)
* [Edit Teams app manifest using Visual Studio](TeamsFx-preview-and-customize-app-manifest-vs.md)
* [Debug your Teams app locally using Visual Studio](debug-local-vs.md#debug-your-teams-app-locally-using-visual-studio)

::: zone-end
