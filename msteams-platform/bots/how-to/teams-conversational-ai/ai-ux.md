---
title: Custom engine agent user experience
description: Learn about the user experience for custom engine agent
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
ms.date: 09/27/2024
---

# Build custom engine agent user experience

A custom engine agent is designed to transform the way we interact with systems. For user experience (UX) designers and developers, creating an outstanding user experience is crucial to fully harness its potential. This article details the necessary steps, principles, and considerations for crafting intuitve, user-centered interfaces that seamlessly integrate AI capabilities.

The key objectives to building a great user experience involves simplifying complex tasks, enhancing productivity, enabling personalized experience through adaptive learning.

## What is a custom engine agent?

A custom engine agent encompasses the following features that aid its functionality and integration within the Microsoft ecosystem:

- **Generative AI integration**: Utilizes advanced AI models to facilitate natural language processing and interaction.
- **Bots**: Extend or build bots to utilize the LLM and generative AI to provide high quality chat bots experience.
- **Customizable orchestration**: Offers extensive customization options, allowing developers to tailor the custom copilot behavior and responses to specific use cases.

To meet this goal, you must follow some mandatory and recommended steps and requirements.

## Ensure mandatory requirements for custom engine agent

The following requirements are mandatory for building the custom engine agent UX:

- [Update the app manifest to connect the bot ID with the custom engine agent node](#update-the-app-manifest-for-custom-engine-agent)

- [Stream the custom engine agent response to the user](#stream-the-custom-engine-agent-response-to-the-user).

- [Ensure the custom engine agent response contains citations](#ensure-the-custom-engine-agent-response-contains-citations).

- Ensure the custom engine agent response contains an AI Label.

- Ensure that the custom engine agent is an intelligent conversational bot.

- Ensure that the custom engine agent offers zero prompts or welcome card.

### Update the app manifest for custom engine agent

You must update the custom engine agent app manifest to define specific properties and configurations that characterize its capabilities and behavior.

Add the `botID` property to the `copilotExtension1 node in the manifest.

```json
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

### Stream the custom engine agent response to the user

A custom engine agent uses a large language model (LLM) to handle complex user requests, which can cause a delay in generating responses. To prevent this delay from being noticeable to users, custom engine agent must stream its responses, making them appear fast despite the processing time.

To stream the response:

- Informative updates: Send information on the sub-steps the agent as the response is being generated before it sends the final response.
- Response streaming: Sending the user intermediate states of the final response while the LLM creates its full response.

You can use one of the following to stream the resposne:

- Use Teams AI Library to add streaming to the agent.
- Call the bot framework APIs directly for streaming.

### Ensure the custom engine agent response contains citations

Users need to know the sources a custom engine agent uses to generate its final response. Identifying these resources allows users to validate and trust the agent's responses.

You can use one of the following to include citations for the resources used by the agent:

- Use Teams AI Library citations module.
- Incorporate citations into the Bot Framework API calls.
