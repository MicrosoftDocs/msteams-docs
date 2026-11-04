---
title: Manage Azure Bots with Developer Portal
description: Learn how to manage Azure bots using the Developer Portal for Microsoft Team
ms.topic: overview
ms.date: 11/04/2026
---

# Manage Azure bots in Developer Portal for Teams

Use [Developer Portal](https://dev.teams.microsoft.com/) for Teams to find existing Azure Bot resources and open their supported configuration settings. You don’t need to recreate or import an Azure bot to use this experience.

Azure-managed bots and Teams-managed bots have separate lists. An Azure-managed bot remains an Azure resource: Azure permissions govern its resource settings, and the Azure portal remains the place to manage its lifecycle and other properties.

## What you can do

| Task | Where to do it |
| --- | --- |
| Find Azure bots by subscription, resource group, or search | Developer Portal: Tools > Bot management > Azure-managed bots |
| View supported delivery settings | Open the bot and select Configure. HTTP endpoint and Socket Mode availability depends on the preview and your access. |
| Create or delete an Azure bot; manage channels, credentials, or its icon | Azure portal, or the linked identity management experience where applicable |
| Package, test, or publish a Teams app that uses the bot | The app’s workflow under Apps in Developer Portal |

## Prerequisites

- Access to Developer Portal with the Azure-managed bots preview enabled. The planned preview is for commercial-cloud tenants; it doesn’t include GCC Moderate or other sovereign clouds.
- An existing Azure Bot resource and Azure read permission at the resource, resource-group, or subscription scope. Only enabled subscriptions are included.
- To use the bot in Teams, enable the Microsoft Teams channel in Azure.

## Delivery settings at a glance

Configure provides HTTP endpoint settings and, for bots, Socket Mode. HTTP uses a messaging endpoint; Socket Mode uses an outbound connection for development. For setup steps, endpoint-access requirements, and delivery-specific troubleshooting, use the delivery-method documentation [Link to Socket mode documentation].

## Find an Azure bot

1. Sign in to [Developer Portal](https://dev.teams.microsoft.com/) and select **Tools** from the left pane.
1. Select **Bot management**, and then select **Azure-managed bots**. The Teams-managed bots tab is the default.
1. In **Subscription**, select a subscription or **All subscriptions**. Search the subscription picker by subscription name or ID. Bot results load after you choose a scope.
1. If you selected one subscription, optionally choose a **Resource group** to narrow the results. The resource-group picker is unavailable when All subscriptions is selected.
1. Use **Search app** to search bot name, display name, application ID, or resource group within your selected scope. Scroll to view more results or select **Load more** when available.
1. Select the bot’s name to open **Configure**. Verify the subscription and resource group, especially when bots share a name.

The App ID identifies the bot’s backing Microsoft Entra application. It isn’t the Teams app package’s app ID. Keep these identifiers separate when configuring your Teams app.

> [!NOTE]
>
> The list reflects Azure resources your signed-in account can read, not a list of applications you own. Seeing a bot doesn’t automatically grant permission to change its settings.

Developer Portal can remember a previously selected specific subscription if you still have access to it. All subscriptions isn’t restored automatically.

### If you don’t have an Azure bot

Select **Create an Azure bot** to open the Azure portal and create the resource there. Return to Developer Portal, select its subscription, and search again. New Azure resources and recent changes might take a short time to appear in the list.

### Enable the Microsoft Teams channel

You configure channels for Azure-managed bots in Azure, not on the Teams-managed bot Channels page in Developer Portal.

1. In the [Azure portal](https://portal.azure.com/), open your Azure Bot resource.
1. Select **Channels**, and then select **Microsoft Teams**.
1. Accept the terms of service if prompted. Select the appropriate cloud environment on the Messaging tab, and select Apply.
1. Return to your bot in Developer Portal and reload its details before continuing.

> [!NOTE]
>
> The Microsoft Teams bot channel connects an Azure bot to Teams. It isn’t a team or a conversation channel inside Teams. Enabling it doesn’t install or publish a Teams app.

For the complete Azure procedure, see [Connect a bot to Microsoft Teams](/azure/bot-service/channel-connect-teams?view=azure-bot-service-4.0&preserve-view=true).

## Troubleshoot Azure bot discovery

Use the message shown in Developer Portal to choose the recovery action. This section covers finding and opening Azure bots. Delivery-method setup, endpoint access, and save troubleshooting are covered in the separate delivery-method documentation.

| # | What you see | What to check or do |
| --- | --- | --- |
| 1. | Azure-managed bots isn’t available | Confirm that the preview is enabled for your tenant and supported in your cloud. The planned preview is commercial-cloud only. |
| 2. | No enabled subscriptions | Check the signed-in account and tenant. Ask the Azure resource owner to confirm your access and the subscription’s status. Disabled, warned, past-due, and deleted subscriptions aren’t included. |
| 3. | No Azure bots or no matching results | Check the subscription, resource group, and search text. Try All subscriptions. Confirm that the resource is an Azure Bot and that your account can read it. Allow time for recent Azure changes to appear. |
| 4. | We couldn’t load your subscriptions or bots | Select Retry. If the failure continues, check Azure access and service availability. A failed subscription load isn’t a complete empty inventory. |
| 5. | We couldn’t reach Azure | Check your network connection and select Retry. |
| 6. | No access to a subscription or bot | Ask the Azure resource owner to confirm that your account has read access. Retrying alone doesn’t grant missing permission. |
| 7. | Azure access isn’t available yet | Contact your administrator to confirm that Azure access is enabled for your tenant. |
| 8. | Policy blocked or Sign in again | Follow the sign-in action shown, or ask your administrator to review the blocking policy. Retry after the requirement is resolved. |
| 9. | Azure is busy | Wait for the retry interval shown, then retry. Avoid repeated rapid requests. |
| 10. | This Azure bot no longer exists | Return to Bot management. Check whether the resource was deleted or moved and locate its current subscription and resource group in Azure. |

## Manage other bot properties

On Configure, select the Azure portal link in Update other bot properties in Azure portal. Use Azure to manage the bot’s channels, icon, credentials, and other resource settings. Developer Portal doesn’t create, delete, or migrate the Azure resource.

### Test the bot as part of a Teams app

Listing an Azure bot doesn’t create, install, or publish its Teams app. Use Apps to configure the app that references the bot’s application ID, prepare its package, and test it in Teams. Your tenant must allow the applicable custom-app upload or installation workflow.

## Related content

- [Developer Portal overview](teams-developer-portal.md)
- [Manage apps with Developer Portal](manage-your-apps-in-developer-portal.md)
- [Connect a bot to Microsoft Teams](/azure/bot-service/channel-connect-teams?view=azure-bot-service-4.0&preserve-view=true)
- [Test your app](test-app-overview.md)
