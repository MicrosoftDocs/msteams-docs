---
title: Deep links overview
description: In this article, learn how to create deep links and navigate them in your Microsoft Teams apps with tabs.
ms.topic: how-to
ms.localizationpriority: high
---

# Create deep links

Deep links are a navigation mechanism that you can use to connect users with information and features within Teams and Teams apps. Some scenarios where creating deep links can be useful are as follows:

* Navigating the user to the content within one of your app's tabs. For instance, your app can have a bot that sends messages notifying the user of an important activity. When the user taps on the notification, the deep link navigates to the tab so that the user can view more details about the activity.
* Your app automates or simplifies certain user tasks. You can  create a chat or schedule a meeting, by pre-populating the deep links with required parameters. Avoids the need for users to manually enter information.

The Microsoft Teams JavaScript client SDK (TeamsJS) simplifies the process of navigation. For many scenarios, such as navigating to content and information within your tab or launching a chat dialog. The typed APIs are recommended for Teams apps that run in other hosts, such as Outlook or Office, as they also provide a way to check if the host supports the capability in use. The following sections show information about deep linking, but also highlight how scenarios that used to require it have changed with the v2 release of TeamsJS.

[!INCLUDE [sdk-include](~/includes/sdk-include.md)]

> [!NOTE]
> The behavior of deep links is dependent on a number of factors. The following list outlines the behavior of deep links on Teams entities.
>
> **Tab**:  
> ✔ Directly navigates to the deep link url.
>
> **Bot**:  
> ✔ Deep link in card body: Opens in browser first.  
> ✔ Deep link added to OpenURL action in Adaptive Card: Directly navigates to the deep link url.  
> ✔ Hyperlink markdown text in the card: Opens in browser first.  
>
> **Chat**:  
> ✔ Text message hyperlink markdown: Directly navigates to deep link url.  
> ✔ Link pasted in general chat conversation: Directly navigates to deep link url.
>
>
>The navigation behavior of a Teams app extended across Microsoft 365 (Outlook/Office) is dependent on two factors:
>
> * The target that the deep link points to.
> * The host where the Teams app is running.
>
> If the Teams app is running within the host where the deep link is targeted, your app will open directly within the host. However, if the Teams app is running in a different host from where the deep link is targeted, the app will first open in the browser.

<!--- TBD: Edit this article.
* Admonitions/alerts seem to be overused. 
* An important alert at the end of this table does not make sense. Also, it has a code snippet inside it.
* List items in the table are not formatted well in output.
* Some headings use -ing verbs.
* Example values and some URLs should be in backticks and not emphasized.
* Codeblock are missing language.
* Check for markdownlint errors.
* Table with just a row isn't really needed. Provide the content without tabulating it.
--->

### Open a scheduling dialog

> [!NOTE]
> In order to open the scheduling dialog in Teams, developers need to continue using the original deep-link URL based method, since Teams does not yet support the calendar capability.

For more information about working with the calendar, see [calendar](/javascript/api/@microsoft/teams-js/calendar?view=msteams-client-js-latest&preserve-view=true) namespace in the API reference documentation.

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

Alternatively, you can manually create deep links to the Teams built-in scheduling dialog.

#### Generate a deep link to the scheduling dialog

While it's recommended to use the typed APIs of TeamsJS, it's possible to manually create deep links to the Teams built-in scheduling dialog. Use the following format for a deep link that you can use in a bot, Connector, or message extension card:
`https://teams.microsoft.com/l/meeting/new?subject=<meeting subject>&startTime=<date>&endTime=<date>&content=<content>&attendees=<user1>,<user2>,<user3>,...`

Example: `https://teams.microsoft.com/l/meeting/new?subject=test%20subject&attendees=joe@contoso.com,bob@contoso.com&startTime=10%2F24%2F2018%2010%3A30%3A00&endTime=10%2F24%2F2018%2010%3A30%3A00&content=​​​​​​​test%3Acontent​​​​​​​​​​​​​​`

> [!NOTE]
> The search parameters don't support `+` signal in place of whitespace (``). Ensure your uri encoding code returns `%20` for spaces for example, `?subject=test%20subject` is good, but `?subject=test+subject` is bad.

The query parameters are:

* `attendees`: The optional comma-separated list of user IDs representing the attendees of the meeting. The user performing the action is the meeting organizer. Currently, the User ID field supports only the Azure AD UserPrincipalName, typically an email address.
* `startTime`: The optional start time of the event. This should be in [long ISO 8601 format](https://en.wikipedia.org/wiki/ISO_8601), for example *2018-03-12T23:55:25+02:00*.
* `endTime`: The optional end time of the event, also in ISO 8601 format.
* `subject`: An optional field for the meeting subject.
* `content`: An optional field for the meeting details field.

> [!NOTE]
> Currently, specifying the location isn't supported. You must specify the UTC offset, it means time zones when generating your start and end times.

To use this deep link with your bot, you can specify this as the URL target in your card's button or tap action through the `openUrl` action type.

## Navigate to an audio or audio-video call

You can invoke audio only or audio-video calls to a single user or a group of users, by specifying the call type and the participants. Before placing the call, Teams client prompts a confirmation to make the call. For a group call, you can call a set of VoIP users and a set of PSTN users in the same deep link invocation.

In a video call, the client will ask for confirmation and turn on the caller's video for the call. The receiver of the call has a choice to respond through audio only or audio and video, through the Teams call notification window.

> [!NOTE]
> This method cannot be used for invoking a meeting.

The following code demonstrates using the TeamsJS SDK to start a call:

```javascript
if(call.isSupported()) {
    const callPromise = call.startCall({ targets: ["joe@contoso.com","bob@contoso.com","4:9876543210"], requestedModalities: [call.CallModalities.Audio], source: "demoApp"});
    callPromise.
      then((result) => {/*Successful operation*/}).
      catch((error) => {/*Unsuccessful operation*/});
}
else { /* handle case where capability isn't supported */ }

```

## Generate a deep link to a call

While use of the typed APIs of TeamsJS is recommended, you can also use a manually created deep link to start a call.

| Deep link | Format | Example |
|-----------|--------|---------|
| Make an audio call | `https://teams.microsoft.com/l/call/0/0?users=<user1>,<user2>` | `https://teams.microsoft.com/l/call/0/0?users=joe@contoso.com` |
| Make an audio and video call | `https://teams.microsoft.com/l/call/0/0?users=<user1>,<user2>&withVideo=true` | `https://teams.microsoft.com/l/call/0/0?users=joe@contoso.com&withVideo=true` |
|Make an audio and video call with an optional parameter source | `https://teams.microsoft.com/l/call/0/0?users=<user1>,<user2>&withVideo=true&source=demoApp` | `https://teams.microsoft.com/l/call/0/0?users=joe@contoso.com&withVideo=true&source=demoApp` |  
| Make an audio and video call to a combination of VoIP and PSTN users | `https://teams.microsoft.com/l/call/0/0?users=<user1>,4:<phonenumber>` | `https://teams.microsoft.com/l/call/0/0?users=joe@contoso.com,4:9876543210` |
  
Following are the query parameters:

* `users`: The comma-separated list of user IDs representing the participants of the call. Currently, the User ID field supports the Azure AD UserPrincipalName, typically an email address, or in a PSTN call, it supports a pstn mri 4:&lt;phonenumber&gt;.
* `withVideo`: This is an optional parameter, which you can use to make a video call. Setting this parameter will only turn on the caller's camera. The receiver of the call has a choice to answer through audio or audio and video call through the Teams call notification window.
* `Source`: This is an optional parameter, which informs about the source of the deep link.

## Code Sample

| Sample name | Description | C# |Node.js|
|-------------|-------------|------|----|
|Deep Link consuming Subentity ID  | Teams sample app for demonstrating deep link from bot chat to tab consuming Subentity ID.|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-deeplink/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-deeplink/nodejs)|

## See also

* [Integrate web apps](~/samples/integrate-web-apps-overview.md)
* [Moodle LMS](~/resources/moodleinstructions.md)
