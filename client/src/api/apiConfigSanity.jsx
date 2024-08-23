import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "baifi3a2",
  dataset: "production",
  apiVersion: "2022-03-07",
  useCdn: true,
  token:
    "skz1bVzlzukMbj59DG47fNpkW9gj60fumjXKIaBmieL7dzcQkHVLXyRBJaqnbKbO0ZOxCMcG21JoyCeLPeToOn8MhPcP3mUbrqnQhie0bmCmHoPElscPYYJC5de6zP2M8ZzCD5uxdsfxdVNQzQHFzk9aDAPQZQxht15AB3fYbvvnmOwSHOLS",
});
