---
title: Manifest schema reference
description: Describes the schema supported by the manifest for Microsoft Teams
keywords: teams manifest schema
ms.date: 12/10/2017
---

# Reference: Manifest schema for Microsoft Teams

> [!NOTE]
> For help on migrating your v0.4 manifest to v1.x, see our [migration guide](~/resources/schema/manifest-schema-migrate).

The Microsoft Teams manifest describes how the app integrates into the Microsoft Teams product. Your manifest must conform to the schema hosted at [`https://statics.teams.microsoft.com/sdk/v1.2/manifest/MicrosoftTeams.schema.json`](https://statics.teams.microsoft.com/sdk/v1.2/manifest/MicrosoftTeams.schema.json). Versions 1.0 and 1.1 are also supported. 

The following schema sample shows all extensibility options.

## Sample full schema

```json
{
  "$schema": "https://statics.teams.microsoft.com/sdk/v1.2/manifest/MicrosoftTeams.schema.json", 
  "manifestVersion": "1.2",
  "version": "1.0.0",
  "id": "%MICROSOFT-APP-ID%", 
  "packageName": "com.example.myapp",
  "developer": {
    "name": "Publisher Name",
    "websiteUrl": "https://website.com/",
    "privacyUrl": "https://website.com/privacy",
    "termsOfUseUrl": "https://website.com/app-tos"
  },
  "name": {
    "short": "Name of your app (<=30 chars)",
    "full": "Full name of app, if longer than 30 characters"
  },
  "description": {
    "short": "Short description of your app",
    "full": "Full description of your app"
  },
  "icons": {
    "outline": "%FILENAME-32x32px%", 
    "color": "%FILENAME-192x192px" 
  },
  "accentColor": "%HEX-COLOR%",
  "configurableTabs": [
    {
      "configurationUrl": "https://taburl.com/config.html",
      "canUpdateConfiguration": true,
      "scopes": [ "team" ]
    }
  ],
  "staticTabs": [
    {
      "entityId": "idForPage",
      "name": "Display name of tab",
      "contentUrl": "https://teams-specific-webview.website.com",
      "websiteUrl": "http://fullwebsite.website.com",
      "scopes": [ "personal" ]
    }
  ],
  "bots": [
    {
      "botId": "%MICROSOFT-APP-ID-REGISTERED-WITH-BOT-FRAMEWORK%",
      "needsChannelSelector": false,
      "isNotificationOnly": false,
      "scopes": [ "team", "personal" ],
      "commandLists": [
        {
          "scopes": ["team"],
          "commands": [
            {
              "title": "Command 1",
              "description": "Description of Command 1"
            },
            {
              "title": "Command N",
              "description": "Description of Command N"
            }
          ]
        },
        {
          "scopes": ["personal"],
          "commands": [
            {
              "title": "Personal command 1",
              "description": "Description of Personal command 1"
            },
            {
              "title": "Personal command N",
              "description": "Description of Personal command N"
            }
          ]
        }
      ]
    }
  ],
  "connectors": [
    {
      "connectorId": "GUID-FROM-CONNECTOR-DEV-PORTAL%",
      "scopes": [ "team"]
    }
  ],
  "composeExtensions": [
    {
      "botId": "%MICROSOFT-APP-ID-REGISTERED-WITH-BOT-FRAMEWORK%",
      "canUpdateConfiguration": true,
      "commands": [
        {
          "id": "exampleCmd",
          "title": "Example Command",
          "description": "Command Description; e.g., Search on the web",
          "initialRun": "true",
          "parameters": [
            {
              "name": "keyword",
              "title": "Search keywords",
              "description": "Enter the keywords to search for"
            }
          ]
        }
      ]
    }
  ],
  "permissions": [
    "identity",
    "messageTeamMembers"
  ],
  "validDomains": [
     "*.taburl.com",
     "*.otherdomains.com"
  ]
}
```

The schema defines the following properties:

## $schema

*Optional, but recommended* &ndash; String

The URL referencing the JSON Schema for the manifest.

> [!TIP]
> Specify the schema at the beginning of your manifest to enable IntelliSense or similar support from your code editor: `"$schema": "https://statics.teams.microsoft.com/sdk/v1.2/manifest/MicrosoftTeams.schema.json",`

## manifestVersion

**Required** &ndash; String

The version of the manifest schema this manifest is using. It should be "1.2".

## version

**Required** &ndash; String

The version of the specific app. If you update something in your manifest, the version must be incremented as well. This way, when the new manifest is installed, it will overwrite the existing one and the user will get the new functionality. If this app was submitted to the store, the new manifest will have to be re-submitted and re-validated. Then, users of this app will get the new updated manifest automatically in a few hours, after it is approved.

If the app requested permissions change, users will be prompted to upgrade and re-consent to the app. 

This version string must follow the [semver](http://semver.org/) standard (MAJOR.MINOR.PATH).

## id

**Required** &ndash; Microsoft app ID

The unique Microsoft-generated identifier for this app. If you have registered a bot via the Microsoft Bot Framework, or your tab's web app already signs in with Microsoft, you should already have an ID and should enter it here. Otherwise, you should generate a new ID at the Microsoft Application Registration Portal ([My Applications](https://apps.dev.microsoft.com)), enter it here, and then reuse it when you [add a bot](~/concepts/bots/bots-create).

## packageName

**Required** &ndash; String

A unique identifier for this app in reverse domain notation; for example, com.example.myapp.

## developer

**Required**

Specifies information about your company. For apps submitted to AppSource (formerly Office Store), these values must match the information in your AppSource entry.

|Name| Maximum size | Required | Description|
|---|---|---|---|
|`name`|32 characters|✔|The display name for the developer.|
|`websiteUrl`|2048 characters|✔|The URL to the developer's website. This link should take users to your company or product-specific landing page.|
|`privacyUrl`|2048 characters|✔|The URL to the developer's privacy policy.|
|`termsOfUseUrl`|2048 characters|✔|The URL to the developer's terms of use.|

## name

**Required**

The name of your app experience, displayed to users in the Teams experience. For apps submitted to AppSource, these values must match the information in your AppSource entry.

|Name| Maximum size | Required | Description|
|---|---|---|---|
|`short`|30 characters|✔|The short display name for the app.|
|`full`|100 characters||The full name of the app, used if the full app name exceeds 30 characters.|

## description

**Required**

Describes your app to users. For apps submitted to AppSource, these values must match the information in your AppSource entry.

Ensure that your description accurately describes your experience and provides information to help potential customers understand what your experience does. You should also note, in the full description, if an external account is required for use.

|Name| Maximum size | Required | Description|
|---|---|---|---|
|`short`|80 characters|✔|A short description of your app experience, used when space is limited.|
|`full`|4000 characters|✔|The full description of your app.|

> [!IMPORTANT]
> We currently have an issue with full descriptions longer than 256 characters. You can use a longer description in your Seller Dashboard app submission.

## icons

**Required**

Icons used within the Teams app. The icon files must be included as part of the upload package. See [Icons](~/concepts/apps/apps-package#icons) for more information.

|Name| Maximum size | Required | Description|
|---|---|---|---|
|`outline`|2048 characters|✔|A relative file path to a transparent 32x32 PNG outline icon.|
|`color`|2048 characters|✔|A relative file path to a full color 192x192 PNG icon.|

## accentColor

**Required** &ndash; String

A color to use in conjunction with and as a background for your outline icons.

The value must be a valid HTML color code starting with '#', for example `#4464ee`.

## configurableTabs

**Optional**

Used when your app experience has a team channel tab experience that requires extra configuration before it is added.  Configurable tabs are supported only in the teams scope, and currently only one tab per app is supported.

The object is an array with all elements of the type `object`.  This block is required only for solutions that provide a configurable channel tab solution.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`configurationUrl`|String|2048 characters|✔|The URL to use when configuring the tab.|
|`canUpdateConfiguration`|Boolean|||A value indicating whether an instance of the tab's configuration can be updated by the user after creation.  Default: `true`|
|`scopes`|Array of enum|1|✔|Currently, configurable tabs support only the `team` scope, which means it can be provisioned only to a channel.|

## staticTabs

**Optional**

Defines a set of tabs that can be "pinned" by default, without the user adding them manually. Static tabs declared in `personal` scope are always pinned to the app's personal experience. Static tabs declared in the `team` scope are currently not supported. 

The object is an array (maximum of 16 elements) with all elements of the type `object`. This block is required only for solutions that provide a static tab solution.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`entityId`|String|64 characters|✔|A unique identifier for the entity that the tab displays.|
|`name`|String|128 characters|✔|The display name of the tab in the channel interface.|
|`contentUrl`|String|2048 characters|✔|The URL that points to the entity UI to be displayed in the Teams canvas.  Must be HTTPS.|
|`websiteUrl`|String|2048 characters||The URL to point at if a user opts to view in a browser.|
|`scopes`|Array of enum|1|✔|Currently, static tabs support only the `personal` scope, which means it can be provisioned only as part of the personal experience.|

## bots

**Optional**

Defines a bot solution, along with optional information such as default command properties.

The object is an array (maximum of only 1 element&mdash;currently only one bot is allowed per app) with all elements of the type `object`. This block is required only for solutions that provide a bot experience.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`botId`|String|64 characters|✔|The unique Microsoft app ID for the bot as registered with the Bot Framework. This may well be the same as the overall [app ID](#id).|
|`needsChannelSelector`|Boolean|||Describes whether or not the bot utilizes a user hint to add the bot to a specific channel. Default: `false`|
|`isNotificationOnly`|Boolean|||Indicates whether a bot is a one-way, notification-only bot, as opposed to a conversational bot. Default: `false`|
|`scopes`|Array of enum|2|✔|Specifies whether the bot offers an experience in the context of a channel in a `team`, or an experience scoped to an individual user alone (`personal`). These options are non-exclusive.|

### bots: commandLists

An optional list of commands that your bot can recommend to users. The object is an array (maximum of 2 elements) with all elements of type `object`; you must define a separate command list for each scope that your bot supports. See [Bot menus](~/concepts/bots/bots-menus) for more information.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`items.properties`|array of enum|2|✔|Specifies the scope for which the command list is valid.|
|`items.commands`|array of objects|10|✔|An array of commands the bot supports:<br>`title`: the bot command name (string, 32)<br>`description`: a simple description or example of the command syntax and its argument (string, 128)|

## connectors

**Optional**

The `connectors` block defines an Office 365 Connector for the app.

The object is an array (maximum of 1 element) with all elements of type `object`. This block is required only for solutions that provide a Connector.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`connectorId`|String|64 characters|✔|A unique identifier for the Connector that matches its ID in the Connectors Developer Portal.|
|`scopes`|Array of enum|1|✔|Specifies whether the Connector offers an experience in the context of a channel in a `team`, or an experience scoped to an individual user alone (`personal`). Currently, only the `team` scope is supported.|

## composeExtensions

**Optional**

Defines a messaging extension for the app.

> [!NOTE]
> The name of the feature was changed from "compose extension" to "messaging extension" in November, 2017, but the manifest name remains the same so that existing extensions continue to function.

The object is an array (maximum of 1 element) with all elements of type `object`. This block is required only for solutions that provide a messaging extension.

|Name| Type | Maximum Size | Required | Description|
|---|---|---|---|---|
|`botId`|String|64|✔|The unique Microsoft app ID for the bot that backs the messaging extension, as registered with the Bot Framework. This may well be the same as the overall [app ID](#id).|
|`canUpdateConfiguration`|Boolean|||A value indicating whether the configuration of a messaging extension can be updated by the user. The default is `false`.|
|`commands`|Array of object|1|✔|Array of commands the messaging extension supports|

### composeExtensions.commands

Your messaging extension should declare one or more commands. Each command appears in Microsoft Teams as a potential interaction from the UI-based entry point.

Each command item is an object with the following structure:

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`id`|String|64 characters|✔|The ID for the command|
|`title`|String|32 characters|✔|The user-friendly command name|
|`description`|String|128 characters||The description that appears to users to indicate the purpose of this command|
|`initialRun`|Boolean|||A Boolean value that indicates whether the command should be run initially with no parameters.  Default: `false`|
|`parameters`|Array of object|5|✔|The list of parameters the command takes. Minimum: 1; maximum: 5|
|`parameter.name`|String|64 characters|✔|The name of the parameter as it appears in the client. This is included in the user request.|
|`parameter.title`|String|32 characters|✔|User-friendly title for the parameter.|
|`parameter.description`|String|128 characters||User-friendly string that describes this parameter’s purpose.|

## permissions

**Optional**

An array of `string` which specifies which permissions the app requests, which lets end users know how the extension will perform. The following options are non-exclusive:

* `identity` &emsp; Requires user identity information
* `messageTeamMembers` &emsp; Requires permission to send direct messages to team members

## validDomains

**Optional**, except **Required** for apps with tabs

A list of valid domains from which the extension expects to load any content. Domain listings can include wildcards, for example `*.example.com`. If your tab configuration or content UI needs to navigate to any other domain besides the one use for tab configuration, that domain must be specified here.

> [!IMPORTANT]
> Do not add domains that are outside your control, either directly or via wildcards. For example, `yourapp.onmicrosoft.com` is valid, but `*.onmicrosoft.com` is not valid.

The object is an array with all elements of the type `string`.
