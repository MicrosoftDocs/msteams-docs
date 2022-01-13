---
title: In-app purchase flow for the monetization of apps
description: Learn the basic tasks and concepts needed to implement in-app purchases and trial functionality in teams apps.
author: v-npaladugu
ms.author: surbhigupta
ms.topic: how-to
localization_priority: Normal 
---

# In-app purchases

Microsoft Teams provide APIs that you can use to implement the in-app purchases to make money from your Teams apps.

**In-app purchases**, whether your app is free or not, you can sell content or new app functionality (such as additional features of the app) from right within the app.

## Implement in-app purchases

To offer an in-app purchase experience to the users of your app, ensure your app is built on [Teams client SDK library](https://github.com/OfficeDev/microsoft-teams-library-js)

### Update manifest

Update your Teams app **manifest.json** file by adding the RSC permissions to achieve in-app purchase experience. It allows your app users to upgrade to a paid version of your app and start using new functionalities. The update for app manifest is as follows:

```json

"authorization": {
    "permissions": {
        "resourceSpecific": [
            {
             "name": "InAppPurchase.Allow.User",
             "type": "Delegated"
            }
        ]
}
```

### Purchase Experience API

You must call `openPurchaseExperience` API from your web app to enable in-app purchase for the app.

Following is an example of calling the API from the app:

```json
<body> 
<div> 
<div class="sectionTitle">openPurchaseExperience</div> 
<button onclick="openPurchaseExperience()">openPurchaseExperience</button> 
</div> 
</body> 
<script> 
    function openPurchaseExperience() { 
        microsoftTeams.initialize(); 
        let callbackcalled = false; 
        microsoftTeams.monetization.openPurchaseExperience((e) => { 
        console.log("callback is being called"); 
        callbackcalled = true; 
        return; 
    }); 
console.log("after callback: ",callbackcalled); 
} 
</script> 
```

## End-user in-app purchasing experience

The following example shows the users to purchase subscription plans for a fictional Teams app called *Contoso Tasks for Teams*.

1. In the Teams **Store**, find and select the app.

1. In the app details dialog, select **Buy a subscription**. 

    :::image type="content" source="~/assets/images/saas-offer/buysubscriptionplancontoso.png" alt-text="Buying the subscription for the selected app.":::

    Offer a free trial version of the app and later users can choose to **Upgrade** it to a paid version.

    :::image type="content" source="~/assets/images/saas-offer/upgradeapp.png" alt-text="Upgrading to the subscription for the selected app.":::

1. In the **Choose a subscription plan** dialog, choose the plan and select **Checkout**.

    :::image type="content" source="~/assets/images/saas-offer/choosingsubscriptionplancontoso.png" alt-text="Selecting the appropriate subscription plan.":::

1. In the **Checkout** dialog, provide the required information and select **Place order**.

    :::image type="content" source="~/assets/images/saas-offer/placesubscriptionordercontoso.png" alt-text="Placing the subscription order.":::

1. After the transaction is complete, select **Configure now** to set up your subscription.

    :::image type="content" source="~/assets/images/saas-offer/saas-offer-configure-now.png" alt-text="Setting up the subscription.":::

1. User is redirected to the **Get started** page.

    :::image type="content" source="~/assets/images/saas-offer/getstarted.png" alt-text="Landing page of the subscription.":::

## Next step

> [!div class="nextstepaction"]
> [Preview testing of monetizable apps](/office/dev/store/add-in-submission-guide)

## See also

[Include a SaaS offer with your Microsoft Teams app](~/concepts/deploy-and-publish/appsource/prepare/include-saas-offer.md)

