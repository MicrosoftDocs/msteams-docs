---
title: Map your use cases to Teams app capabilities
author: clearab
description: Identify how your app's use cases can work within the Teams experience.
ms.topic: conceptual
localization_priority: Normal
ms.author: anclear
---
# Map your use cases to Teams app capabilities

After you have identified *who* the user is and *what* problem you will solve, it is time to decide *how* to solve the problem. The *who*, *what*, and *how* completes the process of understanding and mapping your use cases to Teams app capabilities. You need to define the scope of the app based on the responses you have received from the user to your queries, and then decide which capability is best suited to build your app.

> [!NOTE]
> You must have a good understanding of the [entry points and UI elements](../../concepts/extensibility-points.md) available for your app. You must also make sure that you [considered your use cases](../../concepts/design/understand-use-cases.md) carefully.

## Choose the correct scope for your app

While choosing the app scope, consider the following:

* An app can exist across scopes.
* App capabilities, such as messaging extensions, follow users across scopes.
* Users are often hesitant to add apps to Teams or channels.
* Guest users can access content exposed in Teams or channels.

You can choose between personal scope and team or channel scope for your app depending on the following:

* For personal scope, ask the following questions:
  * Are there one-on-one interactions with the app required for privacy or other reasons? For example, checking leave balance or other private information.
  * Is there going to be collaboration among users who might not have any common Teams? For example, finding upcoming organization wide events in a company.
  * Are there any personalized notifications or messages that will need to be sent to a user throughout the Teams app experience? For example, reminders for approvals or registrations.
* For a shared scope (team, channel, or chat), ask the following questions:
  * Is the information presented by the app, either in tab or through a bot, relevant and useful for most members in a Team? For example, Scrum app.
  * Could the app’s context change depending on the team in which it is added to? For example, Planner’s tasks are different in different teams. 
  * Is it possible that all members in a persona who need to collaborate are a part of a single team? For example, agents working on a ticket.

The following scenarios will guide you in understanding the selection of entry points and UI elements that work well with Teams app capabilities:

> [!NOTE]
> It is not an exhaustive list, but will help you think through some of the possibilities available to you.

## Create, share, and collaborate on items in an external system

App for Microsoft Teams is a great way to interact with your data and there are a variety of integration points to choose from.

* **Messaging extensions with search commands**: Search external systems and share the results as an interactive card.

* **Messaging extensions with action commands**: Collect information to insert into a data store or perform advanced searches.

* **Tabs**: Create embedded web experiences to view, work with and share data.

* **Connectors and webhooks**: A simple way to push data and send data out of the Teams client.

* **Task modules**: Interactive modal forms from wherever you need them to collect or display information.

## Initiate workflows and processes

Sometimes you just need a quick way to start a process or workflow in an external system.

* **Messaging extensions action commands**: Trigger from messages, allowing your users to quickly send the contents of a message to your web services.

* **Task modules**: Open them from a tab, a bot, or a messaging extension to collect information before initiating a workflow.

* **Conversational bots**: Interact with your users through text and rich cards.

* **Outgoing webhooks**: A good choice for a simple back-and-forth interaction when you don't need to build an entire conversational bot.

## Send notifications and alerts

Send asynchronous notifications and alerts to your users in Teams. Use interactive cards to provide quick access to commonly used actions and links to additional information.

* **Conversational bots**: Send proactive messages to groups, channels, or individual users.

* **Connectors and incoming webhooks**: Permit a channel to subscribe to receive messages. A connector lets users tailor the subscription with a configuration page.

## Ask questions and get answers

People have questions and you probably got a lot of the answers stored away somewhere. Unfortunately, it's often quite difficult to connect the two.

* **Conversational bots**: Natural language processing, AI, machine learning, and all the buzzwords. Use a bot powered by the intelligent cloud to connect your users to the answers they need.

* **Tabs**: Embed your existing web portal in Teams or create a Teams-specific version for added functionality.

## Get social

A collaboration platform is inherently a social platform. Let your creative side be free and add some fun into your workplace. All users must be able to send jokes, give kudos, get some memes, toss out some emojis, or anything else that strikes your fancy.

## Think in terms of a single-page app

Tabs are embedded web pages. Pretty much anything you can do in a SPA, you can do in a tab in Teams. Just be sure to pay attention to scope. Group and channel tabs are for shared experiences and personal tabs are for personal experiences. The team's list of stuff goes on the channel tab and the list of your stuff goes in the personal tab.

## Start small

Not sure where to start? Feeling a bit overwhelmed with the awesome variety of options available to you? You must choose a core feature of your app and start there. After you get a feel for the flow of information through the various contexts in Teams, it is a lot simpler to picture a more complex interaction.

## Put it all together

That being said, the best apps usually combine multiple features, creating an app that engages users in the right context with the right functionality at the right time. You must not force any functionality into a place it does not belong. Just because you have a good one-to-one conversational bot does not mean you add it to any team. Different extensibility points are good for different things, play to their strengths for creating a successful app.

## See also

* [Build apps for Microsoft Teams](../../overview.md)
