---
title: Teams Store Validation Guidelines
description: Learn to increase the chances of your app to pass the Teams Store submission process. Understand the must fix and good-to-fix validation guidelines.
author: heath-hamilton
ms.author: surbhigupta
ms.topic: reference
ms.localizationpriority: high
ms.date: 02/25/2025
---
# Teams Store validation guidelines

Following these guidelines increases the chances that your app passes the Microsoft Teams Store submission process. The Teams-specific guidelines complement the Microsoft [commercial marketplace certification policies](/legal/marketplace/certification-policies#1140-teams) and update frequently to reflect new capabilities, user feedback, and business rule changes.

> [!NOTE]
>
> * Some guidelines may not apply to your app. For example, if your app does not include a bot, you may ignore bot-related guidelines.
> * These guidelines cross-reference Microsoft commercial certification policies and include Do’s and Don’ts with examples from pass or fail scenarios encountered during our validation process.
> * Certain guidelines are marked as *Must fix*. If your app submission does not meet these mandatory guidelines, you receive a failure report with steps to address the issues. Your app submission only passes Teams Store validation after fixing these issues.
> * Other guidelines are marked as *Good-to-fix*. For an ideal user experience, we recommend that you fix these issues. However, your app submission is not blocked from publishing on the Teams Store if you choose not to correct them.

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

## Value proposition

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: This section aligns with [Microsoft commercial certification policy number 1140.1](/legal/marketplace/certification-policies#11401-value-proposition-and-offer-requirements) and provides additional guidance on delivering value through your Microsoft Teams app.

Apps provide clear value by enabling users to complete functional workflows that drive repeated use. Expand the sections to learn more about the value proposition:

<details><summary>Tabs</summary>

Tabs provide value when they deliver more than just a website embedded within Teams. They must enable a workflow that offers continuous value. [*Must fix*]

:::image type="content" source="../../../../assets/images/submission/validation-usability-app-provides-workflows.png" alt-text="Graphic shows an example of an app with a workflow valuable to channel members within a team.":::

:::image type="content" source="../../../../assets/images/submission/validation-usability-website-i-framed.png" alt-text="Graphic shows an example of an app with an entire website in an I-frame without any back option.":::

</details>

<details><summary>Notification bots</summary>

A notification benefits Teams when:

1. The posted card or text offers sufficient details so the user takes no additional action.
1. The posted card or text provides a clear preview that lets the user decide whether to act or view further details externally.

Apps that send notifications containing messages like **You have a new notification** or **click to view**, which force the user to exit Teams for more information, are not considered valuable.

:::image type="content" source="../../../../assets/images/submission/validation-bot-notification-only-inadequete-info.png" alt-text="Screenshot shows an example of a notification with inadequate information in the preview.":::

</details>

<details><summary>Message extensions</summary>

[*Must fix*]

Search-based message extensions add value by sharing cards that enable contextual conversation without context switching.

To pass validation for a search-based message extension app, ensure that:

1. The posted card contains sufficient details so that the user can act without further steps.
1. The posted card provides an adequate preview that informs users whether to click a link for more details.

    :::image type="content" source="../../../../assets/images/submission/validation-search-based-messaging-ext-adequete-info.png" alt-text="validation-search-base-messaging-ext-adequete-info":::

    :::image type="content" source="../../../../assets/images/submission/validation-search-based-messaging-ext-inadequete-info.png" alt-text="validation-search-base-messaging-ext-inadequete-info":::

</details>

<details><summary>Link unfurling</summary>

Apps that only support link unfurling are limited in value within Teams. Enhance your solution by building more comprehensive workflows if your app supports only link unfurling.

</details>

[Back to top](#teams-store-validation-guidelines)

### App Name

[*Must fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: This section aligns with Microsoft [commercial certification policy number 1140.1.1](/legal/marketplace/certification-policies#114011-app-name) and offers detailed guidance on naming your app.

An app’s name plays a critical role in how users discover it in the Teams Store. Use these guidelines when naming your app:

* Include terms relevant to your target users. [*Must fix*]
* Add your developer name as a prefix or suffix to clarify ownership. For example, use **Contoso Tasks** instead of just **Tasks**. [*Must fix*]
* Do not use **Teams** or names of other Microsoft products like Excel, PowerPoint, Word, OneDrive, SharePoint, OneNote, Azure, Surface, or Xbox. Such references may falsely imply co-branding or co-selling. For more on referencing Microsoft products, review the [Microsoft Trademark and Brand Guidelines](https://www.microsoft.com/legal/intellectualproperty/trademarks/usage/general). [*Must fix*]
* Avoid copying the name of an app already listed in the Teams Store or another commercial marketplace offer. [*Must fix*]
* Exclude profane, derogatory, racially, or culturally insensitive terms. [*Must fix*]
* Ensure uniqueness. If you list a region-specific variant of your app (such as Contoso Mexico), then:
  * Clearly reference the region-specific functionality in the title, metadata, first-run app experience, and help sections. The title must differentiate the new app from your existing listing. [*Must fix*]
  * When uploading the app package in Partner Center, select the appropriate **Markets** in the **Availability** section. [*Must fix*]
* Do not start the app name with a core Teams feature such as Chat, Contacts, Calendar, Calls, Files, Activity, Teams, or Help. The name must avoid abbreviating these terms in Teams' navigation. [*Must fix*]
* When in official partnership with Microsoft, place your app name first. For example, **Contoso connector for Microsoft Teams**.
* Do not reference Microsoft or Microsoft products unless your app holds an official partnership with Microsoft. If it does, your app name appears first, followed by any Microsoft reference. [*Must fix*]
* Do not use parentheses in the name to include mentions of Microsoft products. [*Must fix*]
* The developer name must match across the app manifest and AppSource listing. [*Must fix*]
* Use production manifests for submission. Your app name must not indicate that the app is in a preproduction state (avoid Beta, Dev, Preview, UAT, etc.). [*Must fix*]
* The app name in the manifest must exactly match the name on AppSource. [*Must fix*]

 > [!TIP]
 > Your app’s branding—including name, developer name, app icon, screenshots, video, short description, and website—must not impersonate an official Microsoft offering unless the app is an official Microsoft 1P offering.

### Duplicate App

* Apps from the same developer that offer the same functionality must share a single app listing unless privacy compliance or government cloud requirements specify separate listings. Build your business logic to support a single listing. [*Must fix*]

  * To support multiple regions, implement the logic within one listing.

    :::image type="content" source="../../../../assets/images/submission/validation-guidelines-pass-region-app-manifest.png" alt-text="Screenshot shows the passed scenario of region requirement done with logic.":::

  * For on-premises and on-cloud deployment requiring multiple endpoints, implement the logic within one listing.

### Suitable for workplace consumption

[*Must fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: This section follows Microsoft commercial certification policy numbers [1140.1.2](/legal/marketplace/certification-policies#114012-workplace-appropriateness), [100.8](/legal/marketplace/certification-policies#1008-significant-value), and [100.10](/legal/marketplace/certification-policies#10010-inappropriate-content) and guides developers on creating workplace-appropriate apps.

Apps must feature content that suits a professional workplace environment and follow marketplace certification policies. Apps must exclude content related to religion, politics, gambling, and prolonged entertainment. [*Must fix*]

Your app must facilitate group collaboration or boost individual productivity. Apps geared toward team bonding or socializing must support collaboration, involve multiple participants, and not require sessions longer than 60 minutes or disrupt productivity. [*Must fix*]

Content aggregator apps require a mechanism for users to report issues or inappropriate content to the publisher. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-guidelines-content-aggregator-app.png" alt-text="Screenshot shows the passed scenario of content aggregator app with a mechanism to report issues.":::

</details>

### Similar platforms and services

[*Must fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: This section aligns with [Microsoft commercial certification policy number 1140.1.3](/legal/marketplace/certification-policies#114013-other-platforms-and-services).

Apps need to focus on the Teams experience and avoid including the names, icons, or imagery of other chat-based collaboration platforms or services in the app or its metadata unless the app explicitly provides interoperability.

### Feature names

Feature names displayed on buttons and within the UI must avoid using reserved terms related to Teams or other Microsoft products. For instance, avoid using **Start meeting**, **Make call**, or **Start chat**. If necessary, include your app name to clarify, such as **Start Contoso meeting**.

### Authentication

[*Must fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: This section links to [Microsoft commercial certification policy number 1140.1.4](/legal/marketplace/certification-policies#114014-access-to-services) and offers guidance on how to authenticate your app with external services.

Review [authentication in Teams](~/concepts/authentication/authentication.md) for detailed instructions.

<details><summary>Expand to know more</summary>

#### Authenticating with external services

If your app authenticates users using an external service, follow these guidelines:

* **Sign in, sign out, and sign up experiences**:
  * Apps that depend on external accounts must offer clear and simple sign in, sign out, and sign up experiences. [*Must fix*]
  * When users sign out, they sign out only from the app while remaining signed in to Teams. [*Must fix*]
  * Provide a way for new users to sign up or contact you to learn more about the external services; include guidance in the app’s manifest, AppSource long description, and first-run experience (bot welcome message, tab setup, or configuration page). [*Must fix*]
  * When an admin must complete a one-time setup, explicitly state the dependency on admin configuration in your app’s manifest, AppSource long description, and first-run experiences. [*Must fix*]
  
* **Content sharing experiences**: If your app requires authentication for sharing content in Teams channels, clearly document how users can disconnect or unshare content if that feature exists on the external service. The functionality to unshare content does not need to be present in your Teams app.

</details>

### Audio

* If your app primarily focuses on music playback, it must include at least one collaborative feature—such as playlist sharing, configuring or pinning a playlist, or synchronously listening to music—to deliver a streamlined experience. [*Must fix*]
* Apps designed solely to let users listen to music in Teams are encouraged to offer a collaborative co-listening experience. [*Good-to-fix*]

## Security

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: This section follows [Microsoft commercial certification policy number 1140.3](/legal/marketplace/certification-policies#11403-security).

[Back to top](#teams-store-validation-guidelines)

### Financial information

[*Must fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: This section adheres to [Microsoft commercial certification policy number 1140.3.1](/legal/marketplace/certification-policies#114031-financial-transactions) and outlines guidelines on transmitting financial information within Teams and restrictions on payment scenarios in the mobile versions of Teams apps.

<details><summary>Expand to know more</summary>

Apps must not prompt users for payments within the Teams interface or transmit financial information via bots. [*Must fix*]

:::image type="content" source="../../../../assets/images/submission/validation-financial-information-1.png" alt-text="validation-financial-info":::

You may provide links to secure external payment services if you disclose these links in your terms of use, privacy policy, profile, or website before users agree to use your app. [*Must fix*]

Avoid facilitating payments through an app for goods or services that violate [General policy number 100.10 Inappropriate content](/legal/marketplace/certification-policies#10010-inappropriate-content). [*Must fix*]

Apps running on iOS or Android Teams must observe these guidelines:

* Do not include in-app purchases, trial offers, or UI elements that upsell users to paid versions or direct them to online stores for other content, apps, or add-ins. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-financial-information-in-app-purchase.png" alt-text="validation-financial-info-in-app-purchase":::

    :::image type="content" source="../../../../assets/images/submission/validation-financial-information-online-stores.png" alt-text="validation-online-store":::

* If your app requires an account, users must be able to sign up without charge. Refrain from using terms like **free** or **free account**. [*Must fix*]
* You determine whether an account remains active indefinitely or for a limited time. Once an account expires, the app must not indicate that payment is now required. [*Must fix*]
* Your app’s privacy policy and terms of use must not display commerce-related UI or links. [*Must fix*]

</details>

### Bots

[*Must fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: This section follows [Microsoft commercial marketplace policy number 1140.3.2](/legal/marketplace/certification-policies#114032-bots-and-messaging-extension).

<details><summary>Expand to know more</summary>

For apps using Microsoft Azure Bot Service (including bots and message extensions), adhere to the requirements in the Microsoft [Online Services Terms](https://www.microsoftvolumelicensing.com/DocumentSearch.aspx?Mode=3&DocumentTypeId=46).

Bots always request permission before uploading a file and display a confirmation message.

:::image type="content" source="../../../../assets/images/submission/validation-bot-confirmation-message.png" alt-text="validation-bot-confirmation":::

</details>

### External domains

[*Must fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: This section aligns with [Microsoft commercial marketplace policy number 1140.3.3](/legal/marketplace/certification-policies#114033-external-domains) and advises on configuring restricted domains in the `validDomains` property of the app manifest.

<details><summary>Expand to know more</summary>

Include only domains under your organization’s control (wildcards and tunneling services are disallowed). Exceptions to note:

* For SharePoint-reliant apps, include the associated root SharePoint site as a valid domain using the `{teamSiteDomain}` context property. [*Must fix*]
* Do not use top-level domains such as **.com**, **.in**, or **.org** as a valid domain. [*Must fix*]
* Do not declare **.onmicrosoft.com** as valid unless it is under your control. You may use **yoursite.com** even with a wildcard if you control the domain. [*Must fix*]
* For PowerApps built on the Microsoft Power Platform, include *apps.powerapps.com* as a valid domain.
* Do not declare external domain links containing URLs (such as www or https). [*Must fix*]
* For Azure Bot Service’s OAuthCard, include *token.botframework.com* as valid; do not declare *.botframework.com* since wildcards are not permitted. [*Must fix*]
* OpenAPI URLs must reside under partner control.
* The following external domain declarations are not allowed: [*Must fix*]
  * *.azurewebsites.net
  * *.azureedge.com
  * *.microsoft.com
  * *.microsoftonline.com
  * *.onmicrosoft.com
  * go.microsoft.com
  * teams.microsoft.com

When employing wildcards (`*`), ensure:

* A wildcard segment stands as the only character in that subdomain segment.
* Each segment preceding a wildcard segment is also a wildcard segment.

For example, *\*.\*.domain.com* is acceptable, while *foo.\*.myteam.domain.com* is not.

</details>

### Sensitive content

[*Must fix*]

Your app does not post sensitive data—such as credit card information, financial details, health records, contact tracing, or other PII—inappropriately to unintended recipients.

The app warns users before downloading any files or executables (.exe) into their environment.

## General functionality and performance

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: This section corresponds to [Microsoft commercial marketplace policy number 1140.4](/legal/marketplace/certification-policies#11404-functionality).

* Provide clear guidance for both admin and existing users in your UI. Link to sign up, help resources, or contact details.
* While pointing out account dependencies or limitations in your app, ensure you include this information both in the app manifest long description and in the AppSource listing.
* Explicitly mention any dependency on admins for new users. If there is no dependency, include a sign up, contact link, or similar guidance.

[Back to top](#teams-store-validation-guidelines)

### Launching external functionality

[*Must fix*]

Apps do not take users out of Teams for core scenarios. All critical content and interactions occur within Teams components such as bots, Adaptive Cards, tabs, and dialogs (referred to as task modules in TeamsJS v1.x).

> [!NOTE]
> To redirect users from your Teams app to its native experience through deep links using protocols such as `tel:`, `mailto:`, or `webex:`, launch the deep link in a new window with `window.open` or by using an anchor tag with `target="_blank"`.
  
<details><summary>Expand to know more</summary>

* Ensure navigation occurs within the Teams app; if external functionality is required, ask explicitly for user permission before launching the external feature. [*Must fix*]
* Label button UI text that launches external functionality with indications that users are leaving Teams, using phrases like **This way to Contoso.com** or **View in Contoso.com**. [*Must fix*]
* Include a **Pop-out** icon (:::image type="icon" source="../../../../assets/icons/pop-out-icon.png" :::) next to the link to clarify that users navigate outside Teams. [*Must fix*]
* If adding a **Pop-out** icon proves challenging, consider adding an inline note in an Adaptive Card or interstitial dialogs that inform the user they are exiting Teams. [*Must fix*]

</details>

### Compatibility

[*Must fix*]

Apps run fully on the latest versions of:

* Microsoft Windows
* macOS
* Microsoft Edge
* Google Chrome
* iOS
* Android

Ensure your app shows a graceful failure message on unsupported browsers and platforms.

### Response time

[*Must fix*]

Teams apps respond within acceptable time frames or present loading indicators or messages:

* Tabs respond within two seconds or display a loading indicator. [*Must fix*]
* Bots respond to user commands within two seconds or show a typing indicator. [*Must fix*]
* Message extensions respond within two seconds. [*Must fix*]
* Notifications appear within two seconds after user action. [*Must fix*]

### Apps powered by Artificial Intelligence

Access resources designed to help you follow responsible AI practices through tools like the [Microsoft RAI Toolkit](https://www.microsoft.com/en-us/ai/responsible-ai-resources) and projects like the [HAX Toolkit Project](https://www.microsoft.com/en-us/research/project/hax-toolkit/).

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: This section follows [Microsoft commercial marketplace policy for Apps with AI generated content](/legal/marketplace/certification-policies#1-apps-with-artificial-intelligenceai-generated-content-must-meet-below-requirements) and [Microsoft commercial marketplace policy for Apps using facial recognition capabilities](/legal/marketplace/certification-policies#2-apps-using-facial-recognition-capabilities-are-subject-to-the-following-policies).

#### Apps with AI-generated content

* The app does not generate, contain, or allow access to inappropriate, harmful, or offensive AI-generated content in accordance with policy [100.10](/legal/marketplace/certification-policies#10010-inappropriate-content). [*Must fix*]

  * Consider these enhancements:
    * Use the [Teams AI library](~/bots/how-to/teams-conversational-ai/teams-conversation-ai-overview.md) to integrate with GPT-based language models and intent engines. [*Good-to-fix*]
    * Integrate moderation hooks to regulate bot responses via a moderation API. [*Good-to-fix*]
    * Incorporate conversation sweeping capabilities to monitor and intervene in conversations that deviate from expectations. [*Good-to-fix*]

* Provide multiple channels for users to report inappropriate AI content, such as:
  * Listing a mail address or support portal link in the app description.
  * Offering an in-app issue reporting mechanism with reference to the problematic content.

* Act on reported concerns with appropriate urgency. [*Must fix*]
* Clearly outline AI functionality prior to app acquisition and prompt users to review this information within the app. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/teams-ai-library-description-guideline.png" alt-text="Screenshot shows the description for AI functionality.":::

#### Apps using facial recognition capabilities

> [!NOTE]
> Apps in this category may undergo additional review to ensure adherence to Microsoft’s Responsible AI principles.

* Do not allow facial recognition capabilities to identify individuals for police department use. [*Must fix*]
* Apps employing facial recognition or emotional inference technologies must prominently indicate these capabilities in the app description. [*Must fix*]
  * Apps using facial expressions or movements to infer states like anger, happiness, or sadness may face restrictions.
  * Detecting and classifying individual facial elements (e.g., smiles or raised eyebrows) is acceptable.

## App package and Teams Store listing

[*Must fix*]

App packages must follow the correct format and include all required information and components.

> [!TIP]
>
> * Ensure test accounts or test environments remain valid until the app goes live.
> * Provide detailed testing instructions that include:
>
>   * **Steps to configure the app test accounts** if external authentication is required.
>   * A summary of the **expected app behavior** covering core workflows.
>   * A clear description of **limitations**, conditions, or exceptions related to functionality, features, and deliverables.
>   * Highlight any key considerations for testers during validation.
>   * Prepopulate test accounts with dummy data.
>   * If providing test accounts, enable third-party integration.

[Back to top](#teams-store-validation-guidelines)

### App manifest

[*Must fix*]

The app manifest defines your app's configuration.

* Conform the app manifest to a publicly released schema. Consult the [app manifest reference](~/resources/schema/manifest-schema.md). Do not submit your app with a preview version.
* For apps with a bot or message extension, metadata in the manifest must match Bot Framework metadata, including the bot name, logo, privacy policy, and terms of service links.
* If your app uses Microsoft Entra ID for authentication, include the Microsoft Entra Application (client) ID in the manifest. See the [app manifest reference](~/resources/schema/manifest-schema.md#webapplicationinfo) for details.

### Uses of latest app manifest schema

* For Single sign-on (SSO) apps, declare Microsoft Entra ID in the manifest for user authentication. [*Must fix*]
* Use a publicly released app manifest schema. Update your app package to schema version 1.10 or later. [*Must fix*]
* Increase only the app version number when submitting updates. The App ID must remain the same as the published app. [*Must fix*]
* Do not include additional files within the app package. [*Must fix*]
* Ensure the version number in the app manifest and any localized variants match. [*Must fix*]
* Use manifest schema version 1.5 or later to localize your app. Update the `$schema` attribute and `manifestVersion` property accordingly. [*Must fix*]
* Add, update, or remove functionality by increasing the app version number and submitting a new manifest via Partner Center. [*Must fix*]
* Follow the Semantic Versioning Specification (MAJOR.MINOR.PATCH) for the version string. [*Must fix*]
* For apps that require admin review for permissions in the Teams admin center, declare `webapplicationinfo` in the manifest. Omitting this results in the **Permissions** page showing as **...** [*Must fix*]
* Submit a production version of the app manifest. [*Must fix*]
* While optional, declare your Microsoft Cloud Partner Program ID (CCP ID) in the manifest to help identify your organization. [*Good-to-fix*]
* Ensure declared scopes and context in the manifest appear within the app. [*Must fix*]

### App icons

[*Must fix*]

Icons are a key element in the Teams Store experience.
  
<details><summary>Expand to know more</summary>

Your icons should effectively communicate your app's brand and purpose while meeting these requirements:

* The color and outline icons in the listing must match. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/color-outline-icon-same.png" alt-text="Screenshot shows the color icon and outline icon matching.":::

   :::image type="content" source="../../../../assets/images/submission/color-outline-icon-not-same.png" alt-text="Screenshot shows the color icon and outline icon not matching.":::

* Include two .png versions of your app icon in the app package: a color icon and an outline icon. [*Must fix*]
* The marketplace icon in Partner Center must match the color icon in your app package. [*Must fix*]
* The color icon must measure 192x192 pixels. The symbol can use any colors, but it should sit on a solid or transparent square background. [*Must fix*]
* The outline icon appears:
  * When the app is active in the left navigation bar.
  * When a user pins the message extension.
  
  It must measure 32x32 pixels, be either white on a transparent background or transparent with a white background, and have no extra padding. [*Must fix*]
* Include correctly sized and formatted icons that align with the Teams Store listing metadata. [*Must fix*]

Refer to [icon guidelines](~/concepts/build-and-test/apps-package.md#app-icons) for additional details.

</details>

### App descriptions

Your app requires both a short and a long description. These descriptions improve discoverability in the Teams Store and must match between your app configuration and Partner Center.

:::image type="content" source="../../../../assets/images/submission/validation-app-description-adequete-information.png" alt-text="Graphic shows an example of an adequate app description.":::

:::image type="content" source="../../../../assets/images/submission/validation-app-description-inadequete.png" alt-text="Graphic shows an example of an inadequate app description.":::

<details><summary>Expand to know more</summary>

Descriptions must never demean another brand directly or indirectly. Avoid unsubstantiated claims such as “Guaranteed 200 percent increase in efficiency.”

* Do not use comparative marketing information or competitor references, including competitor logos or trademarks, in your offer metadata. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-app-description-comparitive-marketing-fail.png" alt-text="Graphic shows an example of comparative marketing in an app description.":::

* Hyperlink contact details, get started instructions, help, or sign-up information only if necessary. [*Good-to-fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-app-description-contact-deatils-hyperlinked.png" alt-text="Graphic shows an app description with hyperlinked contact details.":::

   :::image type="content" source="../../../../assets/images/submission/validation-app-description-contact-deatils-not-hyperlinked.png" alt-text="Graphic shows an app description with non-hyperlinked contact details.":::

* Clearly identify your intended audience, provide a brief and clear explanation of your app’s unique value, list supported Microsoft products and other software, and detail prerequisites. Clearly describe limitations, conditions, or exceptions to functionality, features, and deliverables in your listing. [*Must fix*]
* When updating your app name, ensure the new name appears consistently in the offer metadata in the manifest and AppSource listing. [*Must fix*]
* Call out any limitations and account dependencies in the manifest App Description, AppSource listing, and Partner Center. Examples include:
  * Enterprise account requirements
  * Paid subscriptions
  * Additional licenses or accounts
  * Language-specific restrictions
  * PSTN dialing
  * Regional restrictions
  * Booking lead times for translators or live agents
  * Role-based functionality
  * Dependencies on a native app

  :::image type="content" source="../../../../assets/images/submission/validation-app-description-limitations-calledout-pass.png" alt-text="Graphic shows successfully called out limitations in an app description.":::
  
  :::image type="content" source="../../../../assets/images/submission/validation-app-description-limitations-not-calledout-fail.png" alt-text="Graphic shows a failure scenario with uncalled out limitations in an app description.":::

* If your app operates in specific regions, include details on such dependencies in your app description, manifest, Partner Center, and AppSource listings.
* The first reference to Teams should use "Microsoft Teams" and subsequent references can use "Teams." [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-app-description-teams-reference-pass.png" alt-text="Graphic shows a correct reference to Teams in an app description.":::

   :::image type="content" source="../../../../assets/images/submission/validation-app-description-teams-reference-fail.png" alt-text="Graphic shows an incorrect reference to Teams in an app description.":::

#### Short description

A short description provides a concise summary highlighting the app's value proposition for your target audience.

**Dos:**

* Limit the short description to one sentence.
* Present the most important information first.
* Include keywords that users search for.
* Use the available character limit efficiently without repeating the app name.

**Don't:**

[*Good-to-fix*]

Avoid using the word **app** in the short description.

#### Long description

The long description engages users by detailing your app’s value proposition, target audience, and industry relevance. Although you may include up to 4,000 characters, keep it concise (around 1,000 characters is recommended).

**Dos:**

* Format your description using [Markdown](https://support.office.com/article/use-markdown-formatting-in-teams-4d10bd65-55e2-4b2d-a1f3-2bebdcd2c772).
* Use active voice and address the user directly (e.g., “You can…”).
* List key benefits with bullet points.
* Clearly communicate your app’s unique value in Teams.
* Use bullet lists to outline features and benefits.
* Explain limitations, features, conditions, or exceptions clearly before the user installs your app.
* Ensure consistency between the app description and the actual functionality of the Teams app. Limit references to features outside Teams.
* Include a help or support link.
* Refer to **Microsoft 365** and not **Office 365**.
* Use language that clearly denotes how your app works with Teams (for example: “... works with Microsoft Teams”, “... within Microsoft Teams”, “... built for Microsoft Teams”, etc.).

**Don'ts:**

[*Must fix*]

* Do not exceed 500 words.
* Avoid abbreviating **Microsoft** as **MS** or **MSFT**.

   :::image type="content" source="../../../../assets/images/submission/validation-app-description-microsoft-abbreviated.png" alt-text="Graphic shows an example of abbreviating Microsoft as MS or MSFT for the first time in an app description.":::

   :::image type="content" source="../../../../assets/images/submission/validation-app-description-microsoft-not-abbreviated.png" alt-text="Graphic shows an example of not abbreviating Microsoft for the first time in an app description.":::

* Do not indicate that the app is an official Microsoft offering, including using Microsoft slogans or taglines.

   :::image type="content" source="../../../../assets/images/submission/validation-app-description-offering-from-microsoft.png" alt-text="Graphic shows incorrect indication of a Microsoft offering in an app description.":::

   :::image type="content" source="../../../../assets/images/submission/validation-app-description-no-offering-indication-from-microsoft.png" alt-text="Graphic demonstrates writing an app description without Microsoft offering indications.":::

* Avoid using phrases like **... certified for ...** or **... powered by ...** unless you are a certified Microsoft partner.
* Avoid typos and grammatical errors.
* Do not unnecessarily capitalize entire sections of your app description or long description.
* Do not include links to AppSource.
  
   :::image type="content" source="../../../../assets/images/submission/validation-app-description-link-to-appsource.png" alt-text="Graphic shows an example of a failed scenario that includes links to AppSource in an app long description.":::

* Do not make unverified claims (e.g., best, top, or ranked) without providing credible sources.
* Do not compare your offering to others in the marketplace.

Review the [checklist to write app descriptions](submission-checklist.md#write-descriptions) for additional guidance.

</details>

### Screenshots

Screenshots offer a visual preview of your app and complement your app name, icon, and description.

<details><summary>Expand to know more</summary>

Keep these guidelines in mind:

* Provide between three and five screenshots in your app listing.
* Use supported file types: PNG, JPEG, and GIF.
* Ensure dimensions are 1366x768 pixels.
* Limit each screenshot to a maximum size of 1,024 KB.

**Dos:**

* Highlight your app’s capabilities—demonstrate how users interact with your features, such as communicating with your bot.
* Include visuals that accurately represent your app.
* Use text sparingly.
* Frame screenshots with a branded color background and marketing content.
* Provide high-resolution screenshots with legible text. [*Must fix*]
* Include at least one mobile functionality screenshot. [*Good-to-fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-guidelines-pass-app-functionality-mobile.png" alt-text="Screenshot shows app functionality on mobile devices in a passing scenario.":::

* Use mockups that accurately depict your app’s UI. Ensure that screenshots show the actual UI or scenarios relevant to your app. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-guidelines-fail-suppliement-screenshot.png" alt-text="Screenshot shows an example of a failed scenario with supplement content in a screenshot.":::

   :::image type="content" source="../../../../assets/images/submission/validation-guidelines-fail-actual-UI.png" alt-text="Screenshot shows an example of a failed scenario with a screenshot of the actual UI.":::

* Screenshots must depict app functionality or its integration with Teams. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-guidelines-fail-app-functionality.png" alt-text="Screenshot shows an example of a screenshot missing app functionality or integration.":::

* Do not incorrectly reference Microsoft Teams as MS, MSFT, or MS Teams within screenshots. [*Must fix*]
* For Teams apps that extend across Microsoft 365 clients, screenshots must also demonstrate functionality on those platforms. [*Good-to-fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-guidelines-pass-app-functionality-MS-365.png" alt-text="Screenshot shows a passing scenario of Teams app functionality within Microsoft 365 clients.":::

* Include captions in screenshots to clearly explain the app capability. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-guidelines-pass-app-functionality.png" alt-text="Screenshot shows a screenshot with clear user instructions for app functionality.":::

* For apps including Tabs, ensure screenshots depict the Teams chrome in context. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-guildelines-pass-tabs-capability.png" alt-text="Screenshot shows a passing scenario of a Tab capability in Teams.":::

* For Teams apps extensible across Microsoft 365, screenshots must illustrate functionality within those environments. [*Good-to-fix*]

**Don'ts:**

* Do not include mockups that misrepresent your app’s actual UI—for example, using visuals that display your app outside of Teams.

   :::image type="content" source="../../../../assets/images/submission/validation-guidelines-fail-app-functionality-teams.png" alt-text="Screenshot shows a failed scenario with app functionality displayed outside of Teams.":::

</details>

### Videos

Videos effectively communicate the value of your app. You may submit a YouTube or Vimeo URL that demonstrates your app’s value, such as illustrating a scenario or guiding users through its functionality. [*Good-to-fix*]

If you include a video in your app listing via Partner Center, ensure:

* The video is short, clear, and engaging.
* It demonstrates how to set up and use your app.
* It follows a narrative format.
* Its duration is 60-90 seconds for a value video or 3-5 minutes for a walkthrough video. [*Good-to-fix*]
* Advertisements are disabled on your YouTube or Vimeo account before submission. [*Must fix*]
* The video highlights your app’s functionalities and integration within Teams. [*Must fix*]
* The video link is functional.
* For YouTube, format the URL as `https://www.youtube.com/watch?v=:id` or `https://youtu.be/:id`. For Vimeo, use `https://vimeo.com/:id`.

   :::image type="content" source="../../../../assets/images/submission/video-app-listing-partner-center.png" alt-text="Screenshot shows a video submitted in the app listing in Partner Center that does not meet guidelines.":::

* Optionally, surface the video as the first item in the screenshots or videos carousel in the app details (Teams Store and Admin Center) and AppSource pages. [*Good-to-fix*]
* Ensure that the demo or walkthrough video focuses on educating users rather than promoting the app.

Refer to the [checklist to create a video](submission-checklist.md#create-a-video) for more details.

<br></br>

### Privacy policy

[*Must fix*]

Your privacy policy applies to your Teams app or all of your services.

* If you use a generic privacy policy template, include references to all applicable services, applications, or platforms in its scope. You do not need to specify only your Teams app.
* Describe in detail how you handle data storage, retention, and deletion, and outline your security controls.
* Provide clear contact information.
* Ensure that all URLs are valid and not designated for beta or staging environments.
* Do not link to AppSource.
* Do not require authentication to access your privacy policy.
* Do not include commerce-related UI or store links.
* Use the same URL in both the app manifest and AppSource.

### Terms of use

[*Must fix*]

Follow these guidelines for writing your Terms of Use:

* Ensure they are tailored to your offering.
* Host the Terms of Use on your own domain.
* Use a secure (HTTPS) link.
* Provide access without requiring authentication.
* Use the same URL in both the app manifest and AppSource.

### Support links

[*Must fix*]

Support URLs in your app must not require authentication. Users must access support without signing in.
  
<details><summary>Expand to know more</summary>

Support URLs should include contact details or a method for users to submit support tickets. For example, if your support URL is hosted on GitHub, the page must be owned by you and list contact information or a way for users to get help.

:::image type="content" source="../../../../assets/images/submission/validation-supportlinks-authentication.png" alt-text="Screenshot shows support link requiring authentication, which is not allowed.":::

</details>

### Localization

[*Must fix*]

* If your app supports localization, include a file with language translations in your app package that automatically displays based on the Teams language settings. The file must follow the [Teams localization schema](~/concepts/build-and-test/apps-localization.md). [*Must fix*]
* Ensure that app metadata content is identical for `en-us` and other localization languages. [*Must fix*]
* List all supported languages in your AppSource app description. For example, state, "This app is available in X (localized language)." [*Must fix*]
* If a user's client settings do not match any provided localization languages, your app displays in the default language. Update the `localizationInfo` property accordingly. [*Must fix*]
* Update `localizationInfo` with the correct default language or add localized content for the app manifest and Partner Center descriptions. [*Must fix*]

## Apps linked to SaaS offer

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: This section follows [Microsoft commercial marketplace policy number 1140.5](/legal/marketplace/certification-policies?branch=pr-en-us-5673). For Teams apps linked to a Software as a Service (SaaS) offer, follow these guidelines.

<details><summary>General</summary>

* Independent Software Vendors (ISVs) allow multiple users (Subscribers) in the same tenant to manage their subscriptions and assign licenses individually.
* The offer must meet all [technical requirements](/microsoftteams/platform/concepts/deploy-and-publish/appsource/prepare/include-saas-offer) for Teams apps linked to a SaaS offer.
* Teams apps linked to a SaaS offer must adhere to all requirements under [1000 Software as a Service (SaaS)](/legal/marketplace/certification-policies#1000-software-as-a-service-saas).
* Ensure that the `subscriptionOffer` details in the app manifest are accurate. Specify the value as `publisherId.offerId`. For example, with publisher ID `contoso1234` and offer ID `offer01`, specify `contoso1234.offer01`.
* The linked SaaS offer must be live on AppSource; preview offers are not accepted.
  
</details>

<details><summary>Offer metadata</summary>

* Offer metadata must be consistent across the app manifest, Teams app listing in AppSource, and the SaaS offer in AppSource.
* The Teams app and SaaS offer must originate from the same publisher or developer. The SaaS offer specified in the app manifest must belong to the same publisher as the Teams app submission.
* When your submitted offer links a SaaS offer, select **Additional purchases** as **Yes, my product requires purchase of a service or offers additional in-app purchases​** in Partner Center product setup.
* Plan descriptions and pricing details must clearly inform users about the offer.
* Clearly detail any limitations, dependencies on additional services, or exceptions to the offered features in the plan descriptions.
* Since Teams apps linked to SaaS offers usually support named, per-user licensing, or specialized purchase flows, include clear descriptions of these methods in the metadata and subscription plan details.
* The SaaS offer must communicate guidance and messaging for users during all phases of the purchase flow.
  
</details>

<details><summary>SaaS offer home page and license management</summary>

* Provide a clear introduction on how subscribers use the product.
* Allow subscribers to assign licenses easily.
* Offer multiple support channels such as FAQ, knowledge bases, or email for troubleshooting.
* Validate users to ensure licenses are not redundant.
* Notify users after assigning licenses.
* Guide users on adding the app to Teams and starting with either a Teams chatbot or email.
* If your SaaS app utilizes [Microsoft license management](manage-third-party-apps-license.md), redirect users to the Microsoft license management interface in Teams after confirming the subscription to prevent user dead-ends.

</details>

<details><summary>Usability and functionality</summary>

* After successful subscription and license assignment, provide:
  * Full access to subscribed plan features.
  * Clear value demonstration of the subscription plan.
  * A link from your Teams app to the SaaS application home page for future license management.

</details>

<details><summary>Configure and test SaaS application</summary>

If testing your setup is complex, supply detailed documentation, linked SaaS configuration steps, and instructions for managing licenses and users in your *Notes for Certification*.

> [!TIP]
> You can include a video demonstrating your app and license management process to assist testers.

</details>

[Back to top](#teams-store-validation-guidelines)

## Tabs

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: This section aligns with [Microsoft commercial marketplace policy number 1140.4.2](/legal/marketplace/certification-policies#114042-tabs). If your app includes a tab, ensure it complies with these guidelines.

> [!TIP]
> For guidance on creating a high-quality app experience, review [Teams tab design guidelines](~/tabs/design/tabs.md).

<details><summary>Setup</summary>

* The tab setup must guide new users; do not dead-end them. Provide instructions on completing the workflow. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-tabs-setup-new-user.png" alt-text="Graphic shows an example of a tab that dead-ends new users during setup.":::

* Ensure the configuration experience remains within Teams. Do not force users to navigate outside Teams to generate content and then return to configure the tab. Clearly explain the configuration value. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-tabs-setup-profile-name.png" alt-text="Graphic shows an example of a tab setup prompting proper configuration.":::

* Do not embed an entire website in the tab configuration screen. For instance, if you build a project management app, let the configuration focus only on selecting a project. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-tabs-setup-configuration-experience.png" alt-text="Graphic shows a focused tab configuration experience.":::

    :::image type="content" source="../../../../assets/images/submission/validation-tabs-setup-configuration-screen.png" alt-text="Graphic shows a tab configuration screen.":::

* If your app requires users to enter a URL during configuration:
  * Provide a clear method or guidance to acquire or generate the URL. [*Must fix*]
  * Validate that the provided URL aligns with the app’s functionality. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-tab-configuration-way-forward-url-pass.png" alt-text="Screenshot shows a tab configuration with guidance for generating a URL.":::
  
    :::image type="content" source="../../../../assets/images/submission/validation-tab-configuration-way-forward-url-fail.png" alt-text="Screenshot shows a tab configuration without guidance for generating a URL.":::

* Embed a clickable contact link in configuration screens to help users request support. [*Must fix*]
* For an optimal first-run experience, hyperlink your support URL or email address in the configuration screen. [*Good-to-fix*]

</details>

<details><summary>Views</summary>

* The sign in screen must avoid large logos. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-views-applogin.png" alt-text="Graphic shows an example of a well-designed app sign-in screen.":::

* Simplify content by segmenting it across multiple tabs when necessary.

    :::image type="content" source="../../../../assets/images/submission/validation-views-multiple-tabs.png" alt-text="Graphic shows an app with content spread across multiple tabs.":::

* Remove duplicate headers in tabs. Avoid embedding logos redundantly since Teams displays the app icon and name already. [*Good-to-fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-views-no-duplicate-header-logo.png" alt-text="Graphic shows a tab without duplicate headers or logos.":::

    :::image type="content" source="../../../../assets/images/submission/validation-views-duplicate-header-logo.png" alt-text="Graphic shows a tab with duplicate headers and logos.":::

</details>

<details><summary>Navigation</summary>

Adhere to the following navigation guidelines:

* Tabs must not offer navigation that conflicts with Teams' primary navigation. If you supply left navigation in your tab, avoid using only icons or icon stacks, or collapsible rails that mimic Teams’ navigation. Use inline text with icons or hamburger menus instead. [*Must fix*]

   Design your app with [basic](~/concepts/design/design-teams-app-basic-ui-components.md) or [advanced](~\concepts\design\design-teams-app-advanced-ui-components.md) Fluent UI components.

   :::image type="content" source="../../../../assets/images/submission/validation-navigation-static-tab.png" alt-text="Graphic shows proper navigation in a static tab that does not conflict with Teams' native navigation.":::

   :::image type="content" source="../../../../assets/images/submission/validation-navigation-left-navigation.png" alt-text="Graphic shows an example of left navigation that conflicts with Teams' primary navigation.":::

* If your tab includes a toolbar on the left without navigational components, leave a 20-pixel gap from Teams' native left navigation. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-navigation-spacing-between-toolbar.png" alt-text="Graphic shows required spacing between a custom toolbar and Teams' navigation.":::

* For secondary or tertiary pages in a tab, open them in level two (L2) or level three (L3) views using breadcrumbs, left navigation, back buttons, page headers, or hamburger menus. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-improper-navigation-leveles.png" alt-text="Screenshot shows an example of improper navigation levels in a dialog.":::

* Deep links in tabs must route within Teams (for example, to dialogs or other tabs). [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-navigation-view-button-not-linked-static-tab.png" alt-text="Screenshot highlights a view button improperly linking outside a static tab.":::

* Tabs must not navigate users outside Teams for core workflows. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-navigation-core-workflow-within-configuration.png" alt-text="Screenshot shows core workflow maintained within configuration.":::

    :::image type="content" source="../../../../assets/images/submission/validation-navigation-core-workflow-redirects-outside.png" alt-text="Screenshot shows an improper redirection outside Teams for a core workflow.":::

* Prevent horizontal scrolling in in-meeting tabs. [*Must fix*]
* In-meeting dialogs should not allow horizontal scrolling. Define the in-meeting dialog’s I-frame width within supported ranges to maintain responsiveness. [*Must fix*]
* If the entire tab canvas is scrollable, restrict horizontal scrolling unless using an infinite canvas with fixed UI elements. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-horizontal-scroll-allowed-scenarios.png" alt-text="Graphic illustrates scenarios where horizontal scroll is permitted in mobile apps.":::

   :::image type="content" source="../../../../assets/images/submission/validation-horizontal-scroll-allowed-kanban.png" alt-text="Graphic shows a valid horizontal scroll scenario with a Kanban board.":::

   :::image type="content" source="../../../../assets/images/submission/validation-horizontal-scroll-list-view-components.png" alt-text="Graphic shows a list view with controlled horizontal scrolling.":::

   :::image type="content" source="../../../../assets/images/submission/validation-horizontal-scroll-fixed-board.png" alt-text="Graphic shows a board with fixed components allowing horizontal scroll.":::

   :::image type="content" source="../../../../assets/images/submission/validation-horizontal-scroll-in-list-view.png" alt-text="Graphic demonstrates horizontal scroll in a list view scenario.":::

* Provide a clear method to return to the previous work state. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/back-button-available.png" alt-text="Screenshot shows a visible back button option.":::

   :::image type="content" source="../../../../assets/images/submission/no-back-button-available.png" alt-text="Screenshot displays a scenario with no back button provided.":::

* Do not permit horizontal scroll in Adaptive Cards within Teams. [*Must fix*]
* The bottom rail for navigation in tabs must not interfere with Teams’ native mobile navigation. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-tab-bottom-rail-conflicts-with-teams-mobile.png" alt-text="Graphic shows an improper bottom rail in a tab that conflicts with Teams mobile navigation.":::

</details>

<details><summary>Usability</summary>

* Prevent content truncation or overlapping within the tab. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-usability-content-truncation.png" alt-text="Graphic shows an example of truncation and overlapping content in a tab.":::

* Allow users to undo their last action in the tab. [*Must fix*]
* In personal contexts, tabs may aggregate shared content from the app. For example, a personal project management tab may display aggregated feedback from team channels. [*Good-to-fix*]
* Ensure tabs respond to Teams theme changes. When a user switches themes, the app should reflect the new theme accurately. [*Good-to-fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-usability-responsive-tabs.png" alt-text="Graphic shows a tab that adjusts correctly to theme changes in Teams.":::

    :::image type="content" source="../../../../assets/images/submission/validation-usability-unresponsive-tabs.png" alt-text="Graphic shows an example of a tab that fails to respond to Teams theme changes.":::

* Use Teams-styled components (fonts, type ramps, color palettes, grid systems, and motion) whenever possible. For more details, refer to [tab design guidelines](/microsoftteams/platform/tabs/design/tabs). [*Good-to-fix*]
* If the app needs user settings management, include a dedicated **Settings** tab. [*Good-to-fix*]
* Follow Teams interaction design trends (in-page navigation, dialog placements, and information hierarchy). Refer to [Microsoft Teams Fluent UI kit](~/concepts/design/design-teams-app-basic-ui-components.md) for more insight. [*Good-to-fix*]
* Ensure tab experiences are fully responsive on mobile (Android and iOS). [*Must fix*]

   > [!TIP]
   >
   > * Consider including a personal bot along with a personal tab.
   > * Enable users to share content from their personal tab.

* Prevent tab elements from obstructing or disrupting core workflows. For instance, avoid non-minimizable bots within a tab. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-tab-elements-impede-workflow.png" alt-text="Graphic shows a tab with obstructive elements that hinder workflow.":::

* Ensure the tab functions properly and does not present broken features or incomplete workflows. [*Must fix*]
* If the tab includes a footer, remove any links unrelated to core app functionality. [*Must fix*]

</details>

<details><summary>Scope selection</summary>

* Ensure that the landing page of configurable tabs does not include personal content such as **My Tasks** or **My Dashboard**. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-configurable-tab-content-personal-scope.png" alt-text="Graphic shows a configurable tab landing page with personal content like My Tasks, which is not allowed.":::

* After setup, display a collaborative view for the entire team. [*Must fix*]
* If your app offers a personal scope view to boost efficiency, use filtered views, deep links to personal apps, or navigate to higher navigation levels within the tab while maintaining a uniform landing page for all team members. [*Must fix*]
* Ensure the landing page in configurable tabs presents identical content for all channel members. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-usability-configurable-tab-personal-info.png" alt-text="Graphic shows an example where configurable tab content differs among members, which is not allowed.":::

* The configurable tab must focus strictly on a singular functionality. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-usability-configurable-nested-tabs.png" alt-text="Graphic shows an example of nested tabs in a configurable view, which is not acceptable.":::

</details>

[Back to top](#teams-store-validation-guidelines)

## Bots

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: This section adheres to [Microsoft commercial marketplace policy number 1140.4.3](/legal/marketplace/certification-policies#114043-bots).

For apps including bots, ensure the following guidelines are met.

> [!TIP]
> For additional guidance on enhancing your bot experience, review [Teams bot design guidelines](~/bots/design/bots.md).

<details><summary>Bot design guidelines</summary>

* Follow the [Teams bot design guidelines](../../../../bots/design/bots.md).
* Implement dialogs to avoid multi-turn responses when workflows require repetitive data capture (e.g., name, DOB, place, designation). [*Must fix*]
* Fix any broken links, responses, or workflows in your bot functionality. [*Must fix*]

</details>

<details><summary>Bot commands</summary>

Bot commands clarify user input and intent.

* Ensure that every command your bot supports returns the correct response—including generic commands like **Hi**, **Hello**, and **Help**. [*Must fix*]
  
  :::image type="content" source="../../../../assets/images/submission/validation-bot-commands-generic-response-pass.png" alt-text="Graphic shows a bot correctly responding to generic commands.":::

  :::image type="content" source="../../../../assets/images/submission/validation-bot-commands-generic-no-response.png" alt-text="Graphic shows a bot failing to respond to generic commands.":::

* Design commands to always provide a way forward and never leave users at a dead end. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-bot-commands-deadend.png" alt-text="Graphic displays an example of a bot command that leaves users at a dead end.":::

* List at least one valid bot command in the `items.commands.title` section of the app manifest and supply a descriptive explanation of how it works. Commands listed under the `commandLists` section populate the bot command menu and guide users how to interact. [*Good-to-fix*]
* Do not include official Microsoft product images or avatars in bot responses. Use your own assets. [*Must fix*]
* Ensure bots respond promptly without displaying extended loading indicators. [*Must fix*]
* The bot help command must not redirect users outside Teams; provide help content within the Teams environment via an Adaptive Card if needed. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-bot-redirects-user-outside-teams.png" alt-text="Graphic shows a bot response incorrectly redirecting users outside Teams.":::

* Always provide valid responses to any user input—even for irrelevant or improper commands. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-bot-response-valid-improper-input.png" alt-text="Graphic shows a bot providing a suitable response for improper input.":::

   :::image type="content" source="../../../../assets/images/submission/validation-bot-response-improper-response-invalid-command.png" alt-text="Graphic shows a bot that fails to differentiate valid from invalid responses.":::

* Do not prefix special characters such as a slash (/) to bot commands. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-bot-commands-special-characters.png" alt-text="Graphic shows bot commands incorrectly prefixed with special characters.":::

* Bots must handle invalid user commands gracefully by providing a valid corrective response rather than an error message. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-bot-way-forward-for-invalid-command.png" alt-text="Graphic demonstrates a bot providing guidance for invalid commands.":::

   :::image type="content" source="../../../../assets/images/submission/validation-welcome-message-bot-dead-end-invalid-command.png" alt-text="Graphic shows a bot that inadequately handles invalid commands.":::

* Bot functionality must align with the context in which it is installed, adding clear value. [*Must fix*]
* Avoid duplicate commands. [*Must fix*]
* After responding to a command, a bot should not continue showing a typing indicator. [*Must fix*]
* Ensure the bot provides a valid response to the **help** command, whether the command is in lowercase or uppercase, even if the user is not logged in. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-bot-valid-response-lowercase.png" alt-text="Graphic shows a bot providing a valid response for lowercase help commands.":::

   :::image type="content" source="../../../../assets/images/submission/validation-bot-valid-response-logged-app.png" alt-text="Graphic shows a bot providing a valid response even when the user is not logged in.":::

* Provide a valid response when users type **help**.

   :::image type="content" source="../../../../assets/images/submission/validation-bot-help-command.png" alt-text="Graphic shows a bot's valid help command response.":::

* Ensure bot messages display fully on mobile devices without truncation. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-bot-response-no-truncate-mobile.png" alt-text="Graphic shows a bot message that is fully visible on mobile.":::

   :::image type="content" source="../../../../assets/images/submission/validation-bot-response-truncate-mobile.png" alt-text="Graphic shows a bot message that truncates on mobile.":::

* All links within a bot response Adaptive Card must function correctly. Any link that navigates outside Teams must include clear redirect text (e.g., **View in...** or **This way to...**) and, if possible, a pop-out icon in the action button, or a redirect note in the message body. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-bot-action-button-redirect-warning.png" alt-text="Graphic shows a bot response action button warning about external redirection.":::

* If your bot is designed only to send notifications (one-way communication), set `isNotificationOnly` to true in the app manifest. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-bot-command-isnotification-only-true.png" alt-text="Graphic depicts a bot manifest with isNotificationOnly set to true.":::

  :::image type="content" source="../../../../assets/images/submission/validation-bot-command-isnotification-only-not-true.png" alt-text="Graphic shows a notification-only bot failing to respond in a user conversation.":::

* Ensure the bot provides a seamless experience on mobile platforms. [*Must fix*]

> [!TIP]
> For personal bots, consider adding a **Help** tab that further outlines your bot’s capabilities.

</details>

<details><summary>Bot first run user experience</summary>

* A bot deployed in personal scope sends a welcome message or provides prompt starters. [*Must fix*]

   * If using prompt starters:
     * Include at least one command that showcases your bot’s value proposition. [*Must fix*]
     * Ensure prompt starters and commands function and return the correct responses. [*Must fix*]
     * Use clear, coherent command descriptions. [*Must fix*]
     * Ensure prompt starters are relevant to your app’s functionality. [*Must fix*]
     * Include at least three unique prompt starters. [*Good-to-fix*]

   * If sending a welcome message:
     * For apps with complex configuration (such as those requiring an enterprise license or lacking intuitive sign-up), include configuration details within the welcome message. The welcome message should cover the bot’s value, setup instructions, and a brief overview of supported commands. Present the message via an Adaptive Card with buttons for improved usability. [*Must fix*]

     :::image type="content" source="../../../../assets/images/submission/validation-bot-welcome-message.png" alt-text="Graphic shows a welcome message provided by the bot in a complex configuration scenario.":::

     :::image type="content" source="../../../../assets/images/submission/validation-bot-no-welcome-message.png" alt-text="Graphic shows missing welcome message in a complex configuration scenario.":::

* Avoid sending welcome messages individually to every user in channels or chats, as this is considered spamming. Include the name of the person who added the bot when appropriate.

   :::image type="content" source="../../../../assets/images/submission/validation-bot-welcome-message-not-triggered.png" alt-text="Graphic shows a scenario where a welcome message is not triggered.":::

   :::image type="content" source="../../../../assets/images/submission/validation-bot-welcome-message-triggered.png" alt-text="Graphic shows a scenario where a welcome message is correctly triggered.":::

* Ensure that the welcome message provides clear guidance and does not leave users at a dead end. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-welcome-message-no-way-forward.png" alt-text="Graphic shows a welcome message that fails to provide a way forward.":::

   :::image type="content" source="../../../../assets/images/submission/validation-welcome-message-clear-way-forward.png" alt-text="Graphic shows a welcome message that guides users clearly.":::

* In channels or group chats, do not send proactive welcome messages in 1:1 chats to every team member. [*Must fix*]
* Notification-only bots may send a proactive welcome message in channels only if the message contains critical configuration or usage information. [*Must fix*]
* Bots in collaborative scopes must send proactive messages (beyond welcome messages) selectively to avoid irrelevant notifications, opting for 1:1 chats instead. [*Must fix*]
* Ensure the welcome message clarifies any limitations of bot usage within the given scope. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-bot-welcome-messahe-with-app-limitation.png" alt-text="Graphic displays a welcome message that includes app limitations.":::

   :::image type="content" source="../../../../assets/images/submission/validation-bot-welcome-messahe-without-app-limitation.png" alt-text="Graphic shows a welcome message that omits app limitations.":::

* In personal scope, automatically trigger the welcome message upon installation to avoid user confusion. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-bot-no-welcome-message-in-personal-scope.png" alt-text="Graphic shows a scenario where a bot fails to send a welcome message in personal scope.":::

* Trigger the welcome message only once upon installation. Do not trigger it every time the help command is invoked. [*Must fix*]
* Do not trigger the welcome message with every bot command, as this leads to spam. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-welcome-message-trigger-for-any-command.png" alt-text="Graphic shows a scenario where a bot triggers a welcome message for every command.":::

* Ensure the content in the welcome message aligns with your long app description and installation scope. [*Must fix*]
* Prevent multiple welcome messages on installation. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-bot-multiple-message-trigger-install.png" alt-text="Graphic shows a scenario where the bot sends multiple welcome messages upon installation.":::

* The app name in the welcome message must match the app name in the manifest. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-app-name-mismatch-manifeast-and-welcome-message.png" alt-text="Graphic shows a scenario where the app name in the bot welcome message does not match the app manifest.":::

* Do not include competitor chat-based platform names in the welcome message unless your app explicitly offers such interoperability.
* The welcome message must not redirect users to another Teams app. Instead, prompt users to complete their first task and include a brief description of supported bot commands. [*Must fix*]
* Avoid including links to any app marketplace, including AppSource, in the welcome message. [*Must fix*]
* If your app requires a complex configuration that necessitates admin-led installation or external configuration steps, trigger the bot’s proactive welcome message in the relevant group chat or channel. [*Must fix*]
* In channels, do not send individual welcome messages to all users. If needed, mention the person who added the bot rather than messaging everyone. [*Good-to-fix*]

> [!TIP]
> Consider using a carousel tour in personal welcome messages to introduce your bot and its features effectively. For example, include a slide titled **Create a task**.

</details>

<details><summary><a id="botmessagespamming">Bot message spamming</a></summary>

Bots avoid spamming users by refraining from sending multiple messages in quick succession.

* **In channels and chats**: Do not spam by creating separate posts. Consolidate messages and use threaded replies. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-bot-message-spamming-one-message.png" alt-text="Graphic shows an example where a bot sends a single consolidated message.":::

    :::image type="content" source="../../../../assets/images/submission/validation-bot-message-spamming-multiple-messages.png" alt-text="Graphic shows an example where a bot sends multiple messages in quick succession.":::

* **In personal apps**:
  * Avoid multiple messages in rapid succession. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-bot-messages-multiple-message-quick-succession.png" alt-text="Graphic shows a bot spamming multiple messages quickly.":::

  * Provide all necessary information in one message. [*Must fix*]
  * Prevent multi-turn conversations for repetitive workflows; use forms or dialogs instead. [*Must fix*]
  * While NLP-based conversational chatbots may use multi-turn conversations for enhanced engagement, they must remain efficient.

    :::image type="content" source="../../../../assets/images/submission/validation-bot-messages-using-task-module.png" alt-text="Graphic shows a bot using a task module to collect information in one prompt.":::

    :::image type="content" source="../../../../assets/images/submission/validation-bot-messages-using-mutliple-conversation.png" alt-text="Graphic shows a multi-turn conversation for requirement completion.":::

* **Welcome messages**: Do not repeat welcome messages at regular intervals or when new members are added; send personalized messages to the new user instead. [*Must fix*]

   :::image type="icon" source="../../../../assets/images/submission/validation-bot-send-proactive-message-to-all-members.png" alt-text="Graphic depicts a bot spamming welcome messages to all team members.":::

</details>

<details><summary>Bot notifications</summary>

Ensure that bot notifications contain content relevant to the intended scope (team, chat, or personal). [*Must fix*]

:::image type="content" source="../../../../assets/images/submission/validation-bot-notifications-relevant.png" alt-text="Graphic shows an example of a relevant bot notification.":::

:::image type="content" source="../../../../assets/images/submission/validation-bot-notifications-not-relevant.png" alt-text="Graphic shows an example of an irrelevant bot notification.":::

</details>

<details><summary>Bots and Adaptive Cards</summary>

Adaptive Cards provide an effective format for bot messages. Ensure that cards remain lightweight and include no more than six actions. For additional content, consider using a dialog or tab.

For further information on Adaptive Cards, refer to:

* [Designing Adaptive Cards](~/task-modules-and-cards/cards/design-effective-cards.md)
* [Cards reference](~/task-modules-and-cards/cards/cards-reference.md#types-of-cards)

Ensure that the bot experience displays responsively on mobile and that messages include a clear way forward if issues occur.

</details>

<details><summary>Notification only bots</summary>

Apps consisting of notification-only bots deliver value by sending targeted notifications for key events such as a new sales lead or workflow completion.

> [!TIP]
> Provide preview information along with inline actions in the notification card to avoid requiring users to exit Teams.

</details>

<details><summary>Bot metadata information</summary>

* Ensure bot information (name, logo, privacy policy, terms of service) in the app manifest matches the Bot Framework metadata. [*Must fix*]
* The bot ID in the manifest must match the bot ID in the Teams Store’s last published version. Changing the bot ID results in permanent loss of user interaction history and begins a new conversation chain. [*Must fix*]
* Update bot metadata, welcome messages, or responses if the app name or details change. [*Must fix*]
* The app name in bot welcome messages must match the app manifest’s app name. [*Must fix*]

</details>

<details><summary>Bot in collaborative scope</summary>

* Do not use bots installed in a channel or group chat solely to obtain team rosters to send individual notifications. For example, an app designed to facilitate meetups should not use a bot in this manner. [*Must fix*]
* Bots installed in collaborative scopes must provide clear value within that context. [*Must fix*]

</details>

[Back to top](#teams-store-validation-guidelines)

## Message extensions

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: This section adheres to [Microsoft commercial marketplace policy number 1140.4.4](/legal/marketplace/certification-policies#114044-messaging-extensions).

For message extensions, ensure you follow these guidelines to maintain a seamless user experience.

> [!TIP]
> For more details on enhancing your message extension experience, review the [Teams message extension design guidelines](~/messaging-extensions/design/messaging-extension-design.md).

<details><summary>Messaging extensions design guidelines</summary>

* Adhere to the [Messaging extension design guidelines](../../../../messaging-extensions/design/messaging-extension-design.md).
  
   :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-design-guidelines-fail.png" alt-text="Graphic shows a failure scenario where messaging extension guidelines were not met.":::

* Message extensions serve as shortcuts to insert app content or perform actions without navigating away from the conversation. Keep them simple by displaying only the essential components without embedding a full website. [*Must fix*]
* Ensure that preview images in Adaptive Cards load reliably. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-preview-image-adaptive-card-loading.png" alt-text="Graphic shows an Adaptive Card with a properly loading preview image.":::

  :::image type="content" source="../../../../assets/images/submission/validation-preview-image-adaptive-card-not-loading.png" alt-text="Graphic shows an Adaptive Card where the preview image fails to load.":::

* Incorporate your app icon in the message extension response card to prevent user confusion. [*Must fix*]
* Guarantee that your app functions without errors or dead-ends following action execution in the message extension. [*Must fix*]
* Validate that messaging extensions operate as intended within group chats and channel scopes. [*Must fix*]
* Include a method for users to sign in or sign out from the message extension. [*Must fix*]
* If utilizing OpenAPI URLs in message extensions, ensure they provide a direct response without redirection. Serve API calls from the same root domain or subdomain.

</details>

<details><summary>Action commands for Action-based message extensions</summary>

Action-based message extensions should adhere to the following:

* Allow users to trigger actions on a message without needing intermediate steps, such as sign in.

    :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-no-intermediate-step.png" alt-text="Graphic shows an action command that executes directly without intermediate steps.":::

    :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-intermediate-step-available.png" alt-text="Graphic shows an action command with intermediate steps present.":::

* Pass the message context to subsequent workflow stages. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-app-passes-message.png" alt-text="Graphic shows a correct context pass in a message extension.":::

    :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-app-doesnot-pass-message.png" alt-text="Graphic displays a failure in passing message context in a message extension.":::

* In action commands triggered from a chat message or channel post, incorporate the host app’s name rather than generic verbs. For example, use **Start a Skype Meeting** instead of **Start Meeting**, or **Upload file to DocuSign** instead of **Upload file**. [*Good-to-fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-action-command-host-name.png" alt-text="Graphic shows an action command that includes the host app name.":::

    :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-action-command-verb.png" alt-text="Graphic shows a generic action command using a verb.":::

* When a message action is invoked, ensure the user can complete the workflow without errors, blank responses, or endless loading. [*Must fix*]
   :::image type="content" source="../../../../assets/images/submission/validation-continous-loading-indicator-action-command.png" alt-text="Graphic shows an erroneous continuous loading indicator during an action command.":::
* Avoid duplicate action commands. [*Must fix*]
* Message actions must support full workflow completion without invalid responses. [*Must fix*]
* For apps using only action-based messaging extensions, achieve these final outcomes:
  * Post a relevant notification in either the context where the extension is invoked or in 1:1 bot chat based on the scenario. [*Must fix*]
  * Enable users to share cards with others after the action completes, confirming that silent actions do not occur. [*Must fix*]

</details>

<details><summary>Preview links (link unfurling)</summary>

[*Must fix*]

* If your app declares the `supportsAnonymizedPayloads` property and the user has not installed the app, ensure that the app link unfurls and presents the add app dialog upon card selection. [*Must fix*]
* Message extensions preview recognized links in the Teams compose box. Do not include domains outside your control (absolute URLs or wildcards). For example, `yourapp.onmicrosoft.com` is acceptable, but `*.onmicrosoft.com` or top-level wildcards like `*.com` are not. [*Must fix*]
* Declare only domains under your direct ownership in the `messageHandler` link unfurling section of the manifest. Avoid including domains such as `*.botframework.com`. [*Must fix*]

</details>

<details><summary>Search commands</summary>

* In search-based message extensions, provide clear descriptive text to assist user searches. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-search-commands-text-available.png" alt-text="Graphic shows a message extension with descriptive search text.":::

    :::image type="content" source="../../../../assets/images/submission/validation-search-commands-text-not-available.png" alt-text="Graphic shows a message extension missing descriptive search text.":::

* Ensure that any @mention executables are clear, straightforward, and legible.

    :::image type="content" source="../../../../assets/images/submission/validation-search-command-unclear-executable.png" alt-text="Graphic shows a message extension with unclear @mention executables.":::

</details>

[Back to top](#teams-store-validation-guidelines)

## Dialogs

[*Must fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: This section follows [Microsoft commercial marketplace policy number 1140.4.5](/legal/marketplace/certification-policies#114045-task-modules).

<details><summary>Expand to know more</summary>

Dialogs (referred to as task modules in TeamsJS v1.x) must include an icon and the app’s short name. They should display only the components needed to complete a specific action without embedding the full app.

Refer to [Teams dialog design guidelines](~\task-modules-and-cards\task-modules\design-teams-task-modules.md) for more details.

:::image type="content" source="../../../../assets/images/submission/validation-task-module-displays-components.png" alt-text="Graphic shows a task module displaying only essential components.":::

:::image type="content" source="../../../../assets/images/submission/validation-task-module-embeds-app.png" alt-text="Graphic shows an improper task module that embeds the entire app.":::

> [!TIP]
> Review [Teams task module design guidelines](~/task-modules-and-cards/task-modules/design-teams-task-modules.md) to enhance your app experience.

</details>

[Back to top](#teams-store-validation-guidelines)

## Meeting extensions

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: This section aligns with [Microsoft commercial marketplace policy number 1140.4.6](/legal/marketplace/certification-policies#114046-meeting-extensions).

> [!TIP]
> For guidance on creating an optimal in-meeting experience, consult the [Teams meeting extension design guidelines](~/apps-in-teams-meetings/design/designing-apps-in-meetings.md).

<details><summary>Meeting extension design guidelines</summary>

* Follow the [Meeting extension design guidelines](../../../../apps-in-teams-meetings/design/designing-apps-in-meetings.md).
* When engaging participants using the in-meeting app experience (via tabs, dialog boxes, or share-to-stage features), deliver a responsive experience consistent with the Teams meeting interface. [*Must fix*]
* Meeting extension apps must offer a responsive in-meeting interface that aligns with Teams experiences, while pre- and post-meeting interfaces are optional. [*Must fix*]

  * Pre-meeting: Allow users to find and add meeting apps or perform preparatory tasks like surveys.
  * Post-meeting: Present results such as survey outcomes or feedback.
  * In-meeting: Enhance core workflows and engage participants without routing them outside Teams.

   :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-outside-teams-core-workflows.png" alt-text="Graphic illustrates an in-meeting experience that incorrectly directs users outside Teams for core functionality.":::

* Ensure your app offers value beyond custom Together Mode scenes. [*Must fix*]
* Declare `groupChat` as a scope under `configurableTabs`, and include `meetingDetailsTab`, `meetingChatTab`, and `meetingSidePanel` in the context properties within the manifest to enable your app on Teams mobile. [*Must fix*]
* Meeting canvases must not dead-end meeting participants and must display a graceful failure message if the app encounters limitations, such as regional dependencies. [*Must fix*]
* The meeting canvas header must display the correct app name to avoid confusion. [*Must fix*]
* Provide an option for users to sign out within the meeting extension. [*Must fix*]
* In-meeting tabs on mobile must include complete workflows and not display blank pages. [*Must fix*]
* The meeting stage should not embed a full website experience; it must support focused, collaborative participation. [*Must fix*]
* Avoid continuous loading screens, error messages, or broken functionality that prevent workflow completion during meetings. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-app-shows-continous-loading-screen.png" alt-text="Graphic shows a meeting extension with a continuous loading screen error.":::

* Do not trigger a new Teams instance when starting a meeting; ensure that new meetings open within the active Teams instance. [*Must fix*]
* Meeting apps must complete workflows entirely within Microsoft Teams, not directing users to competitor platforms. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-apps-redirecting-competitor-chat-platform.png" alt-text="Graphic shows a meeting extension that improperly redirects to a competitor platform.":::

* If your app offers role-based views where certain workflows are restricted, display messaging in the tab or side panel to inform participants accordingly. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-way-forward-not-available-for-role-based-views.png" alt-text="Graphic illustrates an in-meeting extension with missing guidance for role-based views.":::

</details>

<details><summary>Pre- and post-meeting experience</summary>

* Pre- and post-meeting screens must adhere to general tab design guidelines. See [Teams design guidelines](~/tabs/design/tabs.md) for reference. [*Must fix*]
* Organize content effectively when displaying multiple elements such as poll results (e.g., for more than 10 items, refer to the recommended layout). [*Must fix*]
* Notify users with clear messaging when actions like exporting survey results complete (e.g., “Results successfully downloaded”). [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-meeting-experience-tab-design-guidelines-fail.png" alt-text="Graphic shows a meeting tab that fails to adhere to design guidelines.":::

</details>

<details><summary>In-meeting experience</summary>

* Use a dark theme exclusively during meetings. Refer to [Teams design guidelines](~/apps-in-teams-meetings/design/designing-apps-in-meetings.md#theming) for more details. [*Must fix*]
* Display tooltips on hover over the app icon to reveal the app name during meetings. [*Must fix*]
  
    :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-exp-display-app-name.png" alt-text="Graphic shows a tooltip displaying the app name during a meeting.":::

* Ensure that message extensions function the same during meetings as they do outside them. [*Must fix*]

</details>

<details><summary>In-meeting tabs</summary>

* In-meeting tabs must remain responsive and maintain component sizes and padding. [*Must fix*]
* Include a back button if the tab supports deeper navigation layers. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-exp-back-button.png" alt-text="Graphic shows a back button in an in-meeting tab.":::

    :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-exp-back-button-absent.png" alt-text="Graphic shows an in-meeting tab without a back button.":::

* Do not include more than one close button to avoid user confusion with already provided header controls. [*Must fix*]
* Eliminate horizontal scrolling in in-meeting tabs. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-tab-vertical-scroll.png" alt-text="Graphic shows an in-meeting tab with appropriate vertical scrolling.":::

   :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-tab-horizontal-scroll.png" alt-text="Graphic shows an in-meeting tab exhibiting horizontal scrolling, which is not allowed.":::

</details>

<details><summary>In-meeting dialogs</summary>

* Use in-meeting dialogs sparingly for light, task-oriented scenarios. [*Must fix*]
* Ensure dialogs display in a single column without multiple navigation levels. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-single-column-layout.png" alt-text="Graphic shows a properly formatted single-column in-meeting dialog.":::

  :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-multiple-column-layout.png" alt-text="Graphic shows an in-meeting dialog with an incorrect multi-column layout.":::

* Do not use dialogs unnecessarily. [*Must fix*]
* Align the dialog to the center of the meeting stage. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-dialog-not-aligned.png" alt-text="Graphic shows an improperly aligned in-meeting dialog.":::

* Automatically dismiss the dialog after a user performs an action. [*Must fix*]
* For Together mode, adhere to these specifics:
  * Use only .png images.
  * Ensure the final package does not exceed 1920x1080 resolution, which must be an even number.
  * Keep the maximum scene size to 10 MB.
  * Limit each individual image in the scene to 5 MB.
  * Mark overlapping images as Transparent by using the available checkbox in the selection panel.

</details>

<details><summary>Shared Meeting Stage</summary>

To use the **shareAppContentToStage** API, configure the correct RSC permissions in the manifest. Under `authorization`, update the `name` property to `MeetingStage.Write.Chat` and set the `type` property as `Delegated`. [*Must fix*]

The shared meeting stage feature launches solely through the Teams desktop app; however, ensure that its content remains accessible and responsive on mobile devices. [*Must fix*]

</details>

[Back to top](#teams-store-validation-guidelines)

## Connector

1. The connector name must match the app name as it appears within the app and in the manifest.

   :::image type="content" source="../../../../assets/images/submission/connector-mismatch-app-name.png" alt-text="Screenshot shows a mismatch between the connector name and the app name in the manifest.":::

2. Users must encounter no errors while configuring the connector.

   :::image type="content" source="../../../../assets/images/submission/connector-error-configuring.png" alt-text="Screenshot shows an error during connector configuration.":::

## Notifications

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: This section corresponds to [Microsoft commercial marketplace policy number 1140.4.7](/legal/marketplace/certification-policies#114047-notification-apis).

For apps utilizing the [activity feed APIs provided by Microsoft Graph](/graph/teams-send-activityfeednotifications), adhere to the following:

> [!TIP]
> For apps supporting notifications triggered after extended periods (for example, after one day or one month), ensure that you simulate such notifications in the background for testing purposes.

<details><summary>Notification design guidelines</summary>

* Follow the [activity feed notifications design guidelines](/graph/teams-send-activityfeednotifications).
* Ensure that once a notification is selected, users face no irrelevant or broken workflows; they must complete workflows efficiently. [*Must fix*]
* Include your app’s name in notifications to clearly signal their origin to users. [*Must fix*]
* Trigger notifications for all scenarios detailed in your app’s long description, first-run experience, and those declared under the `activityTypes` property in the manifest. [*Must fix*]
* Notifications must appear within five seconds of user action. [*Must fix*]
* Clearly mention any notification limitations within your app’s long description or first-run guidance. [*Must fix*]

</details>

<details><summary>General</summary>

* All notification triggers specified in your app must function correctly. [*Must fix*]
* Localize notifications according to the languages supported in your app. [*Must fix*]
* Notifications display within five seconds on all supported platforms. [*Must fix*]

</details>

<details><summary>Avatars</summary>

* Ensure the notification avatar matches your app's color icon. [*Must fix*]
* If a notification is triggered by a user, include that user's avatar in the notification. [*Must fix*]

</details>
  
<details><summary>Spamming</summary>

* Do not send more than 10 notifications per minute to a user. [*Must fix*]
* Bots and activity feed should avoid triggering duplicate notifications. [*Must fix*]
* Notifications must deliver meaningful content and not be used for trivial events. [*Must fix*]

</details>
  
<details><summary>Navigation and layout</summary>

* Follow the Teams activity feed layout and experience guidelines for notifications. [*Must fix*]
* When a notification is selected, ensure that the user is directed to the corresponding content within Teams. [*Must fix*]

</details>

[Back to top](#teams-store-validation-guidelines)

## Microsoft Graph connector

The recommended method to publish your Graph connector is via the [Graph connector gallery](/microsoftsearch/connectors-gallery). Do not include it inside your manifest.json file. Refer to [review-copilot-validation-guidelines.md](review-copilot-validation-guidelines.md) for guidelines on the declarative agent file.

***Example***

Avoid including the Graph connector node in the manifest file.

:::image type="content" source="../../../../assets/images/Copilot/da-graph-connector.png" alt-text="Screenshot showing the Graph connector node in the manifest file.":::

[Back to top](#teams-store-validation-guidelines)

## Microsoft 365 App Compliance Program

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: This section adheres to [Microsoft commercial marketplace policy number 1140.6](/legal/marketplace/certification-policies#11406-publisher-attestation).

<details><summary>Expand to know more</summary>

The Microsoft 365 App Compliance Program helps organizations assess risk by evaluating your app’s security and compliance. If you publish an app to the Teams Store, complete these program tiers:

* **Publisher Verification**: Assures admins and users of your app’s authenticity. A blue **verified** badge appears on the Microsoft Entra consent dialog and related screens. For more details, review [Mark your app as publisher verified](/azure/active-directory/develop/mark-app-as-publisher-verified). [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-365-compliance-publisher-verification.png" alt-text="Graphic shows a blue verified badge on the Microsoft Entra consent dialog.":::

* **Publisher Attestation**: Share general, data handling, and security and compliance information to aid customer decisions. [*Good-to-fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: For apps not previously listed, complete Publisher Attestation once your app is available in the Teams Store. For updates to existing apps, complete [Publisher Attestation](/microsoft-365-app-certification/docs/attestation) prior to submitting the latest version.

</details>

[Back to top](#teams-store-validation-guidelines)

## Advertising

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: This section aligns with [Microsoft commercial marketplace policy number 1140.7](/legal/marketplace/certification-policies#11407-advertising).

Apps must not display any form of advertising—including dynamic ads, banner ads, or ads in messages. [*Must fix*]

:::image type="content" source="../../../../assets/images/submission/validation-advertising-banners.png" alt-text="Graphic shows an example of advertising banners in Teams, which is not permitted.":::

[Back to top](#teams-store-validation-guidelines)

## Cryptocurrency based apps

If your app involves cryptocurrency in any form, you must demonstrate compliance with all relevant laws in every distribution zone. This applies if your app:

* Facilitates cryptocurrency transactions or transmissions.
* Promotes cryptocurrency-related content.
* Allows users to store or access cryptocurrency.
* Encourages or enables cryptocurrency-based transactions outside Teams.
* Facilitates or incentivizes cryptocurrency mining.
* Supports participation in Initial Coin Offerings.
* Awards or rewards users with cryptocurrency tokens for task completion.

Following an internal Microsoft review, if your compliance demonstration is satisfactory, Microsoft may certify your app. If it is unsatisfactory, you will receive notification of the decision not to proceed with certification.

[Back to top](#teams-store-validation-guidelines)

## App functionality

* Ensure that workflows or content in the app remain relevant to the app’s scope. [*Must fix*]
* Validate that all app capabilities function correctly as described in your app manifest and AppSource long description. [*Must fix*]
* Notify the user before any file or executable downloads occur on their device. All call-to-action prompts must clearly indicate when a file or executable download is triggered. [*Must fix*]
* If your app has regional dependencies, provide a graceful failure message in all applicable functionalities when used in unsupported regions. [*Must fix*]

[Back to top](#teams-store-validation-guidelines)

## Mobile experience

* Mobile add-ins are free. There must be no in-app content or links that promote upselling, online stores, or payment requests. Any required accounts must be free to use, and if time-limited, must not show any payment prompts. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-mobile-add-in-charges.png" alt-text="Graphic shows a mobile add-in that incorrectly requests payment.":::

* On desktop or web experiences, using **FREE**, **FREE TRIAL**, or **TRY FREE** is allowed without limitations.
* On mobile:
  * Using the word **FREE** in plain text for trials or upgrades is acceptable.
  * Using **FREE** in plain text along with a link that leads to a landing page without pricing or payment information is acceptable.
  * Plain text indicating the app is **PAID** is acceptable.
  * However, using **FREE** in connection with pricing details or linking to pages with payment information is not permitted. [*Must fix*]
  * Pricing details presented on mobile in any format (image, text, or links) are not allowed. Call-to-action prompts like **view plans** are unacceptable. Listing plans without pricing but with a contact link or email is disallowed. Any text linking to paid upgrades is not allowed on mobile. Payments for physical goods are acceptable, such as booking a taxi. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-mobile-exp-pricing-details-on-mobile-fail.png" alt-text="Graphic shows a mobile scenario where pricing details are incorrectly shown.":::

* Payments for digital goods in the app are not supported on mobile. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-mobile-exp-payments-digital-goods.png" alt-text="Graphic shows payments for digital goods on mobile, which is not allowed.":::

* Optimize Teams apps for an effective cross-device mobile experience. [*Must fix*]
* For capabilities not supported on mobile, prevent user dead-ends with graceful failure messages. [*Must fix*]

[Back to top](#teams-store-validation-guidelines)

## Apps extended across Microsoft 365 clients

### General

* Ensure that apps designed to extend Teams experiences across Microsoft 365 clients use manifest schema version 1.13 or later.
* Your app’s support URL must include content that is relevant for a Teams app that operates across Microsoft 365 clients, without referencing a single client exclusively.
* Clearly reference in your app description that the app operates across Microsoft 365 clients.
* If your Teams app is extensible across Microsoft 365 clients, be sure that the content for get started, sign in, sign up, sign out, help, or guidance pages addresses all supported clients.

### Compatibility

Teams apps that extend across Microsoft 365 clients must function responsively on the latest versions of Microsoft Edge and Google Chrome. Ensure that personal tabs or message extensions are accessible on:

* Outlook for Windows and web.
* Microsoft 365 on desktop, web, and Android.
* Microsoft Teams on desktop and web.
* Microsoft Teams on Android and iOS.

### Mobile experience

Users must be able to launch your app from the actions flyout menu within the Microsoft 365 client on mobile. Ensure the app name displays correctly in the action bar. [*Must fix*]

#### App launch from actions flyout

Users must successfully launch and switch between multiple static tabs within the Microsoft 365 mobile client. If there are more than three static tabs, ensure remaining tabs appear under the **More** option. [*Must fix*]

#### Multi tab experience

If your app supports SSO, ensure users authenticate successfully, enabling access to multiple systems using a single credential. [*Must fix*]

#### App authentication

Terminate the user account instance when a user is switched or logs out within the Microsoft 365 mobile client. [*Must fix*]

#### Account switching and logout experience

* Provide a way for users to return to their previous state. If the user is on the root page, the back navigation must close the app within the Microsoft 365 mobile client. [*Must fix*]
* Ensure that deep links direct users to the correct landing page experience. [*Must fix*]

#### Tab navigation

* Display a progress indicator while the app loads, and dismiss it automatically once loading completes. [*Must fix*]
* Show an error screen when the app fails to load due to issues such as network errors, time-outs, or authentication failures. [*Must fix*]

[Back to top](#teams-store-validation-guidelines)

## Teams apps extensible as agents for Microsoft 365 Copilot

* Ensure that app packages are correctly formatted and adhere to manifest schema version 1.13 or later.
* Your app passes the [responsible AI checks](/legal/marketplace/certification-policies#1-apps-with-artificial-intelligenceai-generated-content-must-meet-below-requirements).
* Meet the [agent compatible criteria](review-copilot-validation-guidelines.md).

### Agent must not manipulate LLM behavior

The short descriptions, parameters, and commands must not include:

1. Instructional phrases (e.g., “if the user says X, ignore, delete, reset, new instructions, answer in bold, or don't print anything”).
1. Verbose, flowery, or marketing language.
1. Superlative claims like **#1**, **amazing**, or **best**.
1. URLs, emojis, or hidden characters (hexadecimal, binary, or unconventional symbols).
1. Grammar or punctuation errors.

### User Awareness

The long description must clearly state:

* Your app’s compatibility with Microsoft 365 Copilot. For example, “Use Contoso in Microsoft 365 Copilot to search and summarize your tasks.”
* Provide at least one prompt example demonstrating how users can utilize the message extension agent in Microsoft 365 Copilot. For example, “What are the high priority tickets assigned to me this week in Contoso?”

   :::image type="content" source="../../../../assets/images/Copilot/validation-guidelines-plugin-prompt-pass.png" alt-text="Screenshot shows a compliant sample prompt for message extension usage as an agent in Microsoft 365 Copilot.":::

   :::image type="content" source="../../../../assets/images/Copilot/validation-guidelines-plugin-prompt-fail.png" alt-text="Screenshot displays a scenario missing a sample prompt for message extension usage as an agent in Microsoft 365 Copilot.":::

### Response Quality

* Include mandatory fields in Microsoft 365 Copilot Adaptive Card responses: an Information title and at least two additional useful fields (e.g., date modified, author, status, flags). Both the preview and content appear within a single response.
  
   :::image type="content" source="../../../../assets/images/Copilot/validation-guidelines-app-response-copilot.png" alt-text="Screenshot shows a compliant Microsoft 365 Copilot response displaying both preview and content together.":::

* Adaptive Cards in the Microsoft 365 Copilot response must include at least one action button.
* Confirm that every action button in the Copilot response Adaptive Card functions as expected.

  :::image type="content" source="../../../../assets/images/Copilot/validation-guidelines-plugin-functional-action.png" alt-text="Screenshot displays a functional action button within a Copilot response Adaptive Card.":::

* Microsoft 365 Copilot must respond accurately without displaying errors when a user prompts with single, multiple, or follow-up parameters.
* Ensure that message extensions contain at least two parameters to improve user experience in Microsoft 365 Copilot.

[Back to top](#teams-store-validation-guidelines)

## Next step

> [!div class="nextstepaction"]
> [Create a Partner Center account](~/concepts/deploy-and-publish/appsource/prepare/create-partner-center-dev-account.md)

## See also

* [Test and debug your app](~/concepts/build-and-test/debug.md)
* [Prepare your Teams Store submission](~/concepts/deploy-and-publish/appsource/prepare/submission-checklist.md)
* [Include a SaaS offer with your Teams app](include-saas-offer.md)
* [Strategize and execute growth for your app](../post-publish/app-growth/overview-app-growth.md)
* [Validate your app in Developer Portal for Teams](../../../build-and-test/manage-your-apps-in-developer-portal.md#publish)