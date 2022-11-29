import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Post } from 'src/app/core/models/post.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts$!: Observable<Post[]>;

  name!: { firstName:string, lastName: string};

  constructor(private route: ActivatedRoute,
              private postService: PostService ) { }

  ngOnInit(): void {
    this.posts$ = this.route.data.pipe(
      map(data => data['posts'])
    );

    this.name = {firstName: 'Faonda', lastName: 'Jalil'}

  };

  onPostCommented(postCommented:{ comment: string, postId: number}){
    this.postService.addNewcomment(postCommented);
  }

}
