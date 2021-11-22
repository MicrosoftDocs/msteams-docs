---
title: Account
author: v-vasudhab
description:  Describes about account
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: About creating an Account
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

![Microsoft 365 developer program](~/assets/images/tools-and-sdks/microsoft365-developer-program.png)

You can sign up for developer program with any one of the following account types:

1. Microsoft account for personal use provides access to all consumer-oriented Microsoft products and cloud services, such as Outlook, Messenger, OneDrive, MSN, Xbox Live, or Microsoft 365. After you create Microsoft account, you can access consumer-related Microsoft cloud services or Azure.

1. Work account issued by admin for business use provides access to all small, medium, and enterprise business-level Microsoft cloud services, such as Azure, Microsoft Intune, or Microsoft 365. After you sign in  to one of these services as an organization, you can access cloud-based directory provisioned in (AAD) Azure Active Directory to represent your organization. For more information, see [Authenticate Microsoft Teams tab](../tabs/how-to/authentication/auth-tab-aad.md).

1. Visual Studio ID created for Visual Studio Professional or Enterprise subscriptions helps you to join the developer program within the Visual Studio Gallery. You can use full benefits as a Visual Studio subscriber.

## Upload and sideLoad app

You can sideload app within your Teams. To ensure you have a Teams account, verify if you can sideload apps in Teams:

1. Select Apps from the Teams client.

1. Select upload a custom app.

![Upload custom app](~/assets/images/teams-toolkit-v2/upload-custom-app-closeup.png)

You need sideloading permission for your account before you start any debugging for your Teams app. Without the permission, you won’t be able to debug locally or through remote.

## Customize app upload and sideload.

**To turn on custom app uploading or sideloading for your developer tenant.**

1. Sign in to Microsoft 365 admin center with your admin credentials.

1. Select **Show All**
1. Select **Teams**

![Custom app uploading](~/assets/images/tools-and-sdks/custom-app-uploading.png)

> [!Note]

> * It can take up to 24 hours for the Teams option to appear. You can upload your custom app to a Teams environment for testing and validation in that time.
> * Navigate to Teams apps
> * Setup policies
> * Global

![Setup-global-policies](~/assets/images/tools-and-sdks/global-setup-policies.png)

1. Toggle **Upload custom apps** switch.

1. Select **Save**.

Your test tenant permits custom app sideloading.

>[!Note]
> It can take up to 24 hours for sideloading. In the interim, you can use upload for your tenant to test your app. To upload the .zip package file of the app, see [upload your app in Microsoft Teams](../concepts/deploy-and-publish/apps-upload.md) and ![list of custom apps](~/assets/images/tools-and-sdks/list-custom-apps.png)

## See also

* [Debug using Teams Toolkit](teams-toolkit-debug.md)
* [Publish Teams apps using Teams Toolkit](teams-toolkit-publish.md)
* [Manifest editor](manifest-editor.md)