---
title: Add a Teams tab to your Sharepoint site
description: Describes how to take an existing Teams tab and have it 
keywords: teams tabs sharepoint development
ms.date: 10/15/2018
---

# Add a Teams tab to your Sharepoint site

> [!Note]
> This feature is still in Dev Preview and while it closely reflects the final version, there may be small changes before this feature is Generally Availability

## Background

- Reach SharePoint users with your existing provider-hosted tab application
- Upload your app manifest directly to your SharePoint app catalog – format is natively recognized by SharePoint​
- End user sets up and configures the tab on a page just like any other web part​
- Just like bringing your SPFx solution into Teams, your tab is able to get the right application context

![Surfacing Teams Tab in SharePoint 1/2](~/assets/images/tabs/tabs-in-sharepoint/image082.png)

![Surfacing Teams Tab in SharePoint 2/2](~/assets/images/tabs/tabs-in-sharepoint/image083.png)

## Introduction

These instructions will explain how you can take a tab from a Microsoft Teams sample app and use it in SharePoint. We will be using a tab that's already hosted on Azure in order to focus on the required intergration work.

The sample app we're using manages the hiring process of candidates for open positions in a team – a Talent Management Application. The app itself, while it looks good, doesn't actually do anything – we want to focus on building a Teams app and loading it into Teams, not create a real talent management application.

## Step 1: Testing the Sample App

Download the sample app manifest from [**here**](https://github.com/billbliss/microsoft-teams-sample-talent-acquisition/raw/master/TeamsAppPackages/hr-app-package.zip)

In Microsoft Teams, click on the Store icon and then "Upload a custom app" at the lower left – the file will be located in your Downloads folder and it's called hr-app-package.zip (if you are using the Azure version) or "ContosoHR.zip" if you built it yourself. If all goes well, you'll see the install/consent screen for your app. Choose the team you want to install to (presumably, a test team you created earlier this week) and click the Install button (of course the team names will be different):

![](~/assets/images/tabs/tabs-in-sharepoint/image057.png)

Next, you'll see the dialog below (of course, the team name will be different). Here, it shows the General Channel:

![](~/assets/images/tabs/tabs-in-sharepoint/image059.png)

You're now free to experiment with your app:

- Use the "Personal App" version via the "..." menu on the left side of Teams
- Talk to the bot in both 1:1 and channel mode
- Use actionable messages to schedule interviews
- Create tabs and add them to channels
- Use the messaging extension to find candidate cards to enrich your conversations

## Step 2: SharePoint Setup

We have created a tool to make it easy to create App Pages (until we get it worked into the product). In your App Catalog (`https://YOUR_TENANT_NAME.sharepoint.com/sites/AppCat/AppCatalog/Forms/AllItems.aspx`), upload and deploy the SPA extension package.

[You can find the package here](https://microsoft.sharepoint-df.com/:u:/t/TeamsDevKitchen/EfMg48rpcNhDmRKFEc9IP_UB0obEd_RDg1TmmVwR3bWUcQ?e=umeuIF).

- To upload, just drag and drop the file in the list
- To deploy, click on the "Deploy" button when prompted

![](~/assets/images/tabs/tabs-in-sharepoint/image061.png)

Install the SPA extension in the SharePoint team site for your test team

- Go to Site Contents, and then click New > App
- In the list "Apps you can add" you will find "spa-extension-client-side-solution". Click on it to install in the site.

![](~/assets/images/tabs/tabs-in-sharepoint/image063.png)

- This process can take up to a few minutes. Once it's finished you will be able to switch from site pages to single-page application experience, and vice versa.

## Step 3: Using the Teams Tab in SharePoint

Upload and deploy your Teams Tab package (either the one you downloaded from [here](https://github.com/billbliss/microsoft-teams-sample-talent-acquisition/blob/master/TeamsAppPackages/TalentMgmt-Azure.zip?raw=true)) or the one you exported from Teams App Studio) to your SharePoint App Catalog (in SharePoint).

When prompted, enable "Make this solution available to all sites in the organization".

![](~/assets/images/tabs/tabs-in-sharepoint/image065.png)

In your site, create a new page, by clicking in the gear button (top-right) and then "Add a page"

![](~/assets/images/tabs/tabs-in-sharepoint/image066.png)

You'll see the pages authoring experience:

![](~/assets/images/tabs/tabs-in-sharepoint/image067.png)

Name your page, for example "My Teams Tab".

Open the web part toolbox, by pressing the + button, and select your Teams Tab. Web parts are sorted alphabetically. You can use the search bar for the right name.

![](~/assets/images/tabs/tabs-in-sharepoint/image069.png)

This will create a web part in the canvas that contains your Teams Tab:

![](~/assets/images/tabs/tabs-in-sharepoint/image071.png)

Press the "Publish" button to finish editing.

Note: You may want to click "Add page to navigation" to have a quick reference to your page in the left navigation bar:

![](~/assets/images/tabs/tabs-in-sharepoint/image073.png)

Once your page is published, you can click on the "Make SPA" button in the top-left corner (it will be there if you followed the "Setup" step at the beginning of this lab). This will convert the current page into an App Page, showing the normal page chrome with a full-page experience for the Teams Tab.

This operation can take a few seconds. After that you will have an app page integrated in SharePoint, accessible from the local navigation from anywhere in the site.

![](~/assets/images/tabs/tabs-in-sharepoint/image075.png)

You can also use the Teams Tab as a web part, integrating its behavior with other web parts to build a rich page experience.

## Step 4: Exploring the APIs

Microsoft Teams developers are able to get SharePoint-specific contexts when their app is loaded as a webpart. For example, the "getContext" call will return all the data from SharePoint's PageContext.

Example from a formatted version of this JSON:

![](~/assets/images/tabs/tabs-in-sharepoint/image081.png)