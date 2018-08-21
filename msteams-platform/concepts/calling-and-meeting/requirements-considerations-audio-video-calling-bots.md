---
title: Requirements and considerations for real-time media bots | Microsoft Docs
description: Understand important requirements and considerations related to creating real-time media bots for Skype, using the Bot Builder SDK for .NET.
keywords: 
ms.date: 12/13/17
---

# Requirements and considerations for real-time media bots

Not all guidance that applies to developing messaging and IVR calling bots applies equally to building real-time media bots. This article describes some of the important requirements and considerations for developing real-time media bots. 

> [!NOTE]
> Because the Real-Time Media Platform for Bots is a Preview technology, the guidance in this article is subject to change.

## Real-time media bot development requires C#/.NET and Windows Server

- The real-time media bot requires the `Microsoft.Skype.Bots.Media` .NET library (available via <a href="https://www.nuget.org/" target="_blank">NuGet</a>) to access the audio and video media, and the bot must be deployed on a Windows Server machine (or Windows Server guest OS in Azure). Therefore, the bot should be developed with C# and the Standard .NET Framework, and deployed in Azure. You cannot use C++ and Node.js APIs to access real-time media.

- The real-time media bot must be running on a recent version of the `Microsoft.Skype.Bots.Media` .NET library. The bot should use either the newest available version of the <a href="https://www.nuget.org/" target="_blank">NuGet</a> package, or a version which is not more than three months old. Older versions of the library will be deprecated and will not work after a few months.

## Real-time media calls stay on the machine where they were created

- Real-time media bots are very stateful. The real-time media call is pinned to the virtual machine (VM) instance which accepted the incoming call: voice and video media from the Skype caller will flow to that VM instance, and media the bot sends back to the caller must also originate from that VM.

- If there are any real-time media calls in progress when the VM is stopped, those calls will be abruptly terminated. If the bot can know of the pending VM shutdown, it can try to "gracefully" end the calls.

## Real-time media bots must be directly accessible on the Internet

- Each VM instance hosting a real-time media bot must be directly accessible from the Internet. For real-time media bots hosted in Azure, each VM instance must have an instance-level public IP address (ILPIP). For information about obtaining and configuring an ILPIP, see <a href="/azure/virtual-network/virtual-networks-instance-level-public-ip" target="_blank">Instance level public IP (Classic) overview</a>. By default, an Azure subscription can obtain 5 ILPIP addresses; please contact Azure support to increase your subscription's quota.

- Because of the public IP address requirement, real-time media bots must be hosted in either an "IaaS" Azure Virtual Machine, or a "classic" Azure Cloud Service. Other runtime environments, such as Bot Service or Service Fabric with VM Scale Sets, are not supported, as these do not support ILPIP.

- Real-time media bots are also not supported by the [Bot Framework Emulator](../bot-service-debug-emulator.md).

## Scalability and performance considerations

- Real-time media bots require more compute and network (bandwidth) capacity than messaging bots and may incur significantly higher operational costs. A real-time media bot developer must carefully measure the bot's scalability, and ensure the bot does not accept more simultaneous calls than it can manage. A video-enabled bot may be able to sustain only one or two concurrent real-time media calls per CPU core.

- The current Preview release of Real-Time Media Platform for Bots has certain scalability limitations the bot developer must be aware of (these may be improved in future releases): 
  1. A single VM instance may not have more than 10 video sockets created at any single time.
  2. The Real-Time Media Platform does not currently take advantage of any Graphics Processing Unit (GPU) available on the VM to off-load H.264 video encoding/decoding. Instead, video encode and decode are done in software on the CPU. If a GPU is available, the bot may take advantage of it for its own graphics rendering (e.g., if the bot is using a 3D graphics engine).

- The VM instance hosting the real-time media bot must have at least 2 CPU cores. For Azure, a Dv2-series virtual machine is recommended. Detailed information about Azure VM types is available in the <a href="/azure/virtual-machines/windows/sizes-general" target="_blank">Azure documentation</a>. 