
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.leads;

-- Validation for NEW rows only (NOT VALID skips existing legacy data)
ALTER TABLE public.leads
  ADD CONSTRAINT leads_full_name_length CHECK (char_length(trim(full_name)) BETWEEN 2 AND 100) NOT VALID,
  ADD CONSTRAINT leads_phone_length CHECK (char_length(trim(phone)) BETWEEN 7 AND 30) NOT VALID,
  ADD CONSTRAINT leads_email_format CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' AND char_length(email) <= 255) NOT VALID,
  ADD CONSTRAINT leads_property_address_length CHECK (char_length(trim(property_address)) BETWEEN 5 AND 300) NOT VALID,
  ADD CONSTRAINT leads_message_length CHECK (message IS NULL OR char_length(message) <= 2000) NOT VALID,
  ADD CONSTRAINT leads_reason_length CHECK (reason IS NULL OR char_length(reason) <= 200) NOT VALID,
  ADD CONSTRAINT leads_timeline_length CHECK (timeline IS NULL OR char_length(timeline) <= 100) NOT VALID,
  ADD CONSTRAINT leads_property_type_length CHECK (property_type IS NULL OR char_length(property_type) <= 100) NOT VALID;

CREATE POLICY "Anonymous can submit valid leads"
ON public.leads
FOR INSERT
TO anon
WITH CHECK (
  char_length(trim(full_name)) BETWEEN 2 AND 100
  AND char_length(trim(phone)) BETWEEN 7 AND 30
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND char_length(email) <= 255
  AND char_length(trim(property_address)) BETWEEN 5 AND 300
  AND (message IS NULL OR char_length(message) <= 2000)
);

ALTER FUNCTION public.enqueue_email(text, jsonb) SET search_path = public, pgmq;
ALTER FUNCTION public.read_email_batch(text, integer, integer) SET search_path = public, pgmq;
ALTER FUNCTION public.delete_email(text, bigint) SET search_path = public, pgmq;
ALTER FUNCTION public.move_to_dlq(text, text, bigint, jsonb) SET search_path = public, pgmq;

REVOKE ALL ON FUNCTION public.enqueue_email(text, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.read_email_batch(text, integer, integer) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.delete_email(text, bigint) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.email_queue_dispatch() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.email_queue_wake() FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) TO service_role;
GRANT EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.delete_email(text, bigint) TO service_role;
GRANT EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) TO service_role;
GRANT EXECUTE ON FUNCTION public.email_queue_dispatch() TO service_role;
GRANT EXECUTE ON FUNCTION public.email_queue_wake() TO service_role;
