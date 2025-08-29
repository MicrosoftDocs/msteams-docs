---
title: Guidelines to Validate Agents
description: Learn how to increase the chances of your message extension as an agent for Microsoft 365 Copilot to pass the Teams Store submission process.
ms.topic: conceptual
author: v-preethah
ms.author: surbhigupta
ms.localizationpriority: high
ms.owner: ginobuzz
ms.date: 07/31/2025
ms.collection: ce-skilling-ai-copilot
---

# Validation guidelines for agents

> [!IMPORTANT]
>
> * These guidelines are applicable for Independent Software Vendors (ISV) who want to publish their agent on the store.
> * Message extensions agents in Microsoft 365 Copilot are in public preview for Microsoft Word and Microsoft PowerPoint.
> * Support for Excel and OneNote client applications to be available soon.
> * Ensure that Microsoft 365 Copilot is available for your organization. You have two ways to get a developer environment for Microsoft 365 Copilot:
>   * A sandbox Microsoft 365 tenant with Microsoft 365 Copilot (available in limited preview through [TAP membership](https://developer.microsoft.com/microsoft-365/tap)).
>   * An enterprise customer production environment with Microsoft 365 Copilot licenses.

This section is in line with [Microsoft commercial marketplace policy number 1140.9](/legal/marketplace/certification-policies#11409-copilot-extensions-for-copilot-for-microsoft-365).

Apps must be consistent with responsible [AI checks](teams-store-validation-guidelines.md#apps-with-ai-generated-content).

:::row:::
   :::column:::
      :::image type="icon" source="../../../../assets/icons/description.png" link="#description" border="false":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/screenshots.png" link="#screenshots" border="false":::
   :::column-end:::
   :::column span="":::
     :::image type="icon" source="../../../../assets/icons/agent-name.png" link="#agent-name" border="false":::
   :::column-end:::
<!--
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/compound-utterances.png" link="#compound-utterances" border="false":::
   :::column-end:::
-->
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/prompts.png" link="#prompts" border="false":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/adaptive-card-response.png" link="#adaptive-card-response" border="false":::
   :::column-end:::
:::row-end:::
:::row:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/compatibility.png" link="#compatibility" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="../../../../assets/icons/technical-requirements.png" link="#technical-requirements" border="false":::
   :::column-end:::
   :::column span="":::
     :::image type="icon" source="../../../../assets/icons/action-scenarios.png" link="#user-disclosure-and-confirmation-for-action-scenarios" border="false":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/bot-requirement-agent.png" link="#bot-requirements-for-custom-engine-agents" border="false":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/action-knowledge-source.png" link="#action-or-knowledge-source" border="false":::
   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/duplicate-agents.png" link="#duplicate-agents" border="false":::
   :::column-end:::
  :::column span="":::
      :::image type="icon" source="../../../../assets/icons/agent-response.png" link="#agent-response" border="false":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/graceful-error-handling.png" link="#graceful-error-handling" border="false":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/security-openapi.png" link="#security-requirements-for-openapi-spec-url" border="false":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/white-bg.png" border="false":::
      :::column-end:::
:::row-end:::

## Description

A good description offers a clear and concise summary of the agent's features. It enhances user awareness and allows Microsoft 365 Copilot to efficiently discover and execute search operations.

You must ensure to meet the following guidelines for agents:

* The Teams Store validation guidelines related to app description for Microsoft 365 apps are applicable. For more information, see [app descriptions](teams-store-validation-guidelines.md#app-descriptions).
* Short description of agent, parameter, command description, semantic description, and operation ID mustn't include:
  * Instructional phrases, for example, 'if the user says X', 'ignore', 'delete', 'reset', 'new instructions', 'Answer in Bold', or 'Do not print anything'. [*Must fix*]
  * URLs, emojis, or hidden characters such as hexadecimal, binary, or unconventional symbols. [*Must fix*]
  * Grammar and punctuation errors. [*Must fix*]
  * Overly verbose, flowery, or marketing language. [*Good-to-fix*]
  * Superlative claims such as '#1', 'amazing', or 'best'. [*Good-to-fix*]

  > [!NOTE]
  > * For declarative agents, the short description guidelines apply to the `instructions` and `conversation_starters` fields also.
  > * For API based plugins, these guidelines apply to `description_for_human`, `description_for_model`, `capabilities`, `conversation_starters` (both the title and text), `states\reasoning\description` in `functions` fields, if provided. [*Must fix*]
  > * When utilizing Swagger or OpenAPI file formats, adhere to these guidelines for the `path` content associated with keys and the `description` field for GET, POST, PUT, or DELETE APIs. [*Must fix*]

* App long description must clearly call out that the agent works in Microsoft 365 Copilot. For example, use Contoso in Microsoft 365 Copilot to search and summarize your tasks. ​[*Must fix*]

  :::image type="content" source="../../../../assets/images/Copilot/validation-guidelines-plugin-prompt-pass.png" alt-text="Screenshot shows a pass scenario with an example of a sample prompt for message extension agent in Microsoft 365 Copilot.":::

  :::image type="content" source="../../../../assets/images/Copilot/validation-guidelines-plugin-prompt-fail.png" alt-text="Screenshot shows a fail scenario without an example of sample prompt for message extension as an agent in Microsoft 365 Copilot.":::

* The `semanticDescription` property isn't a mandatory field. However, if you add `semanticDescription` in app manifest, the existing validation checks for short, parameter, and command descriptions are also applicable for semantic descriptions.

[Back to top](#validation-guidelines-for-agents)

## Screenshots

You must ensure to meet the following guidelines for agents:

* The Teams Store validation guidelines related to screenshots for Microsoft 365 apps are applicable. For more information, see [screenshots](teams-store-validation-guidelines.md#screenshots).
* Apps with agent functionality must have at least one screenshot related to Microsoft 365 Copilot functionality. [*Must fix*]

[Back to top](#validation-guidelines-for-agents)

## Agent name

You must ensure to meet the following guidelines for agents:

* The Teams Store validation guidelines related to app name for Microsoft 365 apps are applicable. For more information, see [app name](teams-store-validation-guidelines.md#app-name).
* For declarative agent, ensure that the following parameters are identical: [*Must fix*]
  * `name` in the manifest.json
  * `name` in the declarative agent json file
  * `name_for_human` in the plugin json files

[Back to top](#validation-guidelines-for-agents)

## Prompts

You must ensure the following guidelines for sample prompts and prompt starters:

### Sample prompts

For message extension based declarative agent, the [`samplePrompts`](../../../../resources/schema/manifest-schema.md#composeextensionscommands) property provides guidance to users on utilizing the agents in Microsoft 365 Copilot

:::image type="content" source="../../../../assets/images/Copilot/bot-based-sample-prompts.png" alt-text="Screenshot shows the sample prompts displayed when the message extension agent is enabled in Microsoft 365 Copilot.":::

Sample prompts are specified using `samplePrompts` property in the app manifest. These prompts must meet the following requirements:

* An agent must have at least three prompts and maximum of five prompts for each command. [*Must fix*]
* Each prompt mustn't exceed 128 characters. [*Must fix*]
* Two commands within the same agent mustn't have identical prompts. [*Must fix*]
* All sample prompts must be functional and return responses. [*Must fix*]
* Prompt must be relevant to the commands. [*Must fix*]

### Prompt starters

Prompt starters guide users on how to start using declarative agents and custom engine agents. You must ensure the following guidelines for prompt starters:

* A declarative agent or a custom engine agent must have at least three prompts and maximum of six prompts. [*Must fix*]
* All prompt starters must be functional and return responses. [*Must fix*]

[Back to top](#validation-guidelines-for-agents)

## Adaptive Card response

Agent responses provided as an Adaptive Card must meet the following requirements:

* Adaptive Card response must include Adaptive Card content and preview card information as part of the same template. [*Must fix*]

  :::image type="content" source="../../../../assets/images/Copilot/validation-guidelines-app-response-copilot.png" alt-text="Screenshot shows an example of a sample app showing Microsoft 365 Copilot app response contains preview and content in the same response.":::

* Apart from the agent logo, title, thumbnail, and title of the information, the data in the Adaptive Card must represent at least two pieces of information. You can identify the fields from the most frequently searched attributes such as data modified, author, status, and flags. [*Must fix*]

  :::image type="content" source="../../../../assets/images/Copilot/validation-guidelines-plugin-functional-action.png" alt-text="Screenshot shows an example of information title, additional user fields, and action button in an Adaptive Card response.":::

* Adaptive Card must be well-formatted to suit the desktop, web, and mobile (iOS and Android) clients. [*Must fix*]
* Adaptive Cards must include a URL as part of the [metadata](https://adaptivecards.microsoft.com/?topic=CardMetadata), which allows cards to be easily copied from one hub to another. [*Must fix*]

[Back to top](#validation-guidelines-for-agents)

## Compatibility

Agents must be fully responsive and functional on the latest versions of these clients: [*Must fix*]

* Microsoft Teams on desktop and web
* copilot.microsoft.com on web
* Microsoft 365 Copilot in Word

### Ensure your agents work with Microsoft 365 - Word, Excel, PowerPoint, OneNote, Office, and Outlook Copilots

You must ensure to meet the following guidelines for agents:

1. **If using SSO-enabled app, update Microsoft Entra app registration**: [*Must fix*]

    Microsoft Entra single sign-on (SSO) for message extension works in the same way as it does in Teams or Outlook. If you enabled SSO for your app, add the Office app Copilot’s client application identifier to the Microsoft Entra app registration of your bot in your tenant's App registrations portal.

    1. Sign in to [Azure portal](https://portal.azure.com/) with your sandbox tenant account.
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
        > For more information about how SSO works for message extensions, see [enable SSO for your app](../../../../bots/how-to/authentication/bot-sso-overview.md).

1. **Ensure your registered bot is connected to Microsoft 365 and Microsoft Teams channel**: [*Must fix*]

    1. Sign in to [Azure portal](https://portal.azure.com/) with your sandbox tenant account.
    1. Open **Bot Services**.
    1. Select the name of your bot to update its channels.
    1. From the **Settings** section, select **Channels**.
    1. From **Available channels**, select **Microsoft 365 & Microsoft Teams**, and then select **Apply**.

1. **Configure Content Security Policy headers** [*Must fix*]

    If your agent makes use of [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) (CSP) headers, ensure that all the following [frame-ancestors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors) are included in your CSP headers:

    | Microsoft 365 App | `frame-ancestors` permission |
    | --- | --- |
    | All hosts (New) | `*.cloud.microsoft` |
    | Word | fa000000125.resources.office.net |
    | PowerPoint | fa000000129.resources.office.net |
    | Excel | fa000000124.resources.office.net |
    | OneNote | fa000000128.resources.office.net |
    | Microsoft 365 Copilot and Bing | `edgeservices.bing.com`, `www.bing.com`, `copilot.microsoft.com` |
    | Microsoft 365 app | `*.microsoft365.com`, `*.office.com` |
    | Outlook | `outlook.office.com`, `outlook.office365.com`, `outlook-sdf.office.com`, `outlook-sdf.office365.com` |
    | Office.com | `Office.com/copilot` <br> `Office.com/chat` |
    | Microsoft365.com | `Microsoft365.com/copilot` <br> `Microsoft365.com/chat` |
    | M365.cloud.microsoft | `M365.cloud.microsoft/chat` <br> `M365.cloud.microsoft/copilot` |
    | Copilot.cloud.microsoft | `Copilot.cloud.microsoft` |

1. **Upgrade Teams JS version to the 2.22.0 build** [*Must fix*]

    If you're using Teams JS version 2.22 or earlier, update it to version 2.22 or higher.  

    For more information, see Teams JS Repository [@microsoft/teams-js - npm (npmjs.com)](https://www.npmjs.com/package/@microsoft/teams-js).

[Back to top](#validation-guidelines-for-agents)

## Technical requirements

For an agent to be validated, invoked, and to work seamlessly, ensure that it meets the following criteria: [*Must fix*]

| Criteria | Fulfillment |
|---|---|
| Manifest version | *App manifest version must be 1.13 or later. [*Must fix*] <br>* If you're using declarative agent, you must use [public developer preview app manifest schema](../../../../resources/schema/manifest-schema-dev-preview.md). [*Must fix*] |
| Response time | Response time mustn't exceed nine seconds for 99 percent, five seconds for 75 percent and two seconds for 50 percent. [*Must fix*] |
| Reliability | Apps must maintain 99.9% availability. For instance, if Microsoft 365 Copilot calls an agent 1,000 times, it must provide a meaningful response 999 times. [*Must fix*] |
| Zero regressions | If you need to resubmit your agent for validation, the existing message extension functionality that was working earlier mustn't break. [*Must fix*] |
| Microsoft 365 channel | For users to interact with your message extension from Outlook, you need to add Microsoft 365 channel to your bot. For more information, see [add Microsoft 365 channel for your app](../../../../m365-apps/extend-m365-teams-message-extension.md#add-microsoft-365-channel-for-your-app). [*Must fix*]|
| Single sign-on (SSO) | If applicable, update your Microsoft Entra app registration for SSO. [*Must fix*] |
| Content Security Policy (CSP) | If applicable, modify your CSP headers and X-Frame-Options in accordance with [configure Content Security Policy headers](/microsoftteams/platform/m365-apps/extend-m365-teams-personal-tab?tabs=manifest-toolkit#configure-content-security-policy-headers). [*Must fix*] |

[Back to top](#validation-guidelines-for-agents)

## User disclosure and confirmation for action scenarios

:::image type="content" source="../../../../assets/images/Copilot/dc-user-disclosure-confirmation.png" alt-text="The image shows an example of user disclosure and user confirmation." lightbox="../../../../assets/images/Copilot/dc-user-disclosure-confirmation.png" :::

For action scenarios, agents must share user disclosure and seek user confirmation:

* Data shown in third-party service (through dialogue) must be reflective of confirmation provided by the user. [*Must fix*]
* A confirmation of the completion of the action must be shared by the agent in the form of a card. [*Must fix*]
* Action taken by a user must be correctly reflected in third-party service. [*Must fix*]
* Modification requests by the user prior to confirmation of the action must be honored. [*Must fix*]
* Highly consequential tasks such as bulk delete mustn't be supported. [*Good-to-fix*]
* The declarative agent must provide confirmation prompts aligned with user-initiated actions, using clear language that explicitly seeks the user's permission. [*Must fix*]

   Confirmation prompt can be set by using `body` property in the `Confirmation` object in the function's Function capabilities object in the manifest. For more information, see [customizing confirmation text](/microsoft-365-copilot/extensibility/api-plugin-confirmation-prompts?branch=main&branchFallbackFrom=public-preview#customizing-confirmation-text).

   | Pass example | Fail example |
   | --- | --- |
   | For a function that searches tickets - "Do you want to allow searching in Contoso?" "Do you want to allow searching for tickets?" | Do you want to proceed?" --> Doesnt indicate what the function does. |
   | For a function that creates a new order "Do you want to proceed with creating a new order?" | Searches tickets" --> Doesn't seek permission |
   | For a function that creates a new ticket: "Do you want to proceed with creating a new ticket?" | "Creates tickets" --> Doesn't seek permission |

* For declarative agents, any action with consequences on the external system mustn't have `isConsequential` flag set as ‘False’. [*Must fix*]

  For more details, see [overriding prompt behavior](/microsoft-365-copilot/extensibility/api-plugin-confirmation-prompts?branch=main&branchFallbackFrom=public-preview#overriding-prompt-behavior).

   | Operation type | Actions | Expected value for `isConsequential` flag |
   | --- | --- | --- |
   | Create | Consequential | True |
   | Read | Non-consequential | False or True |
   | Update | Consequential | True |
   | Delete | Consequential | True |

   | Command description | Consequential function? | Expected value for `isConsequential` flag |
   | --- | --- | --- |
   | Returns a list of quest recommendations based on the user's interest. If there are no quote recommendations, then create a new one. | Yes | True |
   | Returns a list of meditation recommendations based on the user's preferences. | No | False or True |
   | Returns a list of quest recommendations based on the user's interest. If there are no quote recommendations, then create a new one. | Yes | True |

[Back to top](#validation-guidelines-for-agents)

## Bot requirements for custom engine agents

A custom engine agent is a conversational Teams bot that must meet the following requirements:

1. A custom engine agent must always contain conversation bot based on Large Language Models (LLMs) for seamless user interaction. [*Must fix*]
1. The bot ID declaration as a custom engine agent node must be same as the bot ID defined in the bot node in the app manifest. [*Must fix*]
1. User must be able to reference custom engine agent in Microsoft 365 Copilot and handoff chat experience in Teams. [*Good-to-fix*]
1. Bot must include the following UX design components:

   1. An [AI label](/microsoftteams/platform/bots/how-to/bot-messages-ai-generated-content?tabs=after%2Cbotmessage#ai-label) that enables a user to identify that the message was generated using AI. [*Must fix*]
   1. A [feedback button](/microsoftteams/platform/bots/how-to/bot-messages-ai-generated-content?tabs=after%2Cbotmessage#feedback-buttons) that enables a user to provide positive or negative feedback to the agent's messages. [*Must fix*]
   1. A [citation](/microsoftteams/platform/bots/how-to/bot-messages-ai-generated-content?tabs=after%2Cbotmessage#citations) that enables a user to refer to the source of the bot message through in-text citations and references. [*Must fix*]
   1. A [sensitivity label](/microsoftteams/platform/bots/how-to/bot-messages-ai-generated-content?tabs=after%2Cbotmessage#sensitivity-label) that enables a user to understand the confidentiality of the bot message. [*Good-to-fix*]
   1. An agent must stream its responses to the user. [*Must fix*]
   1. An agent must include at least three prompt starters or a welcome message. [*Must fix*]

      For more information, see [bot welcome messages](teams-store-validation-guidelines.md#bots-1).
   1. A bot must offer at least two context-specific suggestions or prompts to the user, rather than generic or fixed ones. [*Must fix*]
1. The scopes defined in `bot.scopes` and `bot.commandList.scopes` nodes of the manifest must match to maintain good user experience.
1. Custom engine agents must include **copilot** in `bot.scopes` and `bot.commandList.scopes` to ensure proper surfacing and full platform support.

[Back to top](#validation-guidelines-for-agents)

## Action or knowledge source

* Your agent must have nodes defined as actions in the app manifest. All agents must have a core use case that's served through API actions. [*Must fix*]

<!--
* For capabilities such as web search, graphic art, or code interpreter, the `Instruction` field must include details on how to use the capabilities within the context of the agent. [*Must fix*]
-->

* To grant multi-tenant agent access to all tenant data for email, Teams messages, Teams Meeting, ODSP, and Graph connector capabilities, leave the nodes for them empty in the declarative agent. [*Must fix*]

* The Dataverse, file embedding, sensitivity label, and scenario model capabilities are restricted to be used in the LOB scenario only. [*Must fix*]

* Adhere to the following guidelines when using the `action.insertImage` custom action or action set [*Must fix*]:

  * The button's title must indicate that an image will be inserted into the canvas.

  * Ensure that the intended image gets inserted on clicking the button

  * Ensure the fallback is set to **Drop** to guarantee that the Adaptive Card functions in all compatible clients.

  * Support insertion for all images in the Adaptive Card.

<!--
* Nodes for Graph connector in the declarative agent manifest must be left blank to ground the agent in all available Graph connectors of a tenant. [*Must fix*]

   **Pass example**: The Graph connector node is empty. <br>

    :::image type="content" source="../../../../assets/images/Copilot/da-pass-scenario-graph-connector.png" alt-text="Screenshot of the pass scenario.":::

    **Fail example**: The Graph connector node isn't empty and has connections hardcoded. <br>

    :::image type="content" source="../../../../assets/images/Copilot/da-fail-scenario-graph-connector.png" alt-text="Screenshot of the fail scenario.":::
-->

[Back to top](#validation-guidelines-for-agents)

## Duplicate agents

* Multiple agents for the same product can be published separately but each must have different functionality

* An agent can be published separately from the main app but it must have a clear justification for the same.

* To avoid confusion and ensure clarity for end users:

  * The name, short description, and long description must differ meaningfully from those of any existing apps.

  * The short description and long description must clearly communicate the app’s unique value proposition and how it differs from related submissions.

## Agent response

* The declarative agent must be functional and must provide accurate responses to the users. To ensure the same, atleast one corresponding prompt in one of the following fields must be present for each and every function of the declarative agent: [*Must fix*]

  * Sample prompts or conversation starters
  * Instructions field in manifest
  * Test notes

* All search results in the message extension capability must include a relevant title and subtitle, which will also appear in citations of your agent [*Must fix*].

* A confirmation of the completion of the action must be shared by the agent, which should include the details of the action, way forward, and must have a source link or a tracking ID for the user to verify the action [*Must fix*]

  * When the agent is provided with the tracking ID, it must return details of the performed action or the item details on which the action has been executed. [*Must fix*]

* An agent sending multiple messages must make sure that messages are not repetitive or redundant in nature.

## Graceful error handling

All agents must handle the following scenarios gracefully, that is, the agent must reject the user request and provide a way forward: [*Must fix*]

* For incorrect search parameters
* For misuse or inappropriate language
* For topics in which the agent doesn’t specialize

  For example, graceful error message with way forward for declarative agent:

  :::image type="content" source="../../../../assets/images/Copilot/graceful-error-handling.png" alt-text="The screenshot shows how to incorporate graceful error handling." lightbox="../../../../assets/images/Copilot/graceful-error-handling.png":::

[Back to top](#validation-guidelines-for-agents)

## Security requirements for OpenAPI spec URL

Agents that use OpenAPI specs must ensure the following security standards:

* All API calls must use HTTPS with TLS 1.2 or higher. [*Must fix*]
* API calls mustn't lead to any URL redirection. Actual API calls must be served from the same domain or subdomain as the root domain verified for the developer. [*Must fix*]

[Back to top](#validation-guidelines-for-agents)

## See also

* [Teams Store validation guidelines](teams-store-validation-guidelines.md)
* [Guidelines to create and upgrade agents](../../../../messaging-extensions/dev-guidelines-agents.md)
* [Extend bot-based message extension as agent for Microsoft 365 Copilot](../../../../messaging-extensions/build-bot-based-agent.md)
* [Extend Microsoft 365 Copilot](/microsoft-365-copilot/extensibility/)
