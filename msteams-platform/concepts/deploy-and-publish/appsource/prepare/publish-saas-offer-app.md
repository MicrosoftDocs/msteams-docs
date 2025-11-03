---
title: Publish SaaS app to Teams Store
description: Learn how to configure the SaaS offer to your app and publish the app to the Microsoft Teams Store and how to remove a SaaS offer.
author: v-preethah
ms.author: surbhigupta
ms.topic: how-to
ms.localizationpriority: high
ms.date: 11/26/2024
---

# Publish your SaaS app

After you create and test a software as a service (SaaS) offer, submit the offer to [go live](/partner-center/marketplace/test-publish-saas-offer). Upon successful validation, the offer is published live in the Microsoft commercial marketplace. You can then link the live SaaS offer to your Microsoft Teams app and publish the SaaS app.

:::image type="content" source="../../../../assets/images/saas-offer/go-live-publish.png" alt-text="Screenshot shows the Go live and offer publishing phase.":::

## Configure SaaS offer to your app

For the users to view your subscription plan in Microsoft Teams Store, link the published SaaS offer to your app that's published from Microsoft Partner Center. There are two ways you can link the SaaS offer to your Teams app:

* Developer Portal for Teams
* App manifest

> [!NOTE]
> You need the publisher ID and offer ID from Partner Center to configure the SaaS offer to your app.

**To configure from Developer Portal for Teams**:

1. Go to **Developer Portal** and select **Apps**.
1. On the **Apps** page, select the app you're linking the SaaS offer to.
1. Go to the **Plans and pricing** page and specify your publisher ID and offer ID.
1. Select **View** to preview your SaaS offer's subscription plans.
1. If everything looks good, select **Save**.

**To configure through app manifest**:

Update the `subscriptionOffer` property in your app manifest.

   ```json
      "subscriptionOffer": {
        "offerId": "publisherId.offerId"  
        }
   ```

> [!NOTE]
> The `subscriptionOffer` property is supported in manifest schema version 1.10 or later.

For more information to map the paid functionality to your offer and publish, see [map your Teams app](https://aka.ms/TMTG).

## Publish your app

After linking the offer to your app, you can submit your monetized app through Partner Center to validate and publish. Perform the prevalidation checks before submission. For more information, see [prepare to publish](/partner-center/marketplace-offers/checklist) and [store step-by-step submission guide](/partner-center/marketplace/add-in-submission-guide?toc=%2Fmicrosoftteams%2Fplatform%2Ftoc.json&bc=%2Fmicrosoftteams%2Fplatform%2Fbreadcrumb%2Ftoc.json).

> [!IMPORTANT]
>
> * Even if your app is already listed on the Teams Store, you must still go through the validation process again to include your SaaS offer.
> * Flat rate offers created without the offer ID and publisher ID in the app manifest should be updated and resubmitted for validation.

After the SaaS app is published, users can view the **Buy a subscription** option in the app details dialog when the user adds your app to Teams. SaaS app with suitable offers is available in the Teams Store to purchase subscriptions.

:::image type="content" source="~/assets/images/saas-offer/buysubscriptionplan.png" alt-text="Screenshot shows buying the subscription for the selected app.":::

### Post purchase

* Upon successful subscription purchase, the user is redirected to the app landing page for subscription activation. To check the existing experience for user purchase, see [monetized apps in Teams](https://aka.ms/TMTG).

* After the user activates the subscription purchase on the landing page, the user is redirected to the subscription page in Teams via a [redirect URL](https://teams.microsoft.com/_#/subscriptionManagement) that the user selects on the publisher landing page.

* Microsoft manages licenses on your behalf if you opted for the same during offer configuration. After the subscription activation, the user is redirected from the landing page to Teams license management. For more information, see [manage app licenses](end-user-purchase-experience.md#license-and-subscriptions-management-experience).

## Remove a SaaS offer from your app

If you decide to unlink your SaaS offer from the app, follow these steps:

1. Sign in to [Developer Portal](https://dev.teams.microsoft.com/) and select **Apps**.
1. On the **Apps** page, select the app to remove the offer.
1. Go to the **Plans and pricing** page and select **Revert**.

After unlinking the offer, perform the following steps to update your Teams Store listing:

1. Select **Distribute** > **Publish to the Teams Store**.
1. Select **Open Partner Center** to begin the process of republishing your app without the offer.

If you unlink a SaaS offer included in your Teams Store listing, you must republish your app to see the change in the Teams Store.

## See also

* [Prepare for store submission](submission-checklist.md)
* [Maintaining and supporting your published app](../post-publish/overview.md)
* [Validation guidelines for apps linked to SaaS offer](teams-store-validation-guidelines.md#apps-linked-to-saas-offer)
* [Submit app for validation](/office/dev/store/add-in-submission-guide)
* [Purchase and manage subscriptions and licenses](end-user-purchase-experience.md)
