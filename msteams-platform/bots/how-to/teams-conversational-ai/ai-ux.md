---
title: Custom engine agent user experience
description: Learn about the user experience for custom engine agent
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
ms.date: 09/27/2024
---

# Build custom engine agent user experience

Custom engine agents (CEA) are designed to transform the way we interact with systems. For user experience (UX) designers and developers, creating an outstanding user experience is crucial to fully harness its potential. This article details the necessary steps, principles, and considerations for crafting intuitve, user-centered interfaces that seamlessly integrate AI capabilities.

The key objectives to building a great user experience involves simplifying complex tasks, enhancing productivity, enabling personalized experience through adaptive learning.

## What is a CEA?

A CEA encompasses the following features that aid its functionality and integration within the Microsoft ecosystem:

- **Generative AI integration**: Utilizes advanced AI models to facilitate natural language processing and interaction.
- **Bots**: Extend or build bots to utilize the LLM and generative AI to provide high quality chat bots experience.
- **Customizable orchestration**: Offers extensive customization options, allowing developers to tailor the custom copilot behavior and responses to specific use cases.

To meet this goal, you must follow some mandatory and recommended steps and requirements.

## Ensure mandatory requirements for CEA

The following requirements are mandatory for building the CEA UX:

- Update the app manifest to connect the bot ID with the CEA node.

- Stream the CEA response to user's input (or query).

- Ensure the CEA response contains citations, when needed (UX is hub based).

- Ensure the CEA response contains an AI Label.

- Ensure that the CEA is an intelligent conversational bot.

- Ensure that the CEA offers zero prompts or welcome card.

### Update the app manifest for CEA

You must update the CEA app manifest to define specific properties and configurations that characterize its capabilities and behavior.

Add the `botID` property to the `copilotExtension1 node in the manifest.

```
"bots": [ 

    { 

      "botId": "bd5b01bf-03ac-4909-99dc-41c6e88451ff", 

      // ... existing bot node fields 

      "registrationInfo": { 

        "source": "microsoftCopilotStudio", 

        "environment": "7211551f-2b82-e1af-9013-002025094241", 

        "schemaName": "cr4c9_copilot", // New, specific to copilot studio bots 

        "clusterCategory": "preprod" // New, specific to copilot studio bots 

      } 

    } 

  ], 

  "copilotExtensions": { 

    "customEngineCopilots": [{ // New 

      "type": "bot", // Only option 

      "id": "bd5b01bf-03ac-4909-99dc-41c6e88451ff"  // Validated against bots node 

    }] 

  }, 
```
