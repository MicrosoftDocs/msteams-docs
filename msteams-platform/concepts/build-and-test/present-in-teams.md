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

You can use deep links to link your app with Teams. To enable Present-in-Teams in your app, use the following deep link format:

`msteams:/l/meeting-share?deeplinkId=GUID&fqdn=string&appContext={json}`

The following are the details for the deep links:

**msteams:** according to protocol, all deeplinks should start with msteams, so that Teams app recognizes it and can open the deeplink.​

**meeting-stage:** verb that specifies the protocol type, and the deeplink type​

**deeplinkId:** GUID/UUID used for telemetry correlation​

**fqdn:** teams.microsoft.com or teams.live.com. Teams supports multi-tenant multi-account, and Teams can run AAD and MSA accounts at the same time. FQDN is needed in Teams deeplink service for tenant/account checking. When the meeting is scheduled with Teams for Life, the fqdn is: teams.live.com, when the meeting is scheduled for Teams for business, the fqdn will be teams.microsoft.com or team.microsoft.us (for Gov) etc. Teams client will find the right linked identity and suggest to switch to the right one.​

```json
{ ​

"appSharingUrl" : "https://testappronak.azurewebsites.net/ ", ​

"appId": "9cc80a93-1d41-4bcb-8170-4b9ec9e29fbb" ​

}
```

## End user Present in Teams experience
