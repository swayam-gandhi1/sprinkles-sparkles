import type { ReactNode } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type ScriptNoteProps = {
  children: ReactNode;
  className?: string;
  as?: "p" | "span";
  heart?: boolean;
};

/** Hand-lettered brand note, echoing the script in the logo. */
export function ScriptNote({ children, className, as: Tag = "p", heart = true }: ScriptNoteProps) {
  return (
    <Tag className={cn("font-script leading-tight font-bold text-primary-strong", className)}>
      {children}
      {heart ? (
        <Heart aria-hidden strokeWidth={2.5} className="ml-1.5 inline-block size-[0.6em] -rotate-12 align-baseline" />
      ) : null}
    </Tag>
  );
}
