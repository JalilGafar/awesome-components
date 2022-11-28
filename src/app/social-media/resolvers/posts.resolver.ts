import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Post } from "src/app/core/models/post.model";
import { PostService } from "../services/post.service";


@Injectable()
export class PostResolver implements Resolve<Post[]> {
    constructor(private postService: PostService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.postService.getPosts();
    }
}