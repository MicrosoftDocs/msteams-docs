---
title: Calls and online meetings bots
description: Learn how to integrate voice and video in Microsoft Teams apps using Microsoft Graph API for apps to interact with users, and manage real-time media streams.
ms.topic: conceptual
ms.localizationpriority: medium
ms.date: 05/16/2022
---

# Calls and online meetings bots

Bots can interact with Teams calls and meetings using real-time voice, video, and screen sharing. With [Microsoft Graph APIs for calls and online meetings](/graph/api/resources/communications-api-overview?view=graph-rest-beta&preserve-view=true), Teams apps can now interact with users using voice and video to enhance the experience. These APIs allow you to add the following new features:

* Interactive voice response (IVR).
* Call control.
* Access to real-time audio and video streams, including desktop and app sharing.

To use these Graph APIs in a Teams app, you create a bot and specify some additional information and permissions.

In addition, the Real-time Media Platform enables bots to interact with Teams calls and meetings using real-time voice, video, and screen sharing. A bot that participates in audio or video calls and online meetings is a regular Microsoft Teams bot with few extra features used to register the bot.

The Teams [app manifest](../../resources/schema/manifest-schema.md#bots) with two more settings `supportsCalling` and `supportsVideo`, Graph permissions for your bot's Microsoft App ID, and tenant admin consent enable you to register the bot. In registering a calls and meetings bot for Teams, the Webhook URL is mentioned, which is the webhook endpoint for all incoming calls to your bot. An application-hosted media bot requires the Microsoft.Graph.Communications.Calls.Media .NET library to access the audio and video media streams, and the bot must be deployed on a Windows Server machine or Windows Server guest Operating System (OS) in Azure. Bots on Teams support only a specific set of media formats for audio and video content.

Now, you must understand some core concepts, terminology, and conventions.


* To learn about Microsoft Graph SDK and its libraries, see [Microsoft Graph SDK overview](https://learn.microsoft.com/graph/sdks/sdks-overview?context=graph%2Fapi%2Fbeta&view=graph-rest-beta).
* To get the Microsoft.Graph.Communications.Calls NuGet package, see [NuGet Gallery | Microsoft.Graph.Communications.Calls 1.2.0.10563](https://www.nuget.org/packages/Microsoft.Graph.Communications.Calls/1.2.0.10115). 
* For samples that use Microsoft Graph SDK, see [Microsoft Graph Communications samples](https://github.com/microsoftgraph/microsoft-graph-comms-samples/tree/master/Samples). 



## Microsoft Graph calling and meeting APIs

Bots can perform the following functions by calling Microsoft Graph APIs for calls and online meetings:

| Feature | Functions |
| ------| -------------|
| Core capabilities | - Initiate a one-to-one call between two users <br>- Initiate a group call with more than two users (up to 350 users)<br>- Upgrade a one-to-one call with two users into a group call with more than two users<br>- Join a group call after it starts<br>- Invite a Voice over Internet Protocol (VoIP) participant to join an ongoing group call|
| Mid-call control | - Turn the video on or off<br>- Mute or unmute the microphone<br>- Switch between cameras<br>- Put the call on hold or resume locally<br>- Active speaker<br>- Choose speaker for calls<br>- Choose microphone for calls<br>- Show the state of a participant, such as idle, early media, connecting, connected, on hold, in lobby, and disconnected<br>- Show the state of a call, such as early media, incoming, Connecting, ringing, connected, on hold, disconnecting, or disconnected.<br>- Show if a participant is on mute<br>- Show the reason why a participant left a call |
| Screen sharing | - Share the entire screen from within the app <br>- Share a specific application (from the list of running apps)<br>- Share a web browser tab from the list of open tabs<br>- Share system audio during screen sharing<br>- Participant can view remote screen share |
| Roster | - List participants <br>- Remove a participant |
| PSTN | - Place a one-to-one call with a PSTN participant <br>- Place a group call with PSTN participants<br>- Upgrade a one-to-one call with a PSTN participant into a group call<br>- Dial-out from a group call as a PSTN participant<br>- Support for early media |
| General | Test your mic, speaker, and camera with an audio testing service (available by calling 8:echo123) |
| Device management | - Ask for permission to use audio or audio and video <br>- Get camera list<br>- Set camera<br>- Get selected camera<br>- Get microphone list<br>- Set microphone<br>- Get selected microphone<br>- Get speakers list<br>- Set speaker<br>- Get selected speaker |
| Video rendering | - Render single video in many places (local camera or remote stream) <br>- Set or update scaling mode<br>- Render remote video stream |


## Set up firewalls

Setting up firewalls is crucial to protect your network and system from unauthorized access and malicious attacks. Firewalls act as a barrier, controlling incoming and outgoing traffic based on security rules, preventing hackers from accessing your system, blocking malicious traffic, and hiding internal IP addresses. They provide an additional layer of security, preventing attacks like hacking, malware, and DoS attacks, and protect sensitive data from breaches. For more information, see https://cdn.graph.office.net/prod/pdf/teams-to-bot-communication-final.pdf.

## Terminologies

The following core concepts, terminology, and conventions guide you by using calls and online meetings bots:

* Audio or video calls
* Call types
* Signals
* Calls and online meetings
* Real-time media

### Audio or video calls

Calls in Teams can be purely audio or audio and video. Instead of audio or video call, the term call is used.

### Call types

Calls are either peer-to-peer between a person and your bot, or multiparty between your bot and two or more people in a group call.

:::image type="content" source="~/assets/images/calls-and-meetings/call-types.png" alt-text="Calling types"border="true":::

Following are the different call types and permissions required for the call:

* A user can initiate a peer-to-peer call with your bot or invite your bot into an existing multiparty call. The multiparty call isn't enabled yet in the Teams user interface.

    > [!NOTE]
    > User initiated calls to a bot aren't supported on the Teams mobile client.

* Graph permissions aren't necessary for a user to initiate a peer-to-peer call with your bot. Additional permissions are needed for your bot to participate in a multiparty call, or for your bot to initiate a peer-to-peer call with a user.
* A call can start as peer-to-peer and eventually become a multiparty call. Your bot can initiate multiparty calls by inviting others, provided your bot has the proper permissions. If your bot doesn't have permissions to participate in group calls and if a participant adds another participant to the call, your bot is dropped from the call.

### Signals

There are two types of signals, incoming call and in-call. Following are the different features of signals:

* To receive an incoming call, you enter an endpoint in your bot settings. This endpoint receives a notification when an incoming call is initiated. You can answer the call, reject it, or redirect it to someone else.

     :::image type="content" source="~/assets/images/calls-and-meetings/call-handling.png" alt-text="Call handling"border="true":::

* When a bot is in a call, there are APIs for muting and unmuting the bot and to start or stop sharing video or desktop content with other participants.
* The bot can also access the list of participants, invite new participants, and mute them.

### Calls and online meetings

From a Teams user's perspective, there are two kinds of online meetings, unplanned and scheduled. From a bot's perspective, both online meetings are the same. To a bot, an online meeting is a multiparty call between a set of participants and includes meeting coordinates. Meeting coordinates are the metadata for the meeting including `botId`, `chatId` associated with the meeting, `joinUrl`, `startTime` or `endTime`, and so on.

### Real-time media

When a bot is participating in a call or online meeting, it must deal with audio and video streams. When users talk on a call, show themselves on a webcam, or present their screens in a meeting, to a bot it's shown as audio and video streams. If a bot wants to say something as simple as, **press 0 to reach the operator** in an interactive voice response (IVR) scenario, it requires playing a .WAV file. Collectively, this is referred to as media or real-time media.

Real-time media refers to scenarios where media must be processed in real-time, as opposed to playback of previously recorded audio or video. Dealing with media streams, real-time media streams, is complex. Microsoft has created the Real-time Media Platform to handle these scenarios and to offload as much of the traditional heavy lifting of real-time media processing as possible. When the bot answers an incoming call or joins a new or existing call, it needs to tell the Real-time Media Platform how media is handled. If you're building an IVR application, you can offload the expensive audio processing to Microsoft. Alternately, if your bot requires direct access to media streams, that scenario is also supported. There are two types of media processing:

* **Service-hosted media**: Bots focus on managing application workflow, such as routing calls and offload audio processing to the Microsoft Real-time Media Platform. With service-hosted media, you have several options to implement and host your bot. A service-hosted media bot can be implemented as a stateless service as it doesn't process media locally. Service-hosted media bots can use the following APIs:

  * `PlayPrompt` for playing an audio clip.
  * `Record` for recording audio clips.
  * `SubscribeToTone` for subscribing to dual tone multiple frequency (DTMF) tones.

    For example, knowing when a user has pressed **0** to reach the operator.

* **Application-hosted media**: For a bot to get direct access to the media, it needs a specific Graph permission. After your bot has the permission, the [Real-time Media Library](https://www.nuget.org/packages/Microsoft.Graph.Communications.Calls.Media/), and the [Graph calling SDK](https://microsoftgraph.github.io/microsoft-graph-comms-samples/docs/articles/index.html#graph-calling-sdk-and-stateful-client-builder) helps you build rich, real-time media, and calling bots. An application-hosted bot must be hosted in a Windows environment. For more information, see [application-hosted media bots](./requirements-considerations-application-hosted-media-bots.md).

## Code sample

| **Sample name** | **Description** | **Graph** |
|---------------|----------|--------|
| Graph communication | Graph communications to interact with Microsoft's communications platform. | [View](https://github.com/microsoftgraph/microsoft-graph-comms-samples) |

## Next step

> [!div class="nextstepaction"]
> [Real-time media calls and meetings](~/bots/calls-and-meetings/real-time-media-concepts.md)

## See also

* [Build bots for Teams](../what-are-bots.md)
* [Work with the cloud communications API in Microsoft Graph](/graph/api/resources/communications-api-overview)
* [Add Graph permissions](registering-calling-bot.md#add-graph-permissions)
* [Develop calling and online meeting bots on your local PC](debugging-local-testing-calling-meeting-bots.md)
* [Enable an event as online meeting in Outlook calendar](/graph/outlook-calendar-online-meetings?tabs=http)
* [Requirements and considerations for application-hosted media bots](./requirements-considerations-application-hosted-media-bots.md)
* [Teams recording policy](/microsoftteams/teams-recording-policy)
* [Set up an auto attendant](/microsoftteams/create-a-phone-system-auto-attendant)
* [Set up auto answer for Microsoft Teams Rooms on Android and Teams video phone devices](/microsoftteams/set-up-auto-answer-on-teams-android)
