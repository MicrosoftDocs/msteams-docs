---
title: Create SaaS Offer for Teams App
description: Learn how to plan, create, and configure a SaaS offer. Know the basic information on technical requirements, landing page, offer plan, and API integrations.
author: heath-hamilton
ms.author: surbhigupta
ms.topic: how-to
ms.localizationpriority: high
ms.date: 11/25/2024
---

# SaaS offer for your Teams app

Software as a service (SaaS) offers allow you to license software solutions to customers through subscriptions. Microsoft Teams presents unique opportunities for developers to integrate their SaaS apps to Microsoft Teams Store.

## Plan your SaaS offer

To monetize your app, it's important to plan on the features of a SaaS offer based on your requirements. When planning, you must determine the publishing option, that is, if you're selling through Microsoft or managing transactions independently. For more information, see [plan a SaaS offer](/partner-center/marketplace/plan-saas-offer).

### Technical requirements 

Based on the publishing option that you choose, there are different technical requirements. The following illustration helps you understand the technical requirements based on the publishing option:

:::image type="content" source="../../../../assets/images/saas-offer/tech-config-offer.png" alt-text="Diagram shows the technical configuration per the type of listing option." lightbox="../../../../assets/images/saas-offer/tech-config-offer.png":::

Here's the basic information on the key technical requirements:

* **Create a landing page**: After a user purchases a subscription plan, the user is redirected to the offer landing page to manage the subscription. To create a landing page, see [build the landing page for your transactable SaaS offer](/partner-center/marketplace/azure-ad-transactable-saas-landing-page).

* **Integrate with SaaS Fulfillment API**: It helps manage the lifecycle of a subscription plan. Users can manage subscriptions such as assigning a license to a specific user or updating the billing cycle.

* **Integrate with [usageRights Graph API](/partner-center/marketplace/isv-app-license-saas)**: It helps manage user permissions when a customer, who has a purchase license, launches the app. Use Graph APIs to check if the signed-in user with a valid subscription plan can access your app.

For more information, see [technical requirements](/partner-center/marketplace-offers/plan-saas-offer) and [SaaS app listing requirements](/partner-center/marketplace/marketplace-criteria-content-validation).

## Create a SaaS offer

> [!NOTE]
> Before you create a SaaS offer, you must publish your app via Partner Center. For more information, see [store step-by-step submission guide](/partner-center/marketplace/add-in-submission-guide).

Offers sold through Microsoft are transactable offers, which means Microsoft facilitates the financial transactions for the license on the publisher's behalf. To sell your SaaS app in Teams Store, you must [create and configure an offer in Microsoft Partner Center](/partner-center/marketplace-offers/create-new-saas-offer).

You must create at least one plan for the SaaS offer, where the plan features facilitate appropriate purchase options for the target users. For more information, see [create plans for SaaS offer](/partner-center/marketplace/create-new-saas-offer-plans).

### Submit the offer

After you create the plan, review the offer and [submit](/partner-center/marketplace-offers/test-publish-saas-offer) to validate and publish. When the offer is submitted: 

1. The offer goes through a series of automated validation checks and preview offers are created.
1. When the offer reaches the **Publisher signoff** phase, preview links for the respective platforms are given under **Go live** to test the offer.

For more information on validation and certification, check [review and publish offers](/partner-center/marketplace/review-publish-offer).

We recommended that you test the offer with the given preview links before you publish the offer in the marketplace.

## Next step

> [!div class="nextstepaction"]
> [Test a SaaS offer](Test-preview-for-monetized-apps.md)

## See also

* [Build landing page for your free or trial SaaS offer](/partner-center/marketplace/azure-ad-free-or-trial-landing-page)
* [Marketplace categories and industries](/partner-center/marketplace/marketplace-categories-industries)
* [Plans and pricing for commercial marketplace offers](/partner-center/marketplace/plans-pricing)
* [Validation guidelines for apps linked to SaaS offer](teams-store-validation-guidelines.md#apps-linked-to-saas-offer)
