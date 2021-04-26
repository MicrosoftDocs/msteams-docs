---
title: Get started - Build and run your first app
author: girliemac
description: Quickly create a Microsoft Teams app that displays a "Hello, World!" message using the Microsoft Teams Toolkit.
ms.author: timura
ms.date: 03/22/2021
ms.topic: quickstart
---
# Create your first Microsoft Teams "Hello, World" app

This quickstart teaches you to build and run Microsoft Teams app that displays "Hello, World!". 

## Prerequisites

Ensure that you have [set up your Teams development tenant](#set-up-your-teams-development-tenant) and have [installed your Teams development tools](#install-your-development-tools).

### Set up your Teams development tenant

A **tenant** is like a space, or a container for your organization in Teams, where you chat, share files, and run meetings. This is also where you can sideload and test your apps. 

# [Do not have a tenant](#tab/do-not-have-a-tenant)

Join the Microsoft 365 developer program and get a tenant (free Teams test account) that allows app sideloading. The registration process takes approximately two minutes.

**To register for a tenant**

1. Go to [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program).
1. Select **Join Now** and follow the onscreen instructions.
1. In the Welcome screen, select **Set up E5 subscription**.
1. Set up your administrator account. 
   After you finish, the following screen appears:

   :::image type="content" source="../assets/images/build-your-first-app/dev-program-subscription.png" alt-text="Example of what you see after signing up for the Microsoft 365 developer program.":::

1. Sign in to Teams using your administrator account.
1. In the Teams client, select **Apps**.
1. Verify that **Upload a custom app** appears.

   :::image type="content" source="../assets/images/build-your-first-app/upload-custom-app-closeup.png" alt-text="Illustration showing where in Teams you can upload a custom app.":::

# [Have a tenant and admin access](#tab/have-a-tenant)

If you already have a tenant with admin access to the Teams client, verify if you can sideload your apps.

**Verify that you can sideload your apps** 

1. In the Teams Client, select **Apps**. 
1. Verify that **Upload a custom app** appears. 

   :::image type="content" source="../assets/images/build-your-first-app/upload-custom-app-closeup.png" alt-text="Illustration showing where in Teams you can upload a custom app.":::
    
---
### Install your development tools

To help you get started quickly, Microsoft provides development tools such as Microsoft Teams Toolkit for Visual Studio Code. However, you can build Teams apps with your preffered tools as well. 

> [!NOTE]
> Teams displays app content only through HTTPS connections. To debug certain types of apps locally, such as a bot, you'll learn how to use ngrok to set up a secure tunnel between Teams and your app.
> 
> Production Teams apps are hosted in the cloud.

**To install Microsoft Teams Toolkit**

1. Install [Node.js](https://nodejs.org/en/).
1. Install [ngrok](https://ngrok.com/download) if you plan to build a bot or messaging extension and [create a tunnel using ngrok](../../tutorials/get-started-dotnet-app-studio.md/#tunnel-using-ngrok).
1. Install the latest version of [Visual Studio Code](https://code.visualstudio.com/download). 
   
   > [!NOTE]
   > The toolkit does not support the earlier versions of Visual Studio Code.

1. In the left activity bar, select **Extensions** :::image type="icon" source="../assets/icons/vs-code-extensions.png":::.
1. In **Microsoft Teams Toolkit**, select **Install**.

   :::image type="content" source="../assets/images/build-your-first-app/vsc-install-toolkit.png" alt-text="Illustration showing where in Visual Studio Code you can install the Microsoft Teams Toolkit extension.":::

## 1. Create your app project

1. Open Visual Studio Code.
1. Select **Microsoft Teams Toolkit** :::image type="icon" source="../assets/icons/vsc-toolkit.png"::: > **Create a new Teams app**.

   :::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-02.png" alt-text="Screenshot showing how to create your app project with the Visual Studio Code Teams Toolkit.":::
   
1. Sign in with your Microsoft 365 development account.
1. On the **Select project** screen, select **JS** (JavaScript) > **Next**.

   :::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-03.png" alt-text="Screenshot showing how to configure your app project with the Visual Studio Code Teams Toolkit.":::

1. In the **Application Name** box, enter a name for your Teams app.

    :::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-04.png" alt-text="Screenshot showing how to add a name to your app project with the Visual Studio Code Teams Toolkit.":::

1. Select **Finish**. 
   Your project is now configured. 
1. Save your project on your local machine.  

## 2. Understand your app project components

After the toolkit configures your project, the components to build a basic personal tab for Teams are now available. The project directories and files appear in the **EXPLORER** section of the Visual Studio Code. 

   :::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-05.png" alt-text="Screenshot showing the scaffolding in your app project with the Visual Studio Code Teams Toolkit.":::

The toolkit automatically creates an app scaffold for you in the `src` directory based on the capabilities you added during setup. 
If you create a tab during setup, the `App.js` file in the `src/components` directory handles the initialization and routing of your app. It calls the Microsoft Teams JavaScript client SDK to establish communication between your app and Teams. 

## 3. Build and run your app

Build and run your app locally to save time. 

**To build and run your app**

1. In Visual Studio Code, select **View** > **Terminal**.
1. Run `npm install`.
1. Run `npm start`.
  
  A **Compiled successfully!** message appears in the terminal. Your app is now running on your localhost at `https://localhost:3000`. 

This information is also available in the `README` file of the toolkit.

## 4. Sideload your app in Teams


Sideloading an app is the process of installing apps on your computer, that hasn't gone through the certification process, to appear in the app store and to run on a Windows device. 

The operating system by default blocks you from sideloading apps. You have to enable sideloading of the apps to test your app in Teams. Before you turn on custom app sideloading for your development tenant, you must have one of the following:

* Ensure to have a Teams account and with admin access.
* Ensure to have a Microsoft 365 development account that allows app sideloading. 

**To enable sideloading of your app in Teams**

1. Sign in to [Microsoft 365 admin center](https://admin.microsoft.com/Adminportal/Home?source=applauncher#/homepage#/) with your admin credentials. 
1. Select **Show All** > **Teams**. 

   ![image of admin center menu](~/assets/images/prepare-test-tenant/admin-center.png)

   > [!Note] 
   > It can take up to 24 hours for the **Teams** option to appear. Meanwhile, you can [Upload your custom app to a Teams environment](/microsoftteams/upload-custom-apps#validate) for testing and validation.

1. Go to **Teams apps** > **Setup policies** > **Global** (Org-wide default).

   ![turn on sideload view](~/assets/images/prepare-test-tenant/turn-on-sideload.png)

1. Turn on the **upload custom apps** toggle.

1. Select **Save** to save the changes.

   Your test tenant now allows custom app sideloading.

   > [!Note]
   > Check for issues before sideloading your app using the validation feature in App Studio, which is included in the toolkit. Fix the errors to successfully sideload the app.


### To sideload your app

1. Open Teams Toolkit in Visual Studio Code.
1. Select **App Studio**.  
1. Select **Test and Distribute** > **Install**.

   :::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-appstudio.png" alt-text="Screenshot showing how to sideload your app to Teams client with the Visual Studio Code Teams Toolkit.":::

**Alternatively**

1. Select the **F5** key to open browser window to install. This will skip the installation process in the **App Studio**.
1. After the installation modal is opened on Teams client in browser, click **Add** to install your app to Teams.

   :::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-install.png" alt-text="Screenshot showing how to sideload your app to Teams client.":::

   > [!Note]
   > App Studio is also available as a stand-alone app for Teams client.

### Troubleshoot App Studio

**Installation failed**

If the following error message appears while installing App Studio, verify that the app information is correctly entered:

* Something went wrong
* Manifest parsing has failed 

**To verify the app information**

* In Microsoft Teams Toolkit, select **App Studio** > **app Details**, and verify that all the required information is correctly entered.
* If you have manually edited the `manifest.json` file, verify that the JSON is well-defined in **App Manifest** in App Studio.

**Tab content not displayed**

Verify that your web app is running. If the web app is not running, go to the terminal and run **npm start**.

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
