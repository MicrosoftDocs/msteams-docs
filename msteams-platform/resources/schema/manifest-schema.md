---
title: Manifest schema reference
description: In this article, you'll have the latest version of the public manifest schema for Microsoft Teams reference, schema and sample full manifest.
ms.topic: reference
ms.localizationpriority: high
---

# App manifest schema for Teams

The Microsoft Teams app manifest describes how your app integrates into the Microsoft Teams product. Your app manifest must conform to the schema hosted at [`https://developer.microsoft.com/json-schemas/teams/v1.16/MicrosoftTeams.schema.json`](https://developer.microsoft.com/json-schemas/teams/v1.16/MicrosoftTeams.schema.json). Previous versions 1.0, 1.1,...,1.15, and the current version is 1.16 are each supported (using "v1.x" in the URL).
For more information on the changes made in each version, see [manifest change log](https://github.com/OfficeDev/microsoft-teams-app-schema/releases).

The following table lists TeamsJS version and app manifest versions as per different app scenarios:

[!INCLUDE [pre-release-label](~/includes/teamjs-version-details.md)]

The following schema sample shows all extensibility options:

## Sample full manifest

```json
{
    "$schema": "https://developer.microsoft.com/json-schemas/teams/v1.16/MicrosoftTeams.schema.json",
    "manifestVersion": "1.16",
    "version": "1.0.0",
    "id": "%MICROSOFT-APP-ID%",
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
        "websiteUrl": "https://example.com/",
        "privacyUrl": "https://example.com/privacy",
        "termsOfUseUrl": "https://example.com/app-tos",
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
                "groupChat"
            ],
            "canUpdateConfiguration": true,
            "context": [
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
            "context": [
                "personalTab",
                "channelTab"
            ],
            "name": "Display name of tab",
            "contentUrl": "https://contoso.com/content (displayed in Teams canvas)",
            "websiteUrl": "https://contoso.com/content (displayed in web browser)",
            "searchUrl": "https://contoso.com/content (displayed in web browser)"
        }
    ],
    "bots": [
        {
            "botId": "%MICROSOFT-APP-ID-REGISTERED-WITH-BOT-FRAMEWORK%",
            "scopes": [
                "team",
                "personal",
                "groupChat"
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
                        "groupChat"
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
                        "groupChat"
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
                    "description": "Command Description; e.g., Add a customer",
                    "initialRun": true,
                    "fetchTask": false ,
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
                    "id": "exampleCmd3",
                    "title": "Example Command 3",
                    "type": "action",
                    "context": [
                        "compose",
                        "commandBox",
                        "message"
                    ],
                    "description": "Command Description; e.g., Add a customer",
                    "fetchTask": false,
                    "taskInfo": {
                        "title": "Initial dialog title",
                        "width": "Dialog width",
                        "height": "Dialog height",
                        "url": "Initial webview URL"
                    }
                }
            ],
            "messageHandlers": [
                {
                    "type": "link",
                    "value": {
                        "domains": [
                            "mysite.someplace.com",
                            "othersite.someplace.com"
                        ],
                        "supportsAnonymizedPayloads": false
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
    "defaultBlockUntilAdminAction": true,
    "publisherDocsUrl": "https://website.com/app-info",
    "defaultInstallScope": "meetings",
    "defaultGroupCapability": {
        "meetings": "tab",
        "team": "bot",
        "groupChat": "bot"
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

Optional, but recommended—string

The https:// URL referencing the JSON Schema for the manifest.

## manifestVersion

**Required**—string

The version of the manifest schema that this manifest is using. Use `1.13` to enable Teams app support in Outlook and Microsoft 365 app; use `1.12` (or earlier) for Teams-only apps.

## version

**Required**—string

The version of a specific app. When you update something in your manifest, the version must be incremented too. This way, when the new manifest is installed, it overwrites the existing one and the user receives the new functionality. When this app was submitted to the store, the new manifest must be resubmitted and revalidated. The app users receive the new updated manifest automatically within few hours after the manifest is approved.

If the app requests for permissions change, the users are prompted to upgrade and reconsent to the app.

This version string must follow the [semver](http://semver.org/) standard (MAJOR.MINOR.PATCH).

## ID

**Required**—Microsoft app ID

The ID is a unique Microsoft-generated identifier for the app. You have an ID if your bot is registered through the Microsoft Bot Framework. You have an ID if your tab's web app already signs in with Microsoft. You must enter the ID here. Otherwise, you must generate a new ID at the [Microsoft Application Registration Portal](https://aka.ms/appregistrations). Use the same ID if you add a bot.

The ID stored in Teams Admin Center is the **External App ID** and it is visible as **ExternalID** on the traces.

> [!NOTE]
> If you are submitting an update to your existing app in AppSource, the ID in your manifest must not be modified.

## developer

**Required**—object

Specifies information about your company. For apps submitted to the Teams store, these values must match the information in your store listing. For more information, see the [Teams store publishing guidelines](~/concepts/deploy-and-publish/appsource/publish.md).

|Name| Maximum size | Required | Description|
|---|---|---|---|
|`name`|32 characters|✔️|The display name for the developer.|
|`websiteUrl`|2048 characters|✔️|The https:// URL to the developer's website. This link must take users to your company or product-specific landing page.|
|`privacyUrl`|2048 characters|✔️|The https:// URL to the developer's privacy policy.|
|`termsOfUseUrl`|2048 characters|✔️|The https:// URL to the developer's terms of use.|
|`mpnId`|10 characters| |**Optional** The Microsoft Partner Network ID that identifies the partner organization building the app.|

## name

**Required**—object

The name of your app experience, displayed to users in the Teams experience. For apps submitted to AppSource, these values must match the information in your AppSource entry. The values of `short` and `full` must be different.

|Name| Maximum size | Required | Description|
|---|---|---|---|
|`short`|30 characters|✔️|The short display name for the app.|
|`full`|100 characters|✔️|The full name of the app, used if the full app name exceeds 30 characters.|

## description

**Required**—object

Describes your app to users. For apps submitted to AppSource, these values must match the information in your AppSource entry.

Ensure that your description describes your experience and helps potential customers understand what your experience does. You must note in the full description, if an external account is required for use. The values of `short` and `full` must be different. Your short description can't be repeated within the long description and must not include any other app name.

|Name| Maximum size | Required | Description|
|---|---|---|---|
|`short`|80 characters|✔️|A short description of your app experience, used when space is limited.|
|`full`|4000 characters|✔️|The full description of your app.|

## localizationInfo

**Optional**—object

Allows the specification of a default language and provides pointers to more language files. For more information, see [localization](~/concepts/build-and-test/apps-localization.md).

|Name| Maximum size | Required | Description|
|---|---|---|---|
|`defaultLanguageTag`||✔️|The language tag of the strings in this top-level manifest file.|

### localizationInfo.additionalLanguages

An array of objects specifying more language translations.

|Name| Maximum size | Required | Description|
|---|---|---|---|
|`languageTag`||✔️|The language tag of the strings in the provided file.|
|`file`||✔️|A relative file path to the .json file containing the translated strings.|

## icons

**Required**—object

Icons used within the Teams app. The icon files must be included as part of the upload package. For more information, see [Icons](../../concepts/build-and-test/apps-package.md#app-icons).

|Name| Maximum size | Required | Description|
|---|---|---|---|
|`outline`|32 x 32 pixels|✔️|A relative file path to a transparent 32x32 PNG outline icon.|
|`color`|192 x 192 pixels|✔️|A relative file path to a full color 192x192 PNG icon.|

## accentColor

**Required**—HTML Hex color code

A color to use and as a background for your color icons.

The value must be a valid HTML color code starting with '#', for example `#4464ee`.

## configurableTabs

**Optional**—array

Used when your app experience has a team channel tab experience that requires extra configuration before it's added. Configurable tabs are supported only in the `team` and `groupChat` scopes and you can configure the same tabs multiple times. However, you can define it in the manifest only once.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`configurationUrl`|string|2048 characters|✔️|The https:// URL to use when configuring the tab.|
|`scopes`|array of enums|2|✔️|Currently, configurable tabs support only the `team` and `groupChat` scopes. |
|`canUpdateConfiguration`|Boolean|||A value indicating whether an instance of the tab's configuration can be updated by the user after creation. Default: **true**.|
|`meetingSurfaces`|array of enums|2||The set of `meetingSurfaceItem` scopes where a [tab is supported](../../tabs/how-to/access-teams-context.md). Default: **[sidepanel, stage]**. |
|`context` |array of enums|8||The set of `contextItem` scopes where a [tab is supported](../../tabs/how-to/access-teams-context.md). Default: **[personalTab, channelTab, privateChatTab, meetingChatTab, meetingDetailsTab, meetingStage, callingSidepanel]**.|
|`sharePointPreviewImage`|string|2048||A relative file path to a tab preview image for use in SharePoint. Size 1024x768. |
|`supportedSharePointHosts`|array of enums|2||Defines how your tab is made available in SharePoint. Options are `sharePointFullPage` and `sharePointWebPart`. |

## staticTabs

**Optional**—array

Defines a set of tabs that can be "pinned" by default, without the user adding them manually. Static tabs declared in `personal` scope are always pinned to the app's personal experience. Static tabs declared in the `team` scope are currently not supported.

This item is an array (maximum of 16 elements) with all elements of the type `object`. This block is required only for solutions that provide a static tab solution.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`entityId`|string|64 characters|✔️|A unique identifier for the entity that the tab displays.|
|`name`|string|128 characters||The display name of the tab in the channel interface.|
|`contentUrl`|string|||The https:// URL that points to the entity UI to be displayed in the Teams canvas.|
|`contentBotId`|string|||The Microsoft app ID specified for the bot in the [Bot Framework portal](https://dev.botframework.com/bots).|
|`websiteUrl`|string|||The https:// URL to point to if a user opts to view in a browser.|
|`searchUrl`|string|||The https:// URL to point to for a user's search queries.|
|`scopes`|array of enums|3|✔️|Currently, static tabs support only the `personal` scope, which means it can be provisioned only as part of the personal experience.|
|`context` | array of enums| 8|| The set of `contextItem` scopes where a [tab is supported](../../tabs/how-to/access-teams-context.md). Default: **[personalTab, channelTab, privateChatTab, meetingChatTab, meetingDetailsTab, meetingStage, meetingSidepanel, teamLevelApp]**.|

> [!NOTE]
> The searchUrl feature is not available for the third-party developers.
> If your tabs require context-dependent information to display relevant content or for initiating an authentication flow, For more information, see [Get context for your Microsoft Teams tab](../../tabs/how-to/access-teams-context.md).

## bots

**Optional**—array

Defines a bot solution, along with optional information such as default command properties.

The item is an array (maximum of only one element&mdash;currently only one bot is allowed per app) with all elements of the type `object`. This block is required only for solutions that provide a bot experience.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`botId`|string|64 characters|✔️|The unique Microsoft app ID for the bot as registered with the Bot Framework. The ID can be the same as the overall [app ID](#id).|
|`scopes`|array of enums|3|✔️|Specifies whether the bot offers an experience in the context of a channel in a `team`, in a group chat (`groupChat`), or an experience scoped to an individual user alone (`personal`). These options are non-exclusive.|
|`needsChannelSelector`|Boolean|||Describes whether or not the bot uses a user hint to add the bot to a specific channel. Default: **`false`**|
|`isNotificationOnly`|Boolean|||Indicates whether a bot is a one-way, notification-only bot, as opposed to a conversational bot. Default: **`false`**|
|`supportsFiles`|Boolean|||Indicates whether the bot supports the ability to upload/download files in personal chat. Default: **`false`**|
|`supportsCalling`|Boolean|||A value indicating where a bot supports audio calling. **IMPORTANT**: This property is currently experimental. Experimental properties may not be complete, and may undergo changes before becoming fully available.  The property is provided for testing and exploration purposes only and must not be used in production applications. Default: **`false`**|
|`supportsVideo`|Boolean|||A value indicating where a bot supports video calling. **IMPORTANT**: This property is currently experimental. Experimental properties may not be complete, and may undergo changes before becoming fully available.  The property is provided for testing and exploration purposes only and must not be used in production applications. Default: **`false`**|

### bots.commandLists

A list of commands that your bot can recommend to users. The object is an array (maximum of two elements) with all elements of type `object`; you must define a separate command list for each scope that your bot supports. For more information, see [Bot menus](~/bots/how-to/create-a-bot-commands-menu.md).

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`items.scopes`|array of enums|3|✔️|Specifies the scope for which the command list is valid. Options are `team`, `personal`, and `groupChat`.|
|`items.commands`|array of objects|10|✔️|An array of commands the bot supports:<br>`title`: the bot command name (string, 32)<br>`description`: a simple description or example of the command syntax and its argument (string, 128).|

### bots.commandLists.commands

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|title|string|32|✔️|The bot command name.|
|description|string|128 characters|✔️|A simple text description or an example of the command syntax and its arguments.|

## connectors

**Optional**—array

The `connectors` block defines a connector card for Microsoft 365 Groups for the app.

The object is an array (maximum of one element) with all elements of type `object`. This block is required only for solutions that provide a Connector.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`configurationUrl`|string|2048 characters|✔️|The https:// URL to use when configuring the connector.|
|`scopes`|array of enums|1|✔️|Specifies whether the Connector offers an experience in the context of a channel in a `team`, or an experience scoped to an individual user alone (`personal`). Currently, only the `team` scope is supported.|
|`connectorId`|string|64 characters|✔️|A unique identifier for the Connector that matches its ID in the [Connectors Developer Dashboard](https://aka.ms/connectorsdashboard).|

## composeExtensions

**Optional**—array

Defines a message extension for the app.

> [!NOTE]
> The name of the feature was changed from "compose extension" to "message extension" in November, 2017, but the manifest name remains the same so that existing extensions continue to function.

The item is an array (maximum of one element) with all elements of type `object`. This block is required only for solutions that provide a message extension.

|Name| Type | Maximum Size | Required | Description|
|---|---|---|---|---|
|`botId`|string|64|✔️|The unique Microsoft app ID for the bot that backs the message extension, as registered with the Bot Framework. The ID can be the same as the overall App ID.|
|`commands`|array of objects|10|✔️|Array of commands the message extension supports.|
|`canUpdateConfiguration`|Boolean|||A value indicating whether the configuration of a message extension can be updated by the user. Default: **false**.|
|`messageHandlers`|array of Objects|5||A list of handlers that allow apps to be invoked when certain conditions are met.|
|`messageHandlers.type`|string|||The type of message handler. Must be `"link"`.|
|`messageHandlers.value.domains`|array of Strings|2048 characters||Array of domains that the link message handler can register for.|
|`messageHandlers.value.supportsAnonymizedPayloads`|Boolean||| A boolean value that indicates whether the app's link message handler supports anonymous invoke flow. Default is false.|

### composeExtensions.commands

Your message extension must declare one or more commands with a maximum of 10 commands. Each command appears in Microsoft Teams as a potential interaction from the UI-based entry point.

Each command item is an object with the following structure:

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`id`|string|64 characters|✔️|The ID for the command.|
|`title`|string|32 characters|✔️|The user-friendly command name.|
|`type`|string|64 characters||Type of the command. One of `query` or `action`. Default: **query**.|
|`description`|string|128 characters||The description that appears to users to indicate the purpose of this command.|
|`initialRun`|Boolean|||A Boolean value indicates whether the command runs initially with no parameters. Default is **false**.|
|`context`|array of Strings|3||Defines where the message extension can be invoked from. Any combination of`compose`,`commandBox`,`message`. Default is `["compose","commandBox"]`.|
|`fetchTask`|Boolean|||A Boolean value that indicates if it must fetch the task module dynamically. Default is **false**.|
|`taskInfo`|object|||Specify the task module to pre-load when using a message extension command.|
|`taskInfo.title`|string|64 characters||Initial dialog title.|
|`taskInfo.width`|string|||Dialog width - either a number in pixels or default layout such as 'large', 'medium', or 'small'.|
|`taskInfo.height`|string|||Dialog height - either a number in pixels or default layout such as 'large', 'medium', or 'small'.|
|`taskInfo.url`|string|||Initial webview URL.|
|`parameters`|array of object|5 items|✔️|The list of parameters the command takes. Minimum: 1; maximum: 5.|
|`parameters.name`|string|64 characters|✔️|The name of the parameter as it appears in the client. The parameter name is included in the user request.|
|`parameters.title`|string|32 characters|✔️|User-friendly title for the parameter.|
|`parameters.description`|string|128 characters||User-friendly string that describes this parameter’s purpose.|
|`parameters.value`|string|512 characters||Initial value for the parameter. Currently the value isn't supported|
|`parameters.inputType`|string|128 characters||Defines the type of control displayed on a task module for`fetchTask: false` . One of `text, textarea, number, date, time, toggle, choiceset` .|
|`parameters.choices`|array of objects|10 items||The choice options for the`choiceset`. Use only when`parameter.inputType` is `choiceset`.|
|`parameters.choices.title`|string|128 characters|✔️|Title of the choice.|
|`parameters.choices.value`|string|512 characters|✔️|Value of the choice.|

## permissions

**Optional**—array of strings

An array of `string`, which specifies which permissions the app requests, which let end users know how the extension does. The following options are non-exclusive:

* `identity` &emsp; Requires user identity information.
* `messageTeamMembers` &emsp; Requires permission to send direct messages to team members.

Changing these permissions during app update, causes your users to repeat the consent process after they run the updated app. For more information, see [Updating your app](~/concepts/deploy-and-publish/appsource/post-publish/overview.md).

> [!NOTE]
> Permissions are deprecated now.

## devicePermissions

**Optional**—array of strings

Provides the native features on a user's device that your app requests access to. Options are:

* `geolocation`
* `media`
* `notifications`
* `midi`
* `openExternal`

## validDomains

**Optional**, except **Required** where noted.

A list of valid domains for websites the app expects to load within the Teams client. Domain listings can include wildcards, for example, `*.example.com`. The valid domain matches exactly one segment of the domain; if you need to match `a.b.example.com` then use `*.*.example.com`. If your tab configuration or content UI navigates to any other domain other than tab configuration, that domain must be specified here.

Do **not** include the domains of identity providers you want to support in your app. For example, to authenticate using a Google ID, it's required to redirect to accounts.google.com, however, you must not include accounts.google.com in `validDomains[]`.

Teams apps that require their own SharePoint URLs to function well, includes "{teamsitedomain}" in their valid domain list.

> [!IMPORTANT]
> Don't add domains that are outside your control, either directly or through wildcards (*). For example, ***.yoursite.com** is valid, but ***.onmicrosoft.com** isn't valid as it isn't under your control.
>
> When using wildcards, the following rules apply:
>
> * If a subdomain segment includes a wildcard, it must be the only character in the segment.
> * Any segment preceding a wildcard segment must also be a wildcard segment.
>
> For example, *\*.\*.domain.com* is valid, but *foo.\*.myteam.domain.com* is not valid.

The object is an array with all elements of the type `string`.

## webApplicationInfo

**Optional**—object

Provide your Azure Active Directory App ID and Microsoft Graph information to help users seamlessly sign into your app. If your app is registered in Microsoft Azure Active Directory (Azure AD), you must provide the App ID. Administrators can easily review permissions and grant consent in Teams admin center.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`id`|string|36 characters|✔️|Azure AD application ID of the app. This ID must be a GUID.|
|`resource`|string|2048 characters|✔️|Resource URL of app for acquiring auth token for SSO. </br> **NOTE:** If you aren't using SSO, ensure that you enter a dummy string value in this field to your app manifest, for example, `https://example` to avoid an error response. |

## graphConnector

**Optional**—object

Specify the app's Graph connector configuration. If this is present, then [webApplicationInfo.id](#webapplicationinfo) must also be specified.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`notificationUrl`|string|2048 characters|✔️|The url where Graph-connector notifications for the application should be sent.|

## showLoadingIndicator

**Optional**—Boolean

Indicates if or not to show the loading indicator when an app or tab is loading. Default is **false**.
>[!NOTE]
>
> * If you select `showLoadingIndicator` as true in your app manifest, to load the page correctly, modify the content pages of your tabs and task modules as described in [Show a native loading indicator](../../tabs/how-to/create-tab-pages/content-page.md#show-a-native-loading-indicator) document.
> * If you don't modify the content pages of your tab, the tab app doesn't load and shows the error `There was a problem reaching this app`.

## isFullScreen

 **Optional**—Boolean

Indicates if a personal app is rendered without a tab header bar (signifying full screen mode). Default is **false**.

> [!NOTE]
>
> * `isFullScreen` only works for apps published to your organization. Sideloaded and published third-party apps cannot use this property (it is ignored).
>
> * `isFullScreen=true` removes the Teams-provided header bar and title from personal apps and task module dialogs.

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

## defaultInstallScope

**Optional** - string

Specifies the install scope defined for this app by default. The defined scope will be the option displayed on the button when a user tries to add the app. Options are:

* `personal`
* `team`
* `groupChat`
* `meetings`

## defaultGroupCapability

**Optional** - object

When a group install scope is selected, it will define the default capability when the user installs the app. Options are:

* `team`
* `groupChat`
* `meetings`

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`team`|string|||When the install scope selected is `team`, this field specifies the default capability available. Options: `tab`, `bot`, or `connector`.|
|`groupChat`|string|||When the install scope selected is `groupChat`, this field specifies the default capability available. Options: `tab`, `bot`, or `connector`.|
|`meetings`|string|||When the install scope selected is `meetings`, this field specifies the default capability available. Options: `tab`, `bot`, or `connector`.|

## configurableProperties

**Optional** - array

The `configurableProperties` block defines the app properties that Teams admins can customize. For more information, see [enable app customization](~/concepts/design/enable-app-customization.md). The app customization feature isn't supported in custom or LOB apps.

> [!NOTE]
> A minimum of one property must be defined. You can define a maximum of nine properties in this block.

You can define any of the following properties:

* [name](#name): The app's display name.
* [shortDescription](#description): The app's short description.
* [longDescription](#description): The app's long description.
* [smallImageUrl](#icons): The app's outline icon.
* [largeImageUrl](#icons): The app's color icon.
* [accentColor](#accentcolor): The color to use and a background for your outline icons.
* [developerUrl](#developer): The HTTPS URL of the developer's website.
* [privacyUrl](#developer): The HTTPS URL of the developer's privacy policy.
* [termsOfUseUrl](#developer): The HTTPS URL of the developer's terms of use.

## supportedChannelTypes

**Optional** - array

Enables your app in non-standard channels. If your app supports a team scope and this property is defined, Teams enables your app in each channel type accordingly. Currently, the private and shared channel types are supported.

> [!NOTE]
>
> * If your app supports a team scope, it functions in the standard channels regardless of the values that are defined in this property.
> * Your app can account for the unique properties of each of the channel types to function properly. To enable your tab for private and shared channels, see [retrieve context in private channels](~/tabs/how-to/access-teams-context.md#retrieve-context-in-private-channels) and [get context in shared channels](../../tabs/how-to/access-teams-context.md#get-context-in-shared-channels)

## defaultBlockUntilAdminAction

**Optional** - Boolean

When `defaultBlockUntilAdminAction` property is set to **true**, the app is hidden from users by default until admin allows it. If set to **true**, the app is hidden for all tenants and end users. The tenant admins can see the app in the Teams admin center and take action to allow or block the app. The default value is **false**. For more information on default app block, see [Block apps by default for users until an admin approves](../../concepts/design/enable-app-customization.md#block-apps-by-default-for-users-until-an-admin-approves)

## publisherDocsUrl

**Optional** - string

**Maximum size** - 128 characters

The `publisherDocsUrl` is a HTTPS URL to an information page for admins to get guidelines before allowing an app, which is blocked by default. It can also be used to provide any instructions or information about the app which can be useful for the tenant admin.

## subscriptionOffer

**Optional** - object

Specifies the SaaS offer associated with your app.

|Name| Type|Maximum size|Required|Description|
|---|---|---|---|---|
|`offerId`| string | 2,048 characters | ✔️ | A unique identifier that includes your Publisher ID and Offer ID, which you can find in [Partner Center](https://partner.microsoft.com/dashboard). You must format the string as `publisherId.offerId`.|

## meetingExtensionDefinition

**Optional** - object

Specify meeting extension definition. For more information, see [custom Together Mode scenes in Teams](../../apps-in-teams-meetings/teams-together-mode.md).

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`scenes`|array of objects| 5 items||Meeting supported scenes.|
|`supportsStreaming`|Boolean|||A value that indicates whether an app can stream the meeting's audio and video content to a real-time meeting protocol (RTMP) endpoint. The default value is **false**.|
|`supportsAnonymousGuestUsers`|Boolean|||A value that indicates whether an app supports access for anonymous users. The default value is **false**.|

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
> If you set the `manifestVersion` property to 1.12, the authorization property is incompatible with the older versions (version 1.11 or earlier) of the manifest. Authorization is supported for manifest version 1.12.

Specify and consolidate authorization related information for the app.

|Name| Type|Maximum size|Required |Description|
|---|---|---|---|---|
|`permissions`||||List of permissions that the app needs to function.|

### authorization.permissions

|Name| Type|Maximum size|Required |Description|
|---|---|---|---|---|
|`resourceSpecific`| array of objects|16 items||Permissions that guard data access on resource instance level.|

### authorization.permissions.resourceSpecific

|Name| Type|Maximum size|Required |Description|
|---|---|---|---|---|
|`type`|string||✔️| The type of the resource-specific permission. Options: `Application` and `Delegated`.|
|`name`|string|128 characters|✔️|The name of the resource-specific permission. For more information, see [Resource-specific application permissions](#resource-specific-application-permissions) and [Resource-specific delegated permissions](#resource-specific-delegated-permissions)|

#### Resource-specific application permissions

Application permissions allow the app to access data without a signed-in user. For information on application permissions, see [Resource Specific Consent for MS Graph and MS BotSDK](../../graph-api/rsc/resource-specific-consent.md).

#### Resource-specific delegated permissions

Delegated permissions allow the app to access data on behalf of the signed-in user.

* **Resource-specific delegated permissions for teams**

    |**Name**|**Description**|
    |---|---|
    |`ChannelMeetingParticipant.Read.Group`| Allows the app to read participant information, including name, role, id, joined, and left times, of channel meetings associated with this team, on behalf of the signed-in user.|
    |`InAppPurchase.Allow.Group`| Allows the app to show marketplace offers to users in this team and complete their purchases within the app, on behalf of the signed-in user.|
    |`ChannelMeetingStage.Write.Group`| Allows the app to show content on the meeting stage in channel meetings associated with this team, on behalf of the signed-in user.|
    |`LiveShareSession.ReadWrite.Group`|Allows the app to create and synchronize Live Share sessions for meetings associated with this team, and access related information about the meeting's roster, such as member's meeting role, on behalf of the signed-in user.|

* **Resource-specific delegated permissions for chats or meetings**

    |**Name**|**Description**|
    |---|---|
    |`InAppPurchase.Allow.Chat`|Allows the app to show marketplace offers to the users in this chat, and any associated meeting, and complete their purchases within the app, on behalf of the signed-in user.|
    |`MeetingStage.Write.Chat`|Allows the app to show content on the meeting stage in meetings associated with this chat, on behalf of the signed-in user.|
    |`OnlineMeetingParticipant.Read.Chat`|Allows the app to read participant information, including name, role, id, joined, and left times, of meeting associated with this chat, on behalf of the signed-in user.|
    |`OnlineMeetingParticipant.ToggleIncomingAudio.Chat`|Allows the app to toggle incoming audio for participants in meetings associated with this chat, on behalf of the signed-in user.|
    |`LiveShareSession.ReadWrite.Chat`|Allows the app to create and synchronize Live Share sessions for meetings associated with this chat, and access related information about the meeting's roster, such as member's meeting role, on behalf of the signed-in user.|
   |`OnlineMeetingIncomingAudio.Detect.Chat`|Allows the app to detect changes in the status of incoming audio in meetings associated with this chat, on behalf of the signed-in user.|
   |`OnlineMeetingNotification.Send.Chat`|Allows the app to send notifications for the meetings associated with the chat.|

* **Resource-specific delegated permissions for users**

    |**Name**|**Description**|
    |---|---|
    |`InAppPurchase.Allow.User`|Allows the app to show the user marketplace offers and complete the user's purchases within the app, on behalf of the signed-in user.|

## Create a manifest file

If your app doesn't have a Teams app manifest file, you'll need to create it.

To create a Teams app manifest file:

1. Use the [sample manifest schema](#sample-full-manifest) to create a .json file.
1. Save it in the root of your project folder as `manifest.json`.

<br>
<details>
<summary>Here's an example of a example of manifest schema for a tab app with SSO enabled:</summary>
<br>

> [!NOTE]
> The manifest example content shown here is only for a tab app. It uses example values for subdomain URI. For more information, see [sample manifest schema](#sample-full-manifest).

  ```json
{ 
  "$schema": "https://developer.microsoft.com/json-schemas/teams/v1.11/MicrosoftTeams.schema.json", 
 "manifestVersion": "1.12", 
 "version": "1.0.0", 
 "id": "{new GUID for this Teams app - not the Azure AD App ID}", 
 "developer": { 
 "name": "Microsoft", 
 "websiteUrl": "https://www.microsoft.com", 
 "privacyUrl": "https://www.microsoft.com/privacy", 
 "termsOfUseUrl": "https://www.microsoft.com/termsofuse" 
  }, 

  "name": { 
    "short": "Teams Auth SSO", 
    "full": "Teams Auth SSO" 
  }, 


  "description": { 
    "short": "Teams Auth SSO app", 
    "full": "The Teams Auth SSO app" 
  }, 

  "icons": { 
    "outline": "outline.png", 
    "color": "color.png" 
  }, 

  "accentColor": "#60A18E", 
  "staticTabs": [ 
    { 
     "entityId": "auth", 
     "name": "Auth", 
     "contentUrl": "https://https://subdomain.example.com/Home/Index", 
     "scopes": [ "personal" ] 
    } 
  ], 

  "configurableTabs": [ 
    { 
     "configurationUrl": "https://subdomain.example.com/Home/Configure", 
     "canUpdateConfiguration": true, 
     "scopes": [ 
     "team" 
      ] 
    } 
  ], 
  "permissions": [ "identity", "messageTeamMembers" ], 
  "validDomains": [ 
   "{subdomain or ngrok url}" 
  ], 
  "webApplicationInfo": { 
    "id": "{Azure AD AppId}", 
    "resource": "api://subdomain.example.com/{Azure AD AppId}" 
  }
} 
```

</details>

## See also

* [Understand the Microsoft Teams app structure](~/concepts/design/app-structure.md)
* [Enable app customization](~/concepts/design/enable-app-customization.md)
* [Localize your app](~/concepts/build-and-test/apps-localization.md)
* [Integrate media capabilities](~/concepts/device-capabilities/media-capabilities.md)
* [Public developer preview manifest schema for Microsoft Teams](manifest-schema-dev-preview.md)
