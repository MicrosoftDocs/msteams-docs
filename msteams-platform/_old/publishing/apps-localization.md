---
title: Localization for Team apps
description: Describes issues around localizing your app
keywords: teams publish store office publishing AppSource localization language seller dashboard
ms.date: 05/15/2018
---
# Localization for Microsoft Teams apps

When localizing your Microsoft Teams app there are three major areas you need to consider.

1. Your AppSource listing (if you're publishing to the app store).
1. The end-user facing strings in your app manifest (for example bot commands).
1. Responding to localized text submitted from your users.

## Localizing your AppSource listing

If you're publishing to the app store, you need to be aware that localizing your AppSource listing is not yet supported. However, in preparation for support for localized listings in the app store you can add additional languages to your listing. Currently only the default (English) language information you provide in [Seller Dashboard](http://go.microsoft.com/fwlink/?LinkId=248605) for your listing will appear in the [AppSource website](https://appsource.microsoft.com/marketplace/apps?product=office%3Bteams&page=1) listing for your app.

To configure an additional language for your app, in [Seller Dashboard](http://go.microsoft.com/fwlink/?LinkId=248605), select both English and the additional language of the app. French is used in this example.

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

In your app manifest file you provide multiple strings that are displayed to the end-user. If you choose, you can provide additional .json files with translations of these strings. Teams will use the translation that matches your end-user's default language settings in their client if it is available. Teams will also use the closest base language to any specific dialect. For example, if the client default language is set to `fr-ca` (French Canadien) and you do not provide a `fr-ca` translation but you do provide a `fr` (French) translation, we will use the `fr` translation. See: [Localization file JSON schema](~/resources/schema/localization-schema.md) for addtional information on the localization file.

To accomplish this you'll need to add the `localizationInfo` object to your app manifest file, providing the default language and pointers to any additional languages you'd like to support. For each additional language you wish to support you'll need to provide a .json file with translations of the strings you wish to localized.

### Example manifest change

```json
{
  ...
  "localizationInfo": {
    "defaultLanguageTag": "en-us",
    "additionalLanguages": [
      {
        "languageTag": "fr-fr",
        "file": "fr-fr.json"
      },
      {
        "languageTag": "pl-pl",
        "file": "pl-pl.json"
      }
    ]
  }
  ...
}
```

### Example localization .json file

```json
{
  "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.5/MicrosoftTeams.Localization.schema.json",
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
