# Enhance collaboration with bots in Microsoft Teams shared channels

Shared channels in Microsoft Teams enable collaboration across teams and organizations. 
Users in these channels can be of two types: 
- **Direct members**: These are users that are added explicitly to the channel
- **Indirect members**: These are users who access the channel through a shared team.

Bots in shared channels can automate workflows, deliver notifications, and respond to user actions in real time. You can integrate bots into shared channels to streamline collaboration. 

## Get member event notifications for shared channels in Microsoft Teams
Previously, bots subscribed to member events in shared channels only received notifications for direct members added to and removed from the shared channel. 

Microsoft Teams now supports bot notifications for both direct and indirect members. This enhancement expands its Bot Framework SDK to support notifications for indirect members in shared channels. 
This update improves visibility into membership changes across teams, enabling bots to more effectively track user access in collaborative environments. It builds on the existing capability for bots to subscribe to `conversationUpdate` events in channels.

With this enhancement, bots now also receive events for indirect members, who gain access through:
* Membership in a team that the channel is shared with
* Updates to the team’s roster

### Enable member event notifications for shared channels

To receive `conversationUpdate` event notifications when indirect members are added or removed, configure your bot with the following pre-requisites:
1. Update the App Manifest

Add the `supportedChannelTypes` property to your app manifest to declare support for shared channels:

```JSON
    "supportedChannelTypes": [
        "sharedChannels",
    ]
```
2. RSC Permission 

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

This ensures the bot is active and authorized to receive notifications for both direct and indirect members.

## Handle member add and remove events

The following Bot Framework SDK examples apply to both direct and indirect member add and remove events. Ensure your bot is set up with all prerequisites to receive transitive member events.

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

## Code sample

## See also
[Shared channels in Microsoft Teams](/microsoftteams/shared-channels)
