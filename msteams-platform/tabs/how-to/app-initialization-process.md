---
title: TeamsJS App Initialization Process
description: Learn about the app initialization process, including the APIs involved and recommendations for their use in code.
author: JoshuaPartlow
ms.author: joshuapa
ms.service: msteams
ms.topic: concept-article #Required; leave this attribute/value as-is.
ms.date: 06/10/2025

#CustomerIntent: As a developer, I want to understand how the app initialization process works TeamsJS so that my app can make the appropriate API calls and work as recommended.
---

# TeamsJS app initialization process

The Microsoft Teams JavaScript client library (TeamsJS) supports the development of apps that run in Microsoft Teams, and other Microsoft 365 applications including Microsoft Outlook and the Microsoft 365 app. For apps to take advantage of the functionality provided by TeamsJS though, they must first go through the app initialization process.

The app initialization process is a foundational aspect of using the TeamsJS library. It allows TeamsJS to setup communication with the underlying platform and coordinate all the internal setup required to get the app ready. Additionally, it provides you with an opportunity to complete your own initialization tasks while your app loads. Although the specific steps required depend upon the type of app, the goal remains the same. App initialization ensures that your app is fully ready before it loads and users begin interacting with it. It's important to remember that all apps that make TeamsJS API calls, should go through the initialization process. The following sections will:

- Review the APIs for app initialization and their role
- Discuss the types of app initialization flow
- Show and explain the state changes during app initialization
- Provide recommendations for app initialization

## APIs for app initialization

There are specific APIs within the [Teams JavaScript client library](using-teams-client-library.md) (TeamsJS) used during the app initialization process. We illustrate how they're used in the following sections, but to provide contextual information those APIs are:

- [app.initialize()](/javascript/api/@microsoft/teams-js/app#@microsoft-teams-js-app-initialize) - Initializes the TeamsJS library. Before any other library calls are made, `app.initialize()` has to be called and complete successfully. This call establishes communication between TeamsJS and the underlying platform, and also returns runtime and host configuration information to the app.
- [app.notifyApploaded()](/javascript/api/@microsoft/teams-js/app#@microsoft-teams-js-app-notifyapploaded) - Notifies the frame that the app is partially loaded and that the loading indicator can be hidden if one was shown.
- [app.notifySuccess()](/javascript/api/@microsoft/teams-js/app#@microsoft-teams-js-app-notifysuccess) - Notifies the frame that the app is fully loaded and was successfully initialized. It's now ready for user interaction. Can also clear the loading indicator.
- [app.notifyFailure()](/javascript/api/@microsoft/teams-js/app#@microsoft-teams-js-app-notifyfailure) - Notifies the frame that app initialization failed during loading and to show an error page in its place.
- [app.notifyExpectedFailure()](/javascript/api/@microsoft/teams-js/app#@microsoft-teams-js-app-notifyexpectedfailure) - Notifies the frame that the app initialized with some expected errors, but can be considered loaded successfully.

> [!IMPORTANT]
> All of the initialization functions listed are **idempotent**. That means that no matter how many times they're called with the same input, the result is always the same and the system's state is unchanged after the first call. For example, when the `app.initialize()` function is called and completes successfully, it always resets the app to the loading state even if it was called before.

## Types of app initialization flows

There are two flows that apps can follow for initialization depending upon their needs. For apps that require extra time during loading to download assets or complete their own setup, there's a way to display a loading indicator and notify the system as the app progresses through its necessary loading behaviors. For apps that don't require a loading indicator and are able to begin running immediately there's a simpler flow available. We call these two app types *loading* and *immediate* apps respectively. For additional information about the loading indicator, see [Show a native loading indicator](create-tab-pages/content-page.md#show-a-native-loading-indicator).

It's up to you to choose and define which flow the app follows. The following sections describe the two flows and provide state diagrams to help illustrate how they work.

### Immediate app flow

When an app has the `showLoadingIndicator` flag set to **false** or not set at all in the [app manifest](../../resources/schema/manifest-schema.md), the app initialization process is very straight forward. The app calls `app.initialize()` before any calls to other TeamsJS APIs and that's all that is required. The app is expected to be initialized immediately after the call to `app.initialize()`. No calls to other initialization APIs, such as `app.notifySuccess()` or `app.notifyFailure()`, are needed. Essentially, the flow is:

1. The [IFrame](https://developer.mozilla.org/docs/Web/HTML/Element/iframe) is created and page loaded.
1. The app calls `app.initialize()`.
1. No further calls are required.

The following state diagram shows the behavior of an app that is intended to load immediately, without display of a loading indicator.

:::image type="content" source="../../assets/images/tabs/app-initialization-immediate-flow.png" alt-text="State diagram showing the initialization flow for an app that loads immediately." lightbox="../../assets/images/tabs/app-initialization-immediate-flow.png":::

For apps that don't require time for loading the process is straight forward, the app calls `app.initialize()` and is fully loaded.

#### App caching considerations for immediate apps

Within TeamsJS, there are also APIs that support the caching of resources to improve the subsequent launch times of apps. These APIs allow developers to keep some resources and assets in memory so that they can be used when rehydrating their apps. For more information about caching, see [App caching for your tab app](app-caching.md).

It's important to be aware that if the app uses caching, it enters a *cached/suspended* state, where API calls don't impact it until it resumes. When an app resumes from cache, its state is set to **Loading** because the platform is waiting for it to call `app.notifySuccess()` to complete the loading sequence. Upon resume the app must call `app.notifySuccess()` to complete loading.

### Loading app flow

When an app has the `showLoadingIndicator` flag set to **true** in the [app manifest](../../resources/schema/manifest-schema.md) the app is expected to use a loading screen while necessary tasks take place, informing the library through the other app initialization APIs as it progresses through loading operations. Essentially, the flow is:

1. The IFrame is created and page loaded.
1. The app calls `app.initialize()`.
1. Once ready the app can optionally call `app.notifyAppLoaded()`.
1. Depending on the results, the app calls `app.notifySuccess()`, `app.notifyFailure()`, or `app.notifyExpectedFailure()` as appropriate.

The following state diagram shows the behavior of an app that is intended to load with a loading indicator. Unlike an app that loads immediately after `app.initialize()`, apps that use the loading indicator must call other APIs to inform the system of the apps progress.

:::image type="content" source="../../assets/images/tabs/app-initialization-loading-indicator-flow.png" alt-text="State diagram showing the initialization flow for an app that requires a loading indicator." lightbox="../../assets/images/tabs/app-initialization-loading-indicator-flow.png":::

For apps that need time to load the most common path is to call `app.initialize()` and then either `app.notifySuccess()` or `app.notifyExpectedFailure()` to complete loading. That said, an app can alternately call `app.notifyAppLoaded()` after `app.initialize()` to remove the spinner while still loading.

#### App caching considerations for loading apps

Within TeamsJS there are also APIs that support the caching of resources to improve the subsequent launch times of apps. These APIs allow developers to keep some resources and assets in memory so that they can be used when rehydrating their apps. For more information about caching, see [App caching for your tab app](app-caching.md).

The following state diagram illustrates the initialization behavior when an app makes use of caching.

:::image type="content" source="../../assets/images/tabs/app-initialization-loading-indicator-flow-cache-transitions.png" alt-text="State diagram showing the use of caching as part of the initialization flow for an app that requires a loading indicator." lightbox="../../assets/images/tabs/app-initialization-loading-indicator-flow-cache-transitions.png":::

It's important to be aware that if the app uses caching, it enters a *cached/suspended* state, where API calls don't impact it until it resumes. Note that when an app resumes from cache, its state is set to **Loading** because the platform is waiting for it to call `app.notifySuccess()` to complete the loading sequence. Upon resume the app must call `app.notifySuccess()` to complete loading.

### Recommended app initialization call patterns

It's important to understand that since the state diagrams for either flow are a directed graph, and each API function triggering a state change is idempotent, any legal path in the graph is valid. For example should an app encounter an error while running, the following call pattern is valid.

1. The app calls `app.initialize()` to enter the **Loading** state.
1. The app encounters an error and is reinitialized by calling `app.initialize()` again.
1. The app calls `app.notifySuccess()` to reach the **Loaded** state.

While multiple calls to `app.initialize()` are valid, we **don't recommend** making an excessive number before calling `app.notifySuccess()` as that will increase the risk of failure.

## Related content

- [Create a content page](create-tab-pages/content-page.md)
- [Show a native loading indicator](create-tab-pages/content-page.md#show-a-native-loading-indicator)
- [TeamsJS reference](/javascript/api/@microsoft/teams-js/)
- [App caching for your tab app](app-caching.md)
