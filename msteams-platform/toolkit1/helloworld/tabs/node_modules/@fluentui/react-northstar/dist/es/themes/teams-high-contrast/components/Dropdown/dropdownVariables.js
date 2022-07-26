import { pxToRem } from '../../../../utils';
export var dropdownVariables = function dropdownVariables(siteVars) {
  return {
    borderColor: siteVars.colorScheme.default.border,
    borderColorHover: siteVars.colorScheme.default.borderHover,
    borderWidth: pxToRem(1),
    listBorderColor: siteVars.colors.white,
    listBoxShadow: undefined,
    listBorderWidth: pxToRem(1),
    listItemSelectedColor: siteVars.accessibleCyan,
    selectedItemBorder: pxToRem(1) + " solid " + siteVars.colors.white
  };
};
//# sourceMappingURL=dropdownVariables.js.map
