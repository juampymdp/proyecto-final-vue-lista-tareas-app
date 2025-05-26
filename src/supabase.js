import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://czhbybhkhkfifpnzcphs.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6aGJ5YmhraGtmaWZwbnpjcGhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2OTYwMDUsImV4cCI6MjA2MzI3MjAwNX0.FHebd1NfTkHldaCewEBzNpIxcU8XGb0EsqiQBpQzHys'

export const supabase = createClient(supabaseUrl, supabaseKey)

