ALTER TABLE public.leads
  DROP CONSTRAINT IF EXISTS leads_email_format;

ALTER TABLE public.leads
  ADD CONSTRAINT leads_email_format
  CHECK (
    (email = '' OR email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')
    AND char_length(email) <= 255
  ) NOT VALID;

DROP POLICY IF EXISTS "Anonymous can submit valid leads" ON public.leads;

CREATE POLICY "Anonymous can submit valid leads"
ON public.leads
FOR INSERT
TO anon
WITH CHECK (
  char_length(trim(full_name)) BETWEEN 2 AND 100
  AND char_length(trim(phone)) BETWEEN 7 AND 30
  AND (email = '' OR email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')
  AND char_length(email) <= 255
  AND char_length(trim(property_address)) BETWEEN 5 AND 300
  AND (message IS NULL OR char_length(message) <= 2000)
);

GRANT INSERT ON public.leads TO anon;
GRANT ALL ON public.leads TO service_role;