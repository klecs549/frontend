"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus, X } from "lucide-react";
import { createProjectApi } from "@/lib/api";
import { ErrorAlert } from "@/components/ErrorAlert";

export function ProjectForm({ onCreated }: { onCreated: () => void }) {
  const [form, setForm] = useState({ name: "", description: "" });
  const [placeInput, setPlaceInput] = useState("");
  const [places, setPlaces] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addPlace = () => {
    const id = placeInput.trim();
    if (!id) return;
    if (places.includes(id)) return;
    if (places.length >= 10) {
      setError("Maximum 10 places allowed");
      return;
    }
    setPlaces((p) => [...p, id]);
    setPlaceInput("");
  };

  const removePlace = (id: string) => {
    setPlaces((p) => p.filter((x) => x !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setError("Project name is required");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      await createProjectApi({
        name: form.name,
        description: form.description || null,
        places: places.map((id) => ({ external_id: id })),
      });

      setForm({ name: "", description: "" });
      setPlaces([]);
      onCreated();
    } catch (err: any) {
      setError(err.message || "Unexpected error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">Add Travel Project</h2>

        {error && <ErrorAlert message={error} />}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Project Name *</label>
            <Input
              placeholder="Paris Art Trip"
              value={form.name}
              onChange={(e) =>
                setForm((f) => ({ ...f, name: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              placeholder="Optional notes about the trip..."
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
            />
          </div>

          {/* Places input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Add Place (external ID)</label>
            <div className="flex gap-2">
              <Input
                placeholder="e.g. 129884"
                value={placeInput}
                onChange={(e) => setPlaceInput(e.target.value)}
              />
              <Button type="button" variant="secondary" onClick={addPlace}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Places chips */}
          {places.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {places.map((id) => (
                <span
                  key={id}
                  className="flex items-center gap-1 rounded-full bg-slate-200 px-3 py-1 text-sm"
                >
                  {id}
                  <button type="button" onClick={() => removePlace(id)}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          <Button
            type="submit"
            disabled={submitting}
            className="w-full rounded-2xl"
          >
            {submitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create Project
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}