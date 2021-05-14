---
title: Get started - Build your first Teams app with Blazor
author: adrianhall
description: Quickly create a Microsoft Teams app that displays a "Hello, World!" message using the Microsoft Teams Toolkit and .NET Blazor.
ms.author: adhal
ms.date: 04/27/2021
ms.topic: quickstart
---

# Build and run your first Microsoft Teams app with Blazor

In this tutorial, you will create a new Microsoft Teams app in .NET/Blazor that implements a simple tab to pull information from the Microsoft Graph.  During the tutorial, you will learn about the structure of a Teams app, how to run an app locally, and how to deploy the app to Azure.

The app that is built displays basic user information for the current user.  When permission is granted, the app will connect to the Microsoft Graph as the current user to get the complete profile.

## Before you begin

Make sure your development environment is set up by installing the [Prerequisites](prerequisites.md)

> [!div class="nextstepaction"]
> [Install Prerequisites](prerequisites.md)

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

# [Command Line](#tab/cli)

1. Open a Terminal and select the directory where you wish to create the project.

1. Run `dotnet new -i` to install the template from NuGet:

   ``` bash
   dotnet new -i Microsoft.TeamsApp.Blazor
   ```

   You only need to do this the first time or when updating the template.

1. Create a directory:

   ``` bash
   mkdir hello world
   ```

1. Run `dotnet new` to create a new project:

   ``` bash
   dotnet new teamsapp --shortName my-teams-app --companyName "My Company"
   ```

1. 
1. Once scaffolded, configure the project for Teams deployment:

   ``` bash
   teamsfx init
   ```

You can now open the solution in Visual Studio for debugging.

---

## Take a tour of the source code

If you wish to skip this section for now, you can [run your app locally](#run-your-app-locally).

Once the Teams Toolkit configures your project, you have the components to build a basic personal tab for Teams. The project directories and files display in the Solution Explorer area of Visual Studio 2019.

:::image type="content" source="../assets/images/teams-toolkit-v2/blazor-file-layout.png" alt-text="Screenshot showing app project files for a personal tab in Visual Studio 2019.":::

- The application icons are stored as PNG files in `color.png` and `outline.png`.
- The application manifest for publishing to Teams App Portal is stored in `Properties/manifest.json`.
- A backend controller is provided in `Controllers/BackendController.cs` for assisting with authentication.

Since you created a tab app during setup, the Teams Toolkit scaffolds all the necessary code for a basic tab as a [Blazor Server](https://docs.microsoft.com/aspnet/core/blazor).

- `Pages/Tab.razor` is the front-end application's entry point.
- `TeamsFx.cs` and `JS/src/index.js` is used for initializing communications with the Teams host.

You can add backend functionality by adding additional ASP.NET Core controllers to your application.

## Run your app locally

Teams Toolkit allows you to run your app locally.  This consists of several parts that are necessary to provide the correct infrastructure that Teams expects:

- An application is registered with Azure Active Directory.  This application has permissions associated with the location that the app is loaded from and any backend resources it accesses.
- A Web API is hosted (via IIS Express) to assist with authentication tasks, acting as a proxy between the app and Azure Active Directory.  
- An app manifest is generated and submitted to the Teams App Portal.  Teams uses the app manifest to tell connected clients where to load the app from.

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

# [Visual Studio 2019](#tab/vs)

> **TODO**: Complete the process for deploying

# [Command Line](#tab/cli)

> [!WARNING]
> Provisioning and deployment from the command line is not currently supported.  To deploy your app, use the instructions provided for Visual Studio 2019.

---

> [!NOTE]
> **What's the difference between Provision and Deploy?**
>
> The **Provision** step will create resources in Azure and M365 for your app, but no code (HTML, CSS, JavaScript, etc.) is copied to the resources.  The **Deploy** step will copy the code for your app to the resources you created during the provision step.  It is common to deploy multiple times without provisioning new resources. Since the provision step can take some time to complete, it is separate from the deployment step.

Once the provisioning and deployment steps are finished:

> **TODO**: Complete the process

1. From Visual Studio 2019, open the debug panel (**Ctrl+Shift+D** / **⌘⇧-D** or **View > Run**)
2. Select **Launch Remote (Edge)** from the launch configuration drop-down.
3. Press the Play button to launch your app - now running remotely from Azure!

## Next steps

Learn about other methods for creating tab apps:

- [Create a Teams app with React](first-app-react.md).
- [Create a Teams app as a SharePoint Web Part](first-app-spfx.md) (Azure not required).
- [Create a conversational bot app](first-app-bot.md).
- [Create a messaging extension](first-message-extension.md).
