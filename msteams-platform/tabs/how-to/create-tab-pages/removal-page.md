---
title: Create a tab removal page
author: surbhigupta
description: Learn to enable your tab to be reconfigured after installation. Extend user experience by supporting removal and modification options in Microsoft Teams app.
ms.localizationpriority: high
ms.topic: conceptual
ms.author: lajanuar
---
# Create a removal page

You can extend and enhance the user experience by supporting removal and modification options in your app. Teams enables users to rename or remove a channel or group tab and you can permit users to reconfigure your tab after installation. Additionally, the tab removal experience provides the users with post-removal options to delete or archive content.

[!INCLUDE [sdk-include](~/includes/sdk-include.md)]

## Enable your tab to be reconfigured after installation

Your `manifest.json` defines your tab's features and capabilities. The tab instance `canUpdateConfiguration` property takes a Boolean value that indicates whether a user can modify or reconfigure the tab after it's created. The following table provides the property details:

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`canUpdateConfiguration`|Boolean|||A value indicating whether an instance of the tab's configuration can be updated by the user after creation. Default is `true`. |

When your tab is uploaded to a channel or group chat, Teams adds a right-click drop-down menu for your tab. The available options are determined by the `canUpdateConfiguration` setting. The following table provides the setting details:

| `canUpdateConfiguration`| true   | false | description |
| ----------------------- | :----: | ----- | ----------- |
|     Settings            |   √    |       |The `configurationUrl` page is reloaded in an iFrame allowing the user to reconfigure the tab. |
|     Rename              |   √    |   √   | The user can change the tab name as it appears in the tab bar.          |
|     Remove              |   √    |   √   |  If the  `removeURL` property and value are included in the **configuration page**, the **removal page** is loaded into an iFrame and presented to the user. If a removal page isn't included, the user is presented with a confirm dialog box.          |

## Create a tab removal page for your application

The optional removal page is an HTML page that you host and is displayed when the tab is removed. The removal page URL is designated by the `setConfig()` method (or `setSettings()` prior to TeamsJS v.2.0.0) within your configuration page. As with all pages in your app, the removal page must comply with [Teams tab prerequisites](../../../tabs/how-to/tab-requirements.md).

### Register a remove handler

Optionally, within your removal page logic, you can invoke the `registerOnRemoveHandler((RemoveEvent) => {}` event handler when the user removes an existing tab configuration. The method takes in the [`RemoveEvent`](/javascript/api/@microsoft/teams-js/pages.config.removeevent?view=msteams-client-js-latest&preserve-view=true) interface and executes the code in the handler when a user attempts to remove content. The method is used to perform clean up operations such as removing the underlying resource powering the tab content. At a time only one, remove handler can be registered.

The `RemoveEvent` interface describes an object with two methods:

* The `notifySuccess()` function is required. It indicates that the removal of the underlying resource succeeded and its content can be removed.

* The `notifyFailure(string)` function is optional. It indicates that removal of the underlying resource failed and its content can't be removed. The optional string parameter specifies a reason for the failure. If provided, this string is displayed to the user; else a generic error is displayed.

#### Use the `getConfig()` function

You can use `getConfig()` (formerly `getSettings()`) to assign the tab content to be removed. The `getConfig()` function returns a promise that resolves with the Config object and provides the valid settings property values that can be retrieved.

#### Use the `getContext()` function

You can use `getContext()` to get the current context in which the frame is running. The `getContext()` function returns a promise that will resolve with the Context object. The Context object provides valid `Context` property values that you can use in your removal page logic to determine the content to display in the removal page.

#### Include authentication

Authentication is required before allowing a user to delete the tab content. Context information can be used to help construct authentication requests and authorization page URLs. See [Microsoft Teams authentication flow for tabs](~/tabs/how-to/authentication/auth-flow-tab.md). Make sure that all domains used in your tab pages are listed in the `validDomains` array of your app manifest.

The following is a sample tab removal code block:

# [TeamsJS v2](#tab/teamsjs-v2)

```html
<body>
  <button onclick="onClick()">Delete this tab and all underlying data?</button>
  <script>
    await microsoftTeams.app.initialize();
    pages.config.registerOnRemoveHandler((removeEvent) => {
      // Here you can designate the tab content to be removed and/or archived.
        const configPromise = pages.getConfig();
        configPromise.
            then((configuration) => {
                configuration.contentUrl = "...";
                removeEvent.notifySuccess()}).
            catch((error) => {removeEvent.notifyFailure("failure message")});
    });

    const onClick() => {
        pages.config.setValidityState(true);
    }
  </script>
</body>
```

# [TeamsJS v1](#tab/teamsjs-v1)

```html
<body>
  <button onclick="onClick()">Delete this tab and all underlying data?</button>
  <script>
    microsoftTeams.initialize();
    microsoftTeams.settings.registerOnRemoveHandler((removeEvent) => {
      // Here you can designate the tab content to be removed and/or archived.
        microsoftTeams.settings.getSettings((settings) => {
        settings.contentUrl = "..."
        });
        removeEvent.notifySuccess();
    });

    const onClick() => {
        microsoftTeams.settings.setValidityState(true);
    }
  </script>
</body>
```

***

When a user selects **Remove** from the tab's drop-down menu, Teams loads the optional `removeUrl` page assigned in your **configuration page**, into an iFrame. The user is shown a button loaded with the `onClick()` function that calls `pages.config.setValidityState(true)` and enables the **Remove** button shown at the bottom of the removal page iFrame.

After the remove handler is executed, `removeEvent.notifySuccess()` or `removeEvent.notifyFailure()` notifies Teams of the content removal outcome.

>[!NOTE]
>
> * To ensure that an authorized user's control over a tab is not inhibited, Teams removes the tab in both success and failure cases.
> * After you invoke the `registerOnRemoveHandler` event handler, you'll have 15 seconds to respond to the method. By default, Teams enables the **Remove** button after five seconds even if you don't call `setValidityState(true)`. After the **Remove** button is enabled, to ensure that users aren't blocked from deleting a tab, the app isn't allowed to disable the **Remove** button by calling `setValidityState(false)`.
> * When the user selects **Remove**, Teams removes the tab after 30 seconds regardless of whether the actions have been completed or not.

## Next step

> [!div class="nextstepaction"]
> [Tabs on mobile](~/tabs/design/tabs-mobile.md)

## See also

* [Build tabs for Teams](../../what-are-tabs.md)
* [App manifest schema for Teams](../../../resources/schema/manifest-schema.md)
* [RemoveEvent interface](/javascript/api/@microsoft/teams-js/pages.config.removeevent)
* [Get context for your tab](../access-teams-context.md)
* [Create a personal tab](../create-personal-tab.md)
* [Create a channel tab or group tab](../create-channel-group-tab.md)
