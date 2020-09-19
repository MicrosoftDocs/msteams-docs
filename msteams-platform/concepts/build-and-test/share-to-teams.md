---
title: Add a Share-to-Teams button to your website
description: How to add the Share-to-Teams button to your website
keywords: Share Teams Share-to-Teams
---
# Add a Share-to-Teams button to your website

>[!NOTE]
>
> * Only the desktop versions of Edge and Chrome are supported.
> * Use of Freemium or guest accounts is not supported.

Third-party websites can use the launcher script to embed Share to Teams buttons on their webpages which will launch the Share to Teams experience in a popup window when clicked. This will allow you to share a link directly to any person or Microsoft Teams channel without switching context.

![Share to Teams pop-up](~/assets/images/share-to-teams-popup.png)

## How to embed a Share to Teams button

First, you'll need to add the `launcher.js` script on your webpage.

```html
<script async defer src="https://teams.microsoft.com/share/launcher.js"></script>
```

Next, add an HTML element on your webpage with the `teams-share-button` class attribute and the link to share in the `data-href` attribute.

```html
<div
  class="teams-share-button"
  data-href="https://<link-to-be-shared>">
</div>
```

This will add the Microsoft Teams icon to your website.

![Share to Teams icon](~/assets/icons/share-to-teams-icon.png)

Optionally, if you want a different icon size for the Share to Teams button, use the `data-icon-px-size` attribute.

```html
<div
  class="teams-share-button"
  data-href="https://<link-to-be-shared>"
  data-icon-px-size="64">
</div>
```

If you know that the URL preview from your link to be shared won't render well in Teams (for example the link would require user authentication) you can disable the URL preview by adding the `data-preview` attribute set to `false`.

```html
<div
  class="teams-share-button"
  data-href="https://<link-to-be-shared>"
  data-preview="false">
</div>
```

If your page dynamically renders content, you can use the the `shareToMicrosoftTeams.renderButtons()` method to force the **Share** button to render at the appropriate place in the pipeline.

## Crafting your website preview

When your website is shared to Teams, the card that is inserted into the selected channel will contain a preview of your website. You can control the behavior of this preview by ensuring the appropriate meta-data is added to the website being shared (the `data-href` URL). The table below outlines the necessary tags. You can use either the html default versions, or the Open Graph version.

In order for the preview to be displayed you must:

* Include either a Thumbnail image, or both a Title and Description (for best results, include all three).
* The URL being shared cannot require authentication. If it does you can still share it, but the preview will not be created.

|Value|Meta tag| Open Graph|
|----|----|----|
|Title|`<meta name="title" content="Example Page Title">`|`<meta property="og:title" content="Example Page Title">`|
|Description|`<meta name="description" content="Example Page Description">`|`<meta property="og:description" content="Example Page Description">`|
|Thumbnail Image| none |`<meta property="og:image" content="http://example.com/image.jpg">`|

## Share to Teams for Education

For teachers using the Share to Teams button you'll be given an additional option to `Create an Assignment`. This enables you to quickly create an assignment in the chosen Team based on the shared link.

![Share to Teams pop-up view](~/assets/images/share-to-teams-popup-edu.png)

## Full launcher.js definition

| Property | HTML attribute | Type | Default | Description |
| -------------- | ---------------------- | --------------------- | ------- | ---------------------------------------------------------------------- |
| href | `data-href` | string | n/a | The href of the content to share. |
| preview | `data-preview` | boolean (as a string) | `true` | Whether or not to show a preview of the content to share. |
| iconPxSize | `data-icon-px-size` | number (as a string) | `32` | The size in pixels of the Share-to-Teams button to render. |
| msgText | `data-msg-text` | string | n/a | Default Text to be inserted before the link in the message compose box (200 character limit) |
| assignInstr | `data-assign-instr` | string | n/a | Default Text to be inserted in the assignments "Instructions" field (200 character limit) |
| assignTitle | `data-assign-title` | string | n/a | Default Text to be inserted in the assignments "Title" field (50 character limit) |

### Methods

**`shareToMicrosoftTeams.renderButtons(options)`**

`options` (optional): `{ elements?: HTMLElement[] }`

Renders all share buttons currently on the page. If an optional `options` object is supplied with a list of elements, those elements will be rendered into share buttons.

### Setting default form values

Optionally, you can choose to set default values for the following fields on the Share to Teams form:

* Say something about this (`msgText`)
* Assignment Instructions (`assignInstr`)
* Assignment Title (`assignTitle`)

#### Example: Default form values

```html
<span
    class="teams-share-button"
    data-href="https://www.microsoft.com/education/products/teams"
    data-msg-text="Default Message"
    data-assign-title="Default Assignment Title"
    data-assign-instr="Default Assignment Instructions"
></span>
```
