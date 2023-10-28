"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ButtonLoader from "../layout/ButtonLoader";
import toast from "react-hot-toast";
import { useResetPasswordMutation } from "@/redux/api/authApi";

interface Props {
  token: string;
}

const ResetPassword = ({ token }: Props) => {
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const router = useRouter();

  const [resetPassword, { error, isLoading, isSuccess }] =
    useResetPasswordMutation();

  useEffect(() => {
    if (error && "data" in error) {
      toast.error(error?.data?.errMessage);
    }

    if (isSuccess) {
      toast.success("Password reset successfully");
      router.push("/login");
    }
  }, [error, isSuccess]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const passwords = {
      password,
      confirmedPassword,
    };
    console.log(passwords);

    resetPassword({ token, body: passwords });

    // setPassword("");
    // setConfirmedPassword("");
  };

  return (
    <div>
      {" "}
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow rounded bg-body" onSubmit={submitHandler}>
            <h2 className="mb-4">New Password</h2>

            <div className="mb-3">
              <label htmlFor="password_field" className="form-label">
                {" "}
                Password{" "}
              </label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirm_password_field" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm_password_field"
                className="form-control"
                name="confirmPassword"
                value={confirmedPassword}
                onChange={(e) => setConfirmedPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn form-btn w-100 py-2"
              disabled={isLoading}>
              {isLoading ? <ButtonLoader /> : "Set Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ResetPassword;
