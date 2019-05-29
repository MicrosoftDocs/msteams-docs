---
title: Create a messaging extension
author: clearab
description: How to create a messaging extension for a Microsoft Teams app.
ms.topic: conceptual
ms.author: anclear
---
# Create a messaging extension in Microsoft Teams

1. Create a bot on the Bot Framework.
1. Declare your messaging extension in your app manifest.
1. Declare the commands your messaging extension will support in your app manifest.
1. Create your app package.
1. Deploy your app package to a team.

## Create a bot on the Bot Framework

Messaging extensions are powered by bots built on the Bot Framework; if you don't already have on you'll need to [create a bot and register it on the Bot Framework](/foo.md). The Microsoft App Id (we'll refer to this as your Bot Id from inside of Teams, to identify it from other App Id's you might be working with) and the messaging endpoints for your bot will be used in your messaging extension to receive and respond to requests. If you're using an existing bot, make sure you [enable the Microsoft Teams channel](/azure/bot-service/bot-service-manage-channels.md?view=azure-bot-service-4.0).

## Declare your messaging extension in your app manifest

>[!Note]
>For compatibility reasons, the app manifest JSON refers to messaging extensions as `composeExtensions`.

As with bots and tabs, you define your messaging extension inside a top-level node in your app manifest. These properties govern how your messaging extension appears and behaves in the Microsoft Teams client, and controls what types of `Activity` messages your bot will receive from your messaging extension.

### Using App Studio

You can use the [App Studio teams app](~/foo.md) to help you create your app manifest.

1. From the Teams client, open App Studio from the `...` overflow menu on the app bar (on the left).
1. Select the **Manifest editor** tab, then click **Create a new app** (you can also import an existing app manifest if you are adding a messaging to an existing app)

You'll be presented with a form to guide you through the app creation process. In this section we'll only cover adding your messaging extension. For additional information on building your app manifest see [creating your app package](~/foo.md).

1. Select Capabilities => Messaging extensions, then click **Set up**
1. 

### Manual declaration


## Learn more

Learn more about messaging extensions:

* [What are messaging extensions?](~/messaging-extensions/what-are-messaging-extensions.md)

Learn about designing effective messaging extensions:

* [linkToMEDesignArticle](./foo.md)

Learn how to add commands to your messaging extension

* [Define action-based messaging extension command](./foo.md)
* [Define search-based messaging extension command](./foo.md)