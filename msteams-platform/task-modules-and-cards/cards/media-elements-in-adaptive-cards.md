---
title: Media Elements in Adaptive Card
author: v-sdhakshina
description: Learn how the media elements are supported in the Adaptive Card and support consumption directly within Teams Adaptive Card.
ms.localizationpriority: high
ms.topic: reference
ms.author: v-sdhakshina
---

# Media elements in Adaptive Card

The media elements such as audio or video clips are supported in the Adaptive Card, files from OneDrive and SharePoint but not in Teams. Teams don’t provide any media support like audio, video, and animation cards from Bot Framework.

To increase engagement with the Adaptive Card and to provide new experience in the media elements, Teams in parity with the SDK that supports media elements.

Adaptive Card now supports the consumption of the media elements without the force exit from Teams to view media. Following are the scenarios:

**LOB scenarios**

The following data sources are supported primarily for the in-line media playback:

* Video or audio files are linked externally via any publicly available URL that points to a supported media file.
* Video or audio files are directly uploaded to OneDrive or Sharepoint and accessible within the tenant and Adaptive Card plays the file through player.

**Third party partner scenarios**

To improve the ability to deal with media files, following are the dynamic user-uploaded scenarios where users upload video or audio files within OneDrive or SharePoint in other tenants and be able to link to them:

* Files are directly uploaded to OneDrive or SharePoint external to the current tenant.
* Files are hidden behind external SSO or authentication. For example, Google Drive, Dropbox, etc.

The following screenshot shows you the media elements in your Adaptive Card:

# [Desktop](#tab/desktop)

:::image type="content" source="../../assets/images/media-elements-in-adaptive-cards/desktop-media.png" alt-text="Screenshot shows you the media elements in desktop.":::

# [Mobile](#tab/mobile)

:::image type="content" source="../../assets/images/media-elements-in-adaptive-cards/mobile-media.png" alt-text="Screenshot shows you the media elements in mobile.":::

---

## Add media elements to your Adaptive Card

After you created an Adaptive Card using [Teams Developer Portal](https://dev.teams.microsoft.com/cards) or [Adaptive Card Designer](https://adaptivecards.io/designer), you can add any media files to your Adaptive Card as follows:

1. Add media elements to your Adaptive Card json schema.

1. Add your media files to OneDrive or SharePoint.

1. [Create a sharing link or url for a DriveItem](/graph/api/driveitem-createlink) or get a link using the following options from the OneDrive or SharePoint.

   :::image type="content" source="../../assets/images/media-elements-in-adaptive-cards/share-link.png" alt-text="Screenshot shows you from where you can take a link.":::

    >[!NOTE]
    > Adaptive Card don't support media file links that are copied directly from the address bar.

1. Add your media file url in the `url` property of Adaptive Card json file.

1. Add image url in the `poster` property of Adaptive Card json file. For more information, see [Adaptive Card media](https://adaptivecards.io/explorer/Media.html).

    The following code shows an example of an Adaptive Card with media elements:

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

## Limitations

1. Adaptive Card supports only the links from SharePoint or OneDrive.
1. You must inform users or admin before you share a link that they're responsible to ensure that the audience can view the link.

## See also

[Adaptive Card](cards-reference.md#adaptive-card)
