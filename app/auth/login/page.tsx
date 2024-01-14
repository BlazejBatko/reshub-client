"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import * as z from "zod"

import useAuth from "@/hooks/useAuth"
import { Button, buttonVariants } from "@/components/ui/button"
import ControlledInput from "@/components/form/controlled-input"

type Props = {}

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

type LoginPayload = z.infer<typeof loginSchema>

const LoginIndex = (props: Props) => {
  const auth = useAuth()

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginPayload>({})

  const onSubmit = (data: LoginPayload) => {
    auth.signin(data)
  }

  return (
    <section className=" w-full max-w-[500px] rounded-md p-3 md:border md:p-10 lg:p-20">
      <h1 className="mb-10 text-center text-4xl">Sign in</h1>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-3"
      >
        <ControlledInput
          control={control}
          errors={errors}
          name="email"
          placeholder="Email"
          label="Email"
          inputProps={{
            type: "email",
          }}
        />

        <ControlledInput
          control={control}
          errors={errors}
          name="password"
          placeholder="Password"
          label="Password"
          inputProps={{
            type: "password",
          }}
        />
        <Button variant="default" className="mt-5">
          Sign in
        </Button>
      </form>

      <div className="my-7 h-2 border-b"></div>
      <div className=" flex justify-center">
        <Link
          href="/auth/register"
          className={buttonVariants({ variant: "link" })}
        >
          Sign up instead
        </Link>
      </div>
    </section>
  )
}

export default LoginIndex
