import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Put,
  Query,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  async createProfile(@Req() req, @Body() createProfileDto: CreateProfileDto) {
    console.log('createProfileDto:', createProfileDto);
    const { uid } = req.user;
    return this.profileService.createProfile(createProfileDto, uid);
  }

  @Get()
  async getProfile(@Req() req, @Query('uid') uid: string) {
    // If the uid is not provided in the URL, use the uid from the authenticated user
    uid = uid || req.user.uid;
    return this.profileService.getProfile(uid);
  }

  @Put(':uid')
  async updateProfile(@Req() req, @Body() createProfileDto: CreateProfileDto) {
    console.log('updateProfileDto:', createProfileDto);
    const { uid } = req.user;
    return this.profileService.updateProfile(uid, createProfileDto);
  }
}
