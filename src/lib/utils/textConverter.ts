import { slug } from "github-slugger";
import { marked } from "marked";

// slugify
export const slugify = (content: string) => {
  return slug(content);
};

type SafeMarkdownOptions = {
  inline?: boolean;
};

const ALLOWED_PROTOCOLS = new Set(["http:", "https:", "mailto:", "tel:", ""]);

const escapeHtml = (value: unknown): string => {
  // Ensure value is a string before processing
  if (value == null) {
    return "";
  }
  const stringValue = typeof value === "string" ? value : String(value);
  return stringValue
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
};

const sanitizeUrl = (rawHref: unknown): string => {
  if (rawHref == null) {
    return "";
  }

  const hrefAsString = typeof rawHref === "string" ? rawHref : String(rawHref);
  const trimmed = hrefAsString.trim();

  // Allow for same-page anchors
  if (trimmed.startsWith("#")) {
    return trimmed;
  }

  try {
    const url = new URL(trimmed, "https://placeholder.invalid");
    if (!ALLOWED_PROTOCOLS.has(url.protocol)) {
      return "";
    }

    // Preserve relative URLs
    if (!url.protocol || url.origin === "https://placeholder.invalid") {
      return trimmed;
    }

    return url.toString();
  } catch {
    return "";
  }
};

const renderer = new marked.Renderer();

renderer.link = (href, title, text) => {
  const safeHref = sanitizeUrl(href);
  const safeTitle = title ? ` title="${escapeHtml(title)}"` : "";
  const rel =
    safeHref && !safeHref.startsWith("/") && !safeHref.startsWith("#")
      ? ' rel="noreferrer noopener"'
      : "";

  if (!safeHref) {
    return `<span>${escapeHtml(text)}</span>`;
  }

  return `<a href="${safeHref}"${safeTitle}${rel}>${escapeHtml(text)}</a>`;
};

renderer.image = (href, title, text) => {
  const safeSrc = sanitizeUrl(href);
  if (!safeSrc) {
    return "";
  }

  const safeAlt = escapeHtml(text);
  const safeTitle = title ? ` title="${escapeHtml(title)}"` : "";

  return `<img src="${safeSrc}" alt="${safeAlt}"${safeTitle} />`;
};

renderer.html = (html: unknown) => {
  // marked can pass non-string values, ensure we handle them safely
  return escapeHtml(html);
};

const renderMarkdown = (
  content: string,
  options?: SafeMarkdownOptions,
): string => {
  if (!content) {
    return "";
  }

  const trimmed = content.trim();
  if (!trimmed) {
    return "";
  }

  const parseOptions = { renderer, breaks: true, gfm: true } as const;

  return options?.inline
    ? marked.parseInline(trimmed, parseOptions)
    : marked.parse(trimmed, parseOptions);
};

// markdownify
export const markdownify = (content: string, div?: boolean) => {
  const markdownContent = renderMarkdown(content, { inline: !div });
  return { __html: markdownContent };
};

// humanize
export const humanize = (content: string) => {
  return content
    .replace(/^[\s_]+|[\s_]+$/g, "")
    .replace(/[_\s]+/g, " ")
    .replace(/^[a-z]/, function (m) {
      return m.toUpperCase();
    });
};

// titleify
export const titleify = (content: string) => {
  const humanized = humanize(content);
  return humanized
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// plainify
export const plainify = (content: string) => {
  const parseMarkdown = renderMarkdown(content);
  const filterBrackets = parseMarkdown.replace(/<\/?[^>]+(>|$)/gm, "");
  const filterSpaces = filterBrackets.replace(/[\r\n]\s*[\r\n]/gm, "");
  const stripHTML = htmlEntityDecoder(filterSpaces);
  return stripHTML;
};

// strip entities for plainify
const htmlEntityDecoder = (htmlWithEntities: string): string => {
  let entityList: { [key: string]: string } = {
    "&nbsp;": " ",
    "&lt;": "<",
    "&gt;": ">",
    "&amp;": "&",
    "&quot;": '"',
    "&#39;": "'",
  };
  let htmlWithoutEntities: string = htmlWithEntities.replace(
    /(&amp;|&lt;|&gt;|&quot;|&#39;)/g,
    (entity: string): string => {
      return entityList[entity];
    },
  );
  return htmlWithoutEntities;
};
