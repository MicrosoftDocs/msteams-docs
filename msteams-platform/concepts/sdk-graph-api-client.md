---
title: Graph API Client
description: Guide to using the Microsoft Graph API client to access Microsoft 365 data and services from your Teams SDK application.
ms.topic: article
zone_pivot_groups: teams-sdk-languages
ms.date: 10/09/2026
---

# Graph API Client

[Microsoft Graph](/graph/overview) gives you access to the wider Microsoft 365 ecosystem. You can enrich your application with data from across Microsoft 365.

::: zone pivot="teams-sdk-csharp"
The SDK gives your application easy access to the Microsoft Graph API via the `Microsoft.Graph` package.
::: zone-end

::: zone pivot="teams-sdk-python"
The SDK gives your application easy access to the Microsoft Graph API via the `microsoft-teams-graph` package.
::: zone-end

::: zone pivot="teams-sdk-typescript"
The SDK gives your application easy access to the Microsoft Graph API via the `@microsoft/teams.graph`, `@microsoft/teams.graph-endpoints` and `@microsoft/teams.graph-endpoints-beta` packages.
::: zone-end

::: zone pivot="teams-sdk-typescript"

## Package overview

The Graph API surface is vast, and this is reflected in the size of the endpoints packages. To help you manage the size of your product, we made sure that the endpoints code is tree-shakable. We also made most of the code into an optional dependency, in case tree-shaking is not supported in your environment.

| Package                                 | Optional | Contains                                                                            |
| --------------------------------------- | -------- | ----------------------------------------------------------------------------------- |
| `@microsoft/teams.graph`                | No       | A tiny client to create and issue Graph HTTP requests.                              |
| `@microsoft/teams.graph-endpoints`      | Yes      | Request-builder functions and types to call any of the production ready Graph APIs. |
| `@microsoft/teams.graph-endpoints-beta` | Yes      | Same, but for Graph APIs still in preview.                                          |

To use this SDK to call Graph APIs, the first step is to install the optional endpoints package using your favorite package manager. For instance:

```sh
npm install @microsoft/teams.graph-endpoints
```

::: zone-end

## Calling APIs

Microsoft Graph can be accessed by your application using its own application token, or by using the user's token. If you need access to resources that your application may not have, but your user does, you will need to use the user's scoped graph client. To grant explicit consent for your application to access resources on behalf of a user, see [Authenticate users in Microsoft Teams](authentication/authentication.md).

::: zone pivot="teams-sdk-csharp"
To access the graph using the Graph using the app, you may use the `GraphServiceClient` object to call the endpoint of your choice.
::: zone-end

::: zone pivot="teams-sdk-python,teams-sdk-typescript"
To access the graph using the Graph using the app, you may use the `app.graph` object to call the endpoint of your choice.
::: zone-end

::: zone pivot="teams-sdk-csharp"

```csharp
using Azure.Identity;
using Microsoft.Graph;

var credential = new ClientSecretCredential(
    configuration["AzureAd:TenantId"],
    configuration["AzureAd:ClientId"],
    configuration["AzureAd:ClientCredentials:0:ClientSecret"]);

var graph = new GraphServiceClient(credential, ["https://graph.microsoft.com/.default"]);
var user = await graph.Me.GetAsync(cancellationToken: cancellationToken);
Console.WriteLine($"User ID: {user?.Id}");
Console.WriteLine($"User Display Name: {user?.DisplayName}");
Console.WriteLine($"User Email: {user?.Mail}");
Console.WriteLine($"User Job Title: {user?.JobTitle}");
```

::: zone-end

::: zone pivot="teams-sdk-python"

```python
# Equivalent of https://learn.microsoft.com/graph/api/user-get
# Gets the details of the bot-user
user = await app.graph.me.get()
print(f"User ID: {user.id}")
print(f"User Display Name: {user.display_name}")
print(f"User Email: {user.mail}")
print(f"User Job Title: {user.job_title}")
```

> [!TIP]
> You also have access to the `app_graph` object in the activity handler. This is equivalent to `app.graph`.

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript
import * as endpoints from '@microsoft/teams.graph-endpoints';

// Equivalent of https://learn.microsoft.com/graph/api/user-get
// Gets the details of the bot-user
app.graph.call(endpoints.me.get).then((user) => {
  console.log(`User ID: ${user.id}`);
  console.log(`User Display Name: ${user.displayName}`);
  console.log(`User Email: ${user.mail}`);
  console.log(`User Job Title: ${user.jobTitle}`);
});
```

> [!TIP]
> You also have access to the `appGraph` object in the activity handler. This is equivalent to `app.graph`.

::: zone-end

::: zone pivot="teams-sdk-csharp"
To access Graph with the signed-in user's token, do this in a message handler:
::: zone-end

::: zone pivot="teams-sdk-python,teams-sdk-typescript"
You can also access the graph using the user's token from within a message handler.
::: zone-end

::: zone pivot="teams-sdk-csharp"

```csharp
using System.Net.Http.Headers;

var flow = teams.GetOAuthFlow("graph");
teams.OnMessage(async (context, cancellationToken) =>
{
    var token = await flow.SignInAsync(context, cancellationToken);
    if (token is null) return;

    using var http = new HttpClient();
    http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

    var meJson = await http.GetStringAsync(
        "https://graph.microsoft.com/v1.0/me?$select=id,displayName,mail,jobTitle",
        cancellationToken);

    await context.SendAsync(meJson, cancellationToken);
});
```

::: zone-end

::: zone pivot="teams-sdk-python"

Build the client from an OAuth flow's token, so it's always scoped to the connection that owns it.

```python
from microsoft_teams.graph import get_graph_client

graph = app.add_oauth_flow("graph")

@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    token = await graph.sign_in(ctx)
    if token is None:
        return  # OAuth card sent — resumes on the callback turn

    client = get_graph_client(token)
    user = await client.me.get()
    print(f"User ID: {user.id}")
    print(f"User Display Name: {user.display_name}")
    print(f"User Email: {user.mail}")
    print(f"User Job Title: {user.job_title}")
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

Build the client from an OAuth flow's token, so it's always scoped to the connection that owns it.

```typescript
import { Client as GraphClient } from '@microsoft/teams.graph';
import * as endpoints from '@microsoft/teams.graph-endpoints';

const graph = app.addOAuthFlow('graph');

// Gets details of the current user
app.on('message', async (ctx) => {
  const token = await graph.signIn(ctx);
  if (!token) return; // OAuth card sent — resumes on the callback turn

  const client = new GraphClient({ token: () => token }, { baseUrlRoot: app.graphBaseUrl });
  const me = await client.call(endpoints.me.get);
  console.log(`User ID: ${me.id}`);
  console.log(`User Display Name: ${me.displayName}`);
  console.log(`User Email: ${me.mail}`);
  console.log(`User Job Title: ${me.jobTitle}`);
});
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

## The Graph Client

The Graph Client provides a straight-forward `call` method to interact with Microsoft Graph and issue requests scoped to a specific user or application. Paired with the Graph Endpoints packages, it offers discoverable and type-safe access to the vast Microsoft Graph API surface.

Having an understanding of [how the graph API works](/graph/use-the-api) will help you make the most of the SDK. For example, to get the `id` of the chat instance between a user and an app, [Microsoft Graph](/graph/api/userscopeteamsappinstallation-get-chat) exposes it via:

```
GET /users/{user-id | user-principal-name}/teamwork/installedApps/{app-installation-id}/chat
```

The equivalent using the graph client would look like this:

```ts
import { users } from '@microsoft/teams.graph-endpoints';

const chat = await client.call(users.teamwork.installedApps.chat.get, {
  'user-id': user.id,
  'userScopeTeamsAppInstallation-id': appInstallationId,
  $select: ['id'],
});
```

Graph APIs often accept arguments that may go into the URL path, the query string, or the request body. As illustrated in this example, all arguments are provided as a second parameter to the `graph.call` method. The graph client puts each value in its place and attaches an authentication token as the request is constructed, and performs the fetch request for you.

## Graph Preview APIs

The Graph Preview APIs are not recommended for production use. However, if you have a need to explore preview APIs, the `@microsoft/teams.graph-endpoints-beta` package makes it easy.

First, install the optional dependency:

```sh
npm install @microsoft/teams.graph-endpoints-beta
```

Then use it just like the regular `@microsoft/teams.graph-endpoints` package.

```ts
import * as endpointsBeta from '@microsoft/teams.graph-endpoints-beta';

// Gets the current user details from /beta/me, rather than from /v1.0/me.
const me = await app.graph.call(endpointsBeta.me.get);
```

The key differences between `@microsoft/teams.graph-endpoints` and `@microsoft/teams.graph-endpoints-beta` are that they represent different Graph API schemas, and that the `graph.call()` method knows to route the request to either /v1.0 or /beta. This means that it's possible to mix'n'match v1.0 and beta endpoints, for instance to explore a novel beta API in a code base that's already relying on v1.0 for all stable APIs.

## Custom Graph API calls

It's possible to craft custom builder functions that work just like the ones provided in the `@microsoft/teams.graph-endpoints` and `@microsoft/teams.graph-endpoints-beta` packages. This can be handy if you wish to provide narrower return types, call some novel API that is supported by the Graph backend but not yet included in the endpoints packages, or avoid taking a dependency on the endpoints packages altogether.

For instance, this will `GET https://graph.microsoft.com/beta/me?$select=displayName` and return an object typed to contain just `displayName`, without taking a dependency on the endpoints packages.

```ts
import { type EndpointRequest } from '@microsoft/teams.graph';

const getMyDisplayName = (): EndpointRequest<{ displayName: string }> => ({
  ver: 'beta', // use the beta endpoint; defaults to 'v1.0' if omitted
  method: 'get', // HTTP method to use
  path: '/me', // endpoint path
  paramDefs: {
    query: ['$select'], // the $select parameter goes in the query string
  },
  params: {
    $select: ['displayName'], // the attribute(s) to select
  },
});

const { displayName } = await app.graph.call(getMyDisplayName);
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

## Additional resources

Microsoft Graph offers an extensive and thoroughly documented API surface. These essential resources will serve as your go-to references for any Graph development work:

- The [Microsoft Graph Rest API reference documentation](/graph/api/overview) gives details for each API, including permissions requirements.
- The [Microsoft Graph REST API beta endpoint reference](/graph/api/overview) gives similar information for preview APIs.
- The [Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer) lets you discover and test drive APIs.

In addition, the following endpoints may be especially interesting to Teams developers:

| Graph endpoints                                                                                                                | Description                                                         |
| ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| [appCatalogs](/graph/api/appcatalogs-list-teamsapps)                      | Apps in the Teams App Catalog                                       |
| [appRoleAssignments](/graph/api/serviceprincipal-list-approleassignments) | App role assignments                                                |
| [applicationTemplates](/graph/api/resources/applicationtemplate)          | Applications in the Microsoft Entra App Gallery                     |
| [applications](/graph/api/resources/application)                          | Application resources                                               |
| [chats](/graph/api/chat-list)                                   | Chat resources between users                                        |
| [communications](/graph/api/application-post-calls)                       | Calls and Online meetings                                           |
| [employeeExperience](/graph/api/resources/engagement-api-overview)        | Employee Experience and Engagement                                  |
| [me](/graph/api/user-get)                                       | Same as `/users` but scoped to one user (who is making the request) |
| [teams](/graph/api/resources/team)                                        | Team resources in Microsoft Teams                                   |
| [teamsTemplates](/microsoftteams/get-started-with-teams-templates)                            | Templates used to create teams                                      |
| [teamwork](/graph/api/resources/teamwork)                                 | A range of Microsoft Teams functionalities                          |
| [users](/graph/api/resources/users)                                       | User resources                                                      |

::: zone-end
