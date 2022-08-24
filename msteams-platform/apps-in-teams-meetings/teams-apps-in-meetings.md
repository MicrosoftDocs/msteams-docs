---
title: Apps for Teams meetings
author: surbhigupta
description: In this article, learn how apps works in Microsoft Teams meetings based on participant and user role and app extensibility.
ms.topic: overview
ms.author: lajanuar
ms.localizationpriority: medium
ms.date: 04/07/2022
---

# Apps for Teams meetings and calls

Meetings enable collaboration, partnership, informed communication, and shared feedback. The meeting app can deliver a user experience for each stage of the meeting lifecycle. The following image gives you an idea of the meeting app extensibility:

:::image type="content" source="../assets/images/apps-in-meetings/meetingappextensibility.png" alt-text="The screenshot shows you how meeting app extensibility works.":::

An application developer must be familiar with the following product concepts to create custom meeting experiences in Microsoft Teams with apps.

## Meeting lifecycle

Meeting lifecycle includes pre-meeting, in-meeting, and post-meeting app experience, depending on the attendee's status.

### Types of Teams meetings

Teams supports access to apps during meeting for the following meeting types:

* [**Scheduled meetings**](https://support.microsoft.com/office/schedule-a-meeting-in-teams-943507a9-8583-4c58-b5d2-8ec8265e04e5#ID0EFBD=Desktop): Meetings scheduled through Teams calendar.
* [**One-on-one calls**](https://support.microsoft.com/office/start-a-call-from-a-chat-in-teams-f5138c9d-df4c-43d8-9cf6-53400c1a7798): Calls initiated in one-on-one chat.
* [**Group calls**](https://support.microsoft.com/office/start-a-call-from-a-chat-in-teams-f5138c9d-df4c-43d8-9cf6-53400c1a7798): Calls initiated in group chat.
* [**Instant meetings**](https://support.microsoft.com/office/start-an-instant-meeting-in-teams-ff95e53f-8231-4739-87fa-00b9723f4ef5): Meetings initiated through **Meet now** button in Teams calendar.

> [!NOTE]
>
> Apps for instant meetings, one-on-one, and group calls are currently available only in [public developer preview](~/resources/dev-preview/developer-preview-intro.md).

Learn more about [Teams meetings, expiration and policies](/MicrosoftTeams/meeting-expiration) and [Meetings, webinars, and live events](/microsoftteams/quick-start-meetings-live-events).

Users can add apps to the meeting using the **+** option from their Teams meeting window.

:::image type="content" source="../assets/images/apps-in-meetings/add-app.png" alt-text="This screenshot shows how to add an app in Teams meeting":::

Visit the [Teams store](https://go.microsoft.com/fwlink/p/?LinkID=2183121) and explore apps designed specifically for meetings.

## User roles in Teams meeting

:::image type="content" source="~/assets/images/apps-in-meetings/participant-roles.png" alt-text="This screenshot shows the participant roles in a Teams meeting window.":::

The default participant settings are determined by an organization's IT administrator. The following are the participant roles in a meeting:

* **Organizer**: The organizer schedules a meeting, sets the meeting options, assigns meeting roles, and starts the meeting. The users with Microsoft 365 account and Teams license can only be the organizers, and control attendee permissions. A meeting organizer can change the settings for a specific meeting. Organizers can make these changes on the **Meeting options** web page.

* **Presenter**: The presenters have same capabilities of the organizers with exclusions. A presenter can't remove an organizer from the session or modify meeting options for the session.

* **Attendee**: An attendee is a user who is invited to attend the meeting. Attendees have limited capabilities during the meeting. For more information, see

> [!NOTE]
> Only an organizer or presenter can add, remove, or uninstall apps.

For more information, see [roles in a Teams meeting](https://support.microsoft.com/office/roles-in-a-teams-meeting-c16fa7d0-1666-4dde-8686-0a0bfe16e019).

After you design your app based on participant roles in a meeting, you can identify each user type for meetings and select what they can access.

> [!TIP]
>
> * The default participant settings are determined by an organization's IT administrator. As per default settings, participants joining a meeting have the presenter role.
> * Participant role isn't available in one-on-one call.
> * A user who starts the group call from chat is considered as organizer role.

## See also

* [Designing your Microsoft Teams meeting extension](~/apps-in-teams-meetings/design/designing-apps-in-meetings.md)
* [Advanced meeting APIs](advanced-meeting-apis.md)
* [Build apps for Teams meeting stage](build-apps-for-teams-meeting.md)
* [Custom Together Mode scenes](~/apps-in-teams-meetings/teams-together-mode.md)
* [Enable and configure your apps for Teams meetings](~/apps-in-teams-meetings/enable-and-configure-your-app-for-teams-meetings.md)
* [Enhanced collaboration with Live Share SDK](teams-live-share-overview.md)
