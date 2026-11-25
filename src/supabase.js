import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://aowztuilgkbltkpiwiny.supabase.co";
const supabaseKey = "sb_publishable_j38OA1PXQiqK29jGukqTRg_XRLTm-GJ";

export const supabase = createClient(supabaseUrl, supabaseKey);