---
title: unified-authentication, entra-naa, teams-app-auth
description: Implement a unified authentication flow in Teams apps by combining tab and bot auth with persistent login via Entra NAA.
ms.topic: conceptual
ms.localizationpriority: medium
ms.date: 04/09/2025
---

# Streamline Sign-In with Unified Authentication

Currently, tabs and bot chats have separate authentication flows, resulting in a repetitive login experience for users. To improve this, both flows are being combined into a single authentication process. The design includes account linking with Microsoft Entra Nested App Authentication (Entra NAA), allowing users to remain logged in even if their primary login method expires.

## Key Benefits

* Streamlines development by letting you focus on core bot and tab features.
* Supports private setup before launch, helping avoid user confusion.
* Boosts reliability and trust for both users and developers.
* Creates a consistent onboarding flow with cleaner, more maintainable code.
* Improves visibility into user drop-off and engagement patterns.
* Offers clear guidance for handling authentication and onboarding the right way