import { useMovies } from "@/hooks/useMovies";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { movieService } from "@/services/movies.service";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";

type Props = {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: () => void;
};

export default function TopBar({ setIsFormOpen, refresh }: Props) {
  const { search, handleSearchChange } = useMovies();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const file: File = data.movies[0];

    if (file.type !== "text/plain") {
      toast.error("Файл повинен бути з розширенням .txt");
      reset();
      return;
    }

    const form = new FormData();
    form.append("movies", file);

    const res = await movieService.fetchImportTxt(form);
    if (res.status === 1) {
      toast.success("Імпорт успішний!");
      reset();
      refresh();
    } else {
      reset();
      toast.error(res.error.code || "Щось пішло не так");
    }
  };

  return (
    <header className="p-3 w-full flex gap-2 items-center justify-between bg-secondary">
      <Input
        type="text"
        value={search}
        placeholder="Пошук за назвою або ім'ям актора..."
        onChange={handleSearchChange}
        className="w-[30%]"
      />
      <div className="flex gap-2">
        <Button onClick={() => setIsFormOpen(true)}>Додати фільм</Button>
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
          <Input
            type="file"
            className={cn(
              errors.movies && "border-red-500",
              "w-[200px] cursor-pointer"
            )}
            {...register("movies", { required: "Оберіть файл" })}
          />
          <Button
            variant="secondary"
            className="border border-primary cursor-pointer"
            type="submit"
          >
            Імпорт з txt
          </Button>
        </form>
      </div>
    </header>
  );
}
