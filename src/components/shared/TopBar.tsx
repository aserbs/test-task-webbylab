import { useMovies } from "@/hooks/useMovies";
import { Button } from "../ui/button";

type Props = {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TopBar({ setIsFormOpen }: Props) {
  const { search, handleSearchChange } = useMovies();
  return (
    <header className="p-3 w-full flex gap-2 items-center justify-between bg-secondary">
      <input
        type="text"
        value={search}
        placeholder="Пошук за назвою або ім'ям актора..."
        onChange={handleSearchChange}
        className="px-2 py-1 border rounded border-primary w-[30%]"
      />
      <div className="flex gap-2">
        <Button onClick={() => setIsFormOpen(true)}>Додати фільм</Button>
        <Button variant="secondary" className="border border-primary">
          Імпорт з txt
        </Button>
      </div>
    </header>
  );
}
