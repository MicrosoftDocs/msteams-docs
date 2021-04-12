---
title: Calls and online meetings bots
description: Learn how your Microsoft Teams apps can interact with users using voice and video using Microsoft Graph APIs for calls and online meetings.
ms.topic: conceptual
keywords: calling calls audio video IVR voice online meetings
ms.topic: conceptual
---

# Calls and online meetings bots

> [!NOTE]
> Support for calls and online meeting bots is currently not supported on the Microsoft Teams mobile platform.

Bots can interact with Teams calls and meetings using real-time voice, video, and screen sharing. With [Microsoft Graph APIs for calls and online meetings](/graph/api/resources/communications-api-overview?view=graph-rest-beta&preserve-view=true), Teams apps can now interact with users using voice and video to enhance the experience. These APIs allow you to add the following new features:

* Interactive voice response (IVR).
* Call control.
* Access to real-time audio and video streams, including desktop and app sharing.

To use these Graph APIs in a Teams app, you create a bot and specify some additional information and permissions.

In addition, the Real-time Media Platform enables bots to interact with Teams calls and meetings using real-time voice, video, and screen sharing. A bot that participates in audio or video calls and online meetings is a regular Microsoft Teams bot with few extra features used to register the bot.

The Teams app manifest with two additional settings `supportsCalling` and `supportsVideo`, Graph permissions for your bot's Microsoft App ID, and tenant admin consent enable you to register the bot. In registering a calls and meetings bot for Teams, the Webhook URL is mentioned, which is the webhook endpoint for all incoming calls to your bot. An application-hosted media bot requires the Microsoft.Graph.Communications.Calls.Media .NET library to access the audio and video media streams, and the bot must be deployed on a Windows Server machine or Windows Server guest Operating System (OS) in Azure. Bots on Teams supports only a specific set of media formats for audio and video content.

Now, you must understand some core concepts, terminology, and conventions.

## Terminologies

The following core concepts, terminology, and conventions guide you through the use of calls and online meetings bots:

* Audio or video calls
* Call types
* Signals
* Calls and online meetings
* Real-time media

### Audio or video calls

Calls in Teams can be purely audio or audio and video. Instead of audio or video call, the term call is used.

### Call types

Calls are either peer-to-peer between a person and your bot, or multiparty between your bot and two or more people in a group call.

![Calling types](~/assets/images/calls-and-meetings/call-types.png)

Following are the different call types and permissions required for the call:

* A user can initiate a peer-to-peer call with your bot or invite your bot into an existing multiparty call. The multiparty call is not enabled yet in the Teams user interface.
* Graph permissions are not necessary for a user to initiate a peer-to-peer call with your bot. Additional permissions are needed for your bot to participate in a multiparty call, or for your bot to initiate a peer-to-peer call with a user.
* A call can start as peer-to-peer and eventually become a multiparty call. Your bot can initiate multiparty calls by inviting others, provided your bot has the proper permissions. If your bot does not have permissions to participate in group calls and if a participant adds another participant to the call, your bot is dropped from the call.

### Signals

There are two types of signals, incoming call and in-call. Following are the different features of signals:

* To receive an incoming call, you enter an endpoint in your bot settings. This endpoint receives a notification when an incoming call is initiated. You can answer the call, reject it, or redirect it to someone else.

    ![Call handling](~/assets/images/calls-and-meetings/call-handling.png)

* When a bot is in a call, there are APIs for muting and unmuting the bot and to start or stop sharing video or desktop content with other participants.
* The bot can also access the list of participants, invite new participants, and mute them.

### Calls and online meetings

From a Teams user's perspective, there are two kinds of online meetings, ad hoc and scheduled. From a bot's perspective, both online meetings are the same. To a bot, an online meeting is a multiparty call between a set of participants and includes meeting coordinates. Meeting coordinates are the metadata for the meeting including `botId`, `chatId` associated with the meeting, `joinUrl`, `startTime` or `endTime`, and so on.

### Real-time media

When a bot is participating in a call or online meeting, it must deal with audio and video streams. When users talk on a call, show themselves on a webcam, or present their screens in a meeting, to a bot it is shown as audio and video streams. If a bot wants to say something as simple as, **press 0 to reach the operator** in an interactive voice response (IVR) scenario, it requires playing a .WAV file. Collectively, this is referred to as media or real-time media.

Real-time media refers to scenarios where media must be processed in real-time, as opposed to playback of previously recorded audio or video. Dealing with media streams, particularly real-time media streams, is extremely complex. Microsoft has created the Real-time Media Platform to handle these scenarios and to offload as much of the traditional heavy lifting of real-time media processing as possible. When the bot answers an incoming call or joins a new or existing call, it needs to tell the Real-time Media Platform how media is handled. If you are building an IVR application, you can offload the expensive audio processing to Microsoft. Alternately, if your bot requires direct access to media streams, that scenario is also supported. There are two types of media processing:

* **Service-hosted media**: Bots focus on managing application workflow, such as routing calls and offload audio processing to the Microsoft Real-time Media Platform. With service-hosted media, you have several options to implement and host your bot. A service-hosted media bot can be implemented as a stateless service as it does not process media locally. Service-hosted media bots can use the following APIs:

    * `PlayPrompt` for playing an audio clip.
    * `Record` for recording audio clips.
    * `SubscribeToTone` for subscribing to dual tone multiple frequency (DTMF) tones.

    For example, knowing when a user has pressed **0** to reach the operator.

* **Application-hosted media**: For a bot to get direct access to the media, it needs a specific Graph permission. After your bot has the permission, the [Real-time Media Library](https://www.nuget.org/packages/Microsoft.Graph.Communications.Calls.Media/), and the [Graph calling SDK](https://microsoftgraph.github.io/microsoft-graph-comms-samples/docs/articles/index.html#graph-calling-sdk-and-stateful-client-builder) helps you build rich, real-time media, and calling bots. An application-hosted bot must be hosted in a Windows environment. For more information, see [application-hosted media bots](./requirements-considerations-application-hosted-media-bots.md).

## See also

> [!div class="nextstepaction"]
> [Graph API reference](/graph/api/resources/communications-api-overview?view=graph-rest-beta&preserve-view=true)
> [!div class="nextstepaction"]
> [Sample apps](https://github.com/microsoftgraph/microsoft-graph-comms-samples)
> [!div class="nextstepaction"]
> [Registering a bot that supports calls and online meetings](./registering-calling-bot.md)
> [!div class="nextstepaction"]
> [Graph permissions for calls and online meetings bots](./registering-calling-bot.md#add-graph-permissions)
> [!div class="nextstepaction"]
> [How to develop calling and online meeting bots on your computer](./debugging-local-testing-calling-meeting-bots.md)
> [!div class="nextstepaction"]
> [Requirements and considerations for application-hosted media bots](./requirements-considerations-application-hosted-media-bots.md)
> [!div class="nextstepaction"]
> [Technical information on handling incoming call notifications](./call-notifications.md)

## Next step

> [!div class="nextstepaction"]
> [Real-time media calls and meetings](~/bots/calls-and-meetings/real-time-media-concepts.md)
