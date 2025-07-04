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

Tabs in chats, channels, or meetings act as full-fledged apps. Developers can pin only one tab per app to the left pane for quick access.

> [!IMPORTANT]
>
> Microsoft 365 Agents Toolkit (previously known as Teams Toolkit) now comes as an extension within Visual Studio Code with many new app development features. Developers are recommended to use Agents Toolkit v5 when building Teams apps.

Ensure that developers meet all the [prerequisites](~/tabs/how-to/tab-requirements.md) to build a tab.

[!INCLUDE [sdk-include](~/includes/sdk-include.md)]

::: zone pivot="node-java-script"

## Create a tab with JavaScript

Follow the step-by-step guide to [build your tab app using JavaScript](../../sbs-gs-javascript.yml).

<!--
1. At the command prompt, install the [Yeoman](https://yeoman.io/) and [gulp-cli](https://www.npmjs.com/package/gulp-cli) packages by entering the following command after installing Node.js:

    ```cmd
    npm install yo gulp-cli --global
    ```

1. At the command prompt, install the Microsoft Teams app generator by entering the following command:

    ```cmd
    npm install generator-teams --global
    ```

The following steps explain how to create a tab:

1. [Generate your application with a tab](#generate-your-application-with-a-tab)
1. [Add a content page to the tab](#add-a-content-page-to-the-tab)
1. [Create your app package](#create-your-app-package)
1. [Build and run your application](#build-and-run-your-application)
1. [Establish a secure tunnel to your tab](#establish-a-secure-tunnel-to-your-tab)
1. [Upload your application to Teams](#upload-your-application-to-teams)

### Generate your application with a tab

1. At the command prompt, create a new directory for the tab.

1. In the new directory, run the Teams app generator with:

    ```cmd
    yo teams
    ```

1. Provide values to the prompted questions. The generator uses these answers to update the `manifest.json` file.

    :::image type="content" source="~/assets/images/tab-images/teamsTabScreenshot.PNG" alt-text="Teams generator":::

    <details>
    <summary><b>Series of questions to update your manifest.json file</b></summary>

    * **What is your solution name?**

      The solution name sets the project name. Developers can accept the suggested name by selecting **Enter**.

    * **Where do you want to place the files?**

      Developers are already in the project directory. Select **Enter**.

    * **Title of your Microsoft Teams app project?**

      This sets the app package name and appears in the manifest and description. Developers can enter a custom title or press **Enter** to accept the default.

    * **Your (company) name? (max 32 characters)**

      This name appears in the manifest. Enter a company name or press **Enter** to accept the default.

    * **Which manifest version would you like to use?**

      Developers select the default schema.

    * **Quick scaffolding? (Y/n)**

      The default is yes; developers can enter **n** to specify a Microsoft Partner ID.

    * **Enter your Microsoft Partner Id, if you've one? (Leave blank to skip)**

      This field is optional and used only when already part of the [Microsoft Cloud Partner Program](https://partner.microsoft.com).

    * **What do you want to add to your project?**

      Select **( * ) A Tab**.

    * **The URL where you will host this solution?**

      The generator suggests an Azure website URL by default. For local testing, the URL need not be valid.

    * **Would you like show a loading indicator when your app/tab loads?**

      Choose not to include a loading indicator. Press **n** when prompted.

    * **Would you like personal apps to be rendered without a tab header-bar?**

      Choose not to remove the tab header-bar. Press **n** for the default.

    * **Would you like to include Test framework and initial tests? (y/N)**

      Developers choose no by pressing **n**.

    * **Would you like to include ESLint support? (y/N)**

      Choose no by pressing **n**.

    * **Would you like to use Azure Applications Insights for telemetry? (y/N)**

      Choose no by pressing **n**.

    * **Default Tab Name (max 16 characters)?**

      Provide a name for the tab. This value is used throughout the project as a file or URL path component.

    * **What kind of Tab would you like to create?**

      Use the arrow keys to select **Personal (static)**.

    * **Do you require Microsoft Entra Single-Sign-On support for the tab?**

      Choose not to include Microsoft Entra Single-Sign-On support by entering **n**.
    > [!NOTE]
    > In a tab, the home page appears only when the user navigates back using the back button. The tab does not retain previous state by design.
    </details>

-->

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+Issue%5D+Create+a+tab+with+JavaScript&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dnode-java-script%23create-a-tab-with-javascript&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

### Add a content page to the tab

Developers add a content page and update existing files in the tab application as follows:

1. Create a new **personal.html** file in Visual Studio Code with the markup below:

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

1. Save **personal.html** in the application's **public** folder at:

    ```
    ./src/public/<yourDefaultTabNameTab>/personal.html
    ```

1. Open the `manifest.json` file located at:

    ```
    ./src/manifest/manifest.json
    ```

1. Insert the following JSON object into the empty `staticTabs` array (`"staticTabs": []`):

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
    > The value **yourDefaultTabNameTab** must match the value entered for **Default Tab Name** during generation with **Tab** appended to it.  
    > For example: If the DefaultTabName is **MyTab**, then the folder path becomes **/MyTabTab/**.

1. Update the **contentUrl** path component **yourDefaultTabNameTab** to reflect the actual tab name.

1. Save the updated `manifest.json` file.

1. Open **Tab.ts** from the following location so that the content page is rendered in an iFrame:

    ```bash
    ./src/server/<yourDefaultTabNameTab>/<yourDefaultTabNameTab>.ts
    ```

1. Add the following line among the iFrame decorators:

    ```typescript
     @PreventIframe("/<yourDefaultTabName Tab>/personal.html")
    ```

1. Save the updated file. The tab code is now complete.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Add+a+content+page+to+the+tab&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Fbranch%3Dpr-en-us-12027%26tabs%3Dvs%26pivots%3Dnode-java-script%23add-a-content-page-to-the-tab&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

### Create your app package

Developers generate an app package to test the application in Teams. A gulp task validates the `manifest.json` file and creates a zip package in the `./package` directory. Run the following command at the command prompt:

    gulp manifest

### Build and run your application

#### Build your application

Run the following command at the command prompt to transpile the solution into the **./dist** folder:

```cmd
gulp build
```

#### Run your application

1. Start a local web server by entering the following command at the command prompt:

    ```cmd
    gulp serve
    ```

1. Open a browser and enter the URL:

    ```
    http://localhost:3007/<yourDefaultAppNameTab>/
    ```

    :::image type="content" source="~/assets/images/tab-images/homePage.png" alt-text="Default Tab":::

1. To view the tab, navigate to:

    ```
    http://localhost:3007/<yourDefaultAppNameTab>/personal.html
    ```

    :::image type="content" source="~/assets/images/tab-images/personalTab.PNG" alt-text="Default html Tab":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Build+and+run+your+application&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Fbranch%3Dpr-en-us-12027%26tabs%3Dvs%26pivots%3Dnode-java-script%23build-and-run-your-application&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

### Establish a secure tunnel to your tab

Exit the local server if necessary, then run the following command to create a secure tunnel to the tab:

```cmd
gulp ngrok-serve
```

Once the tab is uploaded to Teams via **ngrok** and saved, it appears in Teams until the tunnel session ends.

### Upload your application to Teams

1. In Teams, select **Apps**  :::image type="content" source="~/assets/images/tab-images/store.png" alt-text="Microsoft Teams Store":::.
1. Choose **Manage your apps** > **Upload an app** > **Upload a custom app**.
1. Browse to the **./package** folder in the project directory, select the zip file, and click **Open**.

    :::image type="content" source="~/assets/images/tab-images/addingpersonaltab.png" alt-text="Adding your tab":::

1. Click **Add** in the dialog. The tab app uploads to Teams.

    :::image type="content" source="~/assets/images/tab-images/personaltabuploaded.png" alt-text="Personal tab uploaded":::

1. In the Teams left pane, click the ellipses (&#x25CF;&#x25CF;&#x25CF;) and select the uploaded app to view the tab.

Developers have now successfully created and added a tab in Teams. Developers can also [reorder](#reorder-tabs) tabs in Teams.

::: zone-end

::: zone pivot="razor-csharp"

## Create a tab with ASP.NET Core

This section explains how to create a tab using an ASP.NET Core project.

1. At the command prompt, create a new directory for the tab project.

1. Clone the sample repository into the new directory using the command below or download the [source code](https://github.com/OfficeDev/Microsoft-Teams-Samples) and extract the files:

    ```cmd
    git clone https://github.com/OfficeDev/Microsoft-Teams-Samples.git
    ```

The following steps detail how to create a tab:

1. [Generate your application with a tab](#generate-your-application-with-a-tab-1)
1. [Update and run your application](#update-and-run-your-application)
1. [Establish a secure tunnel to your tab](#establish-a-secure-tunnel-to-your-tab-1)
1. [Update your app package with Developer Portal](#update-your-app-package-with-developer-portal)
1. [Preview your app in Teams](#preview-your-app-in-teams)

### Generate your application with a tab

1. Open Visual Studio and choose **Open a project or solution**.

1. Navigate to **Microsoft-Teams-Samples** > **samples** > **tab-personal** > **razor-csharp** folder and open **PersonalTab.sln**.

1. In Visual Studio, press **F5** or select **Start Debugging** from the **Debug** menu to verify that the application loads properly. In a browser, access the following URLs:

    * `http://localhost:3978/`
    * `http://localhost:3978/personalTab`
    * `http://localhost:3978/privacy`
    * `http://localhost:3978/tou`

<details>
<summary><b>Review the source code</b></summary>

#### Startup.cs

The project starts from an ASP.NET Core 3.1 empty template with the **Advanced - Configure for HTTPS** option selected. The MVC services register in the `ConfigureServices()` method using dependency injection. The template does not serve static content by default, so the static files middleware is added in the `Configure()` method as follows:

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

In ASP.NET Core, the web root folder stores static files.

#### Index.cshtml

Files named **Index** serve as the default home page when a browser URL points to the site root.

#### AppManifest folder

This folder contains the required app package files:

* A full color icon (192 x 192 pixels).
* A transparent outline icon (32 x 32 pixels).
* A `manifest.json` file detailing app attributes.

These files must be zipped into an app package for uploading to Teams. Teams loads the `contentUrl` specified in the manifest and embeds it in an <iframe>.

#### .csproj

In Visual Studio Solution Explorer, right-click the project and select **Edit Project File**. The code at the file end creates and updates a zip folder when the application builds:

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

1. In Visual Studio Solution Explorer, navigate to the **Pages** > **Shared** folder and open **_Layout.cshtml**. Add the following lines within the `<head>` tags:

    ```HTML
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
    <script src="https://res.cdn.office.net/teams-js/2.0.0/js/MicrosoftTeams.min.js" integrity="sha384-QtTBFeFlfRDZBfwHJHYQp7MdLJ2C3sfAEB1Qpy+YblvjavBye+q87TELpTnvlXw4" crossorigin="anonymous"></script>
    ```

1. Open **PersonalTab.cshtml** from the **Pages** folder and add `microsoftTeams.app.initialize()` within the `<script>` tags.

1. Save all changes.

1. Press **F5** or select **Start Debugging** from the **Debug** menu in Visual Studio.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+and+run+your+application&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23update-and-run-your-application&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Establish a secure tunnel to your tab

In the project root, run the following command to set up a secure tunnel:

```cmd
ngrok http 3978 --host-header=localhost
```

### Update your app package with Developer Portal

1. Visit [**Developer portal**](https://dev.teams.microsoft.com/home).

1. Under **Apps**, select **Import app**.

1. The app package is named `tab.zip` and is located at:

    ```
    /bin/Debug/netcoreapp3.1/tab.zip
    ```

1. Select `tab.zip` and open it in Developer Portal.

1. A default **App ID** populates under **Basic information**.

1. Enter a Short and Long description in **Descriptions**.

1. Under **Developer Information**, fill in the required details. For **Website (must be a valid HTTPS URL)**, supply the ngrok HTTPS URL.

1. In **App URLs**, update the Privacy policy to `https://<yourngrokurl>/privacy` and Terms of use to `https://<yourngrokurl>/tou`, then click **Save**.

1. Under **App features**, select **Personal app** > **Create your first personal app tab**. Enter the tab name and update the **Content URL** with `https://<yourngrokurl>/personalTab`. Leave the Website URL blank, select **Context** as personalTab from the dropdown, and confirm.

1. Click **Save**.

1. In the Domains section, include the ngrok URL without the HTTPS prefix (i.e. `<yourngrokurl>.ngrok.io`).

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+your+app+package+with+Developer+Portal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23update-your-app-package-with-developer-portal&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Preview your app in Teams

1. In Developer Portal, select **Preview in Teams**. Developer Portal confirms that the custom app has uploaded successfully, and the app's **Add** page appears in Teams.

1. Click **Add** to load the tab in Teams. The tab becomes available in Teams.

    :::image type="content" source="~/assets/images/tab-images/personaltabaspnetuploaded.png" alt-text="Default Tab":::

Developers have now built and deployed a Teams tab with ASP.NET Core.

::: zone-end

::: zone pivot="mvc-csharp"

## Create a tab with ASP.NET Core MVC

This section explains how to build a tab using an ASP.NET Core MVC project.

1. At the command prompt, create a new directory for the tab project.

1. Clone the sample repository into the new directory using the command below or download the [source code](https://github.com/OfficeDev/Microsoft-Teams-Samples) and extract the files:

    ```cmd
    git clone https://github.com/OfficeDev/Microsoft-Teams-Samples.git
    ```

The following steps explain how to create a tab:

1. [Generate your application with a tab](#generate-your-application-with-a-tab)
1. [Update and run application](#update-and-run-your-application-1)
1. [Establish a secure tunnel to your tab](#establish-a-secure-tunnel-to-your-tab-2)
1. [Update your app package with Developer Portal](#update-your-app-package-with-developer-portal-1)
1. [Preview your app in Teams](#preview-your-app-in-teams-1)

### Generate your application with a tab

1. Open Visual Studio and choose **Open a project or solution**.

1. Navigate to **Microsoft-Teams-Samples** > **samples** > **tab-personal** > **mvc-csharp** folder and open **PersonalTabMVC.sln**.

1. In Visual Studio, press **F5** or select **Start Debugging** from the **Debug** menu to ensure the application loads properly. Access the following URLs in a browser:

    * `http://localhost:3978`
    * `http://localhost:3978/personalTab`
    * `http://localhost:3978/privacy`
    * `http://localhost:3978/tou`

<details>
<summary><b>Review the source code</b></summary>

#### Startup.cs

This ASP.NET Core project starts from an empty template with HTTPS configured. The MVC services register in the `ConfigureServices()` method by dependency injection. Static files are made available by adding middleware in the `Configure()` method:

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

ASP.NET Core uses the **wwwroot** folder for static files.

#### AppManifest folder

This folder contains the required packaging files for the app:

* A full color icon (192 x 192 pixels).
* A transparent outline icon (32 x 32 pixels).
* A `manifest.json` file with app metadata.

These files are zipped for uploading the tab to Teams. Teams loads the `contentUrl` from the manifest within an iFrame.

#### .csproj

Within Visual Studio Solution Explorer, right-click the project and select **Edit Project File**. The following code creates and updates the zip package during the build:

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

The file **PersonalTab.cs** contains a message object and methods that are called from **PersonalTabController** when a button is clicked in the **PersonalTab** view.

#### Views

Views manage the user interface:

* Home: ASP.NET Core uses files named **Index** as the default home page.
* Shared: The partial view **_Layout.cshtml** provides the overall page structure and references the Teams Library.

#### Controllers

Controllers use the `ViewBag` to pass values dynamically to the Views.

</details>

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Generate+your+application+with+a+tab&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23generate-your-application-with-a-tab&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Update and run your application

1. In Visual Studio Solution Explorer, navigate to **Views** > **Shared** folder and open **_Layout.cshtml**. Add the following lines within the `<head>` tags:

    ```HTML
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
    <script src="https://res.cdn.office.net/teams-js/2.0.0/js/MicrosoftTeams.min.js" integrity="sha384-QtTBFeFlfRDZBfwHJHYQp7MdLJ2C3sfAEB1Qpy+YblvjavBye+q87TELpTnvlXw4" crossorigin="anonymous"></script>
    ```

1. Open **PersonalTab.cshtml** from the **Views** > **PersonalTab** folder and insert `microsoftTeams.app.initialize()` inside the `<script>` tags.

1. Save all changes.

1. Press **F5** or select **Start Debugging** from the **Debug** menu to launch the app.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+and+run+your+application&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23update-and-run-your-application&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Establish a secure tunnel to your tab

In the project root, run the command below to create a secure tunnel:

```cmd
ngrok http 3978 --host-header=localhost
```

### Update your app package with Developer Portal

1. Visit [**Developer portal**](https://dev.teams.microsoft.com/home).

1. Under **Apps**, select **Import app**.

1. The app package file is **tab.zip** and is located at:

    ```
    /bin/Debug/netcoreapp3.1/tab.zip
    ```

1. Select **tab.zip** and open it in Developer Portal.

1. A default **App ID** appears in the **Basic information** section.

1. Enter Short and Long descriptions under **Descriptions**.

1. Under **Developer information**, fill in the required details. For the **Website (must be a valid HTTPS URL)** field, enter the ngrok HTTPS URL.

1. In **App URLs**, update the Privacy policy to `https://<yourngrokurl>/privacy` and Terms of use to `https://<yourngrokurl>/tou`, then click **Save**.

1. Under **App features**, select **Personal app** > **Create your first personal app tab**. Enter the tab name and update the **Content URL** with `https://<yourngrokurl>/personalTab`. Leave the Website URL blank, select **Context** as personalTab from the dropdown, and confirm.

1. Click **Save**.

1. In the Domains section, include the ngrok URL without the HTTPS prefix (i.e. `<yourngrokurl>.ngrok.io`).

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+your+app+package+with+Developer+Portal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dmvc-csharp%23update-your-app-package-with-developer-portal-1&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Preview your app in Teams

1. In Developer Portal, select **Preview in Teams**. Developer Portal confirms that the custom app uploaded successfully. The **Add** page appears.

1. Click **Add** to load the app in Teams.

1. Choose **Open** to launch the tab in personal scope.

    :::image type="content" source="~/assets/images/tab-images/personaltabaspnetmvccoreuploaded.png" alt-text="Personal tab":::
  
Developers have now built and deployed a Teams tab with ASP.NET Core MVC. They can also [reorder](#reorder-tabs) tabs in Teams.

::: zone-end

::: zone pivot="blazor-app"

Blazor lets developers build interactive web UIs using C# instead of JavaScript. This method shows how to create a tab app and a bot app with Blazor using the latest version of Visual Studio.

:::image type="content" source="~/assets/images/toolkit-v2/blazor/your-blazor-helloworld-app.png" alt-text="Screenshot of the Blazor app displaying the tab, Bot, and Message Extension output after the step-by-step Blazor guide is successfully completed.":::

> [!NOTE]
> Agents Toolkit does not support the message extension capability.

Below is a list of essential tools for building and deploying the app:

| &nbsp;    | Install   | For using... |
| --- | --- | --- |
| **Required** | &nbsp; | &nbsp; |
| &nbsp; | [Visual Studio version 17.2.0 preview 2.1](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=enterprise&ch=pre&rel=17)|  Select Visual Studio Enterprise 2022 Preview (version 17.2.0 preview 2.1). |
| &nbsp; | [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams facilitates collaboration through chat, meetings, and calls in one place. |
| &nbsp; | [Microsoft Edge](https://www.microsoft.com/edge/) (recommended) or [Google Chrome](https://www.google.com/chrome/) | Use a browser with developer tools. |

## Prepare development environment

After installing the required tools, set up the development environment for a smooth experience.

### Install Agents Toolkit

Agents Toolkit simplifies the development process. It provisions and deploys cloud resources, publishes the app to Teams Store, and simplifies many tasks. Developers can use Agents Toolkit with Visual Studio or as a Command Line Interface.

# [Latest version of the Visual Studio](#tab/vs)

Developers can use the latest Visual Studio to develop Teams apps with Blazor Server in .NET.

To install the Agents Toolkit extension:

1. Download the latest Visual Studio.

1. Open the Visual Studio installer file from the download folder.

1. In Visual Studio Installer, click **Continue** to start the installation.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor/visual-studio-installer.PNG" alt-text="Screenshot of Visual Studio Installer with continue options highlighted in red.":::

1. Under **Workloads**, select **ASP.NET and web development**.

1. Under **Installation details**, select **Microsoft 365 Agents Toolkit**.

1. Click **Install**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/vs.install.PNG" alt-text="Screenshot of Visual Studio Enterprise Preview with Asp.NET, web development, and Microsoft Teams development tools options highlighted in red.":::

Developers complete the Visual Studio installation in a few minutes.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Install+Microsoft+Agents+Toolkit+-+Latest+version+of+the+Visual+Studio&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23install-microsoft-agents-toolkit&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md%23latest-version-of-the-visual-studio&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

# [Command line](#tab/cli)

To install Microsoft 365 Agents Toolkit CLI (previously known as TeamsFx CLI), run the following command using npm:

``` bash
npm install -g @microsoft/teamsfx-cli
```

If required by the system configuration, run the command with elevated permissions:

``` bash
sudo npm install -g --unsafe-perm @microsoft/teamsfx-cli
```

Ensure that the npm global cache is added to the PATH. This addition is typically handled by the Node.js installer.

Developers use the CLI with the `atk` command. Verify it by running:

    atk -h

> [!CAUTION]
> To run TeamsFx in PowerShell terminals, developers must enable the remote signed execution policy.

---

## Set up your Teams development tenant

A tenant serves as a container for an organization in Teams, where chats, file sharing, and meetings occur. It is also where the custom app is uploaded and tested. Verify that a tenant setup exists for development.

### Enable custom app upload

After creating the app, developers need to load the app in Teams without distributing it. This process is known as custom app upload. Sign in to a Microsoft 365 account to access this feature.

To verify if a custom app upload is allowed:

1. In the Teams client, click **Apps**.
1. Click **Manage your apps**.
1. Click **Upload an app**. If the **Upload a custom app** option is visible, custom app upload is enabled.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor/upload-custom-app.PNG" alt-text="Screenshot showing the option to upload a custom app in Teams.":::

    > [!NOTE]
    > Contact the Teams administrator if the custom app upload option is missing.

### Create a free Teams developer tenant (optional)

If a Teams developer account is not available, obtain one for free by joining the Microsoft 365 developer program:

1. Visit the [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program).
1. Click **Join Now** and follow the instructions.
1. On the welcome screen, click **Set up E5 subscription**.
1. Create an administrator account. After setup, a screen displays the new subscription.

    :::image type="content" source="../../assets/images/build-your-first-app/dev-program-subscription.PNG" alt-text="Screenshot of Microsoft 365 Developer Program displaying developer subscriptions.":::

1. Sign in to Teams using the new administrator account and verify that the **Upload a custom app** option is available.

## Get a free Azure account

To host the app or access Azure resources, developers must have an Azure subscription. [Create a free account](https://azure.microsoft.com/free/) before starting.

Developers now have all required tools and account configurations to start building the app.

## Create project workspace for your tab app

Begin Teams app development by creating the first app with tab capabilities.

:::image type="content" source="~/assets/images/toolkit-v2/blazor/your-blazor-helloworld-app1.png" alt-text="Screenshot of Blazor app showing the final output of the tab app after following the guide.":::

This tutorial guides developers through creating, running, and deploying a Teams app using .NET/Blazor.

In this page, developers learn:

1. [How to set up a new tab project with Agents Toolkit](#create-your-tab-project)
1. [About the directory structure of the app](#take-a-tour-of-the-source-code-for-teams-tab-app)

## Create your tab project

Use Agents Toolkit to create the first tab project. The toolkit guides developers through configuring the new Teams app project via a series of pages:

1. The **Create a new project** page lets developers select the project type.
1. The **Configure your new project** page accepts project details.
1. The **Create a new Teams application** page lets developers select Teams app capabilities.

**To create the tab project workspace**

1. Open the latest Visual Studio.

1. Select **Create a new project**.

   :::image type="content" source="../../assets/images/toolkit-v2/blazor/vs-select-project.png" alt-text="Screenshot of Visual Studio showing the Create a new project option highlighted in red for Blazor apps.":::

   The **Create a new project** page appears.

1. Set the project type and details:

   1. Search for **Microsoft 365** in the templates dropdown list.  
   1. Select **Microsoft 365 Agents** as the template.
   1. Click **Next**.

      :::image type="content" source="../../assets/images/toolkit-v2/blazor/vs-select-teams-app.png" alt-text="Screenshot of the Create a new project page with the Next option highlighted in red for Blazor app creation." lightbox="../../assets/images/toolkit-v2/blazor/vs-select-teams-app.png":::

      The **Configure your new project** page appears.

1. Configure the new project details:

   1. Enter a suitable project name.

      > [!NOTE]
      > The project name is automatically used as the solution name. The solution name can be changed independently without affecting the project name.

   1. Select the folder where the project workspace will be created.
   1. Optionally, enter a different solution name.
   1. Choose whether to save the project and solution in the same folder. For this tutorial, this option is not required.
   1. Click **Create**.

      :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/configure-new-project.PNG" alt-text="Screenshot of the Configure your new project page with the Create option highlighted in red." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/configure-new-project.PNG":::

      The **Create a new Teams application** page appears.

1. Select the Teams app feature:

   1. Choose **Tab** as the app capability.
   1. Click **Create**.

      :::image type="content" source="../../assets/images/toolkit-v2/first-tab/create-tab.png" alt-text="Screenshot of the Create a new Teams application page with Tab and Create options highlighted in red.":::

   The Teams tab app is generated within seconds.

   :::image type="content" source="../../assets/images/toolkit-v2/blazor/vs-tab-app.png" alt-text="Screenshot of Visual Studio displaying tips for getting started while building the app." lightbox="../../assets/images/toolkit-v2/blazor/vs-tab-app.png":::

   <details>
   <summary>A quick recap of creating a Teams tab app.</summary>
   Watch this short recap that illustrates the process.

   :::image type="content" source="~/assets/videos/blazorapp.gif" alt-text="Graphical representation of the process of creating a Teams tab app.":::
   </details>

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Create+your+tab+project&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23create-your-tab-project&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Take a tour of the source code for Teams tab app

After project creation, developers find the components needed to build a basic tab app. The **Solution Explorer** pane in Visual Studio displays the project directory structure.

:::image type="content" source="../../assets/images/toolkit-v2/blazor/blazor-app-solution-explorer_1.png" alt-text="Screenshot of Solution Explorer displaying components for a basic personal app.":::

Agents Toolkit scaffolds the project based on the selected capabilities. Key elements include:

| Folder name | Contents |
| --- | --- |
| App icons | Stores app icons as PNG files in `color.png` and `outline.png`. |
| `manifest.json` | Contains the app manifest for publishing via the Developer Portal for Teams (located in `Properties/manifest.json`). |
| `BackendController.cs` | Provides a backend controller (found in `Controllers/BackendController.cs`) to assist with authentication. |
| `Pages/Tab.razor` | Contains the main tab content. |
| `TeamsFx.cs` and `JS/src/index.js` | Enable initialization and communication with the Teams host. |

Developers can add backend functionality by creating additional ASP.NET Core controllers.

## Build and run your first Teams tab app

After setting up the project workspace with Agents Toolkit, build the tab project as follows:

1. In Visual Studio, select **Project** > **Microsoft 365 Agents Toolkit** > **Select Microsoft 365 Account**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/configure-msteamsapp_1.png" alt-text="Screenshot of Visual Studio showing options under Project, Agents Toolkit, and Prepare Teams App Dependencies." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/configure-msteamsapp_1.png":::

1. Choose your Microsoft 365 account or click **Add an account** to sign in.

    :::image type="content" source="../../assets/images/toolkit-v2/m365-account_1.PNG" alt-text="Screenshot of Microsoft 365 Account sign-in with the Continue option highlighted in red.":::

1. Press **Debug** > **Start Debugging** or click **F5** to run the app in debug mode.
    <br>
    <details>
    <summary>Learn what occurs when running the app locally in the debugger.</summary>

    Developers trigger Agents Toolkit to:

    1. Register the application with Microsoft Entra ID.
    1. Register the application for Teams upload.
    1. Start the backend locally.
    1. Launch the front-end locally.
    1. Launch Teams in a web browser with instructions to upload a custom app (via the URL registered in the manifest).

    </details>

1. Install the self-signed SSL certificate for local debugging if prompted.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/ssl-prompt.png" alt-text="Screenshot of a security warning with the Yes option highlighted.":::

    Teams opens in a web browser.

1. Click **Add**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-app.png" alt-text="Screenshot of the personal tab app dialog with the Add option highlighted.":::

1. Choose **Open** to launch the app in personal scope.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-app-scope.png" alt-text="Screenshot of the scope selection dialog with the Open option highlighted.":::

Congratulations! The first tab app runs locally.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/app-local.png" alt-text="Screenshot confirming that the first tab app runs locally.":::

1. Navigate through the page to review user details.

1. Click **Authorize** to allow the app to retrieve user details via Microsoft Graph.

    The app requests permission to display user details.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/authorize-user-info.png" alt-text="Screenshot showing the authorize option in the personal tab.":::

1. Click **Accept** to grant the app access to user details.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/ms-graph-permission_1.png" alt-text="Screenshot of the permissions dialog displaying app details.":::

    The user’s photograph and details appear within the **Personal Tab**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor/tab-user-info.png" alt-text="Screenshot of the personal tab displaying user information.":::

Developers can debug as with any other web application. The app also supports hot reloading when files change.

1. Stop debugging in Visual Studio.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Build+and+run+your+first+Teams+tab+app&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23build-and-run-your-first-teams-tab-app&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

## Preview your first Teams tab app

After building and running the app locally, developers can deploy the app to Azure and preview it in Teams by following these steps:

1. [Provision the tab app in the cloud](#to-provision-your-tab-app-in-the-cloud)
1. [Deploy the tab app to the cloud](#to-deploy-your-tab-app-to-cloud)
1. [Preview the tab app in Teams](#to-preview-your-tab-app-in-teams)

The next section explains how to deploy the first tab app using Agents Toolkit.

### **To provision your tab app in the cloud**

1. In Visual Studio, select **Project** > **Microsoft 365 Agents Toolkit** > **Provision in the Cloud**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-provision_1.png" alt-text="Screenshot of Visual Studio showing the Provision in the Cloud option highlighted." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-provision_1.png":::

1. In the **Provision** dialog, enter the subscription and resource group details:
   1. Choose a subscription from **Subscription name**.
   1. Select or create a resource group from **Resource group**.
   1. If creating a new resource group, select a **Region**.
   1. Click **Provision**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/select-subscription.PNG" alt-text="Screenshot of the Provision dialog with New and Provision options highlighted in red." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/select-subscription.PNG":::

   A provision warning displays.

1. Click **Provision**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/provision-warning.PNG" alt-text="Screenshot of Agents Toolkit showing a provision warning.":::

   The resource group provisions in the cloud within a few minutes.

1. After completion, click **OK**.

    :::image type="content" source="../../assets/images/toolkit-v2/provision-complete.png" alt-text="Screenshot of Agents Toolkit showing the OK option.":::

1. Click **View Provisioned Resources** to open the Azure portal.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/view-resource.PNG" alt-text="Screenshot of Agents Toolkit with View Provisioned Resources highlighted.":::

1. Sign in to the Azure portal if prompted. The provisioned resource group appears.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/app-dev-rg-azure.PNG" alt-text="Screenshot of the provisioned resource group (app-dev-rg) in the Azure portal.":::

Resources have now been provisioned in the Azure portal.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+To+provision+your+tab+app+in+the+cloud&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23to-provision-your-tab-app-in-the-cloud&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

#### **To deploy your tab app to cloud**

1. In Visual Studio, select **Project** > **Microsoft 365 Agents Toolkit** > **Deploy to the Cloud**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-deploytocloud_1.png" alt-text="Screenshot of Visual Studio showing the Deploy to the Cloud option highlighted." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-deploytocloud_1.png":::

1. Click **OK**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/deploy-success.PNG" alt-text="Screenshot of Agents Toolkit indicating successful deployment by clicking OK.":::

The tab app is now deployed to the cloud.

#### **To preview your tab app in Teams**

1. In Visual Studio, select **Project** > **Microsoft 365 Agents Toolkit** > **Preview in Teams**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-preview_1.png" alt-text="Screenshot of Visual Studio showing the Preview in Teams option highlighted." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-preview_1.png":::

    Teams launch in a web browser.

1. Click **Add**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-app.png" alt-text="Screenshot of the personal tab app dialog with the Add option highlighted.":::

1. Click **Open** to load the app in personal scope.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-app-scope.png" alt-text="Screenshot of the scope selection dialog with the Open option highlighted.":::

Congratulations! The first tab app runs in the Azure environment.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-tab-app-azure.PNG" alt-text="Screenshot of the personal tab displayed in Teams on Azure.":::

1. Navigate through the page to review user details.

1. Click **Authorize** to allow the app to retrieve user details via Microsoft Graph.

    The app requests permission to access user details.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/authorize-user-info.png" alt-text="Screenshot showing the authorize option in the personal tab of the app in Teams on Azure.":::

1. Click **Accept** to grant the required access.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/ms-graph-permission_1.png" alt-text="Screenshot of the permissions dialog displaying the app information.":::

    The user’s photograph and details appear within the **Personal Tab**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/azure-user-info.png" alt-text="Screenshot showing the personal tab with user information after deployment on Azure.":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+To+preview+your+tab+app+in+Teams&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23to-preview-your-tab-app-in-teams&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

## Congratulations

Developers have completed the tutorial to build a tab app with Blazor.

::: zone-end

## Reorder tabs

Starting with manifest version 1.7, developers can rearrange tabs in a personal app. For instance, the **bot chat** tab, which defaults to the first position, can be moved elsewhere in the header. Two reserved tab entityId keywords are available: **conversations** and **about**.

If a bot with a **personal** scope exists, it appears first by default. To reposition it, add a static tab object using the reserved keyword **conversations**. The **conversations** tab appears on web and desktop based on its position in the `staticTabs` array.

``` JSON
{
   "staticTabs":[
      {
         // other tab configuration
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
> On mobile, tabs reorder exactly as defined in the `staticTabs` array.

This property also lets developers set the app’s default landing capability. Developers can configure the app to open as a tab or as a bot. For details, see [configure default landing capability](../../concepts/deploy-and-publish/add-default-install-scope.md#configure-your-apps-default-landing-capability).

## Extend static tabs to group chat, channels, and meetings

> [!NOTE]
> To extend static tabs to group chats, channels, and meetings, use app manifest v1.16 or later.

Developers can extend static tabs to other contexts beyond personal scope. Instead of pinning generic app content, developers can create tabs that function more like standalone apps (for example, pinning a dedicated YouTube app tab).

To extend static tabs to additional contexts, update the [app manifest](~/resources/schema/manifest-schema.md#statictabs) by adding the `scopes` and `context` parameters within the `staticTabs` property. When multiple static tabs are declared and the app is added in the channel scope, only the first listed tab appears.

The following manifest snippet illustrates a static tab that functions in all Teams scopes and contexts:

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

If no context is specified, Teams uses the default contexts:

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

Developers can build personal scope apps that integrate with the Public Switched Telephone Network (PSTN) and Teams-to-Teams calls. By setting the correct scope and context (tab type, static scope, personal context, meeting side panels), developers empower apps to leverage calling features.

For more information, see [build tabs for calling](../../apps-in-teams-meetings/build-tabs-for-calling.md).

## Customizing your static tab in chats or meetings

Developers can customize the static tab experience in chats, channels, or meetings by using the `setConfig` APIs. This API updates the `contentUrl` and `websiteUrl` for the tab. For example:

```json
pages.config.setConfig({ 
  "contentUrl": "https://wwww.contoso.com/teamsapp/thread/" + context.threadId,
   ...}
```

Only `contentUrl` and `websiteUrl` properties can be updated using `setConfig`; other properties remain unchanged.

## Offline tabs

> [!NOTE]
> Personal tabs with offline functionality are supported only on Teams for Android devices.

Developers can build a personal tab that functions without an internet connection. An offline tab benefits users in limited connectivity scenarios (such as field agents or frontline workers). In an offline tab, users can:

* Record data through forms that may include images and videos.
* View details of previously submitted requests, incidents, or forms.

When the device reconnects to the internet, the tab synchronizes the locally stored data with Azure Blob storage. This ensures that offline changes update centralized storage and maintain data consistency.

:::image type="content" source="../../assets/images/tabs/tab-support-offline-mobile.gif" alt-text="Graphic illustrating the functionality of an offline tab in the Teams mobile client.":::

### Build an offline tab

Before building an offline tab, ensure that developers meet all the [prerequisites](~/tabs/how-to/tab-requirements.md) for building a personal tab.

1. [Create an Azure Blob storage](/azure/storage/blobs/storage-quickstart-blobs-portal). Note the account and container names for later configuration.

1. Clone the [Microsoft Teams Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/) repository.

1. In the repository, navigate to **samples** > **tab-support-offline** > **nodejs** and open the folder in Visual Studio Code.

   :::image type="content" source="../../assets/images/tabs/open-tab-sample-vsc.png" alt-text="Screenshot demonstrating how to open the code sample in Visual Studio Code." lightbox="../../assets/images/tabs/open-tab-sample-vsc.png":::

1. Under **EXPLORER**, navigate to **server** > **blobStoreOperations.js** and replace `{{ account-Name }}` and `{{ container-Name }}` with the Azure Blob storage account and container values.

1. Press **F5** to debug the app. When the build completes, Teams opens in a browser window.

1. Sign in with the Microsoft 365 account if prompted.

1. Click **Add** when the prompt appears to add the tab app to Teams.

   :::image type="content" source="../../assets/images/tabs/add-offline-tab-teams.png" alt-text="Screenshot showing the process to add the offline tab app to Teams.":::

Congratulations! Developers have successfully created a Teams tab with offline functionality.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Build+an+offline+tab&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Fbranch%3Dpr-en-us-12027%26tabs%3Dvs%26pivots%3Dnode-java-script%23build-an-offline-tab&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

## Best practices for tabs in Teams mobile

For tips on optimizing tab performance on Teams for Android and iOS, see [best practices for Teams mobile](../../resources/teams-mobile-best-practices.md).

## Code sample

| Sample name         | Description                                                                                                                             | .NET                                                                                           | Node.js                                                                                                                        | Manifest                                                                                                   |
|---------------------|-----------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------|
| Tab personal        | This sample demonstrates building a custom personal tab for Microsoft Teams using ASP.NET Core MVC to enhance user interaction.         | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal/mvc-csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal-quickstart/js) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal/mvc-csharp/demo-manifest/tab-personal.zip) |
| Offline personal tab| This sample app demonstrates a CRUD application that works offline in Microsoft Teams, enabling data management without internet connectivity and automatic synchronization with blob storage once reconnected. | NA                                                                                             | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-support-offline/nodejs)   | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/tab-support-offline/nodejs/demo-manifest/tab-support-offline.zip) |

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