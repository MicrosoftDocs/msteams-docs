---
title: Test preview for monetized apps 
author: v-ypalikila
description: Create and test SaaS Preview offers for Teams app before pushing the offer live.
ms.topic: conceptual
ms.author: v-ypalikila
ms.localizationpriority: medium
keywords: teams apps SaaS offer preview offer  app source preview
---

# Test preview for monetized apps

As a developer, you can create a Software as a Service (SaaS) offer and test the end-to-end purchase experience of an offer in the Teams app before pushing the offer live. Users who are added as the preview audience for the Teams app can test the preview offer.

## Prerequisites

1. [Microsoft 365 developer account](/office/developer-program/microsoft-365-developer-program-get-started)
1. [Create a SaaS offer](/azure/marketplace/create-saas-dev-test-offer)
1. [Add a preview audience for a SaaS offer](/azure/marketplace/create-new-saas-offer-preview)

## Create a preview offer ID

Create a preview offer ID for the SaaS offer using the **AppSource preview link** in the Partner Center.

1. Go to [Partner Center](https://go.microsoft.com/fwlink/?linkid=2166002) and sign in using your developer credentials.
1. Select **Marketplace offers**.
1. Select the SaaS offer you want to preview.
1. Select **App source preview link** under **Go Live** to generate a Preview Offer ID.
1. Copy the Preview Offer ID generated in the URL along with the *-Preview* suffix.

:::image type="content" source="../assets/images/apps-in-meetings/publish-status-publisher-signoff.png" alt-text="App source preview":::

## Configure your app with the Preview offer ID

After you've generated your Preview offer ID, you must link the offer ID to your Teams app to view your Preview offer in the Teams Store.

1. Go to [Developer Portal](https://dev.teams.microsoft.com/).
1. Select **Apps** from the left pane.
1. Select the app to link the SaaS offer to.
1. Select **Plans and pricing** and enter the **Publisher ID** and **Offer ID**.
  1. Ensure that the offer ID contains *-Preview* suffix.
1. Select **View** to preview your subscription plans.
1. Review the plans listed under **Apps Subscription** and click **Save**.

:::image type="content" source="../assets/images/apps-in-meetings/Plans-and-pricing-preview-offer.png" alt-text="preview offer label":::

The subscriptionOffer property is added to your app manifest.
```json
"subscriptio(nOffer": {
     "offerId": "publisherId.offerId"-preview  
     }
```
>[!NOTE]
> Check for the label *preview offer* next to **Apps Subscription** to confirm if the offer is a preview offer.

## Sideload the app to Teams

After configuring your app with the preview offer ID, create an updated app package and upload the app package to Teams for the preview audience to test purchasing the app. For more information, see [Upload your app in Microsoft Teams](/concepts/deploy-and-publish/apps-upload).
 
You can also select **Preview in Teams** in the developer portal to launch your app quickly in the Teams client.

* If the preview offer and preview audience are specified in the app manifest, the user can see the **Buy a Subscription** button.

    :::image type="content" source="../assets/images/apps-in-meetings/preview-testing-offer-audience-available.png" alt-text="offer ID and preview audience specified":::

* If the offer ID is specified, but the user isn't part of the **preview audience** defined in the app manifest, the **Buy a Subscription** button is disabled and the app shows a warning message to the user.

    >[!WARNING]
    > No plans found with **-preview**. Make sure you're in the preview audience.

    :::image type="content" source="../assets/images/apps-in-meetings/preview-testing-no-audience.png" alt-text="No preview audience":::

* If the offer ID specified in the app manifest isn't a preview offer, the app shows a warning message to the user and sideloading is disabled.

    >[!WARNING]
    > This isn't a preview offer. Be sure to append the **-preview** to the Offer ID.

    :::image type="content" source="../assets/images/apps-in-meetings/Preview-testing-no-iffer-id.png" alt-text="No preview offer ID":::


## Next step

> [!div class="nextstepaction"]
> [Review and publish an offer to the commercial marketplace](/azure/marketplace/review-publish-offer#validation-and-publishing-steps).

## See also

* [Configure SaaS offer properties](/azure/marketplace/create-new-saas-offer-properties).