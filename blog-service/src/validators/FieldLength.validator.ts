import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'fieldLength', async: false })
export class FieldLength implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    switch (args.constraints.length) {
      case 1:
        return text.length >= args.constraints[0];
        break;
      case 2:
        return (
          text.length >= args.constraints[0] &&
          text.length <= args.constraints[1]
        );
        break;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property.toUpperCase()} should be from ${
      args.constraints[0]
    } to ${args.constraints[1]} long!;`;
  }
}
