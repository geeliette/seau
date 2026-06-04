export type Category = {
    id: string;
    name: string;
    color: string;
    text_color: string;
    created_at: string;
  };
  
  export type BucketItem = {
    id: string;
    title: string;
    category_id: string | null;
    pinned: boolean;
    description: string | null;
    location: string | null;
    duration: string | null;
    link: string | null;
    notes: string | null;
    completed: boolean;
    completed_at: string | null;
    created_at: string;
  };
  
  export type DiaryEntry = {
    id: string;
    title: string;
    body: string | null;
    date: string;
    created_at: string;
  };