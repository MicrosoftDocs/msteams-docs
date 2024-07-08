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

 Users can purchase subscriptions and manage licenses from the Microsoft Teams Store for an individual, a team, or an organization. You can add more features and functionality to your Microsoft Teams app through subscriptions. Let's get to understand the user's purchase experience, license management, and subscription management experience for apps in Teams.

## Purchase experience

To purchase a subscription plan for a Teams app, follow these steps:

1. In the Microsoft Teams Store, find and select the app for which you want to purchase the subscription.

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

You're redirected to the app website (also known as a [landing page](include-saas-offer.md#create-a-landing-page)) where you can manage your subscriptions.

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

Here are some best practices you can implement for license management:

* With transactable SaaS offers for Teams apps, subscription plans (licenses) should be assigned to individual users rather than groups or an entire organization.
* When users are assigned a subscription plan, notify them through a Teams bot or email. In the messaging, include information on how to add the app to Teams and get started.
* Support the idea of multiple admins. In other words, multiple users in the same org can purchase and manage their subscriptions.

Consider the following best practices for license management:

* Assign subscription plans (licenses) for transactable SaaS offers for Teams apps to individual users, not to groups or an entire organization.
* After assigning a subscription plan to users, notify them via a Teams bot or email. Include information on how to add the app to Teams and initiate use.
* Allow for multiple admins, that is multiple users within the same organization can purchase and manage subscriptions.

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

## FAQs

</br>

<details>

<summary>Do we support in-app purchases?</summary>

Yes, we support in-app purchases. For more information, see in-app purchases.

</br>

</details>

</br>

<details>

<summary>How the flow is handles by CSP who makes the purchase for enterprise?</summary>

CSP flow

</br>

</details>

</br>

<details>

<summary>What's the percentage fee which is taken by Microsoft?</summary>

Microsoft charges a 3% transaction fee whenever a payment is processed. So, if it's a monthly subscription, then the 3% is applied on a monthly basis. This charge applies for both credit card transactions and invoice billing.

</br>

</details>

</br>

<details>

<summary>Can I test the offer before publishing?</summary>

Yes, you can test the offer before publishing. For more information, see [test your SaaS offer](Test-preview-for-monetized-apps.md).

</br>

</details>

</br>

<details>

<summary>Do I have to mandatory link existing Teams app to my monetization module listed on App source?</summary>

It's not mandatory but a good practice to implement it.

</br>

</details>

</br>

<details>

<summary>If the app is transactable on Azure marketplace will it be also available in Appsource or Teams by default </summary>

No. The Azure Marketplace is different than AppSource (and by extension Teams app store). In order to show up in the Teams app store, Teams apps need to be submitted in Partner Center for AppSource, have a linked transactable offer, and update their Teams app manifest to include their publisher and offer IDs. Once complete, they need to resubmit to Partner Center for validation before they will appear in the Teams app store with a **Buy** button.

</br>

</details>

</br>

<details>

<summary>What are the additional steps to get **Buy a subscription** on Teams?</summary>

Adding the IDs to the manifest (and uploading through PC to validate) is what brings the **Buy a subscription** button to Teams. Partners can continue to have apps available in Teams and require customers to purchase through AppSource. Going through a few additional steps brings the purchase option into the Teams app store.​

</br>

</details>

</br>

<details>

<summary>Can ISV set different pricing per country per region?</summary>

Yes. For mor information, see [In-app purchase flow for the monetization of apps](in-app-purchase-flow.md).

</br>

</details>

</br>

<details>

<summary>What are the possible scenarios my partner my face when submitting their Teams app for validation?</summary>

* Scenario 1: Partner has an existing Teams app and an existing transactable SaaS offer​.
* Scenario 2: Partner has an existing Teams app and NO existing transactable SaaS offer
* Scenario 3: Partner has NO existing Teams app and an existing transactable SaaS offer
* Scenario 4: Partner has NO existing Teams app and NO existing transactable SaaS offer

</br>

</details>

</br>

<details>

<summary>What are CSPs looking for when matching with ISVs?</summary>

Being Channel Ready places ISVs in the best position to be successful matched as CSPs look for:​

1. Complementary apps to add to their bundles solutions and services​
1. An attractive margin, balancing their effort with potential revenue​
1. Materials which are easy to consume and ready to use with customers

</br>

</details>

## See also

[Monetize your app](monetize-overview.md)
