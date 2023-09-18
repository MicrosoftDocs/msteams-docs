---
title: Publish a monetized app to Teams store
description: Learn how to configure the SaaS offer to your app and publish the app to Teams store.
author: v-preethah
ms.author: surbhigupta
ms.topic: how-to
ms.localizationpriority: high
ms.date: 07/11/2023
---

# Publish the monetized app to Teams store

When the SaaS offer that you created is published live, you must link the offer to your SaaS app and publish the subscriptions in the store. This article helps you to configure your SaaS offer to the app and publish the monetized app in the marketplace. The SaaS app with the offer is available in the store for purchase where the users can purchase subscriptions from the store or marketplace.

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
      :::image type="icon" source="~/assets/images/saas-offer/monetize-flow4.png" link="manage-third-party-apps-license.md" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="~/assets/images/saas-offer/monetize-flow5.png" link="Test-preview-for-monetized-apps.md" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="~/assets/images/saas-offer/monetize-flow6a.png" link="publish-saas-offer-app.md" border="false":::
   :::column-end:::
:::row-end:::

## Configure SaaS offer to your app

For users to see your subscription plan in the Teams store, you need to configure the SaaS offer created and published from Partner Center to your app. There are two ways you can link the published SaaS offer to your Teams app.

* Teams Developer Portal
* App manifest update

> [!NOTE]
> You need the publisher ID and offer ID from Partner Center to configure the SaaS offer to your app.

To configure from Teams Developer Portal, follow the given steps:

1. Go to the **Developer Portal** and select **Apps**.
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

After linking the offer to your app, you can now publish your app to the Teams store. Before you publish your monetized app, do the following checks.

* Ensure your app adheres to the [store validation guidelines](/microsoftteams/platform/concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines?branch=main).
* [Prepare for store submission](/microsoftteams/platform/concepts/deploy-and-publish/appsource/prepare/submission-checklist?branch=main&tabs=desktop).
* [Perform the required prechecks](/microsoftteams/platform/concepts/deploy-and-publish/appsource/publish?branch=pr-en-us-8990) before submission.
* [Submit app for validation](/office/dev/store/add-in-submission-guide).

For complete instructions, see [publish your app to the Teams store](../publish.md).

> [!IMPORTANT]
>
> * Even if your app is already listed on the Teams store, you still must go through the store validation process again to include your SaaS offer.
> * Flat rate offers created without the offer ID and publisher ID in the app manifest should be updated and resubmitted for validation.

Once published, users can view the **Buy a subscription** option in the app details dialog when they try to add your app to Teams.

### Post purchase

1. Upon successful subscription purchase, the user is redirected to the app landing page for subscription activation. This is the existing experience for user purchasing [Monetized apps in Teams](https://aka.ms/TMTG).

1. After the user activates the subscription purchase on the landing page, the user is redirected to the subscription page in Teams via a [redirect URL](https://teams.microsoft.com/_#/subscriptionManagement) link or button that the user selects on the publisher landing page.

## License management

After activating the subscription, the user is redirected from the landing page to Teams license management. Microsoft manages licenses on your behalf if you've opted for the same during offer configuration.

Based on the subscriptions the user purchase, the licenses are available. Here are some best practices you can implement for license management.

* With transactable SaaS offers for Teams apps, subscription plans (licenses) should be assigned to individual users rather than groups or an entire org.
* When users are assigned a subscription plan, notify them through a Teams bot or email. In the messaging, include information on how to add the app to Teams and get started.
* Support the idea of multiple admins. In other words, multiple users in the same org can purchase and manage their subscriptions.

For more information on license management, see [manage app licenses](/microsoftteams/purchase-third-party-apps).

### Check license usage in Partner Center analytics

1. Sign in to [Partner Center](https://partner.microsoft.com/).
1. In the left pane, go to **Commercial Marketplace** > **Analyze** > **Licensing**.
1. Select **Plan and Tenant** in the reporting widget to see the month-wise usage.

## Remove a SaaS offer from your app

If you unlink a SaaS offer included in your Teams store listing, you must republish your app to see the change in the store.

1. Go to the [Developer Portal](https://dev.teams.microsoft.com/) and select **Apps**.
1. On the **Apps** page, select the app you're removing the offer from.
1. Go to the **Plans and pricing** page and select **Revert**.
1. After unlinking the offer, do the following steps to update your store listing:
   1. Select **Distribute** > **Publish to the Teams store**.
   1. Select **Open Partner Center** to begin the process of republishing your app without the offer.

## See also

* [Monetize your app](monetize-overview.md)
* [Prepare your Teams store submission](submission-checklist.md)
* [Microsoft Teams store validation guidelines](teams-store-validation-guidelines.md)
* [Submit your app](/partner-center/marketplace/add-in-submission-guide?toc=%2Fmicrosoftteams%2Fplatform%2Ftoc.json&bc=%2Fmicrosoftteams%2Fplatform%2Fbreadcrumb%2Ftoc.json)
* [Purchase and manage subscriptions and licenses](end-user-purchase-experience.md)
