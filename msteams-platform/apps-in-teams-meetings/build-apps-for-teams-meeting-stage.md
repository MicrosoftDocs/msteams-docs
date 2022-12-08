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

To help users in such scenarios, we released APIs within the Teams Client SDK that allows you to programmatically invoke share to stage for specific parts of the app from a button in the meeting side panel.

:::image type="content" source="../assets/images/apps-in-meetings/shared-meeting-stage-edit-review-component.png" alt-text="The screenshot shows the share to meeting stage view.":::

Use the following APIs to share specific part of the app:

|Method| Description| Source|
|---|---|----|
|[**Share app content to stage**](#share-app-content-to-stage-api)| Share specific parts of the app to meeting stage from the meeting side panel in a meeting. | [Microsoft Teams JavaScript library SDK](/javascript/api/@microsoft/teams-js/meeting) |
|[**Get app content stage sharing state**](#get-app-content-stage-sharing-state-api)| Fetch information about app's sharing state on the meeting stage. | [Microsoft Teams JavaScript library SDK](/javascript/api/@microsoft/teams-js/meeting.iappcontentstagesharingstate) |
|[**Get app content stage sharing capabilities**](#get-app-content-stage-sharing-capabilities-api)| Fetch the app's capabilities for sharing to the meeting stage. | [Microsoft Teams JavaScript library SDK](/javascript/api/@microsoft/teams-js/meeting.iappcontentstagesharingcapabilities) |

## Share app content to stage API

The `shareAppContentToStage` API enables you to share specific parts of your app to the meeting stage. The API is available through the Teams client SDK.

### Prerequisite

`appContentUrl` must be allowed by `validDomains` array inside manifest.json, else the API returns a 501 error.

### Query parameter

The following table includes the query parameters:

|Value|Type|Required|Description|
|---|---|----|---|
|**callback**| String | Yes | Callback contains two parameters, error and result. The *error* can either contain an error of type *SdkError* or null when share is successful. The *result* can either contain a true value if there's a successful share or null when the share fails. |
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
|**callback**| String | Yes | Callback contains two parameters, error and result. The *error* can either contain an error of type *SdkError* in case of an error or null when share is successful. The *result* can either contain an `IAppContentStageSharingState` object when share is successful or null in case of an error.|

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

The app sharing capabilities depends on the tenant user type and participant roles in a meeting.

* **User type**: In-tenant, guest, and external user type participants can share the app to stage and also see and interact with the app being shared on stage. Anonymous user can't see, share, or interact with the app that is being shared on the stage. For more information, see [user types in a meeting.](~/apps-in-teams-meetings/teams-apps-in-meetings.md#user-types-in-teams)

* **User roles**: Participants with presenter and organizer user roles in a meeting can share the app to stage. Attendee won't have the share to stage button enabled and ability to share the app to stage. For more information, see [user roles in Teams meeting.](~/apps-in-teams-meetings/teams-apps-in-meetings.md#user-roles-in-teams-meeting)

### Query parameter

The following table includes the query parameter:

|Value|Type|Required|Description|
|---|---|----|---|
|**callback**| String | Yes | Callback contains two parameters, error and result. The *error* can either contain an error of type *SdkError* or null when share is successful. The result can either contain an `IAppContentStageSharingCapabilities` object, when share is successful or null in case of an error.|

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

* Add documents to be reviewed during a meeting
* Share documents to be reviewed to main stage
* Sign documents using the signer’s identity

The participants can review and sign documents, such as purchase agreements and purchase orders.

:::image type="content" source="../assets/images/sbs-inmeeting-doc-signing/final-output.png" alt-text="In-meeting document signing app":::

The following participant roles may be involved during the meeting:

* **Document creator**: This role can add their own documents to be reviewed and signed.
* **Signer**: This role can sign reviewed documents.
* **Reader**: This role can view the documents added to the meeting.

## Code sample

|Sample name | Description | C# | Node.js |
|----------------|-----------------|--------------|----------------|
|Meeting stage sample | Sample app to show a tab in meeting stage for collaboration. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-stage-view/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-stage-view/nodejs) |
| In-meeting notification | Demonstrates how to implement in-meeting notification using bot. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-content-bubble/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-content-bubble/nodejs) |
| In-meeting document signing | Demonstrates how to implement a document signing Teams app. Includes sharing specific app content to stage, Teams SSO, and user specific stage view. | [View](https://github.com/officedev/microsoft-teams-samples/tree/main/samples/meetings-share-to-stage-signing/csharp) | NA |

## Reaction API

The Reaction API allows you to show reactions in your app. The types of reactions include like, heart, laugh, applause, and surprised.

### User scenarios

| Scenario  | Example  |
|---------|---------|
|Avatar   | You can show an animation of the Avatar displaying the reaction.|
|Mesh     | Participants in a Teams meeting can send reaction form the U-bar and an animation of the reaction is shown in the mesh app .|

### App manifest settings for Reaction API

To use the reaction API, you must configure RSC permissions in the app manifest. Configure the `authorization` property, and the `name` and `type` in the `resourceSpecific` field as follows:

```JSON
"authorization": {
 "permissions": {
  "resourceSpecific": [
   {
    "name": "MeetingParticipantReaction.Read.Chat",
    "type": "Delegated"
   },
   {
    "name": "MeetingParticipantReaction.Read.Group",
    "type": "Delegated"
   }
  ]
 }
}
```

### Enable the reaction API in your app

* Call the `registerMeetingReactionReceivedHandler` function.

* Provide a callback that accepts a meetingReactionType and an error object. Ensure to check for errors before you call raiseHandState.

The following is an example of `registerMeetingReactionReceivedHandler`:

```typescript
microsoftTeams.meeting.registerMeetingReactionReceivedHandler ( 

          meetingReactionReceivedEvent => { 

            if (meetingReactionReceivedEvent.error) { 

              // handle error 

              setApiResult( 

                `error: ${JSON.stringify(meetingReactionReceivedEvent.error)}` 

              ); 

            } 

            setApiResult( 

              `received reaction type: ${JSON.stringify( 

                meetingReactionReceivedEvent.meetingReactionType 

              )}` 

            ); 

            setShowOutput(true); 

          } 

      ); 
```

## Raise hand API

The Raise hand API allows yan app to show if the user has raised hand during the meeting.

### User scenarios

| Scenario  | Example  |
|---------|---------|
|Avatar   | You can show an animation of the Avatar displaying the reaction.|
|Mesh     | Participants in a Teams meeting can send reaction form the U-bar and an animation of the reaction is shown in the mesh app .|
|Games    | You can use the raise hand as a form of submission in games such as Trivia or Kahoot.|

### App manifest settings for Raise hand API

To use the raise hand API, you must configure RSC permissions in the app manifest. Configure the `authorization` property, and the `name` and `type` in the `resourceSpecific` field as follows:

```JSON
"authorization": {
 "permissions": {
  "resourceSpecific": [
   {
    "name": "MeetingParticipantReaction.Read.Chat",
    "type": "Delegated"
   },
   {
    "name": "MeetingParticipantReaction.Read.Group",
    "type": "Delegated"
   }
  ]
 }
}
```

### Enable the raise hand API in your app

* Call the `registerRaiseHandStateChangeHandler` function.

* Provide a callback that accepts a raiseHandState and an error object. Ensure to check for errors before you call raiseHandState.

Following is an example of the `registerRaiseHandStateChangeHandler`:

```typescript
microsoftTeams.meeting.registerRaiseHandStateChangedHandler( 

          eventData => { 

            if (eventData.error) { 

              // handle error 

              setApiResult( 

                `error: ${JSON.stringify(eventData.error)}` 

              ); 

            } 

            setApiResult( 

              `raiseHandState: ${JSON.stringify( 

                eventData.raiseHandState 

              )}` 

            ); 

          } 

      ); 
```

## Step-by-step guide

Follow the [step-by-step guide](../sbs-inmeeting-document-signing.yml) to build an in-meeting document signing app.

## See also

* [Teams authentication flow for tabs](../tabs/how-to/authentication/auth-flow-tab.md)
* [Apps for Teams meetings](teams-apps-in-meetings.md)
* [Build tabs for meeting](build-tabs-for-meeting.md)
* [Build extensible conversation for meeting chat](build-extensible-conversation-for-meeting-chat.md)
* [Build apps for anonymous users](build-apps-for-anonymous-user.md)
* [Advanced meeting APIs](meeting-apps-apis.md)
* [Custom Together Mode scenes](~/apps-in-teams-meetings/teams-together-mode.md)
* [Live Share SDK](teams-live-share-overview.md)
