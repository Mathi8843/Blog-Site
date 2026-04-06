import { SearchClient } from "@/components/SearchClient";

export const metadata = {
  title: "Search logs",
};

export default function SearchPage() {
  return (
    <div>
      <h1 className="font-mono text-2xl font-semibold text-zinc-50">Search</h1>
      <p className="mt-3 text-sm text-zinc-500">Find a day by topic, tool, or keyword.</p>
      <div className="mt-10">
        <SearchClient />
      </div>
    </div>
  );
}
