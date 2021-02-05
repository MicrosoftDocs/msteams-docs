---
title: Localization file JSON schema reference
description: Describes the localization schema supported by the localization file for Microsoft Teams
ms.topic: reference
keywords: teams manifest schema localization
ms.date: 05/20/2019
---

# Reference: Localization file JSON schema

The Microsoft Teams localization file describes language translations that will be served based on the client language settings. Your file must conform to the schema hosted at [`https://developer.microsoft.com/en-us/json-schemas/teams/v1.8/MicrosoftTeams.Localization.schema.json`](https://developer.microsoft.com/en-us/json-schemas/teams/v1.8/MicrosoftTeams.Localization.schema.json). For additional information see [app localization](~/concepts/build-and-test/apps-localization.md).

## Sample

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

## $schema

**URI**

The https:// URL referencing the JSON Schema for the manifest.

> [!TIP]
> Specify the schema at the beginning of your manifest to enable IntelliSense or similar support from your code editor: `"$schema": "https://developer.microsoft.com/json-schemas/teams/v1.8/MicrosoftTeams.schema.json",`

## name.short

**String, Max Length 30**

Replaces the corresponding string from the app manifest with the value provided here.

## name.full

**String, Max Length 100**

Replaces the corresponding string from the app manifest with the value provided here.

## description.short

**String, Max Length 80**

Replaces the corresponding string from the app manifest with the value provided here.

## description.full

**String, Max Length 4000**

Replaces the corresponding string from the app manifest with the value provided here.

## staticTabs\\[([0-9]|1[0-5])\\]\\.name

**String, Max Length 128**

Replaces the corresponding string(s) from the app manifest with the value provided here.

## bots\\[0\\]\\.commandLists\\[[0-2]\\]\\.commands\\[[0-9]\\]\\.title

**String, Max Length 32**

Replaces the corresponding string(s) from the app manifest with the value provided here.

## bots\\[0\\]\\.commandLists\\[[0-2]\\]\\.commands\\[[0-9]\\]\\.description

**String, Max Length 128**

Replaces the corresponding string(s) from the app manifest with the value provided here.

## composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.title

**String, Max Length 32**

Replaces the corresponding string(s) from the app manifest with the value provided here.

## composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.description

**String, Max Length 128**

Replaces the corresponding string(s) from the app manifest with the value provided here.

## composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.title

**String, Max Length 32**

Replaces the corresponding string(s) from the app manifest with the value provided here.

## composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.description

**String, Max Length 128**

Replaces the corresponding string(s) from the app manifest with the value provided here.

## composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.value

**String, Max Length 512**

Replaces the corresponding string(s) from the app manifest with the value provided here.

## composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.parameters\\[[0-4]\\]\\.choices\\[[0-9]\\]\\.title

**String, Max Length 128**

Replaces the corresponding string(s) from the app manifest with the value provided here.

## composeExtensions\\[0\\]\\.commands\\[[0-9]\\]\\.taskInfo\\.title

**String, Max Length 64**

Replaces the corresponding string(s) from the app manifest with the value provided here.
