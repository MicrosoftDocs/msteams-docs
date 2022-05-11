---
title: Localize JSON schema reference
description: Describes the localization schema supported by the localization file for Microsoft Teams using an example schema
ms.topic: reference
ms.localizationpriority: medium
keywords: teams manifest schema localization
ms.date: 05/20/2019
---

# Localize JSON schema reference

The Microsoft Teams localization file describes language translations that are served based on the client language settings. Your file must conform to the schema hosted at [`https://developer.microsoft.com/en-us/json-schemas/teams/v1.8/MicrosoftTeams.Localization.schema.json`](https://developer.microsoft.com/en-us/json-schemas/teams/v1.8/MicrosoftTeams.Localization.schema.json).

> [!TIP]
> Specify the schema at the beginning of your manifest to enable `IntelliSense` or similar support from your code editor: `"$schema": "https://developer.microsoft.com/json-schemas/teams/v1.8/MicrosoftTeams.schema.json",`

## Example

Example of localization JSON schema is as follows:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/teams/v1.8/MicrosoftTeams.schema.json",
  "name.short": "Le App Studio",
  "name.full": "App Studio pour Microsoft Teams",
  "description.short": "Créez d'excellentes applications pour Microsoft Teams avec App Studio.",
  "description.full": "Créez de nouvelles applications Microsoft Teams, concevez et prévisualisez des cartes bot, et explorez la documentation avec App Studio.",
  "staticTabs[0].name": "Editeur de manifest",
  "staticTabs[1].name": "Editeur de cartes",
  "staticTabs[2].name": "Bibliothèque de contrôles",
  "bots[0].commandLists[0].commands[0].title": "chercher",
  "bots[0].commandLists[0].commands[0].description": "Rechercher la documentation Teams pertinente"
}
```

The schema defines the following properties:

|Property|Type|Maximum length|Description|
|---------------|--------|---------|------------------|
|`$schema`|URI|NA|The https:// URL referencing the JSON Schema for the manifest.|
|`name.short`|String|30|Replaces the corresponding string from the app manifest with the value provided here.|
|`name.full`|String|100|Replaces the corresponding string from the app manifest with the value provided here.|
|`description.short`|String|80|Replaces the corresponding string from the app manifest with the value provided here.|
|`description.full`|String|4000|Replaces the corresponding string from the app manifest with the value provided here.|
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

## See also

[Localize your app](~/concepts/build-and-test/apps-localization.md)
