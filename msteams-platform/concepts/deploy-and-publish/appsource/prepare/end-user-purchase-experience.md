---
title: Purchase and manage app subscriptions and licenses
description: Learn how to purchase, assign, and manage licenses for third-party apps in Teams.
author: heath-hamilton
ms.author: surbhigupta
ms.topic: how-to
ms.localizationpriority: high
ms.date: 04/06/2023
---

# Publish your app with the SaaS offer configuration

After publishing the offer to the marketplace, link the offer to your app and publish the app in the store for the customers to purchase paid apps from the marketplace.

You’ve published your SaaS offer, but you still must link it to your Teams app for users to see your subscription plans in the Teams store. There are two ways to link your offer and your app.

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

## Purchase and manage app subscriptions and licenses

The information given below help you understand purchase experience from the customer end. You can add additional features and functionality for your Teams app through subscriptions. Users can purchase subscriptions and manage licenses for themselves, team, or organization directly from the Teams store.

### Subscription experience

The following example shows how users can purchase subscription plans for a fictional Teams app called *Recloud*:

1. In the Teams store, find and select the *Recloud* app.

1. In the app details dialog, select **Buy a subscription**.

    :::image type="content" source="~/assets/images/saas-offer/buysubscriptionplan.png" alt-text="Screenshot shows buying the subscription for the selected app.":::

1. Select your country to see subscription plans for your location.

1. In the **Choose a subscription plan** dialog, choose the plan you want and select **Checkout**. (Note: Private plans are visible only to users in orgs you're providing the offer to. These plans are indicated with a **Special offer** :::image type="icon" source="~/assets/icons/special-icon.png"::: icon.)

    :::image type="content" source="~/assets/images/saas-offer/choosingsubscriptionplan.png" alt-text="Screenshot shows selecting the appropriate subscription plan.":::

1. In the **Checkout** dialog, provide any required information and select **Place order**.

    :::image type="content" source="~/assets/images/saas-offer/placesubscriptionorder.png" alt-text="Screenshot shows placing the subscription order.":::

1. When prompted, select **Set up now** to set up your subscription.

    :::image type="content" source="~/assets/images/saas-offer/saas-offer-set-up.png" alt-text="Screenshot shows the option to set up your subscription.":::

1. Manage your subscription plan through the *Recloud* website (also known as a [landing page](include-saas-offer.md#technical-configuration)).

    :::image type="content" source="~/assets/images/saas-offer/subscriptionlicenses.png" alt-text="Screenshot shows User and Licenses screen to assign license.":::

When a new user launches the app for the first time, they're requested to provide consent to the app. Following is an example of the consent screen shown when calling for user profile data with minimum User.Read permission.

Consent dialog is part of the flow to get the users license information and may vary based on ISV’s integration approach.

:::image type="content" source="../../../../assets/images/saas-offer/permissions-requested.png" alt-text="Screenshot shows the Permissions requested consent dialog.":::

### License management experience

The following example shows how users can manage licenses for third-party apps from the Teams store:

1. Go to **Microsoft Teams**.

1. Select **Apps** > **Manage your apps**.

    :::image type="content" source="../../../../assets/images/saas-offer/client-experience-1.png" alt-text="Screenshot shows the Apps screen to select Manage your app option.":::

1. Select **Subscriptions**. A tab appears with a list of purchases made in the tenant.
1. Choose an existing subscription from the list and select **Assign licenses**.

    :::image type="content" source="../../../../assets/images/saas-offer/client-experience-2.png" alt-text="Screenshot shows the Assign licenses option of the respective app under Subscription tab.":::

1. To view license utilization and assign licenses, select **Assign licenses**.

    :::image type="content" source="../../../../assets/images/saas-offer/view-license.png" alt-text="Screenshot shows the selected assigned licenses highlighted in red.":::

1. Search for the users or a team in the search box and select **Assign**. The license is assigned to the users or a team.

    :::image type="content" source="../../../../assets/images/saas-offer/assign-licenses.png" alt-text="Screenshot shows assigning license to a Team with a single click highlighted in red.":::

    You can view the list of assigned users or teams for the subscription and also check the status of the assignment.

    :::image type="content" source="../../../../assets/images/saas-offer/list-of-assigned-users.png" alt-text="Screenshot shows the list of assigned users with Assign licenses option highlighted in red.":::

1. If you want to unassign a license for a user or a team, select the users or a team from the list and select **Unassign**.

    :::image type="content" source="../../../../assets/images/saas-offer/unassign-button.png" alt-text="Screenshot shows the Unassign option highlighted in red to unassign the selected users.":::

#### Best practices for implementing subscription management

* With transactable SaaS offers for Teams apps, subscription plans (licenses) should be assigned to individual users rather than groups or an entire org.
* When users are assigned a subscription plan, notify them through a Teams bot or email. In the messaging, include information on how to add the app to Teams and get started.
* Support the idea of multiple admins. In other words, multiple users in the same org can purchase and manage their own subscriptions.

### Admin purchasing experience

Admins can manage the app subscriptions and licenses in the Teams admin center. For more information, see [Purchase third-party Teams apps and manage subscriptions](/microsoftteams/purchase-third-party-apps).

## Remove a SaaS offer from your app

If you unlink a SaaS offer included in your Teams store listing, you must republish your app to see the change in the store.

1. Go to the Developer Portal and select Apps.
1. On the Apps page, select the app you're removing the offer from.
1. Go to the Plans and pricing page and select Revert.
1. After the offer is unlinked, do the following to update your store listing:
    1. Select Distribute > Publish to the Teams store.
    1. Select Open Partner Center to begin the process of republishing your app without the offer.

## See also

* [Monetize your app](monetize-overview.md)
* [Set up Microsoft license management for third-party apps](manage-third-party-apps-license.md)
