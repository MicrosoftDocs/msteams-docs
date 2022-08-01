---
title: Collaboration control and Settings REST API reference
author: surbhigupta
description: In this module, learn about Collaboration control and settings REST API reference to manage settings, start, map, and retrieve collaboration activities.
ms.localizationpriority: medium
ms.author: v-npaladugu
ms.topic: conceptual
---

# Collaboration control and Settings REST API reference

Developers can use the Collaboration control and Settings REST API to manage settings, start, map, and retrieve collaboration activities with their own business model entities.

> [!NOTE]
> Currently Collaboration controls are available only in [public developer preview](~/resources/dev-preview/developer-preview-intro.md).

This article provides reference for the Collaboration control solution REST API.

## REST Operations: Collaboration - Custom API

|Operation|Description|
|---------|-----------|
|[Associate Collaboration Map](/rest/api/industry/collaboration-toolkit/collaboration-custom-ap-is/associate-collaboration-map)|Associates a collaborative entity to a collaboration session.|
|[Begin Collaboration Session](/rest/api/industry/collaboration-toolkit/collaboration-custom-ap-is/begin-collaboration-session)|Creates a collaboration session record linked to a business entity, application context, and optional metadata.|
|[Disassociate Collaboration Map](/rest/api/industry/collaboration-toolkit/collaboration-custom-ap-is/disassociate-collaboration-map-custom-api)|Disassociates a mapped entity from the given collaboration session.|
|[Retrieve Collaboration Maps](/rest/api/industry/collaboration-toolkit/collaboration-custom-ap-is/retrieve-collaboration-maps-custom-api)|Gets a list of collaboration maps for a session of a specific entity type.|
|[Retrieve Collaboration Session](/rest/api/industry/collaboration-toolkit/collaboration-custom-ap-is/retrieve-collaboration-session-custom-api)|Gets a collaboration session record based on the parameters provided.|
|[Update Collaboration Map](/rest/api/industry/collaboration-toolkit/collaboration-custom-ap-is/update-collaboration-map-custom-api)|Updates a collaboration map record and its metadata if provided.|
|[Update Collaboration Session](/rest/api/industry/collaboration-toolkit/collaboration-custom-ap-is/update-collaboration-session)|Updates a collaboration session record and optionally its metadata.|

## REST Operations: Collaboration - Standard OData APIs

|Operation|Description|
|---------|-----------|
|[Get Collaboration Map By Id](/rest/api/industry/collaboration-toolkit/collaboration-standard-o-data-ap-is/get-collaboration-map-by-id)|Gets the details from a collaboration map record.|
|[Get Collaboration Metadata](/rest/api/industry/collaboration-toolkit/collaboration-standard-o-data-ap-is/get-collaboration-metadata)|Gets a list of the collaboration metadata records for a given collaboration map or a collaboration root entity name.|
|[Get Collaboration Root](/rest/api/industry/collaboration-toolkit/collaboration-standard-o-data-ap-is/get-collaboration-root)|Lists all the collaboration sessions created.|

## REST Operations: Settings - Custom APIs

|Operation|Description|
|---------|-----------|
|[Create and Update Settings](/rest/api/industry/collaboration-toolkit/settings-custom-ap-is/create-update-setting-custom-api)|Creates or updates a setting that matches both the group path and the settings definition name.|
|[Retrieve Null Settings](/rest/api/industry/collaboration-toolkit/settings-custom-ap-is/retrieve-null-settings-custom-api)|Returns a list of settings definitions that do not have a value.|
|[Retrieve Settings](/rest/api/industry/collaboration-toolkit/settings-custom-ap-is/retrieve-settings-custom-api)|Returns a list of specific settings or settings in groups.|

## REST Operations: Settings - Standard OData APIs

|Operation|Description|
|---------|-----------|
|[Delete Settings Definition](/rest/api/industry/collaboration-toolkit/settings-standard-o-data-ap-is/delete-settings-definition)|Deletes a settings definition.|
|[Delete Settings Group](/rest/api/industry/collaboration-toolkit/settings-standard-o-data-ap-is/delete-settings-group)|Deletes a settings group.|
|[Delete Settings Type](/rest/api/industry/collaboration-toolkit/settings-standard-o-data-ap-is/delete-settings-type)|Delete a settings type.|
|[Delete Settings Value](/rest/api/industry/collaboration-toolkit/settings-standard-o-data-ap-is/delete-settings-value)|Deletes a settings value.|
|[Get Settings Definitions](/rest/api/industry/collaboration-toolkit/settings-standard-o-data-ap-is/get-settings-definitions)|Lists settings definitions.|
|[Get Settings Groups](/rest/api/industry/collaboration-toolkit/settings-standard-o-data-ap-is/get-settings-groups)|Lists settings groups.|
|[Get Settings Types](/rest/api/industry/collaboration-toolkit/settings-standard-o-data-ap-is/get-settings-types)|Lists settings types.|
|[Get Settings Value](/rest/api/industry/collaboration-toolkit/settings-standard-o-data-ap-is/get-settings-value)|Lists settings values.|
|[Patch Settings Definition](/rest/api/industry/collaboration-toolkit/settings-standard-o-data-ap-is/patch-settings-definition)|Updates a settings definition.|
|[Patch Settings Group](/rest/api/industry/collaboration-toolkit/settings-standard-o-data-ap-is/patch-settings-group)|Updates a settings group.|
|[Patch Settings Type](/rest/api/industry/collaboration-toolkit/settings-standard-o-data-ap-is/patch-settings-type)|Updates a settings type.|
|[Patch Settings Value](/rest/api/industry/collaboration-toolkit/settings-standard-o-data-ap-is/patch-settings-value)|Updates a setting value.|
|[Post Settings Definition](/rest/api/industry/collaboration-toolkit/settings-standard-o-data-ap-is/post-settings-definition)|Creates a new settings definition.|
|[Post Settings Group](/rest/api/industry/collaboration-toolkit/settings-standard-o-data-ap-is/post-settings-group)|Creates a new settings group.|
|[Post Settings Type](/rest/api/industry/collaboration-toolkit/settings-standard-o-data-ap-is/post-settings-type)|Creates a new settings type.|
|[Post Settings Value](/rest/api/industry/collaboration-toolkit/settings-standard-o-data-ap-is/post-settings-value)|Creates a new setting value.|
