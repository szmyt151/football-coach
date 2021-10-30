import { Controller, UseGuards, Post, Get, Request } from "@nestjs/common";
import { AuthService } from "./auth/auth.service";
import { JwtAuthGuard, Public } from "./auth/jwt-auth.guard";
import { LocalAuthGuard } from "./auth/local-auth.guard";

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}
  // @UseGuards(LocalAuthGuard)
  @Public()
  @Post("auth/login")
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  getProfile(@Request() req) {
    return req.user;
  }
}
