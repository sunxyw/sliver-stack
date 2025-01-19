import type { StringNumber } from "@/types/utils";
import type { JSX } from "react";
import type { LiteralUnion } from "type-fest";

type Meta = JSX.IntrinsicElements["meta"];

type ViewportWidthHeightValues =
  | StringNumber
  | "device-width"
  | "device-height";

interface Viewport {
  width?: ViewportWidthHeightValues;
  height?: ViewportWidthHeightValues;
  "initial-scale"?: StringNumber;
  "minimum-scale"?: StringNumber;
  "maximum-scale"?: StringNumber;
  "user-scalable"?: "yes" | "no" | "1" | "0";
  "viewport-fit"?: "auto" | "contain" | "cover";
  [key: string]: unknown;
}

interface ImageMetadata {
  width?: number;
  height?: number;
  url?: string;
  alt?: string;
  format?: LiteralUnion<"jpg" | "png" | "webp" | "gif", string>;
}

type OpenGraphType =
  | "website"
  | "article"
  | "book"
  | "profile"
  | "product"
  | "place"
  | "event";

type TwitterCard = "summary" | "summary_large_image";

interface Metadata {
  charSet?: LiteralUnion<"utf-8", string>;
  title?: string;
  description?: string;
  viewport?: Viewport;
  author?: string;
  robots?: string;
  keywords?: string;
  images?: ImageMetadata[];
  openGraph?: {
    url?: string;
    type?: LiteralUnion<OpenGraphType, string>;
    locale?: string;
  };
  twitter?: {
    site?: string;
    card?: LiteralUnion<TwitterCard, string>;
  };
}

export function createMetadata(metadata: Metadata): Meta[] {
  const meta: Meta[] = [];

  if (metadata.charSet) {
    meta.push({ charSet: metadata.charSet });
  }

  if (metadata.title) {
    meta.push({ title: metadata.title });
  }

  if (metadata.viewport) {
    const viewport = Object.entries(metadata.viewport)
      .map(([key, value]) => `${key}=${value}`)
      .join(", ");

    meta.push({ name: "viewport", content: viewport });
  }

  addMetaTag("name", "description", metadata.description);
  addMetaTag("name", "author", metadata.author);
  addMetaTag("name", "robots", metadata.robots);
  addMetaTag("name", "keywords", metadata.keywords);

  addMetaTag("property", "og:title", metadata.title);
  addMetaTag("property", "og:description", metadata.description);
  addMetaTag("property", "og:url", metadata?.openGraph?.url);
  addMetaTag("property", "og:type", metadata?.openGraph?.type);
  addMetaTag("property", "og:locale", metadata?.openGraph?.locale);

  addMetaTag("name", "twitter:card", metadata?.twitter?.card);
  addMetaTag("name", "twitter:site", metadata?.twitter?.site);
  addMetaTag("name", "twitter:title", metadata.title);
  addMetaTag("name", "twitter:description", metadata.description);

  addMetaTag("name", "twitter:image", metadata.images?.[0]?.url);
  addMetaTag("name", "twitter:image:alt", metadata.images?.[0]?.alt);
  addMetaTag(
    "name",
    "twitter:image:width",
    metadata.images?.[0]?.width?.toString(),
  );
  addMetaTag(
    "name",
    "twitter:image:height",
    metadata.images?.[0]?.height?.toString(),
  );

  for (const image of metadata?.images || []) {
    addMetaTag("property", "og:image", image.url);
    addMetaTag("property", "og:image:alt", image.alt);
    addMetaTag("property", "og:image:type", image.format);
    addMetaTag("property", "og:image:width", image.width?.toString());
    addMetaTag("property", "og:image:height", image.height?.toString());
  }

  function addMetaTag(
    keyType: "name" | "property",
    keyName: string,
    content?: string,
  ) {
    if (typeof content === "string" && content?.trim() !== "") {
      meta.push({ [keyType]: keyName, content });
    }
  }

  return meta;
}
