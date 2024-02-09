---
title: In-app purchase flow for monetization of apps
description: Learn the basic tasks and concepts needed to implement in-app purchases and trial functionality in teams apps.
author: v-npaladugu
ms.author: surbhigupta
ms.topic: how-to
ms.localizationpriority: high
ms.date: 01/31/2023
---

# Configure in-app purchases

In-app purchases are upgrade options where users can upgrade from free to paid plans within your app. Microsoft Teams provides APIs to implement in-app purchases. The in-app purchase option is applicable only if the app is enabled with a transactable SaaS offer.

Users can buy new paid subscriptions through in-app purchases. However, they can't purchase additional or different licenses with existing paid subscriptions. To change plans, users must first cancel their current subscription before acquiring a new plan through in-app purchases.

> [!NOTE]
> In-app purchases are supported only in [personal app contexts](~/concepts/design/app-structure.md#personal-apps).

## Implement in-app purchases

To facilitate an in-app purchase experience for your app users, ensure the following prerequisites are met:

* The app is built using [Microsoft Teams JavaScript client library (TeamsJS)](https://github.com/OfficeDev/microsoft-teams-library-js).

* The app is enabled with a transactable [SaaS offer](~/concepts/deploy-and-publish/appsource/prepare/include-saas-offer.md).

* The app is enabled with [RSC permissions](#update-manifest).

* The app is invoked with [`openPurchaseExperience` API](#purchase-experience-api).

You can activate the in-app purchase experience through one of the following ways:

* Update `manifest.json` file.
* Enable **Show in-app purchase offers** in the **Permissions** section of **Teams Developer Portal**.

### Update manifest

To enable the in-app purchase experience, update your Teams app `manifest.json` file by adding the [RSC permissions](../../../../graph-api/rsc/grant-resource-specific-consent.md). It allows your app users to upgrade to a paid version of your app and access new features. Update the app manifest as given in the following code snippet:

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

To trigger in-app purchase for the app, invoke the `openPurchaseExperience` API from your web app. The following code snippet is an example of calling the API from the Teams app built using TeamsJS:

# [TeamsJS v2](#tab/jsonV2)

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

# [TeamsJS v1](#tab/jsonV1)

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

---

## See also

* [Monetize your app](monetize-overview.md)
* [App Manifest](../../../../resources/schema/manifest-schema-dev-preview.md)
* [RSC permissions](../../../../graph-api/rsc/resource-specific-consent.md)
