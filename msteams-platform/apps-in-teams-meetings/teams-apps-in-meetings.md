---
title: Apps in Teams meetings 
author: laujan
description: overview of apps in Teams meetings based on participant and user role
ms.topic: overview
ms.author: lajanuar
keywords: teams apps meetings user participant role api  
---
# Apps in Teams meetings

Meetings are key to productivity in Microsoft Teams. They enable collaboration, partnership, informed communication, and shared feedback in an inclusive and active forum.

To enhance a Teams meeting experience, you can create [configurable tab](../tabs/what-are-tabs.md#how-do-tabs-work), [bot](../bots/what-are-bots.md), and [messaging extension](../messaging-extensions/what-are-messaging-extensions.md) applications. Meeting users can access apps using the tab gallery to pre-stage a Kanban board, launch an in-meeting actionable dialog, or create a post-meeting poll. Your meeting app can deliver a user experience for each stage of the meeting lifecycle, depending on attendee status.

Teams also offers you to [work with apps for Teams meetings](create-apps-for-teams-meetings.md) and work in the Microsoft Teams Together Mode. With the Together Mode feature you can collaborate with your team in one place without being separated by boxes. For more information, see [Together Mode in Teams](teams-together-mode.md).

Teams’ meeting app extensibility is based on the following three concepts:

✔ **Meeting lifecycle**: Includes these stages, before, during, and after meeting time frame.  
✔ **Participant roles in a meeting**: Includes these participant roles, meeting organizer, presenter, or attendee.  
✔ **User types in a meeting**: Includes these user types, in-tenant, guest, federated, or anonymous Teams user.

## Meeting lifecycle

With meeting extensibilities, there are three stages of the meeting lifecycle:

* Pre-meeting app experience
* In-meeting app experience
* Post-meeting app experience

In this section you can integrate the following in each stage of the meeting lifecycle:
* Tabs
* Bots
* Messaging extensions

### Integrate tabs into the meeting lifecycle

Tabs allow team members to access services and content in a dedicated space within a channel or chat. This lets the team work directly with tools and data and have conversations about the tools and data. In your Teams meeting, you can add a tab using a plus icon (➕) button and by selecting the app that you want to install as a tab.

> [!IMPORTANT]
> As with all tab applications, your app will need to follow the Teams [single sign-on (SSO) authentication flow](../tabs/how-to/authentication/auth-aad-sso.md) for tabs.

> [!NOTE]
> Mobile clients support tabs only in pre and post meeting stages. The in-meeting experiences that is in-meeting dialog and panel on mobile are currently not available.

### Pre-meeting app experience

With the pre-meeting app experience, you can find and add meeting apps and perform pre-meeting tasks such as developing a poll to survey meeting participants.

#### Pre-meeting experience

The following image displays the **Weekly planning** meeting page including details of meeting attendees, date and time of meeting and so on:

![pre-meeting experience](../assets/images/apps-in-meetings/PreMeeting.png)

From this page you can add a tab to the meeting.

#### Pre-meeting tab

The following image displays the **Weekly planning** meeting page with the **Contoso** tab added to the pre-meeting page:

![pre-meeting tab view](../assets/images/apps-in-meetings/PreMeetingTab.png)

✔ With appropriate permissions, you can add apps to a meeting using the tab gallery in two ways:

&emsp;&emsp;&#9679; Using the **Details** tab on the Teams scheduling form.

&emsp;&emsp;&#9679;  Using the meeting **Chat** tab in an existing meeting.</br> </br>

✔ Tab apps are accessible in meetings **Details** and **Chats** pages using a plus icon (➕) button.

✔ Tab layout should be in an organized state if there are more than ten polls or surveys.

### In-meeting app experience

With the in-meeting app experience, you can engage participants during the meeting by using apps or taking polls.

✔ Meeting apps will be hosted in the top upper bar of the chat window as an in-meeting tab. When users add a tab to a meeting through the tab gallery, apps that are in-meeting experiences are displayed.

✔ With the appropriate permissions, you can add apps while in the meeting.

✔ Apps can leverage the Teams Client SDK to access the `meetingId`, `userMri`, and `frameContext` to render the experience appropriately.

✔ If the result of a survey or poll is exported, you are notified that the ‘results successfully downloaded’.

✔ An app is visible in a Teams meeting in the side panel or the in-meeting dialog box. Use the in-meeting dialog to showcase actionable content for meeting participants. For more information, see [create apps for Teams meetings](create-apps-for-teams-meetings.md).

> [!NOTE]
> Your app manifest specifies that your tab is [optimized for side panel](enable-and-configure-your-app-for-teams-meetings.md#during-a-meeting), that is where it will be displayed. It can also be part of a share-tray experience, subject to specified design guidelines.

#### In-meeting experience

The following images display the app as an in-meeting dialog box and as a separate side panel:

![in-meeting experience](../assets/images/apps-in-meetings/in-meeting-experience.png)

![In-meeting-dialog view](../assets/images/apps-in-meetings/in-meeting-dialog.png)

#### In-meeting actionable dialog for users

The following image displays the app as an actionable in-meeting dialog box with feedback:

![dialog view](../assets/images/apps-in-meetings/in-meeting-dialog-view.png)

### Post-meeting app experience

With post-meeting app experience, you can view the results of the meeting such as poll survey results or feedback. Tabs can be used to get meeting notes and results on which organizers and attendees need to take an action.

#### Post-meeting experience

The following image displays the **Contoso** tab with results of poll and feedback received from meeting attendees:

![post meeting view](../assets/images/apps-in-meetings/PostMeeting.png)

✔ With appropriate permissions, you can add apps from the tab gallery to a meeting using the **Details** tab on the Teams scheduling form and the meeting **Chat** tab in an existing meeting.

✔  Tab layout must be organized when there are more than ten polls or surveys.

### Integrate bots into the meeting lifecycle

For bot implementation, see [bots in Teams meetings](../bots/how-to/create-a-bot-for-teams.md#bots-in-teams-meetings).

### Integrate messaging extensions into the meeting lifecycle

For messaging extension implementation, see [messaging extensions in Teams meetings](../messaging-extensions/how-to/create-messaging-extension.md#messaging-extensions-in-teams-meetings).

## Participant roles in a meeting

![Participants in a meeting](../assets/images/apps-in-meetings/participant-roles.png)

With appropriate permissions, you can design your app to be specific to participants. For example, only an organizer or presenter can create a poll in meetings. Default participant settings are determined by an organization's IT administrator. However, a meeting organizer can change the settings for a specific meeting. Organizers can make these changes on the **Meeting options** web page.

* **Organizer**. The organizer schedules a meeting, sets the meeting options, assigns meeting roles, and starts the meeting. Only users with a M365 account with a Teams license can be organizers and control attendee permissions.
* **Presenter**. Presenters have the same capabilities as organizer. However, a presenter cannot remove an organizer from the session or modify meeting options for the session. By default, participants joining a meeting have the presenter role.
* **Attendee**. An attendee is a user who has been invited to attend a meeting but who is not authorized to act as a presenter. Attendees can interact with other meeting members but cannot manage any of the meeting settings or share content.

For more information, see [roles in a Teams meeting](https://support.microsoft.com/office/roles-in-a-teams-meeting-c16fa7d0-1666-4dde-8686-0a0bfe16e019)

You can access the  **Meeting options** page using one of the following methods:

&#11200; In Teams, go to **Calendar** ![calendar logo](../assets/images/apps-in-meetings/calendar-logo.png), select a meeting, and select **Meeting options**.

&#11200; In a meeting invitation, select **Meeting options**.

&#11200; During a meeting, select **Show participants** ![show participants icon](../assets/images/apps-in-meetings/show-participants.png) in the meeting controls. Then, select **Manage permissions** on top of the list of participants.

## User types in a meeting

> [!NOTE]
> Users with specific user types assigned to them can join meetings and assume one of the participant roles described in [participant roles in a meeting](#participant-roles-in-a-meeting). The user type is not included in the **getParticipantRole** API.

The following user types identify what each user can do and what they can access:

1. **In-tenant**: These users belong to the organization and have credentials in Azure Active Directory (AAD) for the tenant. They are usually full-time, onsite or remote employees.
1. **Guest**: A guest is a participant from another organization who has been invited to access Teams or other resources in your organization's tenant. Guests are added to your organization’s AAD and can be given all the same Teams capabilities as a native team member with full access to team chats, meetings, and files. For more information, see [guest access in Teams](/microsoftteams/guest-access).
1. **Federated/External**: A federated user is an external Teams user in another organization who has been invited to join a meeting. Since these users have valid credentials with federated partners, they are authorized by Teams. But they do not have access to your teams or other shared resources from your organization. If you want external users to have access to teams and channels, guest access is a better option. For more information, see [manage external access in Teams](/microsoftteams/manage-external-access)
1. **Anonymous**: Anonymous users do not have an AAD identity and are not federated with a tenant. The anonymous participant is like an external user, but their identity is not projected in the meeting. Anonymous users will not be able to access apps in a meeting window.

## See also

* [Design your app](../apps-in-teams-meetings/design/designing-apps-in-meetings.md)
* [Together Mode in Teams](teams-together-mode.md)

## Next step

> [Enable and configure your apps for Teams meetings](enable-and-configure-your-app-for-teams-meetings.md)
