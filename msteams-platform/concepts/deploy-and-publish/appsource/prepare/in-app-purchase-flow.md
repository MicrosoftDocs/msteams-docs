---
title: In-app purchase flow for the monetization of apps
description: Learn the basic tasks and concepts needed to implement in-app purchases and trial functionality in teams apps.
author: v-npaladugu
ms.author: surbhigupta
ms.topic: how-to
ms.localizationpriority: high 
---

# In-app purchases

Microsoft Teams provides APIs that you can use to implement the in-app purchases to upgrade from free to paid Teams apps. In-app purchase allows you to convert users from free to paid plans directly from your app.

In-app purchases allows users to purchase a new paid subscription and it doesn't enable the users to purchase additional or different licenses with existing paid subscriptions. To switch between plans, an existing user subscription must be canceled before a new subscription can be purchased through in-app purchases.

> [!NOTE]
> In-app purchases is supported only in [personal app contexts](~/concepts/design/app-structure#personal-apps).

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

# [TeamsJS v1](#tab/jsonV11)

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

# [TeamsJS V2](#tab/jsonV2)

```json
<div>
<div class="sectionTitle">openPurchaseExperience</div>
<button onclick="openPurchaseExperience()">openPurchaseExperience</button>
</div>
</body>
<script>
    function openPurchaseExperience() {
      micorosftTeams.app.initialize();
      var planInfo = {
          planId: "<Plan id>", // Plan Id of the published SAAS Offer
          term: "<Plan Term>" // Term of the plan.
      }
      monetization.openPurchaseExperience(planInfo);
    }
</script>
```

---

## Next step

> [!div class="nextstepaction"]
> [Test preview for monetized apps](~/concepts/deploy-and-publish/appsource/prepare/Test-preview-for-monetized-apps.md)

## See also

* [Monetize your app](monetize-overview.md)
* [App Manifest](../../../../resources/schema/manifest-schema-dev-preview.md)
