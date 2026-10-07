---
title: Agent Trust Model
description: Understand what Teams SDK validates on every inbound request, what your handlers can rely on downstream, and how to authenticate custom HTTP routes you add to your agent.
ms.topic: concept-article
zone_pivot_groups: teams-sdk-languages
ms.date: 10/07/2026
---

# Agent trust model

Teams SDK enforces a layered authentication model when your agent is configured with an application identity. Inbound JSON Web Tokens (JWTs) are validated at the HTTP boundary, before any handler in your application sees them. Activity handlers can rely on tokens that have passed signature, issuer, audience, and expiry checks; your own routes need their own authentication policy.

This article describes where validation happens, what you can trust afterward, and how to extend the model when you add your own protected surfaces.

## What the SDK validates automatically

When application authentication is configured, the SDK validates bearer tokens on inbound requests to `/api/messages` before it invokes any activity handler. Validation includes:

* **Signature verification** against the authoritative JSON Web Key Set (JWKS). The SDK discovers the signing keys from the OpenID Connect configuration endpoint for the configured cloud environment, so key rotation requires no action from you.
* **Issuer check** against the set of expected issuers for your cloud: commercial, US Government, Department of Defense (DoD), or Teams operated by 21Vianet.
* **Audience check** against your agent's application identifier.
* **Lifetime check**, with a default clock skew tolerance.
* **Signing algorithm check**. Only `RS256` is accepted.

Requests that fail any of these checks are rejected with an HTTP 401 response before they reach your code. Don't use unauthenticated local-development settings on a publicly accessible messaging endpoint.

## What you can rely on downstream

Once a request is past the validator, the SDK exposes selected token claims through typed accessors on the activity context. The accessor classes, named `JsonWebToken` in each SDK, are payload views over an already-validated token. They perform no validation of their own. You can read fields such as the tenant ID, application ID, service URL, and expiration directly, without rechecking the token.

The same pattern applies to tokens the SDK acquires on your behalf, for example when MSAL returns an access token for an outbound API call, or when an OAuth user-token exchange completes. Those tokens originate from Microsoft identity infrastructure and are wrapped in the same accessor type, so your code reads them with a consistent API.

## Authenticate your own HTTP surfaces

If your agent exposes HTTP surfaces beyond the default Teams activity endpoint, such as a callback endpoint for an external system, a webhook handler, or any custom route you register, you're responsible for authenticating those requests yourself.

Attach authentication middleware to custom routes using your HTTP framework's conventions (Express, FastAPI, or ASP.NET Core). Reject missing or invalid credentials with HTTP 401 before processing a request. For webhooks, verify the provider's signed request according to its specification; don't rely on a bare string comparison of a shared secret in an authorization header. Store signing keys in a secret store, verify signatures using a constant-time comparison, and fail closed if configuration is missing.

::: zone pivot="teams-sdk-csharp"

Add authentication to custom ASP.NET Core endpoints when you map them on the `WebApplication`. `UseTeamsBotApplication()` protects Teams activity endpoints; it doesn't automatically protect your own routes.

::: zone-end

::: zone pivot="teams-sdk-typescript"

Protect custom Express routes with Express authentication middleware. The Teams SDK validates activities sent to `/api/messages`, not routes you register on the Express app yourself.

::: zone-end

::: zone pivot="teams-sdk-python"

Protect custom FastAPI routes with FastAPI security dependencies or middleware. The Teams SDK validates activities sent to `/api/messages`, not routes you register on the FastAPI app yourself.

::: zone-end

If a route needs Microsoft-issued bearer tokens rather than webhook signatures, use an appropriate token validator with the expected issuer and audience instead of parsing token claims as proof of identity. For agent credentials, see [Authenticate your agent with Microsoft Entra ID](authenticate-your-agent.md).

## What not to do

The accessor types described in this article aren't safe to construct against arbitrary input. They expose claims from a parsed token, but they don't check whether the token was signed by a party you trust.

Don't:

* Read a token from an untrusted HTTP request and construct a `JsonWebToken` from it as the basis for an authorization decision.
* Pass user-supplied tokens to downstream services without first running them through the SDK's validator, or an equivalent of your own.
* Disable the SDK's automatic validation on `/api/messages`. The default-deny posture depends on it.

If you need to validate a token outside the activity pipeline, use the validator components directly rather than the accessor. Each SDK exposes a token validator that performs the full signature-verification flow against the same JWKS endpoint that the activity pipeline uses.

## See also

* [Authenticate your agent with Microsoft Entra ID](authenticate-your-agent.md)
* [Host web content and manage your agent's HTTP server](host-agent-server.md)
* [Observe agent activity with middleware and logging](agent-observability.md)
* [Teams cloud environments overview](../concepts/cloud-overview.md)
