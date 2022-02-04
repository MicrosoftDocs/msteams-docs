---
title: Extend Teams apps across Microsoft 365 (preview)
description: Extend your Teams app experiences to other high-usage areas of Microsoft 365 
ms.date: 11/15/2021
ms.topic: overview
ms.custom: m365apps
ms.localizationpriority: medium
---
# Extend Teams apps across Microsoft 365

> [!NOTE]
> This early developer preview is intended to provide Teams developers with existing applications the chance to try the new functionality and [provide feedback](/microsoftteams/platform/feedback) on this expansion of the Teams developer platform into other high-usage areas of the Microsoft 365 ecosystem.

You can test your Teams apps running in Microsoft Office and Outlook by updating your code to use the new [Microsoft Teams JavaScript client SDK v2 Preview](using-teams-client-sdk-preview.md) and Microsoft Teams [Developer preview manifest](../resources/schema/manifest-schema-dev-preview.md).

With this preview, you can:

- Extend existing Teams [personal tabs](/microsoftteams/platform/tabs/how-to/create-personal-tab) to Outlook for desktop and on the web, and also Office on the web (office.com).
- Extend existing Teams [search-based messaging extensions](/microsoftteams/platform/messaging-extensions/how-to/search-commands/define-search-command) to Outlook for desktop and on the web.

For feedback and issues, continue using the relevant [Microsoft Teams developer community channels](/microsoftteams/platform/feedback).

## Teams personal tabs in Office and Outlook

With this preview, you can extend a Teams personal tab application to run in both Outlook on Windows desktop and the web, and also Office on the web.

After sideloading to Teams, your personal tab appears as one of your installed apps in Outlook and Office.

:::image type="content" source="images/outlook-office-teams-personal-tab.png" alt-text="Personal tab running in outlook.com":::

## Teams messaging extensions in Outlook

With this preview, you can extend your search-based Teams messaging extensions to Outlook on the web and Windows desktop, enabling customers to search and share results through the compose message area of Outlook, in addition to Microsoft Teams clients.

After sideloading to Teams, your messaging extension appears as one of your installed apps within the Outlook compose message area.

:::image type="content" source="~/assets/images/git-issue-msging-extension.png" alt-text="messaging extension" lightbox="~/assets/images/git-issue-msging-extension.png" border="true":::

## Next step

Set up your dev environment for extending Teams apps across Microsoft 365:

> [!div class="nextstepaction"]
> [Install prerequisites](prerequisites.md)
