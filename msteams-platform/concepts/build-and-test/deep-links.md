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

### Navigate to a chat

You can navigate to or create private chats between users with TeamsJS by specifying the set of participants. If a chat doesn’t exist with the specified participants, the user is navigated to an empty new chat. New chats are created in draft state until the user sends the first message. Otherwise, you can specify the name of the chat if it doesn’t already exist, along with text that should be inserted into the user's compose box. You can think of this feature as a shortcut for the user taking the manual action of navigating to or creating the chat, and then typing out the message.

As an example use case, if you’re returning an Office 365 user profile from your bot as a card, this deep link can allow the user to easily chat with that person. The following example demonstrates how to open a chat message to a group of participants with an initial message.

```javascript
if(chat.isSupported()) {
    const chatPromise = chat.openGroupChat({ users: ["joe@contoso.com","bob@contoso.com"], topic: "Prep For Meeting Tomorrow", message: "Hi folks kicking off chat about our meeting tomorrow"});
    chatPromise.
      then((result) => {/*Successful operation*/}).
      catch((error) => {/*Unsuccessful operation*/});
}
else { /* handle case where capability isn't supported */ }
```

While use of the typed APIs is recommended, you can alternatively use the following format for a manually created deep link that you can use in a bot, connector, or message extension card:

`https://teams.microsoft.com/l/chat/0/0?users=<user1>,<user2>,...&topicName=<chat name>&message=<precanned text>`

Example: `https://teams.microsoft.com/l/chat/0/0?users=joe@contoso.com,bob@contoso.com&topicName=Prep%20For%20Meeting%20Tomorrow&message=Hi%20folks%2C%20kicking%20off%20a%20chat%20about%20our%20meeting%20tomorrow`

The query parameters are:

* `users`: The comma-separated list of user IDs representing the participants of the chat. The user that performs the action is always included as a participant. Currently, the User ID field supports the Microsoft Azure Active Directory (Azure AD) UserPrincipalName, such as an email address only.
* `topicName`: An optional field for chat's display name, if a chat has three or more users. If this field isn't specified, the chat's display name is based on the names of the participants.
* `message`: An optional field for the message text that you want to insert into the current user's compose box while the chat is in a draft state.

To use this deep link with your bot, specify this as the URL target in your card's button or tap action through the `openUrl` action type.

### Generate deep links to channel conversation

Use this deep link format to go to a particular conversation within channel thread:

`https://teams.microsoft.com/l/message/<channelId>/<parentMessageId>?tenantId=<tenantId>&groupId=<groupId>&parentMessageId=<parentMessageId>&teamName=<teamName>&channelName=<channelName>&createdTime=<createdTime>`

Example: `https://teams.microsoft.com/l/message/<channelId>/1648741500652?tenantId=<tenantId>&groupId=<groupId>&parentMessageId=1648741500652&teamName=<teamName>&channelName=<channelName>&createdTime=1648741500652`

The query parameters are:

* `channelId`: Channel ID of the conversation. For example, `19:3997a8734ee5432bb9cdedb7c432ae7d@thread.tacv2`.
* `tenantId`: Tenant ID such as `0d9b645f-597b-41f0-a2a3-ef103fbd91bb`.
* `groupId`: Group ID of the file. For example, `3606f714-ec2e-41b3-9ad1-6afb331bd35d`.
* `parentMessageId`: Parent message ID of the conversation.
* `teamName`: Name of the team.
* `channelName`: Name of the team's channel.

> [!NOTE]
> You can see `channelId` and `groupId` in the URL from the channel.

### Generate deep links to chat messages

Use this deep link format to navigate a user to a message in a personal or group chat in Teams:

`http://teams.microsoft.com/l/message/{chatId}/{messageId}?context={"contextType":"chat"}`

Example: `http://teams.microsoft.com/l/message/19:253f5895-9a62-4362-8d38-43f0205c702c_f1b94dcf-0aa3-4989-bcdf-ef4a5ed00f86@unq.gbl.spaces/1563480968434?context=%7B%22contextType%22:%22chat%22%7D`

The query parameters are:

* `chatId`: ChatId of the conversation. The supported format for `chatId` is 19:xxx. For example, `19:253f5895-9a62-4362-8d38-43f0205c702c_f1b94dcf-0aa3-4989-bcdf-ef4a5ed00f86@unq.gbl.spaces`.

Apps can read a chat ID through app context in Teams, incoming payload to bot, or through [Microsoft Graph APIs](/graph/api/chat-get?view=graph-rest-1.0&tabs=http&preserve-view=true).

  > [!NOTE]
  > For One-on-One chats with bot, the incoming payload to bot contains the conversation ID in a:xxx format.

* `messageId`: Each message in a chat has a unique ID. When a bot posts a message in chat, the `messageId` is returned. You can also get the `messageId` through [Microsoft Graph APIs](/graph/api/message-get?view=graph-rest-1.0&tabs=http&preserve-view=true). For example, `1563480968434`.

* `context`: Specify the contextType as chat.

### Generate deep links to file in channel

The following deep link format can be used in a bot, connector, or message extension card:

`https://teams.microsoft.com/l/file/<fileId>?tenantId=<tenantId>&fileType=<fileType>&objectURL=<objectURL>&baseUrl=<baseURL>&serviceName=<Name>&threadId=<threadId>&groupId=<groupId>`

The query parameters are:

* `fileId`: Unique file ID from Sharepoint Online, also known as `sourcedoc`. For example,`1FA202A5-3762-4F10-B550-C04F81F6ACBD`.
* `tenantId`: Tenant ID such as `0d9b645f-597b-41f0-a2a3-ef103fbd91bb`.
* `fileType`: Supported file type, such as .docx, .pptx, .xlsx, and .pdf.
* `objectUrl`: Object URL of the file. The format is `https://{tenantName}.sharepoint.com/sites/{TeamName}/SharedDocuments/{ChannelName}/FileName.ext`. For example, `https://microsoft.sharepoint.com/teams/(filepath)`.
* `baseUrl`: Base URL of the file. The format is `https://{tenantName}.sharepoint.com/sites/{TeamName}`. For example, `https://microsoft.sharepoint.com/teams`.
* `serviceName`: Name of the service, app ID. For example, `teams`.
* `threadId`: The threadId is the team ID of the team where the file is stored. It's optional and can't be set for files stored in a user's OneDrive folder. threadId - 19:f8fbfc4d89e24ef5b3b8692538cebeb7@thread.skype.
* `groupId`: Group ID of the file. For example, `ae063b79-5315-4ddb-ba70-27328ba6c31e`.

> [!NOTE]
> You can see `threadId` and `groupId` in the URL from the channel.  

The following deep link format is used in a bot, connector, or message extension card:

`https://teams.microsoft.com/l/file/<fileId>?tenantId=<tenantId>&fileType=<fileType>&objectURL=<objectURL>&baseUrl=<baseURL>&serviceName=<Name>&threadId=<threadId>&groupId=<groupId>`

The following example format illustrates the deep link to files:

`https://teams.microsoft.com/l/file/5E0154FC-F2B4-4DA5-8CDA-F096E72C0A80?tenantId=0d9b645f-597b-41f0-a2a3-ef103fbd91bb&fileType=pptx&objectUrl=https%3A%2F%2Fmicrosoft.sharepoint.com%2Fteams%2FActionPlatform%2FShared%20Documents%2FFC7-%20Bot%20and%20Action%20Infra%2FKaizala%20Actions%20in%20Adaptive%20Cards%20-%20Deck.pptx&baseUrl=https%3A%2F%2Fmicrosoft.sharepoint.com%2Fteams%2FActionPlatform&serviceName=teams&threadId=19:f8fbfc4d89e24ef5b3b8692538cebeb7@thread.skype&groupId=ae063b79-5315-4ddb-ba70-27328ba6c31e`

#### Serialization of this object

```javascript
{
fileId: "5E0154FC-F2B4-4DA5-8CDA-F096E72C0A80",
tenantId: "0d9b645f-597b-41f0-a2a3-ef103fbd91bb",
filetype: = "pptx",
objectUrl: "https://microsoft.sharepoint.com/teams/ActionPlatform/Shared Documents/FC7- Bot and Action Infra/Kaizala Actions in Adaptive Cards - Deck.pptx",
baseUrl: "https://microsoft.sharepoint.com/teams/ActionPlatform",
serviceName: "teams",
threadId: = "19:f8fbfc4d89e24ef5b3b8692538cebeb7@thread.skype",
groupId: "ae063b79-5315-4ddb-ba70-27328ba6c31e"
}
```

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
