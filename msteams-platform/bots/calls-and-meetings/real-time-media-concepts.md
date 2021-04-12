---
title: Real-time media calls and online meetings with Microsoft Teams
description: Understand key concepts in building bot that can conduct real-time audio and video calls and online meetings.
ms.topic: conceptual
keywords: audio stream video stream audio/video calling meeting real-time media application-hosted media service-hosted media
---

# Real-time media calls and meetings with Microsoft Teams

The Real-time Media Platform enables bots to interact with Microsoft Teams calls and meetings using real-time voice, video, and screen sharing. This is an advanced capability which allows the bot to send and receive voice and video content *frame by frame*. The bot has "raw" access to the voice, video, and screen sharing media streams. (Bots which process media themselves are called _application-hosted media_ bots, as opposed to simpler _service-hosted media_ bots that rely on the Real-time Media platform for all media processing.)

For example, in a 1:1 call with a bot, as the user speaks, the bot will receive 50 audio frames per second, with each frame containing 20 milliseconds (ms) of audio. An application-hosted media bot can perform real-time speech recognition as the audio frames are received, rather than having to wait for a recording after the user has stopped speaking. The bot can also send and receive high-definition-resolution video, including video-based screen sharing content.

The platform provides a simple socket-like API for the bot to send and receive media, and handles the real-time encoding and decoding of audio/video packets using codecs such as SILK and G.722 for audio and H.264 for video. The platform also handles all media packet encryption/decryption and packet network transmission automatically, so the bot just needs to concern itself with the actual audio/video content. A real-time media bot may participate in 1:1 calls as well as meetings with multiple participants.

This article introduces key concepts related to building a bot that can conduct real-time audio/video calls with Microsoft Teams.

## Media session

When a real-time media bot answers an incoming call or joins a Microsoft Teams meeting, it must declare what modalities it intends to support. For each supported modality, the bot declares whether it can send and receive media, receive only, or send only. For example, a bot designed to handle 1:1 Teams calls may wish to both send and receive audio, but only *send* video (as it does not need to receive the video of the caller). The set of audio and video modalities established between the bot and the Teams caller or meeting is called the **media session**.

Two types of video modalities are supported: **main video** and **video-based screen sharing**. Main video is used to transport the video from a user's webcam. Video-based screen sharing allows a user to share his or her screen as a video stream. The platform allows a bot to send and/or receive *both* video types.

When joined to a Teams meeting, a bot can receive multiple main video streams simultaneously — up to 10 per media session. This allows the bot to "see" more than one participant in the meeting.

## Frames and frame rate

A real-time media bot interacts directly with the audio and video modalities of a media session. This means the bot is sending and/or receiving media as a sequence of **frames**, where each frame represents a unit of content. One second of audio may be transmitted as a sequence of 50 frames, with each frame containing 20 milliseconds (ms) —1/50th of a second — of speech content. One second worth of video may be sliced as a sequence of 30 still images, each intended to be viewed for just 33.3ms — 1/30th of a second — before the next video frame is displayed. The number of frames transmitted or rendered per second is called the **frame rate**. "30fps" indicates 30 frames per second.

## Audio format

Each second of audio is represented as 16,000 **samples**, with each sample containing 16-bits of data. A 20ms audio frame contains 320 samples (640 bytes of data).

## Video format

There are several formats supported for video. Two key properties of a video format are its **frame size** and **color format**. Supported frame sizes include 640x360 ("360p"), 1280x720 ("720p"), and 1920x1080 ("1080p"). Supported color formats include NV12 (12 bits per pixel) and RGB24 (24 bits per pixel).

A "720p" video frame contains 921,600 pixels (1280 times 720). In the RGB24 color format, each pixel is represented as 3 bytes (24-bits) comprised of one byte each of red, green, and blue color components. Therefore, a single 720p RGB24 video frame requires 2,764,800 bytes of data (921,600 pixels times 3 bytes/pixel). At a frame rate of 30fps, sending 720p RGB24 video frames means processing approximately 80 MB/s of content (which is substantially compressed by the H.264 video codec before network transmission).

An advanced capability of the platform allows a bot to send/receive video as **encoded** H.264 frames. This supports bots which provide their own H.264 encoder/decoder, or do not need the video stream decoded into raw RGB24 or NV12 bitmaps.

## Active and dominant speakers

When joined to a Teams meeting consisting of multiple participants, a bot can identify which meeting participants are currently speaking. **Active speakers** identify which participants are being heard in each received audio frame. **Dominant speakers** identify which participants are currently most active (or "dominant") in the group conversation, even though their voice may not be heard in every audio frame. The set of dominant speakers can change as different participants take turns speaking.

## Video subscription

In a 1:1 call, the bot will automatically receive the video of the caller if the bot is enabled to receive video. In a Teams meeting, the bot must indicate to the platform which participants it wants to see. A **video subscription** is a request by the bot to receive a participant’s main video or screen-sharing content. As the participants in the meeting conduct their conversation, the bot may modify its desired video subscriptions based on updates of the dominant speaker set or notifications indicating which participant is currently screen sharing.

## Developer resources

To develop an application-hosted media bot, you must install the following NuGet package within your Visual Studio project:

- [Microsoft.Graph.Calls.Media .NET library](https://www.nuget.org/packages/Microsoft.Graph.Communications.Calls.Media/)

Application-hosted media bots require .NET/C# and Windows Server, as described in detail in [Requirements and considerations for application-hosted media bots](requirements-considerations-application-hosted-media-bots.md#application-hosted-media-bot-development-requires-cnet-and-windows-server).
