---
title: Prepare Accounts to Build Teams Apps
author: zyxiaoyuer
description:  Prepare Accounts to Build Teams Apps
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---


# Prepare accounts to build Teams apps

To develop Teams app, you require at least one Microsoft 365 account with valid subscription. If you want to host your backend resources on Azure, you need an Azure account. Azure account is optional if your existing application is hosted on other cloud provider and you want to integrate the existing application to Teams platform.

## Microsoft 365 account

If you don’t have an existing Microsoft 365 account with a valid subscription, you can create one by joining the [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program). The Microsoft 365 developer program includes a Microsoft 365 E5 developer subscription that you can use to create your own sandbox and develop solutions independent of your production environment.

## Azure account

If you want to host your app related resources or access resources within Azure, you must have an Azure subscription. You can [create a free account](https://azure.microsoft.com/free/) before you begin.

## Join Microsoft 365 developer program

If you don't have a Microsoft 365 account, you must sign up for a [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program) subscription. The subscription is free for 90 days and continues to renew as long as you are using it for development activity. If you have a Visual Studio Enterprise or Professional subscription, both programs include a free Microsoft 365 [developer subscription](https://aka.ms/MyVisualStudioBenefits). It is active as long as your Visual Studio subscription is active. For more information, see [set up a Microsoft 365 developer subscription](https://developer.microsoft.com/microsoft-365/dev-program).

1. Go to the [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program).
2. Select **Join Now**.
3. Select **Set up E5 subscription**.
4. Set up your administrator account. After you finish, you should see the following screen:

:::image type="content" source="./images/m365-developer-program.png" alt-text="Diagram that shows Microsoft 365 program":::

## Accounts for Microsoft 365 developer program

You can sign up for the developer program by using one of the following account types:

* **Microsoft account for personal use**

  Provides access to all consumer oriented Microsoft products and cloud services, such as Outlook, Messenger, OneDrive, MSN, Xbox Live, or Microsoft 365. Signing up for an Outlook.com mailbox automatically creates a Microsoft account. After a Microsoft account is created, it can be used to access consumer-related Microsoft cloud services or Azure.

* **Work account for business**

  Provides access to all small, medium, and enterprise business-level Microsoft cloud services, such as Azure, Microsoft Intune, or Microsoft 365. When you sign up to one of these services as an organization, a cloud-based directory is automatically provisioned in Microsoft Azure Active Directory (Azure AD) to represent your organization.

* **Visual Studio ID**

  You can create for your Visual Studio Professional or Enterprise subscriptions - We recommend that you use this option to join the developer program from within the Visual Studio Gallery to get the full benefits as a Visual Studio subscriber.

## Teams customer app upload or sideload permission

> [!IMPORTANT]
> During development, you must load your app within your Teams without distributing it. This is known as **sideloading**.

The following list provides steps to check whether sideloading app permission is enabled. The two different ways are as follows:

* **To use Microsoft Visual studio code**

    1. Open **Visual Studio Code**.
    1. Select **Teams Toolkit** from left panel.
    1. Select **Accounts** and log in to your Microsoft 365 account.
    1. Check whether you can see the option **Sideloading enabled** as shown in the image:

       :::image type="content" source="../assets/images/teams-toolkit-v2/sideloading.png" alt-text="Enable sideloading":::

* **To use Teams account**

    1. Open **Microsoft Teams**.
    2. Select **Apps** in left bar.
    3. Select **Publish an app**.

       :::image type="content" source="../assets/images/teams-toolkit-v2/publish.png" alt-text="Publish an app":::

    4. Check whether you can see the option **Upload a custom app** as shown in the image:

       :::image type="content" source="../assets/images/teams-toolkit-v2/upload.png" alt-text="Upload a custom app":::

If you can't see **Upload a custom app** option, this indicates that you don't have permission for sideloading. Without sideloading permission, you won’t be able to do any local or remote debugging. So it’s very important to get the sideloading permission for your account before you do any debugging for your Teams app. If you are admin for your tenant, you can open the sideloading setting for your tenant or organization. If you are not an admin, contact your tenant admin for the permission.

## Enable custom app uploading for your organization

> [!IMPORTANT]
> To turn on the custom app uploading or sideloading for your developer tenant, you must be the admin for your tenant.

1. Sign in to [Microsoft 365 admin center](https://admin.microsoft.com/Adminportal/Home?source=applauncher#/homepage#/) with your admin credentials.

2. Select **Show All** > **Teams**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/5.png" alt-text="show all":::

> [!NOTE]
> It can take **up to 24 hours** for the **Teams** option to appear. You can [upload your custom app to a Teams environment](/microsoftteams/upload-custom-apps) for testing and validation in that time.

3. Navigate to **Teams apps** > **Setup Policies** > **Global**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/3.png" alt-text="set olicies":::

4. Toggle Upload custom apps to the **On** position. This is as shown in the following image:

   :::image type="content" source="../assets/images/teams-toolkit-v2/4.png" alt-text="toggle":::

5. Select **Save**.

> [!Note]
> It can take up to 24 hours for the sideloading to be active. In the meantime, you can use **upload for your tenant** to test your app. To upload the .zip package file of the app, see [upload custom apps](/microsoftteams/teams-app-setup-policies).

For more information, see [manage custom app policies and settings in Teams](/microsoftteams/teams-custom-app-policies-and-settings) and [manage app setup policies in Teams](/microsoftteams/teams-app-setup-policies).

## See also

* [Create new Teams app](create-new-project.md)
* [Provision cloud resources](provision.md)
