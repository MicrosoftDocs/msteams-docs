---
title: Set up Microsoft license management
description: Learn to manage SaaS licenses for third-party apps purchased from Teams storefront. 
author: heath-hamilton
ms.author: surbhigupta
ms.topic: how-to
ms.localizationpriority: high
ms.date: 04/06/2023
---

# Set up Microsoft license management

Independent software vendors (ISVs) can configure Microsoft license management for third-party SaaS apps in Partner Center as part of the offer publishing. This allows Teams admins or users to easily assign, unassign, use, and track SaaS licenses for their third-party app subscriptions within Teams.

To enable Microsoft to manage license for a third-party app in Teams, you must create a plan for the offer and configure pricing and availability of the plan.

## Create a plan

Offers sold through the Microsoft commercial marketplace must have at least one plan. You can create a variety of plans with different options within the same offer.

1. Select Plan overview from the left pane, and then select Create new plan.

1. Enter Plan ID and Plan name, and then select Create.

    :::image type="content" source="~/assets/images/first-party-license-mgt/plan-overview.png" alt-text="The screenshots shows plan overview to create a new plan for your apps in the Partner Center.":::

1. Select the plan to add pricing and availability information

### Define plan listing

On the **Plan listing** tab, you can define the plan name and description as you want them to appear in the commercial marketplace.

1. Under Plan listing, enter the Plan name and Plan description.

    :::image type="content" source="~/assets/images/first-party-license-mgt/plan-listing.png" alt-text="The screenshots shows plan page to add plan name and plan description for your app.":::

1. Select Save draft.

### Define markets

Every plan must be available in at least one market. On the Pricing and availability tab, you can configure the markets this plan will be available

1. Under Markets, select the Edit markets link.
1. In the dialog box that appears, select the market locations where you want to make your plan available. You must select a minimum of one and maximum of 141 markets.

### Define pricing

You must associate a pricing model with each plan: either flat rate or per user. All plans in the same offer must use the same pricing model.

1. Select Pricing and availability from the left pane.
1. Under Pricing, select Flat rate or Per User.
1. Add the billing terms you want: 1-month, 1-year, 2-year, and 3-year billing terms can be added.
1. For each billing term, select the payment option to set the payment schedule. Only one payment option per term can be configured on the same plan.
1. Enter the price for each payment occurrence.

    :::image type="content" source="~/assets/images/first-party-license-mgt/pricing-availability.png" alt-text="The screenshots shows pricing and availability page to add SaaS offer for your app.":::

1. Select Save draft.
1. Select **Plan overview** at the top of the page to go to the listing page that shows all the plans you've created for this offer.

   :::image type="content" source="~/assets/images/first-party-license-mgt/list-of-plans-created.png" alt-text="The screenshots shows plan listing page with service ID, pricing model, availability, status and action.":::

1. Copy the service ID of the plan you created to integrate with Microsoft Graph usageRights API.

Integrate with Graph usageRights API to manage user permissions at the time of app launch by a customer who has a purchase license.

### Free trial

You can configure a free trial for each plan in your offer. Select the check box to allow a one-month free trial.

* Under Free Trial, select the Allow a one-month free trial check box.

After you create one or more plans, you'll see your plan name, plan ID, pricing model, availability (Public or Private), current publishing status, and any available actions on the Plan overview tab.

## Update your Teams app

Update your Teams app to map to the paid functionality and [Map your Teams app](https://aka.ms/TMTG) to your offer and publish.

## Post purchase

1. After activation, customer is redirected from landing page to Teams License Management.

1. Upon successful completion of subscription purchase, the customer is redirected to the app landing page for subscription activation. This is the existing experience for user purchasing [Monetized apps in Teams](https://aka.ms/TMTG).

1. After the customer activates the subscription purchase on landing page, customer is redirected to subscriptions page in Teams via a [redirect URL](https://teams.microsoft.com/_#/subscriptionManagement) link or button that the customer selects on the publisher landing page.

## Check license usage in Partner Center analytics

1. Sign in to [Partner Center](https://partner.microsoft.com/).
1. In the left pane, go to **Commercial Marketplace > Analyze > Licensing**.
1. Select **Plan and Tenant** in the reporting widget to see the month wise usage.

## See also

[Monetize your app](monetize-overview.md)
