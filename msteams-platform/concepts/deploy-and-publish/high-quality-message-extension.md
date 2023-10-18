---
title: Create high quality message extension
description: Learn about the guidelines and criteria to create a high quality plugin for your message extension that's to be associated with copilot.
ms.topic: how-to
author: v-preethah
ms.author: surbhigupta
ms.localizationpriority: high
ms.date: 10/18/2023
---

# Guidelines to create a high quality message extension plugin

Target audience: ISV or LOB app developers who want to develop high-quality ME plugin.

For your app to be recognized and fetched by copilot, it's is recommended to built a high quality message extension plugin. To get the best out of copilot, only high-quality plugins are recommended for Message extensions. As a developer, you must adhere to follow the mandated criteria and quality parameters to build high-quality message extension plugins. This document provides guidance on the requirements to be fulfilled.

A rich Adaptive Card that should match copilot standards. Action buttons……It’s search based command, not action based. Only high-quality plugins are allowed/available in copilot, so the developers are expected to build such plug-ins.

Mandatory requirements
For the app to be validated successfully and to be identified in the advanced search, ensure the following mandatory criteria are met.

## Create a Message extension

As a developer, you must focus on the following factors when creating the high-quality ME plugin.

* App manifest
* App description
* Search Command description
* Response card

### Criteria for Message extension

* Must create a search-based message extension that supports both aid in Search or Summarization of information. Search through task module is not support.
* Must work beyond the basic or single attribute search and able to handle multi attribute search. Define multi-parameter search in the app manifest.
* Parameters defined must have good descriptions i.e. acceptable parameter, Enums, acronyms, output format, etc.
* Long description and short description

### App manifest

For: Complex Utterances Support for Deep Retrieval
With copilot, we are moving from basic search to complex search that handles multi attribute search in place of single attribute search. To enable mutli attribute search, you need to define multi-parameters in the manifest.
Task based search (Use tab switcher for the four set of examples)
Basic utterance: Search for tasks related to Northwind
Advanced utterance: Search for high priority tasks related to Northwind which are due tomorrow
Sample Manifest for Task based search

You must update the app manifest to suit the advanced search for deep retrieval of information.
Based on working with developers and feedback received, ME plugin should work beyond basic search (single attribute search) I.e. it  should be able to handle 3+ complex utterances (multi attribute) for deep and precise retrieval of information. To enable this, it is highly recommended to implement multi-parameter which can be defined in Manifest. As of Nov 2023, a total of 5 attributes are supported per parameter of which the first one is available on UX of search flyout as well. These parameters are needed to be backed with good descriptions which can contain combination of - acceptable parameter, Enums, acronyms, output format etc. A good description is one which explains what system is expecting in natural language with output format.

This will require developers to make changes at server side as well. Developers can define their format of output in the manifest and test with user utterances in copilot to see how results are being processed. Accordingly, developers can tweak parameter descriptions to get accurate parameters.  

## Descriptions

For: Good discoverability and User Awareness

### App description

Whenever explicit name of App is taken along with a verb e.g. “Find Jira tickets.. ” then ME plugin should be invoked. This should work consistently for a single user.  For that developer needs to work on their App descriptions and command descriptions. Focus would be on short description of app which should succinctly define in natural language what overall app does it can include name of the app as well.
App Long description should clearly call out how users can use ME plugin in copilot and what functionality to expect. promptE.g. “User Jira Cloud in Copilot to search and summarize your tasks”  

| Category | Examples of Short App Description |
|---|---|
| Tasks | Create, search, view tickets, bugs and projects |
| Surveys | Create and search for surveys and results |
| CRM | Search and view customer leads |
| General | Stock and share look up tool |

### Search command description

Command description is used to map user intent and utterance to search command inside a plugin. Its description in natural language should focus on what it searches (detailed list) and how. Include verbs and synonyms if applicable. For better results, focus on keywords that are likely to be used in the search function of your native apps.

| Category | Examples of Search Command Description  |
|---|---|
| Tasks | Search for high priority tasks related to Northwind which are due tomorrow  |
| Surveys | Search for surveys, drafts and results with keywords or number of respondents. |
| CRM | Through CRM plugin, find qualified, unqualified and quoted leads of clients and customers |
| General | Find n number of stocks or listed equities using keyworks, key ratios, index etc |

Ensure the descriptions follow the given standards:

* Anti-Compete: Developer should not use name of any other plugin in both short and full description.
* Responsible AI: Developers should not use inappropriate or offensive keywords  e.g. P**N, F**K and other similar offensive words.
* Prompt Injections: text should not lead to any kind of prompt injections. Additionally, description should not contain any kind of symbols or text that indicates that it can be used as code for Prompt injection. Should not use phrases, functions and codes that call their app recurrently.

## Response information

For a high-quality ME, the accepted output is an Adaptive Card, hence it must work well and look great in a co-pilot world.

### Rich Adaptive Card

* Both previews and content should be part of single response
* Information in Adaptive Card should represent at least 2 pieces of information besides: Logo title of app, thumbnail, and title of the information. One way to identify these fields could be most often searched attributes can be part of Adaptive Card response e.g. data modified, author, status, flags etc.  
* Adaptive Card should look good in all three surfaces: Win32, Web and Mobile (iOS and Android)
* Adaptive Card should have at least one action button and maximum 4 actions buttons.  
* Acv2 implementation so that card refreshes, if users change any information on the card or task module. It is highly recommended to implement this if the user is likely to change information through task module, stage view or directly from the card itself. [*Recommended*]
* URL should be part of Adaptive Card meta data. This will allow cards to be easily copy pasted from one hub to another. [*Recommended*]
* Alt-Text – If there is an image in Adaptive Card beyond thumbnails, it can have alt-text. [*Recommended*]

#### Supported Actions

Use only the following recommended Action types for buttons in your Card

* Action.OpenUrl: To open a specified URL from the Card.
* Action.ToggleVisibility: Shows or hides one or more elements in the card.
* Action.Execute: Gathers the input fields and sends as a request to your bot service.
* Action.Submit: Use it to open Task module/Stage view using type invoke in data object.  

> [!NOTE]
> Type imBack, messageBack NOT supported in data object.
