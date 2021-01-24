import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'fieldLength', async: false })
export class fieldLength implements ValidatorConstraintInterface {
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
    switch (args.constraints.length) {
      case 1:
        return `${args.property.toUpperCase()} should be minimal ${
          args.constraints[0]
        } long!;`;
        break;
      case 2:
        return `${args.property.toUpperCase()} should be from ${
          args.constraints[0]
        } to ${args.constraints[1]} long!;`;
        break;
    }
  }
}
