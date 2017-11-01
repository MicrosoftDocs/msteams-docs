---
title: Create a content page for your tab
description: Describes how to create content pages for your tabs
keywords: teams tabs pages content
---

# Create a content page for your Microsoft Teams tab

The content page is an HTML page that you host.  When the user visits your tab, Microsoft Teams will load the `contentUrl` (that you [provided earlier](~/concepts/tabs/tabs-configuration)) within an iframe inside the main tab canvas area.

In this page, you present the main function of your tab, following our [design recommendations](~/get-started/design#designing-a-great-tab). You might also need to use the [supplied context](~/concepts/tabs/tabs-context) to help display the correct content.

> [!NOTE]
> The very simple "maps" example in this documentation uses existing Bing and Google maps as content pages for illustration, which of course do not include this library. See the [samples](~/samples/code-samples) for a full example tab that does so.  

![Tab with iframed content highlighted.](~/assets/images/tab_content.png)

<!-- TODO: fix to use latest sample app, and remove note when done --> 

## Prerequisites for content displayed in your tab

For your content to display within a Microsoft Teams tab, make sure it meets the [requirements for tab pages](~/reference/general/requirements).

>In summary: You must host your page on a secure HTTPS endpoint, ensure that your page permits itself to be iframed, include the [Microsoft Teams JavaScript client SDK](~/reference/library/client-sdk-javascript), and call `microsoftTeams.initialize()`.

## Deep links to items within your content page

You can enable team members to create and share links to items within your tab, such as an individual task within a tab that contains a task list. When chosen, the link navigates to your tab, which focuses on the specific item. See [Create deep links](~/concepts/deep-links) to learn how.

## Samples

Check out our [sample tabs](~/samples/code-samples) on GitHub.
