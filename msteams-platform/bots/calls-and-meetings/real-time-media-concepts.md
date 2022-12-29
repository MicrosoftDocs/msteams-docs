---
title: Real-time media calls and online meetings with Microsoft Teams
description: Learn how Real-time Media Platform enables bots to interact with Microsoft Teams calls and meetings. Explore, media sessions, frames and frame rate, audio and video format, active speakers, video subscription. 
ms.topic: conceptual
ms.localizationpriority: medium
---

# Real-time media calls and meetings with Microsoft Teams

The Real-time Media Platform enables bots to interact with Microsoft Teams calls and meetings using real-time voice, video, and screen sharing. The Real-time Media Platform is an advanced capability that allows the bot to send and receive voice and video content frame by frame. The bot has raw access to the voice, video, and screen sharing media streams. There are simpler service-hosted media bots that rely on the Real-time Media Platform for all media processing. Bots that process media themselves are called application-hosted media bots.

For example, in a 1:1 call with a bot, as the user speaks, the bot receives 50 audio frames per second. The bot receives audio frames with each frame of 20 milliseconds (ms) of audio. An application-hosted media bot can do real-time speech recognition as the audio frames are received. No need to wait for a recording after the user has stopped speaking. The bot can also send and receive high-definition-resolution video, including video-based screen sharing content.

The platform provides a simple socket-like API for the bot to send and receive media. It handles the real-time encoding and decoding of audio or video packets. It uses codecs such as SILK and G.722 for audio and H.264 for video. The platform also handles all media packet encryption or decryption and packet network transmission. The bot is only concerned with the actual audio or video content. A real-time media bot participates in 1:1 calls and meetings with multiple participants.

## Media session

A real-time media bot must declare what modalities it must support. The real-time media bot must declare support when it answers an incoming call or joins a Teams meeting. For each supported modality, the bot declares whether it can send and receive media, receive only, or send only. For example, a bot designed to handle 1:1 Teams calls, requires to both send and receive audio. But the bot needs to only send video as it need not receive the video of the caller. The set of audio and video modalities established between the bot and the Teams caller or meeting is called the media session.

Two types of video modalities are supported, main video and video-based screen sharing. The main video is used to transport the video from a user's webcam. The video-based screen sharing allows a user to share the screen. The platform allows a bot to send and receive both video types.

When joined to a Teams meeting, a bot can receive multiple main videos streams simultaneously up to 10 per media session. The bot can see more than one participant in the meeting.

The next section provides details about the bot sending and receiving media as a sequence of frames.

## Frames and frame rate

A real-time media bot interacts directly with the audio and video modalities of a media session. The bot is sending and receiving media as a sequence of frames and each frame is a content unit. One second of audio is transmitted as a sequence of 50 frames. Each frame contains 20 ms that is 1/50th of a second of speech content. One second of video is transmitted as a sequence of 30 still images. Each image is intended to be viewed for just 33.3 ms that is 1/30th of a second before the next video frame. The number of frames transmitted or rendered per second is called the frame rate.

The next section provides details about the audio and video format used in real-time media calls and meetings.

## Audio and video format

In audio format, each second of audio is represented as 16,000 samples, with each sample containing 16 bits of data. A 20-ms audio frame contains 320 samples that are 640 bytes of data.

In video format, several formats are supported. Two key properties of a video format are its frame size and color format. Supported frame sizes include 640x360 that is 360 pixels, 1280x720 that is 720 pixels, and 1920x1080 that is 1080 pixels. Supported color formats include NV12 that is 12 bits per pixel and RGB24 that is 24 bits per pixel.

A 720-p video frame contains 921,600 pixels that is 1280 times 720. In the RGB24 color format, each pixel is represented as 3 bytes that is 24 bits including 1 byte each of red, green, and blue color components. A single 720p RGB24 video frame requires 2,764,800 bytes of data that is 921,600 pixels times 3 bytes per pixel. At a variable frame rate, sending 720p RGB24 video frames means processing approximately 80 megabytes per second of content. 80 megabytes is substantially compressed by the H.264 video codec before network transmission.

An advanced capability of the platform allows a bot to send or receive video as encoded H.264 frames. Bots that provide their own H.264 encoder or decoder are supported, or the video stream decoded into raw RGB24 or NV12 bitmaps is not required.

The next section provides details about which meeting participants are speaking that is which are active and dominant speakers.

## Active and dominant speakers

When joined to a Teams meeting consisting of multiple participants, a bot can identify which meeting participants are currently speaking. Active speakers identify which participants are being heard in each received audio frame. Dominant speakers identify which participants are currently most active or dominant in the group conversation, though their voice is not heard in every audio frame. The set of dominant speakers can change as different participants take turns speaking.

The next section provides details about video subscription requests made by a bot.

## Video subscription

In a 1:1 call, the bot automatically receives the video of the caller if the bot is enabled to receive the video. In a Teams meeting, the bot must indicate to the platform which participants it wants to see. A video subscription is a request by the bot to receive a participant’s main video or screen-sharing content. As the participants in the meeting conduct their conversation, the bot modifies its required video subscriptions. The bot modifies video subscriptions based on updates of the dominant speaker set or notifications that indicate which participant is currently screen sharing.

The next section provides details about what you must install and the requirements to develop an application-hosted media bot.

## Developer resources

To develop an application-hosted media bot, you must install the [Microsoft.Graph.Calls.Media .NET library](https://www.nuget.org/packages/Microsoft.Graph.Communications.Calls.Media/) NuGet package within your Visual Studio project.

Application-hosted media bots require .NET or C# and Windows Server. For more information, see [requirements and considerations for application-hosted media bots](requirements-considerations-application-hosted-media-bots.md#c-or-net-and-windows-server-for-development).

## Next step

> [!div class="nextstepaction"]
> [Register calls and meetings bot for Microsoft Teams](registering-calling-bot.md)

## See also

* [Build bots for Teams](../what-are-bots.md)
* [Calls and online meetings bots](calls-meetings-bots-overview.md)
* [Supported media formats for bots](~/resources/media-formats.md)
