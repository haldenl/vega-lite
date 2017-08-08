export type LogicalOperand<T> = LogicalNot<T> | LogicalAnd<T> | LogicalOr<T> | T;

export interface LogicalOr<T> {
  or: LogicalOperand<T>[];
}

export interface LogicalAnd<T> {
  and: LogicalOperand<T>[];
}

export interface LogicalNot<T> {
  not: LogicalOperand<T>;
}

export function isLogicalOr(op: LogicalOperand<any>): op is LogicalOr<any> {
  return !!op.or;
}

export function isLogicalAnd(op: LogicalOperand<any>): op is LogicalAnd<any> {
  return !!op.and;
}

export function isLogicalNot(op: LogicalOperand<any>): op is LogicalNot<any> {
  return !!op.not;
}

export function forEachLeave<T>(op: LogicalOperand<T>, fn: (op: T) => void) {
  if (isLogicalNot(op)) {
    forEachLeave(op.not, fn);
  } else if (isLogicalAnd(op)) {
    for (const subop of op.and) {
      forEachLeave(subop, fn);
    }
  } else if (isLogicalOr(op)) {
    for (const subop of op.or) {
      forEachLeave(subop, fn);
    }
  } else {
    fn(op);
  }
}
