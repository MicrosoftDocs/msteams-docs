---
title: Methods to Build Tab App
author: laujan
description: Learn to build personal tab with Node.js, ASP.NET Core, or ASP.NET Core MVC, extending support to group chats, channels, meetings, and offline access.
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
> We've introduced [Microsoft 365 Agents Toolkit](../../toolkit/agents-toolkit-fundamentals.md) (previously known as Teams Toolkit) extension within Visual Studio Code. This version comes with many new app development features. We recommend that you use Agents Toolkit v5 for building your Teams app.

Ensure that you've all [prerequisites](~/tabs/how-to/tab-requirements.md) to build your tab.

[!INCLUDE [sdk-include](~/includes/sdk-include.md)]

::: zone pivot="node-java-script"

## Create a tab with JavaScript

Follow the step-by-step guide to [build your tab app using JavaScript](../../sbs-gs-javascript.yml).

<!--
1. At command prompt install [Yeoman](https://yeoman.io/) and [gulp-cli](https://www.npmjs.com/package/gulp-cli) packages by entering following command after installing Node.js:

    ```cmd
    npm install yo gulp-cli --global
    ```

1. At command prompt install Microsoft Teams app generator by entering following command:

    ```cmd
    npm install generator-teams --global
    ```

Following are steps to create tab:

1. [Generate your application with a tab](#generate-your-application-with-a-tab)
1. [Add a content page to the tab](#add-a-content-page-to-the-tab)
1. [Create your app package](#create-your-app-package)
1. [Build and run your application](#build-and-run-your-application)
1. [Establish a secure tunnel to your tab](#establish-a-secure-tunnel-to-your-tab)
1. [Upload your application to Teams](#upload-your-application-to-teams)

### Generate your application with a tab

1. At command prompt create new directory for your tab.

1. Enter following command in new directory to start Microsoft Teams app generator:

    ```cmd
    yo teams
    ```

1. Provide values to series of questions prompted by Microsoft Teams app generator to update your `manifest.json` file.

    :::image type="content" source="~/assets/images/tab-images/teamsTabScreenshot.PNG" alt-text="Teams generator":::

    <details>
    <summary><b>Series of questions to update your manifest.json file</b></summary>

    * **What is your solution name?**

      Solution name represents your project name. Accept suggested name by selecting **Enter**.

    * **Where do you want to place the files?**

      You are in your project directory. Select **Enter**.

    * **Title of your Microsoft Teams app project?**

      Title represents your app package name and appears in app manifest and description. Enter title or select **Enter** to accept default name.

    * **Your (company) name? (max 32 characters)**

      Your company name appears in app manifest. Enter company name or select **Enter** to accept default name.

    * **Which manifest version would you like to use?**

      Select default schema.

    * **Quick scaffolding? (Y/n)**

      Default is yes; enter **n** to enter your Microsoft Partner ID.

    * **Enter your Microsoft Partner Id, if you've one? (Leave blank to skip)**

      This field is not required and use only if you are part of [Microsoft Cloud Partner Program](https://partner.microsoft.com), formerly known as Microsoft Partner Network.

    * **What do you want to add to your project?**

      Select **( &ast; ) A Tab**.

    * **The URL where you will host this solution?**

      By default generator suggests Azure website URL. If testing your app locally, valid URL is not necessary.

    * **Would you like show a loading indicator when your app/tab loads?**

      Choose not to include loading indicator when your app or tab loads. Default is no, enter **n**.

    * **Would you like personal apps to be rendered without a tab header-bar?**

      Choose not to include personal apps rendered without a tab header-bar. Default is no, enter **n**.

    * **Would you like to include Test framework and initial tests? (y/N)**

      Choose not to include test framework for this project. Default is no, enter **n**.

    * **Would you like to include ESLint support? (y/N)**

      Choose not to include ESLint support. Default is no, enter **n**.

    * **Would you like to use Azure Applications Insights for telemetry? (y/N)**

      Choose not to include [Azure Application Insights](/azure/azure-monitor/app/app-insights-overview). Default is no; enter **n**.

    * **Default Tab Name (max 16 characters)?**

      Name your tab. This name appears throughout your project as file or URL path component.

    * **What kind of Tab would you like to create?**

      Use arrow keys to select **Personal (static)**.

    * **Do you require Microsoft Entra Single-Sign-On support for the tab?**

      Choose not to include Microsoft Entra Single-Sign-On support for the tab. Default is yes, enter **n**.
    > [!NOTE]
    > In a tab, tab home page appears only when user selects back button (or moves out of tab) and returns to home page. Tab does not maintain or retain previous state by design.
    </details>

-->

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+Issue%5D+Create+a+tab+with+JavaScript&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dnode-java-script%23create-a-tab-with-javascript&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

### Add a content page to the tab

Create content page and update existing files of tab application:

1. Create new **personal.html** file in Visual Studio Code with following markup:

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

1. Save **personal.html** in your application's **public** folder at the following location:

    ```
    ./src/public/<yourDefaultTabNameTab>/personal.html
    ```

1. Open `manifest.json` from the following location in Visual Studio Code:

    ```
     ./src/manifest/manifest.json
    ```

1. Add following to empty `staticTabs` array (`staticTabs":[]`) and include following JSON object:

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
    > Path component **yourDefaultTabNameTab** represents value entered in generator for **Default Tab Name** plus word **Tab**.
    >
    > For example: If DefaultTabName is **MyTab** then **/MyTabTab/**

1. Update **contentURL** path component **yourDefaultTabNameTab** with your actual tab name.

1. Save updated `manifest.json` file.

1. Open **Tab.ts** in Visual Studio Code from following path to provide your content page in iFrame:

    ```bash
    ./src/server/<yourDefaultTabNameTab>/<yourDefaultTabNameTab>.ts
    ```

1. Add following to list of iFrame decorators:

    ```typescript
     @PreventIframe("/<yourDefaultTabName Tab>/personal.html")
    ```

1. Save updated file. Your tab code is complete.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Add+a+content+page+to+the+tab&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Fbranch%3Dpr-en-us-12027%26tabs%3Dvs%26pivots%3Dnode-java-script%23add-a-content-page-to-the-tab&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

### Create your app package

You must have app package to build and run your application in Teams. App package generates through gulp task that validates `manifest.json` file and creates zip folder in `./package` directory. At command prompt run command `gulp manifest`.

### Build and run your application

#### Build your application

Enter following command at command prompt to transpile your solution into **./dist** folder:

```cmd
gulp build
```

#### Run your application

1. At command prompt enter following command to start local web server:

    ```cmd
    gulp serve
    ```

1. Enter `http://localhost:3007/<yourDefaultAppNameTab>/` in your browser to view your application's home page.

    :::image type="content" source="~/assets/images/tab-images/homePage.png" alt-text="Default Tab":::

1. Browse `http://localhost:3007/<yourDefaultAppNameTab>/personal.html` to view your tab.

    :::image type="content" source="~/assets/images/tab-images/personalTab.PNG" alt-text="Default html Tab":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Build+and+run+your+application&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Fbranch%3Dpr-en-us-12027%26tabs%3Dvs%26pivots%3Dnode-java-script%23build-and-run-your-application&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

### Establish a secure tunnel to your tab

At command prompt exit localhost and run following command to establish secure tunnel to your tab:

```cmd
gulp ngrok-serve
```

After your tab uploads to Microsoft Teams through **ngrok** and saves successfully, view it in Teams until your tunnel session ends.

### Upload your application to Teams

1. Go to Teams and select **Apps**&nbsp;:::image type="content" source="~/assets/images/tab-images/store.png" alt-text="Microsoft Teams Store":::.
1. Select **Manage your apps** > **Upload an app** > **Upload a custom app**.
1. In your project directory, browse to **./package** folder, select zip folder, and choose **Open**.

    :::image type="content" source="~/assets/images/tab-images/addingpersonaltab.png" alt-text="Adding your tab":::

1. Select **Add** in dialog. Your tab uploads to Teams.

    :::image type="content" source="~/assets/images/tab-images/personaltabuploaded.png" alt-text="Personal tab uploaded":::

1. In left pane of Teams, select ellipses &#x25CF;&#x25CF;&#x25CF; and then choose uploaded app to view your tab.

   Your tab creates successfully and adds in Teams. You can also [reorder](#reorder-tabs) your tabs in Teams.

::: zone-end

::: zone pivot="razor-csharp"

## Create a tab with ASP.NET Core

1. At command prompt create new directory for your tab project.

1. Clone sample repository into your new directory using following command or download [source code](https://github.com/OfficeDev/Microsoft-Teams-Samples) and extract files:

    ```cmd
    git clone https://github.com/OfficeDev/Microsoft-Teams-Samples.git
    ```

Following are steps to create tab:

1. [Generate your application with a tab](#generate-your-application-with-a-tab-1)
1. [Update and run your application](#update-and-run-your-application)
1. [Establish a secure tunnel to your tab](#establish-a-secure-tunnel-to-your-tab-1)
1. [Update your app package with Developer Portal](#update-your-app-package-with-developer-portal)
1. [Preview your app in Teams](#preview-your-app-in-teams)

### Generate your application with a tab

1. Open Visual Studio and select **Open a project or solution**.

1. Navigate to **Microsoft-Teams-Samples** > **samples** > **tab-personal** > **razor-csharp** folder and open **PersonalTab.sln**.

1. In Visual Studio, select **F5** or choose **Start Debugging** from your application's **Debug** menu to verify that application loads properly. In browser, go to following URLs:

    * `<http://localhost:3978/>`
    * `<http://localhost:3978/personalTab>`
    * `<http://localhost:3978/privacy>`
    * `<http://localhost:3978/tou>`

<details>
<summary><b>Review the source code</b></summary>

#### Startup.cs

This project originates from an ASP.NET Core 3.1 web application empty template with **Advanced - Configure for HTTPS** option selected during setup. MVC services register in dependency injection framework's `ConfigureServices()` method. In addition, empty template does not enable serving static content by default, so static files middleware adds to `Configure()` method using following code:

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

In ASP.NET Core, web root folder represents location where application locates static files.

#### Index.cshtml

ASP.NET Core treats files named **Index** as default or home page. When browser URL points to root of site, **Index.cshtml** displays as home page of your application.

#### AppManifest folder

This folder contains following required app package files:

* Full color icon measuring 192 x 192 pixels.
* Transparent outline icon measuring 32 x 32 pixels.
* `manifest.json` file that specifies attributes of your app.

These files zip into app package for use when uploading your tab to Teams. Teams loads `contentUrl` specified in your manifest, embeds it in an <iframe\>, and renders it in your tab.

#### .csproj

In Visual Studio Solution Explorer, right-click project and select **Edit Project File**. At end of file, view following code that creates and updates zip folder when application builds:

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

1. Open Visual Studio Solution Explorer and navigate to **Pages** > **Shared** folder and open **_Layout.cshtml**. Add following to `<head>` tags section:

    ```HTML
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
    <script src="https://res.cdn.office.net/teams-js/2.0.0/js/MicrosoftTeams.min.js" integrity="sha384-QtTBFeFlfRDZBfwHJHYQp7MdLJ2C3sfAEB1Qpy+YblvjavBye+q87TELpTnvlXw4" crossorigin="anonymous"></script>
    ```

1. In Visual Studio Solution Explorer, open **PersonalTab.cshtml** from **Pages** folder and add `microsoftTeams.app.initialize()` inside `<script>` tags.

1. Select **Save**.

1. In Visual Studio, select **F5** or choose **Start Debugging** from your application's **Debug** menu.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+and+run+your+application&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23update-and-run-your-application&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)
>
### Establish a secure tunnel to your tab

At command prompt in root of your project directory, run following command to establish secure tunnel to your tab:

```cmd
ngrok http 3978 --host-header=localhost
```

### Update your app package with Developer Portal

1. Go to [**Developer portal**](https://dev.teams.microsoft.com/home).

1. Open **Apps** and select **Import app**.

1. App package file name is `tab.zip` and is available at `/bin/Debug/netcoreapp3.1/tab.zip` path.

1. Select `tab.zip` and open it in Developer Portal.

1. Default **App ID** creates and populates in **Basic information** section.

1. Add Short and Long description for your app in **Descriptions**.

1. In **Developer Information**, add required details and in **Website (must be a valid HTTPS URL)** enter your ngrok HTTPS URL.

1. In **App URLs**, update Privacy policy to `https://<yourngrokurl>/privacy` and Terms of use to `https://<yourngrokurl>/tou` and select **Save**.

1. In **App features**, select **Personal app** > **Create your first personal app tab** and enter name and update **Content URL** with `https://<yourngrokurl>/personalTab`. Leave Website URL field blank and select **Context** as personalTab from dropdown list and select **Confirm**.

1. Select **Save**.

1. In Domains section, domains from your tabs must list your ngrok URL without HTTPS prefix `<yourngrokurl>.ngrok.io`.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+your+app+package+with+Developer+Portal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23update-your-app-package-with-developer-portal&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Preview your app in Teams

1. Select **Preview in Teams** from Developer Portal toolbar, Developer Portal confirms that custom app uploads successfully. **Add** page appears for your app in Teams.

1. Select **Add** to load tab in Teams. Your tab now appears in Teams.

    :::image type="content" source="~/assets/images/tab-images/personaltabaspnetuploaded.png" alt-text="Default Tab":::

   Your tab creates successfully and adds in Teams. You can also [reorder](#reorder-tabs) your tab in Teams.

::: zone-end

::: zone pivot="mvc-csharp"

## Create a tab with ASP.NET Core MVC

1. At command prompt create new directory for your tab project.

1. Clone sample repository into your new directory using following command or download [source code](https://github.com/OfficeDev/Microsoft-Teams-Samples) and extract files:

    ```cmd
    git clone https://github.com/OfficeDev/Microsoft-Teams-Samples.git
    ```

Following are steps to create tab:

1. [Generate your application with a tab](#generate-your-application-with-a-tab)
1. [Update and run application](#update-and-run-your-application-1)
1. [Establish a secure tunnel to your tab](#establish-a-secure-tunnel-to-your-tab-2)
1. [Update your app package with Developer Portal](#update-your-app-package-with-developer-portal-1)
1. [Preview your app in Teams](#preview-your-app-in-teams-1)

### Generate your application with a tab

1. Open Visual Studio and select **Open a project or solution**.

1. Navigate to **Microsoft-Teams-Samples** > **samples** > **tab-personal** > **mvc-csharp** folder and open **PersonalTabMVC.sln** in Visual Studio.

1. In Visual Studio, select **F5** or choose **Start Debugging** from your application's **Debug** menu to verify that application loads properly. In browser, go to following URLs:

    * `<http://localhost:3978>`
    * `<http://localhost:3978/personalTab>`
    * `<http://localhost:3978/privacy>`
    * `<http://localhost:3978/tou>`

<details>
<summary><b>Review the source code</b></summary>

#### Startup.cs

This project originates from an ASP.NET Core 3.1 web application empty template with **Advanced - Configure for HTTPS** option selected during setup. MVC services register in dependency injection framework's `ConfigureServices()` method. In addition, empty template does not enable serving static content by default, so static files middleware adds to `Configure()` method using following code:

``` csharp
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

In ASP.NET Core, web root folder represents location where application locates static files.

#### AppManifest folder

This folder contains following required app package files:

* **full color icon** measuring 192 x 192 pixels.
* **transparent outline icon** measuring 32 x 32 pixels.
* `manifest.json` file that specifies attributes of your app.

These files zip into app package for use when uploading your tab to Teams. Teams loads `contentUrl` specified in your manifest, embeds it in an iFrame, and renders it in your tab.

#### .csproj

In Visual Studio Solution Explorer, right-click project and select **Edit Project File**. At end of file, view following code that creates and updates zip folder when application builds:

``` xml
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

**PersonalTab.cs** presents message object and methods that call from **PersonalTabController** when user selects button in **PersonalTab** View.

#### Views

These views represent various views in ASP.NET Core MVC:

* Home: ASP.NET Core treats files named **Index** as default or home page. When browser URL points to root of site, **Index.cshtml** displays as home page.
* Shared: Partial view markup **_Layout.cshtml** contains application's overall page structure and shared visual elements. It also references Teams Library.

#### Controllers

Controllers use `ViewBag` property to transfer values dynamically to Views.

</details>

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Generate+your+application+with+a+tab&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dmvc-csharp%23generate-your-application-with-a-tab&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Update and run your application

1. Open Visual Studio Solution Explorer and navigate to **Views** > **Shared** folder and open **_Layout.cshtml**, then add following to `<head>` tags section:

    ```HTML
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
    <script src="https://res.cdn.office.net/teams-js/2.0.0/js/MicrosoftTeams.min.js" integrity="sha384-QtTBFeFlfRDZBfwHJHYQp7MdLJ2C3sfAEB1Qpy+YblvjavBye+q87TELpTnvlXw4" crossorigin="anonymous"></script>
    ```

1. In Visual Studio Solution Explorer, open **PersonalTab.cshtml** from **Views** > **PersonalTab** folder and add `microsoftTeams.app.initialize()` within `<script>` tags.

1. Select **Save**.

1. In Visual Studio, select **F5** or choose **Start Debugging** from your application's **Debug** menu.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+and+run+your+application&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dmvc-csharp%23update-and-run-your-application&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)
>
### Establish a secure tunnel to your tab

At command prompt in root of your project directory, run following command to establish secure tunnel to your tab:

```cmd
ngrok http 3978 --host-header=localhost
```

### Update your app package with Developer Portal

1. Go to [**Developer portal**](https://dev.teams.microsoft.com/home).

1. Open **Apps** and select **Import app**.

1. Name of your app package is **tab.zip**. It is located at:

    ```
    /bin/Debug/netcoreapp3.1/tab.zip
    ```

1. Select **tab.zip** and open it in Developer Portal.

1. Default **App ID** creates and appears in **Basic information** section.

1. Add Short and Long description for your app in **Descriptions**.

1. In **Developer information**, input required details and in **Website (must be a valid HTTPS URL)** enter your ngrok HTTPS URL.

1. In **App URLs**, update Privacy policy to `https://<yourngrokurl>/privacy` and Terms of use to `https://<yourngrokurl>/tou` then select **Save**.

1. In **App features**, select **Personal app** > **Create your first personal app tab**, enter name and update **Content URL** with `https://<yourngrokurl>/personalTab`. Leave Website URL field blank and select **Context** as personalTab from dropdown list then select **Confirm**.

1. Select **Save**.

1. In Domains section, domains from your tabs must list your ngrok URL without HTTPS prefix `<yourngrokurl>.ngrok.io`.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+your+app+package+with+Developer+Portal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dmvc-csharp%23update-your-app-package-with-developer-portal-1&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Preview your app in Teams

1. Select **Preview in Teams** from Developer Portal toolbar, Developer Portal confirms custom app uploads successfully. **Add** page appears for your app in Teams.

1. Select **Add** to load tab on Teams. Your tab now appears in Teams.

    :::image type="content" source="~/assets/images/tab-images/personaltabaspnetmvccoreuploaded.png" alt-text="Personal tab":::
  
    Your tab creates successfully and adds in Teams. You can also [reorder](#reorder-tabs) your tab in Teams.

::: zone-end

::: zone pivot="blazor-app"

Blazor lets you build interactive web UIs using C#, instead of JavaScript. You can create tab app and bot app with Blazor and latest version of Visual Studio.

:::image type="content" source="~/assets/images/toolkit-v2/blazor/your-blazor-helloworld-app.png" alt-text="Screenshot of Blazor app displaying the tab, Bot, and Message Extension output after the step-by-step Blazor guide is successfully completed.":::

> [!NOTE]
> Agents Toolkit doesn't support message extension capability.

Below is list of tools required for building and deploying your app.

| &nbsp;    | Install   | For using... |
| --- | --- | --- |
| **Required** | &nbsp; | &nbsp; |
| &nbsp; | [Visual Studio version 17.2.0 preview 2.1](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=enterprise&ch=pre&rel=17)|  Select Visual Studio Enterprise 2022 Preview (version 17.2.0 preview 2.1). |
| &nbsp; | [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams to collaborate with everyone you work with through apps for chat, meetings, and call-all in one place. |
| &nbsp; | [Microsoft Edge](https://www.microsoft.com/edge/) (recommended) or [Google Chrome](https://www.google.com/chrome/) | Browser with developer tools. |

## Prepare development environment

After installing required tools, set up development environment.

### Install Agents Toolkit

Agents Toolkit simplifies development with tools to provision and deploy cloud resources for your app, publish to Teams Store, and more. Use Agents Toolkit with Visual Studio or as Agents Toolkit Command Line Interface.

# [Latest version of the Visual Studio](#tab/vs)

Use latest version of Visual Studio to develop Teams apps with Blazor Server in .NET.

To install Agents Toolkit extension:

1. Download latest version of Visual Studio.
1. Open Visual Studio installer file (`.exe`) from your download folder.
1. Select **Continue** in **Visual Studio Installer** page to configure your installation.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor/visual-studio-installer.PNG" alt-text="Screenshot of Visual Studio Installer with continue options highlighted in red.":::

1. Under **Workloads**, select **ASP.NET and web development**.

1. Under **Installation details**, select **Microsoft 365 Agents Toolkit**.

1. Select **Install**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/vs.install.PNG" alt-text="Screenshot of Visual Studio Enterprise Preview with option Asp.NET, web development, and Microsoft Teams development tools under installation details and install highlighted in red.":::

    Visual Studio installs in few minutes.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Install+Microsoft+Agents+Toolkit+-+Latest+version+of+the+Visual+Studio&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23install-microsoft-agents-toolkit&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md%23latest-version-of-the-visual-studio&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

# [Command line](#tab/cli)

To install Microsoft 365 Agents Toolkit CLI (previously known as TeamsFx CLI), use `npm` package manager:

``` bash
npm install -g @microsoft/teamsfx-cli
```

Depending on your configuration, you may need to use `sudo` to install CLI:

``` bash
sudo npm install -g --unsafe-perm @microsoft/teamsfx-cli
 ```

This condition appears more commonly on Linux and macOS systems.

Ensure you add npm global cache to your PATH. This step normally occurs as part of Node.js installer.  

Use CLI with `atk` command. Verify command works by running `atk -h`.

> [!CAUTION]
> Before running TeamsFx in PowerShell terminals, enable remote signed execution policy for PowerShell.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Install+Microsoft+Agents+Toolkit+-+Command+line&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23install-microsoft-agents-toolkit&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md%23command-line&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

---

## Set up your Teams development tenant

A tenant acts as a space or container for your organization in Teams, where you chat, share files, and run meetings. This space also hosts and tests your custom app. Verify readiness to develop with tenant.

### Enable custom app upload

After creating your app, load your app in Teams without distributing it. This process is known as custom app upload. Sign in to your Microsoft 365 account to see this option.

Verify if you can upload a custom app in Teams:

1. In Teams client, select **Apps**.
1. Select **Manage your apps**.
1. Select **Upload an app**. If you see **Upload a custom app** option, custom app upload is enabled.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor/upload-custom-app.PNG" alt-text="Screenshot shows option to upload custom app in Teams.":::

    > [!NOTE]
    > Contact Teams administrator if option to upload custom app does not appear.

### Create a free Teams developer tenant (optional)

If you do not have a Teams developer account, get one for free. Join Microsoft 365 developer program!

1. Go to [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program).
1. Select **Join Now** and follow onscreen instructions.
1. In welcome screen, select **Set up E5 subscription**.
1. Set up administrator account. After completion, following screen appears.

    :::image type="content" source="../../assets/images/build-your-first-app/dev-program-subscription.PNG" alt-text="Screenshot of Microsoft 365 Developer Program displaying Microsoft 365 developer subscriptions for Blazor app.":::

1. Sign in to Teams using administrator account just set up. Verify that you see **Upload a custom app** option in Teams.

## Get a free Azure account

If you wish to host your app or access resources in Azure, you must have Azure subscription. [Create a free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

Now you have all tools and have set up your accounts. Next, set up your development environment and start building!

## Create project workspace for your tab app

Start Teams app development by creating your first app. This app uses tab capability.

:::image type="content" source="~/assets/images/toolkit-v2/blazor/your-blazor-helloworld-app1.png" alt-text="Screenshot of Blazor app displaying final output of tab app after step-by-step Blazor guide is successfully completed.":::

This tutorial walks you through steps to create, run, and deploy your first Teams app using .NET/Blazor.

In this page, you learn:

1. [How to set up new tab project with Agents Toolkit](#create-your-tab-project)
1. [About directory structure of your app](#take-a-tour-of-the-source-code-for-teams-tab-app)

## Create your tab project

Use Agents Toolkit to create your first tab project. Toolkit guides you through series of pages to create and configure your Teams app project:

1. **Create a new project** page: Select project type.
1. **Configure your new project** page: Enter project details.
1. **Create a new Teams application** page: Select Teams app capabilities.

**To create your tab project workspace**

1. Open latest version of Visual Studio.

1. Select **Create a new project**.

   :::image type="content" source="../../assets/images/toolkit-v2/blazor/vs-select-project.png" alt-text="Screenshot of Visual Studio with Create a new project option highlighted in red for Blazor app.":::

   **Create a new project** page appears.

1. Select project type and details:

   1. Search for **Microsoft 365** from templates dropdown list.  

   1. Select **Microsoft 365 Agents** as template.

   1. Select **Next**.

      :::image type="content" source="../../assets/images/toolkit-v2/blazor/vs-select-teams-app.png" alt-text="Screenshot of Create a new project with Next option highlighted in red for Blazor app creation." lightbox="../../assets/images/toolkit-v2/blazor/vs-select-teams-app.png":::

      **Configure your new project** page appears.

1. Configure new project details:

   1. Enter suitable name for your project.

      > [!NOTE]
      > Note that project name entered automatically applies as **Solution name** as well. Change solution name if desired without affecting project name.

   1. Select folder path to create project workspace.

   1. Enter different solution name if desired.

   1. Check option to save project and solution in same folder if desired. For this tutorial, this option is not required.

   1. Select **Create**.

      :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/configure-new-project.PNG" alt-text="Screenshot of Configure your new project with Create option highlighted in red." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/configure-new-project.PNG":::

      **Create a new Teams application** page appears.

1. Select Teams app feature:

   1. Select **Tab** as capability for your app.

   1. Select **Create**.

      :::image type="content" source="../../assets/images/toolkit-v2/first-tab/create-tab.png" alt-text="Screenshot of Create a new Teams application with Tab and Create options highlighted in red.":::

   Teams tab app creates within seconds.

   :::image type="content" source="../../assets/images/toolkit-v2/blazor/vs-tab-app.png" alt-text="Screenshot of Visual Studio displaying tips to get started while building your app." lightbox="../../assets/images/toolkit-v2/blazor/vs-tab-app.png":::

   <details>
   <summary>A quick recap of creating a Teams tab app.</summary>
   Watch this short recap for creating a Teams tab app.

   :::image type="content" source="~/assets/videos/blazorapp.gif" alt-text="Graphical representation shows process of creating Teams tab app1.":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Create+your+tab+project&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23create-your-tab-project&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Take a tour of the source code for Teams tab app

After project creation, you have components to build basic tab app. View project directory structure in **Solution Explorer** pane of Visual Studio.

:::image type="content" source="../../assets/images/toolkit-v2/blazor/blazor-app-solution-explorer_1.png" alt-text="Screenshot of Solution explorer displaying components to build basic personal app.":::

Agents Toolkit creates scaffolding for your project based on selected capabilities. Among other files, Agents Toolkit includes:

| Folder name | Contents |
| --- | --- |
| App icons | App icons stored as PNG files in `color.png` and `outline.png`. |
| `manifest.json` | App manifest for publishing through Developer Portal for Teams stored in `Properties/manifest.json`. |
| `BackendController.cs` | Backend controller provided in `Controllers/BackendController.cs` to assist with authentication. |
| `Pages/Tab.razor` | App manifest for publishing through Developer Portal for Teams stored in `Properties/manifest.json`. |
| `TeamsFx.cs` and `JS/src/index.js` | Content used for initializing communications with Teams host. |

Add backend functionality by including additional ASP.NET Core controllers in your application.
</details>

## Build and run your first Teams tab app

After setting up your project workspace with Agents Toolkit, build your tab project.

To build and run your app:

1. Select **Project** > **Microsoft 365 Agents Toolkit** > **Select Microsoft 365 Account**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/configure-msteamsapp_1.png" alt-text="Screenshot of Visual Studio with Project, Agents Toolkit, and Prepare Teams App Dependencies options highlighted in red." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/configure-msteamsapp_1.png":::

1. Select your Microsoft 365 account or **Add an account** to sign in.

    :::image type="content" source="../../assets/images/toolkit-v2/m365-account_1.PNG" alt-text="Screenshot of Microsoft 365 Account with Continue option highlighted in red.":::

1. Select **Debug** > **Start Debugging** or select **F5** to run your app in debug mode.
    <br>
    <details>
    <summary>Learn what happens when you run your app locally in debugger.</summary>

    When you select **F5**, Agents Toolkit:

    1. Registers your application with Microsoft Entra ID.
    1. Registers your application for uploading in Teams.
    1. Starts your application backend running locally.
    1. Starts your application front-end hosted locally.
    1. Opens Teams in a web browser with command instructing Teams to upload custom app (URL registers inside application manifest).

    </details>

1. Install self-signed SSL certificate for local debugging if prompted.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/ssl-prompt.png" alt-text="Screenshot of Security Warning with Yes option highlighted.":::

    Teams opens in a web browser.

1. Select **Add**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-app.png" alt-text="Screenshot of personal tab app dialog with Add option highlighted.":::

1. Select **Open** to open app in personal scope.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-app-scope.png" alt-text="Screenshot of scope selection dialog with Open option highlighted.":::

    Congratulations, your first tab app runs in your local environment!

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/app-local.png" alt-text="Screenshot shows your first tab app running in your local environment.":::

1. Navigate through page to view user details.

1. Select **Authorize** to let your app retrieve user details using Microsoft Graph.

    App requests permission to grant access for displaying user details.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/authorize-user-info.png" alt-text="Screenshot shows authorize option in personal tab of your app.":::

1. Select **Accept** to let your app access user details.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/ms-graph-permission_1.png" alt-text="Screenshot of Permissions requested displaying App info.":::

    Your photograph and details display in your **Personal Tab**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor/tab-user-info.png" alt-text="Screenshot shows basic information displayed on personal tab of your app in Teams.":::

    You perform normal debugging activities, such as setting breakpoints, as with any other web application. App supports hot reloading. If you change any file within project, page reloads.

    <br>
    <details>
    <summary>Learn how to troubleshoot if your app does not run locally.</summary>

    To run your app in Teams, you require Microsoft 365 development account that allows custom app upload. Learn more in Prerequisites section.

    </details>

1. Stop debugging in Visual Studio.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Build+and+run+your+first+Teams+tab+app&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23build-and-run-your-first-teams-tab-app&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

## Preview your first Teams tab app

You have learned to create, build, and run Teams app with tab capability. Final steps deploy your app on Azure and preview in Teams:

1. [Provision your tab app in the cloud](#to-provision-your-tab-app-in-the-cloud)
1. [Deploy your tab app to cloud](#to-deploy-your-tab-app-to-cloud)
1. [Preview your tab app in Teams](#to-preview-your-tab-app-in-teams)

Let's deploy first app with tab capability on Azure using Agents Toolkit.

### **To provision your tab app in the cloud**

1. Select **Project** > **Microsoft 365 Agents Toolkit** > **Provision in the Cloud**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-provision_1.png" alt-text="Screenshot of Visual Studio with Project, Agents Toolkit, and Provision in the Cloud options highlighted in red." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-provision_1.png":::

1. Enter subscription and resource group details in **Provision** dialog:
   1. Select subscription name from **Subscription name** dropdown list.
   1. Select resource group from **Resource group** dropdown list or choose **New** to add resource group generated for your app.
   1. Select your **Region** if new resource group is created.
   1. Select **Provision**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/select-subscription.PNG" alt-text="Screenshot of Provision with New and Provision highlighted in red." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/select-subscription.PNG":::

   Provision warning displays.

1. Select **Provision**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/provision-warning.PNG" alt-text="Screenshot of Agents Toolkit with Provision highlighted in red.":::

   Wait few minutes for resource group to provision in cloud.

1. After provision completes, select **OK**.

    :::image type="content" source="../../assets/images/toolkit-v2/provision-complete.png" alt-text="Screenshot of Agents Toolkit app with OK option highlighted in red.":::

1. Select **View Provisioned Resources** to view on Azure portal.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/view-resource.PNG" alt-text="Screenshot of Agents Toolkit with View Provisioned Resources highlighted in red.":::

1. Sign in to Azure portal account when prompted.

    Your app-dev-rg appears.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/app-dev-rg-azure.PNG" alt-text="Screenshot of Blazorapp-dev-rg displaying Resources provisioned in Azure portal.":::

    Your resources provision in Azure portal!

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+To+provision+your+tab+app+in+the+cloud&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23to-provision-your-tab-app-in-the-cloud&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

#### **To deploy your tab app to cloud**

1. Select **Project** > **Microsoft 365 Agents Toolkit** > **Deploy to the Cloud**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-deploytocloud_1.png" alt-text="Screenshot of Visual Studio with Project, Agents Toolkit, and Deploy to the Cloud options highlighted in red." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-deploytocloud_1.png":::

1. Select **OK**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/deploy-success.PNG" alt-text="Screenshot of app built with Agents Toolkit with OK option highlighted in red.":::

    Your tab app deploys to cloud successfully!

#### **To preview your tab app in Teams**

1. Select **Project** > **Microsoft 365 Agents Toolkit** > **Preview in Teams**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-preview_1.png" alt-text="Screenshot of Visual Studio with Project, Agents Toolkit, and Preview in Teams options highlighted in red." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-preview_1.png":::

    Teams opens in web browser.

1. Select **Add**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-app.png" alt-text="Screenshot of personal tab app dialog with Add option highlighted.":::

1. Select **Open** to open app in personal scope.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-app-scope.png" alt-text="Screenshot of scope selection dialog with Open option highlighted.":::

    Congratulations, your first tab app runs in your Azure environment!

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-tab-app-azure.PNG" alt-text="Screenshot shows personal tab of your app in Teams.":::

    Navigate through page to view user details.

1. Select **Authorize** to let your app retrieve user details using Microsoft Graph.

    App requests permission to grant access for displaying user details.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/authorize-user-info.png" alt-text="Screenshot shows authorize option in personal tab of your app in Teams.":::

1. Select **Accept** to let your app access user details.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/ms-graph-permission_1.png" alt-text="Screenshot of Permissions requested displaying App info.":::

    Your photograph and details display in your **Personal Tab**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/azure-user-info.png" alt-text="Screenshot of your app with personal tab displaying basic information.":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+To+preview+your+tab+app+in+Teams&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23to-preview-your-tab-app-in-teams&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

## Congratulations

You have completed tutorial to build tab app with Blazor.

::: zone-end

## Reorder tabs

Starting with manifest version 1.7, developers can rearrange all tabs in personal app. You can move **bot chat** tab, which always defaults to first position, to any position in personal app tab header. Two reserved tab `entityId` keywords appear, **conversations** and **about**.

If you create a bot with **personal** scope, it appears in first tab position in personal app by default. To move it to another position, add static tab object to your manifest with reserved keyword **conversations**. **Conversation** tab appears on web and desktop based on where you add **conversation** tab in `staticTabs` array.

``` JSON
{
   "staticTabs":[
      {
         
      },
      {
         "entityId":"conversations",
         "scopes":[
            "personal"
         ]
      }
   ]
}
```

> [!NOTE]
> In mobile, tabs reorder as defined in `staticTabs`.

This property also enables setting default landing capability for your app. Configure app to open as tab or bot by default. For more information, see [configure default landing capability](../../concepts/deploy-and-publish/add-default-install-scope.md#configure-your-apps-default-landing-capability).

## Extend static tabs to group chat, channels, and meetings

> [!NOTE]
> To extend your static tab to group chat, channels, and meetings, use app manifest v1.16 or later.

Extend static tabs to group chat, channels, and meetings. Instead of pinned app content, build tabs that behave more like apps as you can pin only one tab per app, for example, pinning single YouTube app tab.

To extend static tabs to group chat, channels, and meetings, update your [app manifest](/microsoft-365/extensibility/schema/root-static-tabs) with `scopes` and `context` parameters in `staticTabs` property. When you declare multiple static tabs in manifest and add app in channel scope, only first tab listed in manifest appears.

Following is example of app manifest where static tab defines functionality in all scopes and contexts in Teams:

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

If a context is not defined in app manifest, by default Teams considers following context:

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

You can create personal scope apps that integrate with Public Switched Telephone Network (PSTN) and Teams-to-Teams calls. Use correct scope and context to build apps utilizing tab type, static scope, personal context, and meeting side panels.

For more information, see [build tabs for calling](../../apps-in-teams-meetings/build-tabs-for-calling.md).

## Customizing your static tab in chats or meetings

To customize static tab experience in chats, channels, or meetings, use `setConfig` APIs in your tab to update `contentUrl` and `websiteUrl`. Following is an example:

```json
pages.config.setConfig({ 
  "contentUrl": "https://wwww.contoso.com/teamsapp/thread/" + context.threadId,
   ...}
```

Only `contentUrl` and `websiteUrl` changes are supported for `setConfig`; changes to other properties are not supported for static tabs.

## Offline tabs

> [!NOTE]
> Personal tabs with offline functionality are supported only on Teams in Android devices.

Create personal tab that functions in Teams without internet connection. An offline tab benefits users working in areas with poor or no network coverage, such as field agents or frontline workers. Users perform following tasks in offline tab:

* Record data through forms that include images and videos.
* View details of previously submitted requests, incidents, or forms.

When user's device reconnects to internet, tab automatically synchronizes locally stored data with Azure Blob storage. This action ensures that all offline changes made by user update in central storage, maintaining data consistency across organization.

:::image type="content" source="../../assets/images/tabs/tab-support-offline-mobile.gif" alt-text="Graphic shows how an offline tab works in Teams mobile client.":::

### Build an offline tab

Before building an offline tab, ensure that you meet [prerequisites](~/tabs/how-to/tab-requirements.md) to build personal tab.

1. [Create an Azure Blob storage](/azure/storage/blobs/storage-quickstart-blobs-portal). Note account and container name for later use.

1. Clone [Microsoft Teams Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/) repository.

1. In cloned repository, navigate to **samples** > **tab-support-offline** > **nodejs** and open folder in Visual Studio Code.

   :::image type="content" source="../../assets/images/tabs/open-tab-sample-vsc.png" alt-text="Screenshot shows how to open code sample in Visual Studio Code." lightbox="../../assets/images/tabs/open-tab-sample-vsc.png":::

1. Under **EXPLORER**, navigate to **server** > **blobStoreOperations.js** and replace `{{ account-Name }}` and `{{ container-Name }}` with your Azure Blob storage account and container values.

1. Press **F5** to debug app. Teams opens in browser window when build completes.

1. Sign in with your Microsoft 365 account if prompted.

1. Select **Add** when dialog box opens to add tab app to Teams.

   :::image type="content" source="../../assets/images/tabs/add-offline-tab-teams.png" alt-text="Screenshot shows how to add offline tab app to Teams.":::

Congratulations! You have successfully created Teams tab with offline functionality.
> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Build+an+offline+tab&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Fbranch%3Dpr-en-us-12027%26tabs%3Dvs%26pivots%3Dnode-java-script%23build-an-offline-tab&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

## Best practices for tabs in Teams mobile

Learn how to optimize your tab's performance in Teams Android and iOS clients by reviewing [best practices for Teams mobile](../../resources/teams-mobile-best-practices.md).

## Code sample

| Sample name | Description | .NET | Node.js | Manifest |
|-------------|-------------|------|---------|----------|
|Tab personal| This sample showcases development of custom personal tab for Microsoft Teams, utilizing ASP.NET Core MVC to enhance user interaction. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal/mvc-csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal-quickstart/js) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal/mvc-csharp/demo-manifest/tab-personal.zip) |
|Offline personal tab | This sample app demonstrates a CRUD application that functions offline in Microsoft Teams, allowing users to manage data without internet connection and automatically sync with blob storage when reconnected. | NA | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-support-offline/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/tab-support-offline/nodejs/demo-manifest/tab-support-offline.zip) |

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