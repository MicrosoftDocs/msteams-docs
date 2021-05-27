---
title: Include a SaaS offer with your app
description: Describes how to include license or subscription options for using your app.
ms.author: surbhigupta
ms.topic: how-to
localization_priority: Normal 
---

# Include a SaaS offer with your Microsoft Teams app

> [!NOTE]
> This feature is currently available in [public developer preview](~/resources/dev-preview/developer-preview-intro.md) only.

You can provide app subscription plans or licenses that users can purchase on your Teams store listing. This process includes creating a software-as-a-service (SaaS) offer in Partner Center and linking that offer to your app in the Developer Portal for Teams.

> [!TIP]
> We recommended you create and link your SaaS offer before publishing your app to the Teams store. If your app is already listed in the store, you must republish your app to include the SaaS offer.

## Prerequisites

* To create a SaaS offer, you must have a [Partner Center account](create-partner-center-dev-account.md).
* In your app manifest, configure the `manifestVersion` property to `devPreview` or at least `v1.10`. If you don't, you app will fail validation when you try to publish.

## Plan your SaaS offer

Think about the following before you create your SaaS offer:

* Understand that you're responsible for managing and paying for the infrastructure required to support your customers' use of your SaaS offer.
* Consider using [Azure Active Directory (Azure AD)](/azure/marketplace/azure-ad-saas) to simplify and secure the purchasing process for users. If your offer type is *Sell through Microsoft* (transactable), Azure AD with single sign-on (SSO) identity management and authentication is required.
* Determine if you want [metered billing](/azure/marketplace/partner-center-portal/saas-metered-billing) for your offer. 

For complete information, see [how to plan a SaaS offer for the commercial marketplace](/azure/marketplace/plan-saas-offer).

## Create your SaaS offer

In Partner Center, you can [configure plans and pricing details for your SaaS offer](/azure/marketplace/create-new-saas-offer).

## Link your SaaS offer to your app

Once you create the SaaS offer in Partner Center, you can link it to your Teams app through the Developer Portal for Teams.

**To link your SaaS offer to your app**

1. Go to the [Developer Portal](https://aka.ms/dev-portal) and select **Apps**.
1. On the **Apps** page, select the app for which you want to link your SaaS offer.
1. Go to the **Plans and pricing** page and enter your **Publisher ID** and **Offer ID** (you can find these in Partner Center).
1. Select **Preview** to view the details of the SaaS offer, then select **Save**.

   The `subscriptionOffer` property is added to your app manifest.

   ```json
      "subscriptionOffer": {
        "offerId": "publisher ID and offer ID"  
        }
   ```

1. Select the **Distribute** button and choose **Publish to Teams store** to begin the process of publishing your app with the SaaS offer. (For more information, see [publish to the Microsoft Teams store](~/concepts/deploy-and-publish/appsource/publish.md).)

Once published, users can purchase subscriptions plans associated with your app in the Teams store listing.

## End user purchase experience

The following example shows how end users can purchase subscription plans for a fictional Teams app called Recloud.

**To purchase an app subscription plan**

1. In the Teams store, select the app that you want and select **Buy a subscription**.

    :::image type="content" source="~/assets/images/saas-offer/buysubscriptionplan.png" alt-text="Buying the subscription for the selected app.":::

2. In the **Choose a subscription plan** dialog, choose the subscription plan you want and select **Checkout**.

    :::image type="content" source="~/assets/images/saas-offer/choosingsubscriptionplan.png" alt-text="Selecting the appropriate subscription plan.":::

3. In the **Checkout** dialog, provide any required information and select **Place order**.

    :::image type="content" source="~/assets/images/saas-offer/placesubscriptionorder.png" alt-text="Placing the subscription order.":::

1. Once the purchase is complete, Recloud can manage this and other app subscriptions internally through its own website.

    :::image type="content" source="~/assets/images/saas-offer/subscriptionlicenses.png" alt-text="Configuring the user licenses.":::

## Admin purchase experience

Admins can purchase app subscription plans in the [Teams admin center](/MicrosoftTeams/purchase-third-party-apps).

## See also

* [Maintaining and supporting your published app](../post-publish/overview.md)
