import KeyvRedis from "@keyv/redis";
import { CacheModuleOptions, CacheOptions, CacheOptionsFactory } from "@nestjs/cache-manager";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { redisStore } from "cache-manager-redis-store";

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {

    constructor(private readonly configservice : ConfigService){}
    createCacheOptions(): CacheModuleOptions {

        return  {  
                    ttl : 60*60 * 1000, 
                    stores : new KeyvRedis(this.configservice.get('redis').host)

                }
        
        
    }


}