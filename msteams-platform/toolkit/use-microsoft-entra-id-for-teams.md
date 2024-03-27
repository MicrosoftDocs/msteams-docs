---
title: Microsoft Entra ID for Teams apps
author: surbhigupta
description: Hosting your Teams app on Microsoft Entra ID helps you create reliable, scalable, and easy-to-maintain apps.
ms.topic: overview
ms.author: surbhigupta
ms.localizationpriority: medium
---
# Microsoft Entra ID for Teams apps

Microsoft Entra ID is a cloud platform that simplifies the process of building Teams apps. You can host your Teams apps entirely on Microsoft Entra ID or extend your app with Azure services. Hosting your Teams app on Microsoft Entra ID helps you create apps that are reliable, scalable, and easily maintainable. Microsoft Entra ID supports popular programming languages, including C#, Java, JavaScript, TypeScript, PowerShell, Python, and .NET.

You must have an Azure account to use Azure resources or to host your Teams app on Microsoft Entra ID.
For more information, see [Microsoft Entra ID subscription](/azure/developer/intro/azure-developer-billing#what-is-an-azure-subscription).

You can host any Teams app on Microsoft Entra ID with any capability. You can also use the following Azure services for your Teams app:

1. Teams apps for meetings:
    1. [Generate meeting token for Teams](../sbs-meeting-token-generator.yml)
    1. [Generate Teams meeting side panel](../sbs-meetings-sidepanel.yml)

1. Teams bot apps:
    1. [Create client secret for the bot app](create-resource-bot-microsoft-entra-id.md#create-client-secret)
    1. [Authentication for Teams apps](../concepts/authentication/authentication.md)
    1. [Configure Single sign-on for your app](add-single-sign-on.md)
    1. [Configure third-party authentication for your app](../bots/how-to/authentication/add-authentication.md)
    1. [Send activity feed notification from Microsoft Teams activity feed](../sbs-graphactivity-feedbroadcast.yml)

Microsoft Entra ID also enables you to customize who has access to your account when you're registering your Teams app on the platform.

| **Account type** | **Tenant type** | **Function** |
| --- | --- | --- |
| Accounts in this organizational directory only | Single tenant | All users and guest accounts in your directory can use Teams your app. Use this option if your target audience is internal to your organization. |
| Accounts in any organizational directory | Multitenant | All users with a work or school account from Microsoft can use your Teams app. It includes schools and businesses that use Microsoft 365. Use this option if you want to enable multitenancy and your target audience are businesses or educational customers. |
| Accounts in any organizational directory and personal Microsoft accounts | Multitenant | All users with a work or school, or personal Microsoft account can use your Teams app. It includes schools and businesses that use Microsoft 365 as well as personal accounts that are used to sign in to services like Xbox and Skype. Use this option to enable multitenancy and target the widest set of Microsoft identities. |
| Personal Microsoft accounts only | NA | Personal accounts that are used to sign in to services like Xbox and Skype. Use this option to target the widest set of Microsoft identities. |

## Tenants in Microsoft Entra ID

A 'tenant' is a secure identity and access management system for the Teams apps that you host on Microsoft Entra ID. It also contains the users, groups, and other apps stored in the organization’s Azure environment. The tenant provides a centralized platform for admins to manage identities, permissions, and access to Azure resources and services. The tenant in which you register your app is referred to as its home tenant.

You can register your Microsoft Entra app with two types of tenants:

* **Single tenant**: A Microsoft Entra app registered under the single tenant is restricted to the users in the organizational directory of its home tenant. This type of tenant is suited for apps that are simple and prioritize security, privacy, and collaboration within an organization.

* **Multitenant**: A Microsoft Entra app registered under the multitenant is accessible to users both inside and outside the home tenant. This type of tenancy promotes better scalability and reach for the app, and promotes collaboration within and across organizations.

For more information about tenancy, see [Tenancy in Microsoft Entra ID](/entra/identity-platform/single-and-multi-tenant-apps) or see the following video:
<br>
<br>

> [!VIDEO https://www.microsoft.com/en-us/videoplayer/embed/RWZb0O]

## Next step

> [!div class="nextstepaction"]
> [Register Teams app in Microsoft Entra ID](register-teams-app-microsoft-entra-id.md)

## See also

* [Configure your app in Microsoft Entra ID](../bots/how-to/authentication/bot-sso-register-aad.md)
* [Configure your tab app in Microsoft Entra ID](../tabs/how-to/authentication/tab-sso-register-aad.md)
* [Edit Microsoft Entra manifest](AAD-manifest-customization.md)
