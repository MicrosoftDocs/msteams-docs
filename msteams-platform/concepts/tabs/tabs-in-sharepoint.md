---
title: Add a Teams tab to your Sharepoint site
description: Describes how to take an existing Teams tab and have it 
keywords: teams tabs sharepoint development
ms.date: 10/15/2018
---

# Overview and Introduction

These instructions will explain how you can take a tab from a Microsoft Teams sample app and use it in SharePoint.

We will be using a tab that's already hosted on Azure if you want to focus on just the SharePoint side of things…or these instructions will tell you how you can do it yourself.

The sample app we're using here manages the hiring process of candidates for open positions in a team – a Talent Management Application. The first half of this document (the optional part) is focused on how to construct an app, build it, and load it into Teams. The app itself, while it looks good, doesn't actually do anything – we want to focus on building a Teams app and loading it into Teams, not create a real talent management application.

## Option 1 – Use the Azure Version

1. **Download the sample app manifest from** [**here**](https://github.com/billbliss/microsoft-teams-sample-talent-acquisition/raw/master/TeamsAppPackages/hr-app-package.zip)
2. Click on the Store icon in Teams
3. Click on "Upload a custom app"
4. Upload the hr-app-package.zip file you just downloaded
5. Install it to the team of your choice
6. **Jump to**  **Step 7: Testing the Sample App**

## Option 2 – Do It Yourself

1. Prerequisites:
    - Visual Studio
    - Ngrok ([https://ngrok.com](https://ngrok.com))
    - Git
2. Open Notepad
3. In your development directory, type:
    - `git clone https://github.com/billbliss/microsoft-teams-sample-talent-acquisition`
4. Go to [Step 1: Prepare the Environment](www.anchortag.com)
5. (Steps 4 and 5, where you register and create a bot, are somewhat time-consuming; these steps are optional.)

## Step 1: Prepare the Environment

Open TeamsTalentMgmtApp.sln in Visual Studio in the directory in which you cloned https://github.com/billbliss/microsoft-teams-sample-talent-acquisition.

## Step 2: Tunnel localhost to the Internet

Although a Microsoft Teams app is free to access information and APIs inside your firewall, some portions of it must be accessible from the Internet. The app that you will create today will be running on localhost, so we need a way to make code running on your local machine be accessible from the Internet.

We're using a tool called Ngrok ([ngrok.com](https://ngrok.com/)) for this purpose.

In the open command prompt (or you can start a new one), type the following command (if ngrok isn't in your PATH, you'll have to prepend its installation directory):

```
ngrok http 3979 -host-header=localhost:3979
```

After a bit, you should see something like this, although the http/https URLs will be different:

![](~/assets/images/tabs/tabs-in-sharepoint/image001.png)

Copy the https: URL (not the http: URL) to the clipboard. In the example above, it's https://b26d0449.ngrok.io, but of course yours will be different.

Save the URL; you'll need it shortly.

You can minimize the ngrok window; it will keep running in the background.

## Step 3: Start your app in Visual Studio

Next, we're going to make a quick check that everything is working properly in Visual Studio. Switch to Visual Studio and click on the Run icon:

![](~/assets/images/tabs/tabs-in-sharepoint/image003.png)

Visual Studio will build the solution and open [http://localhost:3979](http://localhost:3979). But we're interested in what's on the Internet, so paste the URL you saved earlier into a new browser tab. You should see the same page:

![](~/assets/images/tabs/tabs-in-sharepoint/image005.png)

You can stop the app now or leave it running and stop it later.

## Step 4: Create a bot in Bot Framework (Optional)

Open a browser tab for:

[https://dev.botframework.com/bots/new](https://dev.botframework.com/bots/new)

Click on the "Sign in" button and log on with your demo tenant or MSA credentials. Agree to the Terms and Conditions if necessary, and you should see a page that looks like what's below. Fill it in according to the instructions.

![](~/assets/images/tabs/tabs-in-sharepoint/image014.png)

Once you've logged in to the Application Registration portal ([https://apps.dev.microsoft.com](https://apps.dev.microsoft.com)), the App name you just created in Bot Framework will appear and an App ID will be generated. Copy this to the clipboard and paste it into Notepad. Then generate a password and copy/paste that to Notepad too. Remember to click on the "Finish and go back to Bot Framework" button because you're not done yet!

![](~/assets/images/tabs/tabs-in-sharepoint/image016.png)

This will take you back to the previous page. Scroll down to the bottom and click the checkbox and click the Register button. That will take you to a page that looks like this:

![](~/assets/images/tabs/tabs-in-sharepoint/image018.png)

Click on the Microsoft Teams icon to add it as a channel (which in this context, has nothing to do with Microsoft Teams channels). Agree to the Terms of Service and you'll see a "Configure MSTeams" – click on Done at the lower left (there's nothing to configure):

![](~/assets/images/tabs/tabs-in-sharepoint/image020.png)

After you press the Done button, you'll see Microsoft Teams added to the list of channels. Leave the "Connect to channels" page for your bot open – we're going to come back to it shortly.

## Step 5: Set your App ID and Password and test your bot (optional)

Return to Visual Studio and open the Web.config file at the root of the solution. In the TeamsAppId/MicrosoftAppId/MicrosoftAppPassword sections, copy/paste the App ID and Password from Notepad. TeamsAppId doesn't have to be the same as MicrosoftAppId, but it's usually easier if it is, so use the same App ID for both. When you are done, it should look like this:

![](~/assets/images/tabs/tabs-in-sharepoint/image022.png)

Save the Web.config file and run your solution again.

Now, return to the "Connect to channels" page for your bot, and press the "Test" button at the upper right:

![](~/assets/images/tabs/tabs-in-sharepoint/image024.png)

Type "hello" at the lower right and your bot should respond (if a "retry" link appears next to what you typed, click it):

![](~/assets/images/tabs/tabs-in-sharepoint/image026.png)

We've verified that your bot is working, so let's try it in Teams.

## Step 6: Creating an App Package Using Teams App Studio

The Teams desktop client is pinned to the Task Bar. Click on it and log in with your demo tenant credentials.

In any team demo team, create your own channel to test with.

But first, we have to create your app's manifest package. Teams has a tool for this – and it's actually a Teams app itself. Install it from the Teams app store:

![](~/assets/images/tabs/tabs-in-sharepoint/image028.png)

Click on the "Store" icon at the lower left, search for "app studio", click on the "Teams App Studio" card, and click on the "Install" button on the consent dialog, and then on the bottom "Open" button on the second next dialog:

![](~/assets/images/tabs/tabs-in-sharepoint/image030.png)

Click on the "Manifest editor" tab and the "Import and existing app" button:

![](~/assets/images/tabs/tabs-in-sharepoint/image032.png)

The path to the Talent Management app's manifest is: <your-dev-directory>\microsoft-teams-sample-talent-acquisition\TeamsAppPackages\manifest.json. Load that file and then click on the "Contoso HR" card:

![](~/assets/images/tabs/tabs-in-sharepoint/image034.png)

We need to update the default information from the sample using your App ID and ngrok endpoint information.

The following screenshots show what information to change:

### 1: App Details

![](~/assets/images/tabs/tabs-in-sharepoint/image038.png)

Scroll to the bottom of App Details:

![](~/assets/images/tabs/tabs-in-sharepoint/image043.png)

### 2: Tabs

![](~/assets/images/tabs/tabs-in-sharepoint/image046.png)

### 3: Bots

![](~/assets/images/tabs/tabs-in-sharepoint/image049.png)

### 4: Messaging extensions

![](~/assets/images/tabs/tabs-in-sharepoint/image052.png)

### 5: Generating the Microsoft Teams App Package

Click on "Test and distribute" at the lower left and then click on the Export button. This will generate an app package and save it to this virtual machine's default Downloads directory.

![](~/assets/images/tabs/tabs-in-sharepoint/image054.png)

## Step 7: Testing the Sample App

Next, switch back to Microsoft Teams and click on the Store icon and then "Upload a custom app" at the lower left – the file will be located in your Downloads folder and it's called hr-app-package.zip (if you are using the Azure version) or "ContosoHR.zip" if you built it yourself. If all goes well, you'll see the install/consent screen for your app. Choose the team you want to install to (presumably, a test team you created earlier this week) and click the Install button (of course the team names will be different):

![](~/assets/images/tabs/tabs-in-sharepoint/image057.png)

Next, you'll see the dialog below (of course, the team name will be different). Here, it shows the General Channel:

![](~/assets/images/tabs/tabs-in-sharepoint/image059.png)

You're now free to experiment with your app:

- Use the "Personal App" version via the "…" menu on the left side of Teams
- Talk to the bot in both 1:1 and channel mode
- Use actionable messages to schedule interviews
- Create tabs and add them to channels
- Use the messaging extension to find candidate cards to enrich your conversations

# Step 8: SharePoint Setup

We have created a tool to make it easy to create App Pages (until we get it worked into the product). In your App Catalog `https://YOUR\_TENANT\_NAME.sharepoint.com/sites/AppCat/AppCatalog/Forms/AllItems.aspx` e.g.  `https://a830edad9050849devkitc45.sharepoint.com/sites/AppCat/AppCatalog/Forms/AllItems.aspx`, upload and deploy the SPA extension package.

[You can find the package here](https://microsoft.sharepoint-df.com/:u:/t/TeamsDevKitchen/EfMg48rpcNhDmRKFEc9IP_UB0obEd_RDg1TmmVwR3bWUcQ?e=umeuIF).

- To upload, just drag and drop the file in the list
- To deploy, click on the "Deploy" button when prompted

![](~/assets/images/tabs/tabs-in-sharepoint/image061.png)

Install the SPA extension in the SharePoint team site for your test team

- Go to Site Contents, and then click New \&amp;gt; App
- In the list "Apps you can add" you will find "spa-extension-client-side-solution". Click on it to install in the site.

![](~/assets/images/tabs/tabs-in-sharepoint/image063.png)

- This process can take up to a few minutes. Once it's finished you will be able to switch from site pages to single-page application experience, and vice versa.

# Step 9: Using the Teams Tab in SharePoint

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

# Step 10: Exploring the APIs

As part of our internal development, there is a web part called "Provider hosted app" that's available in the web part toolbox:

![](~/assets/images/tabs/tabs-in-sharepoint/image077.png)


This web part contains a few samples that are accessible by clicking the "App Gallery" button. The second one, "Teams Test…" provides a UI that allows you to interact with the Teams SDK from within the web part.

![](~/assets/images/tabs/tabs-in-sharepoint/image078.png)

Click on "initialize" to initialize the Teams SDK, and then "getContext". You will get the Teams SDK context, which, on SharePoint, includes all the data from SharePoint's PageContext.

![](~/assets/images/tabs/tabs-in-sharepoint/image080.png)

Example from a formatted version of this JSON:

![](~/assets/images/tabs/tabs-in-sharepoint/image081.png)