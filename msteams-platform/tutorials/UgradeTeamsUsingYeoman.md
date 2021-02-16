# Upgrade Teams using Microsoft Teams Yeoman generator
In this tutorial, we will walk you through upgrading your current Microsoft Teams app version to the latest version using the Microsoft Teams Yeoman generator. 
## Get current version of Teams
```PowerShell
 yo teams --version
```
## Update Teams
The yo command lists out various options ranging from creating project to updating generator. Use the following command to select update generator:
```PowerShell
 yo
```
Use the arrow keys to choose **Update Generators**.
![image](https://github.com/divya-akula/msteams-docs/blob/master/msteams-platform/assets/images/Update-Teams/YoSelectUpdateGen.png)

The list displays all the available generators. To select or unselect Teams version from the available options, use the **space bar** and choose a specific generator.
![image](https://github.com/divya-akula/msteams-docs/blob/master/msteams-platform/assets/images/Update-Teams//UseSpaceToSelectGenerators.png)

It takes a while to install teams, may be a few seconds to minutes

After the installation is complete, use the following command to check the installed version:

```PowerShell
yo teams --version
```
![image](https://github.com/divya-akula/msteams-docs/blob/master/msteams-platform/assets/images/Update-Teams/FindVersionAfterInstallation.png)
