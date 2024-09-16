import { CheckCircledIcon } from "@radix-ui/react-icons";

type FormSuccessProps = {
  message?: string;
};

const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="bg-emerarl-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <CheckCircledIcon className="w-4 h-4" />
      <span>{message}</span>
    </div>
  );
};

export default FormSuccess;
