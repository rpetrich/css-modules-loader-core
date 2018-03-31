export default class Core {
	static values: any;
	static localByDefault: any;
	static extractImports: any;
	static scope: any;
	static defaultPlugins: any[];
	constructor(plugins: any[]);
	load(sourceString: string, sourcePath: string, trace?: any, pathFetcher?: any): { injectableSource: string, exportTokens: { [name: string]: string } };
}
