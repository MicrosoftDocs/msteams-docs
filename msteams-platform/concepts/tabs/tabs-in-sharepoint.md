---
title: Using a Microsoft Teams tab as a SharePoint Framework web part
description: Tutorial on how to deploy your existing Teams tab as a SharePoint web part. Capability was released to preview with SharePoint Framework v1.7.
keywords: teams tabs sharepoint development
layout: LandingPage
ms.date: 11/05/2018
---

# Using a Microsoft Teams tab as a SharePoint Framework web part

> [!IMPORTANT]
> This feature is currently in preview and is subject to change. It is not currently supported for use in production environments. Your feedback and input around this capability is welcome using the [SharePoint Dev Docs issue list](https://github.com/SharePoint/sp-dev-docs/issues).


## Rich Integration with  Teams and SharePoint 

<ul  class="panelContent cardsC">
<li>
    <a href="#introduction">
        <div class="cardSize">
            <div class="cardPadding">
                <div class="card">
                    <div class="cardImageOuter">
                        <div class="cardImage bgdAccent1">
                            <img src="~/assets/images/tabs/tabs-in-sharepoint/image084.png" />
                        </div>
                    </div>
                    <div class="cardText">
                        <h3>Teams tab in SharePoint</h3>
                        <p> Create rich app experiences in SharePoint by bringing your Teams app into Sharepoint </p>
                    </div>
                </div>
            </div>
        </div>
    </a>
</li>
<li>
    <a href="https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-web-part-as-ms-teams-tab">
        <div class="cardSize">
            <div class="cardPadding">
                <div class="card">
                    <div class="cardImageOuter">
                        <div class="cardImage bgdAccent1">
                            <img src="~/assets/images/tabs/tabs-in-sharepoint/SharePoint-web-part-exposed-as-a-Tab-in-Microsoft-Teams.png" />
                        </div>
                    </div>
                    <div class="cardText">
                        <h3>SharePoint Framework in Teams</h3>
                        <p> Bring your SharePoint web parts to Teams and we'll manage the hosting for you. </p>
                    </div>
                </div>
            </div>
        </div>
    </a>
</li>
</ul>

### Teams tab in SharePoint

With SharePoint Framework v.1.7, we’re now supporting the ability for developers to take their Teams Tab application experience and host it back in SharePoint. As Tabs are hosted in SharePoint they get a similar “full page” experience, exposing the full power of applications while retaining the context and familiarity of a SharePoint site

### SharePoint Framework in Teams

You can also implement your Microsoft Teams tabs using SharePoint Framework. This significantly simplifies Teams tab development process as SharePoint Framework web parts are automatically hosted within SharePoint without any need for external services. [You can learn more about using the SharePoint Framework in Teams on the SharePoint documentation website.](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-web-part-as-ms-teams-tab)

## Introduction

These instructions will explain how you can take a tab from a Microsoft Teams sample app and use it in SharePoint. We will be using a tab that's already hosted on Azure in order to focus on the required intergration work.

The sample app we're using is a a Talent Management Application. It manages the hiring process of candidates for open positions in a team. The app itself, while it looks good, doesn't actually do anything. We want to focus on building a Teams app and loading it into Teams, not create a real talent management application.

### Benefits of this approach

- Reach SharePoint users with your existing Teams tab application
- Upload your app manifest directly to your SharePoint app catalog
  - The Teams application manifest is natively recognized by SharePoint
- Your end user can configure the tab on a page just like any other SharePoint web part​
- Just like bringing your SPFx solution into Teams, your tab is able to get the right application context

## Step 1: Testing the Sample App

Download the sample app manifest from [**here**](https://github.com/billbliss/microsoft-teams-sample-talent-acquisition/raw/master/TeamsAppPackages/hr-app-package.zip)

In Microsoft Teams, click on the Store icon and then "Upload a custom app" at the lower left. The file will be located in your Downloads folder and it's called hr-app-package.zip. If all goes well, you'll see the install/consent screen for your app. Choose the team you want to install to and click the Install button. You're now free to experiment with your app.

## Step 2: Using the Teams Tab in SharePoint

Upload and deploy your Teams Tab package to your SharePoint App Catalog (in SharePoint) by visiting `https://YOUR_TENANT_NAME.sharepoint.com/sites/apps/AppCatalog/Forms/AllItems.aspx`.

When prompted, enable "Make this solution available to all sites in the organization".

![](~/assets/images/tabs/tabs-in-sharepoint/image065.png)

In your site, create a new page, by clicking in the gear button (top-right) and then "Add a page".

![](~/assets/images/tabs/tabs-in-sharepoint/image066.png)

You'll see the pages authoring experience. Name your page "My Teams Tab".

Open the web part toolbox, by pressing the + button, and select your Teams Tab (named "Contoso HR"). Web parts are sorted alphabetically. You can use the search bar for the right name. This will create a web part in the canvas that contains your Teams Tab:

![](~/assets/images/tabs/tabs-in-sharepoint/image071.png)

Press the "Publish" button to finish editing.

You may want to click "Add page to navigation" to have a quick reference to your page in the left navigation bar:

![](~/assets/images/tabs/tabs-in-sharepoint/image073.png)

## Step 3: Explore App Pages in SharePoint

Once your page is published, you can explore [turning your Teams app into a fuller experience inside of SharePoint.](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/single-part-app-pages). This will convert the current page into an App Page, showing the normal page chrome with a full-page experience for the Teams Tab.

- [Using single part app pages in SharePoint Online.](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/single-part-app-pages)

![](~/assets/images/tabs/tabs-in-sharepoint/image085.png)

## Other Links

- [Building Microsoft Teams tab using SharePoint Framework - Tutorial](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-web-part-as-ms-teams-tab)
- [Using single part app pages in SharePoint Online](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/single-part-app-pages)
