---
title: Tutorial - Upgrade Teams using Microsoft Teams Yeoman generator
description: Learn how to use Microsoft Teams Yeoman generator to upgrade Teams.
ms.topic: tutorial
---

# Upgrade Teams using Microsoft Teams Yeoman generator
This tutorial helps you to upgrade your current Microsoft Teams app version to the latest version using the Microsoft Teams Yeoman generator.

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
![image of YoSelectUpdatGen](~/assets/images/Update-Teams/YoSelectUpdateGen.png)

The list displays all the available generators. To select or unselect Teams version from the available options, use the **space bar** and choose a specific generator.
![image of UseSpaceToSelectGenerators](~/assets/images/Update-Teams/UseSpaceToSelectGenerators.png)

It takes few seconds to minutes for Teams installation to complete.

After the installation is complete, use the following command to check the installed version:

```PowerShell
yo teams --version
```

![image of FindVersionAfterInstallation](~/assets/images/Update-Teams/FindVersionAfterInstallation.png)

Congrats! You have upgraded Microsoft Teams.

