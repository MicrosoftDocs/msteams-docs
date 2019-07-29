---
title: Extend Your App with a Custom Tab
author: laujan
description: 
keywords: teams tabs group channel configurable 
ms.topic: conceptual
ms.author: 
---
# Extend Your App with a Custom Tab

Tabs provide efficient access to designated team information and resources. You can enhance your app's experience by serving fixed web content that you host to your channel, group chat, and personal users via a custom tab.

## Add a custom tab

### Teams Manifest

The [Teams Manifest](platform/schema/manifest-schema) describes how an app integrates with the Teams client. Your manifest.json file must conform to the schema and will contain values vital to your custom tab features.

### Desktop and web clients

Whether you extend your app with a channel/group or personal tab, you'll need to present a [content page](foo.md). For personal tabs, the content URL is set directly in your manifest `staticTabs` array's `contentUrl` property and should be the same for all users. For channel/group tabs you'll create a [configuration](foo.md) page which, based upon user supplied parameters, then set the content URL in the group/channel tab. The configuration page URL is specified in the `configurableTabs` array's `configurationUrl` property. You can specify one or more personal tab objects, up to 16, and/or a single channel/group tab object in your app manifest.

### Mobile clients

If you choose to have your channel/group tab appear on Teams mobile clients, the `microsoftTeams.settings.setSettings()` configuration must have a value for the `websiteUrl` property (see below). Personal tabs are currently available in [developer preview](~/resources/dev-preview/developer-preview-intro.md). Full support for tabs on mobile clients will be released soon. To prepare for the update, you should follow the [guidance for tabs on mobile](~/resources/design/framework/tabs-mobile.md) when creating your tabs.

## Modify or remove a custom tab

You can enable users to modify, reconfigure, or rename a group/channel tab by setting the manifest's `canUpdateConfiguration` property to `true`. Supported removal options can further refine the user experience. You can designate what happens to the content when a tab is removed by including a removal options page in your app and setting a value for the `removeUrl` property in the  `microsoftTeams.settings.setSettings()` configuration (see below). Personal tabs can't be modified but can be uninstalled by the user.

Microsoft Teams setSettings() configuration:

```javascript
microsoftTeams.settings.setSettings({
    contentUrl: "add content page URL here",
    entityId: "add unique name here",
    suggestedDisplayName: "add name to display on tab here",
    websiteUrl: "required for mobile clients",
    removeUrl: "add removal page URL here"
});
```

## Learn more

- [Create a content page for your tab](foo.md)
- [Create a configuration page for your tab](foo.md)
- [Update or remove a tab](foo.md)
