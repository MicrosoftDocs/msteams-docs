# Upgrade Teams using Microsoft Teams Yeoman generator
In this tutorial, we will walk you through upgrading your current Microsoft Teams app version to the latest version using the Microsoft Teams Yeoman generator. 
## Get current version of Teams
```PowerShell
 yo teams --version
```
## Update teams
The yo command lists out various options ranging from creating project to upate generator , use the below command to select updtae generator
```PowerShell
 yo
```
Use the arrow keys to choose Update Generators
![image](https://github.com/divya-akula/msteams-docs/blob/master/msteams-platform/assets/images/Update-Teams/YoSelectUpdateGen.png)

This should listdown all the generators available , you should select a specific generator by using space bar to select and deselect teams from the available options
![image](https://github.com/divya-akula/msteams-docs/blob/master/msteams-platform/assets/images/Update-Teams//UseSpaceToSelectGenerators.png)

It takes a while to install teams, may be a few seconds to minutes

Once the installation is complete , you can use the below command to check the version

```PowerShell
yo teams --version
```
![image](https://github.com/divya-akula/msteams-docs/blob/master/msteams-platform/assets/images/Update-Teams/FindVersionAfterInstallation.png)
