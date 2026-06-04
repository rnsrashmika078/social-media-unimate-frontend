"use client";
import React, { useEffect, useState } from "react";
import { Moon } from "lucide-react";
import { Sun } from "lucide-react";

const Theme = () => {
    const [isDark, setIsDark] = useState<boolean>(false);

    useEffect(() => {
        const root = document.documentElement;

        if (isDark) {
            root.classList.remove("dark");
        } else {
            root.classList.add("dark");
        }
    }, [isDark]);
    return (
        <div
            className="fixed bottom-0 right-0 p-5"
            onClick={() => setIsDark((prev) => !prev)}
        >
            {isDark ? <Sun /> : <Moon />}
        </div>
    );
};

export default Theme;
