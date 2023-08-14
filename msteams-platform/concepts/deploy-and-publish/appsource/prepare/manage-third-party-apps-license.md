---
title: Create an offer plan for license purchase
description: Learn to create an offer plan for the third-party apps purchased from Teams storefront and submit the offer for validation.
author: heath-hamilton
ms.author: surbhigupta
ms.topic: how-to
ms.localizationpriority: high
ms.date: 04/06/2023
---

# Create an offer plan for license purchase

Independent software vendors (ISVs) can configure Microsoft license management for third-party SaaS apps in Partner Center as part of the offer publishing. This allows Teams admins or users to purchase, assign, unassign, use, and track SaaS licenses for their third-party app subscriptions within Teams.

:::row:::
   :::column:::
      :::image type="icon" source="~/assets/images/saas-offer/monetize-flow.png" link="include-saas-offer.md" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="~/assets/images/saas-offer/monetize-flow-2.png" link="prerequisites.md" border="false":::
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
      :::image type="icon" source="~/assets/images/saas-offer/monetize-flow6.png" link="publish-saas-offer-app.md" border="false":::
   :::column-end:::
:::row-end:::

To enable Microsoft to manage licenses for a third-party app in Teams, you must have opted for Microsoft to manage licenses on your behalf while creating the offer. You must then create one or more plans that have subscription pricing, where the user can purchase subscriptions with licenses to use your app. Microsoft then manages the purchased licenses on your behalf.

## Create a plan

Transactable SaaS offers sold through the Microsoft commercial marketplace must have at least one plan. You can create various plans with different options within the same offer.

1. Select **Plan overview** from the left pane, and then select **+ Create new plan**.

1. Enter **Plan ID** and **Plan name**, and then select **Create**.

    :::image type="content" source="~/assets/images/first-party-license-mgt/plan-overview.png" alt-text="The screenshots shows plan overview to create a new plan for your apps in the Partner Center.":::

1. Select the plan to add pricing and availability information.

### Define plan listing

On the **Plan listing** tab, you can define the plan name and description as you want them to appear in the commercial marketplace.

1. Under **Plan listing**, enter the **Plan name** and **Plan description**.

    :::image type="content" source="~/assets/images/first-party-license-mgt/plan-listing.png" alt-text="The screenshots shows plan page to add plan name and plan description for your app.":::

1. Select **Save draft**.

### Define markets

Every plan must be available in at least one market. On the **Pricing and availability** tab, you can configure the markets this plan is available.

1. Select **Pricing and availability** from the left pane.
1. Under **Markets**, select **Edit markets**.
1. In the dialog that appears, select the market locations where you want to make your plan available. You must select a minimum of one and can select a maximum of 141 markets.

### Define pricing

You must associate a pricing model with each plan either flat rate or per user. All plans in the same offer must use the same pricing model.

1. Select **Pricing and availability** from the left pane.
1. Under **Pricing**, select **Flat rate** or **Per User**.
1. Add the billing terms you want: Monthly, Annual, 2-year, and 3-year billing terms.
1. For each billing term, select the payment option to set the payment schedule.
1. Enter the price for each payment occurrence.

    :::image type="content" source="~/assets/images/first-party-license-mgt/pricing-availability.png" alt-text="The screenshots shows pricing and availability page to add SaaS offer for your app.":::

1. Select **Save draft**.

### Add free trial

You can configure a free trial for each plan in your offer.

1. Under **Free Trial**, select **Allow a one-month free trial**.

1. Select **Plan overview** at the top of the page to go to the listing page that shows all the plans you've created for this offer.

    After you create one or more plans, you'll see your plan name, plan ID, pricing model, availability (Public or Private), current publishing status, and any available actions on the **Plan overview** tab.

   :::image type="content" source="~/assets/images/first-party-license-mgt/list-of-plans-created.png" alt-text="The screenshots shows plan listing page with service ID, pricing model, availability, status and action.":::

1. Copy the service ID of the plan you created to integrate with Microsoft Graph usageRights API.

[Integrate with Graph usageRights API](prerequisites.md#integrate-with-graph-usagerights-api) to manage user permissions at the time of app launch by a customer who has a purchased license.

## Submit the offer

When you finish configuring the offer along with the plans, validate the offer. You can then submit the offer with the plans from Partner Center for validation and publishing. The offer overview page displays the **Publish status** where you can track the progress.

When the offer reaches the **Publisher signoff** stage, preview links for the respective platforms are given under the **Go live** button to test the offer. Upon successful validation, it's recommended to [test the offer](Test-preview-for-monetized-apps.md) with the given preview links before you publish the offer live.

## License management

Based on the subscriptions the user purchase, the licenses are available. To get the best out of Microsoft license management, here are some best practices you can implement for subscription management.

* With transactable SaaS offers for Teams apps, subscription plans (licenses) should be assigned to individual users rather than groups or an entire org.
* When users are assigned a subscription plan, notify them through a Teams bot or email. In the messaging, include information on how to add the app to Teams and get started.
* Support the idea of multiple admins. In other words, multiple users in the same org can purchase and manage their subscriptions.

### Check license usage in Partner Center analytics

1. Sign in to [Partner Center](https://partner.microsoft.com/).
1. In the left pane, go to **Commercial Marketplace** > **Analyze** > **Licensing**.
1. Select **Plan and Tenant** in the reporting widget to see the month-wise usage.

## Next step

> [!div class="nextstepaction"]
> [Test preview for monetized apps](~/concepts/deploy-and-publish/appsource/prepare/Test-preview-for-monetized-apps.md)

## See also

* [Monetize your app](monetize-overview.md)
* [Create plans for SaaS offer](/partner-center/marketplace/create-new-saas-offer-plans)
* [Test and publish SaaS offer](/partner-center/marketplace/test-publish-saas-offer)
