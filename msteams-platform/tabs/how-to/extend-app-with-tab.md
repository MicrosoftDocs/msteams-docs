---
title: Extend Your App with a Custom Tab
author: laujan
description: 
keywords: teams tabs group channel configurable 
ms.topic: conceptual
ms.author: 
---
# Extend Your App with a Custom Tab

Tabs provide efficient access to designated team information and resources. You can enhance your app's experience by adding set web content that you host to your app's channel, group, and personal users via a custom tab.  You can specify one or more personal tab objects, up to 16, and/or a single channel/group tab object in your app's manifest.json.

## Add a custom tab

### Desktop and web clients

Whether you extend your app with a channel/group or personal tab, you'll need to present a specified [content page](foo.md). For personal tabs, the content URL is set directly in your app's [manifest.json](foo.md) (`contentUrl`). For channel/group tabs you'll create a [configuration](foo.md) page which, based upon the user's response parameters, will then set the content URL in the group/channel tab. The configuration page URL is specified in the manifest.json (`configurationUrl`).

### Mobile clients

If you want your tab to appear on the Teams mobile clients, you must specify the value of `websiteUrl` in the manifest.json. Personal tabs are currently available in [developer preview](~/resources/dev-preview/developer-preview-intro.md). Full support for tabs on mobile clients will be released soon. To prepare for the update, you should follow the [guidance for tabs on mobile](~/resources/design/framework/tabs-mobile.md) when creating your tabs.

## Modify or remove a custom tab

You can enable users to modify, reconfigure, or rename a group/channel tab by setting the `canUpdateConfiguration` attribute in the manifest.json to `true`. Supported removal options can further refine the user experience. You can designate what happens to the content when a tab is removed by including a removal options page in your app and setting the URL in the manifest.json (`removeUrl`). Personal tabs can't be modified but can be uninstalled by the user.

## Learn more

- [Create a content page for your tab](foo.md)
- [Create a configuration page for your tab](foo.md)
- [Update or remove a tab](foo.md)
