---
title: Localize your app
description: Learn considerations for localizing your Microsoft Teams app and localize strings in your app manifest.
ms.topic: conceptual
ms.localizationpriority: medium
ms.date: 05/15/2018
---
# Localize your app

Consider the following factors to localize your Microsoft Teams app:

1. [Localize your AppSource listing](#localize-your-appsource-listing).
1. [Localize strings in your app manifest](#localize-strings-in-your-app-manifest).
1. [Handle localized text submissions from your users](#handle-localized-text-submissions-from-your-users).

## Localize your AppSource listing

If you're publishing the app to the store, provide metadata (descriptions, screenshots, name) in the languages that you would like your app to be listed in, and explicitly specify these languages on the **Marketplace listings** page in Partner Center. For more information, see [localized Microsoft AppSource fronts](/office/dev/store/prepare-localized-solutions#localized-microsoft-appsource-fronts). To support localized listings in the app store, you can add additional languages to your listing. The default language information you provide in [Partner Center](/office/dev/store/submit-to-appsource-via-partner-center) for your listing appears in the [AppSource website](https://appsource.microsoft.com/marketplace/apps?product=office%3Bteams&page=1 "AppSource is one place for all your team needs. bring everything together including chats, meetings, calls, files, and tools to enable more productive teamwork.") listing for your app. Currently, the default language is English.

### Configure localization

To configure an additional language for your app, in [Partner Center](/office/dev/store/submit-to-appsource-via-partner-center), select both English and the additional language of the app. French is used as an additional language in the following example:

1. Add English language
    * Enter the app name.
    * Enter a short description of the app in English.
    * Enter the long description of the app in English.
    * In the long description, enter: **This app is available in French**.
    * Upload the images of your app UI (in English).
2. Add French language
    * Enter the app name.
    * Enter a short description of the app in French.
    * Enter the long description of the app in French.
    * Upload the images of your app UI (in French).

The images that you upload with the English language are used in AppSource.

## Localize strings in your app manifest

Use the Microsoft Teams app schema `v1.5` and later to localize your app. You can do this by setting the `$schema` attribute in your manifest.json file to `https://developer.microsoft.com/json-schemas/teams/v1.5/MicrosoftTeams.schema.json` or higher and updating the `manifestVersion` property to `$schema` version (`1.5` in this case).

Add the `localizationInfo` property with the default language that your application supports. The default language is used as the final fallback language if the user's client settings don't match with any of your additional languages.

> [!NOTE]
> Manifest version must be same for both manifest.json and localization.json files.

### Example manifest.json change

The following `manifest.json` helps to add the `localizationInfo` property with the default language that your application supports along with `additionalLanguages`:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/teams/v1.5/MicrosoftTeams.schema.json",
  "manifestVersion": "1.5",
  "localizationInfo": {
  "defaultLanguageTag": "en",
  "additionalLanguages": [
   {
    "languageTag": "es-mx",
    "file": "es-mx.json"
   }
  ]
 }
  ...
}
```

### Example localization .json change

Following is an example for localization .json:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/teams/v1.5/MicrosoftTeams.Localization.schema.json",
  "manifestVersion": "1.5",
  "name.short": "Localización",
  "name.full": "Aplicación de localización",
  ...
}
```

You can provide additional .json files with translations of all the user facing strings in your manifest. These files must adhere to the [Localization file JSON schema](../../resources/schema/localization-schema.md) and they must be added to the `localizationInfo` property of your manifest. Each file correlates to a language tag, which the Microsoft 365 host application, such as Teams or Outlook, uses it to select the appropriate strings. The language tag takes the form of `<language>-<region>` but you can omit the `<region>` portion to target all regions that support the desired language.

The Microsoft 365 host application applies the strings in the following order: default language strings -> user's language only strings -> user's language + user's region strings.

For example, you provide a default language of 'fr' (French, all regions), and additional language files for 'en' (English, all regions) and 'en-gb' (English, Great Britain), the user's language is set to 'en-gb'. The following changes take place based on the language selection:

1. The Microsoft 365 host application takes the 'fr' strings and overwrites them with the 'en' strings.
1. Overwrite the 'en' strings with the 'en-gb' strings.

If the user's language is set to 'en-ca', the following changes take place based on the language selection:

1. The Microsoft 365 host application takes the 'fr' strings and overwrites them with the 'en' strings.
1. Since no 'en-ca' localization is supplied, the 'en` localizations are used.

If the user's language is set to 'es-es', the Microsoft 365 host application takes the 'fr' strings. The Microsoft 365 host application doesn't override the strings with any of the language files as no 'es' or 'es-es' translation is provided.

Therefore, you must provide top level, language only translations in your manifest. For example, `en` instead of `en-us`. You must provide region level overrides only for the few strings that need them.

### Example manifest.json change

The `manifest.json` change is shown in the following example:

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

 The `localization.json` change is shown in the following example:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/teams/v1.8/MicrosoftTeams.Localization.schema.json",
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

## Handle localized text submissions from your users

If you provide localized versions of your application, the users respond with the same language. As Teams doesn't translate the user submissions back to the default language, your app must handle the localized language responses. For example, if you provide a localized `commandList`, the responses to your bot are the localized text of the command, not the default language. Your app must respond appropriately.

## Code sample

| Sample name | Description | .NET | Node.js |
|-------------|-------------|------|------|
| App Localization | Teams app localization using bot and tab. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-localization/csharp) |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-localization/nodejs) |

## Next step

> [!div class="nextstepaction"]
> [Localize JSON schema reference](../../resources/schema/localization-schema.md)

## See also

* [Microsoft Teams store validation guidelines](../deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md)
* [Create a Partner Center developer account](../deploy-and-publish/appsource/prepare/create-partner-center-dev-account.md)
* [Prepare your Teams store submission](../deploy-and-publish/appsource/prepare/submission-checklist.md)
* [Update Apple App Store Connect Team ID on Partner Center](../deploy-and-publish/appsource/prepare/update-apple-store-team-connect-id.md)
* [App manifest](../../resources/schema/manifest-schema.md)
