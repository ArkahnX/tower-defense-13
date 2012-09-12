({
	baseUrl: "./source/",
	name: "js/var",
	include: ["js/const", "js/functions", "js/setup", "js/tile", "js/map", "js/enemy", "js/tower", "js/construction", "js/astar", "js/draw", "js/dom", "js/debug", "js/money", "js/compat","js/stats","js/physics","js/bullet"],
	out: "build/build.js",
	keepBuildDir: false,
	locale: "en-us",
	optimize: "uglify",
	uglify: {
		quote_keys: true,
		except: []
	},
	wrap: {
		startFile: "start.frag",
		endFile: "end.frag"
	},
	findNestedDependencies: true,
	optimizeCss: "standard",
	inlineText: true,
	useStrict: true,
	skipModuleInsertion: true,
})