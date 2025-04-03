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

Following these guidelines increases the chances of your app to pass the Microsoft Teams Store submission process. The Teams‑specific guidelines complement the Microsoft [commercial marketplace certification policies](/legal/marketplace/certification-policies#1140-teams) and are updated frequently to reflect new capabilities, user feedback, and business rule changes.

> [!NOTE]
>
> • Some guidelines may not be applicable to your app. For example, if your app doesn't include a bot, you can ignore bot‑related guidelines.  
> • We've cross-referenced these guidelines to the Microsoft commercial certification policies and added Do’s and Don’ts with examples from pass or fail scenarios encountered in our validation process.  
> • Certain guidelines are marked as *Must fix*. If your app submission doesn't meet these mandatory guidelines, you'll receive a failure report from us with steps to mitigate. Your app submission passes Teams Store validation only after you've fixed the issues.  
> • Other guidelines are marked as *Good-to‑fix*. For an ideal user experience, we recommend that you fix the issues; however, your app submission isn't blocked from publishing on the Teams Store, if you choose not to fix the issues.

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

---

## Value Proposition

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
This section aligns with [Microsoft commercial certification policy number 1140.1](/legal/marketplace/certification-policies#11401-value-proposition-and-offer-requirements) and provides developers guidance on articulating the value proposition of their Teams app.

Apps must provide clear value by enabling users to complete functional workflows that encourage repeated use. Expand the following sections to learn more about creating a compelling value proposition:

<details><summary>Tabs</summary>

**Guideline:**  
Tabs must provide value beyond hosting an existing website. [*Must fix*]

:::image type="content" source="../../../../assets/images/submission/validation-usability-app-provides-workflows.png" alt-text="Example: A tab providing a workflow that adds value for channel members.":::

:::image type="content" source="../../../../assets/images/submission/validation-usability-website-i-framed.png" alt-text="Example: A tab that only hosts a website in an I‑frame without navigation options.":::

</details>

<details><summary>Notification Bots</summary>

**Guideline:**  
A notification provides value in Teams if:  
1. The posted card or text provides adequate details that require no further user action.  
2. The posted card or text provides sufficient preview information for users to take action or decide to view further details via a link opening outside Teams.

Apps that provide notifications only with generic text (e.g., **You have a new notification** or **click to view**) that force users to leave Teams generally do not provide significant value.

:::image type="content" source="../../../../assets/images/submission/validation-bot-notification-only-inadequete-info.png" alt-text="Example: Notification with inadequate preview information.":::

</details>

<details><summary>Message Extensions</summary>

[*Must fix*]

**Guideline:**  
Search‑based message extension apps should provide user value by sharing cards that allow for contextual conversations without causing a context switch.

To pass validation, ensure that a shared card meets the following criteria:  
1. The card provides sufficient details requiring no further user action.  
2. The card includes a preview that helps users decide or take additional action via an external link.

    :::image type="content" source="../../../../assets/images/submission/validation-search-based-messaging-ext-adequete-info.png" alt-text="Example: Adequate preview information in a search‑based message extension card.":::

    :::image type="content" source="../../../../assets/images/submission/validation-search-based-messaging-ext-inadequete-info.png" alt-text="Example: Inadequate preview information in a search‑based message extension card.":::

</details>

<details><summary>Link Unfurling</summary>

**Guideline:**  
Apps that only support link unfurling, without additional functionality, do not provide significant value within Teams. Consider adding more workflows to enhance your app’s utility.

</details>

[Back to top](#teams-store-validation-guidelines)

---

## App Name

[*Must fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
This section aligns with Microsoft [commercial certification policy number 1140.1.1](/legal/marketplace/certification-policies#114011-app-name) and instructs developers on proper naming conventions for their apps.

**Guidelines for Naming Your App:**

• The name must include terms relevant to your target users. [*Must fix*]  
• Prefix or suffix common words with your company’s (developer's) name (e.g., **Contoso Tasks** instead of **Tasks**). [*Must fix*]  
• The name must not use **Teams** or other Microsoft product names (such as Excel, PowerPoint, Word, OneDrive, SharePoint, OneNote, Azure, Surface, or Xbox) to prevent false co-branding or co‑selling. See [Microsoft Trademark and Brand Guidelines](https://www.microsoft.com/legal/intellectualproperty/trademarks/usage/general) for further details. [*Must fix*]  
• Do not copy the name of an app already listed in the Teams Store or a similar commercial offer. [*Must fix*]  
• Avoid profane, derogatory, or culturally insensitive terms. [*Must fix*]  
• The name must be unique. For instance, if you have an app and plan to list a region‑specific version (e.g., **Contoso Mexico**), you must:  
  – Clearly call out region‑specific functionality in your title, metadata, first‑run app experience, and help sections. [*Must fix*]  
  – In Partner Center, select the correct **Markets** under the **Availability** section when uploading the app package. [*Must fix*]

• The app name must not begin with core Teams features (e.g., Chat, Contacts, Calendar, Calls, Files, Activity, Teams, or Help) as these names are reserved and may lead to UI conflicts. [*Must fix*]  
• For official Microsoft partnership scenarios, the app name must list your name first (e.g., **Contoso connector for Microsoft Teams**). [*Must fix*]  
• Avoid using parenthesis for Microsoft product references and ensure that the developer name remains consistent across the app manifest and AppSource. [*Must fix*]  
• The app manifest’s name must not indicate preproduction status (do not use Beta, Dev, Preview, or UAT). [*Must fix*]  
• The app name must be identical in both the app manifest and the AppSource listing. [*Must fix*]

 > [!TIP]
 > Ensure that your app’s branding is cohesive across the Teams Store and AppSource. This includes the app name, developer name, app icon, screenshots, video, short description, and website. Do not impersonate an official Microsoft offering unless the app is an official Microsoft first‑party offering.

---

## Duplicate App

**Guideline:**  
Apps from the same developer that offer identical functionality must use a single app listing unless privacy or government cloud requirements mandate otherwise. Build your business logic to support one listing only. [*Must fix*]

• For multiple regions, use business logic to support a single app listing.

  :::image type="content" source="../../../../assets/images/submission/validation-guidelines-pass-region-app-manifest.png" alt-text="Example: Passing region requirement using built‑in logic.":::

• For deployments requiring multiple endpoints (e.g., on‑premises and cloud), use a single listing.

---

## Suitable for Workplace Consumption

[*Must fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
This section is aligned with Microsoft commercial certification policies [1140.1.2](/legal/marketplace/certification-policies#114012-workplace-appropriateness), [100.8](/legal/marketplace/certification-policies#1008-significant-value), and [100.10](/legal/marketplace/certification-policies#10010-inappropriate-content). It provides guidelines on building workplace‑appropriate apps.

**Guidelines:**

• The app content must be suitable for a professional setting. Avoid content covering topics like religion, politics, or gambling. [*Must fix*]  
• The app should enhance group collaboration or individual productivity. Apps intended solely for team bonding or socializing that require excessive time (over 60 minutes per session) are not acceptable. [*Must fix*]  
• Content aggregator apps must include a mechanism whereby users can report issues or inappropriate content to the publisher. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-guidelines-content-aggregator-app.png" alt-text="Example: Content aggregator app with a report issue mechanism.":::

</details>

---

## Similar Platforms and Services

[*Must fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
This section aligns with [Microsoft commercial certification policy number 1140.1.3](/legal/marketplace/certification-policies#114013-other-platforms-and-services).

**Guideline:**  
Ensure your app focuses on the Teams experience and does not integrate names, icons, or imagery of competing chat-based collaboration platforms or services within its content or metadata unless specific interoperability is provided.

---

## Feature Names

**Guideline:**  
Feature names within your app (e.g., button labels or UI text) must not use terms reserved by Teams or Microsoft products. For instance, avoiding names like **Start meeting**, **Make call**, or **Start chat** unless they are clearly associated with your app (e.g., **Start Contoso meeting**).

---

## Authentication

[*Must fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
This section corresponds with [Microsoft commercial certification policy number 1140.1.4](/legal/marketplace/certification-policies#114014-access-to-services) and provides guidance on authenticating your app with external services.

For more details on implementing app authentication, see [authentication in Teams](~/concepts/authentication/authentication.md).

<details><summary>Authenticating with External Services</summary>

**Guidelines:**

• **Sign In/Sign Out/Sign Up Experiences:**  
  – Ensure clear and intuitive sign in, sign out, and sign up processes. [*Must fix*]  
  – When users sign out, only the app session should be terminated while keeping them signed into Teams. [*Must fix*]  
  – Provide a way for new users to sign up or learn more about the external service. This information should be present in the app manifest, AppSource long description, and during the initial app run (e.g., bot welcome message, tab setup, or configuration page). [*Must fix*]  
  – For apps requiring an admin to perform one‑time setup, clearly indicate this dependency within the app manifest, AppSource long description, and first‑run experiences. [*Must fix*]

• **Content Sharing Experiences:**  
  – If authentication is required to share content in Teams, include clear guidance in the help documentation on disconnecting or unsharing content if that functionality is supported.

</details>

---

## Audio

**Guidelines:**

• If the app’s primary focus is to stream music, include at least one collaborative workflow (such as sharing, configuring, or synchronizing playlists). [*Must fix*]  
• For music‑listening apps, a collaborative co‑listening experience is recommended. [*Good-to‑fix*]

---

## Security

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
This section aligns with [Microsoft commercial certification policy number 1140.3](/legal/marketplace/certification-policies#11403-security).

[Back to top](#teams-store-validation-guidelines)

### Financial Information

[*Must fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
This section aligns with [Microsoft commercial certification policy number 1140.3.1](/legal/marketplace/certification-policies#114031-financial-transactions) and guides developers on handling financial data within Teams apps.

<details><summary>Expand to Know More</summary>

**Guidelines:**

• Apps must not prompt users to make in‑Teams payments or transmit financial information through a bot. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-financial-information-1.png" alt-text="Example: Financial information not handled properly.":::

• You may include links to secure external payment services only if disclosed in your terms of use, privacy policy, profile page, or website prior to user consent. [*Must fix*]

• Do not facilitate payments for goods or services prohibited by [General policy number 100.10 Inappropriate content](/legal/marketplace/certification-policies#10010-inappropriate-content). [*Must fix*]

• Apps on iOS or Android must adhere to the following:
  – No in‑app purchases, trial offers, or UI that upsell to paid versions or external stores. [*Must fix*]
      :::image type="content" source="../../../../assets/images/submission/validation-financial-information-in-app-purchase.png" alt-text="Example: Prohibited in‑app purchase UI.":::
      :::image type="content" source="../../../../assets/images/submission/validation-financial-information-online-stores.png" alt-text="Example: Prohibited online store links.":::
  – If an account is required, users must have a free sign‑up option, and the term **free** or **free account** must not be used improperly. [*Must fix*]
  – Account expiration should not prompt UI that indicates a need to pay. [*Must fix*]
  – Privacy policy and terms of use must not include commerce‑related links or UI. [*Must fix*]

</details>

### Bots

[*Must fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
This section aligns with [Microsoft commercial marketplace policy number 1140.3.2](/legal/marketplace/certification-policies#114032-bots-and-messaging-extension).

<details><summary>Expand to Know More</summary>

**Guidelines for Bots:**

• For apps using the Microsoft Azure Bot Service, follow the requirements stipulated in the Microsoft [Online Services Terms](https://www.microsoftvolumelicensing.com/DocumentSearch.aspx?Mode=3&DocumentTypeId=46).  
• Bots must always request permission before uploading a file and display a confirmation message.

  :::image type="content" source="../../../../assets/images/submission/validation-bot-confirmation-message.png" alt-text="Example: Bot confirmation message.":::

</details>

### External Domains

[*Must fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
This section is aligned with [Microsoft commercial marketplace policy number 1140.3.3](/legal/marketplace/certification-policies#114033-external-domains) and offers guidance on configuring restricted domains in the app manifest’s `validDomains` property.

<details><summary>Expand to Know More</summary>

**Guidelines for External Domains:**

• Do not include domains outside your organizational control (including wildcards or tunneling services). Exceptions include:  
  – For SharePoint‑dependent apps, you may include the associated root SharePoint site as a valid domain using the `{teamSiteDomain}` context property. [*Must fix*]  
  – Do not use top‑level domains like **.com**, **.in**, or **.org** as valid domains. [*Must fix*]  
  – Avoid using **.onmicrosoft.com** (unless under your control); however, a domain like **yoursite.com** may be used even with a wildcard. [*Must fix*]  
  – For PowerApps built on the Microsoft Power Platform, include *apps.powerapps.com* as a valid domain.  
  – Do not include URLs (e.g., with www or https) in the external domains declaration. [*Must fix*]  
  – For Azure Bot Service’s OAuthCard, include *token.botframework.com* as valid. Do not use wildcards with *.botframework.com*. [*Must fix*]  
  – Ensure OpenAPI URLs are under partner control.
  – The following external domains are disallowed:  
    *.azurewebsites.net  
    *.azureedge.com  
    *.microsoft.com  
    *.microsoftonline.com  
    *.onmicrosoft.com  
    go.microsoft.com  
    teams.microsoft.com

• When using wildcards (`*`):
  – If a subdomain segment contains a wildcard, it must be the only character in that segment.  
  – Every segment preceding a wildcard must also be a wildcard segment.

  For example, `*.*.domain.com` is valid, but `foo.*.myteam.domain.com` is not.

</details>

### Sensitive Content

[*Must fix*]

**Guideline:**  
Your app must not inadvertently expose sensitive data (such as credit card numbers, payment details, health data, or other personally identifiable information) to unintended audiences. Additionally, always warn users before downloading any files or executables (.exe) to their systems.

---

## General Functionality and Performance

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
This section corresponds with [Microsoft commercial marketplace policy number 1140.4](/legal/marketplace/certification-policies#11404-functionality).

**Key Points:**

• Provide clear way‑forward guidance for both admin and end users (e.g., sign up links, contact information).  
• Clearly indicate any account dependencies or limitations in both the app manifest’s long description and the AppSource listing.

[Back to top](#teams-store-validation-guidelines)

### Launching External Functionality

[*Must fix*]

**Guidelines:**  
• Apps should not redirect users out of Teams for core scenarios. All primary interactions must remain within Teams components such as bots, Adaptive Cards, tabs, and dialogs/task modules.  
• If a redirection is required (e.g., using deep links such as `tel:`, `mailto:`, or `webex:`), launch these in a new window (using `window.open` with `target="_blank"` or similar techniques).  
• UI elements that launch external functionality should clearly indicate that users will exit Teams (e.g., include a **Pop‑out** icon or descriptive phrasing such as **View in Contoso.com**). [*Must fix*]

<details><summary>Expand to Know More</summary>

• Provide explicit instructions and warnings if the external functionality may cause users to leave the secure Teams environment.  
• Consider using interstitial dialogs to let users know about the external navigation.

</details>

### Compatibility

[*Must fix*]

**Guidelines:**  
Your app must work on the latest versions of these platforms and browsers:  
• Microsoft Windows  
• macOS  
• Microsoft Edge  
• Google Chrome  
• iOS  
• Android  

Additionally, if a user’s browser or operating system is unsupported, display a graceful error or fallback message.

### Response Time

[*Must fix*]

**Guidelines:**  
• Tabs must load within two seconds or display a loading message.  
• Bots must respond within two seconds or display a typing indicator.  
• Message extensions and notifications must also meet the two‑second response threshold.

### Apps Powered by Artificial Intelligence

For apps employing AI features, follow responsible AI practices, including using tools like [Microsoft RAI Toolkit](https://www.microsoft.com/en-us/ai/responsible-ai-resources) and [HAX Toolkit Project](https://www.microsoft.com/en-us/research/project/hax-toolkit/).

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
This section complies with [Microsoft commercial marketplace policies for AI‑generated content and apps using facial recognition capabilities](/legal/marketplace/certification-policies#1-apps-with-artificial-intelligenceai-generated-content-must-meet-below-requirements) and relevant guidelines for facial recognition.

#### Apps with AI-Generated Content

**Guidelines:**

• Do not generate, display, or provide access to offensive AI‑generated content. [*Must fix*]  
• Consider integrating:  
  – [Teams AI library](~/bots/how-to/teams-conversational-ai/teams-conversation-ai-overview.md) for GPT‑based models. [*Good-to‑fix*]  
  – Moderation hooks or a conversation sweeping capability to manage content. [*Good-to‑fix*]  
• Provide mechanisms (such as in‑app reporting or email links) for users to report inappropriate AI‑generated content. [*Must fix*]  
• Take prompt action on reported issues. [*Must fix*]  
• Clearly describe AI functionality within both the app description and in‑app workflows, and prompt for user review where necessary. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/teams-ai-library-description-guideline.png" alt-text="Example: AI functionality description guideline.":::

#### Apps using Facial Recognition Capabilities

> [!NOTE]
> Apps using facial recognition may undergo additional review to ensure alignment with Microsoft’s Responsible AI principles.

**Guidelines:**
• The app must not enable facial recognition for law enforcement purposes (e.g., to identify individuals for police departments in the U.S.). [*Must fix*]  
• Clearly indicate any facial recognition or emotional inference capabilities in the app description. [*Must fix*]  
  – Note that inferring emotional states from facial expressions is subject to stricter review compared to detecting individual facial features.

---

## App Package and Teams Store Listing

[*Must fix*]

Ensure your app package is properly formatted and includes all required components.

> [!TIP]
>
> • Confirm that the provided test accounts or environment remain valid until the app is live in the marketplace.  
> • Include detailed testing instructions, such as:
>   – Steps to configure app test accounts (if applicable).  
>   – Expected app behavior for core workflows.  
>   – Limitations, conditions, or exceptions to the app’s functionality or features.  
>   – Specific considerations or dummy data setup instructions for testers.  
>   – Enable third-party integration if providing test accounts.

[Back to top](#teams-store-validation-guidelines)

### App Manifest

[*Must fix*]

**Guidelines:**  
• The app manifest should conform to a publicly released manifest schema. Refer to the [app manifest reference](~/resources/schema/manifest-schema.md) for more details. Avoid preview versions.  
• For apps with bots or messaging extensions, ensure details in the manifest match the Bot Framework metadata (bot name, logo, privacy policy link, terms of service link).  
• If using Microsoft Entra ID for authentication, include the Application (client) ID in the manifest. See the [app manifest reference](~/resources/schema/manifest-schema.md#webapplicationinfo) for details.

### Using the Latest App Manifest Schema

**Guidelines:**

• For Single Sign‑On (SSO), declare Microsoft Entra ID in the manifest. [*Must fix*]  
• Always use a publicly released manifest schema (1.10 or later is recommended). [*Must fix*]  
• When updating an app, only increase the app version number. The App ID must remain unchanged. [*Must fix*]  
• Avoid including extraneous files in the app package. [*Must fix*]  
• Ensure the version number is consistent across all manifest files and localization files. [*Must fix*]  
• Use manifest schema version 1.5 or later for localization. Update the `$schema` attribute and `manifestVersion` accordingly. [*Must fix*]  
• For any additions, updates, or removals of capabilities or metadata, increment the version number and submit through Partner Center. [*Must fix*]  
• Follow the Semantic Versioning Specification (MAJOR.MINOR.PATCH). [*Must fix*]  
• For admin consent scenarios, declare `webapplicationinfo` in the manifest. If omitted, the Permissions page in Teams admin center will not display correctly. [*Must fix*]  
• Submit a production version of the manifest for certification. [*Must fix*]  
• It is recommended (but not mandatory) to include the Microsoft Cloud Partner Program ID (CCP ID) in your manifest. [*Good-to-fix*]  
• Ensure scopes or context declared in the manifest are visible within the app. [*Must fix*]

### App Icons

[*Must fix*]

Icons are a critical part of the app’s identity.

<details><summary>Expand to Know More</summary>

**Guidelines:**

• The color and outline icons must match in your app listing. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/color-outline-icon-same.png" alt-text="Example: Matching color and outline icons.":::

  :::image type="content" source="../../../../assets/images/submission/color-outline-icon-not-same.png" alt-text="Example: Mismatched icons.":::

• Include two PNG versions in your app package: a color icon and an outline icon. [*Must fix*]  
• The marketplace icon should match the color icon provided in your package. [*Must fix*]  
• The color icon should be 192x192 pixels on a square (solid or transparent) background. [*Must fix*]  
• The outline icon is used on the app bar and in pinned contexts; it should be 32x32 pixels, with minimal padding. [*Must fix*]  
• All icons must adhere to the Teams Store listing metadata. [*Must fix*]

For additional details, refer to the [icon guidelines](~/concepts/build-and-test/apps-package.md#app-icons).

</details>

### App Descriptions

Your app must include both a short and long description for improved discoverability.

:::image type="content" source="../../../../assets/images/submission/validation-app-description-adequete-information.png" alt-text="Example: Adequate app description.":::

:::image type="content" source="../../../../assets/images/submission/validation-app-description-inadequete.png" alt-text="Example: Inadequate app description.":::

<details><summary>Expand to Know More</summary>

**Guidelines for Descriptions:**

• Descriptions must not disparage other brands—directly or indirectly. Avoid any claims that cannot be substantiated, such as “Guaranteed 200 percent increase in efficiency.” [*Must fix*]  
• Do not hyperlink contact details, help links, or sign‑up links in the description. [*Good-to-fix*]  
• Clearly identify the intended audience, value proposition, supported products, and any prerequisites. [*Must fix*]  
• Limitations and account dependencies (e.g., enterprise account, paid subscription) must be clearly stated.  
  :::image type="content" source="../../../../assets/images/submission/validation-app-description-limitations-calledout-pass.png" alt-text="Example: Limitations clearly stated.":::
  :::image type="content" source="../../../../assets/images/submission/validation-app-description-limitations-not-calledout-fail.png" alt-text="Example: Limitations omitted.":::
• When referring to Teams, use the first reference as “Microsoft Teams” and later “Teams”. [*Must fix*]  
• The app description in the manifest must be identical to what appears in AppSource. [*Must fix*]

**Short Description:**

• Should be a single sentence highlighting the app’s value.  
• Avoid repeating the app name.  
• [*Good-to-fix*] Do not use the word “app” in the short description.

**Long Description:**

• Should provide an engaging narrative (ideally around 1000 characters, up to 4000 allowed) explaining the app’s value proposition, audience, and key features.  
• Use Markdown for formatting, active voice, bullet points for features, and include a help or support link.  
• Refrain from exceeding 500 words, abbreviating “Microsoft,” or using comparative language unless authorized.  
  :::image type="content" source="../../../../assets/images/submission/validation-app-description-microsoft-abbreviated.png" alt-text="Example: Incorrect abbreviation of Microsoft.":::
  :::image type="content" source="../../../../assets/images/submission/validation-app-description-microsoft-not-abbreviated.png" alt-text="Example: Correct spelling of Microsoft.":::
• Do not imply that the app is an official Microsoft offering via slogans or taglines.
• Avoid grammatical errors, excessive capitalization, and links to AppSource.
• Do not include unverified claims or comparisons to competitors.

For additional help, see the [checklist to write app descriptions](submission-checklist.md#write-descriptions).

</details>

### Screenshots

Screenshots provide visual insight into your app.

<details><summary>Expand to Know More</summary>

**Guidelines:**

• You may include 3 to 5 screenshots; file types allowed are PNG, JPEG, and GIF (max size 1,024 KB, dimensions 1366x768). [*Must fix*]  
• Screenshots should emphasize key capabilities and accurately reflect the app’s UI.  
  – At least one screenshot should show mobile functionality. [*Good-to-fix*]  
    :::image type="content" source="../../../../assets/images/submission/validation-guidelines-pass-app-functionality-mobile.png" alt-text="Example: App functionality on mobile.":::
• Use high‑resolution, legible images and include captions to help users understand the functionality. [*Must fix*]  
• If supporting Teams tabs, ensure screenshots include Teams chrome (UI) elements. [*Must fix*]  
• For apps extensible to Microsoft 365 clients (e.g., Outlook), consider including such contextual screenshots. [*Good-to-fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-guidelines-pass-app-functionality-MS-365.png" alt-text="Example: Teams app functionality within MS 365 clients.":::

</details>

### Videos

A video can effectively demonstrate your app’s value and usage.

**Guidelines:**

• The video should be short, clear, and engaging.  
• It must demonstrate how to set up and use the app in a narrative form.  
• Optimal durations: 60–90 seconds for a value‑explainer, 3–5 minutes for a walkthrough. [*Good-to-fix*]  
• Ensure that advertisements are disabled on YouTube/Vimeo before submitting the video URL. [*Must fix*]  
• The video link must be functional and should follow the URL format for YouTube (`https://www.youtube.com/watch?v=:id` or `https://youtu.be/:id`) or Vimeo (`https://vimeo.com/:id`).  
• Videos can appear first in the screenshots/videos carousel in both the Teams Store and AppSource pages. [*Good-to-fix*]

  :::image type="content" source="../../../../assets/images/submission/video-app-listing-partner-center.png" alt-text="Example: Video submission in Partner Center.":::

### Privacy Policy

[*Must fix*]

**Guidelines:**

• The privacy policy may be specific to your Teams app or a general policy covering all your services.  
• If using a generic template, ensure that it explicitly references your services, applications, or platforms.  
• The policy must detail data storage, retention, deletion, and security controls.  
• Contact information is required.  
• Avoid broken URLs, beta/staging links, or links to AppSource.  
• Authentication must not be required to access the policy, and it should not contain commerce-related UI.

Ensure consistency between the manifest and AppSource.

### Terms of Use

[*Must fix*]

**Guidelines:**

• Terms of use must be specific, hosted on your own domain, and accessible via a secure HTTPS link.  
• Access should be open (no authentication required) and consistent across the manifest and AppSource.

### Support Links

[*Must fix*]

**Guidelines:**

• Support URLs should be publicly accessible (no authentication required) and provide clear contact information or a support ticket system.  
• For example, if using GitHub, ensure ownership and availability of contact details.

<details><summary>Expand to Know More</summary>

  :::image type="content" source="../../../../assets/images/submission/validation-supportlinks-authentication.png" alt-text="Example: Support link that does not require authentication.":::

</details>

### Localization

[*Must fix*]

**Guidelines:**

• If your app supports multiple languages, include a localization file that adheres to the Teams localization schema. See [Teams localization schema](~/concepts/build-and-test/apps-localization.md). [*Must fix*]  
• The metadata should be consistent across all languages (e.g., `en-us` and translations). [*Must fix*]  
• Clearly indicate supported languages in the AppSource listing. [*Must fix*]  
• If the user’s client language does not match any localized content, ensure a suitable default language is specified. [*Must fix*]

---

## Apps Linked to SaaS Offer

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
This section aligns with [Microsoft commercial certification policy number 1140.5](/legal/marketplace/certification-policies?branch=pr-en-us-5673). For Teams apps linked to a SaaS offer, ensure compliance with the following:

<details><summary>General</summary>

**Guidelines:**

• ISVs must support multiple users (subscribers) in the same tenant managing their subscription and license assignments independently.  
• The offer must comply with the [technical requirements for Teams apps linked to a SaaS offer](/microsoftteams/platform/concepts/deploy-and-publish/appsource/prepare/include-saas-offer).  
• Teams apps linked to a SaaS offer must satisfy all requirements defined in [1000 Software as a Service (SaaS)](/legal/marketplace/certification-policies#1000-software-as-a-service-saas).  
• In your manifest, include or update the `subscriptionOffer` node using the format `publisherId.offerId` (e.g., for publisher `contoso1234` and offer `offer01`, use `contoso1234.offer01`).  
• Linked SaaS offers must be live on AppSource; preview offers won’t be accepted.

</details>

<details><summary>Offer Metadata</summary>

**Guidelines:**

• Ensure that the metadata for your app manifest, Teams app listing in AppSource, and the SaaS offer in AppSource are identical.  
• Both the Teams app and SaaS offer must originate from the same publisher.  
• When setting up the offer in Partner Center, select **Additional purchases** as **Yes, my product requires purchase of a service or offers additional in‑app purchases**.  
• Clearly describe plan features, pricing, dependencies, and any limitations in the offer details.

</details>

<details><summary>SaaS Offer Home Page and License Management</summary>

**Guidelines:**

• Provide an informative home page for subscribers, including instructions on license assignment and support.  
• Validate that users are not assigned duplicate licenses and notify them after assignment.  
• Include guidance for adding the app to Teams, either via a Teams chatbot or email.  
• If using [Microsoft license management](manage-third-party-apps-license.md), ensure redirection to the Teams license management system to avoid a dead‑end.

</details>

<details><summary>Usability and Functionality</summary>

**Guidelines:**

• After purchase and license assignment, the app should provide access to the subscribed plan features and communicate the associated benefits.  
• Provide, from within your Teams app, a link to your SaaS application home page for future license management and support.

</details>

<details><summary>Configure and Test SaaS Application</summary>

**Guideline:**  
If your app’s setup is complex, supply an end‑to‑end document, configuration steps, and clear instructions for license and user management.  

> [!TIP]
> Consider including a video demonstration of the app and license management process for the testing team.

</details>

[Back to top](#teams-store-validation-guidelines)

---

## Tabs

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
This section is based on [Microsoft commercial certification policy number 1140.4.2](/legal/marketplace/certification-policies#114042-tabs). Ensure that any tab included in your app adheres to the following guidelines.

> [!TIP]
> For optimized tab experiences, refer to the [Teams tab design guidelines](~/tabs/design/tabs.md).

<details><summary>Setup</summary>

**Guidelines:**

• The tab setup must not lead the user into a dead‑end; provide clear instructions on completing the workflow. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-tabs-setup-new-user.png" alt-text="Example: Tab setup that dead‑ends new users.":::

• The configuration experience should remain within Teams—not launching external websites for configuration. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-tabs-setup-profile-name.png" alt-text="Example: Correct tab setup with profile name input.":::

• The configuration screen should focus on the task at hand (e.g., selecting a project) rather than embedding an entire website. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-tabs-setup-configuration-experience.png" alt-text="Example: Focused configuration experience.":::
  :::image type="content" source="../../../../assets/images/submission/validation-tabs-setup-configuration-screen.png" alt-text="Example: Clear tab configuration screen.":::

• For tabs requiring a URL input during configuration, include guidance to help users generate or acquire a valid URL. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-tab-configuration-way-forward-url-pass.png" alt-text="Example: Correct URL configuration with guidance.":::
  :::image type="content" source="../../../../assets/images/submission/validation-tab-configuration-way-forward-url-fail.png" alt-text="Example: Incorrect configuration without guidance.":::

• Hyperlink any contact information (e.g., “Contact us”) instead of presenting plain text. [*Must fix*]  
• Optionally, include clickable support URLs or email addresses for the first‑run experience. [*Good-to-fix*]

</details>

<details><summary>Views</summary>

**Guidelines:**

• The sign‑in screen should not feature oversized logos. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-views-applogin.png" alt-text="Example: Oversized logo on sign‑in screen.":::

• Organize content by dividing it across multiple tabs where needed.  
  :::image type="content" source="../../../../assets/images/submission/validation-views-multiple-tabs.png" alt-text="Example: Multiple tabs for content organization.":::
• Avoid duplicate headers or logos in I‑frames; the Teams framework already provides these elements. [*Good-to-fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-views-no-duplicate-header-logo.png" alt-text="Example: Tab without duplicate headers.":::
  :::image type="content" source="../../../../assets/images/submission/validation-views-duplicate-header-logo.png" alt-text="Example: Tab with duplicate headers.":::

</details>

<details><summary>Navigation</summary>

**Guidelines:**

• Ensure that tab navigation does not conflict with the primary Teams navigation. For example, if implementing a left navigation rail, use designs (e.g., text with icons or a hamburger menu) that do not mimic or obstruct Teams’ native navigation. [*Must fix*]

  Refer to [basic](~/concepts/design/design-teams-app-basic-ui-components.md) and [advanced](~\concepts\design\design-teams-app-advanced-ui-components.md) Fluent UI components.

  :::image type="content" source="../../../../assets/images/submission/validation-navigation-static-tab.png" alt-text="Example: Navigation that blends with Teams.":::
  :::image type="content" source="../../../../assets/images/submission/validation-navigation-left-navigation.png" alt-text="Example: Navigation conflicting with Teams.":::

• Maintain a 20‑pixel spacing between custom toolbar elements and the Teams left navigation bar. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-navigation-spacing-between-toolbar.png" alt-text="Example: Correct spacing between toolbar and Teams navigation.":::

• For deeper navigation levels (L2, L3), use breadcrumbs, back buttons, page headers, or hamburger menus to aid the user.  
  :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-improper-navigation-leveles.png" alt-text="Example: Incorrect navigation with multiple layers.":::

• Ensure that deep links within tabs reference content inside Teams (e.g., dialogs or other tabs) and do not navigate to external webpages. [*Must fix*]

• Prevent core workflows from redirecting out of Teams. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-navigation-view-button-not-linked-static-tab.png" alt-text="Example: Incorrect deep linking in a static tab.":::

• Avoid horizontal scrolling unless using an infinite canvas with fixed UI components. [*Must fix*]

  Examples:
    :::image type="content" source="../../../../assets/images/submission/validation-horizontal-scroll-allowed-scenarios.png" alt-text="Allowed horizontal scroll scenarios.":::
    :::image type="content" source="../../../../assets/images/submission/validation-horizontal-scroll-allowed-kanban.png" alt-text="Kanban board with horizontal scroll.":::
    :::image type="content" source="../../../../assets/images/submission/validation-horizontal-scroll-list-view-components.png" alt-text="List view with multiple components.":::
    :::image type="content" source="../../../../assets/images/submission/validation-horizontal-scroll-fixed-board.png" alt-text="White board with infinite canvas.":::
    :::image type="content" source="../../../../assets/images/submission/validation-horizontal-scroll-in-list-view.png" alt-text="List view allowing horizontal scroll.":::

• Always include a back button to allow users to return to previous states. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/back-button-available.png" alt-text="Example: Back button available.":::
  :::image type="content" source="../../../../assets/images/submission/no-back-button-available.png" alt-text="Example: Back button missing.":::

• Avoid horizontal scrolling in Adaptive Cards within Teams. [*Must fix*]  
• Ensure that the bottom rail (if used) does not conflict with Teams’ native mobile navigation. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-tab-bottom-rail-conflicts-with-teams-mobile.png" alt-text="Example: Mobile tab bottom rail conflict.":::

</details>

<details><summary>Usability</summary>

**Guidelines:**

• Ensure that content in tabs neither truncates nor overlaps. [*Must fix*]  
  :::image type="content" source="../../../../assets/images/submission/validation-usability-content-truncation.png" alt-text="Example: Content truncation issue in a tab.":::
• Provide an option to undo actions within the tab. [*Must fix*]  
• For personal tabs that aggregate shared content (e.g., project management apps), provide a consolidated view of shared information. [*Good-to-fix*]  
• Ensure tabs adapt to Teams’ themes when the user changes them. [*Good-to-fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-usability-responsive-tabs.png" alt-text="Example: Tab correctly responding to a theme change.":::
  :::image type="content" source="../../../../assets/images/submission/validation-usability-unresponsive-tabs.png" alt-text="Example: Tab not responding to Teams theme change.":::
• It is recommended to use Teams‐styled components (fonts, colors, grid, motion) for consistency. [*Good-to-fix*]  
• If your app requires settings changes, include a dedicated **Settings** tab. [*Good-to-fix*]  
• Ensure the tab experience on mobile is fully responsive. [*Must fix*]  
• Prevent UI elements from completely obstructing core workflows. For example, a bot embedded in a tab should be minimizable. [*Must fix*]  
  :::image type="content" source="../../../../assets/images/submission/validation-tab-elements-impede-workflow.png" alt-text="Example: Tab UI elements impeding workflow.":::
• Eliminate any broken features or functionalities. [*Must fix*]  
• If a footer is used on tabs, remove all non‑functional or irrelevant links. [*Must fix*]

</details>

<details><summary>Scope Selection</summary>

**Guidelines:**

• The landing page of configurable tabs must not be scoped to individual use (e.g., avoid labels like **My Tasks**). [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-configurable-tab-content-personal-scope.png" alt-text="Example: Personal scoped content in a configurable tab.":::
• After configuration, the landing page should display a view relevant to the entire team. [*Must fix*]
• If offering both personal and team views, use filtered views or deep links while keeping the landing page contextually uniform. [*Must fix*]
• All members in a channel should see the same content in a configurable tab. [*Must fix*]
• Tabs should have well‑focused functionality. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-usability-configurable-nested-tabs.png" alt-text="Example: Overly nested tabs within a configurable tab.":::

</details>

[Back to top](#teams-store-validation-guidelines)

---

## Bots

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
This section corresponds to [Microsoft commercial marketplace policy number 1140.4.3](/legal/marketplace/certification-policies#114043-bots).

> [!TIP]
> For optimal bot experiences, refer to the [Teams bot design guidelines](~/bots/design/bots.md).

<details><summary>Bot Design Guidelines</summary>

**Guidelines:**

• Your Teams bot must adhere to the [Teams bot design guidelines](../../../../bots/design/bots.md).  
• Implement dialogs to manage multi‑turn conversations and prevent repetitive tasks from resulting in excessive conversation turns. [*Must fix*]  
• Fix any broken links, responses, or workflows in your bot messaging. [*Must fix*]

</details>

<details><summary>Bot Commands</summary>

**Guidelines:**

• Ensure all supported bot commands, including generic ones like **Hi**, **Hello**, and **Help**, return appropriate responses. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-bot-commands-generic-response-pass.png" alt-text="Example: Bot providing valid generic responses.":::
  :::image type="content" source="../../../../assets/images/submission/validation-bot-commands-generic-no-response.png" alt-text="Example: Bot failing to respond to generic commands.":::

• Bot commands must always offer a way for users to proceed and avoid dead‑ends. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-bot-commands-deadend.png" alt-text="Example: Bot dead‑end for command.":::

• List at least one valid bot command in the app manifest under `items.commands.title` and include clear descriptions. This helps surface pre‑populated commands in the bot menu. [*Good-to‑fix*]  
• Bot responses must not include official Microsoft product images or avatars—use your own assets. [*Must fix*]  
• Bots must respond promptly without displaying a perpetual loading indicator. [*Must fix*]  
• Bot help command responses should not cause the user to leave Teams; instead, direct them to in‑app help content or an Adaptive Card with guidance. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-bot-redirects-user-outside-teams.png" alt-text="Example: Bot response incorrectly redirecting user out of Teams.":::

• Bots should provide valid responses even when the user submits an invalid or unrecognized command. [*Must fix*]  
  :::image type="content" source="../../../../assets/images/submission/validation-bot-response-valid-improper-input.png" alt-text="Example: Appropriate bot response for improper input.":::
  :::image type="content" source="../../../../assets/images/submission/validation-bot-response-improper-response-invalid-command.png" alt-text="Example: Inadequate response for invalid command.":::
• Avoid prefixing special characters (like a slash "/") to bot commands. [*Must fix*]  
  :::image type="content" source="../../../../assets/images/submission/validation-bot-commands-special-characters.png" alt-text="Example: Invalid use of special characters in bot commands.":::
• Bots must not persist in showing a typing indicator after sending a response. [*Must fix*]  
• Ensure that the help command works regardless of case (lowercase/uppercase) or whether the user is logged in. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-bot-valid-response-lowercase.png" alt-text="Example: Bot response handling lowercase commands.":::
  :::image type="content" source="../../../../assets/images/submission/validation-bot-valid-response-logged-app.png" alt-text="Example: Bot response for users not logged in.":::

• For notification‑only bots that do not accept user messages, set the `isNotificationOnly` flag to true in the manifest. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-bot-command-isnotification-only-true.png" alt-text="Example: Correct manifest setting for notification‑only bot.":::
  :::image type="content" source="../../../../assets/images/submission/validation-bot-command-isnotification-only-not-true.png" alt-text="Example: Notification‑only bot not functioning correctly.":::
• Ensure your bot’s experience is fully responsive on mobile. [*Must fix*]

> [!TIP]
> For personal bots, consider including a **Help** tab that provides additional usage details.

</details>

<details><summary>Bot First Run User Experience</summary>

**Guidelines:**

• Bots in personal scope must send a welcome message or provide prompt starters to initiate interaction. [*Must fix*]

  When using prompt starters:
  – Include at least one command highlighting the bot’s value. [*Must fix*]
  – Ensure prompt starters are functional and clearly described. [*Must fix*]
  – Provide at least three unique prompt starters if possible. [*Good-to‑fix*]

• If using a welcome message, especially for apps with complex configuration flows, include details on the app’s value, setup instructions, and available bot commands. Display welcome messages using an Adaptive Card with actionable buttons for enhanced usability. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-bot-welcome-message.png" alt-text="Example: Bot welcome message with configuration instructions.":::
  :::image type="content" source="../../../../assets/images/submission/validation-bot-no-welcome-message.png" alt-text="Example: Bot missing welcome message for complex configuration.":::

• In channel or group chat scopes, bots must avoid sending individual welcome messages to each team member. Instead, send a single contextual message that mentions the member who added the bot. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-bot-welcome-message-not-triggered.png" alt-text="Example: No welcome message triggered.":::
  :::image type="content" source="../../../../assets/images/submission/validation-bot-wel-message-trigger.png" alt-text="Example: Appropriately triggered welcome message in channel.":::

• The welcome message must include clear calls‑to‑action, configuration guidance, and ensure users are not left at a dead‑end. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-welcome-message-no-way-forward.png" alt-text="Example: Welcome message without a clear way forward.":::
  :::image type="content" source="../../../../assets/images/submission/validation-welcome-message-clear-way-forward.png" alt-text="Example: Welcome message with clear next steps.":::

• Avoid sending repetitive welcome messages (e.g., triggering on every command). [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-welcome-message-trigger-for-any-command.png" alt-text="Example: Inappropriate repeated welcome messages.":::

• The app name in the welcome message must match that in the manifest. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-app-name-mismatch-manifeast-and-welcome-message.png" alt-text="Example: Mismatch between manifest app name and welcome message.":::

</details>

<details><summary id="botmessagespamming">Bot Message Spamming</summary>

**Guidelines:**  
Bots must not spam users with multiple messages in a short period.

• In channels and chats:  
  – Post a single conversation thread rather than separate messages for successive responses. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-bot-message-spamming-one-message.png" alt-text="Example: Single-threaded bot message.":::
  :::image type="content" source="../../../../assets/images/submission/validation-bot-message-spamming-multiple-messages.png" alt-text="Example: Bot spamming with multiple messages.":::

• In personal scopes:  
  – Avoid sending multiple messages quickly; consolidate the information into a single message. [*Must fix*]
  – For workflows requiring multiple inputs, consider using a task module or form input. [*Must fix*]
  – While multi-turn conversation is acceptable for engaging purposes, it should not be used for repetitive workflows.

  :::image type="content" source="../../../../assets/images/submission/validation-bot-messages-multiple-message-quick-succession.png" alt-text="Example: Multiple messages sent in quick succession.":::
    
• For welcome messages, do not send the same message at regular intervals (e.g., when a new member joins, message only the new member individually). [*Must fix*]

  :::image type="icon" source="../../../../assets/images/submission/validation-bot-send-proactive-message-to-all-members.png" alt-text="Example: Bot inappropriately sending welcome messages to all members.":::

</details>

<details><summary>Bot Notifications</summary>

**Guidelines:**  
• Bot notifications must be relevant to the scope (team, chat, or personal) and provide clear guidance. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-bot-notifications-relevant.png" alt-text="Example: Relevant bot notification.":::
  :::image type="content" source="../../../../assets/images/submission/validation-bot-notifications-not-relevant.png" alt-text="Example: Irrelevant bot notification.":::

</details>

<details><summary>Bots and Adaptive Cards</summary>

**Guidelines:**  
Use Adaptive Cards to structure bot messages; cards should be lightweight, include no more than six actions, and allow expanded content via dialogs or tabs as needed.

Additional resources:  
• [Designing Adaptive Cards](~/task-modules-and-cards/cards/design-effective-cards.md)  
• [Cards Reference](~/task-modules-and-cards/cards/cards-reference.md#types-of-cards)

Ensure that Adaptive Cards are fully responsive on mobile and provide clear navigation and error handling.

</details>

<details><summary>Notification Only Bots</summary>

**Guideline:**  
For apps with notification-only bots (bots that primarily trigger notifications based on backend events such as new sales leads), ensure that notifications provide immediate and contextual value.  

> [!TIP]
> Provide preview information and basic inline actions in the notification card to reduce the need for exiting Teams.

</details>

<details><summary>Bot Metadata Information</summary>

**Guidelines:**  
• Bot details (name, logo, privacy link, terms of service) in the manifest must match the Bot Framework metadata. [*Must fix*]  
• The bot ID in the manifest must match that of the previously published version. Changing it can result in a loss of conversation history. [*Must fix*]  
• Update the metadata whenever there are changes in the app name, welcome message, or responses. [*Must fix*]

</details>

<details><summary>Bot in Collaborative Scope</summary>

**Guidelines:**  
• Bots installed in channels or group chats must provide value in that context and not simply function to collect team rosters for 1:1 notifications. [*Must fix*]  
• Avoid using channel or group chat bots solely to relay messages for individual workflows—they should instead switch to 1:1 interactions. [*Must fix*]

</details>

[Back to top](#teams-store-validation-guidelines)

---

## Message Extensions

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
This section aligns with [Microsoft commercial marketplace policy number 1140.4.4](/legal/marketplace/certification-policies#114044-messaging-extensions).

> [!TIP]
> For best practices, view the [Teams message extension design guidelines](~/messaging-extensions/design/messaging-extension-design.md).

<details><summary>Messaging Extensions Design Guidelines</summary>

**Guidelines:**

• Follow the [Messaging extension design guidelines](../../../../messaging-extensions/design/messaging-extension-design.md).  
  :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-design-guidelines-fail.png" alt-text="Example: App not meeting messaging extension design guidelines.":::
• Messaging extensions should offer shortcuts for inserting content or actions without leaving the conversation. Avoid embedding full websites within the extension. [*Must fix*]  
• Adaptive Card preview images must load correctly. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-preview-image-adaptive-card-loading.png" alt-text="Example: Adaptive Card preview loading correctly.":::
  :::image type="content" source="../../../../assets/images/submission/validation-preview-image-adaptive-card-not-loading.png" alt-text="Example: Adaptive Card preview not loading.":::
• Include the app icon in response cards to avoid confusion. [*Must fix*]  
• Ensure that messaging extensions do not dead‑end users and consistently work in group chats and channel contexts. [*Must fix*]  
• Provide clear sign‑in and sign‑out mechanisms for messaging extensions. [*Must fix*]  
• For extensions using OpenAPI URLs, avoid redirection and ensure API calls come from the same domain or subdomain.  

</details>

<details><summary>Action Commands for Action-based Message Extensions</summary>

**Guidelines:**

• Allow users to trigger immediate actions on messages without intermediate steps (unless sign‑in is required). [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-no-intermediate-step.png" alt-text="Example: Messaging extension without intermediate steps.":::
  :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-intermediate-step-available.png" alt-text="Example: Messaging extension with intermediate steps.":::
• Pass the relevant message context to subsequent workflow states. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-app-passes-message.png" alt-text="Example: Message context passed correctly.":::
  :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-app-doesnot-pass-message.png" alt-text="Example: Message context not being passed.":::
• For action commands triggered from a chat or channel, incorporate the host app name rather than generic verbs. [*Good-to-fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-action-command-host-name.png" alt-text="Example: Action command with host app name.":::
  :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-action-command-verb.png" alt-text="Example: Action command using a generic verb.":::
• Ensure actions complete the intended workflow without errors or indefinite loading indicators. [*Must fix*]  
• Remove duplicate action commands. [*Must fix*]  
• For apps using action-based messaging extensions, ensure the final state includes a visible notification or card sharing to guarantee that actions are not silent. [*Must fix*]

</details>

<details><summary>Preview Links (Link Unfurling)</summary>

[*Must fix*]

**Guidelines:**

• When the `supportsAnonymizedPayloads` property is declared and the user has not installed the app, the app link should unfurl showing an add‑app dialog. [*Must fix*]  
• Message extensions must only preview links for domains under the app publisher’s control (no wildcards, top‑level domains such as `*.com` or `*.org` are allowed). [*Must fix*]  
• Only include domains you directly own in the `messageHandler` link unfurling section; avoid domains like `*.botframework.com`. [*Must fix*]

</details>

<details><summary>Search Commands</summary>

**Guidelines:**

• For search‑based message extensions, provide clear instructional text to help users search effectively. [*Must fix*]
  :::image type="content" source="../../../../assets/images/submission/validation-search-commands-text-available.png" alt-text="Example: Effective search command text provided.":::
  :::image type="content" source="../../../../assets/images/submission/validation-search-commands-text-not-available.png" alt-text="Example: Insufficient search command text.":::
• If using @mention triggers, ensure that the executable text is clear.

  :::image type="content" source="../../../../assets/images/submission/validation-search-command-unclear-executable.png" alt-text="Example: Unclear executable text in a search command.":::

</details>

[Back to top](#teams-store-validation-guidelines)

---

## Dialogs

[*Must fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
This section corresponds with [Microsoft commercial certification policy number 1140.4.5](/legal/marketplace/certification-policies#114045-task-modules).

<details><summary>Expand to Know More</summary>

**Guidelines:**

• Dialogs (task modules in TeamsJS v1.x) must include the app’s icon and short name.  
• They should display only the components necessary for a specific action rather than embed the entire app.  
• For detailed guidance, refer to the [Teams dialog design guidelines](~\task-modules-and-cards\task-modules\design-teams-task-modules.md).

  :::image type="content" source="../../../../assets/images/submission/validation-task-module-displays-components.png" alt-text="Example: Task module correctly displaying necessary components.":::
  :::image type="content" source="../../../../assets/images/submission/validation-task-module-embeds-app.png" alt-text="Example: Incorrect task module embedding an entire app.":::

> [!TIP]
> Refer to the [Teams task module design guidelines](~/task-modules-and-cards/task-modules/design-teams-task-modules.md) for best practices.

</details>

[Back to top](#teams-store-validation-guidelines)

---

## Meeting Extensions

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
This section is based on [Microsoft commercial marketplace policy number 1140.4.6](/legal/marketplace/certification-policies#114046-meeting-extensions).

> [!TIP]
> For meeting extension design best practices, see the [Teams meeting extension design guidelines](~/apps-in-teams-meetings/design/designing-apps-in-meetings.md).

<details><summary>Meeting Extension Design Guidelines</summary>

**Guidelines:**

• Ensure the meeting extension provides a responsive and in‑Teams experience (pre‑, in‑, and post‑meeting experiences). [*Must fix*]

  – Pre‑meeting: Enable discovering and adding meeting apps; support pre‑meeting tasks like poll creation.  
  – Post‑meeting: Display relevant results (e.g., survey results, feedback).  
  – In‑meeting: Engage participants during the meeting without forcing them to exit Teams.

  :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-outside-teams-core-workflows.png" alt-text="Example: In‑meeting experience redirecting out of Teams for core workflows.":::

• The app must offer more than just custom Together Mode scenes. [*Must fix*]  
• Update your manifest to enable meeting support on mobile (declare `groupChat` under `configurableTabs` and include appropriate context properties like `meetingDetailsTab`, `meetingChatTab`, and `meetingSidePanel`). [*Must fix*]  
• Ensure that meeting canvases gracefully handle scenarios when the app is unavailable (e.g., due to regional restrictions). [*Must fix*]  
• The meeting UI (headers, stage) must correctly display the app name and offer sign‑out options if needed. [*Must fix*]  
• Meeting tabs on mobile must include functioning workflows (avoid blank screens). [*Must fix*]  
• The meeting stage experience should be focused and should not embed an entire website. [*Must fix*]  
• Prevent continuous loading screens or dead‑ends during a meeting. [*Must fix*]  
• When starting a meeting, the app should not open a new Teams instance. [*Must fix*]  
• Meetings must complete workflows within Teams, not redirect to competing platforms. [*Must fix*]  
• For role‑based views, clearly communicate any limitations and instructions for different user roles. [*Must fix*]

</details>

<details><summary>Pre- and Post-Meeting Experience</summary>

**Guidelines:**

• Pre‑ and post‑meeting tabs should follow general tab design guidelines. [*Must fix*]  
• Organize content in tabs for scenarios with multiple items (e.g., more than 10 polls). [*Must fix*]  
• Clearly notify users when actions (such as exporting results) have completed successfully. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-meeting-experience-tab-design-guidelines-fail.png" alt-text="Example: Meeting experience not adhering to design guidelines.":::

</details>

<details><summary>In-Meeting Experience</summary>

**Guidelines:**

• Use a dark theme during meetings. [*Must fix*] (Refer to [Teams design guidelines](~/apps-in-teams-meetings/design/designing-apps-in-meetings.md#theming))  
• When hovering over the app icon in a meeting, a tooltip with the app name must appear. [*Must fix*]  
• Message extensions should function in meetings as they do outside.

</details>

<details><summary>In-Meeting Tabs</summary>

**Guidelines:**

• In-meeting tabs must be responsive, maintain proper padding, and have consistent component sizes. [*Must fix*]  
• Include a back button if there are multiple layers of navigation. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-exp-back-button.png" alt-text="Example: In‑meeting tab with a back button present.":::
  :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-exp-back-button-absent.png" alt-text="Example: In‑meeting tab missing a back button.":::

• Do not include more than one close button.  
• Avoid horizontal scrolling. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-tab-vertical-scroll.png" alt-text="Example: In‑meeting tab with vertical scroll.":::
  :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-tab-horizontal-scroll.png" alt-text="Example: In‑meeting tab with horizontal scroll.":::

</details>

<details><summary>In-Meeting Dialogs</summary>

**Guidelines:**

• Use dialogs sparingly for light, task-oriented scenarios. [*Must fix*]  
• In-meeting dialogs should display content in a single column without multiple navigation levels. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-single-column-layout.png" alt-text="Example: Single column layout for an in-meeting dialog.":::
  :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-multiple-column-layout.png" alt-text="Example: Multi-column layout for an in-meeting dialog (not recommended).":::

• Ensure dialogs are centered relative to the meeting stage and auto-dismiss upon user action. [*Must fix*]

• For Together Mode scenes, follow these best practices:
  – Use .png format for images.  
  – Keep the final package under 1920x1080 resolution (even numbers only).  
  – The maximum scene size is 10 MB, with no individual image exceeding 5 MB.  
  – Mark overlapping images as Transparent where applicable.

</details>

<details><summary>Shared Meeting Stage</summary>

**Guideline:**  
To use the **shareAppContentToStage** API, update the manifest’s `authorization` property to include the permission with `name` set to `MeetingStage.Write.Chat` and `type` as `Delegated`. [*Must fix*]

Note: Shared meeting stage can only be launched on the Teams desktop app; however, the shared experience should not break on mobile devices.

</details>

[Back to top](#teams-store-validation-guidelines)

---

## Connector

1. The connector name must match the app name exactly as defined in both the app and the app manifest.

  :::image type="content" source="../../../../assets/images/submission/connector-mismatch-app-name.png" alt-text="Example: Mismatch between connector name and app name.":::

2. The connector configuration must be error‑free and functional for users. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/connector-error-configuring.png" alt-text="Example: Error encountered while configuring the connector.":::

---

## Notifications

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
This section aligns with [Microsoft commercial marketplace policy number 1140.4.7](/legal/marketplace/certification-policies#114047-notification-apis).

If your app uses the [activity feed APIs provided by Microsoft Graph](/graph/teams-send-activityfeednotifications), adhere to the following guidelines.

> [!TIP]
> For notifications triggered over long intervals (e.g., after one day or one month), ensure that the background trigger is testable during your submission review.

<details><summary>Notification Design Guidelines</summary>

**Guidelines:**

• Follow the [activity feed notifications design guidelines](/graph/teams-send-activityfeednotifications).  
• Ensure that notifications are relevant and do not block the user from completing necessary actions. [*Must fix*]  
• Include the app’s name within the notification to clearly indicate its source. [*Must fix*]  
• All notifications specified in the app’s documentation and manifest must be triggered appropriately. [*Must fix*]  
• Notifications must appear within five seconds of the triggering action. [*Must fix*]  
• Clearly state any notification limitations in the app description. [*Must fix*]

</details>

<details><summary>General Notification Guidelines</summary>

**Guidelines:**

• Every notification trigger must work as expected. [*Must fix*]  
• Notifications must be localized based on your app’s supported languages. [*Must fix*]  
• Ensure notifications display promptly (within five seconds). [*Must fix*]

</details>

<details><summary>Avatars</summary>

**Guidelines:**

• The avatar in notifications should match your app’s color icon. [*Must fix*]  
• If a notification is triggered by a user, include that user’s avatar in the notification. [*Must fix*]

</details>

<details><summary>Spamming</summary>

**Guidelines:**

• Do not send over 10 notifications per minute to any single user. [*Must fix*]  
• Avoid duplicate notifications from both bots and the activity feed. [*Must fix*]  
• Ensure notifications offer meaningful value rather than being trivial or irrelevant. [*Must fix*]

</details>

<details><summary>Navigation and Layout</summary>

**Guidelines:**

• Notifications must conform to the Teams activity feed layout. [*Must fix*]  
• Selecting a notification should navigate the user to the appropriate in‑Teams content. [*Must fix*]

</details>

[Back to top](#teams-store-validation-guidelines)

---

## Microsoft Graph Connector

**Note:**  
It is recommended that you publish your Graph connector through the [Graph connector gallery](/microsoftsearch/connectors-gallery) rather than including it in your manifest.json file. Guidelines for the declarative agent file differ; refer to [review-copilot-validation-guidelines.md](review-copilot-validation-guidelines.md) for more information.

***Example***

Avoid including the Graph connector node in your manifest file.

  :::image type="content" source="../../../../assets/images/Copilot/da-graph-connector.png" alt-text="Example: Graph connector node in the manifest file.":::

[Back to top](#teams-store-validation-guidelines)

---

## Microsoft 365 App Compliance Program

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
This section aligns with [Microsoft commercial certification policy number 1140.6](/legal/marketplace/certification-policies#11406-publisher-attestation).

For publishing an app to the Teams Store, complete the following tiers of the Microsoft 365 App Compliance Program:

<details><summary>Expand to Know More</summary>

• **Publisher Verification:**  
  Helps users and admins verify the authenticity of the app developer. Upon completion, a blue **verified** badge appears on the Microsoft Entra consent dialog and related screens. See [Mark your app as publisher verified](/azure/active-directory/develop/mark-app-as-publisher-verified). [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-365-compliance-publisher-verification.png" alt-text="Example: Blue verified badge on Microsoft Entra consent dialog.":::

• **Publisher Attestation:**  
  Share information regarding data handling, security, and compliance. [*Good-to-fix*]

  :::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
For new apps, attestation can only be completed after listing on the Teams Store. For app updates, complete [Publisher Attestation](/microsoft-365-app-certification/docs/attestation) prior to submitting the latest version.

</details>

[Back to top](#teams-store-validation-guidelines)

---

## Advertising

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
This section adheres to [Microsoft commercial marketplace policy number 1140.7](/legal/marketplace/certification-policies#11407-advertising).

**Guideline:**  
Your app must not display any form of advertising (including dynamic, banner, or text-based ads within messages). [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-advertising-banners.png" alt-text="Example: Advertising banners in Teams that violate guidelines.":::

[Back to top](#teams-store-validation-guidelines)

---

## Cryptocurrency Based Apps

**Guideline:**  
If your app involves cryptocurrency transactions, storage, or related content, you must ensure full compliance with all applicable laws. This includes, but is not limited to, scenarios in which your app:

• Facilitates cryptocurrency transactions or transfers.  
• Promotes or references cryptocurrency content.  
• Enables users to store or access cryptocurrency.  
• Encourages or facilitates cryptocurrency mining or participation in ICOs.  
• Rewards users with cryptocurrency tokens upon completion of tasks.

After an internal Microsoft review, if your compliance demonstration is satisfactory, certification may proceed. If not, you will be informed of the decision.

[Back to top](#teams-store-validation-guidelines)

---

## App Functionality

**Guidelines:**

• Ensure every workflow or content piece in your app is relevant to its stated scope. [*Must fix*]  
• All app capabilities must function as described in both the AppSource listing and the manifest. [*Must fix*]  
• Notify users before downloading any files or executables on their systems. CTAs that clearly indicate a download are permitted. [*Must fix*]  
• If your app has region-specific dependencies, display a graceful failure message for unsupported regions. [*Must fix*]

[Back to top](#teams-store-validation-guidelines)

---

## Mobile Experience

**Guidelines:**

• Mobile add-ins must be free of charge. Do not include in‑app content or links that promote upselling, online stores, or any payment requests. Any required account sign‑ups must be free and should not display cues for payment if time‑limited. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-mobile-add-in-charges.png" alt-text="Example: Mobile add‑in displaying payment requests.":::

• The terms **FREE**, **FREE TRIAL**, or **TRY FREE** are acceptable on desktop or web experiences without limitations.  
• On mobile, the word **FREE** is allowed as plain text when referring to a trial or upgrade, but must not be associated with pricing information or payment links. [*Must fix*]  
• Any pricing details (whether as images, text, or links) are not permitted on mobile. CTAs such as **view plans** must be avoided. [*Must fix*]  
• Digital goods cannot have in‑app payments on mobile, although payments for physical goods are allowed. [*Must fix*]  
• Teams apps must deliver a seamless cross‑device experience. [*Must fix*]  
• If any mobile capability is unsupported, provide a graceful error message instead of a dead‑end. [*Must fix*]

[Back to top](#teams-store-validation-guidelines)

---

## Apps Extended Across Microsoft 365 Clients

### General

**Guidelines:**

• Apps intended to extend Teams functionality across Microsoft 365 clients must use manifest schema version 1.13 or later.  
• The support URL should offer content relevant to the extension across all Microsoft 365 clients rather than focusing on a single client.  
• Clearly reference in your app description that the Teams app extends across multiple Microsoft 365 clients.

### Compatibility

Ensure your app works responsively on the latest versions of:
• Microsoft Edge  
• Google Chrome  
• Outlook (Windows and Web)  
• Microsoft 365 on Desktop, Web, and Android  
• Microsoft Teams on both Desktop and Mobile

### Mobile Experience (for Extended Apps)

**Guidelines:**

• Users must be able to launch the app from the actions flyout menu within the Microsoft 365 mobile client, with the app name clearly displayed in the action bar. [*Must fix*]

#### App Launch from Actions Flyout

Users must be able to launch and switch among multiple static tabs within the Microsoft 365 mobile client. If there are more than three static tabs, the extras should be under a **More** section. [*Must fix*]

#### Multi‑Tab Experience

If SSO is enabled, the app must authenticate users seamlessly. [*Must fix*]

#### App Authentication

The app should properly terminate user sessions if they switch accounts or log out within the Microsoft 365 mobile client. [*Must fix*]

#### Account Switching and Logout Experience

• Ensure that users can navigate back to their previous state; when on the root page, back navigation should exit the app instance. [*Must fix*]  
• For deep links, users must be redirected to the appropriate landing page. [*Must fix*]

#### Tab Navigation

• Display a progress/loading indicator while the app is loading; dismiss it automatically once loaded. [*Must fix*]  
• Show a clear error screen if the app fails to load (e.g., due to a network error or authentication failure). [*Must fix*]

[Back to top](#teams-store-validation-guidelines)

---

## Teams Apps Extensible as Agents for Microsoft 365 Copilot

**Guidelines:**

• App packages must be correctly formatted and adhere to manifest schema version 1.13 or later.  
• The app must pass the [responsible AI checks](/legal/marketplace/certification-policies#1-apps-with-artificial-intelligenceai-generated-content-must-meet-below-requirements).  
• The app must meet the [agent compatibility criteria](review-copilot-validation-guidelines.md).

### Agent Must Not Manipulate LLM Behavior

The following must not appear in short descriptions, parameters, or commands:
1. Instructional phrases such as “if the user says X, ignore” or similar modifications to the model behavior.  
2. Verbose or overly marketing language.  
3. Superlative claims (e.g., **#1**, **amazing**, **best**).  
4. URLs, emojis, or hidden characters (including hexadecimal or binary symbols).  
5. Grammar or punctuation mistakes.

### User Awareness

The long description must clearly state:
• The app’s compatibility with Microsoft 365 Copilot (e.g., “Contoso in Microsoft 365 Copilot to search and summarize your tasks”).  
• Provide at least one prompt or example indicating how users can use the message extension as a Copilot agent.

  :::image type="content" source="../../../../assets/images/Copilot/validation-guidelines-plugin-prompt-pass.png" alt-text="Example: Valid message extension prompt for Copilot.":::
  :::image type="content" source="../../../../assets/images/Copilot/validation-guidelines-plugin-prompt-fail.png" alt-text="Example: Missing prompt for Copilot functionality.":::

### Response Quality

**Guidelines:**

• The mandatory fields in the Microsoft 365 Copilot Adaptive Card response must include an information title and at least two additional helpful fields (e.g., date modified, author, status, flags) in a single response containing both preview and content.  
  :::image type="content" source="../../../../assets/images/Copilot/validation-guidelines-app-response-copilot.png" alt-text="Example: Copilot response with preview and content combined.":::
• Adaptive Cards in the Copilot response must include a functional action button.  
  :::image type="content" source="../../../../assets/images/Copilot/validation-guidelines-plugin-functional-action.png" alt-text="Example: Functional action button in Adaptive Card.":::
• Microsoft 365 Copilot must handle single-parameter, multi-parameter, and follow-up prompts accurately without errors.  
• Ensure that the message extension includes at least two parameters to enhance product usability in the Copilot context.

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