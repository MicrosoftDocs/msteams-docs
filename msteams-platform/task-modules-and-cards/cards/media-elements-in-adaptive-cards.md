---
title: Media Elements in Adaptive Cards
description: Learn how the Media Elements are supported in the Adaptive Cards SDK and support consumption directly within Microsoft Teams Adaptive Cards.
ms.localizationpriority: high
ms.topic: reference
---

# Overview

Media elements, for example, audio or video clips are supported in the Adaptive Cards SDK but not in Teams. This was originally de-scoped when moving Teams to Adaptive Cards v1.2 but we are looking to address now. There's no media support in Teams cards today (since we also don't support the audio or video or animation cards from Bot Framework), so there's no workaround. This will drive parity with the SDK (which already supports media elements) and would increase engagement with cards and bring new experiences to them.

## User problems

There's a need to embed Media Elements in Adaptive Cards within the Teams experience. Partners that have shared this requirement include Accenture, Workday, Chata.ai, Inditex, ServiceNow, Blinkist.

Today, users are forced to exit Teams to view media. This feature supports consumption of Media Elements directly within Teams Adaptive Cards. Following are the example scenarios:

### User sent scenarios

**Video** User Alice has found a relevant informational video on her company OneDrive Sharepoint instance. She uses the OneDrive Media Elements to unfurl the copied link and sends an Adaptive Card to Bob with the video. The corresponding card has the relevant video embedded in the card. The video is rendered directly within a native Teams media player in the card, allowing Bob to directly view the video within the Teams experience. He can pause, play, change volume, and seek through the video as needed. He is also able to view the video in an expanded full-screen mode.  

**Audio** Nurse Carol locates an audio file with the daily memo on her company OneDrive Sharepoint instance. She sends the link to the audio memo to her team via chat, that unfurls into an Adaptive Card using the OneDrive Sharepoint App in the compose box. The corresponding card has an embedded audio player that can play the audio file. The audio file can be directly played within the native Teams media player in the card, allowing team members to directly listen to the audio recording within the Teams experience. Nurse David, who is in the group chat, can pause, play, change volume, and seek through the audio file as needed.

### Bot sent scenarios

**Video** Contoso has an onboarding Bot that is deployed on their tenant. Every new member on the tenant is greeted by the Contoso Onboarding Bot (COB) and presented a series of Media Elements Adaptive Cards that outlines the onboarding flow. Bob has joined the team. The onboarding videos are rendered directly within a native Teams media player in the card, allowing Bob to directly view the video within the Teams experience. He can pause, play, change volume, and seek through the video as needed. He is also able to view the video in an expanded full-screen mode.

**Audio** Contoso Medical has a scrum Bot that is deployed on their tenant. The Bot automatically takes the audio recording of the daily scrum meeting and sends it to the wider Medical Team channel. The audio recording is presented as an Adaptive Card, that allows everyone in the Team channel to pause, play, change volume, and seek through the audio file as needed.

## Phases

### Phase 1: Support LOB scenarios

For the MVP of the Media Elements feature, three scenarios are supported primarily for in-line media playback for both user-sent and bot-sent:

* Files of a supported type available externally via any publicly available URL that is sanitized.
* Video or audio is linked via a URL that points to a supported video or audio file.
* Inline YouTube video playback through Adaptive Cards SDK v1.6.
* Files directly uploaded to OneDrive Sharepoint within the tenant.
* Video or audio is shared from OneDrive Sharepoint.

### Phase 2: Support third party partner scenarios

Following are the dynamic user-uploaded scenarios where users submit video or audio files:

* Files directly uploaded to OneDrive Sharepoint external to the tenant (potential permission issues).
* Files on third party external players. For example, Vimeo, Dailymotion, Spotify, Netflix, etc.
* Files hidden behind external SSO or authentication. For example, Google Drive, Dropbox, etc.
* Inline Vimeo and Dailymotion playback and other media providers.

> [!NOTE]
> On desktop or web, support for Dailymotion and Vimeo should not induce any cost beyond supporting YouTube, as all three providers are supported out of the box in the latest Adaptive Cards JavaScript SDK.
> For that reason, while Vimeo and Dailymotion are in the “phase 2” bucket, it seems to make sense to promote them to “phase 1”.

## Out of scope considerations

1. Phase 1 doesn't support specific third party media players, for example, Vimeo. Following is the fallback:

    * Desktop links externally via browser.
    * Mobile deep-links into the native app (potentially through browser).

1. Teams is not responsible for content moderation.

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

Playing YouTube videos inline in any app requires the use of the YouTube embedded player, that relies on an IFrame. In other words, it is not possible to implement a custom inline player for YouTube videos and the same applies to Vimeo, Dailymotion and more. For that reason, there is no need to come up with a video player design when it comes to YouTube; the only design we can implement is that provided by YouTube, which does not allow for look and feel customization.

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

Initially, as depicted above, only the poster of the video is displayed. For YouTube, the poster (or thumbnail) is automatically pulled from YouTube, but the card author can technically provide their own poster by explicitly specifying the Media.poster property.

Once the user clicks the central “Play” button, the actual player is instantiated, and video playback starts:

:::image type="content" source="~/assets/images/media-elements-in-adaptive-cards/inline-youtube-video-player-demo-telegraph-road.png" alt-text="Inline youtube video player demo":::

## Dev design

[TODO: Need to add link to Dev Design Doc when it is ready]

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

