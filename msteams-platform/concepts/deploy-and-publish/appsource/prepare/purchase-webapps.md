---
title: Subscribe to software-as-a-service (SaaS) apps
description: Describes how to publish your apps as SaaS and the user experience when subscribing through Teams client.
ms.author: surbhigupta
ms.topic: conceptual
localization_priority: Normal 
---

# Subscribe to software-as-a-service (SaaS) apps

You can publish your apps on the Teams store as free to install apps or purchasable apps by enabling a software-as-a-service (SaaS) offer for them. There is a complete process of enabling a SaaS offer for your apps, starting with creating a SaaS offer in the Partner Center > activating the SaaS offer in Teams by updating the manifest through the Teams Developer Portal > publishing the app to Teams store. Users can subscribe the apps with SaaS offers through Teams client.

> [!NOTE]
> It is recommended to create a SaaS offer when you are publishing your app to the Teams store for the first time. If you decide to create a SaaS offer after an app is published then you will have to republish the app to the Teams store.

## Create a SaaS offer

You need to create a SaaS offer for your app in your Partner Center. For information on how to create a SaaS offer, [How to create a software as a service (SaaS) offer in the Microsoft commercial marketplace](/azure/marketplace/create-new-saas-offer).

> [!NOTE]
> To create a SaaS offer you must have a [Partner Center account](create-partner-center-dev-account.md).

## Update app manifest through Teams Developer Portal

In the Teams Developer Portal, provide your **Publisher ID** and **Offer ID** and update the manifest with the `subscriptionOffer` property.

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

1. Select **Distribute** at the top right, and then select **Publish to Teams store**. For more information on how to publish your app, see [Publish your app to the Microsoft Teams store](../../concepts/deploy-and-publish/appsource/publish.md).

    > [!NOTE]
    > For more information on distributing your app package, see [Distribute your app](../../concepts/deploy-and-publish/apps-publish-overview.md).

After the app is validated and published on the Teams store, users can purchase the app subscription directly from the Teams App Store.

## Submit the web app to AppSource

To submit your web app to the AppSource and subsequently to the Teams App Store, ensure that your web app completes the approval process provided by Microsoft Teams. This approval process verifies whether your web app works as described and contains the relevant metadata and content that is valuable to the users.

For more information on the submission checklist for submitting an app to AppSource, see:

* [Prepare for AppSource submission](submission-checklist.md)
* [Build a great app details page](detail-page-checklist.md)
* [App manifest checklist](app-manifest-checklist.md)
* [Manifest schema](https://docs.microsoft.com/microsoftteams/platform/resources/schema/manifest-schema) to include the information about your purchasable web app on Teams

## Publish purchasable web apps

After your offer has been submitted on AppSource along with the appropriate plans for the offer, the validation team reviews it and after it passes our validation, the web app is available for you to test and publish it to our commercial marketplace.

After the app is available on our commercial marketplace, your web app (SaaS offer) is automatically available for purchase from the Teams App Store along with AppSource and Azure Marketplace.

## User purchase experience

The purchasable web apps are available for purchase and installation on the Teams App Store.

To purchase an app, as a user you can follow these steps:

1. Navigate to an app that supports purchases and select **Subscription plans**.

    ![Subscription plan](~/assets/images/subscriptionplan.png)

2. In the **Choose a subscription plan** window, view the respective plans and pricing supported by the offer and purchase it.

    ![View plan](~/assets/images/viewplan.png)

3. After successfully purchasing the offer, you are redirected to the URL provided to activate the offer and manage the licenses purchased.

    ![Configure now](~/assets/images/configurenow.png)
    
## See also

[Maintaining and supporting your published app](../post-publish/overview.md).
