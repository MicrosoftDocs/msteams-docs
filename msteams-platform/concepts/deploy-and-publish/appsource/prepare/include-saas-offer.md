---
title: Include a SaaS offer with your app
description: Learn to monetize your Microsoft Teams app by selling subscription plans directly from your Teams store listing. Understand publish app, end-user, admin purchase experience. 
author: heath-hamilton
ms.author: surbhigupta
ms.topic: how-to
ms.localizationpriority: high
---

# Include a SaaS offer with your Teams app

:::row:::
   :::column span="3":::

With a transactable Software-as-a-Service (SaaS) offer, you can monetize your Teams app by selling subscription plans directly from your Teams store listing. For example, say you have a free app anyone can get in the store. Now you can offer premium and enterprise plans for users who want more features.

Here's a general idea of how to monetize your app:

1. [Plan your SaaS offer](#plan-your-saas-offer).

1. [Integrate with the SaaS Fulfillment APIs](#integrate-with-the-saas-fulfillment-apis).

1. [Build a landing page for subscription management](#build-a-landing-page-for-subscription-management).

1. [Create your SaaS offer](#create-your-saas-offer).

1. [Configure your app for the SaaS offer](#configure-your-app-for-the-saas-offer).

1. [Publish your app to the Teams store](#publish-your-app).

   :::column-end:::
   :::column span="1":::

:::image type="content" source="~/assets/images/saas-offer/saas-offer-diagram.png" alt-text="Diagram showing process for how to include a SaaS offer with your Teams app.":::

   :::column-end:::
:::row-end:::

## Plan your SaaS offer

For comprehensive guidance, see [how to plan a SaaS offer for the Microsoft commercial marketplace](/azure/marketplace/plan-saas-offer).

When planning how to monetize your Teams app, here are some things to consider:

* Decide on your subscription model. A transactable SaaS offer can include multiple subscription plans. Public subscription plans available to anyone are most common, but you may also want to target specific customers with deals only for them. For more information, see [private plans in the Microsoft commercial marketplace](/azure/marketplace/private-plans).
* Read about the [*Sell through Microsoft* listing option](/azure/marketplace/plan-saas-offer#listing-options) for your SaaS offer, which is required if you want users to purchase subscription plans for your app directly through the Teams store.
* Learn how [Azure Active Directory single sign-on (SSO)](/azure/marketplace/azure-ad-saas) helps your customers purchase and manage subscriptions. (Microsoft Azure Active Directory (Azure AD) SSO is required for Teams apps with SaaS offers.)
* Understand that you're responsible for managing and paying for the infrastructure required to support your customers' use of your SaaS offer.
* Plan for mobile. To avoid violating third-party app store policies, your app can't include links that allow users to purchase subscription plans on mobile. However, you can still indicate if your app has features that require a subscription plan. For more information, see the related [commercial marketplace certification policies](/legal/marketplace/certification-policies#114048-mobile-experience).

## Integrate with the SaaS Fulfillment APIs

Integrating with the SaaS Fulfillment APIs is required for monetizing your Teams app. These APIs help you manage the lifecycle of a subscription plan once it’s purchased by a user.

For complete instructions and API reference, see the [SaaS Fulfillment APIs documentation](/azure/marketplace/partner-center-portal/pc-saas-fulfillment-apis). In general, you’ll implement the following steps using the APIs once a subscription is purchased:

1. Receive a [*purchase identification token*](/azure/marketplace/partner-center-portal/pc-saas-fulfillment-life-cycle#purchased-but-not-yet-activated-pendingfulfillmentstart) via the URL to your landing page.

1. Use the token to retrieve subscription details.

1. Notify the commercial marketplace that the subscription is activated.

### Best practices for implementing subscription management

* With transactable SaaS offers for Teams apps, subscription plans (licenses) should be assigned to individual users rather than groups or an entire org.
* When users are assigned a subscription plan, notify them through a Teams bot or email. In the messaging, include information on how to add the app to Teams and get started.
* Support the idea of multiple admins. In other words, multiple users in the same org can purchase and manage their own subscriptions.

### App launch experience

When a new user launches the app for the first time, they're requested to provide consent to the app. Following is an example of the consent screen shown when calling for user profile data with minimum User.Read permission.

Consent dialog is part of the flow to get the users license information and may vary based on ISV’s integration approach.

:::image type="content" source="../../../../assets/images/saas-offer/permissions-requested.png" alt-text="Screenshot showing the permissions requested.":::

## Admin purchasing experience

Admins can purchase app subscription plans in the [Teams admin center](/microsoftteams/purchase-third-party-apps).

## Remove a SaaS offer from your app

If you unlink a SaaS offer included in your Teams store listing, you must republish your app to see the change in the store.

1. Go to the [Developer Portal](https://dev.teams.microsoft.com/) and select **Apps**.
1. On the **Apps** page, select the app you're removing the offer from.
1. Go to the **Plans and pricing** page and select **Revert**.
1. After the offer is unlinked, do the following to update your store listing:
   1. Select **Distribute > Publish to the Teams store**.
   1. Select **Open Partner Center** to begin the process of republishing your app without the offer.

## Code sample

| **Sample name** | **Description** | **Node.js** | **Manifest**|
|-----------------|-----------------|----------------|----------------|----------------|
| Tab App Monetization | This is an sample tab application which shows how to open purchase dialog and trigger purchase flow using Teams JS SDK.|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-app-monetization/nodejs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-app-monetization/nodejs/demo-manifest/tab-app-monetization.zip)|

## See also

* [Monetize your app](monetize-overview.md)
* [Maintaining and supporting your published app](../post-publish/overview.md)
* [Validation guidelines for apps linked to SaaS offer](teams-store-validation-guidelines.md#apps-linked-to-saas-offer)
