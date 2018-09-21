---
title: Requirements and considerations for real-time media bots
description: Understand important requirements and considerations related to creating real-time media bots for Microsoft Teams.
keywords: real-time media windows server azure vm
ms.date: 09/10/2018
---

# Requirements and considerations for real-time media bots

Not all guidance for developing messaging and IVR calling bots applies equally to building real-time media bots. This article describes some of the important requirements and considerations for developing and running a real-time media bot.

> [!NOTE]
> Because the Microsoft Real-Time Media Platform for Bots is a Preview technology, the guidance in this article is subject to change.

## Real-time media bot development requires C#/.NET and Windows Server

- A real-time media bot requires the `Microsoft.Skype.Bots.Media` .NET library (available via <a href="https://www.nuget.org/" target="_blank">NuGet</a>) to access the audio and video media streams, and the bot must be deployed on a Windows Server machine (or Windows Server guest OS in Azure). Therefore, the bot should be developed with C# and the standard .NET Framework, and deployed in Microsoft Azure. You cannot use C++ or Node.js APIs to access real-time media. .NET Core is not supported for a real-time media bot.

- A real-time media bot can be hosted within one of the following Azure service environments:
  - Cloud Service
  - Service Fabric with Virtual Machine Scale Sets (VMSS)
  - Infrastructure as a Service (IaaS) Virtual Machine (VM)  

  A real-time media bot cannot be deployed as an Azure Web App.

- A real-time media bot must be running on a recent version of the `Microsoft.Skype.Bots.Media` .NET library. The bot should use either the newest available version of the <a href="https://www.nuget.org/" target="_blank">NuGet</a> package, or a version which is not more than three months old. Older versions of the library will be deprecated and may not work after a few months. Keeping the `Microsoft.Skype.Bots.Media` library up-to-date will ensure the best interoperability between the bot and Microsoft Teams.

## Real-time media calls stay on the machine where they were created

- A real-time media call is pinned to the virtual machine (VM) instance which accepted or started the call. Media from the Microsoft Teams caller or meeting will flow to that VM instance, and media the bot sends back to Microsoft Teams must also originate from that VM.

- If there are any real-time media calls in progress when the VM is stopped, those calls will be abruptly terminated. If the bot can know of the pending VM shutdown, it can try to "gracefully" end the calls.

## Real-time media bots must be directly accessible on the Internet

- Each VM instance hosting a real-time media bot in Azure must be directly accessible from the Internet using an instance-level public IP address (ILPIP).
  - For obtaining and configuring an ILPIP for an Azure Cloud Service, see <a href="/azure/virtual-network/virtual-networks-instance-level-public-ip" target="_blank">Instance level public IP (Classic) overview</a>.
  - For configuring an ILPIP for a VM Scale Set, see <a href="/azure/virtual-machine-scale-sets/virtual-machine-scale-sets-networking#public-ipv4-per-virtual-machine" target="_blank">Public IPv4 per virtual machine</a>.

- The service hosting a real-time media bot must also configure each VM instance with a public-facing port which maps to the specific instance.
  - For an Azure Cloud Service, this requires an instance input endpoint; see <a href="/azure/cloud-services/cloud-services-enable-communication-role-instances" target="_blank">Enable communication for role instances in azure</a>.
  - For a VM Scale Set, a NAT rule on the load balancer must be configured; see <a href="/azure/virtual-machines/windows/network-overview" target="_blank">Virtual networks and virtual machines in Azure</a>.

- Real-time media bots are not supported by the Bot Framework Emulator.

## Scalability and performance considerations

- Real-time media bots require more compute and network (bandwidth) capacity than messaging bots and may incur significantly higher operational costs. A real-time media bot developer must carefully measure the bot's scalability, and ensure the bot does not accept more simultaneous calls than it can manage. A video-enabled bot may be able to sustain only one or two concurrent media sessions per CPU core (if using the "raw" RGB24 or NV12 video formats).

- The Real-Time Media Platform does not currently take advantage of any Graphics Processing Unit (GPU) available on the VM to off-load H.264 video encoding/decoding. Instead, video encode and decode are done in software on the CPU. If a GPU is available, the bot may take advantage of it for its own graphics rendering (e.g., if the bot is using a 3D graphics engine).

- The VM instance hosting the real-time media bot must have at least 2 CPU cores. For Azure, a Dv2-series virtual machine is recommended. For other Azure VM types, a system with 4 virtual CPUs (vCPU) is the mininum size required. Detailed information about Azure VM types is available in the <a href="/azure/virtual-machines/windows/sizes-general" target="_blank">Azure documentation</a>.
