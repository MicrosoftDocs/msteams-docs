---
title: Test new file - Nihari
author: v-npaladugu
description: Creating a new test file
ms.author: v-npaladugu
ms.date: 10/05/2021
ms.topic: Test new file
ms.localizationpriority: none
---

# Create new test file using Visual Studio Code

In this article, new writers can find sample contents and also list of markdown tags that are commonly used in [Teams apps documentation](overview.md). This article also includes few best practices.

[Get started](get-started/code-samples.md) with Teams apps.

See Teams app style guide for information on how to use the styles and standards.

- The [list of commonly used markdown tags](#list-of-commonly-used-markdown-tags)
- [Sample image](#sample-image)
- Best practices

## List of commonly used markdown tags

The list of markdown tags that are extensively used in Teams apps documentation:

### Table tag

|Test column1 | Test column2 | Test column3 | Test column4 | 
|----------------|-----------------|--------------|--------------|
| Test edit | Test edit | Test edit | Test edit |

### Note tag

> [!NOTE]
> This is a sample note.

### Caution tag

> [!CAUTION]
> This is a sample caution.

### Warning tag

> [!WARNING]
> This is a sample warning.

### Code samples

#### csharp

 ``` csharp

    public static void Log(string message)
    {
        _logger.LogInformation(message);
    }

```

## Sample image

1. ![Test image1](test-image.png)
2. :::image type="content" source="/test-media\new-test-file-nihari/test-image.png" alt-text="Test image.":::

## Best practices

Here are a few best practices/checklist while working with new files and tags

- Add the new file to the table of contents
- Refer to the existing source files for any detailed guidance on the style and tags to use

## Next step

> [!NOTE]
> This next step is used as a sample

> [!div class="nextstepaction"]
> [Invoke and dismiss task modules](~/task-modules-and-cards/task-modules/invoking-task-modules.md)