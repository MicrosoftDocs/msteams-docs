---
title: Deep link to a workflow in Teams
author: v-npaladugu
description: Learn how to create deep links to a specific task in Microsoft Teams and navigate using them in your Teams.
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
---

# Deep link to a workflow in Teams

You can create a deep link to perform a specific task in Teams, such as to open a scheduling dialog, or navigate to audio-video call.

## Deep link to open a meeting scheduling dialog

You can create deep link in your Teams apps to open a meeting scheduling dialog and provide information, such as meeting title and participants. To do this, use one of the following methods:

* [Configure deep link manually to open a meeting scheduling dialog](#configure-deep-link-manually-to-open-a-meeting-scheduling-dialog)
* [Configure deep link using TeamsJS library to open a meeting scheduling dialog](#configure-deep-link-using-teamsjs-library-to-open-a-meeting-scheduling-dialog)

While it's recommended to use the typed APIs of TeamsJS, it's possible to manually create deep links to the Teams built-in scheduling dialog.

#### Configure deep link manually to open a meeting scheduling dialog

Use the following format for configuring a deep link that you can use in a bot, connector, or message extension card:

`https://teams.microsoft.com/l/meeting/new?subject=<meeting subject>&startTime=<date>&endTime=<date>&content=<content>&attendees=<user1>,<user2>,<user3>,...`

> [!NOTE]
> The search parameters don't support `+` signal in place of whitespace (``). Ensure your URI encoding code returns `%20` for spaces. For example, `?subject=test%20subject` is good, but `?subject=test+subject` is bad.

The query parameters are:

* `attendees`: An optional comma-separated list of user IDs representing the attendees of the meeting. The user performing the action is the meeting organizer. Currently, the user ID field supports only the Azure AD UserPrincipalName, typically an email address.
* `startTime`: The optional parameter for start time of the event. Start time should be in [long ISO 8601 format](https://en.wikipedia.org/wiki/ISO_8601), for example *2018-03-12T23:55:25+02:00*.
* `endTime`: An optional parameter for end time of the event, also in ISO 8601 format.
* `subject`: An optional parameter for the meeting subject.
* `content`: An optional parameter for the meeting details field.

> [!NOTE]
> You can't specify the location as it isn't supported. You must specify the UTC offset. Which includes time zones, when generating the start and end times.

To use this deep link with your bot, you can specify the deep link as the URL target in your card's button or as a tap action through the `openUrl` action type.

Example: `https://teams.microsoft.com/l/meeting/new?subject=test%20subject&attendees=joe@contoso.com,bob@contoso.com&startTime=10%2F24%2F2018%2010%3A30%3A00&endTime=10%2F24%2F2018%2010%3A30%3A00&content=​​​​​​​test%3Acontent​​​​​​​​​​​​​​`

#### Configure deep link using TeamsJS library to open a meeting scheduling dialog

You can also use TeamsJS library 2.0 in your Teams app to open the meeting scheduling dialog without having to manually prepare the link. Refer to the following code sample, in order to open the scheduling dialog in Teams, you need to continue using the original deep-link URL based method, since Teams doesn't support the calendar capability yet:

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

You can configure your Teams apps to prepare a deep link for users to start one-on-one call or a group audio or video call. You can invoke audio only or audio-video calls to a single user or a group of users by specifying the call type and the participants. Before placing the call, Teams client prompts a confirmation to make the call. If there's a group call, you can call a set of VoIP users and a set of PSTN users in the same deep link invocation.

In a video call, the Teams client asks for confirmation and turns on the caller's video for the call. The receiver of the call has a choice to respond through audio only or audio and video, through the Teams call notification window.

> [!NOTE]
> This method cannot be used for invoking a meeting.

You can configure deep links in one of the following two ways:

* [Configure deep link manually to start audio-video call with users](#configure-deep-link-manually-to-start-audio-video-call-with-users)
* [Configure deep link using TeamsJS library to start audio-video call with users](#configure-deep-link-using-teamsjs-library-to-start-audio-video-call-with-users)

#### Configure deep link manually to start audio-video call with users

While the use of the typed APIs of TeamsJS library is recommended, you can also use a manually configured deep link to start a call. Refer to the following formats:

| Deep link | Format | Example |
|-----------|--------|---------|
| Make an audio call | `https://teams.microsoft.com/l/call/0/0?users=<user1>,<user2>` | `https://teams.microsoft.com/l/call/0/0?users=joe@contoso.com` |
| Make an audio and video call | `https://teams.microsoft.com/l/call/0/0?users=<user1>,<user2>&withVideo=true` | `https://teams.microsoft.com/l/call/0/0?users=joe@contoso.com&withVideo=true` |
|Make an audio and video call with an optional parameter source | `https://teams.microsoft.com/l/call/0/0?users=<user1>,<user2>&withVideo=true&source=demoApp` | `https://teams.microsoft.com/l/call/0/0?users=joe@contoso.com&withVideo=true&source=demoApp` |  
| Make an audio and video call to a combination of VoIP and PSTN users | `https://teams.microsoft.com/l/call/0/0?users=<user1>,4:<phonenumber>` | `https://teams.microsoft.com/l/call/0/0?users=joe@contoso.com,4:9876543210` |
  
Following are the query parameters:

* `users`: A comma-separated list of user IDs representing the participants of the call. The user ID field supports the Azure AD `UserPrincipalName`, typically an email address, or in a PSTN call, it supports a pstn mri 4:&lt;phonenumber&gt;.
* `withVideo`: An optional parameter, which you can use to make a video call. Setting this parameter only turns on the caller's camera. The receiver of the call has a choice to answer through an audio or an audio and video call through the Teams call notification window.
* `Source`: An optional parameter, which informs about the source of the deep link.

#### Configure deep link using TeamsJS library to start audio-video call with users

Applications can also use TeamsJS library 2.0 to start calls without having to manually prepare these deep links.
The following code demonstrates using the TeamsJS library to start a call:

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

> [!NOTE]
>
> * Generating a deep link to share content to stage in meetings is available only in [public developer preview](~/resources/dev-preview/developer-preview-intro.md).
> * Deep link to share content to stage in meeting is supported in Teams desktop client only.

## Deep link to join a meeting

Application can read the URL for, joining a meeting URL through Graph APIs. This deep link brings up the UI for the user to join the meeting. For more information see, [Get `onlineMeeting`](/graph/api/onlinemeeting-get#response-1)

## Invoke Stage View through deep link

To invoke the Stage View through deep link from your tab, you must wrap the deep link URL in the `app.openLink(url)` API. The deep link can also be passed through an `OpenURL` action in the card. For more information see, [Stage View](~/tabs/tabs-link-unfurling.md#invoke-stage-view-through-deep-link).


