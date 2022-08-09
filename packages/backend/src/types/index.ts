import { Request } from 'express';

export type Req<
  T extends { params?: unknown; body?: unknown; query?: unknown }
> = Request<T['params'], unknown, T['body'], T['query']>;
