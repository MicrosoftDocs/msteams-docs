---
title: Publish your app with SaaS offer configuration
description: Learn how to configure the SaaS offer to your app and publish the app to Teams store.
author: v-preethah
ms.author: surbhigupta
ms.topic: how-to
ms.localizationpriority: high
ms.date: 07/11/2023
---

# Publish your app with the SaaS offer configuration

After publishing the offer to the marketplace, you need to link the offer to your app and publish the app in the store. The customers can purchase paid apps from the marketplace.

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

## Publish your app

You’ve created your SaaS offer and linked it to your Teams app—now it's time to publish your app to the Teams store. For complete instructions, see [publish your app to the Teams store](../publish.md).

> [!IMPORTANT]
>
> * Even if your app is already listed on the Teams store, you still must go through the store validation process again to include your SaaS offer.
> * Flat rate offers created without the Offer ID and Publisher ID in the app manifest should be updated and resubmitted for validation.
Once published, users will see a Buy a subscription option in the app details dialog when they try to add your app to Teams.

Once published, users see a **Buy a subscription** option in the app details dialog when they try to add your app to Teams.

## Remove a SaaS offer from your app

If you unlink a SaaS offer included in your Teams store listing, you must republish your app to see the change in the store.

1. Go to the [Developer Portal](https://dev.teams.microsoft.com/) and select **Apps**.
1. On the **Apps** page, select the app you're removing the offer from.
1. Go to the **Plans and pricing** page and select **Revert**.
1. After the offer is unlinked, do the following to update your store listing:
   1. Select **Distribute > Publish to the Teams store**.
   1. Select **Open Partner Center** to begin the process of republishing your app without the offer.

Benefits of choosing a SaaS offer
