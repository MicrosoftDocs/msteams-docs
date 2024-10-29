---
title: Buy & Manage App Subscription & License
description: Learn how to purchase, assign, and manage app subscriptions and licenses for third-party apps in Microsoft Teams and admin purchasing experience.
author: heath-hamilton
ms.author: surbhigupta
ms.topic: how-to
ms.localizationpriority: high
ms.date: 04/06/2023
---

# Purchase and manage app subscriptions and licenses

Users can purchase subscriptions and manage licenses from Microsoft Teams Store for an individual, a team, or an organization. As a developer, you can enhance the user experience for your app purchases based on the content outlined here. This article helps you understand the user's app purchase experience in Teams Store and provide a similar experience.

## Subscription purchase experience

> [!NOTE]
> Users might be asked to add a value-added tax (VAT) ID and a registration ID based on the compliance requirements of a country or region. For more information, see [VAT ID number](/partner-center/enroll/vat-info) and [registration ID number](/partner-center/account-settings/reg-number-id).

Here's the user experience to purchase a subscription plan for a Teams app:

1. In Teams, select **Apps** > **Best selling**.

    :::image type="content" source="~/assets/images/saas-offer/teams-store.png" alt-text="Screenshot shows the Best selling option highlighted in Teams Store." lightbox="../../../../assets/images/saas-offer/teams-store-lightbox.png":::

1. Browse and select the app for which you want to purchase the subscription.

1. In the app details dialog, select **Buy a subscription**.

    :::image type="content" source="~/assets/images/saas-offer/buysubscriptionplan.png" alt-text="Screenshot shows buying the subscription for an app."  lightbox="../../../../assets/images/saas-offer/buysubscriptionplan-lightbox.png":::

1. To view the available plans for your location, select your country or region and select **Save and continue**.

    :::image type="content" source="~/assets/images/saas-offer/add-region.png" alt-text="Screenshot shows option to select the country or region.":::

1. In the **Choose a subscription plan** dialog, select **Buy** for the plan you want to purchase.

    > [!NOTE]
    > Private plans are only visible to users within the organization that the offer is intended for and are indicated with a **Private offer** :::image type="icon" source="~/assets/icons/special-icon.png"::: icon.

    :::image type="content" source="~/assets/images/saas-offer/choosingsubscriptionplan.png" alt-text="Screenshot shows the selection of appropriate subscription plan." lightbox="../../../../assets/images/saas-offer/choosingsubscriptionplan-lightbox.png":::

1. The checkout experience partially differs for a new and an existing user. In the **Checkout** dialog, perform the following actions:

    # [New user](#tab/newuser)

    1. Under **Subscription details**, select **Quantity** and **Subscription length** and select **Next**.

        :::image type="content" source="~/assets/images/saas-offer/subscription-details.png" alt-text="Screenshot shows selecting the Quantity and Subscription length."  lightbox="../../../../assets/images/saas-offer/subscription-details-lightbox.png":::

    1. Under **Billing account**, enter the name and billing details and select **Next**.

        :::image type="content" source="~/assets/images/saas-offer/billing-details.png" alt-text="Screenshot shows adding the billing address." lightbox="../../../../assets/images/saas-offer/billing-details.png":::

    1. Under **Verify your address**, select the address and select **Next**.

        :::image type="content" source="~/assets/images/saas-offer/verify-address.png" alt-text="Screenshot shows the verification of billing address."  lightbox="../../../../assets/images/saas-offer/verify-address-lightbox.png":::

    1. Under **Add a credit or debit card**, add the required details and select **Next**.

        By default, the **Same as billing address** checkbox is selected to use the billing account’s address for the card. To add a new address, clear the checkbox and enter the address.

        :::image type="content" source="~/assets/images/saas-offer/card-address.png" alt-text="Screenshot shows the option to choose the same billing address or add an address." lightbox="../../../../assets/images/saas-offer/card-address.png":::

    1. Under **Review**, verify the details and select **Place order**.

        :::image type="content" source="~/assets/images/saas-offer/placesubscriptionorder-new.png" alt-text="Screenshot shows the subscription order placement.":::

    # [Existing user](#tab/existinguser)

    For existing users, the checkout process is quick as their saved account details are automatically used.

    1. Under **Subscription details**, select **Quantity** and **Subscription length** and select **Next**.

        :::image type="content" source="~/assets/images/saas-offer/subscription-details-existing.png" alt-text="Screenshot shows selecting the Quantity and Subscription length."  lightbox="../../../../assets/images/saas-offer/subscription-details-existing-lightbox.png":::

    1. Under **Review**, verify the details and select **Place order**.

        :::image type="content" source="~/assets/images/saas-offer/placesubscriptionorder-existing.png" alt-text="Screenshot shows the subscription order placement.":::
    
    ---

1. When prompted, select **Set up subscription** to activate your subscription.

    :::image type="content" source="~/assets/images/saas-offer/saas-offer-set-up.png" alt-text="Screenshot shows the option to set up your subscription.":::

    Users are redirected to the app website (also known as a [landing page](include-saas-offer.md#build-a-landing-page-for-subscription-management)) where they can manage subscriptions.

    :::image type="content" source="~/assets/images/saas-offer/subscriptionlicenses.png" alt-text="Screenshot shows User and Licenses screen to assign license.":::

When a new user launches the app for the first time, they are requested to provide consent to the app.

> [!NOTE]
> Consent dialog is part of the flow to get the user's license information and might vary based on independent software vendors (ISVs) integration approach.

Following is an example of the consent screen:

:::image type="content" source="../../../../assets/images/saas-offer/permissions-requested.png" alt-text="Screenshot shows the permissions requested consent dialog.":::

## License and subscriptions management experience

Users can manage the app subscriptions purchased in Teams through the **Manage your apps** section. It allows to access the list of subscriptions and their details, and perform the following actions to manage the subscription:

* Change a plan
* Buy or remove licenses
* Update a payment method
* Cancel a subscription
* View your invoices

The following example shows how users can manage licenses for third-party apps from Teams Store:

1. Go to **Microsoft Teams**.

1. Select **Apps** > **Manage your apps**.

    :::image type="content" source="../../../../assets/images/saas-offer/client-experience.png" alt-text="Screenshot shows the apps screen to select manage your apps option highlighted in red." lightbox="../../../../assets/images/saas-offer/client-experience.png":::

1. Select **Subscriptions**. A tab appears with a list of purchases made in the tenant.

    :::image type="content" source="../../../../assets/images/saas-offer/subscription-list.png" alt-text="Screenshot shows the list of subscriptions under subscriptions tab highlighted in red." lightbox="../../../../assets/images/saas-offer/subscription-list.png":::

    Here's the subscription management options available for users on the **Subscriptions** page:
    
    <br>
    <details>
    <summary>Assign or unassign licenses</summary>
    
    1. Select an existing subscription from the list and select **Assign licenses**.
    
        :::image type="content" source="../../../../assets/images/saas-offer/list-of-subscriptions.png" alt-text="Screenshot shows the assign licenses option of the respective app highlighted under Subscriptions tab." lightbox="../../../../assets/images/saas-offer/list-of-subscriptions.png":::
    
    2. To view license utilization and assign licenses, select **Assign licenses**.
    
        :::image type="content" source="../../../../assets/images/saas-offer/view-license.png" alt-text="Screenshot shows the assigned licenses highlighted." lightbox="../../../../assets/images/saas-offer/view-license.png":::
    
    1. Search for the users or a team in the search box and select **Assign**. The users or a team are assigned with the license.
    
        :::image type="content" source="../../../../assets/images/saas-offer/assign-licenses.png" alt-text="Screenshot shows assigning license to a Team highlighted in red.":::
    
        Users can view the list of assigned users or teams for the subscription and also check the status of the assignment.
    
        :::image type="content" source="../../../../assets/images/saas-offer/list-of-assigned-users.png" alt-text="Screenshot shows the list of assigned users with assign licenses option highlighted in red." lightbox="../../../../assets/images/saas-offer/list-of-assigned-users.png":::
    
    1. To unassign a license for a user or a team, select the users or a team from the list and select **Unassign**.
    
        :::image type="content" source="../../../../assets/images/saas-offer/unassign-button.png" alt-text="Screenshot shows the unassign option highlighted in red to unassign the selected users." lightbox="../../../../assets/images/saas-offer/unassign-button.png":::
    &nbsp;
    
    </details>
    
    <br>
    <details>
    <summary>Filter your subscriptions</summary>
    
    1. To filter subscriptions by status, select **Filter** and then select the type(s) of subscriptions:
        * **Pending**: Subscription still needs to be set up.
        * **Active**: Subscription is set up and the service can be used.
        * **Deleted**: Subscription is no longer available.
    
    1. To find a specific subscription, type the name of the app in the search box.
    
        :::image type="content" source="../../../../assets/images/saas-offer/find subscription.png" alt-text="Screenshot shows you to find a specific subscription.":::
    &nbsp;
    
    </details>
    
    <br>
    <details>
    <summary>Buy or remove licenses</summary>
    
    1. Find the app subscription that you want to manage and select **More options ...**.
    
    1. Manage licenses by selecting **Buy licenses** or **Remove licenses**.
    &nbsp;
    
    </details>
    
    <br>
    <details>
    <summary>Cancel a subscription</summary>
    
    1. Find the app that you want to cancel and select **More options ...** > **View subscription**.
    
    1. Select **Cancel subscription**.
    
    &nbsp;
    
    </details>

Users can take additional actions related to app subscription, such as editing the billing profile or recurring billing settings in [M365 admin center](https://www.microsoft.com/en-in/microsoft-365/business/office-365-administration?rtc=1).

:::image type="content" source="../../../../assets/images/saas-offer/manage more in M365 admin center.png" alt-text="Screenshot shows how to manage the additional subscriptions in M365 admin center.":::

## Admin purchasing experience

Admins can manage the app subscriptions and licenses in the Teams admin center. For more information, see [purchase third-party Teams apps and manage subscriptions](/microsoftteams/purchase-third-party-apps).

## See also

[Monetize your app](monetize-overview.md)
