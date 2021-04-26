## Create app package

You need an app package to test your tab in Teams. It is a zip folder that contains the following required files:

- A **full color icon** measuring 192 x 192 pixels.
- A **transparent outline icon** measuring 32 x 32 pixels.
- A **manifest.json** file that specifies the attributes of your app.

The package is created through a gulp task that validates the manifest.json file and generates the zip folder in the `./package directory`. In the command prompt enter:

```bash
gulp manifest
```

## Build your application

The build command transpiles your solution into the *./dist* folder. Enter:

```bash
gulp build
```

## Run your application in localhost

Start a local web server by entering the following:

```bash
gulp serve
```

Enter `http://localhost:3007/<yourDefaultAppNameTab>/` in your browser. The following application's home page is displayed:

![home page screenshot](~/assets/images/tab-images/homePage.png)