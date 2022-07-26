# Microsoft Teams UI Controls base component

[![npm version](https://badge.fury.io/js/msteams-react-base-component.svg)](https://www.npmjs.com/package/msteams-react-base-component)
[![npm](https://img.shields.io/npm/dt/msteams-react-base-component.svg)](https://www.npmjs.com/package/msteams-react-base-component)
[![MIT](https://img.shields.io/npm/l/msteams-react-base-component.svg)](https://github.com/wictorwilen/msteams-react-base-component/blob/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/wictorwilen/msteams-react-base-component.svg)](https://github.com/wictorwilen/msteams-react-base-component/issues)
[![GitHub closed issues](https://img.shields.io/github/issues-closed/wictorwilen/msteams-react-base-component.svg)](https://github.com/wictorwilen/msteams-react-base-component/issues?q=is%3Aissue+is%3Aclosed)

This is a React hook based on the Microsoft Teams JavaScript SDK and the Fluent UI components, which is used when generating Microsoft Teams Apps using the [Microsoft Teams Yeoman Generator](https://aka.ms/yoteams).

 | @master | @preview |
 :--------:|:---------:
 ![Build Status](https://img.shields.io/github/workflow/status/wictorwilen/msteams-react-base-component/msteams-react-base-component%20CI/master)|![Build Status](https://img.shields.io/github/workflow/status/wictorwilen/msteams-react-base-component/msteams-react-base-component%20CI/preview)

## Usage

To use this package in a Teams tab or extension import the `useTeams` Hook and then call it inside a functional component.

``` TypeScript
const [{inTeams}] = useTeams();
```

The `useTeams` hook will return a tuple of where an object of properties are in the first field and an object of methods in the second.

> **NOTE**: using the hook will automatically call `microsoftTeams.initialize()` and `microsoftTeams.getContext()` if the Microsoft Teams JS SDK is available.

### useTeams Hook arguments

The `useTeams` hook can take an *optional* object argument:

| Argument | Description |
|----------|-------------|
| `initialTheme?: string` | Manually set the initial theme (`default`, `dark` or `contrast`) |
| `setThemeHandler?: (theme?: string) => void` | Custom handler for themes |

### Available properties

| Property name | Type | Description |
|---------------|------|-------------|
| `inTeams` | boolean? | `true` if hosted in Teams and `false` for outside of Microsoft Teams |
| `fullScreen` | boolean? | `true` if the Tab is in full-screen, otherwise `false` |
| `themeString` | string | The value of `default`, `dark` or `contrast` |
| `theme` | ThemePrepared | The Fluent UI Theme object for the current theme |
| `context` | `microsoftTeams.Context?` | `undefined` while the Tab is loading or if not hosted in Teams, set to a value once the Tab is initialized and context available |

### Available methods

| Method name | Description |
|-------------|-------------|
| `setTheme(theme?: string)` | Method for manually setting the theme |

## Full example

Example of usage:

```  TypeScript
import * as React from "react";
import { Provider, Flex, Header } from "@fluentui/react-northstar";
import { useState, useEffect } from "react";
import { useTeams } from "msteams-react-base-component";

/**
 * Implementation of the hooks Tab content page
 */
export const HooksTab = () => {
    const [{ inTeams, theme }] = useTeams({});
    const [message, setMessage] = useState("Loading...");

    useEffect(() => {
        if (inTeams === true) {
            setMessage("In Microsoft Teams!");
        } else {
            if (inTeams !== undefined) {
                setMessage("Not in Microsoft Teams");
            }
        }
    }, [inTeams]);

    return (
        <Provider theme={theme}>
            <Flex fill={true}>
                <Flex.Item>
                    <Header content={message} />
                </Flex.Item>
            </Flex>
        </Provider>
    );
};
```

### Additional helper methods

The package also exports two helper methods, both used internally by the `useTeams` hook.

`getQueryVariable(name: string): string` - returns the value of the query string variable identified by the name.

`checkInTeams(): boolean` - returns true if hosted inside Microsoft Teams.

## License

Copyright (c) Wictor Wilén. All rights reserved.

Licensed under the MIT license.
