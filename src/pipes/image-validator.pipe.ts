import { FileTypeValidator, ParseFilePipe } from '@nestjs/common';

export const ImageValidationPipe = () =>
  new ParseFilePipe({
    validators: [new FileTypeValidator({ fileType: /png|jp(e?)g/ })],
  });
