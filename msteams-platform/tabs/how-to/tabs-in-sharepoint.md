---
title: Integrate Teams Tab to SharePoint
description: Learn about SharePoint web parts and how to add and deploy your existing Teams tab to SharePoint as a SharePoint Framework web part using code samples.
ms.localizationpriority: medium
ms.topic: conceptual
ms.date: 12/11/2024
---

# Add Teams tab to SharePoint

Experience a rich integration of Microsoft Teams and SharePoint by adding a Teams tab as a SharePoint Framework (SPFx) web part. This article guides you on how to integrate a tab from a Teams sample app into SharePoint. With the latest release of Teams and SPFx, you have the following two capabilities:

- [SharePoint web parts in Teams](#sharepoint-web-parts-in-teams)
- [Teams tabs in SharePoint](#teams-tabs-in-sharepoint)

## SharePoint web parts in Teams

SharePoint hosts SPFx web parts without the need for external services such as Azure. For SharePoint developers, this functionality simplifies the development process for Teams tabs. For more information, see [how to use the SharePoint Framework in Teams](/sharepoint/dev/spfx/web-parts/get-started/using-web-part-as-ms-teams-tab).

:::image type="content" source="../../assets/images/tabs/tabs-in-sharepoint/SharePoint-web-part-exposed-as-a-Tab-in-Microsoft-Teams.png" alt-text="Screenshot shows the web part exposed as a Teams tab." lightbox="../../assets/images/tabs/tabs-in-sharepoint/SharePoint-web-part-exposed-as-a-Tab-in-Microsoft-Teams.png":::

## Teams tabs in SharePoint

With SPFx, you can host your Teams tabs directly in SharePoint that provides a full-page experience. It retains the functionality of Teams tabs while maintaining the context and familiarity of a SharePoint site.

:::image type="content" source="../../assets/images/tabs/tabs-in-sharepoint/image084.png" alt-text="Screenshot shows a Teams tab in SharePoint view." lightbox="../../assets/images/tabs/tabs-in-sharepoint/image084.png":::

### Benefits

- Reach SharePoint users with your existing Teams tab.
- Upload your app manifest (previously called Teams app manifest) directly to your SharePoint App Catalog. SharePoint supports [Teams app package](~/concepts/build-and-test/apps-package.md).
- Configure the tab on a page just like any other SharePoint web part.
- Access the [context](~/tabs/how-to/access-teams-context.md) of your tab the same way it does when running in Teams.

## Test the sample app

1. Download the [sample app manifest](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/app-hello-world/csharp/demo-manifest/app-hello-world.zip).

1. In Teams, select **Apps** > **Manage your apps** > **Upload an app**.

1. Select **Upload a custom app**.

    :::image type="content" source="../../assets/images/tabs/tabs-in-sharepoint/upload-custom-app.png" alt-text="Screenshot shows the option to upload a custom app in Teams.":::

1. Select the sample app manifest .zip file and select **Open**. A dialog opens to add the custom app.

1. Select **Add**.

    :::image type="content" source="../../assets/images/tabs/tabs-in-sharepoint/custom-tab-add-to-team.png" alt-text="Screenshot of the app details dialog to add the sample app to Teams.":::

1. Select **Open** to open the app in personal scope. 

   Alternatively, you can either search and select the required scope or select a channel or meeting from the list, and move through the dialog to select **Go**.

   :::image type="content" source="../../assets/images/tabs/tabs-in-sharepoint/add-scope.png" alt-text="Screenshot of the scope selection dialog to select the required scope.":::

1. A new static tab is added to your Teams channel.

    You can experiment with the app and test its features including configurable tabs and a chatbot.

    :::image type="content" source="../../assets/images/tabs/tabs-in-sharepoint/teams-tab-custom-app.png" alt-text="Screenshot shows a new tab added in a team.":::

> [!NOTE]
> SharePoint extension commands aren’t supported in the Teams **Files** tab. You can [add a SharePoint page, list, or document library as a tab in Teams](https://support.microsoft.com/office/add-a-sharepoint-page-list-or-document-library-as-a-tab-in-teams-131edef1-455f-4c67-a8ce-efa2ebf25f0b).

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Test+the+sample+app&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Ftabs-in-sharepoint%23test-the-sample-app&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Ftabs-in-sharepoint.md&documentVersionIndependentId=afcc83c4-12c0-bab6-1cec-61ac463b4f60&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

### Use Teams tab in SharePoint

1. Upload and deploy your Teams app package to your SharePoint App Catalog by visiting `https://YOUR_TENANT_NAME.sharepoint.com/sites/appcatalog/AppCatalog/Forms/AllItems.aspx`.

    For example, `https://contoso.sharepoint.com/sites/appcatalog/AppCatalog/Forms/AllItems.aspx`.

    - When prompted, enable **Make this solution available to all sites in the organization**.

        :::image type="content" source="../../assets/images/tabs/tabs-in-sharepoint/image065.png" alt-text="Screenshot shows the deploy dialog.":::

    You must then create a new page in your site.

1. To create a new page, select **Settings** :::image type="icon" source="../../assets/images/tabs/tabs-in-sharepoint/gear-icon.png" border="false"::: and select **Add a page**.

    :::image type="content" source="../../assets/images/tabs/tabs-in-sharepoint/image066.png" alt-text="Screenshot shows the Office 365 settings options.":::

1. Set up your page and give an appropriate name such as **My Teams Tab**.

1. Select **+** to open the web part toolbox.

    :::image type="content" source="../../assets/images/tabs/tabs-in-sharepoint/add-web-part.png" alt-text="Screenshot shows the option to add web part." lightbox="../../assets/images/tabs/tabs-in-sharepoint/add-web-part-lightbox.png":::

1. From the list, search and select the app you uploaded. It creates a web part in the canvas that contains your Teams tab.

    :::image type="content" source="../../assets/images/tabs/tabs-in-sharepoint/image071.png" alt-text="Screenshot shows the tab view." lightbox="../../assets/images/tabs/tabs-in-sharepoint/image071.png":::

1. After you finish editing, select **Publish**.

1. Select **Add page to navigation** to have a quick reference to your page in the left navigation bar.

    :::image type="content" source="../../assets/images/tabs/tabs-in-sharepoint/image073.png" alt-text="Screenshot shows the tab in SharePoint." lightbox="../../assets/images/tabs/tabs-in-sharepoint/image073.png":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Use+Teams+tab+in+SharePoint&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Ftabs-in-sharepoint%23use-teams-tab-in-sharepoint&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Ftabs-in-sharepoint.md&documentVersionIndependentId=afcc83c4-12c0-bab6-1cec-61ac463b4f60&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

### Explore single part app pages in SharePoint

After you publish your page, explore [single part app pages in SharePoint](/sharepoint/dev/spfx/web-parts/single-part-app-pages). This helps you convert the current page into a single part app page, a normal SharePoint page layout with the full-page experience for the Teams tab.

:::image type="content" source="../../assets/images/tabs/tabs-in-sharepoint/image085.png" alt-text="Screenshot shows the Teams app in SharePoint." lightbox="../../assets/images/tabs/tabs-in-sharepoint/image085.png":::

### Code sample

| **Sample name** | **Description** | **SPFx** |
|-----------------|-----------------|----------|
| SPFx web part | SPFx web part samples for tabs, channels, and groups. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/app-hello-world/csharp/) |

## See also

- [Integrate web apps](../../samples/integrate-web-apps-overview.md)
- [Build Microsoft Teams tab using SharePoint Framework - Tutorial](/sharepoint/dev/spfx/web-parts/get-started/using-web-part-as-ms-teams-tab)
- [Use single part app pages in SharePoint Online](/sharepoint/dev/spfx/web-parts/single-part-app-pages)
- [Developer-provided Microsoft Teams app manifest and package](/sharepoint/dev/spfx/deployment-spfx-teams-solutions#developer-provided-microsoft-teams-app-manifest--package)
