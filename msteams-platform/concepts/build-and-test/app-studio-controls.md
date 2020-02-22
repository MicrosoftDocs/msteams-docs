---
title: Using the control library
description: How to use the control library provided by Microsoft Teams App Studio
keywords: Teams App Studio Control Library
---
# Using the control library in App Studio

[Microsoft Teams App Studio](~/get-started/get-started-app-studio.md) provides you with a set of controls that you can use in your own apps. These controls are provided in the *Control Library* tab of App Studio.

These controls were created by the Microsoft Teams designers to streamline their own workflows, standardize control behavior and support Team's default themes. You can use this library in your own apps to achieve a unified look and feel.

Controls include:

* Buttons
* Dropdowns
* Checkboxes
* Radio Buttons
* Toggles
* Test Areas
* Links
* Tabs
* Tables
* Icons

## Optionally use React controls

The full Teams control library uses the [React JavaScript UI framework](https://reactjs.org/) however it is built so that it is not tied to a specific UI framework. There are four different npm packages:

* **msteams-ui-styles-core** The core CSS styles of UI components. It’s independent of any UI framework.
* **msteams-ui-icons-core** The core set of Teams icons.
* **msteams-ui-components-react** The React binding library. It depends on msteams-ui-styles-core.
* **msteams-ui-icons-react** The React binding library for the set of Teams icons. It depends on msteams-ui-icons-core.

These libraries are all open source, and you can use msteams-ui-styles-core and msteams-ui-icons-core without React.

## Adding the control library

Install the control library and its peer dependency `typestyle`:

```terminal
npm install --save typestyle && npm install --save msteams-ui-components-react
```

*Optional:* Install the Teams icons.

```terminal
npm install --save msteams-ui-icons-react
```

Find and open `src/App.js` and replace its content with following code:

```javascript
import React, { Component } from ‘react’;
import { TeamsComponentContext, ThemeStyle, PrimaryButton } from ‘msteams-ui-components-react’

class App extends Component {
   render() {
      // Sets up the top-level context for the library. It accepts global
      // configurations such as font size and theme. fontSize is your page’s
      // default font size. We made it a parameter so that you could use this
      // library with CSS frameworks such as Bootstrap. Some CSS frameworks
      // set the default font size for the page; retrieve it and use it
      // instead of {16} in the block.
      // This library uses the power of CSS to do most of the work for you.
      // Instead of passing themes as a parameter to every UI component,
      // we set it on a parent HTML element. All HTML elements nested within
      // that parent will inherit these properties.

      return (
        <TeamsComponentContext
            fontSize={16}
            theme={ThemeStyle.Light}
        />
      );
   }
}
export default App;
```

Run the app

```terminal
npm run start
```

When you navigate to http://localhost:3000, you should see the following screen:

<img width="530px" src="~/assets/images/get-started/control-library-button.png" title="Control Library Button"/>

## Dynamically handling theme changes

Your app needs to handle themes when:

* The tab is initially loaded
* A user changes the theme after the tab is already loaded

The theme is included in a tab’s [Context](/javascript/api/@microsoft/teams-js/context&view=msteams-client-js-latest), which can be retrieved before the tab is loaded via URL placeholder values, or at any time by using the [Microsoft Teams JavaScript client SDK](/javascript/api/%40microsoft/teams-js/context).

How the current theme is retrieved and how to respond to theme changes is discussed here: [Get context for your Microsoft Teams tab](~/concepts/tabs/tabs-context.md).

This sample code shows how this is done.

```js
componentWillMount() {
    // If you are deploying your site as a MS Teams static or configurable tab,
    // you should add “?theme={theme}” to your tabs URL in the manifest.
    // That way you will get the current theme before it’s loaded; getContext()
    // is called only after the tab is loaded, which will cause the tab to flash
    // if the current theme is different than the default.
    this.updateTheme(this.getQueryVariable('theme'));
    this.setState({
        fontSize: this.pageFontSize(),
    });

    // If you are not using the MS Teams Javascript SDK, you can remove this entire
    // if block, but if you want theme changes in the MS Teams client to propagate
    // to the tab, leave it here.
    microsoftTeams.initialize();
    microsoftTeams.registerOnThemeChangeHandler(this.updateTheme);
}
```

## Connect your own component to the TeamsComponentContext

If you want to use your own CSS code you can still respond to theme changes and use colors defined by teams. TeamsComponentContext allows you to do this.

Once again, edit your `src/App.js` file and replace its content with following code:

```javascript
import React, { Component } from ‘react’;
import { TeamsComponentContext, ThemeStyle, ConnectedComponent } from ‘msteams-ui-components-react’

class App extends Component {
    render() {
        return (
            <TeamsComponentContext
                fontSize={16}
                theme={ThemeStyle.HighContrast}>
                <MyComponent />
            </TeamsComponentContext>
        );
    }
}

class MyComponent extends Component {
    render() {
        return (
            <ConnectedComponent render={(props) => {
                const context = props.context;

                switch (context.style) {
                case ThemeStyle.Dark:
                    return <div style={{ color: context.colors.dark.brand00 }}>Dark theme!</div>;
                case ThemeStyle.HighContrast:
                    return <div style={{ color: context.colors.highContrast.black }}>High Contrast theme!</div>;
                case ThemeStyle.Light:
                    return <div style={{ color: context.colors.light.brand00 }}>Light theme!</div>;
                }
            }} />
        );
    }
}

export default App;
```

In this code, a new component is defined called MyComponent. Then a special component from the control library called ConnectedComponent is added. ConnectedComponent has a property called `render` which takes a function as a parameter. At render time this function will be called with the appropriate context for your tab. The context includes the theme that the page is being rendered in as well as the global color object that you can use to apply Teams colors to your tab. As you can see in the `switch` statement, the appropriate `<div>` is chosen based on the theme.

To change themes, we need to pass the root-level TeamsComponentContext a different theme. When a theme changes, all the child elements wrapped in ConnectedComponent will be re-rendered. See previous section “Dynamically Handle Theme Changes.”

There are other ways to connect your component to TeamsComponentContext. If you’re familiar with [Redux](https://redux.js.org/basics/usage-with-react), you may prefer the following pattern:

```js
import React, { Component } from ‘react’;
import { TeamsComponentContext, ThemeStyle, connectTeamsComponent } from ‘msteams-ui-components-react’

class App extends Component {
    render() {
        return (
            <TeamsComponentContext
                fontSize={16}
                theme={ThemeStyle.HighContrast}>
                <MyComponent />
            </TeamsComponentContext>
        );
    }
}

class MyComponentInner extends Component {
    render() {
        const context = this.props.context;
        switch (context.style) {
            case ThemeStyle.Dark:
                return <div style={{ color: context.colors.dark.brand00 }}>Dark theme!</div>;
            case ThemeStyle.HighContrast:
                return <div style={{ color: context.colors.highContrast.black }}>High Contrast theme!</div>;
            case ThemeStyle.Light:
                return <div style={{ color: context.colors.light.brand00 }}>Light theme!</div>;
        }
    }
}

const MyComponent = connectTeamsComponent(MyComponentInner);

export default App;
```

In this method, instead of using ConnectedComponent, you use the connectTeamsComponent function. The connectTeamsComponent function takes your current component and returns a new component with the context object injected.

## Next steps

Head to Teams App Studio and check out all the controls we offer and sample code of how to use them. Don’t forget to explore them in different themes.