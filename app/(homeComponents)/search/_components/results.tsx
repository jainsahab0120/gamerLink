import { getSearch } from "@/actions/search-service";
import { ResultCard } from "./result-card";

interface ResultProps {
  term?: string;
}

export const Results = async ({ term }: ResultProps) => {
  const data = await getSearch(term);
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        Return for term &quot;{term}&quot;
      </h2>
      {data.length === 0 && (
        <p className="text-muted-foreground text-sm">
          No results found.Try searching for something else.
        </p>
      )}
      <div className="flex flex-col gap-y-4">
        {data.map((result: any) => (
          <ResultCard data={result} key={result.id} />
        ))}
      </div>
    </div>
  );
};
