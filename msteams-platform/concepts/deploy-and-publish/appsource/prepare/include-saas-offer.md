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

Software-as-a-Service (SaaS) offers have been important for businesses seeking to leverage their app to a monetizable service. Microsoft Teams presents a unique opportunity for developers to integrate their SaaS solutions to Teams. This article guides you through the essential steps to plan, create, and configure a SaaS offer.

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

To monetize your SaaS app, it's important that you understand the features of a SaaS offer. Here's a brief overview of the features in an offer that aids you to plan better.

| Feature | Description |
|---|---|
|**Offer type**| To create a SaaS offer you must decide the listing or publishing option that aligns with your requirements. The listing option you select, when creating an offer, appears as a call-to-action button on the offer purchase landing page. |
| **Offer details** | Offer details are the basic information that are available on the offer's landing page based on the offer configuration. These key features also enhance the discoverability and usability of your offer. |
| **Offer plan** | SaaS offers, published through commercial marketplace, must have at least one plan added to the offer. The plan features facilitate appropriate purchase options for the target users. |
| **Other features** | In addition to the basic planning, you can provide more features such as free trial and test drives to promote user engagement. These features provide users with a firsthand experience of your app before they decide to purchase offers. |

For comprehensive guidance on planning the offer, see [plan a SaaS offer](/partner-center/marketplace/plan-saas-offer) and [how to plan a SaaS offer for the Microsoft commercial marketplace](/azure/marketplace/plan-saas-offer)

## Prerequisites to create a SaaS offer

As an extended phase of planning your offer, there are technical configurations and technical information required to create a SaaS offer. You must have the technical information to update the offer configuration.

Here's a quick checklist to stay on track:

> [!div class="checklist"]
>
> * Gather the required [technical information](/partner-center/marketplace-offers/create-new-saas-offer-technical)
> * [Set up Microsoft and Microsoft Entra account](/partner-center/marketplace/azure-ad-saas)
> * Create a landing page
> * Integrate with SaaS Fulfillment API
> * Integrate with usageRights Graph API

The following illustration helps you understand the technical configurations based on the listing option you select:

:::image type="content" source="../../../../assets/images/saas-offer/tech-config-offer.png" alt-text="Diagram shows the technical configuration per the type of listing option." lightbox="../../../../assets/images/saas-offer/tech-config-offer.png":::

### Create a landing page

After a user successfully purchases a subscription plan, commercial marketplace directs them to the offer landing page to manage the subscription. To create a landing page that provides a seamless sign-in and onboarding experience, check the following articles:

* [Build the landing page for your transactable SaaS offer](/partner-center/marketplace/azure-ad-transactable-saas-landing-page).
* [Build landing page for your free or trial SaaS offer](/partner-center/marketplace/azure-ad-free-or-trial-landing-page)

### Integrate with SaaS Fulfillment API

Integrating with the SaaS Fulfillment APIs help to manage the lifecycle of a subscription plan after the user purchases the subscription plan. For comprehensive instructions and API reference, see [SaaS Fulfillment APIs](/azure/marketplace/partner-center-portal/pc-saas-fulfillment-apis) and [SaaS Fulfillment purchase flow](/partner-center/marketplace/partner-center-portal/pc-saas-fulfillment-life-cycle).

Here's a quick overview on the steps to integrate SaaS Fulfillment APIs:

  1. You receive a notification about the purchase where your landing page URL opens with the purchase identification token.
  1. You must pass the token by calling SaaS Resolve API to retrieve subscription details.
  1. After the user signs in and configures, call the Activate Subscription API to notify the commercial marketplace that the subscription is activated.

### Integrate with usageRights Graph API

Integrate with usageRights Graph API to manage user permissions at the time of app launch by a customer who has a purchase license. You can call Graph APIs to determine if the logged in user with a valid subscription of the plan has access to your app.

To call [usageRights Graph API](/partner-center/marketplace/isv-app-license-saas):

  1. Get [access token on behalf of](/graph/auth-v2-user) a user.
  1. [Use the Microsoft Graph API](/graph/use-the-api) to get the user’s object ID.
  1. Call the [usageRights API](/graph/api/user-list-usagerights?view=graph-rest-beta&tabs=http&preserve-view=true) to determine if the user has a license to the plan.

  > [!NOTE]
  > If the Microsoft Entra app is used for both SaaS Fulfillment APIs and usageRights API, the tenant under which the Microsoft Entra app is created must either be a publishing tenant or an associated tenant in the Partner Center.

For more information, see [technical requirements](/partner-center/marketplace/plan-saas-offer) and [SaaS app listing requirements](/partner-center/marketplace/marketplace-criteria-content-validation).

## Create a SaaS offer

SaaS offers allow you to license software solutions to customers through subscriptions. To sell your SaaS apps in Microsoft Teams Store, you must create an offer in Microsoft Partner Center. For any SaaS offer, you must add suitable plans that provide various subscription options. The users can select a suitable subscription that best suits their requirements.

> [!NOTE]
> You must have a [commercial marketplace account in Partner Center](/partner-center/create-account) to create offers.

The following table provides the three phases to create an offer and the steps involved in each phase:

| 1. Create an offer | 2. Configure the offer | 3. Create a plan |
| --- | --- | --- |
| Provide the following details: <br> - Offer ID <br> - Offer alias | - Offer setup <br> - Microsoft License Management <br> - Offer properties <br> - Offer listing <br> - Preview audience <br> - Technical configuration | Provide the following details: <br> - Plan ID <br> - Plan name <br> - Pricing model <br> - Free trail |

Offers sold through Microsoft are called transactable offers, which means Microsoft facilitates the exchange of money for a software license on the publisher's behalf.

To create an offer in Partner Center:

1. Sign in to [Partner Center](https://partner.microsoft.com/dashboard/home).

1. On the **Home** page, select **Marketplace offers**.

1. From the left pane, select **Overview**.

1. Select **New Offer** > **Software as a Service**.

   :::image type="content" source="~/assets/images/first-party-license-mgt/commercial-marketplace.png" alt-text="Screenshot shows the marketplace offer page where you can select new offer.":::

1. Enter **Offer ID** and **Offer alias**.

   > [!NOTE]
   > If you're creating an offer for testing, append **-ISVPILOT** to Offer alias. This informs the certification team that the offer is for testing purposes. Microsoft periodically deletes offers with **-ISVPILOT**. Therefore, refrain from using this tag for reasons other than testing.

1. Select **Create**. The offer is created and you can continue to configure the offer.

If you decide to sell through Microsoft, you must further select if you want to allow Microsoft to manage licenses on your behalf. For more information, see [create a SaaS offer](/partner-center/marketplace-offers/create-new-saas-offer)

 You must then configure the offer based on your requirements. For offer configuration, see [configure the offer](/partner-center/marketplace-offers/create-new-saas-offer-properties).

SaaS offers, published through commercial marketplace, must have at least one plan added to the offer. The plan features facilitate appropriate purchase options for the target users. For offer plan information, see [create plans for SaaS offer](/partner-center/marketplace/create-new-saas-offer-plans).

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
> [Test a SaaS offer](prerequisites.md)

## See also

* [Marketplace categories and industries](/partner-center/marketplace/marketplace-categories-industries)
* [Plans and pricing for commercial marketplace offers](/partner-center/marketplace/plans-pricing)
* [Validation guidelines for apps linked to SaaS offer](teams-store-validation-guidelines.md#apps-linked-to-saas-offer)
* [Microsoft commercial marketplace](/partner-center/marketplace/overview)
