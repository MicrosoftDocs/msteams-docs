---
title: Bot-based message extension plugin guidelines
description: Learn about the guidelines and criteria to extend your message extension as a plugin for Microsoft Copilot for Microsoft 365.
ms.topic: how-to
author: v-preethah
ms.author: surbhigupta
ms.localizationpriority: high
ms.date: 11/14/2023
---

# Guidelines to create or upgrade a message extension plugin for Copilot for Microsoft 365

> [!IMPORTANT]
>
> * Plugins for Microsoft Copilot for Microsoft 365 are in preview and only work in Microsoft 365 Chat in Microsoft Teams.
> * Ensure that Copilot for Microsoft 365 is available for your organization. You have two ways to get a developer environment for Copilot:
>   * A sandbox Microsoft 365 tenant with Copilot (available in limited preview through [TAP membership](https://developer.microsoft.com/microsoft-365/tap)).
>   * An enterprise customer production environment with Microsoft Copilot for Microsoft 365 licenses.

Microsoft 365 plugins provide integration with various  Microsoft 365 products, such as Teams and Outlook. The integration helps users to search or create content in external systems. Message extension plugins allow Microsoft Copilot for Microsoft 365 to interact with APIs from other software and services through a bot. With Copilot for Microsoft 365, you can:

* Search for the latest information or record. For example, the latest incident ticket or survey results.
* Summarize information based on multiple records. For example, summarize all incident tickets related to the project Northwind.

We recommend that you build or upgrade your existing message extensions to maximize their usefulness and usability in Copilot for Microsoft 365. Message extensions should support one or more search commands, as Copilot for Microsoft 365 recognizes them as skills it can execute on behalf of the user. Additionally, your extensions must meet the standards for compliance, performance, security, and user experience outlined in this article.

:::image type="content" source="../assets/images/Copilot/ailib-copilot-interface.png" alt-text="Graphic shows the user experience between Microsoft Teams and Copilot for Microsoft 365 (M365 Chat).":::

## Mandatory requirements

The requirements for building message extension plugins for Copilot for Microsoft 365 include:

> [!div class="checklist"]
>
> * [Define app, command, and parameter descriptions](#define-descriptions)
> * [Enhance message extension to retrieve information through compound utterances](#compound-utterances)
> * [Create rich Adaptive Card responses](#adaptive-card-response)

## Define descriptions

A good description offers a clear and concise summary of the app’s features and allows Copilot for Microsoft 365 to efficiently discover and execute search operations. When a user enters the app name along with a verb, for example, **Find Contoso tickets**, the message extension plugin must be invoked from Copilot for Microsoft 365 (M365 Chat).

  :::image type="content" source="../assets/images/Copilot/validation-guidelines-plugin-prompt-pass.png" alt-text="Screenshot shows a pass scenario with an example of a sample prompt for message extension plugin in M365 Chat.":::

  :::image type="content" source="../assets/images/Copilot/validation-guidelines-plugin-prompt-fail.png" alt-text="Screenshot shows a fail scenario without an example of sample prompt for message extension usage as a plugin in M365 Chat.":::

Ensure that you adhere to the description guidelines listed in the following table:

| Action | Reason |
| --- | --- |
| :::image type="icon" source="../assets/images/publish-app/dont-icon.png" border="false"::: | Anti-Compete: Avoid using the name of any other plugin in both short and long descriptions. |
| :::image type="icon" source="../assets/images/publish-app/dont-icon.png" border="false"::: | Responsible AI: Avoid using inappropriate or offensive keywords. |
| :::image type="icon" source="../assets/images/publish-app/dont-icon.png" border="false"::: | Prompt injections: Ensure that the descriptions don't guide Copilot to take actions that bypass the normal functioning of the application. Additionally, the description mustn't contain symbols or text that indicate that it can be used as code for prompt injection. Avoid using phrases, functions, and code that call an app recurrently. |

### App description

Long and short app descriptions must be clear and define the app's scope. To render an app as a plugin in Copilot for Microsoft 365, modify the app description to suit the following plugin requirements:

* Long description must clearly explain the functionality and usage of the message extension plugin in Copilot for Microsoft 365. For example, Use Contoso cloud in Copilot for Microsoft 365 to search and summarize your tasks.
* Short description must briefly describe the app's functionality in a natural language and can include the name of the app.

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
  "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.13/MicrosoftTeams.schema.json",
  "version": "1.0.0",
  "manifestVersion": "1.13",
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
  "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.13/MicrosoftTeams.schema.json",
  "version": "1.0.0",
  "manifestVersion": "1.13",
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

**Description**:  Stock and share lookup tool.

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

Command description maps user intent and utterance to search command inside a plugin and must be built based on the analysis of the user intent and keywords. Search command descriptions must:

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

**Description**: Find number of stocks or listed equities using keywords, key ratios, index, and so on.

**Command description example:**

```json
"commands": [
        {
          "id": "Search",
          "type": "query",
          "title": "General",
          "description": "Find number of stocks or listed equities using keywords, key ratios, and index.",
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

Each message extension command supports up to five parameters and first parameter must be visible in the message extension search bar. A parameter must have a good description, which must contain a combination of acceptable parameters, enums, acronyms, and output format.

A good parameter description explains the requirements of the system in a natural language with output format. The following are a few examples of basic and advanced search requests for each category:

# [Tasks](#tab/tasks)

Basic search: Search for tasks related to Northwind.</br>
Advanced search: Search for high priority tasks related to Northwind that are due tomorrow.

**Parameter description example:**

```json
"parameters": [
    {
        "name": "Name",
        "title": "Project or Task Name",
        "description": "Project name or task name as keyword",
        "inputType": "text"
    },
    {
        "name": "Time",
        "title": "Time",
        "description": "Date or number of days for which you need tasks for.Output: Number",
        "inputType": "text"
    },
    {
        "name": "Priority",
        "title": "Priority",
        "description": "Priority of tasks. Acceptable values are high, medium, low, NA ",
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
    "description": "survey name or related keyword",
    "inputType": "text"
  },
  {
    "name": "Tags",
    "title": "Tags",
    "description": "product name or keywords related pertaining to a question",
    "inputType": "text"
  },
  {
    "name": "ResponseNumber",
    "title": "Response number",
    "description": "number of responses received for a survey. Output: Number",
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
    "description": "what types of leads user is looking for. Acceptable fields are: Qualified, Unqualified and New.",
    "inputType": "text"
  },
  {
    "name": "Status",
    "title": "Status",
    "description": "status of leads. Acceptable fields are: Pending, Quote Given and Quote Rejected.",
    "inputType": "text"
  },
  {
    "name": "Time",
    "title": "Time",
    "description": "number of days for which you need status of leads for. Output: Number",
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
    "description": "P/B or Price to book ratio of a stock. Output format: >x.xx or <x.xx",
    "inputType": "text"
  },
  {
    "name": "P/E",
    "title": "Price to Earnings Ratio",
    "description": "P/E or Price to Earnings ratio of a stock with comparison. Output format: >x.xx or <x.xx",
    "inputType": "text"
  }
]
```

---

## Compound utterances

> [!NOTE]
> Search through dialog (referred as task module in TeamsJS v1.x) isn't supported in M365 Chat.

For M365 Chat, a search-based message extension must support compound utterances to perform deep retrieval of accurate information. To enable compound utterances, you must expand the scope of search to handle two or more search parameters by updating the [app manifest (previously called Teams app manifest)](../resources/schema/manifest-schema.md#composeextensionscommands) and ensure the following:

* Update your web service to support search based on multiple parameters. For more information on how to respond to user requests, see [Respond to search command](how-to/search-commands/respond-to-search.md).
* Copilot for Microsoft 365 might pass an empty string or null value for parameters, which aren't part of user utterance, update your web service to handle the parameters.

<br>
<details><summary>The following code is an example of multiple parameters defined in app manifest:</summary>

```json
"commands": [
                {
                    "id": "inventorySearch",
                    "context": [
                        "compose",
                        "commandBox"
                    ],
                    "description": "Search products by name, category, inventory status, supplier location, stock level",
                    "title": "Product inventory",
                    "type": "query",
                    "parameters": [
                        {
                            "name": "productName",
                            "title": "Product name",
                            "description": "Enter a product name here",
                            "inputType": "text"
                        },
                        {
                            "name": "categoryName",
                            "title": "Category name",
                            "description": "Enter the category of the product",
                            "inputType": "text"
                        },
                        {
                            "name": "inventoryStatus",
                            "title": "Inventory status",
                            "description": "Enter what status of the product inventory. Possible values are 'in stock', 'low stock', 'on order', or 'out of stock'",
                            "inputType": "text"
                        },
                        {
                            "name": "supplierCity",
                            "title": "Supplier city",
                            "description": "Enter the supplier city of product",
                            "inputType": "text"
                        },
                        {
                            "name": "stockQuery",
                            "title": "Stock level",
                            "description": "Enter a range of integers such as 0-42 or 100- (for >100 items). Only use if you need an exact numeric range.",
                            "inputType": "text"
                        }
                    ]
                },
                {
                    "id": "discountSearch",
                    "context": [
                        "compose",
                        "commandBox"
                    ],
                    "description": "Search for discounted products by category",
                    "title": "Discounts",
                    "type": "query",
                    "parameters": [
                        {
                            "name": "categoryName",
                            "title": "Category name",
                            "description": "Enter the category to find discounted products",
                            "inputType": "text"
                        }
                    ]
                },
                {
                    "id": "revenueSearch",
                    "context": [
                        "compose",
                        "commandBox"
                    ],
                    "description": "Find products based on their revenue/period",
                    "title": "Revenue",
                    "type": "query",
                    "parameters": [
                        {
                            "name": "revenueRange",
                            "title": "Revenue range",
                            "description": "Enter 'high' or 'low' or enter a range of integers such as 0-10000 or 5000- using this exact format",
                            "inputType": "text"
                        }
                    ]
                }
            ]
```

</details>
<br>

:::image type="content" source="../assets/images/Copilot/high-quaity-me-pass-multi-parameters.png" alt-text="Screenshot shows an example of a pass scenario where the Northwind app returns a response for a seafood and in stock parameters.":::

The search parameters must have good descriptions with acceptable parameters, enums, acronyms, and output format. For more information and examples, see [Parameter description](#parameter-description).

## Adaptive Card response

> [!IMPORTANT]
> If your message extension plugins has a single Adaptive Card response and if you encounter a **Something went wrong** error in the Adaptive Card, we recommend you to disable the auto refresh in the Adaptive Card.

Message extensions respond to a user input with an Adaptive Card. An Adaptive Card for a message extension plugin must function effectively, appear rich, and meet the following requirements:

* Adaptive Card response must include Adaptive Card content and preview card information as part of the same template. [*Mandatory*]

  :::image type="content" source="../assets/images/Copilot/validation-guidelines-app-response-copilot.png" alt-text="Screenshot shows an example of a sample app showing M365 Chat app response contains Preview and Content in the same response." lightbox="../assets/images/Copilot/validation-guidelines-app-response-copilot-ext.png":::

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

* Apart from the app logo, title, thumbnail, and title of the information, the data in the Adaptive Card must represent at least two pieces of information. You can identify the fields from the most frequently searched attributes, such as, data modified, author, status, and flags. [*Mandatory*]

  :::image type="content" source="../assets/images/Copilot/validation-guidelines-plugin-functional-action.png" alt-text="Screenshot shows an example of information title, additional user fields, and action button in an Adaptive Card response.":::

* Adaptive Card must be presentable in desktop, web, and mobile (iOS and Android). [*Mandatory*]

* An Adaptive Card must contain at least one action button, but not more than four action buttons. [*Mandatory*]

  > [!NOTE]
  > Action types `imBack`, `messageBack` aren't supported in a data object.

  The following action types are recommended:

  * `Action.OpenUrl`: Opens a specified URL from the Card.
  * `Action.ToggleVisibility`: Displays or hides one or more elements in the card.
  * `Action.Execute`: Collects the input fields and sends them as a request to your bot service.
  * `Action.Submit`: Opens a dialog or Stage view using type invoke in data object.

  :::image type="content" source="../assets/images/Copilot/ailib-copilot-action-buttons.png" alt-text="Graphic shows an example of the Update Stock, restock, and Cancel restock action buttons in an Adaptive Card response in M365 Chat.":::

* If a user can change any information on the card through dialog, stage view, or directly from the card, we recommend the Adaptive Card to support universal actions and automatic refresh. [*Recommended*]
* Adaptive Cards must include a URL as part of the [metadata](https://adaptivecards.io/explorer/Metadata.html), which allows cards to be easily copied from one hub to another. [*Recommended*]
* Apart from thumbnails, any image in an Adaptive Card must have an alt-text. [*Recommended*]

## Technical requirements

For a plugin to be validated, invoked, and work seamlessly, ensure that it meets the following criteria:

| Criteria | Fulfillment |
|---|---|
| Manifest version | App manifest version must be 1.13 or later. [*Mandatory*] |
|Microsoft 365 Channel| For users to interact with your message extension from Outlook, you need to add Microsoft 365 channel to your bot. For more information, see [Add Microsoft 365 channel](../m365-apps/extend-m365-teams-message-extension.md#add-microsoft-365-channel-for-your-app). [*Mandatory*]|
| Response Time | Response time must not exceed 9 seconds for 99 percent, 5 Seconds for 75 percent and 2 Seconds for 50 percent. [*Mandatory*] |
| Reliability | Apps must maintain 99.9% availability. For instance, if Microsoft 365 Chat calls a plugin 1000 times, it must provide a meaningful response 999 times. [*Mandatory*] |
| Zero Regressions | If you need to resubmit your app for validation, the existing message extension functionality that was working earlier mustn't break. This requirement is only applicable to ISV apps and not apps built for your organization. [*Mandatory*] |
| Single sign-on (SSO) | If applicable, update your Microsoft Entra ID app registration for SSO.  [*Recommended*] |
| Content Security Policy |If applicable, modify your Content Security Policy headers. [*Recommended*] |

> [!IMPORTANT]
> If applicable, update your Content Security Policy headers and `X-Frame-Options` in accordance with [Configure Content Security Policy headers](../m365-apps/extend-m365-teams-personal-tab.md#configure-content-security-policy-headers).

## Code samples

|Sample name | Description |TypeScript |
|----------------|-----------------|--------------|
| Northwind inventory message extension| This sample demonstrates how to use a Teams message extension as a plugin in Microsoft Copilot for Microsoft 365. | [View](https://github.com/OfficeDev/Copilot-for-M365-Plugins-Samples/tree/main/samples/msgext-northwind-inventory-ts) |

## See also

* [Extend bot-based message extension as plugin](build-bot-based-plugin.md)
* [Extend Microsoft Copilot for Microsoft 365](/microsoft-365-copilot/extensibility/)
