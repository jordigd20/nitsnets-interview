// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default withNuxt(
  [
    {
      rules: {
        'prettier/prettier': [
          'error',
          {
            vueIndentScriptAndStyle: true
          }
        ]
      }
    }
  ],
  eslintPluginPrettierRecommended
);
