"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";

export default function RegisterPage() {

  const router = useRouter();

  const { refreshUser } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);

  const register = async () => {

    if (
      !form.name ||
      !form.email ||
      !form.password
    ) {

      toast.error(
        "All fields are required"
      );

      return;
    }

    if (
      form.password !==
      form.confirmPassword
    ) {

      toast.error(
        "Passwords do not match"
      );

      return;
    }

    setLoading(true);

    try {

      const res = await api.post(
        "/register",
        {
          name: form.name,
          email: form.email,
          password: form.password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      api.defaults.headers.common.Authorization =
        `Bearer ${res.data.token}`;

      await refreshUser();

      toast.success(
        "Account created successfully"
      );

      window.location.href = "/";

    } catch (err) {

      toast.error(
        err?.response?.data?.message ||
        "Register failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="relative min-h-screen overflow-hidden bg-black">

      {/* ================================= */}
      {/* IMAGINARY CYBER WORLD */}
      {/* ================================= */}

      <div className="absolute inset-0 overflow-hidden">

        {/* MAIN BASE */}
        <div className="absolute inset-0 bg-[#020617]" />

        {/* GIANT GLOW */}
        <div
          className="
            absolute
            top-[-20%]
            left-1/2
            -translate-x-1/2
            w-[900px]
            h-[900px]
            rounded-full
            bg-cyan-500/10
            blur-[180px]
          "
        />

        {/* LEFT PLANET */}
        <div
          className="
            absolute
            -left-40
            top-20
            w-[420px]
            h-[420px]
            rounded-full
            bg-gradient-to-br
            from-cyan-400/20
            via-blue-500/10
            to-transparent
            blur-2xl
            opacity-80
          "
        />

        {/* RIGHT PLANET */}
        <div
          className="
            absolute
            -right-32
            bottom-10
            w-[500px]
            h-[500px]
            rounded-full
            bg-gradient-to-br
            from-blue-500/20
            via-cyan-400/10
            to-transparent
            blur-3xl
            opacity-80
          "
        />

        {/* CYBER HORIZON */}
        <div
          className="
            absolute
            bottom-0
            left-0
            w-full
            h-[45%]
            bg-gradient-to-t
            from-cyan-500/[0.07]
            to-transparent
          "
        />

        {/* GRID */}
        <div
          className="
            absolute
            bottom-[-10%]
            left-1/2
            -translate-x-1/2
            w-[180%]
            h-[60%]
            opacity-20
            perspective-[1200px]
            rotate-x-[75deg]
          "
        >

          <div
            className="
              w-full
              h-full
              bg-[linear-gradient(rgba(0,255,255,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.25)_1px,transparent_1px)]
              bg-[size:70px_70px]
            "
          />

        </div>

        {/* CYBER RINGS */}
        <div
          className="
            absolute
            top-[15%]
            left-[12%]
            w-40
            h-40
            rounded-full
            border
            border-cyan-400/20
            animate-spin
            [animation-duration:20s]
          "
        />

        <div
          className="
            absolute
            bottom-[20%]
            right-[15%]
            w-52
            h-52
            rounded-full
            border
            border-blue-400/20
            animate-spin
            [animation-duration:28s]
          "
        />

        {/* LIGHT BEAMS */}
        <div
          className="
            absolute
            top-0
            left-[20%]
            w-px
            h-full
            bg-gradient-to-b
            from-transparent
            via-cyan-400/30
            to-transparent
            blur-sm
          "
        />

        <div
          className="
            absolute
            top-0
            right-[25%]
            w-px
            h-full
            bg-gradient-to-b
            from-transparent
            via-blue-400/30
            to-transparent
            blur-sm
          "
        />

        {/* FLOATING LIGHTS */}
        <div className="absolute top-[12%] left-[30%] w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_30px_#00d9ff]" />
        <div className="absolute top-[25%] right-[28%] w-3 h-3 rounded-full bg-blue-300 shadow-[0_0_35px_#2563eb]" />
        <div className="absolute bottom-[22%] left-[18%] w-2 h-2 rounded-full bg-cyan-200 shadow-[0_0_25px_#67e8f9]" />
        <div className="absolute bottom-[15%] right-[35%] w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_35px_#00d9ff]" />

      </div>

      {/* ================================= */}
      {/* REGISTER CONTAINER */}
      {/* ================================= */}

      <div className="relative z-20 flex items-center justify-center min-h-screen px-4">

        <div className="relative w-full max-w-md">

          {/* ================================= */}
          {/* AVATAR */}
          {/* ================================= */}

          <div className="relative flex justify-center z-30 mb-[-52px]">

            {/* GLOW */}
            <div
              className="
                absolute
                top-1/2
                left-1/2
                -translate-x-1/2
                -translate-y-1/2
                w-44
                h-44
                rounded-full
                bg-cyan-400/20
                blur-[80px]
                animate-pulse
              "
            />

            {/* RING */}
            <div
              className="
                relative
                w-32
                h-32
                rounded-full
                p-[2px]
                bg-gradient-to-br
                from-cyan-300
                via-blue-500
                to-cyan-200
                shadow-[0_0_60px_rgba(0,183,255,0.55)]
              "
            >

              <div
                className="
                  relative
                  w-full
                  h-full
                  rounded-full
                  overflow-hidden
                  bg-[#020617]
                  border
                  border-white/10
                "
              >

                {/* GRID */}
                <div
                  className="
                    absolute
                    inset-0
                    opacity-20
                    bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)]
                    bg-[size:14px_14px]
                  "
                />

                {/* AVATAR */}
                <img
                  src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
                  alt="Avatar"
                  className="
                    relative
                    z-10
                    w-full
                    h-full
                    object-cover
                    scale-110
                  "
                />

              </div>

            </div>

          </div>

          {/* ================================= */}
          {/* REGISTER CARD */}
          {/* ================================= */}

          <div
            className="
              relative
              overflow-hidden
              rounded-[36px]
              border
              border-cyan-400/20
              bg-white/[0.04]
              backdrop-blur-2xl
              shadow-[0_0_80px_rgba(0,183,255,0.12)]
              px-7
              pt-24
              pb-8
            "
          >

            {/* CARD GLOW */}
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-br
                from-cyan-500/10
                via-transparent
                to-blue-500/10
                pointer-events-none
              "
            />

            {/* LOGO */}
            <div className="flex justify-center mb-8">

              <Image
                src="/images/Header.png"
                alt="Logo"
                width={220}
                height={100}
                className="w-48 h-auto object-contain"
              />

            </div>

            {/* NAME */}
            <div className="mb-4">

              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                className="
                  w-full
                  h-14
                  rounded-2xl
                  border
                  border-cyan-400/10
                  bg-white/[0.03]
                  px-5
                  text-white
                  placeholder:text-gray-500
                  outline-none
                  focus:border-cyan-400/40
                  focus:bg-white/[0.05]
                  transition-all
                "
              />

            </div>

            {/* EMAIL */}
            <div className="mb-4">

              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                className="
                  w-full
                  h-14
                  rounded-2xl
                  border
                  border-cyan-400/10
                  bg-white/[0.03]
                  px-5
                  text-white
                  placeholder:text-gray-500
                  outline-none
                  focus:border-cyan-400/40
                  focus:bg-white/[0.05]
                  transition-all
                "
              />

            </div>

            {/* PASSWORD */}
            <div className="relative mb-4">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Password"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                className="
                  w-full
                  h-14
                  rounded-2xl
                  border
                  border-cyan-400/10
                  bg-white/[0.03]
                  px-5
                  pr-14
                  text-white
                  placeholder:text-gray-500
                  outline-none
                  focus:border-cyan-400/40
                  focus:bg-white/[0.05]
                  transition-all
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="
                  absolute
                  right-5
                  top-1/2
                  -translate-y-1/2
                  text-cyan-300
                "
              >
                {showPassword
                  ? <EyeOff size={18} />
                  : <Eye size={18} />}
              </button>

            </div>

            {/* CONFIRM PASSWORD */}
            <div className="relative mb-6">

              <input
                type={
                  showConfirm
                    ? "text"
                    : "password"
                }
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({
                    ...form,
                    confirmPassword:
                      e.target.value,
                  })
                }
                className="
                  w-full
                  h-14
                  rounded-2xl
                  border
                  border-cyan-400/10
                  bg-white/[0.03]
                  px-5
                  pr-14
                  text-white
                  placeholder:text-gray-500
                  outline-none
                  focus:border-cyan-400/40
                  focus:bg-white/[0.05]
                  transition-all
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirm(
                    !showConfirm
                  )
                }
                className="
                  absolute
                  right-5
                  top-1/2
                  -translate-y-1/2
                  text-cyan-300
                "
              >
                {showConfirm
                  ? <EyeOff size={18} />
                  : <Eye size={18} />}
              </button>

            </div>

            {/* REGISTER BUTTON */}
            <button
              onClick={register}
              disabled={loading}
              className="
                relative
                overflow-hidden
                w-full
                h-14
                rounded-2xl
                bg-gradient-to-r
                from-cyan-500
                via-blue-500
                to-cyan-400
                text-white
                font-semibold
                shadow-[0_0_45px_rgba(0,183,255,0.45)]
                hover:scale-[1.01]
                transition-all
                disabled:opacity-60
              "
            >

              <div
                className="
                  absolute
                  inset-0
                  bg-white/10
                  opacity-0
                  hover:opacity-100
                  transition
                "
              />

              <span className="relative z-10 flex items-center justify-center gap-2">

                {loading && (

                  <span
                    className="
                      w-4
                      h-4
                      border-2
                      border-white
                      border-t-transparent
                      rounded-full
                      animate-spin
                    "
                  />

                )}

                {loading
                  ? "Creating Account..."
                  : "Create Account"}

              </span>

            </button>

            {/* LOGIN */}
            <button
              onClick={() =>
                router.push("/login")
              }
              className="
                mt-5
                text-sm
                text-cyan-300/80
                hover:text-cyan-200
                transition
                w-full
                text-center
              "
            >
              Already have an account?
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}