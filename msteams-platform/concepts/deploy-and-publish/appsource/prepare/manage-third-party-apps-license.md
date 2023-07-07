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

To enable license management for a third-party app in Teams, you must create a plan for the offer and configure pricing and availability of the plan.

Offers sold through the Microsoft commercial marketplace must have at least one plan. You can create a variety of plans with different options within the same offer.

## Create a plan

1. Select Plan overview from the left pane, and then select Create new plan.
1. Enter Plan ID and Plan name, and then select Create.
1. Select the plan to add pricing and availability information

## Define Plan listing

On the **Plan listing** tab, you can define the plan name and description as you want them to appear in the commercial marketplace.

1. Under Plan listing, enter the Plan name and Plan description.
1. Select Save draft.

## Define markets

Every plan must be available in at least one market. On the Pricing and availability tab, you can configure the markets this plan will be available

1. Under Markets, select the Edit markets link.
1. In the dialog box that appears, select the market locations where you want to make your plan available. You must select a minimum of one and maximum of 141 markets.

## Define pricing

You must associate a pricing model with each plan: either flat rate or per user. All plans in the same offer must use the same pricing model.

1. Select Pricing and availability from the left pane.
1. Under Pricing, select Flat rate or Per User.
1. Add the billing terms you want: 1-month, 1-year, 2-year, and 3-year billing terms can be added.
1. For each billing term, select the payment option to set the payment schedule. Only one payment option per term can be configured on the same plan.
1. Enter the price for each payment occurrence.
1. Select Save draft.
1. Select Plan overview at the top of the page to go to the listing page that shows all the plans you've created for this offer.
1. Copy the service ID of the plan you created to integrate with Microsoft Graph usageRights API.

Integrate with Graph usageRights API to manage user permissions at the time of app launch by a customer who has a purchase license.

## Free trial

You can configure a free trial for each plan in your offer. Select the check box to allow a one-month free trial.

* Under Free Trial, select the Allow a one-month free trial check box.

After you create one or more plans, you'll see your plan name, plan ID, pricing model, availability (Public or Private), current publishing status, and any available actions on the Plan overview tab.

1. [Create an offer in Partner Center](#create-an-offer-in-partner-center)
1. [Update your Teams app](#update-your-teams-app)
1. [Post purchase](#post-purchase)
1. [Integrate with Graph usageRights API](#integrate-with-graph-usagerights-api)

## Create an offer in Partner Center

1. Sign in to [Partner Center](https://partner.microsoft.com/) and select **Partner Center**.

   :::image type="content" source="~/assets/images/first-party-license-mgt/partner-center-home-page.png" alt-text="The screenshots shows how to login to the Partner Center account.":::

1. In the **Home** page, select **Marketplace offers** tab to define commercial marketplace offers.

   :::image type="content" source="~/assets/images/first-party-license-mgt/home-page.png" alt-text="The screenshots shows the home page and Marketplace offer tab in the Partner Center.":::

1. Select **Overview** from the left pane.

1. Select **New Offer** > **Software as a Service**.

   :::image type="content" source="~/assets/images/first-party-license-mgt/commercial-marketplace.png" alt-text="The screenshots shows the marketplace offer page where you can select new offer.":::

1. Enter **Offer ID** and **Offer alias** and select **Create**.

   > [!NOTE]
   > If you're creating an offer for testing purpose, add the text **-ISVPILOT** to the end of your offer alias. This indicates the certification team that the offer is for testing purposes. Microsoft delete offers with **-ISVPILOT** periodically. So, don't use this tag for reasons other than testing the license management capability.

   :::image type="content" source="~/assets/images/first-party-license-mgt/saas.png" alt-text="The screenshots shows how to enter Offer ID and Offer alias in the Partner Center.":::

1. In the Offer setup page, under setup details, select the checkbox **Yes, I would like Microsoft to manage customer licenses on my behalf**.

   :::image type="content" source="~/assets/images/first-party-license-mgt/saas-isvpilot.png" alt-text="The screenshots shows the offer setup page to setup license to manage for your app within Teams.":::

   > [!NOTE]
   >
   > * This is a one-time setting and you can't change it once your offer is published. This allows the customer to manage licenses for your app within Teams.
   > * The App manifest supports only one offer for an app. Choose an appropriate license management solution for all the plans available in your offer and you can't change this option after the offer is pushed to live.

1. Select **Save draft**.

1. Select **Plan overview** from the left pane, and then select **Create new plan**.

   > [!NOTE]
   > You need to add at least one plan.

   :::image type="content" source="~/assets/images/first-party-license-mgt/plan-overview.png" alt-text="The screenshots shows plan overview to create a new plan for your apps in the Partner Center.":::

1. Enter Plan ID and Plan name, and then select **Create**.

1. Enter the **Plan name** and **Plan description**.

   > [!NOTE]
   > The plan information displays on Teams marketplace and [AppSource](https://appsource.microsoft.com/) under offer listing (plans section).

   :::image type="content" source="~/assets/images/first-party-license-mgt/plan-listing.png" alt-text="The screenshots shows plan page to add plan name and plan description for your app.":::

1. Select **Save draft**.

1. Select **Pricing and availability** from the left pane.

1. Add pricing and availability details.

   :::image type="content" source="~/assets/images/first-party-license-mgt/pricing-availability.png" alt-text="The screenshots shows pricing and availability page to add SaaS offer for your app.":::

1. Select **Save draft**.

1. Select **Plan overview** at the top of the page to go to the listing page that shows all the plans you've created for this offer.

   :::image type="content" source="~/assets/images/first-party-license-mgt/list-of-plans-created.png" alt-text="The screenshots shows plan listing page with service ID, pricing model, availability, status and action.":::

1. Copy the service ID of the plan you created to integrate with Microsoft Graph usageRights API.

## Update your Teams app

Update your Teams app to map to the paid functionality and [Map your Teams app](https://aka.ms/TMTG) to your offer and publish.

## Post purchase

1. After activation, customer is redirected from landing page to Teams License Management.

1. Upon successful completion of subscription purchase, the customer is redirected to the app landing page for subscription activation. This is the existing experience for user purchasing [Monetized apps in Teams](https://aka.ms/TMTG).

1. After the customer activates the subscription purchase on landing page, customer is redirected to subscriptions page in Teams via a [redirect URL](https://teams.microsoft.com/_#/subscriptionManagement) link or button that the customer selects on the publisher landing page.

## Integrate with Graph usageRights API

Integrate with Graph usageRights API to manage user permissions at the time of app launch by a customer who has a purchase license. You're required to determine the user’s permissions for the app with a Graph call to the usageRights API.

You can call Graph APIs to determine if the currently logged in user with a valid subscription of the plan has access to your app. To call Graph usageRights API to check user permissions, follow the steps:

1. Get user OBO token: [Get access on behalf of a user](/graph/auth-v2-user).

1. Call Graph to get user’s object ID: [Use the Microsoft Graph API](/graph/use-the-api).

1. Call usageRights API to determine the user has License to the plan: [List user usageRights API](/graph/api/user-list-usagerights?view=graph-rest-beta&tabs=http&preserve-view=true).

   > [!NOTE]
   >
   > * You need to have minimum `User.Read` permissions to call usageRights.
   > The usageRights API is currently in beta version. After the version is updated to V1, users must upgrade from beta to V1 version.
   > * If the Azure AD app is used for both SaaS Fulfillment APIs and usageRights API, ensure that the tenant under which the Azure AD app is created is either the publishing tenant or the associated tenant in the Partner Center.

To determine if the tenant for the Azure AD app is part of the Partner Center setup, follow these steps:

1. Sign in  to [Microsoft Partner Center](https://partner.microsoft.com/) with the publisher account that is used to publish the SaaS offer.
1. On the upper-right corner, select the **Settings** icon.
1. Select **Account Settings**.
1. On the left pane, select **Tenants**.
   You can see all tenants associated with the Microsoft Partner Network (MPN) account. The tenant, who is the owner of the Azure AD app, must be available in the list. If the tenant isn’t on the list, you can use the **Associate Azure ID** button to link the tenant.

## Check license usage in Partner Center analytics

1. Sign in to [Partner Center](https://partner.microsoft.com/).
1. In the left pane, go to **Commercial Marketplace > Analyze > Licensing**.
1. Select **Plan and Tenant** in the reporting widget to see the month wise usage.

## See also

[Monetize your app](monetize-overview.md)
