import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const Form = () => {
  const schema = yup.object().shape({
    fullName: yup.string().required("Your full name is required"),
    email: yup.string().email("This email adress is not valid ").required(),
    age: yup
      .number()
      .positive()
      .integer()
      .min(12)
      .required()
      .typeError("This is not a number"),
    password: yup.string().min(4).max(20).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords Don't Match")
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>{errors.fullName?.message}</p>

        <input
          type="text"
          placeholder="Full name.."
          {...register("fullName")}
        />
        <br />
        <p>{errors.email?.message}</p>

        <input type="text" placeholder="Email..." {...register("email")} />
        <br />
        <p>{errors.age?.message}</p>
        <input type="number" placeholder="Age..." {...register("age")} />
        <br />

        <p>{errors.password?.message}</p>

        <input
          type="password"
          placeholder="Password..."
          {...register("password")}
        />
        <br />
        <p>{errors.confirmPassword?.message}</p>

        <input
          type="password"
          placeholder="Confirm password..."
          {...register("confirmPassword")}
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};
