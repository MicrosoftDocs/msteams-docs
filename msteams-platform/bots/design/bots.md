---
title: Design guidelines for bots
description: Describes the guidelines for creating bots
keywords: teams design guidelines reference framework bots talking
---
# Start talking with bots

Bots are conversational apps that perform a narrow or specific set of tasks. They give you an opportunity to communicate with users, respond to their questions, and proactively notify them about changes. They’re a great way to reach out.

---

## Guidelines

### Avatars

Bot avatars in Teams are shaped like hexagons so people can quickly tell that they’re talking to a bot instead of a person. You’ll submit your avatar as a square and we’ll crop it for you. When it comes to avatars, we recommend making yours legible from 2 feet away and using a higher contrast.

[!include[Avatar image](~/includes/design/bot-avatar-image.html)]

### Buttons

We support up to six buttons per card. Be concise when writing button text, and keep in mind that most buttons should only address the task at hand.

### Graphics

Graphics are a good way to tell a story, but not all bot conversations require graphics, so use them for maximum impact.

### Onboarding users
It is critical that bots introduce themselves and what they can do for users. This “value exchange” helps users understand what to do with the bot, where the limitations may lie, and most importantly helps users tolerate interacting with a machine that won’t be as intuitive as a real person, and giving permission to user data in exchange for real value the service provides.
#### Welcome messages
Welcome messages are the best way to set the tone. The bot states what it does and some common ways to interact with it. Use specific examples “Try asking ….” In a bullet list. Whenever possible these suggestions should work as a “canned” response. In addition, it is critical for these examples and any tours work without requiring users to sign in.
#### Tours
Take a tour – Include this on welcome messages and responses for user input equivalent to “help”. This is the most effective way to let users learn about what a bot can do. Carousels in 1:1 experiences are an excellent way to tell this story and including buttons with “Try it” for examples of the kinds of results possible is encouraged. This is also a great place to talk about the App’s other features and include screenshots of messaging extensions and Teams tabs as well. 
Welcome messages should also be used in Teams or group scenarios. Tours here should open in a task module so as not to add more card noise to the ongoing conversations between users.


### Responding to users and failing gracefully

Your bot should also be able to respond to things like 'Hi', 'Help', and 'Thanks' while taking common misspellings and colloquialisms into account. For example:

#### &#x2713; Hello

`Hi` `how are you` `howdy`

#### &#x2713; Help

`What do you do?` `How does this work?` `What the heck?`

#### &#x2713; Thanks

`Thank you` `thankyou` `thx`

Your bot should be able to handle the following types of queries and inputs:

* **Recognized questions**: These are the “best case scenario” questions you’d anticipate from users.
* **Recognized non-questions**: Queries about unsupported functionality, random pieces of information, or when someone wants to curse at your bot.
* **Unrecognized questions**: Unintelligible inputs (i.e., gibberish).

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

In personal conversations between a bot and a single person, tabs can house user-specific information and lists. They’re also a good place to maintain bot responses to frequently-asked questions (FAQs) — so users don’t need to keep asking.

### &#x2713; A place to finish a conversation

You can link to a tab from a card. If your bot provides an answer that requires a few more steps, it can link to a tab to complete the task or flow. For instance, in response to How do I format my iPhone? A good response might be a card which outlines the first few steps and has a button for “Show more” which then takes the user to the bot’s “Help” tab and deep links to the specific instructions.

### &#x2713; A place to host a settings page

Bots should have some user control and many allow it through a chat interface… however it is hard to remember those settings. A settings tab can show users their settings, allow them to change them all at once and may also be a good destination to hand off for more complex bot custom behaviors.

### &#x2713; A place to provide some help

Add a tab that educates users about how to communicate with your bot. You can provide some context for what it does or FAQs.

![Providing help](~/assets/images/framework/framework_bots_tbot-help.png)

> [!TIP]
> Embedding parts of your site in a tab will help someone maintain the context of a conversation as they use your service. It removes the need to launch your service in a browser and switch back and forth between apps.

---
## Bots in channels 
Invoking a bot in a channel can be accomplished by @mentioning the bot. Bot dialog should be unique in channels and groups vs. 1:1 and it is generally a good idea to consider separate approaches. This is especially true when:
### Sensitive data is sent by a bot. 
While the users in a team can be known to the service, the actual roles of the users cannot. This means that in a scenario for education for instance an incident involving bullying, parent and student contact information etc… should not be shared in a team. Instead the bot’s message might be “2 bullying incidents occurred today. With a button to show details. Launching details in a web page, or a task module can prompt for user credentials or query against an index for user roles paired with AAD accounts to verify the user. Since both of these options are a private view of the data there can be no data leakage. If the same data were sent in a 1:1 chat between a user and the bot the data is only visible to the user in that context and is therefore safe to fully display in the bot message. Taking users from a channel to a 1:1 chat should be avoided however as that forced navigation is highly disruptive.

### Sending more cards as a response to an interaction. 
While sending a carousel card in response to “take a tour” in a 1:1 chat is perfectly acceptable, the same pattern could yield tens or hundreds of “tour carousels” in an active channel with lots of users. To avoid this, secondary cards should be hosted in a task module. This pattern keeps users in context with the channel, keeps the channel clean of too many bot responses, and can optionally consider different user roles when the “tour” is shown.

## Best practices

### &#x2713; Bots aren’t assistants

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
