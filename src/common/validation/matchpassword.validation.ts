import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'matchConfirmPassword', async: false })
export class MatchConfirmPassword implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    console.log({ password: args.object['password'], confirmPassword: value });

    return value == args.object['password'];
  }

  defaultMessage(args: ValidationArguments) {
    return 'confirm password does not match password';
  }
}