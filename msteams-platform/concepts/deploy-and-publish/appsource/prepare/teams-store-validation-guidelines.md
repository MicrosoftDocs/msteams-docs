---
title: Microsoft Teams store validation guidelines
description: Know how to increase the chances of your app to pass the Microsoft Teams store submission process. Understand the mandatory and suggested fixes. Explore the validation guidelines. 
author: heath-hamilton
ms.author: surbhigupta
ms.topic: reference
ms.localizationpriority: high
---
# Microsoft Teams store validation guidelines

Following these guidelines increases the chances of your app to pass the Microsoft Teams store submission process. The Teams-specific guidelines complement the Microsoft [commercial marketplace certification policies](/legal/marketplace/certification-policies#1140-teams) and are updated frequently to reflect new capabilities, user feedback, and business rule changes.

> [!NOTE]
>
> * Some guidelines may not be applicable to your app. For example, if your app doesn't include a bot, you can ignore bot-related guidelines.
> * We've cross-referenced these guidelines to the Microsoft commercial certification policies and added Do’s and Don’ts with examples from pass or fail scenarios encountered in our validation process.
> * Certain guidelines are marked as *Mandatory Fix*. If your app submission doesn't meet these mandatory guidelines, you'll receive a failure report from us with steps to mitigate. Your app submission will pass Microsoft Teams store validation only after you have fixed the issues.
> * Other guidelines are marked as *Suggested Fix*. For an ideal user experience, we suggest that you fix the issues, however, your app submission will not be blocked from publishing on the Teams store, if you choose not to fix the issues.

:::row:::
   :::column:::
      :::image type="icon" source="../../../../assets/icons/value-proposition.png" link="#value-proposition" border="false":::
   :::column-end:::
   :::column span="":::
     :::image type="icon" source="../../../../assets/icons/security.png" link="#security" border="false":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/function.png" link="#general-functionality-and-performance" border="false":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/package.png" link="#app-package-and-store-listing" border="false":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/saas-offer.PNG" link="#apps-linked-to-saas-offer" border="false":::
   :::column-end:::
:::row-end:::

:::row:::
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
      :::image type="icon" source="../../../../assets/icons/task-module.png" link="#task-modules" border="false":::
   :::column-end:::
     :::column span="":::
      :::image type="icon" source="../../../../assets/icons/meeting.png" link="#meeting-extensions" border="false":::
   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/notifications.png" link="#notifications" border="false":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/microsoft-365.png" link="#microsoft-365-app-compliance-program" border="false":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/advertising.png" link="#advertising" border="false":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/crypto-currency-based-apps-icon.png" link="#cryptocurrency-based-apps" border="false":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/app-functionality-icon.png" link="#app-functionality" border="false":::
   :::column-end:::
:::row-end:::
:::row:::
   :::column span="":::
      :::image type="icon" source="../../../../assets/icons/mobile-experience-icon.png" link="#mobile-experience" border="false":::
   :::column-end:::
:::row-end:::

[Back to top](#microsoft-teams-store-validation-guidelines)

## Value proposition

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: This section is in line with [Microsoft commercial certification policy number 1140.1](/legal/marketplace/certification-policies#11401-value-proposition-and-offer-requirements) and provides additional guidance to developers of Microsoft Teams apps on their offer’s value proposition.

[Back to top](#microsoft-teams-store-validation-guidelines)

### App Name

[*Mandatory Fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: This section is in line with Microsoft [commercial certification policy number 1140.1.1](/legal/marketplace/certification-policies#114011-app-name) and provides additional guidance to developers on naming their apps.
<br></br>
<details><summary>Expand to know more</summary>

An app's name plays a critical role in how users discover it in the store. Use the following guidelines to name an app:

* The name must include terms relevant to your users. [*Mandatory Fix*]
* Prefix or suffix common nouns with the developer's name. For example, **Contoso Tasks** instead of **Tasks**. [*Mandatory Fix*]
* Must not use **Teams** or other Microsoft product names such as Excel, PowerPoint, Word, OneDrive, SharePoint, OneNote, Azure, Surface, and Xbox that could falsely indicate co-branding or co-selling. For more information about referencing Microsoft software products and services, see [Microsoft Trademark and Brand Guidelines](https://www.microsoft.com/legal/intellectualproperty/trademarks/usage/general). [*Mandatory Fix*]
* Must not copy the name of an app listed in the store or other offer in the commercial marketplace. [*Mandatory Fix*]
* Must not contain profane or derogatory terms. The name also mustn't include racially or culturally insensitive language. [*Mandatory Fix*]
* Must be unique. If your app (Contoso) is listed in the Microsoft Teams store and Microsoft AppSource and you want to list another app specific to a geography such as Contoso Mexico, your submission must meet the following criteria:
  * Call out the app's region-specific functionality in the title, metadata, first response app experience, and help sections. For example, title must be Contoso Mexico. App title must clearly differentiate an existing app from the same developer to avoid end-user confusion. [*Mandatory Fix*]
  * When uploading the app package in Partner Center, select the right **Markets** where the app will be available in the **Availability** section. [*Mandatory Fix*]

* App name mustn't lead with a core Teams feature such as Chat, Contacts, Calendar, Calls, Files, Activity, Teams, and Help. The app name doesn't shortens to either Chat, Contacts, Calendar, Calls, Files, Activity, Teams, and Help on install in the left navigation. [*Mandatory Fix*]

* If your app is part of an official partnership with Microsoft, the name of your app must come first. For example, **Contoso connector for Microsoft Teams**.

* The app name mustn't have any reference to Microsoft or Microsoft products. Don’t use **Teams** or **Microsoft**, in the app name unless your app is in official partnership with Microsoft. In such an instance, the app name must come first before any reference to Microsoft. For example, **Contoso connector for Microsoft Teams**. [*Mandatory Fix*]

* Don’t use parenthesis in naming to include Microsoft products. [*Mandatory Fix*]

* Developer name must be the same in the manifest and AppSource. [*Mandatory Fix*]

* App manifests submitted must be production manifests. Accordingly, app name mustn't indicate that the app is a preproduction app. For example, app name mustn't contain words such as Beta, Dev, Preview, and UAT. [*Mandatory Fix*]

[Back to top](#microsoft-teams-store-validation-guidelines)

 > [!TIP]
 > Your app’s branding on the Microsoft Teams store and AppSource including your app name, developer name, app icon, AppSource screenshots, video, short description, and website either separately or taken together mustn't impersonate an official Microsoft offering unless your app is an official Microsoft 1P offering.

</details>

### Duplicate App

* Apps from the same developer offering the same functionality must share an app listing unless privacy compliance requirements mandate separate app listings or separate app listing are required to support government cloud. You must build into your business logic and publish only one listing. [*Mandatory Fix*]

  * To fulfill multiple regions support requirement, you must build into your business logic and publish only one listing.

   :::image type="content" source="../../../../assets/images/submission/validation-guidelines-pass-region-app-manifest.png" alt-text="Screenshot shows the passed scenario of region requirement done with logic.":::

  * To fulfill multiple end-point requirements for on-premises and on-cloud deployment, you must build into your business logic and publish only one listing.

[Back to top](#microsoft-teams-store-validation-guidelines)

### Suitable for workplace consumption

[*Mandatory Fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: This section is in line with Microsoft commercial certification policy number [1140.1.2](/legal/marketplace/certification-policies#114012-workplace-appropriateness), [100.8](/legal/marketplace/certification-policies#1008-significant-value), and [100.10](/legal/marketplace/certification-policies#10010-inappropriate-content) and provides additional guidance to developers on building workplace appropriate apps.
<br></br>
<details><summary>Expand to know more</summary>

App content must be suitable for general workplace consumption and follow all restrictions listed in the commercial marketplace certification policies. Content related to religion, politics, gambling, and prolonged entertainment is prohibited. [Mandatory Fix]

Your app must enable group collaboration, improve an individual's productivity, or both. Apps intended for team bonding and socializing must be collaborative and designed for multiple participants. The apps mustn't require a substantial time investment of over 60 mins per session or affect productivity. [Mandatory Fix]

Content aggregator apps must have a mechanism for users to report an issue or inappropriate content to the app publisher. [Mandatory Fix]

   :::image type="content" source="../../../../assets/images/submission/validation-guidelines-content-aggregator-app.png" alt-text="Screenshot shows the passed scenario of content aggregator app to report issues.":::

</details>

[Back to top](#microsoft-teams-store-validation-guidelines)

### Similar platforms and services

[*Mandatory Fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: This section is in line with [Microsoft commercial certification policy number 1140.1.3](/legal/marketplace/certification-policies#114013-other-platforms-and-services).

Apps must focus on the Teams experience and not include the names, icons, or imagery of other similar chat-based collaboration platforms or services within the app content or in the app’s metadata unless the app provides specific interoperability.

[Back to top](#microsoft-teams-store-validation-guidelines)

### Feature names

App feature names in buttons and other UI text mustn't use terminology reserved for Teams and other Microsoft products. For example, **Start meeting**, **Make call**, or **Start chat** are feature names in use by Microsoft in Microsoft Teams. If necessary, include your app name to make the distinction clear, such as **Start Contoso meeting**.

[Back to top](#microsoft-teams-store-validation-guidelines)

### Authentication

[*Mandatory Fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: This section is in line with [Microsoft commercial certification policy number 1140.1.4](/legal/marketplace/certification-policies#114014-access-to-services) and provides guidance to developers on authenticating their apps with external services.

For more information on how to implement app authentication, see [authentication in Teams](~/concepts/authentication/authentication.md).
<br></br>
<details><summary>Expand to know more</summary>

#### Authenticating with external services

If your app authenticates users with an external service, follow these guidelines:

* **Sign in, sign out, and sign up experiences**:
  * Apps that depend on external accounts or services must provide clear and simple sign in, sign out, and sign up experience. [*Mandatory Fix*]
  * When users sign out, they must sign out only from the app and remain signed in to Teams. [*Mandatory Fix*]
  * Apps that depend on external accounts or services must provide a way forward for new users to sign up or contact the app publisher to learn more about the services and get access to the services.
  Way forward must be available in the app’s manifest, AppSource long description, and app first run experience (bot welcome message, tab setup, or config page). [*Mandatory Fix*]
  * Apps that require tenant admin to complete one-time setup must call out dependency on tenant admin to configure the app (before any other tenant user can install and use the app).
  Dependency must be called out in the app’s manifest, AppSource long description, all first run experience touchpoints (bot welcome message, tab setup, or config page), help text as considered necessary as part of bot response, compose extension, or static tab content. [*Mandatory Fix*]
  
* **Content sharing experiences**: Apps that require authentication with an external service to share content in Teams channels must clearly state in the help documentation (or similar resources) on how to disconnect or unshare content if that feature is supported on the external service. This doesn't mean the ability to unshare content must be present in your Teams app.

</details>

[Back to top](#microsoft-teams-store-validation-guidelines)

### Music App

* If the primary intent of the app is to listen to music, it must support at least one collaborative scope with end-to-end workflow specific to app. For example, sharing of playlist, configuring or pinning playlist, and synchronously listening to music. [*Mandatory Fix*]

* Apps published with the primary intent of letting users listen to music in Teams are recommended to include collaborative co-listening experience. [*Suggested Fix*]

[Back to top](#microsoft-teams-store-validation-guidelines)

## Security

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: This section is in line with [Microsoft commercial certification policy number 1140.3](/legal/marketplace/certification-policies#11403-security).

[Back to top](#microsoft-teams-store-validation-guidelines)

### Financial information

[*Mandatory Fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: This section is in line with [Microsoft commercial certification policy number 1140.3.1](/legal/marketplace/certification-policies#114031-financial-transactions) and provides guidance on transmission of financial information within the Teams interface and notifies developers of restricted payment scenarios on the mobile (Android and iOS) version of their Teams app.
<br></br>
<details><summary>Expand to know more</summary>

Apps mustn't ask users to make payments within the Teams interface and transmit financial information to users through a bot interface. [*Mandatory Fix*]

:::image type="content" source="../../../../assets/images/submission/validation-financial-information-1.png" alt-text="validation-financial-info":::

You may provide link to secure external payment services only if you disclose it in your terms of use, privacy policy, profile page, or website before the user agrees to use the app. [*Mandatory Fix*]

Don't facilitate payments through an app for goods or services prohibited by [General policy number 100.10 Inappropriate content](/legal/marketplace/certification-policies#10010-inappropriate-content). [*Mandatory Fix*]

Apps running on the iOS or Android version of Teams must adhere to the following guidelines:

* Apps mustn't include in-app purchases, trial offers, or UI that aims to upsell users to paid versions or online stores to purchase other content, apps, or add-ins. [*Mandatory Fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-financial-information-in-app-purchase.png" alt-text="validation-financial-info-in-app-purchase":::

    :::image type="content" source="../../../../assets/images/submission/validation-financial-information-online-stores.png" alt-text="validation-online-store":::

* If your app requires an account, users can sign up for an account at no charge. The use of the term **free** or **free account** is prohibited. [*Mandatory Fix*]
* You can determine whether an account is active indefinitely or for a limited time. When the account expires the app mustn't show UI, text, or links indicating the need to pay. [*Mandatory Fix*]
* Your app's privacy policy and terms of use must be free of any commerce-related UI or links. [*Mandatory Fix*]

</details>

[Back to top](#microsoft-teams-store-validation-guidelines)

### Bots

[*Mandatory Fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: This section is in line with [Microsoft commercial marketplace policy number 1140.3.2](/legal/marketplace/certification-policies#114032-bots-and-messaging-extension).
<br></br>
<details><summary>Expand to know more</summary>

For apps that use the Microsoft Azure Bot Service (such as bots and message extensions), you must follow all requirements defined in the Microsoft [Online Services Terms](https://www.microsoftvolumelicensing.com/DocumentSearch.aspx?Mode=3&DocumentTypeId=46).

Bots must always ask permission to upload a file and display a confirmation message.

:::image type="content" source="../../../../assets/images/submission/validation-bot-confirmation-message.png" alt-text="validation-bot-confirmation":::

</details>

[Back to top](#microsoft-teams-store-validation-guidelines)

### External domains

[*Mandatory Fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: This section is in line with [Microsoft commercial marketplace policy number 1140.3.3](/legal/marketplace/certification-policies#114033-external-domains) and provides developer guidance on usage of restricted domains in the `validDomains` manifest property.
<br></br>
<details><summary>Expand to know more</summary>

Don't include domains outside of your organization's control (including wildcards) and tunneling services in your app's domain configurations. The following exceptions include:

* If your app relies on SharePoint, you can include the associated root SharePoint site as a valid domain using the `{teamSiteDomain}` context property. [*Mandatory Fix*]
* Don't use top level domains such as **.com**, **.in**, and **.org** as a valid domain. [*Mandatory Fix*]

* Don't use **.onmicrosoft.com or** as a valid domain where **onmicrosoft** isn't under your control. However, you can use **yoursite.com** as a valid domain where **yoursite** is under your control even though the domain includes a wildcard. [*Mandatory Fix*]

* If your app is a PowerApp built on the Microsoft Power Platform, you must include *apps.powerapps.com* as a valid domain to enable your app to be accessible and functional within Teams.

* If your app uses the Azure Bot Service's OAuthCard, you must include *token.botframework.com* as a valid domain or else the Sign in button won't work. You mustn't declare *.botframework.com* as wildcards are not allowed with this domain name. [*Mandatory Fix*]

* Following External Domains are not allowed: [*Mandatory Fix*]
  * *.azurewebsites.net
  * *.azureedge.com
  * *.microsoft.com
  * *.microsoftonline.com
  * *.onmicrosoft.com
  * go.microsoft.com
  * teams.microsoft.com

When using wildcards (`*`), the following rules apply:

* If a subdomain segment includes a wildcard, it must be the only character in the segment.
* Any segment preceding a wildcard segment must also be a wildcard segment.

For example, *\*.\*.domain.com* is valid, but *foo.\*.myteam.domain.com* is not valid.

</details>

[Back to top](#microsoft-teams-store-validation-guidelines)

### Sensitive content

[*Mandatory Fix*]

Your app mustn't post sensitive data, such as credit card, financial payment details, health, contact tracing, or other personally identifiable information (PII) to an audience not intended to view the content.

App must warn users before downloading any files or executables (.exe) into the user's machine or environment.

[Back to top](#microsoft-teams-store-validation-guidelines)

## General functionality and performance

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: This section is in line with [Microsoft commercial marketplace policy number 1140.4](/legal/marketplace/certification-policies#11404-functionality).

* Way forward guidance is mandatory for both admin and existing users. You can add way forward guidance as hyperlinks to sign up, get started, contact us, help links, or email.
* Calling out account dependency or limitations under app functionality isn't required but is mandatory to add it in both manifest long description and AppSource app listing.
* You must call out any dependency on tenant admins for new users. If there's no dependency, it's mandatory to provide a sign up, contact us, get started link, or email.

[Back to top](#microsoft-teams-store-validation-guidelines)

### Launching external functionality

[*Mandatory Fix*]

Apps mustn't take users out of Teams for core user scenarios. App content and interactions must occur within Teams capabilities, such as bots, Adaptive Cards, tabs, and task modules.
<br>
</br>

<details><summary>Expand to know more</summary>

* Link users within Teams app and not to an external site or app. For scenarios that require external functionality, your app must take explicit user permission to launch the functionality. [*Mandatory Fix*]

* Button UI text that launches external functionality must include content to indicate the user is taken out of the Teams instance. For example, include text such as **This way to Contoso.com** or **View in Contoso.com**. [*Mandatory Fix*]

* Add **Pop-out** icon to let the users know that they're being navigated outside Teams. You can use the pop-out icon :::image type="icon" source="../../../../assets/icons/pop-out-icon.png" ::: to the right of the link. [*Mandatory Fix*]

* If you're unable to add a **Pop-out** icon, you can implement any of the following options to let the user know that they're being navigated outside Teams: [*Mandatory Fix*]
  * Add a note in Adaptive Card that states that when users select **Get Help using this app**, it takes the user outside Teams.
  * Add interstitials dialogs.

</details>

[Back to top](#microsoft-teams-store-validation-guidelines)

### Compatibility

[*Mandatory Fix*]

Apps must be fully functional on the latest versions of the following operating systems and browsers:

* Microsoft Windows
* macOS
* Microsoft Edge
* Google Chrome
* iOS
* Android

Your app must show a graceful failure message on unsupported browsers and operating systems.

[Back to top](#microsoft-teams-store-validation-guidelines)

### Response time

[*Mandatory Fix*]

Teams apps must respond within a reasonable timeframe or show a loading or typing indicator or message or warning.

* Tabs must respond within two seconds or display a loading message or warning. [*Mandatory Fix*]
* Bots must respond to user commands within two seconds or display a typing indicator. [*Mandatory Fix*]
* Message extensions must respond to user commands within two seconds. [*Mandatory Fix*]
* Notifications must display within two seconds of the user action. [*Mandatory Fix*]

[Back to top](#microsoft-teams-store-validation-guidelines)

## App package and store listing

[*Mandatory Fix*]

App packages must be correctly formatted and include all required information and components.

> [!TIP]
>
> * You must ensure the provided test accounts or test environment is valid in perpetuity, that is till the app is live on the commercial marketplace.
> * You must include the following detailed testing instructions for validating your app submission:
>
>   * **Steps to configure the app test accounts** in case app depends on external accounts for authentication.
>   * Summary of **expected app behavior** for the core workflows within Teams.
>   * **Clearly describe limitations**, conditions, or exceptions to the functionality, features, and deliverables in the app long description and related materials.
>   * **Emphasis on any considerations** for testers while validating your app submission.
>   * **Prepopulate the test accounts with dummy data** to aid testing.
>   * If you are providing your test accounts, ensure that you enable third-party integration. Also, disable two-factor or multi-factor authentication.

[Back to top](#microsoft-teams-store-validation-guidelines)

### App manifest

[*Mandatory Fix*]

The Teams app manifest defines your app's configuration.

* Your manifest must conform to a publicly released manifest schema. For more information, see [manifest reference](~/resources/schema/manifest-schema.md). Don't submit your app using a preview version of the manifest.
* If your app includes a bot or message extension, details in the app manifest must be consistent with Bot Framework metadata including bot name, logo, privacy policy link, and terms of service link.
* If your app uses Azure Active Directory for authentication, include the Microsoft Azure Active Directory (Azure AD) Application (client) ID in the manifest. For more information, see the [manifest reference](~/resources/schema/manifest-schema.md#webapplicationinfo).

[Back to top](#microsoft-teams-store-validation-guidelines)

### Uses of Latest manifest schema

* If your app uses Single sign-on (SSO), you must declare Microsoft Azure Active Directory (Azure AD) ID in the manifest for user authentication. [*Mandatory Fix*]

* You must use a publicly released manifest schema. You can update your app package to use a public version of manifest schema 1.10 or later. [*Mandatory Fix*]

* When you submit an app update, only increase the app version number. App ID of the updated app must match the App ID of the published app. [*Mandatory Fix*]

* The presence of additional files within the app package isn't acceptable. [*Mandatory Fix*]

* The version number must be the same in the manifest file schema and additional languages manifest schema. [*Mandatory Fix*]

* You must use the Teams manifest schema version 1.5 or later to localize your app. To use the app schema version 1.5 or later in your manifest.json file, update the `$schema` attribute to 1.5 or later. Update the `manifestVersion` property to `$schema` version (1.5 in this case). [*Mandatory Fix*]

* When you add, update, or remove an existing capability, add or remove manifest or Partner Center metadata, you must increase the app version number and submit the new app manifest in your Partner Center account for validation. [*Mandatory Fix*]

* The version string must follow the Semantic Versioning Specification (SemVer) standard (MAJOR.MINOR.PATCH). [*Mandatory Fix*]

* If your app requires admins to review permissions and grant consent in Teams admin center, you must declare `webapplicationinfo` in the manifest. If `webapplicationinfo` isn't declared in the manifest, the **Permissions** page for your app in Teams admin center is shown as **...** [*Mandatory Fix*]

* As part of Teams app certification, you must submit a production version of the app manifest. [*Mandatory Fix*]

* We recommend that you declare the Microsoft Partner Network (MPN) ID in the manifest. The MPN ID helps identify the partner organization that builds the app. [*Suggested Fix*]

* Scopes and/or context declared in app manifest must be visible within the app. [*Mandatory Fix*]

[Back to top](#microsoft-teams-store-validation-guidelines)

### App icons

[*Mandatory Fix*]

Icons are one of the main elements people see when browsing the Teams store.
<br></br>
<details><summary>Expand to know more</summary>

Your icons must communicate your app's brand and purpose while adhering to the following requirements:

* Your app package must include two .png versions of your app icon: A color icon and an outline icon. [*Mandatory Fix*]
* The color version of your icon must be 192x192 pixels. Your icon symbol can be any color or colors, but it must sit on a solid or fully transparent square background. [*Mandatory Fix*]
* The outline version of your icon is displayed in the following scenarios:
  * When your app is in use and **hosted** on the app bar on the left side of Teams.
  * When a user pins your app's message extension.

* The outline must be 32x32 pixels and can be white with a transparent background or transparent with a white background. The icon mustn't have any extra padding around the symbol. [*Mandatory Fix*]

* Your app package must include correctly sized and formatted icons. The icons must match the information in store listing metadata. [*Mandatory Fix*]

For more information, see [icon guidelines](~/concepts/build-and-test/apps-package.md#app-icons).

</details>

[Back to top](#microsoft-teams-store-validation-guidelines)

### App descriptions

You must have a short and long description for your app. The descriptions in your app configuration and Partner Center must be the same.

:::image type="content" source="../../../../assets/images/submission/validation-app-description-adequete-information.png" alt-text="Graphic shows an example of adequate app description in the Teams app.":::

:::image type="content" source="../../../../assets/images/submission/validation-app-description-inadequete.png" alt-text="Graphic shows a failed scenario for an inadequate app description.":::

<br></br>
<details><summary>Expand to know more</summary>

Descriptions mustn't directly or through insinuation disparage another brand (Microsoft owned or otherwise). Ensure that your description doesn’t include claims that can’t be substantiated. For example, Guaranteed 200 percent increase in efficiency.

* App description mustn't contain comparative marketing information. For example, don't use competitor logos or trademarks in the offer listing including tags or other metadata that references competing offers or marketplaces. [*Mandatory Fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-app-description-comparitive-marketing-fail.png" alt-text="Graphic shows an example of comparative marketing information in app description.":::

* Hyperlink contact details, get started, help, or sign up in app description. [*Suggested Fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-app-description-contact-deatils-hyperlinked.png" alt-text="Graphic shows an example of contact details hyperlinked in the app descriptions.":::

   :::image type="content" source="../../../../assets/images/submission/validation-app-description-contact-deatils-not-hyperlinked.png" alt-text="Graphic shows an example of contact details not hyperlinked in the app descriptions.":::

* App description must identify the intended audience, briefly and clearly explain its unique and distinct value, identify supported Microsoft products and other software, and include any prerequisites or requirements for its use. You must clearly describe any limitations, conditions, or exceptions to the functionality, features, and deliverables as described in the listing and related materials before the customer acquires your offer. The capabilities you declare must relate to the core functions and description of your offer. [*Mandatory Fix*]

* If you update your app name, replace the old app name with new app name in the offer metadata in the manifest, AppSource, and wherever applicable. [*Mandatory Fix*]

* Limitations and account dependencies must be called out in the manifest App Description, AppSource, and Partner Center. For example:
  * Enterprise account
  * Paid subscription
  * Another license or account
  * Language
  * Public switched telephone network (PSTN) dialing
  * Regional dependency
  * Lead time for booking translators or live agents
  * Role based functionality
  * Dependency on native app

  :::image type="content" source="../../../../assets/images/submission/validation-app-description-limitations-calledout-pass.png" alt-text="Graphic shows an example of limitations called out in app description.":::
  
  :::image type="content" source="../../../../assets/images/submission/validation-app-description-limitations-not-calledout-fail.png" alt-text="Graphic shows an example of limitations not called out in app descriptions.":::

* If your app is supported for specific regions or geographical locations, you must call out that specific region dependency in the app description in manifest, Partner Center, and AppSource for that offer.

* If you need to reference Teams, write the first reference in the app listing as Microsoft Teams. Later references can be shortened to Teams. [*Mandatory Fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-app-description-teams-reference-pass.png" alt-text="Graphic shows an example of correct reference to Teams in app description.":::

   :::image type="content" source="../../../../assets/images/submission/validation-app-description-teams-reference-fail.png" alt-text="Graphic shows an example of incorrect reference to Teams in app description.":::

[Back to top](#microsoft-teams-store-validation-guidelines)

#### Short description

A short description is a concise summary of your app that highlights its value proposition and is directed at your target audience.

**Dos:**

* Keep the short description to one sentence.
* Put the most important information first.
* Include keywords that customers are likely to search for.
* Make efficient use of the available character limit. For example, don't repeat your app name.

**Don't:**

[*Suggested Fix*]

Use the word **app** in the short description.

#### Long description

The long description can provide an engaging narrative that highlights your app's value proposition, primary audience, and target industry. While this description can be as long as 4,000 characters, most users will only read between 300-500 words.

**Dos:**

* Use [Markdown](https://support.office.com/article/use-markdown-formatting-in-teams-4d10bd65-55e2-4b2d-a1f3-2bebdcd2c772) to format your description.

* Use active voice and speak to users directly. For example, **You can ...**.

* List features with bullet points so it's easier to scan the description.

* Clearly describe limitations, features, conditions or exceptions to the functionality, and deliverables in the listing and related materials before the user installs your app. The Teams capabilities must relate to the core functions described in the listing.

* Ensure that the app description matches with the functionality available inside Teams app. Any reference to workflows outside the Teams app must be limited and distinctly called out from the Teams app functionality.

* Include a help or support link.

* Refer to **Microsoft 365** instead of **Office 365**.

* Use the following language when describing how the app works with Teams (or Microsoft 365):
  * **... works with Microsoft Teams.**
  * **... working with Microsoft Teams.**
  * **... within Microsoft Teams.**
  * **... for Microsoft Teams.**
  * **... integrated with Microsoft Teams.**
  * **... built for...**
  * **... developed for...**
  * **.. designed for...**

**Don'ts:**

[*Mandatory Fix*]

* Exceed 500 words.
* Abbreviate **Microsoft** as **MS** or **MSFT**.

   :::image type="content" source="../../../../assets/images/submission/validation-app-description-microsoft-abbreviated.png" alt-text="Graphic shows an example of abbreviating Microsoft as MS or MSFT  for the first time in app description.":::

   :::image type="content" source="../../../../assets/images/submission/validation-app-description-microsoft-not-abbreviated.png" alt-text="Graphic shows an example of not abbreviating Microsoft as MS or MSFT for the first time in app description.":::

* Indicate the app is an offering from Microsoft, including using Microsoft slogans or taglines.

   :::image type="content" source="../../../../assets/images/submission/validation-app-description-offering-from-microsoft.png" alt-text="Graphic shows an example of how not to indicate Microsoft offering in app description.":::

   :::image type="content" source="../../../../assets/images/submission/validation-app-description-no-offering-indication-from-microsoft.png" alt-text="Graphic that shows an example of how to write app description without using microsoft slogans and taglines.":::

* Use the following language unless you're a certified Microsoft partner:
  * **... certified for ...**
  * **... powered by ...**
* Include typos, grammatical errors.
* Unnecessarily capitalize the entire manifest or AppSource long description or app content.

   :::image type="content" source="../../../../assets/images/submission/validation-long-description-typos-pass.png" alt-text="Graphic shows an example of app long description without errors.":::

   :::image type="content" source="../../../../assets/images/submission/validation-long-description-typos-fail.png" alt-text="Graphic shows an example of app long description with typos and errors.":::

* Include links to AppSource.

  :::image type="content" source="../../../../assets/images/submission/validation-app-description-link-to-appsource.png" alt-text="Graphic shows an example of a fail scenario with links to AppSource in app long description.":::

* Make unverified claims. For example, best, top, and ranked, unless it comes with the source of the claim.
* Compare your offer with other marketplace offers.

</details>

[Back to top](#microsoft-teams-store-validation-guidelines)

### Screenshots

Screenshots provide a prominent visual preview of your app to complement your app name, icon, and descriptions.

<br></br>
<details><summary>Expand to know more</summary>

Remember the following:

* You can have up to five screenshots per listing.
* Supported file types include PNG, JPEG, and GIF.
* Dimensions must be 1366x768 pixels.
* Maximum size of 1,024 KB.

**Dos:**

* Focus on your app's capabilities. For example, how people can communicate with your bot.
* Include content that accurately represents your app.
* Use text judiciously.
* Frame screenshots with a color that reflects your brand and include marketing content.
* Use high-resolution screenshots that are sharp and contain legible and clearly readable text. [*Mandatory Fix*]
* At least one screenshot must depict your app’s functionality on mobile devices. [*Mandatory Fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-guidelines-pass-app-functionality-mobile.png" alt-text="Screenshot shows the passed scenario of app functionality on mobile devices.":::

* You can have up to five screenshots per listing. You must have a minimum of three and maximum five screenshots in your app listing. [*Mandatory Fix*]
* Use mockups that accurately depict the app’s actual UI for the benefit of end-users. Screenshots must accurately depict the app’s actual UI or scenarios relevant to and related to the app. [*Mandatory Fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-guidelines-fail-suppliement-screenshot.png" alt-text="Screenshot shows the failed scenario of supplement content used in screenshot.":::

   :::image type="content" source="../../../../assets/images/submission/validation-guidelines-fail-actual-UI.png" alt-text="Screenshot shows the failed scenario of screenshot of app's actual UI.":::

* Must depict app functionality or integration with Teams. [*Mandatory Fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-guidelines-fail-app-functionality.png" alt-text="Screenshot shows the failed scenario of app functionality or integration.":::

* Provided screenshots mustn't incorrectly reference Microsoft Teams as MS, MSFT, or MS Teams. [*Mandatory Fix*]
* If your Teams app is extensible across Microsoft 365 clients (Office, Outlook, and Microsoft Teams), the screenshots provided must depict the app functionality in other Microsoft 365 clients. [*Mandatory Fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-guidelines-pass-app-functionality-MS-365.png" alt-text="Screenshot shows the passed scenario of Teams app functionality in MS 365 clients.":::

* You must provide captions in your screenshots to let the user clearly understand the app capability. [*Mandatory Fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-guidelines-pass-app-functionality.png" alt-text="Screenshot shows the passed scenario of user attention for app functionality.":::

* If your app supports Tabs as a capability, the screenshots showcasing the app in the context of a Teams tab, in app listing, must contain Team’s chrome. [*Mandatory Fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-guildelines-pass-tabs-capability.png" alt-text="Screenshot shows the passed scenario of screenshot of tab capability.":::

**Don'ts:**

* Include mockups that inaccurately reflect your app's actual UI, such as showing your app being used outside Teams.

   :::image type="content" source="../../../../assets/images/submission/validation-guidelines-fail-app-functionality-teams.png" alt-text="Screenshot shows the failed scenario of unrelated app functionality in Teams.":::

> [!TIP]
>
> * A video can be the most effective way to communicate why people must use your app. A video also is the first thing users see in your listing.
> * If you choose to provide a video in your app listing, you must turn off ads in YouTube or Vimeo settings before submitting the video link in the Partner Center. Videos provided in the app listing mustn't be more than 90 seconds in duration and must only depict the app functionality and integration with Microsoft Teams. For more information, see [create a video for your store listing](~/concepts/deploy-and-publish/appsource/prepare/submission-checklist.md#create-a-video). [*Mandatory Fix*]

</details>

[Back to top](#microsoft-teams-store-validation-guidelines)

### Privacy policy

[*Mandatory Fix*]

The privacy policy can be specific to your Teams app or an overall policy for all your services.

* If you use a generic privacy policy template, you must add a reference to **services**, **applications**, or **platforms in the scope of your privacy policy**. You don’t need to specify your Teams app in the scope, if you include a reference to **services**, **applications**, and **platforms**. The app validation process will interpret these references to include your Teams app along with your other services or websites.
* Must include how you handle user data storage, retention, and deletion. You must describe the security controls for data protection.
* Must include your contact information.
* Must not include URLs that are broken or for beta or staging purposes.
* Must not include links to AppSource.
* Must not require authentication to access privacy policy.
* Must not include any commerce UI or store links.

[Back to top](#microsoft-teams-store-validation-guidelines)

### Terms of use

[*Mandatory Fix*]

Use the following guidelines to write the Terms of use:

* Must be specific and applicable to your offering.
* Must be hosted on your own domain.
* Must have a secure (HTTPS) link.
* Access to Terms of use mustn't require authentication.

[Back to top](#microsoft-teams-store-validation-guidelines)

### Support links

[*Mandatory Fix*]

Your app's support URLs mustn't require authentication. For example, users must be allowed to contact you without sign in.
<br></br>
<details><summary>Expand to know more</summary>

Support URLs must include your contact details or a way forward for users to raise a support ticket. For example, if your support URL is hosted on GitHub, the GitHub page must be under your ownership and must include your contact details or a way forward for users to raise a support ticket.

:::image type="content" source="../../../../assets/images/submission/validation-supportlinks-authentication.png" alt-text="validation-support-links-auth":::

</details>

[Back to top](#microsoft-teams-store-validation-guidelines)

### Localization

[*Mandatory Fix*]

* If your app supports localization, your app package must include a file with language translations that display based on the Teams language setting. The file must conform to the Teams localization schema. For more information, see [Teams localization schema](~/concepts/build-and-test/apps-localization.md). [*Mandatory Fix*]

* App metadata content must be the same in `en-us` and other localization languages. [*Mandatory Fix*]

* Supported languages must be displayed in the AppSource app description. For example, this app is available in X (X= localized language). [*Mandatory Fix*]

* If the user's client settings don't match with any of your additional languages, the default language is used as the final fallback language. Update the `localizationInfo` property with the correct default language that your application supports. [*Mandatory Fix*]

* Update the `localizationInfo` property with the correct default language your application supports or add localized content for manifest and Partner Center long and short description. [*Mandatory Fix*]

[Back to top](#microsoft-teams-store-validation-guidelines)

## Apps linked to SaaS offer

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: This section is in line with [Microsoft commercial marketplace policy number 1140.5](/legal/marketplace/certification-policies?branch=pr-en-us-5673). If you're building a Teams app linked to a SaaS offer, ensure that it adheres to these guidelines.
<br></br>
<details><summary>General</summary>

* ISVs must support the ability for multiple users (Subscribers) in the same tenant to manage their own subscription and assign licenses to users in the tenant.
* The offer must meet all the [technical requirements](/microsoftteams/platform/concepts/deploy-and-publish/appsource/prepare/include-saas-offer) for Teams apps linked to a SaaS offer.
* The Teams apps linked to SaaS offer must meet all the requirements defined in [1000 Software as a Service (SaaS)](/legal/marketplace/certification-policies#1000-software-as-a-service-saas).
* `subscriptionOffer` details mentioned in the manifest file must be correct. In your app manifest, add or update node `subscriptionOffer` with value `publisherId.offerId`. For example, if your publisher ID is `contoso1234` and your offer ID is `offer01`, the value that you specify in your app manifest must be `contoso1234.offer01`.
* Linked SaaS offer to the Teams app must be live in AppSource and preview offers aren't accepted for store approval.

</details>

</br>
<details><summary>Offer metadata</summary>

* Offer metadata must match across the Teams manifest, the Teams app listing in AppSource, and the SaaS offer in AppSource.
* Teams app and SaaS offer must be from the same publisher or developer. The SaaS offer referenced in the App manifest must belong to the same publisher as the Teams app is submitted to the commercial marketplace.
* As your submitted offer is a Teams app linked to SaaS offer, you must select **Additional purchases** as **Yes, my product requires purchase of a service or offers additional in-app purchases​** in Partner Center product set-up section of your offer listing.
* Plan descriptions and pricing details must provide enough information for users to clearly understand the offer listings.
* Any limitations, dependencies on additional services, and exceptions to features offered must be accurately called out in plan descriptions.
* The Teams apps linked to SaaS offer are designed to support licenses assigned on a named, per-user basis. Sometimes, the SaaS offer is built with other method or has specialized purchase flows. You must clearly mention in the app metadata and subscription plan details about the method and purchase flows.
* SaaS offer must provide messages and guidance to all users in all applicable states of purchase flow.

</details>
</br>

<details><summary>SaaS offer home page and license management</summary>

* Provide introduction to subscribers on how to use the product.
* Allow the subscriber to assign licenses.
* Provide different ways to engage with support for issues, such as FAQ, knowledge base, and email.
* Validate users to ensure that they don’t already have license assigned through another user.
* Notify users after license assignment.
* Guide users on how to add the app to Teams and get started through Teams chat bot or email.

</details>
</br>

<details><summary>Usability and functionality</summary>

* After successful purchase and assignment of licenses, you must provide the following:
  * Access to users for subscribed plan features.
  * Value addition and significant benefits of subscription plan to users.
  * From your Teams app, provide link to the SaaS application home page for subscribers to manage the licenses in the future.

</details>
</br>

<details><summary>Configure and test SaaS application</summary>

If setup of your app for testing purposes is complex, provide an end-to-end functional document, linked SaaS offer configuration steps, and instructions for license and user management as part of your *Notes for Certification*.

> [!TIP]
> You can add a video on how your app and license management works to assist the team for testing.

</details>

[Back to top](#microsoft-teams-store-validation-guidelines)

## Tabs

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: This section is in line with [Microsoft commercial marketplace policy number 1140.4.2](/legal/marketplace/certification-policies#114042-tabs).
If your app includes a tab, ensure that it adheres to these guidelines.
> [!TIP]
> For more information on creating a high-quality app experience, see [Teams tab design guidelines](~/tabs/design/tabs.md).

</br>
<details><summary>Setup</summary>

* Tab setup **mustn't dead-end** a new user. Provide a message on how to complete the action or workflow. [*Mandatory Fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-tabs-setup-new-user.png" alt-text="Graphic shows an example of Tab with a dead-end on setup.":::

* The user mustn't leave the tab configuration experience inside Teams to create content outside Teams and then return to Teams to pin it. Tab configuration screen must explain the value of configuration and how to configure. [*Mandatory Fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-tabs-setup-profile-name.png" alt-text="validation-tabs-set-up-profile-name":::

* Tab configuration screen mustn't embed an entire website. Keep your configuration experience focused. For example, if you're building a project management app that lets users configure a project in a channel, keep the tab configuration screen focused on allowing the user to select a project from your app to configure in the channel. [*Mandatory Fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-tabs-setup-configuration-experience.png" alt-text="validation-tabs-setup-configuration-exp":::

    :::image type="content" source="../../../../assets/images/submission/validation-tabs-setup-configuration-screen.png" alt-text="validation-tabs-set-up-configuration-screen":::

* Apps that require users to input a URL while configuring a tab must:
  * Provide an appropriate way forward guidance for the user to acquire or generate the URL. [*Mandatory Fix*]
  * Check for URL that is relevant or appropriate to the app’s functionality as per the app description. [*Mandatory Fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-tab-configuration-way-forward-url-pass.png" alt-text="Screenshot shows an example of tab configuration with a way forward for user to generate a URL.":::
  
    :::image type="content" source="../../../../assets/images/submission/validation-tab-configuration-way-forward-url-fail.png" alt-text="Screenshot shows an example of tab configuration without a way forward for user to generate a URL.":::

* Hyperlink the contact us information in the configuration screen instead of plain text to help users to contact you for support requirements. [*Mandatory Fix*]

* For a seamless first run user experience, we recommend that you hyperlink your support URL or email in the configuration screen. [*Suggested Fix*]

</details>
</br>

<details><summary>Views</summary>

* The sign in screen area mustn't use large logos. [*Mandatory Fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-views-applogin.png" alt-text="validation-views-app-login":::

* Content can be simplified by breaking down across multiple tabs.

    :::image type="content" source="../../../../assets/images/submission/validation-views-multiple-tabs.png" alt-text="val-views-multiple-tabs":::

* Tabs shouldn't have a duplicate header. Remove duplicate logos from the I-frame since the tab framework already displays the app icon and name. [*Suggested Fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-views-no-duplicate-header-logo.png" alt-text="Graphic shows an example of a tab without duplicate headers and logos.":::

    :::image type="content" source="../../../../assets/images/submission/validation-views-duplicate-header-logo.png" alt-text="Graphic shows an example of a tab with duplicate headers and logos.":::

</details>
</br>

<details><summary>Navigation</summary>

The following are the navigation guidelines:

* Tabs mustn't provide navigation that conflicts with the primary Teams navigation. If you provide a left navigation in your tab, it mustn't include only icons or icons with stacked text. It mustn't be a collapsible rail with the option to see icons with stacked text (mimicking the Teams navigation bar). Include icons with in line text or only text or use hamburger menus instead of tab left rail. [*Mandatory Fix*]

   Design your app with [basic](~/concepts/design/design-teams-app-basic-ui-components.md) and [advanced](~\concepts\design\design-teams-app-advanced-ui-components.md) Fluent UI components.

   :::image type="content" source="../../../../assets/images/submission/validation-navigation-static-tab.png" alt-text="Graphic shows an example of navigation in a tab that doesn't conflict with the primary Teams navigation.":::

   :::image type="content" source="../../../../assets/images/submission/validation-navigation-left-navigation.png" alt-text="Graphic shows an example of left navigation rail that conflicts with the primary Teams navigation.":::

* If your tab has a toolbar on the left rail without any navigation component, the toolbar must leave 20 pixels spacing from Teams left navigation. [*Mandatory Fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-navigation-spacing-between-toolbar.png" alt-text="validation-nav-spacing-between-toolbar":::

* The secondary and tertiary pages in a tab must be opened in a level two (L2) and level three (L3) view in the main tab area, which is navigated via breadcrumbs or left navigation. You can also use the following components to aid navigation in a tab:
  * Back buttons
  * Page headers
  * Hamburger menus

    :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-improper-navigation-leveles.png" alt-text="Screenshot that shows an example of in-meeting dialog with multiple navigation levels.":::

* Deep links in tabs mustn't link to an external webpage but within Teams. For example, task modules or other tabs. [*Mandatory Fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-navigation-view-button-not-linked-static-tab.png" alt-text="validation-nav-view-button-not-linked-static-tab":::

* Tabs mustn't allow users to navigate outside Teams for the core app experience. Tabs can redirect outside Teams for non-core workflows. For example, to raise a support ticket. [*Mandatory Fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-navigation-core-workflow-within-configuration.png" alt-text="validation-nav-core-workflow-within-configuration":::

    :::image type="content" source="../../../../assets/images/submission/validation-navigation-core-workflow-redirects-outside.png" alt-text="validation-nav-core-workflow-redirects-outside":::

* Horizontal scroll mustn't be present in an in-meeting tab. [*Mandatory Fix*]

* In-meeting dialogs used in your app mustn't allow horizontal scrolling. Use in-meeting dialogs sparingly and for scenarios that are light and task oriented. You can specify the width of the in-meeting dialog’s I-frame within the supported size range to account for different scenarios. [*Mandatory Fix*]
* Task modules used in your app mustn't allow horizontal scrolling. Task modules allow you to select different sizes to make the content responsive without the need of Horizontal scroll. If required, you can use a Stage View (a full screen UI component to surface your web content) to complete the workflow without Horizontal scroll. [*Mandatory Fix*]

* Horizontal scroll present in the tab in a personal chat, channel, and in-meeting details tab in any scope isn't allowed if the entire tab canvas is scrollable, unless your tab uses an infinite canvas with fixed UI elements. [*Mandatory Fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-horizontal-scroll-allowed-scenarios.png" alt-text="Graphic shows examples of all the scenarios in mobile where horizontal scroll is allowed.":::

   :::image type="content" source="../../../../assets/images/submission/validation-horizontal-scroll-allowed-kanban.png" alt-text="Graphic shows an example of horizontal scroll in Kanban board.":::

   :::image type="content" source="../../../../assets/images/submission/validation-horizontal-scroll-list-view-components.png" alt-text="Graphic shows an example of list view with many  components.":::

   :::image type="content" source="../../../../assets/images/submission/validation-horizontal-scroll-fixed-board.png" alt-text="Graphic shows an example of horizontal scroll in a white board with infinite canvas and fixed board.":::

   :::image type="content" source="../../../../assets/images/submission/validation-horizontal-scroll-in-list-view.png" alt-text="Graphic shows an example of horizontal scroll in list view.":::

* Horizontal scroll in Adaptive Cards mustn't be present in Teams. [*Mandatory Fix*]

* Bottom rail used for navigation in tabs mustn't conflict with Teams native mobile app navigation. [*Mandatory Fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-tab-bottom-rail-conflicts-with-teams-mobile.png" alt-text="Graphic shows an example of a tab that conflicts with Teams native mobile app navigation.":::

</details>
</br>

<details><summary>Usability</summary>

* Tabs must provide value beyond hosting an existing website. [*Mandatory Fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-usability-app-provides-workflows.png" alt-text="Graphic shows an example of an app with a workflow valuable to channel members within a team.":::

    :::image type="content" source="../../../../assets/images/submission/validation-usability-website-i-framed.png" alt-text="Graphic shows an example of an app with entire website in an I-frame without any back option.":::

* Content mustn't truncate or overlap within the tab. [*Mandatory Fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-usability-content-truncation.png" alt-text="validation-usability-content-truncations":::

* Users must be able to undo their last action in the tab. [*Mandatory Fix*]

* Tabs in a personal context may aggregate content from shared instances of the app. For example, a project management app with a configurable tab that lets channel members comment on the project on Kanban cards, must aggregate this content and display in the personal app. [*Suggested Fix*]

* Tabs must be responsive to Teams themes. When a user changes the theme, the app's theme must reflect the selection. [*Suggested Fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-usability-responsive-tabs.png" alt-text="Graphic shows an example of a tab responsive to a theme in Teams.":::

    :::image type="content" source="../../../../assets/images/submission/validation-usability-unresponsive-tabs.png" alt-text="Graphic shows an example of a Tab not responsive to theme in Teams.":::

* Tabs must use Teams styled components such as, Teams fonts, type ramps, color palettes, grid system, motion, tone of voice, whenever possible. For more information, see [tab design guidelines](/microsoftteams/platform/tabs/design/tabs). [*Suggested Fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-usability-app-uses-diff-font.png" alt-text="Screenshot shows an example of a tab with calibri font instead of native Teams font.":::

* If your app functionality requires changes in settings, include a **Settings** tab. [*Suggested Fix*]
* Tabs must follow Teams interaction design such as, in-page navigation, position and use of dialogs, information hierarchies. For more information, see [Microsoft Teams Fluent UI kit](~/concepts/design/design-teams-app-basic-ui-components.md). [*Suggested Fix*]

* Tab experiences must be fully responsive on mobile (Android and iOS). [*Mandatory Fix*]

   > [!TIP]
   >
   > * Include a personal bot alongside a personal tab.
   > * Allow users to share content from their personal tab.

* Tab mustn't contain elements that completely obstruct or impede workflows within the tab. For example, bot inside a tab that can't be minimized. [*Mandatory Fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-tab-elements-impede-workflow.png" alt-text="Graphic shows an example of tab with elements that impede workflows within the tab.":::

* Tab mustn't have a broken functionality. Your offer must be a usable software solution and must provide the functionality, features, and deliverables as described in your listing and other related materials. [*Mandatory Fix*]

* If your tabs contain a footer, ensure that you remove all links unrelated to app functionality from the footer. [*Mandatory Fix*]

</details>
</br>

<details><summary>Scope selection</summary>

* Content in the landing page of configurable tabs mustn't be scoped for individual use and not include personal content such as **My Tasks** or **My Dashboard**. [*Mandatory Fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-configurable-tab-content-personal-scope.png" alt-text="Graphic shows an example of content in a configurable tab with personal scope such as My tasks or My dashboard.":::

* After the configuration experience, the landing page must show a collaborative view for the entire team. [*Mandatory Fix*]

* If your app requires provision of a personal scope view for the user to enhance efficiency or workplace productivity, use filtered views, deep links to personal apps, or navigate to L2 or L3 views within the configurable tab and keep the landing page contextually the same for all the users. [*Mandatory Fix*]

* Content in the landing page of the configurable tabs must be contextually same for all members of the channel. [*Mandatory Fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-usability-configurable-tab-personal-info.png" alt-text="Graphic shows an example of content in the landing page of the configurable tabs contextually different for all members.":::

* Configurable tabs must have focused functionality. [*Mandatory Fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-usability-configurable-nested-tabs.png" alt-text="validation-usability-configurable-nested-tab":::

</details>
<br/>

[Back to top](#microsoft-teams-store-validation-guidelines)

## Bots

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: This section is in line with [Microsoft commercial marketplace policy number 1140.4.3](/legal/marketplace/certification-policies#114043-bots).

If your app includes a bot, ensure that it adheres to these guidelines.

> [!TIP]
> For more information on creating a high-quality app experience, see [Teams bot design guidelines](~/bots/design/bots.md).

</br>
<details><summary>Bot design guidelines</summary>

* Your Teams app must follow [Teams bot design guidelines](../../../../bots/design/bots.md).

* You must implement a task module to avoid multi-turn bot response when the workflow involves the user performing repetitive tasks. For example, use a task module to repetitively capture name, dob, place, and designation instead of using multi-turn conversations. [*Mandatory Fix*]

* Any broken links, responses, or workflows in your app must be fixed. [*Mandatory Fix*]

</details>

</br>
<details><summary>Bot commands</summary>

Analyzing user input and predicting user intent is difficult. Bot commands provide users a set of words or phrases for your bot to understand.

* You must list at least one supported bot command in the `{commandList}` section of your app manifest. These commands display in the compose box when a user tries to message your bot. [*Mandatory Fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-bot-commands-listed.png" alt-text="Graphic shows an example of bot commands listed in the app manifest.":::

   :::image type="content" source="../../../../assets/images/submission/validation-bot-commands-not-listed.png" alt-text="Graphic shows an example of bot commands not listed in the app manifest.":::

* All commands that your bot supports must work correctly, including generic commands such as **Hi**, **Hello**, and **Help**. [*Mandatory Fix*]
  
  :::image type="content" source="../../../../assets/images/submission/validation-bot-commands-generic-response-pass.png" alt-text="Graphic shows an example of bot responding to generic commands.":::

  :::image type="content" source="../../../../assets/images/submission/validation-bot-commands-generic-no-response.png" alt-text="Graphic shows an example of bot with no response to generic commands.":::

* Bot commands mustn't lead a user to a dead end, the commands must always provide a way forward. [*Mandatory Fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-bot-commands-deadend.png" alt-text="validation-bot-commands-dead-end":::

* You must list at least one valid bot command in the `items.commands.title` section of the manifest and add a suitable description that gives clarity to the user on the bot command and its usage. Bot commands listed in the `commandLists` section of the manifest surface as prepopulated commands in the bot command menu and provide a way forward for the new user to interact with the bot. [*Mandatory Fix*]

* Bot response mustn't contain any official Microsoft product images or avatars. Use your own assets in your app. Use of Microsoft product images in your app isn't allowed. You may only copy, modify, distribute, display, license, or sell Microsoft copyrighted product images if you're granted explicit permission within the End-User License Agreement (EULA), license terms that accompany the content, or in the [Microsoft Trademark and Brand guidelines](https://www.microsoft.com/legal/intellectualproperty/trademarks). [*Mandatory Fix*]

* Bots must respond to user commands without displaying a continuous loading indicator. [*Mandatory Fix*]

* Bot help command response mustn't redirect the user outside Teams. Bot help command response can redirect user to a canvas within the Teams app or provide a way forward response in an Adaptive Card. [*Mandatory Fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-bot-redirects-user-outside-teams.png" alt-text="Graphic shows an example of bot response redirecting user outside of Teams.":::

* Bots must always provide a valid response to a user input even if the input is irrelevant or improper. [*Mandatory Fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-bot-response-valid-improper-input.png" alt-text="Graphic shows an example of a valid response for improper bot command.":::

   :::image type="content" source="../../../../assets/images/submission/validation-bot-response-improper-response-invalid-command.png" alt-text="Graphic shows an example of an invalid response for improper bot command.":::

* Special characters such as slash (**/**), mustn't be prefixed to bot commands. [*Mandatory Fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-bot-commands-special-characters.png" alt-text="Graphic shows an example of a failed scenario where special characters are prefixed to bot commands.":::

* Bots must provide a valid response to invalid user commands. Bots mustn't dead-end the user or display an error if a user sends an invalid bot command. [*Mandatory Fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-bot-way-forward-for-invalid-command.png" alt-text="Graphic shows an example of bot providing a way forward for an invalid command.":::

   :::image type="content" source="../../../../assets/images/submission/validation-welcome-message-bot-dead-end-invalid-command.png" alt-text="Graphic shows an example of a failed scenario where a bot sends a same response for a valid and invalid command.":::

* Bot functionality must be relevant to the scope in which the bot is installed and the bot must provide value in the installed scope. [*Mandatory Fix*]

* Bots mustn't contain duplicate commands. [*Mandatory Fix*]

* Bots mustn't display a typing indicator after responding to the user command, but can display a typing indicator while responding to the user command. [*Mandatory Fix*]

* Bots must provide a valid response to the **help** command typed in lowercase or uppercase that provides the user with a way forward or lets the user access the help content related to the bot usage. Bots must provide a valid response even when the user hasn't logged onto the app. [*Mandatory Fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-bot-valid-response-lowercase.png" alt-text="Graphic shows an example of bot not providing a valid response for a command in lowercase or uppercase.":::

   :::image type="content" source="../../../../assets/images/submission/validation-bot-valid-response-logged-app.png" alt-text="Graphic shows an example of a bot without a valid response when the user hasn't logged onto the app.":::

* Bots must provide a valid response to **help** command.

   :::image type="content" source="../../../../assets/images/submission/validation-bot-help-command.png" alt-text="Graphic shows an example of bot sending a valid response to help command.":::

* Bot responses on mobile must be responsive without any data truncation that hampers the end-user's bot usage  to complete desired workflows. [*Mandatory Fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-bot-response-no-truncate-mobile.png" alt-text="Graphic shows an example of a bot message without truncating on mobile.":::

   :::image type="content" source="../../../../assets/images/submission/validation-bot-response-truncate-mobile.png" alt-text="Graphic shows an example of a bot message truncating on mobile.":::

* All the links in a bot response adaptive card must be responsive. Any link that takes the user outside the Teams platform must have a clear redirect text such as, **View in..** or **This way to..**, a pop-out icon in the bot response action button, or have a suitable redirect text in the bot response message body. [*Mandatory Fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-bot-action-button-redirect-warning.png" alt-text="Graphic shows an example of bot response action button with a redirect.":::

* By design, if your bot doesn't respond or support any user command and is a one way bot only intended to notify users. You must set `isNotificationOnly` to true in the manifest. [*Mandatory Fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-bot-command-isnotification-only-true.png" alt-text="Graphic shows an example of notification only property set to true in the app manifest.":::

  :::image type="content" source="../../../../assets/images/submission/validation-bot-command-isnotification-only-not-true.png" alt-text="Graphic shows an example of notification only bot not responding for a user's message.":::

* Bot user experience mustn't be broken on mobile platforms. Your bot must be fully responsive on mobile. [*Mandatory Fix*]

> [!TIP]
> For personal bots, include a **Help** tab that further describes what your bot can do.

</details>
</br>

<details><summary>Bot welcome messages</summary>

* If the app has a complex configuration flow (requires an enterprise license or lacks an intuitive sign up flow), then bots in such apps must always send a welcome message during the first run.

  For best experience, the welcome message must include the value offered by the bot to users, who installed the bot in channel, how to configure the bot, and briefly describe all supported bot commands. You can display the welcome message using an Adaptive Card with buttons for better usability. For more information, see [how to trigger a bot welcome message](~/bots/how-to/conversations/send-proactive-messages.md). For apps without a complex configuration flow, you can choose to trigger a welcome message during the bot first run experience. However, if a welcome message is triggered, it must follow the welcome message guidelines.

   :::image type="content" source="../../../../assets/images/submission/validation-bot-welcome-message.png" alt-text="Graphic shows an example of bot sending a welcome message when the bot has a complex configuration workflow.":::

   :::image type="content" source="../../../../assets/images/submission/validation-bot-no-welcome-message.png" alt-text="Graphic shows an example of bot not sending a welcome message when the bot has a complex configuration workflow.":::

* Bot welcome messages in channels and chats are optional during first run, especially if the bot is available for personal use and performs similar actions. Your bot mustn't send welcome messages to users individually (it's considered [spamming](#botmessagespamming)). The message must also mention the person who added the bot.

   :::image type="content" source="../../../../assets/images/submission/validation-bot-welcome-message-not-triggered.png" alt-text="validation-bot-welcome-message-not-trigger":::

   :::image type="content" source="../../../../assets/images/submission/validation-bot-welcome-message-triggered.png" alt-text="validation-bot-wel-message-trigger":::

* Notification only bots must send a welcome message that clarifies that the bot is a notification only bot and users won't be able to interact with the bot. [*Mandatory Fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-notification-only-welcome-message-pass.png" alt-text="Graphic shows an example of bot sending a welcome message that it's a notification only bot.":::

* Welcome message mustn't dead-end the user. Welcome message must include the value offered by the bot to the users who installed the bot in channel, how to configure the bot, and briefly describe all supported bot commands. You can display the welcome message using an Adaptive Card with buttons for better usability. [*Mandatory Fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-welcome-message-no-way-forward.png" alt-text="Graphic shows an example of a failed scenario where the bot has no way forward for the user in a welcome message.":::

   :::image type="content" source="../../../../assets/images/submission/validation-welcome-message-clear-way-forward.png" alt-text="Graphic shows an example of bot welcome message with a clear way forward for the user to complete the task.":::

* Bot installed in a channel or group chat scope mustn't send proactive welcome message to all the team members in 1:1 chat. [*Mandatory Fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-bot-send-proactive-message-to-all-members.png" alt-text="Graphic shows an example of bot sending proactive welcome message to all the team members.":::

* Notification only bot can send a proactive welcome message in a channel only if the message contains important information for any user to complete the configuration for the bot or clarifies the scenarios when notifications are triggered. [*Mandatory Fix*]

* Bot installed in a channel or group chat scope mustn't send proactive messages (not just welcome message) that are irrelevant to all users in channel or group chat, instead must send proactive messages to the user over 1:1 chat. [*Mandatory Fix*]

* Bot installed in a channel or group chat scope mustn't allow users to start individual workflows. Bots must complete individual workflows in 1:1 chat with the user. [*Mandatory Fix*]

* Bot welcome message must clearly call out the limitations related to bot usage in the installed scope. [*Mandatory Fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-bot-welcome-messahe-with-app-limitation.png" alt-text="Graphic shows an example of app limitation in bot welcome message.":::

   :::image type="content" source="../../../../assets/images/submission/validation-bot-welcome-messahe-without-app-limitation.png" alt-text="Graphic shows an example of a bot without app limitation in a welcome message.":::

* Welcome message must auto trigger on app install in a personal scope. If the bot doesn't send a welcome message in a personal scope, the user is lead to a dead-end. If the app doesn't include a complex configuration workflow, it's optional for the developer to trigger a welcome message in the channel or group chat scope. [*Mandatory Fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-bot-no-welcome-message-in-personal-scope.png" alt-text="Graphic shows an example of bot not sending a  welcome message automatically in personal scope.":::

* Welcome messages must trigger only once on bot install. Welcome messages mustn't trigger every time the user invokes the help command. Help command response must be focused to include a way for the user to access help related to the bot. [*Mandatory Fix*]

* Welcome messages mustn't trigger with every bot command. This is considered spam. [*Mandatory Fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-welcome-message-trigger-for-any-command.png" alt-text="Graphic shows an example for bot triggering a welcome message for any command.":::

* Welcome message content must be related to the bot workflow mentioned in the app’s long description and the installation scope. Welcome message must include the value offered by the bot to users who installed the bot in channel, how to configure the bot, and briefly describe all supported bot commands. [*Mandatory Fix*]

* Bot mustn't send multiple welcome messages when triggered on app install. [*Mandatory Fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-bot-multiple-message-trigger-install.png" alt-text="Graphic shows an example of bot triggering multiple welcome messaged on app install.":::

* App name in the welcome message must match the app name in the manifest. [*Mandatory Fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-app-name-mismatch-manifeast-and-welcome-message.png" alt-text="Graphic shows an example of app name in welcome message not matching with the app name in the app manifest.":::

* Welcome message mustn't display competitor chat based collaborative platform names unless the app provides specific interoperability.

* Welcome message mustn't redirect the user to another Teams app, instead the welcome message must nudge the user to complete their first task and briefly describe all supported bot commands in the app. [*Mandatory Fix*]

* Welcome message mustn't contain links to any app marketplace including AppSource. [*Mandatory Fix*]

* If your app has a complex configuration workflow that requires admin led installation, doesn't have an intuitive and readily available sign up flow, or requires users to complete configuration steps outside the Teams experience and return then the bot must send a proactive welcome message in a team or group chat scope after installation. [*Mandatory Fix*]

* If your bot sends a welcome message in the channel, it mustn't send it to users individually (It's considered spamming). The welcome message must also mention the person who added the bot. [*Suggested Fix*]

> [!TIP]
> In welcome messages to individual users, a carousel tour can provide an effective overview of your bot and any other app features to encourage users to try bot commands. For example, **Create a task**.

</details>
</br>

<details><summary><a id="botmessagespamming">Bot message spamming</a></summary>

Bots mustn't spam users by sending multiple messages in short duration.

* **Bot messages in channels and chats**: Don't spam users by creating separate posts. Create a single post with replies in the same thread. [*Mandatory Fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-bot-message-spamming-one-message.png" alt-text="validation-bot-message-spam-one-message":::

    :::image type="content" source="../../../../assets/images/submission/validation-bot-message-spamming-multiple-messages.png" alt-text="validation-bot-message-spam-multiple-message":::

* **Bot messages in personal apps**:
  * Don't send multiple messages in quick succession. [*Mandatory Fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-bot-messages-multiple-message-quick-succession.png" alt-text="Graphic shows an example of a bot sending multiple messages in quick succession.":::

  * Send one message with complete information. [*Mandatory Fix*]
  * Avoid multi-turn conversations to complete a single repetitive workflow. [*Mandatory Fix*]
  * Use a form (or task module) to collect all inputs from a user at one time. [*Mandatory Fix*]
  * NLP based conversational chatbots can use multi turn conversation to make the discussion more engaging and complete a workflow.

    :::image type="content" source="../../../../assets/images/submission/validation-bot-messages-using-task-module.png" alt-text="validation-bot-message-using-task-module":::

    :::image type="content" source="../../../../assets/images/submission/validation-bot-messages-using-mutliple-conversation.png" alt-text="Graphic shows an example bot using multi-turn messages to complete a single conversation.":::

* **Welcome messages**: Don't repeat the same welcome message over regular intervals. For example, when a new member is added to a team, don't spam the other members with a welcome message. Message the new member personally. [*Mandatory Fix*]

   :::image type="icon" source="../../../../assets/images/submission/validation-bot-send-proactive-message-to-all-members.png" alt-text="Graphic shows an example bot spamming users with same welcome message.":::

</details>
</br>

<details><summary>Bot notifications</summary>

Bot notifications must include content relevant for the scope you define for the bot (team, chat, or personal). [*Mandatory Fix*]

:::image type="content" source="../../../../assets/images/submission/validation-bot-notifications-relevant.png" alt-text="validation-bot-notification-relevant":::

:::image type="content" source="../../../../assets/images/submission/validation-bot-notifications-not-relevant.png" alt-text="validation-bot-notification-not-relevant":::

</details>
</br>
<details><summary>Bots and Adaptive Cards</summary>

Adaptive Cards are a highly recommended way to display bot messages. The cards must be lightweight and only include up to six actions. To display more content, consider using a task module or tab.

For more information about cards, see:

* [Designing Adaptive Cards](~/task-modules-and-cards/cards/design-effective-cards.md)
* [Cards reference](~/task-modules-and-cards/cards/cards-reference.md#types-of-cards)

Bot experience must be fully responsive on mobile. Bot responses must provide a way forward where applicable. Bot musts be responsive and fail with a graceful error message for failures. Bot messages sent in the personal scope to user's base on triggers in a collaborative scope must provide contextual information (including the message’s origin).

</details>
</br>

<details><summary>Notification only bots</summary>

Apps that consist of notification only bots provide user value by triggering user notifications based on certain triggers or events in the core app or backend. For example, a new sales lead or prospect is added for the sales team to follow up on. A high-quality notification only bot notifies the users regularly on certain event completions such as workflow completions or alerts.

A notification provides value in Teams if:

1. Posted card or text provides adequate details requiring no further user action.
1. Posted card or text provides adequate preview information for a user to take action or decide to view further details in a link opening outside Teams.

Apps that provide only notifications with content such as, **You have a new notification**, **click to view** and require the user to navigate outside Teams for everything else don't provide significant value within Teams.

   :::image type="content" source="../../../../assets/images/submission/validation-bot-notification-only-inadequete-info.png" alt-text="Screenshot shows an example of a notification only bit with inadequate information in the preview.":::

> [!TIP]
> Preview information and provide basic in line user actions in the posted card so that the user isn't required to navigate outside Teams for all actions (irrespective of complexity).

</details>
<br/>

<details><summary>Bot metadata information</summary>

* Bot information in the app manifest (bot name, logo, privacy link, and terms of service link) must be consistent with the Bot Framework metadata. [*Mandatory Fix*]

* Bot ID must match in the app manifest and Bot Framework metadata. [*Mandatory Fix*]

* Ensure that the bot ID in the app manifest matches with bot ID in the last store published version of your app. Changing bot IDs in an app update leads to permanent loss of all user interaction history with the bot for existing users of your app and starts a new conversation chain with the new Bot ID. [*Mandatory Fix*]

* Any change to app name, metadata, bot welcome message, or bot responses must be updated with new name. [*Mandatory Fix*]

* App name in the bot welcome message or bot responses must match the app name in the manifest. [*Mandatory Fix*]

</details>
<br/>

<details><summary>Bot in collaborative scope</summary>

* Bot installation in a channel or group chat scope to obtain the team roster for sending proactive notifications for users as 1:1 chats for team specific triggers isn't allowed. For example, app that pairs people for a meetup. [*Mandatory Fix*]

* Bot in channel or group chat only used to obtain the messages or posts in Channel or group chat for sending proactive notifications for users as 1:1 chats isn't allowed. [*Mandatory Fix*]

* Bots installed in collaborative scope must provide a user value in the collaborative scope. [*Mandatory Fix*]

</details>

[Back to top](#microsoft-teams-store-validation-guidelines)

## Message extensions

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: This section is in line with [Microsoft commercial marketplace policy number 1140.4.4](/legal/marketplace/certification-policies#114044-messaging-extensions).

If your app includes a message extension, ensure that it adheres to these guidelines.

> [!TIP]
> For more information on creating a high-quality app experience, see the [Teams message extension design guidelines](~/messaging-extensions/design/messaging-extension-design.md).

<br/>

<details><summary>Messaging extensions design guidelines</summary>

* If your Teams app uses the messaging extension capability, your app must follow the [Messaging extension design guidelines](../../../../messaging-extensions/design/messaging-extension-design.md).

   :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-design-guidelines-fail.png" alt-text="Graphic shows an example of an app not meeting extension guidelines.":::

* Messaging extensions are shortcuts for inserting app content or acting on a message without navigating away from the conversation. Keep your messaging extension simple and display only the components required to effectively complete the action. Complete website mustn't be I-framed within the messaging extension. [*Mandatory Fix*]

* Preview images in Adaptive Cards in messaging extensions must load properly. [*Mandatory Fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-preview-image-adaptive-card-loading.png" alt-text="Graphic shows an example of preview image loading in adaptive card.":::

  :::image type="content" source="../../../../assets/images/submission/validation-preview-image-adaptive-card-not-loading.png" alt-text="Graphic shows an example of preview image not loading in adaptive card.":::

* Messaging extension response card must include the app icon to avoid end user confusion. [*Mandatory Fix*]

* Your app mustn't have any broken functionality. App mustn't dead-end or block the user from completing a workflow in a messaging extension. [*Mandatory Fix*]

* Messaging extensions must respond or work as intended in group chat and channel scopes. [*Mandatory Fix*]

* You must include a way for the user to sign in or sign out from the messaging extension. [*Mandatory Fix*]

</details>
</br>

<details><summary>Action commands for Action-based message extensions</summary>

Action-based message extensions must do the following:

* Allow users to trigger actions on a message without completing intermediate steps, such as sign in.

    :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-no-intermediate-step.png" alt-text="validation-messaging-extension-no-intermediate-steps":::

    :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-intermediate-step-available.png" alt-text="validation-messaging-extension-intermediate-steps-available":::

* Pass the message context to the next work state. [*Mandatory Fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-app-passes-message.png" alt-text="validation-messaging-extension-app-passes-messages":::

    :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-app-doesnot-pass-message.png" alt-text="validation-messaging-extension-app-doesnot-pass-messages":::

* Incorporate the host app name instead of a generic verb for action commands triggered from a chat message, channel post, or call to action within apps. For example, use **Start a Skype Meeting** for **Start Meeting**, **Upload file to DocuSign** for **Upload file**. [*Suggested Fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-action-command-host-name.png" alt-text="Graphic shows an example of host app name for an action command.":::

    :::image type="content" source="../../../../assets/images/submission/validation-messaging-extension-action-command-verb.png" alt-text="Graphic shows an example of generic verb for an action command.":::

* Invoking a message action must allow the user to complete the workflow. Errors, blank responses, or continuous loading indicators to make the message action functional as intended mustn't be present. [*Mandatory Fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-continous-loading-indicator-action-command.png" alt-text="Graphic shows an example of continuous loading indicator when a bot invokes an action command.":::

* Duplicate action commands mustn't be present. [*Mandatory Fix*]

* Message actions must allow the user to complete the workflow as intended without an invalid response. [*Mandatory Fix*]

* Apps with only action-based messaging extension must have the following end state:

  * Post a relevant action as a notification either in the context where message extension is invoked or in 1:1 bot chat based on user scenario. [*Mandatory Fix*]

  * Allow users to share cards with other users based on the action taken. This is to ensure that apps don't take silent actions. For example, a ticket is created based on a message in a channel, but the app doesn't send a notification or doesn't provide a way to request the user to share ticket details after the ticket is created. [*Mandatory Fix*]

</details>
</br>

<details><summary>Preview links (link unfurling)</summary>

[*Mandatory Fix*]

* Message extensions must preview recognized links in the Teams compose box. Don't add domains that are outside your control (either absolute URLs or wildcards). For example, `yourapp.onmicrosoft.com` is valid but `*.onmicrosoft.com` isn't valid. Top-level domains also are prohibited. For example, `*.com` or `*.org`. [*Mandatory Fix*]

* Apps must only declare that are under the app publisher’s direct ownership in the `messageHandler` link unfurling section of the manifest. It mustn’t contain `*.botframework.com.` [*Mandatory Fix*]

</details>
</br>

<details><summary>Search commands</summary>

* Search based message extensions must provide text that helps the users to search effectively. [*Mandatory Fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-search-commands-text-available.png" alt-text="Graphic shows an example of a message extension with help text for users to search effectively.":::

    :::image type="content" source="../../../../assets/images/submission/validation-search-commands-text-not-available.png" alt-text="Graphic shows an example of a message extension without help text for users to search effectively.":::

* @mention executables must be clear, easy to understand, and readable.

    :::image type="content" source="../../../../assets/images/submission/validation-search-command-unclear-executable.png" alt-text="validation-search-commands-unclear-executable":::

</details>
</br>

<details><summary>Action commands for Search based message extension</summary>

[*Mandatory Fix*]

Apps that consist of search-based message extension provide user value by sharing cards that allow for contextual conversations without context switching.

To pass validation for a search-based message extension only app, the following are required as baseline to ensure that the user experience isn't broken. A card shared via a message extension provides value in Teams if:

1. Posted card provides adequate details requiring no further user action.
1. Posted card provides adequate preview information for a user to take action or decide to view further details in a link opening outside Teams.

    :::image type="content" source="../../../../assets/images/submission/validation-search-based-messaging-ext-adequete-info.png" alt-text="validation-search-base-messaging-ext-adequete-info":::

    :::image type="content" source="../../../../assets/images/submission/validation-search-based-messaging-ext-inadequete-info.png" alt-text="validation-search-base-messaging-ext-inadequete-info":::

Link unfurling only apps don't provide significant value within Teams. Consider building additional workflows in your app, if your app only supports link unfurling and has no other functionality.

</details>

[Back to top](#microsoft-teams-store-validation-guidelines)

## Task modules

[*Mandatory Fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: This section is in line with [Microsoft commercial marketplace policy number 1140.4.5](/legal/marketplace/certification-policies#114045-task-modules).
<br></br>
<details><summary>Expand to know more</summary>

A task module must include an icon and the short name of the app it's associated with. Task modules mustn't embed an entire app and only display the components required to complete a specific action.

For more information, see [Teams task module design guidelines](~\task-modules-and-cards\task-modules\design-teams-task-modules.md).

:::image type="content" source="../../../../assets/images/submission/validation-task-module-displays-components.png" alt-text="validation-task-module-displays-component":::

:::image type="content" source="../../../../assets/images/submission/validation-task-module-embeds-app.png" alt-text="validation-task-module-embed-app":::

> [!TIP]
> For more information on creating a high-quality app experience, see [Teams task module design guidelines](~/task-modules-and-cards/task-modules/design-teams-task-modules.md).

</details>

[Back to top](#microsoft-teams-store-validation-guidelines)

## Meeting extensions

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: This section is in line with [Microsoft commercial marketplace policy number 1140.4.6](/legal/marketplace/certification-policies#114046-meeting-extensions).
> [!TIP]
> For more information on creating a high-quality app experience, see the [Teams meeting extension design guidelines](~/apps-in-teams-meetings/design/designing-apps-in-meetings.md).

</br>
<details><summary>Meeting extension design guidelines</summary>

* Your Teams apps must follow [Meeting extension design guidelines](../../../../apps-in-teams-meetings/design/designing-apps-in-meetings.md).

* With the in-meeting app experience, you can engage participants during the meeting by using in-meeting tabs, dialog box, and the in-meeting share to stage feature. If your app supports Teams meeting extension, you must provide a responsive in-meeting experience aligned with the Teams meeting experience. [*Mandatory Fix*]

* Meeting extensibility apps must offer a responsive in-meeting experience aligned to the Teams meeting experience. In-meeting experience is mandatory for a Teams app that supports meeting extensibility but, pre- and post-meeting experiences aren't mandatory. [*Mandatory Fix*]

  * With the pre-meeting app experience, users can find and add meeting apps. Users can also perform pre-meeting tasks such as developing a poll to survey the meeting participants. If your app provides a pre-meeting experience, it must be relevant to the workflow of the meeting.

  * With the post-meeting app experience, users can view the results of the meeting such as, poll survey results or feedback and other app content. If your app provides a post-meeting experience, it must be relevant to the workflow of the meeting.

  * With the in-meeting app experience, you can engage meeting participants during the meeting and enhance the meeting experience for all the attendees. Attendees mustn't be taken outside the Teams meeting for completing core user workflows of your app.

   :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-outside-teams-core-workflows.png" alt-text="Graphic shows an example of an in-meeting experience redirecting user outside Teams for completing core app functionality.":::

* Your app must offer value beyond providing only custom Together Mode scenes in Teams. [*Mandatory Fix*]

* You must declare `groupChat` as a scope under `configurableTabs` and `meetingDetailsTab`, `meetingChatTab`, and `meetingSidePanel` as a context property in the manifest to enable your app for meetings on Teams mobile. [*Mandatory Fix*]

* Meeting canvases mustn't dead-end a meeting attendee. Meeting canvases must show a graceful failure message for app limitations such as, region specific dependency. [*Mandatory Fix*]

* The meeting canvas’ header must display the correct app name to avoid confusing the meeting attendee. [*Mandatory Fix*]

* You must include an option for the user to sign out or log out from the meeting extension. [*Mandatory Fix*]

* Meeting tabs on mobile platforms must include relevant workflows. Blank pages mustn't be present in a meeting tab. [*Mandatory Fix*]

* Meeting stage is a focused, intuitive, and collaborative participation canvas. Meeting stage mustn't embed the complete website experience. [*Mandatory Fix*]

* App mustn't show continuous loading screen, error, or broken functionality that dead-ends the user or blocks completion of a workflow in a meeting scenario. [*Mandatory Fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-app-shows-continous-loading-screen.png" alt-text="Graphic shows an example of continuous loading screen in an app.":::

* App mustn't open a new Teams instance on starting a meeting. Meeting canvases are an extension of the Teams capabilities that promote real time collaboration and new meetings must always open within the currently active Teams instance. [*Mandatory Fix*]

* Meeting apps must complete workflows within the Microsoft Teams platform without redirecting to competitor chat based platforms. [*Mandatory Fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-apps-redirecting-competitor-chat-platform.png" alt-text="Graphic shows an example of an app redirecting to competitor chat based platform.":::

* If your app supports role based views and certain workflows are unavailable to all participants, we recommend that you implement proper messaging for participants in tab and side-panel stating that the app is currently for organizer's view and provide details about how the attendees will receive the meeting notes, action items, and update agendas. [*Mandatory Fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-way-forward-not-available-for-role-based-views.png" alt-text="Graphic shows an example of an app without a way forward for participants in a role based view.":::

</details>
<br/>

<details><summary>Pre- and post-meeting experience</summary>

* Pre and post meeting screens must adhere to general tab design guidelines. For more information, see [Teams design guidelines](~/tabs/design/tabs.md). [*Mandatory Fix*]
* Tabs must have an organized layout when displaying multiple items. For example, more than 10 polls or surveys, see [example layout](~/apps-in-teams-meetings/design/designing-apps-in-meetings.md#after-a-meeting). [*Mandatory Fix*]
* Your app mustn'tify users when the results of a survey or poll are exported by stating, **Results successfully downloaded**. [*Mandatory Fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-meeting-experience-tab-design-guidelines-fail.png" alt-text="Graphic shows an example of tab not following tab design guidelines.":::

</details>

</br>
<details><summary>In-meeting experience</summary>

* Apps must only use a dark theme during meetings. For more information, see [Teams design guidelines](~/apps-in-teams-meetings/design/designing-apps-in-meetings.md#theming). [*Mandatory Fix*]
* A tooltip must display the app name when hovering over the app icon during meetings. [*Mandatory Fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-exp-display-app-name.png" alt-text="validation-in-meeting-exp-display-app-names":::

* Message extensions must function the same during meetings as they do outside meetings. [*Mandatory Fix*]

</details>

</br>
<details><summary>In-meeting tabs</summary>

* Must be responsive. [*Mandatory Fix*]
* Must maintain padding and component sizes. [*Mandatory Fix*]
* Must have a back button if there's more than one layer of navigation. [*Mandatory Fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-exp-back-button.png" alt-text="Graphic shows an example of back button present.":::

    :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-exp-back-button-absent.png" alt-text="Graphic shows an example of back button not present.":::

* Must not include more than one close button. It may confuse users since there's already a built-in header button to dismiss the tab. [*Mandatory Fix*]
* Must not have Horizontal scroll. [*Mandatory Fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-tab-vertical-scroll.png" alt-text="Graphic shows an example of in-meeting tab with vertical scroll.":::

  :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-tab-horizontal-scroll.png" alt-text="Graphic shows an example of in-meeting tab with horizontal scroll.":::

</details>

</br>
<details><summary>In-meeting dialogs</summary>

* Must be used sparingly and for scenarios that are light and task oriented. [*Mandatory Fix*]
* Must display content in a single column and not have multiple navigation levels. [*Mandatory Fix*]

  :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-single-column-layout.png" alt-text="Graphic shows an example of single column layout for in-meeting dialog.":::

  :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-multiple-column-layout.png" alt-text="Graphic shows an example of multiple column layouts for in-meeting dialog.":::

* Must not use task modules. [*Mandatory Fix*]
* Must align with the center of the meeting stage. [*Mandatory Fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-in-meeting-dialog-not-aligned.png" alt-text="Graphic shows an example of in-meeting dialog not aligning with the center of meeting stage.":::

* Must be dismissed after a user selects a button or performs an action. [*Mandatory Fix*]

* **Together mode**: Ensure that you consider the following best practices for a scene building experience: [*Mandatory Fix*]
  * All images are in .png format.
  * The final package with all the images put together mustn't exceed 1920x1080 resolution. The resolution is an even number. This resolution is a requirement for scenes to be shown successfully.
  * The maximum scene size is 10 MB.
  * The maximum size of each image is 5 MB. A scene is a collection of multiple images. The limit is for each individual image.
  * Select **Transparent** as required. This checkbox is available on the right panel when an image is selected. The overlapping images must be marked as Transparent to indicate that they're overlapping images in the scene.

</details>

</br>
<details><summary>Shared Meeting Stage</summary>

To use the **shareAppContentToStage** API, you must declare the correct RSC permissions. In the app manifest, you must configure the `authorization` property. Update the `name` property as `MeetingStage.Write.Chat` and `type` property as `Delegated` in the `resourceSpecific` field. [*Mandatory Fix*]

Shared meeting stage feature can only be launched through the Teams desktop app. However, the shared meeting stage consumption experience must be usable and not broken when viewed on mobile devices. [*Mandatory Fix*]

</details>

[Back to top](#microsoft-teams-store-validation-guidelines)

## Notifications

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: This section is in line with [Microsoft commercial marketplace policy number 1140.4.7](/legal/marketplace/certification-policies#114047-notification-apis).

If your app uses the [activity feed APIs provided by Microsoft Graph](/graph/teams-send-activityfeednotifications), ensure that it adheres to the following guidelines.

> [!TIP]
> If your apps supports notification scenarios where the notifications are triggered after long intervals, for example, after one day or one month. Before you submit for review, ensure that you trigger such notifications in the background for us to test the notifications.

<br></br>

<details><summary>Notification design guidelines</summary>

* Your Teams apps must follow [activity feed notifications design guidelines](/graph/teams-send-activityfeednotifications).

* Irrelevant, improper, unresponsive, or broken workflow mustn't be present after user selects a notification in Teams activity feed. Users mustn't be blocked from completing a workflow after they select an activity feed notification. [*Mandatory Fix*]

* Include your app’s name in the activity feed notification for end-users to understand the source or trigger for the notification without confusion. [*Mandatory Fix*]

* App must trigger notifications for all the notification scenarios mentioned in the app long description, app first run experience, and in scenarios declared under `activityTypes` in the manifest. [*Mandatory Fix*]

* Notifications must display within five seconds of user action. [*Mandatory Fix*]

* You must call out notification limitations (if any) in your app long description or in the app’s first run experience. [*Mandatory Fix*]

</details>
<br/>

<details><summary>General</summary>

* All the notification triggers specified in your app configuration must work. [*Mandatory Fix*]
* Notifications must be localized per the supported languages configured for your app. [*Mandatory Fix*]
* Notifications must display within five seconds of user action. [*Mandatory Fix*]
* Notifications must be localized as per the supported languages for all the platforms where your app is compatible. [*Mandatory Fix*]

</details>
</br>

<details><summary>Avatars</summary>

* The notification avatar must match your app's color icon. [*Mandatory Fix*]
* Notifications triggered by a user must include the user's avatar. [*Mandatory Fix*]

</details>
</br>
<details><summary>Spamming</summary>

* Apps mustn't send more than 10 notifications per minute to a user. [*Mandatory Fix*]
* Bots and the activity feed mustn't trigger duplicate notifications. [*Mandatory Fix*]
* Notifications must provide some value to users and not be used for trivial or irrelevant events. [*Mandatory Fix*]

</details>
</br>
<details><summary>Navigation and layout</summary>

* Notifications must adhere to the Teams activity feed layout and experience. [*Mandatory Fix*]
* When selecting a notification, the user must be directed to relevant content within Teams. [*Mandatory Fix*]

</details>

[Back to top](#microsoft-teams-store-validation-guidelines)

## Microsoft 365 App Compliance Program

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: This section is in line with [Microsoft commercial marketplace policy number 1140.6](/legal/marketplace/certification-policies#11406-publisher-attestation).
<br></br>
<details><summary>Expand to know more</summary>

The Microsoft 365 App Compliance Program is intended to help organizations assess and manage risk by evaluating security and compliance information about your app. If you're publishing an app to the Teams store, you must complete the following tiers of the program:

* **Publisher Verification**: Helps admins and end users understand the authenticity of app developers integrating with the Microsoft identity platform. When completed, a blue **verified** badge displays on the Azure Active Directory consent dialog and other screens. For more information, see [Mark your app as publisher verified](/azure/active-directory/develop/mark-app-as-publisher-verified). [*Mandatory Fix*]

    :::image type="content" source="../../../../assets/images/submission/validation-365-compliance-publisher-verification.png" alt-text="Graphic shows an example of a blue verified badge on the Azure Active Directory consent dialog.":::

* **Publisher Attestation**: A process in which you share general, data handling, and security and compliance information to help potential customers make informed decisions about using your app. [*Suggested Fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: If you're submitting an app that hasn't been listed previously, you can't officially complete Publisher Attestation until your app is in the Teams store. If you're updating a listed app, complete Publisher Attestation before you submit the latest version of the app.

</details>

[Back to top](#microsoft-teams-store-validation-guidelines)

## Advertising

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png"::: This section is in line with [Microsoft commercial marketplace policy number 1140.7](/legal/marketplace/certification-policies#11407-advertising).

Apps mustn't display advertising, including dynamic ads, banner ads, and ads in message. [*Mandatory Fix*]

:::image type="content" source="../../../../assets/images/submission/validation-advertising-banners.png" alt-text="Graphic shows an example of a failed scenario of advertising in Teams.":::

[Back to top](#microsoft-teams-store-validation-guidelines)

## Cryptocurrency based apps

You must demonstrate compliance with all laws where your app is distributed, if your app: [*Mandatory Fix*]

* Facilitates cryptocurrency transactions or transmissions within the app.

* Promotes cryptocurrency related content.

* Enables users to store or access their stored cryptocurrency.

* Encourages or enables users to complete a cryptocurrency based transaction or transmission outside the Teams platform.

* Encourages or facilitates mining of cryptocurrency tokens.

* Facilitates user participation in Initial Coin Offerings.

* Rewards or incentivizes users with cryptocurrency tokens for completing a task.

After an internal Microsoft review, if the compliance demonstration is satisfactory, Microsoft may proceed with further certification of your app. If the compliance demonstration is unsatisfactory, Microsoft will keep you informed of the decision to not proceed with certification of your app.

[Back to top](#microsoft-teams-store-validation-guidelines)

## App functionality

* Workflows or content in the app must be related to the scope. [*Mandatory Fix*]
* All app capabilities must be functional and must work properly as described in the AppSource or manifest long description. [*Mandatory Fix*]
* Apps must always notify the user before downloading any file or executable on the user’s environment. Any call to action (CTA), either text based or otherwise, that makes it clear to the user that a file or executable is downloaded on user action is allowed in the app. [*Mandatory Fix*]
* Apps with region dependency must notify the users with a graceful failure message in all applicable capabilities if they attempt to use it in an unsupported region. [*Mandatory Fix*]

[Back to top](#microsoft-teams-store-validation-guidelines)

## Mobile experience

* Mobile add-ins must be free. There mustn't be any in-app content or links that promote upselling, online stores, or other requests for payment. Any accounts required for apps must have no charge for use and if time-limited, mustn't include any content indicating a need to pay. [*Mandatory Fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-mobile-add-in-charges.png" alt-text="Graphic shows an example of a mobile add-in asking for payment.":::

* Use of the word **FREE**, **FREE TRIAL**, or **TRY FREE** is allowed on desktop or web app experience without any limitation or consideration.

* Use of the word **FREE** as plain text in the context of a trial or app upgrade is allowed on mobile.

* Use of the word **FREE** in the context of a trial or app upgrade with a link that leads to a landing page without payment or pricing information is allowed on mobile. Plain text to signal app is **PAID** is allowed on mobile.

* Use of the word **FREE** as plain text in the context of a trial or app upgrade and associated with pricing details isn't allowed on mobile. [*Mandatory Fix*]

* Use of the word **FREE** in the context of a trial or app upgrade and associated with a link that leads to a landing page with pricing information or payment details on mobile isn't allowed. [*Mandatory Fix*]

* Pricing details on mobile in any format, for example, image, text, or link isn't allowed. CTA such as **view plans** on mobile isn't allowed. Information about plans without pricing details but with a contact link or email on mobile isn't allowed. Any text with contact details linking or alluding to a paid upgrade isn't allowed on mobile. Payments for physical goods are allowed on mobile. For example, your app can allow payment to book a taxi. [*Mandatory Fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-mobile-exp-pricing-details-on-mobile-fail.png" alt-text="Graphic shows an example of pricing details on mobile.":::

* Payments for digital goods in app aren't allowed on mobile. [*Mandatory Fix*]

   :::image type="content" source="../../../../assets/images/submission/validation-mobile-exp-payments-digital-goods.png" alt-text="Graphic shows an example of payments for digital goods on mobile.":::

* Teams apps must offer an appropriate cross-device mobile experience. [*Mandatory Fix*]

* Capabilities that aren't supported on mobile mustn't dead-end a user and must provide a graceful failure message where applicable. [*Mandatory Fix*]

[Back to top](#microsoft-teams-store-validation-guidelines)

## Next step

> [!div class="nextstepaction"]
> [Create a Partner Center account](~/concepts/deploy-and-publish/appsource/prepare/create-partner-center-dev-account.md)

## See also

* [Test and debug your app](~/concepts/build-and-test/debug.md)
* [Distribute your app](~/concepts/deploy-and-publish/apps-publish-overview.md)
* [Prepare your store submission](~/concepts/deploy-and-publish/appsource/prepare/submission-checklist.md)
* [Include a SaaS offer with your Teams app](include-saas-offer.md)
* [Strategize and execute growth for your app](../post-publish/app-growth/overview-app-growth.md)
