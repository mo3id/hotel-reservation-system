import { Formik, Form } from "formik";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { FormInput } from "@/components/FormInput";
import { toast } from "react-toastify";
import { useRegister } from "@/hooks/useRegister";
import type { SignupValues } from "@/types/types";
import { signupSchema } from "@/validations/schemas";

export const SignUp = () => {
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const handleSubmit = async (values: SignupValues) => {
    try {
      await registerMutation.mutateAsync({
        name: values.fullName,
        email: values.email,
        password: values.password,
      });

      toast.success("Account created successfully! 🎉");
      navigate("/auth/signin");
    } catch (error) {
      const err =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(err || "Registration failed ❌");
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
            Create an Account
          </CardTitle>
          <p className="text-gray-500 text-sm">
            Join StayEase and start booking your favorite rooms
          </p>
        </CardHeader>

        <CardContent>
          <Formik
            initialValues={{
              fullName: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={signupSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <FormInput
                  label="Full Name"
                  name="fullName"
                  placeholder="John Doe"
                />
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
                <FormInput
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  placeholder="Re-enter your password"
                />

                <Button
                  type="submit"
                  className="w-full bg-black hover:bg-gray-900 text-white"
                  disabled={isSubmitting || registerMutation.isPending}
                >
                  {registerMutation.isPending
                    ? "Creating account..."
                    : "Sign Up"}
                </Button>

                <div className="text-center text-sm text-gray-500">
                  Already have an account?{" "}
                  <Link
                    to="/auth/signin"
                    className="text-blue-600 hover:underline"
                  >
                    Sign in
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
};
