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

Following these guidelines increases the chances of your app to pass the Microsoft Teams Store submission process. The Teams-specific guidelines complement the Microsoft [commercial marketplace certification policies](/legal/marketplace/certification-policies#1140-teams) and are updated frequently to reflect new capabilities, user feedback, and business rule changes.

> [!NOTE]
> • Some guidelines may not be applicable to your app. For example, if your app doesn't include a bot, you can ignore bot-related guidelines.  
> • We've cross-referenced these guidelines to the Microsoft commercial certification policies and added Do’s and Don’ts with examples from pass or fail scenarios encountered in our validation process.  
> • Certain guidelines are marked as *Must fix*. If your app submission doesn't meet these mandatory guidelines, you'll receive a failure report from us with steps to mitigate. Your app submission passes Teams Store validation only after you've fixed the issues.  
> • Other guidelines are marked as *Good-to-fix*. For an ideal user experience, we recommend that you fix the issues; however, your app submission isn't blocked from publishing on the Teams Store if you choose not to fix the issues.

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

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
This section is aligned with [Microsoft commercial certification policy number 1140.1](/legal/marketplace/certification-policies#11401-value-proposition-and-offer-requirements) and offers further guidance to developers of Microsoft Teams apps regarding the offer’s value proposition.

Apps must provide significant value by enabling users to complete meaningful workflows that encourage repeated use. Expand the following sections for detailed insights into the value proposition:

<br>

<details><summary>Tabs</summary>

Tabs must deliver meaningful functionality beyond simply hosting an existing website. [*Must fix*]

• The tab should offer workflows that are intrinsic to the app, rather than just acting as a container for an iframe.  

:::image type="content" source="../../../../assets/images/submission/validation-usability-app-provides-workflows.png" alt-text="Graphic shows an example of an app with a workflow valuable to channel members within a team.":::

:::image type="content" source="../../../../assets/images/submission/validation-usability-website-i-framed.png" alt-text="Graphic shows an example of an app with an entire website in an I-frame without any back option.":::

</details>

<br>

<details><summary>Notification bots</summary>
A notification is valuable within Teams if:

1. The posted card or text provides detailed information that requires no further user action.  
2. The posted card or text offers a preview sufficient for the user to take action or decide to view more details via an external link.

Apps that solely display notifications with generic content (e.g., **You have a new notification** or **click to view**) and force users to navigate outside Teams do not deliver significant in-Teams value.

:::image type="content" source="../../../../assets/images/submission/validation-bot-notification-only-inadequete-info.png" alt-text="Screenshot shows an example of a notification-only scenario with inadequate preview information.":::

</details>

<br>

<details><summary>Message extensions</summary>

[*Must fix*]

Apps offering search-based message extensions add value by sharing cards that enable contextual conversations without leaving the Teams experience.

To pass validation for a search-based message extension-only app, ensure that:

1. The card shared provides sufficient details, negating the need for additional user actions.  
2. The card offers ample preview information, allowing users to decide whether to take further steps via an external link.

    :::image type="content" source="../../../../assets/images/submission/validation-search-based-messaging-ext-adequete-info.png" alt-text="Validation of search-based messaging extension with adequate information.":::

    :::image type="content" source="../../../../assets/images/submission/validation-search-based-messaging-ext-inadequete-info.png" alt-text="Validation of search-based messaging extension with inadequate information.":::

</details>

<br>

<details><summary>Link unfurling</summary>

Apps that only implement link unfurling do not offer significant value within Teams. Consider expanding your app’s capabilities with additional workflows if link unfurling is your sole function.

</details>

<br>

[Back to top](#teams-store-validation-guidelines)

### App Name

[*Must fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
This section complies with Microsoft [commercial certification policy number 1140.1.1](/legal/marketplace/certification-policies#114011-app-name) and gives developers guidance on proper app naming.

An app's name is key for discoverability in the Teams Store. Follow these guidelines for naming your app:

* Include terms relevant to your users. [*Must fix*]  
  • Ensure that the name speaks directly to the intended audience.  
* Prefix or suffix common nouns with your developer's name. For example, use **Contoso Tasks** rather than just **Tasks**. [*Must fix*]  
* Do not use **Teams** or other Microsoft product names (such as Excel, PowerPoint, Word, OneDrive, SharePoint, OneNote, Azure, Surface, and Xbox) that can imply a false co-branding or co-sell relationship. Refer to [Microsoft Trademark and Brand Guidelines](https://www.microsoft.com/legal/intellectualproperty/trademarks/usage/general) for more details. [*Must fix*]  
* Avoid names that replicate an app listed in the Teams Store or other commercial marketplace offers. [*Must fix*]  
* The app name must not include profane, derogatory, racially, or culturally insensitive language. [*Must fix*]  
* The app name must be unique. For example, if you have an app named Contoso in both the Teams Store and Microsoft AppSource and wish to list a region-specific version like Contoso Mexico, ensure:
  * The regional functionality is clearly indicated in the title, metadata, first-run experience, and help sections. [*Must fix*]
  * When uploading the app package in Partner Center, select the appropriate **Markets** in the **Availability** section. [*Must fix*]
* Avoid starting the app name with generic Teams features (e.g., Chat, Contacts, Calendar, Calls, Files, Activity, Teams, or Help) as these may be shortened or confused with core Teams functionalities. [*Must fix*]
* If your app is part of an official partnership with Microsoft, the app name must lead with your app’s identity. For example, **Contoso connector for Microsoft Teams**.  
* Do not use parenthesis in the app name to include Microsoft product references. [*Must fix*]
* The developer name must be identical in both the app manifest and AppSource. [*Must fix*]
* The app manifest submitted should be a production manifest; it must not indicate a preproduction status (avoid using Beta, Dev, Preview, UAT, etc.). [*Must fix*]
* The app name must be consistent between the app manifest and AppSource. [*Must fix*]

 > [!TIP]
 > Your app’s branding (including app name, developer name, icon, AppSource screenshots, video, short description, and website) must not impersonate an official Microsoft offering unless you are an official Microsoft 1P partner.

### Duplicate App

Apps from the same developer that offer identical functionality should share a single app listing—unless privacy compliance or government cloud requirements necessitate separate listings. Build your business logic to support only one listing.

  * For multiple regions: Incorporate regional support within your business logic and maintain one listing.

   :::image type="content" source="../../../../assets/images/submission/validation-guidelines-pass-region-app-manifest.png" alt-text="Screenshot showing a region requirement passed using business logic.":::

  * For multiple deployment scenarios (on-premises and on-cloud): Integrate the logic accordingly within your single listing.

### Suitable for workplace consumption

[*Must fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
This section aligns with Microsoft commercial certification policies [1140.1.2](/legal/marketplace/certification-policies#114012-workplace-appropriateness), [100.8](/legal/marketplace/certification-policies#1008-significant-value), and [100.10](/legal/marketplace/certification-policies#10010-inappropriate-content). It provides additional guidance on building workplace-appropriate apps.

• Ensure app content is suitable for a general workplace and does not include themes related to religion, politics, gambling, or prolonged entertainment. [*Must fix*]  
• Your app should foster group collaboration or improve individual productivity. Apps aimed primarily at socializing must support multiple users and not require sessions exceeding 60 minutes or hamper productivity. [*Must fix*]  
• Apps that aggregate content must offer a mechanism for users to report inappropriate issues to the publisher. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-guidelines-content-aggregator-app.png" alt-text="Screenshot showing a working content aggregator with a way to report issues.":::

</details>

### Similar platforms and services

[*Must fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
This section complies with [Microsoft commercial certification policy number 1140.1.3](/legal/marketplace/certification-policies#114013-other-platforms-and-services).

• The focus must remain on the Teams experience. Do not incorporate names, icons, or imagery of other similar chat-based collaboration platforms or services in your content or metadata unless you offer specific interoperability.

### Feature names

Avoid using terminology reserved for Teams or other Microsoft products in feature names within buttons or UI text. For instance, avoid words such as **Start meeting**, **Make call**, or **Start chat**. If necessary, include your app name to create distinction, e.g., **Start Contoso meeting**.

### Authentication

[*Must fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
This section is compliant with [Microsoft commercial certification policy number 1140.1.4](/legal/marketplace/certification-policies#114014-access-to-services) and offers guidance for authenticating your app with external services.

For detailed implementation guidance, refer to [authentication in Teams](~/concepts/authentication/authentication.md).

<br>
<details><summary>Expand to know more</summary>

#### Authenticating with external services

If your app relies on external service authentication, please adhere to these guidelines:

* **Sign in, sign out, and sign up experiences**:
  * Ensure that your sign in, sign out, and sign up experiences are clear and simple. [*Must fix*]
  * When signing out, users should only be logged out of the app and remain logged into Teams. [*Must fix*]
  * Provide a clear way for new users to sign up or contact your team—include this in the app manifest, AppSource long description, and first-run experience. [*Must fix*]
  * For apps requiring an admin-configured one-time setup, clearly state this dependency in the app manifest, AppSource long description, and across first-run experiences (e.g., bot welcome message, tab setup, configuration page). [*Must fix*]
  
* **Content sharing experiences**:
  * If authentication is required for sharing content in Teams channels, clearly explain in your help documentation how users can disconnect or unshare content (if supported on the external service). Note: This does not require the unsharing functionality to be present in your Teams app.

</details>

### Audio

* If your app’s primary intent is to stream music, it must support at least one collaborative scenario with a complete workflow (e.g., sharing, pinning, and synchronously listening to a playlist). [*Must fix*]
* Apps focused on music streaming are encouraged to support a collaborative co-listening experience. [*Good-to-fix*]

---

## Security

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
This section aligns with [Microsoft commercial certification policy number 1140.3](/legal/marketplace/certification-policies#11403-security).

[Back to top](#teams-store-validation-guidelines)

### Financial information

[*Must fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
Compliant with [Microsoft commercial certification policy number 1140.3.1](/legal/marketplace/certification-policies#114031-financial-transactions), this section details how financial information should be handled within Teams without compromising user security.

<details><summary>Expand to know more</summary>

• Apps must not ask users to make payments within the Teams interface or transmit financial information via bot interfaces. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-financial-information-1.png" alt-text="Validation of financial information handling.":::

• You may provide a link to a secure, external payment service only if this is disclosed in your terms of use, privacy policy, profile page, or website before user consent. [*Must fix*]

• Do not facilitate payments through your app for goods or services prohibited by [General policy number 100.10 Inappropriate content](/legal/marketplace/certification-policies#10010-inappropriate-content). [*Must fix*]

• For iOS or Android versions of your Teams app, abide by these guidelines:
  * No in-app purchases, trial offers, or upsell UI directing users to paid content. [*Must fix*]
  
    :::image type="content" source="../../../../assets/images/submission/validation-financial-information-in-app-purchase.png" alt-text="Validation of in-app purchase restrictions.":::
    
    :::image type="content" source="../../../../assets/images/submission/validation-financial-information-online-stores.png" alt-text="Validation of online store restrictions.":::
  
  * If an account is required, users must be able to sign up at no charge—the terms **free account** or **free** are disallowed. [*Must fix*]
  * Define whether an account is active indefinitely or for a limited period; on expiry, the UI should not prompt for payment. [*Must fix*]
  * Privacy policies and terms of use must not contain commerce-related UI or links. [*Must fix*]

</details>

### Bots

[*Must fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
This section aligns with [Microsoft commercial marketplace policy number 1140.3.2](/legal/marketplace/certification-policies#114032-bots-and-messaging-extension).

<details><summary>Expand to know more</summary>

For apps using Microsoft Azure Bot Service (including bots and message extensions), ensure that all requirements in the Microsoft [Online Services Terms](https://www.microsoftvolumelicensing.com/DocumentSearch.aspx?Mode=3&DocumentTypeId=46) are met.

• Bots must always request permission before uploading a file and display a confirmation message.  

   :::image type="content" source="../../../../assets/images/submission/validation-bot-confirmation-message.png" alt-text="Validation of bot file-upload confirmation.":::

</details>

### External domains

[*Must fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
This section is compliant with [Microsoft commercial marketplace policy number 1140.3.3](/legal/marketplace/certification-policies#114033-external-domains). It provides guidance on the acceptable domains for your app’s `validDomains` property.

<details><summary>Expand to know more</summary>

• Do not include domains not under your organization's control (including wildcards) or tunneling services. Exceptions include:
  * For SharePoint-reliant apps, you may include the associated root SharePoint site using the `{teamSiteDomain}` context property. [*Must fix*]
  * Do not use top-level domains like **.com**, **.in**, or **.org** as a valid domain. [*Must fix*]
  * Avoid using **.onmicrosoft.com** (unless controlled by you); instead, use the correctly controlled domain (e.g., **yoursite.com**). [*Must fix*]
  * For PowerApps built on Microsoft Power Platform, include *apps.powerapps.com* to ensure accessibility and functionality within Teams.
  * External domains in the submission must not contain URLs (e.g., include www or https). [*Must fix*]
  * If your app uses the Azure Bot Service's OAuthCard, include *token.botframework.com* as a valid domain. Do not use wildcards for *.botframework.com*. [*Must fix*]
  * OpenAPI URLs must be under your control.
  * The following external domains are prohibited: [*Must fix*]
    * *.azurewebsites.net  
    * *.azureedge.com  
    * *.microsoft.com  
    * *.microsoftonline.com  
    * *.onmicrosoft.com  
    * go.microsoft.com  
    * teams.microsoft.com

• When using wildcards, note:
  * A subdomain segment with a wildcard must be the only character in that segment.
  * Any segment preceding a wildcard must also be a wildcard segment.

For example, *\*.\*.domain.com* is valid; however, *foo.\*.myteam.domain.com* is not.

</details>

### Sensitive content

[*Must fix*]

• Your app must not post or expose sensitive data (e.g., credit card details, financial payment data, health information, contact tracing details, or other personal identifiable information) to unintended audiences.

• The app must proactively warn users before downloading any files or executables onto their system.

---

## General functionality and performance

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
This section is in line with [Microsoft commercial marketplace policy number 1140.4](/legal/marketplace/certification-policies#11404-functionality).

• It is mandatory to provide clear "way forward" guidance for both admins and existing users, such as hyperlinks to sign up, get started, contact support, or help resources.  
• If there’s any dependency on an admin for user configuration, this must be clearly stated in both the app manifest long description and the AppSource listing.

[Back to top](#teams-store-validation-guidelines)

### Launching external functionality

[*Must fix*]

Apps should not force users to leave Teams to perform core tasks. App interactions should primarily remain within Teams using capabilities such as bots, Adaptive Cards, tabs, and dialogs (task modules in TeamsJS v1.x).

> [!NOTE]
> For scenarios where deep linking is required using protocols like `tel:`, `mailto:`, or `webex:`, launch these deep links in a new window via the `window.open` method or an anchor tag with `target="_blank"`.

<br>

<details><summary>Expand to know more</summary>

• Always navigate users within the Teams app environment. External navigation should be explicit and require user permission. [*Must fix*]  
• UI elements (buttons, links) that redirect externally must clearly indicate that users are leaving Teams, for example, using phrases like **View in Contoso.com**. [*Must fix*]  
• Use a **Pop-out** icon (:::image type="icon" source="../../../../assets/icons/pop-out-icon.png" :::) or alternate cues such as text notes or interstitial dialogs to notify users. [*Must fix*]

</details>

### Compatibility

[*Must fix*]

• Teams apps must function fully on the latest versions of:
  - Microsoft Windows  
  - macOS  
  - Microsoft Edge  
  - Google Chrome  
  - iOS  
  - Android

• Ensure that unsupported browsers or operating systems display a graceful failure message.

### Response time

[*Must fix*]

Teams apps must respond promptly, or alternatively display loading or typing indicators. Standards include:

* Tabs should either respond within two seconds or show a loading message. [*Must fix*]
* Bots must respond to user commands within two seconds or at least display typing indicators. [*Must fix*]
* Message extensions are required to respond within two seconds. [*Must fix*]
* Notifications should appear within two seconds following a user action. [*Must fix*]

### Apps powered by Artificial Intelligence

Explore responsible AI practices with resources like the [Microsoft RAI Toolkit](https://www.microsoft.com/en-us/ai/responsible-ai-resources) and [HAX Toolkit Project](https://www.microsoft.com/en-us/research/project/hax-toolkit/).

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
This section complies with the policies for AI-generated content and apps using facial recognition capabilities as specified in [the respective guidelines](/legal/marketplace/certification-policies#1-apps-with-artificial-intelligenceai-generated-content-must-meet-below-requirements) and [for facial recognition capabilities](/legal/marketplace/certification-policies#2-apps-using-facial-recognition-capabilities-are-subject-to-the-following-policies).

#### Apps with AI-generated content

* The app must not generate or feature harmful or offensive AI content, in accordance with policy [100.10](/legal/marketplace/certification-policies#10010-inappropriate-content). [*Must fix*]

  * Consider using these strategies:
    * Integrate the [Teams AI library](~/bots/how-to/teams-conversational-ai/teams-conversation-ai-overview.md) built on GPT-based models and intent engines. [*Good-to-fix*]
    * Utilize moderation hooks via a moderation API to regulate bot responses. [*Good-to-fix*]
    * Implement conversation sweeping to monitor and manage dialogue quality. [*Good-to-fix*]

* Provide users with mechanisms to report any inappropriate or harmful AI-generated content. Options include:
  * In-app reporting links or email addresses in the app description.
  * A built-in reporting feature within the app interface.

* Act promptly on reported issues. [*Must fix*]
* Clearly describe your AI capabilities to users before they acquire the app, ensuring transparency as per policy [100.1.3](/legal/marketplace/certification-policies#10013-description). [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/teams-ai-library-description-guideline.png" alt-text="Screenshot showing proper description of AI functionalities.":::

#### Apps using facial recognition capabilities

> [!NOTE]
> Apps employing such technologies may undergo additional review to ensure adherence to Microsoft’s Responsible AI principles.

* Do not use facial recognition to enable police department tracking in the United States. [*Must fix*]
* Clearly indicate facial recognition or emotional inference technologies in your app description. [*Must fix*]
  * Note: Apps that simply detect individual facial elements (like smiles or raised eyebrows) are permissible; however, inferring emotional states is subject to additional restrictions.

---

## App package and Teams Store listing

[*Must fix*]

Ensure that your app packages are correctly formatted and include all required information and components.

> [!TIP]
> • Guarantee the validity of any test accounts or environments provided until the app goes live.  
> • Include detailed testing instructions such as:
>   - **Steps to configure the app test accounts** if external authentication is involved.
>   - A summary of **expected app behavior** for key workflows.
>   - **Limitations and exceptions** in functionality as detailed in the app description and supporting materials.
>   - Notations about any specific **considerations for testers**.
>   - Prepopulated dummy data for testing where applicable.
>   - Ensure that if you provide test accounts, third-party integration is enabled.

[Back to top](#teams-store-validation-guidelines)

### App manifest

[*Must fix*]

The app manifest defines your app's configuration. Key points for compliance:

* It must adhere to a publicly released manifest schema (see [app manifest reference](~/resources/schema/manifest-schema.md)). Do not use preview versions.  
* For bots or message extensions, manifest details must match the Bot Framework metadata (e.g., bot name, logo, privacy policy, terms of service links).  
* If using Microsoft Entra ID for authentication, include the Application (client) ID in the manifest (see the [app manifest reference](~/resources/schema/manifest-schema.md#webapplicationinfo)).

### Uses of latest app manifest schema

* For Single sign-on (SSO), declare Microsoft Entra ID in the manifest for user authentication. [*Must fix*]  
* Update your app package to use a public manifest schema version 1.10 or later. [*Must fix*]  
* For app updates, increase only the app version number; the App ID must remain unchanged. [*Must fix*]  
* Do not include extraneous files in the app package. [*Must fix*]  
* The version number in the manifest must match that in any additional language-specific manifests. [*Must fix*]  
* Use schema version 1.5 or later to localize your app. Update the `$schema` attribute and `manifestVersion` property accordingly in your manifest.json file. [*Must fix*]  
* If modifying capabilities or metadata, update the app version number and submit the new manifest for validation. [*Must fix*]  
* Follow Semantic Versioning (MAJOR.MINOR.PATCH) for the version string. [*Must fix*]  
* If admin consent is required, declare `webapplicationinfo` in the manifest to ensure correct display in Teams admin center. [*Must fix*]  
* Submit only production versions of the manifest. [*Must fix*]  
* It is recommended (but not required) to include the Microsoft Cloud Partner Program ID (formerly MPN ID) in the manifest. [*Good-to-fix*]  
* Ensure any scopes or context declared in the manifest are visible in the app. [*Must fix*]

### App icons

[*Must fix*]

Icons are essential for your app’s branding and recognition in the Teams Store.

<details><summary>Expand to know more</summary>

Your icons should clearly convey your brand and app purpose while meeting these requirements:

* The color and outline icons used in the store listing and app package must match. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/color-outline-icon-same.png" alt-text="Color icon and outline icon match.":::

   :::image type="content" source="../../../../assets/images/submission/color-outline-icon-not-same.png" alt-text="Color icon and outline icon do not match.":::

* The app package must include both a color icon and an outline icon in .png format. [*Must fix*]
* The marketplace icon in your Partner Center listing must match the color icon provided in the package. [*Must fix*]
* The color icon should be 192x192 pixels with the app’s symbol on a solid or fully transparent square background. [*Must fix*]
* The outline icon, used in scenarios like the Teams app bar or message extension pinning, must be 32x32 pixels with appropriate transparency and no extra padding. [*Must fix*]
* All icons in the package must be correctly sized, accurately formatted, and consistent with metadata in the Teams Store listing. [*Must fix*]

For more information, consult the [icon guidelines](~/concepts/build-and-test/apps-package.md#app-icons).

</details>

### App descriptions

Your app must have both a short and long description that are consistent between the app configuration and your Partner Center listing.

:::image type="content" source="../../../../assets/images/submission/validation-app-description-adequete-information.png" alt-text="Example of an adequate app description.":::

:::image type="content" source="../../../../assets/images/submission/validation-app-description-inadequete.png" alt-text="Example of an inadequate app description.":::

<br>

<details><summary>Expand to know more</summary>

Descriptions must not disparage any other brand. Avoid unsubstantiated claims (e.g., Guaranteed 200% efficiency increase).

* Comparative marketing is forbidden. Avoid competitor logos, trademarks, or references in your listing metadata. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-app-description-comparitive-marketing-fail.png" alt-text="Example of comparative marketing in app description.":::

* Avoid hyperlinked contact details, help links, or sign-up links in the description. [*Good-to-fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-app-description-contact-deatils-hyperlinked.png" alt-text="Hyperlinked contact details in app description.":::

   :::image type="content" source="../../../../assets/images/submission/validation-app-description-contact-deatils-not-hyperlinked.png" alt-text="Non-hyperlinked contact details in app description.":::

* Clearly outline the intended audience, unique value proposition, supported Microsoft products, prerequisites, and any limitations or account dependencies. [*Must fix*]
* Ensure that if the app name is updated, the manifest and related metadata across AppSource are updated accordingly. [*Must fix*]
* Clearly state any limitations or dependencies such as enterprise account requirements, paid subscriptions, or regional restrictions.  
   
   :::image type="content" source="../../../../assets/images/submission/validation-app-description-limitations-calledout-pass.png" alt-text="Example of limitations stated in app description.":::
   
   :::image type="content" source="../../../../assets/images/submission/validation-app-description-limitations-not-calledout-fail.png" alt-text="Example of limitations not stated in app description.":::
  
* If your app is region-specific, mention this clearly in your metadata.
* Reference Teams correctly; use **Microsoft Teams** on first occurrence, then refer to it simply as Teams in subsequent mentions. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-app-description-teams-reference-pass.png" alt-text="Correct reference to Teams in description.":::

   :::image type="content" source="../../../../assets/images/submission/validation-app-description-teams-reference-fail.png" alt-text="Incorrect reference to Teams in description.":::

#### Short description

A concise, one-sentence summary highlighting the app’s value proposition. Follow these practices:

**Dos:**

• Keep it to one sentence.  
• Place the most critical information first.  
• Include relevant keywords for search.  
• Avoid redundancy such as repeating the app name.

**Don't:**  
[*Good-to-fix*]  
• Avoid using the word **app** unnecessarily.

#### Long description

Provide an engaging narrative that explains your app’s value, target audience, and industry relevance. Although you can use up to 4,000 characters, approximately 1,000 characters is recommended.

**Dos:**

• Format using [Markdown](https://support.office.com/article/use-markdown-formatting-in-teams-4d10bd65-55e2-4b2d-a1f3-2bebdcd2c772).  
• Use active voice (e.g., **You can...**).  
• List up to three key benefits clearly.  
• Describe the key value proposition.  
• Use bullet points to list features, making the description scannable.  
• Clearly state any limitations or conditions.  
• Include a help or support link.  
• Refer to **Microsoft 365** instead of **Office 365**.  
• Use recommended phrasing for interaction with Teams (e.g., “works with Microsoft Teams”, “integrated with Microsoft Teams”, etc.).

**Don'ts:**

[*Must fix*]

• Exceed 500 words.  
• Abbreviate **Microsoft** as **MS** or **MSFT**.

   :::image type="content" source="../../../../assets/images/submission/validation-app-description-microsoft-abbreviated.png" alt-text="Example of abbreviated Microsoft in app description.":::

   :::image type="content" source="../../../../assets/images/submission/validation-app-description-microsoft-not-abbreviated.png" alt-text="Correct example of referring to Microsoft.":::

• Indicate the app is an offering from Microsoft by using slogans or taglines.  
   
   :::image type="content" source="../../../../assets/images/submission/validation-app-description-offering-from-microsoft.png" alt-text="Example of disallowed indication of Microsoft offering.":::

   :::image type="content" source="../../../../assets/images/submission/validation-app-description-no-offering-indication-from-microsoft.png" alt-text="Correct example avoiding Microsoft offering indication.":::

• Use language like **certified for** or **powered by** unless you are a certified Microsoft partner.  
• Include typos or grammatical errors.  
• Excessive capitalization is disallowed.  
• Avoid including links to AppSource.  
• Do not make unverified claims (e.g., best, top, ranked) without citing sources.  
• Avoid comparing your offer with competing offers.

For detailed guidance on crafting descriptions, see [checklist to write app descriptions](submission-checklist.md#write-descriptions).

</details>

### Screenshots

Screenshots are a visual preview that complement your app name, icon, and descriptions.

<br>
<details><summary>Expand to know more</summary>

Key points to note:

• You may have up to five screenshots, with a minimum of three.  
• Supported formats include PNG, JPEG, and GIF.  
• Recommended dimensions: 1366x768 pixels; maximum size: 1,024 KB.

**Dos:**

• Focus on demonstrating your app’s core functionalities (e.g., how a bot facilitates communication).  
• Ensure screenshots accurately represent your app content.  
• Use text sparingly but effectively.  
• Design screenshots with brand-consistent colors and marketing messaging.  
• Use high-resolution images that ensure clarity and readability. [*Must fix*]  
• At least one screenshot should depict your app functioning on mobile. [*Good-to-fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-guidelines-pass-app-functionality-mobile.png" alt-text="Screenshot showing mobile app functionality passed.":::

• Use realistic mockups that depict the app’s actual UI. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-guidelines-fail-suppliement-screenshot.png" alt-text="Screenshot showing supplementary content in screenshot (fail scenario).":::

   :::image type="content" source="../../../../assets/images/submission/validation-guidelines-fail-actual-UI.png" alt-text="Screenshot showing a failed example of capturing the app’s actual UI.":::

• Ensure screenshots demonstrate app integration with Teams. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-guidelines-fail-app-functionality.png" alt-text="Screenshot showing failed app functionality/integration scenario.":::

• Avoid incorrect abbreviations for Microsoft Teams (e.g., MS, MSFT). [*Must fix*]  
• If your app extends to Microsoft 365 clients, include screenshots demonstrating functionality on those platforms. [*Good-to-fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-guidelines-pass-app-functionality-MS-365.png" alt-text="Screenshot showing Teams app functionality in Microsoft 365 clients.":::

• Include captions within the screenshots for clarity. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-guidelines-pass-app-functionality.png" alt-text="Screenshot showing effective user guidance through captions.":::

• For apps supporting Tabs, screenshots must display the Teams chrome. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-guildelines-pass-tabs-capability.png" alt-text="Screenshot showing a tab capability with Teams chrome.":::

• If your app supports functionality within Microsoft Copilot, include relevant screenshots. [*Must fix*]

   :::image type="content" source="../../../../assets/images/Copilot/teams-app-in-copilot.png" alt-text="Screenshot showing app functionality within Copilot.":::

**Don'ts:**

• Do not use mockups that misrepresent your app’s UI, such as displaying the app outside of Teams.

   :::image type="content" source="../../../../assets/images/submission/validation-guidelines-fail-app-functionality-teams.png" alt-text="Screenshot showing an invalid external UI representation.":::

</details>

### Videos

Incorporating a video in your app listing is highly effective for communicating your app's value. Consider adding a YouTube or Vimeo video that showcases a demo or walkthrough. [*Good-to-fix*]

If you choose to include a video, meet the following criteria:

• The video should be brief and engaging with high production quality.  
• It must demonstrate app setup and usage clearly.  
• A narrative format is preferred.  
• For a value video, the duration should be 60-90 seconds; for a walkthrough, 3-5 minutes is recommended. [*Good-to-fix*]  
• Turn off ads on your YouTube or Vimeo video before submission. [*Must fix*]  
• The video must showcase integration within Teams. [*Must fix*]  
• The video link must be fully functional. [*Must fix*]  
• Video URLs should follow the appropriate format for YouTube (e.g., `https://www.youtube.com/watch?v=:id` or `https://youtu.be/:id`) or Vimeo (`https://vimeo.com/:id`).

   :::image type="content" source="../../../../assets/images/submission/video-app-listing-partner-center.png" alt-text="Screenshot showing an example of a video in the app listing in Partner Center.":::

• Optionally, the video can be featured in the first position of the carousel in the Teams Store, Admin Center, and AppSource pages. [*Good-to-fix*]  
• Ensure that the demo video is educational rather than promotional.

For more details on video criteria, see the [checklist to create a video](submission-checklist.md#create-a-video).

<br>

### Privacy policy

[*Must fix*]

The privacy policy may either be exclusive to your Teams app or your broader services portfolio.

Key requirements:

• If using a generic privacy policy, clearly reference the applicable services or platforms.  
• Describe how user data is stored, retained, and deleted, including security measures for protection.  
• Include valid contact information.  
• Do not use broken URLs, beta/staging links, AppSource links, or require authentication to access the policy.  
• Ensure the same privacy policy link is used in the app manifest and AppSource.

### Terms of use

[*Must fix*]

Guidelines for writing the Terms of Use:

• It must be unique and specific to your offering.  
• Host it on your own domain with a secure (HTTPS) URL.  
• It should be accessible without requiring authentication.  
• The same URL must be reflected in both the app manifest and AppSource.

### Support links

[*Must fix*]

Support URLs must be accessible without requiring user authentication.  
<details><summary>Expand to know more</summary>

• Your support URL should include clear contact details or a support ticket mechanism. For example, if hosted on GitHub, ensure it is under your control and contains appropriate contact details.

   :::image type="content" source="../../../../assets/images/submission/validation-supportlinks-authentication.png" alt-text="Example of support links requiring authentication (fail scenario).":::

</details>

### Localization

[*Must fix*]

• Include a localization file in your app package that conforms to the Teams localization schema so that the correct language displays based on the user’s Teams settings. See [Teams localization schema](~/concepts/build-and-test/apps-localization.md). [*Must fix*]  
• Ensure that app metadata content is identical in `en-us` and other localization languages. [*Must fix*]  
• Supported languages should be clearly listed in the AppSource description (e.g., “This app is available in X”). [*Must fix*]  
• If a user’s client language doesn’t match any additional languages provided, the default language from `localizationInfo` is used. [*Must fix*]  
• Update the `localizationInfo` property accordingly with the correct default language or add the necessary localized content for both the manifest and Partner Center descriptions. [*Must fix*]

---

## Apps linked to SaaS offer

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
This section follows [Microsoft commercial marketplace policy number 1140.5](/legal/marketplace/certification-policies?branch=pr-en-us-5673). If your Teams app is linked to a Software as a Service (SaaS) offer, adhere to these guidelines.

<br>
<details><summary>General</summary>

• ISVs must support the ability for multiple users (subscribers) in the same tenant to independently manage their subscriptions and assign licenses.  
• The offer must satisfy all [technical requirements](/microsoftteams/platform/concepts/deploy-and-publish/appsource/prepare/include-saas-offer) for Teams apps linked to a SaaS offer.  
• Teams apps linked to a SaaS offer must comply with all requirements specified in [1000 Software as a Service (SaaS)](/legal/marketplace/certification-policies#1000-software-as-a-service-saas).  
• The `subscriptionOffer` in the app manifest must correctly reflect the publisherId and offerId (e.g., for Contoso with publisher ID contoso1234 and offer ID offer01, use `contoso1234.offer01`).  
• Only live SaaS offers (not preview offers) are accepted for Teams Store approval.

</details>

</br>
<details><summary>Offer metadata</summary>

• Ensure that offer metadata is consistent across the app manifest, Teams app listing in AppSource, and the SaaS offer in AppSource.  
• Both the Teams app and the SaaS offer must be published by the same developer/publisher.  
• In Partner Center, mark **Additional purchases** as **Yes, my product requires purchase of a service or offers additional in-app purchases​**.  
• Plan descriptions and pricing details must clearly convey the offer so that users can fully understand it.  
• Any limitations, dependencies, or exceptions must be clearly explained in the plan descriptions.  
• Teams apps linked to SaaS offers typically support licenses on a named, per-user basis; if using a different model, this must be clearly noted.

</details>
</br>
<details><summary>SaaS offer home page and license management</summary>

• Provide clear instructions and an introductory guide on how subscribers can use your product.  
• Offer capabilities for subscribers to assign licenses.  
• Include various support options (FAQ, knowledge base, email) for any issues that arise.  
• Validate licenses to ensure that no duplicate assignments occur.  
• Notify users post license assignment and guide them on how to add the app to Teams as well as get started via Teams chat bot or email.
• If using [Microsoft license management](manage-third-party-apps-license.md), ensure that after subscription confirmation, users are redirected to the appropriate Microsoft license management interface in Teams.

</details>
</br>
<details><summary>Usability and functionality</summary>

After a successful purchase and license assignment, provide:

  * Access to subscription-specific features.
  * Clear value communication for the subscribed plan.  
  * Within your Teams app, include a link to the SaaS application homepage for ongoing license management.

</details>
</br>
<details><summary>Configure and test SaaS application</summary>

If the setup process is complex, include an end-to-end functional document covering:
  
  • Linked SaaS offer configuration steps.  
  • Instructions for license and user management.

> [!TIP]
> Consider adding a video demonstrating your app and its license management process to assist with testing.

</details>

[Back to top](#teams-store-validation-guidelines)

---

## Tabs

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
This section is aligned with [Microsoft commercial marketplace policy number 1140.4.2](/legal/marketplace/certification-policies#114042-tabs). If your app includes a tab, ensure that it meets these guidelines.

> [!TIP]
> For further insights into high-quality app experiences, consult [Teams tab design guidelines](~/tabs/design/tabs.md).

<br>
<details><summary>Setup</summary>

• Tab setup must never dead-end a new user; always provide guidance on completing required actions or workflows. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-tabs-setup-new-user.png" alt-text="Example of a tab with a dead-end during setup.":::

• Learners should not be forced to leave the Teams environment for configuration. Instead, the tab configuration screen must explain how to generate and input content (e.g., project selection in a project management app). [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-tabs-setup-profile-name.png" alt-text="Example of tab setup requiring profile name input.":::

• The configuration screen should be focused and not embed an entire website. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-tabs-setup-configuration-experience.png" alt-text="Example of a focused configuration experience in a tab.":::

    :::image type="content" source="../../../../assets/images/submission/validation-tabs-setup-configuration-screen.png" alt-text="Example of a complete tab configuration screen.":::

• If a URL is required during configuration, provide clear instructions on how to obtain or generate it. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-tab-configuration-way-forward-url-pass.png" alt-text="Tab configuration with clear guidance to generate a URL.":::
  
    :::image type="content" source="../../../../assets/images/submission/validation-tab-configuration-way-forward-url-fail.png" alt-text="Tab configuration without clear guidance for URL generation.":::

• Hyperlink support or contact information instead of using plain text to facilitate easier user assistance. [*Must fix*]

• For a smoother experience, consider including direct links (e.g., support URL or email) on the configuration screen. [*Good-to-fix*]

</details>
</br>
<details><summary>Views</summary>

• Use of large logos on the sign-in screen should be avoided. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-views-applogin.png" alt-text="Example of an app login screen with a large logo.":::

• Organize content by breaking complex information into multiple tabs if necessary.  

    :::image type="content" source="../../../../assets/images/submission/validation-views-multiple-tabs.png" alt-text="Example of a view split across multiple tabs.":::

• Avoid duplicate headers; do not re-display logos already visible in the Teams chrome. [*Good-to-fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-views-no-duplicate-header-logo.png" alt-text="Tab without duplicate header logos.":::

    :::image type="content" source="../../../../assets/images/submission/validation-views-duplicate-header-logo.png" alt-text="Tab with duplicate header logos (fail scenario).":::

</details>
</br>
<details><summary>Navigation</summary>

Guidelines for navigation within tabs:

• Tabs must not feature navigation elements that conflict with the primary Teams navigation. If including a left navigation, avoid designs that mimic the Teams navigation bar (e.g., only icons or collapsible rails with icon stacks). [*Must fix*]

   • Consider using basic or advanced Fluent UI components as outlined in [Teams basic UI components](~/concepts/design/design-teams-app-basic-ui-components.md) and [advanced UI components](~\concepts\design\design-teams-app-advanced-ui-components.md).

   :::image type="content" source="../../../../assets/images/submission/validation-navigation-static-tab.png" alt-text="Example of non-conflicting navigation in a tab.":::

   :::image type="content" source="../../../../assets/images/submission/validation-navigation-left-navigation.png" alt-text="Example of conflicting left navigation elements.":::

• If there is a toolbar on the left in the absence of navigation components, ensure it maintains at least 20 pixels spacing from Teams’ native left navigation. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-navigation-spacing-between-toolbar.png" alt-text="Proper spacing between toolbar and Teams navigation.":::

• Deeper navigation (secondary and tertiary pages) should be clearly differentiated via breadcrumbs, back buttons, page headers, or hamburger menus. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-improper-navigation-leveles.png" alt-text="Example showing multiple navigation levels in a dialog.":::

• Deep links provided in tabs must refer to content within Teams (e.g., dialogs or other tabs) rather than external webpages. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-navigation-view-button-not-linked-static-tab.png" alt-text="Example of a deep link that does not lead within Teams.":::

• Core workflows must not redirect users away from Teams; abnormal navigation should only be used for secondary tasks like raising support tickets. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-navigation-core-workflow-within-configuration.png" alt-text="Core workflow navigation within configuration.":::

    :::image type="content" source="../../../../assets/images/submission/validation-navigation-core-workflow-redirects-outside.png" alt-text="Core workflow redirecting outside Teams (fail scenario).":::

• Horizontal scrolling is not allowed in in-meeting tabs or dialogs. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-horizontal-scroll-allowed-scenarios.png" alt-text="Scenarios where horizontal scroll is allowed on mobile.":::

   :::image type="content" source="../../../../assets/images/submission/validation-horizontal-scroll-allowed-kanban.png" alt-text="Horizontal scroll example on a Kanban board.":::

   :::image type="content" source="../../../../assets/images/submission/validation-horizontal-scroll-list-view-components.png" alt-text="Horizontal scroll example in a list view with multiple components.":::

   :::image type="content" source="../../../../assets/images/submission/validation-horizontal-scroll-fixed-board.png" alt-text="Example of horizontal scroll in a board with fixed UI elements.":::

   :::image type="content" source="../../../../assets/images/submission/validation-horizontal-scroll-in-list-view.png" alt-text="Example of horizontal scroll in a list view.":::

• Always provide a way for the user to return to the previous work state (back button). [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/back-button-available.png" alt-text="Back button present.":::

   :::image type="content" source="../../../../assets/images/submission/no-back-button-available.png" alt-text="Example showing no back button (fail scenario).":::

• Ensure that Adaptive Cards used within tabs do not include horizontal scroll.
• In mobile views, bottom rail navigation should not conflict with Teams’ native navigation. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-tab-bottom-rail-conflicts-with-teams-mobile.png" alt-text="Tab bottom rail conflicting with Teams mobile navigation.":::

</details>
</br>
<details><summary>Usability</summary>

• Ensure content within the tab does not truncate or overlap. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-usability-content-truncation.png" alt-text="Example of content truncation issues in a tab.":::

• Provide functionality to allow users to undo their last action. [*Must fix*]
• For personal tabs, consider aggregating content from shared instances for enhanced collaboration. [*Good-to-fix*]
• Tabs should respond to Teams theme changes appropriately. [*Good-to-fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-usability-responsive-tabs.png" alt-text="Example of a tab that adapts to Teams themes.":::

    :::image type="content" source="../../../../assets/images/submission/validation-usability-unresponsive-tabs.png" alt-text="Example of a tab that does not adapt to Teams themes.":::

• Use Teams styled components (teams fonts, type ramps, color palettes, grid systems, etc.) whenever possible. [*Good-to-fix*]
• If your app requires personalization settings changes, include a dedicated **Settings** tab. [*Good-to-fix*]
• The app must be usable without broken functionality; any feature failures should be accompanied by a graceful error message. [*Must fix*]

</details>
<br/>
<details><summary>Scope selection</summary>

• The landing page of configurable tabs must not cater exclusively to individual personalized content (e.g., **My Tasks**, **My Dashboard**). [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-configurable-tab-content-personal-scope.png" alt-text="Example of personal-scope content in a configurable tab (fail scenario).":::

• After configuration, the landing page should present a collaborative view for the entire team. [*Must fix*]
• If a personal view is necessary, use filtered views or deep links that clearly separate the personal from the collaborative context. [*Must fix*]
• The landing page should display consistent content for all channel members. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-usability-configurable-tab-personal-info.png" alt-text="Example showing inconsistent personal content in a configurable tab (fail scenario).":::

• Configurable tabs must have focused and streamlined functionality. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-usability-configurable-nested-tabs.png" alt-text="Example of overly complex nested tabs (fail scenario).":::

</details>

<br/>

[Back to top](#teams-store-validation-guidelines)

---

## Bots

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
This section follows [Microsoft commercial marketplace policy number 1140.4.3](/legal/marketplace/certification-policies#114043-bots).

For further insights, refer to [Teams bot design guidelines](~/bots/design/bots.md).

<br>
<details><summary>Bot design guidelines</summary>

• Follow the [Teams bot design guidelines](../../../../bots/design/bots.md).  
• Implement dialogs instead of multi-turn conversations for repetitive tasks (e.g., collecting multiple pieces of info in sequence). [*Must fix*]  
• Fix any broken links, responses, or workflows immediately. [*Must fix*]

</details>

<br>
<details><summary>Bot commands</summary>

Bot commands streamline interactions and help guide users.

• Ensure that all bot commands, including generic ones like **Hi**, **Hello**, and **Help**, work correctly. [*Must fix*]
  
  :::image type="content" source="../../../../assets/images/submission/validation-bot-commands-generic-response-pass.png" alt-text="Example of a bot correctly responding to generic commands.":::

  :::image type="content" source="../../../../assets/images/submission/validation-bot-commands-generic-no-response.png" alt-text="Example of a bot failing to respond to a generic command.":::

• Commands must always provide a way forward rather than dead-ending the conversation. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-bot-commands-deadend.png" alt-text="Bot command leading to a dead-end scenario (fail case).":::

• List at least one valid command in the `items.commands.title` section of the manifest with coherent descriptions. [*Good-to-fix*]
• Bot responses must not include official Microsoft product images or avatars; always use your own assets. [*Must fix*]
• Avoid a continuous loading indicator after a command has been processed. [*Must fix*]
• Bot help command responses should remain within Teams (no external redirects) and use Adaptive Cards if needed. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-bot-redirects-user-outside-teams.png" alt-text="Example of a bot improperly redirecting users outside Teams.":::

• Bots must provide responses to irrelevant or invalid commands rather than errors or no response. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-bot-response-valid-improper-input.png" alt-text="Example of a valid response to improper input.":::

   :::image type="content" source="../../../../assets/images/submission/validation-bot-response-improper-response-invalid-command.png" alt-text="Example of an invalid response when an unrecognized command is received.":::

• Do not prefix bot commands with special characters such as a slash ("/"). [*Must fix*]
• Ensure that bot functionality matches the installed scope and offers user value. [*Must fix*]
• Prevent duplicate commands. [*Must fix*]
• Do not display a typing indicator after a response is given; only during processing is allowed. [*Must fix*]
• For help commands (in any casing), ensure the bot responds appropriately even if the user is not logged in. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-bot-valid-response-lowercase.png" alt-text="Example of bot responding correctly to a lowercase command.":::

   :::image type="content" source="../../../../assets/images/submission/validation-bot-valid-response-logged-app.png" alt-text="Example showing bot response when user isn’t logged on.":::

• Always provide a proper response to the **Help** command.

   :::image type="content" source="../../../../assets/images/submission/validation-bot-help-command.png" alt-text="Example of a bot help command response.":::

• Bot responses on mobile must be optimized so that text is not truncated and workflows can be completed efficiently. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-bot-response-no-truncate-mobile.png" alt-text="Bot response without truncation on mobile.":::

   :::image type="content" source="../../../../assets/images/submission/validation-bot-response-truncate-mobile.png" alt-text="Bot response with truncated text on mobile (fail case).":::

• Ensure that any links in bot response Adaptive Cards are functional and clearly notify users when navigating externally (e.g., displaying **View in...** or using a pop-out icon). [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-bot-action-button-redirect-warning.png" alt-text="Bot response action button with clear redirect indicator.":::

• If your bot is intended to be notification-only, set `isNotificationOnly` to true in the manifest. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-bot-command-isnotification-only-true.png" alt-text="Proper configuration for a notification-only bot.":::

  :::image type="content" source="../../../../assets/images/submission/validation-bot-command-isnotification-only-not-true.png" alt-text="Incorrect configuration for a notification-only bot.":::

• Bot experiences must be fully responsive on mobile platforms. [*Must fix*]

> [!TIP]
> For personal bots, consider including a dedicated **Help** tab to detail its capabilities.

</details>

<br>
<details><summary>Bot first run user experience</summary>

• In a personal scope, the bot must send a welcome message or provide prompt starters to initiate interaction. [*Must fix*]

   If using prompt starters, ensure:
   • At least one command highlights the app’s value proposition. [*Must fix*]
   • Prompt starters must function correctly with clear descriptions. [*Must fix*]
   • At least three unique prompt starters or commands should be available. [*Good-to-fix*]

   If sending a welcome message, consider:
   • For complex configuration flows, include detailed configuration guidance. For simple flows, use the welcome message sparingly but effectively.
   • Ensure the welcome message is engaging and delivered via an Adaptive Card with appropriate buttons if possible.

     :::image type="content" source="../../../../assets/images/submission/validation-bot-welcome-message.png" alt-text="Bot welcome message with clear configuration guidance.":::

     :::image type="content" source="../../../../assets/images/submission/validation-bot-no-welcome-message.png" alt-text="Bot without a welcome message in a complex flow.":::

• In channel or group chat scopes, welcome messages should not be sent individually to each user (to avoid spam); mention the person who added the bot instead. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-bot-welcome-message-not-triggered.png" alt-text="Example of no individual welcome message in a channel.":::

   :::image type="content" source="../../../../assets/images/submission/validation-bot-welcome-message-triggered.png" alt-text="Example of appropriate welcome message in a channel.":::

• Welcome messages must always include details about the bot’s value, configuration steps, and supported commands. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-welcome-message-no-way-forward.png" alt-text="Welcome message without a clear next step (fail case).":::

   :::image type="content" source="../../../../assets/images/submission/validation-welcome-message-clear-way-forward.png" alt-text="Welcome message with clear guidance.":::

• Bots installed in channels or group chats should not send proactive welcome messages individually. [*Must fix*]
• Do not allow users to initiate individual workflows from bots installed in group contexts; these should be managed via 1:1 chat. [*Must fix*]
• Ensure the welcome message clearly highlights any limitations associated with the bot’s usage in that scope. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-bot-welcome-messahe-with-app-limitation.png" alt-text="Welcome message highlighting app limitations.":::

   :::image type="content" source="../../../../assets/images/submission/validation-bot-welcome-messahe-without-app-limitation.png" alt-text="Welcome message missing app limitation details (fail case).":::

• The welcome message in a personal context should trigger automatically once on install; it should not reappear with every help command. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-bot-no-welcome-message-in-personal-scope.png" alt-text="Example showing a missing welcome message in personal scope (fail case).":::

• Do not trigger welcome messages for every command—this is considered spam. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-welcome-message-trigger-for-any-command.png" alt-text="Example of repeated welcome messages for every command (fail scenario).":::

• The welcome message’s content must align with the app’s long description and installation scope, including the correct app name from the manifest. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-app-name-mismatch-manifeast-and-welcome-message.png" alt-text="Mismatch between app name in manifest and welcome message (fail case).":::

• Do not display competitor chat platform names in the welcome message unless specific interoperability is provided.
• The welcome message must not direct users to another Teams app or include marketplace links. [*Must fix*]

• For complex configuration flows, if admin installation is required, send a proactive welcome message in a group context only after the configuration is complete. [*Must fix*]

• Ensure that the welcome message is triggered only once upon installation. [*Must fix*]

</details>

<br>
<details><summary><a id="botmessagespamming">Bot message spamming</a></summary>

Avoid spamming users with excessive messages:

• In channels and chats, post messages as a single thread rather than as multiple separate posts. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-bot-message-spamming-one-message.png" alt-text="Single consolidated message from a bot.":::

    :::image type="content" source="../../../../assets/images/submission/validation-bot-message-spamming-multiple-messages.png" alt-text="Multiple messages causing spam (fail scenario).":::

• In personal contexts:
  - Do not send rapid, successive messages. [*Must fix*]
  - Prefer one comprehensive message over several quick messages. [*Must fix*]
  - Avoid multi-turn conversations for a single repetitive task—use a form or dialog instead. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-bot-messages-multiple-message-quick-succession.png" alt-text="Bot sending messages in quick succession (fail case).":::

  - For engaging multi-turn conversations driven by NLP, ensure they are logically segmented and purposeful.

    :::image type="content" source="../../../../assets/images/submission/validation-bot-messages-using-task-module.png" alt-text="Bot using a task module for structured conversation.":::

    :::image type="content" source="../../../../assets/images/submission/validation-bot-messages-using-mutliple-conversation.png" alt-text="Example of multi-turn conversation used effectively.":::

• Do not repeat the same welcome message on a regular basis, particularly when new members join—send to the new user individually. [*Must fix*]

   :::image type="icon" source="../../../../assets/images/submission/validation-bot-send-proactive-message-to-all-members.png" alt-text="Example of spam due to proactive messaging to all members.":::

</details>
</br>
<details><summary>Bot notifications</summary>

Bot notifications must be relevant to the defined scope.
  
• Ensure the notification content is pertinent and does not block user workflows. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-bot-notifications-relevant.png" alt-text="Relevant bot notification example.":::

   :::image type="content" source="../../../../assets/images/submission/validation-bot-notifications-not-relevant.png" alt-text="Irrelevant bot notification example (fail scenario).":::

</details>
</br>
<details><summary>Bots and Adaptive Cards</summary>

Adaptive Cards are recommended for bot messages. They should be lightweight and include no more than six actions; use dialogs for extensive content.

For further details, see:
• [Designing Adaptive Cards](~/task-modules-and-cards/cards/design-effective-cards.md)  
• [Cards reference](~/task-modules-and-cards/cards/cards-reference.md#types-of-cards)

Ensure that bot experiences are fully responsive on mobile, and that failure scenarios are handled gracefully.

</details>
</br>
<details><summary>Notification only bots</summary>

Apps with notification only bots must add value by sending notifications based on key triggers, like workflow completions or alerts.

> [!TIP]
> Always include preview details and inline user options in notification cards so that users are not forced to navigate outside Teams.

</details>
<br/>
<details><summary>Bot metadata information</summary>

• All bot metadata in the app manifest (name, logo, privacy policy, terms link) must match the Bot Framework metadata. [*Must fix*]  
• The Bot ID in the manifest must match the Bot ID of the last published Teams Store version—changing it will reset user interaction history. [*Must fix*]  
• Update metadata consistently with app name changes, welcome messages, or bot responses. [*Must fix*]  
• Ensure the app name appears consistently in both bot messages and the manifest. [*Must fix*]

</details>
<br/>
<details><summary>Bot in collaborative scope</summary>

• Bots installed in channels or group chats must add value in that scope and not simply serve as tools for collecting rosters or sending messages to users individually. [*Must fix*]

</details>

[Back to top](#teams-store-validation-guidelines)

---

## Message extensions

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
This section is in accordance with [Microsoft commercial marketplace policy number 1140.4.4](/legal/marketplace/certification-policies#114044-messaging-extensions).

For additional details, see the [Teams message extension design guidelines](~/messaging-extensions/design/messaging-extension-design.md).

<br/>

<details><summary>Messaging extensions design guidelines</summary>

• Follow the [Messaging extension design guidelines](../../../../messaging-extensions/design/messaging-extension-design.md).  
   :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-design-guidelines-fail.png" alt-text="Example of a messaging extension that fails design guidelines.":::

• These extensions are shortcuts for inserting or acting on content without leaving conversation threads. Keep them simple and focused—do not embed a full website. [*Must fix*]

• Ensure that preview images in Adaptive Cards load correctly. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-preview-image-adaptive-card-loading.png" alt-text="Adaptive Card preview image loads correctly.":::

  :::image type="content" source="../../../../assets/images/submission/validation-preview-image-adaptive-card-not-loading.png" alt-text="Adaptive Card preview image fails to load (fail case).":::

• The response card for messaging extensions must include the app icon to avoid confusion. [*Must fix*]

• All functionality must be operational to avoid dead-ends or blocking workflows. [*Must fix*]

• Messaging extensions should work seamlessly in both group chat and channel contexts. [*Must fix*]

• Include options for user sign in/sign out within the messaging extension. [*Must fix*]

• For OpenAPI based messaging extensions, ensure no redirection occurs on API calls; calls must originate from the publisher-controlled domain.

</details>
</br>
<details><summary>Action commands for Action-based message extensions</summary>

Action-based messaging extensions need to:

• Enable users to trigger actions on a message without unnecessary intermediate steps like additional sign in.  
   
    :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-no-intermediate-step.png" alt-text="Messaging extension without extra steps.":::

    :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-intermediate-step-available.png" alt-text="Messaging extension with unnecessary intermediate steps (fail case).":::

• Pass the original message context to the next workflow state. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-app-passes-message.png" alt-text="Messaging extension successfully passes message context.":::

    :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-app-doesnot-pass-message.png" alt-text="Messaging extension failing to pass message context.":::

• Where possible, incorporate the host app’s name into action commands instead of generic verbs (e.g., **Start a Skype Meeting** rather than **Start Meeting**). [*Good-to-fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-action-command-host-name.png" alt-text="Action command using host app name.":::

    :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-action-command-verb.png" alt-text="Action command using generic verb (fail case).":::

• Ensure that invoking a message action consistently allows users to complete the intended workflow—avoid errors or indefinite loading. [*Must fix*]
• Prevent duplication of action commands. [*Must fix*]
• For action-based extensions that only perform actions, submit a final end state that:
  * Posts a relevant notification in the context it was invoked or in a 1:1 chat, and  
  * Allows users to share the resulting card with others so that silent actions are not misinterpreted. [*Must fix*]

</details>
</br>
<details><summary>Preview links (link unfurling)</summary>

[*Must fix*]

• If the app sets `supportsAnonymizedPayloads` and the user has not installed the app, the link should unfurl and prompt the add app dialog after selection. [*Must fix*]
• Ensure that links preview only domains under your control, not using wildcards or top-level domains like `*.com` or `*.org`. [*Must fix*]
• Declare only domains that you own in the `messageHandler` section of the manifest; do not include references like `*.botframework.com.` [*Must fix*]

</details>
</br>
<details><summary>Search commands</summary>

• The messaging extension for search must provide helpful text for effective searches. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-search-commands-text-available.png" alt-text="Messaging extension with clear search help text.":::

    :::image type="content" source="../../../../assets/images/submission/validation-search-commands-text-not-available.png" alt-text="Messaging extension lacking search help text (fail case).":::

• Ensure that @mention based executable commands are clear and easy to comprehend.

    :::image type="content" source="../../../../assets/images/submission/validation-search-command-unclear-executable.png" alt-text="Unclear @mention command example (fail case).":::

</details>

[Back to top](#teams-store-validation-guidelines)

---

## Dialogs

[*Must fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
This section adheres to [Microsoft commercial marketplace policy number 1140.4.5](/legal/marketplace/certification-policies#114045-task-modules).

<details><summary>Expand to know more</summary>

A dialog (referred to as a task module in TeamsJS v1.x) must display the app’s icon and short name, and should only show the components necessary to complete a specific action—not an entire app interface.

For more guidance, see [Teams dialog design guidelines](~\task-modules-and-cards\task-modules\design-teams-task-modules.md).

:::image type="content" source="../../../../assets/images/submission/validation-task-module-displays-components.png" alt-text="Task module displaying only required components.":::

:::image type="content" source="../../../../assets/images/submission/validation-task-module-embeds-app.png" alt-text="Task module incorrectly embedding the entire app (fail case).":::

> [!TIP]
> For further reference, see the [Teams task module design guidelines](~/task-modules-and-cards/task-modules/design-teams-task-modules.md).

</details>

[Back to top](#teams-store-validation-guidelines)

---

## Meeting extensions

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
This section complies with [Microsoft commercial marketplace policy number 1140.4.6](/legal/marketplace/certification-policies#114046-meeting-extensions).

> [!TIP]
> For detailed design guidance, refer to the [Teams meeting extension design guidelines](~/apps-in-teams-meetings/design/designing-apps-in-meetings.md).

<br>
<details><summary>Meeting extension design guidelines</summary>

• Ensure your Teams app provides a responsive in-meeting experience aligned with Teams’ look and feel. [*Must fix*]  
  • Pre-meeting experience should allow users to discover and add meeting apps, potentially including tasks like creating polls.  
  • Post-meeting experience should facilitate displaying results like poll outcomes or feedback.
  • In-meeting experience must engage participants without forcing them outside of the Teams environment.

   :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-outside-teams-core-workflows.png" alt-text="Example showing inappropriate redirection outside Teams in a meeting (fail case).":::

• The app must offer significant value beyond custom Together Mode scenes. [*Must fix*]
• Declare `groupChat` as a scope under `configurableTabs` and set context properties (e.g., `meetingDetailsTab`, `meetingChatTab`, and `meetingSidePanel`) in the manifest to ensure compatibility on Teams mobile. [*Must fix*]
• Meeting canvases should provide graceful failure messages for unsupported regions or other limitations. [*Must fix*]
• Ensure the meeting canvas header accurately displays your app name. [*Must fix*]
• Include a clear sign out or logout option in the meeting extension. [*Must fix*]
• Meeting tabs on mobile must include all relevant workflows without blank pages. [*Must fix*]
• The meeting stage (shared canvas) must not embed an entire website and should support focused participation. [*Must fix*]
• Avoid continuous loading screens or error states that block meeting workflows. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-app-shows-continous-loading-screen.png" alt-text="Example of a problematic continuous loading screen.":::

• Do not launch new Teams instances when starting meetings; always continue within the active instance. [*Must fix*]
• Ensure meeting apps support in-meeting workflows without redirecting to competitor platforms. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-apps-redirecting-competitor-chat-platform.png" alt-text="Example of an app incorrectly redirecting to a competitor chat platform.":::

• If role-based views are applied, include messaging that informs participants of limited functionality and guidance on accessing meeting notes or agendas. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-way-forward-not-available-for-role-based-views.png" alt-text="Example of inadequate guidance in role-based views (fail case).":::

</details>

<br/>
<details><summary>Pre- and post-meeting experience</summary>

• Pre- and post-meeting screens must adhere to standard tab design guidelines ([Teams design guidelines](~/tabs/design/tabs.md)). [*Must fix*]  
• For example, if displaying content such as numerous polls, organize the layout clearly (see [example layout](~/apps-in-teams-meetings/design/designing-apps-in-meetings.md#after-a-meeting)). [*Must fix*]  
• Confirm to users that survey or poll results have been successfully downloaded with clear messaging. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-meeting-experience-tab-design-guidelines-fail.png" alt-text="Example of non-compliant pre/post meeting screen design.":::

</details>

<br/>
<details><summary>In-meeting experience</summary>

• Use a dark theme during meetings. [*Must fix*] (Refer to [Teams design guidelines](~/apps-in-teams-meetings/design/designing-apps-in-meetings.md#theming) for details.)  
• A tooltip displaying the app name must appear when hovering over its icon. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-exp-display-app-name.png" alt-text="In-meeting experience with app name tooltip.":::

• Messaging extensions should function identically during meetings as they do outside.

</details>

<br/>
<details><summary>In-meeting tabs</summary>

• Must be fully responsive, maintaining proper padding and component sizing. [*Must fix*]  
• Provide a back button if multiple navigation layers exist. [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-exp-back-button.png" alt-text="Back button present in an in-meeting tab.":::

    :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-exp-back-button-absent.png" alt-text="Back button missing in an in-meeting tab (fail case).":::

• Do not display multiple close buttons; rely on the native Teams header dismiss button. [*Must fix*]  
• Horizontal scrolling must be eliminated. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-tab-vertical-scroll.png" alt-text="Example of vertical scroll in a meeting tab.":::

   :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-tab-horizontal-scroll.png" alt-text="Example of horizontal scroll in a meeting tab (fail case).":::

</details>

<br/>
<details><summary>In-meeting dialogs</summary>

• Use dialogs (or task modules) sparingly for light, task-oriented scenarios. [*Must fix*]  
• Display content in a single column without deep navigation layers. [*Must fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-single-column-layout.png" alt-text="Example of an in-meeting dialog with single column layout.":::

  :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-multiple-column-layout.png" alt-text="Example of an in-meeting dialog with multiple column layout (fail case).":::

• Ensure that dialogs are centered on the meeting stage. [*Must fix*]  
• Automatically dismiss the dialog after an action is performed. [*Must fix*]

• For Together Mode scenes, ensure that:
  * All images are in .png format.  
  * The combined scene resolution does not exceed 1920x1080 (with even number resolution).  
  * The overall scene size is below 10 MB and individual images are below 5 MB.  
  * Mark overlapping images as **Transparent** as needed in the image selection panel.

</details>

<br/>
<details><summary>Shared Meeting Stage</summary>

To use the **shareAppContentToStage** API:

• Declare the proper RSC permissions in the manifest by configuring the `authorization` property. Set `name` as `MeetingStage.Write.Chat` and `type` as `Delegated` in the `resourceSpecific` field. [*Must fix*]  
• Note that shared meeting stage features can only be launched on the Teams desktop app but must render appropriately on mobile devices. [*Must fix*]

</details>

[Back to top](#teams-store-validation-guidelines)

---

## Connector

1. The connector name must exactly match the app name as shown within the app and in the manifest.

   :::image type="content" source="../../../../assets/images/submission/connector-mismatch-app-name.png" alt-text="Screenshot showing mismatch between app name and connector name (fail case).":::

2. The connector must be error-free during configuration.

   :::image type="content" source="../../../../assets/images/submission/connector-error-configuring.png" alt-text="Screenshot showing an error encountered while configuring the connector.":::

---

## Notifications

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
This section follows [Microsoft commercial marketplace policy number 1140.4.7](/legal/marketplace/certification-policies#114047-notification-apis).

For apps using the [activity feed APIs provided by Microsoft Graph](/graph/teams-send-activityfeednotifications), adhere to these guidelines.

> [!TIP]
> For apps that trigger notifications after long intervals (e.g., after one day or one month), please ensure you test and trigger such notifications in the background before submission.

<br>
<details><summary>Notification design guidelines</summary>

• Follow the [activity feed notifications design guidelines](/graph/teams-send-activityfeednotifications).  
• Ensure that the notification, when selected, does not lead to dead-ends or broken workflows; users must complete the intended task. [*Must fix*]  
• Include your app’s name in the notification to clarify its origin. [*Must fix*]  
• Trigger notifications as described in your app’s long description, first-run experience, and in the manifest’s `activityTypes` property. [*Must fix*]  
• Notifications should appear within five seconds of a user action. [*Must fix*]  
• If there are any limitations to notifications, clearly state these limitations in the long description or during the initial app use. [*Must fix*]

</details>
<br/>
<details><summary>General</summary>

• All notification triggers specified in your configuration must be operational. [*Must fix*]  
• Notifications must be localized according to the supported languages for your app on all platforms. [*Must fix*]  
• Ensure that notifications consistently appear within five seconds after the triggering action. [*Must fix*]

</details>
<br/>
<details><summary>Avatars</summary>

• The avatar displayed in notifications must correspond to your app’s color icon. [*Must fix*]  
• For notifications triggered by a user action, include the user’s avatar. [*Must fix*]

</details>
<br/>
<details><summary>Spamming</summary>

• Do not send more than 10 notifications per minute to a user. [*Must fix*]  
• Bots or activity feed triggers must not generate duplicate notifications. [*Must fix*]  
• Notifications must always provide user value and not be used for trivial events. [*Must fix*]

</details>
<br/>
<details><summary>Navigation and layout</summary>

• Ensure that notifications adhere to the Teams activity feed layout and experience. [*Must fix*]  
• Upon selecting a notification, users should be directed to relevant content within Teams. [*Must fix*]

</details>

[Back to top](#teams-store-validation-guidelines)

---

## Microsoft Graph connector

It is recommended to publish your Graph connector through the [Graph connector gallery](/microsoftsearch/connectors-gallery). Do not include it within your manifest.json file. Guidelines for the declarative agent file can be found [here](review-copilot-validation-guidelines.md).

***Example***

Do not include a Graph connector node in the manifest file.

:::image type="content" source="../../../../assets/images/Copilot/da-graph-connector.png" alt-text="Screenshot showing a Graph connector node in the manifest file.":::

[Back to top](#teams-store-validation-guidelines)

---

## Microsoft 365 App Compliance Program

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
This section is in line with [Microsoft commercial marketplace policy number 1140.6](/legal/marketplace/certification-policies#11406-publisher-attestation).

The Microsoft 365 App Compliance Program helps organizations assess the security and compliance of your app. When publishing to the Teams Store, you must complete the following tiers:

* **Publisher Verification**: Demonstrate the authenticity of your organization. Once completed, a blue **verified** badge appears on the Microsoft Entra consent dialog and related screens. For more information, see [Mark your app as publisher verified](/azure/active-directory/develop/mark-app-as-publisher-verified). [*Must fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-365-compliance-publisher-verification.png" alt-text="Example showing a blue verified badge on the Microsoft Entra consent dialog.":::

* **Publisher Attestation**: Provide general, data handling, and security information to help potential customers make informed decisions. [*Good-to-fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
For an app that is not yet listed, you cannot complete Publisher Attestation until it is live in the Teams Store. For updates to existing apps, complete [Publisher Attestation](/microsoft-365-app-certification/docs/attestation) before submitting the new version.

</details>

[Back to top](#teams-store-validation-guidelines)

---

## Advertising

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png":::  
This section is guided by [Microsoft commercial marketplace policy number 1140.7](/legal/marketplace/certification-policies#11407-advertising).

• Your app must not display any form of advertising, including dynamic ads, banner ads, or ads within messages. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-advertising-banners.png" alt-text="Example showing disallowed advertising banners in Teams.":::

[Back to top](#teams-store-validation-guidelines)

---

## Cryptocurrency based apps

Your app must demonstrate adherence to all local laws if it:

* Facilitates cryptocurrency transactions or transmissions within the app.  
* Promotes cryptocurrency-related content.  
* Enables users to store or access cryptocurrency.  
* Encourages cryptocurrency transactions outside the Teams platform.  
* Facilitates cryptocurrency mining.  
* Supports participation in Initial Coin Offerings.  
* Offers cryptocurrency tokens as rewards or incentives.

After an internal review, if compliance is met, Microsoft may certify your app. Otherwise, you will be informed that certification cannot proceed. [*Must fix*]

[Back to top](#teams-store-validation-guidelines)

---

## App functionality

• All workflows and content must be tightly related to the declared scope. [*Must fix*]  
• Every capability must be fully functional as described in your manifest and long description. [*Must fix*]  
• Users must be notified before any file or executable is downloaded. [*Must fix*]  
• For region-dependent functionality, display a graceful failure message if accessed from an unsupported region. [*Must fix*]

[Back to top](#teams-store-validation-guidelines)

---

## Mobile experience

• Mobile add-ins must be free; under no circumstances should there be in-app prompts for payment or upselling external offers. [*Must fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-mobile-add-in-charges.png" alt-text="Example of a mobile add-in requesting payment (fail case).":::

• Use of words like **FREE**, **FREE TRIAL**, or **TRY FREE** is acceptable on desktop or web experiences without restrictions.  
• On mobile, the use of **FREE** as plain text for trials or upgrades is allowed provided there is no link or pricing details that contradict the free experience.  
• Do not display pricing details—via images, text, or links—on mobile. Call-to-action elements like **view plans** are also not permitted. [*Must fix*]
  
   :::image type="content" source="../../../../assets/images/submission/validation-mobile-exp-pricing-details-on-mobile-fail.png" alt-text="Example showing pricing details on a mobile app (fail case).":::

• Payment processing for physical goods is permitted on mobile; however, digital goods may not be paid for through mobile apps. [*Must fix*]
• Ensure a seamless cross-device mobile experience for Teams apps. [*Must fix*]
• If certain capabilities are unsupported on mobile, provide a graceful failure message rather than a dead-end experience. [*Must fix*]

[Back to top](#teams-store-validation-guidelines)

---

## Apps extended across Microsoft 365 clients

### General

• For apps intended to extend Teams functionality across Microsoft 365 clients, use manifest schema version 1.13 or later.  
• The support URL should contain content relevant for an app integrated across various Microsoft 365 clients, not exclusively for a single client.  
• Clearly mention the integration and support for Microsoft 365 clients in your app description.

### Compatibility

Teams apps extended across Microsoft 365 clients must work seamlessly on the latest versions of:
• Microsoft Edge  
• Google Chrome

Additionally, users should be able to access personal tabs or message extensions in:
• Outlook for Windows and web  
• Microsoft 365 on desktop, web, and Android  
• Microsoft Teams on desktop, web, Android, and iOS

### Mobile experience

• Users must be able to launch the app from the actions flyout menu within the Microsoft 365 client on mobile; ensure that the app name is properly displayed in the action bar. [*Must fix*]

#### App launch from actions flyout

• The app must successfully launch and allow switching between multiple static tabs on mobile. If more than three static tabs are used, the remaining ones should be accessible under a **More** section. [*Must fix*]

#### Multi tab experience

• If your app supports SSO, ensure smooth authentication to enable single credentials across multiple systems. [*Must fix*]

#### App authentication

• The app must terminate the user session when the account is switched or logged out on the Microsoft 365 client on mobile. [*Must fix*]

#### Account switching and logout experience

• Users must be able to navigate back to previous work states; if on the root page, back navigation should close the app instance within the Microsoft 365 client on mobile. [*Must fix*]  
• Apps supporting deep links for workflows must correctly redirect users to the corresponding landing page. [*Must fix*]

#### Tab navigation

• A progress indicator should display during app loading and automatically dismiss upon completion. [*Must fix*]  
• Display an error screen if the app fails to load (e.g., due to network issues or timeout). [*Must fix*]

[Back to top](#teams-store-validation-guidelines)

---

## Teams apps extensible as agents for Microsoft 365 Copilot

• App packages must be correctly formatted and employ manifest schema version 1.13 or later.  
• The app must pass responsible AI checks as defined in [the applicable policies](/legal/marketplace/certification-policies#1-apps-with-artificial-intelligenceai-generated-content-must-meet-below-requirements).  
• Your app must meet the agent compatibility criteria outlined in [copilot validation guidelines](review-copilot-validation-guidelines.md).

### Agent must not manipulate LLM behavior

When defining the short descriptions, parameters, and commands for your agent, do not include:

1. Instructional phrases such as "if the user says X, ignore", "delete", "reset", etc.
2. Verbose, flowery, or overtly marketing language.
3. Superlative claims like **#1**, **amazing**, or **best**.
4. URLs, emojis, or hidden characters (e.g., hexadecimal, binary, unconventional symbols).
5. Grammar or punctuation mistakes.

### User Awareness

The long description must explicitly state:

• App compatibility with Microsoft 365 Copilot (e.g., “Use Contoso in Microsoft 365 Copilot to search and summarize your tasks.”).  
• Provide at least one prompt example of how users can utilize the message extension agent in Microsoft 365 Copilot (e.g., “What are the high priority tickets assigned to me this week in Contoso?”).

   :::image type="content" source="../../../../assets/images/Copilot/validation-guidelines-plugin-prompt-pass.png" alt-text="Example of a correct prompt for Copilot usage (pass scenario).":::

   :::image type="content" source="../../../../assets/images/Copilot/validation-guidelines-plugin-prompt-fail.png" alt-text="Example missing a prompt for Copilot usage (fail scenario).":::

### Response Quality

• Mandatory fields in the Microsoft 365 Copilot Adaptive Card response must include an Information Title and at least two additional informative fields (e.g., date modified, author, status, flags). Both preview and content should be contained in a single response.

   :::image type="content" source="../../../../assets/images/Copilot/validation-guidelines-app-response-copilot.png" alt-text="Example of a well-structured Copilot response with preview and content.":::

• Ensure that the Adaptive Card includes at least one actionable button, and that it is fully functional.  
• Microsoft 365 Copilot must provide correct responses without errors for single parameters, multiple parameters, or follow-up queries.  
• The message extension must require at least two parameters to optimize user experience.

[Back to top](#teams-store-validation-guidelines)

---

## Next step

> [!div class="nextstepaction"]
> [Create a Partner Center account](~/concepts/deploy-and-publish/appsource/prepare/create-partner-center-dev-account.md)

---

## See also

• [Test and debug your app](~/concepts/build-and-test/debug.md)  
• [Prepare your Teams Store submission](~/concepts/deploy-and-publish/appsource/prepare/submission-checklist.md)  
• [Include a SaaS offer with your Teams app](include-saas-offer.md)  
• [Strategize and execute growth for your app](../post-publish/app-growth/overview-app-growth.md)  
• [Validate your app in Developer Portal for Teams](../../../build-and-test/manage-your-apps-in-developer-portal.md#publish)