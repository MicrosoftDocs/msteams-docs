---
title: Using a Microsoft Teams tab as a SharePoint Framework web part
description: Tutorial on how to deploy your existing Teams tab as a SharePoint web part. Capability was released to preview with SharePoint Framework v1.7.
keywords: teams tabs sharepoint development
ms.date: 11/05/2018
---

# Using a Microsoft Teams tab as a SharePoint Framework web part

> [!IMPORTANT]
> This feature is currently in preview and is subject to change. It is not currently supported for use in production environments. Your feedback and input around this capability is welcome using the [SharePoint Dev Docs issue list](https://github.com/SharePoint/sp-dev-docs/issues).

With SharePoint Framework v.1.7, we’re now supporting the ability for developers to take their Teams Tab application experience and host it back in SharePoint. As Tabs are hosted in SharePoint they get a similar “full page” experience, exposing the full power of applications while retaining the context and familiarity of a SharePoint site.

![](~/assets/images/tabs/tabs-in-sharepoint/image084.png)

### Benefits of this approach

- Reach SharePoint users with your existing Teams tab application
- Upload your app manifest directly to your SharePoint app catalog – 
  - The Teams application manifest is natively recognized by SharePoint
- End user can configure the tab on a page just like any other SharePoint web part​
- Just like bringing your SPFx solution into Teams, your tab is able to get the right application context

[Developers can also use their SharePoint Framework web part as a Microsoft Teams tab](link-to-sharepoint-docs.html)


## Introduction

These instructions will explain how you can take a tab from a Microsoft Teams sample app and use it in SharePoint. We will be using a tab that's already hosted on Azure in order to focus on the required intergration work.

The sample app we're using manages the hiring process of candidates for open positions in a team – a Talent Management Application. The app itself, while it looks good, doesn't actually do anything – we want to focus on building a Teams app and loading it into Teams, not create a real talent management application.

## Step 1: Testing the Sample App

Download the sample app manifest from [**here**](https://github.com/billbliss/microsoft-teams-sample-talent-acquisition/raw/master/TeamsAppPackages/hr-app-package.zip)

In Microsoft Teams, click on the Store icon and then "Upload a custom app" at the lower left – the file will be located in your Downloads folder and it's called hr-app-package.zip. If all goes well, you'll see the install/consent screen for your app. Choose the team you want to install to and click the Install button. You're now free to experiment with your app.

## Step 2: Using the Teams Tab in SharePoint

Upload and deploy your Teams Tab package (either the one you downloaded from [here](https://github.com/billbliss/microsoft-teams-sample-talent-acquisition/blob/master/TeamsAppPackages/TalentMgmt-Azure.zip?raw=true)) or the one you exported from Teams App Studio) to your SharePoint App Catalog (in SharePoint).

When prompted, enable "Make this solution available to all sites in the organization".

![](~/assets/images/tabs/tabs-in-sharepoint/image065.png)

In your site, create a new page, by clicking in the gear button (top-right) and then "Add a page"

![](~/assets/images/tabs/tabs-in-sharepoint/image066.png)

You'll see the pages authoring experience. Name your page, for example "My Teams Tab".

Open the web part toolbox, by pressing the + button, and select your Teams Tab (named "Contoso HR"). Web parts are sorted alphabetically. You can use the search bar for the right name. This will create a web part in the canvas that contains your Teams Tab:

![](~/assets/images/tabs/tabs-in-sharepoint/image071.png)

Press the "Publish" button to finish editing.

Note: You may want to click "Add page to navigation" to have a quick reference to your page in the left navigation bar:

![](~/assets/images/tabs/tabs-in-sharepoint/image073.png)


## Step 3: Explore App Pages in SharePoint




Once your page is published, you can explore [turning your Teams app into a fuller experience inside of SharePoint.](https://github.com/SharePoint/sp-dev-docs-internal/blob/master/spfx-170/spfx/web-parts/single-part-app-pages.md#changing-page-layout-using-javascript-in-browser-console). This will convert the current page into an App Page, showing the normal page chrome with a full-page experience for the Teams Tab.

- [Using single part app pages in SharePoint Online.](https://github.com/SharePoint/sp-dev-docs-internal/blob/master/spfx-170/spfx/web-parts/single-part-app-pages.md#changing-page-layout-using-javascript-in-browser-console)

![](~/assets/images/tabs/tabs-in-sharepoint/image085.png)

## Step 4: Exploring the APIs

(Coming Soon) Microsoft Teams developers are able to get SharePoint-specific contexts when their app is loaded as a webpart. For example, the "getContext" call will return all the data from SharePoint's PageContext

Example from a formatted version of this JSON:

![](~/assets/images/tabs/tabs-in-sharepoint/image081.png)

## Other Links

- [Building Microsoft Teams tab using SharePoint Framework - Tutorial](link)
- [Using single part app pages in SharePoint Online](link)