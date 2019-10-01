---
title: Create a configuration page for your tab
description: Describes how to create and use a configuration page in a tab
keywords: teams tabs configuration
---

# Create the configuration page for your Microsoft Teams configurable tab

> [!Important]
> Full support for tabs on mobile clients is coming soon. To prepare for this change you should follow the [guidance for tabs on mobile](~/resources/design/framework/tabs-mobile.md) when creating your tabs. Personal apps (static tabs) are currently available in [developer preview](~/resources/dev-preview/developer-preview-intro.md). and channel / group chat tabs are available in the `...` overflow menu for the tab.
>
> When full support for tabs is released:
>
> * All tabs will always be available on mobile
> * Your `contentUrl` **will be loaded in the mobile Teams client**.
> * For channel/group tabs, users can still open your tab in a separate browser via your `websiteUrl`, however your `contentUrl` will be loaded first.
> * If your tab uses authentication, you must upgrade your Teams JavaScript SDK to version 1.4.1 or later, or authentication will fail.

The configuration page is an HTML page that you host. When a user chooses to add or update your tab, Microsoft Teams will load the `configurationUrl` (that you [specify in your manifest](~/concepts/apps/apps-package.md)) within an iframe inside the **Add Tab** dialog.

In this page you present options and gather information from the user about what they want in your tab. For example, you may let the user select existing app resources (such as files or task lists) or create new resources just for this tab.

You must include the [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client) in your configuration page so that it can communicate with Microsoft Teams.

> [!NOTE]
> This simple example is to illustrate the concepts; your configuration page should have a clean UI that fits the style of the Microsoft Teams dialog box. Additional style guidance for tabs can be found [here](~/resources/design/framework/tabs.md).

![Screenshot of the configuration page for a simple example app, giving the user the option of which map type to select.](~/assets/images/tab_configui.png)

## Configuration page example

In this example the user is presented with two option buttons. Selecting either button fires `onClick()`, which sets `microsoftTeams.settings.setValidityState(true)`, enabling the **Save** button.

On save, the code sets the parameters of `microsoftTeams.settings.setSettings`. Finally, it calls `saveEvent.notifySuccess()` to indicate that the content URL has successfully been determined.

```HTML
<html>
<body>
<form>
  <input type="radio" name="maptype" value="bing" onclick="onClick()"> Bing Maps<br>
  <input type="radio" name="maptype" value="google" onclick="onClick()"> Google Maps
</form>

<script src="node_modules/@microsoft/teams-js@1.4.1/dist/MicrosoftTeams.min.js"></script>

<script type="text/javascript">  

microsoftTeams.initialize();
microsoftTeams.settings.registerOnSaveHandler(function(saveEvent){

    var radios = document.getElementsByName("maptype");
    if (radios[0].checked) {
       microsoftTeams.settings.setSettings({
         entityId: "bing",
         contentUrl: "https://www.bing.com/maps/embed",
         suggestedDisplayName: "Bing Map",
         websiteUrl: "https://www.bing.com/maps",
         removeUrl: "https://teams-get-started-sample.azurewebsites.net/tabremove.html",
      });
    } else {
       microsoftTeams.settings.setSettings({
         entityId: "google",
         contentUrl: "https://www.google.com/maps/embed",
         suggestedDisplayName: "Google Map",
         websiteUrl: "https://www.google.com/maps",
         removeUrl: "https://teams-get-started-sample.azurewebsites.net/tabremove.html",
      });
    }

    saveEvent.notifySuccess();
});

function onClick() {
    microsoftTeams.settings.setValidityState(true);
}

</script>
</body>
</html>
```

## Prerequisites for your configuration page

For your configuration page to display within Microsoft Teams, you must host your page on a secure HTTPS endpoint, ensure that your page allows display in an iframe, include the Microsoft Teams JavaScript client SDK, and call `microsoftTeams.initialize()`.

See the [requirements for tab pages](~/resources/general/requirements.md) article for complete details.

## Collecting user information

Your configuration page needs to perform the following steps:

### Obtain context and authenticate

If your page requires context about the user or environment, see [Get context for your Microsoft Teams tab](~/concepts/tabs/tabs-context.md). If it needs to authenticate the user, see [Authenticate a user in your Microsoft Teams tab](~/concepts/authentication/authentication.md).

### Determine when the user has specified all required information

By default, the **Save** button on the configuration dialog box is disabled. When the user has selected or entered all the required information for your app, you can enable the **Save** button by calling `microsoftTeams.settings.setValidityState(true)`.

### Determine the content to display in the tab

Use `microsoftTeams.settings.setSettings({entityId, contentUrl, suggestedDisplayName, websiteUrl, removeUrl})` to specify the URL of the [content page](~/concepts/tabs/tabs-content.md) Microsoft Teams should host. Things to keep in mind:

* This call can be made at any time the configuration page is displayed, including before or after the user selects the **Save** button (see next section).
* The `entityId` uniquely identifies the entity that is displayed in the tab.
  * Microsoft Teams uses this when creating [deep links to your tab](~/concepts/deep-links.md).
  * You can also use it to help obtain context when [displaying your content page](~/concepts/tabs/tabs-content.md) or when [updating or removing a tab](~/concepts/tabs/tabs-update-remove.md).
  * The `entityId` field can be the same value as the `contentUrl`.
* The `contentUrl` is a required field that specifies the URL of the content Microsoft Teams should host in the tab.
  * Be sure you have added the `contentUrl` domain to the `validDomains` element in the tab manifest file. For more information, see [Microsoft Teams tab schema](~/resources/schema/manifest-schema.md) and [Redirecting across domains within a Microsoft Teams tab](~/concepts/tabs/cross-domain.md).
* The other parameters further customize how your tab works in Microsoft Teams:
  * The optional `suggestedDisplayName` parameter sets the initial tab name. Users can rename the tab. The default value is the name specified in the manifest.
  * The optional `websiteUrl` parameter sets where the user is taken if they choose the **Go to website** button. Typically, this is a link to the same content as displayed on the tab, but within your main web app with its regular chrome and navigation.
  * The optional `removeUrl` parameter sets the URL for your [removal options page](~/concepts/tabs/tabs-update-remove.md#removing-a-tab).

### React when the user chooses the Save button

Often you might not be able to determine the `entityId` or `contentUrl` immediately. For example, you might first need to create a resource (a document or a task), and you want to do this only after the user selects **Save**. To be notified when the user selects **Save**, you must call `microsoftTeams.settings.registerOnSaveHandler(function(saveEvent) { /* ... */ })`. After this is done, when the user selects **Save**, Microsoft Teams calls the save event handler you registered.

You can return the settings asynchronously if necessary. To do this, store `saveEvent` for later. If you do not notify the outcome within 30 seconds, Microsoft Teams terminates the operation and displays an error.

### Return success or failure result

In your save handler you should call `saveEvent.notifySuccess()` or `saveEvent.notifyFailure()` to inform Microsoft Teams on the outcome of the configuration. If you have no save handler registered, the outcome will immediately and implicitly be success.

>Hitting problems? See the [troubleshooting guide](~/troubleshoot/troubleshoot.md).
