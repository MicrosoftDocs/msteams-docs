---
title: Developer platform
description: Overview page describing the Microsoft Teams line-of-business apps value
keywords: teams overview line of business apps
ms.date: 09/20/2018
---

## What can you do with the Microsoft Teams developer platform?

The Microsoft Teams developer platform makes it easy for developers to integrate
their own line-of-business apps and services within Teams to add value, improve
productivity, make decisions faster, provide focus (by reducing context
switching), and create collaboration around existing content and workflows.

*Teams line-of-business apps* integrate the custom apps and services that your
organization developed or create new capabilities to meet the needs of users
that can’t be met via commonly available, off-the-shelf software or public Teams
apps.

Teams provides a rich collaborative environment to drive your development in
addition to a set of developer platform features to use to develop Teams
line-of-business apps, which you can then simply roll out and manage for your
enterprise through Teams.

## What’s in it for me? What’s in it for my company?

Create enterprise-specific solutions for your users by integrating with your
existing internal services and processes. Publish a Teams line-of-business app
to your private app source, and follow up by using dedicated channels for
feedback and resolving issues.

When you fully integrate an existing app or service into Teams, you can expect
to reduce complexity in both development and testing by removing legacy browser
compatibility requirements. This benefit is realized when Teams becomes the
entry point for your app.

## Does this support my organization’s digital transformation strategy?

Yes, our customers are engaging on their digital transformation journeys to
transform the way that they do business. A key component of any business
consists of the conversations that we all routinely have as part of our daily
work.

The modern Teams workplace is encouraging people to consider these conversations
and explore how they can be turned into actions by bringing internal and
external information into the hub of the conversation, and using that
information to make decisions in a more informed and timely manner. There are
over 200 “first-party” (created by Microsoft) and third-party Teams apps to use
to enhance these conversations, but sometimes there’s a need for a custom app to
leverage internal systems and data.

Teams line-of-business apps give you the opportunity to reimagine common,
repetitive collaborative processes in which people have to get information from
multiple systems before they can come to a conclusion, a conclusion that often
needs to be discussed before it’s acted on.

Let’s look at two approaches that can be delivered through Teams
line-of-business apps. (These are just examples; let your imagination and
business needs guide your investigations!)

## Acting on intelligent insights (Service + People + Actions)

We can imagine one category of this type of conversational enhancement as
“Acting on intelligent insights.” People are provided with insights from a
number of internal and external sources via bots and connectors in a Teams
channel or conversation, and then they discuss the most appropriate action and
initiate a follow-up.

You can consider a number of sources where these insights might come from:

-   Microsoft Cognitive Services

-   Platform metadata (Azure)

-   Office 365 Graph (user interaction, usage, and so on)

-   Connection from external and internal systems

What actions can we then take?

-   Engage with humans (that is, have further conversation in the channel)

-   Trigger predefined workflows (Microsoft Flow)

-   Trigger Azure Automation events

-   Pass control sentences to another bot to execute the outcomes

In the following example, a team uses Azure sentiment analysis services via the
bot framework to inform them about changes in customer sentiment.

Example: The marketing team has an Instant Response channel with a bot that uses
the social media sentiment analysis approach [described in this
article](https://docs.microsoft.com/azure/azure-databricks/databricks-sentiment-analysis-cognitive-services).
The bot pings the Instant Response channel to alert the team when customers are
unhappy. The team collaborates quickly to create a response, which is then
posted on Twitter via a connector, a bot, or a flow that has an approval chain.

## Turn conversations into actions (People + data + Actions)

We can imagine a second category of this type of conversational enhancement as
“Turn conversations into actions,” where Teams extensions are used to create and
package a Teams app that executes standardized actions from regular meetings or
common processes.

Consider which internal processes in your organization would be enhanced if
people were able to take direct action from within a conversation:

-   Real-time incident response

-   Sports events

-   Crowd management

-   Weekly triage meetings

-   FAQ bot

Example: Imagine a sales meeting support bot: a salesperson pings the bot with
the customer name, and the bot interacts with a number of internal customer
systems on the back end and returns a simple summary with the top 10 “top of
mind” items. These might include sales figures, key contacts, customer
sentiment, key blockers, opportunities, ice-breaker topics for conversation from
social media, or news events relevant to the customer.

**I already have line-of-business apps, why should my organization invest
here?**

One great place to start is to consider how much application and context
switching are users of the current custom apps forced to undertake. We know that
changing focus from one app to another takes time and can cause a person to lose
focus on the task at hand.

Another area to consider is the daily discussions related to standard business
items such as invoices, leads, tickets, or open job positions. You can bring
these items into the Teams conversation via developer platform features so the
conversation and the item are all in the same place.

You might consider two possible approaches:

-   If the current line-of-business apps have browser-based presentations, you
    can simply pin the pages in a channel, to give easy access to the apps that
    are part of a workflow and to drive conversation in Teams.

-   If the current line-of-business apps are used to gather information or data
    that is then summarized, why not create a bot that can interface with each
    app and return the summarized data in a single response or card into the
    channel? This way, the data will be accessible where it’s needed to support
    conversations, and to drive key decisions and next steps.

## So where do I start?

We propose the following high-level process to get you started:

1.  Consider how Teams line-of-business apps can help your organization and
    understand how to develop them.

2.  Engage with a target business unit and define one or two areas where this
    approach can bring benefit to your organization.

3.  Envision, scope, develop, and test your Teams apps by using the [guidance
    here](https://docs.microsoft.com/microsoftteams/platform/concepts/concepts-overview).

4.  Publish the Teams apps in your company store.

5.  Review usage and drive feedback via a dedicated channel.

6.  Evangelize and create an Ideas channel, where people see what can be done
    and can share, discuss, and prioritize ideas.

Here are some common examples to get you going:

Departmental tools

-   DevOps for admins

-   Sales dashboards

-   Candidate management

Employee resources

-   Benefits administration

-   Time and absence reporting

-   Employee profile

Support and information

-   IT helpdesk

-   Company information

-   New employee onboarding

Process and workflow

-   Approvals

-   Tickets

You can find a list of inspiring scenarios on the [App Scenarios](\~/scenarios/lob-scenarios-landing-page) page, which we’ll add to
over time.
