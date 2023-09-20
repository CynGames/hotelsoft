import { ObjectType, Field } from '@nestjs/graphql';

type ClassType<T = any> = new (...args: any[]) => T;

export function GenericPagination<TItem>(
  TItemClass: ClassType<TItem>,
  uniqueName: string,
) {
  @ObjectType(uniqueName, { isAbstract: true })
  abstract class GenericPaginationHost {
    @Field(() => Number)
    total: number;

    @Field(() => [TItemClass])
    data: TItem[];
  }

  return GenericPaginationHost;
}
