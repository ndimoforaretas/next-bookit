import ResetPassword from "@/components/user/ResetPassword";

export const metadata = {
  title: "Reset Password",
  description: "Reset your password",
};

interface Props {
  params: {
    token: string;
  };
}

const ResetPasswordPage = ({ params }: Props) => {
  return (
    <div>
      <ResetPassword token={params?.token} />
    </div>
  );
};
export default ResetPasswordPage;
