---
title: Add a tab to your first Teams app
author: heath-hamilton
description: Learn how to build a tab in your first Microsoft Teams app.
ms.topic: tutorial
---
# Create a tab for your first Teams app

Tabs are a simple way to surface content in your app by essentially embedding a webpage in Teams.

You can build two types of tabs:

* **Personal tab**: Displays the same content in the same place for each user.
* **Channel tab**: Displays content based on how a user configured the tab for a channel or group chat.

:::image type="content" source="../assets/images/overview-tabs.png" alt-text="Alt text describes the content of the image.":::

## Before you begin

You need a running "Hello, World!" Teams app to get started. If you don't have one, see [build and run your first app](../build-your-first-app/build-and-run.md).

#### [Personal tab](#tab/personal-app)

## Build a personal tab

In this tutorial, you'll build a personal tab that provides a list of important contacts for an organization.

### What you'll learn

* App manifest properties and scaffolding relevant to personal tabs
* How to make your app aware when a user changes the theme in Teams
* Authenticating users with SSO

### Understanding the app scaffolding and manifest

Some text

### Create your tab content

Copy the following HTML.

```html
    SOME TEXT
```

Open your `Tab.js` file and paste the HTML where you see `<NEW_HTML_CONTENT>'.

```Javascript
    Some text
```

### Update the tab theme

Good apps feel native to Teams, so it's important your tab matches the Teams theme your users select: default (light), dark, or high contrast.

1. In `Tab.js`, go to the ... FIND CALL IN SDK

### Provide SSO authentication

Some text. 

Print person's name in a screenshot

### See the finished product

view your app in Teams.

## Learn more

* [Embed content from an existing web app or webpage](https://docs.microsoft.com/en-us/microsoftteams/platform/tabs/how-to/add-tab#tab-requirements): We showed you how to create new content for a personal tab, but you can also load content from an external URL.
* [Create a seamless experience for your tab](): See the recommended guidelines for designing Teams tabs.

#### [Channel tab](#tab/channel-tab)

## Build a channel tab

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.

### Update the app manifest

If you already picked personal tab in the toolkit, this part is filled out for you. If not, simply add in the below to indicate that you have a personal app in your app. We will go over what each of these field means

### Understanding the app scaffolding

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.

### See the finished product

Upload and view your app in Teams.

---

## Build another feature

> [!div class="nextstepaction"]
> [Create a connector for your app](../build-your-first-app/add-connector.md)
