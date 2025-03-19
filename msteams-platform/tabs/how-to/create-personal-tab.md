---
title: Methods to Build Tab App
author: laujan
description: Learn to build a personal tab with Node.js, ASP.NET Core, or ASP.NET Core MVC, extending it to support group chats, channels, meetings, and offline access.
ms.localizationpriority: high
ms.topic: quickstart
ms.date: 12/11/2024
---

# Create a tab

Tabs in chats, channels, or meetings behave more like apps, as you can pin only one tab per app to the left pane for easy access.

## Developer experience for building a Teams tab app

Step-by-step to a Dev’s progress in building a Teams tab app and important information they may need:

:::image type="content" source="../../assets/images/tab-images/tab-progress-1.png" alt-text="Developer progress for building tab apps":::

> [!IMPORTANT]
>
> * We've introduced the [Teams Toolkit Overview](../../toolkit/teams-toolkit-fundamentals.md) extension within Visual Studio Code. This version comes to you with many new app development features. We recommend that you use Teams Toolkit v5 for building your Teams app.

Ensure that you've all the [prerequisites](~/tabs/how-to/tab-requirements.md) to build your tab.

Ensure that you've followed the prerequisites.
<details>
<summary>Select to view the prerequisites:</summary>

Ensure that you adhere to the following prerequisites while building your Teams personal and channel or group tab:

* Enable discovery of your tab pages in an iFrame by utilizing X-Frame-Options and [Content-Security-Policy HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors) response headers.

* Ensure that all Teams app pages are hosted on HTTPS endpoints.

* Set Content Security Policy headers to allow Teams and any other [host applications](../../m365-apps/overview.md) of your app:

  [!INCLUDE [CSP headers for multi-hub apps](~/includes/tabs/content-security-policy-headers.md)]

  [!INCLUDE [ocdi-warning](../../includes/tabs/ocdi-warning.md)]

  > [!NOTE]
  > To host the other Teams or Microsoft 365 apps within your app, upgrade your app to a [Microsoft 365 environment](~/m365-apps/overview.md). If you manage the app running in the nested frame, you can update its code to initialize the SDK by specifying your domain. Your nested frame acts as a proxy to Teams.

* For Internet Explorer 11 compatibility, set `X-Content-Security-Policy`. Alternately, set header `X-Frame-Options: ALLOW-FROM https://teams.microsoft.com/`. This header is deprecated but most browsers still accept it.

* Sign-in pages don't render in iFrames as a safeguard against clickjacking. Your authentication logic needs to use a method other than redirect. For example, use token-based or cookie-based authentication.

    > [!NOTE]
    > It is recommended that you set the intended use for your cookies rather than rely on default browser behavior. For more information, see [SameSite cookie attribute](../../resources/samesite-cookie-update.md).

* Browsers same-origin policy restriction prevents webpages from making requests to different domains than the served web page. So, you can redirect the configuration or content page to another domain or subdomain. Your cross-domain navigation logic needs to allow the Teams client to validate the origin against a static `validDomains` list in the [app manifest](../../resources/schema/manifest-schema.md#validdomains) when loading or communicating with the tab.

* Style your tabs based on the Teams client's theme, design, and intent. Tabs work best when built to address a specific need and focus on a small set of tasks or a subset of data that is relevant to the tab's channel location.

* Within your content page, add a reference to [Microsoft Teams JavaScript client library](/javascript/api/overview/msteams-client#microsoft-teams-javascript-client-library) using script tags. After your page loads, make a call to `app.initialize()`, or else your page isn't displayed.

* For authentication to work on mobile clients, you must upgrade to TeamsJS version 1.4.1 or later.

* If you choose to have your channel or group tab to appear on Teams mobile client, the `setConfig()` configuration must have a value for the `websiteUrl` property.

* Microsoft Teams tab doesn't support the ability to load intranet websites that use self-signed certificates.

[!INCLUDE [sdk-include](~/includes/sdk-include.md)]
</details>

## Create a tab with JavaScript

Follow the step-by-step guide to [build your tab app using JavaScript](../../sbs-gs-javascript.yml).

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+Issue%5D+Generate+your+application+with+a+tab&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Fbranch%3Dpr-en-us-12027%26tabs%3Dvs%26pivots%3Dnode-java-script%23generate-your-application-with-a-tab&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md%23generate-your-application-with-a-tab&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

### Add a content page to the tab

Create a content page and update the existing files of the tab application:

1. Create a new **personal.html** file in your Visual Studio Code with the following markup:

    ```html
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>
                <!-- Todo: add your a title here -->
            </title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <!-- inject:css -->
            <!-- endinject -->
        </head>
            <body>
                <h1>Personal Tab</h1>
                <p><img src="/assets/icon.png"></p>
                <p>This is your personal tab!</p>
            </body>
    </html>
    ```

1. Save **personal.html** in your application's **public** folder in the following location:

    ```
    ./src/public/<yourDefaultTabNameTab>/personal.html
    ```

1. Open `manifest.json` from the following location in your Visual Studio Code:

    ```
     ./src/manifest/manifest.json
    ```

1. Add the following to the empty `staticTabs` array (`staticTabs":[]`) and add the following JSON object:

    ```json
    {
        "entityId": "personalTab",
        "name": "Personal Tab ",
        "contentUrl": "https://{{PUBLIC_HOSTNAME}}/<yourDefaultTabNameTab>/personal.html",
        "websiteUrl": "https://{{PUBLIC_HOSTNAME}}",
        "scopes": ["personal"]
    }
    ```

    > [!IMPORTANT]
    > The path component **yourDefaultTabNameTab** is the value that you entered in the generator for **Default Tab Name** plus the word **Tab**.
    >
    > For example: DefaultTabName is **MyTab** then **/MyTabTab/**

1. Update the **contentURL** path component **yourDefaultTabNameTab** with your actual tab name.

1. Save the updated `manifest.json` file.

1. Open **Tab.ts** in your Visual Studio Code from the following path to provide your content page in an iFrame:

    ```bash
    ./src/server/<yourDefaultTabNameTab>/<yourDefaultTabNameTab>.ts
    ```

1. Add the following to the list of iFrame decorators:

    ```typescript
     @PreventIframe("/<yourDefaultTabName Tab>/personal.html")
    ```

1. Save the updated file. Your tab code is complete.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Add+a+content+page+to+the+tab&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Fbranch%3Dpr-en-us-12027%26tabs%3Dvs%26pivots%3Dnode-java-script%23add-a-content-page-to-the-tab&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md%23add-a-content-page-to-the-tab&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

### Create your app package

You must have an app package to build and run your application in Teams. The app package is created through a gulp task that validates the `manifest.json` file and generates the zip folder in the `./package` directory. At the command prompt, use the command `gulp manifest`.

### Build and run your application

#### Build your application

Enter the following command at the command prompt to transpile your solution into the **./dist** folder:

```cmd
gulp build
```

#### Run your application

1. At the command prompt, enter the following command to start a local web server:

    ```cmd
    gulp serve
    ```

1. Enter `http://localhost:3007/<yourDefaultAppNameTab>/` in your browser to view your application's home page.

    :::image type="content" source="~/assets/images/tab-images/homePage.png" alt-text="Default Tab":::

1. Browse `http://localhost:3007/<yourDefaultAppNameTab>/personal.html`, to view your tab.

    :::image type="content" source="~/assets/images/tab-images/personalTab.PNG" alt-text="Default html Tab":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Build+and+run+your+application&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Fbranch%3Dpr-en-us-12027%26tabs%3Dvs%26pivots%3Dnode-java-script%23build-and-run-your-application&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md%23build-and-run-your-application&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

### Establish a secure tunnel to your tab

At the command prompt exit the localhost and enter the following command to establish a secure tunnel to your tab:

```cmd
gulp ngrok-serve
```

After your tab is uploaded to Microsoft Teams through **ngrok** and successfully saved, you can view it in Teams until your tunnel session ends.

### Upload your application to Teams

1. Go to Teams and select **Apps**&nbsp;:::image type="content" source="~/assets/images/tab-images/store.png" alt-text="Microsoft Teams Store":::.
1. Select **Manage your apps** > **Upload an app** > **Upload a custom app**.
1. Go to your project directory, browse to the **./package** folder, select the zip folder, and choose **Open**.

    :::image type="content" source="~/assets/images/tab-images/addingpersonaltab.png" alt-text="Adding your tab":::

1. Select **Add** in the dialog. Your tab is uploaded to Teams.

    :::image type="content" source="~/assets/images/tab-images/personaltabuploaded.png" alt-text="Personal tab uploaded":::

1. In the left pane of Teams, select ellipses &#x25CF;&#x25CF;&#x25CF; and then choose your uploaded app to view your tab.

   Your tab is successfully created and added in Teams. You can also [reorder](tab-features.md#reorder-tabs) your tabs in Teams.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Upload+your+application+to+Teams&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Fbranch%3Dpr-en-us-12027%26tabs%3Dvs%26pivots%3Dnode-java-script%23upload-your-application-to-teams&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md%23upload-your-application-to-teams&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

## Code sample

| Sample name | Description | .NET |Node.js|Manifest|
|-------------|-------------|------|----|----|
|Tab personal| Sample app, which showcases custom personal Tab with ASP.NET core for group chat, channels, and meetings. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal/mvc-csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal-quickstart/js) |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal/mvc-csharp/demo-manifest/tab-personal.zip)|
|Offline personal tab | The sample app showcases a personal tab app that functions offline within Microsoft Teams. | NA | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-support-offline/nodejs) |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/tab-support-offline/nodejs/demo-manifest/tab-support-offline.zip)|

## Next step

> [!div class="nextstepaction"]
> [Create a channel or group tab](~/tabs/how-to/create-channel-group-tab.md)

## See also

* [Build tabs for Teams](../what-are-tabs.md)
* [Create a channel tab or group tab](create-channel-group-tab.md)
* [Share to Teams from personal app or tab](~/concepts/build-and-test/share-to-teams-from-personal-app-or-tab.md)
* [Developer Portal for Teams](../../concepts/build-and-test/teams-developer-portal.md)
* [App manifest schema for Teams](../../resources/schema/manifest-schema.md)
* [Tabs on mobile](../design/tabs-mobile.md)
