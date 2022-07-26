import * as React from 'react';
import { ICustomizations } from './Customizations';
export interface ICustomizerContext {
    customizations: ICustomizations;
}
export declare const CustomizerContext: React.Context<ICustomizerContext>;
