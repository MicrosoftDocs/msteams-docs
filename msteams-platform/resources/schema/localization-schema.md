---
title: Localize JSON schema reference
description: Describes the localization schema supported by the localization file for Microsoft Teams using an example schema
ms.topic: reference
ms.localizationpriority: medium
ms.date: 05/20/2019
---

# Localize JSON schema reference

The Microsoft Teams localization file describes language translations that are served based on the client language settings. Your file must conform to the schema hosted at [`https://developer.microsoft.com/en-us/json-schemas/teams/v1.16/MicrosoftTeams.Localization.schema.json`](https://developer.microsoft.com/en-us/json-schemas/teams/v1.16/MicrosoftTeams.Localization.schema.json).

> [!TIP]
> Specify the schema at the beginning of your manifest to enable `IntelliSense` or similar support from your code editor: `"$schema": "https://developer.microsoft.com/json-schemas/teams/v1.16/MicrosoftTeams.schema.json".

## Example

Example of localization JSON schema v1.16 is as follows:

```json
{
    "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.16/MicrosoftTeams.Localization.schema.json",
    "name.short": "Portail de Développement",
    "name.full": "Portail des développeurs",
    "description.short": "Configurer, distribuer et gérer vos applications Microsoft Teams",
    "description.full": "Anciennement App Studio, le portail des développeurs peut vous aider où que vous soyez dans votre parcours de développement d’applications Microsoft Teams.1. Configurez une nouvelle application ou importez une application existante.2. Configurez les fonctionnalités de votre application et d’autres métadonnées importantes.3. Obtenez des ressources pour vous aider à créer une application de haute qualité.3. Testez votre application directement dans Teams.4. Distribuez votre application dans votre organisation ou dans le Store Teams.5. Analysez l’utilisation, l’engagement et d’autres informations sur votre application. Le portail inclut également des outils pour concevoir des scènes virtuelles personnalisées, des cartes adaptatives et l’intégration à la Plateforme d’identités Microsoft.",
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
|`composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.taskInfo\\.title`|String|64|Replaces the corresponding strings from the app manifest with the value provided here.||
|`activities.activityTypes\\[\\b([0-9]|[1-8][0-9]|9[0-9]|1[01][0-9]|12[0-7])\\b]\\.description`|String|128|A brief description of the notification.||
|`activities.activityTypes\\[\\b([0-9]|[1-8][0-9]|9[0-9]|1[01][0-9]|12[0-7])\\b]\\.templateText`|String|128|Ex: "{actor} created task {taskId} for you".||
|`meetingExtensionDefinition.scenes \\[[0-9]\\]\\.name$`|String|128| |

<br>

<details><summary>Localization schema v1.15</summary>

## Localization schema v1.15

Link to Localization schema v1.15: [https://developer.microsoft.com/en-us/json-schemas/teams/v1.15/MicrosoftTeams.Localization.schema.json](https://developer.microsoft.com/en-us/json-schemas/teams/v1.15/MicrosoftTeams.Localization.schema.json)

Example:

```json
{
    "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.15/MicrosoftTeams.Localization.schema.json",
    "name.short": "Portail de Développement",
    "name.full": "Portail des développeurs",
    "description.short": "Configurer, distribuer et gérer vos applications Microsoft Teams",
    "description.full": "Anciennement App Studio, le portail des développeurs peut vous aider où que vous soyez dans votre parcours de développement d’applications Microsoft Teams.1. Configurez une nouvelle application ou importez une application existante.2. Configurez les fonctionnalités de votre application et d’autres métadonnées importantes.3. Obtenez des ressources pour vous aider à créer une application de haute qualité.3. Testez votre application directement dans Teams.4. Distribuez votre application dans votre organisation ou dans le Store Teams.5. Analysez l’utilisation, l’engagement et d’autres informations sur votre application. Le portail inclut également des outils pour concevoir des scènes virtuelles personnalisées, des cartes adaptatives et l’intégration à la Plateforme d’identités Microsoft.",
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
|`$schema`|URI|NA|The < <https://> > URL referencing the JSON Schema for the manifest.|
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
|`meetingExtensionDefinition.scenes \\[[0-9]\\]\\.name$`|String|128| |

</details>
<br/>

<details><summary>Localization schema v1.14</summary>

## Localization schema v1.14

Link to Localization schema v1.14: [https://developer.microsoft.com/en-us/json-schemas/teams/v1.14/MicrosoftTeams.Localization.schema.json](https://developer.microsoft.com/en-us/json-schemas/teams/v1.15/MicrosoftTeams.Localization.schema.json)

Example:

```json
{
    "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.14/MicrosoftTeams.Localization.schema.json",
    "name.short": "Portail de Développement",
    "name.full": "Portail des développeurs",
    "description.short": "Configurer, distribuer et gérer vos applications Microsoft Teams",
    "description.full": "Anciennement App Studio, le portail des développeurs peut vous aider où que vous soyez dans votre parcours de développement d’applications Microsoft Teams.1. Configurez une nouvelle application ou importez une application existante.2. Configurez les fonctionnalités de votre application et d’autres métadonnées importantes.3. Obtenez des ressources pour vous aider à créer une application de haute qualité.3. Testez votre application directement dans Teams.4. Distribuez votre application dans votre organisation ou dans le Store Teams.5. Analysez l’utilisation, l’engagement et d’autres informations sur votre application. Le portail inclut également des outils pour concevoir des scènes virtuelles personnalisées, des cartes adaptatives et l’intégration à la Plateforme d’identités Microsoft.",
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
|`meetingExtensionDefinition.scenes \\[[0-9]\\]\\.name$`|String|128| |

</details>
<br/>

<details><summary>Localization schema v1.13</summary>

## Localization schema v1.13

Link to Localization schema v1.13: [https://developer.microsoft.com/en-us/json-schemas/teams/v1.13/MicrosoftTeams.Localization.schema.json](https://developer.microsoft.com/en-us/json-schemas/teams/v1.15/MicrosoftTeams.Localization.schema.json)

Example:

```json
{
    "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.13/MicrosoftTeams.Localization.schema.json",
    "name.short": "Portail de Développement",
    "name.full": "Portail des développeurs",
    "description.short": "Configurer, distribuer et gérer vos applications Microsoft Teams",
    "description.full": "Anciennement App Studio, le portail des développeurs peut vous aider où que vous soyez dans votre parcours de développement d’applications Microsoft Teams.1. Configurez une nouvelle application ou importez une application existante.2. Configurez les fonctionnalités de votre application et d’autres métadonnées importantes.3. Obtenez des ressources pour vous aider à créer une application de haute qualité.3. Testez votre application directement dans Teams.4. Distribuez votre application dans votre organisation ou dans le Store Teams.5. Analysez l’utilisation, l’engagement et d’autres informations sur votre application. Le portail inclut également des outils pour concevoir des scènes virtuelles personnalisées, des cartes adaptatives et l’intégration à la Plateforme d’identités Microsoft.",
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
|`meetingExtensionDefinition.scenes \\[[0-9]\\]\\.name$`|String|128| |

</details>
<br/>

<details><summary>Localization schema v1.12</summary>

## Localization schema v1.12

Link to Localization schema v1.12: [https://developer.microsoft.com/en-us/json-schemas/teams/v1.12/MicrosoftTeams.Localization.schema.json](https://developer.microsoft.com/en-us/json-schemas/teams/v1.15/MicrosoftTeams.Localization.schema.json)

Example:

```json
{
    "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.12/MicrosoftTeams.Localization.schema.json",
    "name.short": "Portail de Développement",
    "name.full": "Portail des développeurs",
    "description.short": "Configurer, distribuer et gérer vos applications Microsoft Teams",
    "description.full": "Anciennement App Studio, le portail des développeurs peut vous aider où que vous soyez dans votre parcours de développement d’applications Microsoft Teams.1. Configurez une nouvelle application ou importez une application existante.2. Configurez les fonctionnalités de votre application et d’autres métadonnées importantes.3. Obtenez des ressources pour vous aider à créer une application de haute qualité.3. Testez votre application directement dans Teams.4. Distribuez votre application dans votre organisation ou dans le Store Teams.5. Analysez l’utilisation, l’engagement et d’autres informations sur votre application. Le portail inclut également des outils pour concevoir des scènes virtuelles personnalisées, des cartes adaptatives et l’intégration à la Plateforme d’identités Microsoft.",
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
|`meetingExtensionDefinition.scenes \\[[0-9]\\]\\.name$`|String|128| |

</details>
<br/>

<details><summary>Localization schema v1.11</summary>

## Localization schema v1.11

Link to Localization schema v1.11: [https://developer.microsoft.com/en-us/json-schemas/teams/v1.11/MicrosoftTeams.Localization.schema.json](https://developer.microsoft.com/en-us/json-schemas/teams/v1.15/MicrosoftTeams.Localization.schema.json)

Example:

```json
{
    "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.11/MicrosoftTeams.Localization.schema.json",
    "name.short": "Portail de Développement",
    "name.full": "Portail des développeurs",
    "description.short": "Configurer, distribuer et gérer vos applications Microsoft Teams",
    "description.full": "Anciennement App Studio, le portail des développeurs peut vous aider où que vous soyez dans votre parcours de développement d’applications Microsoft Teams.1. Configurez une nouvelle application ou importez une application existante.2. Configurez les fonctionnalités de votre application et d’autres métadonnées importantes.3. Obtenez des ressources pour vous aider à créer une application de haute qualité.3. Testez votre application directement dans Teams.4. Distribuez votre application dans votre organisation ou dans le Store Teams.5. Analysez l’utilisation, l’engagement et d’autres informations sur votre application. Le portail inclut également des outils pour concevoir des scènes virtuelles personnalisées, des cartes adaptatives et l’intégration à la Plateforme d’identités Microsoft.",
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
|`meetingExtensionDefinition.scenes \\[[0-9]\\]\\.name$`|String|128| |

</details>
<br/>

<details><summary>Localization schema v1.10</summary>

## Localization schema v1.10

Link to Localization schema v1.10: [https://developer.microsoft.com/en-us/json-schemas/teams/v1.10/MicrosoftTeams.Localization.schema.json](https://developer.microsoft.com/en-us/json-schemas/teams/v1.15/MicrosoftTeams.Localization.schema.json)

Example:

```json
{
    "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.10/MicrosoftTeams.Localization.schema.json",
    "name.short": "Portail de Développement",
    "name.full": "Portail des développeurs",
    "description.short": "Configurer, distribuer et gérer vos applications Microsoft Teams",
    "description.full": "Anciennement App Studio, le portail des développeurs peut vous aider où que vous soyez dans votre parcours de développement d’applications Microsoft Teams.1. Configurez une nouvelle application ou importez une application existante.2. Configurez les fonctionnalités de votre application et d’autres métadonnées importantes.3. Obtenez des ressources pour vous aider à créer une application de haute qualité.3. Testez votre application directement dans Teams.4. Distribuez votre application dans votre organisation ou dans le Store Teams.5. Analysez l’utilisation, l’engagement et d’autres informations sur votre application. Le portail inclut également des outils pour concevoir des scènes virtuelles personnalisées, des cartes adaptatives et l’intégration à la Plateforme d’identités Microsoft.",
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
|`meetingExtensionDefinition.scenes \\[[0-9]\\]\\.name$`|String|128| |

</details>
<br/>

<details><summary>Localization schema v1.9</summary>

## Localization schema v1.9

Link to Localization schema v1.9: [https://developer.microsoft.com/en-us/json-schemas/teams/v1.9/MicrosoftTeams.Localization.schema.json](https://developer.microsoft.com/en-us/json-schemas/teams/v1.15/MicrosoftTeams.Localization.schema.json)

Example:

```json
{
    "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.9/MicrosoftTeams.Localization.schema.json",
    "name.short": "Portail de Développement",
    "name.full": "Portail des développeurs",
    "description.short": "Configurer, distribuer et gérer vos applications Microsoft Teams",
    "description.full": "Anciennement App Studio, le portail des développeurs peut vous aider où que vous soyez dans votre parcours de développement d’applications Microsoft Teams.1. Configurez une nouvelle application ou importez une application existante.2. Configurez les fonctionnalités de votre application et d’autres métadonnées importantes.3. Obtenez des ressources pour vous aider à créer une application de haute qualité.3. Testez votre application directement dans Teams.4. Distribuez votre application dans votre organisation ou dans le Store Teams.5. Analysez l’utilisation, l’engagement et d’autres informations sur votre application. Le portail inclut également des outils pour concevoir des scènes virtuelles personnalisées, des cartes adaptatives et l’intégration à la Plateforme d’identités Microsoft.",
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

Link to Localization schema v1.8: [https://developer.microsoft.com/en-us/json-schemas/teams/v1.8/MicrosoftTeams.Localization.schema.json](https://developer.microsoft.com/en-us/json-schemas/teams/v1.15/MicrosoftTeams.Localization.schema.json)

Example:

```json
{
    "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.8/MicrosoftTeams.Localization.schema.json",
    "name.short": "Portail de Développement",
    "name.full": "Portail des développeurs",
    "description.short": "Configurer, distribuer et gérer vos applications Microsoft Teams",
    "description.full": "Anciennement App Studio, le portail des développeurs peut vous aider où que vous soyez dans votre parcours de développement d’applications Microsoft Teams.1. Configurez une nouvelle application ou importez une application existante.2. Configurez les fonctionnalités de votre application et d’autres métadonnées importantes.3. Obtenez des ressources pour vous aider à créer une application de haute qualité.3. Testez votre application directement dans Teams.4. Distribuez votre application dans votre organisation ou dans le Store Teams.5. Analysez l’utilisation, l’engagement et d’autres informations sur votre application. Le portail inclut également des outils pour concevoir des scènes virtuelles personnalisées, des cartes adaptatives et l’intégration à la Plateforme d’identités Microsoft.",
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
