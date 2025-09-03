import { cn } from "@/lib/utils";
import React, { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneLight as lightStyle,
  dracula as darkStyle,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { useTheme } from "next-themes";
import type { PluggableList } from "unified";

export interface MarkdownProps {
  children?: string;
  className?: string;
  katex?: boolean;
}

export default function Markdown(props: MarkdownProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const classes = useMemo(() => {
    const classes = ["prose", "dark:prose-invert", "max-w-full"];

    if (props.className) {
      classes.push(props.className);
    }

    return classes;
  }, [props.className]);

  const content = useMemo(() => {
    return props.children || "";
  }, [props.children]);

  const elem = useMemo(() => {
    const remarkPlugins: PluggableList = [remarkGfm];
    const rehypePlugins: PluggableList = [];

    if (props.katex === true) {
      remarkPlugins.push(remarkMath);
      rehypePlugins.push(rehypeKatex);
    }

    return (
      <div className={classes.join(" ")}>
        <ReactMarkdown
          remarkPlugins={remarkPlugins}
          rehypePlugins={rehypePlugins}
          components={{
            code(props) {
              const { children, className, ...rest } = props;
              const match = /language-(\w+)/.exec(className || "");
              const code = String(children).replace(/\n$/, "");

              const syntaxHighlighterProps = {
                PreTag: "div" as const,
                language: match?.[1] || "text",
                style: isDark ? darkStyle : lightStyle,
                ...Object.fromEntries(
                  Object.entries(rest).filter(
                    ([key]) =>
                      !["ref", "key", "onTransitionStartCapture"].includes(key),
                  ),
                ),
              };

              return match ? (
                <div className="highlight p-0 overflow-hidden">
                  <SyntaxHighlighter {...syntaxHighlighterProps}>
                    {code}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code className={cn("unknown", className)} {...rest}>
                  {children}
                </code>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    );
  }, [content, props.katex, classes, isDark]);

  return elem;
}
