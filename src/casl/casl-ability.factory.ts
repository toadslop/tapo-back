import { Injectable } from '@nestjs/common';
import { Action, User } from 'src/models/users/user.entity';
import {
  AbilityBuilder,
  Ability,
  InferSubjects,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';
import { Restaurant } from 'src/models/restaurant/restaurant.entity';
import { Roles } from '../models/roles/role';

type Subjects = InferSubjects<typeof Restaurant | typeof User | 'all'>;
export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.isAdmin) {
      can(Action.Manage, 'all');
    }

    if (user.roles.map((role) => role.roleName).includes(Roles.OWNER)) {
      can(Action.Manage, Restaurant, {
        id: { $in: user.roles.map((role) => role.restaurant.id) },
      });
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
