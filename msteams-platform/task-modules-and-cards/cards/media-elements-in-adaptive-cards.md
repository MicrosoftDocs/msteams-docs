---
title: Media Elements in Adaptive Cards
author: v-sdhakshina
description: Learn how the media elements are supported in the Adaptive Cards and support consumption directly within Teams Adaptive Cards.
ms.localizationpriority: high
ms.topic: reference
ms.author: v-sdhakshina
---

# Media elements in Adaptive Cards

Media elements in the Adaptive Cards provides enhanced media experience to the users and increases engagement with the Adaptive Cards. You can add media files such as audio or video clips to your Adaptive Card.

Adaptive Cards plays the video or audio clips by accessing the media files available in OneDrive or SharePoint. You can view the media files within the Adaptive Cards in Teams.

The following screenshot shows you the media elements in your Adaptive Cards:

# [Desktop](#tab/desktop)

:::image type="content" source="../../assets/images/media-elements-in-adaptive-cards/desktop-media.png" alt-text="Screenshot shows you the media elements in desktop.":::

# [Mobile](#tab/mobile)

:::image type="content" source="../../assets/images/media-elements-in-adaptive-cards/mobile-media.png" alt-text="Screenshot shows you the media elements in mobile.":::

---
> [!NOTE]
> For desktop clients, Adaptive cards support inline and full screen playback and for mobile clients, the experience is limited to full screen and picture-in-picture (PiP) (allows you to watch video in floating window when you open the other apps).

## Add media elements to your Adaptive Cards

You can media files to an existing or new Adaptive Card using [Teams Developer Portal](https://dev.teams.microsoft.com/cards) or [Adaptive Card Designer](https://adaptivecards.io/designer). To add media files to your Adaptive Card, follow the steps:

1. Open an existing Adaptive Card or create a new Adaptive Card using [Teams Developer Portal](https://dev.teams.microsoft.com/cards) or [Adaptive Card Designer](https://adaptivecards.io/designer).

1. From the left pane, under **Elements**, select **Media** and add it to your Adaptive Cards.

   :::image type="content" source="../../assets/images/media-elements-in-adaptive-cards/media-elements.jpg" alt-text="Screenshot shows you the Adaptive Cards with media elements.":::

1. Add your media files to OneDrive or SharePoint.

1. [Create a sharing link or url for a DriveItem](/graph/api/driveitem-createlink). You can also get a link or url using the **Share**, **Copy link**, **Copy link at current time** options from OneDrive or SharePoint.

   :::image type="content" source="../../assets/images/media-elements-in-adaptive-cards/share-link.png" alt-text="Screenshot shows you from where you can take a link.":::

1. Under **Custom card structure title**, select **Media**. The **ELEMENT PROPERTIES** window appears.

1. In **ELEMENT PROPERTIES**, update the following fields:

|Field|Value|REquired|
|---|---|---|
|Data content|||
|Only show when|||
|id|||
|Alternate text|||
|Poster URL|||
|Spacing|||
|Horizontal alignment|||
|Height|||
|URL|||
|MIME Type|||

    *Add your media file url in the **URL** of Adaptive Cards media element properties.

    >[!NOTE]
    > Adaptive Cards don't support media file links that are copied directly from the address bar.

1. Add your media file url in the `URL` of Adaptive Cards media element properties.

1. Add image url in the `Poster URL` of Adaptive Cards media element properties. For more information, see [Adaptive Cards media](https://adaptivecards.io/explorer/Media.html).

### Example

The following code shows an example of an Adaptive Cards with media elements:

```json
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.6",
  "fallbackText": "This card requires CaptionSource to be viewed. Ask your platform to update to Adaptive Cards v1.6 for this and more!",
  "body": [
    {
      "type": "Media",
      "poster": "https://adaptivecards.io/content/poster-video.png",
      "sources": [
    {
          "mimeType": "video/mp4",
          "url": "https://adaptivecardsblob.blob.core.windows.net/assets/AdaptiveCardsOverviewVideo.mp4"
    }
      ],
      "captionSources": [
      {
      "mimeType": "vtt",
      "label": "English (vtt)",
      "url": "https://raw.githubusercontent.com/microsoft/AdaptiveCards/5ac07e8adb8d7dcd7480973321e57d279d1f7d2c/assets/ProductVideoSubtitles.vtt"
        },
    {
        "mimeType": "srt",
        "label": "English (srt)",
        "url": "https://raw.githubusercontent.com/microsoft/AdaptiveCards/da2eb4ad4de60d14b37decc062d3952da9dbb790/assets/ProductVideoSubtitles.srt"
        }
      ]
    }
  ]
}

```

Following are the different scenarios:

**Line Of Business (LOB) scenarios**

Video or audio files are directly uploaded to OneDrive or SharePoint and accessible within the tenant and Adaptive Cards plays the file through OnePlayer.

**Third party partner scenarios**

To improve the ability to deal with media files, following are the dynamic user-uploaded scenarios where users upload video or audio files within OneDrive or SharePoint in other tenants and be able to link to them:

* Files are directly uploaded to OneDrive or SharePoint external to the current tenant.
* You can add files that are available in external storage with SSO or authentication. For example, Google Drive, Dropbox, and so on.

## Limitations

* Adaptive Cards supports only the media files from SharePoint or OneDrive.
* Ensure that users have access the media files available in the SharePoint or OneDrive.

## See also

[Adaptive Cards](cards-reference.md#adaptive-card)
