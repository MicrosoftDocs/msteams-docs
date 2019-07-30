---
title: Extend Your App with a Custom Tab
author: laujan
description: 
keywords: teams tabs group channel configurable 
ms.topic: conceptual
ms.author: 
---
# Extend Your App with a Custom Tab

You can enhance your app experience by serving web content that you host to your channel, group chat, and personal users via a custom tab. Tabs provide efficient access to designated team information and resources.

## Add a custom tab

### Requirements

All tab content must meet the requirements outlined in [what are custom tabs](foo.md). Additionally, you must create an app package that is required for use in uploading your tab to Teams.  The app package is a zip folder containing the following:

- A **full color icon** measuring 192 x 192 pixels.
- A **transparent outline icon** measuring 32 x 32 pixels.
- A **manifest.json** file that specifies the attributes of your app. 

The [Teams Manifest Schema](platform/schema/manifest-schema) describes how an app integrates with the Teams client. Your `manifest.json` file must conform to the schema and will contain values vital to your custom tab features.

### Desktop and web clients

Whether you expose your tab within the channel/group or personal scope, you'll need to present an iFramed [content page](foo.md) in your tab. For personal tabs, the content URL is set directly in your manifest by the `contentUrl` property in the `staticTabs` array. Your tab's content will be the same for all users. For channel/group tabs you'll create a [configuration](foo.md) page which, based upon parameter variables, sets the content URL in the group/channel tab. The configuration page URL is specified by the  `configurationUrl` property in the `configurableTabs` array. You can specify one or more personal tab objects, up to 16, and/or a single channel/group tab object in your app manifest.

### Mobile clients

If you choose to have your channel/group tab appear on Teams mobile clients, the `setSettings()` configuration must have a value for the `websiteUrl` property (see below). Personal tabs are currently available in [developer preview](~/resources/dev-preview/developer-preview-intro.md). Full support for tabs on mobile clients will be released soon. To prepare for the update, you should follow the [guidance for tabs on mobile](~/resources/design/framework/tabs-mobile.md) when creating your tabs.

## Modify or remove a custom tab

You can enable users to modify, reconfigure, or rename a group/channel tab by setting your manifest's `canUpdateConfiguration` property to `true`. Supported removal options can further refine the user experience. You can designate what happens to the content when a tab is removed by including a removal options page in your app and setting a value for the `removeUrl` property in the  `setSettings()` configuration (see below). Personal tabs can't be modified but can be uninstalled by the user.

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
