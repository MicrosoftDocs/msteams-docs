---
title: Designing Adaptive Cards for your app
description: Learn how to design Adaptive Cards for Teams and get the Microsoft Teams UI Kit.
ms.topic: conceptual
ms.author: lajanuar
---
# Designing Adaptive Cards for your Microsoft Teams app

An Adaptive Card contains a freeform body of card elements and optional set of actions. Adaptive Cards are actionable snippets of content that you can add to a conversation through a bot or messaging extension. Using text, graphics, and buttons, these cards provide rich communication to your audience.

The Adaptive Card framework is used across many Microsoft products, including Teams. You can send cards inside messages to users via bots or messaging extensions. Users can take actions on cards when present.

:::image type="content" source="../../assets/images/adaptive-cards/adaptive-card-overview.png" alt-text="Example shows an Adaptive Card." border="false":::

## Microsoft Teams UI Kit

You can find more comprehensive design guidelines for Adaptive Cards in Teams, including elements that you can grab and modify as needed, in the Microsoft Teams UI Kit. The UI kit also covers essential topics such as theming, accessibility, and responsive sizing.

> [!div class="nextstepaction"]
> [Get the Microsoft Teams UI Kit (Figma)](https://www.figma.com/community/file/916836509871353159)

## Adaptive Cards designer

You also can start designing your Adaptive Cards directly in the browser.

> [!div class="nextstepaction"]
> [Try the Adaptive Cards designer](https://adaptivecards.io/designer/)

## Types of Adaptive Cards

### Hero

Our largest card. Use for sharing articles or scenarios where an image tells most of the story.

:::image type="content" source="../../assets/images/adaptive-cards/hero-card.png" alt-text="Example shows an Adaptive Card." border="false":::

### Thumbnail

Use for sending a simple actionable message.

:::image type="content" source="../../assets/images/adaptive-cards/thumbnail-card.png" alt-text="Example shows an Adaptive Card." border="false":::

### List

Use in scenarios where you want the user to pick an item from a list, but the items don’t need a lot of explanation.

:::image type="content" source="../../assets/images/adaptive-cards/list-card.png" alt-text="Example shows an Adaptive Card." border="false":::

### Digest

Use for news digests and round-up posts. Note: We recommend the thumbnail card for a single update or news item.

:::image type="content" source="../../assets/images/adaptive-cards/digest-card.png" alt-text="Example shows an Adaptive Card." border="false":::

### Media

Use when you want to combine text and media, like audio or video.

:::image type="content" source="../../assets/images/adaptive-cards/media-card.png" alt-text="Example shows an Adaptive Card." border="false":::

### People

Best used when you to efficiently convey who's involved with a task.

:::image type="content" source="../../assets/images/adaptive-cards/people-card.png" alt-text="Example shows an Adaptive Card." border="false":::

### Request ticket

Use to get quick inputs from a user to automatically create a task or ticket.

:::image type="content" source="../../assets/images/adaptive-cards/request-ticket-card.png" alt-text="Example shows an Adaptive Card." border="false":::

### ImageSet

Use to send multiple image thumbnails.

:::image type="content" source="../../assets/images/adaptive-cards/image-set-card.png" alt-text="Example shows an Adaptive Card." border="false":::

### ActionSet

Use when you want to the user to select a button, then gather addition user input from the same card.

:::image type="content" source="../../assets/images/adaptive-cards/action-set-card.png" alt-text="Example shows an Adaptive Card." border="false":::

### ChoiceSet

Use to gather multiple inputs from the user.

:::image type="content" source="../../assets/images/adaptive-cards/choice-set-card.png" alt-text="Example shows an Adaptive Card." border="false":::

## Anatomy

:::image type="content" source="../../assets/images/adaptive-cards/anatomy.png" alt-text="Illustration showing the UI anatomy of an Adaptive Card." border="false":::

Adaptive Cards have a lot of flexibility. But at minimum, we strongly suggest including the following components in every card:

|Counter|Description|
|----------|-----------|
|A|**Header**: Make headers clear and concise, yet descriptive.|
|B|**Body copy**: Use to convey detail that is either too long or not important enough to include in the header.|
|C|**Primary actions**: As a best practice, include 1-3 primary actions. A maximum of six are allowed.|

## Best practices

### Primary and secondary actions

:::row:::
   :::column span="":::
:::image type="content" source="../../assets/images/adaptive-cards/actions-do.png" alt-text="Example showing an Adaptive Cards best practice." border="false":::

#### Do: Use up to six primary actions

While Adaptive Cards can support six primary actions, most cards don’t need that. Actions should be clear, concise, and straight forward. Less is more.

   :::column-end:::
   :::column span="":::
:::image type="content" source="../../assets/images/adaptive-cards/actions-dont.png" alt-text="Example showing an Adaptive Cards best practice." border="false":::

#### Don't: Use more than six primary actions

Adaptive Cards should present quick, actionable content. Too many actions can overwhelm a user.

   :::column-end:::
:::row-end:::

### Frequency

:::image type="content" source="../../assets/images/adaptive-cards/frequency-do.png" alt-text="Example showing an Adaptive Cards best practice." border="false":::

#### Do: Be concise

It's easy to send multiple cards into a conversation, but once cards scroll out of view, they become less useful. Try to limit yourself to the essentials. This is especially true in a channel where users have less tolerance for what they perceive as "noise".

### **Simplify multi-turn bot conversations**
If events or queries have a linear flow and you are using bots to manage such conversations, use Adaptive Cards to get information from the user in one go.

:::image type="content" source="../../assets/images/design-guidelines/best-practice-adaptive-card-conversation-do.png" alt-text="Example of simplifying multi-turn bot conversations." border="false":::

#### Do: Simplify multi-turn bot conversations  

:::image type="content" source="../../assets/images/design-guidelines/best-practice-adaptive-card-conversation-dont.png" alt-text="Example of simplifying multi-turn bot conversations." border="false":::

#### Don't: Make multi-turn interactions tedious

* **Design task modules using Adaptive Cards**: Use an Adaptive Card JSON inside task module to save some operational overheads and get a view that merges into the Teams theme and design.

    :::image type="content" source="../../assets/images/design-guidelines/best-practice-adaptive-card-task-module.png" alt-text="Example of a task module developed using an Adaptive Card." border="false":::

* **Notify status change**: If you want to allow your users to view the status change of an activity without going through detailed information.

    :::image type="content" source="../../assets/images/design-guidelines/best-practice-adaptive-card-notify-status.png" alt-text="Example of Adaptive Card usage to notify change in status." border="false":::
 
* **Hide non-important information**: If you want to hide unimportant information from the user, but if the user so wishes can access it by just selecting a button.

    :::image type="content" source="../../assets/images/design-guidelines/best-practice-adaptive-card-hide-conversation.png" alt-text="Example of Adaptive Card usage to hide non-critical information." border="false":::

* **Leverage rich input capabilities**: In addition to textual input, if you want to leverage rich input capabilities by using native input types, such as date picker, time picker, and so on whenever you need specialized input from the user.

    :::image type="content" source="../../assets/images/design-guidelines/best-practice-adaptive-card-input-capabilities.png" alt-text="Example of leveraging native input capabilities using Adaptive Card." border="false":::

* **Add visual cues**: If you want to suggest the outcome of various actions to the users, add the right emoticons to the action buttons in an Adaptive Card.

    :::image type="content" source="../../assets/images/design-guidelines/best-practice-adaptive-card-emoticons.png" alt-text="Example of using emoticons to provide visual cues." border="false":::

* **Specialized scenarios**: If you want to allow users to download a file or deep-linking users to tab, chat, or channel, as these scenarios can be executed without invoking an intrusive task module by using an Adaptive Card.

    :::image type="content" source="../../assets/images/design-guidelines/best-practice-adaptive-card-specialized-scenarios.png" alt-text="Example of specialized scenarios." border="false":::

* **Avoid over usage of Adaptive Card**: Do not use an Adaptive Card for very simple flows.

    :::image type="content" source="../../assets/images/design-guidelines/best-practice-adaptive-card-overuse.png" alt-text="Example of over usage of Adaptive Card." border="false":::

* **Avoid dead ends**: Ensure that you provide next steps to the users in the form of action buttons to avoid dead ends in a flow.

    :::image type="content" source="../../assets/images/design-guidelines/best-practice-adaptive-card-dead-end.png" alt-text="Example of avoiding dead end when using Adaptive Card." border="false":::
