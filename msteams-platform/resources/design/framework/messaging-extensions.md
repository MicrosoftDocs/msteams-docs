---
title: Design guidelines for messaging extensions
description: Describes the guidelines for creating messaging extensions and sharing content
keywords: teams design guidelines reference framework messaging extensions
---
# Share your content with messaging extensions

Messaging extensions allow you to share cards in a conversation. A card can hold instructions to complete a complex task or a simple GIF. Microsoft Teams comes equipped with several messaging extensions already. If you look below the compose box, you’ll see a “GIF” icon. That’s a messaging extension! These extensions are one of the best ways to create shareable content and serve information quickly.

---

## Guidelines

### Stick to a single parameter

Messaging extensions can hold up to five parameters, but we recommend limiting yourself to a single parameter as often as possible. Say you built a service that creates to-do lists. A single-parameter messaging extension would search for tasks, and while searching for two parameters (like “title of task” + “assigned to me”) is possible, doing so would make your interface a lot more complicated.

> [!TIP]
> Try not to include optional parameters in your messaging extension. People tend to feel obligated to fill out every parameter before they execute a search.

### Limit card size for list results

Once a user has queried your extension, they’ll be presented with a list of results. Each result in your list is presented as an individual card, and this list includes multiple preview items. Based on that setup, your results cards should be relatively small in size. Save the bulk of your information, images, and formatting for the card your user eventually clicks on at the end of their flow.

### Users can select an entity from your messaging extension...

![Selecting an entity](~/assets/images/framework/framework_message-extentions_01.png)

### ...and add it to their message

![Selecting an entity](~/assets/images/framework/framework_message-extentions_02.png)

### Now the conversation is about an item in your service and users can use the card to check out the details

![Selecting an entity](~/assets/images/framework/framework_message-extentions_03.png)

## Issues

Cards in messaging extensions only support the openUrl cardAction, including [deep links](~/concepts/deep-links) to tabs and bots.

## Best practices

### Keep it simple

A messaging extension should be light-weight and fast or it will lose its utility. If your search requirements are very complex or multiple parameters are necessary even in the simplest case, it’s OK to include them.

### Optimize your search results

A snappy messaging extension will return an easily digestible list of search results. We recommend including an image and no more than two lines of text.

### Optimize your cards

Each messaging extension produces in a card. Since it’s the last thing your user will see, make sure your cards are useful, good-looking, and easy to share.
