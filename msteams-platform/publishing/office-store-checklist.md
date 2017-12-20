---
title: Publishing checklist
description: The checklist to use before publishing your Microsoft Teams app to the Office Store
keywords: teams publish store office publishing checklist
---

# Checklist for manifest metadata and Seller Dashboard submission

The follow metadata is required in your manifest.json file and for Seller Dashboard submission:

|Data|Type|Size|Manifest|Seller Dashboard|Description|
|---|---|---|---|---|---|
|App package|.zip|||✔|The actual app package for uploading or Office Store submission.|
|App logo|.png|96&times;96 pixels|`icon.color`|✔|The icon to display in the product page listing in the Office Store or Teams gallery. This is your full-color product icon.|
|App logo outline|.png|20&times;20 pixels|`icon.outline`||The icon to display in Teams, in the Teams chat channel and other locations. This is your logo rendered as a white outline with transparent background.|
|Support link|URL|||✔|A link to support material for end users. Can be HTTP or HTTPS.|
|Privacy link|URL||`developer.privacyUrl`|✔|A link to your privacy policy (HTTPS).|
|Video link|URL|||Optional|A link to a video about your app.|
|EULA|.doc, .pdf, etc.|||Optional|The Office Store requires an end-user licensing agreement (EULA), which you can provide as an attachment. If you choose not to submit a EULA, one will be provided on your behalf.| 
|Terms of service|URL||`developer.termsOfServiceUrl`||A link to your terms of service (HTTPS).|

## Localized content

> [!NOTE]
> Microsoft Teams plans to support localized content for the following metadata. Currently, only English is supported for Teams apps.

|Data|Type|Size|Manifest|Seller Dashboard|Description|
|---|---|---|---|---|---|
|App name|String|30|`name.short`|✔|The name for your application as it should appear in the storefront and in product.|
|Long app name|String|30|`name.full`|✔|The name for your application as it should appear in the storefront and in product.|
|Short description|String|80|`description.short`|✔|Short description of your app.|
|Long description|String|4000|`description.full`|✔|A more detailed description of your app. In the manifest file, an accurate summary is adequate. In the Seller Dashboard, you can use a richer and formatted description for the Office Store product page.|
|Screen shots (1&ndash;5)|.png, .jpg, or .gif|1366w &times; 768h and smaller than 1024 KB||✔|At least one screen shot that shows your app experience. Uses on the app details page.|

## Submission extras for bots

Bots in Microsoft Teams must be created using Bot Framework. (See [Create a bot](~/concepts/bots/bots-create) for instructions.) Use your Use your 96&times;96 color icon for your bot's icon in Bot Framework.