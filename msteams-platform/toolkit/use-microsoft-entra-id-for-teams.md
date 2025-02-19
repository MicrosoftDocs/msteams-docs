---
title: Microsoft Entra ID for Teams Apps
description: Learn about the basics of the identity and access management service, Microsoft Entra ID, and how tenants function in Microsoft Entra ID.
author: surbhigupta12
ms.author: surbhigupta
ms.topic: overview
audience: developer
ms.service: msteams
ms.subservice: teams-apps
ms.date: 02/19/2025
---

# Microsoft Entra ID for Teams apps

Microsoft Entra ID is a cloud-based Identity and Access Management (IAM) service that provides secure authentication for Teams apps and their users. The platform also offers access to various resources, including Microsoft Azure and Microsoft 365.

You can use the following Entra ID-secured services for your Teams app:

* **Single sign-on (SSO)**: You can enable SSO for Teams apps, allowing users to sign in once and access your app on multiple devices without the need to reenter their credentials.
* **App registration**: You can register your Teams app in Microsoft Entra ID to enable authentication and authorization. You can create an app ID, define API scopes, and configure app permissions.
* **Bot and message extensions**: You can use Microsoft Entra ID to configure a bot resource, messaging endpoint, and OAuth connections.
* **Tabs**: You can register a tab app, enable SSO, and configure access tokens and permissions.

To get started, sign up for a [free Azure account](https://azure.microsoft.com/pricing/purchase-options/azure-account?icid=active-directory). For more information, see [what is Microsoft Entra ID](/entra/fundamentals/whatis).

## Tenants in Microsoft Entra ID

A tenant is an administrative boundary for managing users, apps, and group identities. It's a dedicated instance of the Microsoft Entra service for your organization in the Azure cloud. The tenant is crucial for managing and securing your app's access to organizational resources and services. The tenant in which you register your app is referred to as its home tenant.

You can register your app under two types of tenancy:

* **Single tenant**: An app registered as a single tenant app is restricted to the users in the organizational directory of its home tenant. This type of tenant is suitable for apps that are simple and prioritize security, privacy, and collaboration within an organization.

* **Multitenant**: An app registered as a multitenant app is accessible to users both inside and outside the home tenant. This type of tenancy promotes better scalability and reach for the app, and offers collaboration within and across organizations.

When you register your app on Azure portal, you have the following tenancy options:

| **Account type** | **Tenant type** | **Function** |
| --- | --- | --- |
| Accounts in this organizational directory only | Single tenant | All users and guest accounts in your directory can use Teams your app. Use this option if your target audience is internal to your organization. |
| Accounts in any organizational directory | Multitenant | All users with a work or school account from Microsoft can use your Teams app. It includes schools and businesses that use Microsoft 365. Use this option if you want to enable multitenancy and your target audience are businesses or educational customers. |
| Accounts in any organizational directory and personal Microsoft accounts | Multitenant | All users with a work or school, or personal Microsoft account can use your Teams app. It includes schools and businesses that use Microsoft 365 as well as personal accounts that are used to sign in to services like Xbox and Skype. Use this option to enable multitenancy and target the widest set of Microsoft identities. |
| Personal Microsoft accounts only | NA | Personal accounts that are used to sign in to services like Xbox and Skype. Use this option to target the widest set of Microsoft identities. |

For more information about tenancy, see [tenancy in Microsoft Entra ID](/entra/identity-platform/single-and-multi-tenant-apps) or see the following video:
<br>
<br>

> [!VIDEO https://www.microsoft.com/en-us/videoplayer/embed/RWZb0O]

## Next step

> [!div class="nextstepaction"]
> [Register Teams app in Microsoft Entra ID](register-teams-app-microsoft-entra-id.md)

## See also

* [Configure your bot app in Microsoft Entra ID](../bots/how-to/authentication/bot-sso-register-aad.md)
* [Configure your tab app in Microsoft Entra ID](../tabs/how-to/authentication/tab-sso-register-aad.md)
* [Edit Microsoft Entra manifest](AAD-manifest-customization.md)
* [Generate meeting token for Teams](../sbs-meeting-token-generator.yml)
* [Authentication for Teams apps](../concepts/authentication/authentication.md)
* [Configure Single sign-on for your app](add-single-sign-on.md)
* [Configure third-party authentication for your app](../bots/how-to/authentication/add-authentication.md)
