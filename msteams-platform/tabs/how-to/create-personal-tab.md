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

Tabs in chats, channels, or meetings behave more like apps, since you can pin only one tab per app to the left pane for easy access.

> [!IMPORTANT]
>
> Agents Toolkit extension within Visual Studio Code (previously known as Teams Toolkit) introduces many new app development features. Use Agents Toolkit v5 for building your Teams app.

Ensure you've all the [prerequisites](~/tabs/how-to/tab-requirements.md) to build your tab.

[!INCLUDE [sdk-include](~/includes/sdk-include.md)]

::: zone pivot="node-java-script"

## Create a tab with JavaScript

Follow the step-by-step guide to [build your tab app using JavaScript](../../sbs-gs-javascript.yml).

<!--
1. At the command prompt, install Yeoman (https://yeoman.io/) and gulp-cli (https://www.npmjs.com/package/gulp-cli) packages by entering the following command after installing Node.js:

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

1. Enter the following command in your new directory to start Microsoft Teams app generator:

    ```cmd
    yo teams
    ```

1. Provide your values to a series of questions prompted by Microsoft Teams app generator to update your `manifest.json` file.

    :::image type="content" source="~/assets/images/tab-images/teamsTabScreenshot.PNG" alt-text="Teams generator":::

    <details>
    <summary><b>Series of questions to update your manifest.json file</b></summary>

    * **What is your solution name?**

      Your solution name becomes your project name. Accept the suggested name by selecting **Enter**.

    * **Where do you want to place the files?**

      You are in your project directory. Select **Enter**.

    * **Title of your Microsoft Teams app project?**

      This title becomes your app package name and appears in the manifest and description. Enter a title or select **Enter** to accept the default.

    * **Your (company) name? (max 32 characters)**

      This company name appears in the app manifest. Enter a company name or select **Enter** to accept the default.

    * **Which manifest version would you like to use?**

      Select the default schema.

    * **Quick scaffolding? (Y/n)**

      The default is yes; enter **n** to enter your Microsoft Partner ID.

    * **Enter your Microsoft Partner Id, if you've one? (Leave blank to skip)**

      This field is optional and should be used only if you already belong to [Microsoft Cloud Partner Program](https://partner.microsoft.com), formerly known as Microsoft Partner Network.

    * **What do you want to add to your project?**

      Select **( &ast; ) A Tab**.

    * **The URL where you will host this solution?**

      By default, the generator suggests an Azure website URL. When testing locally, a valid URL is not necessary.

    * **Would you like show a loading indicator when your app/tab loads?**

      Choose not to include a loading indicator. The default is no; enter **n**.

    * **Would you like personal apps to be rendered without a tab header-bar?**

      Choose not to include the option. The default is no; enter **n**.

    * **Would you like to include Test framework and initial tests? (y/N)**

      Choose not to include a test framework. The default is no; enter **n**.

    * **Would you like to include ESLint support? (y/N)**

      Choose not to include ESLint support. The default is no; enter **n**.

    * **Would you like to use Azure Applications Insights for telemetry? (y/N)**

      Choose not to include [Azure Application Insights](/azure/azure-monitor/app/app-insights-overview). The default is no; enter **n**.

    * **Default Tab Name (max 16 characters)?**

      Enter your tab name. This name is used throughout your project as a file or URL path component.

    * **What kind of Tab would you like to create?**

      Use the arrow keys to select **Personal (static)**.

    * **Do you require Microsoft Entra Single-Sign-On support for the tab?**

      Choose not to include Microsoft Entra Single-Sign-On support. The default is yes; enter **n**.
    > [!NOTE]
    > In a tab, the home page appears only when the user selects the back button (or navigates away and returns). The tab does not maintain or retain previous state by design.
    </details>

-->

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+Issue%5D+Create+a+tab+with+JavaScript&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dnode-java-script%23create-a-tab-with-javascript&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

### Add a content page to the tab

Create a content page and update the existing tab application files:

1. Create a new **personal.html** file in Visual Studio Code with the following markup:

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

1. Save **personal.html** in your application's **public** folder as shown:

    ```
    ./src/public/<yourDefaultTabNameTab>/personal.html
    ```

1. Open `manifest.json` in Visual Studio Code from the following location:

    ```
     ./src/manifest/manifest.json
    ```

1. Append the following JSON object into the empty `staticTabs` array (`staticTabs":[]`):

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
    > Replace **yourDefaultTabNameTab** with the value entered in the generator for **Default Tab Name**, appended with the word **Tab**.
    >
    > For example: If DefaultTabName is **MyTab**, then use **/MyTabTab/**

1. Update the **contentUrl** path component **yourDefaultTabNameTab** with your actual tab name.

1. Save the updated `manifest.json` file.

1. Open **Tab.ts** in Visual Studio Code from the following path to assign your content page in an iFrame:

    ```bash
    ./src/server/<yourDefaultTabNameTab>/<yourDefaultTabNameTab>.ts
    ```

1. Append the following in the list of iFrame decorators:

    ```typescript
     @PreventIframe("/<yourDefaultTabName Tab>/personal.html")
    ```

1. Save the updated file. Your tab code is complete.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Add+a+content+page+to+the+tab&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Fbranch%3Dpr-en-us-12027%26tabs%3Dvs%26pivots%3Dnode-java-script%23add-a-content-page-to-the-tab&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

### Create your app package

An app package is required to build and run your application in Teams. Create the app package through a gulp task that validates `manifest.json` and generates a zip folder in the `./package` directory. Use the command `gulp manifest` at the command prompt.

### Build and run your application

#### Build your application

At the command prompt, run the following command to transpile your solution into the **./dist** folder:

```cmd
gulp build
```

#### Run your application

1. At the command prompt, run the following command to start a local web server:

    ```cmd
    gulp serve
    ```

1. In your browser, enter `http://localhost:3007/<yourDefaultAppNameTab>/` to view your application's home page.

    :::image type="content" source="~/assets/images/tab-images/homePage.png" alt-text="Default Tab":::

1. Browse to `http://localhost:3007/<yourDefaultAppNameTab>/personal.html` to view your tab.

    :::image type="content" source="~/assets/images/tab-images/personalTab.PNG" alt-text="Default html Tab":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Build+and+run+your+application&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Fbranch%3Dpr-en-us-12027%26tabs%3Dvs%26pivots%3Dnode-java-script%23build-and-run-your-application&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

### Establish a secure tunnel to your tab

At the command prompt, exit the local server and run the following command to establish a secure tunnel to your tab:

```cmd
gulp ngrok-serve
```

Once your tab is uploaded to Teams through **ngrok** and successfully saved, you can view it in Teams until your tunnel session ends.

### Upload your application to Teams

1. In Teams, select **Apps** &nbsp;:::image type="content" source="~/assets/images/tab-images/store.png" alt-text="Microsoft Teams Store":::.
1. Select **Manage your apps** > **Upload an app** > **Upload a custom app**.
1. In your project directory, navigate to the **./package** folder, select the zip folder, and choose **Open**.

    :::image type="content" source="~/assets/images/tab-images/addingpersonaltab.png" alt-text="Adding your tab":::

1. In the dialog, select **Add**. Your tab uploads to Teams.

    :::image type="content" source="~/assets/images/tab-images/personaltabuploaded.png" alt-text="Personal tab uploaded":::

1. In the left pane of Teams, click ellipses &#x25CF;&#x25CF;&#x25CF; and then choose your uploaded app to view your tab.

   Your tab is successfully created and added in Teams. You can also [reorder](#reorder-tabs) your tabs in Teams.

::: zone-end

::: zone pivot="razor-csharp"

## Create a tab with ASP.NET Core

1. At the command prompt, create a new directory for your tab project.

1. Clone the sample repository into your new directory using the command below or download the [source code](https://github.com/OfficeDev/Microsoft-Teams-Samples) and extract the files:

    ```cmd
    git clone https://github.com/OfficeDev/Microsoft-Teams-Samples.git
    ```

Follow these steps to create a tab:

1. [Generate your application with a tab](#generate-your-application-with-a-tab-1)
1. [Update and run your application](#update-and-run-your-application)
1. [Establish a secure tunnel to your tab](#establish-a-secure-tunnel-to-your-tab-1)
1. [Update your app package with Developer Portal](#update-your-app-package-with-developer-portal)
1. [Preview your app in Teams](#preview-your-app-in-teams)

### Generate your application with a tab

1. Open Visual Studio and select **Open a project or solution**.

1. Navigate to **Microsoft-Teams-Samples** > **samples** > **tab-personal** > **razor-csharp** folder and open **PersonalTab.sln**.

1. In Visual Studio, press **F5** or choose **Start Debugging** from your application's **Debug** menu to verify that the application loads correctly. In a browser, navigate to the following URLs:

    * `<http://localhost:3978/>`
    * `<http://localhost:3978/personalTab>`
    * `<http://localhost:3978/privacy>`
    * `<http://localhost:3978/tou>`

<details>
<summary><b>Review the source code</b></summary>

#### Startup.cs

This project was created from an ASP.NET Core 3.1 web application empty template with the **Advanced - Configure for HTTPS** option selected during setup. The MVC services register using dependency injection in `ConfigureServices()`. Since the empty template does not enable static content by default, the static files middleware is added in `Configure()` as shown:

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

In ASP.NET Core, the web root folder contains static files.

#### Index.cshtml

ASP.NET Core displays **Index.cshtml** as the default home page when the browser URL points to the site root.

#### AppManifest folder

This folder contains the required app package files:

* A full color icon (192 x 192 pixels).
* A transparent outline icon (32 x 32 pixels).
* A `manifest.json` file that specifies your app's attributes.

Zip these files into an app package for uploading your tab to Teams. Teams loads the `contentUrl` specified in the manifest, embeds it in an <iframe\>, and renders it in your tab.

#### .csproj

In Visual Studio Solution Explorer, right-click on the project and select **Edit Project File**. At the file's end you will see code that creates and updates your zip folder when the application builds:

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

1. In Visual Studio Solution Explorer, navigate to **Pages** > **Shared** folder and open **_Layout.cshtml**. Add the following within the `<head>` section:

    ```HTML
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
    <script src="https://res.cdn.office.net/teams-js/2.0.0/js/MicrosoftTeams.min.js" integrity="sha384-QtTBFeFlfRDZBfwHJHYQp7MdLJ2C3sfAEB1Qpy+YblvjavBye+q87TELpTnvlXw4" crossorigin="anonymous"></script>
    ```

1. In Solution Explorer, open **PersonalTab.cshtml** from the **Pages** folder and add `microsoftTeams.app.initialize()` inside the `<script>` tags.

1. Select **Save**.

1. In Visual Studio, press **F5** or choose **Start Debugging** from the **Debug** menu.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+and+run+your+application&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23update-and-run-your-application&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)
>
### Establish a secure tunnel to your tab

At the command prompt in your project root, run the following command to establish a secure tunnel:

```cmd
ngrok http 3978 --host-header=localhost
```

### Update your app package with Developer Portal

1. Go to [**Developer portal**](https://dev.teams.microsoft.com/home).

1. Open **Apps** and select **Import app**.

1. The app package file, **tab.zip**, is located at `/bin/Debug/netcoreapp3.1/tab.zip`.

1. Select **tab.zip** and open it in Developer Portal.

1. A default **App ID** populates the **Basic information** section.

1. Add the Short and Long descriptions for your app in **Descriptions**.

1. In **Developer Information**, supply the required details and in **Website (must be a valid HTTPS URL)** provide your ngrok HTTPS URL.

1. Under **App URLs**, update the Privacy policy to `https://<yourngrokurl>/privacy` and Terms of use to `https://<yourngrokurl>/tou`, then select **Save**.

1. In **App features**, select **Personal app** > **Create your first personal app tab**, enter the name and update the **Content URL** with `https://<yourngrokurl>/personalTab`. Leave the Website URL field blank, select **Context** as personalTab from the dropdown, and choose **Confirm**.

1. Select **Save**.

1. In the Domains section, include your ngrok URL without the HTTPS prefix (`<yourngrokurl>.ngrok.io`).

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+your+app+package+with+Developer+Portal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23update-your-app-package-with-developer-portal&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Preview your app in Teams

1. From Developer Portal, select **Preview in Teams**. Developer Portal indicates that your custom app has been successfully uploaded. The **Add** page appears for your app in Teams.

1. Select **Add** to load the tab in Teams. Your tab becomes available in Teams.

    :::image type="content" source="~/assets/images/tab-images/personaltabaspnetuploaded.png" alt-text="Default Tab":::

   Your tab is created and added in Teams. You can also [reorder](#reorder-tabs) your tab in Teams.

::: zone-end

::: zone pivot="mvc-csharp"

## Create a tab with ASP.NET Core MVC

1. At the command prompt, create a new directory for your tab project.

1. Clone the sample repository into your new directory using the following command or download the [source code](https://github.com/OfficeDev/Microsoft-Teams-Samples) and extract the files:

    ```cmd
    git clone https://github.com/OfficeDev/Microsoft-Teams-Samples.git
    ```

Follow these steps to create a tab:

1. [Generate your application with a tab](#generate-your-application-with-a-tab)
1. [Update and run application](#update-and-run-your-application-1)
1. [Establish a secure tunnel to your tab](#establish-a-secure-tunnel-to-your-tab-2)
1. [Update your app package with Developer Portal](#update-your-app-package-with-developer-portal-1)
1. [Preview your app in Teams](#preview-your-app-in-teams-1)

### Generate your application with a tab

1. Open Visual Studio and select **Open a project or solution**.

1. Navigate to **Microsoft-Teams-Samples** > **samples** > **tab-personal** > **mvc-csharp** folder and open **PersonalTabMVC.sln**.

1. In Visual Studio, press **F5** or choose **Start Debugging** from your application's **Debug** menu to verify proper loading. In a browser, visit the following URLs:

    * `<http://localhost:3978>`
    * `<http://localhost:3978/personalTab>`
    * `<http://localhost:3978/privacy>`
    * `<http://localhost:3978/tou>`

<details>
<summary><b>Review the source code</b></summary>

#### Startup.cs

This project was created from an ASP.NET Core 3.1 web application empty template with the **Advanced - Configure for HTTPS** option selected at setup. The MVC services register using dependency injection via `ConfigureServices()`. Because serving static content is not enabled by default, static files middleware is included in `Configure()` as shown:

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

In ASP.NET Core, the web root folder stores static files.

#### AppManifest folder

This folder holds the required app package files:

* A **full color icon** (192 x 192 pixels).
* A **transparent outline icon** (32 x 32 pixels).
* A `manifest.json` file that details your app's attributes.

Zip these files into an app package for uploading your tab to Teams. Teams loads the `contentUrl` in the manifest, embeds it in an iFrame, and displays it as your tab.

#### .csproj

In Visual Studio Solution Explorer, right-click your project and select **Edit Project File**. At the end of the file, you see code that creates and updates your zip folder when the application builds:

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

**PersonalTab.cs** defines a message object and methods called from **PersonalTabController** when a user selects a button in the **PersonalTab** view.

#### Views

These views correspond to different sections in ASP.NET Core MVC:

* Home: ASP.NET Core displays **Index.cshtml** as the default home page when the browser URL points to the site root.
* Shared: The partial view **_Layout.cshtml** contains your application's overall structure and shared UI elements. It also references the Teams Library.

#### Controllers

Controllers use the `ViewBag` property to dynamically pass values to the Views.

</details>

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Generate+your+application+with+a+tab&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dmvc-csharp%23generate-your-application-with-a-tab&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Update and run your application

1. In Visual Studio Solution Explorer, navigate to **Views** > **Shared** folder and open **_Layout.cshtml**. Add the following within the `<head>` section:

    ```HTML
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
    <script src="https://res.cdn.office.net/teams-js/2.0.0/js/MicrosoftTeams.min.js" integrity="sha384-QtTBFeFlfRDZBfwHJHYQp7MdLJ2C3sfAEB1Qpy+YblvjavBye+q87TELpTnvlXw4" crossorigin="anonymous"></script>
    ```

1. In Solution Explorer, open **PersonalTab.cshtml** from **Views** > **PersonalTab** folder and add `microsoftTeams.app.initialize()` inside the `<script>` tags.

1. Select **Save**.

1. In Visual Studio, press **F5** or choose **Start Debugging** from the **Debug** menu.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+and+run+your+application&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dmvc-csharp%23update-and-run-your-application&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)
>
### Establish a secure tunnel to your tab

At the command prompt in your project root, run the following command to establish a secure tunnel:

```cmd
ngrok http 3978 --host-header=localhost
```

### Update your app package with Developer Portal

1. Go to [**Developer portal**](https://dev.teams.microsoft.com/home).

1. Open **Apps** and select **Import app**.

1. The app package is named **tab.zip** and is located at:

    ```
    /bin/Debug/netcoreapp3.1/tab.zip
    ```

1. Select **tab.zip** and open it in Developer Portal.

1. A default **App ID** populates the **Basic information** section.

1. Add the Short and Long descriptions for your app in **Descriptions**.

1. In **Developer information**, supply the required details and in **Website (must be a valid HTTPS URL)** provide your ngrok HTTPS URL.

1. Under **App URLs**, update the Privacy policy to `https://<yourngrokurl>/privacy` and Terms of use to `https://<yourngrokurl>/tou`, then select **Save**.

1. In **App features**, select **Personal app** > **Create your first personal app tab**, enter the name and update the **Content URL** with `https://<yourngrokurl>/personalTab`. Leave the Website URL blank, select **Context** as personalTab from the dropdown, and choose **Confirm**.

1. Select **Save**.

1. In the Domains section, include your ngrok URL without the HTTPS prefix (`<yourngrokurl>.ngrok.io`).

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+your+app+package+with+Developer+Portal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dmvc-csharp%23update-your-app-package-with-developer-portal-1&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Preview your app in Teams

1. From Developer Portal, select **Preview in Teams**. Developer Portal indicates successful upload of your custom app. The **Add** page appears for your app in Teams.

1. Select **Add** to load the tab in Teams. Your tab becomes available in Teams.

    :::image type="content" source="~/assets/images/tab-images/personaltabaspnetmvccoreuploaded.png" alt-text="Personal tab":::
  
    Your tab is created and added in Teams. You can also [reorder](#reorder-tabs) your tab in Teams.

::: zone-end

::: zone pivot="blazor-app"

Blazor lets you build interactive web UIs using C# instead of JavaScript. Create a tab app and a bot app with Blazor and the latest version of Visual Studio.

:::image type="content" source="~/assets/images/toolkit-v2/blazor/your-blazor-helloworld-app.png" alt-text="Screenshot of the Blazor app displaying the tab, Bot, and Message Extension output after the step-by-step Blazor guide is successfully completed.":::

> [!NOTE]
> Agents Toolkit doesn't support message extension capability.

Below is a list of tools required for building and deploying your app.

| &nbsp;    | Install   | For using... |
| --- | --- | --- |
| **Required** | &nbsp; | &nbsp; |
| &nbsp; | [Visual Studio version 17.2.0 preview 2.1](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=enterprise&ch=pre&rel=17)|  Select Visual Studio Enterprise 2022 Preview (version 17.2.0 preview 2.1). |
| &nbsp; | [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams to collaborate with everyone through apps for chat, meetings, and call-all in one place. |
| &nbsp; | [Microsoft Edge](https://www.microsoft.com/edge/) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser with developer tools. |

## Prepare development environment

After installing the required tools, set up your development environment.

### Install Agents Toolkit

Agents Toolkit simplifies the development process by provisioning and deploying cloud resources for your app, publishing to Teams Store, and more. Use Agents Toolkit with Visual Studio or as Agents Toolkit Command Line Interface.

# [Latest version of the Visual Studio](#tab/vs)

Use the latest version of Visual Studio to develop Teams apps with Blazor Server in .NET.

To install the Agents Toolkit extension:

1. Download the latest version of Visual Studio.
1. Open the Visual Studio installer file (`.exe`) from your download folder.
1. Select **Continue** on the Visual Studio Installer page to configure your installation.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor/visual-studio-installer.PNG" alt-text="Screenshot of Visual Studio Installer with continue options highlighted in red.":::

1. Under **Workloads**, select **ASP.NET and web development**.

1. Under **Installation details**, select **Microsoft 365 Agents Toolkit**.

1. Select **Install**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/vs.install.PNG" alt-text="Screenshot of Visual Studio Enterprise Preview with the option Asp.NET, web development, and Microsoft Teams development tools under installation details and install highlighted in red.":::

    Visual Studio installs in a few minutes.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Install+Microsoft+Agents+Toolkit+-+Latest+version+of+the+Visual+Studio&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23install-microsoft-agents-toolkit&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md%23latest-version-of-the-visual-studio&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

# [Command line](#tab/cli)

To install Microsoft 365 Agents Toolkit CLI (previously known as TeamsFx CLI), use npm:

``` bash
npm install -g @microsoft/teamsfx-cli
```

Depending on your configuration, you may need to use `sudo`:

``` bash
sudo npm install -g --unsafe-perm @microsoft/teamsfx-cli
 ```

This condition often occurs on Linux and macOS systems.

Ensure you add the npm global cache to your PATH. This step typically occurs during Node.js installation.  

Use the CLI via the `atk` command. Verify its functionality by running `atk -h`.

> [!CAUTION]
> Before running TeamsFx in PowerShell terminals, enable the remote signed execution policy for PowerShell.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Install+Microsoft+Agents+Toolkit+-+Command+line&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23install-microsoft-agents-toolkit&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md%23command-line&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

---

## Set up your Teams development tenant

A tenant represents a container for your organization in Teams, where you chat, share files, and run meetings. It is also where you upload and test your custom app. Verify that you are ready to develop using your tenant.

### Enable custom app upload

After creating your app, load it in Teams without distributing it using custom app upload. Sign in to your Microsoft 365 account to access this option.

To verify if you can upload a custom app in Teams:

1. In the Teams client, select **Apps**.
1. Select **Manage your apps**.
1. Select **Upload an app**. If you see the **Upload a custom app** option, custom app upload is enabled.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor/upload-custom-app.PNG" alt-text="Screenshot shows the option to upload a custom app in Teams.":::

    > [!NOTE]
    > Contact your Teams administrator if you do not see the option to upload a custom app.

### Create a free Teams developer tenant (optional)

If you do not have a Teams developer account, you can get one for free via the Microsoft 365 developer program.

1. Go to the [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program).
1. Select **Join Now** and follow the onscreen instructions.
1. On the welcome screen, select **Set up E5 subscription**.
1. Configure your administrator account. After completion, the following screen appears.

    :::image type="content" source="../../assets/images/build-your-first-app/dev-program-subscription.PNG" alt-text="Screenshot of Microsoft 365 Developer Program displaying your Microsoft 365 developer subscriptions for the Blazor app.":::

1. Sign in to Teams with the administrator account you just set up. Verify that you see the **Upload a custom app** option in Teams.

## Get a free Azure account

If you plan to host your app or access resources in Azure, obtain an Azure subscription. [Create a free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you start.

Now you have all the tools and accounts set up. Next, set up your development environment and start building!

## Create project workspace for your tab app

Begin Teams app development by creating your first app that uses tab capability.

:::image type="content" source="~/assets/images/toolkit-v2/blazor/your-blazor-helloworld-app1.png" alt-text="Screenshot of Blazor app displaying the final output of tab app after the step-by-step Blazor guide is successfully completed.":::

This tutorial walks you through creating, running, and deploying your first Teams app using .NET/Blazor.

In this page, you learn:

1. [How to set up a new tab project with Agents Toolkit](#create-your-tab-project)
1. [About the directory structure of your app](#take-a-tour-of-the-source-code-for-teams-tab-app)

## Create your tab project

Use Agents Toolkit to create your first tab project. The toolkit guides you through several pages to create and configure your Teams app project:

1. **Create a new project** page: Select the project type.
1. **Configure your new project** page: Enter project details.
1. **Create a new Teams application** page: Select your Teams app capabilities.

**To create your tab project workspace**

1. Open the latest version of Visual Studio.

1. Select **Create a new project**.

   :::image type="content" source="../../assets/images/toolkit-v2/blazor/vs-select-project.png" alt-text="Screenshot of Visual Studio with Create a new project option highlighted in red for Blazor app.":::

   The **Create a new project** page appears.

1. Select the appropriate project type and details:

   1. Search for **Microsoft 365** in the templates dropdown.  
   1. Select **Microsoft 365 Agents** as the template.
   1. Select **Next**.

      :::image type="content" source="../../assets/images/toolkit-v2/blazor/vs-select-teams-app.png" alt-text="Screenshot of Create a new project with Next option highlighted in red for Blazor app creation." lightbox="../../assets/images/toolkit-v2/blazor/vs-select-teams-app.png":::

      The **Configure your new project** page appears.

1. Configure the new project details:

   1. Enter a suitable name for your project.

      > [!NOTE]
      > The project name you provide automatically sets the **Solution name**. Change the solution name if required; it does not impact the project name.

   1. Select the folder path where you want to create the project workspace.
   1. Enter a different solution name if desired.
   1. Choose whether to save the project and solution in the same folder. For this tutorial, this option is not required.
   1. Select **Create**.

      :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/configure-new-project.PNG" alt-text="Screenshot of Configure your new project with Create option highlighted in red." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/configure-new-project.PNG":::

      The **Create a new Teams application** page appears.

1. Select the Teams app capability:

   1. Choose **Tab** as the capability.
   1. Select **Create**.

      :::image type="content" source="../../assets/images/toolkit-v2/first-tab/create-tab.png" alt-text="Screenshot of Create a new Teams application with Tab and Create options highlighted in red.":::

   Your Teams tab app is created in a few seconds.

   :::image type="content" source="../../assets/images/toolkit-v2/blazor/vs-tab-app.png" alt-text="Screenshot of Visual Studio displaying tips to get started while building your app." lightbox="../../assets/images/toolkit-v2/blazor/vs-tab-app.png":::

   <details>
   <summary>A quick recap of creating a Teams tab app.</summary>
   Watch this short recap for creating a Teams tab app.

   :::image type="content" source="~/assets/videos/blazorapp.gif" alt-text="Graphical representation shows the process of creating the Teams tab app1.":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Create+your+tab+project&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23create-your-tab-project&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Take a tour of the source code for Teams tab app

After project creation, you will see components required for building a basic tab app in the **Solution Explorer** pane of Visual Studio.

:::image type="content" source="../../assets/images/toolkit-v2/blazor/blazor-app-solution-explorer_1.png" alt-text="Screenshot of Solution explorer displaying the components to build a basic personal app.":::

Agents Toolkit creates scaffolding for your project based on the selected capabilities. Among other files, Agents Toolkit includes:

| Folder name | Contents |
| --- | --- |
| App icons | Stores app icons as PNG files in `color.png` and `outline.png`. |
| `manifest.json` | Contains the app manifest for publishing through Developer Portal for Teams, located in `Properties/manifest.json`. |
| `BackendController.cs` | Provides a backend controller in `Controllers/BackendController.cs` for assisting with authentication. |
| `Pages/Tab.razor` | Contains the markup for your tab. |
| `TeamsFx.cs` and `JS/src/index.js` | Used to initialize communications with the Teams host. |

You can extend backend functionality by adding additional ASP.NET Core controllers to your application.
</details>

## Build and run your first Teams tab app

After setting up your project workspace with Agents Toolkit, build your tab project.

To build and run your app:

1. Select **Project** > **Microsoft 365 Agents Toolkit** > **Select Microsoft 365 Account**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/configure-msteamsapp_1.png" alt-text="Screenshot of Visual Studio with Project, Agents Toolkit, and Prepare Teams App Dependencies options highlighted in red." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/configure-msteamsapp_1.png":::

1. Select your Microsoft 365 account or **Add an account** to sign in.

    :::image type="content" source="../../assets/images/toolkit-v2/m365-account_1.PNG" alt-text="Screenshot of Microsoft 365 Account with Continue option highlighted in red.":::

1. Select **Debug** > **Start Debugging** or press **F5** to run your app in debug mode.
    <!-- markdownlint-disable MD033 -->
    <br>
    <details>
    <summary>Learn what happens when you run your app locally in the debugger.</summary>

    When you press **F5**, Agents Toolkit:

    1. Registers your application with Microsoft Entra ID.
    1. Registers your application for uploading to Teams.
    1. Starts your application backend locally.
    1. Starts your application front-end locally.
    1. Opens Teams in a web browser with a command instructing Teams to upload a custom app (the URL is registered inside the application manifest).

    </details>

1. Install the self-signed SSL certificate for local debugging if prompted.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/ssl-prompt.png" alt-text="Screenshot of Security Warning with the Yes option highlighted.":::

    Teams launches in a web browser.

1. Select **Add**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-app.png" alt-text="Screenshot of the personal tab app dialog with the Add option highlighted.":::

1. Select **Open** to open the app in personal scope.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-app-scope.png" alt-text="Screenshot of the scope selection dialog with the Open option highlighted.":::

    Congratulations, your first tab app runs in your local environment!

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/app-local.png" alt-text="Screenshot shows your first tab app running in your local environment.":::

1. Navigate through the page to view user details.

1. Select **Authorize** to allow your app to retrieve user details using Microsoft Graph.

    The app requests permission to access user details.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/authorize-user-info.png" alt-text="Screenshot shows the authorize option in the personal tab of your app.":::

1. Select **Accept** to allow access to user details.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/ms-graph-permission_1.png" alt-text="Screenshot of Permissions requested displaying the App info.":::

    Your photograph and details appear in your **Personal Tab**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor/tab-user-info.png" alt-text="Screenshot shows the basic information displayed on the personal tab of your app in Teams.":::

    You can debug as with any web application. The app supports hot reloading; changes to project files trigger a page reload.

    <br>
    <details>
    <summary>Learn how to troubleshoot if your app fails to run locally.</summary>

    To run your app in Teams, you need a Microsoft 365 development account that permits custom app upload. See the Prerequisites section for more details.

    </details>

1. Stop debugging in Visual Studio.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Build+and+run+your+first+Teams+tab+app&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23build-and-run-your-first-teams-tab-app&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

## Preview your first Teams tab app

You have learned to create, build, and run a Teams app with tab capability. The following final steps deploy your app on Azure and enable preview in Teams:

1. [Provision your tab app in the cloud](#to-provision-your-tab-app-in-the-cloud)
1. [Deploy your tab app to cloud](#to-deploy-your-tab-app-to-cloud)
1. [Preview your tab app in Teams](#to-preview-your-tab-app-in-teams)

Deploy your first tab app on Azure using Agents Toolkit.

### **To provision your tab app in the cloud**

1. Select **Project** > **Microsoft 365 Agents Toolkit** > **Provision in the Cloud**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-provision_1.png" alt-text="Screenshot of Visual Studio with Project, Agents Toolkit, and Provision in the Cloud options highlighted in red." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-provision_1.png":::

1. Enter the subscription and resource group details in the **Provision** dialog:
   1. Choose the subscription from the **Subscription name** dropdown.
   1. Choose the resource group from the **Resource group** dropdown or select **New** to create one.
   1. If creating a new resource group, select your **Region**.
   1. Select **Provision**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/select-subscription.PNG" alt-text="Screenshot of Provision with New and Provision highlighted in red." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/select-subscription.PNG":::

   A provision warning appears.

1. Select **Provision**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/provision-warning.PNG" alt-text="Screenshot of Agents Toolkit with Provision highlighted in red.":::

   Provisioning takes a few minutes.

1. After provisioning completes, select **OK**.

    :::image type="content" source="../../assets/images/toolkit-v2/provision-complete.png" alt-text="Screenshot of Agents Toolkit app with OK option highlighted in red.":::

1. Select **View Provisioned Resources** to open the Azure portal.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/view-resource.PNG" alt-text="Screenshot of Agents Toolkit with View Provisioned Resources highlighted in red.":::

1. Sign in to your Azure portal account when prompted.

    Your app-dev-rg appears.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/app-dev-rg-azure.PNG" alt-text="Screenshot of Blazorapp-dev-rg displaying the Resources provisioned in the Azure portal.":::

    Your resources now appear in Azure!

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+To+provision+your+tab+app+in+the+cloud&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23to-provision-your-tab-app-in-the-cloud&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

#### **To deploy your tab app to cloud**

1. Select **Project** > **Microsoft 365 Agents Toolkit** > **Deploy to the Cloud**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-deploytocloud_1.png" alt-text="Screenshot of Visual Studio with Project, Agents Toolkit, and Deploy to the Cloud options highlighted in red." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-deploytocloud_1.png":::

1. Select **OK**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/deploy-success.PNG" alt-text="Screenshot of app built with Agents Toolkit with OK option highlighted in red.":::

    Your tab app deploys to the cloud successfully.

#### **To preview your tab app in Teams**

1. Select **Project** > **Microsoft 365 Agents Toolkit** > **Preview in Teams**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-preview_1.png" alt-text="Screenshot of Visual Studio with Project, Agents Toolkit, and Preview in Teams options highlighted in red." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-preview_1.png":::

    Teams launches in a web browser.

1. Select **Add**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-app.png" alt-text="Screenshot of the personal tab app dialog with the Add option highlighted.":::

1. Select **Open** to open the app in personal scope.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-app-scope.png" alt-text="Screenshot of the scope selection dialog with the Open option highlighted.":::

    Congratulations, your first tab app now runs in your Azure environment!

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-tab-app-azure.PNG" alt-text="Screenshot shows the personal tab of your app in Teams.":::

1. Navigate through the page to view user details.

1. Select **Authorize** to allow your app to retrieve user details via Microsoft Graph.

    The app requests permission to access user details.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/authorize-user-info.png" alt-text="Screenshot shows the authorize option in the personal tab of your app in Teams.":::

1. Select **Accept** to grant permission for accessing user details.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/ms-graph-permission_1.png" alt-text="Screenshot of Permissions requested displaying the App info.":::

    Your photograph and details appear in your **Personal Tab**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/azure-user-info.png" alt-text="Screenshot of your app with personal tab displaying basic information.":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+To+preview+your+tab+app+in+Teams&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23to-preview-your-tab-app-in-teams&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

## Congratulations

You have completed the tutorial to build a tab app with Blazor.

::: zone-end

## Reorder tabs

Starting with manifest version 1.7, developers can rearrange tabs in their personal app. You can move the **bot chat** tab, which always defaults to the first position, to any position in the personal app tab header. Two reserved tab `entityId` keywords exist: **conversations** and **about**.

If you create a bot with a **personal** scope, it appears in the first tab position by default. To move it, add a static tab object to your manifest using the reserved keyword **conversations**. The **conversations** tab appears on the web and desktop based on its position in the `staticTabs` array.

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
> In mobile, tabs are reordered as defined in `staticTabs`.

This property also allows you to set the default landing capability for your app. Configure the app to open as a tab or a bot by default. For more details, see [configure default landing capability](../../concepts/deploy-and-publish/add-default-install-scope.md#configure-your-apps-default-landing-capability).

## Extend static tabs to group chat, channels, and meetings

> [!NOTE]
> To extend static tabs to group chat, channels, and meetings, use app manifest v1.16 or later.

You can extend static tabs beyond pinned app content to function more like apps by allowing only one tab per app, for example, a dedicated YouTube app tab.

To extend static tabs to group chat, channels, and meetings, update your [app manifest](/microsoft-365/extensibility/schema/root-static-tabs) with the `scopes` and `context` parameters in the `staticTabs` property. When you declare multiple static tabs in the manifest and add the app in channel scope, only the first tab in the manifest appears.

Below is an example app manifest where a static tab functions in all scopes and contexts in Teams:

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

If a context is not defined in the app manifest, Teams defaults to:

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

You can create personal scope apps that integrate with Public Switched Telephone Network (PSTN) and Teams-to-Teams calls. Use the appropriate scope and context to build apps that utilize tab type, static scope, personal context, and meeting side panels.

For more information, see [build tabs for calling](../../apps-in-teams-meetings/build-tabs-for-calling.md).

## Customizing your static tab in chats or meetings

To customize your static tab experience in chats, channels, or meetings, use the `setConfig` APIs in your tab to update the `contentUrl` and `websiteUrl`. For example:

```json
pages.config.setConfig({ 
  "contentUrl": "https://wwww.contoso.com/teamsapp/thread/" + context.threadId,
   ...}
```

Only changes to `contentUrl` and `websiteUrl` are supported via `setConfig`; other properties remain unchanged for static tabs.

## Offline tabs

> [!NOTE]
> Personal tabs with offline functionality are supported only on Teams in Android devices.

You can create a personal tab that functions in Teams without an internet connection. An offline tab benefits users in areas with limited or no network coverage, such as field agents or frontline workers. Users can perform the following tasks in an offline tab:

* Record data through forms that may include images and videos.
* View details of previously submitted requests, incidents, or forms.

When the device reconnects to the internet, the tab automatically synchronizes the locally stored data with an Azure Blob storage, ensuring that all offline changes are updated centrally and data consistency is maintained.

:::image type="content" source="../../assets/images/tabs/tab-support-offline-mobile.gif" alt-text="Graphic shows how an offline tab works in Teams mobile client.":::

### Build an offline tab

Before building an offline tab, ensure you meet the [prerequisites](~/tabs/how-to/tab-requirements.md) for creating a personal tab.

1. [Create an Azure Blob storage](/azure/storage/blobs/storage-quickstart-blobs-portal). Note the account and container names for later use.

1. Clone the [Microsoft Teams Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/) repository.

1. In the cloned repository, navigate to **samples** > **tab-support-offline** > **nodejs** and open the folder in Visual Studio Code.

   :::image type="content" source="../../assets/images/tabs/open-tab-sample-vsc.png" alt-text="Screenshot shows how to open the code sample in Visual Studio Code." lightbox="../../assets/images/tabs/open-tab-sample-vsc.png":::

1. Under **EXPLORER**, go to **server** > **blobStoreOperations.js** and replace `{{ account-Name }}` and `{{ container-Name }}` with your Azure Blob storage account and container values.

1. Press **F5** to debug the app. Teams opens in a browser window once the build completes.

1. Sign in with your Microsoft 365 account when prompted.

1. Select **Add** when the dialog prompts you to add the tab app to Teams.

   :::image type="content" source="../../assets/images/tabs/add-offline-tab-teams.png" alt-text="Screenshot shows how to add the offline tab app to Teams.":::

Congratulations! You have successfully created a Teams tab with offline functionality.
> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Build+an+offline+tab&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Fbranch%3Dpr-en-us-12027%26tabs%3Dvs%26pivots%3Dnode-java-script%23build-an-offline-tab&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

## Best practices for tabs in Teams mobile

For optimizing tab performance on Teams Android and iOS clients, see [best practices for Teams mobile](../../resources/teams-mobile-best-practices.md).

## Code sample

| Sample name | Description | .NET | Node.js | Manifest |
|-------------|-------------|------|---------|----------|
| Tab personal | This sample showcases building a custom personal tab for Teams using ASP.NET Core MVC to enhance user interaction. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal/mvc-csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal-quickstart/js) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal/mvc-csharp/demo-manifest/tab-personal.zip) |
| Offline personal tab | This sample app demonstrates a CRUD application that functions offline in Teams, allowing users to manage data without an internet connection and automatically sync with blob storage when reconnected. | NA | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-support-offline/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/tab-support-offline/nodejs/demo-manifest/tab-support-offline.zip) |

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