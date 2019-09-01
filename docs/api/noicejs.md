<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [noicejs](./noicejs.md)

## noicejs package

## Classes

|  Class | Description |
|  --- | --- |
|  [BaseError](./noicejs.baseerror.md) |  |
|  [ConsoleLogger](./noicejs.consolelogger.md) | Logger implementation using the console. |
|  [Container](./noicejs.container.md) | This is an exceptionally minimal DI container. |
|  [ContainerBoundError](./noicejs.containerbounderror.md) |  |
|  [ContainerNotBoundError](./noicejs.containernotbounderror.md) |  |
|  [MissingValueError](./noicejs.missingvalueerror.md) |  |
|  [Module](./noicejs.module.md) | Provides a set of dependencies, bound in the <code>configure</code> method. |
|  [NullLogger](./noicejs.nulllogger.md) | Logger implementation that consumes input and produces no output. |

## Enumerations

|  Enumeration | Description |
|  --- | --- |
|  [ProviderType](./noicejs.providertype.md) | Providers for a particular contract. |

## Functions

|  Function | Description |
|  --- | --- |
|  [getInject(target)](./noicejs.getinject.md) |  |
|  [getProvides(target)](./noicejs.getprovides.md) |  |
|  [Inject(needs)](./noicejs.inject.md) | Injection decorator for classes. |
|  [logWithLevel(logger, level, options, msg)](./noicejs.logwithlevel.md) | Switch helper to invoke log methods based on variable log level. |
|  [Provides(provides)](./noicejs.provides.md) | Injection decorator for classes. |

## Interfaces

|  Interface | Description |
|  --- | --- |
|  [BaseOptions](./noicejs.baseoptions.md) | Base interface for all constructor options. |
|  [Constructor](./noicejs.constructor.md) | Some constructor taking options as the first parameter. |
|  [Logger](./noicejs.logger.md) | Log interface to fit console or bunyan. |
|  [ModuleOptions](./noicejs.moduleoptions.md) | Required options for modules. |

## Type Aliases

|  Type Alias | Description |
|  --- | --- |
|  [Contract](./noicejs.contract.md) | A contract identifier or concrete constructor. |
|  [LogLevel](./noicejs.loglevel.md) |  |
|  [Provider](./noicejs.provider.md) |  |
