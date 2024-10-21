---
title: Localize JSON Schema Reference
description: Describes the localization schema supported by the localization file for Microsoft Teams using an example schema
ms.topic: reference
ms.localizationpriority: medium
ms.date: 10/17/2024
---

# Localize JSON schema reference

The Microsoft Teams localization file describes language translations that are served based on the client language settings. Your file must conform to the schema hosted at [https://developer.microsoft.com/en-us/json-schemas/teams/v1.19/MicrosoftTeams.Localization.schema.json](https://developer.microsoft.com/en-us/json-schemas/teams/v1.19/MicrosoftTeams.Localization.schema.json).

> [!TIP]
> Specify the schema at the beginning of your manifest to enable `IntelliSense` or similar support from your code editor: `"$schema": "https://developer.microsoft.com/json-schemas/teams/v1.19/MicrosoftTeams.schema.json".`

## Example

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
|`activities.activityTypes\\[\\b([0-9]&#124;[1-8][0-9]&#124;9[0-9]&#124;1[01][0-9]&#124;12[0-7])\\b]\\.description`|String|128|A brief description of the notification.||
|`activities.activityTypes\\[\\b([0-9]&#124;[1-8][0-9]&#124;9[0-9]&#124;1[01][0-9]&#124;12[0-7])\\b]\\.templateText`|String|128|Ex: "{actor} created task {taskId} for you".||
|`\\[\\[[a-zA-Z_][a-zA-Z0-9_]*\\]\\]`|String|4000| Represents custom tokenized keys, for example with [localized Copilot agents](/microsoft-365-copilot/extensibility/agents-are-apps#localizing-your-agent).||
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

<br>

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