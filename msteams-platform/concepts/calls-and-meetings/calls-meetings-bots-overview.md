---
title: Calls and Online Meetings Bots
description: Learn how your Microsoft Teams apps can interact with users using voice and video using Microsoft Graph APIs for calls and online meetings.
keywords: calling calls audio video IVR voice online meetings
ms.date: 11/16/2018
---

# Calls and online meetings bots

With the addition of [Microsoft Graph APIs for calls and online meetings](https://developer.microsoft.com/en-us/graph/docs/api-reference/beta/resources/calls-api-overview), Microsoft Teams apps can now interact with users in rich ways using voice and video. These APIs allow you to add new features such as interactive voice response (IVR), call control, and access to real-time audio and/or video streams for calls and meetings, including desktop and app sharing.

To use these Microsoft Graph APIs in a Microsoft Teams app, you create a bot and specify some additional information and permissions which we'll describe elsewhere, but first, it's important to understand a few new concepts, terminology, and conventions:

* **Audio/video calls.** Calls in Teams can be purely audio or audio+video. For brevity's sake, we don't say "audio/video call" everywhere; we just say "call."
* **Call types.** Calls are either peer-to-peer (between a person and your bot) or multiparty (your bot and two or more people in a group call).
  ![Call Types](~/assets/images/calls-and-meetings/call-types.png)
  * A user may initiate a peer-to-peer call with your bot or invite your bot into an existing multiparty call (although the latter is not yet enabled in the Microsoft Teams UI).
  * No Microsoft Graph permissions are necessary for a user to initiate a call with your bot for a peer-to-peer call, but additional permissions are needed for your bot to participate in a multiparty call, or for your bot to initiate a peer-to-peer call with a user.
  * A call may start as peer-to-peer and escalate to multiparty. Your bot can initiate this escalation by inviting others provided your bot has the proper permissions, but if your bot does not have permissions to participate in group calls, if one participant adds another person, your bot is dropped from the call.
* **Signaling.** There are two types of signals: incoming call and in-call:
  * To receive an incoming call, you specify an endpoint in your bot settings; this endpoint receives a notification when an incoming call arrives. You can answer the call, reject it, or redirect it to somewhere or someone else.
  ![Call Types](~/assets/images/calls-and-meetings/call-handling.png)
  * When a bot is in a call, there are APIs for muting and unmuting itself and to start/stop sharing video/desktop content with the other participants.
  * The bot can also access the list of participants, invite new participants, and mute them.
* **Calls and online meetings.** From a Teams user's perspective, there are two kinds of online meetings: ad hoc and scheduled. However, from a bot's perspective, it's different. To a bot, an online meeting is just a multiparty call (the set of participants) plus "meeting coordinates," which you can think of as the metadata for the meeting: its ID, the `chatId` associated with the meeting, its `joinUrl`, `startTime`/`endTime`, and more.
* **Real-time media.** When a bot is participating in a call or online meeting, it must deal with audio and video streams. When users talk on a call, show themselves on a webcam, or present their screens in a meeting, a bot "sees" this as audio and/or video streams. If a bot wants to say something or present screen content, that requires an audio or video stream. Even something as simple as the bot saying "press 0 to reach the operator" in an IVR (interactive voice response) scenario means playing a .WAV file. Collectively, we refer to this as _media_ or _real-time media_ (when referring to scenarios where media must be processed in real time, as opposed to playback of previously-recorded audio/video). Historically, dealing with media streams, particularly real-time media streams, has been extremely complex for developers. Microsoft has created the _Real-time Media Platform_ to handle these use cases and to offload as much of the traditional "heavy lifting" of real-time media processing as possible.  When the bot answers an incoming call, or joins a new or existing call, it needs to tell the Real-time Media Platform how media will be handled. If you are building IVR application, you can offload the expensive audio processing to Microsoft. Alternatively, if your bot requires direct access to media streams, we support that scenario too. These are the two types of media processing:
  * **Service-hosted media.** Bots focus on managing application workflow (e.g. routing calls) and offload audio processing to the Microsoft Real-time Media Platform. With service-hosted media, you have several options to implement and host your bot. A service-hosted media bot can be implemented as a stateless service since it does not process media locally. Service-hosted media bots can use APIs such as `PlayPrompt` for playing an audio clip, `Record` for recording audio clips, or `SubscribeToTone` for subscribing to DTMF tones (e.g. knowing when a user has pressed 0 to reach the operator).
  * **Application-hosted media.** For a bot to get direct access to the media, it needs a specific Graph permission, but once your bot has it, the [Real-time Media Library](https://www.nuget.org/packages/Microsoft.Graph.Communications.Calls.Media/) and the [Graph Calling SDK](https://microsoftgraph.github.io/microsoft-graph-comms-samples/docs/articles/index.html#graph-calling-sdk-and-stateful-client-builder) helps you build rich real-time media calling bots. An Application-hosted bot must be hosted in a Windows environment, as described in more detail [here](~/concepts/calls-and-meetings/requirements-considerations-application-hosted-media-bots).

## Further reading

Here's more information on how to create and test calls and online meetings bots:

* [Graph API reference](https://developer.microsoft.com/en-us/graph/docs/api-reference/beta/resources/calls-api-overview)
* [Sample apps](https://github.com/microsoftgraph/microsoft-graph-comms-samples)
* [Registering a bot that supports calls and online meetings](~/concepts/calls-and-meetings/registering-calling-bot) and [Microsoft Graph permissions for calls and online meetings bots](~/concepts/calls-and-meetings/registering-calling-bot#application-permissions)
* [How to develop calling and online meeting bots on your local PC](~/concepts/calls-and-meetings/debugging-local-testing-calling-meeting-bots)
* [More information on real-time media processing](~/concepts/calls-and-meetings/real-time-media-concepts), and [what's needed to support application-hosted media](~/concepts/calls-and-meetings/requirements-considerations-application-hosted-media-bots)
* [Technical information on handling incoming call notifications](~/concepts/calls-and-meetings/call-notifications)
