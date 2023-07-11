---
title: Purchase and manage app subscriptions and licenses
description: Learn how to purchase, assign, and manage licenses for third-party apps in Teams. 
author: heath-hamilton
ms.author: surbhigupta
ms.topic: how-to
ms.localizationpriority: high
---

# Purchase and manage app subscriptions and licenses

Add functionality to your Teams experience by subscribing and managing licenses for apps made just for Teams. When you add an app to Teams, check if additional features are available through subscription. You can purchase subscriptions and manage licenses for yourself, your team, or your organization directly from the Teams store.

## Subscription experience

The following example shows how users can purchase subscription plans for a fictional Teams app called *Recloud*:

1. In the Teams store, find and select the *Recloud* app.

1. In the app details dialog, select **Buy a subscription**.

    :::image type="content" source="~/assets/images/saas-offer/buysubscriptionplan.png" alt-text="Buying the subscription for the selected app.":::

1. Select your country to see subscription plans for your location.

1. In the **Choose a subscription plan** dialog, choose the plan you want and select **Checkout**. (Note: Private plans are visible only to users in orgs you're providing the offer to. These plans are indicated with a **Special offer** :::image type="icon" source="~/assets/icons/special-icon.png"::: icon.)

    :::image type="content" source="~/assets/images/saas-offer/choosingsubscriptionplan.png" alt-text="Selecting the appropriate subscription plan.":::

1. In the **Checkout** dialog, provide any required information and select **Place order**.

    :::image type="content" source="~/assets/images/saas-offer/placesubscriptionorder.png" alt-text="Placing the subscription order.":::

1. During checkout, select how many subscription licenses you want, enter a **Sold-to address**, and provide a payment method. For **Sold-to address**, enter the address of the legal entity responsible for payment and identified on the invoice (business or residence). The **Sold-to address** determines the estimated tax rate for your purchase.

1. Select **Place order**.

1. When prompted, select **Set up now** to activate your subscription.

    :::image type="content" source="~/assets/images/saas-offer/saas-offer-set-up.png" alt-text="Setting up the subscription.":::

    You'll be redirected to the *Recloud* website to activate your subscription.

1. Manage your subscription plan through the *Recloud* website (also known as a [landing page](include-saas-offer.md#build-a-landing-page-for-subscription-management)).

    :::image type="content" source="~/assets/images/saas-offer/subscriptionlicenses.png" alt-text="Configuring user licenses.":::

When a new user launches the app for the first time, they're requested to provide consent to the app. Following is an example of the consent screen shown when calling for user profile data with minimum User.Read permission.

Consent dialog is part of the flow to get the users license information and may vary based on ISV’s integration approach.

:::image type="content" source="../../../../assets/images/saas-offer/permissions-requested.png" alt-text="Screenshot showing the permissions requested.":::

## Manage subscriptions

If you bought a Teams app subscription or manage one for your team, you can view the list of subscriptions purchased and their details:

* Change a plan
* Buy or remove licenses
* Update a payment method
* Cancel a subscription
* View your invoices

### Filter your subscriptions

1. Go to **Microsoft Teams**.

1. Select **Apps** > **Manage your apps**.

1. Select the **Subscriptions** tab to view your list of subscriptions.

1. To filter subscriptions by status, select **Filter** and select the type(s) of subscriptions:
    * **Pending**: Subscription still needs to be set up.
    * **Active**: Subscription is set up and the service can be used.
    * **Deleted**: Subscription is no longer available.

1. To find a specific subscription, type the name of the app in the search box.

    :::image type="content" source="../../../../assets/images/saas-offer/find subscription.png" alt-text="Screenshot shows to find a specific subscription.":::

### Manage licenses

1. Go to **Microsoft Teams**.

1. Select **Apps** > **Manage your apps**.

1. Select the **Subscriptions** tab to view your list of subscriptions.

1. Find the app subscription you want to manage and select **More options ...**.

1. Manage licenses by selecting **Buy licenses** or **Remove licenses**.

### Cancel a subscription

1. Go to **Microsoft Teams**.

1. Select **Apps** > **Manage your apps**.

1. Select the **Subscriptions** tab to view your list of subscriptions.

1. Find the app you want to cancel and select **More options ...** > **View subscription**.

1. Select **Cancel subscription**.

>[NOTE!]
You can only manage subscriptions you purchased.

To take additional actions related to your subscription, like editing your billing profile or recurring billing settings, select [**Manage more in M365 admin center**.](<https://www.microsoft.com/en-in/microsoft-365/business/office-365-administration?rtc=1>)

    :::image type="content" source="../../../../assets/images/saas-offer/manage more in M365 admin center.png" alt-text="Screenshot shows to manage the additional subscriptions in M365 admin center.":::

## License management experience

The following example shows how users can manage licenses for third-party apps from the Teams store:

1. Go to **Microsoft Teams**.

1. Select **Apps** > **Manage your apps**.

    :::image type="content" source="../../../../assets/images/saas-offer/client-experience-1.png" alt-text="Screenshot showing the existing subscription.":::

1. Select **Subscriptions**. A tab appears with a list of purchases made in the tenant.
1. Choose an existing subscription from the list and select **Assign licenses**.

    :::image type="content" source="../../../../assets/images/saas-offer/client-experience-2.png" alt-text="Screenshot showing the assigned licenses highlighted in red":::

1. To view license utilization and assign licenses, select **Assign licenses**.

    :::image type="content" source="../../../../assets/images/saas-offer/view-license.png" alt-text="Screenshot showing the selected assigned licenses highlighted in red.":::

1. Search for the users or a team in the search box and select **Assign**. The license is assigned to the users or a team.

    :::image type="content" source="../../../../assets/images/saas-offer/assign-licenses.png" alt-text="Screenshot showing the example of assigning license to a Team with a single click highlighted in red.":::

    You can view the list of assigned users or teams for the subscription and also check the status of the assignment.

    :::image type="content" source="../../../../assets/images/saas-offer/list-of-assigned-users.png" alt-text="Screenshot showing the list of assigned users with assign licenses highlighted in red.":::

1. If you want to unassign a license for a user or a team, select the users or a team from the list and select **Unassign**.

    :::image type="content" source="../../../../assets/images/saas-offer/unassign-button.png" alt-text="Screenshot showing the selection of unassign button highlighted in red to unassign the users.":::

## Admin purchasing experience

Admins can manage the app subscriptions and licenses in the Teams admin center. For more information, see [Purchase third-party Teams apps and manage subscriptions](/microsoftteams/purchase-third-party-apps).

## See also

* [Monetize your app](monetize-overview.md)
* [Set up Microsoft license management for third-party apps](manage-third-party-apps-license.md)
