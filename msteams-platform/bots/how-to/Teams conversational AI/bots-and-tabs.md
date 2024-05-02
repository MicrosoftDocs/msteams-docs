---
title: Interoperability of bot with tab
description: In this article, learn about interoperability of bot with tabs.
ms.localizationpriority: medium
ms.topic: coceptual
ms.author: v-npaladugu
author: surbhigupta
ms.date: 05/02/2024
---

# Interoperability of bot with tab

The user problem is that bots are not context-aware and accessible in the user's workflow. users want to use intelligent assistants within the context of their tasks, but they often have to switch surfaces or lose context to interact with Teams bots. users expect bots to understand and command the surfaces they are hosted in, such as personal tabs, collaboration stages, and meeting stages.
The user scenarios include building a telemetry dashboard, designing a video game, meeting to discuss product design, and creating a project plan. user scenarios involve interactive workflows that require bots to assist with complex, time-consuming, or mundane tasks. user story involves using different apps and bots in a meeting context.

The current experience is that bots have their own tab or are limited to the chat panel. current experience of bots in Teams is not optimal for interactive scenarios, as users have to leave their current app context to interact with the bot, or the bot cannot access or affect the app surface at all.
The comparable experiences are M365 Copilot and OpenAI GPT. M365 Copilot and OpenAI GPT as products that set the expectation for intelligent assistants that work side-by-side with the user in the side-panel of the app and can make meaningful changes to the app surface.
The proposed solution is to create a side-panel user experience for bots and enable bots to understand and command stages. a two-fold approach to enhance the bot experience in Teams. The first part is to create a dynamic side-panel component for bots that can be available in personal apps, meetings, and collaboration stages. The second part is to enable bots to reason over and affect the user's context and the app surface they are hosted in.

Features proposes a general architecture that uses a web socket connection or REST APIs to relay messages between the bot server and the tab client. The bot server can also store the app state data for each user and context. scenarios and considerations for using bots and tabs, such as user confirmations, multiple connections, app state awareness, and chat pane toggling. Bots and tabs are already supported for meeting stage and collab stage applications, and personal apps will soon have a side panel chat feature.
