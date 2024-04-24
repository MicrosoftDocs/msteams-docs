---
title: Webhooks and connectors
author: clearab
description: Learn how webhooks and connectors help to connect the web services to channels and teams in Microsoft Teams. Learn Incoming, Outgoing Webhooks, and Connectors for Microsoft 365 Groups.
ms.localizationpriority: high
ms.topic: overview
ms.author: anclear
ms.date: 11/23/2022
---

# Build webhooks and connectors

Webhooks and connectors help to connect the web services to channels and teams in Microsoft Teams. Webhooks are user-defined HTTP callback that notifies users about any action that has taken place in the Teams channel. It's a way for an app to get real-time data. Connectors allow users to subscribe to receive notifications and messages from your web services. They expose an HTTPS endpoint for your service to post messages in the form of cards.

> [!IMPORTANT]
>
> * Webhooks and connectors are available only in Government Community Cloud (GCC) environment but aren't available in GCC-High and Department of Defense (DOD) environments.
>
> * Only Incoming Webhook connector type are available in GCC-High environment and the [tenant admins](/microsoftteams/office-365-custom-connectors#considerations-when-using-connectors-in-teams) need to manually upload to display the app in the connectors page.
>
> * You can choose to build notification bot Teams app other than Incoming Webhooks. They perform similarly but notification bot has more functionalities. For more information, see [build notification bot with JavaScript](../sbs-gs-notificationbot.yml) or [Incoming Webhook notification sample](https://github.com/OfficeDev/TeamsFx-Samples/tree/dev/incoming-webhook-notification). To get started, download and explore [Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension). For more information, see [Teams Toolkit documents](../toolkit/teams-toolkit-fundamentals.md).

## Outgoing Webhooks

Webhooks help Teams to integrate with external apps. With Outgoing Webhooks, you can send text messages from a channel to a web service. After configuring the Outgoing Webhooks, users can @mention Outgoing Webhook and send a message to a web service. The service responds within 10 seconds to the message with a text or a card.

> [!NOTE]
> Outgoing Webhooks are configured on a per team basis and cannot be included as part of a normal Teams app.

## Connectors

Connectors allow users to subscribe to receive notifications and messages from the web services. They expose the HTTPS endpoint for the service to post messages to Teams channels, typically in the form of cards.

### Incoming Webhooks

Incoming Webhooks help in posting messages from apps to Teams. If Incoming Webhooks are enabled for a team in any channel, it exposes the HTTPS endpoint, that accepts correctly formatted JSON and inserts the messages to that channel. For example, you can create an Incoming Webhook in your DevOps channel, configure your build, and simultaneously deploy and monitor services to send alerts.

#### Notification bot or Incoming Webhook

Before you start to learn how to build Incoming Webhooks, you may also want to know that you can build a notification bot using Teams Toolkit or send activity feed notifications using Microsoft Graph API. Notification bots and activity feed notifications can enable more customizable experience to meet different business scenarios. For more information, see [plan to send app notifications](../concepts/design/design-app-notification.md).

| &nbsp; | Notification API | Notification bot |  Incoming Webhook |
| --- | --- | --- | --- |
| What is it? | A RESTful web API  | A Teams app | A Teams feature |
| Installation required | Yes | Yes | No |
| Suitable scenarios | • Notify users about urgent or critical information. <br>  • Display rich content that requires user action in the main pane of Teams. <br> • Receive operating system notification with sound. <br> • Localized preview text in Activity. | • Receive regular notifications and messages periodically, for example, receive daily notification of team tasks. <br>  • Receive notifications and messages based on real events. For example, once teammates upload files, you receive notifications. | Communicate with external apps and receive notifications and messages from other apps. |
| Scope configuration | • A single user <br> • A list of users <br> • Users in a chat <br> • Users in a team | • Teams channel <br> • Group chat <br> • Personal chat | Teams channel |
| Message process |A Teams app makes a REST API call to trigger a notification in Activity in Teams. The API call passes the deep link to load content in main pane. | A notification bot works as a Teams application. You can define your business logic to process data and show data in a customized format. | ebhook is a Teams feature rather than a Teams application, so it only receives and shows data without processing. |
| Retrieve Teams context |App can use Graph APIs to work with Microsoft 365 data.  | Notification bot can retrieve Teams context such as the channel or user information, messages, etc. | No |
| Send Adaptive Card | No | Yes | Yes |
| Send a welcome message | Yes | Yes | No |
| Trigger supported |All triggers are supported. | All triggers are supported. <br> If you use Teams Toolkit, you can quickly get a template project with the following triggers: <br> • Time trigger hosted on Azure functions. <br> • Restify HTTP trigger hosted on Azure app service. <br> • HTTP trigger hosted on Azure Functions.| All triggers are supported.
| Building Tools |[Quick start - Microsoft Graph](https://developer.microsoft.com/graph/quick-start) | • [Teams Toolkit Overview for Visual Studio Code](../toolkit/teams-toolkit-fundamentals.md) <br> • [Teams Toolkit Overview for Visual Studio](../toolkit/toolkit-v4/teams-toolkit-fundamentals-vs.md) <br> • [Teams Toolkit CLI](../toolkit/Teams-Toolkit-CLI.md) <br> • [TeamsFx SDK](../toolkit/TeamsFx-SDK.md) | No tools are required. |
| Cloud resource required | Microsoft Entra app  | Azure Bot Framework  | No resources are required. |
| Tutorial | • [Send activity feed notifications to users in Microsoft Teams](/graph/teams-send-activityfeednotifications) <br> • [Send activity feed notification](../sbs-graphactivity-feedbroadcast.yml) | [Build notification bot with JavaScript](../sbs-gs-notificationbot.yml) | [Incoming Webhook notification sample](https://github.com/OfficeDev/TeamsFx-Samples/tree/dev/incoming-webhook-notification) |

### Connectors for Microsoft 365 Groups

Connectors for Microsoft 365 Groups allow you to create a custom configuration page for your Incoming Webhook and package them as part of a Teams app. You send messages primarily using connector cards for Microsoft 365 Groups and can add a limited set of card actions to them. For example, a weather connector that allows users to select a location and any time of the day, to receive updates about tomorrow's weather. They're configured at channel level but are installed at team level.

> [!NOTE]
> You can distribute the connector for Microsoft 365 Groups Teams app to our AppStore.

## Create and send messages

Actionable messages allow users to take action without leaving their email client, increasing user engagement. With Microsoft 365 and Incoming Webhooks, you can send messages by posting a JSON payload to the webhook URL.

## Next step

> [!div class="nextstepaction"]
> [Create Outgoing Webhooks](~/webhooks-and-connectors/how-to/add-outgoing-webhook.md)

## See also

* [Create Incoming Webhooks](~/webhooks-and-connectors/how-to/add-incoming-webhook.md)
* [App capabilities mapped to features](../concepts/design/map-use-cases.md#app-capabilities-mapped-to-features)
* [Create connectors for Microsoft 365 Groups](~/webhooks-and-connectors/how-to/connectors-creating.md)
* [Create and send messages](~/webhooks-and-connectors/how-to/connectors-using.md)
