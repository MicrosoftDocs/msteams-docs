---
title: Personal tab app navigation
description: Learn about the options for navigation within a personal tab app using the TeamsJS library.
ms.date: 10/26/2022
ms.topic: conceptual
ms.custom: m365apps
ms.localizationpriority: medium
---

# Navigate within a personal tab app

The TeamsJS library provides support for navigation within a personal app. This article discusses the options available, which includes types of navigation such as that between tabs within the app or through use of Teams UI components like the back button.

[!INCLUDE [sdk-include](~/includes/sdk-include.md)]

Personal tabs provide a great way to enhance the Microsoft Teams experience. Using personal tabs, you can provide a user access to their application right within Teams, without the user having to leave the experience or sign in again. For more information about personal tabs and how you can extend them across Microsoft 365 products, see [Build tabs for Teams](../tabs/what-are-tabs.md) and [Extend a Teams personal tab across Microsoft 365](extend-m365-teams-personal-tab.md).

## Navigate between tabs

The [pages](/javascript/api/@microsoft/teams-js/pages?view=msteams-client-js-latest&preserve-view=true) capability of the TeamsJS library provides support for navigation between tabs within a personal app. Specifically, the [pages.currentApp](/javascript/api/@microsoft/teams-js/pages.currentapp?view=msteams-client-js-latest&preserve-view=true) namespace offers a function `navigateTo(NavigateWithinAppParams)` to allow navigation to a specific tab within the current app and a function `navigateToDefaultPage()` to navigate to the first tab defined in the app's manifest.

The following code illustrates how to navigate to a specific page:

```js
if (pages.currentApp.isSupported()) {
    const navPromise = pages.currentApp.navigateTo({pageId: <pageId>, subPageId:<subPageId>});
    navPromise.
        then((result) => {/*Successful navigation*/}).
        catch((error) => {/*Failed navigation*/});
}
else {/*Handle situation where capability isn't supported*/}
```

The following code illustrates how to navigate to the app's default tab:

```js
if (pages.currentApp.isSupported()) {
    const navPromise = pages.currentApp.navigateToDefaultPage();
    navPromise.
        then((result) => {/*Successful navigation*/}).
        catch((error) => {/*Failed navigation*/});
}
else {/*Handle situation where capability isn't supported*/}
```

It is also possible to use the `pages.navigateToApp()` function, `pages.tabs.navigateToTab()` function, or deep links for tab navigation, as shown in [Create deep links](../concepts/build-and-test/deep-links.md#navigate-within-your-app), however the preferred method for apps that are extended across Microsoft 365 is to use the APIs in the `pages.currentApp` namespace.

## Configure back button navigation

When a personal app has multiple tabs, a user can use the Microsoft 365 host app's back button to go backwards through the navigational history. However, that history does not include actions a user might have taken within a tab. If you would like to better control the back button experience, it is possible to maintain your own internal navigation stack and configure a custom handler for back button presses. This is accomplished through the `registerBackButtonHandler()` function in the [pages.backStack](/javascript/api/@microsoft/teams-js/pages.backstack?view=msteams-client-js-latest) namespace.

Once a handler is registered, the handler is provided the opportunity to address the navigational request before the system takes action. If the handler is able to handle the request, it should return `true` so that the system knows no further action is necessary. Otherwise, for example if the internal stack is empty, it should return `false` so that the system can call the `navigateBack()` function instead and take the appropriate action.

## Return focus to host app

Once a user starts using elements within a tab, by default focus remains with the elements of your iFrame until the user clicks outside of it. If, as part of the user navigating with keyboard shortcuts (tab or F6) you'd like to return focus to the host app, you can use the [pages.returnFocus()](/javascript/api/@microsoft/teams-js/pages?view=msteams-client-js-latest#@microsoft-teams-js-pages-returnfocus) function. The `returnFocus()` function accepts a boolean indicating the direction to advance focus within the host, `true` for forward and `false` for backwards. Generally, forward results in the search bar being highlighted and backwards results in the app bar being highlighted.

## See also

* [Extend a Teams personal tab across Microsoft 365](extend-m365-teams-personal-tab.md)
* [Build tabs for Teams](../tabs/what-are-tabs.md)
* [Create a personal tab](../tabs/how-to/create-personal-tab.md)
* [Create deep links](../concepts/build-and-test/deep-links.md)
