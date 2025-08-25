import React from "react";
import { Button } from "~/components/ui/button";
import { Loader } from "lucide-react";

interface LoadingButtonProps {
    label: string;
    isLoading?: boolean;
    className?: string;
    type?: "button" | "submit" | "reset";
}

export function LoadingButton({
    label,
    isLoading = false,
    className = "",
    type = "submit",
}: LoadingButtonProps) {
    return (
        <Button type={type} className={`w-full ${className}`} disabled={isLoading}>
            {isLoading ? <Loader className="animate-spin" /> : label}
        </Button>
    );
}
