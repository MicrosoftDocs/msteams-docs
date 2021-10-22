---
title: Account
author: Rajeshwari-v
description:  Describes about account
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: Account
---

# Account

## Account related prerequisite for Teams app development

To develop a Teams app, at least one Microsoft 365 account with a valid subscription is needed. If you want to host your backend resources on Azure, an Azure account is also needed. Azure account is optional if your existing application is hosted on other cloud provider and just want to integrate the existing application to Teams platform.

[Better have two icon here]

## Microsoft 365 Account

If you don’t have an existing Microsoft 365 account with a valid subscription, you can create one by joining the Microsoft 365 developer program. The Microsoft 365 Developer Program includes a Microsoft 365 E5 developer subscription that you can use to create your own sandbox and develop solutions independent of your production environment.  

## Azure Account

If you wish to host your app related resources or access resources within Azure, you must have an Azure subscription. You can create a free account before you begin.

Join Microsoft 365 Developer program and create your development environment

If you do not have a Microsoft 365 account, you must sign up for a Microsoft 365 Developer Program subscription. The subscription is free for 90 days and continues to renew as long as you are using it for development activity. If you have a Visual Studio Enterprise or Professional subscription, both programs include a free Microsoft 365 developer subscription. It is active as long as your Visual Studio subscription is active. For more information, see set up a Microsoft 365 developer subscription.  

To set up a subscription, you must first join the Microsoft 365 Developer Program. Microsoft 365 developer subscription can be used to build your solutions independent of your production environment. The subscription is a Microsoft 365 E5 Developer subscription with 25 user licenses. It lasts for 90 days and is free to use for development purposes (coding solutions) only. 

## Microsoft 365 developer program

1. Go to the Microsoft 365 developer program.
1. Select Join Now and follow the onscreen instructions.
1. In the welcome screen, select Set up E5 subscription.
1. Set up your administrator account. After you finish, you should see a screen like this.

![Microsoft 365 developer program](~/assets/images/teams-toolkit-v2/microsoft365-developer-program.png)

## What account can I use to sign up for the Microsoft 365 Developer Program?

You can sign up for the developer program by using one of the following account types:

1. Microsoft account (created by you for personal use) - Provides access to all consumer-oriented Microsoft products and cloud services, such as Outlook (Hotmail), Messenger, OneDrive, MSN, Xbox Live, or Microsoft 365. Signing up for an Outlook.com mailbox automatically creates a Microsoft account. After a Microsoft account is created, it can be used to access consumer-related Microsoft cloud services or Azure.

1. Work account (issued by an admin for business use) - Provides access to all small, medium, and enterprise business-level Microsoft cloud services, such as Azure, Microsoft Intune, or Microsoft 365. When you sign up to one of these services as an organization, a cloud-based directory is automatically provisioned in Azure Active Directory to represent your organization. For more information, see Manage your Azure AD directory.

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