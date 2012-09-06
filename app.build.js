({
	baseUrl: "./source/",
	name: "js/const",
	include: ["js/init", "js/var", "js/mouse", "js/stats", "js/build", "js/map", "js/tile", "js/draw", "js/structure", "js/enemy", "js/astar", "js/money", "js/physics", "js/bullets"],
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