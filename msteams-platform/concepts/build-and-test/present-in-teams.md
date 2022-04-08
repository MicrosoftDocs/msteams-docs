---
title: Present-in-Teams
description: Learn to add the present-in-Teams button on app and document to share in the meeting stage
ms.topic: reference
ms.localizationpriority: medium
keywords: Present-in-Teams
---
# Present-in-Teams

Present-in-Teams allows users to share any documents or third party app as a web view in the meeting stage and all the participants can interact and edit together.

When users select Present-in-Teams button, it launches the deep link to the meeting stage and it request users to install the meeting extension app for the third party apps to control the meeting stage and to have access to the meeting stage.

:::image type="content" source="../../assets/images/present-in-teams/present.PNG" alt-text="present-in-teams":::

## Enable Present-in-Teams on 3P app

(content to be added)

When you select Present-in-Teams button, it launches the deep link to the meeting stage. The following are the deep link format:

`msteams:/l/meeting-share?deeplinkId=GUID&fqdn=string&appContext={json}`

The query parameters are:

`ms teams`: All deep links should start with ms teams, so that Teams app recognizes it and can open the deep link.​

`meeting-stage`: Verb that specifies the protocol type, and the deep link type​.

`deep link Id`: GUID/UUID used for telemetry correlation​.

`fqdn`: teams.microsoft.com or teams.live.com. FQDN is needed in Teams deep link service for tenant or account checking. When the meeting is scheduled with Teams for Life, the fqdn is: teams.live.com, when the meeting is scheduled for Teams for business, the fqdn will be teams.microsoft.com or team.microsoft.us (for Gov) etc. Teams client will find the right linked identity and suggest switching to the right one.​

### Deep link example

`https://teams.microsoft.com/l/meeting-share?deeplinkId=ACCC6AFE-449D-4AF3-8D3E-E8A7B3AB1280&fqdn=teams.microsoft.com&appContext=`

Required:

```json
{ ​
"contentUrl" : "<URL to be opened in the Meeting Right Side Panel and Post Meeting Tab>", ​
"appID" : "<Unique ID of the App to be Installed>"​
}
```

Optional:

```json
{ ​
"sharedStageUrl": "<URL to be opened in the Meeting Stage>", // Default = contentUrl​
"suggestedTabName" : "<Name of the Tab in U-Bar>",  // Default = Name of the App​
"entityID" : "<Unique Identifier for the tab>",   // Create a new entityID if not specified ​
"websiteUrl" : "<URL to be opened when user selects 'Go to Website'>",   // Default = contentUrl​ 
"removeUrl" : "<URL to be loaded in an iFrame when a Tab is removed>"
}
```

## Limitations

(content to be added)

## End user experience - 3P

After you enable present to teams, you can share the document or web apps in the meeting stage. To access, follow the steps:

If meeting extension app installed:

1. Open web app and select **Share in meeting** button.

    :::image type="content" source="../../assets/images/present-in-teams/web-app.PNG" alt-text="Present in teams web app":::

1. Select **open** button.

    :::image type="content" source="../../assets/images/present-in-teams/share.PNG" alt-text="Present in teams share":::

1. Now, the web app shared to meeting stage.

    :::image type="content" source="../../assets/images/present-in-teams/share-stage.PNG" alt-text="present in teams":::

## End user experience - 1P
