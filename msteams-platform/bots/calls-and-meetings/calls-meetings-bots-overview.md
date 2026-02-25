---
title: Bots for Teams Calls and Online Meetings
description: Learn how to integrate voice and video in Microsoft Teams apps using Microsoft Graph APIs for calls and online meetings, including IVR, call control, and real-time media streams.
ms.topic: conceptual
ms.localizationpriority: medium
ms.date: 02/25/2026
---

# Calls and online meetings bots

Bots can interact with Teams calls and meetings using real-time voice, video, and screen sharing. With [Microsoft Graph APIs for calls and online meetings](/graph/api/resources/communications-api-overview), Teams apps can interact with users using voice and video to enhance the experience. These APIs allow you to add the following features:

* Interactive voice response (IVR).
* Call control.
* Access to real-time audio and video streams, including desktop and app sharing.

To use these Graph APIs in a Teams app, you create a bot and specify some additional information and permissions.

> [!TIP]
> **Getting started?** Follow these steps:
> 1. [Register a calling bot](registering-calling-bot.md) — configure your app manifest and Graph permissions.
> 2. Review the [key concepts](#key-concepts) on this page to understand call types and media models.
> 3. Explore the [code samples](#code-samples) to see working implementations.

## Intended use cases

Calls and meetings bots are designed for scenarios that require programmatic interaction with voice and video in Teams:

| Scenario | Description |
|----------|-------------|
| **Interactive voice response (IVR)** | Build automated call menus that route callers using voice prompts and DTMF tones. |
| **Call automation** | Programmatically initiate, transfer, and manage calls between users and groups. |
| **Compliance recording** | Capture and archive call and meeting content for regulatory requirements. |
| **Contact center integration** | Connect enterprise contact center platforms with Teams calling. |
| **Cloud Video Interop (CVI)** | Integrate third-party video conferencing systems with Teams meetings. |

> [!IMPORTANT]
> **Building AI agents for meetings?** Calls and meetings bots with raw media access aren't recommended for AI agent scenarios. Instead, use:
>
> * [Microsoft Copilot Studio agents](/microsoft-copilot-studio/overview) for building agents that participate in Teams meetings.
> * [Graph API meeting transcripts](/graph/api/resources/calltranscript) to access meeting content after transcription.
> * [Meeting transcripts overview](~/graph-api/meeting-transcripts/overview-transcripts.md) for transcript access without raw media processing.

## Prerequisites

To register and run a calls and meetings bot, you need:

* A Teams [app manifest](/microsoft-365/extensibility/schema/root-bots) with `supportsCalling` and `supportsVideo` set to `true`.
* [Graph permissions](registering-calling-bot.md#add-graph-permissions) for your bot's Microsoft App ID (specific permissions depend on whether the bot initiates or receives calls).
* Admin consent from a tenant administrator for the required Graph permissions.
* A **Webhook URL** configured in your bot registration — this is the endpoint for all incoming call notifications.
* For **application-hosted media bots** only:
  * The [Microsoft.Graph.Communications.Calls.Media](https://www.nuget.org/packages/Microsoft.Graph.Communications.Calls.Media/) .NET library.
  * Deployment on a Windows Server machine or Windows Server guest OS in Azure.

> [!NOTE]
> Bots on Teams support only a [specific set of media formats](./requirements-considerations-application-hosted-media-bots.md) for audio and video content.

## Known limitations

* User-initiated calls to a bot aren't supported on the Teams mobile client.
* Group calls support up to 350 participants.

## Functions of calls and online meeting bots

Bots can perform the following functions by calling Microsoft Graph APIs for calls and online meetings:

### Core calling

* Initiate a one-to-one call between two users.
* Initiate a group call with more than two users (up to 350 users).
* Upgrade a one-to-one call into a group call.
* Join a group call after it starts.
* Invite a Voice over Internet Protocol (VoIP) participant to join an ongoing group call.

### Mid-call control

* Turn the video on or off.
* Mute or unmute the microphone.
* Switch between cameras.
* Put the call on hold or resume locally.
* Detect active speaker.
* Choose speaker and microphone for calls.
* Show the state of a participant (idle, early media, connecting, connected, on hold, in lobby, or disconnected).
* Show the state of a call (early media, incoming, connecting, ringing, connected, on hold, disconnecting, or disconnected).
* Show if a participant is on mute and the reason a participant left a call.

### Screen sharing

* Share the entire screen, a specific app, or a web browser tab.
* Share system audio during screen sharing.
* View remote screen share from a participant.

### Roster management

* List the participants in a call.
* Remove a participant from a call.

### PSTN (Public Switched Telephone Network)

* Place one-to-one or group calls with PSTN participants.
* Upgrade a one-to-one PSTN call into a group call.
* Dial-out from a group call as a PSTN participant.
* Support for early media.

## Key concepts

The following concepts are essential for understanding how calls and meetings bots work.

### Audio or video calls

Calls in Teams can be purely audio or audio and video. In this documentation, the term *call* refers to either type.

### Call types

Calls are either peer-to-peer between a person and your bot, or multiparty between your bot and two or more people in a group call.

:::image type="content" source="~/assets/images/calls-and-meetings/call-types.png" alt-text="Calling types"border="true":::

Following are the different call types and permissions required for the call:

* A user can initiate a peer-to-peer call with your bot or invite your bot into an existing multiparty call.
* Graph permissions aren't necessary for a user to initiate a peer-to-peer call with your bot. Additional permissions are needed for your bot to participate in a multiparty call, or for your bot to initiate a peer-to-peer call with a user.
* A call can start as peer-to-peer and eventually become a multiparty call. Your bot can initiate multiparty calls by inviting others, provided your bot has the proper permissions. If your bot doesn't have permissions to participate in group calls and if a participant adds another participant to the call, your bot is dropped from the call.

### Signals

There are two types of signals: incoming call and in-call.

* **Incoming call**: To receive an incoming call, you enter an endpoint in your bot settings. This endpoint receives a notification when an incoming call is initiated. You can answer the call, reject it, or redirect it to someone else.

     :::image type="content" source="~/assets/images/calls-and-meetings/call-handling.png" alt-text="Call handling"border="true":::

* **In-call**: When a bot is in a call, there are APIs for muting and unmuting the bot and to start or stop sharing video or desktop content with other participants. The bot can also access the list of participants, invite new participants, and mute them.

### Calls and online meetings

From a Teams user's perspective, there are two kinds of online meetings: unplanned and scheduled. From a bot's perspective, both are the same. An online meeting is a multiparty call between a set of participants that includes meeting coordinates — metadata such as `botId`, `chatId`, `joinUrl`, `startTime`, and `endTime`.

### Real-time media

When a bot participates in a call or meeting, it must deal with audio and video streams. When users talk on a call, show themselves on a webcam, or present their screens, the bot receives these as audio and video streams. If a bot wants to say something as simple as `"press 0 to reach the operator"` in an IVR scenario, it requires playing a `.WAV` file. Collectively, this is referred to as *media* or *real-time media*.

Real-time media refers to scenarios where media must be processed in real time, as opposed to playback of previously recorded audio or video. Microsoft created the Real-time Media Platform to handle the complexity of real-time media processing. When a bot answers an incoming call or joins a call, it tells the platform how media is handled.

There are two media processing models:

* **Service-hosted media** (recommended for most scenarios): Bots focus on managing application workflow, such as routing calls, and offload audio processing to the Microsoft Real-time Media Platform. A service-hosted media bot can be implemented as a stateless service. Available APIs:

  * `PlayPrompt` — play an audio clip.
  * `Record` — record audio clips.
  * `SubscribeToTone` — subscribe to dual tone multiple frequency (DTMF) tones. For example, detecting when a user presses **0** to reach the operator.

* **Application-hosted media** (advanced): For direct access to media streams, the bot needs a specific Graph permission. After your bot has the permission, the [Real-time Media Library](https://www.nuget.org/packages/Microsoft.Graph.Communications.Calls.Media/) and the [Graph calling SDK](https://microsoftgraph.github.io/microsoft-graph-comms-samples/docs/articles/index.html#graph-calling-sdk-and-stateful-client-builder) help you build rich, real-time media and calling bots. An application-hosted bot must be hosted in a Windows environment. For more information, see [application-hosted media bots](./requirements-considerations-application-hosted-media-bots.md).

> [!NOTE]
> Application-hosted media bots require significant infrastructure investment, including Windows Server VMs, high-bandwidth low-latency network connectivity, and media processing expertise. Evaluate whether your scenario truly requires raw media access before choosing this approach. For most scenarios, service-hosted media is sufficient.

For detailed information about frames, formats, and media processing, see [Real-time media concepts](~/bots/calls-and-meetings/real-time-media-concepts.md).

## Code samples

| **Sample name** | **Description** | **Link** |
|---------------|----------|--------|
| Policy recording bot | Demonstrates how a bot can receive media streams for compliance recording. | [View](https://github.com/microsoftgraph/microsoft-graph-comms-samples/tree/master/Samples/V1.0Samples/LocalMediaSamples/PolicyRecordingBot) |
| IVR bot | Service-hosted media bot that implements an interactive voice response menu. | [View](https://github.com/microsoftgraph/microsoft-graph-comms-samples/tree/master/Samples/V1.0Samples/StatelessSamples/SimpleIvrBot) |
| Teams recording bot | Demonstrates joining a call and recording audio/video. | [View](https://github.com/microsoftgraph/microsoft-graph-comms-samples/tree/master/Samples/V1.0Samples/LocalMediaSamples/AudioVideoPlaybackBot) |

For the full set of samples, see the [Microsoft Graph Communications samples repository](https://github.com/microsoftgraph/microsoft-graph-comms-samples).

## Next step

> [!div class="nextstepaction"]
> [Real-time media calls and meetings](~/bots/calls-and-meetings/real-time-media-concepts.md)

## See also

### Getting started

* [Register a calling bot](registering-calling-bot.md)
* [Build bots for Teams](../what-are-bots.md)
* [Application-hosted media bot requirements](./requirements-considerations-application-hosted-media-bots.md)

### APIs and SDKs

* [Microsoft Graph Communications API overview](/graph/api/resources/communications-api-overview)
* [Microsoft Graph SDK overview](/graph/sdks/sdks-overview)
* [Add Graph permissions](registering-calling-bot.md#add-graph-permissions)

### Related scenarios

* [Teams recording policy](/microsoftteams/teams-recording-policy)
* [Cloud Video Interop for Teams](/microsoftteams/cloud-video-interop)
* [Set up an auto attendant](/microsoftteams/create-a-phone-system-auto-attendant)
* [Enable an event as online meeting in Outlook calendar](/graph/outlook-calendar-online-meetings?tabs=http)

### Alternatives for AI and meeting intelligence

* [Microsoft Copilot Studio agents](/microsoft-copilot-studio/overview) — build AI agents for Teams meetings.
* [Get meeting transcripts using Graph APIs](/graph/api/resources/calltranscript) — access meeting content without media processing.
