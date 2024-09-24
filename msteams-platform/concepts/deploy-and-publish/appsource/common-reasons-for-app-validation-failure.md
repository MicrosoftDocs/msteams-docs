---
title: Reasons for App Validation Failure
description: Learn about inadequate app description, improper screenshots, Partner Center and app manifest mismatch, valid domains violation, or broken app functionality.
ms.topic: overview
author: v-ypalikila
ms.author: v-ypalikila
ms.localizationpriority: high
ms.date: 12/15/2022
---

# Common reasons for app validation failure

Most apps don't pass Microsoft Teams Store submission process due to issues during app development. The most common issues or reasons are addressed in this article to help you prepare your app better before [submitting for review](/office/dev/store/add-in-submission-guide?toc=/microsoftteams/platform/toc.json&bc=/microsoftteams/platform/breadcrumb/toc.json). To increase the likelihood of your app passing Teams Store submission process, avoid the common failure scenarios and follow the [Microsoft Teams Store validation guidelines](prepare/teams-store-validation-guidelines.md) and [Commercial Marketplace Certification policies](/legal/marketplace/certification-policies).

The following are the most common reasons for your app to get rejected:

:::row:::
   :::column:::
   :::column span="":::
     :::image type="icon" source="../../../assets/icons/app-description-icon.png" link="#inadequate-app-description":::
   :::column-end:::
   :::column span="":::
     :::image type="icon" source="../../../assets/icons/screenshot-icon.png" link="#improper-screenshots":::
   :::column-end:::
   :::column span="":::
     :::image type="icon" source="../../../assets/icons/mismatch-pc-app-manifest-icon.png" link="#mismatch-between-partner-center-and-app-manifest":::
   :::column-end:::
:::row-end:::

:::row:::
   :::column:::
   :::column span="":::
     :::image type="icon" source="../../../assets/icons/domain-icon.png" link="#valid-domains-guidelines-violation":::
   :::column-end:::
   :::column span="":::
     :::image type="icon" source="../../../assets/icons/testability-icon.png" link="#missing-or-incomplete-test-instructions":::
   :::column-end:::
   :::column span="":::
     :::image type="icon" source="../../../assets/icons/non-functional-bot-icon.png" link="#non-functional-or-partially-functional-bots":::
   :::column-end:::
:::row-end:::

:::row:::
   :::column:::
   :::column span="":::
     :::image type="icon" source="../../../assets/icons/app-functionality-icon.png" link="#broken-app-functionality":::
   :::column-end:::
   :::column span="":::
     :::image type="icon" source="../../../assets/icons/mobile-icon.png" link="#suboptimal-mobile-experience":::
   :::column-end:::
   :::column span="":::
     :::image type="icon" source="../../../assets/icons/ai-generated-content-icon.png" link="#apps-using-ai-generated-content-with-no-safeguards":::
   :::column-end:::
:::row-end:::

## Inadequate app description

A great app description highlights your app's benefits and encourages customers to download it. The following table contains common mistakes in app descriptions that prevent apps from passing Teams Store submission process:

| &nbsp; | Avoid the following |
| --- | --- |
|:::image type="icon" source="../../../assets/icons/caution-red.png" border="false":::| App manifest (previously called Teams app manifest) and AppSource full description don't contain hyperlinks for call-to-action buttons, such as **Sign Up**, **Get Started**, **Help**, or **Contact Us**. |
|:::image type="icon" source="../../../assets/icons/caution-red.png" border="false":::| App manifest and long description don't mention any limitations or dependencies on external accounts or services required to complete sign-in, sign-out, and sign-up experiences. |
|:::image type="icon" source="../../../assets/icons/caution-red.png" border="false":::| Contains abbreviated, shortened, or deprecated forms of standard Microsoft product names. For example, abbreviating **Microsoft** as **MS** or **MSFT**, referencing the first instance of Microsoft Teams as **Teams** instead of **Microsoft Teams**, or using **O365** instead of **Microsoft 365**.<br><br> When referring to Microsoft trademarks, products, and services, you must follow [Microsoft Trademark and Brand Guidelines](https://www.microsoft.com/legal/intellectualproperty/trademarks). |
|:::image type="icon" source="../../../assets/icons/caution-red.png" border="false":::| Highlight of the app’s value proposition and key features in the short and full descriptions in app manifest is absent. |
|:::image type="icon" source="../../../assets/icons/caution-red.png" border="false":::| Contains typographical errors, grammatical errors, unnecessary capitalization, code, or duplicate content. |
|:::image type="icon" source="../../../assets/icons/caution-red.png" border="false":::| Reference to products that the app supports like Teams, Outlook, and Microsoft 365 is absent. |
|:::image type="icon" source="../../../assets/icons/caution-red.png" border="false":::| Contains comparative marketing content or competing offers in the app description or other metadata. |
|:::image type="icon" source="../../../assets/icons/caution-red.png" border="false":::| Contains exaggerated claims about the app such as **#1**, **amazing**, or the **best**. |

For more information, see [Teams Store validation guidelines for app description](prepare/teams-store-validation-guidelines.md#app-descriptions).

## Improper screenshots

Screenshots provide a visually engaging way to portray your app's purpose and capabilities to potential customers. The following table contains common mistakes in screenshots that prevent apps from passing Teams Store submission process:

| &nbsp; | Avoid the following |
| --- | --- |
|:::image type="icon" source="../../../assets/icons/caution-red.png" border="false":::| Contains fewer than three screenshots depicting the app's functionalities. |
|:::image type="icon" source="../../../assets/icons/caution-red.png" border="false":::| Screenshots of the app's functionality in Teams web, desktop, and mobile clients, if supported, are absent. |
|:::image type="icon" source="../../../assets/icons/caution-red.png" border="false":::| Captions to help users clearly understand the app's features are absent. |
|:::image type="icon" source="../../../assets/icons/caution-red.png" border="false":::| Screenshots to showcase the app in the context of a Teams tab, if the app supports tabs, are absent. |

For more information, see [Teams Store validation guidelines for screenshots](prepare/teams-store-validation-guidelines.md#screenshots).

## Mismatch between Partner Center and app manifest

If the following fields in the Partner Center and app manifest don't match, your app might not pass Teams Store submission:

* App description
* Developer name
* Terms of Use
* Privacy Policy URLs
* App icons (color.png and outline.png)
* App name

For more information, see [Teams Store validation guidelines for app manifest](prepare/teams-store-validation-guidelines.md#app-manifest).

## Valid domains guidelines violation

Your app submission must adhere to the guidelines for [external domains](/legal/marketplace/certification-policies#114033-external-domains) under Microsoft’s Commercial Marketplace Certification Policy. For your app to pass review, ensure that the domains listed under the `validDomains` and `messageHandlers` arrays in app manifest are under your organization's direct control and don't include test or non-production domains.

For more information, see [Teams Store validation guidelines for external domains](prepare/teams-store-validation-guidelines.md#external-domains).

## Missing or incomplete test instructions

Detailed test instructions and credentials help you with a successful review of your app. The following table contains common mistakes with test instructions and test accounts that prevent apps from passing Teams Store submission process:

| &nbsp; | Avoid the following |
| --- | --- |
|:::image type="icon" source="../../../assets/icons/caution-red.png" border="false":::| Description of the functionalities of the current version of the app and the necessary configuration steps for testers to follow and test the app is missing. |
|:::image type="icon" source="../../../assets/icons/caution-red.png" border="false":::| Test accounts provided are inaccessible to testers. For example, test accounts that require multifactor authentication to sign in. |
|:::image type="icon" source="../../../assets/icons/caution-red.png" border="false":::| Test accounts provided don't support custom app upload. |
|:::image type="icon" source="../../../assets/icons/caution-red.png" border="false":::| Multiple test accounts aren't included when the app supports collaborative scopes like teams, group chats, or meetings. |

For more information, see [Teams Store validation guidelines for app package and Teams Store listing](prepare/teams-store-validation-guidelines.md#app-package-and-teams-store-listing).

## Non-functional or partially functional bots

Follow the guidelines described in [Designing your Microsoft Teams bot](../../../bots/design/bots.md) while developing your bot app. Enable the bot to inform new users of your app's value adds and prerequisites to use the app. Plan and develop your bot to avoid dead ends even when the input from the user is irrelevant. The following table contains common mistakes with bots that prevent apps from passing Teams Store submission process:

| &nbsp; | Avoid the following |
| --- | --- |
|:::image type="icon" source="../../../assets/icons/caution-red.png" border="false":::| Bot doesn't provide valid responses to the supported commands. |
|:::image type="icon" source="../../../assets/icons/caution-red.png" border="false":::| Commands that your bot supports don't work correctly, including generic commands such as **Hi**, **Hello**, and **Help**. |
|:::image type="icon" source="../../../assets/icons/caution-red.png" border="false":::| Bot doesn't consistently offer a valid response to users. |
|:::image type="icon" source="../../../assets/icons/caution-red.png" border="false":::| Bot doesn't send a proactive welcome message as soon as the user installs the app and runs it for the first time. |

For more information, see [Teams Store validation guidelines for bots](prepare/teams-store-validation-guidelines.md#bots-1).

## Broken app functionality

Test your app to verify its correctness, functionality, and usage. Ensure that you thoroughly test your app and fix all the bugs. Check all the end-to-end workflows that your app supports and test the app compatibility on the operating systems and browsers as per the Commercial Marketplace Certification policies. The following table contains common mistakes with app functionality that prevent apps from passing Teams Store submission process:

| &nbsp; | Avoid the following |
| --- | --- |
|:::image type="icon" source="../../../assets/icons/caution-red.png" border="false":::| App provides a broken experience to users in any of the workflows that it supports, such as broken links and app crashes. |
|:::image type="icon" source="../../../assets/icons/caution-red.png" border="false":::| Functional bugs that prevent further app usage. |
|:::image type="icon" source="../../../assets/icons/caution-red.png" border="false":::| Continuous loading of app surfaces that prevent completion of stated workflows that the app supports. |
|:::image type="icon" source="../../../assets/icons/caution-red.png" border="false":::| Unexpected error messages during app usage where the app's feature doesn't work as expected. |
|:::image type="icon" source="../../../assets/icons/caution-red.png" border="false":::| Have workflows where the user hits a dead end and can't navigate further in the app. |
|:::image type="icon" source="../../../assets/icons/caution-red.png" border="false":::| Teams app extended to Outlook and Microsoft 365 doesn't provide value to the user in Outlook or Microsoft 365. |
|:::image type="icon" source="../../../assets/icons/caution-red.png" border="false":::| App redirects users away from Teams and doesn't provide necessary disclaimers about navigation outside Teams through links and buttons. |

For more information, see [Teams Store validation guidelines for general functionality and performance](prepare/teams-store-validation-guidelines.md#general-functionality-and-performance).

## Suboptimal mobile experience

Your app's experience must be consistent across Teams web, desktop, and mobile clients. Hide workflows that your app doesn't support by identifying the platform and the relevant issue. The following table contains common mistakes in mobile experience that prevent apps from passing Teams Store submission process:

| &nbsp; | Avoid the following |
| --- | --- |
|:::image type="icon" source="../../../assets/icons/caution-red.png" border="false":::| Consumable and unbroken experience on the app's mobile version is absent. |
|:::image type="icon" source="../../../assets/icons/caution-red.png" border="false":::| Graceful failure if the app isn't supporting a particular workflow is missing. |
|:::image type="icon" source="../../../assets/icons/caution-red.png" border="false":::| Data truncation or overlapping within the app. |
|:::image type="icon" source="../../../assets/icons/caution-red.png" border="false":::| Contains less than optimal user experience features like horizontal scroll. |

For more information, see [Teams Store validation guidelines for mobile experience](prepare/teams-store-validation-guidelines.md#mobile-experience).

## Apps using AI-generated content with no safeguards

If your app uses AI-generated content, ensure that it meets the requirements for [Apps with AI-generated content](/legal/marketplace/certification-policies#1-apps-with-artificial-intelligenceai-generated-content-must-meet-below-requirements) as per Microsoft commercial marketplace certification policies. The following table contains common mistakes with AI-generated content that prevent apps from passing Teams Store submission process:

| &nbsp; | Avoid the following |
| --- | --- |
|:::image type="icon" source="../../../assets/icons/caution-red.png" border="false":::| An in-context indication that the app’s content is AI-generated is absent. |
|:::image type="icon" source="../../../assets/icons/caution-red.png" border="false":::| Users are unable to report objectionable content generated by the AI in the app. |
|:::image type="icon" source="../../../assets/icons/caution-red.png" border="false":::| Moderation of the AI-generated content to provide a safe workplace environment for users is absent. |

For more information, see [Teams Store validation guidelines for apps with AI-generated content](prepare/teams-store-validation-guidelines.md#apps-with-ai-generated-content).

## See also

* [Distribute your Microsoft Teams app](../apps-publish-overview.md)
* [Publish your app to the Microsoft Teams Store](publish.md)
* [Microsoft Teams Store validation guidelines](prepare/teams-store-validation-guidelines.md)
* [Microsoft Trademark and Brand Guidelines](https://www.microsoft.com/legal/intellectualproperty/trademarks)
* [Validate your app in Developer Portal for Teams](../../build-and-test/manage-your-apps-in-developer-portal.md#publish)
