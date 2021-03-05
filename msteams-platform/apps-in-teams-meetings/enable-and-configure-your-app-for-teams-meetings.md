---
title: Enable and configure your apps for Teams meetings
author: laujan
description: Enable and configure your apps for Teams meetings 
ms.topic: conceptual
---

# Enable and configure your apps for Teams meetings

Every team has a different way of communicating and collaborating on tasks. You can achieve these different tasks by customizing Teams with apps for meetings. You can enable your apps for Teams meetings by updating your app manifest and you can also configure your apps for meeting scenarios.

This document covers the following:
* [Enable your app for Teams meetings](#enable-your-app-for-teams-meetings)
* [Configure your app for meeting scenarios](#configure-your-app-for-meeting-scenarios)
* [Refer to the meeting app sample](#refer-to-the-meeting-app-sample)

## Enable your app for Teams meetings

To enable your app for Teams meetings, you must update your app manifest and use the context properties to determine where your app must appear.

### Update your app manifest

The meetings app capabilities are declared in your app manifest using the **configurableTabs** -> **scopes** and **context** arrays. Scope defines to whom and context defines where your app is available.

> [!NOTE]
> Please use [developer preview manifest schema](../resources/schema/manifest-schema-dev-preview.md) to try this in your app manifest.

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
        "meetingSidePanel"
     ]
    }
  ]
```

### Context property

The tab `context` and `scopes` properties enable you to determine where your app must appear. Tabs in the `team` or `groupchat` scope can have more than one context. The following are the possible values for the `context` property:

|Value|Description|
|---|---|
| **channelTab** | A tab in the header of a team channel. |
| **privateChatTab** | A tab in the header of a group chat between a set of users not in the context of a team or meeting. |
| **meetingChatTab** | A tab in the header of a group chat between a set of users in the context of a scheduled meeting. |
| **meetingDetailsTab** | A tab in the header of the meeting details view of the calendar. |
| **meetingSidePanel** | An in-meeting panel opened via the unified bar (U-bar). |

> [!NOTE]
> `Context` property is currently not supported and is ignored on mobile clients.

After you enable your app for Teams meetings, you must configure your app before a meeting, during a meeting, and after a meeting.

## Configure your app for meeting scenarios

> [!NOTE]
> * For your app to be visible in the tab gallery it must **support configurable tabs** and the **group chat scope**.
> * Mobile clients support tabs only in pre and post meeting stages. The in-meeting experiences that is in-meeting dialog and tab on mobile are currently not available. Follow the [guidance for tabs on mobile](../tabs/design/tabs-mobile.md) when creating your tabs for mobile.

Teams meetings provides a unique collaborative experience for your organization. It provides the opportunity to configure your app for different meeting scenarios such as before a meeting you can add tabs, bots and messaging extensions.

### Before a meeting

Before a meeting, you can add tabs, bots and messaging extensions to a meeting. Users with organizer and presenter roles add tabs to a meeting using the plus ➕ button in the meeting **Chat** and meeting **Details** pages. Messaging extensions are added using the ellipses or overflow menu &#x25CF;&#x25CF;&#x25CF; located in the compose message area in the chat. Bots are added to a meeting chat using the **@** key and selecting **Get bots**.

✔ The user identity must be confirmed using [Tabs SSO](../tabs/how-to/authentication/auth-aad-sso.md). After authentication, the app can retrieve the user role using the `GetParticipant` API.

 ✔ Based on the user role, the app has the capability to provide role specific experiences. For example, a polling app allows only organizers and presenters to create a new poll.

> [!NOTE]
> Role assignments can be changed while a meeting is in progress. For more information, see [roles in a Teams meeting](https://support.microsoft.com/office/roles-in-a-teams-meeting-c16fa7d0-1666-4dde-8686-0a0bfe16e019).

### During a meeting

During a meeting, you can use the sidePanel or the In-meeting dialog box to build unique experiences for your apps.

#### sidePanel

With the sidePanel, you can customize experiences in a meeting that enable organizers and presenters to have different set of views and actions.

✔ In your app manifest, add **sidePanel** to the **context** array.

✔ In the meeting and in all scenarios, the app is rendered in an in-meeting tab that is 320 pixels in width. Your tab must be optimized for this. For more information, see [FrameContext interface](https://docs.microsoft.com/javascript/api/@microsoft/teams-js/framecontext?view=msteams-client-js-latest&preserve-view=true
).

✔ See [Teams SDK](../tabs/how-to/access-teams-context.md#user-context) to use the `userContext` API to route requests accordingly.

✔ See [Teams authentication flow for tabs](../tabs/how-to/authentication/auth-flow-tab.md). Authentication flow for tabs is very similar to the auth flow for websites. So tabs can use OAuth 2.0 directly. See, [Microsoft identity platform and OAuth 2.0 authorization code flow](/azure/active-directory/develop/v2-oauth2-auth-code-flow).

✔ Messaging extension works as expected when a user is in an in-meeting view and the user can post compose message extension cards.

✔ AppName in-meeting is a tooltip that states the app name in-meeting U-bar.

#### In-meeting dialog box

The in-meeting dialog box can be used to engage participants during the meeting and collect information or feedback during the meeting.

✔ You must follow the [in-meeting dialog design guidelines](design/designing-apps-in-meetings.md#use-an-in-meeting-dialog).

✔ See [Teams authentication flow for tabs](../tabs/how-to/authentication/auth-flow-tab.md).

✔ Use the [`NotificationSignal`](/graph/api/resources/notifications-api-overview?view=graph-rest-beta&preserve-view=true) API to signal that a bubble notification must be triggered.

✔ As part of the notification request payload, include the URL where the content to be shown is hosted.

✔ In-meeting dialog must not use task module.

> [!NOTE]
>
> * You must invoke the [submitTask()](../task-modules-and-cards/task-modules/task-modules-bots.md#submitting-the-result-of-a-task-module) function to dismiss automatically after a user takes an action in the web-view. This is a requirement for app submission. For more information, see [Teams SDK: task module](/javascript/api/@microsoft/teams-js/microsoftteams.tasks?view=msteams-client-js-latest#submittask-string---object--string---string---&preserve-view=true).
> * If you want your app to support anonymous users, your initial invoke request payload must rely on the `from.id` request metadata in the `from` object, not the `from.aadObjectId` request metadata. `from.id` is the user ID and `from.aadObjectId` is the Azure Active Directory ID of the user. For more information, see [using task modules in tabs](../task-modules-and-cards/task-modules/task-modules-tabs.md) and [create and send the task module](../messaging-extensions/how-to/action-commands/create-task-module.md?tabs=dotnet#the-initial-invoke-request).

### After a meeting

The post-meeting and pre-meeting configurations are the same.

## Refer to the meeting app sample

 > [!div class="nextstepaction"]
> [Meeting token generator app](https://github.com/OfficeDev/microsoft-teams-sample-meetings-token)