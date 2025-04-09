---
title: Create Tab Apps for Calling
author: surbhigupta
description: Learn to build a tab for initiating one-to-one calls from within Teams
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
ms.date: 12/02/2024
---

# Build tabs for calling

> [!NOTE]
>
> - Tab apps for calling are supported only on desktop and web clients, and not on mobile clients.
> - This feature enables the calling feature in personal scope only and isn't supported for Teams meetings.

You can now create personal scope apps that integrate seamlessly with Public Switched Telephone Network (PSTN) and Teams-to-Teams calls. By using the right scope and context, you can build apps that utilize tab type, static scope, personal context, and meeting side panels effectively.

This integration is simple. You can create a new personal tab app or update an existing tab app with personal scope and the appropriate context. Apps can access caller ID for specific callers and display relevant information, such as their active cases or billing issues. This enhances the app's utility and provides a richer experience for users during calls.

## Prerequisites

Ensure the following requirements are in place before you create or update a tab app for supporting one-to-one calls:

- **RSC Permissions needed**: Ensure the following [RSC permissions](/microsoftteams/platform/graph-api/rsc/resource-specific-consent) are granted for the app:

  - `OnlineMeetingParticipant.Read.Chat`
  - `OnlineMeeting.ReadBasic.Chat`

- **Teams JS SDK required**: [TeamsJS SDK Release latest version](https://github.com/OfficeDev/microsoft-teams-library-js/releases/tag/v2.29.0)

- **Caller ID information**: The tab app must utilize the `getMeetingDetailsVerbose` instead of `getMeetingDetails` to get the call related information. The app can get caller ID details such as phone number and email ID.

  For more information, see [get meeting details API](meeting-apps-apis.md#get-meeting-details-api).

## Enable personal tab apps for calling

To enable personal tab app for one-to-one calls:

- [Update app manifest](#update-app-manifest)
- [Pin your personal tab app to calling extensions](#pin-your-personal-tab-app-to-calling-extensions)

### Update app manifest

Teams uses the meeting side panel context for adding calling context in the manifest schema.
Update your [app manifest](/microsoftteams/platform/resources/schema/manifest-schema#statictabs) with the relevant scope and context arrays under the `staticTabs` section. To configure your  personal tab app for one-on-one calls, update the `staticTabs` section as follows:

1. Set the `scope` as `personal` to make your app available in a personal scope and enables the app to be in a call.
1. Set the `context` as `meetingSidePanel` to enable the tab app to be supported

    Here's an example of the update in the `staticTabs` section of app manifest:

    ```Manifest
    
    "staticTabs":[
    {
        "entityId": "contoso",
        "scopes": ["personal"],
        "context":[
            "meetingSidePanel",
        ],
        "name": "Contoso"
        "contentUrl": "http://contoso.com/content",
        "websiteUrl": "http://contoso.com/content"
    }
    ],
    ```

Here's an example of the app manifest file:

<details>
<summary>Select to view a sample app manifest.</summary>

```Manifest
{
  "$schema": "https://raw.githubusercontent.com/OfficeDev/microsoft-teams-app-schema/preview/DevPreview/MicrosoftTeams.schema.json",
  "version": "1.1.5", 
  "manifestVersion": "devPreview",
  "id": "25407c29-8335-68a3-bfdb-4384580a1858",
  "packageName": "",
  "name": { "short": "Packing List - PersMSP", "full": "Packing List - PersonalAndMeetingSidePanel" },
  "developer": {
    "name": "Microsoft Corporation",
    "websiteUrl": "https://www.microsoft.com",
    "privacyUrl": "https://packing-list.azurewebsites.net/privacy.html",
    "termsOfUseUrl": "https://packing-list.azurewebsites.net/tou.html"
  },
  "description": {
    "short": "Packing list app",
    "full": "Test app to test static tabs flow"
  },
  "icons": { "outline": "outline.png", "color": "color.png" },
  "accentColor": "#eff9fc",
  "staticTabs": [
    {
      "entityId": "54d496e0-2b51-4210-bf7d-21d0b5821d9c",
      "name": "Packing List - PersonalAndMeetingSidePanel",
      "contentUrl": "https://packing-list.azurewebsites.net",
      "websiteUrl": "https://packing-list.azurewebsites.net",
      "scopes": ["personal"],
      "context": [
        "meetingSidePanel"
      ]
    }
  ],
  "validDomains": ["packing-list.azurewebsites.net"],
  "webApplicationInfo": { "id": "25407c29-8335-68a3-bfdb-4384580a1858" },
  "showLoadingIndicator": true,
  "authorization": {
    "permissions": {
      "orgWide": [],
      "resourceSpecific": [
        { "name": "OnlineMeeting.ReadBasic.Chat", "type": "Delegated" },
        { "name": "MeetingStage.Write.Chat", "type": "Delegated" },
        { "name": "OnlineMeetingParticipant.Read.Chat", "type": "Delegated" },
        {
          "name": "OnlineMeetingParticipant.ToggleIncomingAudio.Chat",
          "type": "Delegated"
        },
        { "name": "ChannelMeetingStage.Write.Group", "type": "Delegated" },
        { "name": "ChannelMeeting.ReadBasic.Group", "type": "Delegated" }
      ]
    }
  }
}
```

</details>

### Pin your personal tab app to calling extensions

Teams client users can access your personal tab app only if it's pinned by the Teams administrator. Administrators can leverage **Calling extensions** to pin personal calling tab apps. To pin an app for calling:

1. Go to the pinned apps section in the app setup policy.
1. Pin your app and assign it to users who need access during one-on-one calls.

:::image type="content" source="../assets/images/tab-images/pin-tab-calling.png" alt-text="Image shows how to enable calling extensions to pin apps for calling." lightbox="../assets/images/tab-images/pin-tab-calling.png":::

For more information, see [how to use app setup policies to pin and install apps for users](/microsoftteams/teams-app-setup-policies).

## See also

[Create a tab](../tabs/how-to/create-personal-tab.md)
