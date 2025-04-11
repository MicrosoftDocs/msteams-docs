---
title: App Initialization Process for Tab Apps
description: Learn about the app initialization process, including the APIs involved and recommendations for their use in code.
author: JoshuaPartlow
ms.author: joshuapa
ms.service: msteams
ms.topic: concept-article #Required; leave this attribute/value as-is.
ms.date: 03/16/2025

#CustomerIntent: As a developer, I want to understand how the app initialization process works for tab apps so that my app can make the appropriate API calls and work as recommended.
---

# App initialization process

App initialization is a foundational aspect of authoring a tab app and ensures that apps work as expected. All apps created for Microsoft Teams that use TeamsJS must be initialized. The process of app initialization is a finite state machine and it uses APIs with specific roles to advance and monitor the event flow. The following sections will:

- Review the APIs for app initialization and their role
- Discuss the types of app initialization flows
- Show and explain the state changes during app initialization
- Provide recommendations for app initialization

## APIs for app initialization

There are specific APIs within the [Teams JavaScript client library](using-teams-client-library.md) (TeamsJS) used during the app initialization process. While their specific use during initialization is discussed in later sections, at a high level they're:

- [app.initialize()](/javascript/api/@microsoft/teams-js/app#@microsoft-teams-js-app-initialize) - Initializes the TeamsJS library. Before any other library calls are made, `app.initialize()` has to be called and complete successfully.
- [app.notifyApploaded()](/javascript/api/@microsoft/teams-js/app#@microsoft-teams-js-app-notifyapploaded) - Notifies the frame that the app is partially loaded and that the loading indicator can be hidden if one was shown.
- [app.notifySuccess()](/javascript/api/@microsoft/teams-js/app#@microsoft-teams-js-app-notifysuccess) - Notifies the frame that the app is fully loaded and was successfully initialized. It's now ready for user interaction.
- [app.notifyFailure()](/javascript/api/@microsoft/teams-js/app#@microsoft-teams-js-app-notifyfailure) - Notifies the frame that app initialization failed during loading and to show an error page in its place.
- [app.notifyExpectedFailure()](/javascript/api/@microsoft/teams-js/app#@microsoft-teams-js-app-notifyexpectedfailure) - Notifies the frame that the app initialized with some expected errors, but can be considered loaded successfully.

> [!IMPORTANT]
> All of the initialization functions listed are idempotent. That means that no matter how many times they're called with the same input, the result is always the same and the system's state is unchanged after the first call. For example, when the `app.initialize()` function is called and completes successfully, it always resets the app to the loading state even if it was called before.

### App caching APIs

Within TeamsJS there are also APIs that support the caching of resources to improve the subsequent launch times of apps. These APIs allow developers to keep some resources and assets in memory so that they can be use when rehydrating their apps. For more information, see [App caching for your tab app](app-caching.md).

## Types of app initialization flows

There are two flows that apps can follow for initialization depending upon their needs. For apps that require extra time during loading, there's a way to display a loading indicator and notify the system as the app progresses through its necessary loading behaviors. For apps that don't require a loading indicator and are able to begin running immediately there's a simpler flow available.

It's up to you to choose and define which flow the app follows. We recommend that apps follow the most common valid paths outlined in the state diagram as closely as possible.

> [!NOTE]
> If the app uses caching, it enters a *cached/suspended* state, where API calls don't impact it until it resumes. Upon resume the app must call `app.notifySuccess()` to complete loading.

### Immediate loading flow

When an app has the `showLoadingIndicator` flag set to **false**, or not set at all, in the [app manifest](../../resources/schema/manifest-schema.md) the app is expected to be initialized immediately after the call to `app.initialize()`. No calls to other initialization APIs, such as `app.notifySuccess()` or `app.notifyFailure()`, are needed or expected. Essentially, the flow is:

- The IFrame is created and page loaded.
- The app calls `app.initialize()`.
- No further calls are required.

The following state diagram shows the behavior of an app that is intended to load immediately, without display of a loading indicator.

:::image type="content" source="../../assets/images/tabs/app-initialization-immediate-flow.png" alt-text="State diagram showing the initialization flow for an app that loads immediately.":::

For apps that don't require time for loading the process is straight forward, the app calls `app.initialize()` and is fully loaded.

### Loading screen flow

When an app has the `showLoadingIndicator` flag set to **true** in the [app manifest](../../resources/schema/manifest-schema.md) the app is expected to use a loading screen while necessary tasks take place, informing the library through the other app initialization APIs as it progresses through loading operations. Essentially, the flow is:

- The IFrame is created and page loaded.
- The app calls `app.initialize()`.
- Once ready the app calls `app.notifyAppLoaded()`.
- Depending on the results, the app calls app.`notifySuccess()`, `app.notifyFailure()`, or `app.notifyExpectedFailure()` as appropriate.

The following state diagram shows the behavior of an app that is intended to load with a loading indicator. Unlike an app that loads immediately after `app.initialize()`, apps that use the loading indicator must call other APIs to inform the system of the apps progress.

:::image type="content" source="../../assets/images/tabs/app-initialization-loading-indicator-flow.png" alt-text="State diagram showing the initialization flow for an app that requires a loading indicator.":::

For apps that need time to load the most common path is to call `app.initialize()` and then either `app.notifySuccess()` or `app.notifyExpectedFailure()` to complete loading. That said, an app can alternately call `app.notifyAppLoaded()` after `app.initialize()` to remove the spinner while still loading.

### Recommended app initialization behavior

It's important to understand that since the state diagrams for either flow are a directed graph, and each state triggering a state change is idempotent, any legal path in the graph is valid. For example should an app encounter an error while running, the following behavior is valid.

- The app calls `app.initialize()` to enter the **Loading** state.
- The app encounters an error and is reinitialized by calling `app.initialize()` again.
- The app calls `app.notifySuccess()` to reach the **Loaded** state.

> [!NOTE]
> While multiple calls to `app.initialize()` are valid, we don't recommend making an excessive number before calling `app.notifySuccess()` as there is a chance of failure.

## Related content

- [Create a content page](create-tab-pages/content-page.md)
- [TeamsJS reference](/javascript/api/@microsoft/teams-js/)
