({
	baseUrl: "./source/",
	name: "js/init",
	include: ["js/var", "js/mouse", "js/stats", "js/building", "js/map", "js/tile", "js/draw"],
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