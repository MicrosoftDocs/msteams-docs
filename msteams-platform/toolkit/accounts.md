---
title: Prepare accounts to build Teams apps
author: zyxiaoyuer
description: In this module, Learn how to prepare accounts to build Teams apps with Microsoft 365 account and developer program. Azure account to host backend resources
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/14/2022
---
# Prepare accounts to build Teams apps

To create and upload a Teams app, you need to prepare the following accounts:

* [Microsoft 365 account with valid subscription](accounts.md#microsoft-365-account)
* [Azure account to host the backend resources on Azure](accounts.md#azure-account-to-host-backend-resources)

## Microsoft 365 account

To create a Microsoft 365 account, sign-up for a Microsoft 365 developer program subscription. The subscription is free for 90 days and continues to renew as long as you're using it for development activity.

If you have a Visual Studio Enterprise or Professional subscription, both programs include free Microsoft 365 [developer subscription](https://aka.ms/MyVisualStudioBenefits). It's active as long as your Visual Studio subscription is active. For more information, see [Microsoft 365 developer subscription](https://developer.microsoft.com/microsoft-365/dev-program).

### Microsoft 365 developer program

To get a free Teams developer account, join the Microsoft 365 developer program and follow the steps:

1. Go to the [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program).
2. Select **Join Now**.
3. Select **Set up E5 subscription**.
4. Set up your administrator account.

   You can see the following image after the completion of the subscription:

    :::image type="content" source="./images/m365-developer-program.png" alt-text="Diagram that shows Microsoft 365 program":::

### Microsoft 365 developer account types

You can sign-up for the developer program by using one of the following account types:

* **Microsoft account for personal use**

    The account provides access to Microsoft products and cloud services, such as Outlook, Messenger, OneDrive, MSN, Xbox Live, or Microsoft 365. You can sign-up for an Outlook.com mailbox to create a Microsoft account, which can be used to access consumer-related Microsoft cloud services or Azure.

* **Microsoft work account for business**

     The account provides access to all small, medium, and enterprise business-level Microsoft cloud services, such as Azure, Microsoft Intune, or Microsoft 365. When you sign-up to one of these services as an organization, a cloud-based directory is automatically provisioned in Azure AD to represent your organization.

* **Visual Studio user ID**

    The user ID for Visual Studio Professional or Enterprise subscription can be used to join the developer program within the Visual Studio Gallery to avail full benefits as a Visual Studio subscriber.

## Azure account to host backend resources

Azure account is optional if your existing application is hosted on other cloud provider and you want to integrate the existing application on Teams platform.

**Visual Studio ID**

If you want to host your application related resources or access resources within Azure, you can [create a free account](https://azure.microsoft.com/free/) before you begin. Alternatively you can select to host your backend resources using another cloud provider, or on your own servers if they're available from the public domain.

## Upload custom app

> [!IMPORTANT]
> After creating the app, you must load your app in Teams without distributing it. This process is known as **sideloading**.

   You can verify if the sideloading permission is enabled using either Visual Studio Code or Teams client.

* **Verify sideloading permission using Visual Studio Code**

    1. Open **Visual Studio Code**.
    2. Select **Teams Toolkit** from the left panel. If you're unable to see the option ensure that you have installed Teams Toolkit extension.
    3. Select **Accounts** and log in to your Microsoft 365 account.
    4. Check whether you can view the option **Sideloading enabled** as shown in the following image:

       :::image type="content" source="../assets/images/teams-toolkit-v2/sideloading.png" alt-text="Enable sideloading" border="true":::

* **Verify sideloading permission using Teams client**

    1. Open **Microsoft Teams**.
    2. Select **Apps** in left panel.
    3. Select **Publish an app**.

       :::image type="content" source="../assets/images/teams-toolkit-v2/publish2.png" alt-text="Publish an app" border="true":::

    4. Check whether you can see the option **Upload a custom app** as shown in the following image:

       :::image type="content" source="../assets/images/teams-toolkit-v2/upload2.png" alt-text="Upload a custom app" border="true":::

        If you are unable to view the option **Upload a custom app,** then it indicates that you don't have the required permission for sideloading.

        * For a tenant admin, enable the sideloading setting for your tenant or organization in the Teams admin center.
        * If you aren't a tenant admin, you'll need to contact your tenant admin to enable sideloading.

* **Upload custom app using admin center**

  > [!IMPORTANT]
  > To turn on custom app uploading or sideloading for your developer tenant, you must be the admin for your tenant.

  Perform the following steps to upload the custom app:

  1. Sign-in to [Microsoft 365 admin center](https://admin.microsoft.com/Adminportal/Home?source=applauncher#/homepage#/) with your admin credentials.

  2. Select **Show All** > **Teams**.

     :::image type="content" source="../assets/images/teams-toolkit-v2/5.png" alt-text="show all" border="true":::

     > [!Note]
     > It can take **up to 24 hours** for the **Teams** option to appear. You can [upload your custom app to a Teams environment](/microsoftteams/upload-custom-apps) for testing and validation.

  3. Go to **Teams apps** > **Setup policies**.

     :::image type="content" source="../assets/images/teams-toolkit-v2/3.png" alt-text="set policies":::

  4. Set toggle **Upload custom apps** to **On** position.

     :::image type="content" source="../assets/images/teams-toolkit-v2/4.png" alt-text="toggle":::

  5. Select **Save**.

     > [!Note]
     > It can take up to 24 hours for sideloading to become active. In the meantime, you can use **upload for your tenant** to test your app. To upload the .zip package file of the app, see [Upload custom apps](/microsoftteams/teams-app-setup-policies).

For more information, see [Manage custom app policies and settings in Teams](/microsoftteams/teams-custom-app-policies-and-settings) and [Manage app setup policies in Teams](/microsoftteams/teams-app-setup-policies).

## See also

* [Create a new Teams app using Teams Toolkit](create-new-project.md)
* [Provision cloud resources](provision.md)
* [Deploy Teams app to the cloud](deploy.md)
* [Publish your Teams app](../concepts/deploy-and-publish/appsource/publish.md)
* [Manage multiple environments](TeamsFx-multi-env.md)
