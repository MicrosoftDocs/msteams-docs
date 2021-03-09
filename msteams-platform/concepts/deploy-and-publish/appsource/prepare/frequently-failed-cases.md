---
title: Microsoft Teams store validation guidelines
description: Describes the guidelines every app submitted to the Teams store (AppSource) must follow.
author: heath-hamilton
ms.author: surbhigupta
ms.topic: reference
---
# Microsoft Teams store validation guidelines

Making sure your app follows these guidelines increases the likelihood you'll pass the Microsoft Teams store submission process. These Teams-specific guidelines complement the Microsoft [commercial marketplace certification policies](https://docs.microsoft.com/legal/marketplace/certification-policies) and are updated frequently to reflect new capabilities, user feedback, and business rule changes.

> [!TIP]
> Some guidelines may not be applicable to your app. For example, if your app doesn't include a bot, you can ignore bot-related guidelines.

## 1.0 Value proposition

### 1.1 App name

An app's name plays a critical role in how users discover it in the store. Remember the following about app names:

* The name must include terms relevant to your users.
* It must not copy the name of an existing app in the store or other offer in the commercial marketplace.
* Common nouns must be prefixed or suffixed with the publisher’s name (for example, “XYZ Tasks” rather than “Tasks”)
* It must not use **Teams** or other Microsoft product names that could falsely indicate co-branding or co-selling. (For more information about referencing Microsoft software, products, and services, see the [Microsoft Trademark and Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general)).
* If your app is part of an official partnership with Microsoft, the name of your app must come first (for example, Salesforce Connector for Microsoft Teams).

### 1.2 Suitable for workplace consumption

App content must be suitable for general workplace consumption and abide by all restrictions listed in the [commercial marketplace certification policies](https://docs.microsoft.com/legal/marketplace/certification-policies#10010-inappropriate-content). Content related to religion, politics, gambling, and prolonged entertainment is prohibited.

Your app must facilitate group collaboration, improve an individual's productivity, or both. Apps intended for team bonding and socializing must be collaborative and designed for multiple participants. These types of apps also should not require a substantial time investment or perceptively impact productivity.

### 1.3 Similar platforms and services

Apps must focus on the Teams experience and not include the names, icons, or imagery of other similar chat-based collaboration platforms or services unless the apps provide specific interoperability.

## 2.0 Security

### 2.1 Publisher Attestation

The Microsoft 365 App Compliance Program is intended to help organizations assess and manage risk by evaluating security and compliance information about your app.

Teams app developers must complete the Publisher Attestation portion of the program. For more information, see the [Microsoft 365 App Compliance Program documentation](https://docs.microsoft.com/microsoft-365-app-certification/docs/attestation).

### 2.2 Financial information

Your app must not ask users to make payments within the Teams interface. Financial instrument details must not be transmitted through the user to the bot interface. Links to secure payment services may only be transmitted to users if disclosure has been made in the app’s terms of use, privacy policy, or any profile page or website before the user agrees to use the bot.

### 2.3 Bot Framework

For apps that use Azure Bot Services (bots and messaging extensions), you must follow all requirements as defined in the Microsoft [Online Services Terms](https://www.microsoftvolumelicensing.com/DocumentSearch.aspx?Mode=3&DocumentTypeId=46).

Bots must always ask permission to upload a file and display a confirmation message after the file is uploaded.

### 2.4 External domains

In most cases, you must not include domains outside of your organization's control (including wildcards) and tunneling services in the valid domains section of your app manifest. The following exceptions include:

* If your app uses the Azure Bot Service's OAuthCard, you must include `token.botframework.com` as a valid domain or the **Sign in** button will not work.
* If your app relies on SharePoint, you can include the associated root SharePoint site as a valid domain using the `{teamSiteDomain}` variable.

### 2.5 App permissions

Apps that request permissions during the Azure Active Directory (Azure AD) consent process must provide business justification for these requests.

### 2.6 Authentication

#### 2.6.1 Signing out

The ability to sign out from any authenticated external services must be present within the app. For more information, see [authentication in Teams](~/concepts/authentication/authentication.md).

When a user logs out, they must log out only from the app and not from the Teams client.

#### 2.6.2 Unsharing content

Teams apps that require authentication with an external service to share content in channels must clearly state in help documentation (or similar resources) how to disconnect or unshare content if that feature is supported on the external service. This does not mean the ability to unshare content must be present in your Teams app.

#### 2.6.3 Government Community Cloud listings

To make your app available for Government Community Cloud (GCC) users and to avoid duplicate app listings in the store, the authentication process must identify and route GCC users to the specified or expected content URL.

### 2.7 Health information sources

Apps catering to a patient’s health records, diseases, wellness, nutrition, or pandemic-related information must abide with the user's local health laws. In addition, the information provided by such apps must always be from trusted sources such as the World Health Organization (WHO) or a government website.

### 2.8 Sensitive content

Your app must not post sensitive data, such as credit card or financial payment instrument data. The app also must not display health, contact tracing, or other personally identifiable information (PII) to an audience not intended to view that content.

Warn users before your app downloads any files or executables (.exe) into the user's machine or environment.

## 3.0 General functionality and performance

### 3.1 Launching external functionality

Apps must not take the user out of Teams for core user scenarios. Task modules, cards or tabs are recommended to display information to the user within Teams. Link targets in apps must not link to an external browser but must link to `div` elements contained within Teams, for example, inside task modules and tabs.

For scenarios that require external functionality, your app must have explicit user permission to launch functionality outside of Teams.

### 3.2 Compatibility

Apps must be fully functional on the following operating systems and browsers:

* Microsoft Windows 7 and later
* macOS 10.10 and later
* Microsoft Edge 12 and later
* Mozilla Firefox 47.0 and later
* Google Chrome 51.0 and later
* iOS 9.0 and later
* Android 4.4 and later

### 3.3 Response time

Teams apps must respond within a reasonable timeframe, which varies depending on the capability.

* Tabs must respond within three seconds or display a loading message or warning.
* Bots must respond to user commands within two seconds or display a typing indicator.
* Messaging extensions must respond to user commands within five seconds.
* Notification must load within five seconds of the user action.

## 4.0 App package and store listing

App packages must be correctly formatted and include all required information and components.

### 4.1 App manifest

* The app manifest must conform to the [latest manifest schema](~/resources/schema/manifest-schema.md).
* If your app includes a bot or messaging extension, the manifest must be consistent with Bot Framework metadata, including bot name, logo, privacy policy link, and terms of service link.
* If your app uses Azure Active Directory (Azure AD) for authentication, include the Azure AD ID in the manifest. For more information, see [manifest schema](~/resources/schema/manifest-schema.md#webapplicationinfo).

### 4.2 App icons

* Your app package must include two PNG versions of your app icon: a color icon and an outline icon.
* Correctly sized and formatted icons must be specified in your app package. The icons must match what's submitted with the store listing metadata. For more information, see the Teams app [icon guidelines](~/concepts/build-and-test/apps-package.md#app-icons).

### 4.3 App description

The app descriptions in your manifest and store must be the same and follow these guidelines:

* Use "Microsoft Teams" on first reference. Subsequent references can be shortened to ”Teams”.
* Do not abbreviate "Microsoft" (such as "MS" or "MSFT").
* Avoid unnecessary capitalization and language errors.
* Follow the [short description guidelines](~/concepts/deploy-and-publish/appsource/prepare/detail-page-checklist.md#short-description).
* Follow the [long description guidelines](~/concepts/deploy-and-publish/appsource/prepare/detail-page-checklist.md#long-description).
* Clearly describe any limitations, conditions, or exceptions to the functionality, features, and deliverables described in the listing and related materials before the customer acquires your offer. The capabilities you declare must relate to the core functions and description of your offer.

### 4.4 Privacy policy

The policy can be specific to your Teams app or an overall policy for all of your services.

* If you use a generic privacy policy template, you must reference "services", "applications", and "platforms" to include your Teams app and your website or service.
* Must include how you handle user data storage, retention, and deletion. You also must describe the security controls you use for data protection.
* Must include your contact information.
* Should not contain broken, beta, or staging URLs.

### 4.5 Terms of use

Your terms of use should be specific and applicable to your offering.

### 4.6 Support links

Your app's support URLs should not require authentication. For example. users should not have to log in to contact you.

### 4.7 Localization

Your app package must include a localization file that includes language translations that display based on the Teams language settings. The file must conform to the [Teams localization schema](~/concepts/build-and-test/apps-localization.md).

## 5.0 Tabs

If your app includes a tab, following these guidelines can increase the likelihood your app will pass submission.

> [!TIP]
> If you want information on creating a high-quality experience, see the [tab design guidelines](~/tabs/design/tabs.md).

### 5.1 Setup

* Tab setup must not dead-end the new user. A way forward message should be provided to complete the workflow.
* Authentication should happen during tab setup and not after.
* Tabs must have a help tab with instructions on how to use and configure your app.

### 5.2 Views

* The sign-in screen area use must not use large logos or display an entire webpage.
* The canvas can be simplified by breaking them into multiple tabs to reduce the complexity.
* Personal app tabs should not have a duplicate header. Remove the logo from the iframe since the personal app framework already displays the app icon and app name.

### 5.3 Navigation

* Tabs must not have more than three levels of navigation.
* The secondary and tertiary pages in a tab must be opened in a level two and level three view in the main tab area that is navigated via breadcrumbs or left nav. You can also include these components to aid tab navigation:
    * Back buttons
    * Page headers
    * Hamburger menus
* Tab should not have horizontal scroll.
* Deep links in tabs must not link to an external webpage but instead link somewhere within Teams (for example, task modules or other tabs).

### 5.4 Usability

* Users must be able to undo their last action in the tab.
* Personal app tabs may aggregate content from team or group chat scoped instances of that app in a single view.
* Tabs must be responsive to Teams themes. When the Teams theme is changed, the theme within the app must also change to reflect that theme.
* Personal app tabs must use Teams-styled components (adopting Teams fonts, type ramps, color palettes, grid system, motion, tone of voice, etc.) whenever possible.
* Include a Settings tab.
* Tabs must use Teams interaction behaviors (in-page navigation, position and use of dialogs, information hierarchies, etc.) whenever possible.

## 6.0 Bots

If your app includes a bot, following these guidelines can increase the likelihood your app will pass submission.

> [!TIP]
> If you want information on creating a high-quality experience, see the [bot design guidelines](~/bots/design/bots.md).

### 6.1 Bot commands

* All commands that your bot supports must work correctly, including the "Hi", "Hello", and "Help" command.
* Supported bot commands must be listed in the app manifest.
* Use command lists. Analyzing user input or predicting user intent is hard. Instead of letting users guess what your bot can do, provide a list of commands your bot understands.

### 6.2 Bot welcome messages

* Bots should almost always send first-run welcome messages. For the best experience, the message should include the value proposition of your bot, how to configure the bot, and briefly describe all supported bot commands. You can display the messaging using an Adaptive Card with buttons for better usability. For more information, see [how to trigger a bot welcome message](~/bots/how-to/conversations/send-proactive-messages.md).
* Channel bot welcome messages are optional during first run, especially if bot is available in personal scope performing similar actions. This bot must not send a personal message to all members of the team or channel as that will be considered as spamming. The welcome message should also mention the person who installed/added the bot to the channel.
* Notification-only bots must send a welcome message that includes a message conveying, "I am a notification-only bot and will not be able to reply to your chats".

### 6.3 Bot message spamming

Bots must not spam users by sending multiple messages in short succession.

* **Bot channel messages**: Don't spam users by creating separate new chat posts. Create a single thread post with replies in the same thread.
* **Bot personal messages**: Don't send multiple messages. Send one message with complete information. Repeating the same welcome message over regular intervals is not allowed and is considered spamming.

### 6.4 Bot notifications

Bot notifications must include content relevant for the scope you define for the bot (`team`, `groupchat`, or `personal`).

### 6.5 Bots and Adaptive Cards

Adaptive Cards are a common way to display bot messages. Your cards must be lightweight and include only 1-3 actions. If you need to display more content, consider using a task module or tab.

See the following resources for more information:

* [Designing Adaptive Cards](~/task-modules-and-cards/cards/design-effective-cards.md)
* [Cards reference](~/task-modules-and-cards/cards/cards-reference.md#types-of-cards)

## 7.0 Messaging extensions

If your app includes a messaging extension, following these guidelines can increase the likelihood your app will pass submission.

> [!TIP]
> If you want information on creating a high-quality experience, see the [messaging extension design guidelines](~/messaging-extensions/design/messaging-extension-design.md).

### 7.1 Action commands

Action-based messaging extensions should do the following:

* Allow users to trigger actions on a message without specifying intermediate steps, such as signing in.
* Pass the message context to the next work state.

### 7.2 Preview links (link unfurling)

Messaging extensions should preview recognized links in the Teams compose box. Do not add domains that are outside your control (either absolute URLs or wildcards). For example, `yourapp.onmicrosoft.com` is valid but `*.onmicrosoft.com` is not valid. Top-level domains also are prohibited (for example, `*.com` or `*.org`).

See how to [implement link unfurling](~/messaging-extensions/how-to/link-unfurling.md).

### 7.3 Search commands

Search-based messaging extensions must provide text that helps users effectively search.

## 8.0 Task modules

A task module must include an icon and short name of the app in which it is associated.

> [!TIP]
> If you want information on creating a high-quality experience, see the [task module design guidelines](~/task-modules-and-cards/task-modules/design-teams-task-modules.md).

## 9.0 Meeting extensions

If your app includes a meeting extension, following these guidelines can increase the likelihood your app will pass submission.

> [!TIP]
> If you want information on creating a high-quality experience, see the [meeting extension design guidelines](~/apps-in-teams-meetings/design/designing-apps-in-meetings.md).

### 9.1 Pre- and post-meeting experience

* Tabs must adhere to general [tab design guidelines](~/tabs/design/tabs.md).
* Tabs must not have horizontal scrolling.
* Tabs should have an organized layout when displaying multiple items (for instance, more than 10 polls or surveys). [See an example layout](~/apps-in-teams-meetings/design/designing-apps-in-meetings.md#after-a-meeting).
* Your app must notify users when the results of a survey or poll are exported by stating, "Results successfully downloaded".

### 9.2 In-meeting experience

* Apps must [only use a dark theme](~/apps-in-teams-meetings/design/designing-apps-in-meetings.md#theming) during meetings.
* A tooltip should display the app name when hovering over the app icon during meetings.
* Messaging extensions must function the same during meetings as they do outside meetings.

### 9.3 In-meeting tabs

* Must be responsive and adapt within the provided space. Make sure to maintain padding and component sizes.
* Must have a back button if there is more than one layer of navigation.
* Must not include more than one dismiss or close button. This may confuse users since there's already a built-in header button in the header to dismiss the tab.
* Must not have horizontal scrolling.

### 9.4 In-meeting dialogs

* Should be used sparingly and for scenarios that are light and task-oriented.
* Must display content in a single column and not have multiple navigation levels.
* Must not use task modules.
* Must align with the center of the meeting stage.
* Should be dismissed once a user selects a button or performs an action.

## 10.0 Notifications

If your app uses the [activity feed APIs provided by Microsoft Graph](https://docs.microsoft.com/graph/teams-send-activityfeednotifications), following these guidelines can increase the likelihood your app will pass submission.

### 10.1 General

* All the notification triggers specified in your app manifest should get a notification in the app.
* The notifications must be localized as per the supported languages declared in the app manifest.
* A notification must load within five seconds of a user action.

### 10.2 Avatars

* The notification avatar should match your app's color icon.
* Notifications triggered by an app user should contain the avatar of the user who initiated it.

### 10.3 Spamming

* Apps must not send more than 10 notifications per minute to a user.
* Bots and the activity feed should not trigger duplicate notifications.
* Notifications must provide some value to users and not be used for trivial or irrelevant events.

### 10.4 Navigation and layout

* Notifications must adhere to the Teams activity feed layout and experience.
* When selecting a notification, the user must be directed to relevant content within Teams and not taken out of the Teams experience.

## 11.0 Advertising

Apps must not display advertising, including dynamic ads, banner ads, and ads in messages.

## Failed submissions

If your app doesn't pass review, the Microsoft validation team contacts you with a report on why your submission failed. The team can provide white-glove service to help your app meet passing criteria.

## Next step

> [!div class="nextstepaction"]
> [Prepare your store submission](~/concepts/deploy-and-publish/appsource/prepare/submission-checklist.md)
