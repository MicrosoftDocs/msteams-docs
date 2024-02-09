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

 Users can purchase subscriptions and manage licenses from the Microsoft Teams Store for an individual, a team, or an organization. You can add more features and functionality to your Microsoft Teams app through subscriptions. Let's get to understand the user's purchase experience, license management, and subscription management experience for apps in Teams.

## Purchase experience

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
    * Under **Quantity**, select the number of plans.
    * Under **Sold to**, add the name and address. For **Sold-to address**, enter the address of the legal entity responsible for payment and identified on the invoice (business or residence). The **Sold-to address** determines the estimated tax rate for your purchase.
    * Under **Payment method**, add the payment details.
1. Select **Place order**.

    :::image type="content" source="~/assets/images/saas-offer/placesubscriptionorder.png" alt-text="Screenshot shows placing the subscription order.":::

1. When prompted, select **Set up now** to activate your subscription.

    :::image type="content" source="~/assets/images/saas-offer/saas-offer-set-up.png" alt-text="Screenshot shows the option to set up your subscription.":::

You're redirected to the app website (also known as a [landing page](prerequisites.md#create-a-landing-page)) where you can manage your subscriptions.

:::image type="content" source="~/assets/images/saas-offer/subscriptionlicenses.png" alt-text="Screenshot shows User and Licenses screen to assign license.":::

When a new user launches the app for the first time, they're requested to provide consent to the app.

> [!NOTE]
> Consent dialog is part of the flow to get the user's license information and may vary based on Independent software vendors (ISVs) integration approach.

Following is an example of the consent screen:

:::image type="content" source="../../../../assets/images/saas-offer/permissions-requested.png" alt-text="Screenshot shows the permissions requested consent dialog.":::

## License management

The following example shows how users can assign and unassign licenses for third-party apps from Teams:

1. Go to **Microsoft Teams**.

1. Select **Apps** > **Manage your apps**.

    :::image type="content" source="../../../../assets/images/saas-offer/client-experience.png" alt-text="Screenshot shows the apps screen to select the manage your apps option highlighted in red." lightbox="../../../../assets/images/saas-offer/client-experience-lightbox.png":::

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

Here are some best practices you can implement for license management.

* With transactable SaaS offers for Teams apps, subscription plans (licenses) should be assigned to individual users rather than groups or an entire organization.
* When users are assigned a subscription plan, notify them through a Teams bot or email. In the messaging, include information on how to add the app to Teams and get started.
* Support the idea of multiple admins. In other words, multiple users in the same org can purchase and manage their subscriptions.

## Manage subscriptions

If you want to manage subscriptions for a new or an existing app, you can view the list of subscription in Teams. You can also perform the following actions:

* Change a plan
* Buy or remove licenses
* Update a payment method
* Cancel a subscription
* View your invoices

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

### Buy or remove licenses

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

You can take additional actions related to your subscription, such as editing your billing profile or recurring billing settings in [Microsoft 365 admin center](https://www.microsoft.com/en-in/microsoft-365/business/office-365-administration?rtc=1).

:::image type="content" source="~/assets/images/saas-offer/manage more in M365 admin center.png" alt-text="Screenshot shows you to manage the additional subscriptions in Microsoft 365 admin center.":::

## Admin purchasing experience

Admins can manage the app subscriptions and licenses in the Teams admin center. For more information, see [Purchase third-party Teams apps and manage subscriptions](/microsoftteams/purchase-third-party-apps).

## Check license usage in Partner Center analytics

1. Sign in to [Partner Center](https://partner.microsoft.com/).
1. In the left pane, go to **Commercial Marketplace > Analyze > Licensing**.
1. Select **Plan and Tenant** in the reporting widget to see the month wise usage.

## See also

* [Monetize your app](monetize-overview.md)
* [Set up Microsoft license management for third-party apps](manage-third-party-apps-license.md)
