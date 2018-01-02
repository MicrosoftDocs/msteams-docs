---
title: Create a configuration page for your tab
description: Describes how to create and use a configuration page in a tab
keywords: teams tabs configuration
---

# Create the configuration page for your Microsoft Teams configurable tab

The configuration page is an HTML page that you host. When a user chooses to add or update your tab, Microsoft Teams will load the `configurationUrl` (that you [provided in your manifest](~/concepts/apps/apps-package)) within an iframe inside the **Add Tab** dialog.

In this page, you present options and gather information from the user about what they want in your tab. For example, you may let the user select existing app resources (such as files or task lists) or even create new such resources just for this tab.

You must include the [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client) in your configuration page so that it can communicate with Microsoft Teams.

> [!NOTE]
> The example here is solely to illustrate the concept. Your configuration page should have a clean UI that fits the appearance of the Microsoft Teams dialog box in which it appears.

![Screenshot of the configuration page for a simple example app, giving the user the option of which map type to select.](~/assets/images/tab_configui.png)

## Configuration page example

The following excerpt shows an example configuration page.

In this case, the user is presented with two option buttons, which represent a choice of two different resources. Selecting either button fires `onClick()`, which sets `microsoftTeams.settings.setValidityState(true)`, enabling the **Save** button.

On save, the code determines which button was selected and sets the various parameters of `microsoftTeams.settings.setSettings` accordingly. Finally, it calls `saveEvent.notifySuccess()` to indicate that the content URL has successfully been determined.

With this as a simple example, let's walk through the steps your configuration page needs to perform to load your tab content.

<!-- TODO: fix to use latest sample app --> 

```HTML
<html>
<body>
<form>
  <input type="radio" name="maptype" value="bing" onclick="onClick()"> Bing Maps<br>
  <input type="radio" name="maptype" value="google" onclick="onClick()"> Google Maps
</form> 

<script src="https://statics.teams.microsoft.com/sdk/v1.0/js/MicrosoftTeams.min.js"></script>
 
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

For your configuration page to display within Microsoft Teams, ensure that it meets the [requirements for tab pages](~/resources/general/requirements).

>In summary: You must host your page on a secure HTTPS endpoint, ensure that your page permits itself to be iframed, include the Microsoft Teams JavaScript client SDK, and call `microsoftTeams.initialize()`.

## Collecting user information 

Your configuration page needs to perform the following steps:

### Obtain context and authenticate

If your page requires context about the user or environment, see [Get context for your Microsoft Teams tab](~/concepts/tabs/tabs-context). If it needs to authenticate the user, see [Authenticate a user in your Microsoft Teams tab](~/concepts/authentication).

### Determine when the user has specified all required information
 
By default, the **Save** button on the configuration dialog box is disabled. When the user has selected or entered all the required information for your app, you can enable the **Save** button by calling `microsoftTeams.settings.setValidityState(true)`.

### Determine the content to display in the tab

Use `microsoftTeams.settings.setSettings({entityId, contentUrl, suggestedTabName, websiteUrl, removeUrl})` to specify the URL of the [content page](~/concepts/tabs/tabs-content) Microsoft Teams should host in the tab. Things to keep in mind:

* This call can be made at any time the configuration page is displayed, including before or after the user selects the **Save** button (see next section).
* The `entityId` uniquely identifies the entity that is displayed in the tab.
  * Microsoft Teams uses this when creating [deep links to your tab](~/concepts/deep-links).
  * You can also use it to help obtain context when [displaying your content page](~/concepts/tabs/tabs-content) or when [updating or removing a tab](~/concepts/tabs/tabs-update-remove).
  * You can use the `contentUrl` as the `entityId` if you wish.
* The `contentUrl` is a required field that specifies the URL of the content Microsoft Teams should host in the tab.
  * Be sure you have added the `contentUrl` domain to the `validDomains` element in the tab manifest file. For more information, see [Microsoft Teams tab schema](~/resources/schema/manifest-schema) and [Redirecting across domains within a Microsoft Teams tab](~/resources/general/cross-domain).
*  The other parameters further customize how your tab works in Microsoft Teams:
	* The optional `suggestedTabName` parameter sets the initial tab name. Users can rename the tab. The default value is the name specified in the manifest.
	* The optional `websiteUrl` parameter sets where the user is taken if they choose the **Go to website** button. Typically, this is a link to the same content as displayed on the tab, but within your main web app with its regular chrome and navigation.
	* The optional `removeUrl` parameter sets the URL for your [removal options page](~/concepts/tabs/tabs-update-remove#removing-a-tab).

### React when the user chooses the Save button

Often you might not be able to determine the `entityId` or `contentUrl` immediately. For example, you might first need create a resource (a document or a task), and you want to do this only after the user selects **Save**. To be notified when the user selects **Save**, you must call `microsoftTeams.settings.registerOnSaveHandler(function(saveEvent) { /* ... */ })`. After this is done, when the user selects **Save**, Microsoft Teams calls the save event handler you registered.

You can return the settings asynchronously if, for example, the user has requested a new resource which will take time for you to create. To do this, store `saveEvent` for later. If you do not notify the outcome within 30 seconds, Microsoft Teams terminates the operation and displays an error.

### Return success or failure result

Finally, in your save handler registered previously, call `saveEvent.notifySuccess()` or `saveEvent.notifyFailure()` to inform Microsoft Teams on the outcome of the configuration. If you have no save handler registered, the outcome will immediately and implicitly be success.

>Hitting problems? See the [troubleshooting guide](~/troubleshoot/troubleshoot).
