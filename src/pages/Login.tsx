import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchUserCreate } from "@/services/login.service";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export type LoginForm = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

export default function Login() {
  const navigate = useNavigate();
  const TOKEN = localStorage.getItem("token");

  if (TOKEN) {
    navigate({ to: "/" });
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<LoginForm>();

  const password = watch("password", "");

  const onSubmit = async (data: LoginForm) => {
    const res = await fetchUserCreate(data);
    if (res?.status === 1) {
      localStorage.setItem("token", res?.token);
      toast.success("Успішний логін");
      navigate({ to: "/" });
      reset();
    } else {
      toast.error(res?.error.code || "помилка");
    }
  };

  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center ">
      <p className="w-[600px]">
        Тут не робив якоїсь складної логіки бо в тз не було вказано, що треба
        логін. Але потрібно отримати токен для запросів. Тому простенька
        <strong> реестрація</strong> для отримання токену (завжди унікальний
        імейл):
      </p>
      <form
        className="w-[300px] flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label htmlFor="email">Імейл</label>
          <Input
            id="email"
            type="email"
            className={errors.email && "border-red-500"}
            {...register("email", { required: "email" })}
          />
        </div>

        <div>
          <label htmlFor="name">Ім'я</label>
          <Input
            id="name"
            type="text"
            className={errors.name && "border-red-500"}
            {...register("name", { required: "name" })}
          />
        </div>

        <div>
          <label htmlFor="password">Пароль</label>
          <Input
            id="password"
            type="text"
            className={errors.password && "border-red-500"}
            {...register("password", { required: "password" })}
          />
        </div>

        <div>
          <label htmlFor="confirmPassword">Підтвердіть пароль</label>
          <Input
            id="confirmPassword"
            type="text"
            className={errors.confirmPassword && "border-red-500"}
            {...register("confirmPassword", {
              required: "confirmPassword",
              validate: (value) =>
                value === password || "Паролі не співпадають",
            })}
          />
        </div>
        <Button className="mt-2 cursor-pointer" type="submit">
          Увійти
        </Button>
      </form>
    </div>
  );
}
