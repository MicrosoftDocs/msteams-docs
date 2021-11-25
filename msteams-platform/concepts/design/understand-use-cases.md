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

- Understand the problem: Every app has a core problem or a need to solve. Before you start building an app, you need to articulate what that problem is. You can solve wide variety of problems, provided you understand which one you're trying to solve.

- Understand your user: Understand who your user is and you can identify the right distribution model. It helps you to identify how users use Teams.

- Understand the limitations of the app: Knowing the limitations of the apps for data accessibility and data residency requirement will help you design better apps. This is important, as having information on who owns the data and availability of APIs impacts the solution architecture.

- Provide authentication: You must identify early on if you need to protect the services you are exposing and at what level. Remember, the web services exposed in your Teams app are publicly available over the internet.

## Plan beyond app building

- Decide what goes in Teams

    Whether you're building a new app or bringing an existing solution into Teams, it's important to decide if you want the entire app to be in the Teams client. Check if it makes sense to integrate only a portion of the app. If you want to bring in a part of your solution, focus on sharing, collaborating, initiating, and monitoring workflows.

- Plan the onboarding experience

    Knowing who your users are, helps you to create the right experience. Craft your onboarding experience with your key users in mind. Users can discover your app in a various ways. What happens when a user first configures your tab in a channel? How you introduce your conversational bot when it is installed in a channel with a thousand people, is different when it is installed in a one-to-one chat.

- Plan for the future

    Identify which new features the user will prefer to have in the current solution. If you have a roadmap for new features to add to the app, the design and architecture will be impacted.

## Next step

> [!div class="nextstepaction"]
> [Map your use cases](../../concepts/design/map-use-cases.md)

## See also

[Device capabilities](~/concepts/device-capabilities/device-capabilities-overview.md)
