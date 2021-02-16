---
title: Adding a Microsoft Teams tab in SharePoint as an SPFx web part
author: laujan
description: How to deploy your existing Teams tab to SharePoint as a SharePoint Framework web part.
keywords: teams tabs sharepoint framework development
ms.topic: conceptual
ms.author: lajanuar
---

# Adding a Microsoft Teams tab in SharePoint as an SPFx web part

## Rich integration between Teams and SharePoint

With the November release of Teams and SharePoint Framework v. 1.7, developers have two powerful capabilities:

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

With SharePoint Framework v.1.7, we’re now supporting the ability for developers to take their Teams tabs and host it in SharePoint. As Tabs hosted in SharePoint get a similar "full page" experience, exposing the all the features of Teams tabs while retaining the context and familiarity of a SharePoint site.

### SharePoint Framework in Teams

You can also implement your Microsoft Teams tabs using SharePoint Framework. For SharePoint developers, this significantly simplifies the development process for Teams tabs because SharePoint Framework web parts are hosted within SharePoint without any need for external services such as Azure. [Learn more about using the SharePoint Framework in Teams.](/sharepoint/dev/spfx/web-parts/get-started/using-web-part-as-ms-teams-tab)

## Introduction

These instructions will explain how you can take a tab from a Microsoft Teams sample app and use it in SharePoint. We will be using a tab that's already hosted on Azure in order to focus on the required integration work.

The sample app we're using is a Talent Management application. It manages the hiring process of candidates for open positions in a team. (The app itself, while it looks nice, doesn't actually do anything. We want to focus on building a Teams app and loading it into Teams, not create a real talent management application.)

### Benefits of this approach

- Reach SharePoint users with your existing Teams tab
- Upload your app manifest directly to your SharePoint app catalog. [Teams application packages](~/concepts/build-and-test/apps-package.md) are now supported by SharePoint
- End users configure the tab on a page just like any other SharePoint web part
- Your tab can access its [context](~/tabs/how-to/access-teams-context.md) just as it can when running inside Teams

## Step 1: Testing the sample app

Download the sample app manifest from [**here**](https://github.com/MicrosoftDocs/msteams-docs/raw/master/msteams-platform/assets/downloads/TalentMgmt-Azure.zip).

In Microsoft Teams, click on the Store icon at the lower left and then "Upload a custom app" at the lower left. The file to upload will be located in your Downloads folder; it's called TalentMgmt-Azure.zip. If all goes well, you'll see the install/consent screen for the talent management app. Choose the team you want to install to and click the Install button. You're now free to experiment with the app.

## Step 2: Using the Teams tab in SharePoint

Upload and deploy your Teams app package to your SharePoint App Catalog by visiting `https://YOUR_TENANT_NAME.sharepoint.com/sites/apps/AppCatalog/Forms/AllItems.aspx`, e.g. `https://contoso.sharepoint.com/sites/apps/AppCatalog/Forms/AllItems.aspx`.

When prompted, enable "Make this solution available to all sites in the organization":

![Tabs in Sharepoint view](~/assets/images/tabs/tabs-in-sharepoint/image065.png)

In your site, create a new page by clicking in the gear button at the upper right and then "Add a page":

![Sharepoint view](~/assets/images/tabs/tabs-in-sharepoint/image066.png)

You'll see the SharePoint Pages authoring experience. Name your page "My Teams Tab".

Open the web part toolbox by pressing the + button, and select your Teams Tab (named "Contoso HR"). Web parts are sorted alphabetically; if it's a long list, you can use the search bar to find it. This will create a web part in the canvas that contains your Teams tab:

![Tab view](~/assets/images/tabs/tabs-in-sharepoint/image071.png)

Press the "Publish" button when you are finished editing.

You may want to click "Add page to navigation" to have a quick reference to your page in the left navigation bar:

![Tab in Sharepoint image](~/assets/images/tabs/tabs-in-sharepoint/image073.png)

## Step 3: Explore App Pages in SharePoint

Once your page is published, you can explore [turning your Teams app into a more complete experience inside SharePoint](/sharepoint/dev/spfx/web-parts/single-part-app-pages). This converts the current page into an App Page, showing the normal SharePoint page layout with a full-page experience for the Teams tab:

![Image of Tabs in Sharepoint](~/assets/images/tabs/tabs-in-sharepoint/image085.png)

## Code sample
| **Sample name** | **Description** | **SPFx** |
|-----------------|-----------------|----------|
| SPFx web part | SPFx web part samples for tabs, channels, and groups. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-channel-group/spfx)

## More information

- [Building Microsoft Teams tab using SharePoint Framework - Tutorial](/sharepoint/dev/spfx/web-parts/get-started/using-web-part-as-ms-teams-tab)
- [Using single part app pages in SharePoint Online](/sharepoint/dev/spfx/web-parts/single-part-app-pages)
