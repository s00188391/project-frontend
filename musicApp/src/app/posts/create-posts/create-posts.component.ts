import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-create-posts',
  templateUrl: './create-posts.component.html',
  styleUrls: ['./create-posts.component.css']
})
export class CreatePostsComponent implements OnInit {

  enteredContent = '';
  enteredTitle = '';
  private mode = 'create';
  private postId: string;
  post: Post;

  constructor(public postsService: PostService, public route: ActivatedRoute) { }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.postsService.addPost(form.value.title, form.value.content);
    } else {
      this.postsService.updatePost(this.postId, form.value.title, form.value.content)
    }

    form.resetForm();
  }



  ngOnInit(): void {
    this.route.paramMap.subscribe((paraMap: ParamMap) => {
      if (paraMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paraMap.get('postId')
        this.postsService.getPost(this.postId).subscribe(postData => {
        this.post = {id: postData._id, title: postData.title, content: postData.content};
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }
}
