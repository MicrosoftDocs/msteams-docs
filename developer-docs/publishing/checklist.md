---
title: Publishing Checklist | Microsoft Docs
description: The checklist you should use to publish your app to the store
author: charlesprakash
ms.author: charlesprakash
manager: billbl
ms.topic: article
ms.prod: msteams
ms.date: 10/05/2017
keywords: teams publish store office publishing checklist
---

# Checklist for manifest metadata and Seller Dashboard submission

The follow metadata is required in your manifest.json file and for Seller Dashboard submission:

|Data|Type|Size|Manifest|Seller Dashboard|Description|
|---|---|---|---|---|---|
|App package|Zip|||✔|The actual app package for sideloading or Office Store submission.|
|App logo|.png|96&times;96 pixels|`icon.color`|✔|The icon to display in the product page listing in the Office Store / Teams gallery. This is your full-color product icon.|
|App logo outline|.png|20&times;20 pixels|`icon.outline`||The icon to display in Teams, in the Teams chat channel and other locations. This is your logo rendered as a white outline with transparent background.|
|Support link|URL|||✔|A link to support material for end users. Can be HTTP or HTTPS.|
|Privacy link|URL||`developer.privacyUrl`|✔|A link to your privacy policy (HTTPS).|
|Video link|URL|||Optional|A link to a video about your app.|
|EULA|.doc, .pdf, etc.|||Optional|The Office Store requires an end-user licensing agreement (EULA), which you can provide as an attachment. If you choose not to submit a EULA, one will be provided on your behalf.| 
|Terms of service|URL||`developer.termsOfServiceUrl`||A link to your terms of service (HTTPS).|

## Localized content

>**Note:** Microsoft Teams plans to support localized content for the following metadata. Currently, only English is supported for Teams apps.

|Data|Type|Size|Manifest|Seller Dashboard|Description|
|---|---|---|---|---|---|
|App name|String|30|`name.short`|✔|The name for your application as it should appear in the storefront and in product.|
|Long app name|String|30|`name.full`|✔|The name for your application as it should appear in the storefront and in product.|
|Short description|String|80|`description.short`|✔|Short description of your app.|
|Long description|String|4000|`description.full`|✔|A more detailed description of your app. In the manifest file, an accurate summary is adequate. In the Seller Dashboard, you can use a richer and formatted description for the Office Store product page.|
|Screen shots (1&ndash;5)|.png, .jpg, or .gif|1366w &times; 768h and smaller than 1024 KB||✔|At least one screen shot that shows your app experience. Uses on the app details page.|

## Submission extras for bots

Bots in Microsoft Teams must be built and registered in the Bot Framework. Teams pulls some information from the Bot Framework to display to end users, so you must ensure you provide the following information on the Bot Framework Dev Portal as well as in the Teams Manifest.

On your bot portal page, click the Publish button. In this dialog there are several required fields that you must enter:

* **Icon**&emsp;Use your 96&times;96 color icon
* **Privacy statement**&emsp;Must match the privacy link URL you provide in your manifest and the Seller Dashboard
* **Terms of use**&emsp;Must match the terms of service URL you provide in your manifest

Fill in the information and choose **Save**.

>**Note:** You are not required to publish the bot to the Bot Framework bot directory.
