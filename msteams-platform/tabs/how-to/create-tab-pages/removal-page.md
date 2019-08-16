---
title: Create a tab removal page
author: laujan
description: How to create a tab removal page
keywords: teams tabs group channel configurable remove delete
ms.topic: conceptual
ms.author: 
---

# Modify or remove a channel group tab

You can further extend and enhance the user experience by supporting removal and modification options in your app. Teams enables users to rename or remove a channel/group tab and you can permit users to reconfigure your tab after installation. Additionally, your tab removal experience can include designating what happens to the content when your tab is removed or giving users post-removal options such as deleting or archiving the content.

## Enable your tab to be reconfigured after installation

Your `manifest.json` defines your tab's features and capabilities. The tab instance `canUpdateConfiguration` property takes a Boolean value that indicates whether a user can modify or reconfigure the tab after it is created:

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`canUpdateConfiguration`|Boolean|||A value indicating whether an instance of the tab's configuration can be updated by the user after creation. Default: `true`|

When your tab is uploaded to a channel or group chat, Teams will add a right-click menu for your tab. The available options are determined by the `canUpdateConfiguration` setting in your **manifest.json**:

| `canUpdateConfiguration`| true   | false | description |
| ----------------------- | :----: | ----- | ----------- |
|     Settings            |   √    |       |The **manifest** `configurationUrl` page is reloaded in an IFrame allowing the user to reconfigure the tab.  |
|     Rename              |   √    |   √   | The user can change the tab name as it appears in the tab bar.          |
|     Remove              |   √    |   √   |  If the  `removeURL` property and value are included in the **configuration page**, the **removal page** is loaded into an IFrame and presented to the user. If a removal page is not included the user is presented with a confirm pop-up window.          |
|||||

## Create a tab removal page for your application

The optional removal page is an HTML page that you host and is displayed when the tab is removed. The removal page URL is designated by the `setSettings()` method within your configuration page. As with all pages in your app, the removal page must comply with [Teams tab requirements](~/platform/tabs/how-to/extend-app-with-tab.md).

### Register a remove handler

Within your removal page logic, optionally you can  execute an event handler when the user removes an existing tab configuration. The `registerOnRemoveHandler((RemoveEvent) => {}` takes in the [`RemoveEvent`](~javascript/api/@microsoft/teams-js/microsoftteams.settings.removeevent?view=msteams-client-js-latest.md) interface and executes the code in the handler when a user attempts to remove content. It is used to perform cleanup operations such as removing the underlying resource powering the tab content. Only one handler may be registered at a time.

The `RemoveEvent` interface describes an object with two methods:

* The `notifySuccess()` function is required and indicates that the removal of the underlying resource succeeded and the content can be removed.
* The `notifyFailure(string)` function is optional and indicates that removal of the underlying resource failed and the content cannot be removed. The optional string parameter specifies a reason for the failure. If provided, this string is displayed to the user; otherwise a generic error is displayed:

#### Use the `getSettings()` function

You can use `getSettings()`to determine the tab content to be removed. The `getSettings((Settings) =>{})` function takes in the [`Settings interface`](~/javascript/api/@microsoft/teams-js/microsoftteams.settings.settings?view=msteams-client-js-latest) and provides the valid settings properties that can be retrieved.

#### Use the `getContext()` function

The `getContext((Context) =>{})` function takes in the [`Context interface`](~/javascript/api/@microsoft/teams-js/microsoftteams.context?view=msteams-client-js-latest) and retrieves the current context in which the frame is running. You can use valid `Context` property values in your removal page logic to determine the content to display in the removal page.

#### Include authentication methods

You might require authentication before allowing a user to delete your tab content. See [Authenticate a user in a Microsoft Teams tab](foo.md) Context information can be used to help construct authentication requests and authorization page URLs. See [Microsoft Teams authentication flow for tabs](foo.md). Make sure that all domains used in your tab pages are listed in the `manifest.json` `validDomains` array.

Below is a brief sample tab removal code block:

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

When a user selects **Remove** from the tab's drop-down menu, Teams will load the optional `removalUrl` page into an IFrame. Here, the user is presented with a button loaded with the `onClick()` function that calls `microsoftTeams.settings.setValidityState(true)` and enables the **Remove** button located near the bottom of the removal page IFrame.

Following the execution of the remove handler, `removeEvent.notifySuccess()` or `removeEvent.notifyFailure()` notifies Teams of the removal outcome.

>[!NOTE]
>To ensure that an authorized user's control over a tab is not inhibited, Teams will remove the tab in both success and failure cases.\
>Teams enables the **Remove** button after 5 seconds, even if your tab hasn't called `setValidityState()`.\
>When the user selects **Remove** Teams removes the tab after 30 seconds regardless of whether your actions have completed.



Ready to get started building? Here are a few guidelines:

### Node.js

* [Quickstart: Create a custom personal tab with Node.js and the Yeoman Generator for Microsoft Teams](foo.md)
* [Quickstart: Create a custom channel and group tab with Node.js and the Yeoman Generator for Microsoft Teams](foo.md)

### .NET

* [Quickstart: Create a Custom Personal Tab with ASP.NET Core](foo.md)
* [Quickstart: Create a Custom Personal Tab with ASP. NET Core MVC](foo.md)
* [Quickstart: Create a Custom Channel and Group Tab with ASP.NET Core](foo.md)
* [Quickstart: Create a Custom Channel and Group Tab with ASP.NET Core MVC](foo.md)