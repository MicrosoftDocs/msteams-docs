---
title: Build apps for Teams meeting stage
author: v-sdhakshina
description: Learn how to build apps for Teams meeting stage, share to stage APIs, and generate a deep link to share content to stage in meetings.
ms.topic: conceptual
ms.author: v-sdhakshina
ms.localizationpriority: medium
ms.date: 04/07/2022
---

# Build apps for Teams meeting stage

Share to stage allows users to share an app to the meeting stage from the meeting side panel in an ongoing meeting. This sharing is interactive and collaborative in comparison to passive screen sharing.

To invoke share to stage, users can select the **Share to Stage** icon on the upper-right side of the meeting side panel. **Share to Stage** icon is native to Teams client and selecting it shares the entire app to the meeting stage.

## App manifest settings for apps in meeting stage

To share an app to the meeting stage, you must configure the context and RSC permissions in the app manifest:

1. Update the `context` property in the app manifest as follows:

    ```json
    "context": [
      "meetingSidePanel",
      "meetingStage"
    ]
    ```

2. Obtain the RSC permissions by configuring the `authorization` property, and the `name` and `type` in the `resourceSpecific` field as follows:

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

## Advanced share to stage APIs

There are many scenarios where sharing the entire app to the meeting stage isn't as useful as sharing specific parts of the app:  

1. For a brainstorming or whiteboard app, a user may want to share a specific board in a meeting versus the entire app with all the boards.  

1. For a medical app, a doctor may want to share just the X-Ray on the screen with the patient versus sharing the entire app with all the patients records or results and so on.

1. A user may want to share content from a single content provider at a time (for example, YouTube) versus sharing an entire video catalog onto stage.

To help users in such scenarios, we released APIs within the Microsoft Teams JavaScript client library (TeamsJS) that allow you to programmatically invoke share to stage for specific parts of the app from a button in the meeting side panel.

# [Desktop](#tab/desktop)

The following image shows the share to stage option in the Teams desktop client:

   :::image type="content" source="../assets/images/apps-in-meetings/shared-meeting-stage-edit-review-component.png" alt-text="The screenshot shows the share to meeting Stage View.":::

# [Mobile](#tab/mobile)

The following image shows the share to stage option in the Teams mobile client:

   :::image type="content" source="../assets/images/meeting-stage/meeting-share-to-stage-mobile.png" alt-text="This screenshot shows meeting Stage View of the app you shared to meeting in Teams mobile.":::

---

Use the following APIs to share specific part of the app:

|Method| Description| Source|
|---|---|----|
|[**Share app content to stage**](#share-app-content-to-stage-api)| Share specific parts of the app to meeting stage from the meeting side panel in a meeting. | [TeamsJS library](/javascript/api/@microsoft/teams-js/meeting) |
|[**Get app content stage sharing state**](#get-app-content-stage-sharing-state-api)| Fetch information about app's sharing state on the meeting stage. | [TeamsJS library](/javascript/api/@microsoft/teams-js/meeting.iappcontentstagesharingstate) |
|[**Get app content stage sharing capabilities**](#get-app-content-stage-sharing-capabilities-api)| Fetch the app's capabilities for sharing to the meeting stage. | [TeamsJS library](/javascript/api/@microsoft/teams-js/meeting.iappcontentstagesharingcapabilities) |

## Share app content to stage API

The `shareAppContentToStage` API enables you to share specific parts of your app to the meeting stage. The API is available through the TeamsJS library.

### Prerequisite

`appContentUrl` must be allowed by `validDomains` array inside manifest.json, else the API returns a 501 error.

### Query parameter

The following table includes the query parameters:

|Value|Type|Required|Description|
|---|---|----|---|
|**callback**| String | Yes | Callback contains two parameters, error and result. The *error* can contain either an error of type *SdkError* or null when share is successful. The *result* can contain either a true value if there's a successful share or null when the share fails. |
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
|**callback**| String | Yes | Callback contains two parameters, error and result. The *error* can contain either an error of type *SdkError* in case of an error or null when share is successful. The *result* can contain either an `IAppContentStageSharingState` object when share is successful or null in case of an error.|

### Example

```javascript
microsoftTeams.meeting.getAppContentStageSharingState((err, result) => {
    if (result.isAppSharing) {
        // Indicates if app is sharing content on the meeting stage.
    }
});
```

The JSON response body for the `getAppContentStageSharingState` API is:

```json
{
  "isAppSharing": true
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

The `getAppContentStageSharingCapabilities` API enables you to fetch the app's capabilities for sharing the app content to meeting stage. Apps need to call the `getAppContentStageSharingCapabilities` API to either enable or disable the custom share to stage button for a meeting participant in the meeting side panel. The share to stage button must be disabled or hidden if a meeting participant doesn't have permission to share the app content to meeting stage.

The app sharing capabilities depend on the tenant user type and participant roles in a meeting.

* **User type**: In-tenant, guest, and external user type participants can share the app to stage and also see and interact with the app being shared on stage. Anonymous user can't see, share, or interact with the app that is being shared on the stage. For more information, see [user types in a meeting.](~/apps-in-teams-meetings/teams-apps-in-meetings.md#user-types-in-teams)

* **User roles**: Participants with presenter and organizer user roles in a meeting can share the app to stage. Attendee won't have the share to stage button enabled and ability to share the app to stage. For more information, see [user roles in Teams meeting.](~/apps-in-teams-meetings/teams-apps-in-meetings.md#user-roles-in-teams-meeting)

### Query parameter

The following table includes the query parameter:

|Value|Type|Required|Description|
|---|---|----|---|
|**callback**| String | Yes | Callback contains two parameters, error and result. The *error* can contain either an error of type *SdkError* or null when share is successful. The result can contain either an `IAppContentStageSharingCapabilities` object, when share is successful or null in case of an error.|

### Example

```javascript
microsoftTeams.meeting.getAppContentStageSharingCapabilities((err, result) => {
    if (result.doesAppHaveSharePermission) {
        // Indicates if the meeting participant has permission to share content to the meeting stage.
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
| **501** | API isn't supported in the current context.|
| **1000** | App doesn't have permissions to allow share to stage.|

## Build an in-meeting document signing app

You can build an in-meeting app for enabling meeting participants to sign documents in real time. It facilitates reviewing and signing documents in a single session. The participants can sign the documents using their current tenant identity.

You can use an in-meeting signing app to:

* Add documents to be reviewed during a meeting.
* Share documents to be reviewed to main stage.
* Sign documents using the signer’s identity.

The participants can review and sign documents, such as purchase agreements and purchase orders.

:::image type="content" source="../assets/images/sbs-inmeeting-doc-signing/final-output.png" alt-text="Screenshot shows an in-meeting document signing app":::

The following participant roles may be involved during the meeting:

* **Document creator**: This role can add their own documents to be reviewed and signed.
* **Signer**: This role can sign reviewed documents.
* **Reader**: This role can view the documents added to the meeting.

## Feature compatibility by user types

The following table provides the user types and lists the features that each user can access in meetings:

| User type | Scheduled meeting or Instant calendar meeting | One-on-one call | Group call | Scheduled channel meeting |
| :-- | :-- | :-- | :-- | :-- |
| In-tenant | Presenter or  organizer can start, view, and interact with the app in the meeting stage.<br><br> Attendee can only view and interact. | Presenter or organizer can start, view, and interact with the app on meeting stage. <br><br> Attendee can only view and interact. | Presenter or  organizer can start, view, and interact with the app on meeting stage.<br><br> Attendee can only view and interact. | Presenter or  organizer can start, view, and interact with the app on meeting stage.<br><br> Attendee can only view and interact. |
| Guest | Presenter or  organizer can start, view, and interact with the app in the meeting stage.<br><br> Attendee can only view and interact. | Presenter or organizer can start, view, and interact with the app on meeting stage.<br><br> Attendee can only view and interact. |  Presenter or  organizer can start, view, and interact with the app on meeting stage.<br><br> Attendee can only view and interact. | Presenter or  organizer can start, view, and interact with the app on meeting stage.<br><br> Attendee can only view and interact. |
| Federated or External | Presenter can start, view, and interact with the app in the meeting stage.<br><br> Attendee can only view and interact. | Not available | Not available | Presenter can start, view, and interact with app on meeting stage.<br><br> Attendee can only view and interact. |
| Anonymous |Presenter can start, view, and interact with the app on meeting stage.<br><br> Attendee can only view and interact. | Not available | Not available | Not available |

## Code sample

|Sample name | Description | .NET| Node.js |
|----------------|-----------------|--------------|----------------|
|Meeting stage sample | This sample app shows a tab in meeting stage for collaboration. This sample also uses live share sdk for collaborative Stage View. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-stage-view/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-stage-view/nodejs) |
| In-meeting notification | Demonstrates how to implement in-meeting notifications using bot. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-notification/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-notification/nodejs) |
| In-meeting document signing | This sample app shows how to implement a document signing Teams app. Includes sharing specific app content to stage, Teams SSO, and user specific Stage View. | [View](https://github.com/officedev/microsoft-teams-samples/tree/main/samples/meetings-share-to-stage-signing/csharp) | NA |

## Step-by-step guide

Follow the [step-by-step guide](../sbs-inmeeting-document-signing.yml) to build an in-meeting document signing app.

## See also

* [Apps for Teams meetings](teams-apps-in-meetings.md)
* [Enable authentication using third-party OAuth provider](../tabs/how-to/authentication/auth-flow-tab.md)
* [Resource-specific consent for delegated permissions](../resources/schema/manifest-schema.md#authorizationpermissions)
* [Create deep links](../concepts/build-and-test/deep-links.md)
* [Meeting app APIs](meeting-apps-apis.md)
* [Custom Together Mode scenes](~/apps-in-teams-meetings/teams-together-mode.md)
* [Live Share SDK](teams-live-share-overview.md)
