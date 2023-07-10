---
title: Send activity feed notifications
description: Learn to send activity feed notification to help keep users up to date with changes in the tools and workflows.
author: surbhigupta
ms.localizationpriority: medium
ms.topic: concept
---

# Send activity feed notifications to users in Microsoft Teams

The Microsoft Teams activity feed enables users to triage items that require attention by notifying them of changes. You can use the activity feed notification APIs in Microsoft Graph to extend this functionality to your apps. This allows your apps to provide richer experiences and better engage users by helping to keep them up to date with changes in the tools and workflows they use.

## Use cases of activity feed notifications

* **News**: Helps users to stay updated with the latest information like new assignment or new post.
* **Collaboration**: When you share a file or @ mention a user in a comment, users can see a text preview in the notification banner.
* **Reminders**: A notification to let you know about an event or a task. For example, you have a training due date today, and the app sends you a reminder notification to help you remember the task or event.
* **Alerts**: Notifications which require urgent or immediate attention. For example, the due date for a training is passed or an admin sends a request to fix a bug with the highest priority.

## Advantages of activity feed notifications

* Activity feed notification is a native Teams integration that brings user seamlessly into the Tab app, bringing additional user engagement from *Activity* to your app.
* Activity feed notification comes with an OS notification in Teams desktop and mobile clients, so that user attention is grabbed by the system pop-up and sound.
* Notification content is highly customizable, allowing users to preview the summary of the notified events.
* You can deep link your app to a notification so that when a user select the notification it increases user app engagement.
* You can send activity feed notification to various of recipients. For example, sending a personal notification or sending batch notifications to a group of users.
* Teams manifest localization is supported for the templated text in activity feed notifications.

## Understand the basics of activity feed notifications

Activity feed notifications in Microsoft Teams are comprised of multiple bits of information, displayed together, as shown in the following image.

:::image type="content" source="../assets/images/activity-feed/notification-template.png" alt-text="Screenshot shows the components of an activity feed notification.":::

The components include:

|Counter|Description|
|----------|-----------|
|1|**Avatar**: Shows who initiated the activity.|
|2|**Activity type or app icon**: Depicts the type of activity. For app notifications, the line icon is replaced with an app icon.|
|3|**Title: Actor + reason**: *Actor*: Name of the user or app that initiated the activity. *Reason*: Describes the activity.|
|4|**Timestamp**: Shows when the activity happened.|
|5|**Text preview**: Shows a truncated line from the start of the notification.|
|6|**Location**: Shows where the activity happened in Teams.|

The following example shows the components together provide the details about a notification.

:::image type="content" source="../assets/images/activity-feed/example-feed-notification.png" alt-text="Screenshot shows the example for notification.":::

# [Windows](#tab/windows)

< WIP >

# [iOS](#tab/ios)

< WIP >

---

### Types of activity feed notification cards

The following variants show the kinds of activity feed notification cards you can display. The app logo replaces the user avatar for app-generated notifications.

# [Desktop](#tab/desktop)

:::image type="content" source="../assets/images/activity-feed/activity-feed-notifications-desktop.png" alt-text="Sceenshot shows the activity feed notifications in a desktop.":::

# [Mobile](#tab/mobile)

:::image type="content" source="../assets/images/activity-feed/activity-feed-notifications-mobile.png" alt-text="Screenshot shows the activity feed notifications in a mobile.":::

---

## Requirements for using the activity feed notification APIs

Activity feed APIs work with a Teams app. The following are the requirements for sending activity feed notifications:

* The Teams app manifest must have the Azure AD app ID added to the webApplicationInfo section. For details, see manifest schema.
* Activity types must be declared in the activities section. For details, see manifest schema.
The Teams app must be installed for the recipient, either personally, or in a team or chat they are part of. For more information, see Teams app installation.

### Teams app manifest changes

This section describes the changes that need to be added to Teams app manifest. Note that you must be using the [Teams app manifest](/microsoftteams/platform/resources/schema/manifest-schema) version `1.7` or greater.

```json
"$schema": "https://developer.microsoft.com/json-schemas/teams/v1.7/MicrosoftTeams.schema.json",
"manifestVersion": "1.7",
```

#### webApplicationInfo section changes

```json
"webApplicationInfo":
{
    "id": "a3111f15-658e-457c-9689-fd20fe907330",
    "resource": "https://contosoapp.com"
}
```

|Parameter|Type|Description|
|:---|:---|:---|
|id|string|Azure AD app ID (client ID).|
|resource|string|Resource associated with the Azure AD app. Also known as reply or redirect URL in the Azure Portal.|

> [!NOTE]
> You might get an error if multiple Teams apps in the same scope (team, chat or user) are using the same Azure AD app. Make sure that you're using unique Azure AD apps.

#### activities section changes

```json
"activities":
{
  "activityTypes": [
    {
      "type": "taskCreated",
      "description": "Task Created Activity",
      "templateText": "{actor} created task {taskId} for you"
    },
    {
      "type": "approvalRequired",
      "description": "Deployment requires your approval",
      "templateText": "{actor} created a new deployment {deploymentId}"
    }
  ]
}
```

|Parameter|Type|Description|
|:---|:---|:---|
|type|string|Type of activity. This needs to be unique in a specific manifest.|
|description|string|Human-readable short description. This will be visible on the Microsoft Teams client.|
|templateText|string|Template text for the activity notification. You can declare your parameters by encapsulating parameters in `{}`.|

> [!NOTE]
> `actor` is a special parameter that always takes the name of the caller. In delegated calls, `actor` is the user's name. In application-only calls, it takes the name of the Teams app.

### Install the Teams app

Teams apps must be installed in a team, chat, or for a user in personal scope for users to receive activity feed notifications. For details, see [Teams app distribution methods](/microsoftteams/platform/concepts/deploy-and-publish/overview). Typically, [sideloading](/microsoftteams/platform/concepts/deploy-and-publish/apps-upload) is preferred for development purposes. After development, you can choose the right distribution method based on whether you want to distribute to one tenant or to all tenants.

You can also use [Teams app installation](/graph/api/resources/teamsappinstallation) APIs to manage Teams app installations.

## Send activity feed notifications to users

Because a Teams app can be installed for a user, in a team, or in a chat, the notifications can be sent in these three contexts as well:

* [Send notification to user in a chat](/graph/api/chat-sendactivitynotification)
* [Send notification to user in a team](/graph/api/team-sendactivitynotification)
* [Send notification to user](/graph/api/userteamwork-sendactivitynotification)

Additionally, notifications can be sent in bulk up to 100 users at a time:

* [Send notifications to multiple users in bulk](/graph/api/teamwork-sendactivitynotificationtorecipients)

For details about what topics are supported for each scenario, see the specific APIs. Custom text-based topics are supported for all scenarios.

You can use Activity feed notification in the following scenarios:

* Notify individuals about customized content that requires their attention.
* Show rich content in Tab app or URL​.
* Support complex user interactions​.
* Send delegated notifications from the user who initiated the notification​.
* Put template in the manifest​.
* Localization for notifications is handled by Teams.

> [!NOTE]
> The activity icon is based on the context the request is made in. If the request is made with delegated permissions, the user's photo appears as the avatar, while the Teams app icon appears as the activity icon. In an application-only context, the Teams app icon is used as the avatar and the activity icon is omitted.

## Customize the notifications

Microsoft Teams users can customize the notifications they see in their feed, as a banner, and so on. Notifications generated through activity feed APIs can also be customized. Users can choose how they are notified via settings in Microsoft Teams. Teams apps will appear in the list for the user to choose from, as shown in the following screenshot.

:::image type="content" source="../assets/images/activity-feed/notification-settings.png" alt-text="Screenshot shows the Notifications settings in Teams, with the Custom option highlighted.":::

Users can select **Edit** next to an app and customize the notifications, as shown in the following example. The `description` field in the Teams app manifest is displayed.

:::image type="content" source="../assets/images/activity-feed/app-level-notification-settings.png" alt-text="Screenshot shows notifications customized to Banner and feed for a Teams app.":::

## Step-by-step guide

Follow the [step-by-step guide](../sbs-graphactivity-feedbroadcast.yml) to send activity feed notifications in Teams.

## See also

[Notification bot in Teams](../bots/how-to/conversations/notification-bot-in-teams.md)
