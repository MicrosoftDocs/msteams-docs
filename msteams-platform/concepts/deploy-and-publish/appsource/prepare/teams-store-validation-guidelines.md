---
title: Teams Store Validation Guidelines
description: Learn to increase the chances of your app passing the Teams Store submission process. Understand the must-fix and good-to-fix validation guidelines.
author: heath-hamilton
ms.author: surbhigupta
ms.topic: reference
ms.localizationpriority: high
ms.date: 02/25/2025
---

# Teams Store Validation Guidelines

Following these guidelines increases the chances of your app passing the Microsoft Teams Store submission process. The Teams-specific guidelines complement the Microsoft [commercial marketplace certification policies](/legal/marketplace/certification-policies#1140-teams) and are updated frequently to reflect new capabilities, user feedback, and business rule changes.

> [!NOTE]
>
> - Some guidelines may not be applicable to your app. For example, if your app doesn't include a bot, you can ignore bot-related guidelines.
> - We've cross-referenced these guidelines to the Microsoft commercial certification policies and added do’s and don’ts with examples from pass or fail scenarios encountered in our validation process.
> - Certain guidelines are marked as *Must fix*. If your app submission doesn't meet these mandatory guidelines, you'll receive a failure report with steps to mitigate the issues. Your app submission will pass Teams Store validation only after you've fixed the issues.
> - Other guidelines are marked as *Good-to-fix*. For an ideal user experience, we recommend that you fix the issues. However, your app submission isn't blocked from publishing on the Teams Store if you choose not to fix these issues.

:::row:::
   :::column:::
      :::image type="icon" source="../../../../assets/icons/ai-apps.png" link="#apps-powered-by-artificial-intelligence" border="false":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/value-proposition.png" link="#value-proposition" border="false":::
   :::column-end:::
   :::column span="":::
     :::image type="icon" source="../../../../assets/icons/security.png" link="#security" border="false":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/function.png" link="#general-functionality-and-performance" border="false":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/package.png" link="#app-package-and-teams-store-listing" border="false":::
   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/saas-offer.PNG" link="#apps-linked-to-saas-offer" border="false":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/tab.png" link="#tabs" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="../../../../assets/icons/bot.png" link="#bots-1" border="false":::
   :::column-end:::
   :::column span="":::
     :::image type="icon" source="../../../../assets/icons/messaging-extension.png" link="#message-extensions" border="false":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/task-module.png" link="#dialogs" border="false":::
   :::column-end:::
:::row-end:::

:::row:::
     :::column span="":::
      :::image type="icon" source="../../../../assets/icons/meeting.png" link="#meeting-extensions" border="false":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/notifications.png" link="#notifications" border="false":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/ms-graph-connectors.png" link="#microsoft-graph-connector" border="false":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/microsoft-365.png" link="#microsoft-365-app-compliance-program" border="false":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/advertising.png" link="#advertising" border="false":::
   :::column-end:::
:::row-end:::
:::row:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/crypto-currency-based-apps-icon.png" link="#cryptocurrency-based-apps" border="false":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/app-functionality-icon.png" link="#app-functionality" border="false":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/mobile-experience-icon.png" link="#mobile-experience" border="false":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/white-bg.png" border="false":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/white-bg.png" border="false":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/white-bg.png" border="false":::
   :::column-end:::
:::row-end:::

## Value Proposition

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: This section is in line with [Microsoft commercial certification policy number 1140.1](/legal/marketplace/certification-policies#11401-value-proposition-and-offer-requirements) and provides more guidance to developers of Microsoft Teams apps on their offer’s value proposition.

Apps must provide value to the users by enabling them to complete functional workflows that encourage repeated use. Expand the following sections to know more about the value proposition:

<details><summary>Tabs</summary>

Tabs must provide value beyond hosting an existing website. [*Must fix*]

:::image type="content" source="../../../../assets/images/submission/validation-usability-app-provides-workflows.png" alt-text="Graphic shows an example of an app with a workflow valuable to channel members within a team.":::

:::image type="content" source="../../../../assets/images/submission/validation-usability-website-i-framed.png" alt-text="Graphic shows an example of an app with entire website in an I-frame without any back option.":::

</details>

<details><summary>Notification Bots</summary>

A notification provides value in Teams if:

1. Posted card or text provides adequate details requiring no further user action.
2. Posted card or text provides adequate preview information for a user to take action or decide to view further details in a link opening outside Teams.

Apps that provide only notifications with content such as, **You have a new notification** or **click to view**, and require the user to navigate outside Teams for everything else don't provide significant value within Teams.

:::image type="content" source="../../../../assets/images/submission/validation-bot-notification-only-inadequete-info.png" alt-text="Screenshot shows an example of a notification-only bot with inadequate information in the preview.":::

</details>

<details><summary>Message Extensions</summary>

[*Must fix*]

Apps that consist of search-based message extensions provide user value by sharing cards that allow for contextual conversations without context switching.

To pass validation for a search-based message extension-only app, the following are required as a baseline to ensure that the user experience isn't broken. A card shared via a message extension provides value in Teams if:

1. Posted card provides adequate details requiring no further user action.
2. Posted card provides adequate preview information for a user to take action or decide to view further details in a link opening outside Teams.

    :::image type="content" source="../../../../assets/images/submission/validation-search-based-messaging-ext-adequete-info.png" alt-text="validation-search-base-messaging-ext-adequete-info":::

    :::image type="content" source="../../../../assets/images/submission/validation-search-based-messaging-ext-inadequete-info.png" alt-text="validation-search-base-messaging-ext-inadequete-info":::

</details>

<details><summary>Link Unfurling</summary>

Link unfurling-only apps don't provide significant value within Teams. Consider building more workflows in your app, if your app only supports link unfurling and has no other functionality.

</details>

[Back to top](#teams-store-validation-guidelines)

### App Name

[*Must fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: This section is in line with Microsoft [commercial certification policy number 1140.1.1](/legal/marketplace/certification-policies#114011-app-name) and provides more guidance to developers on naming their apps.

<details><summary>Expand to know more</summary>

An app's name plays a critical role in how users discover it in the Teams Store. Use the following guidelines to name an app:

- The name must include terms relevant to your users. [*Must fix*]
- Prefix or suffix common nouns with the developer's name. For example, **Contoso Tasks** instead of **Tasks**. [*Must fix*