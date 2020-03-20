---
title: Design guidelines for message extensions
description: Describes the guidelines for creating message extensions
keywords: teams design guidelines reference message extensions tips best practice
---
# Start sharing with powerful message extensions

Messaging extensions are designed for sharing actionable content instead of links. This feature represents the highest return on investment (ROI) in our stack. Messaging extensions work in chat and channels, support multiple query endpoints, enable the creation of new entities, and work with link unfurling to create custom link previews. The challenge is that while the feature is powerful and incredibly useful, it is not easily discoverable. This guide will help you create message extensions that are readily found and utilized by more users.

---

## Guidelines

### Showing content as user type

Message extensions present a unique way to use keyword searches and find actionable content that can be shared with one or more users. The preferred interaction allows users to enter search terms with a delayed auto query as the user type. This model does a good job of simulating suggested results and requires users to type minimal characters. 

> [!TIP]
>It's possible, but not desirable, to require users to select `enter` or `search` before sending queries. While there is less stress on the backend service, this model is not the norm and may confuse users.

### Zero-term queries

All Messaging extensions benefit from a zero-term query, usually based on what the user last saw on the service, regardless of use in Teams, or on the service website. The advantage is that the likelihood of wanting to share something the user last saw is quite high. Other zero-term queries might be based on the service. For instance, `news`  might show recently posted news extensions from recent and upcoming events.

<img width="450px" title="New configuration tab" src="~/assets/images/message-extension/zero-term-query.png" />

### Include link unfurling

One of the most common ways to share content in Microsoft Teams is through links, whether is an task you have been working on or a YouTube video you found funny. When user share an link Teams already shows a preview including image, title or description, but with [link unfurling](\messaging-extensions\how-to\link-unfurling.md) you can now customize these previews. Users will also be prompted to install your app after they decide to use your preview. Adding link unfurling functionality to your app can greatly increase your app discoverability.

### Advertise your Message Extension 

Message Extensions are hard to find. Include App screenshots in the app detail page and help documentation to advertise your message extension. You can also include how-to use messaging extensions in bot tours to highlight the entire app beyond the bot interactions.

### Add actions on card 

Don't just show user information. Have something they can click on and perform the next action. For example, Places doesn't just insert a map on the card, but also has a button that will show the direction to the location. User can perform more tasks after obtaining the card.
<img width="450px" title="New configuration tab" src="~/assets/images/message-extension/action-on-card.png" />

### Keep user in your app 

If a card is not enough and you need to provide user a link for more information, consider opening a tab instead of opening a browser for better user experience. 