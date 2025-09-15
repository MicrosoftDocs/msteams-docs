---
title: Enhance collaboration with bots in shared channels
author: surbhigupta
description: Learn about updates in indirect membership for bots.
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: conceptual
ms.date: 09/12/2025
---
# Enhance collaboration with bots in shared channels

Shared channels in Microsoft Teams enable collaboration across teams and organizations. 
Users in these channels are of two types: 
- **Direct members**: These users are added explicitly to the channel
- **Indirect members**: These users access the channel through a shared team.

Bots in shared channels can automate workflows, deliver notifications, and respond to user actions in real time. You can integrate bots into shared channels to streamline collaboration. 

## Get member event notifications for shared channels in Microsoft Teams
Previously, bots subscribed to member events in shared channels only received notifications for direct members added to and removed from the shared channel. 

Microsoft Teams now supports bot notifications for both direct and indirect members. This enhancement expands its Bot Framework SDK to support notifications for indirect members in shared channels. 
This update improves visibility into membership changes across teams, enabling bots to more effectively track user access in collaborative environments. It builds on the existing capability for bots to subscribe to `conversationUpdate` events in channels.

With this enhancement, bots now also receive events for indirect members, who gain access through:
* Membership in a team that the channel is shared with
* Updates to the team’s roster

### Enable member event notifications for shared channels

To receive `conversationUpdate` event notifications when indirect members are added or removed, configure your bot with the following prerequisites:

1. Update the App manifest

 To declare support for shared channels, add the `supportedChannelTypes` property to your app manifest:

```JSON
    "supportedChannelTypes": [
        "sharedChannels",
    ]
```
2. Resource-Specific Consent (RSC) permission 

Your app must request the following RSC permission to access channel membership information:

```json
{
  "authorization": {
    "permissions": {
      "resourceSpecific": [
        {
          "name": "ChannelMember.Read.Group",
          "type": "Application"
        }
      ]
    }
  }
}
```

3. Ensure the bot is enabled in the shared channel

To receive member event notifications:

1. Install the bot at the team level.

2. Manually allow the bot in each shared channel.

These steps ensure the bot is active and authorized to receive notifications for both direct and indirect members.

## Manage member added and removed events

The following Bot Framework SDK examples apply to both direct and indirect member add and remove events. To receive transitive member events, ensure your bot is set up with all prerequisites .

### Member added event

```csharp
public async Task OnMembersAddedAsync(ITurnContext turnContext, AppState turnState, CancellationToken cancellationToken)
{
    var membersAdded = turnContext.Activity.MembersAdded;

    List<string> addedMembers = new List<string>();
    foreach (var member in membersAdded)
    {
        if (member.Id != turnContext.Activity.Recipient.Id)
        {
            addedMembers.Add($"Member {member.Name} (ID {member.Id}) added.");
        }
    }

    await ActivityUtils.SendAdaptiveCard(
        "Member Added",
        addedMembers,
        new List<object> { "membersAdded", membersAdded },
        turnContext,
        cancellationToken).ConfigureAwait(false);
}
```
### Member removed event
```csharp
public async Task OnMembersRemovedAsync(ITurnContext turnContext, AppState turnState, CancellationToken cancellationToken)
{
    var membersRemoved = turnContext.Activity.MembersRemoved;

    List<string> removedMembers = new List<string>();
    foreach (var member in membersRemoved)
    {
        if (member.Id != turnContext.Activity.Recipient.Id)
        {
            removedMembers.Add($"Member {member.Name} (ID {member.Id}) removed.");
        }
    }

    await ActivityUtils.SendAdaptiveCard(
        "Member Removed",
        removedMembers,
        new List<object> { "membersRemoved", membersRemoved },
        turnContext,
        cancellationToken).ConfigureAwait(false);
}
```

### Membership Changes 

When a shared channel is added to another team, the Bot Framework might receive a `conversationUpdate` activity through the ```OnConversationUpdateActivityAsync``` method, but only if the bot is installed in the team or channel.

```csharp
        protected override async Task OnConversationUpdateActivityAsync(
            ITurnContext<IConversationUpdateActivity> turnContext,
            CancellationToken cancellationToken)
        {
            // Always present on Teams activities
            var tcd = turnContext.Activity.GetChannelData<TeamsChannelData>();
            var eventType = tcd?.EventType?.ToLowerInvariant();

            // Read extended shared-channel shape (safe even if fields are absent)
            var extended = turnContext.Activity.GetChannelData<SharedChannelChannelData>();

            // Also keep a raw JObject for logging / future-proof access
            var raw = turnContext.Activity.ChannelData as JObject
                      ?? (turnContext.Activity.ChannelData != null
                          ? JObject.FromObject(turnContext.Activity.ChannelData)
                          : new JObject());

            // Helpful baseline log
            _logger.LogInformation("ConversationUpdate eventType={EventType}, channelId={ChannelId}, teamId={TeamId}",
                eventType, tcd?.Channel?.Id, tcd?.Team?.Id);

            switch (eventType)
            {
                case "channelshared":
                {
                    var hostTeam = extended?.Team; // The channel's host team
                    var sharedWith = extended?.SharedWithTeams ?? new List<TeamInfoEx>();

                    _logger.LogInformation("ChannelShared: hostTeam={HostTeamId}, sharedWithCount={Count}",
                        hostTeam?.Id, sharedWith.Count);

                    foreach (var team in sharedWith)
                    {
                        _logger.LogInformation("SharedWithTeam: id={Id}, name={Name}, aadGroupId={AadGroupId}, tenantId={TenantId}",
                            team.Id, team.Name, team.AadGroupId, team.TenantId);
                    }

                    // Optional: surface a quick confirmation in-channel
                    await turnContext.SendActivityAsync(
                        MessageFactory.Text($"✅ Channel shared with {sharedWith.Count} team(s)."),
                        cancellationToken);
                    break;
                }

                case "channelunshared":
                {
                    var unsharedFrom = extended?.UnsharedFromTeams ?? new List<TeamInfoEx>();

                    _logger.LogInformation("ChannelUnshared: unsharedFromCount={Count}", unsharedFrom.Count);

                    foreach (var team in unsharedFrom)
                    {
                        _logger.LogInformation("UnsharedFromTeam: id={Id}, name={Name}, aadGroupId={AadGroupId}, tenantId={TenantId}",
                            team.Id, team.Name, team.AadGroupId, team.TenantId);
                    }

                    await turnContext.SendActivityAsync(
                        MessageFactory.Text($"❎ Channel unshared from {unsharedFrom.Count} team(s)."),
                        cancellationToken);
                    break;
                }

                default:
                    // No-op; continue normal routing
                    break;
            }

            await base.OnConversationUpdateActivityAsync(turnContext, cancellationToken);
        }
```

---

## Code sample

## See also
[Shared channels in Microsoft Teams](/microsoftteams/shared-channels)
