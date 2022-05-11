---
title: Teams live share
description: overview of Teams live share
ms.topic: overview
ms.localizationpriority: high
keywords: teams live share cowatch  
---

# SDK authentication and access

Users can authenticate the SDK in several ways. All requests made through the SDK must have a valid API key, provided to the channel by us. The access token should only give access to the minimum number of data/capabilities it needs, as defined by the requirements in this spec.

1. **Teams cowatch app - SDK authentication**

    When a user opens a channel through Teams (for example, through the cowatch meeting tab or interstitial), included in the URI is a parameter for a local access token. The SDK validates the token, and if valid, marks the user as authenticated.

    Once the user is confirmed to be authenticated, if the URI also includes session identifier, the SDK begins that process according to the requirements in requirement 3.1. If the URI indicates the user should be redirected back to Teams once complete, the SDK opens the URI for the Teams app.

1. **SDK - Teams cowatch app authentication**

    A user can connect the channel to Teams through an API in the SDK. In this case, our SDK opens a URI to the Teams app, which then generates a local access token and opens the channel URI with the token included. The SDK validates the token, and if valid, marks the user as authenticated.

1. **Server OAuth 2.0**

    You can optionally use a valid local access token to generate a single-use authorization code that you can send to their server to convert into an access token and refresh token, per the OAuth 2.0 standard. They can then use a method in the SDK’s API to set the access token manually, which will then be used as the primary access token.

    If the server token is about to expire or is expired, the SDK will provide a proper error informing them to request a new access token from their server.

1. **Refresh token**

    If a local access token is about to expire or is expired, the SDK will automatically refresh it (either before a request fails by checking the expiration timestamp, waiting for the request to give the related error code, or both).

5. **Invalidate token**

    Partners should be able to include the ability to invalidate a token from their app (e.g., user wants to opt out of the Teams integration). If the user is to continue using the Teams integration after this, they must reauthenticate the SDK.
