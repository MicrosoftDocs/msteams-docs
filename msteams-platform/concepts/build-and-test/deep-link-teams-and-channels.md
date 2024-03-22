---
title: Deep link to teams and channels
author: tomlutze
description:  Learn how to create deep links to a teams and channels.
ms.topic: conceptual
ms.author: tomlutze
ms.localizationpriority: high
ms.date: 03/14/2024
---

# Deep link to teams and channels

You can create a deep link to a specific team or channel.

In this article, you’ll learn to create a deep link:

* [To navigate to a team](#deep-links-to-navigate-to-a-team)
* [To navigate to a standard channel](#deep-links-to-navigate-to-a-standard-channel)
* [To navigate to a private channel](#deep-links-to-navigate-to-a-private-channel)
* [To navigate to a shared channel](#deep-links-to-navigate-to-a-shared-channel)


## Deep links to navigate to a team

You can use the following deep link format to navigate to a particular team:

`https://teams.microsoft.com/l/team/<channelId>/conversations?groupId=<groupId>&tenantId=<tenantId>`

The query parameters are:

* `channelId`: Channel ID of the conversation (URL encoded). For example, `19%3ATWLPKo8lD4v8zDxyw4FnDYY-ovnBJG5CSjmrHUAoOz41%40thread.tacv2`.
* `groupId`: Group ID of the file. For example, `72602e12-78ac-474c-99d6-f619710353a9`.
* `tenantId`: Tenant ID, such as `72f988bf-86f1-41af-91ab-2d7cd011db47`.

> [!NOTE]
> You can see `channelId` and `groupId` in the URL from the team.

Example: `https://teams.microsoft.com/l/team/19%3ATWLPKo8lD4v8zDxyw4FnDYY-ovnBJG5CSjmrHUAoOz41%40thread.tacv2/conversations?groupId=72602e12-78ac-474c-99d6-f619710353a9&tenantId=72f988bf-86f1-41af-91ab-2d7cd011db47`

## Deep links to navigate to a standard channel

You can use the following deep link format to navigate to a particular channel:

`https://teams.microsoft.com/l/channel/<channelId>/<channelName>?groupId=<groupId>&tenantId=<tenantId>`

The query parameters are:

* `channelId`: Channel ID of the conversation (URL encoded). For example, `19%3A9be3de4e70874c71a608dee9ba803ed3%40thread.tacv2`.
* `channelName`: Name of the team's channel (URL encoded). For example, `My%20example%20channel`.
* `groupId`: Group ID of the team. For example, `72602e12-78ac-474c-99d6-f619710353a9`.
* `tenantId`: Tenant ID, such as `72f988bf-86f1-41af-91ab-2d7cd011db47`.

> [!NOTE]
> You can see `channelId`, `channelName` and `groupId` in the URL from the channel.

Example: `https://teams.microsoft.com/l/channel/19%3A9be3de4e70874c71a608dee9ba803ed3%40thread.tacv2/My%20example%20channel?groupId=72602e12-78ac-474c-99d6-f619710353a9&tenantId=72f988bf-86f1-41af-91ab-2d7cd011db47`

## Deep links to navigate to a private channel

You can use the following deep link format to navigate to a particular private channel:

`https://teams.microsoft.com/l/channel/<channelId>/<channelName>?groupId=<groupId>&tenantId=<tenantId>&ngc=true`

The query parameters are:

* `channelId`: Channel ID of the conversation (URL encoded). For example, `19%3A9be3de4e70874c71a608dee9ba803ed3%40thread.tacv2`.
* `channelName`: Name of the team's channel (URL encoded). For example, `My%20example%20channel`.
* `groupId`: Group ID of the team. For example, `72602e12-78ac-474c-99d6-f619710353a9`.
* `tenantId`: Tenant ID, such as `72f988bf-86f1-41af-91ab-2d7cd011db47`.
* `ngc`: Indicates a next-generation channel. For private channels needs to be set to `true`.

> [!NOTE]
> Similar to standard channel links with the additional query parameter `ngc=true`.
> You can see `channelId`, `channelName` and `groupId` in the URL from the channel.

Example: `https://teams.microsoft.com/l/channel/19%3A9be3de4e70874c71a608dee9ba803ed3%40thread.tacv2/My%20example%20channel?groupId=72602e12-78ac-474c-99d6-f619710353a9&tenantId=72f988bf-86f1-41af-91ab-2d7cd011db47&ngc=true`

## Deep links to navigate to a shared channel

You can use the following deep link format to navigate to a particular shared channel:

`https://teams.microsoft.com/l/channel/<channelId>/<channelName>?groupId=<groupId>&tenantId=<tenantId>&ngc=true&allowXTenantAccess=true`

The query parameters are:

* `channelId`: Channel ID of the conversation (URL encoded). For example, `19%3A9be3de4e70874c71a608dee9ba803ed3%40thread.tacv2`.
* `channelName`: Name of the team's channel (URL encoded). For example, `My%20example%20channel`.
* `groupId`: Group ID of the team. For example, `72602e12-78ac-474c-99d6-f619710353a9`.
* `tenantId`: Tenant ID, such as `72f988bf-86f1-41af-91ab-2d7cd011db47`.
* `ngc`: Indicates a next-generation channel. For shared channels needs to be set to `true`.
* `allowXTenantAccess`: Indicates a channel that can be accessed across tenant boundaries. For shared channels needs to be set to `true`.

> [!NOTE]
> Similar to standard channel links with the additional query parameters `ngc=true` and `allowXTenantAccess=true`.
> You can see `channelId`, `channelName` and `groupId` in the URL from the channel.

Example: `https://teams.microsoft.com/l/channel/19%3A9be3de4e70874c71a608dee9ba803ed3%40thread.tacv2/My%20example%20channel?groupId=72602e12-78ac-474c-99d6-f619710353a9&tenantId=72f988bf-86f1-41af-91ab-2d7cd011db47&ngc=true&allowXTenantAccess=true`