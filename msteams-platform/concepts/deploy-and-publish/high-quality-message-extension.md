---
title: Create high quality message extension
description: Learn how to 
ms.topic: how-to
author: v-preethah
ms.author: surbhigupta
ms.localizationpriority: high
ms.date: 10/18/2023
---

# Create high quality message extension plugin

Target audience: ISV or LOB app developers who want to develop high-quality ME plugin.

Introduction
To get the best out of copilot, only high-quality plugins are recommended for Message extensions. As a developer, you must adhere to follow the mandated criteria and quality parameters to build high-quality message extension plugins. This document provides guidance on the requirements to be fulfilled.
High-quality Message extension
A rich Adaptive Card that should match copilot standards. Action buttons……It’s search based command, not action based. Only high-quality plugins are allowed/available in copilot, so the developers are expected to build such plug-ins.

Mandatory requirements
For the app to be validated successfully, ensure the following mandatory criteria are met.

Criteria for Message extension
Must create a search-based message extension that supports both aid in Search or Summarization of information. Search through task module is not support.
Must work beyond the basic or single attribute search and able to handle multi attribute search. Define multi-parameter search in the app manifest.
Parameters defined must have good descriptions i.e. acceptable parameter, Enums, acronyms, output format, etc.
Long description and short description

Create a Message extension
As a developer, you must focus on the following factors when creating the high-quality ME plugin.
App manifest
App description
Search Command description
Response card

App manifest
For: Complex Utterances Support for Deep Retrieval
With copilot, we are moving from basic search to complex search that handles multi attribute search in place of single attribute search. To enable mutli attribute search, you need to define multi-parameters in the manifest.
Task based search (Use tab switcher for the four set of examples)
Basic utterance: Search for tasks related to Northwind
Advanced utterance: Search for high priority tasks related to Northwind which are due tomorrow
Sample Manifest for Task based search
