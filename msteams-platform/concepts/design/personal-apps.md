---
title: Design Guidelines Reference
description: Describes the guidelines for designing a personal app
keywords: teams design guidelines reference framework personal apps
--- 
# Personal apps

> [!Important]
> Full support for tabs on mobile clients is coming soon. To prepare for this change you should follow the [guidance for tabs on mobile](~/tabs/design/tabs-mobile.md) when creating your tabs. Personal apps (static tabs) are currently available in [developer preview](~/resources/dev-preview/developer-preview-intro.md).
>
> When full support for tabs is released:
>
> * All tabs will always be available on mobile
> * Your `contentUrl` **will be loaded in the mobile Teams client**.
> * For channel/group tabs, users can still open your tab in a separate browser via your `websiteUrl`, however your `contentUrl` will be loaded first.

A personal app is an app with a personal scope. As an app developer, you have the option to provide a version of your app that is built for the individual user. In this version, the collection of tabs (and the bot, if you've included one), are designed for the person. This way, you're able to create a one-on-one interaction with your users.

A personal app is where someone can see everything that's theirs, and all the items they've recently viewed in the app. It puts everything in one place. In the following screenshot, Contoso is a personal app in the personal app flyout.

![image of the app overflow menu](~/assets/images/Personal-apps-App-flyout.png)

---

## Guidelines

A personal app typically contains the following tabs:

### Your tab

This is where your users will see all their stuff. It's their personal space. The tab can be arranged as a list, a grid, columns, or a single canvas...whatever works best for your application. For additional information on designing effective tabs see: [Tabs design(~/tabs/design/tabs.md).

Since this tab can show items from multiple channels, each item should display its own team, channel, and tab so the user can easily see where it originated.

![Personal Tasks tab](~/assets/images/Personal-apps-MY-tab.png)

### Recent

The **Recent** tab lets someone browse everything they've recently viewed in your app. It's listed in chronological order (from most to least recent). Clicking on an item in this list will navigate the user to that item's channel and tab.

![Recent tab](~/assets/images/Personal-apps-Recent-tab.png)

### All

This is a list of all your tabs in the person's organization (the ones they have access to, anyway). In other words, it shows them everywhere the app is being used. As with the **Recent** tab, selecting something in the list will bring the user straight to the relevant channel and tab.

### Bot

A bot isn't required, but it's a great way to communicate directly and privately with your users. Notification is one of the most important functions of a personal app, and what better way to notify than with direct communication?

Bots deliver messages in the form of cards, which can provide specific information (like an alert that new content is available) or broad updates (like a daily to-do list). For additional information on designing effective bots see: [Bot design(~/bots/design/bots.md).

![Bot greeting](~/assets/images/Personal-apps-Bot.png)

### Help and Settings

Help content enables users to discover the nuances of your app. Add a **Settings** tab to give them the ability to further customize it.

### About

Include an **About** tab to provide information like version number, capabilities, privacy, and permissions links.

## Best practices

### Communicate directly with your users

Use a bot to notify users of changes and new features.

### Customize your tabs...

Feel free to add other tabs that will help your users accomplish specific tasks.

### ...and make them relevant to every user

Every tab you declare in your app manifest will be visible to all users. For example, if your personal app is an expense reporting tool that is used by both managers and employees, an **Approval** tab should provide content that is meaningful to both roles.
