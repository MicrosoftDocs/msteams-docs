---
title: Create a content page
author: laujan
description: how to create a content page
keywords: teams tabs group channel configurable static
ms.topic: conceptual
ms.author: lajanuar
---
# Create a content page for your tab

A content page is a webpage that is rendered within the Teams client. Typically these are part of:

| **Tab type** | **Description** |
|--------------|-----------------|
| A personal-scoped custom tab | In this instance the content page is the first page the user encounters. |
| A channel or group custom tab | After the user pins and configures the tab in the appropriate context, the content page is displayed. |
| A [task module](~/task-modules-and-cards/what-are-task-modules.md) | You can create a content page and embed it as a webview inside a task module. The page renders inside the modal popup. |

This article is specific to using content pages as tabs. The majority of the guidance here would apply regardless of how the content page is presented to the end-user.

## Tab content and style guidelines

Your tab's overall objective must provide access to meaningful and engaging content that has a practical value and an evident purpose. You must focus on minimizing clutter by making your tab design clean, navigation intuitive, and content immersive along with pleasing style.

## Integrate your code with Teams

To display your page in Teams, you must include the [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true) and include a call to `microsoftTeams.initialize()` after your page loads. That is how your page and the Teams client communicate:

```html
<!DOCTYPE html>
<html>
<head>
...
    <script src= 'https://statics.teams.cdn.office.net/sdk/v1.6.0/js/MicrosoftTeams.min.js'></script>
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

## Access additional content

### Use SDK to interact with Teams

The [Teams client JavaScript SDK](~/tabs/how-to/using-teams-client-sdk.md) provides many additional functions you may find useful while developing your content page.

### Deep links

You can create deep links to entities in Teams. These are used to create links that navigate to content and information within your tab. For more information, see [Create deep links to content and features in Microsoft Teams](~/concepts/build-and-test/deep-links.md).

### Task Modules

A task module is a modal popup-like experience that you can trigger from your tab. In a content page, you can navigate through multiple pages by using task modules to present forms for gathering additional information, displaying the details of an item in a list, or any other time you need to present the user with additional information. The task modules are additional content pages, or created completely using Adaptive Cards. For more information, see [Using task modules in tabs](~/task-modules-and-cards/task-modules/task-modules-tabs.md) for complete information.

### Valid Domains

Ensure that the all URL domains used in your tabs are included in the `validDomains` array in your [manifest](~/concepts/build-and-test/apps-package.md). For more information, see [validDomains](~/resources/schema/manifest-schema.md#validdomains) in the manifest schema reference. The core functionality of your tab exists within Teams and not outside of Teams.

## Reorder static personal tabs

Starting with manifest version 1.7, developers can rearrange all tabs in their personal app. In particular, a developer can move the *bot chat* tab, which always defaults to the first position anywhere in the personal app tab header. We have declared two reserved tab entityId keywords, *conversations* and *about*.

If you create a bot with a *personal* scope, it shows up in the first tab position in a personal app by default. If you wish to move it to another position, you must add a static tab object to your manifest with the reserved keyword *conversations*. The *conversation* tab appears on web or desktop based on where you add the *conversation* tab in the `staticTabs` array. 

```json
{
   "staticTabs":[
      {
         
      },
      {
         "entityId":"conversations",
         "scopes":[
            "personal"
         ]
      }
   ]
}
```

## Show a native loading indicator

Start with [manifest schema v1.7](../../../resources/schema/manifest-schema.md), you can provide a [native loading indicator](../../../resources/schema/manifest-schema.md#showloadingindicator) wherever your web content is loaded in Teams. For example; [tab content page](#integrate-your-code-with-teams), [configuration page](configuration-page.md), [removal page](removal-page.md) and [task modules in tabs](../../../task-modules-and-cards/task-modules/task-modules-tabs.md).

> [!NOTE]
> 1. The behavior on mobile clients is not configurable through this manifest property. Mobile clients show a native loading indicator by default across content pages and iframe-based task modules.
> 2. This indicator on mobile is shown when a request is made to fetch content and gets dismissed as soon as the request gets completed.
> 3. If you indicate  `"showLoadingIndicator : true`  in your app manifest, then all tab configuration, content, removal pages, and all iframe-based task modules must follow the mandatory protocol, below:


1. To show the loading indicator, add `"showLoadingIndicator": true` to your manifest. 
2. Remember to call `microsoftTeams.initialize();`.
3. **Optional**. When you are ready to print to your screen and want to delay the loading of the rest of your application's content, you can manually hide the loading indicator by calling `microsoftTeams.appInitialization.notifyAppLoaded();`
4. **Mandatory**. Call `microsoftTeams.appInitialization.notifySuccess()` to notify Teams that your app has successfully loaded. Teams hides the loading indicator if applicable. If `notifySuccess` is not called within 30 seconds, the application expires and an error screen is displayed with an option to retry.
5. If your application does not load, you can call `microsoftTeams.appInitialization.notifyFailure(reason);` to notify the Teams of an error. An error screen is displayed to the user:

```typescript
``
/* List of failure reasons */
export const enum FailedReason {
    AuthFailed = "AuthFailed",
    Timeout = "Timeout",
    Other = "Other"
}
```
>

## See also

- [Content and conversations, all at once using tabs](~/tabs/design/tabs.md)

- [Microsoft Teams app approval process guidance](~/concepts/deploy-and-publish/appsource/prepare/frequently-failed-cases.md)