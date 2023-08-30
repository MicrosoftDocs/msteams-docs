---
author: joshuapartlow
title: Tab app navigation
description: Learn about the options for navigation within a tab app using the Microsoft Teams JavaScript client library (TeamsJS).
ms.date: 05/31/2023
ms.topic: conceptual
ms.custom: m365apps
ms.localizationpriority: medium
ms.author: joshuapa
---

# Navigate within a tab app

The Microsoft Teams JavaScript client library (TeamsJS) provides support for navigation within a tab. This article discusses the options available, which include types of navigation such as between tabs within the app or through use of Teams UI components and the back button.

[!INCLUDE [sdk-include](~/includes/sdk-include.md)]

Tabs provide a great way to enhance the Microsoft Teams experience. You can provide users access to your web application right within Teams using tabs, without having to sign in again. For more information about tabs, and how you can extend personal tabs across Microsoft 365 products, see [Build tabs for Teams](~/tabs/what-are-tabs.md) and [Extend a Teams personal tab across Microsoft 365](~/m365-apps/extend-m365-teams-personal-tab.md).

## Navigate between tabs

The [pages](/javascript/api/@microsoft/teams-js/pages) capability of the TeamsJS library provides support for navigation between tabs within an app. Specifically, the [`pages.currentApp`](/javascript/api/@microsoft/teams-js/pages.currentapp) namespace offers a function `navigateTo(NavigateWithinAppParams)` to allow navigation to a specific tab within the current app and a function `navigateToDefaultPage()` to navigate to the first tab defined in the app's manifest.

The following code illustrates how to navigate to a specific page:

```js
if (pages.currentApp.isSupported()) {
    const navPromise = pages.currentApp.navigateTo({pageId: <pageId>, subPageId:<subPageId>});
    navPromise.
        then((result) => {/*Successful navigation*/}).
        catch((error) => {/*Failed navigation*/});
}
else {/*Handle situation where capability isn't supported*/
    const navPromise = pages.navigateToApp({appId: <appId>, pageId: <pageId>});
    navPromise.
        then((result) => {/*Successful navigation*/}).
        catch((error) => {/*Failed navigation*/});
}
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

You can use the `pages.navigateToApp()` function. You can also use deep links for tab navigation as shown in [create deep links](~/concepts/build-and-test/deep-link-application.md#configure-deep-link-to-a-tab-using-teamsjs-library).

## Configure back button navigation

When an app has multiple tabs, a user can use the Microsoft 365 host app's back button to go backwards through the navigational history. However, the history doesn't include the actions a user performs within a tab. If you want to enhance the back button experience, you can maintain your own internal navigation stack and configure a custom handler for back button selections. This can be accomplished through the `registerBackButtonHandler()` function in the [`pages.backStack`](/javascript/api/@microsoft/teams-js/pages.backstack) namespace.

After you register the handler, it helps you to address the navigational request before the system takes action. If the handler is able to manage the request, it should return `true` so that the system knows no further action is necessary. If the internal stack is empty, it should return `false` so that the system can call the `navigateBack()` function instead and take the appropriate action.

## Return focus to host app

After the user starts using elements within a tab, by default, the focus remains with the elements of your iFrame until the user selects outside of it. If the iFrame is a part of the user navigating with keyboard shortcuts (the Tab key or the F6 key), you can focus on the host app. You can focus on the host app by using the [`pages.returnFocus()`](/javascript/api/@microsoft/teams-js/pages#@microsoft-teams-js-pages-returnfocus) function. The `returnFocus()` function accepts a Boolean indicating the direction to advance focus within the host app; `true` for forward and `false` for backwards. Generally, forward highlights the search bar and backwards highlights the app bar.

## See also

* [Extend a Teams personal tab across Microsoft 365](~/m365-apps/extend-m365-teams-personal-tab.md)
* [Build tabs for Teams](~/tabs/what-are-tabs.md)
* [Create a personal tab](~/tabs/how-to/create-personal-tab.md)
* [Create deep links](~/concepts/build-and-test/deep-links.md)
