---
title: Map your use cases to app capabilities
author: clearab
description: Decide how to distribute your app
ms.topic: conceptual
ms.author: anclear
---

# Map your use cases to teams app capabilities

Imagine a user trying to execute a specific task using your app. It must be easy for the user to initiate the workflow. You must ensure to [consider your use cases](../concepts/design/understand-use-cases.md) carefully. You must also have a good understanding of the [entry points and UI elements](concepts/extensibility-points.md) available for your app. After you have figured out what you are trying to solve and who are you solving it for, it is time to start thinking about how to solve.

You can find some common scenarios and a selection of extensibility points and UI elements that work well with the Teams app. It is not an exhaustive list, just to help you think through some of the possibilities available to you and the Teams platform.

## Create, share and collaborate on items in an external system

App for Microsoft Teams is a great way to interact with your data and there are a variety of integration points to choose from.

* Messaging extensions with search commands - Search external systems and share the results as an interactive card.

* Messaging extensions with action commands - Collect information to insert into a data store or perform advanced searches.

* Tabs - Create embedded web experiences to view, work with and share data.

* Connectors and webhooks - A simple way to push data and send data out of the Teams client.

* Task modules - Interactive modal forms from wherever you need them to collect or display information.

## Initiate workflows and processes

Sometimes you just need a quick way to start a process or workflow in an external system.

* Messaging extensions action commands - Trigger from messages, allowing your users to quickly send the contents of a message to your web services.

* Task modules - Open them from a tab, a bot, or a messaging extension to collect information before initiating a workflow.

* Conversational bots - Interact with your users through text and rich cards.

* Outgoing webhooks - A good choice for a simple back-and-forth interaction when you don't need to build an entire conversational bot.

## Send notifications and alerts

Send asynchronous notifications and alerts to your users in Teams. Use interactive cards to provide quick access to commonly used actions and links to additional information.

* Conversational bots - Send proactive messages to groups, channels, or individual users.

* Connectors and incoming webhooks - Permit a channel to subscribe to receive messages. A connector lets users tailor the subscription with a configuration page.

## Ask questions and get answers

People have questions and you probably got a lot of the answers stored away somewhere. Unfortunately, it's often quite difficult to connect the two.

* Conversational bots - Natural language processing, AI, Machine Learning (ML), all the buzzwords. Use a bot powered by the intelligent cloud to connect your users to the answers they need.

* Tabs - Embed your existing web portal in Teams or create a Teams-specific version for added functionality.

## Get social

A collaboration platform is inherently a social platform. Let your creative side be free and add some fun into your workplace. All users must be able to send jokes, give kudos, get some memes, toss out some emojis, or anything else that strikes your fancy.

## Work with Single Page App (SPA)

Tabs are embedded web pages. Pretty much anything you can do in a SPA, you can do in a tab in Teams. Just be sure to pay attention to scope. Group and channel tabs are for shared experiences and personal tabs are for personal experiences. The team's list of stuff goes on the channel tab and the list of your stuff goes in the personal tab.

## Start small

Not sure where to start? Feeling a bit overwhelmed with the awesome variety of options available to you? You must choose a core feature of your app and start there. After you get a feel for the flow of information through the various contexts in Teams, it is a lot simpler to picture a more complex interaction.

## Put it all together

That being said, the best apps usually combine multiple features, creating an app that engages users in the right context with the right functionality at the right time. You must not force any functionality into a place it does not belong. Just because you have a good one-to-one conversational bot does not mean you add it to any team. Different extensibility points are good for different things, play to their strengths for creating a successful app.
