---
title: In-app purchase flow for the monetizeable apps
description: Learn the basic tasks and concepts needed to implement in-app purchases and trial functionality in teams apps.
author: 
ms.author: surbhigupta
ms.topic: how-to
localization_priority: Normal 
---

# In-app purchases

The Microsoft Teams provide APIs you can use to implement the following feature to make money from your Teams apps:

* **In-app purchases**&nbsp;&nbsp;Whether your app is free or not, you can sell content or new app functionality (such as additional features of the app) from right within the app.

-----------------Placeholder, if we need to discuss something or scenario that we followed till now before adding this feature--------------------

## Implement in-app purchases

To offer an in-app purchase experience to the users of your app, ensure your app is built on [Teams client SDK library](https://github.com/OfficeDev/microsoft-teams-library-js)

### Update your app manifest

The RSC permissions are added to your app manifest to achieve in-app purchase experience for your users. The app manifest must include the following code snippet:

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


