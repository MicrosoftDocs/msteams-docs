---
title: Get started - Build and run your first app
author: girliemac
description: Quickly create a Microsoft Teams app that displays a "Hello, World!" message using the Microsoft Teams Toolkit.
ms.author: timura
ms.date: 03/22/2021
ms.topic: quickstart
---
# Create your first Microsoft Teams app

This quickstart teaches you to build and run Microsoft Teams app that displays "Hello, World!". 

## Prerequisites

Before you begin, you need to [set up your Teams development tenant](#set-up-your-teams-development-tenant) and [install your Teams development tools](#install-your-development-tools).

### Set up your Teams development tenant

A **tenant** is like a container for an organization. In Teams terms, a tenant is where people from that org chat, share files, and run meetings. As a developer, you need a tenant to sideload and test the apps that you are building. 

# [Do not have a tenant](#tab/do-not-have-a-tenant)

You can get a free Teams test account, which includes a tenant that allows app sideloading, by joining the Microsoft 365 developer program. The registration process takes approximately two minutes.

**To get a tenant**

1. 1. Go to the [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program).
1. Select **Join Now** and follow the onscreen instructions.
1. In the Welcome screen, select **Set up E5 subscription**.
1. Set up your administrator account. 
   After you finish, the following screen appears:

   :::image type="content" source="../assets/images/build-your-first-app/dev-program-subscription.png" alt-text="Example of what you see after signing up for the Microsoft 365 developer program.":::

1. Sign in to Teams with your new account.
1. In the Teams client, select **Apps**.
1. Verify that you can see the **Upload a custom app** option. If you do, this means you can sideload apps.

   :::image type="content" source="../assets/images/build-your-first-app/upload-custom-app-closeup.png" alt-text="Illustration showing where in Teams you can upload a custom app.":::

# [Have a tenant](#tab/have-a-tenant)

If you already have a tenant, verify if you can sideload apps in Teams.

**Verify that you can sideload your apps** 

1. In the Teams Client, select **Apps**. 
1.  Verify that you can see the **Upload a custom app** option. If you do, this means you can sideload apps. 

   :::image type="content" source="../assets/images/build-your-first-app/upload-custom-app-closeup.png" alt-text="Illustration showing where in Teams you can upload a custom app.":::

---

### Install your development tools

To build this app, you'll use the Teams Toolkit for Visual Studio Code to quickly get started. You can also build Teams apps with any ofyour preffered tools. 

> [!NOTE]
> Teams displays app content only through HTTPS connections. To debug certain types of apps locally, such as a bot, you'll learn how to use ngrok to set up a secure tunnel between Teams and your app.
> 
> Production Teams apps are hosted in the cloud.

**To install Microsoft Teams tools**

1. Install [Node.js](https://nodejs.org/en/).
1. If you plan to build a bot or messaging extension, Install [ngrok](https://ngrok.com/download) and [expose your localhost to the Internet using ngrok](../get-started-dotnet-app-studio.md/3tunnel-using-ngrok).
1. Install the latest version of [Visual Studio Code](https://code.visualstudio.com/download). 
   
   > [!NOTE]
   > The toolkit does not support earlier versions of Visual Studio Code.

1. In the left activity bar, select **Extensions** :::image type="icon" source="../assets/icons/vs-code-extensions.png":::.
1. In **Microsoft Teams Toolkit**, select **Install**.

   :::image type="content" source="../assets/images/build-your-first-app/vsc-install-toolkit.png" alt-text="Illustration showing where in Visual Studio Code you can install the Microsoft Teams Toolkit extension.":::

## 1. Create your app project

1. Open Visual Studio Code.
1. Select **Microsoft Teams Toolkit** :::image type="icon" source="../assets/icons/vsc-toolkit.png"::: > **Create a new Teams app**.

   :::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-02.png" alt-text="Screenshot showing how to create your app project with the Visual Studio Code Teams Toolkit.":::
   
1. Sign in with your Microsoft 365 development account. Either the one you just created or the account you already had that allows app sideloading.
1. On the **Select project** screen, go to **Personal app** and select **JS** (JavaScript) > **Next**.

   :::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-03.png" alt-text="Screenshot showing how to configure your app project with the Visual Studio Code Teams Toolkit.":::

1. Enter a name for your Teams app.

    :::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-04.png" alt-text="Screenshot showing how to add a name to your app project with the Visual Studio Code Teams Toolkit.":::

1. Select **Finish**. 
   Your project is now configured. 

## 2. Understand your app project components

After the toolkit configures your app project, you have the components to build your "Hello, World!" Teams app. The project's directories and files are located in the Visual Studio Code Explorer. 

   :::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-05.png" alt-text="Screenshot showing the scaffolding in your app project with the Visual Studio Code Teams Toolkit.":::

The toolkit automatically creates app scaffolding in the `src` directory based on the capabilities you added during setup. 
Since you created a tab during setup, the `App.js` file in the `src/components` directory handles the initialization and routing of your app. The file also calls the Microsoft Teams JavaScript client SDK to establish communication between your app and Teams. 

## 3. Build and run your app

Build and run your app locally to save time. 

**To build and run your app**

1. In Visual Studio Code, select **View** > **Terminal**.
1. Run `npm install`.
1. Run `npm start`.
  
  A **Compiled successfully!** message appears in the terminal. Your app is now running on your localhost at `https://localhost:3000`. 

## 4. Sideload your app in Teams

Sideloading is the process of installing an app in Teams that hasn't been approved by your admin or Microsoft. Sideloading is common when testing and debugging Teams apps.

By default, Teams doesn't allow app sideloading. You can change this setting in the Teams admin center.

**To enable app sideloading in Teams**

1. Sign in to [Microsoft 365 admin center](https://admin.microsoft.com/Adminportal/Home?source=applauncher#/homepage#/) with your admin credentials. 
1. Select **Show All** > **Teams**. 

   ![image of admin center menu](~/assets/images/prepare-test-tenant/admin-center.png)

   > [!Note] 
   > It can take up to 24 hours for the **Teams** option to appear. 

1. Go to **Teams apps** > **Setup policies** > **Global** (Org-wide default).

   ![turn on sideload view](~/assets/images/prepare-test-tenant/turn-on-sideload.png)

1. Turn on the **upload custom apps** toggle.

1. Select **Save** to save the changes.

   Your test tenant now allows custom app sideloading.

   > [!Note]
   > Check for issues before sideloading your app using the validation feature in App Studio, which is included in the toolkit. Fix the errors to successfully sideload the app.


### To sideload your app

1. In Visual Studio Code, Open Teams Toolkit.
1. Go to **App Studio**.  
1. Select **Test and Distribute** > **Install**.

   :::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-appstudio.png" alt-text="Screenshot showing how to sideload your app to Teams client with the Visual Studio Code Teams Toolkit.":::

**Alternatively**

1. Select the **F5** key to open browser window to install. This will skip the installation process in the **App Studio** and lauch Teams in your browser.
1. In the installation dialog, select **Add** to install your app to Teams.

   :::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-install.png" alt-text="Screenshot showing how to sideload your app to Teams client.":::

   > [!Note]
   > App Studio is also available as a stand-alone app for Teams client.

### Troubleshoot App Studio

**Installation failed**

If the following error message appears while installing App Studio: 

* Something went wrong
* Manifest parsing has failed 

Verify that the app information is correctly entered.

**To verify the app information**

* In the Teams Toolkit, go to **App Studio** > **App details** and verify that all the required information is correctly entered.
*  If you manually edited the `manifest.json` file, verify that the JSON is well-defined in the **App Manifest** tool in App Studio.

**Tab content not displayed**

Verify that your app is running. If it isn't, go to the terminal and run `npm start`.

## See also

* [Prepare your Microsoft 365 tenant](https://docs.microsoft.com/microsoftteams/platform/concepts/build-and-test/prepare-your-o365-tenant)
* [Choosing a setup to test and debug your Microsoft Teams app](../concepts/build-and-test/debug.md)
* [Building tabs and other hosted experiences with the Microsoft Teams JavaScript client SDK](../tabs/how-to/using-teams-client-sdk.md)
* [Prepare for AppSource submission](../concepts/deploy-and-publish/appsource/prepare/submission-checklist.md)
* [Quickly develop apps with App Studio for Microsoft Teams](../concepts/build-and-test/app-studio-overview.md)
* [Build a channel tab](../build-your-first-app/build-channel-tab.md)

## Next step

> [!div class="nextstepaction"]
> [Build a personal tab for Microsoft Teams](../build-your-first-app/build-personal-tab.md)