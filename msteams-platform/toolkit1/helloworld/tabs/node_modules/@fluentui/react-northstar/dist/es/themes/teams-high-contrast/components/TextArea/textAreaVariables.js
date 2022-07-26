import { pxToRem } from '../../../../utils';
export var textAreaVariables = function textAreaVariables(siteVars) {
  return {
    borderColor: siteVars.bodyColor,
    borderWidth: pxToRem(1) + " " + pxToRem(1) + " " + pxToRem(2) + " " + pxToRem(1),
    borderColorFocus: siteVars.colors.white + " " + siteVars.colors.white + " " + siteVars.colorScheme.brand.borderFocus1 + " " + siteVars.colors.white
  };
};
//# sourceMappingURL=textAreaVariables.js.map
