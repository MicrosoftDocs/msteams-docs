---
title: Media Elements in Adaptive Cards
description: Learn how the Media Elements are supported in the Adaptive Cards SDK and support consumption directly within Microsoft Teams Adaptive Cards.
ms.localizationpriority: high
ms.topic: reference
---

# Overview

The Media Elements such as audio or video clips are supported in the Adaptive Cards SDK but not in Teams. Currently, Teams doesn't provide media support and similarly doesn't support audio or video or animation cards from Bot Framework and there is no workaround. However, efforts are done to drive parity with SDK, that already supports media elements so that it will increase engagement with cards and bring new experiences in the media elements.

The Media Elements feature now supports consumption of media elements directly within Teams Adaptive Cards without force exit from Teams to view media. Following are the example scenarios:

### User scenarios

**Video**: User Alice has found a relevant informational video on her company OneDrive Sharepoint. She uses the OneDrive Media Elements to unfurl the copied link to send an Adaptive Card to Bob with the video. As the corresponding card has the relevant video embedded in the card, the video is rendered directly within a native Teams media player in the card, thereby allowing Bob to directly have the experience to view the video within the Teams. Bob can now pause, play, change volume, and seek through the video as needed. He is also able to view the video in an expanded full-screen mode.  

**Audio**: Nurse Carol locates an audio file with the daily memo on her company OneDrive Sharepoint. She sends the link to the audio memo to her team via chat, that unfurls into an Adaptive Card using the OneDrive Sharepoint App in the compose box. The corresponding card has an embedded audio player that can play the audio file directly within the native Teams media player in the card, there by allowing the team members to experience listening to the audio recording within the Teams. Nurse David, who is in the group chat, can pause, play, change volume, and seek through the audio file as needed.

### Bot scenarios

**Video**: Contoso has an onboarding Bot that is deployed on their tenant. Every new member on the tenant is greeted by the Contoso Onboarding Bot (COB) and it presents a series of Media Elements Adaptive Cards that outlines the onboarding flow. Bob has joined the team and the onboarding videos are rendered directly within a native Teams media player in the card thereby, allowing Bob to directly view the video within the Teams. Bob can pause, play, change volume, and seek through the video as needed. He is also able to view the video in an expanded full-screen mode.

**Audio**: Contoso Medical has a scrum Bot that is deployed on their tenant. The Bot automatically takes the audio recording of the daily scrum meeting and sends it to the wider Medical Team channel. The audio recording is presented as an Adaptive Card, that allows everyone in the Team channel to pause, play, change volume, and seek through the audio file as needed.

## Phases

### Phase 1: Support LOB scenarios

For the MVP of the media elements feature, the following three scenarios are supported primarily for the in-line media playback for both user-sent and bot-sent:

* Files of a supported type are available externally via any publicly available URLs directly linking to a media file. Video or audio is linked via a URL that points to a supported video or audio file.
* Inline YouTube video playback through an embedded YouTube player (Adaptive Cards SDK v1.6). This experience looks different from the rest of the media elements that leverage one player.
* Files are directly uploaded to OneDrive Sharepoint and are accessible within the tenant. Video or audio is shared from OneDrive Sharepoint and Adaptive Card would be able to play that file through player.

### Phase 2: Support third party partner scenarios

To improve the ability to deal with media files, following are the dynamic user-uploaded scenarios where users upload video or audio files within OneDrive, SharePoint in other tenants and be able to link to them:

* Files are directly uploaded to OneDrive Sharepoint external to the tenant (potential permission issues).
* Files on third party external players such as Vimeo, Dailymotion, Spotify, Netflix, etc.
* Files hidden behind external SSO or authentication. For example, Google Drive, Dropbox, etc.
* Inline Vimeo and Dailymotion playback and other media providers.

> [!NOTE]
> On desktop or web, support for Dailymotion and Vimeo should not induce any cost beyond supporting YouTube, as all three providers are supported out of the box in the latest Adaptive Cards JavaScript SDK.
> Currently Vimeo and Dailymotion are in the “phase 2” bucket, and there are plans to promote them to “phase 1”.

**Media Elements-Video (Channel)**:

:::image type="content" source="~/assets/images/media-elements-in-adaptive-cards/design-video-channel.png" alt-text="Video channel design":::

**Media Elements-Video (Chat)**:

:::image type="content" source="~/assets/images/media-elements-in-adaptive-cards/video-chat.png" alt-text="Video chat design":::

**Media Elements-Video (Narrow card in meeting)**:

:::image type="content" source="~/assets/images/media-elements-in-adaptive-cards/video-narrow-card-in-meeting.png" alt-text="Video narrow card in meeting design":::

**Media Elements-Video (Mobile card in channel)**:

:::image type="content" source="~/assets/images/media-elements-in-adaptive-cards/video-mobile-card-in-channel.png" alt-text="Video Mobile card in channel":::

**Media Elements-Audio (Channel)**:

:::image type="content" source="~/assets/images/media-elements-in-adaptive-cards/audio-channel.png" alt-text="Audio channel":::

**Media Elements-Audio (Chat)**:

:::image type="content" source="~/assets/images/media-elements-in-adaptive-cards/audio-chat.png" alt-text="Audio chat":::

**Media Elements-Audio (Mobile)**:

:::image type="content" source="~/assets/images/media-elements-in-adaptive-cards/audio-mobile.png" alt-text="Audio mobile":::

**Unsupported media error state**:

:::image type="content" source="~/assets/images/media-elements-in-adaptive-cards/unsupported-media-error-state.png" alt-text="Unsupported Media error state":::

## Inline YouTube playback

Playing YouTube videos inline in any app requires the use of the YouTube embedded player, that relies on an IFrame. So, it is not possible to implement a custom inline player for YouTube videos or Vimeo, Dailymotion and more. For that reason, there is no necessity to come up with a video player design when it comes to YouTube; the only design we can implement is provided by YouTube, which doesn't allow for look and feel customization.

YouTube, Vimeo and Dailymotion playback are implemented in the latest version of the Adaptive Cards JavaScript SDK (schema 1.6)(not released). It relies on the existing Adaptive Card Media element. Following is an example of a card embedding a YouTube video:

### Example

``` json
{
    "type": "AdaptiveCard",
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.6",
    "body": [
        {
            "type": "TextBlock",
            "text": "Inline YouTube video player demo",
            "wrap": true,
            "size": "Large",
            "weight": "Bolder"
        },
        {
            "type": "Media",
            "sources": [
                {
                    "url": "https://www.youtube.com/watch?v=YsqcODOEO-M&ab_channel=DavidClaux"
                }
            ]
        }
    ]
}
```

The above card renders as follows:

:::image type="content" source="~/assets/images/media-elements-in-adaptive-cards/inline-youtube-video-player-demo.png" alt-text="Inline youtube video player":::

Initially, as depicted above, only the poster of the video is displayed. For YouTube, the poster (or thumbnail) is automatically pulled from YouTube, but the card author can technically provide their own poster to explicitly specify the Media.poster property.

Once the user clicks the central **Play** button, the actual player is instantiated, and video playback starts:

:::image type="content" source="~/assets/images/media-elements-in-adaptive-cards/inline-youtube-video-player-demo-telegraph-road.png" alt-text="Inline youtube video player demo":::

## Dev design

[TODO: Need to add link to Dev Design Doc when it is ready]

``` json
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.5",
  "body": [
      {
      // Video Media on ODSP
      "type": "Media",
      "poster": "https://adaptivecards.io/content/poster-video.png",
      "altText": "Adaptive Cards overview video",
      "sources": [{
        "mimeType": "video/mp4",
        "url": "https://microsoft-my.sharepoint-df.com/personal/stkong_microsoft_com/_layouts/15/stream.aspx?id=%VideoRecording.mp4 "
      }]
      },
      {
      // Video Media
      "type": "Media",
      "poster": "https://adaptivecards.io/content/poster-video.png",
      "altText": "Adaptive Cards overview video",
      "sources": [{
        "mimeType": "video/mp4",
        "url": "https://adaptivecardsblob.blob.core.windows.net/assets/AdaptiveCardsOverviewVideo.mp4"
      }]
      },
      {
      // Audio Media
      "type": "Media",
      "poster": "https://adaptivecards.io/content/poster-audio.jpg",
      "altText": "Adaptive Cards overview audio",
      "sources": [{
        "mimeType": "audio/mpeg",
        "url": "https://adaptivecardsblob.blob.core.windows.net/assets/AdaptiveCardsOverviewVideo.mp3"
      }]
    }
  ]
}
```

## Limitations

(Limitations will be shared later after categorizing by Dev design team)
Following are the limitations:

1. The MIME type, that is able to support certain file types and using the MIME type.
1. Size limitation.
