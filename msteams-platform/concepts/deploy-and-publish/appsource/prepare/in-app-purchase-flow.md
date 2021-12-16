---
title: In-app purchase flow for the monetizeable apps
description: Learn the basic tasks and concepts needed to implement in-app purchases and trial functionality in teams apps.
author: 
ms.author: surbhigupta
ms.topic: how-to
localization_priority: Normal 
---

# In-app purchases

The Microsoft Teams provide APIs you can use to implement the in-app purchases to make money from your Teams apps.

* **In-app purchases**&nbsp;&nbsp;Whether your app is free or not, you can sell content or new app functionality (such as additional features of the app) from right within the app.

## Implement in-app purchases

To offer an in-app purchase experience to the users of your app, ensure your app is built on [Teams client SDK library](https://github.com/OfficeDev/microsoft-teams-library-js)

### Update manifest

Update your Teams app manifest.json file by adding the RSC permissions to achieve in-app purchase experience. It allows your app users to upgrade to a paid version of your app and start using new functionalities. The update for app manifest is as follows::

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



```
### Permissions




## End-user in-app purchasing experience

The following example shows how users can have an in-app purchasing experience for a Teams app called Polly.

1. In the Teams store, find and select the Polly app.

1. In the app details dialog, select **Add to a team**.

    ![Add to a team](~/assets/images/saas-offer/inapppurchase.png)

1. Polly app is added to a team. Select **Upgrade**.

    ![Upgrade](~/assets/images/saas-offer/upgradeapp.png)

1. Complete the payment and subscription process in the redirected polly website.


[!NOTE]

## Next step

> [!div class="nextstepaction"]
> [Preview testing of monetizable apps](/office/dev/store/add-in-submission-guide)

## See also

[Monetize your app through Microsoft Commercial Marketplace](/office/dev/store/monetize-addins-through-microsoft-commercial-marketplace)

[Include a SaaS offer with your Microsoft Teams app](~/concepts/deploy-and-publish/appsource/prepare/include-saas-offer.md)

