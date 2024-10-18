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

Software as a service (SaaS) offers allow you to license software solutions to customers through subscriptions. Microsoft Teams presents unique opportunities for developers to integrate their SaaS solutions to Microsoft Teams Store.

## Plan your SaaS offer

To monetize your app, it's important that you understand the features of a SaaS offer and plan based on your requirements. When planning for a SaaS offer, you must also determine the publishing option, that is, if you're selling through Microsoft or managing transactions independently. For more information, see [plan a SaaS offer](/partner-center/marketplace/plan-saas-offer).

### Technical requirements 

Based on the listing option that you choose for your offer, there are different technical requirements. The following illustration helps you understand the technical requirements based on the listing option:

:::image type="content" source="../../../../assets/images/saas-offer/tech-config-offer.png" alt-text="Diagram shows the technical configuration per the type of listing option." lightbox="../../../../assets/images/saas-offer/tech-config-offer.png":::

Here are few key technical requirements, you must be aware of:

* **Create a landing page**: After a user purchases a subscription plan, the user is redirected to the offer landing page to manage the subscription. To create a landing page, see [build the landing page for your transactable SaaS offer](/partner-center/marketplace/azure-ad-transactable-saas-landing-page).

* **Integrate with SaaS Fulfillment API**: Users can manage subscriptions such as assigning a license to a specific user or updating the billing cycle. Integrating the SaaS Fulfillment APIs helps manage the lifecycle of a subscription plan.

* **Integrate with usageRights Graph API**: Integrate with [usageRights Graph API](/partner-center/marketplace/isv-app-license-saas) to manage user permissions when a customer, who has a purchased license, launches the app. Use Graph APIs to check if the signed-in user with a valid subscription plan can access your app.

For more information on technical requirements for a SaaS offer, see [technical requirements](/partner-center/marketplace-offers/plan-saas-offer) and [SaaS app listing requirements](/partner-center/marketplace/marketplace-criteria-content-validation).

## Create a SaaS offer

Offers sold through Microsoft are transactable offers, which means Microsoft facilitates the financial transactions for the license on the publisher's behalf. To sell your SaaS app in Teams Store, you must [create and configure an offer in Microsoft Partner Center](/partner-center/marketplace-offers/create-new-saas-offer).

You must create at least one plan for the SaaS offer, where the plan features facilitate appropriate purchase options for the target users. For more information, see [create plans for SaaS offer](/partner-center/marketplace/create-new-saas-offer-plans).

> [!NOTE]
> Before you create a SaaS offer, you must publish your app via Partner Center. For more information, see [store step-by-step submission guide](/partner-center/marketplace/add-in-submission-guide?toc=%2Fmicrosoftteams%2Fplatform%2Ftoc.json&bc=%2Fmicrosoftteams%2Fplatform%2Fbreadcrumb%2Ftoc.json).

### Submit the offer

After you create the plan, review the offer and [sumbit to publish](/partner-center/marketplace-offers/test-publish-saas-offer). 

* The offer goes through a series of automated validation checks and preview offers are created.
* When the offer reaches the **Publisher signoff** phase, preview links for the respective platforms are given under **Go live**, to test the offer.

For more information on validation and certification, check [review and publish offers](/partner-center/marketplace/review-publish-offer).

We recommended you to test the offer with the given preview links before you publish the offer in the marketplace.

## Next step

> [!div class="nextstepaction"]
> [Test a SaaS offer](Test-preview-for-monetized-apps.md)

## See also

* [Build landing page for your free or trial SaaS offer](/partner-center/marketplace/azure-ad-free-or-trial-landing-page)
* [Marketplace categories and industries](/partner-center/marketplace/marketplace-categories-industries)
* [Plans and pricing for commercial marketplace offers](/partner-center/marketplace/plans-pricing)
* [Validation guidelines for apps linked to SaaS offer](teams-store-validation-guidelines.md#apps-linked-to-saas-offer)
