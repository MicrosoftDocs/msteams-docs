---
title: Present in Teams
description: Learn to add the present in Teams button on app and document to share in the meeting stage
ms.topic: reference
ms.localizationpriority: medium
keywords: Present in Teams
---
# Present in Teams

Present in Teams allows users to share any documents or third party app as a web view in the meeting stage and all the participants can interact and edit together.

Users can select Present in Teams button and it launches the deep link to the meeting stage. If users not installed meeting extension, it request users to install the meeting extension app for the third party apps to control the meeting stage and to have access to the meeting stage.

The following image shows the present in Teams experience:

:::image type="content" source="../../assets/images/present-in-teams/present.PNG" alt-text="present-in-teams":::

## Enable Present in Teams on 3P app

(content to be added)

## Deep link Format

When you select Present in Teams button, it launches the deep link to the meeting stage. The following are the deep link format:

`msteams:/l/meeting-share?deeplinkId=GUID&fqdn=string&appContext={json}`

The query parameters are:

* `msteams`: All deep links should start with **msteams**, so that Teams app recognizes it and can open the deep link.​

* `meeting-stage`: Verb that specifies the protocol type, and the deep link type​.

* `deep link Id`: **GUID/UUID** used for telemetry correlation​.

* `fqdn`: teams.microsoft.com or teams.live.com. FQDN is needed in Teams deep link service for tenant or account checking.

  * When the meeting is scheduled with Teams for Life, the fqdn is: **teams.live.com**.

  * When the meeting is scheduled for Teams for business, the fqdn is: **teams.microsoft.com** or **team.microsoft.us** (for Gov) etc. Teams client will find the right linked identity and suggest switching to the right one.​

## Deep link example

`https://teams.microsoft.com/l/meeting-share?deeplinkId=ACCC6AFE-449D-4AF3-8D3E-E8A7B3AB1280&fqdn=teams.microsoft.com&appContext=`

Required:

```json
{ ​
"contentUrl" : "<URL to be opened in the Meeting Stage>", ​
"appID" : "<Unique ID of the App to be Installed>"​
}
```

Optional:

```json
{ ​
"additionalInfo": "<Passed on further down for consumption as required>"
}
```

## Known limitations

(content to be added)

## End user experience on third party apps

After you enable present to teams on third party apps, you can share the document or web apps in the meeting stage. To access, follow the steps:

If meeting extension is installed:

1. Open web app in the browser and select **Share in meeting** button.

   :::image type="content" source="../../assets/images/present-in-teams/web-app.PNG" alt-text="Present in teams web app":::

1. Select **Start sharing** button.

   :::image type="content" source="../../assets/images/present-in-teams/share.PNG" alt-text="Present in teams share":::

1. Web app is shared to meeting stage and all the participant can interact and edit together.

   :::image type="content" source="../../assets/images/present-in-teams/share-stage.PNG" alt-text="present in teams":::

If meeting extension is not installed:

1. Open web app in the browser and select **Share in meeting** button.

   :::image type="content" source="../../assets/images/present-in-teams/web-app.PNG" alt-text="Present in teams web app":::

1. Select **Add** to install meeting extension app.

   :::image type="content" source="../../assets/images/present-in-teams/meeting-extension-app.PNG" alt-text="meeting-extension":::

1. Select **Start sharing** button.

   :::image type="content" source="../../assets/images/present-in-teams/share.PNG" alt-text="Present in teams share":::

1. Web app is shared to meeting stage and all the participant can interact and edit together.

   :::image type="content" source="../../assets/images/present-in-teams/share-stage.PNG" alt-text="present in team":::

## See also

* [Share to Teams from personal app or tab](share-to-teams-from-personal-app-or-tab.md)
* [Share to Teams from web apps](share-to-teams-from-web-apps.md)
