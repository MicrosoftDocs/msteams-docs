---
title: Acquire token for MS Graph
description: Describes acquiring token for MS Graph
ms.topic: how-to
ms.localizationpriority: medium
keywords: teams authentication tabs Microsoft Azure Active Directory (Azure AD) Graph API
---
# Acquire token for MS Graph

You can extend your Teams tab app for Microsoft Graph. You'll need to acquire access token for Microsoft Graph. You can do so by using Azure AD [on-behalf-of flow](/azure/active-directory/develop/v1-oauth2-on-behalf-of-flow).

Our current implementation for SSO only grants consent for user-level permissions that are not usable for making Graph calls. To get the permissions (scopes) needed to make a Graph call, SSO solutions must implement a custom web service to exchange the token received from the Teams JavaScript SDK for a token that includes the needed scopes.

For more information, please see [Get access for MS Graph](/graph/auth-v2-user).

\ Add content to enable user to transition to MS Graph page. Verify cross-reference to MS Graph pages - existing pages that have information regarding acquiring token. \

## Code snippets

The following code provides an example of on-behalf-of (OBO) flow to fetch access token using Microsoft Authentication Library (MSAL):

### [C#](#tab/dotnet)

```csharp

IConfidentialClientApplication app = ConfidentialClientApplicationBuilder.Create(<"Client id">)
                                                .WithClientSecret(<"Client secret">)
                                                .WithAuthority($"https://login.microsoftonline.com/<"Tenant id">")
                                                .Build();
 
            try
            {
                var idToken = <"Client side token">;
                UserAssertion assert = new UserAssertion(idToken);
                List<string> scopes = new List<string>();
                scopes.Add("https://graph.microsoft.com/User.Read");
                var responseToken = await app.AcquireTokenOnBehalfOf(scopes, assert).ExecuteAsync();
                return responseToken.AccessToken.ToString();
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
```

### [Node.js](#tab/nodejs)

```Node.js

// Exchange cliend side token with server token
  app.post('/getProfileOnBehalfOf', function(req, res) {
        var tid = < "Tenand id" >
    var token = < "Client side token" >
    var scopes = ["https://graph.microsoft.com/User.Read"];

        // Creating MSAL client
        const msalClient = new msal.ConfidentialClientApplication({
            auth: {
                clientId: < "Client ID" >,
                clientSecret: < "Client Secret" >
      }
        });

        var oboPromise = new Promise((resolve, reject) => {
            msalClient.acquireTokenOnBehalfOf({
                authority: `https://login.microsoftonline.com/${tid}`,
                oboAssertion: token,
                scopes: scopes,
                skipCache: true
            }).then(result => {
                console.log("Token is: " + result.accessToken);
            }).catch(error => {
                reject({ "error": error.errorCode });
            });
        });
```

---
