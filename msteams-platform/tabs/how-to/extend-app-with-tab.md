---
title: Extend your app with a custom tab
author: laujan
description: 
keywords: teams tabs group channel configurable 
ms.topic: conceptual
ms.author: 
---
# Extend your app with a custom tab

Tabs provide efficient access to designated team information and resources. You can enhance your app's experience by adding set web content that you host to your app's channel, group, and personal users via a custom tab.  You can specify one or more personal tab objects, up to 16, and/or a single channel/group tab object in your app's manifest.json.

## add a custom tab

Whether you extend your app with a channel/group or personal tab, you will need to present a specified content page. For personal tabs, the content URL is set directly in your app's manifest.json. For channel/group tabs you will create a configuration page which, based upon the user's response parameters, will then set the content URL in the group/channel tab. The configuration page URL is specified in your app's manifest.json.

## remove a custom tab

You can enable users to modify the settings, rename, or remove group/channel tabs and designate what happens to the content if a tab is removed. Supported removal options can further refine the user experience. Personal tabs cannot be modified but can be uninstalled by the user.

## Learn more

- [Create a content page for your tab](foo.md)
- [Create a configuration page for your tab](foo.md)
- [Update or remove a tab](foo.md)
