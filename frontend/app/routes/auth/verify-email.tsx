import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useVerifyEmailMutation } from "@/hooks/use-auth";
import { ArrowLeftIcon, CheckCircleIcon, Loader2, XCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { toast } from "sonner";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();

  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate, isPending: isVerifying } = useVerifyEmailMutation();

  const token = searchParams.get("token");

  useEffect(() => {
    if (token)
      mutate(
        { token },
        {
          onSuccess: () => {
            setIsSuccess(true);
          },
          onError: (err: any) => {
            const errorMessage =
              err?.response?.data?.message || "An error occured";
            setIsSuccess(false);
            console.log(err);
            toast.error(errorMessage);
          },
        }
      );
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Verify Email</h1>
      <p className="text-sm text-gray-500 mb-4">
        {isVerifying
          ? "Verifying your email..."
          : isSuccess
            ? "Email verified"
            : "Email verification failed"}
      </p>
      <Card className="w-full max-w-md">
        {/* <CardHeader> */}
        {/* <Link to="/sign-in" className="flex items-center gap-2 text-sm">
            <ArrowLeftIcon className="w-4 h-4" /> Back to sign in
          </Link> */}
        {/* </CardHeader> */}
        <CardContent>
          <div className="flex flex-col items-center justify-center">
            {isVerifying ? (
              <>
                <Loader2 className="w-10 h-10 text-gray-500 animate-spin" />
                <h3 className="text-lg font-bold">Verifying email...</h3>
                <p className="text-sm text-gray-500">
                  Please wait while we verify your email.
                </p>
              </>
            ) : isSuccess ? (
              <>
                <CheckCircleIcon className="w-10 h-10 text-green-500" />
                <h3 className="text-lg font-bold">Email verified</h3>
                <p className="text-sm text-gray-500">
                  Your email has been verified
                </p>
                <Link to="/sign-in" className="text-sm text-blue-500 mt-6">
                  <Button variant="outline">Back to sign in</Button>
                </Link>
              </>
            ) : (
              <>
                <XCircle className="w-10 h-10 text-red-500" />
                <h3 className="text-lg font-bold">Email verification failed</h3>
                <p className="text-sm text-gray-500">
                  Your email has not been verified. Please try again.
                </p>

                <Link to="/sign-in" className="text-sm text-blue-500 mt-6">
                  <Button variant="outline">Back to sign in</Button>
                </Link>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
