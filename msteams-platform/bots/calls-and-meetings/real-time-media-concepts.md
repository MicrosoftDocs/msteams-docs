---
title: Real-time media calls and online meetings with Microsoft Teams
description: Understand key concepts in building bot that can conduct real-time audio and video calls and online meetings.
keywords: audio stream video stream audio/video calling meeting real-time media application-hosted media service-hosted media
---

# Real-time media calls and meetings with Microsoft Teams

The Real-time Media Platform enables bots to interact with Microsoft Teams calls and meetings using real-time voice, video, and screen sharing. This is an advanced capability which allows the bot to send and receive voice and video content frame by frame. The bot has raw access to the voice, video, and screen sharing media streams. There are simpler service-hosted media bots that rely on the Real-time Media Platform for all media processing. Bots that process media themselves are called application-hosted media bots.

For example, in a 1:1 call with a bot, as the user speaks, the bot receives 50 audio frames per second, with each frame containing 20 milliseconds (ms) of audio. An application-hosted media bot can perform real-time speech recognition as the audio frames are received, rather than having to wait for a recording after the user has stopped speaking. The bot can also send and receive high-definition-resolution video, including video-based screen sharing content.

The platform provides a simple socket-like API for the bot to send and receive media. It handles the real-time encoding and decoding of audio or video packets using codecs such as SILK and G.722 for audio and H.264 for video. The platform also handles all media packet encryption or decryption and packet network transmission automatically. The bot is only concerned with the actual audio or video content. A real-time media bot participates in 1:1 calls as well as meetings with multiple participants.

This document introduces the following key concepts related to building a bot that can conduct real-time audio or video calls with Microsoft Teams:

* Media session
* Frames and frame rate
* Audio format
* Video format
* Active and dominant speakers
* Video subscription

## Media session

When a real-time media bot answers an incoming call or joins a Microsoft Teams meeting, it must declare what modalities it intends to support. For each supported modality, the bot declares whether it can send and receive media, receive only, or send only. For example, a bot designed to handle 1:1 Teams calls, requires to both send and receive audio, but only send video as it does not require to receive the video of the caller. The set of audio and video modalities established between the bot and the Teams caller or meeting is called the media session.

Two types of video modalities are supported, main video and video-based screen sharing. Main video is used to transport the video from a user's webcam. Video-based screen sharing allows a user to share his or her screen as a video stream. The platform allows a bot to send and receive both video types.

When joined to a Teams meeting, a bot can receive multiple main video streams simultaneously up to 10 per media session. This allows the bot to see more than one participant in the meeting.

The next section provides details about the bot sending and receiving media as a sequence of frames.

## Frames and frame rate

A real-time media bot interacts directly with the audio and video modalities of a media session. This means the bot is sending and/or receiving media as a sequence of frames, where each frame represents a unit of content. One second of audio is transmitted as a sequence of 50 frames, with each frame containing 20 milliseconds (ms) that is 1/50th of a second of speech content. One second worth of video is sliced as a sequence of 30 still images, each intended to be viewed for just 33.3ms that is 1/30th of a second before the next video frame is displayed. The number of frames transmitted or rendered per second is called the frame rate. 30 frames per second (fps) indicates 30 frames per second.

The next section provides details about the audio and video format used in real-time media calls and meetings.

## Audio and video format

In audio format, each second of audio is represented as 16,000 samples, with each sample containing 16-bits of data. A 20ms audio frame contains 320 samples that is 640 bytes of data.

In video format, several formats are supported. Two key properties of a video format are its frame size and color format. Supported frame sizes include 640x360 that is 360 pixels, 1280x720 that is 720 pixels, and 1920x1080 that is 1080 pixels. Supported color formats include NV12 that is 12 bits per pixel and RGB24 that is 24 bits per pixel.

A 720p video frame contains 921,600 pixels that is 1280 times 720. In the RGB24 color format, each pixel is represented as 3 bytes that is 24-bits comprised of one byte each of red, green, and blue color components. Therefore, a single 720p RGB24 video frame requires 2,764,800 bytes of data that is 921,600 pixels times 3 bytes per pixel. At a frame rate of 30 fps, sending 720p RGB24 video frames means processing approximately 80 MB/s of content (which is substantially compressed by the H.264 video codec before network transmission).

An advanced capability of the platform allows a bot to send or receive video as encoded H.264 frames. This supports bots which provide their own H.264 encoder/decoder, or do not require the video stream decoded into raw RGB24 or NV12 bitmaps.

## Active and dominant speakers

When joined to a Teams meeting consisting of multiple participants, a bot can identify which meeting participants are currently speaking. **Active speakers** identify which participants are being heard in each received audio frame. Dominant speakers identify which participants are currently most active or dominant in the group conversation, even though their voice is not heard in every audio frame. The set of dominant speakers can change as different participants take turns speaking.

## Video subscription

In a 1:1 call, the bot automatically receives the video of the caller if the bot is enabled to receive video. In a Teams meeting, the bot must indicate to the platform which participants it wants to see. A *ideo subscription is a request by the bot to receive a participant’s main video or screen-sharing content. As the participants in the meeting conduct their conversation, the bot modifies its desired video subscriptions based on updates of the dominant speaker set or notifications indicating which participant is currently screen sharing.

## Developer resources

To develop an application-hosted media bot, you must install the [Microsoft.Graph.Calls.Media .NET library](https://www.nuget.org/packages/Microsoft.Graph.Communications.Calls.Media/) NuGet package within your Visual Studio project:

Application-hosted media bots require .NET or C# and Windows Server. For more information, see [requirements and considerations for application-hosted media bots](requirements-considerations-application-hosted-media-bots.md#application-hosted-media-bot-development-requires-cnet-and-windows-server).

## Next step

> [!div class="nextstepaction"]
> [Real-time media calls and meetings](~/bots/calls-and-meetings/registering-calling-bot.md)
