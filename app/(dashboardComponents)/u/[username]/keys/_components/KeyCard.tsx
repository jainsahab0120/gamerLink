"use client";

import { Input } from "@/components/ui/input";
import { CopyButton } from "./CopyButton";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface KeyCardProps {
  value: string | null;
}

export default function KeyCard({ value }: KeyCardProps) {
  const [show, setShow] = useState(false);
  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center gap-x-10">
        <p className="font-semibold shrink-0">Stream Key</p>
        <div className="space-y-2 w-full">
          <div className="w-full flex items-center gap-x-2">
            <Input
              type={show ? "text" : "password"}
              value={value || ""}
              disabled
              placeholder="Stream Key"
            />
            <CopyButton value={value || ""} />
          </div>
          <Button onClick={() => setShow(!show)} size="sm" variant="link">
            {show ? "Show" : "Hide"}
          </Button>
        </div>
      </div>
    </div>
  );
}
