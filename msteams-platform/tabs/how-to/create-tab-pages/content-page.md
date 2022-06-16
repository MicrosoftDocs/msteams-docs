---
title: Create a content page
author: surbhigupta
description: how to create a content page
keywords: teams tabs group channel configurable static
ms.localizationpriority: medium
ms.topic: conceptual
ms.author: lajanuar
---

# Create a content page for your tab

A content page is a webpage that is rendered within the Teams client, which is a part of:

* A personal-scoped custom tab: In this case, the content page is the first page the user encounters.
* A channel or group custom tab: The content page is displayed after the user pins and configures the tab in the appropriate context.
* A [task module](~/task-modules-and-cards/what-are-task-modules.md): You can create a content page and embed it as a webview inside a task module. The page is rendered inside the modal pop-up.

This article is specific to using content pages as tabs; however most of the guidance here applies regardless of how the content page is presented to the user.

[!INCLUDE [sdk-include](~/includes/sdk-include.md)]

## Tab content and design guidelines

Your tab's overall objective is to provide access to the meaningful and engaging content that has a practical value and an evident purpose. 

You need to focus on making your tab design clean, navigation intuitive, and content immersive.For more information, see [tab design guidelines](~/tabs/design/tabs.md) and [Microsoft Teams store validation guidelines](~/concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md).

## Integrate your code with Teams

For your page to display in Teams, you must include the [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true) and include a call to `app.initialize()` after your page loads.

The following code provides an example of how your page and the Teams client communicate:

# [TeamsJS v2](#tab/teamsjs-v2)

```html
<!DOCTYPE html>
<html>
<head>
...
    <script src= 'https://statics.teams.cdn.office.net/sdk/v2.0.0/js/MicrosoftTeams.min.js'></script>
...
</head>

<body>
...
    <script>
    app.initialize();
    </script>
...
</body>
```

# [TeamsJS v1](#tab/teamsjs-v1)

```html
<!DOCTYPE html>
<html>
<head>
...
    <script src= 'https://statics.teams.cdn.office.net/sdk/v1.10.0/js/MicrosoftTeams.min.js'></script>
...
</head>

<body>
...
    <script>
    microsoftTeams.initialize();
    </script>
...
</body>
```

***

## Access additional content

You can access additional content by using the SDK to interact with Teams, creating deep links, using task modules, and verifying if URL domains are included in the `validDomains` array.

### Use the SDK to interact with Teams

The [Teams client JavaScript SDK](~/tabs/how-to/using-teams-client-sdk.md) provides many additional functions that you can find useful while developing your content page.

### Deep links

You can create deep links to entities in Teams. They're used to create links that navigate to content and information within your tab. For more information, see [create deep links to content and features in Teams](~/concepts/build-and-test/deep-links.md).

### Task modules

A task module is a modal pop-up experience that you can trigger from your tab. In a content page, use task modules to present forms for gathering additional information, displaying the details of an item in a list, or presenting the user with additional information. The task modules themselves can be additional content pages, or created completely using Adaptive Cards. For more information, see [using task modules in tabs](~/task-modules-and-cards/task-modules/task-modules-tabs.md).

### Valid domains

Ensure that all URL domains used in your tabs are included in the `validDomains` array in your [manifest](~/concepts/build-and-test/apps-package.md). For more information, see [validDomains](~/resources/schema/manifest-schema.md#validdomains) in the manifest schema reference.

> [!NOTE]
> The core functionality of your tab exists within Teams and not outside of Teams.

## Show a native loading indicator

Starting with [manifest schema v1.7](../../../resources/schema/manifest-schema.md), you can provide a [native loading indicator](../../../resources/schema/manifest-schema.md#showloadingindicator). For example, [tab content page](#integrate-your-code-with-teams), [configuration page](configuration-page.md), [removal page](removal-page.md), and [task modules in tabs](../../../task-modules-and-cards/task-modules/task-modules-tabs.md).

> [!NOTE]
>
> * The behavior on mobile clients isn't configurable through the native loading indicator property. Mobile clients show this indicator by default across content pages and iframe-based task modules. This indicator on mobile is shown when a request is made to fetch content and gets dismissed as soon as the request gets completed.

If you indicate `showLoadingIndicator : true`  in your app manifest, then all tab configuration, content, removal pages, and all iframe-based task modules must follow these steps:

To show the loading indicator:

1. Add `"showLoadingIndicator": true` to your manifest.
1. Call `app.initialize();`.
1. As a **mandatory** step, call `app.notifySuccess()` to notify Teams that your app has successfully loaded. Then, Teams hides the loading indicator, if applicable. If `notifySuccess`  is not called within 30 seconds, Teams assumes that your app timed out, and displays an error screen with a retry option.
1. **Optionally**, if you're ready to print to the screen and wish to lazy load the rest of your application's content, you can hide the loading indicator manually by calling `app.notifyAppLoaded();`.
1. If your application doesn't load, you can call `app.notifyFailure({reason: app.FailedReason.Timeout, message: "failure message"});` to let Teams know about the failure and, optionally, provide a failure message. An error screen is shown to the user. The following code shows the enumeration that defines the possible reasons you can indicate for the application's failure to load:

    ```typescript
    /* List of failure reasons */
    export const enum FailedReason {
        AuthFailed = "AuthFailed",
        Timeout = "Timeout",
        Other = "Other"
    }
    ```

## Next step

> [!div class="nextstepaction"]
> [Create a configuration page](~/tabs/how-to/create-tab-pages/configuration-page.md)

## See also

* [Teams tabs](~/tabs/what-are-tabs.md)
* [Create a personal tab](~/tabs/how-to/create-personal-tab.md)
* [Tabs link unfurling and Stage View](~/tabs/tabs-link-unfurling.md)
* [Create a configuration page](~/tabs/how-to/create-tab-pages/configuration-page.md)
* [DevTools for Microsoft Teams tabs](~/tabs/how-to/developer-tools.md)
