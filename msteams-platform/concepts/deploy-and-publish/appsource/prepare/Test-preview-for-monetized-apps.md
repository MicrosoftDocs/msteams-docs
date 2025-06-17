---
title: Test Saas Preview Offer for Teams App
author: surbhigupta
description: Learn to create and test SaaS preview offers for Teams app. Generate a preview offer ID and configure your app with the preview offer ID to test the offer.
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
ms.date: 11/26/2024
---

# Test your SaaS offer

Testing your app before publishing helps to understand the user issues, rectify them, and improve user experience. Let's learn in detail on the steps to create a test or preview offer, configure your app with the preview offer ID, and understand error scenarios with their respective fixes.

> [!NOTE]
> Users added as the preview audience for the Teams app can review your SaaS offer before you publish.

## Generate a preview offer ID

Create the preview offer ID from the **AppSource preview** link in Microsoft Partner Center. Ensure the SaaS offer is in the **Preview creation** phase. To generate the preview offer ID:

1. Go to [Partner Center](https://go.microsoft.com/fwlink/?linkid=2166002) and sign in using your developer credentials.
1. Select **Marketplace offers**.
1. Select the SaaS offer you want to preview.
1. Add [preview audience](/azure/marketplace/create-new-saas-offer-preview) for your SaaS offer.
1. Select **AppSource preview** link under **Go Live** to find the preview offer ID in the browser address bar with *publisherId.offerId-preview* format.

    :::image type="content" source="../../../../assets/images/apps-in-meetings/publish-status-publisher-signoff.png" alt-text="Screenshot shows the Offer overview screen with AppSource preview option highlighted." :::

1. Copy the preview offer ID from the browser address bar.

      :::image type="content" source="../../../../assets/images/apps-in-meetings/test-preview-monetized-apps-preview-offer-id.png" alt-text="Screenshot shows the preview offer ID."  lightbox="../../../../assets/images/apps-in-meetings/test-preview-monetized-apps-preview-offer-id.png":::

    > [!NOTE]
    > Unlike a public offer ID, you can recognize the preview offer ID with the *-preview* suffix, for example, **publisherId.offerId-preview**.

    If the preview offer is limited to the non-US regions, Developer Portal for Teams might not be able to find your offer. You can either add United States to the list of [markets, pricing, and availability](/azure/marketplace/create-new-saas-offer-plans) or ignore the error and select **Preview in Teams** to upload a custom app to Microsoft Teams.

    :::image type="content" source="../../../../assets/images/apps-in-meetings/us-region.png" alt-text="Screenshot shows the user can select United States region.":::

## Configure your app with the preview offer ID

Before you begin, sign in to **Developer Portal** with a developer account that has **Preview audience**. It helps users to view your subscription plans in the Microsoft Teams Store.

After you generate the preview offer ID, link the preview offer ID to your Teams app. To link the offer ID:

1. Sign in to [Developer Portal](https://dev.teams.microsoft.com/) with your developer credentials.
1. Select **Apps** from the left pane.
1. Select the app to link the SaaS offer.
1. Under **Advanced**, select **Plans and pricing**.
1. Enter the **Publisher ID** and **Offer ID**. Ensure the offer ID has *-preview* as suffix.
1. Select **View** to preview your subscription plans.
1. Review the plans listed under **Apps subscription** and select **Save**.

    :::image type="content" source="../../../../assets/images/apps-in-meetings/test-preview-add-offer-id.png" alt-text="Screenshot shows the plan and pricing screen to add offer ID." lightbox="../../../../assets/images/apps-in-meetings/test-preview-add-offer-id.png":::

You must add the `subscriptionOffer` property to your [app manifest](../../../../resources/schema/manifest-schema.md#subscriptionoffer).

```json
"subscriptionOffer": {
     "offerId": "publisherId.offerId-preview"
     }
```

> [!NOTE]
>
> * Check for the *Preview offer* label next to **Apps subscription** to confirm if the offer is a preview offer.
> * The manifest schema version 1.10 or later supports the `subscriptionOffer` property.

## Upload your custom app into Teams

After you configure your app with the preview offer ID, create an updated app package and upload it to Teams to test the end-to-end purchase experience. You can also select **Preview in Teams** in the Developer Portal for Teams to launch your app quickly in the Teams client.

If `offerId` is specified in the app manifest and the preview audience is defined in the Partner Center for the offer, the user can see the **Buy a subscription** button.

:::image type="content" source="../../../../assets/images/apps-in-meetings/test-preview-buy-subscription.png" alt-text="Screenshot shows the Buy a subscription option.":::

For more information, see [upload your app in Teams](../../apps-upload.md).

### Error scenarios

1. If `offerId` is specified in the app manifest but the user isn't part of the **Preview audience** defined in the Partner Center, the **Buy a subscription** button isn't enabled and the app shows the following warning message to the user:

    No plans found with **-preview**. Make sure you are in the preview audience.

    :::image type="content" source="../../../../assets/images/apps-in-meetings/test-preview-no-preview-audience.png" alt-text="Screenshot shows that no plans found with preview warning." :::

1. If `offerId` is specified in the app manifest isn't a preview offer, the app shows the following warning message to the user and custom app upload is disabled:

    This isn't a preview offer. Be sure to append the **-preview** to the offer ID.

    :::image type="content" source="../../../../assets/images/apps-in-meetings/test-preview-no-preview-offer-id.png" alt-text="Screenshot shows that it's not a preview offer warning." :::

Upon successful testing, you can push the offer to go live where app validations are done before publishing.

## Code sample

| **Sample name** | **Description** | **Node.js** | **Manifest**|
|-----------------|-----------------|----------------|----------------|
| Tab app monetization | This sample demonstrates a Teams tab application that opens a purchase dialog and triggers a monetization flow through the Teams JS SDK. Users can experience app monetization features seamlessly integrated within Microsoft Teams. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-app-monetization/nodejs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-app-monetization/nodejs/demo-manifest/tab-app-monetization.zip)|

## Next step

> [!div class="nextstepaction"]
> [Publish the app with SaaS offer](publish-saas-offer-app.md)

## See also

* [Add a preview audience for a SaaS offer](/azure/marketplace/create-new-saas-offer-preview)
* [Preview creation phase](/azure/marketplace/review-publish-offer)
* [Preview and subscribe](/partner-center/marketplace/test-saas-preview-offer)
* [Unsubscribe from a test plan](/partner-center/marketplace/test-saas-unsubscribe)
* [App manifest](../../../../resources/schema/manifest-schema-dev-preview.md)
