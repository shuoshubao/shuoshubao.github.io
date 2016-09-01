# gulp.src(globs[, options])

- globs
	- String 或 Array
	- 所要读取的 glob 或者包含 globs 的数组
- options
	- buffer
	- read
	- base

# gulp.dest(path[, options])

- path
	- String or Function
- options
	- cwd
	- mode

# gulp.task(name[, deps], fn)

- name 任务名
- deps
- fn
	- gulp.src().pipe(someplugin())

# gulp.watch(glob[, opts], tasks)
