---
title: Prepare Accounts to Build Teams Apps
author: zyxiaoyuer
description:  Prepare Accounts to Build Teams Apps
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---


# Prepare Accounts to Build Teams Apps

To develop a Teams app, at least one Microsoft 365 account with a valid subscription is needed. If you want to host your backend resources on Azure, an Azure account is also needed. Azure account is optional if your existing application is hosted on other cloud provider and just want to integrate the existing application to Teams platform.

## MICROSOFT 365 ACCOUNT

If you don’t have an existing Microsoft 365 account with a valid subscription, you can create one by joining the [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program). The Microsoft 365 Developer Program includes a Microsoft 365 E5 developer subscription that you can use to create your own sandbox and develop solutions independent of your production environment.

## AZURE ACCOUNT

If you wish to host your app related resources or access resources **within Azure**, you must have an Azure subscription. You can [create a free account](https://azure.microsoft.com/free/) before you begin.

## Join Microsoft 365 Developer program and create your development environment

If you do not have a Microsoft 365 account, you must sign up for a [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program) subscription. The subscription is free for 90 days and continues to renew as long as you are using it for development activity. If you have a Visual Studio Enterprise or Professional subscription, both programs include a free Microsoft 365 [developer subscription](https://aka.ms/MyVisualStudioBenefits). It is active as long as your Visual Studio subscription is active. For more information, see [set up a Microsoft 365 developer subscription](https://docs.microsoft.com/office/developer-program/office-365-developer-program-get-started).

To set up a subscription, you must first join the Microsoft 365 Developer Program. Microsoft 365 developer subscription can be used to build your solutions independent of your production environment. The subscription is a Microsoft 365 E5 Developer subscription with 25 user licenses. It lasts for 90 days and is free to use for development purposes (coding solutions) only.

1. Go to the [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program).
2. Select **Join Now** and follow the onscreen instructions.
3. In the welcome screen, select **Set up E5 subscription**.
4. Set up your administrator account. After you finish, you should see a screen like this.

:::image type="content" source="./images/m365-developer-program.png" alt-text="Diagram that shows microsoft m365 program":::

## What account can I use to sign up for the Microsoft 365 Developer Program?

You can sign up for the developer program by using one of the following account types:

- **Microsoft account** (created by you for personal use) - Provides access to all consumer-oriented Microsoft products and cloud services, such as Outlook (Hotmail), Messenger, OneDrive, MSN, Xbox Live, or Microsoft 365. Signing up for an Outlook.com mailbox automatically creates a Microsoft account. After a Microsoft account is created, it can be used to access consumer-related Microsoft cloud services or Azure.

- **Work account**(issued by an admin for business use) - Provides access to all small, medium, and enterprise business-level Microsoft cloud services, such as Azure, Microsoft Intune, or Microsoft 365. When you sign up to one of these services as an organization, a cloud-based directory is automatically provisioned in Azure Active Directory to represent your organization. For more information, see [Manage your Azure AD directory](https://docs.microsoft.com/azure/active-directory/active-directory-administer).

- **Visual Studio ID**(created for your Visual Studio Professional or Enterprise subscriptions) - We recommend that you use this option to join the developer program from within the Visual Studio Gallery to get the full benefits as a Visual Studio subscriber.

## Teams customer app uploading (sideloading permission) check

> [!IMPORTANT]
> During development, you must load your app within your Teams without distributing it. This is known as **sideloading**.

One of the ways to check if you have a Teams account, verify if you can sideload apps in Teams:

1. In the Teams client, select `Apps` in left bar.
2. Select `Manage your apps`.
3. Check whether you can see the option `Upload a custom app`.

:::image type="content" source="./images/sideload-check.png" alt-text="Diagram that shows to upload a custom app":::

If you cannot see Upload a custom app option, this indicates that you don't have sideloading permission.
Without sideloading permission, you won’t be able to do any local/remote debugging. So it’s very important to get the sideloading permission for your account before you do any debugging for your Teams app. If you are admin for your tenant, you can open the sideloading setting for your tenant/organization, while if you are not admin, please contact your tenant admin for the permission.

## Enable custom app uploading (sideloading) setting for your organization

> [!IMPORTANT]
> Note: To turn on the custom app uploading or sideloading for your developer tenant, you must be the admin for your tenant.

1. Sign in to [Microsoft 365 admin center](https://admin.microsoft.com/Adminportal/Home?source=applauncher#/homepage#/) with your admin credentials.

2. Select Show All > Teams.

:::image type="content" source="./images/admin-center-teams.png" alt-text="Diagram that shows Teams admin center":::

> [!NOTE]
It can take **up to 24 hours** for the **Teams** option to appear. You can [upload your custom app to a Teams environment](https://docs.microsoft.com/microsoftteams/upload-custom-apps#validate) for testing and validation in that time.

3. Navigate to Teams apps > Setup Policies > Global.

:::image type="content" source="./images/teams-setup-policy.png" alt-text="Diagram that shows setup policy for Teams":::

4. Toggle Upload custom apps to the On position.

:::image type="content" source="./images/turn-on-sideload.png" alt-text="Diagram that shows to turn on sideload":::

5. Select Save. Your test tenant can permit custom app sideloading.

:::image type="content" source="./images/save-sideload.png" alt-text="Diagram that shows save option":::

 Note
It can take up to **24 hours** for the sideloading to be active. In the interim, you can use **upload for <your tenant>** to test your app. To upload the .zip package file of the app, see [upload custom apps](https://docs.microsoft.com/microsoftteams/upload-custom-apps#upload).

For complete information on how these settings interact, see [manage custom app policies and settings in Teams](https://docs.microsoft.com/microsoftteams/teams-custom-app-policies-and-settings) and [manage app setup policies in Teams](<https://docs.microsoft.com/microsoftteams/teams-app-setup-policies>.

## See Also

> [!div class="nextstepaction"]
> [Create new Teams project](create-new-project.md)

> [!div class="nextstepaction"]
> [Provision cloud resources](provision.md)
