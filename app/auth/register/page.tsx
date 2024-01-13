"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import useAuth from "@/hooks/useAuth"
import { Button, buttonVariants } from "@/components/ui/button"
import ControlledInput from "@/components/form/controlled-input"

type Props = {}

const signupSchema = z
  .object({
    firstName: z.string().min(2, "Name must be at least 2 characters"),
    lastName: z.string().min(2, "Last Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    repeat_password: z.string(),
  })
  .refine((data) => data.password === data.repeat_password, {
    message: "Passwords don't match",
    path: ["repeat_password"],
  })

type SignupForm = z.infer<typeof signupSchema>

const RegisterIndex = (props: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  })

  const auth = useAuth()

  const onSubmit = async (data: SignupForm) => {
    auth.singup(data)
  }

  return (
    <section className=" w-full max-w-[500px] rounded-md p-3 md:border md:p-10 lg:p-20">
      <h1 className="mb-10 text-center text-2xl">Sign up</h1>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-2"
      >
        <ControlledInput
          control={control}
          label="Name"
          name="firstName"
          errors={errors}
        />
        <ControlledInput
          control={control}
          label="Last Name"
          name="lastName"
          errors={errors}
        />
        <ControlledInput
          label="Email"
          control={control}
          name="email"
          errors={errors}
        />
        <ControlledInput
          label="Password"
          control={control}
          name="password"
          errors={errors}
          inputProps={{ type: "password" }}
        />
        <ControlledInput
          label="Repeat Password"
          control={control}
          name="repeat_password"
          errors={errors}
          inputProps={{ type: "password" }}
        />
        <Button
          variant="default"
          className="mt-5"
          onClick={handleSubmit(onSubmit)}
        >
          Sign up
        </Button>
      </form>

      <div className="my-7 h-2 border-b"></div>
      <div className=" flex justify-center">
        <Link
          href="/auth/login"
          className={buttonVariants({ variant: "link" })}
        >
          Sign in
        </Link>
      </div>
    </section>
  )
}

export default RegisterIndex
