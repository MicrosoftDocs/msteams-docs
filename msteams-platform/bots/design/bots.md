---
title: Design guidelines for bots
description: Describes the guidelines for creating bots
keywords: teams design guidelines reference framework bots talking
---
# Start talking with bots

Bots are conversational apps that perform a narrow or specific set of tasks. They give you an opportunity to communicate with users, respond to their questions, and proactively notify them about changes. They’re a great way to reach out.

---

## Guidelines

### Bot design guidelines

* Bots should provide relevant notifications when there has been activity.
* Bots must not push sensitive data to a team, group chat, or 1:1 conversation to an audience that should not view that data.
* Bot notifications should include meaningful data to inform the relevance of the notification to users.
* The bot's tone should reflect the Teams voice, as defined in the guidelines.
* Bots should provide an first-run-experience welcome message that highlights the value of the bot and what its primary functions are, this might be in the form of "take a tour", an interactive tutorial with carousel cards, or "try it" buttons.
* Bot text must not have any spelling mistakes or grammatical errors.
* Bots must provide a set of predefined bot commands that are actionable.
* Bot messages should be easy to understand and actionable.
* Bots must provide fallback help commands when a message is not understood.
* Forms, embedded in cards, sent by a bot should provide deterministic inputs that do not require sequential updating.
* Bot notifications should be scoped to a team, group chat, or 1:1 conversation with relevant content for the audience.

### Avatars

Bot avatars in Teams are shaped like hexagons so people can quickly tell that they’re talking to a bot instead of a person. You’ll submit your avatar as a square and we’ll crop it for you. When it comes to avatars, we recommend making yours legible from 2 feet away and using a higher contrast.

[!include[Avatar image](~/includes/design/bot-avatar-image.html)]

### Buttons

We support up to six buttons per card. Be concise when writing button text, and keep in mind that most buttons should only address the task at hand.

### Graphics

Graphics are a good way to tell a story, but not all bot conversations require graphics, so use them for maximum impact.

### Onboarding users

It is critical that bots introduce themselves and convey what they can do for users. This *value exchange* helps users understand what to do with the bot, where the limitations may lie, and, most importantly, helps users tolerate the interaction with a machine that won’t be as intuitive as a real person . Additionally, it grants permission to user data in exchange for the real value the service provides.

#### Welcome messages

Welcome messages are the best way to set your bot's tone and should be used in personal and team or group scenarios. The message states what the bot does and some common ways to interact with it. Use specific capability examples like,  “*Try asking ….*” in a bulleted list. Whenever possible, these suggestions should return stored responses. It's critical that the capability examples work without requiring users to sign in.
Please *see* [welcome message requirements](../../concepts/deploy-and-publish/appsource/prepare/frequently-failed-cases#-personal-bots-must-always-send-a-welcome-message-on-first-launch) for additional guidance.

#### Tours

Include a *Take a tour* attribute with welcome messages and responses to user input equivalent to “*help*”. This is the most effective way to let users learn what a bot can do. Carousels in one-to-one experiences are an excellent way to tell this story and including *Try it* buttons linking to  examples of possible responses is encouraged. Tours are also great places to talk about an app’s other features. For example, you can include screenshots of messaging extensions and Teams tabs.  Users shouldn't have to sign in to access and use a tour.

When tours are used in team or group scenarios, they should open in a task module so as not to add more card noise to the ongoing conversations between users.

### Responding to users and failing gracefully

Your bot should also be able to respond to things like "*Hi*", "*Help*", and "*Thanks*" while taking common misspellings and colloquialisms into account. For example:

#### &#x2713; Hello

`"Hi"`  `"How are you"`  `"Howdy"`

#### &#x2713; Help

`"What do you do?"`  `"How does this work?"`  `"What the heck?"`

#### &#x2713; Thanks

`"Thank you"`  `"Thankyou"`  `"Thx"`

Your bot should be able to handle the following types of queries and inputs:

> [!div class="checklist"]
>
> * **Recognized questions**. These are the “best case scenario” questions you would expect from users.
> * **Recognized non-questions**. Queries about unsupported functionality and/or random, unrelated , or profane entries.
> * **Unrecognized questions**: Input or entries that are unintelligible, meaningless, or nonsense.

Examples of bot personality and response types:

[!include[Bot responses](~/includes/design/bot-responses-table.html)]

> [!TIP]
> When writing your bot script, ask yourself: “Will my company be embarrassed if a response is screen captured and shared?”

### Understanding what users are trying to say

#### Use a thesaurus for synonyms

When brainstorming variants, use a thesaurus and get people from as many different backgrounds as possible to help you generate different interpretations of each query.

#### Make use of telemetry and interviews

Find out what users are saying and what was their intent when querying your bot. This will be an ongoing process as you get users in different locations and types of companies. You can fine-tune language recognition and intent mapping with Language Understanding Intelligent Service ([LUIS](/azure/cognitive-services/luis/what-is-luis)).

### How often should you use your bot to reach out to a user?

#### &#x2713; When a state has changed

For example, if an assignment is marked as complete, when a bug changes, when new social media is available, or when a poll has been completed.

#### &#x2713; When the timing is right

Your bot can act like a daily digest, sending a notification to the user or channel at a specific frequency.

Leave the user in control. Provide notification settings that include frequency and priority.

[!include[Bot notification](~/includes/design/bot-notification-image.html)]

---

## Using tabs

Tabs make your bot much more functional. With tabs, you can create the following:

### &#x2713; A place to host standing queries

In personal conversations between a bot and a single person, tabs can contain user-specific information and lists. They’re also a good place to maintain bot responses to frequently-asked questions (FAQs) — so users don’t need to keep asking.

### &#x2713; A place to finish a conversation

You can link to a tab from a card. If your bot provides an answer that requires a few more steps, it can link to a tab to complete the task or flow. For instance, in response to, "How do I format my iPhone?", a good response might be a card which outlines the first few steps and has a button for *Show more* that then takes the user to the bot's *Help* tab and deep links to the specific instructions.

### &#x2713; A place to host a settings page

Bots should have some user control. For many bots it is allowed through a chat interface; however, it's hard to remember those settings. A settings tab can display users settings, allow users to change them all at once, and may also be a good hand-off point for more complex bot custom behaviors.

### &#x2713; A place to provide some help

Add a tab that educates users about how to communicate with your bot. You can provide some context for what it does or FAQs.

![Providing help](~/assets/images/framework/framework_bots_tbot-help.png)

> [!TIP]
> Embedding parts of your site in a tab will help users maintain the context of a conversation as they use your service. It removes the need to launch your service in a browser and switch back and forth between apps.

---

## Bots in channels

Invoking a bot in a channel can be accomplished by `@mention`. Bot dialog should be unique in channels and groups vs. one-to-one scenarios and it's generally a good idea to consider separate approaches. This is especially true in the following cases:

### Sensitive data sent by a bot

While the users in a team can be known to the service, the actual user roles cannot. This means that, for example, in an education scenario involving bullying, parent and student contact information wouldn't be shared in a team setting. Instead the bot's message might be,"Two bullying incidents occurred today" along with a button to show details.

Launching details in a web page, or a task module can prompt for user credentials or query against an index for user roles paired with AAD accounts. In both of these options the data is in a private view scope and there will be no data leakage. If the same data is sent in a one-to-one chat between a user and the bot, the data is only visible to the user in that context and is, therefore safe, to fully display in the bot message. Taking users from a channel to a one-to-one chat should be avoided however as that forced navigation is highly disruptive.

### Sending cards as a response to interactions

While sending a carousel card in response to *Take a tour* in a one-to-one chat is perfectly acceptable, the same pattern could yield tens or hundreds of *tour carousels* in an active channel with lots of users. To avoid this, secondary cards should be hosted in a task module. This pattern keeps users in context with the channel, keeps the channel clean of excessive bot responses, and can optionally consider different user roles when the *tour* is shown.

## Useful tips

### &#x2713; Remember, bots aren’t assistants

Unlike agents, e.g., Cortana, bots act as specialists.

### &#x2713; Discourage chitchat

Unless your bot is built for conversation, find ways to redirect chitchat toward task completion.

### &#x2713; Introduce some personality

Keep your bot personality consistent with the voice of your product. Think of your bot as speaking for your company.

### &#x2713; Maintain tone

Determine whether you want your tone to be friendly and light, “just the facts”, or super quirky.

### &#x2713; Encourage easy task flow

Support multi-turn interactions while still allowing for fully formed questions. Anticipating the next step will help users get through task flows much easier.

If a user takes several steps to complete a task, allow your bot to take them through each step, but finish by having it suggest a quicker path. For example, if a user has taken several conversational turns to set a meeting (by first specifying a meeting, then identifying with whom, then stating the time, then stating the day), finish the conversation with the following suggestion: Next time, try asking if you can ‘schedule a meeting with Bob at 1:00 tomorrow’.
