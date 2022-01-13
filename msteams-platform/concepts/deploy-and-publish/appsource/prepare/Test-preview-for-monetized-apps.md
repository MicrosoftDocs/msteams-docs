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

As a developer, you can create a Software as a Service (SaaS) offer and test the end-to-end purchase experience in Teams before you publish the offer. Users who are added as the preview audience for the Teams app can test the preview offer, see [Add a preview audience for a SaaS offer](/azure/marketplace/create-new-saas-offer-preview).

## Create a preview offer

>[!NOTE]
> * Ensure that the SaaS offer you want to preview is in the [Preview creation phase](/azure/marketplace/review-publish-offer).
> * Unlike a public Offer ID, the preview Offer ID can be recognized with the *-preview* suffix. For example, **westleysystemsinc1614967134606.pig_latin-preview**.

Create a preview offer ID for the SaaS offer using the **AppSource preview link** in the Partner Center.

1. Go to [Partner Center](https://go.microsoft.com/fwlink/?linkid=2166002) and sign in using your developer credentials.
1. Select **Marketplace offers**.
1. Select the SaaS offer you want to preview.
1. Select **App source preview** under **Go Live** to generate a Preview Offer link.
1. Copy the offer from the URL along with the *-Preview* suffix.

    :::image type="content" source="../../../../assets/images/apps-in-meetings/publish-status-publisher-signoff.png" alt-text="preview offer id":::

## Configure your app with the Preview offer ID

After you've generated your Preview Offer, link the offer to your Teams app for users to see your subscription plans in the Teams store.

1. Go to [**Developer Portal**](https://dev.teams.microsoft.com/) and sign in using the developer account with preview audience.
1. Select **Apps** from the left pane.
1. Select the app to link the SaaS offer to.
1. Select **Plans and pricing** and enter the **Publisher ID** and **Offer ID**.
    1. Ensure the offer ID contains *-preview* suffix.
1. Select **View** to preview your subscription plans.
1. Review the plans listed under **Apps Subscription** and select **Save**.

     <!---Contoso Screenshot --->

The subscriptionOffer property is added to your app manifest.

```json
"subscriptio(nOffer": {
     "offerId": "publisherId.offerId -preview"  
     }
```

>[!NOTE]
> Check for the label *Preview Offer* next to **Apps Subscription** to confirm if the offer is a Preview Offer.

## Sideload the app to Teams

After configuring your app with the Preview Offer ID, create an updated app package and upload the app package to Teams for the preview audience to test purchasing the app. For more information, see [Upload your app in Microsoft Teams](/concepts/deploy-and-publish/apps-upload).
 
You can select **Preview in Teams** in the developer portal to launch your app quickly in the Teams client.

### App error scenarios 

* If the Preview Offer and preview audience are specified in the app manifest, the user can see the **Buy a Subscription** button.

    <!---Contoso Screenshot --->

* If the offer ID is specified, but the user isn't part of the **preview audience** defined in the partner center, the **Buy a Subscription** button isn't visible and the app shows a warning message to the user.

    >[!WARNING]
    > No plans found with **-preview**. Make sure you're in the preview audience.

    <!---Contoso Screenshot --->

* If the offer ID specified in the app manifest isn't a Preview Offer, the app shows a warning message to the user and sideloading is disabled.

    >[!WARNING]
    > This isn't a preview offer. Be sure to append the **-preview** to the Offer ID.

    <!---Contoso Screenshot --->

## See also

* [Include a SaaS offer with your Microsoft Teams app](include-saas-offer.md).
* [Review and publish an offer to the commercial marketplace](/azure/marketplace/review-publish-offer#validation-and-publishing-steps).
