---
title: Plan your SaaS offer for the marketplace
description: Learn how to plan your SaaS offer, basic information for your plan, and about the features and its functionalities.
author: heath-hamilton
ms.author: surbhigupta
ms.topic: how-to
ms.localizationpriority: high
ms.date: 03/21/2023
---

# SaaS offer for your Teams app

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
      :::image type="icon" source="~/assets/images/saas-offer/monetize-flow4.png" link="Test-preview-for-monetized-apps.md" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="~/assets/images/saas-offer/monetize-flow5.png" link="publish-saas-offer-app.md" border="false":::
   :::column-end:::
:::row-end:::

## Plan a SaaS offer

To monetize your Software as a Service (SaaS) app, it's important that you understand the features of a SaaS offer. Here's a brief overview of the features in an offer that aids you to plan better.

The key features are:

* **Offer type**: The initial step to create a SaaS offer is to decide the listing or publishing option that aligns with your requirements. The listing option you select, when creating an offer, appears as a call-to-action button on the offer purchase landing page.
* **Offer details**: Offer details are the basic information available on the offer's landing page. The following key features enhance the discoverability and usability of your offer.
* **Offer plan**: SaaS offers, published through commercial marketplace, must have at least one plan added to the offer. The plan features facilitate appropriate purchase options for the target users.
* **Other SaaS offer features**: In addition to the basic planning, you can provide more features such as free trial and test drives to promote user engagement. These features provide users with a firsthand experience of your app before they decide to purchase offers.

For comprehensive guidance on planning the offer, see [how to plan a SaaS offer for the Microsoft commercial marketplace](/azure/marketplace/plan-saas-offer) and [plan a SaaS offer](/partner-center/marketplace/plan-saas-offer).

## Prerequisites to create a SaaS offer

As an extended phase of planning your offer, you must fulfill the required technical configurations to create a Software as a Service (SaaS) offer. You must also have the technical information handy to update the offer configuration.

Here's a quick checklist to stay on track:

> [!div class="checklist"]
>
> * Gather the required technical information
> * Set up Microsoft and Microsoft Entra account
> * Create a landing page
> * Integrate APIs to sell through Microsoft offers

The following illustration helps you understand the technical configurations based on the listing option:

:::image type="content" source="../../../../assets/images/saas-offer/tech-config-offer.png" alt-text="Diagram shows the technical configuration per the type of listing option." lightbox="../../../../assets/images/saas-offer/tech-config-offer.png":::

For more information, see [technical requirements](/partner-center/marketplace/plan-saas-offer) and [SaaS app listing requirements](/partner-center/marketplace/marketplace-criteria-content-validation).

## Create a SaaS offer

Software as a Service (SaaS) offers allow you to license software solutions to customers through subscriptions. To sell your SaaS apps in Microsoft Teams Store, you must create an offer in Microsoft Partner Center. For any SaaS offer, you must add suitable plans that provide various subscription options. The users can select a suitable subscription that best suits their requirements.

> [!NOTE]
> You must have a [commercial marketplace account in Partner Center](/partner-center/create-account) to create offers.

The following table provides the three phases to create an offer and the steps involved in each phase:

| 1. Create an offer | 2. Configure the offer | 3. Create a plan |
| --- | --- | --- |
| Provide the following details: <br> - Offer ID <br> - Offer alias | - Offer setup <br> - Microsoft License Management <br> - Offer properties <br> - Offer listing <br> - Preview audience <br> - Technical configuration | Provide the following details: <br> - Plan ID <br> - Plan name <br> - Pricing model <br> - Free trail |

Offers sold through Microsoft are called transactable offers, which means Microsoft facilitates the exchange of money for a software license on the publisher's behalf. If you decide to sell through Microsoft, you must further select if you want to allow Microsoft to manage licenses on your behalf.

For more information, see [create plans for SaaS offer](/partner-center/marketplace/create-new-saas-offer-plans).

<!--## Offer type

The initial step to create a SaaS offer is to decide the listing or publishing option that aligns with your requirements. The listing option you select, when creating an offer, appears as a call-to-action button on the offer purchase landing page.

You can select from one of the four listing options to publish a SaaS offer:

:::row:::
    :::column:::
        :::image type="content" source="../../../../assets/images/saas-offer/pricing-charge-price.png" alt-text="Diagram represents sell through Microsoft option.":::
    :::column-end:::
    :::column span="2":::

**Sell through Microsoft**

You can opt to sell your SaaS apps through Microsoft where Microsoft hosts all your transactions for the licenses purchased. These are transactable SaaS offers where you can sell subscription plans either from commercial marketplace or directly from Teams Store. You can further allow Microsoft to manage licenses on your behalf.

    :::column-end:::
:::row-end:::

If you decide not to sell through Microsoft, you can manage your transactions independently through one of the following listing options:

:::row:::
    :::column:::
     :::image type="content" source="../../../../assets/images/saas-offer/pricing-free-trial.png" alt-text="Diagram represents the free trials.":::
    :::column-end:::
    :::column span="2":::

**Free trials**

You can offer a free trial version of your app to get more customers to try it. You can limit the features in the trial version to encourage users to buy the full version. For example, you can allow only a limited number of responses for a week or set a specific trial period.

    :::column-end:::
:::row-end:::
:::row:::
    :::column:::
        :::image type="content" source="../../../../assets/images/saas-offer/pricing-in-app-purchases.png" alt-text="Diagram represents the free app.":::
    :::column-end:::
    :::column span="2":::

**Get it now (Free)**

You can allow the user to subscribe and use your application at no cost. The features in free version can be limited with the option for users to upgrade through subscriptions.

    :::column-end:::
:::row-end:::
:::row:::
    :::column:::
        :::image type="content" source="../../../../assets/images/saas-offer/contact-me.png" alt-text="Diagram represents the contact me option.":::
    :::column-end:::
    :::column span="2":::

**Contact me**

Customers can share their contact details and request that you contact them about the offer through leads.

    :::column-end:::
:::row-end:::

You can further allow Microsoft to manage licenses on your behalf. If you select Microsoft to manage licenses, you must [integrate the offer with Microsoft Graph APIs](prerequisites.md#integrate-with-usagerights-graph-api) to verify customer eligibility. Based on the listing option, you must fulfill the [technical requirements](prerequisites.md).

## Offer details

Offer details are the basic information available on the offer's landing page. The following key features enhance the discoverability and usability of your offer:

| Category |Description|
|---|---|
| Offer categories and industries | Identify the primary and secondary categories for your offer. These categories determine the marketplace where your offer is published and help the users to identify your app. |
| Offer details | Design a distinctive logo, select relevant keywords, and write a compelling description to enhance your offer's discoverability. |
| Preview audience | Identify the audience and collate their email address to allow them to use and verify the preview offer. |
| Technical configuration | The [technical information](prerequisites.md#technical-information) that the commercial marketplace uses to communicate with your SaaS app. |
| Legal terms and conditions | Provide clear and comprehensive information about the terms of use for the users to understand their rights and responsibilities. |
| Customer Relationship Management (CRM) | Provide contact information to receive customer leads and to address queries. |

## Offer plan

SaaS offers, published through commercial marketplace, must have at least one plan added to the offer. The plan features facilitate appropriate purchase options for the target users.

### Plan the subscription model

The subscription model or plan visibility decides if the plans can be public or private.

* Public plans are available for all customers.
* Private plans are customized and visible only for targeted customers.

For more information, see [private plans in Microsoft commercial marketplace](/partner-center/marketplace/private-plans?branch=main).

> [!NOTE]
> Offers with private plans gets published in Azure portal. A private plan can be converted to public plan but can't be configured as private plan again.

### Plan the pricing options

When creating a plan, you can select from two [pricing models](/partner-center/marketplace/plan-saas-offer?branch=main) available for SaaS offers.

* **Flat rate**: To charge based on the software usage across the organization. For the flat rate pricing model, you can opt to use [metered billing](/partner-center/marketplace/plans-pricing?branch=main) for consumption-based pricing.
* **Per user**: To charge for each unique user.

The [billing terms](/partner-center/marketplace/plan-saas-offer?branch=main) define the subscription period that can be set as monthly or annual.

> [!NOTE]
>
> * An offer can have only one pricing model. For example, a SaaS offer can't have one plan that's a flat rate and another plan that's per user.
> * The pricing model and billing terms can’t be changed once the offer is published.

## Other SaaS offer features

In addition to the basic planning, you can provide more features to promote user engagement. These features provide users with a firsthand experience of your app before they decide to purchase offers.

| Category |Description|
|---|---|
| Free trials | When selling through Microsoft, you can provide a one-month free trial. Microsoft automatically transitions the user to a paid subscription after the trial period. Free trail in SaaS offer is different from the free trail in the listing option. |
| Test drive | When selling through Microsoft, you can add test drive for your SaaS app that provides access to the preconfigured environment of your app for fixed hours. For more information, see [test drive for SaaS offer](Test-preview-for-monetized-apps.md). |
| Mobile version | To adhere to third-party app store policies, your app mustn't include links that allow users to purchase subscription plans on mobile. However, you can still indicate if your app has features that require a subscription plan. For more information, see the [related commercial marketplace certification policies](/legal/marketplace/certification-policies). |
-->

## Next step

> [!div class="nextstepaction"]
> [Prerequisites to create a SaaS offer](prerequisites.md)

## See also

* [Marketplace categories and industries](/partner-center/marketplace/marketplace-categories-industries)
* [Plans and pricing for commercial marketplace offers](/partner-center/marketplace/plans-pricing)
* [Validation guidelines for apps linked to SaaS offer](teams-store-validation-guidelines.md#apps-linked-to-saas-offer)
* [Microsoft commercial marketplace](/partner-center/marketplace/overview)
