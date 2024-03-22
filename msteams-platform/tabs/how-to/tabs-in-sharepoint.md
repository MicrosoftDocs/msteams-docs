---
title: Add Teams tab to SharePoint
description: Learn how to deploy your existing Teams tab to SharePoint as a SharePoint Framework web part using code samples.
ms.localizationpriority: medium
ms.topic: conceptual
ms.date: 06/08/2023
---

# Add Teams tab to SharePoint

Get a rich integration experience between Microsoft Teams and SharePoint by adding a Microsoft Teams tab in SharePoint as a SharePoint Framework (SPFx) web part. This document guides you on how to take a tab from a Microsoft Teams sample app and use it in SharePoint. With the latest release of Teams and SPFx, you have the following two capabilities:

- [Teams tabs in SharePoint](#teams-tabs-in-sharepoint)
- [SharePoint web parts in Teams](#sharepoint-web-parts-in-teams)

## Teams tabs in SharePoint

You can host your Teams tabs in SharePoint with SPFx. Tabs hosted in SharePoint get a full-page experience, with the features of Teams tabs visible, while retaining the context and familiarity of a SharePoint site.

:::image type="content" source="../../assets/images/tabs/tabs-in-sharepoint/image084.png" alt-text="Screenshot shows a Teams tab in SharePoint view." lightbox="../../assets/images/tabs/tabs-in-sharepoint/image084.png":::

### Benefits

- Reach SharePoint users with your existing Teams tab.
- Upload your app manifest directly to your SharePoint App Catalog. SharePoint supports [Teams application packages](~/concepts/build-and-test/apps-package.md).
- Users can configure the tab on a page just like any other SharePoint web part.
- Your tab can access its [context](~/tabs/how-to/access-teams-context.md) same as it can when running in Teams.

## SharePoint web parts in Teams

SharePoint hosts SPFx web parts without the need for external services like Azure. For SharePoint developers, this feature simplifies the development process for Teams tabs. For more information on SPFx in Teams, see [how to use the SharePoint Framework in Teams.](/sharepoint/dev/spfx/web-parts/get-started/using-web-part-as-ms-teams-tab)

:::image type="content" source="../../assets/images/tabs/tabs-in-sharepoint/SharePoint-web-part-exposed-as-a-Tab-in-Microsoft-Teams.png" alt-text="Screenshot shows the web part exposed as a Teams tab."  lightbox="../../assets/images/tabs/tabs-in-sharepoint/SharePoint-web-part-exposed-as-a-Tab-in-Microsoft-Teams.png":::

## Test the sample app

1. Download the [sample app manifest](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-HR-talent/csharp/src/demo-manifest).

   It's a talent management app that manages the hiring process of candidates for open positions in a team.

2. In Teams, select **Apps** > **Manage your apps** > **Upload an app**.

3. Select **Upload a custom app**.

    :::image type="content" source="../../assets/images/tabs/tabs-in-sharepoint/upload-custom-app.png" alt-text="Screenshot shows the option to upload a custom app in Teams.":::

4. Select the sample app manifest and select **Open**.

    :::image type="content" source="../../assets/images/tabs/tabs-in-sharepoint/talentmgmt-azure.png" alt-text="Screenshot shows the Downloads folder.":::

5. A dialog box opens to let you add the custom app to Teams. Under **Add** dropdown, select **Add to a team**.

    :::image type="content" source="../../assets/images/tabs/tabs-in-sharepoint/custom-tab-add-to-team.png" alt-text="Screenshot shows how to add a custom app to a team.":::

6. Select the team you where you want to install the app and select **Set up**.

    :::image type="content" source="../../assets/images/tabs/tabs-in-sharepoint/set-up-custom-tab.png" alt-text="Screenshot shows the option to select set-up a tab in a team.":::

7. A new **Candidates** static tab is added to your team's channels. You can experiment with the app and test its various features including configurable tabs and a chatbot.

    :::image type="content" source="../../assets/images/tabs/tabs-in-sharepoint/teams-tab-custom-app.png" alt-text="Screenshot shows a new tab added in a team.":::

> [!NOTE]
> SharePoint extension commands aren’t supported in the Teams **Files** tab. You can [add a SharePoint page, list, or document library as a tab in Teams](https://support.microsoft.com/office/add-a-sharepoint-page-list-or-document-library-as-a-tab-in-teams-131edef1-455f-4c67-a8ce-efa2ebf25f0b).

## Use Teams tab in SharePoint

1. Upload and deploy your Teams app package to your SharePoint App Catalog by visiting `https://YOUR_TENANT_NAME.sharepoint.com/sites/apps/AppCatalog/Forms/AllItems.aspx`. For example, `https://contoso.sharepoint.com/sites/apps/AppCatalog/Forms/AllItems.aspx`.

1. When prompted, enable **Make this solution available to all sites in the organization**.

    :::image type="content" source="../../assets/images/tabs/tabs-in-sharepoint/image065.png" alt-text="Screenshot shows the deploy dialog.":::

1. Create a new page in your site. Select the gear button and then select **Add a page**.

    :::image type="content" source="../../assets/images/tabs/tabs-in-sharepoint/image066.png" alt-text="Screenshot shows the Office 365 settings options.":::

1. Set up your page and give an appropriate name such as **My Teams Tab**.

2. Open the web part toolbox by selecting the `+` button and select **Contoso Talent** from the list. This action creates a web part in the canvas that contains your Teams tab.

    :::image type="content" source="../../assets/images/tabs/tabs-in-sharepoint/image071.png" alt-text="Screenshot shows the tab view." lightbox="../../assets/images/tabs/tabs-in-sharepoint/image071.png":::

3. Select the **Publish** button after you finish editing.

4. Select **Add page to navigation** to have a quick reference to your page in the left navigation bar.

    :::image type="content" source="../../assets/images/tabs/tabs-in-sharepoint/image073.png" alt-text="Screenshot shows the tab in SharePoint." lightbox="../../assets/images/tabs/tabs-in-sharepoint/image073.png":::

### Explore Single Part App Pages in SharePoint

After you publish your page, explore [Single Part App Pages in SharePoint](/sharepoint/dev/spfx/web-parts/single-part-app-pages). This article helps you convert the current page into a Single Part App Page, a normal SharePoint page layout with the full page experience for the Teams tab.

:::image type="content" source="../../assets/images/tabs/tabs-in-sharepoint/image085.png" alt-text="Screenshot shows the Teams app in SharePoint." lightbox="../../assets/images/tabs/tabs-in-sharepoint/image085.png":::

### Code sample

| **Sample name** | **Description** | **SPFx** |
|-----------------|-----------------|----------|
| SPFx web part | SPFx web part samples for tabs, channels, and groups. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-HR-talent/csharp) |

## See also

- [Integrate web apps](../../samples/integrate-web-apps-overview.md)
- [Build Microsoft Teams tab using SharePoint Framework - Tutorial](/sharepoint/dev/spfx/web-parts/get-started/using-web-part-as-ms-teams-tab)
- [Use single part app pages in SharePoint Online](/sharepoint/dev/spfx/web-parts/single-part-app-pages)
- [Developer-provided Microsoft Teams app manifest and package](/sharepoint/dev/spfx/deployment-spfx-teams-solutions#developer-provided-microsoft-teams-app-manifest--package)
