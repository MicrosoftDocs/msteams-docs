---
title: Create SaaS Offer for Teams App
description: Learn how to plan, create, and configure a SaaS offer. Know the basic information on technical configuration, landing page, offer plan, and API integrations.
author: heath-hamilton
ms.author: surbhigupta
ms.topic: how-to
ms.localizationpriority: high
ms.date: 03/21/2023
---

# SaaS offer for your Teams app

Software as a service (SaaS) offers allow you to license software solutions to customers through subscriptions. Microsoft Teams presents unique opportunities for developers to integrate their SaaS solutions to Microsoft Teams Store. This article guides you through the steps to plan, create, and configure a SaaS offer in Microsoft Partner Center.

## Plan, Create, Publish - SaaS offer

To monetize your SaaS app, it's important that you understand the features of a SaaS offer and plan based on your requirements. For more information, see [plan a SaaS offer](/partner-center/marketplace/plan-saas-offer) and [how to plan a SaaS offer for the Microsoft commercial marketplace](/azure/marketplace/plan-saas-offer).

After you create a SaaS offer, perform the following:

1. You must configure the offer based on your requirements. For more information, see [configure the offer](/partner-center/marketplace-offers/create-new-saas-offer-properties).
1. You must create at least one plan for the SaaS offer, where the plan features facilitate appropriate purchase options for the target users. For more information, see [create plans for SaaS offer](/partner-center/marketplace/create-new-saas-offer-plans).

## Plan a SaaS offer

To monetize your SaaS app, it's important that you understand the features of a SaaS offer and plan based on your requirements. Here's an overview on the major features that aids you to plan better:

| Feature | Description |
|---|---|
|**Listing option**| To create a SaaS offer you must decide the listing or publishing option based on your requirements. When you create an offer, the listing option you select appears as a call-to-action button on the offer purchase landing page. |
| **License management** | You can decide either to allow Microsoft to manage licenses on your behalf or manage licenses on your own. |
| **Offer details** | Offer details are the basic information that are available on the offer's landing page based on the offer configuration. These enhance the discoverability and usability of your offer. |
| **Offer plan** | SaaS offers must have at least one plan added to the offer. It facilitates appropriate purchase options for the target users. |
| **Other features** | You can provide options such as free trial and test drives to promote user engagement. It provides firsthand experience of your app before the user decides to purchase an offer. |

For more information, see [plan a SaaS offer](/partner-center/marketplace/plan-saas-offer) and [how to plan a SaaS offer for the Microsoft commercial marketplace](/azure/marketplace/plan-saas-offer).

## Prerequisites to create a SaaS offer

Based on the offer that you create, you must have the required technical information and configurations. The technical information is required when you create and configure a SaaS offer. The following illustration helps you understand the technical configurations based on the listing option you select:

:::image type="content" source="../../../../assets/images/saas-offer/tech-config-offer.png" alt-text="Diagram shows the technical configuration per the type of listing option." lightbox="../../../../assets/images/saas-offer/tech-config-offer.png":::

Here's a quick checklist to stay on track:

> [!div class="checklist"]
>
> * [Set up Microsoft and Microsoft Entra account](/partner-center/marketplace/azure-ad-saas)
> * [Create a landing page](#create-a-landing-page)
> * Gather the required [technical information](/partner-center/marketplace-offers/create-new-saas-offer-technical)
> * [Integrate with SaaS Fulfillment API](#integrate-with-saas-fulfillment-api)
> * [Integrate with usageRights Graph API](#integrate-with-usagerights-graph-api)

### Create a landing page

After a user purchases a subscription plan, they are redirected to the offer landing page to manage the subscription. To create a landing page, check the following articles:

* [Build the landing page for your transactable SaaS offer](/partner-center/marketplace/azure-ad-transactable-saas-landing-page)
* [Build landing page for your free or trial SaaS offer](/partner-center/marketplace/azure-ad-free-or-trial-landing-page)

### Integrate with SaaS Fulfillment API

Users can manage subscriptions such as assigning a license to a specific user or updating the billing cycle. Integrating the SaaS Fulfillment APIs helps manage the lifecycle of a subscription plan.

</br>

<details>

<summary>Here's a quick overview on the steps to integrate SaaS Fulfillment APIs:</summary>

  1. When a purchase is made, you get a notification and your landing page URL opens with a purchase ID token.
  1. You must pass the token with the SaaS Resolve API to retrieve subscription details.
  1. After the user signs in and configures, call the Activate Subscription API to notify the commercial marketplace that the subscription is activated.
</br>

</details>

For more information and API reference, see [SaaS Fulfillment APIs](/azure/marketplace/partner-center-portal/pc-saas-fulfillment-apis) and [SaaS Fulfillment purchase flow](/partner-center/marketplace/partner-center-portal/pc-saas-fulfillment-life-cycle).

### Integrate with usageRights Graph API

Integrate with usageRights Graph API to manage user permissions when a customer, who has a purchased license, launches the app. Use Graph APIs to check if the signed-in user with a valid subscription plan can access your app.

</br>

<details>

<summary>To call usageRights Graph API:</summary>

  1. Get [access token on behalf of](/graph/auth-v2-user) a user.
  1. [Use the Microsoft Graph API](/graph/use-the-api) to get the user’s object ID.
  1. Call the [usageRights API](/graph/api/user-list-usagerights?view=graph-rest-beta&tabs=http&preserve-view=true) to determine if the user has a license to the plan.

For more information, see [usageRights Graph API](/partner-center/marketplace/isv-app-license-saas).

  > [!NOTE]
  > If the Microsoft Entra app is used for both SaaS Fulfillment APIs and usageRights API, the tenant under which the Microsoft Entra app is created must either be a publishing tenant or an associated tenant in Partner Center.
</br>

</details>

For more information, see [technical requirements](/partner-center/marketplace/plan-saas-offer) and [SaaS app listing requirements](/partner-center/marketplace/marketplace-criteria-content-validation).

## Create a SaaS offer

Offers sold through Microsoft are transactable offers, which means Microsoft facilitates the financial transactions for the license on the publisher's behalf. To sell your SaaS app in Teams Store, you must create an offer in Partner Center. You must have a [commercial marketplace account in Partner Center](/partner-center/create-account) to create and publish your offer.

The following table provides the three phases to create an offer:

| 1. Create an offer | 2. Configure the offer | 3. Create a plan |
| --- | --- | --- |
| Provide the following details: <br> - Offer ID <br> - Offer alias | - Offer setup <br> - Microsoft License Management <br> - Offer properties <br> - Offer listing <br> - Preview audience <br> - Technical configuration | Provide the following details: <br> - Plan ID <br> - Plan name <br> - Pricing model <br> - Free trail |

**Steps to create an offer in Partner Center**

1. Sign in to [Partner Center](https://partner.microsoft.com/dashboard/home).

1. On the **Home** page, select **Marketplace offers**.

1. From the left pane, select **Overview**.

1. Select **New Offer** > **Software as a Service**.

   :::image type="content" source="~/assets/images/first-party-license-mgt/commercial-marketplace.png" alt-text="Screenshot shows the marketplace offer page where you can select new offer.":::

1. Enter **Offer ID** and **Offer alias**.

   > [!NOTE]
   > If you're creating an offer for testing, append **-ISVPILOT** to Offer alias. This informs the certification team that the offer is for testing purposes. Microsoft periodically deletes offers with **-ISVPILOT**. Therefore, refrain from using this tag for reasons other than testing.

1. Select **Create**. The offer is created and you can continue to configure the offer.

You can either allow Microsoft to manage licenses on your behalf or you can manage licenses on your own.

After you create a SaaS offer, perform the following:

1. You must configure the offer based on your requirements. For more information, see [configure the offer](/partner-center/marketplace-offers/create-new-saas-offer-properties).
1. You must create at least one plan for the SaaS offer, where the plan features facilitate appropriate purchase options for the target users. For more information, see [create plans for SaaS offer](/partner-center/marketplace/create-new-saas-offer-plans).

### Submit the offer

After you create the plan, configure the required information, review the offer, and [sumbit to publish](/partner-center/marketplace-offers/test-publish-saas-offer). 

* The offer goes through a series of automated validation checks and preview offers are created.
* When the offer reaches the **Publisher signoff** phase, preview links for the respective platforms are given under **Go live**, to test the offer.

We recommended you to test the offer with the given preview links before you publish the offer in the marketplace.

## Next step

> [!div class="nextstepaction"]
> [Test a SaaS offer](Test-preview-for-monetized-apps.md)

## See also

* [Create a SaaS offer](/partner-center/marketplace-offers/create-new-saas-offer)
* [Marketplace categories and industries](/partner-center/marketplace/marketplace-categories-industries)
* [Plans and pricing for commercial marketplace offers](/partner-center/marketplace/plans-pricing)
* [Validation guidelines for apps linked to SaaS offer](teams-store-validation-guidelines.md#apps-linked-to-saas-offer)
