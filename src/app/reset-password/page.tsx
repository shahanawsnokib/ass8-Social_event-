import ResetPasswordForm from "./reset-password-form";

type ResetPasswordPageProps = {
  searchParams: Promise<{ token?: string; error?: string }>;
};

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const { token, error } = await searchParams;

  return (
    <ResetPasswordForm
      token={token ?? ""}
      hasInvalidToken={error === "INVALID_TOKEN"}
    />
  );
}
