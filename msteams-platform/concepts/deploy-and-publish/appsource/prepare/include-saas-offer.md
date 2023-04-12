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

## Build a landing page for subscription management

When someone finishes buying a subscription plan for your app in the Teams store, the commercial marketplace will direct them to your landing page where they can manage the subscription (such as assign a license to a specific user in their org).

For complete instructions, see [build the landing page for your SaaS offer](/azure/marketplace/azure-ad-transactable-saas-landing-page).

### Best practices for landing pages

Consider the following approaches when building a landing page for the Teams app you’re monetizing. See an example landing page in the [End-user purchase experience](end-user-purchase-experience.md).

* Users must be able to sign in to your landing page with the same Azure AD credentials they used to buy the subscription. For more information, see [Azure AD and transactable SaaS offers in the commercial marketplace](/azure/marketplace/azure-ad-saas).
* Allow users to take the following actions on your landing page. Don’t forget to consider what’s appropriate for a user’s role and permissions. For example, you may want to allow only subscription admins to search for users):
  * Search for users in their org using email or another form of identity.
  * See users they can assign licenses to in a list.
  * Assign licenses to one or multiple users at the same time.
  * Assign and manage different types of licenses (if available).
  * Validate if a license is already assigned to another user.
  * Cancel their subscription.
* Provide an introduction on how to use your app.
* Add ways to get support, such as an FAQ, knowledge base, or contact email.
* Provide a link that makes it easy for the subscriber to get back to the landing page. For example, include this link in your app’s **About** tab.

## Create your SaaS offer

Once you’ve integrated the SaaS Fulfillment APIs and built your landing page where users can manage their subscriptions, it's time to officially create, test, and publish your transactable SaaS offer.

### Create the offer

See [create a SaaS offer](/azure/marketplace/create-new-saas-offer) for complete instructions on how to do this in Partner Center. The following steps describe what to do at a high level.

1. Create a [Partner Center](https://partner.microsoft.com/) account if you don’t have one.

1. Configure the subscription plans, pricing details, and more for your transactable SaaS offer. In particular, make sure you complete the following steps:

    * Under **Setup details**, select the **Yes** option to specify that you’re selling the offer through Microsoft.

    * Under **Microsoft 365 integration**, add the AppSource link to your app listing. This step ensures people can buy your subscription plans in AppSource in addition to Teams.

1. Store your publisher and offer IDs. (You need them later to link the offer to your app in the Developer Portal.)

1. Publish your offer to the commercial marketplace.

### Test the offer

We recommend that you verify the end-to-end purchasing experience before publishing your SaaS offer. You can verify by creating a separate offer just for testing. For complete information, see [test offer overview](/azure/marketplace/plan-saas-offer#test-offer), [create a test offer](/azure/marketplace/create-saas-dev-test-offer), and [preview your offer](/azure/marketplace/test-publish-saas-offer).

> [!IMPORTANT]
> You can test an end-to-end transaction in Teams using the [Test preview for monetized apps](Test-preview-for-monetized-apps.md) feature. For live offers you must complete the app store validation process.

From a Teams standpoint, these tests must verify that the number of licenses and assignments match what’s in the Teams admin center when users:

* Activate and configure their subscription plan on your landing page.
* Assign, remove, or reassign licenses to themselves or others.
* Cancel or renew their subscription.

### Publish the offer

Once you finish testing, [publish your offer live](/azure/marketplace/test-publish-saas-offer#publish-your-offer-live).

## Configure your app for the SaaS offer

You’ve published your SaaS offer, but you still must link it to your Teams app for users to see your subscription plans in the Teams store.

1. Go to the [Developer Portal](https://dev.teams.microsoft.com/) and select **Apps**.
1. On the **Apps** page, select the app you're linking the SaaS offer to.
1. Go to the **Plans and pricing** page and specify your publisher and offer IDs. (You can find these IDs in Partner Center if you don't have them readily available.)
1. Select **View** to preview your SaaS offer's subscription plans.
1. If everything looks good, select **Save**.

   The `subscriptionOffer` property is added to your [app manifest](~/resources/schema/manifest-schema-dev-preview.md#subscriptionoffer).

   ```json
      "subscriptionOffer": {
        "offerId": "publisherId.offerId"  
        }
   ```

> [!NOTE]
> The `subscriptionOffer` property is supported in manifest schema version 1.10 or later.

## Publish your app

You’ve created your SaaS offer and linked it to your Teams app—now it's time to publish your app to the Teams store. For complete instructions, see [publish your app to the Teams store](~/concepts/deploy-and-publish/appsource/publish.md).

> [!IMPORTANT]
>
> * Even if your app is already listed on the Teams store, you still must go through the store validation process again to include your SaaS offer.
> * Flat rate offers created without the Offer ID and Publisher ID in the app manifest should be updated and resubmitted for validation.

Once published, users will see a **Buy a subscription** option in the app details dialog when they try to add your app to Teams.

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
