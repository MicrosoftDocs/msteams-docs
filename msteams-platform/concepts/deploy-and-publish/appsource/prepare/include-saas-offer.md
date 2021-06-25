---
title: Include a SaaS offer with your app
description: Describes how to include license or subscription options for using your app.
author: heath-hamilton
ms.author: surbhigupta
ms.topic: how-to
localization_priority: Normal 
---

# Include a SaaS offer with your Microsoft Teams app

> [!NOTE]
> This feature is currently available in [public developer preview](~/resources/dev-preview/developer-preview-intro.md) only.

In your Teams store listing, you can include app subscription plans or licenses for users to purchase. This process includes creating a software-as-a-service (SaaS) offer in Partner Center and linking that offer to your app.

> [!TIP]
> We recommend that you create and link your SaaS offer before publishing your app to the Teams store. If your app is already listed in the store, you must republish your app to include the SaaS offer.

## Prerequisites

To create a SaaS offer, you must have a [Partner Center account](create-partner-center-dev-account.md).

## Plan your SaaS offer

Think about the following before you create your SaaS offer:

* Understand that you're responsible for managing and paying for the infrastructure required to support your customers' use of your SaaS offer.
* Consider using [Azure Active Directory (Azure AD)](/azure/marketplace/azure-ad-saas) to simplify and secure the purchasing process for users. If your offer type is *Sell through Microsoft* (transactable), Azure AD with single sign-on (SSO) identity management and authentication is required.
* Consider integrating with the [SaaS Fullfillment APIs](/azure/marketplace/partner-center-portal/pc-saas-fulfillment-apis). This is required if your offer type is *Sell through Microsoft* (transactable).
* Determine if you want [metered billing](/azure/marketplace/partner-center-portal/saas-metered-billing) for your offer. 

For comprehensive guidance, see [how to plan a SaaS offer for the commercial marketplace](/azure/marketplace/plan-saas-offer).

## Create your SaaS offer

In Partner Center, [configure plans, pricing details, and more](/azure/marketplace/create-new-saas-offer) for your SaaS offer.

## Link your SaaS offer to your app

Once you create the SaaS offer in Partner Center, you can link it to your Teams app through the Developer Portal.

1. Go to the [Developer Portal](https://aka.ms/dev-portal) and select **Apps**.
1. On the **Apps** page, select the app you're linking the SaaS offer to.
1. Go to the **Plans and pricing** page and specify your publisher and offer IDs (you can find these in Partner Center).
1. Select **Preview** to view the details of the SaaS offer, then select **Save**.

   The `subscriptionOffer` property is added to your app manifest.

   ```json
      "subscriptionOffer": {
        "offerId": "publisherId.offerId"  
        }
   ```

## Publish your SaaS offer

Publishing your SaaS offer also requires publishing your app. If your app is already listed in the store, you must republish the app to include the SaaS offer.

1. In the Developer Portal, go to the app you're linking the offer to and select **Distribute**.
1. Choose **Publish to the Teams store**. 
1. Select **Open Partner Center** to begin the process of publishing your app with the SaaS offer. (For more information, see [publish to the Teams store](~/concepts/deploy-and-publish/appsource/publish.md).)

Once published, users can purchase subscriptions plans associated with your app in your store listing.

## End-user purchasing experience

The following example shows how end users can purchase subscription plans for a fictional Teams app called *Recloud*.

1. In the Teams store, select the app that you want and select **Buy a subscription**.

    :::image type="content" source="~/assets/images/saas-offer/buysubscriptionplan.png" alt-text="Buying the subscription for the selected app.":::

2. In the **Choose a subscription plan** dialog, choose the subscription plan you want and select **Checkout**.

    :::image type="content" source="~/assets/images/saas-offer/choosingsubscriptionplan.png" alt-text="Selecting the appropriate subscription plan.":::

3. In the **Checkout** dialog, provide any required information and select **Place order**.

    :::image type="content" source="~/assets/images/saas-offer/placesubscriptionorder.png" alt-text="Placing the subscription order.":::

1. Once the purchase is complete, Recloud can manage this and other app subscriptions internally through its own website.

    :::image type="content" source="~/assets/images/saas-offer/subscriptionlicenses.png" alt-text="Configuring the user licenses.":::

## Admin purchasing experience

Admins can purchase app subscription plans in the [Teams admin center](/MicrosoftTeams/purchase-third-party-apps).

## See also

* [Maintaining and supporting your published app](../post-publish/overview.md)
