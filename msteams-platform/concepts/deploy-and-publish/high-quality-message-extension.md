---
title: Message extension plugin guidelines
description: Learn about the guidelines and criteria to create a high-quality plugin for your message extension that's to be associated with copilot.
ms.topic: how-to
author: v-preethah
ms.author: surbhigupta
ms.localizationpriority: high
ms.date: 10/18/2023
---

# Guidelines to create a message extension plugin

A plugin is a piece of software that adds a specific feature or functionality to an existing computer program. Microsoft 365 plugins provide integration with Teams, making it easier for users to schedule, deliver, and collaborate on course content. These plugins can be used independently or in partnership, depending on the requirement.

Message extension plugins allows Copilot to interact with APIs from other software and services to retrieve real-time information, perform new types of computations, and safely take action on the user’s behalf.  Plugins allow Copilot to:

* Retrieve real-time information, for example, latest news coverage on a product launch.
* Retrieve knowledge-based information, for example, my team’s design files in Figma.
* Perform actions on behalf of the user, for example, create a Jira ticket.

We encourage you to develop your message extensions to get the best out of copilot. For copilot to recognize and fetch your app, we recommend to build message extensions that meet standards for compliance, performance, security, and user experience  described in this article.

## Mandatory requirements

Before you get started, ensure that you meet the following requirements:

> [!div class="checklist"]
>
> * [Descriptions](#descriptions)
> * [Multiple attributes](#multiple-attributes)
> * [App response](#app-response)

## Descriptions

A good description provides a clear and concise overview of the app’s features, helps improve the discoverability, and enhances user awareness for your app. When a user enters the app name with a verb, for example, **Find Jira tickets..**, the message extension plugin must be invoked from copilot and must be consistent.

Ensure the descriptions follow the given standards:

| Action | Reason |
| --- | --- |
| :::image type="icon" source="../../assets/images/publish-app/dont-icon.png" border="false"::: | Anti-Compete: Developer shouldn't use name of any other plugin in both short and full description. |
| :::image type="icon" source="../../assets/images/publish-app/dont-icon.png" border="false"::: | Responsible AI: Developers shouldn't use inappropriate or offensive keywords, for example,  P**N, F**K, and other offensive words. |
| :::image type="icon" source="../../assets/images/publish-app/dont-icon.png" border="false"::: | Prompt injections: Text shouldn't lead to any kind of prompt injections. Additionally, description shouldn't contain any kind of symbols or text that indicates that it can be used as code for Prompt injection. Shouldn't use phrases, functions, and codes that call their app recurrently. |

### App description

To render an app as a plugin in copilot, app description must be modified to suit the following requirements of a plugin:

* App long description must clearly call out how users can use ME plugin in copilot and what functionality to expect. For example, User Jira Cloud in Copilot to search and summarize your tasks.
* Short description must briefly define the app functionality in a natural language and can include name of the app.

The following table lists the short description examples for each category:

| Category | Examples of Short App Description |
|---|---|
| Tasks | Create, search, view tickets, bugs, and projects |
| Surveys | Create and search for surveys and results |
| CRM | Search and view customer leads |
| General | Stock and share look up tool |

### Search command description

Command description is used to map user intent and utterance to search command inside a plugin. Search command descriptions must:

* Focus on what and how the command searches (detailed list) in natural language .
* Include verbs and synonyms, if applicable.
* Focus on keywords that are likely to be used in the search function of your native apps.

The following table lists the command description examples for each category:

| Category | Examples of Search Command Description  |
|---|---|
| Tasks | Search for high priority tasks related to Northwind that are due tomorrow. |
| Surveys | Search for surveys, drafts, and results with keywords or number of respondents. |
| CRM | Through CRM plugin, find qualified, unqualified, and quoted leads of clients and customers. |
| General | Find n number of stocks or listed equities using keyworks, key ratios, index, and so on. |

## Multiple attributes

A message extension must support complex searches to retrieve accurate information. A message extension plugin must expand the scope of search beyond a single attribute and handle more than 3 search parameters at once. To handle multiple attribute in search, enable multi-parameter support in app manifest.

### Parameter description

A total of five attributes are supported per parameter of which the first one is available on UX of search flyout as well. These parameters are needed to be backed with good descriptions, which can contain combination of acceptable parameter, Enums, acronyms, and output format.

* A good description is one that explains what system is expecting in natural language with output format.

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

---

## App response

For a high-quality message extension, the accepted output is a rich Adaptive Card. The card must work well and look great in a copilot world.

### Rich Adaptive Card

A rich Adaptive Card that must match copilot standards. It’s search based command, not action based.

* Both previews and content must be part of single response.
* Information in Adaptive Card must represent at least two pieces of information besides: Logo title of app, thumbnail, and title of the information. One way to identify these fields could be most often searched attributes can be part of Adaptive Card response, for example,  data modified, author, status, flags, and so on.
* Adaptive Card must look good in all three surfaces: Win32, Web, and Mobile (iOS and Android).
* Adaptive Card must have at least one action button and maximum four actions buttons.
* Acvtwo implementation so that card refreshes, if users change any information on the card or task module. It's highly recommended to implement this if the user is likely to change information through task module, stage view or directly from the card itself. [*Recommended*]
* URL must be part of Adaptive Card meta data. This allows cards to easily copy pasted from one hub to another. [*Recommended*]
* If there's an image in the Adaptive Card beyond thumbnails, it can have alt-text. [*Recommended*]

#### Supported Actions

Use only the following recommended action types for buttons in your card:

* Action.OpenUrl: To open a specified URL from the Card.
* Action.ToggleVisibility: Shows or hides one or more elements in the card.
* Action.Execute: Gathers the input fields and sends as a request to your bot service.
* Action.Submit: Use it to open Task module/Stage view using type invoke in data object.  

## Criteria to create high-quality message extension

A high-quality message extension is different from basic message extension. Here are the factors that you must consider when creating a high-quality message extension:

* Must be a search-based message extension that supports both aid in Search or Summarization of information. Search through task module isn't support.
* App manifest: Must work beyond the basic or single attribute search and able to handle multi-attribute search. Define multi-parameter search in the app manifest.
* Parameter description: Parameters defined must have good descriptions, that is, acceptable parameter, Enums, acronyms, output format, and so on.
* App description: The long and short descriptions that you add or modify must be clear and define the app's scope.
* Search command description: Must be built based on analysis of the user intent and keywords.
* Response card: The response must render a rich adaptive response card.

You must do the required updates and changes at server end as well. Developers can define their format of output in the manifest and test with user utterances in copilot to see how results are being processed. Accordingly, developers can tweak parameter descriptions to get accurate parameters.

To ensure that a plugin is validated successfully, invoked, and works seamlessly, meet the following criteria:

| Criteria | Fulfillment |
|---|---|
| Manifest version | Manifest version of message extension plugin must be 1.13 or above. [*Mandatory*] |
| Response Time | Response mustn't be more than 9 seconds for P99, 5 Seconds for P75 and 2 Seconds for P50. [*Mandatory*] |
| Reliability | Apps must be able to meet 99.9% availability for their services that is, if Copilot calls for a plugin 1000 times, it must give meaningful response 999 times. [*Mandatory*] |
| Zero Regressions | In case, developers might need to resubmit their apps for validation in that case existing ME functionality, which was working before, shouldn't break. Applicable only for ISV apps and not for LOB apps. [*Mandatory*] |
| Single sign-on (SSO) | Update your Microsoft Azure Active Directory App Registration for SSO (if you have SSO), if applicable. [*Recommended*] |
| Content Security Policy | Amend your Content Security Policy headers, if applicable. [*Recommended*] |

> [!NOTE]
> Type imBack, messageBack NOT supported in data object.
