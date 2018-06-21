const { src, task, context } = require("fuse-box/sparky");
const gulp = require('gulp');
const {
  FuseBox,
  WebIndexPlugin,
  CSSPlugin,
  CSSResourcePlugin,
  MarkdownPlugin,
  UglifyJSPlugin,
  QuantumPlugin
} = require("fuse-box");

const instruction = `> main.js + **/*.md`

const workerInstruction = `> workers/worker.js`

context(class {
  getConfig(name) {
    switch (name) {
      case '':
      case undefined:
      case null:
        return FuseBox.init({
          homeDir: "src",
          output: "dist/$name.js",
          target: "browser@es5",
          hash: true,
          sourceMaps: { project: !this.isProduction },
          useTypescriptCompiler: true,
          allowSyntheticDefaultImports: true,
          plugins: [
            CSSPlugin(),
            CSSResourcePlugin(),
            MarkdownPlugin({
              useDefault: true
            }),
            WebIndexPlugin({
              template: './index.html',
              bundles: ['app'],
              title: "winjs-l7ad",
            }),
            this.isProduction && UglifyJSPlugin()
          ],
        });
      case 'worker':
        return FuseBox.init({
          homeDir: "workers",
          output: "dist/$name.js",
          target: "browser",
          sourceMaps: { project: !this.isProduction },
          useTypescriptCompiler: true,
          allowSyntheticDefaultImports: true,
          plugins: [
            QuantumPlugin({
              containedAPI: true,
              bakeApiIntoBundle: true,
              uglify: false,
            })
          ],
        });
    }
  }
})

task("clean", async context => {
  await src("./dist").clean("dist/").exec();
});

task("default", ['dev']);


gulp.task('copy:html', function () {
  gulp
    .src('src/**/*.html')
    .pipe(gulp.dest('./dist'))
  gulp
    .src('manifest.json')
    .pipe(gulp.dest('./dist'));
});

task('copy:html', [], async context => {
  const p1 = src('**/**.html', { base: 'src' })
    .dest('dist/')
    .exec();
  const p2 = src('manifest.json')
    .dest('dist/')
    .exec();
  await Promise.all([p1, p2])
  return gulp.watch('src/**/*.html', ['copy:html']);
});

task("dev", ['clean', 'copy:html'], async context => {
  const fuse = context.getConfig();
  const fuse2 = context.getConfig('worker');
  fuse.dev();
  fuse.bundle("app")
    .hmr({ reload: true })
    .watch('src/**/*.js')
    .instructions(instruction)

  fuse2.bundle("worker")
    .hmr({ reload: true })
    .watch('workers/**/*.js')
    .instructions(workerInstruction)

  await Promise.all([fuse.run(), fuse2.run()])
})

task("prod", ['clean', 'copy:html'], async context => {
  context.isProduction = true;
  const fuse = context.getConfig();
  const fuse2 = context.getConfig('worker');
  fuse.dev();
  fuse.bundle("app")
    .instructions(instruction)

  fuse2.bundle("worker")
    .instructions(workerInstruction)

  await Promise.all([fuse.run(), fuse2.run()])
});


task("dev:prod", ['clean'], async context => {
  context.isProduction = true;
  const fuse = context.getConfig();
  const fuse2 = context.getConfig('worker');
  fuse.dev();
  fuse.bundle("app")
    .hmr({ reload: true })
    .watch('src/**/*.js')
    .instructions(instruction)

  fuse2.bundle("worker")
    .hmr({ reload: true })
    .watch('worker/**/*.js')
    .instructions(workerInstruction)

  await Promise.all([fuse.run(), fuse2.run()])
})
