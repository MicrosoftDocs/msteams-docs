---
title: Apps for Teams Meeting Stage
author: v-sdhakshina
description: Learn how to build apps for Teams meeting stage, share to stage APIs, and generate a deep link to share content to stage in meetings.
ms.topic: conceptual
ms.author: v-sdhakshina
ms.localizationpriority: medium
ms.date: 10/29/2024
---

# Build apps for Teams meeting stage

Microsoft Teams enhances meeting experiences by providing features that facilitate seamless collaboration and communication. The screen sharing function is a prime example, allowing users to present their entire screen, specific windows, or even whiteboard sessions. This capability is essential for effective presentations and collaborative work, as it ensures all participants can view and interact with the shared content, making virtual meetings more dynamic and engaging.

In addition to screen sharing, Microsoft Teams offers various tools designed to make virtual interactions more productive. These tools replicate the dynamics of in-person meetings, enabling users to work together efficiently, regardless of their physical location. Integrating these features in Teams empowers organizations to conduct more interactive and fruitful meetings, driving better teamwork and results.

[Share to Stage](#share-to-stage) and [Screen share content to meetings](#screen-share-content-to-meetings) are features that enhance the sharing experience in Teams. Share to Stage allows users to share an app to the meeting stage from the meeting side panel in an ongoing meeting. Screen share content to meetings enables users to share content to the meeting stage in Teams using the screen sharing architecture.

The following table lists the scenarios to use Screen share and Share to stage features:

| Feature | Share to stage | Screen share content to stage |
| --- | --- | --- |
| **Interaction Level** | Allows attendees to interact with the content. | View-only mode of the app or content.  |
| **Scenarios** | Collaborative experiences, such as whiteboarding. |  Coconsumption scenarios, such as reviewing dashboards in a scrum meeting.  |
| **Developer Effort** | Requires more effort. |Aims to reduce developer effort for bringing the app or content onto the meeting stage.  |
| **Implementation Logic** |  Suitable for smaller meetings. | Suitable for larger meetings or when only one user has a premium license. |

## Share to stage

Share to stage allows users to share an app to the meeting stage from the meeting side panel in an ongoing meeting. This sharing is interactive and collaborative in comparison to passive screen sharing.

To invoke share to stage, users can select the **Share to Stage** icon on the upper-right side of the meeting side panel. **Share to Stage** icon is native to Teams client and selecting it shares the entire app to the meeting stage.

### App manifest

To share an app to the meeting stage, you must configure the context and Resource-specific consent (RSC) permissions in the [app manifest](../resources/schema/manifest-schema.md):

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

### Advanced share to stage APIs

There are many scenarios where sharing the entire app to the meeting stage isn't as useful as sharing specific parts of the app:  

1. For a brainstorming or whiteboard app, a user might want to share a specific board in a meeting versus the entire app with all the boards.  

1. For a medical app, a doctor might want to share just the X-Ray on the screen with the patient versus sharing the entire app with all the patients records or results and so on.

1. A user might want to share content from a single content provider at a time (for example, YouTube) versus sharing an entire video catalog onto stage.

To help users in such scenarios, APIs in the Microsoft Teams JavaScript client library (TeamsJS) allow you to programmatically invoke share to stage for specific parts of the app from a button in the meeting side panel.

# [Desktop](#tab/desktop)

The following image shows the share to stage option in the Teams desktop client:

   :::image type="content" source="../assets/images/apps-in-meetings/shared-meeting-stage-edit-review-component.png" alt-text="Screenshot shows the share to meeting Stageview.":::

# [Mobile](#tab/mobile)

The following image shows the share to stage option in the Teams mobile client:

   :::image type="content" source="../assets/images/meeting-stage/meeting-share-to-stage-mobile.png" alt-text="Screenshot shows meeting Stageview of the app you shared to meeting in Teams mobile.":::

---

If you use an advanced share to stage API, you can customize the text on the button. Here are the guidelines for customization:
  
* Use **Share** and not **Present** or **Screenshare**, if your experience offers simple sharing of app content to the stage. This sets the right expectation for users as **Share** consistently means **Share to stage** in Teams meetings.
* Use more specific text to provide meaningful context of the scenario. For example, you can use text such as **Watch together** or **Play together** if your app offers videos or casual games.

Use the following APIs to share specific part of the app:

| Method| Description | Source |
|---|---|----|
| **Share app content to stage** | Share specific parts of the app to meeting stage from the meeting side panel in a meeting. | [TeamsJS library](/javascript/api/@microsoft/teams-js/meeting) |
| **Get app content stage sharing state** | Fetch information about app's sharing state on the meeting stage. | [TeamsJS library](/javascript/api/@microsoft/teams-js/meeting.iappcontentstagesharingstate) |
| **Get app content stage sharing capabilities** | Fetch the app's capabilities for sharing to the meeting stage. | [TeamsJS library](/javascript/api/@microsoft/teams-js/meeting.iappcontentstagesharingcapabilities) |

# [Share app content to stage](#tab/app-content)

The `shareAppContentToStage` API enables you to share specific parts of your app to the meeting stage. The API is available through the TeamsJS library.

The `validDomains` array must allow the `appContentUrl` inside manifest.json. Else, the API returns a 501 error.

The following code is an example of `shareAppContentToStage` API:

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

**Query parameter**

The following table includes the query parameters:

|Value|Type|Required|Description|
|---|---|----|---|
|`callback`| String | Yes | Callback contains two parameters, error and result. The *error* can contain either an error of type *SdkError* or null when share is successful. The *result* can contain either a true value if there's a successful share or null when the share fails. |
|`appContentURL`| String | Yes | The URL that is shared on to the stage. |
| `shareOptions`| Object | No | Defines additional sharing options.|
|`shareOptions.sharingProtocol` | Enum | No | The screen sharing protocol. The supported values are `Collaborative` and `ScreenShare`. Default is `Collaborative`.|

# [Get app content stage sharing state](#tab/get-app-content)

The `getAppContentStageSharingState` API enables you to fetch information about apps sharing on the meeting stage.

The following table is an example of `getAppContentStageSharingState` API:

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

**Query parameter**

The following table includes the query parameter:

|Value|Type|Required|Description|
|---|---|----|---|
|**callback**| String | Yes | Callback contains two parameters, error and result. The *error* can contain either an error of type *SdkError* if there's an error or null when share is successful. The *result* can contain either an `IAppContentStageSharingState` object when share is successful or null if there's an error.|

# [Get app content stage sharing capabilities](#tab/get-app-content-capabilities)

The `getAppContentStageSharingCapabilities` API enables you to fetch the app's capabilities for sharing the app content to meeting stage. Apps need to call the `getAppContentStageSharingCapabilities` API to either enable or disable the custom share to stage button for a meeting participant in the meeting side panel. The share to stage button must be disabled or hidden if a meeting participant doesn't have permission to share the app content to meeting stage.

The app sharing capabilities depend on the tenant user type and participant roles in a meeting.

* **User type**: In-tenant, guest, and external user type participants can share the app to stage and also see and interact with the app being shared on stage. Anonymous user can't see, share, or interact with the app that is being shared on the stage. For more information, see [user types in a meeting.](~/apps-in-teams-meetings/teams-apps-in-meetings.md#user-types-in-teams)

* **User roles**: Participants with presenter and organizer user roles in a meeting can share the app to stage. The share to stage button and ability to share the app to stage isn't enabled for the Attendee. For more information, see [user roles in Teams meeting.](~/apps-in-teams-meetings/teams-apps-in-meetings.md#user-roles-in-teams-meeting)

The following code is an example of `getAppContentStageSharingCapabilities` API:

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

**Query parameter**

The following table includes the query parameter:

|Value|Type|Required|Description|
|---|---|----|---|
|**callback**| String | Yes | Callback contains two parameters, error and result. The *error* can contain either an error of type *SdkError* or null when share is successful. The result can contain either an `IAppContentStageSharingCapabilities` object, when share is successful or null when there's an error.|

---

## Screen share content to meetings

> [!NOTE]
>
> * Only In-tenant or guest and external users with presenter or organizer role can initiate a sharing session.
> * Share to stage using screen share isn't supported on Mac, mobile, web, and VDI Teams clients.
> * In Teams, you can't share your screen and share to the stage at the same time.

Users can screen share content to the meeting Stage in Teams using the screen sharing architecture. When a user shares an app to the meeting stage, the app is rendered only on the presenter’s device and then the screen is shared or mirrored to all other attendees in a new window. After the app content is shared in a meeting, all the participants can view the content, but only the presenter has the ability to interact with the content, which provides a multi-player viewing experience.

:::image type="content" source="../assets/images/meeting-stage/screen-share-meeting-stage.png" alt-text="Screenshot shows an example of the meeting stage view for the presenter in the left and for the audience in the right." lightbox="../assets/images/meeting-stage/screen-share-meeting-stage.png":::

Screen share content to the meeting Stage simplifies app content sharing during meetings and provides a seamless multi-player viewing experience. Let's explore the use cases of the feature:

|For Developers |For Users  |
|---------|---------|
|**Coordinated Content Presentation**: You can now showcase coordinated content to multiple participants on a larger stage, moving beyond the fixed-width Side Panel. This expanded visibility attracts more attention and integrates closely with the meeting lifecycle.     | **Contextual Tool Usage**: Users can seamlessly use their favorite tools within the ongoing communication context. This minimizes context switching and enhances meeting outcomes.        |
|**Out-of-the-Box App Sharing**: Basic sharing of the entire app is available out-of-the-box, requiring no additional investment from you. This streamlined approach simplifies the content sharing process.     | **Inline Content Display**: Content appears inline within the meeting window, ensuring easy access for all participants. No need to navigate away from the conversation.        |
|**Enhanced APIs for Specific Content Sharing**: Existing Share to Stage APIs are enhanced to enable sharing of specific content via the Screen Sharing protocol. You can now tailor content sharing to meet specific use cases.     |**Sharing Button on Meeting Side Panels**: Users with these roles can initiate content sharing directly from the meeting side panels. This empowers presenters to engage with the audience effectively.          |
|**Deep Link and "Share in Meeting" Button Support**: Use the Screen Sharing protocol to share content via deep links or by using the "Share in Meeting" button. This flexibility ensures a seamless experience for users.     |  Participants can start sharing content through a deep link or by using the "Share in Meeting" button. Both options are exposed by you, allowing for a seamless experience.       |

Users can screen share content to the meeting stage in the following scenarios:

* **Share entire app**: When you share a tab to the Meeting Stage in a Teams meeting, the `contentUrl` associated with the tab is poped-out a new window for the app and screen shares that window with all other meeting participants. The `page.frameContext` property in the `getContext` object is set to `meetingStage` to signal the app that it's being presented on a large surface, allowing the app to update its content appropriately.

  > [!NOTE]
  > Apps that specify `MeetingStage` in the `page.frameContext` property of the `getContext` object in the manifest and declare `MeetingStage.Write.Chat` permissions support collaborative Share to Stage infrastructure. The share button initiates the existing collaborative protocol instead of the screen sharing protocol.

* **Share specific parts of your app to the meeting stage**: Specify the appropriate sharing protocol along with the `appContentURL`.

The following code is an example of sharing app content to meeting stage view and share content in view only screen sharing mode:

# [Share app content](#tab/share-app-content)

```typescript
   // Share the content to meeting stage view.
    const shareSpecificAppContent = (partName) => {
        var appContentUrl = "";
        microsoftTeams.app.getContext().then((context) => {
            appContentUrl = partName == 'todo' ? `${window.location.origin}/todoView?meetingId=${context.meeting.id}` : partName == 'doing' ? `${window.location.origin}/doingView?meetingId=${context.meeting.id}` : `${window.location.origin}/doneView?meetingId=${context.meeting.id}`;
            microsoftTeams.meeting.shareAppContentToStage((err, result) => {
                if (result) {
                    // handle success
                    console.log(result);
                }

                if (err) {
                    // handle error
                    alert(JSON.stringify(err))
                }
            }, appContentUrl);
        });
    };
```

# [View-only screen share](#tab/screen-share-content)

```javascript
  // Share the content in view-only screen sharing mode.
      const shareSpecificAppContentScreenShare = (partName) => {
          var appContentUrl = "";
          microsoftTeams.app.getContext().then((context) => {
              appContentUrl = partName == 'todo' ? `${window.location.origin}/todoView?meetingId=${context.meeting.id}` : partName == 'doing' ? `${window.location.origin}/doingView?meetingId=${context.meeting.id}` : `${window.location.origin}/doneView?meetingId=${context.meeting.id}`;
              microsoftTeams.meeting.shareAppContentToStage((err, result) => {
                  if (result) {
                      // handle success
                      console.log(result);
                  }

                  if (err) {
                      // handle error
                      alert(JSON.stringify(err))
                  }
              }, appContentUrl,
                  // Optional shareOptions with sharingProtocol set to ScreenShare
                  {
                      sharingProtocol: microsoftTeams.meeting.SharingProtocol.ScreenShare
                  });
          });
      };
```

 ---

  | Value | Type | Required | Description |
  | --- | --- | --- | --- |
  |`callback` | String | Yes| Callback contains two parameters, error and result. The error can contain either an error of type SdkError or null when share is successful. The result can contain either a true value if there's a successful share or null when the share fails.|
  |`appContentURL`| String |Yes |The URL that is shared on to the stage.|
  | `shareOptions`| Object | No | Defines additional sharing options.|
  |`shareOptions.sharingProtocol` | Enum | No | The screen sharing protocol. The supported values are `Collaborative` and `ScreenShare`. Default is `Collaborative`.|

  For more information on parameters, see [shareAppContentToStage](/javascript/api/%40microsoft/teams-js/meeting?#@microsoft-teams-js-meeting-shareappcontenttostage).

  > [!NOTE]
  > If the value for the `sharingProtocol` property is set as `screenShare`, you don't need to set `MeetingStage` in the `getContext` object of the manifest. Resource-Specific Consent (RSC) permissions are required in the app manifest for the `shareAppContentToStage` API, regardless of the `sharingProtocol` value used.

### Scenarios

|Scenario|Example|
|-------------|--------------|
|Sales enablement app| Phoebe, a sales rep for Contoso, pins the Sales enablement app to his upcoming meeting with Nicolette, the VP of HR at NorthWest. During the meeting, Phoebe opens the Sales enablement app side panel and sees a list of precurated content that he can share in the meeting to aid his sales pitch. Nicolette can consume the content on her Teams meeting window and ask questions based on the content shown.|
|Contoso Cloud Board| Demet, a technical program manager at Contoso, helps run the daily scrum meetings of various teams in the organization. For each scrum, he pins the pod-relevant board as a tab to the standup meeting. During the meeting, he opens the side panel of the Contoso app and selects the Share button provided within the side panel. This allows the board to take over the meeting stage for all participants such that everyone views the same board. As each member shares their updates, Demet makes appropriate changes in the sprint board, which is then reflected for all other attendees.|

### Advantages

* You can show coordinated content to multiple participants over a larger stage, getting more attention, and integrating more closely with the meeting lifecycle.
* Basic sharing for the entire app is available without additional investment.
* Users can use their favorite tools within the context of their ongoing communication, improving meeting outcomes.
* Content is displayed inline within the meeting window.
* A sharing button is available on all meeting side panels for users with organizer or presenter roles.
* Users can initiate sharing through a deep link or the Share in Meeting button.

## Get app content in meeting side panel

The `sharing.history.getContent` API enables you to fetch the content shared in a meeting and display in the meeting side panel.

When a meeting begins, the app, in which the content is shared, automatically opens the meeting side panel for the user who shared the content. You can call the `sharing.history.getContent` API to fetch a list of shared content and display it in the side panel, making it readily accessible. For an upcoming recurring meeting, where the app is already added, developers can call the API to get the latest content to be displayed in the app's side panel.

The following code is an example to fetch shared content in the meeting side panel:

```javascript
// Define an async function
async function fetchContentDetails() {
    // Fetches a list of content details that was shared in the meeting
    const contentDetails = await microsoftTeams.sharing.history.getContent();

    // Above content details can be used to hydrate the meeting side panel 
    // to share to meeting stage

}
```

**Response payload parameters**

The following table includes the response payload parameters:

| Value | Type | Required | Description |
|---|---|----|---|
| `appId` | String | Yes | The ID of the app to be shared. |
| `title` | String | Yes | The title of the shared content. |
| `contentReference` | String | Yes | The content reference link of the shared content. |
| `threadId` | String | Yes | The conversation ID where the content was shared. |
| `author` | String | Yes | The ID of the user who shared the content. |
| `contentType` | String | Yes | The type of content shared. For sharing to Teams stage scenarios, this value must be `ShareToStage`. |

**Response codes**

The following table provides the response codes:

| Response code | Description |
|---|---|
| **200** | Meeting content details successfully retrieved. |
| **500** | Internal error. |
| **501** | API isn't supported in the current context.|

For more information, see [sharing.history.getContent](/javascript/api/@microsoft/teams-js/sharing.history).

## Build an in-meeting document signing app

You can build an in-meeting app for enabling meeting participants to sign documents in real time. It facilitates reviewing and signing documents in a single session. The participants can sign the documents using their current tenant identity.

You can use an in-meeting signing app to:

* Add documents to be reviewed during a meeting.
* Share documents to be reviewed to main stage.
* Sign documents using the signer’s identity.

The participants can review and sign documents, such as purchase agreements and purchase orders.

:::image type="content" source="../assets/images/sbs-inmeeting-doc-signing/final-output.png" alt-text="Screenshot shows an in-meeting document signing app":::

The following participant roles might be involved during the meeting:

* **Document creator**: This role can add their own documents to be reviewed and signed.
* **Signer**: This role can sign reviewed documents.
* **Reader**: This role can view the documents added to the meeting.

## Code sample

|Sample name | Description | .NET| Node.js | Manifest |
|----------------|-----------------|--------------|----------------|----------------|
|Meeting stage sample | This sample app shows a tab in meeting stage for collaboration. This sample also uses Live Share SDK for collaborative Stageview. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-stage-view/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-stage-view/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-stage-view/csharp/demo-manifest) |
| In-meeting notification | Demonstrates how to implement in-meeting notifications using bot. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-notification/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-notification/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-notification/csharp/demo-manifest) |
| In-meeting document signing | This sample app shows how to implement a document signing Teams app. Includes sharing specific app content to stage, Teams single sign-on (SSO), and user specific Stageview. | [View](https://github.com/officedev/microsoft-teams-samples/tree/main/samples/meetings-share-to-stage-signing/csharp) | NA | NA |
|Screen share content to stage| This sample app shows how screen share content to the meeting Stage in Teams using the screen sharing architecture.| [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-stage-view/csharp)|NA|NA|

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
