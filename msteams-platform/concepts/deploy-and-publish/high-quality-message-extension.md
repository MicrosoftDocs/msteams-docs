---
title: Message extension for Copilot guidelines
description: Learn about the guidelines and criteria to extend your message extension as a plugin for Copilot.
ms.topic: how-to
author: v-preethah
ms.author: surbhigupta
ms.localizationpriority: high
ms.date: 10/18/2023
---

# Guidelines to create or upgrade a message extension for Copilot

Microsoft 365 plugins provide integration with various Microsoft hubs, such as Teams and Outlook. The integration helps users to search or create content in external systems. Message extension plugins allow Copilot to interact with APIs from other software and services through a bot. You can:

* Search for latest information or record, for example, latest incident ticket or survey results.
* Summarize information based on multiple records. For example, Summarize all incidents tickets related to the project Northwind.

We recommend to build or upgrade your existing message extensions to get the best out of Copilot. To ensure Copilot recognizes your app, build message extensions that can at least, search or summarize information.   Additionally, your extensions should meet the standards for compliance, performance, security, and user experience outlined in this article.

## Mandatory requirements

Before you get started, ensure that you meet the following requirements:

> [!div class="checklist"]
>
> * [Define app, command, and parameter descriptions](#define-descriptions)
> * [Enhance message extension to retrieve information through compound utterances](#compound-utterances)
> * [Create rich Adaptive Card responses](#adaptive-card-response)

## Define descriptions

A good description offers a clear and concise summary of the app’s features and allows Copilot to efficiently discover and execute search operations. When a user enters the app name along with a verb, for example, **Find Contoso tickets..**, the message extension plugin must be invoked from Copilot.

Ensure that you adhere to the descriptions guidelines listed in the following table:

| Action | Reason |
| --- | --- |
| :::image type="icon" source="../../assets/images/publish-app/dont-icon.png" border="false"::: | Anti-Compete: Avoid using the name of any other plugin in both short and full descriptions. |
| :::image type="icon" source="../../assets/images/publish-app/dont-icon.png" border="false"::: | Responsible AI: Avoid using inappropriate or offensive keywords. |
| :::image type="icon" source="../../assets/images/publish-app/dont-icon.png" border="false"::: | Prompt injections: Ensure that the Text doesn't lead to prompt injections. Additionally, description must not contain symbols or text that indicate that it can be used as code for Prompt injection. Avoid using phrases, functions, and codes that call an app recurrently. |

### App description

Long and short app descriptions must be clear and define the app's scope. To render an app as a plugin in Copilot, app description must be modified to suit the following plugin requirements:

* App long description must clearly explain how users can use a message extension plugin in Copilot and what functionality they can expect. For example, Use Contoso cloud in Copilot to search and summarize your tasks.
* Short description must briefly describe the app's functionality in a natural language and can include name of the app.

The following table lists the short description examples for each category:

# [Tasks](#tab/tasks)

**Description**: Create, search, view tickets, bugs, and projects.

**App description example:**

```json
{
  "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.13/MicrosoftTeams.schema.json",
  "version": "1.0.0",
  "manifestVersion": "1.13",
  "id": "2bxxxxc5-5xxx-4xxx-aXXX-94xxxx8919e5",
  "name": {
    "short": "Tasks",
    "full": "Contoso Tasks"
  },
  "description": {
    "short": "Create, search, view tickets, bugs, and projects",
    "full": "Contoso Tasks makes it easy to stay organized. Create, assign, and track tasks individually or collaboratively with your team, and see everything come together in one place."
  },
```

# [Surveys](#tab/surveys)

**Description**: Create and search for surveys and results.

**App description example:**

```json
{
  "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.11/MicrosoftTeams.schema.json",
  "version": "1.0.0",
  "manifestVersion": "1.11",
  "id": "2bxxxxc5-5xxx-4xxx-aXXX-94xxxx8919e5",
  "name": {
    "short": "Survey",
    "full": "Contoso Survey"
  },
  "description": {
    "short": "Create and search for surveys and results.",
    "full": "Contoso Survey helps you manage all your surveys in one place. Create, capture and analyze surveys within the platform you use every day."
  },
```

# [CRM](#tab/crm)

**Description**: Search and view customer leads.

**App description example:**

```json
{
  "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.11/MicrosoftTeams.schema.json",
  "version": "1.0.0",
  "manifestVersion": "1.11",
  "id": "2bxxxxc5-5xxx-4xxx-aXXX-94xxxx8919e5",
  "name": {
    "short": "CRM",
    "full": "Contoso CRM"
  },
  "description": {
    "short": "Search and view customer leads.",
    "full": "Resolve tickets faster, simplify employee workflows and improve team performance by integrating Contoso CRM to Microsoft Teams. Contoso CRM is a complete customer service solution that’s easy to use and scales with your business."
  },
```

# [General](#tab/general)

**Description**:  Stock and share look up tool.

**App description example:**

```json
{
  "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.13/MicrosoftTeams.schema.json",
  "version": "1.0.0",
  "manifestVersion": "1.13",
  "id": "2bxxxxc5-5xxx-4xxx-aXXX-94xxxx8919e5",
  "name": {
    "short": "General",
    "full": "Contoso stocks"
  },
  "description": {
    "short": "Stock and share look up tool.",
    "full": "Get real-time stock quotes and share them in a conversation. Search by company name, share, or stocks."
```

---

### Search command description

Command description is used to map user intent and utterance to search command inside a plugin and must be built based on the analysis of the user intent and keywords. Search command descriptions must:

* Focus on what and how the command searches (detailed list) in natural language.
* Include verbs and synonyms, if applicable.
* Focus on keywords that are likely to be used in the search function of your native apps.

The following table lists the command description examples for each category:

# [Tasks](#tab/tasks)

**Description**: Search for high priority tasks related to Northwind that are due tomorrow.

**Command description example:**

```json
"commands": [
        {
          "id": "Search",
          "type": "query",
          "title": "Tasks",
          "description": "Search for high priority tasks related to Northwind that are due tomorrow.",
          "initialRun": true,
          "fetchTask": false,
          "context": [
            "commandBox",
            "compose",
            "message"
          ],
```

# [Surveys](#tab/surveys)

**Description**: Search for surveys, drafts, and results with keywords or number of respondents.

**Command description example:**

```json
"commands": [
        {
          "id": "Search",
          "type": "query",
          "title": "Survey",
          "description": "Search for surveys, drafts, and results with keywords or number of respondents.",
          "initialRun": true,
          "fetchTask": false,
          "context": [
            "commandBox",
            "compose",
            "message"
          ],
```

# [CRM](#tab/crm)

**Description**: Through CRM plugin, find qualified, unqualified, and quoted leads of clients and customers.

**Command description example:**

```json
"commands": [
        {
          "id": "Search",
          "type": "query",
          "title": "CRM",
          "description": "Through CRM plugin, find qualified, unqualified, and quoted leads of clients and customers.",
          "initialRun": true,
          "fetchTask": false,
          "context": [
            "commandBox",
            "compose",
            "message"
          ],
```

# [General](#tab/general)

**Description**: Find number of stocks or listed equities using keyworks, key ratios, index, and so on.

**Command description example:**

```json
"commands": [
        {
          "id": "Search",
          "type": "query",
          "title": "General",
          "description": "Find number of stocks or listed equities using keyworks, key ratios, index, and so on.",
          "initialRun": true,
          "fetchTask": false,
          "context": [
            "commandBox",
            "compose",
            "message"
          ],
```

---

### Parameter description

Each parameter supports five attributes and one attribute must be visible in the message extension search bar. A parameter must have a good description, which must contain a combination of acceptable parameters, Enums, acronyms, and output format.

A good parameter description explains the requirement of the system in a natural language with output format. The following are few examples on basic and advances search requests for different categories:

# [Tasks](#tab/tasks)

Basic search: Search for tasks related to Northwind.</br>
Advanced search: Search for high priority tasks related to Northwind that are due tomorrow.

**Parameter description example:**

```json
"parameters": [
    {
        "name": "Name",
        "title": "Project or Task Name",
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

Basic search: Retrieve Customer Satisfaction Surveys. </br>
Advanced search: Retrieve recent customer satisfaction survey on product Contoso which as filled by more than 100 recipients.

**Parameter description example:**

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

Basic search: Fetch me qualified leads. </br>
Advanced search: Fetch qualified leads for which quotes are pending from last seven days.

**Parameter description example:**

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

Basic search: Find stocks in NASDAQ.</br>
Advanced search: Find top 10 stocks in NASDAQ with P/E less than 30 and P/B less than 2.

**Parameter description example:**

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

## Compound Utterances

> [!NOTE]
> Search through task module isn't supported in Copilot.

For Copilot, a search-based message extension must support compound utterances to perform deep retrieval of accurate information. To enable compound utterances, we recommend to expand the scope of search to handle two or more search parameters simultaneously by enabling multi-parameter support in app manifest (previously called Teams app manifest).

The search parameters must have good descriptions with acceptable parameters, Enums, acronyms, and output format. For more information and examples, see [Parameter description](#parameter-description).

## Adaptive Card response

Message extensions respond to user input with an Adaptive Card. An Adaptive Card for a message extension plugin must function effectively, appear rich, and meet the following requirements:

* A response template must include an Adaptive Card and preview card information as part of the same template. [*Mandatory*]

  :::image type="content" source="../../assets/images/Copilot/bot-based-me-adaptive-card-response-copilot.png" alt-text="Screenshot shows the preview card and Adaptive Card as part of the same response in Copilot.":::

  <details><summary>Adaptive Card response example</summary>

  ```json
   {
        "version": "1.0",
        "responseLayout": "grid",
        "responseCardTemplate": {
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "type": "AdaptiveCard",
            "version": "1.4",
            "body": [
                {
                    "type": "Container",
                    "items": [
                        {
                            "type": "ColumnSet",
                            "columns": [
                                {
                                    "type": "Column",
                                     "width": "stretch",
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "Title: ${if(title, title, 'N/A')}",
                                            "wrap": true
                                        },
                                        {
                                            "type": "TextBlock",
                                            "text": "Description: ${if(description, description, 'N/A')}",
                                            "wrap": true
                                        },
                                        {
                                            "type": "TextBlock",
                                            "text": "Assigned To: ${if(assignedTo, assignedTo, 'N/A')}",
                                            "wrap": true
                                        },
                                        {
                                            "type": "Image",
                                            "url": "${image}",
                                            "size": "Medium",
                                            "$when": "${image != null}"
                                        }
                                    ]
                                },
                                {
                                    "type": "Column",
                                    "width": "auto",
                                    "items": [
                                        {
                                            "type": "Image",
                                            "url": "${if(image, image, '')}",
                                            "size": "Medium"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "FactSet",
                            "facts": [
                                {
                                    "title": "Repair ID:",
                                    "value": "${if(id, id, 'N/A')}"
                                },
                                {
                                    "title": "Date:",
                                    "value": "${if(date, date, 'N/A')}"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "previewCardTemplate": {
            "title": "Title: ${if(title, title, 'N/A')}",
            "subtitle": "Description: ${if(description, description, 'N/A')}",
            "text": "Assigned To: ${if(assignedTo, assignedTo, 'N/A')}",
            "image": {
            "url": "${image}",
            "$when": "${image != null}"
              }
            }
        }
    }
  ```

  </details>

* Apart from the app logo title, thumbnail, and title of the information, the data in the Adaptive Card must represent the most frequently searched attributes, such as, data modified, author, status, and flags. [*Mandatory*]
* Adaptive Card must look presentable in Win32, Web, and Mobile (iOS and Android). [*Mandatory*]
* An Adaptive Card must contain at least one action, but no more than four actions. The following actions types are recommended: [*Mandatory*]

  > [!NOTE]
  > Action types `imBack`, `messageBack` aren't supported in a data object.

  * `Action.OpenUrl`: Opens a specified URL from the Card.
  * `Action.ToggleVisibility`: Displays or hides one or more elements in the card.
  * `Action.Execute`: Collects the input fields and sends as a request to your bot service.
  * `Action.Submit`: Opens a Task module or Stage view using type invoke in data object.

* If a user can change any information on the card through task module, stage view, or directly from the card, we recommend the Adaptive Card to support universal actions and automatic refresh. [*Recommended*]
* Adaptive Cards must include URL as part of the metadata, which allows cards to be easily copied from one hub to another.
* Apart from thumbnails, any image in an Adaptive Card must have an alt-text. [*Recommended*]

## Technical requirements

For a plugin to be successfully validated, invoked, and work seamlessly, ensure that it meets the following criteria:

| Criteria | Fulfillment |
|---|---|
| Manifest version | App manifest version must be 1.13 or later. [*Mandatory*] |
|Microsoft 365 Channel| For users to interact with your message extension from Outlook, you need to add Microsoft 365 channel to your bot. For more information, see [Add Microsoft 365 channel](../../m365-apps/extend-m365-teams-message-extension.md#add-microsoft-365-channel-for-your-bot).[*Mandatory*]|
| Response Time | Response time must not exceed 9 seconds for 99 percent, 5 Seconds for 75 percent and 2 Seconds for 50 percent. [*Mandatory*] |
| Reliability | Apps must maintain 99.9% availability. For instance, if Copilot calls a plugin 1000 times, it must provide a meaningful response 999 times. [*Mandatory*] |
| Zero Regressions | If you need to resubmit your app for validation, the existing message extension functionality that was working earlier must not break. This requirement is only applicable to ISV apps and not apps built for your organization. [*Mandatory*] |
| Single sign-on (SSO) | If applicable, update your Microsoft Entra ID app registration for SSO.  [*Recommended*] |
| Content Security Policy |If applicable, modify your Content Security Policy headers. [*Recommended*] |

## See also

[Extend Microsoft 365 Copilot](../../copilot/how-to-extend-copilot.md)
