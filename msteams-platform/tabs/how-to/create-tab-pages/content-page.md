---
title: Create a content page
description: Learn about webpage within Teams client, and is part of personal, channel, or group custom tab. Create content page and embed it as webview inside dialog (task module).
ms.localizationpriority: high
ms.topic: conceptual
ms.date: 11/23/2022
---

# Create a content page

Content page is the base level webpage that is rendered within Microsoft Teams client where a developer can add the content of a tab. It allows you to seamlessly integrate your web content within the Teams client, creating a more immersive and engaging environment for users. For instance, you can use content pages to display custom data, integrate third-party services, or create a more personalized user experience. A content page is necessary to create any of the following tabs:

* A personal-scoped custom tab: In this case, the content page is the first page the user encounters.
* A channel or group custom tab: The content page is displayed after the user pins and configures the tab in the appropriate context.
* A [dialog](~/task-modules-and-cards/what-are-task-modules.md): You can create a content page and embed it as a webview inside a dialog (referred as task module in TeamsJS v1.x). The page is rendered inside the modal pop-up.

If you need to add your tab within a channel or group, or personal scope, present an HTML content page in your tab. For static tabs, the content URL is set directly in your [app manifest](../../../resources/schema/manifest-schema.md#statictabs).

This article is specific to using content pages as tabs; however, most of the guidance here applies regardless of how the content page is presented to the user.

[!INCLUDE [sdk-include](~/includes/sdk-include.md)]

## Tab content and design guidelines

Your tab's overall objective is to provide access to meaningful and engaging content that has a practical value and a clear purpose.

You need to focus on making your tab design clean, navigation intuitive, and content immersive. For more information, see [tab design guidelines](~/tabs/design/tabs.md) and [Microsoft Teams Store validation guidelines](~/concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md).

## Integrate your code with Teams

To display your page in Teams, you'll need to include the [Microsoft Teams JavaScript client library (TeamsJS)](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true) in your code and call `app.initialize()` after your page loads.

> [!NOTE]
> It takes close to 24-48 hours for any content or UI changes to reflect in the tab app due to cache.

The following code is an example of how your page and the Teams client communicate:

# [TeamsJS v2](#tab/teamsjs-v2)

```html
<!DOCTYPE html>
<html>
<head>
...
    <script src="https://res.cdn.office.net/teams-js/2.2.0/js/MicrosoftTeams.min.js" 
      integrity="sha384yBjE++eHeBPzIg+IKl9OHFqMbSdrzY2S/LW3qeitc5vqXewEYRWegByWzBN/chRh" 
      crossorigin="anonymous" >
    </script>
    <script>
    // Initialize the library
    await microsoftTeams.app.initialize();
    </script>
</head>
<body>
...<h1>Personal Tab</h1>
  <p><img src="/assets/icon.png"></p>
  <p>This is your personal tab!</p>
</body>
</html>
```

# [TeamsJS v1](#tab/teamsjs-v1)

```html
<!DOCTYPE html>
<html>
<head>
...
    <script src="https://res.cdn.office.net/teams-js/2.2.0/js/MicrosoftTeams.min.js" 
      integrity="sha384yBjE++eHeBPzIg+IKl9OHFqMbSdrzY2S/LW3qeitc5vqXewEYRWegByWzBN/chRh" 
      crossorigin="anonymous" >
    </script>
    <script>
    // Initialize the library
    microsoftTeams.initialize();
    </script>
</head>
<body>
...<h1>Personal Tab</h1>
  <p><img src="/assets/icon.png"></p>
  <p>This is your personal tab!</p>
</body>
</html>
```

***

For more information on how to create and add a content page to a personal tab, see [add a content page to personal tab](../create-personal-tab.md#add-a-content-page-to-the-static-tab).

The following images show the configuration of an HTML content page and the output of content page in tab:

**Content page configuration**

:::image type="content" source="~/assets/images/tab-images/content-page-html.png" alt-text="Screenshot shows the html content page in visual studio." lightbox="~/assets/images/tab-images/content-page-html.png":::

**Output in web**

:::image type="content" source="~/assets/images/tab-images/personal-tab-web.png" alt-text="Screenshot shows the output of content page in web.":::

**Output in tab**

:::image type="content" source="~/assets/images/tab-images/personal-tab-in-teams.png" alt-text="Screenshot shows the output of content page in teams tab.":::

## Access additional content

You can access additional content by using TeamsJS to interact with Teams, creating deep links, using dialogs, and verifying if URL domains are included in the `validDomains` array.

* **Use TeamsJS to interact with Teams**: The [Microsoft Teams JavaScript client library](~/tabs/how-to/using-teams-client-library.md) provides many more functions that you can find useful while developing your content page.

* **Deep links**: You can create deep links to entities in Teams. They're used to create links that navigate to content and information within your tab. For more information, see [create deep links to content and features in Teams](~/concepts/build-and-test/deep-links.md).

* **Dialogs**: A dialog is a modal pop-up experience that you can trigger from your tab. Use dialogs in a content page to present forms for gathering additional information, displaying the details of an item in a list, or presenting the user with additional information. The dialogs themselves can be additional content pages or created completely using Adaptive Cards. For more information, see [using dialogs in tabs](~/task-modules-and-cards/task-modules/task-modules-tabs.md).

* **Valid domains**: Ensure that all URL domains used in your tabs are included in the `validDomains` array in your [app manifest](~/concepts/build-and-test/apps-package.md). For more information, see [validDomains](~/resources/schema/manifest-schema.md#validdomains).

> [!NOTE]
> The core functionality of your tab exists within Teams and not outside of Teams.

## Show a native loading indicator

You can configure and show a native loading indicator to a tab. You can provide a [native loading indicator](../../../resources/schema/manifest-schema.md#showloadingindicator) starting with [manifest schema v1.7](../../../resources/schema/manifest-schema.md). For example, [tab content page](#integrate-your-code-with-teams), [configuration page](configuration-page.md), [removal page](removal-page.md), and [dialogs in tabs](../../../task-modules-and-cards/task-modules/task-modules-tabs.md).

> [!NOTE]
>
> The behavior on mobile clients isn't configurable through the native loading indicator property. Mobile clients show this indicator by default across content pages and iframe-based dialogs. This indicator on mobile is shown when a request is made to fetch content and gets dismissed as soon as the request gets completed.

If you indicate `showLoadingIndicator : true`  in your app manifest, then all tab configuration, content, removal pages, and all iframe-based dialogs must follow these steps:

Use the following steps to show the native loading indicator:

1. Add `"showLoadingIndicator": true` to your app manifest.

1. Call `app.initialize();`.

1. Call `app.notifySuccess()` in all iframe-based contents to notify Teams that your app has successfully loaded. If applicable, Teams hides the loading indicator. If `notifySuccess`  isn't called within 30 seconds, Teams assumes that your app has timed out, and displays an error screen with a retry option. For app updates, this step is applicable for already configured tabs. If you don't perform this step, an error screen is displayed for the existing users. *[Mandatory]*

1. If you're ready to print to the screen and wish to lazy load the rest of your application's content, you can hide the loading indicator manually by calling `app.notifyAppLoaded();`. *[Optional]*

1. If your application doesn't load, you can call `app.notifyFailure({reason: app.FailedReason.Timeout, message: "failure message"});` to let Teams know about the failure. The `message` property is currently not used, therefore the failure message doesn't appear in the UI, and a generic error screen appears to the user. The following code shows the enumeration that defines the possible reasons you can indicate for the application's failure to load:

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

* [Build tabs for Teams](../../what-are-tabs.md)
* [Create a personal tab](../create-personal-tab.md)
* [Create a channel tab or group tab](../create-channel-group-tab.md)
* [App manifest schema for Teams](../../../resources/schema/manifest-schema.md)
* [DevTools for Microsoft Teams tabs](~/tabs/how-to/developer-tools.md)
