---
title: Understanding your app's use cases
author: heath-hamilton
description: Plan your app, understand your user and their need, understand the user problems that your app would solve, plan user authentication and their onboarding experience
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: anclear
---

# Understand your use cases

Building an awesome Teams app is all about finding the right combination to meet your user's needs. At its heart, Teams is a collaboration platform. It's also a social platform, is natively cross-platform, sits at the heart of Office 365, and offers a personal canvas for you to create apps.

In this collaborative social framework, there is a wide variety of user needs that can be solved with a Teams app. For instance, an app that bridges gaps in achieving effective collaboration are a great fit.

If you're going to meet those needs, you first need to understand them.

:::row:::
    :::column span="":::
    ### Understand the problem

    Every app has a core problem or a need to solve. Before you start building an app, you need to articulate what that problem is. You can solve wide variety of problems, provided you understand which one you're trying to solve.
    
    :::column-end:::
    :::column span="":::
    Ask relevant questions:
    
    | # | Examples |
    | --- | --- |
    | 1 | What are the pros and cons of the current state system used by your users? |
    | 2 | What are the issues faced by your users that you want to address? |
    | 3 | What features or capabilities your users like and love in their current way of doing the process? |
    |
    :::column-end:::
:::row-end:::
:::row:::
    :::column span="":::
    ### Understand your user

    Understand who your user is and you can identify the right distribution model. It helps you to identify how users use Teams.
    :::column-end:::
    :::column span="":::
    Ask relevant questions:
    
    | # | Examples |
    | --- | --- |
    | 1 | Are the users primarily front-line workers on mobile clients? |
    | 2 | Do you expect many guest users to need access to your app? |
    | 3 | Do they use teams and channels or primarily group chats? |
    | 4 | How technically sophisticated are your primary users? |
    | 5 | Do you need a thorough onboarding experience or a few pointers might do? |

    Sometimes the answer is, *We want to solve this problem for all Teams users everywhere.* If that is the case for you, spend some time understanding [what it takes to get published to AppSource](~/concepts/deploy-and-publish/appsource/prepare/submission-checklist.md).
    :::column-end:::
:::row-end:::
:::row:::
    :::column span="":::
    ### Understand the limitations of the app

    Knowing the limitations of the apps for data accessibility and data residency requirement will help you design better apps. This is important, as having information on who owns the data and availability of APIs impacts the solution architecture.
    :::column-end:::
    :::column span="":::
    | # | Examples |
    | --- | --- |
    | 1 | What are the challenges with back end integration of the current app? |
    | 2 | Who owns the back end data? In-house or third-party. |
    | 3 | Are there firewalls that impact the functioning of the app? |
    | 4 | Are there APIs to access the data you need for functioning of your app? |
    :::column-end:::
:::row-end:::
:::row:::
    :::column span="":::
    ### Provide authentication

    You must identify early on if you need to protect the services you are exposing and at what level. Remember, the web services exposed in your Teams app are publicly available over the internet.
    :::column-end:::
    :::column span="":::
    | # | Examples |
    | --- | --- |
    | 1 | Will the users access different views of data based on their roles? |
    | 2 | Is there PII involved? |
    | 3 | Will the interactions also be based on the user roles? |
    | 4 | Will external users access the app? |

    :::column-end:::
:::row-end:::

## Plan beyond app building

- Decide what goes in Teams

    Whether you are building something new or bringing an existing solution into Teams, it is important to decide if the entire app is going to be inside the Teams client. Check if it makes sense to only bring in a portion of the experience. With a combination of tabs, messaging extensions, task modules, Adaptive Cards, and conversational bots you can build complex apps completely in Teams.

    Remember who your users are and the problem you are trying to solve. Do they already have a system for solving most of the problem or you just need to extend a sub-set of the functionality into Teams? Typically, if you are going to bring in a portion of your solution, you must focus on sharing, collaborating, initiating, and monitoring workflows.

- Plan the onboarding experience

    Your onboarding experience can be difference between success or failure for your app. For each capability of your app and each context that capability can be installed in, you must have a plan for how you are going to introduce yourself. How you introduce your conversational bot when it is installed in a channel with a thousand people, is different when it is installed in a one-to-one chat. What happens when a user first configures your tab in a channel? If you are sharing cards with a messaging extension, does it make sense to add a small link to a **learn more** page to help introduce users to what else your app can do?

    Knowing who your users are, helps you to craft the right experience. Do you expect most people to already have some context of what your app is for, or to have already used your services in another context? Are they coming to your app with no prior knowledge? Craft your onboarding experience with your key users in mind.
    
    Remember, users can discover your app in a various ways. They might be the ones installing it or they might be introduced to your app when another user uses it to share content. If you want more users to use your app, you must look for ways to introduce yourself to everyone.
    
    Above all, remember nobody likes spam. Blasting away with personal and channel messages is a good way to get un-installed quickly!

- Plan for the future

    Identify which new features the user will prefer to have in the current solution. If you have a roadmap for new features to add to the app, the design and architecture will be impacted.

## Next step

> [!div class="nextstepaction"]
> [Map your use cases](../../concepts/design/map-use-cases.md)

## See also

[Device capabilities](~/concepts/device-capabilities/device-capabilities-overview.md)
