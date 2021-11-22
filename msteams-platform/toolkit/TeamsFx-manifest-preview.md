# Preview Teams app Manifest

After scaffolding, two manifest template files are created under `templates/appPackage` folder.

- `manifest.local.template.json` - for local debug Teams App
- `manifest.remote.template.json` - shared by all remote environments

These template files contain placeholders, and the actual values from Teams Toolkit will be resolved in files under `.fx/configs` and `.fx/states`.

## Preview manifest with real content

Teams Toolkit generates preview manifest files under `build/appPackage` folder.

```text
└───build
    └───appPackage
        ├───appPackage.{env}.zip - Zipped app package of remote teams app
        ├───appPackage.local.zip - Zipped app package of local team app
        ├───manifest.{env}.json  - Previewed manifest of remote teams app
        └───manifest.local.json  - Previewed manifest of local teams app
```

### Local debug Teams App

To preview manifest file of local Teams App, you need to press `F5` to run local debug first. This step generates default local settings, then the app package and preview manifest are generated in `build/appPackage` folder.

The alternative ways are:

- Click `Preview` in the codelens of `manifest.local.template.json` file
- Click `Preview manifest file` at the menu bar of `manifest.local.template.json` file
- Click `Zip Teams metadata package` in tree view and select `local`

![preview-local](../images/preview.png)

### Remote environment

To preview manifest file of remote Teams App, you need to click `Provision in the cloud` in DEVELOPMENT section of Teams Toolkit  tree view, or trigger `Teams: Provision in the cloud` from command palette. This step generates configurations for remote Teams App, then the app package and preview manifest are generated in `build/appPackage` folder.

The alternatives ways are:

- Click `Preview` in the codelens of `manifest.remote.template.json` file
- Click `Preview manifest file` at the menu bar of `manifest.remote.template.json` file
- Click `Zip Teams metadata package` in tree view and select your environment

![preview-remote](../images/preview-remote.png)

> If there are more than one environment, you need to select the env you want to preview.

![select-env](../images/select-env.png)

## Sync local changes to Dev Portal

TODO: to complete when feature is ready.

You can sync your local changes to Dev Portal by clicking `Update` at the top of `manifest.{env}.json`

// Screenshot here

If there are manual updates in Dev Portal, a warning message is sent to let you confirm if you want to overwrite the changes in Dev Portal.

// Screenshot here
