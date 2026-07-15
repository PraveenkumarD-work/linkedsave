export type PostType = "text" | "image" | "video" | "document";

export type Label = {
  id: string;
  name: string;
  color: string;
};

export type Post = {
  id: string;
  author_name: string | null;
  author_title: string | null;
  source_url: string | null;
  content: string;
  media_urls: string[];
  post_type: PostType;
  user_comment: string | null;
  is_read: boolean;
  saved_at: string;
  folder_id: string | null;
  labels: Label[];
};

export type Folder = {
  id: string;
  name: string;
};
