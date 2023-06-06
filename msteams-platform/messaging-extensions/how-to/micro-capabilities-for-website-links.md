---
title: Micro-capabilities for website links
author: v-ypalikila
description: In this article, lean how to use micro-capability templates and schema.org metadata to unfurl rich previews for your links in Microsoft Teams.
ms.localizationpriority: high
ms.topic: conceptual
ms.author: v-ypalikila
---
# Micro-capabilities for website links

The most common way to share content in Microsoft Teams is through links. For any link, Teams unfurls a preview of the link into an Adaptive Card with the information such as image, title, and description. You can use the **schema.org** metadata and the **micro-capability** templates to show rich unfurl previews of your links without installing your app in Microsoft Teams.

## Add schema.org to your website

[Schema.org](https://schema.org/docs/gs.html) is an open-source standard for schemas of structured data on the internet. Add schema.org to your website and use the properties in the micro-capability templates <!--- link to GitHub templates to be added after the PM shares the public link --> to unfurl rich previews of your links in Microsoft Teams.

### Enable rich unfurl previews of links

> [!NOTE]
> If you've already added [schema.org](<https://schema.org/>) to your website, you can view the rich unfurl preview of your link by pasting it in the Teams message compose area.

Specify the [schema.org](https://schema.org/) and the supported `@type` attribute to your website. For each `@type` attribute, include the properties available in the micro-capability template that apply to your website.

To enable rich unfurl previews of your links, follow these steps:

1. In the index.html file, create a `<script>` element with the type as `application/ld+json`.

   ```html
   <head>
    <script type="application/ld+json">
    </script>
   </head>
   ```

1. Add the `@context` attribute with the value as  `http://schema.org` in the script tag.

   ```html
    <script type="application/ld+json">
     {
        "@context": "http://schema.org/",
     }
    </script>

   ```

1. Add the `@type` and `name` attributes to the script tag.

    ```html
    <script type="application/ld+json">
      {
          "@context": "http://schema.org/",
          "@type": "Article",
          "name": "Contoso news"
      }
    </script>

    ```

1. Add the properties listed in the micro-capability template.

    ```html
    <script type="application/ld+json">
      {
          "@context": "http://schema.org/",
          "@type": "Article",
          "name": "Contoso news"
      }
      {



      }
    </script>

    ```

    You can also add the properties for each type available in the schema.org to your website. Teams recognizes all the properties for the supported micro-capability templates available at schema.org.

1. After you've added all the properties to the script tag, add the script tag to your website HTML page.

The following are the supported micro-capability templates for Teams client:

> [!NOTE]
> If the website link doesn't have the supported micro-capability templates, Teams defaults the link to the current URL preview unfurling.

# [Article](#tab/article)

|Property |Description  |
|---------|---------|
|`@type`     | Article        |
|image    | URL of the image of for the article.        |
|name    |  Name of the author.       |
|headline    | Headline for the article.        |
|creator     | Author of the article.        |
|description    | Summary about the article.        |
|url     |  URL of the article's official website.      |

Example of the unfurling experience for article type:
:::image type="content" source="../../assets/images/messaging-extension/micro-capabilities-template-article.png" alt-text="Screenshot shows a unfurling experience of the article template in Microsoft Teams.":::


# [Product](#tab/product)

|Property |Description  |
|---------|---------|
|`@type`     |  Product       |
|image    | URL of the image of for the product.        |
|name    |  Name of the product.       |
|offers.price     | Price of the product.         |
|offers.priceCurrency      |  Currency of the Product.       |
|description    |  Summary about the product.       |
|url     | URL of the product's website.        |

Example of the unfurling experience for the product type:

:::image type="content" source="../../assets/images/messaging-extension/micro-capabilities-template-product.png" alt-text="Screenshot shows a unfurling experience of the product template in Microsoft Teams.":::

# [Event](#tab/event)

|Property |Description  |
|---------|---------|
|`@type`     |  Event       |
|image    | URL of the image of for the event.        |
|name    |  Name of the event.       |
|description     |  Description of the even.t       |
|startDate       |  Start date and time of the event in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.       |
|address       |  Address of the event.       |
|geo.latitude     | Latitude of the event location.        |
|url     |  URL of the event's official website.       |
|geo.longitude      | Longitude of the event location.        |

Example of the unfurling experience for the event type:

:::image type="content" source="../../assets/images/messaging-extension/micro-capabilities-template-event.png" alt-text="Screenshot shows the unfurling experience of the event template in Microsoft Teams.":::


# [Local business](#tab/localbuisness)

|Property |Description  |
|---------|---------|
|`@type`     |  Local business       |
|image    | URL of the image of for the business.        |
|name    |  Name of the business.       |
|aggregateRating.ratingValue     | Average Rating of the business.        |
|address      | Physical address of the business.        |
|geo.latitude     | Latitude of the business location.        |
|geo.longitude      | Longitude of the business location.        |
|aggregateRating.reviewCount      | Average number of reviews for the business.        |
|aggregateRating.ratingCount       | Average number of ratings for the business.        |

Example of the unfurling experience for the local business type:

:::image type="content" source="../../assets/images/messaging-extension/micro-capabilities-template-local-business.png" alt-text="Screenshot shows the unfurling experience of the local business template in Microsoft Teams.":::

# [Course](#tab/course)

|Property |Description  |
|---------|---------|
|`@type`     |   Course      |
|image    | URL of the image of for the course.        |
|name    |  Name of the course.       |
|priceRange    |  Price of the course.       |
|aggregateRating.ratingValue      |  Average rating of the course.       |
|description    |  Summary about the course.       |
|url     |  URL of the course website.       |
|aggregateRating.reviewCount      | Average number of reviews for the course.        |
|aggregateRating.ratingCount      | Average number of ratings for the course.        |

Example of the unfurling experience for the course type:

:::image type="content" source="../../assets/images/messaging-extension/micro-capabilities-template-course.png" alt-text="Screenshot shows the unfurling experience of the course template in Microsoft Teams.":::


---

The following is an example of schema metadata mapped to the rich unfurling preview of an Adaptive Card:

:::image type="content" source="../../assets/images/messaging-extension/micro-capabilities-schema-map-actionable-previews.png" alt-text="Graphic shows an example of schema metadata mapped to elements in the rich unfurling preview of an Adaptive Card.":::

### Validate your website link

Go to [schema.org validator](https://validator.schema.org/) to validate if your website link metadata is as per schema.org standards. After the validation is successful, paste the website link in Teams compose message area to view rich unfurl preview of your link.

:::image type="content" source="../../assets/images/messaging-extension/micro-capabilities-template-article.png" alt-text="Screenshot shows an example of rich unfurl preview experience of a micro-capability website link in Teams.":::

## See also

[Add link unfurling](link-unfurling.md)
