---
title: Use Microsoft Graph to export Teams messages 
description: Describes how to use Microsoft Graph to export Teams messages to an external platform
localization_priority:  Normal
author: laujan 
ms.author: lajanuar
ms.topic: Overview
keywords: teams export messages api graph microsoft migrate migration 
---

# Export Microsoft Teams chat messages using Microsoft Graph

A chat message represents an individual chat message within a [channel](/graph/api/resources/channel?view=graph-rest-beta) or [chat](/graph/api/resources/chat?view=graph-rest-beta). If your organization needs to export Teams [chat messages](graph/api/resources/chatmessage?view=graph-rest-1.0) for archiving purposes, security and compliance support, or other information management needs,  you can retrieve Teams one-to one and group chats using Microsoft Graph APIs.

## Step one: Establish secure access permissions

To call Microsoft Graph, your app must acquire an access token from the Microsoft identity platform. The access token contains information about your app and the permissions it has for the resources and APIs available through Microsoft Graph. To get an access token, your app must be registered with the Microsoft identity platform and be authorized by either a user or an administrator for access to the Microsoft Graph resources it needs. To learn more, please *see* [Authentication and authorization basics for Microsoft Graph](/graph/auth/auth-concepts).

## Step two: Get list of users

Retrieve a [list of user objects](/graph/api/user-list?view=graph-rest-beta&tabs=http) using the following HTTP request:

```http
GET https://graph.microsoft.com/beta/users
```

## Step three:  Get chat messages for each user



## Step four:  