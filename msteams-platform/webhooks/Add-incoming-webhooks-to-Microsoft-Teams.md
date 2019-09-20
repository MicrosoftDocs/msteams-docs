---
title: Post external requests to Microsoft Teams with incoming webhooks
author: laujan
description: 
keywords: teams tabs outgoing webhook*
ms.topic: conceptual
ms.author: laujan
---
# Post external requests to Teams with incoming webhooks

## What are incoming webhooks in Teams?

Incoming webhooks are Teams connectors that provide a simple way for an external app to share content in team channels and are often used as tracking and notification tools. Teams provides a unique URL to which you send a JSON payload with the message that you want to POST, typically in a card format. Cards are user-interface (UI) containers that contain content and actions related to a single topic and are a way to present message data in a consistent way. Teams uses cards within three capabilities:

* Bots
* Messaging extensions
* Connectors

## Incoming webhook key features

| Feature | Description |
| ------- | ----------- |
|Scoped Configuration|Incoming webhooks are scoped and configured at the channel level (e.g., outgoing webhooks are scoped and configured at the team level).|
|Secure resource definitions|Messages are formatted as JSON payloads. This declarative messaging structure prevents the injection of malicious code as there is no code execution on the client.|
|Actionable messaging support|If you choose to send messages via cards, you must use the **actionable message card** format. Actionable message cards are supported in all Office 365 groups including Teams. Here are links to the [Legacy actionable message card reference](~/outlook/actionable-messages/message-card-reference) and the [Message card playground](https://messagecardplayground.azurewebsites.net).|
|Independent HTTPS messaging support| Cards are a great way to present information in a clear and consistent way, but *you do not have to use cards to send messages via a Teams connector*. Any tool or framework that can send HTTPS POST requests can send messages to Teams via an incoming webhook. For example, PowerShell has two commands to make HTTPS requests to a RESTful web service: [Invoke-RestMethod](~/powershell/module/microsoft.powershell.utility/invoke-restmethod?view=powershell-6#description) and [Invoke-WebRequest](~/powershell/module/microsoft.powershell.utility/invoke-webrequest?view=powershell-6#description). *See also* [Training Content: Incoming webhook demo](https://github.com/OfficeDev/TrainingContent/tree/master/Teams/05%20Microsoft%20Teams%20apps%20-%20Advanced%20Techniques/Demos/03-incoming-webhook#create-a-simple-connector-card-message-to-the-webhook).|
|Markdown support|All text fields in actionable messaging cards support basic Markdown. **Don't use HTML markup in your cards**. HTML is ignored and treated as plain text.|

> [!Note]  
> Teams bots, messaging extensions, and the Bot Framework support Adaptive Cards, an open cross-card platform framework. Teams connectors do not currently support Adaptive Cards. *See* [Support for Adaptive cards](~/microsoftteams/platform/concepts/cards/cards-reference#support-for-adaptive-cards). However, it is possible to create a [flow](https://flow.microsoft.com/en-us/blog/microsoft-flow-in-microsoft-teams/) that posts adaptive cards to a Teams channel. For more information, *see* [Use adaptive cards in Microsoft Teams](~/flow/create-adaptive-cards-teams) and [Adaptive cards for Microsoft Teams](https://flow.microsoft.com/en-us/blog/adaptive-cards-for-microsoft-teams-microsoft-flow-us-government-now-available/).

## Add an incoming webhook to a Teams channel

> [!Important]  
> If your team's **Settings** => **Member permissions** => **Allow members to create, update, and remove connectors** is selected, any team member can add, modify, or delete a connector.

1. Navigate to the channel where you want to add the webhook and select (&#8226;&#8226;&#8226;) *More Options* from the top navigation bar.
1. Choose **Connectors** from the drop-down menu and search for **Incoming Webhook**.
1. Select the **Configure** button, provide a name, and, optionally, upload an image avatar for your webhook.
1. The dialog window will present a unique URL that will map to the channel. Make sure that you **copy and save the URL**—you will need to provide it to the outside service.
1. Select the **Done** button. The webhook will be available in the team channel.

## Remove an incoming webhook from a Teams channel

1. Navigate to the channel where the webhook was added and select (&#8226;&#8226;&#8226;) *More Options* from the top navigation bar.
1. Choose **Connectors** from the drop-down menu.
1. On the left, under **Manage**, choose **Configured**.
1. Select the *number Configured* to see a list of your current connectors.
1. Select **Manage** next to the connector that you want to delete.
1. Select the **Remove** button and you will be presented with a *Remove Configuration* dialog box.
1. Optionally, complete the dialog box fields and checkboxes prior to selecting the **Remove** button. The webhook will be deleted from the team channel.

## Distribution

You have three options for distributing your incoming webhook:

* Set up an incoming webhook directly for your team.
* Register your webhook as part of your [Teams app package](~/microsoftteams/tenant-apps-catalog-teams) (as a Connector) to have it available solely within Teams.
* Package and publish your Connector as part of your [AppSource](~/microsoftteams/tenant-apps-catalog-teams) submission if you want it to be available throughout the Office 365 platform.

## Learn More

[Post an actionable message card to an Office 365 group](~/outlook/actionable-messages/send-via-connectors)

[Training Content: Teams Demo - Incoming webhook](https://github.com/OfficeDev/TrainingContent/tree/master/Teams/05%20Microsoft%20Teams%20apps%20-%20Advanced%20Techniques/Demos/03-incoming-webhook)

[Training Content: Connectors & Actionable Messages](https://github.com/OfficeDev/TrainingContent/tree/master/ConnectorActionableMsgs/02%20Cards%20and%20Actions)
