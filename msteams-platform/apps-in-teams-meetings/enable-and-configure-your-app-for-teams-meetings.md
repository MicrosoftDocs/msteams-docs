---
title: Enable and configure your apps for Teams meetings
author: surbhigupta
description: Learn how to enable and configure your apps for Teams meetings and different meeting scenarios, update app manifest, configure features and more.
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
ms.date: 04/07/2022
---

# Enable and configure apps for meetings

Every team has a different way of communicating and collaborating tasks. To achieve these different tasks, customize Teams with apps for meetings. Enable your apps for Teams meetings and configure the apps to be available in meeting scope within their app manifest.

## Tabs in Teams meetings

Tabs allow the meeting participants to access services and content in a specific space within a meeting. If you're new to Microsoft Teams tab development, see [Build tabs for Teams](/microsoftteams/platform/tabs/what-are-tabs).

Specifically, before creating a meeting tab, it's important to learn about the surfaces that are available to target the meeting chat view, meeting details view, meeting side panel view and meeting stage view.

### Meeting details view

1. In your calendar, select a meeting to which you want to add a tab.
1. Select the **Details** tab and select :::image type="content" source="../assets/icons/add-icon.png" Border = "false" alt-text="This screenshot shows the add button on the meeting stage to add apps.":::. The app gallery appears.

   :::image type="content" source="~/assets/images/apps-in-meetings/Pre-Meeting-002.png" alt-text="This screenshot shows the pre-meeting app experience in Teams meeting.":::

1. In the app gallery, select the app that you want to add and follow the steps as required. After adding the tab, you can view it as.

   # [Desktop](#tab/desktop)

   :::image type="content" source="~/assets/images/apps-in-meetings/PreMeetingTab.png" alt-text="The screenshot shows desktop Teams tabs in the meeting details view in the Teams meeting.":::

   # [Mobile](#tab/mobile)

   :::image type="content" source="../assets/images/mobile-tab.png" alt-text="The screenshot shows mobile Teams tabs in the meeting details view in the Teams meeting.":::

---

### Meeting chat view

1. From the Teams chat panel, select the meeting chat view.

1. Select + and the app gallery appears.

1. In the app gallery, select the app that you want to add and follow the steps as required. After adding the tab, you can view it as.

### Meeting side panel view

1. During a meeting, Users can add apps to the meeting using the + option from their Teams meeting window.

   :::image type="content" source="../assets/images/apps-in-meetings/add-app.png" alt-text="This screenshot shows how to add an app in Teams meeting window.":::

1. In the app gallery, select the app that you want to add and follow the steps as required. After adding the tab, you can view it as.

### Meeting stage view

1. Once a tab is added to the meeting side panel, you can now choose to opt into global app sharing  

1. This will result in rendering tab on the stage for every participant in the meeting.

### App manifest settings for Tabs in meeting

Update your [app manifest](/microsoftteams/platform/resources/schema/manifest-schema) with fine grained context prop to target the above different tab views. The meetings app capabilities are declared in your app manifest using the scopes and context arrays under configurableTabs section.

#### Scope

The scope defines who can access the apps.

* `groupchat`: Makes the app available in group scope and enables app to be added in a call or meeting (scheduled private meeting/ instant meetings).

* `team`: Makes the app available in team scope and enables app to be eligible for adding in team or channel or scheduled channel meeting.

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

Apps in meetings can use the following contexts: `meetingChatTab`, `meetingDetailsTab`, `meetingSidePanel` and `meetingStage`. Once a meeting participant installs an app and configures the tab in meeting, all targeted other contexts of the app for the given meeting will start rendering the tab.

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

To prevent an app from showing in non-meeting group chats, you would set the following context on their tab:

```json
"context":[ 
  "meetingSidePanel", 
  "meetingChatTab", 
  "meetingDetailsTab" 
     ] 
```

To target just the in-meeting side panel experience:  

```json
"context":[ 
  "meetingSidePanel” 
     ] 
```

### Advance Tab SDK APIs

### Frame context

Microsoft Teams JavaScript library exposes the frameContext in which your meeting tab URL is loaded in the getContext API. The possible values of frameContext are content, task, setting, remove, sidePanel. This allows you to build customized experiences according to the size of the frame in which your app is loaded. For more information, see [getContext API](/microsoftteams/platform/tabs/how-to/access-teams-context?tabs=teamsjs-v2).

## Code sample

|Sample name | Description | C# | Node.js |
|----------------|-----------------|--------------|----------------|
| Meeting app | Demonstrates how to use the Meeting Token Generator app to request a token. The token is generated sequentially so that each participant has a fair opportunity to contribute in a meeting. The token is useful in situations like scrum meetings and Q&A sessions. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-token-app/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-token-app/nodejs) |
|Meeting stage sample | Sample app to show a tab in meeting stage for collaboration | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-stage-view/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-stage-view/nodejs) |
|Meeting side panel | Sample app to show how to add agenda in a meeting side panel | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-sidepanel/csharp) |-|
| In-meeting notification | Demonstrates how to implement in-meeting notification using bot. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-content-bubble/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-content-bubble/nodejs) |

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
