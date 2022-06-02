module.exports = {
  stories: [
    "../projects/ng-one-time-password/**/*.stories.mdx",
    "../projects/ng-one-time-password/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/angular",
  core: {
    builder: "@storybook/builder-webpack5",
  },
};
