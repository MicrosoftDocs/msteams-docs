---
title: Bring your SPFx Solution in Teams
description: Describes how to bring your SharePoint Framework webpart and use deploy it in Teams 
keywords: teams tabs sharepoint spfx development
ms.date: 10/15/2018
---

# Bring Your SPFx Solution in Teams


> [!Note]
> This feature is still in Dev Preview and while it closely reflects the final version, there may be small changes before this feature is Generally Availability

## Background

- SPFx has become the standard way for Enterprise Devlopers to develop “Office365-hosted” solutions for SharePoint
- We are enabling SPFx developers to bring their SPFx components and run them as line-of-business applications inside of Teams
- Developers can “target” the Sharepoint environment in their Teams `manifest.json` file
- Standard features available to SPFx developers will also be available in Teams
    - Authentication
    - Graph and WebAPI Access
    - CDN hosting
    - Config experience
    - Solution hosting
- The SPFx component is able to get the right application context inside of Teams

![Surfacing SPFx in Teams 1/2](~/assets/images/tabs/sharepoint-in-tabs/image013.png)

![Surfacing SPFx in Teams 2/2](~/assets/images/tabs/sharepoint-in-tabs/image014.png)

In this tutorial, we will use the "[Build your first web part](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/build-a-hello-world-web-part)" SharePoint Framework lab as a baseline to build a web part in SharePoint and then add it as a tab in Teams.

## Prerequisites

- (Internal) Make sure you were provided with a special `.npmrc` file
- [Provision your Tenant App Catalog in SPO](https://docs.microsoft.com/en-us/sharepoint/use-app-catalog)
- [Provision the LoB Catalog in Teams](https://docs.microsoft.com/en-us/microsoftteams/tenant-apps-catalog-teams)
- Point NPM to the internal VSO repository:
    - Copy the .npmrc file (that you were provided) to the NPM home directory
    - Ensure the file is named .npmrc (the ‘.’ is important)
    - Run the following:

```
npm uninstall -g @microsoft/generator-sharepoint
npm install -g @microsoft/generator-sharepoint@1.6.0-dk.3
```


## Set up a web part in SharePoint

1. Ensure you have installed the `.npmrc` file and ran the `npm install` command mentioned above
2. Follow the steps in [Build your first web part](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/build-a-hello-world-web-part).
3. For now, you need to disable the reactive property pane.  You do this by adding the following code to your webpart

```javascript
  public get disableReactivePropertyChanges(): boolean {
    return true;
  }
```

4. Follow the steps in [Connect your web part to SharePoint](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/connect-to-sharepoint)
5. Connect your web part to Teams. You can access the Teams context while the web part is running inside a Teams tab. You can check if you are running inside Teams by checking context.pageContext.teams. If it is defined, the web part is inside Teams.

Inside the **render** method, add the following:

```html
let teamsMessage: string = `<p class="${styles.description}">We're not in Teams.</p>`;

if (this.context.pageContext.teams) {
    teamsMessage = `
        <p class="${ styles.description}">Team Name - ${escape(this.context.pageContext.teams.teamName)}</p>
        <p class="${ styles.description}">Channel Name - ${escape(this.context.pageContext.teams.channelName)}</p>
        <p class="${ styles.description}">Group Id - ${escape(this.context.pageContext.teams.groupId)}</p>
        <p class="${ styles.description}">Team Site Url - ${escape(this.context.pageContext.teams.teamSiteUrl)}</p>`;
}
```

Then add `${teamsMessage}` to the **innerHTML** code block after the line

```html
<p class="${ styles.description }">Loading from ${escape(this.context.pageContext.web.title)}</p>:
```

To see this code in action, we must first deploy the web part to SharePoint and then upload it to Teams.

6. We will now deploy your web part to SharePoint.
    * Follow the steps in [Package the HelloWorld web part](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/serve-your-web-part-in-a-sharepoint-page#package-the-helloworld-web-part).
    * Follow the steps in [Deploy the HelloWorld package to app catalog](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/serve-your-web-part-in-a-sharepoint-page#deploy-the-helloworld-package-to-app-catalog).
    * Go to your teamsite. Your teamsite will look like this: "https://www.your-sharepoint-tenant.sharepoint.com/sites/your-team".
    * Follow the steps in [Install the client-side solution on your site](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/serve-your-web-part-in-a-sharepoint-page#install-the-client-side-solution-on-your-site), starting from Step 2.
    * Alternatively, you can "tenant wide deploy" your solution. In this case you will not need to install the solution in the Site Collection

## Upload your app to Teams

7. Configure the zip file:
    * In `teams\manifest.json`, under "webApplicationInfo" → "resource", replace the url with your tenant url. The tenant url looks like this: `https://www.your-tenant-name.sharepoint.com`
    * Optionally, customize the name of your app in the "tabs" → "name" field of the manifest. This is the name that will show up in the "Add a Tab" pane in Teams.
    * Go to the teams folder in your project and create a .ZIP file by including the manifed.json and the two SharePoint icon files. Follow the steps in [Upload your package into a team using the Apps tab](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/apps/apps-upload). 
    
> [!Note]
> For uploading to work, your tenant admin must first [enable uploading of apps](https://docs.microsoft.com/en-us/microsoftteams/admin-settings). Look at the section on sideloading.

## View your app in Teams

8. Follow the steps in [Accessing your uploaded configurable tab](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/apps/apps-upload#accessing-your-uploaded-configurable-tab).
9. Now you should see your web part in a tab inside your Team's channel.
10. If you would like to update the properties in the Property Pane, press 'Settings' and you will return to the Config Pane. If you would like to remove your tab, press 'Remove.'

## Use MSGraph and other Web APIs

If you want, you can now go through the [Consume the Microsoft Graph in the SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/use-aad-tutorial) tutorial and host that SPFx component in a Teams tab.