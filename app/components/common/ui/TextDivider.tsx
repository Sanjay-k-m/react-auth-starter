import React from "react";

interface TextDividerProps {
    label?: string;
}

export const TextDivider = ({ label }: TextDividerProps) => {
    return (
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className=" text-muted-foreground relative z-10">
                {label && <span className="px-2 bg-card">{label}</span>}
            </span>
        </div>
    );
};
