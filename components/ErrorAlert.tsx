"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export function ErrorAlert({ message }: { message: string }) {
  return (
    <Card className="border-red-300 bg-red-50">
      <CardContent className="flex items-center gap-2 p-4 text-red-700">
        <AlertCircle className="h-5 w-5" />
        <span>{message}</span>
      </CardContent>
    </Card>
  );
}