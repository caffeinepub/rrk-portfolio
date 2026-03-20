/* eslint-disable */

// @ts-nocheck

import { IDL } from '@icp-sdk/core/candid';

const UserRole = IDL.Variant({ 'admin': IDL.Null, 'user': IDL.Null, 'guest': IDL.Null });

const ContactMessage = IDL.Record({
  'id': IDL.Nat,
  'name': IDL.Text,
  'email': IDL.Text,
  'subject': IDL.Text,
  'message': IDL.Text,
  'timestamp': IDL.Int,
});

export const idlService = IDL.Service({
  'submitContactMessage': IDL.Func([IDL.Text, IDL.Text, IDL.Text, IDL.Text], [IDL.Nat], []),
  'getContactMessages': IDL.Func([], [IDL.Vec(ContactMessage)], ['query']),
  '_initializeAccessControlWithSecret': IDL.Func([IDL.Text], [], []),
  'getCallerUserRole': IDL.Func([], [UserRole], ['query']),
  'isCallerAdmin': IDL.Func([], [IDL.Bool], ['query']),
  'assignCallerUserRole': IDL.Func([IDL.Principal, UserRole], [], []),
});

export const idlInitArgs = [];

export const idlFactory = ({ IDL }) => {
  const UserRole = IDL.Variant({ 'admin': IDL.Null, 'user': IDL.Null, 'guest': IDL.Null });
  const ContactMessage = IDL.Record({
    'id': IDL.Nat,
    'name': IDL.Text,
    'email': IDL.Text,
    'subject': IDL.Text,
    'message': IDL.Text,
    'timestamp': IDL.Int,
  });
  return IDL.Service({
    'submitContactMessage': IDL.Func([IDL.Text, IDL.Text, IDL.Text, IDL.Text], [IDL.Nat], []),
    'getContactMessages': IDL.Func([], [IDL.Vec(ContactMessage)], ['query']),
    '_initializeAccessControlWithSecret': IDL.Func([IDL.Text], [], []),
    'getCallerUserRole': IDL.Func([], [UserRole], ['query']),
    'isCallerAdmin': IDL.Func([], [IDL.Bool], ['query']),
    'assignCallerUserRole': IDL.Func([IDL.Principal, UserRole], [], []),
  });
};

export const init = ({ IDL }) => { return []; };
