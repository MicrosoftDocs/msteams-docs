---
title: Create high-quality message extension
description: Learn about the guidelines and criteria to create a high-quality plugin for your message extension that's to be associated with copilot.
ms.topic: how-to
author: v-preethah
ms.author: surbhigupta
ms.localizationpriority: high
ms.date: 10/18/2023
---

# Guidelines to create a high-quality message extension plugin

For copilot to recognize and fetch your app, it's recommended to build a high-quality message extension plugin. To get the best out of copilot, only high-quality plugins are recommended for Message extensions. As a developer, you must adhere to follow the mandated criteria and quality parameters to build high-quality message extension plugins. This document provides guidance on the requirements to be fulfilled.

A rich Adaptive Card that should match copilot standards. It’s search based command, not action based. Only high-quality plugins are allowed or available in copilot, so the developers are expected to build such plug-ins.

## Mandatory requirements

For the app to be validated successfully and to be identified in the advanced search, ensure the following mandatory criteria are met.

| Criteria | Fulfillment |
|---|---|
| Manifest version | Manifest version of ME plugin should be 1.13 or above. [*Mandatory*] |
| Response Time | Response shouldn't be more than 9 seconds for P99, 5 Seconds for P75 and 2 Seconds for P50. [*Mandatory*] |
| Reliability | Apps should be able to meet 99.9% availability for their services that is, if Copilot calls for a plugin 1000 times, it should give meaningful response 999 times. [*Mandatory*] |
| Zero Regressions | In case, developers might need to resubmit their apps for validation in that case existing ME functionality, which was working before, shouldn't break.
Applicable only for ISV apps and not for LOB apps. [*Mandatory*] |
| Single sign-on (SSO) | Update your Microsoft Azure Active Directory App Registration for SSO (if you have SSO), if applicable. [*Recommended*] |
| Content Security Policy | Amend your Content Security Policy headers, if applicable. [*Recommended*] |

## Criteria to create high-quality message extension

As a developer, you must focus on the following factors when creating the high-quality ME plugin.

* App manifest
* Parameter description
* App description
* Search Command description
* Response card

When creating a high-quality message extension:

* Must create a search-based message extension that supports both aid in Search or Summarization of information. Search through task module isn't support.
* Must work beyond the basic or single attribute search and able to handle multi-attribute search. Define multi-parameter search in the app manifest.
* Parameters defined must have good descriptions, that is, acceptable parameter, Enums, acronyms, output format, etc.
* Long description and short description.
* Rich adaptive response card.

### App manifest

Message extension must support Complex Utterances Support for Deep Retrieval. Based on working with developers and feedback received, ME plugin should work beyond basic search (single attribute search) that is, it should be able to handle 3+ complex utterances (multi attribute) for deep and precise retrieval of information. To enable this, it's highly recommended to implement multi-parameter, which can be defined in Manifest.

With copilot, we're moving from basic search to complex search that handles multi attribute search in place of single attribute search. To enable multi attribute search, you need to define multi-parameters in the manifest.

### Parameter description

A total of five attributes are supported per parameter of which the first one is available on UX of search flyout as well. These parameters are needed to be backed with good descriptions, which can contain combination of acceptable parameter, Enums, acronyms, and output format. A good description is one, which explains what system is expecting in natural language with output format.

Here are the samples for basic vs. complex utterances on different search scenarios and the associated updated for manifest.

# [Tasks](#tab/tasks)

Basic utterance: Search for tasks related to Northwind
Advanced utterance: Search for high priority tasks related to Northwind that are due tomorrow

Sample Manifest for Task based search

```json
"parameters": [
    {
        "name": "Project or Task Name",
        "title": "Name ",
        "description": "Send project name or task name as keyword",
        "inputType": "text"
    },
    {
        "name": "Time",
        "title": "Time",
        "description": "Send date or number of days for which you need tasks for.Output: Number",
        "inputType": "text"
    },
    {
        "name": "Priority",
        "title": "Priority",
        "description": "Send priority of tasks. Acceptable values are: high, medium, low, NA ",
        "inputType": "text"
    }] 
```

# [Surveys](#tab/surveys)

Basic utterance: Retrieve Customer Satisfaction Surveys
Advanced utterance: Retrieve recent customer satisfaction survey on product Contoso which as filled by more than 100 recipients

Sample Manifest for search based on surveys

```json
"parameters": [
  {
    "name": "SurveyName",
    "title": "Name of Survey",
    "description": "Send survey name or related keyword",
    "inputType": "text"
  },
  {
    "name": "Tags",
    "title": "Tags",
    "description": "Send product name or keywords related pertaining to a question",
    "inputType": "text"
  },
  {
    "name": "ResponseNumber",
    "title": "Response number",
    "description": "Send number of responses received for a survey. Output: Number",
    "inputType": "text"
  }
]
```

# [CRM](#tab/crm)

Basic utterance: Fetch me qualified leads
Advanced utterance: Fetch qualified leads for which quotes are pending from last seven days

Sample Manifest for CRM based search

```json
"parameters": [
  {
    "name": "TypeofLeads",
    "title": "Type of Leads",
    "description": "Send what types of leads user is looking for. Acceptable fields are: Qualified, Unqualified and New.",
    "inputType": "text"
  },
  {
    "name": "Status",
    "title": "Status",
    "description": "Send status of leads. Acceptable fields are: Pending, Quote Given and Quote Rejected.",
    "inputType": "text"
  },
  {
    "name": "Time",
    "title": "Time",
    "description": "Send number of days for which you need status of leads for. Output: Number",
    "inputType": "text"
  }
]
```

# [General](#tab/general)

Basic utterance: Find stocks in NASDAQ
Advanced utterance: Find top 10 stocks in NASDAQ with P/E less than 30 and P/B less than 2

Sample Manifest for a general search

```json
"parameters": [
  {
    "name": "StockIndex",
    "title": "Stock Index",
    "description": "Name of index in which user wants to find stocks",
    "inputType": "text"
  },
  {
    "name": "NumberofStocks",
    "title": "Ranked Number of Stocks",
    "description": "Provide number of stocks in ranked order. Output format: Top:<Number of stocks or bottom:<Number of stocks>",
    "inputType": "text"
  },
  {
    "name": "P/B",
    "title": "Price to Book Ratio",
    "description": "Send P/B or Price to book ratio of a stock. Output format: >x.xx or <x.xx",
    "inputType": "text"
  },
  {
    "name": "P/E",
    "title": "Price to Earnings Ratio",
    "description": "Send P/E or Price to Earnings ratio of a stock with comparison. Output format: >x.xx or <x.xx",
    "inputType": "text"
  }
]
```

A good description is one that explains what system is expecting in natural language with output format.

This requires developer to make changes at server side as well. Developers can define their format of output in the manifest and test with user utterances in copilot to see how results are being processed. Accordingly, developers can tweak parameter descriptions to get accurate parameters.

## Descriptions

For good discoverability and enhance user awareness, developer needs to work on their app descriptions and command descriptions. Whenever explicit name of App is taken along with a verb for example “Find Jira tickets.. ” then ME plugin should be invoked. This must work consistently for a single user.

### App description

Focus would be on short description of app that should succinctly define in natural language what overall app does it can include name of the app as well.

App long description should clearly call out how users can use ME plugin in copilot and what functionality to expect. For example, User Jira Cloud in Copilot to search and summarize your tasks.

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
| Tasks | Search for high priority tasks related to Northwind that are due tomorrow. |
| Surveys | Search for surveys, drafts and results with keywords or number of respondents. |
| CRM | Through CRM plugin, find qualified, unqualified and quoted leads of clients and customers. |
| General | Find n number of stocks or listed equities using keyworks, key ratios, index, and so on. |

Ensure the descriptions follow the given standards:

* Anti-Compete: Developer shouldn't use name of any other plugin in both short and full description.
* Responsible AI: Developers shouldn't use inappropriate or offensive keywords, for example,  P**N, F**K and other similar offensive words.
* Prompt Injections: text shouldn't lead to any kind of prompt injections. Additionally, description shouldn't contain any kind of symbols or text that indicates that it can be used as code for Prompt injection. Shouldn't use phrases, functions and codes that call their app recurrently.

## Response information

For a high-quality ME, the accepted output is an Adaptive Card, hence it must work well and look great in a copilot world.

### Rich Adaptive Card

* Both previews and content should be part of single response
* Information in Adaptive Card should represent at least two pieces of information besides: Logo title of app, thumbnail, and title of the information. One way to identify these fields could be most often searched attributes can be part of Adaptive Card response, for example,  data modified, author, status, flags etc.  
* Adaptive Card should look good in all three surfaces: Win32, Web and Mobile (iOS and Android)
* Adaptive Card should have at least one action button and maximum four actions buttons.  
* Acvtwo implementation so that card refreshes, if users change any information on the card or task module. It's highly recommended to implement this if the user is likely to change information through task module, stage view or directly from the card itself. [*Recommended*]
* URL should be part of Adaptive Card meta data. This allows cards to easily copy pasted from one hub to another. [*Recommended*]
* Alt-Text – If there's an image in Adaptive Card beyond thumbnails, it can have alt-text. [*Recommended*]

#### Supported Actions

Use only the following recommended Action types for buttons in your Card

* Action.OpenUrl: To open a specified URL from the Card.
* Action.ToggleVisibility: Shows or hides one or more elements in the card.
* Action.Execute: Gathers the input fields and sends as a request to your bot service.
* Action.Submit: Use it to open Task module/Stage view using type invoke in data object.  

> [!NOTE]
> Type imBack, messageBack NOT supported in data object.
