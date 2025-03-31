---
title: Teams Store Validation Guidelines
description: Learn to increase the chances of your app to pass the Teams Store submission process. Understand the must fix and good-to-fix validation guidelines.
author: heath-hamilton
ms.author: surbhigupta
ms.topic: reference
ms.localizationpriority: high
ms.date: 02/25/2025
---

# Teams Store Validation Guidelines

Following these guidelines increases the chances of your app passing the Microsoft Teams Store submission process. The Teams-specific guidelines complement the Microsoft [commercial marketplace certification policies](/legal/marketplace/certification-policies#1140-teams) and are updated frequently to reflect new capabilities, user feedback, and changes in business rules.

> [!NOTE]
> • Some guidelines may not be applicable to your app. For example, if your app doesn't include a bot, you can ignore bot-related guidelines.
> • These guidelines have been cross-referenced with the Microsoft commercial certification policies, and Do’s and Don’ts are provided with illustrative examples from pass or fail scenarios encountered during our validation process.
> • Guidelines marked as *Must fix* are mandatory. If your app submission fails to meet these conditions, you will receive a failure report outlining steps to resolve the issues. An app submission only passes Teams Store validation after you have fixed all such issues.
> • Guidelines marked as *Good-to-fix* describe recommendations that improve the overall user experience. Although your app submission is not blocked from publishing in the Teams Store if these issues are overlooked, it is recommended that you address them.

:::row:::
   :::column:::
      :::image type="icon" source="../../../../assets/icons/ai-apps.png" link="#apps-powered-by-artificial-intelligence" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="../../../../assets/icons/value-proposition.png" link="#value-proposition" border="false":::
   :::column-end:::
   :::column:::
     :::image type="icon" source="../../../../assets/icons/security.png" link="#security" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="../../../../assets/icons/function.png" link="#general-functionality-and-performance" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="../../../../assets/icons/package.png" link="#app-package-and-teams-store-listing" border="false":::
   :::column-end:::
:::row-end:::

:::row:::
   :::column:::
      :::image type="icon" source="../../../../assets/icons/saas-offer.PNG" link="#apps-linked-to-saas-offer" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="../../../../assets/icons/tab.png" link="#tabs" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="../../../../assets/icons/bot.png" link="#bots-1" border="false":::
   :::column-end:::
   :::column:::
     :::image type="icon" source="../../../../assets/icons/messaging-extension.png" link="#message-extensions" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="../../../../assets/icons/task-module.png" link="#dialogs" border="false":::
   :::column-end:::
:::row-end:::

:::row:::
   :::column:::
      :::image type="icon" source="../../../../assets/icons/meeting.png" link="#meeting-extensions" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="../../../../assets/icons/notifications.png" link="#notifications" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="../../../../assets/icons/ms-graph-connectors.png" link="#microsoft-graph-connector" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="../../../../assets/icons/microsoft-365.png" link="#microsoft-365-app-compliance-program" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="../../../../assets/icons/advertising.png" link="#advertising" border="false":::
   :::column-end:::
:::row-end:::

:::row:::
   :::column:::
      :::image type="icon" source="../../../../assets/icons/crypto-currency-based-apps-icon.png" link="#cryptocurrency-based-apps" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="../../../../assets/icons/app-functionality-icon.png" link="#app-functionality" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="../../../../assets/icons/mobile-experience-icon.png" link="#mobile-experience" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="../../../../assets/icons/white-bg.png" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="../../../../assets/icons/white-bg.png" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="../../../../assets/icons/white-bg.png" border="false":::
   :::column-end:::
:::row-end:::

---

## Value Proposition

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
This section aligns with [Microsoft commercial certification policy number 1140.1](/legal/marketplace/certification-policies#11401-value-proposition-and-offer-requirements) and provides additional guidance for developers of Microsoft Teams apps regarding their offer’s value proposition.

Apps must deliver genuine value by enabling users to complete functional workflows that encourage repeated usage. Expand the following sections below to get more details about a compelling value proposition:

<br>

<details>
  <summary><strong>Tabs</strong></summary>

  Tabs should offer more than merely hosting an existing website. They must deliver functionality and value directly within Teams rather than simply displaying a website. [*Must fix*]
  
  :::image type="content" source="../../../../assets/images/submission/validation-usability-app-provides-workflows.png" alt-text="Graphic shows an example of an app with a workflow valuable to channel members within a team.":::
  
  :::image type="content" source="../../../../assets/images/submission/validation-usability-website-i-framed.png" alt-text="Graphic shows an example of an app with an entire website displayed in an I-frame without any back option.":::
  
</details>

<br>

<details>
  <summary><strong>Notification Bots</strong></summary>

  Notifications within Teams provide value when:
  
  1. The posted card or text contains sufficient details, eliminating the need for further user action.
  2. The posted card or text gives a clear preview that helps users decide whether to take action or to view additional details via an external link.
  
  Apps that only send notifications with generic content such as **"You have a new notification"** or **"Click to view"**—and force users to leave Teams for additional details—do not offer significant value.
  
  :::image type="content" source="../../../../assets/images/submission/validation-bot-notification-only-inadequete-info.png" alt-text="Screenshot shows an example of a notification with inadequate preview information.":::
  
</details>

<br>

<details>
  <summary><strong>Message Extensions</strong></summary>

  [*Must fix*]
  
  Search-based message extensions add value by allowing users to share cards that facilitate contextual conversations without leaving the Teams interface.
  
  To pass validation, ensure the following for search-based message extensions:
  
  1. The card shared provides adequate details so that no further action is required.
  2. The card includes enough preview information to prompt a user to take action or decide to click a link for further details.
  
  :::image type="content" source="../../../../assets/images/submission/validation-search-based-messaging-ext-adequete-info.png" alt-text="Validation scenario where messaging extension displays adequate information.":::
  
  :::image type="content" source="../../../../assets/images/submission/validation-search-based-messaging-ext-inadequete-info.png" alt-text="Validation scenario where messaging extension displays inadequate information.":::
  
</details>

<br>

<details>
  <summary><strong>Link Unfurling</strong></summary>
  
  Apps that solely support link unfurling do not provide significant value within Teams. Consider integrating more workflows into your app if link unfurling is your only functionality.
  
</details>

<br>

[Back to top](#teams-store-validation-guidelines)

---

## App Name

[*Must fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
This section complies with Microsoft [commercial certification policy number 1140.1.1](/legal/marketplace/certification-policies#114011-app-name) and offers guidance on naming your app.

<details>
  <summary><strong>Expand to know more</strong></summary>

  An app’s name is critically important for discoverability in the Teams Store. Follow these guidelines when naming your app:

  • The name must have terms that relate to your user’s needs. [*Must fix*]

  • Prefix or suffix common nouns with your developer’s name. For example, use **"Contoso Tasks"** instead of just **"Tasks"**. [*Must fix*]

  • Do not use **"Teams"** or other Microsoft product names such as **Excel**, **PowerPoint**, **Word**, **OneDrive**, **SharePoint**, **OneNote**, **Azure**, **Surface**, or **Xbox**; doing so might falsely suggest co-branding or co-selling. For more details on referencing Microsoft products, see [Microsoft Trademark and Brand Guidelines](https://www.microsoft.com/legal/intellectualproperty/trademarks/usage/general). [*Must fix*]

  • Avoid duplicating the name of an app listed on the Teams Store or any other offer on the commercial marketplace. [*Must fix*]

  • The app name must not contain profane or derogatory language or any racially/culturally insensitive terms. [*Must fix*]

  • The app name must be unique. For apps with regional variations (for example, Contoso app for Mexico), ensure:
      - The app title clearly reflects the region-specific functionality (e.g., **"Contoso Mexico"**) and is consistently referenced in metadata, user experience, and help content. [*Must fix*]
      - When uploading the app package in Partner Center, select the correct **Markets** in the **Availability** section. [*Must fix*]

  • Do not start the app name with core Teams features (e.g., **Chat**, **Contacts**, **Calendar**, **Calls**, **Files**, **Activity**, **Teams**, **Help**) as these may be auto-shortened in the Teams navigation. [*Must fix*]

  • For official partnerships with Microsoft, the app name must list your name first. For example, **"Contoso connector for Microsoft Teams"**.

  • The app name must not reference Microsoft or its products unless your app is officially partnered with Microsoft. In that case, the app name should come first, followed by a reference to Microsoft. [*Must fix*]

  • Avoid using parentheses to mention Microsoft products. [*Must fix*]

  • Ensure your developer name in the app manifest matches the developer name in AppSource. [*Must fix*]

  • App manifests must be production-ready. Do not label app names with terms such as **Beta**, **Dev**, **Preview**, or **UAT**. [*Must fix*]

  • The app name in the app manifest must match the name on AppSource. [*Must fix*]

  > [!TIP]
  > Your app’s branding—including the app name, developer name, icon, AppSource screenshots, video, short description, and website—must not impersonate an official Microsoft offering unless your app is an official Microsoft 1P offering.
  
</details>

---

## Duplicate App

• Apps from the same developer that offer the same functionality should use a single app listing unless separate listings are required due to privacy compliance or government cloud requirements. You must implement business logic to ensure that only one listing is published. [*Must fix*]

  - For example, to support multiple regions, the app’s business logic should handle region-specific functionality while maintaining a single listing.
  
  :::image type="content" source="../../../../assets/images/submission/validation-guidelines-pass-region-app-manifest.png" alt-text="Screenshot showing a successful scenario of region requirements addressed with business logic.":::
  
  - Similarly, for on-premises and on-cloud environments, the business logic should handle different endpoints while publishing one listing.

---

## Suitable for Workplace Consumption

[*Must fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
This section is in line with Microsoft commercial certification policies [1140.1.2](/legal/marketplace/certification-policies#114012-workplace-appropriateness), [100.8](/legal/marketplace/certification-policies#1008-significant-value), and [100.10](/legal/marketplace/certification-policies#10010-inappropriate-content) to ensure your app content is appropriate for a professional environment.

<details>
  <summary><strong>Expand to know more</strong></summary>

  • App content must be suitable for general workplace use. Content related to religion, politics, gambling, or prolonged entertainment is forbidden. [*Must fix*]

  • Your app should enhance group collaboration or individual productivity. Apps for team bonding or socializing must be designed for group use and should not require sessions lasting more than 60 minutes or compromise productivity. [*Must fix*]

  • Content aggregator apps must include a user-facing mechanism to report issues or inappropriate content back to the publisher. [*Must fix*]
  
  :::image type="content" source="../../../../assets/images/submission/validation-guidelines-content-aggregator-app.png" alt-text="Screenshot showing appropriate issue reporting for a content aggregator app.":::
  
</details>

---

## Similar Platforms and Services

[*Must fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
According to [Microsoft commercial certification policy number 1140.1.3](/legal/marketplace/certification-policies#114013-other-platforms-and-services), apps must focus on the Teams experience. Do not include names, icons, or imagery of similar chat-based collaboration platforms in your app's content or metadata unless your app offers interoperability with them.

---

## Feature Names

Ensure that the feature names used in buttons or other UI elements do not mimic Microsoft Teams or other Microsoft products. For example, instead of using **"Start meeting"**, consider using a distinct name like **"Start Contoso meeting"** to avoid confusion.

---

## Authentication

[*Must fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
This section follows [Microsoft commercial certification policy number 1140.1.4](/legal/marketplace/certification-policies#114014-access-to-services) and provides guidance for authenticating your app with external services. For detailed information, refer to [authentication in Teams](~/concepts/authentication/authentication.md).

<details>
  <summary><strong>Expand to know more</strong></summary>

  ### Authenticating with External Services

  If your app uses an external service for authentication:
  
  • **Sign in, Sign out, and Sign up Experiences:**
    - The app must provide clear and user-friendly experiences for sign in, sign out, and sign up actions. [*Must fix*]
    - On sign out, the user should only be signed out of the app while remaining signed in to Teams. [*Must fix*]
    - Provide a clear path for new users to sign up or get more information about the external service (this information should be included in the app’s manifest, the AppSource long description, or the app’s first run experience). [*Must fix*]
    - If the app setup requires an admin to complete a one-time configuration, clearly indicate this dependency in the app’s manifest, AppSource long description, and any first run welcome messages or help text. [*Must fix*]

  • **Content Sharing Experiences:**
    - If authentication is required for users to share content in Teams channels, include detailed help documentation that explains how users can disconnect or unshare content if supported by the service. Note that the ability to unshare content does not have to be built into your Teams app.
  
</details>

---

## Audio

• If your app is mainly intended for music listening, it must support at least one collaborative scenario that includes complete workflows such as sharing playlists, configuring, pinning playlists, and enabling synchronous listening experiences. [*Must fix*]

• For apps primarily designed for music listening, integrating a collaborative co-listening experience is recommended. [*Good-to-fix*]

---

## Security

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
This section adheres to [Microsoft commercial certification policy number 1140.3](/legal/marketplace/certification-policies#11403-security).

[Back to top](#teams-store-validation-guidelines)

### Financial Information

[*Must fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
This section complies with [Microsoft commercial certification policy number 1140.3.1](/legal/marketplace/certification-policies#114031-financial-transactions) and outlines the guidelines for handling financial information within the Teams interface, especially regarding payment scenarios on mobile (Android and iOS) versions.

<details>
  <summary><strong>Expand to know more</strong></summary>

  • Apps must not request users to make payments or transmit financial details within the Teams interface via bot interactions. [*Must fix*]
  
  :::image type="content" source="../../../../assets/images/submission/validation-financial-information-1.png" alt-text="Validation scenario for proper handling of financial information.":::
  
  • You may provide a link to an external secure payment service if this is disclosed in your terms of use, privacy policy, profile, or website before the user agrees to use the app. [*Must fix*]
  
  • Do not facilitate payments for goods or services that are prohibited by [General policy number 100.10 Inappropriate Content](/legal/marketplace/certification-policies#10010-inappropriate-content). [*Must fix*]
  
  • For apps running on iOS or Android:
    - Do not include in-app purchases, trial offers, or UI elements that upsell users to paid versions or external online stores. [*Must fix*]
    
    :::image type="content" source="../../../../assets/images/submission/validation-financial-information-in-app-purchase.png" alt-text="Example of an in-app purchase issue.":::
    
    :::image type="content" source="../../../../assets/images/submission/validation-financial-information-online-stores.png" alt-text="Example of an online store upsell issue.":::
    
    - If the app requires an account, ensure that user signup is completely free. The term **"free"** or **"free account"** must not be used incorrectly. [*Must fix*]
    
    - If an account has an expiration, the UI must not indicate that a payment is required once the account expires. [*Must fix*]
    
    - Both the privacy policy and terms of use should be free from commerce-related UI or links. [*Must fix*]
  
</details>

### Bots

[*Must fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
This section complies with [Microsoft commercial marketplace policy number 1140.3.2](/legal/marketplace/certification-policies#114032-bots-and-messaging-extension).

<details>
  <summary><strong>Expand to know more</strong></summary>

  For apps using the Microsoft Azure Bot Service (such as bots and message extensions):
  
  • Adhere to all requirements outlined in the Microsoft [Online Services Terms](https://www.microsoftvolumelicensing.com/DocumentSearch.aspx?Mode=3&DocumentTypeId=46).
  
  • Bots must always ask for permission before uploading a file and must display a confirmation message to the user.
  
  :::image type="content" source="../../../../assets/images/submission/validation-bot-confirmation-message.png" alt-text="Validation example of a bot confirmation message.":::
  
</details>

### External Domains

[*Must fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
This section follows [Microsoft commercial marketplace policy number 1140.3.3](/legal/marketplace/certification-policies#114033-external-domains) and provides guidelines for declaring valid external domains in your app manifest.

<details>
  <summary><strong>Expand to know more</strong></summary>

  • Do not include domains that fall outside of your organization’s control (wildcards or tunneling services are not allowed) in your app's domain configurations, with these exceptions:
    - If your app relies on SharePoint, include the root SharePoint site (using the `{teamSiteDomain}` context property). [*Must fix*]
    - Do not use top-level domains such as **.com**, **.in**, or **.org** as valid domains. [*Must fix*]
    - Avoid using **.onmicrosoft.com** as a valid domain unless the domain is under your control. You may use a controlled domain like **yoursite.com**, even if it includes a wildcard, provided it is under your control. [*Must fix*]
    - For PowerApps built on the Microsoft Power Platform, include *apps.powerapps.com* as a valid domain so that your app is accessible within Teams.
    - External domains listed must only include the domain name (no URL schemes like www or https). [*Must fix*]
    - If you use the Azure Bot Service's OAuthCard, include *token.botframework.com* as a valid domain. Do not declare *.botframework.com* because wildcards are disallowed. [*Must fix*]
    - OpenAPI URLs must be under partner control.
    - The following external domains are prohibited: [*Must fix*]
      • *.azurewebsites.net  
      • *.azureedge.com  
      • *.microsoft.com  
      • *.microsoftonline.com  
      • *.onmicrosoft.com  
      • go.microsoft.com  
      • teams.microsoft.com
  
  • When using wildcards:
    - A wildcard in a subdomain segment must be the only character in that segment.
    - Any segment preceding a wildcard segment must also be a complete wildcard.
    - For example, *\*.\*.domain.com* is valid, but *foo.\*.myteam.domain.com* is not.
  
</details>

### Sensitive Content

[*Must fix*]

• Your app must not post sensitive data (e.g., credit card details, financial payment information, health information, contact tracing data, or other personally identifiable information) to an audience that is not intended to see it.

• The app must warn users before downloading any files or executables (e.g., .exe files) to the user's device.

---

## General Functionality and Performance

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
This section aligns with [Microsoft commercial marketplace policy number 1140.4](/legal/marketplace/certification-policies#11404-functionality) and outlines essential performance and functionality requirements.

• Clear "way forward" instructions are required for both administrators and existing users. These instructions can be provided as hyperlinks (e.g., sign up links, contact details, help links, or email addresses).

• If your app depends on account setup or has limitations, these dependencies must be clearly disclosed both in the app manifest (in the long description) and in the AppSource app listing.

• Always call out any dependency on an administrator for new users; if there is none, provide alternative ways for users to sign up, get started, contact support, or access help.

[Back to top](#teams-store-validation-guidelines)

### Launching External Functionality

[*Must fix*]

• Apps must not force users outside of Teams for core workflows. All primary app content and interactions should happen using Teams features such as bots, Adaptive Cards, tabs, and dialogs (known as task modules in TeamsJS v1.x).

> [!NOTE]
> To redirect users to your app’s native experience (using deep links with protocols like `tel:`, `mailto:`, or `webex:`), open the link in a new window using the `window.open` method or an anchor tag with `target="_blank"`.

<details>
  <summary><strong>Expand to know more</strong></summary>

  • Ensure that navigation remains within the Teams app unless explicit user permission is granted to navigate externally. [*Must fix*]
  
  • Buttons that launch external functionality must clearly indicate the redirection. For example, include labels like **"View in Contoso.com"** or **"This way to Contoso.com"** and add a pop-out icon to signal the redirection. [*Must fix*]
  
  • If you cannot add a pop-out icon, implement alternatives such as:
    - Adding a note in an Adaptive Card stating that selecting **"Get Help using this app"** directs users outside of Teams.
    - Displaying interstitial dialogs to notify users before redirection.
  
</details>

### Compatibility

[*Must fix*]

• Your app must be fully functional on the latest versions of the following:
  - Microsoft Windows
  - macOS
  - Microsoft Edge
  - Google Chrome
  - iOS
  - Android

• On unsupported browsers and operating systems, the app should gracefully inform users with a polite failure message.

### Response Time

[*Must fix*]

Teams apps are expected to respond quickly to user actions, or at the very least, show a loading or typing indicator. For instance:

• Tabs must load within two seconds or display a loading message or warning. [*Must fix*]

• Bots should respond or, at minimum, display a typing indicator within two seconds of a user command. [*Must fix*]

• Message extensions must also respond within two seconds. [*Must fix*]

• Notifications must display within two seconds of the triggering user action. [*Must fix*]

---

## Apps Powered by Artificial Intelligence

Resources and guidelines related to responsible AI practices are available at [Microsoft RAI Toolkit](https://www.microsoft.com/en-us/ai/responsible-ai-resources) and [HAX Toolkit Project](https://www.microsoft.com/en-us/research/project/hax-toolkit/).

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
This section complies with [Microsoft commercial marketplace policies for Apps with AI generated content](/legal/marketplace/certification-policies#1-apps-with-artificial-intelligenceai-generated-content-must-meet-below-requirements) and for apps using facial recognition capabilities. Follow these supplementary guidelines for AI-related functionality:

### Apps with AI-Generated Content

• The app must not generate, contain, or offer access to harmful, inappropriate, or offensive AI-generated content. [*Must fix*]

  Consider these optional practices:
  
  - Utilize the [Teams AI library](~/bots/how-to/teams-conversational-ai/teams-conversation-ai-overview.md) for integrating GPT-based models or user intent engines. [*Good-to-fix*]
  - Implement moderation hooks via a moderation API to help filter and manage bot responses. [*Good-to-fix*]
  - Include conversation sweeping capabilities that monitor and rectify conversations if they stray off course. [*Good-to-fix*]

• Provide in-app mechanisms that allow users to report inappropriate or harmful AI-generated content. This may include an email address or a direct link to a reporting portal. [*Must fix*]

• Ensure that any reported concerns are acted upon promptly. [*Must fix*]

• Clearly describe in both the app’s listing and in-app functionality how AI features work before the customer acquires the offer, consistent with policy [100.1.3](/legal/marketplace/certification-policies#10013-description). [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/teams-ai-library-description-guideline.png" alt-text="Example of a clear AI functionality description.":::

### Apps Using Facial Recognition Capabilities

> [!NOTE]
> Apps utilizing facial recognition may be subject to additional review to ensure adherence to Microsoft’s Responsible AI principles.

• Your app must not provide facial recognition for law enforcement purposes (e.g., identifying individuals for police departments in the United States). [*Must fix*]

• Clearly indicate in the app description if your app uses facial recognition or emotional inference technologies. [*Must fix*]
  - Note that if your app infers emotional states by analyzing facial expressions (e.g., detecting sadness or anger), it may be subject to restrictions.
  - However, detecting and classifying individual facial elements such as smiles is permitted.
  
---

## App Package and Teams Store Listing

[*Must fix*]

Your app package must be correctly formatted, including all the necessary information and components to support its listing on the Teams Store.

> [!TIP]
> • Ensure that any test accounts or configuration environments provided remain valid until the app goes live on the marketplace.
> • Include detailed testing instructions such as:
>   - **Steps to configure app test accounts** (for apps relying on external authentication).
>   - A summary of **expected app behavior** for core workflows.
>   - A clear description of any **limitations, conditions, or exceptions** in the app description and related materials.
>   - Emphasis on any considerations for testers while validating your app.
>   - Prepopulate test accounts with dummy data to simplify testing.
>   - Enable third-party integrations if test accounts are provided.

[Back to top](#teams-store-validation-guidelines)

### App Manifest

[*Must fix*]

The app manifest describes the configuration for your app.

• It must adhere to a publicly released manifest schema. For details, see [app manifest reference](~/resources/schema/manifest-schema.md). Do not submit using a preview schema version.

• If your app includes a bot or message extension, ensure that all details (bot name, logo, privacy policy URL, and terms of service URL) are consistent with the Bot Framework metadata.

• For apps using Microsoft Entra ID for authentication, include the Microsoft Entra Application (client) ID in the manifest. For more, see [app manifest reference](~/resources/schema/manifest-schema.md#webapplicationinfo).

### Uses of the Latest App Manifest Schema

• For Single sign-on (SSO) apps, include Microsoft Entra ID in the manifest for authentication purposes. [*Must fix*]

• Always use a publicly released app manifest schema. You may update your app package to use schema version 1.10 or later. [*Must fix*]

• When submitting an update:
  - Only increase the version number.
  - The App ID of the update must match that of the published app. [*Must fix*]

• Additional files included in the app package beyond those specified are not acceptable. [*Must fix*]

• The version in the app manifest and in any localized app manifest files must be identical. [*Must fix*]

• Use manifest schema version 1.5 or later to enable localization. Update the `$schema` attribute and the `manifestVersion` property accordingly. [*Must fix*]

• Any change to capabilities, manifest, or Partner Center metadata requires you to increment the app version number in your Partner Center account for validation. [*Must fix*]

• The version string must adhere to the Semantic Versioning (SemVer) specification (MAJOR.MINOR.PATCH). [*Must fix*]

• If your app requires admin review for permissions in the Teams admin center, declare `webapplicationinfo` in the manifest. Without this, the Permissions page in Teams admin may display as **...**. [*Must fix*]

• A production version of the manifest must be submitted as part of Teams app certification. [*Must fix*]

• It is recommended (though not required) to include your Microsoft Cloud Partner Program ID (formerly Microsoft Partner Network ID) in the manifest. [*Good-to-fix*]

• Any scopes or contexts declared in the manifest must be visibly accessible within your app. [*Must fix*]

### App Icons

[*Must fix*]

Icons are key for app discoverability in the Teams Store.

<details>
  <summary><strong>Expand to know more</strong></summary>

  • The color icon and outline icon provided must be identical. [*Must fix*]
  
     :::image type="content" source="../../../../assets/images/submission/color-outline-icon-same.png" alt-text="Color icon and outline icon match.":::
  
     :::image type="content" source="../../../../assets/images/submission/color-outline-icon-not-same.png" alt-text="Color icon and outline icon do not match.":::
  
  • Your app package must include two PNG icons: one color and one outline. [*Must fix*]
  
  • The marketplace icon (uploaded in Partner Center) must match the color icon in your package. [*Must fix*]
  
  • The color icon should be 192x192 pixels on a solid or fully transparent square background. [*Must fix*]
  
  • The outline icon, used in various Teams UI elements (like the left navigation or pinned message extension), must be 32x32 pixels with either a white icon on a transparent background or vice versa. There must be no extra padding. [*Must fix*]
  
  • Ensure that the icons are correctly sized, formatted, and match the metadata in your Teams Store listing. [*Must fix*]
  
  For further details, refer to the [icon guidelines](~/concepts/build-and-test/apps-package.md#app-icons).
  
</details>

### App Descriptions

Your app requires both a short and a long description for proper listing. These descriptions improve discoverability in the Teams Store. Ensure that the app configuration description and the metadata in Partner Center match.

• An adequate description is crucial:
  
  :::image type="content" source="../../../../assets/images/submission/validation-app-description-adequete-information.png" alt-text="Screenshot of an adequate app description.":::
  
  :::image type="content" source="../../../../assets/images/submission/validation-app-description-inadequete.png" alt-text="Screenshot of an inadequate app description.":::
  
<details>
  <summary><strong>Expand to know more</strong></summary>

  • Descriptions must not disparage other brands, directly or indirectly. Avoid unsubstantiated claims (e.g., Guaranteed 200% efficiency increase). [*Must fix*]
  
  • Your description must not contain comparative marketing language or competitor references (including logos or trademarks). [*Must fix*]
  
     :::image type="content" source="../../../../assets/images/submission/validation-app-description-comparitive-marketing-fail.png" alt-text="Example of inadmissible comparative marketing in an app description.":::
  
  • While hyperlinking support or contact details in the description is acceptable, it is recommended to avoid doing so. [*Good-to-fix*]
  
     :::image type="content" source="../../../../assets/images/submission/validation-app-description-contact-deatils-hyperlinked.png" alt-text="Example of hyperlinked contact details in an app description.":::
  
     :::image type="content" source="../../../../assets/images/submission/validation-app-description-contact-deatils-not-hyperlinked.png" alt-text="Example of non-hyperlinked contact details in an app description.":::
  
  • Clearly state the intended audience, explain your app's unique value proposition, list supported Microsoft and third-party software, and include any prerequisites or limitations. For example, specify if an Enterprise account or a paid subscription is required. [*Must fix*]
  
     - Include information about any dependencies (e.g., regional, language-specific, or role-based requirements). 
     
        :::image type="content" source="../../../../assets/images/submission/validation-app-description-limitations-calledout-pass.png" alt-text="Screenshot showing limitations clearly called out in an app description.":::
        
        :::image type="content" source="../../../../assets/images/submission/validation-app-description-limitations-not-calledout-fail.png" alt-text="Screenshot showing limitations not clearly stated in an app description.":::
  
  • For region-specific apps, clearly state the regional dependency in the manifest, Partner Center, and AppSource.
  
  • When referencing Teams, the first instance must always be written as "Microsoft Teams." Subsequent references may use "Teams." [*Must fix*]
  
     :::image type="content" source="../../../../assets/images/submission/validation-app-description-teams-reference-pass.png" alt-text="Example of correct reference to Teams.":::
  
     :::image type="content" source="../../../../assets/images/submission/validation-app-description-teams-reference-fail.png" alt-text="Example of incorrect reference to Teams.":::
  
  #### Short Description
  • The short description should be one concise sentence highlighting your app’s primary value proposition.
  
    **Dos:**
      - Keep it concise with the key points upfront.
      - Use relevant keywords without repeating the app name.
  
    **Don't:**
      - Avoid using the word **"app"** in this description. [*Good-to-fix*]
  
  #### Long Description
  • The long description should provide a compelling and detailed narrative about your app, targeted at your audience and industry.
  
    **Dos:**
      - Utilize [Markdown](https://support.office.com/article/use-markdown-formatting-in-teams-4d10bd65-55e2-4b2d-a1f3-2bebdcd2c772) for formatting.
      - Use active voice and direct language (e.g., "You can...").
      - List key benefits (up to three) and features using bullet points.
      - Describe limitations, conditions, or exceptions related to capabilities clearly.
      - Include help or support links.
      - Refer to **Microsoft 365** instead of **Office 365**.
      - Use phrases like **"works with Microsoft Teams"**, **"integrated with Microsoft Teams"**, etc.
  
    **Don'ts:**
      - Exceed 500 words.
      - Abbreviate **Microsoft** as **MS** or **MSFT** on first mention. [*Must fix*]
  
         :::image type="content" source="../../../../assets/images/submission/validation-app-description-microsoft-abbreviated.png" alt-text="Abbreviated Microsoft, which is not allowed.":::
  
         :::image type="content" source="../../../../assets/images/submission/validation-app-description-microsoft-not-abbreviated.png" alt-text="Correct usage of Microsoft.":::
  
      - Imply that your app is an official Microsoft offering. [*Must fix*]
  
         :::image type="content" source="../../../../assets/images/submission/validation-app-description-offering-from-microsoft.png" alt-text="Incorrect reference to an offering from Microsoft.":::
  
         :::image type="content" source="../../../../assets/images/submission/validation-app-description-no-offering-indication-from-microsoft.png" alt-text="Proper app description without implying an official Microsoft offering.":::
  
      - Use phrases such as **"certified for"** or **"powered by"** unless you are an officially certified partner.
      - Contain typos, grammatical errors, or excessive use of capitalization.
      - Include links to external marketplaces (like AppSource) in the description.
      - Make unverified or exaggerated claims.
      - Compare your app with other marketplace offers.
  
  For more detailed guidance, see [checklist to write app descriptions](submission-checklist.md#write-descriptions).
  
</details>

### Screenshots

Screenshots provide a visual preview of your app and should complement the name, icon, and description in your listing.

<details>
  <summary><strong>Expand to know more</strong></summary>

  • You can include 3 to 5 screenshots; up to five per listing is allowed.
  
  • Supported file types: PNG, JPEG, and GIF. Recommended dimensions are 1366x768 pixels with a maximum size of 1,024 KB.
  
  **Dos:**
    - Showcase your app’s capabilities clearly (e.g., how users interact with your bot).
    - Use screenshots that accurately reflect your app’s functionality.
    - Avoid overuse of text. Use clear captions to explain features.
    - Ensure at least one screenshot demonstrates mobile functionality. [*Good-to-fix*]
  
       :::image type="content" source="../../../../assets/images/submission/validation-guidelines-pass-app-functionality-mobile.png" alt-text="Screenshot of a mobile app functionality example.":::
  
    - Use mockups that reflect your app’s actual UI. [*Must fix*]
  
       :::image type="content" source="../../../../assets/images/submission/validation-guidelines-fail-suppliement-screenshot.png" alt-text="Example of a screenshot with supplement content.":::
  
       :::image type="content" source="../../../../assets/images/submission/validation-guidelines-fail-actual-UI.png" alt-text="Example of a screenshot showing the app's actual UI incorrectly.":::
  
    - Screenshots must depict genuine Teams functionality or integration. [*Must fix*]
  
       :::image type="content" source="../../../../assets/images/submission/validation-guidelines-fail-app-functionality.png" alt-text="Example of a screenshot failing to depict app functionality within Teams.":::
  
    - Ensure that screenshots do not include incorrect references to Teams (e.g., MS, MSFT, or MS Teams). [*Must fix*]
  
    - For Teams apps that are extensible across Microsoft 365 clients, include appropriate screenshots for those platforms. [*Good-to-fix*]
  
       :::image type="content" source="../../../../assets/images/submission/validation-guidelines-pass-app-functionality-MS-365.png" alt-text="Example of correct Teams app functionality in Microsoft 365 clients.":::
  
    - Captions should be provided to make the app features clear. [*Must fix*]
  
       :::image type="content" source="../../../../assets/images/submission/validation-guidelines-pass-app-functionality.png" alt-text="Example of a well-captioned app functionality screenshot.":::
  
    - If your app supports Tabs, ensure that listing screenshots show the Teams chrome. [*Must fix*]
  
       :::image type="content" source="../../../../assets/images/submission/validation-guildelines-pass-tabs-capability.png" alt-text="Example of a static tab screenshot in Teams.":::
  
    - Use screenshots that accurately reflect the app’s actual UI rather than mock-ups taken out of context. [*Must fix*]
  
  **Don'ts:**
    - Avoid screenshots that show the app outside the Teams environment.
  
       :::image type="content" source="../../../../assets/images/submission/validation-guidelines-fail-app-functionality-teams.png" alt-text="Example of app functionality shown outside Teams.":::
  
</details>

### Videos

Videos are an excellent way to demonstrate your app’s value proposition. You can add a video URL from YouTube or Vimeo that showcases the setup and use of your app.

**Recommendations:**

• The video should be short, engaging, and high quality.
  
• It must illustrate how to set up and use your app, preferably in a narrative style.
  
• Recommended durations:
  - 60–90 seconds for a value-illustration video.
  - 3–5 minutes for a walkthrough or demo video. [*Good-to-fix*]
  
• Ensure that:
  - Advertisements are disabled in your YouTube or Vimeo settings before submitting.
  - The video emphasizes your app’s functionalities within Teams. [*Must fix*]
  - The video URL is accessible and in one of these formats:
    - YouTube: `https://www.youtube.com/watch?v=:id` or `https://youtu.be/:id`
    - Vimeo: `https://vimeo.com/:id`
  
   :::image type="content" source="../../../../assets/images/submission/video-app-listing-partner-center.png" alt-text="Example of an app listing video issue in Partner Center.":::
  
• Optionally, the video can be featured first in the screenshot/video carousel on both the Teams Store and AppSource.

### Privacy Policy

[*Must fix*]

• Your app’s privacy policy can be specific to your Teams app or apply to all your services.
  
Key requirements:
  - If using a generic template, mention the applicable services, applications, or platforms.
  - Explain how user data is stored, retained, and deleted, along with the security controls in place.
  - Provide contact information.
  - Do not include broken or beta/staging URLs.
  - Avoid links to AppSource.
  - Ensure access to the privacy policy does not require authentication.
  - The same privacy policy URL must be used in both the app manifest and AppSource.

### Terms of Use

[*Must fix*]

• The Terms of Use must:
  
  - Be specific to your offering.
  - Be hosted on your domain and use HTTPS.
  - Be accessible without authentication.
  - Match the URL provided in both the app manifest and AppSource.

### Support Links

[*Must fix*]

• Your app's support URLs must not require authentication. Users should be able to contact you easily.
  
<details>
  <summary><strong>Expand to know more</strong></summary>

  • Include your contact details or instructions for raising a support ticket.
  
  For instance, if your support page is hosted on GitHub, ensure that the repository is under your ownership and clearly displays support contact details.
  
  :::image type="content" source="../../../../assets/images/submission/validation-supportlinks-authentication.png" alt-text="Example of support links requiring authentication (not allowed).":::
  
</details>

### Localization

[*Must fix*]

• If your app supports multiple languages, include a localization file that conforms to the Teams localization schema. For further details, refer to [Teams localization schema](~/concepts/build-and-test/apps-localization.md).
  
• App metadata must be consistent across all languages, and the supported languages must be noted in the AppSource description.
  
• If a user's client language does not match any additional languages, the default language (defined in `localizationInfo`) will be used. Ensure this property is updated with the correct default language. [*Must fix*]

---

## Apps Linked to SaaS Offer

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
This section complies with [Microsoft commercial marketplace policy number 1140.5](/legal/marketplace/certification-policies?branch=pr-en-us-5673). When building a Teams app linked to a Software as a Service (SaaS) offer, adhere to the following guidelines:

<details>
  <summary><strong>General</strong></summary>

  • ISVs must enable multiple users (subscribers) within the same tenant to manage their subscription and assign licenses.
  
  • The offer must meet all the [technical requirements](/microsoftteams/platform/concepts/deploy-and-publish/appsource/prepare/include-saas-offer) for Teams apps linked to a SaaS offer.
  
  • The Teams app linked to a SaaS offer must comply with all requirements in [1000 Software as a Service (SaaS)](/legal/marketplace/certification-policies#1000-software-as-a-service-saas).
  
  • In the app manifest, include the `subscriptionOffer` node with the value `publisherId.offerId`. For example, if your publisher ID is `contoso1234` and your offer ID is `offer01`, then it must be reflected as `contoso1234.offer01`. [*Must fix*]
  
  • The associated SaaS offer must be live on AppSource; preview offers are not accepted.
  
</details>

<br>

<details>
  <summary><strong>Offer Metadata</strong></summary>

  • Ensure offer metadata is consistent across the app manifest, the Teams app listing on AppSource, and the SaaS offer details.
  
  • The Teams app and the SaaS offer should come from the same publisher. The SaaS offer referenced in the app manifest must belong to the same publisher as the Teams app submission.
  
  • Since your offer is a Teams app linked to a SaaS offer, select **Additional purchases** as **Yes, my product requires purchase of a service or offers additional in-app purchases​** in the Partner Center product setup.
  
  • Clearly describe plan details, pricing, limitations, dependencies, and exceptions in the subscription plan details.
  
</details>

<br>

<details>
  <summary><strong>SaaS Offer Home Page and License Management</strong></summary>

  • Provide a clear introduction for subscribers.
  
  • Include functionality for subscribers to assign licenses.
  
  • Offer multiple support channels (FAQ, knowledge base, email, etc.) for managing issues.
  
  • Validate users to avoid duplicate license assignments.
  
  • Notify users after license assignments.
  
  • Offer guidance on adding the app to Teams and getting started.
  
  • For SaaS apps using [Microsoft license management](manage-third-party-apps-license.md), ensure that after the subscription is confirmed, users are redirected to Microsoft license management in Teams rather than a dead-end.
  
</details>

<br>

<details>
  <summary><strong>Usability and Functionality</strong></summary>

  • After a successful purchase and license assignment, provide:
    - Access to all subscribed features.
    - Clear indications of the subscription plan value.
    - A link from the Teams app to the SaaS application home page so subscribers can manage their licenses later.
  
</details>

<br>

<details>
  <summary><strong>Configure and Test SaaS Applications</strong></summary>

  If your app setup and testing involve complex configurations:
  
  • Provide comprehensive end-to-end documentation along with SaaS offer configuration steps and testing instructions for license and user management.
  
  > [!TIP]
  > Videos demonstrating how the app and license management work can be extremely helpful for testers.
  
</details>

[Back to top](#teams-store-validation-guidelines)

---

## Tabs

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
This section aligns with [Microsoft commercial marketplace policy number 1140.4.2](/legal/marketplace/certification-policies#114042-tabs). If your app includes a tab, it must adhere to these guidelines.

> [!TIP]
> For detailed design recommendations, see [Teams tab design guidelines](~/tabs/design/tabs.md).

<br>

<details>
  <summary><strong>Setup</strong></summary>

  • The tab setup must not create a dead-end scenario for new users. Include messaging that explains how to complete the setup or workflow. [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-tabs-setup-new-user.png" alt-text="Example of a tab with improper setup causing a dead-end.":::
  
  • The configuration experience should remain within Teams. Do not require users to leave Teams to create or modify content. [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-tabs-setup-profile-name.png" alt-text="Proper tab configuration without leaving Teams.":::
  
  • The configuration screen should not simply embed an entire website. Focus on guiding users to select or input the necessary configuration settings. [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-tabs-setup-configuration-experience.png" alt-text="Focused tab configuration experience.":::
  
      :::image type="content" source="../../../../assets/images/submission/validation-tabs-setup-configuration-screen.png" alt-text="Example of a clear tab configuration screen.":::
  
  • If your tab requires users to input a URL:
    - Provide clear guidance to obtain or generate the URL. [*Must fix*]
    - Validate that the URL is appropriate for your app’s functionality. [*Must fix*]
    
      :::image type="content" source="../../../../assets/images/submission/validation-tab-configuration-way-forward-url-pass.png" alt-text="Tab configuration with appropriate guidance for URL input.":::
  
      :::image type="content" source="../../../../assets/images/submission/validation-tab-configuration-way-forward-url-fail.png" alt-text="Tab configuration lacking proper guidance for URL input.":::
  
  • Hyperlink the “contact us” information instead of displaying it as plain text to enable easy access to support. [*Must fix*]
  
  • For an enhanced first run experience, consider including your support URL or email as a hyperlink in the configuration screen. [*Good-to-fix*]
  
</details>

<br>

<details>
  <summary><strong>Views</strong></summary>

  • The sign-in screen must not display overly large logos. [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-views-applogin.png" alt-text="Example of inappropriate sign-in screen with oversized logos.":::
  
  • Consider breaking down content across multiple tabs to simplify user experience.
  
      :::image type="content" source="../../../../assets/images/submission/validation-views-multiple-tabs.png" alt-text="Tab view with multiple screens for clarity.":::
  
  • Remove duplicate headers or logos that are already provided by the Teams framework. [*Good-to-fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-views-no-duplicate-header-logo.png" alt-text="Correctly configured tab without duplicate headers.":::
  
      :::image type="content" source="../../../../assets/images/submission/validation-views-duplicate-header-logo.png" alt-text="Tab with duplicate headers and logos, which should be avoided.":::
  
</details>

<br>

<details>
  <summary><strong>Navigation</strong></summary>

  • Ensure that navigation within tabs does not conflict with Teams’ primary navigation:
    - Avoid incorporating a navigation rail that mimics the Teams left rail (icons only or icons with stacked text, especially in a collapsible format). Instead, use inline text, icon-text combinations, or hamburger menus. [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-navigation-static-tab.png" alt-text="Example of suitable navigation in a tab.":::
  
      :::image type="content" source="../../../../assets/images/submission/validation-navigation-left-navigation.png" alt-text="Example of conflicting left navigation in a tab.":::
  
  • If your tab includes a toolbar on the left, maintain at least 20 pixels spacing from the native Teams left navigation. [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-navigation-spacing-between-toolbar.png" alt-text="Illustration of proper spacing between custom toolbar and Teams navigation.":::
  
  • For secondary and tertiary pages within a tab:
    - Open these views as level two (L2) and level three (L3) pages, using breadcrumbs or left navigation to distinguish levels.
    - Use back buttons, page headers, or hamburger menus to support navigation.
    
      :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-improper-navigation-leveles.png" alt-text="Example showing improper multi-level navigation that should be corrected.":::
  
  • Deep links within tabs must navigate to other parts of Teams (like dialogs or other tabs) and must not point to external web pages. [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-navigation-view-button-not-linked-static-tab.png" alt-text="Deep link issue in a static tab where it incorrectly navigates externally.":::
  
  • Ensure that tabs do not cause core workflows to navigate outside of Teams, unless absolutely necessary. [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-navigation-core-workflow-within-configuration.png" alt-text="Correct navigation within configuration.":::
  
      :::image type="content" source="../../../../assets/images/submission/validation-navigation-core-workflow-redirects-outside.png" alt-text="Incorrect redirection outside Teams for core workflow.":::
  
  • Horizontal scrolling should not be present in in-meeting tabs. [*Must fix*]
  
  • Provide a back button option to allow users to return to the previous state. [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/back-button-available.png" alt-text="Example showing back button available.":::
  
      :::image type="content" source="../../../../assets/images/submission/no-back-button-available.png" alt-text="Example showing absence of a back button.":::
  
  • Adaptive Cards within tabs must not show horizontal scrolling. [*Must fix*]
  
  • For bottom navigation rails, ensure that any custom navigation does not interfere with Teams’ native mobile navigation; avoid conflicts. [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-tab-bottom-rail-conflicts-with-teams-mobile.png" alt-text="Example where a custom bottom rail in a tab conflicts with Teams mobile navigation.":::
  
</details>

<br>

<details>
  <summary><strong>Usability</strong></summary>

  • Ensure that content in your tabs does not truncate or overlap. [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-usability-content-truncation.png" alt-text="Example showing content truncation issues.":::
  
  • Provide users with the ability to undo their last action. [*Must fix*]
  
  • In personal tabs, consider aggregating shared content from app instances (e.g., a project management app could consolidate comments from channel members). [*Good-to-fix*]
  
  • Tabs should respond to theme changes in Teams, so that when users switch themes, the app’s appearance updates accordingly. [*Good-to-fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-usability-responsive-tabs.png" alt-text="Example of responsive tab adapting to theme changes.":::
  
      :::image type="content" source="../../../../assets/images/submission/validation-usability-unresponsive-tabs.png" alt-text="Example of a tab not responsive to theme changes.":::
  
  • It is recommended to use Teams-styled components (following Teams fonts, color palettes, grids, etc.) as much as possible. [*Good-to-fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-usability-app-uses-diff-font.png" alt-text="Example showing incorrect font usage that does not match Teams design.":::
  
  • If your app requires settings changes, include a dedicated **Settings** tab. [*Good-to-fix*]
  
  • Tabs must not obstruct or hinder workflows. For instance, a bot displayed within a tab should be minimizable. [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-tab-elements-impede-workflow.png" alt-text="Example of a tab with UI elements that impede workflow.":::
  
  • Ensure that tabs do not have broken functionalities. The app should deliver all promised features as stated in your listing. [*Must fix*]
  
  • For tabs containing footers, remove all non-essential navigation or unrelated links from the footer. [*Must fix*]
  
</details>

<br>

<details>
  <summary><strong>Scope Selection</strong></summary>

  • The landing page of configurable tabs should not present personal scoped content (like **"My Tasks"** or **"My Dashboard"**).
  
      :::image type="content" source="../../../../assets/images/submission/validation-configurable-tab-content-personal-scope.png" alt-text="Example of personal scoped content in a configurable tab, which is not allowed.":::
  
  • After configuration, the landing page must present a collaborative view appropriate for all team members. [*Must fix*]
  
  • If a personal view is necessary for improved efficiency, use techniques like filtered views, deep links to personal apps, or navigate within a multi-level view while keeping the initial landing page common for all users. [*Must fix*]
  
  • The landing page content must be consistent for all channel members. [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-usability-configurable-tab-personal-info.png" alt-text="Example showing inconsistency of personal content in a shared tab landing page.":::
  
  • Ensure that configurable tabs maintain focused functionality without unnecessary nested structures. [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-usability-configurable-nested-tabs.png" alt-text="Example highlighting issues with nested tabs.":::
  
</details>

<br>

[Back to top](#teams-store-validation-guidelines)

---

## Bots

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
This section adheres to [Microsoft commercial marketplace policy number 1140.4.3](/legal/marketplace/certification-policies#114043-bots). Ensure your app's bot functionality meets these guidelines.

> [!TIP]
> For additional design guidance, see [Teams bot design guidelines](~/bots/design/bots.md).

<br>

<details>
  <summary><strong>Bot Design Guidelines</strong></summary>

  • Follow the recommended [Teams bot design guidelines](../../../../bots/design/bots.md) for optimal user experience.
  
  • Implement dialogs where repetitive multi-turn interactions are expected, rather than relying on lengthy back-and-forth conversations. For example, using a dialog to capture recurring details (name, date of birth, etc.) is preferred. [*Must fix*]
  
  • Fix any broken links, responses, or workflows that might disrupt the bot’s expected flow. [*Must fix*]
  
</details>

<br>

<details>
  <summary><strong>Bot Commands</strong></summary>

  • All commands supported by your bot (including generic ones like **Hi**, **Hello**, and **Help**) must function correctly. [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-bot-commands-generic-response-pass.png" alt-text="Example of bot correctly responding to generic commands.":::
  
      :::image type="content" source="../../../../assets/images/submission/validation-bot-commands-generic-no-response.png" alt-text="Example of bot failing to respond to generic commands.":::
  
  • Bot commands must include provisions to ensure the user is not left at a dead-end; there should always be a clear next action. [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-bot-commands-deadend.png" alt-text="Example of a bot command dead-end scenario.":::
  
  • List at least one valid command in the manifest under `items.commands.title` with a clear description. Commands surfaced in the bot command menu should provide a clear way for users to interact with the bot. [*Good-to-fix*]
  
  • Bot responses must not include official Microsoft product images or avatars, and should instead use your app’s own assets. [*Must fix*]
  
  • Avoid persistent loading indicators after the bot has responded; any typing indicator should disappear once the response is delivered. [*Must fix*]
  
  • The help command response must not redirect users outside Teams. Instead, offer an in-app solution via an Adaptive Card or similar mechanism. [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-bot-redirects-user-outside-teams.png" alt-text="Bot response incorrectly redirecting outside Teams.":::
  
  • Always provide a valid response for any user input, even if the input is nonsensical or irrelevant. [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-bot-response-valid-improper-input.png" alt-text="Example of valid bot response for inappropriate input.":::
  
      :::image type="content" source="../../../../assets/images/submission/validation-bot-response-improper-response-invalid-command.png" alt-text="Example of a generic invalid command response.":::
  
  • Do not prefix special characters (such as "/") to bot commands. [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-bot-commands-special-characters.png" alt-text="Example showing special characters improperly prefixed to bot commands.":::
  
  • Bots must provide clear responses even when user input is invalid, without simply returning an error or dead-ending the conversation. [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-bot-way-forward-for-invalid-command.png" alt-text="Example of bot offering a way forward after invalid input.":::
  
      :::image type="content" source="../../../../assets/images/submission/validation-welcome-message-bot-dead-end-invalid-command.png" alt-text="Example of a bot failing to differentiate valid and invalid commands.":::
  
  • Ensure the bot’s functionality is relevant to the scope in which it is installed and provides clear user value. [*Must fix*]
  
  • Do not include duplicate commands. [*Must fix*]
  
  • The typing indicator should only be visible while the bot is composing a response, not after sending it. [*Must fix*]
  
  • A valid, responsive response must be provided to a **Help** command regardless of case (lowercase or uppercase) or whether the user is logged in. [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-bot-valid-response-lowercase.png" alt-text="Example of inadequate bot response in varying cases.":::
  
      :::image type="content" source="../../../../assets/images/submission/validation-bot-valid-response-logged-app.png" alt-text="Example of bot response when the user is not logged in.":::
  
  • Special attention must be given to mobile responsiveness so that bot messages do not truncate data or break the workflow. [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-bot-response-no-truncate-mobile.png" alt-text="Bot response example with no truncation on mobile.":::
  
      :::image type="content" source="../../../../assets/images/submission/validation-bot-response-truncate-mobile.png" alt-text="Bot response example showing truncation on mobile.":::
  
  • All links in an Adaptive Card response within a bot's message must be responsive. External links should include clear redirect indicators (e.g., **"View in..."**) along with a pop-out icon if possible. [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-bot-action-button-redirect-warning.png" alt-text="Example of an adaptive card with a proper external link indicator.":::
  
  • If your bot is designed solely for notifications (i.e., it does not support interactive commands), then set the flag `isNotificationOnly` to true in the app manifest. [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-bot-command-isnotification-only-true.png" alt-text="Example of notification-only property correctly set.":::
  
      :::image type="content" source="../../../../assets/images/submission/validation-bot-command-isnotification-only-not-true.png" alt-text="Example of a notification-only bot not configured properly.":::
  
  • Bots must function seamlessly on mobile devices. [*Must fix*]
  
  > [!TIP]
  > For personal bots, consider including a dedicated **Help** tab that describes available commands and use cases.
  
</details>

<br>

<details>
  <summary><strong>Bot First Run User Experience</strong></summary>

  • In personal scope, the bot must always send a welcome message or provide prompt starters. [*Must fix*]
  
      - If using prompt starters, ensure:
        • At least one command informs the user of the bot’s value proposition. [*Must fix*]
        • All prompt starters are fully functional and return appropriate responses. [*Must fix*]
        • Command descriptions are clear and relevant. [*Must fix*]
        • At least three unique prompt starters or commands are provided. [*Good-to-fix*]
  
      - If sending a welcome message:
        • For apps with a complex configuration flow, ensure the welcome message includes guidance on setup. The message can be presented as an Adaptive Card with actionable buttons. [*Must fix*]
  
          :::image type="content" source="../../../../assets/images/submission/validation-bot-welcome-message.png" alt-text="Example of a welcome message in a bot with complex configuration.":::
  
          :::image type="content" source="../../../../assets/images/submission/validation-bot-no-welcome-message.png" alt-text="Example of a bot failing to trigger a welcome message appropriately.":::
  
      • In channels and chats, bots should avoid sending individual welcome messages to all users (as this may be considered spamming) and should mention the initiator of the bot addition.
  
          :::image type="content" source="../../../../assets/images/submission/validation-bot-welcome-message-not-triggered.png" alt-text="Example of a channel bot that did not properly trigger a welcome message.":::
  
          :::image type="content" source="../../../../assets/images/submission/validation-bot-welcome-message-triggered.png" alt-text="Example of a correctly triggered welcome message in a channel.":::
  
  • The welcome message must include clear next steps and detailed information about supported commands, ensuring that users are not led to a dead-end. [*Must fix*]
  
          :::image type="content" source="../../../../assets/images/submission/validation-welcome-message-no-way-forward.png" alt-text="Bot welcome message without adequate follow-up actions.":::
  
          :::image type="content" source="../../../../assets/images/submission/validation-welcome-message-clear-way-forward.png" alt-text="Example of a bot welcome message with clear next steps.":::
  
  • A channel or group chat bot must not send proactive welcome messages to every team member individually. [*Must fix*]
  
          :::image type="content" source="../../../../assets/images/submission/validation-bot-send-proactive-message-to-all-members.png" alt-text="Example indicating bot spamming welcome messages.":::
  
  • For notification-only bots, a proactive welcome message is permissible only if it contains essential configuration instructions. [*Must fix*]
  
  • Bots installed in channels or group chats should not enable individual workflows; such tasks must be handled in 1:1 chats. [*Must fix*]
  
  • The welcome message must clearly state any limitations related to the bot’s usage in that scope. [*Must fix*]
  
          :::image type="content" source="../../../../assets/images/submission/validation-bot-welcome-messahe-with-app-limitation.png" alt-text="Example of a bot welcome message highlighting app limitations.":::
  
          :::image type="content" source="../../../../assets/images/submission/validation-bot-welcome-messahe-without-app-limitation.png" alt-text="Example of a bot welcome message missing app limitation details.":::
  
  • The welcome message should trigger only once per installation and should not repeat for every bot command. [*Must fix*]
  
          :::image type="content" source="../../../../assets/images/submission/validation-welcome-message-trigger-for-any-command.png" alt-text="Example showing incorrect repeated welcome messages.":::
  
  • Ensure that the app name in the welcome message exactly matches the app name in the manifest. [*Must fix*]
  
          :::image type="content" source="../../../../assets/images/submission/validation-app-name-mismatch-manifeast-and-welcome-message.png" alt-text="Mismatch between app name in welcome message and manifest.":::
  
  • The welcome message must not reference competitor chat platforms or redirect the user to another Teams app. [*Must fix*]
  
  • Do not include any links to external app marketplaces (such as AppSource) within the welcome message. [*Must fix*]
  
  • For apps with complex configuration flows that require admin-led installation, it is acceptable for the bot to send a proactive welcome message in a team or group chat after installation. [*Must fix*]
  
  • Ensure that a bot installed in a channel does not send welcome messages individually to users. [*Good-to-fix*]
  
  > [!TIP]
  > Consider a carousel tour in individual welcome messages to provide an effective overview of the app and encourage the use of bot commands (e.g., **"Create a task"**).
  
</details>

<br>

<details>
  <summary><strong>Bot Message Spamming</strong></summary>

Bots must not spam users with repetitive or multiple messages in a short time span.

  • For messages in channels and chats, avoid creating separate posts in rapid succession. Instead, consolidate information within a single thread. [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-bot-message-spamming-one-message.png" alt-text="Single consolidated bot message example.":::
  
      :::image type="content" source="../../../../assets/images/submission/validation-bot-message-spamming-multiple-messages.png" alt-text="Example of bot spamming multiple messages.":::
  
  • In personal apps:
    - Avoid sending several messages rapidly. [*Must fix*]
    - Prefer one comprehensive message.
    - For single workflows, avoid multi-turn chat; prefer using forms/dialogs to gather all input at once. [*Must fix*]
    - While multi-turn conversations may enhance user engagement for complex workflows, ensure they are necessary.
  
      :::image type="content" source="../../../../assets/images/submission/validation-bot-messages-multiple-message-quick-succession.png" alt-text="Example of bot sending multiple messages quickly.":::
  
      :::image type="content" source="../../../../assets/images/submission/validation-bot-messages-using-task-module.png" alt-text="Example of a bot using a task module for multi-turn input.":::
  
      :::image type="content" source="../../../../assets/images/submission/validation-bot-messages-using-mutliple-conversation.png" alt-text="Example of bot using multi-turn conversation appropriately.":::
  
  • Avoid repeating the same welcome message at regular intervals. Instead, for new team members, target the message individually via 1:1 chat. [*Must fix*]
  
      :::image type="icon" source="../../../../assets/images/submission/validation-bot-send-proactive-message-to-all-members.png" alt-text="Example of bot spamming users with welcome messages.":::
  
</details>

<br>

<details>
  <summary><strong>Bot Notifications</strong></summary>

  • Ensure that bot notifications are relevant to the scope in which they are sent (team, chat, or personal). [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-bot-notifications-relevant.png" alt-text="Example of relevant bot notification.":::
  
      :::image type="content" source="../../../../assets/images/submission/validation-bot-notifications-not-relevant.png" alt-text="Example of an irrelevant bot notification.":::
  
</details>

<br>

<details>
  <summary><strong>Bots and Adaptive Cards</strong></summary>

  • Adaptive Cards are recommended for bot messages. They should:
    - Be lightweight and include at most six actions.
    - Use dialogs or tabs for more extensive content.
  
  For further details, see:
    - [Designing Adaptive Cards](~/task-modules-and-cards/cards/design-effective-cards.md)
    - [Cards reference](~/task-modules-and-cards/cards/cards-reference.md#types-of-cards)
  
  • Ensure the bot experience is fully responsive on mobile and that all failures are handled with graceful error messages.
  
  • When Adaptive Cards originate from a collaborative trigger but are sent via a personal chat, include contextual information (such as the message’s origin).
  
</details>

<br>

<details>
  <summary><strong>Notification Only Bots</strong></summary>

  • For bots used solely for notifications (e.g., alerting users about workflow events), ensure they provide clear, valuable information through proactive notifications.
  
  > [!TIP]
  > It is advisable to include preview information and basic inline actions in the notification card so that users do not need to leave Teams to complete tasks.
  
</details>

<br>

<details>
  <summary><strong>Bot Metadata Information</strong></summary>

  • The bot information declared in the manifest (name, logo, privacy URL, and terms of service URL) must exactly match the Bot Framework metadata. [*Must fix*]
  
  • Ensure that the bot ID specified in the manifest corresponds to the ID in the previously published Teams Store version. Changing the bot ID will result in a loss of conversation history with existing users. [*Must fix*]
  
  • Any changes to the bot’s name, metadata, welcome message, or responses must be consistently updated. [*Must fix*]
  
  • The app name mentioned in the bot welcome message should exactly match the app name in the manifest. [*Must fix*]
  
</details>

<br>

<details>
  <summary><strong>Bot in Collaborative Scope</strong></summary>

  • Bots installed in a channel or group chat must not be used solely to gather team rosters for sending proactive 1:1 messages, such as in an app that pairs users for meetups. [*Must fix*]
  
  • Bots in collaborative scopes should have a clear purpose and must add measurable value in that context. [*Must fix*]
  
</details>

[Back to top](#teams-store-validation-guidelines)

---

## Message Extensions

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
This section adheres to [Microsoft commercial marketplace policy number 1140.4.4](/legal/marketplace/certification-policies#114044-messaging-extensions). Ensure that any message extensions included in your app meet these guidelines.

> [!TIP]
> For best practices, see the [Teams message extension design guidelines](~/messaging-extensions/design/messaging-extension-design.md).

<br>

<details>
  <summary><strong>Messaging Extensions Design Guidelines</strong></summary>

  • If your app utilizes the messaging extension capability, it must comply with the provided [design guidelines](../../../../messaging-extensions/design/messaging-extension-design.md).
  
      :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-design-guidelines-fail.png" alt-text="Example of not meeting messaging extension guidelines.":::
  
  • Messaging extensions should allow users to quickly insert app-related content or act on messages without leaving the conversation. Avoid embedding a complete website within the messaging extension. [*Must fix*]
  
  • Ensure that preview images in Adaptive Cards load correctly. [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-preview-image-adaptive-card-loading.png" alt-text="Example of successfully loading adaptive card preview image.":::
  
      :::image type="content" source="../../../../assets/images/submission/validation-preview-image-adaptive-card-not-loading.png" alt-text="Example of adaptive card preview image failing to load.":::
  
  • The response card from a messaging extension must include your app’s icon to prevent user confusion. [*Must fix*]
  
  • All functionalities in the messaging extension must be intact, ensuring users are not blocked during workflow completion. [*Must fix*]
  
  • The messaging extension must function correctly in both group chat and channel scopes. [*Must fix*]
  
  • Provide a clear sign-in/sign-out mechanism within the messaging extension. [*Must fix*]
  
  • For message extensions that invoke OpenAPI URLs, ensure that no redirections are triggered on any API call. The API request should be served from a domain or subdomain of the declared root domain.
  
</details>

<br>

<details>
  <summary><strong>Action Commands for Action-Based Message Extensions</strong></summary>

  Action-based message extensions should follow these guidelines:
  
  • Allow users to trigger actions directly on a message without requiring unnecessary interim steps such as re-authentication. [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-no-intermediate-step.png" alt-text="Example of action command with no intermediate steps.":::
  
      :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-intermediate-step-available.png" alt-text="Example of action command with intermediate steps available.":::
  
  • Pass the message context along to subsequent workflow steps. [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-app-passes-message.png" alt-text="Example showing correct context passing.":::
  
      :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-app-doesnot-pass-message.png" alt-text="Example showing failure to pass context correctly.":::
  
  • Use the host app’s name in action commands rather than a generic verb. For instance, prefer **"Start a Skype Meeting"** over a generic **"Start Meeting"**. [*Good-to-fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-action-command-host-name.png" alt-text="Example showing usage of the host app name.":::
  
      :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-action-command-verb.png" alt-text="Example showing the use of a generic verb.":::
  
  • When a message action is invoked, ensure the workflow is completed without errors, blank responses, or continuous loading indicators. [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-continous-loading-indicator-action-command.png" alt-text="Example of continuous loading issue in action command.":::
  
  • Duplicate action commands should not be present. [*Must fix*]
  
  • The messaging extension must always culminate in a notification that informs the user of the outcome of the action, allowing them to share details as necessary. [*Must fix*]
  
</details>

<br>

<details>
  <summary><strong>Preview Links (Link Unfurling)</strong></summary>

  [*Must fix*]
  
  • If your app script declares the `supportsAnonymizedPayloads` property and the user has not installed the app, when a link is unfurled (i.e., a card is displayed), the add app dialog should follow after the card is selected. [*Must fix*]
  
  • Message extensions must correctly preview recognized links in the Teams compose box. Do not declare domains outside your control (either as absolute URLs or wildcards). For example, `yourapp.onmicrosoft.com` is acceptable, but `*.onmicrosoft.com` is not. Top-level wildcards (e.g., `*.com`) are forbidden. [*Must fix*]
  
  • Declare only those domains under the direct ownership of your app publisher in the `messageHandler` section of the manifest. Do not include domains such as `*.botframework.com`. [*Must fix*]
  
</details>

<br>

<details>
  <summary><strong>Search Commands</strong></summary>

  • For search-based message extensions, include descriptive text to assist users in formulating effective search queries. [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-search-commands-text-available.png" alt-text="Example of help text for search commands.":::
  
      :::image type="content" source="../../../../assets/images/submission/validation-search-commands-text-not-available.png" alt-text="Example where search command help text is missing.":::
  
  • @mention executables must be clear and easily comprehensible. [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-search-command-unclear-executable.png" alt-text="Example of an unclear @mention executable command.":::
  
</details>

[Back to top](#teams-store-validation-guidelines)

---

## Dialogs

[*Must fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
This section is consistent with [Microsoft commercial marketplace policy number 1140.4.5](/legal/marketplace/certification-policies#114045-task-modules) and covers guidelines for dialogs (referred to as task modules in TeamsJS v1.x).

<details>
  <summary><strong>Expand to know more</strong></summary>

  • A dialog should include your app icon and the app’s short name for clear identification.
  
  • Dialogs should focus on the necessary components required to complete a specific action and must not embed an entire app.
  
  • For additional guidance, refer to the [Teams dialog design guidelines](~\task-modules-and-cards\task-modules\design-teams-task-modules.md).
  
      :::image type="content" source="../../../../assets/images/submission/validation-task-module-displays-components.png" alt-text="Dialog displaying only essential components.":::
  
      :::image type="content" source="../../../../assets/images/submission/validation-task-module-embeds-app.png" alt-text="Dialog incorrectly embedding an entire app.":::
  
  > [!TIP]
  > For more design tips, see [Teams task module design guidelines](~/task-modules-and-cards/task-modules/design-teams-task-modules.md).
  
</details>

[Back to top](#teams-store-validation-guidelines)

---

## Meeting Extensions

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
This section follows [Microsoft commercial marketplace policy number 1140.4.6](/legal/marketplace/certification-policies#114046-meeting-extensions) and outlines guidelines specific to meeting extensions.

> [!TIP]
> For additional design details, refer to the [Teams meeting extension design guidelines](~/apps-in-teams-meetings/design/designing-apps-in-meetings.md).

<br>

<details>
  <summary><strong>Meeting Extension Design Guidelines</strong></summary>

  • Your Teams app must adhere to [Meeting extension design guidelines](../../../../apps-in-teams-meetings/design/designing-apps-in-meetings.md).
  
  • Meeting extension experiences include pre-meeting, in-meeting, and post-meeting scenarios:
    - **Pre-meeting:** Enables users to search for and add apps, or complete tasks like developing polls.
    - **In-meeting:** Engages participants during a meeting without forcing them to leave Teams. [*Must fix*]
    - **Post-meeting:** Displays outcomes such as poll results or feedback.
    
  • The in-meeting experience must be responsive and remain within the Teams app. Attendees should not be redirected outside Teams to complete essential workflows. [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-outside-teams-core-workflows.png" alt-text="Example of in-meeting experience incorrectly redirecting outside Teams.":::
  
  • Your app must provide additional value beyond just custom Together Mode scenes. [*Must fix*]
  
  • For Teams meeting extensions on mobile:
    - Declare `groupChat` as a scope in `configurableTabs` and include `meetingDetailsTab`, `meetingChatTab`, and `meetingSidePanel` as context properties in the manifest. [*Must fix*]
  
  • Meeting canvases should not cause a dead-end. Display clear failure messages when a feature is unavailable (e.g., due to regional restrictions). [*Must fix*]
  
  • The meeting canvas header must accurately show your app's name. [*Must fix*]
  
  • Provide a clear option for users to sign out from the meeting extension. [*Must fix*]
  
  • Meeting tabs on mobile devices should display the intended functionalities without blank pages. [*Must fix*]
  
  • The in-meeting share stage should not embed a full website experience. [*Must fix*]
  
  • Avoid continuous loading indicators or error messages that prevent users from completing workflows during meetings. [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-app-shows-continous-loading-screen.png" alt-text="Example illustrating continuous loading issues.":::
  
  • Do not open a new Teams instance upon starting a meeting; meetings must always launch within the current Teams session. [*Must fix*]
  
  • Meeting apps must not redirect to competitor chat platforms for workflow completion. [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-apps-redirecting-competitor-chat-platform.png" alt-text="Example showing app redirecting to a competitor platform.":::
  
  • For role-based views, if certain workflows are restricted to organizers, include explanatory messaging and guide attendees appropriately to alternative workflows (e.g., meeting notes or agendas). [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-way-forward-not-available-for-role-based-views.png" alt-text="Example showing missing guidance for restricted roles.":::
  
</details>

<br>

<details>
  <summary><strong>Pre- and Post-Meeting Experience</strong></summary>

  • Pre-meeting and post-meeting screens should follow general tab design guidelines. For details, see [Teams design guidelines](~/tabs/design/tabs.md). [*Must fix*]
  
  • When displaying multiple items (e.g., more than 10 polls), ensure an organized layout. Refer to [example layout](~/apps-in-teams-meetings/design/designing-apps-in-meetings.md#after-a-meeting). [*Must fix*]
  
  • When exporting poll or survey results, notify users clearly (e.g., **"Results successfully downloaded"**). [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-meeting-experience-tab-design-guidelines-fail.png" alt-text="Example of non-compliant meeting experience tab design.":::
  
</details>

<br>

<details>
  <summary><strong>In-Meeting Experience</strong></summary>

  • When the meeting is in progress, only a dark theme should be used. See [Teams design guidelines](~/apps-in-teams-meetings/design/designing-apps-in-meetings.md#theming) for more information. [*Must fix*]
  
  • A tooltip must display the app name when hovering over its icon during a meeting. [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-exp-display-app-name.png" alt-text="Example of tooltip displaying app name in a meeting.":::
  
  • Ensure that message extensions function the same during meetings as they do outside. [*Must fix*]
  
</details>

<br>

<details>
  <summary><strong>In-Meeting Tabs</strong></summary>

  • In-meeting tabs must be responsive and maintain proper padding and component sizes. [*Must fix*]
  
  • Include a back button if there is more than one layer of navigation. [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-exp-back-button.png" alt-text="Example showing a back button in an in-meeting tab.":::
  
      :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-exp-back-button-absent.png" alt-text="Example where a back button is missing in an in-meeting tab.":::
  
  • Do not incorporate more than one close button to avoid confusing users, as Teams already provides one built-in header close button. [*Must fix*]
  
  • No horizontal scrolling should occur in in-meeting tabs. [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-tab-vertical-scroll.png" alt-text="Example of vertical scroll in an in-meeting tab.":::
  
      :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-tab-horizontal-scroll.png" alt-text="Example of horizontal scroll in an in-meeting tab, which is not permitted.":::
  
</details>

<br>

<details>
  <summary><strong>In-Meeting Dialogs</strong></summary>

  • Use in-meeting dialogs sparingly for lightweight, task-oriented scenarios. [*Must fix*]
  
  • The dialog should display content in a single column without multiple navigation levels. [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-single-column-layout.png" alt-text="Example of an in-meeting dialog with a single column layout.":::
  
      :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-multiple-column-layout.png" alt-text="Example of an in-meeting dialog with an improper multiple column layout.":::
  
  • The dialog must be centered on the meeting stage. [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-dialog-not-aligned.png" alt-text="Example showing an in-meeting dialog not aligned properly.":::
  
  • Dismiss the dialog immediately after the user selects an action. [*Must fix*]
  
  • For scenarios involving co-participation (Together mode), ensure that:
    - All images are in .png format.
    - The final package does not exceed 1920x1080 resolution (even number resolution required).
    - The maximum scene size is 10 MB, with individual images limited to 5 MB.
    - Overlapping images are marked as Transparent. [*Must fix*]
  
</details>

<br>

<details>
  <summary><strong>Shared Meeting Stage</strong></summary>

  • To use the **shareAppContentToStage** API, include the correct RSC permissions in the manifest:
    - Under the `authorization` property, set `name` to `MeetingStage.Write.Chat` and `type` to `Delegated` within the `resourceSpecific` field. [*Must fix*]
  
  • The Shared Meeting Stage feature is available only in the Teams desktop app; however, the shared content experience must be usable on mobile devices as well. [*Must fix*]
  
</details>

[Back to top](#teams-store-validation-guidelines)

---

## Connector

1. The connector name must exactly match the app name both within the app and in the manifest.

   :::image type="content" source="../../../../assets/images/submission/connector-mismatch-app-name.png" alt-text="Screenshot illustrating a mismatch between the app name and connector name.":::

2. Ensure that no errors occur during the configuration of the connector.

   :::image type="content" source="../../../../assets/images/submission/connector-error-configuring.png" alt-text="Screenshot of an error encountered during connector configuration.":::

---

## Notifications

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
This section complies with [Microsoft commercial marketplace policy number 1140.4.7](/legal/marketplace/certification-policies#114047-notification-apis). If your app uses Microsoft Graph activity feed APIs, adhere to the following guidelines:

> [!TIP]
> If your app supports scenarios where notifications are triggered after long durations (e.g., one day or one month), ensure that you can simulate these triggers in the background for testing purposes before submission.

<br>

<details>
  <summary><strong>Notification Design Guidelines</strong></summary>

  • Follow the [activity feed notifications design guidelines](/graph/teams-send-activityfeednotifications).
  
  • Notifications must not exhibit irrelevant, improper, or broken workflows once selected; users should be able to complete tasks seamlessly. [*Must fix*]
  
  • Always include your app’s name in each notification to clarify its origin. [*Must fix*]
  
  • Ensure that notifications are triggered for all scenarios mentioned in your app’s long description, first run experience, and as declared under `activityTypes` in the manifest. [*Must fix*]
  
  • Notifications must display within five seconds after the user action that triggers them. [*Must fix*]
  
  • Clearly mention any notification limitations in your long description or initial user guidance. [*Must fix*]
  
</details>

<br>

<details>
  <summary><strong>General</strong></summary>

  • All triggers for notifications should function as configured. [*Must fix*]
  
  • Ensure that notifications are localized according to the supported languages defined for your app. [*Must fix*]
  
  • Across all platforms, notifications should appear within five seconds of a trigger. [*Must fix*]
  
</details>

<br>

<details>
  <summary><strong>Avatars</strong></summary>

  • The avatar used in notifications must match the color icon of your app. [*Must fix*]
  
  • For notifications triggered by individual users, include the user's own avatar. [*Must fix*]
  
</details>

<br>

<details>
  <summary><strong>Spamming</strong></summary>

  • Avoid sending more than 10 notifications per minute to a single user. [*Must fix*]
  
  • Bots and the activity feed must not trigger duplicate notifications. [*Must fix*]
  
  • Notifications must deliver meaningful value and must not be used for trivial events. [*Must fix*]
  
</details>

<br>

<details>
  <summary><strong>Navigation and Layout</strong></summary>

  • Notifications must follow the Teams activity feed layout.
  
  • Upon selecting a notification, the user should be navigated to relevant content within Teams. [*Must fix*]
  
</details>

[Back to top](#teams-store-validation-guidelines)

---

## Microsoft Graph Connector

For Graph connectors, it is recommended to publish them through the [Graph connector gallery](/microsoftsearch/connectors-gallery). Do not include Graph connector details within your manifest.json file. Guidelines for the declarative agent file can be found in [review-copilot-validation-guidelines.md].

***Example***

Do not include the Graph connector node in the manifest file:

:::image type="content" source="../../../../assets/images/Copilot/da-graph-connector.png" alt-text="Screenshot showing a Graph connector node in the manifest file.":::

[Back to top](#teams-store-validation-guidelines)

---

## Microsoft 365 App Compliance Program

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
This section complies with [Microsoft commercial marketplace policy number 1140.6](/legal/marketplace/certification-policies#11406-publisher-attestation). The Microsoft 365 App Compliance Program helps organizations manage security and compliance risk associated with your app. When publishing to the Teams Store, complete the following assessments:

<details>
  <summary><strong>Expand to know more</strong></summary>

  • **Publisher Verification:** This process helps end-users and administrators verify the authenticity of the app developer. Upon verification, a blue **verified** badge appears on the Microsoft Entra consent dialog and other screens. For further details, see [Mark your app as publisher verified](/azure/active-directory/develop/mark-app-as-publisher-verified). [*Must fix*]
  
      :::image type="content" source="../../../../assets/images/submission/validation-365-compliance-publisher-verification.png" alt-text="Example of a blue verified badge on the Microsoft Entra consent dialog.":::
  
  • **Publisher Attestation:** This requires sharing general security, data handling, and compliance information to help potential customers assess your app. [*Good-to-fix*]
  
  :::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
  
  For new apps, Publisher Attestation cannot be completed until the app is available in the Teams Store. For updates to already listed apps, complete [Publisher Attestation](/microsoft-365-app-certification/docs/attestation) before submitting the new version.
  
</details>

[Back to top](#teams-store-validation-guidelines)

---

## Advertising

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
This section follows [Microsoft commercial marketplace policy number 1140.7](/legal/marketplace/certification-policies#11407-advertising).

• Apps must not display any advertising, including dynamic ads, banners, or in-message ads. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-advertising-banners.png" alt-text="Example showing disallowed advertising banners within a Teams app.":::

[Back to top](#teams-store-validation-guidelines)

---

## Cryptocurrency Based Apps

Your app must comply with all applicable laws where it is distributed if it involves cryptocurrency. This includes apps that:

• Facilitate cryptocurrency transactions or transmissions.
• Promote cryptocurrency-related content.
• Enable users to store or access cryptocurrency.
• Encourage or enable transactions outside of the Teams platform.
• Facilitate crypto mining.
• Enable participation in Initial Coin Offerings.
• Incentivize tasks with cryptocurrency tokens.

After internal review, if your demonstration of compliance is satisfactory, Microsoft may proceed with certification. Otherwise, you will be informed of the decision not to certify your app. [*Must fix*]

[Back to top](#teams-store-validation-guidelines)

---

## App Functionality

• All workflows or content within your app must align with the declared scope. [*Must fix*]

• Every declared capability in your app must function correctly, consistent with what is described in your AppSource or manifest long description. [*Must fix*]

• Before downloading any file or executable (e.g., .exe) on the user's device, notify them clearly. Any call-to-action (CTA) that indicates a file or executable will be downloaded is permitted only if preceded by a user notification. [*Must fix*]

• For apps with regional dependencies, if users attempt to use a feature in an unsupported region, display a clear, graceful failure message. [*Must fix*]

[Back to top](#teams-store-validation-guidelines)

---

## Mobile Experience

• Mobile add-ins must be provided free of charge. There must be no in-app content or links suggesting upselling, access to online stores, or payment requests. Any account required for mobile apps must be free; if temporary, the UI must not imply a paid upgrade. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-mobile-add-in-charges.png" alt-text="Example of an add-in erroneously requesting payment on mobile.":::

• The use of terms like **FREE**, **FREE TRIAL**, or **TRY FREE** is acceptable in desktop or web environments without additional restrictions.

• On mobile:
  - The term **FREE** is allowed as plain text in the context of a trial or upgrade.
  - If **FREE** is used associated with pricing details or leading to landing pages with such information, it is not acceptable. [*Must fix*]

   - For example, any CTA like **"View Plans"** or links with pricing details on mobile must be avoided.
  
      :::image type="content" source="../../../../assets/images/submission/validation-mobile-exp-pricing-details-on-mobile-fail.png" alt-text="Example of pricing details displayed on mobile, which is not allowed.":::
  
• Payments for digital goods within the app are not allowed on mobile. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-mobile-exp-payments-digital-goods.png" alt-text="Example of in-app payments for digital goods on mobile, which are not allowed.":::
  
• Teams apps should deliver an appropriate mobile experience that works consistently across devices. [*Must fix*]

• For mobile-supported capabilities, if a feature is not available on mobile, display a graceful failure or alternative guidance. [*Must fix*]

[Back to top](#teams-store-validation-guidelines)

---

## Apps Extended Across Microsoft 365 Clients

### General

• Apps intended to extend across Microsoft 365 clients must use manifest schema version 1.13 or later.

• The support URL of your app must contain content relevant to the extended Teams app experience and should not target only a single client.

• Include clear references in the app description that your Teams app extends across Microsoft 365 clients.

• If the app is designed to work across multiple clients, the content for get started, sign in, help, and other guidance should mention all supported clients.

### Compatibility

Apps extended to Microsoft 365 clients must be fully responsive and functional on:
  - Microsoft Edge and Google Chrome (latest versions).
  - Outlook for Windows and web.
  - Microsoft 365 on desktop, web, and Android.
  - Microsoft Teams on desktop, web, Android, and iOS.

### Mobile Experience

• Users must be able to launch the app from the actions flyout menu within the Microsoft 365 client on mobile. The app name should be correctly displayed in the action bar. [*Must fix*]

#### App Launch from Actions Flyout

• Ensure that users can seamlessly launch and switch between multiple static tabs from the mobile view. If there are more than three static tabs, remaining tabs must be accessible under the **More** section. [*Must fix*]

#### Multi Tab Experience

• For apps using SSO, authentication should work across all platforms. Users should not be prompted for multiple credentials. [*Must fix*]

#### App Authentication

• When a user account is switched or logged out within the Microsoft 365 client on mobile, the app must terminate the previous session accordingly. [*Must fix*]

#### Account Switching and Logout Experience

• Provide a clear back navigation option to allow users to return to their previous work state. If on the root page, the back navigation must exit the app on mobile. [*Must fix*]

• Deep links must correctly direct the user to the appropriate landing page respective to their workflow. [*Must fix*]

#### Tab Navigation

• Display a progress indicator while the app is loading. This indicator should dismiss automatically once the app is fully loaded. [*Must fix*]

• Show an error screen if the app fails to load due to network issues, timeouts, or authentication failures. [*Must fix*]

[Back to top](#teams-store-validation-guidelines)

---

## Teams Apps Extensible as Agents for Microsoft 365 Copilot

• App packages must be correctly formatted and adhere to manifest schema version 1.13 or later.
  
• Ensure your app meets the responsible AI checks outlined in the [relevant certification policies](/legal/marketplace/certification-policies#1-apps-with-artificial-intelligenceai-generated-content-must-meet-below-requirements).

• Your app must comply with the [agent compatible criteria](review-copilot-validation-guidelines.md).

### Agent Must Not Manipulate LLM Behavior

When describing your message extension agent for Microsoft 365 Copilot:
  
1. Do not include any instructional phrases, for example:
    - "If the user says X, ignore"
    - "Delete", "reset", "answer in bold", or "don't print anything"
2. Avoid verbose, flowery, or overly marketing-centric language.
3. Do not use superlative claims like **#1**, **amazing**, or **best**.
4. Avoid URLs, emojis, or hidden characters (e.g., hexadecimal or binary).
5. Ensure the language is grammatically correct and free of punctuation errors.

### User Awareness

The long description must clearly state:

• Your app's compatibility with Microsoft 365 Copilot, for example, **"Contoso in Microsoft 365 Copilot helps you search and summarize your tasks."**

• Provide at least one sample prompt for using the message extension as an agent in Microsoft 365 Copilot. For instance, **"What are the high priority tickets assigned to me this week in Contoso?"**

   :::image type="content" source="../../../../assets/images/Copilot/validation-guidelines-plugin-prompt-pass.png" alt-text="Example of a valid sample prompt for Microsoft 365 Copilot message extension.":::
  
   :::image type="content" source="../../../../assets/images/Copilot/validation-guidelines-plugin-prompt-fail.png" alt-text="Example of a missing or invalid sample prompt for Microsoft 365 Copilot.":::

### Response Quality

• Mandatory fields in a Microsoft 365 Copilot Adaptive Card response must include an Information title and at least two additional useful fields (e.g., date modified, author, status, or flags). Both preview and detailed content must be included in a single response.

   :::image type="content" source="../../../../assets/images/Copilot/validation-guidelines-app-response-copilot.png" alt-text="Example of a Copilot response Adaptive Card with integrated preview and detailed content.":::
  
• Adaptive Cards in the Copilot response must include at least one actionable button.
  
• Ensure that all action buttons in the Adaptive Cards are functional.
  
• Microsoft 365 Copilot must respond accurately without showing errors when users prompt with one or multiple parameters or follow-up queries.
  
• The message extension must offer at least two parameters to enhance the user experience in Copilot.

[Back to top](#teams-store-validation-guidelines)

---

## Next Step

> [!div class="nextstepaction"]
> [Create a Partner Center account](~/concepts/deploy-and-publish/appsource/prepare/create-partner-center-dev-account.md)

---

## See Also

• [Test and debug your app](~/concepts/build-and-test/debug.md)  
• [Prepare your Teams Store submission](~/concepts/deploy-and-publish/appsource/prepare/submission-checklist.md)  
• [Include a SaaS offer with your Teams app](include-saas-offer.md)  
• [Strategize and execute growth for your app](../post-publish/app-growth/overview-app-growth.md)  
• [Validate your app in Developer Portal for Teams](../../../build-and-test/manage-your-apps-in-developer-portal.md#publish)  

[Back to top](#teams-store-validation-guidelines)