---
title: Design guidelines for messaging extensions
description: Describes the guidelines for creating messaging extensions
keywords: teams design guidelines reference messaging extensions tips best practice
author: EmilyyC
ms.author: qinch
---

# Start sharing with powerful messaging extensions

Messaging extensions are designed for sharing actionable content. This feature represents the highest return on investment (ROI) in our stack. Messaging extensions work in chat and channels, support multiple query endpoints, enable the creation of new entities, and work with link unfurling to create custom link previews. The challenge is that while the feature is powerful and incredibly useful, it's not easily discoverable. This guide will help you create messaging extensions that are readily found and utilized by more users.

## Design guidelines

### Show content as a user type

Messaging extensions present a unique way to use keyword searches to find actionable content that can be shared with one or more users. This preferred interaction allows users to enter search terms with a delayed auto query as the user type. This model does a good job of simulating suggested results and requires users to type minimal characters.

> [!TIP]
>It's possible, but not desirable, to require users to select `enter` or `search` before sending queries. While there is less stress on the backend service, this model is not the norm and may confuse users.

### Consider zero-term queries

Zero-term queries are directly triggered by user action, rather
than by the user writing terms in a search box. All messaging extensions benefit from zero-term queries, usually based on what the user last saw on the service. The advantage is that the likelihood of wanting to share something the user last saw is quite high. Other zero-term queries might be based on the service. For instance, `news`  might show recently posted news extensions from recent and upcoming events.

<img width="450px" title="New configuration tab" src="../../assets/images/messaging-extension/zero-term-query.png" />

### Include link unfurling

One of the most common ways to share content in Teams is through a hyperlink, whether it is a task you've been working on or a  video that you found funny. When a user shares a link in Teams, a  preview including image, title or description is displayed. With [link unfurling](../how-to/link-unfurling.md) you can now customize these previews. Users will also be prompted to install your app after they decide to use your preview. Adding link unfurling functionality to your app can greatly increase your app discoverability.

### Highlight your messaging extension

Messaging extensions are not always easy to find. Include app screenshots in the app detail page and your help documentation to feature your messaging extension. You can also include *how-to* documentation for your messaging extension in bot tours to highlight the entire app beyond the bot interactions.

### Add actions on card

Don't just display text to users. Have something they can interact with and perform the next action. For example, the Places app doesn't just insert a map on the card, but also has a button that, when selected, will show directions to the location. Users can perform more tasks after obtaining the card.

<img width="450px" title="New configuration tab" src="../../assets/images/messaging-extension/action-on-card.png" />

### Keep users within Teams

If a card doesn't provide enough space for your content, consider launching a [tab](../../tabs/what-are-tabs.md) and not a browser for a better user experience.
