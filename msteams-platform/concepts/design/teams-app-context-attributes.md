---
title: Teams App Context and Attributes
author: heath-hamilton
description: Learn about Teams App Context and Attributes
ms.topic: conceptual
ms.localizationpriority: high
ms.author: surbhigupta
---

# Plan for Teams app context and Attributes

Developing an app in Teams gives you access to certain context and user data unique to Teams and Microsoft 365 services. While your app reports above Telemetry, combining it with these attributes gives more insights, useful context around events that help in decision making.

Each platform capability or extensibility point exposes different set of user properties and Teams context. As you build your telemetry monitoring, make just use of combination of the attributes given in the following sections.

## Tab

A Tab is Teams aware web page iframed in Teams. In addition to instrumentation that you might have included in your app’s web page, Teams tab provides more context information including:

- **App information**:

  - `page.id` and `page.subPageId`: indicates developer defined ID of the page and element or sub page within a page
  - `isFullScreen`: Indicates whether the page is in full-screen mode
  - `isMultiWindow`: Indicates whether the page is accessed as a pop out window
  - `app.theme`: Indicates the user interface theme being used, that is, default, dark, contrast
  - `app.locale`: locale that user has configured for the app (for example, en-us)
  - `app.host.clientType`: type of host client, that is, android, iOS, desktop, web
  - `app.host.sessionID`: Unique ID for the current Host session for use in correlating telemetry data

- **User information**:

  - `user.id`: Azure AD ID of the current user
  - `user.userPrincipalName`: UPN of the current user
  - `user.tenant.id`: Tenant ID of the current user

| Personal | Teams or Channel | Group chat | Meeting |
| --- | --- | --- | --- |
| &nbsp; | `team.internalId` and `channel.id`: ID of Team and Channel where tab is `associated team.type`. - different types of team in O365 for Education channel.channelType – indicates whether channel is private, regular or shared | `chat.Id`: chat ID if the tab is added to a Group Chat context | `meeting.ID`: ID of the meeting used by tab when running in meeting context |

## Bot

Bot is a conversational interface that has a publicly accessible web service hosting the business logic. Bot’s telemetry instrumentation done in this web service may make use of the following attributes:

- **App information**:

  - `TurnContext.Locale`: locale that user has configured for the app
  - `TurnContext.Activity.Timestamp`: timestamp when a message was sent
  - `TurnContext.Activity.LocalTimezone`: name of timezone for the message sent

- **User Information**:

  - `TurnContext.Activity.From.AadObjectId`: AAD ID of the sender
  - `ChannelData.Tenant.id`: Tenant ID passed via TurnContext
  - `TeamsInfo.GetMembersAsync`: Get members of the chat or channel where bot has received a message

| Personal | Teams or Channel | Group chat | Meeting |
| --- | --- | --- | --- |
| `readReceiptInfo.IsMessageRead()` can be used to get read receipts for select bot messages | `turnContext.Activity.TeamsGetTeamInfo()`: Get details of the team where bot is installed TeamsInfo.`GetTeamChannelsAsync`: retrieves list of channels in the installed Team On installationUpdate event, conversation.ID provides channel ID where bot is installed | On installationUpdate event, `conversation.ID` provides chat ID where bot is installed | On `installationUpdate` event, `conversation.ID` provides ID of meeting chat where bot is installed |

## Messaging Extension

Search Messaging extensions allow to search external system and bring results into Teams; Action Message extensions allow to initiate action in external system. Whenever a web page based task module gets invoked from action message extension, telemetry is handled the same as iframed web pages in tab. Messaging extension also provides further context on invoking:

- **App information**:

  - `value.context.theme`: user’s client theme can be one of default, contrast, or dark
  - `value.CommandContext`: context from where extension was invoked – ‘message’, ‘compose’, ‘commandbox’
  - `channelData.tenant.id`: Tenant ID of the invoking user
  - `composeExtension` or `queryLink`: Instrument by handling this invoke request. This provides event every time URL is unfurled in a tenant. `TurnContext` can provide tenant and other related details.

- **User Information**:

  - `from.aadObjectId`: AAD ID of the user invoking messaging extension

| Personal | Teams or Channel | Group chat | Meeting |
| --- | --- | --- | --- |
| Not Applicable | conversation.conversationType is “channel” channelData.channel gives channel ID and channelData.team gives Team ID | `conversation.conversationType` is “groupChat” and conversation.`id` is the ID of the Group Chat | `conversation.id` contains Meeting Chat ID; `channelData.meeting.ID` gives meeting ID |

## Meeting apps

Meeting Apps include tabs that work pre and post meetings, meeting side panel that are iframed web pages and in-meeting notification.

- **MeetingTab**: when run in context of meeting, tabs get the meeting ID. All context information for tabs from earlier section on ‘Tab’ apply for meeting tabs too.
- **Meeting Information**: TeamsInfo.GetMeetingInfoAsync API provides meeting specific details:

  - `details.id`: meeting ID
  - `details.type`: Type of meeting (GroupCall, OneToOneCall, Adhoc, Broadcast, MeetNow, Recurring, Scheduled, or Unknown)

- **User Information**: TeamsInfo.GetMeetingParticipantAsync provides information about participants in the meeting:

  - `user.aadObjectId`: AAD ID of the participant
  - `user.tenantId`: Tenant ID of the participant
  - `meeting.role`: Role in meeting, that is, Organizer, Presenter, and Attendee
  - `organizer.tenantId`: Organizers Tenant ID

## UI constructs

- **Cards**: Teams supports cards to be sent as messages across scopes. Cards are client side UI containers and can be sent by a bot or via Messaging extensions. Cards support certain actions, which are handled by the bot service. Instrumenting may happen in these events:

  - `openURL`: Instrumenting openURL calls will require an intermediary web page to be setup with instrumentation logic and which redirects to the destination URL.
  - `messageBack`: Sends a message and payload to the bot with metadata:
    - `from.id`: AAD ID of the user who clicked the card button
    - `entities`: provides locale, platform, timezone and client information
    - `channelData`: provides channel or Team ID, tenant ID

  - `imBack`: bot receives return message. Bot can receive metadata from turnContext same as the case when user replies to the bot
  - `invoke`: Bot receives value object and invoke message payload contains metadata:

    - `from.id`: AAD ID of the user who clicked the card button
    - `entities`: provides locale, platform, timezone and client information
    - `channelData`: provides channel or Team ID, tenant ID

  - signin: Initiates OAuth flow via bot. Include instrumentation of authentication event to capture this event.

- **Task Module**: Task modules are modal popup experiences which can contain iframed web page or an Adaptive card. TaskInfo object provides metadata about task module including its width, height,  information on whether it contains a card or web page.

  - If the task module contains an iframed web page, include telemetry in the web page to track user action. In addition, it will contain context the same as a tab context.
  - If the task module contains adaptive card: all card related telemetry would work when the Adaptive card is inside a task module.

`microsoftTeams.tasks.startTask` and `microsoftTeams.tasks.submitTask` are used to invoke a task module and submit information entered in a task module respectively. Instrumenting these events can help map user progress.
