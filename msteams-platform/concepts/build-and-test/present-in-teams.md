---
title: Present-in-Teams
description: Learn to add the present-in-Teams button on app and document to share in the meeting stage
ms.topic: reference
ms.localizationpriority: medium
keywords: Present-in-Teams
---
# Present-in-Teams

Present-in-Teams allows you to share any documents or app as a web view in the meeting stage and all the participants and presenter can interact and edit the documents or app together. The Present-in-Teams button will install the meeting extension app for the apps to control the meeting stage and have access to the meeting stage.
This allows users to share the app or document from the app or document itself without reaching the Teams.

## Enable Present-in-Teams on 3P app

To enable Present-in-Teams option for third party apps, use the following format of the deep link to share the app:

`msteams:/l/meeting-share?deeplinkId=GUID&fqdn=string&appContext={json}`

```json
{ ​

"appSharingUrl" : "https://testappronak.azurewebsites.net/ ", ​

"appId": "9cc80a93-1d41-4bcb-8170-4b9ec9e29fbb" ​

}
```

## Enable Present-in-Teams on 1P


## End user Present in Teams experience