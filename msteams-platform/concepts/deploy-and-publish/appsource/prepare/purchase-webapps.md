---
title: Subscribe to apps with software-as-a-service (SaaS) offers
description: Describes the process of creating SaaS offers and the purchase experience for users subscribing to apps with SaaS offers.
ms.author: surbhigupta
ms.topic: conceptual
localization_priority: Normal 
---

# Subscribe to apps with software-as-a-service (SaaS) offers

In the Teams store, you have apps that are free to install or are available as software-as-a-service (SaaS). If you want your app to be available as SaaS, then you must follow the complete process of creating a SaaS offer in the Partner Center's Microsoft Commercial Marketplace, updating the manifest through the Teams Developer Portal, publishing the app to the Teams store, and enabling the SaaS offer for your app.

> [!NOTE]
> It is recommended to configure your SaaS offer before publishing your app to the Teams store. However, if your app is already published and you now want to change it to SaaS, then you must republish your app after configuring the SaaS offer for your app.

## Create a SaaS offer

> [!NOTE]
> You must have a [Partner Center account](create-partner-center-dev-account.md) to create a SaaS offer.

To configure plans and pricing details for your app, create a SaaS offer in the [Microsoft Commercial Marketplace](/azure/marketplace/create-new-saas-offer).

## Update app manifest through the Teams Developer Portal

In the [Teams Developer Portal](~/build-and-test/teams-developer-portal.md), provide your **Publisher ID** and **Offer ID** and update the manifest with the `subscriptionOffer` property.

**To update your app manifest**

1. Go to [Developer Portal](https://aka.ms/dev-portal), and select **All apps**.
1. Select **Plans and Pricing** in the left pane. (*Screenshot / mocks required*)
1. In the **Plans and Pricing** page, enter your **Publisher ID** and **Offer ID**.

    > [!NOTE]
    > You can get your publisher ID and Offer ID from the Partner Center.
1. Select **Preview in Teams** to view the details of the SaaS offer, and then select **Save**.
1. Under **Distribute** in the left pane, select **Manifest**. Following property is added to the manifest:

    ```json
      "subscriptionOffer": {
        "offerId": "publisher ID and offer ID"  
        }
   ```

1. Select **Distribute** on the top right, and then select **Publish to Teams store**. For more information on how to publish your app, see [Publish to the Microsoft Teams store](~/concepts/deploy-and-publish/appsource/publish.md).

    > [!NOTE]
    > For more information on distributing your app package, see [Distribute your app](~/concepts/deploy-and-publish/apps-publish-overview.md).

After the app is validated and tested, the Teams admin enables the SaaS offer, and then publishes it on the Teams store. The users can now purchase the app subscription.

## User purchase experience

Users can subscribe to purchasable apps through the Teams store.

**To subscribe an app with SaaS offer**

1. In the Teams store, select the app that you want to subscribe to, and select **Buy a subscription**.

    :::image type="content" source="~/assets/images/saas-offer/buysubscriptionplan.png" alt-text="Buying the subscription for the selected app.":::

2. In the **Choose a subscription plan** dialog box, select the subscription plan for the app, and then select **Checkout**.

    :::image type="content" source="~/assets/images/saas-offer/choosingsubscriptionplan.png" alt-text="Selecting the appropriate subscription plan.":::

3. In the **Checkout** dialog box, view the plan and pricing details, and select **Place order**.

    :::image type="content" source="~/assets/images/saas-offer/placesubscriptionorder.png" alt-text="Placing the subscription order.":::

1. After the purchase is successful, select **Configure now**. In the **USERS AND LICENSES** page, assign the licenses.

    :::image type="content" source="~/assets/images/saas-offer/subscriptionlicenses.png" alt-text="Configuring the user licenses.":::

> [!NOTE]
> To manage your subscription, go to **Apps** > **&lt;name of the subscribed app&gt;** > **Manage subscription**.

## See also

[Maintaining and supporting your published app](../post-publish/overview.md)
