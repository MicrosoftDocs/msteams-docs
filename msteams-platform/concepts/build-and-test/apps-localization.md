---
title: Localization for your app
description: Describes issues around localizing your app
ms.topic: conceptual
keywords: teams publish store office publishing AppSource localization language
ms.date: 05/15/2018
---
# Localization for Microsoft Teams apps

When localizing your Microsoft Teams app there are three major areas you need to consider.

1. Your AppSource listing (if you're publishing to the app store).
1. The end-user facing strings in your app manifest (for example bot commands).
1. Responding to localized text submitted from your users.

## Localizing your AppSource listing

If you're publishing to the app store, you need to be aware that localizing your AppSource listing is not yet supported. However, in preparation for support for localized listings in the app store you can add additional languages to your listing. Currently only the default (English) language information you provide in [Partner Center](/office/dev/store/submit-to-appsource-via-partner-center) for your listing will appear in the [AppSource website](https://appsource.microsoft.com/marketplace/apps?product=office%3Bteams&page=1) listing for your app.

To configure an additional language for your app, in [Partner Center](/office/dev/store/submit-to-appsource-via-partner-center), select both English and the additional language of the app. French is used in this example.

1. Add English language
    * Fill in the app name.
    * Fill in a short description of the app in English.
    * Fill in the long description of the app in English.
    * In the long description, please also add the line “This app is available in “French”.
    * Upload the images of your app UI (in English).
2. Add French language
    * Fill in the app name.
    * Fill in a short description of the app in French.
    * Fill in the long description of the app in French.
    * Upload the images of your app UI (in French).

The images you upload with the English language will be the ones used in AppSource.

## Localizing the strings in your app manifest

You must use the Microsoft Teams app schema v1.5+ to properly localize your app. You can do this by setting the `$schema` attribute in your manifest.json file to 'https://developer.microsoft.com/en-us/json-schemas/teams/v1.8/MicrosoftTeams.Localization.schema.json' and updating the 'manifestVersion' property to '1.7'.

### Example manifest.json change

```json
{
  "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.8/MicrosoftTeams.Localization.schema.json",
  "manifestVersion": "1.5",
  ...
}
```

You will then want to add the 'localizationInfo' property with the default language that your application supports. The default language is used as the final fallback language if the user's client settings do not match any of your additional languages.

### Example manifest.json change

```json
{
  ...
  "localizationInfo": {
    "defaultLanguageTag": "en"
  }
  ...
}
```

You can provide additional .json files with translations of all the user facing strings in your manifest. These files must adhere to the [Localization file JSON schema](../../resources/schema/localization-schema.md) and they must be added to the 'localizationInfo' property of your manifest. Each file correlates to a language tag which the Teams client uses to choose the appropriate strings. The language tag takes the form of <language>-<region> but it is recommended to omit the <region> portion to target all regions that support the desired language.

The Teams client will apply the strings in this order: default language strings -> user's language only strings -> user's language + user's region strings.

For example, you provide a default language of 'fr' (French, all regions), and additional language files for 'en' (English, all regions) and 'en-gb' (English, Great Britain). If the user's language is set to 'en-gb':

1. The Teams client will take the 'fr' strings overwrite them with the 'en' strings.
2. Overwrite those with the 'en-gb' strings.

If the user's language is set to 'en-ca': 

1. The Teams client will take the 'fr' strings overwrite them with the 'en' strings.
2. Since no 'en-ca' localization is supplied, the 'en' localizations will be used.

If the user's language is set to 'es-es', the Teams client will take the 'fr' strings and will not override them with any of the language files.

Therefore, it is strongly recommended to provide top-level, language-only translations in your manifest ('en' instead of 'en-us') and only provide region-level overrides for the few strings that need them.

### Example manifest.json change

```json
{
  ...
  "localizationInfo": {
    "defaultLanguageTag": "en",
    "additionalLanguages": [
      {
        "languageTag": "en-gb",
        "file": "en-gb.json"
      },
      {
        "languageTag": "fr",
        "file": "fr.json"
      },
      {
        "languageTag": "pl",
        "file": "pl.json"
      }
    ]
  }
  ...
}
```

### Example localization .json file

```json
{
  "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.8/MicrosoftTeams.Localization.schema.json",
  "name.short": "Le App",
  "name.full": "App pour Microsoft Teams",
  "description.short": "Créez d'excellentes applications pour Microsoft Teams avec App.",
  "description.full": "Créez de nouvelles applications Microsoft Teams, concevez et prévisualisez des cartes bot, et explorez la documentation avec App.",
  "staticTabs[0].name": "Editeur de manifest",
  "staticTabs[1].name": "Editeur de cartes",
  "staticTabs[2].name": "Bibliothèque de contrôles",
  "bots[0].commandLists[0].commands[0].title": "chercher",
  "bots[0].commandLists[0].commands[0].description": "Rechercher la documentation Teams pertinente"
}
```

## Handling localized text submissions from your users

If your provide localized versions of your application it is very likely that your users will respond with the same language. Teams does not translate the user submissions back to the default language, so your app will need to handle that. For example, if you provide a localized `commandList`, the responses to your bot will be the localized text of the command, not the default language. Your app will need to respond appropriately.
