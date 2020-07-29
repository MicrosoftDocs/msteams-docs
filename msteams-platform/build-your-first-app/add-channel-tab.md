---
title: Create a channel tab for Teams
author: heath-hamilton
description: Learn how to build a channel tab in your first Microsoft Teams app.
ms.topic: tutorial
---
# Create a channel tab for Teams

Tabs are a simple way to surface content in your app by essentially embedding a webpage in Teams.

You can build two types of tabs. In this tutorial, you'll build a basic *channel tab*, which displays content based on how it's configured for a channel or group chat.

:::image type="content" source="../assets/images/overview-tabs.png" alt-text="Conceptual image of a tab in Teams.":::

## Before you begin

* You need a running "Hello, World!" Teams app to get started. If you don't have one, see [build and run your first app](../build-your-first-app/build-and-run.md).
* This tutorial expands on [creating a personal tab](../build-your-first-app/add-personal-tab.md). Please complete that lesson before starting this one.

## Your assignment

COMPLETE.

## What you'll learn UPDATE

> [!div class="checklist"]
>
> * App manifest properties and scaffolding relevant to channel tabs
> * Allowing users to set up an additional tab for their channel or group chat

## What you need to know about the app manifest and scaffolding UPDATE

Much of the personal tab app scaffolding and manifest was set up automatically when you created your project with the Teams Toolkit. Let's look at the components you'll work with in this tutorial.

### App manifest UPDATE

The following snippet from the app manifest (the `manifest.json` file in your project `.publish` directory) shows the JSON properties and default values that are relevant to personal tabs. For personal tabs, you only need to specify a `"personal"` value for the `"scopes"` property.

```json
    "staticTabs": [
        {
            "entityId": "index",
            "name": "Personal Tab",
            "contentUrl": "{baseUrl0}/tab",
            "scopes": [ "personal" ]
        }
    ],
```

### App scaffolding UPDATE

The app scaffolding provides the components for rendering your tab in Teams. There's a lot you can play with, but for this exercise we'll only focus on the following:

* `Tab.js` file in the `src/components` directory of your project
* Microsoft Teams JavaScript client SDK, which comes pre-loaded in your project's front-end components

## Create your tab content UPDATE

Write a list of important contacts in your organization. You can use the following snippet as is or update it with information that's relevant to you.

```html

```

Go to the `src/components` directory and open `Tab.js`. Locate the `render()` function and paste your HTML inside `return()` (see below).

```Javascript

```

Save your changes to see the new tab content display in Teams.

## Learn more

* [Embed content from an existing web app or webpage](../tabs/how-to/add-tab#tab-requirements): We showed you how to create new content for a personal tab, but you can also load content from an external URL.
* [Create a seamless experience for your tab](../tabs/design/tabs.md): See the recommended guidelines for designing Teams tabs.
* [Build for tabs on mobile](../tabs/design/tabs-mobile.md): Understand how to develop tabs for smartphones and tablets.

> [!div class="nextstepaction"]
> [Keep going: Create a connector](../build-your-first-app/add-connector.md)
