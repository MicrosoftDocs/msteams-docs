---
title: Build apps for Teams meeting stage
author: v-sdhakshina
description: In this article, learn how to build meeting apps API references that are available for Teams client.
ms.topic: conceptual
ms.author: v-sdhakshina
ms.localizationpriority: medium
ms.date: 04/07/2022
---

# Build apps for Teams meeting stage

Share to stage allows users to share an app to the meeting stage from the app side panel in an ongoing meeting. This sharing is interactive & collaborative as opposed to passive screen sharing.

Users can invoke share to stage by selecting on the **Share to Stage** icon on the top right side of the app side panel. This is a native Teams client button and selecting it shares the entire app to the meeting stage.  

## App manifest settings for apps in meeting stage

To share an app to the meeting stage, the app must call the meeting side panel experience in manifest setting:

```json
"context":[ 
    "meetingSidePanel", 
    "meetingStage" 
     ] 
```

## Advanced share to stage APIs

There are many scenarios where sharing the entire app to the meeting stage isn't as useful as sharing specific parts of the app:  

1. For a brainstorming or whiteboard app, a user may want to share a specific board in a meeting vs the entire app with all the boards.  

1. For a medical app, a doctor may want to share just the X-Ray on the screen with the patient vs sharing the entire app with all the patients' records or results etc.  

1. For an app like Arcade, the user would want to share individual games to the meeting stage vs the entire Arcade app.  

1. A user can want to share content from a single content provider at a time (for example, YouTube, TikTok, Disney, etc) vs sharing the entire an entire video catalog onto stage.

To solve for these scenarios, we released APIs within the Teams Client SDK that allows you to programmatically invoke share to stage for specific parts of the app from a button in the app side panel.

:::image type="content" source="../assets/images/apps-in-meetings/shared-meeting-stage-edit-review-component.png" alt-text="The screenshot shows the share to meeting stage view.":::

The following three APIs that are particularly enabling the above scenarios:

|Method| Description| Source|
|---|---|----|
|[**Share app content to stage**](#share-app-content-to-stage-api)| Share specific parts of the app to meeting stage from the app side panel in a meeting. | [MSTC SDK](/javascript/api/@microsoft/teams-js/meeting) |
|[**Get app content stage sharing state**](#get-app-content-stage-sharing-state-api)| Fetch information about app's sharing state on the meeting stage. | [MSTC SDK](/javascript/api/@microsoft/teams-js/meeting.iappcontentstagesharingstate) |
|[**Get app content stage sharing capabilities**](#get-app-content-stage-sharing-capabilities-api)| Fetch the app's capabilities for sharing to the meeting stage. | [MSTC SDK](/javascript/api/@microsoft/teams-js/meeting.iappcontentstagesharingcapabilities) |

## Share app content to stage API

The `shareAppContentToStage` API enables you to share specific parts of your app to the meeting stage. The API is available through the Teams client SDK.

### Prerequisite

* To use the `shareAppContentToStage` API, you must obtain the RSC permissions. In the app manifest, configure the `authorization` property, and the `name` and `type` in the `resourceSpecific` field. For example:

    ```json
    "authorization": {
        "permissions": { 
        "resourceSpecific": [
        { 
        "name": "MeetingStage.Write.Chat",
        "type": "Delegated"
        }
        ]
    }
    }
    ```

* `appContentUrl` must be allowed by `validDomains` array inside manifest.json, else API would return 501.

### Query parameter

The following table includes the query parameters:

|Value|Type|Required|Description|
|---|---|----|---|
|**callback**| String | Yes | Callback contains two parameters, error and result. The *error* can either contain an error of type *SdkError*, or null when share is successful. The *result* can either contain a true value, if there's a successful share, or null when the share fails. |
|**appContentURL**| String | Yes | The URL that will be shared on to the stage. |

### Example

```javascript
const appContentUrl = "https://www.bing.com/";

microsoftTeams.meeting.shareAppContentToStage((err, result) => {
    if (result) {
        // handle success
    }
    if (err) {
        // handle error
    }
}, appContentUrl);
```

### Response codes

The following table provides the response codes:

|Response code|Description|
|---|---|
| **500** | Internal error. |
| **501** | API isn't supported in the current context.|
| **1000** | App doesn't have proper permissions to allow share to stage.|

## Get app content stage sharing state API

The `getAppContentStageSharingState` API enables you to fetch information about apps sharing on the meeting stage.

### Query parameter

The following table includes the query parameter:

|Value|Type|Required|Description|
|---|---|----|---|
|**callback**| String | Yes | Callback contains two parameters, error, and result. The *error* can either contain an error of type *SdkError*, in case of an error, or null when share is successful. The *result* can either contain an `AppContentStageSharingState` object, indicating successful retrieval, or null, indicating failed retrieval.|

### Example

```javascript
microsoftTeams.meeting.getAppContentStageSharingState((err, result) => {
    if (result.isAppSharing) {
        // Indicates app has permission to share contents to meeting stage.
    }
});
```

The JSON response body for the `getAppContentStageSharingState` API is:

```json
{
   "isAppSharing":true
} 
```

### Response codes

The following table provides the response codes:

|Response code|Description|
|---|---|
| **500** | Internal error. |
| **501** | API isn't supported in the current context.|
| **1000** | App doesn't have proper permissions to allow share to stage.|

## Get app content stage sharing capabilities API

The `getAppContentStageSharingCapabilities` API enables you to fetch the app's capabilities for sharing to meeting stage.

### Query parameter

The following table includes the query parameter:

|Value|Type|Required|Description|
|---|---|----|---|
|**callback**| String | Yes | Callback contains two parameters, error, and result. The *error* can either contain an error of type *SdkError*, or null when share is successful. The result can either contain an `AppContentStageSharingState` object, indicating successful retrieval, or null, indicating failed retrieval.|

### Example

```javascript
microsoftTeams.meeting.getAppContentStageSharingCapabilities((err, result) => {
    if (result.doesAppHaveSharePermission) {
        // Indicates app has permission to share contents to meeting stage.
    }
});
```

The JSON response body for `getAppContentStageSharingCapabilities` API is:

```json
{
   "doesAppHaveSharePermission":true
} 
```

### Response codes

The following table provides the response codes:

|Response code|Description|
|---|---|
| **500** | Internal error. |
| **1000** | App doesn't have permissions to allow share to stage.|

## See also

* [Teams authentication flow for tabs](../tabs/how-to/authentication/auth-flow-tab.md)
* [Apps for Teams meetings](teams-apps-in-meetings.md)
* [Enable and configure your apps for Teams meetings](enable-and-configure-your-app-for-teams-meetings.md)
* [Build extensible conversation for meeting chat](build-extensible-conversation-for-meeting-chat.md)
* [Build apps for anonymous users](build-apps-for-anonymous-user.md)
* [Advanced meeting APIs](advanced-meeting-apis.md)
* [Custom Together Mode scenes](~/apps-in-teams-meetings/teams-together-mode.md)
* [Live Share SDK](teams-live-share-overview.md)
