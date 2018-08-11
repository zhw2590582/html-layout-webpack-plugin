const path = require("path");
const fs = require("fs");

module.exports = class HtmlLayoutWebpackPlugin {
  constructor(options) {
    this.pattern = /(<!--\s*)@([\w-\/]+):([\w-\/]+)(\s-->)?/g;
    this.options = options;
    Object.keys(this.options).forEach(key => {
      const filePath = this.options[key];
      if (typeof filePath !== "string" || !path.isAbsolute(filePath)) {
        throw new Error(
          `Invalid '${key}' option provided, it must be a string path.`
        );
      }
    });
  }

  apply(compiler) {
    const optionsKeys = Object.keys(this.options);
    compiler.hooks.compilation.tap("HtmlLayoutWebpackPlugin", compilation => {
      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync(
        "HtmlLayoutWebpackPlugin",
        (htmlPluginData, cb) => {
          let matches = null;
          const slotData = htmlPluginData.html.replace(this.pattern, "");
          htmlPluginData.html = htmlPluginData.html.replace(slotData, "");
          while ((matches = this.pattern.exec(htmlPluginData.html)) !== null) {
            htmlPluginData.html = htmlPluginData.html.replace(
              this.pattern,
              (match, $1, $2, $3) => {
                if (optionsKeys.includes($2)) {
                  const fliePath = path.join(this.options[$2], `${$3}.html`);
                  const flieData = fs.readFileSync(fliePath, "utf8");
                  compiler.hooks.afterCompile.tap('after-compile', compilation => {
                    compilation.fileDependencies.add(fliePath);
                  });
                  return flieData;
                } else if ($2 === "slot" && $3 === "true") {
                  return slotData;
                } else {
                  throw new Error(
                    `HtmlLayoutWebpackPlugin：unrecognized this command: '${match}'`
                  );
                }
              }
            );
          }
          cb(null, htmlPluginData);
        }
      );
    });
  }
};
