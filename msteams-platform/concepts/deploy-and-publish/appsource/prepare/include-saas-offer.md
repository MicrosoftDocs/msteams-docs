---
title: Include a SaaS offer with your app
description: Learn to monetize your Microsoft Teams app by selling subscription plans directly from your Teams store listing. Understand publish app, end-user, admin purchase experience. 
author: heath-hamilton
ms.author: surbhigupta
ms.topic: how-to
ms.localizationpriority: high
ms.date: 03/21/2023
---

# Include a SaaS offer with your Teams app

:::row:::
   :::column span="3":::

SaaS apps published to Microsoft commercial marketplace, either Azure marketplace or Microsoft AppSource are known as SaaS offers. Based on the SaaS offer configurations, the offers are available in one or both the marketplaces. This guide helps you to add SaaS offers as premium and/or enterprise plans for users who want more features to an existing basic free app.

To create a SaaS offer for your application and sell through commercial marketplace, you must first plan and prepare for the offer:

1. Plan your offer
1. Prepare to create an offer/Fulfil the prerequisites
1. Create an offer
1. Configure your app for the SaaS offer
1. Test the offer
1. Publish the app with the SaaS offer

## Plan your offer

To create and publish your SaaS offer in the marketplace, it is recommended that you plan the offer and fulfil the prerequisites.

1. Decide the publishing option – The initial step to create any SaaS offer is to choose how the app should be available in the marketplace. You can choose to sell through Microsoft where Microsoft host all your transactions. The other option is to manage your transactions independently which further has three list offers. The type of listing option decides the information required to create the specific offer in Partner Center. The publishing option is available as a call-to-action button in your landing page.

1. Choose the type of Plan/subscription model - SaaS offers through Microsoft must have at least one plan added. The plan can either be private or public, public plans are available for all customers while private plans are customized for specific customers.
1. Decide the pricing model and billing term – You can choose between two pricing model offered for SaaS offers - flat rate or per user. For example, a SaaS offer cannot have one plan that's flat rate and another plan that’s per user. The billing terms can be monthly or annual.
1. Choose to have free trails - Microsoft allows a free trial period of one month, after which the offer is billed based on the subscription model./ When you sell through Microsoft, you can offer free trial of one month and Microsoft converts it to a paid subscription by the end of the trial period.
1. Plan for mobile - To avoid violating third-party app store policies, your app can't include links that allow users to purchase subscription plans on mobile. However, you can still indicate if your app has features that require a subscription plan. For more information, see the related commercial marketplace certification policies.
1. Plan to provide Test drive.

For comprehensive guidance, see how to plan a SaaS offer for the Microsoft commercial marketplace.
Note

Note: Pricing model and billing term can’t be changed once the offer is published.

## Prepare to create an offer

Before you start to create a SaaS offer, make sure the technical requirements are in place.

### Technical configuration

(Based on the listing option, the technical configuration differs, can add information in that order – Add reference page link)

If you choose to sell your SaaS offer through Microsoft, there are certain technical configurations to be done (requirements that needs to be fulfilled) before you can create your offer. The technical requirements differ based on the listing option you chose for your SaaS offer. (It helps negate any blockers while creating the app.) This helps to manage and track your offers right from the start and provide seamless user experience.

• Enable Microsoft Accounts and Azure Active Directory (Azure AD)

• Create a landing page

When someone finishes buying a subscription plan for your app in the Teams store, the commercial marketplace will direct them to your landing page where they can manage the subscription (such as assign a license to a specific user in their org). For complete instructions, see build the landing page for your SaaS offer. A buyer is directed to the landing page after they subscribe to an offer.After the SaaS offer is purchased successfully, the user is directed to the landing page where they activate and configure the subscription. Action taking page. Learn how to create a landing page for your transactable SaaS offer. What the landing page should have - allow the user to sign in with Azure AD SSO.

• Integrate with Fulfillment SaaS API (purpose)

Integrating with the SaaS Fulfillment APIs is required for monetizing your Teams app. These APIs help you manage the lifecycle of a subscription plan once it’s purchased by a user.

In general, you’ll implement the following steps using the APIs once a subscription is purchased:

1. Receive a purchase identification token via the URL to your landing page.
1. Use the token to retrieve subscription details.
1. Notify the commercial marketplace that the subscription is activated.)

For complete instructions and API reference, see the SaaS Fulfillment APIs documentation.

• Integrate with Graph usageRights API (purpose)

Integrate with Graph usageRights API to manage user permissions at the time of app launch by a customer who has a purchase license. You're required to determine the user’s permissions for the app with a Graph call to the usageRights API.

You can call Graph APIs to determine if the currently logged in user with a valid subscription of the plan has access to your app. To call Graph usageRights API to check user permissions, follow the steps:

1. Get user OBO token: Get access on behalf of a user.
1. Call Graph to get user’s object ID: Use the Microsoft Graph API.
1. Call usageRights API to determine the user has License to the plan: List user usageRights API.

Note

You need to have minimum User.Read permissions to call usageRights. The usageRights API is currently in beta version. After the version is updated to V1, users must upgrade from beta to V1 version.

If the Azure AD app is used for both SaaS Fulfillment APIs and usageRights API, ensure that the tenant under which the Azure AD app is created is either the publishing tenant or the associated tenant in the Partner Center.

To determine if the tenant for the Azure AD app is part of the Partner Center setup, follow these steps:

1. Sign in to Microsoft Partner Center with the publisher account that is used to publish the SaaS offer.
1. On the upper-right corner, select the Settings icon.
1. Select Account Settings.
1. On the left pane, select Tenants. You can see all tenants associated with the Microsoft Partner Network (MPN) account. The tenant, who is the owner of the Azure AD app, must be available in the list. If the tenant isn’t on the list, you can use the Associate Azure ID button to link the tenant.

With a transactable Software-as-a-Service (SaaS) offer, you can monetize your Teams app by selling subscription plans directly from your Teams store listing. For example, say you have a free app anyone can get in the store. Now you can offer premium and enterprise plans for users who want more features.

Now that we have planned and prepared for the SaaS offer, let's move to create a SaaS offer as planned.

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
