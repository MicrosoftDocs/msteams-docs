---
title: Build tabs for meeting
author: surbhigupta
description: Learn how to build a tab for a meeting chat, meeting side panel, and meeting stage in Microsoft Teams meeting, and app caching in meeting.
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
ms.date: 04/07/2022
---

# Build tabs for meeting

Every team has a different way of communicating and collaborating tasks. To achieve these different tasks, customize Teams with apps for meetings. Enable your apps for Teams meetings and configure the apps to be available in the meeting scope within their app manifest.

## Tabs in Teams meetings

Tabs allow the meeting participants to access services and content in a specific space within a meeting. If you're new to Microsoft Teams tab development, see [build tabs for Teams](/microsoftteams/platform/tabs/what-are-tabs).

Before creating a meeting tab, it's important to learn about the surfaces that are available to target the meeting chat view, meeting details view, meeting side panel view, and meeting stage view.

### Meeting details view

1. In your calendar, select a meeting to which you want to add a tab.
1. Select the **Details** tab and select :::image type="icon" source="../assets/icons/add-icon.png" Border = "false":::. The app gallery appears.

   :::image type="content" source="~/assets/images/apps-in-meetings/pre-meeting-002.png" alt-text="This screenshot shows the pre-meeting app experience in Teams meeting.":::

1. In the app gallery, select the app that you want to add and follow the steps as required. The tab is added to the meeting details page.

# [Desktop](#tab/desktop)

The following image shows a tab added to the meeting details page in the Teams desktop client:

   :::image type="content" source="~/assets/images/apps-in-meetings/premeetingtab.png" alt-text="The screenshot shows desktop Teams tabs in the meeting details view in the Teams meeting.":::

# [Mobile](#tab/mobile)

The following image shows a tab added to the meeting details page in the Teams mobile client:

   :::image type="content" source="../assets/images/mobile-tab.png" alt-text="Screenshot shows mobile Teams tabs in the meeting details view in the Teams meeting.":::

---

### Meeting chat view

1. From the Teams chat panel, select the meeting chat view.

1. Select :::image type="icon" source="../assets/icons/add-icon.png" Border = "false"::: and the app gallery appears.

1. In the app gallery, select the app that you want to add and follow the steps as required. The tab is added to the meeting chat.

# [Meeting chat view desktop](#tab/meeting-chat-view-desktop)

   The following image shows an app added to the meeting chat in the Teams desktop client:

   :::image type="content" source="../assets/images/apps-in-meetings/meeting-chat-view.png" alt-text="The screenshot shows the meeting chat view in a meeting chat in Teams desktop.":::

# [Meeting chat view mobile](#tab/meeting-chat-view-mobile)

   The following image shows an app added to the meeting chat in the Teams mobile client:

  :::image type="content" source="../assets/images/apps-in-meetings/meeting-chat-view-mobile.png" alt-text="The screenshot shows the meeting chat view in a meeting chat in Teams mobile.":::

---

### Meeting side panel view

1. During a meeting, you can select :::image type="icon" source="../assets/icons/add-icon.png" Border = "false"::: **Apps** from Teams meeting window to add apps to the meeting.

   :::image type="content" source="../assets/images/apps-in-meetings/add-app.png" alt-text="Screenshot shows how to add an app in Teams meeting window.":::

1. In the app gallery, select the app that you want to add and follow the steps as required. The app is added to the meeting side panel.

   :::image type="content" source="../assets/images/side-panel-view.png" alt-text="Screenshot shows side panel view with the list of apps.":::

### Meeting stage view

1. After a tab is added to the meeting side panel, you can now choose to opt into global app sharing.

1. This results in rendering tab on the stage for every participant in the meeting.

# [Meeting stage view desktop](#tab/meeting-stage-view-desktop)

   The following image shows a tab added to the meeting stage in the Teams desktop client:

   :::image type="content" source="../assets/images/meeting-stage-view.png" alt-text="This screenshot shows meeting stage view of the app you shared to meeting in Teams desktop.":::

# [Meeting stage view mobile](#tab/meeting-stage-view-mobile)

   The following image shows a tab added to the meeting stage in the Teams mobile client:

   :::image type="content" source="../assets/images/meeting-stage/meeting-stage-view-mobile.png" alt-text="This screenshot shows meeting stage view of the app you shared to meeting in Teams mobile.":::

---

### Apps in channel meeting

A public scheduled channel meeting has the same list of apps as its parent team. Installing an app to a channel meeting also makes it available in the parent team, and vice versa.

However, the tab instances in a channel meeting are separate from the tabs in the channel itself. For example, suppose a *Development* channel has a *Polly* tab. If you create a *Standup* meeting in that channel, that meeting wouldn't have a *Polly* tab, until you explicitly [add the tab to the meeting](#meeting-details-view).

# [Channel meeting desktop](#tab/channel-meeting-desktop)

   The following image shows apps in a channel in the Teams desktop client:

   :::image type="content" source="../assets/images/apps-in-meetings/apps-in-channel-meeting-desktop.png" alt-text="This screenshot shows a tab added to a channel meeting in Teams desktop.":::

# [Channel meeting mobile](#tab/channel-meeting-mobile)

   The following image shows apps in a channel in the Teams mobile client:

   :::image type="content" source="../assets/images/apps-in-meetings/apps-in-channel-meeting-mobile.png" alt-text="This screenshot shows a tab added to a channel meeting in Teams mobile.":::

---

In public scheduled channel meetings, after a meeting tab is added, you can select the meeting object in the meeting details page to access the tab.

:::image type="content" source="~/assets/images/apps-in-meetings/after-a-meeting1.png" alt-text="Screenshot shows the selection of the meeting object.":::

> [!NOTE]
> On mobile, anonymous users can't access apps in scheduled public channel meetings.

### Advanced tab APIs

TeamsJS is a rich library used to create Tabs using JavaScript. Use the latest TeamsJS (V.2.0 or later) to work in Teams, Microsoft 365 app, and Outlook. For more information, see [Teams JavaScript client library](/microsoftteams/platform/tabs/how-to/using-teams-client-library).

### Frame context

Microsoft Teams JavaScript library exposes the frameContext in which your meeting tab URL is loaded in the getContext API. The possible values of frameContext are content, task, setting, remove, sidePanel, and meetingStage. This allows you to build customized experiences based on where the app renders. For example, showing a specific collaboration focused UI when in the `meetingStage` and a different meeting preparation UI in the chat tab (`content`). For more information, see [getContext API](/microsoftteams/platform/tabs/how-to/access-teams-context?tabs=teamsjs-v2).

## Enable your tabs for Teams meeting

Update your [app manifest](/microsoftteams/platform/resources/schema/manifest-schema) with relevant context property to configure the different tab views. The meetings app capabilities are declared in your app manifest using the scopes and context arrays under the `configurableTabs` section.

### Scope

The scope defines who can access the apps.

* `groupchat` scope makes your app available in a group scope and enables the app to be added in a call or meeting (scheduled private meeting or instant meetings).

* `team` scope makes your app available in a team scope and enables your app to be added in team or channel or scheduled channel meeting.

### Context

The `context` property determines if the app is available in specific view after installation and configuration. Following are the values for the `context` property from which you can use all or some of the values:

|Value|Description|
|---|---|
| **channelTab** | A tab in the header of a team channel. |
| **privateChatTab** | A tab in the header of a group chat between a set of users, not in the context of a team or meeting. |
| **meetingChatTab** | A tab in the header of a group chat between a set of users for a scheduled meeting. You can specify either `meetingChatTab` or `meetingDetailsTab` to ensure the apps work in mobile. |
| **meetingDetailsTab** | A tab in the header of the meeting details view of the calendar. You can specify either `meetingChatTab` or `meetingDetailsTab` to ensure the apps work in mobile. |
| **meetingSidePanel** | An in-meeting panel opened through the unified bar (U-bar). |
| **meetingStage** | An app from the `meetingSidePanel` can be shared to the meeting stage. You can't use this app either in Teams room clients. |

### Configure tab app for a meeting

Apps in meetings can use the following contexts: `meetingChatTab`, `meetingDetailsTab`, `meetingSidePanel`, and `meetingStage`. After a meeting participant installs an app and configures the tab in meeting, all the targeted other contexts of the app for the given meeting starts to render the tab.

The following code snippet is an example of a configurable tab used in an app for Teams meetings:

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

---

### Other examples

Default context for tabs (if not specified) is:  

```json
"context":[ 
  "channelTab", 
  "privateChatTab", 
  "meetingChatTab", 
  "meetingDetailsTab" 
     ] 
```

To prevent an app from showing in non-meeting group chats, you must set the following context:

```json
"context":[ 
  "meetingSidePanel", 
  "meetingChatTab", 
  "meetingDetailsTab" 
     ] 
```

For in-meeting side panel experience only:  

```json
"context":[ 
  "meetingSidePanel" 
     ] 
```

## Feature compatibility by user types

The following table provides the user types and lists the features that each user can access the tabs in meetings:

| User type | Scheduled meeting or Instant calendar meeting | One-on-one call | Group call | Scheduled channel meeting |
| :-- | :-- | :-- | :-- | :-- |
| In-tenant | Interaction allowed for all roles.<br><br> Create, update, or delete is allowed for all except the Attendees. | Interaction and create, update, or delete allowed. <br><br> In-tenant users in call with federated users can't interact and create, update, or delete. | Interaction and create, update, or delete allowed.<br><br> In-tenant users in call with federated users can't interact and create, update, or delete. | Interaction and create, update, or delete allowed for all roles except for attendees. |
| Guest | Can interact only | Can interact only | Can interact only | Can interact only |
| Federated or External | Can interact only | Not available | Not available | Can interact only |
| Anonymous | Can interact only | Not available | Not available | Not available |

## Code sample

|Sample name | Description | .NET | Node.js | Manifest|
|----------------|--------------------------------------------------------|--------------|----------------|----------------|
| Meeting app | Demonstrates how to use the Meeting Token Generator app to request a token. The token is generated sequentially so that each participant has a fair opportunity to contribute in a meeting. The token is useful in situations like scrum meetings and Q&A sessions. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-token-app/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-token-app/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-token-app/csharp/demo-manifest/meetings-token-app.zip)|
| Meeting stage sample | Sample app to show a tab in meeting stage for collaboration. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-stage-view/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-stage-view/nodejs) ||
| Meeting side panel | Sample app to show how to add agenda in a meeting side panel. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-sidepanel/csharp) |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-sidepanel/nodejs) ||
| In-meeting notification | Demonstrates how to implement in-meeting notification using bot. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-events/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-events/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-events/csharp/demo-manifest/Meetings-Events.zip)|
| In-meeting document signing | Demonstrates how to implement a document signing Teams app. Includes sharing specific app content to stage, Teams SSO and user specific stage view. | [View](https://github.com/officedev/microsoft-teams-samples/tree/main/samples/meetings-share-to-stage-signing/csharp) | NA ||
| App caching | Sample app to show how app caching works in the meeting side panel. | NA | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-cache-meetings/nodejs) ||
| Meeting tabs | This sample shows app stage view, Mute/Unmute Teams meeting audio call in meeting Side panel tab. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meeting-tabs/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meeting-tabs/nodejs) ||

> [!NOTE]
>
> * Meeting apps (side panel and meeting stage) are supported in Teams desktop and mobile clients.
> * Meeting apps (side panel and meeting stage) in Teams web client is supported only when the [developer preview is enabled](/microsoftteams/platform/resources/dev-preview/developer-preview-intro#enable-developer-preview).

## Step-by-step guides

* Follow the [step-by-step guide](../sbs-meeting-token-generator.yml) to generate meeting token in your Teams meeting.
* Follow the [step-by-step guide](../sbs-meetings-sidepanel.yml) to generate meeting side panel in your Teams meeting.
* Follow the [step-by-step guide](../sbs-meetings-stage-view.yml) to share meeting stage view in your Teams meeting.
* Follow the [step-by-step guide](../sbs-meeting-content-bubble.yml) to generate in-meeting notification in your Teams meeting.

## See also

* [Apps for Teams meetings and calls](teams-apps-in-meetings.md)
* [Design your Microsoft Teams meeting extension](design/designing-apps-in-meetings.md)
* [Enable SSO for tab app](../tabs/how-to/authentication/tab-sso-overview.md)
* [Add apps to meetings using Microsoft Graph](/graph/api/chat-post-installedapps?view=graph-rest-1.0&tabs=http&preserve-view=true)
* [Get change notifications for Microsoft Teams meeting call updates](/graph/changenotifications-for-onlinemeeting)
