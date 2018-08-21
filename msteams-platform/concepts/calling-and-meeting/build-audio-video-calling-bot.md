---
title: Build a real-time media bot for Skype | Microsoft Docs
description: Learn how to build a bot that conducts real-time audio/video calls with Skype, using the Bot Builder SDK for .NET and the Bot Builder-RealTimeMediaCalling SDK for .NET.
keywords: 
ms.date: 12/13/17
---

# Build a real-time media bot for Skype

The Real-Time Media Platform for Bots is an advanced capability which allows the bot to send and receive voice and video content frame by frame. The bot has "raw" access to the voice, video and screen-sharing real-time modalities. This article provides an overview of building an audio/video calling bot and accessing the real-time modalities.

In this article, the bot is running in an Azure Cloud Service, as either a Web Role or a Worker Role self-hosting the ASP.NET Web API framework.

> [!IMPORTANT]
> This article content is preliminary; please refer to the Samples folder in the <a href="https://github.com/Microsoft/BotBuilder-RealTimeMediaCalling">BotBuilder-RealTimeMediaCalling</a> GitHub repository for the full code of sample real-time media bots.

## Configure the service hosting the real-time media bot

In order to use the Real-Time Media Platform, the following service configurations are necessary.

* The bot must know the Fully-Qualified Domain Name (FQDN) of its service. This is not provided by the Azure RoleEnvironment API; instead, the FQDN must be stored in the bot's Cloud Service configuration and read during service startup.

* Bot Service must be have a certificate issued by a recognized Certificate Authority. The thumbprint of the certificate must be stored in the bot's Cloud Service configuration and read during service startup.

* A public <a href="/azure/cloud-services/cloud-services-enable-communication-role-instances#instance-input-endpoint">instance input endpoint</a> must be provisioned. This assigns a unique public port to each virtual machine (VM) instance in the bot's service. This port is used by the Real-Time Media Platform to communicate with the Skype Calling Cloud.
  ```xml
  <InstanceInputEndpoint name="InstanceMediaControlEndpoint" protocol="tcp" localPort="20100">
    <AllocatePublicPortFrom>
    <FixedPortRange max="20200" min="20101" />
    </AllocatePublicPortFrom>
  </InstanceInputEndpoint>
  ```

  It is also useful to create another instance input endpoint for call related callbacks and notifications. Using an instance input endpoint ensures the callbacks and notifications are delivered to the same VM instance in the service deployment that is hosting the real-time media session for the call.
  ```xml
  <InstanceInputEndpoint name="InstanceCallControlEndpoint" protocol="tcp" localPort="10100">
    <AllocatePublicPortFrom>
    <FixedPortRange max="10200" min="10101" />
    </AllocatePublicPortFrom>
  </InstanceInputEndpoint>
  ```

* Each VM instance must have an instance-level public IP address (ILPIP). During startup, the bot must discover the ILPIP address assigned to each service instance. See <a href="/azure/virtual-network/virtual-networks-instance-level-public-ip">ILPIP</a> for more information about obtaining and configuring an ILPIP.
  ```xml
  <NetworkConfiguration>
  <AddressAssignments>
    <InstanceAddress roleName="WorkerRole">
    <PublicIPs>
        <PublicIP name="InstancePublicIP" domainNameLabel="InstancePublicIP" />
    </PublicIPs>
    </InstanceAddress>
  </AddressAssignments>
  </NetworkConfiguration>
  ```

* During service instance startup, the script `MediaPlatformStartupScript.bat` (provided as a part of Nuget package) needs to be run as a Startup task under elevated privileges. The script execution must complete before the platform’s initialization method is called. 

```xml
<Startup>
<Task commandLine="MediaPlatformStartupScript.bat" executionContext="elevated" taskType="simple" />      
</Startup> 
```

## Initialize the media platform on service startup

During service instance startup, the Real-Time Media Platform must be initialized. This must be done only once before the bot can accept any audio/video Skype calls on that instance. Initialization of the media platform requires providing various service configuration settings, including the service's FQDN, the public ILPIP address, the instance input endpoint port value, and the bot's **Microsoft App ID**.

> [!NOTE]
> To find your bot's **AppID** and **AppPassword**, see [MicrosoftAppID and MicrosoftAppPassword](~/bot-service-manage-overview.md#microsoftappid-and-microsoftapppassword).

```cs
var mediaPlatformSettings = new MediaPlatformSettings()
{
    MediaPlatformInstanceSettings = new MediaPlatformInstanceSettings()
    {
        CertificateThumbprint = certificateThumbprint,
        InstanceInternalPort = instanceMediaControlEndpointInternalPort,
        InstancePublicIPAddress = instancePublicIPAddress,
        InstancePublicPort = instanceMediaControlEndpointPublicPort,
        ServiceFqdn = serviceFqdn
    },

    ApplicationId = MicrosoftAppId
};

MediaPlatform.Initialize(mediaPlatformSettings);            
```

## Register to receive incoming call requests

Define a `CallController` class. This enables Bot Service to register for incoming Skype calls, and ensure callback and notification requests are forwarded to the appropriate `RealTimeMediaCall` object.

```cs
[BotAuthentication]
[RoutePrefix("api/calling")]
public class CallController : ApiController
{
    static CallController()
    {
        RealTimeMediaCalling.RegisterRealTimeMediaCallingBot(
            c => { return new RealTimeMediaCall(c); },
            new RealTimeMediaCallingBotServiceSettings()
        );
    }

    [Route("call")]
    public async Task<HttpResponseMessage> OnIncomingCallAsync()
    {
        // forwards the incoming call to the associated RealTimeMediaCall object
        return await RealTimeMediaCalling.SendAsync(this.Request, RealTimeMediaCallRequestType.IncomingCall);
    }

    [Route("callback")]
    public async Task<HttpResponseMessage> OnCallbackAsync()
    {
        // forwards the incoming callback to the associated RealTimeMediaCall object
        return await RealTimeMediaCalling.SendAsync(this.Request, RealTimeMediaCallRequestType.CallingEvent);
    }

    [Route("notification")]
    public async Task<HttpResponseMessage> OnNotificationAsync()
    {
        // forwards the incoming notification to the associated RealTimeMediaCall object
        return await RealTimeMediaCalling.SendAsync(this.Request, RealTimeMediaCallRequestType.NotificationEvent);
    }
}
```

`RealTimeMediaCallingBotServiceSettings` implements `IRealTimeMediaCallServiceSettings` and provides webhook links for callback and notification events.

## Register for incoming events for the call

Define a `RealTimeMediaCall` class that implements `IRealTimeMediaCall`. For each call that is received by the bot, an instance of `RealTimeMediaCall` is created by the Bot Framework. The `IRealTimeMediaCallService` object passed to the constructor allows the bot to register for events to handle events associated with the real-time media call.

```cs
internal class RealTimeMediaCall : IRealTimeMediaCall
{
     public RealTimeMediaCall(IRealTimeMediaCallService callService)
     {
         if (callService == null)
             throw new ArgumentNullException(nameof(callService));

         CallService = callService;
         CorrelationId = callService.CorrelationId;
         CallId = CorrelationId + ":" + Guid.NewGuid().ToString();

         // Register for the call events
         CallService.OnIncomingCallReceived += OnIncomingCallReceived;
         CallService.OnAnswerAppHostedMediaCompleted += OnAnswerAppHostedMediaCompleted;
         CallService.OnCallStateChangeNotification += OnCallStateChangeNotification;
         CallService.OnRosterUpdateNotification += OnRosterUpdateNotification;
         CallService.OnCallCleanup += OnCallCleanup;
     }
}
```

## Create audio and video sockets
Before the bot can accept an incoming audio/video Skype call, it must create `AudioSocket` and `VideoSocket` objects in order to support sending and receiving real-time media. (If the bot does not want to support video, then it should create only an AudioSocket.)

The bot must decide upfront which modalities it wants to support, and create the appropriate AudioSocket and VideoSocket objects. The bot cannot change what modalities it supports for the call after the incoming call is accepted.

For each AudioSocket and VideoSocket, the bot specifies whether the media socket is to support both sending and receiving media, or sending or receiving only. For example, the bot may wish to send and receive audio ("Sendrecv"), but send only for video ("Sendonly"). The bot must also specify what media formats are supported for each media socket. For an AudioSocket, the currently supported format is "Pcm16K": (signed) 16-bit PCM encoding, 16KHz sampling rate. For a VideoSocket, media formats for sending and receiving are specified separately. Only the "NV12" format is supported for receiving video, while several different formats are supported for sending.

```cs
_audioSocket = new AudioSocket(new AudioSocketSettings
{
    StreamDirections = StreamDirection.Sendrecv,
    SupportedAudioFormat = AudioFormat.Pcm16K,
    CallId = correlationId
});

_videoSocket = new VideoSocket(new VideoSocketSettings
{
    StreamDirections = StreamDirection.Sendrecv,
    ReceiveColorFormat = VideoColorFormat.NV12,
    SupportedSendVideoFormats = new VideoFormat[]
    {
        VideoFormat.Yuy2_1280x720_30Fps,
        VideoFormat.Yuy2_720x1280_30Fps,
    },
    CallId = correlationId
});

_audioSocket.AudioMediaReceived += OnAudioMediaReceived;
_audioSocket.AudioSendStatusChanged += OnAudioSendStatusChanged;
_audioSocket.DominantSpeakerChanged += OnDominantSpeakerChanged;
_videoSocket.VideoMediaReceived += OnVideoMediaReceived;
_videoSocket.VideoSendStatusChanged += OnVideoSendStatusChanged;
```                             

## Create a MediaConfiguration
Once the media sockets have been created, the bot must next create a `MediaConfiguration` object which is needed to associate the media sockets with an incoming audio/video Skype call.

```cs
var mediaConfiguration = MediaPlatform.CreateMediaConfiguration(_audioSocket, _videoSocket);
```

##  Answer an incoming audio/video call
The `OnIncomingCallReceived` event is invoked to allow the bot to accept the incoming Skype audio/video call. To do so, the bot creates an `AnswerAppHostedMedia` object with the `MediaConfiguration` object. The bot registers for notifications associated with this Skype call.

```cs
private Task OnIncomingCallReceived(RealTimeMediaIncomingCallEvent incomingCallEvent)
{
    // ... create Audio/VideoSocket objects and MediaConfiguration ...

    incomingCallEvent.RealTimeMediaWorkflow.Actions = new ActionBase[]
    {
        new AnswerAppHostedMedia
        {
            MediaConfiguration = mediaConfiguration,
            OperationId = Guid.NewGuid().ToString()
        }
    };

    // subscribe for roster and call state changes
    incomingCallEvent.RealTimeMediaWorkflow.NotificationSubscriptions = new NotificationType[]
    {
        NotificationType.CallStateChange,
        NotificationType.RosterUpdate
    };
}
```

## Outcome of the call
`OnAnswerAppHostedMediaCompleted` is raised when the `AnswerAppHostedMedia` action completes. The `Outcome` property in the `AnswerAppHostedMediaOutcomeEvent` indicates success or failure. If the call cannot be established, the bot should dispose the AudioSocket and VideoSocket objects it created for the call.

## Receive audio media
If the `AudioSocket` was created with the ability to receive audio, then the `AudioMediaReceived` event will be invoked each time a frame of audio is received. The bot should expect to handle this event approximately 50 times per second, regardless of the peer that could be sourcing audio content (since comfort noise buffers are generated locally if no audio is received from the peer). Each packet of audio content is delivered in an `AudioMediaBuffer` object. This object contains a pointer to a native heap-allocated memory buffer containing the decoded audio content. 

```cs
void OnAudioMediaReceived(
            object sender,
            AudioMediaReceivedEventArgs args)
{
   var buffer = args.Buffer;

   // native heap-allocated memory containing decoded content
   IntPtr rawData = buffer.Data;            
}
```

The event handler must return quickly. It is recommended that the application queue the `AudioMediaBuffer` to be processed asynchronously. `OnAudioMediaReceived` events will be serialized by the Real-Time Media Platform (that is, the next event will not be raised until the current one returns). Once an `AudioMediaBuffer` has been consumed, the application must call the buffer's Dispose method so that the underlying unmanaged memory can be reclaimed by the media platform. 

```cs
   // release/dispose buffer when done 
   buffer.Dispose();
```

> [!IMPORTANT]
> The bot must not call the buffer's Dispose method until it is finished accessing the buffer.

## Receive video media
Receiving video is similar to receiving audio except that the number of buffers per second will depend on value of the frame rate. `VideoMediaBuffer` has `VideoFormat` and `OriginalVideoFormat` properties. `OriginalVideoFormat` represents the original format of the buffer when it was sourced. It is only available when receiving video buffers via the `IVideoSocket.VideoMediaReceived` event handler. If the buffer was resized before being transmitted, the `OriginalVideoFormat` property will have the original Width and Height, whereas `VideoFormat` will have the current ones after the resize. If the Width and Height properties of `OriginalVideoFormat` differ from the `VideoFormat` property, the consumer of the `VideoMediaBuffer` raised in the `VideoMediaReceived` event should resize the buffer to fit the `OriginalVideoFormat` size. Currently only NV12 format is supported for receive.

## Send audio media
If the `AudioSocket` is configured to send media, the bot should register for the `AudioSendStatusChanged` event handler on the `AudioSocket` to get notifications about sending status changes. The bot should start sending audio only after the send status changes to Active.

```cs
void AudioSocket_OnSendStatusChanged(
             object sender,
             AudioSendStatusChangedEventArgs args)
{
    switch (args.MediaSendStatus)
    {
    case MediaSendStatus.Active:
        // notify bot to begin sending audio 
        break;
     
    case MediaSendStatus.Inactive:
        // notify bot to stop sending audio
        break;
    }
}
```

To send audio media, it is assumed the PCM audio content is contained within a native heap-allocated buffer. The bot must derive from the `AudioMediaBuffer` abstract class. Media is sent asynchronously by the AudioSocket's `Send` method and the platform will call `Dispose` on the `AudioMediaBuffer` when the send completes. The bot should not release (or return to a pool allocator) the unmanaged resources when the `Send` returns. It must wait for `Dispose` to be called.

## Send video media
Sending video media is similar to that of audio media. The bot should register for `VideoSendStatusChanged` event and wait for `MediaSendStatus` to be `Active`. The bot must not release or reclaim the buffer's unmanaged resources until the `Dispose` method is called. RGB24, NV12, and Yuy2 color formats are supported.

While multiple `VideoFormat`s are supported for sending video, the `VideoFormat` that is currently preferred is communicated to the bot via the `VideoSendStatusChanged` event. The preferred `VideoFormat` for sending video may change due to network bandwidth conditions, or the peer client resizing its video window.

```cs
void VideoSocket_OnSendStatusChanged(
            object sender,
            VideoSendStatusChangedEventArgs args)
{
    VideoFormat preferredVideoFormat;

    switch (args.MediaSendStatus)
    {
    case MediaSendStatus.Active:
        // notify bot to begin sending audio 
        // bot is recommended to use this format for sourcing video content.
        preferredVideoFormat = args.PreferredVideoSourceFormat;
        break;
     
    case MediaSendStatus.Inactive:
        // notify bot to stop sending audio
        break;
    }
}
```

Each `VideoMediaBuffer` has a VideoFormat property to indicate the format of the video content for that particular buffer. While the `VideoFormat` property does not have to match the `PreferredVideoSourceFormat` property indicated in the `VideoSendStatusChanged` event, it is strongly recommended to use the indicated `PreferredVideoSourceFormat` to avoid wasteful CPU cycles spent on video frame resizing.

## Call notifications
### Call state changes
The bot can get call state change notifications by subscribing to the `NotificationType.CallStateChange` in `NotificationSubscriptions` of `RealTimeMediaIncomingCallEvent.RealTimeMediaWorkflow`.

```cs
private Task OnCallStateChangeNotification(CallStateChangeNotification callStateChangeNotification)
{
    if (callStateChangeNotification.CurrentState == CallState.Terminated)
    {   
        // stop sending media and dispose the media sockets
        _audioSocket.Dispose();
        _videoSocket.Dispose();
    }

    return Task.CompletedTask;
}
 ```

### Roster update
If the bot is added to a conference, it can listen to the roster of the conference by subscribing to `NotificationType.RosterUpdate` in `NotificationSubscriptions` of `RealTimeMediaIncomingCallEvent.RealTimeMediaWorkflow`. The `RosterUpdateNotification` has the details of all participants in the conference. The bot could choose to wait for a notification with a participant sending video and then `Subscribe` to the participant's video on one of its `VideoSocket` objects.

```cs
private async Task OnRosterUpdateNotification(RosterUpdateNotification rosterUpdateNotification)
{
    // Find a video source in the conference to subscribe
    foreach (RosterParticipant participant in rosterUpdateNotification.Participants)
    {
        if (participant.MediaType == ModalityType.Video
            && (participant.MediaStreamDirection == "sendonly" || participant.MediaStreamDirection == "sendrecv")
            )
        {
            var videoSubscription = new VideoSubscription
            {
                ParticipantIdentity = participant.Identity,
                OperationId = Guid.NewGuid().ToString(),
                SocketId = _videoSocket.SocketId,
                VideoModality = ModalityType.Video,
                VideoResolution = ResolutionFormat.Hd720p
            };

            await CallService.Subscribe(videoSubscription).ConfigureAwait(false);
            break;
        }
    }  
}
```

## End the call

### Handle call termination from the caller
When the user disconnects the call to the bot in a peer to peer conversation or when the bot is removed from the conference, the bot gets a call state change notification with the CallState as Terminated. The bot should dispose any media sockets it created.

### Terminate the call from the bot
The bot can choose to end the call by calling `EndCall` on `IRealTimeMediaCallService`.

### Handle call clean up by the Bot Framework
On error conditions (for example, if `AnswerAppHostedMediaOutcomeEvent` is not received within a reasonable time), the Bot Framework may terminate the call. The bot should register for `OnCallCleanup` event and dispose the media sockets.
