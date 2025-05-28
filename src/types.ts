import {Request, Response, NextFunction} from 'express';

export type TRouteHandler <R = any> = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<R>;