---
title: Designing your bot
description: Learn how to design a Teams bot and get the Microsoft Teams UI Kit.
author: heath-hamilton
ms.topic: conceptual
localization_priority: Normal
ms.author: lajanuar
---
# Designing your Microsoft Teams bot

Bots are conversational apps that perform a specific set of tasks. Based on the <a href="https://dev.botframework.com/" target="_blank">Microsoft Bot Framework</a>, bots communicate with users, respond to their questions, and proactively notify them about changes and other events. They're a great way to reach out.

To guide your app design, the following information describes and illustrates how people can add, use, and manage bots in Teams.

## Microsoft Teams UI Kit

You can find more comprehensive bot design guidelines, including elements that you can grab and modify as needed, in the Microsoft Teams UI Kit.

> [!div class="nextstepaction"]
> [Get the Microsoft Teams UI Kit (Figma)](https://www.figma.com/community/file/916836509871353159)

## Add a bot

Bots are available in chats, channels, and personal apps. You can add a bot one of the following ways:

* From the Teams store (AppSource).
* Using the app flyout by selecting the **More** icon on the left side of Teams.
* With an @mention in the new chat or compose box (the following example shows how you can do this in a group chat).

:::image type="content" source="../../assets/images/bots/add-bot-chat-at-mention.png" alt-text="Example shows how to add a bot in a group chat using an @mention." border="false":::

## Introduce a bot

It’s critical that your bot introduces itself and describes what it can do. This initial exchange helps people understand what to do with the bot, find out its limitations and, most importantly, get comfortable interacting with it.

### Welcome message in a one-on-one chat

In personal contexts, welcome messages set your bot's tone. The message includes a greeting, what the bot can do, and some suggestions for how to interact (for example, “Try asking me about …”). If possible, these suggestions should return stored responses without having to sign in.

:::image type="content" source="../../assets/images/bots/bot-personal-welcome.png" alt-text="Example shows a bot introduction in a personal app." border="false":::

### Introductions in group chats and channels

Your bot's introduction should be slightly different in group chats and channels compared to a personal context (like a personal app). In real life, if you entered a room full of people; you’d introduce yourself instead of welcoming everyone who’s already there. Carry that thinking into your bot design.

:::image type="content" source="../../assets/images/bots/bot-group-welcome.png" alt-text="Example shows a bot introduction in a collaborative context." border="false":::

### Bot authentication with single sign-on

When a person messages a bot, sign in may be required use all its features. You can simplify the authentication process using single sign-on (SSO).

Don’t forget: In the bot command menu (**What can I do?**), you must also provide a command to sign out.

:::image type="content" source="../../assets/images/bots/bot-sso-example.png" alt-text="Example shows a bot with a sign-in button." border="false":::

### Tours

You can include a tour with welcome messages and if the bot responds to something like a “help” command. A tour is the most effective way to describe what your bot can do. If applicable, they’re also great for describing your app’s other features (for example, include screenshots of your messaging extension).

> [!IMPORTANT]
> Tours should be accessible without having to sign in.

#### One-on-one chats

In a personal app, a carousel can provide an effective overview of your bot and any other features of your app. Including buttons the let users try bot commands is encouraged (for example, **Create a task**).

:::image type="content" source="../../assets/images/bots/bot-tour-personal.png" alt-text="Example shows a bot tour in a one-on-one chat." border="false":::

#### Channels and group chats

In channels and group chats, a tour should open in a modal (also known as a [task module](../../task-modules-and-cards/task-modules/design-teams-task-modules.md) so it doesn’t interrupt ongoing conversations. This also gives you the option to implement role-based views for your tour.

:::image type="content" source="../../assets/images/bots/bot-tour-channel.png" alt-text="Example shows a bot tour in a channel." border="false":::

## Chat with a bot

Bots integrate directly into Team’s messaging framework. Users can chat with a bot to get their questions answered or type commands to have the bot perform a narrow or specific set of tasks. Bots can proactively notify users about changes or updates to your app via chat.

### Chat with a bot in different contexts

You can use bots in the following contexts:

* **Personal apps**: In a personal app, a bot has a dedicated chat tab.
* **One-on-one chat**: A user can initiate a private conversation with a bot. It's the same experience as using a bot in a personal app.
* **Group chat**: People can interact with a bot in a group chat by @mentioning the bot.
* **Channel**: People can interact with a bot in a channel. by @mentioning the bot name in the compose box. Remember, in this context, the bot is available to the entire team, not just the channel.

### Anatomy

:::image type="content" source="../../assets/images/bots/bot-anatomy.png" alt-text="Example shows a bot's structural anatomy." border="false":::

|Counter|Description|
|----------|-----------|
|1|**App name and icon**|
|2|**Chat tab**: Opens the space to talk with your bot (applicable only to personal apps).|
|3|**Custom tabs**: Opens other content related to your app.|
|4|**About tab**: Displays basic information about your app.|
|5|**Chat bubble**: Bot conversations use the Teams messaging framework.|
|6|**Adaptive Card**: If your bot’s responses include Adaptive Cards, the card takes up the full width of the chat bubble.|
|7|**Command menu**: Displays your bot's standard commands (defined by you).

### Command menu

The command menu provides a list of words or phrases you want your bot to always respond to. The command menu displays above the compose box when someone is conversing with a bot. When a command is selected, it gets inserted into a message.

The list of commands should be brief. The menu is only meant to highlight your bot’s primary features. Keep commands concise, too. For example, create a command called **Help** instead of **Can you please help me**?
The command menu must always be available regardless of the state of the conversation.

:::image type="content" source="../../assets/images/bots/bot-command-menu.png" alt-text="Example shows a bot's command menu." border="false":::

## Understand what people are saying

Use a thesaurus and get people from as many different backgrounds as possible to help you generate different interpretations of standard queries.

:::row:::
   :::column span="":::
:::image type="content" source="../../assets/images/bots/bot-understanding-hello.png" alt-text="Illustration showing how a bot might interpret 'Hello'." border="false":::
   :::column-end:::
   :::column span="":::
:::image type="content" source="../../assets/images/bots/bot-understanding-help.png" alt-text="Illustration showing how a bot might interpret 'Help'." border="false":::
   :::column-end:::
   :::column span="":::
:::image type="content" source="../../assets/images/bots/bot-understanding-thanks.png" alt-text="Illustration showing how a bot might interpret 'Thanks'." border="false":::
   :::column-end:::
:::row-end:::

### Extract intent and data from messages

Design your bot to recognize intent, which captures what someone wants from a bot in response to a message or query. Intent classifies a message or query as a single action with one or more data objects that are affected by the action. 

The following examples outline the user intent and data in messages sent to bots.

:::row:::
   :::column span="":::
:::image type="content" source="../../assets/images/bots/bot-intent-1.png" alt-text="Example showing in sentence 'Book a flight to Seattle', user intent is 'book a flight' and data is 'Seattle'." border="false":::
   :::column-end:::
   :::column span="":::
:::image type="content" source="../../assets/images/bots/bot-intent-2.png" alt-text="Example showing in sentence 'When does the store open', user intent is 'when' and data is 'open'." border="false":::
   :::column-end:::
   :::column span="":::
:::image type="content" source="../../assets/images/bots/bot-intent-3.png" alt-text="Example showing in sentence 'Schedule a meeting at 1pm with Bob in Distribution', user intent is 'schedule a meeting' and data is '1pm' and 'Bob in Distribution'." border="false":::
   :::column-end:::
:::row-end:::

### Analyze and improve

Learn what users say when chatting with your bot. This will be an ongoing, iterative process as your user base grows in different locations and orgs. You can tune your bot's language recognition and intent mapping with Microsoft Language Understanding (LUIS).

* [Understanding LUIS](https://docs.microsoft.com/azure/cognitive-services/luis/artificial-intelligence): Find out how LUIS uses AI to provide natural language understanding (NLU) to your app data.
* [Integrating with LUIS](https://www.luis.ai/): Add natural language capabilities to your bot without the complex process of creating machine learning models.

## Use cases

### Simple queries

Bots can deliver an exact match to a query or a group of related matches to help with disambiguation. For related matches, group the content using a list card.

:::image type="content" source="../../assets/images/bots/bot-simple-query.png" alt-text="Example shows a simple query interaction with a bot." border="false":::

### Multi-turn interactions

While your bot can support complete requests and questions, it should also be able to handle multi-turn interactions. Anticipating possible next steps makes it much easier for people to a complete task flow (rather than expecting them to craft a comprehensive request).

In the following example, the bot responds to each message with options for what might want to do next.

:::image type="content" source="../../assets/images/bots/bot-multi-turn.png" alt-text="Example shows a multi-turn interaction with a bot." border="false":::

### Reach out to users

With proactive messaging, your bot can act like a digest that sends notifications relevant to an individual, group chat, or channel at a specific frequency. A bot may send a message when something has changed in a document or a work item is closed.

In the following example, a user gets a toast notification that a bot messaged them in another channel.

:::image type="content" source="../../assets/images/bots/bot-proactive-message-toast.png" alt-text="Example shows a toast of a bot proactively messaging a user from another channel." border="false":::

Now in that channel, the user can read their message from the bot.

:::image type="content" source="../../assets/images/bots/bot-proactive-message.png" alt-text="Example shows the user looking at the bot's proactive message." border="false":::

### Use tabs with bots

A tab can make your bot easier to use. For example, if your bot can create work items, it would be nice to show all those items in a central location inside a tab. See more about [designing tabs](../../tabs/design/tabs.md).

:::image type="content" source="../../assets/images/bots/bot-with-tab.png" alt-text="Example shows how a tab can help organize bot content." border="false":::

## Manage a bot

Users should be able to change a bot's settings. You can provide this functionality with bot commands, but it's usually more efficient to include all settings in a [task module](../../task-modules-and-cards/task-modules/design-teams-task-modules.md) (as shown in the following example).

:::image type="content" source="../../assets/images/bots/manage-bot-task-module.png" alt-text="Example shows a task module for configuring a bot's settings." border="false":::

## Best practices

### Content

:::image type="content" source="../../assets/images/bots/bot-content-persona-do.png" alt-text="Example showing a bot best practice." border="false":::

#### Do: Establish a clear persona

Is your bot's tone friendly and light, “just the facts”, or super quirky? How should it respond in different scenarios? Planning and documenting your bot's persona makes it easier to write responses that seem natural and cohesive.

See more about writing for bots in the <a href="https://www.figma.com/community/file/916836509871353159" target="_blank">Microsoft Teams UI Kit (Figma).</a>

:::row:::
   :::column span="":::
:::image type="content" source="../../assets/images/bots/bot-content-convey-do.png" alt-text="Example showing bots best practice." border="false":::

#### Do: Clearly convey what your bot can do

Welcome messages and tours help people understand what they can do with your bot.

   :::column-end:::
   :::column span="":::
:::image type="content" source="../../assets/images/bots/bot-content-convey-dont.png" alt-text="Example is showing a bot best practice." border="false":::

#### Don't: Obscure your bot's features

First impressions matter. People will likely be confused or suspicious when presented with a nondescript sign-in message.

   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::
:::image type="content" source="../../assets/images/bots/bot-content-understand-do.png" alt-text="Sample of showing a bot best practice." border="false":::

#### Do: Recognize non-questions

Your bot should be able to respond to messages like "Hi", "Help", and "Thanks" while also accounting for common misspellings and colloquialisms.

   :::column-end:::
   :::column span="":::
:::image type="content" source="../../assets/images/bots/bot-content-understand-dont.png" alt-text="Example shows a bot best practice." border="false":::

#### Don't: Miss out on opportunities to delight

Some people expect conversations to flow naturally like they would with a real person. Try to avoid clumsy responses to simple messages.

   :::column-end:::
:::row-end:::

### Troubleshooting

:::row:::
   :::column span="":::
:::image type="content" source="../../assets/images/bots/bot-help-do.png" alt-text="Example of a bot best practice." border="false":::

#### Do: Provide help

If your bot can’t satisfy a request, provide ways for a user to educate themselves about interacting with your bot.

   :::column-end:::
   :::column span="":::
:::image type="content" source="../../assets/images/bots/bot-help-dont.png" alt-text="Example displays a bot best practice." border="false":::

#### Don't: Leave users stranded

People will quickly abandon your bot if they can’t troubleshoot issues.

   :::column-end:::
:::row-end:::

### Complex interactions

:::row:::
   :::column span="":::
:::image type="content" source="../../assets/images/bots/bot-interactions-do.png" alt-text="Example displaying a bot best practice." border="false":::

#### Do: Use task modules or tabs

If your bot provides an answer that requires a few more steps, you can link to a task module or tab to complete the task or flow.

   :::column-end:::
   :::column span="":::
:::image type="content" source="../../assets/images/bots/bot-interactions-dont.png" alt-text="See example of a bot best practice." border="false":::

#### Don't: Make multi-turn interactions tedious

An extensive conversation to complete a single task is slow and overly complex. It also requires the developer to account for state changes (such as the conversation timing out or you sending a “Cancel” message).

   :::column-end:::
:::row-end:::

### Privacy

:::row:::
   :::column span="":::
:::image type="content" source="../../assets/images/bots/bot-privacy-do.png" alt-text="Example exhibits a bot best practice." border="false":::

#### Do: Only show sensitive info in a personal context

If your bot is in a group chat or channel, we recommend directing users to a private location (such as a task module, tab, or browser) to view sensitive information.

   :::column-end:::
   :::column span="":::
:::image type="content" source="../../assets/images/bots/bot-privacy-dont.png" alt-text="Illustration showing a bot best practice." border="false":::

#### Don't: Some content isn’t meant to be seen by everyone

Your bot shouldn’t reveal sensitive information to a group of people.

   :::column-end:::
:::row-end:::

## Learn more

These other guidelines may help with your bot design:

* [Designing your personal app](../../concepts/design/personal-apps.md)
* [Designing Adaptive Cards](../../task-modules-and-cards/cards/design-effective-cards.md)
* [Designing task modules](../../task-modules-and-cards/task-modules/design-teams-task-modules.md)

## Validate your design

If you plan to publish your app to AppSource, you should understand the design issues that commonly cause apps to fail during submission.

> [!div class="nextstepaction"]
> [Check design validation guidelines](../../concepts/deploy-and-publish/appsource/prepare/frequently-failed-cases.md#validation-guidelines--most-failed-test-cases)
