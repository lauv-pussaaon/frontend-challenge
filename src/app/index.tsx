import SearchCities from "./_components/SearchCities";
import SelectedCities from "./_components/SelectedCities";
import TemperatureUnitOptions from "./_components/TemperatureUnitOptions";

export default function Index() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-4 p-4">
      <h1 className="text-4xl font-bold text-center flex-2">Have a Good Weather Day!</h1>
      <SearchCities />
      <div className="flex justify-end w-full"><TemperatureUnitOptions /></div>
      <SelectedCities />
    </main>
  )
}