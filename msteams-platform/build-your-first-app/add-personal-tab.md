---
title: Create a personal tab for Teams
author: heath-hamilton
description: Learn how to build a personal tab in your first Microsoft Teams app.
ms.topic: tutorial
---
# Create a personal tab for Teams

Tabs are a simple way to surface content in your app by essentially embedding a webpage in Teams.

There are two types of tabs. In this tutorial, you'll build basic a *personal tab*, which displays content for individual users. Personal tabs are the closest thing to a traditional website experience in Teams.

:::image type="content" source="../assets/images/overview-tabs.png" alt-text="Conceptual image of a tab in Teams.":::

## Before you begin

You need a running "Hello, World!" Teams app to get started. If you don't have one, see [build and run your first app](../build-your-first-app/build-and-run.md).

## Your assignment

People in your organization have trouble finding basic contact information for important functions (help desk, HR, etc.). You're in charge of making sure they can quickly find this information in one place. How would you do that? A Teams personal tab, of course.

## What you'll learn

> [!div class="checklist"]
>
> * App manifest properties and scaffolding relevant to personal tabs
> * Changing your tab's color theme based on user preference

## Relevant pieces of app manifest and scaffolding

Much of the personal tab app scaffolding and manifest is set up automatically when you create your project with the Teams Toolkit. Let's look at the key components for building a personal tab.

### App manifest

The following snippet from the app manifest (the `manifest.json` file in your project's `.publish` directory) shows the JSON properties and default values relevant to personal tabs. If your tab is for personal use only, you only need a `"personal"` value for the `"scopes"` property.

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

### App scaffolding

The app scaffolding provides the components for rendering your tab in Teams. There's a lot you can work with, but for now you only need to focus on the following:

* `Tab.js` file in the `src/components` directory of your project
* Microsoft Teams JavaScript client SDK, which comes pre-loaded in your project's front-end components

## Create your tab content

Compile a list of important contacts in your organization. Copy and update the following snippet with information that's relevant to you or, for the sake of time, use the code as is.

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

Save your changes. Go to your app's tab in Teams to view the new content.

:::image type="content" source="../assets/images/tabs/personal-tab-tutorial-content.png" alt-text="Example screenshot of a personal tab with static content.":::

## Update the tab theme

Good apps feel native to Teams, so it's important your tab blends with the Teams theme your users prefer: default (light), dark, or high contrast. With the [Teams JavaScript client SDK](/javascript/api/overview/msteams-client), you can make your app aware of and react to theme changes in the client. Let's walk through how this how this works.

### Get context about the Teams client

In your `Tab.js` file, there's a `microsoftTeams.getContext()` call that provides some [`context`](https://docs.microsoft.com/en-us/javascript/api/@microsoft/teams-js/microsoftteams.context?view=msteams-client-js-latest) about, among other details, the configured client theme. Thanks to the app scaffolding, you can use this code as is to get the context and use its related data in your app.

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

### Create a theme change handler

With the `context` properties in hand, your app has a solid understanding of what's happening around it in Teams. But the app still doesn't know its appearance should reflect whatever `theme` a user configures. For example, if you set your theme to **Dark**, your tab's background doesn't match, and that's not a recommended user experience for Teams.

You need a handler so that your app's state changes with the theme. Insert the following theme change handler immediately after the `microsoftTeams.getContext()` call.

```Javascript
  microsoftTeams.registerOnThemeChangeHandler(theme => {
    if (theme !== this.state.theme) {
      this.setState({ theme });  
    }
  });
```

### Match theme styles

Your theme change handler is in place, but you need some code that responds to those changes. There's a lot you could do here; for now, let's just make sure your tab's colors align with the Teams theme.

> [!NOTE]
> The following example just shows one way you might apply styles to your tab. Use the code as is, expand on it, or write your own.

Store the state provided by the theme change handler in `isTheme`.

```Javascript
  const isTheme = this.state.theme
```

Provide some conditional logic to render your tab's styles based on the current theme. The following example shows a basic way to do this by 1) checking the current theme in `isTheme`, 2) creating a `newTheme` object with CSS properties relevant to the current theme, and 3) applying the CSS to your tab content's root HTML element (`<div>`).

```Javascript
  let newTheme

  if (isTheme == "default") {
    newTheme = {
      backgroundColor: "#EEF1F5",
      color: "#16233A"
    };
  } else {
    newTheme = {
      backgroundColor: "#2B2B30",
      color: "#FFFFFF"
    };
  }
```

Check your tab in Teams. The appearance should closely match the dark theme.

:::image type="content" source="../assets/images/tabs/personal-tab-tutorial-updated-theme.png" alt-text="Example screenshot of a personal tab with static content.":::

## Well done

Congratulations! You have a Teams app with a personal tab that makes it easier to find important contacts in your organization.

## Learn more

* [Authenticate tab users with SSO](../tabs/how-to/authentication/auth-aad-sso.md): If you only want authorized users viewing your tab, set up single sign-on (SSO) through Azure Active Directory (AD).
* [Embed content from an existing web app or webpage](../tabs/how-to/add-tab#tab-requirements): We showed you how to create new content for a personal tab, but you can also load content from an external URL.
* [Create a seamless experience for your tab](../tabs/design/tabs.md): See the recommended guidelines for designing Teams tabs.
* [Build tabs for mobile](../tabs/design/tabs-mobile.md): Understand how to develop tabs for smartphones and tablets.

> [!div class="nextstepaction"]
> [Keep going: Create a channel tab](../build-your-first-app/add-channel-tab.md)
