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

To develop a Teams app, you will require a Microsoft 365 account with a valid subscription. As a best practice, this should be separate from your production tenant. If you want to host your backend resources on Azure, you also need an Azure account.

## Use Visual Studio subscription

If you have a Visual Studio Enterprise or Professional subscription, both programs include a free Microsoft 365 [developer subscription](https://aka.ms/MyVisualStudioBenefits). It is active as long as your Visual Studio subscription is active.

## Join the Microsoft 365 developer program

If you don’t have an existing Microsoft 365 account with a valid subscription, you can create one by joining the [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program). This includes a Microsoft 365 E5 developer subscription that you can use to create your own sandbox and develop solutions independent of your production environment. For more information, see [set up a Microsoft 365 developer subscription](https://developer.microsoft.com/microsoft-365/dev-program).

The subscription is free for 90 days and continues to renew as long as you are using it for development activity. 

1. Go to the [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program).
2. Select **Join Now**.
3. Select **Set up E5 subscription**.
4. Set up your administrator account. After you finish, you should see the following screen:

:::image type="content" source="./images/m365-developer-program.png" alt-text="Diagram that shows Microsoft 365 program":::

## Accounts for Microsoft 365 developer subscription

You can sign up for the developer program by using one of the following account types:

- **Microsoft account for personal use** 

Provides access to all consumer oriented Microsoft products and cloud services, such as Outlook, Messenger, OneDrive, MSN, Xbox Live, or Microsoft 365. Signing up for an Outlook.com mailbox automatically creates a Microsoft account. After a Microsoft account is created, it can be used to access consumer-related Microsoft cloud services or Azure.

- **Work account for business**

  Provides access to all small, medium, and enterprise business-level Microsoft cloud services, such as Azure, Microsoft Intune, or Microsoft 365. When you sign up to one of these services as an organization, a cloud-based directory is automatically provisioned in Microsoft Azure Active Directory (Azure AD) to represent your organization.

- **Visual Studio ID**

You will have already created an ID if you use a Visual Studio Professional or Enterprise subscription. You can use this option to join the developer program from within the Visual Studio Gallery to get the full benefits as a Visual Studio subscriber.

## Azure account

If you want to host your app-related resources or access resources within Azure, you can [create a free account](https://azure.microsoft.com/free/) before you begin. Alternatively you could choose to host your backend resources using another cloud provider, or on your own servers as long as these are reachable from the public Internet.

## Teams customer app upload or sideload permission

> [!IMPORTANT]
> During development, you will want to load your app within Teams without distributing it to users. This is known as **sideloading**.

You can verify that the sideloading app permission is enabled using the following steps, either in Visual Studio Code or using the Teams client:

* **To use Visual Studio Code**

    1. Open **Visual Studio Code**.
    1. Select **Teams Toolkit** from left panel (if you don't see this option, make sure you have installed the Teams Toolkit extension).
    1. Select **Accounts** and log in to your Microsoft 365 account.
    1. Check whether you can see the option **Sideloading enabled** as shown in the image:

       :::image type="content" source="../assets/images/teams-toolkit-v2/sideloading.png" alt-text="Enable sideloading":::

* **To use the Teams client**

    1. Open **Microsoft Teams**.
    2. Select **Apps** in left bar.
    3. Select **Publish an app**.

       :::image type="content" source="../assets/images/teams-toolkit-v2/publish.png" alt-text="Publish an app":::

    4. Check whether you can see the option **Upload a custom app** as shown in the image:

       :::image type="content" source="../assets/images/teams-toolkit-v2/upload.png" alt-text="Upload a custom app":::

If you can't see **Upload a custom app** option, this indicates that you don't have permission for sideloading. You need to have this enabled so that you can carry out local or remote debugging. If you are a tenant admin, you can enable the sideloading setting for your tenant or organization in the Teams admin center, as described below. Otherwise you'll need to contact your tenant admin to ask them to enable sideloading.

## Enable custom app uploading for your organization

> [!IMPORTANT]
> To turn on custom app uploading or sideloading for your developer tenant, you must be the admin for your tenant.

1. Sign in to [Microsoft 365 admin center](https://admin.microsoft.com/Adminportal/Home?source=applauncher#/homepage#/) with your admin credentials.

2. Select **Show All** > **Teams**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/5.png" alt-text="show all":::

> [!NOTE]
> It can take **up to 24 hours** for the **Teams** option to appear. In the meantime, you can [upload your custom app to a Teams environment](/microsoftteams/upload-custom-apps) for testing and validation.

3. Navigate to **Teams apps** > **Setup Policies** > **Global**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/3.png" alt-text="set olicies":::

4. Toggle Upload custom apps to the **On** position.

   :::image type="content" source="../assets/images/teams-toolkit-v2/4.png" alt-text="toggle":::

5. Select **Save**. 

> [!Note]
> It can take up to 24 hours for sideloading to become active. In the meantime, you can use **upload for your tenant** to test your app. To upload the .zip package file of the app, see [upload custom apps](/microsoftteams/teams-app-setup-policies).

For more information, see [manage custom app policies and settings in Teams](/microsoftteams/teams-custom-app-policies-and-settings) and [manage app setup policies in Teams](/microsoftteams/teams-app-setup-policies).

## See also

* [Create a new Teams project](create-new-project.md)
* [Provision cloud resources](provision.md)
