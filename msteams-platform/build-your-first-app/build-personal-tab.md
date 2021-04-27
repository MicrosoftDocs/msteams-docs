---
title: Get started - Build a personal tab
author: heath-hamilton
description: Quickly create a Microsoft Teams personal tab using the Microsoft Teams Toolkit.
ms.author: lajanuar
localization_priority: Normal
ms.date: 11/03/2020
ms.topic: tutorial
---
# Build a personal tab for Microsoft Teams

Tabs are a simple way to surface content in your app by essentially embedding a webpage in Teams.

There are two types of tabs in Teams. In this tutorial, you'll build basic a *personal tab*, a full-screen content page for individual users. (Personal tabs are the closest thing to a traditional website experience in Teams.)

## Before you begin

You need a basic running personal tab to get started. If you don't have one, see [build and run your first Teams app](../build-your-first-app/build-and-run.md).

## Your assignment

People in your organization have trouble finding basic contact information for important functions (help desk, HR, etc.). You're in charge of making sure they can quickly find this information in one place. How would you do that? A Teams personal tab, of course.

## What you'll learn

> [!div class="checklist"]
>
> * Identify some of the app configurations and scaffolding relevant to personal tabs
> * Create tab content
> * Update a tab's color theme based on user preference

## 1. Identify relevant app project components

Much of the app configurations and scaffolding are set up automatically when you create your project with the Teams Toolkit. Let's look at the main components for building a personal tab.

### App configurations

In the toolkit, go to **App Studio** to view and update your app configurations.

### App scaffolding

The app scaffolding provides the components for rendering your personal tab in Teams. There's a lot you can work with, but for now you only need to focus on the following:

* `Tab.js` file in the `src/components` directory of your project. This is for rendering your tab content page.
* Microsoft Teams JavaScript client SDK, which comes pre-loaded in your project's front-end components.

## 2. Customize your tab content page

Compile a list of important contacts in your organization. Copy and update the following snippet with information that's relevant to you or, for the sake of time, use the code as is.

```JSX
<div>
  <h1>Important Contacts</h1>
    <ul>
      <li>Help Desk: <a href="mailto:support@company.com">support@company.com</a></li>
      <li>Human Resources: <a href="mailto:hr@company.com">hr@company.com</a></li>
      <li>Facilities: <a href="mailto:facilities@company.com">facilities@company.com</a></li>
    </ul>
</div>
```

Go to the `src/components` directory and open `Tab.js`. Locate the `render()` function and paste your content inside `return()` (as shown).

```JavaScript
render() {

    let userName = Object.keys(this.state.context).length > 0 ? this.state.context['upn'] : "";

    return (
    <div>
      <h1>Important Contacts</h1>
        <ul>
          <li>Help Desk: <a href="mailto:support@company.com">support@company.com</a></li>
          <li>Human Resources: <a href="mailto:hr@company.com">hr@company.com</a></li>
          <li>Facilities: <a href="mailto:facilities@company.com">facilities@company.com</a></li>
        </ul>
    </div>
    );
}
```

Add the following rule to `App.css` so the email links are easier to read no matter which theme is used.

```CSS
a {
  color: inherit;
}
```

Save your changes. Go to your app's tab in Teams to view the new content.

:::image type="content" source="../assets/images/tabs/personal-tab-tutorial-content.png" alt-text="Screenshot of a personal tab with static content.":::

## 3. Update the tab theme

Good apps feel native to Teams, so it's important your tab blends with the Teams theme your users prefer: default (light), dark, or high contrast. As you might have noticed in the last screenshot, your tab still has a light background when the client's using the dark theme. This is not a recommended user experience.

The [Teams JavaScript client SDK](https://docs.microsoft.com/javascript/api/@microsoft/teams-js/?view=msteams-client-js-latest&preserve-view=true) can make your app aware of and react to theme changes in the client. Let's walk through how to do this.

### Get context about the Teams client

In your `Tab.js` file, there's a `microsoftTeams.getContext()` call that provides some [`context`](https://docs.microsoft.com/javascript/api/@microsoft/teams-js/context?view=msteams-client-js-latest&preserve-view=true) about, among other details, the configured client theme. Thanks to the app scaffolding, use this code as is to access the `context` interface and its properties.

```JavaScript
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

With the `context` properties in hand, your app has a solid understanding of what's happening around it in Teams. But the app still doesn't know its appearance should reflect whatever theme a user chooses.

You need a handler so that your app's state changes with the theme. Insert the following theme change handler immediately after the `microsoftTeams.getContext()` call.

```JavaScript
  microsoftTeams.registerOnThemeChangeHandler(theme => {
    if (theme !== this.state.theme) {
      this.setState({ theme });  
    }
  });
```

### Match theme styles

Your theme change handler is in place, but you need some code that responds to those changes and aligns your tab's colors with the current theme.

> [!NOTE]
> The following example is just one way you might apply styles to your tab. Use the code as is, expand on it, or write your own.

In the `render()` function, store the state provided by the theme change handler in `isTheme`.

```JavaScript
  const isTheme = this.state.theme
```

After storing the state provided by the theme change handler, provide some conditional logic to render your tab's styles based on the current theme. The following example shows a basic way to do this:
1. Check the current theme in `isTheme`.
2. Create a `newTheme` object with CSS properties relevant to the current theme.
3. Apply the CSS to your tab content's root HTML element (`<div style={newTheme}>`).

```JavaScript
let newTheme

if (isTheme === "default") {
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

:::image type="content" source="../assets/images/tabs/personal-tab-tutorial-updated-theme.png" alt-text="Screenshot of a personal tab with static content view.":::

## Well done

Congratulations! You have a Teams app with a personal tab that makes it easier to find important contacts in your organization.

## Learn more

* Follow our [design guidelines](../tabs/design/tabs.md) and build with [production-ready UI templates](../concepts/design/design-teams-app-ui-templates.md) to create a seamless experience.
* Understand [mobile considerations](../tabs/design/tabs-mobile.md) for tabs.
* [Add SSO authentication to your tab](../tabs/how-to/authentication/auth-aad-sso.md).
* Utilize Teams data with [Microsoft Graph](https://docs.microsoft.com/graph/teams-concept-overview).
* [Create a tab without the toolkit](../tabs/quickstarts/create-personal-tab-node-yeoman.md).

## Next lesson

You know how to build a tab for personal use. Let's look at what it takes to build a tab for team channels and chats.

> [!div class="nextstepaction"]
> [Build a channel tab](../build-your-first-app/build-channel-tab.md)
