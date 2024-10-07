---
title: Activity Handlers and Bot Logic
description: Learn about bot events and activity handlers for messages, channels, teams, members, mentions, auth, and card actions.
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: surbhigupta
ms.date: 10/03/2024
---

# Understand bot concepts

A bot's interactions can be using text, speech, images, or video. It processes the user's input to understand their request, evaluates the input to perform relevant tasks. A bot may request information or enable access to services, and responds to the user.

To develop a bot app that meets your needs, it's important to get to know the bot activity handler and bot logic. These two components work together to create a smooth and engaging conversational experience. The activity handler processes what the user says, while the bot logic figures out the best response. Together, they enable:

- Understanding the context of the conversation
- Personalizing interactions
- Retrieving information efficiently
- Maintaining an adaptive conversational flow

By understanding the activity handler and bot logic, you can design and implement smart, user-friendly conversational AI and non-AI bot solutions.

## Teams activity handler

An activity handler for bots within Teams is the component that manages and processes user interactions. It acts as an intermediary between the user's input and the bot's response, and enables the bot to respond accordingly.

The key functions that an activity handler facilitates for AI and non-AI bots include:

- Receiving incoming messages from the user.
- Retrieving specific or key data from the user input.
- Identifying the user intent through Natural Language Processing (NLP) for AI bots.
- Maintaining conversation context and state.
- Generating bot response based on user input and intent.

Activity handler organizes the conversational logic for your bot. For Teams bot, activities are handled in two ways using Teams activity handlers and bot logic. The Teams activity handler adds support for Teams-specific events and interactions. The bot object contains the conversational reasoning or logic for a turn and exposes a turn handler, which is the method that can accept incoming activities from the bot adapter.

## Bot logic

## Next step

## See also
