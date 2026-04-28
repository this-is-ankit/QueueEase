
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * User — represents all three roles:
 * patients/customers, service-provider admins, and verifiers
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Clinic
 * Clinic — a service provider location (clinic, barber, LPG agency, etc.)
 * Registered by an ADMIN and verified by a VERIFIER
 */
export type Clinic = $Result.DefaultSelection<Prisma.$ClinicPayload>
/**
 * Model Appointment
 * Appointment — a booking made by a USER at a Clinic
 * Each appointment gets a sequential token number for the day
 */
export type Appointment = $Result.DefaultSelection<Prisma.$AppointmentPayload>
/**
 * Model QueueState
 * QueueState — tracks the live queue position for each clinic per day
 * One-to-one with Clinic (unique clinicId)
 */
export type QueueState = $Result.DefaultSelection<Prisma.$QueueStatePayload>
/**
 * Model VerificationLog
 * VerificationLog — audit trail of clinic verification visits
 * Created when a VERIFIER approves or rejects a clinic
 */
export type VerificationLog = $Result.DefaultSelection<Prisma.$VerificationLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  USER: 'USER',
  ADMIN: 'ADMIN',
  VERIFIER: 'VERIFIER'
};

export type Role = (typeof Role)[keyof typeof Role]


export const ClinicStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type ClinicStatus = (typeof ClinicStatus)[keyof typeof ClinicStatus]


export const AppointmentStatus: {
  BOOKED: 'BOOKED',
  SERVING: 'SERVING',
  DONE: 'DONE',
  CANCELLED: 'CANCELLED'
};

export type AppointmentStatus = (typeof AppointmentStatus)[keyof typeof AppointmentStatus]


export const PaymentStatus: {
  PENDING: 'PENDING',
  PAID: 'PAID',
  NOT_REQUIRED: 'NOT_REQUIRED'
};

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]


export const VerificationOutcome: {
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type VerificationOutcome = (typeof VerificationOutcome)[keyof typeof VerificationOutcome]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type ClinicStatus = $Enums.ClinicStatus

export const ClinicStatus: typeof $Enums.ClinicStatus

export type AppointmentStatus = $Enums.AppointmentStatus

export const AppointmentStatus: typeof $Enums.AppointmentStatus

export type PaymentStatus = $Enums.PaymentStatus

export const PaymentStatus: typeof $Enums.PaymentStatus

export type VerificationOutcome = $Enums.VerificationOutcome

export const VerificationOutcome: typeof $Enums.VerificationOutcome

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.clinic`: Exposes CRUD operations for the **Clinic** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clinics
    * const clinics = await prisma.clinic.findMany()
    * ```
    */
  get clinic(): Prisma.ClinicDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.appointment`: Exposes CRUD operations for the **Appointment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Appointments
    * const appointments = await prisma.appointment.findMany()
    * ```
    */
  get appointment(): Prisma.AppointmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.queueState`: Exposes CRUD operations for the **QueueState** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QueueStates
    * const queueStates = await prisma.queueState.findMany()
    * ```
    */
  get queueState(): Prisma.QueueStateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verificationLog`: Exposes CRUD operations for the **VerificationLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationLogs
    * const verificationLogs = await prisma.verificationLog.findMany()
    * ```
    */
  get verificationLog(): Prisma.VerificationLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.7.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Clinic: 'Clinic',
    Appointment: 'Appointment',
    QueueState: 'QueueState',
    VerificationLog: 'VerificationLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "clinic" | "appointment" | "queueState" | "verificationLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Clinic: {
        payload: Prisma.$ClinicPayload<ExtArgs>
        fields: Prisma.ClinicFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClinicFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClinicFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>
          }
          findFirst: {
            args: Prisma.ClinicFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClinicFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>
          }
          findMany: {
            args: Prisma.ClinicFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>[]
          }
          create: {
            args: Prisma.ClinicCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>
          }
          createMany: {
            args: Prisma.ClinicCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClinicCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>[]
          }
          delete: {
            args: Prisma.ClinicDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>
          }
          update: {
            args: Prisma.ClinicUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>
          }
          deleteMany: {
            args: Prisma.ClinicDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClinicUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClinicUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>[]
          }
          upsert: {
            args: Prisma.ClinicUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>
          }
          aggregate: {
            args: Prisma.ClinicAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClinic>
          }
          groupBy: {
            args: Prisma.ClinicGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClinicGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClinicCountArgs<ExtArgs>
            result: $Utils.Optional<ClinicCountAggregateOutputType> | number
          }
        }
      }
      Appointment: {
        payload: Prisma.$AppointmentPayload<ExtArgs>
        fields: Prisma.AppointmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppointmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppointmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findFirst: {
            args: Prisma.AppointmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppointmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findMany: {
            args: Prisma.AppointmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          create: {
            args: Prisma.AppointmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          createMany: {
            args: Prisma.AppointmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AppointmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          delete: {
            args: Prisma.AppointmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          update: {
            args: Prisma.AppointmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          deleteMany: {
            args: Prisma.AppointmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppointmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AppointmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          upsert: {
            args: Prisma.AppointmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          aggregate: {
            args: Prisma.AppointmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppointment>
          }
          groupBy: {
            args: Prisma.AppointmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppointmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppointmentCountArgs<ExtArgs>
            result: $Utils.Optional<AppointmentCountAggregateOutputType> | number
          }
        }
      }
      QueueState: {
        payload: Prisma.$QueueStatePayload<ExtArgs>
        fields: Prisma.QueueStateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QueueStateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueStatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QueueStateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueStatePayload>
          }
          findFirst: {
            args: Prisma.QueueStateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueStatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QueueStateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueStatePayload>
          }
          findMany: {
            args: Prisma.QueueStateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueStatePayload>[]
          }
          create: {
            args: Prisma.QueueStateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueStatePayload>
          }
          createMany: {
            args: Prisma.QueueStateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QueueStateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueStatePayload>[]
          }
          delete: {
            args: Prisma.QueueStateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueStatePayload>
          }
          update: {
            args: Prisma.QueueStateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueStatePayload>
          }
          deleteMany: {
            args: Prisma.QueueStateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QueueStateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QueueStateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueStatePayload>[]
          }
          upsert: {
            args: Prisma.QueueStateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueStatePayload>
          }
          aggregate: {
            args: Prisma.QueueStateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQueueState>
          }
          groupBy: {
            args: Prisma.QueueStateGroupByArgs<ExtArgs>
            result: $Utils.Optional<QueueStateGroupByOutputType>[]
          }
          count: {
            args: Prisma.QueueStateCountArgs<ExtArgs>
            result: $Utils.Optional<QueueStateCountAggregateOutputType> | number
          }
        }
      }
      VerificationLog: {
        payload: Prisma.$VerificationLogPayload<ExtArgs>
        fields: Prisma.VerificationLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationLogPayload>
          }
          findFirst: {
            args: Prisma.VerificationLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationLogPayload>
          }
          findMany: {
            args: Prisma.VerificationLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationLogPayload>[]
          }
          create: {
            args: Prisma.VerificationLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationLogPayload>
          }
          createMany: {
            args: Prisma.VerificationLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationLogPayload>[]
          }
          delete: {
            args: Prisma.VerificationLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationLogPayload>
          }
          update: {
            args: Prisma.VerificationLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationLogPayload>
          }
          deleteMany: {
            args: Prisma.VerificationLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationLogPayload>[]
          }
          upsert: {
            args: Prisma.VerificationLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationLogPayload>
          }
          aggregate: {
            args: Prisma.VerificationLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerificationLog>
          }
          groupBy: {
            args: Prisma.VerificationLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationLogCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    clinic?: ClinicOmit
    appointment?: AppointmentOmit
    queueState?: QueueStateOmit
    verificationLog?: VerificationLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    clinics: number
    appointments: number
    verificationLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clinics?: boolean | UserCountOutputTypeCountClinicsArgs
    appointments?: boolean | UserCountOutputTypeCountAppointmentsArgs
    verificationLogs?: boolean | UserCountOutputTypeCountVerificationLogsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountClinicsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClinicWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountVerificationLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationLogWhereInput
  }


  /**
   * Count Type ClinicCountOutputType
   */

  export type ClinicCountOutputType = {
    appointments: number
    verificationLogs: number
  }

  export type ClinicCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    appointments?: boolean | ClinicCountOutputTypeCountAppointmentsArgs
    verificationLogs?: boolean | ClinicCountOutputTypeCountVerificationLogsArgs
  }

  // Custom InputTypes
  /**
   * ClinicCountOutputType without action
   */
  export type ClinicCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicCountOutputType
     */
    select?: ClinicCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClinicCountOutputType without action
   */
  export type ClinicCountOutputTypeCountAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }

  /**
   * ClinicCountOutputType without action
   */
  export type ClinicCountOutputTypeCountVerificationLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    phone: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.Role | null
    fcmToken: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    phone: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.Role | null
    fcmToken: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    phone: number
    email: number
    passwordHash: number
    role: number
    fcmToken: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    email?: true
    passwordHash?: true
    role?: true
    fcmToken?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    email?: true
    passwordHash?: true
    role?: true
    fcmToken?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    email?: true
    passwordHash?: true
    role?: true
    fcmToken?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    phone: string
    email: string | null
    passwordHash: string
    role: $Enums.Role
    fcmToken: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    fcmToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clinics?: boolean | User$clinicsArgs<ExtArgs>
    appointments?: boolean | User$appointmentsArgs<ExtArgs>
    verificationLogs?: boolean | User$verificationLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    fcmToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    fcmToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    fcmToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "phone" | "email" | "passwordHash" | "role" | "fcmToken" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clinics?: boolean | User$clinicsArgs<ExtArgs>
    appointments?: boolean | User$appointmentsArgs<ExtArgs>
    verificationLogs?: boolean | User$verificationLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      /**
       * Clinics owned by this user (only relevant for ADMIN role)
       */
      clinics: Prisma.$ClinicPayload<ExtArgs>[]
      /**
       * Appointments booked by this user (only relevant for USER role)
       */
      appointments: Prisma.$AppointmentPayload<ExtArgs>[]
      /**
       * Verification logs submitted by this user (only relevant for VERIFIER role)
       */
      verificationLogs: Prisma.$VerificationLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      phone: string
      email: string | null
      passwordHash: string
      /**
       * Role determines access level (USER / ADMIN / VERIFIER)
       */
      role: $Enums.Role
      /**
       * Firebase Cloud Messaging token for push notifications
       */
      fcmToken: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    clinics<T extends User$clinicsArgs<ExtArgs> = {}>(args?: Subset<T, User$clinicsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    appointments<T extends User$appointmentsArgs<ExtArgs> = {}>(args?: Subset<T, User$appointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    verificationLogs<T extends User$verificationLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$verificationLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly fcmToken: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.clinics
   */
  export type User$clinicsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    where?: ClinicWhereInput
    orderBy?: ClinicOrderByWithRelationInput | ClinicOrderByWithRelationInput[]
    cursor?: ClinicWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClinicScalarFieldEnum | ClinicScalarFieldEnum[]
  }

  /**
   * User.appointments
   */
  export type User$appointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * User.verificationLogs
   */
  export type User$verificationLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationLog
     */
    select?: VerificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationLog
     */
    omit?: VerificationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationLogInclude<ExtArgs> | null
    where?: VerificationLogWhereInput
    orderBy?: VerificationLogOrderByWithRelationInput | VerificationLogOrderByWithRelationInput[]
    cursor?: VerificationLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VerificationLogScalarFieldEnum | VerificationLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Clinic
   */

  export type AggregateClinic = {
    _count: ClinicCountAggregateOutputType | null
    _avg: ClinicAvgAggregateOutputType | null
    _sum: ClinicSumAggregateOutputType | null
    _min: ClinicMinAggregateOutputType | null
    _max: ClinicMaxAggregateOutputType | null
  }

  export type ClinicAvgAggregateOutputType = {
    latitude: number | null
    longitude: number | null
    experience: number | null
    maxPatientsPerDay: number | null
    consultationFee: number | null
  }

  export type ClinicSumAggregateOutputType = {
    latitude: number | null
    longitude: number | null
    experience: number | null
    maxPatientsPerDay: number | null
    consultationFee: number | null
  }

  export type ClinicMinAggregateOutputType = {
    id: string | null
    name: string | null
    address: string | null
    city: string | null
    state: string | null
    pincode: string | null
    latitude: number | null
    longitude: number | null
    doctorName: string | null
    degree: string | null
    college: string | null
    experience: number | null
    specialization: string | null
    doctorPhoto: string | null
    maxPatientsPerDay: number | null
    paymentRequired: boolean | null
    consultationFee: number | null
    status: $Enums.ClinicStatus | null
    adminId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClinicMaxAggregateOutputType = {
    id: string | null
    name: string | null
    address: string | null
    city: string | null
    state: string | null
    pincode: string | null
    latitude: number | null
    longitude: number | null
    doctorName: string | null
    degree: string | null
    college: string | null
    experience: number | null
    specialization: string | null
    doctorPhoto: string | null
    maxPatientsPerDay: number | null
    paymentRequired: boolean | null
    consultationFee: number | null
    status: $Enums.ClinicStatus | null
    adminId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClinicCountAggregateOutputType = {
    id: number
    name: number
    address: number
    city: number
    state: number
    pincode: number
    latitude: number
    longitude: number
    doctorName: number
    degree: number
    college: number
    experience: number
    specialization: number
    clinicImages: number
    doctorPhoto: number
    maxPatientsPerDay: number
    paymentRequired: number
    consultationFee: number
    status: number
    adminId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ClinicAvgAggregateInputType = {
    latitude?: true
    longitude?: true
    experience?: true
    maxPatientsPerDay?: true
    consultationFee?: true
  }

  export type ClinicSumAggregateInputType = {
    latitude?: true
    longitude?: true
    experience?: true
    maxPatientsPerDay?: true
    consultationFee?: true
  }

  export type ClinicMinAggregateInputType = {
    id?: true
    name?: true
    address?: true
    city?: true
    state?: true
    pincode?: true
    latitude?: true
    longitude?: true
    doctorName?: true
    degree?: true
    college?: true
    experience?: true
    specialization?: true
    doctorPhoto?: true
    maxPatientsPerDay?: true
    paymentRequired?: true
    consultationFee?: true
    status?: true
    adminId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClinicMaxAggregateInputType = {
    id?: true
    name?: true
    address?: true
    city?: true
    state?: true
    pincode?: true
    latitude?: true
    longitude?: true
    doctorName?: true
    degree?: true
    college?: true
    experience?: true
    specialization?: true
    doctorPhoto?: true
    maxPatientsPerDay?: true
    paymentRequired?: true
    consultationFee?: true
    status?: true
    adminId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClinicCountAggregateInputType = {
    id?: true
    name?: true
    address?: true
    city?: true
    state?: true
    pincode?: true
    latitude?: true
    longitude?: true
    doctorName?: true
    degree?: true
    college?: true
    experience?: true
    specialization?: true
    clinicImages?: true
    doctorPhoto?: true
    maxPatientsPerDay?: true
    paymentRequired?: true
    consultationFee?: true
    status?: true
    adminId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ClinicAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clinic to aggregate.
     */
    where?: ClinicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clinics to fetch.
     */
    orderBy?: ClinicOrderByWithRelationInput | ClinicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClinicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clinics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clinics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clinics
    **/
    _count?: true | ClinicCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClinicAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClinicSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClinicMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClinicMaxAggregateInputType
  }

  export type GetClinicAggregateType<T extends ClinicAggregateArgs> = {
        [P in keyof T & keyof AggregateClinic]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClinic[P]>
      : GetScalarType<T[P], AggregateClinic[P]>
  }




  export type ClinicGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClinicWhereInput
    orderBy?: ClinicOrderByWithAggregationInput | ClinicOrderByWithAggregationInput[]
    by: ClinicScalarFieldEnum[] | ClinicScalarFieldEnum
    having?: ClinicScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClinicCountAggregateInputType | true
    _avg?: ClinicAvgAggregateInputType
    _sum?: ClinicSumAggregateInputType
    _min?: ClinicMinAggregateInputType
    _max?: ClinicMaxAggregateInputType
  }

  export type ClinicGroupByOutputType = {
    id: string
    name: string
    address: string
    city: string
    state: string
    pincode: string
    latitude: number
    longitude: number
    doctorName: string
    degree: string | null
    college: string | null
    experience: number | null
    specialization: string | null
    clinicImages: string[]
    doctorPhoto: string | null
    maxPatientsPerDay: number
    paymentRequired: boolean
    consultationFee: number | null
    status: $Enums.ClinicStatus
    adminId: string
    createdAt: Date
    updatedAt: Date
    _count: ClinicCountAggregateOutputType | null
    _avg: ClinicAvgAggregateOutputType | null
    _sum: ClinicSumAggregateOutputType | null
    _min: ClinicMinAggregateOutputType | null
    _max: ClinicMaxAggregateOutputType | null
  }

  type GetClinicGroupByPayload<T extends ClinicGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClinicGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClinicGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClinicGroupByOutputType[P]>
            : GetScalarType<T[P], ClinicGroupByOutputType[P]>
        }
      >
    >


  export type ClinicSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    pincode?: boolean
    latitude?: boolean
    longitude?: boolean
    doctorName?: boolean
    degree?: boolean
    college?: boolean
    experience?: boolean
    specialization?: boolean
    clinicImages?: boolean
    doctorPhoto?: boolean
    maxPatientsPerDay?: boolean
    paymentRequired?: boolean
    consultationFee?: boolean
    status?: boolean
    adminId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    admin?: boolean | UserDefaultArgs<ExtArgs>
    appointments?: boolean | Clinic$appointmentsArgs<ExtArgs>
    queueState?: boolean | Clinic$queueStateArgs<ExtArgs>
    verificationLogs?: boolean | Clinic$verificationLogsArgs<ExtArgs>
    _count?: boolean | ClinicCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clinic"]>

  export type ClinicSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    pincode?: boolean
    latitude?: boolean
    longitude?: boolean
    doctorName?: boolean
    degree?: boolean
    college?: boolean
    experience?: boolean
    specialization?: boolean
    clinicImages?: boolean
    doctorPhoto?: boolean
    maxPatientsPerDay?: boolean
    paymentRequired?: boolean
    consultationFee?: boolean
    status?: boolean
    adminId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clinic"]>

  export type ClinicSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    pincode?: boolean
    latitude?: boolean
    longitude?: boolean
    doctorName?: boolean
    degree?: boolean
    college?: boolean
    experience?: boolean
    specialization?: boolean
    clinicImages?: boolean
    doctorPhoto?: boolean
    maxPatientsPerDay?: boolean
    paymentRequired?: boolean
    consultationFee?: boolean
    status?: boolean
    adminId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clinic"]>

  export type ClinicSelectScalar = {
    id?: boolean
    name?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    pincode?: boolean
    latitude?: boolean
    longitude?: boolean
    doctorName?: boolean
    degree?: boolean
    college?: boolean
    experience?: boolean
    specialization?: boolean
    clinicImages?: boolean
    doctorPhoto?: boolean
    maxPatientsPerDay?: boolean
    paymentRequired?: boolean
    consultationFee?: boolean
    status?: boolean
    adminId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ClinicOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "address" | "city" | "state" | "pincode" | "latitude" | "longitude" | "doctorName" | "degree" | "college" | "experience" | "specialization" | "clinicImages" | "doctorPhoto" | "maxPatientsPerDay" | "paymentRequired" | "consultationFee" | "status" | "adminId" | "createdAt" | "updatedAt", ExtArgs["result"]["clinic"]>
  export type ClinicInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | UserDefaultArgs<ExtArgs>
    appointments?: boolean | Clinic$appointmentsArgs<ExtArgs>
    queueState?: boolean | Clinic$queueStateArgs<ExtArgs>
    verificationLogs?: boolean | Clinic$verificationLogsArgs<ExtArgs>
    _count?: boolean | ClinicCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClinicIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ClinicIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ClinicPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Clinic"
    objects: {
      admin: Prisma.$UserPayload<ExtArgs>
      appointments: Prisma.$AppointmentPayload<ExtArgs>[]
      queueState: Prisma.$QueueStatePayload<ExtArgs> | null
      verificationLogs: Prisma.$VerificationLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      address: string
      city: string
      state: string
      pincode: string
      /**
       * GPS coordinates for map-based search
       */
      latitude: number
      longitude: number
      doctorName: string
      degree: string | null
      college: string | null
      experience: number | null
      specialization: string | null
      /**
       * Array of Cloudinary URLs for clinic interior/exterior photos
       */
      clinicImages: string[]
      /**
       * Single Cloudinary URL for the doctor/provider's photo
       */
      doctorPhoto: string | null
      /**
       * Maximum tokens that can be booked per day
       */
      maxPatientsPerDay: number
      /**
       * Whether this clinic requires payment before booking
       */
      paymentRequired: boolean
      /**
       * The fee to be paid if paymentRequired is true
       */
      consultationFee: number | null
      /**
       * Verification status — set by a Verifier after physical visit
       */
      status: $Enums.ClinicStatus
      /**
       * The admin (service provider) who registered this clinic
       */
      adminId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["clinic"]>
    composites: {}
  }

  type ClinicGetPayload<S extends boolean | null | undefined | ClinicDefaultArgs> = $Result.GetResult<Prisma.$ClinicPayload, S>

  type ClinicCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClinicFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClinicCountAggregateInputType | true
    }

  export interface ClinicDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Clinic'], meta: { name: 'Clinic' } }
    /**
     * Find zero or one Clinic that matches the filter.
     * @param {ClinicFindUniqueArgs} args - Arguments to find a Clinic
     * @example
     * // Get one Clinic
     * const clinic = await prisma.clinic.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClinicFindUniqueArgs>(args: SelectSubset<T, ClinicFindUniqueArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Clinic that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClinicFindUniqueOrThrowArgs} args - Arguments to find a Clinic
     * @example
     * // Get one Clinic
     * const clinic = await prisma.clinic.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClinicFindUniqueOrThrowArgs>(args: SelectSubset<T, ClinicFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Clinic that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicFindFirstArgs} args - Arguments to find a Clinic
     * @example
     * // Get one Clinic
     * const clinic = await prisma.clinic.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClinicFindFirstArgs>(args?: SelectSubset<T, ClinicFindFirstArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Clinic that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicFindFirstOrThrowArgs} args - Arguments to find a Clinic
     * @example
     * // Get one Clinic
     * const clinic = await prisma.clinic.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClinicFindFirstOrThrowArgs>(args?: SelectSubset<T, ClinicFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Clinics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clinics
     * const clinics = await prisma.clinic.findMany()
     * 
     * // Get first 10 Clinics
     * const clinics = await prisma.clinic.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clinicWithIdOnly = await prisma.clinic.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClinicFindManyArgs>(args?: SelectSubset<T, ClinicFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Clinic.
     * @param {ClinicCreateArgs} args - Arguments to create a Clinic.
     * @example
     * // Create one Clinic
     * const Clinic = await prisma.clinic.create({
     *   data: {
     *     // ... data to create a Clinic
     *   }
     * })
     * 
     */
    create<T extends ClinicCreateArgs>(args: SelectSubset<T, ClinicCreateArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Clinics.
     * @param {ClinicCreateManyArgs} args - Arguments to create many Clinics.
     * @example
     * // Create many Clinics
     * const clinic = await prisma.clinic.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClinicCreateManyArgs>(args?: SelectSubset<T, ClinicCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Clinics and returns the data saved in the database.
     * @param {ClinicCreateManyAndReturnArgs} args - Arguments to create many Clinics.
     * @example
     * // Create many Clinics
     * const clinic = await prisma.clinic.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Clinics and only return the `id`
     * const clinicWithIdOnly = await prisma.clinic.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClinicCreateManyAndReturnArgs>(args?: SelectSubset<T, ClinicCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Clinic.
     * @param {ClinicDeleteArgs} args - Arguments to delete one Clinic.
     * @example
     * // Delete one Clinic
     * const Clinic = await prisma.clinic.delete({
     *   where: {
     *     // ... filter to delete one Clinic
     *   }
     * })
     * 
     */
    delete<T extends ClinicDeleteArgs>(args: SelectSubset<T, ClinicDeleteArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Clinic.
     * @param {ClinicUpdateArgs} args - Arguments to update one Clinic.
     * @example
     * // Update one Clinic
     * const clinic = await prisma.clinic.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClinicUpdateArgs>(args: SelectSubset<T, ClinicUpdateArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Clinics.
     * @param {ClinicDeleteManyArgs} args - Arguments to filter Clinics to delete.
     * @example
     * // Delete a few Clinics
     * const { count } = await prisma.clinic.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClinicDeleteManyArgs>(args?: SelectSubset<T, ClinicDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clinics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clinics
     * const clinic = await prisma.clinic.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClinicUpdateManyArgs>(args: SelectSubset<T, ClinicUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clinics and returns the data updated in the database.
     * @param {ClinicUpdateManyAndReturnArgs} args - Arguments to update many Clinics.
     * @example
     * // Update many Clinics
     * const clinic = await prisma.clinic.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Clinics and only return the `id`
     * const clinicWithIdOnly = await prisma.clinic.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClinicUpdateManyAndReturnArgs>(args: SelectSubset<T, ClinicUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Clinic.
     * @param {ClinicUpsertArgs} args - Arguments to update or create a Clinic.
     * @example
     * // Update or create a Clinic
     * const clinic = await prisma.clinic.upsert({
     *   create: {
     *     // ... data to create a Clinic
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Clinic we want to update
     *   }
     * })
     */
    upsert<T extends ClinicUpsertArgs>(args: SelectSubset<T, ClinicUpsertArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Clinics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicCountArgs} args - Arguments to filter Clinics to count.
     * @example
     * // Count the number of Clinics
     * const count = await prisma.clinic.count({
     *   where: {
     *     // ... the filter for the Clinics we want to count
     *   }
     * })
    **/
    count<T extends ClinicCountArgs>(
      args?: Subset<T, ClinicCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClinicCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Clinic.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClinicAggregateArgs>(args: Subset<T, ClinicAggregateArgs>): Prisma.PrismaPromise<GetClinicAggregateType<T>>

    /**
     * Group by Clinic.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClinicGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClinicGroupByArgs['orderBy'] }
        : { orderBy?: ClinicGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClinicGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClinicGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Clinic model
   */
  readonly fields: ClinicFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Clinic.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClinicClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    admin<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    appointments<T extends Clinic$appointmentsArgs<ExtArgs> = {}>(args?: Subset<T, Clinic$appointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    queueState<T extends Clinic$queueStateArgs<ExtArgs> = {}>(args?: Subset<T, Clinic$queueStateArgs<ExtArgs>>): Prisma__QueueStateClient<$Result.GetResult<Prisma.$QueueStatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    verificationLogs<T extends Clinic$verificationLogsArgs<ExtArgs> = {}>(args?: Subset<T, Clinic$verificationLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Clinic model
   */
  interface ClinicFieldRefs {
    readonly id: FieldRef<"Clinic", 'String'>
    readonly name: FieldRef<"Clinic", 'String'>
    readonly address: FieldRef<"Clinic", 'String'>
    readonly city: FieldRef<"Clinic", 'String'>
    readonly state: FieldRef<"Clinic", 'String'>
    readonly pincode: FieldRef<"Clinic", 'String'>
    readonly latitude: FieldRef<"Clinic", 'Float'>
    readonly longitude: FieldRef<"Clinic", 'Float'>
    readonly doctorName: FieldRef<"Clinic", 'String'>
    readonly degree: FieldRef<"Clinic", 'String'>
    readonly college: FieldRef<"Clinic", 'String'>
    readonly experience: FieldRef<"Clinic", 'Int'>
    readonly specialization: FieldRef<"Clinic", 'String'>
    readonly clinicImages: FieldRef<"Clinic", 'String[]'>
    readonly doctorPhoto: FieldRef<"Clinic", 'String'>
    readonly maxPatientsPerDay: FieldRef<"Clinic", 'Int'>
    readonly paymentRequired: FieldRef<"Clinic", 'Boolean'>
    readonly consultationFee: FieldRef<"Clinic", 'Int'>
    readonly status: FieldRef<"Clinic", 'ClinicStatus'>
    readonly adminId: FieldRef<"Clinic", 'String'>
    readonly createdAt: FieldRef<"Clinic", 'DateTime'>
    readonly updatedAt: FieldRef<"Clinic", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Clinic findUnique
   */
  export type ClinicFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * Filter, which Clinic to fetch.
     */
    where: ClinicWhereUniqueInput
  }

  /**
   * Clinic findUniqueOrThrow
   */
  export type ClinicFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * Filter, which Clinic to fetch.
     */
    where: ClinicWhereUniqueInput
  }

  /**
   * Clinic findFirst
   */
  export type ClinicFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * Filter, which Clinic to fetch.
     */
    where?: ClinicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clinics to fetch.
     */
    orderBy?: ClinicOrderByWithRelationInput | ClinicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clinics.
     */
    cursor?: ClinicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clinics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clinics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clinics.
     */
    distinct?: ClinicScalarFieldEnum | ClinicScalarFieldEnum[]
  }

  /**
   * Clinic findFirstOrThrow
   */
  export type ClinicFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * Filter, which Clinic to fetch.
     */
    where?: ClinicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clinics to fetch.
     */
    orderBy?: ClinicOrderByWithRelationInput | ClinicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clinics.
     */
    cursor?: ClinicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clinics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clinics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clinics.
     */
    distinct?: ClinicScalarFieldEnum | ClinicScalarFieldEnum[]
  }

  /**
   * Clinic findMany
   */
  export type ClinicFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * Filter, which Clinics to fetch.
     */
    where?: ClinicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clinics to fetch.
     */
    orderBy?: ClinicOrderByWithRelationInput | ClinicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clinics.
     */
    cursor?: ClinicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clinics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clinics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clinics.
     */
    distinct?: ClinicScalarFieldEnum | ClinicScalarFieldEnum[]
  }

  /**
   * Clinic create
   */
  export type ClinicCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * The data needed to create a Clinic.
     */
    data: XOR<ClinicCreateInput, ClinicUncheckedCreateInput>
  }

  /**
   * Clinic createMany
   */
  export type ClinicCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clinics.
     */
    data: ClinicCreateManyInput | ClinicCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Clinic createManyAndReturn
   */
  export type ClinicCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * The data used to create many Clinics.
     */
    data: ClinicCreateManyInput | ClinicCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Clinic update
   */
  export type ClinicUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * The data needed to update a Clinic.
     */
    data: XOR<ClinicUpdateInput, ClinicUncheckedUpdateInput>
    /**
     * Choose, which Clinic to update.
     */
    where: ClinicWhereUniqueInput
  }

  /**
   * Clinic updateMany
   */
  export type ClinicUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clinics.
     */
    data: XOR<ClinicUpdateManyMutationInput, ClinicUncheckedUpdateManyInput>
    /**
     * Filter which Clinics to update
     */
    where?: ClinicWhereInput
    /**
     * Limit how many Clinics to update.
     */
    limit?: number
  }

  /**
   * Clinic updateManyAndReturn
   */
  export type ClinicUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * The data used to update Clinics.
     */
    data: XOR<ClinicUpdateManyMutationInput, ClinicUncheckedUpdateManyInput>
    /**
     * Filter which Clinics to update
     */
    where?: ClinicWhereInput
    /**
     * Limit how many Clinics to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Clinic upsert
   */
  export type ClinicUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * The filter to search for the Clinic to update in case it exists.
     */
    where: ClinicWhereUniqueInput
    /**
     * In case the Clinic found by the `where` argument doesn't exist, create a new Clinic with this data.
     */
    create: XOR<ClinicCreateInput, ClinicUncheckedCreateInput>
    /**
     * In case the Clinic was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClinicUpdateInput, ClinicUncheckedUpdateInput>
  }

  /**
   * Clinic delete
   */
  export type ClinicDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * Filter which Clinic to delete.
     */
    where: ClinicWhereUniqueInput
  }

  /**
   * Clinic deleteMany
   */
  export type ClinicDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clinics to delete
     */
    where?: ClinicWhereInput
    /**
     * Limit how many Clinics to delete.
     */
    limit?: number
  }

  /**
   * Clinic.appointments
   */
  export type Clinic$appointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Clinic.queueState
   */
  export type Clinic$queueStateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueState
     */
    select?: QueueStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueState
     */
    omit?: QueueStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueStateInclude<ExtArgs> | null
    where?: QueueStateWhereInput
  }

  /**
   * Clinic.verificationLogs
   */
  export type Clinic$verificationLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationLog
     */
    select?: VerificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationLog
     */
    omit?: VerificationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationLogInclude<ExtArgs> | null
    where?: VerificationLogWhereInput
    orderBy?: VerificationLogOrderByWithRelationInput | VerificationLogOrderByWithRelationInput[]
    cursor?: VerificationLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VerificationLogScalarFieldEnum | VerificationLogScalarFieldEnum[]
  }

  /**
   * Clinic without action
   */
  export type ClinicDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
  }


  /**
   * Model Appointment
   */

  export type AggregateAppointment = {
    _count: AppointmentCountAggregateOutputType | null
    _avg: AppointmentAvgAggregateOutputType | null
    _sum: AppointmentSumAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  export type AppointmentAvgAggregateOutputType = {
    patientAge: number | null
    tokenNumber: number | null
  }

  export type AppointmentSumAggregateOutputType = {
    patientAge: number | null
    tokenNumber: number | null
  }

  export type AppointmentMinAggregateOutputType = {
    id: string | null
    userId: string | null
    clinicId: string | null
    patientName: string | null
    patientAge: number | null
    patientPhone: string | null
    patientEmail: string | null
    patientAddress: string | null
    appointmentDate: Date | null
    tokenNumber: number | null
    status: $Enums.AppointmentStatus | null
    paymentStatus: $Enums.PaymentStatus | null
    razorpayOrderId: string | null
    razorpayPaymentId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AppointmentMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    clinicId: string | null
    patientName: string | null
    patientAge: number | null
    patientPhone: string | null
    patientEmail: string | null
    patientAddress: string | null
    appointmentDate: Date | null
    tokenNumber: number | null
    status: $Enums.AppointmentStatus | null
    paymentStatus: $Enums.PaymentStatus | null
    razorpayOrderId: string | null
    razorpayPaymentId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AppointmentCountAggregateOutputType = {
    id: number
    userId: number
    clinicId: number
    patientName: number
    patientAge: number
    patientPhone: number
    patientEmail: number
    patientAddress: number
    appointmentDate: number
    tokenNumber: number
    status: number
    paymentStatus: number
    razorpayOrderId: number
    razorpayPaymentId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AppointmentAvgAggregateInputType = {
    patientAge?: true
    tokenNumber?: true
  }

  export type AppointmentSumAggregateInputType = {
    patientAge?: true
    tokenNumber?: true
  }

  export type AppointmentMinAggregateInputType = {
    id?: true
    userId?: true
    clinicId?: true
    patientName?: true
    patientAge?: true
    patientPhone?: true
    patientEmail?: true
    patientAddress?: true
    appointmentDate?: true
    tokenNumber?: true
    status?: true
    paymentStatus?: true
    razorpayOrderId?: true
    razorpayPaymentId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AppointmentMaxAggregateInputType = {
    id?: true
    userId?: true
    clinicId?: true
    patientName?: true
    patientAge?: true
    patientPhone?: true
    patientEmail?: true
    patientAddress?: true
    appointmentDate?: true
    tokenNumber?: true
    status?: true
    paymentStatus?: true
    razorpayOrderId?: true
    razorpayPaymentId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AppointmentCountAggregateInputType = {
    id?: true
    userId?: true
    clinicId?: true
    patientName?: true
    patientAge?: true
    patientPhone?: true
    patientEmail?: true
    patientAddress?: true
    appointmentDate?: true
    tokenNumber?: true
    status?: true
    paymentStatus?: true
    razorpayOrderId?: true
    razorpayPaymentId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AppointmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointment to aggregate.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Appointments
    **/
    _count?: true | AppointmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AppointmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AppointmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppointmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppointmentMaxAggregateInputType
  }

  export type GetAppointmentAggregateType<T extends AppointmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAppointment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppointment[P]>
      : GetScalarType<T[P], AggregateAppointment[P]>
  }




  export type AppointmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithAggregationInput | AppointmentOrderByWithAggregationInput[]
    by: AppointmentScalarFieldEnum[] | AppointmentScalarFieldEnum
    having?: AppointmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppointmentCountAggregateInputType | true
    _avg?: AppointmentAvgAggregateInputType
    _sum?: AppointmentSumAggregateInputType
    _min?: AppointmentMinAggregateInputType
    _max?: AppointmentMaxAggregateInputType
  }

  export type AppointmentGroupByOutputType = {
    id: string
    userId: string
    clinicId: string
    patientName: string
    patientAge: number
    patientPhone: string
    patientEmail: string | null
    patientAddress: string | null
    appointmentDate: Date
    tokenNumber: number
    status: $Enums.AppointmentStatus
    paymentStatus: $Enums.PaymentStatus
    razorpayOrderId: string | null
    razorpayPaymentId: string | null
    createdAt: Date
    updatedAt: Date
    _count: AppointmentCountAggregateOutputType | null
    _avg: AppointmentAvgAggregateOutputType | null
    _sum: AppointmentSumAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  type GetAppointmentGroupByPayload<T extends AppointmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppointmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppointmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
            : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
        }
      >
    >


  export type AppointmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    clinicId?: boolean
    patientName?: boolean
    patientAge?: boolean
    patientPhone?: boolean
    patientEmail?: boolean
    patientAddress?: boolean
    appointmentDate?: boolean
    tokenNumber?: boolean
    status?: boolean
    paymentStatus?: boolean
    razorpayOrderId?: boolean
    razorpayPaymentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    clinicId?: boolean
    patientName?: boolean
    patientAge?: boolean
    patientPhone?: boolean
    patientEmail?: boolean
    patientAddress?: boolean
    appointmentDate?: boolean
    tokenNumber?: boolean
    status?: boolean
    paymentStatus?: boolean
    razorpayOrderId?: boolean
    razorpayPaymentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    clinicId?: boolean
    patientName?: boolean
    patientAge?: boolean
    patientPhone?: boolean
    patientEmail?: boolean
    patientAddress?: boolean
    appointmentDate?: boolean
    tokenNumber?: boolean
    status?: boolean
    paymentStatus?: boolean
    razorpayOrderId?: boolean
    razorpayPaymentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectScalar = {
    id?: boolean
    userId?: boolean
    clinicId?: boolean
    patientName?: boolean
    patientAge?: boolean
    patientPhone?: boolean
    patientEmail?: boolean
    patientAddress?: boolean
    appointmentDate?: boolean
    tokenNumber?: boolean
    status?: boolean
    paymentStatus?: boolean
    razorpayOrderId?: boolean
    razorpayPaymentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AppointmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "clinicId" | "patientName" | "patientAge" | "patientPhone" | "patientEmail" | "patientAddress" | "appointmentDate" | "tokenNumber" | "status" | "paymentStatus" | "razorpayOrderId" | "razorpayPaymentId" | "createdAt" | "updatedAt", ExtArgs["result"]["appointment"]>
  export type AppointmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
  }
  export type AppointmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
  }
  export type AppointmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
  }

  export type $AppointmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Appointment"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      clinic: Prisma.$ClinicPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      /**
       * The user who booked this appointment
       */
      userId: string
      /**
       * The clinic where the appointment is booked
       */
      clinicId: string
      patientName: string
      patientAge: number
      patientPhone: string
      patientEmail: string | null
      patientAddress: string | null
      /**
       * Date of the appointment (used for daily queue management)
       */
      appointmentDate: Date
      /**
       * Sequential token number assigned for the day
       */
      tokenNumber: number
      /**
       * Current status of this appointment in the queue
       */
      status: $Enums.AppointmentStatus
      /**
       * Whether payment has been made, is pending, or not required
       */
      paymentStatus: $Enums.PaymentStatus
      /**
       * Razorpay order ID (set when payment is initiated)
       */
      razorpayOrderId: string | null
      /**
       * Razorpay payment ID (set when payment is confirmed)
       */
      razorpayPaymentId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["appointment"]>
    composites: {}
  }

  type AppointmentGetPayload<S extends boolean | null | undefined | AppointmentDefaultArgs> = $Result.GetResult<Prisma.$AppointmentPayload, S>

  type AppointmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AppointmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AppointmentCountAggregateInputType | true
    }

  export interface AppointmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Appointment'], meta: { name: 'Appointment' } }
    /**
     * Find zero or one Appointment that matches the filter.
     * @param {AppointmentFindUniqueArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppointmentFindUniqueArgs>(args: SelectSubset<T, AppointmentFindUniqueArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Appointment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AppointmentFindUniqueOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppointmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AppointmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Appointment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppointmentFindFirstArgs>(args?: SelectSubset<T, AppointmentFindFirstArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Appointment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppointmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AppointmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Appointments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Appointments
     * const appointments = await prisma.appointment.findMany()
     * 
     * // Get first 10 Appointments
     * const appointments = await prisma.appointment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const appointmentWithIdOnly = await prisma.appointment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AppointmentFindManyArgs>(args?: SelectSubset<T, AppointmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Appointment.
     * @param {AppointmentCreateArgs} args - Arguments to create a Appointment.
     * @example
     * // Create one Appointment
     * const Appointment = await prisma.appointment.create({
     *   data: {
     *     // ... data to create a Appointment
     *   }
     * })
     * 
     */
    create<T extends AppointmentCreateArgs>(args: SelectSubset<T, AppointmentCreateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Appointments.
     * @param {AppointmentCreateManyArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppointmentCreateManyArgs>(args?: SelectSubset<T, AppointmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Appointments and returns the data saved in the database.
     * @param {AppointmentCreateManyAndReturnArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Appointments and only return the `id`
     * const appointmentWithIdOnly = await prisma.appointment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AppointmentCreateManyAndReturnArgs>(args?: SelectSubset<T, AppointmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Appointment.
     * @param {AppointmentDeleteArgs} args - Arguments to delete one Appointment.
     * @example
     * // Delete one Appointment
     * const Appointment = await prisma.appointment.delete({
     *   where: {
     *     // ... filter to delete one Appointment
     *   }
     * })
     * 
     */
    delete<T extends AppointmentDeleteArgs>(args: SelectSubset<T, AppointmentDeleteArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Appointment.
     * @param {AppointmentUpdateArgs} args - Arguments to update one Appointment.
     * @example
     * // Update one Appointment
     * const appointment = await prisma.appointment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppointmentUpdateArgs>(args: SelectSubset<T, AppointmentUpdateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Appointments.
     * @param {AppointmentDeleteManyArgs} args - Arguments to filter Appointments to delete.
     * @example
     * // Delete a few Appointments
     * const { count } = await prisma.appointment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppointmentDeleteManyArgs>(args?: SelectSubset<T, AppointmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Appointments
     * const appointment = await prisma.appointment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppointmentUpdateManyArgs>(args: SelectSubset<T, AppointmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Appointments and returns the data updated in the database.
     * @param {AppointmentUpdateManyAndReturnArgs} args - Arguments to update many Appointments.
     * @example
     * // Update many Appointments
     * const appointment = await prisma.appointment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Appointments and only return the `id`
     * const appointmentWithIdOnly = await prisma.appointment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AppointmentUpdateManyAndReturnArgs>(args: SelectSubset<T, AppointmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Appointment.
     * @param {AppointmentUpsertArgs} args - Arguments to update or create a Appointment.
     * @example
     * // Update or create a Appointment
     * const appointment = await prisma.appointment.upsert({
     *   create: {
     *     // ... data to create a Appointment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Appointment we want to update
     *   }
     * })
     */
    upsert<T extends AppointmentUpsertArgs>(args: SelectSubset<T, AppointmentUpsertArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentCountArgs} args - Arguments to filter Appointments to count.
     * @example
     * // Count the number of Appointments
     * const count = await prisma.appointment.count({
     *   where: {
     *     // ... the filter for the Appointments we want to count
     *   }
     * })
    **/
    count<T extends AppointmentCountArgs>(
      args?: Subset<T, AppointmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppointmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AppointmentAggregateArgs>(args: Subset<T, AppointmentAggregateArgs>): Prisma.PrismaPromise<GetAppointmentAggregateType<T>>

    /**
     * Group by Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AppointmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppointmentGroupByArgs['orderBy'] }
        : { orderBy?: AppointmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AppointmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppointmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Appointment model
   */
  readonly fields: AppointmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Appointment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppointmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    clinic<T extends ClinicDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClinicDefaultArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Appointment model
   */
  interface AppointmentFieldRefs {
    readonly id: FieldRef<"Appointment", 'String'>
    readonly userId: FieldRef<"Appointment", 'String'>
    readonly clinicId: FieldRef<"Appointment", 'String'>
    readonly patientName: FieldRef<"Appointment", 'String'>
    readonly patientAge: FieldRef<"Appointment", 'Int'>
    readonly patientPhone: FieldRef<"Appointment", 'String'>
    readonly patientEmail: FieldRef<"Appointment", 'String'>
    readonly patientAddress: FieldRef<"Appointment", 'String'>
    readonly appointmentDate: FieldRef<"Appointment", 'DateTime'>
    readonly tokenNumber: FieldRef<"Appointment", 'Int'>
    readonly status: FieldRef<"Appointment", 'AppointmentStatus'>
    readonly paymentStatus: FieldRef<"Appointment", 'PaymentStatus'>
    readonly razorpayOrderId: FieldRef<"Appointment", 'String'>
    readonly razorpayPaymentId: FieldRef<"Appointment", 'String'>
    readonly createdAt: FieldRef<"Appointment", 'DateTime'>
    readonly updatedAt: FieldRef<"Appointment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Appointment findUnique
   */
  export type AppointmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findUniqueOrThrow
   */
  export type AppointmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findFirst
   */
  export type AppointmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findFirstOrThrow
   */
  export type AppointmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findMany
   */
  export type AppointmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointments to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment create
   */
  export type AppointmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Appointment.
     */
    data: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
  }

  /**
   * Appointment createMany
   */
  export type AppointmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Appointment createManyAndReturn
   */
  export type AppointmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Appointment update
   */
  export type AppointmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Appointment.
     */
    data: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
    /**
     * Choose, which Appointment to update.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment updateMany
   */
  export type AppointmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Appointments.
     */
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyInput>
    /**
     * Filter which Appointments to update
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to update.
     */
    limit?: number
  }

  /**
   * Appointment updateManyAndReturn
   */
  export type AppointmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * The data used to update Appointments.
     */
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyInput>
    /**
     * Filter which Appointments to update
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Appointment upsert
   */
  export type AppointmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Appointment to update in case it exists.
     */
    where: AppointmentWhereUniqueInput
    /**
     * In case the Appointment found by the `where` argument doesn't exist, create a new Appointment with this data.
     */
    create: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
    /**
     * In case the Appointment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
  }

  /**
   * Appointment delete
   */
  export type AppointmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter which Appointment to delete.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment deleteMany
   */
  export type AppointmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointments to delete
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to delete.
     */
    limit?: number
  }

  /**
   * Appointment without action
   */
  export type AppointmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
  }


  /**
   * Model QueueState
   */

  export type AggregateQueueState = {
    _count: QueueStateCountAggregateOutputType | null
    _avg: QueueStateAvgAggregateOutputType | null
    _sum: QueueStateSumAggregateOutputType | null
    _min: QueueStateMinAggregateOutputType | null
    _max: QueueStateMaxAggregateOutputType | null
  }

  export type QueueStateAvgAggregateOutputType = {
    currentToken: number | null
    totalBookedToday: number | null
  }

  export type QueueStateSumAggregateOutputType = {
    currentToken: number | null
    totalBookedToday: number | null
  }

  export type QueueStateMinAggregateOutputType = {
    id: string | null
    clinicId: string | null
    currentToken: number | null
    totalBookedToday: number | null
    date: Date | null
    updatedAt: Date | null
  }

  export type QueueStateMaxAggregateOutputType = {
    id: string | null
    clinicId: string | null
    currentToken: number | null
    totalBookedToday: number | null
    date: Date | null
    updatedAt: Date | null
  }

  export type QueueStateCountAggregateOutputType = {
    id: number
    clinicId: number
    currentToken: number
    totalBookedToday: number
    date: number
    updatedAt: number
    _all: number
  }


  export type QueueStateAvgAggregateInputType = {
    currentToken?: true
    totalBookedToday?: true
  }

  export type QueueStateSumAggregateInputType = {
    currentToken?: true
    totalBookedToday?: true
  }

  export type QueueStateMinAggregateInputType = {
    id?: true
    clinicId?: true
    currentToken?: true
    totalBookedToday?: true
    date?: true
    updatedAt?: true
  }

  export type QueueStateMaxAggregateInputType = {
    id?: true
    clinicId?: true
    currentToken?: true
    totalBookedToday?: true
    date?: true
    updatedAt?: true
  }

  export type QueueStateCountAggregateInputType = {
    id?: true
    clinicId?: true
    currentToken?: true
    totalBookedToday?: true
    date?: true
    updatedAt?: true
    _all?: true
  }

  export type QueueStateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QueueState to aggregate.
     */
    where?: QueueStateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QueueStates to fetch.
     */
    orderBy?: QueueStateOrderByWithRelationInput | QueueStateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QueueStateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QueueStates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QueueStates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QueueStates
    **/
    _count?: true | QueueStateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QueueStateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QueueStateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QueueStateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QueueStateMaxAggregateInputType
  }

  export type GetQueueStateAggregateType<T extends QueueStateAggregateArgs> = {
        [P in keyof T & keyof AggregateQueueState]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQueueState[P]>
      : GetScalarType<T[P], AggregateQueueState[P]>
  }




  export type QueueStateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QueueStateWhereInput
    orderBy?: QueueStateOrderByWithAggregationInput | QueueStateOrderByWithAggregationInput[]
    by: QueueStateScalarFieldEnum[] | QueueStateScalarFieldEnum
    having?: QueueStateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QueueStateCountAggregateInputType | true
    _avg?: QueueStateAvgAggregateInputType
    _sum?: QueueStateSumAggregateInputType
    _min?: QueueStateMinAggregateInputType
    _max?: QueueStateMaxAggregateInputType
  }

  export type QueueStateGroupByOutputType = {
    id: string
    clinicId: string
    currentToken: number
    totalBookedToday: number
    date: Date
    updatedAt: Date
    _count: QueueStateCountAggregateOutputType | null
    _avg: QueueStateAvgAggregateOutputType | null
    _sum: QueueStateSumAggregateOutputType | null
    _min: QueueStateMinAggregateOutputType | null
    _max: QueueStateMaxAggregateOutputType | null
  }

  type GetQueueStateGroupByPayload<T extends QueueStateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QueueStateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QueueStateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QueueStateGroupByOutputType[P]>
            : GetScalarType<T[P], QueueStateGroupByOutputType[P]>
        }
      >
    >


  export type QueueStateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clinicId?: boolean
    currentToken?: boolean
    totalBookedToday?: boolean
    date?: boolean
    updatedAt?: boolean
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["queueState"]>

  export type QueueStateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clinicId?: boolean
    currentToken?: boolean
    totalBookedToday?: boolean
    date?: boolean
    updatedAt?: boolean
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["queueState"]>

  export type QueueStateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clinicId?: boolean
    currentToken?: boolean
    totalBookedToday?: boolean
    date?: boolean
    updatedAt?: boolean
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["queueState"]>

  export type QueueStateSelectScalar = {
    id?: boolean
    clinicId?: boolean
    currentToken?: boolean
    totalBookedToday?: boolean
    date?: boolean
    updatedAt?: boolean
  }

  export type QueueStateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "clinicId" | "currentToken" | "totalBookedToday" | "date" | "updatedAt", ExtArgs["result"]["queueState"]>
  export type QueueStateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
  }
  export type QueueStateIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
  }
  export type QueueStateIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
  }

  export type $QueueStatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QueueState"
    objects: {
      clinic: Prisma.$ClinicPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      clinicId: string
      /**
       * The token number currently being served
       */
      currentToken: number
      /**
       * Total tokens booked for today
       */
      totalBookedToday: number
      /**
       * The date this queue state applies to (reset daily)
       */
      date: Date
      updatedAt: Date
    }, ExtArgs["result"]["queueState"]>
    composites: {}
  }

  type QueueStateGetPayload<S extends boolean | null | undefined | QueueStateDefaultArgs> = $Result.GetResult<Prisma.$QueueStatePayload, S>

  type QueueStateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QueueStateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QueueStateCountAggregateInputType | true
    }

  export interface QueueStateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QueueState'], meta: { name: 'QueueState' } }
    /**
     * Find zero or one QueueState that matches the filter.
     * @param {QueueStateFindUniqueArgs} args - Arguments to find a QueueState
     * @example
     * // Get one QueueState
     * const queueState = await prisma.queueState.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QueueStateFindUniqueArgs>(args: SelectSubset<T, QueueStateFindUniqueArgs<ExtArgs>>): Prisma__QueueStateClient<$Result.GetResult<Prisma.$QueueStatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one QueueState that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QueueStateFindUniqueOrThrowArgs} args - Arguments to find a QueueState
     * @example
     * // Get one QueueState
     * const queueState = await prisma.queueState.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QueueStateFindUniqueOrThrowArgs>(args: SelectSubset<T, QueueStateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QueueStateClient<$Result.GetResult<Prisma.$QueueStatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QueueState that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueStateFindFirstArgs} args - Arguments to find a QueueState
     * @example
     * // Get one QueueState
     * const queueState = await prisma.queueState.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QueueStateFindFirstArgs>(args?: SelectSubset<T, QueueStateFindFirstArgs<ExtArgs>>): Prisma__QueueStateClient<$Result.GetResult<Prisma.$QueueStatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QueueState that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueStateFindFirstOrThrowArgs} args - Arguments to find a QueueState
     * @example
     * // Get one QueueState
     * const queueState = await prisma.queueState.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QueueStateFindFirstOrThrowArgs>(args?: SelectSubset<T, QueueStateFindFirstOrThrowArgs<ExtArgs>>): Prisma__QueueStateClient<$Result.GetResult<Prisma.$QueueStatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more QueueStates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueStateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QueueStates
     * const queueStates = await prisma.queueState.findMany()
     * 
     * // Get first 10 QueueStates
     * const queueStates = await prisma.queueState.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const queueStateWithIdOnly = await prisma.queueState.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QueueStateFindManyArgs>(args?: SelectSubset<T, QueueStateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QueueStatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a QueueState.
     * @param {QueueStateCreateArgs} args - Arguments to create a QueueState.
     * @example
     * // Create one QueueState
     * const QueueState = await prisma.queueState.create({
     *   data: {
     *     // ... data to create a QueueState
     *   }
     * })
     * 
     */
    create<T extends QueueStateCreateArgs>(args: SelectSubset<T, QueueStateCreateArgs<ExtArgs>>): Prisma__QueueStateClient<$Result.GetResult<Prisma.$QueueStatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many QueueStates.
     * @param {QueueStateCreateManyArgs} args - Arguments to create many QueueStates.
     * @example
     * // Create many QueueStates
     * const queueState = await prisma.queueState.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QueueStateCreateManyArgs>(args?: SelectSubset<T, QueueStateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QueueStates and returns the data saved in the database.
     * @param {QueueStateCreateManyAndReturnArgs} args - Arguments to create many QueueStates.
     * @example
     * // Create many QueueStates
     * const queueState = await prisma.queueState.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QueueStates and only return the `id`
     * const queueStateWithIdOnly = await prisma.queueState.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QueueStateCreateManyAndReturnArgs>(args?: SelectSubset<T, QueueStateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QueueStatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a QueueState.
     * @param {QueueStateDeleteArgs} args - Arguments to delete one QueueState.
     * @example
     * // Delete one QueueState
     * const QueueState = await prisma.queueState.delete({
     *   where: {
     *     // ... filter to delete one QueueState
     *   }
     * })
     * 
     */
    delete<T extends QueueStateDeleteArgs>(args: SelectSubset<T, QueueStateDeleteArgs<ExtArgs>>): Prisma__QueueStateClient<$Result.GetResult<Prisma.$QueueStatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one QueueState.
     * @param {QueueStateUpdateArgs} args - Arguments to update one QueueState.
     * @example
     * // Update one QueueState
     * const queueState = await prisma.queueState.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QueueStateUpdateArgs>(args: SelectSubset<T, QueueStateUpdateArgs<ExtArgs>>): Prisma__QueueStateClient<$Result.GetResult<Prisma.$QueueStatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more QueueStates.
     * @param {QueueStateDeleteManyArgs} args - Arguments to filter QueueStates to delete.
     * @example
     * // Delete a few QueueStates
     * const { count } = await prisma.queueState.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QueueStateDeleteManyArgs>(args?: SelectSubset<T, QueueStateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QueueStates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueStateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QueueStates
     * const queueState = await prisma.queueState.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QueueStateUpdateManyArgs>(args: SelectSubset<T, QueueStateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QueueStates and returns the data updated in the database.
     * @param {QueueStateUpdateManyAndReturnArgs} args - Arguments to update many QueueStates.
     * @example
     * // Update many QueueStates
     * const queueState = await prisma.queueState.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more QueueStates and only return the `id`
     * const queueStateWithIdOnly = await prisma.queueState.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends QueueStateUpdateManyAndReturnArgs>(args: SelectSubset<T, QueueStateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QueueStatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one QueueState.
     * @param {QueueStateUpsertArgs} args - Arguments to update or create a QueueState.
     * @example
     * // Update or create a QueueState
     * const queueState = await prisma.queueState.upsert({
     *   create: {
     *     // ... data to create a QueueState
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QueueState we want to update
     *   }
     * })
     */
    upsert<T extends QueueStateUpsertArgs>(args: SelectSubset<T, QueueStateUpsertArgs<ExtArgs>>): Prisma__QueueStateClient<$Result.GetResult<Prisma.$QueueStatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of QueueStates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueStateCountArgs} args - Arguments to filter QueueStates to count.
     * @example
     * // Count the number of QueueStates
     * const count = await prisma.queueState.count({
     *   where: {
     *     // ... the filter for the QueueStates we want to count
     *   }
     * })
    **/
    count<T extends QueueStateCountArgs>(
      args?: Subset<T, QueueStateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QueueStateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QueueState.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueStateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QueueStateAggregateArgs>(args: Subset<T, QueueStateAggregateArgs>): Prisma.PrismaPromise<GetQueueStateAggregateType<T>>

    /**
     * Group by QueueState.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueStateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QueueStateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QueueStateGroupByArgs['orderBy'] }
        : { orderBy?: QueueStateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QueueStateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQueueStateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QueueState model
   */
  readonly fields: QueueStateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QueueState.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QueueStateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    clinic<T extends ClinicDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClinicDefaultArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the QueueState model
   */
  interface QueueStateFieldRefs {
    readonly id: FieldRef<"QueueState", 'String'>
    readonly clinicId: FieldRef<"QueueState", 'String'>
    readonly currentToken: FieldRef<"QueueState", 'Int'>
    readonly totalBookedToday: FieldRef<"QueueState", 'Int'>
    readonly date: FieldRef<"QueueState", 'DateTime'>
    readonly updatedAt: FieldRef<"QueueState", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * QueueState findUnique
   */
  export type QueueStateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueState
     */
    select?: QueueStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueState
     */
    omit?: QueueStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueStateInclude<ExtArgs> | null
    /**
     * Filter, which QueueState to fetch.
     */
    where: QueueStateWhereUniqueInput
  }

  /**
   * QueueState findUniqueOrThrow
   */
  export type QueueStateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueState
     */
    select?: QueueStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueState
     */
    omit?: QueueStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueStateInclude<ExtArgs> | null
    /**
     * Filter, which QueueState to fetch.
     */
    where: QueueStateWhereUniqueInput
  }

  /**
   * QueueState findFirst
   */
  export type QueueStateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueState
     */
    select?: QueueStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueState
     */
    omit?: QueueStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueStateInclude<ExtArgs> | null
    /**
     * Filter, which QueueState to fetch.
     */
    where?: QueueStateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QueueStates to fetch.
     */
    orderBy?: QueueStateOrderByWithRelationInput | QueueStateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QueueStates.
     */
    cursor?: QueueStateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QueueStates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QueueStates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QueueStates.
     */
    distinct?: QueueStateScalarFieldEnum | QueueStateScalarFieldEnum[]
  }

  /**
   * QueueState findFirstOrThrow
   */
  export type QueueStateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueState
     */
    select?: QueueStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueState
     */
    omit?: QueueStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueStateInclude<ExtArgs> | null
    /**
     * Filter, which QueueState to fetch.
     */
    where?: QueueStateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QueueStates to fetch.
     */
    orderBy?: QueueStateOrderByWithRelationInput | QueueStateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QueueStates.
     */
    cursor?: QueueStateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QueueStates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QueueStates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QueueStates.
     */
    distinct?: QueueStateScalarFieldEnum | QueueStateScalarFieldEnum[]
  }

  /**
   * QueueState findMany
   */
  export type QueueStateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueState
     */
    select?: QueueStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueState
     */
    omit?: QueueStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueStateInclude<ExtArgs> | null
    /**
     * Filter, which QueueStates to fetch.
     */
    where?: QueueStateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QueueStates to fetch.
     */
    orderBy?: QueueStateOrderByWithRelationInput | QueueStateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QueueStates.
     */
    cursor?: QueueStateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QueueStates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QueueStates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QueueStates.
     */
    distinct?: QueueStateScalarFieldEnum | QueueStateScalarFieldEnum[]
  }

  /**
   * QueueState create
   */
  export type QueueStateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueState
     */
    select?: QueueStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueState
     */
    omit?: QueueStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueStateInclude<ExtArgs> | null
    /**
     * The data needed to create a QueueState.
     */
    data: XOR<QueueStateCreateInput, QueueStateUncheckedCreateInput>
  }

  /**
   * QueueState createMany
   */
  export type QueueStateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QueueStates.
     */
    data: QueueStateCreateManyInput | QueueStateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QueueState createManyAndReturn
   */
  export type QueueStateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueState
     */
    select?: QueueStateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QueueState
     */
    omit?: QueueStateOmit<ExtArgs> | null
    /**
     * The data used to create many QueueStates.
     */
    data: QueueStateCreateManyInput | QueueStateCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueStateIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * QueueState update
   */
  export type QueueStateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueState
     */
    select?: QueueStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueState
     */
    omit?: QueueStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueStateInclude<ExtArgs> | null
    /**
     * The data needed to update a QueueState.
     */
    data: XOR<QueueStateUpdateInput, QueueStateUncheckedUpdateInput>
    /**
     * Choose, which QueueState to update.
     */
    where: QueueStateWhereUniqueInput
  }

  /**
   * QueueState updateMany
   */
  export type QueueStateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QueueStates.
     */
    data: XOR<QueueStateUpdateManyMutationInput, QueueStateUncheckedUpdateManyInput>
    /**
     * Filter which QueueStates to update
     */
    where?: QueueStateWhereInput
    /**
     * Limit how many QueueStates to update.
     */
    limit?: number
  }

  /**
   * QueueState updateManyAndReturn
   */
  export type QueueStateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueState
     */
    select?: QueueStateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QueueState
     */
    omit?: QueueStateOmit<ExtArgs> | null
    /**
     * The data used to update QueueStates.
     */
    data: XOR<QueueStateUpdateManyMutationInput, QueueStateUncheckedUpdateManyInput>
    /**
     * Filter which QueueStates to update
     */
    where?: QueueStateWhereInput
    /**
     * Limit how many QueueStates to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueStateIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * QueueState upsert
   */
  export type QueueStateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueState
     */
    select?: QueueStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueState
     */
    omit?: QueueStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueStateInclude<ExtArgs> | null
    /**
     * The filter to search for the QueueState to update in case it exists.
     */
    where: QueueStateWhereUniqueInput
    /**
     * In case the QueueState found by the `where` argument doesn't exist, create a new QueueState with this data.
     */
    create: XOR<QueueStateCreateInput, QueueStateUncheckedCreateInput>
    /**
     * In case the QueueState was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QueueStateUpdateInput, QueueStateUncheckedUpdateInput>
  }

  /**
   * QueueState delete
   */
  export type QueueStateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueState
     */
    select?: QueueStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueState
     */
    omit?: QueueStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueStateInclude<ExtArgs> | null
    /**
     * Filter which QueueState to delete.
     */
    where: QueueStateWhereUniqueInput
  }

  /**
   * QueueState deleteMany
   */
  export type QueueStateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QueueStates to delete
     */
    where?: QueueStateWhereInput
    /**
     * Limit how many QueueStates to delete.
     */
    limit?: number
  }

  /**
   * QueueState without action
   */
  export type QueueStateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueState
     */
    select?: QueueStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueState
     */
    omit?: QueueStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueStateInclude<ExtArgs> | null
  }


  /**
   * Model VerificationLog
   */

  export type AggregateVerificationLog = {
    _count: VerificationLogCountAggregateOutputType | null
    _min: VerificationLogMinAggregateOutputType | null
    _max: VerificationLogMaxAggregateOutputType | null
  }

  export type VerificationLogMinAggregateOutputType = {
    id: string | null
    clinicId: string | null
    verifierId: string | null
    status: $Enums.VerificationOutcome | null
    notes: string | null
    proofImageUrl: string | null
    createdAt: Date | null
  }

  export type VerificationLogMaxAggregateOutputType = {
    id: string | null
    clinicId: string | null
    verifierId: string | null
    status: $Enums.VerificationOutcome | null
    notes: string | null
    proofImageUrl: string | null
    createdAt: Date | null
  }

  export type VerificationLogCountAggregateOutputType = {
    id: number
    clinicId: number
    verifierId: number
    status: number
    notes: number
    proofImageUrl: number
    createdAt: number
    _all: number
  }


  export type VerificationLogMinAggregateInputType = {
    id?: true
    clinicId?: true
    verifierId?: true
    status?: true
    notes?: true
    proofImageUrl?: true
    createdAt?: true
  }

  export type VerificationLogMaxAggregateInputType = {
    id?: true
    clinicId?: true
    verifierId?: true
    status?: true
    notes?: true
    proofImageUrl?: true
    createdAt?: true
  }

  export type VerificationLogCountAggregateInputType = {
    id?: true
    clinicId?: true
    verifierId?: true
    status?: true
    notes?: true
    proofImageUrl?: true
    createdAt?: true
    _all?: true
  }

  export type VerificationLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationLog to aggregate.
     */
    where?: VerificationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationLogs to fetch.
     */
    orderBy?: VerificationLogOrderByWithRelationInput | VerificationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationLogs
    **/
    _count?: true | VerificationLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationLogMaxAggregateInputType
  }

  export type GetVerificationLogAggregateType<T extends VerificationLogAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationLog[P]>
      : GetScalarType<T[P], AggregateVerificationLog[P]>
  }




  export type VerificationLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationLogWhereInput
    orderBy?: VerificationLogOrderByWithAggregationInput | VerificationLogOrderByWithAggregationInput[]
    by: VerificationLogScalarFieldEnum[] | VerificationLogScalarFieldEnum
    having?: VerificationLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationLogCountAggregateInputType | true
    _min?: VerificationLogMinAggregateInputType
    _max?: VerificationLogMaxAggregateInputType
  }

  export type VerificationLogGroupByOutputType = {
    id: string
    clinicId: string
    verifierId: string
    status: $Enums.VerificationOutcome
    notes: string | null
    proofImageUrl: string | null
    createdAt: Date
    _count: VerificationLogCountAggregateOutputType | null
    _min: VerificationLogMinAggregateOutputType | null
    _max: VerificationLogMaxAggregateOutputType | null
  }

  type GetVerificationLogGroupByPayload<T extends VerificationLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationLogGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationLogGroupByOutputType[P]>
        }
      >
    >


  export type VerificationLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clinicId?: boolean
    verifierId?: boolean
    status?: boolean
    notes?: boolean
    proofImageUrl?: boolean
    createdAt?: boolean
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    verifier?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["verificationLog"]>

  export type VerificationLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clinicId?: boolean
    verifierId?: boolean
    status?: boolean
    notes?: boolean
    proofImageUrl?: boolean
    createdAt?: boolean
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    verifier?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["verificationLog"]>

  export type VerificationLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clinicId?: boolean
    verifierId?: boolean
    status?: boolean
    notes?: boolean
    proofImageUrl?: boolean
    createdAt?: boolean
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    verifier?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["verificationLog"]>

  export type VerificationLogSelectScalar = {
    id?: boolean
    clinicId?: boolean
    verifierId?: boolean
    status?: boolean
    notes?: boolean
    proofImageUrl?: boolean
    createdAt?: boolean
  }

  export type VerificationLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "clinicId" | "verifierId" | "status" | "notes" | "proofImageUrl" | "createdAt", ExtArgs["result"]["verificationLog"]>
  export type VerificationLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    verifier?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type VerificationLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    verifier?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type VerificationLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    verifier?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $VerificationLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VerificationLog"
    objects: {
      clinic: Prisma.$ClinicPayload<ExtArgs>
      verifier: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      /**
       * The clinic being verified
       */
      clinicId: string
      /**
       * The verifier who performed the visit
       */
      verifierId: string
      /**
       * Outcome of the verification visit
       */
      status: $Enums.VerificationOutcome
      /**
       * Optional notes from the verifier (reason for rejection, etc.)
       */
      notes: string | null
      /**
       * Optional proof photo URL (Cloudinary) taken during the visit
       */
      proofImageUrl: string | null
      createdAt: Date
    }, ExtArgs["result"]["verificationLog"]>
    composites: {}
  }

  type VerificationLogGetPayload<S extends boolean | null | undefined | VerificationLogDefaultArgs> = $Result.GetResult<Prisma.$VerificationLogPayload, S>

  type VerificationLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationLogCountAggregateInputType | true
    }

  export interface VerificationLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VerificationLog'], meta: { name: 'VerificationLog' } }
    /**
     * Find zero or one VerificationLog that matches the filter.
     * @param {VerificationLogFindUniqueArgs} args - Arguments to find a VerificationLog
     * @example
     * // Get one VerificationLog
     * const verificationLog = await prisma.verificationLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationLogFindUniqueArgs>(args: SelectSubset<T, VerificationLogFindUniqueArgs<ExtArgs>>): Prisma__VerificationLogClient<$Result.GetResult<Prisma.$VerificationLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VerificationLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationLogFindUniqueOrThrowArgs} args - Arguments to find a VerificationLog
     * @example
     * // Get one VerificationLog
     * const verificationLog = await prisma.verificationLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationLogFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationLogClient<$Result.GetResult<Prisma.$VerificationLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationLogFindFirstArgs} args - Arguments to find a VerificationLog
     * @example
     * // Get one VerificationLog
     * const verificationLog = await prisma.verificationLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationLogFindFirstArgs>(args?: SelectSubset<T, VerificationLogFindFirstArgs<ExtArgs>>): Prisma__VerificationLogClient<$Result.GetResult<Prisma.$VerificationLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationLogFindFirstOrThrowArgs} args - Arguments to find a VerificationLog
     * @example
     * // Get one VerificationLog
     * const verificationLog = await prisma.verificationLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationLogFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationLogClient<$Result.GetResult<Prisma.$VerificationLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VerificationLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationLogs
     * const verificationLogs = await prisma.verificationLog.findMany()
     * 
     * // Get first 10 VerificationLogs
     * const verificationLogs = await prisma.verificationLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const verificationLogWithIdOnly = await prisma.verificationLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VerificationLogFindManyArgs>(args?: SelectSubset<T, VerificationLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VerificationLog.
     * @param {VerificationLogCreateArgs} args - Arguments to create a VerificationLog.
     * @example
     * // Create one VerificationLog
     * const VerificationLog = await prisma.verificationLog.create({
     *   data: {
     *     // ... data to create a VerificationLog
     *   }
     * })
     * 
     */
    create<T extends VerificationLogCreateArgs>(args: SelectSubset<T, VerificationLogCreateArgs<ExtArgs>>): Prisma__VerificationLogClient<$Result.GetResult<Prisma.$VerificationLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VerificationLogs.
     * @param {VerificationLogCreateManyArgs} args - Arguments to create many VerificationLogs.
     * @example
     * // Create many VerificationLogs
     * const verificationLog = await prisma.verificationLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationLogCreateManyArgs>(args?: SelectSubset<T, VerificationLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VerificationLogs and returns the data saved in the database.
     * @param {VerificationLogCreateManyAndReturnArgs} args - Arguments to create many VerificationLogs.
     * @example
     * // Create many VerificationLogs
     * const verificationLog = await prisma.verificationLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VerificationLogs and only return the `id`
     * const verificationLogWithIdOnly = await prisma.verificationLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationLogCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VerificationLog.
     * @param {VerificationLogDeleteArgs} args - Arguments to delete one VerificationLog.
     * @example
     * // Delete one VerificationLog
     * const VerificationLog = await prisma.verificationLog.delete({
     *   where: {
     *     // ... filter to delete one VerificationLog
     *   }
     * })
     * 
     */
    delete<T extends VerificationLogDeleteArgs>(args: SelectSubset<T, VerificationLogDeleteArgs<ExtArgs>>): Prisma__VerificationLogClient<$Result.GetResult<Prisma.$VerificationLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VerificationLog.
     * @param {VerificationLogUpdateArgs} args - Arguments to update one VerificationLog.
     * @example
     * // Update one VerificationLog
     * const verificationLog = await prisma.verificationLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationLogUpdateArgs>(args: SelectSubset<T, VerificationLogUpdateArgs<ExtArgs>>): Prisma__VerificationLogClient<$Result.GetResult<Prisma.$VerificationLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VerificationLogs.
     * @param {VerificationLogDeleteManyArgs} args - Arguments to filter VerificationLogs to delete.
     * @example
     * // Delete a few VerificationLogs
     * const { count } = await prisma.verificationLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationLogDeleteManyArgs>(args?: SelectSubset<T, VerificationLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationLogs
     * const verificationLog = await prisma.verificationLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationLogUpdateManyArgs>(args: SelectSubset<T, VerificationLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationLogs and returns the data updated in the database.
     * @param {VerificationLogUpdateManyAndReturnArgs} args - Arguments to update many VerificationLogs.
     * @example
     * // Update many VerificationLogs
     * const verificationLog = await prisma.verificationLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VerificationLogs and only return the `id`
     * const verificationLogWithIdOnly = await prisma.verificationLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VerificationLogUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VerificationLog.
     * @param {VerificationLogUpsertArgs} args - Arguments to update or create a VerificationLog.
     * @example
     * // Update or create a VerificationLog
     * const verificationLog = await prisma.verificationLog.upsert({
     *   create: {
     *     // ... data to create a VerificationLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationLog we want to update
     *   }
     * })
     */
    upsert<T extends VerificationLogUpsertArgs>(args: SelectSubset<T, VerificationLogUpsertArgs<ExtArgs>>): Prisma__VerificationLogClient<$Result.GetResult<Prisma.$VerificationLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VerificationLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationLogCountArgs} args - Arguments to filter VerificationLogs to count.
     * @example
     * // Count the number of VerificationLogs
     * const count = await prisma.verificationLog.count({
     *   where: {
     *     // ... the filter for the VerificationLogs we want to count
     *   }
     * })
    **/
    count<T extends VerificationLogCountArgs>(
      args?: Subset<T, VerificationLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationLogAggregateArgs>(args: Subset<T, VerificationLogAggregateArgs>): Prisma.PrismaPromise<GetVerificationLogAggregateType<T>>

    /**
     * Group by VerificationLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationLogGroupByArgs['orderBy'] }
        : { orderBy?: VerificationLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VerificationLog model
   */
  readonly fields: VerificationLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    clinic<T extends ClinicDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClinicDefaultArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    verifier<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VerificationLog model
   */
  interface VerificationLogFieldRefs {
    readonly id: FieldRef<"VerificationLog", 'String'>
    readonly clinicId: FieldRef<"VerificationLog", 'String'>
    readonly verifierId: FieldRef<"VerificationLog", 'String'>
    readonly status: FieldRef<"VerificationLog", 'VerificationOutcome'>
    readonly notes: FieldRef<"VerificationLog", 'String'>
    readonly proofImageUrl: FieldRef<"VerificationLog", 'String'>
    readonly createdAt: FieldRef<"VerificationLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VerificationLog findUnique
   */
  export type VerificationLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationLog
     */
    select?: VerificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationLog
     */
    omit?: VerificationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationLogInclude<ExtArgs> | null
    /**
     * Filter, which VerificationLog to fetch.
     */
    where: VerificationLogWhereUniqueInput
  }

  /**
   * VerificationLog findUniqueOrThrow
   */
  export type VerificationLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationLog
     */
    select?: VerificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationLog
     */
    omit?: VerificationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationLogInclude<ExtArgs> | null
    /**
     * Filter, which VerificationLog to fetch.
     */
    where: VerificationLogWhereUniqueInput
  }

  /**
   * VerificationLog findFirst
   */
  export type VerificationLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationLog
     */
    select?: VerificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationLog
     */
    omit?: VerificationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationLogInclude<ExtArgs> | null
    /**
     * Filter, which VerificationLog to fetch.
     */
    where?: VerificationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationLogs to fetch.
     */
    orderBy?: VerificationLogOrderByWithRelationInput | VerificationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationLogs.
     */
    cursor?: VerificationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationLogs.
     */
    distinct?: VerificationLogScalarFieldEnum | VerificationLogScalarFieldEnum[]
  }

  /**
   * VerificationLog findFirstOrThrow
   */
  export type VerificationLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationLog
     */
    select?: VerificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationLog
     */
    omit?: VerificationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationLogInclude<ExtArgs> | null
    /**
     * Filter, which VerificationLog to fetch.
     */
    where?: VerificationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationLogs to fetch.
     */
    orderBy?: VerificationLogOrderByWithRelationInput | VerificationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationLogs.
     */
    cursor?: VerificationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationLogs.
     */
    distinct?: VerificationLogScalarFieldEnum | VerificationLogScalarFieldEnum[]
  }

  /**
   * VerificationLog findMany
   */
  export type VerificationLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationLog
     */
    select?: VerificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationLog
     */
    omit?: VerificationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationLogInclude<ExtArgs> | null
    /**
     * Filter, which VerificationLogs to fetch.
     */
    where?: VerificationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationLogs to fetch.
     */
    orderBy?: VerificationLogOrderByWithRelationInput | VerificationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationLogs.
     */
    cursor?: VerificationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationLogs.
     */
    distinct?: VerificationLogScalarFieldEnum | VerificationLogScalarFieldEnum[]
  }

  /**
   * VerificationLog create
   */
  export type VerificationLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationLog
     */
    select?: VerificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationLog
     */
    omit?: VerificationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationLogInclude<ExtArgs> | null
    /**
     * The data needed to create a VerificationLog.
     */
    data: XOR<VerificationLogCreateInput, VerificationLogUncheckedCreateInput>
  }

  /**
   * VerificationLog createMany
   */
  export type VerificationLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VerificationLogs.
     */
    data: VerificationLogCreateManyInput | VerificationLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationLog createManyAndReturn
   */
  export type VerificationLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationLog
     */
    select?: VerificationLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationLog
     */
    omit?: VerificationLogOmit<ExtArgs> | null
    /**
     * The data used to create many VerificationLogs.
     */
    data: VerificationLogCreateManyInput | VerificationLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VerificationLog update
   */
  export type VerificationLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationLog
     */
    select?: VerificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationLog
     */
    omit?: VerificationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationLogInclude<ExtArgs> | null
    /**
     * The data needed to update a VerificationLog.
     */
    data: XOR<VerificationLogUpdateInput, VerificationLogUncheckedUpdateInput>
    /**
     * Choose, which VerificationLog to update.
     */
    where: VerificationLogWhereUniqueInput
  }

  /**
   * VerificationLog updateMany
   */
  export type VerificationLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VerificationLogs.
     */
    data: XOR<VerificationLogUpdateManyMutationInput, VerificationLogUncheckedUpdateManyInput>
    /**
     * Filter which VerificationLogs to update
     */
    where?: VerificationLogWhereInput
    /**
     * Limit how many VerificationLogs to update.
     */
    limit?: number
  }

  /**
   * VerificationLog updateManyAndReturn
   */
  export type VerificationLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationLog
     */
    select?: VerificationLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationLog
     */
    omit?: VerificationLogOmit<ExtArgs> | null
    /**
     * The data used to update VerificationLogs.
     */
    data: XOR<VerificationLogUpdateManyMutationInput, VerificationLogUncheckedUpdateManyInput>
    /**
     * Filter which VerificationLogs to update
     */
    where?: VerificationLogWhereInput
    /**
     * Limit how many VerificationLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * VerificationLog upsert
   */
  export type VerificationLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationLog
     */
    select?: VerificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationLog
     */
    omit?: VerificationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationLogInclude<ExtArgs> | null
    /**
     * The filter to search for the VerificationLog to update in case it exists.
     */
    where: VerificationLogWhereUniqueInput
    /**
     * In case the VerificationLog found by the `where` argument doesn't exist, create a new VerificationLog with this data.
     */
    create: XOR<VerificationLogCreateInput, VerificationLogUncheckedCreateInput>
    /**
     * In case the VerificationLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationLogUpdateInput, VerificationLogUncheckedUpdateInput>
  }

  /**
   * VerificationLog delete
   */
  export type VerificationLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationLog
     */
    select?: VerificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationLog
     */
    omit?: VerificationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationLogInclude<ExtArgs> | null
    /**
     * Filter which VerificationLog to delete.
     */
    where: VerificationLogWhereUniqueInput
  }

  /**
   * VerificationLog deleteMany
   */
  export type VerificationLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationLogs to delete
     */
    where?: VerificationLogWhereInput
    /**
     * Limit how many VerificationLogs to delete.
     */
    limit?: number
  }

  /**
   * VerificationLog without action
   */
  export type VerificationLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationLog
     */
    select?: VerificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationLog
     */
    omit?: VerificationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    phone: 'phone',
    email: 'email',
    passwordHash: 'passwordHash',
    role: 'role',
    fcmToken: 'fcmToken',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ClinicScalarFieldEnum: {
    id: 'id',
    name: 'name',
    address: 'address',
    city: 'city',
    state: 'state',
    pincode: 'pincode',
    latitude: 'latitude',
    longitude: 'longitude',
    doctorName: 'doctorName',
    degree: 'degree',
    college: 'college',
    experience: 'experience',
    specialization: 'specialization',
    clinicImages: 'clinicImages',
    doctorPhoto: 'doctorPhoto',
    maxPatientsPerDay: 'maxPatientsPerDay',
    paymentRequired: 'paymentRequired',
    consultationFee: 'consultationFee',
    status: 'status',
    adminId: 'adminId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ClinicScalarFieldEnum = (typeof ClinicScalarFieldEnum)[keyof typeof ClinicScalarFieldEnum]


  export const AppointmentScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    clinicId: 'clinicId',
    patientName: 'patientName',
    patientAge: 'patientAge',
    patientPhone: 'patientPhone',
    patientEmail: 'patientEmail',
    patientAddress: 'patientAddress',
    appointmentDate: 'appointmentDate',
    tokenNumber: 'tokenNumber',
    status: 'status',
    paymentStatus: 'paymentStatus',
    razorpayOrderId: 'razorpayOrderId',
    razorpayPaymentId: 'razorpayPaymentId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AppointmentScalarFieldEnum = (typeof AppointmentScalarFieldEnum)[keyof typeof AppointmentScalarFieldEnum]


  export const QueueStateScalarFieldEnum: {
    id: 'id',
    clinicId: 'clinicId',
    currentToken: 'currentToken',
    totalBookedToday: 'totalBookedToday',
    date: 'date',
    updatedAt: 'updatedAt'
  };

  export type QueueStateScalarFieldEnum = (typeof QueueStateScalarFieldEnum)[keyof typeof QueueStateScalarFieldEnum]


  export const VerificationLogScalarFieldEnum: {
    id: 'id',
    clinicId: 'clinicId',
    verifierId: 'verifierId',
    status: 'status',
    notes: 'notes',
    proofImageUrl: 'proofImageUrl',
    createdAt: 'createdAt'
  };

  export type VerificationLogScalarFieldEnum = (typeof VerificationLogScalarFieldEnum)[keyof typeof VerificationLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'ClinicStatus'
   */
  export type EnumClinicStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ClinicStatus'>
    


  /**
   * Reference to a field of type 'ClinicStatus[]'
   */
  export type ListEnumClinicStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ClinicStatus[]'>
    


  /**
   * Reference to a field of type 'AppointmentStatus'
   */
  export type EnumAppointmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AppointmentStatus'>
    


  /**
   * Reference to a field of type 'AppointmentStatus[]'
   */
  export type ListEnumAppointmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AppointmentStatus[]'>
    


  /**
   * Reference to a field of type 'PaymentStatus'
   */
  export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus'>
    


  /**
   * Reference to a field of type 'PaymentStatus[]'
   */
  export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus[]'>
    


  /**
   * Reference to a field of type 'VerificationOutcome'
   */
  export type EnumVerificationOutcomeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VerificationOutcome'>
    


  /**
   * Reference to a field of type 'VerificationOutcome[]'
   */
  export type ListEnumVerificationOutcomeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VerificationOutcome[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    phone?: StringFilter<"User"> | string
    email?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    fcmToken?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    clinics?: ClinicListRelationFilter
    appointments?: AppointmentListRelationFilter
    verificationLogs?: VerificationLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrderInput | SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    fcmToken?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clinics?: ClinicOrderByRelationAggregateInput
    appointments?: AppointmentOrderByRelationAggregateInput
    verificationLogs?: VerificationLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    phone?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    fcmToken?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    clinics?: ClinicListRelationFilter
    appointments?: AppointmentListRelationFilter
    verificationLogs?: VerificationLogListRelationFilter
  }, "id" | "phone" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrderInput | SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    fcmToken?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    phone?: StringWithAggregatesFilter<"User"> | string
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    fcmToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ClinicWhereInput = {
    AND?: ClinicWhereInput | ClinicWhereInput[]
    OR?: ClinicWhereInput[]
    NOT?: ClinicWhereInput | ClinicWhereInput[]
    id?: StringFilter<"Clinic"> | string
    name?: StringFilter<"Clinic"> | string
    address?: StringFilter<"Clinic"> | string
    city?: StringFilter<"Clinic"> | string
    state?: StringFilter<"Clinic"> | string
    pincode?: StringFilter<"Clinic"> | string
    latitude?: FloatFilter<"Clinic"> | number
    longitude?: FloatFilter<"Clinic"> | number
    doctorName?: StringFilter<"Clinic"> | string
    degree?: StringNullableFilter<"Clinic"> | string | null
    college?: StringNullableFilter<"Clinic"> | string | null
    experience?: IntNullableFilter<"Clinic"> | number | null
    specialization?: StringNullableFilter<"Clinic"> | string | null
    clinicImages?: StringNullableListFilter<"Clinic">
    doctorPhoto?: StringNullableFilter<"Clinic"> | string | null
    maxPatientsPerDay?: IntFilter<"Clinic"> | number
    paymentRequired?: BoolFilter<"Clinic"> | boolean
    consultationFee?: IntNullableFilter<"Clinic"> | number | null
    status?: EnumClinicStatusFilter<"Clinic"> | $Enums.ClinicStatus
    adminId?: StringFilter<"Clinic"> | string
    createdAt?: DateTimeFilter<"Clinic"> | Date | string
    updatedAt?: DateTimeFilter<"Clinic"> | Date | string
    admin?: XOR<UserScalarRelationFilter, UserWhereInput>
    appointments?: AppointmentListRelationFilter
    queueState?: XOR<QueueStateNullableScalarRelationFilter, QueueStateWhereInput> | null
    verificationLogs?: VerificationLogListRelationFilter
  }

  export type ClinicOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    pincode?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    doctorName?: SortOrder
    degree?: SortOrderInput | SortOrder
    college?: SortOrderInput | SortOrder
    experience?: SortOrderInput | SortOrder
    specialization?: SortOrderInput | SortOrder
    clinicImages?: SortOrder
    doctorPhoto?: SortOrderInput | SortOrder
    maxPatientsPerDay?: SortOrder
    paymentRequired?: SortOrder
    consultationFee?: SortOrderInput | SortOrder
    status?: SortOrder
    adminId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    admin?: UserOrderByWithRelationInput
    appointments?: AppointmentOrderByRelationAggregateInput
    queueState?: QueueStateOrderByWithRelationInput
    verificationLogs?: VerificationLogOrderByRelationAggregateInput
  }

  export type ClinicWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ClinicWhereInput | ClinicWhereInput[]
    OR?: ClinicWhereInput[]
    NOT?: ClinicWhereInput | ClinicWhereInput[]
    name?: StringFilter<"Clinic"> | string
    address?: StringFilter<"Clinic"> | string
    city?: StringFilter<"Clinic"> | string
    state?: StringFilter<"Clinic"> | string
    pincode?: StringFilter<"Clinic"> | string
    latitude?: FloatFilter<"Clinic"> | number
    longitude?: FloatFilter<"Clinic"> | number
    doctorName?: StringFilter<"Clinic"> | string
    degree?: StringNullableFilter<"Clinic"> | string | null
    college?: StringNullableFilter<"Clinic"> | string | null
    experience?: IntNullableFilter<"Clinic"> | number | null
    specialization?: StringNullableFilter<"Clinic"> | string | null
    clinicImages?: StringNullableListFilter<"Clinic">
    doctorPhoto?: StringNullableFilter<"Clinic"> | string | null
    maxPatientsPerDay?: IntFilter<"Clinic"> | number
    paymentRequired?: BoolFilter<"Clinic"> | boolean
    consultationFee?: IntNullableFilter<"Clinic"> | number | null
    status?: EnumClinicStatusFilter<"Clinic"> | $Enums.ClinicStatus
    adminId?: StringFilter<"Clinic"> | string
    createdAt?: DateTimeFilter<"Clinic"> | Date | string
    updatedAt?: DateTimeFilter<"Clinic"> | Date | string
    admin?: XOR<UserScalarRelationFilter, UserWhereInput>
    appointments?: AppointmentListRelationFilter
    queueState?: XOR<QueueStateNullableScalarRelationFilter, QueueStateWhereInput> | null
    verificationLogs?: VerificationLogListRelationFilter
  }, "id">

  export type ClinicOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    pincode?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    doctorName?: SortOrder
    degree?: SortOrderInput | SortOrder
    college?: SortOrderInput | SortOrder
    experience?: SortOrderInput | SortOrder
    specialization?: SortOrderInput | SortOrder
    clinicImages?: SortOrder
    doctorPhoto?: SortOrderInput | SortOrder
    maxPatientsPerDay?: SortOrder
    paymentRequired?: SortOrder
    consultationFee?: SortOrderInput | SortOrder
    status?: SortOrder
    adminId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ClinicCountOrderByAggregateInput
    _avg?: ClinicAvgOrderByAggregateInput
    _max?: ClinicMaxOrderByAggregateInput
    _min?: ClinicMinOrderByAggregateInput
    _sum?: ClinicSumOrderByAggregateInput
  }

  export type ClinicScalarWhereWithAggregatesInput = {
    AND?: ClinicScalarWhereWithAggregatesInput | ClinicScalarWhereWithAggregatesInput[]
    OR?: ClinicScalarWhereWithAggregatesInput[]
    NOT?: ClinicScalarWhereWithAggregatesInput | ClinicScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Clinic"> | string
    name?: StringWithAggregatesFilter<"Clinic"> | string
    address?: StringWithAggregatesFilter<"Clinic"> | string
    city?: StringWithAggregatesFilter<"Clinic"> | string
    state?: StringWithAggregatesFilter<"Clinic"> | string
    pincode?: StringWithAggregatesFilter<"Clinic"> | string
    latitude?: FloatWithAggregatesFilter<"Clinic"> | number
    longitude?: FloatWithAggregatesFilter<"Clinic"> | number
    doctorName?: StringWithAggregatesFilter<"Clinic"> | string
    degree?: StringNullableWithAggregatesFilter<"Clinic"> | string | null
    college?: StringNullableWithAggregatesFilter<"Clinic"> | string | null
    experience?: IntNullableWithAggregatesFilter<"Clinic"> | number | null
    specialization?: StringNullableWithAggregatesFilter<"Clinic"> | string | null
    clinicImages?: StringNullableListFilter<"Clinic">
    doctorPhoto?: StringNullableWithAggregatesFilter<"Clinic"> | string | null
    maxPatientsPerDay?: IntWithAggregatesFilter<"Clinic"> | number
    paymentRequired?: BoolWithAggregatesFilter<"Clinic"> | boolean
    consultationFee?: IntNullableWithAggregatesFilter<"Clinic"> | number | null
    status?: EnumClinicStatusWithAggregatesFilter<"Clinic"> | $Enums.ClinicStatus
    adminId?: StringWithAggregatesFilter<"Clinic"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Clinic"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Clinic"> | Date | string
  }

  export type AppointmentWhereInput = {
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    id?: StringFilter<"Appointment"> | string
    userId?: StringFilter<"Appointment"> | string
    clinicId?: StringFilter<"Appointment"> | string
    patientName?: StringFilter<"Appointment"> | string
    patientAge?: IntFilter<"Appointment"> | number
    patientPhone?: StringFilter<"Appointment"> | string
    patientEmail?: StringNullableFilter<"Appointment"> | string | null
    patientAddress?: StringNullableFilter<"Appointment"> | string | null
    appointmentDate?: DateTimeFilter<"Appointment"> | Date | string
    tokenNumber?: IntFilter<"Appointment"> | number
    status?: EnumAppointmentStatusFilter<"Appointment"> | $Enums.AppointmentStatus
    paymentStatus?: EnumPaymentStatusFilter<"Appointment"> | $Enums.PaymentStatus
    razorpayOrderId?: StringNullableFilter<"Appointment"> | string | null
    razorpayPaymentId?: StringNullableFilter<"Appointment"> | string | null
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    clinic?: XOR<ClinicScalarRelationFilter, ClinicWhereInput>
  }

  export type AppointmentOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    clinicId?: SortOrder
    patientName?: SortOrder
    patientAge?: SortOrder
    patientPhone?: SortOrder
    patientEmail?: SortOrderInput | SortOrder
    patientAddress?: SortOrderInput | SortOrder
    appointmentDate?: SortOrder
    tokenNumber?: SortOrder
    status?: SortOrder
    paymentStatus?: SortOrder
    razorpayOrderId?: SortOrderInput | SortOrder
    razorpayPaymentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    clinic?: ClinicOrderByWithRelationInput
  }

  export type AppointmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    userId?: StringFilter<"Appointment"> | string
    clinicId?: StringFilter<"Appointment"> | string
    patientName?: StringFilter<"Appointment"> | string
    patientAge?: IntFilter<"Appointment"> | number
    patientPhone?: StringFilter<"Appointment"> | string
    patientEmail?: StringNullableFilter<"Appointment"> | string | null
    patientAddress?: StringNullableFilter<"Appointment"> | string | null
    appointmentDate?: DateTimeFilter<"Appointment"> | Date | string
    tokenNumber?: IntFilter<"Appointment"> | number
    status?: EnumAppointmentStatusFilter<"Appointment"> | $Enums.AppointmentStatus
    paymentStatus?: EnumPaymentStatusFilter<"Appointment"> | $Enums.PaymentStatus
    razorpayOrderId?: StringNullableFilter<"Appointment"> | string | null
    razorpayPaymentId?: StringNullableFilter<"Appointment"> | string | null
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    clinic?: XOR<ClinicScalarRelationFilter, ClinicWhereInput>
  }, "id">

  export type AppointmentOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    clinicId?: SortOrder
    patientName?: SortOrder
    patientAge?: SortOrder
    patientPhone?: SortOrder
    patientEmail?: SortOrderInput | SortOrder
    patientAddress?: SortOrderInput | SortOrder
    appointmentDate?: SortOrder
    tokenNumber?: SortOrder
    status?: SortOrder
    paymentStatus?: SortOrder
    razorpayOrderId?: SortOrderInput | SortOrder
    razorpayPaymentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AppointmentCountOrderByAggregateInput
    _avg?: AppointmentAvgOrderByAggregateInput
    _max?: AppointmentMaxOrderByAggregateInput
    _min?: AppointmentMinOrderByAggregateInput
    _sum?: AppointmentSumOrderByAggregateInput
  }

  export type AppointmentScalarWhereWithAggregatesInput = {
    AND?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    OR?: AppointmentScalarWhereWithAggregatesInput[]
    NOT?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Appointment"> | string
    userId?: StringWithAggregatesFilter<"Appointment"> | string
    clinicId?: StringWithAggregatesFilter<"Appointment"> | string
    patientName?: StringWithAggregatesFilter<"Appointment"> | string
    patientAge?: IntWithAggregatesFilter<"Appointment"> | number
    patientPhone?: StringWithAggregatesFilter<"Appointment"> | string
    patientEmail?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    patientAddress?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    appointmentDate?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    tokenNumber?: IntWithAggregatesFilter<"Appointment"> | number
    status?: EnumAppointmentStatusWithAggregatesFilter<"Appointment"> | $Enums.AppointmentStatus
    paymentStatus?: EnumPaymentStatusWithAggregatesFilter<"Appointment"> | $Enums.PaymentStatus
    razorpayOrderId?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    razorpayPaymentId?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
  }

  export type QueueStateWhereInput = {
    AND?: QueueStateWhereInput | QueueStateWhereInput[]
    OR?: QueueStateWhereInput[]
    NOT?: QueueStateWhereInput | QueueStateWhereInput[]
    id?: StringFilter<"QueueState"> | string
    clinicId?: StringFilter<"QueueState"> | string
    currentToken?: IntFilter<"QueueState"> | number
    totalBookedToday?: IntFilter<"QueueState"> | number
    date?: DateTimeFilter<"QueueState"> | Date | string
    updatedAt?: DateTimeFilter<"QueueState"> | Date | string
    clinic?: XOR<ClinicScalarRelationFilter, ClinicWhereInput>
  }

  export type QueueStateOrderByWithRelationInput = {
    id?: SortOrder
    clinicId?: SortOrder
    currentToken?: SortOrder
    totalBookedToday?: SortOrder
    date?: SortOrder
    updatedAt?: SortOrder
    clinic?: ClinicOrderByWithRelationInput
  }

  export type QueueStateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    clinicId?: string
    AND?: QueueStateWhereInput | QueueStateWhereInput[]
    OR?: QueueStateWhereInput[]
    NOT?: QueueStateWhereInput | QueueStateWhereInput[]
    currentToken?: IntFilter<"QueueState"> | number
    totalBookedToday?: IntFilter<"QueueState"> | number
    date?: DateTimeFilter<"QueueState"> | Date | string
    updatedAt?: DateTimeFilter<"QueueState"> | Date | string
    clinic?: XOR<ClinicScalarRelationFilter, ClinicWhereInput>
  }, "id" | "clinicId">

  export type QueueStateOrderByWithAggregationInput = {
    id?: SortOrder
    clinicId?: SortOrder
    currentToken?: SortOrder
    totalBookedToday?: SortOrder
    date?: SortOrder
    updatedAt?: SortOrder
    _count?: QueueStateCountOrderByAggregateInput
    _avg?: QueueStateAvgOrderByAggregateInput
    _max?: QueueStateMaxOrderByAggregateInput
    _min?: QueueStateMinOrderByAggregateInput
    _sum?: QueueStateSumOrderByAggregateInput
  }

  export type QueueStateScalarWhereWithAggregatesInput = {
    AND?: QueueStateScalarWhereWithAggregatesInput | QueueStateScalarWhereWithAggregatesInput[]
    OR?: QueueStateScalarWhereWithAggregatesInput[]
    NOT?: QueueStateScalarWhereWithAggregatesInput | QueueStateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"QueueState"> | string
    clinicId?: StringWithAggregatesFilter<"QueueState"> | string
    currentToken?: IntWithAggregatesFilter<"QueueState"> | number
    totalBookedToday?: IntWithAggregatesFilter<"QueueState"> | number
    date?: DateTimeWithAggregatesFilter<"QueueState"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"QueueState"> | Date | string
  }

  export type VerificationLogWhereInput = {
    AND?: VerificationLogWhereInput | VerificationLogWhereInput[]
    OR?: VerificationLogWhereInput[]
    NOT?: VerificationLogWhereInput | VerificationLogWhereInput[]
    id?: StringFilter<"VerificationLog"> | string
    clinicId?: StringFilter<"VerificationLog"> | string
    verifierId?: StringFilter<"VerificationLog"> | string
    status?: EnumVerificationOutcomeFilter<"VerificationLog"> | $Enums.VerificationOutcome
    notes?: StringNullableFilter<"VerificationLog"> | string | null
    proofImageUrl?: StringNullableFilter<"VerificationLog"> | string | null
    createdAt?: DateTimeFilter<"VerificationLog"> | Date | string
    clinic?: XOR<ClinicScalarRelationFilter, ClinicWhereInput>
    verifier?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type VerificationLogOrderByWithRelationInput = {
    id?: SortOrder
    clinicId?: SortOrder
    verifierId?: SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    proofImageUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    clinic?: ClinicOrderByWithRelationInput
    verifier?: UserOrderByWithRelationInput
  }

  export type VerificationLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VerificationLogWhereInput | VerificationLogWhereInput[]
    OR?: VerificationLogWhereInput[]
    NOT?: VerificationLogWhereInput | VerificationLogWhereInput[]
    clinicId?: StringFilter<"VerificationLog"> | string
    verifierId?: StringFilter<"VerificationLog"> | string
    status?: EnumVerificationOutcomeFilter<"VerificationLog"> | $Enums.VerificationOutcome
    notes?: StringNullableFilter<"VerificationLog"> | string | null
    proofImageUrl?: StringNullableFilter<"VerificationLog"> | string | null
    createdAt?: DateTimeFilter<"VerificationLog"> | Date | string
    clinic?: XOR<ClinicScalarRelationFilter, ClinicWhereInput>
    verifier?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type VerificationLogOrderByWithAggregationInput = {
    id?: SortOrder
    clinicId?: SortOrder
    verifierId?: SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    proofImageUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: VerificationLogCountOrderByAggregateInput
    _max?: VerificationLogMaxOrderByAggregateInput
    _min?: VerificationLogMinOrderByAggregateInput
  }

  export type VerificationLogScalarWhereWithAggregatesInput = {
    AND?: VerificationLogScalarWhereWithAggregatesInput | VerificationLogScalarWhereWithAggregatesInput[]
    OR?: VerificationLogScalarWhereWithAggregatesInput[]
    NOT?: VerificationLogScalarWhereWithAggregatesInput | VerificationLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VerificationLog"> | string
    clinicId?: StringWithAggregatesFilter<"VerificationLog"> | string
    verifierId?: StringWithAggregatesFilter<"VerificationLog"> | string
    status?: EnumVerificationOutcomeWithAggregatesFilter<"VerificationLog"> | $Enums.VerificationOutcome
    notes?: StringNullableWithAggregatesFilter<"VerificationLog"> | string | null
    proofImageUrl?: StringNullableWithAggregatesFilter<"VerificationLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"VerificationLog"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    passwordHash: string
    role?: $Enums.Role
    fcmToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clinics?: ClinicCreateNestedManyWithoutAdminInput
    appointments?: AppointmentCreateNestedManyWithoutUserInput
    verificationLogs?: VerificationLogCreateNestedManyWithoutVerifierInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    passwordHash: string
    role?: $Enums.Role
    fcmToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clinics?: ClinicUncheckedCreateNestedManyWithoutAdminInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutUserInput
    verificationLogs?: VerificationLogUncheckedCreateNestedManyWithoutVerifierInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    fcmToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinics?: ClinicUpdateManyWithoutAdminNestedInput
    appointments?: AppointmentUpdateManyWithoutUserNestedInput
    verificationLogs?: VerificationLogUpdateManyWithoutVerifierNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    fcmToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinics?: ClinicUncheckedUpdateManyWithoutAdminNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutUserNestedInput
    verificationLogs?: VerificationLogUncheckedUpdateManyWithoutVerifierNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    passwordHash: string
    role?: $Enums.Role
    fcmToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    fcmToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    fcmToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicCreateInput = {
    id?: string
    name: string
    address: string
    city: string
    state: string
    pincode: string
    latitude: number
    longitude: number
    doctorName: string
    degree?: string | null
    college?: string | null
    experience?: number | null
    specialization?: string | null
    clinicImages?: ClinicCreateclinicImagesInput | string[]
    doctorPhoto?: string | null
    maxPatientsPerDay?: number
    paymentRequired?: boolean
    consultationFee?: number | null
    status?: $Enums.ClinicStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    admin: UserCreateNestedOneWithoutClinicsInput
    appointments?: AppointmentCreateNestedManyWithoutClinicInput
    queueState?: QueueStateCreateNestedOneWithoutClinicInput
    verificationLogs?: VerificationLogCreateNestedManyWithoutClinicInput
  }

  export type ClinicUncheckedCreateInput = {
    id?: string
    name: string
    address: string
    city: string
    state: string
    pincode: string
    latitude: number
    longitude: number
    doctorName: string
    degree?: string | null
    college?: string | null
    experience?: number | null
    specialization?: string | null
    clinicImages?: ClinicCreateclinicImagesInput | string[]
    doctorPhoto?: string | null
    maxPatientsPerDay?: number
    paymentRequired?: boolean
    consultationFee?: number | null
    status?: $Enums.ClinicStatus
    adminId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutClinicInput
    queueState?: QueueStateUncheckedCreateNestedOneWithoutClinicInput
    verificationLogs?: VerificationLogUncheckedCreateNestedManyWithoutClinicInput
  }

  export type ClinicUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    doctorName?: StringFieldUpdateOperationsInput | string
    degree?: NullableStringFieldUpdateOperationsInput | string | null
    college?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableIntFieldUpdateOperationsInput | number | null
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    clinicImages?: ClinicUpdateclinicImagesInput | string[]
    doctorPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    maxPatientsPerDay?: IntFieldUpdateOperationsInput | number
    paymentRequired?: BoolFieldUpdateOperationsInput | boolean
    consultationFee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumClinicStatusFieldUpdateOperationsInput | $Enums.ClinicStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: UserUpdateOneRequiredWithoutClinicsNestedInput
    appointments?: AppointmentUpdateManyWithoutClinicNestedInput
    queueState?: QueueStateUpdateOneWithoutClinicNestedInput
    verificationLogs?: VerificationLogUpdateManyWithoutClinicNestedInput
  }

  export type ClinicUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    doctorName?: StringFieldUpdateOperationsInput | string
    degree?: NullableStringFieldUpdateOperationsInput | string | null
    college?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableIntFieldUpdateOperationsInput | number | null
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    clinicImages?: ClinicUpdateclinicImagesInput | string[]
    doctorPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    maxPatientsPerDay?: IntFieldUpdateOperationsInput | number
    paymentRequired?: BoolFieldUpdateOperationsInput | boolean
    consultationFee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumClinicStatusFieldUpdateOperationsInput | $Enums.ClinicStatus
    adminId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutClinicNestedInput
    queueState?: QueueStateUncheckedUpdateOneWithoutClinicNestedInput
    verificationLogs?: VerificationLogUncheckedUpdateManyWithoutClinicNestedInput
  }

  export type ClinicCreateManyInput = {
    id?: string
    name: string
    address: string
    city: string
    state: string
    pincode: string
    latitude: number
    longitude: number
    doctorName: string
    degree?: string | null
    college?: string | null
    experience?: number | null
    specialization?: string | null
    clinicImages?: ClinicCreateclinicImagesInput | string[]
    doctorPhoto?: string | null
    maxPatientsPerDay?: number
    paymentRequired?: boolean
    consultationFee?: number | null
    status?: $Enums.ClinicStatus
    adminId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClinicUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    doctorName?: StringFieldUpdateOperationsInput | string
    degree?: NullableStringFieldUpdateOperationsInput | string | null
    college?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableIntFieldUpdateOperationsInput | number | null
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    clinicImages?: ClinicUpdateclinicImagesInput | string[]
    doctorPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    maxPatientsPerDay?: IntFieldUpdateOperationsInput | number
    paymentRequired?: BoolFieldUpdateOperationsInput | boolean
    consultationFee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumClinicStatusFieldUpdateOperationsInput | $Enums.ClinicStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    doctorName?: StringFieldUpdateOperationsInput | string
    degree?: NullableStringFieldUpdateOperationsInput | string | null
    college?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableIntFieldUpdateOperationsInput | number | null
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    clinicImages?: ClinicUpdateclinicImagesInput | string[]
    doctorPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    maxPatientsPerDay?: IntFieldUpdateOperationsInput | number
    paymentRequired?: BoolFieldUpdateOperationsInput | boolean
    consultationFee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumClinicStatusFieldUpdateOperationsInput | $Enums.ClinicStatus
    adminId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateInput = {
    id?: string
    patientName: string
    patientAge: number
    patientPhone: string
    patientEmail?: string | null
    patientAddress?: string | null
    appointmentDate: Date | string
    tokenNumber: number
    status?: $Enums.AppointmentStatus
    paymentStatus?: $Enums.PaymentStatus
    razorpayOrderId?: string | null
    razorpayPaymentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAppointmentsInput
    clinic: ClinicCreateNestedOneWithoutAppointmentsInput
  }

  export type AppointmentUncheckedCreateInput = {
    id?: string
    userId: string
    clinicId: string
    patientName: string
    patientAge: number
    patientPhone: string
    patientEmail?: string | null
    patientAddress?: string | null
    appointmentDate: Date | string
    tokenNumber: number
    status?: $Enums.AppointmentStatus
    paymentStatus?: $Enums.PaymentStatus
    razorpayOrderId?: string | null
    razorpayPaymentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    patientAge?: IntFieldUpdateOperationsInput | number
    patientPhone?: StringFieldUpdateOperationsInput | string
    patientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    patientAddress?: NullableStringFieldUpdateOperationsInput | string | null
    appointmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    tokenNumber?: IntFieldUpdateOperationsInput | number
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    razorpayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    razorpayPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAppointmentsNestedInput
    clinic?: ClinicUpdateOneRequiredWithoutAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    patientAge?: IntFieldUpdateOperationsInput | number
    patientPhone?: StringFieldUpdateOperationsInput | string
    patientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    patientAddress?: NullableStringFieldUpdateOperationsInput | string | null
    appointmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    tokenNumber?: IntFieldUpdateOperationsInput | number
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    razorpayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    razorpayPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateManyInput = {
    id?: string
    userId: string
    clinicId: string
    patientName: string
    patientAge: number
    patientPhone: string
    patientEmail?: string | null
    patientAddress?: string | null
    appointmentDate: Date | string
    tokenNumber: number
    status?: $Enums.AppointmentStatus
    paymentStatus?: $Enums.PaymentStatus
    razorpayOrderId?: string | null
    razorpayPaymentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    patientAge?: IntFieldUpdateOperationsInput | number
    patientPhone?: StringFieldUpdateOperationsInput | string
    patientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    patientAddress?: NullableStringFieldUpdateOperationsInput | string | null
    appointmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    tokenNumber?: IntFieldUpdateOperationsInput | number
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    razorpayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    razorpayPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    patientAge?: IntFieldUpdateOperationsInput | number
    patientPhone?: StringFieldUpdateOperationsInput | string
    patientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    patientAddress?: NullableStringFieldUpdateOperationsInput | string | null
    appointmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    tokenNumber?: IntFieldUpdateOperationsInput | number
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    razorpayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    razorpayPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QueueStateCreateInput = {
    id?: string
    currentToken?: number
    totalBookedToday?: number
    date: Date | string
    updatedAt?: Date | string
    clinic: ClinicCreateNestedOneWithoutQueueStateInput
  }

  export type QueueStateUncheckedCreateInput = {
    id?: string
    clinicId: string
    currentToken?: number
    totalBookedToday?: number
    date: Date | string
    updatedAt?: Date | string
  }

  export type QueueStateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    currentToken?: IntFieldUpdateOperationsInput | number
    totalBookedToday?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinic?: ClinicUpdateOneRequiredWithoutQueueStateNestedInput
  }

  export type QueueStateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    currentToken?: IntFieldUpdateOperationsInput | number
    totalBookedToday?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QueueStateCreateManyInput = {
    id?: string
    clinicId: string
    currentToken?: number
    totalBookedToday?: number
    date: Date | string
    updatedAt?: Date | string
  }

  export type QueueStateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    currentToken?: IntFieldUpdateOperationsInput | number
    totalBookedToday?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QueueStateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    currentToken?: IntFieldUpdateOperationsInput | number
    totalBookedToday?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationLogCreateInput = {
    id?: string
    status: $Enums.VerificationOutcome
    notes?: string | null
    proofImageUrl?: string | null
    createdAt?: Date | string
    clinic: ClinicCreateNestedOneWithoutVerificationLogsInput
    verifier: UserCreateNestedOneWithoutVerificationLogsInput
  }

  export type VerificationLogUncheckedCreateInput = {
    id?: string
    clinicId: string
    verifierId: string
    status: $Enums.VerificationOutcome
    notes?: string | null
    proofImageUrl?: string | null
    createdAt?: Date | string
  }

  export type VerificationLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumVerificationOutcomeFieldUpdateOperationsInput | $Enums.VerificationOutcome
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    proofImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinic?: ClinicUpdateOneRequiredWithoutVerificationLogsNestedInput
    verifier?: UserUpdateOneRequiredWithoutVerificationLogsNestedInput
  }

  export type VerificationLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    verifierId?: StringFieldUpdateOperationsInput | string
    status?: EnumVerificationOutcomeFieldUpdateOperationsInput | $Enums.VerificationOutcome
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    proofImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationLogCreateManyInput = {
    id?: string
    clinicId: string
    verifierId: string
    status: $Enums.VerificationOutcome
    notes?: string | null
    proofImageUrl?: string | null
    createdAt?: Date | string
  }

  export type VerificationLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumVerificationOutcomeFieldUpdateOperationsInput | $Enums.VerificationOutcome
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    proofImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    verifierId?: StringFieldUpdateOperationsInput | string
    status?: EnumVerificationOutcomeFieldUpdateOperationsInput | $Enums.VerificationOutcome
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    proofImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ClinicListRelationFilter = {
    every?: ClinicWhereInput
    some?: ClinicWhereInput
    none?: ClinicWhereInput
  }

  export type AppointmentListRelationFilter = {
    every?: AppointmentWhereInput
    some?: AppointmentWhereInput
    none?: AppointmentWhereInput
  }

  export type VerificationLogListRelationFilter = {
    every?: VerificationLogWhereInput
    some?: VerificationLogWhereInput
    none?: VerificationLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ClinicOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AppointmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VerificationLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    fcmToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    fcmToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    fcmToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EnumClinicStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ClinicStatus | EnumClinicStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ClinicStatus[] | ListEnumClinicStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClinicStatus[] | ListEnumClinicStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumClinicStatusFilter<$PrismaModel> | $Enums.ClinicStatus
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type QueueStateNullableScalarRelationFilter = {
    is?: QueueStateWhereInput | null
    isNot?: QueueStateWhereInput | null
  }

  export type ClinicCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    pincode?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    doctorName?: SortOrder
    degree?: SortOrder
    college?: SortOrder
    experience?: SortOrder
    specialization?: SortOrder
    clinicImages?: SortOrder
    doctorPhoto?: SortOrder
    maxPatientsPerDay?: SortOrder
    paymentRequired?: SortOrder
    consultationFee?: SortOrder
    status?: SortOrder
    adminId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClinicAvgOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
    experience?: SortOrder
    maxPatientsPerDay?: SortOrder
    consultationFee?: SortOrder
  }

  export type ClinicMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    pincode?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    doctorName?: SortOrder
    degree?: SortOrder
    college?: SortOrder
    experience?: SortOrder
    specialization?: SortOrder
    doctorPhoto?: SortOrder
    maxPatientsPerDay?: SortOrder
    paymentRequired?: SortOrder
    consultationFee?: SortOrder
    status?: SortOrder
    adminId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClinicMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    pincode?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    doctorName?: SortOrder
    degree?: SortOrder
    college?: SortOrder
    experience?: SortOrder
    specialization?: SortOrder
    doctorPhoto?: SortOrder
    maxPatientsPerDay?: SortOrder
    paymentRequired?: SortOrder
    consultationFee?: SortOrder
    status?: SortOrder
    adminId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClinicSumOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
    experience?: SortOrder
    maxPatientsPerDay?: SortOrder
    consultationFee?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumClinicStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ClinicStatus | EnumClinicStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ClinicStatus[] | ListEnumClinicStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClinicStatus[] | ListEnumClinicStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumClinicStatusWithAggregatesFilter<$PrismaModel> | $Enums.ClinicStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumClinicStatusFilter<$PrismaModel>
    _max?: NestedEnumClinicStatusFilter<$PrismaModel>
  }

  export type EnumAppointmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentStatusFilter<$PrismaModel> | $Enums.AppointmentStatus
  }

  export type EnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type ClinicScalarRelationFilter = {
    is?: ClinicWhereInput
    isNot?: ClinicWhereInput
  }

  export type AppointmentCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    clinicId?: SortOrder
    patientName?: SortOrder
    patientAge?: SortOrder
    patientPhone?: SortOrder
    patientEmail?: SortOrder
    patientAddress?: SortOrder
    appointmentDate?: SortOrder
    tokenNumber?: SortOrder
    status?: SortOrder
    paymentStatus?: SortOrder
    razorpayOrderId?: SortOrder
    razorpayPaymentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppointmentAvgOrderByAggregateInput = {
    patientAge?: SortOrder
    tokenNumber?: SortOrder
  }

  export type AppointmentMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    clinicId?: SortOrder
    patientName?: SortOrder
    patientAge?: SortOrder
    patientPhone?: SortOrder
    patientEmail?: SortOrder
    patientAddress?: SortOrder
    appointmentDate?: SortOrder
    tokenNumber?: SortOrder
    status?: SortOrder
    paymentStatus?: SortOrder
    razorpayOrderId?: SortOrder
    razorpayPaymentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppointmentMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    clinicId?: SortOrder
    patientName?: SortOrder
    patientAge?: SortOrder
    patientPhone?: SortOrder
    patientEmail?: SortOrder
    patientAddress?: SortOrder
    appointmentDate?: SortOrder
    tokenNumber?: SortOrder
    status?: SortOrder
    paymentStatus?: SortOrder
    razorpayOrderId?: SortOrder
    razorpayPaymentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppointmentSumOrderByAggregateInput = {
    patientAge?: SortOrder
    tokenNumber?: SortOrder
  }

  export type EnumAppointmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AppointmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAppointmentStatusFilter<$PrismaModel>
    _max?: NestedEnumAppointmentStatusFilter<$PrismaModel>
  }

  export type EnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type QueueStateCountOrderByAggregateInput = {
    id?: SortOrder
    clinicId?: SortOrder
    currentToken?: SortOrder
    totalBookedToday?: SortOrder
    date?: SortOrder
    updatedAt?: SortOrder
  }

  export type QueueStateAvgOrderByAggregateInput = {
    currentToken?: SortOrder
    totalBookedToday?: SortOrder
  }

  export type QueueStateMaxOrderByAggregateInput = {
    id?: SortOrder
    clinicId?: SortOrder
    currentToken?: SortOrder
    totalBookedToday?: SortOrder
    date?: SortOrder
    updatedAt?: SortOrder
  }

  export type QueueStateMinOrderByAggregateInput = {
    id?: SortOrder
    clinicId?: SortOrder
    currentToken?: SortOrder
    totalBookedToday?: SortOrder
    date?: SortOrder
    updatedAt?: SortOrder
  }

  export type QueueStateSumOrderByAggregateInput = {
    currentToken?: SortOrder
    totalBookedToday?: SortOrder
  }

  export type EnumVerificationOutcomeFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationOutcome | EnumVerificationOutcomeFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationOutcome[] | ListEnumVerificationOutcomeFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationOutcome[] | ListEnumVerificationOutcomeFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationOutcomeFilter<$PrismaModel> | $Enums.VerificationOutcome
  }

  export type VerificationLogCountOrderByAggregateInput = {
    id?: SortOrder
    clinicId?: SortOrder
    verifierId?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    proofImageUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type VerificationLogMaxOrderByAggregateInput = {
    id?: SortOrder
    clinicId?: SortOrder
    verifierId?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    proofImageUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type VerificationLogMinOrderByAggregateInput = {
    id?: SortOrder
    clinicId?: SortOrder
    verifierId?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    proofImageUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumVerificationOutcomeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationOutcome | EnumVerificationOutcomeFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationOutcome[] | ListEnumVerificationOutcomeFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationOutcome[] | ListEnumVerificationOutcomeFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationOutcomeWithAggregatesFilter<$PrismaModel> | $Enums.VerificationOutcome
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVerificationOutcomeFilter<$PrismaModel>
    _max?: NestedEnumVerificationOutcomeFilter<$PrismaModel>
  }

  export type ClinicCreateNestedManyWithoutAdminInput = {
    create?: XOR<ClinicCreateWithoutAdminInput, ClinicUncheckedCreateWithoutAdminInput> | ClinicCreateWithoutAdminInput[] | ClinicUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: ClinicCreateOrConnectWithoutAdminInput | ClinicCreateOrConnectWithoutAdminInput[]
    createMany?: ClinicCreateManyAdminInputEnvelope
    connect?: ClinicWhereUniqueInput | ClinicWhereUniqueInput[]
  }

  export type AppointmentCreateNestedManyWithoutUserInput = {
    create?: XOR<AppointmentCreateWithoutUserInput, AppointmentUncheckedCreateWithoutUserInput> | AppointmentCreateWithoutUserInput[] | AppointmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutUserInput | AppointmentCreateOrConnectWithoutUserInput[]
    createMany?: AppointmentCreateManyUserInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type VerificationLogCreateNestedManyWithoutVerifierInput = {
    create?: XOR<VerificationLogCreateWithoutVerifierInput, VerificationLogUncheckedCreateWithoutVerifierInput> | VerificationLogCreateWithoutVerifierInput[] | VerificationLogUncheckedCreateWithoutVerifierInput[]
    connectOrCreate?: VerificationLogCreateOrConnectWithoutVerifierInput | VerificationLogCreateOrConnectWithoutVerifierInput[]
    createMany?: VerificationLogCreateManyVerifierInputEnvelope
    connect?: VerificationLogWhereUniqueInput | VerificationLogWhereUniqueInput[]
  }

  export type ClinicUncheckedCreateNestedManyWithoutAdminInput = {
    create?: XOR<ClinicCreateWithoutAdminInput, ClinicUncheckedCreateWithoutAdminInput> | ClinicCreateWithoutAdminInput[] | ClinicUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: ClinicCreateOrConnectWithoutAdminInput | ClinicCreateOrConnectWithoutAdminInput[]
    createMany?: ClinicCreateManyAdminInputEnvelope
    connect?: ClinicWhereUniqueInput | ClinicWhereUniqueInput[]
  }

  export type AppointmentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AppointmentCreateWithoutUserInput, AppointmentUncheckedCreateWithoutUserInput> | AppointmentCreateWithoutUserInput[] | AppointmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutUserInput | AppointmentCreateOrConnectWithoutUserInput[]
    createMany?: AppointmentCreateManyUserInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type VerificationLogUncheckedCreateNestedManyWithoutVerifierInput = {
    create?: XOR<VerificationLogCreateWithoutVerifierInput, VerificationLogUncheckedCreateWithoutVerifierInput> | VerificationLogCreateWithoutVerifierInput[] | VerificationLogUncheckedCreateWithoutVerifierInput[]
    connectOrCreate?: VerificationLogCreateOrConnectWithoutVerifierInput | VerificationLogCreateOrConnectWithoutVerifierInput[]
    createMany?: VerificationLogCreateManyVerifierInputEnvelope
    connect?: VerificationLogWhereUniqueInput | VerificationLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ClinicUpdateManyWithoutAdminNestedInput = {
    create?: XOR<ClinicCreateWithoutAdminInput, ClinicUncheckedCreateWithoutAdminInput> | ClinicCreateWithoutAdminInput[] | ClinicUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: ClinicCreateOrConnectWithoutAdminInput | ClinicCreateOrConnectWithoutAdminInput[]
    upsert?: ClinicUpsertWithWhereUniqueWithoutAdminInput | ClinicUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: ClinicCreateManyAdminInputEnvelope
    set?: ClinicWhereUniqueInput | ClinicWhereUniqueInput[]
    disconnect?: ClinicWhereUniqueInput | ClinicWhereUniqueInput[]
    delete?: ClinicWhereUniqueInput | ClinicWhereUniqueInput[]
    connect?: ClinicWhereUniqueInput | ClinicWhereUniqueInput[]
    update?: ClinicUpdateWithWhereUniqueWithoutAdminInput | ClinicUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: ClinicUpdateManyWithWhereWithoutAdminInput | ClinicUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: ClinicScalarWhereInput | ClinicScalarWhereInput[]
  }

  export type AppointmentUpdateManyWithoutUserNestedInput = {
    create?: XOR<AppointmentCreateWithoutUserInput, AppointmentUncheckedCreateWithoutUserInput> | AppointmentCreateWithoutUserInput[] | AppointmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutUserInput | AppointmentCreateOrConnectWithoutUserInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutUserInput | AppointmentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AppointmentCreateManyUserInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutUserInput | AppointmentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutUserInput | AppointmentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type VerificationLogUpdateManyWithoutVerifierNestedInput = {
    create?: XOR<VerificationLogCreateWithoutVerifierInput, VerificationLogUncheckedCreateWithoutVerifierInput> | VerificationLogCreateWithoutVerifierInput[] | VerificationLogUncheckedCreateWithoutVerifierInput[]
    connectOrCreate?: VerificationLogCreateOrConnectWithoutVerifierInput | VerificationLogCreateOrConnectWithoutVerifierInput[]
    upsert?: VerificationLogUpsertWithWhereUniqueWithoutVerifierInput | VerificationLogUpsertWithWhereUniqueWithoutVerifierInput[]
    createMany?: VerificationLogCreateManyVerifierInputEnvelope
    set?: VerificationLogWhereUniqueInput | VerificationLogWhereUniqueInput[]
    disconnect?: VerificationLogWhereUniqueInput | VerificationLogWhereUniqueInput[]
    delete?: VerificationLogWhereUniqueInput | VerificationLogWhereUniqueInput[]
    connect?: VerificationLogWhereUniqueInput | VerificationLogWhereUniqueInput[]
    update?: VerificationLogUpdateWithWhereUniqueWithoutVerifierInput | VerificationLogUpdateWithWhereUniqueWithoutVerifierInput[]
    updateMany?: VerificationLogUpdateManyWithWhereWithoutVerifierInput | VerificationLogUpdateManyWithWhereWithoutVerifierInput[]
    deleteMany?: VerificationLogScalarWhereInput | VerificationLogScalarWhereInput[]
  }

  export type ClinicUncheckedUpdateManyWithoutAdminNestedInput = {
    create?: XOR<ClinicCreateWithoutAdminInput, ClinicUncheckedCreateWithoutAdminInput> | ClinicCreateWithoutAdminInput[] | ClinicUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: ClinicCreateOrConnectWithoutAdminInput | ClinicCreateOrConnectWithoutAdminInput[]
    upsert?: ClinicUpsertWithWhereUniqueWithoutAdminInput | ClinicUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: ClinicCreateManyAdminInputEnvelope
    set?: ClinicWhereUniqueInput | ClinicWhereUniqueInput[]
    disconnect?: ClinicWhereUniqueInput | ClinicWhereUniqueInput[]
    delete?: ClinicWhereUniqueInput | ClinicWhereUniqueInput[]
    connect?: ClinicWhereUniqueInput | ClinicWhereUniqueInput[]
    update?: ClinicUpdateWithWhereUniqueWithoutAdminInput | ClinicUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: ClinicUpdateManyWithWhereWithoutAdminInput | ClinicUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: ClinicScalarWhereInput | ClinicScalarWhereInput[]
  }

  export type AppointmentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AppointmentCreateWithoutUserInput, AppointmentUncheckedCreateWithoutUserInput> | AppointmentCreateWithoutUserInput[] | AppointmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutUserInput | AppointmentCreateOrConnectWithoutUserInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutUserInput | AppointmentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AppointmentCreateManyUserInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutUserInput | AppointmentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutUserInput | AppointmentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type VerificationLogUncheckedUpdateManyWithoutVerifierNestedInput = {
    create?: XOR<VerificationLogCreateWithoutVerifierInput, VerificationLogUncheckedCreateWithoutVerifierInput> | VerificationLogCreateWithoutVerifierInput[] | VerificationLogUncheckedCreateWithoutVerifierInput[]
    connectOrCreate?: VerificationLogCreateOrConnectWithoutVerifierInput | VerificationLogCreateOrConnectWithoutVerifierInput[]
    upsert?: VerificationLogUpsertWithWhereUniqueWithoutVerifierInput | VerificationLogUpsertWithWhereUniqueWithoutVerifierInput[]
    createMany?: VerificationLogCreateManyVerifierInputEnvelope
    set?: VerificationLogWhereUniqueInput | VerificationLogWhereUniqueInput[]
    disconnect?: VerificationLogWhereUniqueInput | VerificationLogWhereUniqueInput[]
    delete?: VerificationLogWhereUniqueInput | VerificationLogWhereUniqueInput[]
    connect?: VerificationLogWhereUniqueInput | VerificationLogWhereUniqueInput[]
    update?: VerificationLogUpdateWithWhereUniqueWithoutVerifierInput | VerificationLogUpdateWithWhereUniqueWithoutVerifierInput[]
    updateMany?: VerificationLogUpdateManyWithWhereWithoutVerifierInput | VerificationLogUpdateManyWithWhereWithoutVerifierInput[]
    deleteMany?: VerificationLogScalarWhereInput | VerificationLogScalarWhereInput[]
  }

  export type ClinicCreateclinicImagesInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutClinicsInput = {
    create?: XOR<UserCreateWithoutClinicsInput, UserUncheckedCreateWithoutClinicsInput>
    connectOrCreate?: UserCreateOrConnectWithoutClinicsInput
    connect?: UserWhereUniqueInput
  }

  export type AppointmentCreateNestedManyWithoutClinicInput = {
    create?: XOR<AppointmentCreateWithoutClinicInput, AppointmentUncheckedCreateWithoutClinicInput> | AppointmentCreateWithoutClinicInput[] | AppointmentUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutClinicInput | AppointmentCreateOrConnectWithoutClinicInput[]
    createMany?: AppointmentCreateManyClinicInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type QueueStateCreateNestedOneWithoutClinicInput = {
    create?: XOR<QueueStateCreateWithoutClinicInput, QueueStateUncheckedCreateWithoutClinicInput>
    connectOrCreate?: QueueStateCreateOrConnectWithoutClinicInput
    connect?: QueueStateWhereUniqueInput
  }

  export type VerificationLogCreateNestedManyWithoutClinicInput = {
    create?: XOR<VerificationLogCreateWithoutClinicInput, VerificationLogUncheckedCreateWithoutClinicInput> | VerificationLogCreateWithoutClinicInput[] | VerificationLogUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: VerificationLogCreateOrConnectWithoutClinicInput | VerificationLogCreateOrConnectWithoutClinicInput[]
    createMany?: VerificationLogCreateManyClinicInputEnvelope
    connect?: VerificationLogWhereUniqueInput | VerificationLogWhereUniqueInput[]
  }

  export type AppointmentUncheckedCreateNestedManyWithoutClinicInput = {
    create?: XOR<AppointmentCreateWithoutClinicInput, AppointmentUncheckedCreateWithoutClinicInput> | AppointmentCreateWithoutClinicInput[] | AppointmentUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutClinicInput | AppointmentCreateOrConnectWithoutClinicInput[]
    createMany?: AppointmentCreateManyClinicInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type QueueStateUncheckedCreateNestedOneWithoutClinicInput = {
    create?: XOR<QueueStateCreateWithoutClinicInput, QueueStateUncheckedCreateWithoutClinicInput>
    connectOrCreate?: QueueStateCreateOrConnectWithoutClinicInput
    connect?: QueueStateWhereUniqueInput
  }

  export type VerificationLogUncheckedCreateNestedManyWithoutClinicInput = {
    create?: XOR<VerificationLogCreateWithoutClinicInput, VerificationLogUncheckedCreateWithoutClinicInput> | VerificationLogCreateWithoutClinicInput[] | VerificationLogUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: VerificationLogCreateOrConnectWithoutClinicInput | VerificationLogCreateOrConnectWithoutClinicInput[]
    createMany?: VerificationLogCreateManyClinicInputEnvelope
    connect?: VerificationLogWhereUniqueInput | VerificationLogWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ClinicUpdateclinicImagesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EnumClinicStatusFieldUpdateOperationsInput = {
    set?: $Enums.ClinicStatus
  }

  export type UserUpdateOneRequiredWithoutClinicsNestedInput = {
    create?: XOR<UserCreateWithoutClinicsInput, UserUncheckedCreateWithoutClinicsInput>
    connectOrCreate?: UserCreateOrConnectWithoutClinicsInput
    upsert?: UserUpsertWithoutClinicsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutClinicsInput, UserUpdateWithoutClinicsInput>, UserUncheckedUpdateWithoutClinicsInput>
  }

  export type AppointmentUpdateManyWithoutClinicNestedInput = {
    create?: XOR<AppointmentCreateWithoutClinicInput, AppointmentUncheckedCreateWithoutClinicInput> | AppointmentCreateWithoutClinicInput[] | AppointmentUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutClinicInput | AppointmentCreateOrConnectWithoutClinicInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutClinicInput | AppointmentUpsertWithWhereUniqueWithoutClinicInput[]
    createMany?: AppointmentCreateManyClinicInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutClinicInput | AppointmentUpdateWithWhereUniqueWithoutClinicInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutClinicInput | AppointmentUpdateManyWithWhereWithoutClinicInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type QueueStateUpdateOneWithoutClinicNestedInput = {
    create?: XOR<QueueStateCreateWithoutClinicInput, QueueStateUncheckedCreateWithoutClinicInput>
    connectOrCreate?: QueueStateCreateOrConnectWithoutClinicInput
    upsert?: QueueStateUpsertWithoutClinicInput
    disconnect?: QueueStateWhereInput | boolean
    delete?: QueueStateWhereInput | boolean
    connect?: QueueStateWhereUniqueInput
    update?: XOR<XOR<QueueStateUpdateToOneWithWhereWithoutClinicInput, QueueStateUpdateWithoutClinicInput>, QueueStateUncheckedUpdateWithoutClinicInput>
  }

  export type VerificationLogUpdateManyWithoutClinicNestedInput = {
    create?: XOR<VerificationLogCreateWithoutClinicInput, VerificationLogUncheckedCreateWithoutClinicInput> | VerificationLogCreateWithoutClinicInput[] | VerificationLogUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: VerificationLogCreateOrConnectWithoutClinicInput | VerificationLogCreateOrConnectWithoutClinicInput[]
    upsert?: VerificationLogUpsertWithWhereUniqueWithoutClinicInput | VerificationLogUpsertWithWhereUniqueWithoutClinicInput[]
    createMany?: VerificationLogCreateManyClinicInputEnvelope
    set?: VerificationLogWhereUniqueInput | VerificationLogWhereUniqueInput[]
    disconnect?: VerificationLogWhereUniqueInput | VerificationLogWhereUniqueInput[]
    delete?: VerificationLogWhereUniqueInput | VerificationLogWhereUniqueInput[]
    connect?: VerificationLogWhereUniqueInput | VerificationLogWhereUniqueInput[]
    update?: VerificationLogUpdateWithWhereUniqueWithoutClinicInput | VerificationLogUpdateWithWhereUniqueWithoutClinicInput[]
    updateMany?: VerificationLogUpdateManyWithWhereWithoutClinicInput | VerificationLogUpdateManyWithWhereWithoutClinicInput[]
    deleteMany?: VerificationLogScalarWhereInput | VerificationLogScalarWhereInput[]
  }

  export type AppointmentUncheckedUpdateManyWithoutClinicNestedInput = {
    create?: XOR<AppointmentCreateWithoutClinicInput, AppointmentUncheckedCreateWithoutClinicInput> | AppointmentCreateWithoutClinicInput[] | AppointmentUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutClinicInput | AppointmentCreateOrConnectWithoutClinicInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutClinicInput | AppointmentUpsertWithWhereUniqueWithoutClinicInput[]
    createMany?: AppointmentCreateManyClinicInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutClinicInput | AppointmentUpdateWithWhereUniqueWithoutClinicInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutClinicInput | AppointmentUpdateManyWithWhereWithoutClinicInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type QueueStateUncheckedUpdateOneWithoutClinicNestedInput = {
    create?: XOR<QueueStateCreateWithoutClinicInput, QueueStateUncheckedCreateWithoutClinicInput>
    connectOrCreate?: QueueStateCreateOrConnectWithoutClinicInput
    upsert?: QueueStateUpsertWithoutClinicInput
    disconnect?: QueueStateWhereInput | boolean
    delete?: QueueStateWhereInput | boolean
    connect?: QueueStateWhereUniqueInput
    update?: XOR<XOR<QueueStateUpdateToOneWithWhereWithoutClinicInput, QueueStateUpdateWithoutClinicInput>, QueueStateUncheckedUpdateWithoutClinicInput>
  }

  export type VerificationLogUncheckedUpdateManyWithoutClinicNestedInput = {
    create?: XOR<VerificationLogCreateWithoutClinicInput, VerificationLogUncheckedCreateWithoutClinicInput> | VerificationLogCreateWithoutClinicInput[] | VerificationLogUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: VerificationLogCreateOrConnectWithoutClinicInput | VerificationLogCreateOrConnectWithoutClinicInput[]
    upsert?: VerificationLogUpsertWithWhereUniqueWithoutClinicInput | VerificationLogUpsertWithWhereUniqueWithoutClinicInput[]
    createMany?: VerificationLogCreateManyClinicInputEnvelope
    set?: VerificationLogWhereUniqueInput | VerificationLogWhereUniqueInput[]
    disconnect?: VerificationLogWhereUniqueInput | VerificationLogWhereUniqueInput[]
    delete?: VerificationLogWhereUniqueInput | VerificationLogWhereUniqueInput[]
    connect?: VerificationLogWhereUniqueInput | VerificationLogWhereUniqueInput[]
    update?: VerificationLogUpdateWithWhereUniqueWithoutClinicInput | VerificationLogUpdateWithWhereUniqueWithoutClinicInput[]
    updateMany?: VerificationLogUpdateManyWithWhereWithoutClinicInput | VerificationLogUpdateManyWithWhereWithoutClinicInput[]
    deleteMany?: VerificationLogScalarWhereInput | VerificationLogScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAppointmentsInput = {
    create?: XOR<UserCreateWithoutAppointmentsInput, UserUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAppointmentsInput
    connect?: UserWhereUniqueInput
  }

  export type ClinicCreateNestedOneWithoutAppointmentsInput = {
    create?: XOR<ClinicCreateWithoutAppointmentsInput, ClinicUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: ClinicCreateOrConnectWithoutAppointmentsInput
    connect?: ClinicWhereUniqueInput
  }

  export type EnumAppointmentStatusFieldUpdateOperationsInput = {
    set?: $Enums.AppointmentStatus
  }

  export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus
  }

  export type UserUpdateOneRequiredWithoutAppointmentsNestedInput = {
    create?: XOR<UserCreateWithoutAppointmentsInput, UserUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAppointmentsInput
    upsert?: UserUpsertWithoutAppointmentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAppointmentsInput, UserUpdateWithoutAppointmentsInput>, UserUncheckedUpdateWithoutAppointmentsInput>
  }

  export type ClinicUpdateOneRequiredWithoutAppointmentsNestedInput = {
    create?: XOR<ClinicCreateWithoutAppointmentsInput, ClinicUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: ClinicCreateOrConnectWithoutAppointmentsInput
    upsert?: ClinicUpsertWithoutAppointmentsInput
    connect?: ClinicWhereUniqueInput
    update?: XOR<XOR<ClinicUpdateToOneWithWhereWithoutAppointmentsInput, ClinicUpdateWithoutAppointmentsInput>, ClinicUncheckedUpdateWithoutAppointmentsInput>
  }

  export type ClinicCreateNestedOneWithoutQueueStateInput = {
    create?: XOR<ClinicCreateWithoutQueueStateInput, ClinicUncheckedCreateWithoutQueueStateInput>
    connectOrCreate?: ClinicCreateOrConnectWithoutQueueStateInput
    connect?: ClinicWhereUniqueInput
  }

  export type ClinicUpdateOneRequiredWithoutQueueStateNestedInput = {
    create?: XOR<ClinicCreateWithoutQueueStateInput, ClinicUncheckedCreateWithoutQueueStateInput>
    connectOrCreate?: ClinicCreateOrConnectWithoutQueueStateInput
    upsert?: ClinicUpsertWithoutQueueStateInput
    connect?: ClinicWhereUniqueInput
    update?: XOR<XOR<ClinicUpdateToOneWithWhereWithoutQueueStateInput, ClinicUpdateWithoutQueueStateInput>, ClinicUncheckedUpdateWithoutQueueStateInput>
  }

  export type ClinicCreateNestedOneWithoutVerificationLogsInput = {
    create?: XOR<ClinicCreateWithoutVerificationLogsInput, ClinicUncheckedCreateWithoutVerificationLogsInput>
    connectOrCreate?: ClinicCreateOrConnectWithoutVerificationLogsInput
    connect?: ClinicWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutVerificationLogsInput = {
    create?: XOR<UserCreateWithoutVerificationLogsInput, UserUncheckedCreateWithoutVerificationLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutVerificationLogsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumVerificationOutcomeFieldUpdateOperationsInput = {
    set?: $Enums.VerificationOutcome
  }

  export type ClinicUpdateOneRequiredWithoutVerificationLogsNestedInput = {
    create?: XOR<ClinicCreateWithoutVerificationLogsInput, ClinicUncheckedCreateWithoutVerificationLogsInput>
    connectOrCreate?: ClinicCreateOrConnectWithoutVerificationLogsInput
    upsert?: ClinicUpsertWithoutVerificationLogsInput
    connect?: ClinicWhereUniqueInput
    update?: XOR<XOR<ClinicUpdateToOneWithWhereWithoutVerificationLogsInput, ClinicUpdateWithoutVerificationLogsInput>, ClinicUncheckedUpdateWithoutVerificationLogsInput>
  }

  export type UserUpdateOneRequiredWithoutVerificationLogsNestedInput = {
    create?: XOR<UserCreateWithoutVerificationLogsInput, UserUncheckedCreateWithoutVerificationLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutVerificationLogsInput
    upsert?: UserUpsertWithoutVerificationLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutVerificationLogsInput, UserUpdateWithoutVerificationLogsInput>, UserUncheckedUpdateWithoutVerificationLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumClinicStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ClinicStatus | EnumClinicStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ClinicStatus[] | ListEnumClinicStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClinicStatus[] | ListEnumClinicStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumClinicStatusFilter<$PrismaModel> | $Enums.ClinicStatus
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumClinicStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ClinicStatus | EnumClinicStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ClinicStatus[] | ListEnumClinicStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClinicStatus[] | ListEnumClinicStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumClinicStatusWithAggregatesFilter<$PrismaModel> | $Enums.ClinicStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumClinicStatusFilter<$PrismaModel>
    _max?: NestedEnumClinicStatusFilter<$PrismaModel>
  }

  export type NestedEnumAppointmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentStatusFilter<$PrismaModel> | $Enums.AppointmentStatus
  }

  export type NestedEnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type NestedEnumAppointmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AppointmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAppointmentStatusFilter<$PrismaModel>
    _max?: NestedEnumAppointmentStatusFilter<$PrismaModel>
  }

  export type NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type NestedEnumVerificationOutcomeFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationOutcome | EnumVerificationOutcomeFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationOutcome[] | ListEnumVerificationOutcomeFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationOutcome[] | ListEnumVerificationOutcomeFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationOutcomeFilter<$PrismaModel> | $Enums.VerificationOutcome
  }

  export type NestedEnumVerificationOutcomeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationOutcome | EnumVerificationOutcomeFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationOutcome[] | ListEnumVerificationOutcomeFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationOutcome[] | ListEnumVerificationOutcomeFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationOutcomeWithAggregatesFilter<$PrismaModel> | $Enums.VerificationOutcome
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVerificationOutcomeFilter<$PrismaModel>
    _max?: NestedEnumVerificationOutcomeFilter<$PrismaModel>
  }

  export type ClinicCreateWithoutAdminInput = {
    id?: string
    name: string
    address: string
    city: string
    state: string
    pincode: string
    latitude: number
    longitude: number
    doctorName: string
    degree?: string | null
    college?: string | null
    experience?: number | null
    specialization?: string | null
    clinicImages?: ClinicCreateclinicImagesInput | string[]
    doctorPhoto?: string | null
    maxPatientsPerDay?: number
    paymentRequired?: boolean
    consultationFee?: number | null
    status?: $Enums.ClinicStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentCreateNestedManyWithoutClinicInput
    queueState?: QueueStateCreateNestedOneWithoutClinicInput
    verificationLogs?: VerificationLogCreateNestedManyWithoutClinicInput
  }

  export type ClinicUncheckedCreateWithoutAdminInput = {
    id?: string
    name: string
    address: string
    city: string
    state: string
    pincode: string
    latitude: number
    longitude: number
    doctorName: string
    degree?: string | null
    college?: string | null
    experience?: number | null
    specialization?: string | null
    clinicImages?: ClinicCreateclinicImagesInput | string[]
    doctorPhoto?: string | null
    maxPatientsPerDay?: number
    paymentRequired?: boolean
    consultationFee?: number | null
    status?: $Enums.ClinicStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutClinicInput
    queueState?: QueueStateUncheckedCreateNestedOneWithoutClinicInput
    verificationLogs?: VerificationLogUncheckedCreateNestedManyWithoutClinicInput
  }

  export type ClinicCreateOrConnectWithoutAdminInput = {
    where: ClinicWhereUniqueInput
    create: XOR<ClinicCreateWithoutAdminInput, ClinicUncheckedCreateWithoutAdminInput>
  }

  export type ClinicCreateManyAdminInputEnvelope = {
    data: ClinicCreateManyAdminInput | ClinicCreateManyAdminInput[]
    skipDuplicates?: boolean
  }

  export type AppointmentCreateWithoutUserInput = {
    id?: string
    patientName: string
    patientAge: number
    patientPhone: string
    patientEmail?: string | null
    patientAddress?: string | null
    appointmentDate: Date | string
    tokenNumber: number
    status?: $Enums.AppointmentStatus
    paymentStatus?: $Enums.PaymentStatus
    razorpayOrderId?: string | null
    razorpayPaymentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clinic: ClinicCreateNestedOneWithoutAppointmentsInput
  }

  export type AppointmentUncheckedCreateWithoutUserInput = {
    id?: string
    clinicId: string
    patientName: string
    patientAge: number
    patientPhone: string
    patientEmail?: string | null
    patientAddress?: string | null
    appointmentDate: Date | string
    tokenNumber: number
    status?: $Enums.AppointmentStatus
    paymentStatus?: $Enums.PaymentStatus
    razorpayOrderId?: string | null
    razorpayPaymentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentCreateOrConnectWithoutUserInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutUserInput, AppointmentUncheckedCreateWithoutUserInput>
  }

  export type AppointmentCreateManyUserInputEnvelope = {
    data: AppointmentCreateManyUserInput | AppointmentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type VerificationLogCreateWithoutVerifierInput = {
    id?: string
    status: $Enums.VerificationOutcome
    notes?: string | null
    proofImageUrl?: string | null
    createdAt?: Date | string
    clinic: ClinicCreateNestedOneWithoutVerificationLogsInput
  }

  export type VerificationLogUncheckedCreateWithoutVerifierInput = {
    id?: string
    clinicId: string
    status: $Enums.VerificationOutcome
    notes?: string | null
    proofImageUrl?: string | null
    createdAt?: Date | string
  }

  export type VerificationLogCreateOrConnectWithoutVerifierInput = {
    where: VerificationLogWhereUniqueInput
    create: XOR<VerificationLogCreateWithoutVerifierInput, VerificationLogUncheckedCreateWithoutVerifierInput>
  }

  export type VerificationLogCreateManyVerifierInputEnvelope = {
    data: VerificationLogCreateManyVerifierInput | VerificationLogCreateManyVerifierInput[]
    skipDuplicates?: boolean
  }

  export type ClinicUpsertWithWhereUniqueWithoutAdminInput = {
    where: ClinicWhereUniqueInput
    update: XOR<ClinicUpdateWithoutAdminInput, ClinicUncheckedUpdateWithoutAdminInput>
    create: XOR<ClinicCreateWithoutAdminInput, ClinicUncheckedCreateWithoutAdminInput>
  }

  export type ClinicUpdateWithWhereUniqueWithoutAdminInput = {
    where: ClinicWhereUniqueInput
    data: XOR<ClinicUpdateWithoutAdminInput, ClinicUncheckedUpdateWithoutAdminInput>
  }

  export type ClinicUpdateManyWithWhereWithoutAdminInput = {
    where: ClinicScalarWhereInput
    data: XOR<ClinicUpdateManyMutationInput, ClinicUncheckedUpdateManyWithoutAdminInput>
  }

  export type ClinicScalarWhereInput = {
    AND?: ClinicScalarWhereInput | ClinicScalarWhereInput[]
    OR?: ClinicScalarWhereInput[]
    NOT?: ClinicScalarWhereInput | ClinicScalarWhereInput[]
    id?: StringFilter<"Clinic"> | string
    name?: StringFilter<"Clinic"> | string
    address?: StringFilter<"Clinic"> | string
    city?: StringFilter<"Clinic"> | string
    state?: StringFilter<"Clinic"> | string
    pincode?: StringFilter<"Clinic"> | string
    latitude?: FloatFilter<"Clinic"> | number
    longitude?: FloatFilter<"Clinic"> | number
    doctorName?: StringFilter<"Clinic"> | string
    degree?: StringNullableFilter<"Clinic"> | string | null
    college?: StringNullableFilter<"Clinic"> | string | null
    experience?: IntNullableFilter<"Clinic"> | number | null
    specialization?: StringNullableFilter<"Clinic"> | string | null
    clinicImages?: StringNullableListFilter<"Clinic">
    doctorPhoto?: StringNullableFilter<"Clinic"> | string | null
    maxPatientsPerDay?: IntFilter<"Clinic"> | number
    paymentRequired?: BoolFilter<"Clinic"> | boolean
    consultationFee?: IntNullableFilter<"Clinic"> | number | null
    status?: EnumClinicStatusFilter<"Clinic"> | $Enums.ClinicStatus
    adminId?: StringFilter<"Clinic"> | string
    createdAt?: DateTimeFilter<"Clinic"> | Date | string
    updatedAt?: DateTimeFilter<"Clinic"> | Date | string
  }

  export type AppointmentUpsertWithWhereUniqueWithoutUserInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutUserInput, AppointmentUncheckedUpdateWithoutUserInput>
    create: XOR<AppointmentCreateWithoutUserInput, AppointmentUncheckedCreateWithoutUserInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutUserInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutUserInput, AppointmentUncheckedUpdateWithoutUserInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutUserInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutUserInput>
  }

  export type AppointmentScalarWhereInput = {
    AND?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    OR?: AppointmentScalarWhereInput[]
    NOT?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    id?: StringFilter<"Appointment"> | string
    userId?: StringFilter<"Appointment"> | string
    clinicId?: StringFilter<"Appointment"> | string
    patientName?: StringFilter<"Appointment"> | string
    patientAge?: IntFilter<"Appointment"> | number
    patientPhone?: StringFilter<"Appointment"> | string
    patientEmail?: StringNullableFilter<"Appointment"> | string | null
    patientAddress?: StringNullableFilter<"Appointment"> | string | null
    appointmentDate?: DateTimeFilter<"Appointment"> | Date | string
    tokenNumber?: IntFilter<"Appointment"> | number
    status?: EnumAppointmentStatusFilter<"Appointment"> | $Enums.AppointmentStatus
    paymentStatus?: EnumPaymentStatusFilter<"Appointment"> | $Enums.PaymentStatus
    razorpayOrderId?: StringNullableFilter<"Appointment"> | string | null
    razorpayPaymentId?: StringNullableFilter<"Appointment"> | string | null
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
  }

  export type VerificationLogUpsertWithWhereUniqueWithoutVerifierInput = {
    where: VerificationLogWhereUniqueInput
    update: XOR<VerificationLogUpdateWithoutVerifierInput, VerificationLogUncheckedUpdateWithoutVerifierInput>
    create: XOR<VerificationLogCreateWithoutVerifierInput, VerificationLogUncheckedCreateWithoutVerifierInput>
  }

  export type VerificationLogUpdateWithWhereUniqueWithoutVerifierInput = {
    where: VerificationLogWhereUniqueInput
    data: XOR<VerificationLogUpdateWithoutVerifierInput, VerificationLogUncheckedUpdateWithoutVerifierInput>
  }

  export type VerificationLogUpdateManyWithWhereWithoutVerifierInput = {
    where: VerificationLogScalarWhereInput
    data: XOR<VerificationLogUpdateManyMutationInput, VerificationLogUncheckedUpdateManyWithoutVerifierInput>
  }

  export type VerificationLogScalarWhereInput = {
    AND?: VerificationLogScalarWhereInput | VerificationLogScalarWhereInput[]
    OR?: VerificationLogScalarWhereInput[]
    NOT?: VerificationLogScalarWhereInput | VerificationLogScalarWhereInput[]
    id?: StringFilter<"VerificationLog"> | string
    clinicId?: StringFilter<"VerificationLog"> | string
    verifierId?: StringFilter<"VerificationLog"> | string
    status?: EnumVerificationOutcomeFilter<"VerificationLog"> | $Enums.VerificationOutcome
    notes?: StringNullableFilter<"VerificationLog"> | string | null
    proofImageUrl?: StringNullableFilter<"VerificationLog"> | string | null
    createdAt?: DateTimeFilter<"VerificationLog"> | Date | string
  }

  export type UserCreateWithoutClinicsInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    passwordHash: string
    role?: $Enums.Role
    fcmToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentCreateNestedManyWithoutUserInput
    verificationLogs?: VerificationLogCreateNestedManyWithoutVerifierInput
  }

  export type UserUncheckedCreateWithoutClinicsInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    passwordHash: string
    role?: $Enums.Role
    fcmToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutUserInput
    verificationLogs?: VerificationLogUncheckedCreateNestedManyWithoutVerifierInput
  }

  export type UserCreateOrConnectWithoutClinicsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutClinicsInput, UserUncheckedCreateWithoutClinicsInput>
  }

  export type AppointmentCreateWithoutClinicInput = {
    id?: string
    patientName: string
    patientAge: number
    patientPhone: string
    patientEmail?: string | null
    patientAddress?: string | null
    appointmentDate: Date | string
    tokenNumber: number
    status?: $Enums.AppointmentStatus
    paymentStatus?: $Enums.PaymentStatus
    razorpayOrderId?: string | null
    razorpayPaymentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAppointmentsInput
  }

  export type AppointmentUncheckedCreateWithoutClinicInput = {
    id?: string
    userId: string
    patientName: string
    patientAge: number
    patientPhone: string
    patientEmail?: string | null
    patientAddress?: string | null
    appointmentDate: Date | string
    tokenNumber: number
    status?: $Enums.AppointmentStatus
    paymentStatus?: $Enums.PaymentStatus
    razorpayOrderId?: string | null
    razorpayPaymentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentCreateOrConnectWithoutClinicInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutClinicInput, AppointmentUncheckedCreateWithoutClinicInput>
  }

  export type AppointmentCreateManyClinicInputEnvelope = {
    data: AppointmentCreateManyClinicInput | AppointmentCreateManyClinicInput[]
    skipDuplicates?: boolean
  }

  export type QueueStateCreateWithoutClinicInput = {
    id?: string
    currentToken?: number
    totalBookedToday?: number
    date: Date | string
    updatedAt?: Date | string
  }

  export type QueueStateUncheckedCreateWithoutClinicInput = {
    id?: string
    currentToken?: number
    totalBookedToday?: number
    date: Date | string
    updatedAt?: Date | string
  }

  export type QueueStateCreateOrConnectWithoutClinicInput = {
    where: QueueStateWhereUniqueInput
    create: XOR<QueueStateCreateWithoutClinicInput, QueueStateUncheckedCreateWithoutClinicInput>
  }

  export type VerificationLogCreateWithoutClinicInput = {
    id?: string
    status: $Enums.VerificationOutcome
    notes?: string | null
    proofImageUrl?: string | null
    createdAt?: Date | string
    verifier: UserCreateNestedOneWithoutVerificationLogsInput
  }

  export type VerificationLogUncheckedCreateWithoutClinicInput = {
    id?: string
    verifierId: string
    status: $Enums.VerificationOutcome
    notes?: string | null
    proofImageUrl?: string | null
    createdAt?: Date | string
  }

  export type VerificationLogCreateOrConnectWithoutClinicInput = {
    where: VerificationLogWhereUniqueInput
    create: XOR<VerificationLogCreateWithoutClinicInput, VerificationLogUncheckedCreateWithoutClinicInput>
  }

  export type VerificationLogCreateManyClinicInputEnvelope = {
    data: VerificationLogCreateManyClinicInput | VerificationLogCreateManyClinicInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutClinicsInput = {
    update: XOR<UserUpdateWithoutClinicsInput, UserUncheckedUpdateWithoutClinicsInput>
    create: XOR<UserCreateWithoutClinicsInput, UserUncheckedCreateWithoutClinicsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutClinicsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutClinicsInput, UserUncheckedUpdateWithoutClinicsInput>
  }

  export type UserUpdateWithoutClinicsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    fcmToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUpdateManyWithoutUserNestedInput
    verificationLogs?: VerificationLogUpdateManyWithoutVerifierNestedInput
  }

  export type UserUncheckedUpdateWithoutClinicsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    fcmToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutUserNestedInput
    verificationLogs?: VerificationLogUncheckedUpdateManyWithoutVerifierNestedInput
  }

  export type AppointmentUpsertWithWhereUniqueWithoutClinicInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutClinicInput, AppointmentUncheckedUpdateWithoutClinicInput>
    create: XOR<AppointmentCreateWithoutClinicInput, AppointmentUncheckedCreateWithoutClinicInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutClinicInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutClinicInput, AppointmentUncheckedUpdateWithoutClinicInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutClinicInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutClinicInput>
  }

  export type QueueStateUpsertWithoutClinicInput = {
    update: XOR<QueueStateUpdateWithoutClinicInput, QueueStateUncheckedUpdateWithoutClinicInput>
    create: XOR<QueueStateCreateWithoutClinicInput, QueueStateUncheckedCreateWithoutClinicInput>
    where?: QueueStateWhereInput
  }

  export type QueueStateUpdateToOneWithWhereWithoutClinicInput = {
    where?: QueueStateWhereInput
    data: XOR<QueueStateUpdateWithoutClinicInput, QueueStateUncheckedUpdateWithoutClinicInput>
  }

  export type QueueStateUpdateWithoutClinicInput = {
    id?: StringFieldUpdateOperationsInput | string
    currentToken?: IntFieldUpdateOperationsInput | number
    totalBookedToday?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QueueStateUncheckedUpdateWithoutClinicInput = {
    id?: StringFieldUpdateOperationsInput | string
    currentToken?: IntFieldUpdateOperationsInput | number
    totalBookedToday?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationLogUpsertWithWhereUniqueWithoutClinicInput = {
    where: VerificationLogWhereUniqueInput
    update: XOR<VerificationLogUpdateWithoutClinicInput, VerificationLogUncheckedUpdateWithoutClinicInput>
    create: XOR<VerificationLogCreateWithoutClinicInput, VerificationLogUncheckedCreateWithoutClinicInput>
  }

  export type VerificationLogUpdateWithWhereUniqueWithoutClinicInput = {
    where: VerificationLogWhereUniqueInput
    data: XOR<VerificationLogUpdateWithoutClinicInput, VerificationLogUncheckedUpdateWithoutClinicInput>
  }

  export type VerificationLogUpdateManyWithWhereWithoutClinicInput = {
    where: VerificationLogScalarWhereInput
    data: XOR<VerificationLogUpdateManyMutationInput, VerificationLogUncheckedUpdateManyWithoutClinicInput>
  }

  export type UserCreateWithoutAppointmentsInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    passwordHash: string
    role?: $Enums.Role
    fcmToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clinics?: ClinicCreateNestedManyWithoutAdminInput
    verificationLogs?: VerificationLogCreateNestedManyWithoutVerifierInput
  }

  export type UserUncheckedCreateWithoutAppointmentsInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    passwordHash: string
    role?: $Enums.Role
    fcmToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clinics?: ClinicUncheckedCreateNestedManyWithoutAdminInput
    verificationLogs?: VerificationLogUncheckedCreateNestedManyWithoutVerifierInput
  }

  export type UserCreateOrConnectWithoutAppointmentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAppointmentsInput, UserUncheckedCreateWithoutAppointmentsInput>
  }

  export type ClinicCreateWithoutAppointmentsInput = {
    id?: string
    name: string
    address: string
    city: string
    state: string
    pincode: string
    latitude: number
    longitude: number
    doctorName: string
    degree?: string | null
    college?: string | null
    experience?: number | null
    specialization?: string | null
    clinicImages?: ClinicCreateclinicImagesInput | string[]
    doctorPhoto?: string | null
    maxPatientsPerDay?: number
    paymentRequired?: boolean
    consultationFee?: number | null
    status?: $Enums.ClinicStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    admin: UserCreateNestedOneWithoutClinicsInput
    queueState?: QueueStateCreateNestedOneWithoutClinicInput
    verificationLogs?: VerificationLogCreateNestedManyWithoutClinicInput
  }

  export type ClinicUncheckedCreateWithoutAppointmentsInput = {
    id?: string
    name: string
    address: string
    city: string
    state: string
    pincode: string
    latitude: number
    longitude: number
    doctorName: string
    degree?: string | null
    college?: string | null
    experience?: number | null
    specialization?: string | null
    clinicImages?: ClinicCreateclinicImagesInput | string[]
    doctorPhoto?: string | null
    maxPatientsPerDay?: number
    paymentRequired?: boolean
    consultationFee?: number | null
    status?: $Enums.ClinicStatus
    adminId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    queueState?: QueueStateUncheckedCreateNestedOneWithoutClinicInput
    verificationLogs?: VerificationLogUncheckedCreateNestedManyWithoutClinicInput
  }

  export type ClinicCreateOrConnectWithoutAppointmentsInput = {
    where: ClinicWhereUniqueInput
    create: XOR<ClinicCreateWithoutAppointmentsInput, ClinicUncheckedCreateWithoutAppointmentsInput>
  }

  export type UserUpsertWithoutAppointmentsInput = {
    update: XOR<UserUpdateWithoutAppointmentsInput, UserUncheckedUpdateWithoutAppointmentsInput>
    create: XOR<UserCreateWithoutAppointmentsInput, UserUncheckedCreateWithoutAppointmentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAppointmentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAppointmentsInput, UserUncheckedUpdateWithoutAppointmentsInput>
  }

  export type UserUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    fcmToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinics?: ClinicUpdateManyWithoutAdminNestedInput
    verificationLogs?: VerificationLogUpdateManyWithoutVerifierNestedInput
  }

  export type UserUncheckedUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    fcmToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinics?: ClinicUncheckedUpdateManyWithoutAdminNestedInput
    verificationLogs?: VerificationLogUncheckedUpdateManyWithoutVerifierNestedInput
  }

  export type ClinicUpsertWithoutAppointmentsInput = {
    update: XOR<ClinicUpdateWithoutAppointmentsInput, ClinicUncheckedUpdateWithoutAppointmentsInput>
    create: XOR<ClinicCreateWithoutAppointmentsInput, ClinicUncheckedCreateWithoutAppointmentsInput>
    where?: ClinicWhereInput
  }

  export type ClinicUpdateToOneWithWhereWithoutAppointmentsInput = {
    where?: ClinicWhereInput
    data: XOR<ClinicUpdateWithoutAppointmentsInput, ClinicUncheckedUpdateWithoutAppointmentsInput>
  }

  export type ClinicUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    doctorName?: StringFieldUpdateOperationsInput | string
    degree?: NullableStringFieldUpdateOperationsInput | string | null
    college?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableIntFieldUpdateOperationsInput | number | null
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    clinicImages?: ClinicUpdateclinicImagesInput | string[]
    doctorPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    maxPatientsPerDay?: IntFieldUpdateOperationsInput | number
    paymentRequired?: BoolFieldUpdateOperationsInput | boolean
    consultationFee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumClinicStatusFieldUpdateOperationsInput | $Enums.ClinicStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: UserUpdateOneRequiredWithoutClinicsNestedInput
    queueState?: QueueStateUpdateOneWithoutClinicNestedInput
    verificationLogs?: VerificationLogUpdateManyWithoutClinicNestedInput
  }

  export type ClinicUncheckedUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    doctorName?: StringFieldUpdateOperationsInput | string
    degree?: NullableStringFieldUpdateOperationsInput | string | null
    college?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableIntFieldUpdateOperationsInput | number | null
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    clinicImages?: ClinicUpdateclinicImagesInput | string[]
    doctorPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    maxPatientsPerDay?: IntFieldUpdateOperationsInput | number
    paymentRequired?: BoolFieldUpdateOperationsInput | boolean
    consultationFee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumClinicStatusFieldUpdateOperationsInput | $Enums.ClinicStatus
    adminId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    queueState?: QueueStateUncheckedUpdateOneWithoutClinicNestedInput
    verificationLogs?: VerificationLogUncheckedUpdateManyWithoutClinicNestedInput
  }

  export type ClinicCreateWithoutQueueStateInput = {
    id?: string
    name: string
    address: string
    city: string
    state: string
    pincode: string
    latitude: number
    longitude: number
    doctorName: string
    degree?: string | null
    college?: string | null
    experience?: number | null
    specialization?: string | null
    clinicImages?: ClinicCreateclinicImagesInput | string[]
    doctorPhoto?: string | null
    maxPatientsPerDay?: number
    paymentRequired?: boolean
    consultationFee?: number | null
    status?: $Enums.ClinicStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    admin: UserCreateNestedOneWithoutClinicsInput
    appointments?: AppointmentCreateNestedManyWithoutClinicInput
    verificationLogs?: VerificationLogCreateNestedManyWithoutClinicInput
  }

  export type ClinicUncheckedCreateWithoutQueueStateInput = {
    id?: string
    name: string
    address: string
    city: string
    state: string
    pincode: string
    latitude: number
    longitude: number
    doctorName: string
    degree?: string | null
    college?: string | null
    experience?: number | null
    specialization?: string | null
    clinicImages?: ClinicCreateclinicImagesInput | string[]
    doctorPhoto?: string | null
    maxPatientsPerDay?: number
    paymentRequired?: boolean
    consultationFee?: number | null
    status?: $Enums.ClinicStatus
    adminId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutClinicInput
    verificationLogs?: VerificationLogUncheckedCreateNestedManyWithoutClinicInput
  }

  export type ClinicCreateOrConnectWithoutQueueStateInput = {
    where: ClinicWhereUniqueInput
    create: XOR<ClinicCreateWithoutQueueStateInput, ClinicUncheckedCreateWithoutQueueStateInput>
  }

  export type ClinicUpsertWithoutQueueStateInput = {
    update: XOR<ClinicUpdateWithoutQueueStateInput, ClinicUncheckedUpdateWithoutQueueStateInput>
    create: XOR<ClinicCreateWithoutQueueStateInput, ClinicUncheckedCreateWithoutQueueStateInput>
    where?: ClinicWhereInput
  }

  export type ClinicUpdateToOneWithWhereWithoutQueueStateInput = {
    where?: ClinicWhereInput
    data: XOR<ClinicUpdateWithoutQueueStateInput, ClinicUncheckedUpdateWithoutQueueStateInput>
  }

  export type ClinicUpdateWithoutQueueStateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    doctorName?: StringFieldUpdateOperationsInput | string
    degree?: NullableStringFieldUpdateOperationsInput | string | null
    college?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableIntFieldUpdateOperationsInput | number | null
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    clinicImages?: ClinicUpdateclinicImagesInput | string[]
    doctorPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    maxPatientsPerDay?: IntFieldUpdateOperationsInput | number
    paymentRequired?: BoolFieldUpdateOperationsInput | boolean
    consultationFee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumClinicStatusFieldUpdateOperationsInput | $Enums.ClinicStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: UserUpdateOneRequiredWithoutClinicsNestedInput
    appointments?: AppointmentUpdateManyWithoutClinicNestedInput
    verificationLogs?: VerificationLogUpdateManyWithoutClinicNestedInput
  }

  export type ClinicUncheckedUpdateWithoutQueueStateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    doctorName?: StringFieldUpdateOperationsInput | string
    degree?: NullableStringFieldUpdateOperationsInput | string | null
    college?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableIntFieldUpdateOperationsInput | number | null
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    clinicImages?: ClinicUpdateclinicImagesInput | string[]
    doctorPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    maxPatientsPerDay?: IntFieldUpdateOperationsInput | number
    paymentRequired?: BoolFieldUpdateOperationsInput | boolean
    consultationFee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumClinicStatusFieldUpdateOperationsInput | $Enums.ClinicStatus
    adminId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutClinicNestedInput
    verificationLogs?: VerificationLogUncheckedUpdateManyWithoutClinicNestedInput
  }

  export type ClinicCreateWithoutVerificationLogsInput = {
    id?: string
    name: string
    address: string
    city: string
    state: string
    pincode: string
    latitude: number
    longitude: number
    doctorName: string
    degree?: string | null
    college?: string | null
    experience?: number | null
    specialization?: string | null
    clinicImages?: ClinicCreateclinicImagesInput | string[]
    doctorPhoto?: string | null
    maxPatientsPerDay?: number
    paymentRequired?: boolean
    consultationFee?: number | null
    status?: $Enums.ClinicStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    admin: UserCreateNestedOneWithoutClinicsInput
    appointments?: AppointmentCreateNestedManyWithoutClinicInput
    queueState?: QueueStateCreateNestedOneWithoutClinicInput
  }

  export type ClinicUncheckedCreateWithoutVerificationLogsInput = {
    id?: string
    name: string
    address: string
    city: string
    state: string
    pincode: string
    latitude: number
    longitude: number
    doctorName: string
    degree?: string | null
    college?: string | null
    experience?: number | null
    specialization?: string | null
    clinicImages?: ClinicCreateclinicImagesInput | string[]
    doctorPhoto?: string | null
    maxPatientsPerDay?: number
    paymentRequired?: boolean
    consultationFee?: number | null
    status?: $Enums.ClinicStatus
    adminId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutClinicInput
    queueState?: QueueStateUncheckedCreateNestedOneWithoutClinicInput
  }

  export type ClinicCreateOrConnectWithoutVerificationLogsInput = {
    where: ClinicWhereUniqueInput
    create: XOR<ClinicCreateWithoutVerificationLogsInput, ClinicUncheckedCreateWithoutVerificationLogsInput>
  }

  export type UserCreateWithoutVerificationLogsInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    passwordHash: string
    role?: $Enums.Role
    fcmToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clinics?: ClinicCreateNestedManyWithoutAdminInput
    appointments?: AppointmentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutVerificationLogsInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    passwordHash: string
    role?: $Enums.Role
    fcmToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clinics?: ClinicUncheckedCreateNestedManyWithoutAdminInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutVerificationLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutVerificationLogsInput, UserUncheckedCreateWithoutVerificationLogsInput>
  }

  export type ClinicUpsertWithoutVerificationLogsInput = {
    update: XOR<ClinicUpdateWithoutVerificationLogsInput, ClinicUncheckedUpdateWithoutVerificationLogsInput>
    create: XOR<ClinicCreateWithoutVerificationLogsInput, ClinicUncheckedCreateWithoutVerificationLogsInput>
    where?: ClinicWhereInput
  }

  export type ClinicUpdateToOneWithWhereWithoutVerificationLogsInput = {
    where?: ClinicWhereInput
    data: XOR<ClinicUpdateWithoutVerificationLogsInput, ClinicUncheckedUpdateWithoutVerificationLogsInput>
  }

  export type ClinicUpdateWithoutVerificationLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    doctorName?: StringFieldUpdateOperationsInput | string
    degree?: NullableStringFieldUpdateOperationsInput | string | null
    college?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableIntFieldUpdateOperationsInput | number | null
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    clinicImages?: ClinicUpdateclinicImagesInput | string[]
    doctorPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    maxPatientsPerDay?: IntFieldUpdateOperationsInput | number
    paymentRequired?: BoolFieldUpdateOperationsInput | boolean
    consultationFee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumClinicStatusFieldUpdateOperationsInput | $Enums.ClinicStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: UserUpdateOneRequiredWithoutClinicsNestedInput
    appointments?: AppointmentUpdateManyWithoutClinicNestedInput
    queueState?: QueueStateUpdateOneWithoutClinicNestedInput
  }

  export type ClinicUncheckedUpdateWithoutVerificationLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    doctorName?: StringFieldUpdateOperationsInput | string
    degree?: NullableStringFieldUpdateOperationsInput | string | null
    college?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableIntFieldUpdateOperationsInput | number | null
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    clinicImages?: ClinicUpdateclinicImagesInput | string[]
    doctorPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    maxPatientsPerDay?: IntFieldUpdateOperationsInput | number
    paymentRequired?: BoolFieldUpdateOperationsInput | boolean
    consultationFee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumClinicStatusFieldUpdateOperationsInput | $Enums.ClinicStatus
    adminId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutClinicNestedInput
    queueState?: QueueStateUncheckedUpdateOneWithoutClinicNestedInput
  }

  export type UserUpsertWithoutVerificationLogsInput = {
    update: XOR<UserUpdateWithoutVerificationLogsInput, UserUncheckedUpdateWithoutVerificationLogsInput>
    create: XOR<UserCreateWithoutVerificationLogsInput, UserUncheckedCreateWithoutVerificationLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutVerificationLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutVerificationLogsInput, UserUncheckedUpdateWithoutVerificationLogsInput>
  }

  export type UserUpdateWithoutVerificationLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    fcmToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinics?: ClinicUpdateManyWithoutAdminNestedInput
    appointments?: AppointmentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutVerificationLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    fcmToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinics?: ClinicUncheckedUpdateManyWithoutAdminNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ClinicCreateManyAdminInput = {
    id?: string
    name: string
    address: string
    city: string
    state: string
    pincode: string
    latitude: number
    longitude: number
    doctorName: string
    degree?: string | null
    college?: string | null
    experience?: number | null
    specialization?: string | null
    clinicImages?: ClinicCreateclinicImagesInput | string[]
    doctorPhoto?: string | null
    maxPatientsPerDay?: number
    paymentRequired?: boolean
    consultationFee?: number | null
    status?: $Enums.ClinicStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentCreateManyUserInput = {
    id?: string
    clinicId: string
    patientName: string
    patientAge: number
    patientPhone: string
    patientEmail?: string | null
    patientAddress?: string | null
    appointmentDate: Date | string
    tokenNumber: number
    status?: $Enums.AppointmentStatus
    paymentStatus?: $Enums.PaymentStatus
    razorpayOrderId?: string | null
    razorpayPaymentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationLogCreateManyVerifierInput = {
    id?: string
    clinicId: string
    status: $Enums.VerificationOutcome
    notes?: string | null
    proofImageUrl?: string | null
    createdAt?: Date | string
  }

  export type ClinicUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    doctorName?: StringFieldUpdateOperationsInput | string
    degree?: NullableStringFieldUpdateOperationsInput | string | null
    college?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableIntFieldUpdateOperationsInput | number | null
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    clinicImages?: ClinicUpdateclinicImagesInput | string[]
    doctorPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    maxPatientsPerDay?: IntFieldUpdateOperationsInput | number
    paymentRequired?: BoolFieldUpdateOperationsInput | boolean
    consultationFee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumClinicStatusFieldUpdateOperationsInput | $Enums.ClinicStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUpdateManyWithoutClinicNestedInput
    queueState?: QueueStateUpdateOneWithoutClinicNestedInput
    verificationLogs?: VerificationLogUpdateManyWithoutClinicNestedInput
  }

  export type ClinicUncheckedUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    doctorName?: StringFieldUpdateOperationsInput | string
    degree?: NullableStringFieldUpdateOperationsInput | string | null
    college?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableIntFieldUpdateOperationsInput | number | null
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    clinicImages?: ClinicUpdateclinicImagesInput | string[]
    doctorPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    maxPatientsPerDay?: IntFieldUpdateOperationsInput | number
    paymentRequired?: BoolFieldUpdateOperationsInput | boolean
    consultationFee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumClinicStatusFieldUpdateOperationsInput | $Enums.ClinicStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutClinicNestedInput
    queueState?: QueueStateUncheckedUpdateOneWithoutClinicNestedInput
    verificationLogs?: VerificationLogUncheckedUpdateManyWithoutClinicNestedInput
  }

  export type ClinicUncheckedUpdateManyWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    doctorName?: StringFieldUpdateOperationsInput | string
    degree?: NullableStringFieldUpdateOperationsInput | string | null
    college?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableIntFieldUpdateOperationsInput | number | null
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    clinicImages?: ClinicUpdateclinicImagesInput | string[]
    doctorPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    maxPatientsPerDay?: IntFieldUpdateOperationsInput | number
    paymentRequired?: BoolFieldUpdateOperationsInput | boolean
    consultationFee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumClinicStatusFieldUpdateOperationsInput | $Enums.ClinicStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    patientAge?: IntFieldUpdateOperationsInput | number
    patientPhone?: StringFieldUpdateOperationsInput | string
    patientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    patientAddress?: NullableStringFieldUpdateOperationsInput | string | null
    appointmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    tokenNumber?: IntFieldUpdateOperationsInput | number
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    razorpayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    razorpayPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinic?: ClinicUpdateOneRequiredWithoutAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    patientAge?: IntFieldUpdateOperationsInput | number
    patientPhone?: StringFieldUpdateOperationsInput | string
    patientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    patientAddress?: NullableStringFieldUpdateOperationsInput | string | null
    appointmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    tokenNumber?: IntFieldUpdateOperationsInput | number
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    razorpayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    razorpayPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    patientAge?: IntFieldUpdateOperationsInput | number
    patientPhone?: StringFieldUpdateOperationsInput | string
    patientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    patientAddress?: NullableStringFieldUpdateOperationsInput | string | null
    appointmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    tokenNumber?: IntFieldUpdateOperationsInput | number
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    razorpayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    razorpayPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationLogUpdateWithoutVerifierInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumVerificationOutcomeFieldUpdateOperationsInput | $Enums.VerificationOutcome
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    proofImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinic?: ClinicUpdateOneRequiredWithoutVerificationLogsNestedInput
  }

  export type VerificationLogUncheckedUpdateWithoutVerifierInput = {
    id?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    status?: EnumVerificationOutcomeFieldUpdateOperationsInput | $Enums.VerificationOutcome
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    proofImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationLogUncheckedUpdateManyWithoutVerifierInput = {
    id?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    status?: EnumVerificationOutcomeFieldUpdateOperationsInput | $Enums.VerificationOutcome
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    proofImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateManyClinicInput = {
    id?: string
    userId: string
    patientName: string
    patientAge: number
    patientPhone: string
    patientEmail?: string | null
    patientAddress?: string | null
    appointmentDate: Date | string
    tokenNumber: number
    status?: $Enums.AppointmentStatus
    paymentStatus?: $Enums.PaymentStatus
    razorpayOrderId?: string | null
    razorpayPaymentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationLogCreateManyClinicInput = {
    id?: string
    verifierId: string
    status: $Enums.VerificationOutcome
    notes?: string | null
    proofImageUrl?: string | null
    createdAt?: Date | string
  }

  export type AppointmentUpdateWithoutClinicInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    patientAge?: IntFieldUpdateOperationsInput | number
    patientPhone?: StringFieldUpdateOperationsInput | string
    patientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    patientAddress?: NullableStringFieldUpdateOperationsInput | string | null
    appointmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    tokenNumber?: IntFieldUpdateOperationsInput | number
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    razorpayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    razorpayPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutClinicInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    patientAge?: IntFieldUpdateOperationsInput | number
    patientPhone?: StringFieldUpdateOperationsInput | string
    patientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    patientAddress?: NullableStringFieldUpdateOperationsInput | string | null
    appointmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    tokenNumber?: IntFieldUpdateOperationsInput | number
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    razorpayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    razorpayPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyWithoutClinicInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    patientAge?: IntFieldUpdateOperationsInput | number
    patientPhone?: StringFieldUpdateOperationsInput | string
    patientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    patientAddress?: NullableStringFieldUpdateOperationsInput | string | null
    appointmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    tokenNumber?: IntFieldUpdateOperationsInput | number
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    razorpayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    razorpayPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationLogUpdateWithoutClinicInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumVerificationOutcomeFieldUpdateOperationsInput | $Enums.VerificationOutcome
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    proofImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verifier?: UserUpdateOneRequiredWithoutVerificationLogsNestedInput
  }

  export type VerificationLogUncheckedUpdateWithoutClinicInput = {
    id?: StringFieldUpdateOperationsInput | string
    verifierId?: StringFieldUpdateOperationsInput | string
    status?: EnumVerificationOutcomeFieldUpdateOperationsInput | $Enums.VerificationOutcome
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    proofImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationLogUncheckedUpdateManyWithoutClinicInput = {
    id?: StringFieldUpdateOperationsInput | string
    verifierId?: StringFieldUpdateOperationsInput | string
    status?: EnumVerificationOutcomeFieldUpdateOperationsInput | $Enums.VerificationOutcome
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    proofImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}