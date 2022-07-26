import * as React from 'react';
/**
 * Helper to merge refs from within class components.
 */
export declare const createMergedRef: <TType, TValue = null>(value?: TValue | undefined) => (...newRefs: (((instance: TType | TValue | null) => void) | React.RefObject<TType | TValue | null> | null | undefined)[]) => (newValue: TType | TValue | null) => void;
