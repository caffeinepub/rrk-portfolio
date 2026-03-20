import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;

export interface ContactMessage {
    id: bigint;
    name: string;
    email: string;
    subject: string;
    message: string;
    timestamp: bigint;
}

export interface backendInterface {
    submitContactMessage(name: string, email: string, subject: string, message: string): Promise<bigint>;
    getContactMessages(): Promise<ContactMessage[]>;
    _initializeAccessControlWithSecret(userSecret: string): Promise<void>;
    getCallerUserRole(): Promise<{ __kind__: "Admin" } | { __kind__: "User" } | { __kind__: "None" }>;
    isCallerAdmin(): Promise<boolean>;
    assignCallerUserRole(user: Principal, role: { __kind__: "Admin" } | { __kind__: "User" } | { __kind__: "None" }): Promise<void>;
}
