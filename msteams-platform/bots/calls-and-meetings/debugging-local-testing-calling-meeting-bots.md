---
title: Debug your calling and meeting bot locally
description: In this module, learn how you can also use ngrok to develop calls and online meeting bots on your local PC.
ms.topic: how-to
ms.localizationpriority: medium
ms.date: 11/18/2018
---

# Develop calling and online meeting bots on your local PC

In [Run and debug your app](../../concepts/build-and-test/debug.md), we explain how to use [ngrok](https://ngrok.com) to create a tunnel between your local computer and the internet. In this topic, learn how you can also use ngrok and your local PC to develop bots that support calls and online meetings.

Messaging bots use HTTP, but calls and online meeting bots use the lower-level TCP. Ngrok supports TCP tunnels in addition to HTTP tunnels.

## Configure ngrok.yml

Go to [ngrok](https://ngrok.com) and sign up for a free account or log into your existing account. After you've signed in, go to the [dashboard](https://dashboard.ngrok.com) and get your auth token.

Create a ngrok configuration file `ngrok.yml` and add the following line. For more information on where the file can be located, see [ngrok](https://ngrok.com/docs#config):

  `authtoken: <Your-AuthToken>`

## Set up signaling

In [Calls and online meetings bots](./calls-meetings-bots-overview.md), we discussed call signaling on how bots detect and respond to new calls and events during a call. Call signaling events are sent through HTTP POST to the bot's calling endpoint.

As with the bot's messaging API, for the Real-time Media Platform to talk to your bot, your bot must be reachable over the internet. Ngrok makes this simple. Add the following lines to your ngrok.yml:

```yaml
tunnels:
    signaling:
        addr: 12345
        proto: http
```

## Set up local media

> [!NOTE]
> This section is only required for application-hosted media bots and can be skipped if you don't host media yourself.

Application-hosted media uses certificates and TCP tunnels. The following steps are required:

1. Ngrok's public TCP endpoints have fixed URLs. They're `0.tcp.ngrok.io`, `1.tcp.ngrok.io`, and so on. You must have a DNS CNAME entry for your service that points to these URLs. For example, let's say `0.bot.contoso.com` refers to `0.tcp.ngrok.io`, `1.bot.contoso.com` refers to `1.tcp.ngrok.io`, and so on.
2. An SSL certificate is required for your URLs. To make it easy, use an SSL certificate issued to a wild card domain. In this case, it would be `*.bot.contoso.com`. This SSL certificate is validated by the media SDK, so it must match your bot's public URL. Note the thumbprint and install it in your machine certificates.
3. Now, set up a TCP tunnel to forward the traffic to localhost. Write the following lines into your ngrok.yml:

    ```yaml
    media:
        addr: 8445
        proto: tcp
    ```

## Start ngrok

Now that the ngrok configuration is ready, launch it:

  `ngrok.exe start -all -config <Path to your ngrok.yml>`

This starts ngrok and defines the public URLs, which provide the tunnels to your localhost. Following is an example of the output:

```cmd
Forwarding  http://signal.ngrok.io -> localhost:12345
Forwarding  https://signal.ngrok.io -> localhost:12345
Forwarding  tcp://1.tcp.ngrok.io:12332 -> localhost:8445
```

Here, `12345` is the signaling port, `8445` is the application-hosted port, and `12332` is the remote media port exposed by ngrok. Note that we have a forwarding from `1.bot.contoso.com` to `1.tcp.ngrok.io`. This will be used as the media URL for the bot. Of course, these port numbers are just examples and you can use any available port.

### Update code

After ngrok is up and running, update the code to use the config you just set up.

#### Update signaling

In the BotBuilder call, change the `NotificationUrl` to the signaling URL provided by ngrok.

```csharp
statefulClientBuilder.SetNotificationUrl(
    new Uri("https://signal.ngrok.io/notificationEndpoint"))
```

> [!NOTE]
> Replace signal with the one provided by ngrok and the `NotificationEndpoint` with the controller path that receives notification.

> [!IMPORTANT]
>
> * The URL in `SetNotificationUrl` must be HTTPS.
>
> Your local instance must be listening to HTTP traffic on the signaling port. The requests made by the calls and online meetings platform will reach the bot as localhost HTTP traffic unless end-to-end encryption is set up.

#### Update media

Update your `MediaPlatformSettings` as following:

```csharp
var mediaPlatform = new MediaPlatformSettings
{
    ApplicationId = <Your application id>
    MediaPlatformInstanceSettings = new MediaPlatformInstanceSettings
    {
        CertificateThumbprint = <Your SSL Cert thumbprint>,
        InstanceInternalPort = <Localhost media port>,
        InstancePublicPort = <Ngrok exposed remote media port>,
        InstancePublicIPAddress = new IPAddress(0x0),
        ServiceFqdn = <Media url for bot (eg: 1.bot.contoso.com)>,
    },
}
```

> [!NOTE]
> The certificate thumbprint provided in the `MediaPlatformSettings` must match the Service FQDN. That is why the DNS entries are required.

## Caveats

* Ngrok free accounts **don't** provide end-to-end encryption. The HTTPS data ends at the ngrok URL and the data flows unencrypted from ngrok to `localhost`. If you require end-to-end encryption, consider a paid ngrok account. See [TLS tunnels](https://ngrok.com/docs#tls) for steps on setting up secure end-to-end tunnels.
* Because the bot callback URL is dynamic, incoming call scenarios require you to frequently update your ngrok endpoints. One way to fix this is to use a paid ngrok account, which provides fixed subdomains to which you can point your bot and the platform.
* Ngrok tunnels can also be used with [Azure Service Fabric](/azure/service-fabric/service-fabric-overview). For an example of how to do this, see the [HueBot sample app](https://github.com/microsoftgraph/microsoft-graph-comms-samples/tree/master/Samples/V1.0Samples/LocalMediaSamples/HueBot/HueBot).

## See also

* [Test your app](../../concepts/build-and-test/test-app-overview.md)
* [Test and debug your bot locally with IDE](../how-to/debug/locally-with-an-ide.md)
