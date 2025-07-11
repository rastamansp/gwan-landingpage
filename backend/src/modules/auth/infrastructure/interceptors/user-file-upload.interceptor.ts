import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as fs from 'fs';
import * as path from 'path';
import * as multer from 'multer';

@Injectable()
export class UserFileUploadInterceptor implements NestInterceptor {
  private readonly logger = new Logger(UserFileUploadInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Usuário do JWT guard

    if (!user || !user.userId) {
      return next.handle();
    }

    // Configurar multer para salvar na pasta do usuário
    const uploadsDir = path.join(process.cwd(), 'uploads');
    const userDir = path.join(uploadsDir, `user-${user.userId}`);

    // Criar pasta do usuário se não existir
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
      this.logger.log(`Created user directory: ${userDir}`);
    }

    // Configurar storage personalizado
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, userDir);
      },
      filename: (req, file, cb) => {
        // Manter nome original do arquivo
        cb(null, file.originalname);
      },
    });

    // Criar middleware multer personalizado
    const upload = multer({ storage });

    return new Observable(observer => {
      upload.single('image')(request, {} as any, err => {
        if (err) {
          this.logger.error(`Multer error: ${err.message}`);
          observer.error(err);
          return;
        }

        const file = request.file;
        if (file) {
          this.logger.log(
            `File uploaded for user ${user.userId}: ${file.originalname}`
          );
          this.logger.log(`File saved at: ${file.path}`);
        }

        next.handle().subscribe({
          next: value => observer.next(value),
          error: error => observer.error(error),
          complete: () => observer.complete(),
        });
      });
    });
  }
}
