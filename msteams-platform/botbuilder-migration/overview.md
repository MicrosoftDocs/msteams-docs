---
title: BotBuilder (Bot Framework SDK) Migration Guide
description: Migration guide from BotBuilder (Bot Framework SDK) to Teams SDK, including the BotBuilder plugin for compatibility with existing activity handlers and adapters.
ms.topic: how-to
zone_pivot_groups: teams-sdk-languages
ms.date: 10/09/2026
---

# BotBuilder (Bot Framework SDK) migration guide

::: zone pivot="teams-sdk-csharp"
This new iteration of Teams SDK has been rebuilt from the ground up.
To ease the migration process, the `Microsoft.Teams.Apps.BotBuilder` package provides BotFramework adapter compatibility that
allows you to continue using BotBuilder components like `ActivityHandler` and `CloudAdapter`
to receive, process and send activities within the new Teams SDK abstractions.

> [!NOTE]
> .NET SDK version.
>
> - **SDK 2.0** — use the plugin package `Microsoft.Teams.Plugins.AspNetCore.BotBuilder`.
> - **SDK 2.1** — use `Microsoft.Teams.Apps.BotBuilder` with `AddTeamsBotFrameworkHttpAdapter()`. This is the recommended path for new and migrating C# apps.

::: zone-end

::: zone pivot="teams-sdk-python"
This new iteration of Teams SDK has been rebuilt from the ground up.
To ease the migration process, we've introduced a plugin `microsoft-teams-botbuilder` that
allows you to continue using BotBuilder components like `ActivityHandler` and `CloudAdapter`
to receive, process and send activities within the new Teams SDK abstractions.
::: zone-end

::: zone pivot="teams-sdk-typescript"
This new iteration of Teams SDK has been rebuilt from the ground up.
To ease the migration process, we've introduced a plugin `@microsoft/teams.botbuilder` that
allows you to continue using BotBuilder components like `ActivityHandler` and `CloudAdapter`
to receive, process and send activities within the new Teams SDK abstractions.
::: zone-end
