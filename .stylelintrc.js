/*
 * @Descripttion:
 * @Version: v0.1
 * @Author: pengfei.xiu
 * @Date: 2021-09-08 16:40:33
 * @LastEditors: pengfei.xiu
 * @LastEditTime: 2021-10-08 14:02:25
 */
// https://stylelint.io/user-guide/rules/list/property-no-unknown/

module.exports = {
  processors: [],
  plugins: [],
  extends: 'stylelint-config-standard',
  rules: {
    'no-empty-source': null,
    'at-rule-no-unknown': null, // unknown at-rule "@include"
    'selector-pseudo-class-no-unknown': [
      true,
      {
        'ignorePseudoClasses': ['global', 'export']
      }
    ],
    'property-no-unknown': [
      true,
      {
        'ignoreProperties': ['theme', '/^menu.*/', '/^custom.*/']
      }
    ]
  }
}
