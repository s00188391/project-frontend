import { Post } from "./post.model";
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})

export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{posts: Post[], postCount: number}>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{message: string, posts: any, maxPosts: number}>('http://localhost:3000/songs' + queryParams)
      .pipe(map((postData) => {
        return { posts: postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        }), maxPosts: postData.maxPosts};
      }))
      .subscribe((transformedPostData) => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({ posts: [...this.posts], postCount: transformedPostData.maxPosts
        });
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{_id: string, title: string, content: string}>("http://localhost:3000/songs/" + id)
  }

  addPost(title: string, content: string) {
    const post: Post = {id: null, title: title, content: content}
    this.http.post<{message: string, postId: string}>('http://localhost:3000/songs', post)
    .subscribe((responseData) => {
      this.router.navigate(["/"]);
    });
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = { id: id, title: title, content: content }
    this.http.put("http://localhost:3000/songs/" + id, post)
    .subscribe(response => {
      this.router.navigate(["/"]);
    });
  }

  deletePost(postId: string) {
    return this.http
      .delete("http://localhost:3000/songs/" + postId);
  }
}

