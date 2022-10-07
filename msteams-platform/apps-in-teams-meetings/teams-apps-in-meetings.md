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

Meetings enable collaboration, partnership, informed communication, and shared feedback. The meeting space can deliver a user experience for each stage of the meeting lifecycle. The following image gives you an idea of the meeting app extensibility:

:::image type="content" source="../assets/images/apps-in-meetings/meetingappextensibility.png" alt-text="The screenshot shows you how meeting app extensibility works.":::

An application developer must be familiar with the following product concepts to create custom meeting experiences in Microsoft Teams with apps.

## Supported meeting types in Teams

Teams supports access to apps during meeting for the following meeting types:

* [**Scheduled meetings**](https://support.microsoft.com/office/schedule-a-meeting-in-teams-943507a9-8583-4c58-b5d2-8ec8265e04e5#ID0EFBD=Desktop): Meetings scheduled through Teams calendar.
* [**Scheduled channel meetings**](https://support.microsoft.com/office/schedule-a-meeting-in-teams-943507a9-8583-4c58-b5d2-8ec8265e04e5#ID0EFBD=Desktop): Meetings scheduled through Teams public channels.
* [**One-on-one calls**](https://support.microsoft.com/office/start-a-call-from-a-chat-in-teams-f5138c9d-df4c-43d8-9cf6-53400c1a7798): Calls initiated in one-on-one chat.
* [**Group calls**](https://support.microsoft.com/office/start-a-call-from-a-chat-in-teams-f5138c9d-df4c-43d8-9cf6-53400c1a7798): Calls initiated in group chat.
* [**Instant meetings**](https://support.microsoft.com/office/start-an-instant-meeting-in-teams-ff95e53f-8231-4739-87fa-00b9723f4ef5): Meetings initiated through **Meet now** button in Teams calendar.
* [**Webinar**](https://support.microsoft.com/office/get-started-with-teams-webinars-42f3f874-22dc-4289-b53f-bbc1a69013e3): Webinar initiated through **Webinar** button under **New Meeting** dropdown.

> [!NOTE]
>
> * Apps for instant meetings, scheduled public channel meetings, one-on-one, and group calls are currently available only in [public developer preview](~/resources/dev-preview/developer-preview-intro.md).
> * Currently app experiences are not supported in Teams instant channel meetings.

Learn more about [Teams meetings, expiration and policies](/MicrosoftTeams/meeting-expiration) and [Meetings, webinars, and live events](/microsoftteams/quick-start-meetings-live-events).

## Meeting lifecycle

Meeting lifecycle includes pre-meeting, in-meeting, and post-meeting app experience, depending on the user type and user's role in Teams meeting.

## User types in Teams

User types, such as in-tenant, guest, federated or external user in a meeting can do one of the [User roles in Teams meeting](#user-roles-in-teams-meeting).

The following list details the various user types along with their accessibility:

* **In-tenant**: In-tenant users belong to the organization and have credentials in Azure Active Directory (AAD) for the tenant. They're full-time, onsite, or remote employees. An in-tenant user can be an organizer, presenter, or attendee.
* **Guest**: A guest is a participant from another organization invited to access Teams or other resources in the organization's tenant. Guests are added to the organization’s Azure AD and have same Teams capabilities as a native team member. They have access to team chats, meetings, and files. A guest can be an organizer, presenter, or attendee. For more information, see [guest access in Teams](/microsoftteams/guest-access).
* **Federated or external**: A federated user is an external Teams user in another organization who has been invited to join a meeting. Federated users have valid credentials with federated partners and are authorized by Teams. They don't have access to your teams or other shared resources from your organization. Guest access is a better option for external users to have access to teams and channels. For more information, see [manage external access in Teams](/microsoftteams/manage-external-access).

    > [!NOTE]
    > Your Teams users can add apps when they host meetings or chats with other organizations. The users can use apps shared by external users when your users join meetings or chats hosted by other organizations. The data policies of the hosting user's organization, as well as the data sharing practices of the third-party apps shared by that user's organization, will be in effect.

    > [!IMPORTANT]
    > Currently, third-party apps are available in Government Community Cloud (GCC) but are not available for GCC-High and Department of Defense (DOD). Third-party apps are turned off by default for GCC. To turn on third-party apps for GCC, see [manage app permission policies](/microsoftteams/teams-app-permission-policies) and [manage apps](/microsoftteams/manage-apps).

* **Anonymous**: Anonymous users don't have an Azure AD identity and aren't federated with a tenant. The anonymous participants are like external users, but their identity isn't shown in the meeting. Anonymous users can't access apps in a meeting window. An anonymous user can't be an organizer but can be a presenter or attendee.

    > [!NOTE]
    > Anonymous users inherit the global default user-level app permission policy. For more information, see [manage Apps](/microsoftteams/non-standard-users#anonymous-user-in-meetings-access).

## User roles in Teams meeting

The following are the user roles in a Teams meeting:

* **Organizer**: The organizer schedules a meeting, sets the meeting options, assigns meeting roles, and starts the meeting. Only users with a Microsoft 365 account and Teams license can be the organizer, and control attendee permissions. A meeting organizer can change the settings for a specific meeting. Organizers can make these changes on the **Meeting options** web page.

* **Presenter**: Presenters in a meeting have similar capabilities as the organizer, with the exception of removing an organizer from the session and modifying meeting options for the session.

* **Attendee**: An attendee is a user who is invited to attend the meeting. Attendees have limited capabilities during the meeting.

> [!NOTE]
> Only an organizer or presenter can add, remove, or uninstall apps.

For more information, see [roles in a Teams meeting](https://support.microsoft.com/office/roles-in-a-teams-meeting-c16fa7d0-1666-4dde-8686-0a0bfe16e019).

> [!TIP]
>
> * The default participant settings are determined by an organization's IT administrator. As per default settings, participants joining a meeting have the presenter role.
> * Presenter role isn't available in one-on-one call.
> * A user who starts the group call from chat is considered as organizer role.

## See also

* [Designing your Microsoft Teams meeting extension](~/apps-in-teams-meetings/design/designing-apps-in-meetings.md)
* [Build tabs for meeting](~/apps-in-teams-meetings/build-tabs-for-meeting.md)
* [Build apps for Teams meeting stage](build-apps-for-teams-meeting-stage.md)
* [Build extensible conversation for meeting chat](build-extensible-conversation-for-meeting-chat.md)
* [Build apps for anonymous users](build-apps-for-anonymous-user.md)
* [Meeting apps APIs](meeting-apps-apis.md)
* [Enhanced collaboration with Live Share SDK](teams-live-share-overview.md)
* [Custom Together Mode scenes](~/apps-in-teams-meetings/teams-together-mode.md)
