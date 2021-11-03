---
title: Manifest editor
author: surbhigupta12
description:  Describes about manifest
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: Manifest editor
---

# Manifest editor

A manifest file describes how your app is configured with capabilities, required resources, and other important attributes. For each Teams app, you need a manifest file uploaded to Teams platform through Teams Developer Portal, Teams toolkit, and so on to register your app to Teams platform.

After your app is registered to Teams platform, you can view your Teams app via Teams Developer Portal -> Apps.

![Developer portal](~/assets/images/tools-and-sdks/developer-portal.png)

![Developer portal apps](~/assets/images/tools-and-sdks/developer-apps-preview.png)

Your manifest must conform to the schema hosted at https://developer.microsoft.com/json-schemas/teams/v1.10/MicrosoftTeams.schema.json. Previous versions 1.0, 1.1,..., and 1.6 are also supported (using "v1.x" in the URL). For more information on the changes made in each version, see [Manifest schema for Microsoft Teams](../resources/schema/manifest-schema.md).
The following ways to edit the manifest file:

* You can edit the manifest file for a Teams app through Teams Developer Portal -> Apps and select the Teams app instance.
* You can edit the manifest file online if you have already published your app. Or you can go to the Teams app Visual Studio Code toolkit to create a Teams app and edit the manifest file generated with the Teams app.

## Edit manifest file through Teams developer portal

 You can find the corresponding manifest file to view or edit for the current Teams app project. The toolkit will use the manifest file and send it to Teams platform as you publish the Teams app.

Edit manifest file through Teams developer portal

 ![Developer portal edit manifest](~/assets/images/tools-and-sdks/dev-portal-edit-manifest.png)

Edit Teams app manifest file within Teams Toolkit

 ![Teams Toolkit edit manifest](~/assets/images/tools-and-sdks/Teams-toolkit-edit-manifest.png)

## See also

* [Require accounts with valid subscription to create apps](teams-toolkit-account.md)
* [Publish Teams apps using Teams Toolkit](teams-toolkit-publish.md)
* [Manifest change log](https://github.com/OfficeDev/microsoft-teams-app-schema/releases)