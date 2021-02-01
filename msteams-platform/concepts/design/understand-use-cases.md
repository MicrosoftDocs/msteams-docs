---
title: Plan your app
author: heath-hamilton
description: What to do before you strt
ms.topic: conceptual
ms.author: anclear
---
# Plan your Microsoft Teams app

Microsoft Teams is a collaboration platform with hundreds of millions of daily active users. Building a Teams app can significantly grow your user base and drive engagement for your product or service.

Before you start designing or write a single line of code, though, read through the following guidelines to help you plan an effective app.

## 1. Identify your use cases

It's important to understand who your users are and what a Teams app can do for them.

Start with a problem you'd like to solve for your users. Identify personas and scenarios to build for, then focus on a persona with many users. What are their goals? What's a common scenario for them? What industry do they work in? Be as specific as possible&#8212;you don't have to build everything for everyone at once.

Draft these scenarios as user stories or journeys. Don't worry about specifying where or how the scenarios happen&#8212;that comes next.

## 2. Determine your app's capabilities

Teams has a variety of extension points (referred to as [capabilities](~/concepts/extensibility-points.md)) and UI components your app. If you don't already have a good understanding of what is possible on the Teams platform, you should read that article first.

Each method of interacting with your users has its strengths and weaknesses. Building an effective Teams app is all about finding the right combination to meet your user's needs. If you're going to meet those needs, you first need to understand them.

## 3. Consider common Teams app scenarios

Start thinking about how your app may handle some common Teams scenarios (if applicable).

### Should my entire app be in Teams?

Whether you're creating something new or [integrating an existing app](~/samples/integrating-web-apps.md), you must determine if the experience will happen completely inside Teams or just a portion of it. Remember who your users are and the problem you're trying to solve for them. You can build a complex app that runs completely inside Teams, but maybe that doesn't make sense for them. For example, if their current system solves most of the problem, you could enhance the experience by including a subset of functionality in Teams that focuses on collaboration or workflows.

### What's the onboarding experience?

Your first-run experience can determine whether your app succeeds or fails. For each app capability and the contexts where users can add your app, you must have a plan for how the app introduces itself. For example, how you introduce a conversational bot in a [channel](../../bots/design/bots.md#introductions-in-group-chats-and-channels) with a thousand people should be different than a [one-on-one chat](../../bots/design/bots.md#welcome-message-in-a-one-on-one-chat).

Understand your users' familiarity with your app. If your app is established and most have used it before in another context, the onboarding experience will likely be different than if you're introducing a brand-new app. Also, remember that users discover Teams apps in a variety of ways. Account for users who add your app and users who learn about your app when a teammate uses it to share content.

For specific information on creating an effective onboarding experience, see the [Teams app design guidelines](../../concepts/design/design-teams-app-overview.md).

### Do I need authentication?

xxx

## What problem are you trying to solve?

Every good app has a core problem (or need) it is trying to solve - before you start building you need to articulate what that problem is. At its heart, Teams is a collaboration platform, so apps looking to solve collaboration problems are a great fit. It's also a social platform, is natively cross-platform, sits at the heart of Office 365, and offers a personal canvas for you to create apps on. There is an incredibly wide variety of needs that can be solved with a Teams app, just be sure you understand which one you're trying to solve.

## Who are you solving it for?

Sometimes this can be obvious "Our monitoring system sends alerts, but 30 percent of our customers tell us the alerts get lost in email." Sometimes your target audience can grow over time - "Our sister team is really jealous of our alerting system, and now they want in on the action." Understanding who your users are will help you identify the right distribution model, but more importantly will help you identify *how they use Teams*. Are they primarily front-line workers on mobile clients? Do you expect a lot of guest users to need access to your app? Do they use teams and channels, or primarily group chats? How technically sophisticated are they? Will you need a thorough on-boarding experience, or will a few pointers do?

Sometimes the answer is "We want to solve this problem for all Teams users everywhere." If that's the case for you you'll want to spend some time understanding [what it takes to get published to AppSource](~/concepts/deploy-and-publish/appsource/prepare/submission-checklist.md).

## Do you need authentication?

You should identify early on if you're going to need to protect the services you're exposing, and at what level. Remember the web services you'll be exposing in your Teams app are publicly available over the internet, so if you need to secure them start thinking about how now.

## Should the entire app be in Teams?

Whether you're building something entirely new, or bringing an existing solution into Teams, it is important to decide if the entire app is going to be inside the Teams client, or if it makes sense to only bring in a portion of the experience. With a combination of tabs, messaging extensions, task modules, interactive cards, and conversational bots you can build complex apps completely inside of Teams. However, that doesn't always make sense. Remember who your users are, and the problem you're trying to solve. Do they already have a system for solving most of the problem, and you just need to extend a sub-set of the functionality into Teams? Typically if you're only going to bring in a portion of your solution you should focus on sharing, collaboration, and initiating and monitoring workflows.

## What will the onboarding experience be like?

Your first-run experience can determine whether your app succeeds or fails. For each app capability and each context where users can add your app, you must have a plan for how the app introduces itself. Some examples:

* Introducing a conversational bot in a channel with a thousand people should probably be different than in a one-on-one chat.
* What happens when a user adds a tab top a channel?
* If you're sharing cards with a messaging extension, does it make sense to add a small link to a "learn more" page to help introduce users to what else your app can do?

Knowing who your users are will help you craft the right experience. Do you expect most people to already have some context of what your app is for, or to have already used your services in another context? Or are they coming to your app with no prior knowledge? Craft your onboarding experience with your key users in mind.

Remember too that users can discover your app in a variety of ways - they might be the ones installing it, or they might be introduced to your app when another team member uses it to share content. If you want your app to spread, you should look for ways to introduce yourself to everyone.

Above all else, remember that nobody likes spam. Blasting away with personal and channel messages is a good way to get un-installed quickly!

## Next steps

* [Map your use cases to functionality](~/concepts/design/map-use-cases.md)
* [Choose how to distribute your app](~/concepts/deploy-and-publish/apps-publish.md)

## Learn More

* [Design effective tabs](~/tabs/design/tabs.md)
* [Create amazing bots](~/bots/design/bots.md)

