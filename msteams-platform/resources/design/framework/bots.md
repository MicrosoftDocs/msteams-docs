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

[!include[Avatar image](~/msteams-platform/includes/design/bot-avatar-image.html)]

### Buttons

We support up to six buttons per card. Be concise when writing button text, and keep in mind that most buttons should only address the task at hand.

### Graphics

Graphics are a good way to tell a story, but not all bot conversations require graphics, so use them for maximum impact.

### Respond to users and failing gracefully, like this:

Your bot should also be able to respond to things like 'Hi', 'Help', and 'Thanks' while taking common misspellings and colloquialisms into account.

#### Hello

`Hi` `how are you` `howdy`

#### Help

`What do you do?` `How does this work?` `What the heck?`

#### Thanks

`Thank you` `thankyou` `thx`

Your bot should be able to handle the following types of queries and inputs:

* **Recognized questions**: These are the “best case scenario” questions you’d anticipate from users.
* **Recognized non-questions**: Queries about unsupported functionality, random pieces of information, or when someone wants to curse at your bot.
* **Unrecognized questions**: Unintelligible inputs (i.e., gibberish).

Examples of bot personality and response types:

[!include[Bot responses](~/msteams-platform/includes/design/bot-responses-table.html)]

> [!TIP]
> When writing your bot script, ask yourself: “Will my company be embarrassed if a response is screen captured and shared?”

### Understanding what users are trying to say

#### Use a thesaurus for synonyms

When brainstorming variants, use a thesaurus and get people from as many different backgrounds as possible to help you generate different interpretations of each query.

#### Make use of telemetry and interviews

Find out what users are saying and what their intent was when querying your bot. This will be an ongoing process as you get users in different locations and types of companies. You can fine tune language recognition and intent mapping with LUIS.

### How often should you use your bot to reach out to a user?

#### When a state has changed

For example, if an assignment is marked as complete, when a bug changes, when new social media is available, or when a poll has been completed.

#### When the timing is right

Your bot can act like a daily digest, sending a notification to the user or channel at a specific frequency.

Leave the user in control. Provide notification settings that include frequency and priority.

[!include[Bot notification](~/msteams-platform/includes/design/bot-notification-image.html)]

---

## Using tabs

Tabs make your bot much more functional. With tabs, you get the following:

### A place to host standing queries

In one-on-one conversations, tabs can house user-specific information and lists. They’re also a good place to maintain bot responses to frequently-asked questions (so users don’t need to keep asking).

### A place to finish a conversation

You can link to a tab from a card. If your bot provides an answer that requires a few more steps, it can link to a tab to complete the task or flow.

### A place to provide some help

Add a tab that educates users about how to communicate with your bot. You can provide some context for what it does or FAQs.

![Providing help](~/msteams-platform/assets/images/framework/framework_bots_tbot-help.png)

> [!TIP]
> Embedding parts of your site in a tab will help someone maintain the context of a conversation as they use your service. It removes the need to launch your service in a browser and switch back and forth between apps.

---

## Best practices

### Bots aren’t assistants

Unlike agents (like Cortana), bots act as specialists.

### Discourage chit chat

Unless your bot is for conversation, find ways to redirect chit chat toward task completion.

### Introduce some personality

Keep your bot personality consistent with the voice of your product. Think of your bot as speaking for your company.

### Maintain tone

Determine whether you want your tone to be friendly and light, “just the facts”, or super quirky.

### Encourage easy task flow

Support multi-turn interactions while still allowing for fully formed questions. Anticipating the next step will help users get through task flows much easier.

If a user takes several steps to complete a task, allow your bot to take them through each step, but finish by having it suggest a quicker path. For example, if a user has taken several conversational turns to set a meeting (by first specifying a meeting, then identifying with whom, then stating the time, then stating the day), finish the conversation with the following suggestion: Next time, try asking if you can ‘schedule a meeting with Bob at 1:00 tomorrow’.
