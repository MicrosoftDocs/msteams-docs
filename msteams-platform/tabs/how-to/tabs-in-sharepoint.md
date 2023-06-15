---
title: Add Teams tab to SharePoint
description: Learn how to deploy your existing Teams tab to SharePoint as a SharePoint Framework web part using code samples.
ms.localizationpriority: medium
ms.topic: conceptual
---

# Add Teams tab to SharePoint

You can get a rich integration experience between Microsoft Teams and SharePoint by adding a Microsoft Teams tab in SharePoint as an SPFx web part. This document guides you on how you to take a tab from a Microsoft Teams sample app and use it in SharePoint.

## Rich integration between Teams and SharePoint

With the November release of Teams and SharePoint Framework v.1.7, developers have two powerful capabilities:

### Teams tabs in SharePoint

With SharePoint Framework v.1.7, you can host your Teams tabs in SharePoint. As tabs hosted in SharePoint get a similar **full page** experience, exposing all the features of Teams tabs while retaining the context and familiarity of a SharePoint site.

Create rich app experiences in SharePoint by bringing your [Teams app into SharePoint](#introduction).

:::image type="content" source="../../assets/images/tabs/tabs-in-sharepoint/image084.png" alt-text="Screenshot shows the tab in SharePoint view." lightbox="../../assets/images/tabs/tabs-in-sharepoint/image084.png":::

### SharePoint Framework in Teams

You can also implement your Teams tabs using SharePoint Framework. SharePoint Framework web parts are hosted within SharePoint without any need for external services, such as Azure. For SharePoint developers, this significantly simplifies the development process for Teams tabs. For more information on SharePoint Framework in Teams, see [how to use the SharePoint Framework in Teams.](/sharepoint/dev/spfx/web-parts/get-started/using-web-part-as-ms-teams-tab)

Bring your SharePoint web parts to Teams and let SharePoint manage the hosting for you.

:::image type="content" source="../../assets/images/tabs/tabs-in-sharepoint/SharePoint-web-part-exposed-as-a-Tab-in-Microsoft-Teams.png" alt-text="Screenshot shows the web part exposed as a tab."  lightbox="../../assets/images/tabs/tabs-in-sharepoint/SharePoint-web-part-exposed-as-a-Tab-in-Microsoft-Teams.png":::

## Introduction

The tab used here's already hosted on Azure, to focus on the required integration work.

The sample app that is being used is a Talent Management application. It manages the hiring process of candidates for open positions in a team. Build a sample Teams app and load it into Teams. Don't create a real talent management application.

### Benefits of this approach

* Reach SharePoint users with your existing Teams tab.
* Upload your app manifest directly to your SharePoint app catalog. [Teams application packages](~/concepts/build-and-test/apps-package.md) are now supported by SharePoint.
* The users configure the tab on a page just like any other SharePoint web part.
* Your tab can access its [context](~/tabs/how-to/access-teams-context.md) same as it can, when running inside Teams.

To add Teams tab to SharePoint, perform the following steps to add Teams tab to SharePoint:

## Test the sample app

Download the [sample app manifest](https://github.com/MicrosoftDocs/msteams-docs/raw/master/msteams-platform/assets/downloads/TalentMgmt-Azure.zip).

1. Open Microsoft Teams.
1. Select the **Appstore** icon at the lower left of side tab.
1. Select **Upload a custom app** at the lower left. The following image displays the corresponding screen:  

    :::image type="content" source="../../assets/images/tabs/tabs-in-sharepoint/upload-custom-app.png" alt-text="Screenshot shows the Upload a custom app option."  lightbox="../../assets/images/tabs/tabs-in-sharepoint/upload-custom-app.png":::

1. The file to upload is located in your **Downloads** folder. It's called TalentMgmt-Azure.zip. The following image displays the corresponding screen:

    :::image type="content" source="../../assets/images/tabs/tabs-in-sharepoint/talentmgmt-azure.png" alt-text="Screenshot shows the Downloads folder.":::

1. You can see the install or consent screen for the talent management app. Select the team you want to install.
1. Select the **Install** and start experimenting with the app.

> [!NOTE]
> The SharePoint extension commands aren’t supported in the Teams **Files** tab. You can [add a SharePoint page, list, or document library as a tab in Teams](https://support.microsoft.com/en-us/office/add-a-sharepoint-page-list-or-document-library-as-a-tab-in-teams-131edef1-455f-4c67-a8ce-efa2ebf25f0b).

## Use Teams tab in SharePoint

1. Upload and deploy your Teams app package to your SharePoint App Catalog by visiting `https://YOUR_TENANT_NAME.sharepoint.com/sites/apps/AppCatalog/Forms/AllItems.aspx`. For example, `https://contoso.sharepoint.com/sites/apps/AppCatalog/Forms/AllItems.aspx`.

1. When prompted, enable **Make this solution available to all sites in the organization**.
The following image displays the corresponding screen:

    :::image type="content" source="../../assets/images/tabs/tabs-in-sharepoint/image065.png" alt-text="Screenshot shows the deploy dialog.":::

1. In your site, create a new page by selecting the gear button at the upper right and then  select **Add a page**.
The following image displays the corresponding screen:

    :::image type="content" source="../../assets/images/tabs/tabs-in-sharepoint/image066.png" alt-text="Screenshot shows the Office 365 settings options.":::

1. You can see the SharePoint pages authoring experience. Name your page as **My Teams Tab**.

1. Open the web part toolbox by selecting the `+` button, and select your Teams Tab, named **Contoso HR**. Web parts are sorted alphabetically. If it's a long list, you can use the search bar to find it. This creates a web part in the canvas that contains your Teams tab. The following image displays the tab view:

    :::image type="content" source="../../assets/images/tabs/tabs-in-sharepoint/image071.png" alt-text="Screenshot shows the tab view." lightbox="../../assets/images/tabs/tabs-in-sharepoint/image071.png":::

1. Select the **Publish** button after you finish editing.

1. Select **Add page to navigation** to have a quick reference to your page in the left navigation bar.
The following image displays the tab in SharePoint:

    :::image type="content" source="../../assets/images/tabs/tabs-in-sharepoint/image073.png" alt-text="Screenshot shows the tab in SharePoint." lightbox="../../assets/images/tabs/tabs-in-sharepoint/image073.png":::

## Explore App Pages in SharePoint

After your page is published, you can explore [turning your Teams app into a more complete experience inside SharePoint](/sharepoint/dev/spfx/web-parts/single-part-app-pages). This converts the current page into an App Page, showing the normal SharePoint page layout with a full page experience for the Teams tab.

The following image displays the complete experience of Teams app in SharePoint:

:::image type="content" source="../../assets/images/tabs/tabs-in-sharepoint/image085.png" alt-text="Screenshot shows the Teams app in SharePoint." lightbox="../../assets/images/tabs/tabs-in-sharepoint/image085.png":::

## Code sample

| **Sample name** | **Description** | **SPFx** |
|-----------------|-----------------|----------|
| SPFx web part | SPFx web part samples for tabs, channels, and groups. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-channel-group/spfx)

## See also

* [Integrate web apps](../../samples/integrate-web-apps-overview.md)
* [Build Microsoft Teams tab using SharePoint Framework - Tutorial](/sharepoint/dev/spfx/web-parts/get-started/using-web-part-as-ms-teams-tab)
* [Use single part app pages in SharePoint Online](/sharepoint/dev/spfx/web-parts/single-part-app-pages)
