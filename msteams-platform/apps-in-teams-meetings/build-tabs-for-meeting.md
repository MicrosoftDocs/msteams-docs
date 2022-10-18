---
title: Build tabs for meeting
author: surbhigupta
description: Learn how to build a tabs for a meeting chat, meeting side panel and meeting stage in Microsoft Teams meeting.
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
ms.date: 04/07/2022
---

# Build tabs for meeting

Every team has a different way of communicating and collaborating tasks. To achieve these different tasks, customize Teams with apps for meetings. Enable your apps for Teams meetings and configure the apps to be available in the meeting scope within their app manifest.

## Tabs in Teams meetings

Tabs allow the meeting participants to access services and content in a specific space within a meeting. If you're new to Microsoft Teams tab development, see [Build tabs for Teams](/microsoftteams/platform/tabs/what-are-tabs).

Before creating a meeting tab, it's important to learn about the surfaces that are available to target the meeting chat view, meeting details view, meeting side panel view and meeting stage view.

### Meeting details view

1. In your calendar, select a meeting to which you want to add a tab.
1. Select the **Details** tab and select :::image type="icon" source="../assets/icons/add-icon.png" Border = "false":::. The app gallery appears.

   :::image type="content" source="~/assets/images/apps-in-meetings/Pre-Meeting-002.png" alt-text="This screenshot shows the pre-meeting app experience in Teams meeting.":::

1. In the app gallery, select the app that you want to add and follow the steps as required. The tab is added to the meeting details page.

# [Desktop](#tab/desktop)

The following image shows a tab added to the meeting details page in the Teams desktop client:

   :::image type="content" source="~/assets/images/apps-in-meetings/PreMeetingTab.png" alt-text="The screenshot shows desktop Teams tabs in the meeting details view in the Teams meeting.":::

# [Mobile](#tab/mobile)

The following image shows a tab added to the meeting details page in the Teams mobile client:

   :::image type="content" source="../assets/images/mobile-tab.png" alt-text="The screenshot shows mobile Teams tabs in the meeting details view in the Teams meeting.":::

---

### Meeting chat view

1. From the Teams chat panel, select the meeting chat view.

1. Select :::image type="icon" source="../assets/icons/add-icon.png" Border = "false"::: and the app gallery appears.

1. In the app gallery, select the app that you want to add and follow the steps as required. The tab is added to the meeting chat.

   :::image type="content" source="../assets/images/apps-in-meetings/meeting-chat-view.png" alt-text="The screenshot shows the meeting chat view in the Teams meeting.":::

### Meeting side panel view

1. During a meeting, you can select :::image type="icon" source="../assets/icons/add-icon.png" Border = "false"::: **Apps** from Teams meeting window to add apps to the meeting.

   :::image type="content" source="../assets/images/apps-in-meetings/add-app.png" alt-text="This screenshot shows how to add an app in Teams meeting window.":::

1. In the app gallery, select the app that you want to add and follow the steps as required. The app is added to the meeting side panel.

   :::image type="content" source="../assets/images/side-panel-view.png" alt-text="This screenshot shows side panel view with the list of apps.":::

### Meeting stage view

1. After a tab is added to the meeting side panel, you can now choose to opt into global app sharing.

1. This results in rendering tab on the stage for every participant in the meeting.

   :::image type="content" source="../assets/images/meeting-stage-view.png" alt-text="This screenshot shows meeting stage view of the app you shared to meeting.":::

### Apps in channel meeting

A public scheduled channel meeting has the same list of apps as its parent team. Installing an app to a channel meeting also makes it available in the parent team, and vice versa.

However, the tab instances in a channel meeting are separate from the tabs in the channel itself. For example, suppose a *Development* channel has a *Polly* tab. If you create a *Standup* meeting in that channel, that meeting would not have a *Polly* tab, until you explicitly [add the tab to the meeting](#meeting-details-view).

In public scheduled channel meetings, after a meeting tab is added, you can select the meeting object in the meeting details page to access the tab.

:::image type="content" source="~/assets/images/apps-in-meetings/after-a-meeting1.png" alt-text="After a meeting":::

> [!NOTE]
> On mobile, anonymous users can't access apps in scheduled public channel meetings.

### App manifest settings for Tabs in meeting

Update your [app manifest](/microsoftteams/platform/resources/schema/manifest-schema) with relevant context property to configure the different tab views. The meetings app capabilities are declared in your app manifest using the scopes and context arrays under the configurableTabs section.

#### Scope

The scope defines who can access the apps.

* `groupchat` scope makes your app available in a group scope and enables the app to be added in a call or meeting (scheduled private meeting or instant meetings).

* `team` scope makes your app available in a team scope and enables your app to be added in team or channel or scheduled channel meeting.

#### Context

The `context` property determines if the app is available in specific view after installation and configuration. Following are the values for the `context` property from which you can use all or some of the values:

|Value|Description|
|---|---|
| **channelTab** | A tab in the header of a team channel. |
| **privateChatTab** | A tab in the header of a group chat between a set of users, not in the context of a team or meeting. |
| **meetingChatTab** | A tab in the header of a group chat between a set of users for a scheduled meeting. You can specify either **meetingChatTab** or **meetingDetailsTab** to ensure the apps work in mobile. |
| **meetingDetailsTab** | A tab in the header of the meeting details view of the calendar. You can specify either **meetingChatTab** or **meetingDetailsTab** to ensure the apps work in mobile. |
| **meetingSidePanel** | An in-meeting panel opened through the unified bar (U-bar). |
| **meetingStage** | An app from the `meetingSidePanel` can be shared to the meeting stage. You can't use this app either on mobile or Teams room clients. |

#### Configure tab app for a meeting

Apps in meetings can use the following contexts: `meetingChatTab`, `meetingDetailsTab`, `meetingSidePanel` and `meetingStage`. After a meeting participant installs an app and configures the tab in meeting, all the targeted other contexts of the app for the given meeting starts to render the tab.

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

#### Other examples

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

### Advanced Tab SDK APIs

The Microsoft Teams JavaScript client SDK is a rich SDK used to create Tabs using JavaScript. Use the latest TeamsJS (V.2.0 or later) to work in Teams, Office, and Outlook. For more information, see [Teams JavaScript client SDK](/microsoftteams/platform/tabs/how-to/using-teams-client-sdk?tabs=javascript%2Cmanifest-teams-toolkit).

### Frame context

Microsoft Teams JavaScript library exposes the frameContext in which your meeting tab URL is loaded in the getContext API. The possible values of frameContext are content, task, setting, remove, sidePanel, and meetingStage. This allows you to build customized experiences based on where the app renders. For example, showing a specific collaboration focused UI when in the `meetingStage` and a different meeting preparation UI in the chat tab (`content`). For more information, see [getContext API](/microsoftteams/platform/tabs/how-to/access-teams-context?tabs=teamsjs-v2).

## Code sample

|Sample name | Description | C# | Node.js |
|----------------|-----------------|--------------|----------------|
| Meeting app | Demonstrates how to use the Meeting Token Generator app to request a token. The token is generated sequentially so that each participant has a fair opportunity to contribute in a meeting. The token is useful in situations like scrum meetings and Q&A sessions. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-token-app/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-token-app/nodejs) |
| Meeting stage sample | Sample app to show a tab in meeting stage for collaboration | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-stage-view/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-stage-view/nodejs) |
| Meeting side panel | Sample app to show how to add agenda in a meeting side panel | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-sidepanel/csharp) |-|
| In-meeting notification | Demonstrates how to implement in-meeting notification using bot. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-content-bubble/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-content-bubble/nodejs) |
| In-meeting document signing | Demonstrates how to implement a document signing Teams app. Includes sharing specific app content to stage, Teams SSO and user specific stage view. | [View](https://github.com/officedev/microsoft-teams-samples/tree/main/samples/meetings-share-to-stage-signing/csharp) | NA |

> [!NOTE]
>
> * Meeting apps (side panel and meeting stage) are supported in Teams desktop client.
> * Meeting apps (side panel and meeting stage) in Teams web client is supported only when the [developer preview is enabled](/microsoftteams/platform/resources/dev-preview/developer-preview-intro#enable-developer-preview).

## Step-by-step guides

* Follow the [step-by-step guide](../sbs-meeting-token-generator.yml) to generate meeting token in your Teams meeting.
* Follow the [step-by-step guide](../sbs-meetings-sidepanel.yml) to generate meeting side panel in your Teams meeting.
* Follow the [step-by-step guide](../sbs-meetings-stage-view.yml) to share meeting stage view in your Teams meeting.
* Follow the [step-by-step guide](../sbs-meeting-content-bubble.yml) to generate in-meeting notification in your Teams meeting.

## See also

* [In-meeting notification design guidelines](design/designing-apps-in-meetings.md#use-an-in-meeting-dialog)
* [Teams authentication flow for tabs](../tabs/how-to/authentication/auth-flow-tab.md)
* [Shared meeting stage experience design guidelines](~/apps-in-teams-meetings/design/designing-apps-in-meetings.md)
* [Add apps to meetings via Microsoft Graph](/graph/api/chat-post-installedapps?view=graph-rest-1.0&tabs=http&preserve-view=true)
