---
title: Enable an Agent or App in Microsoft 365 Copilot
description: Enable your Teams app or agent in Microsoft 365 Copilot with a single CLI command. Learn how to update scopes, refresh the manifest, and test your agent.
ms.topic: article
ms.date: 11/03/2026
---

# Enable an agent or app in Microsoft 365 Copilot

If you've built a Teams app or agent and want to make it available in M365 Copilot, you can do so with a single CLI command that handles the manifest update automatically.

## Using the Teams Developer CLI

```bash
teams app update <appId> --scopes personal,team,copilot
```

This command:

- Adds `copilot` to the bot's scope list (and ensures `personal` is included — required by M365 Copilot)
- Adds the `copilotAgents.customEngineAgents` block to the manifest automatically
- Bumps the app version so Teams recognizes the change

Then reinstall the app. The quickest way is the install link from the original `teams app create` output. If you need to retrieve it again:

```bash
teams app get <appId> --install-link
```

## Testing in Copilot

Once the updated app is installed:

1. Open M365 Copilot in Teams or at [m365.cloud.microsoft](https://m365.cloud.microsoft/)
2. Your app should now be available as an agent option
3. Interact with your agent through the Copilot interface

## Manual Manifest Editing

If you are not using the Teams Developer CLI, you can update the manifest by hand. Add the following to your `manifest.json`:

```json
"bots": [
  {
    "botId": "<your-bot-id>",
    "scopes": ["personal", "team", "groupChat", "copilot"]
  }
],
"copilotAgents": {
  "customEngineAgents": [
    {
      "type": "bot",
      "id": "<your-bot-id>"
    }
  ]
}
```

After editing, re-package and upload the manifest:

```bash
teams app manifest upload <appId> ./manifest.json
```

Or zip the manifest and icons manually (manifest.json + color.png + outline.png) and sideload the zip in Teams.

## Resources

- [Teams app manifest reference](/microsoftteams/platform/resources/schema/manifest-schema)
