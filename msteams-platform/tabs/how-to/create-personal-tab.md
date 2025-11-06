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

Tabs in chats, channels, or meetings behave like apps because developers can pin only one tab per app to the left pane for quick access.

> [!IMPORTANT]
>
> Microsoft introduces the [Microsoft 365 Agents Toolkit](../../toolkit/agents-toolkit-fundamentals.md) (formerly known as Teams Toolkit) extension within Visual Studio Code. This release includes many new features for app development. Developers are recommended to use Agents Toolkit v5 for building Teams apps.

Developers ensure that all the [prerequisites](~/tabs/how-to/tab-requirements.md) are met to build the tab.

[!INCLUDE [sdk-include](~/includes/sdk-include.md)]

::: zone pivot="node-java-script"

## Create a tab with JavaScript

Follow the detailed guide to [build your tab app using JavaScript](../../sbs-gs-javascript.yml).

<!--
1. At the command prompt, install the [Yeoman](https://yeoman.io/) and [gulp-cli](https://www.npmjs.com/package/gulp-cli) packages by entering the following command after installing Node.js:

    ```cmd
    npm install yo gulp-cli --global
    ```

1. At the command prompt, install the Microsoft Teams app generator by entering:

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

1. Enter the following command in the directory to start the Microsoft Teams app generator:

    ```cmd
    yo teams
    ```

1. Provide values to a series of questions prompted by the generator to update your `manifest.json`.

    :::image type="content" source="~/assets/images/tab-images/teamsTabScreenshot.PNG" alt-text="Teams generator":::

    <details>
    <summary><b>Series of questions to update your manifest.json file</b></summary>

    * **What is your solution name?**

      The solution name is the project name. Accept the suggested name by pressing **Enter**.

    * **Where do you want to place the files?**

      Since developers are already in the project directory, press **Enter**.

    * **Title of your Microsoft Teams app project?**

      The title appears in the app manifest and description; enter a title or press **Enter** for the default.

    * **Your (company) name? (max 32 characters)**

      Enter your company name or press **Enter** to accept the default. This value appears in the manifest.

    * **Which manifest version would you like to use?**

      Select the default schema.

    * **Quick scaffolding? (Y/n)**

      The default is yes. Press **n** if developers wish to enter a Microsoft Partner ID.

    * **Enter your Microsoft Partner Id, if you've one? (Leave blank to skip)**

      This field is optional and used only if in the [Microsoft Cloud Partner Program](https://partner.microsoft.com).

    * **What do you want to add to your project?**

      Select **( * ) A Tab**.

    * **The URL where you will host this solution?**

      The generator suggests an Azure website URL by default. For local testing, a valid URL is not necessary.

    * **Would you like to show a loading indicator when your app/tab loads?**

      Choose not to include a loading indicator. The default is no; enter **n**.

    * **Would you like personal apps to be rendered without a tab header-bar?**

      Choose not to include this feature. Default is no; enter **n**.

    * **Would you like to include Test framework and initial tests? (y/N)**

      Choose not to include a test framework. The default is no; enter **n**.

    * **Would you like to include ESLint support? (y/N)**

      Choose not to add ESLint support. The default is no; enter **n**.

    * **Would you like to use Azure Applications Insights for telemetry? (y/N)**

      Choose not to add [Azure Application Insights](/azure/azure-monitor/app/app-insights-overview). The default is no; enter **n**.

    * **Default Tab Name (max 16 characters)?**

      Provide a tab name. This name is later used as a file or URL path component.

    * **What kind of Tab would you like to create?**

      Use the arrow keys to select **Personal (static)**.

    * **Do you require Microsoft Entra Single-Sign-On support for the tab?**

      Choose not to include Microsoft Entra Single-Sign-On support. The default is yes; enter **n**.
    > [!NOTE]
    > In a tab, the home page appears only after the user selects the back button (or navigates away and then returns). The tab does not retain previous state by design.
    </details>

-->

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+Issue%5D+Create+a+tab+with+JavaScript&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dnode-java-script%23create-a-tab-with-javascript&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

### Add a content page to the tab

Developers create a content page and update the tab application files as follows:

1. Create a new **personal.html** file in Visual Studio Code with the markup:

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

1. Save **personal.html** in the application's **public** folder as follows:

    ```
    ./src/public/<yourDefaultTabNameTab>/personal.html
    ```

1. Open `manifest.json` located at:

    ```
     ./src/manifest/manifest.json
    ```

1. In the empty `staticTabs` array (`"staticTabs":[]`), add the JSON object:

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
    > The value **yourDefaultTabNameTab** corresponds to the value developers entered for **Default Tab Name** with the word **Tab** appended.
    >
    > For example: If **DefaultTabName** is **MyTab**, then the folder becomes **/MyTabTab/**

1. Update the **contentUrl** to reflect the actual tab name.

1. Save the modified `manifest.json`.

1. Open **Tab.ts** in Visual Studio Code from the path:

    ```bash
    ./src/server/<yourDefaultTabNameTab>/<yourDefaultTabNameTab>.ts
    ```

1. Add the following to the list of iFrame decorators:

    ```typescript
     @PreventIframe("/<yourDefaultTabName Tab>/personal.html")
    ```

1. Save the file. The tab code is now complete.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Add+a+content+page+to+the+tab&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Fbranch%3Dpr-en-us-12027%26tabs%3Dvs%26pivots%3Dnode-java-script%23add-a-content-page-to-the-tab&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

### Create your app package

Developers must create an app package to run the application in Teams. The app package is generated by a gulp task that validates the `manifest.json` and outputs a zip folder in the `./package` directory. At the command prompt, run:

    gulp manifest

### Build and run your application

#### Build your application

At the command prompt, transpile the solution into the **./dist** folder by running:

```cmd
gulp build
```

#### Run your application

1. At the command prompt, start a local web server by executing:

    ```cmd
    gulp serve
    ```

1. Open `http://localhost:3007/<yourDefaultAppNameTab>/` in the browser to view the application's home page.

    :::image type="content" source="~/assets/images/tab-images/homePage.png" alt-text="Default Tab":::

1. Visit `http://localhost:3007/<yourDefaultAppNameTab>/personal.html` to view the tab.

    :::image type="content" source="~/assets/images/tab-images/personalTab.PNG" alt-text="Default html Tab":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Build+and+run+your+application&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Fbranch%3Dpr-en-us-12027%26tabs%3Dvs%26pivots%3Dnode-java-script%23build-and-run-your-application&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

### Establish a secure tunnel to your tab

Exit the local server if necessary and run the following command to create a secure tunnel via ngrok:

```cmd
gulp ngrok-serve
```

After Teams uploads the tab via **ngrok** and the changes are saved, developers can view the tab in Teams until the tunnel session ends.

### Upload your application to Teams

1. Open Teams and select **Apps** &nbsp;:::image type="content" source="~/assets/images/tab-images/store.png" alt-text="Microsoft Teams Store":::.
1. Choose **Manage your apps** > **Upload an app** > **Upload a custom app**.
1. Browse to the **./package** folder in your project directory, select the zip file, and choose **Open**.

    :::image type="content" source="~/assets/images/tab-images/addingpersonaltab.png" alt-text="Adding your tab":::

1. In the dialog, select **Add** to upload the tab to Teams.

    :::image type="content" source="~/assets/images/tab-images/personaltabuploaded.png" alt-text="Personal tab uploaded":::

1. In the Teams left pane, click ellipses &#x25CF;&#x25CF;&#x25CF; and then select the uploaded app to view the tab.

   The tab is successfully created and added in Teams. Developers can also [reorder tabs](#reorder-tabs) in Teams.

::: zone-end

::: zone pivot="razor-csharp"

## Create a tab with ASP.NET Core

1. At the command prompt, create a new directory for the tab project.

1. Clone the sample repository into the directory using:

    ```cmd
    git clone https://github.com/OfficeDev/Microsoft-Teams-Samples.git
    ```

Developers follow these steps to create a tab:

1. [Generate your application with a tab](#generate-your-application-with-a-tab-1)
1. [Update and run your application](#update-and-run-your-application)
1. [Establish a secure tunnel to your tab](#establish-a-secure-tunnel-to-your-tab-1)
1. [Update your app package with Developer Portal](#update-your-app-package-with-developer-portal)
1. [Preview your app in Teams](#preview-your-app-in-teams)

### Generate your application with a tab

1. Open Visual Studio and select **Open a project or solution**.

1. Navigate to **Microsoft-Teams-Samples** > **samples** > **tab-personal** > **razor-csharp** folder and open **PersonalTab.sln**.

1. In Visual Studio, press **F5** or select **Start Debugging** from the **Debug** menu to verify that the application loads properly. Then, access the following URLs in the browser:

    * `<http://localhost:3978/>`
    * `<http://localhost:3978/personalTab>`
    * `<http://localhost:3978/privacy>`
    * `<http://localhost:3978/tou>`

<details>
<summary><b>Review the source code</b></summary>

#### Startup.cs

This project originates from an ASP.NET Core 3.1 empty web application template with the **Advanced - Configure for HTTPS** option selected. The `ConfigureServices()` method registers MVC services, and since the empty template does not serve static content by default, the middleware for static files is added in the `Configure()` method as follows:

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

ASP.NET Core uses the web root folder for accessing static files.

#### Index.cshtml

ASP.NET Core recognizes files named **Index** as the home page. When developers access the root URL, **Index.cshtml** displays as the homepage.

#### AppManifest folder

This folder contains necessary files for the app package:

* A full color icon (192 x 192 pixels).
* A transparent outline icon (32 x 32 pixels).
* A `manifest.json` file that defines the app attributes.

These files must be archived into a zip file for uploading the tab to Teams. Teams loads the `contentUrl` specified in the manifest, embeds it in an <iframe>, and displays it in the tab.

#### .csproj

In Visual Studio Solution Explorer, right-click the project and choose **Edit Project File**. The code below, found at the end of the file, creates and updates the zip folder after the build:

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

1. In Visual Studio Solution Explorer, navigate to **Pages** > **Shared** and open **_Layout.cshtml**. Add these scripts inside the `<head>` tag:

    ```HTML
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
    <script src="https://res.cdn.office.net/teams-js/2.0.0/js/MicrosoftTeams.min.js" integrity="sha384-QtTBFeFlfRDZBfwHJHYQp7MdLJ2C3sfAEB1Qpy+YblvjavBye+q87TELpTnvlXw4" crossorigin="anonymous"></script>
    ```

1. Open **PersonalTab.cshtml** from the **Pages** folder and include `microsoftTeams.app.initialize()` inside the `<script>` tags.

1. Save all changes.

1. Press **F5** or select **Start Debugging** under **Debug** in Visual Studio.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+and+run+your+application&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23update-and-run-your-application&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)
>
### Establish a secure tunnel to your tab

Run the following command at the project root to create a secure tunnel:

```cmd
ngrok http 3978 --host-header=localhost
```

### Update your app package with Developer Portal

1. Go to [**Developer portal**](https://dev.teams.microsoft.com/home).

1. Open **Apps** and select **Import app**.

1. The app package, named `tab.zip`, is located at `/bin/Debug/netcoreapp3.1/tab.zip`.

1. Choose **tab.zip** and open it in the Developer Portal.

1. A default **App ID** populates in the **Basic information** section.

1. Provide the Short and Long descriptions for the app under **Descriptions**.

1. In **Developer Information**, fill in the required details and specify your ngrok HTTPS URL in **Website (must be a valid HTTPS URL)**.

1. Under **App URLs**, set the Privacy policy to `https://<yourngrokurl>/privacy` and Terms of use to `https://<yourngrokurl>/tou`, then click **Save**.

1. In **App features**, navigate to **Personal app** > **Create your first personal app tab**, enter a name, and update the **Content URL** with `https://<yourngrokurl>/personalTab`. Leave the Website URL blank, choose **Context** as personalTab from the dropdown, and click **Confirm**.

1. Click **Save**.

1. In the Domains section, include your ngrok URL without the HTTPS prefix (i.e., `<yourngrokurl>.ngrok.io`).

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+your+app+package+with+Developer+Portal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23update-your-app-package-with-developer-portal&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Preview your app in Teams

1. Select **Preview in Teams** from the Developer Portal toolbar. The portal confirms that the custom app uploads successfully and displays the **Add** page.

1. Click **Add** to load the tab into Teams. The tab becomes available.

    :::image type="content" source="~/assets/images/tab-images/personaltabaspnetuploaded.png" alt-text="Default Tab":::

   The tab is now created and added in Teams. Developers can also [reorder tabs](#reorder-tabs) as needed.

::: zone-end

::: zone pivot="mvc-csharp"

## Create a tab with ASP.NET Core MVC

1. At the command prompt, create a new directory for the tab project.

1. Clone the sample repository into the directory or download the [source code](https://github.com/OfficeDev/Microsoft-Teams-Samples) and extract it:

    ```cmd
    git clone https://github.com/OfficeDev/Microsoft-Teams-Samples.git
    ```

Developers follow these steps to create a tab:

1. [Generate your application with a tab](#generate-your-application-with-a-tab)
1. [Update and run application](#update-and-run-your-application-1)
1. [Establish a secure tunnel to your tab](#establish-a-secure-tunnel-to-your-tab-2)
1. [Update your app package with Developer Portal](#update-your-app-package-with-developer-portal-1)
1. [Preview your app in Teams](#preview-your-app-in-teams-1)

### Generate your application with a tab

1. Open Visual Studio and select **Open a project or solution**.

1. Navigate to **Microsoft-Teams-Samples** > **samples** > **tab-personal** > **mvc-csharp** folder and open **PersonalTabMVC.sln** in Visual Studio.

1. In Visual Studio, press **F5** or select **Start Debugging** from the Debug menu to ensure that the application loads. Then, access these URLs in the browser:

    * `<http://localhost:3978>`
    * `<http://localhost:3978/personalTab>`
    * `<http://localhost:3978/privacy>`
    * `<http://localhost:3978/tou>`

<details>
<summary><b>Review the source code</b></summary>

#### Startup.cs

This project uses an ASP.NET Core 3.1 empty web application template with **Advanced - Configure for HTTPS** enabled. MVC services are registered in the `ConfigureServices()` method, and static files support is added in the `Configure()` method:

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

ASP.NET Core looks in the web root folder for static files.

#### AppManifest folder

This folder contains the required files for the app package:

* A **full color icon** (192 x 192 pixels).
* A **transparent outline icon** (32 x 32 pixels).
* A `manifest.json` that defines the app attributes.

These files are zipped to create an app package for Teams, where Teams loads the specified `contentUrl` by embedding it in an iFrame.

#### .csproj

In Visual Studio Solution Explorer, right-click the project and select **Edit Project File**. The code at the end creates and updates the zip folder during the build:

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

The **PersonalTab.cs** file defines a message object and methods called by **PersonalTabController** when a user clicks a button in the **PersonalTab** view.

#### Views

The views include:

* Home: Files named **Index** serve as the home page.
* Shared: The **_Layout.cshtml** partial defines the common page structure and includes the Teams Library reference.

#### Controllers

Controllers use `ViewBag` to send dynamic values to the views.

</details>

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Generate+your+application+with+a+tab&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23generate-your-application-with-a+tab&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Update and run your application

1. In Visual Studio Solution Explorer, navigate to **Views** > **Shared** and open **_Layout.cshtml**. Insert these script tags inside `<head>`:

    ```HTML
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
    <script src="https://res.cdn.office.net/teams-js/2.0.0/js/MicrosoftTeams.min.js" integrity="sha384-QtTBFeFlfRDZBfwHJHYQp7MdLJ2C3sfAEB1Qpy+YblvjavBye+q87TELpTnvlXw4" crossorigin="anonymous"></script>
    ```

1. Open **PersonalTab.cshtml** from **Views** > **PersonalTab** and add `microsoftTeams.app.initialize()` within the `<script>` tag.

1. Save changes.

1. Press **F5** or select **Start Debugging** to run the application.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+and+run+your+application&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23update-and-run-your-application&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)
>
### Establish a secure tunnel to your tab

At the project root, run:

```cmd
ngrok http 3978 --host-header=localhost
```

### Update your app package with Developer Portal

1. Go to [**Developer portal**](https://dev.teams.microsoft.com/home).

1. Open **Apps** and select **Import app**.

1. The app package, **tab.zip**, is located at:

    ```
    /bin/Debug/netcoreapp3.1/tab.zip
    ```

1. Choose **tab.zip** and import it into the Developer Portal.

1. A default **App ID** will be generated in **Basic information**.

1. Fill in the Short and Long descriptions under **Descriptions**.

1. Under **Developer information**, enter the required details and set your ngrok HTTPS URL in **Website (must be a valid HTTPS URL)**.

1. Under **App URLs**, set the Privacy policy to `https://<yourngrokurl>/privacy` and Terms of use to `https://<yourngrokurl>/tou`, then save.

1. In **App features**, select **Personal app** > **Create your first personal app tab**, provide a name, update **Content URL** with `https://<yourngrokurl>/personalTab`, leave the Website URL empty, choose **Context** as personalTab, and click **Confirm**.

1. Save the changes.

1. In the Domains section, include your ngrok URL without the HTTPS (i.e., `<yourngrokurl>.ngrok.io`).

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+your+app+package+with+Developer+Portal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dmvc-csharp%23update-your-app-package-with-developer-portal-1&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Preview your app in Teams

1. Select **Preview in Teams** from the Developer Portal toolbar. Developer Portal confirms that the custom app uploads and displays the **Add** page.

1. Click **Add** to load the tab in Teams.

    :::image type="content" source="~/assets/images/tab-images/personaltabaspnetmvccoreuploaded.png" alt-text="Personal tab":::
  
    The tab appears successfully in Teams. Developers can also [reorder tabs](#reorder-tabs) in Teams.

::: zone-end

::: zone pivot="blazor-app"

Blazor lets developers build interactive web UIs using C# instead of JavaScript. Developers can create tab and bot apps with Blazor and the latest version of Visual Studio.

:::image type="content" source="~/assets/images/toolkit-v2/blazor/your-blazor-helloworld-app.png" alt-text="Screenshot of the Blazor app displaying the tab, Bot, and Message Extension output after the step-by-step Blazor guide completes.":::

> [!NOTE]
> Agents Toolkit does not support the message extension capability.

The following table lists the tools developers need to build and deploy Teams apps:

| &nbsp;    | Install   | For using... |
| --- | --- | --- |
| **Required** | &nbsp; | &nbsp; |
| &nbsp; | [Visual Studio version 17.2.0 preview 2.1](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=enterprise&ch=pre&rel=17)|  Use Visual Studio Enterprise 2022 Preview (version 17.2.0 preview 2.1). |
| &nbsp; | [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams is used for collaboration through chat, meetings, and calls in one place. |
| &nbsp; | [Microsoft Edge](https://www.microsoft.com/edge/) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser equipped with developer tools. |

## Prepare development environment

After installing the required tools, developers set up the development environment.

### Install Agents Toolkit

Agents Toolkit simplifies development by providing tools to provision and deploy cloud resources, publish to the Teams Store, and more. Developers can use Agents Toolkit with Visual Studio or as a command-line interface.

# [Latest version of the Visual Studio](#tab/vs)

Developers use the latest Visual Studio to develop Teams apps with Blazor Server in .NET.

To install the Agents Toolkit extension:

1. Download the latest Visual Studio installer.

1. Run the Visual Studio installer file (`.exe`) from the download location.

1. Click **Continue** on the Visual Studio Installer page to configure the installation.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor/visual-studio-installer.PNG" alt-text="Screenshot of Visual Studio Installer with continue options highlighted in red.":::

1. Under **Workloads**, select **ASP.NET and web development**.

1. Under **Installation details**, select **Microsoft 365 Agents Toolkit**.

1. Click **Install**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/vs.install.PNG" alt-text="Screenshot of Visual Studio Enterprise Preview with ASP.NET, web development, and Microsoft Teams development tools selected under installation details, and install highlighted in red.":::

    Visual Studio installs in a few minutes.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Install+Microsoft+Agents+Toolkit+-+Latest+version+of+the+Visual+Studio&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23install-microsoft-agents-toolkit&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md%23latest-version-of-the-visual-studio&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

# [Command line](#tab/cli)

To install Microsoft 365 Agents Toolkit CLI (formerly TeamsFx CLI), developers use npm as follows:

``` bash
npm install -g @microsoft/teamsfx-cli
```

If needed, use `sudo`:

``` bash
sudo npm install -g --unsafe-perm @microsoft/teamsfx-cli
```

Ensure that the npm global cache is added to the PATH; this is usually handled during the Node.js installation.

Developers use the CLI with the `atk` command. Verify its functionality by running `atk -h`.

> [!CAUTION]
> Before running TeamsFx in PowerShell, developers must enable the remote signed execution policy.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Install+Microsoft+Agents+Toolkit+-+Command+line&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23install-microsoft-agents-toolkit&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md%23command-line&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

---

## Set up your Teams development tenant

A tenant is a dedicated space for an organization in Teams where chat, file sharing, and meetings occur. Developers test and upload custom apps in this environment. Verify readiness for development by following these steps.

### Enable custom app upload

After creating the app, developers upload it in Teams without public distribution using custom app upload. After signing in to the Microsoft 365 account:

To verify that custom app upload is available:

1. In the Teams client, open **Apps**.
1. Click **Manage your apps**.
1. Choose **Upload an app**. If **Upload a custom app** appears, custom app upload is enabled.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor/upload-custom-app.PNG" alt-text="Screenshot showing the option to upload a custom app in Teams.":::

    > [!NOTE]
    > Developers should contact the Teams administrator if the upload option is missing.

### Create a free Teams developer tenant (optional)

For developers without a Teams developer account, a free account is available by joining the Microsoft 365 developer program:

1. Visit the [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program).
1. Click **Join Now** and follow the instructions.
1. On the welcome screen, click **Set up E5 subscription**.
1. Complete the administrator account setup; a confirmation screen appears.

    :::image type="content" source="../../assets/images/build-your-first-app/dev-program-subscription.PNG" alt-text="Screenshot of Microsoft 365 Developer Program showing developer subscriptions for a Blazor app.":::

1. Sign in to Teams using the newly created administrator account and verify that **Upload a custom app** is visible.

## Get a free Azure account

Developers who wish to host apps or use Azure resources require an Azure subscription. [Create a free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) prior to beginning.

With all tools and accounts set up, the next step is to set up the development environment and start building.

## Create project workspace for your tab app

Begin Teams app development by creating an app that uses tab capability.

:::image type="content" source="~/assets/images/toolkit-v2/blazor/your-blazor-helloworld-app1.png" alt-text="Screenshot of Blazor app showing the final output of a tab app after following the Blazor steps.":::

This tutorial explains how to create, run, and deploy a Teams app using .NET/Blazor.

In this page, developers learn:

1. [How to set up a new tab project with Agents Toolkit](#create-your-tab-project)
1. [About the directory structure of your app](#take-a-tour-of-the-source-code-for-teams-tab-app)

## Create your tab project

Agents Toolkit guides developers through creating a new tab project workspace by taking them through several configuration pages:

1. **Create a new project** page: Choose the project type.
1. **Configure your new project** page: Enter project details.
1. **Create a new Teams application** page: Select Teams app capabilities.

**To create your tab project workspace**

1. Open the latest Visual Studio.

1. Click **Create a new project**.

   :::image type="content" source="../../assets/images/toolkit-v2/blazor/vs-select-project.png" alt-text="Screenshot of Visual Studio with the Create a new project option highlighted in red for Blazor app.":::

   The **Create a new project** page opens.

1. Specify the project type and details:

   1. Search for **Microsoft 365** in the templates dropdown.

   1. Select **Microsoft 365 Agents** as the template.

   1. Click **Next**.

      :::image type="content" source="../../assets/images/toolkit-v2/blazor/vs-select-teams-app.png" alt-text="Screenshot of Create a new project with the Next option highlighted in red for creating a Teams app." lightbox="../../assets/images/toolkit-v2/blazor/vs-select-teams-app.png":::

      The **Configure your new project** page opens.

1. Configure the project details:

   1. Enter a suitable project name.

      > [!NOTE]
      > Developers note that the project name automatically fills in as the **Solution name**. Changing the solution name later does not affect the project name.

   1. Choose the folder path for the project workspace.

   1. Optionally, specify a different solution name.

   1. Developers can check the option to save the project and solution in the same folder, although this tutorial does not require it.

   1. Click **Create**.

      :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/configure-new-project.PNG" alt-text="Screenshot of Configure your new project with the Create option highlighted in red." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/configure-new-project.PNG":::

      The **Create a new Teams application** page appears.

1. Select the Teams app feature:

   1. Choose **Tab** as the app capability.

   1. Click **Create**.

      :::image type="content" source="../../assets/images/toolkit-v2/first-tab/create-tab.png" alt-text="Screenshot of Create a new Teams application with Tab and Create options highlighted in red.":::

   The Teams tab app is created within seconds.

   :::image type="content" source="../../assets/images/toolkit-v2/blazor/vs-tab-app.png" alt-text="Screenshot of Visual Studio displaying tips to get started while building the app." lightbox="../../assets/images/toolkit-v2/blazor/vs-tab-app.png":::

   <details>
   <summary>A quick recap of creating a Teams tab app.</summary>
   Watch this short recap for creating a Teams tab app.

   :::image type="content" source="~/assets/videos/blazorapp.gif" alt-text="Graphical demonstration of creating the Teams tab app.":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Create+your+tab+project&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23create-your-tab-project&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Take a tour of the source code for Teams tab app

Following project creation, developers view the project directory structure via the **Solution Explorer** pane in Visual Studio.

:::image type="content" source="../../assets/images/toolkit-v2/blazor/blazor-app-solution-explorer_1.png" alt-text="Screenshot of Solution Explorer displaying the components for a basic personal app.":::

Agents Toolkit creates scaffolding based on the selected capabilities. Key components include:

| Folder name | Contents |
| --- | --- |
| App icons | PNG files for app icons stored as `color.png` and `outline.png`. |
| `manifest.json` | The manifest for publishing through the Developer Portal is stored in `Properties/manifest.json`. |
| `BackendController.cs` | A backend controller in `Controllers/BackendController.cs` assists with authentication. |
| `Pages/Tab.razor` | The Razor file for the tab interface. |
| `TeamsFx.cs` and `JS/src/index.js` | Files used to initialize communication with the Teams host. |

Developers can add backend functionality by creating additional ASP.NET Core controllers.
</details>

## Build and run your first Teams tab app

After setting up the project workspace with Agents Toolkit, developers build and run the tab project.

To build and run the app:

1. Select **Project** > **Microsoft 365 Agents Toolkit** > **Select Microsoft 365 Account**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/configure-msteamsapp_1.png" alt-text="Screenshot of Visual Studio with Project, Agents Toolkit, and Prepare Teams App Dependencies options highlighted in red." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/configure-msteamsapp_1.png":::

1. Choose the Microsoft 365 account or click **Add an account** to sign in.

    :::image type="content" source="../../assets/images/toolkit-v2/m365-account_1.PNG" alt-text="Screenshot of Microsoft 365 Account with the Continue option highlighted in red.":::

1. Select **Debug** > **Start Debugging** or click **F5** to run the app in debug mode.
    <br>
    <details>
    <summary>Learn what happens when the app runs locally in the debugger.</summary>

    Upon pressing **F5**, Agents Toolkit:

    1. Registers the app with Microsoft Entra ID.
    1. Registers the app for Teams upload.
    1. Starts the local backend of the app.
    1. Starts the local front-end hosting.
    1. Launches Teams in a web browser with a command to upload the custom app (the URL is registered in the manifest).

    </details>

1. When prompted, install the self-signed SSL certificate for local debugging.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/ssl-prompt.png" alt-text="Screenshot of a Security Warning with the Yes option highlighted.":::

    Teams then load in a web browser.

1. Click **Add**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-app.png" alt-text="Screenshot of the personal tab app dialog with the Add option highlighted.":::

1. Choose **Open** to launch the app in personal scope.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-app-scope.png" alt-text="Screenshot of the scope selection dialog with the Open option highlighted.":::

    The personal tab app runs in the local environment.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/app-local.png" alt-text="Screenshot showing the personal tab app running locally.":::

1. Navigate through the page to view user details.

1. Click **Authorize** to have the app retrieve user details using Microsoft Graph.

    The app requests permissions to display user details.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/authorize-user-info.png" alt-text="Screenshot showing the authorize option in the personal tab of the app.":::

1. Click **Accept** to grant permission.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/ms-graph-permission_1.png" alt-text="Screenshot of the permissions dialog displaying app information.":::

    The user's photograph and details appear on the **Personal Tab**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor/tab-user-info.png" alt-text="Screenshot displaying basic user information on the personal tab of the Teams app.":::

    Developers can perform normal debugging, such as setting breakpoints, and enjoy hot reloading. File changes trigger an automatic page refresh.

    <br>
    <details>
    <summary>Learn how to troubleshoot when the app does not run locally.</summary>

    Ensure that developers have a Microsoft 365 development account with custom app upload enabled. More details are provided in the Prerequisites section.

    </details>

1. Stop debugging in Visual Studio.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Build+and+run+your+first+Teams+tab+app&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23build-and-run-your-first-teams-tab-app&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

## Preview your first Teams tab app

After building, deploying, and running the app locally, the following steps deploy the app to Azure and preview it in Teams:

1. [Provision your tab app in the cloud](#to-provision-your-tab-app-in-the-cloud)
1. [Deploy your tab app to cloud](#to-deploy-your-tab-app-to-cloud)
1. [Preview your tab app in Teams](#to-preview-your-tab-app-in-teams)

Developers now deploy the tab app to Azure using Agents Toolkit.

### **To provision your tab app in the cloud**

1. In Visual Studio, select **Project** > **Microsoft 365 Agents Toolkit** > **Provision in the Cloud**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-provision_1.png" alt-text="Screenshot showing Project, Agents Toolkit, and Provision in the Cloud options highlighted in red." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-provision_1.png":::

1. In the **Provision** dialog, enter subscription and resource group details:
   1. Select the **Subscription name** from the dropdown.
   1. Choose the **Resource group** from the dropdown or click **New** to create one for the app.
   1. If creating a new resource group, select the **Region**.
   1. Click **Provision**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/select-subscription.PNG" alt-text="Screenshot of the Provision dialog with New and Provision options highlighted in red." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/select-subscription.PNG":::

   A provision warning appears.

1. Click **Provision**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/provision-warning.PNG" alt-text="Screenshot of Agents Toolkit with Provision highlighted in red.":::

   Provisioning takes a few minutes.

1. When complete, click **OK**.

    :::image type="content" source="../../assets/images/toolkit-v2/provision-complete.png" alt-text="Screenshot of Agents Toolkit indicating successful provisioning with the OK option highlighted in red.":::

1. Click **View Provisioned Resources** to check the status in the Azure portal.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/view-resource.PNG" alt-text="Screenshot of Agents Toolkit with View Provisioned Resources highlighted in red.":::

1. Sign in to the Azure portal if prompted. The resource group (e.g., app-dev-rg) appears, confirming successful provisioning.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+To+provision+your+tab+app+in+the+cloud&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23to-provision-your-tab-app-in-the-cloud&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

#### **To deploy your tab app to cloud**

1. In Visual Studio, select **Project** > **Microsoft 365 Agents Toolkit** > **Deploy to the Cloud**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-deploytocloud_1.png" alt-text="Screenshot of Visual Studio with Agents Toolkit and Deploy to the Cloud options highlighted in red." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-deploytocloud_1.png":::

1. Click **OK**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/deploy-success.PNG" alt-text="Screenshot showing a successful deployment in Agents Toolkit with the OK option highlighted in red.":::

   The tab app is now deployed to the cloud.

#### **To preview your tab app in Teams**

1. In Visual Studio, select **Project** > **Microsoft 365 Agents Toolkit** > **Preview in Teams**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-preview_1.png" alt-text="Screenshot highlighting the Preview in Teams option in Visual Studio with Agents Toolkit." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-preview_1.png":::

    Teams load in a web browser.

1. Click **Add**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-app.png" alt-text="Screenshot showing the personal tab app dialog with the Add option highlighted.":::

1. Click **Open** to launch the app in personal scope.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-app-scope.png" alt-text="Screenshot of the scope selection dialog with the Open option highlighted.":::

    The app runs successfully in Azure.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-tab-app-azure.PNG" alt-text="Screenshot showing the personal tab of the app in Teams from Azure.":::

    Developers navigate through the app to view user details.

1. Click **Authorize** to allow Microsoft Graph to retrieve user details.

    The app requests permission for user detail access.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/authorize-user-info.png" alt-text="Screenshot showing the authorize option in the personal tab of the app in Azure Teams.":::

1. Click **Accept** to grant permission.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/ms-graph-permission_1.png" alt-text="Screenshot of the permission dialog displaying the app info.":::

    The user's photograph and details appear on the **Personal Tab**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/azure-user-info.png" alt-text="Screenshot of the app displaying basic user information on the personal tab.":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+To+preview+your+tab+app+in+Teams&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23to-preview-your-tab-app-in-teams&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

## Congratulations

Developers complete the tutorial for building a tab app using Blazor.

::: zone-end

## Reorder tabs

With manifest version 1.7, developers can rearrange all tabs in the personal app. The **bot chat** tab, which defaults to the first position, can be moved. Two reserved `entityId` keywords—**conversations** and **about**—are available.

If a bot with a **personal** scope is created, it appears first by default. To reposition it, developers add a static tab object in the manifest with the reserved keyword **conversations**. This tab appears on web and desktop based on its position in the `staticTabs` array.

``` JSON
{
   "staticTabs":[
      {
         // Other tab configuration
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
> On mobile, tabs are reordered according to the sequence defined in `staticTabs`.

This property also lets developers set the default landing capability for the app, so it can open as a tab or bot by default. For more details, see [configure default landing capability](../../concepts/deploy-and-publish/add-default-install-scope.md#configure-your-apps-default-landing-capability).

## Extend static tabs to group chat, channels, and meetings

> [!NOTE]
> To extend static tabs to group chat, channels, or meetings, developers use app manifest v1.16 or later.

Developers can extend static tabs beyond pinned app content. For example, a single YouTube app tab can be pinned across chats, channels, and meetings.

To do this, update the [app manifest](/microsoft-365/extensibility/schema/root-static-tabs) with the `scopes` and `context` parameters within the `staticTabs` property. When multiple static tabs are declared in the manifest and the app is added in channel scope, only the first listed tab appears.

The following example shows a static tab configuration that supports all Teams scopes and contexts:

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

If a context is not specified, Teams defaults to:

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

Developers can create personal scope apps that integrate with Public Switched Telephone Network (PSTN) and Teams-to-Teams calls. By specifying the appropriate scope and context, developers build apps that use tab type, static scope, personal context, and meeting side panels.

For more details, see [build tabs for calling](../../apps-in-teams-meetings/build-tabs-for-calling.md).

## Customizing your static tab in chats or meetings

Developers customize the static tab experience in chats, channels, or meetings using the `setConfig` API. This API updates the `contentUrl` and `websiteUrl`. For example:

```json
pages.config.setConfig({ 
  "contentUrl": "https://wwww.contoso.com/teamsapp/thread/" + context.threadId,
   ...
})
```

Only changes to `contentUrl` and `websiteUrl` are supported; other properties remain unchanged.

## Offline tabs

> [!NOTE]
> Personal tabs with offline functionality are supported only on Teams for Android.

Developers can build personal tabs that operate without an internet connection. Offline tabs are designed for users in areas with poor or no network connectivity, such as field agents or frontline workers. Offline tabs support:

* Data recording through forms that may include images and videos.
* Viewing details of previously submitted forms, incidents, or requests.

When reconnecting to the internet, the tab synchronizes local data with Azure Blob storage, ensuring consistency across the organization.

:::image type="content" source="../../assets/images/tabs/tab-support-offline-mobile.gif" alt-text="Graphic demonstrating offline tab functionality in Teams mobile client.":::

### Build an offline tab

Before building an offline tab, developers ensure that they meet the [prerequisites](~/tabs/how-to/tab-requirements.md).

1. [Create an Azure Blob storage](/azure/storage/blobs/storage-quickstart-blobs-portal) and note the account and container names.

1. Clone the [Microsoft Teams Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/) repository.

1. In the repository, navigate to **samples** > **tab-support-offline** > **nodejs** and open the folder in Visual Studio Code.

   :::image type="content" source="../../assets/images/tabs/open-tab-sample-vsc.png" alt-text="Screenshot demonstrating how to open the code sample in Visual Studio Code." lightbox="../../assets/images/tabs/open-tab-sample-vsc.png":::

1. In the **EXPLORER** panel, go to **server** > **blobStoreOperations.js** and replace `{{ account-Name }}` and `{{ container-Name }}` with your Azure Blob storage account and container values.

1. Press **F5** to start debugging the app. Teams launches in a browser window once the build finishes.

1. Sign in with a Microsoft 365 account if prompted.

1. When the dialog box appears, click **Add** to add the tab app to Teams.

   :::image type="content" source="../../assets/images/tabs/add-offline-tab-teams.png" alt-text="Screenshot demonstrating how to add the offline tab app to Teams.":::

Developers successfully create a Teams tab with offline functionality.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Build+an+offline+tab&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Fbranch%3Dpr-en-us-12027%26tabs%3Dvs%26pivots%3Dnode-java-script%23build-an-offline-tab&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

## Best practices for tabs in Teams mobile

For guidance on optimizing tab performance in Teams for Android and iOS, see [best practices for Teams mobile](../../resources/teams-mobile-best-practices.md).

## Code sample

| Sample name         | Description                                                                                                                                          | .NET                                                                                                                  | Node.js                                                                                                             | Manifest                                                                                                                    |
|---------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| Tab personal        | This sample demonstrates the development of a custom personal tab for Microsoft Teams, using ASP.NET Core MVC to enhance user interaction.        | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal/mvc-csharp)                  | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal-quickstart/js)              | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal/mvc-csharp/demo-manifest/tab-personal.zip) |
| Offline personal tab| This sample app demonstrates a CRUD application that functions offline in Microsoft Teams, allowing data management without an internet connection and synchronizing with blob storage upon reconnection.  | NA                                                                                                                    | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-support-offline/nodejs)              | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/tab-support-offline/nodejs/demo-manifest/tab-support-offline.zip) |

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
