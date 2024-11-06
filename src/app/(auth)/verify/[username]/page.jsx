"use client";
import { useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { verifySchema } from "@/validation/verifySchema";

const Verify = () => {
  const { username } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  // Form validation

  const form = useForm({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  });
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await axios.post("/api/verify-code", {
        username: username,
        code: data.code,
      });
      toast.success(res.data.message);
      router.replace(`/signin`);
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error("Network error: No response received");
      } else {
        toast.error("Error in verification");
      }
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Verify your account
          </h1>
          <p className="mb-4">Enter the verification code sent to your email</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input placeholder="6 digit verification code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-6 h-6" /> verifying{" "}
                </>
              ) : (
                "Verify code"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Verify;
