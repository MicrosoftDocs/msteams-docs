---
title: Connected authentication for Teams agents and apps
description: Learn how to implement, configure connected authentication in Microsoft Teams agents and app.
ms.date: 06/10/2025
ms.topic: conceptual
author: surbhigupta
ms.author: surbhigupta
ms.localizationpriority: medium
---

# Connected authentication for Teams

[Add introduction]

Connected authentication enables you to unify sign-in process for Teams agents and bot and tab apps.

[Add key benefits]

- Seamless user interaction
- Efficient developer experience
- Enhanced security
- Consistent onboarding user experience

## Prerequisites

- Account linking URL
- Nested app authentication (NAA) based PKCE authentication flow for tab app authentication

## User journey for connected authentication

1. A user installs and opens the app.
1. The user navigates to bot chat and sees the sign-in prompt.
1. The app initiates bot sign-in, which opens a task module and external auth popup.
1. The bot app completes bot auth; prompted to link account with Microsoft NAA.
1. The app proceeds with account linking, consents to NAA dialog, and receives NAA token.
1. The app uses the NAA token is used to authenticate and create a new profile.
1. The app updates the backend links for the bot and NAA profiles for unified authentication.
1. Task module closes, and user is authenticated for both tab and bot.

## Developer experience

## Authentication flow for Connected authentication
