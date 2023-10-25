---
title: Message extension plugin guidelines
description: Learn about the guidelines and criteria to create a plugin for your message extension that can be associated with copilot.
ms.topic: how-to
author: v-preethah
ms.author: surbhigupta
ms.localizationpriority: high
ms.date: 10/18/2023
---

# Guidelines to create a message extension plugin

A plugin adds a specific feature or functionality to an existing computer program. Microsoft 365 plugins provide integration with Teams, making it easier for users to schedule, deliver, and collaborate on course content. These plugins can be used independently or in partnership, depending on the requirement.

Message extension plugins allow Copilot to interact with APIs from other software and services to retrieve real-time information, perform new types of computations, and safely take action on the user’s behalf. We encourage you to build your message extensions to get the best out of copilot. For copilot to recognize and fetch your app, we recommend to build message extensions that search or Summarization information and  meet standards for compliance, performance, security, and user experience described in this article.

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
| :::image type="icon" source="../../assets/images/publish-app/dont-icon.png" border="false"::: | Responsible AI: Developers shouldn't use inappropriate or offensive keywords. |
| :::image type="icon" source="../../assets/images/publish-app/dont-icon.png" border="false"::: | Prompt injections: Text shouldn't lead to any kind of prompt injections. Additionally, description shouldn't contain any kind of symbols or text that indicates that it can be used as code for Prompt injection. Shouldn't use phrases, functions, and codes that call their app recurrently. |

### App description

Long and short app descriptions that must be clear and define the app's scope. To render an app as a plugin in copilot, app description must be modified to suit the following requirements of a plugin:

* App long description must clearly call out how users can use ME plugin in copilot and what functionality to expect. For example, User Jira Cloud in Copilot to search and summarize your tasks.
* Short description must briefly define the app functionality in a natural language and can include name of the app.

The following table lists the short description examples for each category:


# [Tasks](#tab/tasks)

**Description**: Create, search, view tickets, bugs, and projects.

# [Surveys](#tab/surveys)

**Description**: Create and search for surveys and results.

# [CRM](#tab/crm)

**Description**: Search and view customer leads.

# [General](#tab/general)

**Description**:  Stock and share look up tool. 

---

### Search command description

Command description is used to map user intent and utterance to search command inside a plugin and must be built based on the analysis of the user intent and keywords. Search command descriptions must:

* Focus on what and how the command searches (detailed list) in natural language.
* Include verbs and synonyms, if applicable.
* Focus on keywords that are likely to be used in the search function of your native apps.

The following table lists the command description examples for each category:

# [Tasks](#tab/tasks)

**Description**: Search for high priority tasks related to Northwind that are due tomorrow.

# [Surveys](#tab/surveys)

**Description**: Search for surveys, drafts, and results with keywords or number of respondents.

# [CRM](#tab/crm)

**Description**: Through CRM plugin, find qualified, unqualified, and quoted leads of clients and customers.

# [General](#tab/general)

**Description**: Find n number of stocks or listed equities using keyworks, key ratios, index, and so on. 

---

### Parameter description

Each parameter supports five attributes and one attribute must be visible in the message extension search bar. Each parameter must have a good description, which must contain a combination of acceptable parameters, Enums, acronyms, and output format.

A good parameter description explains the requirement of the system in a natural language with output format. The following are few examples on basic and advances search requests for different categories:

# [Tasks](#tab/tasks)

Basic search: Search for tasks related to Northwind.</br>
Advanced search: Search for high priority tasks related to Northwind that are due tomorrow.

**Manifest description example:**

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

Basic search: Retrieve Customer Satisfaction Surveys
Advanced search: Retrieve recent customer satisfaction survey on product Contoso which as filled by more than 100 recipients

**Manifest description example:**

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

Basic search: Fetch me qualified leads
Advanced search: Fetch qualified leads for which quotes are pending from last seven days

**Manifest description example:**

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

Basic search: Find stocks in NASDAQ
Advanced search: Find top 10 stocks in NASDAQ with P/E less than 30 and P/B less than 2

**Manifest description example:**

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



## Multiple attributes

> [!NOTE]
> Search through task module isn't supported.

A message extension must support complex searches to retrieve accurate information. A message extension plugin must expand the scope of search beyond a single attribute and handle more than three search parameters at once. To handle multiple attributes in search, enable multi-parameter support in app manifest.


## App response

Message extensions respond to users input with an Adaptive Card. Adaptive Cards allow users to interact with your app directly within the Teams client.

An Adaptive Card for a message extension plugin must work well and look rich and meet the following requirements:

* Adaptive Card previews and content must be part of a single response.
* Apart from the app logo title, thumbnail, and title of the information, the information in Adaptive Card must represent the most often searched attributes. For example, data modified, author, status, and flags.
* Adaptive Card must look good in Win32, Web, and Mobile (iOS and Android).
* Adaptive Card must have at least one action button and maximum four actions. The following are the recommended actions types:

  > [!NOTE]
  > Action types `imBack`, `messageBack` aren't supported in a data object.

  * `Action.OpenUrl`: Opens a specified URL from the Card.
  * `Action.ToggleVisibility`: Shows or hides one or more elements in the card.
  * `Action.Execute`: Gathers the input fields and sends as a request to your bot service.
  * `Action.Submit`: Opens Task module or Stage view using type invoke in data object.

* If a user can change any information on the card through task module, stage view, or directly from the card, we recommend the Adaptive Card to support universal actions and automatic refresh. [*Recommended*]
* Adaptive Cards must include URL as part of metadata. This allows cards to easily copy pasted from one hub to another. [*Recommended*]
* Apart from thumbnails, any image in an Adaptive Card must have an alt-text. [*Recommended*]

## Technical requirements

To ensure that a plugin is validated successfully, invoked, and works seamlessly, meet the following criteria:

| Criteria | Fulfillment |
|---|---|
| Manifest version | Manifest version of message extension plugin must be 1.13 or above. [*Mandatory*] |
| Response Time | Response mustn't be more than 9 seconds for P99, 5 Seconds for P75 and 2 Seconds for P50. [*Mandatory*] |
| Reliability | Apps must be able to meet 99.9% availability for their services that is, if Copilot calls for a plugin 1000 times, it must give meaningful response 999 times. [*Mandatory*] |
| Zero Regressions | In case, developers might need to resubmit their apps for validation in that case existing ME functionality, which was working before, shouldn't break. Applicable only for ISV apps and not for LOB apps. [*Mandatory*] |
| Single sign-on (SSO) | Update your Microsoft Entra ID App Registration for SSO (if you have SSO), if applicable. [*Recommended*] |
| Content Security Policy | Amend your Content Security Policy headers, if applicable. [*Recommended*] |

## See also

[Extend Microsoft 365 Copilot](../../copilot/how-to-extend-copilot.md)
