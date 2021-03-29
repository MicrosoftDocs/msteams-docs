---
title: Create a Share-to-Teams button
description: How to add the Share to Teams embedded button on your website
ms.topic: reference
keywords: Share Teams Share-to-Teams
---
# Create a Share-to-Teams button for your website

Third-party websites can use the launcher script to embed Share to Teams buttons on their webpages. When you select, it launches the Share to Teams experience in a pop-up window. This allows you to share a link directly to any person or Microsoft Teams channel without switching context.

> [!NOTE]
> * Only the desktop versions of Edge and Chrome are supported.
> * Use of Freemium or guest accounts is not supported.
The the following image displays the Share to Teams pop-up experience:

![Share to Teams popup](~/assets/images/share-to-teams-popup.png)

## Embed a Share to Teams button

To embed a Share to Teams button, you must follow the following process:

* Add the `launcher.js` script on your webpage.

```html
<script async defer src="https://teams.microsoft.com/share/launcher.js"></script>
```

* Add a HTML element on your webpage with the `teams-share-button` class attribute and the link to share in the `data-href` attribute.

```html
<div
  class="teams-share-button"
  data-href="https://<link-to-be-shared>">
</div>
```

After completing this, the Microsoft Teams icon gets added to your website.

![Share to Teams icon](~/assets/icons/share-to-teams-icon.png)

Alternatively, if you want a different icon size for the Share to Teams button, use the `data-icon-px-size` attribute.

```html
<div
  class="teams-share-button"
  data-href="https://<link-to-be-shared>"
  data-icon-px-size="64">
</div>
```
If the shared link requires user authentication, 
If you know that the URL preview from your link to be shared does not render well in Teams (for example the link would require user authentication) you can disable the URL preview by adding the `data-preview` attribute set to `false`.

```html
<div
  class="teams-share-button"
  data-href="https://<link-to-be-shared>"
  data-preview="false">
</div>
```

If your page dynamically renders content, you can use the the `shareToMicrosoftTeams.renderButtons()` method to force the **Share** button to render at the appropriate place in the pipeline.

## Craft your website preview

When your website is shared to Teams, the card that is inserted into the selected channel contains a preview of your website. You can control the behavior of this preview by ensuring the appropriate meta-data is added to the website being shared, such as the `data-href` URL.  

**To display the preview**

* You must include either a **Thumbnail image**, or both a **Title** and **Description**. For best results, include all three.
* The shared URL being doesnot require authentication. If it requires authentication, you can share it, but the preview is not created.

The following table outlines the necessary tags:

|Value|Meta tag| Open Graph|
|----|----|----|
|Title|`<meta name="title" content="Example Page Title">`|`<meta property="og:title" content="Example Page Title">`|
|Description|`<meta name="description" content="Example Page Description">`|`<meta property="og:description" content="Example Page Description">`|
|Thumbnail Image| none |`<meta property="og:image" content="http://example.com/image.jpg">`|

You can use either the html default versions, or the Open Graph version.

## Share to Teams for Education

For teachers using the Share to Teams button there is an additional option to `Create an Assignment`. This enables you to quickly create an assignment in the chosen Team, based on the shared link.

![Share to Teams popup](~/assets/images/share-to-teams-popup-edu.png)

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

### Set default form values

You can choose to set default values for the following fields on the Share to Teams form:

* Say something about this: `msgText`
* Assignment Instructions: `assignInstr`
* Assignment Title: `assignTitle`

#### Example

 Default form values are given in the following example:

```html
<span
    class="teams-share-button"
    data-href="https://www.microsoft.com/education/products/teams"
    data-msg-text="Default Message"
    data-assign-title="Default Assignment Title"
    data-assign-instr="Default Assignment Instructions"
></span>
```
