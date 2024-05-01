---
title: Prepare your Microsoft 365 tenant
description: In this module, learn how to get started with Teams in Microsoft 365 and create your development environment
ms.topic: how-to
ms.localizationpriority: medium
ms.date: 01/31/2023
---

# Prepare your Microsoft 365 tenant

Microsoft 365 subscribers can develop apps for Microsoft Teams with one of the following plans:

* Basic
* Standard
* Enterprise E1, E3, and E5
* Developer
* Education, Education Plus, and Education E5

> [!NOTE]
>
> * For more information on Microsoft 365 subscriptions, see [plans](https://products.office.com/business/compare-more-office-365-for-business-plans).
> * Teams is also available to customers who subscribed to E4 prior to its [retirement](https://support.office.com//article/important-information-for-office-365-enterprise-e4-customers-f9572348-43a2-43fa-a3d8-3b6c9c042147).

## Create your development environment

If you have a Visual Studio Enterprise or Professional subscription, both programs include a free Microsoft 365 [developer subscription](https://aka.ms/MyVisualStudioBenefits). It's active as long as your Visual Studio subscription is active. For more information, see [Microsoft 365 developer subscription](https://developer.microsoft.com/microsoft-365/dev-program).

If you don't have any Microsoft 365 tenant, you might qualify for a Microsoft 365 E5 developer subscription through the [Microsoft 365 Developer Program](https://aka.ms/m365devprogram); for details, see the [FAQ](/office/developer-program/microsoft-365-developer-program-faq#who-qualifies-for-a-microsoft-365-e5-developer-subscription-). Alternatively, you can sign up for a [1-month free trial](https://www.microsoft.com/microsoft-365/try) or [purchase a Microsoft 365 plan](https://www.microsoft.com/microsoft-365/business/compare-all-microsoft-365-business-products-g).

## Enable Teams for your organization

Enable Teams for your organization and for more information, see [enabling Teams for your organization](/microsoftteams/enable-features-office-365).

## Enable custom Teams apps and turn on custom app uploading

> [!IMPORTANT]
> If you've set up a Microsoft 365 Developer Program instant sandbox or a configurable sandbox with the Teams sample data pack, you can skip the steps to enable custom app upload. The **Upload custom apps** setting is enabled by default in the Teams sample data pack.

To turn on the custom app uploading for your developer tenant:

1. Sign in to [Microsoft Teams admin center](https://admin.teams.microsoft.com/dashboard) with your admin credentials.

    :::image type="content" source="../../assets/images/prepare-test-tenant/admin-center-menu.png" alt-text="Screenshot shows the Teams admin center menu.":::

    > [!Note]
    > It can take up to 24 hours for the **Teams** option to appear. You can [upload your custom app to a Teams environment](/microsoftteams/upload-custom-apps#validate) for testing and validation in that time.

2. Go to **Teams apps** > **Setup Policies** > **Global**.

    :::image type="content" source="../../assets/images/prepare-test-tenant/turn-on-sideload.png" alt-text="Screenshot shows the turn on custom app upload view.":::

3. Toggle **Upload custom apps** to the **On** position.

4. Select **Save**. Your test tenant can permit custom app upload.

    > [!Note]
    > It can take up to 24 hours for the custom app upload to be active. In the interim, you can use **upload for \<your tenant>** to test your app. To upload the .zip package file of the app, see [upload custom apps](/microsoftteams/upload-custom-apps#upload).

    :::image type="content" source="../../assets/images/prepare-test-tenant/upload-for-contoso.png" alt-text="Screenshot shows the upload app view.":::

5. Go to **Teams apps** > **Manage apps** > **Org-wide app settings** > **Custom apps** and turn on the
   **Upload custom apps for personal use** toggle.

    :::image type="content" source="../../assets/images/prepare-test-tenant/Org-wide-app-settings.png" alt-text="Screenshot shows the org-side app settings for custom app upload.":::

For complete information on how these settings interact, see [manage custom app policies and settings in Teams](/microsoftteams/teams-custom-app-policies-and-settings) and [manage app setup policies in Teams](/microsoftteams/teams-app-setup-policies).

## Next step

> [!div class="nextstepaction"]
> [Choose a test setup](~/concepts/build-and-test/debug.md)

## See also

* [Test your app](test-app-overview.md)
* [Add test data to your Microsoft 365 test tenant](~/concepts/build-and-test/test-data.md)
* [Microsoft 365 Multi-Geo](/microsoft-365/enterprise/microsoft-365-multi-geo?view=o365-worldwide&preserve-view=true)
