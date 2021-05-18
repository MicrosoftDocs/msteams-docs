---
title: Get started - Build your first Teams app with Blazor
author: adrianhall
description: Quickly create a Microsoft Teams app that displays a "Hello, World!" message using the Microsoft Teams Toolkit and .NET Blazor.
ms.author: adhal
ms.date: 04/27/2021
ms.topic: quickstart
---

# Build and run your first Microsoft Teams app with Blazor

In this tutorial, you will create a new Microsoft Teams app in .NET/Blazor that implements a simple personal app to pull information from the Microsoft Graph. (A *personal app* includes a set of tabs scoped for individual use.)  During the tutorial, you will learn about the structure of a Teams app, how to run an app locally, and how to deploy the app to Azure.

The app that is built displays basic user information for the current user.  When permission is granted, the app will connect to the Microsoft Graph as the current user to get the complete profile.

## Before you begin

Make sure your development environment is set up by installing the [prerequisites](prerequisites.md)

> [!div class="nextstepaction"]
> [Install prerequisites](prerequisites.md)

## Create your project

Use the Teams Toolkit to create your first project:

# [Visual Studio 2019](#tab/vs)

1. Open Visual Studio 2019.

1. Select **Create a new project**.

1. Select **Microsoft Teams App**, then press **Next**.  To help you find the template, use the project type **Microsoft Teams**.

1. Give the project and solution a good name, then press **Next**.

1. Provide the application name and company name, then press **Create**.  The application name and company name are displayed to your end users.

1. Your Teams app will be created within a few seconds.  Once the project is created, set up single sign-on with M365:

   - Select **Project** > **TeamsFx** > **Configure for SSO...**.
   - When prompted, sign in to your M365 administrator account.

# [Command line](#tab/cli)

1. Open a Terminal and select the directory where you wish to create the project.

1. Run `dotnet new -i` to install the template from NuGet:

   ``` bash
   dotnet new -i Microsoft.TeamsApp.Blazor
   ```

   You only need to do this the first time or when updating the template.

1. Create a directory:

   ``` bash
   mkdir helloworld
   ```

1. Run `dotnet new` to create a new project:

   ``` bash
   dotnet new teamsapp --shortName my-teams-app --companyName "My Company"
   ```

1. Once scaffolded, configure the project for Teams deployment:

   ``` bash
   teamsfx init
   ```

You can now open the solution in Visual Studio for debugging.

---

## Take a tour of the source code

If you wish to skip this section for now, you can [run your app locally](#run-your-app-locally).

Once the Teams Toolkit configures your project, you have the components to build a basic personal app for Teams. The project directories and files display in the Solution Explorer area of Visual Studio 2019.

:::image type="content" source="../assets/images/teams-toolkit-v2/blazor-file-layout.png" alt-text="Screenshot showing app project files for a personal app in Visual Studio 2019.":::

- The app icons are stored as PNG files in `color.png` and `outline.png`.
- The app manifest for publishing through the Developer Portal for Teams is stored in `Properties/manifest.json`.
- A backend controller is provided in `Controllers/BackendController.cs` for assisting with authentication.

Since you created a tab app during setup, the Teams Toolkit scaffolds all the necessary code for a basic tab as a [Blazor Server](/aspnet/core/blazor).

- `Pages/Tab.razor` is the front-end application's entry point.
- `TeamsFx.cs` and `JS/src/index.js` is used for initializing communications with the Teams host.

You can add backend functionality by adding additional ASP.NET Core controllers to your application.

## Run your app locally

Teams Toolkit allows you to run your app locally.  This consists of several parts that are necessary to provide the correct infrastructure that Teams expects:

- An application is registered with Azure Active Directory.  This application has permissions associated with the location that the app is loaded from and any backend resources it accesses.
- A web API is hosted (via IIS Express) to assist with authentication tasks, acting as a proxy between the app and Azure Active Directory.  
- An app manifest is generated and exists in the Developer Portal for Teams.  Teams uses the app manifest to tell connected clients where to load the app from.

Once this is done, the app can be loaded within the Teams client.  We use the Teams web client so that we can see the HTML, CSS, and JavaScript code within a standard web development environment.

To build and run your app locally:

1. From Visual Studio Code, press **F5** to run your application in debug mode.

1. If requested, install the self-signed SSL certificate for local debugging.

   :::image type="content" source="../assets/images/teams-toolkit-v2/ssl-prompt.png" alt-text="Screenshot showing how the prompt to install a SSL certificate to enable Teams to load your application from localhost.":::

1. Teams will be loaded in a web browser, and you will be prompted to sign in.  Sign in with your M365 account.
1. When prompted to install the app onto Teams, press **Add**.

Your app will now be displayed:

:::image type="content" source="../assets/images/teams-toolkit-v2/blazor-completed-app.png" alt-text="Screenshot of the completed app":::

You can do normal debugging activities as if this were any other web application (such as setting breakpoints). The app supports hot reloading.  If you change any file within the project, the page will be reloaded.

<!-- markdownlint-disable MD033 -->
<details>
<summary>Learn what happens when you run your app locally in the debugger.</summary>

When you pressed F5, the Teams Toolkit:

1. Registered your application with Azure Active Directory.
1. Registered your application for "side loading" in Microsoft Teams.
1. Started your application backend running locally.
1. Started your application front-end hosted locally.
1. Started Microsoft Teams in a web browser with a command to instruct Teams to side load the application (the URL is registered inside the application manifest).

</details>

<!-- markdownlint-disable MD033 -->
<details>
<summary>Learn how to troubleshoot common issues when running your app locally.</summary>

To successfully run your app in Teams, you must have a Microsoft 365 development account that allows app side loading. For more information on account opening, see [Prerequisites](prerequisites.md#enable-side-loading).

</details>

## Deploy your app to Azure

Deployment consists of two steps.  First, necessary cloud resources are created (also known as provisioning), then the code that makes up your app is copied into the created cloud resources.

> **PREVIEW**
>
> Support for Blazor apps is new in Teams Toolkit.  Provisioning and deployment are done with a combination of Visual Studio 2019 and the Developer Portal for Teams.

## Provision and deploy your app to Azure App Service

1. In Solution Explorer, right-click the project node and choose **Publish** (or use the **Build** > **Publish** menu item).

   :::image type="content" source="../assets/images/teams-toolkit-v2/blazor-vs2019-publish1.png" alt-text="Select the Publish operation on the project":::

1. In the **Publish** window, select **Azure**.  Press **Next**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/blazor-vs2019-publish2.png" alt-text="Select Azure as the publishing target":::

1. Select **Azure App Service (Windows)**.  Press **Next**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/blazor-vs2019-publish3.png" alt-text="Select Azure App Service as the publishing target":::

1. Select **+** to create a new App Service instance.

   :::image type="content" source="../assets/images/teams-toolkit-v2/blazor-vs2019-publish4.png" alt-text="Create a new instance.":::

1. In the **Create App Service (Windows)** dialog, the **Name**, **Subscription name**, **Resource Group**, and **Hosting Plan** entry fields are populated. If you have already got an App Service running, existing settings will be selected.  You can opt to create a new resource group and hosting plan (Recommended).  When ready, select **Create**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/blazor-vs2019-publish5.png" alt-text="Select hosting plan and subscription":::

1. In the **Publish** dialog, the newly created instance has been automatically selected.  When ready, select **Finish**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/blazor-vs2019-publish6.png" alt-text="Select the new instance.":::

1. Press the **Edit** (pencil) icon next to **Deployment Mode**, then select **Self-contained**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/blazor-vs2019-publish8.png" alt-text="Select self-contained deployment mode.":::

1. Select **Publish**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/blazor-vs2019-publish7.png" alt-text="Publish your app to app service":::

Visual Studio deploys the app to your Azure App Service, and the web app loads in your browser.  Add `/tab` to the end of the URL to see your page.

The project properties **Publish** pane shows the site URL and other details. Make a note of the site URL.

## Create an environment for your app

The Developer Portal for Teams manages where the tabs for your app are loaded from with an **Environment**.  To create an environment:

1. Open the [Developer Portal for Teams](https://dev.teams.microsoft.com).  Sign in with your M365 administrative account.

1. From the sidebar, select **Apps**.

1. If you only have one app, it will be automatically selected.  If not, select your app from the list.

1. Select **Environments**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/devcenter-environments1.png" alt-text="Select environments":::

1. Select **Create your first environment**.

1. Enter a name for your environment, then press **Add**; for example _Production_.

1. With the newly created environment selected, press **Create your first environment variable**.

1. Enter `azure_app_url` for the **Name**.  Enter your Azure site URL (without the `https://`) as the **Value**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/devcenter-environments2.png" alt-text="Create environment variable":::

   Press **Add**.

## Update the app manifest

The app manifest is loading the tab from a `localhost` URL.  In this section, you will adjust the app manifest to load the tab from the URL listed within the environment you just created.

1. From the sidebar, select **Basic information**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/devcenter-environments3.png" alt-text="Select basic information":::

1. There are several places within the manifest that list a `locahost:XXXXX` as part of a URL.  Replace all occurrences with `{{azure_app_url}}` (including the curly braces).

   :::image type="content" source="../assets/images/teams-toolkit-v2/devcenter-environments4.png" alt-text="Adjust basic information for the environment":::

1. When complete, press **Save**.

1. From the sidebar, select **Capabilities**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/devcenter-environments5.png" alt-text="Select capabilities":::

1. Select **Personal Tab**.
1. Next to the **Personal Tab**, select the triple dots, then select **Edit**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/devcenter-environments6.png" alt-text="Edit personal tab settings":::

1. Replace the URL with the environment variable within the **Content Url** and **Website Url** fields.

   :::image type="content" source="../assets/images/teams-toolkit-v2/devcenter-environments7.png" alt-text="Edit personal tab URLs":::

1. Press **Update**.

1. Press **Save**.

1. From the sidebar, select **Single Sign-On**.

1. Replace the `localhost` within the **Application ID URI** with `{{azure_app_url}}`.

   :::image type="content" source="../assets/images/teams-toolkit-v2/devcenter-environments8.png" alt-text="Edit single sign-on Application ID URI":::

1. Press **Save**.

1. From the sidebar, press **Domains**.

1. Press **Add a domain**.

1. If `{{azure_app_url}}` is not listed as a valid domain, add it as a valid domain, then press **Add**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/devcenter-environments9.png" alt-text="Add a domain":::

You can now use the **Preview in Teams** button at the top of the page to launch your app within Teams.

## Next steps

Learn about other methods for creating Teams apps:

- [Create a Teams app with React](first-app-react.md)
- [Create a Teams app as a SharePoint Web Part](first-app-spfx.md) (Azure not required)
- [Create a conversational bot app](first-app-bot.md)
- [Create a messaging extension](first-message-extension.md)
