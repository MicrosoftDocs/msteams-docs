---
title: Design Guidelines Reference
description: Describes the guidelines for designing a personal app
keywords: teams design guidelines reference framework personal apps
--- 
# Personal apps

When someone installs your app, they have the option of installing it for themselves as well as for a team. The version they install for themselves is called a personal app.

A personal app is where your users can see everything that's theirs, all the items they've recently viewed in the app, and every other channel in Teams where the app is being used. It puts everything in one place. If they need to make changes or updates, they can do it right from their personal app. 

---

## Guidelines

A personal app typically contains the following tabs:

### Your tab

This is where your users will see all their stuff. It's their personal space. The tab can be arranged as a list, a grid, columns, or a single canvas...whatever works best for your application. 

Since this tab can show items from multiple channels, each item should display its own team, channel, and tab so the user can easily see where it originated. 

### Recent

The **Recent** tab lets someone browse everything they've recently viewed in your app. It's all listed in chronological order (from most to least recent). Clicking on an item in this list will navigate the user to that item's channel and tab.

### All

This is a list of all your tabs in the user's organization (the ones they have access to, anyway). In other words, it shows them everywhere the app is being used. As with the **Recent** tab, selecting something in the list will bring the user straight to the relevant channel and tab.

### Bot

A bot isn't required, but it gives you a great way to communicate directly and privately with your users. Notification is one of the most important functions of a personal app, and what better way to notify than with direct communication?

Bots deliver messages in the form of cards, which can provide specific information, like an alert that new content is available, or broad updates, like a daily to-do list.

### Help and Settings

Help content enables users to discover the nuances of your app. Add a **Settings** tab to give them the ability to further customize it.

### About

Include an **About** tab to provide information like version number, capabilities, privacy, and permissions links.

---

## Best practices

### Communicate directly with your users

Use a bot to notify users of changes and new features.

### Customize your tabs

Feel free to add other tabs that will help your users accomplish specific tasks.

### Every tab is visible

Every tab you declare in your app manifest will be visible to all users. For example, if your personal app is an expense reporting tool that is used by both managers and employees, an **Approval** tab should provide content that is meaningful to both roles.
