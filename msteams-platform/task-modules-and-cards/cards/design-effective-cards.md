---
title: Design effective cards
description: Describes the design guidelines for creating cards
keywords: teams design guidelines reference framework cards adaptable lightweight
---
# Design effective cards

Cards are actionable snippets of content that you can add to a conversation through a bot, a connector, or app. Using text, graphics, and buttons, cards allow you to communicate with an audience.

Our card framework eliminates the burden of designing a fully functional UX. We developed several standard card types and each one fits within our supported platforms. This means layout is completely taken care of, and you won’t need to develop different card iterations across platforms. Instead, you can focus on dialing in your content.

---

## Guidelines

Think of a card as a response to a user question or a setting. A card can respond to a direct question (like, “How many open bugs do I have?”) or to a condition (like, “Send a list of my open bugs at 9 am every day”).

> [!TIP]
> Using one of our standard card types means you’ll already know that all your responses will render nicely across each supported platform.

A card could include any of the following elements:<br />

[!include[Card anatomy](~/includes/design/card-image-anatomy.html)]

1. **Envelope text**: Best used for chat messages. For example, if you want a bot to say: “Here’s what I found!” or “Time for your 1:00 news digest”, that message is best displayed in envelope text.

   Envelope text is a great way to inject a little personality into your service—just remember to keep it relatively short.

2. **Title**: Your title will always be the largest text in your card. It also serves as your “hook”, so try to keep the title short, memorable, and easy to scan.

3. **Subtitle**: Best used for attribution, taglines, or as a secondary directive. This component appears just below your title.

4. **Image**: Images scale to fit their container. Hero cards have a max width of 420px, thumbnails have a max width of 100px, and list views only allow for 32px in desktop mode.

5. **Text**: Best used for plain text in the body of your card. Your max length depends on the card type you’ve selected.

6. **Buttons**: Best used to open web pages, tabs, or additional chat content. Make sure to keep your button text short and to the point.

   You can include up to 6 buttons per card, but we’d recommend following a ‘less is more’ philosophy here.

7. **Tap region**: This is the clickable region of your card. Most users will want to click on images automatically, so try and craft your text so they know where they should tap or click.

> [!TIP]
> There’s no need to include every element in each card you create. Let your content dictate your elements.

---

## Types of cards

### Hero

Our largest card. Best used for articles, long descriptions, or scenarios where your image is telling most of the story.

[!include[Card anatomy](~/includes/design/card-image-hero.html)]

### Thumbnail

Short and sweet. These cards are ideal for short answers, or if you want to return several cards at once so the user can choose from a bunch of options. We think these are a great way to deep link to another tab or a web service.

[!include[Card anatomy](~/includes/design/card-image-thumbnail.html)]

### Sign in

Some services require users to sign in independently of our authentication. In that event, you would present a sign-in card before the user can connect to your service.

[!include[Card anatomy](~/includes/design/card-image-signin.html)]

> [!TIP]
> Limit the occurrences of an additional sign-in card since they pose a significant speed bump for new users.

---

## Card collections

We also have standard card types that are best used when you want to present several pieces of content at once or in quick succession. For that purpose, we have a carousel, a digest, a list, and what we call a ‘bubble merge’.

### Carousel

Best used for articles, shopping, and browsing through cards.

[!include[Card anatomy](~/includes/design/card-image-carousel.html)]

> [!TIP]
> The carousel will be the max height of your largest card. We recommend using the same card type and content fields throughout.

### Digest

Best used for news, digests, and whenever you want the user to view multiple cards at once. We recommend using thumbnail cards for digests.

[!include[Card anatomy](~/includes/design/card-image-digest.html)]

### Lists

Lists are a great way to present a scannable set of objects in a “pick one of these” scenario. Lists are best used for items that don’t need a lot of explanation.

[!include[Card anatomy](~/includes/design/card-image-list.html)]

### Bubble merge

Some interesting effects can be achieved by sending one hero and several thumbnails in quick succession. We recommend this approach when you want to serve a main result but include a few more related items.

[!include[Card anatomy](~/includes/design/card-image-bubble-merge.html)]

---

## Best practices

### Keep the noise down

It’s easy to send multiple cards into a conversation, but once cards scroll out of view, they become less useful. Try to limit yourself to the essentials. This is especially true in a channel where users have less tolerance for what they perceive as “noise”.

### Test on mobile

Mobile environments are space- and bandwidth-constrained, so be cautious about including oversized images and large data sets in lists and carousels. Also, title widths and text lengths will truncate on mobile, so that’s another thing to keep an eye on.

### Check your graphics

Graphics are going to scale, so be sure to preview them on all platforms.

### Avoid including text in a graphic

Anything that needs to be read by a user should be included in a text field. Once an image is dynamically scaled, any text you add to a graphic may become unintelligible.

### Use mentions if you want the attention of specific users

> [!NOTE]
> Mention support in cards is currently supported in [Developer Preview](~/resources/dev-preview/developer-preview-intro.md) only.

Mentions are a great way to notify specific users in a Team or group chat. You can include a mention in card in scenarios like, a task thats assigned to a user or giving Kudos to a teammate. Learn how to include mentions in cards in the [card formatting page](~/task-modules-and-cards/cards/cards-format.md). 
