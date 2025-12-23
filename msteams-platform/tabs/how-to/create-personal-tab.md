---
title: Methods to Build Tab App
author: laujan
description: Learn to build a personal tab with Node.js, ASP.NET Core, or ASP.NET Core MVC, extending it to support group chats, channels, meetings, and offline access.
ms.localizationpriority: high
ms.topic: quickstart
zone_pivot_groups: teams-app-environment
ms.date: 02/28/2025
ms.owner: ryanbliss
---

# Create a tab

Tabs in chats, channels, or meetings behave more like apps, as you can pin only one tab per app to the left pane for easy access.

> [!IMPORTANT]
>
> We've introduced [Microsoft 365 Agents Toolkit](../../toolkit/agents-toolkit-fundamentals.md) (previously known as Teams Toolkit) extension within Visual Studio Code. This version comes to you with many new app development features. We recommend that you use Agents Toolkit v5 for building your Teams app.

Ensure that you have all the [prerequisites](~/tabs/how-to/tab-requirements.md) to build your tab.

[!INCLUDE [sdk-include](~/includes/sdk-include.md)]

::: zone pivot="node-java-script"

## Create a tab with JavaScript

Follow the step-by-step guide to [build your tab app using JavaScript](../../sbs-gs-javascript.yml).

<!--
1. At the command prompt, install the [Yeoman](https://yeoman.io/) and [gulp-cli](https://www.npmjs.com/package/gulp-cli) packages by entering the following command after installing Node.js:

    ```cmd
    npm install yo gulp-cli --global
    ```

1. At the command prompt, install Microsoft Teams app generator by entering the following command:

    ```cmd
    npm install generator-teams --global
    ```

Following are the steps to create a tab:

1. [Generate your application with a tab](#generate-your-application-with-a-tab)
1. [Add a content page to the tab](#add-a-content-page-to-the-tab)
1. [Create your app package](#create-your-app-package)
1. [Build and run your application](#build-and-run-your-application)
1. [Establish a secure tunnel to your tab](#establish-a-secure-tunnel-to-your-tab)
1. [Upload your application to Teams](#upload-your-application-to-teams)

### Generate your application with a tab

1. At the command prompt, create a new directory for your tab.

1. Enter the following command in your new directory to start the Microsoft Teams app generator:

    ```cmd
    yo teams
    ```

1. Provide your values to a series of questions prompted by Microsoft Teams app generator to update your `manifest.json` file.

    :::image type="content" source="~/assets/images/tab-images/teamsTabScreenshot.PNG" alt-text="Teams generator":::

    <details>
    <summary><b>Series of questions to update your manifest.json file</b></summary>

    * **What is your solution name?**

      The solution name is your project name. You can accept the suggested name by selecting **Enter**.

    * **Where do you want to place the files?**

      You are in your project directory. Select **Enter**.

    * **Title of your Microsoft Teams app project?**

      The title is your app package name and is used in the app manifest and description. Enter a title or select **Enter** to accept the default name.

    * **Your (company) name? (max 32 characters)**

      Your company name is used in the app manifest. Enter a company name or select **Enter** to accept the default name.

    * **Which manifest version would you like to use?**

      Select the default schema.

    * **Quick scaffolding? (Y/n)**

      The default is yes; enter **n** to enter your Microsoft Partner ID.

    * **Enter your Microsoft Partner Id, if you have one? (Leave blank to skip)**

      This field is not required and must be used only if you are already part of the [Microsoft Cloud Partner Program](https://partner.microsoft.com), formerly known as Microsoft Partner Network.

    * **What do you want to add to your project?**

      Select **( &ast; ) A Tab**.

    * **The URL where you will host this solution?**

      By default, the generator suggests an Azure website URL. You are only testing your app locally, so a valid URL is not necessary.

    * **Would you like to show a loading indicator when your app/tab loads?**

      Choose **not** to include a loading indicator when your app or tab loads. The default is no, enter **n**.

    * **Would you like personal apps to be rendered without a tab header-bar?**

      Choose **not** to include personal apps to be rendered without a tab header-bar. Default is no, enter **n**.

    * **Would you like to include Test framework and initial tests? (y/N)**

      Choose **not** to include a test framework for this project. The default is no, enter **n**.

    * **Would you like to include ESLint support? (y/N)**

      Choose not to include ESLint support. The default is no, enter **n**.

    * **Would you like to use Azure Applications Insights for telemetry? (y/N)**

      Choose **not** to include [Azure Application Insights](/azure/azure-monitor/app/app-insights-overview). The default is no; enter **n**.

    * **Default Tab Name (max 16 characters)?**

      Name your tab. This tab name is used throughout your project as a file or URL path component.

    * **What kind of Tab would you like to create?**

      Use the arrow keys to select **Personal (static)**.

    * **Do you require Microsoft Entra Single-Sign-On support for the tab?**

      Choose **not** to include Microsoft Entra Single-Sign-On support for the tab. The default is yes, enter **n**.
    > [!NOTE]
    > In a tab, the tab home page appears only when the user selects the back button (or moves out of the tab) and comes back to the home page. The tab does not maintain or retain the previous state by design.
    </details>

-->

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+Issue%5D+Create+a+tab+with+JavaScript&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dnode-java-script%23create-a-tab-with-javascript&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

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
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Add+a+content+page+to+the+tab&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Fbranch%3Dpr-en-us-12027%26tabs%3Dvs%26pivots%3Dnode-java-script%23add-a-content-page-to-the-tab&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

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
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Build+and+run+your+application&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Fbranch%3Dpr-en-us-12027%26tabs%3Dvs%26pivots%3Dnode-java-script%23build-and-run-your-application&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

### Establish a secure tunnel to your tab

At the command prompt, exit the localhost and enter the following command to establish a secure tunnel to your tab:

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

   Your tab is successfully created and added in Teams. You can also [reorder](#reorder-tabs) your tabs in Teams.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Upload+your+application+to+Teams&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26amp%3Bpivots%3Dnode-java-script%23upload-your-application-to-teams&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

::: zone-end

::: zone pivot="razor-csharp"

## Create a tab with ASP.NET Core

1. At the command prompt, create a new directory for your tab project.

1. Clone the sample repository into your new directory using the following command or you can download the [source code](https://github.com/OfficeDev/Microsoft-Teams-Samples) and extract the files:

    ```cmd
    git clone https://github.com/OfficeDev/Microsoft-Teams-Samples.git
    ```

Following are the steps to create a tab:

1. [Generate your application with a tab](#generate-your-application-with-a-tab-1)
1. [Update and run your application](#update-and-run-your-application)
1. [Establish a secure tunnel to your tab](#establish-a-secure-tunnel-to-your-tab-1)
1. [Update your app package with Developer Portal](#update-your-app-package-with-developer-portal)
1. [Preview your app in Teams](#preview-your-app-in-teams)

### Generate your application with a tab

1. Open Visual Studio and select **Open a project or solution**.

1. Go to **Microsoft-Teams-Samples** > **samples** > **tab-personal** > **razor-csharp** folder and open **PersonalTab.sln**.

1. In Visual Studio, select **F5** or choose **Start Debugging** from your application's **Debug** menu to verify if the application loads properly. In a browser, go to the following URLs:

    * `<http://localhost:3978/>`
    * `<http://localhost:3978/personalTab>`
    * `<http://localhost:3978/privacy>`
    * `<http://localhost:3978/tou>`

<details>
<summary><b>Review the source code</b></summary>

#### Startup.cs


## Create a tab with ASP.NET Core

1. At the command prompt, create a new directory for your tab project.

1. Clone the sample repository into your new directory using the following command or you can download the [source code](https://github.com/OfficeDev/Microsoft-Teams-Samples) and extract the files:

    ```cmd
    git clone https://github.com/OfficeDev/Microsoft-Teams-Samples.git
    ```

Following are the steps to create a tab:

1. [Generate your application with a tab](#generate-your-application-with-a-tab-1)
1. [Update and run your application](#update-and-run-your-application)
1. [Establish a secure tunnel to your tab](#establish-a-secure-tunnel-to-your-tab-1)
1. [Update your app package with Developer Portal](#update-your-app-package-with-developer-portal)
1. [Preview your app in Teams](#preview-your-app-in-teams)

### Generate your application with a tab

1. Open Visual Studio and select **Open a project or solution**.

1. Go to **Microsoft-Teams-Samples** > **samples** > **tab-personal** > **razor-csharp** folder and open **PersonalTab.sln**.

1. In Visual Studio, select **F5** or choose **Start Debugging** from your application's **Debug** menu to verify if the application is loaded properly. In a browser, go to the following URLs:

    * `<http://localhost:3978/>`
    * `<http://localhost:3978/personalTab>`
    * `<http://localhost:3978/privacy>`
    * `<http://localhost:3978/tou>`

<details>
<summary><b>Review the source code</b></summary>

#### Startup.cs

This project is created from an ASP.NET Core 3.1 web application empty template with the **Advanced - Configure for HTTPS** check box selected at setup. The MVC services register by the dependency injection framework's `ConfigureServices()` method. Additionally, the empty template does not enable serving static content by default, so the static files middleware adds to the `Configure()` method using the following code:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
}
public void Configure(IApplicationBuilder app)
{
    app.UseStaticFiles();
    app.UseMvc();
}
```

#### wwwroot folder

In ASP.NET Core, the web root folder is where the application looks for static files.

#### Index.cshtml

ASP.NET Core treats files called **Index** as the default or home page for the site. When your browser URL points to the root of the site, **Index.cshtml** displays as the home page for your application.

#### AppManifest folder

This folder contains the following required app package files:

* A full color icon measuring 192 x 192 pixels.
* A transparent outline icon measuring 32 x 32 pixels.
* A `manifest.json` file that specifies the attributes of your app.

These files must zip in an app package for use in uploading your tab to Teams. Teams loads the `contentUrl` specified in your manifest, embeds it in an <iframe>, and renders it in your tab.

#### .csproj

In Visual Studio Solution Explorer, right-click on the project and select **Edit Project File**. At the end of the file, you see the following code that creates and updates your zip folder when the application builds:

```xml
<PropertyGroup>
    <PostBuildEvent>powershell.exe Compress-Archive -Path \"$(ProjectDir)AppManifest\*\" -DestinationPath \"$(TargetDir)tab.zip\" -Force</PostBuildEvent>
</PropertyGroup>

<ItemGroup>
    <EmbeddedResource Include="AppManifest\icon-outline.png">
        <CopyToOutputDirectory>Always</CopyToOutputDirectory>
    </EmbeddedResource>
    <EmbeddedResource Include="AppManifest\icon-color.png">
        <CopyToOutputDirectory>Always</CopyToOutputDirectory>
    </EmbeddedResource>
    <EmbeddedResource Include="AppManifest\manifest.json">
        <CopyToOutputDirectory>Always</CopyToOutputDirectory>
    </EmbeddedResource>
</ItemGroup>
```

</details>

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Generate+your+application+with+a+tab&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23generate-your-application-with-a-tab-1&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Update and run your application

1. Open Visual Studio Solution Explorer and go to **Pages** > **Shared** folder and open **_Layout.cshtml** and add the following to the `<head>` tags section:

    ```HTML
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
    <script src="https://res.cdn.office.net/teams-js/2.0.0/js/MicrosoftTeams.min.js" integrity="sha384-QtTBFeFlfRDZBfwHJHYQp7MdLJ2C3sfAEB1Qpy+YblvjavBye+q87TELpTnvlXw4" crossorigin="anonymous"></script>
    ```

1. In Visual Studio Solution Explorer, open **PersonalTab.cshtml** from **Pages** folder and add `microsoftTeams.app.initialize()` in the `<script>` tags.

1. Select **Save**.

1. In Visual Studio, select **F5** or choose **Start Debugging** from your application's **Debug** menu.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+and+run+your+application&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23update-and-run-your-application&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Establish a secure tunnel to your tab

At the command prompt in the root of your project directory, run the following command to establish a secure tunnel to your tab:

```cmd
ngrok http 3978 --host-header=localhost
```

### Update your app package with Developer Portal

1. Go to [**Developer portal**](https://dev.teams.microsoft.com/home).

1. Open **Apps** and select **Import app**.

1. The app package file name is `tab.zip` and it is available at `/bin/Debug/netcoreapp3.1/tab.zip` path.

1. Select `tab.zip` and open it in the Developer Portal.

1. A default **App ID** is created and populated in **Basic information** section.

1. Add the Short and Long description for your app in **Descriptions**.

1. In **Developer Information**, add the required details and in **Website (must be a valid HTTPS URL)** give your ngrok HTTPS URL.

1. In **App URLs**, update the Privacy policy to `https://<yourngrokurl>/privacy` and Terms of use to `https://<yourngrokurl>/tou` and select **Save**.

1. In **App features**, select **Personal app** > **Create your first personal app tab** and enter the name and update the **Content URL** with `https://<yourngrokurl>/personalTab`. Leave the Website URL field blank and select **Context** as personalTab from the dropdown list and select **Confirm**.

1. Select **Save**.

1. In the Domains section, domains from your tabs must contain your ngrok URL without the HTTPS prefix `<yourngrokurl>.ngrok.io`.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+your+app+package+with+Developer+Portal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23update-your-app-package-with-developer-portal&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Preview your app in Teams

1. Select **Preview in Teams** from the Developer Portal toolbar, Developer Portal informs you that your custom app is uploaded successfully. The **Add** page appears for your app in Teams.

1. Select **Add** to load the tab in Teams. Your tab is now available in Teams.

    :::image type="content" source="~/assets/images/tab-images/personaltabaspnetuploaded.png" alt-text="Default Tab":::

   Your tab is successfully created and added in Teams. You can also [reorder](#reorder-tabs) your tab in Teams.

::: zone-end

::: zone pivot="mvc-csharp"

## Create a tab with ASP.NET Core MVC

1. At the command prompt, create a new directory for your tab project.

1. Clone the sample repository into your new directory using the following command or you can download the [source code](https://github.com/OfficeDev/Microsoft-Teams-Samples) and extract the files:

    ```cmd
    git clone https://github.com/OfficeDev/Microsoft-Teams-Samples.git
    ```

Following are the steps to create a tab:

1. [Generate your application with a tab](#generate-your-application-with-a-tab)
1. [Update and run application](#update-and-run-your-application-1)
1. [Establish a secure tunnel to your tab](#establish-a-secure-tunnel-to-your-tab-2)
1. [Update your app package with Developer Portal](#update-your-app-package-with-developer-portal-1)
1. [Preview your app in Teams](#preview-your-app-in-teams-1)

### Generate your application with a tab

1. Open Visual Studio and select **Open a project or solution**.

1. Go to **Microsoft-Teams-Samples** > **samples** > **tab-personal** > **mvc-csharp** folder and open **PersonalTabMVC.sln** in Visual Studio.

1. In Visual Studio, select **F5** or choose **Start Debugging** from your application's **Debug** menu to verify if the application is loaded properly. In a browser, go to the following URLs:

    * `<http://localhost:3978>`
    * `<http://localhost:3978/personalTab>`
    * `<http://localhost:3978/privacy>`
    * `<http://localhost:3978/tou>`

<details>
<summary><b>Review the source code</b></summary>

#### Startup.cs

This project is created from an ASP.NET Core 3.1 web application empty template with the **Advanced - Configure for HTTPS** check box selected at setup. The MVC services register by the dependency injection framework's `ConfigureServices()` method. Additionally, the empty template does not enable serving static content by default, so the static files middleware adds to the `Configure()` method using the following code:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
}
public void Configure(IApplicationBuilder app)
{
    app.UseStaticFiles();
    app.UseMvc();
}
```

#### wwwroot folder

In ASP.NET Core, the web root folder is where the application looks for static files.

#### AppManifest folder

This folder contains the following required app package files:

* A **full color icon** measuring 192 x 192 pixels.
* A **transparent outline icon** measuring 32 x 32 pixels.
* A `manifest.json` file that specifies the attributes of your app.

These files must zip in an app package for use in uploading your tab to Teams. Teams loads the `contentUrl` specified in your manifest, embeds it in an iFrame, and renders it in your tab.

#### .csproj

In the Visual Studio Solution Explorer, right-click on the project and select **Edit Project File**. At the end of the file, you see the following code that creates and updates your zip folder when the application builds:

```xml
<PropertyGroup>
    <PostBuildEvent>powershell.exe Compress-Archive -Path \"$(ProjectDir)AppManifest\*\" -DestinationPath \"$(TargetDir)tab.zip\" -Force</PostBuildEvent>
</PropertyGroup>

<ItemGroup>
    <EmbeddedResource Include="AppManifest\icon-outline.png">
        <CopyToOutputDirectory>Always</CopyToOutputDirectory>
    </EmbeddedResource>
    <EmbeddedResource Include="AppManifest\icon-color.png">
        <CopyToOutputDirectory>Always</CopyToOutputDirectory>
    </EmbeddedResource>
    <EmbeddedResource Include="AppManifest\manifest.json">
        <CopyToOutputDirectory>Always</CopyToOutputDirectory>
    </EmbeddedResource>
</ItemGroup>
```

#### Models

**PersonalTab.cs** presents a message object and methods that are called from **PersonalTabController** when a user selects a button in the **PersonalTab** View.

#### Views

These views are the different views in ASP.NET Core MVC:

* Home: ASP.NET Core treats files called **Index** as the default or home page for the site. When your browser URL points to the root of the site, **Index.cshtml** displays as the home page for your application.

* Shared: The partial view markup **_Layout.cshtml** contains the application's overall page structure and shared visual elements. It also references the Teams Library.

#### Controllers

The controllers use the `ViewBag` property to transfer values dynamically to the Views.

</details>

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Generate+your+application+with+a+tab&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23generate-your-application-with-a-tab&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Update and run your application

1. Open Visual Studio Solution Explorer and go to **Views** > **Shared** folder and open **_Layout.cshtml**, and add the following to the `<head>` tags section:

    ```HTML
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
    <script src="https://res.cdn.office.net/teams-js/2.0.0/js/MicrosoftTeams.min.js" integrity="sha384-QtTBFeFlfRDZBfwHJHYQp7MdLJ2C3sfAEB1Qpy+YblvjavBye+q87TELpTnvlXw4" crossorigin="anonymous"></script>
    ```

1. In Visual Studio Solution Explorer, open **PersonalTab.cshtml** from **Views** > **PersonalTab** folder and add `microsoftTeams.app.initialize()` inside the `<script>` tags.

1. Select **Save**.

1. In Visual Studio, select **F5** or choose **Start Debugging** from your application's **Debug** menu.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+and+run+your+application&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23update-and-run-your-application&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Establish a secure tunnel to your tab

At the command prompt in the root of your project directory, run the following command to establish a secure tunnel to your tab:

```cmd
ngrok http 3978 --host-header=localhost
```

### Update your app package with Developer Portal

1. Go to [**Developer portal**](https://dev.teams.microsoft.com/home).

1. Open **Apps** and select **Import app**.

1. The name of your app package is **tab.zip**. It is available in the following path:

    ```
    /bin/Debug/netcoreapp3.1/tab.zip
    ```

1. Select **tab.zip** and open it in the Developer Portal.

## Update your app package with Developer Portal

1. A default **App ID** creates and populates in **Basic information** section.

1. Add the Short and Long description for your app in **Descriptions**.

1. In **Developer information**, add the required details and in **Website (must be a valid HTTPS URL)** provide your ngrok HTTPS URL.

1. In **App URLs**, update the Privacy policy to `https://<yourngrokurl>/privacy` and Terms of use to `https://<yourngrokurl>/tou`, then select **Save**.

1. In **App features**, select **Personal app** > **Create your first personal app tab**. Enter the name and update the **Content URL** with `https://<yourngrokurl>/personalTab`. Leave the Website URL field blank, select **Context** as personalTab from the dropdown list, and select **Confirm**.

1. Select **Save**.

1. In the Domains section, ensure Domains from your tabs contain your ngrok URL without the HTTPS prefix `<yourngrokurl>.ngrok.io`.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+your+app+package+with+Developer+Portal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dmvc-csharp%23update-your-app-package-with-developer-portal-1&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Preview your app in Teams

1. Select **Preview in Teams** from the Developer Portal toolbar. Developer Portal informs you that your custom app uploads successfully. The **Add** page appears for your app in Teams.

1. Select **Add** to load the tab in Teams. Your tab is now available in Teams.

    :::image type="content" source="~/assets/images/tab-images/personaltabaspnetmvccoreuploaded.png" alt-text="Personal tab":::
  
    Your tab successfully creates and adds in Teams. You can also [reorder](#reorder-tabs) your tab in Teams.

### Agents Toolkit creates a scaffolding for your project based on the capabilities you selected. Among other files, Agents Toolkit maintains:

| Folder name | Contents |
| --- | --- |
| App icons | The app icons are stored as PNG files in `color.png` and `outline.png`. |
| `manifest.json` | The app manifest for publishing through Developer Portal for Teams is stored in `Properties/manifest.json`. |
| `BackendController.cs` | A backend controller is provided in `Controllers/BackendController.cs` for assisting with authentication. |
| `Pages/Tab.razor` | The app's main tab content is defined in `Pages/Tab.razor`. |
| `TeamsFx.cs` and `JS/src/index.js` | The content is used for initializing communications with Teams host. |

You can add backend functionality by adding other ASP.NET Core controllers to your application.

## Extend static tabs to group chat, channels, and meetings

To extend static tabs to group chat, channels, and meetings, update your [app manifest](/microsoft-365/extensibility/schema/root-static-tabs) with the `scopes` and `context` parameters in the `staticTabs` property. When you declare multiple static tabs in the manifest and add the app in the channel scope, only the first tab listed in the manifest appears.

Following is an example of an app manifest where a static tab is defined that works in all scopes and contexts in Teams:

```json
"staticTabs": [ 
  { 
     "entityId": "homeTab", 
     "scopes": [ 
       "personal", 
       "groupChat", 
       "team"
      ], 
     "context": [ 
       "personalTab",
       "channelTab", 
       "privateChatTab", 
       "meetingChatTab", 
       "meetingDetailsTab", 
       "meetingSidePanel", 
       "meetingStage" 
      ], 
      "name": "Contoso", 
      "contentUrl": "https://contoso.com/content (displayed in Teams canvas)", 
      "websiteUrl": "https://contoso.com/content (displayed in web browser)" 
  }
], 
```

If a context isn't defined in the app manifest, by default Teams considers the following context:

```json
"context": [ 
   "personalTab",
   "channelTab",
   "privateChatTab", 
   "meetingChatTab", 
   "meetingDetailsTab", 
   "meetingStage" 
]
```

## Enable personal tab apps for calling extensibility

You can create personal scope apps that integrate with Public Switched Telephone Network (PSTN) and Teams-to-Teams calls. Use the right scope and context to build apps that utilize tab type, static scope, personal context, and meeting side panels.

For more information, see [build tabs for calling](../../apps-in-teams-meetings/build-tabs-for-calling.md).

## Customizing your static tab in chats or meetings

To customize your static tab experience in chats, channels, or meetings, you can use the `setConfig` APIs in your tab to update the `contentUrl` and `websiteUrl`. Following is an example:

```json
pages.config.setConfig({ 
  "contentUrl": "https://wwww.contoso.com/teamsapp/thread/" + context.threadId,
   ...}
```

Only `contentUrl` and `websiteUrl` changes are supported for `setConfig`; other properties can't be changed for static tabs.

## Offline tabs

> [!NOTE]
> Personal tabs with offline functionality are only supported on Teams in Android devices.

You can create a personal tab that works in Teams without an internet connection. An offline tab benefits users who work in areas with poor or no network coverage, such as field agents or frontline workers. Users can perform the following tasks in an offline tab:

* Record data through forms that can include images and videos.
* View details of previously submitted requests, incidents, or forms.

When the user's device reconnects to the internet, the tab automatically synchronizes the locally stored data with Azure Blob storage. This action ensures that all offline changes made by the user are updated in a central storage, maintaining data consistency across the organization.

:::image type="content" source="../../assets/images/tabs/tab-support-offline-mobile.gif" alt-text="Graphic shows how an offline tab works in Teams mobile client.":::

### Build an offline tab

Before you get started with building an offline tab, ensure that you meet the [prerequisites](~/tabs/how-to/tab-requirements.md) to build a personal tab.

1. [Create an Azure Blob storage](/azure/storage/blobs/storage-quickstart-blobs-portal). Ensure that you note down the account and container name for later use.

1. Clone the [Microsoft Teams Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/) repository.

1. In the cloned repository, go to **samples** > **tab-support-offline** > **nodejs** and open the folder in Visual Studio Code.

   :::image type="content" source="../../assets/images/tabs/open-tab-sample-vsc.png" alt-text="Screenshot shows how to open the code sample in Visual Studio Code." lightbox="../../assets/images/tabs/open-tab-sample-vsc.png":::

1. Under **EXPLORER**, go to **server** > **blobStoreOperations.js** and replace `{{ account-Name }}` and `{{ container-Name }}` with your Azure Blob storage account and container's values.

1. Select the **F5** key to debug the app. Teams opens in a browser window when the build is complete.

1. Sign in with your Microsoft 365 account, if prompted.

1. Select **Add** when a dialog box opens to let you add the tab app to Teams.

   :::image type="content" source="../../assets/images/tabs/add-offline-tab-teams.png" alt-text="Screenshot shows how to add the offline tab app to Teams.":::

Congratulations! You've successfully created a Teams tab with offline functionality.
> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Build+an+offline+tab&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Fbranch%3Dpr-en-us-12027%26tabs%3Dvs%26pivots%3Dnode-java-script%23build-an-offline-tab&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

## Best practices for tabs in Teams mobile

To learn how to optimize your tab's performance in the Teams Android and iOS clients, see [best practices for Teams mobile](../../resources/teams-mobile-best-practices.md).

## Step-by-step guide

For learning more about building a tab using C#, see [build your first tab app using C sharp](../../get-started/tutorials.md#build-your-first-tab-app-using-c-sharp).

## Code sample

| Sample name | Description | .NET |Node.js|Manifest|
|-------------|-------------|------|----|----|
|Tab personal| This sample showcases the development of a custom personal tab for Microsoft Teams, utilizing ASP.NET Core MVC to enhance user interaction. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal/mvc-csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal-quickstart/js) |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal/mvc-csharp/demo-manifest/tab-personal.zip)|
|Offline personal tab | This sample app demonstrates a CRUD application that functions offline in Microsoft Teams, allowing users to manage data without an internet connection and automatically sync with blob storage when reconnected. | NA | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-support-offline/nodejs) |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/tab-support-offline/nodejs/demo-manifest/tab-support-offline.zip)|

## Next step

> [!div class="nextstepaction"]
> [Create a channel or group tab](~/tabs/how-to/create-channel-group-tab.md)

## See also

* [Build tabs for Teams](../what-are-tabs.md)
* [Create a channel tab or group tab](create-channel-group-tab.md)
* [Share to Teams from personal app or tab](~/concepts/build-and-test/share-to-teams-from-personal-app-or-tab.md)
* [Developer Portal for Teams](../../concepts/build-and-test/teams-developer-portal.md)
* [App manifest schema for Teams](/microsoft-365/extensibility/schema/)
* [Tabs on mobile](../design/tabs-mobile.md)