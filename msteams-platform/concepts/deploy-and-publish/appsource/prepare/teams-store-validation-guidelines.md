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

Following these guidelines increases the chances of your app passing the Microsoft Teams Store submission process. The Teams-specific guidelines complement the Microsoft [commercial marketplace certification policies](/legal/marketplace/certification-policies#1140-teams) and are updated frequently to reflect new capabilities, user feedback, and business rule changes.

> [!NOTE]
>
> • Some guidelines may not be applicable to your app. For example, if your app doesn't include a bot, you can ignore bot-related guidelines.
> • We've cross-referenced these guidelines to the Microsoft commercial certification policies and added Do’s and Don’ts with examples from pass or fail scenarios encountered in our validation process.
> • Certain guidelines are marked as *Must fix*. If your app submission doesn't meet these mandatory guidelines, you'll receive a failure report with steps to mitigate the issues. Your app submission passes Teams Store validation only after these issues are fixed.
> • Other guidelines are marked as *Good-to-fix*. For an ideal user experience, we recommend that you address these issues. However, your app submission is not blocked from publishing on the Teams Store if you choose not to fix them.

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

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
This section is aligned with [Microsoft commercial certification policy number 1140.1](/legal/marketplace/certification-policies#11401-value-proposition-and-offer-requirements) and further guides developers on communicating their offer’s value proposition.

Apps must deliver clear value by enabling users to complete functional workflows that encourage repeated use. Expand the sections below to learn more about the value proposition:

<br>

<details><summary>Tabs</summary>

Tabs must provide value beyond simply hosting an existing website. [*Must fix*]

• Example scenarios include an app that integrates workflow capabilities directly in Teams versus a simple I-frame of a website.

:::image type="content" source="../../../../assets/images/submission/validation-usability-app-provides-workflows.png" alt-text="Graphic showing an example of an app providing valuable workflow to channel members within a team.":::

:::image type="content" source="../../../../assets/images/submission/validation-usability-website-i-framed.png" alt-text="Graphic showing an example of an app displaying an entire website in an I-frame without any back option.":::

</details>
<br>

<details><summary>Notification Bots</summary>

A notification adds value in Teams if it meets one of the following conditions:

1. The posted card or text offers sufficient details so that no further user action is required.
2. The posted card or text presents preview information that enables the user to decide on further action or to click a link that opens outside Teams.

Apps that provide only generic notifications such as **You have a new notification** or **click to view** – and require navigation outside Teams for all further actions – do not provide significant in-Teams value.

:::image type="content" source="../../../../assets/images/submission/validation-bot-notification-only-inadequete-info.png" alt-text="Screenshot showing a notification with insufficient preview information.":::

</details>
<br>

<details><summary>Message Extensions</summary>

[*Must fix*]

Search-based message extensions must provide user value by allowing the sharing of rich cards that support contextual conversations without forcing a context switch.

To pass validation for a search-based message extension only app, ensure the following baseline requirements are met:

1. The card shared must include adequate details so that no further user action is needed.
2. The card shared must provide enough preview information for the user to decide on taking some action or viewing more details (via a link opening outside Teams).

    :::image type="content" source="../../../../assets/images/submission/validation-search-based-messaging-ext-adequete-info.png" alt-text="Graphic showing an example of an adequate preview in a search-based messaging extension card.":::

    :::image type="content" source="../../../../assets/images/submission/validation-search-based-messaging-ext-inadequete-info.png" alt-text="Graphic showing an example of an inadequate preview in a search-based messaging extension card.":::

</details>
<br>

<details><summary>Link Unfurling</summary>

Apps that rely solely on link unfurling do not provide significant in-Teams value. Consider building additional workflows in your app if it only supports link unfurling without any extra functionality.

</details>
<br>

[Back to top](#teams-store-validation-guidelines)

---

### App Name

[*Must fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
Aligned with Microsoft [commercial certification policy number 1140.1.1](/legal/marketplace/certification-policies#114011-app-name), this section provides guidance on naming your app.

<details><summary>Expand to Know More</summary>

An app’s name is crucial for discoverability in the Teams Store. Follow these guidelines when naming your app:

• The name must include terms that are relevant to your target audience. [*Must fix*]  
• Prefix or suffix common nouns with the developer's name (e.g., **Contoso Tasks** instead of **Tasks**). [*Must fix*]  
• Do not use **Teams** or other Microsoft product names (such as Excel, PowerPoint, Word, OneDrive, SharePoint, OneNote, Azure, Surface, or Xbox) that imply false co-branding or co-selling. Refer to the [Microsoft Trademark and Brand Guidelines](https://www.microsoft.com/legal/intellectualproperty/trademarks/usage/general) for more details. [*Must fix*]  
• Avoid copying the names of apps already listed in the Teams Store or in other offers on the commercial marketplace. [*Must fix*]  
• Ensure the name does not contain profane or derogatory terms, or racially or culturally insensitive language. [*Must fix*]  
• The app name must be unique. If listing region-specific versions (e.g., **Contoso Mexico**), ensure that:  
  - The region-specific functionality is referenced in the title, metadata, initial app experience, and help sections. [*Must fix*]  
  - When uploading the app package in Partner Center, select the appropriate **Markets**. [*Must fix*]  
• The app name must not start with a core Teams feature such as Chat, Contacts, Calendar, Calls, Files, Activity, Teams, or Help. [*Must fix*]  
• For official Microsoft partnerships, the app name must appear first (e.g., **Contoso connector for Microsoft Teams**).  
• Avoid using the word **Microsoft** in the app name unless you are an official partner. If used, the app name must precede the Microsoft reference. [*Must fix*]  
• Do not include parenthesis to reference Microsoft products. [*Must fix*]  
• The developer name should match between the app manifest and AppSource. [*Must fix*]  
• The app manifest must be a production manifest. Avoid any nomenclature that implies a preproduction state (e.g., contain words such as Beta, Dev, Preview, or UAT). [*Must fix*]  
• Ensure the app name in the manifest matches the app name in AppSource. [*Must fix*]

> [!TIP]
> Your app’s branding (including the name, developer name, icon, AppSource screenshots, video, short description, and website) must not impersonate an official Microsoft offering unless your app is an official Microsoft 1P offering.

</details>

---

### Duplicate App

Apps from the same developer that offer the same functionality should share a single app listing unless separate listings are required for privacy compliance or for supporting government clouds. Ensure that:
  
• Your business logic supports only one shared listing. [*Must fix*]  
• For multiple regions: Implement region-specific logic within your single listing.

   :::image type="content" source="../../../../assets/images/submission/validation-guidelines-pass-region-app-manifest.png" alt-text="Screenshot showing the passed scenario of implementing region support via business logic.":::

• For scenarios requiring on-premises and on-cloud deployments: Rely on your business logic to support a single listing.

---

### Suitable for Workplace Consumption

[*Must fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
This section aligns with Microsoft commercial certification policies [1140.1.2](/legal/marketplace/certification-policies#114012-workplace-appropriateness), [100.8](/legal/marketplace/certification-policies#1008-significant-value), and [100.10](/legal/marketplace/certification-policies#10010-inappropriate-content).

<details><summary>Expand to Know More</summary>

• App content must be appropriate for the workplace and adhere to all commercial marketplace policy restrictions.  
• Content related to religion, politics, gambling, or prolonged entertainment is prohibited. [*Must fix*]  
• The app must facilitate group collaboration or enhance individual productivity. Apps for team bonding or socializing should support collaborative participation and must not require long sessions (over 60 minutes) that hinder productivity. [*Must fix*]  
• Content aggregator apps must offer a mechanism for users to report inappropriate content to the publisher. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-guidelines-content-aggregator-app.png" alt-text="Screenshot showing a content aggregator app equipped with a reporting mechanism.":::

</details>

---

### Similar Platforms and Services

[*Must fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
In line with [Microsoft commercial certification policy number 1140.1.3](/legal/marketplace/certification-policies#114013-other-platforms-and-services), your app must be focused on the Teams experience. Do not incorporate names, icons, or imagery of other similar chat-based platforms unless your app specifically supports interoperability with them.

---

### Feature Names

Feature names used in your app (e.g., on buttons or UI text) must not use terminology that is reserved for Teams or other Microsoft products. For instance, avoid names like **Start meeting**, **Make call**, or **Start chat**. Instead, clarify by adding your app's name (e.g., **Start Contoso meeting**).

---

### Authentication

[*Must fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
This section follows [Microsoft commercial certification policy number 1140.1.4](/legal/marketplace/certification-policies#114014-access-to-services) and guides developers on integrating authentication with external services.

For detailed implementation guidance, see [authentication in Teams](~/concepts/authentication/authentication.md).

<br>

<details><summary>Expand to Know More</summary>

#### Authenticating with External Services

• **Sign In/Sign Out/Sign Up Experiences:**
  - Apps that depend on external services must deliver a clear sign in, sign out, and sign up flow. [*Must fix*]
  - When signing out, the app must ensure the user signs out only from the app and remains signed in to Teams. [*Must fix*]
  - Provide a pathway in your app (via manifest, AppSource long description, or first-run experience) for new users to sign up or contact the publisher. [*Must fix*]
  - If an admin must complete a one-time setup, clearly indicate this dependency in the app’s manifest, long description, help text, and similar materials. [*Must fix*]

• **Content Sharing Experiences:**
  - If authentication is required to share content in Teams channels, clearly describe how a user can disconnect or unshare the content if supported by the external service.

</details>

---

### Audio

• If the app’s primary goal is for music listening, it must support at least one collaborative feature such as sharing playlists, configuring or pinning playlists, and synchronized listening. [*Must fix*]  
• For apps allowing music listening in Teams, incorporating a collaborative co-listening experience is recommended. [*Good-to-fix*]

---

## Security

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
This section adheres to [Microsoft commercial certification policy number 1140.3](/legal/marketplace/certification-policies#11403-security).

[Back to top](#teams-store-validation-guidelines)

---

### Financial Information

[*Must fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
Aligned with [Microsoft commercial certification policy number 1140.3.1](/legal/marketplace/certification-policies#114031-financial-transactions), this section provides guidance on handling financial transactions within Teams.

<details><summary>Expand to Know More</summary>

• Apps must not request users to make payments directly within Teams or transmit sensitive financial details via bot interfaces. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-financial-information-1.png" alt-text="Graphic showing financial information guidelines.":::

• You may only include a link to a secure external payment service if it is disclosed in your terms of use, privacy policy, profile page, or website prior to the user agreeing to use the app. [*Must fix*]

• Do not facilitate payments for goods or services that violate [General policy number 100.10 Inappropriate content](/legal/marketplace/certification-policies#10010-inappropriate-content). [*Must fix*]

• For apps on iOS or Android versions of Teams:
  - Do not include in-app purchases, trial offers, or UI elements suggesting an upsell to paid versions. [*Must fix*]
  - If an account is required, users must be able to sign up at no charge. Avoid using terms like **free** or **free account**. [*Must fix*]
  - Clearly define if an account is active indefinitely or for a limited time. When an account expires, do not show UI elements that imply a payment requirement. [*Must fix*]
  - The privacy policy and terms of use must not incorporate commerce-related UI or links. [*Must fix*]

</details>

---

### Bots

[*Must fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
This section meets [Microsoft commercial marketplace policy number 1140.3.2](/legal/marketplace/certification-policies#114032-bots-and-messaging-extension).

<details><summary>Expand to Know More</summary>

For apps using Microsoft Azure Bot Service (including bots and message extensions):

• Follow all requirements in the [Online Services Terms](https://www.microsoftvolumelicensing.com/DocumentSearch.aspx?Mode=3&DocumentTypeId=46).  
• Bots must always request permission before uploading a file and should display a confirmation message upon doing so.

   :::image type="content" source="../../../../assets/images/submission/validation-bot-confirmation-message.png" alt-text="Screenshot showing bot confirmation message guidelines.":::

</details>

---

### External Domains

[*Must fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
This section is based on [Microsoft commercial marketplace policy number 1140.3.3](/legal/marketplace/certification-policies#114033-external-domains) and guides on correctly configuring external domains in your app manifest.

<details><summary>Expand to Know More</summary>

• Do not include domains that are outside your organization’s control (avoid wildcards and tunneling services).
• Exceptions:
  - If relying on SharePoint, use the associated root SharePoint site via the `{teamSiteDomain}` property. [*Must fix*]
  - Do not use top-level domains such as **.com**, **.in**, **.org** as valid domains. [*Must fix*]
  - Avoid **.onmicrosoft.com** unless under your control. Conversely, you can use domains like **yoursite.com** even with wildcards if you own them. [*Must fix*]
  - For PowerApps on Microsoft Power Platform, include *apps.powerapps.com* as a valid domain.
  - External domains declared must not contain URL prefixes (e.g., www or https). [*Must fix*]
  - If using Azure Bot Service's OAuthCard, include *token.botframework.com* as a valid domain explicitly. [*Must fix*]
• Additional restrictions:
  - Do not allow wildcards for domains like *.botframework.com.
  - The following domains are not permitted:  
    • *.azurewebsites.net  
    • *.azureedge.com  
    • *.microsoft.com  
    • *.microsoftonline.com  
    • *.onmicrosoft.com  
    • go.microsoft.com  
    • teams.microsoft.com
• When using wildcards (`*`):
  - The wildcard must represent the entire subdomain segment.
  - Any segment before a wildcard segment must also be a wildcard segment.
  - For example, *\*.\*.domain.com* is acceptable, but *foo.\*.myteam.domain.com* is not.

</details>

---

### Sensitive Content

[*Must fix*]

Your app must not post sensitive information such as credit card numbers, financial details, health data, or personally identifiable information (PII) to unintended recipients. Additionally, warn users before downloading any files or executables (.exe) to their environments.

---

## General Functionality and Performance

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
This section aligns with [Microsoft commercial marketplace policy number 1140.4](/legal/marketplace/certification-policies#11404-functionality).

• It is mandatory to provide a clear way forward for both administrators and existing users. This guidance can include hyperlinks to sign-up pages, help resources, or contact information.
• While calling out account dependencies in the UI is optional, ensure that any limitations or dependencies are clearly documented in both the app manifest’s long description and the AppSource listing.
• If your app depends on admin configuration for new users, clearly indicate this requirement in the appropriate materials.

[Back to top](#teams-store-validation-guidelines)

---

### Launching External Functionality

[*Must fix*]

Apps must not force users to leave the Teams environment for core processes. Instead, core app interactions should remain within Teams via mechanisms such as bots, Adaptive Cards, tabs, or dialogs.

> [!NOTE]
> To redirect users from your Teams app to external native experiences (using protocols like `tel:`, `mailto:`, or `webex:`), open the deep link in a new window (using `window.open` or an anchor tag with `target="_blank"`).
<br>

<details><summary>Expand to Know More</summary>

• Ensure that internal navigation stays within Teams, except where explicit permission is given to exit. [*Must fix*]
• Button text that launches external functionality must clearly indicate that the user is leaving Teams (e.g., **This way to Contoso.com** or **View in Contoso.com**). [*Must fix*]
• Consider adding a **Pop-out** icon to indicate external redirection. You may use the icon provided below:
  
   :::image type="icon" source="../../../../assets/icons/pop-out-icon.png" :::

• If adding a pop-out icon is not feasible, use alternative methods like:
  - A note in an Adaptive Card stating that the selected option leads outside Teams.
  - An interstitial dialog explaining the redirection.

</details>

---

### Compatibility

[*Must fix*]

Apps must function fully on the latest versions of the following operating systems and browsers:

• Microsoft Windows  
• macOS  
• Microsoft Edge  
• Google Chrome  
• iOS  
• Android

If an unsupported browser or OS is detected, your app must display a graceful failure message.

---

### Response Time

[*Must fix*]

Teams apps must respond promptly or provide visual feedback (such as loading or typing indicators):

• Tabs should respond within two seconds or display a loading message or warning. [*Must fix*]  
• Bots should respond within two seconds or display a typing indicator. [*Must fix*]  
• Message extensions must respond within two seconds. [*Must fix*]  
• Notifications should display within two seconds of the triggering action. [*Must fix*]

---

### Apps Powered by Artificial Intelligence

Explore resources on responsible AI practices at every stage of innovation via the [Microsoft RAI Toolkit](https://www.microsoft.com/en-us/ai/responsible-ai-resources) and the [HAX Toolkit Project](https://www.microsoft.com/en-us/research/project/hax-toolkit/).

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
This section also adheres to relevant Microsoft commercial marketplace policies for apps with AI-generated content and facial recognition capabilities.

#### Apps with AI-Generated Content

• Apps must not generate or feature inappropriate, harmful, or offensive AI-generated content. [*Must fix*]
  
  Consider using:
  - The [Teams AI library](~/bots/how-to/teams-conversational-ai/teams-conversation-ai-overview.md) for a Teams-centric interface to GPT-based models. [*Good-to-fix*]
  - Moderation hooks to filter bot responses using a moderation API. [*Good-to-fix*]
  - Conversation sweeping capabilities that help monitor and manage conversation flow. [*Good-to-fix*]

• Provide users with mechanisms to report any inappropriate AI-generated content through:
  - Contact details in the app description (mail ID or support link).
  - An in-app reporting system with reference to the inappropriate content.

• Take timely action on reported issues. [*Must fix*]  
• Clearly describe AI functionality before customer acquisition, both in the policy [100.1.3](/legal/marketplace/certification-policies#10013-description) and as part of the in-app experience. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/teams-ai-library-description-guideline.png" alt-text="Screenshot showing AI functionality description guidelines.":::

#### Apps Using Facial Recognition Capabilities

> [!NOTE]
> Apps using facial recognition may be subject to extra scrutiny in line with Microsoft’s Responsible AI principles.

• Apps must not allow facial recognition for identifying individuals for police purposes in the United States. [*Must fix*]
• Clearly indicate facial recognition or emotional inference capabilities in your app description. [*Must fix*]
  - Note: Detecting only individual facial elements (like a smile) is acceptable; however, inferring emotional states (such as anger or happiness) can trigger restrictions.

---

## App Package and Teams Store Listing

[*Must fix*]

Ensure that your app package is correctly formatted and includes all required components.

> [!TIP]
> • Verify that your provided test accounts or environment remains valid until the app goes live.
> • Include detailed testing instructions covering:
>   - **Steps to configure test accounts** for apps dependent on external authentication.
>   - A summary of **expected app behavior** for core workflows.
>   - **Limitations, conditions, or exceptions** clearly explained in the long description and related documents.
>   - **Special considerations** testers should note.
>   - **Prepopulated dummy data** in test accounts to facilitate testing.
>   - Enable third-party integration if you are providing test accounts.

[Back to top](#teams-store-validation-guidelines)

---

### App Manifest

[*Must fix*]

The app manifest outlines your app's configuration. Please observe the following guidelines:

• The manifest must adhere to a publicly released schema. For details, refer to the [app manifest reference](~/resources/schema/manifest-schema.md). Do not use preview versions.  
• For apps including a bot or message extension, ensure consistency between the manifest details and Bot Framework metadata (including bot name, logo, privacy policy link, and terms of service link).  
• If your app uses Microsoft Entra ID for authentication, include the corresponding Application (client) ID. See the [app manifest reference](~/resources/schema/manifest-schema.md#webapplicationinfo) for more.

---

### Use of the Latest App Manifest Schema

• For Single sign-on (SSO), declare Microsoft Entra ID in the manifest for user authentication. [*Must fix*]  
• Update your app package to use a public manifest schema version 1.10 or later. [*Must fix*]  
• When updating an app, only increase the version number; the App ID must remain the same as the published app. [*Must fix*]  
• Do not include additional files in the app package. [*Must fix*]  
• The version numbers in the manifest and any language-specific files must match. [*Must fix*]  
• To support localization, use manifest schema version 1.5 or later and update the `$schema` attribute accordingly. [*Must fix*]  
• For any changes (adding, updating, or removing capabilities), increase the app version and submit the updated manifest via Partner Center. [*Must fix*]  
• Follow the Semantic Versioning Specification (SemVer) (i.e., MAJOR.MINOR.PATCH). [*Must fix*]  
• If admin permissions are required in Teams admin center for your app, declare `webapplicationinfo` in the manifest. Otherwise, the **Permissions** page will show as **...**. [*Must fix*]  
• A production version of the app manifest must be submitted for certification. [*Must fix*]  
• It is recommended to declare the Microsoft Cloud Partner Program ID (CCP ID) in the manifest. [*Good-to-fix*]  
• Ensure that scopes and context declared in the manifest are visibly reflected within the app. [*Must fix*]

---

### App Icons

[*Must fix*]

Icons are essential for app discoverability in the Teams Store.

<details><summary>Expand to Know More</summary>

• The color and outline icons provided in your app listing must match. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/color-outline-icon-same.png" alt-text="Screenshot showing matching color and outline icons.":::

   :::image type="content" source="../../../../assets/images/submission/color-outline-icon-not-same.png" alt-text="Screenshot showing non-matching color and outline icons.":::

• The app package must include two PNG versions of your app icon:
  - A color icon.
  - An outline icon. [*Must fix*]
• The marketplace icon uploaded via Partner Center must match the color icon provided in the package. [*Must fix*]
• The color icon must be 192x192 pixels, featuring your icon symbol on a solid or fully transparent square background. [*Must fix*]
• The outline icon is used in situations like:
  - When the app is active on the left app bar.
  - When a user pins your message extension.
  
  The outline icon must:
  - Be 32x32 pixels.
  - Use white with a transparent background (or vice versa).
  - Have no extra padding around the symbol. [*Must fix*]
• Ensure that all icons are correctly sized, formatted, and match the metadata provided in the Teams Store listing. [*Must fix*]

For additional details, see the [icon guidelines](~/concepts/build-and-test/apps-package.md#app-icons).

</details>

---

### App Descriptions

Your app must include both a short and long description. These descriptions help improve your app’s discoverability and must be consistent across the app configuration and Partner Center.

:::image type="content" source="../../../../assets/images/submission/validation-app-description-adequete-information.png" alt-text="Graphic showing adequate app description in Teams.":::

:::image type="content" source="../../../../assets/images/submission/validation-app-description-inadequete.png" alt-text="Graphic showing an inadequate app description in Teams.":::

<br>

<details><summary>Expand to Know More</summary>

Descriptions must not:
  
• Contain language that derogates against another brand (Microsoft or otherwise).  
• Include unsubstantiated claims (e.g., Guaranteed 200% efficiency increase).  
• Contain comparative marketing information (avoid competitor logos or trademarks). [*Must fix*]  
• Hyperlink contact or get started information (preferably leave them as plain text, though this is [*Good-to-fix*]).  
• Fail to clearly identify the intended audience, value proposition, supported Microsoft products, prerequisites, or limitations of your app. [*Must fix*]  
• If updating your app name, ensure all references in manifest, AppSource, etc., are updated. [*Must fix*]  
• Omit explanations of limitations or dependencies (e.g., enterprise account, paid subscription, specific licenses, regional restrictions). [*Must fix*]
  
   :::image type="content" source="../../../../assets/images/submission/validation-app-description-limitations-calledout-pass.png" alt-text="Screenshot showing proper call-out of limitations in app description.":::
  
   :::image type="content" source="../../../../assets/images/submission/validation-app-description-limitations-not-calledout-fail.png" alt-text="Screenshot showing a failure to call out limitations in app description.":::

• If your app supports specific regions, include any regional dependencies clearly in the description.  
• The first reference to Teams should be written as Microsoft Teams; subsequent references can be shortened to Teams. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-app-description-teams-reference-pass.png" alt-text="Screenshot showing correct reference to Microsoft Teams.":::

   :::image type="content" source="../../../../assets/images/submission/validation-app-description-teams-reference-fail.png" alt-text="Screenshot showing incorrect reference to Microsoft Teams.":::

#### Short Description

A short description should be a one-sentence summary that highlights your app's key value proposition.

**Dos:**

• Keep it concise (one sentence).  
• Front-load the most important information.  
• Incorporate relevant keywords for search optimization.  
• Optimize character usage (avoid repeating the app name).

**Don't:**

[*Good-to-fix*]

• Avoid using the word **app** in the short description.

#### Long Description

The long description offers an engaging narrative that details your app’s value, audience, and industry focus. Although up to 4,000 characters are permitted, around 1,000 characters is recommended.

**Dos:**

• Use [Markdown](https://support.office.com/article/use-markdown-formatting-in-teams-4d10bd65-55e2-4b2d-a1f3-2bebdcd2c772) for formatting.  
• Write in an active voice and directly address the user (e.g., **You can...**).  
• List up to three key benefits.  
• Clearly outline your app’s core value propositions.  
• Provide features as bullet points for readability.  
• Include any necessary limitations, prerequisites, or conditions clearly.  
• Include help or support links.  
• Use “Microsoft 365” in place of “Office 365.”  
• Use proper phrasing when referencing Teams (e.g., **… works with Microsoft Teams.**, **… integrated with Microsoft Teams.**) in your description.

**Don'ts:**

[*Must fix*]

• Exceed a 500-word limit.  
• Abbreviate **Microsoft** as **MS** or **MSFT**.

   :::image type="content" source="../../../../assets/images/submission/validation-app-description-microsoft-abbreviated.png" alt-text="Screenshot showing abbreviated Microsoft in app description.":::

   :::image type="content" source="../../../../assets/images/submission/validation-app-description-microsoft-not-abbreviated.png" alt-text="Screenshot demonstrating correct reference to Microsoft.":::

• Indicate that your app is an offering from Microsoft by using official slogans or taglines.

   :::image type="content" source="../../../../assets/images/submission/validation-app-description-offering-from-microsoft.png" alt-text="Screenshot showing an incorrect indication of a Microsoft offering.":::

   :::image type="content" source="../../../../assets/images/submission/validation-app-description-no-offering-indication-from-microsoft.png" alt-text="Screenshot showing correct description without Microsoft offering indication.":::

• Use language like **… certified for…** or **… powered by…** unless officially certified.  
• Include typos or grammatical errors.  
• Unnecessarily use all capital letters.  
• Include links to AppSource.  
• Make unverified claims or comparisons to other offers.

For further guidance on crafting accurate and effective app descriptions, see the [checklist to write app descriptions](submission-checklist.md#write-descriptions).

</details>

---

### Screenshots

Screenshots provide a visual preview of your app and complement its name, icon, and descriptions.

<br>

<details><summary>Expand to Know More</summary>

Keep these in mind:

• You may include up to five screenshots per listing.  
• Acceptable formats include PNG, JPEG, and GIF.  
• Dimensions must be 1366x768 pixels, and each screenshot's file size must not exceed 1,024 KB.

**Dos:**

• Focus on demonstrating your app's capabilities (e.g., how users interact with your bot).  
• Include screenshots that accurately represent your app's UI.  
• Use text minimally and ensure it’s legible.  
• Frame screenshots using your brand's color scheme and marketing imagery.  
• Use high-resolution images that are clearly readable. [*Must fix*]  
• At least one screenshot should illustrate mobile functionality. [*Good-to-fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-guidelines-pass-app-functionality-mobile.png" alt-text="Screenshot showing successful mobile app functionality.":::

• Ensure you provide between three and five screenshots. [*Must fix*]  
• Use only actual UI or relevant scenarios – avoid unrelated mockups. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-guidelines-fail-suppliement-screenshot.png" alt-text="Screenshot showing a failure due to supplementary content in a screenshot.":::

   :::image type="content" source="../../../../assets/images/submission/validation-guidelines-fail-actual-UI.png" alt-text="Screenshot showing a failure due to an actual UI misrepresentation.":::

• At least one screenshot must depict integrated functionality with Teams. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-guidelines-fail-app-functionality.png" alt-text="Screenshot showing failed scenario of app functionality integration.":::

• Do not incorrectly reference Teams by abbreviating it as MS, MSFT, or MS Teams. [*Must fix*]
• For apps extensible across Microsoft 365 clients, include screenshots that illustrate functionality within those clients. [*Good-to-fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-guidelines-pass-app-functionality-MS-365.png" alt-text="Screenshot showing app functionality in MS 365 clients.":::

• Provide captions with your screenshots to enhance user understanding. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-guidelines-pass-app-functionality.png" alt-text="Screenshot showing a caption for app functionality.":::

• For apps that support tabs, include at least one screenshot that displays the tab with Teams chrome. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-guildelines-pass-tabs-capability.png" alt-text="Screenshot showing proper tab capability display.":::

• For apps designed to work with Microsoft Copilot, include screenshots depicting the app within the Copilot experience. [*Must fix*]

   :::image type="content" source="../../../../assets/images/Copilot/teams-app-in-copilot.png" alt-text="Screenshot showing app functionality within Microsoft Copilot.":::

**Don'ts:**

• Do not include mockups that misrepresent the actual UI or show the app being used outside Teams.

   :::image type="content" source="../../../../assets/images/submission/validation-guidelines-fail-app-functionality-teams.png" alt-text="Screenshot showing a failure where app functionality is misrepresented in Teams.":::

</details>

---

### Videos

A video is an effective method to communicate your app's value proposition. You can include a YouTube or Vimeo URL that demonstrates your app’s functionality, offers a demo, or walks through a use-case. [*Good-to-fix*]

Before submitting a video, ensure:

• The video is short, engaging, and of high quality.  
• It demonstrates how to set up and use the app.  
• It uses a narrative format.  
• For a value video, the duration should be 60-90 seconds, while a walkthrough video should ideally be 3-5 minutes. [*Good-to-fix*]  
• Advertisements on your YouTube or Vimeo account are disabled before submission. [*Must fix*]  
• The video emphasizes the app’s functionalities and integration within Teams. [*Must fix*]  
• The video link is functional. [*Must fix*]  
• Video URL formats must be:
  - YouTube: `https://www.youtube.com/watch?v=:id` or `https://youtu.be/:id`
  - Vimeo: `https://vimeo.com/:id`

   :::image type="content" source="../../../../assets/images/submission/video-app-listing-partner-center.png" alt-text="Screenshot showing a failure scenario with video submission in Partner Center.":::

• Optionally, the video can appear first in the screenshots or videos carousel in the Teams Store and AppSource pages. [*Good-to-fix*]  
• The demo or walkthrough video should educate, not simply promote your app.

For more guidance, refer to the [checklist to create a video](submission-checklist.md#create-a-video).

<br>

---

### Privacy Policy

[*Must fix*]

The privacy policy can be either specific to your Teams app or apply to your other services as well.

• If using a generic template, ensure you reference the relevant services and platforms covered by the policy.  
• Clearly outline how user data is stored, retained, and deleted, along with the security measures in place.  
• Include clear contact information.  
• Avoid broken links or references to beta/staging environments.  
• Do not include links to AppSource.  
• Ensure the privacy policy does not require authentication for access and excludes any commerce-related UI links.  
• The same privacy policy link must be included in both the app manifest and AppSource.

---

### Terms of Use

[*Must fix*]

Ensure your Terms of Use:

• Are specific to your offering and hosted on your own domain.  
• Use a secure (HTTPS) link.  
• Can be accessed without authentication.  
• Are consistently referenced in both the app manifest and AppSource.

---

### Support Links

[*Must fix*]

Your support URLs should be accessible without requiring authentication. Users must be able to contact you freely.

<details><summary>Expand to Know More</summary>

• The support URLs should provide either contact details or a clear mechanism for raising support tickets.  
• For example, if hosted on GitHub, ensure the page is under your ownership and provides contact information or ticket submission details.

   :::image type="content" source="../../../../assets/images/submission/validation-supportlinks-authentication.png" alt-text="Screenshot illustrating support links that improperly require authentication.":::

</details>

---

### Localization

[*Must fix*]

• If your app supports multiple languages, include a localization file in your app package that adheres to the Teams localization schema. More details can be found in [Teams localization schema](~/concepts/build-and-test/apps-localization.md). [*Must fix*]  
• Ensure that the localized metadata content is consistent between `en-us` and other supported languages. [*Must fix*]  
• Clearly list the supported languages in the AppSource description (e.g., "This app is available in X language(s)"). [*Must fix*]  
• If no user's client language matches your provided localizations, the default language must be used. Update the `localizationInfo` property accordingly. [*Must fix*]

---

## Apps Linked to SaaS Offer

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
This section aligns with [Microsoft commercial marketplace policy number 1140.5](/legal/marketplace/certification-policies?branch=pr-en-us-5673). If your Teams app is linked to a Software as a Service (SaaS) offer, adhere to these guidelines.

<br>

<details><summary>General</summary>

• Independent Software Vendors (ISVs) must provide a way for multiple users (subscribers) in the same tenant to manage subscriptions and assign licenses individually.  
• Ensure that your offer meets all the [technical requirements](/microsoftteams/platform/concepts/deploy-and-publish/appsource/prepare/include-saas-offer) for Teams apps linked to a SaaS offer.  
• Adhere to the requirements defined in [1000 Software as a Service (SaaS)](/legal/marketplace/certification-policies#1000-software-as-a-service-saas).  
• The `subscriptionOffer` details in the app manifest must be correct. For example, for publisher ID `contoso1234` and offer ID `offer01`, the manifest must list `contoso1234.offer01`.  
• The linked SaaS offer must be live in AppSource; preview offers will not be accepted.

</details>

<br>

<details><summary>Offer Metadata</summary>

• Offer metadata must be consistent across your app manifest, Teams app listing in AppSource, and the SaaS offer in AppSource.  
• Both the Teams app and SaaS offer must originate from the same publisher.  
• In Partner Center, select **Additional purchases** as **Yes, my product requires purchase of a service or offers additional in-app purchases​**.  
• Clearly describe plan details, pricing, limitations, and dependencies so that users can fully understand the offer.  
• If your SaaS offer has specialized purchase flows, describe these clearly in your app metadata and subscription plan details.

</details>

<br>

<details><summary>SaaS Offer Home Page and License Management</summary>

• Provide a clear introduction on how subscribers can use the product.  
• Allow subscribers to assign licenses to users.  
• Offer multiple support channels (FAQ, knowledge base, email) for license management.  
• Validate that users are not assigned duplicate licenses.  
• Notify users after license assignments.  
• Provide clear guidance on how to add the app to Teams and initiate workflows (e.g., via Teams chatbot or email).  
• If using [Microsoft license management](manage-third-party-apps-license.md), redirect the user after subscription confirmation to Microsoft license management in Teams.

</details>

<br>

<details><summary>Usability and Functionality</summary>

After a successful purchase and license assignment, ensure that:

• Users have access to all features associated with their subscription plan.  
• The app clearly demonstrates the significant benefits of the subscription.  
• A link from within your Teams app enables subscribers to manage licenses later on.

</details>

<br>

<details><summary>Configure and Test SaaS Application</summary>

If your app's configuration is complex, provide:

• An end-to-end functional document.  
• Detailed configuration steps for the linked SaaS offer.  
• Instructions for license and user management.
  
> [!TIP]
> A demonstration video explaining your app and license management can further assist the testing team.

</details>

[Back to top](#teams-store-validation-guidelines)

---

## Tabs

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
This section follows [Microsoft commercial marketplace policy number 1140.4.2](/legal/marketplace/certification-policies#114042-tabs). If your app includes a tab, ensure these guidelines are met.

> [!TIP]
> For best practices in creating an engaging tab experience, see the [Teams tab design guidelines](~/tabs/design/tabs.md).

<br>

<details><summary>Setup</summary>

• The tab setup must not leave a new user at a dead end; provide guidance on how to complete actions or workflows. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-tabs-setup-new-user.png" alt-text="Graphic showing a new user dead-end in tab setup.":::

• Avoid forcing users to leave Teams during tab configuration. Instead, explain the configuration process within Teams. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-tabs-setup-profile-name.png" alt-text="Screenshot showing tab setup with profile name configuration.":::

• Do not embed a full website within the configuration screen; focus solely on essential configuration steps. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-tabs-setup-configuration-experience.png" alt-text="Screenshot illustrating the correct configuration experience in a tab.":::

    :::image type="content" source="../../../../assets/images/submission/validation-tabs-setup-configuration-screen.png" alt-text="Screenshot illustrating the detailed tab configuration screen.":::

• If users need to supply a URL during tab configuration:
  - Provide guidance on how they can acquire or generate the URL. [*Must fix*]
  - Validate that the URL is appropriate for the app’s functionality. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-tab-configuration-way-forward-url-pass.png" alt-text="Screenshot showing a tab configuration with proper URL guidance.":::
  
    :::image type="content" source="../../../../assets/images/submission/validation-tab-configuration-way-forward-url-fail.png" alt-text="Screenshot showing a tab configuration lacking URL guidance.":::

• Hyperlink contact information in the configuration screen instead of displaying plain text. [*Must fix*]  
• For improved first-run experience, hyperlink your support URL or email in the configuration. [*Good-to-fix*]

</details>

<br>

<details><summary>Views</summary>

• The sign-in screen must avoid large logos. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-views-applogin.png" alt-text="Screenshot showing a proper sign-in screen.":::

• Consider breaking down content across multiple tabs to maintain clarity.

    :::image type="content" source="../../../../assets/images/submission/validation-views-multiple-tabs.png" alt-text="Screenshot showing multiple tabs for content organization.":::

• Avoid duplicate headers or logos in the I-frame since Teams already displays these in its chrome. [*Good-to-fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-views-no-duplicate-header-logo.png" alt-text="Screenshot showing a tab without duplicate headers.":::

    :::image type="content" source="../../../../assets/images/submission/validation-views-duplicate-header-logo.png" alt-text="Screenshot showing a tab with duplicate headers.":::

</details>

<br>

<details><summary>Navigation</summary>

Follow these tips for optimal navigation:

• Tabs must not provide navigation that conflicts with primary Teams navigation. Avoid left rails that mimic Teams navigation icons with stacked text. Instead, use clearly labeled inline text or a hamburger menu. [*Must fix*]

   - Refer to [basic](~/concepts/design/design-teams-app-basic-ui-components.md) and [advanced](~\concepts\design\design-teams-app-advanced-ui-components.md) Fluent UI components for guidance.

   :::image type="content" source="../../../../assets/images/submission/validation-navigation-static-tab.png" alt-text="Screenshot showing non-conflicting tab navigation.":::

   :::image type="content" source="../../../../assets/images/submission/validation-navigation-left-navigation.png" alt-text="Screenshot showing conflicting left rail navigation in a tab.":::

• If using a toolbar on the left without a navigation component, ensure there is at least 20 pixels of spacing from Teams’ native navigation. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-navigation-spacing-between-toolbar.png" alt-text="Screenshot showing correct spacing between a toolbar and Teams navigation.":::

• Secondary pages within a tab should open as deeper navigation levels (L2, L3) using breadcrumbs or a separate menu. Use components such as:
  - Back buttons
  - Page headers
  - Hamburger menus

    :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-improper-navigation-leveles.png" alt-text="Screenshot showing improper navigation levels in a meeting dialog.":::

• Deep links in tabs must remain within Teams (avoid linking to an external webpage). [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-navigation-view-button-not-linked-static-tab.png" alt-text="Screenshot showing incorrect deep linking in a static tab.":::

• Ensure core app workflows remain within Teams; only non-core actions may redirect externally. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-navigation-core-workflow-within-configuration.png" alt-text="Screenshot showing proper internal core workflow.":::

    :::image type="content" source="../../../../assets/images/submission/validation-navigation-core-workflow-redirects-outside.png" alt-text="Screenshot showing improper external redirection for core workflows.":::

• Prevent horizontal scrolling issues in in-meeting tabs and dialogs. [*Must fix*]

• Always provide a back button option to allow users to return to a previous state. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/back-button-available.png" alt-text="Screenshot showing a back button is available.":::

   :::image type="content" source="../../../../assets/images/submission/no-back-button-available.png" alt-text="Screenshot showing a failure scenario with no back button.":::

• Adaptive Cards used in tabs should not have horizontal scrolling. [*Must fix*]  
• The bottom navigation rail should not conflict with Teams native mobile navigation. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-tab-bottom-rail-conflicts-with-teams-mobile.png" alt-text="Screenshot showing conflicting bottom rail navigation.":::

</details>

<br>

<details><summary>Usability</summary>

• Content within the tab must not be truncated or overlapping. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-usability-content-truncation.png" alt-text="Screenshot showing a tab with content truncation issues.":::

• Allow users the ability to undo their most recent action. [*Must fix*]  
• For personal tabs that aggregate content from channel instances, provide a unified view across all relevant data. [*Good-to-fix*]  
• Ensure that the tab’s theme responds dynamically to Teams theme changes. [*Good-to-fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-usability-responsive-tabs.png" alt-text="Screenshot showing a tab responsive to theme changes.":::

    :::image type="content" source="../../../../assets/images/submission/validation-usability-unresponsive-tabs.png" alt-text="Screenshot showing a tab that does not respond to theme changes.":::

• Use Teams styled components (including fonts, color palettes, grid systems, etc.) where possible. [*Good-to-fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-usability-app-uses-diff-font.png" alt-text="Screenshot showing incorrect font usage instead of Teams native font.":::

• If your app includes settings that affect functionality, consider adding a dedicated **Settings** tab. [*Good-to-fix*]  
• Tabs must follow standard Teams interaction designs (e.g., in-page navigation and clear information hierarchy). [*Good-to-fix*]  
• Ensure that tab experiences are fully responsive on mobile devices (both Android and iOS). [*Must fix*]

   > [!TIP]
   > • Consider including a personal bot alongside the personal tab.
   > • Allow easy sharing of content from personal tabs.

• Ensure that no UI elements within the tab completely obstruct the workflow (e.g., bots that cannot be minimized). [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-tab-elements-impede-workflow.png" alt-text="Screenshot showing obstructive UI elements in a tab.":::

• The tab must function without broken features; it should provide the functionality as described in your listing. [*Must fix*]  
• Remove any non-essential links from tab footers. [*Must fix*]

</details>

<br>

<details><summary>Scope Selection</summary>

• The landing page of configurable tabs must not be scoped as personal (e.g., include personal content such as **My Tasks** or **My Dashboard**). [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-configurable-tab-content-personal-scope.png" alt-text="Screenshot showing personal content within a configurable tab landing page.":::

• After configuration, the landing page must reflect a collaborative view for the channel. [*Must fix*]  
• In cases where a personal scope view enhances productivity, employ filtered views, deep links, or navigation within the configurable tab while keeping the landing page consistent for all users. [*Must fix*]  
• The landing page content in configurable tabs must be contextually consistent for all channel members. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-usability-configurable-tab-personal-info.png" alt-text="Screenshot showing inconsistent content in a configurable tab landing page.":::

• The functionality of configurable tabs must remain focused and not cluttered with additional layers. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-usability-configurable-nested-tabs.png" alt-text="Screenshot showing an example of overly nested tabs.":::

</details>

<br>
[Back to top](#teams-store-validation-guidelines)

---

## Bots

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
This section conforms to [Microsoft commercial marketplace policy number 1140.4.3](/legal/marketplace/certification-policies#114043-bots).

For more information on creating a great bot experience, see the [Teams bot design guidelines](~/bots/design/bots.md).

<br>

<details><summary>Bot Design Guidelines</summary>

• Follow the [Teams bot design guidelines](../../../../bots/design/bots.md) for optimal user experience.  
• Implement dialogs to avoid repetitive multi-turn bot responses (for example, collapse repetitive data entry fields into a single dialog). [*Must fix*]  
• Any broken links, responses, or workflows in the bot must be corrected. [*Must fix*]

</details>

<br>

<details><summary>Bot Commands</summary>

Commands provide a set of words or phrases for the bot to process user input:

• Ensure all supported commands (including generic ones such as **Hi**, **Hello**, and **Help**) operate reliably. [*Must fix*]
  
   :::image type="content" source="../../../../assets/images/submission/validation-bot-commands-generic-response-pass.png" alt-text="Screenshot showing a bot correctly responding to generic commands.":::

   :::image type="content" source="../../../../assets/images/submission/validation-bot-commands-generic-no-response.png" alt-text="Screenshot showing a bot failing to respond to generic commands.":::

• Bot commands must not lead to dead ends; always provide a way forward. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-bot-commands-deadend.png" alt-text="Screenshot showing a bot command leading to a dead end.":::

• List at least one valid command in the `items.commands.title` section of the app manifest, with clear descriptions. These commands surface as prepopulated options in the bot command menu. [*Good-to-fix*]

• Bot responses must not incorporate official Microsoft product images or avatars. Instead, use your own assets. [*Must fix*]
• Bots should not continue displaying a loading indicator after responding. [*Must fix*]
• The bot’s help command must stay within Teams – do not redirect the user outside Teams. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-bot-redirects-user-outside-teams.png" alt-text="Screenshot showing improper bot redirection outside Teams.":::

• The bot must always provide a valid response even if user input is irrelevant. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-bot-response-valid-improper-input.png" alt-text="Screenshot showing a valid bot response to improper input.":::

   :::image type="content" source="../../../../assets/images/submission/validation-bot-response-improper-response-invalid-command.png" alt-text="Screenshot showing an invalid bot response to an improper command.":::

• Do not prefix bot commands with special characters like slash (**/**). [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-bot-commands-special-characters.png" alt-text="Screenshot illustrating a command incorrectly prefixed with a special character.":::

• Provide a meaningful response even for invalid commands; avoid dead ends or errors. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-bot-way-forward-for-invalid-command.png" alt-text="Screenshot showing a bot providing guidance for an invalid command.":::

   :::image type="content" source="../../../../assets/images/submission/validation-welcome-message-bot-dead-end-invalid-command.png" alt-text="Screenshot showing a bot erroneously using the same response for valid and invalid commands.":::

• Bot functionality must remain relevant to its installed scope and provide consistent value. [*Must fix*]  
• Avoid duplicate commands. [*Must fix*]  
• Do not display a typing indicator once the bot has responded, though using one while processing a response is acceptable. [*Must fix*]  
• The help command (in any case) should return clear guidance for using the bot. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-bot-valid-response-lowercase.png" alt-text="Screenshot showing a bot not responding correctly to lowercase commands.":::

   :::image type="content" source="../../../../assets/images/submission/validation-bot-valid-response-logged-app.png" alt-text="Screenshot showing a bot failing to respond when the user is not logged into the app.":::

• Ensure message responses in mobile are not truncated and provide actionable next steps. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-bot-response-no-truncate-mobile.png" alt-text="Screenshot showing a clear bot message on mobile.":::

   :::image type="content" source="../../../../assets/images/submission/validation-bot-response-truncate-mobile.png" alt-text="Screenshot showing a truncated bot message on mobile.":::

• All links within an Adaptive Card must be responsive and clearly indicate if they will open externally. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-bot-action-button-redirect-warning.png" alt-text="Screenshot showing a properly labeled bot action button with external redirection warning.":::

• For one-way notification bots, set `isNotificationOnly` to true in the manifest. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-bot-command-isnotification-only-true.png" alt-text="Screenshot showing notification-only property correctly set to true.":::

  :::image type="content" source="../../../../assets/images/submission/validation-bot-command-isnotification-only-not-true.png" alt-text="Screenshot showing a notification-only bot not functioning appropriately.":::

• Ensure your bot experience is optimized on mobile devices. [*Must fix*]

> [!TIP]
> For personal bots, consider adding a **Help** tab to further describe bot capabilities.

</details>

<br>

<details><summary>Bot First Run User Experience</summary>

• In personal scope, always send a welcome message or provide prompt starters. [*Must fix*]

   If using prompt starters:
  
   - Ensure at least one command explains the bot’s value. [*Must fix*]
   - Prompt starters must be functional and return responses. [*Must fix*]
   - The command description must be clear. [*Must fix*]
   - Include at least three unique prompt starters (if applicable). [*Good-to-fix*]

   If using a welcome message:
  
   - For complex configuration workflows, include configuration details in the welcome message.
   - Use an Adaptive Card with buttons for clarity, as per [how to trigger a bot welcome message](~/bots/how-to/conversations/send-proactive-messages.md).  
   - For simpler apps, a welcome message is optional; however, if used, it must follow these guidelines.

     :::image type="content" source="../../../../assets/images/submission/validation-bot-welcome-message.png" alt-text="Screenshot of a bot welcome message with configuration guidance.":::

     :::image type="content" source="../../../../assets/images/submission/validation-bot-no-welcome-message.png" alt-text="Screenshot of an app failing to trigger a welcome message for complex configurations.":::

• Bots in channels and chats should not send individual welcome messages to each user (to avoid spam). Instead, mention the person who added the bot.

   :::image type="content" source="../../../../assets/images/submission/validation-bot-welcome-message-not-triggered.png" alt-text="Screenshot showing a bot not triggering an unnecessary welcome message.":::

   :::image type="content" source="../../../../assets/images/submission/validation-bot-welcome-message-triggered.png" alt-text="Screenshot showing a bot triggering an appropriate welcome message.":::

• The welcome message must include:
  - The value proposition of the bot.
  - Instructions on configuration.
  - A brief description of supported commands. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-welcome-message-no-way-forward.png" alt-text="Screenshot showing a bot welcome message with no way forward.":::

   :::image type="content" source="../../../../assets/images/submission/validation-welcome-message-clear-way-forward.png" alt-text="Screenshot showing a bot welcome message with clear guidance.":::

• Bots in channels or group chats should not send 1:1 proactive welcome messages to all members. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-bot-send-proactive-message-to-all-members.png" alt-text="Screenshot showing a bot improperly sending proactive welcome messages to all members.":::

• For notification-only bots, proactive welcome messages in a channel should only contain crucial configuration information. [*Must fix*]
• Bots in channels or group chats must not initiate individual workflows; such workflows should occur in 1:1 chats. [*Must fix*]
• Include any limitations related to the bot’s functionality clearly in the welcome message. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-bot-welcome-messahe-with-app-limitation.png" alt-text="Screenshot showing a bot welcome message that includes app limitations.":::

   :::image type="content" source="../../../../assets/images/submission/validation-bot-welcome-messahe-without-app-limitation.png" alt-text="Screenshot showing a bot welcome message omitting app limitations.":::

• In personal scope, the welcome message should trigger automatically upon app install. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-bot-no-welcome-message-in-personal-scope.png" alt-text="Screenshot showing a bot missing welcome message in personal scope.":::

• Ensure welcome messages trigger only once on install (avoid repetition on every command). [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-welcome-message-trigger-for-any-command.png" alt-text="Screenshot showing a bot erroneously triggering welcome messages repeatedly.":::

• The content of the welcome message must match the app name in the manifest. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-app-name-mismatch-manifeast-and-welcome-message.png" alt-text="Screenshot showing a mismatch between app name in the manifest and welcome message.":::

• The welcome message should not mention competitor platforms or redirect users to another Teams app. [*Must fix*]  
• Do not include links to any app marketplaces (including AppSource) in the welcome message. [*Must fix*]  
• For apps with complex workflows requiring admin-led installation, proactively send a welcome message in the appropriate scope. [*Must fix*]

• A welcome message sent in a channel should not be sent to each user individually. [*Good-to-fix*]

> [!TIP]
> Consider using a carousel tour in personal welcome messages to guide users through the bot's functionalities (e.g., **Create a task**).

</details>

<br>

<details><summary id="botmessagespamming">Bot Message Spamming</summary>

Bots must avoid spamming users by sending multiple messages in quick succession.

• For channels and chats:
  - Post a single thread with replies instead of multiple separate messages. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-bot-message-spamming-one-message.png" alt-text="Screenshot showing one consolidated bot message.":::

    :::image type="content" source="../../../../assets/images/submission/validation-bot-message-spamming-multiple-messages.png" alt-text="Screenshot showing multiple bot messages that constitute spam.":::

• For personal chats:
  - Do not send multiple messages rapidly. [*Must fix*]
  - Consolidate information into one comprehensive message. [*Must fix*]
  - Avoid multi-turn conversations for completing a single repetitive task. [*Must fix*]
  - Use a form (or dialog) for user input collection. [*Must fix*]
  - If using NLP-based conversation, multi-turn can be used to enhance engagement.

    :::image type="content" source="../../../../assets/images/submission/validation-bot-messages-using-task-module.png" alt-text="Screenshot showing bot interaction using a task module.":::

    :::image type="content" source="../../../../assets/images/submission/validation-bot-messages-using-mutliple-conversation.png" alt-text="Screenshot showing a multi-turn conversation design.":::

• For welcome messages:
  - Do not repeat the same welcome message at regular intervals (e.g., when new members join, message only the new member). [*Must fix*]

    :::image type="icon" source="../../../../assets/images/submission/validation-bot-send-proactive-message-to-all-members.png" alt-text="Screenshot showing a bot spamming messages.":::

</details>

<br>

<details><summary>Bot Notifications</summary>

Bot notifications must always include content relevant to the defined scope (team, chat, or personal). [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-bot-notifications-relevant.png" alt-text="Screenshot showing relevant bot notifications.":::

   :::image type="content" source="../../../../assets/images/submission/validation-bot-notifications-not-relevant.png" alt-text="Screenshot showing irrelevant bot notifications.":::

</details>

<br>

<details><summary>Bots and Adaptive Cards</summary>

Adaptive Cards are recommended for bot responses. Consider the following:

• Cards should be lightweight and support only up to six actions; use dialogs or tabs for more extensive content.
• For more details, see:
  - [Designing Adaptive Cards](~/task-modules-and-cards/cards/design-effective-cards.md)
  - [Cards reference](~/task-modules-and-cards/cards/cards-reference.md#types-of-cards)
• Bot responses must be fully responsive on mobile and include actionable next steps where necessary.

</details>

<br>

<details><summary>Notification Only Bots</summary>

For apps that use notification-only bots:

• They should trigger notifications based on specific events (e.g., new sales leads) and provide clear value.  
> [!TIP]
> Include preview information and inline actions within the card so that a user is not forced to leave Teams for further action.

</details>

<br>

<details><summary>Bot Metadata Information</summary>

• Ensure that bot details in the app manifest (bot name, logo, privacy link, terms of service link) are consistent with Bot Framework metadata. [*Must fix*]  
• The bot ID in the manifest must match the bot ID in the last published version; any change could result in permanently losing user interaction history. [*Must fix*]  
• Any updates to app name, metadata, welcome messages, or responses must be consistently updated across materials. [*Must fix*]  
• The app name referenced in bot messages must match the app name in the manifest. [*Must fix*]

</details>

<br>

<details><summary>Bot in Collaborative Scope</summary>

• A bot in a channel/group chat should not be used to collect roster information for sending proactive 1:1 messages (e.g., pairing people) unless it provides clear value within that scope. [*Must fix*]  
• Similarly, a bot that solely retrieves posts for 1:1 notifications is not acceptable. [*Must fix*]  
• The bot must offer genuine value within the collaborative environment. [*Must fix*]

</details>

[Back to top](#teams-store-validation-guidelines)

---

## Message Extensions

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
This section follows [Microsoft commercial marketplace policy number 1140.4.4](/legal/marketplace/certification-policies#114044-messaging-extensions).

For best practices, review the [Teams message extension design guidelines](~/messaging-extensions/design/messaging-extension-design.md).

<br>

<details><summary>Messaging Extensions Design Guidelines</summary>

• If your app uses messaging extensions, it must adhere to the related design guidelines.  
   :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-design-guidelines-fail.png" alt-text="Screenshot showing an app that fails to meet messaging extension design guidelines.":::

• Messaging extensions should provide shortcuts for inserting app content or performing actions without leaving the conversation. Keep the UI simple and avoid embedding an entire website within the extension. [*Must fix*]
• Ensure that preview images in Adaptive Cards load properly. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-preview-image-adaptive-card-loading.png" alt-text="Screenshot showing an Adaptive Card preview image that loads correctly.":::

  :::image type="content" source="../../../../assets/images/submission/validation-preview-image-adaptive-card-not-loading.png" alt-text="Screenshot showing an Adaptive Card preview image that fails to load.":::

• Messaging extension response cards must include your app icon for clarity. [*Must fix*]
• There must be no broken functionality leading to dead ends when using messaging extensions. [*Must fix*]
• Ensure messaging extensions work correctly in both group chat and channel scopes. [*Must fix*]
• Provide a method within the extension for users to sign in or sign out. [*Must fix*]
• If using OpenAPI URLs in message extensions, avoid redirection on API calls; serve API calls from your controlled domains.

</details>

<br>

<details><summary>Action Commands for Action-Based Message Extensions</summary>

For action-based messaging extensions:

• Allow users to trigger quick actions on a message without intermediate steps (like sign in). [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-no-intermediate-step.png" alt-text="Screenshot showing an action command without intermediate steps.":::

    :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-intermediate-step-available.png" alt-text="Screenshot showing an action command that requires an intermediate step.":::

• Pass the message’s context to support the subsequent workflow. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-app-passes-message.png" alt-text="Screenshot showing message context passed correctly.":::

    :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-app-doesnot-pass-message.png" alt-text="Screenshot showing message context not passed.":::

• Prefer using the host app name instead of generic verbs for action commands (e.g., **Start a Skype Meeting** vs. **Start Meeting**). [*Good-to-fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-action-command-host-name.png" alt-text="Screenshot showing action command using host app name appropriately.":::

    :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-action-command-verb.png" alt-text="Screenshot showing generic action command verb usage.":::

• Upon invoking a message action, ensure the user can complete the workflow without experiencing errors or continuous loading. [*Must fix*]
• Avoid duplicate action commands. [*Must fix*]
• For apps using only action-based messaging extensions:
  - Post a notification confirming the action in context (channel or 1:1 chat). [*Must fix*]
  - Allow users to share relevant cards with others after the action is performed. [*Must fix*]

</details>

<br>

<details><summary>Preview Links (Link Unfurling)</summary>

[*Must fix*]

• If the app declares the `supportsAnonymizedPayloads` property and the user has not installed the app, the card should unfurl and trigger the add app dialog upon selection. [*Must fix*]
• Messaging extensions should preview recognized links in the Teams compose box. Do not declare domains outside your control (no absolute URLs or wildcards such as `*.com` or `*.org`). [*Must fix*]
• Only include domains in the `messageHandler` section of the manifest that you directly own. Do not list domains like `*.botframework.com.` [*Must fix*]

</details>

<br>

<details><summary>Search Commands</summary>

• For search-based messaging extensions, provide descriptive text that helps users search effectively. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-search-commands-text-available.png" alt-text="Screenshot showing available help text for search commands.":::

    :::image type="content" source="../../../../assets/images/submission/validation-search-commands-text-not-available.png" alt-text="Screenshot showing missing help text for search commands.":::

• Ensure that any @mention executable commands are clear and easy to understand.

    :::image type="content" source="../../../../assets/images/submission/validation-search-command-unclear-executable.png" alt-text="Screenshot showing an unclear executable command.":::

</details>

[Back to top](#teams-store-validation-guidelines)

---

## Dialogs

[*Must fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
This section is aligned with [Microsoft commercial marketplace policy number 1140.4.5](/legal/marketplace/certification-policies#114045-task-modules).

<details><summary>Expand to Know More</summary>

A dialog (referred to as a task module in TeamsJS v1.x):

• Must include your app’s icon and short name.  
• Must only display the essential components required for a specific action rather than embedding an entire app.

For further details, see the [Teams dialog design guidelines](~\task-modules-and-cards\task-modules\design-teams-task-modules.md).

   :::image type="content" source="../../../../assets/images/submission/validation-task-module-displays-components.png" alt-text="Screenshot showing a task module displaying only necessary components.":::

   :::image type="content" source="../../../../assets/images/submission/validation-task-module-embeds-app.png" alt-text="Screenshot showing an incorrect example of a task module embedding an entire app.":::

> [!TIP]
> For more on high-quality dialog design, refer to [Teams task module design guidelines](~/task-modules-and-cards/task-modules/design-teams-task-modules.md).

</details>

[Back to top](#teams-store-validation-guidelines)

---

## Meeting Extensions

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
This section meets [Microsoft commercial marketplace policy number 1140.4.6](/legal/marketplace/certification-policies#114046-meeting-extensions).

> [!TIP]
> For guidelines on designing excellent meeting extensions, see [Teams meeting extension design guidelines](~/apps-in-teams-meetings/design/designing-apps-in-meetings.md).

<br>

<details><summary>Meeting Extension Design Guidelines</summary>

• Your app must adhere to [meeting extension design guidelines](../../../../apps-in-teams-meetings/design/designing-apps-in-meetings.md).  
• For in-meeting app experiences:
  - Engage meeting participants with responsive in-meeting tabs, dialogs, or the share-to-stage feature.
  - Ensure that core user workflows are carried out within Teams without redirecting users externally. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-outside-teams-core-workflows.png" alt-text="Screenshot showing an in-meeting experience incorrectly redirecting users outside Teams.":::

• Your app must offer value beyond just providing custom Together Mode scenes. [*Must fix*]  
• Declare `groupChat` as a scope under `configurableTabs`, and include `meetingDetailsTab`, `meetingChatTab`, and `meetingSidePanel` in the context property in the app manifest to support mobile meeting experiences. [*Must fix*]  
• Meeting canvases should not dead-end users; they must display graceful error messages if capabilities are region-restricted. [*Must fix*]  
• The meeting canvas header must correctly display your app’s name. [*Must fix*]  
• Include an option for users to sign out or log out from the meeting extension. [*Must fix*]  
• For mobile meeting tabs, include only relevant workflows – do not display blank pages. [*Must fix*]  
• The meeting stage, designed for collaborative participation, must not embed a complete website interface. [*Must fix*]  
• Ensure that your app does not show continuous loading screens, error pages, or broken functionality in meeting scenarios. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-app-shows-continous-loading-screen.png" alt-text="Screenshot showing continuous loading screen in an app.":::

• Meeting apps must always open within the active Teams instance; do not open a new instance for meetings. [*Must fix*]  
• Ensure that workflows within meeting apps remain within Teams (do not redirect to competitor platforms). [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-apps-redirecting-competitor-chat-platform.png" alt-text="Screenshot showing an app redirecting to a competitor chat platform.":::

• If your app supports role-based views where certain functionalities are limited, clearly communicate how non-organizers receive meeting notes, action items, or updated agendas. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-way-forward-not-available-for-role-based-views.png" alt-text="Screenshot showing missing guidance for role-based views.":::

</details>

<br>

<details><summary>Pre- and Post-Meeting Experience</summary>

• Pre- and post-meeting screens should follow general tab design guidelines. [*Must fix*]  
• Organize items effectively – for instance, if displaying more than 10 polls or surveys, refer to the [example layout](~/apps-in-teams-meetings/design/designing-apps-in-meetings.md#after-a-meeting). [*Must fix*]  
• Notify users with clear confirmations (e.g., **Results successfully downloaded**) after actions like exporting survey results. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-meeting-experience-tab-design-guidelines-fail.png" alt-text="Screenshot showing pre/post-meeting screen design issues.":::

</details>

<br>

<details><summary>In-Meeting Experience</summary>

• Always use a dark theme in meeting contexts. See [Teams design guidelines](~/apps-in-teams-meetings/design/designing-apps-in-meetings.md#theming) for details. [*Must fix*]  
• A tooltip must display your app’s name when hovering over its in-meeting icon. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-exp-display-app-name.png" alt-text="Screenshot showing a tooltip with the app name in a meeting extension.":::

• Message extensions must perform consistently within meetings as they do outside of meetings. [*Must fix*]

</details>

<br>

<details><summary>In-Meeting Tabs</summary>

• In-meeting tabs must be responsive, maintain consistent padding and component sizes, and include a back button for multi-level navigation. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-exp-back-button.png" alt-text="Screenshot showing in-meeting tab with a back button.":::

    :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-exp-back-button-absent.png" alt-text="Screenshot showing in-meeting tab missing a back button.":::

• Do not include multiple close buttons; rely on the built-in Teams header dismiss option instead. [*Must fix*]  
• Prevent horizontal scrolling in in-meeting tabs. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-tab-vertical-scroll.png" alt-text="Screenshot showing in-meeting tab with only vertical scroll.":::

   :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-tab-horizontal-scroll.png" alt-text="Screenshot showing in-meeting tab with horizontal scroll, which is not allowed.":::

</details>

<br>

<details><summary>In-Meeting Dialogs</summary>

• Use dialogs sparingly for light, task-oriented scenarios. [*Must fix*]  
• Display dialog content in a single column without multiple levels of navigation. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-single-column-layout.png" alt-text="Screenshot showing a single-column layout for an in-meeting dialog.":::

   :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-multiple-column-layout.png" alt-text="Screenshot showing a multi-column layout in an in-meeting dialog, which is not allowed.":::

• Ensure dialogs are centered on the meeting stage. [*Must fix*]  
• Dialogs must be dismissed after a user action. [*Must fix*]

• **Together Mode Considerations:**
  - All images must be in PNG format.
  - The final scene package must not exceed a resolution of 1920x1080 (even-numbered dimensions).
  - The maximum size for a scene is 10 MB, and each image should not exceed 5 MB.
  - Mark overlapping images as Transparent using the provided checkbox.

</details>

<br>

<details><summary>Shared Meeting Stage</summary>

To use the **shareAppContentToStage** API:

• Declare the correct RSC permissions in the manifest by configuring the `authorization` property.  
  - Set `name` as `MeetingStage.Write.Chat` and `type` as `Delegated` in the `resourceSpecific` field. [*Must fix*]
• The shared meeting stage feature must launch through the Teams desktop app, but it must be accessible on mobile devices as well. [*Must fix*]

</details>

[Back to top](#teams-store-validation-guidelines)

---

## Connector

1. The connector name must match the app name used within the app and specified in the manifest.

   :::image type="content" source="../../../../assets/images/submission/connector-mismatch-app-name.png" alt-text="Screenshot showing a mismatch between the connector name and app name.":::

2. Users must not encounter configuration errors when setting up the connector.

   :::image type="content" source="../../../../assets/images/submission/connector-error-configuring.png" alt-text="Screenshot displaying an error during connector configuration.":::

---

## Notifications

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
This section follows [Microsoft commercial marketplace policy number 1140.4.7](/legal/marketplace/certification-policies#114047-notification-apis).

For apps using the [activity feed APIs provided by Microsoft Graph](/graph/teams-send-activityfeednotifications), ensure the following:

> [!TIP]
> For notifications that are triggered after long intervals (e.g., after one day or one month), test them thoroughly in the background before submission.

<br>

<details><summary>Notification Design Guidelines</summary>

• Follow the [activity feed notifications design guidelines](/graph/teams-send-activityfeednotifications).  
• Ensure that when a user selects a notification from the activity feed, they are not blocked by irrelevant or broken workflows. [*Must fix*]  
• Incorporate your app’s name in notifications to provide clarity regarding the source. [*Must fix*]  
• Trigger notifications for all scenarios mentioned in your app’s long description, first-run experience, and declared `activityTypes` in the manifest. [*Must fix*]  
• Notifications must appear within five seconds of a triggering user action. [*Must fix*]  
• Clearly call out any limitations regarding notifications in the app long description or first-run experience. [*Must fix*]

</details>

<br>

<details><summary>General Notifications Guidelines</summary>

• All notification triggers present in your app must be operational. [*Must fix*]  
• Notifications must be localized in line with the languages supported by your app. [*Must fix*]  
• They must appear within five seconds after the user action. [*Must fix*]  
• Ensure proper localization across all supported platforms for notifications. [*Must fix*]

</details>

<br>

<details><summary>Avatars</summary>

• The notification avatar should match your app’s color icon. [*Must fix*]  
• Notifications triggered by a user should include that user’s avatar. [*Must fix*]

</details>

<br>

<details><summary>Spamming</summary>

• Do not send more than 10 notifications per minute to any given user. [*Must fix*]  
• Bots and activity feed mechanisms must avoid triggering duplicate notifications. [*Must fix*]  
• Notifications should provide real value and not be used for trivial events. [*Must fix*]

</details>

<br>

<details><summary>Navigation and Layout</summary>

• Notifications must conform to the Teams activity feed layout. [*Must fix*]  
• When tapped, notifications should direct users to the relevant content within Teams. [*Must fix*]

</details>

[Back to top](#teams-store-validation-guidelines)

---

## Microsoft Graph Connector

It is recommended that you publish your Graph connector via the [Graph connector gallery](/microsoftsearch/connectors-gallery) rather than including it in your manifest.json. For guidelines on the declarative agent file, see [here](review-copilot-validation-guidelines.md).

***Example***

Do not include the Graph connector node in the manifest file.

:::image type="content" source="../../../../assets/images/Copilot/da-graph-connector.png" alt-text="Screenshot of a Graph connector node in a manifest file.":::

[Back to top](#teams-store-validation-guidelines)

---

## Microsoft 365 App Compliance Program

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
Aligned with [Microsoft commercial marketplace policy number 1140.6](/legal/marketplace/certification-policies#11406-publisher-attestation), this section guides you through the Microsoft 365 App Compliance Program.

<details><summary>Expand to Know More</summary>

The program aims to help organizations assess and manage risk by evaluating security and compliance aspects of your app. When publishing to the Teams Store, complete the following:

• **Publisher Verification**: This process authenticates your identity as an app developer. Upon completion, a blue **verified** badge appears on Microsoft Entra consent dialogs and other screens. For more information, see [Mark your app as publisher verified](/azure/active-directory/develop/mark-app-as-publisher-verified). [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-365-compliance-publisher-verification.png" alt-text="Screenshot showing a blue verified badge on the Microsoft Entra consent dialog.":::

• **Publisher Attestation**: You share details regarding data handling and security to aid potential customers in making informed decisions. [*Good-to-fix*]

   :::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
   For new apps, publisher attestation cannot be completed until the app is live on Teams Store. For updates, please complete [Publisher Attestation](/microsoft-365-app-certification/docs/attestation) before resubmitting.

</details>

[Back to top](#teams-store-validation-guidelines)

---

## Advertising

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::
This section complies with [Microsoft commercial marketplace policy number 1140.7](/legal/marketplace/certification-policies#11407-advertising).

• Apps must not display any form of advertising (e.g., dynamic ads, banner ads, or ads embedded in messages). [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-advertising-banners.png" alt-text="Screenshot showing an example of advertising banners, which are not allowed.":::

[Back to top](#teams-store-validation-guidelines)

---

## Cryptocurrency Based Apps

If your app involves cryptocurrency in any form, ensure it complies with all applicable laws. This includes, but is not limited to, apps that:

• Facilitate cryptocurrency transactions or transmissions.  
• Promote cryptocurrency-related content.  
• Enable users to store or access cryptocurrency.  
• Encourage or support cryptocurrency transactions outside Teams.  
• Facilitate cryptocurrency mining.  
• Enable participation in Initial Coin Offerings.  
• Reward or incentivize users with cryptocurrency tokens following task completion. [*Must fix*]

After an internal Microsoft review, if your demonstration of compliance is satisfactory, certification may proceed. Otherwise, Microsoft will notify you if your app does not meet certification requirements.

[Back to top](#teams-store-validation-guidelines)

---

## App Functionality

• All workflows and content must align with the declared scope of your app. [*Must fix*]  
• Every declared app capability must function as described in the AppSource submission or app manifest long description. [*Must fix*]  
• The app must always notify users before downloading any files or executables to their environment. [*Must fix*]  
• For region-dependent apps, provide a graceful failure message when a user attempts to access functionality in an unsupported region. [*Must fix*]

[Back to top](#teams-store-validation-guidelines)

---

## Mobile Experience

• Mobile add-ins must be free to use – no in-app content or links that promote upselling, online stores, or requests for payment are allowed. If an account is required, it must be free, and if time-limited, it should not contain any indicators implying payment is needed. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-mobile-add-in-charges.png" alt-text="Screenshot showing a mobile add-in requesting payment, which is not allowed.":::

• The use of **FREE**, **FREE TRIAL**, or **TRY FREE** is acceptable on desktop or web apps without restrictions.
• On mobile:
  - Plain text indicating **FREE** is acceptable in the context of trials or app upgrades.
  - However, linking **FREE** text to pricing information or a landing page with payment details is not allowed. [*Must fix*]
  - Any mention of pricing details in images, text, or links is forbidden. CTAs such as **view plans** are not permitted. [*Must fix*]
  - Payments for physical goods are allowed, but not for digital goods. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-mobile-exp-pricing-details-on-mobile-fail.png" alt-text="Screenshot showing invalid pricing details in mobile experience.":::

   :::image type="content" source="../../../../assets/images/submission/validation-mobile-exp-payments-digital-goods.png" alt-text="Screenshot showing payment for digital goods on mobile, which is disallowed.":::

• Ensure that your Teams app provides a consistent and appropriate mobile experience across devices. [*Must fix*]  
• For unsupported mobile capabilities, present a clear and graceful failure message. [*Must fix*]

[Back to top](#teams-store-validation-guidelines)

---

## Apps Extended Across Microsoft 365 Clients

### General

• If your app is designed to extend a Teams app across Microsoft 365 clients, it must use manifest schema version 1.13 or later.
• The support URL should have content that is relevant across all Microsoft 365 clients, not just Teams.
• Explicitly reference the broad Microsoft 365 integration in your app description.
  
### Compatibility

Ensure that your app is fully responsive and functional on the latest versions of:

• Microsoft Edge  
• Google Chrome  
• Outlook for Windows and web  
• Microsoft 365 on desktop, web, and Android  
• Microsoft Teams on desktop, web, Android, and iOS

### Mobile Experience

• Users must be able to launch the app from the actions flyout within the Microsoft 365 client on mobile, with the app name displayed accurately in the action bar. [*Must fix*]

#### App Launch from Actions Flyout

• Ensure seamless launching and navigation across multiple static tabs within the Microsoft 365 client on mobile. For apps with more than three tabs, additional tabs should be accessible via a **More** section. [*Must fix*]

#### Multi-Tab Experience

• If your app leverages SSO, ensure that the user is authenticated correctly and consistently across contexts. [*Must fix*]

#### App Authentication

• The app must terminate the user account instance properly if the user switches accounts or logs out within the Microsoft 365 client on mobile. [*Must fix*]

#### Account Switching and Logout

• Provide a clear back navigation allowing users to return to the previous state. [*Must fix*]  
• Apps that support deep linking must correctly redirect users to the appropriate landing page. [*Must fix*]

#### Tab Navigation

• Display a progress indicator during loading; this indicator should disappear once loading is complete. [*Must fix*]  
• If the app fails to load due to network issues, time-outs, or authentication errors, display an error screen. [*Must fix*]

[Back to top](#teams-store-validation-guidelines)

---

## Teams Apps Extensible as Agents for Microsoft 365 Copilot

• App packages must be correctly formatted and must adhere to manifest schema version 1.13 or later.  
• Your app must pass the [responsible AI checks](/legal/marketplace/certification-policies#1-apps-with-artificial-intelligenceai-generated-content-must-meet-below-requirements).  
• Ensure the app meets the [agent compatible criteria](review-copilot-validation-guidelines.md).

### Agent Must Not Manipulate LLM Behavior

The short descriptions, parameters, and commands must not include:

1. Instructional phrases like “if the user says X, ignore,” “delete,” “reset,” “new instructions,” “answer in bold,” or “don’t print anything.”
2. Verbose or overly flowery marketing language.
3. Superlative claims like **#1**, **amazing**, or **best**.
4. URLs, emojis, or hidden characters (e.g., hexadecimal, binary).
5. Grammar or punctuation errors.

### User Awareness

The long description must clearly state:

• The compatibility of the app with Microsoft 365 Copilot (e.g., "Use Contoso in Microsoft 365 Copilot to search and summarize your tasks").  
• Provide at least one example prompt to illustrate how users can interact with a message extension agent in Microsoft 365 Copilot.

   :::image type="content" source="../../../../assets/images/Copilot/validation-guidelines-plugin-prompt-pass.png" alt-text="Screenshot showing a valid sample prompt for a message extension in Microsoft 365 Copilot.":::

   :::image type="content" source="../../../../assets/images/Copilot/validation-guidelines-plugin-prompt-fail.png" alt-text="Screenshot showing an invalid sample prompt (missing guidance) for Microsoft 365 Copilot.":::

### Response Quality

• Mandatory fields in a Microsoft 365 Copilot Adaptive Card response must include the Information title and at least two additional useful fields (e.g., date modified, author, status, flags). Ensure both preview and content are delivered in one response.

   :::image type="content" source="../../../../assets/images/Copilot/validation-guidelines-app-response-copilot.png" alt-text="Screenshot showing a sample Microsoft 365 Copilot response containing preview and content information.":::

• Adaptive Cards must include at least one action button, which must be functional.  
• Microsoft 365 Copilot must accurately process single-parameter, multi-parameter, and follow-up prompts without errors.  
• Provide at least two parameters in the message extension to enhance the user experience.  

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