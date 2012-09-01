({
	baseUrl: "./",
	name: "functions",
	include: ["mouse", "building", "map","tile","draw"],
	out: "build.js",
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