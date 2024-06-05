---
title: Test preview for monetized apps 
author: v-ypalikila
description: Create and test SaaS Preview offers for Teams app before pushing the offer live. Create a preview offer ID, configure your app with the preview offer ID, and upload.
ms.topic: conceptual
ms.author: v-ypalikila
ms.localizationpriority: high
ms.date: 12/26/2022
---

# Test preview for monetized apps

You can  create a Software as a Service (SaaS) offer and test the end-to-end purchase experience for your monetized apps  in Teams. Users who are added as the preview audience for the Teams app can review your SaaS offer before you publish.

## Create a Preview offer ID

You can generate the Preview offer ID from the **AppSource preview** link in the Partner Center. Ensure that the SaaS offer is in the Preview creation phase. To generate the preview offer ID:

1. Go to [Partner Center](https://go.microsoft.com/fwlink/?linkid=2166002) and sign in using your developer credentials.
1. Select **Marketplace offers**.
1. Select the SaaS offer you want to preview.
1. Add a [preview audience](/azure/marketplace/create-new-saas-offer-preview) for your SaaS offer.
1. Select **AppSource preview** link under **Go Live** to find the Preview offer ID in the browser address bar with *publisherId.offerId-preview* format.

    :::image type="content" source="../../../../assets/images/apps-in-meetings/publish-status-publisher-signoff.png" alt-text="Screenshot shows the Offer overview screen with AppSource preview option highlighted." :::

1. Copy the Preview offer ID from the browser address bar.

      :::image type="content" source="../../../../assets/images/apps-in-meetings/test-preview-monetized-apps-preview-offer-id.png" alt-text="Screenshot shows the Preview offer ID." :::

    > [!NOTE]
    > Unlike a public offer ID, the Preview offer ID can be recognized with the *-preview* suffix. For example, **publisherId.offerId-preview**.

    If the offer you want to preview is limited to the non-US regions, Developer Portal for Teams might not be able to find your offer. You can either add United States to the list of [markets, pricing, and availability](/azure/marketplace/create-new-saas-offer-plans) or ignore the error and select **Preview in Teams** to upload a custom app to Microsoft Teams.  

    :::image type="content" source="../../../../assets/images/apps-in-meetings/us-region.png" alt-text="Screenshot shows the user can select United States region.":::

## Configure your app with the preview offer ID

Before you begin, sign in to the **Developer Portal** using a developer account with **preview audience** for users to see your subscription plans in the Microsoft Teams Store.

After you've generated your Preview offer ID, link the offer ID to your Teams app. To link the offer ID:

1. Go to [Developer Portal](https://dev.teams.microsoft.com/) and sign in using your developer credentials.
1. Select **Apps** from the left pane.
1. Select the app to link the SaaS offer to.
1. Select **Plans and pricing** and enter the **Publisher ID** and **Offer ID**.  
  Ensure the offer ID contains *-preview* suffix.
1. Select **View** to preview your subscription plans.
1. Review the plans listed under **Apps Subscription** and select **Save**.

    :::image type="content" source="../../../../assets/images/apps-in-meetings/test-preview-add-offer-id.png" alt-text="Screenshot shows the Plan and pricing screen to add offer ID." :::

The `subscriptionOffer` property is added to your [app manifest](../../../../resources/schema/manifest-schema.md#subscriptionoffer).

```json
"subscriptionOffer": {
     "offerId": "publisherId.offerId-preview"  
     }
```

>[!NOTE]
>
> * Check for the label *Preview offer* next to **Apps subscription** to confirm if the offer is a Preview Offer.
> * The `subscriptionOffer` property is supported in manifest schema version 1.10 or later.

## Upload your custom app into Teams

After you configure your app with the Preview Offer ID, create an updated app package and upload it to Teams to test the end-to-end purchase experience. For more information, see [Upload your app in Teams](../../apps-upload.md). You can also select **Preview in Teams** in the Developer Portal for Teams to launch your app quickly in the Teams client.

If the Preview offer is specified in the app manifest and the preview audience is defined in the Partner center for the offer, the user can see the **Buy a subscription** button.

:::image type="content" source="../../../../assets/images/apps-in-meetings/test-preview-buy-subscription.png" alt-text="Screenshot shows the Buy a subscription option.":::

### Error scenarios

* If the offer ID is specified, but the user isn't part of the **Preview audience** defined in the Partner Center, the **Buy a subscription** button isn't enabled and the app shows the following warning message to the user:

  No plans found with **-preview**. Make sure you're in the preview audience.

  :::image type="content" source="../../../../assets/images/apps-in-meetings/test-preview-no-preview-audience.png" alt-text="Screenshot shows the No plans found with preview warning." :::

* If the offer ID specified in the app manifest isn't a Preview offer, the app shows the following warning message to the user and custom app upload is disabled:
  
  This isn't a preview offer. Be sure to append the **-preview** to the Offer ID.

  :::image type="content" source="../../../../assets/images/apps-in-meetings/test-preview-no-preview-offer-id.png" alt-text="Screenshot shows the not a preview offer warning." :::

## See also

* [Monetize your app](monetize-overview.md)
* [Include a SaaS offer with your Microsoft Teams app](include-saas-offer.md)
* [Add a preview audience for a SaaS offer](/azure/marketplace/create-new-saas-offer-preview)
* [Preview creation phase](/azure/marketplace/review-publish-offer)
* [Review and publish an offer to the commercial marketplace](/azure/marketplace/review-publish-offer#validation-and-publishing-steps)
* [App Manifest](../../../../resources/schema/manifest-schema-dev-preview.md)
