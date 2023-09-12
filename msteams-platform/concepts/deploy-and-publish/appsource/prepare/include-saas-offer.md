---
title: Plan your SaaS offer for the marketplace
description: Learn how to plan your SaaS offer, basic information for your plan, and about the features and its functionalities.
author: heath-hamilton
ms.author: surbhigupta
ms.topic: how-to
ms.localizationpriority: high
ms.date: 03/21/2023
---

# Plan your SaaS offer

Software as a service (SaaS) apps available for purchase in Microsoft commercial marketplace, either Azure Marketplace or Microsoft AppSource, are SaaS offers. Based on the SaaS offer configurations, the offers are available in one or both marketplaces. This article provides an overview of the features in an offer and helps to plan the offer.

:::row:::
   :::column:::
      :::image type="icon" source="~/assets/images/saas-offer/monetize-flow1a.png" link="include-saas-offer.md" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="~/assets/images/saas-offer/monetize-flow2.png" link="prerequisites.md" border="false":::
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

Planning your SaaS offer helps you to understand the suitable features for the offer. Here are the features you need to plan for before creating an offer.

## Plan the publishing option

The initial step to create any SaaS offer is to decide the publishing option, that is how the offer must be available in the marketplace. The suitable option is available as a call-to-action button on the landing page.

> [!NOTE]
> Before you start creating an offer, you must decide the listing or publishing option.

You can opt to sell through Microsoft where Microsoft hosts all your transactions. The other option is to manage your transactions independently that further has three listing options.

:::row:::
    :::column:::
        :::image type="content" source="../../../../assets/images/saas-offer/pricing-charge-price.png" alt-text="Diagram represents charge a price for your app.":::
    :::column-end:::
    :::column span="2":::

**Sell through Microsoft**

Offers sold through Microsoft are transactable offers where Microsoft handles transactions for the licenses purchased. With a transactable [SaaS offer](~/concepts/deploy-and-publish/appsource/prepare/include-saas-offer.md), you can monetize your Teams app by selling subscription plans directly from your Teams store listing.

    :::column-end:::
:::row-end:::

You can further allow Microsoft to manage licenses on your behalf. If you choose Microsoft to manage licenses, you must [integrate the offer with Microsoft Graph APIs](prerequisites.md#integrate-with-graph-usagerights-api) to verify customer eligibility.

:::row:::
    :::column:::
     :::image type="content" source="../../../../assets/images/saas-offer/pricing-free-trial.png" alt-text="Diagram represents the free trials.":::
    :::column-end:::
    :::column span="2":::

**Free trials**

You can offer a free trial version of your app to get more customers to try it. To entice customers to buy the full version, you can limit the features in the trial version (for example, include only limited number of responses for a week) or specify a period for the trial.

    :::column-end:::
:::row-end:::
:::row:::
    :::column:::
        ![In-app purchases](~/assets/images/saas-offer/pricing-in-app-purchases.png)
    :::column-end:::
    :::column span="2":::

**Get it now (Free)**

You can allow the user to subscribe and use your application at no cost. The options in free versions can be limited and the user can upgrade with subscriptions.

    :::column-end:::
:::row-end:::
:::row:::
    :::column:::
        :::image type="content" source="../../../../assets/images/apps-in-meetings/test-preview-monetize-app-image.png" alt-text="Diagram represents the test preview SaaS offer.":::
    :::column-end:::
    :::column span="2":::

**Contact me**

Customers can share their details and ask that you contact them about the offer through the leads from Microsoft.

    :::column-end:::
:::row-end:::

The type of listing option decides the technical configurations and requirements to create the specific offer in Partner Center. You must fulfill the [prerequisites](prerequisites.md) before you start creating the plan.

## Plan for the offer details

To start with, you need to plan on the basic yet key features that decide the information available on the landing page, marketplace where the offer is published, and terms of use. It helps the users to find your offer easily in the marketplace and enhances usability.

* **Offer categories and industries**: Plan on the primary and secondary categories of the offer. It decides the store where the offer is published and to identify your app in the marketplace.
* **Offer details**: Plan for the logo, keywords, and description that helps to improve the discovery and value of your offer in the marketplace.
* **Preview audience**: Decide the audience and collate their email address to allow them to use and verify the preview offer before publishing live. The email address must be either of Azure Active Directory or Microsoft.
* **Legal terms and conditions**: Provide relevant information for the users to be aware of the terms of use of your app.
* **Customer Relationship Management (CRM)**: Provide the details to receive customer leads and reach you for queries.

SaaS offers published through Microsoft must have at least one plan added. Determining the plan features contributes in providing appropriate purchase options for the target users.

### Plan the subscription model

The subscription model or plan visibility decides if the plans can be public or private. Public plans are available for all customers while private plans are customized for specific customers and visible only for targeted customers. For more information, see [Private plans in Microsoft commercial marketplace](/partner-center/marketplace/private-plans?branch=main).

Offers with private plans are published in Azure portal. Private plan can be converted to public plan later but can't be configured as private plan again.

### Plan the pricing options

When creating a plan, you can decide between two [pricing models](/partner-center/marketplace/plan-saas-offer?branch=main) available for SaaS offers.

* **Flat rate**: To charge based on the software usage across the organization. For the flat rate pricing model, you can opt to use [metered billing](/partner-center/marketplace/plans-pricing?branch=main) for consumption-based pricing.
* **Per user**: To charge for each unique user.

> [!NOTE]
> An offer can have only one pricing model. For example, a SaaS offer can't have one plan that is a flat rate and another plan that is per user.

The [billing terms](/partner-center/marketplace/plan-saas-offer?branch=main) indicate the subscription period and you can be set the billing term to monthly or annual.

> [!NOTE]
> The pricing model and billing terms can’t be changed once the offer is published.

## Plan for additional features

In addition to the basic and essential planning you did, you can also provide additional features to promote user engagement and eventually help the users to purchase your plans. These features help the users get a hands on experience of using your app before they decide to purchase offers.

### Plan for free trails

You can opt to provide free trials for your SaaS offer. Microsoft allows a free trial period of one month, after which the offer is billed based on the subscription model. When you sell through Microsoft, you can offer a free trial of one month, and Microsoft converts it to a paid subscription by the end of the trial period.

### Plan for test drive

You can opt to add a test drive for your SaaS app that provides access to the preconfigured environment of your app for fixed hours. For more information, see [Test drive for SaaS offer](/partner-center/marketplace/create-new-saas-offer).

### Plan for mobile version

To avoid violating third-party app store policies, your app can't include links that allow users to purchase subscription plans on mobile. However, you can still indicate if your app has features that require a subscription plan. For more information, see the [related commercial marketplace certification policies](/legal/marketplace/certification-policies).

For comprehensive guidance, see [how to plan a SaaS offer for the Microsoft commercial marketplace](/azure/marketplace/plan-saas-offer).

## Next step

> [!div class="nextstepaction"]
> [Prerequisites to create an offer](prerequisites.md)

## See also

* [Monetize your app](monetize-overview.md)
* [Maintaining and supporting your published app](../post-publish/overview.md)
* [Validation guidelines for apps linked to SaaS offer](teams-store-validation-guidelines.md#apps-linked-to-saas-offer)
* [Marketplace categories](/partner-center/marketplace/marketplace-categories-industries)
* [Microsoft commercial marketplace](/partner-center/marketplace/overview)
