"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const subscribe = () => () => {};

export function ThemeToggle({ label = "다크모드 전환" }: { label?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <Button
      aria-label={label}
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      type="button"
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
}
