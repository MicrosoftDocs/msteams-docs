---
title: Public developer preview manifest schema reference
description: Learn how to enable the developer preview. Sample public developer preview manifest schema for Microsoft Teams.
ms.topic: reference
ms.localizationpriority: medium
ms.date: 11/15/2021
---
# Public developer preview manifest schema for Teams

For information on how to enable developer preview, see [public developer preview for Microsoft Teams](~/resources/dev-preview/developer-preview-intro.md).

> [!NOTE]
> If you aren't using developer preview features, including running [Teams personal tabs and message extensions in Outlook and Microsoft 365 app](../../m365-apps/overview.md), use the [app manifest for GA features](~/resources/schema/manifest-schema.md) instead.

The Microsoft Teams manifest describes how the app integrates into the Microsoft Teams platform. Your manifest must conform to the schema hosted at [`https://raw.githubusercontent.com/OfficeDev/microsoft-teams-app-schema/preview/DevPreview/MicrosoftTeams.schema.json`](https://raw.githubusercontent.com/OfficeDev/microsoft-teams-app-schema/preview/DevPreview/MicrosoftTeams.schema.json).

## Sample manifest

```json
{
    "$schema": "https://raw.githubusercontent.com/OfficeDev/microsoft-teams-app-schema/preview/DevPreview/MicrosoftTeams.schema.json",
    "manifestVersion": "devPreview",
    "version": "1.0.0",
    "id": "%MICROSOFT-APP-ID%",
    "devicePermissions": [
        "geolocation",
        "media"
    ],
    "developer": {
        "name": "Publisher Name",
        "websiteUrl": "https://website.com/",
        "privacyUrl": "https://website.com/privacy",
        "termsOfUseUrl": "https://website.com/app-tos",
        "mpnId": "1234567890"
    },
    "localizationInfo": {
        "defaultLanguageTag": "es-es",
        "additionalLanguages": [
            {
                "languageTag": "en-us",
                "file": "en-us.json"
            }
        ]
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
            "configurationUrl": "https://contoso.com/teamstab/configure",
            "canUpdateConfiguration": true,
            "scopes": [
                "team",
                "groupchat"
            ],
            "context": []
        }
    ],
    "staticTabs": [
        {
            "entityId": "idForPage",
            "name": "Display name of tab",
            "contentUrl": "https://contoso.com/content?host=msteams",
            "contentBotId": "Specifies to the app that tab is an Adaptive Card Tab. You can either provide the contentBotId or contentUrl.",
            "websiteUrl": "https://contoso.com/content",
            "scopes": [
                "personal"
            ]
        }
    ],
    "bots": [
        {
            "botId": "%MICROSOFT-APP-ID-REGISTERED-WITH-BOT-FRAMEWORK%",
            "needsChannelSelector": false,
            "isNotificationOnly": false,
            "scopes": [
                "team",
                "personal",
                "groupchat"
            ],
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
                            "title": "Command N",
                            "description": "Description of Command N"
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
            "configurationUrl": "https://contoso.com/teamsconnector/configure",
            "scopes": [
                "team"
            ]
        }
    ],
    "composeExtensions": [
        {
            "botId": "%MICROSOFT-APP-ID-REGISTERED-WITH-BOT-FRAMEWORK%",
            "canUpdateConfiguration": true,
            "commands": [
                {
                    "id": "exampleCmd1",
                    "title": "Example Command",
                    "description": "Command Description; e.g., Search on the web",
                    "initialRun": true,
                    "type": "search",
                    "context": [
                        "compose",
                        "commandBox"
                    ],
                    "parameters": [
                        {
                            "name": "keyword",
                            "title": "Search keywords",
                            "description": "Enter the keywords to search for"
                        }
                    ]
                },
                {
                    "id": "exampleCmd2",
                    "title": "Example Command 2",
                    "description": "Command Description; e.g., Search for a customer",
                    "initialRun": true,
                    "type": "action",
                    "fetchTask": true,
                    "context": [
                        "message"
                    ],
                    "parameters": [
                        {
                            "name": "custinfo",
                            "title": "Customer name",
                            "description": "Enter a customer name",
                            "inputType": "text"
                        }
                    ]
                },
                {
                    "id": "exampleMessageHandler",
                    "title": "Message Handler",
                    "description": "Domains that will create a preview when pasted into the compose box",
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
            ]
        }
    ],
    "permissions": [
        "identity",
        "messageTeamMembers"
    ],
    "validDomains": [
        "contoso.com",
        "mysite.someplace.com",
        "othersite.someplace.com"
    ],
    "webApplicationInfo": {
        "id": "AAD App ID",
        "resource": "Resource URL for acquiring auth token for SSO"
    },
    "authorization": {
        "permissions": {
            "resourceSpecific": [
                {
                    "type": "Application",
                    "name": "ChannelSettings.Read.Group"
                },
                {
                    "type": "Delegated",
                    "name": "ChannelMeetingParticipant.Read.Group"
                }
            ]
        }
    },
    "configurableProperties": [
        "name",
        "shortDescription",
        "longDescription",
        "smallImageUrl",
        "largeImageUrl",
        "accentColor",
        "developerUrl",
        "privacyUrl",
        "termsOfUseUrl"
    ],
    "defaultInstallScope": "meetings",
    "defaultGroupCapability": {
        "meetings": "tab",
        "team": "bot",
        "groupchat": "bot"
    },
    "subscriptionOffer": {
        "offerId": "publisherId.offerId"
    },
    "meetingExtensionDefinition": {
        "scenes": [
            {
                "id": "9082c811-7e6a-4174-8173-6ccd57d377e6",
                "name": "Getting started sample",
                "file": "scenes/sceneMetadata.json",
                "preview": "scenes/scenePreview.png",
                "maxAudience": 15,
                "seatsReservedForOrganizersOrPresenters": 0
            },
            {
                "id": "afeaed22-f89b-48e1-98b4-46a514344e4a",
                "name": "Sample-1",
                "file": "scenes/sceneMetadata.json",
                "preview": "scenes/scenePreview.png",
                "maxAudience": 15,
                "seatsReservedForOrganizersOrPresenters": 3
            }
        ]
    }
}
```

The schema defines the following properties:

## $schema

*Optional, but recommended* &ndash; String

The `https://` URL referencing the JSON Schema for the manifest.

## manifestVersion

**Required** &ndash; String

The version of the manifest schema this manifest is using.

## version

**Required** &ndash; String

The version of the specific app. If you update something in your manifest, the version must be incremented as well. This way, when the new manifest is installed, it will overwrite the existing one and the user will get the new functionality. If this app was submitted to the store, the new manifest will have to be resubmitted and revalidated. Then, users of this app will get the new updated manifest automatically in a few hours, after it's approved.

If the app requested permissions change, users will be prompted to upgrade and re-consent to the app.

This version string must follow the [semver](http://semver.org/) standard (MAJOR.MINOR.PATCH).

## id

**Required** &ndash; Microsoft app ID

The unique Microsoft-generated identifier for this app. If you've registered a bot via the Microsoft Bot Framework, or your tab's web app already signs in with Microsoft, then you should already have an ID and must enter it here. Otherwise, you must generate a new ID at the Microsoft Application Registration Portal ([My Applications](https://apps.dev.microsoft.com)), enter it here, and then reuse it when you [add a bot](~/bots/how-to/create-a-bot-for-teams.md).

## developer

Required:

Specifies information about your company. For apps submitted to AppSource (formerly Office Store), these values must match the information in your AppSource entry.

|Name| Maximum size | Required | Description|
|---|---|---|---|
|`name`|32 characters|✔️|The display name for the developer.|
|`websiteUrl`|2048 characters|✔️|The https:// URL to the developer's website. This link should take users to your company or product-specific landing page.|
|`privacyUrl`|2048 characters|✔️|The https:// URL to the developer's privacy policy.|
|`termsOfUseUrl`|2048 characters|✔️|The https:// URL to the developer's terms of use.|
|`mpnId`|10 characters|✔️|**Optional** The Microsoft Partner Network ID that identifies the partner organization building the app.|

## localizationInfo

Optional:

Allows the specification of a default language, and pointers to additional language files. See [localization](~/concepts/build-and-test/apps-localization.md).

|Name| Maximum size | Required | Description|
|---|---|---|---|
|`defaultLanguageTag`|4 characters|✔️|The language tag of the strings in this top level manifest file.|

### localizationInfo.additionalLanguages

An array of objects specifying additional language translations.

|Name| Maximum size | Required | Description|
|---|---|---|---|
|`languageTag`|4 characters|✔️|The language tag of the strings in the provided file.|
|`file`|4 characters|✔️|A relative file path to the .json file containing the translated strings.|

## name

Required:

The name of your app experience, displayed to users in the Teams experience. For apps submitted to AppSource, these values must match the information in your AppSource entry. The values of `short` and `full` shouldn't be the same.

|Name| Maximum size | Required | Description|
|---|---|---|---|
|`short`|30 characters|✔️|The short display name for the app.|
|`full`|100 characters||The full name of the app, used if the full app name exceeds 30 characters.|

## description

Required:

Describes your app to users. For apps submitted to AppSource, these values must match the information in your AppSource entry.

Ensure that your description accurately describes your experience and provides information to help potential customers understand what your experience does. You should also note, in the full description, if an external account is required for use. The values of `short` and `full` shouldn't be the same.  Your short description must not be repeated within the long description and must not include any other app name.

|Name| Maximum size | Required | Description|
|---|---|---|---|
|`short`|80 characters|✔️|A short description of your app experience, used when space is limited.|
|`full`|4000 characters|✔️|The full description of your app.|

## icons

Required:

Icons used within the Teams app. The icon files must be included as part of the upload package.

|Name| Maximum size | Required | Description|
|---|---|---|---|
|`outline`|2048 characters|✔️|A relative file path to a transparent 32x32 PNG outline icon.|
|`color`|2048 characters|✔️|A relative file path to a full color 192x192 PNG icon.|

## accentColor

**Required** &ndash; String

A color to use with and as a background for your outline icons.

The value must be a valid HTML color code starting with '#', for example `#4464ee`.

## configurableTabs

Optional:

Used when your app experience has a team channel tab experience that requires extra configuration before it's added. Configurable tabs are supported only in the teams scope, and currently only one tab per app is supported.

The object is an array with all elements of the type `object`. This block is required only for solutions that provide a configurable channel tab solution.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`configurationUrl`|String|2048 characters|✔️|The https:// URL to use when configuring the tab.|
|`canUpdateConfiguration`|Boolean|||A value indicating whether an instance of the tab's configuration can be updated by the user after creation. Default: `true`|
|`scopes`|Array of enum|1|✔️|Currently, configurable tabs support only the `team` and `groupchat` scopes. |
|`context` |array of enums|6||The set of `contextItem` scopes where a [tab is supported](../../tabs/how-to/access-teams-context.md). Default: `channelTab`, `privateChatTab`, `meetingChatTab`, `meetingDetailsTab`, `meetingSidePanel`, and `meetingStage`.|
|`sharePointPreviewImage`|String|2048||A relative file path to a tab preview image for use in SharePoint. Size 1024x768. |
|`supportedSharePointHosts`|Array of enum|1||Defines how your tab will be made available in SharePoint. Options are `sharePointFullPage` and `sharePointWebPart` |

## staticTabs

Optional:

Defines a set of tabs that can be "pinned" by default, without the user adding them manually. Static tabs declared in `personal` scope are always pinned to the app's personal experience. Static tabs declared in the `team` scope are currently not supported.

Render tabs with Adaptive Cards by specifying `contentBotId` instead of `contentUrl` in the **staticTabs** block.

The object is an array (maximum of 16 elements) with all elements of the type `object`. This block is required only for solutions that provide a static tab solution.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`entityId`|String|64 characters|✔️|A unique identifier for the entity that the tab displays.|
|`name`|String|128 characters|✔️|The display name of the tab in the channel interface.|
|`contentUrl`|String|2048 characters|✔️|The https:// URL that points to the entity UI to be displayed in the Teams canvas.|
|`contentBotId`|   | | | The Microsoft Teams app ID specified for the bot in the Bot Framework portal. |
|`websiteUrl`|String|2048 characters||The https:// URL to point at if a user opts to view in a browser.|
|`scopes`|Array of enum|1|✔️|Currently, static tabs support only the `personal` scope, which means it can be provisioned only as part of the personal experience.|

## bots

Optional:

Defines a bot solution, along with optional information such as default command properties.

The object is an array (maximum of only 1 element&mdash;currently only one bot is allowed per app) with all elements of the type `object`. This block is required only for solutions that provide a bot experience.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`botId`|String|64 characters|✔️|The unique Microsoft app ID for the bot as registered with the Bot Framework. This may well be the same as the overall [app ID](#id).|
|`needsChannelSelector`|Boolean|||Describes whether or not the bot utilizes a user hint to add the bot to a specific channel. Default: `false`|
|`isNotificationOnly`|Boolean|||Indicates whether a bot is a one-way, notification-only bot, as opposed to a conversational bot. Default: `false`|
|`supportsFiles`|Boolean|||Indicates whether the bot supports the ability to upload/download files in personal chat. Default: `false`|
|`scopes`|Array of enum|3|✔️|Specifies whether the bot offers an experience in the context of a channel in a `team`, in a group chat (`groupchat`), or an experience scoped to an individual user alone (`personal`). These options are non-exclusive.|
|`supportsCalling`|Boolean|||A value indicating where a bot supports audio calling. **IMPORTANT**: This property is currently experimental. Experimental properties might be incomplete and might undergo changes before they're fully available. The property is provided for testing and exploration purposes only and must not be used in production applications. Default: `false`|
|`supportsVideo`|Boolean|||A value indicating where a bot supports video calling. **IMPORTANT**: This property is currently experimental. Experimental properties might be incomplete and might undergo changes before they're fully available. The property is provided for testing and exploration purposes only and must not be used in production applications. Default: `false`|

### bots.commandLists

An optional list of commands that your bot can recommend to users. The object is an array (maximum of 2 elements) with all elements of type `object`; you must define a separate command list for each scope that your bot supports. For more information, see [Bot menus](~/bots/how-to/create-a-bot-commands-menu.md).

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`items.scopes`|array of enum|3|✔️|Specifies the scope for which the command list is valid. Options are `team`, `personal`, and `groupchat`.|
|`items.commands`|array of objects|10|✔️|An array of commands the bot supports:<br>`title`: the bot command name (string, 32).<br>`description`: a simple description or example of the command syntax and its argument (string, 128).|

## connectors

Optional:

The `connectors` block defines a connector for Microsoft 365 Groups for the app.

The object is an array (maximum of 1 element) with all elements of type `object`. This block is required only for solutions that provide a Connector.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`configurationUrl`|String|2048 characters|✔️|The https:// URL to use when configuring the connector.|
|`connectorId`|String|64 characters|✔️|A unique identifier for the Connector that matches its ID in the [Connectors Developer Dashboard](https://aka.ms/connectorsdashboard).|
|`scopes`|Array of enum|1|✔️|Specifies whether the Connector offers an experience in the context of a channel in a `team`, or an experience scoped to an individual user alone (`personal`). Currently, only the `team` scope is supported.|

## composeExtensions

Optional:

Defines a message extension for the app.

> [!NOTE]
> The name of the feature was changed from "compose extension" to "message extension" in November, 2017, but the manifest name remains the same so that existing extensions continue to function.

The object is an array (maximum of 1 element) with all elements of type `object`. This block is required only for solutions that provide a message extension.

|Name| Type | Maximum Size | Required | Description|
|---|---|---|---|---|
|`botId`|String|64|✔️|The unique Microsoft app ID for the bot that backs the message extension, as registered with the Bot Framework. This may well be the same as the overall [app ID](#id).|
|`canUpdateConfiguration`|Boolean|||A value indicating whether the configuration of a message extension can be updated by the user. The default is `false`.|
|`commands`|Array of object|10|✔️|Array of commands the message extension supports|

### composeExtensions.commands

Your message extension should declare one or more commands. Each command appears in Teams as a potential interaction from the UI-based entry point. There's a maximum of 10 commands.

Each command item is an object with the following structure:

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`id`|String|64 characters|✔️|The ID for the command.|
|`type`|String|64 characters||Type of the command. One of `query` or `action`. Default: `query`|
|`title`|String|32 characters|✔️|The user-friendly command name.|
|`description`|String|128 characters||The description that appears to users to indicate the purpose of this command.|
|`initialRun`|Boolean|||A Boolean value that indicates whether the command should be run initially with no parameters. Default: `false`|
|`context`|Array of Strings|3||Defines where the message extension can be invoked from. Any combination of `compose`, `commandBox`, `message`. Default is `["compose", "commandBox"]`|
|`fetchTask`|Boolean|||A Boolean value that indicates if it should fetch the dialog (task module) dynamically.|
|`taskInfo`|Object|||Specify the dialog (task module) to preload when using a message extension command.|
|`taskInfo.title`|String|64||Initial dialog title.|
|`taskInfo.width`|String|||Dialog width - either a number in pixels or default layout such as 'large', 'medium', or 'small'.|
|`taskInfo.height`|String|||Dialog height - either a number in pixels or default layout such as 'large', 'medium', or 'small'.|
|`taskInfo.url`|String|||Initial webview URL.|
|`messageHandlers`|Array of Objects|5||A list of handlers that allow apps to be invoked when certain conditions are met. Domains must also be listed in `validDomains`.|
|`messageHandlers.type`|String|||The type of message handler. Must be `"link"`.|
|`messageHandlers.value.domains`|Array of Strings|||Array of domains that the link message handler can register for.|
|`messageHandlers.supportsAnonymizedPayloads`|Boolean|||A boolean value that indicates whether the app's link message handler supports anonymous invoke flow. The default value is `false`. To enable zero install for link unfurling, the value needs to be set to `true`. <br/> **Note**: The property `supportAnonymousAccess` is superseded by `supportsAnonymizedPayloads`.|
|`parameters`|Array of object|5|✔️|The list of parameters the command takes. Minimum: 1; maximum: 5|
|`parameter.name`|String|64 characters|✔️|The name of the parameter as it appears in the client. This is included in the user request.|
|`parameter.title`|String|32 characters|✔️|User-friendly title for the parameter.|
|`parameter.description`|String|128 characters||User-friendly string that describes this parameter’s purpose.|
|`parameter.inputType`|String|128 characters||Defines the type of control displayed on a dialog for `fetchTask: true`. One of `text`, `textarea`, `number`, `date`, `time`, `toggle`, `choiceset`.|
|`parameter.choices`|Array of Objects|10||The choice options for the `choiceset`. Use only when `parameter.inputType` is `choiceset`.|
|`parameter.choices.title`|String|128||Title of the choice.|
|`parameter.choices.value`|String|512||Value of the choice.|

## permissions

Optional:

An array of `string`, which specifies which permissions the app requests, which let end users know how the extension will perform. The following options are non-exclusive:

* `identity` &emsp; Requires user identity information.
* `messageTeamMembers` &emsp; Requires permission to send direct messages to team members.

Changing these permissions when updating your app will cause your users to repeat the consent process the first time they run the updated app.

## devicePermissions

**Optional** Array of Strings

Specifies the native features on a user's device that your app may request access to. Options are:

* `geolocation`
* `media`
* `notifications`
* `midi`
* `openExternal`

## validDomains

**Optional**, except **Required** where noted

A list of valid domains from which the app expects to load any content. Domain listings can include wildcards, for example `*.example.com`. This matches exactly one segment of the domain; if you need to match `a.b.example.com` then use `*.*.example.com`. If your tab configuration or content UI needs to go to any other domain besides the one use for tab configuration, that domain must be specified here.

It is **not** necessary to include the domains of identity providers you want to support in your app, however. For example, to authenticate using a Google ID, it's necessary to redirect to accounts.google.com, but you shouldn't include accounts.google.com in `validDomains[]`.

> [!IMPORTANT]
> Do not add domains that are outside your control, either directly or via wildcards. For example, `yourapp.onmicrosoft.com` is valid, but `*.onmicrosoft.com` is not valid.

The object is an array with all elements of the type `string`.

## webApplicationInfo

Optional:

Specify your Microsoft Azure Active Directory (Azure AD) App ID and Graph information to help users seamlessly sign into your Azure AD app.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`id`|String|36 characters|✔️|Microsoft Azure Active Directory (Azure AD) application ID of the app. This ID must be a GUID.|
|`resource`|String|2048 characters|✔️|Resource URL of the app for acquiring auth token for SSO.|
|`applicationPermissions`|Array|Maximum 100 items|✔️|Resource permissions for application.|

## graphConnector

**Optional**—object

Specify the app's Graph connector configuration. If this is present, then [webApplicationInfo.id](#webapplicationinfo) must also be specified.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`notificationUrl`|string|2048 characters|✔️|The url where Graph-connector notifications for the application should be sent.|

## showLoadingIndicator

**Optional**—Boolean

Indicates whether or not to show the loading indicator when an app or tab is loading. Default is **false**.
> [!NOTE]
>
> * If you select`showLoadingIndicator` as true in your app manifest, to load the page correctly, modify the content pages of your tabs and dialogs as described in [Show a native loading indicator](../../tabs/how-to/create-tab-pages/content-page.md#show-a-native-loading-indicator) document.
> * If you don't modify the content pages of your tab, the tab app doesn't load and shows the error `There was a problem reaching this app`.

## isFullScreen

 **Optional**—Boolean

Indicate where a personal app is rendered with or without a tab header bar. Default is **false**.

> [!NOTE]
> `isFullScreen` works only for apps published to your organization.

## activities

**Optional**—object

Define the properties your app uses to post a user activity feed.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`activityTypes`|array of Objects|128 items| | Provide the types of activities that your app can post to a users activity feed.|

### activities.activityTypes

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`type`|string|32 characters|✔️|The notification type. *See below*.|
|`description`|string|128 characters|✔️|A brief description of the notification. *See below*.|
|`templateText`|string|128 characters|✔️|Ex: "{actor} created task {taskId} for you"|

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

## configurableProperties

**Optional** - array

The `configurableProperties` block defines the app properties that Teams admins can customize. For more information, see [enable app customization](~/concepts/design/enable-app-customization.md).

> [!NOTE]
> A minimum of one property must be defined. You can define a maximum of nine properties in this block.

You can define any of the following properties:

* `name`: The app's display name.
* `shortDescription`: The app's short description.
* `longDescription`: The app's detailed description.
* `smallImageUrl`: The app's outline icon.
* `largeImageUrl`: The app's color icon.
* `accentColor`: The color to use with and as a background for your outline icons.
* `developerUrl`: The HTTPS URL of the developer's website.
* `privacyUrl`: The HTTPS URL of the developer's privacy policy.
* `termsOfUseUrl`: The HTTPS URL of the developer's terms of use.

## supportedChannelTypes

**Optional** - array

Enables your app in non-standard channels. If your app supports a team scope and this property is defined, Teams enables your app in each channel type accordingly. Currently, the private and shared channel types are supported.

> [!NOTE]
>
> * If your app supports a team scope, it functions in the standard channels regardless of the values that are defined in this property.
> * Your app can account for the unique properties of each of the channel types to function properly. To enable your tab for private and shared channels, see [retrieve context in private channels](~/tabs/how-to/access-teams-context.md#retrieve-context-in-private-channels) and [get context in shared channels](../../tabs/how-to/access-teams-context.md#get-context-in-shared-channels)

## defaultInstallScope

**Optional** - string

Specifies the install scope defined for this app by default. The defined scope will be the option displayed on the button when a user tries to add the app. Options are:

* `personal`
* `team`
* `groupchat`
* `meetings`

## defaultGroupCapability

**Optional** - object

When a group install scope is selected, it will define the default capability when the user installs the app. Options are:

* `team`
* `groupchat`
* `meetings`

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`team`|string|||When the install scope selected is `team`, this field specifies the default capability available. Options: `tab`, `bot`, or `connector`.|
|`groupchat`|string|||When the install scope selected is `groupchat`, this field specifies the default capability available. Options: `tab`, `bot`, or `connector`.|
|`meetings`|string|||When the install scope selected is `meetings`, this field specifies the default capability available. Options: `tab`, `bot`, or `connector`.|

## subscriptionOffer

**Optional** - object

Specifies the SaaS offer associated with your app.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`offerId`| string | 2,048 characters | ✔️ | A unique identifier that includes your Publisher ID and Offer ID, which you can find in [Partner Center](https://partner.microsoft.com/dashboard). You must format the string as `publisherId.offerId`.|

## meetingExtensionDefinition

**Optional** - object

Specify meeting extension definition. For more information, see [custom Together Mode scenes in Teams](../../apps-in-teams-meetings/teams-together-mode.md).

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`scenes`|array of objects| 5 items||Meeting supported scenes.|
|`supportsStreaming`|Boolean|||A value that indicates whether an app can stream the meeting's audio and video content to a real-time meeting protocol (RTMP) endpoint. The default value is **false**.|

### meetingExtensionDefinition.scenes

|Name| Type|Maximum size|Required |Description|
|---|---|---|---|---|
|`id`|||✔️| The unique identifier for the scene. This id must be a GUID. |
|`name`| string | 128 characters |✔️| The name of the scene. |
|`file`|||✔️| The relative file path to the scenes' metadata json file. |
|`preview`|||✔️| The relative file path to the scenes' PNG preview icon. |
|`maxAudience`| integer | 50  |✔️| The maximum number of audiences supported in the scene. |
|`seatsReservedForOrganizersOrPresenters`| integer | 50 |✔️| The number of seats reserved for organizers or presenters.|

## authorization

**Optional** — object

> [!NOTE]
> `authorization` is only supported for manifest version 1.12 or later.

Specify and consolidate authorization related information for the app.

|Name| Type|Maximum size|Required |Description|
|---|---|---|---|---|
|`permissions`|NA|NA|NA|List of permissions that the app needs to function.|

### authorization.permissions

|Name| Type|Maximum size|Required |Description|
|---|---|---|---|---|
|`resourceSpecific`| array of objects|16 items|NA|Permissions that guard data access on resource instance level.|

### authorization.permissions.resourceSpecific

|Name| Type|Maximum size|Required |Description|
|---|---|---|---|---|
|`type`|string|NA|✔️| The type of the resource-specific consent (RSC) permission. Options: `Application` and `Delegated`.|
|`name`|string|128 characters|✔️|The name of the RSC permission. For more information, see [RSC application permissions](#rsc-application-permissions) and [RSC delegated permissions](#rsc-delegated-permissions)|

#### RSC application permissions

Application permissions allow the app to access data without a signed-in user. For information on application permissions, see [RSC permissions for Microsoft Graph and Microsoft BotSDK](../../graph-api/rsc/resource-specific-consent.md).

#### RSC delegated permissions

Delegated permissions allow the app to access data on behalf of the signed-in user.

* **RSC delegated permissions for a team**

    |**Name**|**Description**|
    |---|---|
    |`ChannelMeetingParticipant.Read.Group`| Allows the app to read participant information, including name, role, id, joined, and left times, of channel meetings associated with this team, on behalf of the signed-in user.|
    |`ChannelMeetingIncomingAudio.Detect.Group`| Allows the app to detect incoming audio in channel meetings associated with the team. |
    | `ChannelMeetingActiveSpeaker.Read.Group`| Allows the app to read the participants who are currently sending audio into the channel meetings associated with the team.|
    |`ChannelMeetingAudioVideo.Stream.Group`| Allows the app to stream audio-video content from channel meetings associated with the team. |
    |`InAppPurchase.Allow.Group`| Allows the app to show marketplace offers to users in the team and complete their purchases within the app, on behalf of the signed-in user.|
    |`ChannelMeetingStage.Write.Group`| Allows the app to show content on the meeting stage in channel meetings associated with the team, on behalf of the signed-in user.|
    |`LiveShareSession.ReadWrite.Group`|Allows the app to create and synchronize Live Share sessions for meetings associated with the team, and access related information about the meeting's roster, such as member's meeting role, on behalf of the signed-in user.|
    |`MeetingParticipantReaction.Read.Group`| Allows the app to read reactions of participants in channel meetings associated with the team.|

* **RSC delegated permissions for chats or meetings**

    |**Name**|**Description**|
    |---|---|
    |`InAppPurchase.Allow.Chat`|Allows the app to show marketplace offers to the users in the chat, and any associated meeting, and complete their purchases within the app, on behalf of the signed-in user.|
    |`MeetingStage.Write.Chat`|Allows the app to show content on the meeting stage in meetings associated with the chat, on behalf of the signed-in user.|
    |`OnlineMeetingParticipant.Read.Chat`|Allows the app to read participant information, including name, role, id, joined, and left times, of meeting associated with the chat, on behalf of the signed-in user.|
    |`OnlineMeetingParticipant.ToggleIncomingAudio.Chat`|Allows the app to toggle incoming audio for participants in meetings associated with the chat, on behalf of the signed-in user.|
    |`LiveShareSession.ReadWrite.Chat`|Allows the app to create and synchronize Live Share sessions for meetings associated with the chat, and access related information about the meeting's roster, such as member's meeting role, on behalf of the signed-in user.|
    |`MeetingParticipantReaction.Read.Chat`| Allows the app to read reactions of participants in meetings associated with the chat.|
    |`OnlineMeetingIncomingAudio.Detect.Chat`|Allows the app to detect changes in the status of incoming audio in meetings associated with the chat, on behalf of the signed-in user.|
    |`OnlineMeetingActiveSpeaker.Read.Chat`| Allows the app to read participants who are currently sending audio into the meetings associated with the chat.|
    |`OnlineMeetingAudioVideo.Stream.Chat`| Allows the app to stream audio-video content of meetings associated with the chat.|

* **RSC delegated permissions for users**

    |**Name**|**Description**|
    |---|---|
    |`CameraStream.Read.User`|Allows the app to read user's camera stream.|
    |`InAppPurchase.Allow.User`|Allows the app to show the user marketplace offers and complete the user's purchases within the app, on behalf of the signed-in user.|
    |`OutgoingVideoStream.Write.User`| Allows the app to modify the user's outgoing video.|
    |`MicrophoneStream.Read.User`| Allows the app to read user's microphone stream.|
    |`MeetingParticipantReaction.Read.User`| Allows the app to read user's reactions while participating in a meeting.|

## See also

* [Understand the Microsoft Teams app structure](~/concepts/design/app-structure.md)
* [Enable app customization](~/concepts/design/enable-app-customization.md)
* [Localize your app](~/concepts/build-and-test/apps-localization.md)
* [Integrate media capabilities](~/concepts/device-capabilities/media-capabilities.md)
