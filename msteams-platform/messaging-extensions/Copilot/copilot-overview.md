---
title: Copilot overview
author: v-ypalikila
description: Learn about copilot and how to use copilot to build plugins for Teams apps.
ms.localizationpriority: medium
ms.topic: overview
ms.author: anclear
ms.date: 09/05/2023
---

# Copilot

Microsoft 365 Copilot is powered by an advanced processing and orchestration engine that seamlessly integrates Microsoft 365 apps, Microsoft Graph, and large language models (LLMs) to turn your words into the most powerful productivity tool. While Copilot is already able to use the apps and data within the Microsoft 365 ecosystem, many users still depend on various external tools and services for work management and collaboration. You can address this gap by extending Copilot to enable users to work with their third-party tools and services, unlocking the full potential of Microsoft 365 Copilot.
You can extend Microsoft 365 Copilot by building a plugin or by connecting to an external data source.

## What is a plugin?

A plugin allows Copilot to interact directly with third-party data, apps, and services, enhancing its capabilities and broadening its range of capabilities. Plugins allow Copilot to:

* Retrieve real-time information, for example, latest news coverage on a product launch.
* Retrieve knowledge-based information, for example, my team’s design files in Figma.
* Perform actions on behalf of the user, for example, create a Jira ticket.

All Message Extensions will be supported as plugins pending validation to ensure the plugin meets quality, security, privacy, and usefulness expectations. For developers that don't already have a ME, there are two ways to build one:

* Build an API-backed ME: Using the Teams Toolkit, developers can easily create a API-backed ME from an existing API or ChatGPT plugin. This method requires an OpenAPI specification, documenting the API.

* Build a bot-backed ME: For developers that want a one-on-one conversational experience in addition to their plugin, they can create a new message extension from a bot using the Teams Toolkit.
OpenAPI Specification

To assist copilot in understanding when and how to use your plugin, OpenAPI specification documents are provided with plugins to describe the underlying API. This document is required when building a plugin from an API.
