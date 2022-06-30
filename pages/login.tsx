/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAuth from "../hooks/useAuth";

interface Inputs {
  email: string;
  password: string;
}

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email.")
    .required("Email is required."),
  password: yup
    .string()
    .required("Password is required.")
    .min(8, "Password must be at least 8 characters."),
});

const Login = () => {
  const [login, setLogin] = useState(false);
  const {signIn, signUp, error} = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(loginSchema) });

  const onSubmit: SubmitHandler<Inputs> = async ({email, password}) => {
    if(login) {
      await signIn(email, password);

    }else{
      await signUp(email, password);
    }
  };

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Netflix - Login</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Image
        src="https://res.cloudinary.com/linh-asm/image/upload/v1656054334/netflix/netflixbannerjpg_mzepsi.jpg"
        alt="banner"
        layout="fill"
        objectFit="cover"
        className="-z-10 !hidden opacity-60 sm:!inline"
      />
      <img
        src="https://res.cloudinary.com/linh-asm/image/upload/v1654265063/netflix/Netflix_2015_logo_qyy4ox.svg"
        alt=""
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        width={150}
        height={150}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              className="input"
            />
            {errors.email && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                {errors.email.message}
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="input"
            />
            {errors.password && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                {errors.password.message}
              </p>
            )}
          </label>
        </div>

        <button
          onClick={() => setLogin(true)}
          className="w-full rounded bg-[#e50914] py-3 font-semibold"
        >
          Sign In
        </button>

        <div>
          {
            error && <p className="p-1 text-[13px] font-light text-orange-500">{error}</p>
          }
        </div>

        <div className="text-[gray]">
          New to Netflix?{" "}
          <button type="submit" className="text-white hover:underline" onClick={() => setLogin(false)}>
            Sign up now
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
