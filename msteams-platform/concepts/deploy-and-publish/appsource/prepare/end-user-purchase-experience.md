---
title: Purchase and manage app subscriptions and licenses
description: Learn how to purchase, assign, and manage licenses for third-party apps in Microsoft Teams.
author: heath-hamilton
ms.author: surbhigupta
ms.topic: how-to
ms.localizationpriority: high
ms.date: 04/06/2023
---

# Purchase and manage app subscriptions and licenses

This article helps you understand the user's purchase experience for apps in Teams. Users can purchase subscriptions and manage licenses from the Teams store for an individual, team, or an organization. You can add more features and functionality to your Teams app through subscriptions.

## Subscription experience

To purchase a subscription plan for a Teams app, follow these steps:

1. In the Teams store, find and select the app for which you want to purchase the subscription.

1. In the app details dialog, select **Buy a subscription**.

    :::image type="content" source="~/assets/images/saas-offer/buysubscriptionplan.png" alt-text="Screenshot shows buying the subscription for the selected app.":::

1. To view the available plans for your location, select your country or region.
1. Select **Save and continue**.

    :::image type="content" source="~/assets/images/saas-offer/add-region.png" alt-text="Screenshot shows option to select the country or region.":::

1. In the **Choose a subscription plan** dialog, select **Start trail** for the plan you want to purchase.

    > [!NOTE]
    > Private plans are visible only to users of the organization you're providing the specific offer. A **Private offer** :::image type="icon" source="~/assets/icons/special-icon.png"::: icon indicates such private plans.

    :::image type="content" source="~/assets/images/saas-offer/choosingsubscriptionplan.png" alt-text="Screenshot shows selecting the appropriate subscription plan.":::

1. In the **Checkout** dialog, enter the following information:
    * Under **Basic plan** > **Quantity**, select the number of plans.
    * Under **Sold to**, add the name and address.
    * Under **Payment method**, add the payment details.
1. Select **Place order**.

    :::image type="content" source="~/assets/images/saas-offer/placesubscriptionorder.png" alt-text="Screenshot shows placing the subscription order.":::

1. Select **Set up now**.

    :::image type="content" source="~/assets/images/saas-offer/saas-offer-set-up.png" alt-text="Screenshot shows the option to set up your subscription.":::

You're redirected to the app website (also known as a [landing page](include-saas-offer.md#build-a-landing-page-for-subscription-management)) where you can manage your subscriptions.

:::image type="content" source="~/assets/images/saas-offer/subscriptionlicenses.png" alt-text="Screenshot shows User and Licenses screen to assign license.":::

When a new user launches the app for the first time, they're requested to provide consent to the app.

> [!NOTE]
> Consent dialog is part of the flow to get the user's license information and may vary based on Independent software vendors (ISVs) integration approach.

Following is an example of the consent screen:

:::image type="content" source="../../../../assets/images/saas-offer/permissions-requested.png" alt-text="Screenshot shows the Permissions requested consent dialog.":::

## License management experience

The following example shows how users can manage licenses for third-party apps from the Teams store:

1. Go to **Microsoft Teams**.

1. Select **Apps** > **Manage your apps**.

    :::image type="content" source="../../../../assets/images/saas-offer/client-experience-1.png" alt-text="Screenshot shows the Apps screen to select Manage your app option.":::

1. Select **Subscriptions**. A tab appears with a list of purchases made in the tenant.

1. Select an existing subscription from the list and then select **Assign licenses**.

    :::image type="content" source="../../../../assets/images/saas-offer/client-experience-2.png" alt-text="Screenshot shows the Assign licenses option of the respective app under Subscription tab.":::

1. To view license utilization and assign licenses, select **Assign licenses**.

    :::image type="content" source="../../../../assets/images/saas-offer/view-license.png" alt-text="Screenshot shows the selected assigned licenses highlighted in red.":::

1. Search for the users or a team in the search box and select **Assign**. The users or a team are assigned with the license.

    :::image type="content" source="../../../../assets/images/saas-offer/assign-licenses.png" alt-text="Screenshot shows assigning license to a Team highlighted in red.":::

    You can view the list of assigned users or teams for the subscription and also check the status of the assignment.

    :::image type="content" source="../../../../assets/images/saas-offer/list-of-assigned-users.png" alt-text="Screenshot shows the list of assigned users with Assign licenses option highlighted in red.":::

1. If you want to unassign a license for a user or a team, select the users or a team from the list and select **Unassign**.

    :::image type="content" source="../../../../assets/images/saas-offer/unassign-button.png" alt-text="Screenshot shows the Unassign option highlighted in red to unassign the selected users.":::

## Admin purchasing experience

Admins can manage the app subscriptions and licenses in the Teams admin center. For more information, see [Purchase third-party Teams apps and manage subscriptions](/microsoftteams/purchase-third-party-apps).

## See also

* [Monetize your app](monetize-overview.md)
* [Set up Microsoft license management for third-party apps](manage-third-party-apps-license.md)
