---
title: Understand your use cases
author: clearab
description: Understand your use cases
ms.topic: conceptual
ms.author: anclear
---

# Understand your use cases

The Microsoft Teams platform offers a large variety of [extensibility points and UI elements](~/concepts/extensibility-points.md) your app can take advantage of.
> [!NOTE]
> You must have a good understanding of Teams capabilities and what is possible on the Teams platform using them.

Each method of interacting with your users has its strengths and weaknesses. Building an awesome Teams app is all about finding the right combination to meet your user's needs. If you are going to meet those needs, you first need to understand them.

## Understand the problem

Every good app has a core problem or needs it is trying to solve. Before you start building an app, you need to articulate what that problem is. At its heart, Teams is a collaboration platform, so apps that solve collaboration problems are a great fit. It is also a social platform, is natively cross-platform, sits at the heart of Office 365, and offers a personal canvas for you to create apps. In this social platform, there is a wide variety of needs that can be solved with a Teams app. You can solve wide variety of problems, provided you understand which one you are trying to solve.

## Understand your user

Understand who your user is and you can identify the right distribution model but more importantly, it helps you to identify how users use Teams. Ask relevant questions, such as:
* Are the users primarily front-line workers on mobile clients?
* Do you expect a lot of guest users to need access to your app?
* Do they use teams and channels or primarily group chats?
* How technically sophisticated are they?
* Do you need a thorough onboarding experience or a few pointers might do?

Sometimes the answer is, *We want to solve this problem for all Teams users everywhere.* If that is the case for you, spend some time understanding [what it takes to get published to AppSource](~/concepts/deploy-and-publish/appsource/prepare/submission-checklist.md).

## Provide authentication

You must identify early on if you need to protect the services you are exposing and at what level. Remember, the web services exposed in your Teams app are publicly available over the internet. So, if you need to secure them start thinking about it now.

## Build entire app be within Teams

Whether you are building something new or bringing an existing solution into Teams, it is important to decide if the entire app is going to be inside the Teams client. Check if it makes sense to only bring in a portion of the experience. With a combination of tabs, messaging extensions, task modules, interactive cards, and conversational bots you can build complex apps completely in Teams.
Remember who your users are and the problem you are trying to solve. Do they already have a system for solving most of the problem or you just need to extend a sub-set of the functionality into Teams? Typically, if you are going to bring in a portion of your solution, you must focus on sharing, collaborating, initiating, and monitoring workflows.

## Plan the onboarding experience

Your onboarding experience can be the difference between success or failure for your app. For each capability of your app and each context that capability can be installed in, you must have a plan for how you are going to introduce yourself. How you introduce your conversational bot when it is installed in a channel with a thousand people, is different when it is installed in a one-to-one chat. What happens when a user first configures your tab in a channel? If you are sharing cards with a messaging extension, does it make sense to add a small link to a **learn more** page to help introduce users to what else your app can do?

Knowing who your users are helps you to craft the right experience. Do you expect most people to already have some context of what your app is for, or to have already used your services in another context? Are they coming to your app with no prior knowledge? Craft your onboarding experience with your key users in mind.

Remember, users can discover your app in a variety of ways. They might be the ones installing it or they might be introduced to your app when another user uses it to share content. If you want more users to use your app, you must look for ways to introduce yourself to everyone.

Above all else, remember that nobody likes spam. Blasting away with personal and channel messages is a good way to get un-installed quickly!

## See also

> [!div class="nextstepaction"]
> [Choose how to distribute your app](../deploy-and-publish/overview.md)

> [!div class="nextstepaction"]
> [Design effective tabs](~/tabs/design/tabs.md)

> [!div class="nextstepaction"]
> [Create amazing bots](~/bots/design/bots.md)

## Next step

> [!div class="nextstepaction"]
> [Map your use cases to functionality](~/concepts/design/map-use-cases.md)
