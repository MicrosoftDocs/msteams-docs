---
title: Test preview for monetized apps 
author: v-ypalikila
description: Create and test SaaS Preview offers for Teams app before pushing the offer live.
ms.topic: conceptual
ms.author: v-ypalikila
ms.localizationpriority: medium
keywords: teams apps SaaS offer preview offer test preview monetized saas
---

# Test preview for monetized apps

> [!NOTE]
> Test preview for monetized apps is currently available only in [**Developer preview**](/microsoftteams/platform/resources/dev-preview/developer-preview-intro).

As a developer, you can [create a Software as a Service (SaaS) offer](/azure/marketplace/create-new-saas-offer) and test the end-to-end purchase experience in Teams. Users who are added as the preview audience for the Teams app can review your SaaS offer before you publish it live, see [Add a preview audience for a SaaS offer](/azure/marketplace/create-new-saas-offer-preview).

## Create a preview offer ID

Select the **AppSource preview** link to find the Preview offer ID in the browser address bar with *publisherId.offerId-preview* format. Ensure that the SaaS offer is in the [Preview creation phase](/azure/marketplace/review-publish-offer).

1. Go to [Partner Center](https://go.microsoft.com/fwlink/?linkid=2166002) and sign in using your developer credentials.
1. Select **Marketplace offers**.
1. Select the SaaS offer you want to preview.
1. Select **AppSource preview** under **Go Live** in the **Offer overview** page to generate a Preview offer ID.
1. Copy the offer ID along with the *-preview* suffix.

    :::image type="content" source="../../../../assets/images/apps-in-meetings/publish-status-publisher-signoff.png" alt-text="preview offer id":::

> [!NOTE] 
> Unlike a public offer ID, the Preview offer ID can be recognized with the *-preview* suffix. For example, **publisherId.offerId-preview**.

## Configure your app with the preview offer ID

> [!NOTE]
> Sign in to the **Developer Portal** using a developer account with **preview audience** for users to see your subscription plans in the Teams store.

After you've generated your Preview offer ID, link the offer ID to your Teams app.

1. Go to [Developer Portal](https://dev.teams.microsoft.com/) and sign in using your developer credentials.
1. Select **Apps** from the left pane.
1. Select the app to link the SaaS offer to.
1. Select **Plans and pricing** and enter the **Publisher ID** and **Offer ID**.
    1. Ensure the offer ID contains *-preview* suffix.
1. Select **View** to preview your subscription plans.
1. Review the plans listed under **Apps Subscription** and select **Save**.

     <!---Contoso Screenshot --->

The subscriptionOffer property is added to your app manifest.

```json
"subscriptionOffer": {
     "offerId": "publisherId.offerId-preview"  
     }
```

>[!NOTE]
> Check for the label *Preview offer* next to **Apps subscription** to confirm if the offer is a Preview Offer.

## Sideload the app to Teams

After configuring your app with the Preview Offer ID, create an updated app package and upload the app package to Teams for the preview audience to test purchasing the app, see [Upload your app in Microsoft Teams](/concepts/deploy-and-publish/apps-upload).

You can select **Preview in Teams** in the developer portal to launch your app quickly in the Teams client.

 If the Preview offer is specified in the app manifest and the preview audience is defined in the Partner center for the offer, the user can see the **Buy a Subscription** button.

<!---Contoso Screenshot --->

### Error scenarios

* If the offer ID is specified, but the user isn't part of the **Preview audience** defined in the Partner Center, the **Buy a subscription** button isn't visible and the app shows a warning message to the user.

    >[!WARNING]
    > No plans found with **-preview**. Make sure you're in the preview audience.

    <!---Contoso Screenshot --->

* If the offer ID specified in the app manifest isn't a Preview offer, the app shows a warning message to the user and sideloading is disabled.

    >[!WARNING]
    > This isn't a preview offer. Be sure to append the **-preview** to the Offer ID.

    <!---Contoso Screenshot --->

## See also

* [Include a SaaS offer with your Microsoft Teams app](include-saas-offer.md).
* [Review and publish an offer to the commercial marketplace](/azure/marketplace/review-publish-offer#validation-and-publishing-steps).
