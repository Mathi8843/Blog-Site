"use client";

import { Markdown } from "@/components/Markdown";

export function ProjectDescription({ text }: { text: string }) {
  return <Markdown>{text}</Markdown>;
}
