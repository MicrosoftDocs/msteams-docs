# Create a content page for your Microsoft Teams tab

The content page is an HTML page that you host.  When the user visits your tab, Microsoft Teams will load the `contentUrl` (that you [provided earlier](createconfigpage.md)) within an iframe inside the main tab canvas area.

In this page, you present the main function of your tab, following the [design recommendations](design.md#designing-a-great-tab).  You may also need to use the [supplied context](getusercontext.md) to help display the correct content.

>**Note:** The very simple 'maps' example in this documentation uses existing Bing and Google maps as content pages for illustration, which of course do not include this library. See the [samples](samples.md) for a full example tab that does so.  

![Tab with iframed content highlighted.](images/tab_content.png)

<!-- TODO: fix to use latest sample app, and remove note when done --> 

## Prerequisites for content displayed in your tab

For your content to display within a Microsoft Teams tab, make sure it meets the [requirements for tab pages](prerequisites.md).

>In summary: You must host your page on a secure HTTPS endpoint, ensure that your page permits itself to be iframed, include the [Microsoft Teams JavaScript library](jslibrary.md), and call `microsoftTeams.initialize()`.

## Deep links to items within your content page

You can enable team members to create and share links to items within your tab, such as an individual task within a tab that contains a task list. When chosen, the link navigates to your tab, which focuses on the specific item. [Find out how](deeplinks.md).

## Samples

Check out our [sample tabs](samples.md) on GitHub.
