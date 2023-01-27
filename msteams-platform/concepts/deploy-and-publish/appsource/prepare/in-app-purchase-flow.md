---
title: In-app purchase flow for the monetization of apps
description: Learn the basic tasks and concepts needed to implement in-app purchases and trial functionality in teams apps.
author: v-npaladugu
ms.author: surbhigupta
ms.topic: how-to
ms.localizationpriority: high 
---

# In-app purchases

Microsoft Teams provides APIs that you can use to implement the in-app purchases to upgrade from free to paid Teams apps. In-app purchase allows you to convert users from free to paid plans directly from within your app.

## Implement in-app purchases

To offer an in-app purchase experience to the users of your app, ensure the following:

* App is built with [Microsoft Teams JavaScript client library (TeamsJS)](https://github.com/OfficeDev/microsoft-teams-library-js).

* App is enabled with a transactable [SaaS offer](~/concepts/deploy-and-publish/appsource/prepare/include-saas-offer.md).

* App is enabled with [RSC permissions](#update-manifest).

* App is invoked with [`openPurchaseExperience` API](#purchase-experience-api).

In-app purchase experience can be enabled either by updating `manifest.json` file or by enabling **Show in-app purchase offers** from **Permissions** section of your **Developer Portal**.

### Update manifest

To enable in-app purchase experience, update your Teams app `manifest.json` file by adding the RSC permissions. It allows your app users to upgrade to a paid version of your app and start using new functionalities. The update for app manifest is as follows:

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
}
```

### Purchase Experience API

To trigger in-app purchase for the app, invoke the `openPurchaseExperience` API from your web app.

Following code snippet is an example of calling the API from the Teams app built using Microsoft Teams JavaScript client library:

```json
<div> 
<div class="sectionTitle">openPurchaseExperience</div>
<button onclick="openPurchaseExperience()">openPurchaseExperience</button>
</div>
</body>
<script>
   function openPurchaseExperience()
      microsoftTeams.initialize();
      let callbackcalled = false;
      microsoftTeams.monetization.openPurchaseExperience((e) => {
            console.log("callback is being called");
            console.log(e);
            if (!!e && typeof e !== "string") {
                  alert(JSON.stringify(e));
              }
              return;
            });
      console.log("after callback: ",callbackcalled);
    }
</script>
```

## End-user in-app purchasing experience

The following example shows the users to purchase subscription plans for a fictional Teams app called *Contoso Tasks for Teams*:

1. In the Teams **Store**, find and select the app.

1. In the app details dialog, select **Buy a subscription** or **Add for me**.

    :::image type="content" source="~/assets/images/saas-offer/buysubscriptionplancontoso.png" alt-text="Buying the subscription for the selected app.":::

1. **Add for me** offers a free trial version of the app and later **Upgrade** it to a paid version.

    :::image type="content" source="~/assets/images/saas-offer/upgradeapp.png" alt-text="Upgrading to the subscription for the selected app." lightbox="../../../../assets/images/saas-offer/upgradeapp.png":::

1. In the **Choose a subscription plan** dialog, choose the plan and select **Checkout**.

    :::image type="content" source="~/assets/images/saas-offer/choosingsubscriptionplancontoso.png" alt-text="Selecting the appropriate subscription plan." lightbox="../../../../assets/images/saas-offer/choosingsubscriptionplancontoso.png":::

1. Complete the transaction and select **Configure now** to set up your subscription.

    :::image type="content" source="~/assets/images/saas-offer/saas-offer-configure-now.png" alt-text="Setting up the subscription." lightbox="../../../../assets/images/saas-offer/saas-offer-configure-now.png":::

    :::image type="content" source="~/assets/images/saas-offer/getstarted.png" alt-text="Landing page of the subscription." lightbox="../../../../assets/images/saas-offer/getstarted.png":::

## Next step

> [!div class="nextstepaction"]
> [Test preview for monetized apps](~/concepts/deploy-and-publish/appsource/prepare/Test-preview-for-monetized-apps.md)

## See also

* [Monetize your app](monetize-overview.md)
* [App Manifest](../../../../resources/schema/manifest-schema-dev-preview.md)
