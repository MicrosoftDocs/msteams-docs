---
title: Store (AppSource) validation guidelines
description: Describes the guidelines every app submitted to the Teams store (AppSource) must follow.
author: heath-hamilton
ms.author: surbhigupta
ms.topic: reference
---
# Microsoft Teams store (AppSource) validation guidelines

Following these guidelines increases the chances your app will pass Microsoft Teams store (and AppSource) submission. These guidelines, which complement the Microsoft [commercial marketplace certification policies](https://docs.microsoft.com/legal/marketplace/certification-policies), are specific to Teams apps and will be updated frequently to reflect new Teams capabilities, user feedback, and changes to business rules.

If your app doesn't pass review according to these guidelines and the commercial marketplace certification policies, the Microsoft validation team will contact you with a report on why your submission failed. The team works 24 hours a day, five days a week and can provide white-glove service to help your app meet our criteria.

> [!TIP]
> Some of these guidelines may not be applicable to you. For example, if your app doesn't have a bot, you can ignore those guidelines.

## 1.0 Value proposition

### 1.1 App title

An app's name plays a critical role in how users discover it in the AppSource app store. Your app's short name is displayed on the details page. App title must have relevant terms, must not copy an existing app in the store, must not use "Teams" or Microsoft product names to falsely indicate co-branding or co-selling, and meet all the guidelines for app names. When referring to Microsoft trademarks and the names of Microsoft software, products, and services, follow the [Microsoft Trademark and Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general).

### 1.2 Suitable for workplace consumption

Your app may work for team to drive collaboration and/or for individual users to improve their productivity.

Apps catering to team bonding and socializing needs of Microsoft Teams users may be published. Such apps should not require intense time investment or perceptively impact productivity. These apps must be collaborative and designed for multiple participants. All content should be suitable for general workplace consumption.

Apps must abide by all restrictions in [100.10 Inappropriate Content](https://docs.microsoft.com/legal/marketplace/certification-policies#10010-inappropriate-content) of the commercial marketplace certification policies. Content related to religion, politics, gambling, and prolonged entertainment is prohibited.

### 1.3 Other platforms and services

Teams apps must focus on the Teams experience and must not include names, icons, or imagery of other similar chat-based collaborative platforms or services unless the apps provide specific interoperability.

## 2.0 Security

### 2.1 Publisher attestation

Microsoft 365 App compliance program that is intended to help organizations assess and manage risk in using apps by collecting security, data handling, and compliance information. App gets Badge in AppSource & provides added confidence in the security and compliance measures of your application.

Teams apps must complete Publisher Attestation in Partner Center. See the Microsoft 365 App Compliance Program documentation to learn how to complete the Publisher Attestation workflow.

### 2.2 Financial information

Your Teams app must not ask users to make a payment directly within Teams interface. No financial instrument details must not be transmitted through the user to bot interface. Links to secure payment services may only be transmitted to users if disclosure has been made in the app’s Terms of Use, Privacy Policy, and any profile page or website before the user agrees to use the bot.

### 2.3 Bot Framework

For apps with bots or messaging extensions, you must follow all requirements (including privacy notice requirements) as defined in the Microsoft Bot Framework Developer Code of Conduct and Online Services Agreement.

Bots should always ask permission to upload a file and show a confirmation message after the file is uploaded.

### 2.4 External domains

Tunneling services and domains outside of an organization’s control, including wildcards, must not be included in the valid domains of the app manifest.

### 2.5 App permissions

Apps that request permissions during the Azure Active Directory (Azure AD) consent process must provide business justification for these requests.

### 2.6 Health information sources

Apps catering to a patient’s health records, diseases, wellness, nutrition, or pandemic-related information must abide with the user's local health laws. In addition, the information provided by such apps must always be from trusted sources such as the World Health Organization (WHO) or a government website.

### 2.7 Sensitive content

Your app must not post sensitive data such as credit card/financial payment instrument, personally identifiable information (PII), health, or contact tracing information to an audience not intended to view that data.

Warn users before your app downloads any files or executables (.exe ) into the user's machine or environment.

## 3.0 General functionality and performance

### 3.1 Launching external functionality

Apps must not take the user out of Teams for core user scenarios. Task modules, cards or tabs are recommended to display information to the user within Teams. Link targets in apps should not link to an external browser but should link to div elements contained within Teams (for example, inside task modules and tabs).

Apps must have explicit user permission before launching functionality outside of the Teams environment.

### 3.2 Compatibility

Apps must be fully functional on the following operating systems and browsers:

* Microsoft Windows 7 and later
* macOS 10.10 and later
* Microsoft Edge 12 and later
* Internet Explorer 11 & later
* Mozilla Firefox 47.0 and later
* Google Chrome 51.0 and later

### 3.3 Response time

Teams apps must respond within a reasonable timeframe, which varies depending on the capability.

* Tabs must respond within 3 seconds or display a loading message or warning.
* Bots must respond to user commands within 2 seconds or display a typing indicator.
* Messaging extensions must respond to user commands within 5 seconds.
* Notification must load within 5 seconds of the user action.

### 3.4 Platform interoperability

* Apps must be fully responsive to a variety of screen sizes.
* App must not include any direct references to in-app purchases, trial offers, offers for paid versions, or links to any online stores where users can purchase or acquire other content, apps, or add-ins from your Teams app on mobile OS (Android, iOS).
* The iOS or Android version of the app must not show any UI or language or link to any other apps, add-ins, or websites that ask the user to pay.
* The associated Privacy Policy and Terms of Use pages must also be free of any commerce UI or Store links.
* If your app contains tabs, they must follow the mobile design guidelines.
* App should function on the following platforms:
    * iOS 9.0 and later
    * Android 4.4 and later
    * Windows Phone 10.0.10586 and later

### 3.5 Authentication

#### 3.5.1 Signing out

* The ability to sign out from any authenticated external services must be present within the app. For more information, see [authentication in Teams](~/concepts/authentication/authentication.md).
* When a user logs out, they should log out only from the app and not the Teams client.

#### 3.5.2 Unsharing content

Teams apps that depend on authentication with an external service to allow content sharing in channels must clearly state in their help documentation or similar resources how a user can disconnect or unshare any content if the same feature is supported on the external service. The ability to unshare content does not have to be present in your app, but the process should be clearly documented in a location that's accessible from the app.

## 4.0 Design

Your app can fail validation for not following [Teams app design guidelines](~/concepts/design/design-teams-app-overview.md) or issues that impede the Teams experience.

### 4.1 App package

App packages must be correctly formatted and include all required information and components.

#### 4.1.1 App manifest

* The app manifest must conform to the [latest manifest schema](~/resources/schema/manifest-schema.md).
* If your app includes a bot or messaging extension, the manifest must be consistent with Bot Framework metadata, including bot name, logo, privacy policy link, and terms of service link.
* If your app uses Azure Active Directory (AD) for authentication, include the Azure AD ID in the manifest ([see how](~/resources/schema/manifest-schema.md#webapplicationinfo)).

#### 4.1.2 App icons

* Your app package must include two PNG versions of your app icon: a color icon and an outline icon.
* A correctly sized and formatted icons must be specified in the app package or manifest. The icons in the package or manifest must match the icon submitted with the offer metadata.
* For detailed information, refer to the [icons documentation](~/concepts/build-and-test/apps-package.md#app-icons).

#### 4.1.3 App description

The app descriptions in your manifest and store should be same and follow these guidelines:

* Use "Microsoft Teams" on first reference. Subsequent references can be shortened to ”Teams”.
* Do not abbreviate "Microsoft" (such as "MS" or "MSFT").
* Avoid unnecessary capitalization and language errors.
* Follow the [short description guidelines](~/concepts/deploy-and-publish/appsource/prepare/detail-page-checklist.md#short-description).
* Follow the [long description guidelines](~/concepts/deploy-and-publish/appsource/prepare/detail-page-checklist.md#long-description).
* Clearly describe any limitations, conditions, or exceptions to the functionality, features, and deliverables described in the listing and related materials before the customer acquires your offer. The capabilities you declare must relate to the core functions and description of your offer.

#### 4.1.4 Localization

Your package must include a localization file that includes language translations that display based on the Teams language settings. The file must conform to the [Teams localization schema](~/concepts/build-and-test/apps-localization.md).

### 4.2 Tabs

See comprehensive [tab design guidelines](~/tabs/design/tabs.md).

#### 4.2.1 Setup

Tab set up must not dead-end the new user. A way forward message should be provided to complete the workflow.

Authentication should happen during tab setup and not after.

Tabs must have a Help tab with instructions on how to do things such as sign up, configure, and use your app.

#### 4.2.2 Views

* The available tab sign-in screen area use must not use large logos or display an entire webpage.
* The tab view can be simplified by breaking them into multiple tabs to reduce the complexity.
* The personal app should not have a duplicate header. Remove the logo from the iframe since the personal app framework already displays the app icon and app name.

#### 4.2.3 Navigation

* Tabs must not have more than three levels of navigation.
* The secondary and tertiary pages in a tab must be opened in a level two and level three view in the main tab area that is navigated via breadcrumbs or a left nav. You can also include these components to aid tab navigation:
    * Back buttons
    * Page headers
    * Hamburger menus
* Tab should not have horizontal scroll.
* Deep links in tabs must not link to an external webpage but instead link somewhere within Teams (for example, task modules or other tabs).

#### 4.2.4 Usability

* Users must be able to undo their last action in the app.
* Personal apps may aggregate content from team or group chat scoped instances of that app in a single view.
* Tabs must be responsive to Teams themes. When the Teams theme is changed, the theme within the app must also change to reflect that theme.
* Personal apps must use Teams-styled components (adopting Teams fonts, type ramps, color palettes, grid system, motion, tone of voice, etc.) whenever possible.
* Please include a Settings tab in the app header.
* Tabs can use Teams interaction behaviors (in-page navigation, position and use of dialogs, information hierarchies, etc.) whenever possible.

### 4.3 Bots

See comprehensive [bot design guidelines](~/bots/design/bots.md).

#### 4.3.1 Bot commands

* All commands that your bot supports must work correctly, including the Hi, Hello, Help command. 
* Supported bot commands must be listed in the app manifest.
* Use command lists. Analyzing user input or predicting user intent is hard. Instead of letting users guess what your bot can do, provide a list of commands your bot understands.

#### 4.3.2 Bot welcome messages

Bots should almost always send first-run welcome messages. For the best experience, the message should include the value proposition of your bot, how to configure the bot, and briefly describe all supported bot commands. You can display the messaging using an Adaptive Card with buttons for better readability. [How to trigger a bot welcome message](~/bots/how-to/conversations/send-proactive-messages.md).

Channel bot welcome messages are optional during first run, especially if bot is available in personal scope performing similar actions. This bot must not send a personal message to all members of the team or channel as that will be considered as spamming. The welcome message should also mention the person who installed/added the bot to the channel.

Notification-only bots must send a welcome message that includes a message conveying, "I am a notification-only bot and will not be able to reply to your chats".

#### 4.3.3 Bot message spamming

Bots must not spam users by sending multiple messages in short succession.

* **Bot channel messages**: Don't spam users by creating separate new chat posts. Create a single thread post with replies in the same thread.
* **Bot personal messages**: Don't send multiple messages. Send one message with complete information. Repeating the same welcome message over regular intervals is not allowed and is considered spamming.

#### 4.3.4 Bot notifications

Bot notifications must include content relevant for the scope you define for the bot (`team`, `groupchat`, or `personal`).

#### 4.3.4 Bots and Adaptive Cards

Adaptive Cards are a common way to display bot messages. Your cards must be lightweight and include only 1-3 actions. If you need to display more content, consider using a task module or tab.

See the following resources for more information:

* [Designing Adaptive Cards](~/task-modules-and-cards/cards/design-effective-cards.md)
* [Cards reference](~/task-modules-and-cards/cards/cards-reference.md#types-of-cards)

### 4.4 Messaging extensions

See comprehensive [messaging extension design guidelines](~/messaging-extensions/design/messaging-extension-design.md).

#### 4.4.1 Action commands

Action-based messaging extensions should do the following:

* Allow users to trigger actions on a message without specifying intermediate steps, such as signing in.
* Pass the message context to the next work state.

#### 4.4.2 Preview links (link unfurling)

Messaging extensions should preview recognized links in the Teams compose box. Do not add domains that are outside your control (either absolute URLs or wildcards). For example, `yourapp.onmicrosoft.com` is valid but `*.onmicrosoft.com` is not valid. Top-level domains also are prohibited (for example, `*.com` or `*.org`).

See how to [implement link unfurling](~/messaging-extensions/how-to/link-unfurling.md).

#### 4.4.3 Search commands

Search-based messaging extensions must provide text that helps users effectively search.

For more information, see the [design best practices for search commands](~/messaging-extensions/design/messaging-extension-design.md#searches).

### 4.5 Task modules

A task module must include an icon and short name of the app in which it is associated.

See comprehensive [task module design guidelines](~/task-modules-and-cards/task-modules/design-teams-task-modules.md).

### 4.6 Meeting extensions

See comprehensive [meeting extension design guidelines](~/apps-in-teams-meetings/design/designing-apps-in-meetings.md).

#### 4.6.1 Pre- and post-meeting experience

* Tabs must adhere to general [tab design guidelines](~/tabs/design/tabs.md).
* Tabs must not have horizontal scrolling.
* Tabs should have an organized layout when displaying multiple items (for instance, more than 10 polls or surveys). [See an example layout](../../apps-in-teams-meetings/design/designing-apps-in-meetings.md#after-a-meeting).
* Your app must notify users when the results of a survey or poll are exported by stating, "Results successfully downloaded".

#### 4.6.3 In-meeting experience

* Apps must [only use a dark theme](~/apps-in-teams-meetings/design/designing-apps-in-meetings.md#theming) during meetings.
* A tooltip should display the app name when hovering over the app icon during meetings.
* Messaging extensions must function the same during meetings as they do outside meetings.

#### 4.6.4 In-meeting tabs

* Must be responsive and adapt within the provided space. Make sure to maintain padding and component sizes.
* Must have a back button if there is more than one layer of navigation.
* Must not include more than one dismiss or close button. This may confuse users since there's already a built-in header button in the header to dismiss the tab.
* Must not have horizontal scrolling.

#### 4.6.5 In-meeting dialogs

* Should be used sparingly and for scenarios that are light and task-oriented.
* Must display content in a single column and not have multiple navigation levels.
* Must not use task modules.
* Should align with the center of the meeting stage.
* Should be dismissed once a user selects a button or performs an action.

### 4.7 Notifications

Follow these guidelines if your app uses the [activity feed APIs provided by Microsoft Graph](https://docs.microsoft.com/graph/teams-send-activityfeednotifications).

#### 4.7.1 General

* All the notification triggers specified in your app manifest should get a notification in the app.
* The notifications must be localized as per the supported languages declared in the app manifest.
* A notification must load within 5 seconds of a user action.

#### 4.7.2 Avatars

* The notification avatar should match the app icon provided in the manifest.
* Notifications triggered by an app user should contain the avatar of the user who initiated it.

#### 4.7.3 Spamming

* Apps must not send more than 10 notifications per minute to an individual user.
* Bots and the activity feed should not trigger duplicate notifications.
* Notifications must provide some value to users and not be used for trivial or irrelevant events.

#### 4.7.4 Navigation and layout

* The right pane experience in the feed must be self-contained and not break the feed experience. 
* On click, user must be directed to the relevant content within the Teams app and should not be taken out of Teams experience.
