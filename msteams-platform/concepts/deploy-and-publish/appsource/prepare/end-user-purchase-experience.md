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

This article helps you understand the user's purchase experience for apps in Teams. Users can purchase subscriptions and manage licenses from the Microsoft Teams Store for an individual, team, or an organization. You can add more features and functionality to your Teams app through subscriptions.

## Subscription experience

To purchase a subscription plan for a Teams app, follow these steps:

1. In the Teams Store, find and select the app for which you want to purchase the subscription.

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
    * Under **Sold to**, add the name and address. For **Sold-to address**, enter the address of the legal entity responsible for payment and identified on the invoice (business or residence). The **Sold-to address** determines the estimated tax rate for your purchase.
    * Under **Payment method**, add the payment details.
1. Select **Place order**.

    :::image type="content" source="~/assets/images/saas-offer/placesubscriptionorder.png" alt-text="Screenshot shows placing the subscription order.":::

1. When prompted, select **Set up now** to activate your subscription.

    :::image type="content" source="~/assets/images/saas-offer/saas-offer-set-up.png" alt-text="Screenshot shows the option to set up your subscription.":::

    You're redirected to the app website (also known as a [landing page](include-saas-offer.md#build-a-landing-page-for-subscription-management)) where you can manage your subscriptions.

:::image type="content" source="~/assets/images/saas-offer/subscriptionlicenses.png" alt-text="Screenshot shows User and Licenses screen to assign license.":::

When a new user launches the app for the first time, they're requested to provide consent to the app.

> [!NOTE]
> Consent dialog is part of the flow to get the user's license information and may vary based on Independent software vendors (ISVs) integration approach.

Following is an example of the consent screen:

:::image type="content" source="../../../../assets/images/saas-offer/permissions-requested.png" alt-text="Screenshot shows the permissions requested consent dialog.":::

## Manage subscriptions

If you've purchased a Teams app subscription or if you want to manage one for your team, you can view the list of subscriptions and their details:

* Change a plan.
* Buy or remove licenses.
* Update a payment method.
* Cancel a subscription.
* View your invoices.

### Filter your subscriptions

1. Go to **Microsoft Teams**.

1. Select **Apps** > **Manage your apps**.

1. Select the **Subscriptions** tab to view your list of subscriptions.

1. To filter subscriptions by status, select **Filter** and then select the type(s) of subscriptions:
    * **Pending**: Subscription still needs to be set up.
    * **Active**: Subscription is set up and the service can be used.
    * **Deleted**: Subscription is no longer available.

1. To find a specific subscription, type the name of the app in the search box.

    :::image type="content" source="../../../../assets/images/saas-offer/find subscription.png" alt-text="Screenshot shows you to find a specific subscription.":::

### Manage licenses

1. Go to **Microsoft Teams**.

1. Select **Apps** > **Manage your apps**.

1. Select the **Subscriptions** tab to view your list of subscriptions.

1. Find the app subscription that you want to manage and select **More options ...**.

1. Manage licenses by selecting **Buy licenses** or **Remove licenses**.

### Cancel a subscription

1. Go to **Microsoft Teams**.

1. Select **Apps** > **Manage your apps**.

1. Select the **Subscriptions** tab to view your list of subscriptions.

    :::image type="content" source="../../../../assets/images/saas-offer/subscription-list.png" alt-text="Screenshot shows the list of subscriptions under subscriptions tab highlighted in red.":::

1. Find the app that you want to cancel and select **More options ...** > **View subscription**.

1. Select **Cancel subscription**.

> [!NOTE]
> You can only manage subscriptions you purchased.

You can take additional actions related to your subscription, such as editing your billing profile or recurring billing settings in [M365 admin center](https://www.microsoft.com/en-in/microsoft-365/business/office-365-administration?rtc=1).

:::image type="content" source="../../../../assets/images/saas-offer/manage more in M365 admin center.png" alt-text="Screenshot shows you to manage the additional subscriptions in M365 admin center.":::

## License management experience

The following example shows how users can manage licenses for third-party apps from the Teams Store:

1. Go to **Microsoft Teams**.

1. Select **Apps** > **Manage your apps**.

    :::image type="content" source="../../../../assets/images/saas-offer/client-experience.png" alt-text="Screenshot shows the apps screen to select manage your apps option highlighted in red.":::

1. Select **Subscriptions**. A tab appears with a list of purchases made in the tenant.

1. Select an existing subscription from the list and then select **Assign licenses**.

    :::image type="content" source="../../../../assets/images/saas-offer/list-of-subscriptions.png" alt-text="Screenshot shows the assign licenses option of the respective app under subscription tab highlighted in red.":::

1. To view license utilization and assign licenses, select **Assign licenses**.

    :::image type="content" source="../../../../assets/images/saas-offer/view-license.png" alt-text="Screenshot shows the assigned licenses highlighted in red.":::

1. Search for the users or a team in the search box and select **Assign**. The users or a team are assigned with the license.

    :::image type="content" source="../../../../assets/images/saas-offer/assign-licenses.png" alt-text="Screenshot shows assigning license to a Team highlighted in red.":::

    You can view the list of assigned users or teams for the subscription and also check the status of the assignment.

    :::image type="content" source="../../../../assets/images/saas-offer/list-of-assigned-users.png" alt-text="Screenshot shows the list of assigned users with assign licenses option highlighted in red.":::

1. If you want to unassign a license for a user or a team, select the users or a team from the list and select **Unassign**.

    :::image type="content" source="../../../../assets/images/saas-offer/unassign-button.png" alt-text="Screenshot shows the unassign option highlighted in red to unassign the selected users.":::

## Promote app adoption

You can promote third-party app by adopting more than one of the following best practices:

* Freemium account that account for better user conversion.
* Call-to-action button that can be shared in an Adaptive Card for users to share the app and onboard other team members.
* Banner promotion for marketing campaign that leads to higher app installation and meaningful engagement.
* Adoption change management is critical for an app's growth to reach users on a constant basis about the existing and new features through email communication.
* Solving blockers to address and eliminate adoption blockers and VoCs through ISVs and Teams Engineering is important for growth.
* Growth marketing to established strategy for driving usage and growth for apps in a SaaS offers.

For mor information, see [educate users and drive adoption change management for your app](../../../../promote-app-adoption.md#step-3-educate-users-and-drive-adoption-change-management-for-your-app).

## Admin purchasing experience

Admins can manage the app subscriptions and licenses in the Teams admin center. For more information, see [Purchase third-party Teams apps and manage subscriptions](/microsoftteams/purchase-third-party-apps).

## See also

* [Monetize your app](monetize-overview.md)
* [Set up Microsoft license management for third-party apps](manage-third-party-apps-license.md)
