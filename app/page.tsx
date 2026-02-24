"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ErrorAlert } from "@/components/ErrorAlert";
import { ProjectForm } from "@/components/ProjectForm";
import { ProjectsList } from "@/components/ProjectsList";
import { fetchProjectsApi } from "@/lib/api";

export default function TravelProjectsDashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await fetchProjectsApi();
      setProjects(data);
    } catch (err: any) {
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold"
        >
          Travel Projects
        </motion.h1>

        {error && <ErrorAlert message={error} />}

        <ProjectForm onCreated={loadProjects} />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Travel Projects</h2>
          <ProjectsList projects={projects} loading={loading} />
        </div>
      </div>
    </div>
  );
}