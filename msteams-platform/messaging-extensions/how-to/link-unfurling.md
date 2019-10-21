---
title: Link unfurling
author: clearab
description: How to perform link unfurling with messaging extension in a Microsoft Teams app.
ms.topic: conceptual
ms.author: anclear
---
# Link unfurling

### Receive requests from links inserted into the compose message box

As an alternative (or in addition) to searching your external service, you can use a URL inserted into the compose message box to query your service and return a card. In the screenshot below a user has pasted in a URL for a work item in Azure DevOps which the messaging extension has resolved into a card.

![Example of link unfurling](~/assets/images/compose-extensions/messagingextensions_linkunfurling.png)

To enable your messaging extension to interact with links this way you'll first need to add the `messageHandlers` array to your app manifest as in the example below:

```json
"composeExtensions": [
  {
    "botId": "abc123456-ab12-ab12-ab12-abcdef123456",
    "messageHandlers": [
      {
        "type": "link",
        "value": {
          "domains": [
            "*.trackeddomain.com"
          ]
        }
      }
    ]
  }
]
```

Once you've added the domain to listen on to the app manifest, you'll need to change your bot code to [respond](#respond-to-user-requests) to the below invoke request.

```json
{
  "type": "invoke",
  "name": "composeExtension/queryLink",
  "value": {
    "url": "https://theurlsubmittedbyyouruser.trackeddomain.com/id/1234"
  }
}
```

If your app returns multiple items only the first will be used.