"use client"

import React from "react"
import { SignIn, SignUp } from "@clerk/nextjs"
import Link from "next/link"

export default function login() {
    return (
        <div className="h-screen flex items-center justify-center">
            <SignUp/>
        </div>
    )
}