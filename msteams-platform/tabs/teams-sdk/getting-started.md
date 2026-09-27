---
title: Getting Started with Tab Apps in Teams SDK
description: Set up new tab app projects or add Teams client capabilities to existing tab applications.
ms.topic: how-to
ms.date: 09/27/2026
---

# Getting started with tab apps in Teams SDK

To use this package, you can either set up a new project using the Teams Developer CLI, or add it to an existing tab app project.

## Setting up a new project

The Teams Developer CLI ships a `tab` template that scaffolds a new tab app with a callable remote function. To get started, you can follow the TypeScript [quickstart](../../agents-in-teams/quickstart-create-agent-teams-sdk.md), specifying the `tab` template when invoking `teams project new`:

```text
teams project new typescript my-first-tab-app --template tab
```

## Adding to an existing project

This package is set up to integrate well with existing Tab apps. The main consideration is that the AAD app must be configured to support Nested App Authentication (NAA). Otherwise it will not be possible to acquire the bearer token needed to call Microsoft Graph APIs or remote agent functions.

After verifying that the app is configured for NAA, simply use your package manager to add a dependency on `@microsoft/teams.client` and then proceed with [Using the app](./using-the-app.md).

If you're already using a current version of TeamsJS, that's fine. This package works well with TeamsJS.

If you're already using Microsoft Authentication Library (MSAL) in an NAA enabled app, that's great! The [App options](tab-app-options.md) page shows how you can use a single common MSAL instance.

## Resources

- [Quickstart: Create an agent and chat with it in Teams](../../agents-in-teams/quickstart-create-agent-teams-sdk.md)
- [Configuring an app for Nested App Authentication](/microsoftteams/platform/concepts/authentication/nested-authentication#configure-naa)
