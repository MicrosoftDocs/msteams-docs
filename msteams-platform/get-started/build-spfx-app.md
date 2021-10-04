---
title: Build your first Teams app with SPFx
author: zhenyasav
description: Learn how to build a custom tab with the SharePoint Framework
ms.author: zhenyasa
ms.date: 05/19/2021
ms.topic: quickstart
ms.localizationpriority: none
---

# Build and run your first Microsoft Teams app with SPFx

After you set up your project workspace with Teams Toolkit, build your tab project. You'll need to sign in to your Microsoft 365 account.

:::image type="content" source="../assets/images/get-started/app-roadmap/roadmap-p3.png" alt-text="Image showing phase 3 of building an app." border="false":::

In this page, you'll learn to:
- [Build and run your first app](#build-and-run-your-app-locally-in-visual-studio-code)

## Sign in to your Microsoft 365 account

Use your Microsoft 365 account to sign in to Teams. If you're using a Microsoft 365 developer program tenant, the admin account you set up while registering is your Microsoft 365 account.

# [Visual Studio Code](#tab/viscode)

1. Open Visual Studio Code.
1. Select the Teams Toolkit  :::image type="icon" source="../assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.png"::: icon in the sidebar.
1. Select **Sign in to M365**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/account-signin.png" alt-text="Screenshot showing where to sign in to Microsoft 365 and Azure." border="false":::

    Your default web browser opens to let you sign in to the account.

1. Sign in to your Microsoft 365 account using your credentials.
1. Close the browser when prompted, and return to Visual Studio Code.
1. Return to Teams Toolkit within Visual Studio Code.

    The **ACCOUNTS** section of the sidebar shows your Microsoft 365 account name.

    Now you're ready to build the app and run it locally!

# [Visual Studio 2019](#tab/vscode)

Visual Studio 2019 prompts you to log into each service as required. You don't need to sign in to your Microsoft 365 and Azure accounts in advance.

# [Command line](#tab/cline)

1. Sign in to Microsoft 365 with the TeamsFx CLI:

    ``` bash
    teamsfx account login m365
    ```

    Your default web browser opens to let you sign in to the account. Sign in to your Azure account using your credentials. Close the browser when you're prompted.

2. Sign in to Azure with the TeamsFx CLI:

    ``` bash
    teamsfx account login azure
    ```

    Your default web browser opens to let you sign in to the account. Sign in to your Azure account using your credentials. Close the browser when you're prompted.

    The account logins are shared between Visual Studio Code and the TeamsFx CLI.

    Now that the development environment is configured, you can create, build, and deploy your first Teams app.

---

## Build and run your app locally in Visual Studio Code

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

| &nbsp; | &nbsp; |
|:--- | ---:|
| **Back** : [2. Create your first Teams SPFx app](first-app-spfx.md) | [4. Deploy your first Teams SPFx app](deploy-spfx-app.md) : **Next**|
|