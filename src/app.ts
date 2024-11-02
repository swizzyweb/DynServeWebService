// @ts-ignore
import express, { Application, Request, Response } from '@swizzyweb/express';
import { SwizzyDynServeBackendWebService, getWebservice as getBackendWebService, routers as backendRoutes } from '@swizzyweb/dyn-serve-backend-web-service';

import { SwizzyDynServeFrontendWebService, getWebservice as getFrontendWebService, routers as frontendRoutes } from '@swizzyweb/dyn-serve-frontend-web-service';
import { BrowserLogger, ILogger } from '@swizzyweb/swizzy-common';
import { IRunProps, IRunResult, IWebService, WebService } from "@swizzyweb/swizzy-web-service";

const SERVICE_NAME = 'SwizzyDynServeWebService';


export class SwizzyDynServeWebService extends WebService {
    name = SERVICE_NAME; 
	swizzyBackendWebService: IWebService;
	swizzyFrontendWebService: IWebService;

    constructor(props: any) {
    	super({...props, routers: []});
		this._logger.info("Called super");
		this._logger.info(`App ${this.app}`);
    	this.swizzyBackendWebService = getBackendWebService({...props, port: undefined, logger: this._logger});
		this._logger.info(`Got backend web service ${this.swizzyBackendWebService}`);
		this.swizzyFrontendWebService = getFrontendWebService({...props, port: undefined, logger: this._logger});
		this._logger.info(`Got frontend web service ${this.swizzyBackendWebService}`);
	}
	async install(props: IRunProps): Promise<IRunResult> {
		
		this._logger.info(`Installing ${SERVICE_NAME}`);
		//await super.install(props);
		await this.swizzyBackendWebService.install(props);
		await this.swizzyFrontendWebService.install(props);
		if (this.port) {
			
		}
		return {};
  	}
  	async uninstall(props: IRunProps): Promise<any> {
  		await this.swizzyFrontendWebService.uninstall(props);
		await this.swizzyBackendWebService.uninstall(props)
		await super.uninstall(props);
		return {};
  	}
  	isInstalled(): boolean {
  		return this.swizzyFrontendWebService.isInstalled() && this.swizzyFrontendWebService.isInstalled();
  	}
    // TODO: remove and use base class impl
    /*protected installRouters(app: Application): Promise<any> {
        app.use(webserviceRouter);
		app.use(toolRouter);
        return Promise.resolve();
    }*/
/*
    protected uninstallRouters(app: Application): Promise<any> {
		const logger = this._logger;
        logger.info(`Routes ${app.routes()}`);
        return Promise.resolve();
    }
	*/
}

export function install(props: any): IWebService {
    return new SwizzyDynServeWebService(props);
}


export interface ISwizzyDynServeWebServiceProps {
	app: Application;
	port?: number;
	logger?: ILogger;
	basePath?: string;
};

export function getWebservices(props: ISwizzyDynServeWebServiceProps): IWebService[] {
	const services = [];
	services.push(new SwizzyDynServeBackendWebService(props));
	services.push(new SwizzyDynServeFrontendWebService(props));
	return services;
};


export function getWebservice(props: ISwizzyDynServeWebServiceProps): IWebService {
	//const app = props?.app??express();
/*app.use((req: Request, res: Response, next: any) => {
	req.app = app;
	next();
});*/
	//const webSevice = new SwizzyDynServeBackendWebService(props);
	//webSevice.install({})
	//const frontendService = new SwizzyDynServeFrontendWebService(props);
	//frontendService.install({});
	console.log(props);
	let serviceProps = props;
	console.log(serviceProps);
	if (!serviceProps.logger) {
		serviceProps.logger = new BrowserLogger();
	}

	if (!serviceProps.app) {
		throw new Error(`app must be defined`);
		/*if (!serviceProps?.port) {
			const errorMessage = `You must provide a port or app in props to get ${SERVICE_NAME}`;
			serviceProps.logger.error(errorMessage);

			throw new Error(errorMessage);
		}
		serviceProps.port = serviceProps.port ?? 3005;*/
		/*app.listen(PORT, () => {
    		console.info(`${SERVICE_NAME} app running on port ${PORT}`);
		});*/
	}
	serviceProps.app = serviceProps.app??express();

	serviceProps.logger.info(`creating new ${SERVICE_NAME}`);
	console.log(serviceProps);
	//serviceProps.logger.info(`${SERVICE_NAME} props: ${serviceProps}`);
	return new SwizzyDynServeWebService(serviceProps);
};
