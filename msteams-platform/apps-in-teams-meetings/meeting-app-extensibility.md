---
title: Meeting app concepts
author: surbhigupta
description: Understand the meeting app concepts 
ms.topic: conceptual
---

# Meeting app concepts

Teams meeting app is based on the following concepts:

* Meeting lifecycle has different stages, such as pre-meeting, in-meeting, and post-meeting.  
* There are three distinct participant roles in a meeting: organizer, presenter, and attendee. For more information, see [roles in a Teams meeting](https://support.microsoft.com/office/roles-in-a-teams-meeting-c16fa7d0-1666-4dde-8686-0a0bfe16e019).  
* There are various [user types](/microsoftteams/non-standard-users#:~:text=An%20anonymous%20user%20is%20a,their%20Microsoft%20or%20organization's%20account.) in a meeting: in-tenant, [guest](/microsoftteams/guest-access), [federated](/microsoftteams/manage-external-access), and anonymous users.

> [!VIDEO https://www.youtube-nocookie.com/embed/rrNpFJbxqrg]

This article covers the information about meeting lifecycle and how to integrate tabs, bots, and messaging extensions in the meeting. It provides the information to identify different participant roles and different user types to perform the tasks.

## Meeting lifecycle

Meeting lifecycle consists of pre-meeting, in-meeting, and post-meeting app experience. You can integrate tabs, bots, and messaging extensions in each stage of the meeting lifecycle.

### Integrate tabs into the meeting lifecycle

Tabs allow the team members to access services and content in a specific space within a meeting. The team works directly with tabs and has conversations about the tools and data available within tabs. In Teams meeting, users can add a tab by selecting <img src="~/assets/images/apps-in-meetings/plusbutton.png" alt="Plus button" width="30"/>, and selecting the app that they want to install.

> [!IMPORTANT]
> If you have integrated a tab with your meeting, then your app must follow the Teams [single sign-on (SSO) authentication flow for tabs](../tabs/how-to/authentication/auth-aad-sso.md).

> [!NOTE]
> * Mobile clients support tabs only in pre-meeting and post-meeting stages. The in-meeting experiences, such as in-meeting dialog and panel are currently not available on mobile.
> * Apps are supported only in private scheduled meetings.

#### Pre-meeting app experience

With the pre-meeting app experience, you can find and add meeting apps and perform pre-meeting tasks, such as developing a poll to survey the meeting participants.

**To add tabs to an existing meeting**

1. In your calendar, select a meeting to which you want to add a tab.
1. Select the **Details** tab and select <img src="~/assets/images/apps-in-meetings/plusbutton.png" alt="Plus button" width="30"/>. The tab gallery appears.

    ![Pre-meeting experience](../assets/images/apps-in-meetings/PreMeeting.png)

1. In the tab gallery, select the app that you want to add and follow the steps as required. The app is installed as a tab.

    ![Pre-meeting tab view](../assets/images/apps-in-meetings/PreMeetingTab.png)

    > [!NOTE]
    > * You can also add a tab using the meeting **Chat** tab in an existing meeting.
    > * Tab layout must be in an organized state, if there are more than ten polls or surveys.

#### In-meeting app experience

With the in-meeting app experience, you can engage participants during the meeting by using the apps and the in-meeting dialog box. Meeting apps are hosted in the top upper bar of the meeting window as an in-meeting tab. Use the in-meeting dialog box to showcase actionable content for the meeting participants. For more information, see [create apps for Teams meetings](create-apps-for-teams-meetings.md).

**To use tabs during a meeting**

1. After entering the meeting, from the top upper bar of the chat window, select the app you want to use. An app is visible in a Teams meeting in the side panel or the in-meeting dialog box.
1. In the in-meeting dialog box, enter your response as a feedback.

    ![Dialog box view](../assets/images/apps-in-meetings/in-meeting-dialog-view.png)

    > [!NOTE]
    > * Apps can leverage the Teams Client SDK to access the `meetingId`, `userMri`, and `frameContext` to render the experience appropriately.
    > * If the in-meeting dialog box is rendered successfully, you are notified that the results successfully downloaded.
    > * Your app manifest specifies the places where you want them to appear. The context field is used for this purpose. It can also be part of a share-tray experience, subject to specified design guidelines.

    The following image illustrates the in-meeting side panel:

    ![In-meeting side panel](../assets/images/apps-in-meetings/in-meeting-dialog.png)

#### Post-meeting app experience

With post-meeting app experience, you can view the results of the meeting such as poll survey results or feedback. Select <img src="~/assets/images/apps-in-meetings/plusbutton.png" alt="Plus button" width="30"/> to add a tab and get meeting notes and results on which organizers and attendees must take action.

The following image displays the **Contoso** tab with results of poll and feedback received from meeting attendees:

![Post meeting view](../assets/images/apps-in-meetings/PostMeeting.png)

> [!NOTE]
> Tab layout must be organized when there are more than 10 polls or surveys.

### Integrate bots into the meeting lifecycle

Bots enabled in groupchat scope start functioning in meetings. To implement bots, start with [build a bot](../build-your-first-app/build-bot.md) and then continue with [create apps for Teams meetings](../apps-in-teams-meetings/API-references.md#meeting-apps-api-references).

### Integrate messaging extensions into the meeting lifecycle

To implement messaging extension, start with [build a messaging extension](../messaging-extensions/how-to/create-messaging-extension.md) and then continue with [create apps for Teams meetings](../apps-in-teams-meetings/API-references.md#meeting-apps-api-references).

The Teams meeting app concepts allow you to design your app based on participant roles in a meeting.

## Participant roles in a meeting

![Participants in a meeting](../assets/images/apps-in-meetings/participant-roles.png)

Default participant settings are determined by an organization's IT administrator. The following are the participant roles in a meeting:

* **Organizer**: The organizer schedules a meeting, sets the meeting options, assigns meeting roles, and starts the meeting. The users with M365 account and Teams license can only be the organizers, and control attendee permissions. A meeting organizer can change the settings for a specific meeting. Organizers can make these changes on the **Meeting options** web page.
* **Presenter**: The presenters have same capabilities of the organizers with exclusions. A presenter cannot remove an organizer from the session or modify meeting options for the session. By default, participants joining a meeting have the presenter role.
* **Attendee**: An attendee is a user who has been invited to attend a meeting but is not authorized to act as a presenter. Attendees can interact with other meeting members but cannot manage any of the meeting settings or share the content.

> [!NOTE]
> Only an organizer or presenter can add, remove, or uninstall apps.

For more information, see [roles in a Teams meeting](https://support.microsoft.com/office/roles-in-a-teams-meeting-c16fa7d0-1666-4dde-8686-0a0bfe16e019).

After you design your app based on participant roles in a meeting, you can identify each user type for meetings and select what they can access.

## User types in a meeting

> [!NOTE]
> The user type is not included in the **getParticipantRole** API.

User types, such as organizer, presenter, or attendee in a meeting can perform one of the [participant roles in a meeting](#participant-roles-in-a-meeting).

The following list details the different user types along with their accessibility and performance:

* **In-tenant**: In-tenant users belong to the organization and have credentials in Azure Active Directory (AAD) for the tenant. They are usually full-time, onsite, or remote employees. An in-tenant user can be an organizer, presenter, or attendee.
* **Guest**: A guest is a participant from another organization invited to access Teams or other resources in the organization's tenant. Guests are added to the organization’s AAD and have same Teams capabilities as a native team member with access to team chats, meetings, and files. A guest user can be an organizer, presenter, or attendee. For more information, see [guest access in Teams](/microsoftteams/guest-access).
* **Federated or external**: A federated user is an external Teams user in another organization who has been invited to join a meeting. Federated users have valid credentials with federated partners and are authorized by Teams. They do not have access to your teams or other shared resources from your organization. Guest access is a better option for external users to have access to teams and channels. For more information, see [manage external access in Teams](/microsoftteams/manage-external-access).

    > [!NOTE]
    > Your Teams users can add apps when they host meetings or chats with other organizations. The users can use apps shared by external users when your users join meetings or chats hosted by other organizations. The data policies of the hosting user's organization, as well as the data sharing practices of the third-party apps shared by that user's organization, will be in effect.

* **Anonymous**: Anonymous users do not have an AAD identity and are not federated with a tenant. The anonymous participants are like external users, but their identity is not projected in the meeting. Anonymous users are not able to access apps in a meeting window. An anonymous user cannot be an organizer but can be a presenter or attendee.

    > [!NOTE]
    > Anonymous users inherit the global default user-level app permission policy. For more information, see [manage Apps](/microsoftteams/non-standard-users#anonymous-user-in-meetings-access).

A guest or anonymous user cannot add, remove, or uninstall apps.

The following table provides the user types and what features each user can access:

| User type | Tabs | Bots | Messaging extensions | Adaptive Cards | Task modules | In-meeting dialog |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| Anonymous user | Not available | Not available | Not available | Interactions in the meeting chat are allowed. | Interactions in the meeting chat from an Adaptive Card are allowed. | Not available |
| Guest that is part of the tenant AAD | Interaction is allowed. Create, update, and delete are not allowed. | Not available | Not available | Interactions in the meeting chat are allowed. | Interactions in the meeting chat from an Adaptive Card are allowed. | Available |
| Federated user. For more information, see [non-standard users](/microsoftteams/non-standard-users). | Interaction is allowed. Create, update, and delete are not allowed. | Interaction is allowed. Acquire, update, and delete are not allowed. | Not available | Interactions in the meeting chat are allowed. | Interactions in the meeting chat from an Adaptive Card are allowed. | Not available |

## See also

* [Tab](../tabs/what-are-tabs.md#understand-how-tabs-work)
* [Bot](../bots/what-are-bots.md)
* [Messaging extension](../messaging-extensions/what-are-messaging-extensions.md)
* [Design your app](../apps-in-teams-meetings/design/designing-apps-in-meetings.md)

## Next step

> [!div class="nextstepaction"]
> [Prerequisites and API references for apps in Teams meetings](create-apps-for-teams-meetings.md)