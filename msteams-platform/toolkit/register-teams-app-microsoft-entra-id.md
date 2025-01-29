---
title: Register Teams app in Microsoft Entra ID
author: surbhigupta
description: Registering your Teams app in Microsoft Entra ID helps you access Azure resources and enable Azure-related functions.
ms.topic: how-to
ms.author: surbhigupta
ms.localizationpriority: medium
---
# Register Teams app in Microsoft Entra ID

Registering your Teams app in Microsoft Entra ID allows the app to access Azure resources and enables Azure-related functions, such as single sign-on (SSO) or multitenancy.

## Prerequisites

1. An Azure account with an active subscription. If you don't already have one, [create an account for free](https://portal.azure.com).
2. The latest version of [Visual Studio 2022](https://visualstudio.microsoft.com/downloads/) with ASP.NET and web development workloads installed.
3. [Ngrok](https://ngrok.com/download), a reverse proxy software tool to create a temporary tunnel to a local web server's publicly available HTTPS endpoints.
4. A registered Microsoft 365 developer tenant account. If you don't have one, join the [Microsoft 365 developer program](https://developer.microsoft.com/en-us/microsoft-365/dev-program).

## Before you register your app

It's helpful if you learn about the configuration for [registering your app in Microsoft Entra ID](/entra/identity-platform/quickstart-register-app) beforehand. Ensure that you're prepared to configure the following details prior to registering your app:

* **Single or multitenant options**: Choose single tenant if your app is only used in its home tenant, or choose multitenant if many Microsoft 365 tenants use it regularly. For example, apps created for a single organization are typically single tenant. On the other hand, apps created by an independent software publisher that is used by many customers need to be multitenant so each customer's tenant can access the app.

* **Application ID URI**: It's a globally unique URI that identifies the web API you expose for your app's access through scopes. The application ID URI includes the app ID and the subdomain where your app is hosted. Your app's domain name and the domain name you register for your Microsoft Entra application should be the same. Currently, a single app doesn't support multiple domains.

## App registration experience in Microsoft Entra ID

The following steps help you to create and register your app in Microsoft Entra ID:

* [Create an app registration in Microsoft Entra ID](#create-an-app-registration-in-microsoft-entra-id)

* [Use Visual Studio or ngrok to create a tunnel](#create-a-tunnel)

### Create an app registration in Microsoft Entra ID

Register a new app in Microsoft Entra ID and configure the tenancy and app's platform. You generate a new app ID that you can use later in your Teams app manifest file.

To register a new app in Microsoft Entra ID:

1. Open the [Azure portal](https://portal.azure.com/) on your web browser.

1. Select the **App registrations** icon.

    :::image type="content" source="../assets/images/authentication/teams-sso-tabs/azure-portal.png" alt-text="Screenshot shows the Azure portal home page with app registrations icon highlighted in red.":::

    The **App registrations** page appears.

1. Select **+ New registration** icon.

    :::image type="content" source="../assets/images/authentication/teams-sso-tabs/app-registrations.png" alt-text="Screenshot shows the app registrations page with new registration option highlighted in red.":::

    The **Register an application** page appears.

1. Enter a name for your app that you want the user to see. You can change this name at a later stage if you want to.

    :::image type="content" source="../assets/images/authentication/teams-sso-tabs/register-app.png" alt-text="Screenshot shows the register an app page.":::

1. Select the type of user account that can access your app.

1. Select **Register**. A message appears on the browser stating that the app was created.

    :::image type="content" source="../assets/images/authentication/teams-app-created-message.png" alt-text="Screenshot shows a message stating that the app was created.":::

    When your app is registered in Microsoft Entra ID, the app overview page appears displaying the following details:

    :::image type="content" source="../assets/images/authentication/teams-app-overview-page.png" alt-text="Screenshot shows the app registration overview page.":::

    > [!NOTE]
    > Save the app ID from **Application (client) ID** and **Directory (tenant) ID** for further use.

### Create a tunnel

# [dev tunnel](#tab/dev)

[!INCLUDE [dev-tunnel](../includes/get-started/dev-tunnel.md)]

# [ngrok](#tab/ngrok)

[!INCLUDE [ngrok-tunnel](../includes/get-started/ngrok-tunnel.md)]

---

> [!NOTE]
> If you're Teams app is a bot or a message extension app, you need to additionally create an Azure bot resource. For more information, see [Create a resource bot in Microsoft Entra ID](create-resource-bot-microsoft-entra-id.md).

## See also

* [Microsoft Entra ID for Teams apps](use-microsoft-entra-id-for-teams.md)
* [Configure your app in Microsoft Entra ID](../bots/how-to/authentication/bot-sso-register-aad.md)
* [Configure your tab app in Microsoft Entra ID](../tabs/how-to/authentication/tab-sso-register-aad.md)
