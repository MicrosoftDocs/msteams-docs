---
title: Meeting app extensibility
author: laujan
description: Understand the meeting app extensibility 
ms.topic: conceptual
---

# Meeting app extensibility

Teams’ meeting app extensibility is based on the following concepts:

✔ Meeting lifecycle has stages such as before, during, and after meeting time frame.  
✔ Participant roles in a meeting such as meeting organizer, presenter, or attendee.  
✔ User types in a meeting such as in-tenant, guest, federated, or anonymous Teams user.

This article covers information about the meeting lifecycle and how to integrate tabs, bots, and messaging extensions in your meeting. It also enables you to identify participant roles and also use different user types to perform tasks.

> [!NOTE]
> To work with the meeting app extensibility features, you must have the appropriate permissions.

## Meeting lifecycle

Meeting lifecycle consists of pre-meeting, in-meeting, and post-meeting app experience. You can integrate tabs, bots, and messaging extensions in each stage of the meeting lifecycle.

### Integrate tabs into the meeting lifecycle

Tabs allow team members to access services and content in a specific space within a channel or chat. This lets the team work directly with tabs and have conversations about the tools and data available within tabs. In Teams meeting, users can add a tab by selecting plus **+**, and choosing the app that they want to install as a tab.

> [!IMPORTANT]
> If you have integrated a tab with your meeting, then your app must follow the Teams [single sign-on (SSO) authentication flow](../tabs/how-to/authentication/auth-aad-sso.md) for tabs.

> [!NOTE]
> * Mobile clients support tabs only in pre and post meeting stages. The in-meeting experiences that is in-meeting dialog and panel are currently not available on mobile.
> * Apps are supported only in private scheduled meetings.

#### Pre-meeting app experience

With the pre-meeting app experience, you can find and add meeting apps and perform pre-meeting tasks, such as developing a poll to survey meeting participants.

**To add tabs to an existing meeting**

1. In your calendar, select a meeting to which you want to add a tab.
1. Select the **Details** tab and select plus **+**. The tab gallery appears.

    ![Pre-meeting experience](../assets/images/apps-in-meetings/PreMeeting.png)

1. In the tab gallery, select the app that you want to add and follow the steps as required. The app is installed as a tab.

    ![Pre-meeting tab view](../assets/images/apps-in-meetings/PreMeetingTab.png)

    > [!NOTE]
    > * You can also add a tab using the meeting **Chat** tab in an existing meeting.
    > * Tab layout must be in an organized state if there are more than ten polls or surveys.

#### In-meeting app experience

With the in-meeting app experience, you can engage participants during the meeting by using apps or taking polls.

✔ Meeting apps are hosted in the top upper bar of the chat window as an in-meeting tab. When users add a tab to a meeting through the tab gallery, apps that are in-meeting experiences are displayed.

✔ With the appropriate permissions, you can add apps while in the meeting.

✔ Apps can leverage the Teams Client SDK to access the `meetingId`, `userMri`, and `frameContext` to render the experience appropriately.

✔ If the result of a survey or poll is exported, you are notified that the results successfully downloaded.

✔ An app is visible in a Teams meeting in the side panel or the in-meeting dialog box. Use the in-meeting dialog box to showcase actionable content for meeting participants. For more information, see [create apps for Teams meetings](create-apps-for-teams-meetings.md).

> [!NOTE]
> Your app manifest specifies that your tab is [optimized for side panel](enable-and-configure-your-app-for-teams-meetings.md#during-a-meeting), that is where it is displayed. It can also be part of a share-tray experience, subject to specified design guidelines.

The following images display the app as an in-meeting dialog box and as a separate side panel:

![in-meeting experience](../assets/images/apps-in-meetings/in-meeting-experience.png)

![In-meeting-dialog view](../assets/images/apps-in-meetings/in-meeting-dialog.png)

#### In-meeting actionable dialog for users

The following image displays the app as an actionable in-meeting dialog box with feedback:

![Dialog view](../assets/images/apps-in-meetings/in-meeting-dialog-view.png)

#### Post-meeting app experience

With post-meeting app experience, you can view the results of the meeting such as poll survey results or feedback. Use tabs to get meeting notes and results on which organizers and attendees must take an action.

The following image displays the **Contoso** tab with results of poll and feedback received from meeting attendees:

![Post meeting view](../assets/images/apps-in-meetings/PostMeeting.png)

> [!NOTE]
> Tab layout must be organized when there are more than ten polls or surveys.

### Integrate bots into the meeting lifecycle

For bot implementation, start with [build a bot](../build-your-first-app/build-bot.md) and then continue with [create apps for Teams meetings](../apps-in-teams-meetings/create-apps-for-teams-meetings.md#meeting-apps-api-references).

### Integrate messaging extensions into the meeting lifecycle

For messaging extension implementation, start with [build a messaging extension](../messaging-extensions/how-to/create-messaging-extension.md) and then continue with [create apps for Teams meetings](../apps-in-teams-meetings/create-apps-for-teams-meetings.md#meeting-apps-api-references).

In addition to integrating tabs, bots and messaging extensions into the meeting lifecycle, Teams meeting app extensibility enables you to design your app based on participant roles in a meeting.

## Participant roles in a meeting

![Participants in a meeting](../assets/images/apps-in-meetings/participant-roles.png)

Default participant settings are determined by an organization's IT administrator. The following are the participant roles in a meeting:

* Organizer: The organizer schedules a meeting, sets the meeting options, assigns meeting roles, and starts the meeting. Only users with a M365 account with a Teams license can be organizers and control attendee permissions. A meeting organizer can change the settings for a specific meeting. Organizers can make these changes on the **Meeting options** web page.
* Presenter: Presenters have the same capabilities as organizer. However, a presenter cannot remove an organizer from the session or modify meeting options for the session. By default, participants joining a meeting have the presenter role.
* Attendee: An attendee is a user who has been invited to attend a meeting but who is not authorized to act as a presenter. Attendees can interact with other meeting members but cannot manage any of the meeting settings or share content.

Only an organizer or presenter can add, remove, or uninstall apps. Only organizer or presenter can create polls in a meeting.

For more information, see [roles in a Teams meeting](https://support.microsoft.com/office/roles-in-a-teams-meeting-c16fa7d0-1666-4dde-8686-0a0bfe16e019).

After you design your app based on participant roles in a meeting, you can identify each user type for meetings and what they can access.

## User types in a meeting

> [!NOTE]
> Users with specific user types assigned to them can join meetings and assume one of the participant roles described in [participant roles in a meeting](#participant-roles-in-a-meeting). The user type is not included in the **getParticipantRole** API.

User types in a meeting can assume one of the participant roles, such as, organizer, presenter, or attendee.

The following user types identify what each user can do and what they can access:

* In-tenant: In-tenant users belong to the organization and have credentials in Azure Active Directory (AAD) for the tenant. They are usually full-time, onsite, or remote employees. An in-tenant user can be an organizer, presenter, or attendee.
* Guest: A guest is a participant from another organization invited to access Teams or other resources in the organization's tenant. Guests are added to your organization’s AAD and have the same Teams capabilities as a native team member with access to team chats, meetings, and files. A guest user can be an organizer, presenter, or attendee. For more information, see [guest access in Teams](/microsoftteams/guest-access).
* Federated or external: A federated user is an external Teams user in another organization who has been invited to join a meeting. These users have valid credentials with federated partners and are authorized by Teams. They do not have access to your teams or other shared resources from your organization. Guest access is a better option for external users to have access to teams and channels. For more information, see [manage external access in Teams](/microsoftteams/manage-external-access).
* Anonymous: Anonymous users do not have an AAD identity and are not federated with a tenant. The anonymous participant is like an external user, but their identity is not projected in the meeting. Anonymous users are not able to access apps in a meeting window. An anonymous user cannot be an organizer but can be a presenter or attendee.

A guest or anonymous user cannot add, remove, or uninstall apps.

## See also

> [!div class="nextstepaction"]
> * [Configurable tab](../tabs/what-are-tabs.md#how-do-tabs-work)

> [!div class="nextstepaction"]
> * [Bot](../bots/what-are-bots.md)

> [!div class="nextstepaction"]
> * [Messaging extension](../messaging-extensions/what-are-messaging-extensions.md)

> [!div class="nextstepaction"]
> * [Design your app](../apps-in-teams-meetings/design/designing-apps-in-meetings.md)

> [!div class="nextstepaction"]
> * [Together Mode in Teams](teams-together-mode.md)

## Next step

> [!div class="nextstepaction"]
> [Prerequisites and API references for apps in Teams meetings](create-apps-for-teams-meetings.md)