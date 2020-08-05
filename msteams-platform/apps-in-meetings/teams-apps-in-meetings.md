---
title: Add apps to Teams meetings
author: laujan
description: add apps to teams meetings based on user role
ms.topic: conceptual
ms.author: lajanuar
keywords: teams apps meetings user role organizer tenant guest
---
# Add apps to Teams meetings

Meetings are key to productivity in Teams. They enable collaboration, partnership, informed communication, and shared feedback in an inclusive and active forum. As a developer, you can create [configurable tab applications](../tabs/what-are-tabs.md#how-do-tabs-work) to enhance and enrich a Teams meeting experience. Meeting users can access apps, via the tab gallery, to enable relevant scenarios such as pre-staging a Kanban board, launching an in-meeting actionable notification, or creating a post-meeting poll. Your meeting app can deliver a user experience for each stage of the meeting lifecycle based upon attendee status.

Teams’ meeting app extensibility centers on three concepts:

1. Meeting lifecycle — before, during, and after a meeting.
2. Participant roles — organizer, presenter, or attendee in a meeting.
3. User types — in-tenant, guest, federated, or anonymous Teams user.

## Meeting lifecycle scenarios

| Scenario | Scope | Meeting app experience |
| ----------| -------| ----------------------------|
| Pre-meeting | For your configurable tab app to be available as part of the meeting chat/pre-meeting experience it must be scoped to the group-chat level.| Permissioned users can add apps via the tab gallery to a meeting.|
| During meeting | When users add an app in the meeting lifecycle through the tab gallery, the apps that have “during meeting” experience will be promoted. | Meeting apps will be hosted in the top upper bar of the chat window and as in-meeting tab experience via the right pane. |
|Post-meeting | As with the pre-meeting scenario, your app must be available in the group-chat scope to be available within the post-meeting surface.| This is similar to the current post-meeting experience with the added benefit of having tabs exist within the surface. Additionally, the *Meeting Details* tab provides a central place for continued access to apps and other related materials after the meeting has ended. |

## Participant roles and user types in a meeting

### Participant roles

1. **Organizer**. The organizer schedules a meeting, sets the meeting options, assigns meeting roles, and starts the meeting. Only users with a M365 account (possessing a Teams license) can be organizers and can control all attendee permissions.
1. **Presenter**. Presenters have with most of the capabilities of the organizer; however, a Presenter cannot remove the Organizer from the session or modify Meeting Options for the session. By default, participants joining a meeting have the presenter role.
1. **Attendee**. An attendee is a user who has been invited to attend a meeting but who is not authorized to act as a presenter. Attendees can interact with other meeting members but cannot manage any of the meeting settings or share content.

> [!NOTE]
> User types can join meetings and assume one of the participant roles described above.

### User types

1. **In-tenant**. These users belong to the organization and have credentials in Azure Active Directory for the tenant. They are usually full-time, onsite or remote employees.
1. **Guest**. A guest is a participant from another organization who has been invited to access Teams or other resources in your organization's tenant. Guests are added to your organization’s Active Directory.
1. **Federated**. A federated user is an external Teams user in another organization who has been invited to join a meeting. Since these users have valid credentials with federated partners, they are treated as authenticated by Teams but do not have access to your teams or other shared resources from your organization.
1. **Anonymous**. Anonymous users do not have an Active Directory identity and are not federated with a tenant. The anonymous participant is like an external user, but their identity is not projected into the meeting.

## Enable apps in Teams meetings

Enabling apps in Teams meetings requires updating your [Teams app manifest](../resources/schema/manifest-schema) and making an API call. The APIs are available through the Teams Developer Platform SDK (Tab SDK and Bot SDK) and some of them will be exposed via Microsoft Graph.

### Update your app manifest file

The meetings app capabilities are declared in your app manifest via the `configurableTabs`  `meetingSurfaces`  array. The array accepts two options — `sidePanel` and /or `stage` . The *sidePanel* presentation is the right-pane, in-meeting app experience and the *stage* presentation is rendered in the main shared view of the meeting, e.g., Whiteboard and InVision.

```json
"configurableTabs": [
    {
      "configurationUrl": "https://contoso.com/teamstab/configure",
      "canUpdateConfiguration": true,
      "meetingSurfaces": [
        "sidePanel",
        "stage"
      ],
      "scopes": [
        "team",
        "groupchat"
      ]
    }
  ]
```

API interfaces

|API | Description | Source |Response|
| -----| ------------| --------|-----------|
|**getParticipant**| Fetch meeting participant roles| Graph| meetingRole — organizer, presenter, or attendee.
|**getMeeting**| Fetch meeting metadata | Bot SDK and Graph| scheduledTime, startTime, endTime, subject|
|**getMeetingParticipants**|  — organizer, presenter, attendee|

> [!NOTE]
> If you are building experiences based on roles, those experiences could be surfaced to any user type since these user types can have any role in a meeting. Furthermore, it is important to consider the security, auth, and identity management for guest, federated, and anonymous user types.  
