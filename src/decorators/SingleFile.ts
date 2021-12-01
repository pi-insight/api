import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { User } from 'src/users/user.entity';
import { join } from 'path';
import * as fs from 'fs';

export function SingleFile(foldername: string) {
  return UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const user = req.user as User;
          const path = join(
            '.',
            'public',
            'images',
            foldername,
            user.id.toString(),
          );

          if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
          }

          cb(null, path);
        },
        filename: (req, file, cb) => {
          const type = file.mimetype.split('/')[1];
          cb(null, Date.now().toString() + '.' + type);
        },
      }),
    }),
  );
}
