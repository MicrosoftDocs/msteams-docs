---
title: TODO Public Developer Preview
description: TODO A Developer Preview (Beta) is public program to explore and test upcoming features for potential inclusion in your Microsoft Teams app.
ms.topic: article
ms.date: 01/31/2023
---
# Teams preview features for developers

New Teams platform features are often made available to developers before they become generally available to users. Developers are encouraged to integrate these preview features into test versions of their agents and apps, [provide feedback](~/feedback.md) about them, and prepare to take advantage of them as soon as they are released.

Preview-related implementation and user experience considerations vary by feature, and are documented with each preview feature. This article explains two of the most common requirements:

- Teams public preview participation for feature evaluation and testing
- Use of the developer preview app manifest

Preview features are subject to change prior to release. Developers should test integration of preview features with controlled audiences. Integration of preview features in agents or apps released to production is not recommended.

## Teams public preview

Teams public preview is an opt-in feature of the Teams client that allows users to experience a selected set of unreleased Teams features. Tenant administrators can set per-user policies that require or disallow participation, or enable users to individually choose whether to opt in.

Most preview platform features available to agent and app developers require public preview opt-in to access in the Teams client. To facilitate feature evaluation and testing, developers should opt in to public preview, and should work with administrators and users to enroll controlled testing audiences. See [Microsoft Teams Public preview](/MicrosoftTeams/public-preview-doc-updates) in the Teams administrator documentation for complete information about enabling public preview.

Public preview participation affects the Teams client experience, not the developer experience. It has no effect on implementation-level access to unreleased platform features. It can't be used as a feature flag mechanism: users' participation in public preview is not exposed to developers, agents or apps by the platform.

Public preview is available to any Teams user with administrator consent, but developers should not expect or require production users to participate in public preview.

## Developer preview app manifest

Preview features that depend on app manifest configuration often require use of the [developer preview version of the app manifest](/microsoft-365/extensibility/schema/?view=m365-app-prev&preserve-view=true). To use it, specify the following `$schema` and `manifestVersion` values in your app manifest:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/teams/vDevPreview/MicrosoftTeams.schema.json",
  "manifestVersion": "devPreview"
}
```

Agents and apps that use the developer preview version of the manifest have the following limitations:

- Can't be published to the Teams store
- Can only be installed in the Teams client via [direct upload](../../concepts/deploy-and-publish/apps-upload.md)
- Can't be managed in the [Developer Portal for Teams](~/concepts/build-and-test/teams-developer-portal.md). An app package containing a developer preview version of the manifest must be manually assembled. Consider using the developer portal to create most of the agent or app's configuration, then exporting the package and make final modifications manually.

For more information about the developer preview version of the app manifest, see its [dedicated documentation](/microsoft-365/extensibility/schema/?view=m365-app-prev&preserve-view=true).
