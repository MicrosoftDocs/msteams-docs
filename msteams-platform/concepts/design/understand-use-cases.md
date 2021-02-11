---
title: Understand your use cases
author: clearab
description: Understand your use cases
ms.topic: conceptual
ms.author: anclear
---
# Understand your use cases

The Microsoft Teams platform offers a large variety of [extensibility points and UI elements](~/concepts/extensibility-points.md) your app can take advantage of. If you don't already have a good understanding of what is possible on the Teams platform, you should read that article first.

Each method of interacting with your users has it's own strengths and weaknesses. Building an awesome Teams app is all about finding the right combination to meet your user's needs. If you're going to meet those needs, you first need to understand them.

## What problem are you trying to solve?

Every good app has a core problem (or need) it is trying to solve - before you start building you need to articulate what that problem is. At it's heart, Teams is a collaboration platform, so apps looking to solve collaboration problems are a great fit. It's also a social platform, is natively cross-platform, sits at the heart of Office 365, and offers a personal canvas for you to create apps on. There is an incredibly wide variety of needs that can be solved with a Teams app, just be sure you understand which one you're trying to solve.

## Who are you solving it for?

Sometimes this can be  obvious - "My team's monitoring system needs to send alerts somewhere, we need to be able to discuss them really quickly, and none of us want to check our email." Sometimes your target audience can grow over time - "Our sister team is really jealous of our alerting system, and now they want in on the action." Understanding who your users are will help you identify the right distribution model, but more importantly will help you identify *how they use Teams*. Are they primarily front-line workers on mobile clients? Do you expect a lot of guest users to need access to your app? Do they use teams and channels, or primarily group chats? How technically sophisticated are they? Will you need a thorough on-boarding experience, or will a few pointers do?

Sometimes the answer is "We want to solve this problem for all Team's users everywhere." If that's the case for you you'll want to spend some time understanding [what it takes to get published to AppSource](~/concepts/deploy-and-publish/appsource/prepare/submission-checklist.md).

## Do you need authentication?

You should identify early on if you're going to need to protect the services you're exposing, and at what level. Remember the web services you'll be exposing in your Teams app are publicly available over the internet, so if you need to secure them start thinking about how now.

## Should the entire app be in Teams?

Whether you're building something entirely new, or bringing an existing solution into Teams, it is important to decide if the entire app is going to be inside the Teams client, or if it makes sense to only bring in a portion of the experience. With a combination of tabs, messaging extensions, task modules, interactive cards, and conversational bots you can build complex apps completely inside of Teams. However, that doesn't always make sense. Remember who your users are, and the problem you're trying to solve. Do they already have a system for solving most of the problem, and you just need to extend a sub-set of the functionality into Teams? Typically if you're only going to bring in a portion of your solution you should focus on sharing, collaboration, and initiating and monitoring workflows.

## What will the onboarding experience be like?

Your onboarding experience can be the difference between success or failure for your app. For each capability of your app, and for each context that capability can be installed in, you should have a plan for how you're going to introduce yourself. How you introduce your conversational bot when it is installed in a channel with a thousand people will probably be different than when it is installed in a one-to-one chat. What happens when a user first configures your tab in a channel? If you're sharing cards with a messaging extension, does it make sense to add a small link to a "learn more" page to help introduce users to what else your app can do?

Knowing who your users are will help you craft the right experience. Do you expect most people to already have some context of what your app is for, or to have already used your services in another context? Or are they coming to your app with no prior knowledge? Craft your onboarding experience with your key users in mind.

Remember too that users can discover your app in a variety of ways - they might be the ones installing it, or they might be introduced to your app when another team member uses it to share content. If you want your app to spread, you should look for ways to introduce yourself to everyone.

Above all else, remember that nobody likes spam. Blasting away with personal and channel messages is a good way to get un-installed quickly!

## Next steps

* [Map your use cases to functionality](~/concepts/design/map-use-cases.md)
* [Choose how to distribute your app](../deploy-and-publish/overview.md)

## Learn More

* [Design effective tabs](~/tabs/design/tabs.md)
* [Create amazing bots](~/bots/design/bots.md)

