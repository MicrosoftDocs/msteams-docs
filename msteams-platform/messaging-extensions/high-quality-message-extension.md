---
title: Guidelines to validate Copilot Extensions
description: Learn to increase the chances of your message extension as a plugin for Microsoft Copilot for Microsoft 365 to pass the Teams Store submission process. Understand the requirements, and validation guidelines.
ms.topic: how-to
author: v-preethah
ms.author: surbhigupta
ms.localizationpriority: high
ms.date: 07/03/2024
ms.collection: ce-skilling-ai-copilot
---

# Validation guidelines for Copilot extensions

> [!IMPORTANT]
>
> * Plugins for Microsoft Copilot for Microsoft 365 are in preview and only work in Microsoft 365 Copilot in Microsoft Teams.
> * Ensure that Copilot for Microsoft 365 is available for your organization. You have two ways to get a developer environment for Copilot:
>   * A sandbox Microsoft 365 tenant with Copilot (available in limited preview through [TAP membership](https://developer.microsoft.com/microsoft-365/tap)).
>   * An enterprise customer production environment with Microsoft Copilot for Microsoft 365 licenses.
> * Message extension plugins for declarative Copilot are in limited private preview.

This section is in line with [Microsoft commercial marketplace policy number 1140.9](/legal/marketplace/certification-policies#11409-copilot-extensions-for-copilot-for-microsoft-365).

## Descriptions

A good description offers a clear and concise summary of the app’s features and allows Copilot for Microsoft 365 to efficiently discover and execute search operations.

The guidelines related to description for Microsoft 365 apps are applicable. For more information, see [App descriptions](../concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md#app-descriptions). In addition, you must ensure to meet the following guidelines for Copilot extensions:

* Short description of app, parameter, command description, Semantic description and Operation ID must not include:
  * Instructional phrases, for example, “if the user says X”, “ignore”, “delete”, “reset”, “new instructions”, “Answer in Bold” or “Do not print anything“. [*Must-fix*]
  * URLs, emojis, or hidden characters like hexadecimal, binary, or unconventional symbols [*Must-fix*]
  * Grammar and punctuation errors [*Must-fix*]
  * Overly verbose, flowery, or marketing language. [*Good-to-fix*]
  * Superlative claims such as “#1,” “amazing,” or “best.” [*Good-to-fix*]

  > [!NOTE]
  > In case of declarative Copilots, these guidelines apply to instructions and conversation starters fields also.

* App long description must clearly call out that extension works in Copilot. For example, use Contoso in Copilot to search and summarize your tasks. ​[*Must-fix*]

  :::image type="content" source="../assets/images/Copilot/validation-guidelines-plugin-prompt-pass.png" alt-text="Screenshot shows a pass scenario with an example of a sample prompt for message extension plugin in Copilot Chat.":::

  :::image type="content" source="../assets/images/Copilot/validation-guidelines-plugin-prompt-fail.png" alt-text="Screenshot shows a fail scenario without an example of sample prompt for message extension as a plugin in Copilot Chat.":::

* The `semanticDescription` property isn't a mandatory field. However, if you add `semanticDescription` in app manifest, the existing validation checks for short, parameter, and command descriptions are also applicable for semantic descriptions.

## Screenshots

The guidelines related to description for Microsoft 365 apps are applicable. For more information, see [App descriptions](../concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md#app-descriptions).

In addition, you must ensure that apps with Copilot extension functionality must have atleast one screenshot related to Copilot functionality. [*Must-fix*]

## App or extension name

The guidelines related to description for Microsoft 365 apps are applicable. For more information, see [App descriptions](../concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md#app-descriptions).

In addition, you must ensure that for declarative Copilot, the `name` field in manifest file and the `name` field in declarativecopilot.json and `name_for_human` in plugin.json files are identical. [*Must fix*]

## Compound utterances

Copilot extensions must support atleast more than three unique compound utterances by handling three or more parameters.

:::image type="content" source="../assets/images/Copilot/high-quaity-me-pass-multi-parameters.png" alt-text="Screenshot shows an example of a pass scenario where the Northwind app returns a response for a seafood and in stock parameters.":::

## Sample prompts

[*Must-fix*]

The [`samplePrompts`](../resources/schema/manifest-schema.md#composeextensionscommands) property guides users on how to use the various extensions within Copilot.

:::image type="content" source="../assets/images/Copilot/bot-based-sample-prompts.png" alt-text="Screenshot shows the sample prompts displayed when the message extension plugin in enable in Copilot.":::

Plugins must have sample prompts to guide users on how to use the various plugins within Copilot. [*Must Fix*]

Sample prompts are specified using `samplePrompts` property in the manifest. These prompts must meet the following requirements: [*Must Fix*]

* A plugin must have at least three prompts and maximum of five prompts for each command.
* Each prompt must not exceed 128 characters.
* Two commands within the same plugin must not have identical prompts.
* Sample prompts must be generic in nature and not include custom references. For example, project names and task name.
* All sample prompts must be functional and return responses.
* Prompt must be relevant to the commands.

> [!NOTE]
> In case of declarative Copilot, these guidelines also apply for zero-query prompts.

## Adaptive Card responses

Copilot extension responses provided as an adaptive card must meet below requirements. [*Must fix*]

* Adaptive Card response must include Adaptive Card content and preview card information as part of the same template. [*Must fix*]

  :::image type="content" source="../assets/images/Copilot/validation-guidelines-app-response-copilot.png" alt-text="Screenshot shows an example of a sample app showing Copilot app response contains Preview and Content in the same response." lightbox="../assets/images/Copilot/validation-guidelines-app-response-copilot-ext.png":::

* Apart from the app logo, title, thumbnail, and title of the information, the data in the Adaptive Card must represent at least two pieces of information. You can identify the fields from the most frequently searched attributes, such as, data modified, author, status, and flags. [*Must fix*]

  :::image type="content" source="../assets/images/Copilot/validation-guidelines-plugin-functional-action.png" alt-text="Screenshot shows an example of information title, additional user fields, and action button in an Adaptive Card response.":::

* Adaptive Card must be presentable in desktop, web, and mobile (iOS and Android). [*Must fix*]

* If a user can change any information on the card through dialog, Stageview, or directly from the card, we recommend the Adaptive Card to support universal actions and automatic refresh. [*Must fix*]
* Adaptive Cards must include a URL as part of the [metadata](https://adaptivecards.io/explorer/Metadata.html), which allows cards to be easily copied from one hub to another. [*Must fix*]
* Apart from thumbnails, any image in an Adaptive Card must have an alt-text. [*Must fix*]

## Compatibility

Copilot extensions must be fully responsive and functional on the latest versions of these clients. [*Must-fix*]

* Microsoft Teams on Desktop and Web
* copilot.microsoft.com on web
* Copilot for Microsoft 365 in Word

> [!NOTE]
> Message extensions plugins in Copilot for Microsoft 365 applications are in limited private preview for Word and PowerPoint. More details to be published after a public preview is announced.
> Support for Excel and OneNote client applications to be available soon.

## Ensure your Copilot plugins work in Teams meetings

[*Must-fix*]

<!--Copilot for Microsoft 365 is available in Teams meetings.--> You must implement the following:

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

### Ensure your extensions work with Microsoft 365 - Word, Excel, PowerPoint, OneNote, Office, and Outlook Copilots

Follow these requirements:

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
        > For more information about how SSO works for message extensions, see [SSO for bot and message extension app](../bots/how-to/authentication/auth-aad-sso-bots.md).

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

For Copilot extensions to be validated, invoked, and work seamlessly, ensure that it meets the following criteria: [*Must fix*]

| Criteria | Fulfillment |
|---|---|
| Manifest version | App manifest version must be 1.13 or later. [*Must fix*] |
| Response Time | Response time must not exceed 9 seconds for 99 percent, 5 Seconds for 75 percent and 2 Seconds for 50 percent. [*Must fix*] |
| Reliability | Apps must maintain 99.9% availability. For instance, if Microsoft 365 Chat calls a plugin 1,000 times, it must provide a meaningful response 999 times. [*Must fix*] |
| Zero Regressions | If you need to resubmit your app for validation, the existing message extension functionality that was working earlier mustn't break. This requirement is only applicable to independent software vendor (ISV) apps and not apps built for your organization. [*Must fix*] |
| Microsoft 365 Channel | For users to interact with your message extension from Outlook, you need to add Microsoft 365 channel to your bot. For more information, see [Add Microsoft 365 channel](../m365-apps/extend-m365-teams-message-extension.md#add-microsoft-365-channel-for-your-app). [*Must fix*]|
| Single sign-on (SSO) | If applicable, update your Microsoft Entra ID app registration for SSO.  [*Recommended*] |
| Content Security Policy |If applicable, modify your Content Security Policy headers. [*Recommended*] |

## User disclosure and confirmation for action scenarios

:::image type="content" source="../assets/images/Copilot/dc-user-disclosure-confirmation.png" alt-text="The image shows an example of user disclosure and user confirmation.":::

For action scenarios, Copilot extensions must share user disclosure & seek user confirmation [*Must Fix*].

* Data shown in 3P service (through dialogue), must be reflective of confirmation provided by user.

* A confirmation of the completion of the action must be shared by the plugin in the form of card.

* Action taken by user must be correctly reflected in 3P service.

* Modification requests by user prior to confirmation of the action must be honored.

* Highly consequential tasks such as, bulk delete must not be supported. [*Suggested Fix*]

## Instructions-only Copilots must not be supported

If your Copilot extension doesn't have any nodes defined for actions or Graph connectors in the manifest, the extension responses are not grounded in a data sources. These extensions, also called as instruction-only Copilot extensions, aren't allowed due to questionable authenticity of the result. [*Must fix*]

:::image type="content" source="../assets/images/Copilot/dc-no-node-for-actions-fail.png" alt-text="This image shows an example of a fail scenario where no node for actions is defined.":::

## Graceful error handling

All Copilot extensions must handle the following scenarios gracefully, that is, the extension must reject the user request and provide a way forward. [*Must fix*]

* For incorrect search parameters
* For misuse or inappropriate language
* For topics in which the Copilot doesn’t specialize

  For example, Graceful error message with way forward for declarative Copilot:

  :::image type="content" source="../assets/images/Copilot/graceful-error-handling.png" alt-text="The screenshots how to incorporate graceful error handling.":::

## Security requirements for OpenAPI spec URL

Copilot extensions that use OpenAPI specs must ensure the following security standards:

* All API calls must use HTTPS with TLS 1.2 or higher.
* API calls mustn't lead to any URL redirection. Actual API calls must be served from the same domain or subdomain as the root domain verified for the developer.

## See also

* [Extend bot-based message extension as plugin](build-bot-based-plugin.md)
* [Extend Microsoft Copilot for Microsoft 365](/microsoft-365-copilot/extensibility/)
