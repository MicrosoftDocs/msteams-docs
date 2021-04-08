---
title: Requirements and considerations for application-hosted media bots
description: Understand important requirements and considerations related to creating application-hosted media bots for Microsoft Teams.
ms.topic: conceptual
keywords: application-hosted media windows server azure vm
ms.date: 11/16/2018
---

# Requirements and considerations for application-hosted media bots

Not all guidance for developing messaging and Interactive Voice Response (IVR) bots applies equally to building application-hosted media bots. This article describes some of the important requirements and considerations for developing and running an application-hosted media bot.

> [!NOTE]
> Because the Microsoft Real-time Media Platform for Bots is in developer preview, the guidance in this article is subject to change.

## Application-hosted media bot development requires C#/.NET and Windows Server

- An application-hosted media bot requires the `Microsoft.Graph.Communications.Calls.Media` .NET library ([available here](https://www.nuget.org/packages/Microsoft.Graph.Communications.Calls.Media/) to access the audio and video media streams, and the bot must be deployed on a Windows Server machine (or Windows Server guest OS in Azure). Therefore, the bot must be developed in C# and the standard .NET Framework and deployed in Microsoft Azure. You can't use C++ or Node.js APIs to access real-time media and .NET Core is not supported for an application-hosted media bot.

- An application-hosted media bot can be hosted within one of the following Azure service environments:
  - Cloud Service.
  - Service Fabric with Virtual Machine Scale Sets (VMSS).
  - Infrastructure as a Service (IaaS) Virtual Machine (VM).  
  
- An application-hosted media bot can't be deployed as an Azure Web App.

- An application-hosted media bot must be running on a recent version of the `Microsoft.Graph.Communications.Calls.Media` .NET library. The bot should use either the newest available version of the [NuGet package](https://www.nuget.org/packages/Microsoft.Graph.Communications.Calls.Media/), or a version that is not more than three months old. Older versions of the library will be deprecated and may not work after a few months. Keeping the `Microsoft.Graph.Communications.Calls.Media` library up-to-date will ensure the best interoperability between the bot and Microsoft Teams.

## Real-time media calls stay on the machine where they were created

- A real-time media call is pinned to the virtual machine (VM) instance that accepted or started the call. Media from a Microsoft Teams call or meeting will flow to that VM instance, and media the bot sends back to Microsoft Teams must also originate from that VM.
- If there are any real-time media calls in progress when the VM is stopped, those calls will be abruptly terminated. If the bot has prior knowledge of the pending VM shutdown, it can try to "gracefully" end the calls.

## Application-hosted media bots must be directly accessible on the internet

- Each VM instance hosting an application-hosted media bot in Azure must be directly accessible from the internet using an instance-level public IP address (ILPIP).
  - For obtaining and configuring an ILPIP for an Azure Cloud Service, see [Instance level public IP (Classic) overview](/azure/virtual-network/virtual-networks-instance-level-public-ip).
  - For configuring an ILPIP for a VM Scale Set, see [Public IPv4 per virtual machine](/azure/virtual-machine-scale-sets/virtual-machine-scale-sets-networking#public-ipv4-per-virtual-machine).
- The service hosting an application-hosted media bot must also configure each VM instance with a public-facing port which maps to the specific instance.
  - For an Azure Cloud Service, this requires an instance input endpoint; see [Enable communication for role instances in Azure](/azure/cloud-services/cloud-services-enable-communication-role-instances).
  - For a VM Scale Set, a NAT rule on the load balancer must be configured; see [Virtual networks and virtual machines in Azure](/azure/virtual-machines/windows/network-overview).
- Application-hosted media bots aren't supported by the Bot Framework Emulator.

## Scalability and performance considerations

- Application-hosted media bots require more compute and network (bandwidth) capacity than messaging bots and may incur significantly higher operational costs. A real-time media bot developer must carefully measure the bot's scalability, and ensure the bot doesn't accept more simultaneous calls than it can manage. A video-enabled bot may be able to sustain only one or two concurrent media sessions per CPU core (if using the "raw" RGB24 or NV12 video formats).
- The Real-time Media Platform doesn't currently take advantage of any Graphics Processing Units (GPU) available on the VM to off-load H.264 video encoding/decoding. Instead, video encode and decode are done in software on the CPU. If a GPU is available, the bot may take advantage of it for its own graphics rendering (e.g. if the bot is using a 3D graphics engine).
- The VM instance hosting the real-time media bot must have at least 2 CPU cores. For Azure, a Dv2-series virtual machine is recommended. For other Azure VM types, a system with 4 virtual CPUs (vCPU) is the minimum size required. Detailed information about Azure VM types is available in the [Azure documentation](/azure/virtual-machines/windows/sizes-general).

## Code sample

Application-hosted media bots samples are as follows:

| **Sample name** | **Description** | **Graph** |
|------------|-------------|-----------|
| Local media sample | Samples that illustrates different local media scenarios. | [View](https://github.com/microsoftgraph/microsoft-graph-comms-samples/tree/master/Samples/V1.0Samples/LocalMediaSamples) |
| Remote media sample | Samples that illustrates different remote media scenarios. | [View](https://github.com/microsoftgraph/microsoft-graph-comms-samples/tree/master/Samples/V1.0Samples/RemoteMediaSamples) |

## See also

- [Graph Calling SDK Documentation](https://microsoftgraph.github.io/microsoft-graph-comms-samples/docs/)