import { useForm, Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { movieService } from "@/services/movies.service";
import { toast } from "sonner";
import { useMovies } from "@/hooks/useMovies";
import { motion } from "framer-motion";

type Props = {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: () => void;
};

type NewMovieForm = {
  title: string;
  year: number;
  format: string;
  actors: string;
};

export default function AddFilmForm({ setIsFormOpen, refresh }: Props) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<NewMovieForm>({
    defaultValues: {
      title: "",
      year: 0,
      format: "",
      actors: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (props: NewMovieForm) => {
    const newMovie = {
      ...props,
      actors: props.actors.split(","),
    };
    setIsLoading(true);
    const res = await movieService.fetchCreateMovie(newMovie);
    if (res?.status === 0) {
      setIsLoading(false);
      toast.error(res?.error.code, {
        description: Object.entries(res?.error.fields)
          .map(([key, value]) => `${key}: ${value}`)
          .join(" "),
      });
    } else {
      setIsLoading(false);
      toast.success("Фільм додано");
      refresh();
      reset();
      setIsFormOpen(false);
    }
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    reset();
  };

  return (
    <motion.form
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      onSubmit={handleSubmit(onSubmit)}
      className="p-3 w-[450px] flex flex-col gap-2 border rounded m-3"
    >
      <p className="font-bold">Додати Фільм</p>

      <div className="flex flex-col gap-1">
        <label htmlFor="title">Введіть назву:</label>
        <Input
          type="text"
          id="title"
          placeholder="Назва..."
          className={errors.title && "border-red-500"}
          {...register("title", { required: "Введіть назву" })}
        />
      </div>
      <div className="flex gap-2 ">
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="year">Введіть рік випуску:</label>
          <Input
            type="number"
            id="year"
            placeholder="Рік..."
            className={errors.year && "border-red-500"}
            {...register("year", { required: "Введіть рік" })}
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="year">Оберіть формат:</label>
          <Controller
            name="format"
            control={control}
            rules={{ required: "Оберіть формат" }}
            render={({ field, fieldState }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="format"
                  className={cn(fieldState.error && "border-red-500", "w-full")}
                >
                  <SelectValue placeholder="Формат..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="VHS">VHS</SelectItem>
                    <SelectItem value="DVD">DVD</SelectItem>
                    <SelectItem value="Blu-Ray">Blu-Ray</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="actors">Введіть акторів (вводіть через кому):</label>
        <Input
          id="actors"
          type="text"
          placeholder="Актори..."
          {...register("actors")}
        />
      </div>
      <div className="mt-2 flex gap-2">
        <Button
          className="cursor-pointer flex-1"
          variant={"destructive"}
          onClick={() => handleCancel()}
        >
          Відміна
        </Button>
        <Button
          type="submit"
          className="cursor-pointer flex-3"
          disabled={isLoading}
        >
          Відправити
        </Button>
      </div>
    </motion.form>
  );
}
