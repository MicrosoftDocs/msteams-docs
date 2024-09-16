---
title: Guidelines to validate Copilot agents
description: Learn how to increase the chances of your message extension as a Copilot agent or plugin for Microsoft 365 to pass the Teams Store submission process.
ms.topic: conceptual
author: v-preethah
ms.author: surbhigupta
ms.localizationpriority: high
ms.date: 09/16/2024
ms.collection: ce-skilling-ai-copilot
---

# Validation guidelines for Copilot agents

> [!IMPORTANT]
>
> * Plugins for Microsoft 365 Copilot are in preview and work only in Microsoft 365 Copilot.
> * Message extensions plugins in Microsoft 365 Copilot are in limited private preview for Word and PowerPoint. More details to be published after a public preview is announced.
> * Support for Excel and OneNote client applications to be available soon.
> * Ensure that Microsoft 365 Copilot is available for your organization. You have two ways to get a developer environment for Microsoft 365 Copilot:
>   * A sandbox Microsoft 365 tenant with Microsoft 365 Copilot (available in limited preview through [TAP membership](https://developer.microsoft.com/microsoft-365/tap)).
>   * An enterprise customer production environment with Microsoft 365 Copilot licenses.
> * If you want to configure a custom Graph connector for Microsoft 365 Copilot, ensure that you adhere to the [guidelines to create or upgrade Graph connectors](/graph/connecting-external-content-deploy-teams?branch=main#make-your-microsoft-graph-connector-available-for-other-organizations-in-the-teams-admin-center).

This section is in line with [Microsoft commercial marketplace policy number 1140.9](/legal/marketplace/certification-policies#11409-copilot-extensions-for-copilot-for-microsoft-365).

Apps must be consistent with responsible AI checks. For more information, see [Apps with AI-generated content](teams-store-validation-guidelines.md#apps-with-ai-generated-content).

:::row:::
   :::column:::
      :::image type="icon" source="../../../../assets/icons/description.png" link="#description" border="false":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/screenshots.png" link="#screenshots" border="false":::
   :::column-end:::
   :::column span="":::
     :::image type="icon" source="../../../../assets/icons/copilot-agent-name.png" link="#copilot-agent-name" border="false":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/compound-utterances.png" link="#compound-utterances" border="false":::
   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/prompts.png" link="#prompts" border="false":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/adaptive-card-response.png" link="#adaptive-card-response" border="false":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/compatibility.png" link="#compatibility" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="../../../../assets/icons/technical-requirements.png" link="#technical-requirements" border="false":::
   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::
     :::image type="icon" source="../../../../assets/icons/action-scenarios.png" link="#user-disclosure-and-confirmation-for-action-scenarios" border="false":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/action-knowledge-source.png" link="#copilot-agent-must-have-action-or-knowledge-source" border="false":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/graceful-error-handling.png" link="#graceful-error-handling" border="false":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/security-openapi.png" link="#security-requirements-for-openapi-spec-url" border="false":::
   :::column-end:::
:::row-end:::

## Description

A good description offers a clear and concise summary of the Copilot agent's features. It enhances user awareness and allows Microsoft 365 Copilot to efficiently discover and execute search operations .

You must ensure to meet the following guidelines for Copilot agents:

* The Teams Store validation guidelines related to app description for Microsoft 365 apps are applicable. For more information, see [app descriptions](teams-store-validation-guidelines.md#app-descriptions).
* Short description of Copilot agent, parameter, command description, semantic description, and operation ID mustn't include:
  * Instructional phrases, for example, “if the user says X”, “ignore”, “delete”, “reset”, “new instructions”, “Answer in Bold” or “Do not print anything”. [*Must fix*]
  * URLs, emojis, or hidden characters such as hexadecimal, binary, or unconventional symbols. [*Must fix*]
  * Grammar and punctuation errors. [*Must fix*]
  * Overly verbose, flowery, or marketing language. [*Good-to-fix*]
  * Superlative claims such as “#1,” “amazing,” or “best”. [*Good-to-fix*]

  > [!NOTE]
  > * In case of declarative agents, the short description guidelines apply to the `instructions` and `conversation_starters` fields also.
  > * For API based plugins, these guidelines apply to `description_for_human`, `description_for_model`, `capabilities`, `conversation_starters` (both the title and and text), `states\reasoning\description` in `functions` fields, if provided. [*Must fix*]
  > * When utilizing Swagger or OpenAPI file formats, adhere to these guidelines for the 'path' content associated with keys and the 'description' field for GET, POST, PUT, or DELETE APIs. [*Must fix*]

* App long description must clearly call out that the Copilot agent works in Microsoft 365 Copilot. For example, use Contoso in Microsoft 365 Copilot to search and summarize your tasks. ​[*Must fix*]

  :::image type="content" source="../../../../assets/images/Copilot/validation-guidelines-plugin-prompt-pass.png" alt-text="Screenshot shows a pass scenario with an example of a sample prompt for message extension plugin in Microsoft 365 Copilot.":::

  :::image type="content" source="../../../../assets/images/Copilot/validation-guidelines-plugin-prompt-fail.png" alt-text="Screenshot shows a fail scenario without an example of sample prompt for message extension as a plugin in Microsoft 365 Copilot.":::

* The `semanticDescription` property isn't a mandatory field. However, if you add `semanticDescription` in app manifest, the existing validation checks for short, parameter, and command descriptions are also applicable for semantic descriptions.

[Back to top](#validation-guidelines-for-copilot-agents)

## Screenshots

You must ensure to meet the following guidelines for Copilot agents:

* The Teams Store validation guidelines related to screenshots for Microsoft 365 apps are applicable. For more information, see [screenshots](teams-store-validation-guidelines.md#screenshots).
* Apps with Copilot agent functionality must have atleast one screenshot related to Microsoft 365 Copilot functionality. [*Must fix*]

[Back to top](#validation-guidelines-for-copilot-agents)

## Copilot agent name

You must ensure to meet the following guidelines for Copilot agents:

* The Teams Store validation guidelines related to app name for Microsoft 365 apps are applicable. For more information, see [app name](teams-store-validation-guidelines.md#app-name).
* For declarative agent, ensure that the following parameters are identical: [*Must fix*]
  * `name` in the app manifest
  * `name` in declarativeAgent1.json
  * `name_for_human` in plugin.json files

[Back to top](#validation-guidelines-for-copilot-agents)

## Compound utterances

Copilot agents must support atleast three unique compound utterances by handling three or more parameters.

:::image type="content" source="../../../../assets/images/Copilot/high-quaity-me-pass-multi-parameters.png" alt-text="Screenshot shows an example of a pass scenario where the Northwind app returns a response for a seafood and in stock parameters.":::

[Back to top](#validation-guidelines-for-copilot-agents)

## Prompts

You must ensure the following guidelines for sample prompts and prompt starters.
<!--Plugins must have sample prompts to guide users on how to use the various plugins within Microsoft 365 Copilot. [*Must Fix*]-->

### Sample prompts

The [`samplePrompts`](../../../../resources/schema/manifest-schema.md#composeextensionscommands) property provides guidance to users on utilizing the various plugins in Microsoft 365 Copilot.

:::image type="content" source="../../../../assets/images/Copilot/bot-based-sample-prompts.png" alt-text="Screenshot shows the sample prompts displayed when the message extension plugin is enabled in Microsoft 365 Copilot.":::

Sample prompts are specified using `samplePrompts` property in the app manifest. These prompts must meet the following requirements:

* A plugin must have at least three prompts and maximum of five prompts for each command. [*Must Fix*]
* Each prompt must not exceed 128 characters. [*Must Fix*]
* Two commands within the same plugin must not have identical prompts. [*Must Fix*]
* Sample prompts must be generic in nature and not include custom references. For example, project names and task name. [*Must Fix*]
* All sample prompts must be functional and return responses. [*Must Fix*]
* Prompt must be relevant to the commands. [*Must Fix*]

### Prompt starters

Declarative agents guide the user on how to start using declarative copilot. You must ensure the following guidelines for prompt starters:

* A declarative agent must have at least three prompts and maximum of six prompts. [*Must Fix*]
* All prompt starters must be functional and return responses. [Must Fix]
* It must be generic in nature and not include custom references, for example, project names and task name. [Must Fix]

[Back to top](#validation-guidelines-for-copilot-agents)

## Adaptive Card response

Copilot agent responses provided as an Adaptive Card must meet the following requirements:

* Adaptive Card response must include Adaptive Card content and preview card information as part of the same template. [*Must fix*]

  :::image type="content" source="../../../../assets/images/Copilot/validation-guidelines-app-response-copilot.png" alt-text="Screenshot shows an example of a sample app showing Microsoft 365 Copilot app response contains preview and content in the same response.":::

* Apart from the Copilot agent logo, title, thumbnail, and title of the information, the data in the Adaptive Card must represent at least two pieces of information. You can identify the fields from the most frequently searched attributes such as, data modified, author, status, and flags. [*Must fix*]

  :::image type="content" source="../../../../assets/images/Copilot/validation-guidelines-plugin-functional-action.png" alt-text="Screenshot shows an example of information title, additional user fields, and action button in an Adaptive Card response.":::

* Adaptive Card must be well-formatted to suit the desktop, web, and mobile (iOS and Android) clients. [*Must fix*]
* Adaptive Cards must include a URL as part of the [metadata](https://adaptivecards.io/explorer/Metadata.html), which allows cards to be easily copied from one hub to another. [*Must fix*]

[Back to top](#validation-guidelines-for-copilot-agents)

## Compatibility

Copilot agents must be fully responsive and functional on the latest versions of these clients: [*Must fix*]

* Microsoft Teams on Desktop and Web
* copilot.microsoft.com on web
* Copilot for Microsoft 365 in Word

<!--
> [!NOTE]
> Message extension plugins in Microsoft 365 Copilot apps are in limited private preview for Word and PowerPoint. More details to be published after a public preview is announced.
> Support for Excel and OneNote client applications to be available soon.
-->

[Back to top](#validation-guidelines-for-copilot-agents)

### Ensure your Copilot plugins work in Teams meetings

You must implement the following:

* Adaptive Cards must not display a horizontal scroll. To avoid horizontal scrolls, don’t specify a fixed width: [*Must fix*]

  * **ColumnSets**

    * Don't define `ColumnSets` with more than three columns.
    * Don’t use explicit pixel width on more than one column in the set.
    * Ensure the column doesn't exceed one-quarter of the narrowest card width, such as in a meeting chat or Microsoft 365 Copilot.
    * Generally, an explicit width must not exceed 48 pixels, though some scenarios might allow for exceptions.

  * **Sizing images**

    * When using an image inside a `ColumnSet` with more than one column, specify the size of the column containing an image rather than the image itself.
    * If the image isn’t in a `ColumnSet`, we recommend you to set its size to `auto` or `stretch`.
    * If you want to define explicit width in pixels, ensure that they don't exceed 3/4th of the narrowest card width.
    * If you want to define explicit size in pixels, define it for the width or height. Setting explicit size for any one parameter preserves the image's aspect ratio.
    * We recommend that you must set the width of the image, though some scenarios might allow for exceptions.

For more information to create plugins for teams meetings, see [enable message extension as a plugin for Copilot for meetings](../../../../messaging-extensions/build-bot-based-plugin.md#enable-message-extension-as-a-plugin-for-copilot-for-meetings).

[Back to top](#validation-guidelines-for-copilot-agents)

### Ensure your Copilot agents work with Microsoft 365 - Word, Excel, PowerPoint, OneNote, Office, and Outlook Copilots

You must ensure to meet the following guidelines for Copilot agents:

1. **If using SSO-enabled app, update Microsoft Azure Active Directory (Azure AD) app registration**: [*Must fix*]

    Azure AD single sign-on (SSO) for message extension works in the same way as it does in Teams or Outlook. If you've enabled SSO for your app, add the Office app Copilot’s client application identifier to the Azure AD app registration of your bot in your tenant's App registrations portal.

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
        > For more information about how SSO works for message extensions, see [enable SSO for your app](../../../../bots/how-to/authentication/bot-sso-overview.md).

1. **Ensure your registered bot is connected to Microsoft 365 and Microsoft Teams channel**: [*Must fix*]

    1. Sign in to [Azure portal](https://portal.azure.com/) with your sandbox tenant account.
    1. Open **Bot Services**.
    1. Select the name of your bot to update its channels.
    1. From the **Settings** section, select **Channels**.
    1. From **Available channels**, select **Microsoft 365 & Microsoft Teams**, and then select **Apply**.

1. **Configure Content-Security-Policy headers** [*Must fix*]

    If your Copilot agent makes use of [Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) (CSP) headers, ensure that all the following [frame-ancestors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors) are included in your CSP headers:

    | Microsoft 365 App | frame-ancestor permission |
    | --- | --- |
    | All hosts (New) | `*.cloud.microsoft` |
    | Word | fa000000125.resources.office.net |
    | PowerPoint | fa000000129.resources.office.net |
    | Excel | fa000000124.resources.office.net |
    | OneNote | fa000000128.resources.office.net |
    | Microsoft 365 Copilot and Bing | `edgeservices.bing.com`, `www.bing.com`, `copilot.microsoft.com` |
    | Microsoft 365 app | `*.microsoft365.com`, `*.office.com` |
    | Outlook | `outlook.office.com`, `outlook.office365.com`, `outlook-sdf.office.com`, `outlook-sdf.office365.com` |

1. **Upgrade Teams JS version to the 2.22.0 build** [*Must fix*]

    If you're using Teams JS version 2.22 or earlier, update it to version 2.22 or higher.  

    For more information, see Teams JS Repository [@microsoft/teams-js - npm (npmjs.com)](https://www.npmjs.com/package/@microsoft/teams-js).

[Back to top](#validation-guidelines-for-copilot-agents)

## Technical requirements

For a Copilot agent to be validated, invoked, and to work seamlessly, ensure that it meets the following criteria: [*Must fix*]

| Criteria | Fulfillment |
|---|---|
| Manifest version | *App manifest version must be 1.13 or later. [*Must fix*] <br>* If you're using declarative agent, you must use [public developer preview app manifest schema](../../../../resources/schema/manifest-schema-dev-preview.md). [*Must fix*] |
| Response Time | Response time must not exceed nine seconds for 99 percent, five Seconds for 75 percent and two Seconds for 50 percent. [*Must fix*] |
| Reliability | Apps must maintain 99.9% availability. For instance, if Microsoft 365 Copilot calls a plugin 1,000 times, it must provide a meaningful response 999 times. [*Must fix*] |
| Zero Regressions | If you need to resubmit your Copilot agent for validation, the existing message extension functionality that was working earlier mustn't break. This requirement is only applicable to independent software vendor (ISV) apps and not apps built for your organization. [*Must fix*] |
| Microsoft 365 Channel | For users to interact with your message extension from Outlook, you need to add Microsoft 365 channel to your bot. For more information, see [add Microsoft 365 channel for your app](../../../../m365-apps/extend-m365-teams-message-extension.md#add-microsoft-365-channel-for-your-app). [*Must fix*]|
| Single sign-on (SSO) | If applicable, update your Microsoft Entra ID app registration for SSO. [*Must fix*] |
| Content-Security-Policy | If applicable, modify your Content-Security-Policy headers and X-Frame-Options in accordance with [configure Content-Security-Policy headers](/microsoftteams/platform/m365-apps/extend-m365-teams-personal-tab?tabs=manifest-teams-toolkit#configure-content-security-policy-headers). [*Must fix*] |

[Back to top](#validation-guidelines-for-copilot-agents)

## User disclosure and confirmation for action scenarios

:::image type="content" source="../../../../assets/images/Copilot/dc-user-disclosure-confirmation.png" alt-text="The image shows an example of user disclosure and user confirmation." lightbox="../../../../assets/images/Copilot/dc-user-disclosure-confirmation.png" :::

For action scenarios, Copilot agents must share user disclosure and seek user confirmation:

* Data shown in third-party service (through dialogue) must be reflective of confirmation provided by the user. [*Must Fix*]
* A confirmation of the completion of the action must be shared by the plugin in the form of a card. [*Must Fix*]
* Action taken by a user must be correctly reflected in third-party service. [*Must Fix*]
* Modification requests by the user prior to confirmation of the action must be honored. [*Must Fix*]
* Highly consequential tasks such as bulk delete must not be supported. [*Good-to-fix*]

[Back to top](#validation-guidelines-for-copilot-agents)

## Copilot agent must have Action or knowledge source

Your Copilot agent must have nodes defined as actions or Graph connectors in the app manifest. This ensures that the Copilot agent's responses are grounded in a data source. [*Must fix*]

[Back to top](#validation-guidelines-for-copilot-agents)

## Graceful error handling

All Copilot agents must handle the following scenarios gracefully, that is, the agent must reject the user request and provide a way forward: [*Must fix*]

* For incorrect search parameters
* For misuse or inappropriate language
* For topics in which the Copilot agent doesn’t specialize

  For example, graceful error message with way forward for declarative agent:

  :::image type="content" source="../../../../assets/images/Copilot/graceful-error-handling.png" alt-text="The screenshot shows how to incorporate graceful error handling." lightbox="../../../../assets/images/Copilot/graceful-error-handling.png":::

[Back to top](#validation-guidelines-for-copilot-agents)

## Security requirements for OpenAPI spec URL

Copilot agents that use OpenAPI specs must ensure the following security standards:

* All API calls must use HTTPS with TLS 1.2 or higher. [*Must fix*]
* API calls mustn't lead to any URL redirection. Actual API calls must be served from the same domain or subdomain as the root domain verified for the developer. [*Must fix*]

[Back to top](#validation-guidelines-for-copilot-agents)

## See also

* [Teams Store validation guidelines](teams-store-validation-guidelines.md)
* [Guidelines to create and upgrade Copilot agents](../../../../messaging-extensions/dev-guidelines-copilot-agents.md)
* [Extend bot-based message extension as plugin for Copilot for Microsoft 365](../../../../messaging-extensions/build-bot-based-plugin.md)
* [Extend Microsoft 365 Copilot](/microsoft-365-copilot/extensibility/)
