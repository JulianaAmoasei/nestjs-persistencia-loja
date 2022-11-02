import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { UsuarioRepository } from '../usuario.repository';

@ValidatorConstraint({ async: true })
@Injectable()
export class EmailEhUnicoConstraint implements ValidatorConstraintInterface {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  validate(value: string): boolean | Promise<boolean> {
    return !this.usuarioRepository.existeComEmail(value);
  }
}

export const IsEmailUnique = (validationOptions?: ValidationOptions) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: EmailEhUnicoConstraint,
    });
  };
};
