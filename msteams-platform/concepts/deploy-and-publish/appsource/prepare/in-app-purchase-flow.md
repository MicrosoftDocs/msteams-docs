---
title: In-app purchase flow for monetization of apps
description: Learn the basic tasks and concepts needed to implement in-app purchases and trial functionality in teams apps.
author: v-npaladugu
ms.author: surbhigupta
ms.topic: how-to
ms.localizationpriority: high 
ms.date: 01/31/2023
---

# In-app purchases

Microsoft Teams provides APIs to implement in-app purchases that allows users to upgrade from free to paid plans within your app. The in-app purchase option is applicable only if the app is enabled with a transactable SaaS offer.

Users can buy new paid subscriptions through in-app purchases, but they can't purchase additional or different licenses with existing paid subscriptions. If users want to switch between plans, existing user subscription must be canceled before purchasing a new one through in-app purchases.

> [!NOTE]
> In-app purchases are supported only in [personal app contexts](~/concepts/design/app-structure.md#personal-apps).

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

## See also

* [Monetize your app](monetize-overview.md)
* [App Manifest](../../../../resources/schema/manifest-schema-dev-preview.md)
