---
title: Include a SaaS offer with your app
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

:::image type="content" source="~/assets/images/saas-offer/monetize-flow2.png" alt-text="Diagram shows the process for how to include a SaaS offer with your Teams app with the first phase highlighted.":::

## Plan your offer

To create and publish your SaaS offer in the marketplace, it's recommended that you plan the offer and fulfil the prerequisites.

1. **Decide the publishing option**: The initial step to create any SaaS offer is to choose how the app should be available in the marketplace. You can choose to sell through Microsoft where Microsoft host all your transactions. The other option is to manage your transactions independently which further has three list offers. The type of listing option decides the information required to create the specific offer in Partner Center. The publishing option is available as a call-to-action button in your landing page.

1. **Choose the type of Plan/subscription model**: SaaS offers through Microsoft must have at least one plan added. The plan can either be private or public, public plans are available for all customers while private plans are customized for specific customers.

1. **Decide the pricing model and billing term**: You can choose between two pricing model offered for SaaS offers - flat rate or per user. For example, a SaaS offer cannot have one plan that's flat rate and another plan that’s per user. The billing terms can be monthly or annual.

1. **Free trails**: Microsoft allows a free trial period of one month, after which the offer is billed based on the subscription model. When you sell through Microsoft, you can offer free trial of one month and Microsoft converts it to a paid subscription by the end of the trial period.

1. **Plan for mobile**: To avoid violating third-party app store policies, your app can't include links that allow users to purchase subscription plans on mobile. However, you can still indicate if your app has features that require a subscription plan. For more information, see the related commercial marketplace certification policies.

1. Plan to provide [Test drive](/partner-center/marketplace/create-new-saas-offer).

For comprehensive guidance, see [how to plan a SaaS offer for the Microsoft commercial marketplace](/azure/marketplace/plan-saas-offer).

> [!NOTE]
> Pricing model and billing term can’t be changed once the offer is published.

## Next step

> [!div class="nextstepaction"]
> [Create your SaaS offer](create-saas-offer.md)

## See also

* [Monetize your app](monetize-overview.md)
* [Maintaining and supporting your published app](../post-publish/overview.md)
* [Validation guidelines for apps linked to SaaS offer](teams-store-validation-guidelines.md#apps-linked-to-saas-offer)
