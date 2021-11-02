---
title: Exploring Teams for building apps
author: heath-hamilton
description: Overview of exploring Microsoft Teams features.
ms.topic: overview
ms.localizationpriority: medium
ms.author: lajanuar
ms.date: 11/02/2021
---
# Exploring Teams app building features

With Teams, you can build your app in a feature-rich environment. It lets you extend the Teams capabilities for your app solution.

Let's learn about some of Teams' features.

:::image type="content" source="../msteams-platform/assets/images/overview/teams-apps-capabilities.png" alt-text="Image showing Teams capabilities" border="true":::

## Teams Features

| Feature | Description | Useful for |
| --- | --- | --- |
|Tabs | Tabs are Teams-aware webpages embedded in Microsoft Teams. They are simple HTML `iframe` tags that point to domains declared in the app manifest and can be added as part of a channel inside a team, group chat, or personal app for an individual user. | Personal tab, channel or group tab, stage view,link unfurling |
| Bots | A bot also referred to as a chatbot or conversational bot is an app that runs simple and repetitive automated tasks performed by the users, such as customer service or support staff. A bot interaction can be a quick question and answer, or it can be a complex conversation that provides access to services. | Information about the weather, make dinner reservations, or provide travel information. |
| Messaging extensions | Messaging extensions allow the users to interact with your web service through buttons and forms in the Microsoft Teams client. They can search or initiate actions in an external system and you can send back the results of that interaction to the Microsoft Teams client in the form of a richly formatted card. | Reserve a resource and allow the channel to know the reserved time slot, search for a work item in Azure DevOps, and share it with the group as an Adaptive Card, create a bug in your tracking system based on a Teams message, assign that bug to Bob, and send a card to the conversation thread with the bug's details. |
|

## App scope

Teams lets you determine the scope of app usage - on an individual level or in a collaborative context.

- Personal app experience: A personal app is a dedicated space or bot to help users focus on their own tasks or view activities important to them.
- Shared app experience: Team, channel, and chat are collaboration spaces. Apps in these contexts are available to everyone in that space. Collaboration spaces typically focus on additional workflows or unlocking new social interactions.

## Entry points

The Teams platform provides a flexible set of entry points, such as team, channel, and chat, where people can discover and use your app. Your app can be as simple as embedding existing web content in a tab or a multi-faceted app that users interact with across several contexts. The most successful apps are native to Teams, so choose your app's entry points carefully.

## Customizable apps

In addition to the main features, you can also choose to customize your app with user authentication and Microsoft Graph features.

Now, you know about some features that Teams offers. Let's go back to the user story and see how you can use Teams features to build your app.
