---
title: Create a messaging extension
author: clearab
description: How to create a messaging extension for a Microsoft Teams app.
ms.topic: conceptual
ms.author: anclear
---
# Create a messaging extension in Microsoft Teams

1. Create and deploy your app service
1. Create and register your bot service
1. Create your app package
1. Upload your package
1. Extend your bot with additional capabilities

## Create a bot on the Bot Framework

Messaging extensions are powered by bots built on the Bot Framework; if you don't already have on you'll need to [create a bot and register it on the Bot Framework](/foo.md). The Microsoft App Id (we'll refer to this as your Bot Id from inside of Teams, to identify it from other App Id's you might be working with) and the messaging endpoints for your bot will be used in your messaging extension to receive and respond to requests. If you're using an existing bot, make sure you [enable the Microsoft Teams channel](/azure/bot-service/bot-service-manage-channels.md?view=azure-bot-service-4.0).

## Declare your messaging extension in your app manifest

ASD

### Manual declaration

ASDF

## Learn more

Learn more about messaging extensions:

* [What are messaging extensions?](~/messaging-extensions/what-are-messaging-extensions.md)

Learn about designing effective messaging extensions:

* [linkToMEDesignArticle](./foo.md)

Learn how to add commands to your messaging extension

* [Define action-based messaging extension command](./foo.md)
* [Define search-based messaging extension command](./foo.md)