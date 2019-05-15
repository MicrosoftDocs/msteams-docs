---
title: Localization for Team apps
description: Describes issues around localizing your app
keywords: teams publish store office publishing AppSource localization language seller dashboard
ms.date: 05/15/2018
---
# Localization for Microsoft Teams apps

When localizing your Microsoft Teams app there are three major areas you need to consider.

1. Your AppSource listing (if you're deploying to the app store)
1. The language strings in your app manifest
1. Responding to localized text submitted from your users.

## Localizing your AppSource listing

If you're publishing to the app store, you need to be aware that localizing your AppSource listing is not yet supported. In preparation for support for localized listings in the app store you can still add additional languages to your listing. The information you provide in [Seller Dashboard](http://go.microsoft.com/fwlink/?LinkId=248605) for your listing will appear only in the [AppSource website](https://appsource.microsoft.com/marketplace/apps?product=office%3Bteams&page=1).

In [Seller Dashboard](http://go.microsoft.com/fwlink/?LinkId=248605), select both English and the additional language of the app (even if the app is not available in English). French is used in this example.

1. Add English language
    * Fill in the app name.
    * Fill in a short description of the app in English.
    * Fill in the long description of the app in English.
    * In the long description, please also add the line “This app is available in “French”.
    * Upload the images of your app UI (in English).
2. Add French language
    * Fill in the app name.
    * Fill in a short description of the app in French.
    * Fill in the Long description of the app in French.
    * Upload the images of your app UI (in French).

The images you upload with the English language will be the ones used in AppSource.

## Localizing the strings in your app manifest

In your app manifest file you provide multiple strings that are displayed to the end-user. If you choose, you can provide additional .json files with translations of this strings. Teams will use the translation that matches your end-user's default language settings in their OS if it is available. Teams will also use the closes base language to any specific dialect. For example, client OS default language is set to `fr-ca` (French Canadien) and you do not provide a `fr-ca` translation but you do provice a `fr-fr` (French) translation, we will use the `fr-fr` translation.

To accomplish this you'll need to add the `localizationInfo` object to your app manifest file, providing the default language and pointers to any additional languages you'd like to support. For each additional language you'll need to provide a 

### Example manifest change

```json
...
"localizationInfo": {
  "defaultLanguageTag": "en-UK",
  "additionalLanguages": [
    {
      "languageTag": "fr-FR",
      "file": "fr-FR.json"
    }
  ]
}
...
```

### Example localazation .json file

```json
{
  "$schema": "https://raw.githubusercontent.com/OfficeDev/microsoft-teams-app-schema/preview/localization/MicrosoftTeams.Localization.schema.json",
  "languageTag": "fr-FR",
  "name.short": "App Studio",
  "name.full": "App Studio pour Microsoft Teams",
  "description.short" : "Créez d'excellentes applications pour Microsoft Teams avec App Studio. ",
  "description.full" : "Créez de nouvelles applications Microsoft Teams, concevez et prévisualisez des cartes bot et explorez la documentation à l'aide d'App Studio.",
  "staticTabs[0].name": "Editeur de Manifeste",
  "staticTabs[1].name": "Editeur de Carte",
  "staticTabs[2].name": "Bibliothèque de Contrôle",
  "bots[0].commandLists[0].commands[0].title" : "chercher",
  "bots[0].commandLists[0].commands[0].description": "Rechercher la documentation Teams pertinente",
  "composeExtensions[0].commands[0].title": "Partager App Definition",
  "composeExtensions[0].commands[0].description": "Partagez la définition de votre application avec un ami!",
  "composeExtensions[0].commands[0].parameters[0].title" :"Nom de l'application",
  "composeExtensions[0].commands[0].parameters[0].description": "Le nom de la définition de votre application"
}
```