const { src, task, context } = require("fuse-box/sparky");
const {
  FuseBox,
  WebIndexPlugin,
  CSSPlugin,
  QuantumPlugin,
  CSSResourcePlugin
} = require("fuse-box");

const instruction = `> main.js`

context(class {
  getConfig() {
    return FuseBox.init({
      homeDir: "src",
      output: "dist/$name.js",
      target: "browser@es5",
      plugins: [
        CSSPlugin(),
        CSSResourcePlugin(),
        !this.isProduction && WebIndexPlugin({
          template: './index.html'
        }),
        this.isProduction && QuantumPlugin({
          uglify: true,
          treeshake: true,
          containedApi: true,
          bakeApiIntoBundle: "app",
          manifest: true
        })
      ],
      useTypescriptCompiler: true,
      allowSyntheticDefaultImports: true,
    });
  }
})

task("default", ['clean'], async context => {
  const fuse = context.getConfig();
  fuse.bundle("app")
    .hmr()
    .watch()
    .instructions(instruction);

  await fuse.run()
});

task("prod", ['clean'], async context => {
  context.isProduction = true;
  const fuse = context.getConfig();
  fuse.bundle("app")
    .instructions(instruction);

  await fuse.run()
});

task("clean", async context => {
  await src("./dist").clean("dist/").exec();
});

task("serve", ['clean'], async context => {
  const fuse = context.getConfig();
  fuse.dev();
  fuse.bundle("app")
    .hmr({ reload: true })
    .watch('src/**')
    .instructions(instruction);
  await src('**/**.html', { base: 'src' })
    .dest('dist/')
    .exec();
  await fuse.run()
})