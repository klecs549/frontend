"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export function ProjectCard({ project }: { project: any }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="space-y-2 p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{project.name}</h3>
            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${
                project.completed
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {project.completed ? "Completed" : "Active"}
            </span>
          </div>

          {project.description && (
            <p className="text-sm text-slate-600">{project.description}</p>
          )}

          <p className="text-xs text-slate-500">
            Places: {project.places?.length ?? 0}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}