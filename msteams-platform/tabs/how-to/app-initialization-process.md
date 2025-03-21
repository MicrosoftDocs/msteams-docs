---
title: App Initialization Process for Tab Apps
description: Learn about the app initialization process, including the APIs involved and recommendations for their use in code.
author: mosdevdocs
ms.author: joshuapa
ms.service: msteams
ms.topic: concept-article #Required; leave this attribute/value as-is.
ms.date: 03/16/2025

#CustomerIntent: As a developer, I want to understand how the app initialization process works for tab apps so that my app can make the appropriate API calls and work as recommended.
---

# App initialization process

App initialization is a foundational aspect of authoring a tab app and ensures that apps work as expected. All apps created for Microsoft Teams that use TeamsJS must be initialized. The process of app initialization is a finite state machine and it uses a number of APIs with specific roles to advance and monitor the event flow. The following sections will:

- Review the APIs for app initialization and their role
- Discuss the types of app initialization flows
- Show and explain the state changes during app initialization
- Provide recommendations for app initializaton

## APIs for app initialization

There are a number of key APIs within the [Teams JavaScript client library](using-teams-client-library.md) (TeamsJS) used during the app initialization process. While their specific use during initialization is discussed in later sections, at a high level they are:

- [app.initialize()](/javascript/api/@microsoft/teams-js/app#@microsoft-teams-js-app-initialize) - Initializes the TeamsJS library. It must be called by an app and complete successfully prior to any other library calls being made.
- [app.notifyApploaded()](/javascript/api/@microsoft/teams-js/app#@microsoft-teams-js-app-notifyapploaded) - Notifies the frame that the app has partially loaded and that the loading indicator can be hidden if one was shown.
- [app.notifySuccess()](/javascript/api/@microsoft/teams-js/app#@microsoft-teams-js-app-notifysuccess) - Notifies the frame that the app is fully loaded and was successfully iniitialized. It is now ready for user interaction.
- [app.notifyFailure()](/javascript/api/@microsoft/teams-js/app#@microsoft-teams-js-app-notifyfailure) - Notifies the frame that app initialization has failed during loading and to show an error page in its place.
- [app.notifyExpectedFailure()](https://learn.microsoft.com/en-us/javascript/api/@microsoft/teams-js/app#@microsoft-teams-js-app-notifyexpectedfailure) - Notifies the frame that the app initialized with some expected errors, but can be considered loaded successfully.

> [!IMPORTANT]
> All of the initialization functions lised are idempotent, meaning that no matter how many times they are called with the same input, the result will always be the same and the system's state will be unchanged after the first call. For example, when the app.initialize() function is called regardless of whether it's been previously called, it will always (when successfully returned) reset the app to the loading state.

### App caching APIs

Within TeamsJS there are also APIs that support the caching of resources to improve the subsequent launch times of apps. These APIs allow developers to keep some resources and assets in memory so that they can be use when rehydrating their apps. For additional details, see [App caching for your tab app](app-caching.md).

## Types of app initialization flows

There are two flows that apps can follow for initialization depending upon their needs. For apps that require extra time during loading, there is a way to display a loading indicator and notify the system as the app progresses through it's necessary loading behaviors. For apps that don't require a loading indicator and are able to begin running immediatley there is a simpler flow available.

It is up to you to choose and define which flow the app follows. We recommend that apps follow the most common valid paths outlined in the state diagram as closely as possible.

> [!NOTE]
> If the app uses caching, it enters a *cached/suspended* state, where it's not impacted by API calls until it resumes. Upon resume the app must call `app.notifySuccess()` to complete loading.

### Immediate loading flow

When an app has the `showLoadingIndicator` flag set to **false**, or not set at all, in the [app manifest](../../resources/schema/manifest-schema.md) the app is expected to be initialized immediatley after the call to `app.initialize()`. No calls to other initialization APIs, such as `app.notifySuccess()` or `app.notifyFailure()`, are needed or expected. Essentially, the flow is:

- The IFrame is created and page loaded.
- The app calls `app.initialize()`.
- No further calls are required.

The following state diagram shows the behavior of an app that is intended to load immediatley, without display of a loading indicator.

:::image type="content" source="../../assets/images/tabs/app-initialization-immediate-flow.png" alt-text="State diagram showing the initialization flow for an app that loads immediatley.":::

For apps that don't require time for loading the process is straight forward, the app calls `app.initialize()` and it's fully loaded.

### Loading screen flow

When an app has the `showLoadingIndicator` flag set to **true** in the [app manifest](../../resources/schema/manifest-schema.md) the app is expected to use a loading screen while necessary tasks take place, informing the library through the other app initialization APIs as it progresses through loading operations. Essentially, the flow is:

- The IFrame is created and page loaded.
- The app calls `app.initialize()`.
- Once ready the app calls `app.notifyAppLoaded()`.
- Depending on the results, the app calls app.`notifySuccess()`, `app.notifyFailure()`, or `app.notifyExpectedFailure()` as appropriate.

The following state diagram shows the behavior of an app this is intended to load with a loading indicator and that must call additional APIs to inform the system of the apps progress.

:::image type="content" source="../../assets/images/tabs/app-initialization-loading-indicator-flow.png" alt-text="State diagram showing the initialization flow for an app that requires a loading indicator.":::

For apps that need time to load the most common path is to call `app.initialize()` and then either `app.notifySuccess()` or `app.notifyExpectedFailure()` to complete loading. That said, an app can alernately call `app.notifyAppLoaded()` after `app.initialize()` to remove the spinner while still loading.

### Recommended app initialization behavior

It's important to understand that since the state diagrams for either flow is a directed graph, and each state triggering a state change is idempotent, any legal path in the graph is valid. For example should an app encounter an error while running, the following behavior is valid.

- The app calls `app.initialize()` to enter the **Loading** state.
- The app encounters an error and is reinitialized by calling `app.initialize()` again.
- The app calls `app.notifySuccess()` to reach the **Loaded** state.

> [!NOTE]
> While multiple calls to `app.initialize()` are valid, we don't recommend making an excessive number prior to calling `app.notifySuccess()` as there is a chance of failure.

## Related content

- [Create a content page](create-tab-pages/content-page.md)
- [TeamsJS reference](/javascript/api/@microsoft/teams-js/)
