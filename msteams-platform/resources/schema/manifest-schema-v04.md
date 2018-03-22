---
title: Manifest schema v0.4 reference
description: Describes version v0.4 of the manifest schema for Microsoft Teams
keywords: microsoft teams manifest schema reference v0.4
---

# Reference: Manifest schema v0.4 for Microsoft Teams

> [!IMPORTANT]
> This schema is included only as a reference to the v0.4 schema used before May 10, 2017. Although Microsoft Teams has backward compatibility support for this schema, new Teams apps must use the [newest schema version](~/resources/schema/manifest-schema). If you need to convert an app that uses the v0.4 schema, see [Migrate your v0.4 manifest to v1.0 in Microsoft Teams](~/resources/schema/manifest-schema-migrate).

The schema defines the following properties:

## `manifestVersion` (string, required)

The version of the manifest schema this manifest is using. Should be "0.4".

## `version` (string, required)

The app version. Changes to the app should cause a version change. This version string must follow the SemVer standard.

## `id` (string)

A unique identifier for this app. The ID must be a GUID. For a bot, you can use the Bot Framework ID. For a tab, you can use this [online tool](https://guidgenerator.com/) to generate a GUID, or use one of your choosing.

## `developer` (object, required)

Properties of the `developer` object:

### `name` (string, required)

The display name for the developer.

### `websiteUrl` (string, required)

The URL to the developer's website.

### `privacyUrl` (string, required)

The URL to the developer's privacy policy.

### `termsOfUseUrl` (string, required)

The URL to the developer's terms of use.

## `tabs` (array)

The object is an array with all elements of the type `object`. This block is required only for solutions that provide a configurable channel tab solution.

The array object has the following properties:

### `id` (string, required)

A unique identifier for this extension. The ID must be a GUID. You can use the same ID as at the parent level.

### `name` (string, required)

The display name of the extension.

### `description` (object, required)

The description information is displayed to users at various points in the UI. The description you provide must adequately and accurately explain your experience to new and existing users.

Properties of the `description` object:

#### `short` (string, required)

A short description of the extension used when space is limited. Maximum length is 80 characters.

#### `full` (string, required)

The full description of the extension. Maximum length is 256 characters.

### `icons` (object, required)

Each icon image file must be a transparent PNG, with a white or light-colored background. You can use a URL to a hosted version of your icons.  

Properties of the `icons` object:

#### `44` (string, required)

An icon for the extension sized to 44&times;44.

#### `88` (string, required)

An icon for the extension sized to 88&times;88.

### `accentColor` (string, required)

A color to use in conjunction with and as a background for the tab's icons. The value must be a valid HTML color code beginning with '#'; for example, `#4464ee`.

### `configUrl` (string, required)

The URL to use when configuring the extension.

### `canUpdateConfig` (boolean)

A value indicating whether an instance of the extension's configuration can be updated by the user after creation.

Default: `true`

## `bots` (array)

The object is an array with all elements of the type `object`. This block is required only for solutions that provide a bot experience.

The array object has the following properties:

### `mri` (string, required)

This must be the Bot Framework ID for your registered bot.

### `pinnedTabs` (object)

Your bot can optionally provide a static tab, shown alongside the bot's direct chat view.

#### `id` (string, required)

Developer-defined ID for the tab.

#### `definitionId`  (string, required)

Like an entity ID for a Teams tab, this can be used by you to identify the specific content on display.

#### `displayName` (string, required)  

Name to show on the tab UI.

#### `url` (string, required)  

The URL for the content to show in the tab.

#### `websiteUrl` (string, required)

A fallback URL for the user to view in browser.

## `needsIdentity` (boolean)

A value indicating whether the extension is requesting access to identity information.

## `validDomains` (array)

A list of valid domains from which the extension expects to load any content. Domain listings can include wildcards; for example, `*.example.com`. If your tab configuration or content UI needs to navigate to any domain other than the one used for tab configuration, that domain must be specified here.

The object is an array with all elements of the type `string`.
