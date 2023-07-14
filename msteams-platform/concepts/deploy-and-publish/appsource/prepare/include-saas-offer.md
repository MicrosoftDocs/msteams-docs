---
title: Plan your SaaS offer for the marketplace
description: Learn to monetize your Microsoft Teams app by selling subscription plans directly from your Teams store listing. Understand publish app, end-user, admin purchase experience. 
author: heath-hamilton
ms.author: surbhigupta
ms.topic: how-to
ms.localizationpriority: high
ms.date: 03/21/2023
---

# Plan your SaaS offer

SaaS apps published to Microsoft commercial marketplace, either Azure marketplace or Microsoft AppSource, are known as SaaS offers. Based on the SaaS offer configurations, the offers are available in one or both the marketplaces. This guide helps you to add SaaS offers as premium or enterprise plans for users who want more features to an existing basic free app.

To create a SaaS offer for your application and sell through commercial marketplace, you must first plan for the offer.

:::image type="content" source="~/assets/images/saas-offer/monetize-flow-2.png" alt-text="Diagram shows the process for how to include a SaaS offer with your Teams app with the first phase highlighted.":::

## Plan your offer

To create and publish your SaaS offer in the marketplace, it's recommended that you plan the offer and fulfil the prerequisites.

### Choose a publishing option

Decide the publishing option: The initial step to create any SaaS offer is to choose how the app should be available in the marketplace. You can choose to sell through Microsoft where Microsoft host all your transactions. The other option is to manage your transactions independently which further has three list offers. The type of listing option decides the information required to create the specific offer in Partner Center. The publishing option is available as a call-to-action button in your landing page.

:::row:::
    :::column:::
        :::image type="content" source="../../../../assets/images/saas-offer/pricing-charge-price.png" alt-text="Charge a price for your app":::
    :::column-end:::
    :::column span="2":::

**Sell through Microsoft**

Offers sold through Microsoft are termed as transactable offers where Microsoft handles transactions for the licenses. With a transactable [Software-as-a-Service (SaaS) offer](~/concepts/deploy-and-publish/appsource/prepare/include-saas-offer.md), you can monetize your Teams app by selling subscription plans directly from your Teams store listing.

    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
     :::image type="content" source="../../../../assets/images/saas-offer/pricing-free-trial.png" alt-text="Free trials":::
    :::column-end:::
    :::column span="2":::

**Free trials**

You can offer a free trial version of your app to get more customers to try it. To entice customers to buy the full version, you can limit the features in the trial version (for example, only including limited number of responses for a week) or specify a period for the trial.

    :::column-end:::
:::row-end:::
:::row:::
    :::column:::
        ![In-app purchases](~/assets/images/saas-offer/pricing-in-app-purchases.png)
    :::column-end:::
    :::column span="2":::

**Get it now (Free)**

Allow your user to subscribe and use your application at no cost for a certain period.

    :::column-end:::
:::row-end:::
:::row:::
    :::column:::
        :::image type="content" source="../../../../assets/images/apps-in-meetings/test-preview-monetize-app-image.png" alt-text="Test preview SaaS offer":::
    :::column-end:::
    :::column span="2":::

**Contact me**

Customers can share their details and ask that you contact them about the offer through the leads you from Microsoft.

    :::column-end:::
:::row-end:::

### Choose the type of Plan/subscription model

SaaS offers through Microsoft must have at least one plan added. The plan can either be private or public, public plans are available for all customers while private plans are customized for specific customers.

### Decide the pricing model and billing term

You can choose between two pricing model offered for SaaS offers - flat rate or per user. For example, a SaaS offer cannot have one plan that's flat rate and another plan that’s per user. The billing terms can be monthly or annual.

> [!NOTE]
> Pricing model and billing term can’t be changed once the offer is published.

### Free trails

Microsoft allows a free trial period of one month, after which the offer is billed based on the subscription model. When you sell through Microsoft, you can offer free trial of one month and Microsoft converts it to a paid subscription by the end of the trial period.

### Plan for mobile

To avoid violating third-party app store policies, your app can't include links that allow users to purchase subscription plans on mobile. However, you can still indicate if your app has features that require a subscription plan. For more information, see the related commercial marketplace certification policies.

### Plan to provide Test drive

[Test drive](/partner-center/marketplace/create-new-saas-offer).

For comprehensive guidance, see [how to plan a SaaS offer for the Microsoft commercial marketplace](/azure/marketplace/plan-saas-offer).

## Next step

> [!div class="nextstepaction"]
> [Create your SaaS offer](create-saas-offer.md)

## See also

* [Monetize your app](monetize-overview.md)
* [Maintaining and supporting your published app](../post-publish/overview.md)
* [Validation guidelines for apps linked to SaaS offer](teams-store-validation-guidelines.md#apps-linked-to-saas-offer)
