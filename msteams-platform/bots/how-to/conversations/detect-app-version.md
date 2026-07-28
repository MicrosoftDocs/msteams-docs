---
title: Detect installed app version in agent activities
description: Learn how to use channelData.app.version to determine the installed version of your app and adapt agent behavior based on available features, permissions, or capabilities.
ms.localizationpriority: medium
ms.topic: how-to
ms.date: 07/24/2026
zone_pivot_groups: teams-sdk-languages
---

# Detect installed app version in agent activities

Teams includes the installed app version in all activity payloads delivered to your agent through the `channelData.app.version` field. This field appears in messages, invokes, and `installationUpdate` activities.

Use the app version to build logic that adapts your agent's behavior based on the version of the app the user has installed.

## How it works

Every activity delivered to your agent in a 1:1 chat includes a `channelData.app` object with the `id` and `version` of the installed app:

```json
{
  "type": "message",
  "conversation": { "id": "conv-id" },
  "channelData": {
    "app": {
      "id": "your-app-id",
      "version": "1.2.3"
    }
  }
}
```

The `version` value is the manifest version (`version` property in the app manifest), not a runtime or SDK version. Since different users may have different versions of your app installed, your agent can branch its logic based on this value to determine what features or permissions are available in each user's context.

## When to use version detection

Version detection is useful in several scenarios:

### Check feature or permission availability

If a newer version of your manifest introduces a new capability (such as sessions, new RSC permissions, or additional scopes), your agent can check the installed version and enable or disable functionality accordingly.

### Prompt users to update

When your agent detects an outdated version, it can send a message encouraging the user to update the app to access new features.

### Gather install base metrics

Track version distribution across your user base to understand adoption of newer releases and plan deprecation timelines.

### Detect session support

If your agent has both session-enabled and non-session versions in use, checking the version helps determine whether to create sessions proactively or fall back to the single chat model. For more information, see [Structure conversations with sessions](agent-sessions.md).

## Read the version from an activity

::: zone pivot="teams-sdk-csharp"

TODO

::: zone-end

::: zone pivot="teams-sdk-typescript"

TODO

::: zone-end

::: zone pivot="teams-sdk-python"

TODO

::: zone-end

## Detect app upgrades

When a user upgrades the app to a newer version, your agent receives an `installationUpdate` activity with `action: "upgrade"`. The new version is included in `channelData.app.version`:

```json
{
  "type": "installationUpdate",
  "action": "upgrade",
  "conversation": { "id": "base-conversation-id" },
  "channelData": {
    "app": {
      "version": "2.0.0"
    }
  }
}
```

The full set of `installationUpdate` actions:

| Action | When |
|---|---|
| `add` | Agent is installed |
| `remove` | Agent is uninstalled |
| `upgrade` | App version is upgraded with property value changes |
| `add-upgrade` | Agent is added as part of an app upgrade |
| `remove-upgrade` | Agent is removed as part of an app upgrade |

Use the `upgrade` action to detect version changes and migrate user state, adjust behavior, or trigger setup flows as needed.

## See also

- [Structure conversations with sessions](agent-sessions.md)
- [Conversation events in your Teams bot](subscribe-to-conversation-events.md)
