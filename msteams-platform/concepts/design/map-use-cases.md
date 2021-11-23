---
title: Map your use cases to Teams app capabilities
author: surbhigupta
description: Identify how your app's use cases can work within the Teams experience.
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: anclear
---
# Map your use cases to Teams app capabilities

After you have identified *who* the user is and *what* problem you will solve, it is time to decide *how* to solve the problem. The *who*, *what*, and *how* completes the process of understanding and mapping your use cases to Teams app capabilities. You need to define the scope of the app based on the responses you have received from the user to your queries, and then decide which capability is best suited to build your app.

## Choose the correct scope for your app

While choosing the app scope, consider the following:

* An app can exist across scopes.
* App capabilities, such as messaging extensions follow users across scopes.
* Users are often hesitant to add apps to Teams or channels.
* Guests can access content exposed in Teams or channels.

You can choose between personal scope and team or channel scope for your app depending on the following:

* For personal scope, ask the following questions:
  * Are there one-on-one interactions with the app required for privacy or other reasons? For example, checking leave balance or other private information.
  * Is there going to be collaboration among users who might not have any common Teams? For example, finding upcoming organization wide events in a company.
  * Are there any personalized notifications or messages that will need to be sent to a user throughout the Teams app experience? For example, reminders for approvals or registrations.
* For a shared scope (team, channel, or chat), ask the following questions:
  * Is the information presented by the app, either in tab or through a bot, relevant and useful for most of the members in a Team? For example, Scrum app.
  * Could the app’s context change depending on the team in which it is added to? For example, Planner’s tasks are different in different teams. 
  * Is it possible that all members in a persona who need to collaborate are a part of a single team? For example, agents working on a ticket.

## Use Cases and Teams capabilities

The Microsoft Teams platform offers a large variety of capabilities and UI elements your app can take advantage of. Each feature is a way of interacting with your users in a way that makes the Teams app capability relevant to the user need.

:::image type="content" source="../../assets/images/overview/teams-apps-capabilities.png" alt-text="Image showing Teams capabilities" border="true":::

Each method of interacting with your users has its strengths and weaknesses.

User needs vs. Teams capabilities  

The following scenarios will guide you in understanding the selection of entry points and UI elements that work well with Teams app capabilities:

> [!NOTE]
> It isn't an exhaustive list, but will help you think through some of the possibilities available to you.

- **Create, share, and collaborate on items in an external system**

Apps to interact with your data

| **If you want to...** | **Try ...** |
| --- | --- |
| Search external systems and share the results as an interactive card. | Messaging extensions with search commands |
| Collect information to insert into a data store or perform advanced searches. | Messaging extensions with action commands |
| Create embedded web experiences to view, work with and share data. | Tabs |
| Push data and send data out of the Teams client. | Connectors and webhooks|
| Interactive modal forms from wherever you need them to collect or display information. | Task modules |
|

- **Initiate workflows and processes**

A quick way to initiate a process or workflow in an external system.

| **If you want to...** | **Try ...** |
| --- | --- |
| Trigger from messages, allowing your users to quickly send the contents of a message to your web services. | Messaging extensions action commands |
| Open them from a tab, a bot, or a messaging extension to collect information before initiating a workflow. | Task modules |
| Interact with your users through text and rich cards. | Conversational bots |
| A good choice for a simple back-and-forth interaction when you don't need to build an entire conversational bot. |  Outgoing webhooks |
|

- **Send notifications and alerts**

Send asynchronous notifications and alerts to your users in Teams.

| **If you want to...** | **Try ...** |
| --- | --- |
| Send proactive messages to groups, channels, or individual users. | Conversational bots |
| Permit a channel to subscribe to receive messages. A connector lets users tailor the subscription with a configuration page. | Connectors and incoming webhooks |
|

- **Ask questions and get answers**

Connect with your users and resolve their queries

| **If you want to...** | **Try ...** |
| --- | --- |
| Natural language processing, AI, machine learning, and all the buzzwords. Use a bot powered by the intelligent cloud to connect your users to the answers they need. | Conversational bots |
| Embed your existing web portal in Teams or create a Teams-specific version for added functionality. | Tabs |
|

## Important considerations

In addition to mapping use cases, think about factors that relate to users friendliness of your app.

- Get social

    A collaboration platform is inherently a social platform. Let your creative side be free and add some fun into your workplace. All users must be able to send jokes, give kudos, get some memes, toss out some emojis, or anything else that strikes your fancy.

- Think in terms of a single-page app

    Tabs are embedded web pages. Pretty much anything you can do in a SPA, you can do in a tab in Teams. Just be sure to pay attention to scope. Group and channel tabs are for shared experiences and personal tabs are for personal experiences. The team's list of stuff goes on the channel tab and the list of your stuff goes in the personal tab.

- Initiate small

    Not sure where to initiate? Feeling a bit overwhelmed with the awesome variety of options available to you? You must choose a core feature of your app and initiate there. After you get a feel for the flow of information through the various contexts in Teams, it is a lot simpler to picture a more complex interaction.

- Put it all together

    That being said, the best apps usually combine multiple features, creating an app that engages users in the right context with the right functionality at the right time. You must not force any functionality into a place it does not belong. Just because you have a good one-to-one conversational bot does not mean you add it to any team. Different extensibility points are good for different things, play to their strengths for creating a successful app.

## See also

[Build your first Microsoft Teams app](../../get-started/get-started-overview.md)
