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
      :::image type="icon" source="~/assets/images/saas-offer/monetize-flow1.png" link="include-saas-offer.md" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="~/assets/images/saas-offer/monetize-flow2.png" link="prerequisites.md" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="~/assets/images/saas-offer/monetize-flow3.png" link="create-saas-offer.md" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="~/assets/images/saas-offer/monetize-flow4a.png" link="manage-third-party-apps-license.md" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="~/assets/images/saas-offer/monetize-flow5.png" link="Test-preview-for-monetized-apps.md" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="~/assets/images/saas-offer/monetize-flow6.png" link="publish-saas-offer-app.md" border="false":::
   :::column-end:::
:::row-end:::

To enable Microsoft to manage licenses for a third-party app in Teams, you must have opted for Microsoft to manage licenses on your behalf while creating the offer. You must then create one or more plans for your offer with subscriptions, where the user can purchase suitable subscription= as license to use your app. Microsoft then manages the purchased licenses on your behalf.

## Create a plan

Transactable SaaS offers sold through the Microsoft commercial marketplace must have at least one plan. You can create various plans with different options within the same offer.

1. From the left pane, select **Plan overview** > **+ Create new plan**.

1. Enter **Plan ID** and **Plan name**, and then select **Create**.

    :::image type="content" source="~/assets/images/first-party-license-mgt/plan-overview.png" alt-text="Screenshot shows plan overview to create a new plan for your apps in the Partner Center.":::

1. Select the plan listed under **Plan overview** to add pricing and availability information.

### Define plan listing

On the **Plan listing** tab, you can define the plan name and description as you want them to appear in the commercial marketplace.

1. Under **Plan listing**, enter the **Plan name** and **Plan description**.

    :::image type="content" source="~/assets/images/first-party-license-mgt/plan-listing.png" alt-text="Screenshot shows the plan page to add plan name and plan description for your app.":::

1. Select **Save draft**.

### Define markets

Every plan must be available in at least one market. On the **Pricing and availability** tab, you can configure the markets for the plan.

1. Select **Pricing and availability** from the left pane.
1. Under **Markets**, select **Edit markets**.
1. In the dialog that appears, select the market locations where you want to make your plan available. You must select a minimum of one and can select a maximum of 141 markets.

### Define the pricing

You must associate a pricing model with each plan either flat rate or per user. All plans in an offer must use the same pricing model.

1. Select **Pricing and availability** from the left pane.
1. Under **Pricing**, select **Flat rate** or **Per User**.
1. Under **Billing term**, select the billing terms. You can select **Monthly**, **Annual**, or both.
1. For each billing term, enter the **Price** for each payment occurrence.

    :::image type="content" source="~/assets/images/first-party-license-mgt/pricing-availability.png" alt-text="Screenshot shows the pricing and availability page to add SaaS offer for your app.":::

1. Select **Save draft**.

### Add free trial

You can configure a free trial for each plan in your offer.

1. Under **Free Trial**, select **Allow a one-month free trial**.

1. Select **Plan overview** at the top of the page to go to the listing page that shows all the plans you've created for this offer.

    After you create one or more plans, you'll see your plan name, plan ID, pricing model, availability (Public or Private), current publishing status, and any available actions on the **Plan overview** tab.

   :::image type="content" source="~/assets/images/first-party-license-mgt/list-of-plans-created.png" alt-text="Screenshot shows plan listing page with service ID, pricing model, availability, status and action.":::

1. Copy the service ID of the plan you created to integrate with Microsoft Graph [usageRights API](/partner-center/marketplace/isv-app-license-saas).

[Integrate with Graph usageRights API](prerequisites.md#integrate-with-graph-usagerights-api) to manage user permissions at the time of app launch by a customer who has a purchase license.

## Submit the offer

After you create the plans for your offer and finish the required configurations for the offer, you must validate the offer. You can then submit the offer with the plans from Partner Center for validation and publishing. The **Offer overview** page displays the **Publish status** where you can track the progress.

When the offer reaches the **Publisher signoff** phase, preview links for the respective platforms are given under the **Go live** button to test the offer. Upon successful validation, it's recommended to [test the offer](Test-preview-for-monetized-apps.md) with the given preview links before you publish the offer in the marketplace.

## Next step

> [!div class="nextstepaction"]
> [Test preview for monetized apps](~/concepts/deploy-and-publish/appsource/prepare/Test-preview-for-monetized-apps.md)

## See also

* [Monetize your app](monetize-overview.md)
* [Create plans for SaaS offer](/partner-center/marketplace/create-new-saas-offer-plans)
* [Test and publish SaaS offer](/partner-center/marketplace/test-publish-saas-offer)
