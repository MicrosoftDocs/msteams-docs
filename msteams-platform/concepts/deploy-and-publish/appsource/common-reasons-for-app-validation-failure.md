---
title: Common reasons for app validation failure
description: Learn the most common reasons for app validation failure such as broken links, unexpected errors, crashes, valid domain guidelines violation, functional bugs.
ms.topic: overview
author: v-ypalikila
ms.author: v-ypalikila
ms.localizationpriority: high
ms.date: 12/15/2022
---
# Common reasons for app validation failure

Most apps don't pass Microsoft Teams Store submission process due to issues during app development. The most common issues or reasons are addressed in this article to help you prepare your app better before [submitting for review](/office/dev/store/add-in-submission-guide?toc=/microsoftteams/platform/toc.json&bc=/microsoftteams/platform/breadcrumb/toc.json). Avoid the common failures scenarios and follow the [Microsoft Teams Store validation guidelines](prepare/teams-store-validation-guidelines.md) and [Commercial Marketplace Certification policies](/legal/marketplace/certification-policies) to increase the likelihood of your app to pass the Teams Store submission process.

The following are the most common reasons for your app to get rejected:

:::row:::
   :::column:::
     :::image type="icon" source="../../../assets/icons/app-description-icon.png" link="#error-in-the-app-description":::
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
      :::image type="icon" source="../../../assets/icons/app-functionality-icon.png" link="#broken-app-functionality":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../assets/icons/mobile-icon.png" link="#suboptimal-mobile-experience":::
   :::column-end:::
   :::column span="":::
     :::image type="icon" source="../../../assets/icons/ai-generated-content-icon.png" link="#apps-using-ai-generated-content-with-no-safeguards":::
   :::column-end:::
:::row-end:::

## Error in the app description

A great description makes your app stand out in the Teams Store and encourage customers to download it. Avoid the following mistakes in your app description:

* Hyperlinks for call-to-action buttons such as **Sign Up**, **Get Started**, **Help**, or **Contact Us** in the app manifest (previously called Teams app manifest) and AppSource full description are not present.

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-pass-sign-up-app-description.png" alt-text="Screenshot of passed scenario of sign-up, contact details in app description must be hyperlinked.":::

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-sign-up-app-description.png" alt-text="Screenshot of failed scenario of sign-up, contact details in app description must be hyperlinked.":::

* Call out to the limitations or dependencies on external accounts or services to complete sign-in, sign-out, and sign-up experiences in the app manifest and long description is not present.

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-passed-limitation-called-out.png" alt-text="Screenshot of passed image to show the called out limitations.":::

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-failed-limitation-called-out.png" alt-text="Screenshot of failed image to show the called out limitations.":::

* Contains abbreviated, shortened, or deprecated forms of standard Microsoft product names. For example, abbreviating **Microsoft** as **MS** or **MSFT**, referencing the first instance of Microsoft Teams as **Teams** instead of **Microsoft Teams**, or using **O365** instead of **Microsoft 365**.

  Microsoft’s brand assets including logos, icons, designs, trade dress, fonts, product names, services, sounds, emojis, and any other brand features and elements—whether registered or unregistered—are proprietary assets owned by Microsoft and its group of companies. When referring to Microsoft trademarks, products names, and services, you must follow [Microsoft Trademark and Brand Guidelines](https://www.microsoft.com/legal/intellectualproperty/trademarks).

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-failed-MS-app-description.png" alt-text="Screenshot of failed image of Microsoft or MS in app description.":::

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-failed-first-reference-teams.png" alt-text="Screenshot of image to show the failed reference instance of Microsoft Teams.":::

* Highlight of the app’s value proposition and key features in the short and full descriptions in the app manifest is not present.

* Contains typographical errors, grammatical errors, unnecessary capitalization, code, or duplicate content.

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-pass-grammatical-error.png" alt-text="Screenshot of passed image for long description, grammatical errors and capitalization":::

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-fail-grammatical-error.png" alt-text="Screenshot of failed image for long description, grammatical errors and capitalization":::

* Reference to products that the app supports like Microsoft Teams, Outlook, and Microsoft 365 is not present.

* Contains comparative marketing content or competing offers in the app description or other metadata.

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-failed-comparsion-app-description.png" alt-text="Screenshot of failed image of comparative app description":::

* Contains superlative claims about the app such as **#1**, **amazing**, or the **best**.

[Back to top](#common-reasons-for-app-validation-failure)

## Improper screenshots

Screenshots provide a visually compelling way to portray your app's purpose and capabilities to potential customers. Avoid the following mistakes in your app before you submit for review:

* Contains fewer than three screenshots depicting the app's functionalities.

* Screenshots of the app's functionality in the Teams web, desktop, and mobile clients, if supported, are not present.

* Captions to help users clearly understand the app's features are not present.

* Screenshots to showcase the app in the context of a Teams tab, if the app supports tabs, are not present.

[Back to top](#common-reasons-for-app-validation-failure)

## Mismatch between Partner Center and app manifest

If the following fields in the Partner Center and app manifest don't match, your app might not pass the Microsoft Teams Store submission:

* App description

* Developer name

* Terms of Use

* Privacy Policy URLs

* App icons (color.png and outline.png)

* The app's name

[Back to top](#common-reasons-for-app-validation-failure)

## Valid domains guidelines violation

Your app submission must adhere to the [external domains](/legal/marketplace/certification-policies) guidelines under Microsoft’s Commercial Marketplace Certification Policy. For your app to pass review, ensure that the domains listed under the `validDomains` and `messageHandlers` arrays in the app manifest are under your organization's direct control and don't include test or non-production domains.

[Back to top](#common-reasons-for-app-validation-failure)

## Missing or incomplete test instructions

[Detailed test instructions](prepare/teams-store-validation-guidelines.md#app-package-and-teams-store-listing) and credentials help you with a successful review of your app. Avoid the following issues to ensure your app isn't rejected during review:

* Description of the functionalities of the current version of the app and the necessary configuration steps for testers to follow and test the app is missing.

* Test accounts provided are inaccessible to testers. For example, test accounts that require multifactor authentication to sign in.

* Test accounts provided don't support custom app upload.

* Multiple test accounts are not included when the app supports collaborative scopes like teams, group chats, or meetings.

[Back to top](#common-reasons-for-app-validation-failure)

## Non-functional or partially functional bots

Avoid the following mistakes in your bot app before you submit for review:

* Bot doesn't provide valid responses to the supported commands.

* Commands that your bot supports don't work correctly, including generic commands such as *Hi*, *Hello*, and *Help*.

* Bot doesn't consistently offer a valid response to users. Plan and develop your bot to avoid dead ends even when the input from the user is irrelevant.

* Bot doesn't send a proactive welcome message as soon as the user installs the app. You must enable the bot to send a proactive message that includes:
  * A value proposition on how the app adds value to the users.
  * Instructions on how to meet the account dependencies and prerequisites to use the app, if applicable.

[Back to top](#common-reasons-for-app-validation-failure)

## Broken app functionality

Test your app to verify your app’s correctness, functionality, and usage. Ensure that you test your app thoroughly and fix all the bugs. Check all the end-to-end workflows that your app supports and test the app compatibility on the operating systems and browsers as per the [Commercial Marketplace Certification policy](/legal/marketplace/certification-policies). You must avoid the following mistakes in your app before you submit for review:

* App provides a broken experience to users in any of the workflows that it supports, including:

  * Broken links in the app.

  * Functional bugs that prevent further app usage.

       :::image type="content" source="../../../assets/images/submission/validation-common-reasons-functional-bugs-fail-block-app-usage.png" alt-text="Screenshot of failed functional bug for block app usage.":::

  * App crashes.

       :::image type="content" source="../../../assets/images/submission/validation-common-reason-failed-app-crashes.png" alt-text="Screenshot of failed scenario of app crashes while testing.":::

  * Continuous loading of app surfaces that prevent completion of stated workflows that the app supports.

       :::image type="content" source="../../../assets/images/submission/validation-common-reason-fail-continuous-app.png" alt-text="Screenshot of image for failed loading of app surfaces.":::

  * Unexpected error messages during app usage where the app's feature doesn't work as expected.

       :::image type="content" source="../../../assets/images/submission/validation-common-reasons-unexpected-error-app-usage.png" alt-text="Screenshot to show the unexpected error message during app usage.":::

* Have workflows where the user hits a dead end and can't navigate further in the app. Provide the necessary way forward messages to users like **Sign-up** or **Sign-in**.

* Teams app extended to Outlook and Microsoft 365 doesn't provide value to the user in Outlook or Microsoft 365.

* App redirects users away from Teams and doesn't provide necessary disclaimers about navigation outside Teams through links and buttons.

[Back to top](#common-reasons-for-app-validation-failure)

## Suboptimal mobile experience

Your app's experience must be consistent across the web, desktop, and mobile clients. Avoid the following mistakes while designing the user experience for your app's mobile version before you submit for review:

* Consumable and unbroken experience on the app's mobile version is not present.

* Graceful failure if the app isn't supporting a particular workflow is missing. Hide such workflows by identifying the platform and the relevant issue.

* Data truncation or overlapping within the app.

* Contains less than optimal user experience features like horizontal scroll.

[Back to top](#common-reasons-for-app-validation-failure)

## Apps using AI-generated content with no safeguards

If your app uses AI-generated content, ensure that it meets the requirements for [Apps with AI generated content](/legal/marketplace/certification-policies#1-apps-with-artificial-intelligenceai-generated-content-must-meet-below-requirements) and [Apps using facial recognition capabilities](/legal/marketplace/certification-policies#2-apps-using-facial-recognition-capabilities-are-subject-to-the-following-policies) as per Microsoft commercial marketplace certification policies. Avoid the following mistakes in your app to ensure it passes the submission process:

* In-context indication that the app's content is AI-generated is not present.

* Users are unable to report objectionable content generated by the AI in the app.

* Moderation of the AI-generated content to provide a safe workplace environment for users is not present.

[Back to top](#common-reasons-for-app-validation-failure)

## See also

* [Distribute your Microsoft Teams app](../apps-publish-overview.md)
* [Publish your app to the Microsoft Teams Store](publish.md)
* [Microsoft Teams Store validation guidelines](prepare/teams-store-validation-guidelines.md)
* [Commercial Marketplace Certification policies](/legal/marketplace/certification-policies)
* [Microsoft Trademark and Brand Guidelines](https://www.microsoft.com/legal/intellectualproperty/trademarks)