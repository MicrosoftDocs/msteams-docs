---
title: Update or remove a tab
description: Describes how to update or remove tabs in Microsoft Teams
keywords: get started tabs teams
---

# Update or remove a Microsoft Teams tab

You can enable users to update a tab after it has been added and to choose what happens to tab content if a tab is removed.

## Updating an existing tab instance

You can enable users to update, or reconfigure, a tab by setting the `canUpdateConfiguration` attribute in your tab manifest to `true`. For more information, see the [manifest schema reference](~/reference/schema/manifest-schema). When you do so, Microsoft Teams adds a **Settings** option to the right-click menu for your tab. When the user selects this option, Microsoft Teams reloads the [configuration page](~/concepts/tabs/tabs-configuration) in an iframe inside an **Update Tab** dialog box (similar to the **Add Tab** dialog box).

![Screenshot of a tab with the shortcut menu open to show the Settings menu option](~/assets/images/tab_settings.png)

## Removing a tab

You can enable users to select what happens to content when a tab is removed, by using a removal options page. For example, you might want to give them the option to download, archive, or delete the tab content.

>**Note:** Supporting removal options can significantly improve the user experience, especially if you expect users to frequently add and remove your tabs. However, there is no guarantee that your page will always be loaded when a tab is removed. For example, it won't happen if the user deletes the entire team or channel in which your tab sits.

The removal options page is an HTML page that you host. When a user chooses to remove your tab, Microsoft Teams loads the `removeUrl` (that you provided when [configuring a tab](~/concepts/tabs/tabs-configuration)) in an iframe inside the **Remove tab** dialog box.

You must include the [Microsoft Teams JavaScript client SDK](~/reference/library/client-sdk-javascript) in your removal options page so that it can communicate with Microsoft Teams. You might also need to use the [supplied context](~/concepts/tabs/tabs-context) to help display the correct content in this page.

>**Note:** The example here is solely to illustrate the concept. Your removal options page should have a clean UI that fits the appearance of the Microsoft Teams dialog box in which it appears.

![Screenshot of the removal page for a simple example app, giving the user the option of whether to delete the map when the tab is removed](~/assets/images/tab_removal.png)

## Removal page example

The following excerpt shows an example tab-removal page.

In this case, the user is presented with two option buttons, which represent whether to delete the map and its data upon tab removal. Selecting either button fires `onClick()`, which sets `microsoftTeams.settings.setValidityState(true)`.

On removal, the code determines whether the first option button was selected and, if so, runs code (not shown) to remove the map and all its data from the underlying service. Finally, it calls `removeEvent.notifySuccess()` to indicate that the removal process completed successfully.

With this as a simple example, let's walk through the steps your removal page needs to perform to present the user with options and to process the content upon tab removal.

```HTML
<html>
<body>
<form>
  <input type="radio" name="removetype" value="delete" onclick="onClick()">
	Delete this map and all data the team added to it? <br>
  <input type="radio" name="removetype" value="keep" onclick="onClick()">
	Keep this map available for use at 
	<a href='https://maps.bing.com' target='_blank'>https://maps.bing.com</a>
</form> 

<script src="https://statics.teams.microsoft.com/sdk/v1.0/js/MicrosoftTeams.min.js">
</script>
 
<script type="text/javascript">  

microsoftTeams.initialize();
microsoftTeams.settings.registerOnRemoveHandler(function(removeEvent){
 	  
    var radios = document.getElementsByName('removetype');
  	if (radios[0].checked) {
      // Delete the map and all its data from the underlying service.
	  }
    
    removeEvent.notifySuccess();
});
 
function onClick() {
    microsoftTeams.settings.setValidityState(true);
}

</script>
</body>
</html>
```

### Prerequisites for your tab removal page 
 
For your tab removal page to display within Microsoft Teams, it must meet the [requirements for a tab page](~/reference/general/requirements).

### Presenting the user with content options upon tab removal

Your code should call `microsoftTeams.settings.getSettings(function(settings) { /* ... */ })`. When your callback is invoked, you can use these settings to determine the tab content that is being removed.

>**Tip:** When the user adds a tab, you can provide `customSettings` inside Settings, which might be useful to you at this point.

Upon page load, enable the **Remove** button immediately by calling `microsoftTeams.settings.setValidityState(true)`. So that you can do so, ensure that all options in your tab removal page have a default selection. Microsoft Teams enables the **Remove** button after 5 seconds, even if your tab hasn't called `setValidityState`. 

If your tab removal page requires user context, see [Get context for your Microsoft Teams tab](~/concepts/tabs/tabs-context). If your app needs to authenticate the user, see [Authenticate a user in your Microsoft Teams tab](~/concepts/authentication).

### Processing the content prior to tab removal

Similar to the save handler, you can register a remove handler by calling `microsoftTeams.settings.registerOnRemoveHandler(function(removeEvent){})` when the user selects **Remove**. At this point, your app should take whatever actions the user selected; for example, deleting or archiving content. If you need to perform these actions asynchronously, store `removeEvent`. Microsoft Teams removes the tab after 30 seconds, regardless of your actions.

Finally, call `removeEvent.notifySuccess()` or `removeEvent.notifyFailure()` to notify Microsoft Teams about the outcome of the removal.

>**Note:** Currently, Microsoft Teams immediately removes the tab in both the success and failure cases. In future, the failure case might be handled differently.
