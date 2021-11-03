---
title: Enable and configure your apps for Teams meetings
author: surbhigupta
description: Enable and configure your apps for Teams meetings 
ms.topic: conceptual
---

# Enable and configure your apps for Teams meetings

Every team has a different way of communicating and collaborating tasks. You can achieve these different tasks by customizing Teams with apps for meetings. To customize and to achieve different tasks, you must enable your apps for Teams meetings and configure your apps to be available in meeting scope within their app manifest.

## Enable your app for Teams meetings

To enable your app for Teams meetings, you must update your app manifest and use the context properties to determine where your app must appear.

### Update your app manifest

The meetings app capabilities are declared in your app manifest using the `configurableTabs`, `scopes`, and `context` arrays. Scope defines to whom and context defines where your app is available.

> [!NOTE]
> * Try updating your app manifest with the [manifest schema](../resources/schema/manifest-schema-dev-preview.md).
> * Apps in meetings require groupchat scope. The team scope works for tabs in channels only.

The app manifest must include the following code snippet:

```json

"configurableTabs": [
    {
      "configurationUrl": "https://contoso.com/teamstab/configure",
      "canUpdateConfiguration": true,
      "scopes": [
        "team",
        "groupchat"
      ],
      "context":[
        "channelTab",
        "privateChatTab",
        "meetingChatTab",
        "meetingDetailsTab",
        "meetingSidePanel",
        "meetingStage"
     ]
    }
  ]
```

> [!NOTE]
> `meetingStage` is currently available in [developer preview](../resources/dev-preview/developer-preview-intro.md) only.

### Context property

The `context` property determines what must be shown when a user invokes an app in a meeting depending on where the user invokes the app. The tab `context` and `scopes` properties enable you to determine where your app must appear. Tabs in the `team` or `groupchat` scope can have more than one context. Following are the values for the `context` property from which you can use all or some of the values:

|Value|Description|
|---|---|
| **channelTab** | A tab in the header of a team channel. |
| **privateChatTab** | A tab in the header of a group chat between a set of users, not in the context of a team or meeting. |
| **meetingChatTab** | A tab in the header of a group chat between a set of users in the context of a scheduled meeting. |
| **meetingDetailsTab** | A tab in the header of the meeting details view of the calendar. |
| **meetingSidePanel** | An in-meeting panel opened through the unified bar (U-bar). |
| **meetingStage** | An app from the meetingSidePanel can be shared to the meeting stage. |

> [!NOTE]
> `Context` property is currently not supported on mobile clients.

After you enable your app for Teams meetings, you must configure your app before a meeting, during a meeting, and after a meeting.

## Configure your app for meeting scenarios

> [!NOTE]
> * For your app to be visible in the tab gallery, it must support configurable tabs and the group chat scope.
> * Mobile clients support tabs only in pre and post meeting stages.
> * The in-meeting experiences that is in-meeting dialog box and tab is currently not supported on mobile clients. For more information, see [guidance for tabs on mobile](../tabs/design/tabs-mobile.md) while creating your tabs for mobile.

Teams meetings provides a unique collaborative experience for your organization. It provides the opportunity to configure your app for different meeting scenarios. You can configure your apps to enhance the meeting experience based on participant role or user type. Now you can identify what actions can be taken in the following meeting scenarios:
* [Pre-meeting](#pre-meeting)
* [In-meeting](#in-meeting)
* [Post-meeting](#post-meeting)

### Pre-meeting

Before a meeting, users can add tabs, bots, and messaging extensions. Users with organizer and presenter roles can add tabs to a meeting.

**To add a tab to a meeting**

1. In your calendar, select a meeting to which you want to add a tab.
1. Select the **Details** tab and select <img src="~/assets/images/apps-in-meetings/plusbutton.png" alt="Plus button" width="30"/>.

    ![Pre-meeting experience](../assets/images/apps-in-meetings/PreMeeting.png)

1. In the tab gallery that appears, select the app that you want to add and follow the steps as required. The app is installed as a tab.

    > [!NOTE]
    > Currently, in meetings tab, getting meeting details and participant information is not supported.

**To add a messaging extension to a meeting**

1. Select the ellipses &#x25CF;&#x25CF;&#x25CF; located in the compose message area in the chat.
1. Select the app that you want to add and follow the steps as required. The app is installed as a messaging extension.

**To add a bot to a meeting**

In a meeting chat, enter the **@** key and select **Get bots**.

> [!NOTE]
> * The user identity must be confirmed using [Tabs SSO](../tabs/how-to/authentication/auth-aad-sso.md). After authentication, the app can retrieve the user role using the `GetParticipant` API.
> * Based on the user role, the app has the capability to provide role specific experiences. For example, a polling app allows only organizers and presenters to create a new poll.
> * Role assignments can be changed while a meeting is in progress. For more information, see [roles in a Teams meeting](https://support.microsoft.com/office/roles-in-a-teams-meeting-c16fa7d0-1666-4dde-8686-0a0bfe16e019).

### In-meeting

During a meeting, you can use the meetingSidePanel or the in-meeting dialog box to build unique experiences for your apps.

#### meetingSidePanel

With the meetingSidePanel, you can customize experiences in a meeting that enable organizers and presenters to have different set of views and actions. In your app manifest, you must add meetingSidePanel to the context array. In the meeting and in all scenarios, the app is rendered in an in-meeting tab that is 320 pixels in width. For more information, see [FrameContext interface](/javascript/api/@microsoft/teams-js/microsoftteams.framecontext?view=msteams-client-js-latest&preserve-view=true).

To use the `userContext` API to route requests accordingly, see [Teams SDK](../tabs/how-to/access-teams-context.md#user-context). For more information, see [Teams authentication flow for tabs](../tabs/how-to/authentication/auth-flow-tab.md). Authentication flow for tabs is very similar to the authentication flow for websites. So tabs can use OAuth 2.0 directly. For more information, see [Microsoft identity platform and OAuth 2.0 authorization code flow](/azure/active-directory/develop/v2-oauth2-auth-code-flow).

Messaging extension works as expected when a user is in an in-meeting view, and the user can post compose message extension cards. AppName in-meeting is a tooltip that states the app name in-meeting U-bar.

> [!NOTE]
> Use version 1.7.0 or higher of [Teams SDK](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true), as versions prior to it do not support the side panel.

#### In-meeting dialog box

The in-meeting dialog box can be used to engage participants during the meeting and collect information or feedback during the meeting. Use the [`NotificationSignal`](create-apps-for-teams-meetings.md#notificationsignal-api) API to signal that a bubble notification must be triggered. As part of the notification request payload, include the URL where the content to be shown is hosted.

In-meeting dialog must not use task module. Task module is not invoked in a meeting chat. An external resource URL is used to display content bubble in a meeting. You can use the `submitTask` method to submit data in a meeting chat.

> [!NOTE]
> * You must invoke the [submitTask()](../task-modules-and-cards/task-modules/task-modules-bots.md#submitting-the-result-of-a-task-module) function to dismiss automatically after a user takes an action in the web view. This is a requirement for app submission. For more information, see [Teams SDK task module](/javascript/api/@microsoft/teams-js/microsoftteams.tasks?view=msteams-client-js-latest#submittask-string---object--string---string---&preserve-view=true).
> * If you want your app to support anonymous users, your initial invoke request payload must rely on the `from.id` request metadata in the `from` object, not the `from.aadObjectId` request metadata. `from.id` is the user ID and `from.aadObjectId` is the Azure Active Directory (AAD) ID of the user. For more information, see [using task modules in tabs](../task-modules-and-cards/task-modules/task-modules-tabs.md) and [create and send the task module](../messaging-extensions/how-to/action-commands/create-task-module.md?tabs=dotnet#the-initial-invoke-request).

#### Share to stage

> [!NOTE]
> * This capability is currently available in [developer preview](../resources/dev-preview/developer-preview-intro.md) only.
> * To use this feature, the app must support an in-meeting meetingSidePanel.

This capability gives developers the ability to share an app to the meeting stage. By enabling share to the meeting stage, meeting participants can collaborate in real-time.

The required context is `meetingStage` in the app manifest. A prerequisite for this is to have the `meetingSidePanel` context. This enables **Share** in the meetingSidePanel.

![Share to stage during meeting experience](~/assets/images/apps-in-meetings/share_to_stage_during_meeting.png)

The manifest change that is needed to enable this capability is as follows:

```json
"configurableTabs": [
    {
      "configurationUrl": "https://contoso.com/teamstab/configure",
      "canUpdateConfiguration": true,
      "scopes": [
        "groupchat"
      ],
      "context":[
        "meetingSidePanel",
        "meetingStage"
     ]
    }
  ]
```

### Post-meeting

The post-meeting and [pre-meeting](#pre-meeting) configurations are the same.

## Code sample

|Sample name | Description | Sample |
|----------------|-----------------|--------------|----------------|-----------|
| Meeting app | Demonstrates how to use the Meeting Token Generator app to request a token, which is generated sequentially so that each participant has a fair opportunity to interact. This can be useful in situations like scrum meetings, Q&A sessions, and so on. | [View](https://github.com/OfficeDev/microsoft-teams-sample-meetings-token) |

## See also

* [In-meeting dialog design guidelines](design/designing-apps-in-meetings.md#use-an-in-meeting-dialog)
* [Teams authentication flow for tabs](../tabs/how-to/authentication/auth-flow-tab.md)
* [Add apps to meetings via Microsoft Graph](/graph/api/chat-post-installedapps.md)