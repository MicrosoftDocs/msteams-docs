---
title: Entry points for Teams apps
author: heath-hamilton
description: Describes where people can discover and use your app in Teams.
ms.topic: conceptual
localization_priority: Normal
ms.author: lajanuar
---

# Entry points for Teams apps

The Teams platform provides a flexible set of entry points, such as team, channel, and chat where people can discover and use your app. Your app can be as simple as embedding existing web content in a tab or a multi-faceted app that users interact with across several contexts.
The most successful apps are native to Teams, so choose your app's entry points carefully.

## Shared app experiences

Team, channel, and chat are collaboration spaces. Apps in these contexts are available to everyone in that space. Collaboration spaces typically focus on additional workflows or unlocking new social interactions.

The following list shows how Teams app capabilities are commonly used in collaborative contexts:

* [**Tabs**](~/tabs/what-are-tabs.md) provide a full-screen embedded web experience configured for the team, channel, or group chat. All members interact with the same web-based content, so a stateless single-page app experience is typical.

* [**Messaging extensions**](~/messaging-extensions/what-are-messaging-extensions.md) are shortcuts for inserting external content into a conversation or taking action on messages without leaving Teams. [Link unfurling](~/messaging-extensions/how-to/link-unfurling.md) provides rich content when sharing content from a common URL.

* [**Bots**](~/bots/what-are-bots.md) interact with members of the conversation through chat and responding to events, such as adding a new member or renaming a channel. 
   > [!NOTE]
   > Conversations with a bot in these contexts are visible to all members of the team, channel, or group, so bot conversations must be relevant to everyone.

* [**Webhooks and connectors**](~/webhooks-and-connectors/what-are-webhooks-and-connectors.md) allow an external service to post messages into a conversation and users to send messages to a service.

* [**Microsoft Graph REST API**](https://docs.microsoft.com/graph/teams-concept-overview) for getting data about teams, channels, and group chats to help automate and manage Teams processes.

## Personal app experiences

[Personal apps](../concepts/design/personal-apps.md) focus on interactions with a single user. The experience in this context is unique to each user.

The following list shows how Teams capabilities are commonly used in personal contexts:

* [**Bots**](~/bots/what-are-bots.md) have one-on-one conversations with a user. Bots that require multi-turn conversations or provide notifications relevant only to a specific user are best suited in personal apps.

* [**Tabs**](~/tabs/what-are-tabs.md) provide a full-screen embedded web experience that is meaningful to the user looking at it.

## See also

> [!div class="nextstepaction"]
> [Teams app design guidelines](../concepts/design/design-teams-app-overview.md)

## Next step

> [!div class="nextstepaction"]
> [Understand use cases](../concepts/design/understand-use-cases.md)
