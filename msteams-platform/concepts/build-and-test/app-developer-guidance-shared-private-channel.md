---
title: Teams Connects Shared and Private Channels
author: surbhigupta
description: Explore Teams Connect shared channels to collaborate securely with both internal and external users in one shared space.
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: conceptual
ms.date: 04/09/2025
---
# Adapting Microsoft Teams App for Private and Shared Channels: A Developer's Guide

As Microsoft Teams evolves, shared and private channels introduce new collaboration patterns that differ significantly from Standard channels. To function reliably and securely across all channel types, apps must become context-aware—specifically in terms of:

- Membership structure
- Storage architecture
- Privacy boundaries

This guide helps you understand the updates, best practices, and testing steps needed to adapt your app for private and shared channels.

## Updating Your App Ensures

- Visible and usable everywhere: Your app can be added to private and shared channels, not just standard ones.
- Works as expected: Your app handles channel-specific members and file storage correctly.
- Safe and secure: Your app respects privacy rules and avoids data leaks between channels.
- Future Readiness: Your app follows Microsoft’s direction to support private and shared channels.

What This Guide Covers?

- key concepts (membership, access, installation, storage)
- Implementation steps
- testing guidance
- Best practices

## Channel Models in Microsoft Teams

### Standard Channels

- Visible to the entire team
- All team members have access to the channel by default

### Private Channels

- Access limited to invited team members only
- Files are stored in the channel’s dedicated SharePoint site

### Shared Channels

- Including external and nonhost team members
- Sharing with individuals or teams across organizations
- Storing files in the channel’s dedicated SharePoint sit

## Shared Channel Capabilities

### Teams Channel Models – Capabilities Comparison

| **Category** | **Capability**                                                                 | **Standard Channel** | **Private Channel** | **Shared Channel** |
|--------------|----------------------------------------------------------------------------------|----------------------|---------------------|---------------------|
| **Membership** | Can add people to the channel without adding to the host team                 | No                   | No                  | Yes                 |
|              | Channel membership can be limited to a subset of the host team                 | No                   | Yes                 | Yes                 |
|              | Channel can be shared with other teams to inherit members from the team        | No                   | No                  | Yes                 |
|              | Channel can be shared directly with its parent team to inherit members         | N/A                  | No                  | Yes                 |
|              | Guests (B2B Guests) can participate in the channel                             | Yes                  | Yes                 | No                  |
|              | External participants (B2B Direct Connect) can participate in the channel      | No                   | No                  | Yes                 |
|              | Channel is hosted under a host team                                            | Yes                  | Yes                 | Yes                 |
| **Storage**   | Each channel has a dedicated SharePoint site                                  | No (inherits team site) | Yes              | Yes                 |
| **App Model** | App must be installed in the host team                                        | Yes                  | Yes                 | Yes                 |
|              | App installed to host team automatically available in channel                 | Yes                  | No                  | No                  |
|              | App must be added to each channel                                              | No                   | Yes                 | Yes                 |

> **Note:**  

> - Currently, only apps that include tabs are supported in private and shared channels in Microsoft Teams.  
> - Tab apps in shared channels are available in [Government Community Cloud (GCC), GCC High, Department of Defense (DoD)](../cloud-overview.md#teams-app-capabilities), and [Teams operated by 21Vianet](../sovereign-cloud.md) environments.  
> - SharePoint and the SharePoint pages apps aren't supported for shared channels in GCC, GCC High, DoD, and Teams operated by 21Vianet environments.  
> - Bots and message extensions are not supported in shared channels.

## Understanding How Your Teams App Works in Private and Shared Channels

Microsoft Teams supports different types of channels—Standard, Private, and Shared. Each has unique rules for membership, storage, and access. To ensure your app works reliably and securely, it’s important to understand these differences.

### Channel Membership Considerations

- Private and Shared channels include only selected members; team membership isn't automatic.
- Private and Shared channels deliver app messages or notifications exclusively to users who are members of that specific channel.
- Private and Shared channels require the use of channel-designated tools to view or manage membership accurately.

### External and Guest Users

- Shared channels might include users from outside your organization or tenant.
- These users might have limited permissions depending on their role.
- Tip: Always check user roles before assigning tasks or granting access through the app.

### File Storage Behavior in Private and Shared Channels

- Private and Shared channels use dedicated SharePoint sites for storing files.
- Private and Shared channels require apps to access or save documents using the correct site linked to the channel.
- Private and Shared channels work best when your app is configured to locate and use the associated SharePoint site.

### Data Privacy and Scope

- Apps that collect or display data (like analytics or reports) should only show information from the current channel.
- Aggregating data across channels can expose private content to unintended users.
- Tip: Keep data scoped to the channel unless broader sharing is explicitly allowed.

### Implementation Guidelines for Developers

- Confirm your app is installed in the correct channel type.
- Check membership lists before sending messages or assigning tasks.
- Use approved SharePoint sites for file access.
- Be cautious when sharing or aggregating data across channels.

## Core Implementation Concepts for Shared and Private Channels

![This diagram shows how membership works in shared channels across organizations.](../../assets/images/membership-types-shared-channels.png)

![This diagram shows how direct membership works in a private channel.](../../assets/images/membership-types-private-channels.png)

## Channel Membership Basics

Every channel—whether Standard, Private, or Shared—lives inside a host team. Understanding how users are added to these channels helps you build apps that behave correctly for different member types.

### Direct vs. Indirect Membership

Private Channels

- Only members of the host team can be added directly.

Shared Channels

- Can include direct members from:
  - The host team
  - Other users within the same organization
  - Users from external organizations (via B2B Direct Connect)

Indirect Members (Shared Channels Only)

- A shared channel can be linked to other teams (inside or outside your org).
- Members of those teams get indirect access to the channel.

### Types of Users in Channels

Understanding user types helps you tailor app behavior:

| **User Type**        | **Description**                                                      | **Channel Access**                        |
|----------------------|----------------------------------------------------------------------|-------------------------------------------|
| Host Team Users      | Members of the team where the channel was created                   | Standard, Private, Shared                 |
| In-Tenant Users      | Users from your organization, not necessarily in the host team      | Shared channels only                      |
| Guest Users          | External users added as B2B guests in your organization             | Standard and Private channels only        |
| External Users       | Users from other organizations via B2B Direct Connect               | Shared channels only                      |

### Developer Tips

- Always fetch channel members, not team members—channel membership is what matters.
- Use user roles to adjust app behavior:
    For example, limit actions for external users to protect sensitive features.

## SharePoint Storage for Private and Shared Channels

Each Private or Shared channel has its own SharePoint site, separate from the host team's site. This site includes:

- A dedicated document library
- Channel-specific folders, lists, and pages

### Key Considerations

- Ensure you're targeting the channel’s site—not the team’s root site—when uploading or retrieving files, or interacting with SharePoint lists/pages.
- Use 'people with existing access' links to respect channel-level permissions when sharing files or links.
- Call the Microsoft Graph invite API to explicitly grant access, especially for external users in shared channels.

## App Installation in Private and Shared Channels

To make your app available in Private or Shared channels, you need to explicitly declare support in the app manifest. Unlike Standard channels, where installing the app at the team level is sufficient, Private and Shared channels require an extra step.

### Installation Workflow

- Install the app at the team level.
- Add the app to the specific channel. A channel owner or member adds the app to each Private or Shared channel as needed.

 Note: Without this step, your app doesn’t appear or function in those channels—even if it's installed at the team level.

Now that we understand the concepts, let’s look at how to make the required changes in your app.

## Step-by-step Guide for Updating Your App

### Design Principle

Avoid using the channel type (Standard, Private, Shared) as the basis for determining your app’s behavior. Instead, base behavior on:

- Channel membership
- User permissions
- App installation status in the channel
  
This approach makes your app work reliably across all channel types.

### Preliminary Configuration Requirements

1. Update Your App Manifest

- Add "supportsChannelFeatures": "tier1" to your manifest. This step lets your app be added to Shared and Private channels. [More details here]

2. Install the App Properly

- Install the app at the team level.
- Manually add the app in each Shared or Private channel where required.
if the app isn't added to the channel, most APIs that rely on resource-specific consent fails with a 403 error message 'Caller isn't enabled for requesting the lwg channel of Shared channel type…'
- When a 403 error with the specified message occurs or API responses return incomplete data, assume the app isn't added to the channel. This error typically means channel members didn't add the app to the channel.

## Getting Accurate Channel Membership in Microsoft Teams

### Why It Matters

When sending messages, assigning tasks, or managing permissions, check who is in the channel, not just who is in the team. Shared channels and cross-tenant access often cause team and channel member lists to differ.

### Use Microsoft Graph to Get Channel Members

Get Full Roster for Any Channel Type

- Endpoint GET /teams/{team-id}/members returns only team membership, applicable to standard channels.
- Endpoint GET /teams/{team-id}/channels/{channel-id}/allMembers provides accurate channel membership for Standard, Shared, and Private channels.
- Response from this endpoint includes only eligible members.
- Support for Resource-Specific Consent (RSC) isn't available on these endpoints yet.

### Understand Indirect Membership in Shared Channels

Use these endpoints to identify which teams provide access and which users from those teams can access the shared channel:

- Get contributing teams:
GET /teams/{team-id}/channels/{channel-id}/sharedWithTeams

Returns each team’s ID, displayName, and isHostTeam.

Get allowed members from a contributing team:
GET /teams/{team-id}/channels/{channel-id}/sharedWithTeams/{id}/allowedMembers

- Returns only eligible members.
- These endpoints don't support RSC yet.

### Identify Direct vs Indirect Members

- Property @microsoft.graph.originalSourceMembershipUrl on allMembers (beta) indicates indirect membership.
- Property absence signifies that the member is direct.
- Property usage is recommended only as a hint—avoid parsing it directly and prefer supported endpoints instead.

### Check User Access Before Sensitive Actions

Use: doesUserHaveAccess(userId, tenantId, upn)

- Function result returns a Boolean.
- Function purpose is to determine whether to show sensitive actions or target users outside the host tenant.
- Function scope is limited to shared channels only.
- Function roadmap includes broader support, but it's not available yet.

## Retrieving Full Channel Roster Using Bot Framework SDK

When working with the Bot Framework SDK (C#, JavaScript, etc.), you can retrieve the full roster from any channel as follows:

- Use paginated access: Call TeamsInfo.GetPagedMembersAsync(turnContext, pageSize, continuationToken) and continue paging until all members are retrieved.
  
- Set required permissions: Make sure your app manifest includes the RSC permission ChannelMember.Read.Group. Without this permission, roster access fails within channels.

## Handling Known Failure Patterns

Be aware of the following common issues when accessing channel rosters:

- Error 403 on Graph calls under RSC
  
  Cause: The app isn't added to the channel.
  
  Resolution: Prompt the user to add the app to the channel and retry the request.

- Partial results (owners only) in Shared channels
  
  Cause: App is disabled or not added to the channel.
  
  Resolution: Treat the response as a partial roster. Instruct the user to add the app to the channel, then refetch the roster after successful addition.

## Handling Channel Membership Changes

Channel membership is fluid—users might join or leave, and channels can be shared or unshared with other teams. Your integration should be designed to respond to these changes dynamically.

### Using Microsoft Graph

To track membership updates:

- Subscribe to changes
Set up a Microsoft Graph subscription on:
/teams/{team-id}/channels/getAllMembers
This notifies your app whenever there are changes to channel membership.

- Respond to notifications
When you receive a membership, share, or unshare notification:
- Refresh the allMembers list to get the current state of channel members. If the channel is shared:
  - call sharedWithTeams to identify which teams have access to the shared channel.
  - Call allowedMembers to efficiently retrieve indirect members added through shared teams.

### Handling Membership Changes in Bot Framework (Bot SDK)

In the Bot Framework SDK, monitor the conversationUpdate activity to track channel membership changes.

Key Events to Handle

- channelShared / channelUnshared
Triggered when a channel is shared or unshared with a team.
  - Expect changes in indirect membership.
  - Refresh your channel topology and member roster.
  - To update your member list, use the member APIs described earlier.
- channelMemberAdded / channelMemberRemoved
Triggered when a user is added or removed from the channel.
  - Also fires when the app itself is added or removed.
  - Update your member list accordingly when this event occurs.

Required Permissions

- Manifest requirement: To receive and process these membership events, include the RSC permission ChannelMember.Read.Group in your app manifest.

## Detecting If Your App Is Added to a Channel

As you build your app, consider the following guidelines:

- No direct API exists to check whether your app is installed in a specific channel.
  
- Bot installation is confirmed when your bot receives a channelMemberAdded event in the conversationUpdate activity for itself.
  - This event signals the start of your channel-specific logic—such as sending a welcome message, fetching the roster, configuring tabs, or scheduling background jobs.
  - Bot events begin flowing only after the app is added to the channel

- Channel API access is blocked with a 403 error and the message:
'Caller isn't enabled for requesting the lwg channel of Shared channel type.' To access channel data, app has to be enabled in the requesting channel. if the app isn't yet added to the channel. Wait until installation is complete before accessing channel data via Graph or the Bot SDK.

Note: You can list apps installed at the team level using GET /teams/{team-id}/installedApps, but there's no equivalent API for channel-level installations.
Don't assume that a team-level install means the app is present in all its channels.

## Identifying External Users and Guests in Channel

As a developer, it's important to differentiate between internal users, guests, and external (cross-tenant) users in channels to:

- Limit sensitive actions to internal users only
- Show or hide certain features based on user type
- Set up the right sign-in process for external users in tabs or bots

### Detecting User Type at Runtime (Tabs & Bots)

For Tabs (using Teams JS SDK):

- Call microsoftTeams.getContext() when the tab loads.
- Check context.user.userRole or context.team.userRole: if it's 'guest,' the user is a guest.
- Compare context.user.tenant.id with context.channel.ownerTenantId (or context.team.groupTenantId): if they differ, the user is external (via B2B Direct Connect).

For Bots:

- To detect guests:
Use TeamsInfo.getMemberAsync or TeamsInfo.getPagedMembersAsync and check if userRole === 'guest.'
- To detect external users:
Each incoming activity includes conversation.tenantId and from.aadObjectId.

Compare the member’s tenantId with the channel’s host tenant (from Graph channel metadata). (Note: This part might need further clarification.)

### Detecting User Type from Roster (Graph API or Bot SDK)

Using Microsoft Graph:

- Call GET /teams/{team-id}/channels/{channel-id}/allMembers to retrieve the channel roster.
- Check the roles field: if it includes "guest," the user is a guest.
- Compare member.tenantId with channel.hostTenantId: if they’re different, the user is external.

Using Bot SDK:

- Use TeamsInfo.GetPagedMembersAsync to get channel members.
- Check TeamsChannelAccount.UserRole: "guest" indicates a guest user.
- Compare TeamsChannelAccount.TenantId with the channel’s host tenant ID (which can be fetched via Graph if needed). (Note: Host tenant ID retrieval might need clarification.)

## Working with Files Across Channel Types

When handling files in channels—whether it's file tabs, document libraries, or uploading and retrieving files, you need to account for the distinct SharePoint sites that support private and shared channels, along with their respective storage locations. Relying on the Team’s main site to access channel files or folders doesn’t work.

### Resolving Storage Correctly

- Call GET /teams/{teamId}/channels/{channelId}/filesFolder
→ Returns a DriveItem representing the root folder for the channel’s files.
- Use the following details from the response for all subsequent file operations:
  - parentReference.driveId: the SharePoint drive linked to the channel’s site
  - ID: the folder ID
- Standard channels
  - The driveId typically points to the team’s main SharePoint site.
- Private and shared channels
  - Expect a different driveId, as these channels have their own dedicated SharePoint sites.
  
Best practice

- Store and reuse the exact driveId and itemId from the filesFolder API.
- Avoid hardcoding library names or URLs assuming the team site applies to all channels.

Note: This API works consistently across all channel types.

### File Access Management for External and Guest Users

External Users (Cross-Tenant)

- Ensure external users remain in their home tenant while accessing the host channel’s SharePoint site.
- Ensure cross-tenant access is properly configured on both the source and target tenants.
- Ensure your app is multitenant, with consent granted in the host tenant for correct functionality.
  
Guest Users (Within Tenant)

- The channel’s SharePoint site automatically grants channel members access, including guest users from the same tenant.

### You can take the following actions

Avoid relying on “Org-wide” sharing links.

- Use sharing methods that typically exclude users from outside the organization.
- Use specific-people sharing or membership-based direct permissions instead of broad access links.
- Use tenant or site policies to determine whether anonymous or org-wide links are permitted.

Use the Invite API for precise access control.

- POST /drives/{driveId}/items/{itemId}/invite
- This method is the most reliable way, to programmatically grant access to specific users or groups.

### Authenticating External Users in Tabs or Task Modules

When creating a tab or task module that needs to access SharePoint files from the channel’s tenant, ensure external users are authenticated correctly—especially in private or shared channels.

- Use getContext() when the content page loads for retrieving the full channel context in which the tab is running.
- Use user.tenant.id and compare it with channel.ownerTenantId or hostTenantId for identifying if the user is external.
- Use getAuthToken with user.tenant.id (or tid) for ensuring the token is issued from the user’s home tenant instead of the host.

## Messaging in Channels

### Microsoft Graph

- Use GET /teams/{team-id}/channels/{channel-id}/messages and .../messages/delta only when the app is added in Shared or Private channels; otherwise, a 403 error occurs with an "app not added to channel" message.
- Use change notifications on /channels/{id}/messages for Shared or Private channels only if RSC permissions are set up correctly. If not, the request fails with a 403 error.
- Use on-demand message reads after the app is added to the channel for reliable access.

### Bots SDK

- Use normal v3 conversation routes to send, edit, or delete messages; refer to the documentation for details.
- Use the channel roster to fetch recipients—never rely on team membership.

## Update the App Manifest to Declare Support for Shared and Private Channels

Declare support for shared and private channels by adding a new property in your app manifest. This change is mandatory.

"supportsChannelFeatures": {
  "type": "string,"
  "enum": [
    "tier1,"
    "tier2,"
    null
  ]
  "description": "A property in the app manifest that declares support for all channel features, categorized by tiers."
}

To support shared and private channels, set supportsChannelFeatures = tier1.

Benefits of Declaring Tier1 Support:

- Enable your app to appear in shared and private channels.
- Enable support for the membership model used in shared and private channels.
- Enable access to channel-based SharePoint storage, if your app interacts with files.
- Enable identification of external users in shared channels and guest users in private channels.

As Microsoft Teams evolves, other channel capabilities might be introduced. To take advantage of future features, further updates to your app might be required.
