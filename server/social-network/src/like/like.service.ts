import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Repository } from 'typeorm';
import { Post } from '../post/entities/post.entity';
import { Profile } from '../profile/entities/profile.entity';
import { PostService } from '../post/post.service';
import { FORBIDDEN_MESSAGE } from '@nestjs/core/guards';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    private postService: PostService,
  ) {}

  // create like
  async create(createLikeDto: CreateLikeDto, uid: string, postId: number) {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    const profile = await this.profileRepository.findOne({ where: { uid } });

    // If the post is empty, throw an error
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    // If the uid is empty, throw an error
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    let like = await this.likeRepository.findOne({ where: { postId, uid } });
    if (like) {
      // throw error 403 forbidden if like already exists
      throw new ForbiddenException('Like already exists');
    }

    // Create the like in the postEntity and create like entity
    const newLike = this.likeRepository.create({
      ...createLikeDto,
      uid,
      postId,
    });
    const savedLike = await this.likeRepository.save(newLike);

    //update post entity with like

    return savedLike;
  }

  //delete like
  async deleteLike(id: number) {
    const like = await this.likeRepository.findOne({ where: { id } });
    if (!like) {
      throw new NotFoundException('Like not found');
    }

    return await this.likeRepository.remove(like);
  }
}
