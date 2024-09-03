---
title: Guidelines to Create Copilot Extensions
description: Guidelines and criteria to extend your message extension as a plugin for Microsoft Copilot for Microsoft 365.
ms.topic: how-to
author: v-preethah
ms.author: surbhigupta
ms.localizationpriority: high
ms.date: 07/03/2024
ms.collection: ce-skilling-ai-copilot
---

# Guidelines to create or upgrade Copilot extensions

> [!IMPORTANT]
>
> * Plugins for Microsoft Copilot for Microsoft 365 are in preview and only work in Microsoft 365 Chat in Microsoft Teams.
> * Ensure that Copilot for Microsoft 365 is available for your organization. You have two ways to get a developer environment for Copilot:
>   * A sandbox Microsoft 365 tenant with Copilot (available in limited preview through [TAP membership](https://developer.microsoft.com/microsoft-365/tap)).
>   * An enterprise customer production environment with Microsoft Copilot for Microsoft 365 licenses.

Microsoft 365 plugins provide integration with various  Microsoft 365 products, such as Teams and Outlook. The integration helps users to search or create content in external systems. Message extension plugins allow Microsoft Copilot for Microsoft 365 to interact with APIs from other software and services through a bot. With Copilot for Microsoft 365, you can:

* Search for the latest information or record. For example, the latest incident ticket or survey results.
* Summarize information based on multiple records. For example, summarize all incident tickets related to the project Northwind.

We recommend that you build or upgrade your existing message extensions to maximize their usefulness and usability in Copilot for Microsoft 365. Message extensions must support one or more search commands, as Copilot for Microsoft 365 recognizes them as skills it can execute on behalf of the user. Additionally, your extensions must meet the standards for compliance, performance, security, and user experience outlined in this article.

:::image type="content" source="../assets/images/Copilot/ailib-copilot-interface.png" alt-text="Graphic shows the user experience between Microsoft Teams and Copilot for Microsoft 365.":::

> [!NOTE]
> If you want to configure a custom Graph connector for Copilot for Microsoft 365, ensure that you adhere to the [guidelines to create or upgrade Graph connectors](/graph/connecting-external-content-deploy-teams).

## Common requirements for Copilot extensions

The requirements for building message extension plugins for Copilot for Microsoft 365 include:

> [!div class="checklist"]
>
> * [Define app, command, and parameter descriptions](#define-descriptions)
> * [Enhance message extension to retrieve information through compound utterances](#compound-utterances)
> * [Define sample prompts](#sample-prompts)
> * [Create rich Adaptive Card responses](#adaptive-card-response)
> * [Extend your plugin to Copilot in meetings](#extend-your-plugin-to-copilot-in-meetings)
> * [Message extensions plugins in Copilot for Microsoft 365 applications](#message-extensions-plugins-in-copilot-for-microsoft-365-applications)
> * [Technical requirements](#technical-requirements)

## Define descriptions

[*Must-fix*]

A good description offers a clear and concise summary of the app’s features and allows Copilot for Microsoft 365 to efficiently discover and execute search operations. When a user enters the app name along with a verb, for example, **Find Contoso tickets**, the message extension plugin must be invoked from Copilot for Microsoft 365.

  :::image type="content" source="../assets/images/Copilot/validation-guidelines-plugin-prompt-pass.png" alt-text="Screenshot shows a pass scenario with an example of a sample prompt for message extension plugin in Copilot Chat.":::

  :::image type="content" source="../assets/images/Copilot/validation-guidelines-plugin-prompt-fail.png" alt-text="Screenshot shows a fail scenario without an example of sample prompt for message extension as a plugin in Copilot Chat.":::

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
  }
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

#### Semantic description

The [semanticDescription](../resources/schema/manifest-schema-dev-preview.md#composeextensionscommands) property is used to provide a detailed description of a command for Copilot for Microsoft 365. Semantic description for commands supports up to 5,000 characters and isn't displayed in the user interface. If the `semanticDescription` property is left empty, Copilot for Microsoft 365 uses the information in the `description` field. When writing a `semanticDescription`, you must include information about expected values, limits, and ranges for the command.

The `semanticDescription` property isn't a mandatory field. However, if you add `semanticDescription` in app manifest, the existing validation checks for short, parameter, and command descriptions are also applicable for semantic descriptions.

We recommend you to review the following guidelines for semantic description to increase the chances of your app to pass the Microsoft Teams Store submission process:

* Avoid instructional phrases such as “if the user says X",” “ignore,” “delete,” “reset,” “new instructions,” “Answer in Bold,” or “Don't print anything.” *[Must fix]*

* Avoid URLs, emojis, or hidden characters such as hexadecimal, binary, or unconventional symbols. *[Must fix]*

* Avoid grammar and punctuation errors. *[Must fix]*

* Avoid overly verbose, flowery, or marketing language. *[Good-to-fix]*

* Avoid superlative claims such as “#1,” “amazing,” or “best.” *[Good-to-fix]*

The following table lists the command and semantic description examples for each category:

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
          "SemanticDescription": "Search for issues, epics, stories, tasks, sub tasks, bugs + additional details."
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
          "semanticDescription": "This command enables users to search for surveys, drafts, and results based on specific keywords or the number of respondents."
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
          "semanticDescription": "This command allows users to search for leads in the CRM system based on specific criteria.",
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

> [!IMPORTANT]
>
> For activating the OAuth sign-in link in the plugin, ensure that you set the `initialRun` property to `true` for search commands within the app manifest.

### Parameter description

Each message extension command supports has a corresponding `parameters' property, which supports up to five parameters and the first parameter must be visible in the message extension search bar. A parameter must have a good description, which must contain a combination of acceptable parameters, enums, acronyms, and output format.

The [semanticDescription](../resources/schema/manifest-schema-dev-preview.md#composeextensionscommands) property is used to provide a detailed description of a command for Microsoft Copilot. Semantic description for parameters supports up to 2,000 characters and isn't displayed in the user interface. If the `semanticDescription` property is left empty, Copilot uses the information in the `description` field. When writing a `semanticDescription`, you must include information about expected values, limits, and ranges for the command.

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
        "description": "Project name or task name as keyword.",
        "inputType": "text"
    },
    {
        "name": "Time",
        "title": "Time",
        "description": "Date or number of days for which you need tasks for.",
        "semanticDescription": "Date or number of days for which you need tasks for. Output: Number",
        "inputType": "text"
    },
    {
        "name": "Priority",
        "title": "Priority",
        "description": "Priority of tasks.",
        "semanticDescription": "Priority of tasks. Acceptable values are high, medium, low, NA",
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
    "description": "Survey name or related keyword",
    "inputType": "text"
  },
  {
    "name": "Tags",
    "title": "Tags",
    "description": "Product name or keywords related pertaining to a question",
    "inputType": "text"
  },
  {
    "name": "ResponseNumber",
    "title": "Response number",
    "description": "Number of responses received for a survey.",
    "semanticDescription": "Number of responses received for a survey. Output: Number",
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
    "description": "Type of leads to find.",
    "semanticDescription": "Type of leads to find. Acceptable fields are: Qualified, Unqualified and New.",
    "inputType": "text"
  },
  {
    "name": "Status",
    "title": "Status",
    "description": "Status of leads to find.",
    "semanticDescription": "Status of leads to find. Acceptable fields are: Pending, Quote Given and Quote Rejected.",
    "inputType": "text"
  },
  {
    "name": "Time",
    "title": "Time",
    "description": "Number of days to search for leads with given status.",
    "semanticIndex": "Number of days to search for leads with given status. Output: Number",
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
    "description": "Name of index to search for stocks",
    "semanticDescription": "Name of stock market index used to search for stocks",
    "inputType": "text"
  },
  {
    "name": "NumberofStocks",
    "title": "Ranked Number of Stocks",
    "description": "Number of stocks to return.",
    "semanticDescription": "Number of stocks to return in ranked order. Output format: Top:<Number of stocks or bottom:<Number of stocks>",
    "inputType": "text"
  },
  {
    "name": "P/B",
    "title": "Price to Book Ratio",
    "description": "Price-to-book ratio of a stock.",
    "semanticDescription": "Price to book (P/B) ratio of a stock. Output format: >x.xx or <x.xx",
    "inputType": "text"
  },
  {
    "name": "P/E",
    "title": "Price to Earnings Ratio",
    "description": "Price-to-earnings ratio of a stock with comparison.",
    "semanticDescription": "Price to Earnings (P/E) ratio of a stock with comparison. Output format: >x.xx or <x.xx",
    "inputType": "text"
  }
]
```

---

## Compound utterances

[*Must-fix*]

> [!NOTE]
> Search through dialog (referred as task module in TeamsJS v1.x) isn't supported in Copilot for Microsoft 365.

For Copilot for Microsoft 365, a search-based message extension must support more than three unique compound utterances to perform deep retrieval of accurate information. To enable compound utterances, you must expand the scope of search to handle three or more search parameters by updating the [app manifest (previously called Teams app manifest)](../resources/schema/manifest-schema.md#composeextensionscommands) and ensure the following:

* Update your web service to support search based on multiple parameters. For more information on how to respond to user requests, see [Respond to search command](how-to/search-commands/respond-to-search.md).
* Copilot for Microsoft 365 might pass an empty string or null value for parameters, which aren't part of user utterance, update your web service to handle the parameters.

* A message extension supports upto 10 commands (9 usable) and each command has a corresponding `parameters` property, which supports up to five parameters.

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

## Sample prompts

[*Must-fix*]

The [`samplePrompts`](../resources/schema/manifest-schema.md#composeextensionscommands) property guides users on how to use the various plugins within Copilot. Copilot uses the sample prompts to display the prompts for the user. The prompts must be adaptable to different locales and clear across different commands. Sample prompts are available for First Run Experience (FRE) within Copilot for Microsoft 365 when a user first installs or enables a plugin.

:::image type="content" source="../assets/images/Copilot/bot-based-sample-prompts.png" alt-text="Screenshot shows the sample prompts displayed when the message extension plugin in enable in Copilot.":::

> [!NOTE]
>
> * If the app manifest doesn't specify the `samplePrompts` property, the prompts aren't displayed.
> * The `samplePrompts` property is mandatory for app validation during the app submission process.
> * If you define multiple commands for your app, a maximum of three prompts (one from each of the top three commands) are displayed to the user. The prompts rotate to provide the user with a diverse set of prompts across different commands.

We recommend you to follow these guidelines to increase the chances of your app to pass the Microsoft Teams Store submission process:

* A plugin must have at least three prompts and maximum of five prompts for each command.
* Each prompt must not exceed 128 characters.
* Two commands within the same plugin must not have identical prompts.
* Sample prompts must be generic in nature and not include custom references. For example, project names and task name.
* All sample prompts must be functional and return responses.
* Prompt must be relevant to the commands.

The following code is an example of the `samplePrompts` property in app manifest:

```json
"composeExtensions": [
 {
  "canUpdateConfiguration": true,
  "botId": "bxxxxxx5-xxxx-xxxx-xxxx-4xxxxxx16599",
  "commands": [
   {
    "id": "orders",
    "title": "Orders",
    "context": [
     "Commandbox",
     "Compose"
    ],
    "description": "Search for orders",
    "semanticDescription": "Search for orders",
    "samplePrompts": [
     {
      "text": "Search for all orders"
     },
     {
      "text": "Search for orders related to Contoso"
     },
     {
      "text": "Search for all pending orders"
     },
     {
      "text": "Search for all completed ordered for Fabrikam"
     }
    ]
   }
  ]
 }
]
```

---

## Adaptive Card response

[*Must-fix*]

Message extensions respond to a user input with an Adaptive Card. An Adaptive Card for a message extension plugin must function effectively, appear rich, and meet the following requirements:

* Adaptive Card response must include Adaptive Card content and preview card information as part of the same template. [*Must fix*]

  :::image type="content" source="../assets/images/Copilot/validation-guidelines-app-response-copilot.png" alt-text="Screenshot shows an example of a sample app showing Copilot app response contains Preview and Content in the same response." lightbox="../assets/images/Copilot/validation-guidelines-app-response-copilot-ext.png":::

  <br/>
  <details><summary>Adaptive Card response template example</summary>

  ```json
   {
      "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
      "type": "AdaptiveCard",
      "version": "1.5",
      "body": [
        {
          "type": "Container",
          "items": [
            {
              "type": "TextBlock",
              "text": "${companyName}",
              "size": "Medium",
              "wrap": true,
              "style": "heading"
            },
            {
              "type": "TextBlock",
              "text": "${stockExchange} ${stockSymbol}",
              "isSubtle": true,
              "spacing": "None",
              "wrap": true
            },
            {
              "type": "TextBlock",
              "text": "${formattedDate} ${formattedTime}",
              "wrap": true
            }
          ]
        },
        {
          "type": "Container",
          "spacing": "None",
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
                      "text": "${currentPrice} ",
                      "size": "ExtraLarge",
                      "wrap": true
                    },
                    {
                      "type": "TextBlock",
                      "text": "${priceChange} ${percentChange}",
                      "color": "${changeColor}",
                      "spacing": "None",
                      "wrap": true
                    }
                  ]
                },
                {
                  "type": "Column",
                  "width": "auto",
                  "items": [
                    {
                      "type": "FactSet",
                      "facts": [
                        {
                          "title": "Open",
                          "value": "${openPrice} "
                        },
                        {
                          "title": "High",
                          "value": "${highPrice} "
                        },
                        {
                          "title": "Low",
                          "value": "${lowPrice} "
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      "previewCard": {
        "contentType": "application/vnd.microsoft.card.hero",
        "content": {
          "title": "${companyName}",
          "text": "${stockSymbol}"
        }
      }
    }
  ```

  </details>

* Apart from the app logo, title, thumbnail, and title of the information, the data in the Adaptive Card must represent at least two pieces of information. You can identify the fields from the most frequently searched attributes, such as, data modified, author, status, and flags. [*Must fix*]

  :::image type="content" source="../assets/images/Copilot/validation-guidelines-plugin-functional-action.png" alt-text="Screenshot shows an example of information title, additional user fields, and action button in an Adaptive Card response.":::

* Adaptive Card must be presentable in desktop, web, and mobile (iOS and Android). [*Must fix*]

* An Adaptive Card must contain at least one action button, but not more than four action buttons. [*Must fix*]

  > [!NOTE]
  > Action types `imBack`, `messageBack` aren't supported in a data object.

  The following action types are recommended:

  * `Action.OpenUrl`: Opens a specified URL from the Card.
  * `Action.ToggleVisibility`: Displays or hides one or more elements in the card.
  * `Action.Execute`: Collects the input fields and sends them as a request to your bot service.
  * `Action.Submit`: Opens a dialog or Stageview using type invoke in data object.

  :::image type="content" source="../assets/images/Copilot/ailib-copilot-action-buttons.png" alt-text="Graphic shows an example of the Update Stock, restock, and Cancel restock action buttons in an Adaptive Card response in Copilot.":::

* If a user can change any information on the card through dialog, Stageview, or directly from the card, we recommend the Adaptive Card to support universal actions and automatic refresh. [*Recommended*]
* Adaptive Cards must include a URL as part of the [metadata](https://adaptivecards.io/explorer/Metadata.html), which allows cards to be easily copied from one hub to another. [*Recommended*]
* Apart from thumbnails, any image in an Adaptive Card must have an alt-text. [*Recommended*]

## Extend your plugin to Copilot in meetings

Copilot for Microsoft 365 is available in Teams meetings. You must implement the following:

* Adaptive Cards must not display a horizontal scroll. To avoid horizontal scrolls, don’t specify a fixed width. *[Must fix]*

  * **ColumnSets**

    * Don't define `ColumnSets` with more than three columns.
    * Don’t use explicit pixel width on more than one column in the set.
    * Ensure the column doesn't exceed one-quarter of the narrowest card width, such as in a meeting chat or Copilot.
    * Generally, an explicit width must not exceed 48 pixels, though some scenarios might allow for exceptions.

  * **Sizing images**

    * When using an image inside a `ColumnSet` with more than one Column, specify the size of the column containing an image rather than the image itself.
    * If the image isn’t in a `ColumnSet`, we recommend you to set its size to `auto` or `stretch`.
    * If you want to define explicit width in pixels, ensure that they don't exceed 3/4 of the narrowest card width.
    * If you want to define explicit size in pixels, define it for the width or height. Setting explicit size for any one parameter preserves the image's aspect ratio.
    * We recommend you to set the width of the image, though some scenarios might allow for exceptions.

For more information to create plugins for teams meetings, see [Enable message extension as a plugin for Copilot for meetings.](build-bot-based-plugin.md#enable-message-extension-as-a-plugin-for-copilot-for-meetings)

## Message extensions plugins in Copilot for Microsoft 365 applications

> [!IMPORTANT]
> Message extensions plugins in Copilot for Microsoft 365 applications are in limited private preview for Word and PowerPoint. More details to be published after a public preview is announced.

Copilot extensions customize and extend the Copilot for Microsoft 365 experience by bringing more skills and knowledge to Copilot for a personalized user experience. By using plugins, which are a subset of Copilot extensions, users can integrate additional capabilities into Copilot by interacting with third-party applications, whether for retrieving or modifying information within those apps. For instance, message extension plugins facilitate searching for data in other applications so that Copilot can present it upon request when the plugin is activated.

 If you've developed a plugin for Copilot in Teams or [copilot.microsoft.com](https://copilot.microsoft.com/#/), you're already aware of the benefits it offers to users within their workflow.

### Requirements for plugins in Copilot for Microsoft 365

To ensure your plugins work with Word, Excel, PowerPoint, OneNote, Office, and Outlook Copilots, follow these requirements:

* **Update Microsoft Azure Active Directory (Azure AD) app registration for SSO-enabled apps**

    Azure AD single sign-on (SSO) for message extensions work in the same way as it does in Teams or Outlook. If you've enabled SSO for your app, add the Office app Copilot’s client application identifier to the Azure AD app registration of your bot in your tenant's App registrations portal.

    1. Sign in to [Azure portal](https://portal.azure.com/)  with your sandbox tenant account.
    1. Open **App registrations**.
    1. Select the name of your application to open its app registration.
    1. From the **Manage** section, select **Expose an API**.
    1. In the **Authorized client applications** section, ensure that the following client ID values are listed:

        | Microsoft 365 client application  | Client ID |
        | --- | --- |
        | Word, PowerPoint, Excel (web, desktop) | 3068386c-7a16-4f6a-a664-043b6b232816 |
        | Teams desktop, mobile | 1fec8e78-bce4-4aaf-ab1b-5451cc387264 |
        | Teams web | 5e3ce6c0-2b1f-4285-8d4b-75ee78787346 |
        | Microsoft 365 web | 4765445b-32c6-49b0-83e6-1d93765276ca |
        | Microsoft 365 desktop | 0ec893e0-5785-4de6-99da-4ed124e5296c |
        | Microsoft 365 mobile | d3590ed6-52b3-4102-aeff-aad2292ab01c |
        | Outlook desktop | d3590ed6-52b3-4102-aeff-aad2292ab01c |
        | Outlook web | bc59ab01-8403-45c6-8796-ac3ef710b3e3 |
        | Outlook mobile | 27922004-5251-4030-b22d-91ecd9a37ea4 |
        | Bing | 9ea1ad79-fdb6-4f9a-8bc3-2b70f96e34c7 |

        > [!NOTE]
        >
        > * Support for Excel and OneNote client applications to be available soon.
        > * For more information about how SSO works for message extensions, see [SSO for bot and message extension app](../bots/how-to/authentication/auth-aad-sso-bots.md).

* **Ensure your registered bot is connected to Microsoft 365 and Microsoft Teams channel**

    1. Sign in to [Azure portal](https://portal.azure.com/) with your sandbox tenant account.
    1. Open Bot **Services**.
    1. Select the name of your bot to update its channels.
    1. From the **Settings** section, select **Channels**.
    1. From **Available channels**, select **Microsoft 365 & Microsoft Teams**, and then select **Apply**.

* **Configure content security policy headers**

    If your app makes use of [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) (CSP) headers, ensure that all the following [frame-ancestors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors) are included in your CSP headers:

    | Microsoft 365 App | frame-ancestor permission |
    | --- | --- |
    | All hosts (New) | `*.cloud.microsoft` |
    | Word | fa000000125.resources.office.net |
    | PowerPoint | fa000000129.resources.office.net |
    | Excel | fa000000124.resources.office.net |
    | OneNote | fa000000128.resources.office.net |
    | Copilot and Bing | `edgeservices.bing.com`, `www.bing.com`, `copilot.microsoft.com` |
    | Microsoft 365 app | `*.microsoft365.com`, `*.office.com` |
    | Outlook | `outlook.office.com`, `outlook.office365.com`, `outlook-sdf.office.com`, `outlook-sdf.office365.com` |

* **Upgrade Teams JS version to the 2.22.0 build**

    If you're using Teams JS version 2.22 or earlier, update it to version 2.22 or higher.  

    For more information, see Teams JS Repository [@microsoft/teams-js - npm (npmjs.com)](https://www.npmjs.com/package/@microsoft/teams-js).

## Technical requirements

For a plugin to be validated, invoked, and work seamlessly, ensure that it meets the following criteria:

| Criteria | Fulfillment |
|---|---|
| Manifest version | App manifest version must be 1.13 or later. [*Must fix*] |
| Response Time | Response time must not exceed 9 seconds for 99 percent, 5 Seconds for 75 percent and 2 Seconds for 50 percent. [*Must fix*] |
| Reliability | Apps must maintain 99.9% availability. For instance, if Microsoft 365 Chat calls a plugin 1,000 times, it must provide a meaningful response 999 times. [*Must fix*] |
| Zero Regressions | If you need to resubmit your app for validation, the existing message extension functionality that was working earlier mustn't break. This requirement is only applicable to independent software vendor (ISV) apps and not apps built for your organization. [*Must fix*] |
| [Microsoft 365 Channel](#requirements-for-plugins-in-copilot-for-microsoft-365)| For users to interact with your message extension from Outlook, you need to add Microsoft 365 channel to your bot. For more information, see [Add Microsoft 365 channel](../m365-apps/extend-m365-teams-message-extension.md#add-microsoft-365-channel-for-your-app). [*Must fix*]|
| [Single sign-on (SSO)](#requirements-for-plugins-in-copilot-for-microsoft-365) | If applicable, update your Microsoft Entra ID app registration for SSO.  [*Recommended*] |
| [Content Security Policy](#requirements-for-plugins-in-copilot-for-microsoft-365) |If applicable, modify your Content Security Policy headers. [*Recommended*] |

> [!IMPORTANT]
> If applicable, update your Content Security Policy headers and `X-Frame-Options` in accordance with [Configure Content Security Policy headers](../m365-apps/extend-m365-teams-personal-tab.md#configure-content-security-policy-headers).

## Guidelines for specific Copilot extensions

Microsoft 365 supports various Copilot extensions, including message extensions, API extensions, declarative Copilot, and custom engine Copilot. Besides the common guidelines, there are specific guidelines for each type of Copilot extension.

## Validation guidelines in declarative Copilot

> [!IMPORTANT]
> Message extensions plugins for declarative Copilot are in limited private preview.

A declarative Copilot must ensure the following validations:

<details>
<summary><b>Avoid prompt injection attack</b></summary>

Check App short description, command description, parameter descriptions, instruction, conversation starter.

:::image type="content" source="../assets/images/Copilot/dc-prompt-injection-attack.png" alt-text="This image highlights instructions and conversation starter for Copilot":::

The instructions must not include the following:

| Action | Reason |
| --- | --- |
| :::image type="icon" source="../assets/images/publish-app/dont-icon.png" border="false"::: |  Manipulative phrases for example, "ignore", "delete", "reset", "new instructions", "Answer in Bold"  or "Do not print anything" that aren't relevant to expected actions​​ |
|:::image type="icon" source="../assets/images/publish-app/dont-icon.png" border="false"::: | URLs, emojis, or hidden characters like hexadecimal, binary, or unconventional symbols.​​ |
| :::image type="icon" source="../assets/images/publish-app/dont-icon.png" border="false"::: | Grammar and punctuation errors​​ |

</details>

<details>
<summary><b>Support for three or more unique compound utterances for applicable​ search and action scenarios</b></summary>

:::image type="content" source="../assets/images/Copilot/dc-compound-utterances.png" alt-text="This image shows an example of compound utterances for Copilot.":::

The example shown in the image gives three utterances:

* Fix water pipeline
* John
* 18th May 2024

</details>

<details>
<summary><b>Provide minimum three zero-query prompts​ [*Must fix*]</b></summary>

:::image type="content" source="../assets/images/Copilot/dc-zero-query-prompt.png" alt-text="This image shows an exmaple of zero query prompt in a Copilot.":::

</details>

<details>
<summary><b>Support for creating rich citation​</b> [*Must fix*]</summary>

:::image type="content" source="../assets/images/Copilot/dc-rich-citation.png" alt-text="This image shows an exmaple of rich citation in a Copilot.":::

</details>

<details>
<summary><b>Share user disclosure and seek user confirmation for action scenarios</b></summary>​

:::image type="content" source="../assets/images/Copilot/dc-user-disclosure-confirmation.png" alt-text="The image shows an example of user disclosure and user confirmation.":::

</details>

<details>
<summary><b>Instructions-only Copilots must not be supported</b></summary>

In the following example, declarative Copilot includes Type B plugin with actions defined as functions like List Repair, Create Repairs​.

:::image type="content" source="../assets/images/Copilot/dc-actions-as-functions-pass.png" alt-text="The image shows an example of a pass scenario where actions are defined as functions.":::

In the following example, no nodes are defined for actions or Graph connectors etc. The results are not grounded in a data sources, and for this reason, the authenticity of the result is questionable. ​
:::image type="content" source="../assets/images/Copilot/dc-no-node-for-actions-fail.png" alt-text="This image shows an example of a fail scenario where no node for actions is defined.":::

</details>

<details>
<summary><b>Be responsive and fail gracefully for topics that it doesn’t specialize</b></summary>​

:::image type="content" source="../assets/images/Copilot/dc-no-spam-in-copilot.png" alt-text="This image shows an example of how Copilot can fail gracefully and be responsive.":::

</details>

<details>
<summary><b>Must not spam users by sending multiple messages in short succession​</b></summary>

details TBA
</details>

<!--
### Validation guidelines for custom engine Copilot

The validation guidelines for declarative Copilot are applicable for custom engine Copilot as well. In addition, you must ensure that the following validations are met:

<details>
<summary><b>Include an AI conversational bot</b></summary>

You must define the bot type in the manifest  as 'conversational'.​
</details>

<details>
<summary><b>Uses an enterprise LLM</b></summary>

  (TBD; Open item)​

</details>

<details>
<summary><b>Users must be able to reference custom engine Copilot in Copilot and handoff chat experience in Teams​</b></summary>

:::image type="content" source="../assets/images/Copilot/dc-handoff-chat-experience.png" alt-text="This image is an example that shows custom engine Copilot in Copilot & handoff chat experience in Teams​.":::

</details>

<details>
<summary><b>Adhere to the following UX design requirements​</b></summary>

* AI disclaimer label​: For each message, the bot can mark it as generated by AI, so a label that reads "AI generated" will be automatically added to the top of the message along with a hover tooltip that indicates the AI disclaimer.​

:::image type="content" source="../assets/images/Copilot/dc-disclaimer-label.png" alt-text="This image is an example that shows disclaimer label for each message generated in an AI bot.":::

* Feedback Loop Buttons​

To collect user's feedback on each message, the bot can opt in a flag in the message payload to indicate client rendering feedback loop buttons with thumb-up (Like) and thumb-down (Dislike). When user clicks either button, a task module will be launched to collect user's feedback and send it to bot via invoke.​

The feedback dialog is non-customizable and pre-designed by Teams.​

:::image type="content" source="../assets/images/Copilot/dc-feedback-loop.png" alt-text="This image shows an example of a feedback loop.":::

* Minimum three zero-query prompts​

The first run experience (FRE) screen for 1:1 bot chat has been completely revamped! The sleek new FRE screen features zero prompts, which are sourced from the bots command list in the manifest(specifically, "personal" scope commands for 1:1 bot chat) and presented as prompt starter pills. When a user selects one, the command is placed into the compose box, like the bot input menu UX.​

:::image type="content" source="../assets/images/Copilot/dc-three-zero-prompt.png" alt-text="This image shows an example of three zero-query prompts.":::

* Minimum two prompts or suggested prompts ​

The "View Prompts" UX has replaced the bot input menu in 1:1 bot chats! This change brings the Bot UX closer to that of Copilot with the "view prompts" popup on the top of compose box, which we hope will lead to increased engagement in LLM and GPT bot scenarios.​

:::image type="content" source="../assets/images/Copilot/dc-minimum-prompts.png" alt-text="This image shows an example of two prompts or two suggested prompts.":::

* Be able to create rich citation in form of Adaptive Card​

Bot can cite text content with references. Citation can be inserted in the middle of any place in the text, and the associated reference may include title, keywords, excerpt (abstract), hyperlink, and sensitivity information. References will be rendered as inline citation as popups and the expandable citation footers.​

:::image type="content" source="../assets/images/Copilot/dc-inline-citation.png" alt-text="This image shows an example of inline citations in a AI bot message.":::

:::image type="content" source="../assets/images/Copilot/dc-citation-reference.png" alt-text="This image is an example of citation reference.":::

* Sensitivity icon and label

For each message, the bot can customize sensitivity information. A sensitivity icon will be automatically added to the top of the message along with a hover tooltip with title and description for the information details.​

:::image type="content" source="../assets/images/Copilot/dc-sensitivity-icon-label.png" alt-text="This image is an example of sensitivity icon and label.":::

</details>

**Bot-related policy apply:**

* Must send Welcome message with value proposition and how to use the app​

* Must be responsive and fail gracefully for topics that it doesn’t specialize ​

* Must not spam users by sending multiple messages in short succession​
-->

## Validation guidelines for action-based message extension in Copilot

| Action | Reason |
| --- | --- |
| ✔️ | Plugin must show all data parameters that are being sent to the app and ask for confirmation of the action from user [Platform]​​​ |
| | Data shown in 3P service (through dialogue), is reflective of confirmation provided by user [Works only for supported dialogues]​ |
| | A confirmation of the completion of the action is shared by the plugin in form of card etc. [Bot sent card is not supported] |
| | Action taken by user is correctly reflected in 3P service |
| | Modification requests by user prior to confirmation of the action, must be honoured [Platform] |
| | If plugin encounters an error while completing the action, graceful failure along with the way forward message must be shared to user [details TBD]​ |
| :::image type="icon" source="../assets/images/publish-app/dont-icon.png" border="false"::: | Bulk delete actions should not be supported [details TBD]​ |
| | Description checks [Same as plugins]​ |
| | Compound utterances via Multi parameter (3 or more) |
| | Include at least 3 sample prompts in the manifest​ |

<!--

* Plugin must show all data parameters that are being sent to the app and ask for confirmation of the action from user [Platform]​

* Data shown in 3P service (through dialogue), is reflective of confirmation provided by user [Works only for supported dialogues]​

* A confirmation of the completion of the action is shared by the plugin in form of card etc. [Bot sent card is not supported]​

* Action taken by user is correctly reflected in 3P service ​

* Modification requests by user prior to confirmation of the action, must be honoured [Platform]​
* If plugin encounters an error while completing the action, graceful failure along with the way forward message must be shared to user [details TBD]​

* Bulk delete actions should not be supported [details TBD]​

* Description checks [Same as plugins]​

* Compound utterances via Multi parameter (3 or more) ​

* Include at least 3 sample prompts in the manifest​
-->

## Validation guidelines for API plugins in Copilot

> [!IMPORTANT]
> Message extensions plugins for API plugins are in limited private preview.

| Action | Reason |
| | When user query is not complete or does not match for action intent, plugin must ask user for clarification related to required fields for calling an action [Platform] |
| | Plugin must show what data is being sent to the app and ask for confirmation of the action from user [Platform] |
| | Data shared or sent by user gets correctly reflected in the confirmation |
| | Action taken by user is correctly reflected in 3P service - Dev |
| | Modification requests by user prior to confirmation of the action, must be honoured by plugin [Platform] |
| | A confirmation of the completion of the action is shared by the plugin in form of card |
| | If plugin encounters an error while completing the action, graceful failure along with the way forward message must be shared to user [Details TBD] |
| | Multi delete scenario should not be supported [Details TBD]​ |
| | Description checks [Same as plugins]​ |
| | Compound utterances via Multiparameter |
| | Include at least 3 sample prompts in the manifest |

<!--
* When user query is not complete or does not match for action intent, plugin must ask user for clarification related to required fields for calling an action [Platform] ​

* Plugin must show what data is being sent to the app and ask for confirmation of the action from user [Platform] ​

* Data shared/ sent by user gets correctly reflected in the confirmation​

* Action taken by user is correctly reflected in 3P service - Dev​

* Modification requests by user prior to confirmation of the action, must be honoured by plugin [Platform] ​

* A confirmation of the completion of the action is shared by the plugin in form of card ​

* If plugin encounters an error while completing the action, graceful failure along with the way forward message must be shared to user [Details TBD] ​

* Multi delete scenario should not be supported [Details TBD]​

* Description checks [Same as plugins]​

* Compound utterances via Multiparameter​

* Include at least 3 sample prompts in the manifest
-->

## Code samples

|Sample name | Description |TypeScript |
|----------------|-----------------|--------------|
| Northwind inventory message extension| This sample demonstrates how to use a Teams message extension as a plugin in Microsoft Copilot for Microsoft 365. | [View](https://github.com/OfficeDev/Copilot-for-M365-Plugins-Samples/tree/main/samples/msgext-northwind-inventory-ts) |

## See also

* [Extend bot-based message extension as plugin](build-bot-based-plugin.md)
* [Extend Microsoft Copilot for Microsoft 365](/microsoft-365-copilot/extensibility/)
