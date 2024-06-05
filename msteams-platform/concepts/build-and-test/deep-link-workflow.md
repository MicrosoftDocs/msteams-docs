---
title: Deep link to a workflow in Teams
author: v-npaladugu
description: Learn how to create deep links to a specific task in Microsoft Teams and navigate using them in your Teams.
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
ms.date: 01/31/2023
---

# Deep link to a workflow in Teams

You can create a deep link to perform a specific task in Teams, such as to create a new chat, open a scheduling dialog, and navigate to audio-video call.

In this article, you’ll learn to create a deep link:

* [To start a new chat](#deep-link-to-start-a-new-chat)
* [To open a meeting scheduling dialog](#deep-link-to-open-a-meeting-scheduling-dialog)
* [To start an audio-video call](#deep-link-to-start-an-audio-video-call-with-users)
* [To share content to stage in meetings](#generate-a-deep-link-to-share-content-to-stage-in-meetings)
* [To meeting side panel](#deep-link-to-meeting-side-panel)
* [To join a meeting](#deep-link-to-join-a-meeting)

## Deep link to start a new chat

Applications can start a new chat with a list of users and provide additional information such as chat name and draft message by using the following format:

`https://teams.microsoft.com/l/chat/0/0?users=<user1>,<user2>,...&topicName=<chat name>&message=<precanned text>`

Example: `https://teams.microsoft.com/l/chat/0/0?users=joe@contoso.com,bob@contoso.com&topicName=Prep%20For%20Meeting%20Tomorrow&message=Hi%20folks%2C%20kicking%20off%20a%20chat%20about%20our%20meeting%20tomorrow`

The query parameters are:

* `users`: The comma-separated list of user IDs representing the participants of the chat. The user that performs the action is always included as a participant. Currently, the User ID field supports the Microsoft Entra UserPrincipalName, such as an email address only.
* `topicName`: An optional field for chat's display name if a chat has three or more users. If this field isn't specified, the chat's display name is based on the names of the participants.
* `message`: An optional field for the message text that you want to insert into the current user's compose box while the chat is in a draft state.

To use this deep link with your bot, specify the deep link as the URL target in your card's button or tap action through the `openUrl` action type. Apps can also use Teams JavaScript client library (TeamsJS) v.2.0 or later to create this without having to manually prepare the deep link. The following example uses TeamsJS to check if chat capability is supported:

```javascript
if(chat.isSupported()) {
    const chatPromise = chat.openGroupChat({ users: ["joe@contoso.com","bob@contoso.com"], topic: "Prep For Meeting Tomorrow", message: "Hi folks kicking off chat about our meeting tomorrow"});
    chatPromise.
      then((result) => {/*Successful operation*/}).
      catch((error) => {/*Unsuccessful operation*/});
}
else { /* handle case where capability isn't supported */ }
```

> [!NOTE]
> If a chat already exists deep link opens in that chat.

## Deep link to open a meeting scheduling dialog

You can create deep link in your Teams apps to open a meeting scheduling dialog and provide information, such as meeting title and participants using the following methods:

* [Configure deep link manually to open a meeting scheduling dialog](#configure-deep-link-manually-to-open-a-meeting-scheduling-dialog)
* [Configure deep link using TeamsJS library to open a meeting scheduling dialog](#configure-deep-link-using-teamsjs-library-to-open-a-meeting-scheduling-dialog)

While we recommend the use of typed APIs of TeamsJS, it's possible to manually create deep links to the Teams built-in scheduling dialog.

#### Configure deep link manually to open a meeting scheduling dialog

Use the following format for configuring a deep link that you can use in a bot, connector, or message extension card:

`https://teams.microsoft.com/l/meeting/new?subject=<meeting subject>&startTime=<date>&endTime=<date>&content=<content>&attendees=<user1>,<user2>,<user3>,...`

> [!NOTE]
> The search parameters don't support `+` signal in place of whitespace (``). Ensure your URI encoding code returns `%20` for spaces. For example, `?subject=test%20subject` is good, but `?subject=test+subject` is bad.

The query parameters are:

* `attendees`: An optional comma-separated list of user IDs representing the attendees of the meeting. The user performing the action is the meeting organizer. The user ID field supports only the Microsoft Entra `UserPrincipalName`, typically an email address.
* `startTime`: The optional parameter for start time of the event. Start time should be in [long ISO 8601 format](https://en.wikipedia.org/wiki/ISO_8601), for example *2018-03-12T23:55:25+02:00*.
* `endTime`: An optional parameter for end time of the event, also in ISO 8601 format.
* `subject`: An optional parameter for the meeting subject.
* `content`: An optional parameter for the meeting details field.

> [!NOTE]
> You can't specify the location as it isn't supported. You must specify the UTC offset, which includes time zones, when generating the start and end times.

To use this deep link with your bot, you can specify the deep link as the URL target in your card's button or as a tap action through the `openUrl` action type.

Example: `https://teams.microsoft.com/l/meeting/new?subject=test%20subject&attendees=joe@contoso.com,bob@contoso.com&startTime=10%2F24%2F2018%2010%3A30%3A00&endTime=10%2F24%2F2018%2010%3A30%3A00&content=​​​​​​​test%3Acontent​​​​​​​​​​​​​​`

#### Configure deep link using TeamsJS library to open a meeting scheduling dialog

You can also use TeamsJS v.2.0 or later in your Teams app to open the meeting scheduling dialog without having to manually prepare the link. In order to open the scheduling dialog in Teams, you must continue using the original deep-link URL based method, as Teams doesn't support the calendar capability yet:

# [TeamsJS v2](#tab/teamsjs-v2)

```javascript
// Open a scheduling dialog from your tab
if(calendar.isSupported()) {
   const calendarPromise = calendar.composeMeeting({
      attendees: ["joe@contoso.com", "bob@contoso.com"],
      content: "test content",
      endTime: "2018-10-24T10:30:00-07:00",
      startTime: "2018-10-24T10:00:00-07:00",
      subject: "test subject"});
   calendarPromise.
      then((result) => {/*Successful operation*/}).
      catch((error) => {/*Unsuccessful operation*/});
}
else { /* handle case where capability isn't supported */ }
```

# [TeamsJS v1](#tab/teamsjs-v1)

```javascript
// Open a scheduling dialog from your tab
microsoftTeams.executeDeepLink("https://teams.microsoft.com/l/meeting/new?subject=test%20subject&attendees=joe@contoso.com,bob@contoso.com&startTime=10%2F24%2F2018%2010%3A30%3A00&endTime=10%2F24%2F2018%2010%3A30%3A00&content=​​​​​​​test%3Acontent​​​​​​​​​​​​​​");
```

---

For more information about working with the calendar, see [calendar](/javascript/api/@microsoft/teams-js/calendar?view=msteams-client-js-latest&preserve-view=true) namespace in the API reference documentation.

## Deep link to start an audio-video call with users

You can configure your Teams apps to prepare a deep link for users to start one-on-one call, a group call, or video call. You can invoke audio only or audio-video calls to a single user or a group of users by specifying the call type and the participants. Before Teams places the call, the client prompts for a confirmation. If there's a group call, you can call a set of VoIP and PSTN users in the same deep link invocation.

In a video call, the Teams client asks for confirmation before turning on the caller's video for the call. The receiver of the call has a choice to respond through audio only or audio and video, through the Teams call notification window.

> [!NOTE]
> This method can't be used for invoking a meeting.

You can configure deep links in one of the following two ways:

* [Configure deep link manually to start audio-video call with users](#configure-deep-link-manually-to-start-audio-video-call-with-users)
* [Configure deep link using TeamsJS library to start audio-video call with users](#configure-deep-link-using-teamsjs-library-to-start-audio-video-call-with-users)

#### Configure deep link manually to start audio-video call with users

While we recommend the use of the typed APIs of TeamsJS v.2.0 or later, you can also use a manually configured deep link to start a call. Refer to the following formats:

| Deep link | Format | Example |
| --- | --- | --- |
| Make an audio call | `https://teams.microsoft.com/l/call/0/0?users=<user1>,<user2>` | `https://teams.microsoft.com/l/call/0/0?users=joe@contoso.com` |
| Make an audio and video call | `https://teams.microsoft.com/l/call/0/0?users=<user1>,<user2>&withVideo=true` | `https://teams.microsoft.com/l/call/0/0?users=joe@contoso.com&withVideo=true` |
| Make an audio and video call with an optional parameter source | `https://teams.microsoft.com/l/call/0/0?users=<user1>,<user2>&withVideo=true&source=demoApp` | `https://teams.microsoft.com/l/call/0/0?users=joe@contoso.com&withVideo=true&source=demoApp` |
| Make an audio and video call to a combination of VoIP and PSTN users | `https://teams.microsoft.com/l/call/0/0?users=<user1>,4:<phonenumber>` | `https://teams.microsoft.com/l/call/0/0?users=joe@contoso.com,4:9876543210` |
  
Following are the query parameters:

* `users`: A comma-separated list of user IDs representing the participants of the call. The user ID field supports the Microsoft Entra `UserPrincipalName`, typically an email address, or in a PSTN call, it supports a PSTN MRI 4:&lt;phonenumber&gt;.
* `withVideo`: An optional parameter, which you can use to make a video call. Setting this parameter only turns on the caller's camera. The receiver of the call has a choice to answer through an audio or an audio and video call through the Teams call notification window.

#### Configure deep link using TeamsJS library to start audio-video call with users

Applications can also use TeamsJS v.2.0 or later to start calls without having to manually prepare these deep links.
The following code demonstrates using TeamsJS to start a call:

```javascript
if(call.isSupported()) {
    const callPromise = call.startCall({ targets: ["joe@contoso.com","bob@contoso.com","4:9876543210"], requestedModalities: [call.CallModalities.Audio], source: "demoApp"});
    callPromise.
      then((result) => {/*Successful operation*/}).
      catch((error) => {/*Unsuccessful operation*/});
}
else { /* handle case where capability isn't supported */ }

```

## Generate a deep link to share content to stage in meetings

You can generate a deep link to [share the app to stage](~/apps-in-teams-meetings/enable-and-configure-your-app-for-teams-meetings.md#share-entire-app-to-stage) and to start or join a meeting.

For deep links to share content to stage, see [deep link to share content to stage in meetings](~/concepts/build-and-test/share-in-meeting.md#generate-a-deep-link-to-share-content-to-stage-in-meetings).

## Deep link to meeting side panel

You can generate a deep link to the [meeting side panel](~/apps-in-teams-meetings/build-tabs-for-meeting.md#deep-link-to-meeting-side-panel) in a meeting. Use the following format for a deep link to the meeting side panel:

`https://teams.microsoft.com/l/entity/<appId>/<entityId>?webUrl=<entityWebUrl>&label=<entityLabel>&context=<context>`.

Example:

`https://teams.microsoft.com/l/entity/fe4a8eba-2a31-4737-8e33-e5fae6fee194/tasklist123?webUrl=https://tasklist.example.com/123/456&label=Task 456&context={"chatId": "17:b42de192376346a7906a7dd5cb84b673@thread.v2","contextType":"chat"}`

By default, a deep link opens in a meeting side panel. To open a deep link directly in an app rather than the meeting side panel, add `openInMeeting=false` in the deep link format:

`https://teams.microsoft.com/l/entity/<appId>/<entityId>?webUrl=<entityWebUrl>&label=<entityLabel>&context=<context>&openInMeeting=false`

For more information, see [deep link to a tab](~/concepts/build-and-test/deep-link-application.md#configure-deep-link-to-browse-within-your-app-manually).

Deep link doesn't open in the meeting side panel in the following scenarios:

* There's no active meeting.
* The app doesn't have `sidePanel` context declared in the app manifest.
* `openInMeeting` is set to `false` in the deep link.
* The deep link is selected outside of the meeting window or component.
* The deep link doesn't match the current meeting, such as a deep link created in another meeting.

## Deep link to join a meeting

Teams app can read the URL for joining a meeting URL through Graph APIs. This deep link brings up the UI for the user to join the meeting. For more information, see [Get `onlineMeeting`](/graph/api/onlinemeeting-get#response-1) and [Get meeting details](~/apps-in-teams-meetings/meeting-apps-apis.md#get-meeting-details-api).

## Code sample

| Sample name | Description | .NET |Node.js|
|-------------|-------------|------|----|
|Deep link consuming Subentity ID | This sample shows how to use a deep link from a bot chat to a tab consuming the Subentity ID. It also shows deep links for:<br>- Navigating to an app<br>- Navigating to a chat<br>- Open a profile dialog<br>- Open a scheduling dialog | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-deeplink/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-deeplink/nodejs) |
