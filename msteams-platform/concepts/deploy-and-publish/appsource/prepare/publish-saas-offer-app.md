---
title: Publish your monetized app with SaaS offer
description: Learn how to configure the SaaS offer to your app and publish the app to Teams store.
author: v-preethah
ms.author: surbhigupta
ms.topic: how-to
ms.localizationpriority: high
ms.date: 07/11/2023
---

# Publish your app with the integrated SaaS offer

When the offer is live, you can link the offer to your SaaS app and publish the subscriptions in the store. The SaaS app is now available in the store for purchase with the configured SaaS offers. The users can purchase paid apps from the marketplace.

:::image type="content" source="~/assets/images/saas-offer/monetize-flow6.png" alt-text="Diagram shows the process of creating a SaaS offer with publish stage highlighted.":::

## Configure SaaS offer to your app

For users to see your subscription plans in the Teams store, there are two ways you can link the published SaaS offer to your Teams app.

* Teams Developer Portal
* App manifest update

> [!NOTE]
> You need the publisher ID and offer ID from Microsoft Partner Center to configure the SaaS offer to your app.

To configure from Teams Developer Portal, follow the given steps:

1. Go to the **Developer Portal** and select **Apps**.
1. On the **Apps** page, select the app you're linking the SaaS offer to.
1. Go to the Plans and pricing page and specify your publisher and offer IDs.
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

After successfully linking the offer to your app, you can now publish your app to the Teams store. Before you publish your monetized app, do the following checks.

* Ensure your app adheres to the [store validation guidelines](/microsoftteams/platform/concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines?branch=main).
* [Prepare for store submission](/microsoftteams/platform/concepts/deploy-and-publish/appsource/prepare/submission-checklist?branch=main&tabs=desktop).
* [Perform the required pre-checks](/microsoftteams/platform/concepts/deploy-and-publish/appsource/publish?branch=pr-en-us-8990) before submission.
* [Submit app for validation](/office/dev/store/add-in-submission-guide).

For complete instructions, see [publish your app to the Teams store](../publish.md).

> [!IMPORTANT]
>
> * Even if your app is already listed on the Teams store, you still must go through the store validation process again to include your SaaS offer.
> * Flat rate offers created without the offer ID and publisher ID in the app manifest should be updated and resubmitted for validation.

Once published, users can view the **Buy a subscription** option in the app details dialog when they try to add your app to Teams.

## Post purchase

1. After activation, the user is redirected from the landing page to Teams License Management.

1. Upon successful subscription purchase, the user is redirected to the app landing page for subscription activation. This is the existing experience for user purchasing [Monetized apps in Teams](https://aka.ms/TMTG).

1. After the user activates the subscription purchase on the landing page, the user is redirected to the subscription page in Teams via a [redirect URL](https://teams.microsoft.com/_#/subscriptionManagement) link or button that the user selects on the publisher landing page.

## Remove a SaaS offer from your app

If you unlink a SaaS offer included in your Teams store listing, you must republish your app to see the change in the store.

1. Go to the [Developer Portal](https://dev.teams.microsoft.com/) and select **Apps**.
1. On the **Apps** page, select the app you're removing the offer from.
1. Go to the **Plans and pricing** page and select **Revert**.
1. After unlinking the offer, do the following steps to update your store listing:
   1. Select **Distribute > Publish to the Teams store**.
   1. Select **Open Partner Center** to begin the process of republishing your app without the offer.

## See also

* [Monetize your app](monetize-overview.md)
* [Prepare your Teams store submission](submission-checklist.md)
* [Submit your app](/partner-center/marketplace/add-in-submission-guide?toc=%2Fmicrosoftteams%2Fplatform%2Ftoc.json&bc=%2Fmicrosoftteams%2Fplatform%2Fbreadcrumb%2Ftoc.json)
* [Purchase and manage subscriptions and licenses](end-user-purchase-experience.md)
