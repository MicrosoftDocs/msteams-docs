---
title: Manifest schema reference
description: Describes the schema supported by the manifest for Microsoft Teams
keywords: teams manifest schema
author: laujan
ms.author: lajanuar
---
# Reference: Manifest schema for Microsoft Teams

The Microsoft Teams manifest describes how the app integrates into the Microsoft Teams product. Your manifest must conform to the schema hosted at [`https://developer.microsoft.com/json-schemas/teams/v1.7/MicrosoftTeams.schema.json`]( https://developer.microsoft.com/json-schemas/teams/v1.7/MicrosoftTeams.schema.json). Previous versions 1.0-1.4 are also supported (using "v1.x" in the URL).

The following schema sample shows all extensibility options.

## Sample full manifest

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/teams/v1.7/MicrosoftTeams.schema.json",
  "manifestVersion": "1.7",
  "version": "1.0.0",
  "id": "%MICROSOFT-APP-ID%",
  "packageName": "com.example.myapp",
  "localizationInfo": {
    "defaultLanguageTag": "en-us",
    "additionalLanguages": [
      {
        "languageTag": "es-es",
        "file": "en-us.json"
      }
    ]
  },
  "developer": {
    "name": "Publisher Name",
    "websiteUrl": "https://website.com/",
    "privacyUrl": "https://website.com/privacy",
    "termsOfUseUrl": "https://website.com/app-tos",
    "mpnId": "1234567890"
  },
  "name": {
    "short": "Name of your app (<=30 chars)",
    "full": "Full name of app, if longer than 30 characters (<=100 chars)"
  },
  "description": {
    "short": "Short description of your app (<= 80 chars)",
    "full": "Full description of your app (<= 4000 chars)"
  },
  "icons": {
    "outline": "A relative path to a transparent .png icon — 32px X 32px",
    "color": "A relative path to a full color .png icon — 192px X 192px"
  },
  "accentColor": "A valid HTML color code.",
  "configurableTabs": [
    {
      "configurationUrl": "https://contoso.com/teamstab/configure",
      "scopes": [
        "team",
        "groupchat"
      ],
      "canUpdateConfiguration": true,
      "sharePointPreviewImage": "Relative path to a tab preview image for use in SharePoint — 1024px X 768",
      "supportedSharePointHosts": "Define how your tab wil be made available in SharePoint (full page or web part)"
    }
  ],
  "staticTabs": [
    {
      "entityId": "unique Id for the page entity",
      "scopes": [
        "personal"
      ],
      "name": "Display name of tab",
      "contentUrl": "https://contoso.com/content (displayed in Teams canvas)",
      "websiteUrl": "https://contoso.com/content (displayed in web browser"
    }
  ],
  "bots": [
    {
      "botId": "%MICROSOFT-APP-ID-REGISTERED-WITH-BOT-FRAMEWORK%",
      "scopes": [
        "team",
        "personal",
        "groupchat"
      ],
      "needsChannelSelector": false,
      "isNotificationOnly": false,
      "supportsFiles": true,
      "commandLists": [
        {
          "scopes": [
            "team",
            "groupchat"
          ],
          "commands": [
            {
              "title": "Command 1",
              "description": "Description of Command 1"
            },
            {
              "title": "Command 2",
              "description": "Description of Command 2"
            }
          ]
        },
        {
          "scopes": [
            "personal",
            "groupchat"
          ],
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
      "scopes": [
        "team"
      ],
      "configurationUrl": "https://contoso.com/teamsconnector/configure"
    }
  ],
  "composeExtensions": [
    {
      "canUpdateConfiguration": true,
      "botId": "%MICROSOFT-APP-ID-REGISTERED-WITH-BOT-FRAMEWORK%",
      "commands": [
        {
          "id": "exampleCmd1",
          "title": "Example Command",
          "type": "query",
          "context": [
            "compose",
            "commandBox"
          ],
          "description": "Command Description; e.g., Search on the web",
          "initialRun": true,
          "fetchTask": false,
          "parameters": [
            {
              "name": "keyword",
              "title": "Search keywords",
              "inputType": "text",
              "description": "Enter the keywords to search for",
              "value": "Initial value for the parameter",
              "choices": [
                {
                  "title": "Title of the choice",
                  "value": "Value of the choice"
                }
              ]
            }
          ]
        },
        {
          "id": "exampleCmd2",
          "title": "Example Command 2",
          "type": "action",
          "context": [
            "message"
          ],
          "description": "Command Description; e.g., Search for a customer",
          "initialRun": true,
          "fetchTask": true,
          "parameters": [
            {
              "name": "custinfo",
              "title": "Customer name",
              "description": "Enter a customer name",
              "inputType": "text"
            }
          ]
        }
      ],
      "taskInfo": {
        "title": "Initial dialog title",
        "width": "Dialog width",
        "height": "Dialog height",
        "url": "Initial webview URL"
      },
      "messageHandlers": [
        {
          "type": "link",
          "value": {
            "domains": [
              "mysite.someplace.com",
              "othersite.someplace.com"
            ]
          }
        }
      ]
    }
  ],
  "permissions": [
    "identity",
    "messageTeamMembers"
  ],
  "devicePermissions": [
    "geolocation",
    "media",
    "notifications",
    "midi",
    "openExternal"
  ],
  "validDomains": [
    "contoso.com",
    "mysite.someplace.com",
    "othersite.someplace.com"
  ],
  "webApplicationInfo": {
    "id": "AAD App ID",
    "resource": "Resource URL for acquiring auth token for SSO",
    "applicationPermissions": [
      "TeamSettings.Read.Group",
      "TeamsTab.Edit.Group",
      "Channel.Create.Group"
    ],
    "showLoadingIndicator": false
  },
  "isFullScreen": false,
  "activities": {
    "activityTypes": [
      {
        "type": "taskCreated",
        "description": "Task created activity",
        "templateText": "<team member> created task <taskId> for you"
      },
      {
        "type": "userMention",
        "description": "Personal mention activity",
        "templateText": "<team member> mentioned you"
      }
    ]
  }
}
```

The schema defines the following properties:

## $schema

*Optional, but recommended* — String

The https:// URL referencing the JSON Schema for the manifest.

## manifestVersion

**Required** — String

The version of the manifest schema this manifest is using. It should be "1.5".

## version

**Required** — String

The version of the specific app. If you update something in your manifest, the version must be incremented as well. This way, when the new manifest is installed, it will overwrite the existing one and the user will get the new functionality. If this app was submitted to the store, the new manifest will have to be re-submitted and re-validated. Then, users of this app will get the new updated manifest automatically in a few hours, after it is approved.

If the app requested permissions change, users will be prompted to upgrade and re-consent to the app.

This version string must follow the [semver](http://semver.org/) standard (MAJOR.MINOR.PATCH).

## id

**Required** — Microsoft app ID

The unique Microsoft-generated identifier for this app. If you have registered a bot via the Microsoft Bot Framework, or your tab's web app already signs in with Microsoft, you should already have an ID and should enter it here. Otherwise, you should generate a new ID at the Microsoft Application Registration Portal ([My Applications](https://apps.dev.microsoft.com)), enter it here, and then reuse it when you add a bot.Note: If you are submitting an update to your existing app in AppSource, the ID in your manifest must not be modified.

## developer

**Required** — object

Specifies information about your company. For apps submitted to AppSource (formerly Office Store), these values must match the information in your AppSource entry. See our [publishing guidelines](~/concepts/deploy-and-publish/appsource/prepare/frequently-failed-cases.md) for additional information.

|Name| Maximum size | Required | Description|
|---|---|---|---|
|`name`|32 characters|✔|The display name for the developer.|
|`websiteUrl`|2048 characters|✔|The https:// URL to the developer's website. This link should take users to your company or product-specific landing page.|
|`privacyUrl`|2048 characters|✔|The https:// URL to the developer's privacy policy.|
|`termsOfUseUrl`|2048 characters|✔|The https:// URL to the developer's terms of use.|
|`mpnId`|10 characters| |**Optional** The Microsoft Partner Network ID that identifies the partner organization building the app.|

## name

**Required** — object

The name of your app experience, displayed to users in the Teams experience. For apps submitted to AppSource, these values must match the information in your AppSource entry. The values of `short` and `full` should not be the same.

|Name| Maximum size | Required | Description|
|---|---|---|---|
|`short`|30 characters|✔|The short display name for the app.|
|`full`|100 characters||The full name of the app, used if the full app name exceeds 30 characters.|

## description

**Required** — object

Describes your app to users. For apps submitted to AppSource, these values must match the information in your AppSource entry.

Ensure that your description accurately describes your experience and provides information to help potential customers understand what your experience does. You should also note, in the full description, if an external account is required for use. The values of `short` and `full` should not be the same.  Your short description must not be repeated within the long description and must not include any other app name.

|Name| Maximum size | Required | Description|
|---|---|---|---|
|`short`|80 characters|✔|A short description of your app experience, used when space is limited.|
|`full`|4000 characters|✔|The full description of your app.|

## packageName

**Optional** — String

A unique identifier for this app in reverse domain notation; for example, com.example.myapp. Maximum length: 64 characters.

## localizationInfo 

**Optional** — object

Allows the specification of a default language, as well as pointers to additional language files. See [localization](~/concepts/build-and-test/apps-localization.md).

|Name| Maximum size | Required | Description|
|---|---|---|---|
|`defaultLanguageTag`||✔|The language tag of the strings in this top level manifest file.|

### localizationInfo.additionalLanguages

An array of objects specifying additional language translations.

|Name| Maximum size | Required | Description|
|---|---|---|---|
|`languageTag`||✔|The language tag of the strings in the provided file.|
|`file`||✔|A relative file path to a the .json file containing the translated strings.|

## icons

**Required** — object

Icons used within the Teams app. The icon files must be included as part of the upload package. See [Icons](~/concepts/build-and-test/apps-package.md#icons) for more information.

|Name| Maximum size | Required | Description|
|---|---|---|---|
|`outline`|2048 characters|✔|A relative file path to a transparent 32x32 PNG outline icon.|
|`color`|2048 characters|✔|A relative file path to a full color 192x192 PNG icon.|

## accentColor

**Optional** — String

A color to use in conjunction with and as a background for your outline icons.

The value must be a valid HTML color code starting with '#', for example `#4464ee`.

## configurableTabs

**Optional** — array

Used when your app experience has a team channel tab experience that requires extra configuration before it is added. Configurable tabs are supported only in the teams scope, and currently only one tab per app is supported.

The object is an array with all elements of the type `object`. This block is required only for solutions that provide a configurable channel tab solution.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`configurationUrl`|String|2048 characters|✔|The https:// URL to use when configuring the tab.|
|`canUpdateConfiguration`|Boolean|||A value indicating whether an instance of the tab's configuration can be updated by the user after creation. Default: **true**.|
|`scopes`|Array of enum|1|✔|Currently, configurable tabs support only the `team` and `groupchat` scopes. |
|`sharePointPreviewImage`|String|2048||A relative file path to a tab preview image for use in SharePoint. Size 1024x768. |
|`supportedSharePointHosts`|Array of enum|1||Defines how your tab will be made available in SharePoint. Options are `sharePointFullPage` and `sharePointWebPart` |

## staticTabs

**Optional** —array

Defines a set of tabs that can be "pinned" by default, without the user adding them manually. Static tabs declared in `personal` scope are always pinned to the app's personal experience. Static tabs declared in the `team` scope are currently not supported.

The object is an array (maximum of 16 elements) with all elements of the type `object`. This block is required only for solutions that provide a static tab solution.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`entityId`|String|64 characters|✔|A unique identifier for the entity that the tab displays.|
|`name`|String|128 characters|✔|The display name of the tab in the channel interface.|
|`contentUrl`|String|2048 characters|✔|The https:// URL that points to the entity UI to be displayed in the Teams canvas.|
|`websiteUrl`|String|2048 characters||The https:// URL to point at if a user opts to view in a browser.|
|`scopes`|Array of enum|1|✔|Currently, static tabs support only the `personal` scope, which means it can be provisioned only as part of the personal experience.|

> [!NOTE]
> If your tabs require context-dependent information to display relevant content or for initiating an authentication flow, *see* [Get context for your Microsoft Teams tab](../../tabs/how-to/access-teams-context.md).

## bots

**Optional** — array

Defines a bot solution, along with optional information such as default command properties.

The object is an array (maximum of only 1 element&mdash;currently only one bot is allowed per app) with all elements of the type `object`. This block is required only for solutions that provide a bot experience.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`botId`|String|64 characters|✔|The unique Microsoft app ID for the bot as registered with the Bot Framework. This may well be the same as the overall [app ID](#id).|
|`needsChannelSelector`|Boolean|||Describes whether or not the bot utilizes a user hint to add the bot to a specific channel. Default: **`false`**|
|`isNotificationOnly`|Boolean|||Indicates whether a bot is a one-way, notification-only bot, as opposed to a conversational bot. Default: `**false**`|
|`supportsFiles`|Boolean|||Indicates whether the bot supports the ability to upload/download files in personal chat. Default: **`false`**|
|`scopes`|Array of enum|3|✔|Specifies whether the bot offers an experience in the context of a channel in a `team`, in a group chat (`groupchat`), or an experience scoped to an individual user alone (`personal`). These options are non-exclusive.|

### bots.commandLists

An optional list of commands that your bot can recommend to users. The object is an array (maximum of 2 elements) with all elements of type `object`; you must define a separate command list for each scope that your bot supports. See [Bot menus](~/bots/how-to/create-a-bot-commands-menu.md) for more information.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`items.scopes`|array of enum|3|✔|Specifies the scope for which the command list is valid. Options are `team`, `personal`, and `groupchat`.|
|`items.commands`|array of objects|10|✔|An array of commands the bot supports:<br>`title`: the bot command name (string, 32)<br>`description`: a simple description or example of the command syntax and its argument (string, 128)|

## connectors

**Optional** — array

The `connectors` block defines an Office 365 Connector for the app.

The object is an array (maximum of 1 element) with all elements of type `object`. This block is required only for solutions that provide a Connector.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`configurationUrl`|String|2048 characters|✔|The https:// URL to use when configuring the connector.|
|`connectorId`|String|64 characters|✔|A unique identifier for the Connector that matches its ID in the [Connectors Developer Dashboard](https://aka.ms/connectorsdashboard).|
|`scopes`|Array of enum|1|✔|Specifies whether the Connector offers an experience in the context of a channel in a `team`, or an experience scoped to an individual user alone (`personal`). Currently, only the `team` scope is supported.|

## composeExtensions

**Optional** — array

Defines a messaging extension for the app.

> [!NOTE]
> The name of the feature was changed from "compose extension" to "messaging extension" in November, 2017, but the manifest name remains the same so that existing extensions continue to function.

The object is an array (maximum of 1 element) with all elements of type `object`. This block is required only for solutions that provide a messaging extension.

|Name| Type | Maximum Size | Required | Description|
|---|---|---|---|---|
|`botId`|String|64|✔|The unique Microsoft app ID for the bot that backs the messaging extension, as registered with the Bot Framework. This may well be the same as the overall App ID.|
|`canUpdateConfiguration`|Boolean|||A value indicating whether the configuration of a messaging extension can be updated by the user. Default: **false**.|
|`commands`|Array of object|10|✔|Array of commands the messaging extension supports|
|`messageHandlers`|Array of Objects|5||A list of handlers that allow apps to be invoked when certain conditions are met. Domains must also be listed in `validDomains`|
|`messageHandlers.type`|String|||The type of message handler. Must be `"link"`.|
|`messageHandlers.value.domains`|Array of Strings|||Array of domains that the link message handler can register for.|

### composeExtensions.commands

Your messaging extension should declare one or more commands. Each command appears in Microsoft Teams as a potential interaction from the UI-based entry point. There is a maximum of 10 commands.

Each command item is an object with the following structure:

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`id`|String|64 characters|✔|The ID for the command|
|`type`|String|64 characters||Type of the command. One of `query` or `action`. Default: **query**.`|
|`title`|String|32 characters|✔|The user-friendly command name|
|`description`|String|128 characters||The description that appears to users to indicate the purpose of this command|
|`initialRun`|Boolean|||A Boolean value that indicates whether the command should be run initially with no parameters. Default: **false**|
|`context`|Array of Strings|3||Defines where the message extension can be invoked from. Any combination of `compose`, `commandBox`, `message`. Default is `["compose", "commandBox"]`|
|`fetchTask`|Boolean|||A boolean value that indicates if it should fetch the task module dynamically|
|`taskInfo`|Object|||Specify the task module to preload when using a messaging extension command|
|`taskInfo.title`|String|64||Initial dialog title|
|`taskInfo.width`|String|||Dialog width - either a number in pixels or default layout such as 'large', 'medium', or 'small'|
|`taskInfo.height`|String|||Dialog height - either a number in pixels or default layout such as 'large', 'medium', or 'small'|
|`taskInfo.url`|String|||Initial webview URL|
|`parameters`|Array of object|5|✔|The list of parameters the command takes. Minimum: 1; maximum: 5|
|`parameter.name`|String|64 characters|✔|The name of the parameter as it appears in the client. This is included in the user request.|
|`parameter.title`|String|32 characters|✔|User-friendly title for the parameter.|
|`parameter.description`|String|128 characters||User-friendly string that describes this parameter’s purpose.|
|`parameter.inputType`|String|128 characters||Defines the type of control displayed on a task module for `fetchTask: true`. One of `text`, `textarea`, `number`, `date`, `time`, `toggle`, `choiceset`|
|`parameter.choices`|Array of Objects|10||The choice options for the `choiceset`. Use only when `parameter.inputType` is `choiceset`|
|`parameter.choices.title`|String|128||Title of the choice|
|`parameter.choices.value`|String|512||Value of the choice|

## permissions

**Optional** — array of strings

An array of `string` which specifies which permissions the app requests, which lets end users know how the extension will perform. The following options are non-exclusive:

* `identity` &emsp; Requires user identity information
* `messageTeamMembers` &emsp; Requires permission to send direct messages to team members

Changing these permissions when updating your app will cause your users to repeat the consent process the first time they run the updated app. See [Updating your app](~/concepts/deploy-and-publish/appsource/post-publish/overview.md) for more information.

## devicePermissions

**Optional** — array of strings

Specifies the native features on a user's device that your app may request access to. Options are:

* `geolocation`
* `media`
* `notifications`
* `midi`
* `openExternal`

## validDomains

**Optional**, except **Required** where noted

A list of valid domains for websites the app expects to load within the Teams client. Domain listings can include wildcards, for example `*.example.com`. This matches exactly one segment of the domain; if you need to match `a.b.example.com` then use `*.*.example.com`. If your tab configuration or content UI needs to navigate to any other domain besides the one use for tab configuration, that domain must be specified here.

It is **not** necessary to include the domains of identity providers you want to support in your app, however. For example, to authenticate using a Google ID, it's necessary to redirect to accounts.google.com, but you should not include accounts.google.com in `validDomains[]`.

Teams apps that require their own sharepoint URLs to function well, may include "{teamsitedomain}" in their valid domain list.

> [!IMPORTANT]
> Do not add domains that are outside your control, either directly or via wildcards. For example, `yourapp.onmicrosoft.com` is valid, but `*.onmicrosoft.com` is not valid.

The object is an array with all elements of the type `string`.

## webApplicationInfo

**Optional**

Specify your AAD App ID and Graph information to help users seamlessly sign into your AAD app.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`id`|String|36 characters|✔|AAD application id of the app. This id must be a GUID.|
|`resource`|String|2048 characters|✔|Resource url of app for acquiring auth token for SSO.|
