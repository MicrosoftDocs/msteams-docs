---
title: Teams Preview Features for Agent and App Developers
description: Test Teams preview features before general availability. Learn how public preview and the developer preview manifest help you prepare your agents and apps.
ms.topic: article
ms.date: 10/12/2026
---
# Teams preview features for agent and app developers

New Teams platform features often become available to developers before they reach general availability. Consider integrating these preview features into test versions of your agents and apps, [providing feedback](feedback.md) about them, and preparing to use them as soon as they're released.

Preview-related implementation and user experience considerations vary by feature, and the documentation for each preview feature explains them. This article explains two of the most common requirements:

- Teams public preview participation for feature evaluation and testing
- Use of the developer preview app manifest

Both developer- and user-facing aspects of preview features might change before release. Test your integration of preview features with controlled audiences. Don't integrate preview features in agents or apps released to production.

## Teams public preview

Teams public preview is an opt-in feature of the Teams client that enables users to experience a select set of unreleased Teams features. Most preview platform features available to agent and app developers require users to opt in to public preview before they can access them in the Teams client.

User participation in public preview is controlled by administrator policy. Administrators can set policies that require or disallow participation, or allow users to individually decide whether to opt in. Developers integrating public preview features in their agents and apps should enable public preview themselves to perform their own evaluation and testing, and should work with administrators to enroll users involved with testing. See [Microsoft Teams Public preview](/MicrosoftTeams/public-preview-doc-updates) in the Teams administrator documentation for more information about enabling public preview.

Public preview is a Teams client option and has no corresponding developer setting. Generally, public preview features are unconditionally available to developers for implementation.

Public preview is available to all Teams users, subject to administrator consent, but don't expect or require production users to participate. Public preview participation isn't exposed to developers, agents, or apps and can't be used to conditionally enable features.

## Developer preview app manifest

Preview features that depend on app manifest configuration often require the [developer preview version of the app manifest](/microsoft-365/extensibility/schema/?view=m365-app-prev&preserve-view=true). To use it, specify the following `$schema` and `manifestVersion` values in your app manifest:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/teams/vDevPreview/MicrosoftTeams.schema.json",
  "manifestVersion": "devPreview"
}
```

Agents and apps that use the developer preview version of the manifest have the following limitations:

- You can't publish them to the Teams store.
- You can only install them in the Teams client via [direct upload](concepts/deploy-and-publish/apps-upload.md).
- You can't manage them in the [Teams Developer Portal](concepts/build-and-test/teams-developer-portal.md). An app package containing the developer preview version of the manifest must be assembled manually. Consider using the developer portal to create most of the agent or app configuration, then export the package and make the final modifications manually.

For more information about the developer preview version of the app manifest, see its [dedicated documentation](/microsoft-365/extensibility/schema/?view=m365-app-prev&preserve-view=true).
