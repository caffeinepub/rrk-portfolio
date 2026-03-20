/* eslint-disable */

// @ts-nocheck

import type { ActorMethod } from '@icp-sdk/core/agent';
import type { IDL } from '@icp-sdk/core/candid';
import type { Principal } from '@icp-sdk/core/principal';

export type UserRole = { 'admin' : null } | { 'user' : null } | { 'guest' : null };

export interface ContactMessage {
  id: bigint;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: bigint;
}

export interface _SERVICE {
  submitContactMessage: ActorMethod<[string, string, string, string], bigint>;
  getContactMessages: ActorMethod<[], ContactMessage[]>;
  _initializeAccessControlWithSecret: ActorMethod<[string], undefined>;
  getCallerUserRole: ActorMethod<[], UserRole>;
  isCallerAdmin: ActorMethod<[], boolean>;
  assignCallerUserRole: ActorMethod<[Principal, UserRole], undefined>;
}
export declare const idlService: IDL.ServiceClass;
export declare const idlInitArgs: IDL.Type[];
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
