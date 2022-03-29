---
title: Microsoft Teams store validation guidelines
description: Describes the guidelines every app submitted to the Teams store (AppSource) must follow.
author: heath-hamilton
ms.author: surbhigupta
ms.topic: reference
ms.localizationpriority: high
---
# Microsoft Teams store validation guidelines

Following these guidelines increases the chances of your app to pass the Microsoft Teams store submission process. The Teams-specific guidelines complement the Microsoft [commercial marketplace certification policies](/legal/marketplace/certification-policies) and are updated frequently to reflect new capabilities, user feedback, and business rule changes.

> [!NOTE]
>
> * Some guidelines may not be applicable to your app. For example, if your app doesn't include a bot, you can ignore bot-related guidelines.
> * We've cross-referenced these guidelines to the Microsoft commercial certification policies and added Do’s and Don’ts with examples from pass or fail scenarios encountered in our validation process.
> * Certain guidelines are marked as *Mandatory Fix*. If your app submission doesn't meet these mandatory guidelines, you'll receive a failure report from us with steps to mitigate. Your app submission will pass Microsoft Teams store Validation only after you have fixed the issues.
> * Other guidelines are marked as *Suggested Fix*. For an ideal user experience, we suggest that you fix the issues, however, your app submission will not be blocked from publishing on the Teams store, if you choose not to fix the issues.

## Value proposition

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png" border="false"::: This section is inline with [Microsoft commercial certification policy number 1140.1](/legal/marketplace/certification-policies#11401-value-proposition-and-offer-requirements) and provides additional guidance to developers of Microsoft Teams apps on their offer’s value proposition.

### App name

[*Mandatory Fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png" border="false"::: This section is inline with Microsoft [commercial certification policy number 1140.1.1](/legal/marketplace/certification-policies#114011-app-name) and provides additional guidance to developers on naming their apps.

An app's name plays a critical role in how users discover it in the store. Use the following guidelines to name an app:

* The name must include terms relevant to your users.
* Names of core Teams features must not be included in your app name, such as:  
  * **Chat**
  * **Contacts**
  * **Calendar**
  * **Calls**
  * **Files**
  * **Activity**
  * **Apps**
  * **Help**
* Prefix or suffix common nouns with the developer's name. For example, **Contoso Tasks** instead of **Tasks**.
* Must not use **Teams** or other Microsoft product names such as Excel, PowerPoint, Word, OneDrive, SharePoint, OneNote, Azure, Surface, Xbox, and so on that could falsely indicate co-branding or co-selling. For more information about referencing Microsoft software products and services, see [Microsoft Trademark and Brand Guidelines](https://www.microsoft.com/legal/intellectualproperty/trademarks/usage/general).
* If your app is part of an official partnership with Microsoft, the name of your app must come first. For example, **Contoso Connector for Microsoft Teams**.
* Must not copy the name of an app listed in the store or other offer in the commercial marketplace.
* Must not contain profane or derogatory terms. The name also must not include racially or culturally insensitive language.
* Must be unique. If your app (Contoso) is listed in the Microsoft Teams store and  Microsoft AppSource and you want to list another app specific to a geography, such as Contoso Mexico, your submission must meet the following criteria:
  * Call out the app's region-specific functionality in the title, metadata, first response app experience, and help sections. For example, title must be Contoso Mexico. App title must clearly differentiate an existing app from the same developer to avoid end-user confusion.
  * When uploading the app package in Partner Center, select the right **Markets** where the app will be available in the **Availability** section.

 > [!TIP]  
 > Your app’s branding on the Microsoft Teams store and Microsoft AppSource including your app name, developer name, app icon, Microsoft AppSource screenshots, video, short description and website either separately or taken together must not impersonate an official Microsoft offering unless your app is an official Microsoft 1P offering.

### Suitable for workplace consumption

[*Mandatory Fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png" border="false"::: This section is inline with Microsoft commercial certification policy number [1140.1.2](/legal/marketplace/certification-policies#114012-workplace-appropriateness), [100.8](/legal/marketplace/certification-policies#1008-significant-value), and [100.10](/legal/marketplace/certification-policies#10010-inappropriate-content) and provides additional guidance to developers on building workplace appropriate apps.

App content must be suitable for general workplace consumption and follow all restrictions listed in the commercial marketplace certification policies. Content related to religion, politics, gambling, and prolonged entertainment is prohibited.

Your app must enable group collaboration, improve an individual's productivity, or both. Apps intended for team bonding and socializing must be collaborative and designed for multiple participants. The apps must not require a substantial time investment of over 60 mins per session or affect productivity.

### Similar platforms and services

[*Mandatory Fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png" border="false"::: This section is inline with [Microsoft commercial certification policy number 1140.1.3](/legal/marketplace/certification-policies#114013-other-platforms-and-services).

Apps must focus on the Teams experience and not include the names, icons, or imagery of other similar chat-based collaboration platforms or services within the app content or in the app’s metadata unless the app provides specific interoperability.

### Feature names

App feature names in buttons and other UI text must not duplicate with terminology reserved for Teams and other Microsoft products. For example, **Start meeting**, **Make call**, or **Start chat**. If necessary, include your app name, such as **Start Contoso meeting**.

### Authentication

[*Mandatory Fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png" border="false"::: This section is inline with [Microsoft commercial certification policy number 1140.1.4](/legal/marketplace/certification-policies#114014-access-to-services) and provides guidance to developers on authenticating their apps with external services.

For more information on how to implement app authentication, see [authentication in Teams](~/concepts/authentication/authentication.md).

#### Authenticating with external services

If your app authenticates users with an external service, follow these guidelines:

* **Sign in, sign out, and sign up experiences**:
  * Apps that depend on external accounts or services must provide clear and simple sign in, sign out, and sign up experience.
  * When users sign out, they must sign out only from the app and remain signed in to Teams.
  * Apps that depend on external accounts or services must provide a way forward for new users to sign up or contact the app publisher to learn more about the services and get access to the services.
  Way forward must be available in the app’s manifest, AppSource long description, and app first run experience (bot welcome message, tab setup or config page).
  * Apps that require tenant admin to complete one time setup must call out dependency on tenant admin to configure the app (before any other tenant user can install and use the app).  
  Dependency must be called out in the app’s manifest, AppSource long description, all first run experience touchpoints (bot welcome message, tab setup or config page), help text as considered necessary as part of bot response, compose extension, or static tab content.
  
* **Content sharing experiences**: Apps that require authentication with an external service to share content in Teams channels must clearly state in the help documentation (or similar resources) on how to disconnect or unshare content if that feature is supported on the external service. This doesn't mean the ability to un share content must be present in your Teams app.

## Security


:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png" border="false"::: This section is inline with [Microsoft commercial certification policy number 1140.3](/legal/marketplace/certification-policies#11403-security).

### Financial information

[*Mandatory Fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png" border="false"::: This section is inline with [Microsoft commercial certification policy number 1140.3.1](/legal/marketplace/certification-policies#114031-financial-transactions) and provides guidance on transmission of financial information within the Teams interface and notifies developers of restricted payment scenarios on the mobile (Android  and iOS) version of their Teams app.

Apps must not ask users to make payments within the Teams interface and transmit financial information to users through a bot interface.  

:::row:::
   :::column span="":::
   :::column-end:::
   :::column span="3":::
     ![In App Payments](~/assets/images/submission/validation-financial-information-1.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

You may provide link to secure external payment services only if you disclose it in your terms of use, privacy policy, profile page, or website before the user agrees to use the app.

Don't facilitate payments through an app for goods or services prohibited by [General policy number 100.10 Inappropriate content](/legal/marketplace/certification-policies#10010-inappropriate-content).

Apps running on the iOS or Android version of Teams must adhere to the following guidelines:

* Apps must not include in-app purchases, trial offers, or UI that aims to upsell users to paid versions or online stores to purchase other content, apps, or add-ins.

:::row:::
   :::column span="":::
   :::column-end:::
   :::column span="3":::
     ![In-app Purchases](~/assets/images/submission/validation-financial-information-in-app-purchase.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::
   :::column-end:::
   :::column span="3":::
     ![Online Stores](~/assets/images/submission/validation-financial-information-online-stores.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

* If your app requires an account, users can sign up for an account at no charge. The use of the term **free** or **free account** is prohibited.
* You can determine whether an account is active indefinitely or for a limited time. When the account expires the app must not show UI, text, or links indicating the need to pay.
* Your app's privacy policy and terms of use must be free of any commerce-related UI or links.

### Bots

[*Mandatory Fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png" border="false"::: This section is inline with [Microsoft commercial marketplace policy number 1140.3.2](/legal/marketplace/certification-policies#114032-bots-and-messaging-extension).

For apps that use the Microsoft Azure Bot Service (such as bots and messaging extensions), you must follow all requirements defined in the Microsoft [Online Services Terms](https://www.microsoftvolumelicensing.com/DocumentSearch.aspx?Mode=3&DocumentTypeId=46).

Bots must always ask permission to upload a file and display a confirmation message.

:::row:::
   :::column span="":::
   :::column-end:::
   :::column span="3":::
     ![Confirmation Message](~/assets/images/submission/validation-bot-confirmation-message.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

### External domains

[*Mandatory Fix*]

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png" border="false"::: This section is inline with [Microsoft commercial marketplace policy number 1140.3.3](/legal/marketplace/certification-policies#114033-external-domains) and provides developer guidance on usage of restricted domains in the `validDomains` manifest property.

Don't include domains outside of your organization's control (including wildcards) and tunneling services in your app's domain configurations. The following exceptions include:

* If your app uses the Azure Bot Service's OAuthCard, you must include `token.botframework.com` as a valid domain or the **Sign in** button won't work.
* If your app relies on SharePoint, you can include the associated root SharePoint site as a valid domain using the `{teamSiteDomain}` context property.

#### Government Community Cloud listings

To distribute your app to Government Community Cloud (GCC) users, the authentication process must identify and route users to a GCC-specific or expected URL while avoiding duplicate listings in the Teams store.

### Sensitive content

[*Mandatory Fix*]

Your app must not post sensitive data, such as credit card, financial payment details, health, contact tracing, or other personally identifiable information (PII) to an audience not intended to view the content.

App must warn users before downloading any files or executables (.exe) into the user's machine or environment.

## General functionality and performance

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png" border="false"::: This section is inline with [Microsoft commercial marketplace policy number 1140.4](/legal/marketplace/certification-policies#11404-functionality).

### Launching external functionality

[*Mandatory Fix*]

Apps must not take users out of Teams for core user scenarios. App content and interactions must occur within Teams capabilities, such as bots, Adaptive Cards, tabs, and task modules.

Link users within Teams app and not to an external site or app. For scenarios that require external functionality, your app must take explicit user permission to launch the functionality.

Button UI text that launches external functionality must include content to indicate the user is taken out of the Teams instance. For example, include text such as **This way to Contoso.com** or **View in Contoso.com**.

### Compatibility

[*Mandatory Fix*]

Apps must be fully functional on the latest versions of the following operating systems and browsers:

* Microsoft Windows
* macOS
* Microsoft&nbsp;Edge
* Google Chrome
* iOS
* Android

Your app must show a graceful failure message on unsupported browsers and operating systems.

### Response time

[*Mandatory Fix*]

Teams apps must respond within a reasonable timeframe or show a loading or typing indicator or message or warning.

* Tabs must respond within two seconds or display a loading message or warning.
* Bots must respond to user commands within two seconds or display a typing indicator.
* Messaging extensions must respond to user commands within two seconds.
* Notifications must display within two seconds of the user action.

## App package and store listing

[*Mandatory Fix*]

App packages must be correctly formatted and include all required information and components.

> [!TIP]  
> You must include the following detailed testing instructions for validating your app submission:
>
> * **Steps to configure the app test accounts** in case app depends on external accounts for authentication.
> * Summary of **expected app behavior** for the core workflows within Teams.
> * **Clearly describe Limitations**, conditions, or exceptions to the functionality, features, and deliverables in the app long description and related materials.
> * **Emphasis on any considerations** for testers while validating your app submission.  
> * **Pre-populate the test accounts with dummy data** to aid testing.

### App manifest

[*Mandatory Fix*]

The Teams app manifest defines your app's configuration.

* Your manifest must conform to a publicly released manifest schema. For more information, see [manifest reference](~/resources/schema/manifest-schema.md). Don't submit your app using a preview version of the manifest.
* If your app includes a bot or messaging extension, details in the app manifest must be consistent with Bot Framework metadata including bot name, logo, privacy policy link, and terms of service link.
* If your app uses Azure Active Directory for authentication, include the Microsoft Azure Active Directory (Azure AD) Application (client) ID in the manifest. For more information, see the [manifest reference](~/resources/schema/manifest-schema.md#webapplicationinfo).

### App icons

[*Mandatory Fix*]

Icons are one of the main elements people see when browsing the Teams store. Your icons must communicate your app's brand and purpose while adhering to the following requirements:

* Your app package must include two .png versions of your app icon: A color icon and an outline icon.
* The color version of your icon must be 192x192 pixels. Your icon symbol can be any color or colors, but it must sit on a solid or fully transparent square background.
* The outline version of your icon is displayed in the following scenarios:
  * When your app is in use and **hosted** on the app bar on the left side of Teams.
  * When a user pins your app's messaging extension.

* The outline must be 32x32 pixels and can be white with a transparent background or transparent with a white background. The icon must not have any extra padding around the symbol.

* Your app package must include correctly sized and formatted icons. The icons must match the information in store listing metadata.

For more information, see [icon guidelines](~/concepts/build-and-test/apps-package.md#app-icons).

### App descriptions

You must have a short and long description of your app. The descriptions in your app configurations and Partner Center must be the same.

Descriptions must not directly or through insinuation disparage another brand (Microsoft owned or otherwise). Ensure your description doesn't include claims that can't be substantiated. For example, **Guaranteed 200 percent increase in efficiency**.

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
* Ensure the app description matches with the functionality available inside Teams app. Any reference to workflows outside the Teams app must be limited and distinctly called out from the Teams app functionality.
* Include a help or support link.
* Refer to **Microsoft 365** instead of **Office 365**.
* If you need to reference **Teams**, write the first reference as **Microsoft Teams**. Later references can be shortened to **Teams**.
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
* Indicate the app is an offering from Microsoft, including using Microsoft slogans or taglines.
* Use copyrighted brand names that you don't own.
* Use the following language unless you're a certified Microsoft partner:
  * **... certified for ...**
  * **... powered by ...**
* Include typos, grammatical errors.
* Unnecessarily capitalize the entire manifest or AppSource long description or app content.
* Include links to AppSource.
* Make unverified claims. For example, best, top, and ranked, unless it comes with the source of the claim.
* Compare your offer with other marketplace offers.

### Screenshots

Screenshots provide a prominent visual preview of your app to complement your app name, icon, and descriptions. Remember the following:

* You can have up to five screenshots per listing.
* Supported file types include PNG, JPEG, and GIF.
* Dimensions must be 1366x768 pixels.
* Maximum size of 1,024 KB.

**Dos:**

* Focus on your app's capabilities. For example, how people can communicate with your bot.
* Include content that accurately represents your app.
* Use text judiciously.
* Frame screenshots with a color that reflects your brand and include marketing content.

**Don'ts:**

[*Suggested Fix*]

* Show specific devices, such as phones or laptops.
* Display chrome or UI that isn't in your app.
* Capture any Teams or browser UI in your screenshots.
* Include mockups that inaccurately reflect your app's actual UI, such as showing your app being used outside of Teams.

> [!TIP]  
> A video can be the most effective way to communicate why people must use your app. A video also is the first thing users see in your listing. For more information, see [create a video for your store listing](~/concepts/deploy-and-publish/appsource/prepare/submission-checklist.md#create-a-video).

### Privacy policy

[*Mandatory Fix*]

The privacy policy can be specific to your Teams app or an overall policy for all your services.

* If you use a generic privacy policy template, you must add a reference to **services**, **applications**, or **platforms in the scope of your privacy policy**. You don’t need to specify your Teams app in the scope, if you include a reference to **services**, **applications** and **platforms**. The app validation process will interpret these references to include your Teams app along with your other services or websites.
* Must include how you handle user data storage, retention, and deletion. You must describe the security controls for data protection.
* Must include your contact information.
* Must not include URLs that are broken or for beta or staging purposes.
* Must not include links to AppSource.
* Must not require authentication to access privacy policy.
* Must not include any commerce UI or store links.

### Terms of use

[*Mandatory Fix*]

Use the following guidelines to write the Terms of use:

* Must be specific and applicable to your offering.
* Must be hosted on your own domain.
* Must have a secure (HTTPS) link.
* Access to Terms of use must not require authentication.

### Support links

Your app's support URLs must not require authentication. For example, users must not login to contact you.

Support URLs must include your contact details or a way forward for users to raise a support ticket. For example, if your support URL is hosted on GitHub, the GitHub page must be under your ownership and must include your contact details or a way forward for users to raise a support ticket. [*Mandatory Fix*]

  ![Support URL](~/assets/images/submission/validation-supportlinks-authentication.png)  

### Localization

[*Mandatory Fix*]

If your app supports localization, your app package must include a file with language translations that display based on the Teams language setting. The file must conform to the Teams localization schema. For more information, see [Teams localization schema](~/concepts/build-and-test/apps-localization.md).

## Apps linked to SaaS offer

* ISVs must support the ability for multiple users (Subscribers) in the same tenant to manage their own subscription and assign licenses to users in the tenant.
*
 The offer must meet all the [technical requirements](/microsoftteams/platform/concepts/deploy-and-publish/appsource/prepare/include-saas-offer) for Teams apps linked to a SaaS offer.
* The Teams apps linked to SaaS offer must meet all the requirements defined in [1000 Software as a Service (SaaS)](/legal/marketplace/certification-policies#1000-software-as-a-service-saas).
* `subscriptionOffer` details mentioned in the manifest file must be correct. In your app manifest, add or update node `subscriptionOffer` with value `publisherId.offerId`. For example, if your publisher ID is `contoso1234` and your offer ID is `offer01`, the value that you specify in your app manifest must be `contoso1234.offer01`.
* Linked SaaS offer to the Teams app must be live in AppSource and preview offers aren't accepted for store approval.

### Offer metadata

* Offer metadata must match across the Teams manifest, the Teams app listing in AppSource, and the SaaS offer in AppSource.
* Teams app and SaaS offer must be from the same publisher or developer. The SaaS offer referenced in the App manifest must belong to the same publisher as the Teams app is submitted to the commercial marketplace.
* As your submitted offer is a Teams app linked to SaaS offer, you must select **Additional purchases** as **Yes, my product requires purchase of a service or offers additional in-app purchases​** in Partner Center product set-up section of your offer listing.
* Plan descriptions and pricing details must provide enough information for users to clearly understand the offer listings.
* Any limitations, dependencies on additional services and exceptions to features offered must be accurately called out in plan descriptions.
* The Teams apps linked to SaaS offer are designed to support licenses assigned on a named, per-user basis. Sometimes, the SaaS offer is built with other method or has specialized purchase flows. You must clearly mention in the app metadata and subscription plan details about the method and purchase flows.
* SaaS offer must provide messages and guidance to all users in all applicable states of purchase flow.

### SaaS offer home page and license management  

* Provide introduction to subscribers on how to use the product.
* Allow the subscriber to assign licenses.
* Provide different ways to engage with support for issues, such as FAQ, knowledge base, and email address.
* Validate users to ensure that they don’t already have license assigned through another user.
* Notify users after license assignment.
* Guide users through Teams chat bot or email, on how to add the app to Teams and get started.

### Usability and functionality  

* After successful purchase and assignment of licenses, you must provide the following:
* Access to users for subscribed plan features.
* Value addition and significant benefits of subscription plan to users.
* From your Teams app, provide link to the SaaS application home page for subscribers to manage the licenses in the future.

### Configure and test SaaS application

If setup of your app for testing purposes is complex, provide an end-to-end functional document, linked SaaS offer configuration steps, and instructions for license and user management as part of your "Notes for Certification".

> [!TIP]  
> You can add a video on how your app and license management works to assist the team for testing.

## Tabs

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png" border="false"::: This section is inline with [Microsoft commercial marketplace policy number 1140.4.2](/legal/marketplace/certification-policies#114042-tabs).
If your app includes a tab, ensure it adheres to these guidelines.
> [!TIP]
> For more information on creating a high-quality app experience, see [Teams tab design guidelines](~/tabs/design/tabs.md).

### Setup

* Tab setup **must not dead-end** a new user. Provide a message on how to complete the action or workflow. [*Mandatory Fix*]

:::row:::
   :::column span="":::
   :::column-end:::
   :::column span="3":::
    ![Create new account](~/assets/images/submission/validation-tabs-setup-create-new-account.png)  
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::
   :::column-end:::
   :::column span="3":::
     ![Missing Forward Guidance](~/assets/images/submission/validation-tabs-missing-forward-guidance.png)  
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::
   :::column-end:::
   :::column span="3":::
     ![New User Signup](~/assets/images/submission/validation-tabs-setup-new-user.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

* For the best first run experience, authenticate your users during the tab setup and not after. Authentication can happen outside the tab configuration window. [*Suggested Fix*]

* The user must not leave the tab configuration experience inside Teams to create content outside of Teams and then return to Teams to pin it. Tab configuration screen must explain the value of configuration and how to configure. [*Mandatory Fix*]

:::row:::
   :::column span="":::
   :::column-end:::
   :::column span="3":::
        ![Acquire Profile Name](~/assets/images/submission/validation-tabs-setup-profile-name.png)  
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

* Tab configuration screen must not embed an entire website. Keep your configuration experience focused. For example, if you're building a project management app that lets users configure a project in a channel, keep the tab configuration screen focused on allowing the user to select a project from your app to configure in the channel. [*Mandatory Fix*]

:::row:::
   :::column span="":::
   :::column-end:::
   :::column span="3":::
        ![Configuration Experience](~/assets/images/submission/validation-tabs-setup-configuration-experience.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::  

:::row:::
   :::column span="":::
   :::column-end:::
   :::column span="3":::
        ![Configuration Screen](~/assets/images/submission/validation-tabs-setup-configuration-screen.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

* Tab configuration screen must not ask users to embed a URL. Asking users to configure a URL during tab setup is a broken UX, user leaves tab configuration screen, acquires URL, returns to the configuration screen and inputs the URL. A preexisting Teams feature already allows users to pin a website link in the channel. If your app asks user to embed a website URL during tab configuration and the app is limited to display the entire website content in the channel tab, your app doesn't offer significant value to the user. [*Mandatory Fix*]

:::row:::
   :::column span="":::
   :::column-end:::
   :::column span="3":::
        ![Configured URL](~/assets/images/submission/validation-tabs-setup-configured-url.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::
   :::column-end:::
   :::column span="3":::
         ![Configured URL limited](~/assets/images/submission/validation-tabs-setup-configured-url-two.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

### Views

* The sign in screen area must not use large logos. [*Mandatory Fix*]

:::row:::
   :::column span="":::
   :::column-end:::
   :::column span="3":::
        ![View large logo](~\assets\images\submission\validation-views-applogin.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

* Content can be simplified by breaking down across multiple tabs. [*Suggested Fix*]

:::row:::
   :::column span="":::
   :::column-end:::
   :::column span="3":::
       ![Multiple Tabs](~/assets/images/submission/validation-views-multiple-tabs.png)  
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

* Tabs shouldn't have a duplicate header. Remove the duplicate logo from the iframe since the tab framework already displays the app icon and name. [*Suggested Fix*]

 :::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
       ![Duplicate Header Logo](~/assets/images/submission/validation-views-duplicate-header-logo.png)  
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::  

### Navigation

The following are the navigation guidelines:

* Tabs must not provide navigation that conflicts with the primary Teams navigation. If you provide a left navigation in your tab, it must not include only icons or icons with stacked text. It must not be a collapsible rail with the option to see icons with stacked text (mimicking the Teams navigation bar). Include icons with inline text or only text or use hamburger menus instead of tab left rail. [*Mandatory Fix*]

Design your app with [basic](~/concepts/design/design-teams-app-basic-ui-components.md) and [advanced](~\concepts\design\design-teams-app-advanced-ui-components.md) Fluent UI components.

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
        ![Left navigation](~/assets/images/submission/validation-navigation-left-navigation.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::  

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
      ![Icon and Text](~/assets/images/submission/validation-navigation-icon-text.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::  

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
     ![Collapsible Left Rail](~/assets/images/submission/validation-navigation-collapsable-left-rail.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
     ![Static Tab](~/assets/images/submission/validation-navigation-static-tab.png)  
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
     ![Horizontal Rail](~/assets/images/submission/validation-navigation-horizontal-rail.png)  
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

* Tabs with toolbar in left rail must leave 20px spacing from Teams left navigation. [*Mandatory Fix*]

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
     ![Spacing between Toolbar](~/assets/images/submission/validation-navigation-spacing-between-toolbar.png)  
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::  

* The secondary and third pages in a tab must be opened in a level two (L2) and level three (L3) view in the main tab area, which is navigated via breadcrumbs or left navigation. You can also include the following components to aid tab navigation: [*Mandatory Fix*]
  * Back buttons
  * Page headers
  * Hamburger menus
* Tab must not have a horizontal scroll. Whiteboarding apps and other apps that require a larger canvas to allow users to collaborate without a perceived broken app experience, can use horizontal scroll depending on their business need. [*Suggested Fix*]

* Deep links in tabs must not link to an external webpage but within Teams. For example, task modules or other tabs. [*Mandatory Fix*]

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
     ![View Button not Linked](~/assets/images/submission/validation-navigation-view-button-not-linked-static-tab.png)  
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

* Tabs must not allow users to navigate outside Teams for the core app experience. Tabs can redirect outside Teams for non-core workflows. For example, to raise a support ticket. [*Mandatory Fix*]

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
     ![Core Workflow within Configuration Tab](~/assets/images/submission/validation-navigation-core-workflow-within-configuration.png)  
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
     ![App Core Workflow Redirects Outside](~/assets/images/submission/validation-navigation-core-workflow-redirects-outside.png)  
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

### Usability

* Tabs must provide value beyond hosting an existing website. [*Mandatory Fix*]

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
     ![Usability App Provides Workflows](~/assets/images/submission/validation-usability-app-provides-workflows.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
      ![Usability Website I-Frame](~/assets/images/submission/validation-usability-website-i-framed.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
       ![Usability Teams app identical](~/assets/images/submission/validation-usability-teams-app-identical-website.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

* Content must not truncate or overlap within the tab.

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
       ![Usability Content Truncation](~/assets/images/submission/validation-usability-content-truncation.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

* Users must be able to undo their last action in the tab.

* Tabs in a personal context may aggregate content from shared instances of the app. For example, a project management app with a configurable tab that lets channel members comment on the project on Kanban cards, must aggregate this content and display in the personal app. [*Suggested Fix*]

* Tabs must be responsive to Teams themes. When a user changes the theme, the app's theme must reflect the selection.

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
       ![Usability Responsive tabs](~/assets/images/submission/validation-usability-responsive-tabs.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
        ![Usability unresponsive tabs](~/assets/images/submission/validation-usability-unresponsive-tabs.png)  
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

* Tabs must use Teams-styled components such as, Teams fonts, type ramps, color palettes, grid system, motion, tone of voice, and so on, whenever possible. For more information, see [tab design guidelines](/microsoftteams/platform/tabs/design/tabs). [*Suggested Fix*]

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
     ![Usability different font](~/assets/images/submission/validation-usability-app-uses-diff-font.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

* If your app functionality requires changes in settings, include a **Settings** tab. [*Suggested Fix*]
* Tabs must follow Teams interaction design such as, in-page navigation, position and use of dialogs, information hierarchies, and so on. For more information, see [Microsoft Teams Fluent UI kit](~/concepts/design/design-teams-app-basic-ui-components.md)

* Tab content in the iframe must not include features that mimic Teams core capabilities. For example, bots, messaging extensions, calling, meeting, and so on.

* Content in the landing page of the configurable tabs must be contextually same for all members of the channel.

* Content in the landing page of configurable tabs must not be scoped for individual use and not include personal content such as **My Tasks** or **My Dashboard**.

* If your app requires provision of a personal scope view for the user to enhance efficiency or workplace productivity, use filtered views, deep links to personal apps, or navigate to L2 or L3 views within the configurable tab and keep the landing page contextually the same for all the users.

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
      ![Usability Configurable tab personal Info](~/assets/images/submission/validation-usability-configurable-tab-personal-info.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::  

* Configurable tabs must have focused functionality.

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
      ![Usability Configurable Nested tabs](~/assets/images/submission/validation-usability-configurable-nested-tabs.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

* Tab experiences must be fully responsive on mobile (Android and iOS).

> [!TIP]
>
> * Include a personal bot alongside a personal tab.
> * Allow users to share content from their personal tab.

## Bots

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png" border="false"::: This section is inline with [Microsoft commercial marketplace policy number 1140.4.3](/legal/marketplace/certification-policies#114043-bots).

If your app includes a bot, ensure it adheres to these guidelines.

> [!TIP]
> For more information on creating a high-quality app experience, see [Teams bot design guidelines](~/bots/design/bots.md).

### Bot commands

Analyzing user input and predicting user intent is difficult. Bot commands provide users a set of words or phrases for your bot to understand.

* Listing supported bot commands in your app configurations is highly recommended. These commands display in the compose box when a user tries to message your bot.

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
      ![Bot Commands Listed](~/assets/images/submission/validation-bot-commands-listed.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::
  
:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
       ![Bot Commands not Listed](~/assets/images/submission/validation-bot-commands-not-listed.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

* All commands that your bot supports must work correctly, including generic commands such as **Hi**, **Hello**, and **Help**.

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
       ![Bot Help Command](~/assets/images/submission/validation-bot-help-command.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

* Bot commands must not lead a user to a dead end, the commands must always provide a way forward.

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
       ![Bot Command Dead](~/assets/images/submission/validation-bot-commands-deadend.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

> [!TIP]
> For personal bots, include a **Help** tab that further describes what your bot can do.

### Bot welcome messages

* If the app has a complex configuration flow (requires an enterprise license or lacks an intuitive sign up flow), then bots in such apps must always send a welcome message during the first run. For best experience, the welcome message must include the value offered by the bot to users, who installed the bot in channel, how to configure the bot and briefly describe all supported bot commands. You can display the welcome message using an Adaptive Card with buttons for better usability. For more information, see [how to trigger a bot welcome message](~/bots/how-to/conversations/send-proactive-messages.md). For apps without a complex configuration flow, you can choose to trigger a welcome message during the bot first run experience. However, if a welcome message is triggered, it must follow the welcome message guidelines.

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
     ![Bot Welcome Message](~/assets/images/submission/validation-bot-welcome-message.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
    ![Bot No Welcome Message](~/assets/images/submission/validation-bot-no-welcome-message.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

* Bot welcome messages in channels and chats are optional during first run, especially if the bot is available for personal use and performs similar actions. Your bot must not send welcome messages to users individually (it's considered [spamming](#bot-message-spamming)). The message must also mention the person who added the bot.

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
    ![Welcome Message Not Triggered](~/assets/images/submission/validation-bot-welcome-message-not-triggered.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
    ![Welcome Message Triggered](~/assets/images/submission/validation-bot-welcome-message-triggered.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

> [!TIP]
> In welcome messages to individual users, a carousel tour can provide an effective overview of your bot and any other app features to encourage users to try bot commands. For example, **Create a task**.

### Bot message spamming

Bots must not spam users by sending multiple messages in short duration.

* **Bot messages in channels and chats**: Don't spam users by creating separate posts. Create a single post with replies in the same thread.

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
    ![Bot Spamming One Message](~/assets/images/submission/validation-bot-message-spamming-one-message.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
    ![Bot Spamming Multiple Message](~/assets/images/submission/validation-bot-message-spamming-multiple-messages.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

* **Bot messages in personal apps**:
  * Don't send multiple messages in quick duration.
  * Send one message with complete information.
  * Avoid multi-turn conversations to complete a single repetitive workflow.
  * Use a form (or task module) to collect all inputs from a user at one time.
  * NLP based conversational chatbots can use multi turn conversation to make the discussion more engaging and complete a workflow.

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
    ![Bot Using task Module](~/assets/images/submission/validation-bot-messages-using-task-module.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
        ![Bot Using Multiple Conversation](~/assets/images/submission/validation-bot-messages-using-mutliple-conversation.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

* **Welcome messages**: Don't repeat the same welcome message over regular intervals. For example, when a new member is added to a team, don't spam the other members with a welcome message. Message the new member personally.

### Bot notifications

Bot notifications must include content relevant for the scope you define for the bot (team, chat, or personal).

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
      ![Bot Notification Relevant](~/assets/images/submission/validation-bot-notifications-relevant.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
         ![Bot Notification not relevant](~/assets/images/submission/validation-bot-notifications-not-relevant.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

### Bots and Adaptive Cards

Adaptive Cards are a highly recommended way to display bot messages. The cards must be lightweight and only include up to six actions. To display more content, consider using a task module or tab.

For more information about cards, see:

* [Designing Adaptive Cards](~/task-modules-and-cards/cards/design-effective-cards.md)
* [Cards reference](~/task-modules-and-cards/cards/cards-reference.md#types-of-cards)

Bot experience must be fully responsive on mobile. Bot responses must provide a way forward where applicable. Bot musts be responsive and fail with a graceful error message for failures. Bot messages sent in the personal scope to user's base on triggers in a collaborative scope must provide contextual information (including the message’s origin).

### Notification only Bots

Apps that consist of notification only bots provide user value by triggering user notifications based on certain triggers or events in the core app or backend. For example, a new sales lead or prospect is added for the sales team to follow up on.

A notification provides value in Teams if:

1. Posted card or text provides adequate details requiring no further user action.
1. Posted card or text provides adequate preview information for a user to take action or decide to view further details in a link opening outside Teams.

Apps that provide only notifications with content such as **You have a new notification, click to view**, and require user to navigate outside of Teams for everything else don't provide significant value within Teams.

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
          ![Bot inadequete information](~/assets/images/submission/validation-bot-notification-only-inadequete-info.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::  

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
          ![Bot Adequete information](~/assets/images/submission/validation-bot-notification-only-adequete-info.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

> [!TIP]
> Preview information and provide basic inline user actions in the posted card so that the user is not required to navigate outside Teams for all actions (irrespective of complexity).

## Messaging extensions

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png" border="false"::: This section is inline with [Microsoft commercial marketplace policy number 1140.4.4](/legal/marketplace/certification-policies#114044-messaging-extensions).

If your app includes a messaging extension, ensure it adheres to these guidelines.

> [!TIP]
> For more information on creating a high-quality app experience, see the [Teams messaging extension design guidelines](~/messaging-extensions/design/messaging-extension-design.md).

### Action commands

Action-based messaging extensions must do the following:

* Allow users to trigger actions on a message without completing intermediate steps, such as sign in.

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
          ![No Intermediate Step ](~/assets/images/submission/validation-messaging-extension-no-intermediate-step.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
         ![Intermediate Step Available](~/assets/images/submission/validation-messaging-extension-intermediate-step-available.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

* Pass the message context to the next work state. [*Mandatory Fix*]

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
         ![App Passes Message](~/assets/images/submission/validation-messaging-extension-app-passes-message.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
        ![App doesn't Pass Message](~/assets/images/submission/validation-messaging-extension-app-doesnot-pass-message.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

* Incorporate the host app name instead of a generic verb for action commands triggered from a chat message, channel post, or call to action within apps. For example, use **Start a Skype Meeting** for **Start Meeting**, **Upload file to DocuSign** for **Upload file**, and so on. [*Suggested Fix*]

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
         ![Action Command Host name](~/assets/images/submission/validation-messaging-extension-action-command-host-name.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
          ![Action Command verb](~/assets/images/submission/validation-messaging-extension-action-command-verb.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

### Preview links (link unfurling)

Messaging extensions must preview recognized links in the Teams compose box. Don't add domains that are outside your control (either absolute URLs or wildcards). For example, `yourapp.onmicrosoft.com` is valid but `*.onmicrosoft.com` isn't valid. Top-level domains also are prohibited. For example, `*.com` or `*.org`. [*Mandatory Fix*]

### Search commands

* Search based messaging extensions must provide text that helps the users to search effectively. [*Mandatory Fix*]

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
         ![Help Text available](~/assets/images/submission/validation-search-commands-text-available.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

* @mention executables must be clear, easy to understand, and readable.

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
         ![Search Command Unclear Excecutable](~/assets/images/submission/validation-search-command-unclear-executable.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

### Search based messaging extension only apps

[*Mandatory Fix*]

Apps that consist of search-based messaging extension provide user value by sharing cards that allow for contextual conversations without context switching.

To pass validation for a search-based message extension only app, the following are required as baseline to ensure the user experience isn't broken. A card shared via a messaging extension provides value in Teams if:

1. Posted card provides adequate details requiring no further user action.
1. Posted card provides adequate preview information for a user to take action or decide to view further details in a link opening outside Teams.

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
    ![Search based messaging inadequate](~/assets/images/submission/validation-search-based-messaging-ext-inadequete-info.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
   ![Search based messaging adequete](~/assets/images/submission/validation-search-based-messaging-ext-adequete-info.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

Link unfurling only apps don't provide significant value within Teams. Consider building additional workflows in your app, if your app only supports link unfurling and has no other functionality.

## Task modules

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png" border="false"::: This section is inline with [Microsoft commercial marketplace policy number 1140.4.5](/legal/marketplace/certification-policies#114045-task-modules).

A task module must include an icon and the short name of the app it's associated with. Task modules must not embed an entire app and only display the components required to complete a specific action. [*Mandatory Fix*]

For more information, see [Teams task module design guidelines](~\task-modules-and-cards\task-modules\design-teams-task-modules.md).

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
    ![Task module Displays Components](~/assets/images/submission/validation-task-module-displays-components.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::  

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
     ![Task Module Embeds app](~/assets/images/submission/validation-task-module-embeds-app.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

> [!TIP]
> For more information on creating a high-quality app experience, see [Teams task module design guidelines](~/task-modules-and-cards/task-modules/design-teams-task-modules.md).

## Meeting extensions

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png" border="false"::: This section is inline with [Microsoft commercial marketplace policy number 1140.4.6](/legal/marketplace/certification-policies#114046-meeting-extensions).
> [!TIP]
> For more information on creating a high-quality app experience, see the [Teams meeting extension design guidelines](~/apps-in-teams-meetings/design/designing-apps-in-meetings.md).

Use the following guidelines for meeting extensions:

* Meeting extensibility apps must offer a responsive in-meeting experience and aligned to the Teams meeting experience. In-meeting experience is mandatory, pre and post-meeting experiences aren't mandatory.

  * With the pre-meeting app experience, users can find and add meeting apps. Users can also perform pre-meeting tasks, such as developing a poll to survey the meeting participants. If your app provides a pre-meeting experience, it must be relevant to the workflow of the meeting.

  * With the post-meeting app experience, users can view the results of the meeting, such as poll survey results or feedback as well as other app content. If your app provides a post-meeting experience, it must be relevant to the workflow of the meeting.

  * With the in-meeting app experience, you can engage meeting participants during the meeting and enhance the meeting experience for all the attendees. Attendees must not be taken outside of the Teams meeting for completing core user workflows of your app.

* Your app must offer value beyond providing custom Together Mode scenes in Teams.

* Shared meeting stage feature can only be launched through the Teams desktop app. However, the shared meeting stage consumption experience must be usable and not broken when viewed on mobile devices.

> [!TIP]
> You must declare `groupchat` as a scope under `configurableTabs` and `meetingDetailsTab`, or `meetingChatTab` and `meetingSidePanel` as a context property in the manifest to enable your app for meetings on Teams mobile.

### Pre and post meeting experience

* Pre and post meeting screens must adhere to general tab design guidelines. For more information, see [Teams design guidelines](~/tabs/design/tabs.md).
* Tabs must not have horizontal scrolling.
* Tabs must have an organized layout when displaying multiple items. For example, more than 10 polls or surveys, see [example layout](~/apps-in-teams-meetings/design/designing-apps-in-meetings.md#after-a-meeting).
* Your app must notify users when the results of a survey or poll are exported by stating, **Results successfully downloaded**.

### In-meeting experience

* Apps must only use a dark theme during meetings. For more information, see [Teams design guidelines](~/apps-in-teams-meetings/design/designing-apps-in-meetings.md#theming).
* A tooltip must display the app name when hovering over the app icon during meetings.

 :::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
      ![Tooltip Display app name](~/assets/images/submission/validation-in-meeting-exp-display-app-name.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

* Messaging extensions must function the same during meetings as they do outside meetings.

### In-meeting tabs

* Must be responsive.
* Must maintain padding and component sizes.
* Must have a back button if there's more than one layer of navigation.

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
      ![In-meeting Back Button Available](~/assets/images/submission/validation-in-meeting-exp-back-button.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
      ![In-meeting Back Button Absent](~/assets/images/submission/validation-in-meeting-exp-back-button-absent.png)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

* Must not include more than one close button. It may confuse users since there's already a built-in header button to dismiss the tab.
* Must not have horizontal scrolling.

### In-meeting dialogs

* Must be used sparingly and for scenarios that are light and task oriented.
* Must display content in a single column and not have multiple navigation levels.
* Must not use task modules.
* Must align with the center of the meeting stage.

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
      ![In-meeting dialog not aligned](~/assets/images/submission/validation-in-meeting-dialog-not-aligned.png)  
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

* Must be dismissed after a user selects a button or performs an action.

* **Together mode**: Ensure that you consider the following best practices for a scene building experience:
  * All images are in .png format.
  * The final package with all the images put together must not exceed 1920x1080 resolution. The resolution is an even number. This resolution is a requirement for scenes to be shown successfully.
  * The maximum scene size is 10 MB.
  * The maximum size of each image is 5 MB. A scene is a collection of multiple images. The limit is for each individual image.
  * Select **Transparent** as required. This checkbox is available on the right panel when an image is selected. The overlapping images must be marked as Transparent to indicate that they're overlapping images in the scene.

## Notifications

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png" border="false"::: This section is inline with [Microsoft commercial marketplace policy number 1140.4.7](/legal/marketplace/certification-policies#114047-notification-apis).

If your app uses the [activity feed APIs provided by Microsoft Graph](/graph/teams-send-activityfeednotifications), ensure it adheres to the following guidelines.

### General

* All the notification triggers specified in your app configuration must work.
* Notifications must be localized per the supported languages configured for your app.
* Notifications must display within five seconds of user action.

### Avatars

* The notification avatar must match your app's color icon.
* Notifications triggered by a user must include the user's avatar.

### Spamming

* Apps must not send more than 10 notifications per minute to a user.
* Bots and the activity feed must not trigger duplicate notifications.
* Notifications must provide some value to users and not be used for trivial or irrelevant events.

### Navigation and layout

* Notifications must adhere to the Teams activity feed layout and experience.
* When selecting a notification, the user must be directed to relevant content within Teams.

## Microsoft 365 App Compliance Program

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png" border="false"::: This section is inline with [Microsoft commercial marketplace policy number 1140.6](/legal/marketplace/certification-policies#11406-publisher-attestation).

The Microsoft 365 App Compliance Program is intended to help organizations assess and manage risk by evaluating security and compliance information about your app. If you're publishing an app to the Teams store, you must complete the following tiers of the program:

* **Publisher Verification**: Helps admins and end users understand the authenticity of app developers integrating with the Microsoft identity platform. When completed, a blue **verified** badge displays on the Azure Active Directory consent dialog and other screens. For more information, see [Mark your app as publisher verified](/azure/active-directory/develop/mark-app-as-publisher-verified).  

:::row:::
    :::column span="":::
   :::column-end:::
   :::column span="3":::
      ![Publisher Verification](~/assets/images/submission/validation-365-compliance-publisher-verification.png)  
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

* **Publisher Attestation**: A process in which you share general, data handling, and security and compliance information to help potential customers make informed decisions about using your app.

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png" border="false"::: If you're submitting an app that hasn't been listed previously, you can't officially complete Publisher Attestation until your app is in the Teams store. If you're updating a listed app, complete Publisher Attestation before you submit the latest version of the app.

## Advertising

:::image type="icon" source="../../../../assets/icons/certificate-icon-16.png" border="false"::: This section is in line with [Microsoft commercial marketplace policy number 1140.7](/legal/marketplace/certification-policies#11407-advertising).

Apps must not display advertising, including dynamic ads, banner ads, and ads in message.

## Next step

> [!div class="nextstepaction"]
> [Create a Partner Center account](~/concepts/deploy-and-publish/appsource/prepare/create-partner-center-dev-account.md)

## See also

* [Distribute your app](~/concepts/deploy-and-publish/apps-publish-overview.md)
* [Prepare your store submission](~/concepts/deploy-and-publish/appsource/prepare/submission-checklist.md)
* [Test and debug your app](~/concepts/build-and-test/debug.md)
* [Create a Partner Center developer account](~/concepts/deploy-and-publish/appsource/prepare/create-partner-center-dev-account.md)
