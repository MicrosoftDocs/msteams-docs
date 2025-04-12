---
title: TeamsJS App Initialization Process
description: Learn about the app initialization process, including the APIs involved and recommendations for their use in code.
author: JoshuaPartlow
ms.author: joshuapa
ms.service: msteams
ms.topic: concept-article #Required; leave this attribute/value as-is.
ms.date: 04/11/2025

#CustomerIntent: As a developer, I want to understand how the app initialization process works TeamsJS so that my app can make the appropriate API calls and work as recommended.
---

# TeamsJS app initialization process

The Microsoft Teams JavaScript client library (TeamsJS) supports the development of apps that run in Microsoft Teams, as well as other Microsoft 365 applications including Microsoft Outlook and the Microsoft 365 app.

The library is particulary helpful for developing apps that will run within [Tabs](../what-are-tabs.md) or [Dialogs](../../task-modules-and-cards/what-are-task-modules.md). With these two capabilities, you can easily integrate web-content and make use of your existing code and web development skills. At the same time, you can also use TeamsJS in your app to interact with user data and access host-specific functionality. TeamsJS provides APIs that allow you to do things such as interact with files or contacts, create meetings or chats with pre-populated data, and even access device information like location.

For apps to take advantage of the functionality provided by TeamsJS though, they must first go through the app initialization process. The app initialization process is a foundational aspect of using the TeamsJS library. It allows TeamsJS to setup communication with the underlying platform and coordinate all the internal setup required to get the app ready as well as provides you with an opportunity, should you need it, to complete your own initialization tasks while your app loads. While the specific steps required depend upon the type of app, the goal remains the same. App initialization ensures that your app is fully ready before it loads and users begin interacting with it. It's important to remember that all apps that make TeamsJS API calls, should go through the initialization process. The following sections will:

- Discuss the types of app initialization flows
- Review the APIs for app initialization and their role
- Show and explain the state changes during app initialization
- Provide recommendations for app initialization

## Types of app initialization flows

There are two flows that apps can follow for initialization depending upon their needs. For apps that require extra time during loading to download assets or complete their own setup, there's a way to display a loading indicator and notify the system as the app progresses through its necessary loading behaviors. For apps that don't require a loading indicator and are able to begin running immediately there's a simpler flow available. We call these two app types *loading* and *immediate* apps respectively.

It's up to you to choose and define which flow the app follows. We recommend that apps follow the most common valid paths outlined in the state diagram as closely as possible.

> [!NOTE]
> Be aware that if the app uses caching, it enters a *cached/suspended* state, where API calls don't impact it until it resumes. Upon resume the app must call `app.notifySuccess()` to complete loading.

### Immediate loading flow

When an app has the `showLoadingIndicator` flag set to **false**, or not set at all, in the [app manifest](../../resources/schema/manifest-schema.md) then the app initialization process is very straight forward. The app calls `app.initialize()` before any calls to other TeamsJS APIs and that's all that is required. The app is expected to be initialized immediately after the call to `app.initialize()`. No calls to other initialization APIs, such as `app.notifySuccess()` or `app.notifyFailure()`, are needed or expected. Essentially, the flow is:

1. The [IFrame](https://developer.mozilla.org/docs/Web/HTML/Element/iframe) is created and page loaded.
1. The app calls `app.initialize()`.
1. No further calls are required.

The following state diagram shows the behavior of an app that is intended to load immediately, without display of a loading indicator.

:::image type="content" source="../../assets/images/tabs/app-initialization-immediate-flow.png" alt-text="State diagram showing the initialization flow for an app that loads immediately.":::

For apps that don't require time for loading the process is straight forward, the app calls `app.initialize()` and is fully loaded.

### Loading screen flow

When an app has the `showLoadingIndicator` flag set to **true** in the [app manifest](../../resources/schema/manifest-schema.md) the app is expected to use a loading screen while necessary tasks take place, informing the library through the other app initialization APIs as it progresses through loading operations. Essentially, the flow is:

1. The IFrame is created and page loaded.
1. The app calls `app.initialize()`.
1. Once ready the app can optionally call `app.notifyAppLoaded()`.
1. Depending on the results, the app calls app.`notifySuccess()`, `app.notifyFailure()`, or `app.notifyExpectedFailure()` as appropriate.

The following state diagram shows the behavior of an app that is intended to load with a loading indicator. Unlike an app that loads immediately after `app.initialize()`, apps that use the loading indicator must call other APIs to inform the system of the apps progress.

:::image type="content" source="../../assets/images/tabs/app-initialization-loading-indicator-flow.png" alt-text="State diagram showing the initialization flow for an app that requires a loading indicator.":::

For apps that need time to load the most common path is to call `app.initialize()` and then either `app.notifySuccess()` or `app.notifyExpectedFailure()` to complete loading. That said, an app can alternately call `app.notifyAppLoaded()` after `app.initialize()` to remove the spinner while still loading.

### Recommended app initialization behavior

It's important to understand that since the state diagrams for either flow are a directed graph, and each state triggering a state change is idempotent, any legal path in the graph is valid. For example should an app encounter an error while running, the following behavior is valid.

1. The app calls `app.initialize()` to enter the **Loading** state.
1. The app encounters an error and is reinitialized by calling `app.initialize()` again.
1. The app calls `app.notifySuccess()` to reach the **Loaded** state.

> [!NOTE]
> While multiple calls to `app.initialize()` are valid, we don't recommend making an excessive number before calling `app.notifySuccess()` as there is a chance of failure.

## APIs for app initialization

As seen in the state diagrams, there are specific APIs within the [Teams JavaScript client library](using-teams-client-library.md) (TeamsJS) used during the app initialization process. Those APIs are:

- [app.initialize()](/javascript/api/@microsoft/teams-js/app#@microsoft-teams-js-app-initialize) - Initializes the TeamsJS library. Before any other library calls are made, `app.initialize()` has to be called and complete successfully.
- [app.notifyApploaded()](/javascript/api/@microsoft/teams-js/app#@microsoft-teams-js-app-notifyapploaded) - Notifies the frame that the app is partially loaded and that the loading indicator can be hidden if one was shown.
- [app.notifySuccess()](/javascript/api/@microsoft/teams-js/app#@microsoft-teams-js-app-notifysuccess) - Notifies the frame that the app is fully loaded and was successfully initialized. It's now ready for user interaction. Can also clear the loading indicator.
- [app.notifyFailure()](/javascript/api/@microsoft/teams-js/app#@microsoft-teams-js-app-notifyfailure) - Notifies the frame that app initialization failed during loading and to show an error page in its place.
- [app.notifyExpectedFailure()](/javascript/api/@microsoft/teams-js/app#@microsoft-teams-js-app-notifyexpectedfailure) - Notifies the frame that the app initialized with some expected errors, but can be considered loaded successfully.

> [!IMPORTANT]
> All of the initialization functions listed are idempotent. That means that no matter how many times they're called with the same input, the result is always the same and the system's state is unchanged after the first call. For example, when the `app.initialize()` function is called and completes successfully, it always resets the app to the loading state even if it was called before.

### App caching APIs

Within TeamsJS there are also APIs that support the caching of resources to improve the subsequent launch times of apps. These APIs allow developers to keep some resources and assets in memory so that they can be use when rehydrating their apps. For more information, see [App caching for your tab app](app-caching.md).

## Related content

- [Create a content page](create-tab-pages/content-page.md)
- [Show a native loading indicator](create-tab-pages/content-page?tabs=teamsjs-v2#show-a-native-loading-indicator)
- [TeamsJS reference](/javascript/api/@microsoft/teams-js/)
