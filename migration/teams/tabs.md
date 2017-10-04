# Get started with tabs for Microsoft Teams

Tabs in Microsoft Teams allow you to display rich interactive web content. You can build a Microsoft Teams tab from scratch or by adapting your existing web app experience.

Microsoft Teams supports tabs in two different [scopes](teamsapps.md):
* Team scope: Tabs in channels allow teams to interact with your shared experience.  Currently, all tabs in channels are "configurable tabs" where a user configures the content of your tab experience when the tab is first added to a channel.
* Personal scope: Personal tabs allow users to interact with your experience privately, via the app bar.  Currently, all personal tabs are "static tabs" that are always present and cannot be added or removed.

<!-- TODO screenshot of team and personal task lists from sample app -->

## Overview of building a Microsoft Teams tab

Follow these steps to build a tab:

*  [Design a great tab](design.md#designing-a-great-tab): Although it's easy to adapt a web app to become a Microsoft Teams tab, it's worth considering which of your experiences and functionality will work most effectively.
*  [Create the package](createpackage.md): This package contains the manifest, which specifies attributes of your tab, as well as other app components you may provide as part of your Teams app experience.

### For configurable tabs

*  [Create the configuration page](createconfigpage.md): For configurable tabs, you must provide a configuration page to present options and gather information so users can customize the content and experience with your tab.  This iframed HTML page will be displayed when a user first pins the tab to a channel via the **Add a Tab** dialog.
	*  You can also [enable users to update a tab](updateremove.md#updating-an-existing-tab-instance) after they add it.
*  [Create the content page](createcontentpage.md): Microsoft Teams displays this content page when the user visits your tab. This is also an HTML page which you host and Microsoft Teams displays within an iframe.
	* You can also provide a page for users to specify [what happens to content when they remove a tab](updateremove.md#removing-a-tab).
	* You can enable users to create and share [deep links to items within your tab](deeplinks.md), such as a link to an individual task within a tab that contains a task list.

### For static tabs

*  [Declare your static tab identity](statictab.md): Static tabs are declared directly in your app package's manifest.
*  [Create the content page](createcontentpage.md): Microsoft Teams displays this content page when the user visits your tab. Content in a Static tab is subject to the same constraints as a configurable tab.
