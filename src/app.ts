// @ts-ignore
import express, { Application, Request, Response } from '@swizzyweb/express';
import { SwizzyDynServeBackendWebService, getWebservice as getBackendWebService, routers as backendRoutes } from '@swizzyweb/dyn-serve-backend-web-service';

import { SwizzyDynServeFrontendWebService, getWebservice as getFrontendWebService, routers as frontendRoutes } from '@swizzyweb/dyn-serve-frontend-web-service';
import { BrowserLogger, ILogger, getPackageJson } from '@swizzyweb/swizzy-common';
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
  }

export function install(props: any): IWebService {
    const packageJson = getPackageJson(1);
    const packageName = packageJson.name
    return new SwizzyDynServeWebService({...props, packageName});
}


export interface ISwizzyDynServeWebServiceProps {
  packageName: string;
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
	
	let serviceProps = props;
	if (!serviceProps.logger) {
		serviceProps.logger = new BrowserLogger();
	}

	if (!serviceProps.app) {
		throw new Error(`app must be defined`);
	}
	serviceProps.app = serviceProps.app??express();

	serviceProps.logger.info(`Creating new ${SERVICE_NAME}`);
  const packageJson = getPackageJson(1);
  serviceProps.packageName = packageJson.name;
	return new SwizzyDynServeWebService(serviceProps);
};
