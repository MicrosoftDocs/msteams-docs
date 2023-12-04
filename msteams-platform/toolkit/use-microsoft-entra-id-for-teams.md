---
title: Use Microsoft Entra ID for Teams apps
author: surbhigupta
description: Hosting your Teams app on Azure helps you create reliable, scalable, and easy-to-maintain applications.
ms.topic: overview
ms.author: surbhigupta
ms.localizationpriority: medium
---
# Use Microsoft Entra ID for Teams apps

Microsoft Entra ID is a cloud platform that simplifies the process of building modern applications. You can host your Teams apps entirely in Azure or extend your app with Azure services. Hosting your Teams app on Azure helps you create applications that are reliable, scalable, and easily maintainable. Azure supports popular programming languages, including Python, JavaScript, Java, .NET, and Go.

You must have an Azure account to use Azure resources or to host your Teams app on Microsoft Entra ID.
For more information, see [Microsoft Entra ID subscription](/azure/developer/intro/azure-developer-billing#what-is-an-azure-subscription).

With Microsoft Entra ID, you can use the following services for your Teams app:

1. Host any Teams app on Microsoft Entra ID with any capability

1. Teams apps for meetings:
    1. [Generate meeting token for Teams](../sbs-meeting-token-generator.yml)
    1. [Generate Teams meeting side panel](../sbs-meetings-sidepanel.yml)

1. Teams bot apps:
    1. Create client secret for the bot app
    1. Authentication for Teams apps
    1. [Configure Single sign-on for your app](add-single-sign-on.md)
    1. [Configure third-party authentication for your app](../tabs/how-to/authentication/auth-tab-aad.md)
    1. [Send activity feed notification from Microsoft Teams activity feed](../sbs-graphactivity-feedbroadcast.yml)

Microsoft Entra ID also enables you to customize who has access to your account when you're registering your app on the platform.

| Account type | Function |
| --- | --- |
| Accounts in this organizational directory only  (Microsoft only - Single tenant) | All user and guest accounts in your directory can use your application or API. Use this option if your target audience is internal to your organization. |
| Accounts in any organizational directory (Any Microsoft Entra ID tenant - Multitenant) | All users with a work or school account from Microsoft can use your application or API. It includes schools and businesses that use Microsoft 365. Use this option if you want to enable multitenancy and your target audience are businesses or educational customers. |
| Accounts in any organizational directory (Any Microsoft Entra ID tenant - Multitenant) and personal Microsoft accounts (e.g. Skype, Xbox) | All users with a work or school, or personal Microsoft account can use your application or API. It includes schools and businesses that use Microsoft 365 as well as personal accounts that are used to sign in to services like Xbox and Skype. Use this option to enable multitenancy and target the widest set of Microsoft identities. |
| Personal Microsoft accounts only | Personal accounts that are used to sign in to services like Xbox and Skype. Use this option to target the widest set of Microsoft identities. |

## Tenants in Microsoft Entra ID

A 'tenant' is a secure identity and access management system for the users, groups, and the applications stored in the organization’s Azure environment. The tenant provides a centralized platform for admins to manage identities, permissions, and access to Azure resources and services.

When you create a single tenant application in Microsoft Entra ID, it's restricted to the users in the organizational directory it was created in. This type of tenant is perfect for applications that are simple and prioritize security, privacy, and collaboration within an organization. On the other hand, multitenant applications are accessed to users both inside and outside the tenant it was created in. This type of tenancy promotes better scalability, reach, and collaboration.

For more information about single and multitenancy, see [Tenancy in Microsoft Entra ID](/entra/identity-platform/single-and-multi-tenant-apps) or see the following video:

<br>
> [!VIDEO https://www.youtube.com/embed/RjGVOFm39j0]

## Register your Teams app on Microsoft Entra ID

The following steps help you to create and register your app in Azure portal:

* Create an app registration in Microsoft Entra ID.

* Use Visual Studio or ngrok to create a tunnel.

### Create an app registration in Microsoft Entra ID

Register a new app in Microsoft Entra ID and configure the tenancy and app's platform. You generate a new app ID that you can use later in your Teams app manifest file.

To register a new app in Microsoft Entra ID

1. Open the [Azure portal](https://portal.azure.com/) on your web browser.

1. Select the **App registrations** icon.

    :::image type="content" source="../assets/images/authentication/teams-sso-tabs/azure-portal.png" alt-text="Screenshot shows the Azure portal home page with app registrations icon highlighted in red.":::

    The **App registrations** page appears.

1. Select **+ New registration** icon.

    :::image type="content" source="../assets/images/authentication/teams-sso-tabs/app-registrations.png" alt-text="Screenshot shows the app registrations page with new registration option highlighted in red.":::

    The **Register an application** page appears.

1. Enter the name of your app that you want the app user to see. You can change this name at a later stage if you want to.

    :::image type="content" source="../assets/images/authentication/teams-sso-tabs/register-app.png" alt-text="Screenshot shows the register an application page.":::

1. Select the type of user account that can access your app.

1. Select **Register**. A message appears on the browser stating that the app was created.

    :::image type="content" source="../assets/images/authentication/teams-app-created-message.png" alt-text="Screenshot shows a message stating that the app was created.":::

    Your app is registered in Microsoft Entra ID. The app overview page appears.

    :::image type="content" source="../assets/images/authentication/teams-app-overview-page.png" alt-text="Screenshot shows the app registration overview page.":::

    > [!NOTE]
    > Save the app ID from **Application (client) ID** and **Directory (tenant) ID** for further use.

### Create a tunnel

# [dev tunnel](#tab/dev)

[!INCLUDE [dev-tunnel](../includes/get-started/dev-tunnel.md)]

# [ngrok](#tab/ngrok)

[!INCLUDE [ngrok-tunnel](../includes/get-started/ngrok-tunnel.md)]

---

## See also

* [Configure your app in Microsoft Entra ID](../bots/how-to/authentication/bot-sso-register-aad.md)
* [Configure your tab app in Microsoft Entra ID](../tabs/how-to/authentication/tab-sso-register-aad.md)
* [Edit Microsoft Entra manifest](AAD-manifest-customization.md)
