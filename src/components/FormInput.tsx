import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useField } from "formik";

interface FormInputProps {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
    label,
    name,
    type = "text",
    placeholder,
}) => {
    const [field, meta] = useField(name);

    return (
        <div className="mb-4">
            <Label htmlFor={name} className="text-sm font-medium text-gray-700">
                {label}
            </Label>
            <Input
                id={name}
                {...field}
                type={type}
                placeholder={placeholder}
                className="mt-1"
            />
            {meta.touched && meta.error && (
                <div className="text-red-500 text-sm mt-1">{meta.error}</div>
            )}
        </div>
    );
};
