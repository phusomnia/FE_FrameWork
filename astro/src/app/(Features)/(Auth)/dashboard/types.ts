import React from "react";

type AuthProviderProps = {
    roleAllowed: String,
    url:         String
    children:    React.ReactNode
}

type AuthRequest = {
    token:       String,
    roleAllowed: String,
    url:         String
}

export type {
    AuthProviderProps,
    AuthRequest
}