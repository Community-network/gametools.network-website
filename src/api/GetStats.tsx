import JsonClient from "./Json";

export class ApiProvider extends JsonClient {
    constructor() {
        super();
    }

    async stats({ game, type, getter, userName, lang, platform = "pc" }) {
        if (getter == "playerid") {
            return await this.getJsonMethod(`/${game}/${type}/`, {
                "playerid": userName,
                "lang": lang,
                "platform": platform,
            });
        }
        return await this.getJsonMethod(`/${game}/${type}/`, {
            "name": encodeURIComponent(userName),
            "lang": lang,
            "platform": platform,
        });
    }

    async server({ game, type, getter, serverName, lang, region = "all"}) {
        let gameStuff = game.split(".")
        if (getter == "gameid") {
            return await this.getJsonMethod(`/${gameStuff[0]}/${type}/`, {
                "gameid": serverName,
                "lang": lang,
                "region": region,
                "service": gameStuff[1]
            });
        }
        return await this.getJsonMethod(`/${gameStuff[0]}/${type}/`, {
            "name": encodeURIComponent(serverName),
            "lang": lang,
            "region": region,
            "service": gameStuff[1]
        });
    }

    async graphs({ game, days, region = "all"}) {
        let gameStuff = game.split(".")
        return await this.getJsonMethod(`/${gameStuff[0]}/statusarray/`, {
            "days": days,
            "region": region,
            "service": gameStuff[1]
        });
    }
}

export const GetStats = new ApiProvider();