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

Software as a Service (SaaS) applications can be purchased from Microsoft Teams Store and Microsoft AppSource. This article provides an overview of the features in an offer and helps planning your offer.

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

Understanding the features of your SaaS offer is crucial in the planning process. Plan on the following features before creating an offer.

* [Publishing option](#publishing-option)
* [Offer details](#offer-details)
* [Offer plan](#offer-plan)
* [Additional features](#additional-features)

## Publishing option

The initial step to create a SaaS offer is to determine the listing or publishing option, which decides how the offer is available in the marketplace. The listing option you select when creating the offer is available as a call-to-action button on the offer purchase landing page.

You can select from one of the four listing options to can publish a SaaS offer:

* Sell through Microsoft
* Free trials
* Get it now (Free)
* Contact me

:::row:::
    :::column:::
        :::image type="content" source="../../../../assets/images/saas-offer/pricing-charge-price.png" alt-text="Diagram represents sell through Microsoft option.":::
    :::column-end:::
    :::column span="2":::

**Sell through Microsoft**

You can opt to sell your SaaS apps through Microsoft where Microsoft hosts all your transactions for the licenses purchased. Offers sold through Microsoft are transactable [SaaS offer](~/concepts/deploy-and-publish/appsource/prepare/include-saas-offer.md) where you can sell subscription plans directly from your Teams Store.

    :::column-end:::
:::row-end:::

If you decide not to sell through Microsoft, you can manage your transactions independently through one of the following listing options.

:::row:::
    :::column:::
     :::image type="content" source="../../../../assets/images/saas-offer/pricing-free-trial.png" alt-text="Diagram represents the free trials.":::
    :::column-end:::
    :::column span="2":::

**Free trials**

You can offer a free trial version of your app to get more customers to try it. To encourage customers to buy the full version, you can limit the features in the trial version. You can allow only a limited number of responses for a week or set a specific trial period.

    :::column-end:::
:::row-end:::
:::row:::
    :::column:::
        :::image type="content" source="../../../../assets/images/saas-offer/pricing-in-app-purchases.png" alt-text="Diagram represents the free app.":::
    :::column-end:::
    :::column span="2":::

**Get it now (Free)**

You can allow the user to subscribe and use your application at no cost. The features in free version can be limited, with the option for users to upgrade through subscriptions.

    :::column-end:::
:::row-end:::
:::row:::
    :::column:::
        :::image type="content" source="../../../../assets/images/saas-offer/contact-me.png" alt-text="Diagram represents the contact me option.":::
    :::column-end:::
    :::column span="2":::

**Contact me**

Customers can share their contact details and request that you contact them about the offer through leads from Microsoft.

    :::column-end:::
:::row-end:::

The listing option you select determines the technical configurations and requirements to create the specific offer in Microsoft Partner Center. Ensure to fulfill the [prerequisites](prerequisites.md) before you start creating the plan.

You can further allow Microsoft to manage licenses on your behalf. If you select Microsoft to manage licenses, you must [integrate the offer with Microsoft Graph APIs](prerequisites.md#integrate-with-graph-usagerights-api) to verify customer eligibility.

## Offer details

When planning on the information available on your offer's landing page, take into account the following key features. It helps boost your offer's discoverability and usability.

* **Offer categories and industries**: Identify the primary and secondary categories for your offer. These categories determine the marketplace where your offer is published and help users identify your app.
* **Offer details**: Design a distinctive logo, select relevant keywords, and write a compelling description to enhance your offer's discoverability and value.
* **Preview audience**: Identify the audience and collate their email address to allow them to use and verify the preview offer before publishing live.
* **Legal terms and conditions**: Provide clear and comprehensive information about the terms of use for the users understand their rights and responsibilities.
* **Customer Relationship Management (CRM)**: Provide contact information to receive customer leads and address queries.

## Offer plan

SaaS offers published through Teams Store or AppSource must have at least one plan added. The plan features facilitate appropriate purchase options for the target users.

### Plan the subscription model

The subscription model or plan visibility decides if the plans can be public or private. Public plans are available for all customers while private plans are customized and visible only for targeted customers. For more information, see the [private plans in Microsoft commercial marketplace](/partner-center/marketplace/private-plans?branch=main).

Offers with private plans are published in Azure portal. A private plan can be converted to public plan but can't be configured as private plan again.

### Plan the pricing options

When creating a plan, you can select from two [pricing models](/partner-center/marketplace/plan-saas-offer?branch=main) available for SaaS offers.

* **Flat rate**: To charge based on the software usage across the organization. For the flat rate pricing model, you can opt to use [metered billing](/partner-center/marketplace/plans-pricing?branch=main) for consumption-based pricing.
* **Per user**: To charge for each unique user.

The [billing terms](/partner-center/marketplace/plan-saas-offer?branch=main) define the subscription period that can be set as monthly or annual.

> [!NOTE]
>
> * An offer can have only one pricing model. For example, a SaaS offer can't have one plan that's a flat rate and another plan that's per user.
> * The pricing model and billing terms can’t be altered once the offer is published.

## Additional features

In addition to the basic and essential planning, you can provide more features to promote user engagement. These features provide users with a firsthand experience of your app before they decide to purchase offers.

### Free trails

When selling through Microsoft, you can provide a one-month free trial. Microsoft automatically transitions the user to a paid subscription after the trial period.

### Test drive

You can add test drive for your SaaS app that provides access to the preconfigured environment of your app for fixed hours. For more information, see [Test drive for SaaS offer](/partner-center/marketplace/create-new-saas-offer).

### Mobile version

To adhere to third-party app store policies, your app mustn't include links that allow users to purchase subscription plans on mobile. However, you can still indicate if your app has features that require a subscription plan. For more information, see the [related commercial marketplace certification policies](/legal/marketplace/certification-policies).

For comprehensive guidance on planning the offer, see [how to plan a SaaS offer for the Microsoft commercial marketplace](/azure/marketplace/plan-saas-offer).

## Next step

> [!div class="nextstepaction"]
> [Prerequisites to create an offer](prerequisites.md)

## See also

* [Monetize your app](monetize-overview.md)
* [Plan a SaaS offer](/partner-center/marketplace/plan-saas-offer)
* [Validation guidelines for apps linked to SaaS offer](teams-store-validation-guidelines.md#apps-linked-to-saas-offer)
* [Marketplace categories and industries](/partner-center/marketplace/marketplace-categories-industries)
* [Plans and pricing for commercial marketplace offers](/partner-center/marketplace/plans-pricing)
