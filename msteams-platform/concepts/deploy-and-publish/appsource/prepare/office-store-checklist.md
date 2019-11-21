---
title: Publishing checklist
description: The checklist to use before publishing your Microsoft Teams app to AppSource
keywords: teams publish store office publishing checklist
---
# Manifest package checklist

Follow the following tips and requirement to build a great manifest package.

>[!Tip]
> Use app studio to have your manifest built for you. After including all the metadata and icons,use our manifest checker in App Studio to test your package before submitting.

## Tips

* Don't use "Teams", "Microsoft", or "app" in your app name.
* The developerName in the App Manifest must be same as the Provider Name defined in Seller Dashboard.
* Make sure the app description, screenshots, text, and promotional images describe only the app and do not contain any additional advertising, promotions or copyrighted brand names.
* If your product requires an account on your service or another service, list that in the description and ensure there are links to sign up, sign in and sign out.
* If your product requires additional purchases to function properly, list that in the description.
* Provide the requisite Terms and Privacy policy links in the manifest and the Seller Dashboard. Verify that the links properly resolve to the correct documentation, ideally Teams specific. For bots, you must provide this same information in the Submission section of the Bot Framework registration page.
* Ensure that metadata in the manifest roughly matches metadata in the Seller Dashboard (and, for bots, in the Bot Framework registration). Note that your Seller Dashboard entry should contain a more detailed and formatted description for use in the AppSource product page.

# Metadata requirement

The following metadata is required in your manifest.json file and for AppSource Seller Dashboard submission.

|Data|Type|Size|Manifest|Seller Dashboard|Description|
|---|---|---|---|---|---|
|App package|.zip|||✔|The actual app package for uploading or AppSource submission.|
|Color logo|.png|192&times;192 pixels|`icon.color`||The icon to display in the product page listing in the Teams gallery. This is your full-color product logo.|
|Logo outline|.png|32&times;32 pixels|`icon.outline`||The icon to display in Teams, in the Teams chat channel and other locations. This is your logo rendered as a white outline with transparent background.|
|App logo|.png, .jpg, .jpeg, .gif|300&times;300 pixels||✔|The icon to display in AppSource. This is the full-color product logo, and is a different file from the one used in the manifest for `icon.color`. it should be smaller than 512 KB.|
|Support link|URL|||✔|A link to support material for end users who may not have installed your app. Publicly available link accessible without any login (HTTPS).|
|Privacy link|URL||`developer.privacyUrl`|✔|A link to your privacy policy (HTTPS).|
|Video link|URL|||Optional|A link to a video about your app.|
|EULA|.doc, .pdf, etc.|||Optional|AppSource requires an end-user licensing agreement (EULA), which you can provide as an attachment. If you choose not to submit a EULA, one will be provided on your behalf.|
|Terms of service|URL||`developer.termsOfServiceUrl`||A link to your terms of service (HTTPS).|
|Test Notes|Fill inline or link to a public URL|||Detailed test notes on how to test your application step by step. Please include two login credentials for testing Admin and Non-admin scenarios.|

## Localized content

> [!NOTE]
> AppSource plans to support localized content for the following metadata. Currently, your app listing will only show in English in AppSource, but will display properly localized in the Teams client. See [localizing your app](~/concepts/build-and-test/apps-localization.md) for more information.

|Data|Type|Size|Manifest|Seller Dashboard|Description|
|---|---|---|---|---|---|
|App name|String|30|`name.short`|✔|The name for your application as it should appear in the storefront and in product.|
|Long app name|String|30|`name.full`|✔|The name for your application as it should appear in the storefront and in product.|
|Short description|String|80|`description.short`|✔|Short description of your app.|
|Long description|String|4000|`description.full`|✔|A more detailed description of your app. In the manifest file, an accurate summary is adequate. In the Seller Dashboard, you can use a richer and formatted description for AppSource product page.|
|Screen shots (1-5)|.png, .jpg, or .gif|1366w x 768h and smaller than 1024 KB||✔|At least one screen shot that shows your app experience. Uses on the app details page.|

## Submission extras for bots

Bots in Microsoft Teams must be created using Bot Framework. See [Create a bot](~/bots/how-to/create-a-bot-for-teams.md) for instructions. Use a 96x96 color icon for your bot's icon in Bot Framework.