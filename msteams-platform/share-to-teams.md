---
title: Share to Teams embedded button
description: How to add the Share-to-Teams embedded button on your website
keywords: Share Teams Share-to-Teams
ms.date: 04/01/2019
---
# Creating a Share-to-Teams embedded button

>[!NOTE]
>Share-to-Teams is currently in [Developer Preview](~/resources/dev-preview/developer-preview-intro.md). 
>
>To view this functionality in Developer Preview, you'll need to:
>
>1. Go to [https://teams.microsoft.com](https://teams.microsoft.com) from the **same browser** that you wish to test the functionality from
>1. Set your browser client to Developer Preview (similar to how you would configure your desktop client for Developer Preview)
>    * Click your Avatar in the top right corner
>    * Select About, then Developer Preview
>1. Test your configuration by going to [https://teams.microsoft.com/share](https://teams.microsoft.com/share). The Share-to-Teams form should load
>1. Proceed to test your application in a separate tab in the same browser
>
>If you receive the error message "The resource you are looking for has been removed, had its name changed, or is temporarily unavailable." you have not properly configured your browser session to use Developer Preview.

Third-party websites can use the launcher script to embed Share-to-Teams buttons on their webpages which will launch the Share-to-Teams experience in a popup window when clicked. This will allow you to share a link directly to any person or Microsoft Teams channel without switching context.

![Share-to-Teams popup](~/assets/images/share-to-teams-popup.png)

## How to embed a Share-to-Teams button

First, you'll need to add the `launcher.js` script on your webpage.

```html
<script async defer src="https://teams.microsoft.com/share/launcher.js" ></script>
```

Next, add an HTML element on your webpage with the `teams-share-button` class attribute and the link to share in the `data-href` attribute.

```html
<div
  class="teams-share-button"
  data-href="https://<link-to-be-shared>" >
</div>
```

This will add the Microsoft Teams icon to your website.

![Share-to-Teams icon](!/assets/images/share-to-teams-icon.png)

Optionally, if you want a different icon size for the Share-to-Teams button, use the `data-icon-px-size` attribute.

```html
<div
  class="teams-share-button"
  data-href="https://<link-to-be-shared>"
  data-icon-px-size="64" >
</div>
```

If you know that the URL preview from your link to be shared won't render well in Teams (for example the link would require user authentication) you can disable the URL preview by adding the `data-preview` attribute set to `false`.

```html
<div
  class="teams-share-button"
  data-href="https://<link-to-be-shared>"
  data-preview="false" >
</div>
```

## Share-to-Teams for Education

For teachers using the Share-to-Teams button you'll be given an additional option to `Create an Assignment`. This enables you to quickly create an assignment in the chosen Team based on the shared link.

![Share-to-Teams popup](~/assets/images/share-to-teams-popup-edu.png)

## Full launcher.js definition

|HTML Attribute|Type|Default|Description|
|---------|---------|---------|---------|
|data-href|string|n/a|The href of the content to share.|
|data-preview|boolean (as string)|true|Whether or not to show a preview of the content to share|
|data-icon-px-size|number (as string)|32|The size in pixels of the Share-to-Teams button, maximum 128|
