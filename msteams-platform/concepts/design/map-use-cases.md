---
title: Map your use cases to Teams app capabilities
author: surbhigupta
description: Identify how your app's use cases can work within the Teams experience.
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: anclear
---
# Map your use cases to Teams app capabilities

After you've identified the user and the problem your app will solve, it is time to understand and map your use cases to Teams app capabilities. Define the scope of the app and the capability best suited for your app.

## Use Cases and Teams capabilities

The Microsoft Teams platform offers a large variety of features. Each feature is a way of interacting with your users that makes the Teams app capability relevant to the user need.

:::image type="content" source="../../assets/images/overview/teams-apps-capabilities.png" alt-text="Image showing Teams capabilities" border="true":::

For example:

- Use a tab to display task modules, request device permissions, display <`iframe`> content, or using deep links.
- Use messaging extension to send cards, unfurl links, or take action on messages.

### Common use cases mapped To Teams

The next is step is to corelate use case to app capabilities that meet the user need.

Here's a list of common user scenarios mapped to Teams capabilities. It isn't an exhaustive list, but will help you think through some of the possibilities available to you.
</br>
</br>
<details>
<summary>Create, share, and collaborate on items in an external system</summary>

Apps to interact with your data

| **If you want to...** | **Try ...** |
| --- | --- |
| Search external systems and share the results as an interactive card. | Messaging extensions with search commands |
| Collect information to insert into a data store or perform advanced searches. | Messaging extensions with action commands |
| Create embedded web experiences to view, work with and share data. | Tabs |
| Push data and send data out of the Teams client. | Connectors and webhooks|
| Interactive modal forms from wherever you need them to collect or display information. | Task modules |
|
</details>
</br>
<details>
<summary>Initiate workflows and processes</summary>

A quick way to initiate a process or workflow in an external system.

| **If you want to...** | **Try ...** |
| --- | --- |
| Trigger from messages, allowing your users to quickly send the contents of a message to your web services. | Messaging extensions action commands |
| Open them from a tab, a bot, or a messaging extension to collect information before initiating a workflow. | Task modules |
| Interact with your users through text and rich cards. | Conversational bots |
| A good choice for a simple back-and-forth interaction when you don't need to build an entire conversational bot. |  Outgoing webhooks |
|
</details>
</br>
<details>
<summary>Send notifications and alerts</summary>

Send asynchronous notifications and alerts to your users in Teams.

| **If you want to...** | **Try ...** |
| --- | --- |
| Send proactive messages to groups, channels, or individual users. | Conversational bots |
| Permit a channel to subscribe to receive messages. A connector lets users tailor the subscription with a configuration page. | Connectors and incoming webhooks |
|
</details>
</br>
<details>
<summary>Ask questions and get answers</summary>

Connect with your users and resolve their queries

| **If you want to...** | **Try ...** |
| --- | --- |
| Natural language processing, AI, machine learning, and all the buzzwords. Use a bot powered by the intelligent cloud to connect your users to the answers they need. | Conversational bots |
| Embed your existing web portal in Teams or create a Teams-specific version for added functionality. | Tabs |
|
</details>

## Plan beyond app building

- **Decide what goes in Teams**: Whether you're building a new app or bringing an existing solution into Teams, it's important to decide if you want the entire app to be in the Teams client. If you integrate only a portion of the app, focus on sharing, collaborating, initiating, and monitoring workflows.

- **Plan the onboarding experience**: Knowing who your users are, helps you to create the right experience. Craft your onboarding experience with your key users in mind. What happens when a user first configures your tab in a channel? How you introduce your conversational bot when it is installed in a channel with a thousand people, is different when it is installed in a one-to-one chat.

- **Plan for the future**: Identify which new features the user will prefer to have in the current solution. If you have a roadmap for new features to add to the app, the design and architecture will be impacted.

## See also

[Build your first Microsoft Teams app](../../get-started/get-started-overview.md)
