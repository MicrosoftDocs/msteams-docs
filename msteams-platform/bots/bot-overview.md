---
title: Bots in Teams
author: surbhigupta
description: description for overview
ms.topic: overview
ms.localizationpriority: high
ms-author: surbhigupta
ms.date: 01/29/2023
---


# Bot app for Teams

TBD Introduction: what is a Bot, Bot apps (types) in Teams.

A Teams bot is an app that runs automated tasks within Microsoft Teams. These bots can interact with users through text, interactive cards, and dialogs, making them useful for a variety of tasks such as answering questions, providing updates, or assisting with workflows.

Teams bots can handle a few basic commands or complex tasks that involve artificial intelligence and natural language processing. They can be part of a larger application or be standalone. Bots in Teams support several kinds of conversations called scopes.

Bots in Microsoft Teams can be part of a one-to-one conversation, a group chat, or a channel in a team. Each scope provides unique opportunities and challenges for your conversational bot.

| In a channel | In a group chat | In a one-to-one chat |
| :-- | :-- | :-- |
| Massive reach | Fewer members | Traditional way |
| Concise individual interactions | @mention to bot  | Q&A bots |
| @mention to bot | Similar to channel | Bots that tell jokes and take notes |

### In a channel

Channels contain threaded conversations between multiple people even up to 2000. This potentially gives your bot massive reach, but individual interactions must be concise. Traditional multi-turn interactions don't work. Instead, you must look to use interactive cards or dialogs (referred as task modules in TeamsJS v1.x), or move the conversation to a one-to-one conversation to collect lots of information. Your bot only has access to messages where it's `@mentioned`. You can retrieve additional messages from the conversation using Microsoft Graph and organization-level permissions.

Bots work better in a channel in the following cases:

* Notifications, where you provide an interactive card for users to take additional information.
* Feedback scenarios, such as polls and surveys.
* Single request or response cycle resolves interactions and the results are useful for multiple members of the conversation.
* Social or fun bots, where you get an awesome cat image, randomly pick a winner, and so on.

### In a group chat

Group chats are non-threaded conversations between three or more people. They tend to have fewer members than a channel and are more transient. Similar to a channel, your bot only has access to messages where it's `@mentioned` directly.

In the cases where bots work better in a channel also work better in a group chat.

### In a one-to-one chat

One-to-one chat is a traditional way for a conversational bot to interact with a user. A few examples of one-to-one conversational bots are:

* Q&A bots
* bots that initiate workflows in other systems.
* bots that tell jokes.
* bots that take notes.
Before creating one-to-one chatbots, consider whether a conversation-based interface is the best way to present your functionality.

## Types of bots

You can create the following types of bots using either Bot Framework SDK or Teams Toolkit:

1. Notification bot: A notification bot is an automated bot that sends notifications to users in a Teams channel, group chat, or personal chat. You can use notification bots for user scenarios such as, sending reminders or alerts, or sharing news or updates. Users can also interact with interactive notification bots by responding to options or links within the notification or even sharing input or feedback.

  For more information, see [Build notification bot with JavaScript](../sbs-gs-notificationbot.yml).

2. Workflow bot: You use a workflow bot to automate or streamline business processes. This bot can interact with users, applications, and data to progress tasks and workflows. You can use workflow bots to automate repetitive tasks, assign tasks to team members, track progress, and more. They're used to bring efficiency through automation and reduction of manual effort.

  For more information, see [Build command bot with JavaScript](../sbs-gs-commandbot.yml).

3. Conversational bot: A conversational bot is a chat bot that can simulate conversation with users, who can use it to interact with a web service. The conversation is made possible through text, interactive cards, and dialogs. This bot can understand user inputs and respond accordingly. You can use it to help users with virtual assistance, customer service, and more.

  For more information, see [Create Teams conversation bot](../sbs-teams-conversation-bot.yml).

4. AI bot: An AI bot uses artificial intelligence to perform the tasks it is automated to do. It understands natural language and can engage in conversation and answer questions. You can use it for virtual assistance, language translation, predictive analysis, and more.

  For more information, see [Build a custom copilot to chat with your data using Teams AI library and Teams Toolkit](../Teams-AI-library-tutorial.yml).

## Typical bot scenarios

TBD

## Bot manifest configuration

TBD

## Concepts

TBD

## Advantages of bots

TBD

## Recommendations

An extensive dialog between your bot and the user is a slow and complex way to get a task completed. A bot that supports excessive commands, especially a broad range of commands, isn't successful or viewed positively by users.

* **Avoid multi-turn experiences in chat**
  An extensive dialog requires the developer to maintain state. To exit this state, a user must either time out or select **Cancel**. Also, the process is tedious. For example, see the following conversation scenario:

    USER: Schedule a meeting with Megan.

    BOT: I’ve found 200 results, include a first and last name.

    USER: Schedule a meeting with Megan Bowen.

    BOT: OK, what time would you like to meet with Megan Bowen?

    USER: 1:00 pm.

    BOT: On which day?

* **Support six or less frequent commands**
  As there are only six visible commands in the current bot menu, anything more is unlikely to be used with any frequency. Bots that go deep into a specific area rather than trying to be a broad assistant work and fare better.

* **Optimize size of knowledgebase for quicker interaction**
  One of the disadvantages of bots is that it's difficult to maintain a large retrieval knowledge base with unranked responses. Bots are best suited for short, quick interactions, and not sifting through long lists looking for an answer.

## Limitations and known issues

If you're unable to create a bot in Developer Portal, ensure the following:

* **App registration is enabled for users**: When an app registration is disabled org-wide, users (other than users with Microsoft Entra admin access) can't register new apps. To allow users to register apps, admins must toggle **Users can register applications** to **Yes** in the [Microsoft Entra admin center](/azure/active-directory/fundamentals/users-default-permissions#restrict-member-users-default-permissions).

* **Give permissions to specific users to register new apps**:

  * For Microsoft 365 licenses where app registration limit is 250 apps per user, ensure that the tenant admin adds Microsoft Entra ID to a user with the following roles:

    * [Application Administrator](/azure/active-directory/roles/permissions-reference#application-administrator)
    * [Application Developer](/azure/active-directory/roles/permissions-reference#application-developer)
    * [Cloud Application Administrator](/azure/active-directory/roles/permissions-reference#cloud-application-administrator)

    For information about how to assign roles, see [Assign Microsoft Entra roles to users](/azure/active-directory/roles/manage-roles-portal).

  * For Microsoft 365 (P1, P2, E3, or E5 plan) license where app registration limit is default to tenant limit (more than 300,000) per user, ensure that the tenant admin adds Microsoft Entra ID  to a user and assigns a [Custom role](/azure/active-directory/roles/custom-create) to the user with the following permissions:

    * `microsoft.directory/applications/create`
    * `microsoft.directory/applications/createAsOwner`

## Glossary

TBD

## See also

TBD
