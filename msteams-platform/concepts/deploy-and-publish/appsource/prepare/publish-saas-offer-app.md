---
title: Publish the app with SaaS offer to Teams Store
description: Learn how to configure the SaaS offer to your app and publish the app to the Microsoft Teams Store.
author: v-preethah
ms.author: surbhigupta
ms.topic: how-to
ms.localizationpriority: high
ms.date: 07/11/2023
---

# Publish the app with SaaS offer

:::row:::
   :::column:::
      :::image type="icon" source="~/assets/images/saas-offer/monetize-flow1.png" link="include-saas-offer.md" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="~/assets/images/saas-offer/monetize-flow2.png" link="prerequisites.md" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="~/assets/images/saas-offer/monetize-flow3.png" link="create-saas-offer.md" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="~/assets/images/saas-offer/monetize-flow5.png" link="Test-preview-for-monetized-apps.md" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="~/assets/images/saas-offer/monetize-flow6a.png" link="publish-saas-offer-app.md" border="false":::
   :::column-end:::
:::row-end:::

When the SaaS offer is successfully tested, you can push the offer to go live. After the offer is published live, you must link the offer to your SaaS app and publish the subscriptions to the Store.

This article walks you through offer go live, configuring the offer to the app, and publishing the monetized app.

## Go live

Upon successful testing, your offer is now ready to go live.

After testing the offer, go live gets you app to be published in the marketplace. The pointers given below helps you understand the phases in the go live stage.

* Click **Go live** Initiate the validation checks for your offer before publishing.
* Keep track of the publishing status on the **Offer overview** page.
* In case of validation errors, rectify them and resubmit your offer for publishing. These errors could range from missing information to non-compliance with marketplace standards.
* Upon successful validation, the offer is published live in the marketplace.
* Post-publication, link your live SaaS offer to your SaaS app. Subsequently, publish the subscriptions to the Store.

For a comprehensive understanding of validation and certification, check [Review and publish offers](/partner-center/marketplace/review-publish-offer).

## Configure SaaS offer to your app

For the users to view your subscription plan in the Teams Store, link the published SaaS offer from Partner Center to your app. There are two ways you can link the offer to your Teams app.

* Teams Developer Portal
* App manifest update

> [!NOTE]
> You need the publisher ID and offer ID from Partner Center to configure the SaaS offer to your app.

To configure from Teams Developer Portal, follow the given steps:

1. Go to **Developer Portal** and select **Apps**.
1. On the **Apps** page, select the app you're linking the SaaS offer to.
1. Go to the **Plans and pricing** page and specify your publisher ID and offer ID.
1. Select **View** to preview your SaaS offer's subscription plans.
1. If everything looks good, select **Save**.

To configure through app manifest:

Update the `subscriptionOffer` property in your app manifest.

   ```json
      "subscriptionOffer": {
        "offerId": "publisherId.offerId"  
        }
   ```

> [!NOTE]
> The `subscriptionOffer` property is supported in manifest schema version 1.10 or later.

For more information to map the paid functionality to your offer and publish, see [Map your Teams app](https://aka.ms/TMTG).

## Publish your app

After linking the offer to your app, you can submit your monetized app via Partner Center for validation and publishing. Perform the following prevalidation checks before submission.

* Ensure your app adheres to the [store validation guidelines](/microsoftteams/platform/concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines).
* [Prepare for store submission](/microsoftteams/platform/concepts/deploy-and-publish/appsource/prepare/submission-checklist).
* [Perform the required prechecks](/microsoftteams/platform/concepts/deploy-and-publish/appsource/publish) before submission.
* [Submit app for validation](/office/dev/store/add-in-submission-guide).

For complete instructions, see [publish your app to the Teams store](../publish.md).

> [!IMPORTANT]
>
> * Even if your app is already listed on the Teams Store, you still must go through the store validation process again to include your SaaS offer.
> * Flat rate offers created without the offer ID and publisher ID in the app manifest should be updated and resubmitted for validation.

Once published, users can view the **Buy a subscription** option in the app details dialog when they try to add your app to Teams.

The SaaS app with suitable offers is available in the Microsoft Teams Store for purchase where the users can purchase subscriptions from the Store or marketplace.

### Post purchase

1. Upon successful subscription purchase, the user is redirected to the app landing page for subscription activation. This is the existing experience for user purchasing [Monetized apps in Teams](https://aka.ms/TMTG).

1. After the user activates the subscription purchase on the landing page, the user is redirected to the subscription page in Teams via a [redirect URL](https://teams.microsoft.com/_#/subscriptionManagement) link or button that the user selects on the publisher landing page.

## License management

After activating the subscription, the user is redirected from the landing page to Teams license management. Microsoft manages licenses on your behalf if you've opted for the same during offer configuration.

For more information on license management, see [manage app licenses](end-user-purchase-experience.md#license-management-experience).

## Remove a SaaS offer from your app

If you unlink a SaaS offer included in your Teams Store listing, you must republish your app to see the change in the Teams Store.

1. Go to the [Developer Portal](https://dev.teams.microsoft.com/) and select **Apps**.
1. On the **Apps** page, select the app you're removing the offer from.
1. Go to the **Plans and pricing** page and select **Revert**.
1. After unlinking the offer, do the following steps to update your store listing:
   1. Select **Distribute** > **Publish to the Teams store**.
   1. Select **Open Partner Center** to begin the process of republishing your app without the offer.

## Code sample

| **Sample name** | **Description** | **Node.js** | **Manifest**|
|-----------------|-----------------|----------------|----------------|----------------|
| Tab App Monetization | This is a sample tab application that shows how to open a purchase dialog and trigger purchase flow using Teams JS SDK.|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-app-monetization/nodejs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-app-monetization/nodejs/demo-manifest/tab-app-monetization.zip)|

## See also

* [Monetize your app](monetize-overview.md)
* [Submit your app](/partner-center/marketplace/add-in-submission-guide?toc=%2Fmicrosoftteams%2Fplatform%2Ftoc.json&bc=%2Fmicrosoftteams%2Fplatform%2Fbreadcrumb%2Ftoc.json)
* [Maintaining and supporting your published app](../post-publish/overview.md)
* [Purchase and manage subscriptions and licenses](end-user-purchase-experience.md)
