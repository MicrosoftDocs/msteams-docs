---
title: M
author: Rajeshwari-v
description:  Describes about manifest
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: Account
---

# Manifest editor

A manifest file describes how your app is configured, including its capabilities, required resources, and other important attributes. For each Teams app, a manifest file is needed and should be uploaded to Teams platform through Teams Developer Portal, Teams toolkit, etc to register your app to Teams platform. 

After your app is registered to Teams platform, you can view your Teams app via Teams Developer Portal -> Apps.

 ![Developer portal](~/assets/images/teams-toolkit-v2/developer-portal.png)

 ![Developer portal apps](~/assets/images/teams-toolkit-v2/developer-apps-preview.png)

Your manifest must conform to the schema hosted at https://developer.microsoft.com/json-schemas/teams/v1.10/MicrosoftTeams.schema.json. Previous versions 1.0, 1.1,..., and 1.6 are also supported (using "v1.x" in the URL). For more information on the changes made in each version, see manifest change log.
There are two major ways to edit the manifest file. You can edit the manifest file for a Teams app through Teams Developer Portal -> Apps and select the Teams app instance you want to edit the manifest file online if you have already published your app. Or you can go to the Teams app Visual Studio Code toolkit to create a Teams app and edit the manifest file generated with the Teams app. 

## Edit manifest file through Teams developer portal

Edit manifest file through Teams developer portal

 ![Developer portal edit manifest](~/assets/images/teams-toolkit-v2/dev-portal-edit-manifest.png)

Edit Teams app manifest file within Teams Toolkit

 ![Teams Toolkit edit manifest](~/assets/images/teams-toolkit-v2/Teams-toolkit-edit-manifest.png)

Within the Teams toolkit, you can find the corresponding manifest file and view/edit the manifest file for the current Teams app project. The toolkit will use the manifest file and send it to Teams platform when you publish the Teams app.
