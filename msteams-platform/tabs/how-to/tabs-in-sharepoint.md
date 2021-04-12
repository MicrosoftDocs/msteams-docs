---
title: Adding a Microsoft Teams tab in SharePoint as an SPFx web part
author: laujan
description: How to deploy your existing Teams tab to SharePoint as a SharePoint Framework web part.
keywords: teams tabs sharepoint framework development
ms.topic: conceptual
ms.author: lajanuar
---

# Adding a Microsoft Teams tab in SharePoint as an SPFx web part

You can get a rich integration experience between Microsoft Teams and SharePoint by adding a Microsoft Teams tab in SharePoint as an SPFx web part. This document guides you on how you to take a tab from a Microsoft Teams sample app and use it in SharePoint.

## Rich integration between Teams and SharePoint

With the November release of Teams and SharePoint Framework v.1.7, developers have two powerful capabilities:

<ul  class="panelContent cardsC">
<li>
    <a href="#introduction">
        <div class="cardSize">
            <div class="cardPadding">
                <div class="card">
                    <div class="cardImageOuter">
                        <div class="cardImage bgdAccent1">
                            <img src="~/assets/images/tabs/tabs-in-sharepoint/image084.png" alt="tab-in-sharepoint view"/>
                        </div>
                    </div>
                    <div class="cardText">
                        <h3>Teams Tabs in SharePoint</h3>
                        <p>Create rich app experiences in SharePoint by bringing your Teams app into Sharepoint (this article).</p>
                    </div>
                </div>
            </div>
        </div>
    </a>
</li>
<li>
    <a href="https://docs.microsoft.com/sharepoint/dev/spfx/web-parts/get-started/using-web-part-as-ms-teams-tab">
        <div class="cardSize">
            <div class="cardPadding">
                <div class="card">
                    <div class="cardImageOuter">
                        <div class="cardImage bgdAccent1">
                            <img src="~/assets/images/tabs/tabs-in-sharepoint/SharePoint-web-part-exposed-as-a-Tab-in-Microsoft-Teams.png" alt="web-part-exposed-as-a-tab" />
                        </div>
                    </div>
                    <div class="cardText">
                        <h3>SharePoint Framework in Teams</h3>
                        <p>Bring your SharePoint web parts to Teams and let SharePoint manage the hosting for you.</p>
                    </div>
                </div>
            </div>
        </div>
    </a>
</li>
</ul>

### Teams tabs in SharePoint

With SharePoint Framework v.1.7, you can host your Teams tabs in SharePoint. As Tabs hosted in SharePoint get a similar **full page** experience, exposing all the features of Teams tabs while retaining the context and familiarity of a SharePoint site.

### SharePoint Framework in Teams

You can also implement your Microsoft Teams tabs using SharePoint Framework. For SharePoint developers, this significantly simplifies the development process for Teams tabs because SharePoint Framework web parts are hosted within SharePoint without any need for external services, such as Azure. For more information on SharePoint Framework in Teams, see [how to use the SharePoint Framework in Teams.](/sharepoint/dev/spfx/web-parts/get-started/using-web-part-as-ms-teams-tab)

## Introduction

The tab used here is already hosted on Azure, to focus on the required integration work.

The sample app that is being used is a Talent Management application. It manages the hiring process of candidates for open positions in a team. Build a sample Teams app and load it into Teams. Do not create a real talent management application.

### Benefits of this approach

* Reach SharePoint users with your existing Teams tab.
* Upload your app manifest directly to your SharePoint app catalog. [Teams application packages](~/concepts/build-and-test/apps-package.md) are now supported by SharePoint.
* The users configure the tab on a page just like any other SharePoint web part.
* Your tab can access its [context](~/tabs/how-to/access-teams-context.md) just as it can when running inside Teams.

## Step 1: Testing the sample app

Download the [sample app manifest](https://github.com/MicrosoftDocs/msteams-docs/raw/master/msteams-platform/assets/downloads/TalentMgmt-Azure.zip).

* Go to Microsoft Teams.
* Select the **Appstore** icon at the lower left of side tab.
* Select **Upload a custom app** at the lower left. The following image displays the corresponding screen:  

    ![upload a custom app](~/assets/images/tabs/tabs-in-sharepoint/upload-custom-app.png)

* The file to upload is located in your **Downloads** folder. It is called TalentMgmt-Azure.zip. The following image displays the corresponding screen:
 
    ![TalentMgmt in Azure](~/assets/images/tabs/tabs-in-sharepoint/talentmgmt-azure.png)

* You can see the install or consent screen for the talent management app. Select the team you want to install. 
* Select the Install button. Now, you can experiment with the app.

## Step 2: Using the Teams tab in SharePoint

* Upload and deploy your Teams app package to your SharePoint App Catalog by visiting `https://YOUR_TENANT_NAME.sharepoint.com/sites/apps/AppCatalog/Forms/AllItems.aspx`, e.g. `https://contoso.sharepoint.com/sites/apps/AppCatalog/Forms/AllItems.aspx`.

* When prompted, enable **Make this solution available to all sites in the organization**.
The following image displays the corresponding screen:

   ![Tabs in Sharepoint view](~/assets/images/tabs/tabs-in-sharepoint/image065.png)

* In your site, create a new page by selecting the gear button at the upper right and then **Add a page**.
The following image displays the corresponding screen:

   ![Sharepoint view](~/assets/images/tabs/tabs-in-sharepoint/image066.png)

* You can see the SharePoint Pages authoring experience. Name your page as **My Teams Tab**.

* Open the web part toolbox by pressing the `+`button, and select your Teams Tab, named **Contoso HR**. Web parts are sorted alphabetically. iI it is a long list, you can use the search bar to find it. This creates a web part in the canvas that contains your Teams tab. The following image displays the tab view:

   ![Tab view](~/assets/images/tabs/tabs-in-sharepoint/image071.png)

* Press the **Publish** button after you finish  editing.

* Select **Add page to navigation** to have a quick reference to your page in the left navigation bar. 
The following image displays the tab in Sharepoint: 

   ![Tab in Sharepoint image](~/assets/images/tabs/tabs-in-sharepoint/image073.png)

## Step 3: Explore App Pages in SharePoint

After your page is published, you can explore [turning your Teams app into a more complete experience inside SharePoint](/sharepoint/dev/spfx/web-parts/single-part-app-pages). This converts the current page into an App Page, showing the normal SharePoint page layout with a full-page experience for the Teams tab. 

The following image displays the complete experience of Teams app in Sharepoint:
![Image of Tabs in Sharepoint](~/assets/images/tabs/tabs-in-sharepoint/image085.png)

## Code sample
| **Sample name** | **Description** | **SPFx** |
|-----------------|-----------------|----------|
| SPFx web part | SPFx web part samples for tabs, channels, and groups. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-channel-group/spfx)

## See also

> [!div class="nextstepaction"]
> [Building Microsoft Teams tab using SharePoint Framework - Tutorial](/sharepoint/dev/spfx/web-parts/get-started/using-web-part-as-ms-teams-tab)

> [!div class="nextstepaction"]
> [Using single part app pages in SharePoint Online](/sharepoint/dev/spfx/web-parts/single-part-app-pages)
