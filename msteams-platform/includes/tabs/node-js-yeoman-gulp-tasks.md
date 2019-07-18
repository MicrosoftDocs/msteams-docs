## Create the app package

You'll need an app package to test your tab in Teams. It's a zip folder that contains the following required files:

- A **full color icon** measuring 192 x 192 pixels.
- A **transparent outline icon** measuring 32 x 32 pixels.
- A **manifest.json** file that specifies the attributes of your tab and points to required resources like the config.html page.

The package is created via a gulp task that validates the manifest.json and generates the zip folder in the *./package directory*. In the command prompt enter:

```bash
gulp manifest
```

## Build your application

The build command compiles your solution in the *./dist* folder. Next,enter:

```bash
gulp build
```

## Run your application in localhost

Start a local web server by entering the following:

```bash
gulp serve
```

Enter `http://localhost:3007/`**yourDefaultAppNameTab/** in your browser and view your application's home page:

![home page screenshot](/microsoftteams/platform/assets/images/tab-images/homePage.PNG)