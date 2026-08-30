---
title: Create an Incoming Webhook
description: Create an Incoming Webhook to Teams app and post external requests to Teams. Remove Incoming Webhook. Sample code(C#, Node.js) to  send card using Incoming Webhook.
ms.localizationpriority: high
ms.topic: article
ms.owner: hantony
ms.date: 05/06/2026
---

# Send chat messages using incoming webhooks

Incoming webhooks enable apps and automations to post messages in Teams conversations by making HTTP requests. Developers can use incoming webhooks to create integrations with other systems that surface real-time notifications and other information in Teams. They're powered by [workflows](https://support.microsoft.com/teams/apps-service/overview-of-workflows-in-microsoft-teams) and do not require onboarding or distribution of a Teams app.

Incoming webhooks are for creating lightweight, one-way integrations within your own organization. They're not for creating conversational agents that interact with users in chat and perform tasks. For information about creating conversational agents in Teams, for use in your own organization or for distribution via the Teams app store, see [Agents in Teams](../../agents-in-teams/overview.md).

To create incoming webhooks, see the [end-user Teams documentation](https://support.microsoft.com/en-US/Workflows/send-messages-in-teams-using-incoming-webhooks). For general information about Power Automate workflows in Teams,

<https://learn.microsoft.com/en-us/connectors/teams>

---

*! Everything below here is a loose draft with some notes to help visualize the potential for developer-specific docs that do not rely on the end-user docs, for consideration!*

## Create an incoming webhook

To create an incoming webhook that sends messages to a specific chat or channel, use the Workflows app in Teams to create a workflow using one of the following templates:

- Send webhook alerts to a chat
- Send webhook alerts to a channel
- Send webhook alerts from specific people to a chat
- Send webhook alerts from specific people to a channel
- Send webhook alerts from people in an org to a chat
- Send webhook alerts from people in an org to a channel

The *from specific people* and *from people in an org* templates restrict who can call the webhook. See [here](/power-automate/oauth-authentication) for more information abut this setting. *TODO would also like to link something that explains how to get a token*. Webhooks without one of these restrictions can be used by anyone, and their URLs should be treated as secrets. *TODO do we want to make a blanket recommendation here to prefer the auth'ed ones?*.

After creating the workflow, Teams will display the workflow details, including a copyable webhook URL.

*TODO screenshot*

## Call an incoming webhook

- *Examples that specifically document the out-of-box templates - use of cards and not plain text, multiple card attachments supported, etc.*
- *A couple basic card examples, with Link to adaptive and message card guidance*
- *Explain with example how to authenticate for webhooks that require it, including how to get a token*
- *Limitations and other details: rate limit, size limit etc. Private channels?  Maybe call out the biggest ones here and link to the ref docs, which have them listed*

## User experience

- *Couple screenshots of the experience provided by the out-of-box templates for chats and channels*
- *Showcase a couple cards, with code examples*
- *Explain how they post as the Workflows app, link to the "Customize" section*

## Customize incoming webhook workflows

Incoming webhooks are implemented with Power Automate workflows that use the **When a Teams webhook request is received** trigger. When you create a webhook using a template in Teams, or save a new Power Automate workflow that uses this trigger for the first time, Power Automate assigns it a unique, durable webhook URL.

- *Explain how to get to a templated workflow's implementation in Power Automate*
- *Explain how, once you're there, you have a lot of options - this is kind of an "in" for people to implement something interesting in a workflow who would otherwise not be familiar with them*
- *Do we need to explain the "Do Not Remove FlowIL" thing?*

## Incoming webhook workflow lifecycle and governance

*We'll link to the Power Automate docs here, but devs are surprised and get hesitant when they learn that creating a webhook results in a new infrastructure component that they're now responsible for, in a different platform that they might not be familiar with, that likely has its own best practices and gotchas around lifecycle, governance, etc. Any critical bits of information we can give here to ease those concerns would be helpful.*

## Scenarios and best practices

- *Ramble off a couple example scenarios. events, notifications, logs, warnings; LOB systems, CI/CD, reports*s
- *Reiterate on not trying to use this to build deep integrations*

## See also

- [Power Automate for enterprise developers, ISVs and partners](/power-automate/developer/dev-enterprise-intro)
- [Power Platform connector reference for Teams](/connectors/teams)
- [Adaptive cards](https://adaptivecards.microsoft.com/)
