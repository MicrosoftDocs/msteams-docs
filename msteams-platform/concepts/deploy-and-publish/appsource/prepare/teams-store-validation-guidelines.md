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
> * Some guidelines may not be applicable to your app. For example, if your app doesn't include a bot, you can ignore bot-related guidelines.
> * We've cross-referenced the guidelines to the Microsoft commercial certification policies and added Do’s and Don’ts with examples from pass or fail scenarios encountered in our validation process.
> * The guidelines are marked as “Mandatory Fix” and “Suggested Fix”.
   * **Mandatory Fix**: If your app submission doesn’t pass the Microsoft Teams Store Validation, you'll receive a failure report with mitigation steps. Fix the issues for your app to pass the Microsoft Teams store submission process.
   * **Suggested Fix**: Fix the issues for an ideal user experience. IF you choose not to fix, your app submission wonn't be blocked from publishing on the Teams store.


## Value proposition
> [!NOTE]  
> The topics under Value proposition are inline with Microsoft Commercial Certification Policy number 1140.1 and provides additional guidance to developers of Microsoft Teams apps on their offer’s value proposition.

### App name

> [!NOTE]  
> The following content is inline with Microsoft Commercial Certification Policy number 1140.1.1 and provides additional guidance to developers on naming their apps.

An app's name plays a critical role in how users discover it in the store. Remember the following points about app names:

* The name must include terms relevant to your users.
* Names of core Teams features shouldn't be included in your app name, such as:  
  * **Chat**
  * **Contacts**
  * **Calendar**
  * **Calls**
  * **Files**
  * **Activity**
  * **Apps**
  * **Help**
* Common nouns must be prefixed or suffixed with the developer's name (for example, **Contoso Tasks** rather than **Tasks**).
* Must not use **Teams** or other Microsoft product names such as Excel, PowerPoint, Word, OneDrive, SharePoint, OneNote, Azure, Surface, Xbox that could falsely indicate co-branding or co-selling. For more information about referencing Microsoft software, products, and services, see, [Microsoft Trademark and Brand Guidelines](https://www.microsoft.com/legal/intellectualproperty/trademarks/usage/general).
* If your app is part of an official partnership with Microsoft, the name of your app must come first (for example, **Contoso Connector for Microsoft Teams**).
* Must not copy the name of an app listed in the store or other offer in the commercial marketplace.
* Must not contain profane or derogatory terms. The name also must not include racially or culturally insensitive language.
* Must be unique. If your app (Contoso) is listed in the Microsoft Teams store and  Microsoft AppSource and you want to list another app specific to a geography, such as Contoso Mexico, your submission must meet the following criteria:
  * Call out the app's region-specific functionality in the title, metadata, first response app experience, and help sections. For example, title must be Contoso Mexico. App title must be clearly differentiate an existing app from the same developer to avoid end-user confusion.
  * When uploading the app package in Partner Center, you must select the right **Markets** where the app will be available under the **Availability** section.

 > [!TIP]  
 >  Your app’s branding on the Microsoft Teams store and Microsoft AppSource including your app name, developer name, app icon, Microsoft AppSource, screenshots, video, short description, and website must not impersonate an official Microsoft offering unless your app is an official Microsoft 1P offering.

### Suitable for workplace consumption

> [!NOTE]  
> The following content is inline with Microsoft Commercial Certification Policy number 1140.1.2, 100.8, and 100.10 and provides additional guidance to developers on building workplace appropriate apps.

App content must be suitable for general workplace consumption and abide by all restrictions listed in the commercial marketplace certification policies. Content related to religion, politics, gambling, and prolonged entertainment is prohibited.

Your app must enable group collaboration, improve an individual's productivity, or both. Apps intended for team bonding and socializing must be collaborative and designed for multiple participants. These types of apps shouldn't require more than 60 mins per session or affect productivity.

### Similar platforms and services

> [!NOTE]  
> The following content is inline with Microsoft Commercial Certification Policy number 1140.1.3. 

Apps must focus on the Teams experience and not include the names, icons, or imagery of other similar chat-based collaboration platforms or services such as Slack, Zoom, Webex, Discord, Flock, Stride, Hip chat, Hangouts Meet, G Suite, and Workplace by Facebook, within the app content or in the app’s metadata unless your app provides specific interoperability.

### Feature names

App feature names in buttons and other UI text must not duplicate with terminology reserved for Teams and other Microsoft products. For example, **Start meeting**, **Make call**, or **Start chat**. If necessary, include your app name, such as **Start Contoso meeting**.

### Authentication

> [!NOTE]  
> The following content is inline with Microsoft Commercial Certification Policy number 1140.1.4 and provides guidance to developers on authenticating their apps with external services. 

For information on how to implement app authentication, see [authentication in Teams](~/concepts/authentication/authentication.md).

#### Authenticating with external services

 If your app authenticates users with an external service, follow these guidelines:

* **Sign in, sign out, and sign up experiences**:
  * Apps that depend on external accounts or services must provide clear and simple sign in, sign out, and sign up experience.
  * When users sign out, they must sign out only from the app and remain signed in to Teams.
  * Apps that depend on external accounts or services must provide additional information in the app’s manifest, AppSource long description, and app first run experience (bot welcome message, tab setup, or config page) for new users to sign up or contact the app publisher to learn more about the services and acquire credentials. 
  * Apps that require tenant admin to complete one time setup must call out dependency on tenant admin to configure the app (before any other tenant user can install and use the app).
  
  Dependency must be available in the app’s manifest and AppSource long description, all first run experience touchpoints including bot welcome message, tab setup, or config page, help text as considered necessary as part of bot response or compose extension or static tab content. 

* **Content sharing experiences**: 
  * Apps that require authentication with an external service to share content in Teams channels must state a way to disconnect or unshare content if that feature is supported on the external service. This doesn't mean the ability to unshare content must be present in your Teams app.

## Security
> [!NOTE]  
> The topics under Security is inline with Microsoft Commercial Certification Policy number 1140.3.

### Financial information
> [!NOTE]  
> The following content is inline with Microsoft Commercial Certification Policy number 1140.3.1 and provides guidance on transmission of financial information within the Teams interface and notifies developers of restricted payment scenarios on the mobile (Android  and iOS) version of their Teams app.

Apps must not ask users to make payments within the Teams interface and shouldn't transmit financial information to users through a bot interface.
  ![In App Payments](~/assets/images/submission/validation-financial-information-1.png)


You may provide link to secure external payment services only if you made the appropriate disclosure in your terms of use, privacy policy, profile page, or website before the user agreed to use the app.

Don't make any payments through an app for goods or services prohibited by General policy 100.10 Inappropriate content.

Apps running on the iOS or Android version of Teams must adhere to the following guidelines:

* Apps must not include in-app purchases, trial offers, or UI that aims to upsell users to paid versions or online stores to purchase or acquire other content, apps, or add-ins.  
    ![In-app Purchases](~/assets/images/submission/validation-financial-information-in-app-purchase.png)
    
    :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: Mobile version of the app allows in-app purchase, which has UI that aims to upsell to paid versions.

    ![Online Stores](~/assets/images/submission/validation-financial-information-online-stores.png)
    
    :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: Mobile version has links to online stores where users can make a purchase decision.

* If your app requires an account, users can sign up for an account at no charge. The use of the term **free** or **free account** is prohibited.
* You can determine whether an account is active indefinitely or for a limited time. When the account expires the app shouldn't show UI, text, or links indicating the need to pay.
* Your app's privacy policy and terms of use must be free of any commerce-related UI or links.

### Bots- Azure Bot service
> [!NOTE]
> The following content is inline with Microsoft Commercial Marketplace Policy number 1140.3.2

For apps that use the Microsoft Azure Bot Service (such as bots and messaging extensions), you must follow all requirements defined in the Microsoft [Online Services Terms](https://www.microsoftvolumelicensing.com/DocumentSearch.aspx?Mode=3&DocumentTypeId=46).

Bots must always ask permission to upload a file and display a confirmation message.
  ![Confirmation Message](~/assets/images/submission/validation-bot-confirmation-message.png)

### External domains
> [!NOTE]
> The following content is inline with Microsoft Commercial Marketplace Policy number 1140.3.3 and provides developer guidance on usage of restricted domains in the validDomains manifest property.

Don't include domains outside of your organization's control (including wildcards) and tunneling services in your app's domain configurations. The following exceptions include:

  * If your app uses the Azure Bot Service's OAuthCard, you must include `token.botframework.com` as a valid domain or the **Sign in** button won't work.
  * If your app relies on SharePoint, you can include the associated root SharePoint site as a valid domain using the `{teamSiteDomain}` context property.

#### Government Community Cloud listings

To distribute your app to Government Community Cloud (GCC) users, the authentication process must identify and route users to a GCC-specific or expected URL while avoiding duplicate listings in the Teams store.

### Sensitive content

Your app must not post sensitive data, such as credit card, financial payment details, health, contact tracing, or other personally identifiable information (PII) to the external audience.

Warn users before your app downloads any files or executables (.exe) into the user's machine or environment.

## General functionality and performance

> [!NOTE]
> The topics under General functionality and performance are inline with Microsoft Commercial Marketplace Policy number 1140.4.

### Launching external functionality

Apps must not take users out of Teams for core user scenarios. App content and interactions should occur within Teams capabilities, such as bots, adaptive cards, and task modules.

Link users within Teams app and not to an external site or app. For scenarios that require external functionality, your app must take explicit user permission to launch the functionality. 

Button UI text that launches external functionality must include content to indicate the user is taken out of the Teams instance. For example, include text such as **This way to Contoso.com** or **View in Contoso.com**.

### Compatibility

Apps must be fully functional on the latest versions of the following operating systems and browsers:

* Microsoft Windows
* macOS
* Microsoft Edge
* Google Chrome
* iOS
* Android

Your app must show a graceful failure message on unsupported browsers and operating systems.

### Response time

Teams apps must respond within a reasonable timeframe or show a warning message.

* Tabs must respond within two seconds or display a loading message or warning.
* Bots must respond to user commands within two seconds or display a typing indicator.
* Messaging extensions must respond to user commands within two seconds.
* Notifications must display within two seconds of the user action.

## App package and store listing

App packages must be correctly formatted and include all required information and components.

> [!TIP]  
> You must include detailed testing instructions for validating your app submission with steps to configure the app, test accounts (in case app depends on external accounts for authentication), summary of expected app behavior for the core workflows within Teams, clearly describe limitations, conditions, or exceptions to the functionality, features, and deliverables described in the app long description and related materials and emphasize any considerations testers need to be aware of while validating your app submission. Pre-populate the test accounts with dummy data where possible to aid testing. 

### App manifest

The Teams app manifest defines your app's configuration.

* Your manifest must conform to a publicly released manifest schema. For information, see [manifest reference](~/resources/schema/manifest-schema.md). Don't submit your app using a preview version of the manifest.
* If your app includes a bot or messaging extension, details in the app manifest must be consistent with Bot Framework metadata including bot name, logo, privacy policy link, and terms of service link.
* If your app uses Azure Active Directory (Azure AD) for authentication, include the Azure AD Application (client) ID in the manifest. For more information, see the [manifest reference](~/resources/schema/manifest-schema.md#webapplicationinfo).

### App icons

Icons are one of the main elements people see when browsing the Teams store. Your icons should communicate your app's brand and purpose while adhering to the following requirements:

* Your app package must include two PNG versions of your app icon: A color icon and an outline icon.
* The color version of your icon displays in most Teams scenarios and must be 192x192 pixels. Your icon symbol can be any color or colors, but it must sit on a solid or fully transparent square background.
* The outline version of your icon displays when your app is in use and **hosted** on the app bar on the left side of Teams and when a user pins your app's messaging extension. The outline must be 32x32 pixels and can be white with a transparent background or transparent with a white background. The icon shouldn't have any extra padding around the symbol.
* Correctly sized and formatted icons must be included in your app package. The icons must match what's submitted with the store listing metadata.

For more information, see the Teams app [icon guidelines](~/concepts/build-and-test/apps-package.md#app-icons).

### App descriptions

You must have a short and long description of your app. The descriptions in your app configurations and Partner Center must be the same.

Descriptions shouldn't directly or through insinuation disparage another brand (Microsoft owned or otherwise). Make sure your description doesn't include claims that can't be substantiated. For example, **Guaranteed 200 percent increase in efficiency**.

#### Short description

A short description is a concise summary of your app that highlights its value proposition and is directed at your target audience.

**Dos:**

* Keep the short description to one sentence.
* Put the most important information first.
* Include keywords that customers are likely to search for.
* Make efficient use of the available character limit. For example, Don't repeat your app name.

**Don't:**

* Use the word **app** in the short description.

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
* Dimensions should be 1366x768 pixels.
* Maximum size of 1,024 KB.

**Dos:**

* Focus on your app's capabilities. For example, how people can communicate with your bot.
* Include content that accurately represents your app.
* Use text judiciously.
* Frame screenshots with a color that reflects your brand and include marketing content.

**Don'ts:**

* Show specific devices, such as phones or laptops.
* Display chrome or UI that isn't in your app.
* Capture any Teams or browser UI in your screenshots.
* Include mockups that inaccurately reflect your app's actual UI, such as showing your app being used outside of Teams.

> [!TIP]
> A video can be the most effective way to communicate why people should use your app. A video also is the first thing users see in your listing. For more information, see [create a video for your store listing](~/concepts/deploy-and-publish/appsource/prepare/submission-checklist.md#create-a-video).

### Privacy policy

The privacy policy can be specific to your Teams app or an overall policy for all your services.

* If you use a generic privacy policy template, you must add a reference to **services**, **applications**, and **platforms in the scope of your privacy policy**. You don’t need to specify your Teams app in the scope, if you include a reference to **services**, **applications** and **platforms**, the app validation process will construe these references to include your Teams app along with your other services or websites.
* Must include how you handle user data storage, retention, and deletion. You must describe the security controls for data protection.
* Must include your contact information.
* Must not include URLs that are broken or for beta or staging purposes.
* Must not include links to AppSource.
* Must not require authentication to access privacy policy.
* Must not include any commerce UI or store links.

### Terms of use

The Terms of uses are the following:
 * Should be Specific and applicable to your offering.
 * Should be Hosted on your own domain.
 * Should have a secure (HTTPS) link.
 * Access to Terms of use must not require authentication.

### Support links

Your app's support URLs shouldn't require authentication. For example, users shouldn't login to contact you. 

Support URLs must include your contact details or additional information for users to raise a support ticket. For example, if your support URL is hosted on GitHub which must be under your ownership and include your contact details or additional information for users to raise a support ticket.

  ![Support URL](~/assets/images/submission/validation-supportlinks-authentication.png)  
  :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: Authentication required to access support link.

### Localization

If your app supports localization, your app package must include a file with language translations that display based on the Teams language setting. The file must conform to the Teams localization schema. For more information, see [Teams localization schema](~/concepts/build-and-test/apps-localization.md).

## Tabs
> [!NOTE]  
> The topics under tabs are inline with Microsoft Commercial Marketplace Policy number 1140.4.2.
If your app includes a tab, make sure it adheres to these guidelines.

> [!TIP]
> For information on creating a high-quality app experience, see [Teams tab design guidelines](~/tabs/design/tabs.md).

### Setup

* Tab setup **must not dead-end** a new user. Provide a message on how to complete the action or workflow.

  ![Create new account](~/assets/images/submission/validation-tabs-setup-create-new-account.png)  

  :::image type="icon" source="~/assets/images/submission/validation-correct-icon.png"::: Way forward link **Create new account** for new users is available.

  ![Missing Forward Guidance](~/assets/images/submission/validation-tabs-missing-forward-guidance.png)  
  :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: Missing way forward guidance for a new user.

  ![New User Signup](~/assets/images/submission/validation-tabs-setup-new-user.png)  
  :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: Missing way forward for a new user to sign up.

* For the best first run experience, authenticate your users during the tab setup and not after. Authentication can happen outside the tab configuration window.

* The user shouldn't leave the tab configuration experience inside Teams to create content outside of Teams and then return to Teams to pin it. Tab configuration screen must explain the value of configuration and how to configure.

  ![Acquire Profile Name](~/assets/images/submission/validation-tabs-setup-profile-name.png)

  :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: Requires navigating outside the configuration experience to acquire **Profile Name**.

* Tab configuration screen must not embed an entire website and keep your configuration experience focused. For example, if you're building a project management app that lets users configure a project in a channel, keep the tab configuration screen focused on allowing the user to select a project from your app.

  ![Configuration Experience](~/assets/images/submission/validation-tabs-setup-configuration-experience.png)  
  :::image type="icon" source="~/assets/images/submission/validation-correct-icon.png"::: Configuration experience allows user to configure a specific mind map (project) to the channel and offers a list of projects to choose.

  ![Configuration Screen](~/assets/images/submission/validation-tabs-setup-configuration-screen.png)  
  :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: Entire website embedded in tab configuration screen.

* Tab configuration screen must not ask users to embed a URL. Asking users to configure a URL during tab set-up is a broken UX - user leaves tab configuration screen, acquires URL, returns to the configuration screen and inputs the URL. A pre-existing Teams feature already allows users to pin a website link in the channel.

If your app asks user to embed a website URL during tab configuration and app functionality is limited to displaying the entire content in this configured website in the channel tab, your app doesn't offer significant value to the user. Consider adding another capabilities or workflows to your app.
    
  ![Configured URL](~/assets/images/submission/validation-tabs-setup-configured-url.png)  
  :::image type="icon" source="~/assets/images/submission/validation-correct-icon.png"::: App asks user to configure a URL during tab set-up. App functionality extends beyond displaying the content in configured URL. 

  ![Configured URL limited](~/assets/images/submission/validation-tabs-setup-configured-url-two.png)  
  :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: App asks user to configure a URL during tab set-up. App functionality is limited to displaying content in configured URL.

### Views

* The sign in screen area must not use large logos.

  ![App Login Emphasis](~/assets/images/submission/validation-views-applogin.png)  
  :::image type="icon" source="~/assets/images/submission/validation-correct-icon.png"::: Emphasis and focus on app login.  

  ![App Logo](~/assets/images/submission/validation-views-applogo.png)  
  :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: Focus on app logo and inefficient use of configuration screen. App logo also available in the upper left corner. Informative steps to configure the app are available under the vertical scroll.  

* Content can be simplified by breaking down across multiple tabs.  

  ![Multiple Tabs](~/assets/images/submission/validation-views-multiple-tabs.png)  
  :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: Breakdown complex content in static tabs across multiple tabs.

* Tabs shouldn't have a duplicate header. Remove the duplicate logo from the iframe since the tab framework already displays the app icon and name.

  ![Duplicate Header Logo](~/assets/images/submission/validation-views-duplicate-header-logo.png) 

  :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: Tab framework displays your app logo. Recommend removing the duplicate logo from the tab iframe.

### Navigation

The following are the navigation guidelines:

* Tabs must not have more than three levels of navigation.

* Static tabs must not provide navigation that conflicts with the primary Teams navigation. If you provide a left navigation in your static tab, it must not include only icons or icons with stacked text. It must not be a collapsible rail with the option to see icons with stacked text (mimicking the Teams navigation bar).
* Include icons with inline text or only text or use hamburger menus instead of tab left rail.

  ![Left navigation](~/assets/images/submission/validation-navigation-left-navigation.png)

  :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: Only icons in tab left navigation.
  ![Icon and Text](~/assets/images/submission/validation-navigation-icon-text.png)

  :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: Icon and text in tab left navigation mimics Teams navigation.

  ![Collapsible Left Rail](~/assets/images/submission/validation-navigation-collapsable-left-rail.png)

  :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: Collapsible left rail that mimics Teams primary navigation.

  ![Static Tab](~/assets/images/submission/validation-navigation-static-tab.png)

  :::image type="icon" source="~/assets/images/submission/validation-correct-icon.png"::: Side navigation pane to assist with complex navigation flows in a Static Tab is allowed. 

  ![Horizonta Rail](~/assets/images/submission/validation-navigation-horizontal-rail.png)

  :::image type="icon" source="~/assets/images/submission/validation-correct-icon.png"::: Tab uses a horizontal rail for navigation instead of a left rail that conflicts with Teams primary navigation.

* Tabs with toolbar in left rail must leave 20px spacing from Teams left navigation. 
  ![Spacing between Toolbar](~/assets/images/submission/validation-navigation-spacing-between-toolbar.png)  

  :::image type="icon" source="~/assets/images/submission/validation-correct-icon.png"::: App provides 20px spacing between toolbar in left rail and Teams navigation.

* The secondary and tertiary pages in a tab must be opened in a level 2 and level 3 view in the main tab area, which is navigated via breadcrumbs or left navigation. You can also include the following components to aid tab navigation:
    * Back buttons
    * Page headers
    * Hamburger menus
* Tab shouldn't have a horizontal scroll. Whiteboarding apps and other apps that require a larger canvas to allow users to collaborate without a perceived broken app experience, can use horizontal scroll depending on their business need.

* Deep links in tabs must not link to an external webpage but within Teams. For example, task modules or other tabs.

  ![View Button not Linked](~/assets/images/submission/validation-navigation-view-button-not-linked-static-tab.png)

  :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: **View** button launches external webpage, not deep linked within the Teams app.

* Tabs shouldn't allow users to navigate outside Teams for the core app experience. Tabs can redirect outside Teams for non-core workflows. For example, to raise a support ticket.

  ![Core Workflow within Configuration Tab](~/assets/images/submission/validation-navigation-core-workflow-within-configuration.png)

  :::image type="icon" source="~/assets/images/submission/validation-correct-icon.png"::: App core workflow is collaborating on a blank diagram within a channel. Core workflow is within Teams in a configurable tab.

  ![App Core Workflow Redirects Outside](~/assets/images/submission/validation-navigation-core-workflow-redirects-outside.png)

  :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: App core workflow is reading articles shared within a channel. To read the article, tab redirects user outside of Teams.

### Usability

* Tabs must provide value beyond hosting an existing website.

  ![Usability App Provides Workflows](~/assets/images/submission/validation-usability-app-provides-workflows.png)  
  :::image type="icon" source="~/assets/images/submission/validation-correct-icon.png"::: App provides workflows in a configurable tab that are valuable to the channel members within a Team. Developer has enabled relevant workflows for implementation within Teams.

* Users can undo their last action in the tab.
  ![Usability Website I-Frame](~/assets/images/submission/validation-usability-website-i-framed.png)  
  :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: The entire website is within the iframe in the configurable tab. Website has header, footer, and native navigational elements that navigate user from the home page.

  ![Usability Teams app identical](~/assets/images/submission/validation-usability-teams-app-identical-website.png)  
  :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: Teams app identical to the website. All the workflows can be completed within the website, unclear value proposition within Teams. Website pinned to the channel using “+” offers same functionality as Teams app.

* Content must not truncate or overlap within the tab.
  ![Usability Content Truncation](~/assets/images/submission/validation-usability-content-truncation.png)  
  :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: Content truncation within the tab.

* Users can undo their last action in the tab. 

* Tabs in a personal context may aggregate content from shared instances of the app. For example, a project management app with a configurable tab that lets channel members comment on the project on Kanban cards, should aggregate this content and display in the personal app.

* Tabs must be responsive to Teams themes. When a user changes the theme, the app's theme must reflect the selection.

  ![Usability Resposive tabs](~/assets/images/submission/validation-usability-responsive-tabs.png)  
  :::image type="icon" source="~/assets/images/submission/validation-correct-icon.png"::: Responsive to **Dark** theme within a Teams meeting.

  ![Usability unresponsive tabs](~/assets/images/submission/validation-usability-unresponsive-tabs.png)  
  :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: Unresponsive to **Dark** theme within a Teams meeting.

* Tabs in a personal context may aggregate content from shared instances of the app.

* Tabs must use Teams-styled components such as, Teams fonts, type ramps, color palettes, grid system, motion, tone of voice, and so on, whenever possible. Follow tab design guidelines.

  ![Usability different font](~/assets/images/submission/validation-usability-app-uses-diff-font.png)  
  :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: App uses **Calibri** font, different from Teams native font.

* If your app functionality require changes in settings, include a **Settings** tab.
* Tabs must follow Teams interaction design such as, in-page navigation, position and use of dialogs, information hierarchies, and so on. For more information, see [Microsoft Teams Fluent UI kit](~/concepts/design/design-teams-app-basic-ui-components.md)

* Tab content in the iframe must not include features that mimic Teams core capabilities. For example, bots, messaging extensions, calling, meeting, etc.
  ![Usability Chatbot within tab](~/assets/images/submission/validation-usability-chatbot-withing-tab.png)  
  :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: Includes a chatbot within the tab.

* Content in the landing page of the configurable tabs must be contextually same for all members of the channel. Configurable tabs help conversations about common content in a central location such as Teams channel. Ensure you use these collaborative tabs only to display content that is same for all users. 

* Content in the landing page of configurable tabs must not be enabled for individual use and not include personal content such as **My Tasks** or **My Dashboard**. If your app requires provision of a personal scope view, use filtered views, deep links to personal apps, or navigate to L2 or L3 views within the configurable tab and keep the landing page contextually the same for all the users.

  ![Usability Configurable tab personal Info](~/assets/images/submission/validation-usability-configurable-tab-personal-info.png)  
  :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: Configurable Tab landing page has personal content such as **My day** and **To-do** that are specific to a particular user and irrelevant to the other members of the channel.

* Configurable tabs must have focused functionality. 

  ![Usability Configurable Nested tabs](~/assets/images/submission/validation-usability-configurable-nested-tabs.png)  
  :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: Configurable tab has several nested tabs.

* Tab experiences must be fully responsive on mobile (Android and iOS).

> [!TIP]
> * Include a personal bot alongside a personal tab.
> * Allow users to share content from their personal tab.

## Bots

> ![NOTE]
> The topics under Bots are inline with Microsoft Commercial Marketplace Policy number 1140.4.3.

If your app includes a bot, make sure it adheres to these guidelines.

> [!TIP]
> For information on creating a high-quality app experience, see[Teams bot design guidelines](~/bots/design/bots.md).

### Bot commands

Analyzing user input and predicting user intent is difficult. Bot commands provide users a set of words or phrases for your bot to understand.

* Listing supported bot commands in your app configurations is highly recommended. These commands display in the compose box when a user tries to message your bot.

  ![Bot Commands Listed](~/assets/images/submission/validation-bot-commands-listed.png)  
  :::image type="icon" source="~/assets/images/submission/validation-correct-icon.png"::: Bot commands listed in manifest.

  ![Bot Commands not Listed](~/assets/images/submission/validation-bot-commands-not-listed.png)  
  :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: Bot commands not listed in manifest.

* All commands that your bot supports must work correctly, including generic commands such as **Hi**, **Hello**, and **Help**.

  ![Bot Help Command](~/assets/images/submission/validation-bot-help-command.png)  
  :::image type="icon" source="~/assets/images/submission/validation-correct-icon.png"::: Bot responding to **Help** command.

* Bot commands shouldn't show a dead end to a user, the commands must always provide a way forward.

  ![Bot Command Dead](~/assets/images/submission/validation-bot-commands-deadend.png)  
  :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: Bot command with a dead end to the user.

> [!TIP]
> For personal bots, include a **Help** tab that further describes what your bot can do.

### Bot welcome messages

* Bots must send a welcome message during first run. For the best experience, the message should include the value proposition of your bot, how to configure the bot, and briefly describe all supported bot commands. You can display the message using an Adaptive Card with buttons for better usability. For more information, see [how to trigger a bot welcome message](~/bots/how-to/conversations/send-proactive-messages.md).

  ![Bot Welcome Message](~/assets/images/submission/validation-bot-welcome-message.png)  
  :::image type="icon" source="~/assets/images/submission/validation-correct-icon.png"::: Bot sends FRE welcome message describing supported bot commands.

  ![Bot No Welcome Message](~/assets/images/submission/validation-bot-no-welcome-message.png)
  :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: Bot doesn't send a welcome message.

* Bot welcome messages in channels and chats are optional during first run, especially if the bot is available for personal use and performs similar actions. If your bot sends welcome messages, it must not send to users individually (it's considered [spamming](#bot-message-spamming)). The message should also mention the person who added the bot.

  ![Welcome Message Not Triggered](~/assets/images/submission/validation-bot-welcome-message-not-triggered.png)  
  :::image type="icon" source="~/assets/images/submission/validation-correct-icon.png"::: Welcome message not triggered in Teams scope.

  ![Welcome Message Triggered](~/assets/images/submission/validation-bot-welcome-message-triggered.png)  
  :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: Welcome message triggered in Teams scope.

* Notification-only bots must send a welcome message that conveys it won't reply to users' messages.

  ![Notification Bot Conveys Message](~/assets/images/submission/validation-bot-notification-bot-convey-message.png)  
  :::image type="icon" source="~/assets/images/submission/validation-correct-icon.png"::: Notification only bot sends it won't reply to user messages.

  ![Notification Bot doesn't convey](~/assets/images/submission/validation-bot-notification-bot-doesn't-convey-message.png)  
  :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: Notification only bot doesn't send a welcome message.

> [!TIP]
> In welcome messages to individual users, a carousel tour can provide an effective overview of your bot and any other app features to encourage users to try bot commands. For example, **Create a task**.

### Bot message spamming

Bots must not spam users by sending multiple messages in short duration.

* **Bot messages in channels and chats**: Don't spam users by creating separate posts. Create a single post with replies in the same thread.

  ![Bot Spamming One Message](~/assets/images/submission/validation-bot-message-spamming-one-message.png)  
  :::image type="icon" source="~/assets/images/submission/validation-correct-icon.png"::: User receives only one welcome message.

  ![Bot Spamming Multiple Message](~/assets/images/submission/validation-bot-message-spamming-multiple-messages.png)  
  :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: User receives the same welcome message in multiple posts.


* **Bot messages in personal apps**: Don't send multiple messages in quick duration. Send one message with complete information. Avoid multi-turn conversations to complete a single workflow. Use a form (or task module) to collect all inputs from a user at one time. NLP based conversational chatbots can use multi turn conversation to make the discussion more engaging and complete a workflow.

  ![Bot Using task Module](~/assets/images/submission/validation-bot-messages-using-task-module.png)  
  :::image type="icon" source="~/assets/images/submission/validation-correct-icon.png"::: Bot using a task module to collect information.

  ![Bot Using Mutliple Conversation](~/assets/images/submission/validation-bot-messages-using-mutliple-conversation.png)  
  :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: Bot using multi turn conversation to complete a repetitive workflow.

* **Welcome messages**: Don't repeat the same welcome message over regular intervals. For example, when a new member is added to a team, don't spam the other members with a welcome message. Message the new member personally.

### Bot notifications

Bot notifications must include content relevant for the scope you define for the bot (team, chat, or personal).

  ![Bot Notification Relevant](~/assets/images/submission/validation-bot-notifications-relevant.png)  
  :::image type="icon" source="~/assets/images/submission/validation-correct-icon.png"::: Bot notifications are relevant.

  ![Bot Notification not relevant](~/assets/images/submission/validation-bot-notifications-not-relevant.png)  
  :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: Bot notifications aren't relevant.

### Bots and Adaptive Cards

Adaptive Cards are a highly recommended way to display bot messages. The cards must be lightweight and only include upto six actions. To display more content, consider using a task module or tab.

Bot experience must be responsive on mobile. Bot responses must provide a way forward where applicable. Bots must be responsive and display an error message for failures. Bot should provide contextual information (including the message’s origin).

For more information about cards, see:

* [Designing Adaptive Cards](~/task-modules-and-cards/cards/design-effective-cards.md)
* [Cards reference](~/task-modules-and-cards/cards/cards-reference.md#types-of-cards)

### Notification only Bots 

Apps that consist of notification-only bots provide user value by triggering user notifications based on certain triggers or events in the core app or backend. For example, a new sales lead or prospect is added for the sales team to follow up.

A notification provides value in Teams if:
1.	Posted card or text provides adequate details requiring no further user action.
1.	Posted card or text provides adequate preview information for a user to take action or decide to view further details in a link opening outside Teams.

Apps that provide only notifications with content such as **You have a new notification, click to view**, and require user to navigate outside of Teams don't provide significant value within Teams.

  ![Bot inadequete information](~/assets/images/submission/validation-bot-notification-only-inadequete-info.png)  
  :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: Inadequate information in notification preview.

  ![Bot Adequete information](~/assets/images/submission/validation-bot-notification-only-adequete-info.png)  
  :::image type="icon" source="~/assets/images/submission/validation-correct-icon.png"::: Adequate information in notification preview to minimize context switching.

>![TIP]
> Provide a preview and basic inline user actions in the posted card so that the user is not required to navigate outside Teams for all actions (irrespective of complexity).

 
## Messaging extensions

> [!NOTE]
> The topics under Messaging extensions are inline with Microsoft Commercial Marketplace Policy number 1140.4.4.

If your app includes a messaging extension, make sure it adheres to these guidelines.

> [!TIP]
> For information on creating a high-quality app experience, see the [Teams messaging extension design guidelines](~/messaging-extensions/design/messaging-extension-design.md).

### Action commands

Action-based messaging extensions should do the following:

* Allow users to trigger actions on a message without completing intermediate steps, such as sign in.

  ![No Intermediate Step ](~/assets/images/submission/validation-messaging-extension-no-intermediate-step.png)  
  :::image type="icon" source="~/assets/images/submission/validation-correct-icon.png"::: No intermediate step available.

  ![Intermediate Step Available](~/assets/images/submission/validation-messaging-extension-intermediate-step-available.png)  
  :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: Intermediate step **Sign in** available.

* Pass the message context to the next work state.

  ![App Passes Message](~/assets/images/submission/validation-messaging-extension-app-passes-message.png)  
  :::image type="icon" source="~/assets/images/submission/validation-correct-icon.png"::: App passes message context (**Hello Good Morning Meeting**) to next work state (task module).

  ![App doesn't Pass Message](~/assets/images/submission/validation-messaging-extension-app-doesnot-pass-message.png)  
  :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: App doesn't pass message context (**Hello Good Morning Meeting**) to next work state (poll).

* Incorporate the host app name instead of a generic verb for action commands triggered from a chat message, channel post, or call to action within apps. For example, use **Start a Skype Meeting** 
for **Start Meeting**, **Upload file to DocuSign** for **Upload file**.

  ![Action Command Host name](~/assets/images/submission/validation-messaging-extension-action-command-host-name.png)    
  :::image type="icon" source="~/assets/images/submission/validation-correct-icon.png"::: Action command incorporates host app name.

  ![Action Command verb](~/assets/images/submission/validation-messaging-extension-action-command-verb.png)  
  :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: Action command uses a generic verb (**New Task**).

### Preview links (link unfurling)

Messaging extensions must preview recognized links in the Teams compose box. Don't add domains that are outside your control (either absolute URLs or wildcards). For example, `yourapp.onmicrosoft.com` is valid but `*.onmicrosoft.com` isn't valid. Top-level domains also are prohibited. For example, `*.com` or `*.org`.

### Search commands

* Search based messaging extensions must provide text that helps the users to search effectively.

  ![Help Text available](~/assets/images/submission/validation-search-commands-text-available.png)  
  :::image type="icon" source="~/assets/images/submission/validation-correct-icon.png"::: Text to search effectively available.

  ![Help Tetxt not Available](~/assets/images/submission/validation-search-commands-text-not-available.png)  
  :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: Text prompt isn't available to search effectively.

* @mention executables must be clear, easy to understand, and readable.
  ![Search Command Unclear Excecutable](~/assets/images/submission/validation-search-command-unclear-executable.png)  
  :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: Unclear @mention executable.

### Search based messaging extension only apps

Apps that consist of search-based messaging extension provide user value by sharing cards that allow for contextual conversations without context switching.

A card shared via a messaging extension provides value in Teams if:
1.	Posted card provides adequate details requiring no further user action.
1.	Posted card provides adequate preview information for a user to take action or decide to view 
further details in a link opening outside Teams.

For a search-based message extension only app to pass validation, points 1 and 2 mentioned earlier are required as 
baseline to ensure the user experience isn't broken.

  ![Search based messaging inadequate](~/assets/images/submission/validation-search-based-messaging-ext-inadequete-info.png)  
  :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: Inadequate information in posted card.

  ![Search based messaging adequete](~/assets/images/submission/validation-search-based-messaging-ext-adequete-info.png)  
  :::image type="icon" source="~/assets/images/submission/validation-correct-icon.png"::: Adequate information in posted card.

Link unfurling only apps don't provide significant value within Teams. Consider building additional workflows in your app, if your app only supports link unfurling and has no other functionality.

## Task modules

> ![NOTE]
> The following content is inline with Microsoft Commercial Marketplace Policy number 1140.4.2.

A task module must include an icon and the short name of the app it's associated with.

Task modules shouldn't embed an entire app and only display the components required to complete a specific action.

[Refer task module design guidelines](/platform/task-modules-and-cards/task-modules/design-teams-task-modules).

  ![Task module Displays Components](~/assets/images/submission/validation-task-module-displays-components.png)  
  :::image type="icon" source="~/assets/images/submission/validation-correct-icon.png"::: Task module displays components relevant to the specific action (creation of poll in this example)

  ![Task Module Embeds app](~/assets/images/submission/validation-task-module-embeds-app.png)  
  :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: Task module embeds the entire app.

> [!TIP]
> For more information on creating a high-quality app experience, see [Teams task module design guidelines](~/task-modules-and-cards/task-modules/design-teams-task-modules.md).

## Meeting extensions

>[!NOTE]
> The follwoing content is inline with Microsoft Commercial Marketplace Policy number 1140.4.2.


> [!TIP]
> For information on creating a high-quality app experience, see the [Teams meeting extension design guidelines](~/apps-in-teams-meetings/design/designing-apps-in-meetings.md).

If your app includes a meeting extension, make sure it adheres to these guidelines:

* Meeting extensibility apps:  Meeting extensibility apps must offer a responsive in-meeting experience that is responsive and aligned to the Teams meeting experience. Pre and post-meeting experiences aren't mandatory.

  * Pre-meeting app experience: A pre-meeting experience must be relevant to the workflow of the meeting. Users can find and add meeting apps, perform pre-meeting tasks such as developing a poll to survey the meeting participants. 

  * Post-meeting app experience: A post-meeting experience must be relevant to the workflow of the meeting. Users can view the results of the meeting such as poll survey results or feedback and other app content.

  * In-meeting app experience: You can engage meeting participants during the meeting and enhance the meeting experience for all the attendees. Attendees must not go outside the Teams meeting for completing core user workflows.

Your app must offer value beyond providing custom Together Mode scenes in Teams. 

Shared meeting stage feature can only be launched through the Teams desktop app. However, the shared meeting stage consumption experience must be usable and not broken when viewed on mobile devices.

### Pre- and post-meeting experience

* Pre- and post-meeting screens must adhere to general tab design guidelines. For more information, see [Teams design guidelines](~/tabs/design/tabs.md).
* Tabs must not have horizontal scrolling.
* Tabs should have an organized layout when displaying multiple items. For example, more than 10 polls or surveys, see [example layout](~/apps-in-teams-meetings/design/designing-apps-in-meetings.md#after-a-meeting).
* Your app must notify users when the results of a survey or poll are exported by stating, **Results successfully downloaded**.

### In-meeting experience

* Apps must only use a dark theme during meetings. For more information, see [Teams design guidelines](~/apps-in-teams-meetings/design/designing-apps-in-meetings.md#theming).
* A tooltip should display the app name when hovering over the app icon during meetings.
  ![Tooltip Display app name](~/assets/images/submission/validation-in-meeting-exp-display-app-name.png)  
  :::image type="icon" source="~/assets/images/submission/validation-correct-icon.png"::: Tooltip displays app name (on hover).

* Messaging extensions must function the same during meetings as they do outside meetings.

### In-meeting tabs

Ensure to adhere to the following guidelines:

* Must be responsive. 
* Make sure to maintain padding and component sizes.
* Must have a back button if there's more than one layer of navigation.

  ![In-meeting Back Button Available](~/assets/images/submission/validation-in-meeting-exp-back-button.png)  
  :::image type="icon" source="~/assets/images/submission/validation-correct-icon.png"::: Back button is present.

  ![In-meeting Back Button Absent](~/assets/images/submission/validation-in-meeting-exp-back-button-absent.png)  
  :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: Back button absent.

* Must not include more than one close button. It may confuse users since there's already a built-in header button to dismiss the tab.
* Must not have horizontal scrolling.

### In-meeting dialogs

Ensure to adhere to the following guidelines:

* Should be used sparingly and for scenarios that are light and task-oriented.
* Must display content in a single column and not have multiple navigation levels.
* Must not use task modules.
* Must align with the center of the meeting stage.

  ![In-meeting dialog not aligned](~/assets/images/submission/validation-in-meeting-dialog-not-aligned.png)  
  :::image type="icon" source="~/assets/images/submission/validation-incorrect-icon.png"::: In meeting dialog not aligned to center of the meeting stage.

* Should be dismissed once a user selects a button or performs an action.

## Notifications

>[!NOTE]
> The topics under Notifications are inline with Microsoft Commercial Marketplace Policy number 1140.4.2.

If your app uses the [activity feed APIs provided by Microsoft Graph](/graph/teams-send-activityfeednotifications), make sure it adheres to the following guidelines.

### General

Ensure to adhere to the following guidelines:

* All the notification triggers specified in your app configuration should get a notification.
* Notifications must be localized per the supported languages configured for your app.
* Notifications must display within five seconds of user action.

### Avatars

Ensure to adhere to the following guidelines:

* The notification avatar should match your app's color icon.
* Notifications triggered by a user should include the user's avatar.

### Spamming

Ensure to adhere to the following guidelines:

* Apps must not send more than 10 notifications per minute to a user.
* Bots and the activity feed shouldn't trigger duplicate notifications.
* Notifications must provide some value to users and not be used for trivial or irrelevant events.

### Navigation and layout

Ensure to adhere to the following guidelines:

* Notifications must adhere to the Teams activity feed layout and experience.
* When selecting a notification, the user must be directed to relevant content within Teams.

## Next step

> [!div class="nextstepaction"]
> [Create a Partner Center account](~/concepts/deploy-and-publish/appsource/prepare/create-partner-center-dev-account.md)