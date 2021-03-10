---
title: Prepare your Microsoft 365 tenant
description: How to get started with Teams in Microsoft 365
ms.topic: how-to
keywords: Configure Microsoft 365 tenant Teams uploading
---
# Prepare your Microsoft 365 tenant

If you are a Microsoft 365 subscriber, you can develop apps for Microsoft Teams with one of the following [plans](https://products.office.com/business/compare-more-office-365-for-business-plans):

* Basic
* Standard
* Enterprise E1, E3, and E5
* Developer
* Education, Education Plus, and Education E5

Microsoft Teams is also available to customers who subscribed to E4 prior to its [retirement](https://support.office.com//article/important-information-for-office-365-enterprise-e4-customers-f9572348-43a2-43fa-a3d8-3b6c9c042147).

## Create your development environment

If you do not have a Microsoft 365 account, you must sign up for a [Microsoft 365 Developer Program](https://developer.microsoft.com/microsoft-365/dev-program) subscription. The subscription is free for 90 days and continues to renew as long as you are using it for development activity. If you have a Visual Studio Enterprise or Professional subscription, both programs include a free Microsoft 365 [developer subscription](https://aka.ms/MyVisualStudioBenefits). It is active for the life of your Visual Studio subscription. See [Set up a Microsoft 365 developer subscription](https://docs.microsoft.com/office/developer-program/office-365-developer-program-get-started).

## Enable Microsoft Teams for your organization

If Microsoft Teams has not been enabled for your organization, you need to do that first. Take a look at our detailed guidance for [enabling Teams for your organization](/microsoftteams/enable-features-office-365).

## Enable custom Teams apps and turn on custom app uploading

Turn on the custom app uploading or sideloading for your developer tenant:

1. Login to [Microsoft 365 admin center](https://admin.microsoft.com/Adminportal/Home?source=applauncher#/homepage#/) with your admin credential.

2. Select **Show All** > **Teams**. 

![image of admin center menu](~/assets/images/prepare-test-tenant/admin-center.png)

> [!Note]
> It can take up to 24 hours for the **Teams** option to appear. During interim, you can [upload your custom app to a Teams environment](/microsoftteams/upload-custom-apps#validate) for testing and validation.

3. Navigate to **Teams apps** > **Setup Policies** > **Global(Org-wide default)**  

![turn on sideload view](~/assets/images/prepare-test-tenant/turn-on-sideload.png)

4. Toggle **upload custom apps** to the **on** position.

5. Select **Save** to save the changes.

That's it! Your test tenant can permit custom app sideloading.

> [!Note]
> It can take up to 24 hours before sideloading is enabled. During interim, you can use **upload for \<your tenant>** to test your app.

![updload app view](~/assets/images/prepare-test-tenant/upload-for-contoso.png)

For complete information on how these settings interact, See [Manage custom app policies and settings in Microsoft Teams](https://docs.microsoft.com/microsoftteams/teams-custom-app-policies-and-settings) and [Manage app setup policies in Microsoft Teams](https://docs.microsoft.com/microsoftteams/teams-app-setup-policies).
