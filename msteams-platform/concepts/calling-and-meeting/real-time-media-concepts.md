---
title: Real-time media calling with Skype | Microsoft Docs
description: Understand key concepts in building a bot that can conduct real-time audio and video calls with Skype, using the Bot Builder SDK for .NET.
keywords: 
ms.date: 12/13/2017
---

# Real-time media calling with Skype

[!INCLUDE [pre-release-label](../includes/pre-release-label-v3.md)]

The Real-Time Media Platform for Bots adds a new dimension to how bots can interact with users by enabling real-time voice, video and screen sharing modalities. This provides the capability to build compelling and interactive entertainment, educational, and assistance bots. Users communicate with real-time media bots using Skype.

This is an advanced capability which allows the bot to send and receive voice and video content *frame by frame*. The bot has "raw" access to the voice, video and screen-sharing real-time modalities. For example, as the user speaks, the bot will receive 50 audio frames per second, with each frame containing 20 milliseconds (ms) of audio. The bot can perform real-time speech recognition as the audio frames are received, rather than having to wait for a recording after the user has stopped speaking. The bot can also send high-definition-resolution video to the user at 30 frames per second, along with audio.

The Real-Time Media Platform for Bots works with the Skype Calling Cloud to take care of call setup and media session establishment, enabling the bot to engage in a voice and (optionally) video conversation with a Skype caller. The platform provides a simple "socket"-like API for the bot to send and receive media, and handles the real-time encoding and decoding of media, using codecs such as SILK for audio and H.264 for video. A real-time media bot may also participate in Skype group video calls with multiple participants.

This article introduces key concepts related to building a bot that can conduct real-time audio and video calls with Skype and provides links to relevant developer resources.

## Media session
When a real-time media bot answers an incoming Skype call, it decides whether to support both audio and video modalities, or just audio. For each supported modality, the bot can either both send and receive media, receive only, or send only. For example, a bot may wish to both send and receive audio, but only send video (as it does not want to receive the video of the Skype caller). The set of audio and video modalities established between the Skype caller and the bot is called the **media session**.

There are two video modalities supported: "main video" and "screen sharing". Main video transmits the video the bot generates, or plays back, to the caller, and transmits the video of the caller (typically from the user’s webcam) to the bot. The screen sharing modality allows the caller to share his or her screen (as a video) with the bot. The bot cannot send screen sharing video to the user.

When joined to a multiparty Skype **group video call**, the real-time media bot can support receiving multiple main video streams simultaneously. This allows the bot to "see" more than one participant in the group video call.

## Frames and frame rate
A real-time media bot interacts directly with the audio and video modalities of a Skype call. This means the bot is sending and/or receiving media as a sequence of **frames**, where each frame represents a unit of content. One second of audio may be transmitted as a sequence of 50 frames, with each frame containing 20 milliseconds (ms) (1/50th of a second) of content. One second worth of video may be sliced as a sequence of 30 still images, each intended to be viewed for just 33ms (1/30th of a second) before the next video frame is displayed. The number of frames transmitted or rendered per second is called the **frame rate**. "30fps" indicates 30 frames per second.

## Audio format
Each second of audio is represented as 16,000 **samples**, with each sample storing 16-bits of data. A 20ms audio frame contains 320 samples (640 bytes of data).

## Video format
There are several formats supported for video. Two key properties of a video format are its **frame size** and **color format**. Supported frame sizes include 640x360 ("360p"), 1280x720 ("720p"), and 1920x1080 ("1080p"). Supported color formats include NV12 (12 bits per pixel) and RGB24 (24 bits per pixel).

A "720p" video frame contains 921,600 pixels (1280 times 720). In the RGB24 color format, each pixel is represented as 3 bytes (24-bits) comprised of one byte each of red, green, and blue color components. Therefore, a single 720p RGB24 video frame requires 2,764,800 bytes of data (921,600 pixels times 3 bytes/pixel). At a frame rate of 30fps, sending 720p RGB24 video frames means processing approximately 80 MB/s of content (which is substantially compressed by the H.264 video codec before network transmission).

## Active and dominant speakers
When joined to a Skype group video call consisting of multiple participants, the bot can identify which participants are currently speaking. **Active speakers** identify which participants are being heard in each received audio frame. **Dominant speakers** identify which participants are currently most active (or "dominant") in the group conversation, even though their voice may not be heard in every audio frame. The set of dominant speakers can change as different participants take turns speaking.

## Video subscription
In a call with a single Skype caller, the bot will automatically receive the video of the caller (if the bot is receive enabled for main video). In a multiparty Skype group video call, the bot must indicate to the real-time media platform which participants it wants to see. A video subscription is a request by the bot to receive a participant’s video. As the participants in a group video call conduct their conversation, a bot may modify its desired video subscriptions based on updates of the dominant speaker set.

## Developer resources 

### SDKs

To develop a real-time media bot, you must install these NuGet packages within your Visual Studio project:

- [Bot Builder SDK for .NET](bot-builder-dotnet-overview.md)
- [Bot Builder Real-Time Media Calling for .NET](https://www.nuget.org/packages?q=Bot.Builder.RealTimeMediaCalling)
- [Microsoft.Skype.Bots.Media .NET library](https://www.nuget.org/packages?q=Microsoft.Skype.Bots.Media)

### Code samples

The [BotBuilder-RealTimeMediaCalling](https://github.com/Microsoft/BotBuilder-RealTimeMediaCalling) GitHub repository contains samples that show how to build real-time media bots for Skype.