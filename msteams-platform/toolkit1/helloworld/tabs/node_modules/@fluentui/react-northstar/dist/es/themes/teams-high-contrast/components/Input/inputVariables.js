import { pxToRem } from '../../../../utils';
export var inputVariables = function inputVariables(siteVars) {
  return {
    borderColor: siteVars.bodyColor,
    borderWidth: pxToRem(1) + " " + pxToRem(1) + " " + pxToRem(2) + " " + pxToRem(1),
    inputFocusBorderColor: siteVars.colors.white + " " + siteVars.colors.white + " " + siteVars.colorScheme.brand.borderFocus1 + " " + siteVars.colors.white
  };
};
//# sourceMappingURL=inputVariables.js.map
