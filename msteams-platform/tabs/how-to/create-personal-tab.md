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

Tabs in chats, channels, or meetings behave more like apps, as only one tab per app can be pinned to the left pane for quick access.

> [!IMPORTANT]
>
> Microsoft 365 Agents Toolkit (previously known as Teams Toolkit) is now available as a Visual Studio Code extension. This new version brings many enhanced app development features. Developers are recommended to use Agents Toolkit v5 for building Teams apps.

Ensure that all the [prerequisites](~/tabs/how-to/tab-requirements.md) are met before building your tab.

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

1. Provide your values to a series of questions prompted by the Microsoft Teams app generator to update your `manifest.json` file.

    :::image type="content" source="~/assets/images/tab-images/teamsTabScreenshot.PNG" alt-text="Teams generator":::

    <details>
    <summary><b>Series of questions to update your manifest.json file</b></summary>

    * **What is your solution name?**

      The solution name corresponds to the project name. Developers can accept the suggested name by pressing **Enter**.

    * **Where do you want to place the files?**

      Since developers are already in the project directory, press **Enter**.

    * **Title of your Microsoft Teams app project?**

      This title becomes the app package name and is used in the manifest and description. Enter a title or accept the default.

    * **Your (company) name? (max 32 characters)**

      This note appears in the manifest. Enter a company name or press **Enter** to use the default.

    * **Which manifest version would you like to use?**

      Select the default schema.

    * **Quick scaffolding? (Y/n)**

      The default is yes; enter **n** if developers want to provide a Microsoft Partner ID.

    * **Enter your Microsoft Partner Id, if you've one? (Leave blank to skip)**

      This field is optional and only relevant for developers in the [Microsoft Cloud Partner Program](https://partner.microsoft.com).

    * **What do you want to add to your project?**

      Developers should select **( * ) A Tab**.

    * **The URL where you will host this solution?**

      For testing locally, a valid URL is not required. The generator suggests an Azure website URL by default.

    * **Would you like show a loading indicator when your app/tab loads?**

      Choose **no** by entering **n** to skip the loading indicator.

    * **Would you like personal apps to be rendered without a tab header-bar?**

      Choose **no** by entering **n**.

    * **Would you like to include Test framework and initial tests? (y/N)**

      Enter **n** to skip including a test framework.

    * **Would you like to include ESLint support? (y/N)**

      Enter **n** to skip ESLint support.

    * **Would you like to use Azure Applications Insights for telemetry? (y/N)**

      Enter **n** as the default is no.

    * **Default Tab Name (max 16 characters)?**

      Provide a name. This value is used as a file or URL path component throughout the project.

    * **What kind of Tab would you like to create?**

      Use the arrow keys and select **Personal (static)**.

    * **Do you require Microsoft Entra Single-Sign-On support for the tab?**

      Enter **n** to opt out of Microsoft Entra Single-Sign-On.
    > [!NOTE]
    > In a tab, the home page appears only when the user presses the back button (or leaves and returns). The tab does not persist previous state by design.
    </details>

-->

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+Issue%5D+Create+a+tab+with+JavaScript&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dnode-java-script%23create-a-tab-with-javascript&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

### Add a content page to the tab

Developers add a content page and update the existing files of the tab application as follows:

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

1. Save **personal.html** in the application's **public** folder as follows:

    ```
    ./src/public/<yourDefaultTabNameTab>/personal.html
    ```

1. Open `manifest.json` located here:

    ```
    ./src/manifest/manifest.json
    ```

1. Add the JSON object below to the empty `staticTabs` array (`"staticTabs":[]`):

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
    > The path component **yourDefaultTabNameTab** is the value entered in the generator for **Default Tab Name**, concatenated with the word **Tab**.
    >
    > For example: if the Default Tab Name is **MyTab**, then the path becomes **/MyTabTab/**

1. Update the **contentUrl** by replacing **yourDefaultTabNameTab** with the actual tab name.

1. Save the modified `manifest.json` file.

1. Open **Tab.ts** in Visual Studio Code from the following path to configure the iFrame for the content page:

    ```bash
    ./src/server/<yourDefaultTabNameTab>/<yourDefaultTabNameTab>.ts
    ```

1. Add the following iFrame decorator:

    ```typescript
    @PreventIframe("/<yourDefaultTabName Tab>/personal.html")
    ```

1. Save the updated file. The tab code is now complete.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Add+a+content+page+to+the+tab&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Fbranch%3Dpr-en-us-12027%26tabs%3Dvs%26pivots%3Dnode-java-script%23add-a-content-page-to-the-tab&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

### Create your app package

Developers must create an app package to build and run the application in Teams. A gulp task validates `manifest.json` and generates the zip file in the `./package` directory. Run the following command at the command prompt:

```cmd
gulp manifest
```

### Build and run your application

#### Build your application

Enter the command below to transpile the solution into the **./dist** folder:

```cmd
gulp build
```

#### Run your application

1. At the command prompt, run the following command to start a local web server:

    ```cmd
    gulp serve
    ```

1. Open a browser and navigate to `http://localhost:3007/<yourDefaultAppNameTab>/` to view the application's home page.

    :::image type="content" source="~/assets/images/tab-images/homePage.png" alt-text="Default Tab":::

1. Navigate to `http://localhost:3007/<yourDefaultAppNameTab>/personal.html` to view the personal tab.

    :::image type="content" source="~/assets/images/tab-images/personalTab.PNG" alt-text="Default html Tab":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Build+and+run+your+application&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Fbranch%3Dpr-en-us-12027%26tabs%3Dvs%26pivots%3Dnode-java-script%23build-and-run-your-application&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

### Establish a secure tunnel to your tab

At the command prompt, exit the localhost session and run the following command to create a secure tunnel:

```cmd
gulp ngrok-serve
```

After the tab is tunneled and uploaded to Teams via **ngrok**, developers can view it in Teams until the tunnel session ends.

### Upload your application to Teams

1. In Teams, select **Apps** &nbsp;:::image type="content" source="~/assets/images/tab-images/store.png" alt-text="Microsoft Teams Store":::.
1. Go to **Manage your apps** > **Upload an app** > **Upload a custom app**.
1. Navigate to the project directory, open the **./package** folder, select the zip file, and choose **Open**.

    :::image type="content" source="~/assets/images/tab-images/addingpersonaltab.png" alt-text="Adding your tab":::

1. In the dialog, select **Add**. The tab is now uploaded to Teams.

    :::image type="content" source="~/assets/images/tab-images/personaltabuploaded.png" alt-text="Personal tab uploaded":::

1. In the Teams left pane, click the ellipses (&#x25CF;&#x25CF;&#x25CF;) and then select the uploaded app to view the tab.

   The tab is now successfully created and added to Teams. Developers can also [reorder](#reorder-tabs) tabs in Teams.

::: zone-end

::: zone pivot="razor-csharp"

## Create a tab with ASP.NET Core

1. At the command prompt, create a new directory for the tab project.

1. Clone the sample repository into the directory using this command or download the [source code](https://github.com/OfficeDev/Microsoft-Teams-Samples) and extract the files:

    ```cmd
    git clone https://github.com/OfficeDev/Microsoft-Teams-Samples.git
    ```

The following steps explain how to create a tab:

1. [Generate your application with a tab](#generate-your-application-with-a-tab-1)
1. [Update and run your application](#update-and-run-your-application)
1. [Establish a secure tunnel to your tab](#establish-a-secure-tunnel-to-your-tab-1)
1. [Update your app package with Developer Portal](#update-your-app-package-with-developer-portal)
1. [Preview your app in Teams](#preview-your-app-in-teams)

### Generate your application with a tab

1. Open Visual Studio and choose **Open a project or solution**.

1. Navigate to **Microsoft-Teams-Samples** > **samples** > **tab-personal** > **razor-csharp** and open **PersonalTab.sln**.

1. In Visual Studio, press **F5** or select **Start Debugging** from the **Debug** menu to verify that the application loads properly. In a browser, visit:

    * `<http://localhost:3978/>`
    * `<http://localhost:3978/personalTab>`
    * `<http://localhost:3978/privacy>`
    * `<http://localhost:3978/tou>`

<details>
<summary><b>Review the source code</b></summary>

#### Startup.cs

This project is based on an ASP.NET Core 3.1 web application empty template with the **Advanced - Configure for HTTPS** option selected. The MVC services register via the `ConfigureServices()` method using dependency injection. Since static files are not enabled by default in the empty template, the static files middleware is added in the `Configure()` method as shown below:

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

In ASP.NET Core, the wwwroot folder serves static files.

#### Index.cshtml

ASP.NET Core uses files named **Index** as the default home page. When the browser requests the root, **Index.cshtml** is displayed.

#### AppManifest folder

This folder holds the required app package files:

* A full color icon (192 x 192 pixels)
* A transparent outline icon (32 x 32 pixels)
* A `manifest.json` file specifying app attributes

These files are zipped into an app package for uploading to Teams. Teams uses the `contentUrl` specified in the manifest to render the tab within an iframe.

#### .csproj

In Visual Studio Solution Explorer, right-click the project and select **Edit Project File**. At the end of the file, the following code creates and updates the zip folder during the build:

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

1. In Visual Studio Solution Explorer, expand **Pages** > **Shared** and open **_Layout.cshtml**. In the `<head>` section, add:

    ```HTML
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
    <script src="https://res.cdn.office.net/teams-js/2.0.0/js/MicrosoftTeams.min.js" integrity="sha384-QtTBFeFlfRDZBfwHJHYQp7MdLJ2C3sfAEB1Qpy+YblvjavBye+q87TELpTnvlXw4" crossorigin="anonymous"></script>
    ```

1. Open **PersonalTab.cshtml** from the **Pages** folder and insert `microsoftTeams.app.initialize()` within the `<script>` tags.

1. Save all changes.

1. Press **F5** or select **Start Debugging** within Visual Studio to run the application.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+and+run+your+application&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23update-and-run-your-application&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)
  
### Establish a secure tunnel to your tab

In the root of your project directory, run the following command to set up a secure tunnel:

```cmd
ngrok http 3978 --host-header=localhost
```

### Update your app package with Developer Portal

1. Navigate to [**Developer portal**](https://dev.teams.microsoft.com/home).

1. Open **Apps** and select **Import app**.

1. The app package, named `tab.zip`, is located in `/bin/Debug/netcoreapp3.1/tab.zip`.

1. Select `tab.zip` to open it in the Developer Portal.

1. A default **App ID** is generated and populated in the **Basic information** section.

1. Enter the Short and Long descriptions for your app in **Descriptions**.

1. Under **Developer Information**, provide the required details and add your ngrok HTTPS URL in **Website (must be a valid HTTPS URL)**.

1. In **App URLs**, update the Privacy policy to `https://<yourngrokurl>/privacy` and Terms of use to `https://<yourngrokurl>/tou`, then select **Save**.

1. Under **App features**, select **Personal app** > **Create your first personal app tab**, enter the tab name, and update the **Content URL** with `https://<yourngrokurl>/personalTab`. Leave the Website URL blank, choose **Context** as personalTab from the dropdown, and select **Confirm**.

1. Click **Save**.

1. In the Domains section, ensure that your ngrok URL without the HTTPS prefix (e.g., `<yourngrokurl>.ngrok.io`) is added.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+your+app+package+with+Developer+Portal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23update-your-app-package-with-developer-portal&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Preview your app in Teams

1. Within the Developer Portal toolbar, select **Preview in Teams**. The portal confirms that the custom app is successfully uploaded. The **Add** page for the app appears in Teams.

1. Select **Add** to launch the tab in Teams. The tab app becomes available in Teams.

    :::image type="content" source="~/assets/images/tab-images/personaltabaspnetuploaded.png" alt-text="Default Tab":::

   The tab is successfully created and integrated into Teams. Developers can also [reorder](#reorder-tabs) tabs within Teams.

::: zone-end

::: zone pivot="mvc-csharp"

## Create a tab with ASP.NET Core MVC

1. At the command prompt, create a new directory for the tab project.

1. Clone the sample repository into this directory using the command below or download the [source code](https://github.com/OfficeDev/Microsoft-Teams-Samples) and extract the files:

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

1. Open Visual Studio and select **Open a project or solution**.

1. Navigate to **Microsoft-Teams-Samples** > **samples** > **tab-personal** > **mvc-csharp** and open **PersonalTabMVC.sln**.

1. In Visual Studio, press **F5** or select **Start Debugging** from the **Debug** menu to verify the application. In a browser, visit these URLs:

    * `<http://localhost:3978>`
    * `<http://localhost:3978/personalTab>`
    * `<http://localhost:3978/privacy>`
    * `<http://localhost:3978/tou>`

<details>
<summary><b>Review the source code</b></summary>

#### Startup.cs

This project was created using an ASP.NET Core 3.1 web application empty template with the **Advanced - Configure for HTTPS** option enabled. MVC services register in `ConfigureServices()` via dependency injection. Since the empty template does not serve static content by default, the static files middleware is added in `Configure()` as follows:

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

ASP.NET Core uses the wwwroot folder for static files.

#### AppManifest folder

This folder includes the required app package files:

* A **full color icon** (192 x 192 pixels)
* A **transparent outline icon** (32 x 32 pixels)
* A `manifest.json` file that defines your app's attributes

These files are zipped to form an app package for Teams. Teams uses the specified `contentUrl` to load the tab within an iframe.

#### .csproj

In Visual Studio Solution Explorer, right-click the project and select **Edit Project File**. At the file's conclusion, the following code creates and updates the zip package during build:

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

**PersonalTab.cs** defines the message object and includes methods invoked by **PersonalTabController** when a button is selected in the **PersonalTab** view.

#### Views

The ASP.NET Core views include:

* **Home**: ASP.NET Core treats files named **Index** as the default home page.
* **Shared**: The partial view **_Layout.cshtml** contains the overall page layout and shared visual components, including the reference to the Teams library.

#### Controllers

Controllers use the `ViewBag` property to transfer dynamic values to the views.

</details>

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Generate+your+application+with+a+tab&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23generate-your-application-with-a-tab&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Update and run your application

1. In Visual Studio Solution Explorer, open **Views** > **Shared** and then open **_Layout.cshtml**. In the `<head>` section, add:

    ```HTML
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
    <script src="https://res.cdn.office.net/teams-js/2.0.0/js/MicrosoftTeams.min.js" integrity="sha384-QtTBFeFlfRDZBfwHJHYQp7MdLJ2C3sfAEB1Qpy+YblvjavBye+q87TELpTnvlXw4" crossorigin="anonymous"></script>
    ```

1. In Visual Studio Solution Explorer, open **PersonalTab.cshtml** located in **Views** > **PersonalTab** and insert `microsoftTeams.app.initialize()` within the `<script>` tags.

1. Save all files.

1. Press **F5** or select **Start Debugging** from the **Debug** menu.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+and+run+your+application&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23update-and-run-your-application&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)
>
### Establish a secure tunnel to your tab

In the root of the project directory, run:

```cmd
ngrok http 3978 --host-header=localhost
```

### Update your app package with Developer Portal

1. Go to [**Developer portal**](https://dev.teams.microsoft.com/home).

1. Open **Apps** and select **Import app**.

1. The app package, named **tab.zip**, is located at:

    ```
    /bin/Debug/netcoreapp3.1/tab.zip
    ```

1. Select **tab.zip** and open it in the Developer Portal.

1. A default **App ID** is generated on the **Basic information** page.

1. Provide Short and Long descriptions in **Descriptions**.

1. Under **Developer information**, fill in the required details and assign your ngrok HTTPS URL to **Website (must be a valid HTTPS URL)**.

1. In **App URLs**, set the Privacy policy to `https://<yourngrokurl>/privacy` and Terms of use to `https://<yourngrokurl>/tou`, then select **Save**.

1. Under **App features**, select **Personal app** > **Create your first personal app tab**. Enter the tab name and update **Content URL** with `https://<yourngrokurl>/personalTab`. Leave the Website URL blank, select **Context** as personalTab from the dropdown, and click **Confirm**.

1. Click **Save**.

1. In the Domains section, add the ngrok URL without the HTTPS prefix (e.g., `<yourngrokurl>.ngrok.io`).

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+your+app+package+with+Developer+Portal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dmvc-csharp%23update-your-app-package-with-developer-portal-1&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Preview your app in Teams

1. Within the Developer Portal toolbar, select **Preview in Teams**. The portal confirms that the custom app is uploaded and displays the **Add** page in Teams.

1. Click **Add** to load the tab in Teams.
  
    :::image type="content" source="~/assets/images/tab-images/personaltabaspnetmvccoreuploaded.png" alt-text="Personal tab":::
  
    The tab is successfully created and integrated into Teams. Developers can also [reorder](#reorder-tabs) the tab in Teams.

::: zone-end

::: zone pivot="blazor-app"

Blazor lets developers build interactive web UIs using C# instead of JavaScript. A tab app and bot app can be created with Blazor using the latest version of Visual Studio.

:::image type="content" source="~/assets/images/toolkit-v2/blazor/your-blazor-helloworld-app.png" alt-text="Screenshot of the Blazor app displaying the tab, Bot, and Message Extension output after the step-by-step Blazor guide is successfully completed.":::

> [!NOTE]
> Agents Toolkit doesn't support the message extension capability.

Below is a list of tools required for building and deploying the app.

|                | Install                                                                                      | For using...                                                                                      |
| -------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **Required**   | &nbsp;                                                                                      | &nbsp;                                                                                           |
|                | [Visual Studio version 17.2.0 preview 2.1](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=enterprise&ch=pre&rel=17) | Select Visual Studio Enterprise 2022 Preview (version 17.2.0 preview 2.1).                        |
|                | [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app)                     | Microsoft Teams to collaborate with everyone using chat, meetings, and calls in one place.       |
|                | [Microsoft Edge](https://www.microsoft.com/edge/) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser equipped with developer tools.                                                         |

## Prepare development environment

After installing the required tools, set up the development environment.

### Install Agents Toolkit

Agents Toolkit simplifies the development process by provisioning and deploying cloud resources for your app, publishing to the Teams Store, and more. Use Agents Toolkit with Visual Studio or via its Command Line Interface.

# [Latest version of the Visual Studio](#tab/vs)

Develop Teams apps with Blazor Server in .NET using the latest Visual Studio.

To install the Agents Toolkit extension:

1. Download the latest version of Visual Studio.
1. Open the Visual Studio installer file (`.exe`) from the download folder.
1. On the **Visual Studio Installer** page, select **Continue**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor/visual-studio-installer.PNG" alt-text="Screenshot of Visual Studio Installer with continue options highlighted in red.":::

1. Under **Workloads**, select **ASP.NET and web development**.
1. Under **Installation details**, check **Microsoft 365 Agents Toolkit**.
1. Click **Install**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/vs.install.PNG" alt-text="Screenshot of Visual Studio Enterprise Preview with Asp.NET, web development, and Microsoft Teams development tools under installation details and install highlighted in red.":::

    Installation completes in a few minutes.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Install+Microsoft+Agents+Toolkit+-+Latest+version+of+the+Visual+Studio&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23install-microsoft-agents-toolkit&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md%23latest-version-of-the-visual-studio&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

# [Command line](#tab/cli)

To install Microsoft 365 Agents Toolkit CLI (previously known as TeamsFx CLI), run:

``` bash
npm install -g @microsoft/teamsfx-cli
```

If needed, use `sudo` on Linux or macOS:

``` bash
sudo npm install -g --unsafe-perm @microsoft/teamsfx-cli
```

Ensure the npm global cache is added to the PATH (this is generally done during Node.js installation).

Run the CLI using the `atk` command. Verify installation by running `atk -h`.

> [!CAUTION]
> Before running TeamsFx in PowerShell, enable the remote signed execution policy.

---

## Set up your Teams development tenant

A tenant is a dedicated space for an organization in Teams where chat, file sharing, and meetings occur. It is also the space for uploading and testing custom apps. Verify that the tenant is ready for development.

### Enable custom app upload

After creating the app, load it in Teams without distributing it. This process, known as custom app upload, requires sign-in to a Microsoft 365 account.

To check if custom app upload is enabled:

1. In the Teams client, click **Apps**.
1. Click **Manage your apps**.
1. Click **Upload an app**. If the **Upload a custom app** option is visible, it is enabled.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor/upload-custom-app.PNG" alt-text="Screenshot shows the option to upload a custom app in Teams.":::

    > [!NOTE]
    > Contact your Teams administrator if the option is not visible.

### Create a free Teams developer tenant (optional)

If developers do not yet have a Teams developer account, join the Microsoft 365 developer program:

1. Visit the [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program).
1. Click **Join Now** and follow the on-screen instructions.
1. On the welcome screen, select **Set up E5 subscription**.
1. Complete setting up the administrator account. Once finished, the screen below appears.

    :::image type="content" source="../../assets/images/build-your-first-app/dev-program-subscription.PNG" alt-text="Screenshot of Microsoft 365 Developer Program displaying your Microsoft 365 developer subscriptions for the Blazor app.":::

1. Sign in to Teams using the newly set-up administrator account. Verify that the **Upload a custom app** option exists.

## Get a free Azure account

To host the app or access Azure resources, an Azure subscription is required. [Create a free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before starting.

With all the tools installed and accounts set up, proceed to create your development environment and begin building.

## Create project workspace for your tab app

Start Teams app development by creating your first app using tab capability.

:::image type="content" source="~/assets/images/toolkit-v2/blazor/your-blazor-helloworld-app1.png" alt-text="Screenshot of Blazor app displaying the final output of tab app after the step-by-step Blazor guide is successfully completed.":::

This tutorial demonstrates how to create, run, and deploy a Teams app using .NET/Blazor.

In this page, developers learn:

1. [How to set up a new tab project with Agents Toolkit](#create-your-tab-project)
1. [About the directory structure of your app](#take-a-tour-of-the-source-code-for-teams-tab-app)

## Create your tab project

Use Agents Toolkit to create your first tab project. The toolkit guides developers through these setup pages:

1. **Create a new project**: Select the project type.
1. **Configure your new project**: Enter project details.
1. **Create a new Teams application**: Select Teams app capabilities.

**To create your tab project workspace**

1. Open the latest version of Visual Studio.

1. Click **Create a new project**.

   :::image type="content" source="../../assets/images/toolkit-v2/blazor/vs-select-project.png" alt-text="Screenshot of Visual Studio with Create a new project option highlighted in red for Blazor app.":::

   The **Create a new project** page appears.

1. Select the project type and details:

   1. Search for **Microsoft 365** in the templates dropdown.
   1. Choose **Microsoft 365 Agents** as the template.
   1. Click **Next**.

      :::image type="content" source="../../assets/images/toolkit-v2/blazor/vs-select-teams-app.png" alt-text="Screenshot of Create a new project with Next option highlighted in red for Blazor app creation." lightbox="../../assets/images/toolkit-v2/blazor/vs-select-teams-app.png":::

      The **Configure your new project** page appears.

1. Configure the project details:

   1. Enter a suitable project name.

      > [!NOTE]
      > The project name automatically fills in as the **Solution name**. Developers can change the solution name without impacting the project name.

   1. Choose the folder path for the project workspace.
   1. Optionally, change the solution name.
   1. Developers may check the option to save the project and solution in the same folder (not required for this tutorial).
   1. Click **Create**.

      :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/configure-new-project.PNG" alt-text="Screenshot of Configure your new project with Create option highlighted in red." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/configure-new-project.PNG":::

      The **Create a new Teams application** page appears.

1. Select the Teams app capability:

   1. Choose **Tab** as the app capability.
   1. Click **Create**.

      :::image type="content" source="../../assets/images/toolkit-v2/first-tab/create-tab.png" alt-text="Screenshot of Create a new Teams application with Tab and Create options highlighted in red.":::

   The Teams tab app is generated in seconds.

   :::image type="content" source="../../assets/images/toolkit-v2/blazor/vs-tab-app.png" alt-text="Screenshot of Visual Studio displaying tips to get started while building your app." lightbox="../../assets/images/toolkit-v2/blazor/vs-tab-app.png":::

   <details>
   <summary>A quick recap of creating a Teams tab app.</summary>
   Watch this short recap on how to create a Teams tab app.

   :::image type="content" source="~/assets/videos/blazorapp.gif" alt-text="Graphical representation showing the process of creating the Teams tab app.":::
   </details>

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Create+your+tab+project&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23create-your-tab-project&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Take a tour of the source code for Teams tab app

After project creation, the app components are visible in the **Solution Explorer** pane in Visual Studio.

:::image type="content" source="../../assets/images/toolkit-v2/blazor/blazor-app-solution-explorer_1.png" alt-text="Screenshot of Solution Explorer displaying components to build a basic personal app.":::

Agents Toolkit scaffolds the project based on the selected capabilities. Key components include:

| Folder name    | Contents                                                                                           |
| -------------- | -------------------------------------------------------------------------------------------------- |
| App icons      | PNG files for app icons, including `color.png` and `outline.png`.                                  |
| `manifest.json`| The app manifest for Teams publishing is stored in `Properties/manifest.json`.                     |
| BackendController.cs | A backend controller in `Controllers/BackendController.cs` assists with authentication.       |
| `Pages/Tab.razor` | The Blazor UI component for the tab.                                                           |
| `TeamsFx.cs` and `JS/src/index.js` | These files initialize communication with the Teams host.                      |

Additional backend functionality can be added using other ASP.NET Core controllers.

## Build and run your first Teams tab app

After setting up the project workspace with Agents Toolkit, build the tab project.

To build and run the app:

1. In Visual Studio, select **Project** > **Microsoft 365 Agents Toolkit** > **Select Microsoft 365 Account**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/configure-msteamsapp_1.png" alt-text="Screenshot of Visual Studio with Agents Toolkit options highlighted in red." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/configure-msteamsapp_1.png":::

1. Choose your Microsoft 365 account or click **Add an account** to sign in.

    :::image type="content" source="../../assets/images/toolkit-v2/m365-account_1.PNG" alt-text="Screenshot of Microsoft 365 Account with Continue option highlighted in red.":::

1. Select **Debug** > **Start Debugging** or press **F5** to run the app in debug mode.
    <br>
    <details>
    <summary>Learn what happens when the app runs locally in the debugger.</summary>

    When **F5** is pressed, Agents Toolkit:

    1. Registers the app with Microsoft Entra ID.
    1. Registers the app for custom upload in Teams.
    1. Launches the backend locally.
    1. Hosts the front-end locally.
    1. Opens Teams in a browser with instructions to upload a custom app (the URL is embedded in the app manifest).

    </details>

1. If prompted, install the self-signed SSL certificate for local debugging.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/ssl-prompt.png" alt-text="Screenshot of Security Warning with the Yes option highlighted.":::

    Teams opens in the web browser.

1. Click **Add**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-app.png" alt-text="Screenshot of the personal tab app dialog with the Add option highlighted.":::

1. Click **Open** to launch the app in personal scope.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-app-scope.png" alt-text="Screenshot of the scope selection dialog with the Open option highlighted.":::

    Congratulations! The first tab app runs in the local environment.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/app-local.png" alt-text="Screenshot shows the first tab app running locally.":::

1. Navigate through the page to view user details.

1. Click **Authorize** to let the app retrieve user details via Microsoft Graph.

    The app requests permission to display user details.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/authorize-user-info.png" alt-text="Screenshot shows the authorize option in the personal tab.":::

1. Click **Accept** to grant access to user details.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/ms-graph-permission_1.png" alt-text="Screenshot of permissions requested displaying the app info.":::

    The user's photograph and details appear in the **Personal Tab**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor/tab-user-info.png" alt-text="Screenshot showing basic user details on the personal tab in Teams.":::

    Normal debugging operations, such as setting breakpoints, work as with any web application. The app supports hot reloading so that changes in any file trigger a page reload.

    <br>
    <details>
    <summary>Learn how to troubleshoot if the app does not run locally.</summary>

    A Microsoft 365 development account that supports custom app upload is required to run the app in Teams. Developers can learn more in the Prerequisites section.

    </details>

1. Stop debugging in Visual Studio.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Build+and+run+your+first+Teams+tab+app&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23build-and-run-your-first-teams-tab-app&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

## Preview your first Teams tab app

After creating, building, and running the app, the next steps are to deploy it on Azure and preview it in Teams:

1. [Provision your tab app in the cloud](#to-provision-your-tab-app-in-the-cloud)
1. [Deploy your tab app to cloud](#to-deploy-your-tab-app-to-cloud)
1. [Preview your tab app in Teams](#to-preview-your-tab-app-in-teams)

Let’s deploy the tab app on Azure using Agents Toolkit.

### **To provision your tab app in the cloud**

1. In Visual Studio, select **Project** > **Microsoft 365 Agents Toolkit** > **Provision in the Cloud**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-provision_1.png" alt-text="Screenshot of Visual Studio with Agents Toolkit options highlighted in red." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-provision_1.png":::

1. In the **Provision** dialog, enter the subscription and resource group details:
   1. Choose your subscription from the **Subscription name** dropdown.
   1. Select the resource group from the **Resource group** dropdown or select **New** to create one.
   1. If creating a new resource group, select a **Region**.
   1. Click **Provision**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/select-subscription.PNG" alt-text="Screenshot of Provision with New and Provision options highlighted in red." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/select-subscription.PNG":::

   A provision warning appears.

1. Click **Provision**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/provision-warning.PNG" alt-text="Screenshot of Agents Toolkit showing the Provision button highlighted in red.":::

   Provisioning takes several minutes.

1. Once complete, click **OK**.

    :::image type="content" source="../../assets/images/toolkit-v2/provision-complete.png" alt-text="Screenshot of Agents Toolkit with the OK button highlighted.":::

1. Click **View Provisioned Resources** to open the Azure portal.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/view-resource.PNG" alt-text="Screenshot of Agents Toolkit with View Provisioned Resources highlighted in red.":::

1. Sign in to the Azure portal if prompted. The resource group (e.g., app-dev-rg) appears with the provisioned resources.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/app-dev-rg-azure.PNG" alt-text="Screenshot of app-dev-rg showing Azure portal resources.":::

    The resources are now provisioned in Azure.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+To+provision+your+tab+app+in+the+cloud&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23to-provision-your-tab-app-in-the-cloud&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

#### **To deploy your tab app to cloud**

1. In Visual Studio, select **Project** > **Microsoft 365 Agents Toolkit** > **Deploy to the Cloud**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-deploytocloud_1.png" alt-text="Screenshot of Visual Studio with Agents Toolkit Deploy to the Cloud option highlighted in red." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-deploytocloud_1.png":::

1. Click **OK**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/deploy-success.PNG" alt-text="Screenshot of Agents Toolkit displaying a successful deployment with OK highlighted.":::

    The tab app is now deployed in the cloud.

#### **To preview your tab app in Teams**

1. In Visual Studio, select **Project** > **Microsoft 365 Agents Toolkit** > **Preview in Teams**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-preview_1.png" alt-text="Screenshot of Visual Studio with Agents Toolkit Preview in Teams option highlighted in red." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-preview_1.png":::

    Teams opens in the web browser.

1. Click **Add**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-app.png" alt-text="Screenshot of the personal tab app dialog with Add highlighted.":::

1. Click **Open** to launch the app in personal scope.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-app-scope.png" alt-text="Screenshot of the scope selection dialog with Open highlighted.":::

    Congratulations! The tab app now runs in the Azure environment.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-tab-app-azure.PNG" alt-text="Screenshot of the personal tab in Teams after cloud deployment.":::

1. Navigate through the page to view user details.

1. Click **Authorize** to enable the app to retrieve user details via Microsoft Graph.

    The app requests permission to access user information.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/authorize-user-info.png" alt-text="Screenshot showing the authorize option in the personal tab.":::

1. Click **Accept** to grant permission.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/ms-graph-permission_1.png" alt-text="Screenshot of the permissions prompt detailing the App info.":::

    The user's photograph and details appear in the **Personal Tab**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/azure-user-info.png" alt-text="Screenshot showing the personal tab with user details after Azure deployment.":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+To+preview+your+tab+app+in+Teams&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23to-preview-your-tab-app-in-teams&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

## Congratulations

Developers have now completed the tutorial to build a tab app with Blazor.

::: zone-end

## Reorder tabs

Starting with manifest version 1.7, developers can rearrange the tabs in a personal app. The **bot chat** tab, which defaults to the first position, can be moved by adding a static tab with the reserved `entityId` keywords **conversations** and **about**.

If a bot with a **personal** scope is created, it appears in the first tab position by default. To reposition it, add a static tab with the reserved keyword **conversations**. The **conversations** tab appears on web and desktop based on its location within the `staticTabs` array.

``` JSON
{
   "staticTabs": [
      {
         // Other tab configuration
      },
      {
         "entityId": "conversations",
         "scopes": [
            "personal"
         ]
      }
   ]
}
```

> [!NOTE]
> On mobile, tabs are reordered as defined in `staticTabs`.

This property also allows developers to set the default landing capability for the app. It is possible to configure the app to open as a tab or a bot by default. For more information, see [configure default landing capability](../../concepts/deploy-and-publish/add-default-install-scope.md#configure-your-apps-default-landing-capability).

## Extend static tabs to group chat, channels, and meetings

> [!NOTE]
> To extend a static tab to group chat, channels, and meetings, use app manifest v1.16 or later.

Developers can extend static tabs to function in group chats, channels, and meetings. Unlike pinned app content, a tab can behave like an app where only one tab per app is pinned (for example, a single YouTube app tab).

To extend static tabs for broader use, update the [app manifest](/microsoft-365/extensibility/schema/root-static-tabs) to include `scopes` and `context` parameters in `staticTabs`. When multiple static tabs are declared and the app is added in channel scope, only the first tab in the manifest appears.

Below is an example of an app manifest where a static tab is defined to work in all Teams scopes and contexts:

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

If a context is not defined, Teams uses the default context:

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

Developers can create personal apps with PSTN and Teams-to-Teams calling capabilities by integrating with calling extensibility. Use the correct scope and context (tab type, static scope, personal context, meeting side panels) to build such apps.

For more details, see [build tabs for calling](../../apps-in-teams-meetings/build-tabs-for-calling.md).

## Customizing your static tab in chats or meetings

Developers can customize the experience of a static tab in chats, channels, or meetings by using the `setConfig` APIs in the tab to update the `contentUrl` and `websiteUrl`. For example:

```json
pages.config.setConfig({ 
  "contentUrl": "https://wwww.contoso.com/teamsapp/thread/" + context.threadId,
  // Other properties remain unchanged.
})
```

Only `contentUrl` and `websiteUrl` can be modified using `setConfig`; other properties must remain unchanged.

## Offline tabs

> [!NOTE]
> Personal tabs with offline functionality are supported only on Teams for Android.

Developers can create personal tabs that function without an internet connection. Offline tabs benefit users in areas with poor or no network coverage, such as field agents or frontline workers. Offline tabs allow users to:

* Fill out forms that can include images and videos.
* View details of previously submitted requests, incidents, or forms.

When the device reconnects to the internet, the tab automatically synchronizes local data with an Azure Blob storage to ensure data consistency.

:::image type="content" source="../../assets/images/tabs/tab-support-offline-mobile.gif" alt-text="Graphic demonstrating how an offline tab works in the Teams mobile client.":::

### Build an offline tab

Before starting, confirm that the prerequisites for building a personal tab are met.

1. [Create an Azure Blob storage](/azure/storage/blobs/storage-quickstart-blobs-portal). Note down the account and container names.
1. Clone the [Microsoft Teams Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/) repository.
1. In the cloned repository, navigate to **samples** > **tab-support-offline** > **nodejs** and open the folder in Visual Studio Code.

   :::image type="content" source="../../assets/images/tabs/open-tab-sample-vsc.png" alt-text="Screenshot demonstrating how to open the code sample in Visual Studio Code." lightbox="../../assets/images/tabs/open-tab-sample-vsc.png":::

1. In the **EXPLORER** pane, open **server** > **blobStoreOperations.js** and replace `{{ account-Name }}` and `{{ container-Name }}` with the Azure Blob storage account and container values.
1. Press **F5** to debug the app. Once the build completes, Teams opens in a browser.
1. If prompted, sign in with a Microsoft 365 account.
1. When the dialog appears, click **Add** to add the tab app to Teams.

   :::image type="content" source="../../assets/images/tabs/add-offline-tab-teams.png" alt-text="Screenshot showing how to add the offline tab app to Teams.":::

Congratulations! The Teams tab with offline functionality is now successfully created.
> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Build+an+offline+tab&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Fbranch%3Dpr-en-us-12027%26tabs%3Dvs%26pivots%3Dnode-java-script%23build-an-offline-tab&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

## Best practices for tabs in Teams mobile

For tips on optimizing tab performance in Teams on Android and iOS, see [best practices for Teams mobile](../../resources/teams-mobile-best-practices.md).

## Code sample

| Sample name            | Description                                                                                                          | .NET                                                                                              | Node.js                                                                                                           | Manifest                                                                                                               |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Tab personal           | This sample demonstrates developing a custom personal tab for Microsoft Teams using ASP.NET Core MVC to enhance user interaction. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal/mvc-csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal-quickstart/js)          | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal/mvc-csharp/demo-manifest/tab-personal.zip) |
| Offline personal tab   | This sample shows a CRUD application that functions offline in Microsoft Teams, allowing users to manage data without internet connectivity, later synchronizing with blob storage. | NA                                                                                              | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-support-offline/nodejs)           | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/tab-support-offline/nodejs/demo-manifest/tab-support-offline.zip) |

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