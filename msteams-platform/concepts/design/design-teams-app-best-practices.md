---
title: Best practices
author: KirtiPereira
description: Learn about the best practices to use the Microsoft Teams capabilities to develop an app. 
ms.author: surbhigupta
ms.topic: reference
localization_priority: Normal
---

# Best practices

Develop an app that provides enhanced user-experience by applying best practices when designing it.

## Engage customers within Teams

Following are some of the best practices on how to keep your users engaged within Teams:

### Engage your customers

Complete all scenarios end-to-end inside the Teams experience.

:::image type="content" source="../../assets/images/design-guidelines/best-practice-engage-customers-do.png" alt-text="Example of how to keep the user engaged-do." border="false":::

#### Do: Take the users to a task modules or tab if they select an action button instead of taking them to an external web page

:::image type="content" source="../../assets/images/design-guidelines/best-practice-engage-customers-do.png" alt-text="Example of how to keep the user engaged-don't." border="false":::

#### Don't: Take the users away from the conversation

### Notify the user of any updates

Always inform users of any important update through a bot message.

:::image type="content" source="../../assets/images/design-guidelines/best-practice-engage-customers-notify.png" alt-text="Example of notifying the user." border="false":::

### Help users on the Tab configuration page

Provide clear and concise steps when the user is on the Tab Configuration page and avoid dead ends.

:::image type="content" source="../../assets/images/design-guidelines/best-practice-engage-customers-tabs-do.png" alt-text="Example of configuring tabs-do." border="false":::

#### Do: Inform the users of the possible steps they can take to complete a task

:::image type="content" source="../../assets/images/design-guidelines/best-practice-engage-customers-tabs-dont.png" alt-text="Example of configuring tabs-don't." border="false":::

#### Don't: Show dead ends to the users

### Usage of Adaptive Card

Use Adaptive Card for Help command instead of just plain text conversations.

:::image type="content" source="../../assets/images/design-guidelines/best-practice-engage-customers-help-do.png" alt-text="Example of using Adaptive Card-do." border="false":::

#### Do: Use Adaptive Card for Help command

:::image type="content" source="../../assets/images/design-guidelines/best-practice-engage-customers-help-dont.png" alt-text="Example of using Adaptive Card-don't." border="false":::

#### Don't: Use textual commands for Help command

### Type less, select more

Don't make users type textual command formats, when the same can be achieved by selecting buttons.

:::image type="content" source="../../assets/images/design-guidelines/best-practice-engage-customers-typing-do.png" alt-text="Example of typing-do." border="false":::

#### Do: Use Fluent UI component for user input

:::image type="content" source="../../assets/images/design-guidelines/best-practice-engage-customers-typing-dont.png" alt-text="Example of typing-don't." border="false":::

#### Don't: Use complex textual command formats

### User's feedback

Always request for user feedback to improve the next iteration of the app.

### Track the bots performance

Ensure that the bot responds within two seconds. If there is a delay, then a typing indicator must always be shown.

### Track the tabs performance

Ensure that any tab is loaded within 5 seconds. If there is a delay, then a skeleton of the page or a loading indicator must be displayed.

### Design guidelines

Follow the Teams [design guidelines](design-teams-app-overview.md) for fonts, tone of voice, color, and so on.

### Queries in message extensions

Search-based message extensions must not show an empty area.

### Bot must provide tab information

Provide pinned tab information through a bot.

## First run experience in collaborative space

Recommendations for when running your app in a collaborative space:

### Tab configuration page

Keep the attention of the user by providing a snapshot of the overall tab experience of the app without being too verbose.

### Pre-fill input fields

Save time for users by pre-filling some input fields and providing hints for fields that require their inputs.

### Default name of the tab

Provide a default name to the tab that self-explains the functionality of your app.

### Welcome message

If your app has a bot,use it to post a welcome message in the channel or group that delivers features of the app that aids collaboration.

### Scope of a bot

A bot designed to be used in a personal space may not support commands in a collaborative space. Therefore, you must inform the users that they might want to check the personal app to use the relevant commands.

### Sign out button

Provide the sign out button to the users to exit the app.

> [!NOTE]
> This is a critical requirement for app developers and needs attention while designing the tab view.

### Settings option in tab header

Always provide the **Settings** option in the tab header to help users reconfigure a tab page with ease.

### Help access

Provide CTA to the users to access help by providing a deep-link to the personal help tab or open a hyperlink in a browser.

> [!NOTE]
> It is a better option to keep the users inside Teams by providing a deep-link.

### In-app navigation

Provide the navigation path in form of *breadcrumb* or *hamburger menu*, if your app displays multi-levels of view inside a tab.

## First run experience in personal scope

Recommendation for when using apps in personal scope:

### Always have a personal app

Build an app with bot in personal scope as the fundamental block for any of your app capability.

### Show a welcome card

When a user installs your app, present a welcome card with information, such as title, image, description, and action buttons.

### Display a tour card

Show a tour card on your welcome card to allow the users to know more about your app through a carousel of images or a video of your app on Teams.

> [!NOTE]
> Use an Adaptive Card or task module to show images and videos.
>
> A maximum of three tour cards can be shown.

### Make things easy for the users

* Display the sign in and sign up buttons if the user is accessing your app for the first time.
* Wherever possible, use AAD SSO for signing in and signing up customers. It saves a lot of time for the customers and is a great convenience.
* Always have support for ‘help’ command. In reply to ‘help’ command, you can display a listing card that has list of all the commands and short description of each command.
* Nudge users to use top features.
* Handling incomprehensible commands.
* Trial period for paid apps.
* Help and About tabs








