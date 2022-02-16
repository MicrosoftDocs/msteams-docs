---
title: Present-in-Teams
description: Learn to add the present-in-Teams button on app and document to share in the meeting stage
ms.topic: reference
ms.localizationpriority: medium
keywords: Present-in-Teams
---
# Present-in-Teams

Present-in-Teams allows you to share any documents or third party app as a web view in the meeting stage. All the participants and presenter can interact and edit together. The Present-in-Teams button allows you to install the meeting extension app for the apps to control the meeting stage and to have access to the meeting stage.

## Enable Present-in-Teams on 3P app

Use deep links to link your app with Teams. To enable Present-in-Teams in your app, use the following deep link format:

`msteams:/l/meeting-share?deeplinkId=GUID&fqdn=string&appContext={json}`

The following are the details for the deep links:

**ms teams:** All deep links should start with ms teams, so that Teams app recognizes it and can open the deep link.​

**meeting-stage:** Verb that specifies the protocol type, and the deep link type​.

**deep link Id:** GUID/UUID used for telemetry correlation​.

**fqdn:** teams.microsoft.com or teams.live.com. FQDN is needed in Teams deep link service for tenant or account checking. When the meeting is scheduled with Teams for Life, the fqdn is: teams.live.com, when the meeting is scheduled for Teams for business, the fqdn will be teams.microsoft.com or team.microsoft.us (for Gov) etc. Teams client will find the right linked identity and suggest switching to the right one.​

### Deep link example

`https://teams.microsoft.com/l/meeting-share?deeplinkId=ACCC6AFE-449D-4AF3-8D3E-E8A7B3AB1280&fqdn=teams.microsoft.com&appContext=`

```json
{ ​

"appSharingUrl" : "https://testappronak.azurewebsites.net/ ", ​

"appId": "9cc80a93-1d41-4bcb-8170-4b9ec9e29fbb" ​

}
```
