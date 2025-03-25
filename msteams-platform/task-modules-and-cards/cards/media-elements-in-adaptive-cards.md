---
title: Add Audio/Video Clips in Adaptive Cards
author: surbhigupta12
description: Learn how the media files are added and supported in the Adaptive Card, and support consumption directly within Teams Adaptive Card.
ms.localizationpriority: high
ms.topic: reference
ms.date: 02/26/2025
---

# Media elements in Adaptive Card

> [!IMPORTANT]
>
> This documentation is considered legacy. For comprehensive information and resources related to media in Adaptive Cards, visit the [Adaptive Cards documentation hub](https://adaptivecards.microsoft.com/?topic=Media).
>
> :::image type="content" source="../../assets/images/adaptive-cards/new-adaptive-card-hub.png" alt-text="Screenshot shows the home page of the Microsoft Adaptive Cards website.":::
>
> The Adaptive Cards documentation hub offers complete and latest reference documentation, an updated Adaptive Card Designer, built-in JSON examples, design best practices, and a detailed release history of Adaptive Card features. For more information, see [introducing the Adaptive Cards documentation hub and new Adaptive Cards updates](https://devblogs.microsoft.com/microsoft365dev/introducing-the-adaptive-cards-documentation-hub-and-new-adaptive-cards-updates/#:~:text=Explore%20the%20latest%20adaptive%20card%20features%20and%20samples,productivity%E2%80%94all%20seamlessly%20integrated%20into%20your%20users%E2%80%99%20daily%20workflows.).

Adaptive Card media element is a component that is used to embed audio and video files directly into your Adaptive Card. Media elements enhance the user experience by making the cards more interactive and engaging. Your app users can view and play media files directly within Adaptive Cards in Teams. Here are few benefits about media elements in Adaptive Card:

* ***Enhanced engagement***: Adding media elements makes the cards more effective and can capture app users attention more effectively.

* ***Improved Communication***: Media elements can convey information more effectively with rich posters than text alone.

* ***Versatility***: Media elements can be used in various scenarios, such as tutorials, announcements, or feedback requests.

You can add the media files available in OneDrive, SharePoint, YouTube, Dailymotion, or Vimeo to your Adaptive Card.

The following image shows the media element in Adaptive Card:

# [Desktop](#tab/desktop)

:::image type="content" source="../../assets/images/media-elements-in-adaptive-cards/desktop-media.png" alt-text="Screenshot shows you the media elements in desktop." lightbox="../../assets/images/media-elements-in-adaptive-cards/desktop-media.png":::

# [Mobile](#tab/mobile)

:::image type="content" source="../../assets/images/media-elements-in-adaptive-cards/mobile-media.png" alt-text="Screenshot shows you the media elements in mobile." lightbox="../../assets/images/media-elements-in-adaptive-cards/mobile-media.png":::

---

## Add media elements to your Adaptive Card

Add media files into an existing or new Adaptive Card either through [Developer Portal for Teams](https://dev.teams.microsoft.com/cards) or [Adaptive Card Designer](https://adaptivecards.microsoft.com/designer.html). To incorporate media files into your Adaptive Card, follow these steps:

# [Developer Portal for Teams](#tab/developer-portal-for-teams)

1. Go to [Developer Portal for Teams](https://dev.teams.microsoft.com/cards).

1. Select an existing card from the previously created Adaptive Cards list, or create a new Adaptive Card. To create a new card, select **+New card**, enter the card's name, and select **Save**.

1. From the left pane, under **Elements**, select **Media**, and add it to your Adaptive Card.

   :::image type="content" source="../../assets/images/media-elements-in-adaptive-cards/media-element-in-ac.png" alt-text="Screenshot shows you the Adaptive Card with media elements.":::

1. Under **CARD STRUCTURE**, select **Media**. The **ELEMENT PROPERTIES** window appears.

1. In **ELEMENT PROPERTIES**, update the following fields:

   * Under the **Sources** section, enter your media file URL in the **URL**.</br> <details><summary>Get media URL for OneDrive or SharePoint</summary>As Adaptive Card doesn't support media file URLs copied from the address bar of OneDrive or SharePoint, you must get a media URL. For SharePoint or OneDrive media files, ensure app users have access to the media files available in SharePoint or OneDrive. To get URL for your media files in OneDrive or SharePoint, follow the steps:

     1. Upload your media files to OneDrive or SharePoint.

     1. Get a URL using the **Share**, **Copy link**, or **Copy link at current time** options from OneDrive or SharePoint.

        :::image type="content" source="../../assets/images/media-elements-in-adaptive-cards/share-link.png" alt-text="Screenshot shows you from where you can copy a link.":::

        You can also create a URL for a DriveItem. For more information, see [DriveItem](/graph/api/driveitem-createlink).

    </details>

   * Under the **Media** section, enter image URL in the **Poster URL**. For more information, see [Adaptive Cards media](https://adaptivecards.microsoft.com/?topic=Media).

     :::image type="content" source="../../assets/images/media-elements-in-adaptive-cards/media-element-ac.png" alt-text="Screenshot shows you the Adaptive Card schema with media elements."lightbox="../../assets/images/media-elements-in-adaptive-cards/media-element-ac.png":::

1. Select **Save** and then select **Send me this card**.

   :::image type="content" source="../../assets/images/media-elements-in-adaptive-cards/media-element-ac-save.png" alt-text="Screenshot shows you how to save your Adaptive card and send it to your Teams" lightbox="../../assets/images/media-elements-in-adaptive-cards/media-element-ac-save.png":::

   Your Adaptive Card with media file is successfully saved and sent to your Teams chat. The following is an example of media file in your Adaptive Card:

   :::image type="content" source="../../assets/images/media-elements-in-adaptive-cards/adaptive-card-teams.png" alt-text="Screenshot shows you the adaptive card with media files in Teams chat.":::

# [Adaptive Card Designer](#tab/adaptive-card-designer)

1. Go to [Adaptive Card Designer](https://adaptivecards.microsoft.com/designer.html).

1. Select an existing card or create a new Adaptive Card:
    * To select an existing card, paste the existing card's JSON payload in the **CARD PAYLOAD EDITOR**.
    * To create a new card, select **New card** and select one of the following:
        * Select a card template
        * **Empty card**

1. From the left pane, under **Elements**, select **Media**, and add it to your Adaptive Card.

   :::image type="content" source="../../assets/images/media-elements-in-adaptive-cards/media-element-in-ac.png" alt-text="Screenshot shows you the Adaptive Card with media elements." lightbox="../../assets/images/media-elements-in-adaptive-cards/media-element-in-ac.png":::

1. Under **CARD STRUCTURE**, select **Media**. The **ELEMENT PROPERTIES** window appears.

1. In **ELEMENT PROPERTIES**, update the following fields:

   * Under the **Sources** section, select **mediaAddNewSource** and enter your media file URL in the **url**. </br> <details><summary>Get media URL for OneDrive or SharePoint</summary>As Adaptive Card doesn't support media file URLs copied from the address bar of OneDrive or SharePoint, you must get a media URL. For SharePoint or OneDrive media files, ensure app users have access to the media files available in SharePoint or OneDrive. To get URL for your media files in OneDrive or SharePoint, follow the steps:

     1. Upload your media files to OneDrive or SharePoint.

     1. Get a URL using the **Share**, **Copy link**, or **Copy link at current time** options from OneDrive or SharePoint.

        :::image type="content" source="../../assets/images/media-elements-in-adaptive-cards/share-link.png" alt-text="Screenshot shows you from where you can copy a link.":::

        You can also create a URL for a DriveItem. For more information, see [DriveItem](/graph/api/driveitem-createlink).

    </details>

   * Under the **Media** section, enter image URL in the **Poster URL**. For more information, see [Adaptive Cards media](https://adaptivecards.microsoft.com/?topic=Media).

     :::image type="content" source="../../assets/images/media-elements-in-adaptive-cards/media-element-ac.png" alt-text="Screenshot shows you the Adaptive Card schema with media elements."lightbox="../../assets/images/media-elements-in-adaptive-cards/media-element-ac.png":::

   The following is an example of media file in your Adaptive Card:

   :::image type="content" source="../../assets/images/media-elements-in-adaptive-cards/adaptive-card-teams.png" alt-text="Screenshot shows you the adaptive card with media files in Teams chat." lightbox="../../assets/images/media-elements-in-adaptive-cards/adaptive-card-teams.png":::

---

The following code shows an example of an Adaptive Card payload with media elements:

```json
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json", 
  "type": "AdaptiveCard", 
  "version": "1.6", 
  "fallbackText": "This card requires CaptionSource to be viewed. Ask your platform to update to Adaptive Cards v1.6 for this and more!", 
  "body": [
    {
      "type": "TextBlock",
      "text": "YouTube video",
      "wrap": true
    },
    { 
      "type": "Media",
      "poster": "https://adaptivecards.microsoft.com/images/adaptivecards1.jpeg",
      "sources": [
        {
          "mimeType": "video/mp4",
          "url": "https://www.youtube.com/watch?v=S7xTBa93TX8"
        }
      ]
    },
    {
      "type": "TextBlock",
      "text": "Vimeo video",
      "wrap": true
    },
    {
      "type": "Media",
      "poster": "https://adaptivecards.microsoft.com/images/adaptivecards1.jpeg",
      "sources": [
        {
          "mimeType": "video/mp4",
          "url": "https://vimeo.com/508683403"
        }
      ]
    },
    {
      "type": "TextBlock",
      "text": "Dailymotion video",
      "wrap": true
    },
    {
      "type": "Media",
      "poster": "https://adaptivecards.microsoft.com/images/adaptivecards1.jpeg",
      "sources": [
        {
          "mimeType": "video/mp4",
          "url": "https://www.dailymotion.com/video/x8wi5ho"
        }
      ]
    }
  ]
}

```

| Property | Description |
| --- | --- |
| `type` | Must be `Media` to add media files.|
| `poster` | The URL of an image displayed before the media plays. Supports data URI in version 1.2+.</br> If you omit the poster, the `media` element either uses a default poster (controlled by the host application) or attempts to automatically pull the poster from the target video service when the source URL points to a video from the host site, such as YouTube. `poster` URL is supported only for Teams mobile clients.|
| `sources.url`| The URL to a media file. Supports data URI in version 1.2+. |
| `sources.mimeType`| Mime type of associated media, such as `video/mp4`. `mimeType` is a required field for Teams web and desktop clients.|

For more information, see [Adaptive Cards `media`](https://adaptivecards.microsoft.com/?topic=Media).

## Limitations

For Teams desktop clients, Adaptive Card supports inline and full screen playback, whereas for mobile clients, the experience is limited to full screen and picture-in-picture (PiP), which allows you to watch video in floating window when you open the other apps.

## Code samples

|Sample name| Description|.NET|Node.js|
|-------|------------------|-----|
| Media elements in Adaptive Card | This sample shows how you can send Adaptive Cards with media files. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-all-cards/csharp)|NA|
|Bot Formatting|This sample demonstrates YouTube, Vimeo, and Dailymotion videos in Adaptive Cards.| [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-formatting-cards/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-formatting-cards/nodejs) |

## See also

* [Adaptive Cards](cards-reference.md#adaptive-card)
* [People Picker in Adaptive Cards](people-picker.md)
* [Typeahead search in Adaptive Cards](dynamic-search.md)
