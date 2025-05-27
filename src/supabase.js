import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qqzjoyhxqkwasmcknwff.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxempveWh4cWt3YXNtY2tud2ZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNzYxODYsImV4cCI6MjA2Mzg1MjE4Nn0.5U4f4n5PPx8bVvVa3sOXBtrw6Y1Zz1pnkzPwA8d2nuA'


export const supabase = createClient(supabaseUrl, supabaseKey)
           
