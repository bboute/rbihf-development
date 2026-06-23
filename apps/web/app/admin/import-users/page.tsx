"use client";

import { useState } from "react";
import { Button } from "@workspace/ui/components/button";

export default function AdminImportUsersPage(): React.JSX.Element {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/csv") {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("csvFile", selectedFile);

    try {
      const response = await fetch("/api/admin/import-users", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Users imported successfully!");
        setSelectedFile(null);
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      alert("An error occurred while importing users");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Bulk Import Users</h1>
      <p className="text-muted-foreground mb-4">
        Import licensed coaches from a CSV file. This will create user accounts
        in Clerk and corresponding records in Supabase.
      </p>
      <div className="bg-muted p-4 rounded-lg mb-6">
        <p className="text-sm">
          CSV file should contain: email, firstName, lastName, club_id
          (optional)
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="csvFile" className="block text-sm font-medium mb-2">
            Select CSV File
          </label>
          <input
            id="csvFile"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-primary file:text-primary-foreground
              hover:file:bg-primary/80"
          />
        </div>

        {selectedFile && (
          <div className="bg-green-50 border border-green-200 rounded-md p-3">
            <p className="text-sm text-green-800">
              Selected file: {selectedFile.name}
            </p>
          </div>
        )}

        <Button
          type="submit"
          disabled={!selectedFile || isUploading}
          className="w-full"
        >
          {isUploading ? "Importing..." : "Import Users"}
        </Button>
      </form>
    </div>
  );
}
