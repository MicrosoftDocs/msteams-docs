---
title: Bring your SPFx Solution in Teams
description: Describes how to bring your SharePoint Framework webpart and use deploy it in Teams 
keywords: teams tabs sharepoint spfx development
ms.date: 10/15/2018
---

# Bring Your SPFx Solution in Teams

In this hands-on lab, we will use the "Build your first web part" SharePoint Framework lab as a baseline to build a web part in SharePoint and then add it as a tab in Teams.

## Set up a web part in SharePoint

1. Ensure you have installed the `.npmrc` file and ran the `npm install` command as mentioned in the deck; use it in Step 2.
2. Follow the steps in [Build your first web part](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/build-a-hello-world-web-part).
3. For now, you need to disable the reactive property pane.  You do this by adding the following code to your webpart

```
  public get disableReactivePropertyChanges(): boolean {
    return true;
  }
```

4. Follow the steps in [Connect your web part to SharePoint](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/connect-to-sharepoint)
5. Connect your web part to Teams. You can access the Teams context while the web part is running inside a Teams tab. You can check if you are running inside Teams by checking context.pageContext.teams. If it is defined, the web part is inside Teams.

Inside the **render** method, add the following:

```
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

```
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
    * In `teams\manifest.json`, under "webApplicationInfo" → "resource", replace the url with your tenant url. The tenant url looks like this: [https://www.your-tenant-name.sharepoint.com](https://www.your-tenant-name.sharepoint.com)
    * Optionally, customize the name of your app in the "tabs" → "name" field of the manifest. This is the name that will show up in the "Add a Tab" pane in Teams.
    * Go to the teams folder in your project and create a .ZIP file by including the manifed.json and the two SharePoint icon files. Follow the steps in [Upload your package into a team using the Apps tab](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/apps/apps-upload). Note: For uploading to work, your tenant admin must first [enable uploading of apps](https://docs.microsoft.com/en-us/microsoftteams/admin-settings). Look at the section on sideloading.

## View your app in Teams

8. Go to your teamsite and create a new list:
    * Title: HostedAppConfigList
    * Add a column:
        * Title: HostType
        * Type: Single line of text
    * Add a column:
        * Title: HostData
        * Type: Mulitple line of text
9. Follow the steps in [Accessing your uploaded configurable tab](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/apps/apps-upload#accessing-your-uploaded-configurable-tab).
10. Now you should see your web part in a tab inside your Team's channel.
11. If you would like to update the properties in the Property Pane, press 'Settings' and you will return to the Config Pane. If you would like to remove your tab, press 'Remove.'

![](~/assets/images/tabs/sharepoint-in-tabs/image001.png)

## Use MSGraph and other Web APIs

If you want, you can now go through the [Consume the Microsoft Graph in the SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/use-aad-tutorial) lab and host that SPFx component in a Teams tab.

Note that, to see the SPFx component working in the Teams rich client you will have to use the workaround below to ensure that authentication properly performs. This is _a temporary workaround for Dev Kitchen only_ :

1. In the "add a tab" dialog find and select **PowerApps**

![](~/assets/images/tabs/sharepoint-in-tabs/image003.png)

2. Leave the default options and click on Install

![](~/assets/images/tabs/sharepoint-in-tabs/image005.png)

3. In the following window click on Sign in The Azure Active Directory log in flow will start, use your tenant credentials to complete the flow

![](~/assets/images/tabs/sharepoint-in-tabs/image007.png)

![](~/assets/images/tabs/sharepoint-in-tabs/image009.png)

4. Once the configuration process is completed click on Back as you don't need to add the tab.

![](~/assets/images/tabs/sharepoint-in-tabs/image011.png)