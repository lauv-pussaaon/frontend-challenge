import Image from "next/image";
import SearchDialog from "./_components/SearchDialog";
import SelectedWeathers from "./_components/SelectedCities";
import TemperatureUnitOptions from "./_components/TemperatureUnitOptions";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-4 p-4">
      <h1 className="text-4xl font-bold text-center flex-2">Have a Good Weather Day!</h1>      
      <SearchDialog />
      <div className="flex justify-end w-full"><TemperatureUnitOptions /></div>
      <SelectedWeathers />
    </main>
  );
}
