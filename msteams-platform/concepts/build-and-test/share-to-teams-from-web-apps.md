---
title: Share to Teams from web apps
description: Learn to add the Share to Teams embedded button on your website, with a website preview, using Code samples 
ms.topic: reference
ms.localizationpriority: medium
ms.date: 07/22/2022
---

# Share to Teams from web apps

Third-party websites can use the launcher script to embed Share to Teams buttons on their webpages. When you select Share to Teams button, it launches the Share to Teams experience in a pop-up window. This allows you to share a link directly to any person or Microsoft Teams channel without switching the context.

The following image displays the pop-up window for Share to Teams preview experience:

:::image type="content" source="~/assets/images/share-to-teams-popup.png" alt-text="Share-to-Teams pop-up":::

> [!NOTE]
>
> * Only the desktop versions of Microsoft&nbsp;Edge and Google Chrome are supported.
> * Use of Freemium or guest accounts is not supported.

You can also add link unfurling for the links shared through Share to Teams button hosted in web app, personal app or tab. For more information, see [link unfurling](~/messaging-extensions/how-to/link-unfurling.md).

The following image displays the link unfurling experience through Share to Teams button:

:::image type="content" source="~/assets/images/share-to-teams-link-unfurling.png" alt-text="Share-to-Teams link unfurling":::

This article guides you on how to create and embed a Share to Teams button for your website, craft your website preview, and extend Share to Teams for Education.

See the following video to learn how to embed Share to Teams button:
<br>
> [!VIDEO https://www.microsoft.com/en-us/videoplayer/embed/RE4vhWH]
<br>

## Embed a Share to Teams button

1. Add the `launcher.js` script on your webpage.

    ```html
    <script async defer src="https://teams.microsoft.com/share/launcher.js"></script>
    ```

1. Add an HTML element on your webpage with the `teams-share-button` class attribute and the link to share in the `data-href` attribute.

    ```html
    <div
      class="teams-share-button"
      data-href="https://<link-to-be-shared>">
    </div>
    ```

    After completing this, the Teams icon gets added to your website. The following image shows the Share to Teams icon:

    :::image type="content" source="~/assets/icons/share-to-teams-icon.png" alt-text="Share to Teams icon":::

1. Alternatively, if you want a different icon size for the Share to Teams button, use the `data-icon-px-size` attribute.

    ```html
    <div
      class="teams-share-button"
      data-href="https://<link-to-be-shared>"
      data-icon-px-size="64">
    </div>
    ```

1. If the shared link requires user authentication, and the URL preview from your link to be shared doesn't render well in Teams, then you can disable the URL preview by adding the `data-preview` attribute set to `false`.

    ```html
    <div
      class="teams-share-button"
      data-href="https://<link-to-be-shared>"
      data-preview="false">
    </div>
    ```

1. To display a message of your choice in compose box, you can define your text in `data-msg-text` attribute.

     ```html
     <div
      class="teams-share-button"
      data-href="https://<link-to-be-shared>"
      data-msg-text="<default-message-to-be-populated-in-compose-box>"
      data-preview="false">
      </div>
     ```

1. If your page dynamically renders content, you can use the `shareToMicrosoftTeams.renderButtons()` method to force **Share** to render at the appropriate place in the pipeline.

## Craft your website preview

When your website is shared to Teams, the card that is inserted into the selected channel contains a preview of your website. You can control the behavior of this preview by ensuring the appropriate meta-data is added to the website being shared, such as the `data-href` URL.  

To display the preview:

* You must include either a **Thumbnail image**, or both a **Title** and **Description**. For best results, include all three.
* The shared URL doesn't require authentication. If it requires authentication, you can share it, but the preview isn't created.

The following table outlines the necessary tags:

|Value|Meta tag| Open Graph|
|----|----|----|
|Title|`<meta name="title" content="Example Page Title">`|`<meta property="og:title" content="Example Page Title">`|
|Description|`<meta name="description" content="Example Page Description">`|`<meta property="og:description" content="Example Page Description">`|
|Thumbnail Image| none. |`<meta property="og:image" content="http://example.com/image.jpg">`|

You can use either the HTML default versions or the Open Graph version.

## Share to Teams for Education

For teachers using the Share to Teams button, there's an additional option to `Create an Assignment` that enables you to quickly create an assignment in the chosen Team, based on the shared link. The following image displays Share to Teams for education:

:::image type="content" source="../../assets/images/share-to-teams-popup-edu.png" alt-text="Share to Teams pop-up education":::

## Full launcher.js definition

| Property | HTML attribute | Type | Default | Description |
| -------------- | ---------------------- | --------------------- | ------- | ---------------------------------------------------------------------- |
| href | `data-href` | string | n/a | The href of the content to share. |
| preview | `data-preview` | Boolean (as a string) | `true` | Whether or not to show a preview of the content to share. |
| iconPxSize | `data-icon-px-size` | number (as a string) | `32` | The size in pixels of the Share to Teams button to render. |
| msgText | `data-msg-text` | string | n/a | Default text to be inserted before the link in the message compose box. Maximum number of characters is 200. |
| assignInstr | `data-assign-instr` | string | n/a | Default text to be inserted in the assignments "Instructions" field. Maximum number of characters is 200. |
| assignTitle | `data-assign-title` | string | n/a | Default text to be inserted in the assignments "Title" field. Maximum number of characters is 50. |

### Methods

**`shareToMicrosoftTeams.renderButtons(options)`**

`options` (optional): `{ elements?: HTMLElement[] }`

Currently, all share buttons are rendered on the page. If an optional `options` object is supplied with a list of elements, those elements are rendered into share buttons.

### Set default form values

You can select to set default values for the following fields on the Share to Teams form:

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

## See also

* [Integrate web apps](~/samples/integrate-web-apps-overview.md)
* [Share to Teams from personal app or tab](share-to-teams-from-personal-app-or-tab.md)
