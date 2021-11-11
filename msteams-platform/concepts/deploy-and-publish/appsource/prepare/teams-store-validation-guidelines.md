---
title: Microsoft Teams store validation guidelines
description: Describes the guidelines every app submitted to the Teams store (AppSource) must follow.
author: heath-hamilton
ms.author: surbhigupta
ms.topic: reference
ms.localizationpriority: high
---
# Microsoft Teams store validation guidelines

Follow the guidelines to increase the likelihood of your app to pass the Microsoft Teams store submission process.

The Teams-specific guidelines are updated with new capabilities, user feedback, and 
business rule changes and adhere to the Microsoft [commercial marketplace certification policies](/legal/marketplace/certification-policies).

> [!NOTE]
> Some guidelines may not be applicable to your app. For example, if your app doesn't include a bot, you can ignore bot-related guidelines.

We've cross-referenced the guidelines to the Microsoft commercial certification policies and added Do’s and Don’ts with examples from pass/fail scenarios we have encountered in our validation process, for you to follow as you build your Teams app. Certain guidelines are marked as **Mandatory Fix**. If your app submission does not meet these guidelines, you will receive a failure report from us with steps to mitigate. Your app submission will pass Microsoft Teams Store Validation only after you have fixed these. Other guidelines are marked as **Suggested Fix**. For an ideal user experience, we suggest you fix these, however, your app submission will not be blocked from publishing on the Teams store, if you choose not to fix. 

## Value proposition
> [!NOTE]  
> The following section refrences Microsoft Commercial Certification Policy # 1140.1 and provides additional guidance to developers of Microsoft Teams apps on their offer’s value proposition. 

### App name

> [!NOTE]  
> The following section references Microsoft Commercial Certification Policy # 1140.1.1 and provides additional guidance to developers on naming their apps. 

An app's name plays a critical role in how users discover it in the store. Remember the following about app names:

* The name must include terms relevant to your users. If your app is only a connector for Teams, don’t name it Contoso Bot or Contoso Tab, instead name it Contoso Connector.   
* Names of core Teams features should not be included in your app name, such as:  
  * **Chat**
  * **Contacts**
  * **Calendar**
  * **Calls**
  * **Files**
  * **Activity**
  * **Apps**
  * **Help**
* Common nouns must be prefixed or suffixed with the developer's name (for example, **Contoso Tasks** rather than **Tasks**).
* Must not use **Teams** or other Microsoft product names such as (but not limited to) Excel, PowerPoint , Word, OneDrive, SharePoint, OneNote, Azure, Surface, Xbox that could falsely indicate co-branding or co-selling. (For more information about referencing Microsoft software, products, and services, see the [Microsoft Trademark and Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general)).
* If your app is part of an official partnership with Microsoft that explicitly allows you to use Microsoft Product names along with your app name, the name of your app must come first (for example, **Contoso Connector for Microsoft Teams**). You must provide proof of official partnership if requested during the validation process.
* Must not copy the name of an app listed in the store or other offer in the commercial marketplace.
* Must not contain profane or derogatory terms. The name also must not include racially or culturally insensitive language.
* Must be unique. . If your app Contoso is listed in the Microsoft Teams store and Microsoft AppSource and you want to list another app specific to a geography, such as Contoso Mexico, your submission must meet the following criteria:
  * Region specific functionality of the app must be called out in the title, metadata, first response app experience and help sections (example: Title must be Contoso Mexico). App title must be clearly differentiated from the pre-existing app from the same developer to avoid end user confusion.
  * When uploading the app package in Partner Center, you must select the right “Markets” where the app will be available under the “Availability” section.

 > [!TIP]  
 >  Your app’s branding on the Microsoft Teams store and Microsoft AppSource including your app name, developer name, app icon, Microsoft AppSource screenshots and video, short description and website either separately or taken together must not mimic or impersonate an official Microsoft offering unless your app is an official Microsoft 1P offering.

 > [!NOTE]  
 > App name, short description, long description. 

### Suitable for workplace consumption

> [!NOTE]  
> The following section references Microsoft Commercial Certification Policy # 1140.1.2  , # 100.8 and #100.10 and provides additional guidance to developers on building workplace appropriate apps.

App content must be suitable for general workplace consumption and abide by all restrictions listed in the commercial marketplace certification policies. Content related to religion, politics, gambling, and prolonged entertainment is prohibited.

Your app must facilitate group collaboration, improve an individual's productivity, or both. Apps intended for team bonding and socializing must be collaborative and designed for multiple participants. These types of apps also should not require a substantial time investment (>60 mins per session) or perceptively impact productivity.

### Similar platforms and services

> [!NOTE]  
> The following section references Microsoft Commercial Certification Policy # 1140.1.3. 

Apps must focus on the Teams experience and not include the names, icons, or imagery of other similar chat-based collaboration platforms or services services such as Slack, Zoom, Webex, Discord, Flock, Stride, Hip chat, Hangouts Meet, Gsuite, and Workplace by Facebook, within the app content or in the app’s metadata  unless your app provides specific interoperability.

### Feature names

App feature names in buttons and other UI text must not conflict with terminology reserved for Teams and other Microsoft products. For example, **Start meeting**, **Make call**, or **Start chat**. Include your app name if you can't completely avoid this, such as **Start Contoso meeting** instead of **Start meeting**.

### Authentication

> [!NOTE]  
> The following section refrences Microsoft Commercial Certification Policy #1140.1.4 and provides guidance to developers on authenticating their apps with external services. 

For information on how to implement app authentication, see [authentication in Teams](~/concepts/authentication/authentication.md).

#### Authenticating with external services

Remember the following if your app authenticates users with an external service.

* **Sign in, sign out, and sign up experiences**:
  * Apps that depend on external accounts or services must provide clear and simple sign in, sign out, and sign up experiences.
  * When a user sign out, they must sign out only from the app and remain signed in to Teams.
  * Apps that depend on external accounts or services must provide a way forward for new users to sign up or contact the app publisher to learn more about the services & potentially acquire credentials .  Way forward must be provided in the app’s manifest and AppSource long description and in the app first run experience (bot welcome message, tab setup/config page).
  * Apps that require tenant admin to complete one time setup must clearly call out dependency on tenant admin to configure the app (before any other tenant user can install and use the app). Dependency must be called out in the app’s manifest and AppSource long description, all first run experience touchpoints including bot welcome message, tab setup/config page, help text as deemed necessary as part of bot response/compose extension/static tab content. 

* **Content sharing experiences**: Apps that require authentication with an external service to share content in Teams channels must clearly state in help documentation (or similar resources) how to disconnect or unshare content if that feature is supported on the external service. This does not mean the ability to unshare content must be present in your Teams app.

## Security
> [!NOTE]  
> The following section references Microsoft Commercial Certification Policy # 1140.3.

### Financial information
> [!NOTE]  
> The following section references Microsoft Commercial Certification Policy #1140.3.1 and provides guidance on transmission of financial information within the Teams interface and notifies developers of restricted payment scenarios on the mobile (Android  and iOS) version of their Teams app.

Apps must not ask users to make payments within the Teams interface (see the following image). Financial instrument details must not be transmitted to users through a bot interface.
  > ![In App Payments](/assets/images/submission/validation-guideline-authenticate-sign-in-experience.png)

You may link to secure, external payment services only if you made the appropriate disclosure in your terms of use, privacy policy, or any profile page or website before the user agreed to use the app.

No payment shall be made through an app for goods or services prohibited by General policy 100.10 Inappropriate content.

Apps running on the iOS or Android version of Teams must adhere to the following guidelines:

* Apps must not include in-app purchases, trial offers, or UI that aims to upsell to paid versions or links to online stores where users can purchase or acquire other content, apps, or add-ins.  
    > ![In-app Purchases](/assets/images/submission/validation-financial-information-in-app-purchase.png)

    > Mobile version of the app allows in-app purchase, has UI that aims to upsell to paid versions.

    > ![Online Stores](/assets/images/submission/validation-financial-information-online-stores.png)

    > Mobile version has links to online stores where users can make a purchase decision.

* If your app requires an account, users can sign up for an account at no charge. The use of the term **free** or **free account** is prohibited.
* You may determine whether an account is active indefinitely or for a limited time, but if the account expires, no UI, text, or links indicating the need to pay may be shown.
* Your app's privacy policy and terms of use pages must be free of any commerce-related UI or links.

### Bots
> [!NOTE]
> The following section references Microsoft Commercial Marketplace Policy # 1140.3.2

For apps that use the Microsoft Azure Bot Service (such as bots and messaging extensions), you must follow all requirements defined in the Microsoft [Online Services Terms](https://www.microsoftvolumelicensing.com/DocumentSearch.aspx?Mode=3&DocumentTypeId=46).

Bots must always ask permission to upload a file and display a confirmation message after the file uploads. (See the following image)
  > ![Confirmation Message](/assets/images/submission/validation-bot-confirmation-message.png)

### External domains
> [!NOTE]
> The following section references Microsoft Commercial Marketplace Policy #1140.3.3 and provides developer guidance on usage of restricted domains in the validDomains manifest property.

In most cases, you must not include domains outside of your organization's control (including wildcards) and tunneling services in your app's domain configurations. The following exceptions include:

* If your app uses the Azure Bot Service's OAuthCard, you must include `token.botframework.com` as a valid domain or the **Sign in** button won't work.
* If your app relies on SharePoint, you can include the associated root SharePoint site as a valid domain using the `{teamSiteDomain}` context property.

#### Government Community Cloud listings

To distribute your app to Government Community Cloud (GCC) users while avoiding duplicate listings in the Teams store, the authentication process must identify and route users to a GCC-specific or expected URL.

### Sensitive content

Your app must not post sensitive data, such as credit card or financial payment instrument data. The app also must not display health, contact tracing, or other personally identifiable information (PII) to an audience not intended to view that content.

Warn users before your app downloads any files or executables (.exe) into the user's machine or environment.

## General functionality and performance

> [!NOTE]
> The following section references Microsoft Commercial Marketplace Policy #1140.4.

### Launching external functionality

Apps must not take users out of Teams for core user scenarios. App content and interactions should occur within Teams capabilities, such as bots, adaptive cards, and task modules.

You should link users somewhere in Teams and not to an external site or app. For scenarios that require external functionality, your app must take explicit user permission to launch that functionality. 

Button UI text that launches external functionality must include content to indicate the user is taken out of the Teams instance. For example, include text such as **This way to Contoso.com** or **View in Contoso.com**.   

### Compatibility

Apps must be fully functional on the following operating systems and browsers:

* Microsoft Windows 7 and later
* macOS 10.10 and later
* Microsoft Edge 12 and later
* Google Chrome 51.0 and later
* iOS 9.0 and later
* Android 4.4 and later

Your app must show a graceful failure message on unsupported browsers and operating systems.

### Response time

Teams apps must respond within a reasonable timeframe or show a loading/typing indicator or message or warning.

* Tabs must respond within two seconds or display a loading message or warning.
* Bots must respond to user commands within two seconds or display a typing indicator.
* Messaging extensions must respond to user commands within two seconds.
* Notifications must display within two seconds of the user action.

## App package and store listing

App packages must be correctly formatted and include all required information and components.

> [!TIP]  
> You must include detailed testing instructions for validating your app submission with steps to configure the app, test accounts (in case app depends on external accounts for authentication), summary of expected app behavior for the core workflows within Teams, clearly describe limitations, conditions, or exceptions to the functionality, features, and deliverables described in the app long description and related materials and emphasize any considerations testers need to be aware of while validating your app submission. Pre-populate the test accounts with dummy data where possible to aid testing. 

### App manifest

The Teams app manifest defines your app's configurations.

* Your manifest must conform to a publicly released manifest schema. For information, see the [manifest reference](~/resources/schema/manifest-schema.md). Do not submit your app using a preview version of the manifest.
* If your app includes a bot or messaging extension, your manifest must be consistent with Bot Framework metadata, including bot name, logo, privacy policy link, and terms of service link.
* If your app uses Azure Active Directory (Azure AD) for authentication, include the Azure AD Application (client) ID in the manifest. For more information, see the [manifest reference](~/resources/schema/manifest-schema.md#webapplicationinfo).

### App icons

Icons are one of the main elements people see when browsing the Teams store. Your icons should communicate your app's brand and purpose while also adhering to the following requirements:

* Your app package must include two PNG versions of your app icon: A color icon and an outline icon.
* The color version of your icon displays in most Teams scenarios and must be 192x192 pixels. Your icon symbol (96x96 pixels) can be any color or colors, but it must sit on a solid or fully transparent square background.
* The outline version of your icon displays when your app is in use and “hoisted” on the app bar on the left side of Teams and when a user pins your app's messaging extension. It must be 32x32 pixels and can be white with a transparent background or transparent with a white background (no other colors are permitted). The icon should not have any extra padding around the symbol.
* Correctly sized and formatted icons must be included in your app package. The icons also must match what's submitted with the store listing metadata.

For more information, see the Teams app [icon guidelines](~/concepts/build-and-test/apps-package.md#app-icons).

### App descriptions

You must have a short and long description of your app. The descriptions in your app configurations and Partner Center must be the same.

Descriptions should not directly or through insinuation disparage another brand (Microsoft owned or otherwise). Make sure your description does not include claims that can't be substantiated (for example, "Guaranteed 200 percent increase in efficiency").

#### Short description

A short description is a concise summary of your app that highlights its value proposition and is directed at your target audience.

**Do:**

* Keep the short description to one sentence.
* Put the most important information first.
* Include keywords that customers are likely to search for.
* Don't repeat your app name.

**Don't:**

* Use the word **app** in the short description.

#### Long description

The long description can provide an engaging narrative that highlights your app's value proposition, primary audience, and target industry. While this description can be as long as 4,000 characters, most users will only read between 300-500 words.

**Do:**

* Use [Markdown](https://support.office.com/article/use-markdown-formatting-in-teams-4d10bd65-55e2-4b2d-a1f3-2bebdcd2c772) to format your description.
* Use active voice and speak to users directly. For example, *You can ...*.
* List features with bullet points so it's easier to scan the description.
* Clearly describe limitations, conditions, or exceptions to the functionality, features, and deliverables described in the listing and related materials before the user installs your app. The Teams capabilities your app supports must relate to the core functions your listing describes.
* Ensure the app description matches with the functionality available inside Teams app. Any reference to workflows outside of the Teams app must be limited and distinctly called out from the Teams app functionality.
* Include a help or support link.
* Refer to **Microsoft 365** instead of **Office 365**.
* If you need to reference **Teams**, write the first reference as **Microsoft Teams**. Subsequent references can be shortened to **Teams**.
* Use the following language when describing how the app works with Teams (or Microsoft 365):
  * **... works with Microsoft Teams.**
  * **... working with Microsoft Teams.**
  * **... within Microsoft Teams.**
  * **... for Microsoft Teams.**
  * **... integrated with Microsoft Teams.**
  * **... built for...**
  * **... developed for...**
  * **.. designed for...**


**Don't:**

* Exceed 500 words.
* Abbreviate **Microsoft** as **MS** or **MSFT**.
* Indicate the app is an offering from Microsoft, including using Microsoft slogans or taglines.
* Use copyrighted brand names you don't own.
 * Use the following language unless you are a certified Microsoft partner:
  * "... certified for ..."
  * "... powered by ..."
* Include typos, grammatical errors.
* Unnecessarily capitalize the entire manifest/AppSource long description or app content.
* Include links to AppSource.
* Make unverified claims (for example: best, top, ranked), unless accompanied by the source of the claim.
* Compare your offer with other marketplace offers.



### Screenshots

Screenshots provide a prominent visual preview of your app to complement your app name, icon, and descriptions. Remember the following about screenshots:

* You can have up to five screenshots per listing.
* Supported file types include PNG, JPEG, and GIF.
* Dimensions should be 1366x768 pixels.
* Maximum size of 1,024 KB.

**Do:**

* Focus on your app's capabilities (for example, how people can communicate with your bot).
* Include content that accurately represents your app.
* Use text judiciously.
* Frame screenshots with a color that reflects your brand and include marketing content, similar to the [Freshdesk listing](https://appsource.microsoft.com/product/office/WA104381505?src=office&tab=Overview) example (dimension requirements apply to the whole image and not just the screenshot).

**Don't:**

* Show specific devices, such as phones or laptops.
* Display chrome or UI that isn't in your app.
* Capture any Teams or browser UI in your screenshots.
* Include mockups that inaccurately reflect your app's actual UI, such as showing your app being used outside of Teams.

> [!TIP]
> A video can be the most effective way to communicate why people should use your app. A video also is the first thing users see in your listing (by default, a video displays before screenshots). For more information, see [create a video for your store listing](~/concepts/deploy-and-publish/appsource/prepare/submission-checklist.md#create-a-video).

### Privacy policy

The privacy policy can be specific to your Teams app or an overall policy for all your services.

* If you use a generic privacy policy template, you must add a reference to **services**, **applications**, and **platforms in the scope of your privacy policy**. You don’t need to specifically mention your Teams app in the scope, if you include a reference to **services**, **applications** and **platforms**, the app validation process will construe these references to include your Teams app along with your other services or websites.
* Must include how you handle user data storage, retention, and deletion. You also must describe the security controls you use for data protection.
* Must include your contact information.
* Should not contain URLs that are broken or for beta or staging purposes.
* Must not include links to AppSource.
* Access to your privacy policy must not require authentication.
* Must not include any commerce UI/store links.

### Terms of use

Your terms of use should be specific and applicable to your offering. Accessing terms of use must not require authentication. Terms of Use should be hosted on your own domain. Terms of Use should be a secure (HTTPS) link.

### Support links

Your app's support URLs should not require authentication. For example, users should not have to log in to contact you. 

Support URLs must include your contact details or a way forward for users to raise a support ticket. If your support URL is hosted on GitHub, the GitHub page must be under your ownership and must include your contact details or a way forward for users to raise a support ticket.

  > ![Support URL](/assets/images/submission/validation-supportlinks-authentication.png)

  > Authentication required to access support link.

### Localization

If your app supports localization, your app package must include a file with language translations that display based on the Teams language setting. The file must conform to the Teams localization schema. For more information, see the [Teams localization schema](~/concepts/build-and-test/apps-localization.md).

## Tabs
> [!NOTE]  
> This section references Microsoft Commercial Marketplace Policy #1140.4.2.
If your app includes a tab, make sure it adheres to these guidelines.

> [!TIP]
> For information on creating a high-quality app experience, see the [Teams tab design guidelines](~/tabs/design/tabs.md).

### Setup

* Tab setup **must not dead-end** a new user. Provide a message on how to complete the action or workflow.

  >![Create new account](/images/submission/validation-tabs-setup-createnewaccount.png)

  > Way forward link **Create new account** for new users is available.

  > Tab configuration dead ends the user, not way forward guidance.

  >![New Uswe Signup](/images/submission/validation-tabs-setup-newuser.png)

  > Missing way forward for a new user to sign up.

* For the best first run experience, authenticate your users during the tab set up and not after. Authentication can happen outside the tab configuration window. 

* Tab configuration must not take user outside Teams. The user should not leave the tab configuration experience inside Teams, to create content outside of Teams and then return to Teams to pin it. Tab configuration screen must clearly explain the value of configuration and how to configure.

  > ![Acquire Profile Name](/assets/images/submission/validation-tabs-setup-profilename.png)

  > Requires navigating outside the configuration experience to acquire **Profile Name**.
* Tab configuration screen must not embed an entire website. Keep your configuration experience focused. For example, if you are building a project management app that lets users configure a project in a channel, keep the tab configuration screen focused on allowing the user to select a project from your app to configure in the channel.

  > ![Configuration Experience](/images/submission/validation-tabs-setup-configuration-experience.png)  
  > Configuration experience allows user to configure a specific mind map (project) to the channel. Offers a list of projects to choose from.
  >  ![Configuration Screen](/images/submission/validation-tabs-setup-configuration-screen.png)  
  >  Entire website embedded in tab configuration screen.

* Tab configuration screen must not ask users to embed an URL. Asking users to configure an URL during tab set-up is a broken UX - user leaves tab configuration screen, acquires URL, returns to the configuration screen and inputs the URL. A pre-existing Teams feature already allows users to pin a website link in the channel. If your app asks user to embed a website URL during tab configuration and app functionality is limited to displaying the entire content in this configured website in the channel tab, your app does not offer significant value to the user. Consider adding additional capabilities or workflows to your app. 
  > ![Configured URL](/assets/images/submission/validation-tabs-setup-configured-url.png)
  > App asks user to configure an URL during tab set-up. App functionality extends beyond displaying only the content in configured URL. 
  > ![Configured URL limited](/assets/images/submission/validation-tabs-setup-configured-url-two.png)
  > App asks user to configure an URL during tab set-up. App functionality limited to displaying content in configured URL.

### Views

* The sign-in screen area must not use large logos.
  > ![App Login Emphasis](/images/submission/validation-views-applogin.png)  
  > Emphasis and focus on app login.  

  > ![App Logo](/assets/images/submission/validation-views-applogo.png)
  >  Focus on app logo and inefficient use of configuration screen. App logo also available in top left corner. Valuable steps to configure the app are hidden under vertical scroll.  

* Content can be simplified by breaking it down across multiple tabs.  

  > ![Multiple Tabs](/images/submission/validation-views-multiple-tabs.png)  
  > Breakdown complex content in static tabs across multiple tabs.

* Tabs should not have a duplicate header. Remove the duplicate logo from the iframe since the tab framework already displays the app icon and name.

  >![Duplicate Header Logo](/assets/images/submission/validation-views-duplicate-header-logo.png) 

  > Tab framework displays your app logo. Recommend removing the duplicate logo from the tab iframe.

### Navigation

* Tabs must not have more than three levels of navigation.

* Static tabs must not provide navigation that conflicts with the primary Teams navigation. If you provide a left navigation in your static tab, it must not include only icons or only icons with stacked text. It must not be a collapsible rail with the option to see icons with stacked text (mimicking the Teams navigation bar). Include icons with inline text or only text or use hamburger menus instead of tab left rail.

  > ![Left navigation](/assets/images/submission/validation-navigation-left-navigation.png)

  > Only icons in tab left navigation. Conflicts with Teams left navigation.

  > ![Icon and Text](/assets/images/submission/validation-navigation-icon-text.png)

  > Icon and text in tab left navigation mimics Teams navigation.

  >  ![Collapsible Left Rail](/assets/images/submission/validation-navigation-collapsable-left-rail.png)

  > Collapsible left rail that mimics Teams primary navigation.

  > ![Static Tab](/assets/images/submission/validation-navigation-static-tab.png)

  > Side navigation pane to assist with complex navigation flows in a Static Tab is allowed. 

  > ![Horizonta Rail](/assets/images/submission/validation-navigation-horizontal-rail.png)

  >  Tab uses a horizontal rail for navigation instead of a left rail that conflicts with Teams primary navigation.

* Tabs with toolbar in left rail must leave 20px spacing from Teams left navigation. 
  > ![Spacing between Toolbar](/assets/images/submission/validation-navigation-spacing-between-toolbar.png)  

  > App provides 20 px spacing between toolbar in left rail and Teams navigation.

* The secondary and tertiary pages in a tab must be opened in a level two and level three view in the main tab area, which is navigated via breadcrumbs or left nav. You can also include the following components to aid tab navigation:
    * Back buttons
    * Page headers
    * Hamburger menus
* Tab should not have horizontal scroll. Whiteboarding apps and other apps that require a larger canvas to allow users to collaborate without a perceived broken app experience, can use horizontal scroll depending on their business need.  

* Deep links in tabs must not link to an external webpage but somewhere within Teams. For example, task modules or other tabs.

  > ![Launch button Linked](/assets/images/submission/validation-navigation-launch-button-linked-static-tab.png)

  > **Launch** button deep linked within Teams to a static tab.

  > ![View Button not Linked](/assets/images/submission/validation-navigation-view-button-not-linked-static-tab.png)

  > **View** button launches external webpage, not deep linked within the Teams app.

* Tabs should not allow users to navigate outside Teams for the core app experience. Tabs can redirect outside Teams for non-core workflows (For example – to raise a support ticket).

  > ![Core Workflow within Configuration Tab](/images/submission/validation-navigation-core-workflow-within-configuration.png)

  > App core workflow is collaboration on a blank diagram within a channel. Core workflow is within Teams in a configurable tab.

  > ![App Core Workflow Redirects Outside](/images/submission/validation-navigation-core-workflow-redirects-outside.png)

  > App core workflow is reading articles shared within a channel. To read the article, tab redirects user outside of Teams.

### Usability

* Tabs must provide value beyond just hosting an existing website.
* Users must be able to undo their last action in the tab.
* Tabs in a personal context may aggregate content from shared instances of the app.
* Tabs must be responsive to Teams themes. When a user changes the theme, the app's theme must reflect the selection.
* Tabs must use Teams-styled components, such as, Teams fonts, type ramps, color palettes, grid system, motion, tone of voice, and so on whenever possible.
* If your app functionality requires changes in the settings, include a **Settings** tab.
* Tabs must follow Teams interaction design, such as, in-page navigation, position and use of dialogs, information hierarchies, and so on whenever possible.
* Tab content in the iframe must not include features that mimic Teams core capabilities. For example, bots, messaging extensions, calling, meeting, and so on.

> [!TIP]
>
> * Include a personal bot alongside a personal tab.
> * Allow users to share content from their personal tab.

## Bots

If your app includes a bot, make sure it adheres to these guidelines.

> [!TIP]
> For information on creating a high-quality app experience, see the [Teams bot design guidelines](~/bots/design/bots.md).

### Bot commands

Analyzing user input and predicting user intent is difficult. Bot commands provide users a set of words or phrases your bot understands so they (and your bot) don't have to guess.

* Listing supported bot commands in your app configurations is highly recommended. These commands display in the compose box when a user tries to message your bot.
* All commands that your bot supports must work correctly, including the **Hi**, **Hello**, and **Help** command.

> [!TIP]
> For personal bots, include a **Help** tab that further describes what your bot can do.

### Bot welcome messages

* Bots should almost always send a welcome message during first run. For the best experience, the message should include the value proposition of your bot, how to configure the bot, and briefly describe all supported bot commands. You can display the message using an Adaptive Card with buttons for better usability. For more information, see [how to trigger a bot welcome message](~/bots/how-to/conversations/send-proactive-messages.md).
* Bot welcome messages in channels and chats are optional during first run, especially if the bot is available for personal use and performs similar actions. If your bot does send welcome messages, it must not send these to users individually (this is considered [spamming](#bot-message-spamming)). The message should also mention the person who added the bot.
* Notification-only bots must send a welcome message that conveys it will not reply to users' messages.

> [!TIP]
> In welcome messages to individual users, a carousel tour can provide an effective overview of your bot and any other app features. Including buttons to let users try bot commands is encouraged. For example, **Create a task**.

### Bot message spamming

Bots must not spam users by sending multiple messages in short succession.

* **Bot messages in channels and chats**: Don't spam users by creating separate posts. Create a single post with replies in the same thread.
* **Bot messages in personal apps**: Don't send multiple messages in quick succession. Send one message with complete information. Avoid multi-turn conversations to complete a single workflow. Instead, consider using a form (or task module) to collect all inputs from a user at one time.
* **Welcome messages**: Repeating the same welcome message over regular intervals is not allowed and considered spamming. For example, when a new member is added to a team, don't spam the other members with a welcome message. Message the new member personally instead.

### Bot notifications

Bot notifications must include content relevant for the scope you define for the bot (team, chat, or personal).

### Bots and Adaptive Cards

Adaptive Cards are a highly recommended way to display bot messages. Your cards must be lightweight and include only 1-3 actions. If you need to display more content, consider using a task module or tab.

See the following resources for more information:

* [Designing Adaptive Cards](~/task-modules-and-cards/cards/design-effective-cards.md)
* [Cards reference](~/task-modules-and-cards/cards/cards-reference.md#types-of-cards)

## Messaging extensions

If your app includes a messaging extension, make sure it adheres to these guidelines.

> [!TIP]
> For information on creating a high-quality app experience, see the [Teams messaging extension design guidelines](~/messaging-extensions/design/messaging-extension-design.md).

### Action commands

Action-based messaging extensions should do the following:

* Allow users to trigger actions on a message without completing intermediate steps, such as signing in.
* Pass the message context to the next work state.

### Preview links (link unfurling)

Messaging extensions should preview recognized links in the Teams compose box. Do not add domains that are outside your control (either absolute URLs or wildcards). For example, `yourapp.onmicrosoft.com` is valid but `*.onmicrosoft.com` is not valid. Top-level domains also are prohibited (for example, `*.com` or `*.org`).

### Search commands

* Search-based messaging extensions must provide text that helps users effectively search.
* @mention executables must be clear, easy to understand, and readable.

## Task modules

A task module must include an icon and the short name of the app it's associated with.

> [!TIP]
> For information on creating a high-quality app experience, see the [Teams task module design guidelines](~/task-modules-and-cards/task-modules/design-teams-task-modules.md).

## Meeting extensions

If your app includes a meeting extension, make sure it adheres to these guidelines.

> [!TIP]
> For information on creating a high-quality app experience, see the [Teams meeting extension design guidelines](~/apps-in-teams-meetings/design/designing-apps-in-meetings.md).

### Pre- and post-meeting experience

* Pre- and post-meeting screens must adhere to general tab design guidelines. For more information, see the [Teams design guidelines](~/tabs/design/tabs.md).
* Tabs must not have horizontal scrolling.
* Tabs should have an organized layout when displaying multiple items. For instance, more than 10 polls or surveys. See an [example layout](~/apps-in-teams-meetings/design/designing-apps-in-meetings.md#after-a-meeting).
* Your app must notify users when the results of a survey or poll are exported by stating, "Results successfully downloaded".

### In-meeting experience

* Apps must only use a dark theme during meetings. For more information, see the [Teams design guidelines](~/apps-in-teams-meetings/design/designing-apps-in-meetings.md#theming).
* A tooltip should display the app name when hovering over the app icon during meetings.
* Messaging extensions must function the same during meetings as they do outside meetings.

### In-meeting tabs

* Must be responsive. Make sure to maintain padding and component sizes.
* Must have a back button if there is more than one layer of navigation.
* Must not include more than one dismiss or close button. This may confuse users since there's already a built-in header button to dismiss the tab.
* Must not have horizontal scrolling.

### In-meeting dialogs

* Should be used sparingly and for scenarios that are light and task-oriented.
* Must display content in a single column and not have multiple navigation levels.
* Must not use task modules.
* Must align with the center of the meeting stage.
* Should be dismissed once a user selects a button or performs an action.

## Notifications

If your app uses the [activity feed APIs provided by Microsoft Graph](/graph/teams-send-activityfeednotifications), make sure it adheres to the following guidelines.

### General

* All the notification triggers specified in your app configurations should get a notification in the app.
* Notifications must be localized per the supported languages configured for your app.
* Notifications must display within five seconds of user action.

### Avatars

* The notification avatar should match your app's color icon.
* Notifications triggered by a user should include the user's avatar.

### Spamming

* Apps must not send more than 10 notifications per minute to a user.
* Bots and the activity feed should not trigger duplicate notifications.
* Notifications must provide some value to users and not be used for trivial or irrelevant events.

### Navigation and layout

* Notifications must adhere to the Teams activity feed layout and experience.
* When selecting a notification, the user must be directed to relevant content within Teams and not taken out of the Teams experience.

## Advertising

Apps must not display advertising, including dynamic ads, banner ads, and ads in messages.

## Next step

> [!div class="nextstepaction"]
> [Create a Partner Center account](~/concepts/deploy-and-publish/appsource/prepare/create-partner-center-dev-account.md)
