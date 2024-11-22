import PocketBase from "pocketbase";
import type {TypedPocketBase} from "$lib/pocketbase-types";

export const pbURL: string = "https://pb.srello.cbyte.be";
export const pb = new PocketBase(pbURL) as TypedPocketBase;