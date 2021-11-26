import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../posts/post.model';
import { PostService } from '../posts/post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{

  //posts = [
    //{title: 'First Post', content: 'This the first post\s content'},
    //{title: 'Second Post', content: 'This the first post\s content'},
    //title: 'THird Post', content: 'This the first post\s content'}
  //];
  posts: Post[] = []
  private postsSub: Subscription;

  constructor(public postsService: PostService) { }

  ngOnInit(): void {
    this.posts = this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}
