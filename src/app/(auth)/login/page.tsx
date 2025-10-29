"use client";

import { CustomerError } from "@/lib/shopify/types";
import Link from "next/link";
import SeoMeta from "@/partials/SeoMeta";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { FormData } from "../sign-up/page";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState<CustomerError[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("/api/customer/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.ok) {
        setErrorMessages([]);
        router.push("/");
      } else {
        const errors = (responseData.errors as CustomerError[]) || [];
        setErrorMessages(errors);
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="row">
          <div className="col-11 sm:col-9 md:col-7 mx-auto">
            <Suspense fallback={null}>
              <SeoMeta title="Login" />
            </Suspense>
            <div className="mb-14 text-center">
              <h2 className="max-md:h1 md:mb-2">Accedi</h2>
              <p className="md:text-lg text-text-light dark:text-darkmode-text-light">
                Inserisci le tue credenziali per accedere al tuo account
              </p>
            </div>

            <form
              onSubmit={handleLogin}
              noValidate
              className="border border-border dark:border-darkmode-border rounded-2xl p-10"
            >
              <div>
                <label htmlFor="email" className="form-label">
                  Indirizzo Email
                </label>
                <input
                  id="email"
                  className={`form-input ${errorMessages.some((e) => e.field?.includes("email")) ? "border-error focus:ring-error/50" : ""}`}
                  placeholder="esempio@email.com"
                  type="email"
                  onChange={handleChange}
                  name="email"
                  value={formData.email}
                  aria-invalid={errorMessages.some((e) =>
                    e.field?.includes("email"),
                  )}
                  aria-describedby={
                    errorMessages.length > 0 ? "login-errors" : undefined
                  }
                  required
                  autoComplete="email"
                />
              </div>

              <div>
                <label htmlFor="password" className="form-label mt-8">
                  Password
                </label>
                <input
                  id="password"
                  className={`form-input ${errorMessages.some((e) => e.field?.includes("password")) ? "border-error focus:ring-error/50" : ""}`}
                  placeholder="Inserisci la tua password"
                  type="password"
                  onChange={handleChange}
                  name="password"
                  value={formData.password}
                  aria-invalid={errorMessages.some((e) =>
                    e.field?.includes("password"),
                  )}
                  aria-describedby={
                    errorMessages.length > 0 ? "login-errors" : undefined
                  }
                  required
                  autoComplete="current-password"
                />
              </div>

              {errorMessages.length > 0 && (
                <div
                  id="login-errors"
                  role="alert"
                  aria-live="polite"
                  className="mt-4 space-y-2"
                >
                  {errorMessages.map((error: CustomerError) => (
                    <p
                      key={error.code}
                      className="font-medium text-error dark:text-darkmode-error text-sm flex items-start gap-2"
                    >
                      <span aria-hidden="true">*</span>
                      <span>
                        {error.code === "UNIDENTIFIED_CUSTOMER"
                          ? error.message
                          : error.message || "Email o password non validi"}
                      </span>
                    </p>
                  ))}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary md:text-lg md:font-medium w-full mt-10 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-darkmode-primary/50 min-h-[44px]"
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? (
                  <>
                    <BiLoaderAlt
                      className="animate-spin mx-auto"
                      size={26}
                      aria-hidden="true"
                    />
                    <span className="sr-only">Accesso in corso...</span>
                  </>
                ) : (
                  "Accedi"
                )}
              </button>
            </form>

            <div className="flex gap-x-2 text-sm md:text-base mt-4">
              <p className="text-text-light dark:text-darkmode-text-light">
                Non hai un account?
              </p>
              <Link
                className="underline font-medium text-primary hover:text-primary_hover dark:text-darkmode-primary dark:hover:text-darkmode-primary_hover transition-colors"
                href={"/sign-up"}
              >
                Registrati
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
