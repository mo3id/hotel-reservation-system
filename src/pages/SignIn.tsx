import { Formik, Form } from "formik";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { FormInput } from "@/components/FormInput";
import { useLogin } from "@/hooks/useLogin";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/slices/authSlice";
import { toast } from "react-toastify";
import type { LoginValues } from "@/types/types";
import { loginSchema } from "@/validations/schemas";

export const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const handleSubmit = async (values: LoginValues) => {
    try {
      const user = await loginMutation.mutateAsync(values);
      dispatch(loginSuccess(user));
      toast.success("Login successful! 🎉");
      navigate("/");
    } catch (error) {
      const err =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(err || "Invalid email or password ❌");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <Card className="w-full max-w-md shadow-md border border-blue-100 bg-gray-50">
        <CardHeader className="text-center space-y-1">
          <div className="flex justify-center">
            <img
              src="/images/stayEase.png"
              alt="StayEase"
              className="h-8 w-8"
            />
          </div>
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Welcome Back
          </CardTitle>
          <p className="text-gray-500 text-sm">
            Sign in to your account to continue
          </p>
        </CardHeader>

        <CardContent>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <FormInput
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="john.doe@example.com"
                />
                <FormInput
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                />

                <Button
                  type="submit"
                  className="w-full bg-black hover:bg-gray-900 text-white"
                  disabled={isSubmitting || loginMutation.isPending}
                >
                  {loginMutation.isPending ? "Signing in..." : "Sign In"}
                </Button>

                <div className="text-center text-sm text-gray-500">
                  Don't have an account?{" "}
                  <Link
                    to="/auth/signup"
                    className="text-blue-600 hover:underline"
                  >
                    Sign up
                  </Link>
                </div>

                <div className="bg-gray-100 p-3 rounded-md text-sm text-gray-600 mt-4">
                  <p className="font-semibold mb-1">Demo Credentials:</p>
                  <p>Email: user@example.com</p>
                  <p>Password: 123456</p>
                </div>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
};
