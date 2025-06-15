import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { authUserQueryOptions } from "@/hooks/use-auth-hooks";
import { useAppForm } from "@/hooks/demo.form";
import { loginSchema } from "@/schemas/auth";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Shield } from "lucide-react";

export const Route = createFileRoute("/_authentication/login")({
  component: RouteComponent,
});
function RouteComponent() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useAppForm({
    defaultValues: {
      kullaniciAdi: "",
      parola: "",
    },
    validators: {
      onChange: loginSchema,
    },
    onSubmit: async ({ value }) => {
      await queryClient.invalidateQueries(authUserQueryOptions);
      localStorage.setItem(
        "accessToken",
        !Math.round(Math.random()) ? "1" : "2"
      );
      router.navigate({ to: "/" });
    },
  });

  return (
    <Card className="w-full h-full rounded-none border-0 shadow-none">
      <div className="flex flex-col justify-center h-full px-8 py-12">
        <CardHeader className="space-y-1 pb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Shield className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center text-gray-900">
            Güvenli Giriş
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Hesabınıza giriş yapmak için bilgilerinizi girin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-6"
          >
            <form.AppField name="kullaniciAdi">
              {(field) => <field.TextField label="Kullanıcı Adı" />}
            </form.AppField>

            <form.AppField name="parola">
              {(field) => <field.TextField label="Parola" />}
            </form.AppField>

            <div className="flex justify-end">
              <form.AppForm>
                <form.SubscribeButton label="Submit" />
              </form.AppForm>
            </div>
          </form>
        </CardContent>
      </div>
    </Card>
  );
}
