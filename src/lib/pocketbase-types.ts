/**
 * This file was @generated using pocketbase-typegen
 */

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
    Users = "users",
    Workspaces = "workspaces",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
    id: RecordIdString
    created: IsoDateString
    updated: IsoDateString
    collectionId: string
    collectionName: Collections
    expand?: T
}

export type AuthSystemFields<T = never> = {
    email: string
    emailVisibility: boolean
    username: string
    verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type UsersRecord = {
    avatar?: string
    name?: string
    workspaces?: RecordIdString[]
}

export type WorkspacesRecord = {
    description?: HTMLString
    members: RecordIdString[]
    name: string
}

// Response types include system fields and match responses from the PocketBase API
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>
export type WorkspacesResponse<Texpand = unknown> = Required<WorkspacesRecord> & BaseSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
    users: UsersRecord
    workspaces: WorkspacesRecord
}

export type CollectionResponses = {
    users: UsersResponse
    workspaces: WorkspacesResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
    collection(idOrName: 'users'): RecordService<UsersResponse>
    collection(idOrName: 'workspaces'): RecordService<WorkspacesResponse>
}
