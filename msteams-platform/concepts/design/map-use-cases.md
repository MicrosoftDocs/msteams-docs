---
title: Map your use cases to app capabilities
author: clearab
description: How to distribute your app
ms.topic: conceptual
ms.author: anclear
---
# Map your use cases to Teams app capabilities

If you haven't already, [consider your app's use cases](~/concepts/design/map-use-cases.md) carefully. You should also have a good understanding of [how to extend Teams](~/concepts/extensibility-points.md) using supported capabilities and UI elements. Once you've figured out *what* your trying to solve, and *who* you're solving it for, it's time to start thinking about *how*.

Below you'll find some common scenarios, and a selection of extensibility points and UI elements that work well with them. It isn't intended to be an exhaustive list, just to help you think through some of the possibilities available to you and the Teams platform.

## Create, share, and collaborate on items in an external system

App for Microsoft Teams are a great way to interact with your data, and there are a variety of integration points to choose from.

* Messaging extensions with search commands - Search external systems and share the results as an interactive card.

* Messaging extensions with action commands - Collect information to insert into a data store or perform advanced searches.

* Tabs - Create embedded web experiences to view, work with, and share data.

* Connectors and webhooks - A simple way to push data into, and send data out of the Teams client.

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

* Connectors & incoming webhooks - Allow a channel to subscribe to receive messages. With a connector let users tailor the subscription with a configuration page.

## Ask questions and get answers

People have questions. You've probably got a lot of the answers stored away somewhere. Unfortunately, its often quite difficult to connect the two together.

* Conversational bots - Natural language processing, AI, machine learning, all the buzzwords. Use a bot powered by the intelligent cloud to connect your users to the answers they need.

* Tabs - Embed your existing web portal in Teams, or create a Teams-specific version for added functionality.

## Get social

A collaboration platform is inherently a social platform. Let your creative side be free, and add some fun into your workplace.

* All of them - Send jokes, give kudos, get some memes, toss out some emoji's or whatever else strikes your fancy.

## Anything you can do in a single-page app

Tabs are embedded web pages. Pretty much anything you can do in a single-page app, you can do in a tab in Teams. Just be sure to pay attention to scope—group and channel tabs are for shared experiences, personal tabs are for ... personal experiences. The team's list of stuff goes on the channel tab, the list of your stuff goes in the personal tab.

## Start small

Not sure where to start? Feeling a bit overwhelmed with the awesome variety of options available to you? Don't fret, choose a core feature of your app and start there. Once you get a feel for the flow of information through the various contexts in Teams, it will be a lot simpler to picture a more complex interaction.

## Putting it all together

That being said, the best apps usually combine multiple features, creating an app that engages users in the right context with the right functionality at the right time. Don't try to force functionality into a place it doesn't belong - just because you've got a good one-to-one conversational bot doesn't mean you should just add it to a team. Different extensibility points are good for different things; play to their strengths and your app will shine.
