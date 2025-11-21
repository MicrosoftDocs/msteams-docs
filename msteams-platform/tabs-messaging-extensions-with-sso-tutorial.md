---
title: SSO for tabs and message extension
description: In this module, learn how to set up Microsoft Entra single sign-on (SSO) authentication for tabs and message extensions.
ms.topic: conceptual
ms.localizationpriority: high
ms.date: 11/21/2025
ms.owner: ryanbliss
---

# Add SSO to tab and message extension app

The  Microsoft Entra single sign-on (Microsoft Entra SSO) helps to authenticate users in Teams.

**Key aspects of Microsoft Entra SSO**:

- Allows the user to sign in automatically after the first sign in.
- Allows the user to sign in to other devices without entering credentials again.
- Obtains token for the signed in user.

This step-by-step guide helps you to create tabs and message extensions enabling Microsoft Entra SSO authentication. You'll see the following output:

:::image type="content" source="../../../assets/images/Tab-ME-SSO/hello-megan-profile245-1.png" alt-text="Screenshot of the tab and message extension with SSO authentication output after you have successfully completed the step-by-step guide.":::

## Prerequisites

Ensure that you install the following tools and set up your development environment:  

| &nbsp; | Install | For using... |
| --- | --- | --- |
| &nbsp; | [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams to collaborate with everyone you work with through apps for chat, meetings, and calls all in one place.|
| &nbsp; | [Microsoft 365 developer account](concepts/build-and-test/prepare-your-o365-tenant.md) | Access to Teams account with the appropriate permissions to install an app. |
| &nbsp; | [.NET Core SDK](https://dotnet.microsoft.com/en-us/download) | Customized bindings for local debugging and Azure Functions app deployments. If you haven't installed the latest version, install the portable version. |
| &nbsp; | [Visual Studio 2022](https://visualstudio.microsoft.com) | You can install the enterprise version in Visual Studio 2022, and install the ASP.NET and web development workloads. Use the latest version. |
| &nbsp; | Dev tunnel | Teams app features (conversational bots, message extensions, and incoming webhooks) need inbound connections. A tunnel connects your development system to Teams. Dev tunnel is a powerful tool to securely open your localhost to the internet and control who has access. Dev tunnel is available in Visual Studio 2022 version 17.7.0 or later. <br> or </br> You can also use [ngrok](https://ngrok.com/downloads) as a tunnel to connect your development system to Teams. It isn't required for apps that only include tabs. This package is installed within the project directory (using npm `devDependencies`). |

> [!NOTE]
> After downloading ngrok, sign up and install [authtoken](https://ngrok.com/downloads).

## Set up local environment

[!INCLUDE [Set up local environment](includes/get-started/clone-repository.md)]

## Register Microsoft Entra app

The following steps help you to create and register your bot in Azure portal:

- Create and register your Azure app.
- Create client secret to enable SSO authentication of the bot.
- Add Teams channel to deploy the bot.
- Create a tunnel to your web server's endpoints using dev tunnel (recommended) or ngrok.
- Add messaging endpoint to the dev tunnel that you created.

[!INCLUDE [Azure app registration](includes/get-started/azure-app-registration.md)]
