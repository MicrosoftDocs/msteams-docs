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
- **Direct members**: These users are added explicitly to the channel.
- **Indirect members**: These users access the channel through a shared team.
Bots must be able to distinguish between these member types to operate correctly in collaborative environments.

Bots in shared channels can automate workflows, deliver notifications, and respond to user actions in real time. You can integrate bots into shared channels to streamline collaboration. 

## Get member event notifications for shared channels
Previously, bots subscribed to member events in shared channels only received notifications for direct members added to and removed from the shared channel. 

Microsoft Teams now supports bot notifications for both direct and indirect members. This enhancement expands its Bot Framework SDK to support notifications for indirect members in shared channels. 
This update improves visibility into membership changes across teams, enabling bots to more effectively track user access in collaborative environments. It builds on the existing capability for bots to subscribe to `conversationUpdate` events in channels.

With this enhancement, bots now receive events for indirect members who gain acces through:
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
2. Request Resource-Specific Consent (RSC) permission 

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

    To receive member event notifications, install the bot at the team level and manually allow it in the shared channel. 


    This ensures the bot is active and authorized to receive notifications for both direct and indirect members.

### Verify app addition to a channel

There’s no dedicated API to check if your app is part of a channel. Bots can detect when your app is added to a channel indirectly.

When your bot receives a `channelMemberAdded` event for itself in a `conversationUpdate`, your app is added to the channel.

Use this event to trigger app-specific logic such as:

* Sending a welcome message
* Fetching the channel roster
* Configuring tabs
* Starting scheduled jobs

Bot events (like messages and mentions) will only begin after your app is added to the channel.

### Identify external users and guests in Teams channels

When building apps or bots for Microsoft Teams, you need to distinguish between internal, guest, and external (cross-tenant) users. This distinction is useful for:

* Enforcing access controls for sensitive operations
* Tailoring UI behavior based on user type (for example, hiding features for guests or external users)
* Managing authentication flows in tabs or bots

#### Detect user type at run time
You can use `aadObjectId` received in activity payloads to match the member who invoked the activity with the member list returned by `getPagedMembersAsync`.

#### Identify guest users

Use either `TeamsInfo.getMemberAsync` or `TeamsInfo.getPagedMembersAsync`, and check if `userRole === "guest"`.

#### Identify external users

Each incoming activity for the bot includes `channelData.tenantId`. Compare this value with `membershipSource.tenantId` from the `getPagedMembersAsync` response. If the tenant IDs don't match, the user is considered as an external user.

#### Detect user type from membership data 

Use `TeamsInfo.getPagedMembersAsync` to retrieve membership details.

- For guest users, check if `UserRole === "guest"` in `TeamsChannelAccount`.
- For external users, compare `conversation.tenantId` with `membershipSource.tenantId` in the member payload. If the tenant IDs differ, the user is external.

When a channel member is added or removed, the event payload includes both `conversation.tenantId` and `membershipSource.tenantId`. Compare these values to determine if the member is an external user or not.

## Manage member added and removed events

The following Bot Framework SDK examples apply to both direct and indirect member add and remove events. To receive transitive member events, ensure your bot is set up with all the prerequisites.

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

### Shared and unshared with team events

When a shared channel is added to another team, the Bot Framework might receive a `conversationUpdate` activity through the ```OnConversationUpdateActivityAsync``` method, but only if the bot is installed in the team or channel.

```csharp
        protected override async Task OnConversationUpdateActivityAsync(
            ITurnContext<IConversationUpdateActivity> turnContext,
            CancellationToken cancellationToken)
        {
            var tcd = turnContext.Activity.GetChannelData<TeamsChannelData>();
            var eventType = tcd?.EventType?.ToLowerInvariant();

            var extended = turnContext.Activity.GetChannelData<SharedChannelChannelData>();

            var raw = turnContext.Activity.ChannelData as JObject
                      ?? (turnContext.Activity.ChannelData != null
                          ? JObject.FromObject(turnContext.Activity.ChannelData)
                          : new JObject());

            _logger.LogInformation("ConversationUpdate eventType={EventType}, channelId={ChannelId}, teamId={TeamId}",
                eventType, tcd?.Channel?.Id, tcd?.Team?.Id);

            switch (eventType)
            {
                case "channelshared":
                {
                    var hostTeam = extended?.Team; 
                    var sharedWith = extended?.SharedWithTeams ?? new List<TeamInfoEx>();

                    _logger.LogInformation("ChannelShared: hostTeam={HostTeamId}, sharedWithCount={Count}",
                        hostTeam?.Id, sharedWith.Count);

                    foreach (var team in sharedWith)
                    {
                        _logger.LogInformation("SharedWithTeam: id={Id}, name={Name}, aadGroupId={AadGroupId}, tenantId={TenantId}",
                            team.Id, team.Name, team.AadGroupId, team.TenantId);
                    }

                    await turnContext.SendActivityAsync(
                        MessageFactory.Text($" Channel shared with {sharedWith.Count} team(s)."),
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
                        MessageFactory.Text($" Channel unshared from {unsharedFrom.Count} team(s)."),
                        cancellationToken);
                    break;
                }

                default:
                    break;
            }

            await base.OnConversationUpdateActivityAsync(turnContext, cancellationToken);
        }
```

---

## Code sample

## See also
[Shared channels in Microsoft Teams](/microsoftteams/shared-channels)
