---
title: Manifest schema reference
description: Describes the manifest schema for Microsoft Teams
ms.topic: reference
ms.author: lajanuar
keywords: teams manifest schema
---

# Reference: Manifest schema for Microsoft Teams

The Teams manifest describes how the app integrates into the Microsoft Teams product. Your manifest must conform to the schema hosted at [`https://developer.microsoft.com/json-schemas/teams/v1.9/MicrosoftTeams.schema.json`]( https://developer.microsoft.com/json-schemas/teams/v1.9/MicrosoftTeams.schema.json). Previous versions 1.0-1.4 are also supported (using "v1.x" in the URL).

The following schema sample shows all extensibility options.

## Sample full manifest

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/teams/v1.9/MicrosoftTeams.schema.json",
  "manifestVersion": "1.9",
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
      "context":[
        "channelTab",
        "privateChatTab",
        "meetingChatTab",
        "meetingDetailsTab",
        "meetingSidePanel",
        "meetingStage"
      ],
      "sharePointPreviewImage": "Relative path to a tab preview image for use in SharePoint — 1024px X 768",
      "supportedSharePointHosts": [
         "sharePointFullPage",
         "sharePointWebPart"
      ]
    }
  ],
  "staticTabs": [
    {
      "entityId": "unique Id for the page entity",
      "scopes": [
        "personal"
      ],
      "context":[
        "personalTab",
        "channelTab"
        ],
      "name": "Display name of tab",
      "contentUrl": "https://contoso.com/content (displayed in Teams canvas)",
      "websiteUrl": "https://contoso.com/content (displayed in web browser)",
       "searchUrl":  "https://contoso.com/content (displayed in web browser)"
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
      "supportsCalling": false,
      "supportsVideo": true,
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
      "ChannelSettings.Read.Group",
      "ChannelSettings.Edit.Group",
      "Channel.Create.Group",
      "Channel.Delete.Group",
      "ChannelMessage.Read.Group",
      "TeamsApp.Read.Group",
      "TeamsTab.Read.Group",
      "TeamsTab.Create.Group",
      "TeamsTab.Edit.Group",
      "TeamsTab.Delete.Group",
      "Member.Read.Group",
      "Owner.Read.Group",
      "Member.ReadWrite.Group",
      "Owner.ReadWrite.Group"
    ],
  },
  "showLoadingIndicator": false,
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
  },
  "defaultInstallScope": "meetings",
  "defaultGroupCapability": {"meetings": "tab" , "team": "bot", "groupchat": "bot"}
}
```

The schema defines the following properties:

## $schema

Optional, but recommended — string

The https:// URL referencing the JSON Schema for the manifest.

## manifestVersion

**Required** — string

The version of manifest schema this manifest is using. It must be 1.9.

## version

**Required** — string

The version of a specific app. If you update something in your manifest, the version must be incremented too. This way, when the new manifest is installed, it overwrites the existing one and the user receives the new functionality. If this app was submitted to the store, the new manifest must be re-submitted and re-validated. The app users receive the new updated manifest automatically within few hours after the manifest is approved.

If the app requests for permissions change, the users are prompted to upgrade and re-consent to the app.

This version string must follow the [semver](http://semver.org/) standard (MAJOR.MINOR.PATCH).

## id

**Required** — Microsoft app ID

The ID is a unique Microsoft-generated identifier for the app. You have an ID if your bot is registered through the Microsoft Bot Framework or your tab's web app already signs in with Microsoft. You must enter the ID here. Otherwise, you must generate a new ID at the Microsoft Application Registration Portal ([My Applications](https://apps.dev.microsoft.com)). Use the same ID if you add a bot.

> [!NOTE]
> If you are submitting an update to your existing app in AppSource, the ID in your manifest must not be modified.

## developer

**Required** — object

Gives information about your company. For apps submitted to AppSource (formerly Office Store), these values must match the information in your AppSource entry. See the [publishing guidelines](~/concepts/deploy-and-publish/appsource/prepare/frequently-failed-cases.md) for additional information.

|Name| Maximum size | Required | Description|
|---|---|---|---|
|`name`|32 characters|✔|The display name for the developer.|
|`websiteUrl`|2048 characters|✔|The https:// URL to the developer's website. This link must take users to your company or product-specific landing page.|
|`privacyUrl`|2048 characters|✔|The https:// URL to the developer's privacy policy.|
|`termsOfUseUrl`|2048 characters|✔|The https:// URL to the developer's terms of use.|
|`mpnId`|10 characters| |**Optional** The Microsoft Partner Network ID that identifies the partner organization building the app.|

## name

**Required** — object

The name of your app experience, displayed to users in the Teams experience. For apps submitted to AppSource, these values must match the information in your AppSource entry. The values of `short` and `full` must be different.

|Name| Maximum size | Required | Description|
|---|---|---|---|
|`short`|30 characters|✔|The short display name for the app.|
|`full`|100 characters||The full name of the app, used if the full app name exceeds 30 characters.|

## description

**Required** — object

Describes your app to users. For apps submitted to AppSource, these values must match the information in your AppSource entry.

Ensure that your description accurately describes your experience and provides information to help potential customers understand what your experience does. You must note in the full description, if an external account is required for use. The values of `short` and `full` must be different. Your short description must not be repeated within the long description and must not include any other app name.

|Name| Maximum size | Required | Description|
|---|---|---|---|
|`short`|80 characters|✔|A short description of your app experience, used when space is limited.|
|`full`|4000 characters|✔|The full description of your app.|

## packageName

**Optional** — string

A unique identifier for the app in reverse domain notation; for example, com.example.myapp. Maximum length: 64 characters.

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

Icons used within the Teams app. The icon files must be included as part of the upload package. See [Icons](../../concepts/build-and-test/apps-package.md#app-icons) for more information.

|Name| Maximum size | Required | Description|
|---|---|---|---|
|`outline`|32 x 32 pixels|✔|A relative file path to a transparent 32x32 PNG outline icon.|
|`color`|192 x 192 pixels|✔|A relative file path to a full color 192x192 PNG icon.|

## accentColor

**Optional** — HTML Hex color code

A color to use in conjunction with and as a background for your outline icons.

The value must be a valid HTML color code starting with '#', for example `#4464ee`.

## configurableTabs

**Optional** — array

Used when your app experience has a team channel tab experience that requires extra configuration before it is added. Configurable tabs are supported only in the teams scope (not personal), and currently only **one** tab per app is supported.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`configurationUrl`|string|2048 characters|✔|The https:// URL to use when configuring the tab.|
|`scopes`|array of enums|1|✔|Currently, configurable tabs support only the `team` and `groupchat` scopes. |
|`canUpdateConfiguration`|boolean|||A value indicating whether an instance of the tab's configuration can be updated by the user after creation. Default: **true**.|
|`context` |array of enums|6||The set of `contextItem` scopes where a tab is supported. Default: **[channelTab, privateChatTab, meetingChatTab, meetingDetailsTab]**.|
|`sharePointPreviewImage`|string|2048||A relative file path to a tab preview image for use in SharePoint. Size 1024x768. |
|`supportedSharePointHosts`|array of enums|1||Defines how your tab is made available in SharePoint. Options are `sharePointFullPage` and `sharePointWebPart` |

## staticTabs

**Optional** — array

Defines a set of tabs that can be "pinned" by default, without the user adding them manually. Static tabs declared in `personal` scope are always pinned to the app's personal experience. Static tabs declared in the `team` scope are currently not supported.

This item is an array (maximum of 16 elements) with all elements of the type `object`. This block is required only for solutions that provide a static tab solution.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`entityId`|string|64 characters|✔|A unique identifier for the entity that the tab displays.|
|`name`|string|128 characters|✔|The display name of the tab in the channel interface.|
|`contentUrl`|string||✔|The https:// URL that points to the entity UI to be displayed in the Teams canvas.|
|`websiteUrl`|string|||The https:// URL to point to if a user opts to view in a browser.|
|`searchUrl`|string|||The https:// URL to point to for a user's search queries.|
|`scopes`|array of enums|1|✔|Currently, static tabs support only the `personal` scope, which means it can be provisioned only as part of the personal experience.|
|`context` | array of enums| 2|| The set of `contextItem` scopes where a tab is supported.|

> [!NOTE]
> If your tabs require context-dependent information to display relevant content or for initiating an authentication flow, *see* [Get context for your Microsoft Teams tab](../../tabs/how-to/access-teams-context.md).

## bots

**Optional** — array

Defines a bot solution, along with optional information such as default command properties.

The item is an array (maximum of only 1 element&mdash;currently only one bot is allowed per app) with all elements of the type `object`. This block is required only for solutions that provide a bot experience.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`botId`|string|64 characters|✔|The unique Microsoft app ID for the bot as registered with the Bot Framework. This may well be the same as the overall [app ID](#id).|
|`scopes`|array of enums|3|✔|Specifies whether the bot offers an experience in the context of a channel in a `team`, in a group chat (`groupchat`), or an experience scoped to an individual user alone (`personal`). These options are non-exclusive.|
|`needsChannelSelector`|boolean|||Describes whether or not the bot utilizes a user hint to add the bot to a specific channel. Default: **`false`**|
|`isNotificationOnly`|boolean|||Indicates whether a bot is a one-way, notification-only bot, as opposed to a conversational bot. Default: **`false`**|
|`supportsFiles`|boolean|||Indicates whether the bot supports the ability to upload/download files in personal chat. Default: **`false`**|
|`supportsCalling`|boolean|||A value indicating where a bot supports audio calling. **IMPORTANT**: This property is currently experimental. Experimental properties may not be complete, and may undergo changes before becoming fully available.  It is provided for testing and exploration purposes only and must not be used in production applications. Default: **`false`**|
|`supportsVideo`|boolean|||A value indicating where a bot supports video calling. **IMPORTANT**: This property is currently experimental. Experimental properties may not be complete, and may undergo changes before becoming fully available.  It is provided for testing and exploration purposes only and must not be used in production applications. Default: **`false`**|

### bots.commandLists

An optional list of commands that your bot can recommend to users. The object is an array (maximum of 2 elements) with all elements of type `object`; you must define a separate command list for each scope that your bot supports. See [Bot menus](~/bots/how-to/create-a-bot-commands-menu.md) for more information.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`items.scopes`|array of enums|3|✔|Specifies the scope for which the command list is valid. Options are `team`, `personal`, and `groupchat`.|
|`items.commands`|array of objects|10|✔|An array of commands the bot supports:<br>`title`: the bot command name (string, 32)<br>`description`: a simple description or example of the command syntax and its argument (string, 128)|

### bots.commandLists.commands

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|title|string|12|✔|The bot command name|
|description|string|128 characters|✔|A simple text description or an example of the command syntax and its arguments.|

## connectors

**Optional** — array

The `connectors` block defines an Office 365 Connector for the app.

The object is an array (maximum of 1 element) with all elements of type `object`. This block is required only for solutions that provide a Connector.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`configurationUrl`|string|2048 characters|✔|The https:// URL to use when configuring the connector.|
|`scopes`|array of enums|1|✔|Specifies whether the Connector offers an experience in the context of a channel in a `team`, or an experience scoped to an individual user alone (`personal`). Currently, only the `team` scope is supported.|
|`connectorId`|string|64 characters|✔|A unique identifier for the Connector that matches its ID in the [Connectors Developer Dashboard](https://aka.ms/connectorsdashboard).|

## composeExtensions

**Optional** — array

Defines a messaging extension for the app.

> [!NOTE]
> The name of the feature was changed from "compose extension" to "messaging extension" in November, 2017, but the manifest name remains the same so that existing extensions continue to function.

The item is an array (maximum of 1 element) with all elements of type `object`. This block is required only for solutions that provide a messaging extension.

|Name| Type | Maximum Size | Required | Description|
|---|---|---|---|---|
|`botId`|string|64|✔|The unique Microsoft app ID for the bot that backs the messaging extension, as registered with the Bot Framework. This may well be the same as the overall App ID.|
|`commands`|array of objects|10|✔|Array of commands the messaging extension supports|
|`canUpdateConfiguration`|boolean|||A value indicating whether the configuration of a messaging extension can be updated by the user. Default: **false**.|
|`messageHandlers`|array of Objects|5||A list of handlers that allow apps to be invoked when certain conditions are met.|
|`messageHandlers.type`|string|||The type of message handler. Must be `"link"`.|
|`messageHandlers.value.domains`|array of Strings|||Array of domains that the link message handler can register for.|

### composeExtensions.commands

Your messaging extension must declare one or more commands. Each command appears in Microsoft Teams as a potential interaction from the UI-based entry point. There is a maximum of 10 commands.

Each command item is an object with the following structure:

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`id`|string|64 characters|✔|The ID for the command.|
|`title`|string|32 characters|✔|The user-friendly command name.|
|`type`|string|64 characters||Type of the command. One of `query` or `action`. Default: **query**.|
|`description`|string|128 characters||The description that appears to users to indicate the purpose of this command.|
|`initialRun`|boolean|||A boolean value indicates whether the command runs initially with no parameters. Default is **false**.|
|`context`|array of Strings|3||Defines where the message extension can be invoked from. Any combination of`compose`,`commandBox`,`message`. Default is `["compose","commandBox"]`.|
|`fetchTask`|boolean|||A boolean value that indicates if it must fetch the task module dynamically. Default is **false**.|
|`taskInfo`|object|||Specify the task module to pre-load when using a messaging extension command.|
|`taskInfo.title`|string|64 characters||Initial dialog title.|
|`taskInfo.width`|string|||Dialog width - either a number in pixels or default layout such as 'large', 'medium', or 'small'.|
|`taskInfo.height`|string|||Dialog height - either a number in pixels or default layout such as 'large', 'medium', or 'small'.|
|`taskInfo.url`|string|||Initial webview URL.|
|`parameters`|array of object|5 items|✔|The list of parameters the command takes. Minimum: 1; maximum: 5.|
|`parameters.name`|string|64 characters|✔|The name of the parameter as it appears in the client. This is included in the user request.|
|`parameters.title`|string|32 characters|✔|User-friendly title for the parameter.|
|`parameters.description`|string|128 characters||User-friendly string that describes this parameter’s purpose.|
|`parameters.value`|string|512 characters||Initial value for the parameter.|
|`parameters.inputType`|string|128 characters||Defines the type of control displayed on a task module for`fetchTask: true` . One of `text, textarea, number, date, time, toggle, choiceset` .|
|`parameters.choices`|array of objects|10 items||The choice options for the`choiceset`. Use only when`parameter.inputType` is `choiceset`.|
|`parameters.choices.title`|string|128 characters|✔|Title of the choice.|
|`parameters.choices.value`|string|512 characters|✔|Value of the choice.|

## permissions

**Optional** — array of strings

An array of `string` which specifies which permissions the app requests, which lets end users know how the extension performs. The following options are non-exclusive:

* `identity` &emsp; Requires user identity information
* `messageTeamMembers` &emsp; Requires permission to send direct messages to team members

Changing these permissions during app update, causes your users to repeat the consent process after they run the updated app. See [Updating your app](~/concepts/deploy-and-publish/appsource/post-publish/overview.md) for more information.

## devicePermissions

**Optional** — array of strings

Provides the native features on a user's device that your app requests access to. Options are:

* `geolocation`
* `media`
* `notifications`
* `midi`
* `openExternal`

## validDomains

**Optional**, except **Required** where noted

A list of valid domains for websites the app expects to load within the Teams client. Domain listings can include wildcards, for example, `*.example.com`. This matches exactly one segment of the domain; if you need to match `a.b.example.com` then use `*.*.example.com`. If your tab configuration or content UI needs to navigate to any other domain besides the one use for tab configuration, that domain must be specified here.

It is **not** necessary to include the domains of identity providers you want to support in your app. For example, to authenticate using a Google ID, it is required to redirect to accounts.google.com, however, you must not include accounts.google.com in `validDomains[]`.

Teams apps that require their own sharepoint URLs to function well, includes "{teamsitedomain}" in their valid domain list.

> [!IMPORTANT]
> Do not add domains that are outside your control, either directly or through wildcards. For example, `yourapp.onmicrosoft.com` is valid, however, `*.onmicrosoft.com` is not valid.

The object is an array with all elements of the type `string`.

## webApplicationInfo

**Optional** — object

Provide your Azure Active Directory (AAD) App ID and Microsoft Graph information to help users seamlessly sign into your app. If your app is registered in AAD, you must provide the App ID, so that administrators can easily review permissions and grant consent in Teams admin center.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`id`|string|36 characters|✔|AAD application id of the app. This id must be a GUID.|
|`resource`|string|2048 characters|✔|Resource URL of app for acquiring auth token for SSO. </br> **NOTE:** If you are not using SSO, ensure that you enter a dummy string value in this field to your app manifest, for example, https://notapplicable to avoid an error response. |
|`applicationPermissions`|array of strings|128 characters||Specify granular [resource specific consent](../../graph-api/rsc/resource-specific-consent.md#resource-specific-permissions).|

## showLoadingIndicator

**Optional** — boolean

Indicates whether or not to show the loading indicator when an app or tab is loading. Default is **false**.
>[!NOTE]
>If you select`showLoadingIndicator` as true in your app manifest, to load the page correctly, modify the content pages of your tabs and task modules as described in [Show a native loading indicator](../../tabs/how-to/create-tab-pages/content-page.md#show-a-native-loading-indicator) document.


## isFullScreen

 **Optional** — boolean

Indicate where a personal app is rendered with or without a tab header bar. Default is **false**.

## activities

**Optional** — object

Define the properties your app uses to post a user activity feed.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`activityTypes`|array of Objects|128 items| | Provide the types of activities that your app can post to a users activity feed.|

### activities.activityTypes

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`type`|string|32 characters|✔|The notification type. *See below*.|
|`description`|string|128 characters|✔|A brief description of the notification. *See below*.|
|`templateText`|string|128 characters|✔|Ex: "{actor} created task {taskId} for you"|

```json
{
   "activities":{
      "activityTypes":[
         {
            "type":"taskCreated",
            "description":"Task Created Activity",
            "templateText":"{actor} created task {taskId} for you"
         },
         {
            "type":"teamMention",
            "description":"Team Mention Activity",
            "templateText":"{actor} mentioned team"
         },
         {
            "type":"channelMention",
            "description":"Channel Mention Activity",
            "templateText":"{actor} mentioned channel"
         },
         {
            "type":"userMention",
            "description":"Personal Mention Activity",
            "templateText":"{actor} mentioned user"
         },
         {
            "type":"calendarForward",
            "description":"Forwarding a Calendar Event",
            "templateText":"{actor} sent user an invite on behalf of {eventOwner}"
         },
         {
            "type":"calendarForward",
            "description":"Forwarding a Calendar Event",
            "templateText":"{actor} sent user an invite on behalf of {eventOwner}"
         },
         {
            "type":"creatorTaskCreated",
            "description":"Created Task Created",
            "templateText":"The Creator created task {taskId} for you"
         }
      ]
   }
}
```

***
>
>
