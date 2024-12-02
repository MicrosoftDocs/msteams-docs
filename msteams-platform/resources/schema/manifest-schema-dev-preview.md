---
title: Developer Preview App Manifest
description: Learn about public developer preview manifest schema for Microsoft Teams, sample app manifest, schema properties, and how to enable developer preview.
ms.topic: reference
ms.localizationpriority: medium
ms.date: 11/18/2024
---
# Public developer preview app manifest

For information on how to enable developer preview, see [public developer preview for Microsoft Teams](~/resources/dev-preview/developer-preview-intro.md).

> [!NOTE]
> If you aren't using developer preview features, including running [Teams personal tabs and message extensions in Outlook and Microsoft 365 app](../../m365-apps/overview.md), use the [app manifest](~/resources/schema/manifest-schema.md) (previously called Teams app manifest) for generally available (GA) features instead.

App manifest describes how the app integrates into the Microsoft Teams platform. Your app manifest must conform to the schema hosted at [`https://developer.microsoft.com/json-schemas/teams/vDevPreview/MicrosoftTeams.schema.json`](https://developer.microsoft.com/json-schemas/teams/vDevPreview/MicrosoftTeams.schema.json).

## Sample app manifest

```json
{
    "$schema": "https://developer.microsoft.com/json-schemas/teams/vDevPreview/MicrosoftTeams.schema.json",
    "manifestVersion": "devPreview",
    "version": "1.0.0",
    "id": "%MICROSOFT-APP-ID%",
    "devicePermissions": [
        "geolocation",
        "media"
    ],
    "developer": {
        "name": "Publisher Name",
        "websiteUrl": "https://example.com/",
        "privacyUrl": "https://example.com/privacy",
        "termsOfUseUrl": "https://example.com/app-tos",
        "mpnId": "1234567890"
    },
    "localizationInfo": {
        "defaultLanguageTag": "en",
        "defaultLanguageFile": "en.json",
        "additionalLanguages": [
            {
                "languageTag": "es",
                "file": "es.json"
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
        "color": "%FILENAME-192x192px",
        "color32x32": "%FILENAME-32x32px%"
    },
    "accentColor": "%HEX-COLOR%",
    "elementRelationshipSet": {
      "oneWayDependencies" : [
        {
          "element" : {
            "name" : "composeExtensions",
            "id" : "composeExtension-id",
            "commandIds": ["exampleCmd1", "exampleCmd2"]
          },
          "dependsOn" : [
              {"name" : "bots", "id" : "bot-id"}
          ]
        }
      ],
      "mutualDependencies" : [
        [
                {"name" : "bots", "id" : "bot-id"}, 
                {"name" : "staticTabs", "id" : "staticTab-id"},
                {"name" : "composeExtensions", "id" : "composeExtension-id"},
                {"name" : "configurableTabs", "id": "configurableTab-id"}
        ]
      ],
    "copilotAgents": {
        "declarativeAgents": [
            {
                "id": "agent1",
                "file": "declarativeAgent1.json"
            }
        ]
    },
    "configurableTabs": [
        {
            "id": "configurableTab-id",
            "configurationUrl": "https://contoso.com/teamstab/configure",
            "canUpdateConfiguration": true,
            "scopes": [
                "team",
                "groupChat"
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
            ],
            "requirementSet": {
                "hostMustSupportFunctionalities": [
                  {"name": "dialogUrl"},
                  {"name": "dialogUrlBot"}
                ]
            }
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
                "groupChat"
            ],
            "supportsFiles": true,
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
                            "title": "Command N",
                            "description": "Description of Command N"
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
            ],
            "requirementSet": {
                "hostMustSupportFunctionalities": [
                  {"name": "dialogUrl"},
                  {"name": "dialogUrlBot"}
                ]
            }
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
            "id": "composeExtension-id",
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
            ],
            "requirementSet": {
                "hostMustSupportFunctionalities": [
                  {"name": "dialogUrl"},
                  {"name": "dialogUrlBot"}
                ]
            }
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
    "showLoadingIndicator": false,
    "isFullScreen": false,
    "defaultBlockUntilAdminAction": false,
    "publisherDocsUrl": "https://contoso.com/teamtabapp/admin-doc",
    "scopeConstraints": { 
        "teams": [ 
            { "id": "%TEAMS-THREAD-ID" } 
        ], 
        "groupChats": [ 
          { "id": "%GROUP-CHATS-THREAD-ID" } 
        ] 
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
"actions": [
    {
      "id": "addTodoTask",
      "displayName": "Add ToDo task",
      "intent": "addTo",
      "description": "Add this file with a short note to my to do list",
      "handlers": [
        {
          "type": "openPage",
          "supportedObjects": {
            "file": {
              "extensions": [
                "doc",
                "pdf"
              ]
            }
          },
          "pageInfo": {
            "pageId": "newTaskPage",
            "subPageId": ""
          }
        }
      ]
    },
  ],
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
    "supportedChannelTypes": [
        "sharedChannels",
        "privateChannels"
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

**Optional** (but recommended) &ndash; String

The *https://* URL referencing the JSON Schema for the app manifest.

## manifestVersion

**Required** &ndash; String

The version of the app manifest schema this manifest is using.

## version

**Required** &ndash; String

The version of the specific app. If you update something in your app manifest, the version must be incremented as well. This way, when the new app manifest is installed, it overwrites the existing one and the user gets the new functionality. If this app was submitted to the Microsoft Teams Store, the new app manifest has to be resubmitted and revalidated. Then, users of this app receive the new updated app manifest automatically within a few hours, after it's approved.

If the app requested permissions change, users are prompted to upgrade and re-consent to the app.

This version string must follow the [semver](http://semver.org/) standard (MAJOR.MINOR.PATCH).

> [!NOTE]
> If your app includes an Office Add-in, each segment of the version string is limited to a maximum of five digits. The semver standard's prerelease and metadata version string extensions aren't supported.

## id

**Required** &ndash; Microsoft app ID

The unique Microsoft-generated identifier for this app. The format of the ID is GUID. If you've registered a bot through Microsoft Bot Framework, or your tab's web app already signs in with Microsoft, then you might already have an ID and must enter it here. Otherwise, you must generate a new ID at the Microsoft Application Registration Portal ([My Applications](https://apps.dev.microsoft.com)), enter it here, and then reuse it when you [add a bot](~/bots/how-to/create-a-bot-for-teams.md).

## developer

**Required** &ndash; Object

Specifies information about the developer and their business. For Teams Store apps, the value must match the values that you provide in the Partner Center app submission form.

| Name            | Type   | Maximum size     | Required | Description                                                                                              |
|-----------------|--------|------------------|----------|----------------------------------------------------------------------------------------------------------|
| `name`          | String | 32 characters    | ✔️      | The display name for the developer.                                                                      |
| `websiteUrl`    | String | 2048 characters | ✔️      | The *https://* URL to the app-specific page on your website.                                             |
| `privacyUrl`    | String | 2048 characters | ✔️      | The *https://* URL to the app's privacy policy.                                                         |
| `termsOfUseUrl` | String | 2048 characters | ✔️      | The *https://* URL to the app's terms of use.                                                           |
| `mpnId`         | String | 10 characters    |          | The Microsoft Cloud Partner Program (CCP) ID (formerly known as Microsoft Partner Network (MPN) ID) that identifies the partner organization creating the app. **Optional** |
| `contactInfo`   | Object |                  |          | App developer's contact information.                                                                     |

### developer.contactInfo

**Optional** &ndash; Object

Your contact information that is used by customers to contact you through Teams chat or email. Customers may need extra information when evaluating your app or if they have any queries about your app when it doesn't work. Customers can contact you using Teams chat, so request your IT admins to [enable external communications](/microsoftteams/communicate-with-users-from-other-organizations) in your organization. For more information, see [developer provided app and contact information](/MicrosoftTeams/manage-apps#developer-provided-app-information-support-and-documentation).

> [!Note]
> You must provide only one contact email address.

We recommend triaging your customer queries in a timely manner and route those internally within your organization, say to other functions to get the answers. It helps improve app adoption, builds developer trust, and increase revenue if you monetize the app.

| Name           | Type   | Maximum size | Required | Description          |
|----------------|--------|--------------|----------|----------------------|
|`defaultsupport`|Object| |✔️|The default contact information for your app.|
|`defaultsupport.userEmailsForChatSupport`|Array|10|✔️|Email address to receive customer queries using Teams chat. While the app manifest allows up to 10 email addresses, Teams uses only the first email address to let IT admins communicate with you. The object is an array with all elements of the type string. The maximum length of email is 80 characters.|
|`defaultsupport.emailsForEmailSupport`|Array|1|✔️|Contact email for customer inquiry (Minimum: 1; maximum: 1). The object is an array with all elements of the type string. The maximum length of email is 80 characters.|

## localizationInfo

**Optional** &ndash; Object

Allows the specification of a default language, and pointers to additional language files. See [localization](~/concepts/build-and-test/apps-localization.md).

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`defaultLanguageTag`| String | | ✔️|The language tag for the strings in this app manifest file. For example, `en`|
|`defaultLanguageFile`| String |2048 characters|| A relative file path to the .json file that contains the strings. If unspecified, strings are taken directly from the app manifest file. A default language file is required for [Copilot agents that support multiple languages](/microsoft-365-copilot/extensibility/agents-are-apps#localizing-your-agent).|

### localizationInfo.additionalLanguages

An array of objects with the following properties to specify additional language translations.

| Name | Type | Maximum size | Required | Description|
|---|---|---|---|---|
|`languageTag`| String | |✔️|The language tag of the strings in the provided file. For example, `es`|
|`file`| String | 2048 characters|✔️|A relative file path to the .json file that contains the translated strings.|

## name

**Required** &ndash; Object

The name of your app experience, displayed to users in the Teams experience. For apps submitted to AppSource, these values must match the information in your AppSource entry. The values of `short` and `full` must be different.

|Name| Type | Maximum size | Required | Description|
|---|---|---|---|---|
|`short`|String|30 characters|✔️|The short display name for the app.|
|`full`|String|100 characters|✔️|The full name of the app. It's used if the full app name exceeds 30 characters.|
|`abbreviated`|String|15 characters| |Abbreviated name for the app; used as the display name on the app bar on the left hand side of the UI. If not specified, `short` name is used on the app bar.|

## description

**Required** &ndash; Object

Describes your app to users. For apps submitted to AppSource, these values must match the information in your AppSource entry.

Ensure that your description accurately describes your experience and provides information to help potential customers understand what your experience does. You must note in the full description, if an external account is required for use. The values of `short` and `full` must be different.  Your short description must not be repeated within the long description and must not include any other app name.

|Name| Type | Maximum size | Required | Description|
|---|---|---|---|---|
|`short`| String |80 characters|✔️|A short description of your app experience, used when space is limited.|
|`full`| String |4000 characters|✔️|The full description of your app.|

## icons

**Required** &ndash; Object

Icons used within the Teams app. The icon files must be included as part of the upload package.

|Name| Maximum size | Required | Description|
|---|---|---|---|
|`outline`|2048 characters|✔️|A relative file path to a transparent 32x32 PNG outline icon. The border color must be white.|
|`color`|2048 characters|✔️|A relative file path to a full color 192x192 PNG icon.|
|`color32x32`|2048 character| | A relative file path to a full color 32x32 PNG icon with transparent background. Used when the app is pinned in Outlook and Microsoft 365 app.|

## accentColor

**Required** &ndash; String

A color to use with and as a background for your outline icons.

The value must be a valid HTML color code starting with '#', for example `#4464ee`.

## elementRelationshipSet

**Optional** &ndash; Object

Describes relationships among individual app capabilities, including `staticTabs`, `configurableTabs`, `composeExtensions`, and `bots`. It's used to specify runtime dependencies to ensure that the app only launches in applicable Microsoft 365 hosts, such as Teams, Outlook, and the Microsoft 365 (Office) app. For more information, see [how to specify runtime requirements in your app manifest](../../m365-apps/specify-runtime-requirements.md).

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
| `oneWayDependencies`| Array|||Defines one or more unidirectional dependency relationships among app components (each represented by a `oneWayDependency` object with a *dependent* `element` and a `dependsOn` [`element`](#element)).|
| `mutualDependencies`| Array|||Defines one or more mutual dependency relationships among app capabilities (each represented by a `mutualDependency` array of [`element` objects](#element)).|

### element

**Optional** &ndash; Object

Describes an app capability (`element`) in an `elementRelationshipSet`.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
| `name`| String enum|| ✔️| The type of app capability. Supported values: `bots`, `staticTabs`, `composeExtensions`, `configurableTabs`|
| `id` | String | | ✔️| If there are multiple instances of a bot, tab, or message extension, this property defines a specific instance of the capability. It maps to `botId` for bots, `entityId` for static tabs, and `id` for configurable tabs and message extensions. |
| `commandIds` | Array of strings||| List of one or more message extension commands that are dependent on the specified `dependsOn` capability. Use only for message extensions. |

### elementRelationshipSet.oneWayDependency

Describes the unidirectional dependency of one app capability (X) to another (Y). If a Microsoft 365 runtime host doesn't support a required capability (Y), the dependent capability (X) won't load or surface to the user.

**Optional** &ndash; Object

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
| `element`| Object||✔️| Represents an individual app capability (represented by [`element`](#element)) that has a one-way runtime dependency on another capability being loaded. |
| `dependsOn`| Array|| ✔️| Defines one or more app capabilities (each represented by [`element`](#element)) required for the specified `element` to load.|

### elementRelationshipSet.mutualDependencies

Describes a set of mutual dependencies between two or more app capabilities. A Microsoft 365 runtime host must support all required capabilities for any of those capabilities to be available for users in that host.

**Optional** &ndash; Array of arrays (each containing two or more [`element` objects](#element))

## copilotAgents

**Optional** &ndash; Object

Defines one or more agents to Microsoft 365 Copilot (formerly known as `copilotExtensions`). [Declarative agents](/microsoft-365-copilot/extensibility/overview-declarative-agent) are customizations of Microsoft 365 Copilot that run on its same orchestrator and foundation models (formerly known as `declarativeCopilots`). [Custom engine agents](/microsoft-365-copilot/extensibility/overview-custom-engine-agent) are conversational Teams bots that use custom AI language models and orchestration, yet are selectable (along with installed declarative agents) as **Agents** from the Microsoft 365 Copilot side panel.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`declarativeAgents`|Array of objects| 1 || Array of objects that each define a declarative agent. |
|`customEngineAgents`|Array of objects| 1 || Array of objects that each define a custom engine agent.|

### declarativeAgents

Represents a customization of Microsoft 365 Copilot, as defined by its manifest file.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`id`|String| |✔️| Unique identifier for the agent. When using Microsoft Copilot Studio to build agents, this is auto-generated. Otherwise, manually assign the value according to your own conventions or preference. |
|`file`|String| |✔️| Relative path within the app package to the [declarative agent manifest](/microsoft-365-copilot/extensibility/declarative-agent-manifest) file. |

### customEngineAgents

> [!NOTE]
> Custom engine agents support in Microsoft 365 Copilot is currently in limited private preview and not all developers have access during the staged rollout.

Represents a conversational Teams bot that uses custom AI language models and orchestration, surfaced as an agent in the Microsoft 365 Copilot UI.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`id`|String| |✔️| Unique (bot) identifier for the custom engine agent. Must match the `id` specified in the `bots` section of the manifest and be of `personal` scope. |
|`type`|String| |✔️| Type of the custom engine agent. Supported value: `bot` |


## configurableTabs

**Optional** &ndash; Array

Used when your app experience has a team channel tab experience that requires extra configuration before it's added. Configurable tabs are supported only in the teams scope, and only one tab per app is supported.

The object is an array with all elements of the type `object`. This block is required only for solutions that provide a configurable channel tab solution.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`id`|String||| Unique identifier for configurable tab. Used when defining one-way and mutual app capability dependencies under [elementRelationshipSet](#elementrelationshipset).|
|`configurationUrl`|String|2048 characters|✔️|The *https://* URL to use when configuring the tab.|
|`canUpdateConfiguration`|Boolean|||A value indicating whether an instance of the tab's configuration can be updated by the user after creation. <br>Default value: `true`|
|`scopes`|Array of enum|2|✔️|Configurable tabs only support the `team` and `groupChat` scopes. |
|`context` |Array of enum|8||The set of `contextItem` scopes where a [tab is supported](../../tabs/how-to/access-teams-context.md). <br>Default values: `channelTab`, `privateChatTab`, `meetingChatTab`, `meetingDetailsTab`, `meetingSidePanel`, `meetingStage`, `personalTab`.|
|`sharePointPreviewImage`|String|2048 characters||A relative file path to a tab preview image for use in SharePoint. Size 1024x768. |
|`supportedSharePointHosts`|Array of enum|2||Defines how your tab is made available in SharePoint. Options are `sharePointFullPage`, `sharePointWebPart`|
|`meetingSurfaces`|Array of enum|2||The set of `meetingSurfaceItem` scopes to which a tab belongs. <br>Default values: `sidePanel`, `stage`|
|`supportedPlatform`|Array of enum|3||The set of `supportedPlatform` scopes to which a tab belongs. <br>Default values: `desktop`, `mobile`, `teamsMeetingDevices`|

## staticTabs

**Optional** &ndash; Array

Defines a set of tabs that can be pinned by default, without the user adding them manually. Static tabs declared in `personal` scope are always pinned to the app's personal experience. However, the pinned tabs can be reordered by adding the details of the tab in the same desired order. For more information, see [reorder static personal tabs](../../tabs/how-to/create-personal-tab.md#reorder-tabs).

This property also enables you to set the default landing capability for an app supporting both tab and bot capabilities in personal scope. For more information, see [configure default landing capability](../../concepts/deploy-and-publish/add-default-install-scope.md#configure-your-apps-default-landing-capability).

Render tabs with Adaptive Cards by specifying `contentBotId` instead of `contentUrl` in the **staticTabs** block.

The object is an array (maximum of 16 elements) with all elements of the type `object`. This block is required only for solutions that provide a static tab solution.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`entityId`|String|64 characters|✔️|A unique identifier for the entity that the tab displays.|
|`name`|String|128 characters||The display name of the tab.|
|`contentUrl`|String|2048 characters||The *https://* URL that points to the entity UI to be displayed in the Teams canvas.|
|`contentBotId`|String| | | The Microsoft Teams app ID specified for the bot in the Bot Framework portal. |
|`websiteUrl`|String|2048 characters||The *https://* URL to point at if a user opts to view in a browser.|
|`scopes`|Array of enum|3|✔️|Static tabs support the `personal`, `team`, and `groupChat` scopes, which means it can be provisioned as part of the personal, group chat, and channel meetings experience.|
|`searchUrl`|String|2048 characters||The *https://* URL to direct a user's search queries.|
|`context`|Array of enum|8||The set of `contextItem` scopes to which a tab belongs. <br>Default values: `personalTab`, `channelTab`, `privateChatTab`, `meetingChatTab`, `meetingDetailsTab`, `meetingSidePanel`, `meetingStage`, `teamLevelApp`|
|`supportedPlatform`|Array of enum|3||The set of `supportedPlatform` scopes to which a tab belongs. <br>Default values: `desktop`, `mobile`, `teamsMeetingDevices`|
|`requirementSet`|Object|||Runtime requirements for the tab to function properly in the Microsoft 365 host application. If one or more of the requirements aren't supported by the runtime host, the host won't load the tab.|

### staticTabs.requirementSet

**Optional** &ndash; Object

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
| `requirementSet.hostMustSupportFunctionalities`|Array of objects| |✔️| Specifies one or more runtime capabilities the tab requires to function properly. Supported values: `dialogUrl`, `dialogUrlBot`, `dialogAdaptiveCard`, `dialogAdaptiveCardBot`. For more information, see [how to specify runtime requirements in your app manifest](../../m365-apps/specify-runtime-requirements.md). |

## bots

**Optional** &ndash; Array

Defines a bot solution, along with optional information such as default command properties.

The object is an array (maximum of only 1 element&mdash; only one bot is allowed per app) with all elements of the type `object`. This block is required only for solutions that provide a bot experience.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`botId`|String| |✔️|The unique Microsoft app ID for the bot as registered with the Bot Framework. The ID can be the same as the overall [app ID](#id).|
|`needsChannelSelector`|Boolean|||Describes whether the bot utilizes a user hint to add the bot to a specific channel. <br>Default value: `false`|
|`isNotificationOnly`|Boolean|||Indicates whether a bot is a one-way, notification-only bot, as opposed to a conversational bot. <br>Default value: `false`|
|`supportsFiles`|Boolean|||Indicates whether the bot supports the ability to upload/download files in personal chat. <br>Default value: `false`|
|`scopes`|Array of enum|3|✔️|Specifies whether the bot offers an experience in the context of a channel in a `team`, in a group chat (`groupChat`), or an experience scoped to an individual user alone (`personal`). These options are nonexclusive.|
|`supportsCalling`|Boolean|||A value indicating where a bot supports audio calling. **IMPORTANT**: This property is experimental. Experimental properties might be incomplete and might undergo changes before they're fully available. The property is provided for testing and exploration purposes only and must not be used in production applications. <br>Default value: `false`|
|`supportsVideo`|Boolean|||A value indicating where a bot supports video calling. **IMPORTANT**: This property is experimental. Experimental properties might be incomplete and might undergo changes before they're fully available. The property is provided for testing and exploration purposes only and must not be used in production applications. <br>Default value: `false`|
|`requiresSecurityEnabledGroup`|Boolean|||A value indicating whether the team's Office group needs to be security enabled. <br>Default value: `false`|
|`requirementSet`|Object|||Runtime requirements for the bot to function properly in the Microsoft 365 host application. If one or more of the requirements aren't supported by the runtime host, the host won't load the bot.|

### bots.configuration

**Optional** &ndash; Object

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`team.fetchTask`|Boolean||✔️|A boolean value that indicates if it should fetch dialog (referred as task module in TeamsJS v1.x) dynamically. <br>Default value: `false`|
|`team.taskInfo`|Object||✔️|The dialog to preload when you use a bot.|
|`team.taskInfo.title`|String|64 characters|✔️|Initial dialog title.|
|`team.taskInfo.width`|String|16 characters||The dialog width is either a number in pixels or default layout such as `large`, `medium`, or `small`.|
|`team.taskInfo.height`|String|16 characters||The dialog height is either a number in pixels or default layout such as `large`, `medium`, or `small`.|
|`team.taskInfo.url`|String|2048 characters||Initial webview URL.|
|`groupChat.fetchTask`|Boolean||✔️|A boolean value that indicates if it should fetch dialog dynamically. <br>Default value: `false`|
|`groupChat.taskInfo`|Object|||Dialog to be launched when fetch task set to false.<br>Default value: `false`|
|`groupChat.taskInfo.title`|String|64 characters|✔️|Initial dialog title.|
|`groupChat.taskInfo.width`|String|16 characters||The dialog width is either a number in pixels or default layout such as `large`, `medium`, or `small`.|
|`groupChat.taskInfo.height`|String|16 characters||The dialog height is either a number in pixels or default layout such as `large`, `medium`, or `small`.|
|`groupChat.taskInfo.url`|String|2048 characters||Initial webview URL.|

### bots.commandLists

**Optional** &ndash; Array

An optional list of commands that your bot can recommend to users. The object is an array (maximum of 3 elements) with all elements of type `object`; you must define a separate command list for each scope that your bot supports. For more information, see [Bot menus](~/bots/how-to/create-a-bot-commands-menu.md).

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`scopes`|Array of enum|3|✔️|Specifies the scope for which the command list is valid. Options are `team`, `personal`, and `groupChat`.|
|`commands`|Array of objects|10|✔️|An array of commands the bot supports.|

### bots.commandLists.commands

**Required** &ndash; Array

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`title`|String|32 characters|✔️|The bot command name.|
|`description`|String|128 characters|✔️|A simple text description or an example of the command syntax and its arguments.|

### bots.requirementSet

**Optional** &ndash; Object

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
| `requirementSet.hostMustSupportFunctionalities`|Array of objects| |✔️| Specifies one or more runtime capabilities the bot requires to function properly. Supported values: `dialogUrl`, `dialogUrlBot`, `dialogAdaptiveCard`, `dialogAdaptiveCardBot`. For more information, see [how to specify runtime requirements in your app manifest](../../m365-apps/specify-runtime-requirements.md). |

## connectors

**Optional** &ndash; Array

The `connectors` block defines a connector for Microsoft 365 Groups for the app.

The object is an array (maximum of 1 element) with all elements of type `object`. This block is required only for solutions that provide a Connector. Only one connector per app is supported.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`configurationUrl`|String|2048 characters||The *https://* URL to use when configuring the connector using the inline configuration experience.|
|`connectorId`|String|64 characters|✔️|A unique identifier for the Connector that matches its ID in the [Connectors Developer Dashboard](https://aka.ms/connectorsdashboard).|
|`scopes`|Array of enum|1|✔️|Specifies whether the Connector offers an experience in the context of a channel in a `team`, or an experience scoped to an individual user alone (`personal`). The `team` scope is only supported.|

## composeExtensions

**Optional** &ndash; Array

Defines a message extension for the app.

> [!NOTE]
> The name of the feature was changed from "compose extension" to "message extension" in November, 2017, but the app manifest name remains the same so that existing extensions continue to function.

The object is an array (maximum of 1 element) with all elements of type `object`. This block is required only for solutions that provide a message extension.

|Name| Type | Maximum Size | Required | Description|
|---|---|---|---|---|
|`id`|String||| Unique identifier for the message extension. Used when defining one-way and mutual app capability dependencies under [elementRelationshipSet](#elementrelationshipset).|
|`botId`|String|||The unique Microsoft app ID for the bot that backs the message extension, as registered with the Bot Framework. The ID can be the same as the overall [app ID](#id).|
|`composeExtensionType`|String|||Type of the message extension. Enum values are `botBased` and `apiBased`.|
|`authorization`|Object|2||Authorization related information for the API-based message extension|
|`authorization.authType`|String|||Enum of possible authorization types. Supported values are `none`, `apiSecretServiceAuth`, and `microsoftEntra`.|
|`authorization.microsoftEntraConfiguration`|Object|||Object capturing details needed to do microsoftEntra auth flow. Applicable only when auth type is `microsoftEntra`.|
|`authorization.microsoftEntraConfiguration.supportsSingleSignOn`|Boolean|||A value indicating whether single sign-on is configured for the app.|
|`authorization.apiSecretServiceAuthConfiguration`|Object|||Object capturing details needed to do service auth. Applicable only when auth type is `apiSecretServiceAuth`.|
|`authorization.apiSecretServiceAuthConfiguration.apiSecretRegistrationId`|String|128 characters||Registration ID returned when developer submits the API key through Developer Portal.|
|`apiSpecificationFile`|String|2048 characters||A relative file path to the api specification file in the manifest package.|
|`canUpdateConfiguration`|Boolean|||A value indicating whether the configuration of a message extension can be updated by the user. <br>Default value: `true`|
|`commands`|Array of objects|10||Array of commands the message extension supports.|
|`messageHandlers`|Array of objects|5||A list of handlers that allow apps to be invoked when certain conditions are met. Domains must also be listed in `validDomains`.|
|`messageHandlers.type`|String|||The type of message handler. Must be `link`.|
|`messageHandlers.value.domains`|Array of Strings|2048 characters||Array of domains that the link message handler can register for.|
|`messageHandlers.supportsAnonymizedPayloads`|Boolean|||A Boolean value that indicates whether the app's link message handler supports anonymous invoke flow. <br>Default value: `false` <br> To enable zero install for link unfurling, the value needs to be set to `true`. <br/> **Note**: The property `supportAnonymousAccess` is superseded by `supportsAnonymizedPayloads`.|
| `type` | Type of the message extension. Supported values are `apiBased` or `botBased`. |
|`requirementSet`|Object|||Runtime requirements for the message extension to function properly in the Microsoft 365 host application. If one or more of the requirements aren't supported by the runtime host, the host won't load the message extension.|

### composeExtensions.commands

Your message extension must declare one or more commands. Each command appears in Teams as a potential interaction from the UI-based entry point. There's a maximum of 10 commands.

Each command item is an object with the following structure:

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`id`|String|64 characters|✔️|The ID for the command.|
|`type`|String|64 characters||Type of the command. One of `query` or `action`. Default: `query`|
|`samplePrompts`|Array|5 ||Property used by Microsoft 365 Copilot to display prompts supported by the plugin to the user. For Microsoft 365 Copilot scenarios, this property is required in order to pass app validation for store submission.  |
|`samplePrompts.text`|string|128 characters|✔️|Content of the sample prompt.|
|`apiResponseRenderingTemplateFile`|String|2048 characters||A relative file path for api [response rendering template](https://developer.microsoft.com/json-schemas/teams/vDevPreview/MicrosoftTeams.ResponseRenderingTemplate.schema.json) file used to format the JSON response from developer’s API to Adaptive Card response.|
|`context`|Array of Strings|3 characters||Defines where the message extension can be invoked from. Any combination of `compose`, `commandBox`, `message`. <br>Default values: `compose, commandBox`|
|`title`|String|32 characters|✔️|The user-friendly command name.|
|`description`|String|128 characters||The description that appears to users to indicate the purpose of this command.|
|`semanticDescription`|String|5000 characters||Semantic description of the command for consumption by Microsoft 365 Copilot using Large Language Models (LLMs).|
|`initialRun`|Boolean|||A Boolean value that indicates whether the command runs initially with no parameters. <br>Default value: `false`|
|`fetchTask`|Boolean|||A Boolean value that indicates if it must fetch the dialog dynamically.<br>Default value: `false`|
|`taskInfo`|Object|||Specify the dialog to preload when using a message extension command.|
|`taskInfo.title`|String|64 characters||Initial dialog title.|
|`taskInfo.width`|String|16 characters||Dialog width - either a number in pixels or default layout such as `large`, `medium`, or `small`.|
|`taskInfo.height`|String|16 characters||Dialog height - either a number in pixels or default layout such as `large`, `medium`, or `small`.|
|`taskInfo.url`|String|2048 characters||Initial webview URL.|
|`parameters`|Array of objects|5||The list of parameters the command takes.|
|`parameters.name`|String|64 characters|✔️|The name of the parameter as it appears in the client. This is included in the user request. </br> For Api-based message extension, The name must map to the `parameters.name` in the OpenAPI Description. If you're referencing a property in the request body schema, then the name must map to `properties.name` or query parameters. |
|`parameters.title`|String|32 characters|✔️|User-friendly title for the parameter.|
|`parameters.description`|String|128 characters||User-friendly string that describes this parameter’s purpose.|
|`parameters.semanticDescription`|String|2000 characters||Semantic description of the parameter for consumption by the Large Language Models (LLMs).|
|`parameters.inputType`|String|||Defines the type of control displayed on a dialog for `fetchTask: false`. Input value can only be one of `text`, `textarea`, `number`, `date`, `time`, `toggle`, `choiceset`. <br>Default value: `text`|
|`parameters.value`|String|512 characters||Initial value for the parameter.|
|`parameters.choices`|Array of objects|10||The choice options for the `choiceset`. Use only when `parameters.inputType` is `choiceset`.|
|`parameters.choices.title`|String|128 characters|✔️|Title of the choice.|
|`parameters.choices.value`|String|512 characters|✔️|Value of the choice.|

### composeExtensions.requirementSet

**Optional** &ndash; Object

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
| `requirementSet.hostMustSupportFunctionalities`|Array of objects| |✔️| Specifies one or more runtime capabilities the message extension requires to function properly. Supported values: `dialogUrl`, `dialogUrlBot`, `dialogAdaptiveCard`, `dialogAdaptiveCardBot`. For more information, see [how to specify runtime requirements in your app manifest](../../m365-apps/specify-runtime-requirements.md). |

## scopeConstraints

The scope constraints imposed on an app to specify in which threads you can install the app. When no constraints are specified, you can install the app to all threads within the specific scope.

**Optional** &ndash; Object

|Name| Type | Maximum Size | Required | Description|
|---|---|---|---|---|
|`teams`|Array|128||A list of team thread IDs to which your app is restricted.|
|`teams.id`|String|64 characters|✔️|Team's thread ID.|
|`groupChats`|Array|128||A list of chat thread IDs to which your app is restricted.|
|`groupChats.id`|String|64 characters|✔️|Chat's thread ID.|

## permissions

**Optional** &ndash; Array of strings

An array of `string`, which specifies which permissions the app requests, which let end users know how the extension performs. The following options are nonexclusive:

* `identity` &emsp; Requires user identity information.
* `messageTeamMembers` &emsp; Requires permission to send direct messages to team members.

Changing these permissions when updating your app causes your users to repeat the consent process the first time they run the updated app.

## devicePermissions

**Optional** &ndash; Array of Strings

Specifies the native features on a user's device that your app may request access to. Options are:

* `geolocation`
* `media`
* `notifications`
* `midi`
* `openExternal`

## validDomains

**Optional**, except **Required** where noted

A list of valid domains from which the app expects to load any content. Domain listings can include wildcards, for example `*.example.com`. The valid domain matches exactly one segment of the domain; if you need to match `a.b.example.com` then use `*.*.example.com`. If your tab configuration or content UI needs to go to any other domain besides the one use for tab configuration, that domain must be specified here.

> [!NOTE]
> Office Add-ins, configured with an `extensions` property in the manifest, disregard domains containing a wildcard. If your app incorporates an Office Add-in, specify the full domain name for the domains that the add-in accesses.

It's **not** necessary to include the domains of identity providers you want to support in your app, however. For example, to authenticate using a Google ID, it's necessary to redirect to accounts.google.com, but you must not include accounts.google.com in `validDomains[]`.

> [!IMPORTANT]
> Do not add domains that are outside your control, either directly or through wildcards. For example, `yourapp.onmicrosoft.com` is valid, but `*.onmicrosoft.com` isn't valid.

The object is an array with all elements of the type `string`. The maximum item of the object is 16 and maximum length is 2048 characters.

## webApplicationInfo

**Optional** &ndash; Object

Specify your Microsoft Entra App ID and Graph information to help users seamlessly sign into your Microsoft Entra app.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`id`|String| |✔️|Microsoft Entra application ID of the app. This ID must be a GUID.|
|`resource`|String|2048 characters||Resource URL of the app for acquiring auth token for SSO.|

## graphConnector

**Optional** &ndash; Object

Specify the app's Graph connector configuration. If this is present, then [webApplicationInfo.id](#webapplicationinfo) must also be specified.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`notificationUrl`|String|2048 characters|✔️|The *https://* URL where Graph-connector notifications for the application must be sent.|

## showLoadingIndicator

**Optional** &ndash; Boolean

Indicates whether to show the loading indicator when an app or tab is loading. <br>Default value: `false`
> [!NOTE]
>
> * If you select `showLoadingIndicator` as true in your app manifest, to load the page correctly, modify the content pages of your tabs and dialogs as described in [Show a native loading indicator](../../tabs/how-to/create-tab-pages/content-page.md#show-a-native-loading-indicator) document.
> * If you don't modify the content pages of your tab, the tab app doesn't load and shows the error `There was a problem reaching this app`.

## isFullScreen

 **Optional** &ndash; Boolean

Indicate where a personal app is rendered with or without a tab header bar. <br>Default value: `false`

> [!NOTE]
> `isFullScreen` works only for apps published to your organization.

## activities

**Optional** &ndash; Object

Define the properties your app uses to post a user activity feed.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`activityTypes`|Array of objects| 128 | | Provide the types of activities that your app can post to a users activity feed. The `systemDefault` activity type is a reserved and invalid string.|

### activities.activityTypes

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`type`|String|32 characters|✔️|The notification type.|
|`description`|String|128 characters|✔️|A brief description of the notification.|
|`templateText`|String|128 characters|✔️|Ex: "{actor} created task {taskId} for you"|

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

**Optional** &ndash; Array

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

**Optional** &ndash; Array

Enables your app in nonstandard channels. If your app supports a team scope and this property is defined, Teams enables your app in each channel type accordingly. The private and shared channel types are supported.

> [!NOTE]
>
> * If your app supports a team scope, it functions in the standard channels regardless of the values that are defined in this property.
> * Your app can account for the unique properties of each of the channel types to function properly. To enable your tab for private and shared channels, see [retrieve context in private channels](~/tabs/how-to/access-teams-context.md#retrieve-context-in-private-channels) and [get context in shared channels](../../tabs/how-to/access-teams-context.md#get-context-in-shared-channels)

## defaultBlockUntilAdminAction

**Optional** &ndash; Boolean

A value that indicates whether an app is blocked by default until admin allows it. <br>Default value: `false`

## publisherDocsUrl

**Optional** &ndash; String

The *https://* URL to the page that provides additional app information for the admins. The maximum length of the string is 2048 characters.

## defaultInstallScope

**Optional** &ndash; String

Specifies the install scope defined for this app by default. The defined scope is the option displayed on the button when a user tries to add the app. Options are:

* `personal`
* `team`
* `groupChat`
* `meetings`

## defaultGroupCapability

**Optional** &ndash; Object

When a group install scope is selected, it defines the default capability when the user installs the app. Options are:

* `team`
* `groupchat`
* `meetings`

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`team`|String|||When the install scope selected is `team`, this field specifies the default capability available. <br>Options: `tab`, `bot`, or `connector`.|
|`groupchat`|String|||When the install scope selected is `groupChat`, this field specifies the default capability available. <br>Options: `tab`, `bot`, or `connector`.|
|`meetings`|String|||When the install scope selected is `meetings`, this field specifies the default capability available. <br>Options: `tab`, `bot`, or `connector`.|

## subscriptionOffer

**Optional** &ndash; Object

Specifies the SaaS offer associated with your app.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`offerId`| String | 2048 characters | ✔️ | A unique identifier that includes your Publisher ID and Offer ID, which you can find in [Partner Center](https://partner.microsoft.com/dashboard). You must format the string as `publisherId.offerId`.|

## meetingExtensionDefinition

**Optional** &ndash; Object

Specify meeting extension definition. For more information, see [custom Together Mode scenes in Teams](../../apps-in-teams-meetings/teams-together-mode.md).

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`scenes`|Array of objects| 5 ||Meeting supported scenes.|
|`supportsStreaming`|Boolean|||A Boolean value that indicates whether an app can stream the meeting's audio and video content to a real-time meeting protocol (RTMP) endpoint. <br>Default value: `false`|
|`videoFiltersConfigurationUrl`|String|2048 characters||The *https://* URL for configuring the video filters.|
|`supportsAnonymousGuestUsers`|Boolean|||A Boolean value that indicates whether the app supports access by anonymous guest users. <br>Default value: `false`|

### meetingExtensionDefinition.scenes

|Name| Type|Maximum size|Required |Description|
|---|---|---|---|---|
|`id`|String||✔️| The unique identifier for the scene. This ID must be a GUID. |
|`name`| String | 128 characters |✔️| The name of the scene. |
|`file`|String|2048 characters|✔️| The relative file path to the scenes' metadata json file. |
|`preview`|String|2048 characters|✔️| The relative file path to the scenes' PNG preview icon. |
|`maxAudience`| Integer | 50  |✔️| The maximum number of audiences supported in the scene. |
|`seatsReservedForOrganizersOrPresenters`| Integer | 50 |✔️| The number of seats reserved for organizers or presenters.|

### meetingExtensionDefinition.videoFilters

This object indicates meeting supported video filters.

|Name| Type|Maximum size|Required |Description|
|---|---|---|---|---|
|`id`|String||✔️| The unique identifier for the video filter. This ID must be a GUID. |
|`name`| String | 128 characters |✔️| The name of the video filter. |
|`thumbnail`|String|2048 characters|✔️| The relative file path to the video filter's thumbnail. |

## authorization

**Optional** &ndash; Object

> [!NOTE]
> `authorization` is only supported for the app manifest version 1.12 or later.

Specify and consolidate authorization related information for the app.

|Name| Type|Maximum size|Required |Description|
|---|---|---|---|---|
|`permissions`|Object|||List of permissions that the app needs to function.|

### authorization.permissions

|Name| Type|Maximum size|Required |Description|
|---|---|---|---|---|
|`resourceSpecific`| Array of objects|16 ||Permissions that guard data access on resource instance level.|

### authorization.permissions.resourceSpecific

|Name| Type|Maximum size|Required |Description|
|---|---|---|---|---|
|`type`|String||✔️| The type of resource-specific consent (RSC) permission. <br>Options: `Application` and `Delegated`.|
|`name`|String|128 characters|✔️|The name of the RSC permission. For more information, see [RSC application permissions](#rsc-application-permissions) and [RSC delegated permissions](#rsc-delegated-permissions)|

#### RSC application permissions

Application permissions allow the app to access data without a signed-in user. For information on application permissions, see [RSC permissions for Microsoft Graph and Microsoft BotSDK](../../graph-api/rsc/resource-specific-consent.md).

#### RSC delegated permissions

Delegated permissions allow the app to access data on behalf of the signed-in user.

* **RSC delegated permissions for a team**

    |**Name**|**Description**|
    |---|---|
    |`ChannelMeetingParticipant.Read.Group`| Allows the app to read participant information, including name, role, id, joined, and left times, of channel meetings associated with this team, on behalf of the signed-in user.|
    |`ChannelMeetingIncomingAudio.Detect.Group`| Allows the app to detect incoming audio in channel meetings associated with the team. |
    | `ChannelMeetingActiveSpeaker.Read.Group`| Allows the app to read the participants who are sending audio into the channel meetings associated with the team.|
    |`ChannelMeetingAudioVideo.Stream.Group`| Allows the app to stream audio-video content from channel meetings associated with the team. |
    |`InAppPurchase.Allow.Group`| Allows the app to show marketplace offers to users in the team and complete their purchases within the app, on behalf of the signed-in user.|
    |`ChannelMeetingStage.Write.Group`| Allows the app to show content on the meeting stage in channel meetings associated with the team, on behalf of the signed-in user.|
    |`LiveShareSession.ReadWrite.Group`|Allows the app to create and synchronize Live Share sessions for the team and get access related information, such as name and role, about the team's roster and any associated meetings, on behalf of the signed-in user.|
    |`MeetingParticipantReaction.Read.Group`| Allows the app to read reactions of participants in channel meetings associated with the team.|

* **RSC delegated permissions for chats or meetings**

    |**Name**|**Description**|
    |---|---|
    |`InAppPurchase.Allow.Chat`|Allows the app to show marketplace offers to the users in the chat, and any associated meeting, and complete their purchases within the app, on behalf of the signed-in user.|
    |`MeetingStage.Write.Chat`|Allows the app to show content on the meeting stage in meetings associated with the chat, on behalf of the signed-in user.|
    |`OnlineMeetingParticipant.Read.Chat`|Allows the app to read participant information, including name, role, id, joined, and left times, of meeting associated with the chat, on behalf of the signed-in user.|
    |`OnlineMeetingParticipant.ToggleIncomingAudio.Chat`|Allows the app to toggle incoming audio for participants in meetings associated with the chat, on behalf of the signed-in user.|
    |`LiveShareSession.ReadWrite.Chat`|Allows the app to create and synchronize Live Share sessions for the chat and get access related information, such as name and role, about the chat's roster and any associated meetings, on behalf of the signed-in user.|
    |`MeetingParticipantReaction.Read.Chat`| Allows the app to read reactions of participants in meetings associated with the chat.|
    |`OnlineMeetingIncomingAudio.Detect.Chat`|Allows the app to detect changes in the status of incoming audio in meetings associated with the chat, on behalf of the signed-in user.|
    |`OnlineMeetingActiveSpeaker.Read.Chat`| Allows the app to read participants who are sending audio into the meetings associated with the chat.|
    |`OnlineMeetingAudioVideo.Stream.Chat`| Allows the app to stream audio-video content of meetings associated with the chat.|

* **RSC delegated permissions for users**

    |**Name**|**Description**|
    |---|---|
    |`CameraStream.Read.User`|Allows the app to read user's camera stream.|
    |`InAppPurchase.Allow.User`|Allows the app to show the user marketplace offers and complete the user's purchases within the app, on behalf of the signed-in user.|
    |`OutgoingVideoStream.Write.User`| Allows the app to modify the user's outgoing video.|
    |`MicrophoneStream.Read.User`| Allows the app to read user's microphone stream.|
    |`MeetingParticipantReaction.Read.User`| Allows the app to read user's reactions while participating in a meeting.|

## extensions

**Optional** &ndash; Object

The `extensions` property specifies Outlook Add-ins within an app manifest and simplifies the distribution and acquisition across the Microsoft 365 ecosystem. Each app supports only one extension.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`requirements`| Object | | | Specifies the set of client or host requirements for the extension. |
|`runtimes`| Array | 20 | | Configures the set of runtimes and actions that can be used by each extension point. For more information, see [runtimes in Office Add-ins](/office/dev/add-ins/testing/runtimes). |
|`ribbons`| Array | 20 | | Defines the ribbons extension point. |
|`autoRunEvents`| Array | 10 | | Defines the event-based activation extension point. |
|`alternates`| Array | 10 | | Specifies the relationship to alternate existing Microsoft 365 solutions. It's used to hide or prioritize add-ins from the same publisher with overlapping functionality. |
|`audienceClaimUrl`| String | 2048 characters | | Specifies the URL for your extension and is used to validate Exchange user identity tokens. For more information, see [inside the Exchange identity token](/office/dev/add-ins/outlook/inside-the-identity-token)|
|`appDeeplinks`| Array | | | Do not use. For Microsoft internal use only. |

For more information, see [Office Add-ins manifest for Microsoft 365](/office/dev/add-ins/develop/unified-manifest-overview).

### extensions.requirements

The `extensions.requirements` object specifies the scopes, form factors, and Office JavaScript Library requirement sets that must be supported on the Office client in order for the add-in to be installed. Requirements are also supported on the "ribbon", "runtime", "alternates", and "autoRunEvents" child properties to selectively filter out some features of the add-in. For more information, see [Specify Office Add-in requirements in the unified manifest for Microsoft 365](/office/dev/add-ins/develop/requirements-property-unified-manifest).

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`capabilities`| Array | 100 | | Identifies the requirement sets.|
|`capabilities.name`| String | | ✔️ | Identifies the name of the requirement set. |
|`capabilities.minVersion`| String | | | Identifies the minimum version for the requirement set. |
|`capabilities.maxVersion`| String | | | Identifies the maximum version for the requirement set. |
|`scopes`| Array of enums | 1 | | Identifies the scopes in which the add-in can run and defines the Microsoft 365 applications in which the extension can run. For example, `mail` (Outlook). <br>Supported value: `mail` |
|`formFactors`| Array of enums | | | Identifies the form factors that support the add-in. <br>Supported values: `mobile`, `desktop`|

### extensions.runtimes

**Optional** &ndash; Array

The `extensions.runtimes` array configures the sets of runtimes and actions that each extension point can use.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`id`| String | 64 characters | ✔️ | Specifies the ID for runtime. |
|`type`| String enum | | ✔️ | Specifies the type of runtime. The supported enum value for [browser-based runtime](/office/dev/add-ins/testing/runtimes#browser-runtime) is `general`. |
|`code`| Object | | ✔️ | Specifies the location of code for the runtime. Based on `runtime.type`, add-ins can use either a JavaScript file or an HTML page with an embedded `script` tag that specifies the URL of a JavaScript file. Both URLs are necessary in situations where the `runtime.type` is uncertain. |
|`code.page`| String | 2048 characters | ✔️ | Specifies the URL of the web page that contains an embedded `script` tag, which specifies the URL of a JavaScript file (to be loaded in a [browser-based runtime](/office/dev/add-ins/testing/runtimes#browser-runtime)). |
|`code.script`| String | 2048 characters | | Specifies the URL of the JavaScript file to be loaded in [JavaScript-only runtime](/office/dev/add-ins/testing/runtimes#javascript-only-runtime). |
|`lifetime`| String enum | | | Specifies the lifetime of the runtime. Runtimes with a `short` lifetime don’t preserve state across executions while runtimes with a `long` lifetime do. For more information, see [Runtimes in Office Add-ins](/office/dev/add-ins/testing/runtimes).<br>Default value: `short`|
|`actions`| Array | 20 | | Specifies the set of actions supported by the runtime. An action is either running a JavaScript function or opening a view such as a task pane.|
|`actions.id`| String | 64 characters | ✔️ | Specifies the ID for the action, which is passed to the code file. |
|`actions.type`| String | | ✔️ | Specifies the type of action. The `executeFunction` type runs a JavaScript function without waiting for it to finish and the `openPage` type opens a page in a given view. |
|`actions.displayName`| String | 64 characters | | Specifies the display name of the action and it isn't the label of a button or a menu item that invokes the action (which is configured with `tabs.groups.controls.label`).|
|`actions.pinnable`| Boolean | | | Specifies that a task pane supports pinning, which keeps the task pane open when the user changes the selection. <br>Default value: `false`|
|`actions.view`| String | 64 characters | | Specifies the view where the page must be opened. It's used only when `actions.type` is `openPage`. |
|`actions.multiselect`| Boolean | | | Specifies whether the end user can select multiple items, such as multiple email messages, and apply the action to all of them.<br>Default value: `false`|
|`actions.supportsNoItemContext`| Boolean | | | Allows task pane add-ins to activate without the Reading Pane enabled or a message selected.<br>Default value: `false`|
|`requirements`| Object | | | Specifies the scopes, formFactors, and Office JavaScript Library requirement sets that must be supported on the Office client in order for the runtime to be included in the add-in. For more information, see [Specify Office Add-in requirements in the unified manifest for Microsoft 365](/office/dev/add-ins/develop/requirements-property-unified-manifest).|
|`requirements.capabilities`| Array | | | Identifies the requirement sets. <br>Options: `name` (required), `minVersion`, `maxVersion`|
|`requirements.capabilities.name`| String | | ✔️ | Identifies the name of the requirement set. |
|`requirements.capabilities.minVersion`| String | | | Identifies the minimum version for the requirement set. |
|`requirements.capabilities.maxVersion`| String | | | Identifies the maximum version for the requirement set. |
|`requirements.scopes`| Array of enums | 1 | | Identifies the scopes in which the add-in can run and defines the Microsoft 365 applications in which the extension can run. For example, `mail` (Outlook). <br>Supported value: `mail` |
|`requirements.formFactors`| Array of enums | | | Identifies the form factors that support the add-in. <br>Supported values: `mobile`, `desktop`|

To use `extensions.runtimes`, see [create add-in commands](/office/dev/add-ins/develop/create-addin-commands-unified-manifest), [configure the runtime for a task pane](/office/dev/add-ins/develop/create-addin-commands-unified-manifest#configure-the-runtime-for-the-task-pane-command), and [configure the runtime for the function command](/office/dev/add-ins/develop/create-addin-commands-unified-manifest#configure-the-runtime-for-the-function-command).

### extensions.ribbons

**Optional** &ndash; Array

The `extensions.ribbons` property provides the ability to add [add-in commands](/office/dev/add-ins/design/add-in-commands) (buttons and menu items) to the Microsoft 365 application's ribbon. The ribbon definition is selected from the array based on the requirements and first-of order.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`contexts`| Array | 8 | | Specifies the Microsoft 365 application window in which the ribbon customization is available to the user. Each item in the array is a member of a string array.<br>Supported values: `mailRead`, `mailCompose`, `meetingDetailsOrganizer`, `meetingDetailsAttendee`, `onlineMeetingDetailsOrganizer`, `logEventMeetingDetailsAttendee`, `spamReportingOverride`, `default`|
|`requirements`| Object | | | Specifies the scopes, formFactors, and Office JavaScript Library requirement sets that must be supported on the Office client in order for the ribbon customization to appear. For more information, see [Specify Office Add-in requirements in the unified manifest for Microsoft 365](/office/dev/add-ins/develop/requirements-property-unified-manifest).|
|`requirements.capabilities`| Array | | | Identifies the requirement sets. <br>Options: `name` (required), `minVersion`, `maxVersion`|
|`requirements.capabilities.name`| String | | ✔️ | Identifies the name of the requirement set. |
|`requirements.capabilities.minVersion`| String | | | Identifies the minimum version for the requirement set. |
|`requirements.capabilities.maxVersion`| String | | | Identifies the maximum version for the requirement set. |
|`requirements.scopes`| Array of enums | 1 | | Identifies the scopes in which the add-in can run and defines the Microsoft 365 applications in which the extension can run. For example, `mail` (Outlook). <br>Supported value: `mail` |
|`requirements.formFactors`| Array of enums | | | Identifies the form factors that support the add-in. <br>Supported values: `mobile`, `desktop`|
|`tabs`| Array | 20 |✔️| Configures the custom tabs on the Microsoft 365 application ribbon. |
|`tabs.id`| String | 64 characters | | Specifies the ID for the tab within the app.|
|`tabs.builtInTabId`| String | 64 characters | | Specifies the ID of a built-in Office ribbon tab. For more information on possible values, see [find the IDs of built-in Office ribbon tabs](/office/dev/add-ins/develop/built-in-ui-ids). The only other child properties of a tab object that can be included with this property are `groups` and `customMobileRibbonGroups`. |
|`tabs.label`| String | 64 characters | | Specifies the text displayed for the tab. Despite the maximum length of 64 characters, to correctly align the tab in the ribbon, we recommend you limit the label to 16 characters.|
|`tabs.position`| Object | | | Configures the position of the custom tab relative to other tabs on the ribbon.|
|`tabs.position.builtInTabId`| String | 64 characters | ✔️ | Specifies the ID of the built-in tab that the custom tab should be positioned next to. For more information, see [find the IDs of controls and control groups](/office/dev/add-ins/design/built-in-button-integration#find-the-ids-of-controls-and-control-groups).|
|`tabs.position.align`| String enum | | ✔️ | Defines the alignment of custom tab relative to the specified built-in tab. <br>Supported values: `after`, `before`|
|`tabs.groups`| Array | 10 | | Defines groups of controls on a ribbon tab on a non-mobile device. For mobile devices, see `tabs.customMobileRibbonGroups` below.|
|`tabs.groups.id`| String |64 characters | | Specifies the ID for the tab group within the app. It must be different from any built-in group ID in the Microsoft 365 application and any other custom group.|
|`tabs.groups.label`| String | 64 characters | | Specifies the text displayed for the group. Despite the maximum length of 64 characters, to correctly align the tab in the ribbon, we recommend you limit the label to 16 characters.|
|`tabs.groups.icons`| Array | 3 | | Specifies the icons displayed for the group. |
|`tabs.groups.icons.size`| Number | |✔️| Specifies the size of the icon in pixels, enumerated as `16`,`20`,`24`,`32`,`40`,`48`,`64`,`80`. <br>Required image sizes: `16`, `32`, `80`. |
|`tabs.groups.icons.url`| String | 2048 characters | ✔️ | Specifies the absolute URL of the icon.|
|`tabs.groups.controls`| Array | | | Configures the buttons and menus in the group. |
|`tabs.groups.controls.id`| String | 64 characters| ✔️ | Specifies the ID for the control within the app. It must be different from any built-in control ID in the Microsoft 365 application and any other custom control. |
|`tabs.groups.controls.items`| Array | | | Configures the items for a menu control. |
|`tabs.groups.controls.items.id`| String | | ✔️ | Specifies the ID for a menu item. |
|`tabs.groups.controls.items.type`| String enum | | ✔️ | Defines the menu item's control type. <br>Supported values: `button`|
|`tabs.groups.controls.items.label`| String | 64 characters| ✔️ | Specifies the text displayed for the menu item. |
|`tabs.groups.controls.items.icons`| Array | | | Configures the icons for the menu item.|
|`tabs.groups.controls.items.icons.size`| Number | |✔️| Specifies the size of the icon in pixels, enumerated as `16`,`20`,`24`,`32`,`40`,`48`,`64`,`80`. <br>Required image sizes: `16`, `32`, `80`. |
|`tabs.groups.controls.items.icons.url`| URL| | ✔️ | Specifies the absolute URL of the icon.|
|`tabs.groups.controls.items.supertip`| | |✔️| Configures a supertip for the menu item. A supertip is a UI feature that displays a brief box of help information about a control when the cursor hovers over it. The box may contain multiple lines of text. |
|`tabs.groups.controls.items.supertip.title`| String | 64 characters | ✔️ | Specifies the title text of the supertip.|
|`tabs.groups.controls.items.supertip.description`| String | 128 characters | ✔️ | Specifies the description of the supertip.|
|`tabs.groups.controls.items.actionId`| String | 64 characters | ✔️ | Specifies the ID of the action that is taken when a user selects the control or menu item. The `actionId` must match with some `runtimes.actions.id` property value. |
|`tabs.groups.controls.items.enabled`| Boolean | | | Indicates whether the menu item is initially enabled. <br>Default value: `true`|
|`tabs.groups.controls.items.overriddenByRibbonApi`| Boolean | | | Specifies whether the menu item is hidden on application and platform combinations which support the API ([Office.ribbon.requestCreateControls](/javascript/api/office/office.ribbon#office-office-ribbon-requestcreatecontrols-member(1))). This API installs custom contextual tabs on the ribbon. <br>Default value: `false`|
|`tabs.groups.controls.type`| String | | ✔️ | Defines the control type. <br>Supported values: `button`, `menu`|
|`tabs.groups.controls.builtInControlId`| String | 64 characters | | Specifies the ID of an existing Microsoft 365 control. For more information, see [find the IDs of controls and control groups](/office/dev/add-ins/design/built-in-button-integration#find-the-ids-of-controls-and-control-groups). This property can't be combined with any other child properties of the control object because built-in controls are not customizable by an add-in.|
|`tabs.groups.controls.label`| String | 64 characters | ✔️ | Specifies the text displayed for the control. Despite the maximum length of 64 characters, to correctly align the tab in the ribbon, we recommend you limit the label to 16 characters.|
|`tabs.groups.controls.icons`| Array | | ✔️ | Defines the icons for the control. There must be at least three child objects; one each with `size` properties of `16`, `32`, and `80` pixels. |
|`tabs.groups.controls.icons.size`| Number | | ✔️ | Specifies the size of the icon in pixels, enumerated as `16`,`20`,`24`,`32`,`40`,`48`,`64`,`80`. <br> Required image sizes: `16`, `32`, `80`|
|`tabs.groups.controls.icons.url`| URL | | | Specifies the absolute URL to the icon file.|
|`tabs.groups.controls.supertip`| Object | | ✔️ | Configures a supertip for the control. A supertip is a UI feature that displays a brief box of help information about a control when the cursor hovers over it. The box may contain multiple lines of text. |
|`tabs.groups.controls.supertip.title`| String | 64 characters | ✔️ |Specifies the title text of the supertip.|
|`tabs.groups.controls.supertip.description`| String | 128 characters | ✔️ | Specifies the description of the supertip.|
|`tabs.groups.controls.actionId`| String | 64 characters | | Required if the control type is `button`. Don't use if the control type is `menu`. Specifies the ID of the action that is taken when a user selects the control. The `actionId` must match the `runtime.actions.id` property of an action in the `runtimes` object.|
|`tabs.groups.controls.enabled`| Boolean | | | Indicates whether the control is initially enabled. <br>Default value: `true`|
|`tabs.groups.controls.overriddenByRibbonApi`| Boolean | | | Specifies whether the control is hidden on application and platform combinations which support the API ([Office.ribbon.requestCreateControls](/javascript/api/office/office.ribbon#office-office-ribbon-requestcreatecontrols-member(1))). This API installs custom contextual tabs on the ribbon. <br>Default value: `false`|
|`tabs.groups.builtInGroupId`| String | 64 characters | | Specifies the ID of a built-in group. For more information, see [find the IDs of controls and control groups](/office/dev/add-ins/design/built-in-button-integration#find-the-ids-of-controls-and-control-groups). This property can't be combined with any other child properties of the group object because built-in groups are not customizable by an add-in.|
|`tabs.customMobileRibbonGroups`| Array | 10 | | Defines groups of controls on the default tab of the ribbon on a mobile device. This array property can only be present on tab objects that have a `tabs.builtInTabId` property that is set to `DefaultTab`. For non-mobile devices, see `tabs.groups` above.|
|`tabs.customMobileRibbonGroups.id` | String | 250 characters | ✔️ | Specifies the ID of the group. It must be different from any built-in group ID in the Microsoft 365 application and any other custom group.|
|`tabs.customMobileRibbonGroups.label` | String | 32 characters | ✔️ | Specifies the label on the group. |
|`tabs.customMobileRibbonGroups.controls` | Array | 20 | ✔️ | Defines the controls in the group. Only mobile buttons are supported.|
|`tabs.customMobileRibbonGroups.controls.id` | String | 250 characters | ✔️ | Specifies the ID of the control such as `msgReadFunctionButton`.|
|`tabs.customMobileRibbonGroups.controls.type` | String enum |  | ✔️ | Specifies the type of control. `MobileButton` is only supported.|
|`tabs.customMobileRibbonGroups.controls.label` | String | 32 characters | ✔️ | Specifies the label on the control.|
|`tabs.customMobileRibbonGroups.controls.actionId` | String | 64 characters | ✔️ | Specifies the ID of the action that is taken when a user selects the control. The `actionId` must match the `runtime.actions.id` property of an action in the `runtimes` object.|
|`tabs.customMobileRibbonGroups.controls.icons` | Array | 9 | ✔️ | Specifies the icons that will appear on the control depending on the dimensions and DPI of the mobile device screen. There must be exactly 9 icons.|
|`tabs.customMobileRibbonGroups.controls.icons.size` | Number enum | | ✔️ | Size in pixels of the icon. The possible sizes are 25, 32, and 48. There must be exactly one of each size for each possible value of the icons's `scale` property. |
|`tabs.customMobileRibbonGroups.controls.icons.url` | String | 2048 characters | ✔️ | The full, absolute URL of the icon's image file. |
|`tabs.customMobileRibbonGroups.controls.icons.scale` | Number enum | | ✔️ | Specifies the UIScreen.scale property for iOS devices. The possible values are 1, 2, and 3. There must be exactly one of each value for each possible value of the icons's `size` property. |
|`fixedControls`| Array | 1 | | Configures the button of an [integrated spam-reporting](/office/dev/add-ins/outlook/spam-reporting) add-in in Outlook. Must configure if `spamReportingOverride` is specified in the `extensions.ribbons.contexts` array. |
|`fixedControls.id`| String | 64 characters | ✔️ | Specifies the unique ID of the button of a spam-reporting add-in. |
|`fixedControls.type`| String | | ✔️ | Defines the control type of a spam-reporting add-in. <br>Supported value: `button` |
|`fixedControls.label`| String | 64 characters | ✔️ | Specifies the text that appears on  button of a spam-reporting add-in. |
|`fixedControls.enabled`| Boolean | | ✔️ | This property must be specified in the `fixedControls` object. However, it doesn't affect the functionality of a spam-reporting add-in.<br>Default value: `True` |
|`fixedControls.icons`| Array | 3 | ✔️ | Defines the icons for the button of a spam-reporting add-in. There must be at least three child objects, each with icon sizes of `16`, `32`, and `80` pixels respectively.|
|`fixedControls.icons.size`| Number | | ✔️ | Specifies the size of the icon in pixels, enumerated as `16`, `20`, `24`, `32`, `40`, `48`, `64`, and `80`.<br>Required image sizes: `16`, `32`, `80` |
|`fixedControls.icons.url`| String | 2048 characters | ✔️ | Specifies the absolute URL to the icon. |
|`fixedControls.supertip`| Object | | ✔️ | Configures a supertip for the button of a spam-reporting add-in. |
|`fixedControls.supertip.title`| String | 64 characters | ✔️ | Specifies the title text of the supertip. |
|`fixedControls.supertip.description`| String | 250 characters | ✔️ | Specifies the description of the supertip. |
|`fixedControls.actionId`| String | 64 characters | ✔️ | Specifies the ID of the action taken when a user selects the button of a spam-reporting add-in. The `actionId` must match the `runtime.actions.id` property of an action in the `runtimes` object. |
|`spamPreProcessingDialog`| Object | | | Configures the preprocessing dialog of an [integrated spam-reporting](/office/dev/add-ins/outlook/spam-reporting) add-in in Outlook. |
|`spamPreProcessingDialog.title`| String | 128 characters | ✔️ | Specifies the custom title of the preprocessing dialog of a spam-reporting add-in. |
|`spamPreProcessingDialog.description`| String | 250 characters | ✔️ | Specifies the custom text that appears in the preprocessing dialog of a spam-reporting add-in. |
|`spamPreProcessingDialog.spamReportingOptions`| Object | | | Specifies up to five options that a user can select from the preprocessing dialog to provide a reason for reporting a message. |
|`spamPreProcessingDialog.spamReportingOptions.title`| String | 128 characters | ✔️ | Specifies the custom text or title to describe the reporting options provided in the preprocessing dialog. |
|`spamPreProcessingDialog.spamReportingOptions.options`| Array of strings | 5 options<br><br>128 characters per option | ✔️ | Specifies a custom option with a checkbox that a user can select from the preprocessing dialog to provide a reason for reporting a message. At least one option must be specified. A maximum of five options can be included.|
|`spamPreProcessingDialog.spamFreeTextSectionTitle`| String | 128 characters | | Adds a text box to the preprocessing dialog for users to provide additional information on the message they're reporting. The string provided in this property appears above the text box. |
|`spamPreProcessingDialog.spamMoreInfo`| Object | | | Configures a link to provide informational resources to a user. In the preprocessing dialog, the link appears below the text provided in `spamPreProcessingDialog.description`.|
|`spamPreProcessingDialog.spamMoreInfo.text`| String | 128 characters | ✔️ | Specifies the link text for a URL that directs users to informational resources from the preprocessing dialog. |
|`spamPreProcessingDialog.spamMoreInfo.url`| String | 2048 characters | ✔️ | Specifies the HTTPS URL of a site that contains informational resources. |

To use `extensions.ribbons`, see [create add-in commands](/office/dev/add-ins/develop/create-addin-commands-unified-manifest), [configure the UI for the task pane command](/office/dev/add-ins/develop/create-addin-commands-unified-manifest#configure-the-ui-for-the-task-pane-command), and [configure the UI for the function command](/office/dev/add-ins/develop/create-addin-commands-unified-manifest#configure-the-ui-for-the-function-command).

### extensions.autoRunEvents

**Optional** &ndash; Array

The `extensions.autoRunEvents` property defines event-based activation extension points.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`events`| Array |20 | ✔️ | Configures the event that cause actions in an Outlook Add-in to run automatically. For example, see [use smart alerts and the `OnMessageSend` and `OnAppointmentSend` events in your Outlook Add-ins](/office/dev/add-ins/outlook/smart-alerts-onmessagesend-walkthrough?tabs=jsonmanifest).|
|`events.type`| String | 64 characters | | Specifies the type of event. For supported types, see [supported events](/office/dev/add-ins/outlook/autolaunch?tabs=xmlmanifest#supported-events).|
|`events.actionId`| String | 64 characters | | Identifies the action that is taken when the event fires. The `actionId` must match with `runtime.actions.id`. |
|`events.options`| Object | | | Configures how Outlook responds to the event.|
|`events.options.sendMode`| String | | ✔️ | Specifies the actions to take during a mail send action. <br>Supported values: `promptUser`, `softBlock`, `block`. For more information, see [available send mode options](/office/dev/add-ins/outlook/smart-alerts-onmessagesend-walkthrough?tabs=jsonmanifest#available-send-mode-options).|
|`requirements`| Object | | | Specifies the scopes, formFactors, and Office JavaScript Library requirement sets that must be supported on the Office client in order for the event handling code to run. For more information, see [Specify Office Add-in requirements in the unified manifest for Microsoft 365](/office/dev/add-ins/develop/requirements-property-unified-manifest).|
|`requirements.capabilities`| Array | | | Identifies the requirement sets. <br>Options: `name` (required), `minVersion`, `maxVersion`|
|`requirements.capabilities.name`| String | | ✔️ | Identifies the name of the requirement set. |
|`requirements.capabilities.minVersion`| String | | | Identifies the minimum version for the requirement set. |
|`requirements.capabilities.maxVersion`| String | | | Identifies the maximum version for the requirement set. |
|`requirements.scopes`| Array of enums | 1 | | Identifies the scopes in which the add-in can run and defines the Microsoft 365 applications in which the extension can run. For example, `mail` (Outlook). <br>Supported value: `mail` |
|`requirements.formFactors`| Array of enums | | | Identifies the form factors that support the add-in. <br>Supported values: `mobile`, `desktop`|

### extensions.alternates

The `extensions.alternates` property is used to hide or prioritize specific in-market add-ins when you've published multiple add-ins with overlapping functionality.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`prefer`| Object | | | Specifies the backward compatibility with an equivalent COM add-in, XLL add-in, or both.|
|`prefer.comAddin`| Object | | | Specifies a COM add-in that must be used in place of the Microsoft 365 Web Add-in for Windows.|
|`prefer.comAddin.progId`| String | 64 characters | ✔️ | Identifies the application type in which the extension can run.|
|`hide`| Object | | | Configures how to hide another add-in that you've published whenever the add-in is installed, so users don't see both in the Microsoft 365 UI. For example, use this property when you've previously published an add-in that uses the old XML app manifest and you're replacing it with a version that uses the new JSON app manifest. |
|`hide.storeOfficeAddin`| Object | | | Specifies a Microsoft 365 Add-in available in Microsoft AppSource. |
|`hide.storeOfficeAddin.officeAddinId`| String | 64 characters | ✔️ | Specifies the ID of the in-market add-in to hide. The GUID is taken from the app manifest `id` property if the in-market add-in uses the JSON app manifest. The GUID is taken from the `<Id>` element if the in-market add-in uses the XML app manifest. |
|`hide.storeOfficeAddin.assetId`| String | 64 characters | ✔️ | Specifies the AppSource asset ID of the in-market add-in to hide.|
|`hide.customOfficeAddin`| Object | | | Configures how to hide an in-market add-in that isn't distributed through AppSource.|
|`hide.customOfficeAddin.officeAddinId`|String | 64 characters | ✔️ | Specifies the ID of the in-market add-in to hide. The GUID is taken from the app manifest `id` property if the in-market add-in uses the JSON app manifest. The GUID is taken from the `<Id>` element if the in-market add-in uses the XML app manifest. |
|`requirements`| Object | | | Specifies the scopes, formFactors, and Office JavaScript Library requirement sets that must be supported on the Office client in order for the "hide", "prefer", or "alternateIcons" properties to take effect. For more information, see [Specify Office Add-in requirements in the unified manifest for Microsoft 365](/office/dev/add-ins/develop/requirements-property-unified-manifest).|
|`requirements.capabilities`| Array | | | Identifies the requirement sets. <br>Options: `name` (required), `minVersion`, `maxVersion`|
|`requirements.capabilities.name`| String | | ✔️ | Identifies the name of the requirement set. |
|`requirements.capabilities.minVersion`| String | | | Identifies the minimum version for the requirement set. |
|`requirements.capabilities.maxVersion`| String | | | Identifies the maximum version for the requirement set. |
|`requirements.scopes`| Array of enums | 1 | | Identifies the scopes in which the add-in can run and defines the Microsoft 365 applications in which the extension can run. For example, `mail` (Outlook). <br>Supported value: `mail` |
|`requirements.formFactors`| Array of enums | | | Identifies the form factors that support the add-in. <br>Supported values: `mobile`, `desktop`|
|`alternateIcons`| Object | | | Specifies the main icons that are used to represent the add-in on older versions of Office. This property is **required** if the Office add-in is to be installable in Office on Mac, perpetual Office licenses, and Microsoft 365 subscription versions of Office on Windows earlier than 2304 (Build 16320.00000).|
|`alternateIcons.icon`| Object | | ✔️ | Specifies properties of the image file used to represent the add-in. |
|`alternateIcons.icon.size`| Number enum | | ✔️ | Specifies the size of the icon in pixels, enumerated as `16`,`20`,`24`,`32`,`40`,`48`,`64`,`80`. <br>Required image sizes: `16`, `32`, `80`. |
|`alternateIcons.icon.url`| String | 2048 characters | ✔️ | Specifies the full, absolute URL of the image file that is used to represent the add-in. Icon image must be 64 x 64 pixels and use one of the following file formats: GIF, JPG, PNG, EXIF, BMP, TIFF.|
|`alternateIcons.highResolutionIcon`| Object | | ✔️ | Specifies properties of the image file used to represent the add-in on high DPI screens. |
|`alternateIcons.highResolutionIcon.size`| Number enum | | ✔️ | Specifies the size of the icon in pixels, enumerated as `16`,`20`,`24`,`32`,`40`,`48`,`64`,`80`. <br>Required image sizes: `16`, `32`, `80`. |
|`alternateIcons.highResolutionIcon.url`| String | 2048 characters | ✔️ | Specifies the full, absolute URL of the image file that is used to represent the add-in on high DPI screens. Icon image must be 128 x 128 pixels and use one of the following file formats: GIF, JPG, PNG, EXIF, BMP, TIFF.|

## actions

> [!NOTE]
>
> * Actions for Microsoft 365 is available in [public developer preview](../dev-preview/developer-preview-intro.md).
>
> * Actions is supported for Microsoft 365 (Office) app for web and desktop.

The object is an array of action objects. This block is required only for solutions that provides Actions.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`id`| String | 64 characters | ✔️ | An identifier string in the default locale that is used to catalog actions. Must be unique across all actions for this app. For example, `openDocInContoso`.  |
|`displayName`| String | 64 characters | ✔️ | A display name for the action. Capitalize first letter and brand name. For example, Add to suppliers, Open in Contoso, and Request signatures.|
|`description`| String | | ✔️ | Specifies the description of the actions. |
|`intent`| String enum |  | ✔️ | Specifies the type of intent. The supported enum values are `open`, `addTo`, and `custom`. |
|`handlers`| Array of objects | | ✔️ | An array of handler objects defines how Actions are managed. In the current public preview, add a single handler for each action. |

### actions.handlers

Defines the handlers of the Action. The handlers are an array of handler objects. Each Action must have at least one handler.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`supportedObjects`| Object | |  | Objects defining what objects can trigger this Action. |
|`type`| String enum | | ✔️ | Specifies the handler type of Actions. The supported enum value is  `openPage`. |
|`pageInfo`| Object | |  | Required if the handler type is `openPage`. Object containing metadata of the page to open. |

### actions.handlers.supportedObjects

The supported object types that can trigger this Action.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`file`| Object | |  | Supported file types. |
|`file.extensions`| Array of strings | |  | Array of strings. File extensions of the file type the Action can trigger. For example, pdf and docx.|

### actions.handlers.pageInfo

Required if the handler type is `openPage`. Object containing metadata of the page to open.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`PageId`| String | |  | Maps to the `EntityId` of the static tab. |
|`SubPageId`| String | |  | Maps to the `SubEntityId` of the static tab. |

## dashboardCards

**Optional** &ndash; Array

Defines a list of cards that can be pinned to a dashboard, such as Microsoft Viva Connections, to provide a summarized view of app information. For more information on creating cards for Viva Connections Dashboard, see [overview of Bot Powered Adaptive Card Extensions](/sharepoint/dev/spfx/viva/bot-powered/overview-bot-powered-aces).

The `dashboardCards` property is an array of elements of the type `object`.

### dashboardCards.dashboardCard

Defines a single dashboard card and its properties.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`id`| String | | ✔️ |  A unique identifier for this dashboard card. The ID must be a GUID. |
|`displayName`| String | 255 characters | ✔️ | Display name of the card.|
|`description`| String | 255 characters | ✔️ | Description of the card.|
|`pickerGroupId`| String | | ✔️ | ID of the group in the card picker. The ID must be a GUID. |
|`icon`| Object | | | Specifies the icon for the card. |
|`contentSource`| Object | | ✔️ | Specifies the source of the card's content |
|`defaultSize`| String | | ✔️ | Rendering size for the dashboard card. Options: `medium` or `large`. |

### dashboardCards.dashboardCard.icon

Defines the icon properties of a given dashboard card.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`iconUrl`| String | 2048 characters | | Location of the icon for the card, to be displayed in the toolbox and card bar. |
|`officeUIFabricIconName`| String | 255 characters | | Office UI Fabric or Fluent UI icon friendly name for the card. This value is used if `iconUrl` is not specified. |

### dashboardCards.dashboardCard.contentSource

Defines the content source of a given dashboard card.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`sourceType`| String | | | Represents the source of a card's content. Option: `bot`.
|`botConfiguration`| Object | | | The configuration for the bot source. Required if the `sourceType` is set to `bot`. |

#### dashboardCards.dashboardCard.contentSource.botConfiguration

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`botId`| String | | | The unique Microsoft app ID for the bot as registered with the Bot Framework. The ID must be a GUID. |

## See also

* [Understand the Microsoft Teams app structure](~/concepts/design/app-structure.md)
* [Enable app customization](~/concepts/design/enable-app-customization.md)
* [Localize your app](~/concepts/build-and-test/apps-localization.md)
* [Integrate media capabilities](~/concepts/device-capabilities/media-capabilities.md)
* [Different versions of app manifest schema](https://github.com/microsoft/json-schemas/tree/main/teams)
