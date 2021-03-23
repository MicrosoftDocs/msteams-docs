---
title: Bots in Microsoft Teams
author: clearab
description: An overview of bots in Microsoft Teams.
ms.topic: overview
ms.author: anclear
---
# Bots in Microsoft Teams

A bot also referred to as chatbot or conversational bot is an app that runs simple and repetitive automated tasks performed by users, such as customer service or support staff. Examples of bots in everyday use include, bots that provide information about the weather, make dinner reservations, or provide travel information. A bot interaction can be a quick question and answer or it can be a complex conversation that provides access to services.

> [!VIDEO https://www.youtube-nocookie.com/embed/zSIysk0yL0Q]

Conversational bots allow users to interact with your web service through text, interactive cards, and task modules.

![Invoke bot using text](~/assets/images/invokebotwithtext.png)

![Invoke bot using card](~/assets/images/invokebotwithcard.png)

<img src="~/assets/images/task-module-example.png" alt="Invoke bot using task module" width="300"/>

Conversational bots are incredibly flexible and can be scoped to handle a few simple commands or complex, artificial-intelligence-powered and natural-language-processing tasks. They can be one aspect of a larger application, or be completely stand-alone.

Finding the right mix of cards, text, and task modules is key to creating a useful bot. The following image shows a user conversing with a bot in a one-to-one chat using both text and interactive cards:

![FAQ Plus gif](~/assets/images/FAQPlusEndUser.gif)

Every interaction between the user and the bot is represented as an activity. When a bot receives an activity, it passes it on to its activity handlers. For more information, see [bot activity handlers](~/bots/bot-basics.md). In addition, bots are apps that have a conversational interface. You can interact with a bot using text, interactive cards, and speech. A bot behaves differently depending on whether the conversation is a channel or group chat conversation or it is a one-to-one conversation. Conversations are handled through the Bot Framework connector. For more information, see [conversation basics](~/bots/how-to/conversations/conversation-basics.md).

Your bot requires contextual information, such as user profile details to access relevant content and enhance the bot experience. For more information, see [get Teams context](~/bots/how-to/get-teams-context.md). You can also send and receive files through the bot using Graph APIs or Teams bot APIs. For more information, see [send and receive files through the bot](~/bots/how-to/bots-filesv4.md).

In addition, rate limiting is used to optimize bots used for your Teams application. To protect Microsoft Teams and its users, the bot APIs provide a rate limit for incoming requests. For more information, see [optimize your bot with rate limiting in Teams](~/bots/how-to/rate-limit.md).

With Microsoft Graph APIs for calls and online meetings, Microsoft Teams apps can now interact with users using voice and video. For more information, see [calls and meetings bots](~/bots/calls-and-meetings/calls-meetings-bots-overview.md). You can use the Teams bot APIs to get information for one or more members of a chat or team. For more information, see [changes to Teams bot APIs for fetching team or chat members](~/resources/team-chat-member-api-changes.md).

## See also

[Create a bot for Teams](~/bots/how-to/create-a-bot-for-teams.md)

## Next step

> [!div class="nextstepaction"]
> [Bots and SDKs](~/bots/bot-features.md)
