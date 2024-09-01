"use client"

import React from "react"
import { SignIn } from "@clerk/nextjs"
import Link from "next/link"

export default function login() {
    return (
        <SignIn></SignIn>
    )
}