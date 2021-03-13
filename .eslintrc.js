// 其中第一项是 off、warn 或 error 中的一个，表示关闭、警告和报错。后面的项都是该规则的其他配置。
// https://github.com/AlloyTeam/eslint-config-alloy/blob/HEAD/README.zh-CN.md#typescript
module.exports = {
	extends: [
        'eslint-config-alloy/typescript',
    ],
	parserOptions: {
		parser: '@typescript-eslint/eslint-plugin',
	},
    plugins: [
        'typescript'
    ],
    rules: {
        // @fixable 必须使用 === 或 !==，禁止使用 == 或 !=，与 null 比较时除外
        'eqeqeq': [
            'error',
            'always',
            {
                null: 'ignore'
            }
        ],
        // 类和接口的命名必须遵守帕斯卡命名法，比如 PersianCat
        'typescript/class-name-casing': 'error',
		'semi': ['error', 'never'] 
    }
}