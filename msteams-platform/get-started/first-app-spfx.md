---
title: Get started - Build your first Teams app with SPFx
author: zhenyasav
description: Learn how to build a custom tab with the SharePoint Framework
ms.author: zhenyasa
ms.date: 05/19/2021
ms.topic: quickstart
ms.localizationpriority: none
---

# Build and run your first Microsoft Teams app with SharePoint Framework (SPFx)

This tutorial walks you through the steps to create, build, and deploy a Teams app using SharePoint Framework SPFx.

## Before you begin

Make sure your development environment is set up by installing the prerequisites.

> [!div class="nextstepaction"]
> [Install prerequisites](prerequisites.md)

## Get organized

Ensure that you have an Administrator account for a SharePoint Site Collection. You'll need this account at deployment for hosting. If you're using a Microsoft 365 developer program tenant, you can use the administrator account you created at the time.


## Create your project

Use the Teams Toolkit to create your first project:

# [Visual Studio Code](#tab/vscode)

1. Open Visual Studio code.
1. Select the Teams icon in the sidebar to open the Teams Toolkit.

    :::image type="content" source="../assets/images/teams-toolkit-v2/sidebar-icon.png" alt-text="The Teams Icon in the Visual Studio Code sidebar.":::

1. Select **Create New Project**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-project.png" alt-text="Location of the Create New Project link in the Teams Toolkit sidebar.":::

1. Select **Create a new Teams app**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-new-project-intro.png" alt-text="Wizard start for Create New Project":::

1. In the **Select capabilities** section, select **Tab** and select **OK**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-project-capabilities.png" alt-text="Screenshot showing how to add capabilities to your new app.":::

1. In the **Frontend hosting type** section, select **SharePoint Framework (SPFx)**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-project-hosting.png" alt-text="Screenshot showing how to select hosting for your new app.":::

1. In the **Framework** section, select **React**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/spfx-which-framework.png" alt-text="Select Framework":::

1. When asked for a **Webpart Name**, press **Enter** to accept the default.

1. When asked for the **Webpart Description**, press **Enter** to accept the default.

1. When asked for the **Programming Language**, press **Enter** to accept the default.

1. Select a workspace folder. The Toolkit creates a folder in the workspace folder for the project.

1. Enter a suitable name for your app, like `helloworld`.  The name of the app must consist only of alphanumeric characters.  Press **Enter** to continue.

   Your Teams app will be created within a few seconds.

# [Command line](#tab/cli)

Use the `teamsfx` CLI to create your first project.  Start from the folder where you want to create the project folder.

``` bash
teamsfx new
```

The CLI walks through some questions to create the project. Every question includes an instruction on answering it, for example, Use arrow keys to select an option. When you've answered the question, select **Enter** to confirm it.

1. Select **Create a new Teams app**.
1. Select **Tab**.
1. Select **SharePoint Framework (SPFx)** frontend hosting.
1. Select **React** framework.
1. Press **Enter** for the **Webpart Name**.
1. Press **Enter** for the **Webpart Description**.
1. Press **Enter** for the **Programming Language**.
1. Press **Enter** to select the default workspace folder.
1. Enter a suitable name for your app, like `helloworld`.  The name of the app must consist only of alphanumeric characters.

   After all the questions have been answered, your project will be created.

---

- [Learn more about developing for SharePoint Framework](/sharepoint/dev/spfx/sharepoint-framework-overview)

## Take a tour of the source code

If you wish to skip this section for now, you can [run your app locally](#run-your-app-locally).

After project creation, you have the components to build a basic personal app. You can view the project directories and files in the Explorer area of Visual Studio Code.

:::image type="content" source="../assets/images/teams-toolkit-v2/app-project-files-spfx.png" alt-text="Screenshot showing app project files for a personal app in Visual Studio Code.":::

The Toolkit automatically creates scaffolding for you in the project directory based on the capabilities you added. The Teams Toolkit maintains its state for your app in the `.fx` directory.  Among other items in this directory:

- The app icons are stored as PNG files in `color.png` and `outline.png`.
- The app manifest for publishing to Developer Portal for Teams is stored in `manifest.source.json`.
- The settings you chose when creating the project are stored in `settings.json`.

Since you selected a SPFx Webpart project, the following files are relevant to your UI:

- The folder `SPFx/src/webparts/{webpart}` contains your SPFx webpart.
- The file `.vscode/launch.json` describes the debugging configurations available in the debug palette.

For more information about SharePoint Webparts for Teams, [see the SharePoint documentation](/sharepoint/dev/spfx/build-for-teams-overview).

## Run your app locally

Teams Toolkit allows you to host your app locally and run it through the [SharePoint Framework Workbench](/sharepoint/dev/spfx/debug-in-vscode).

### Build and run your app locally in Visual Studio Code

To build and run your app locally:

1. From Visual Studio Code, select the **F5** key.

   :::image type="content" source="../assets/images/teams-toolkit-v2/spfx-debug-local.png" alt-text="Screenshot showing how to start an SPFx app in a local workbench.":::

   > [!NOTE]
   > When you run the app for the first time, all dependencies are downloaded and the app is built.  A browser window automatically opens and loads the SharePoint Workbench when the build is complete.  This can take 3-5 minutes to complete.

   After the SharePoint Workbench is loaded:

   >[!NOTE]
   > The Toolkit will prompt you to install a local certificate if needed. This certificate allows Teams to load your application from `https://localhost`. Select yes when the following dialog appears:

   :::image type="content" source="../assets/images/teams-toolkit-v2/ssl-prompt.png" alt-text="Screenshot showing the prompt to install an SSL certificate to enable Teams to load your application from localhost.":::

1. Select **Add Webpart +** icons to add your webpart.

   :::image type="content" source="../assets/images/teams-toolkit-v2/spfx-workbench-addpart.png" alt-text="Screenshot showing the SPFx workbench running with the popup to add a webpart showing.":::

1. Select your webpart from the menu.

   :::image type="content" source="../assets/images/teams-toolkit-v2/spfx-workbench-addpart2.png" alt-text="Screenshot showing the SPFx workbench running with the popup to add a webpart selection.":::

   Your app should now be running.  You can debug the app as any other SPFx webpart (such as setting breakpoints).

   > [!TIP]
   > Try placing breakpoints in the render method of `SPFx/src/webparts/{webpart}/{webpart}.ts` and reloading the browser window. VS Code will stop on breakpoints in your code.

## Deploy your app to SharePoint

Ensure a SharePoint App Catalog exists in your deployment.  If it doesn't exist, [create one](/sharepoint/use-app-catalog).  It may take up to 15 minutes for the app catalog to be created.

# [Visual Studio Code](#tab/vscode)

1. Open Visual Studio Code.
1. Select the Teams Toolkit from the sidebar by selecting the Teams icon.
1. Select **Provision in the Cloud**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/provisioning-commands.png" alt-text="Screenshot showing the provisioning commands":::

   The Toolkit updates the progress in the bottom-right corner. After a few seconds, you'll see the following notice:

   :::image type="content" source="../assets/images/teams-toolkit-v2/provision-complete.png" alt-text="Screenshot showing the provisioning complete dialog.":::

1. After provisioning is complete, select **Deploy to the cloud**.

1. The Toolkit doesn't deploy the app automatically. When you're prompted to build and deploy manually, select **Build SharePoint Package**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/build-sharepoint-package.png" alt-text="Screenshot for the Build Sharepoint Package dialog":::

# [Command line](#tab/cli)

In your terminal window:

1. Run `teamsfx provision`.

   ``` bash
   teamsfx provision
   ```

   If you're prompted to log into your Azure subscription, select a subscription to use the Azure resources.

   > [!NOTE]
   > There are always some Azure resources used for hosting your app.

1. Run `teamsfx deploy`.

   ``` bash
   teamsfx deploy
   ```

1. When prompted, select **Build SharePoint Package**.

---

The SharePoint package is located in `SPFx/sharepoint/solution` within your project.  Upload the package to SharePoint:

1. Log into Microsoft 365 Admin Console, then navigate to the SharePoint App Catalog.

   1. Open `https://admin.microsoft.com/AdminPortal/Home`.
   1. Under **Admin centers**, select the **SharePoint** admin center.
   1. Select **More features** from the sidebar menu.
   1. Press **Open** under **Apps**.
   1. Select **App Catalog**.

1. Select **Distribute apps for SharePoint**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/spfx-distribute-apps.png" alt-text="Distribute apps for SharePoint.":::

1. Select **Upload**.

1. Select **Choose File**.

1. Locate your `{project}.sppkg` file in the `SPFx/sharepoint/solution` folder within your project. Select **Open**.

1. Select **OK**.

1. The SharePoint deployment process will automatically start. Verify that **Make this solution available to all sites in the organization** is selected. Then select **Deploy**.

1. Select the **FILES** tab.

    :::image type="content" source="../assets/images/teams-toolkit-v2/spfx-appcatalog-filestab.png" alt-text="Select the files tab in the SharePoint App Catalog.":::

1. select the package you deployed, then select **Sync to Teams** from the upper right corner.

    > [!Note]
    > The Sync to Teams process can take a couple of minutes.  You will see a message on the right-hand side of the browser indicating that the app has successfully synchronized to Teams.

   Open the Teams application (or sign in at `https://teams.microsoft.com`).  Press the triple-dot on the sidebar, then select **All apps**.  The app will be placed in the **Apps built for your org** category.  You can add the app from there.

   :::image type="content" source="../assets/images/teams-toolkit-v2/spfx-app-in-teams.png" alt-text="Screenshot showing the app within Teams":::

## See also

* [Tutorials Overview](code-samples.md)
* [Create a conversational bot app](first-app-bot.md)
* [Create a messaging extension](first-message-extension.md)
* [Code Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples)
