---
title: Unified meetings apps
author: surbhigupta
description: Learn about Meeting lifecycle, building user's meeting experience throughout meeting lifecycle in desktop and mobile environment, participant roles and user types. In addition, learn about integrating bots and message extension in meeting lifecycle.
ms.topic: conceptual
ms.localizationpriority: none
ms.author: surbhigupta
ms.date: 04/07/2022
---

# Unified meetings apps

Teams unified meetings apps are based on the following concepts:

* Meeting lifecycle has different stages: pre-meeting, in-meeting, and post-meeting.  
* There are three distinct participant roles in a meeting: organizer, presenter, and attendee. For more information, see [roles in a Teams meeting](https://support.microsoft.com/office/roles-in-a-teams-meeting-c16fa7d0-1666-4dde-8686-0a0bfe16e019).  
* There are various [user types](/microsoftteams/non-standard-users#:~:text=An%20anonymous%20user%20is%20a,their%20Microsoft%20or%20organization's%20account.) in a meeting: in-tenant, [guest](/microsoftteams/guest-access), [federated](/microsoftteams/manage-external-access), and anonymous users.

This article covers the information about meeting lifecycle and how to integrate tabs, bots, and message extensions. It identifies different participant roles and user types.

## Meeting lifecycle

A meeting lifecycle consists of pre-meeting, in-meeting, and post-meeting app experience. You can integrate tabs, bots, and message extensions in each stage of the meeting lifecycle.

> [!NOTE]
>
> * Apps for instant meetings, scheduled public channel meetings, one-on-one, and group calls are currently available only in [public developer preview](../resources/dev-preview/developer-preview-intro.md).
>
> * Meeting extensions such as bots, cards, message extensions, and message actions are supported in the web client. However, hosted experiences such as tabs, content bubbles, and share to stage are not currently fully supported.

### Integrate tabs into the meeting lifecycle

Tabs allow the team members to access services and content in a specific space within a meeting. The team works directly with tabs and has conversations about the tools and data available within tabs. In Teams meeting, you can add a tab by selecting :::image type="content" source="../assets/images/apps-in-meetings/plusbutton.png" alt-text="Screenshot is an example that shows plus button."::: and select the app that you want to install.

> [!IMPORTANT]
> We recommend you to follow the Teams [single sign-on (SSO) authentication flow for tabs](../tabs/how-to/authentication/tab-sso-overview.md), if you have integrated a tab app in your meeting.

> [!NOTE]
> Add app option for Teams meeting extension tab app is not supported in Teams web client.

#### Pre-meeting app experience

With the pre-meeting app experience, you can find and add meeting apps. You can also do pre-meeting tasks, such as developing a poll to survey the meeting participants.

#### To add tabs to an existing meeting

1. In your calendar, select a meeting to which you want to add a tab.
1. Select the **Details** tab and select :::image type="content" source="../assets/images/apps-in-meetings/plusbutton.png" alt-text="Screenshot showing the details tab.":::. The tab gallery appears.

    :::image type="content" source="~/assets/images/apps-in-meetings/pre-meeting.png" alt-text="Pre-meeting app experience.":::

1. In the tab gallery, select the app that you want to add and follow the steps as required. The app is installed as a tab.

   > [!NOTE]
   > You can also add a tab to an existing meeting using the meeting **Chat** tab.

# [Desktop](#tab/desktop)

:::image type="content" source="~/assets/images/apps-in-meetings/PreMeetingTab.png" alt-text="Tabs during a meeting.":::

# [Mobile](#tab/mobile)

After adding the tabs to an existing meeting on mobile, you can see the same apps in pre-meeting experience under **More** section of the meeting details.

:::image type="content" source="../assets/images/apps-in-meetings/mobile-post-meeting.png" alt-text="Screenshot is an example that shows mobile pre-meeting experience.":::

#### In-meeting app experience

With the in-meeting app experience, you can engage participants during the meeting by using apps and the in-meeting dialog box. Meeting apps are hosted on the toolbar of the meeting window as an in-meeting tab. Use the in-meeting dialog box to showcase actionable content for meeting participants. For more information, see [create apps for Teams meetings](create-apps-for-teams-meetings.md).

For mobile, meeting apps are available from **Apps** > ellipses &#x25CF;&#x25CF;&#x25CF; in the meeting. Select **Apps** to view all the apps available in the meeting.

For desktop, you can add apps during a meeting using **Add an app** :::image type="icon" source="../assets/icons/add-icon.png" border="false"::: option from the in-meeting window.

To use tabs during a meeting:

1. Go to Teams.
1. In your calendar, select a meeting in which you want to use a tab.
1. After entering the meeting, from the toolbar of the chat window, select the required app.
    An app is visible in a Teams meeting in the side panel or the in-meeting dialog box.
1. In the in-meeting dialog box, enter your response as feedback.

# [Desktop](#tab/desktop)

:::image type="content" source="~/assets/images/apps-in-meetings/desktop-in-meeting-dialog-view.png" alt-text="Desktop in-meeting view.":::

# [Mobile](#tab/mobile)

After entering the meeting and adding the app from desktop or web, the app is visible in mobile Teams meeting under the **Apps** section. Select **Apps** to show the list of apps. User can launch any of the apps as an in-meeting side panel of the app.

The in-meeting dialog box is displayed where you can enter your response as feedback.

:::image type="content" source="../assets/images/apps-in-meetings/mobile-in-meeting-dialog-view.png" alt-text="Screenshot is an example of mobile dialog box view.":::

> [!NOTE]
> You need not change the app manifest for the apps to work on mobile.

---

> [!NOTE]
>
> * Apps can leverage the Teams Client SDK to access the `meetingId`, `userMri`, and `frameContext` to render the experience appropriately.
> * If the in-meeting dialog box is rendered successfully, it sends a notification that the results are successfully downloaded.
> * Your app manifest specifies the places in which you want the apps to appear. This can be done by specifying context field in manifest. It is also the part of a share meeting stage experience, subject to specified [design guidelines](~\apps-in-teams-meetings\design\designing-apps-in-meetings.md).

The following image illustrates the in-meeting side panel:

# [Desktop](#tab/desktop)

:::image type="content" source="~/assets/images/apps-in-meetings/in-meeting-dialog1.png" alt-text="In-meeting side panel":::

# [Mobile](#tab/mobile)

:::image type="content" source="../assets/images/apps-in-meetings/sidepanelmobile.png" alt-text="Screenshot is an example of in-meeting side panel mobile.:::"

The following table describes the behavior of app when it is validated and not validated:

|App capability | App is validated | App isn't validated |
|---|---|---|
| Meeting extensibility | The app will appear in meetings. | The app won't appear in meetings for the mobile clients. |

For more information, see [store validation guidelines](../concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md).

#### Post-meeting app experience

With post-meeting app experience, you can view the results of the meeting, such as poll survey results or feedback. Select :::image type="icon" source="../assets/images/apps-in-meetings/plusbutton.png"::: to add a tab, get meeting notes, and see the results on which organizers and attendees must take action.

The following image displays the **Contoso** tab with results of poll and feedback received from meeting attendees:

# [Desktop](#tab/desktop)

:::image type="content" source="~/assets/images/apps-in-meetings/post.png" alt-text="Contoso tab with results.":::

# [Mobile](#tab/mobile)

:::image type="content" source="~/assets/images/apps-in-meetings/mobilepremeeting.png" alt-text="Post meeting app experience.":::

---

#### Apps in channel meeting

A public scheduled channel meeting has the same list of apps as its parent team. Installing an app to a channel meeting also makes it available in the parent team, and vice versa.

However, the tab instances in a channel meeting are separate from the tabs in the channel itself. For example, suppose a "Development" channel has a "Polly" tab. If you create a "Standup" meeting in that channel, that meeting would not have a "Polly" tab, until you explicitly [add the tab to the meeting](#to-add-tabs-to-an-existing-meeting).

In public scheduled channel meetings, after a meeting tab is added it can be accessed from the meeting details page by selecting on the meeting object. See the following example:

:::image type="content" source="~/assets/images/apps-in-meetings/after-a-meeting1.png" alt-text="After a meeting":::

### Integrate bots into the meeting lifecycle

Bots that are enabled in `groupchat` scope start functioning in meetings. To implement bots, start with [build a bot](../build-your-first-app/build-bot.md) and then continue with [create apps for Teams meetings](../apps-in-teams-meetings/API-references.md#meeting-apps-api-references).

### Integrate message extensions into the meeting lifecycle

To implement message extension, start with [build a message extension](../messaging-extensions/how-to/create-messaging-extension.md), and then continue with [create apps for Teams meetings](../apps-in-teams-meetings/API-references.md#meeting-apps-api-references).

The Teams unified meetings apps allow you to design your app based on participant roles in a meeting.

## Participant roles in a meeting

:::image type="content" source="~/assets/images/apps-in-meetings/participant-roles.png" alt-text="Participant roles in a meeting.":::

The default participant settings are determined by an organization's IT administrator. The following are the participant roles in a meeting:

* **Organizer**: Organizer schedules a meeting, sets the meeting options, assigns meeting roles, and starts the meeting. Only users with Microsoft 365 account and Teams license can be organizers, and control attendee permissions. A meeting organizer can change the settings for a specific meeting. Organizers can make these changes on the **Meeting options** web page.
* **Presenter**: Presenters have same capabilities of organizers with exclusions. A presenter can't remove an organizer from the session or modify meeting options for the session. By default, participants joining a meeting have the presenter role.
* **Attendee**: An attendee is invited to attend a meeting but can't act as a presenter. Attendees can interact with other meeting members but can't manage any of the meeting settings or share the content.

> [!NOTE]
> Only an organizer or presenter can add, remove, or uninstall apps.

For more information, see [roles in a Teams meeting](https://support.microsoft.com/office/roles-in-a-teams-meeting-c16fa7d0-1666-4dde-8686-0a0bfe16e019).

After you design your app based on participant roles in a meeting, you can identify each user type for meetings and select what they can access.​

## User types in a meeting

User types, such as in-tenant, guest, federated or external user in a meeting can do one of the [participant roles in a meeting](#participant-roles-in-a-meeting).

> [!NOTE]
> The user type is not included in the **getParticipantRole** API.

User types, such as, organizer, presenter, or attendee in a meeting can be [a participant in a meeting](#participant-roles-in-a-meeting).

The following list details the various user types along with their accessibility and performance:

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

The following table provides the user types and lists the features that each user can access in meetings:

| User type | Tabs | Bots | Message extensions | Adaptive Cards | Task modules | In-meeting dialog | Meeting stage |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| Anonymous user | Not available | Not available | Not available | Interactions in the meeting chat are allowed. | Not available | Not available | Not available |
| Guest, part of the tenant Azure AD | Interaction is allowed. Create, update, and delete aren't allowed. | Not available | Not available | Interactions in the meeting chat are allowed. | Interactions in the meeting chat from Adaptive Card are allowed. | Available | Can start, view, and interact with app on the meeting stage only on Teams desktop client  and Teams mobile. |
| Federated users, for more information, see [non-standard users](/microsoftteams/non-standard-users). | Interaction is allowed in scheduled meetings. Create, update, and delete aren't allowed. | Interaction is allowed. Acquire, update, and delete aren't allowed. | Not available | Interactions in the meeting chat are allowed. | Interactions in the meeting chat from Adaptive Card are allowed. | Not available | Can start, view, and interact with app on the meeting stage only on Teams desktop client and Teams mobile. |

> [!NOTE]
>
> The behavior of the various user types for apps in calls is identical to their behavior in scheduled meetings with the exception of the following:
>
> * Federated users can't interact with tab apps in calls.
> * If federated users are added to an existing call with in-tenant or guest users, then all participants lose the ability to add, update, or remove apps. However, only the existing in-tenant or guest users would be able to still interact with the apps that were added before inviting federated users to the call.
> * On mobile, anonymous users will not be able to access apps in scheduled public channel meetings.

## Next step

> [!div class="nextstepaction"]
> [Prerequisites and API references for apps in Teams meetings](create-apps-for-teams-meetings.md)

## See also

* [Tab](../tabs/what-are-tabs.md#understand-how-tabs-work)
* [Bot](../bots/what-are-bots.md)
* [Message extension](../messaging-extensions/what-are-messaging-extensions.md)
* [Design your app](../apps-in-teams-meetings/design/designing-apps-in-meetings.md)
* [Microsoft Teams meeting attendance report](/microsoftteams/teams-analytics-and-reports/meeting-attendance-report)
* [Set up the meeting recording option for OneDrive for Business and SharePoint](/MicrosoftTeams/tmr-meeting-recording-change#set-up-the-meeting-recording-option-for-onedrive-for-business-and-sharepoint)
