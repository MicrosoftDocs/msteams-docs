---
title: Build your first Teams app with Blazor
author: adrianhall
description: Quickly create a Microsoft Teams app that displays a "Hello, World!" message using the Microsoft Teams Toolkit and .NET Blazor.
ms.author: adhal
ms.date: 04/27/2021
ms.topic: quickstart
ms.localizationpriority: none
---

# Build and run your first Microsoft Teams app with Blazor

Intro

## Run your app locally

After the project is created, set up single sign-on with Microsoft 365:

   1. Select **Project** > **TeamsFx** > **Configure for SSO...**.
   1. When prompted, sign in to your Microsoft 365 administrator account.

You can use Teams Toolkit to run the app in the local environment. To prepare the environment, ensure that:

- An application is registered with Azure Active Directory.  This application has permissions for the location that the app is loaded from and for any backend resources it accesses.
- A web API is hosted (via IIS Express) to assist with authentication tasks, acting as a proxy between the app and Azure Active Directory.  
- An app manifest is generated and exists in the Developer Portal for Teams.  Teams uses the app manifest to tell connected clients where to load the app from.

After it's done, load your app in the Teams client. You can see the HTML, CSS, and JavaScript code using the Teams web client.

To build and run your app locally:

1. From Visual Studio Code, press the **F5** key to run your application in debug mode.


1. If requested, install the self-signed SSL certificate for local debugging.

   :::image type="content" source="../assets/images/teams-toolkit-v2/ssl-prompt.png" alt-text="Screenshot showing how the prompt to install an SSL certificate to enable Teams to load your application from localhost.":::

1. Teams is loaded in a web browser. After you sign in, if you're prompted to open Microsoft Teams, select **Cancel** to remain in the browser. Sign in with your Microsoft 365 account.

1. When prompted to install the app to Teams, select **Add**.

   Your app will now be displayed:

   :::image type="content" source="../assets/images/teams-toolkit-v2/blazor-completed-app.png" alt-text="Screenshot of the completed app":::

   You can do normal debugging activities, such as setting breakpoints, as if it were any other web application. The app supports hot reloading.  If you change any file within the project, the page will be reloaded.

<!-- markdownlint-disable MD033 -->
<details>
<summary>Learn what happens when you run your app locally in the debugger.</summary>

When you select **F5**, the Teams Toolkit:

1. Registers your application with Azure Active Directory.
1. Registers your application for "sideloading" in Microsoft Teams.
1. Starts your application backend running locally.
1. Starts your application front-end hosted locally.
1. Starts Microsoft Teams in a web browser with a command to instruct Teams to side load the application (the URL is registered inside the application manifest).

</details>

<!-- markdownlint-disable MD033 -->
<details>
<summary>Learn how to troubleshoot common issues when running your app locally.</summary>

To run your app in Teams, you need a Microsoft 365 development account that allows app sideloading. For more information about account opening, see [Prerequisites](prerequisites.md#set-up-your-teams-development-tenant).

</details>

| **<<** | **>>** |
|:--- | ---:|
| **Back** : [1. Create your first Teams Blazor app](first-app-blazor.md) | [3. Deploy your first Teams Blazor app](deploy-blazor-app.md) : **Next**|
|