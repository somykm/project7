export interface Post{
  id:string;
  description:string;
  imageUrl?:string;
  videoUrl?:string;
  audioUrl?:string;
  createdAt:Date;
  updatedAt:Date;
}