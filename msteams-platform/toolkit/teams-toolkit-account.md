---
title: Account
author: Rajeshwari-v
description:  Describes about account
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: Account
---

# Require accounts with valid subscription to create apps

Teams toolkit enables you to create new apps. To develop Teams app, you must have the following accounts:

* Microsoft 365 account with valid subscription.
* Azure account only if host your backend resources on Azure.

> [!NOTE}]
> Azure account is optional. If your existing application is hosted on other cloud provider, then you can integrate the existing application to Teams platform.

[Related images missing]

## Microsoft 365 Account

You can create Microsoft 365 account by joining Microsoft 365 developer program. The Microsoft 365 developer program includes Microsoft 365 E5 developer subscription. With the valid account, you can create your own sandbox and develop solutions independent of your production environment. The Microsoft 365 E5 developer subscription provides:

* 25 user licenses
* 90 days free trial for development purposes

## Azure Account

You can create an Azure account if you wish to host your app and access resources within Azure. To set up your subscription, join the Microsoft 365 Developer Program. You can create your development environment with Microsoft 365 developer program. The subscription is free for 90 days and continues to renew. If you have Visual Studio Enterprise or Professional Subscription, both programs include free Microsoft 365 developer subscription. It is active as long as your Visual Studio subscription is active.

## Microsoft 365 developer program

The following steps guide you to sign-in to Microsoft 365 developer program:

1. Go to the Microsoft 365 developer program.
1. Select **Join now** and the welcome screen appears.
1. Select **Set up E5 subscription**.
1. Set up your administrator account.

The following image depicts Microsoft 365 developer program with valid subscription:

![Microsoft 365 developer program](~/assets/images/teams-toolkit-v2/microsoft365-developer-program.png)

You can sign up for developer program with any one of the following account types:

1. Microsoft account for personal use provides access to all consumer-oriented Microsoft products and cloud services, such as Outlook, Messenger, OneDrive, MSN, Xbox Live, or Microsoft 365. After you create Microsoft account, you can access consumer-related Microsoft cloud services or Azure.

1. Work account issued by admin for business use provides access to all small, medium, and enterprise business-level Microsoft cloud services, such as Azure, Microsoft Intune, or Microsoft 365. When you sign in  to one of these services as an organization, you can access cloud-based directory provisioned in (AAD) Azure Active Directory to represent your organization. For more information, see: [Manage your Azure AD directory].

1. Visual Studio ID (created for your Visual Studio Professional or Enterprise subscriptions) - We recommend that you use this option to join the developer program from within the Visual Studio Gallery to get the full benefits as a Visual Studio subscriber.

## Teams customer app uploading (sideloading permission) check

During development, you must load your app within your Teams without distributing it. This is known as side loading.

One of the ways to check if you have a Teams account, verify if you can sideload apps in Teams:

1. In the Teams client, select Apps.

1. Select Upload a custom app.

![Upload custom app](~/assets/images/teams-toolkit-v2/upload-custom-app-closeup.png)

Without sideloading permission, you won’t be able to do any local/remote debugging. So it’s very important to get the sideloading permission for your account before you do any debugging for your Teams app.

## Enable custom Teams apps (sideloading) and turn on custom app uploading.

**To turn on the custom app uploading or sideloading for your developer tenant.**

1. Sign in to Microsoft 365 admin center with your admin credentials.

1. Select Show All > Teams.

![Custom app uploading](~/assets/images/teams-toolkit-v2/custom-app-uploading.png)

>[!Note]
>It can take up to 24 hours for the Teams option to appear. You can upload your custom app to a Teams environment for testing and validation in that time.
>Navigate to Teams apps
> Setup Policies.
> Global.

![Setup-global-policies](~/assets/images/teams-toolkit-v2/global-setup-policies.png)

1. Toggle Upload custom apps to the On position. 

1. Select Save. Your test tenant can permit custom app sideloading. 

>[!Note]
> It can take up to 24 hours for the sideloading to be active. In the interim, you can use upload for your tenant to test your app. To upload the .zip package file of the app, see upload custom apps.

![List of custom apps](~/assets/images/teams-toolkit-v2/list-custom-apps.png)

For complete information on how these settings interact, see manage custom app policies and settings in Teams and manage app setup policies in Teams.