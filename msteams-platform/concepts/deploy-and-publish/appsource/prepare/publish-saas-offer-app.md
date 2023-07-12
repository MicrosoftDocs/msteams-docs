---
title: Publish your app with SaaS offer
description: Learn how to configure the SaaS offer to your app and publish the app to Teams store.
author: v-preethah
ms.author: surbhigupta
ms.topic: how-to
ms.localizationpriority: high
ms.date: 07/11/2023
---

# Publish your app with the SaaS offer configuration

After the offer is live in the marketplace, you need to link the offer to your app and publish the updated app in the store. The customers can purchase paid apps from the marketplace.

:::image type="content" source="~/assets/images/saas-offer/monetize-flow6.png" alt-text="Diagram shows the process of creating a SaaS offer with publish stage highlighted.":::

For users to see your subscription plans in the Teams store, there are two ways you can link the published SaaS offer to your Teams app.

* Teams Developer Portal
* App manifest update

> [!NOTE]
> You need the Publisher ID and Offer ID from Microsoft partner Center to configure the SaaS offer to your app.

To configure from Teams Developer Portal, follow the given steps:

1. Go to the **Developer Portal** and select **Apps**.
1. On the **Apps** page, select the app you're linking the SaaS offer to.
1. Go to the Plans and pricing page and specify your publisher and offer IDs.
1. Select View to preview your SaaS offer's subscription plans.
1. If everything looks good, select **Save**.

To configure through app manifest:

Update the subscriptionOffer property in your app manifest.

   ```json
      "subscriptionOffer": {
        "offerId": "publisherId.offerId"  
        }
   ```

> [!NOTE]
> The subscriptionOffer property is supported in manifest schema version 1.10 or later.

For more information to map the paid functionality to your offer and publish, see [Map your Teams app](https://aka.ms/TMTG).

## Publish your app

You’ve created your SaaS offer and linked it to your Teams app—now it's time to publish your app to the Teams store. For complete instructions, see [publish your app to the Teams store](../publish.md).

> [!IMPORTANT]
>
> * Even if your app is already listed on the Teams store, you still must go through the store validation process again to include your SaaS offer.
> * Flat rate offers created without the Offer ID and Publisher ID in the app manifest should be updated and resubmitted for validation.
Once published, users will see a Buy a subscription option in the app details dialog when they try to add your app to Teams.

Once published, users see a **Buy a subscription** option in the app details dialog when they try to add your app to Teams.

## Post purchase

1. After activation, customer is redirected from landing page to Teams License Management.

1. Upon successful completion of subscription purchase, the customer is redirected to the app landing page for subscription activation. This is the existing experience for user purchasing [Monetized apps in Teams](https://aka.ms/TMTG).

1. After the customer activates the subscription purchase on landing page, customer is redirected to subscriptions page in Teams via a [redirect URL](https://teams.microsoft.com/_#/subscriptionManagement) link or button that the customer selects on the publisher landing page.

## Remove a SaaS offer from your app

If you unlink a SaaS offer included in your Teams store listing, you must republish your app to see the change in the store.

1. Go to the [Developer Portal](https://dev.teams.microsoft.com/) and select **Apps**.
1. On the **Apps** page, select the app you're removing the offer from.
1. Go to the **Plans and pricing** page and select **Revert**.
1. After the offer is unlinked, do the following to update your store listing:
   1. Select **Distribute > Publish to the Teams store**.
   1. Select **Open Partner Center** to begin the process of republishing your app without the offer.
