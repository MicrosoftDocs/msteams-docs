---
title: Using the control library
description: How to use the control library provided by Microsoft Teams App Studio
keywords: Teams App Studio Control Library
ms.date: 02/15/2018
---
# Using the control library in App Studio

Microsoft Teams App Studio provides you with a set of controls that you can use in your own apps. These controls are provided in the *Control Library* tab of App Studio.

These controls were created by the Microsoft Teams designers to streamline their own workflow, standardize control behavior and support Teams default themes. Use this library in your own apps to achieve a unified look and feel.

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

## React or not?
The full Teams control library uses the React UI framework however it is built so that it is not tied to a specific UI framework. There are four different npm packages:

* **msteams-ui-styles-core** The core CSS styles of UI components. It’s independent of any UI framework.
* **msteams-ui-icons-core** The core set of Teams icons.
* **msteams-ui-components-react** The React binding library. It depends on msteams-ui-styles-core.
* **msteams-ui-icons-react** The React binding library for the set of Teams icons. It depends on msteams-ui-icons-react.

These libraries are all open source, and you can use msteams-ui-styles-core and msteams-ui-icons-core without React.

## Adding the control library to your React app

Install the control library and its peer dependency ‘typestyle’

```terminal
npm install --save typestyle && npm install --save msteams-ui-components-react
```

*Optional* install the Teams icons.

```terminal
npm install --save msteams-ui-icons-react
```

find and open `src/App.js` and replace its content with following code:

```js
import React, { Component } from ‘react’;
import { TeamsComponentContext, ThemeStyle, PrimaryButton } from ‘msteams-ui-components-react’

class App extends Component {
   render() {
      // Sets up the top-level context for the library. It accepts global
      // configurations, e.g. font size and theme. fontSize is your page’s
      // default font size. We made it a parameter so that you could use this
      // library with CSS frameworks such as Bootstrap. Some CSS frameworks
      // set the default font size for the page; retrieve it and use it
      // instead of {16} in the block.
      // This library uses the power of CSS to most of the work for you.
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
