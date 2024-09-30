import SearchCities from "./_components/SearchCities";
import SelectedCities from "./_components/SelectedCities";

export default function Index() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-4 p-4">
      <h1 className="text-4xl font-bold text-center flex-2">Have a Good Weather Day!</h1>
      <SearchCities />
      <SelectedCities />
    </main>
  )
}