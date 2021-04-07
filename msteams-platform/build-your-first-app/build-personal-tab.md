---
title: Get started - Build a personal tab
author: girliemac
description: Quickly create a Microsoft Teams personal tab using the Microsoft Teams Toolkit.
ms.author: timura
ms.date: 03/16/2020
ms.topic: tutorial
---
# Build a personal tab for Microsoft Teams

This tutorial teaches you to build a basic personal tab in Microsoft Teams. Tabs are a simple way to surface information in your app by hosting web content in Teams. Tabs are a common feature of personal apps that provide a private workspace for individual users. (Personal tabs are the closest thing to a traditional web experience in Teams.) 

This tutorial will take you through some of the app configurations and scaffolding relevant to personal tabs. It will also teach you to create a tab content with a contact list of your organization. Finally, you will update a tab's color theme based on user preference.

## Prerequisites

You need a basic running personal tab to get started.

## 1. Understand your app project components

After you have created a basic personal tab (covered in the build and run tutorial), the generated app scaffold provides the components for rendering your personal tab in Teams. There's a lot you can work with, but for now let us focus on the following: 

* `Tab.js` file in the `src/components` directory of your project. This is for rendering your tab content page.
* Microsoft Teams JavaScript client SDK, which comes pre-loaded in your project's front-end components.

As you may notice from the `import` section at the top of Tabs.js file, the sample code uses [React](https://reactjs.org/), an open-source JavaScript library for building user-interface. (Although using React is _not_ required for Teams development, this tutorial will walk you through with React!) 

## 2. Customize your tab content page

You can customize your tab content page to render a list of important contacts in your organization. 

**To customize your tab content page**

1. Copy and modify the following code sample with information that's relevant to you. You can also use the code as is. 

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
1. Got to the `src/components` directory and open the `Tab.js` file. 
1. Go to `render()` and replace the template code with the modified code inside `return()` (as shown here).

    ```JavaScript
    render() {
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
1. Go to the `src/components` directory and modify the `App.css` file with the following code to make the email links easier to read with any theme that is used.

    ```CSS
    a {
      color: inherit;
    }
    ```
1. Save your changes. 

You can view the new content in your app's tab in Teams.

  :::image type="content" source="../assets/images/build-your-first-app/personal-tab-tutorial-content.png" alt-text="Screenshot of a personal tab with static content.":::

## 3. Update your tab theme

It is important for your tab to have a theme that feels native to Teams and blend your tab with the Teams theme. Your users generally prefer default (light), dark, or high contrast themes. As you might have noticed in the last screenshot, your tab still has a light background when your user is using the dark theme. This is not a recommended user experience.

The Teams JavaScript client SDK can make your app aware of and react to theme changes in the client. Let's walk through how to do this.

### a. Get context about the configured Teams client theme

The `microsoftTeams.getContext()` call in your `Tab.js` file, provides some context about the configured client theme (such as dark theme). Use this code to access the `context` interface and its properties.

```JavaScript
componentDidMount(){
  // Get the user context from Teams and set it in the state
  microsoftTeams.getContext((context, error) => {
    this.setState({
      context: context,
      theme: context.theme
    });
  });
}
```

### b. Create a theme change handler

With the `context` properties in hand, your app has a solid understanding of what's happening around it in Teams. But the app still doesn't have an appearance reflecting the theme when a user updates it.

You need a handler to update your app's state with the theme. To create a handler, insert the following theme change handler immediately after the `microsoftTeams.getContext()` call.

```JavaScript
  microsoftTeams.registerOnThemeChangeHandler(theme => {
    if (theme !== this.state.theme) {
      this.setState({ theme });  
    }
  });
```

### c. Match the theme styles

Your theme change handler is in place, but you still need to respond to changes and align your tab's colors with the current theme.

> [!NOTE]
> The following example is just one way you might apply styles to your tab. Use the code as is, expand on it, or write your own.

In the `render()` function, store the state provided by the theme change handler in `isTheme`.

```JavaScript
  const isTheme = this.state.theme
```

After storing the state provided by the theme change handler, provide the conditional logic to render your tab's styles based on the current theme. The following example shows a basic way to do this:
1. Check the current theme under `isTheme`.
1. Create a `newTheme` object with CSS properties relevant to the current theme.
1. Apply the CSS to your tab content's root HTML element (`<div style={newTheme}>`).

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

Check your tab in Teams. The appearance now closely matches the dark theme.

   :::image type="content" source="../assets/images/build-your-first-app/personal-tab-tutorial-updated-theme.png" alt-text="Screenshot of a personal tab with static content view.":::

## See also

* [Build and Run your first Microsoft Teams app](../build-your-first-app/build-and-run.md) 
* [Teams JavaScript client SDK](https://docs.microsoft.com/javascript/api/@microsoft/teams-js/?view=msteams-client-js-latest&preserve-view=true)
* [Designing your tab for Microsoft Teams desktop and web](../tabs/design/tabs.md) 
* [Context interface](https://docs.microsoft.com/javascript/api/@microsoft/teams-js/context?view=msteams-client-js-latest&preserve-view=true)
* [Designing your Microsoft Teams app with UI templates](../concepts/design/design-teams-app-ui-templates.md) 
* [Tabs on mobile](../tabs/design/tabs-mobile.md).
* [Single sign-on (SSO) support for tabs](../tabs/how-to/authentication/auth-aad-sso.md)
* [Microsoft Teams API overview](https://docs.microsoft.com/graph/teams-concept-overview).
* [Quickstart: Create a custom personal tab with Node.js and the Yeoman Generator for Microsoft Teams](../tabs/quickstarts/create-personal-tab-node-yeoman.md).

## Next lesson

You know how to build a tab for personal use. Let's look at what it takes to build a tab for team channels and chats.

> [!div class="nextstepaction"]
> [Build a channel tab](../build-your-first-app/build-channel-tab.md)
