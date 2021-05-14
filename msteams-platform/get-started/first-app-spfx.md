---
title: Get started - Build your first Teams app with SPFx
author: zhenyasav
description: Learn how to build a custom tab with the SharePoint Framework
ms.author: zhenyasa
ms.date: 05/03/2021
ms.topic: quickstart
---

# Build and run your first Microsoft Teams app with SharePoint Framework (SPFx)

In this tutorial, you will create a new Microsoft Teams app in SharePoint Framework (SPFx) that implements a simple tab application.  During the tutorial, you will learn about the structure of a Teams app, how to run the app locally, and how to deploy the app to SharePoint.

## Before you begin

Make sure your development environment is set up by installing the [Prerequisites](prerequisites.md)

> [!div class="nextstepaction"]
> [Install Prerequisites](prerequisites.md)

## Get organized

In addition to the prerequisites, you also need to be an Administrator for a SharePoint Site Collection.  This is where you will deploy your app for hosting.  If you are using an M365 developer program tenant, use the administrator account you set up when you registered for the program.  

## Create your project

Use the Teams Toolkit to create your first project:

# [Visual Studio Code](#tab/vscode)

1. Open Visual Studio code.
1. Open the Teams Toolkit by selecting the Teams icon in the sidebar:

    :::image type="content" source="../assets/images/teams-toolkit-v2/sidebar-icon.png" alt-text="The Teams Icon in the Visual Studio Code sidebar.":::

1. Select **Create New Project**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-project.png" alt-text="Location of the Create New Project link in the Teams Toolkit sidebar.":::

1. Select **Create a new Teams app**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-new-project-intro.png" alt-text="Wizard start for Create New Project":::

1. On the **Select capabilities** step, the **Tab** capability will already be selected.  Press **OK**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-project-capabilities.png" alt-text="Screenshot showing how to add capabilities to your new app.":::

1. On the **Frontend hosting type** step, select **SharePoint Framework (SPFx)**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-project-hosting.png" alt-text="Screenshot showing how to select hosting for your new app.":::

1. On the **Framework** step, select **React**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/spfx-which-framework.png" alt-text="Select Framework":::

1. When asked for a **Webpart Name**, press **Enter** to accept the default.

1. When asked for the **Webpart Description**, press **Enter** to accept the default.

1. When asked for the **Programming Language**, press **Enter** to accept the default.

1. Select a workspace folder.  A folder will be created within your workspace folder for the project you are creating.

1. Enter a suitable name for your app, like `helloworld`.  The name of the app must consist only of alphanumeric characters.  Press **Enter** to continue.

Your Teams app will be created within a few seconds.

# [Command Line](#tab/cli)

Use the `teamsfx` CLI to create your first project.  Start from the folder where you want to create the project folder.

``` bash
teamsfx new
```

The CLI walks through some questions to create the project.  Each question will tell you how to answer it (for example, to use arrow keys to select an option).  When you have answered the question, confirm your choice by pressing **Enter**.

1. Select **Create a new Teams app**.
1. Choose the **Tab** capability.
1. Select **SharePoint Framework (SPFx)** frontend hosting.
1. Select **React** framework.
1. Press **Enter** for the **Webpart Name**.
1. Press **Enter** for the **Webpart Description**.
1. Press **Enter** for the **Programming Language**.
1. Press **Enter** to select the default workspace folder.
1. Enter a suitable name for your app, like `helloworld`.  The name of the app must consist only of alphanumeric characters.

Once all the questions have been answered, your project will be created.

---

- [Learn more about developing for SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)

## Take a tour of the source code

If you wish to skip this section for now, you can [run your app locally](#run-your-app-locally).

Once the Teams Toolkit configures your project, you have the components to build a basic personal tab for Teams that is hosted within the SharePoint Framework.  The project directories and files display in the Explorer area of Visual Studio Code.

:::image type="content" source="../assets/images/teams-toolkit-v2/app-project-files-spfx.png" alt-text="Screenshot showing app project files for a personal tab in Visual Studio Code.":::

The Toolkit automatically creates scaffolding for you in the project directory based on the capabilities you added during setup. The Teams Toolkit maintains its state for your app in the `.fx` directory.  Among other items in this directory:

- The application icons are stored as PNG files in `color.png` and `outline.png`.
- The application manifest for publishing to Teams App Portal is stored in `manifest.source.json`.
- The settings you chose when creating the project are stored in `settings.json`.

Since you selected an SPFx Webpart project, the following files are relevant to your UI:

- The folder `SPFx/src/webparts/<your webpart name>.ts` contains your SPFx webpart.
- The file `.vscode/launch.json` describes the debugging configurations available in the debug palette.

For more information about SharePoint Webparts for Teams, [refer to the SharePoint documentation](https://docs.microsoft.com/sharepoint/dev/spfx/build-for-teams-overview).

## Run your app locally

Teams Toolkit allows you to host your app locally and run it through the [SharePoint Framework Workbench](https://docs.microsoft.com/sharepoint/dev/spfx/debug-in-vscode).

### (Optional) Adjust your browser launch settings

When developing a Teams app, it is common to run your app in an alternate developer tenant or with alternate credentials.  Both Microsoft Edge and Google Chrome provide facilities to adjust the launch settings for your browser.  For example, to update the project to support InPrivate mode (Microsoft Edge), open the `.vscode/launch.json` file in your project.  Look for the appropriate launch settings, and add the following block to each one:

``` json
"runtimeArgs": [ "--inprivate" ]
```

For instance, the launch setting for running locally looks like this:

``` json
{
   "name": "Start and Attach to Frontend (Edge)",
   "type": "pwa-msedge",
   "request": "launch",
   "url": "https://teams.microsoft.com/_#/l/app/${localTeamsAppId}?installAppPackage=true",
   "preLaunchTask": "Start Frontend",
   "postDebugTask": "Stop All Services",
   "presentation": {
         "group": "all",
         "hidden": true
   },
   "runtimeArgs": [ "--inprivate" ]
},
```

Alternatively, you can configure your browser to use the last known profile. [Create a new profile](https://support.microsoft.com/topic/sign-in-and-create-multiple-profiles-in-microsoft-edge-df94e622-2061-49ae-ad1d-6f0e43ce6435) in Microsoft Edge.  Then adjust the settings to use the last known profile for new links:

- In Microsoft Edge, open `edge://settings/profiles/multiProfileSettings`.
- Turn off **Automatic profile switching**.
- For the **Default profile for external links**, select **Last used (default)**.

Ensure your browser is opened to the correct profile before debugging your app.

### Build and run your app locally in Visual Studio Code

To build and run your app locally:

1. From Visual Studio Code, press **F5**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/spfx-debug-local.png" alt-text="Screenshot showing how to start an SPFx app in a local workbench.":::

   > [!NOTE]
   > When you run the app for the first time, all dependencies are downloaded and the app is built.  A browser window automatically opens and loads the SharePoint Workbench when the build is complete.  This can take 3-5 minutes to complete.

   Once the SharePoint Workbench is loaded.

   >[!NOTE]
   > The Toolkit will prompt you to install a local certificate if needed. This certificate allows Teams to load your application from `https://localhost`. Select yes when the following dialog appears:

   :::image type="content" source="../assets/images/teams-toolkit-v2/ssl-prompt.png" alt-text="Screenshot showing how the prompt to install a SSL certificate to enable Teams to load your application from localhost.":::

1. Press one of the **Add Webpart** (+) icons to add your webpart.

   :::image type="content" source="../assets/images/teams-toolkit-v2/spfx-workbench-addpart.png" alt-text="Screenshot showing the SPFx workbench running with the popup to add a webpart showing.":::

1. Choose your webpart from the menu.

   :::image type="content" source="../assets/images/teams-toolkit-v2/spfx-workbench-addpart2.png" alt-text="Screenshot showing the SPFx workbench running with the popup to add a webpart selection.":::

Your app should now be running.  You can do normal debugging activities as if this were any other SPFx webpart (such as setting breakpoints).

> [!TIP]
> Try placing breakpoints in the render method of `SPFx/src/webparts/{yourwebpart}.ts` and reloading the browser window. VS Code will stop on breakpoints in your code.

## Deploy your app to SharePoint

Ensure a SharePoint App Catalog exists in your deployment.  If one does not exist, [create one](https://docs.microsoft.com/sharepoint/use-app-catalog).  It may take up to 15 minutes for the app catalog to be fully created.

# [Visual Studio Code](#tab/vscode)

1. Open Visual Studio Code.
1. Select the Teams Toolkit from the sidebar by selecting the Teams icon.
1. Select **Provision in the Cloud**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/provisioning-commands.png" alt-text="Screenshot showing the provisioning commands":::

1. You can monitor the progress by watching the dialogs in the bottom right corner.  After a few seconds, you will see the following notice:

   :::image type="content" source="../assets/images/teams-toolkit-v2/provision-complete.png" alt-text="Screenshot showing the provisioning complete dialog.":::

1. Once provisioning is complete, select **Deploy to the cloud**.

1. Currently, automated deployment is not available.  A dialog will pop up prompting you to build and deploy manually. Press **Build SharePoint Package**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/build-sharepoint-package.png" alt-text="Screenshot for the Build Sharepoint Package dialog":::

# [Command Line](#tab/cli)

In your terminal window:

1. Run `teamsfx provision`.

   ``` bash
   teamsfx provision
   ```

   You may be prompted to log in to your Azure subscription.  If required, you will be prompted to select an Azure subscription to use for the Azure resources.

   > [!NOTE]
   > There are always some Azure resources used for hosting your app.

1. Run `teamsfx deploy`.

   ``` bash
   teamsfx deploy
   ```

1. When prompted, select **Build SharePoint Package**.

---

The SharePoint package is located in `SPFx/sharepoint/solution` within your project.  Upload the package to SharePoint:

1. Log into the M365 Admin Console, then navigate to the SharePoint App Catalog.

   - Open `https://admin.microsoft.com/AdminPortal/Home`.
   - Under **Admin centers**, select the **SharePoint** admin center.
   - Select **More features** from the sidebar menu.
   - Press **Open** under **Apps**.
   - Select **App Catalog**.

1. Select **Distribute apps for SharePoint**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/spfx-distribute-apps.png" alt-text="Distribute apps for SharePoint.":::

1. Select **Upload**.

1. Press **Choose File**.

1. Locate your `{project}.sppkg` file, located in the `SPFx/sharepoint/solution` folder within your project.  Press **Open**.

1. Press **OK**.

1. The SharePoint deployment process will automatically start.  Ensure **Make this solution available to all sites in the organization** is checked, then press **Deploy**.

1. Select the **FILES** tab.

    :::image type="content" source="../assets/images/teams-toolkit-v2/spfx-appcatalog-filestab.png" alt-text="Select the files tab in the SharePoint App Catalog.":::

1. select the package you deployed, then press **Sync to Teams** in the ribbon.

    > [!Note]
    > The Sync to Teams process can take a couple of minutes.  You will see a message on the right-hand side of the browser indicating that the app has successfully synchronized to Teams.

Open the Teams application (or sign in at `https://teams.microsoft.com`).  Press the triple-dot on the sidebar, then select **All apps**.  The app will be placed in the **Apps built for your org** category.  You can add the app from there.

:::image type="content" source="../assets/images/teams-toolkit-v2/spfx-app-in-teams.png" alt-text="Screenshot showing the app within Teams":::

## Next steps

Learn about other methods for creating tab apps:

- [Create a Teams app with React](first-app-react.md).
- [Create a Teams app with Blazor](first-app-blazor.md).
- [Create a conversational bot app](first-app-bot.md).
- [Create a messaging extension](first-message-extension.md).
