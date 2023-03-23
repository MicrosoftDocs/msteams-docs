---
title: End-user purchase experience
description: Learn to purchase apps and manage licenses in Teams. 
author: heath-hamilton
ms.author: surbhigupta
ms.topic: how-to
ms.localizationpriority: high
---

# End-user purchase experience

Add functionality to your Teams experience by subscribing to apps made just for Teams and managing licenses. When you add an app to Teams, check if additional features are available through subscription. You can purchase subscriptions and manage licenses for yourself, your team, or your organization directly from Apps

When a new user launches the app for the first time, they're requested to provide consent to the app. Following is an example of the consent screen shown when calling for user profile data with minimum User.Read permission.

Consent dialog is part of the flow to get the users license information and may vary based on ISV’s integration approach.

:::image type="content" source="../../../../assets/images/saas-offer/permissions-requested.png" alt-text="Screenshot showing the permissions requested.":::

## End-user experience

The following example shows how users can purchase subscription plans for a fictional Teams app called *Recloud*.

1. In the Teams store, find and select the *Recloud* app.

1. In the app details dialog, select **Buy a subscription**.

    :::image type="content" source="~/assets/images/saas-offer/buysubscriptionplan.png" alt-text="Buying the subscription for the selected app.":::

1. Select your country to see subscription plans for your location.

1. In the **Choose a subscription plan** dialog, choose the plan you want and select **Checkout**. (Note: Private plans are visible only to users in orgs you're providing the offer to. These plans are indicated with a **Special offer** :::image type="icon" source="~/assets/icons/special-icon.png"::: icon.)

    :::image type="content" source="~/assets/images/saas-offer/choosingsubscriptionplan.png" alt-text="Selecting the appropriate subscription plan.":::

1. In the **Checkout** dialog, provide any required information and select **Place order**.

    :::image type="content" source="~/assets/images/saas-offer/placesubscriptionorder.png" alt-text="Placing the subscription order.":::

1. When prompted, select **Set up now** to set up your subscription.

    :::image type="content" source="~/assets/images/saas-offer/saas-offer-set-up.png" alt-text="Setting up the subscription.":::

1. Manage your subscription plan through the *Recloud* website (also known as a [landing page](include-saas-offer.md#build-a-landing-page-for-subscription-management)).

    :::image type="content" source="~/assets/images/saas-offer/subscriptionlicenses.png" alt-text="Configuring user licenses.":::

## End-user experience for license management in Teams

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

Admins can purchase app subscription plans in the [Teams admin center](/microsoftteams/purchase-third-party-apps)

## See also

[Monetize your app](monetize-overview.md)
