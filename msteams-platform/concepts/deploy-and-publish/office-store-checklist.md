---
title: Publishing checklist
description: The checklist to use before publishing your Microsoft Teams app to AppSource
keywords: teams publish store office publishing checklist
---
# Checklist for app submission

The following metadata is required for your app.

|Data|Type|Size|Manifest|Partner Center|Description|
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

|Data|Type|Size|Manifest|Partner Center|Description|
|---|---|---|---|---|---|
|App name|String|30|`name.short`|✔|The name for your application as it should appear in the storefront and in product.|
|Long app name|String|30|`name.full`|✔|The name for your application as it should appear in the storefront and in product.|
|Short description|String|80|`description.short`|✔|Short description of your app.|
|Long description|String|4000|`description.full`|✔|A more detailed description of your app. In the manifest file, an accurate summary is adequate. In Partner Center, you can use a richer and formatted description for AppSource product page.|
|Screen shots (1-5)|.png, .jpg, or .gif|1366w x 768h and smaller than 1024 KB||✔|At least one screen shot that shows your app experience. Uses on the app details page.|

## Submission extras for bots

Bots in Microsoft Teams must be created using Bot Framework. See [Create a bot](~/bots/how-to/create-a-bot-for-teams.md) for instructions. Use a 96x96 color icon for your bot's icon in Bot Framework.

## Screenshots

The screenshots uploaded are displayed in both [Microsoft AppSource](https://appsource.microsoft.com/marketplace/apps?product=office%3Bteams&page=1) and your app listing in the Teams client to provide a visual preview of your app along with your app description.

You can provide 1 to 5 screenshots. They can be .png, .jpg, or .gif files, and should be 1366x768 pixels, with a max size of 1024 KB.

Screenshots should:

* Focus on highlighting all of your app's capabilities
* Not show any chrome/UI from outside of your app; do not capture any Teams or browser UI in your screenshots.
* Content should be representative of the app; do not include mock-ups that do not accurately reflect your apps actual UI such as showing your website instead of your Teams tab
* Text should be well-populated without being excessive

You can surround your screenshots with a background color and add marketing content similar to the [Freshdesk](https://appsource.microsoft.com/product/office/WA104381505?src=office&tab=Overview) example. In that case the dimensions are not of the screenshot, they are of the overall image.

<img width="800px" title="Freshdesk screenshot" src="~/assets/images/freshdesk.png" />

See more on the subject here:

* [Crafting effective AppSource store images](/office/dev/store/craft-effective-appsource-store-images)
