import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './entities/token.entity';

@Injectable()
export class RefreshTokenService {
  private readonly logger = new Logger(RefreshTokenService.name);

  constructor(
    @InjectRepository(RefreshToken) private readonly refreshTokenRepository: Repository<RefreshToken>,
    private readonly jwtService: JwtService,
  ) { }

  async storeRefreshToken({ token, userId, expiryDate }: { token: string; userId: number; expiryDate: Date }): Promise<void> {
    this.logger.log(`Storing refresh token for userId: ${userId}`);
    const newRefreshToken = this.refreshTokenRepository.create({ token, userId, expiryDate });
    await this.refreshTokenRepository.save(newRefreshToken);
  }

  async removeTokensForUser(userId: number): Promise<void> {
    this.logger.log(`Removing all refresh tokens for userId: ${userId}`);
    await this.refreshTokenRepository.delete({ userId });
  }

  async refreshAccessToken(refreshToken: string): Promise<{ accessToken: string }> {
    this.logger.log(`Refreshing access token using refresh token: ${refreshToken}`);
    if (!refreshToken) {
      this.logger.error('Refresh token is undefined');
      throw new UnauthorizedException('Refresh token is undefined');
    }

    const storedToken = await this.refreshTokenRepository.findOne({ where: { token: refreshToken } });
    if (!storedToken) {
      this.logger.error('Invalid refresh token');
      throw new UnauthorizedException('Invalid refresh token');
    }

    const { sub, email } = this.jwtService.verify(storedToken.token, { secret: process.env.DATABASE_REFRESH_TOKEN_SECRET });
    const accessTokenSecret = process.env.DATABASE_ACCESS_TOKEN_SECRET;

    if (!accessTokenSecret) {
      throw new Error('JWT access token secret not configured');
    }

    const payload = { sub, email };
    const accessToken = this.jwtService.sign(payload, { secret: accessTokenSecret, expiresIn: '5m' });

    return { accessToken };
  }
}
