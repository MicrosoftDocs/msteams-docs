---
title: Localize JSON Schema Reference
description: Learn and know about the localization schema supported by the localization file for Microsoft Teams using an example schema and about schema versions.
ms.topic: reference
ms.localizationpriority: medium
ms.date: 04/14/2025
---

# Localize JSON schema reference

The Microsoft Teams localization file describes language translations that are served based on the client language settings.

> [!TIP]
> Specify the schema at the beginning of your manifest to enable `IntelliSense` or similar support from your code editor: `"$schema": "https://developer.microsoft.com/json-schemas/teams/v1.21/MicrosoftTeams.schema.json".`

## Localization schema v1.21

Your file must conform to the schema hosted at [https://developer.microsoft.com/en-us/json-schemas/teams/v1.21/MicrosoftTeams.Localization.schema.json](https://developer.microsoft.com/en-us/json-schemas/teams/v1.21/MicrosoftTeams.Localization.schema.json).

Example of localization JSON schema v1.21 is as follows:

```json
{
    "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.21/MicrosoftTeams.Localization.schema.json",
    "name.short": "Portail de Développement",
    "name.full": "Portail des développeurs",
    "description.short": "Configurer, distribuer et gérer vos applications Microsoft Teams",
    "description.full": "Anciennement App Studio, le portail des développeurs peut vous aider où que vous soyez dans votre parcours de développement d’applications Microsoft Teams.1. Configurez une nouvelle application ou importez une application existante.2. Configurez les fonctionnalités de votre application et d’autres métadonnées importantes.3. Obtenez des ressources pour vous aider à créer une application de haute qualité.3. Testez votre application directement dans Teams.4. Distribuez votre application dans votre organisation ou dans le Store Teams.5. Analysez l’utilisation, l’engagement et d’autres informations sur votre application. Le portail inclut également des outils pour concevoir des scènes virtuelles personnalisées, des cartes adaptatives et l’intégration à la Plateforme d’identités Microsoft.",
    "staticTabs[0].name": "Accueil",
    "staticTabs[1].name": "Applications",
    "staticTabs[2].name": "Outils",
    "staticTabs[3].name": "Developer Portal",
    "bots[0].commandLists[0].commands[0].title": "Rechercher",
    "bots[0].commandLists[0].commands[0].description": "Rechercher la documentation Teams appropriée"
}
```

The schema defines the following properties:

|Property|Type|Maximum length|Description|Required|
|---------------|--------|---------|------------------|----|
|`$schema`|URL|String|The `https://` URL referencing the JSON schema for the manifest.||
|`name.short`|String|30|Specifies a localized value for the [name.short property](manifest-schema.md#name). The short display name for the app. It replaces the corresponding string from the app manifest with the value provided here.|✔️|
|`name.full`|String|100|Specifies a localized value for the [name.full property](manifest-schema.md#name). The full name of the app. It replaces the corresponding string from the app manifest with the value provided here.||
|`description.short`|String|80|Specifies a localized value for the [description.short property](manifest-schema.md#description). A short description of the app, used when space is limited. It replaces the corresponding string from the app manifest with the value provided here.|✔️|
|`description.full`|String|4000|Specifies a localized value for the [description.full property](manifest-schema.md#description). The full description of the app. It replaces the corresponding string from the app manifest with the value provided here.|✔️|
|`localizationKeys`|Object||Represents custom tokenized keys for localized strings in agents. Each key is represented by a property name that matches a regular expression (with the following format: `^\[\[[a-zA-Z_][a-zA-Z0-9_]*\]\]$`) and the value provides the localized string value. For more information, see [localize your agent](/microsoft-365-copilot/extensibility/agents-are-apps#localizing-your-agent).||
|`staticTabs\\[([0-9]/1[0-5])\\]\\.name`|String|128|Specifies a localized value for the [staticTabs.name property](manifest-schema.md#statictabs). The property name should be a JSON path expression in the following form: `staticTabs[0-15].name`.||
|`bots\\[0\\]\\.commandLists\\[[0-2]\\]\\.commands\\[[0-9]\\]\\.title`|String|32|Specifies a localized value for the [bots.commandLists.commands.title property](manifest-schema.md#bots). The property name should be a JSON path expression in the following form: `bots[0].commandLists[0-2].commands[0-9].title`.||
|`bots\\[0\\]\\.commandLists\\[[0-2]\\]\\.commands\\[[0-9]\\]\\.description`|String|128|Specifies a localized value for the [bots.commandLists.commands.description property](manifest-schema.md#bots). The property name should be a JSON path expression in the following form: `bots[0].commandLists[0-2].commands[0-9].description`.||
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.title`|String|32|Specifies a localized value for the [composeExtensions.commands.title property](manifest-schema.md#composeextensionscommands). The property name should be a JSON path expression in the following form: `composeExtensions[0].commands[0-9].title`.||
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.description`|String|128|Specifies a localized value for the [composeExtensions.commands.description property](manifest-schema.md#composeextensionscommands). The property name should be a JSON path expression in the following form: `composeExtensions[0].commands[0-9].description`.||
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.title`|String|32|Specifies a localized value for the [composeExtensions.commands.parameters.title property](manifest-schema.md#composeextensionscommands). The property name should be a JSON path expression in the following form: `composeExtensions[0].commands[0-9].parameters[0-4].title`.||
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.description`|String|128|Specifies a localized value for the [composeExtensions.commands.parameters.description property](manifest-schema.md#composeextensionscommands). The property name should be a JSON path expression in the following form: `composeExtensions[0].commands[0-9].parameters[0-4].description`.||
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.value`|String|512|Specifies a localized value for the [composeExtensions.commands.parameters.value property](manifest-schema.md#composeextensionscommands). The property name should be a JSON path expression in the following form: `composeExtensions[0].commands[0-9].parameters[0-4].value`.||
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.choices\\[[0-9]\\]\\.title`|String|128|Specifies a localized value for the [composeExtensions.commands.parameters.choices.title property](manifest-schema.md#composeextensionscommands). The property name should be a JSON path expression in the following form: `composeExtensions[0].commands[0-9].parameters[0-4].choices[0-9].title`.||
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.samplePrompts\\[[0-4]\\]\\.text`|String|128|Specifies a localized value for the [composeExtensions.commands.samplePrompts.text property](manifest-schema.md#composeextensionscommands). The property name should be a JSON path expression in the following form: `composeExtensions[0].commands[0-9].samplePrompts[0-4].text`.||
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.taskInfo\\.title`|String|64|Specifies a localized value for the [composeExtensions.commands.taskInfo.title property](manifest-schema.md#composeextensionscommands). The property name should be a JSON path expression in the following form: `composeExtensions[0].commands[0-9].taskInfo.title`.||
|`activities.activityTypes.description`|String|128|Specifies a localized value for the [activities.activityTypes.description property](manifest-schema.md#activitiesactivitytypes). The property name should be a JSON path expression in the following form: activities.`activityTypes[0-127].description`.||
|`activities.activityTypes.templateText`|String|128|Specifies a localized value for the [activities.activityTypes.templateText property](manifest-schema.md#activitiesactivitytypes). The property name should be a JSON path expression in the following form: `activities.activityTypes[0-127].templateText`.||
|`meetingExtensionDefinition.scenes\\[[0-9]\\]\\.name`|String|128|Specifies a localized value for the [meetingExtensionDefinition.scenes.name property](manifest-schema.md#meetingextensiondefinition). The property name should be a JSON path expression in the following form: `meetingExtensionDefinition.scenes[0-9].name`.||
|`extensions\\[[0]\\]\\.audienceClaimUrl$`|String|2048|Specifies a localized value for the [extensions.audienceClaimUrl property](manifest-schema.md#extensions). The property name should be a JSON path expression in the following form: `extensions[0].audienceClaimUrl`.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.label`|String|64|Specifies a localized value for the [extensions.ribbons.tabs.label property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].tabs[0-19].label`.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.customMobileRibbonGroups\\[[0-9]\\]\\.label`|String|32|Specifies a localized value for the [extensions.ribbons.tabs.customMobileRibbonGroups.label property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].tabs[0-19].customMobileRibbonGroups[0-9].label`.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.customMobileRibbonGroups\\[[0-9]\\]\\.controls\\[[1]?[0-9]\\]\\.icons\\[[0-8]\\]\\.url`|String|2048|Specifies a localized value for the [extensions.ribbons.tabs.customMobileRibbonGroups.controls.icons.url property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].tabs[0-19].customMobileRibbonGroups[0-9].controls[0-19].icons[0-8].url`.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.customMobileRibbonGroups\\[[0-9]\\]\\.controls\\[[1]?[0-9]\\]\\.label`|String|32|Specifies a localized value for the [extensions.ribbons.tabs.customMobileRibbonGroups.controls.label property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].tabs[0-19].customMobileRibbonGroups[0-9].controls[0-19].label`.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.groups\\[[0-9]\\]\\.icons\\[[0-2]\\]\\.url`|String|2048|Specifies a localized value for the [extensions.ribbons.tabs.groups.icons.url property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].tabs[0-19].groups[0-9].icons[0-2].url`.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.groups\\[[0-9]\\]\\.label`|String|64|Specifies a localized value for the [extensions.ribbons.tabs.groups.label property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].tabs[0-19].groups[0-9].label`.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.groups\\[[0-9]\\]\\.controls\\[[1]?[0-9]\\]\\.icons\\[[0-2]\\]\\.url`|String|2048|Specifies a localized value for the [extensions.ribbons.tabs.groups.controls.icons.url property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].tabs[0-19].groups[0-9].controls[0-19].icons[0-2].url`.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.groups\\[[0-9]\\]\\.controls\\[[1]?[0-9]\\]\\.label`|String|64|Specifies a localized value for the [extensions.ribbons.tabs.groups.controls.label property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].tabs[0-19].groups[0-9].controls[0-19].label`.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.groups\\[[0-9]\\]\\.controls\\[[1]?[0-9]\\]\\.supertip\\.title`|String|64|Specifies a localized value for the [extensions.ribbons.tabs.groups.controls.supertip.title property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].tabs[0-19].groups[0-9].controls[0-19].supertip.title`.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.groups\\[[0-9]\\]\\.controls\\[[1]?[0-9]\\]\\.supertip\\.description`|String|250|Specifies a localized value for the [extensions.ribbons.tabs.groups.controls.supertip.description property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].tabs[0-19].groups[0-9].controls[0-19].supertip.description`.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.groups\\[[0-9]\\]\\.controls\\[[1]?[0-9]\\]\\.items\\[[1]?[0-9]\\]\\.icons\\[[0-2]\\]\\.url`|String|2048|Specifies a localized value for the [extensions.ribbons.tabs.groups.controls.items.icons.url property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].tabs[0-19].groups[0-9].controls[0-19].items[0-19].icons[0-2].url`.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.groups\\[[0-9]\\]\\.controls\\[[1]?[0-9]\\]\\.items\\[[1]?[0-9]\\]\\.label`|String|64|Specifies a localized value for the [extensions.ribbons.tabs.groups.controls.items.label property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].tabs[0-19].groups[0-9].controls[0-19].items[0-19].label`.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.groups\\[[0-9]\\]\\.controls\\[[1]?[0-9]\\]\\.items\\[[1]?[0-9]\\]\\.supertip\\.title`|String|64|Specifies a localized value for the [extensions.ribbons.tabs.groups.controls.items.supertip.title property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].tabs[0-19].groups[0-9].controls[0-19].items[0-19].supertip.title`.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.groups\\[[0-9]\\]\\.controls\\[[1]?[0-9]\\]\\.items\\[[1]?[0-9]\\]\\.supertip\\.description`|String|250|Specifies a localized value for the [extensions.ribbons.tabs.groups.controls.items.supertip.description property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].tabs[0-19].groups[0-9].controls[0-19].items[0-19].supertip.description`.||
|`extensions.ribbons.fixedControls.label`|String|64| Specifies a localized value for the [extensions.ribbons.fixedControls.label property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].fixedControls[].label`.||
|`extensions.ribbons.fixedControls.supertip.title`|String|64| Specifies a localized value for the [extensions.ribbons.fixedControls.supertip.title property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].fixedControls[].supertip.title`.||
|`extensions.ribbons.fixedControls.supertip.description`|String|128| Specifies a localized value for the [extensions.ribbons.fixedControls.supertip.description property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].fixedControls[].supertip.description`.||
|`extensions.ribbons.spamPreProcessingDialog.title`|String|128| Specifies a localized value for the [extensions.ribbons.spamPreProcessingDialog.title property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].spamPreProcessingDialog.title`.||
|`extensions.ribbons.spamPreProcessingDialog.description`|String|250| Specifies a localized value for the [extensions.ribbons.spamPreProcessingDialog.description property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].spamPreProcessingDialog.description`.||
|`extensions.ribbons.spamPreProcessingDialog.spamFreeTextSectionTitle`|String|128| Specifies a localized value for the[extensions.ribbons.spamPreProcessingDialog.spamFreeTextSectionTitle property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].spamPreProcessingDialog.spamFreeTextSectionTitle`.||
|`extensions.ribbons.spamPreProcessingDialog.spamReportingOptions.title`|String|128| Specifies a localized value for the [extensions.ribbons.spamPreProcessingDialog.spamReportingOptions.title property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].spamPreProcessingDialog.spamReportingOptions.title`.||
|`extensions.ribbons.spamPreProcessingDialog.spamReportingOptions.options`|String|128| Specifies a localized value for the [extensions.ribbons.spamPreProcessingDialog.spamReportingOptions.options property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].spamPreProcessingDialog.spamReportingOptions.options[]`.||
|`extensions.ribbons.spamPreProcessingDialog.spamMoreInfo.text`|String|128| Specifies a localized value for the [extensions.ribbons.spamPreProcessingDialog.spamMoreInfo.text property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].spamPreProcessingDialog.spamMoreInfo.text`.||
|`extensions.ribbons.spamPreProcessingDialog.spamMoreInfo.url`|String|2048| Specifies a localized value for the [extensions.ribbons.spamPreProcessingDialog.spamMoreInfo.url property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].spamPreProcessingDialog.spamMoreInfo.url` .||
|`extensions\\[[0]\\]\\.runtimes\\[[1]?[0-9]\\]\\.code\\.page`|String|2048|Specifies a localized value for the [extensions.runtimes.code.page property](manifest-schema.md#extensionsruntimes). The property name should be a JSON path expression in the following form: `extensions[0].runtimes[0-19].code.page`.||
|`extensions\\[[0]\\]\\.runtimes\\[[1]?[0-9]\\]\\.code\\.script`|String|2048|Specifies a localized value for the [extensions.runtimes.code.script property](manifest-schema.md#extensionsruntimes). The property name should be a JSON path expression in the following form: `extensions[0].runtimes[0-19].code.script`.||
|`extensions\\[[0]\\]\\.runtimes\\[[1]?[0-9]\\]\\.actions\\[[1]?[0-9]\\]\\.displayName`|String|64|Specifies a localized value for the [extensions.runtimes.actions.displayName property](manifest-schema.md#extensionsruntimes). The property name should be a JSON path expression in the following form: `extensions[0].runtimes[0-19].actions[0-19].displayName`.||
|`extensions\\[[0]\\]\\.alternates\\[[0-9]\\]\\.alternateIcons\\.icon\\.url`|String|2048|Specifies a localized value for the [extensions.alternates.alternateIcons.icon.url property](manifest-schema.md#extensionsalternates). The property name should be a JSON path expression in the following form: `extensions[0].alternates[0-9].alternateIcons.icon.url`.||
|`extensions\\[[0]\\]\\.alternates\\[[0-9]\\]\\.alternateIcons\\.highResolutionIcon\\.url`|String|2048|Specifies a localized value for the [extensions.alternates.alternateIcons.highResolutionIcon.url property](manifest-schema.md#extensionsalternates). The property name should be a JSON path expression in the following form: `extensions[0].alternates[0-9].alternateIcons.highResolutionIcon.url`.||

</details>
<br/>

<details><summary>Localization schema v1.20</summary>

## Localization schema v1.20

Your file must conform to the schema hosted at [https://developer.microsoft.com/en-us/json-schemas/teams/v1.20/MicrosoftTeams.Localization.schema.json](https://developer.microsoft.com/en-us/json-schemas/teams/v1.20/MicrosoftTeams.Localization.schema.json).

Example of localization JSON schema v1.20 is as follows:

```json
{
    "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.20/MicrosoftTeams.Localization.schema.json",
    "name.short": "Portail de Développement",
    "name.full": "Portail des développeurs",
    "description.short": "Configurer, distribuer et gérer vos applications Microsoft Teams",
    "description.full": "Anciennement App Studio, le portail des développeurs peut vous aider où que vous soyez dans votre parcours de développement d’applications Microsoft Teams.1. Configurez une nouvelle application ou importez une application existante.2. Configurez les fonctionnalités de votre application et d’autres métadonnées importantes.3. Obtenez des ressources pour vous aider à créer une application de haute qualité.3. Testez votre application directement dans Teams.4. Distribuez votre application dans votre organisation ou dans le Store Teams.5. Analysez l’utilisation, l’engagement et d’autres informations sur votre application. Le portail inclut également des outils pour concevoir des scènes virtuelles personnalisées, des cartes adaptatives et l’intégration à la Plateforme d’identités Microsoft.",
    "staticTabs[0].name": "Accueil",
    "staticTabs[1].name": "Applications",
    "staticTabs[2].name": "Outils",
    "staticTabs[3].name": "Developer Portal",
    "bots[0].commandLists[0].commands[0].title": "Rechercher",
    "bots[0].commandLists[0].commands[0].description": "Rechercher la documentation Teams appropriée"
}
```

The schema defines the following properties:

|Property|Type|Maximum length|Description|Required|
|---------------|--------|---------|------------------|----|
|`$schema`|URL|String|The `https://` URL referencing the JSON schema for the manifest.||
|`name.short`|String|30|Specifies a localized value for the [name.short property](manifest-schema.md#name). The short display name for the app. It replaces the corresponding string from the app manifest with the value provided here.|✔️|
|`name.full`|String|100|Specifies a localized value for the [name.full property](manifest-schema.md#name). The full name of the app. It replaces the corresponding string from the app manifest with the value provided here.|✔️|
|`description.short`|String|80|Specifies a localized value for the [description.short property](manifest-schema.md#description). A short description of the app, used when space is limited. It replaces the corresponding string from the app manifest with the value provided here.|✔️|
|`description.full`|String|4000|Specifies a localized value for the [description.full property](manifest-schema.md#description). The full description of the app. It replaces the corresponding string from the app manifest with the value provided here.||
|`localizationKeys`|Object||Represents custom tokenized keys for localized strings in agents. Each key is represented by a property name that matches a regular expression (with the following format: `^\[\[[a-zA-Z_][a-zA-Z0-9_]*\]\]$`) and the value provides the localized string value. For more information, see [localize your agent](/microsoft-365-copilot/extensibility/agents-are-apps#localizing-your-agent).||
|`staticTabs\\[([0-9]/1[0-5])\\]\\.name`|String|128|Specifies a localized value for the [staticTabs.name property](manifest-schema.md#statictabs). The property name should be a JSON path expression in the following form: `staticTabs[0-15].name`.||
|`bots\\[0\\]\\.commandLists\\[[0-2]\\]\\.commands\\[[0-9]\\]\\.title`|String|32|Specifies a localized value for the [bots.commandLists.commands.title property](manifest-schema.md#bots). The property name should be a JSON path expression in the following form: `bots[0].commandLists[0-2].commands[0-9].title`.||
|`bots\\[0\\]\\.commandLists\\[[0-2]\\]\\.commands\\[[0-9]\\]\\.description`|String|128|Specifies a localized value for the [bots.commandLists.commands.description property](manifest-schema.md#bots). The property name should be a JSON path expression in the following form: `bots[0].commandLists[0-2].commands[0-9].description`.||
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.title`|String|32|Specifies a localized value for the [composeExtensions.commands.title property](manifest-schema.md#composeextensionscommands). The property name should be a JSON path expression in the following form: `composeExtensions[0].commands[0-9].title`.||
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.description`|String|128|Specifies a localized value for the [composeExtensions.commands.description property](manifest-schema.md#composeextensionscommands). The property name should be a JSON path expression in the following form: `composeExtensions[0].commands[0-9].description`.||
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.title`|String|32|Specifies a localized value for the [composeExtensions.commands.parameters.title property](manifest-schema.md#composeextensionscommands). The property name should be a JSON path expression in the following form: `composeExtensions[0].commands[0-9].parameters[0-4].title`.||
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.description`|String|128|Specifies a localized value for the [composeExtensions.commands.parameters.description property](manifest-schema.md#composeextensionscommands). The property name should be a JSON path expression in the following form: `composeExtensions[0].commands[0-9].parameters[0-4].description`.||
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.value`|String|512|Specifies a localized value for the [composeExtensions.commands.parameters.value property](manifest-schema.md#composeextensionscommands). The property name should be a JSON path expression in the following form: `composeExtensions[0].commands[0-9].parameters[0-4].value`.||
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.choices\\[[0-9]\\]\\.title`|String|128|Specifies a localized value for the [composeExtensions.commands.parameters.choices.title property](manifest-schema.md#composeextensionscommands). The property name should be a JSON path expression in the following form: `composeExtensions[0].commands[0-9].parameters[0-4].choices[0-9].title`.||
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.samplePrompts\\[[0-4]\\]\\.text`|String|128|Specifies a localized value for the [composeExtensions.commands.samplePrompts.text property](manifest-schema.md#composeextensionscommands). The property name should be a JSON path expression in the following form: `composeExtensions[0].commands[0-9].samplePrompts[0-4].text`.||
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.taskInfo\\.title`|String|64|Specifies a localized value for the [composeExtensions.commands.taskInfo.title property](manifest-schema.md#composeextensionscommands). The property name should be a JSON path expression in the following form: `composeExtensions[0].commands[0-9].taskInfo.title`.||
|`activities.activityTypes.description`|String|128|Specifies a localized value for the [activities.activityTypes.description property](manifest-schema.md#activitiesactivitytypes). The property name should be a JSON path expression in the following form: activities.`activityTypes[0-127].description`.||
|`activities.activityTypes.templateText`|String|128|Specifies a localized value for the [activities.activityTypes.templateText property](manifest-schema.md#activitiesactivitytypes). The property name should be a JSON path expression in the following form: `activities.activityTypes[0-127].templateText`.||
|`meetingExtensionDefinition.scenes\\[[0-9]\\]\\.name`|String|128|Specifies a localized value for the [meetingExtensionDefinition.scenes.name property](manifest-schema.md#meetingextensiondefinition). The property name should be a JSON path expression in the following form: `meetingExtensionDefinition.scenes[0-9].name`.||
|`extensions\\[[0]\\]\\.audienceClaimUrl$`|String|2048|Specifies a localized value for the [extensions.audienceClaimUrl property](manifest-schema.md#extensions). The property name should be a JSON path expression in the following form: `extensions[0].audienceClaimUrl`.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.label`|String|64|Specifies a localized value for the [extensions.ribbons.tabs.label property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].tabs[0-19].label`.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.customMobileRibbonGroups\\[[0-9]\\]\\.label`|String|32|Specifies a localized value for the [extensions.ribbons.tabs.customMobileRibbonGroups.label property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].tabs[0-19].customMobileRibbonGroups[0-9].label`.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.customMobileRibbonGroups\\[[0-9]\\]\\.controls\\[[1]?[0-9]\\]\\.icons\\[[0-8]\\]\\.url`|String|2048|Specifies a localized value for the [extensions.ribbons.tabs.customMobileRibbonGroups.controls.icons.url property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].tabs[0-19].customMobileRibbonGroups[0-9].controls[0-19].icons[0-8].url`.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.customMobileRibbonGroups\\[[0-9]\\]\\.controls\\[[1]?[0-9]\\]\\.label`|String|32|Specifies a localized value for the [extensions.ribbons.tabs.customMobileRibbonGroups.controls.label property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].tabs[0-19].customMobileRibbonGroups[0-9].controls[0-19].label`.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.groups\\[[0-9]\\]\\.icons\\[[0-2]\\]\\.url`|String|2048|Specifies a localized value for the [extensions.ribbons.tabs.groups.icons.url property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].tabs[0-19].groups[0-9].icons[0-2].url`.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.groups\\[[0-9]\\]\\.label`|String|64|Specifies a localized value for the [extensions.ribbons.tabs.groups.label property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].tabs[0-19].groups[0-9].label`.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.groups\\[[0-9]\\]\\.controls\\[[1]?[0-9]\\]\\.icons\\[[0-2]\\]\\.url`|String|2048|Specifies a localized value for the [extensions.ribbons.tabs.groups.controls.icons.url property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].tabs[0-19].groups[0-9].controls[0-19].icons[0-2].url`.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.groups\\[[0-9]\\]\\.controls\\[[1]?[0-9]\\]\\.label`|String|64|Specifies a localized value for the [extensions.ribbons.tabs.groups.controls.label property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].tabs[0-19].groups[0-9].controls[0-19].label`.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.groups\\[[0-9]\\]\\.controls\\[[1]?[0-9]\\]\\.supertip\\.title`|String|64|Specifies a localized value for the [extensions.ribbons.tabs.groups.controls.supertip.title property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].tabs[0-19].groups[0-9].controls[0-19].supertip.title`.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.groups\\[[0-9]\\]\\.controls\\[[1]?[0-9]\\]\\.supertip\\.description`|String|250|Specifies a localized value for the [extensions.ribbons.tabs.groups.controls.supertip.description property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].tabs[0-19].groups[0-9].controls[0-19].supertip.description`.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.groups\\[[0-9]\\]\\.controls\\[[1]?[0-9]\\]\\.items\\[[1]?[0-9]\\]\\.icons\\[[0-2]\\]\\.url`|String|2048|Specifies a localized value for the [extensions.ribbons.tabs.groups.controls.items.icons.url property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].tabs[0-19].groups[0-9].controls[0-19].items[0-19].icons[0-2].url`.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.groups\\[[0-9]\\]\\.controls\\[[1]?[0-9]\\]\\.items\\[[1]?[0-9]\\]\\.label`|String|64|Specifies a localized value for the [extensions.ribbons.tabs.groups.controls.items.label property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].tabs[0-19].groups[0-9].controls[0-19].items[0-19].label`.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.groups\\[[0-9]\\]\\.controls\\[[1]?[0-9]\\]\\.items\\[[1]?[0-9]\\]\\.supertip\\.title`|String|64|Specifies a localized value for the [extensions.ribbons.tabs.groups.controls.items.supertip.title property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].tabs[0-19].groups[0-9].controls[0-19].items[0-19].supertip.title`.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.groups\\[[0-9]\\]\\.controls\\[[1]?[0-9]\\]\\.items\\[[1]?[0-9]\\]\\.supertip\\.description`|String|250|Specifies a localized value for the [extensions.ribbons.tabs.groups.controls.items.supertip.description property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].tabs[0-19].groups[0-9].controls[0-19].items[0-19].supertip.description`.||
|`extensions.ribbons.fixedControls.label`|String|64| Specifies a localized value for the [extensions.ribbons.fixedControls.label property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].fixedControls[].label`.||
|`extensions.ribbons.fixedControls.supertip.title`|String|64| Specifies a localized value for the [extensions.ribbons.fixedControls.supertip.title property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].fixedControls[].supertip.title`.||
|`extensions.ribbons.fixedControls.supertip.description`|String|128| Specifies a localized value for the [extensions.ribbons.fixedControls.supertip.description property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].fixedControls[].supertip.description`.||
|`extensions.ribbons.spamPreProcessingDialog.title`|String|128| Specifies a localized value for the [extensions.ribbons.spamPreProcessingDialog.title property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].spamPreProcessingDialog.title`.||
|`extensions.ribbons.spamPreProcessingDialog.description`|String|250| Specifies a localized value for the [extensions.ribbons.spamPreProcessingDialog.description property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].spamPreProcessingDialog.description`.||
|`extensions.ribbons.spamPreProcessingDialog.spamFreeTextSectionTitle`|String|128| Specifies a localized value for the[extensions.ribbons.spamPreProcessingDialog.spamFreeTextSectionTitle property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].spamPreProcessingDialog.spamFreeTextSectionTitle`.||
|`extensions.ribbons.spamPreProcessingDialog.spamReportingOptions.title`|String|128| Specifies a localized value for the [extensions.ribbons.spamPreProcessingDialog.spamReportingOptions.title property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].spamPreProcessingDialog.spamReportingOptions.title`.||
|`extensions.ribbons.spamPreProcessingDialog.spamReportingOptions.options`|String|128| Specifies a localized value for the [extensions.ribbons.spamPreProcessingDialog.spamReportingOptions.options property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].spamPreProcessingDialog.spamReportingOptions.options[]`.||
|`extensions.ribbons.spamPreProcessingDialog.spamMoreInfo.text`|String|128| Specifies a localized value for the [extensions.ribbons.spamPreProcessingDialog.spamMoreInfo.text property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].spamPreProcessingDialog.spamMoreInfo.text`.||
|`extensions.ribbons.spamPreProcessingDialog.spamMoreInfo.url`|String|2048| Specifies a localized value for the [extensions.ribbons.spamPreProcessingDialog.spamMoreInfo.url property](manifest-schema.md#extensionsribbons). The property name should be a JSON path expression in the following form: `extensions[0].ribbons[0-19].spamPreProcessingDialog.spamMoreInfo.url` .||
|`extensions\\[[0]\\]\\.runtimes\\[[1]?[0-9]\\]\\.code\\.page`|String|2048|Specifies a localized value for the [extensions.runtimes.code.page property](manifest-schema.md#extensionsruntimes). The property name should be a JSON path expression in the following form: `extensions[0].runtimes[0-19].code.page`.||
|`extensions\\[[0]\\]\\.runtimes\\[[1]?[0-9]\\]\\.code\\.script`|String|2048|Specifies a localized value for the [extensions.runtimes.code.script property](manifest-schema.md#extensionsruntimes). The property name should be a JSON path expression in the following form: `extensions[0].runtimes[0-19].code.script`.||
|`extensions\\[[0]\\]\\.runtimes\\[[1]?[0-9]\\]\\.actions\\[[1]?[0-9]\\]\\.displayName`|String|64|Specifies a localized value for the [extensions.runtimes.actions.displayName property](manifest-schema.md#extensionsruntimes). The property name should be a JSON path expression in the following form: `extensions[0].runtimes[0-19].actions[0-19].displayName`.||
|`extensions\\[[0]\\]\\.alternates\\[[0-9]\\]\\.alternateIcons\\.icon\\.url`|String|2048|Specifies a localized value for the [extensions.alternates.alternateIcons.icon.url property](manifest-schema.md#extensionsalternates). The property name should be a JSON path expression in the following form: `extensions[0].alternates[0-9].alternateIcons.icon.url`.||
|`extensions\\[[0]\\]\\.alternates\\[[0-9]\\]\\.alternateIcons\\.highResolutionIcon\\.url`|String|2048|Specifies a localized value for the [extensions.alternates.alternateIcons.highResolutionIcon.url property](manifest-schema.md#extensionsalternates). The property name should be a JSON path expression in the following form: `extensions[0].alternates[0-9].alternateIcons.highResolutionIcon.url`.||

</details>
<br/>

<details><summary>Localization schema v1.19</summary>

## Localization schema v1.19

Your file must conform to the schema hosted at [https://developer.microsoft.com/en-us/json-schemas/teams/v1.19/MicrosoftTeams.Localization.schema.json](https://developer.microsoft.com/en-us/json-schemas/teams/v1.19/MicrosoftTeams.Localization.schema.json).

Example of localization JSON schema v1.19 is as follows:

```json
{
    "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.19/MicrosoftTeams.Localization.schema.json",
    "name.short": "Portail de Développement",
    "name.full": "Portail des développeurs",
    "description.short": "Configurer, distribuer et gérer vos applications Microsoft Teams",
    "description.full": "Anciennement App Studio, le portail des développeurs peut vous aider où que vous soyez dans votre parcours de développement d’applications Microsoft Teams.1. Configurez une nouvelle application ou importez une application existante.2. Configurez les fonctionnalités de votre application et d’autres métadonnées importantes.3. Obtenez des ressources pour vous aider à créer une application de haute qualité.3. Testez votre application directement dans Teams.4. Distribuez votre application dans votre organisation ou dans le Store Teams.5. Analysez l’utilisation, l’engagement et d’autres informations sur votre application. Le portail inclut également des outils pour concevoir des scènes virtuelles personnalisées, des cartes adaptatives et l’intégration à la Plateforme d’identités Microsoft.",
    "staticTabs[0].name": "Accueil",
    "staticTabs[1].name": "Applications",
    "staticTabs[2].name": "Outils",
    "staticTabs[3].name": "Developer Portal",
    "bots[0].commandLists[0].commands[0].title": "Rechercher",
    "bots[0].commandLists[0].commands[0].description": "Rechercher la documentation Teams appropriée"
}
```

The schema defines the following properties:

|Property|Type|Maximum length|Description|Required|
|---------------|--------|---------|------------------|----|
|`$schema`|URI|NA|The `https://` URL referencing the JSON Schema for the manifest.||
|`name.short`|String|30|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|✔️|
|`name.full`|String|100|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|✔️|
|`description.short`|String|80|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|✔️|
|`description.full`|String|4000|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|✔️|
|`staticTabs\\[([0-9]/1[0-5])\\]\\.name`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.||
|`bots\\[0\\]\\.commandLists\\[[0-2]\\]\\.commands\\[[0-9]\\]\\.title`|String|32|Replaces the corresponding strings from the app manifest with the value provided here.||
|`bots\\[0\\]\\.commandLists\\[[0-2]\\]\\.commands\\[[0-9]\\]\\.description`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.||
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.title`|String|32|Replaces the corresponding strings from the app manifest with the value provided here.||
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.description`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.||
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.title`|String|32|Replaces the corresponding string from the app manifest with the value provided here.||
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.description`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.||
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.value`|String|512|Replaces the corresponding string from the app manifest with the value provided here.||
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.choices\\[[0-9]\\]\\.title`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.||
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.samplePrompts\\[[0-4]\\]\\.text`|String|128|Content for the sample prompt.||
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.taskInfo\\.title`|String|64|Replaces the corresponding strings from the app manifest with the value provided here.||
|`activities.activityTypes\\[\\b([0-9]|[1-8][0-9]|9[0-9]|1[01][0-9]|12[0-7])\\b]\\.description`|String|128|A brief description of the notification.||
|`activities.activityTypes\\[\\b([0-9]|[1-8][0-9]|9[0-9]|1[01][0-9]|12[0-7])\\b]\\.templateText`|String|128|Ex: "{actor} created task {taskId} for you".||
|`\\[\\[[a-zA-Z_][a-zA-Z0-9_]*\\]\\]`|String|4000| Represents custom tokenized keys, for example with [localized agents](/microsoft-365-copilot/extensibility/agents-are-apps#localizing-your-agent).||
|`meetingExtensionDefinition.scenes\\[[0-9]\\]\\.name`|String|128|Replaces the corresponding strings from the app manifest. ||
|`extensions\\[[0]\\]\\.audienceClaimUrl$`|String|2048|Replaces the corresponding strings from the app manifest with the value provided here.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.label`|String|64|Replaces the corresponding strings from the app manifest with the value provided here.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.customMobileRibbonGroups\\[[0-9]\\]\\.label`|String|32|Replaces the corresponding strings from the app manifest with the value provided here.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.customMobileRibbonGroups\\[[0-9]\\]\\.controls\\[[1]?[0-9]\\]\\.icons\\[[0-8]\\]\\.url`|String|2048|Replaces the corresponding strings from the app manifest with the value provided here.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.customMobileRibbonGroups\\[[0-9]\\]\\.controls\\[[1]?[0-9]\\]\\.label`|String|32|Replaces the corresponding strings from the app manifest with the value provided here.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.groups\\[[0-9]\\]\\.icons\\[[0-2]\\]\\.url`|String|2048|Replaces the corresponding strings from the app manifest with the value provided here.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.groups\\[[0-9]\\]\\.label`|String|64|Replaces the corresponding strings from the app manifest with the value provided here.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.groups\\[[0-9]\\]\\.controls\\[[1]?[0-9]\\]\\.icons\\[[0-2]\\]\\.url`|String|2048|Replaces the corresponding strings from the app manifest with the value provided here.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.groups\\[[0-9]\\]\\.controls\\[[1]?[0-9]\\]\\.label`|String|64|Replaces the corresponding strings from the app manifest with the value provided here.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.groups\\[[0-9]\\]\\.controls\\[[1]?[0-9]\\]\\.supertip\\.title`|String|64|Replaces the corresponding strings from the app manifest with the value provided here.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.groups\\[[0-9]\\]\\.controls\\[[1]?[0-9]\\]\\.supertip\\.description`|String|250|Replaces the corresponding strings from the app manifest with the value provided here.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.groups\\[[0-9]\\]\\.controls\\[[1]?[0-9]\\]\\.items\\[[1]?[0-9]\\]\\.icons\\[[0-2]\\]\\.url`|String|2048|Replaces the corresponding strings from the app manifest with the value provided here.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.groups\\[[0-9]\\]\\.controls\\[[1]?[0-9]\\]\\.items\\[[1]?[0-9]\\]\\.label`|String|64|Replaces the corresponding strings from the app manifest with the value provided here.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.groups\\[[0-9]\\]\\.controls\\[[1]?[0-9]\\]\\.items\\[[1]?[0-9]\\]\\.supertip\\.title`|String|64|Replaces the corresponding strings from the app manifest with the value provided here.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.groups\\[[0-9]\\]\\.controls\\[[1]?[0-9]\\]\\.items\\[[1]?[0-9]\\]\\.supertip\\.description`|String|250|Replaces the corresponding strings from the app manifest with the value provided here.||
|`extensions\\[[0]\\]\\.runtimes\\[[1]?[0-9]\\]\\.code\\.page`|String|2048|Replaces the corresponding strings from the app manifest with the value provided here.||
|`extensions\\[[0]\\]\\.runtimes\\[[1]?[0-9]\\]\\.code\\.script`|String|2048|Replaces the corresponding strings from the app manifest with the value provided here.||
|`extensions\\[[0]\\]\\.runtimes\\[[1]?[0-9]\\]\\.actions\\[[1]?[0-9]\\]\\.displayName`|String|64|Replaces the corresponding strings from the app manifest with the value provided here.||
|`extensions\\[[0]\\]\\.alternates\\[[0-9]\\]\\.alternateIcons\\.icon\\.url`|String|2048|Replaces the corresponding strings from the app manifest with the value provided here.||
|`extensions\\[[0]\\]\\.alternates\\[[0-9]\\]\\.alternateIcons\\.highResolutionIcon\\.url`|String|2048|Replaces the corresponding strings from the app manifest with the value provided here.||

</details>
<br/>

<details><summary>Localization schema v1.17</summary>

## Localization schema v1.17

Link to localization schema v1.17: [https://developer.microsoft.com/en-us/json-schemas/teams/v1.17/MicrosoftTeams.Localization.schema.json](https://developer.microsoft.com/en-us/json-schemas/teams/v1.17/MicrosoftTeams.Localization.schema.json)

Example:

```json
{
    "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.17/MicrosoftTeams.Localization.schema.json",
    "name.short": "Portail de Développement",
    "name.full": "Portail des développeurs",
    "description.short": "Configurer, distribuer et gérer vos applications Microsoft Teams",
    "description.full": "Anciennement App Studio, le portail des développeurs peut vous aider où que vous soyez dans votre parcours de développement d’applications Microsoft Teams.1. Configurez une nouvelle application ou importez une application existante.2. Configurez les fonctionnalités de votre application et d’autres métadonnées importantes.3. Obtenez des ressources pour vous aider à créer une application de haute qualité.3. Testez votre application directement dans Teams.4. Distribuez votre application dans votre organisation ou dans le Store Teams.5. Analysez l’utilisation, l’engagement et d’autres informations sur votre application. Le portail inclut également des outils pour concevoir des scènes virtuelles personnalisées, des cartes adaptatives et l’intégration à la Plateforme d’identités Microsoft.",
    "staticTabs[0].name": "Accueil",
    "staticTabs[1].name": "Applications",
    "staticTabs[2].name": "Outils",
    "staticTabs[3].name": "Developer Portal",
    "bots[0].commandLists[0].commands[0].title": "Rechercher",
    "bots[0].commandLists[0].commands[0].description": "Rechercher la documentation Teams appropriée"
}
```

The schema defines the following properties:

|Property|Type|Maximum length|Description|Required|
|---------------|--------|---------|------------------|----|
|`$schema`|URI|NA|The `https://` URL referencing the JSON Schema for the manifest.||
|`name.short`|String|30|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|✔️|
|`name.full`|String|100|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|✔️|
|`description.short`|String|80|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|✔️|
|`description.full`|String|4000|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|✔️|
|`staticTabs\\[([0-9]/1[0-5])\\]\\.name`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.||
|`bots\\[0\\]\\.commandLists\\[[0-2]\\]\\.commands\\[[0-9]\\]\\.title`|String|32|Replaces the corresponding strings from the app manifest with the value provided here.||
|`bots\\[0\\]\\.commandLists\\[[0-2]\\]\\.commands\\[[0-9]\\]\\.description`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.||
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.title`|String|32|Replaces the corresponding strings from the app manifest with the value provided here.||
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.description`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.||
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.title`|String|32|Replaces the corresponding string from the app manifest with the value provided here.||
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.description`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.||
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.value`|String|512|Replaces the corresponding string from the app manifest with the value provided here.||
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.choices\\[[0-9]\\]\\.title`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.||
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.samplePrompts\\[[0-4]\\]\\.text`|String|128|Content for the sample prompt.||
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.taskInfo\\.title`|String|64|Replaces the corresponding strings from the app manifest with the value provided here.||
|`activities.activityTypes\\[\\b([0-9]|[1-8][0-9]|9[0-9]|1[01][0-9]|12[0-7])\\b]\\.description`|String|128|A brief description of the notification.||
|`activities.activityTypes\\[\\b([0-9]|[1-8][0-9]|9[0-9]|1[01][0-9]|12[0-7])\\b]\\.templateText`|String|128|Ex: "{actor} created task {taskId} for you".||
|`meetingExtensionDefinition.scenes\\[[0-9]\\]\\.name`|String|128|Replaces the corresponding strings from the app manifest. ||
|`extensions\\[[0]\\]\\.audienceClaimUrl$`|String|2048|Replaces the corresponding strings from the app manifest with the value provided here.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.label`|String|64|Replaces the corresponding strings from the app manifest with the value provided here.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.customMobileRibbonGroups\\[[0-9]\\]\\.label`|String|32|Replaces the corresponding strings from the app manifest with the value provided here.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.customMobileRibbonGroups\\[[0-9]\\]\\.controls\\[[1]?[0-9]\\]\\.icons\\[[0-8]\\]\\.url`|String|2048|Replaces the corresponding strings from the app manifest with the value provided here.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.customMobileRibbonGroups\\[[0-9]\\]\\.controls\\[[1]?[0-9]\\]\\.label`|String|32|Replaces the corresponding strings from the app manifest with the value provided here.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.groups\\[[0-9]\\]\\.icons\\[[0-2]\\]\\.url`|String|2048|Replaces the corresponding strings from the app manifest with the value provided here.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.groups\\[[0-9]\\]\\.label`|String|64|Replaces the corresponding strings from the app manifest with the value provided here.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.groups\\[[0-9]\\]\\.controls\\[[1]?[0-9]\\]\\.icons\\[[0-2]\\]\\.url`|String|2048|Replaces the corresponding strings from the app manifest with the value provided here.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.groups\\[[0-9]\\]\\.controls\\[[1]?[0-9]\\]\\.label`|String|64|Replaces the corresponding strings from the app manifest with the value provided here.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.groups\\[[0-9]\\]\\.controls\\[[1]?[0-9]\\]\\.supertip\\.title`|String|64|Replaces the corresponding strings from the app manifest with the value provided here.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.groups\\[[0-9]\\]\\.controls\\[[1]?[0-9]\\]\\.supertip\\.description`|String|250|Replaces the corresponding strings from the app manifest with the value provided here.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.groups\\[[0-9]\\]\\.controls\\[[1]?[0-9]\\]\\.items\\[[1]?[0-9]\\]\\.icons\\[[0-2]\\]\\.url`|String|2048|Replaces the corresponding strings from the app manifest with the value provided here.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.groups\\[[0-9]\\]\\.controls\\[[1]?[0-9]\\]\\.items\\[[1]?[0-9]\\]\\.label`|String|64|Replaces the corresponding strings from the app manifest with the value provided here.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.groups\\[[0-9]\\]\\.controls\\[[1]?[0-9]\\]\\.items\\[[1]?[0-9]\\]\\.supertip\\.title`|String|64|Replaces the corresponding strings from the app manifest with the value provided here.||
|`extensions\\[[0]\\]\\.ribbons\\[[0-9]\\]\\.tabs\\[[1]?[0-9]\\]\\.groups\\[[0-9]\\]\\.controls\\[[1]?[0-9]\\]\\.items\\[[1]?[0-9]\\]\\.supertip\\.description`|String|250|Replaces the corresponding strings from the app manifest with the value provided here.||
|`extensions\\[[0]\\]\\.runtimes\\[[1]?[0-9]\\]\\.code\\.page`|String|2048|Replaces the corresponding strings from the app manifest with the value provided here.||
|`extensions\\[[0]\\]\\.runtimes\\[[1]?[0-9]\\]\\.code\\.script`|String|2048|Replaces the corresponding strings from the app manifest with the value provided here.||
|`extensions\\[[0]\\]\\.runtimes\\[[1]?[0-9]\\]\\.actions\\[[1]?[0-9]\\]\\.displayName`|String|64|Replaces the corresponding strings from the app manifest with the value provided here.||
|`extensions\\[[0]\\]\\.alternates\\[[0-9]\\]\\.alternateIcons\\.icon\\.url`|String|2048|Replaces the corresponding strings from the app manifest with the value provided here.||
|`extensions\\[[0]\\]\\.alternates\\[[0-9]\\]\\.alternateIcons\\.highResolutionIcon\\.url`|String|2048|Replaces the corresponding strings from the app manifest with the value provided here.||

</details>
<br/>

<details><summary>Localization schema v1.16</summary>

## Localization schema v1.16

Link to localization schema v1.16: [https://developer.microsoft.com/en-us/json-schemas/teams/v1.16/MicrosoftTeams.Localization.schema.json](https://developer.microsoft.com/en-us/json-schemas/teams/v1.16/MicrosoftTeams.Localization.schema.json)

Example:

```json
{
    "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.16/MicrosoftTeams.Localization.schema.json",
    "name.short": "Portail de Développement",
    "name.full": "Portail des développeurs",
    "description.short": "Configurer, distribuer et gérer vos applications Microsoft Teams",
    "description.full": "Anciennement App Studio, le portail des développeurs peut vous aider où que vous soyez dans votre parcours de développement d’applications Microsoft Teams.1. Configurez une nouvelle application ou importez une application existante.2. Configurez les fonctionnalités de votre application et d’autres métadonnées importantes.3. Obtenez des ressources pour vous aider à créer une application de haute qualité.3. Testez votre application directement dans Teams.4. Distribuez votre application dans votre organisation ou dans le Store Teams.5. Analysez l’utilisation, l’engagement et d’autres informations sur votre application. Le portail inclut également des outils pour concevoir des scènes virtuelles personnalisées, des cartes adaptatives et l’intégration à la Plateforme d’identités Microsoft.",
    "staticTabs[0].name": "Accueil",
    "staticTabs[1].name": "Applications",
    "staticTabs[2].name": "Outils",
    "staticTabs[3].name": "Developer Portal",
    "bots[0].commandLists[0].commands[0].title": "Rechercher",
    "bots[0].commandLists[0].commands[0].description": "Rechercher la documentation Teams appropriée"
}
```

The schema defines the following properties:

|Property|Type|Maximum length|Description|Required|
|---------------|--------|---------|------------------|----|
|`$schema`|URI|NA|The `https://` URL referencing the JSON Schema for the manifest.||
|`name.short`|String|30|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|✔️|
|`name.full`|String|100|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|✔️|
|`description.short`|String|80|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|✔️|
|`description.full`|String|4000|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|✔️|
|`staticTabs\\[([0-9]/1[0-5])\\]\\.name`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.||
|`bots\\[0\\]\\.commandLists\\[[0-2]\\]\\.commands\\[[0-9]\\]\\.title`|String|32|Replaces the corresponding strings from the app manifest with the value provided here.||
|`bots\\[0\\]\\.commandLists\\[[0-2]\\]\\.commands\\[[0-9]\\]\\.description`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.||
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.title`|String|32|Replaces the corresponding strings from the app manifest with the value provided here.||
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.description`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.||
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.title`|String|32|Replaces the corresponding string from the app manifest with the value provided here.||
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.description`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.||
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.value`|String|512|Replaces the corresponding string from the app manifest with the value provided here.||
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.choices\\[[0-9]\\]\\.title`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.||
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.samplePrompts\\[[0-4]\\]\\.text`|String|128|Content for the sample prompt.||
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.taskInfo\\.title`|String|64|Replaces the corresponding strings from the app manifest with the value provided here.||
|`activities.activityTypes\\[\\b([0-9]|[1-8][0-9]|9[0-9]|1[01][0-9]|12[0-7])\\b]\\.description`|String|128|A brief description of the notification.||
|`activities.activityTypes\\[\\b([0-9]|[1-8][0-9]|9[0-9]|1[01][0-9]|12[0-7])\\b]\\.templateText`|String|128|Ex: "{actor} created task {taskId} for you".||
|`meetingExtensionDefinition.scenes\\[[0-9]\\]\\.name`|String|128|Replaces the corresponding strings from the app manifest.||

</details>
<br/>

<details><summary>Localization schema v1.15</summary>

## Localization schema v1.15

Link to localization schema v1.15: [https://developer.microsoft.com/en-us/json-schemas/teams/v1.15/MicrosoftTeams.Localization.schema.json](https://developer.microsoft.com/en-us/json-schemas/teams/v1.15/MicrosoftTeams.Localization.schema.json)

Example:

```json
{
    "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.15/MicrosoftTeams.Localization.schema.json",
    "name.short": "Portail de Développement",
    "name.full": "Portail des développeurs",
    "description.short": "Configurer, distribuer et gérer vos applications Microsoft Teams",
    "description.full": "Anciennement App Studio, le portail des développeurs peut vous aider où que vous soyez dans votre parcours de développement d’applications Microsoft Teams.1. Configurez une nouvelle application ou importez une application existante.2. Configurez les fonctionnalités de votre application et d’autres métadonnées importantes.3. Obtenez des ressources pour vous aider à créer une application de haute qualité.3. Testez votre application directement dans Teams.4. Distribuez votre application dans votre organisation ou dans le Store Teams.5. Analysez l’utilisation, l’engagement et d’autres informations sur votre application. Le portail inclut également des outils pour concevoir des scènes virtuelles personnalisées, des cartes adaptatives et l’intégration à la Plateforme d’identités Microsoft.",
    "staticTabs[0].name": "Accueil",
    "staticTabs[1].name": "Applications",
    "staticTabs[2].name": "Outils",
    "staticTabs[3].name": "Developer Portal",
    "bots[0].commandLists[0].commands[0].title": "Rechercher",
    "bots[0].commandLists[0].commands[0].description": "Rechercher la documentation Teams appropriée"
}
```

The schema defines the following properties:

|Property|Type|Maximum length|Description|Required|
|---------------|--------|---------|------------------|----|
|`$schema`|URI|NA|The `https://` URL referencing the JSON Schema for the manifest.|
|`name.short`|String|30|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|✔️|
|`name.full`|String|100|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|✔️|
|`description.short`|String|80|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|✔️|
|`description.full`|String|4000|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|✔️|
|`staticTabs\\[([0-9]/1[0-5])\\]\\.name`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.|
|`bots\\[0\\]\\.commandLists\\[[0-2]\\]\\.commands\\[[0-9]\\]\\.title`|String|32|Replaces the corresponding strings from the app manifest with the value provided here.|
|`bots\\[0\\]\\.commandLists\\[[0-2]\\]\\.commands\\[[0-9]\\]\\.description`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.title`|String|32|Replaces the corresponding strings from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.description`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.title`|String|32|Replaces the corresponding string from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.description`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.value`|String|512|Replaces the corresponding string from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.choices\\[[0-9]\\]\\.title`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.taskInfo\\.title`|String|64|Replaces the corresponding strings from the app manifest with the value provided here.|
|`activities.activityTypes\\[\\b([0-9]|[1-8][0-9]|9[0-9]|1[01][0-9]|12[0-7])\\b]\\.description`|String|128|A brief description of the notification|
|`activities.activityTypes\\[\\b([0-9]|[1-8][0-9]|9[0-9]|1[01][0-9]|12[0-7])\\b]\\.templateText`|String|128|Ex: "{actor} created task {taskId} for you"|
|`meetingExtensionDefinition.scenes\\[[0-9]\\]\\.name`|String|128| Replaces the corresponding strings from the app manifest.||

</details>
<br/>

<details><summary>Localization schema v1.14</summary>

## Localization schema v1.14

Link to localization schema v1.14: [https://developer.microsoft.com/en-us/json-schemas/teams/v1.14/MicrosoftTeams.Localization.schema.json](https://developer.microsoft.com/en-us/json-schemas/teams/v1.15/MicrosoftTeams.Localization.schema.json)

Example:

```json
{
    "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.14/MicrosoftTeams.Localization.schema.json",
    "name.short": "Portail de Développement",
    "name.full": "Portail des développeurs",
    "description.short": "Configurer, distribuer et gérer vos applications Microsoft Teams",
    "description.full": "Anciennement App Studio, le portail des développeurs peut vous aider où que vous soyez dans votre parcours de développement d’applications Microsoft Teams.1. Configurez une nouvelle application ou importez une application existante.2. Configurez les fonctionnalités de votre application et d’autres métadonnées importantes.3. Obtenez des ressources pour vous aider à créer une application de haute qualité.3. Testez votre application directement dans Teams.4. Distribuez votre application dans votre organisation ou dans le Store Teams.5. Analysez l’utilisation, l’engagement et d’autres informations sur votre application. Le portail inclut également des outils pour concevoir des scènes virtuelles personnalisées, des cartes adaptatives et l’intégration à la Plateforme d’identités Microsoft.",
    "staticTabs[0].name": "Accueil",
    "staticTabs[1].name": "Applications",
    "staticTabs[2].name": "Outils",
    "staticTabs[3].name": "Developer Portal",
    "bots[0].commandLists[0].commands[0].title": "Rechercher",
    "bots[0].commandLists[0].commands[0].description": "Rechercher la documentation Teams appropriée"
}
```

The schema defines the following properties:

|Property|Type|Maximum length|Description|
|---------------|--------|---------|------------------|
|`$schema`|URI|NA|The `https://` URL referencing the JSON Schema for the manifest.|
|`name.short`|String|30|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|
|`name.full`|String|100|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|
|`description.short`|String|80|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|
|`description.full`|String|4000|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|
|`staticTabs\\[([0-9]|1[0-5])\\]\\.name`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.|
|`bots\\[0\\]\\.commandLists\\[[0-2]\\]\\.commands\\[[0-9]\\]\\.title`|String|32|Replaces the corresponding strings from the app manifest with the value provided here.|
|`bots\\[0\\]\\.commandLists\\[[0-2]\\]\\.commands\\[[0-9]\\]\\.description`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.title`|String|32|Replaces the corresponding strings from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.description`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.title`|String|32|Replaces the corresponding string from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.description`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.value`|String|512|Replaces the corresponding string from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.choices\\[[0-9]\\]\\.title`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.taskInfo\\.title`|String|64|Replaces the corresponding strings from the app manifest with the value provided here.|
|`activities.activityTypes\\[\\b([0-9]|[1-8][0-9]|9[0-9]|1[01][0-9]|12[0-7])\\b]\\.description`|String|128|A brief description of the notification|
|`activities.activityTypes\\[\\b([0-9]|[1-8][0-9]|9[0-9]|1[01][0-9]|12[0-7])\\b]\\.templateText`|String|128|Ex: "{actor} created task {taskId} for you"|
|`meetingExtensionDefinition.scenes\\[[0-9]\\]\\.name`|String|128|Replaces the corresponding strings from the app manifest.  |

</details>
<br/>

<details><summary>Localization schema v1.13</summary>

## Localization schema v1.13

Link to localization schema v1.13: [https://developer.microsoft.com/en-us/json-schemas/teams/v1.13/MicrosoftTeams.Localization.schema.json](https://developer.microsoft.com/en-us/json-schemas/teams/v1.15/MicrosoftTeams.Localization.schema.json)

Example:

```json
{
    "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.13/MicrosoftTeams.Localization.schema.json",
    "name.short": "Portail de Développement",
    "name.full": "Portail des développeurs",
    "description.short": "Configurer, distribuer et gérer vos applications Microsoft Teams",
    "description.full": "Anciennement App Studio, le portail des développeurs peut vous aider où que vous soyez dans votre parcours de développement d’applications Microsoft Teams.1. Configurez une nouvelle application ou importez une application existante.2. Configurez les fonctionnalités de votre application et d’autres métadonnées importantes.3. Obtenez des ressources pour vous aider à créer une application de haute qualité.3. Testez votre application directement dans Teams.4. Distribuez votre application dans votre organisation ou dans le Store Teams.5. Analysez l’utilisation, l’engagement et d’autres informations sur votre application. Le portail inclut également des outils pour concevoir des scènes virtuelles personnalisées, des cartes adaptatives et l’intégration à la Plateforme d’identités Microsoft.",
    "staticTabs[0].name": "Accueil",
    "staticTabs[1].name": "Applications",
    "staticTabs[2].name": "Outils",
    "staticTabs[3].name": "Developer Portal",
    "bots[0].commandLists[0].commands[0].title": "Rechercher",
    "bots[0].commandLists[0].commands[0].description": "Rechercher la documentation Teams appropriée"
}
```

The schema defines the following properties:

|Property|Type|Maximum length|Description|
|---------------|--------|---------|------------------|
|`$schema`|URI|NA|The `https://` URL referencing the JSON Schema for the manifest.|
|`name.short`|String|30|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|
|`name.full`|String|100|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|
|`description.short`|String|80|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|
|`description.full`|String|4000|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|
|`staticTabs\\[([0-9]|1[0-5])\\]\\.name`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.|
|`bots\\[0\\]\\.commandLists\\[[0-2]\\]\\.commands\\[[0-9]\\]\\.title`|String|32|Replaces the corresponding strings from the app manifest with the value provided here.|
|`bots\\[0\\]\\.commandLists\\[[0-2]\\]\\.commands\\[[0-9]\\]\\.description`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.title`|String|32|Replaces the corresponding strings from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.description`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.title`|String|32|Replaces the corresponding string from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.description`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.value`|String|512|Replaces the corresponding string from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.choices\\[[0-9]\\]\\.title`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.taskInfo\\.title`|String|64|Replaces the corresponding strings from the app manifest with the value provided here.|
|`activities.activityTypes\\[\\b([0-9]|[1-8][0-9]|9[0-9]|1[01][0-9]|12[0-7])\\b]\\.description`|String|128|A brief description of the notification|
|`activities.activityTypes\\[\\b([0-9]|[1-8][0-9]|9[0-9]|1[01][0-9]|12[0-7])\\b]\\.templateText`|String|128|Ex: "{actor} created task {taskId} for you"|
|`meetingExtensionDefinition.scenes\\[[0-9]\\]\\.name`|String|128|Replaces the corresponding strings from the app manifest.  |

</details>
<br/>

<details><summary>Localization schema v1.12</summary>

## Localization schema v1.12

Link to localization schema v1.12: [https://developer.microsoft.com/en-us/json-schemas/teams/v1.12/MicrosoftTeams.Localization.schema.json](https://developer.microsoft.com/en-us/json-schemas/teams/v1.15/MicrosoftTeams.Localization.schema.json)

Example:

```json
{
    "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.12/MicrosoftTeams.Localization.schema.json",
    "name.short": "Portail de Développement",
    "name.full": "Portail des développeurs",
    "description.short": "Configurer, distribuer et gérer vos applications Microsoft Teams",
    "description.full": "Anciennement App Studio, le portail des développeurs peut vous aider où que vous soyez dans votre parcours de développement d’applications Microsoft Teams.1. Configurez une nouvelle application ou importez une application existante.2. Configurez les fonctionnalités de votre application et d’autres métadonnées importantes.3. Obtenez des ressources pour vous aider à créer une application de haute qualité.3. Testez votre application directement dans Teams.4. Distribuez votre application dans votre organisation ou dans le Store Teams.5. Analysez l’utilisation, l’engagement et d’autres informations sur votre application. Le portail inclut également des outils pour concevoir des scènes virtuelles personnalisées, des cartes adaptatives et l’intégration à la Plateforme d’identités Microsoft.",
    "staticTabs[0].name": "Accueil",
    "staticTabs[1].name": "Applications",
    "staticTabs[2].name": "Outils",
    "staticTabs[3].name": "Developer Portal",
    "bots[0].commandLists[0].commands[0].title": "Rechercher",
    "bots[0].commandLists[0].commands[0].description": "Rechercher la documentation Teams appropriée"
}
```

The schema defines the following properties:

|Property|Type|Maximum length|Description|
|---------------|--------|---------|------------------|
|`$schema`|URI|NA|The `https://` URL referencing the JSON Schema for the manifest.|
|`name.short`|String|30|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|
|`name.full`|String|100|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|
|`description.short`|String|80|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|
|`description.full`|String|4000|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|
|`staticTabs\\[([0-9]|1[0-5])\\]\\.name`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.|
|`bots\\[0\\]\\.commandLists\\[[0-2]\\]\\.commands\\[[0-9]\\]\\.title`|String|32|Replaces the corresponding strings from the app manifest with the value provided here.|
|`bots\\[0\\]\\.commandLists\\[[0-2]\\]\\.commands\\[[0-9]\\]\\.description`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.title`|String|32|Replaces the corresponding strings from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.description`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.title`|String|32|Replaces the corresponding string from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.description`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.value`|String|512|Replaces the corresponding string from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.choices\\[[0-9]\\]\\.title`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.taskInfo\\.title`|String|64|Replaces the corresponding strings from the app manifest with the value provided here.|
|`activities.activityTypes\\[\\b([0-9]|[1-8][0-9]|9[0-9]|1[01][0-9]|12[0-7])\\b]\\.description`|String|128|A brief description of the notification|
|`activities.activityTypes\\[\\b([0-9]|[1-8][0-9]|9[0-9]|1[01][0-9]|12[0-7])\\b]\\.templateText`|String|128|Ex: "{actor} created task {taskId} for you"|
|`meetingExtensionDefinition.scenes\\[[0-9]\\]\\.name`|String|128|Replaces the corresponding strings from the app manifest.  |

</details>
<br/>

<details><summary>Localization schema v1.11</summary>

## Localization schema v1.11

Link to localization schema v1.11: [https://developer.microsoft.com/en-us/json-schemas/teams/v1.11/MicrosoftTeams.Localization.schema.json](https://developer.microsoft.com/en-us/json-schemas/teams/v1.15/MicrosoftTeams.Localization.schema.json)

Example:

```json
{
    "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.11/MicrosoftTeams.Localization.schema.json",
    "name.short": "Portail de Développement",
    "name.full": "Portail des développeurs",
    "description.short": "Configurer, distribuer et gérer vos applications Microsoft Teams",
    "description.full": "Anciennement App Studio, le portail des développeurs peut vous aider où que vous soyez dans votre parcours de développement d’applications Microsoft Teams.1. Configurez une nouvelle application ou importez une application existante.2. Configurez les fonctionnalités de votre application et d’autres métadonnées importantes.3. Obtenez des ressources pour vous aider à créer une application de haute qualité.3. Testez votre application directement dans Teams.4. Distribuez votre application dans votre organisation ou dans le Store Teams.5. Analysez l’utilisation, l’engagement et d’autres informations sur votre application. Le portail inclut également des outils pour concevoir des scènes virtuelles personnalisées, des cartes adaptatives et l’intégration à la Plateforme d’identités Microsoft.",
    "staticTabs[0].name": "Accueil",
    "staticTabs[1].name": "Applications",
    "staticTabs[2].name": "Outils",
    "staticTabs[3].name": "Developer Portal",
    "bots[0].commandLists[0].commands[0].title": "Rechercher",
    "bots[0].commandLists[0].commands[0].description": "Rechercher la documentation Teams appropriée"
}
```

The schema defines the following properties:

|Property|Type|Maximum length|Description|
|---------------|--------|---------|------------------|
|`$schema`|URI|NA|The `https://` URL referencing the JSON Schema for the manifest.|
|`name.short`|String|30|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|
|`name.full`|String|100|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|
|`description.short`|String|80|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|
|`description.full`|String|4000|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|
|`staticTabs\\[([0-9]|1[0-5])\\]\\.name`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.|
|`bots\\[0\\]\\.commandLists\\[[0-2]\\]\\.commands\\[[0-9]\\]\\.title`|String|32|Replaces the corresponding strings from the app manifest with the value provided here.|
|`bots\\[0\\]\\.commandLists\\[[0-2]\\]\\.commands\\[[0-9]\\]\\.description`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.title`|String|32|Replaces the corresponding strings from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.description`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.title`|String|32|Replaces the corresponding string from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.description`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.value`|String|512|Replaces the corresponding string from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.choices\\[[0-9]\\]\\.title`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.taskInfo\\.title`|String|64|Replaces the corresponding strings from the app manifest with the value provided here.|
|`activities.activityTypes\\[\\b([0-9]|[1-8][0-9]|9[0-9]|1[01][0-9]|12[0-7])\\b]\\.description`|String|128|A brief description of the notification|
|`activities.activityTypes\\[\\b([0-9]|[1-8][0-9]|9[0-9]|1[01][0-9]|12[0-7])\\b]\\.templateText`|String|128|Ex: "{actor} created task {taskId} for you"|
|`meetingExtensionDefinition.scenes\\[[0-9]\\]\\.name`|String|128|Replaces the corresponding strings from the app manifest.  |

</details>
<br/>

<details><summary>Localization schema v1.10</summary>

## Localization schema v1.10

Link to localization schema v1.10: [https://developer.microsoft.com/en-us/json-schemas/teams/v1.10/MicrosoftTeams.Localization.schema.json](https://developer.microsoft.com/en-us/json-schemas/teams/v1.15/MicrosoftTeams.Localization.schema.json)

Example:

```json
{
    "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.10/MicrosoftTeams.Localization.schema.json",
    "name.short": "Portail de Développement",
    "name.full": "Portail des développeurs",
    "description.short": "Configurer, distribuer et gérer vos applications Microsoft Teams",
    "description.full": "Anciennement App Studio, le portail des développeurs peut vous aider où que vous soyez dans votre parcours de développement d’applications Microsoft Teams.1. Configurez une nouvelle application ou importez une application existante.2. Configurez les fonctionnalités de votre application et d’autres métadonnées importantes.3. Obtenez des ressources pour vous aider à créer une application de haute qualité.3. Testez votre application directement dans Teams.4. Distribuez votre application dans votre organisation ou dans le Store Teams.5. Analysez l’utilisation, l’engagement et d’autres informations sur votre application. Le portail inclut également des outils pour concevoir des scènes virtuelles personnalisées, des cartes adaptatives et l’intégration à la Plateforme d’identités Microsoft.",
    "staticTabs[0].name": "Accueil",
    "staticTabs[1].name": "Applications",
    "staticTabs[2].name": "Outils",
    "staticTabs[3].name": "Developer Portal",
    "bots[0].commandLists[0].commands[0].title": "Rechercher",
    "bots[0].commandLists[0].commands[0].description": "Rechercher la documentation Teams appropriée"
}
```

The schema defines the following properties:

|Property|Type|Maximum length|Description|
|---------------|--------|---------|------------------|
|`$schema`|URI|NA|The `https://` URL referencing the JSON Schema for the manifest.|
|`name.short`|String|30|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|
|`name.full`|String|100|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|
|`description.short`|String|80|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|
|`description.full`|String|4000|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|
|`staticTabs\\[([0-9]|1[0-5])\\]\\.name`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.|
|`bots\\[0\\]\\.commandLists\\[[0-2]\\]\\.commands\\[[0-9]\\]\\.title`|String|32|Replaces the corresponding strings from the app manifest with the value provided here.|
|`bots\\[0\\]\\.commandLists\\[[0-2]\\]\\.commands\\[[0-9]\\]\\.description`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.title`|String|32|Replaces the corresponding strings from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.description`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.title`|String|32|Replaces the corresponding string from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.description`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.value`|String|512|Replaces the corresponding string from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.choices\\[[0-9]\\]\\.title`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.taskInfo\\.title`|String|64|Replaces the corresponding strings from the app manifest with the value provided here.|
|`activities.activityTypes\\[\\b([0-9]|[1-8][0-9]|9[0-9]|1[01][0-9]|12[0-7])\\b]\\.description`|String|128|A brief description of the notification|
|`activities.activityTypes\\[\\b([0-9]|[1-8][0-9]|9[0-9]|1[01][0-9]|12[0-7])\\b]\\.templateText`|String|128|Ex: "{actor} created task {taskId} for you"|
|`meetingExtensionDefinition.scenes\\[[0-9]\\]\\.name`|String|128|Replaces the corresponding strings from the app manifest.  |

</details>
<br/>

<details><summary>Localization schema v1.9</summary>

## Localization schema v1.9

Link to localization schema v1.9: [https://developer.microsoft.com/en-us/json-schemas/teams/v1.9/MicrosoftTeams.Localization.schema.json](https://developer.microsoft.com/en-us/json-schemas/teams/v1.15/MicrosoftTeams.Localization.schema.json)

Example:

```json
{
    "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.9/MicrosoftTeams.Localization.schema.json",
    "name.short": "Portail de Développement",
    "name.full": "Portail des développeurs",
    "description.short": "Configurer, distribuer et gérer vos applications Microsoft Teams",
    "description.full": "Anciennement App Studio, le portail des développeurs peut vous aider où que vous soyez dans votre parcours de développement d’applications Microsoft Teams.1. Configurez une nouvelle application ou importez une application existante.2. Configurez les fonctionnalités de votre application et d’autres métadonnées importantes.3. Obtenez des ressources pour vous aider à créer une application de haute qualité.3. Testez votre application directement dans Teams.4. Distribuez votre application dans votre organisation ou dans le Store Teams.5. Analysez l’utilisation, l’engagement et d’autres informations sur votre application. Le portail inclut également des outils pour concevoir des scènes virtuelles personnalisées, des cartes adaptatives et l’intégration à la Plateforme d’identités Microsoft.",
    "staticTabs[0].name": "Accueil",
    "staticTabs[1].name": "Applications",
    "staticTabs[2].name": "Outils",
    "staticTabs[3].name": "Developer Portal",
    "bots[0].commandLists[0].commands[0].title": "Rechercher",
    "bots[0].commandLists[0].commands[0].description": "Rechercher la documentation Teams appropriée"
}
```

The schema defines the following properties:

|Property|Type|Maximum length|Description|
|---------------|--------|---------|------------------|
|`$schema`|URI|NA|The `https://` URL referencing the JSON Schema for the manifest.|
|`name.short`|String|30|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|
|`name.full`|String|100|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|
|`description.short`|String|80|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|
|`description.full`|String|4000|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|
|`staticTabs\\[([0-9]|1[0-5])\\]\\.name`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.|
|`bots\\[0\\]\\.commandLists\\[[0-2]\\]\\.commands\\[[0-9]\\]\\.title`|String|32|Replaces the corresponding strings from the app manifest with the value provided here.|
|`bots\\[0\\]\\.commandLists\\[[0-2]\\]\\.commands\\[[0-9]\\]\\.description`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.title`|String|32|Replaces the corresponding strings from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.description`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.title`|String|32|Replaces the corresponding string from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.description`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.value`|String|512|Replaces the corresponding string from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.choices\\[[0-9]\\]\\.title`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.taskInfo\\.title`|String|64|Replaces the corresponding strings from the app manifest with the value provided here.|
|`activities.activityTypes\\[\\b([0-9]|[1-8][0-9]|9[0-9]|1[01][0-9]|12[0-7])\\b]\\.description`|String|128|A brief description of the notification|
|`activities.activityTypes\\[\\b([0-9]|[1-8][0-9]|9[0-9]|1[01][0-9]|12[0-7])\\b]\\.templateText`|String|128|Ex: "{actor} created task {taskId} for you"|

</details>
<br/>

<details><summary>Localization schema v1.8</summary>

## Localization schema v1.8

Link to localization schema v1.8: [https://developer.microsoft.com/en-us/json-schemas/teams/v1.8/MicrosoftTeams.Localization.schema.json](https://developer.microsoft.com/en-us/json-schemas/teams/v1.15/MicrosoftTeams.Localization.schema.json)

Example:

```json
{
    "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.8/MicrosoftTeams.Localization.schema.json",
    "name.short": "Portail de Développement",
    "name.full": "Portail des développeurs",
    "description.short": "Configurer, distribuer et gérer vos applications Microsoft Teams",
    "description.full": "Anciennement App Studio, le portail des développeurs peut vous aider où que vous soyez dans votre parcours de développement d’applications Microsoft Teams.1. Configurez une nouvelle application ou importez une application existante.2. Configurez les fonctionnalités de votre application et d’autres métadonnées importantes.3. Obtenez des ressources pour vous aider à créer une application de haute qualité.3. Testez votre application directement dans Teams.4. Distribuez votre application dans votre organisation ou dans le Store Teams.5. Analysez l’utilisation, l’engagement et d’autres informations sur votre application. Le portail inclut également des outils pour concevoir des scènes virtuelles personnalisées, des cartes adaptatives et l’intégration à la Plateforme d’identités Microsoft.",
    "staticTabs[0].name": "Accueil",
    "staticTabs[1].name": "Applications",
    "staticTabs[2].name": "Outils",
    "staticTabs[3].name": "Developer Portal",
    "bots[0].commandLists[0].commands[0].title": "Rechercher",
    "bots[0].commandLists[0].commands[0].description": "Rechercher la documentation Teams appropriée"
}
```

The schema defines the following properties:

|Property|Type|Maximum length|Description|
|---------------|--------|---------|------------------|
|`$schema`|URI|NA|The `https://` URL referencing the JSON Schema for the manifest.|
|`name.short`|String|30|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|
|`name.full`|String|100|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|
|`description.short`|String|80|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|
|`description.full`|String|4000|Replaces the corresponding string from the app manifest with the value provided here. The property is required in the localization JSON.|
|`staticTabs\\[([0-9]|1[0-5])\\]\\.name`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.|
|`bots\\[0\\]\\.commandLists\\[[0-2]\\]\\.commands\\[[0-9]\\]\\.title`|String|32|Replaces the corresponding strings from the app manifest with the value provided here.|
|`bots\\[0\\]\\.commandLists\\[[0-2]\\]\\.commands\\[[0-9]\\]\\.description`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.title`|String|32|Replaces the corresponding strings from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.description`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.title`|String|32|Replaces the corresponding string from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.description`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.value`|String|512|Replaces the corresponding string from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.choices\\[[0-9]\\]\\.title`|String|128|Replaces the corresponding strings from the app manifest with the value provided here.|
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.taskInfo\\.title`|String|64|Replaces the corresponding strings from the app manifest with the value provided here.|
|`activities.activityTypes\\[\\b([0-9]|[1-8][0-9]|9[0-9]|1[01][0-9]|12[0-7])\\b]\\.description`|String|128|A brief description of the notification|
|`activities.activityTypes\\[\\b([0-9]|[1-8][0-9]|9[0-9]|1[01][0-9]|12[0-7])\\b]\\.templateText`|String|128|Ex: "{actor} created task {taskId} for you"|

</details>

## See also

* [Localize your app](~/concepts/build-and-test/apps-localization.md)
* [App manifest](manifest-schema.md)
