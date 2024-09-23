import { redirect } from "next/navigation";
import { Results } from "./_components/results";

interface SearchPageProps {
  searchParams: {
    term?: string;
  };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  if (!searchParams) redirect("/home");
  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <Results term={searchParams.term} />
    </div>
  );
}
