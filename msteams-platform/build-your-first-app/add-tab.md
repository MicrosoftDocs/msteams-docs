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
* **Channel tab**: Displays content based on how the tab is configured for a channel or group chat.

:::image type="content" source="../assets/images/overview-tabs.png" alt-text="Alt text describes the content of the image.":::

## Before you begin

You need a running "Hello, World!" Teams app to get started. If you don't have one, see [build and run your first app](../build-your-first-app/build-and-run.md).

#### [Personal tab](#tab/personal-app)

## Build a personal tab

In this tutorial, you'll build a personal tab that provides a list of important contacts in an organization.

### What you'll learn

> [!div class="checklist"]
>
> * App manifest properties and scaffolding relevant to personal tabs
> * Changing your tab's color theme based on user preference
> * Authenticating tab users with SSO

### What you need to know about the app manifest and scaffolding

Much of the personal tab app scaffolding and manifest was set up automatically when you created your project with the Teams Toolkit. Let's look at the components you'll work with in this tutorial.

#### App manifest

The following snippet from the app manifest (the `manifest.json` file in your project `.publish` directory) shows the JSON objects and default values that are relevant to personal tabs. For personal tabs, the `"scopes"` key only needs a `"personal"` value.

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

#### App scaffolding

The app scaffolding provides the components for rendering your tab in Teams. There's a lot you can play with, but for this exercise we'll only focus on the following:

* `Tab.js` file in the `src/components` directory of your project
* Microsoft Teams JavaScript client SDK, which comes pre-loaded in your project's front-end components

### Create your tab content

Write a list of important contacts in your organization. You can use the following snippet as is or update it with information that's relevant to you.

```html
  <div>
    <h1>Important Contacts for {userName}</h1>
      <ul>
        <li>Help Desk: <a href="mailto:support@company.com">support@company.com</a></li>
        <li>Human Resources: <a href="mailto:hr@company.com">hr@company.com</a></li>
        <li>Facilities: <a href="mailto:facilities@company.com">facilities@company.com</a></li>
      </ul>
  </div>
```

Go to the `src/components` directory and open `Tab.js`. Locate the `render()` function and paste your HTML inside `return()` (see below).

```Javascript
  render() {

      let userName = Object.keys(this.state.context).length > 0 ? this.state.context['upn'] : "";

      return (
      <div>
        <h1>Important Contacts for {userName}</h1>
          <ul>
            <li>Help Desk: <a href="mailto:support@company.com">support@company.com</a></li>
            <li>Human Resources: <a href="mailto:hr@company.com">hr@company.com</a></li>
            <li>Facilities: <a href="mailto:facilities@company.com">facilities@company.com</a></li>
          </ul>
      </div>
      );
  }
```

Save your changes to see the new tab content display in Teams.

### Update the tab theme

Good apps feel native to Teams, so it's important your tab adapts to the Teams theme your users select: default (light), dark, or high contrast. With the [Teams JavaScript client SDK](/javascript/api/overview/msteams-client), you can make your app aware of theme changes using the `context` interface's `theme` property.

In your `Tab.js` file, locate the following code block.

```Javascript
  componentDidMount(){
    // Get the user context from Teams and set it in the state
    microsoftTeams.getContext((context, error) => {
      this.setState({
        context: context
      });
    });
    // Next steps: Error handling using the error object
  }
```

Write a conditional statement like the following snippet to check the configured Teams theme and adjust your tab's colors accordingly.

```Javascript
  [NEED DEV HELP]
```

Insert the statement within the `.getContext` call (see snippet for exact location).

```Javascript
  [NEED DEV HELP]
```

### Provide SSO authentication

Some text. 

Print person's name in a screenshot

### See the finished product

In the Teams client, select your app to see the personal tab you created.

[INSERT IMAGE]

## Learn more

* [Embed content from an existing web app or webpage](../tabs/how-to/add-tab#tab-requirements): We showed you how to create new content for a personal tab, but you can also load content from an external URL.
* [Create a seamless experience for your tab](): See the recommended guidelines for designing Teams tabs.
* [Build for tabs on mobile](): Learn about other considerations for using tabs on a smartphone or tablet.

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

> [!div class="nextstepaction"]
> [Keep going: Create a connector for your app](../build-your-first-app/add-connector.md)
